import { env } from "cloudflare:workers"
import { describe, expect, test } from "vitest"
import type { SubscriptionRecord } from "@/core/subscriptions"
import { SubscriptionDelivery } from "@/core/subscriptions/delivery"
import { D1SubscriptionRepository } from "@/platform/d1/subscription-repository"
import { AesSubscriptionTokenProtector } from "@/server/subscription-token-protector"

const TARGET = "clash"

function subscription(id: string, overrides: Partial<SubscriptionRecord> = {}): SubscriptionRecord {
  return {
    id,
    tokenHint: "wxyz",
    name: id,
    source: { type: "remote", urls: ["https://example.com/sub"] },
    defaultTarget: TARGET,
    enabled: true,
    version: 1,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    ...overrides,
  }
}

function poolSource(names: string[]) {
  return {
    type: "pool" as const,
    content: JSON.stringify({
      proxies: names.map((name, index) => ({
        type: "ss",
        name,
        server: `host${index}.example.com`,
        port: 8388,
        cipher: "aes-256-gcm",
        password: "password",
      })),
    }),
  }
}

function createRepository() {
  return new D1SubscriptionRepository(
    env.DB,
    new AesSubscriptionTokenProtector(env.CUTTLE_LINK_KEY),
  )
}

describe("collections in D1", () => {
  test("a collection row round-trips its source and is listed as a collection", async () => {
    const repository = createRepository()
    const record = subscription("col-roundtrip", {
      source: { type: "collection", memberIds: ["col-pool-a", "col-pool-b"] },
    })
    await repository.create(record, "token-for-col-roundtrip")

    await expect(repository.findSource(record.id)).resolves.toStrictEqual(record.source)
    await expect(repository.findById(record.id)).resolves.toMatchObject({
      id: record.id,
      source: { type: "collection", memberIds: ["col-pool-a", "col-pool-b"] },
    })
    const stored = await env.DB.prepare(
      "SELECT is_collection, folder FROM subscriptions WHERE id = ?",
    )
      .bind(record.id)
      .first<{ is_collection: number; folder: string | null }>()
    expect(stored).toMatchObject({ is_collection: 1, folder: null })
    await expect(repository.list()).resolves.toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: record.id, sourceType: "collection", folder: undefined }),
      ]),
    )
  })

  test("a folder is persisted and updated without touching the source", async () => {
    const repository = createRepository()
    const record = subscription("col-folder", {
      source: { type: "pool", content: poolSource(["one"]).content },
      folder: "group-a",
    })
    await repository.create(record, "token-for-col-folder")

    await expect(repository.findById(record.id)).resolves.toMatchObject({ folder: "group-a" })
    await expect(repository.list()).resolves.toStrictEqual(
      expect.arrayContaining([expect.objectContaining({ id: record.id, folder: "group-a" })]),
    )

    const renamed = subscription(record.id, {
      ...record,
      folder: "group-b",
      version: 2,
      updatedAt: "2026-01-02T00:00:00.000Z",
    })
    await repository.update(renamed, record.version)

    await expect(repository.findById(record.id)).resolves.toMatchObject({
      folder: "group-b",
      source: record.source,
    })
  })

  test("rows without a folder read back as ungrouped and non-collection", async () => {
    const repository = createRepository()
    const record = subscription("col-legacy", {
      source: { type: "pool", content: poolSource(["one"]).content },
    })
    await repository.create(record, "token-for-col-legacy")

    await expect(repository.findById(record.id)).resolves.toMatchObject({ folder: undefined })
    await expect(repository.list()).resolves.toStrictEqual(
      expect.arrayContaining([expect.objectContaining({ id: record.id, sourceType: "pool" })]),
    )
  })
})

describe("collection delivery through D1", () => {
  test("serves the merged members with a stable token and reflects member node changes", async () => {
    const repository = createRepository()
    const poolA = subscription("col-deliver-a", {
      source: poolSource(["a-one"]),
    })
    const poolB = subscription("col-deliver-b", {
      source: poolSource(["b-one"]),
    })
    await repository.create(poolA, "token-for-col-deliver-a")
    await repository.create(poolB, "token-for-col-deliver-b")

    const collectionToken = "c".repeat(64)
    const collection = subscription("col-deliver-collection", {
      source: { type: "collection", memberIds: ["col-deliver-a", "col-deliver-b"] },
    })
    await repository.create(collection, collectionToken)

    // `freshArtifactMs: 0` keeps every delivery on the refresh path, so member changes show up
    // immediately instead of inside the normal 60 s reuse window.
    const delivery = new SubscriptionDelivery(repository, { freshArtifactMs: 0 })
    const first = await delivery.deliver(collectionToken, TARGET)

    expect(first.kind).toBe("delivered")
    if (first.kind !== "delivered") return
    expect(first.delivery.artifact.nodeCount).toBe(2)
    expect(first.delivery.content).toContain("node-0")
    expect(first.delivery.content).toContain("node-1")

    // Appending a node to one member must flow into the collection's next delivery.
    const grownA = subscription(poolA.id, {
      ...poolA,
      source: poolSource(["a-one", "a-two"]),
      version: 2,
      updatedAt: "2026-01-02T00:00:00.000Z",
    })
    await repository.update(grownA, poolA.version)

    const second = await delivery.deliver(collectionToken, TARGET)
    expect(second.kind).toBe("delivered")
    if (second.kind !== "delivered") return
    expect(second.delivery.artifact.nodeCount).toBe(3)
  })

  test("updating membership keeps the collection's fixed token", async () => {
    const repository = createRepository()
    const poolA = subscription("col-token-a", { source: poolSource(["a-one"]) })
    const poolB = subscription("col-token-b", { source: poolSource(["b-one"]) })
    await repository.create(poolA, "token-for-col-token-a")
    await repository.create(poolB, "token-for-col-token-b")

    const collectionToken = "d".repeat(64)
    const collection = subscription("col-token-collection", {
      source: { type: "collection", memberIds: ["col-token-a"] },
    })
    await repository.create(collection, collectionToken)

    const changed = subscription(collection.id, {
      ...collection,
      source: { type: "collection", memberIds: ["col-token-a", "col-token-b"] },
      version: 2,
      updatedAt: "2026-01-02T00:00:00.000Z",
    })
    await repository.update(changed, collection.version)

    await expect(repository.findMetadataByToken(collectionToken)).resolves.toMatchObject({
      id: collection.id,
      version: 2,
    })
    const delivery = new SubscriptionDelivery(repository, { freshArtifactMs: 0 })
    const outcome = await delivery.deliver(collectionToken, TARGET)
    expect(outcome.kind).toBe("delivered")
    if (outcome.kind !== "delivered") return
    expect(outcome.delivery.artifact.nodeCount).toBe(2)
  })
})
