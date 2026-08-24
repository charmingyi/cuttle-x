import { describe, expect, test } from "vitest"
import { readJsonBody } from "@/server/request-body"

describe("JSON management request bodies", () => {
  test("accepts JSON null without throwing a type error", async () => {
    await expect(
      readJsonBody(new Request("https://example.com", { body: "null", method: "POST" })),
    ).resolves.toBeNull()
  })

  test("maps malformed JSON to an invalid request", async () => {
    await expect(
      readJsonBody(new Request("https://example.com", { body: "{", method: "POST" })),
    ).rejects.toMatchObject({
      code: "invalid_request",
    })
  })

  test("rejects oversized JSON bodies before parsing", async () => {
    const body = JSON.stringify({ content: "x".repeat(2 * 1024 * 1024 + 64 * 1024) })
    await expect(
      readJsonBody(new Request("https://example.com", { body, method: "POST" })),
    ).rejects.toMatchObject({ code: "payload_too_large" })
  })
})
