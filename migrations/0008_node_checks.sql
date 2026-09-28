-- Reachability probe results for nodes, written by the TCP dial check (see
-- src/server/node-check.ts and the 拨测 action in the nodes panel). Only the most recent outcome is
-- kept per node: history is the audit log's job, and a probe overwrites rather than appends.
ALTER TABLE nodes ADD COLUMN last_check_at TEXT;
ALTER TABLE nodes ADD COLUMN last_check_ok INTEGER;
ALTER TABLE nodes ADD COLUMN last_check_ms INTEGER;
