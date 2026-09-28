import {
  IconActivity,
  IconAlertTriangle,
  IconCloudDownload,
  IconCopy,
  IconGripVertical,
  IconLoader2,
  IconNetwork,
  IconPlus,
  IconQrcode,
  IconServer2,
  IconTrash,
} from "@tabler/icons-react"
import { useCallback, useMemo, useState } from "react"
import { QRCode } from "react-qr-code"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { inspectNodeList } from "@/core/nodes"
import type { CanonicalNode } from "@/core/nodes"
import { KNOWN_PROTOCOLS, PROTOCOL_FIELDS, nodeToCanonical } from "@/core/nodes/entity"
import type { NodeEntity, NodeFormData } from "@/core/nodes/entity"
import { renderUriNode } from "@/core/nodes/targets/shared/uri-node"
import { useDeferredClose } from "@/shared/deferred-close"
import { showSuccess } from "@/shared/notify"
import {
  useCheckNodes,
  useCreateNode,
  useImportNodes,
  useNodes,
  useRemoveNode,
  useRemoveNodes,
  useReorderNodes,
  useUpdateNode,
} from "./queries"

/** The share link a client can import directly from a scanned code. */
function nodeShareLink(node: NodeEntity): string {
  const uri = renderUriNode(nodeToCanonical(node))
  return uri ?? `${node.type}://${node.server}:${node.port}`
}

const TOOLBAR_ROW =
  "flex h-12 flex-none items-center justify-between gap-2.5 border-b px-4 md:gap-3 md:px-5"
const TOOLBAR_TITLE = "shrink-0 text-xs font-semibold tracking-widest uppercase"
const CRED_LABEL = "text-[12.5px] font-medium leading-relaxed text-muted-foreground"

/**
 * The last reachability probe as a one-word verdict. Unprobed stays quiet rather than showing a
 * gray placeholder: before a first 拨测 the column would only repeat "no data" sixty times.
 */
function CheckBadge({ node }: { node: NodeEntity }) {
  if (node.lastCheckOk === null) return null
  if (node.lastCheckOk) {
    return (
      <span className="inline-flex shrink-0 items-center gap-0.5 rounded bg-success/10 px-1.5 py-0.5 text-[11px] font-medium text-success tabular-nums">
        {node.lastCheckMs ?? 0}ms
      </span>
    )
  }
  return (
    <span className="inline-flex shrink-0 items-center gap-0.5 rounded bg-destructive/10 px-1.5 py-0.5 text-[11px] font-medium text-destructive">
      不可达
    </span>
  )
}

function emptyForm(): NodeFormData {
  return { name: "", type: "ss", server: "", port: 443 }
}

function formFromNode(node: NodeEntity): NodeFormData {
  let credentials: Record<string, unknown> | undefined
  let extra: Record<string, unknown> | undefined
  try {
    const parsed = JSON.parse(node.credentialJson)
    if (parsed && typeof parsed === "object") credentials = parsed
  } catch {
    /* ignore */
  }
  try {
    const parsed = JSON.parse(node.extraJson)
    if (parsed && typeof parsed === "object") extra = parsed
  } catch {
    /* ignore */
  }

  return {
    name: node.name,
    type: node.type,
    server: node.server,
    port: node.port,
    country: node.country ?? undefined,
    security: node.security ?? undefined,
    transport: node.transport ?? undefined,
    credentials,
    extra,
  }
}

