import { env } from "cloudflare:workers"
import { t as resolvePublicHostname } from "./dns-BzGx_aCN.js"
import {
  a as TARGET_IDS,
  g as ValidationError,
  h as ConflictError,
  o as targetDefinition,
  x as AdminFailure,
} from "./nodes-b2qYjNQG.js"
import {
  a as isPlausibleToken,
  c as parseSubscriptionMetadata,
  i as hashToken,
  l as parseSubscriptionSource,
  r as SubscriptionDelivery,
  t as SubscriptionPublishing,
} from "./subscriptions-D1og5ExQ.js"
//#region src/server/subscription-origin.ts
/**
 * Subscription links must be independent of the management request's path and, when configured, of
 * the hostname through which the operator happened to open the panel. The request origin remains a
 * safe local/development fallback; production should set CUTTLE_PUBLIC_ORIGIN to the canonical host.
 */
function subscriptionPublicOrigin(requestUrl) {
  const configured = env.CUTTLE_PUBLIC_ORIGIN?.trim()
  if (configured)
    try {
      const url = new URL(configured)
      if (!["http:", "https:"].includes(url.protocol) || !url.hostname)
        throw new Error("unsupported public origin")
      return url.origin
    } catch {
      throw new Error("CUTTLE_PUBLIC_ORIGIN must be an absolute HTTP(S) URL.")
    }
  return new URL(requestUrl).origin
}
//#endregion
//#region src/platform/d1/rows.ts
const SUBSCRIPTION_COLUMNS = `
  id, token_hash, token_hint, token_ciphertext, name, source_type, source_mode, default_target, processors_json,
  enabled, version, created_at, updated_at, last_success_at, last_error, sort_order, folder, is_collection
`
/**
 * Named rather than `SELECT *`, for the reason the subscription columns are: `ArtifactRow` is a
 * claim about what a row holds, and a column added by a later migration would quietly widen every
 * row this reads — including the one handed to `artifactFromRow`, which is stored and served.
 */
const ARTIFACT_COLUMNS = `
  subscription_id, target, subscription_version, etag, node_count, response_headers_json, created_at
`
const LISTED_SUBSCRIPTION_COLUMNS = SUBSCRIPTION_COLUMNS.split(",")
  .map((column) => `subscription.${column.trim()}`)
  .join(", ")
