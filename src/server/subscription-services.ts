import { env } from "cloudflare:workers"
import {
  SubscriptionDelivery,
  SubscriptionPublishing,
  subscriptionSourceHosts,
} from "@/core/subscriptions"
import { createNodeRepository } from "@/platform/d1/node-repository"
import { D1SubscriptionRepository } from "@/platform/d1/subscription-repository"
import { resolvePublicHostname } from "@/platform/dns"
import { AesSubscriptionTokenProtector } from "./subscription-token-protector"

function repository() {
  return new D1SubscriptionRepository(
    env.DB,
    new AesSubscriptionTokenProtector(env.CUTTLE_LINK_KEY),
  )
}

export function subscriptionPublishing() {
  return new SubscriptionPublishing(repository())
}

export function subscriptionDelivery() {
  const nodeRepo = createNodeRepository(env.DB)
  return new SubscriptionDelivery(repository(), {
    resolveHost: resolvePublicHostname,
    findNodesByIds: (ids) => nodeRepo.findByIds(ids),
  })
}

/**
 * The upstream hosts a subscription reads from — the "which websites" half of the audit question,
 * answered without re-reading source content. Non-remote sources have no upstream and yield an
 * empty list, which the audit panel renders as a local-source note. Failure to read is an audit
 * detail gap, never a delivery problem, so it collapses to "no upstream".
 */
export async function subscriptionUpstreamHosts(id: string): Promise<string[]> {
  try {
    const source = await repository().findSource(id)
    return source ? subscriptionSourceHosts(source) : []
  } catch {
    return []
  }
}

export interface SubscriptionCheckResult {
  ok: boolean
  /** Why the check failed: disabled, token unrecoverable, or the upstream itself. */
  error: string
  nodeCount: number
  stale: boolean
  durationMs: number
}

/**
 * The 检查 button: recompile now, bypassing the fresh-artifact cache, and report what happened.
 * A delivered artifact updates `last_success_at`/`last_error` through the normal delivery path, so
 * the list's own failure state and this result cannot disagree.
 */
export async function checkSubscriptionNow(id: string): Promise<SubscriptionCheckResult> {
  const startedAt = Date.now()
  const repo = repository()
  const token = await repo.recoverToken(id).catch(() => null)
  if (!token) {
    return {
      ok: false,
      error: "订阅链接不可恢复；请重新登记一次订阅地址后再检查。",
      nodeCount: 0,
      stale: false,
      durationMs: Date.now() - startedAt,
    }
  }

  const outcome = await subscriptionDelivery().deliver(token, undefined, null, { force: true })
  switch (outcome.kind) {
    case "delivered":
      return {
        ok: true,
        error: "",
        nodeCount: outcome.delivery.artifact.nodeCount,
        stale: outcome.delivery.stale,
        durationMs: Date.now() - startedAt,
      }
    case "disabled":
      return {
        ok: false,
        error: "订阅已停用，客户端拉取会返回 410。",
        nodeCount: 0,
        stale: false,
        durationMs: Date.now() - startedAt,
      }
    case "not-found":
      return {
        ok: false,
        error: "订阅不存在或已被删除。",
        nodeCount: 0,
        stale: false,
        durationMs: Date.now() - startedAt,
      }
    case "unavailable":
      return {
        ok: false,
        error: outcome.error.message,
        nodeCount: 0,
        stale: false,
        durationMs: Date.now() - startedAt,
      }
  }
}
