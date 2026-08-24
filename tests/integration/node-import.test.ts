import { env } from "cloudflare:workers"
import { describe, expect, test } from "vitest"
import type { CanonicalNode } from "@/core/nodes"
import { canonicalToNodeForm, nodeToCanonical } from "@/core/nodes/entity"
import { inspectNodeList } from "@/core/nodes/pipeline"
import type { SubscriptionRecord } from "@/core/subscriptions"
import { importNodes, removeNodes, reorderNodes } from "@/features/nodes/api/operations"
import {
  editorValuesFromRecord,
  sourceFromValues,
  EMPTY_EDITOR_VALUES,
} from "@/features/subscriptions/editor/editor-values"
import { createNodeRepository } from "@/platform/d1/node-repository"
import { AdminFailure } from "@/shared/admin-error"

const SS = "ss://YWVzLTI1Ni1nY206cGFzc3dvcmQ=@one.example.com:8388#One"

function record(id: string, source: SubscriptionRecord["source"]): SubscriptionRecord {
  return {
    id,
    tokenHint: "wxyz",
    name: "nodes-sub",
    source,
    defaultTarget: "clash",
    enabled: true,
    version: 1,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  }
}

describe("node import across the persistence boundary", () => {
  test("a share link flows through inspect → form → D1 → canonical and reads back whole", async () => {
    const repository = createNodeRepository(env.DB)
    const inspected = inspectNodeList(SS)
    expect(inspected.diagnostics).toHaveLength(0)
    expect(inspected.nodes).toHaveLength(1)

    const forms = inspected.nodes.map((node) => canonicalToNodeForm(node))
    const created = await repository.createMany(forms)
    expect(created).toHaveLength(1)
    expect(created[0]?.name).toBe(inspected.nodes[0]?.name)
    expect(created[0]?.port).toBe(inspected.nodes[0]?.port ?? 0)

    const first = created[0]
    if (!first) throw new Error("created[0] must exist")
    const persisted = await repository.findById(first.id)
    expect(persisted).not.toBeNull()
    if (!persisted) return
    // Credentials survive the JSON columns, not only the common fields.
    const back = nodeToCanonical(persisted)
    expect(back.server).toBe(inspected.nodes[0]?.server)
    expect(back.port).toBe(inspected.nodes[0]?.port)
    expect(back.password).toBe("password")
    expect(back.cipher).toBe("aes-256-gcm")
  })

  test("createMany persists every node and list returns them all", async () => {
    const repository = createNodeRepository(env.DB)
    const nodes = [
      "ss://YWVzLTI1Ni1nY206cGFzc3dvcmQ=@one.example.com:8388#One",
      "ss://YWVzLTI1Ni1nY206cGFzc3dvcmQ=@two.example.com:8389#Two",
    ]
    const created = await repository.createMany(
      inspectNodeList(nodes.join("\n")).nodes.map(canonicalToNodeForm),
    )
    expect(created).toHaveLength(2)

    const listed = await repository.list()
    const names = new Set(listed.map((node) => node.name))
    expect(names.has("One")).toBe(true)
    expect(names.has("Two")).toBe(true)
  })

  test("findByIds returns only the requested nodes", async () => {
    const repository = createNodeRepository(env.DB)
    const a = inspectNodeList("ss://YWVzLTI1Ni1nY206cGFzc3dvcmQ=@a.example.com:8388#FindA").nodes[0]
    const b = inspectNodeList("ss://YWVzLTI1Ni1nY206cGFzc3dvcmQ=@b.example.com:8389#FindB").nodes[0]
    if (!a || !b) throw new Error("expected parsed nodes")
    const created = await repository.createMany([canonicalToNodeForm(a), canonicalToNodeForm(b)])
    const ids = created.map((node) => node.id)
    const found = await repository.findByIds(ids)
    expect(found.map((node) => node.id).toSorted()).toStrictEqual([...ids].toSorted())
  })

  test("findByIds omits ids that do not exist", async () => {
    const repository = createNodeRepository(env.DB)
    const c = inspectNodeList("ss://YWVzLTI1Ni1nY206cGFzc3dvcmQ=@c.example.com:8390#FindC").nodes[0]
    if (!c) throw new Error("expected parsed node")
    const created = await repository.createMany([canonicalToNodeForm(c)])
    const first = created[0]
    if (!first) throw new Error("created[0] must exist")
    const found = await repository.findByIds([first.id, "missing-id-1", "missing-id-2"])
    expect(found.map((node) => node.id)).toStrictEqual([first.id])
  })

  test("findByIds handles an empty id list", async () => {
    const repository = createNodeRepository(env.DB)
    const found = await repository.findByIds([])
    expect(found).toStrictEqual([])
  })
})

