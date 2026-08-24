import { createMiddleware } from "@tanstack/react-start"

/**
 * The document shell is re-rendered on every deployment with new hashed asset URLs. A browser that
 * holds a stale HTML document would keep requesting asset files that no longer exist on the edge —
 * the symptoms are broken CSS and a page that only renders after a hard refresh (or in incognito,
 * where nothing is cached).
 *
 * `no-store` keeps the document itself out of every cache, and `Clear-Site-Data: "cache"` purges
 * whatever a browser may still hold from earlier deployments (when documents had no cache
 * directives at all). Together they make the bug self-healing: the next navigation re-fetches the
 * document and the browser drops the stale HTML and asset copies it was about to reuse.
 *
 * `"cache"` only clears the HTTP cache, never localStorage, sessionStorage or cookies, so the
 * management session token is untouched. The hashed assets remain long-lived and immutable; only
 * the HTML that names them must never go stale, and HTML answers are never subscription data.
 *
 * Root route middleware runs for every document request; the route handlers that carry subscription
 * data already set `no-store` themselves and run inside this middleware, so their stronger header
 * wins there.
 */
export const htmlNoCache = createMiddleware({ type: "request" }).server(async ({ next }) => {
  const result = await next()
  const type = result.response.headers.get("Content-Type") ?? ""
  if (type.startsWith("text/html")) {
    result.response.headers.set("Cache-Control", "no-store")
    result.response.headers.set("Clear-Site-Data", '"cache"')
  }
  return result
})
