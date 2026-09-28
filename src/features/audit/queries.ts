import { useQuery } from "@tanstack/react-query"
import * as api from "./api/server-fn"

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
    staleTime: 15_000,
    refetchInterval: 30_000,
  })
}
