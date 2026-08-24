import { IconFolder, IconPlus, IconSearch } from "@tabler/icons-react"
import { cn } from "tailwind-variants"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SUBSCRIPTION_STATE_LABELS } from "./labels"
import type { SubscriptionState } from "./labels"

export type StatusFilter = SubscriptionState | "all"

const STATUS_OPTIONS: Array<{ label: string; value: StatusFilter }> = [
  { label: "全部状态", value: "all" },
  ...SUBSCRIPTION_STATE_LABELS,
]

/**
 * The search box, status filter and the two create actions. Sits beside the page's own title inside
 * the toolbar row; the search is what the list narrows by (name and folder), the status select the
 * existing state filter.
 */
export function SubscriptionToolbar({
  onCreate,
  onCreateCollection,
  onQueryChange,
  onStatusChange,
  query,
  status,
}: {
  onCreate: () => void
  onCreateCollection: () => void
  onQueryChange: (next: string) => void
  onStatusChange: (next: StatusFilter) => void
  query: string
  status: StatusFilter
}) {
  return (
    <div className="flex min-w-0 flex-1 items-center justify-end gap-2.5 md:gap-3">
      <div className="relative min-w-0 flex-1 md:flex-none md:w-44">
        <IconSearch className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          aria-label="搜索订阅名称或分组"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="搜索名称 / 分组"
          className="h-8 pl-8"
        />
      </div>
      <Select
        items={STATUS_OPTIONS}
        value={status}
        onValueChange={(value) => onStatusChange((value as StatusFilter) ?? "all")}
      >
        <SelectTrigger
          aria-label="按状态过滤"
          className={cn(
            "border-border px-2.5 text-[12.5px] max-md:h-11!",
            "hidden lg:flex lg:w-[7.5rem]",
          )}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {STATUS_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button variant="outline" onClick={onCreateCollection}>
        <IconFolder data-icon="inline-start" />
        <span className="md:hidden">集合</span>
        <span className="max-md:hidden">新建集合</span>
      </Button>
      {/* Same height as the status select beside it. */}
      <Button onClick={onCreate}>
        <IconPlus data-icon="inline-start" />
        <span className="md:hidden">新建</span>
        <span className="max-md:hidden">新建订阅</span>
      </Button>
    </div>
  )
}
