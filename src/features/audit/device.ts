/**
 * What pulled the subscription, read out of the User-Agent a client announced.
 *
 * Proxy clients identify themselves inconsistently — some send a product token, some a full ad
 * string, some a bare browser UA. The matcher is therefore ordered: the most specific product names
 * first, generic fallbacks last, so "Clash Verge" never collapses into plain "Clash" and a script
 * never passes for a browser.
 */

export interface DeviceInfo {
  /** Human client name, e.g. "Clash Verge"、"sing-box"、"Chrome". Empty for unknown UAs. */
  client: string
  /** Operating system when the UA states one: "Windows"、"Android"、"iOS"、"macOS"、"Linux". */
  os: string
  kind: "app" | "mobile" | "browser" | "terminal" | "unknown"
}

const CLIENT_PATTERNS: Array<{ pattern: RegExp; client: string }> = [
  { pattern: /clashforwindows|clash for windows/i, client: "Clash for Windows" },
  { pattern: /clash-?verge|clashverge/i, client: "Clash Verge" },
  { pattern: /flclash/i, client: "FlClash" },
  { pattern: /clashmetaforandroid/i, client: "Clash Meta for Android" },
  { pattern: /clash\.meta|clash-meta|mihomo/i, client: "Clash Meta (mihomo)" },
  { pattern: /clashx/i, client: "ClashX" },
  { pattern: /clash/i, client: "Clash" },
  { pattern: /\bsfa\b|sing-box.*android/i, client: "sing-box for Android" },
  { pattern: /\bsfi\b/i, client: "sing-box for iOS" },
  { pattern: /\bsfm\b/i, client: "sing-box for macOS" },
  { pattern: /\bsft\b/i, client: "sing-box for TV" },
  { pattern: /sing-?box/i, client: "sing-box" },
  { pattern: /surge\s?mac/i, client: "Surge Mac" },
  { pattern: /surge/i, client: "Surge" },
  { pattern: /shadowrocket/i, client: "Shadowrocket" },
  { pattern: /loon/i, client: "Loon" },
  { pattern: /quantumult/i, client: "Quantumult X" },
  { pattern: /egern/i, client: "Egern" },
  { pattern: /stash/i, client: "Stash" },
  { pattern: /v2rayng/i, client: "v2rayNG" },
  { pattern: /v2rayn/i, client: "v2rayN" },
  { pattern: /nekobox|nekoray/i, client: "NekoBox" },
  { pattern: /hiddify/i, client: "Hiddify" },
  { pattern: /karing/i, client: "Karing" },
  { pattern: /streisand/i, client: "Streisand" },
  { pattern: /pharos/i, client: "Pharos" },
  { pattern: /poonskflow|mihomo-party|clash-party/i, client: "Clash Party" },
  { pattern: /sparrow/i, client: "Sparrow" },
  { pattern: /curl/i, client: "curl" },
  { pattern: /wget/i, client: "wget" },
  { pattern: /python-requests|python-urllib|go-http-client|okhttp|axios/i, client: "脚本请求" },
]

const BROWSER_PATTERNS: Array<{ pattern: RegExp; client: string }> = [
  { pattern: /edg\//i, client: "Edge" },
  { pattern: /opr\/|opera/i, client: "Opera" },
  { pattern: /firefox\//i, client: "Firefox" },
  { pattern: /chrome\//i, client: "Chrome" },
  { pattern: /safari\//i, client: "Safari" },
]

const MOBILE_CLIENTS = new Set([
  "Clash Meta for Android",
  "FlClash",
  "sing-box for Android",
  "sing-box for iOS",
  "sing-box for TV",
  "Surge",
  "Shadowrocket",
  "Loon",
  "Quantumult X",
  "Egern",
  "Stash",
  "v2rayNG",
  "Streisand",
  "Pharos",
  "Sparrow",
  "Clash Party",
])

function parseOs(ua: string): string {
  if (/windows/i.test(ua)) return "Windows"
  if (/android/i.test(ua)) return "Android"
  // Airports' iOS clients often announce just "iOS" beside CFNetwork rather than a device word.
  if (/iphone|ipad|ipod|\bios\b/i.test(ua)) return "iOS"
  if (/mac os x|macintosh|\bmacos\b/i.test(ua)) return "macOS"
  if (/linux/i.test(ua)) return "Linux"
  return ""
}

/** Scripts and downloaders render with a terminal icon, not as if they were proxy apps. */
const TERMINAL_CLIENTS = new Set(["curl", "wget", "脚本请求"])

export function parseUserAgent(ua: string): DeviceInfo {
  const os = parseOs(ua)
  if (!ua.trim()) return { client: "", os, kind: "unknown" }

  for (const { pattern, client } of CLIENT_PATTERNS) {
    if (pattern.test(ua)) {
      if (TERMINAL_CLIENTS.has(client)) return { client, os, kind: "terminal" }
      const mobile = MOBILE_CLIENTS.has(client) || os === "Android" || os === "iOS"
      return { client, os, kind: mobile ? "mobile" : "app" }
    }
  }

  if (/mozilla/i.test(ua)) {
    for (const { pattern, client } of BROWSER_PATTERNS) {
      if (pattern.test(ua)) return { client, os, kind: "browser" }
    }
    return { client: "浏览器", os, kind: "browser" }
  }

  // A non-empty UA nobody matched still deserves the raw string over a blank cell.
  return { client: ua.slice(0, 40), os, kind: "unknown" }
}

/** One line for lists and tables: "Clash Verge · Windows" or the fallback "未知设备". */
export function describeDevice(device: DeviceInfo): string {
  if (!device.client && !device.os) return "未知设备"
  return [device.client, device.os].filter(Boolean).join(" · ") || device.client
}
