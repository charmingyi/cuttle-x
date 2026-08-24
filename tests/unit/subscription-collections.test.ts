import { describe, expect, test } from "vitest"
import { ValidationError } from "@/core/errors"
import type { TargetId } from "@/core/nodes"
import {
  importPoolNodes,
  mergePoolNodes,
  parseSubscriptionDraft,
  parseSubscriptionMetadata,
  parseSubscriptionSource,
  serializePoolNodes,
} from "@/core/subscriptions"
import type {
  DeliveryArtifact,
  SubscriptionDeliveryRepository,
  SubscriptionMetadata,
  SubscriptionPublishingRepository,
  SubscriptionRecord,
  SubscriptionSource,
  SubscriptionSummary,
} from "@/core/subscriptions"
import { SubscriptionDelivery } from "@/core/subscriptions/delivery"
import { SubscriptionPublishing } from "@/core/subscriptions/publishing"

const POOL_ONE = "ss://YWVzLTI1Ni1nY206cGFzc3dvcmQ=@one.example.com:8388#One"
const POOL_TWO = "ss://YWVzLTI1Ni1nY206cGFzc3dvcmQ=@two.example.com:8388#Two"
// The same endpoint as POOL_ONE under a different name: a duplicate of POOL_ONE's canonical node.
const POOL_ONE_ALIAS = "ss://YWVzLTI1Ni1nY206cGFzc3dvcmQ=@one.example.com:8388#Renamed"
// 64 hex characters, so `deliver` accepts it as a plausible token.
const COLLECTION_TOKEN = "a".repeat(64)

function poolContent(...links: string[]) {
  const nodes = importPoolNodes(links.join("\n")).nodes
  return serializePoolNodes(mergePoolNodes([], nodes))
}

function metadata(id: string, overrides: Partial<SubscriptionMetadata> = {}): SubscriptionMetadata {
  return {
    id,
    tokenHint: "wxyz",
    name: id,
    defaultTarget: "clash" as TargetId,
    enabled: true,
    version: 1,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    ...overrides,
  }
}

function subscription(id: string, overrides: Partial<SubscriptionRecord> = {}): SubscriptionRecord {
  return {
    ...metadata(id),
    source: { type: "raw", content: "ss://example" },
    ...overrides,
  }
}

function draftWith(overrides: Record<string, unknown>) {
  return {
    name: "n",
    source: { type: "raw", content: "ss://example" },
    defaultTarget: "clash",
    enabled: true,
    ...overrides,
  }
}

describe("collection and folder source parsing", () => {
  test("parses a collection source and keeps member order as given", () => {
    expect(
      parseSubscriptionSource({ type: "collection", memberIds: ["a", "b", "c"] }),
    ).toStrictEqual({ type: "collection", memberIds: ["a", "b", "c"] })
  })

  test("rejects a collection without members, with duplicates, or with too many members", () => {
    expect(() => parseSubscriptionSource({ type: "collection", memberIds: [] })).toThrow(
      ValidationError,
    )
    expect(() => parseSubscriptionSource({ type: "collection", memberIds: ["a", "a"] })).toThrow(
      "duplicates",
    )
    expect(() =>
      parseSubscriptionSource({
        type: "collection",
        memberIds: Array.from({ length: 65 }, (_, index) => `m${index}`),
      }),
    ).toThrow("at most 64")
  })

  test("rejects a stray field on a collection source", () => {
    expect(() =>
      parseSubscriptionSource({ type: "collection", memberIds: ["a"], content: "x" }),
    ).toThrow("unknown field")
  })

  test("accepts a folder on a draft and treats empty as ungrouped", () => {
    expect(parseSubscriptionDraft(draftWith({ folder: " 机场 A " })).folder).toBe("机场 A")
    expect(parseSubscriptionDraft(draftWith({ folder: "" })).folder).toBeUndefined()
    expect(parseSubscriptionDraft(draftWith({ folder: "  " })).folder).toBeUndefined()
    expect(
      parseSubscriptionMetadata({ name: "n", folder: undefined, defaultTarget: "clash" }).folder,
    ).toBeUndefined()
    expect(() => parseSubscriptionDraft(draftWith({ folder: "x".repeat(101) }))).toThrow(
      "must not exceed 100",
    )
    expect(() => parseSubscriptionDraft(draftWith({ folder: 7 }))).toThrow(
      "folder must be a string",
    )
  })
})

