import {
  IconAlertCircle,
  IconAlertTriangle,
  IconEdit,
  IconPlus,
  IconSearch,
  IconServer2,
} from "@tabler/icons-react"
import { useForm } from "@tanstack/react-form"
import { useMemo, useState } from "react"
import { cn } from "tailwind-variants"
import { SideSurface } from "@/components/side-surface"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import type { TargetId } from "@/core/nodes"
import { MAX_SUBSCRIPTION_NAME_LENGTH } from "@/core/subscriptions"
import type { SubscriptionDraft } from "@/core/subscriptions"
import { useNodes } from "@/features/nodes/queries"
import { describeProcessor, mergeRuleChain, RuleChainForm, splitProcessors } from "@/features/rules"
import type { RuleChainSplit } from "@/features/rules"
import { SOURCE_TYPE_LABELS } from "../source-types"
import { TARGET_OPTIONS } from "../targets"
import {
  fieldError,
  invalidField,
  RemoteUrlCount,
  SECTIONS,
  SectionBody,
  SectionHeader,
  SOURCE_TYPE_ICONS,
} from "./editor-sections"
import { validateName, validateSource } from "./editor-validation"
import { sourceFromValues } from "./editor-values"
import type { EditorValues } from "./editor-values"

function parseNodeIds(value: string): string[] {
  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function NodeSelector({
  selectedIds,
  onChange,
}: {
  selectedIds: string[]
  onChange: (ids: string[]) => void
}) {
  const { items: nodes, loaded, failure } = useNodes()
  const [search, setSearch] = useState("")

  const filtered = useMemo(
    () =>
      nodes.filter(
        (node) =>
          !search ||
          node.name.toLowerCase().includes(search.toLowerCase()) ||
          node.server.toLowerCase().includes(search.toLowerCase()),
      ),
    [nodes, search],
  )

  function toggle(id: string) {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((i) => i !== id))
    } else {
      onChange([...selectedIds, id])
    }
  }

  if (failure) {
    return (
      <div className="flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/6 px-3 py-2 text-sm text-destructive">
        <IconAlertCircle className="size-4 shrink-0" />
        读取节点失败
      </div>
    )
  }

  if (!loaded) {
    return (
      <div className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm text-muted-foreground">
        加载节点中…
      </div>
    )
  }

  if (nodes.length === 0) {
    return (
      <div className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm text-muted-foreground">
        <IconServer2 className="size-4 shrink-0" />
        还没有节点，请先在节点管理中创建节点。
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <IconSearch className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="搜索节点…"
          className="h-8 w-full rounded-md border border-input bg-background pl-7 pr-2.5 text-xs outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-1 focus:ring-ring"
        />
      </div>
      <div className="flex max-h-56 flex-col gap-1 overflow-y-auto rounded-md border p-1.5">
        {filtered.length === 0 ? (
          <span className="px-2 py-3 text-center text-xs text-muted-foreground">
            未找到匹配的节点
          </span>
        ) : (
          filtered.map((node) => {
            const checked = selectedIds.includes(node.id)
            return (
              <label
                key={node.id}
                className="flex cursor-pointer items-center gap-2.5 rounded-sm px-2 py-1.5 text-xs hover:bg-muted data-[checked=true]:bg-muted/60"
                data-checked={checked}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggle(node.id)}
                  className="size-3.5 accent-primary"
                />
                <IconServer2 className="size-3.5 shrink-0 text-muted-foreground" />
                <span className="min-w-0 flex-1 truncate font-medium">{node.name}</span>
                <span className="shrink-0 text-muted-foreground">
                  {node.type.toUpperCase()} · {node.server}:{node.port}
                </span>
              </label>
            )
          })
        )}
      </div>
      {selectedIds.length > 0 ? (
        <span className="text-[11px] text-muted-foreground">已选 {selectedIds.length} 个节点</span>
      ) : null}
    </div>
  )
}

/**
 * Uncontrolled with respect to `values`: the manager remounts this with a fresh `key` whenever it
 * opens the editor, so `defaultValues` is always the draft the user asked for.
 */
