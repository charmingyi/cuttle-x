import type { Diagnostic, DraftEntry, DraftNode } from "../types"
import { asArray, asPort, asRecord, asString } from "../values"
import type { SourceFormat } from "./types"

/**
 * Mieru's native client.json format. The official shape is intentionally handled before the generic
 * structured reader: one server can expose several port bindings, so each binding becomes a node.
 * A few older exporters used the shorter aliases (`ip`, `domain`, `port`, `username`); accepting them
 * here preserves compatibility without weakening the generic node parser.
 */
function isProfile(value: unknown) {
  const profile = asRecord(value)
  return Boolean(profile && (asRecord(profile.user) || Array.isArray(profile.servers)))
}

function detect(value: unknown) {
  return asArray(asRecord(value)?.profiles).some((profile) => isProfile(profile))
}

function stated(value: unknown) {
  return value === undefined || value === null || value === "" ? undefined : value
}

function profileOption(
  profile: Record<string, unknown>,
  endpoint: Record<string, unknown>,
  key: string,
) {
  return asString(endpoint[key]) ?? asString(profile[key])
}

function multiplexingValue(value: unknown) {
  const record = asRecord(value)
  return asString(record?.level) ?? asString(value)
}

function bindingsFor(endpoint: Record<string, unknown>) {
  const bindings = asArray(endpoint.portBindings)
  // Keep support for the compact exporter shape used by older Mieru integrations.
  return bindings.length > 0 ? bindings.map((binding) => asRecord(binding) ?? {}) : [endpoint]
}

function endpointNodes(
  profile: Record<string, unknown>,
  endpoint: Record<string, unknown>,
  profileName: string | undefined,
  nodeOffset: number,
  bindingCount: number,
  diagnostics: Diagnostic[],
  ordinal: number,
): DraftEntry[] {
  const server =
    asString(endpoint.domainName) ??
    asString(endpoint.ipAddress) ??
    asString(endpoint.domain) ??
    asString(endpoint.ip)
  const user = asRecord(profile.user)
  const username = asString(user?.name) ?? asString(user?.username)
  const nodes: DraftEntry[] = []

  for (const [bindingIndex, binding] of bindingsFor(endpoint).entries()) {
    const port = asPort(binding.port ?? endpoint.port)
    const currentOrdinal = ordinal + bindingIndex
    if (!server || !port) {
      diagnostics.push({
        level: "warning",
        stage: "parse",
        code: "invalid-mieru-node",
        message: `Mieru server #${currentOrdinal + 1} is missing address or port; skipped.`,
      })
      continue
    }

    const name =
      profileName && bindingCount > 1
        ? `${profileName} ${nodeOffset + bindingIndex + 1}`
        : profileName
    const node: DraftNode = {
      type: "mieru",
      ...(name ? { name } : {}),
      server,
      port,
      username,
      password: asString(user?.password),
      transport: asString(binding.protocol) ?? asString(endpoint.transportProtocol),
      multiplexing:
        multiplexingValue(binding.multiplexing) ??
        multiplexingValue(endpoint.multiplexing) ??
        multiplexingValue(profile.multiplexing),
      congestionControl:
        asString(binding.congestionControl) ??
        asString(endpoint.congestionControl) ??
        asString(profile.congestionControl),
      handshakeMode: asString(profile.handshakeMode),
    }

    for (const key of ["mtu", "pacingWindow", "streamTimeout"] as const) {
      const value = stated(profile[key])
      if (value !== undefined) node[key] = value
    }
    const transport = profileOption(profile, endpoint, "transportProtocol")
    if (transport !== undefined && node.transport === undefined) node.transport = transport
    nodes.push({ value: node, index: currentOrdinal })
  }
  return nodes
}

function parseMieru(value: unknown) {
  const diagnostics: Diagnostic[] = []
  const drafts: DraftEntry[] = []
  let ordinal = 0

  for (const profileValue of asArray(asRecord(value)?.profiles)) {
    const profile = asRecord(profileValue)
    if (!profile) continue
    const endpoints = asArray(profile.servers)
    const profileName = asString(profile.profileName)
    const bindingCount = endpoints.reduce<number>((count, endpoint) => {
      const record = asRecord(endpoint)
      const bindings = record ? asArray(record.portBindings) : []
      return count + (bindings.length || 1)
    }, 0)

    let nodeOffset = 0
    for (const endpointValue of endpoints) {
      const endpoint = asRecord(endpointValue) ?? {}
      const nodes = endpointNodes(
        profile,
        endpoint,
        profileName,
        nodeOffset,
        bindingCount,
        diagnostics,
        ordinal,
      )
      drafts.push(...nodes)
      const endpointBindingCount = bindingsFor(endpoint).length
      ordinal += endpointBindingCount
      nodeOffset += endpointBindingCount
    }
  }
  return { format: "mieru", drafts, diagnostics }
}

export const mieruFormat: SourceFormat = {
  id: "mieru",
  parse: (source) => {
    const value = source.document()
    return detect(value) ? parseMieru(value) : null
  },
}
