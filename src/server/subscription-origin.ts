import { env } from "cloudflare:workers"
import { resolvePublicOrigin } from "@/core/subscriptions/public-origin"

/**
 * Subscription links must be independent of the management request's path and, when configured, of
 * the hostname through which the operator happened to open the panel. The request origin remains a
 * safe local/development fallback; production should set CUTTLE_PUBLIC_ORIGIN to the canonical host.
 * What counts as "configured" is decided in `resolvePublicOrigin`, next to the placeholder rule.
 */
export function subscriptionPublicOrigin(requestUrl: string): string {
  return resolvePublicOrigin(env.CUTTLE_PUBLIC_ORIGIN, requestUrl)
}
