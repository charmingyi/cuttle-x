import assert from "node:assert/strict"
import { describe, test } from "vitest"
import { describeDevice, parseUserAgent } from "@/features/audit/device"

describe("parseUserAgent", () => {
  test("names the specific client, not its family", () => {
    assert.equal(parseUserAgent("clash-verge/2.0.0").client, "Clash Verge")
    assert.equal(parseUserAgent("ClashMetaForAndroid/2.11").client, "Clash Meta for Android")
    assert.equal(parseUserAgent("SFA/1.8.0 (sing-box 1.8.0)").client, "sing-box for Android")
    assert.equal(parseUserAgent("Surge Mac/2200").client, "Surge Mac")
    assert.equal(parseUserAgent("Surge/1800 iOS").client, "Surge")
  })

  test("reads the operating system", () => {
    assert.equal(parseUserAgent("clash-verge/2.0.0 Windows").os, "Windows")
    assert.equal(parseUserAgent("ClashMetaForAndroid/2.11 Android/14").os, "Android")
    assert.equal(parseUserAgent("Shadowrocket/1993 CFNetwork iOS").os, "iOS")
    assert.equal(parseUserAgent("sing-box/1.8.0 (macOS)").os, "macOS")
  })

  test("classifies by kind so the row can pick an icon", () => {
    assert.equal(parseUserAgent("ClashMetaForAndroid/2.11 Android/14").kind, "mobile")
    assert.equal(parseUserAgent("Mozilla/5.0 (Windows NT 10.0) Chrome/120.0").kind, "browser")
    assert.equal(parseUserAgent("curl/8.4.0").kind, "terminal")
    assert.equal(parseUserAgent("clash-verge/2.0.0 Windows").kind, "app")
  })

  test("resolves a browser engine to a product", () => {
    assert.equal(parseUserAgent("Mozilla/5.0 Windows NT 10.0 Edg/120.0").client, "Edge")
    assert.equal(parseUserAgent("Mozilla/5.0 Chrome/120.0 Safari/537.36").client, "Chrome")
  })

  test("never loses a non-empty UA it does not recognize", () => {
    const mystery = parseUserAgent("SomeProxy/3.1")
    assert.equal(mystery.client, "SomeProxy/3.1")
    assert.equal(mystery.kind, "unknown")
    assert.equal(parseUserAgent("").client, "")
    assert.equal(parseUserAgent("").kind, "unknown")
  })

  test("describes unknown devices in words", () => {
    assert.equal(describeDevice(parseUserAgent("")), "未知设备")
    assert.equal(
      describeDevice(parseUserAgent("clash-verge/2.0.0 Windows")),
      "Clash Verge · Windows",
    )
  })
})
