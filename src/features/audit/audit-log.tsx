import { IconAlertTriangle, IconHistory, IconLoader2 } from "@tabler/icons-react"
import { useState } from "react"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { AuditEntry, AuditKind } from "@/server/audit-log"
import { useAuditLog } from "./queries"

const KIND_LABELS: Record<AuditKind, string> = {
  auth_login: "登录成功",
  auth_failed: "登录失败",
  node_create: "节点创建",
  node_update: "节点编辑",
  node_delete: "节点删除",
  node_bulk_delete: "批量删除",
  node_import: "节点导入",
  subscription_create: "订阅创建",
  subscription_update: "订阅修改",
  subscription_delete: "订阅删除",
  subscription_rotate: "订阅换钥",
  subscription_reorder: "订阅排序",
  delivery: "订阅拉取",
}

const FILTER_OPTIONS: Array<{ value: AuditKind | "all"; label: string }> = [
  { value: "all", label: "全部事件" },
  { value: "auth_login", label: "登录成功" },
  { value: "auth_failed", label: "登录失败" },
  { value: "delivery", label: "订阅拉取" },
  { value: "node_import", label: "节点导入" },
  { value: "node_create", label: "节点创建" },
  { value: "node_update", label: "节点编辑" },
  { value: "node_delete", label: "节点删除" },
  { value: "node_bulk_delete", label: "批量删除" },
  { value: "subscription_create", label: "订阅创建" },
  { value: "subscription_update", label: "订阅修改" },
  { value: "subscription_delete", label: "订阅删除" },
  { value: "subscription_rotate", label: "订阅换钥" },
]

function parseDetail(entry: AuditEntry): Record<string, unknown> {
  try {
    const parsed: unknown = JSON.parse(entry.detailJson)
    return parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : {}
  } catch {
    return {}
  }
}

function entrySummary(entry: AuditEntry): string {
  const detail = parseDetail(entry)
  switch (entry.kind) {
    case "auth_login":
      return `来自 ${detail.ip || "未知 IP"} · ${detail.ua ? String(detail.ua).slice(0, 60) : ""}`
    case "auth_failed":
      return `被拒绝 · ${detail.ip || "未知 IP"} · ${detail.ua ? String(detail.ua).slice(0, 60) : ""}`
    case "delivery":
      return `"${detail.name ?? "?"}" · ${String(detail.target ?? "")} · ${String(detail.nodeCount ?? 0)} 节点 · ${detail.ip || "未知 IP"}`
    case "node_import":
      return `导入 ${String(detail.imported ?? 0)} 个节点`
    case "node_bulk_delete":
      return `删除 ${String(detail.count ?? 0)} 个节点`
    case "node_create":
    case "node_update":
      return `"${detail.name ?? detail.id ?? ""}" · ${String(detail.type ?? "")}`
    case "node_delete":
      return `"${detail.name ?? detail.id ?? ""}"`
    case "subscription_create":
    case "subscription_update":
      return `"${detail.name ?? detail.id ?? ""}"`
    case "subscription_rotate":
      return `"${detail.name ?? detail.id ?? ""}" · 已换钥`
    case "subscription_delete":
      return `"${detail.name ?? detail.id ?? ""}"`
    default:
      return ""
  }
}

function formatTime(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  const sameDay = new Date().toDateString() === date.toDateString()
  return sameDay
    ? date.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })
    : date.toLocaleString("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
}

export function AuditLog() {
  const [filter, setFilter] = useState<AuditKind | "all">("all")
  const { data, error, isLoading, refetch } = useAuditLog(filter === "all" ? undefined : filter)

  const entries = data?.entries ?? []

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex h-12 flex-none items-center justify-between gap-2.5 border-b px-4 md:px-5">
        <h1 className="shrink-0 text-xs font-semibold tracking-widest uppercase">审计日志</h1>
        <Select
          value={filter}
          onValueChange={(value) => setFilter((value as AuditKind | "all") ?? "all")}
          items={FILTER_OPTIONS.map((option) => ({ label: option.label, value: option.value }))}
        >
          <SelectTrigger size="sm" className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {FILTER_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {error ? (
        <Empty className="flex-1 border-b">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <IconAlertTriangle />
            </EmptyMedia>
            <EmptyTitle>读取审计日志失败</EmptyTitle>
            <EmptyDescription>{error.message}</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : isLoading ? (
        <Empty className="flex-1 border-b">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <IconLoader2 className="animate-spin" />
            </EmptyMedia>
            <EmptyTitle>正在读取日志</EmptyTitle>
          </EmptyHeader>
        </Empty>
      ) : entries.length === 0 ? (
        <Empty className="flex-1 border-b">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <IconHistory />
            </EmptyMedia>
            <EmptyTitle>暂无日志</EmptyTitle>
            <EmptyDescription>管理操作与订阅拉取事件会出现在这里。</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="flex flex-1 flex-col overflow-y-auto">
          <div className="flex flex-col divide-y">
            {entries.map((entry) => (
              <div key={entry.id} className="flex items-start gap-3 px-4 py-2.5 md:px-5">
                <div className="w-28 shrink-0 pt-0.5 text-[11px] text-muted-foreground tabular-nums">
                  {formatTime(entry.createdAt)}
                </div>
                <div className="w-20 shrink-0">
                  <span className="inline-block rounded bg-muted px-1.5 py-0.5 text-[11px] font-medium">
                    {KIND_LABELS[entry.kind] ?? entry.kind}
                  </span>
                </div>
                <div className="min-w-0 flex-1 text-xs leading-relaxed break-all text-foreground/90">
                  {entrySummary(entry)}
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => void refetch()}
            className="flex h-10 shrink-0 items-center justify-center text-[11px] text-muted-foreground hover:text-foreground"
          >
            刷新
          </button>
        </div>
      )}
    </div>
  )
}
