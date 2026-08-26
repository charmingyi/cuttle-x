import { describe, expect, test } from "vitest"
import { inspectNodeList } from "@/core/nodes"
import { renderUriNode } from "@/core/nodes/targets/shared/uri-node"

// A real doubly-bracketed IPv6 share link as some exporters write it.
const DOUBLE =
  "ss://2022-blake3-aes-256-gcm:aSzMTOoh03DLKMp5axd47V7EeP32KbZ8Gk1HeoQYYgM@[[2606:3c0:7:fffe::26a]]:8388#CanadaFree"
const SINGLE =
  "ss://2022-blake3-aes-256-gcm:aSzMTOoh03DLKMp5axd47V7EeP32KbZ8Gk1HeoQYYgM@[2606:3c0:7:fffe::26a]:8388#CanadaFree"

describe("an IPv6 Shadowsocks link with excess brackets", () => {
  test("parses the canonical server as the bare address", () => {
    const result = inspectNodeList(DOUBLE)
    expect(result.diagnostics).toStrictEqual([])
    expect(result.nodes).toHaveLength(1)
    const node = result.nodes[0]
    if (!node) throw new Error("expected one node")
    expect(node.server).toBe("2606:3c0:7:fffe::26a")
    expect(node.port).toBe(8388)
    expect(node.type).toBe("ss")
    expect(node.cipher).toBe("2022-blake3-aes-256-gcm")
    expect(node.name).toBe("CanadaFree")
  })

  test("renders back with exactly one bracket pair", () => {
    const result = inspectNodeList(DOUBLE)
    const node = result.nodes[0]
    if (!node) throw new Error("expected one node")
    const rendered = renderUriNode(node)
    expect(rendered).toContain("@[2606:3c0:7:fffe::26a]:8388#")
    expect(rendered).not.toContain("[[")
  })

  test("a single pair parses the same way", () => {
    const result = inspectNodeList(SINGLE)
    expect(result.nodes[0]?.server).toBe("2606:3c0:7:fffe::26a")
  })

  test("the rendered link round-trips to an identical node", () => {
    const first = inspectNodeList(DOUBLE).nodes[0]
    if (!first) throw new Error("expected one node")
    const rendered = renderUriNode(first)
    if (!rendered) throw new Error("expected a rendered URI")
    const second = inspectNodeList(rendered).nodes[0]
    expect(second?.server).toBe(first.server)
    expect(second?.port).toBe(first.port)
    expect(second?.cipher).toBe(first.cipher)
    expect(second?.password).toBe(first.password)
  })
})
