import { describe, expect, test } from "vitest"
import { AesSubscriptionTokenProtector } from "@/server/subscription-token-protector"

const KEY = "test-link-key-that-is-at-least-thirty-two-bytes"

describe("recoverable subscription tokens", () => {
  test("round-trips without placing the token in the stored value", async () => {
    const protector = new AesSubscriptionTokenProtector(KEY)
    const token = "0123456789abcdef".repeat(4)
    const protectedToken = await protector.protect("subscription-a", token)

    expect(protectedToken).not.toContain(token)
    await expect(protector.recover("subscription-a", protectedToken)).resolves.toBe(token)
  })

  test("binds ciphertext to one subscription id", async () => {
    const protector = new AesSubscriptionTokenProtector(KEY)
    const protectedToken = await protector.protect("subscription-a", "a".repeat(64))

    await expect(protector.recover("subscription-b", protectedToken)).rejects.toThrow(Error)
  })

  test("rejects malformed base64url before attempting decryption", async () => {
    const protector = new AesSubscriptionTokenProtector(KEY)
    await expect(protector.recover("subscription-a", "v1.!!!!.ciphertext")).rejects.toThrow(
      /invalid encoding/,
    )
    await expect(protector.recover("subscription-a", "v1.AA.ciphertext")).rejects.toThrow(
      /invalid nonce/,
    )
  })

  test("rejects tampered ciphertext and a weak encryption key", async () => {
    const protector = new AesSubscriptionTokenProtector(KEY)
    const protectedToken = await protector.protect("subscription-a", "b".repeat(64))
    const [version, nonce, ciphertext] = protectedToken.split(".")
    const index = Math.floor(ciphertext.length / 2)
    const replacement = ciphertext[index] === "A" ? "B" : "A"
    const tampered = `${version}.${nonce}.${ciphertext.slice(0, index)}${replacement}${ciphertext.slice(index + 1)}`

    await expect(protector.recover("subscription-a", tampered)).rejects.toThrow(Error)
    await expect(
      new AesSubscriptionTokenProtector("too-short").protect("subscription-a", "b".repeat(64)),
    ).rejects.toThrow(/at least 32 bytes/)
  })
})
