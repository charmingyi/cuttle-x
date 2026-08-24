import { ConflictError, ValidationError } from "@/core/errors"
import { MAX_SOURCE_SIZE, TARGET_IDS } from "@/core/nodes"
import type { TargetId } from "@/core/nodes"
import { isPlausibleToken } from "@/core/subscriptions"
import { subscriptionPublicOrigin } from "@/server/subscription-origin"
import { subscriptionDelivery, subscriptionPublishing } from "@/server/subscription-services"
import { AdminFailure } from "@/shared/admin-error"
import type {
  AppendSubscriptionPayload,
  CredentialPayload,
  SubscriptionLinkPayload,
  SubscriptionListPayload,
  SubscriptionPayload,
} from "./contract"

export async function listSubscriptions(): Promise<SubscriptionListPayload> {
  return { subscriptions: await subscriptionPublishing().list() }
}

/**
 * The collection's order is one write, not per-row writes: `orderedIds` must be a full permutation
 * of the current ids, and anything else is refused so a stale client can never scramble the list.
 * Answers `null` (204) on success; the request body is `{ ids: string[] }` on both channels.
 */
export async function reorderSubscriptions({ ids }: { ids: unknown }): Promise<void> {
  if (!Array.isArray(ids) || ids.some((id) => typeof id !== "string")) {
    throw new AdminFailure("invalid_request", "订阅顺序必须是订阅 ID 列表。")
  }
  if (!(await subscriptionPublishing().reorder(ids))) {
    throw new AdminFailure("invalid_request", "订阅列表已变化，请刷新后重试。")
  }
}

export async function getSubscription({ id }: { id: string }): Promise<SubscriptionPayload> {
  const subscription = await subscriptionPublishing().get(id)
  if (!subscription) throw new AdminFailure("not_found", "Subscription not found.")
  return { subscription }
}

function subscriptionUrl(token: string, origin: string) {
  return new URL(`/subscribe/${token}`, subscriptionPublicOrigin(origin)).toString()
}

function tokenFromLink(input: unknown) {
  if (typeof input !== "string") throw new AdminFailure("invalid_request", "订阅地址必须是文本。")
  const candidate = input.trim()
  if (!candidate) throw new AdminFailure("invalid_request", "订阅地址不能为空。")
  if (isPlausibleToken(candidate) && !candidate.includes("/")) return candidate
  let url: URL
  try {
    url = new URL(candidate)
  } catch (error) {
    throw new AdminFailure("invalid_request", "订阅地址格式无效。", { cause: error })
  }
  const matched = /^\/subscribe\/([^/]+)$/.exec(url.pathname)
  let token = ""
  try {
    token = matched ? decodeURIComponent(matched[1]) : ""
  } catch (error) {
    throw new AdminFailure("invalid_request", "订阅地址格式无效。", { cause: error })
  }
  if (!isPlausibleToken(token) || token.includes("/")) {
    throw new AdminFailure("invalid_request", "这不是有效的 Cuttle 订阅地址。")
  }
  return token
}

export async function getSubscriptionLink({
  id,
  origin,
}: {
  id: string
  origin: string
}): Promise<SubscriptionLinkPayload> {
  if (!(await subscriptionPublishing().get(id))) {
    throw new AdminFailure("not_found", "Subscription not found.")
  }
  try {
    const token = await subscriptionPublishing().recoverToken(id)
    return token ? { available: true, url: subscriptionUrl(token, origin) } : { available: false }
  } catch (error) {
    // A rotated CUTTLE_LINK_KEY must not turn a copy action into a 500 or expose cipher details. The
    // operator can still paste the old URL in the detail surface, whose digest check re-wraps it.
    console.warn("Unable to recover subscription link", { subscriptionId: id, error })
    return { available: false }
  }
}

