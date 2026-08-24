import type { Diagnostic, NodeProcessor, TargetId } from "@/core/nodes"

export interface RemoteSubscriptionSource {
  type: "remote"
  /** One or more links; their bodies are fetched and merged in order. */
  urls: string[]
}

/**
 * A managed aggregate, like Sub-Store's collection: the row it belongs to carries its own token and
 * serves the canonical nodes of the listed persistent pool subscriptions, merged in member order.
 * Only pool members are accepted at write time; delivery resolves them by id, so members that are
 * later removed or converted are skipped rather than failing the whole collection.
 */
export interface CollectionSubscriptionSource {
  type: "collection"
  /** Persistent pool subscription ids, in output order. */
  memberIds: string[]
}

export type SubscriptionSource =
  | { type: "raw"; content: string }
  | { type: "pool"; content: string }
  | RemoteSubscriptionSource
  | CollectionSubscriptionSource
  | { type: "nodes"; ids: string[] }

export interface SubscriptionDraft {
  name: string
  /** Optional folder/group this subscription belongs to; absent when ungrouped. */
  folder?: string
  source: SubscriptionSource
  defaultTarget: TargetId
  processors?: NodeProcessor[]
  enabled: boolean
}

/**
 * Everything about a subscription except where its nodes come from.
 *
 * The delivery path reads this on every request but the source only when it recompiles, so the two are
 * fetched separately: the source is a chunked side table, and reading it to answer a request
 * that reuses a cached artifact is the most expensive thing this codebase can do for no reason.
 */
export interface SubscriptionMetadata extends Omit<SubscriptionDraft, "source"> {
  id: string
  tokenHint: string
  version: number
  createdAt: string
  updatedAt: string
  lastSuccessAt?: string
  lastError?: string
}

export interface SubscriptionRecord extends SubscriptionMetadata {
  source: SubscriptionSource
}

export interface PublishedSubscription extends SubscriptionRecord {
  token: string
}

export interface SubscriptionSummary extends Omit<SubscriptionRecord, "source" | "processors"> {
  sourceType: SubscriptionSource["type"]
  processorCount: number
  /** Whether the authenticated manager can recover and copy the complete subscription URL. */
  linkAvailable: boolean
  /**
   * Nodes in the compiled artifact for `defaultTarget` at the current `version`. Undefined until
   * that exact version has been compiled, matching what the delivery path is willing to reuse.
   */
  nodeCount?: number
  /**
   * The manager's list position. Undefined keeps the historical `updated_at DESC` ordering;
   * an explicit value pins the subscription to that position ahead of unpinned entries.
   */
  sortOrder?: number
}

/**
 * Everything a cached artifact is described by. Whether it may be reused, and whether the caller
 * already holds it, are both answerable from here — so the compiled body is read only once those
 * questions say it is needed.
 */
export interface DeliveryArtifactMetadata {
  subscriptionId: string
  target: TargetId
  subscriptionVersion: number
  etag: string
  nodeCount: number
  /** The traffic metadata the upstream stated, forwarded to the subscriber unchanged. */
  responseHeaders: Record<string, string>
  createdAt: string
}

export interface DeliveryArtifact extends DeliveryArtifactMetadata {
  content: string
}

export interface SubscriptionTokenProtector {
  protect(subscriptionId: string, token: string): Promise<string>
  recover(subscriptionId: string, protectedToken: string): Promise<string>
}

export interface SubscriptionPublishingRepository {
  findById(id: string): Promise<SubscriptionRecord | null>
  list(): Promise<SubscriptionSummary[]>
  create(subscription: SubscriptionRecord, token: string): Promise<void>
  update(subscription: SubscriptionRecord, expectedVersion?: number): Promise<void>
  rotateToken(id: string, token: string, tokenHint: string, updatedAt: string): Promise<boolean>
  recoverToken(id: string): Promise<string | null>
  registerToken(id: string, token: string): Promise<boolean>
  delete(id: string): Promise<boolean>
  /** Pins each id to its index in `orderedIds`; the caller owns validation. */
  reorder(orderedIds: string[]): Promise<void>
}

export interface SubscriptionDeliveryRepository {
  /** The delivery path: metadata now, source only if something has to be rebuilt from it. */
  findMetadataByToken(token: string): Promise<SubscriptionMetadata | null>
  findSource(id: string): Promise<SubscriptionSource | null>
  findArtifact(subscriptionId: string, target: TargetId): Promise<DeliveryArtifactMetadata | null>
  /**
   * The artifact and its body, read together: separate reads could pair one recompile's digest with
   * another's bytes. Null when the body is gone or unreadable, which is a cache miss, not a failure.
   */
  readArtifact(subscriptionId: string, target: TargetId): Promise<DeliveryArtifact | null>
  /** Writes only while the subscription still has the artifact's version. */
  saveArtifactIfCurrent(artifact: DeliveryArtifact, successAt: string): Promise<void>
  recordDelivery(
    id: string,
    version: number,
    result: { successAt?: string; error?: string },
  ): Promise<void>
}
