import { createServerFn } from "@tanstack/react-start"
import { adminFunctionMiddleware } from "@/middleware/admin-function"
import type { AuditListInput } from "./contract"
import * as operations from "./operations"

export const readAuditLog = createServerFn({ method: "POST" })
  .middleware([adminFunctionMiddleware])
  .validator((input: AuditListInput) => input)
  .handler(({ data }) => operations.readAuditLog(data))