function unreadable(subscriptionId, read) {
  try {
    return read()
  } catch (error) {
    throw new Error(`Unable to parse stored subscription ${subscriptionId}.`, { cause: error })
  }
}
function recordFromRow(row, sourceJson) {
  return {
    ...metadataFromRow(row),
    source: sourceFromJson(row.id, sourceJson),
  }
}
function metadataFromRow(row) {
  return {
    ...unreadable(row.id, () =>
      parseSubscriptionMetadata({
        name: row.name,
        folder: row.folder ?? void 0,
        defaultTarget: row.default_target,
        processors: row.processors_json ? JSON.parse(row.processors_json) : void 0,
        enabled: row.enabled === 1,
      }),
    ),
    id: row.id,
    tokenHint: row.token_hint,
    version: row.version,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    lastSuccessAt: row.last_success_at ?? void 0,
    lastError: row.last_error ?? void 0,
  }
}
function sourceFromJson(subscriptionId, sourceJson) {
  return unreadable(subscriptionId, () => parseSubscriptionSource(JSON.parse(sourceJson)))
}
function summaryFromRow(row, linkAvailable = row.token_ciphertext !== null) {
  let processorCount = 0
  try {
    const processors = row.processors_json ? JSON.parse(row.processors_json) : []
    processorCount = Array.isArray(processors) ? processors.length : 0
  } catch {
    processorCount = 0
  }
  return {
    id: row.id,
    tokenHint: row.token_hint,
    name: row.name,
    folder: row.folder ?? void 0,
    sourceType:
      row.is_collection === 1
        ? "collection"
        : row.source_mode === "pool"
          ? "pool"
          : row.source_type,
    defaultTarget: row.default_target,
    enabled: row.enabled === 1,
    version: row.version,
    processorCount,
    linkAvailable,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    lastSuccessAt: row.last_success_at ?? void 0,
    lastError: row.last_error ?? void 0,
    sortOrder: row.sort_order ?? void 0,
    nodeCount: row.node_count ?? void 0,
  }
}
function artifactFromRow(row) {
  const target = targetDefinition(row.target)
  return {
    subscriptionId: row.subscription_id,
    target: target.id,
    subscriptionVersion: row.subscription_version,
    etag: row.etag,
    nodeCount: row.node_count,
    responseHeaders: JSON.parse(row.response_headers_json),
    createdAt: row.created_at,
  }
}
//#endregion
//#region src/platform/d1/stored-content.ts
/** D1 holds a value per row comfortably at this size; longer content is split across rows. */
const CHUNK_SIZE = 131072
/** The rows a value becomes, in the order they must be written and read back. */
function toChunks(value) {
  const output = []
  let offset = 0
  while (offset < value.length) {
    let end = Math.min(offset + CHUNK_SIZE, value.length)
    const last = value.charCodeAt(end - 1)
    if (end < value.length && last >= 55296 && last <= 56319) end -= 1
    output.push(value.slice(offset, end))
    offset = end
  }
  return output.length > 0 ? output : [""]
}
/** The value a set of rows was written from. Rows must already be in `chunk_index` order. */
function fromChunks(rows) {
  return rows.map((row) => row.content).join("")
}
//#endregion
//#region src/platform/d1/subscription-repository.ts
const D1SubscriptionRepository = class {
  database
  tokenProtector
  constructor(database, tokenProtector) {
    this.database = database
    this.tokenProtector = tokenProtector
  }
  /**
   * The stored columns are constrained by the original schema (`source_type IN ('raw','remote')`,
   * `source_mode IN ('source','pool')`), so a collection — whose members live in its source JSON —
   * is stored like the local node data it resolves to; `is_collection` is what the summary reads.
   */
  storedSourceType(source) {
    return source.type === "remote" ? "remote" : "raw"
  }
  storedSourceMode(source) {
    return source.type === "pool" || source.type === "collection" ? "pool" : "source"
  }
  async source(subscriptionId) {
    let result
    try {
      result = await this.database
        .prepare(`SELECT content FROM subscription_source_chunks
           WHERE subscription_id = ? ORDER BY chunk_index ASC`)
        .bind(subscriptionId)
        .all()
    } catch (error) {
      throw new Error(`Unable to read source for subscription ${subscriptionId}.`, { cause: error })
    }
    if (result.results.length === 0) return null
    return fromChunks(result.results)
  }
  async record(row) {
    if (!row) return null
    return recordFromRow(row, (await this.source(row.id)) ?? "")
  }
  sourceChunkStatements(subscriptionId, chunks, guardVersion) {
    return chunks.map((content, index) => {
      if (guardVersion === void 0)
        return this.database
          .prepare(
            `INSERT INTO subscription_source_chunks (subscription_id, chunk_index, content) VALUES (?, ?, ?)`,
          )
          .bind(subscriptionId, index, content)
      return this.database
        .prepare(`INSERT INTO subscription_source_chunks (subscription_id, chunk_index, content)
           SELECT ?, ?, ?
           WHERE EXISTS (
             SELECT 1 FROM subscriptions WHERE id = ? AND version = ?
           )`)
        .bind(subscriptionId, index, content, subscriptionId, guardVersion)
    })
  }
  sourceCleanupStatements(subscriptionId, chunks, guardVersion) {
    const guard =
      guardVersion === void 0
        ? ""
        : ` AND EXISTS (SELECT 1 FROM subscriptions WHERE id = ? AND version = ?)`
    const bindGuard = (statement) =>
      guardVersion === void 0
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
  async findMetadataByToken(token) {
    const row = await this.database
      .prepare(`SELECT ${SUBSCRIPTION_COLUMNS} FROM subscriptions WHERE token_hash = ?`)
      .bind(await hashToken(token))
      .first()
    return row ? metadataFromRow(row) : null
  }
  async findSource(id) {
    const json = await this.source(id)
    return json ? sourceFromJson(id, json) : null
  }
  async findById(id) {
    const row = await this.database
      .prepare(`SELECT ${SUBSCRIPTION_COLUMNS} FROM subscriptions WHERE id = ?`)
      .bind(id)
      .first()
    return this.record(row)
  }
  async list() {
    const result = await this.database
      .prepare(`SELECT ${LISTED_SUBSCRIPTION_COLUMNS}, artifact.node_count
           FROM subscriptions AS subscription
           LEFT JOIN compiled_artifacts AS artifact
             ON artifact.subscription_id = subscription.id
            AND artifact.target = subscription.default_target
            AND artifact.subscription_version = subscription.version
          ORDER BY subscription.sort_order IS NULL, subscription.sort_order ASC, subscription.updated_at DESC`)
      .all()
    return Promise.all(
      result.results.map(async (row) => {
        let linkAvailable = row.token_ciphertext !== null
        if (linkAvailable && row.token_ciphertext)
          try {
            const token = await this.tokenProtector.recover(row.id, row.token_ciphertext)
            linkAvailable = (await hashToken(token)) === row.token_hash
          } catch {
            linkAvailable = false
          }
        return summaryFromRow(row, linkAvailable)
      }),
    )
  }
  async create(subscription, token) {
    const [tokenHash, tokenCiphertext] = await Promise.all([
      hashToken(token),
      this.tokenProtector.protect(subscription.id, token),
    ])
    const chunks = toChunks(JSON.stringify(subscription.source))
    const sourceType = this.storedSourceType(subscription.source)
    const sourceMode = this.storedSourceMode(subscription.source)
    await this.database.batch([
      this.database
        .prepare(`INSERT INTO subscriptions (
            id, token_hash, token_hint, token_ciphertext, name, source_type, source_mode, default_target,
            processors_json, enabled, version, created_at, updated_at, last_success_at, last_error,
            folder, is_collection
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
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
  async update(subscription, expectedVersion) {
    if (
      !(await this.database
        .prepare("SELECT id FROM subscriptions WHERE id = ?")
        .bind(subscription.id)
        .first())
    )
      throw new Error(`Subscription ${subscription.id} disappeared during update.`)
    const chunks = toChunks(JSON.stringify(subscription.source))
    const sourceType = this.storedSourceType(subscription.source)
    const sourceMode = this.storedSourceMode(subscription.source)
    const update = this.database
      .prepare(`UPDATE subscriptions SET
           name = ?, source_type = ?, source_mode = ?, default_target = ?, processors_json = ?, enabled = ?,
           version = ?, updated_at = ?, last_error = ?, folder = ?, is_collection = ?
         WHERE id = ?${expectedVersion === void 0 ? "" : " AND version = ?"}`)
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
        ...(expectedVersion === void 0 ? [] : [expectedVersion]),
      )
    if (expectedVersion === void 0) {
      await this.database.batch([update, ...this.sourceCleanupStatements(subscription.id, chunks)])
      return
    }
    const statements = this.sourceCleanupStatements(subscription.id, chunks, expectedVersion)
    const result = (await this.database.batch([...statements, update])).at(-1)
    if (!result || result.meta.changes === 0)
      throw new ConflictError(
        `Subscription ${subscription.id} changed while nodes were being appended.`,
      )
  }
  async rotateToken(id, token, tokenHint, updatedAt) {
    const [tokenHash, tokenCiphertext] = await Promise.all([
      hashToken(token),
      this.tokenProtector.protect(id, token),
    ])
    return (
      (
        await this.database
          .prepare(`UPDATE subscriptions SET
           token_hash = ?, token_hint = ?, token_ciphertext = ?, updated_at = ?
         WHERE id = ?`)
          .bind(tokenHash, tokenHint, tokenCiphertext, updatedAt, id)
          .run()
      ).meta.changes > 0
    )
  }
  async recoverToken(id) {
    const row = await this.database
      .prepare("SELECT token_hash, token_ciphertext FROM subscriptions WHERE id = ?")
      .bind(id)
      .first()
    if (!row?.token_ciphertext) return null
    const token = await this.tokenProtector.recover(id, row.token_ciphertext)
    return (await hashToken(token)) === row.token_hash ? token : null
  }
  async registerToken(id, token) {
    const row = await this.database
      .prepare("SELECT token_hash FROM subscriptions WHERE id = ?")
      .bind(id)
      .first()
    if (!row || row.token_hash !== (await hashToken(token))) return false
    return (
      (
        await this.database
          .prepare("UPDATE subscriptions SET token_ciphertext = ? WHERE id = ? AND token_hash = ?")
          .bind(await this.tokenProtector.protect(id, token), id, row.token_hash)
          .run()
      ).meta.changes > 0
    )
  }
  async delete(id) {
    return (
      (await this.database.prepare("DELETE FROM subscriptions WHERE id = ?").bind(id).run()).meta
        .changes > 0
    )
  }
  async reorder(orderedIds) {
    await this.database.batch(
      orderedIds.map((id, index) =>
        this.database
          .prepare("UPDATE subscriptions SET sort_order = ? WHERE id = ?")
          .bind(index, id),
      ),
    )
  }
  async findArtifact(subscriptionId, target) {
    const row = await this.database
      .prepare(
        `SELECT ${ARTIFACT_COLUMNS} FROM compiled_artifacts WHERE subscription_id = ? AND target = ?`,
      )
      .bind(subscriptionId, target)
      .first()
    return row ? artifactFromRow(row) : null
  }
  async readArtifact(subscriptionId, target) {
    const [row, chunks] = await this.database.batch([
      this.database
        .prepare(
          `SELECT ${ARTIFACT_COLUMNS} FROM compiled_artifacts WHERE subscription_id = ? AND target = ?`,
        )
        .bind(subscriptionId, target),
      this.database
        .prepare(`SELECT content FROM compiled_artifact_chunks
           WHERE subscription_id = ? AND target = ? ORDER BY chunk_index ASC`)
        .bind(subscriptionId, target),
    ])
    const artifactRow = row.results[0]
    const contentRows = chunks.results
    if (!artifactRow) return null
    if (contentRows.length === 0) {
      console.warn("Artifact cache has no body chunks; rebuilding", {
        subscriptionId,
        target,
      })
      return null
    }
    return {
      ...artifactFromRow(artifactRow),
      content: fromChunks(contentRows),
    }
  }
  async saveArtifactIfCurrent(artifact, successAt) {
    const chunks = toChunks(artifact.content)
    await this.database.batch([
      this.database
        .prepare(`INSERT INTO compiled_artifacts (
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
             created_at = excluded.created_at`)
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
        .prepare(`DELETE FROM compiled_artifact_chunks
           WHERE subscription_id = ? AND target = ?
             AND EXISTS (
               SELECT 1 FROM compiled_artifacts
               WHERE subscription_id = ? AND target = ? AND subscription_version = ?
             )`)
        .bind(
          artifact.subscriptionId,
          artifact.target,
          artifact.subscriptionId,
          artifact.target,
          artifact.subscriptionVersion,
        ),
      ...chunks.map((content, index) =>
        this.database
          .prepare(`INSERT INTO compiled_artifact_chunks (subscription_id, target, chunk_index, content)
             SELECT ?, ?, ?, ?
             WHERE EXISTS (
               SELECT 1 FROM compiled_artifacts
               WHERE subscription_id = ? AND target = ? AND subscription_version = ?
             )`)
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
        .prepare(`UPDATE subscriptions SET last_success_at = ?, last_error = NULL
           WHERE id = ? AND version = ?`)
        .bind(successAt, artifact.subscriptionId, artifact.subscriptionVersion),
    ])
  }
  async recordDelivery(id, version, result) {
    await this.database
      .prepare(`UPDATE subscriptions SET
           last_success_at = COALESCE(?, last_success_at), last_error = ?
         WHERE id = ? AND version = ?`)
      .bind(result.successAt ?? null, result.error ?? null, id, version)
      .run()
  }
}
//#endregion
//#region src/server/subscription-token-protector.ts
const encoder = new TextEncoder()
const decoder = new TextDecoder()
const VERSION = "v1"
function base64Url(bytes) {
  let binary = ""
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "")
}
function fromBase64Url(value) {
  if (!/^[A-Za-z0-9_-]+$/.test(value) || value.length % 4 === 1)
    throw new Error("Stored subscription token has invalid encoding.")
  const encoded = value.replaceAll("-", "+").replaceAll("_", "/")
  const padded = encoded.padEnd(Math.ceil(encoded.length / 4) * 4, "=")
  try {
    const binary = atob(padded)
    return Uint8Array.from(binary, (character) => character.charCodeAt(0))
  } catch (error) {
    throw new Error("Stored subscription token has invalid encoding.", { cause: error })
  }
}
async function encryptionKey(secret) {
  const normalized = secret.trim()
  if (encoder.encode(normalized).byteLength < 32)
    throw new Error("CUTTLE_LINK_KEY must contain at least 32 bytes.")
  const material = encoder.encode(`cuttle-subscription-link-v1\0${normalized}`)
  const digest = await crypto.subtle.digest("SHA-256", material)
  return crypto.subtle.importKey("raw", digest, { name: "AES-GCM" }, false, ["encrypt", "decrypt"])
}
/**
 * Protects the recoverable copy of a subscription token. Its SHA-256 digest remains the lookup key;
 * this ciphertext exists only so an authenticated single-user manager can copy the same fixed URL
 * again after a reload. The subscription id is authenticated as AAD, so ciphertext cannot be moved
 * between rows.
 */
const AesSubscriptionTokenProtector = class {
  secret
  constructor(secret) {
    this.secret = secret
  }
  async protect(subscriptionId, token) {
    const iv = crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(12))
    const ciphertext = await crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv,
        additionalData: encoder.encode(subscriptionId),
      },
      await encryptionKey(this.secret),
      encoder.encode(token),
    )
    return `${VERSION}.${base64Url(iv)}.${base64Url(new Uint8Array(ciphertext))}`
  }
  async recover(subscriptionId, protectedToken) {
    const [version, encodedIv, encodedCiphertext, extra] = protectedToken.split(".")
    if (version !== VERSION || !encodedIv || !encodedCiphertext || extra !== void 0)
      throw new Error("Stored subscription token has an unsupported format.")
    const iv = fromBase64Url(encodedIv)
    if (iv.byteLength !== 12) throw new Error("Stored subscription token has an invalid nonce.")
    const plaintext = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv,
        additionalData: encoder.encode(subscriptionId),
      },
      await encryptionKey(this.secret),
      fromBase64Url(encodedCiphertext),
    )
    return decoder.decode(plaintext)
  }
}
//#endregion
//#region src/server/subscription-services.ts
function repository() {
  return new D1SubscriptionRepository(
    env.DB,
    new AesSubscriptionTokenProtector(env.CUTTLE_LINK_KEY),
  )
}
function subscriptionPublishing() {
  return new SubscriptionPublishing(repository())
}
function subscriptionDelivery() {
  return new SubscriptionDelivery(repository(), { resolveHost: resolvePublicHostname })
}
//#endregion
//#region src/features/subscriptions/api/operations.ts
async function listSubscriptions() {
  return { subscriptions: await subscriptionPublishing().list() }
}
/**
 * The collection's order is one write, not per-row writes: `orderedIds` must be a full permutation
 * of the current ids, and anything else is refused so a stale client can never scramble the list.
 * Answers `null` (204) on success; the request body is `{ ids: string[] }` on both channels.
 */
async function reorderSubscriptions({ ids }) {
  if (!Array.isArray(ids) || ids.some((id) => typeof id !== "string"))
    throw new AdminFailure("invalid_request", "订阅顺序必须是订阅 ID 列表。")
  if (!(await subscriptionPublishing().reorder(ids)))
    throw new AdminFailure("invalid_request", "订阅列表已变化，请刷新后重试。")
}
async function getSubscription({ id }) {
  const subscription = await subscriptionPublishing().get(id)
  if (!subscription) throw new AdminFailure("not_found", "Subscription not found.")
  return { subscription }
}
function subscriptionUrl(token, origin) {
  return new URL(`/subscribe/${token}`, subscriptionPublicOrigin(origin)).toString()
}
function tokenFromLink(input) {
  if (typeof input !== "string") throw new AdminFailure("invalid_request", "订阅地址必须是文本。")
  const candidate = input.trim()
  if (!candidate) throw new AdminFailure("invalid_request", "订阅地址不能为空。")
  if (isPlausibleToken(candidate) && !candidate.includes("/")) return candidate
  let url
  try {
    url = new URL(candidate)
  } catch (error) {
    throw new AdminFailure("invalid_request", "订阅地址格式无效。", { cause: error })
  }
  const matched = /^\/subscribe\/([^/]+)$/.exec(url.pathname)
  let token = ""
  try {
    token = matched ? decodeURIComponent(matched[1]) : ""
  } catch (error) {
    throw new AdminFailure("invalid_request", "订阅地址格式无效。", { cause: error })
  }
  if (!isPlausibleToken(token) || token.includes("/"))
    throw new AdminFailure("invalid_request", "这不是有效的 Cuttle 订阅地址。")
  return token
}
async function getSubscriptionLink({ id, origin }) {
  if (!(await subscriptionPublishing().get(id)))
    throw new AdminFailure("not_found", "Subscription not found.")
  try {
    const token = await subscriptionPublishing().recoverToken(id)
    return token
      ? {
          available: true,
          url: subscriptionUrl(token, origin),
        }
      : { available: false }
  } catch (error) {
    console.warn("Unable to recover subscription link", {
      subscriptionId: id,
      error,
    })
    return { available: false }
  }
}
async function registerSubscriptionLink({ id, link, origin }) {
  const token = tokenFromLink(link)
  const registered = await subscriptionPublishing().registerToken(id, token)
  if (registered === null) throw new AdminFailure("not_found", "Subscription not found.")
  if (!registered) throw new AdminFailure("invalid_request", "订阅地址与这条订阅不匹配。")
  return {
    available: true,
    url: subscriptionUrl(token, origin),
  }
}
async function createSubscription({ draft, origin }) {
  try {
    const { token, ...subscription } = await subscriptionPublishing().publish(draft)
    return {
      subscription,
      token,
      url: subscriptionUrl(token, origin),
    }
  } catch (error) {
    if (error instanceof ValidationError)
      throw new AdminFailure("invalid_definition", error.message, { cause: error })
    throw error
  }
}
async function appendSubscriptionNodes({ id, content }) {
  try {
    if (typeof content === "string" && new TextEncoder().encode(content).byteLength > 2097152)
      throw new AdminFailure("payload_too_large", "追加内容不能超过 2 MiB。")
    const result = await subscriptionPublishing().appendNodes(id, content)
    if (!result) throw new AdminFailure("not_found", "Subscription not found.")
    return {
      added: result.added,
      skipped: result.skipped,
      subscription: {
        id: result.subscription.id,
        version: result.subscription.version,
        defaultTarget: result.subscription.defaultTarget,
      },
    }
  } catch (error) {
    if (error instanceof ConflictError)
      throw new AdminFailure("conflict", "订阅刚被修改，请重试。", { cause: error })
    if (error instanceof ValidationError)
      throw new AdminFailure("invalid_definition", error.message, { cause: error })
    throw error
  }
}
async function updateSubscription({ id, patch }) {
  try {
    const subscription = await subscriptionPublishing().update(id, patch)
    if (!subscription) throw new AdminFailure("not_found", "Subscription not found.")
    return { subscription }
  } catch (error) {
    if (error instanceof ConflictError)
      throw new AdminFailure("conflict", "订阅刚被修改，请重试。", { cause: error })
    if (error instanceof ValidationError)
      throw new AdminFailure("invalid_definition", error.message, { cause: error })
    throw error
  }
}
async function readSubscriptionSnapshot({ id, target }) {
  if (!TARGET_IDS.includes(target))
    throw new AdminFailure("invalid_request", `Unsupported client: ${target}`)
  const artifact = await subscriptionDelivery().readSnapshot(id, target)
  if (!artifact) return { snapshot: null }
  return {
    snapshot: {
      content: artifact.content,
      nodeCount: artifact.nodeCount,
      subscriptionVersion: artifact.subscriptionVersion,
    },
  }
}
async function removeSubscription({ id }) {
  if (!(await subscriptionPublishing().revoke(id)))
    throw new AdminFailure("not_found", "Subscription not found.")
}
async function rotateSubscriptionToken({ id, origin }) {
  const rotated = await subscriptionPublishing().rotateToken(id)
  if (!rotated) throw new AdminFailure("not_found", "Subscription not found.")
  return {
    subscription: rotated.subscription,
    token: rotated.token,
    url: subscriptionUrl(rotated.token, origin),
  }
}
//#endregion
export {
  listSubscriptions as a,
  removeSubscription as c,
  updateSubscription as d,
  subscriptionDelivery as f,
  getSubscriptionLink as i,
  reorderSubscriptions as l,
  createSubscription as n,
  readSubscriptionSnapshot as o,
  getSubscription as r,
  registerSubscriptionLink as s,
  appendSubscriptionNodes as t,
  rotateSubscriptionToken as u,
}
