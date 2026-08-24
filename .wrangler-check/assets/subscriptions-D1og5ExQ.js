import {
  a as TARGET_IDS,
  c as parseProcessors,
  d as fail,
  f as onlyKeys,
  g as ValidationError,
  i as validateCanonical,
  m as asRecord,
  n as inspectNodeList,
  p as text,
  r as MAX_SOURCE_SIZE,
  t as compileNodeList,
} from "./nodes-b2qYjNQG.js"
function describeEmptyResult(parsedCount, target, diagnostics) {
  if (parsedCount === 0) {
    if (diagnostics.some((diagnostic) => diagnostic.stage === "canonical-validation"))
      return `The nodes parsed from the source failed validation, so nothing can be written for ${target}.`
    return `The source holds no parsable node, so nothing can be written for ${target}.`
  }
  const [first] = diagnostics
  const example = first ? ` For example: ${first.message}` : ""
  return `None of the source's ${`${parsedCount} ${parsedCount === 1 ? "node" : "nodes"}`} can be written for ${target}.${example}`
}
function validateDocument(compiled, target) {
  if (compiled.renderedNodes.length === 0)
    throw new ValidationError(
      describeEmptyResult(compiled.nodes.length, target, compiled.diagnostics),
    )
  if (compiled.content.trim().length === 0)
    throw new Error(`${target} rendered an empty document even though nodes were serialized.`)
  if (new TextEncoder().encode(compiled.content).byteLength > 8388608)
    throw new ValidationError("The compiled subscription document must not exceed 8 MiB.")
}
//#endregion
//#region src/core/subscriptions/node-pool.ts
const MAX_POOL_NODES = 5e3
function sortValue(value, root = false) {
  if (Array.isArray(value)) return value.map((entry) => sortValue(entry))
  if (!value || typeof value !== "object") return value
  return Object.fromEntries(
    Object.entries(value)
      .filter(([key]) => !root || key !== "name")
      .toSorted(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0))
      .map(([key, entry]) => [key, sortValue(entry)]),
  )
}
function nodeKey(node) {
  return JSON.stringify(sortValue(node, true))
}
function mergePoolNodes(existing, incoming) {
  const merged = []
  const seen = /* @__PURE__ */ new Set()
  for (const node of [...existing, ...incoming]) {
    const key = nodeKey(node)
    if (seen.has(key)) continue
    seen.add(key)
    merged.push(node)
  }
  return merged
}
function serializePoolNodes(nodes) {
  if (nodes.length > MAX_POOL_NODES)
    throw new ValidationError(`持久化节点订阅最多保存 ${MAX_POOL_NODES} 个节点。`)
  const content = JSON.stringify({ proxies: nodes })
  if (new TextEncoder().encode(content).byteLength > 2097152)
    throw new ValidationError("持久化节点数据不能超过 2 MiB。")
  return content
}
function parsePoolNodes(content) {
  let value
  try {
    value = JSON.parse(content)
  } catch (error) {
    throw new ValidationError("持久化节点数据不是有效的 JSON。", { cause: error })
  }
  const proxies =
    value && typeof value === "object" && Array.isArray(value.proxies) ? value.proxies : null
  if (!proxies) throw new ValidationError("持久化节点数据缺少 proxies 数组。")
  if (proxies.length > MAX_POOL_NODES)
    throw new ValidationError(`持久化节点订阅最多保存 ${MAX_POOL_NODES} 个节点。`)
  const nodes = proxies.filter((item) => Boolean(item && typeof item === "object"))
  if (nodes.length !== proxies.length) throw new ValidationError("持久化节点数据包含无效节点。")
  const validated = validateCanonical(nodes)
  if (validated.nodes.length === 0)
    throw new ValidationError("持久化节点订阅至少需要一个有效节点。")
  if (validated.nodes.length !== nodes.length)
    throw new ValidationError("持久化节点数据包含无效节点。")
  return validated.nodes
}
function importPoolNodes(content) {
  const inspected = inspectNodeList(content)
  const validated = validateCanonical(inspected.nodes)
  if (validated.nodes.length === 0) throw new ValidationError("没有识别到可保存的有效节点。")
  return {
    nodes: validated.nodes,
    skipped: inspected.diagnostics.length + validated.diagnostics.length,
  }
}
/** Optional folder/group: empty and whitespace both mean "ungrouped". */
function folderField(value) {
  if (value == null) return void 0
  if (typeof value !== "string") fail("folder must be a string.")
  if (value.length > 100) fail(`folder must not exceed 100 characters.`)
  const output = value.trim()
  return output.length > 0 ? output : void 0
}
function parseSubscriptionSource(value) {
  const input = asRecord(value) ?? fail("source must be an object.")
  if (input.type === "raw") {
    onlyKeys(input, ["type", "content"], "source")
    const content = text(input.content, "source.content", MAX_SOURCE_SIZE, true)
    if (new TextEncoder().encode(content).byteLength > 2097152)
      fail("source.content must not exceed 2 MiB.")
    return {
      type: "raw",
      content,
    }
  }
  if (input.type === "pool") {
    onlyKeys(input, ["type", "content"], "source")
    const content = text(input.content, "source.content", MAX_SOURCE_SIZE, true)
    if (new TextEncoder().encode(content).byteLength > 2097152)
      fail("source.content must not exceed 2 MiB.")
    return {
      type: "pool",
      content,
    }
  }
  if (input.type === "collection") {
    onlyKeys(input, ["type", "memberIds"], "source")
    if (!Array.isArray(input.memberIds) || input.memberIds.length === 0)
      fail("source.memberIds must be a non-empty array.")
    if (input.memberIds.length > 64) fail(`source.memberIds may hold at most 64 members.`)
    const memberIds = input.memberIds.map((entry, index) =>
      text(entry, `source.memberIds[${index}]`, 128),
    )
    if (new Set(memberIds).size !== memberIds.length)
      fail("source.memberIds must not contain duplicates.")
    return {
      type: "collection",
      memberIds,
    }
  }
  if (input.type === "remote") {
    onlyKeys(input, ["type", "urls"], "source")
    if (!Array.isArray(input.urls) || input.urls.length === 0)
      fail("source.urls must be a non-empty array.")
    if (input.urls.length > 32) fail(`source.urls may hold at most 32 links.`)
    return {
      type: "remote",
      urls: input.urls.map((entry, index) => {
        const rawUrl = text(entry, `source.urls[${index}]`, 4096)
        let url
        try {
          url = new URL(rawUrl)
        } catch {
          return fail(`source.urls[${index}] is not a valid URL.`)
        }
        if (!["http:", "https:"].includes(url.protocol))
          fail(`source.urls[${index}] may only use HTTP(S).`)
        if (url.username || url.password)
          fail(`source.urls[${index}] must not carry user information.`)
        return url.toString()
      }),
    }
  }
  return fail("source.type must be raw, pool, remote or collection.")
}
function target(value) {
  if (!TARGET_IDS.includes(value)) fail(`defaultTarget must be one of ${TARGET_IDS.join(", ")}.`)
  return value
}
const DRAFT_KEYS = ["name", "folder", "source", "defaultTarget", "processors", "enabled"]
function fieldsBeforeSource(input) {
  if (input.enabled != null && typeof input.enabled !== "boolean")
    fail("enabled must be a boolean.")
  const processors = parseProcessors(input.processors ?? [])
  return {
    name: text(input.name, "name", 100),
    folder: folderField(input.folder),
    processors: processors.length > 0 ? processors : void 0,
    enabled: input.enabled !== false,
  }
}
function parseSubscriptionMetadata(value) {
  const input = asRecord(value) ?? fail("A subscription definition must be an object.")
  return {
    ...fieldsBeforeSource(input),
    defaultTarget: target(input.defaultTarget),
  }
}
function parseSubscriptionDraft(value) {
  const input = asRecord(value) ?? fail("A subscription definition must be an object.")
  onlyKeys(input, DRAFT_KEYS, "The subscription definition")
  const fields = fieldsBeforeSource(input)
  const source = parseSubscriptionSource(input.source)
  return {
    ...fields,
    source,
    defaultTarget: target(input.defaultTarget),
  }
}
function parseSubscriptionUpdate(current, value) {
  const input = asRecord(value) ?? fail("A subscription update must be an object.")
  const allowed = new Set(DRAFT_KEYS)
  if (!Object.keys(input).some((key) => allowed.has(key)))
    fail("The subscription update has no modifiable field.")
  return parseSubscriptionDraft({
    name: current.name,
    folder: current.folder,
    source: current.source,
    defaultTarget: current.defaultTarget,
    processors: current.processors,
    enabled: current.enabled,
    ...input,
  })
}
//#endregion
//#region src/core/subscriptions/source-resolver.ts
const MAX_REDIRECTS = 3
const MAX_CONCURRENT_FETCHES = 4
const SourceReadError = class extends Error {
  constructor(message, options) {
    super(message, options)
    this.name = "SourceReadError"
  }
}
const SourceBudget = class {
  multipleSources
  used = 0
  constructor(multipleSources) {
    this.multipleSources = multipleSources
  }
  ensureAvailable(length) {
    if (length > 2097152 - this.used) this.exceeded()
  }
  consume(length) {
    this.ensureAvailable(length)
    this.used += length
  }
  exceeded() {
    throw new SourceReadError(
      this.multipleSources
        ? "The merged remote subscriptions must not exceed 2 MiB."
        : "A remote subscription must not exceed 2 MiB.",
    )
  }
}
const FORWARDED_RESPONSE_HEADERS = [
  "subscription-userinfo",
  "profile-web-page-url",
  "profile-update-interval",
  "profile-title",
  "plan-name",
]
function isPrivateIpv4(hostname) {
  const parts = hostname.split(".").map(Number)
  if (parts.length !== 4 || parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255))
    return false
  return (
    parts[0] === 10 ||
    parts[0] === 127 ||
    (parts[0] === 169 && parts[1] === 254) ||
    (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||
    (parts[0] === 192 && parts[1] === 168) ||
    (parts[0] === 100 && parts[1] >= 64 && parts[1] <= 127) ||
    (parts[0] === 198 && [18, 19].includes(parts[1])) ||
    parts[0] === 0 ||
    parts[0] >= 224
  )
}
function isForbiddenAddress(hostname) {
  const normalized = hostname
    .toLowerCase()
    .replace(/\.$/, "")
    .replaceAll(/^\[|]$/g, "")
  if (normalized === "localhost" || normalized.endsWith(".localhost")) return true
  if (normalized.includes(":"))
    return (
      normalized === "::" ||
      normalized === "::1" ||
      normalized.startsWith("::ffff:") ||
      /^f[cd]/.test(normalized) ||
      /^fe[89ab]/.test(normalized)
    )
  return isPrivateIpv4(normalized)
}
function hostAllowed(hostname, allowedHosts) {
  const normalized = hostname.toLowerCase().replace(/\.$/, "")
  return allowedHosts.some((entry) => {
    const allowed = entry.trim().toLowerCase().replace(/\.$/, "")
    if (!allowed) return false
    if (allowed.startsWith("*.")) return normalized.endsWith(allowed.slice(1))
    return normalized === allowed
  })
}
async function discardResponseBody(response) {
  if (!response.body || response.body.locked) return
  try {
    await response.body.cancel()
  } catch {}
}
function parseUrl(value) {
  try {
    return new URL(value)
  } catch (error) {
    throw new ValidationError("The remote subscription URL is not valid.", { cause: error })
  }
}
function validateRemoteUrl(value, allowedHosts) {
  const url = parseUrl(value)
  if (!["https:", "http:"].includes(url.protocol))
    throw new ValidationError("A remote subscription may only use HTTP(S).")
  if (url.username || url.password)
    throw new ValidationError("A remote subscription URL must not carry user information.")
  if (isForbiddenAddress(url.hostname))
    throw new ValidationError("A remote subscription must not reach a loopback or private address.")
  if (!hostAllowed(url.hostname, allowedHosts))
    throw new ValidationError(
      `Remote subscription host ${url.hostname} is not among the hosts this subscription allows.`,
    )
  return url
}
async function validateResolvedHost(url, resolveHost) {
  if (!resolveHost) return
  let addresses
  try {
    addresses = await resolveHost(url.hostname)
  } catch (error) {
    throw new SourceReadError(`Cannot resolve remote subscription host ${url.hostname}.`, {
      cause: error,
    })
  }
  if (addresses.length === 0)
    throw new SourceReadError(`Cannot resolve remote subscription host ${url.hostname}.`)
  if (addresses.some((address) => isForbiddenAddress(address)))
    throw new ValidationError(
      `Remote subscription host ${url.hostname} resolves to a loopback or private address.`,
    )
}
function subscriptionSourceHosts(source) {
  if (source.type !== "remote") return []
  const hosts = source.urls.map((url) => validateRemoteUrl(url, [parseUrl(url).hostname]).hostname)
  return [...new Set(hosts)]
}
async function readLimitedBody(response, budget) {
  const declaredLength = Number(response.headers.get("content-length") ?? 0)
  if (declaredLength > 2097152)
    throw new SourceReadError("A remote subscription must not exceed 2 MiB.")
  if (declaredLength > 0) budget.ensureAvailable(declaredLength)
  if (!response.body) return ""
  const reader = response.body.getReader()
  const chunks = []
  let length = 0
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    length += value.byteLength
    if (length > 2097152) {
      await reader.cancel()
      throw new SourceReadError("A remote subscription must not exceed 2 MiB.")
    }
    try {
      budget.consume(value.byteLength)
    } catch (error) {
      try {
        await reader.cancel()
      } catch {}
      throw error
    }
    chunks.push(value)
  }
  const bytes = new Uint8Array(length)
  let offset = 0
  for (const chunk of chunks) {
    bytes.set(chunk, offset)
    offset += chunk.byteLength
  }
  return new TextDecoder().decode(bytes)
}
async function fetchOne(target, options, budget, batchSignal) {
  const fetcher = options.fetch ?? globalThis.fetch
  let url = validateRemoteUrl(target, options.allowedHosts)
  let redirects = 0
  while (true) {
    await validateResolvedHost(url, options.resolveHost)
    let response
    try {
      response = await fetcher(url, {
        redirect: "manual",
        headers: { Accept: "text/plain, application/yaml, application/json" },
        signal: AbortSignal.any([batchSignal, AbortSignal.timeout(1e4)]),
      })
    } catch (error) {
      throw new SourceReadError("The remote subscription request failed.", { cause: error })
    }
    if ([301, 302, 303, 307, 308].includes(response.status)) {
      await discardResponseBody(response)
      if (redirects === MAX_REDIRECTS)
        throw new SourceReadError("The remote subscription redirected too many times.")
      redirects += 1
      const location = response.headers.get("location")
      if (!location)
        throw new SourceReadError("The remote subscription returned an invalid redirect.")
      let redirected
      try {
        redirected = new URL(location, url).toString()
      } catch (error) {
        throw new SourceReadError("The remote subscription returned an invalid redirect.", {
          cause: error,
        })
      }
      url = validateRemoteUrl(redirected, options.allowedHosts)
      continue
    }
    if (!response.ok) {
      await discardResponseBody(response)
      throw new SourceReadError(`The remote subscription request failed (HTTP ${response.status}).`)
    }
    let content
    try {
      content = await readLimitedBody(response, budget)
    } catch (error) {
      await discardResponseBody(response)
      if (error instanceof SourceReadError) throw error
      throw new SourceReadError("The remote subscription response could not be read.", {
        cause: error,
      })
    }
    return {
      content,
      responseHeaders: Object.fromEntries(
        FORWARDED_RESPONSE_HEADERS.flatMap((name) => {
          const value = response.headers.get(name)
          return value ? [[name, value]] : []
        }),
      ),
    }
  }
}
async function fetchRemote(source, options) {
  if (source.urls.length === 0)
    throw new ValidationError("A remote subscription needs at least one link.")
  if (source.urls.length > 32)
    throw new ValidationError(`A remote subscription must not exceed 32 links.`)
  const budget = new SourceBudget(source.urls.length > 1)
  const controller = new AbortController()
  const resolved = []
  let nextIndex = 0
  let failed = false
  let firstError
  async function worker() {
    while (!failed) {
      const index = nextIndex
      nextIndex += 1
      if (index >= source.urls.length) return
      try {
        resolved[index] = await fetchOne(source.urls[index], options, budget, controller.signal)
      } catch (error) {
        if (!failed) {
          failed = true
          firstError = error
          controller.abort()
        }
      }
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(MAX_CONCURRENT_FETCHES, source.urls.length) }, () => worker()),
  )
  if (failed) throw firstError
  if (resolved.length === 1) return resolved[0]
  const bodies = resolved.map((item) => item.content).filter(Boolean)
  budget.consume(Math.max(0, bodies.length - 1))
  return {
    content: bodies.join("\n"),
    responseHeaders: Object.assign({}, ...resolved.map((item) => item.responseHeaders)),
  }
}
async function readSubscriptionSource(source, options) {
  if (source.type === "raw" || source.type === "pool")
    return {
      kind: "ready",
      source: {
        content: source.content,
        responseHeaders: {},
      },
    }
  if (source.type === "collection")
    return {
      kind: "unavailable",
      error: /* @__PURE__ */ new Error("A collection source must be resolved through its members."),
    }
  try {
    return {
      kind: "ready",
      source: await fetchRemote(source, options),
    }
  } catch (error) {
    if (error instanceof SourceReadError)
      return {
        kind: "unavailable",
        error,
      }
    throw error
  }
}
//#endregion
//#region src/core/subscriptions/digest.ts
/**
 * SHA-256 as lower-case hex. Two things in this domain are identified by their digest rather than by
 * their content: a subscription token, which is indexed by it so the token itself is never stored,
 * and a compiled artifact, whose digest is the ETag a client revalidates against.
 */
