import { listAudit } from "@/server/audit-log"
import { AdminFailure } from "@/shared/admin-error"
import type { AuditListInput, AuditListPayload } from "./contract"

export async function readAuditLog(input: AuditListInput): Promise<AuditListPayload> {
  if (input && typeof input !== "object") {
    throw new AdminFailure("invalid_request", "查询参数无效。")
  }
  const limit = typeof input.limit === "number" ? input.limit : 100
  return { entries: await listAudit({ limit, kind: input.kind }) }
}
