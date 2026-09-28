import { IconDeviceLaptop, IconMoon, IconSun } from "@tabler/icons-react"
import { useSyncExternalStore } from "react"
import type { ComponentType } from "react"
import { applyTheme, setStoredTheme, storedTheme } from "@/shared/theme"
import type { ThemeChoice } from "@/shared/theme"

const OPTIONS: Array<{
  choice: ThemeChoice
  label: string
  icon: ComponentType<{ className?: string }>
}> = [
  { choice: "light", label: "亮色", icon: IconSun },
  { choice: "dark", label: "暗色", icon: IconMoon },
  { choice: "system", label: "跟随系统", icon: IconDeviceLaptop },
]

const CHANGE = "cuttlex-theme-change"

/** A store so every header instance reads the same choice without lifting state into a context. */
const listeners = new Set<() => void>()
if (typeof window !== "undefined") {
  window.addEventListener(CHANGE, () => listeners.forEach((listener) => listener()))
  // `system` follows the OS live, so the applied class has to track media changes too.
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    applyTheme(storedTheme())
  })
}

export function ThemeToggle({ compact }: { compact?: boolean }) {
  const choice = useSyncExternalStore(
    (listener) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    storedTheme,
    () => "system" as ThemeChoice,
  )

  function cycle() {
    const next =
      OPTIONS[(OPTIONS.findIndex((option) => option.choice === choice) + 1) % OPTIONS.length]
    setStoredTheme(next.choice)
    window.dispatchEvent(new Event(CHANGE))
  }

  const current = OPTIONS.find((option) => option.choice === choice) ?? OPTIONS[2]

  if (compact) {
    return (
      <button
        type="button"
        aria-label={`主题：${current.label}，点击切换`}
        title={`主题：${current.label}`}
        onClick={cycle}
        className="inline-flex size-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
      >
        <current.icon className="size-4.5" />
      </button>
    )
  }

  return (
    <button
      type="button"
      aria-label={`主题：${current.label}，点击切换`}
      title={`主题：${current.label}`}
      onClick={cycle}
      className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] text-muted-foreground uppercase transition-colors hover:text-foreground"
    >
      <current.icon className="size-3.5" />
      {current.label}
    </button>
  )
}
