/**
 * A saved proxy node — the first-class entity behind the "节点 → 订阅 → 临时转换" architecture.
 *
 * Every row in the `nodes` table is one node that can be individually edited and re-used across
 * subscriptions. The common fields mirror `CanonicalNode`; protocol-specific and extra fields live
 * in JSON columns.
 *
 * `credentialJson` holds the protocol-specific fields that vary by `type`:
 *   - ss:       { method, password }
 *   - ssr:      { method, password, obfs, obfsparam, protocol, protoparam }
 *   - vmess:    { uuid, alterId, cipher, network, wsPath, wsHost, tls, sni, fingerprint }
 *   - vless:    { uuid, flow, network, wsPath, wsHost, tls, sni, fingerprint, realityPublicKey, realityShortId }
 *   - trojan:   { password, sni, tls, fingerprint }
 *   - hysteria: { authStr, protocol, up, down, obfs, alpn }
 *   - hysteria2:{ auth, sni, tls, alpn }
 *   - tuic:     { uuid, password, congestionControl, alpn, sni }
 *   - anytls:   { password, sni, alpn }
 *   - snell:    { psk, obfs, version }
 *   - mieru:    { username, password, multiplexingLevel, congestionControl, mtu, pacingWindow, streamTimeout, handshakeMode }
 *   - wireguard:{ publicKey, privateKey, presharedKey, endpoint, allowedIPs, dns, mtu, persistentKeepalive }
 *   - socks5:   { username, password }
 *   - http:     { username, password, tls }
 *
 * `extraJson` holds auxiliary fields like `udp`, `skipCertVerify`, `header`, `plugin`, etc.
 */
export interface NodeEntity {
  id: string
  name: string
  /** Protocol type: ss, ssr, vmess, vless, trojan, hysteria, hysteria2, tuic, anytls, snell, mieru, wireguard, socks5, http, ssh, etc. */
  type: string
  /** Server address (IP or domain). */
  server: string
  /** Server port. */
  port: number
  /** Two-letter country code (ISO 3166-1 alpha-2), e.g. "JP", "US". Null until detected or set. */
  country: string | null
  /** Security layer: "tls", "reality", "none", or null. */
  security: string | null
  /** Transport protocol: "tcp", "ws", "grpc", "quic", "http", or null. */
  transport: string | null
  /** Protocol-specific credentials as JSON. */
  credentialJson: string
  /** Extra fields as JSON. */
  extraJson: string
  /** Optional list position. */
  sortOrder: number | null
  createdAt: string
  updatedAt: string
}

/**
 * The shape used when creating or updating a node. All string fields are user-facing and
 * validated server-side before persistence.
 */
export interface NodeFormData {
  name: string
  type: string
  server: string
  port: number
  country?: string
  security?: string
  transport?: string
  /** A plain object, serialized before storage. */
  credentials?: Record<string, unknown>
  /** A plain object, serialized before storage. */
  extra?: Record<string, unknown>
}

export interface NodeRepository {
  list(): Promise<NodeEntity[]>
  findById(id: string): Promise<NodeEntity | null>
  /** Find multiple nodes by their IDs (missing IDs are omitted from the result). */
  findByIds(ids: string[]): Promise<NodeEntity[]>
  create(data: NodeFormData): Promise<NodeEntity>
  update(id: string, data: Partial<NodeFormData>): Promise<NodeEntity | null>
  deleteById(id: string): Promise<boolean>
  /** Batch delete — returns the number of rows actually deleted. */
  deleteMany(ids: string[]): Promise<number>
  /** Create many nodes at once; returns the created entities. */
  createMany(items: NodeFormData[]): Promise<NodeEntity[]>
  /** Reorder nodes by id list. */
  reorder(orderedIds: string[]): Promise<void>
}

/** The protocol-specific field labels shown in the node editor UI. */
export const PROTOCOL_FIELDS: Record<
  string,
  Array<{ key: string; label: string; placeholder?: string }>
