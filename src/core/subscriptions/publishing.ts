import { ValidationError } from "@/core/errors"
import { importPoolNodes, mergePoolNodes, parsePoolNodes, serializePoolNodes } from "./node-pool"
import { parseSubscriptionDraft, parseSubscriptionUpdate } from "./schema"
import { subscriptionSourceHosts } from "./source-resolver"
import { mintSubscriptionToken, tokenHint } from "./token"
import type {
  PublishedSubscription,
  SubscriptionPublishingRepository,
  SubscriptionRecord,
} from "./types"

function normalizeDraftSource(draft: SubscriptionRecord["source"]): SubscriptionRecord["source"] {
  if (draft.type !== "pool") return draft
  return { type: "pool", content: serializePoolNodes(parsePoolNodes(draft.content)) }
}

export class SubscriptionPublishing {
  constructor(private readonly repository: SubscriptionPublishingRepository) {}

  list() {
    return this.repository.list()
  }

  get(id: string) {
    return this.repository.findById(id)
  }

  async publish(input: unknown): Promise<PublishedSubscription> {
    const draft = parseSubscriptionDraft(input)
    draft.source = normalizeDraftSource(draft.source)
    subscriptionSourceHosts(draft.source)
    if (draft.source.type === "collection") {
      await this.validateCollectionMembers(draft.source.memberIds)
    }
    const token = mintSubscriptionToken()
    const timestamp = new Date().toISOString()
    const subscription: SubscriptionRecord = {
      ...draft,
      id: crypto.randomUUID(),
      tokenHint: tokenHint(token),
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    }
    await this.repository.create(subscription, token)
    return { ...subscription, token }
  }

  async appendNodes(id: string, content: unknown) {
    const current = await this.repository.findById(id)
    if (!current) return null
    if (current.source.type !== "pool") {
      throw new ValidationError("只有持久化节点订阅支持追加节点。")
    }
    if (typeof content !== "string") {
      throw new ValidationError("追加内容必须是文本。")
    }
    if (!content.trim()) {
      throw new ValidationError("追加内容不能为空。")
    }
    const imported = importPoolNodes(content)
    const incoming = imported.nodes
    const existing = parsePoolNodes(current.source.content)
    const merged = mergePoolNodes(existing, incoming)
    if (merged.length === existing.length)
      return { subscription: current, added: 0, skipped: imported.skipped }
    const subscription: SubscriptionRecord = {
      ...current,
      source: { type: "pool", content: serializePoolNodes(merged) },
      version: current.version + 1,
      updatedAt: new Date().toISOString(),
      lastError: undefined,
    }
    await this.repository.update(subscription, current.version)
    return { subscription, added: merged.length - existing.length, skipped: imported.skipped }
  }

  async update(id: string, input: unknown) {
    const current = await this.repository.findById(id)
    if (!current) return null
    const draft = parseSubscriptionUpdate(current, input)
    draft.source = normalizeDraftSource(draft.source)
    subscriptionSourceHosts(draft.source)
    if (draft.source.type === "collection") {
      await this.validateCollectionMembers(draft.source.memberIds)
    }
    const subscription: SubscriptionRecord = {
      ...current,
      ...draft,
      version: current.version + 1,
      updatedAt: new Date().toISOString(),
      lastError: undefined,
    }
    await this.repository.update(subscription, current.version)
    return subscription
  }

  /**
   * A collection is a managed aggregate, so its members must actually be persistent pool
   * subscriptions — anything else would make the served output depend on members this row cannot
   * vouch for. Existence and kind are checked at write time; delivery still skips a member that is
   * later deleted or converted, because that must never take a live collection down.
   */
  private async validateCollectionMembers(memberIds: string[]) {
    for (const memberId of memberIds) {
      // Preserve member order in validation errors; this is bounded by MAX_COLLECTION_MEMBERS.
      // oxlint-disable-next-line no-await-in-loop
      const member = await this.repository.findById(memberId)
      if (!member) {
        throw new ValidationError(`集合成员不存在：${memberId}`)
      }
      if (member.source.type !== "pool") {
        throw new ValidationError("集合只能包含持久化节点订阅。")
      }
    }
  }

  recoverToken(id: string) {
    return this.repository.recoverToken(id)
  }

  /**
   * Accepts exactly one full permutation of the current subscription ids, so a stale or partial
   * client list can never silently scramble the order: anything else is refused wholesale.
   */
  async reorder(ids: string[]) {
    const current = await this.repository.list()
    const currentIds = new Set(current.map((subscription) => subscription.id))
    const requested = new Set(ids)
    if (
      requested.size !== ids.length ||
      currentIds.size !== requested.size ||
      ids.some((id) => !currentIds.has(id))
    ) {
      return false
    }
    await this.repository.reorder(ids)
    return true
  }

  async registerToken(id: string, token: string) {
    const current = await this.repository.findById(id)
    if (!current) return null
    return this.repository.registerToken(id, token)
  }

  async rotateToken(id: string) {
    const token = mintSubscriptionToken()
    const rotated = await this.repository.rotateToken(
      id,
      token,
      tokenHint(token),
      new Date().toISOString(),
    )
    if (!rotated) return null
    return { token, subscription: await this.readBack(id) }
  }

  private async readBack(id: string) {
    try {
      const subscription = await this.repository.findById(id)
      if (!subscription) {
        console.warn("Rotated subscription could not be read back", { subscriptionId: id })
      }
      return subscription
    } catch (error) {
      console.warn("Unable to read back rotated subscription", { subscriptionId: id, error })
      return null
    }
  }

  revoke(id: string) {
    return this.repository.delete(id)
  }
}
