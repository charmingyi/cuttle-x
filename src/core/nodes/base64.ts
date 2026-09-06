function normalizeBase64(value: string) {
  const normalized = value.replaceAll(/\s+/g, "").replaceAll("-", "+").replaceAll("_", "/")
  return normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=")
}

export function decodeBase64(value: string) {
  const binary = atob(normalizeBase64(value))
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

export function encodeBase64(value: string, urlSafe = false) {
  const bytes = new TextEncoder().encode(value)
  let binary = ""
  for (const byte of bytes) binary += String.fromCharCode(byte)
  const encoded = btoa(binary)
  return urlSafe
    ? encoded.replaceAll("+", "-").replaceAll("/", "_").replaceAll(/=+$/g, "")
    : encoded
}

/**
 * Xray's Shadowsocks 2022 decoder expects standard Base64 padding on its PSK. Some share-link
 * producers remove the final `=` from a 32-byte key (43 characters instead of 44), even though the
 * outer URI itself may legitimately be unpadded. Only repair a syntactically valid token with the
 * exact unpadded length for a known SS2022 cipher; ordinary passwords and malformed values stay
 * untouched.
 */
export function normalizeShadowsocks2022Password(cipher: unknown, password: unknown) {
  if (typeof cipher !== "string" || typeof password !== "string") return password

  const normalizedCipher = cipher.toLowerCase()
  const keyBytes =
    normalizedCipher === "2022-blake3-aes-128-gcm"
      ? 16
      : normalizedCipher === "2022-blake3-aes-256-gcm" ||
          normalizedCipher === "2022-blake3-chacha20-poly1305"
        ? 32
        : undefined
  if (keyBytes === undefined) return password

  // Existing padding, malformed suffixes, URL-safe alphabets, and whitespace are not rewritten.
  if (password.includes("=") || !/^[A-Za-z0-9+/]+$/.test(password)) return password
  const expectedUnpaddedLength = Math.ceil((keyBytes * 8) / 6)
  if (password.length !== expectedUnpaddedLength) return password
  return `${password}${"=".repeat((4 - (password.length % 4)) % 4)}`
}

export function maybeDecodeBase64(value: string) {
  const compact = value.trim().replaceAll(/\s+/g, "")
  if (!compact || compact.length < 8 || !/^[A-Za-z0-9+/_=-]+$/.test(compact)) return null

  try {
    const decoded = decodeBase64(compact).trim()
    return /(?:^|\n)(?:ss|ssr|vmess|vless|trojan|hysteria2?|hy2|tuic|wireguard|wg|anytls|socks5?|https?):\/\//m.test(
      decoded,
    ) || /(?:^|\n)(?:proxies\s*:|[^\n=]+\s*=\s*[^\n,]+,)/m.test(decoded)
      ? decoded
      : null
  } catch {
    return null
  }
}
