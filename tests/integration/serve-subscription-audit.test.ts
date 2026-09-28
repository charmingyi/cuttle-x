import { env } from "cloudflare:workers"
import { describe, expect, test } from "vitest"
import type { SubscriptionRecord } from "@/core/subscriptions"
import { D1SubscriptionRepository } from "@/platform/d1/subscription-repository"
import { serveSubscription } from "@/server/serve-subscription"
import { AesSubscriptionTokenProtector } from "@/server/subscription-token-protector"

/**
 * A token pull is the event the audit exists for, and it is the one an operator notices missing
 * first: the client fetches the subscription, the console logs the delivery, and the panel stays
 * empty. The row is written after the response body is ready, so this walks the real request path —
 * `serveSubscription`, not `recordAudit` on its own — and reads back what the panel would show,
 * device facts included.
 *
 * It cannot prove the write survives the isolate on its own: an in-process test keeps the runtime
 * alive either way, which is exactly how a floating write passes here and fails in production. What
 * it does pin is that every delivered pull records an event, and that the event carries the facts
 * the panel renders.
 */

const TARGET = "clash"

function subscription(id: string, overrides: Partial<SubscriptionRecord> = {}): SubscriptionRecord {
  return {
    id,
    tokenHint: "wxyz",
    name: id,
    source: {
      type: "pool",
      content: JSON.stringify({
        proxies: [
          {
            type: "ss",
            name: "audited-node",
            server: "node.example.com",
            port: 8388,
            cipher: "aes-256-gcm",
            password: "password",
          },
        ],
      }),
    },
    defaultTarget: TARGET,
    enabled: true,
    version: 1,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    ...overrides,
  }
}

function repository() {
  return new D1SubscriptionRepository(
    env.DB,
    new AesSubscriptionTokenProtector(env.CUTTLE_LINK_KEY),
  )
}

async function deliveryDetails() {
  const { results } = await env.DB.prepare(
    `SELECT detail_json FROM audit_log WHERE kind = 'delivery' ORDER BY created_at ASC`,
  ).all<{ detail_json: string }>()
  return results.map((row) => JSON.parse(row.detail_json) as Record<string, unknown>)
}

function pull(token: string, device: { ip: string; country?: string; ua: string }) {
  return new Request(`https://cuttle.example.com/subscribe/${token}`, {
    headers: {
      "CF-Connecting-IP": device.ip,
      ...(device.country ? { "CF-IPCountry": device.country } : {}),
      "User-Agent": device.ua,
    },
  })
}

describe("a subscription pull is audited", () => {
  test("every pull is one row, carrying the device that asked for it", async () => {
    const token = "a".repeat(64)
    await repository().create(subscription("audited-pull"), token)

    const first = await serveSubscription(
      pull(token, { ip: "203.0.113.9", country: "JP", ua: "Clash Verge/2.0.0" }),
      token,
    )
    expect(first.status).toBe(200)

    // The same token a second time, from a different device: the panel's whole job is telling these
    // two apart, so the second pull has to be its own row rather than an update of the first.
    const second = await serveSubscription(
      pull(token, { ip: "198.51.100.7", ua: "SFA/1.8.0" }),
      token,
    )
    expect(second.status).toBe(200)

    const details = await deliveryDetails()
    expect(details).toHaveLength(2)
    expect(details[0]).toMatchObject({
      subscriptionId: "audited-pull",
      target: TARGET,
      nodeCount: 1,
      ip: "203.0.113.9",
      country: "JP",
      ua: "Clash Verge/2.0.0",
    })
    expect(details[1]).toMatchObject({ ip: "198.51.100.7", ua: "SFA/1.8.0" })
  })
})
