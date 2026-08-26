/**
 * Protocol URIs, read into drafts.
 *
 * `udp`, the TLS a protocol runs on by definition, and the VMess cipher and `alterId` are decided
 * once in `pipeline/canonicalize.ts`, which runs on every draft this returns. A copy here is how the
 * same answer came to differ per input format.
 *
 * What stays is what that stage cannot see, or cannot place: a key it never reads, a repeated
 * parameter it would only see one of, a value the URI actually stated — every rule there defers to a
 * statement, so deleting one silently gains the node a setting its source refused — and two `udp`
 * writes kept for where they put the key. Each is marked at its own line.
 */
import { decodeBase64 } from "../base64"
import { extractEarlyData } from "../transport"
import type { CanonicalNode } from "../types"
import { alpnList, bareHost, booleanFlag, integer } from "../values"
import { applyWireGuardAddresses } from "../wireguard"
function decode(value: string | null | undefined, fallback = "") {
  if (!value) return fallback
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

/**
 * The readable fallback name is canonicalize's rule too, but not the trim — and the trim is what keeps
 * this here: a `#%20%20` fragment is a name of two spaces, which the shared rule reads as a stated
 * value and canonical validation then accepts. Trimming turns it back into silence.
 */
function named(node: Omit<CanonicalNode, "name"> & { name?: string }): CanonicalNode {
  return {
    ...node,
    name: node.name?.trim() || `${node.type} ${node.server}:${node.port}`,
  } as CanonicalNode
}

/**
 * Takes a parsed `URL` rather than the line: three of the callers below need the same `URL` for
 * fields this cannot reach, and handing the string back for a second parse is how they came to
 * build one twice per node.
 */
function urlNode(url: URL, type: string) {
  const query = url.searchParams
  const node = named({
    type,
    name: decode(url.hash.slice(1)),
    server: bareHost(url.hostname),
    port: integer(url.port, query.get("security") === "tls" ? 443 : 0),
  })

  if (url.username) node.username = decode(url.username)
  if (url.password) node.password = decode(url.password)
  // A SOCKS URI carries `user:pass` base64 in the user position and nothing after the colon; a
  // decoded value only counts as credentials if it actually looks like a pair.
  if (type === "socks5" && url.username && !url.password) {
    const decoded = decodeBase64(decode(url.username))
    const at = decoded?.indexOf(":") ?? -1
    if (decoded && at > 0 && !decoded.slice(at + 1).includes(":")) {
      node.username = decoded.slice(0, at)
      node.password = decoded.slice(at + 1)
    }
  }
  // Not through `decode`: `URLSearchParams` has already percent-decoded these, and decoding a second
  // time reads any `%xx` the value legitimately contains as an escape of its own — `a%2525b`, whose
  // one true reading is `a%25b`, reaches the node as `a%b`. Only the fields the URL parser leaves
  // encoded (the fragment, the user and password positions) go through `decode`.
  for (const [key, value] of query) node[key] = value
  const udp = booleanFlag(query.get("udp"))
  if (udp != null) node.udp = udp
  // `insecure` is the URI's word for it; every client reads `skip-cert-verify`. Leaving the raw
  // parameter on the node hands each renderer a field its client does not know.
  const insecure = booleanFlag(
    query.get("insecure") ?? query.get("allowInsecure") ?? query.get("allow_insecure"),
  )
  if (insecure != null) node["skip-cert-verify"] = insecure
  delete node.insecure
  delete node.allowInsecure
  delete node.allow_insecure
  return node
}

function parseShadowsocks(line: string) {
  let body = line.slice("ss://".length)
  const hashIndex = body.indexOf("#")
  const name = hashIndex !== -1 ? decode(body.slice(hashIndex + 1)) : ""
  if (hashIndex !== -1) body = body.slice(0, hashIndex)

  const queryIndex = body.indexOf("?")
  const query = new URLSearchParams(queryIndex !== -1 ? body.slice(queryIndex + 1) : "")
  if (queryIndex !== -1) body = body.slice(0, queryIndex)

  if (!body.includes("@")) body = decodeBase64(body)
  const at = body.lastIndexOf("@")
  if (at === -1) throw new Error("Shadowsocks URI is missing its server information")

  let userInfo = decode(body.slice(0, at))
  if (!userInfo.includes(":")) userInfo = decodeBase64(userInfo)
  const separator = userInfo.indexOf(":")
  // Some clients export an IPv6 literal twice bracketed (`[[…]]`). The URL parser only accepts the
  // standard single pair, so normalize before asking it: strip one superfluous pair.
  const endpointSource = body.slice(at + 1).replace(/^\[\[(.+)\]\]/, "[$1]")
  const endpoint = new URL(`http://${endpointSource}`)
  const node = named({
    type: "ss",
    name,
    server: bareHost(endpoint.hostname),
    port: integer(endpoint.port),
    cipher: userInfo.slice(0, separator),
    password: userInfo.slice(separator + 1),
    // A SIP002 URI says nothing about UDP, so it does not imply relaying it; a `udp=` parameter
    // below still turns it on. Every other protocol carries UDP by default.
    udp: false,
  })

  const statedUdp = booleanFlag(query.get("udp"))
  if (statedUdp != null) node.udp = statedUdp

  const plugin = query.get("plugin")
  if (plugin) {
    const [pluginName, ...options] = decode(plugin).split(";")
    node.plugin = pluginName
    node["plugin-opts"] = Object.fromEntries(
      options.map((option) => {
        const [key, ...rest] = option.split("=")
        if (rest.length === 0) return [key, true]
        const text = rest.join("=")
        const numeric = pluginName === "shadow-tls" && key === "version" && /^\d+$/.test(text)
        return [key, numeric ? Number(text) : text]
      }),
    )
  }
  return node
}

function parseShadowsocksR(line: string) {
  const decoded = decodeBase64(line.slice("ssr://".length))
  const [main, query = ""] = decoded.split("/?")
  const parts = main.split(":")
  if (parts.length < 6) throw new Error("ShadowsocksR URI has too few fields")
  const [server, port, protocol, cipher, obfs, ...passwordParts] = parts
  const params = new URLSearchParams(query)
  return named({
    "type": "ssr",
    "name": params.get("remarks") ? decodeBase64(params.get("remarks") ?? "") : "",
    server,
    "port": integer(port),
    protocol,
    cipher,
    obfs,
    "password": decodeBase64(passwordParts.join(":")),
    "protocol-param": params.get("protoparam")
      ? decodeBase64(params.get("protoparam") ?? "")
      : undefined,
    "obfs-param": params.get("obfsparam") ? decodeBase64(params.get("obfsparam") ?? "") : undefined,
  })
}

function parseVmess(line: string) {
  const value = JSON.parse(decodeBase64(line.slice("vmess://".length))) as Record<string, unknown>
  // A VMess URI has said HTTP two ways since before HTTP/2 existed: `net: tcp` with an `http`
  // header type is the obfuscation, and `net: http` is HTTP/2 — which later URIs spell `h2`.
  const stated = String(value.net ?? "tcp")
  const headerType = String(value.type ?? "")
  const network =
    stated === "tcp" && headerType === "http" ? "http" : stated === "http" ? "h2" : stated
  const node = named({
    type: "vmess",
    name: String(value.ps ?? ""),
    server: String(value.add ?? ""),
    port: integer(value.port as string | number),
    uuid: String(value.id ?? ""),
    // `aid` and `scy` are the URI's own spellings, so the reads stay; the integer and the `auto` they
    // fall back to are canonicalize's VMess rule, reading the `alterId` and `cipher` this leaves it.
    // `String` stays too: a non-string `scy` has to reach that rule as text.
    alterId: value.aid,
    cipher: String(value.scy ?? ""),
    network,
    // A VMess URI spells TLS `tls: "tls"`, which nothing else reads.
    tls: value.tls === "tls" || value.tls === true,
    // The value is the shared default; the position is not. Canonical JSON and the Clash-family YAML
    // serialize in key insertion order, so leaving `udp` to that default moves the key to the end of
    // every VMess node four clients write.
    udp: true,
  })

  if (value.sni) node.sni = String(value.sni)
  if (value.fp) node["client-fingerprint"] = String(value.fp)
  if (value.alpn) node.alpn = String(value.alpn).split(",")
  if (network === "ws") {
    const earlyData = extractEarlyData(value.path, value.ed)
    node["ws-opts"] = {
      "path": earlyData.path,
      "headers": value.host ? { Host: String(value.host) } : undefined,
      "max-early-data": earlyData.maxEarlyData,
      "early-data-header-name":
        earlyData.maxEarlyData != null ? String(value.eh ?? "Sec-WebSocket-Protocol") : undefined,
    }
  }
  if (network === "grpc") node["grpc-opts"] = { "grpc-service-name": String(value.path ?? "") }
  if (network === "http" || network === "h2") {
    const host = value.host
      ? String(value.host)
          .split(",")
          .map((entry) => entry.trim())
      : undefined
    node[`${network}-opts`] = {
      path: value.path === undefined ? undefined : [String(value.path)],
      ...(network === "h2" ? { host } : { headers: host ? { Host: host } : undefined }),
    }
  }
  return node
}

/**
 * A VLESS variant some clients (Hiddify, NekoRay and others in the Xray family) write with the whole
 * `[encryption:]<uuid>@<host>:<port>` span base64-encoded in the authority position, and a query
 * under the Xray spellings — `remarks` for the name, `tls=1`, `xtls=2` for the Vision flow,
 * `peer`/`pbk`/`sid` for Reality, `fp`/`fingerprint` for the client fingerprint. A standard URI
 * keeps its credentials in the user position, so the absence of `@` before the query is the tell.
 *
 * Returns a standard `vless://uuid@host:port?...` line so the usual parser makes one node; `null`
 * when the authority is not a decodable envelope of `uuid@host:port` (i.e. a standard URI, or a
 * share link we must not guess about).
 */
function unwrapVlessEnvelope(line: string): string | null {
  const rest = line.slice("vless://".length)
  const queryAt = rest.indexOf("?")
  const hashAt = rest.indexOf("#")
  const boundary = [queryAt, hashAt].filter((index) => index >= 0).toSorted((a, b) => a - b)[0]
  const authority = boundary === undefined ? rest : rest.slice(0, boundary)
  // Anything with a `@` is the standard form — the uuid sits in the user position and there is
  // nothing to unwrap. IPv6 literals keep their brackets and never carry `@` inside.
  if (authority.includes("@")) return null
  if (!/^[A-Za-z0-9+/_=-]+$/.test(authority)) return null

  const decoded = (() => {
    try {
      return decodeBase64(authority)
    } catch {
      return null
    }
  })()
  if (!decoded) return null
  const at = decoded.lastIndexOf("@")
  const colon = decoded.indexOf(":")
  // `colon` may be 0: the envelope spells an empty encryption as a leading `:uuid@host:port`.
  if (colon === -1 || colon >= at) return null
  const credential = decoded.slice(0, at)
  const endpoint = decoded.slice(at + 1)
  if (!/^\d+$/.test(endpoint.slice(endpoint.lastIndexOf(":") + 1))) return null
  const encryption = credential.slice(0, colon)
  const uuid = credential.slice(colon + 1)
  if (!uuid) return null

  const suffix = boundary === undefined ? "" : rest.slice(boundary)
  // The suffix begins with `?` (or `#`); the encryption parameter joins the query before it, so the
  // rebuilt line has exactly one `?` — `?encryption=none&remarks=…` rather than `?encryption=none&?remarks=…`.
  const queryPart = suffix.startsWith("?") ? suffix.slice(1) : suffix
  const encryptionQuery = encryption
    ? queryPart
      ? `?encryption=${encodeURIComponent(encryption)}&${queryPart}`
      : `?encryption=${encodeURIComponent(encryption)}`
    : suffix
  return `vless://${encodeURIComponent(uuid)}@${endpoint}${encryptionQuery}`
}

function parseVlessOrTrojan(line: string, type: "vless" | "trojan") {
  let resolved = line
  if (type === "vless") {
    const unwrapped = unwrapVlessEnvelope(line)
    if (unwrapped) resolved = unwrapped
  }
  const url = new URL(resolved)
  const query = url.searchParams
  const network = query.get("type") || "tcp"
  const node = named({
    type,
    // The Xray-family envelope spells the name `remarks` in the query; the standard URI keeps it in
    // the fragment. Whichever one is present states the name.
    name: query.get("remarks") ?? decode(url.hash.slice(1)),
    server: bareHost(url.hostname),
    port: integer(url.port, 443),
    network,
    // Not the shared TLS implication restated: `security=none` is the source stating plaintext, and
    // that implication defers to a statement — delete this and the node gains the TLS its source
    // refused. VLESS is implied by nothing, so `tls` and `reality` are the only answer it gets. The
    // envelope spells TLS `tls=1` and Reality `pbk`/`sid`/`peer` rather than `security=`, so both
    // spellings are read and a Reality node is recognised by its keys, not by the value that names it.
    tls: (() => {
      if (type === "trojan") return query.get("security") !== "none"
      // A `tls=0` is a stated `false`; `security=none` is the source naming plaintext outright.
      if (query.get("security") === "none") return false
      const statedTls = booleanFlag(query.get("tls"))
      if (query.get("security") === "tls" || query.get("security") === "reality") return true
      const realityKeys = query.get("pbk") != null || query.get("sid") != null
      if (realityKeys) return true
      return statedTls ?? false
    })(),
    // As in the VMess parser above: kept for where it puts the key, not for the value.
    udp: true,
  })
  if (type === "vless") node.uuid = decode(url.username)
  else node.password = decode(url.username)

  // VLESS states its encryption even though `none` is the only value in use; keeping what the
  // source said is what lets each renderer write it back without inventing one.
  const encryption = type === "vless" ? query.get("encryption") : null
  const flow = query.get("flow")
  const sni = query.get("sni") ?? query.get("peer")
  // The fingerprint is named `fp` in the standard URI and `fingerprint` in the envelope; both name
  // the same TLS handshake evidence.
  const fingerprint = query.get("fp") ?? query.get("fingerprint")
  if (encryption) node.encryption = encryption
  if (flow) node.flow = flow
  else if (type === "vless" && query.get("xtls") != null) {
    // `xtls=2` is the envelope's spelling for the Vision flow; `0`/`1` state flow off/direct, which
    // the canonical node spells `flow` too — `xtls=1` is the direct flow, so both are carried.
    const xtls = query.get("xtls")
    if (xtls === "2") node.flow = "xtls-rprx-vision"
    else if (xtls === "1") node.flow = "xtls-rprx-direct"
  }
  if (sni) node.sni = sni
  if (fingerprint) node["client-fingerprint"] = fingerprint
  if (query.get("tfo") != null) node.tfo = booleanFlag(query.get("tfo")) ?? false
  // The ALPN list is part of the TLS handshake the node asks for; dropping it silently changes it.
  const alpn = query.get("alpn")
  if (alpn) node.alpn = alpnList(alpn)
  const insecure = booleanFlag(query.get("allowInsecure") ?? query.get("insecure"))
  if (insecure != null) node["skip-cert-verify"] = insecure
  // `security=reality` names it in the standard URI; the envelope carries Reality's keys directly,
  // so a query with `pbk`/`sid` is recognised by presence rather than by spelling. `spider-x` is
  // optional, and a `undefined` member would become `null` when the node is stored as JSON.
  if (query.get("security") === "reality" || query.get("pbk") != null) {
    const spiderX = query.get("spx")
    node["reality-opts"] = {
      "public-key": query.get("pbk") ?? "",
      "short-id": query.get("sid") ?? "",
      ...(spiderX ? { "spider-x": spiderX } : {}),
    }
  }
  if (network === "ws") {
    const earlyData = extractEarlyData(query.get("path"), query.get("ed"))
    node["ws-opts"] = {
      "path": earlyData.path,
      "headers": query.get("host") ? { Host: query.get("host") } : undefined,
      "max-early-data": earlyData.maxEarlyData,
      "early-data-header-name":
        earlyData.maxEarlyData != null ? (query.get("eh") ?? "Sec-WebSocket-Protocol") : undefined,
    }
  } else if (network === "grpc") {
    // `mode` says whether the stream is multiplexed; dropping it silently downgrades the node.
    node["grpc-opts"] = {
      "grpc-service-name": query.get("serviceName") ?? "",
      ...(query.get("mode") ? { mode: query.get("mode") } : {}),
    }
  } else if (network === "xhttp" || network === "splithttp") {
    node.network = "xhttp"
    node["xhttp-opts"] = Object.fromEntries(
      ["host", "path", "mode", "extra"].flatMap((key) => {
        const value = query.get(key)
        if (value == null) return []
        if (key !== "extra") return [[key, value]]
        try {
          return [[key, JSON.parse(value) as unknown]]
        } catch {
          return [[key, value]]
        }
      }),
    )
  } else if (network === "httpupgrade") {
    const earlyData = extractEarlyData(query.get("path"), query.get("ed"))
    node["httpupgrade-opts"] = {
      "host": query.get("host") ?? undefined,
      "path": earlyData.path,
      "max-early-data": earlyData.maxEarlyData,
      "early-data-header-name":
        earlyData.maxEarlyData != null ? (query.get("eh") ?? "Sec-WebSocket-Protocol") : undefined,
    }
  }
  return node
}

/**
 * The secret sits in the user position, which is the one field `urlNode` cannot place: a Hysteria 2
 * URI has no separate user name, so what looks like one is the password. `sni`, `obfs`,
 * `obfs-password` and `insecure` need nothing here — the shared query copy and the shared `insecure`
 * rule already carry all four.
 */
function parseHysteria2(line: string) {
  const url = new URL(line.replace(/^hy2:/, "hysteria2:"))
  const node = urlNode(url, "hysteria2")
  node.password = decode(url.username || url.password)
  return node
}

/**
 * Hysteria 1 spells every field its own way — `auth`, `peer`, `upmbps` — and the secret may arrive in
 * the user position or in the query. The canonical node keeps the Clash names, so each renderer
 * translates from one shape instead of from the query string.
 */
function parseHysteria(line: string) {
  const url = new URL(line)
  const query = url.searchParams
  const node = urlNode(url, "hysteria")
  // Three positions for one secret, two of which no rule can reach: canonicalize folds an `auth` or
  // `password` key, not a credential sitting in the URI's user or password position.
  node["auth-str"] = decode(url.username || url.password || query.get("auth")) || undefined
  node.protocol = query.get("protocol") ?? "udp"
  node.sni = query.get("peer") ?? query.get("sni") ?? undefined
  node.up = query.get("upmbps") ?? query.get("up") ?? undefined
  node.down = query.get("downmbps") ?? query.get("down") ?? undefined
  node.obfs = query.get("obfs") ?? undefined
  if (node.alpn !== undefined) node.alpn = alpnList(node.alpn)
  // Not the credential rule restated: canonicalize deletes `auth_str`, `auth` and `password` and
  // nothing else. `peer`, `upmbps` and `downmbps` were renamed two lines up and no client reads them,
  // so without this loop three of the URI's own field names reach the canonical JSON.
  for (const key of ["auth", "peer", "upmbps", "downmbps", "password"]) delete node[key]
  return node
}

function parseWireGuard(line: string) {
  const url = new URL(line.replace(/^wg:/, "wireguard:"))
  const node = urlNode(url, "wireguard")
  node["private-key"] = decode(url.username)
  delete node.username
  node["public-key"] =
    url.searchParams.get("publickey") ?? url.searchParams.get("public-key") ?? undefined
  node["pre-shared-key"] =
    url.searchParams.get("presharedkey") ?? url.searchParams.get("pre-shared-key") ?? undefined
  // `getAll`, not `get`: a WireGuard URI repeats `address` once per family. Canonicalize applies the
  // same helper to whatever single value landed on the draft, so leaving it to that rule drops every
  // address after the first — in practice the IPv6 one.
  const addresses = url.searchParams.getAll("address")
  applyWireGuardAddresses(node, addresses)
  const reserved = url.searchParams.get("reserved")
  node.reserved = reserved?.split(/[-,]/).map((item) => integer(item))
  node.mtu = integer(url.searchParams.get("mtu"), 0) || undefined
  return node
}

function parseTuic(line: string) {
  const node = urlNode(new URL(line), "tuic")
  node.uuid = node.username
  delete node.username
  return node
}

/**
 * Mieru's own share link, the form `mieru client` writes and reads (see mieru's `pkg/appctl/url.go`):
 * `mieru://` carries a protobuf payload — not something this reader decodes — while `mierus://` is
 * the human-readable profile form `user:pass@host?profile=…&port=…&protocol=…`. The host holds no
 * port: each server binding names one through a `port` (or `port=begin-end` range) parameter, with
 * its transport in the parallel `protocol` parameter.
 *
 * The canonical node keeps one `transport` per server; a URL that names several bindings is read
 * into one node per binding, exactly as the JSON reader does.
 */
function parseMierus(line: string) {
  const url = new URL(line.replace(/^mieru:/, "mierus:"))
  const query = url.searchParams
  const ports = query.getAll("port")
  const protocols = query.getAll("protocol")
  const bindings = ports.map((port, index) => ({
    port,
    protocol: protocols[index] ?? "TCP",
  }))
  const nodes: CanonicalNode[] = []
  for (const binding of bindings) {
    const node = named({
      type: "mieru",
      name: query.get("profile") ?? "",
      server: bareHost(url.hostname),
      port: integer(binding.port),
      username: decode(url.username),
      password: decode(url.password),
      transport: binding.protocol.toLowerCase(),
      multiplexing: query.get("multiplexing") ?? undefined,
      handshakeMode: query.get("handshake-mode") ?? undefined,
      mtu: query.get("mtu") != null ? integer(query.get("mtu")) : undefined,
      udp: booleanFlag(query.get("udp")) ?? false,
    })
    nodes.push(node)
  }
  return nodes
}

export function parseUri(line: string): CanonicalNode | null {
  const scheme = /^([a-zA-Z][\w+.-]*):\/\//.exec(line)?.[1]?.toLowerCase()
  switch (scheme) {
    case "ss":
      return parseShadowsocks(line)
    case "ssr":
      return parseShadowsocksR(line)
    case "vmess":
      return parseVmess(line)
    case "vless":
      return parseVlessOrTrojan(line, "vless")
    case "trojan":
      return parseVlessOrTrojan(line, "trojan")
    case "hysteria2":
    case "hy2":
      return parseHysteria2(line)
    case "hysteria":
      return parseHysteria(line)
    case "tuic":
      return parseTuic(line)
    case "wireguard":
    case "wg":
      return parseWireGuard(line)
    case "socks":
    case "socks5":
      return urlNode(new URL(line), "socks5")
    case "http":
    case "https": {
      const node = urlNode(new URL(line), "http")
      // The scheme, and nowhere else: the type is `http` either way, so canonicalize's `spellsTls` —
      // asked about the type — cannot tell the two schemes apart. Deleting this hands an `https://`
      // proxy back out as the plaintext version of itself, credentials and all.
      node.tls = scheme === "https"
      return node
    }
    case "anytls": {
      const node = urlNode(new URL(line), "anytls")
      node.password = node.username
      delete node.username
      return node
    }
    case "mieru":
    case "mierus":
      return parseMierus(line)[0] ?? null
    default:
      return null
  }
}