/** A publishing repository seeded with `records`, recording the last stored token. */
function collectionRepository(records: SubscriptionRecord[]) {
  const byId = new Map(records.map((record) => [record.id, record]))
  let storedToken = ""
  const repo: SubscriptionPublishingRepository = {
    findById(id) {
      return Promise.resolve(byId.get(id) ?? null)
    },
    list(): Promise<SubscriptionSummary[]> {
      return Promise.resolve([])
    },
    create(record, token) {
      byId.set(record.id, record)
      storedToken = token
      return Promise.resolve()
    },
    update(record, expectedVersion) {
      expect(expectedVersion).toBe(byId.get(record.id)?.version)
      byId.set(record.id, record)
      return Promise.resolve()
    },
    rotateToken() {
      return Promise.resolve(false)
    },
    recoverToken() {
      return Promise.resolve(null)
    },
    registerToken() {
      return Promise.resolve(false)
    },
    delete() {
      return Promise.resolve(false)
    },
    reorder() {
      return Promise.resolve()
    },
  }
  return { repo, token: () => storedToken }
}

describe("collection publishing", () => {
  const poolA = subscription("pool-a", {
    source: { type: "pool", content: poolContent(POOL_ONE) },
  })
  const poolB = subscription("pool-b", {
    source: { type: "pool", content: poolContent(POOL_TWO) },
  })
  const remote = subscription("remote-a", {
    source: { type: "remote", urls: ["https://example.com/sub"] },
  })

  test("creates a collection whose members are persistent pools", async () => {
    const storage = collectionRepository([poolA, poolB])
    const publishing = new SubscriptionPublishing(storage.repo)

    const created = await publishing.publish({
      name: "all",
      folder: "group",
      source: { type: "collection", memberIds: ["pool-b", "pool-a"] },
      defaultTarget: "clash",
      enabled: true,
    })

    expect(created.source).toStrictEqual({ type: "collection", memberIds: ["pool-b", "pool-a"] })
    expect(created.folder).toBe("group")
    expect(storage.token()).toBe(created.token)
  })

  test("refuses a member that is missing or not a persistent pool", async () => {
    const storage = collectionRepository([poolA, remote])
    const publishing = new SubscriptionPublishing(storage.repo)

    await expect(
      publishing.publish({
        name: "broken",
        source: { type: "collection", memberIds: ["pool-a", "nope"] },
        defaultTarget: "clash",
        enabled: true,
      }),
    ).rejects.toThrow("集合成员不存在")
    await expect(
      publishing.publish({
        name: "broken",
        source: { type: "collection", memberIds: ["remote-a"] },
        defaultTarget: "clash",
        enabled: true,
      }),
    ).rejects.toThrow("只能包含持久化节点订阅")
  })

  test("updates membership with a stable token and bumps the version", async () => {
    const storage = collectionRepository([poolA, poolB])
    const publishing = new SubscriptionPublishing(storage.repo)
    const created = await publishing.publish({
      name: "all",
      source: { type: "collection", memberIds: ["pool-a"] },
      defaultTarget: "clash",
      enabled: true,
    })
    const token = created.token

    const updated = await publishing.update(created.id, {
      source: { type: "collection", memberIds: ["pool-a", "pool-b"] },
    })

    expect(updated?.version).toBe(2)
    expect(updated?.source).toStrictEqual({ type: "collection", memberIds: ["pool-a", "pool-b"] })
    expect(storage.token()).toBe(token)
  })

  test("renames the folder without touching the collection source", async () => {
    const storage = collectionRepository([poolA, poolB])
    const publishing = new SubscriptionPublishing(storage.repo)
    const created = await publishing.publish({
      name: "all",
      folder: "before",
      source: { type: "collection", memberIds: ["pool-a"] },
      defaultTarget: "clash",
      enabled: true,
    })

    const updated = await publishing.update(created.id, { folder: "after" })

    expect(updated?.folder).toBe("after")
    expect(updated?.source).toStrictEqual(created.source)
  })
})

