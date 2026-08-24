import { env } from "cloudflare:workers"
import { describe, expect, test } from "vitest"
import { ConflictError } from "@/core/errors"
import type { DeliveryArtifact, SubscriptionRecord, SubscriptionSource } from "@/core/subscriptions"
import { D1SubscriptionRepository } from "@/platform/d1/subscription-repository"
import { AesSubscriptionTokenProtector } from "@/server/subscription-token-protector"

const TARGET = "clash"

// Storage is shared across the tests in this file, so every case owns a distinct subscription.
function subscription(id: string, overrides: Partial<SubscriptionRecord> = {}): SubscriptionRecord {
  return {
    id,
    tokenHint: "wxyz",
    name: "primary",
    source: { type: "remote", urls: ["https://example.com/sub?token=upstream-secret"] },
    defaultTarget: TARGET,
    enabled: true,
    version: 1,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    ...overrides,
  }
}

function artifact(
  subscriptionId: string,
  overrides: Partial<DeliveryArtifact> = {},
): DeliveryArtifact {
  return {
    subscriptionId,
    target: TARGET,
    subscriptionVersion: 1,
    etag: '"v1"',
    nodeCount: 3,
    responseHeaders: { "subscription-userinfo": "upload=1" },
    createdAt: "2026-01-01T00:00:00.000Z",
    content: "proxies: []\n",
    ...overrides,
  }
}

function createRepository() {
  return new D1SubscriptionRepository(
    env.DB,
    new AesSubscriptionTokenProtector(env.CUTTLE_LINK_KEY),
  )
}

async function seeded(id: string, overrides: Partial<SubscriptionRecord> = {}) {
  const repository = createRepository()
  const record = subscription(id, overrides)
  await repository.create(record, `token-for-${id}`)
  return { repository, record }
}

function countRows(table: string, subscriptionId: string) {
  return env.DB.prepare(`SELECT count(*) AS n FROM ${table} WHERE subscription_id = ?`)
    .bind(subscriptionId)
    .first<{ n: number }>()
    .then((row) => row?.n ?? 0)
}

function storedContent(table: string, subscriptionId: string) {
  return env.DB.prepare(
    `SELECT content FROM ${table} WHERE subscription_id = ? AND chunk_index = 0`,
  )
    .bind(subscriptionId)
    .first<{ content: string }>()
    .then((row) => row?.content)
}

