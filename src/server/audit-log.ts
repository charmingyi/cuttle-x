import { env } from "cloudflare:workers"

/**
 * Audit log: management operations and subscription deliveries, one row per event.
 *
 * The log is a side channel by design. `recordAudit` never throws into the operation whose event
 * it describes — a full audit table (or any D1 hiccup) must not break a node save or a subscription
 * delivery, so failures are logged and swallowed. Reads pair with a retention pass that drops rows
 * older than the window the panel cares about.
 */

export const AUDIT_KINDS = [
  "auth_login",
  "auth_failed",
  "node_create",
  "node_update",
  "node_delete",
  "node_bulk_delete",
  "node_import",
  "subscription_create",
  "subscription_update",
  "subscription_delete",
  "subscription_rotate",
  "subscription_reorder",
  "delivery",
] as const

export type AuditKind = (typeof AUDIT_KINDS)[number]

export interface AuditEntry {
  id: string
  kind: AuditKind
  detailJson: string
  createdAt: string
}

const RETENTION_DAYS = 60

interface AuditRow {
  id: string
  kind: string
  detail_json: string
  created_at: string
}

function rowToEntry(row: AuditRow): AuditEntry {
  return {
    id: row.id,
    kind: row.kind as AuditKind,
    detailJson: row.detail_json,
    createdAt: row.created_at,
  }
}

/** Writes one event; never throws. Details are JSON-serialized and size-capped. */
export async function recordAudit(
  kind: AuditKind,
  detail: Record<string, unknown> = {},
): Promise<void> {
  try {
    const db = env.DB
    const id = crypto.randomUUID()
    const now = new Date().toISOString()
    const json = JSON.stringify(detail).slice(0, 16_000)
    await db
      .prepare(`INSERT INTO audit_log (id, kind, detail_json, created_at) VALUES (?, ?, ?, ?)`)
      .bind(id, kind, json, now)
      .run()
  } catch (error) {
    console.error("record-audit", kind, error)
  }
}

/** Reads the most recent entries, newest first, and prunes anything past the retention window. */
export async function listAudit(options: {
  limit?: number
  kind?: AuditKind
}): Promise<AuditEntry[]> {
  const db = env.DB
  const limit = Math.min(Math.max(Math.floor(options.limit ?? 100), 1), 500)
  // Caller-supplied kind goes through a whitelist: an unknown value is an empty result, never a
  // query that depends on caller spelling.
  const kind = options.kind && AUDIT_KINDS.includes(options.kind) ? options.kind : undefined
  const cutoff = new Date(Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000).toISOString()

  // Prune opportunistically — best effort, never blocks the read.
  try {
    await db.prepare(`DELETE FROM audit_log WHERE created_at < ?`).bind(cutoff).run()
  } catch (error) {
    console.error("prune-audit", error)
  }

  if (kind) {
    const { results } = await db
      .prepare(
        `SELECT id, kind, detail_json, created_at FROM audit_log
         WHERE kind = ? AND created_at >= ?
         ORDER BY created_at DESC LIMIT ?`,
      )
      .bind(kind, cutoff, limit)
      .all<AuditRow>()
    return results.map((row) => rowToEntry(row))
  }
  const { results } = await db
    .prepare(
      `SELECT id, kind, detail_json, created_at FROM audit_log
       WHERE created_at >= ?
       ORDER BY created_at DESC LIMIT ?`,
    )
    .bind(cutoff, limit)
    .all<AuditRow>()
  return results.map((row) => rowToEntry(row))
}
