-- Additive and nullable. `folder` is the optional folder/group a subscription belongs to; `is_collection`
-- marks a row whose nodes are aggregated from selected persistent pool subscriptions into its own fixed
-- `/subscribe/<token>` URL. Existing rows are untouched: `folder` stays NULL and `is_collection` stays 0,
-- so nothing about previously stored subscriptions changes and the delivery path keeps working unchanged.
ALTER TABLE subscriptions
  ADD COLUMN folder TEXT;

ALTER TABLE subscriptions
  ADD COLUMN is_collection INTEGER NOT NULL DEFAULT 0
  CHECK (is_collection IN (0, 1));
