import { ValidationError } from "@/core/errors"
import { compileNodeList } from "@/core/nodes"
import type { CanonicalNode, TargetId } from "@/core/nodes"
import { nodeToCanonical } from "@/core/nodes/entity"
import type { NodeEntity } from "@/core/nodes/entity"
import { validateDocument } from "./document-validation"
import { mergePoolNodes, parsePoolNodes, serializePoolNodes } from "./node-pool"
import { readSubscriptionSource, subscriptionSourceHosts } from "./source-resolver"
import type { ResolveSourceOptions } from "./source-resolver"
import { isPlausibleToken } from "./token"
import type {
  CollectionSubscriptionSource,
  DeliveryArtifact,
  DeliveryArtifactMetadata,
  SubscriptionDeliveryRepository,
  SubscriptionMetadata,
} from "./types"
import { wrapArtifact } from "./wrapper"

export const DEFAULT_FRESH_ARTIFACT_MS = 60_000
const DEFAULT_MAX_STALE_MS = 7 * 24 * 60 * 60 * 1000

export interface DeliveryResult {
  subscription: SubscriptionMetadata
  artifact: DeliveryArtifactMetadata
  content: string | null
  stale: boolean
}

export type DeliveryOutcome =
  | { kind: "delivered"; delivery: DeliveryResult }
  | { kind: "not-found" }
  | { kind: "disabled" }
  | { kind: "unavailable"; error: Error }

interface SubscriptionDeliveryOptions {
  freshArtifactMs?: number
  maxStaleMs?: number
  resolveHost?: ResolveSourceOptions["resolveHost"]
  /** Callback to resolve node entity IDs into entities for the "nodes" source type. */
  findNodesByIds?: (ids: string[]) => Promise<NodeEntity[]>
}

export class SubscriptionDelivery {
  private readonly freshArtifactMs: number
  private readonly maxStaleMs: number
  private readonly resolveHost: ResolveSourceOptions["resolveHost"]
  private readonly findNodesByIds?: (ids: string[]) => Promise<NodeEntity[]>

  constructor(
    private readonly repository: SubscriptionDeliveryRepository,
    options: SubscriptionDeliveryOptions = {},
  ) {
    this.freshArtifactMs = options.freshArtifactMs ?? DEFAULT_FRESH_ARTIFACT_MS
    this.maxStaleMs = options.maxStaleMs ?? DEFAULT_MAX_STALE_MS
    this.resolveHost = options.resolveHost
    this.findNodesByIds = options.findNodesByIds
  }

  readSnapshot(id: string, target: TargetId) {
    return this.repository.readArtifact(id, target)
  }

  async deliver(
    token: string,
    target?: TargetId,
    knownEtag?: string | null,
  ): Promise<DeliveryOutcome> {
    if (!isPlausibleToken(token)) return { kind: "not-found" }
    const subscription = await this.repository.findMetadataByToken(token)
    if (!subscription) return { kind: "not-found" }
    if (!subscription.enabled) return { kind: "disabled" }

    const selectedTarget = target ?? subscription.defaultTarget
    const cached = await this.repository.findArtifact(subscription.id, selectedTarget)
    if (this.isReusable(cached, subscription)) {
      const reused = await this.serve(subscription, cached, knownEtag, false)
      if (reused) return { kind: "delivered", delivery: reused }
    }

    const refreshed = await this.refresh(subscription, selectedTarget)
    if (refreshed.kind === "unavailable") {
      await this.recordFailure(subscription, refreshed.error)
      const fallback = await this.repository.findArtifact(subscription.id, selectedTarget)
      if (
        fallback?.subscriptionVersion === subscription.version &&
        Date.now() - Date.parse(fallback.createdAt) < this.maxStaleMs
      ) {
        const served = await this.serve(subscription, fallback, knownEtag, true)
        if (served) {
          console.warn("Subscription refresh failed; serving stale artifact", {
            subscriptionId: subscription.id,
            target: selectedTarget,
            error: refreshed.error,
          })
          return { kind: "delivered", delivery: served }
        }
      }
      return refreshed
    }

    try {
      await this.repository.saveArtifactIfCurrent(refreshed.artifact, refreshed.artifact.createdAt)
    } catch (error) {
      console.warn("Unable to save compiled subscription artifact", {
        subscriptionId: subscription.id,
        target: selectedTarget,
        error,
      })
    }
    return {
      kind: "delivered",
      delivery: {
        subscription,
        artifact: refreshed.artifact,
        content: refreshed.artifact.etag === knownEtag ? null : refreshed.artifact.content,
        stale: false,
      },
    }
  }

  private async recordFailure(subscription: SubscriptionMetadata, error: Error) {
    try {
      await this.repository.recordDelivery(subscription.id, subscription.version, {
        error: error.message,
      })
    } catch (recordError) {
      console.warn("Unable to record subscription refresh failure", {
        subscriptionId: subscription.id,
        error: recordError,
      })
    }
  }

