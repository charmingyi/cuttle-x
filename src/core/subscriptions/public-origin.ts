/**
 * A host reserved for documentation or testing, never a real deployment (RFC 2606 — `example`,
 * `invalid`, `test`, and `localhost`). The repository ships one of these as the placeholder value of
 * `CUTTLE_PUBLIC_ORIGIN`, and a deployment that only inherited the placeholder must not write it
 * into links clients are meant to fetch.
 */
function isPlaceholderHost(hostname: string) {
  return /(?:^|\.)(?:example|invalid|test)$/.test(hostname) || hostname === "localhost"
}

/**
 * The origin subscription links are built from: the configured host when there is a real one, and
 * otherwise the origin the operator reached the panel through.
 *
 * A configured value is authoritative — it exists so links survive being opened through a temporary
 * or secondary hostname — but "configured" has to mean a host that could actually be deployed. The
 * placeholder that ships in `wrangler.json` is not one, and it reaches production by two ordinary
 * routes: a plain `wrangler deploy`, and the CI deploy, neither of which passes an override. Treated
 * as a real value it hands out links to `your-domain.example` that no client can fetch.
 */
export function resolvePublicOrigin(configured: string | undefined, requestUrl: string): string {
  const value = configured?.trim()
  if (value) {
    let url: URL
    try {
      url = new URL(value)
    } catch {
      throw new Error("CUTTLE_PUBLIC_ORIGIN must be an absolute HTTP(S) URL.")
    }
    if (!["http:", "https:"].includes(url.protocol) || !url.hostname) {
      throw new Error("CUTTLE_PUBLIC_ORIGIN must be an absolute HTTP(S) URL.")
    }
    if (!isPlaceholderHost(url.hostname)) return url.origin
  }
  return new URL(requestUrl).origin
}
