import { mkdirSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"

/**
 * Workers Assets serves the client bundle (`dist/client`) with the wrangler default
 * `Cache-Control: public, max-age=0, must-revalidate`, which forces a revalidation
 * round trip for every hashed asset on every visit. The files are content-addressed,
 * so they may be stored immutably at the edge for as long as they are referenced.
 *
 * The HTML document itself is rendered by the Worker with `Cache-Control: no-cache`
 * (`html-no-cache.server.ts`), so the browser always follows the fingerprint of the
 * current deployment and stale documents are never used.
 *
 * This writes the `_headers` rules the Workers Assets middleware accepts. It runs
 * after `vite build`, because the build empties the output directory.
 */
const client = resolve(process.cwd(), "dist/client")
const rules = ["/assets/*", "  Cache-Control: public, max-age=31536000, immutable"].join("\n")

mkdirSync(client, { recursive: true })
writeFileSync(resolve(client, "_headers"), `${rules}\n`)
console.log(`Wrote ${resolve(client, "_headers")}`)
