import { IconDeviceDesktop, IconDeviceMobile, IconTerminal2, IconWorld } from "@tabler/icons-react"
import type { ComponentType, ReactNode } from "react"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { AuditEntry } from "@/server/audit-log"
import {
  deliveryDetail,
  formatTime,
  KIND_LABELS,
  managementSummary,
  parseDetail,
  safeTargetLabel,
} from "./audit-entry"
import { describeDevice, parseUserAgent } from "./device"

const DEVICE_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  mobile: IconDeviceMobile,
  app: IconDeviceDesktop,
  browser: IconWorld,
  terminal: IconTerminal2,
  unknown: IconDeviceDesktop,
}

export function DeviceIcon({ kind, className }: { kind: string; className?: string }) {
  const Icon = DEVICE_ICONS[kind] ?? IconDeviceDesktop
  return <Icon className={className} />
}

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[88px_1fr] items-start gap-3 py-2">
      <span className="text-[11px] leading-5 text-muted-foreground">{label}</span>
      <span className="min-w-0 text-xs leading-5 break-all">{children}</span>
    </div>
  )
}

/**
 * One audit entry in full. Deliveries lay their facts out as a definition list; anything else falls
 * back to the same list over the raw detail JSON, so no recorded field is unreachable.
 */
export function AuditDetailDialog({
  entry,
  onOpenChange,
}: {
  entry: AuditEntry | null
  onOpenChange: (open: boolean) => void
}) {
  if (!entry) return null
  const delivery = entry.kind === "delivery" || entry.kind === "delivery_failed"
  const detail = parseDetail(entry)
  const facts = delivery ? deliveryDetail(entry) : null
  const device = parseUserAgent(facts?.ua ?? String(detail.ua ?? ""))

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Badge variant={entry.kind === "delivery_failed" ? "destructive" : "secondary"}>
              {KIND_LABELS[entry.kind] ?? entry.kind}
            </Badge>
            <span className="text-sm">{formatTime(entry.createdAt)}</span>
          </DialogTitle>
          <DialogDescription>
            {delivery ? "这次访问的完整记录" : "这条操作的完整记录"}
          </DialogDescription>
        </DialogHeader>

        <div className="divide-y">
          {facts ? (
            <>
              <Fact label="设备">{describeDevice(device)}</Fact>
              <Fact label="User-Agent">
                <span className="font-mono text-[11px] text-muted-foreground">
                  {facts.ua || "—"}
                </span>
              </Fact>
              <Fact label="IP 地址">
                <span className="font-mono">
                  {facts.ip || "—"}
                  {facts.country ? ` (${facts.country})` : ""}
                </span>
              </Fact>
              <Fact label="订阅">{facts.name || "—"}</Fact>
              {entry.kind === "delivery" ? (
                <>
                  <Fact label="输出格式">{facts.target ? safeTargetLabel(facts.target) : "—"}</Fact>
                  <Fact label="交付节点">{`${facts.nodeCount} 个${facts.stale ? "（缓存快照）" : ""}`}</Fact>
                  <Fact label="上游站点">
                    {facts.hosts.length > 0 ? (
                      <span className="flex flex-wrap gap-1.5">
                        {facts.hosts.map((host) => (
                          <span
                            key={host}
                            className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px]"
                          >
                            {host}
                          </span>
                        ))}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">本地来源（无上游请求）</span>
                    )}
                  </Fact>
                  <Fact label="耗时">{`${facts.durationMs} ms`}</Fact>
                </>
              ) : (
                <Fact label="失败原因">
                  <span className="text-destructive">{facts.error || "—"}</span>
                </Fact>
              )}
            </>
          ) : (
            <Fact label="摘要">{managementSummary(entry)}</Fact>
          )}

          {!delivery ? (
            <Fact label="详细数据">
              <pre className="overflow-x-auto rounded bg-muted p-2 font-mono text-[11px] leading-relaxed">
                {JSON.stringify(detail, null, 2)}
              </pre>
            </Fact>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  )
}
