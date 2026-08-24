import { describe, expect, test } from "vitest"
import type { CanonicalNode } from "@/core/nodes"
import {
  importPoolNodes,
  mergePoolNodes,
  parsePoolNodes,
  serializePoolNodes,
} from "@/core/subscriptions"

const FIRST = "ss://YWVzLTI1Ni1nY206cGFzc3dvcmQ=@one.example.com:8388#One"
const DUPLICATE = "ss://YWVzLTI1Ni1nY206cGFzc3dvcmQ=@one.example.com:8388#Renamed"
const SECOND = "ss://YWVzLTI1Ni1nY206cGFzc3dvcmQ=@two.example.com:8388#Two"

describe("persistent node pool", () => {
  test("imports nodes and removes duplicate endpoints while preserving first names", () => {
    const first = importPoolNodes(`${FIRST}\n${DUPLICATE}`)
    const second = importPoolNodes(SECOND)
    const merged = mergePoolNodes(first.nodes, second.nodes)

    expect(first.nodes).toHaveLength(2)
    expect(merged).toHaveLength(2)
    expect(merged[0].name).toBe("One")
    expect(merged[1].name).toBe("Two")
  })

  test("keeps same endpoint nodes when credentials differ", () => {
    const first = importPoolNodes(FIRST).nodes[0]
    const second = { ...first, password: "different" }

    expect(mergePoolNodes([first], [second])).toHaveLength(2)
  })

  test("round-trips canonical nodes as a structured pool source", () => {
    const nodes: CanonicalNode[] = importPoolNodes(FIRST).nodes
    const content = serializePoolNodes(nodes)

    expect(JSON.parse(content)).toHaveProperty("proxies")
    expect(parsePoolNodes(content)).toStrictEqual(nodes)
  })
})