export async function registerSubscriptionLink({
  id,
  link,
  origin,
}: {
  id: string
  link: unknown
  origin: string
}): Promise<SubscriptionLinkPayload> {
  const token = tokenFromLink(link)
  const registered = await subscriptionPublishing().registerToken(id, token)
  if (registered === null) throw new AdminFailure("not_found", "Subscription not found.")
  if (!registered) throw new AdminFailure("invalid_request", "订阅地址与这条订阅不匹配。")
  return { available: true, url: subscriptionUrl(token, origin) }
}

export async function createSubscription({
  draft,
  origin,
}: {
  draft: unknown
  origin: string
}): Promise<CredentialPayload> {
  try {
    const { token, ...subscription } = await subscriptionPublishing().publish(draft)
    return { subscription, token, url: subscriptionUrl(token, origin) }
  } catch (error) {
    if (error instanceof ValidationError) {
      throw new AdminFailure("invalid_definition", error.message, { cause: error })
    }
    throw error
  }
}

export async function appendSubscriptionNodes({
  id,
  content,
}: {
  id: string
  content: unknown
}): Promise<AppendSubscriptionPayload> {
  try {
    if (
      typeof content === "string" &&
      new TextEncoder().encode(content).byteLength > MAX_SOURCE_SIZE
    ) {
      throw new AdminFailure("payload_too_large", "追加内容不能超过 2 MiB。")
    }
    const result = await subscriptionPublishing().appendNodes(id, content)
    if (!result) throw new AdminFailure("not_found", "Subscription not found.")
    return {
      added: result.added,
      skipped: result.skipped,
      subscription: {
        id: result.subscription.id,
        version: result.subscription.version,
        defaultTarget: result.subscription.defaultTarget,
      },
    }
  } catch (error) {
    if (error instanceof ConflictError) {
      throw new AdminFailure("conflict", "订阅刚被修改，请重试。", { cause: error })
    }
    if (error instanceof ValidationError) {
      throw new AdminFailure("invalid_definition", error.message, { cause: error })
    }
    throw error
  }
}

export async function updateSubscription({
  id,
  patch,
}: {
  id: string
  patch: unknown
}): Promise<SubscriptionPayload> {
  try {
    const subscription = await subscriptionPublishing().update(id, patch)
    if (!subscription) throw new AdminFailure("not_found", "Subscription not found.")
    return { subscription }
  } catch (error) {
    if (error instanceof ConflictError) {
      throw new AdminFailure("conflict", "订阅刚被修改，请重试。", { cause: error })
    }
    if (error instanceof ValidationError) {
      throw new AdminFailure("invalid_definition", error.message, { cause: error })
    }
    throw error
  }
}

export async function readSubscriptionSnapshot({
  id,
  target,
}: {
  id: string
  target: string
}): Promise<{
  snapshot: { content: string; nodeCount: number; subscriptionVersion: number } | null
}> {
  if (!TARGET_IDS.includes(target as TargetId)) {
    throw new AdminFailure("invalid_request", `Unsupported client: ${target}`)
  }
  const artifact = await subscriptionDelivery().readSnapshot(id, target as TargetId)
  if (!artifact) return { snapshot: null }
  return {
    snapshot: {
      content: artifact.content,
      nodeCount: artifact.nodeCount,
      subscriptionVersion: artifact.subscriptionVersion,
    },
  }
}

export async function removeSubscription({ id }: { id: string }): Promise<void> {
  if (!(await subscriptionPublishing().revoke(id))) {
    throw new AdminFailure("not_found", "Subscription not found.")
  }
}

export async function rotateSubscriptionToken({
  id,
  origin,
}: {
  id: string
  origin: string
}): Promise<CredentialPayload> {
  const rotated = await subscriptionPublishing().rotateToken(id)
  if (!rotated) throw new AdminFailure("not_found", "Subscription not found.")
  return {
    subscription: rotated.subscription,
    token: rotated.token,
    url: subscriptionUrl(rotated.token, origin),
  }
}
