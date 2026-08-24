import type { AuditEntry, AuditKind } from "@/server/audit-log"

export interface AuditListPayload {
  entries: AuditEntry[]
}

export interface AuditListInput {
  limit?: number
  kind?: AuditKind
}