  private async refresh(
    subscription: SubscriptionMetadata,
    target: TargetId,
  ): Promise<
    { kind: "ready"; artifact: DeliveryArtifact } | { kind: "unavailable"; error: Error }
  > {
    const source = await this.repository.findSource(subscription.id)
    if (!source) {
      return { kind: "unavailable", error: new Error("The subscription source is gone.") }
    }

    try {
      const resolved =
        source.type === "collection"
          ? await this.resolveCollection(source)
          : source.type === "nodes"
            ? await this.resolveNodes(source)
            : await readSubscriptionSource(source, {
                allowedHosts: subscriptionSourceHosts(source),
                resolveHost: this.resolveHost,
              })
      if (resolved.kind === "unavailable") return resolved

      const compiled = compileNodeList({
        source: resolved.source.content,
        target,
        processors: subscription.processors,
      })
      validateDocument(compiled, target)
      return {
        kind: "ready",
        artifact: await wrapArtifact({
          compiled,
          subscription,
          target,
          responseHeaders: resolved.source.responseHeaders,
        }),
      }
    } catch (error) {
      if (error instanceof ValidationError) return { kind: "unavailable", error }
      throw error
    }
  }

  /**
   * A collection carries no text of its own: its body is the canonical nodes of its member pools,
   * merged in member order with exact duplicates dropped — the same merge the pool append path uses,
   * so the served node data is exactly what the member pools would hand out. A member that is gone or
   * was converted away from a pool is skipped (it must not take a live collection down); a collection
   * with nothing left to serve is unavailable, matching a dead upstream.
   */
  private async resolveCollection(
    source: CollectionSubscriptionSource,
  ): Promise<
    | { kind: "ready"; source: { content: string; responseHeaders: Record<string, string> } }
    | { kind: "unavailable"; error: Error }
  > {
    let nodes: CanonicalNode[] = []
    for (const memberId of source.memberIds) {
      // Member order is the collection's output order; resolve sequentially rather than reshuffling it.
      // oxlint-disable-next-line no-await-in-loop
      const member = await this.repository.findSource(memberId)
      if (!member) {
        console.warn("Collection member is gone; skipping", { memberId })
        continue
      }
      if (member.type !== "pool") {
        console.warn("Collection member is no longer a persistent pool; skipping", { memberId })
        continue
      }
      try {
        nodes = mergePoolNodes(nodes, parsePoolNodes(member.content))
      } catch (error) {
        if (error instanceof ValidationError) {
          console.warn("Collection member pool is unreadable; skipping", { memberId, error })
          continue
        }
        throw error
      }
    }
    if (nodes.length === 0) {
      return { kind: "unavailable", error: new Error("集合没有任何可用的持久化节点成员。") }
    }
    try {
      return {
        kind: "ready",
        source: { content: serializePoolNodes(nodes), responseHeaders: {} },
      }
    } catch (error) {
      if (error instanceof ValidationError) return { kind: "unavailable", error }
      throw error
    }
  }

  /**
   * A "nodes" source type resolves through the node repository: it reads the entity IDs, converts
   * each to a CanonicalNode, then serializes them into a pool content string for compilation.
   * Entities that are gone or unreadable are skipped; nothing left means unavailable.
   */
  private async resolveNodes(source: {
    type: "nodes"
    ids: string[]
  }): Promise<
    | { kind: "ready"; source: { content: string; responseHeaders: Record<string, string> } }
    | { kind: "unavailable"; error: Error }
  > {
    if (!this.findNodesByIds) {
      return { kind: "unavailable", error: new Error("节点数据源需要 findNodesByIds 回调。") }
    }
    let entities: NodeEntity[]
    try {
      entities = await this.findNodesByIds(source.ids)
    } catch (error) {
      return {
        kind: "unavailable",
        error: error instanceof Error ? error : new Error("读取节点失败。"),
      }
    }
    if (entities.length === 0) {
      return { kind: "unavailable", error: new Error("没有可用的节点。") }
    }
    const nodes: CanonicalNode[] = entities.map((entity) => nodeToCanonical(entity))
    try {
      return {
        kind: "ready",
        source: { content: serializePoolNodes(nodes), responseHeaders: {} },
      }
    } catch (error) {
      if (error instanceof ValidationError) return { kind: "unavailable", error }
      throw error
    }
  }

  private async serve(
    subscription: SubscriptionMetadata,
    artifact: DeliveryArtifactMetadata,
    knownEtag: string | null | undefined,
    stale: boolean,
  ): Promise<DeliveryResult | null> {
    if (artifact.etag === knownEtag) return { subscription, artifact, content: null, stale }
    const read = await this.repository.readArtifact(subscription.id, artifact.target)
    return read === null ? null : { subscription, artifact: read, content: read.content, stale }
  }

  private isReusable(
    artifact: DeliveryArtifactMetadata | null,
    subscription: SubscriptionMetadata,
  ): artifact is DeliveryArtifactMetadata {
    return (
      artifact?.subscriptionVersion === subscription.version &&
      Date.now() - Date.parse(artifact.createdAt) < this.freshArtifactMs
    )
  }
}
