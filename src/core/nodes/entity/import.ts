import type { CanonicalNode } from "../types"
/**
 * Bridging the canonical pipeline model to the editable node form and back.
 *
 * The workbench and share-link parser produce flat `CanonicalNode` objects; the node manager persists
 * `NodeFormData` (a small common surface plus protocol-specific pieces stored in `credentials` and
 * `extra`). The whole "extract → import → reference" flow depends on moving a node through both
 * without losing what it carried.
 *
 * The editor's `PROTOCOL_FIELDS` reads and writes `credentials` under a few form-level names
 * (`method`, `wsPath`, `realityPublicKey`, …). The canonical model names the same facts differently
 * (`cipher`, `ws-opts.path`, `reality-opts.public-key`, …). This module owns those translations as a
 * single bidirectional table, so a share link parsed in either direction lands with the right key
 * names and a node edited in the form still renders correctly.
 *
 * Everything the table does not name rides verbatim in `extra`, which is what keeps a setting no
 * surface edits alive through the round trip.
 */
import { parseJsonObject } from "./convert"
import type { NodeEntity, NodeFormData } from "./types"

/* ───────── helpers ───────── */

function str(value: unknown) {
  return value === undefined || value === null || value === "" ? "" : String(value)
}

function int(value: unknown) {
  if (value === undefined || value === null || value === "") return
  const n = Number(value)
  return Number.isFinite(n) ? n : undefined
}

/* ───────── nested canonical read / write ───────── */

function readNested(obj: Record<string, unknown>, path: string): unknown {
  let cursor: unknown = obj
  for (const seg of path.split(".")) {
    if (!cursor || typeof cursor !== "object") return undefined
    cursor = (cursor as Record<string, unknown>)[seg]
  }
  return cursor
}

function writeNested(target: Record<string, unknown>, path: string, value: unknown) {
  const segs = path.split(".")
  let cursor = target
  for (const seg of segs.slice(0, -1)) {
    const c = cursor[seg]
    if (c && typeof c === "object") {
      cursor = c as Record<string, unknown>
    } else {
      const next: Record<string, unknown> = {}
      cursor[seg] = next
      cursor = next
    }
  }
  const last = segs.at(-1)
  if (last === undefined) return
  if (value === undefined || value === null || value === "") delete cursor[last]
  else cursor[last] = value
}

/* ───────── form key → canonical path ───────── */

/**
 * Maps every form-key that the editor's `PROTOCOL_FIELDS` writes to the canonical path (dot-separated
 * for nested objects). The second element, when true, tells the reader to join the value (which may
 * be an array on the canonical side) back into a comma string for the form.
 */
const FORM_FIELD_MAP: Record<string, [path: string, isList?: boolean]> = {
  method: ["cipher"],
  password: ["password"],
  auth: ["password"],
  authStr: ["auth-str"],
  uuid: ["uuid"],
  alterId: ["alterId"],
  cipher: ["cipher"],
  network: ["network"],
  flow: ["flow"],
  sni: ["sni"],
  tls: ["tls"],
  wsPath: ["ws-opts.path"],
  wsHost: ["ws-opts.headers.Host"],
  realityPublicKey: ["reality-opts.public-key"],
  realityShortId: ["reality-opts.short-id"],
  obfs: ["obfs"],
  obfsparam: ["obfs-param"],
  protocol: ["protocol"],
  protoparam: ["protocol-param"],
  up: ["up"],
  down: ["down"],
  publicKey: ["public-key"],
  privateKey: ["private-key"],
  presharedKey: ["pre-shared-key"],
  psk: ["psk"],
  version: ["version"],
  username: ["username"],
  hostKey: ["host-key"],
  endpoint: ["endpoint"],
  allowedIPs: ["allowed-ips", true],
  dns: ["dns"],
  mtu: ["mtu"],
  persistentKeepalive: ["persistent-keepalive"],
  multiplexingLevel: ["multiplexing-level"],
  congestionControl: ["congestion-control"],
  handshakeMode: ["handshake-mode"],
  streamTimeout: ["stream-timeout"],
  pacingWindow: ["pacing-window"],
  alpn: ["alpn"],
  references: ["references"],
}

/* ───────── canonical → form ───────── */

/** Form-keyed credentials that a canonical node actually states. */
function canonicalCredentials(canonical: CanonicalNode): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const [formKey, [path, isList]] of Object.entries(FORM_FIELD_MAP)) {
    const raw = readNested(canonical, path)
    if (raw === undefined || raw === null || raw === "") continue
    out[formKey] = isList && Array.isArray(raw) ? raw.join(",") : raw
  }
  return out
}

const COMMON_KEYS = new Set([
  "type",
  "name",
  "server",
  "port",
  "country",
  "security",
  "transport",
])

/**
 * Convert a canonical node to the form the node manager persists. Common fields go to top level;
 * every canonical field named in the editor travels through `credentials` (converted to its form
 * key); everything else — fields, nested opts, anything a save/read should not drop — goes verbatim
 * into `extra`.
 */
export function canonicalToNodeForm(canonical: CanonicalNode): NodeFormData {
  const form: NodeFormData = {
    name: str(canonical.name),
    type: str(canonical.type),
    server: str(canonical.server),
    port: int(canonical.port) ?? 0,
  }
  if (canonical.security) form.security = str(canonical.security)
  if (canonical.transport) form.transport = str(canonical.transport)
  if (canonical.country) form.country = str(canonical.country)

  const credentials = canonicalCredentials(canonical)
  if (Object.keys(credentials).length > 0) form.credentials = credentials

  const extra: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(canonical)) {
    if (COMMON_KEYS.has(key)) continue
    if (value === undefined || value === null || value === "") continue
    extra[key] = value
  }
  if (Object.keys(extra).length > 0) form.extra = extra
  return form
}

/* ───────── form → canonical ───────── */

/**
 * Rebuild a canonical node from an entity node. The editor-friendly `credentials` map back to
 * canonical key names, then `extra` fills in the rest, and the common fields are applied last so
 * they always win.
 */
export function nodeToCanonical(entity: NodeEntity): CanonicalNode {
  const credentials = parseJsonObject(entity.credentialJson)
  const extra = parseJsonObject(entity.extraJson)

  const result: Record<string, unknown> = { ...extra }

  // Apply credentials, mapping form-key → canonical path
  for (const [formKey, value] of Object.entries(credentials)) {
    const map = FORM_FIELD_MAP[formKey]
    if (!map) continue
    const [path, isList] = map
    writeNested(
      result,
      path,
      isList && typeof value === "string" ? value.split(",").map((s) => s.trim()) : value,
    )
  }

  // Apply top-level fields — always win
  result.type = str(entity.type)
  result.server = str(entity.server)
  result.port = int(entity.port) ?? 0
  result.name = str(entity.name)
  if (entity.country) result.country = entity.country
  if (entity.security) result.security = entity.security
  if (entity.transport) result.transport = entity.transport

  return result as CanonicalNode
}
