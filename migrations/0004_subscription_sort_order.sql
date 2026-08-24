-- Additive and nullable: the subscription manager's list position. NULL keeps the historical
-- `updated_at DESC` ordering; an explicit value pins the subscription to that position, and the
-- list reads pinned entries first. Existing rows are untouched and keep their previous order.
ALTER TABLE subscriptions
  ADD COLUMN sort_order INTEGER;
