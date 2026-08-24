import { describe, expect, test } from "vitest"
import { parsePoolNodes } from "@/core/subscriptions"
import type {
  SubscriptionPublishingRepository,
  SubscriptionRecord,
  SubscriptionSummary,
} from "@/core/subscriptions"
import { SubscriptionPublishing } from "@/core/subscriptions/publishing"

const FIRST = {
  type: "ss",
  name: "one",
  server: "one.example.com",
  port: 8388,
  cipher: "aes-256-gcm",
  password: "password",
}

function repository() {
  let current: SubscriptionRecord | null = null
  let storedToken = ""
  const repo: SubscriptionPublishingRepository = {
    findById() {
      return Promise.resolve(current)
    },
    list(): Promise<SubscriptionSummary[]> {
      return Promise.resolve([])
    },
    create(subscription, token) {
      current = subscription
      storedToken = token
      return Promise.resolve()
    },
    update(subscription, expectedVersion) {
      expect(expectedVersion).toBe(current?.version)
      current = subscription
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
  return {
    repo,
    read: () => current,
    token: () => storedToken,
  }
}

function subscriptionSummary(id: string): SubscriptionSummary {
  return {
    id,
    tokenHint: "wxyz",
    name: id,
    sourceType: "remote",
    defaultTarget: "clash",
    enabled: true,
    version: 1,
    processorCount: 0,
    linkAvailable: true,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  }
}

/** A repository holding `ids` in list order, recording every reorder it is asked to write. */
function orderedRepository(ids: string[]) {
  const calls: string[][] = []
  const repo: SubscriptionPublishingRepository = {
    findById() {
      return Promise.resolve(null)
    },
    list() {
      return Promise.resolve(ids.map((id) => subscriptionSummary(id)))
    },
    create() {
      return Promise.resolve()
    },
    update() {
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
    reorder(orderedIds) {
      calls.push([...orderedIds])
      return Promise.resolve()
    },
  }
  return { repo, calls }
}

describe("subscription publishing with a persistent node pool", () => {
  test("keeps the minted token while appending nodes and increments the version", async () => {
    const storage = repository()
    const publishing = new SubscriptionPublishing(storage.repo)
    const created = await publishing.publish({
      name: "pool",
      source: { type: "pool", content: JSON.stringify({ proxies: [FIRST] }) },
      defaultTarget: "clash",
      enabled: true,
    })
    const token = created.token

    const result = await publishing.appendNodes(
      created.id,
      "ss://YWVzLTI1Ni1nY206cGFzc3dvcmQ=@two.example.com:8388#Two",
    )

    expect(storage.token()).toBe(token)
    expect(result?.added).toBe(1)
    expect(result?.subscription.version).toBe(2)
    expect(
      parsePoolNodes(
        result?.subscription.source.type === "pool" ? result.subscription.source.content : "",
      ),
    ).toHaveLength(2)
  })

  test("rejects append to a non-pool source", async () => {
    const storage = repository()
    const publishing = new SubscriptionPublishing(storage.repo)
    const created = await publishing.publish({
      name: "raw",
      source: { type: "raw", content: "ss://example" },
      defaultTarget: "clash",
      enabled: true,
    })

    await expect(publishing.appendNodes(created.id, "ss://example")).rejects.toThrow("持久化节点")
  })

  test("renames in place without touching the source", async () => {
    const storage = repository()
    const publishing = new SubscriptionPublishing(storage.repo)
    const created = await publishing.publish({
      name: "before",
      source: { type: "raw", content: "ss://example" },
      defaultTarget: "clash",
      enabled: true,
    })

    const renamed = await publishing.update(created.id, { name: "after" })

    expect(renamed?.name).toBe("after")
    expect(renamed?.version).toBe(2)
    expect(renamed?.source).toStrictEqual(created.source)
    expect(storage.read()?.name).toBe("after")
  })
})

describe("subscription reordering", () => {
  test("accepts a full permutation and writes it", async () => {
    const { repo, calls } = orderedRepository(["a", "b", "c"])
    const publishing = new SubscriptionPublishing(repo)

    await expect(publishing.reorder(["c", "a", "b"])).resolves.toBe(true)
    expect(calls).toStrictEqual([["c", "a", "b"]])
  })

  test("refuses a list that omits a subscription", async () => {
    const { repo, calls } = orderedRepository(["a", "b", "c"])
    const publishing = new SubscriptionPublishing(repo)

    await expect(publishing.reorder(["a", "b"])).resolves.toBe(false)
    expect(calls).toHaveLength(0)
  })

  test("refuses a list with an unknown id", async () => {
    const { repo, calls } = orderedRepository(["a", "b", "c"])
    const publishing = new SubscriptionPublishing(repo)

    await expect(publishing.reorder(["a", "b", "x"])).resolves.toBe(false)
    expect(calls).toHaveLength(0)
  })

  test("refuses duplicate ids hiding a missing one", async () => {
    const { repo, calls } = orderedRepository(["a", "b", "c"])
    const publishing = new SubscriptionPublishing(repo)

    await expect(publishing.reorder(["a", "a", "b"])).resolves.toBe(false)
    expect(calls).toHaveLength(0)
  })
})