export function SubscriptionEditor({
  onOpenChange,
  onOpenChangeComplete,
  onSave,
  open,
  values,
}: {
  onOpenChange: (open: boolean) => void
  onOpenChangeComplete?: (open: boolean) => void
  onSave: (draft: SubscriptionDraft, id?: string) => Promise<boolean>
  open: boolean
  values: EditorValues
}) {
  const [chain, setChain] = useState<RuleChainSplit>(() => splitProcessors(values.processors))

  const form = useForm({
    defaultValues: values,
    onSubmit: async ({ value }) => {
      const draft: SubscriptionDraft = {
        name: value.name,
        folder: value.folder || undefined,
        source: sourceFromValues(value),
        defaultTarget: value.defaultTarget,
        processors: value.processors,
        enabled: value.enabled,
      }
      if (await onSave(draft, value.id)) onOpenChange(false)
    },
  })

  const actions = (
    <form.Subscribe
      selector={(state) =>
        [state.canSubmit, state.isSubmitting, state.values.id, state.fieldMeta] as const
      }
    >
      {([canSubmit, isSubmitting, id, fieldMeta]) => {
        const broken = SECTIONS.filter((section) => invalidField(fieldMeta, section.field))
        return (
          <>
            {broken.length > 0 ? (
              <span className="mr-auto inline-flex items-center gap-2 text-[12.5px] font-medium text-destructive">
                <IconAlertTriangle className="size-3.75 shrink-0" />
                {broken.length} 处需要修正 · 分区 {broken.map((item) => item.id).join("、")}
              </span>
            ) : null}
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              取消
            </Button>
            <Button type="submit" form="subscription-editor" disabled={isSubmitting || !canSubmit}>
              {id ? <IconEdit data-icon="inline-start" /> : <IconPlus data-icon="inline-start" />}
              {isSubmitting ? "保存中" : id ? "保存修改" : "创建订阅"}
            </Button>
          </>
        )
      }}
    </form.Subscribe>
  )

  return (
    <SideSurface
      actions={actions}
      bodyClassName="p-0"
      className="data-[side=right]:sm:max-w-lg data-[side=right]:xl:max-w-xl"
      description="订阅源、默认客户端和规则链会一起持久化。"
      onOpenChange={onOpenChange}
      onOpenChangeComplete={onOpenChangeComplete}
      open={open}
      title={values.id ? "编辑订阅" : "创建订阅"}
    >
      <form
        id="subscription-editor"
        onSubmit={(event) => {
          event.preventDefault()
          event.stopPropagation()
          void form.handleSubmit()
        }}
      >
        <form.Subscribe selector={(state) => [state.values, state.fieldMeta] as const}>
          {([current, fieldMeta]) => {
            const broken = SECTIONS.filter((section) => invalidField(fieldMeta, section.field))
            const isBroken = (id: string) => broken.some((section) => section.id === id)
            const sourceError = fieldError(fieldMeta, "sourceValue")

            return (
              <div className="flex flex-col">
                <SectionHeader id="01" title="基本信息" invalid={isBroken("01")} />
                <SectionBody>
                  <div className="grid gap-5 md:grid-cols-2">
                    <form.Field
                      name="name"
                      validators={{ onChange: ({ value }) => validateName(value) }}
                    >
                      {(field) => {
                        const invalid = field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={invalid}>
                            <FieldLabel htmlFor={field.name}>名称</FieldLabel>
                            <Input
                              id={field.name}
                              name={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(event) => field.handleChange(event.target.value)}
                              aria-invalid={invalid}
                            />
                            {invalid ? (
                              <FieldError>{String(field.state.meta.errors[0] ?? "")}</FieldError>
                            ) : null}
                          </Field>
                        )
                      }}
                    </form.Field>

                    {/* Sits with the name rather than with the source: it describes what this
                        subscription renders as, not where its nodes come from. */}
                    <form.Field name="defaultTarget">
                      {(field) => (
                        <Field>
                          <FieldLabel htmlFor={field.name}>默认客户端</FieldLabel>
                          <Select
                            items={TARGET_OPTIONS}
                            value={field.state.value}
                            onValueChange={(value) => field.handleChange(value as TargetId)}
                          >
                            <SelectTrigger id={field.name} className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {TARGET_OPTIONS.map((item) => (
                                  <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </Field>
                      )}
                    </form.Field>

                    {/* The optional folder/group this subscription belongs to; search and the list
                        surface both read it, and the list's move buttons order within it. */}
                    <form.Field name="folder">
                      {(field) => (
                        <Field className="md:col-span-2">
                          <FieldLabel htmlFor={field.name}>分组</FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            maxLength={MAX_SUBSCRIPTION_NAME_LENGTH}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(event) => field.handleChange(event.target.value)}
                            placeholder="可选，例如“机场 A”"
                          />
                        </Field>
                      )}
                    </form.Field>
                  </div>
                </SectionBody>

                <SectionHeader id="02" title="订阅来源" invalid={isBroken("02")} />
                <SectionBody>
                  {/* The source error belongs to the field below, but it is shown up here on the
                      type row: that row is the one thing always in view, and the box it describes
                      carries no label of its own. */}
                  <form.Field name="sourceType">
                    {(field) => (
                      <Field>
                        <FieldTitle>来源类型</FieldTitle>
                        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                          <ButtonGroup>
                            {(["raw", "pool", "remote", "nodes"] as const).map((option) => {
                              const Icon = SOURCE_TYPE_ICONS[option]
                              const active = field.state.value === option
                              return (
                                <Button
                                  key={option}
                                  type="button"
                                  size="sm"
                                  variant={active ? "default" : "outline"}
                                  aria-pressed={active}
                                  onClick={() => {
                                    if (active) return
                                    field.handleChange(option)
                                    form.setFieldValue("sourceValue", "")
                                  }}
                                >
                                  <Icon data-icon="inline-start" />
                                  {SOURCE_TYPE_LABELS[option]}
                                </Button>
                              )
                            })}
                          </ButtonGroup>
                          {sourceError ? (
                            <FieldError className="inline-flex items-center gap-1.5 text-[12.5px]">
                              <IconAlertCircle className="size-3 shrink-0" />
                              {sourceError}
                            </FieldError>
                          ) : null}
                        </div>
                      </Field>
                    )}
                  </form.Field>

                  <form.Field
                    name="sourceValue"
                    validators={{
                      onChange: ({ value }) => validateSource(value, current.sourceType),
                    }}
                  >
                    {(field) => (
                      <Field data-invalid={Boolean(sourceError)}>
                        {current.sourceType === "nodes" ? (
                          <NodeSelector
                            selectedIds={parseNodeIds(field.state.value)}
                            onChange={(ids) => field.handleChange(JSON.stringify(ids))}
                          />
                        ) : (
                          <>
                            <Textarea
                              id={field.name}
                              name={field.name}
                              // The visible label is gone, so the accessible name has to be carried here.
                              aria-label={
                                current.sourceType === "remote"
                                  ? "远程链接"
                                  : current.sourceType === "pool"
                                    ? "持久化节点数据"
                                    : "订阅原文"
                              }
                              className={cn(
                                "max-h-80 font-mono text-xs",
                                current.sourceType === "remote" ? "min-h-24" : "min-h-44",
                              )}
                              placeholder={
                                current.sourceType === "remote"
                                  ? "多个链接需要换行或者使用 | 分隔"
                                  : undefined
                              }
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(event) => field.handleChange(event.target.value)}
                              aria-invalid={Boolean(sourceError)}
                              readOnly={current.sourceType === "pool"}
                              spellCheck={false}
                            />
                            {current.sourceType === "remote" ? (
                              <RemoteUrlCount value={field.state.value} />
                            ) : null}
                          </>
                        )}
                      </Field>
                    )}
                  </form.Field>
                </SectionBody>

                <SectionHeader id="03" title="规则链" invalid={isBroken("03")} />
                <SectionBody>
                  <form.Field name="processors">
                    {(field) => (
                      // No label: the section header above already reads "规则链".
                      <Field>
                        <RuleChainForm
                          value={chain.rules}
                          onChange={(rules) => {
                            const next = { ...chain, rules }
                            setChain(next)
                            field.handleChange(mergeRuleChain(next))
                          }}
                        />
                        {chain.preserved.length > 0 ? (
                          <FieldDescription>
                            另有 {chain.preserved.length} 条这个表单没有对应行的规则：
                            {chain.preserved
                              .map(({ processor }) => describeProcessor(processor))
                              .join("、")}
                            。保存时按原位置原样保留。
                          </FieldDescription>
                        ) : null}
                      </Field>
                    )}
                  </form.Field>
                </SectionBody>

                {/* One switch needs no section of its own, so it closes the form as a single row. */}
                <form.Field name="enabled">
                  {(field) => (
                    <Field orientation="horizontal" className="px-4 py-4 md:px-8 md:py-5">
                      <FieldContent>
                        <FieldTitle>启用订阅</FieldTitle>
                        <FieldDescription>停用后订阅地址返回 410。</FieldDescription>
                      </FieldContent>
                      <Switch
                        aria-label="启用订阅"
                        checked={field.state.value}
                        onCheckedChange={field.handleChange}
                      />
                    </Field>
                  )}
                </form.Field>
              </div>
            )
          }}
        </form.Subscribe>
      </form>
    </SideSurface>
  )
}
