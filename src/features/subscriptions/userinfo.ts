/**
 * The upstream's own traffic metadata: the `subscription-userinfo` header airports send alongside
 * the node list, forwarded verbatim by the delivery path and surfaced here as the traffic card.
 *
 * `upload=123; download=456; total=789; expire=1700000000` — seconds-since-epoch for `expire`,
 * bytes for the rest. A header that omits fields, or lies with garbage, renders the fields it
 * actually states and no others.
 */

export interface SubscriptionUserinfo {
  upload: number
  download: number
  total: number
  /** Unix seconds; 0 when the upstream did not state one. */
  expire: number
}

export function parseUserinfo(header: string | undefined | null): SubscriptionUserinfo | null {
  if (!header) return null
  const fields: Partial<Record<keyof SubscriptionUserinfo, number>> = {}
  for (const part of header.split(";")) {
    const [rawKey, rawValue] = part.split("=")
    if (!rawKey || rawValue === undefined) continue
    const key = rawKey.trim().toLowerCase() as keyof SubscriptionUserinfo
    if (!["upload", "download", "total", "expire"].includes(key)) continue
    const value = Number(rawValue.trim())
    if (Number.isFinite(value) && value >= 0) fields[key] = value
  }
  if (
    fields.upload === undefined &&
    fields.download === undefined &&
    fields.total === undefined &&
    fields.expire === undefined
  ) {
    return null
  }
  return {
    upload: fields.upload ?? 0,
    download: fields.download ?? 0,
    total: fields.total ?? 0,
    expire: fields.expire ?? 0,
  }
}

/** "1.5 GB" style, binary units — the convention the clients this format serves all use. */
export function formatBytes(bytes: number): string {
  if (bytes <= 0) return "0 B"
  const units = ["B", "KB", "MB", "GB", "TB", "PB"]
  const exponent = Math.min(Math.floor(Math.log2(bytes) / 10), units.length - 1)
  const value = bytes / 2 ** (exponent * 10)
  return `${value >= 100 ? Math.round(value) : value.toFixed(1)} ${units[exponent]}`
}

export interface TrafficSummary {
  used: string
  total: string
  /** 0–100, clamped; undefined when the total is unknown. */
  percent?: number
}

export function trafficSummary(info: SubscriptionUserinfo): TrafficSummary {
  const used = info.upload + info.download
  const summary: TrafficSummary = {
    used: formatBytes(used),
    total: info.total > 0 ? formatBytes(info.total) : "未知",
  }
  if (info.total > 0) summary.percent = Math.min(Math.round((used / info.total) * 100), 100)
  return summary
}
