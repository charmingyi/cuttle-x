import {
  n as isRedirect,
  o as isNotFound,
  t as createMiddleware,
} from "./createMiddleware-CkzUAgXb.js"
import { _ as setResponseHeader, m as getRequest } from "./createServerFn-DRD1-jCn.js"
import {
  A as readToken,
  C as RATE_LIMITED_MESSAGE,
  S as INTERNAL_MESSAGE,
  T as authorizeAdminRequest,
  v as apiErrorFromMessage,
  w as UNAUTHORIZED_MESSAGE,
  x as AdminFailure,
  y as messageWithCode,
} from "./nodes-b2qYjNQG.js"
//#region src/middleware/admin-function.ts
const adminFunctionMiddleware = createMiddleware({ type: "function" })
  .client(async ({ next }) => {
    try {
      return await next({ headers: { Authorization: `Bearer ${readToken()}` } })
    } catch (error) {
      throw apiErrorFromMessage(error)
    }
  })
  .server(async ({ next }) => {
    let result
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
          if (["internal", "upstream_unavailable"].includes(error.code))
            console.error("admin-server-function", error)
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
function codedRejection(code, message, cause) {
  return new AdminFailure(code, messageWithCode(code, message), { cause })
}
//#endregion
export { adminFunctionMiddleware as t }
