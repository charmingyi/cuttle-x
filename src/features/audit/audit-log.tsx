import {
  IconAlertTriangle,
  IconHistory,
  IconLoader2,
  IconRefresh,
  IconSearch,
  IconX,
} from "@tabler/icons-react"
import { useMemo, useState } from "react"
import { cn } from "tailwind-variants"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { AuditEntry } from "@/server/audit-log"
import { AuditDetailDialog, DeviceIcon } from "./audit-detail-dialog"
import {
  auditStats,
  deliveryDetail,
  formatTime,
  isDelivery,
  KIND_FILTERS,
  KIND_LABELS,
  managementSummary,
  matchesKindFilter,
  matchesSearch,
  safeTargetLabel,
} from "./audit-entry"
import type { KindFilter } from "./audit-entry"
import { describeDevice, parseUserAgent } from "./device"
import { AUDIT_REFRESH_MS, useAuditLog } from "./queries"

const META = "text-xs text-muted-foreground"

function Metric({
  alert,
  label,
  note,
  value,
}: {
  alert?: boolean
  label: string
  note: string
  value: string | number
}) {
  return (
    <div className="flex flex-col gap-1 border-border px-4 py-3 not-last:border-r max-md:nth-[-n+2]:border-b md:gap-1.5 md:px-5 md:py-3.5">
      <span className={META}>{label}</span>
      <span className="flex items-baseline gap-2">
        <span
          className={cn(
            "text-[20px] leading-none font-semibold -tracking-[0.01em] lg:text-[24px]",
            alert ? "text-destructive" : "text-foreground",
          )}
        >
          {value}
        </span>
        <span className="hidden text-xs text-muted-foreground lg:inline">{note}</span>
      </span>
    </div>
  )
}

function StateBadge({ entry }: { entry: AuditEntry }) {
  if (entry.kind === "delivery") {
    const detail = deliveryDetail(entry)
    return (
      <Badge variant={detail.stale ? "outline" : "secondary"}>
        {detail.stale ? "缓存快照" : "成功"}
      </Badge>
    )
  }
  if (entry.kind === "delivery_failed") return <Badge variant="destructive">失败</Badge>
  if (entry.kind === "auth_failed") return <Badge variant="destructive">拒绝</Badge>
  return <Badge variant="outline">{KIND_LABELS[entry.kind] ?? entry.kind}</Badge>
}

/** One delivery rendered as the row the page exists for: which device, which entry, what content. */
function DeliveryCells({ entry }: { entry: AuditEntry }) {
  const detail = deliveryDetail(entry)
  const device = parseUserAgent(detail.ua)
  const failed = entry.kind === "delivery_failed"

  return (
    <>
      <TableCell className="whitespace-nowrap">
        <span className="text-xs tabular-nums">{formatTime(entry.createdAt)}</span>
      </TableCell>
      <TableCell>
        <span className="flex min-w-0 items-center gap-2">
          <DeviceIcon kind={device.kind} className="size-3.5 shrink-0 text-muted-foreground" />
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-xs font-medium">{describeDevice(device)}</span>
            <span className="truncate font-mono text-[11px] text-muted-foreground">
              {detail.ip || "未知 IP"}
              {detail.country ? ` · ${detail.country}` : ""}
            </span>
          </span>
        </span>
      </TableCell>
      <TableCell>
        <span className="flex min-w-0 flex-col">
          <span className="truncate text-xs font-medium">{detail.name}</span>
          <span className={cn(META, failed ? "text-destructive" : undefined)}>
            {failed
              ? (detail.error || "上游不可用").slice(0, 80)
              : `${detail.nodeCount} 节点 · ${detail.target ? safeTargetLabel(detail.target) : "—"}`}
          </span>
        </span>
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        {detail.hosts.length > 0 ? (
          <span className="flex flex-wrap gap-1">
            {detail.hosts.slice(0, 3).map((host) => (
              <span
                key={host}
                className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-foreground/80"
              >
                {host}
              </span>
            ))}
            {detail.hosts.length > 3 ? (
              <span className={cn(META, "self-center")}>+{detail.hosts.length - 3}</span>
            ) : null}
          </span>
        ) : (
          <span className={META}>{failed ? "—" : "本地来源"}</span>
        )}
      </TableCell>
      <TableCell className="text-right">
        <StateBadge entry={entry} />
      </TableCell>
    </>
  )
}

