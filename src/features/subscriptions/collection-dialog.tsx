import { IconSearch, IconUsers } from "@tabler/icons-react"
import { useMemo, useState } from "react"
import { cn } from "tailwind-variants"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { NodeProcessor, TargetId } from "@/core/nodes"
import { MAX_COLLECTION_MEMBERS, MAX_SUBSCRIPTION_NAME_LENGTH } from "@/core/subscriptions"
import type { SubscriptionDraft, SubscriptionSummary } from "@/core/subscriptions"
import { DEFAULT_TARGET } from "./targets"

export interface CollectionValues {
  id?: string
  name: string
  folder?: string
  memberIds: string[]
  defaultTarget: TargetId
  processors: NodeProcessor[]
  enabled: boolean
}

function emptyCollectionValues(): CollectionValues {
  return {
    name: "",
    folder: "",
    memberIds: [],
    defaultTarget: DEFAULT_TARGET,
    processors: [],
    enabled: true,
  }
}

export { emptyCollectionValues }

/**
 * The managed surface for a collection: a name, an optional folder, and the set of persistent pool
 * subscriptions it aggregates. The created row is an ordinary subscription whose source is
 * `{ type: "collection", memberIds }`, so it gets its own fixed token and `/subscribe/<token>` URL
 * like anything else — updating membership keeps that address, exactly like editing any source.
 */
export function CollectionDialog({
  onOpenChange,
  onOpenChangeComplete,
  onSave,
  open,
  pools,
  values,
}: {
  onOpenChange: (open: boolean) => void
  onOpenChangeComplete?: (open: boolean) => void
  onSave: (draft: SubscriptionDraft, id?: string) => Promise<boolean>
  open: boolean
  /** The persistent pool subscriptions available to pick from. */
  pools: SubscriptionSummary[]
  values: CollectionValues
}) {
  // The manager remounts this with a fresh `key` per open, so these initializers always see the
  // values of the open the dialog is for.
  const [name, setName] = useState(values.name)
  const [folder, setFolder] = useState(values.folder ?? "")
  const [filter, setFilter] = useState("")
  const [selected, setSelected] = useState<string[]>(values.memberIds)
  const [pending, setPending] = useState(false)
  const [attempted, setAttempted] = useState(false)

  const needle = filter.trim().toLowerCase()
  const visible = useMemo(
    () => pools.filter((pool) => !needle || pool.name.toLowerCase().includes(needle)),
    [needle, pools],
  )

  function toggle(memberId: string) {
    setSelected((current) =>
      current.includes(memberId)
        ? current.filter((entry) => entry !== memberId)
        : current.length >= MAX_COLLECTION_MEMBERS
          ? current
          : [...current, memberId],
    )
  }

  const nameInvalid = attempted && !name.trim()
  const selectionEmpty = attempted && selected.length === 0

  async function submit() {
    if (pending) return
    setAttempted(true)
    if (!name.trim() || selected.length === 0) return
    setPending(true)
    try {
      // Output follows the pool list order, so the merged node order is stable and predictable.
      const memberIds = pools.filter((pool) => selected.includes(pool.id)).map((pool) => pool.id)
      const saved = await onSave(
        {
          name: name.trim(),
          folder: folder.trim() || undefined,
          source: { type: "collection", memberIds },
          defaultTarget: values.defaultTarget,
          processors: values.processors,
          enabled: values.enabled,
        },
        values.id,
      )
      if (saved) onOpenChange(false)
    } finally {
      setPending(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} onOpenChangeComplete={onOpenChangeComplete}>
      <DialogContent
        showCloseButton={false}
        className="flex max-h-[88svh] flex-col gap-0 p-0 sm:max-w-lg"
      >
        <DialogHeader className="flex-none flex-row items-start justify-between gap-4 border-b p-4 md:px-6 md:py-5">
          <div className="flex min-w-0 flex-col gap-1.5">
            <DialogTitle className="md:text-xl">{values.id ? "编辑集合" : "新建集合"}</DialogTitle>
            <DialogDescription render={<div />} className="flex items-center gap-2">
              <IconUsers className="size-3.5 shrink-0" />
              <span>合并多个持久化节点订阅，生成一条独立的固定订阅地址。</span>
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto p-4 md:px-6">
          <Field data-invalid={nameInvalid}>
            <FieldLabel htmlFor="collection-name">名称</FieldLabel>
            <Input
              id="collection-name"
              maxLength={MAX_SUBSCRIPTION_NAME_LENGTH}
              value={name}
              onChange={(event) => setName(event.target.value)}
              aria-invalid={nameInvalid}
            />
            {nameInvalid ? <FieldError>名称不能为空。</FieldError> : null}
          </Field>

          <Field>
            <FieldLabel htmlFor="collection-folder">分组</FieldLabel>
            <Input
              id="collection-folder"
              maxLength={MAX_SUBSCRIPTION_NAME_LENGTH}
              value={folder}
              onChange={(event) => setFolder(event.target.value)}
              placeholder="可选，例如“主力机场”"
            />
          </Field>

          <Field data-invalid={selectionEmpty}>
            <FieldLabel>成员（持久化节点订阅）</FieldLabel>
            {pools.length === 0 ? (
              <FieldDescription>
                还没有持久化节点订阅。先在“新建订阅”里用“持久化节点”来源保存节点，再回来创建集合。
              </FieldDescription>
            ) : (
              <>
                <div className="relative">
                  <IconSearch className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    aria-label="筛选成员"
                    value={filter}
                    onChange={(event) => setFilter(event.target.value)}
                    placeholder="筛选成员"
                    className="h-8 pl-8"
                  />
                </div>
                <div className="flex max-h-56 flex-col overflow-y-auto border bg-sidebar">
                  {visible.length === 0 ? (
                    <span className="p-3 text-xs leading-relaxed text-muted-foreground">
                      没有名称匹配的持久化节点订阅。
                    </span>
                  ) : (
                    visible.map((pool) => (
                      <label
                        key={pool.id}
                        className="flex items-center gap-2.5 border-b px-3 py-2.5 last:border-b-0"
                      >
                        <input
                          type="checkbox"
                          checked={selected.includes(pool.id)}
                          onChange={() => toggle(pool.id)}
                          className="size-4 shrink-0 accent-foreground"
                        />
                        <span className="min-w-0 flex-1 truncate text-[12.5px] font-medium">
                          {pool.name}
                        </span>
                        <span className="shrink-0 text-[11px] text-muted-foreground tabular-nums">
                          {pool.nodeCount ?? "—"} 节点
                        </span>
                      </label>
                    ))
                  )}
                </div>
                <FieldDescription>
                  已选 {selected.length} 个成员（最多 {MAX_COLLECTION_MEMBERS} 个）·
                  按列表顺序合并，重复端点只保留一个。
                </FieldDescription>
                {selectionEmpty ? <FieldError>至少选择一个持久化节点订阅。</FieldError> : null}
              </>
            )}
          </Field>
        </div>

        <DialogFooter className="flex-none flex-row gap-2 border-t p-3 md:px-6 md:py-3.5">
          <Button
            variant="outline"
            className="flex-1 md:h-10 md:flex-none"
            onClick={() => onOpenChange(false)}
          >
            取消
          </Button>
          <Button
            className={cn("flex-[1.4] md:h-10 md:flex-none")}
            disabled={pending || pools.length === 0}
            onClick={() => void submit()}
          >
            {pending ? "保存中" : values.id ? "保存修改" : "创建集合"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
