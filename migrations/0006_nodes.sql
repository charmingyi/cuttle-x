-- A dedicated nodes table for first-class node management. Each row is a single proxy node
-- that can be individually edited and referenced by subscriptions. This replaces the old
-- JSON-in-chunks pool approach with proper relational storage.
--
-- `credential_json` holds protocol-specific fields (password, uuid, cipher, etc.) that are
-- not part of the common schema. `extra_json` holds optional fields like `udp`, `tls`, `skip_cert_verify`,
-- `flow`, `network`, `ws_path`, `ws_host`, `reality_public_key`, etc. — anything that extends
-- the base CanonicalNode shape.
--
-- Existing pool subscriptions keep their chunk-based storage; this table is additive and does
-- not migrate existing data. The old pool system continues to work alongside the new.
CREATE TABLE nodes (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL CHECK (length(name) BETWEEN 1 AND 200),
  type TEXT NOT NULL,
  server TEXT NOT NULL CHECK (length(server) BETWEEN 1 AND 500),
  port INTEGER NOT NULL CHECK (port > 0 AND port < 65536),
  country TEXT,
  security TEXT,
  transport TEXT,
  credential_json TEXT NOT NULL DEFAULT '{}',
  extra_json TEXT NOT NULL DEFAULT '{}',
  sort_order INTEGER,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
) STRICT;

CREATE INDEX nodes_type_idx ON nodes(type);
CREATE INDEX nodes_country_idx ON nodes(country);
CREATE INDEX nodes_sort_order_idx ON nodes(sort_order);