describe("the subscription source in D1", () => {
  test("a created subscription reads its source back", async () => {
    const { repository, record } = await seeded("sub-read")

    const found = await repository.findById(record.id)
    expect(found?.source).toStrictEqual(record.source)
    expect(await repository.findSource(record.id)).toStrictEqual(record.source)
  })

  test("the stored column holds the source verbatim", async () => {
    const { record } = await seeded("sub-verbatim")

    expect(await storedContent("subscription_source_chunks", record.id)).toBe(
      JSON.stringify(record.source),
    )
  })

  test("a source larger than one column spans rows and rejoins", async () => {
    const source: SubscriptionSource = { type: "raw", content: "x".repeat(200_000) }
    const { repository, record } = await seeded("sub-large", { source })

    expect(await countRows("subscription_source_chunks", record.id)).toBeGreaterThan(1)
    expect(await repository.findSource(record.id)).toStrictEqual(source)
  })

  test("a pool update keeps its fixed token and invalidates the old artifact", async () => {
    const token = "token-for-sub-pool"
    const source: SubscriptionSource = {
      type: "pool",
      content: JSON.stringify({
        proxies: [
          {
            type: "ss",
            name: "one",
            server: "one.example.com",
            port: 8388,
            cipher: "aes-256-gcm",
            password: "password",
          },
        ],
      }),
    }
    const { repository, record } = await seeded("sub-pool", { source })
    await repository.saveArtifactIfCurrent(artifact(record.id), "2026-01-01T00:00:01.000Z")

    const updated = subscription(record.id, {
      source: {
        type: "pool",
        content: JSON.stringify({
          proxies: [
            {
              type: "ss",
              name: "one",
              server: "one.example.com",
              port: 8388,
              cipher: "aes-256-gcm",
              password: "password",
            },
            {
              type: "ss",
              name: "two",
              server: "two.example.com",
              port: 8388,
              cipher: "aes-256-gcm",
              password: "password",
            },
          ],
        }),
      },
      version: 2,
      updatedAt: "2026-01-02T00:00:00.000Z",
    })
    await repository.update(updated, record.version)

    await expect(repository.findMetadataByToken(token)).resolves.toMatchObject({
      id: record.id,
      version: 2,
    })
    await expect(repository.findSource(record.id)).resolves.toStrictEqual(updated.source)
    await expect(repository.readArtifact(record.id, TARGET)).resolves.toBeNull()
    await expect(repository.update(updated, record.version)).rejects.toBeInstanceOf(ConflictError)
  })

  test("an update replaces the previous rows instead of appending to them", async () => {
    const { repository } = await seeded("sub-update", {
      source: { type: "raw", content: "y".repeat(200_000) },
    })
    const replaced = subscription("sub-update", {
      source: { type: "raw", content: "short" },
      version: 2,
      updatedAt: "2026-01-02T00:00:00.000Z",
    })
    await repository.update(replaced)

    expect(await countRows("subscription_source_chunks", replaced.id)).toBe(1)
    expect(await repository.findSource(replaced.id)).toStrictEqual(replaced.source)
  })
})

describe("recoverable subscription links", () => {
  test("a new token is encrypted and can be recovered by the authenticated manager", async () => {
    const token = "token-for-sub-link-recover"
    const { repository, record } = await seeded("sub-link-recover")
    const stored = await env.DB.prepare("SELECT token_ciphertext FROM subscriptions WHERE id = ?")
      .bind(record.id)
      .first<{ token_ciphertext: string }>()

    expect(stored?.token_ciphertext).not.toContain(token)
    await expect(repository.recoverToken(record.id)).resolves.toBe(token)
    await expect(repository.list()).resolves.toStrictEqual(
      expect.arrayContaining([expect.objectContaining({ id: record.id, linkAvailable: true })]),
    )
  })

  test("a damaged ciphertext is unavailable in both list and recovery", async () => {
    const { repository, record } = await seeded("sub-link-damaged")
    await env.DB.prepare("UPDATE subscriptions SET token_ciphertext = ? WHERE id = ?")
      .bind("v1.AA.invalid", record.id)
      .run()

    await expect(repository.recoverToken(record.id)).rejects.toThrow("invalid")
    await expect(repository.list()).resolves.toStrictEqual(
      expect.arrayContaining([expect.objectContaining({ id: record.id, linkAvailable: false })]),
    )
  })

  test("a legacy token is registered only when it matches the existing digest", async () => {
    const token = "token-for-sub-link-register"
    const { repository, record } = await seeded("sub-link-register")
    await env.DB.prepare("UPDATE subscriptions SET token_ciphertext = NULL WHERE id = ?")
      .bind(record.id)
      .run()

    await expect(repository.recoverToken(record.id)).resolves.toBeNull()
    await expect(
      repository.registerToken(record.id, "wrong-token-value-that-is-long-enough"),
    ).resolves.toBe(false)
    await expect(repository.recoverToken(record.id)).resolves.toBeNull()
    await expect(repository.registerToken(record.id, token)).resolves.toBe(true)
    await expect(repository.recoverToken(record.id)).resolves.toBe(token)
  })
})