> = {
  ss: [
    { key: "method", label: "加密方式", placeholder: "aes-256-gcm" },
    { key: "password", label: "密码" },
  ],
  ssr: [
    { key: "method", label: "加密方式" },
    { key: "password", label: "密码" },
    { key: "obfs", label: "混淆" },
    { key: "obfsparam", label: "混淆参数" },
    { key: "protocol", label: "协议" },
    { key: "protoparam", label: "协议参数" },
  ],
  vmess: [
    { key: "uuid", label: "UUID" },
    { key: "alterId", label: "Alter ID" },
    { key: "cipher", label: "加密", placeholder: "auto" },
    { key: "network", label: "传输协议", placeholder: "tcp/ws/grpc" },
    { key: "wsPath", label: "WebSocket 路径" },
    { key: "wsHost", label: "WebSocket 主机" },
  ],
  vless: [
    { key: "uuid", label: "UUID" },
    { key: "flow", label: "Flow" },
    { key: "network", label: "传输协议", placeholder: "tcp/ws/grpc" },
    { key: "wsPath", label: "WebSocket 路径" },
    { key: "wsHost", label: "WebSocket 主机" },
    { key: "realityPublicKey", label: "Reality 公钥" },
    { key: "realityShortId", label: "Reality Short ID" },
  ],
  trojan: [
    { key: "password", label: "密码" },
    { key: "sni", label: "SNI" },
  ],
  hysteria: [
    { key: "authStr", label: "认证" },
    { key: "protocol", label: "协议" },
    { key: "up", label: "上行带宽 (Mbps)" },
    { key: "down", label: "下行带宽 (Mbps)" },
    { key: "obfs", label: "混淆" },
    { key: "alpn", label: "ALPN" },
  ],
  hysteria2: [
    { key: "auth", label: "密码" },
    { key: "sni", label: "SNI" },
    { key: "alpn", label: "ALPN" },
  ],
  tuic: [
    { key: "uuid", label: "UUID" },
    { key: "password", label: "密码" },
    { key: "congestionControl", label: "拥塞控制" },
    { key: "alpn", label: "ALPN" },
    { key: "sni", label: "SNI" },
  ],
  anytls: [
    { key: "password", label: "密码" },
    { key: "sni", label: "SNI" },
    { key: "alpn", label: "ALPN" },
  ],
  snell: [
    { key: "psk", label: "PSK" },
    { key: "obfs", label: "混淆" },
    { key: "version", label: "版本" },
  ],
  mieru: [
    { key: "username", label: "用户名" },
    { key: "password", label: "密码" },
    { key: "multiplexingLevel", label: "多路复用级别" },
    { key: "congestionControl", label: "拥塞控制" },
    { key: "mtu", label: "MTU" },
    { key: "pacingWindow", label: "Pacing Window" },
    { key: "streamTimeout", label: "流超时" },
    { key: "handshakeMode", label: "握手模式" },
  ],
  wireguard: [
    { key: "publicKey", label: "公钥" },
    { key: "privateKey", label: "私钥" },
    { key: "presharedKey", label: "预共享密钥" },
    { key: "endpoint", label: "端点" },
    { key: "allowedIPs", label: "允许 IP" },
    { key: "dns", label: "DNS" },
    { key: "mtu", label: "MTU" },
    { key: "persistentKeepalive", label: "持续保活" },
  ],
  socks5: [
    { key: "username", label: "用户名" },
    { key: "password", label: "密码" },
  ],
  http: [
    { key: "username", label: "用户名" },
    { key: "password", label: "密码" },
  ],
  ssh: [
    { key: "hostKey", label: "主机密钥" },
    { key: "username", label: "用户名" },
    { key: "password", label: "密码" },
    { key: "privateKey", label: "私钥" },
  ],
}

/** Known protocol types that have special form fields. */
export const KNOWN_PROTOCOLS = Object.keys(PROTOCOL_FIELDS)
