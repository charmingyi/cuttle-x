import { IconLoader2, IconPlugConnected } from "@tabler/icons-react"
import { useNavigate } from "@tanstack/react-router"
import { useEffect, useRef } from "react"
import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  clearToken,
  hasToken,
  useConnect,
  useToken,
  useTokenRefused,
  useTokenUsable,
  useTokenVerified,
} from "@/features/session"
import { ApiError } from "@/shared/api-error"
import { showError } from "@/shared/notify"
import { useConnectionPanel } from "./connection-panel-state"

/**
 * Decides between the page, the password prompt and leaving. A password restored from sessionStorage
 * is deliberately unverified; the effect below probes it through the same authenticated session route
 * before protected content renders. Passwords entered in the panel use that same probe in
 * `session/queries.ts` before they are committed.
 */
export function ConnectionGate({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const token = useToken()
  const tokenUsable = useTokenUsable()
  const tokenRefused = useTokenRefused()
  const tokenVerified = useTokenVerified()
  const connect = useConnect()
  const { open: panelOpen, setOpen: setPanelOpen } = useConnectionPanel()
  const checking = useRef(false)

  useEffect(() => {
    if (!hasToken(token) || tokenVerified || tokenRefused || panelOpen || checking.current) return
    checking.current = true
    void connect(token)
      .catch((error: unknown) => {
        if (error instanceof ApiError && error.code === "unauthorized") clearToken()
        showError(error, "无法验证访问密码。")
        setPanelOpen(true)
      })
      .finally(() => {
        checking.current = false
      })
  }, [connect, panelOpen, setPanelOpen, token, tokenRefused, tokenVerified])

  // A key the admin API has refused leaves this page rather than showing protected content under a
  // session that no longer exists. Both the workbench and subscription manager use this same gate.
  //
  // Refusal alone is the condition, and it carries the rest: nothing can refuse a key the session
  // does not hold, and every path that drops or replaces the key clears the refusal with it
  // (`session/token.ts`).
  //
  // Never while the connection panel is open, though: that is someone re-arming the very key this is
  // reacting to, and navigating out from under them would take the panel with it.
  const leaving = tokenRefused && !panelOpen
  useEffect(() => {
    if (leaving) void navigate({ to: "/", replace: true, viewTransition: true })
  }, [navigate, leaving])

  if (tokenUsable) return children

  if (hasToken(token) && !tokenVerified && !panelOpen) {
    return (
      <Empty className="flex-1 border-b">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconLoader2 className="animate-spin" />
          </EmptyMedia>
          <EmptyTitle>正在验证访问密码</EmptyTitle>
        </EmptyHeader>
      </Empty>
    )
  }

  // A refused session is one frame away from being somewhere else, so there is nothing to say here
  // that would reach anyone: copy would only be a third sentence in a row for a reader who asked one
  // question.
  if (leaving) {
    return (
      <Empty className="flex-1 border-b">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconLoader2 className="animate-spin" />
          </EmptyMedia>
        </EmptyHeader>
      </Empty>
    )
  }

  return (
    <Empty className="flex-1 border-b">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconPlugConnected />
        </EmptyMedia>
        <EmptyTitle>请输入访问密码</EmptyTitle>
        <EmptyDescription>
          CuttleX 是单用户管理工具。密码通过服务端验证后，只保留在当前浏览器会话。
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={() => setPanelOpen(true)}>
          <IconPlugConnected data-icon="inline-start" />
          输入访问密码
        </Button>
      </EmptyContent>
    </Empty>
  )
}
