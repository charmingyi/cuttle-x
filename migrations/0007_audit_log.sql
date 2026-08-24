-- An audit log for management operations and subscription deliveries. Each row is one event:
-- admin authentication attempts, node and subscription mutations, subscription rotations and
-- deliveries (who pulled a token when). `detail_json` carries the event-specific facts; the
-- `kind` column is the stable filter for the management panel.
--
-- The log is a side channel: writing it must never fail a management operation, and the panel
-- only ever reads the most recent rows. Retention is enforced by a removal pass on read (`DELETE
-- < OLDEST` is run periodically alongside pruning) — see src/server/audit-log.ts.
CREATE TABLE audit_log (
  id TEXT PRIMARY KEY NOT NULL,
  kind TEXT NOT NULL,
  detail_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL
) STRICT;

CREATE INDEX audit_log_kind_idx ON audit_log(kind);
CREATE INDEX audit_log_created_idx ON audit_log(created_at);
