import { createMiddleware } from "@tanstack/react-start"

/**
 * The document shell is re-rendered on every deployment with new hashed asset URLs. A browser that
 * holds a stale HTML document would keep requesting asset files that no longer exist on the edge —
 * the symptoms are broken CSS and a page that only renders after a hard refresh (or in incognito,
 * where nothing is cached).
 *
 * `no-cache` lets the document be stored, but every revisit revalidates it against the origin, so
 * the browser always follows the asset fingerprints of the current deployment. The hashed assets
 * themselves are long-lived and immutable; only the HTML that names them must never go stale.
 *
 * Root route middleware runs for every document request; the route handlers that carry subscription
 * data already set `no-store` themselves and run inside this middleware, so their stronger header
 * wins there.
 */
export const htmlNoCache = createMiddleware({ type: "request" }).server(async ({ next }) => {
  const result = await next()
  const type = result.response.headers.get("Content-Type") ?? ""
  if (type.startsWith("text/html")) {
    result.response.headers.set("Cache-Control", "no-cache")
  }
  return result
})
