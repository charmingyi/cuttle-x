import { env } from "cloudflare:workers"

/**
 * Subscription links must be independent of the management request's path and, when configured, of
 * the hostname through which the operator happened to open the panel. The request origin remains a
 * safe local/development fallback; production should set CUTTLE_PUBLIC_ORIGIN to the canonical host.
 */
export function subscriptionPublicOrigin(requestUrl: string) {
  const configured = env.CUTTLE_PUBLIC_ORIGIN?.trim()
  if (configured) {
    try {
      const url = new URL(configured)
      if (!["http:", "https:"].includes(url.protocol) || !url.hostname) {
        throw new Error("unsupported public origin")
      }
      return url.origin
    } catch {
      throw new Error("CUTTLE_PUBLIC_ORIGIN must be an absolute HTTP(S) URL.")
    }
  }
  return new URL(requestUrl).origin
}
