import assert from "node:assert/strict"
import { describe, test } from "vitest"
import { CLIENT_IMPORTS } from "@/features/subscriptions/client-import"
import { formatBytes, parseUserinfo, trafficSummary } from "@/features/subscriptions/userinfo"

describe("parseUserinfo", () => {
  test("reads the fields the upstream states", () => {
    const info = parseUserinfo(
      "upload=1073741824; download=2147483648; total=107374182400; expire=1893456000",
    )
    assert.ok(info)
    assert.equal(info.upload, 1073741824)
    assert.equal(info.download, 2147483648)
    assert.equal(info.total, 107374182400)
    assert.equal(info.expire, 1893456000)
  })

  test("tolerates missing fields and junk", () => {
    const info = parseUserinfo("total=999; nonsense=abc; expire=")
    assert.ok(info)
    assert.equal(info.total, 999)
    assert.equal(info.expire, 0)
    assert.equal(info.upload, 0)
  })

  test("answers null for an absent or empty header", () => {
    assert.equal(parseUserinfo(null), null)
    assert.equal(parseUserinfo(""), null)
    assert.equal(parseUserinfo("   "), null)
    assert.equal(parseUserinfo("no-fields-here"), null)
  })
})

describe("formatBytes", () => {
  test("steps through binary units", () => {
    assert.equal(formatBytes(0), "0 B")
    assert.equal(formatBytes(512), "512 B")
    assert.equal(formatBytes(1024 * 1024), "1.0 MB")
    assert.equal(formatBytes(1.5 * 1024 ** 3), "1.5 GB")
    assert.equal(formatBytes(2 * 1024 ** 4), "2.0 TB")
  })
})

describe("trafficSummary", () => {
  test("percentages are clamped, and unknown totals stay unknown", () => {
    const over = trafficSummary({ upload: 90, download: 20, total: 100, expire: 0 })
    assert.equal(over.percent, 100)
    assert.equal(over.total, "100 B")

    const unknown = trafficSummary({ upload: 1, download: 1, total: 0, expire: 0 })
    assert.equal(unknown.percent, undefined)
    assert.equal(unknown.total, "未知")
  })
})

describe("CLIENT_IMPORTS", () => {
  const url = "https://cuttle.example.com/subscribe/tok-en_1"

  test("wraps the plain URL in each client's documented scheme", () => {
    const clash = CLIENT_IMPORTS.find((c) => c.client.startsWith("Clash"))
    assert.ok(clash)
    assert.equal(clash.href(url), `clash://install-config?url=${encodeURIComponent(url)}`)

    const singbox = CLIENT_IMPORTS.find((c) => c.client === "sing-box")
    assert.ok(singbox)
    assert.equal(singbox.href(url), `sing-box://import-remote?url=${encodeURIComponent(url)}`)
  })

  test("base64s what Shadowrocket expects and JSON-wraps Quantumult X", () => {
    const shadowrocket = CLIENT_IMPORTS.find((c) => c.client === "Shadowrocket")
    assert.ok(shadowrocket)
    assert.equal(shadowrocket.href(url), `sub://${btoa(url)}`)

    const qx = CLIENT_IMPORTS.find((c) => c.client === "Quantumult X")
    assert.ok(qx)
    const decoded = JSON.parse(decodeURIComponent(qx.href(url).split("=")[1] ?? "{}"))
    assert.deepEqual(decoded, { remote_resource: [url] })
  })
})
