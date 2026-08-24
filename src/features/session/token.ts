import { batch, createAtom } from "@tanstack/react-store"
import type { BaseAtom } from "@tanstack/react-store"
import { useCallback, useSyncExternalStore } from "react"

/**
 * Everything this browser session knows about the admin key: the key, whether it has been verified,
 * and whether the admin API has turned it down. A key restored from sessionStorage starts unverified;
 * the connection gate proves it again before protected content renders.
 *
 * `createAtom` and `batch` come from `@tanstack/react-store` rather than `@tanstack/store`: the core
 * package is not a direct dependency, and the React one re-exports all of it.
 *
 * Two atoms rather than one store because the two change on their own schedules and every reader
 * wants exactly one of them — a store would put a selector in front of every read to get back the
 * granularity atoms already have. `batch` is what makes the pair that must move together move
 * together (`setToken`).
 */

const STORAGE_KEY = "cuttle:token"

/**
 * The values the server rendered with, and therefore the values hydration has to render with. They
 * are not the atoms' current values: in a browser the key atom is seeded from sessionStorage before
 * hydration begins, which is the whole point of `useAtomValue` pinning these.
 */
const SERVER_TOKEN = ""
const SERVER_REFUSED = false
const SERVER_VERIFIED = false

/**
 * The key the previous page load left behind, read once at module scope. The client bundle evaluates
 * this before `hydrateRoot`, so the key is known from the first browser tick and no separate "have we
 * looked yet" state has to exist.
 *
 * Every server render lands in the guard instead: workerd has no sessionStorage, and this module is
 * loaded there — `readToken` is what the admin function middleware sends.
 */
function storedToken() {
  try {
    if (typeof sessionStorage === "undefined") return SERVER_TOKEN
    return (sessionStorage.getItem(STORAGE_KEY) ?? "").trim()
  } catch {
    // Storage is not only sometimes absent, it is sometimes denied — blocked cookies, a sandboxed
    // frame — and in that case even reading the property throws. This runs while the module is being
    // evaluated, so an escaping exception would take the whole client bundle down and with it the
    // workbench, which needs no key at all. A session without storage is a session without a
    // remembered key; that is all it is.
    return SERVER_TOKEN
  }
}

const tokenAtom = createAtom(storedToken())
const refusedAtom = createAtom(false)
const verifiedAtom = createAtom(false)

/**
 * The store is module-scoped, and a Worker isolate serves many requests from one module scope: a
 * write reaching the server would hand one visitor's credential to the next. Every writer below is
 * called from a browser event, a browser effect or the query cache in a browser, so this asserts the
 * invariant rather than defending a case that exists — if it ever throws, a credential just crossed a
 * boundary it must not cross.
 */
function assertBrowserSession(action: string) {
  // `window`, not `sessionStorage`: the question is whether this is a document, and reading the
  // storage property can itself throw where storage is denied — which is a browser the key may still
  // live in for one document.
  if (typeof window !== "undefined") return
  throw new Error(`refusing to ${action} outside a browser session`)
}

/**
 * Best effort, and deliberately: where storage is denied the key still works for this document, and
 * refusing to connect over it would cost the operator a working session to gain nothing. What is lost
 * is only the remembering.
 */
function persistToken(token: string) {
  try {
    if (token) sessionStorage.setItem(STORAGE_KEY, token)
    else sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    // A session without storage is a session without a remembered key.
  }
}

/** The key itself, for the one caller that is not a component: the admin function middleware. */
export function readToken() {
  return tokenAtom.get()
}

/**
 * Whether this session holds a key at all. What the key is worth is the API's answer, never this
 * module's: the operator chooses the token, so its shape carries no local verdict.
 *
 * Trimmed to match `authorizeAdminRequest` (`@/server/admin-auth`), which decides what surrounding
 * whitespace means. Blank is not a key.
 */
export function hasToken(token: string) {
  return token.trim().length > 0
}

/**
 * The one way the key changes. A key that has just arrived is not yet verified or refused; the caller
 * marks it verified only after the server probe succeeds. Clearing the refusal here rather than at each
 * call site keeps the key and its verdict together.
 *
 * Batched so no reader ever sees half of it: without this, a subscriber woken by the key could read a
 * refusal that belongs to the key before it.
 */
function setToken(token: string, verified = false) {
  batch(() => {
    tokenAtom.set(token)
    refusedAtom.set(false)
    verifiedAtom.set(verified)
  })
}

/**
 * Takes a server-verified key for this session and keeps it for the rest of it. Committing and
 * persisting are one step because they were never separable: a key held only in memory is gone on the next reload, and
 * one written to storage without being held is a key nothing sends.
 */
export function commitToken(token: string) {
  assertBrowserSession("commit an admin key")
  setToken(token, true)
  persistToken(token)
}

/** Drops the key from this session and from the browser. */
export function clearToken() {
  assertBrowserSession("clear an admin key")
  persistToken("")
  setToken("")
}

/**
 * The admin API turned down the key this session holds. Nothing local decides this and nothing local
 * takes it back: only the next key clears it, through `setToken`.
 */
export function noteTokenRefused() {
  assertBrowserSession("record an admin key refusal")
  batch(() => {
    refusedAtom.set(true)
    verifiedAtom.set(false)
  })
}

export function noteTokenVerified() {
  assertBrowserSession("record an admin key verification")
  verifiedAtom.set(true)
}

/**
 * Reads an atom in a component, pinning hydration to the value the server rendered.
 *
 * Deliberately not `useSelector` from `@tanstack/react-store`, which is otherwise exactly this: it
 * passes its `getSnapshot` as the server snapshot too. Since the key atom is seeded from
 * sessionStorage at module scope, `get()` disagrees with the server's HTML from the very first tick,
 * so that hook would hydrate a restored key against markup that says there is none. The pinned
 * snapshot is what makes the seeding safe; the two are one design and cannot be separated.
 */
function useAtomValue<T>(atom: BaseAtom<T>, server: T) {
  const subscribe = useCallback(
    (onChange: () => void) => atom.subscribe(onChange).unsubscribe,
    [atom],
  )
  const get = useCallback(() => atom.get(), [atom])
  const getServer = useCallback(() => server, [server])
  return useSyncExternalStore(subscribe, get, getServer)
}

export function useToken() {
  return useAtomValue(tokenAtom, SERVER_TOKEN)
}

export function useTokenRefused() {
  return useAtomValue(refusedAtom, SERVER_REFUSED)
}

export function useTokenVerified() {
  return useAtomValue(verifiedAtom, SERVER_VERIFIED)
}

/** Whether this browser has a non-refused key that the server has explicitly verified. */
export function useTokenUsable() {
  const held = hasToken(useToken())
  const refused = useTokenRefused()
  const verified = useTokenVerified()
  return held && verified && !refused
}