describe("the importNodes operation", () => {
  test("imports canonical nodes into D1 and reports a clean count", async () => {
    const inspected = inspectNodeList(SS)
    const result = await importNodes({ nodes: inspected.nodes })
    expect(result.imported).toBe(1)
    expect(result.errors).toStrictEqual([])
    expect(result.nodes).toHaveLength(1)
    // The persisted row is immediately visible.
    const repository = createNodeRepository(env.DB)
    const allNodes = await repository.list()
    const names = allNodes.map((node) => node.name)
    expect(names).toContain("One")
  })

  test("an empty list is refused before any persistence", async () => {
    await expect(importNodes({ nodes: [] })).rejects.toBeInstanceOf(AdminFailure)
  })

  test("an invalid node format is reported as an error and does not abort the batch", async () => {
    const invalid = { type: "ss", name: "", server: "x.example.com", port: 8388 }
    const result = await importNodes({ nodes: [invalid as CanonicalNode] })
    expect(result.imported).toBe(0)
    expect(result.errors).toHaveLength(1)
    expect(result.errors[0]?.index).toBe(0)
    expect(result.errors[0]?.message).toContain("节点名称")
  })
})

describe("the removeNodes and reorderNodes operations", () => {
  const LIST = [
    "ss://YWVzLTI1Ni1nY206cGFzc3dvcmQ=@rm1.example.com:8388#Rm1",
    "ss://YWVzLTI1Ni1nY206cGFzc3dvcmQ=@rm2.example.com:8389#Rm2",
    "ss://YWVzLTI1Ni1nY206cGFzc3dvcmQ=@rm3.example.com:8390#Rm3",
    "ss://YWVzLTI1Ni1nY206cGFzc3dvcmQ=@rm4.example.com:8391#Rm4",
  ]

  async function seed(): Promise<string[]> {
    const repository = createNodeRepository(env.DB)
    const created = await repository.createMany(
      inspectNodeList(LIST.join("\n")).nodes.map(canonicalToNodeForm),
    )
    return created.map((node) => node.id)
  }

  test("removeNodes deletes exactly the requested ids", async () => {
    const ids = await seed()
    const result = await removeNodes({ ids: [ids[0]!, ids[2]!] })
    expect(result.deleted).toBe(2)
    const remaining = await createNodeRepository(env.DB).list()
    const remainingIds = new Set(remaining.map((node) => node.id))
    expect(remainingIds.has(ids[0]!)).toBe(false)
    expect(remainingIds.has(ids[1]!)).toBe(true)
    expect(remainingIds.has(ids[2]!)).toBe(false)
    expect(remainingIds.has(ids[3]!)).toBe(true)
  })

  test("removeNodes refuses an empty id list", async () => {
    await expect(removeNodes({ ids: [] })).rejects.toBeInstanceOf(AdminFailure)
  })

  test("removeNodes refuses more than 500 ids", async () => {
    await expect(
      removeNodes({ ids: Array.from({ length: 501 }, (_, i) => `id-${i}`) }),
    ).rejects.toBeInstanceOf(AdminFailure)
  })

  test("reorderNodes persists the given order", async () => {
    await seed()
    // reorder states the full new order; the shared DB may hold rows from earlier tests, so
    // assert against the list as it stands rather than only the nodes this test seeded.
    const repository = createNodeRepository(env.DB)
    const before = (await repository.list()).map((node) => node.id)
    const reversed = [...before].reverse()
    await reorderNodes({ ids: reversed })
    const after = await repository.list()
    expect(after.map((node) => node.id)).toStrictEqual(reversed)
  })

  test("reorderNodes refuses an empty id list", async () => {
    await expect(reorderNodes({ ids: [] })).rejects.toBeInstanceOf(AdminFailure)
  })
})

describe("the nodes subscription source in the editor values", () => {
  test("editor values round-trip the referenced node ids", () => {
    const sub = record("nodes-values", { type: "nodes", ids: ["n-1", "n-2"] })
    const values = editorValuesFromRecord(sub)
    expect(values.sourceType).toBe("nodes")
    expect(JSON.parse(values.sourceValue)).toStrictEqual(["n-1", "n-2"])

    const round = sourceFromValues({ ...EMPTY_EDITOR_VALUES, ...values })
    expect(round).toStrictEqual({ type: "nodes", ids: ["n-1", "n-2"] })
  })

  test("a corrupt sourceValue degrades to an empty id list rather than throwing", () => {
    const value = sourceFromValues({
      ...EMPTY_EDITOR_VALUES,
      sourceType: "nodes",
      sourceValue: "{not-json",
    })
    expect(value).toStrictEqual({ type: "nodes", ids: [] })
  })

  test("editing a node reference does not enlarge an empty selection", () => {
    // An editor left blank still resolves to a valid (empty) reference, not a different source kind.
    const value = sourceFromValues({
      ...EMPTY_EDITOR_VALUES,
      sourceType: "nodes",
      sourceValue: "",
    })
    expect(value).toStrictEqual({ type: "nodes", ids: [] })
  })
})