function ManagementCells({ entry }: { entry: AuditEntry }) {
  return (
    <>
      <TableCell className="whitespace-nowrap">
        <span className="text-xs tabular-nums">{formatTime(entry.createdAt)}</span>
      </TableCell>
      <TableCell>
        <span className="text-xs font-medium">{KIND_LABELS[entry.kind] ?? entry.kind}</span>
      </TableCell>
      <TableCell>
        <span className="text-xs break-all">{managementSummary(entry)}</span>
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        <span className={META}>—</span>
      </TableCell>
      <TableCell className="text-right">
        <StateBadge entry={entry} />
      </TableCell>
    </>
  )
}

export function AuditLog() {
  const [filter, setFilter] = useState<KindFilter>("all")
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<AuditEntry | null>(null)
  const { data, dataUpdatedAt, error, isLoading, refetch, isFetching } = useAuditLog()

  const entries = useMemo(
    () =>
      (data?.entries ?? [])
        .filter((entry) => matchesKindFilter(entry, filter))
        .filter((entry) => matchesSearch(entry, search)),
    [data, filter, search],
  )

  const stats = useMemo(() => auditStats(data?.entries ?? []), [data])

  return (
    // `min-h-0` is what keeps the panel inside the viewport: without it this column grows to the
    // height of the list, the list never becomes the thing that scrolls, and the status line — the
    // one that says the page is live and when it last refreshed — ends up thousands of pixels below
    // the fold.
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex h-12 flex-none items-center justify-between gap-2.5 border-b px-4 md:px-5">
        <h1 className="shrink-0 text-xs font-semibold tracking-widest uppercase">审计日志</h1>
        <div className="flex min-w-0 items-center gap-2">
          <div className="relative min-w-0 max-w-56 flex-1">
            <IconSearch
              className="pointer-events-none absolute top-1/2 left-2 size-3.5 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索设备、IP、站点…"
              className="h-8 pl-7.5"
            />
            {search ? (
              <button
                type="button"
                aria-label="清除搜索"
                onClick={() => setSearch("")}
                className="absolute top-1/2 right-1.5 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <IconX className="size-3.5" />
              </button>
            ) : null}
          </div>
          <Select
            value={filter}
            onValueChange={(value) => setFilter((value as KindFilter) ?? "all")}
            items={KIND_FILTERS.map((option) => ({ label: option.label, value: option.value }))}
          >
            <SelectTrigger size="sm" className="w-28 shrink-0 md:w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {KIND_FILTERS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="刷新"
            title="刷新"
            onClick={() => void refetch()}
            disabled={isFetching}
          >
            {isFetching ? <IconLoader2 className="animate-spin" /> : <IconRefresh />}
          </Button>
        </div>
      </div>

      <div className="grid flex-none grid-cols-2 border-b bg-sidebar md:grid-cols-4">
        <Metric label="今日拉取" note="按天计数" value={stats.todayDeliveries} />
        <Metric label="独立设备" note="按客户端 + IP" value={stats.devices} />
        <Metric
          label="拉取失败"
          note="上游出错"
          value={stats.failures}
          alert={stats.failures > 0}
        />
        <Metric label="涉及订阅" note="被拉取过的" value={stats.subscriptions} />
      </div>

      {/* The scope, stated where it would otherwise be assumed: this log sees subscription pulls,
          not the traffic those subscriptions later carry. */}
      <p className="flex-none border-b px-4 py-1.5 text-[11px] text-muted-foreground md:px-5">
        代理流量不经过本工具：下面记录的是每台设备在什么时间拉取了哪条订阅、内容来自哪些上游站点。
      </p>

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
            <EmptyTitle>{data?.entries.length ? "没有匹配的记录" : "暂无日志"}</EmptyTitle>
            <EmptyDescription>
              {data?.entries.length
                ? "换个关键词或筛选条件试试。"
                : "设备拉取订阅、管理操作和登录事件都会出现在这里。"}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <>
          {/* Pointer layout: one row per access, from md up. */}
          <div className="hidden min-h-0 flex-1 flex-col overflow-y-auto md:flex">
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-background">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-24">时间</TableHead>
                  <TableHead>设备</TableHead>
                  <TableHead>订阅 / 内容</TableHead>
                  <TableHead
                    className="hidden lg:table-cell"
                    title="订阅内容读自哪个上游站点，不是这台设备访问过的网站"
                  >
                    内容来源
                  </TableHead>
                  <TableHead className="text-right">结果</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map((entry) => (
                  <TableRow
                    key={entry.id}
                    className="cursor-pointer"
                    onClick={() => setSelected(entry)}
                  >
                    {isDelivery(entry) ? (
                      <DeliveryCells entry={entry} />
                    ) : (
                      <ManagementCells entry={entry} />
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Touch layout: stacked cards, same facts. */}
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto md:hidden">
            <div className="flex flex-col divide-y">
              {entries.map((entry) => {
                const delivery = isDelivery(entry)
                const detail = delivery ? deliveryDetail(entry) : null
                const device = detail ? parseUserAgent(detail.ua) : null
                return (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => setSelected(entry)}
                    className="flex flex-col gap-1.5 px-4 py-3 text-left active:bg-muted/60"
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span className="text-[11px] text-muted-foreground tabular-nums">
                        {formatTime(entry.createdAt)}
                      </span>
                      <StateBadge entry={entry} />
                    </span>
                    {delivery && detail && device ? (
                      <>
                        <span className="flex items-center gap-2 text-sm font-medium">
                          <DeviceIcon
                            kind={device.kind}
                            className="size-4 shrink-0 text-muted-foreground"
                          />
                          {describeDevice(device)}
                        </span>
                        <span className="font-mono text-[11px] text-muted-foreground">
                          {detail.ip || "未知 IP"}
                          {detail.country ? ` · ${detail.country}` : ""}
                        </span>
                        <span className="text-xs">
                          拉取「{detail.name}」
                          {entry.kind === "delivery"
                            ? ` · ${detail.nodeCount} 节点`
                            : ` · ${(detail.error || "上游不可用").slice(0, 60)}`}
                        </span>
                        {detail.hosts.length > 0 ? (
                          <span className="truncate font-mono text-[11px] text-muted-foreground">
                            上游：{detail.hosts.join("、")}
                          </span>
                        ) : null}
                      </>
                    ) : (
                      <span className="text-xs break-all">
                        {KIND_LABELS[entry.kind] ?? entry.kind} · {managementSummary(entry)}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}

      <div className="flex h-9 flex-none items-center justify-between gap-3 border-t px-4 text-[11px] text-muted-foreground md:px-5">
        <span className="flex min-w-0 items-center gap-2">
          <span className="flex shrink-0 items-center gap-1.5">
            <span
              aria-hidden
              className={cn("size-1.5 rounded-full bg-success", isFetching && "animate-pulse")}
            />
            实时刷新
          </span>
          <span className="truncate">
            共 {entries.length} 条{filter === "all" && !search ? "" : "（已筛选）"} · 每{" "}
            {AUDIT_REFRESH_MS / 1000} 秒
            {dataUpdatedAt ? ` · 更新于 ${formatTime(new Date(dataUpdatedAt).toISOString())}` : ""}
          </span>
        </span>
        <button
          type="button"
          onClick={() => void refetch()}
          className="inline-flex shrink-0 items-center gap-1 hover:text-foreground"
        >
          <IconRefresh className="size-3" />
          刷新
        </button>
      </div>

      <AuditDetailDialog entry={selected} onOpenChange={(open) => !open && setSelected(null)} />
    </div>
  )
}
