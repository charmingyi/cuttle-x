import assert from "node:assert/strict"
import { describe, test } from "vitest"
import { auditStats, matchesKindFilter, matchesSearch } from "@/features/audit/audit-entry"
import type { AuditEntry } from "@/server/audit-log"

function entry(overrides: Partial<AuditEntry> & { id: string }): AuditEntry {
  return {
    kind: "delivery",
    detailJson: "{}",
    createdAt: new Date().toISOString(),
    ...overrides,
  }
}

function delivery(id: string, detail: Record<string, unknown>): AuditEntry {
  return entry({ id, kind: "delivery", detailJson: JSON.stringify(detail) })
}

describe("matchesKindFilter", () => {
  const login = entry({ id: "a", kind: "auth_login" })
  const pull = entry({ id: "b", kind: "delivery" })
  const failed = entry({ id: "c", kind: "delivery_failed" })

  test("groups auth kinds under one filter", () => {
    assert.equal(matchesKindFilter(login, "auth"), true)
    assert.equal(matchesKindFilter(pull, "auth"), false)
  })

  test("keeps delivery and its failure apart", () => {
    assert.equal(matchesKindFilter(failed, "delivery"), false)
    assert.equal(matchesKindFilter(failed, "delivery_failed"), true)
    assert.equal(matchesKindFilter(pull, "delivery"), true)
    assert.equal(matchesKindFilter(login, "all"), true)
  })
})

describe("matchesSearch", () => {
  const pull = delivery("a", {
    name: "家里设备",
    ip: "203.0.113.9",
    ua: "clash-verge/2.0 Windows",
    hosts: ["sub.example.com"],
  })

  test("reaches every rendered field", () => {
    assert.equal(matchesSearch(pull, "clash"), true)
    assert.equal(matchesSearch(pull, "203.0.113"), true)
    assert.equal(matchesSearch(pull, "example.com"), true)
    assert.equal(matchesSearch(pull, "家里"), true)
  })

  test("is a substring match, case-folded, and empty queries pass everything", () => {
    assert.equal(matchesSearch(pull, "CLASH-VERGE"), true)
    assert.equal(matchesSearch(pull, "nope"), false)
    assert.equal(matchesSearch(pull, ""), true)
    assert.equal(matchesSearch(pull, "   "), true)
  })
})

describe("auditStats", () => {
  test("counts today's pulls, distinct devices, failures and subscriptions", () => {
    const now = new Date().toISOString()
    const stats = auditStats(
      [
        delivery("1", { name: "A", ip: "1.1.1.1", ua: "clash-verge/2.0 Windows" }),
        delivery("2", { name: "A", ip: "1.1.1.1", ua: "clash-verge/2.0 Windows" }),
        delivery("3", { name: "B", ip: "2.2.2.2", ua: "SFA/1.8 Android" }),
        entry({ id: "4", kind: "delivery_failed", detailJson: JSON.stringify({ name: "B" }) }),
      ].map((e) => {
        e.createdAt = now
        return e
      }),
    )

    assert.equal(stats.todayDeliveries, 3)
    assert.equal(stats.devices, 2)
    assert.equal(stats.failures, 1)
    assert.equal(stats.subscriptions, 2)
  })

  test("does not count management events as pulls", () => {
    const stats = auditStats([
      entry({ id: "1", kind: "auth_login", detailJson: "{}" }),
      entry({ id: "2", kind: "node_import", detailJson: "{}" }),
    ])
    assert.equal(stats.todayDeliveries, 0)
    assert.equal(stats.devices, 0)
    assert.equal(stats.subscriptions, 0)
  })
})
