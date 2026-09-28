import assert from "node:assert/strict"
import { describe, test } from "vitest"
import { resolvePublicOrigin } from "@/core/subscriptions/public-origin"

/**
 * Which origin ends up inside a subscription link.
 *
 * The stakes are asymmetric: a link built from the request origin always resolves for the client
 * that is about to fetch it, while a link built from a placeholder resolves for nobody. The
 * placeholder ships in `wrangler.json` and reaches production through a plain `wrangler deploy`,
 * which is why it has to be recognised rather than trusted.
 */
describe("resolvePublicOrigin", () => {
  test("a configured deployment host wins over the request origin", () => {
    assert.equal(
      resolvePublicOrigin("https://cuttle.example.org", "https://panel.internal:3000/nodes"),
      "https://cuttle.example.org",
    )
  })

  test("the shipped placeholder falls back to the request origin", () => {
    assert.equal(
      resolvePublicOrigin("https://your-domain.example", "http://localhost:3000/nodes"),
      "http://localhost:3000",
    )
    assert.equal(
      resolvePublicOrigin("https://cuttle.example", "https://cuttle.acct.workers.dev/nodes"),
      "https://cuttle.acct.workers.dev",
    )
  })

  test("a subdomain of a placeholder is a placeholder too", () => {
    assert.equal(
      resolvePublicOrigin("https://cuttle.your-domain.example", "https://real.workers.dev/x"),
      "https://real.workers.dev",
    )
  })

  test("a real domain that merely contains the word is left alone", () => {
    assert.equal(
      resolvePublicOrigin("https://cuttle.example.com", "https://real.workers.dev/x"),
      "https://cuttle.example.com",
    )
  })

  test("absent or blank configuration falls back to the request origin", () => {
    assert.equal(
      resolvePublicOrigin(undefined, "https://real.workers.dev/x"),
      "https://real.workers.dev",
    )
    assert.equal(
      resolvePublicOrigin("   ", "https://real.workers.dev/x"),
      "https://real.workers.dev",
    )
  })

  test("a configured value still has to be an absolute HTTP(S) URL", () => {
    assert.throws(() => resolvePublicOrigin("not a url", "https://real.workers.dev/x"))
    assert.throws(() => resolvePublicOrigin("ftp://example.org", "https://real.workers.dev/x"))
  })
})
