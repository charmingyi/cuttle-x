import { useQuery } from "@tanstack/react-query"
import type { AuditKind } from "@/server/audit-log"
import * as api from "./api/server-fn"

export const auditKeys = {
  all: ["audit"] as const,
  list: (kind: AuditKind | undefined) => ["audit", "list", kind ?? "all"] as const,
}

export function useAuditLog(kind: AuditKind | undefined, limit = 200) {
  return useQuery({
    queryKey: auditKeys.list(kind),
    queryFn: () => api.readAuditLog({ data: { limit, kind } }),
    staleTime: 15_000,
  })
}