async function sha256Hex(value) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value))
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("")
}
//#endregion
//#region src/core/subscriptions/token.ts
const TOKEN_BYTES = 32
/**
 * A token is only ever seen twice: when it is minted and when a subscriber presents it. In between the
 * deployment holds its digest and its last few characters, so a leaked database cannot be turned back
 * into working subscription addresses.
 */
function mintSubscriptionToken() {
  const bytes = new Uint8Array(TOKEN_BYTES)
  crypto.getRandomValues(bytes)
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("")
}
/** The tail an operator recognises their own subscription by, in a list that shows no full tokens. */
function tokenHint(token) {
  return token.slice(-8)
}
/**
 * Whether a string is worth looking up at all. A value outside these bounds cannot be a token this
 * deployment minted, so it is refused before it reaches the database — which also keeps an arbitrarily
 * long path segment from becoming a query.
 */
function isPlausibleToken(token) {
  return token.length === 64 && /^[0-9a-f]+$/.test(token)
}
/** The value a token is stored and looked up under. */
function hashToken(token) {
  return sha256Hex(token)
}
//#endregion
//#region src/core/subscriptions/wrapper.ts
/**
 * The compiled document turned into the thing that is stored and served: its digest, how many nodes
 * it carries, and whatever traffic metadata the upstream stated. Separate from `delivery.ts`, whose
 * subject is when an artifact may be reused rather than what one is.
 *
 * Nothing here restates what the target already answers. A media type or a file extension stored
 * beside the document would keep serving the old one after a client's definition changed, so
 * `delivery-response.ts` asks the target instead.
 */
