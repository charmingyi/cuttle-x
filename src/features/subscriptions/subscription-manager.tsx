import {
  IconAlertTriangle,
  IconClipboard,
  IconDatabase,
  IconFilter,
  IconLoader2,
  IconPlus,
  IconTransform,
} from "@tabler/icons-react"
import { getRouteApi, Link, useRouterState } from "@tanstack/react-router"
import { useCallback, useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"
import { cn } from "tailwind-variants"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import type { SubscriptionDraft, SubscriptionSummary } from "@/core/subscriptions"
import { useDeferredClose } from "@/shared/deferred-close"
import { showSuccess } from "@/shared/notify"
import { CollectionDialog, emptyCollectionValues } from "./collection-dialog"
import type { CollectionValues } from "./collection-dialog"
import { ConfirmDialog } from "./confirm-dialog"
import {
  editorValuesFromHandoff,
  editorValuesFromRecord,
  EMPTY_EDITOR_VALUES,
} from "./editor/editor-values"
import type { EditorValues } from "./editor/editor-values"
import { SubscriptionEditor } from "./editor/subscription-editor"
import { subscriptionState } from "./labels"
import {
  useRenameSubscription,
  useReorderSubscriptions,
  useSaveSubscription,
  useSubscription,
  useSubscriptions,
} from "./queries"
import { SubscriptionCards } from "./subscription-cards"
import { SubscriptionDetailDialog } from "./subscription-detail-dialog"
import { SubscriptionMetrics } from "./subscription-metrics"
import { LABEL } from "./subscription-row"
import type { SubscriptionRowActions } from "./subscription-row"
import { SubscriptionTable } from "./subscription-table"
import { SubscriptionToolbar } from "./subscription-toolbar"
import type { StatusFilter } from "./subscription-toolbar"
import { useSubscriptionActions } from "./use-subscription-actions"

const TOOLBAR_ROW =
  "flex h-12 flex-none items-center justify-between gap-2.5 border-b px-4 md:gap-3 md:px-5"

const TOOLBAR_TITLE = "shrink-0 text-xs font-semibold tracking-widest uppercase"

const CREDENTIAL = "font-mono text-xs leading-relaxed wrap-anywhere"

function matchesStatus(subscription: SubscriptionSummary, status: StatusFilter) {
  return status === "all" || subscriptionState(subscription) === status
}

function matchesQuery(subscription: SubscriptionSummary, query: string) {
  const needle = query.trim().toLowerCase()
  if (!needle) return true
  if (subscription.name.toLowerCase().includes(needle)) return true
  return subscription.folder?.toLowerCase().includes(needle) ?? false
}

async function copyToClipboard(value: string, message: string) {
  await navigator.clipboard.writeText(value)
  showSuccess(message)
}

const routeApi = getRouteApi("/subscriptions")

function ListNotice({
  children,
  description,
  icon,
  title,
}: {
  children?: ReactNode
  description?: string
  icon: ReactNode
  title: string
}) {
  return (
    <Empty className="flex-1 border-b">
      <EmptyHeader>
        <EmptyMedia variant="icon">{icon}</EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        {description ? <EmptyDescription>{description}</EmptyDescription> : null}
      </EmptyHeader>
      {children ? <EmptyContent>{children}</EmptyContent> : null}
    </Empty>
  )
}

export function SubscriptionManager() {
  const navigate = routeApi.useNavigate()
  const search = routeApi.useSearch()
  const { failure, items: subscriptions, loaded } = useSubscriptions()
  const subscriptionDraft = useRouterState({
    select: (routerState) => routerState.location.state.subscriptionDraft,
  })
  // The draft the workbench handed over, held as state because it decides what the editor renders.
  // Captured once rather than read from router state each pass: the effect below scrubs it out of
  // history straight away so a reload cannot resurrect it, and the editor still has to read it after.
  const [handoffDraft, setHandoffDraft] = useState(subscriptionDraft)
  const save = useSaveSubscription()
  const rename = useRenameSubscription()
  const reorder = useReorderSubscriptions()

  const activeId = search.mode === "create" ? null : (search.id ?? null)
  const record = useSubscription(activeId)

  const [query, setQuery] = useState("")
  const [status, setStatus] = useState<StatusFilter>("all")
  const [handoffMode, setHandoffMode] = useState(search.mode)

  // Adjusted while rendering rather than in an effect: leaving create mode spends the handoff, and a
  // committed frame where the mode has already moved on and the draft has not is a frame that opens
  // the next editor on the last one's source.
  if (handoffMode !== search.mode) {
    setHandoffMode(search.mode)
    if (search.mode !== "create") setHandoffDraft(undefined)
  }

  const draftScrubbed = useRef(false)
  useEffect(() => {
    if (!subscriptionDraft || draftScrubbed.current) return
    draftScrubbed.current = true
    const rest: Record<string, unknown> = { ...window.history.state }
    delete rest.subscriptionDraft
    window.history.replaceState(rest, "", window.location.href)
  }, [subscriptionDraft])

  const close = useCallback(() => {
    void navigate({ search: (prev) => ({ ...prev, id: undefined, mode: undefined }) })
  }, [navigate])

  useEffect(() => {
    if (loaded && activeId && !subscriptions.some((item) => item.id === activeId)) close()
  }, [activeId, close, loaded, subscriptions])

  const actions = useSubscriptionActions({ onBeforeConfirm: close })

  function edit(subscription: SubscriptionSummary) {
    void navigate({ search: (prev) => ({ ...prev, id: subscription.id, mode: "edit" }) })
  }

  function openCreate() {
    void navigate({ search: () => ({ mode: "create" }) })
  }

  function openCreateCollection() {
    void navigate({ search: () => ({ mode: "createCollection" }) })
  }

  /** The move buttons send the full current order; the server only accepts full permutations. */
  function move(subscription: SubscriptionSummary, direction: "up" | "down") {
    const index = subscriptions.findIndex((item) => item.id === subscription.id)
    const target = index + (direction === "up" ? -1 : 1)
    if (index === -1 || target < 0 || target >= subscriptions.length) return
    const next = [...subscriptions]
    const [moved] = next.splice(index, 1)
    next.splice(target, 0, moved)
    reorder.mutate(next.map((item) => item.id))
  }

  async function saveSubscription(draft: SubscriptionDraft, id?: string) {
    try {
      const credential = await save.mutateAsync({ draft, id })
      if (credential) actions.revealCredential(credential.url)
      return true
    } catch {
      return false
    }
  }

  const rowActions: SubscriptionRowActions = {
    onCopyLink: actions.copySubscriptionLink,
    onEdit: edit,
    onMove: move,
    onRemove: actions.requestDelete,
    onRename: async (subscription, name) => {
      await rename.mutateAsync({ id: subscription.id, name })
    },
    onRotate: actions.requestRotate,
    onSelect: (subscription) =>
      void navigate({ search: (prev) => ({ ...prev, id: subscription.id }) }),
    onToggleEnabled: actions.toggleEnabled,
  }

  const editorOpen = search.mode === "edit" || search.mode === "create"
  const editorSurface = useDeferredClose(editorOpen, close)

  // A collection is managed through its own surface: its "source" is a member picker, not text, so
  // the regular editor must never be handed one.
  const collectionValues: CollectionValues | null =
    search.mode === "createCollection"
      ? emptyCollectionValues()
      : search.mode === "edit" && record?.source.type === "collection"
        ? {
            id: record.id,
            name: record.name,
            folder: record.folder ?? "",
            memberIds: record.source.memberIds,
            defaultTarget: record.defaultTarget,
            processors: record.processors ?? [],
            enabled: record.enabled,
          }
        : null
  const collectionOpen = Boolean(collectionValues)
  const collectionSurface = useDeferredClose(collectionOpen, close)

  const editorValues: EditorValues | null =
    search.mode === "create"
      ? handoffDraft
        ? editorValuesFromHandoff(handoffDraft)
        : EMPTY_EDITOR_VALUES
      : search.mode === "edit" && record && record.source.type !== "collection"
        ? editorValuesFromRecord(record)
        : null

  const selected = !search.mode
    ? (subscriptions.find((item) => item.id === activeId) ?? null)
    : null

  const detailSurface = useDeferredClose(Boolean(selected), close)

  const visible = subscriptions.filter(
    (item) => matchesStatus(item, status) && matchesQuery(item, query),
  )
  const failures = subscriptions.filter((item) => item.lastError)

  function listBody() {
    if (failure) {
      return (
        <ListNotice
          description={failure.message}
          icon={<IconAlertTriangle />}
          title="读取订阅失败"
        />
      )
    }
    if (!loaded) {
      return <ListNotice icon={<IconLoader2 className="animate-spin" />} title="正在读取订阅" />
    }
    if (subscriptions.length === 0) {
      return (
        <ListNotice
          description="从提取转换页面配好源与规则链后用“存为订阅”持久化，或者直接新建一条。"
          icon={<IconDatabase />}
          title="还没有持久化订阅"
        >
          <div className="flex flex-wrap justify-center gap-2">
            <Button onClick={openCreate}>
              <IconPlus data-icon="inline-start" />
              新建订阅
            </Button>
            <Link to="/" viewTransition className={cn(buttonVariants({ variant: "outline" }))}>
              <IconTransform data-icon="inline-start" />
              去提取转换
            </Link>
          </div>
        </ListNotice>
      )
    }
    if (visible.length === 0) {
      return (
        <ListNotice
          description={
            query.trim()
              ? "没有名称或分组匹配的订阅，换个搜索词试试。"
              : "把状态过滤调回“全部状态”就能看到全部订阅。"
          }
          icon={<IconFilter />}
          title="没有匹配的订阅"
        />
      )
    }
    return (
      <>
        <SubscriptionTable
          actions={rowActions}
          moveDisabled={reorder.isPending}
          subscriptions={visible}
        />
        <SubscriptionCards actions={rowActions} subscriptions={visible} />
      </>
    )
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className={TOOLBAR_ROW}>
        <h1 className={TOOLBAR_TITLE}>全部订阅</h1>
        <SubscriptionToolbar
          onCreate={openCreate}
          onCreateCollection={openCreateCollection}
          onQueryChange={setQuery}
          onStatusChange={setStatus}
          query={query}
          status={status}
        />
      </div>

      {subscriptions.length > 0 ? <SubscriptionMetrics subscriptions={subscriptions} /> : null}

      {actions.credentialUrl ? (
        <div className="flex flex-none flex-col gap-2 border-b bg-sidebar px-4 py-3.5 md:flex-row md:items-center md:justify-between md:px-5">
          <div className="flex min-w-0 flex-col gap-1">
            <span className={LABEL}>新的订阅地址只展示一次</span>
            <code className={CREDENTIAL}>{actions.credentialUrl}</code>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button
              variant="outline"
              size="xs"
              onClick={() => void copyToClipboard(actions.credentialUrl, "订阅地址已复制")}
            >
              <IconClipboard data-icon="inline-start" />
              复制地址
            </Button>
            <Button variant="ghost" size="xs" onClick={actions.dismissCredential}>
              知道了
            </Button>
          </div>
        </div>
      ) : null}

      {listBody()}

      {failures.length > 0 ? (
        <div className="mt-auto flex flex-none items-center gap-2.5 border-t bg-sidebar px-4 py-3.5 md:px-5">
          <IconAlertTriangle className="size-3.5 shrink-0 text-destructive" />
          <span className="text-[12.5px] leading-relaxed text-destructive">
            {failures[0].name} 最近一次编译失败：{failures[0].lastError}
            {failures.length > 1 ? `（另有 ${failures.length - 1} 条同样失败）` : ""}
          </span>
        </div>
      ) : null}

      {selected ? (
        <SubscriptionDetailDialog
          actions={rowActions}
          detail={record}
          onOpenChange={detailSurface.onOpenChange}
          onOpenChangeComplete={detailSurface.onOpenChangeComplete}
          open={detailSurface.open}
          subscription={selected}
        />
      ) : null}

      <ConfirmDialog
        request={actions.confirming}
        onOpenChange={(next) => {
          if (!next) actions.cancel()
        }}
        onConfirm={actions.confirm}
      />

      {collectionValues ? (
        <CollectionDialog
          key={`collection-${collectionValues.id ?? "new"}`}
          onOpenChange={collectionSurface.onOpenChange}
          onOpenChangeComplete={collectionSurface.onOpenChangeComplete}
          onSave={saveSubscription}
          open={collectionSurface.open}
          pools={subscriptions.filter((item) => item.sourceType === "pool")}
          values={collectionValues}
        />
      ) : null}

      {editorValues ? (
        <SubscriptionEditor
          key={search.id ?? "new"}
          onOpenChange={editorSurface.onOpenChange}
          onOpenChangeComplete={editorSurface.onOpenChangeComplete}
          onSave={saveSubscription}
          open={editorSurface.open}
          values={editorValues}
        />
      ) : null}
    </div>
  )
}
