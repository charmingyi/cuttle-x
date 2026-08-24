import { ConflictError } from "@/core/errors"
import type { TargetId } from "@/core/nodes"
import { hashToken } from "@/core/subscriptions"
import type {
  DeliveryArtifact,
  SubscriptionDeliveryRepository,
  SubscriptionPublishingRepository,
  SubscriptionRecord,
  SubscriptionSource,
  SubscriptionTokenProtector,
} from "@/core/subscriptions"
import {
  ARTIFACT_COLUMNS,
  artifactFromRow,
  LISTED_SUBSCRIPTION_COLUMNS,
  metadataFromRow,
  recordFromRow,
  sourceFromJson,
  SUBSCRIPTION_COLUMNS,
  summaryFromRow,
} from "./rows"
import type { ArtifactRow, ContentChunkRow, SubscriptionRow } from "./rows"
import { fromChunks, toChunks } from "./stored-content"

export class D1SubscriptionRepository
  implements SubscriptionPublishingRepository, SubscriptionDeliveryRepository
{
  constructor(
    private readonly database: D1Database,
    private readonly tokenProtector: SubscriptionTokenProtector,
  ) {}

  /**
   * The stored columns are constrained by the original schema (`source_type IN ('raw','remote')`,
   * `source_mode IN ('source','pool')`), so a collection — whose members live in its source JSON —
   * is stored like the local node data it resolves to; `is_collection` is what the summary reads.
   */
  private storedSourceType(source: SubscriptionSource): "raw" | "remote" {
    return source.type === "remote" ? "remote" : "raw"
  }

  private storedSourceMode(source: SubscriptionSource): "source" | "pool" {
    return source.type === "pool" || source.type === "collection" ? "pool" : "source"
  }

  private async source(subscriptionId: string) {
    let result: D1Result<ContentChunkRow>
    try {
      result = await this.database
        .prepare(
          `SELECT content FROM subscription_source_chunks
           WHERE subscription_id = ? ORDER BY chunk_index ASC`,
        )
        .bind(subscriptionId)
        .all<ContentChunkRow>()
    } catch (error) {
      throw new Error(`Unable to read source for subscription ${subscriptionId}.`, { cause: error })
    }
    if (result.results.length === 0) return null
    return fromChunks(result.results)
  }

  private async record(row: SubscriptionRow | null) {
    if (!row) return null
    return recordFromRow(row, (await this.source(row.id)) ?? "")
  }

  private sourceChunkStatements(subscriptionId: string, chunks: string[], guardVersion?: number) {
    return chunks.map((content, index) => {
      if (guardVersion === undefined) {
        return this.database
          .prepare(
            `INSERT INTO subscription_source_chunks (subscription_id, chunk_index, content) VALUES (?, ?, ?)`,
          )
          .bind(subscriptionId, index, content)
      }
      return this.database
        .prepare(
          `INSERT INTO subscription_source_chunks (subscription_id, chunk_index, content)
           SELECT ?, ?, ?
           WHERE EXISTS (
             SELECT 1 FROM subscriptions WHERE id = ? AND version = ?
           )`,
        )
        .bind(subscriptionId, index, content, subscriptionId, guardVersion)
    })
  }

  private sourceCleanupStatements(subscriptionId: string, chunks: string[], guardVersion?: number) {
    const guard =
      guardVersion === undefined
        ? ""
        : ` AND EXISTS (SELECT 1 FROM subscriptions WHERE id = ? AND version = ?)`
    const bindGuard = (statement: D1PreparedStatement) =>
      guardVersion === undefined
        ? statement.bind(subscriptionId)
        : statement.bind(subscriptionId, subscriptionId, guardVersion)
    return [
      bindGuard(
        this.database.prepare(
          `DELETE FROM subscription_source_chunks WHERE subscription_id = ?${guard}`,
        ),
      ),
      ...this.sourceChunkStatements(subscriptionId, chunks, guardVersion),
      bindGuard(
        this.database.prepare(`DELETE FROM compiled_artifacts WHERE subscription_id = ?${guard}`),
      ),
    ]
  }

  async findMetadataByToken(token: string) {
    const row = await this.database
      .prepare(`SELECT ${SUBSCRIPTION_COLUMNS} FROM subscriptions WHERE token_hash = ?`)
      .bind(await hashToken(token))
      .first<SubscriptionRow>()
    return row ? metadataFromRow(row) : null
  }

  async findSource(id: string) {
    const json = await this.source(id)
    return json ? sourceFromJson(id, json) : null
  }

  async findById(id: string) {
    const row = await this.database
      .prepare(`SELECT ${SUBSCRIPTION_COLUMNS} FROM subscriptions WHERE id = ?`)
      .bind(id)
      .first<SubscriptionRow>()
    return this.record(row)
  }

  async list() {
    const result = await this.database
      .prepare(
        `SELECT ${LISTED_SUBSCRIPTION_COLUMNS}, artifact.node_count
           FROM subscriptions AS subscription
           LEFT JOIN compiled_artifacts AS artifact
             ON artifact.subscription_id = subscription.id
            AND artifact.target = subscription.default_target
            AND artifact.subscription_version = subscription.version
          ORDER BY subscription.sort_order IS NULL, subscription.sort_order ASC, subscription.updated_at DESC`,
      )
      .all<SubscriptionRow>()
    return Promise.all(
      result.results.map(async (row) => {
        let linkAvailable = row.token_ciphertext !== null
        if (linkAvailable && row.token_ciphertext) {
          try {
            const token = await this.tokenProtector.recover(row.id, row.token_ciphertext)
            linkAvailable = (await hashToken(token)) === row.token_hash
          } catch {
            // A key rotation or damaged ciphertext should be shown as recoverable=false; the detail
            // surface still offers registration with the operator's existing full link.
            linkAvailable = false
          }
        }
        return summaryFromRow(row, linkAvailable)
      }),
    )
  }

  async create(subscription: SubscriptionRecord, token: string) {
    const [tokenHash, tokenCiphertext] = await Promise.all([
      hashToken(token),
      this.tokenProtector.protect(subscription.id, token),
    ])
    const chunks = toChunks(JSON.stringify(subscription.source))
    const sourceType = this.storedSourceType(subscription.source)
    const sourceMode = this.storedSourceMode(subscription.source)
    await this.database.batch([
      this.database
        .prepare(
          `INSERT INTO subscriptions (
            id, token_hash, token_hint, token_ciphertext, name, source_type, source_mode, default_target,
            processors_json, enabled, version, created_at, updated_at, last_success_at, last_error,
            folder, is_collection
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        )
        .bind(
          subscription.id,
          tokenHash,
          subscription.tokenHint,
          tokenCiphertext,
          subscription.name,
          sourceType,
          sourceMode,
          subscription.defaultTarget,
          subscription.processors ? JSON.stringify(subscription.processors) : null,
          subscription.enabled ? 1 : 0,
          subscription.version,
          subscription.createdAt,
          subscription.updatedAt,
          subscription.lastSuccessAt ?? null,
          subscription.lastError ?? null,
          subscription.folder ?? null,
          subscription.source.type === "collection" ? 1 : 0,
        ),
      ...this.sourceChunkStatements(subscription.id, chunks),
    ])
  }

  async update(subscription: SubscriptionRecord, expectedVersion?: number) {
    const exists = await this.database
      .prepare("SELECT id FROM subscriptions WHERE id = ?")
      .bind(subscription.id)
      .first<{ id: string }>()
    if (!exists) throw new Error(`Subscription ${subscription.id} disappeared during update.`)
    const chunks = toChunks(JSON.stringify(subscription.source))
    const sourceType = this.storedSourceType(subscription.source)
    const sourceMode = this.storedSourceMode(subscription.source)
    const update = this.database
      .prepare(
        `UPDATE subscriptions SET
           name = ?, source_type = ?, source_mode = ?, default_target = ?, processors_json = ?, enabled = ?,
           version = ?, updated_at = ?, last_error = ?, folder = ?, is_collection = ?
         WHERE id = ?${expectedVersion === undefined ? "" : " AND version = ?"}`,
      )
      .bind(
        subscription.name,
        sourceType,
        sourceMode,
        subscription.defaultTarget,
        subscription.processors ? JSON.stringify(subscription.processors) : null,
        subscription.enabled ? 1 : 0,
        subscription.version,
        subscription.updatedAt,
        subscription.lastError ?? null,
        subscription.folder ?? null,
        subscription.source.type === "collection" ? 1 : 0,
        subscription.id,
        ...(expectedVersion === undefined ? [] : [expectedVersion]),
      )
    if (expectedVersion === undefined) {
      await this.database.batch([update, ...this.sourceCleanupStatements(subscription.id, chunks)])
      return
    }
    const statements = this.sourceCleanupStatements(subscription.id, chunks, expectedVersion)
    const results = await this.database.batch([...statements, update])
    const result = results.at(-1)
    if (!result || result.meta.changes === 0) {
      throw new ConflictError(
        `Subscription ${subscription.id} changed while nodes were being appended.`,
      )
    }
  }

  async rotateToken(id: string, token: string, tokenHint: string, updatedAt: string) {
    const [tokenHash, tokenCiphertext] = await Promise.all([
      hashToken(token),
      this.tokenProtector.protect(id, token),
    ])
    const result = await this.database
      .prepare(
        `UPDATE subscriptions SET
           token_hash = ?, token_hint = ?, token_ciphertext = ?, updated_at = ?
         WHERE id = ?`,
      )
      .bind(tokenHash, tokenHint, tokenCiphertext, updatedAt, id)
      .run()
    return result.meta.changes > 0
  }

  async recoverToken(id: string) {
    const row = await this.database
      .prepare("SELECT token_hash, token_ciphertext FROM subscriptions WHERE id = ?")
      .bind(id)
      .first<{ token_hash: string; token_ciphertext: string | null }>()
    if (!row?.token_ciphertext) return null
    const token = await this.tokenProtector.recover(id, row.token_ciphertext)
    // Treat a ciphertext/hash mismatch as unavailable rather than returning a URL that cannot be
    // delivered. This also keeps a stale or manually corrupted ciphertext from becoming a second
    // lookup credential.
    return (await hashToken(token)) === row.token_hash ? token : null
  }

  async registerToken(id: string, token: string) {
    const row = await this.database
      .prepare("SELECT token_hash FROM subscriptions WHERE id = ?")
      .bind(id)
      .first<{ token_hash: string }>()
    if (!row || row.token_hash !== (await hashToken(token))) return false
    const result = await this.database
      .prepare("UPDATE subscriptions SET token_ciphertext = ? WHERE id = ? AND token_hash = ?")
      .bind(await this.tokenProtector.protect(id, token), id, row.token_hash)
      .run()
    return result.meta.changes > 0
  }

  async delete(id: string) {
    const result = await this.database
      .prepare("DELETE FROM subscriptions WHERE id = ?")
      .bind(id)
      .run()
    return result.meta.changes > 0
  }

  async reorder(orderedIds: string[]) {
    await this.database.batch(
      orderedIds.map((id, index) =>
        this.database
          .prepare("UPDATE subscriptions SET sort_order = ? WHERE id = ?")
          .bind(index, id),
      ),
    )
  }

  async findArtifact(subscriptionId: string, target: TargetId) {
    const row = await this.database
      .prepare(
        `SELECT ${ARTIFACT_COLUMNS} FROM compiled_artifacts WHERE subscription_id = ? AND target = ?`,
      )
      .bind(subscriptionId, target)
      .first<ArtifactRow>()
    return row ? artifactFromRow(row) : null
  }

  async readArtifact(subscriptionId: string, target: TargetId) {
    const [row, chunks] = await this.database.batch([
      this.database
        .prepare(
          `SELECT ${ARTIFACT_COLUMNS} FROM compiled_artifacts WHERE subscription_id = ? AND target = ?`,
        )
        .bind(subscriptionId, target),
      this.database
        .prepare(
          `SELECT content FROM compiled_artifact_chunks
           WHERE subscription_id = ? AND target = ? ORDER BY chunk_index ASC`,
        )
        .bind(subscriptionId, target),
    ])
    const artifactRow = (row.results as ArtifactRow[])[0]
    const contentRows = chunks.results as ContentChunkRow[]
    if (!artifactRow) return null
    // Metadata without body rows is an inconsistent cache entry; rebuilding is the recovery.
    if (contentRows.length === 0) {
      console.warn("Artifact cache has no body chunks; rebuilding", { subscriptionId, target })
      return null
    }
    return { ...artifactFromRow(artifactRow), content: fromChunks(contentRows) }
  }

  async saveArtifactIfCurrent(artifact: DeliveryArtifact, successAt: string) {
    const chunks = toChunks(artifact.content)
    await this.database.batch([
      this.database
        .prepare(
          `INSERT INTO compiled_artifacts (
             subscription_id, target, subscription_version, etag,
             node_count, response_headers_json, created_at
           )
           SELECT ?, ?, ?, ?, ?, ?, ?
           FROM subscriptions
           WHERE id = ? AND version = ?
           ON CONFLICT(subscription_id, target) DO UPDATE SET
             subscription_version = excluded.subscription_version,
             etag = excluded.etag,
             node_count = excluded.node_count,
             response_headers_json = excluded.response_headers_json,
             created_at = excluded.created_at`,
        )
        .bind(
          artifact.subscriptionId,
          artifact.target,
          artifact.subscriptionVersion,
          artifact.etag,
          artifact.nodeCount,
          JSON.stringify(artifact.responseHeaders),
          artifact.createdAt,
          artifact.subscriptionId,
          artifact.subscriptionVersion,
        ),
      this.database
        .prepare(
          `DELETE FROM compiled_artifact_chunks
           WHERE subscription_id = ? AND target = ?
             AND EXISTS (
               SELECT 1 FROM compiled_artifacts
               WHERE subscription_id = ? AND target = ? AND subscription_version = ?
             )`,
        )
        .bind(
          artifact.subscriptionId,
          artifact.target,
          artifact.subscriptionId,
          artifact.target,
          artifact.subscriptionVersion,
        ),
      ...chunks.map((content, index) =>
        this.database
          .prepare(
            `INSERT INTO compiled_artifact_chunks (subscription_id, target, chunk_index, content)
             SELECT ?, ?, ?, ?
             WHERE EXISTS (
               SELECT 1 FROM compiled_artifacts
               WHERE subscription_id = ? AND target = ? AND subscription_version = ?
             )`,
          )
          .bind(
            artifact.subscriptionId,
            artifact.target,
            index,
            content,
            artifact.subscriptionId,
            artifact.target,
            artifact.subscriptionVersion,
          ),
      ),
      this.database
        .prepare(
          `UPDATE subscriptions SET last_success_at = ?, last_error = NULL
           WHERE id = ? AND version = ?`,
        )
        .bind(successAt, artifact.subscriptionId, artifact.subscriptionVersion),
    ])
  }

  async recordDelivery(
    id: string,
    version: number,
    result: { successAt?: string; error?: string },
  ) {
    await this.database
      .prepare(
        `UPDATE subscriptions SET
           last_success_at = COALESCE(?, last_success_at), last_error = ?
         WHERE id = ? AND version = ?`,
      )
      .bind(result.successAt ?? null, result.error ?? null, id, version)
      .run()
  }
}