async function wrapArtifact(input) {
  const { compiled, subscription, target, responseHeaders } = input
  return {
    subscriptionId: subscription.id,
    target,
    subscriptionVersion: subscription.version,
    etag: `"${await sha256Hex(compiled.content)}"`,
    content: compiled.content,
    nodeCount: compiled.renderedNodes.length,
    responseHeaders,
    createdAt: /* @__PURE__ */ new Date().toISOString(),
  }
}
//#endregion
//#region src/core/subscriptions/delivery.ts
const DEFAULT_FRESH_ARTIFACT_MS = 6e4
const DEFAULT_MAX_STALE_MS = 6048e5
const SubscriptionDelivery = class {
  repository
  freshArtifactMs
  maxStaleMs
  resolveHost
  constructor(repository, options = {}) {
    this.repository = repository
    this.freshArtifactMs = options.freshArtifactMs ?? 6e4
    this.maxStaleMs = options.maxStaleMs ?? DEFAULT_MAX_STALE_MS
    this.resolveHost = options.resolveHost
  }
  readSnapshot(id, target) {
    return this.repository.readArtifact(id, target)
  }
  async deliver(token, target, knownEtag) {
    if (!isPlausibleToken(token)) return { kind: "not-found" }
    const subscription = await this.repository.findMetadataByToken(token)
    if (!subscription) return { kind: "not-found" }
    if (!subscription.enabled) return { kind: "disabled" }
    const selectedTarget = target ?? subscription.defaultTarget
    const cached = await this.repository.findArtifact(subscription.id, selectedTarget)
    if (this.isReusable(cached, subscription)) {
      const reused = await this.serve(subscription, cached, knownEtag, false)
      if (reused)
        return {
          kind: "delivered",
          delivery: reused,
        }
    }
    const refreshed = await this.refresh(subscription, selectedTarget)
    if (refreshed.kind === "unavailable") {
      await this.recordFailure(subscription, refreshed.error)
      const fallback = await this.repository.findArtifact(subscription.id, selectedTarget)
      if (
        fallback?.subscriptionVersion === subscription.version &&
        Date.now() - Date.parse(fallback.createdAt) < this.maxStaleMs
      ) {
        const served = await this.serve(subscription, fallback, knownEtag, true)
        if (served) {
          console.warn("Subscription refresh failed; serving stale artifact", {
            subscriptionId: subscription.id,
            target: selectedTarget,
            error: refreshed.error,
          })
          return {
            kind: "delivered",
            delivery: served,
          }
        }
      }
      return refreshed
    }
    try {
      await this.repository.saveArtifactIfCurrent(refreshed.artifact, refreshed.artifact.createdAt)
    } catch (error) {
      console.warn("Unable to save compiled subscription artifact", {
        subscriptionId: subscription.id,
        target: selectedTarget,
        error,
      })
    }
    return {
      kind: "delivered",
      delivery: {
        subscription,
        artifact: refreshed.artifact,
        content: refreshed.artifact.etag === knownEtag ? null : refreshed.artifact.content,
        stale: false,
      },
    }
  }
  async recordFailure(subscription, error) {
    try {
      await this.repository.recordDelivery(subscription.id, subscription.version, {
        error: error.message,
      })
    } catch (recordError) {
      console.warn("Unable to record subscription refresh failure", {
        subscriptionId: subscription.id,
        error: recordError,
      })
    }
  }
  async refresh(subscription, target) {
    const source = await this.repository.findSource(subscription.id)
    if (!source)
      return {
        kind: "unavailable",
        error: /* @__PURE__ */ new Error("The subscription source is gone."),
      }
    try {
      const resolved =
        source.type === "collection"
          ? await this.resolveCollection(source)
          : await readSubscriptionSource(source, {
              allowedHosts: subscriptionSourceHosts(source),
              resolveHost: this.resolveHost,
            })
      if (resolved.kind === "unavailable") return resolved
      const compiled = compileNodeList({
        source: resolved.source.content,
        target,
        processors: subscription.processors,
      })
      validateDocument(compiled, target)
      return {
        kind: "ready",
        artifact: await wrapArtifact({
          compiled,
          subscription,
          target,
          responseHeaders: resolved.source.responseHeaders,
        }),
      }
    } catch (error) {
      if (error instanceof ValidationError)
        return {
          kind: "unavailable",
          error,
        }
      throw error
    }
  }
  /**
   * A collection carries no text of its own: its body is the canonical nodes of its member pools,
   * merged in member order with exact duplicates dropped — the same merge the pool append path uses,
   * so the served node data is exactly what the member pools would hand out. A member that is gone or
   * was converted away from a pool is skipped (it must not take a live collection down); a collection
   * with nothing left to serve is unavailable, matching a dead upstream.
   */
  async resolveCollection(source) {
    let nodes = []
    for (const memberId of source.memberIds) {
      const member = await this.repository.findSource(memberId)
      if (!member) {
        console.warn("Collection member is gone; skipping", { memberId })
        continue
      }
      if (member.type !== "pool") {
        console.warn("Collection member is no longer a persistent pool; skipping", { memberId })
        continue
      }
      try {
        nodes = mergePoolNodes(nodes, parsePoolNodes(member.content))
      } catch (error) {
        if (error instanceof ValidationError) {
          console.warn("Collection member pool is unreadable; skipping", {
            memberId,
            error,
          })
          continue
        }
        throw error
      }
    }
    if (nodes.length === 0)
      return {
        kind: "unavailable",
        error: /* @__PURE__ */ new Error("集合没有任何可用的持久化节点成员。"),
      }
    try {
      return {
        kind: "ready",
        source: {
          content: serializePoolNodes(nodes),
          responseHeaders: {},
        },
      }
    } catch (error) {
      if (error instanceof ValidationError)
        return {
          kind: "unavailable",
          error,
        }
      throw error
    }
  }
  async serve(subscription, artifact, knownEtag, stale) {
    if (artifact.etag === knownEtag)
      return {
        subscription,
        artifact,
        content: null,
        stale,
      }
    const read = await this.repository.readArtifact(subscription.id, artifact.target)
    return read === null
      ? null
      : {
          subscription,
          artifact: read,
          content: read.content,
          stale,
        }
  }
  isReusable(artifact, subscription) {
    return (
      artifact?.subscriptionVersion === subscription.version &&
      Date.now() - Date.parse(artifact.createdAt) < this.freshArtifactMs
    )
  }
}
//#endregion
//#region src/core/subscriptions/publishing.ts
function normalizeDraftSource(draft) {
  if (draft.type !== "pool") return draft
  return {
    type: "pool",
    content: serializePoolNodes(parsePoolNodes(draft.content)),
  }
}
const SubscriptionPublishing = class {
  repository
  constructor(repository) {
    this.repository = repository
  }
  list() {
    return this.repository.list()
  }
  get(id) {
    return this.repository.findById(id)
  }
  async publish(input) {
    const draft = parseSubscriptionDraft(input)
    draft.source = normalizeDraftSource(draft.source)
    subscriptionSourceHosts(draft.source)
    if (draft.source.type === "collection")
      await this.validateCollectionMembers(draft.source.memberIds)
    const token = mintSubscriptionToken()
    const timestamp = /* @__PURE__ */ new Date().toISOString()
    const subscription = {
      ...draft,
      id: crypto.randomUUID(),
      tokenHint: tokenHint(token),
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    }
    await this.repository.create(subscription, token)
    return {
      ...subscription,
      token,
    }
  }
  async appendNodes(id, content) {
    const current = await this.repository.findById(id)
    if (!current) return null
    if (current.source.type !== "pool")
      throw new ValidationError("只有持久化节点订阅支持追加节点。")
    if (typeof content !== "string") throw new ValidationError("追加内容必须是文本。")
    if (!content.trim()) throw new ValidationError("追加内容不能为空。")
    const imported = importPoolNodes(content)
    const incoming = imported.nodes
    const existing = parsePoolNodes(current.source.content)
    const merged = mergePoolNodes(existing, incoming)
    if (merged.length === existing.length)
      return {
        subscription: current,
        added: 0,
        skipped: imported.skipped,
      }
    const subscription = {
      ...current,
      source: {
        type: "pool",
        content: serializePoolNodes(merged),
      },
      version: current.version + 1,
      updatedAt: /* @__PURE__ */ new Date().toISOString(),
      lastError: void 0,
    }
    await this.repository.update(subscription, current.version)
    return {
      subscription,
      added: merged.length - existing.length,
      skipped: imported.skipped,
    }
  }
  async update(id, input) {
    const current = await this.repository.findById(id)
    if (!current) return null
    const draft = parseSubscriptionUpdate(current, input)
    draft.source = normalizeDraftSource(draft.source)
    subscriptionSourceHosts(draft.source)
    if (draft.source.type === "collection")
      await this.validateCollectionMembers(draft.source.memberIds)
    const subscription = {
      ...current,
      ...draft,
      version: current.version + 1,
      updatedAt: /* @__PURE__ */ new Date().toISOString(),
      lastError: void 0,
    }
    await this.repository.update(subscription, current.version)
    return subscription
  }
  /**
   * A collection is a managed aggregate, so its members must actually be persistent pool
   * subscriptions — anything else would make the served output depend on members this row cannot
   * vouch for. Existence and kind are checked at write time; delivery still skips a member that is
   * later deleted or converted, because that must never take a live collection down.
   */
  async validateCollectionMembers(memberIds) {
    for (const memberId of memberIds) {
      const member = await this.repository.findById(memberId)
      if (!member) throw new ValidationError(`集合成员不存在：${memberId}`)
      if (member.source.type !== "pool") throw new ValidationError("集合只能包含持久化节点订阅。")
    }
  }
  recoverToken(id) {
    return this.repository.recoverToken(id)
  }
  /**
   * Accepts exactly one full permutation of the current subscription ids, so a stale or partial
   * client list can never silently scramble the order: anything else is refused wholesale.
   */
  async reorder(ids) {
    const current = await this.repository.list()
    const currentIds = new Set(current.map((subscription) => subscription.id))
    const requested = new Set(ids)
    if (
      requested.size !== ids.length ||
      currentIds.size !== requested.size ||
      ids.some((id) => !currentIds.has(id))
    )
      return false
    await this.repository.reorder(ids)
    return true
  }
  async registerToken(id, token) {
    if (!(await this.repository.findById(id))) return null
    return this.repository.registerToken(id, token)
  }
  async rotateToken(id) {
    const token = mintSubscriptionToken()
    if (
      !(await this.repository.rotateToken(
        id,
        token,
        tokenHint(token),
        /* @__PURE__ */ new Date().toISOString(),
      ))
    )
      return null
    return {
      token,
      subscription: await this.readBack(id),
    }
  }
  async readBack(id) {
    try {
      const subscription = await this.repository.findById(id)
      if (!subscription)
        console.warn("Rotated subscription could not be read back", { subscriptionId: id })
      return subscription
    } catch (error) {
      console.warn("Unable to read back rotated subscription", {
        subscriptionId: id,
        error,
      })
      return null
    }
  }
  revoke(id) {
    return this.repository.delete(id)
  }
}
//#endregion
export {
  isPlausibleToken as a,
  parseSubscriptionMetadata as c,
  hashToken as i,
  parseSubscriptionSource as l,
  DEFAULT_FRESH_ARTIFACT_MS as n,
  readSubscriptionSource as o,
  SubscriptionDelivery as r,
  subscriptionSourceHosts as s,
  SubscriptionPublishing as t,
}
