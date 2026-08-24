ALTER TABLE subscriptions
  ADD COLUMN source_mode TEXT NOT NULL DEFAULT 'source'
  CHECK (source_mode IN ('source', 'pool'));
