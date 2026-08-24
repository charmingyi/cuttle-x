import { t as adminFunctionMiddleware } from "./admin-function-D_xAk7Bk.js"
import { t as createServerFn } from "./createServerFn-DRD1-jCn.js"
import { t as createServerRpc } from "./createServerRpc-D-yeXwOu.js"
import { t as resolvePublicHostname } from "./dns-BzGx_aCN.js"
import { g as ValidationError, x as AdminFailure } from "./nodes-b2qYjNQG.js"
import {
  o as readSubscriptionSource,
  s as subscriptionSourceHosts,
} from "./subscriptions-D1og5ExQ.js"
//#region src/server/remote-source.ts
function readRemoteSource$2(urls) {
  const source = {
    type: "remote",
    urls,
  }
  return readSubscriptionSource(source, {
    allowedHosts: subscriptionSourceHosts(source),
    resolveHost: resolvePublicHostname,
  })
}
//#endregion
//#region src/features/extract/api/operations.ts
function requestedUrls(input) {
  const urls = input?.urls
  if (!Array.isArray(urls)) return []
  return urls
    .filter((item) => typeof item === "string" && Boolean(item.trim()))
    .map((url) => url.trim())
}
async function readRemoteSource$1(input) {
  const urls = requestedUrls(input)
  if (urls.length === 0)
    throw new AdminFailure("invalid_request", "urls must be a non-empty array of strings.")
  try {
    const resolved = await readRemoteSource$2(urls)
    if (resolved.kind === "unavailable")
      throw new AdminFailure("upstream_unavailable", resolved.error.message, {
        cause: resolved.error,
      })
    return { content: resolved.source.content }
  } catch (error) {
    if (error instanceof ValidationError)
      throw new AdminFailure("invalid_definition", error.message, { cause: error })
    throw error
  }
}
//#endregion
//#region src/features/extract/api/server-fn.ts?tss-serverfn-split
/**
 * The browser's side of the channel, mirroring `subscriptions/api/server-fn.ts`: the handler body
 * is stripped from the client build by the Start plugin, so importing server-only code here is
 * safe, and a stripping failure is a build-time error (`cloudflare:workers` unresolvable), not a
 * silent leak.
 */
const readRemoteSource_createServerFn_handler = createServerRpc(
  {
    id: "997c5ebbff41e37d0a9bdf27c3cde5d12f9a18007caf5a3a9c6549b6cba4bb9d",
    name: "readRemoteSource",
    filename: "src/features/extract/api/server-fn.ts",
  },
  (opts) => readRemoteSource.__executeServer(opts),
)
const readRemoteSource = createServerFn({ method: "POST" })
  .middleware([adminFunctionMiddleware])
  .validator((input) => input)
  .handler(readRemoteSource_createServerFn_handler, ({ data }) => readRemoteSource$1(data))
//#endregion
export { readRemoteSource_createServerFn_handler }
