import { useQueryClient } from "@tanstack/react-query"
import type { QueryClient } from "@tanstack/react-query"
import type { AdminErrorCode } from "@/shared/admin-error"
import { ADMIN_ERROR_CODES } from "@/shared/admin-error"
import { ApiError } from "@/shared/api-error"
import { showSuccess } from "@/shared/notify"
import { clearToken, commitToken, hasToken } from "./token"

/**
 * The two `useQueryClient()` call sites session needs. Cache operations are confined to a feature's
 * `queries.ts` — a component or hook file outside it may only call the named hooks this module
 * exports, never reach the client itself.
 */

/** Anything already cached was read with the previous key. */
function resetAdminCache(client: QueryClient) {
  client.removeQueries()
}

function isAdminErrorCode(value: unknown): value is AdminErrorCode {
  return typeof value === "string" && (ADMIN_ERROR_CODES as readonly string[]).includes(value)
}

async function verifyToken(token: string) {
  const response = await fetch("/api/session", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  })
  if (response.ok) return

  let body: { code?: unknown; error?: unknown } = {}
  try {
    body = (await response.json()) as typeof body
  } catch {
    // An unreadable rejection is still a rejection; the fallback below keeps its details private.
  }
  const code = isAdminErrorCode(body.code) ? body.code : "internal"
  const message = typeof body.error === "string" ? body.error : "无法验证管理密码。"
  throw new ApiError(code, message)
}

/**
 * Proves the single-user password before it enters the browser session. The same `adminOnly`
 * middleware protects this probe and every management request, so a password accepted here is not a
 * second credential with a weaker definition. A later 401 still refuses the session normally — for
 * example after the deployment secret changes.
 */
export function useConnect() {
  const client = useQueryClient()

  return async (draft: string) => {
    const token = draft.trim()
    if (!hasToken(token)) return false
    await verifyToken(token)
    commitToken(token)
    resetAdminCache(client)
    return true
  }
}

/**
 * The way out: the key goes, and with it everything that was read under it.
 * Nothing in flight gates this — dropping a credential is not an action to make someone wait for.
 */
export function useDisconnect() {
  const client = useQueryClient()

  return () => {
    clearToken()
    resetAdminCache(client)
    showSuccess("已断开连接", "管理密钥已从这个浏览器会话清除。")
  }
}
