import type { SubscriptionTokenProtector } from "@/core/subscriptions"

const encoder = new TextEncoder()
const decoder = new TextDecoder()
const VERSION = "v1"

function base64Url(bytes: Uint8Array) {
  let binary = ""
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "")
}

function fromBase64Url(value: string) {
  if (!/^[A-Za-z0-9_-]+$/.test(value) || value.length % 4 === 1) {
    throw new Error("Stored subscription token has invalid encoding.")
  }
  const encoded = value.replaceAll("-", "+").replaceAll("_", "/")
  const padded = encoded.padEnd(Math.ceil(encoded.length / 4) * 4, "=")
  try {
    const binary = atob(padded)
    return Uint8Array.from(binary, (character) => character.charCodeAt(0))
  } catch (error) {
    throw new Error("Stored subscription token has invalid encoding.", { cause: error })
  }
}

async function encryptionKey(secret: string) {
  const normalized = secret.trim()
  if (encoder.encode(normalized).byteLength < 32) {
    throw new Error("CUTTLE_LINK_KEY must contain at least 32 bytes.")
  }
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
export class AesSubscriptionTokenProtector implements SubscriptionTokenProtector {
  constructor(private readonly secret: string) {}

  async protect(subscriptionId: string, token: string) {
    const iv = crypto.getRandomValues(new Uint8Array(12))
    const ciphertext = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv, additionalData: encoder.encode(subscriptionId) },
      await encryptionKey(this.secret),
      encoder.encode(token),
    )
    return `${VERSION}.${base64Url(iv)}.${base64Url(new Uint8Array(ciphertext))}`
  }

  async recover(subscriptionId: string, protectedToken: string) {
    const [version, encodedIv, encodedCiphertext, extra] = protectedToken.split(".")
    if (version !== VERSION || !encodedIv || !encodedCiphertext || extra !== undefined) {
      throw new Error("Stored subscription token has an unsupported format.")
    }
    const iv = fromBase64Url(encodedIv)
    if (iv.byteLength !== 12) throw new Error("Stored subscription token has an invalid nonce.")
    const plaintext = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv, additionalData: encoder.encode(subscriptionId) },
      await encryptionKey(this.secret),
      fromBase64Url(encodedCiphertext),
    )
    return decoder.decode(plaintext)
  }
}