/** Controlled protocol fields. Form state lives with the sheet footer so 保存 can read it. */
function NodeEditor({
  values,
  onChange,
}: {
  values: NodeFormData
  onChange: (values: NodeFormData) => void
}) {
  const form = values

  const protocolFields = useMemo(() => PROTOCOL_FIELDS[form.type] ?? [], [form.type])

  function set<K extends keyof NodeFormData>(key: K, value: NodeFormData[K]) {
    onChange({ ...form, [key]: value })
  }

  function setCredential(key: string, value: string) {
    onChange({
      ...form,
      credentials: { ...form.credentials, [key]: value },
    })
  }

  function credentialValue(key: string): string {
    const val = form.credentials?.[key]
    return typeof val === "string" || typeof val === "number" ? String(val) : ""
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-3">
        {/* 名称 */}
        <div className="grid gap-1.5">
          <Label className={CRED_LABEL}>名称</Label>
          <Input
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="节点名称"
          />
        </div>

        {/* 协议 */}
        <div className="grid gap-1.5">
          <Label className={CRED_LABEL}>协议</Label>
          <Select value={form.type} onValueChange={(v) => v && set("type", v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {KNOWN_PROTOCOLS.map((proto) => (
                <SelectItem key={proto} value={proto}>
                  {proto.toUpperCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 服务器 + 端口 */}
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2 grid gap-1.5">
            <Label className={CRED_LABEL}>服务器地址</Label>
            <Input
              value={form.server}
              onChange={(e) => set("server", e.target.value)}
              placeholder="example.com"
            />
          </div>
          <div className="grid gap-1.5">
            <Label className={CRED_LABEL}>端口</Label>
            <Input
              type="number"
              min={1}
              max={65535}
              value={form.port || ""}
              onChange={(e) => set("port", Number(e.target.value) || 0)}
              placeholder="443"
            />
          </div>
        </div>

        {/* 国家 */}
        <div className="grid gap-1.5">
          <Label className={CRED_LABEL}>国家代码</Label>
          <Input
            value={form.country ?? ""}
            onChange={(e) => set("country", e.target.value || undefined)}
            placeholder="JP, US, HK…"
            maxLength={2}
            className="uppercase"
          />
        </div>

        {/* 安全 + 传输 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-1.5">
            <Label className={CRED_LABEL}>安全层</Label>
            <Select
              value={form.security ?? "none"}
              onValueChange={(v) => set("security", v && v !== "none" ? v : undefined)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">无</SelectItem>
                <SelectItem value="tls">TLS</SelectItem>
                <SelectItem value="reality">Reality</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1.5">
            <Label className={CRED_LABEL}>传输协议</Label>
            <Select
              value={form.transport ?? "none"}
              onValueChange={(v) => set("transport", v && v !== "none" ? v : undefined)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">无</SelectItem>
                <SelectItem value="tcp">TCP</SelectItem>
                <SelectItem value="ws">WebSocket</SelectItem>
                <SelectItem value="grpc">gRPC</SelectItem>
                <SelectItem value="quic">QUIC</SelectItem>
                <SelectItem value="http">HTTP</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 协议特定字段 */}
        {protocolFields.length > 0 ? (
          <div className="grid gap-3">
            <span className={CRED_LABEL}>协议参数</span>
            {protocolFields.map((field) => (
              <div key={field.key} className="grid gap-1.5">
                <Label className="text-xs text-muted-foreground">{field.label}</Label>
                <Input
                  value={credentialValue(field.key)}
                  onChange={(e) => setCredential(field.key, e.target.value)}
                  placeholder={field.placeholder ?? field.label}
                />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export function NodeManager() {
  const { failure, items: nodes, loaded } = useNodes()
  const create = useCreateNode()
  const update = useUpdateNode()
  const remove = useRemoveNode()
  const removeMany = useRemoveNodes()
  const reorder = useReorderNodes()
  const importNodes = useImportNodes()

  const [editing, setEditing] = useState<{ node: NodeEntity } | { form: NodeFormData } | null>(null)
  const editorOpen = editing !== null
  const editorSurface = useDeferredClose(editorOpen, () => setEditing(null))
  // The form state of the open editor. Held beside `editing` rather than inside it so the pinned
  // footer can read it; reset whenever the editor opens or closes.
  const [editorForm, setEditorForm] = useState<NodeFormData | null>(null)

  const [importOpen, setImportOpen] = useState(false)
  const importSurface = useDeferredClose(importOpen, () => setImportOpen(false))
  const [importText, setImportText] = useState("")
  const [parsedNodes, setParsedNodes] = useState<CanonicalNode[] | null>(null)
  const [parseError, setParseError] = useState<string | null>(null)

  const [selected, setSelected] = useState<ReadonlySet<string>>(new Set())
  const [qrNode, setQrNode] = useState<NodeEntity | null>(null)
  const qrOpen = qrNode !== null
  const qrSurface = useDeferredClose(qrOpen, () => setQrNode(null))
  const [dragId, setDragId] = useState<string | null>(null)
  const [overId, setOverId] = useState<string | null>(null)
  const checkNodes = useCheckNodes()

  function toggleSelected(id: string) {
    setSelected((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const allSelected = nodes.length > 0 && selected.size === nodes.length
  const someSelected = selected.size > 0

  function toggleAllSelected() {
    setSelected(allSelected ? new Set() : new Set(nodes.map((node) => node.id)))
  }

  function handleBatchDelete() {
    if (selected.size === 0) return
    const count = selected.size
    if (confirm(`确定删除选中的 ${count} 个节点？此操作不可撤销。`)) {
      removeMany.mutate([...selected], {
        onSuccess: () => setSelected(new Set()),
      })
    }
  }

  function resetDrag() {
    setDragId(null)
    setOverId(null)
  }

  function handleDrop(targetId: string) {
    const fromId = dragId
    resetDrag()
    if (!fromId || fromId === targetId) return
    const ids = nodes.map((node) => node.id)
    const from = ids.indexOf(fromId)
    const to = ids.indexOf(targetId)
    if (from === -1 || to === -1) return
    ids.splice(to, 0, ids.splice(from, 1)[0])
    reorder.mutate(ids)
  }

  function handleParse() {
    setParseError(null)
    setParsedNodes(null)
    if (!importText.trim()) {
      setParseError("请输入分享链接。")
      return
    }
    try {
      const result = inspectNodeList(importText)
      if (result.nodes.length === 0) {
        setParseError(
          result.diagnostics.map((d) => d.message).join("；") ||
            "未能解析出任何节点，请检查链接格式。",
        )
        return
      }
      setParsedNodes(result.nodes)
    } catch (error) {
      setParseError(error instanceof Error ? error.message : "解析失败。")
    }
  }

  async function handleImport() {
    if (!parsedNodes || parsedNodes.length === 0) return
    await importNodes.mutateAsync(parsedNodes)
    setImportOpen(false)
    setImportText("")
    setParsedNodes(null)
    setParseError(null)
  }

  const openCreate = useCallback(() => {
    const form = emptyForm()
    setEditing({ form })
    setEditorForm(form)
  }, [])

  const openEdit = useCallback((node: NodeEntity) => {
    const form = formFromNode(node)
    setEditing({ node })
    setEditorForm(form)
  }, [])

  async function handleSave(): Promise<boolean> {
    if (!editing || !editorForm) return false
    try {
      if ("node" in editing) {
        await update.mutateAsync({ id: editing.node.id, data: editorForm })
      } else {
        await create.mutateAsync(editorForm)
      }
      return true
    } catch {
      return false
    }
  }

  async function handleSaveClick() {
    const ok = await handleSave()
    if (ok) {
      setEditing(null)
      setEditorForm(null)
    }
  }

  function closeEditor() {
    setEditing(null)
    setEditorForm(null)
  }

  function listBody() {
    if (failure) {
      return (
        <Empty className="flex-1 border-b">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <IconAlertTriangle />
            </EmptyMedia>
            <EmptyTitle>读取节点失败</EmptyTitle>
            <EmptyDescription>{failure.message}</EmptyDescription>
          </EmptyHeader>
        </Empty>
      )
    }
    if (!loaded) {
      return (
        <Empty className="flex-1 border-b">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <IconLoader2 className="animate-spin" />
            </EmptyMedia>
            <EmptyTitle>正在读取节点</EmptyTitle>
          </EmptyHeader>
        </Empty>
      )
    }
    if (nodes.length === 0) {
      return (
        <Empty className="flex-1 border-b">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <IconNetwork />
            </EmptyMedia>
            <EmptyTitle>还没有节点</EmptyTitle>
            <EmptyDescription>点击上方按钮新建第一个代理节点。</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button onClick={openCreate}>
              <IconPlus data-icon="inline-start" />
              新建节点
            </Button>
          </EmptyContent>
        </Empty>
      )
    }
    return (
      <div className="flex flex-col divide-y px-4 md:px-5">
        {nodes.map((node) => (
          <div
            key={node.id}
            data-dragging={dragId === node.id}
            data-over={overId === node.id}
            onDragOver={(event) => {
              if (!dragId || dragId === node.id) return
              event.preventDefault()
              setOverId(node.id)
            }}
            onDragLeave={() => {
              if (overId === node.id) setOverId(null)
            }}
            onDrop={(event) => {
              event.preventDefault()
              handleDrop(node.id)
            }}
            className="flex items-center gap-2 py-1.5 data-[dragging=true]:opacity-40 data-[over=true]:bg-muted/60 sm:gap-3 sm:py-3"
          >
            <input
              type="checkbox"
              aria-label={`选择节点 ${node.name}`}
              checked={selected.has(node.id)}
              onChange={() => toggleSelected(node.id)}
              className="size-4 shrink-0 accent-foreground"
            />
            <span
              draggable
              onDragStart={(event) => {
                setDragId(node.id)
                event.dataTransfer.effectAllowed = "move"
              }}
              onDragEnd={resetDrag}
              title="拖动排序"
              className="cursor-grab shrink-0 touch-none text-muted-foreground active:cursor-grabbing"
            >
              <IconGripVertical className="size-4" />
            </span>
            <IconServer2 className="size-4 shrink-0 text-muted-foreground" />
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="text-sm font-medium truncate">{node.name}</span>
              <span className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
                <span className="truncate">
                  {node.type.toUpperCase()} · {node.server}:{node.port}
                  {node.country ? ` · ${node.country}` : ""}
                </span>
                <CheckBadge node={node} />
              </span>
            </div>
            <div className="flex shrink-0 gap-1">
              <Button
                variant="ghost"
                size="xs"
                aria-label={`二维码 ${node.name}`}
                title="二维码"
                onClick={() => setQrNode(node)}
              >
                <IconQrcode className="size-4" />
              </Button>
              <Button variant="outline" size="xs" onClick={() => openEdit(node)}>
                <span className="hidden sm:inline">编辑</span>
                <span className="sm:hidden">改</span>
              </Button>
              <Button
                variant="ghost"
                size="xs"
                className="text-destructive"
                disabled={remove.isPending}
                onClick={() => {
                  if (confirm(`确定删除节点 "${node.name}"？`)) {
                    remove.mutate(node.id)
                  }
                }}
              >
                <IconTrash className="size-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className={TOOLBAR_ROW}>
        <h1 className={TOOLBAR_TITLE}>节点管理</h1>
        <div className="flex items-center gap-2">
          {someSelected ? (
            <>
              <label className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <input
                  type="checkbox"
                  aria-label="全选"
                  checked={allSelected}
                  onChange={toggleAllSelected}
                  className="size-4 accent-foreground"
                />
                <span className="hidden sm:inline">全选</span>
              </label>
              <span className="text-xs text-muted-foreground">已选 {selected.size} 个</span>
              <Button
                size="xs"
                variant="outline"
                className="text-destructive"
                disabled={removeMany.isPending}
                onClick={handleBatchDelete}
              >
                <IconTrash data-icon="inline-start" />
                <span className="hidden sm:inline">批量删除</span>
                <span className="sm:hidden">删除</span>
              </Button>
            </>
          ) : (
            <label className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <input
                type="checkbox"
                aria-label="全选"
                checked={false}
                onChange={toggleAllSelected}
                className="size-4 accent-foreground"
              />
              <span className="hidden sm:inline">全选</span>
            </label>
          )}
          <Button
            size="xs"
            variant="outline"
            title={someSelected ? "拨测选中的节点" : "拨测全部节点"}
            disabled={checkNodes.isPending || nodes.length === 0}
            onClick={() => checkNodes.mutate(someSelected ? [...selected] : undefined)}
          >
            {checkNodes.isPending ? (
              <IconLoader2 data-icon="inline-start" className="animate-spin" />
            ) : (
              <IconActivity data-icon="inline-start" />
            )}
            <span className="hidden sm:inline">拨测</span>
          </Button>
          <Button
            size="xs"
            variant="outline"
            title="导入分享链接"
            onClick={() => setImportOpen(true)}
          >
            <IconCloudDownload data-icon="inline-start" />
            <span className="hidden sm:inline">导入分享链接</span>
          </Button>
          <Button size="xs" onClick={openCreate}>
            <IconPlus data-icon="inline-start" />
            <span className="hidden sm:inline">新建节点</span>
            <span className="sm:hidden">新建</span>
          </Button>
        </div>
      </div>

      {listBody()}

      {editorForm ? (
        <Sheet
          open={editorSurface.open}
          onOpenChange={editorSurface.onOpenChange}
          onOpenChangeComplete={editorSurface.onOpenChangeComplete}
        >
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>{editing && ("node" in editing ? "编辑节点" : "新建节点")}</SheetTitle>
            </SheetHeader>
            {/* The body scrolls; the footer stays pinned so 保存 is reachable no matter how many
                protocol fields a protocol adds. */}
            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
              <NodeEditor
                key={editing && ("node" in editing ? editing.node.id : "new")}
                values={editorForm}
                onChange={setEditorForm}
              />
            </div>
            <div className="flex flex-none items-center justify-end gap-2 border-t p-4">
              <Button variant="outline" onClick={closeEditor}>
                取消
              </Button>
              <Button onClick={() => void handleSaveClick()}>保存</Button>
            </div>
          </SheetContent>
        </Sheet>
      ) : null}

      <Sheet
        open={importSurface.open}
        onOpenChange={importSurface.onOpenChange}
        onOpenChangeComplete={importSurface.onOpenChangeComplete}
      >
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>导入分享链接</SheetTitle>
          </SheetHeader>
          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            <div className="flex flex-col gap-4">
              <div className="grid gap-1.5">
                <Label className={CRED_LABEL}>分享链接</Label>
                <Textarea
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  placeholder="ss://... 一行一个链接"
                  rows={6}
                />
              </div>

              {parseError ? (
                <Alert variant="destructive">
                  <IconAlertTriangle className="size-4" />
                  <AlertTitle>解析失败</AlertTitle>
                  <AlertDescription>{parseError}</AlertDescription>
                </Alert>
              ) : null}

              {parsedNodes && parsedNodes.length > 0 ? (
                <div className="grid gap-2">
                  <span className="text-[12.5px] font-medium text-muted-foreground">
                    解析到 {parsedNodes.length} 个节点
                  </span>
                  <div className="max-h-48 overflow-y-auto rounded border divide-y text-sm">
                    {parsedNodes.map((node) => (
                      <div
                        key={`${node.type}://${node.server}:${node.port}`}
                        className="flex items-center gap-2 px-3 py-1.5"
                      >
                        <IconServer2 className="size-3.5 shrink-0 text-muted-foreground" />
                        <span className="truncate">
                          {node.name || `${node.type}://${node.server}:${node.port}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex flex-none flex-wrap items-center justify-end gap-y-2 gap-2 border-t p-4">
            <Button
              variant="outline"
              onClick={() => {
                setImportOpen(false)
                setImportText("")
                setParsedNodes(null)
                setParseError(null)
              }}
            >
              取消
            </Button>
            <Button onClick={handleParse} disabled={!importText.trim()}>
              {parsedNodes ? "重新解析" : "解析"}
            </Button>
            {parsedNodes && parsedNodes.length > 0 && (
              <Button onClick={handleImport} disabled={importNodes.isPending}>
                {importNodes.isPending ? (
                  <>
                    <IconLoader2 className="size-4 animate-spin mr-1" />
                    导入中...
                  </>
                ) : (
                  `导入 ${parsedNodes.length} 个节点`
                )}
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <Dialog open={qrSurface.open} onOpenChange={qrSurface.onOpenChange}>
        <DialogContent className="sm:max-w-xs">
          <DialogHeader>
            <DialogTitle>节点二维码</DialogTitle>
            <DialogDescription>
              {qrNode ? `${qrNode.name} · 用手机客户端扫码导入` : ""}
            </DialogDescription>
          </DialogHeader>
          {qrNode ? (
            <div className="flex flex-col items-center gap-3">
              <div className="rounded border bg-white p-3">
                <QRCode value={nodeShareLink(qrNode)} size={192} fgColor="#0f172a" />
              </div>
              <p className="w-full max-w-full break-all rounded bg-muted p-2 font-mono text-[11px] leading-relaxed text-muted-foreground">
                {nodeShareLink(qrNode)}
              </p>
              <Button
                size="xs"
                variant="outline"
                onClick={() => {
                  void navigator.clipboard
                    .writeText(nodeShareLink(qrNode))
                    .then(() => showSuccess("分享链接已复制"))
                }}
              >
                <IconCopy data-icon="inline-start" />
                复制链接
              </Button>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  )
}