describe("collection delivery", () => {
  /**
   * A delivery repository whose `findMetadataByToken` answers only for the collection token, and
   * whose `findSource` answers from `sources` — so `deliver(COLLECTION_TOKEN)` resolves the
   * collection through its member pools and compiles the merged nodes for real.
   */
  function deliveryRepository(sources: Record<string, SubscriptionSource>) {
    const saved: DeliveryArtifact[] = []
    const repo: SubscriptionDeliveryRepository = {
      findMetadataByToken(token) {
        return Promise.resolve(token === COLLECTION_TOKEN ? metadata("collection-a") : null)
      },
      findSource(id) {
        return Promise.resolve(sources[id] ?? null)
      },
      findArtifact() {
        return Promise.resolve(null)
      },
      readArtifact() {
        return Promise.resolve(null)
      },
      saveArtifactIfCurrent(artifact) {
        saved.push(artifact)
        return Promise.resolve()
      },
      recordDelivery() {
        return Promise.resolve()
      },
    }
    return { repo, saved }
  }

  test("serves the merged canonical nodes of its member pools, deduplicated", async () => {
    const sources: Record<string, SubscriptionSource> = {
      "collection-a": { type: "collection", memberIds: ["pool-a", "pool-b"] },
      "pool-a": { type: "pool", content: poolContent(POOL_ONE) },
      "pool-b": { type: "pool", content: poolContent(POOL_TWO, POOL_ONE_ALIAS) },
    }
    const { repo, saved } = deliveryRepository(sources)
    const delivery = new SubscriptionDelivery(repo, { freshArtifactMs: 0 })

    const outcome = await delivery.deliver(COLLECTION_TOKEN)

    expect(outcome.kind).toBe("delivered")
    if (outcome.kind !== "delivered") return
    expect(outcome.delivery.artifact.nodeCount).toBe(2)
    expect(outcome.delivery.content).toContain("One")
    expect(outcome.delivery.content).toContain("Two")
    expect(saved).toHaveLength(1)
  })

  test("skips a member that is gone or no longer a pool", async () => {
    const sources: Record<string, SubscriptionSource> = {
      "collection-a": { type: "collection", memberIds: ["pool-a", "pool-b", "gone"] },
      "pool-a": { type: "pool", content: poolContent(POOL_ONE) },
      "pool-b": { type: "remote", urls: ["https://example.com/sub"] },
    }
    const delivery = new SubscriptionDelivery(deliveryRepository(sources).repo, {
      freshArtifactMs: 0,
    })

    const outcome = await delivery.deliver(COLLECTION_TOKEN)

    expect(outcome.kind).toBe("delivered")
    if (outcome.kind !== "delivered") return
    expect(outcome.delivery.artifact.nodeCount).toBe(1)
    expect(outcome.delivery.content).toContain("One")
  })

  test("is unavailable when no member can contribute nodes", async () => {
    const sources: Record<string, SubscriptionSource> = {
      "collection-a": { type: "collection", memberIds: ["gone"] },
    }
    const delivery = new SubscriptionDelivery(deliveryRepository(sources).repo, {
      freshArtifactMs: 0,
    })

    const outcome = await delivery.deliver(COLLECTION_TOKEN)

    expect(outcome.kind).toBe("unavailable")
  })
})
