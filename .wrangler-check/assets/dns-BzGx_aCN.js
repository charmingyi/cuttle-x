import { resolve4, resolve6 } from "node:dns/promises"
import { isIP } from "node:net"
//#region src/platform/dns.ts
async function resolvePublicHostname(hostname) {
  const normalized = hostname.replaceAll(/^\[|\]$/g, "")
  if (isIP(normalized)) return [normalized]
  const results = await Promise.allSettled([resolve4(normalized), resolve6(normalized)])
  const addresses = results.flatMap((result) => (result.status === "fulfilled" ? result.value : []))
  if (addresses.length === 0) {
    const rejected = results.find((result) => result.status === "rejected")
    throw new Error(`Cannot resolve host ${hostname}.`, {
      cause: rejected?.status === "rejected" ? rejected.reason : void 0,
    })
  }
  return addresses
}
//#endregion
export { resolvePublicHostname as t }
