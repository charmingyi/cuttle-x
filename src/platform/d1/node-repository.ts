import { nodeFromForm, nodeToForm } from "@/core/nodes/entity"
import type { NodeEntity, NodeFormData, NodeRepository } from "@/core/nodes/entity"

interface NodeRow {
  id: string
  name: string
  type: string
  server: string
  port: number
  country: string | null
  security: string | null
  transport: string | null
  credential_json: string
  extra_json: string
  sort_order: number | null
  created_at: string
  updated_at: string
}

const NODE_COLUMNS = `id, name, type, server, port, country, security, transport,
  credential_json, extra_json, sort_order, created_at, updated_at`

function rowToNode(row: NodeRow): NodeEntity {
  return {
    id: row.id,
    name: row.name,
    type: row.type,
    server: row.server,
    port: row.port,
    country: row.country ?? null,
    security: (row.security as NodeEntity["security"]) ?? null,
    transport: (row.transport as NodeEntity["transport"]) ?? null,
    credentialJson: row.credential_json,
    extraJson: row.extra_json,
    sortOrder: row.sort_order ?? null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export function createNodeRepository(db: D1Database): NodeRepository {
  async function list(): Promise<NodeEntity[]> {
    const { results } = await db
      .prepare(`SELECT ${NODE_COLUMNS} FROM nodes ORDER BY sort_order ASC, created_at ASC`)
      .all<NodeRow>()
    return results.map((r) => rowToNode(r))
  }

  async function findById(id: string): Promise<NodeEntity | null> {
    const row = await db
      .prepare(`SELECT ${NODE_COLUMNS} FROM nodes WHERE id = ?`)
      .bind(id)
      .first<NodeRow>()
    return row ? rowToNode(row) : null
  }

  async function findByIds(ids: string[]): Promise<NodeEntity[]> {
    if (ids.length === 0) return []
    const placeholders = ids.map(() => "?").join(",")
    const { results } = await db
      .prepare(`SELECT ${NODE_COLUMNS} FROM nodes WHERE id IN (${placeholders})`)
      .bind(...ids)
      .all<NodeRow>()
    return results.map((r) => rowToNode(r))
  }

  async function create(data: NodeFormData): Promise<NodeEntity> {
    const id = crypto.randomUUID()
    const now = new Date().toISOString()
    const entity = nodeFromForm(id, data, now)
    await db
      .prepare(
        `INSERT INTO nodes (id, name, type, server, port, country, security, transport,
          credential_json, extra_json, sort_order, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(
        entity.id,
        entity.name,
        entity.type,
        entity.server,
        entity.port,
        entity.country ?? null,
        entity.security ?? null,
        entity.transport ?? null,
        entity.credentialJson,
        entity.extraJson,
        entity.sortOrder ?? null,
        entity.createdAt,
        entity.updatedAt,
      )
      .run()
    return entity
  }

  async function update(id: string, data: Partial<NodeFormData>): Promise<NodeEntity | null> {
    const existing = await findById(id)
    if (!existing) return null

    const now = new Date().toISOString()
    // Spread existing through nodeToForm to preserve credentials/extra from parsed JSON columns
    const merged = nodeFromForm(id, { ...nodeToForm(existing), ...data }, now)

    await db
      .prepare(
        `UPDATE nodes SET name=?, type=?, server=?, port=?, country=?, security=?, transport=?,
          credential_json=?, extra_json=?, sort_order=?, updated_at=?
         WHERE id=?`,
      )
      .bind(
        merged.name,
        merged.type,
        merged.server,
        merged.port,
        merged.country ?? null,
        merged.security ?? null,
        merged.transport ?? null,
        merged.credentialJson,
        merged.extraJson,
        merged.sortOrder ?? null,
        merged.updatedAt,
        merged.id,
      )
      .run()
    return merged
  }

  async function deleteById(id: string): Promise<boolean> {
    const result = await db.prepare(`DELETE FROM nodes WHERE id = ?`).bind(id).run()
    return result.meta.changes > 0
  }

  async function deleteMany(ids: string[]): Promise<number> {
    if (ids.length === 0) return 0
    const placeholders = ids.map(() => "?").join(",")
    const result = await db
      .prepare(`DELETE FROM nodes WHERE id IN (${placeholders})`)
      .bind(...ids)
      .run()
    return result.meta.changes ?? 0
  }

  async function createMany(items: NodeFormData[]): Promise<NodeEntity[]> {
    if (items.length === 0) return []
    const now = new Date().toISOString()
    const entities = items.map((d) => nodeFromForm(crypto.randomUUID(), d, now))
    const stmt = db.prepare(
      `INSERT INTO nodes (id, name, type, server, port, country, security, transport,
        credential_json, extra_json, sort_order, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    // D1 batch limit is 100 statements per call
    const BATCH_LIMIT = 100
    const stmts = entities.map((e) =>
      stmt.bind(
        e.id,
        e.name,
        e.type,
        e.server,
        e.port,
        e.country ?? null,
        e.security ?? null,
        e.transport ?? null,
        e.credentialJson,
        e.extraJson,
        e.sortOrder ?? null,
        e.createdAt,
        e.updatedAt,
      ),
    )
    const chunks = []
    for (let i = 0; i < stmts.length; i += BATCH_LIMIT) {
      chunks.push(stmts.slice(i, i + BATCH_LIMIT))
    }
    await Promise.all(chunks.map((c) => db.batch(c)))
    return entities
  }

  async function reorder(ids: string[]): Promise<void> {
    const stmt = db.prepare(`UPDATE nodes SET sort_order = ?, updated_at = ? WHERE id = ?`)
    const now = new Date().toISOString()
    const batch = ids.map((id, idx) => stmt.bind(idx, now, id))
    await db.batch(batch)
  }

  return { list, findById, findByIds, create, update, deleteById, deleteMany, createMany, reorder }
}
