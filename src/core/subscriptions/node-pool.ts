import { ValidationError } from "@/core/errors"
import { inspectNodeList, MAX_SOURCE_SIZE, validateCanonical } from "@/core/nodes"
import type { CanonicalNode } from "@/core/nodes"

const MAX_POOL_NODES = 5_000

function sortValue(value: unknown, root = false): unknown {
  if (Array.isArray(value)) return value.map((entry) => sortValue(entry))
  if (!value || typeof value !== "object") return value
  return Object.fromEntries(
    Object.entries(value)
      .filter(([key]) => !root || key !== "name")
      .toSorted(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0))
      .map(([key, entry]) => [key, sortValue(entry)]),
  )
}

function nodeKey(node: CanonicalNode) {
  return JSON.stringify(sortValue(node, true))
}

export function mergePoolNodes(existing: CanonicalNode[], incoming: CanonicalNode[]) {
  const merged: CanonicalNode[] = []
  const seen = new Set<string>()
  for (const node of [...existing, ...incoming]) {
    const key = nodeKey(node)
    if (seen.has(key)) continue
    seen.add(key)
    merged.push(node)
  }
  return merged
}

export function serializePoolNodes(nodes: CanonicalNode[]) {
  if (nodes.length > MAX_POOL_NODES) {
    throw new ValidationError(`持久化节点订阅最多保存 ${MAX_POOL_NODES} 个节点。`)
  }
  const content = JSON.stringify({ proxies: nodes })
  if (new TextEncoder().encode(content).byteLength > MAX_SOURCE_SIZE) {
    throw new ValidationError("持久化节点数据不能超过 2 MiB。")
  }
  return content
}

export function parsePoolNodes(content: string) {
  let value: unknown
  try {
    value = JSON.parse(content)
  } catch (error) {
    throw new ValidationError("持久化节点数据不是有效的 JSON。", { cause: error })
  }
  const proxies =
    value && typeof value === "object" && Array.isArray((value as { proxies?: unknown }).proxies)
      ? (value as { proxies: unknown[] }).proxies
      : null
  if (!proxies) throw new ValidationError("持久化节点数据缺少 proxies 数组。")
  if (proxies.length > MAX_POOL_NODES) {
    throw new ValidationError(`持久化节点订阅最多保存 ${MAX_POOL_NODES} 个节点。`)
  }
  const nodes = proxies.filter((item): item is CanonicalNode =>
    Boolean(item && typeof item === "object"),
  )
  if (nodes.length !== proxies.length) {
    throw new ValidationError("持久化节点数据包含无效节点。")
  }
  const validated = validateCanonical(nodes)
  if (validated.nodes.length === 0) {
    throw new ValidationError("持久化节点订阅至少需要一个有效节点。")
  }
  if (validated.nodes.length !== nodes.length) {
    throw new ValidationError("持久化节点数据包含无效节点。")
  }
  return validated.nodes
}

export function importPoolNodes(content: string) {
  const inspected = inspectNodeList(content)
  const validated = validateCanonical(inspected.nodes)
  if (validated.nodes.length === 0) {
    throw new ValidationError("没有识别到可保存的有效节点。")
  }
  return {
    nodes: validated.nodes,
    skipped: inspected.diagnostics.length + validated.diagnostics.length,
  }
}

export function normalizePoolSource(content: string) {
  const nodes = parsePoolNodes(content)
  return { type: "pool" as const, content: serializePoolNodes(mergePoolNodes([], nodes)) }
}