describe("the compiled artifact cache in D1", () => {
  test("a saved artifact reads its body back", async () => {
    const { repository, record } = await seeded("sub-artifact")
    const cached = artifact(record.id)
    await repository.saveArtifactIfCurrent(cached, "2026-01-01T00:00:01.000Z")

    const read = await repository.readArtifact(record.id, TARGET)
    expect(read?.content).toBe(cached.content)
    expect(read?.nodeCount).toBe(cached.nodeCount)
    expect(read?.etag).toBe(cached.etag)
  })

  test("the stored column holds the body verbatim", async () => {
    const { repository, record } = await seeded("sub-body")
    const cached = artifact(record.id)
    await repository.saveArtifactIfCurrent(cached, "2026-01-01T00:00:01.000Z")

    expect(await storedContent("compiled_artifact_chunks", record.id)).toBe(cached.content)
  })

  test("a body larger than one column spans rows and rejoins", async () => {
    const { repository, record } = await seeded("sub-large-body")
    const cached = artifact(record.id, { content: "z".repeat(200_000) })
    await repository.saveArtifactIfCurrent(cached, "2026-01-01T00:00:01.000Z")

    expect(await countRows("compiled_artifact_chunks", record.id)).toBeGreaterThan(1)
    const read = await repository.readArtifact(record.id, TARGET)
    expect(read?.content).toBe(cached.content)
  })

  test("metadata left without a body is a cache miss, not a failure", async () => {
    const { repository, record } = await seeded("sub-cache-miss")
    await repository.saveArtifactIfCurrent(artifact(record.id), "2026-01-01T00:00:01.000Z")
    await env.DB.prepare("DELETE FROM compiled_artifact_chunks WHERE subscription_id = ?")
      .bind(record.id)
      .run()

    expect(await repository.readArtifact(record.id, TARGET)).toBeNull()
    expect(await repository.findArtifact(record.id, TARGET)).not.toBeNull()
  })

  test("an artifact for a superseded version is not written", async () => {
    const { repository, record } = await seeded("sub-stale", { version: 2 })
    await repository.saveArtifactIfCurrent(
      artifact(record.id, { subscriptionVersion: 1 }),
      "2026-01-01T00:00:01.000Z",
    )

    expect(await repository.readArtifact(record.id, TARGET)).toBeNull()
    expect(await countRows("compiled_artifact_chunks", record.id)).toBe(0)
  })
})

// The list mixes pinned and unpinned rows; indexOf keeps the assertion robust against the other
// tests' rows, which are unpinned and sort after every pinned subscription.
async function listIndex(repository: D1SubscriptionRepository, id: string) {
  const listed = await repository.list()
  return listed.findIndex((item) => item.id === id)
}

describe("the subscription list order in D1", () => {
  test("unpinned rows keep the historical updated_at order", async () => {
    const older = await seeded("order-older", { updatedAt: "2026-01-01T00:00:00.000Z" })
    const newer = await seeded("order-newer", { updatedAt: "2026-01-02T00:00:00.000Z" })

    expect(await listIndex(older.repository, "order-older")).toBeGreaterThan(
      await listIndex(newer.repository, "order-newer"),
    )
  })

  test("reorder pins the subscriptions to the written positions", async () => {
    const a = await seeded("order-a", { updatedAt: "2026-01-03T00:00:00.000Z" })
    await seeded("order-b", { updatedAt: "2026-01-02T00:00:00.000Z" })
    await seeded("order-c", { updatedAt: "2026-01-01T00:00:00.000Z" })

    await a.repository.reorder(["order-a", "order-c", "order-b"])

    const indexA = await listIndex(a.repository, "order-a")
    const indexB = await listIndex(a.repository, "order-b")
    const indexC = await listIndex(a.repository, "order-c")
    expect(indexA).toBeGreaterThanOrEqual(0)
    expect(indexA).toBeLessThan(indexC)
    expect(indexC).toBeLessThan(indexB)
    const listed = await a.repository.list()
    expect(listed[indexA]?.sortOrder).toBe(0)
    expect(listed[indexC]?.sortOrder).toBe(1)
    expect(listed[indexB]?.sortOrder).toBe(2)
  })
})
