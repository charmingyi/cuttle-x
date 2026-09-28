import { TARGET_IDS, targetLabel } from "@/core/nodes"
import type { TargetId } from "@/core/nodes"
import type { AuditEntry, AuditKind } from "@/server/audit-log"
import { parseUserAgent } from "./device"

/** Detail JSON stores the target as a bare string; render known ones as client names. */
export function safeTargetLabel(target: string): string {
  return TARGET_IDS.includes(target as TargetId) ? targetLabel(target as TargetId) : target
}

export const KIND_LABELS: Record<AuditKind, string> = {
  auth_login: "登录成功",
  auth_failed: "登录失败",
  node_create: "节点创建",
  node_update: "节点编辑",
  node_delete: "节点删除",
  node_bulk_delete: "批量删除",
  node_import: "节点导入",
  node_check: "节点拨测",
  subscription_create: "订阅创建",
  subscription_update: "订阅修改",
  subscription_delete: "订阅删除",
  subscription_rotate: "订阅换钥",
  subscription_reorder: "订阅排序",
  subscription_check: "订阅检查",
  delivery: "订阅拉取",
  delivery_failed: "拉取失败",
}

/** The filter chips, grouped the way the panel thinks: access first, then management noise. */
export const KIND_FILTERS: Array<{
  value: AuditKind | "all" | "delivery" | "auth"
  label: string
}> = [
  { value: "all", label: "全部事件" },
  { value: "delivery", label: "订阅拉取" },
  { value: "delivery_failed", label: "拉取失败" },
  { value: "auth", label: "登录记录" },
  { value: "node_import", label: "节点导入" },
  { value: "node_create", label: "节点创建" },
  { value: "node_update", label: "节点编辑" },
  { value: "node_delete", label: "节点删除" },
  { value: "node_bulk_delete", label: "批量删除" },
  { value: "subscription_create", label: "订阅创建" },
  { value: "subscription_update", label: "订阅修改" },
  { value: "subscription_delete", label: "订阅删除" },
  { value: "subscription_rotate", label: "订阅换钥" },
  { value: "subscription_reorder", label: "订阅排序" },
]

export type KindFilter = (typeof KIND_FILTERS)[number]["value"]

export interface DeliveryDetail {
  ip: string
  country: string
  ua: string
  name: string
  subscriptionId: string
  target: string
  nodeCount: number
  stale: boolean
  hosts: string[]
  durationMs: number
  error: string
}

export function parseDetail(entry: AuditEntry): Record<string, unknown> {
  try {
    const parsed: unknown = JSON.parse(entry.detailJson)
    return parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : {}
  } catch {
    return {}
  }
}

/** The detail fields a delivery row (success or failure) renders as its facts. */
export function deliveryDetail(entry: AuditEntry): DeliveryDetail {
  const detail = parseDetail(entry)
  return {
    ip: String(detail.ip ?? ""),
    country: String(detail.country ?? ""),
    ua: String(detail.ua ?? ""),
    name: String(detail.name ?? "?"),
    subscriptionId: String(detail.subscriptionId ?? ""),
    target: String(detail.target ?? ""),
    nodeCount: Number(detail.nodeCount ?? 0),
    stale: detail.stale === true,
    hosts: Array.isArray(detail.hosts) ? detail.hosts.map(String) : [],
    durationMs: Number(detail.durationMs ?? 0),
    error: String(detail.error ?? ""),
  }
}

export function isDelivery(entry: AuditEntry): boolean {
  return entry.kind === "delivery" || entry.kind === "delivery_failed"
}

export function matchesKindFilter(entry: AuditEntry, filter: KindFilter): boolean {
  if (filter === "all") return true
  if (filter === "auth") return entry.kind === "auth_login" || entry.kind === "auth_failed"
  return entry.kind === filter
}

/** Free-text search across the fields an operator greps by: device, IP, subscription, host, UA. */
export function matchesSearch(entry: AuditEntry, query: string): boolean {
  const needle = query.trim().toLowerCase()
  if (!needle) return true
  const detail = parseDetail(entry)
  const haystack = [
    detail.name,
    detail.ip,
    detail.ua,
    detail.target,
    detail.error,
    ...(Array.isArray(detail.hosts) ? detail.hosts : []),
  ]
    .filter((part) => typeof part === "string" || typeof part === "number")
    .map(String)
    .join(" ")
    .toLowerCase()
  return haystack.includes(needle)
}

export interface AuditStats {
  todayDeliveries: number
  devices: number
  failures: number
  subscriptions: number
}

/** Counts over the loaded window; the panel states "最近 N 条" so the scope is on the table. */
export function auditStats(entries: AuditEntry[]): AuditStats {
  const today = new Date().toDateString()
  const devices = new Set<string>()
  const subscriptions = new Set<string>()
  let todayDeliveries = 0
  let failures = 0

  for (const entry of entries) {
    if (entry.kind === "delivery") {
      const detail = deliveryDetail(entry)
      if (new Date(entry.createdAt).toDateString() === today) todayDeliveries += 1
      const device = parseUserAgent(detail.ua)
      devices.add(`${device.client}|${device.os}|${detail.ip}`)
      subscriptions.add(detail.name)
    } else if (entry.kind === "delivery_failed") {
      failures += 1
      subscriptions.add(deliveryDetail(entry).name)
    }
  }

  return { todayDeliveries, devices: devices.size, failures, subscriptions: subscriptions.size }
}

export function formatTime(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  const sameDay = new Date().toDateString() === date.toDateString()
  return sameDay
    ? date.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    : date.toLocaleString("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
}

/** Short management-action summary for the mixed "全部" view; deliveries render as tables instead. */
export function managementSummary(entry: AuditEntry): string {
  const detail = parseDetail(entry)
  switch (entry.kind) {
    case "auth_login":
      return `来自 ${detail.ip || "未知 IP"}`
    case "auth_failed":
      return `密码错误 · ${detail.ip || "未知 IP"}`
    case "node_import":
      return `导入 ${String(detail.imported ?? 0)} 个节点`
    case "node_check":
      return `拨测 ${String(detail.count ?? 0)} 个节点 · ${String(detail.ok ?? 0)} 可达`
    case "node_bulk_delete":
      return `删除 ${String(detail.count ?? 0)} 个节点`
    case "node_create":
    case "node_update":
    case "node_delete":
      return `"${detail.name ?? detail.id ?? ""}" · ${String(detail.type ?? "")}`
    case "subscription_create":
    case "subscription_update":
    case "subscription_delete":
      return `"${detail.name ?? detail.id ?? ""}"`
    case "subscription_rotate":
      return `"${detail.name ?? detail.id ?? ""}" · 已换钥`
    case "subscription_check":
      return `"${detail.name ?? detail.id ?? ""}" · ${detail.ok ? "正常" : "失败"}`
    case "subscription_reorder":
      return "调整订阅排序"
    default:
      return ""
  }
}
