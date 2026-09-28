import { useQuery } from "@tanstack/react-query"
import * as api from "./api/server-fn"

/**
 * How often the panel re-reads. Short enough that a client pull shows up while the operator is
 * still watching for it — the panel is a monitor, not a report — and it is one constant because the
 * footer states the cadence: a number written twice is a number that ends up wrong once.
 */
export const AUDIT_REFRESH_MS = 5_000

export const auditKeys = {
  all: ["audit"] as const,
  list: ["audit", "list", "all"] as const,
}

/**
 * The whole recent window in one query: the panel filters and counts client-side, so the summary
 * strip and every filter tab read the same rows. Auto-refresh keeps a page left open current.
 */
export function useAuditLog() {
  return useQuery({
    queryKey: auditKeys.list,
    queryFn: () => api.readAuditLog({ data: { limit: 500 } }),
    staleTime: AUDIT_REFRESH_MS,
    refetchInterval: AUDIT_REFRESH_MS,
  })
}
