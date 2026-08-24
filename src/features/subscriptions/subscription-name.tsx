import { IconPencil } from "@tabler/icons-react"
import { useState } from "react"
import type { ReactNode } from "react"
import { cn } from "tailwind-variants"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MAX_SUBSCRIPTION_NAME_LENGTH } from "@/core/subscriptions"
import { RowControls } from "./subscription-row"

/**
 * The list's name cell, shared by the pointer table and the touch cards: the name stays a
 * navigation target, and a pencil beside it swaps the name for an input.
 *
 * Enter or blur commits through `onRename`; Escape cancels. A rejected `onRename` keeps the input
 * open so the operator can retry — the mutation's own toast reports the failure. Blank names are
 * refused here rather than sent: the server would only reject them, and the field stays focused.
 */
export function EditableName({
  className,
  name,
  nameClassName,
  onOpen,
  onRename,
  subtitle,
}: {
  /** Applied to the clickable name area; the caller sizes it for its surface. */
  className?: string
  name: string
  /** The name line inside the clickable area. */
  nameClassName?: string
  /** Opens the detail surface — the name itself stays a navigation target. */
  onOpen: () => void
  /** Commits the new name; must reject when the write failed. */
  onRename: (name: string) => Promise<void>
  /** The small line under the name (token hint, state label, …). */
  subtitle?: ReactNode
}) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(name)
  const [pending, setPending] = useState(false)

  // The display reads the `name` prop directly, so an external refetch's rename shows up on its own;
  // `value` only exists while editing and is reset from `name` each time editing begins.
  function begin() {
    setValue(name)
    setEditing(true)
  }

  function cancel() {
    setEditing(false)
  }

  async function commit() {
    if (pending) return
    const next = value.trim()
    if (!next) return
    if (next === name) {
      setEditing(false)
      return
    }
    setPending(true)
    try {
      await onRename(next)
      setEditing(false)
    } catch {
      // The mutation's toast reports the failure; keep the input for a retry.
    } finally {
      setPending(false)
    }
  }

  return editing ? (
    // RowControls like the pencil: in the pointer table the row itself is clickable, and a click on
    // the input must reposition the cursor, not open the detail dialog.
    <RowControls>
      <Input
        aria-label="重命名订阅"
        autoFocus
        disabled={pending}
        maxLength={MAX_SUBSCRIPTION_NAME_LENGTH}
        onBlur={() => void commit()}
        onFocus={(event) => event.target.select()}
        onKeyDown={(event) => {
          if (event.key === "Enter") void commit()
          else if (event.key === "Escape") cancel()
        }}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="h-7 text-sm font-medium"
      />
    </RowControls>
  ) : (
    <div className={cn("flex min-w-0 items-start gap-1", className)}>
      <button type="button" onClick={onOpen} className="flex min-w-0 flex-col gap-0.5 text-left">
        <span className={cn("truncate", nameClassName)}>{name}</span>
        {subtitle}
      </button>
      {/* RowControls so the pencil never opens the row's detail surface alongside editing. */}
      <RowControls className="flex-none">
        <Button variant="ghost" size="icon-xs" aria-label="重命名" onClick={begin}>
          <IconPencil />
        </Button>
      </RowControls>
    </div>
  )
}
