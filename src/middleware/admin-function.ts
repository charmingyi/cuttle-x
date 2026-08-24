import { isNotFound, isRedirect } from "@tanstack/react-router"
import { createMiddleware } from "@tanstack/react-start"
import { getRequest, setResponseHeader } from "@tanstack/react-start/server"
import { readToken } from "@/features/session/token"
import { authorizeAdminRequest } from "@/server/admin-auth"
import {
  AdminFailure,
  INTERNAL_MESSAGE,
  RATE_LIMITED_MESSAGE,
  UNAUTHORIZED_MESSAGE,
} from "@/shared/admin-error"
import type { AdminErrorCode } from "@/shared/admin-error"
import { apiErrorFromMessage, messageWithCode } from "@/shared/api-error"

// Server functions bypass request middleware. This module is also loaded by the browser, so imports
// must remain browser-safe. RPC serializes only Error.message; messageWithCode preserves the code.
export const adminFunctionMiddleware = createMiddleware({ type: "function" })
  .client(async ({ next }) => {
    try {
      return await next({ headers: { Authorization: `Bearer ${readToken()}` } })
    } catch (error) {
      throw apiErrorFromMessage(error)
    }
  })
  .server(async ({ next }) => {
    let result: Awaited<ReturnType<typeof authorizeAdminRequest>>
    try {
      result = await authorizeAdminRequest(getRequest())
    } catch (error) {
      console.error("authorize-admin-server-function", error)
      throw codedRejection("internal", INTERNAL_MESSAGE, error)
    }
    if (result === "authorized") {
      setResponseHeader("Cache-Control", "no-store")
      try {
        return await next()
      } catch (error) {
        if (isRedirect(error) || isNotFound(error)) throw error
        if (error instanceof AdminFailure) {
          if (["internal", "upstream_unavailable"].includes(error.code)) {
            console.error("admin-server-function", error)
          }
          throw codedRejection(
            error.code,
            error.code === "internal" ? INTERNAL_MESSAGE : error.message,
            error,
          )
        }
        console.error("admin-server-function", error)
        throw codedRejection("internal", INTERNAL_MESSAGE, error)
      }
    }
    throw result === "rate_limited"
      ? codedRejection("rate_limited", RATE_LIMITED_MESSAGE)
      : codedRejection("unauthorized", UNAUTHORIZED_MESSAGE)
  })

function codedRejection(code: AdminErrorCode, message: string, cause?: unknown) {
  return new AdminFailure(code, messageWithCode(code, message), { cause })
}
