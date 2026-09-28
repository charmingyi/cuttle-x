import * as React from "react"
import { cn } from "tailwind-variants"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // `max-h-64` + `overflow-y-auto` cap `field-sizing-content`: without a ceiling the textarea
        // grows to its content and pushes everything below it out of reach, on a page or in a sheet
        // that then has nothing left to scroll.
        "flex field-sizing-content max-h-64 min-h-16 w-full overflow-y-auto rounded-none border border-input bg-transparent px-2.5 py-2 text-xs transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 md:text-xs dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
