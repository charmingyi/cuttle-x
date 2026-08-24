import { env } from "cloudflare:workers"
import { c as require_react, u as __toESM } from "./createMiddleware-CkzUAgXb.js"
//#region node_modules/.pnpm/@tanstack+store@0.11.1/node_modules/@tanstack/store/dist/alien.js
/* @__NO_SIDE_EFFECTS__ */
function createReactiveSystem({ update, notify, unwatched }) {
  return {
    link,
    unlink,
    propagate,
    checkDirty,
    shallowPropagate,
  }
  function link(dep, sub, version) {
    const prevDep = sub.depsTail
    if (prevDep !== void 0 && prevDep.dep === dep) return
    const nextDep = prevDep !== void 0 ? prevDep.nextDep : sub.deps
    if (nextDep !== void 0 && nextDep.dep === dep) {
      nextDep.version = version
      sub.depsTail = nextDep
      return
    }
    const prevSub = dep.subsTail
    if (prevSub !== void 0 && prevSub.version === version && prevSub.sub === sub) return
    const newLink =
      (sub.depsTail =
      dep.subsTail =
        {
          version,
          dep,
          sub,
          prevDep,
          nextDep,
          prevSub,
          nextSub: void 0,
        })
    if (nextDep !== void 0) nextDep.prevDep = newLink
    if (prevDep !== void 0) prevDep.nextDep = newLink
    else sub.deps = newLink
    if (prevSub !== void 0) prevSub.nextSub = newLink
    else dep.subs = newLink
  }
  function unlink(link, sub = link.sub) {
    const dep = link.dep
    const prevDep = link.prevDep
    const nextDep = link.nextDep
    const nextSub = link.nextSub
    const prevSub = link.prevSub
    if (nextDep !== void 0) nextDep.prevDep = prevDep
    else sub.depsTail = prevDep
    if (prevDep !== void 0) prevDep.nextDep = nextDep
    else sub.deps = nextDep
    if (nextSub !== void 0) nextSub.prevSub = prevSub
    else dep.subsTail = prevSub
    if (prevSub !== void 0) prevSub.nextSub = nextSub
    else if ((dep.subs = nextSub) === void 0) unwatched(dep)
    return nextDep
  }
  function propagate(link) {
    let next = link.nextSub
    let stack
    top: do {
      const sub = link.sub
      let flags = sub.flags
      if (!(flags & 60)) sub.flags = flags | 32
      else if (!(flags & 12)) flags = 0
      else if (!(flags & 4)) sub.flags = (flags & -9) | 32
      else if (!(flags & 48) && isValidLink(link, sub)) {
        sub.flags = flags | 40
        flags &= 1
      } else flags = 0
      if (flags & 2) notify(sub)
      if (flags & 1) {
        const subSubs = sub.subs
        if (subSubs !== void 0) {
          const nextSub = (link = subSubs).nextSub
          if (nextSub !== void 0) {
            stack = {
              value: next,
              prev: stack,
            }
            next = nextSub
          }
          continue
        }
      }
      if ((link = next) !== void 0) {
        next = link.nextSub
        continue
      }
      while (stack !== void 0) {
        link = stack.value
        stack = stack.prev
        if (link !== void 0) {
          next = link.nextSub
          continue top
        }
      }
      break
    } while (true)
  }
  function checkDirty(link, sub) {
    let stack
    let checkDepth = 0
    let dirty = false
    top: do {
      const dep = link.dep
      const flags = dep.flags
      if (sub.flags & 16) dirty = true
      else if ((flags & 17) === 17) {
        if (update(dep)) {
          const subs = dep.subs
          if (subs.nextSub !== void 0) shallowPropagate(subs)
          dirty = true
        }
      } else if ((flags & 33) === 33) {
        if (link.nextSub !== void 0 || link.prevSub !== void 0)
          stack = {
            value: link,
            prev: stack,
          }
        link = dep.deps
        sub = dep
        ++checkDepth
        continue
      }
      if (!dirty) {
        const nextDep = link.nextDep
        if (nextDep !== void 0) {
          link = nextDep
          continue
        }
      }
      while (checkDepth--) {
        const firstSub = sub.subs
        const hasMultipleSubs = firstSub.nextSub !== void 0
        if (hasMultipleSubs) {
          link = stack.value
          stack = stack.prev
        } else link = firstSub
        if (dirty) {
          if (update(sub)) {
            if (hasMultipleSubs) shallowPropagate(firstSub)
            sub = link.sub
            continue
          }
          dirty = false
        } else sub.flags &= -33
        sub = link.sub
        const nextDep = link.nextDep
        if (nextDep !== void 0) {
          link = nextDep
          continue top
        }
      }
      return dirty
    } while (true)
  }
  function shallowPropagate(link) {
    do {
      const sub = link.sub
      const flags = sub.flags
      if ((flags & 48) === 32) {
        sub.flags = flags | 16
        if ((flags & 6) === 2) notify(sub)
      }
    } while ((link = link.nextSub) !== void 0)
  }
  function isValidLink(checkLink, sub) {
    let link = sub.depsTail
    while (link !== void 0) {
      if (link === checkLink) return true
      link = link.prevDep
    }
    return false
  }
}
//#endregion
//#region node_modules/.pnpm/@tanstack+store@0.11.1/node_modules/@tanstack/store/dist/atom.js
function toObserver(nextHandler, errorHandler, completionHandler) {
  const isObserver = typeof nextHandler === "object"
  const self = isObserver ? nextHandler : void 0
  return {
    next: (isObserver ? nextHandler.next : nextHandler)?.bind(self),
    error: (isObserver ? nextHandler.error : errorHandler)?.bind(self),
    complete: (isObserver ? nextHandler.complete : completionHandler)?.bind(self),
  }
}
const queuedEffects = []
let cycle = 0
const { link, unlink, propagate, checkDirty, shallowPropagate } =
  /* @__PURE__ */ createReactiveSystem({
    update(atom) {
      return atom._update()
    },
    notify(effect) {
      queuedEffects[queuedEffectsLength++] = effect
      effect.flags &= -3
    },
    unwatched(atom) {
      if (atom.depsTail !== void 0) {
        atom.depsTail = void 0
        atom.flags = 17
        purgeDeps(atom)
      }
    },
  })
let notifyIndex = 0
let queuedEffectsLength = 0
let activeSub
let batchDepth = 0
function batch(fn) {
  try {
    ++batchDepth
    fn()
  } finally {
    if (!--batchDepth) flush()
  }
}
function purgeDeps(sub) {
  const depsTail = sub.depsTail
  let dep = depsTail !== void 0 ? depsTail.nextDep : sub.deps
  while (dep !== void 0) dep = unlink(dep, sub)
}
function flush() {
  if (batchDepth > 0) return
  while (notifyIndex < queuedEffectsLength) {
    const effect = queuedEffects[notifyIndex]
    queuedEffects[notifyIndex++] = void 0
    effect.notify()
  }
  notifyIndex = 0
  queuedEffectsLength = 0
}
function createAtom(valueOrFn, options) {
  const isComputed = typeof valueOrFn === "function"
  const getter = valueOrFn
  const atom = {
    _snapshot: isComputed ? void 0 : valueOrFn,
    subs: void 0,
    subsTail: void 0,
    deps: void 0,
    depsTail: void 0,
    flags: isComputed ? 0 : 1,
    get() {
      if (activeSub !== void 0) link(atom, activeSub, cycle)
      return atom._snapshot
    },
    subscribe(observerOrFn) {
      const obs = toObserver(observerOrFn)
      const observed = { current: false }
      const e = effect(() => {
        atom.get()
        if (!observed.current) observed.current = true
        else obs.next?.(atom._snapshot)
      })
      return {
        unsubscribe: () => {
          e.stop()
        },
      }
    },
    _update(getValue) {
      const prevSub = activeSub
      const compare = options?.compare ?? Object.is
      if (isComputed) {
        activeSub = atom
        ++cycle
        atom.depsTail = void 0
      } else if (getValue === void 0) return false
      if (isComputed) atom.flags = 5
      try {
        const oldValue = atom._snapshot
        const newValue =
          typeof getValue === "function"
            ? getValue(oldValue)
            : getValue === void 0 && isComputed
              ? getter(oldValue)
              : getValue
        if (oldValue === void 0 || !compare(oldValue, newValue)) {
          atom._snapshot = newValue
          return true
        }
        return false
      } finally {
        activeSub = prevSub
        if (isComputed) atom.flags &= -5
        purgeDeps(atom)
      }
    },
  }
  if (isComputed) {
    atom.flags = 17
    atom.get = function () {
      const flags = atom.flags
      if (flags & 16 || (flags & 32 && checkDirty(atom.deps, atom))) {
        if (atom._update()) {
          const subs = atom.subs
          if (subs !== void 0) shallowPropagate(subs)
        }
      } else if (flags & 32) atom.flags = flags & -33
      if (activeSub !== void 0) link(atom, activeSub, cycle)
      return atom._snapshot
    }
  } else
    atom.set = function (valueOrFn) {
      if (atom._update(valueOrFn)) {
        const subs = atom.subs
        if (subs !== void 0) {
          propagate(subs)
          shallowPropagate(subs)
          flush()
        }
      }
    }
  return atom
}
function effect(fn) {
  const run = () => {
    const prevSub = activeSub
    activeSub = effectObj
    ++cycle
    effectObj.depsTail = void 0
    effectObj.flags = 6
    try {
      return fn()
    } finally {
      activeSub = prevSub
      effectObj.flags &= -5
      purgeDeps(effectObj)
    }
  }
  const effectObj = {
    deps: void 0,
    depsTail: void 0,
    subs: void 0,
    subsTail: void 0,
    flags: 6,
    notify() {
      const flags = this.flags
      if (flags & 16 || (flags & 32 && checkDirty(this.deps, this))) run()
      else this.flags = 2
    },
    stop() {
      this.flags = 0
      this.depsTail = void 0
      purgeDeps(this)
    },
  }
  run()
  return effectObj
}
//#endregion
//#region src/features/session/token.ts
const import_react = /* @__PURE__ */ __toESM(require_react(), 1)
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
function assertBrowserSession(action) {
  if (typeof window !== "undefined") return
  throw new Error(`refusing to ${action} outside a browser session`)
}
/**
 * Best effort, and deliberately: where storage is denied the key still works for this document, and
 * refusing to connect over it would cost the operator a working session to gain nothing. What is lost
 * is only the remembering.
 */
function persistToken(token) {
  try {
    if (token) sessionStorage.setItem(STORAGE_KEY, token)
    else sessionStorage.removeItem(STORAGE_KEY)
  } catch {}
}
/** The key itself, for the one caller that is not a component: the admin function middleware. */
function readToken() {
  return tokenAtom.get()
}
/**
 * Whether this session holds a key at all. What the key is worth is the API's answer, never this
 * module's: the operator chooses the token, so its shape carries no local verdict.
 *
 * Trimmed to match `authorizeAdminRequest` (`@/server/admin-auth`), which decides what surrounding
 * whitespace means. Blank is not a key.
 */
function hasToken(token) {
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
function setToken(token, verified = false) {
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
function commitToken(token) {
  assertBrowserSession("commit an admin key")
  setToken(token, true)
  persistToken(token)
}
/** Drops the key from this session and from the browser. */
function clearToken() {
  assertBrowserSession("clear an admin key")
  persistToken("")
  setToken("")
}
/**
 * The admin API turned down the key this session holds. Nothing local decides this and nothing local
 * takes it back: only the next key clears it, through `setToken`.
 */
function noteTokenRefused() {
  assertBrowserSession("record an admin key refusal")
  batch(() => {
    refusedAtom.set(true)
    verifiedAtom.set(false)
  })
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
function useAtomValue(atom, server) {
  const subscribe = (0, import_react.useCallback)(
    (onChange) => atom.subscribe(onChange).unsubscribe,
    [atom],
  )
  const get = (0, import_react.useCallback)(() => atom.get(), [atom])
  const getServer = (0, import_react.useCallback)(() => server, [server])
  return (0, import_react.useSyncExternalStore)(subscribe, get, getServer)
}
function useToken() {
  return useAtomValue(tokenAtom, SERVER_TOKEN)
}
function useTokenRefused() {
  return useAtomValue(refusedAtom, SERVER_REFUSED)
}
function useTokenVerified() {
  return useAtomValue(verifiedAtom, SERVER_VERIFIED)
}
/** Whether this browser has a non-refused key that the server has explicitly verified. */
function useTokenUsable() {
  const held = hasToken(useToken())
  const refused = useTokenRefused()
  const verified = useTokenVerified()
  return held && verified && !refused
}
//#endregion
//#region src/server/admin-throttle.ts
const WINDOW_MS = 9e5
const LOCK_MS = 9e5
const FAILURE_LIMIT = 5
const MAX_ENTRIES = 512
const attempts = /* @__PURE__ */ new Map()
let callsSincePrune = 0
function clientKey(request) {
  return request.headers.get("CF-Connecting-IP")?.trim() || "unknown"
}
function prune(now) {
  callsSincePrune += 1
  if (callsSincePrune < 128 && attempts.size <= MAX_ENTRIES) return
  callsSincePrune = 0
  for (const [key, state] of attempts)
    if (state.lockedUntil <= now && state.windowStartedAt + WINDOW_MS <= now) attempts.delete(key)
  while (attempts.size > MAX_ENTRIES) {
    const oldest = attempts.keys().next().value
    if (oldest === void 0) break
    attempts.delete(oldest)
  }
}
/**
 * Per-isolate backoff for the single shared admin password. Cloudflare supplies the client address;
 * local development deliberately falls into one shared bucket. This is a floor under the public
 * password verifier, not a claim of global rate limiting: deployments that need a global boundary
 * should additionally configure a Cloudflare Rate Limiting rule.
 */
function adminThrottle(request, now = Date.now()) {
  prune(now)
  const key = clientKey(request)
  const state = attempts.get(key)
  return {
    blocked: Boolean(state && state.lockedUntil > now),
    clear() {
      attempts.delete(key)
    },
    fail() {
      const current = attempts.get(key)
      if (!current || current.windowStartedAt + WINDOW_MS <= now) {
        attempts.set(key, {
          failures: 1,
          lockedUntil: 0,
          windowStartedAt: now,
        })
        return false
      }
      current.failures += 1
      if (current.failures >= FAILURE_LIMIT) current.lockedUntil = now + LOCK_MS
      attempts.set(key, current)
      return current.lockedUntil > now
    },
  }
}
//#endregion
//#region src/server/admin-auth.ts
/** workerd's own addition to WebCrypto; the DOM lib this project also compiles against omits it. */
const subtle = crypto.subtle
function providedAdminToken(request) {
  const authorization = request.headers.get("Authorization")
  return authorization?.startsWith("Bearer ") ? authorization.slice(7).trim() : ""
}
/**
 * A request that carries no credential at all, or arrives at a deployment with none configured, is
 * turned away immediately. Everything past that point compares digests in constant time, so a wrong
 * key reveals nothing by how long it took to reject.
 *
 * The token's own strength is the operator's choice: any non-empty value is honoured. An absent,
 * empty or blank one authorizes nothing, because a request must present something and no digest
 * matches it.
 *
 * Both sides are trimmed, and this is the only place that decides what a token's surrounding
 * whitespace means: a secret hand-written into a dotenv file carries a stray newline far more often
 * than anyone intends one, and a credential nobody can type is worse than a short one.
 *
 * Both doors — `adminOnly` (`@/middleware/admin-only.server`) for `/api/v1/*` and
 * `adminFunctionMiddleware` (`@/middleware/admin-function`) for the server function channel — call
 * this same function, so the timing-safe comparison has one implementation.
 *
 * Server-only, and unavoidably so: `env` does not resolve in a browser. That matters because
 * `adminFunctionMiddleware` (`@/middleware/admin-function`) is loaded by the browser in full, and
 * `vite dev` evaluates every top-level import of a loaded file regardless of which export a caller
 * uses. What keeps this module out of the browser is the Start plugin stripping the `.server()`
 * callback body — and its import of this file with it — from the client build. That stripping is
 * the entire guarantee, so changing the imports here means re-checking it: load an admin page under
 * `vite dev` and confirm the client transform of `admin-function.ts` never mentions
 * `cloudflare:workers`. `adminOnly` needs none of this and lives under `src/middleware/` with a
 * `.server.ts` suffix, which the browser never loads at all.
 */
async function authorizeAdminRequest(request) {
  const provided = providedAdminToken(request)
  const expected = env.CUTTLE_TOKEN?.trim()
  if (!provided || !expected) return "unauthorized"
  const throttle = adminThrottle(request)
  if (throttle.blocked) return "rate_limited"
  const encoder = new TextEncoder()
  const [providedHash, expectedHash] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(provided)),
    crypto.subtle.digest("SHA-256", encoder.encode(expected)),
  ])
  if (subtle.timingSafeEqual(providedHash, expectedHash)) {
    throttle.clear()
    return "authorized"
  }
  return throttle.fail() ? "rate_limited" : "unauthorized"
}
//#endregion
//#region src/shared/admin-error.ts
const ADMIN_ERROR_CODES = [
  "invalid_request",
  "conflict",
  "rate_limited",
  "unauthorized",
  "not_found",
  "payload_too_large",
  "invalid_definition",
  "upstream_unavailable",
  "internal",
]
/**
 * The two answers neither door may vary. `internal` never states what actually broke — that goes to
 * the log — and `unauthorized` never says why, so a caller cannot probe for the reason. Both doors
 * (`middleware/admin-only.server.ts` for `/api/v1/*`, `middleware/admin-function.ts` for the server
 * function channel) read them from here rather than each spelling them out.
 */
const INTERNAL_MESSAGE = "Internal server error."
const RATE_LIMITED_MESSAGE = "Too many failed attempts. Try again later."
const UNAUTHORIZED_MESSAGE = "Unauthorized."
const AdminFailure = class extends Error {
  code
  constructor(code, message, options) {
    super(message, options)
    this.code = code
    this.name = "AdminFailure"
  }
}
//#endregion
//#region src/shared/api-error.ts
const ApiError = class extends Error {
  code
  constructor(code, message) {
    super(message)
    this.code = code
    this.name = "ApiError"
  }
}
function isErrorCode(value) {
  return typeof value === "string" && ADMIN_ERROR_CODES.includes(value)
}
const CODE_SEPARATOR = "\0"
function messageWithCode(code, message) {
  return `${code}${CODE_SEPARATOR}${message}`
}
function apiErrorFromMessage(error) {
  if (error instanceof ApiError || !(error instanceof Error)) return error
  const separator = error.message.indexOf(CODE_SEPARATOR)
  if (separator === -1) return error
  const code = error.message.slice(0, separator)
  return isErrorCode(code) ? new ApiError(code, error.message.slice(separator + 1)) : error
}
//#endregion
//#region src/core/errors.ts
const ValidationError = class extends Error {
  constructor(message, options) {
    super(message, options)
    this.name = "ValidationError"
  }
}
const ConflictError = class extends Error {
  constructor(message, options) {
    super(message, options)
    this.name = "ConflictError"
  }
}
//#endregion
//#region src/core/nodes/values.ts
/**
 * The value coercions every reader and writer in this module shares. A coercion that disagrees with
 * itself across formats is how one format comes to accept a node another rejects.
 */
function asRecord(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : null
}
function asArray(value) {
  return Array.isArray(value) ? value : []
}
function asString(value) {
  return typeof value === "string" && value.length > 0 ? value : void 0
}
const MAX_PORT = 65535
/**
 * Whether a value is a port a client could dial, and the only statement of that range.
 *
 * Read by the URI and document readers through `asPort`, by Canonical Validation, and by the
 * `filter-useless` rule — three places that had drifted into three spellings of one bound.
 */
function isDialablePort(value) {
  return typeof value === "number" && Number.isInteger(value) && value > 0 && value <= MAX_PORT
}
/**
 * A port a client could dial, or nothing. Named for what it checks rather than for the type it
 * returns: the bound is the port range, so a reader that wanted any number at all — a bandwidth, a
 * timeout — silently loses every value above 65535, and every value that is not a whole one.
 */
function asPort(value) {
  const number = typeof value === "number" ? value : Number(value)
  return isDialablePort(number) ? number : void 0
}
/**
 * A link speed in megabits. `0` is a value here rather than silence — Hysteria reads it as "do not
 * shape this direction" — so it goes through `Number.isFinite` and a `>= 0` bound rather than
 * through the truthiness the other coercions use.
 */
function asMegabits(value) {
  if (typeof value !== "number" && typeof value !== "string") return void 0
  if (value === "") return void 0
  const number = Number(value)
  return Number.isFinite(number) && number >= 0 ? number : void 0
}
function asBoolean(value) {
  return typeof value === "boolean" ? value : void 0
}
function compactRecord(value) {
  return Object.fromEntries(
    Object.entries(value).filter(([, item]) => item !== void 0 && item !== null && item !== ""),
  )
}
function canonicalNode(input, type, server, port) {
  return {
    type,
    name: asString(input.tag) ?? asString(input.name) ?? `${type} ${server}:${port}`,
    server,
    port,
  }
}
/**
 * The single value where a field may arrive as either. Clash keeps HTTP hosts and paths as lists;
 * every client that names exactly one of each reads it back through here.
 */
function firstOf(value) {
  return Array.isArray(value) ? value[0] : value
}
/**
 * An ALPN list, however the source spelled it: `h3`, `h3,h2`, `["h3","h2"]`, or an array whose one
 * element holds the comma-separated pair. Every client wants the list.
 *
 * Takes the value rather than the node it came off, which is what lets a caller coerce a candidate
 * it has not written down yet — the URI reader had been building a throwaway node just to ask.
 *
 * Not `stringArray`, and deliberately: that one leaves a comma inside an array element alone, which
 * is right for a host list and wrong here, where `["h3,h2"]` names two protocols.
 */
function alpnList(value) {
  if (value === void 0) return void 0
  return [value]
    .flat()
    .flatMap((entry) => String(entry).split(","))
    .map((entry) => entry.trim())
    .filter(Boolean)
}
function stringArray(value) {
  if (Array.isArray(value)) {
    const result = value.filter((item) => typeof item === "string")
    return result.length > 0 ? result : void 0
  }
  if (typeof value === "string" && value) return value.split(",").map((item) => item.trim())
}
function integer(value, fallback = 0) {
  const parsed = typeof value === "number" ? value : Number.parseInt(value ?? "", 10)
  return Number.isInteger(parsed) ? parsed : fallback
}
/**
 * A flag is on unless it says otherwise; `undefined` means the source did not state it at all.
 *
 * The one statement of what counts as "otherwise", for every reader that has to decide it: a URI
 * query, a Surge or Loon parameter, a Clash `udp:`. A second copy of the list is how one input
 * format came to read `off` as a refusal and another as a value it did not recognise.
 */
function booleanFlag(value) {
  if (value == null) return void 0
  return !["0", "false", "off", "no"].includes(value.toLowerCase())
}
//#endregion
//#region src/core/nodes/processors/shared.ts
/**
 * The flag characters a rule's pattern may carry, and the two readings of that one alphabet: the
 * validator refuses a stated flags string that is not all of them, and `regularExpression` strips
 * anything else back out at apply time. Written once because they have to agree — a letter allowed by
 * one and stripped by the other is a pattern that validates and then matches differently.
 */
const REGEXP_FLAG_CHARACTERS = "dgimsuvy"
const VALID_REGEXP_FLAGS = new RegExp(`^[${REGEXP_FLAG_CHARACTERS}]*$`)
const UNSUPPORTED_REGEXP_FLAG = new RegExp(`[^${REGEXP_FLAG_CHARACTERS}]`, "g")
/**
 * Compiles a pattern for use against a node list.
 *
 * No default of its own: `filter` tests a pattern and `rename` replaces with it, so the two want
 * different flags when a rule states none — and a third default hidden in this signature is a
 * pattern that behaves one way here and another at the call site that forgot to pass anything.
 */
function regularExpression(pattern, flags) {
  if (pattern.length > 256)
    throw new ValidationError(`A regular expression must not exceed 256 characters.`)
  const safeFlags = [...new Set(flags.replaceAll(UNSUPPORTED_REGEXP_FLAG, ""))].join("")
  return new RegExp(pattern, safeFlags)
}
/**
 * Whether a pattern matches, with `lastIndex` cleared first.
 *
 * A `g` or `y` pattern carries its position between calls, so scanning a node list one node at a time
 * with the same compiled expression would test from wherever the last node left off — skipping
 * alternate nodes. Both rules that test a pattern per node go through here rather than each
 * remembering the reset.
 */
function matches(expression, value) {
  expression.lastIndex = 0
  return expression.test(value)
}
function fieldValue(node, field) {
  return String(node[field] ?? "")
}
/**
 * What makes two nodes the same node for the rule asking. Shared by `dedupe` and
 * `handle-duplicates`, which differ in what they do about a repeat rather than in what counts as one;
 * `\u0000` cannot occur in a canonical field, so no pair of values can join into the same key.
 */
function groupKey(node, fields) {
  return fields.map((field) => fieldValue(node, field)).join("\0")
}
/**
 * The locale the sort rule collates in, stated rather than inherited.
 *
 * `localeCompare` with no locale takes the runtime's, and the runtime is a developer's machine in a
 * test, a Worker on Cloudflare's edge in production, and whatever CI happens to set in between —
 * which sort a subscriber received would depend on where the compile ran. The three do not merely
 * differ in the tail: under `en` every Chinese name sorts after every Latin one, and under `zh`
 * before, so a list is not shuffled but inverted.
 *
 * `zh` because that is what these names are: proxy names are overwhelmingly Chinese place names, and
 * `zh` orders them by pinyin, which is the order the operator reading them expects. It is also the
 * order this project's own machines were already producing, so nothing on screen moves.
 */
const COLLATION = "zh"
/** Numeric-aware and case-insensitive, so `HK 2` sorts after `HK 1` rather than after `HK 10`. */
function compare(left, right) {
  return left.localeCompare(right, COLLATION, {
    numeric: true,
    sensitivity: "base",
  })
}
/** Keeps a sort stable: equal keys fall back to the order the nodes arrived in. */
function stableSort(nodes, rank) {
  return nodes
    .map((node, originalIndex) => ({
      node,
      originalIndex,
    }))
    .toSorted(
      (left, right) => rank(left.node, right.node) || left.originalIndex - right.originalIndex,
    )
    .map(({ node }) => node)
}
//#endregion
//#region src/core/validation.ts
/**
 * The three checks every definition validator in this codebase is built from — the rule chain's
 * (`core/nodes/processors/validate.ts`) and the subscription's (`core/subscriptions/schema.ts`).
 *
 * Shared rather than copied because both are compatibility surfaces: each validates what an API
 * caller sent *and* what the store read back, so a message or a bound that drifted between them would
 * mean a definition this deployment wrote and can no longer read.
 */
function fail(message) {
  throw new ValidationError(message)
}
/** A definition may only carry the fields its own rule declares; a stray one is a typo, not intent. */
function onlyKeys(input, allowed, name) {
  const unknown = Object.keys(input).find((key) => !allowed.includes(key))
  if (unknown) fail(`${name} has an unknown field ${unknown}.`)
}
/**
 * Length is measured before trimming, so a value padded up to the bound is over it. `allowEmpty`
 * returns the value as it came: a replacement string of spaces is a replacement.
 */
function text(value, name, maxLength, allowEmpty = false) {
  if (typeof value !== "string") fail(`${name} must be a string.`)
  const output = value.trim()
  if (!allowEmpty && !output) fail(`${name} must not be empty.`)
  if (value.length > maxLength) fail(`${name} must not exceed ${maxLength} characters.`)
  return allowEmpty ? value : output
}
//#endregion
//#region src/core/nodes/processors/validate.ts
/** The fields a rule may name. `ProcessorField` in `../types` is this list, not a copy of it. */
const PROCESSOR_FIELDS = ["name", "type", "server", "port"]
/**
 * Compiled here rather than at apply time, so an unusable pattern is refused at the edge instead of
 * becoming a diagnostic on every future delivery.
 */
function regexp(pattern, flags, name) {
  const parsedPattern = text(pattern, `${name}.pattern`, 256, true)
  const parsedFlags = flags == null ? void 0 : text(flags, `${name}.flags`, 8, true)
  if (parsedFlags != null && !VALID_REGEXP_FLAGS.test(parsedFlags))
    fail(`${name}.flags has an invalid flag.`)
  try {
    RegExp(parsedPattern, parsedFlags)
  } catch {
    fail(`${name}.pattern is not a valid regular expression.`)
  }
  return {
    pattern: parsedPattern,
    flags: parsedFlags,
  }
}
function processorField(value, name, fallback) {
  if (value == null && fallback) return fallback
  if (!PROCESSOR_FIELDS.includes(value))
    fail(`${name} must be one of ${PROCESSOR_FIELDS.join(", ")}.`)
  return value
}
function fieldList(value, name) {
  if (value == null) return
  if (!Array.isArray(value)) fail(`${name}.fields must be an array.`)
  return value.map((field, index) => processorField(field, `${name}.fields[${index}]`))
}
function oneOf(value, allowed, name, message) {
  if (value == null) return
  if (!allowed.includes(String(value))) fail(`${name} ${message}`)
  return value
}
//#endregion
//#region src/core/nodes/processors/dedupe.ts
/**
 * Two nodes with the same endpoint are the same node, however they were named.
 *
 * Exported because the interface has to name these fields when it summarises a rule that states none
 * of its own, and a second copy over there is how that summary came to disagree with what `apply`
 * actually groups on.
 */
const DEDUPE_DEFAULT_FIELDS = ["type", "server", "port"]
const dedupeProcessor = {
  type: "dedupe",
  params: ["fields"],
  parse(input, name) {
    return {
      type: "dedupe",
      fields: fieldList(input.fields, name),
    }
  },
  apply(nodes, processor) {
    const fields = processor.fields?.length ? processor.fields : DEDUPE_DEFAULT_FIELDS
    const seen = /* @__PURE__ */ new Set()
    return nodes.filter((node) => {
      const key = groupKey(node, fields)
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
  },
}
//#endregion
//#region src/core/nodes/processors/filter.ts
/** Keeps the nodes whose field matches, or drops them when `keep` is false. */
const filterProcessor = {
  type: "filter",
  params: ["field", "pattern", "keep", "flags"],
  parse(input, name) {
    const expression = regexp(input.pattern, input.flags, name)
    const field = processorField(input.field, `${name}.field`, "name")
    if (field === "port") fail(`${name}.field does not support port.`)
    if (input.keep != null && typeof input.keep !== "boolean")
      fail(`${name}.keep must be a boolean.`)
    return {
      type: "filter",
      field,
      pattern: expression.pattern,
      flags: expression.flags,
      keep: input.keep,
    }
  },
  apply(nodes, processor) {
    const expression = regularExpression(processor.pattern, processor.flags ?? "i")
    const field = processor.field ?? "name"
    const keep = processor.keep !== false
    return nodes.filter((node) => matches(expression, fieldValue(node, field)) === keep)
  },
}
//#endregion
//#region src/core/nodes/processors/filter-useless.ts
/** Names airports put in the list to carry information rather than a server anyone connects to. */
const NOTICE_NAME = /(?:网址|網址|流量|时间|時間|应急|應急|过期|過期|bandwidth|expire)/i
function isUseful(node) {
  if (!isDialablePort(node.port)) return false
  if (NOTICE_NAME.test(node.name)) return false
  for (const field of ["cipher", "password"]) {
    const value = node[field]
    if (
      typeof value === "string" &&
      [...value].some((character) => (character.codePointAt(0) ?? 0) > 127)
    )
      return false
  }
  return true
}
const filterUselessProcessor = {
  type: "filter-useless",
  params: [],
  parse: () => ({ type: "filter-useless" }),
  apply: (nodes) => nodes.filter((node) => isUseful(node)),
}
//#endregion
//#region src/core/nodes/processors/flag.ts
const FLAG_EXPRESSION = /[\p{Regional_Indicator}]{2}/gu
/** The regions worth recognising by name, and the flag each one gets. */
const FLAG_RULES = [
  [/(?:香港|\bHK\b|Hong Kong)/i, "🇭🇰"],
  [/(?:台湾|臺灣|\bTW\b|Taiwan)/i, "🇹🇼"],
  [/(?:日本|\bJP\b|Japan|Tokyo|Osaka)/i, "🇯🇵"],
  [/(?:新加坡|\bSG\b|Singapore)/i, "🇸🇬"],
  [/(?:美国|美國|\bUS\b|United States|Los Angeles|Seattle)/i, "🇺🇸"],
  [/(?:韩国|韓國|\bKR\b|Korea|Seoul)/i, "🇰🇷"],
  [/(?:英国|英國|\bUK\b|Britain|London)/i, "🇬🇧"],
  [/(?:德国|德國|\bDE\b|Germany|Frankfurt)/i, "🇩🇪"],
]
function withoutFlag(value) {
  return value
    .replace(FLAG_EXPRESSION, "")
    .replaceAll(/\s{2,}/g, " ")
    .trim()
}
const flagProcessor = {
  type: "flag",
  params: ["mode"],
  parse(input, name) {
    if (!["add", "remove"].includes(String(input.mode))) fail(`${name}.mode must be add or remove.`)
    return {
      type: "flag",
      mode: input.mode,
    }
  },
  apply(nodes, processor) {
    return nodes.map((node) => {
      const name = withoutFlag(node.name)
      if (processor.mode === "remove")
        return {
          ...node,
          name,
        }
      const flag = FLAG_RULES.find(([expression]) => expression.test(name))?.[1]
      return {
        ...node,
        name: flag ? `${flag} ${name}` : name,
      }
    })
  },
}
//#endregion
//#region src/core/nodes/processors/handle-duplicates.ts
/**
 * What to do about nodes a client cannot tell apart. Numbering them keeps every node reachable;
 * deleting keeps only the first. Names are the default, because that is what a client keys on.
 */
const handleDuplicatesProcessor = {
  type: "handle-duplicates",
  params: ["action", "fields", "separator", "position"],
  parse(input, name) {
    const fields = fieldList(input.fields, name)
    const action = oneOf(
      input.action,
      ["rename", "delete"],
      `${name}.action`,
      "must be rename or delete.",
    )
    const position = oneOf(
      input.position,
      ["front", "back"],
      `${name}.position`,
      "must be front or back.",
    )
    return {
      type: "handle-duplicates",
      fields,
      action,
      separator:
        input.separator == null ? void 0 : text(input.separator, `${name}.separator`, 16, true),
      position,
    }
  },
  apply(nodes, processor) {
    const fields = processor.fields?.length ? [...processor.fields] : ["name"]
    const separator = processor.separator ?? "-"
    const counts = /* @__PURE__ */ new Map()
    for (const node of nodes) {
      const key = groupKey(node, fields)
      counts.set(key, (counts.get(key) ?? 0) + 1)
    }
    const seen = /* @__PURE__ */ new Map()
    return nodes.flatMap((node) => {
      const key = groupKey(node, fields)
      const duplicateIndex = (seen.get(key) ?? 0) + 1
      seen.set(key, duplicateIndex)
      if (processor.action === "delete" && duplicateIndex > 1) return []
      if (processor.action !== "delete" && (counts.get(key) ?? 0) > 1)
        return [
          {
            ...node,
            name:
              processor.position === "front"
                ? `${duplicateIndex}${separator}${node.name}`
                : `${node.name}${separator}${duplicateIndex}`,
          },
        ]
      return [node]
    })
  },
}
//#endregion
//#region src/core/nodes/processors/rename.ts
/** Rewrites node names. A replacement that would empty a name leaves the original standing. */
const renameProcessor = {
  type: "rename",
  params: ["pattern", "replacement", "flags"],
  parse(input, name) {
    const expression = regexp(input.pattern, input.flags, name)
    return {
      type: "rename",
      pattern: expression.pattern,
      flags: expression.flags,
      replacement: text(input.replacement, `${name}.replacement`, 512, true),
    }
  },
  apply(nodes, processor) {
    const expression = regularExpression(processor.pattern, processor.flags ?? "gi")
    return nodes.map((node) => ({
      ...node,
      name: node.name.replace(expression, processor.replacement).trim() || node.name,
    }))
  },
}
//#endregion
//#region src/core/nodes/processors/set-options.ts
/**
 * The switches this rule can force, and the only ones its definition accepts. Exported because
 * `NodeProcessor`'s own member is derived from it rather than restating the three names, and because
 * the interface has to offer exactly these and no others.
 */
const SET_OPTIONS = ["udp", "tfo", "skip-cert-verify"]
/** Forces a switch on every node, for a source that states none of them. */
const setOptionsProcessor = {
  type: "set-options",
  params: ["values"],
  parse(input, name) {
    const values = asRecord(input.values) ?? fail(`${name}.values must be an object.`)
    if (Object.keys(values).some((key) => !SET_OPTIONS.includes(key)))
      fail(`${name}.values has an unsupported field.`)
    for (const [key, option] of Object.entries(values))
      if (typeof option !== "boolean") fail(`${name}.values.${key} must be a boolean.`)
    return {
      type: "set-options",
      values,
    }
  },
  apply: (nodes, processor) =>
    nodes.map((node) => ({
      ...node,
      ...processor.values,
    })),
}
//#endregion
//#region src/core/nodes/processors/sort.ts
const sortProcessor = {
  type: "sort",
  params: ["field", "order"],
  parse(input, name) {
    return {
      type: "sort",
      field: processorField(input.field, `${name}.field`, "name"),
      order: oneOf(input.order, ["asc", "desc"], `${name}.order`, "must be asc or desc."),
    }
  },
  apply(nodes, processor) {
    const field = processor.field ?? "name"
    const direction = processor.order === "desc" ? -1 : 1
    return stableSort(
      nodes,
      (left, right) => direction * compare(fieldValue(left, field), fieldValue(right, field)),
    )
  },
}
//#endregion
//#region src/core/nodes/processors/index.ts
/** A chain longer than this is a mistake rather than a configuration. */
const MAX_PROCESSORS = 32
const BY_TYPE = new Map(
  [
    filterProcessor,
    renameProcessor,
    sortProcessor,
    dedupeProcessor,
    handleDuplicatesProcessor,
    filterUselessProcessor,
    flagProcessor,
    setOptionsProcessor,
  ].map((module) => [module.type, module]),
)
/**
 * Validates a whole chain, for every caller — the management API checking what was sent, the store
 * checking what it read back — so what it accepts is a compatibility surface, not an input filter.
 */
function parseProcessors(value, name = "processors") {
  if (!Array.isArray(value)) fail(`${name} must be an array.`)
  if (value.length > MAX_PROCESSORS) fail(`${name} must not exceed ${MAX_PROCESSORS} entries.`)
  return value.map((entry, index) => {
    const label = `${name}[${index}]`
    const input = asRecord(entry) ?? fail(`${label} must be an object.`)
    const module = BY_TYPE.get(input.type)
    if (!module) fail(`${label}.type is not supported.`)
    onlyKeys(input, ["type", ...module.params], label)
    return module.parse(input, label)
  })
}
/**
 * Runs a chain over a node list, in order. A rule that throws is reported and skipped rather than
 * failing the delivery: the nodes are still worth serving, and the diagnostic names what was dropped.
 */
function processNodes(nodes, processors = []) {
  let output = nodes.map((node) => structuredClone(node))
  const diagnostics = []
  if (processors.length > MAX_PROCESSORS)
    diagnostics.push({
      level: "error",
      stage: "process",
      code: "too-many-processors",
      message: `No more than ${MAX_PROCESSORS} processors are allowed; the rest were ignored.`,
    })
  for (const [index, processor] of processors.slice(0, MAX_PROCESSORS).entries()) {
    const module = BY_TYPE.get(processor.type)
    if (!module) {
      diagnostics.push({
        level: "error",
        stage: "process",
        code: "invalid-processor",
        message: `Processor #${index + 1} has an unsupported type.`,
      })
      continue
    }
    try {
      output = module.apply(output, processor)
    } catch (error) {
      diagnostics.push({
        level: "error",
        stage: "process",
        code: "invalid-processor",
        message: `Processor #${index + 1} is invalid: ${error instanceof Error ? error.message : "processing failed"}`,
      })
    }
  }
  return {
    nodes: output,
    diagnostics,
  }
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/nodes/identity.js
const ALIAS = Symbol.for("yaml.alias")
const DOC = Symbol.for("yaml.document")
const MAP = Symbol.for("yaml.map")
const PAIR = Symbol.for("yaml.pair")
const SCALAR$1 = Symbol.for("yaml.scalar")
const SEQ = Symbol.for("yaml.seq")
const NODE_TYPE = Symbol.for("yaml.node.type")
const isAlias = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === ALIAS
const isDocument = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === DOC
const isMap = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === MAP
const isPair = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === PAIR
const isScalar = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === SCALAR$1
const isSeq = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === SEQ
function isCollection(node) {
  if (node && typeof node === "object")
    switch (node[NODE_TYPE]) {
      case MAP:
      case SEQ:
        return true
    }
  return false
}
function isNode(node) {
  if (node && typeof node === "object")
    switch (node[NODE_TYPE]) {
      case ALIAS:
      case MAP:
      case SCALAR$1:
      case SEQ:
        return true
    }
  return false
}
const hasAnchor = (node) => (isScalar(node) || isCollection(node)) && !!node.anchor
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/visit.js
const BREAK$1 = Symbol("break visit")
const SKIP$1 = Symbol("skip children")
const REMOVE$1 = Symbol("remove node")
/**
 * Apply a visitor to an AST node or document.
 *
 * Walks through the tree (depth-first) starting from `node`, calling a
 * `visitor` function with three arguments:
 *   - `key`: For sequence values and map `Pair`, the node's index in the
 *     collection. Within a `Pair`, `'key'` or `'value'`, correspondingly.
 *     `null` for the root node.
 *   - `node`: The current node.
 *   - `path`: The ancestry of the current node.
 *
 * The return value of the visitor may be used to control the traversal:
 *   - `undefined` (default): Do nothing and continue
 *   - `visit.SKIP`: Do not visit the children of this node, continue with next
 *     sibling
 *   - `visit.BREAK`: Terminate traversal completely
 *   - `visit.REMOVE`: Remove the current node, then continue with the next one
 *   - `Node`: Replace the current node, then continue by visiting it
 *   - `number`: While iterating the items of a sequence or map, set the index
 *     of the next step. This is useful especially if the index of the current
 *     node has changed.
 *
 * If `visitor` is a single function, it will be called with all values
 * encountered in the tree, including e.g. `null` values. Alternatively,
 * separate visitor functions may be defined for each `Map`, `Pair`, `Seq`,
 * `Alias` and `Scalar` node. To define the same visitor function for more than
 * one node type, use the `Collection` (map and seq), `Value` (map, seq & scalar)
 * and `Node` (alias, map, seq & scalar) targets. Of all these, only the most
 * specific defined one will be used for each node.
 */
function visit$1(node, visitor) {
  const visitor_ = initVisitor(visitor)
  if (isDocument(node)) {
    if (visit_(null, node.contents, visitor_, Object.freeze([node])) === REMOVE$1)
      node.contents = null
  } else visit_(null, node, visitor_, Object.freeze([]))
}
/** Terminate visit traversal completely */
visit$1.BREAK = BREAK$1
/** Do not visit the children of the current node */
visit$1.SKIP = SKIP$1
/** Remove the current node */
visit$1.REMOVE = REMOVE$1
function visit_(key, node, visitor, path) {
  const ctrl = callVisitor(key, node, visitor, path)
  if (isNode(ctrl) || isPair(ctrl)) {
    replaceNode(key, path, ctrl)
    return visit_(key, ctrl, visitor, path)
  }
  if (typeof ctrl !== "symbol") {
    if (isCollection(node)) {
      path = Object.freeze(path.concat(node))
      for (let i = 0; i < node.items.length; ++i) {
        const ci = visit_(i, node.items[i], visitor, path)
        if (typeof ci === "number") i = ci - 1
        else if (ci === BREAK$1) return BREAK$1
        else if (ci === REMOVE$1) {
          node.items.splice(i, 1)
          i -= 1
        }
      }
    } else if (isPair(node)) {
      path = Object.freeze(path.concat(node))
      const ck = visit_("key", node.key, visitor, path)
      if (ck === BREAK$1) return BREAK$1
      else if (ck === REMOVE$1) node.key = null
      const cv = visit_("value", node.value, visitor, path)
      if (cv === BREAK$1) return BREAK$1
      else if (cv === REMOVE$1) node.value = null
    }
  }
  return ctrl
}
/**
 * Apply an async visitor to an AST node or document.
 *
 * Walks through the tree (depth-first) starting from `node`, calling a
 * `visitor` function with three arguments:
 *   - `key`: For sequence values and map `Pair`, the node's index in the
 *     collection. Within a `Pair`, `'key'` or `'value'`, correspondingly.
 *     `null` for the root node.
 *   - `node`: The current node.
 *   - `path`: The ancestry of the current node.
 *
 * The return value of the visitor may be used to control the traversal:
 *   - `Promise`: Must resolve to one of the following values
 *   - `undefined` (default): Do nothing and continue
 *   - `visit.SKIP`: Do not visit the children of this node, continue with next
 *     sibling
 *   - `visit.BREAK`: Terminate traversal completely
 *   - `visit.REMOVE`: Remove the current node, then continue with the next one
 *   - `Node`: Replace the current node, then continue by visiting it
 *   - `number`: While iterating the items of a sequence or map, set the index
 *     of the next step. This is useful especially if the index of the current
 *     node has changed.
 *
 * If `visitor` is a single function, it will be called with all values
 * encountered in the tree, including e.g. `null` values. Alternatively,
 * separate visitor functions may be defined for each `Map`, `Pair`, `Seq`,
 * `Alias` and `Scalar` node. To define the same visitor function for more than
 * one node type, use the `Collection` (map and seq), `Value` (map, seq & scalar)
 * and `Node` (alias, map, seq & scalar) targets. Of all these, only the most
 * specific defined one will be used for each node.
 */
async function visitAsync(node, visitor) {
  const visitor_ = initVisitor(visitor)
  if (isDocument(node)) {
    if ((await visitAsync_(null, node.contents, visitor_, Object.freeze([node]))) === REMOVE$1)
      node.contents = null
  } else await visitAsync_(null, node, visitor_, Object.freeze([]))
}
/** Terminate visit traversal completely */
visitAsync.BREAK = BREAK$1
/** Do not visit the children of the current node */
visitAsync.SKIP = SKIP$1
/** Remove the current node */
visitAsync.REMOVE = REMOVE$1
async function visitAsync_(key, node, visitor, path) {
  const ctrl = await callVisitor(key, node, visitor, path)
  if (isNode(ctrl) || isPair(ctrl)) {
    replaceNode(key, path, ctrl)
    return visitAsync_(key, ctrl, visitor, path)
  }
  if (typeof ctrl !== "symbol") {
    if (isCollection(node)) {
      path = Object.freeze(path.concat(node))
      for (let i = 0; i < node.items.length; ++i) {
        const ci = await visitAsync_(i, node.items[i], visitor, path)
        if (typeof ci === "number") i = ci - 1
        else if (ci === BREAK$1) return BREAK$1
        else if (ci === REMOVE$1) {
          node.items.splice(i, 1)
          i -= 1
        }
      }
    } else if (isPair(node)) {
      path = Object.freeze(path.concat(node))
      const ck = await visitAsync_("key", node.key, visitor, path)
      if (ck === BREAK$1) return BREAK$1
      else if (ck === REMOVE$1) node.key = null
      const cv = await visitAsync_("value", node.value, visitor, path)
      if (cv === BREAK$1) return BREAK$1
      else if (cv === REMOVE$1) node.value = null
    }
  }
  return ctrl
}
function initVisitor(visitor) {
  if (typeof visitor === "object" && (visitor.Collection || visitor.Node || visitor.Value))
    return {
      Alias: visitor.Node,
      Map: visitor.Node,
      Scalar: visitor.Node,
      Seq: visitor.Node,
      ...(visitor.Value && {
        Map: visitor.Value,
        Scalar: visitor.Value,
        Seq: visitor.Value,
      }),
      ...(visitor.Collection && {
        Map: visitor.Collection,
        Seq: visitor.Collection,
      }),
      ...visitor,
    }
  return visitor
}
function callVisitor(key, node, visitor, path) {
  if (typeof visitor === "function") return visitor(key, node, path)
  if (isMap(node)) return visitor.Map?.(key, node, path)
  if (isSeq(node)) return visitor.Seq?.(key, node, path)
  if (isPair(node)) return visitor.Pair?.(key, node, path)
  if (isScalar(node)) return visitor.Scalar?.(key, node, path)
  if (isAlias(node)) return visitor.Alias?.(key, node, path)
}
function replaceNode(key, path, node) {
  const parent = path.at(-1)
  if (isCollection(parent)) parent.items[key] = node
  else if (isPair(parent)) {
    if (key === "key") parent.key = node
    else parent.value = node
  } else if (isDocument(parent)) parent.contents = node
  else {
    const pt = isAlias(parent) ? "alias" : "scalar"
    throw new Error(`Cannot replace node with ${pt} parent`)
  }
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/doc/directives.js
const escapeChars = {
  "!": "%21",
  ",": "%2C",
  "[": "%5B",
  "]": "%5D",
  "{": "%7B",
  "}": "%7D",
}
const escapeTagName = (tn) => tn.replace(/[!,[\]{}]/g, (ch) => escapeChars[ch])
const Directives = class Directives {
  constructor(yaml, tags) {
    /**
     * The directives-end/doc-start marker `---`. If `null`, a marker may still be
     * included in the document's stringified representation.
     */
    this.docStart = null
    /** The doc-end marker `...`.  */
    this.docEnd = false
    this.yaml = Object.assign({}, Directives.defaultYaml, yaml)
    this.tags = Object.assign({}, Directives.defaultTags, tags)
  }
  clone() {
    const copy = new Directives(this.yaml, this.tags)
    copy.docStart = this.docStart
    return copy
  }
  /**
   * During parsing, get a Directives instance for the current document and
   * update the stream state according to the current version's spec.
   */
  atDocument() {
    const res = new Directives(this.yaml, this.tags)
    switch (this.yaml.version) {
      case "1.1":
        this.atNextDocument = true
        break
      case "1.2":
        this.atNextDocument = false
        this.yaml = {
          explicit: Directives.defaultYaml.explicit,
          version: "1.2",
        }
        this.tags = Object.assign({}, Directives.defaultTags)
    }
    return res
  }
  /**
   * @param onError - May be called even if the action was successful
   * @returns `true` on success
   */
  add(line, onError) {
    if (this.atNextDocument) {
      this.yaml = {
        explicit: Directives.defaultYaml.explicit,
        version: "1.1",
      }
      this.tags = Object.assign({}, Directives.defaultTags)
      this.atNextDocument = false
    }
    const parts = line.trim().split(/[ \t]+/)
    const name = parts.shift()
    switch (name) {
      case "%TAG": {
        if (parts.length !== 2) {
          onError(0, "%TAG directive should contain exactly two parts")
          if (parts.length < 2) return false
        }
        const [handle, prefix] = parts
        this.tags[handle] = prefix
        return true
      }
      case "%YAML": {
        this.yaml.explicit = true
        if (parts.length !== 1) {
          onError(0, "%YAML directive should contain exactly one part")
          return false
        }
        const [version] = parts
        if (version === "1.1" || version === "1.2") {
          this.yaml.version = version
          return true
        } else {
          const isValid = /^\d+\.\d+$/.test(version)
          onError(6, `Unsupported YAML version ${version}`, isValid)
          return false
        }
      }
      default:
        onError(0, `Unknown directive ${name}`, true)
        return false
    }
  }
  /**
   * Resolves a tag, matching handles to those defined in %TAG directives.
   *
   * @returns Resolved tag, which may also be the non-specific tag `'!'` or a
   *   `'!local'` tag, or `null` if unresolvable.
   */
  tagName(source, onError) {
    if (source === "!") return "!"
    if (source[0] !== "!") {
      onError(`Not a valid tag: ${source}`)
      return null
    }
    if (source[1] === "<") {
      const verbatim = source.slice(2, -1)
      if (verbatim === "!" || verbatim === "!!") {
        onError(`Verbatim tags aren't resolved, so ${source} is invalid.`)
        return null
      }
      if (source[source.length - 1] !== ">") onError("Verbatim tags must end with a >")
      return verbatim
    }
    const [, handle, suffix] = source.match(/^(.*!)([^!]*)$/s)
    if (!suffix) onError(`The ${source} tag has no suffix`)
    const prefix = this.tags[handle]
    if (prefix)
      try {
        return prefix + decodeURIComponent(suffix)
      } catch (error) {
        onError(String(error))
        return null
      }
    if (handle === "!") return source
    onError(`Could not resolve tag: ${source}`)
    return null
  }
  /**
   * Given a fully resolved tag, returns its printable string form,
   * taking into account current tag prefixes and defaults.
   */
  tagString(tag) {
    for (const [handle, prefix] of Object.entries(this.tags))
      if (tag.startsWith(prefix)) return handle + escapeTagName(tag.substring(prefix.length))
    return tag[0] === "!" ? tag : `!<${tag}>`
  }
  toString(doc) {
    const lines = this.yaml.explicit ? [`%YAML ${this.yaml.version || "1.2"}`] : []
    const tagEntries = Object.entries(this.tags)
    let tagNames
    if (doc && tagEntries.length > 0 && isNode(doc.contents)) {
      const tags = {}
      visit$1(doc.contents, (_key, node) => {
        if (isNode(node) && node.tag) tags[node.tag] = true
      })
      tagNames = Object.keys(tags)
    } else tagNames = []
    for (const [handle, prefix] of tagEntries) {
      if (handle === "!!" && prefix === "tag:yaml.org,2002:") continue
      if (!doc || tagNames.some((tn) => tn.startsWith(prefix)))
        lines.push(`%TAG ${handle} ${prefix}`)
    }
    return lines.join("\n")
  }
}
Directives.defaultYaml = {
  explicit: false,
  version: "1.2",
}
Directives.defaultTags = { "!!": "tag:yaml.org,2002:" }
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/doc/anchors.js
/**
 * Verify that the input string is a valid anchor.
 *
 * Will throw on errors.
 */
function anchorIsValid(anchor) {
  if (/[\x00-\x19\s,[\]{}]/.test(anchor)) {
    const msg = `Anchor must not contain whitespace or control characters: ${JSON.stringify(anchor)}`
    throw new Error(msg)
  }
  return true
}
function anchorNames(root) {
  const anchors = /* @__PURE__ */ new Set()
  visit$1(root, {
    Value(_key, node) {
      if (node.anchor) anchors.add(node.anchor)
    },
  })
  return anchors
}
/** Find a new anchor name with the given `prefix` and a one-indexed suffix. */
function findNewAnchor(prefix, exclude) {
  for (let i = 1; ; ++i) {
    const name = `${prefix}${i}`
    if (!exclude.has(name)) return name
  }
}
function createNodeAnchors(doc, prefix) {
  const aliasObjects = []
  const sourceObjects = /* @__PURE__ */ new Map()
  let prevAnchors = null
  return {
    onAnchor: (source) => {
      aliasObjects.push(source)
      prevAnchors ?? (prevAnchors = anchorNames(doc))
      const anchor = findNewAnchor(prefix, prevAnchors)
      prevAnchors.add(anchor)
      return anchor
    },
    /**
     * With circular references, the source node is only resolved after all
     * of its child nodes are. This is why anchors are set only after all of
     * the nodes have been created.
     */
    setAnchors: () => {
      for (const source of aliasObjects) {
        const ref = sourceObjects.get(source)
        if (typeof ref === "object" && ref.anchor && (isScalar(ref.node) || isCollection(ref.node)))
          ref.node.anchor = ref.anchor
        else {
          const error = /* @__PURE__ */ new Error(
            "Failed to resolve repeated object (this should not happen)",
          )
          error.source = source
          throw error
        }
      }
    },
    sourceObjects,
  }
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/doc/applyReviver.js
/**
 * Applies the JSON.parse reviver algorithm as defined in the ECMA-262 spec,
 * in section 24.5.1.1 "Runtime Semantics: InternalizeJSONProperty" of the
 * 2021 edition: https://tc39.es/ecma262/#sec-json.parse
 *
 * Includes extensions for handling Map and Set objects.
 */
function applyReviver(reviver, obj, key, val) {
  if (val && typeof val === "object") {
    if (Array.isArray(val))
      for (let i = 0, len = val.length; i < len; ++i) {
        const v0 = val[i]
        const v1 = applyReviver(reviver, val, String(i), v0)
        if (v1 === void 0) delete val[i]
        else if (v1 !== v0) val[i] = v1
      }
    else if (val instanceof Map)
      for (const k of [...val.keys()]) {
        const v0 = val.get(k)
        const v1 = applyReviver(reviver, val, k, v0)
        if (v1 === void 0) val.delete(k)
        else if (v1 !== v0) val.set(k, v1)
      }
    else if (val instanceof Set)
      for (const v0 of [...val]) {
        const v1 = applyReviver(reviver, val, v0, v0)
        if (v1 === void 0) val.delete(v0)
        else if (v1 !== v0) {
          val.delete(v0)
          val.add(v1)
        }
      }
    else
      for (const [k, v0] of Object.entries(val)) {
        const v1 = applyReviver(reviver, val, k, v0)
        if (v1 === void 0) delete val[k]
        else if (v1 !== v0) val[k] = v1
      }
  }
  return reviver.call(obj, key, val)
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/nodes/toJS.js
/**
 * Recursively convert any node or its contents to native JavaScript
 *
 * @param value - The input value
 * @param arg - If `value` defines a `toJSON()` method, use this
 *   as its first argument
 * @param ctx - Conversion context, originally set in Document#toJS(). If
 *   `{ keep: true }` is not set, output should be suitable for JSON
 *   stringification.
 */
function toJS(value, arg, ctx) {
  if (Array.isArray(value)) return value.map((v, i) => toJS(v, String(i), ctx))
  if (value && typeof value.toJSON === "function") {
    if (!ctx || !hasAnchor(value)) return value.toJSON(arg, ctx)
    const data = {
      aliasCount: 0,
      count: 1,
      res: void 0,
    }
    ctx.anchors.set(value, data)
    ctx.onCreate = (res) => {
      data.res = res
      delete ctx.onCreate
    }
    const res = value.toJSON(arg, ctx)
    if (ctx.onCreate) ctx.onCreate(res)
    return res
  }
  if (typeof value === "bigint" && !ctx?.keep) return Number(value)
  return value
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/nodes/Node.js
const NodeBase = class {
  constructor(type) {
    Object.defineProperty(this, NODE_TYPE, { value: type })
  }
  /** Create a copy of this node.  */
  clone() {
    const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this))
    if (this.range) copy.range = this.range.slice()
    return copy
  }
  /** A plain JavaScript representation of this node. */
  toJS(doc, { mapAsMap, maxAliasCount, onAnchor, reviver } = {}) {
    if (!isDocument(doc)) throw new TypeError("A document argument is required")
    const ctx = {
      anchors: /* @__PURE__ */ new Map(),
      doc,
      keep: true,
      mapAsMap: mapAsMap === true,
      mapKeyWarned: false,
      maxAliasCount: typeof maxAliasCount === "number" ? maxAliasCount : 100,
    }
    const res = toJS(this, "", ctx)
    if (typeof onAnchor === "function")
      for (const { count, res } of ctx.anchors.values()) onAnchor(res, count)
    return typeof reviver === "function" ? applyReviver(reviver, { "": res }, "", res) : res
  }
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/nodes/Alias.js
const Alias = class extends NodeBase {
  constructor(source) {
    super(ALIAS)
    this.source = source
    Object.defineProperty(this, "tag", {
      set() {
        throw new Error("Alias nodes cannot have tags")
      },
    })
  }
  /**
   * Resolve the value of this alias within `doc`, finding the last
   * instance of the `source` anchor before this node.
   */
  resolve(doc, ctx) {
    if (ctx?.maxAliasCount === 0) throw new ReferenceError("Alias resolution is disabled")
    let nodes
    if (ctx?.aliasResolveCache) nodes = ctx.aliasResolveCache
    else {
      nodes = []
      visit$1(doc, {
        Node: (_key, node) => {
          if (isAlias(node) || hasAnchor(node)) nodes.push(node)
        },
      })
      if (ctx) ctx.aliasResolveCache = nodes
    }
    let found = void 0
    for (const node of nodes) {
      if (node === this) break
      if (node.anchor === this.source) found = node
    }
    return found
  }
  toJSON(_arg, ctx) {
    if (!ctx) return { source: this.source }
    const { anchors, doc, maxAliasCount } = ctx
    const source = this.resolve(doc, ctx)
    if (!source) {
      const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`
      throw new ReferenceError(msg)
    }
    let data = anchors.get(source)
    if (!data) {
      toJS(source, null, ctx)
      data = anchors.get(source)
    }
    /* istanbul ignore if */
    if (data?.res === void 0)
      throw new ReferenceError("This should not happen: Alias anchor was not resolved?")
    if (maxAliasCount >= 0) {
      data.count += 1
      if (data.aliasCount === 0) data.aliasCount = getAliasCount(doc, source, anchors)
      if (data.count * data.aliasCount > maxAliasCount)
        throw new ReferenceError("Excessive alias count indicates a resource exhaustion attack")
    }
    return data.res
  }
  toString(ctx, _onComment, _onChompKeep) {
    const src = `*${this.source}`
    if (ctx) {
      anchorIsValid(this.source)
      if (ctx.options.verifyAliasOrder && !ctx.anchors.has(this.source)) {
        const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`
        throw new Error(msg)
      }
      if (ctx.implicitKey) return `${src} `
    }
    return src
  }
}
function getAliasCount(doc, node, anchors) {
  if (isAlias(node)) {
    const source = node.resolve(doc)
    const anchor = anchors && source && anchors.get(source)
    return anchor ? anchor.count * anchor.aliasCount : 0
  } else if (isCollection(node)) {
    let count = 0
    for (const item of node.items) {
      const c = getAliasCount(doc, item, anchors)
      if (c > count) count = c
    }
    return count
  } else if (isPair(node)) {
    const kc = getAliasCount(doc, node.key, anchors)
    const vc = getAliasCount(doc, node.value, anchors)
    return Math.max(kc, vc)
  }
  return 1
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/nodes/Scalar.js
const isScalarValue = (value) =>
  !value || (typeof value !== "function" && typeof value !== "object")
const Scalar = class extends NodeBase {
  constructor(value) {
    super(SCALAR$1)
    this.value = value
  }
  toJSON(arg, ctx) {
    return ctx?.keep ? this.value : toJS(this.value, arg, ctx)
  }
  toString() {
    return String(this.value)
  }
}
Scalar.BLOCK_FOLDED = "BLOCK_FOLDED"
Scalar.BLOCK_LITERAL = "BLOCK_LITERAL"
Scalar.PLAIN = "PLAIN"
Scalar.QUOTE_DOUBLE = "QUOTE_DOUBLE"
Scalar.QUOTE_SINGLE = "QUOTE_SINGLE"
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/doc/createNode.js
const defaultTagPrefix = "tag:yaml.org,2002:"
function findTagObject(value, tagName, tags) {
  if (tagName) {
    const match = tags.filter((t) => t.tag === tagName)
    const tagObj = match.find((t) => !t.format) ?? match[0]
    if (!tagObj) throw new Error(`Tag ${tagName} not found`)
    return tagObj
  }
  return tags.find((t) => t.identify?.(value) && !t.format)
}
function createNode(value, tagName, ctx) {
  if (isDocument(value)) value = value.contents
  if (isNode(value)) return value
  if (isPair(value)) {
    const map = ctx.schema[MAP].createNode?.(ctx.schema, null, ctx)
    map.items.push(value)
    return map
  }
  if (
    value instanceof String ||
    value instanceof Number ||
    value instanceof Boolean ||
    (typeof BigInt !== "undefined" && value instanceof BigInt)
  )
    value = value.valueOf()
  const { aliasDuplicateObjects, onAnchor, onTagObj, schema, sourceObjects } = ctx
  let ref = void 0
  if (aliasDuplicateObjects && value && typeof value === "object") {
    ref = sourceObjects.get(value)
    if (ref) {
      ref.anchor ?? (ref.anchor = onAnchor(value))
      return new Alias(ref.anchor)
    } else {
      ref = {
        anchor: null,
        node: null,
      }
      sourceObjects.set(value, ref)
    }
  }
  if (tagName?.startsWith("!!")) tagName = defaultTagPrefix + tagName.slice(2)
  let tagObj = findTagObject(value, tagName, schema.tags)
  if (!tagObj) {
    if (value && typeof value.toJSON === "function") value = value.toJSON()
    if (!value || typeof value !== "object") {
      const node = new Scalar(value)
      if (ref) ref.node = node
      return node
    }
    tagObj =
      value instanceof Map
        ? schema[MAP]
        : Symbol.iterator in Object(value)
          ? schema[SEQ]
          : schema[MAP]
  }
  if (onTagObj) {
    onTagObj(tagObj)
    delete ctx.onTagObj
  }
  const node = tagObj?.createNode
    ? tagObj.createNode(ctx.schema, value, ctx)
    : typeof tagObj?.nodeClass?.from === "function"
      ? tagObj.nodeClass.from(ctx.schema, value, ctx)
      : new Scalar(value)
  if (tagName) node.tag = tagName
  else if (!tagObj.default) node.tag = tagObj.tag
  if (ref) ref.node = node
  return node
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/nodes/Collection.js
function collectionFromPath(schema, path, value) {
  let v = value
  for (let i = path.length - 1; i >= 0; --i) {
    const k = path[i]
    if (typeof k === "number" && Number.isInteger(k) && k >= 0) {
      const a = []
      a[k] = v
      v = a
    } else v = /* @__PURE__ */ new Map([[k, v]])
  }
  return createNode(v, void 0, {
    aliasDuplicateObjects: false,
    keepUndefined: false,
    onAnchor: () => {
      throw new Error("This should not happen, please report a bug.")
    },
    schema,
    sourceObjects: /* @__PURE__ */ new Map(),
  })
}
const isEmptyPath = (path) =>
  path == null || (typeof path === "object" && !!path[Symbol.iterator]().next().done)
const Collection = class extends NodeBase {
  constructor(type, schema) {
    super(type)
    Object.defineProperty(this, "schema", {
      value: schema,
      configurable: true,
      enumerable: false,
      writable: true,
    })
  }
  /**
   * Create a copy of this collection.
   *
   * @param schema - If defined, overwrites the original's schema
   */
  clone(schema) {
    const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this))
    if (schema) copy.schema = schema
    copy.items = copy.items.map((it) => (isNode(it) || isPair(it) ? it.clone(schema) : it))
    if (this.range) copy.range = this.range.slice()
    return copy
  }
  /**
   * Adds a value to the collection. For `!!map` and `!!omap` the value must
   * be a Pair instance or a `{ key, value }` object, which may not have a key
   * that already exists in the map.
   */
  addIn(path, value) {
    if (isEmptyPath(path)) this.add(value)
    else {
      const [key, ...rest] = path
      const node = this.get(key, true)
      if (isCollection(node)) node.addIn(rest, value)
      else if (node === void 0 && this.schema)
        this.set(key, collectionFromPath(this.schema, rest, value))
      else throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`)
    }
  }
  /**
   * Removes a value from the collection.
   * @returns `true` if the item was found and removed.
   */
  deleteIn(path) {
    const [key, ...rest] = path
    if (rest.length === 0) return this.delete(key)
    const node = this.get(key, true)
    if (isCollection(node)) return node.deleteIn(rest)
    else throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`)
  }
  /**
   * Returns item at `key`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  getIn(path, keepScalar) {
    const [key, ...rest] = path
    const node = this.get(key, true)
    if (rest.length === 0) return !keepScalar && isScalar(node) ? node.value : node
    else return isCollection(node) ? node.getIn(rest, keepScalar) : void 0
  }
  hasAllNullValues(allowScalar) {
    return this.items.every((node) => {
      if (!isPair(node)) return false
      const n = node.value
      return (
        n == null ||
        (allowScalar && isScalar(n) && n.value == null && !n.commentBefore && !n.comment && !n.tag)
      )
    })
  }
  /**
   * Checks if the collection includes a value with the key `key`.
   */
  hasIn(path) {
    const [key, ...rest] = path
    if (rest.length === 0) return this.has(key)
    const node = this.get(key, true)
    return isCollection(node) ? node.hasIn(rest) : false
  }
  /**
   * Sets a value in this collection. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  setIn(path, value) {
    const [key, ...rest] = path
    if (rest.length === 0) this.set(key, value)
    else {
      const node = this.get(key, true)
      if (isCollection(node)) node.setIn(rest, value)
      else if (node === void 0 && this.schema)
        this.set(key, collectionFromPath(this.schema, rest, value))
      else throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`)
    }
  }
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/stringify/stringifyComment.js
/**
 * Stringifies a comment.
 *
 * Empty comment lines are left empty,
 * lines consisting of a single space are replaced by `#`,
 * and all other lines are prefixed with a `#`.
 */
const stringifyComment = (str) => str.replace(/^(?!$)(?: $)?/gm, "#")
function indentComment(comment, indent) {
  if (/^\n+$/.test(comment)) return comment.slice(1)
  return indent ? comment.replaceAll(/^(?! *$)/gm, indent) : comment
}
const lineComment = (str, indent, comment) =>
  str.endsWith("\n")
    ? indentComment(comment, indent)
    : comment.includes("\n")
      ? "\n" + indentComment(comment, indent)
      : (str.endsWith(" ") ? "" : " ") + comment
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/stringify/foldFlowLines.js
const FOLD_FLOW = "flow"
const FOLD_BLOCK = "block"
const FOLD_QUOTED = "quoted"
/**
 * Tries to keep input at up to `lineWidth` characters, splitting only on spaces
 * not followed by newlines or spaces unless `mode` is `'quoted'`. Lines are
 * terminated with `\n` and started with `indent`.
 */
function foldFlowLines(
  text,
  indent,
  mode = "flow",
  { indentAtStart, lineWidth = 80, minContentWidth = 20, onFold, onOverflow } = {},
) {
  if (!lineWidth || lineWidth < 0) return text
  if (lineWidth < minContentWidth) minContentWidth = 0
  const endStep = Math.max(1 + minContentWidth, 1 + lineWidth - indent.length)
  if (text.length <= endStep) return text
  const folds = []
  const escapedFolds = {}
  let end = lineWidth - indent.length
  if (typeof indentAtStart === "number") {
    if (indentAtStart > lineWidth - Math.max(2, minContentWidth)) folds.push(0)
    else end = lineWidth - indentAtStart
  }
  let split = void 0
  let prev = void 0
  let overflow = false
  let i = -1
  let escStart = -1
  let escEnd = -1
  if (mode === "block") {
    i = consumeMoreIndentedLines(text, i, indent.length)
    if (i !== -1) end = i + endStep
  }
  for (let ch; (ch = text[(i += 1)]);) {
    if (mode === "quoted" && ch === "\\") {
      escStart = i
      switch (text[i + 1]) {
        case "x":
          i += 3
          break
        case "u":
          i += 5
          break
        case "U":
          i += 9
          break
        default:
          i += 1
      }
      escEnd = i
    }
    if (ch === "\n") {
      if (mode === "block") i = consumeMoreIndentedLines(text, i, indent.length)
      end = i + indent.length + endStep
      split = void 0
    } else {
      if (ch === " " && prev && prev !== " " && prev !== "\n" && prev !== "	") {
        const next = text[i + 1]
        if (next && next !== " " && next !== "\n" && next !== "	") split = i
      }
      if (i >= end) {
        if (split) {
          folds.push(split)
          end = split + endStep
          split = void 0
        } else if (mode === "quoted") {
          while (prev === " " || prev === "	") {
            prev = ch
            ch = text[(i += 1)]
            overflow = true
          }
          const j = i > escEnd + 1 ? i - 2 : escStart - 1
          if (escapedFolds[j]) return text
          folds.push(j)
          escapedFolds[j] = true
          end = j + endStep
          split = void 0
        } else overflow = true
      }
    }
    prev = ch
  }
  if (overflow && onOverflow) onOverflow()
  if (folds.length === 0) return text
  if (onFold) onFold()
  let res = text.slice(0, folds[0])
  for (let i = 0; i < folds.length; ++i) {
    const fold = folds[i]
    const end = folds[i + 1] || text.length
    if (fold === 0) res = `\n${indent}${text.slice(0, end)}`
    else {
      if (mode === "quoted" && escapedFolds[fold]) res += `${text[fold]}\\`
      res += `\n${indent}${text.slice(fold + 1, end)}`
    }
  }
  return res
}
/**
 * Presumes `i + 1` is at the start of a line
 * @returns index of last newline in more-indented block
 */
function consumeMoreIndentedLines(text, i, indent) {
  let end = i
  let start = i + 1
  let ch = text[start]
  while (ch === " " || ch === "	")
    if (i < start + indent) ch = text[++i]
    else {
      do ch = text[++i]
      while (ch && ch !== "\n")
      end = i
      start = i + 1
      ch = text[start]
    }
  return end
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/stringify/stringifyString.js
const getFoldOptions = (ctx, isBlock) => ({
  indentAtStart: isBlock ? ctx.indent.length : ctx.indentAtStart,
  lineWidth: ctx.options.lineWidth,
  minContentWidth: ctx.options.minContentWidth,
})
const containsDocumentMarker = (str) => /^(%|---|\.\.\.)/m.test(str)
function lineLengthOverLimit(str, lineWidth, indentLength) {
  if (!lineWidth || lineWidth < 0) return false
  const limit = lineWidth - indentLength
  const strLen = str.length
  if (strLen <= limit) return false
  for (let i = 0, start = 0; i < strLen; ++i)
    if (str[i] === "\n") {
      if (i - start > limit) return true
      start = i + 1
      if (strLen - start <= limit) return false
    }
  return true
}
function doubleQuotedString(value, ctx) {
  const json = JSON.stringify(value)
  if (ctx.options.doubleQuotedAsJSON) return json
  const { implicitKey } = ctx
  const minMultiLineLength = ctx.options.doubleQuotedMinMultiLineLength
  const indent = ctx.indent || (containsDocumentMarker(value) ? "  " : "")
  let str = ""
  let start = 0
  for (let i = 0, ch = json[i]; ch; ch = json[++i]) {
    if (ch === " " && json[i + 1] === "\\" && json[i + 2] === "n") {
      str += `${json.slice(start, i)}\\ `
      i += 1
      start = i
      ch = "\\"
    }
    if (ch === "\\")
      switch (json[i + 1]) {
        case "u":
          {
            str += json.slice(start, i)
            const code = json.substr(i + 2, 4)
            switch (code) {
              case "0000":
                str += "\\0"
                break
              case "0007":
                str += "\\a"
                break
              case "000b":
                str += "\\v"
                break
              case "001b":
                str += "\\e"
                break
              case "0085":
                str += "\\N"
                break
              case "00a0":
                str += "\\_"
                break
              case "2028":
                str += "\\L"
                break
              case "2029":
                str += "\\P"
                break
              default:
                if (code.substr(0, 2) === "00") str += `\\x${code.substr(2)}`
                else str += json.substr(i, 6)
            }
            i += 5
            start = i + 1
          }
          break
        case "n":
          if (implicitKey || json[i + 2] === '"' || json.length < minMultiLineLength) i += 1
          else {
            str += `${json.slice(start, i)}\n\n`
            while (json[i + 2] === "\\" && json[i + 3] === "n" && json[i + 4] !== '"') {
              str += "\n"
              i += 2
            }
            str += indent
            if (json[i + 2] === " ") str += "\\"
            i += 1
            start = i + 1
          }
          break
        default:
          i += 1
      }
  }
  str = start ? str + json.slice(start) : json
  return implicitKey ? str : foldFlowLines(str, indent, FOLD_QUOTED, getFoldOptions(ctx, false))
}
function singleQuotedString(value, ctx) {
  if (
    ctx.options.singleQuote === false ||
    (ctx.implicitKey && value.includes("\n")) ||
    /[ \t]\n|\n[ \t]/.test(value)
  )
    return doubleQuotedString(value, ctx)
  const indent = ctx.indent || (containsDocumentMarker(value) ? "  " : "")
  const res = `'${value.replace(/'/g, "''").replace(/\n+/g, `$&\n${indent}`)}'`
  return ctx.implicitKey ? res : foldFlowLines(res, indent, FOLD_FLOW, getFoldOptions(ctx, false))
}
function quotedString(value, ctx) {
  const { singleQuote } = ctx.options
  let qs
  if (singleQuote === false) qs = doubleQuotedString
  else {
    const hasDouble = value.includes('"')
    const hasSingle = value.includes("'")
    if (hasDouble && !hasSingle) qs = singleQuotedString
    else if (hasSingle && !hasDouble) qs = doubleQuotedString
    else qs = singleQuote ? singleQuotedString : doubleQuotedString
  }
  return qs(value, ctx)
}
let blockEndNewlines
try {
  blockEndNewlines = /* @__PURE__ */ new RegExp("(^|(?<!\n))\n+(?!\n|$)", "g")
} catch {
  blockEndNewlines = /\n+(?!\n|$)/g
}
function blockString({ comment, type, value }, ctx, onComment, onChompKeep) {
  const { blockQuote, commentString, lineWidth } = ctx.options
  if (!blockQuote || /\n[\t ]+$/.test(value)) return quotedString(value, ctx)
  const indent = ctx.indent || (ctx.forceBlockIndent || containsDocumentMarker(value) ? "  " : "")
  const literal =
    blockQuote === "literal"
      ? true
      : blockQuote === "folded" || type === Scalar.BLOCK_FOLDED
        ? false
        : type === Scalar.BLOCK_LITERAL
          ? true
          : !lineLengthOverLimit(value, lineWidth, indent.length)
  if (!value) return literal ? "|\n" : ">\n"
  let chomp
  let endStart
  for (endStart = value.length; endStart > 0; --endStart) {
    const ch = value[endStart - 1]
    if (ch !== "\n" && ch !== "	" && ch !== " ") break
  }
  let end = value.substring(endStart)
  const endNlPos = end.indexOf("\n")
  if (endNlPos === -1) chomp = "-"
  else if (value === end || endNlPos !== end.length - 1) {
    chomp = "+"
    if (onChompKeep) onChompKeep()
  } else chomp = ""
  if (end) {
    value = value.slice(0, -end.length)
    if (end.at(-1) === "\n") end = end.slice(0, -1)
    end = end.replace(blockEndNewlines, `$&${indent}`)
  }
  let startWithSpace = false
  let startEnd
  let startNlPos = -1
  for (startEnd = 0; startEnd < value.length; ++startEnd) {
    const ch = value[startEnd]
    if (ch === " ") startWithSpace = true
    else if (ch === "\n") startNlPos = startEnd
    else break
  }
  let start = value.substring(0, startNlPos < startEnd ? startNlPos + 1 : startEnd)
  if (start) {
    value = value.substring(start.length)
    start = start.replaceAll(/\n+/g, `$&${indent}`)
  }
  let header = (startWithSpace ? (indent ? "2" : "1") : "") + chomp
  if (comment) {
    header += ` ${commentString(comment.replace(/ ?[\r\n]+/g, " "))}`
    if (onComment) onComment()
  }
  if (!literal) {
    const foldedValue = value
      .replaceAll(/\n+/g, "\n$&")
      .replaceAll(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, "$1$2")
      .replaceAll(/\n+/g, `$&${indent}`)
    let literalFallback = false
    const foldOptions = getFoldOptions(ctx, true)
    if (blockQuote !== "folded" && type !== Scalar.BLOCK_FOLDED)
      foldOptions.onOverflow = () => {
        literalFallback = true
      }
    const body = foldFlowLines(`${start}${foldedValue}${end}`, indent, FOLD_BLOCK, foldOptions)
    if (!literalFallback) return `>${header}\n${indent}${body}`
  }
  value = value.replaceAll(/\n+/g, `$&${indent}`)
  return `|${header}\n${indent}${start}${value}${end}`
}
function plainString(item, ctx, onComment, onChompKeep) {
  const { type, value } = item
  const { actualString, implicitKey, indent, indentStep, inFlow } = ctx
  if ((implicitKey && value.includes("\n")) || (inFlow && /[[\]{},]/.test(value)))
    return quotedString(value, ctx)
  if (
    /^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(value)
  )
    return implicitKey || inFlow || !value.includes("\n")
      ? quotedString(value, ctx)
      : blockString(item, ctx, onComment, onChompKeep)
  if (!implicitKey && !inFlow && type !== Scalar.PLAIN && value.includes("\n"))
    return blockString(item, ctx, onComment, onChompKeep)
  if (containsDocumentMarker(value)) {
    if (indent === "") {
      ctx.forceBlockIndent = true
      return blockString(item, ctx, onComment, onChompKeep)
    } else if (implicitKey && indent === indentStep) return quotedString(value, ctx)
  }
  const str = value.replaceAll(/\n+/g, `$&\n${indent}`)
  if (actualString) {
    const test = (tag) => tag.default && tag.tag !== "tag:yaml.org,2002:str" && tag.test?.test(str)
    const { compat, tags } = ctx.doc.schema
    if (tags.some(test) || compat?.some(test)) return quotedString(value, ctx)
  }
  return implicitKey ? str : foldFlowLines(str, indent, FOLD_FLOW, getFoldOptions(ctx, false))
}
function stringifyString(item, ctx, onComment, onChompKeep) {
  const { implicitKey, inFlow } = ctx
  const ss = typeof item.value === "string" ? item : { ...item, value: String(item.value) }
  let { type } = item
  if (type !== Scalar.QUOTE_DOUBLE) {
    if (/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(ss.value)) type = Scalar.QUOTE_DOUBLE
  }
  const _stringify = (_type) => {
    switch (_type) {
      case Scalar.BLOCK_FOLDED:
      case Scalar.BLOCK_LITERAL:
        return implicitKey || inFlow
          ? quotedString(ss.value, ctx)
          : blockString(ss, ctx, onComment, onChompKeep)
      case Scalar.QUOTE_DOUBLE:
        return doubleQuotedString(ss.value, ctx)
      case Scalar.QUOTE_SINGLE:
        return singleQuotedString(ss.value, ctx)
      case Scalar.PLAIN:
        return plainString(ss, ctx, onComment, onChompKeep)
      default:
        return null
    }
  }
  let res = _stringify(type)
  if (res === null) {
    const { defaultKeyType, defaultStringType } = ctx.options
    const t = (implicitKey && defaultKeyType) || defaultStringType
    res = _stringify(t)
    if (res === null) throw new Error(`Unsupported default string type ${t}`)
  }
  return res
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/stringify/stringify.js
function createStringifyContext(doc, options) {
  const opt = {
    blockQuote: true,
    commentString: stringifyComment,
    defaultKeyType: null,
    defaultStringType: "PLAIN",
    directives: null,
    doubleQuotedAsJSON: false,
    doubleQuotedMinMultiLineLength: 40,
    falseStr: "false",
    flowCollectionPadding: true,
    indentSeq: true,
    lineWidth: 80,
    minContentWidth: 20,
    nullStr: "null",
    simpleKeys: false,
    singleQuote: null,
    trailingComma: false,
    trueStr: "true",
    verifyAliasOrder: true,
    ...doc.schema.toStringOptions,
    ...options,
  }
  let inFlow
  switch (opt.collectionStyle) {
    case "block":
      inFlow = false
      break
    case "flow":
      inFlow = true
      break
    default:
      inFlow = null
  }
  return {
    anchors: /* @__PURE__ */ new Set(),
    doc,
    flowCollectionPadding: opt.flowCollectionPadding ? " " : "",
    indent: "",
    indentStep: typeof opt.indent === "number" ? " ".repeat(opt.indent) : "  ",
    inFlow,
    options: opt,
  }
}
function getTagObject(tags, item) {
  if (item.tag) {
    const match = tags.filter((t) => t.tag === item.tag)
    if (match.length > 0) return match.find((t) => t.format === item.format) ?? match[0]
  }
  let tagObj = void 0
  let obj
  if (isScalar(item)) {
    obj = item.value
    let match = tags.filter((t) => t.identify?.(obj))
    if (match.length > 1) {
      const testMatch = match.filter((t) => t.test)
      if (testMatch.length > 0) match = testMatch
    }
    tagObj = match.find((t) => t.format === item.format) ?? match.find((t) => !t.format)
  } else {
    obj = item
    tagObj = tags.find((t) => t.nodeClass && obj instanceof t.nodeClass)
  }
  if (!tagObj) {
    const name = obj?.constructor?.name ?? (obj === null ? "null" : typeof obj)
    throw new Error(`Tag not resolved for ${name} value`)
  }
  return tagObj
}
function stringifyProps(node, tagObj, { anchors, doc }) {
  if (!doc.directives) return ""
  const props = []
  const anchor = (isScalar(node) || isCollection(node)) && node.anchor
  if (anchor && anchorIsValid(anchor)) {
    anchors.add(anchor)
    props.push(`&${anchor}`)
  }
  const tag = node.tag ?? (tagObj.default ? null : tagObj.tag)
  if (tag) props.push(doc.directives.tagString(tag))
  return props.join(" ")
}
function stringify$1(item, ctx, onComment, onChompKeep) {
  if (isPair(item)) return item.toString(ctx, onComment, onChompKeep)
  if (isAlias(item)) {
    if (ctx.doc.directives) return item.toString(ctx)
    if (ctx.resolvedAliases?.has(item))
      throw new TypeError(`Cannot stringify circular structure without alias nodes`)
    else {
      if (ctx.resolvedAliases) ctx.resolvedAliases.add(item)
      else ctx.resolvedAliases = /* @__PURE__ */ new Set([item])
      item = item.resolve(ctx.doc)
    }
  }
  let tagObj = void 0
  const node = isNode(item) ? item : ctx.doc.createNode(item, { onTagObj: (o) => (tagObj = o) })
  tagObj ?? (tagObj = getTagObject(ctx.doc.schema.tags, node))
  const props = stringifyProps(node, tagObj, ctx)
  if (props.length > 0) ctx.indentAtStart = (ctx.indentAtStart ?? 0) + props.length + 1
  const str =
    typeof tagObj.stringify === "function"
      ? tagObj.stringify(node, ctx, onComment, onChompKeep)
      : isScalar(node)
        ? stringifyString(node, ctx, onComment, onChompKeep)
        : node.toString(ctx, onComment, onChompKeep)
  if (!props) return str
  return isScalar(node) || str[0] === "{" || str[0] === "["
    ? `${props} ${str}`
    : `${props}\n${ctx.indent}${str}`
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/stringify/stringifyPair.js
function stringifyPair({ key, value }, ctx, onComment, onChompKeep) {
  const {
    allNullValues,
    doc,
    indent,
    indentStep,
    options: { commentString, indentSeq, simpleKeys },
  } = ctx
  let keyComment = (isNode(key) && key.comment) || null
  if (simpleKeys) {
    if (keyComment) throw new Error("With simple keys, key nodes cannot have comments")
    if (isCollection(key) || (!isNode(key) && typeof key === "object"))
      throw new Error("With simple keys, collection cannot be used as a key value")
  }
  let explicitKey =
    !simpleKeys &&
    (!key ||
      (keyComment && value == null && !ctx.inFlow) ||
      isCollection(key) ||
      (isScalar(key)
        ? key.type === Scalar.BLOCK_FOLDED || key.type === Scalar.BLOCK_LITERAL
        : typeof key === "object"))
  ctx = {
    ...ctx,
    allNullValues: false,
    implicitKey: !explicitKey && (simpleKeys || !allNullValues),
    indent: indent + indentStep,
  }
  let keyCommentDone = false
  let chompKeep = false
  let str = stringify$1(
    key,
    ctx,
    () => (keyCommentDone = true),
    () => (chompKeep = true),
  )
  if (!explicitKey && !ctx.inFlow && str.length > 1024) {
    if (simpleKeys)
      throw new Error(
        "With simple keys, single line scalar must not span more than 1024 characters",
      )
    explicitKey = true
  }
  if (ctx.inFlow) {
    if (allNullValues || value == null) {
      if (keyCommentDone && onComment) onComment()
      return str === "" ? "?" : explicitKey ? `? ${str}` : str
    }
  } else if ((allNullValues && !simpleKeys) || (value == null && explicitKey)) {
    str = `? ${str}`
    if (keyComment && !keyCommentDone)
      str += lineComment(str, ctx.indent, commentString(keyComment))
    else if (chompKeep && onChompKeep) onChompKeep()
    return str
  }
  if (keyCommentDone) keyComment = null
  if (explicitKey) {
    if (keyComment) str += lineComment(str, ctx.indent, commentString(keyComment))
    str = `? ${str}\n${indent}:`
  } else {
    str = `${str}:`
    if (keyComment) str += lineComment(str, ctx.indent, commentString(keyComment))
  }
  let vsb, vcb, valueComment
  if (isNode(value)) {
    vsb = Boolean(value.spaceBefore)
    vcb = value.commentBefore
    valueComment = value.comment
  } else {
    vsb = false
    vcb = null
    valueComment = null
    if (value && typeof value === "object") value = doc.createNode(value)
  }
  ctx.implicitKey = false
  if (!explicitKey && !keyComment && isScalar(value)) ctx.indentAtStart = str.length + 1
  chompKeep = false
  if (
    !indentSeq &&
    indentStep.length >= 2 &&
    !ctx.inFlow &&
    !explicitKey &&
    isSeq(value) &&
    !value.flow &&
    !value.tag &&
    !value.anchor
  )
    ctx.indent = ctx.indent.slice(2)
  let valueCommentDone = false
  const valueStr = stringify$1(
    value,
    ctx,
    () => (valueCommentDone = true),
    () => (chompKeep = true),
  )
  let ws = " "
  if (keyComment || vsb || vcb) {
    ws = vsb ? "\n" : ""
    if (vcb) {
      const cs = commentString(vcb)
      ws += `\n${indentComment(cs, ctx.indent)}`
    }
    if (valueStr === "" && !ctx.inFlow) {
      if (ws === "\n" && valueComment) ws = "\n\n"
    } else ws += `\n${ctx.indent}`
  } else if (!explicitKey && isCollection(value)) {
    const vs0 = valueStr[0]
    const nl0 = valueStr.indexOf("\n")
    const hasNewline = nl0 !== -1
    const flow = ctx.inFlow ?? value.flow ?? value.items.length === 0
    if (hasNewline || !flow) {
      let hasPropsLine = false
      if (hasNewline && (vs0 === "&" || vs0 === "!")) {
        let sp0 = valueStr.indexOf(" ")
        if (vs0 === "&" && sp0 !== -1 && sp0 < nl0 && valueStr[sp0 + 1] === "!")
          sp0 = valueStr.indexOf(" ", sp0 + 1)
        if (sp0 === -1 || nl0 < sp0) hasPropsLine = true
      }
      if (!hasPropsLine) ws = `\n${ctx.indent}`
    }
  } else if (valueStr === "" || valueStr[0] === "\n") ws = ""
  str += ws + valueStr
  if (ctx.inFlow) {
    if (valueCommentDone && onComment) onComment()
  } else if (valueComment && !valueCommentDone)
    str += lineComment(str, ctx.indent, commentString(valueComment))
  else if (chompKeep && onChompKeep) onChompKeep()
  return str
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/log.js
function warn(logLevel, warning) {
  if (logLevel === "debug" || logLevel === "warn") console.warn(warning)
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/schema/yaml-1.1/merge.js
const MERGE_KEY = "<<"
const merge = {
  identify: (value) =>
    value === MERGE_KEY || (typeof value === "symbol" && value.description === MERGE_KEY),
  default: "key",
  tag: "tag:yaml.org,2002:merge",
  test: /^<<$/,
  resolve: () => Object.assign(new Scalar(Symbol(MERGE_KEY)), { addToJSMap: addMergeToJSMap }),
  stringify: () => MERGE_KEY,
}
const isMergeKey = (ctx, key) =>
  (merge.identify(key) ||
    (isScalar(key) && (!key.type || key.type === Scalar.PLAIN) && merge.identify(key.value))) &&
  ctx?.doc.schema.tags.some((tag) => tag.tag === merge.tag && tag.default)
function addMergeToJSMap(ctx, map, value) {
  const source = resolveAliasValue(ctx, value)
  if (isSeq(source)) for (const it of source.items) mergeValue(ctx, map, it)
  else if (Array.isArray(source)) for (const it of source) mergeValue(ctx, map, it)
  else mergeValue(ctx, map, source)
}
function mergeValue(ctx, map, value) {
  const source = resolveAliasValue(ctx, value)
  if (!isMap(source)) throw new Error("Merge sources must be maps or map aliases")
  const srcMap = source.toJSON(null, ctx, Map)
  for (const [key, value] of srcMap)
    if (map instanceof Map) {
      if (!map.has(key)) map.set(key, value)
    } else if (map instanceof Set) map.add(key)
    else if (!Object.hasOwn(map, key))
      Object.defineProperty(map, key, {
        value,
        writable: true,
        enumerable: true,
        configurable: true,
      })
  return map
}
function resolveAliasValue(ctx, value) {
  return ctx && isAlias(value) ? value.resolve(ctx.doc, ctx) : value
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/nodes/addPairToJSMap.js
function addPairToJSMap(ctx, map, { key, value }) {
  if (isNode(key) && key.addToJSMap) key.addToJSMap(ctx, map, value)
  else if (isMergeKey(ctx, key)) addMergeToJSMap(ctx, map, value)
  else {
    const jsKey = toJS(key, "", ctx)
    if (map instanceof Map) map.set(jsKey, toJS(value, jsKey, ctx))
    else if (map instanceof Set) map.add(jsKey)
    else {
      const stringKey = stringifyKey(key, jsKey, ctx)
      const jsValue = toJS(value, stringKey, ctx)
      if (stringKey in map)
        Object.defineProperty(map, stringKey, {
          value: jsValue,
          writable: true,
          enumerable: true,
          configurable: true,
        })
      else map[stringKey] = jsValue
    }
  }
  return map
}
function stringifyKey(key, jsKey, ctx) {
  if (jsKey === null) return ""
  if (typeof jsKey !== "object") return String(jsKey)
  if (isNode(key) && ctx?.doc) {
    const strCtx = createStringifyContext(ctx.doc, {})
    strCtx.anchors = /* @__PURE__ */ new Set()
    for (const node of ctx.anchors.keys()) strCtx.anchors.add(node.anchor)
    strCtx.inFlow = true
    strCtx.inStringifyKey = true
    const strKey = key.toString(strCtx)
    if (!ctx.mapKeyWarned) {
      let jsonStr = JSON.stringify(strKey)
      if (jsonStr.length > 40) jsonStr = `${jsonStr.substring(0, 36)}..."`
      warn(
        ctx.doc.options.logLevel,
        `Keys with collection values will be stringified due to JS Object restrictions: ${jsonStr}. Set mapAsMap: true to use object keys.`,
      )
      ctx.mapKeyWarned = true
    }
    return strKey
  }
  return JSON.stringify(jsKey)
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/nodes/Pair.js
function createPair(key, value, ctx) {
  return new Pair(createNode(key, void 0, ctx), createNode(value, void 0, ctx))
}
const Pair = class Pair {
  constructor(key, value = null) {
    Object.defineProperty(this, NODE_TYPE, { value: PAIR })
    this.key = key
    this.value = value
  }
  clone(schema) {
    let { key, value } = this
    if (isNode(key)) key = key.clone(schema)
    if (isNode(value)) value = value.clone(schema)
    return new Pair(key, value)
  }
  toJSON(_, ctx) {
    return addPairToJSMap(ctx, ctx?.mapAsMap ? /* @__PURE__ */ new Map() : {}, this)
  }
  toString(ctx, onComment, onChompKeep) {
    return ctx?.doc ? stringifyPair(this, ctx, onComment, onChompKeep) : JSON.stringify(this)
  }
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/stringify/stringifyCollection.js
function stringifyCollection(collection, ctx, options) {
  return ((ctx.inFlow ?? collection.flow) ? stringifyFlowCollection : stringifyBlockCollection)(
    collection,
    ctx,
    options,
  )
}
function stringifyBlockCollection(
  { comment, items },
  ctx,
  { blockItemPrefix, flowChars, itemIndent, onChompKeep, onComment },
) {
  const {
    indent,
    options: { commentString },
  } = ctx
  const itemCtx = { ...ctx, indent: itemIndent, type: null }
  let chompKeep = false
  const lines = []
  for (let i = 0; i < items.length; ++i) {
    const item = items[i]
    let comment = null
    if (isNode(item)) {
      if (!chompKeep && item.spaceBefore) lines.push("")
      addCommentBefore(ctx, lines, item.commentBefore, chompKeep)
      if (item.comment) comment = item.comment
    } else if (isPair(item)) {
      const ik = isNode(item.key) ? item.key : null
      if (ik) {
        if (!chompKeep && ik.spaceBefore) lines.push("")
        addCommentBefore(ctx, lines, ik.commentBefore, chompKeep)
      }
    }
    chompKeep = false
    let str = stringify$1(
      item,
      itemCtx,
      () => (comment = null),
      () => (chompKeep = true),
    )
    if (comment) str += lineComment(str, itemIndent, commentString(comment))
    if (chompKeep && comment) chompKeep = false
    lines.push(blockItemPrefix + str)
  }
  let str
  if (lines.length === 0) str = flowChars.start + flowChars.end
  else {
    str = lines[0]
    for (let i = 1; i < lines.length; ++i) {
      const line = lines[i]
      str += line ? `\n${indent}${line}` : "\n"
    }
  }
  if (comment) {
    str += `\n${indentComment(commentString(comment), indent)}`
    if (onComment) onComment()
  } else if (chompKeep && onChompKeep) onChompKeep()
  return str
}
function stringifyFlowCollection({ items }, ctx, { flowChars, itemIndent }) {
  const {
    indent,
    indentStep,
    flowCollectionPadding: fcPadding,
    options: { commentString },
  } = ctx
  itemIndent += indentStep
  const itemCtx = { ...ctx, indent: itemIndent, inFlow: true, type: null }
  let reqNewline = false
  let linesAtValue = 0
  const lines = []
  for (let i = 0; i < items.length; ++i) {
    const item = items[i]
    let comment = null
    if (isNode(item)) {
      if (item.spaceBefore) lines.push("")
      addCommentBefore(ctx, lines, item.commentBefore, false)
      if (item.comment) comment = item.comment
    } else if (isPair(item)) {
      const ik = isNode(item.key) ? item.key : null
      if (ik) {
        if (ik.spaceBefore) lines.push("")
        addCommentBefore(ctx, lines, ik.commentBefore, false)
        if (ik.comment) reqNewline = true
      }
      const iv = isNode(item.value) ? item.value : null
      if (iv) {
        if (iv.comment) comment = iv.comment
        if (iv.commentBefore) reqNewline = true
      } else if (item.value == null && ik?.comment) comment = ik.comment
    }
    if (comment) reqNewline = true
    let str = stringify$1(item, itemCtx, () => (comment = null))
    reqNewline || (reqNewline = lines.length > linesAtValue || str.includes("\n"))
    if (i < items.length - 1) str += ","
    else if (ctx.options.trailingComma) {
      if (ctx.options.lineWidth > 0)
        reqNewline ||
          (reqNewline =
            lines.reduce((sum, line) => sum + line.length + 2, 2) + (str.length + 2) >
            ctx.options.lineWidth)
      if (reqNewline) str += ","
    }
    if (comment) str += lineComment(str, itemIndent, commentString(comment))
    lines.push(str)
    linesAtValue = lines.length
  }
  const { start, end } = flowChars
  if (lines.length === 0) return start + end
  else {
    if (!reqNewline) {
      const len = lines.reduce((sum, line) => sum + line.length + 2, 2)
      reqNewline = ctx.options.lineWidth > 0 && len > ctx.options.lineWidth
    }
    if (reqNewline) {
      let str = start
      for (const line of lines) str += line ? `\n${indentStep}${indent}${line}` : "\n"
      return `${str}\n${indent}${end}`
    } else return `${start}${fcPadding}${lines.join(" ")}${fcPadding}${end}`
  }
}
function addCommentBefore({ indent, options: { commentString } }, lines, comment, chompKeep) {
  if (comment && chompKeep) comment = comment.replace(/^\n+/, "")
  if (comment) {
    const ic = indentComment(commentString(comment), indent)
    lines.push(ic.trimStart())
  }
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/nodes/YAMLMap.js
function findPair(items, key) {
  const k = isScalar(key) ? key.value : key
  for (const it of items)
    if (isPair(it)) {
      if (it.key === key || it.key === k) return it
      if (isScalar(it.key) && it.key.value === k) return it
    }
}
const YAMLMap = class extends Collection {
  static get tagName() {
    return "tag:yaml.org,2002:map"
  }
  constructor(schema) {
    super(MAP, schema)
    this.items = []
  }
  /**
   * A generic collection parsing method that can be extended
   * to other node classes that inherit from YAMLMap
   */
  static from(schema, obj, ctx) {
    const { keepUndefined, replacer } = ctx
    const map = new this(schema)
    const add = (key, value) => {
      if (typeof replacer === "function") value = replacer.call(obj, key, value)
      else if (Array.isArray(replacer) && !replacer.includes(key)) return
      if (value !== void 0 || keepUndefined) map.items.push(createPair(key, value, ctx))
    }
    if (obj instanceof Map) for (const [key, value] of obj) add(key, value)
    else if (obj && typeof obj === "object") for (const key of Object.keys(obj)) add(key, obj[key])
    if (typeof schema.sortMapEntries === "function") map.items.sort(schema.sortMapEntries)
    return map
  }
  /**
   * Adds a value to the collection.
   *
   * @param overwrite - If not set `true`, using a key that is already in the
   *   collection will throw. Otherwise, overwrites the previous value.
   */
  add(pair, overwrite) {
    let _pair
    if (isPair(pair)) _pair = pair
    else if (!pair || typeof pair !== "object" || !("key" in pair))
      _pair = new Pair(pair, pair?.value)
    else _pair = new Pair(pair.key, pair.value)
    const prev = findPair(this.items, _pair.key)
    const sortEntries = this.schema?.sortMapEntries
    if (prev) {
      if (!overwrite) throw new Error(`Key ${_pair.key} already set`)
      if (isScalar(prev.value) && isScalarValue(_pair.value)) prev.value.value = _pair.value
      else prev.value = _pair.value
    } else if (sortEntries) {
      const i = this.items.findIndex((item) => sortEntries(_pair, item) < 0)
      if (i === -1) this.items.push(_pair)
      else this.items.splice(i, 0, _pair)
    } else this.items.push(_pair)
  }
  delete(key) {
    const it = findPair(this.items, key)
    if (!it) return false
    return this.items.splice(this.items.indexOf(it), 1).length > 0
  }
  get(key, keepScalar) {
    const node = findPair(this.items, key)?.value
    return (!keepScalar && isScalar(node) ? node.value : node) ?? void 0
  }
  has(key) {
    return !!findPair(this.items, key)
  }
  set(key, value) {
    this.add(new Pair(key, value), true)
  }
  /**
   * @param ctx - Conversion context, originally set in Document#toJS()
   * @param {Class} Type - If set, forces the returned collection type
   * @returns Instance of Type, Map, or Object
   */
  toJSON(_, ctx, Type) {
    const map = Type ? new Type() : ctx?.mapAsMap ? /* @__PURE__ */ new Map() : {}
    if (ctx?.onCreate) ctx.onCreate(map)
    for (const item of this.items) addPairToJSMap(ctx, map, item)
    return map
  }
  toString(ctx, onComment, onChompKeep) {
    if (!ctx) return JSON.stringify(this)
    for (const item of this.items)
      if (!isPair(item))
        throw new Error(`Map items must all be pairs; found ${JSON.stringify(item)} instead`)
    if (!ctx.allNullValues && this.hasAllNullValues(false))
      ctx = Object.assign({}, ctx, { allNullValues: true })
    return stringifyCollection(this, ctx, {
      blockItemPrefix: "",
      flowChars: {
        start: "{",
        end: "}",
      },
      itemIndent: ctx.indent || "",
      onChompKeep,
      onComment,
    })
  }
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/schema/common/map.js
const map = {
  collection: "map",
  default: true,
  nodeClass: YAMLMap,
  tag: "tag:yaml.org,2002:map",
  resolve(map, onError) {
    if (!isMap(map)) onError("Expected a mapping for this tag")
    return map
  },
  createNode: (schema, obj, ctx) => YAMLMap.from(schema, obj, ctx),
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/nodes/YAMLSeq.js
const YAMLSeq = class extends Collection {
  static get tagName() {
    return "tag:yaml.org,2002:seq"
  }
  constructor(schema) {
    super(SEQ, schema)
    this.items = []
  }
  add(value) {
    this.items.push(value)
  }
  /**
   * Removes a value from the collection.
   *
   * `key` must contain a representation of an integer for this to succeed.
   * It may be wrapped in a `Scalar`.
   *
   * @returns `true` if the item was found and removed.
   */
  delete(key) {
    const idx = asItemIndex(key)
    if (typeof idx !== "number") return false
    return this.items.splice(idx, 1).length > 0
  }
  get(key, keepScalar) {
    const idx = asItemIndex(key)
    if (typeof idx !== "number") return void 0
    const it = this.items[idx]
    return !keepScalar && isScalar(it) ? it.value : it
  }
  /**
   * Checks if the collection includes a value with the key `key`.
   *
   * `key` must contain a representation of an integer for this to succeed.
   * It may be wrapped in a `Scalar`.
   */
  has(key) {
    const idx = asItemIndex(key)
    return typeof idx === "number" && idx < this.items.length
  }
  /**
   * Sets a value in this collection. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   *
   * If `key` does not contain a representation of an integer, this will throw.
   * It may be wrapped in a `Scalar`.
   */
  set(key, value) {
    const idx = asItemIndex(key)
    if (typeof idx !== "number") throw new Error(`Expected a valid index, not ${key}.`)
    const prev = this.items[idx]
    if (isScalar(prev) && isScalarValue(value)) prev.value = value
    else this.items[idx] = value
  }
  toJSON(_, ctx) {
    const seq = []
    if (ctx?.onCreate) ctx.onCreate(seq)
    let i = 0
    for (const item of this.items) seq.push(toJS(item, String(i++), ctx))
    return seq
  }
  toString(ctx, onComment, onChompKeep) {
    if (!ctx) return JSON.stringify(this)
    return stringifyCollection(this, ctx, {
      blockItemPrefix: "- ",
      flowChars: {
        start: "[",
        end: "]",
      },
      itemIndent: (ctx.indent || "") + "  ",
      onChompKeep,
      onComment,
    })
  }
  static from(schema, obj, ctx) {
    const { replacer } = ctx
    const seq = new this(schema)
    if (obj && Symbol.iterator in Object(obj)) {
      let i = 0
      for (let it of obj) {
        if (typeof replacer === "function") {
          const key = obj instanceof Set ? it : String(i++)
          it = replacer.call(obj, key, it)
        }
        seq.items.push(createNode(it, void 0, ctx))
      }
    }
    return seq
  }
}
function asItemIndex(key) {
  let idx = isScalar(key) ? key.value : key
  if (idx && typeof idx === "string") idx = Number(idx)
  return typeof idx === "number" && Number.isInteger(idx) && idx >= 0 ? idx : null
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/schema/common/seq.js
const seq = {
  collection: "seq",
  default: true,
  nodeClass: YAMLSeq,
  tag: "tag:yaml.org,2002:seq",
  resolve(seq, onError) {
    if (!isSeq(seq)) onError("Expected a sequence for this tag")
    return seq
  },
  createNode: (schema, obj, ctx) => YAMLSeq.from(schema, obj, ctx),
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/schema/common/string.js
const string = {
  identify: (value) => typeof value === "string",
  default: true,
  tag: "tag:yaml.org,2002:str",
  resolve: (str) => str,
  stringify(item, ctx, onComment, onChompKeep) {
    ctx = Object.assign({ actualString: true }, ctx)
    return stringifyString(item, ctx, onComment, onChompKeep)
  },
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/schema/common/null.js
const nullTag = {
  identify: (value) => value == null,
  createNode: () => new Scalar(null),
  default: true,
  tag: "tag:yaml.org,2002:null",
  test: /^(?:~|[Nn]ull|NULL)?$/,
  resolve: () => new Scalar(null),
  stringify: ({ source }, ctx) =>
    typeof source === "string" && nullTag.test.test(source) ? source : ctx.options.nullStr,
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/schema/core/bool.js
const boolTag = {
  identify: (value) => typeof value === "boolean",
  default: true,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
  resolve: (str) => new Scalar(str[0] === "t" || str[0] === "T"),
  stringify({ source, value }, ctx) {
    if (source && boolTag.test.test(source)) {
      if (value === (source[0] === "t" || source[0] === "T")) return source
    }
    return value ? ctx.options.trueStr : ctx.options.falseStr
  },
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/stringify/stringifyNumber.js
function stringifyNumber({ format, minFractionDigits, tag, value }) {
  if (typeof value === "bigint") return String(value)
  const num = typeof value === "number" ? value : Number(value)
  if (!isFinite(num)) return isNaN(num) ? ".nan" : num < 0 ? "-.inf" : ".inf"
  let n = Object.is(value, -0) ? "-0" : JSON.stringify(value)
  if (
    !format &&
    minFractionDigits &&
    (!tag || tag === "tag:yaml.org,2002:float") &&
    /^-?\d/.test(n) &&
    !n.includes("e")
  ) {
    let i = n.indexOf(".")
    if (i < 0) {
      i = n.length
      n += "."
    }
    let d = minFractionDigits - (n.length - i - 1)
    while (d-- > 0) n += "0"
  }
  return n
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/schema/core/float.js
const floatNaN$1 = {
  identify: (value) => typeof value === "number",
  default: true,
  tag: "tag:yaml.org,2002:float",
  test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
  resolve: (str) =>
    str.slice(-3).toLowerCase() === "nan"
      ? NaN
      : str[0] === "-"
        ? Number.NEGATIVE_INFINITY
        : Number.POSITIVE_INFINITY,
  stringify: stringifyNumber,
}
const floatExp$1 = {
  identify: (value) => typeof value === "number",
  default: true,
  tag: "tag:yaml.org,2002:float",
  format: "EXP",
  test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
  resolve: (str) => parseFloat(str),
  stringify(node) {
    const num = Number(node.value)
    return isFinite(num) ? num.toExponential() : stringifyNumber(node)
  },
}
const float$1 = {
  identify: (value) => typeof value === "number",
  default: true,
  tag: "tag:yaml.org,2002:float",
  test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
  resolve(str) {
    const node = new Scalar(parseFloat(str))
    const dot = str.indexOf(".")
    if (dot !== -1 && str[str.length - 1] === "0") node.minFractionDigits = str.length - dot - 1
    return node
  },
  stringify: stringifyNumber,
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/schema/core/int.js
const intIdentify$2 = (value) => typeof value === "bigint" || Number.isInteger(value)
const intResolve$1 = (str, offset, radix, { intAsBigInt }) =>
  intAsBigInt ? BigInt(str) : parseInt(str.substring(offset), radix)
function intStringify$1(node, radix, prefix) {
  const { value } = node
  if (intIdentify$2(value) && value >= 0) return prefix + value.toString(radix)
  return stringifyNumber(node)
}
const intOct$1 = {
  identify: (value) => intIdentify$2(value) && value >= 0,
  default: true,
  tag: "tag:yaml.org,2002:int",
  format: "OCT",
  test: /^0o[0-7]+$/,
  resolve: (str, _onError, opt) => intResolve$1(str, 2, 8, opt),
  stringify: (node) => intStringify$1(node, 8, "0o"),
}
const int$1 = {
  identify: intIdentify$2,
  default: true,
  tag: "tag:yaml.org,2002:int",
  test: /^[-+]?[0-9]+$/,
  resolve: (str, _onError, opt) => intResolve$1(str, 0, 10, opt),
  stringify: stringifyNumber,
}
const intHex$1 = {
  identify: (value) => intIdentify$2(value) && value >= 0,
  default: true,
  tag: "tag:yaml.org,2002:int",
  format: "HEX",
  test: /^0x[0-9a-fA-F]+$/,
  resolve: (str, _onError, opt) => intResolve$1(str, 2, 16, opt),
  stringify: (node) => intStringify$1(node, 16, "0x"),
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/schema/core/schema.js
const schema$2 = [
  map,
  seq,
  string,
  nullTag,
  boolTag,
  intOct$1,
  int$1,
  intHex$1,
  floatNaN$1,
  floatExp$1,
  float$1,
]
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/schema/json/schema.js
function intIdentify$1(value) {
  return typeof value === "bigint" || Number.isInteger(value)
}
const stringifyJSON = ({ value }) => JSON.stringify(value)
const jsonScalars = [
  {
    identify: (value) => typeof value === "string",
    default: true,
    tag: "tag:yaml.org,2002:str",
    resolve: (str) => str,
    stringify: stringifyJSON,
  },
  {
    identify: (value) => value == null,
    createNode: () => new Scalar(null),
    default: true,
    tag: "tag:yaml.org,2002:null",
    test: /^null$/,
    resolve: () => null,
    stringify: stringifyJSON,
  },
  {
    identify: (value) => typeof value === "boolean",
    default: true,
    tag: "tag:yaml.org,2002:bool",
    test: /^true$|^false$/,
    resolve: (str) => str === "true",
    stringify: stringifyJSON,
  },
  {
    identify: intIdentify$1,
    default: true,
    tag: "tag:yaml.org,2002:int",
    test: /^-?(?:0|[1-9][0-9]*)$/,
    resolve: (str, _onError, { intAsBigInt }) => (intAsBigInt ? BigInt(str) : parseInt(str, 10)),
    stringify: ({ value }) => (intIdentify$1(value) ? value.toString() : JSON.stringify(value)),
  },
  {
    identify: (value) => typeof value === "number",
    default: true,
    tag: "tag:yaml.org,2002:float",
    test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
    resolve: (str) => parseFloat(str),
    stringify: stringifyJSON,
  },
]
const schema$1 = [map, seq].concat(jsonScalars, {
  default: true,
  tag: "",
  test: /^/,
  resolve(str, onError) {
    onError(`Unresolved plain scalar ${JSON.stringify(str)}`)
    return str
  },
})
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/schema/yaml-1.1/binary.js
const binary = {
  identify: (value) => value instanceof Uint8Array,
  default: false,
  tag: "tag:yaml.org,2002:binary",
  /**
   * Returns a Buffer in node and an Uint8Array in browsers
   *
   * To use the resulting buffer as an image, you'll want to do something like:
   *
   *   const blob = new Blob([buffer], { type: 'image/jpeg' })
   *   document.querySelector('#photo').src = URL.createObjectURL(blob)
   */
  resolve(src, onError) {
    if (typeof atob === "function") {
      const str = atob(src.replace(/[\n\r]/g, ""))
      const buffer = new Uint8Array(str.length)
      for (let i = 0; i < str.length; ++i) buffer[i] = str.charCodeAt(i)
      return buffer
    } else {
      onError(
        "This environment does not support reading binary tags; either Buffer or atob is required",
      )
      return src
    }
  },
  stringify({ comment, type, value }, ctx, onComment, onChompKeep) {
    if (!value) return ""
    const buf = value
    let str
    if (typeof btoa === "function") {
      let s = ""
      for (let i = 0; i < buf.length; ++i) s += String.fromCharCode(buf[i])
      str = btoa(s)
    } else
      throw new Error(
        "This environment does not support writing binary tags; either Buffer or btoa is required",
      )
    type ?? (type = Scalar.BLOCK_LITERAL)
    if (type !== Scalar.QUOTE_DOUBLE) {
      const lineWidth = Math.max(
        ctx.options.lineWidth - ctx.indent.length,
        ctx.options.minContentWidth,
      )
      const n = Math.ceil(str.length / lineWidth)
      const lines = new Array(n)
      for (let i = 0, o = 0; i < n; ++i, o += lineWidth) lines[i] = str.substr(o, lineWidth)
      str = lines.join(type === Scalar.BLOCK_LITERAL ? "\n" : " ")
    }
    return stringifyString(
      {
        comment,
        type,
        value: str,
      },
      ctx,
      onComment,
      onChompKeep,
    )
  },
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/schema/yaml-1.1/pairs.js
function resolvePairs(seq, onError) {
  if (isSeq(seq))
    for (let i = 0; i < seq.items.length; ++i) {
      let item = seq.items[i]
      if (isPair(item)) continue
      else if (isMap(item)) {
        if (item.items.length > 1) onError("Each pair must have its own sequence indicator")
        const pair = item.items[0] || new Pair(new Scalar(null))
        if (item.commentBefore)
          pair.key.commentBefore = pair.key.commentBefore
            ? `${item.commentBefore}\n${pair.key.commentBefore}`
            : item.commentBefore
        if (item.comment) {
          const cn = pair.value ?? pair.key
          cn.comment = cn.comment ? `${item.comment}\n${cn.comment}` : item.comment
        }
        item = pair
      }
      seq.items[i] = isPair(item) ? item : new Pair(item)
    }
  else onError("Expected a sequence for this tag")
  return seq
}
function createPairs(schema, iterable, ctx) {
  const { replacer } = ctx
  const pairs = new YAMLSeq(schema)
  pairs.tag = "tag:yaml.org,2002:pairs"
  let i = 0
  if (iterable && Symbol.iterator in Object(iterable))
    for (let it of iterable) {
      if (typeof replacer === "function") it = replacer.call(iterable, String(i++), it)
      let key, value
      if (Array.isArray(it)) {
        if (it.length === 2) {
          key = it[0]
          value = it[1]
        } else throw new TypeError(`Expected [key, value] tuple: ${it}`)
      } else if (it && it instanceof Object) {
        const keys = Object.keys(it)
        if (keys.length === 1) {
          key = keys[0]
          value = it[key]
        } else throw new TypeError(`Expected tuple with one key, not ${keys.length} keys`)
      } else key = it
      pairs.items.push(createPair(key, value, ctx))
    }
  return pairs
}
const pairs = {
  collection: "seq",
  default: false,
  tag: "tag:yaml.org,2002:pairs",
  resolve: resolvePairs,
  createNode: createPairs,
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/schema/yaml-1.1/omap.js
const YAMLOMap = class YAMLOMap extends YAMLSeq {
  constructor() {
    super()
    this.add = YAMLMap.prototype.add.bind(this)
    this.delete = YAMLMap.prototype.delete.bind(this)
    this.get = YAMLMap.prototype.get.bind(this)
    this.has = YAMLMap.prototype.has.bind(this)
    this.set = YAMLMap.prototype.set.bind(this)
    this.tag = YAMLOMap.tag
  }
  /**
   * If `ctx` is given, the return type is actually `Map<unknown, unknown>`,
   * but TypeScript won't allow widening the signature of a child method.
   */
  toJSON(_, ctx) {
    if (!ctx) return super.toJSON(_)
    const map = /* @__PURE__ */ new Map()
    if (ctx?.onCreate) ctx.onCreate(map)
    for (const pair of this.items) {
      let key, value
      if (isPair(pair)) {
        key = toJS(pair.key, "", ctx)
        value = toJS(pair.value, key, ctx)
      } else key = toJS(pair, "", ctx)
      if (map.has(key)) throw new Error("Ordered maps must not include duplicate keys")
      map.set(key, value)
    }
    return map
  }
  static from(schema, iterable, ctx) {
    const pairs = createPairs(schema, iterable, ctx)
    const omap = new this()
    omap.items = pairs.items
    return omap
  }
}
YAMLOMap.tag = "tag:yaml.org,2002:omap"
const omap = {
  collection: "seq",
  identify: (value) => value instanceof Map,
  nodeClass: YAMLOMap,
  default: false,
  tag: "tag:yaml.org,2002:omap",
  resolve(seq, onError) {
    const pairs = resolvePairs(seq, onError)
    const seenKeys = []
    for (const { key } of pairs.items)
      if (isScalar(key)) {
        if (seenKeys.includes(key.value))
          onError(`Ordered maps must not include duplicate keys: ${key.value}`)
        else seenKeys.push(key.value)
      }
    return Object.assign(new YAMLOMap(), pairs)
  },
  createNode: (schema, iterable, ctx) => YAMLOMap.from(schema, iterable, ctx),
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/schema/yaml-1.1/bool.js
function boolStringify({ value, source }, ctx) {
  if (source && (value ? trueTag : falseTag).test.test(source)) return source
  return value ? ctx.options.trueStr : ctx.options.falseStr
}
const trueTag = {
  identify: (value) => value === true,
  default: true,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
  resolve: () => new Scalar(true),
  stringify: boolStringify,
}
const falseTag = {
  identify: (value) => value === false,
  default: true,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,
  resolve: () => new Scalar(false),
  stringify: boolStringify,
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/schema/yaml-1.1/float.js
const floatNaN = {
  identify: (value) => typeof value === "number",
  default: true,
  tag: "tag:yaml.org,2002:float",
  test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
  resolve: (str) =>
    str.slice(-3).toLowerCase() === "nan"
      ? NaN
      : str[0] === "-"
        ? Number.NEGATIVE_INFINITY
        : Number.POSITIVE_INFINITY,
  stringify: stringifyNumber,
}
const floatExp = {
  identify: (value) => typeof value === "number",
  default: true,
  tag: "tag:yaml.org,2002:float",
  format: "EXP",
  test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
  resolve: (str) => parseFloat(str.replace(/_/g, "")),
  stringify(node) {
    const num = Number(node.value)
    return isFinite(num) ? num.toExponential() : stringifyNumber(node)
  },
}
const float = {
  identify: (value) => typeof value === "number",
  default: true,
  tag: "tag:yaml.org,2002:float",
  test: /^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,
  resolve(str) {
    const node = new Scalar(parseFloat(str.replace(/_/g, "")))
    const dot = str.indexOf(".")
    if (dot !== -1) {
      const f = str.substring(dot + 1).replace(/_/g, "")
      if (f[f.length - 1] === "0") node.minFractionDigits = f.length
    }
    return node
  },
  stringify: stringifyNumber,
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/schema/yaml-1.1/int.js
const intIdentify = (value) => typeof value === "bigint" || Number.isInteger(value)
function intResolve(str, offset, radix, { intAsBigInt }) {
  const sign = str[0]
  if (sign === "-" || sign === "+") offset += 1
  str = str.substring(offset).replaceAll("_", "")
  if (intAsBigInt) {
    switch (radix) {
      case 2:
        str = `0b${str}`
        break
      case 8:
        str = `0o${str}`
        break
      case 16:
        str = `0x${str}`
    }
    const n = BigInt(str)
    return sign === "-" ? BigInt(-1) * n : n
  }
  const n = parseInt(str, radix)
  return sign === "-" ? -1 * n : n
}
function intStringify(node, radix, prefix) {
  const { value } = node
  if (intIdentify(value)) {
    const str = value.toString(radix)
    return value < 0 ? `-${prefix}${str.substr(1)}` : prefix + str
  }
  return stringifyNumber(node)
}
const intBin = {
  identify: intIdentify,
  default: true,
  tag: "tag:yaml.org,2002:int",
  format: "BIN",
  test: /^[-+]?0b[0-1_]+$/,
  resolve: (str, _onError, opt) => intResolve(str, 2, 2, opt),
  stringify: (node) => intStringify(node, 2, "0b"),
}
const intOct = {
  identify: intIdentify,
  default: true,
  tag: "tag:yaml.org,2002:int",
  format: "OCT",
  test: /^[-+]?0[0-7_]+$/,
  resolve: (str, _onError, opt) => intResolve(str, 1, 8, opt),
  stringify: (node) => intStringify(node, 8, "0"),
}
const int = {
  identify: intIdentify,
  default: true,
  tag: "tag:yaml.org,2002:int",
  test: /^[-+]?[0-9][0-9_]*$/,
  resolve: (str, _onError, opt) => intResolve(str, 0, 10, opt),
  stringify: stringifyNumber,
}
const intHex = {
  identify: intIdentify,
  default: true,
  tag: "tag:yaml.org,2002:int",
  format: "HEX",
  test: /^[-+]?0x[0-9a-fA-F_]+$/,
  resolve: (str, _onError, opt) => intResolve(str, 2, 16, opt),
  stringify: (node) => intStringify(node, 16, "0x"),
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/schema/yaml-1.1/set.js
const YAMLSet = class YAMLSet extends YAMLMap {
  constructor(schema) {
    super(schema)
    this.tag = YAMLSet.tag
  }
  add(key) {
    let pair
    if (isPair(key)) pair = key
    else if (key && typeof key === "object" && "key" in key && "value" in key && key.value === null)
      pair = new Pair(key.key, null)
    else pair = new Pair(key, null)
    if (!findPair(this.items, pair.key)) this.items.push(pair)
  }
  /**
   * If `keepPair` is `true`, returns the Pair matching `key`.
   * Otherwise, returns the value of that Pair's key.
   */
  get(key, keepPair) {
    const pair = findPair(this.items, key)
    return !keepPair && isPair(pair) ? (isScalar(pair.key) ? pair.key.value : pair.key) : pair
  }
  set(key, value) {
    if (typeof value !== "boolean")
      throw new Error(
        `Expected boolean value for set(key, value) in a YAML set, not ${typeof value}`,
      )
    const prev = findPair(this.items, key)
    if (prev && !value) this.items.splice(this.items.indexOf(prev), 1)
    else if (!prev && value) this.items.push(new Pair(key))
  }
  toJSON(_, ctx) {
    return super.toJSON(_, ctx, Set)
  }
  toString(ctx, onComment, onChompKeep) {
    if (!ctx) return JSON.stringify(this)
    if (this.hasAllNullValues(true))
      return super.toString(Object.assign({}, ctx, { allNullValues: true }), onComment, onChompKeep)
    else throw new Error("Set items must all have null values")
  }
  static from(schema, iterable, ctx) {
    const { replacer } = ctx
    const set = new this(schema)
    if (iterable && Symbol.iterator in Object(iterable))
      for (let value of iterable) {
        if (typeof replacer === "function") value = replacer.call(iterable, value, value)
        set.items.push(createPair(value, null, ctx))
      }
    return set
  }
}
YAMLSet.tag = "tag:yaml.org,2002:set"
const set = {
  collection: "map",
  identify: (value) => value instanceof Set,
  nodeClass: YAMLSet,
  default: false,
  tag: "tag:yaml.org,2002:set",
  createNode: (schema, iterable, ctx) => YAMLSet.from(schema, iterable, ctx),
  resolve(map, onError) {
    if (isMap(map)) {
      if (map.hasAllNullValues(true)) return Object.assign(new YAMLSet(), map)
      else onError("Set items must all have null values")
    } else onError("Expected a mapping for this tag")
    return map
  },
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/schema/yaml-1.1/timestamp.js
/** Internal types handle bigint as number, because TS can't figure it out. */
function parseSexagesimal(str, asBigInt) {
  const sign = str[0]
  const parts = sign === "-" || sign === "+" ? str.slice(1) : str
  const num = (n) => (asBigInt ? BigInt(n) : Number(n))
  const res = parts
    .replaceAll("_", "")
    .split(":")
    .reduce((res, p) => res * num(60) + num(p), num(0))
  return sign === "-" ? num(-1) * res : res
}
/**
 * hhhh:mm:ss.sss
 *
 * Internal types handle bigint as number, because TS can't figure it out.
 */
function stringifySexagesimal(node) {
  let { value } = node
  let num = (n) => n
  if (typeof value === "bigint") num = (n) => BigInt(n)
  else if (isNaN(value) || !isFinite(value)) return stringifyNumber(node)
  let sign = ""
  if (value < 0) {
    sign = "-"
    value *= num(-1)
  }
  const _60 = num(60)
  const parts = [value % _60]
  if (value < 60) parts.unshift(0)
  else {
    value = (value - parts[0]) / _60
    parts.unshift(value % _60)
    if (value >= 60) {
      value = (value - parts[0]) / _60
      parts.unshift(value)
    }
  }
  return (
    sign +
    parts
      .map((n) => String(n).padStart(2, "0"))
      .join(":")
      .replace(/000000\d*$/, "")
  )
}
const intTime = {
  identify: (value) => typeof value === "bigint" || Number.isInteger(value),
  default: true,
  tag: "tag:yaml.org,2002:int",
  format: "TIME",
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
  resolve: (str, _onError, { intAsBigInt }) => parseSexagesimal(str, intAsBigInt),
  stringify: stringifySexagesimal,
}
const floatTime = {
  identify: (value) => typeof value === "number",
  default: true,
  tag: "tag:yaml.org,2002:float",
  format: "TIME",
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
  resolve: (str) => parseSexagesimal(str, false),
  stringify: stringifySexagesimal,
}
const timestamp = {
  identify: (value) => value instanceof Date,
  default: true,
  tag: "tag:yaml.org,2002:timestamp",
  test: RegExp(
    "^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$",
  ),
  resolve(str) {
    const match = str.match(timestamp.test)
    if (!match) throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd")
    const [, year, month, day, hour, minute, second] = match.map(Number)
    const millisec = match[7] ? Number((match[7] + "00").substr(1, 3)) : 0
    let date = Date.UTC(year, month - 1, day, hour || 0, minute || 0, second || 0, millisec)
    const tz = match[8]
    if (tz && tz !== "Z") {
      let d = parseSexagesimal(tz, false)
      if (Math.abs(d) < 30) d *= 60
      date -= 6e4 * d
    }
    return new Date(date)
  },
  stringify: ({ value }) => value?.toISOString().replace(/(T00:00:00)?\.000Z$/, "") ?? "",
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/schema/yaml-1.1/schema.js
const schema = [
  map,
  seq,
  string,
  nullTag,
  trueTag,
  falseTag,
  intBin,
  intOct,
  int,
  intHex,
  floatNaN,
  floatExp,
  float,
  binary,
  merge,
  omap,
  pairs,
  set,
  intTime,
  floatTime,
  timestamp,
]
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/schema/tags.js
const schemas = /* @__PURE__ */ new Map([
  ["core", schema$2],
  ["failsafe", [map, seq, string]],
  ["json", schema$1],
  ["yaml11", schema],
  ["yaml-1.1", schema],
])
const tagsByName = {
  binary,
  bool: boolTag,
  float: float$1,
  floatExp: floatExp$1,
  floatNaN: floatNaN$1,
  floatTime,
  int: int$1,
  intHex: intHex$1,
  intOct: intOct$1,
  intTime,
  map,
  merge,
  null: nullTag,
  omap,
  pairs,
  seq,
  set,
  timestamp,
}
const coreKnownTags = {
  "tag:yaml.org,2002:binary": binary,
  "tag:yaml.org,2002:merge": merge,
  "tag:yaml.org,2002:omap": omap,
  "tag:yaml.org,2002:pairs": pairs,
  "tag:yaml.org,2002:set": set,
  "tag:yaml.org,2002:timestamp": timestamp,
}
function getTags(customTags, schemaName, addMergeTag) {
  const schemaTags = schemas.get(schemaName)
  if (schemaTags && !customTags)
    return addMergeTag && !schemaTags.includes(merge) ? schemaTags.concat(merge) : [...schemaTags]
  let tags = schemaTags
  if (!tags) {
    if (Array.isArray(customTags)) tags = []
    else {
      const keys = [...schemas.keys()]
        .filter((key) => key !== "yaml11")
        .map((key) => JSON.stringify(key))
        .join(", ")
      throw new Error(
        `Unknown schema "${schemaName}"; use one of ${keys} or define customTags array`,
      )
    }
  }
  if (Array.isArray(customTags)) for (const tag of customTags) tags = tags.concat(tag)
  else if (typeof customTags === "function") tags = customTags([...tags])
  if (addMergeTag) tags = tags.concat(merge)
  return tags.reduce((tags, tag) => {
    const tagObj = typeof tag === "string" ? tagsByName[tag] : tag
    if (!tagObj) {
      const tagName = JSON.stringify(tag)
      const keys = Object.keys(tagsByName)
        .map((key) => JSON.stringify(key))
        .join(", ")
      throw new Error(`Unknown custom tag ${tagName}; use one of ${keys}`)
    }
    if (!tags.includes(tagObj)) tags.push(tagObj)
    return tags
  }, [])
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/schema/Schema.js
const sortMapEntriesByKey = (a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0)
const Schema = class Schema {
  constructor({
    compat,
    customTags,
    merge,
    resolveKnownTags,
    schema,
    sortMapEntries,
    toStringDefaults,
  }) {
    this.compat = Array.isArray(compat)
      ? getTags(compat, "compat")
      : compat
        ? getTags(null, compat)
        : null
    this.name = (typeof schema === "string" && schema) || "core"
    this.knownTags = resolveKnownTags ? coreKnownTags : {}
    this.tags = getTags(customTags, this.name, merge)
    this.toStringOptions = toStringDefaults ?? null
    Object.defineProperty(this, MAP, { value: map })
    Object.defineProperty(this, SCALAR$1, { value: string })
    Object.defineProperty(this, SEQ, { value: seq })
    this.sortMapEntries =
      typeof sortMapEntries === "function"
        ? sortMapEntries
        : sortMapEntries === true
          ? sortMapEntriesByKey
          : null
  }
  clone() {
    const copy = Object.create(Schema.prototype, Object.getOwnPropertyDescriptors(this))
    copy.tags = this.tags.slice()
    return copy
  }
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/stringify/stringifyDocument.js
function stringifyDocument(doc, options) {
  const lines = []
  let hasDirectives = options.directives === true
  if (options.directives !== false && doc.directives) {
    const dir = doc.directives.toString(doc)
    if (dir) {
      lines.push(dir)
      hasDirectives = true
    } else if (doc.directives.docStart) hasDirectives = true
  }
  if (hasDirectives) lines.push("---")
  const ctx = createStringifyContext(doc, options)
  const { commentString } = ctx.options
  if (doc.commentBefore) {
    if (lines.length !== 1) lines.unshift("")
    const cs = commentString(doc.commentBefore)
    lines.unshift(indentComment(cs, ""))
  }
  let chompKeep = false
  let contentComment = null
  if (doc.contents) {
    if (isNode(doc.contents)) {
      if (doc.contents.spaceBefore && hasDirectives) lines.push("")
      if (doc.contents.commentBefore) {
        const cs = commentString(doc.contents.commentBefore)
        lines.push(indentComment(cs, ""))
      }
      ctx.forceBlockIndent = Boolean(doc.comment)
      contentComment = doc.contents.comment
    }
    const onChompKeep = contentComment ? void 0 : () => (chompKeep = true)
    let body = stringify$1(doc.contents, ctx, () => (contentComment = null), onChompKeep)
    if (contentComment) body += lineComment(body, "", commentString(contentComment))
    if ((body[0] === "|" || body[0] === ">") && lines.at(-1) === "---")
      lines[lines.length - 1] = `--- ${body}`
    else lines.push(body)
  } else lines.push(stringify$1(doc.contents, ctx))
  if (doc.directives?.docEnd) {
    if (doc.comment) {
      const cs = commentString(doc.comment)
      if (cs.includes("\n")) {
        lines.push("...")
        lines.push(indentComment(cs, ""))
      } else lines.push(`... ${cs}`)
    } else lines.push("...")
  } else {
    let dc = doc.comment
    if (dc && chompKeep) dc = dc.replace(/^\n+/, "")
    if (dc) {
      if ((!chompKeep || contentComment) && lines.at(-1) !== "") lines.push("")
      lines.push(indentComment(commentString(dc), ""))
    }
  }
  return `${lines.join("\n")}\n`
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/doc/Document.js
const Document = class Document {
  constructor(value, replacer, options) {
    /** A comment before this Document */
    this.commentBefore = null
    /** A comment immediately after this Document */
    this.comment = null
    /** Errors encountered during parsing. */
    this.errors = []
    /** Warnings encountered during parsing. */
    this.warnings = []
    Object.defineProperty(this, NODE_TYPE, { value: DOC })
    let _replacer = null
    if (typeof replacer === "function" || Array.isArray(replacer)) _replacer = replacer
    else if (options === void 0 && replacer) {
      options = replacer
      replacer = void 0
    }
    const opt = Object.assign(
      {
        intAsBigInt: false,
        keepSourceTokens: false,
        logLevel: "warn",
        prettyErrors: true,
        strict: true,
        stringKeys: false,
        uniqueKeys: true,
        version: "1.2",
      },
      options,
    )
    this.options = opt
    let { version } = opt
    if (options?._directives) {
      this.directives = options._directives.atDocument()
      if (this.directives.yaml.explicit) version = this.directives.yaml.version
    } else this.directives = new Directives({ version })
    this.setSchema(version, options)
    this.contents = value === void 0 ? null : this.createNode(value, _replacer, options)
  }
  /**
   * Create a deep copy of this Document and its contents.
   *
   * Custom Node values that inherit from `Object` still refer to their original instances.
   */
  clone() {
    const copy = Object.create(Document.prototype, { [NODE_TYPE]: { value: DOC } })
    copy.commentBefore = this.commentBefore
    copy.comment = this.comment
    copy.errors = this.errors.slice()
    copy.warnings = this.warnings.slice()
    copy.options = Object.assign({}, this.options)
    if (this.directives) copy.directives = this.directives.clone()
    copy.schema = this.schema.clone()
    copy.contents = isNode(this.contents) ? this.contents.clone(copy.schema) : this.contents
    if (this.range) copy.range = this.range.slice()
    return copy
  }
  /** Adds a value to the document. */
  add(value) {
    if (assertCollection(this.contents)) this.contents.add(value)
  }
  /** Adds a value to the document. */
  addIn(path, value) {
    if (assertCollection(this.contents)) this.contents.addIn(path, value)
  }
  /**
   * Create a new `Alias` node, ensuring that the target `node` has the required anchor.
   *
   * If `node` already has an anchor, `name` is ignored.
   * Otherwise, the `node.anchor` value will be set to `name`,
   * or if an anchor with that name is already present in the document,
   * `name` will be used as a prefix for a new unique anchor.
   * If `name` is undefined, the generated anchor will use 'a' as a prefix.
   */
  createAlias(node, name) {
    if (!node.anchor) {
      const prev = anchorNames(this)
      node.anchor = !name || prev.has(name) ? findNewAnchor(name || "a", prev) : name
    }
    return new Alias(node.anchor)
  }
  createNode(value, replacer, options) {
    let _replacer = void 0
    if (typeof replacer === "function") {
      value = replacer.call({ "": value }, "", value)
      _replacer = replacer
    } else if (Array.isArray(replacer)) {
      const keyToStr = (v) => typeof v === "number" || v instanceof String || v instanceof Number
      const asStr = replacer.filter(keyToStr).map(String)
      if (asStr.length > 0) replacer = replacer.concat(asStr)
      _replacer = replacer
    } else if (options === void 0 && replacer) {
      options = replacer
      replacer = void 0
    }
    const { aliasDuplicateObjects, anchorPrefix, flow, keepUndefined, onTagObj, tag } =
      options ?? {}
    const { onAnchor, setAnchors, sourceObjects } = createNodeAnchors(this, anchorPrefix || "a")
    const ctx = {
      aliasDuplicateObjects: aliasDuplicateObjects ?? true,
      keepUndefined: keepUndefined ?? false,
      onAnchor,
      onTagObj,
      replacer: _replacer,
      schema: this.schema,
      sourceObjects,
    }
    const node = createNode(value, tag, ctx)
    if (flow && isCollection(node)) node.flow = true
    setAnchors()
    return node
  }
  /**
   * Convert a key and a value into a `Pair` using the current schema,
   * recursively wrapping all values as `Scalar` or `Collection` nodes.
   */
  createPair(key, value, options = {}) {
    return new Pair(this.createNode(key, null, options), this.createNode(value, null, options))
  }
  /**
   * Removes a value from the document.
   * @returns `true` if the item was found and removed.
   */
  delete(key) {
    return assertCollection(this.contents) ? this.contents.delete(key) : false
  }
  /**
   * Removes a value from the document.
   * @returns `true` if the item was found and removed.
   */
  deleteIn(path) {
    if (isEmptyPath(path)) {
      if (this.contents == null) return false
      this.contents = null
      return true
    }
    return assertCollection(this.contents) ? this.contents.deleteIn(path) : false
  }
  /**
   * Returns item at `key`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  get(key, keepScalar) {
    return isCollection(this.contents) ? this.contents.get(key, keepScalar) : void 0
  }
  /**
   * Returns item at `path`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  getIn(path, keepScalar) {
    if (isEmptyPath(path))
      return !keepScalar && isScalar(this.contents) ? this.contents.value : this.contents
    return isCollection(this.contents) ? this.contents.getIn(path, keepScalar) : void 0
  }
  /**
   * Checks if the document includes a value with the key `key`.
   */
  has(key) {
    return isCollection(this.contents) ? this.contents.has(key) : false
  }
  /**
   * Checks if the document includes a value at `path`.
   */
  hasIn(path) {
    if (isEmptyPath(path)) return this.contents !== void 0
    return isCollection(this.contents) ? this.contents.hasIn(path) : false
  }
  /**
   * Sets a value in this document. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  set(key, value) {
    if (this.contents == null) this.contents = collectionFromPath(this.schema, [key], value)
    else if (assertCollection(this.contents)) this.contents.set(key, value)
  }
  /**
   * Sets a value in this document. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  setIn(path, value) {
    if (isEmptyPath(path)) this.contents = value
    else if (this.contents == null)
      this.contents = collectionFromPath(this.schema, Array.from(path), value)
    else if (assertCollection(this.contents)) this.contents.setIn(path, value)
  }
  /**
   * Change the YAML version and schema used by the document.
   * A `null` version disables support for directives, explicit tags, anchors, and aliases.
   * It also requires the `schema` option to be given as a `Schema` instance value.
   *
   * Overrides all previously set schema options.
   */
  setSchema(version, options = {}) {
    if (typeof version === "number") version = String(version)
    let opt
    switch (version) {
      case "1.1":
        if (this.directives) this.directives.yaml.version = "1.1"
        else this.directives = new Directives({ version: "1.1" })
        opt = {
          resolveKnownTags: false,
          schema: "yaml-1.1",
        }
        break
      case "1.2":
      case "next":
        if (this.directives) this.directives.yaml.version = version
        else this.directives = new Directives({ version })
        opt = {
          resolveKnownTags: true,
          schema: "core",
        }
        break
      case null:
        if (this.directives) delete this.directives
        opt = null
        break
      default: {
        const sv = JSON.stringify(version)
        throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${sv}`)
      }
    }
    if (options.schema instanceof Object) this.schema = options.schema
    else if (opt) this.schema = new Schema(Object.assign(opt, options))
    else throw new Error(`With a null YAML version, the { schema: Schema } option is required`)
  }
  toJS({ json, jsonArg, mapAsMap, maxAliasCount, onAnchor, reviver } = {}) {
    const ctx = {
      anchors: /* @__PURE__ */ new Map(),
      doc: this,
      keep: !json,
      mapAsMap: mapAsMap === true,
      mapKeyWarned: false,
      maxAliasCount: typeof maxAliasCount === "number" ? maxAliasCount : 100,
    }
    const res = toJS(this.contents, jsonArg ?? "", ctx)
    if (typeof onAnchor === "function")
      for (const { count, res } of ctx.anchors.values()) onAnchor(res, count)
    return typeof reviver === "function" ? applyReviver(reviver, { "": res }, "", res) : res
  }
  /**
   * A JSON representation of the document `contents`.
   *
   * @param jsonArg Used by `JSON.stringify` to indicate the array index or
   *   property name.
   */
  toJSON(jsonArg, onAnchor) {
    return this.toJS({
      json: true,
      jsonArg,
      mapAsMap: false,
      onAnchor,
    })
  }
  /** A YAML representation of the document. */
  toString(options = {}) {
    if (this.errors.length > 0) throw new Error("Document with errors cannot be stringified")
    if ("indent" in options && (!Number.isInteger(options.indent) || Number(options.indent) <= 0)) {
      const s = JSON.stringify(options.indent)
      throw new Error(`"indent" option must be a positive integer, not ${s}`)
    }
    return stringifyDocument(this, options)
  }
}
function assertCollection(contents) {
  if (isCollection(contents)) return true
  throw new Error("Expected a YAML collection as document contents")
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/errors.js
const YAMLError = class extends Error {
  constructor(name, pos, code, message) {
    super()
    this.name = name
    this.code = code
    this.message = message
    this.pos = pos
  }
}
const YAMLParseError = class extends YAMLError {
  constructor(pos, code, message) {
    super("YAMLParseError", pos, code, message)
  }
}
const YAMLWarning = class extends YAMLError {
  constructor(pos, code, message) {
    super("YAMLWarning", pos, code, message)
  }
}
const prettifyError = (src, lc) => (error) => {
  if (error.pos[0] === -1) return
  error.linePos = error.pos.map((pos) => lc.linePos(pos))
  const { line, col } = error.linePos[0]
  error.message += ` at line ${line}, column ${col}`
  let ci = col - 1
  let lineStr = src.substring(lc.lineStarts[line - 1], lc.lineStarts[line]).replace(/[\n\r]+$/, "")
  if (ci >= 60 && lineStr.length > 80) {
    const trimStart = Math.min(ci - 39, lineStr.length - 79)
    lineStr = "…" + lineStr.substring(trimStart)
    ci -= trimStart - 1
  }
  if (lineStr.length > 80) lineStr = lineStr.substring(0, 79) + "…"
  if (line > 1 && /^ *$/.test(lineStr.substring(0, ci))) {
    let prev = src.substring(lc.lineStarts[line - 2], lc.lineStarts[line - 1])
    if (prev.length > 80) prev = prev.substring(0, 79) + "…\n"
    lineStr = prev + lineStr
  }
  if (/[^ ]/.test(lineStr)) {
    let count = 1
    const end = error.linePos[1]
    if (end?.line === line && end.col > col) count = Math.max(1, Math.min(end.col - col, 80 - ci))
    const pointer = " ".repeat(ci) + "^".repeat(count)
    error.message += `:\n\n${lineStr}\n${pointer}\n`
  }
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/compose/resolve-props.js
function resolveProps(
  tokens,
  { flow, indicator, next, offset, onError, parentIndent, startOnNewline },
) {
  let spaceBefore = false
  let atNewline = startOnNewline
  let hasSpace = startOnNewline
  let comment = ""
  let commentSep = ""
  let hasNewline = false
  let reqSpace = false
  let tab = null
  let anchor = null
  let tag = null
  let newlineAfterProp = null
  let comma = null
  let found = null
  let start = null
  for (const token of tokens) {
    if (reqSpace) {
      if (token.type !== "space" && token.type !== "newline" && token.type !== "comma")
        onError(
          token.offset,
          "MISSING_CHAR",
          "Tags and anchors must be separated from the next token by white space",
        )
      reqSpace = false
    }
    if (tab) {
      if (atNewline && token.type !== "comment" && token.type !== "newline")
        onError(tab, "TAB_AS_INDENT", "Tabs are not allowed as indentation")
      tab = null
    }
    switch (token.type) {
      case "space":
        if (
          !flow &&
          (indicator !== "doc-start" || next?.type !== "flow-collection") &&
          token.source.includes("	")
        )
          tab = token
        hasSpace = true
        break
      case "comment": {
        if (!hasSpace)
          onError(
            token,
            "MISSING_CHAR",
            "Comments must be separated from other tokens by white space characters",
          )
        const cb = token.source.slice(1) || " "
        if (!comment) comment = cb
        else comment += commentSep + cb
        commentSep = ""
        atNewline = false
        break
      }
      case "newline":
        if (atNewline) {
          if (comment) comment += token.source
          else if (!found || indicator !== "seq-item-ind") spaceBefore = true
        } else commentSep += token.source
        atNewline = true
        hasNewline = true
        if (anchor || tag) newlineAfterProp = token
        hasSpace = true
        break
      case "anchor":
        if (anchor) onError(token, "MULTIPLE_ANCHORS", "A node can have at most one anchor")
        if (token.source.endsWith(":"))
          onError(
            token.offset + token.source.length - 1,
            "BAD_ALIAS",
            "Anchor ending in : is ambiguous",
            true,
          )
        anchor = token
        start ?? (start = token.offset)
        atNewline = false
        hasSpace = false
        reqSpace = true
        break
      case "tag":
        if (tag) onError(token, "MULTIPLE_TAGS", "A node can have at most one tag")
        tag = token
        start ?? (start = token.offset)
        atNewline = false
        hasSpace = false
        reqSpace = true
        break
      case indicator:
        if (anchor || tag)
          onError(
            token,
            "BAD_PROP_ORDER",
            `Anchors and tags must be after the ${token.source} indicator`,
          )
        if (found)
          onError(
            token,
            "UNEXPECTED_TOKEN",
            `Unexpected ${token.source} in ${flow ?? "collection"}`,
          )
        found = token
        atNewline = indicator === "seq-item-ind" || indicator === "explicit-key-ind"
        hasSpace = false
        break
      case "comma":
        if (flow) {
          if (comma) onError(token, "UNEXPECTED_TOKEN", `Unexpected , in ${flow}`)
          comma = token
          atNewline = false
          hasSpace = false
          break
        }
      default:
        onError(token, "UNEXPECTED_TOKEN", `Unexpected ${token.type} token`)
        atNewline = false
        hasSpace = false
    }
  }
  const last = tokens.at(-1)
  const end = last ? last.offset + last.source.length : offset
  if (
    reqSpace &&
    next &&
    next.type !== "space" &&
    next.type !== "newline" &&
    next.type !== "comma" &&
    (next.type !== "scalar" || next.source !== "")
  )
    onError(
      next.offset,
      "MISSING_CHAR",
      "Tags and anchors must be separated from the next token by white space",
    )
  if (
    tab &&
    ((atNewline && tab.indent <= parentIndent) ||
      next?.type === "block-map" ||
      next?.type === "block-seq")
  )
    onError(tab, "TAB_AS_INDENT", "Tabs are not allowed as indentation")
  return {
    comma,
    found,
    spaceBefore,
    comment,
    hasNewline,
    anchor,
    tag,
    newlineAfterProp,
    end,
    start: start ?? end,
  }
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/compose/util-contains-newline.js
function containsNewline(key) {
  if (!key) return null
  switch (key.type) {
    case "alias":
    case "scalar":
    case "double-quoted-scalar":
    case "single-quoted-scalar":
      if (key.source.includes("\n")) return true
      if (key.end) {
        for (const st of key.end) if (st.type === "newline") return true
      }
      return false
    case "flow-collection":
      for (const it of key.items) {
        for (const st of it.start) if (st.type === "newline") return true
        if (it.sep) {
          for (const st of it.sep) if (st.type === "newline") return true
        }
        if (containsNewline(it.key) || containsNewline(it.value)) return true
      }
      return false
    default:
      return true
  }
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/compose/util-flow-indent-check.js
function flowIndentCheck(indent, fc, onError) {
  if (fc?.type === "flow-collection") {
    const end = fc.end[0]
    if (end.indent === indent && (end.source === "]" || end.source === "}") && containsNewline(fc))
      onError(end, "BAD_INDENT", "Flow end indicator should be more indented than parent", true)
  }
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/compose/util-map-includes.js
function mapIncludes(ctx, items, search) {
  const { uniqueKeys } = ctx.options
  if (uniqueKeys === false) return false
  const isEqual =
    typeof uniqueKeys === "function"
      ? uniqueKeys
      : (a, b) => a === b || (isScalar(a) && isScalar(b) && a.value === b.value)
  return items.some((pair) => isEqual(pair.key, search))
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/compose/resolve-block-map.js
const startColMsg = "All mapping items must start at the same column"
function resolveBlockMap({ composeNode, composeEmptyNode }, ctx, bm, onError, tag) {
  const map = new (tag?.nodeClass ?? YAMLMap)(ctx.schema)
  if (ctx.atRoot) ctx.atRoot = false
  let offset = bm.offset
  let commentEnd = null
  for (const collItem of bm.items) {
    const { start, key, sep, value } = collItem
    const keyProps = resolveProps(start, {
      indicator: "explicit-key-ind",
      next: key ?? sep?.[0],
      offset,
      onError,
      parentIndent: bm.indent,
      startOnNewline: true,
    })
    const implicitKey = !keyProps.found
    if (implicitKey) {
      if (key) {
        if (key.type === "block-seq")
          onError(
            offset,
            "BLOCK_AS_IMPLICIT_KEY",
            "A block sequence may not be used as an implicit map key",
          )
        else if ("indent" in key && key.indent !== bm.indent)
          onError(offset, "BAD_INDENT", startColMsg)
      }
      if (!keyProps.anchor && !keyProps.tag && !sep) {
        commentEnd = keyProps.end
        if (keyProps.comment) {
          if (map.comment) map.comment += `\n${keyProps.comment}`
          else map.comment = keyProps.comment
        }
        continue
      }
      if (keyProps.newlineAfterProp || containsNewline(key))
        onError(
          key ?? start.at(-1),
          "MULTILINE_IMPLICIT_KEY",
          "Implicit keys need to be on a single line",
        )
    } else if (keyProps.found?.indent !== bm.indent) onError(offset, "BAD_INDENT", startColMsg)
    ctx.atKey = true
    const keyStart = keyProps.end
    const keyNode = key
      ? composeNode(ctx, key, keyProps, onError)
      : composeEmptyNode(ctx, keyStart, start, null, keyProps, onError)
    if (ctx.schema.compat) flowIndentCheck(bm.indent, key, onError)
    ctx.atKey = false
    if (mapIncludes(ctx, map.items, keyNode))
      onError(keyStart, "DUPLICATE_KEY", "Map keys must be unique")
    const valueProps = resolveProps(sep ?? [], {
      indicator: "map-value-ind",
      next: value,
      offset: keyNode.range[2],
      onError,
      parentIndent: bm.indent,
      startOnNewline: !key || key.type === "block-scalar",
    })
    offset = valueProps.end
    if (valueProps.found) {
      if (implicitKey) {
        if (value?.type === "block-map" && !valueProps.hasNewline)
          onError(
            offset,
            "BLOCK_AS_IMPLICIT_KEY",
            "Nested mappings are not allowed in compact mappings",
          )
        if (ctx.options.strict && keyProps.start < valueProps.found.offset - 1024)
          onError(
            keyNode.range,
            "KEY_OVER_1024_CHARS",
            "The : indicator must be at most 1024 chars after the start of an implicit block mapping key",
          )
      }
      const valueNode = value
        ? composeNode(ctx, value, valueProps, onError)
        : composeEmptyNode(ctx, offset, sep, null, valueProps, onError)
      if (ctx.schema.compat) flowIndentCheck(bm.indent, value, onError)
      offset = valueNode.range[2]
      const pair = new Pair(keyNode, valueNode)
      if (ctx.options.keepSourceTokens) pair.srcToken = collItem
      map.items.push(pair)
    } else {
      if (implicitKey)
        onError(
          keyNode.range,
          "MISSING_CHAR",
          "Implicit map keys need to be followed by map values",
        )
      if (valueProps.comment) {
        if (keyNode.comment) keyNode.comment += `\n${valueProps.comment}`
        else keyNode.comment = valueProps.comment
      }
      const pair = new Pair(keyNode)
      if (ctx.options.keepSourceTokens) pair.srcToken = collItem
      map.items.push(pair)
    }
  }
  if (commentEnd && commentEnd < offset)
    onError(commentEnd, "IMPOSSIBLE", "Map comment with trailing content")
  map.range = [bm.offset, offset, commentEnd ?? offset]
  return map
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/compose/resolve-block-seq.js
function resolveBlockSeq({ composeNode, composeEmptyNode }, ctx, bs, onError, tag) {
  const seq = new (tag?.nodeClass ?? YAMLSeq)(ctx.schema)
  if (ctx.atRoot) ctx.atRoot = false
  if (ctx.atKey) ctx.atKey = false
  let offset = bs.offset
  let commentEnd = null
  for (const { start, value } of bs.items) {
    const props = resolveProps(start, {
      indicator: "seq-item-ind",
      next: value,
      offset,
      onError,
      parentIndent: bs.indent,
      startOnNewline: true,
    })
    if (!props.found) {
      if (props.anchor || props.tag || value) {
        if (value?.type === "block-seq")
          onError(props.end, "BAD_INDENT", "All sequence items must start at the same column")
        else onError(offset, "MISSING_CHAR", "Sequence item without - indicator")
      } else {
        commentEnd = props.end
        if (props.comment) seq.comment = props.comment
        continue
      }
    }
    const node = value
      ? composeNode(ctx, value, props, onError)
      : composeEmptyNode(ctx, props.end, start, null, props, onError)
    if (ctx.schema.compat) flowIndentCheck(bs.indent, value, onError)
    offset = node.range[2]
    seq.items.push(node)
  }
  seq.range = [bs.offset, offset, commentEnd ?? offset]
  return seq
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/compose/resolve-end.js
function resolveEnd(end, offset, reqSpace, onError) {
  let comment = ""
  if (end) {
    let hasSpace = false
    let sep = ""
    for (const token of end) {
      const { source, type } = token
      switch (type) {
        case "space":
          hasSpace = true
          break
        case "comment": {
          if (reqSpace && !hasSpace)
            onError(
              token,
              "MISSING_CHAR",
              "Comments must be separated from other tokens by white space characters",
            )
          const cb = source.slice(1) || " "
          if (!comment) comment = cb
          else comment += sep + cb
          sep = ""
          break
        }
        case "newline":
          if (comment) sep += source
          hasSpace = true
          break
        default:
          onError(token, "UNEXPECTED_TOKEN", `Unexpected ${type} at node end`)
      }
      offset += source.length
    }
  }
  return {
    comment,
    offset,
  }
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/compose/resolve-flow-collection.js
const blockMsg = "Block collections are not allowed within flow collections"
const isBlock = (token) => token && (token.type === "block-map" || token.type === "block-seq")
function resolveFlowCollection({ composeNode, composeEmptyNode }, ctx, fc, onError, tag) {
  const isMap = fc.start.source === "{"
  const fcName = isMap ? "flow map" : "flow sequence"
  const coll = new (tag?.nodeClass ?? (isMap ? YAMLMap : YAMLSeq))(ctx.schema)
  coll.flow = true
  const atRoot = ctx.atRoot
  if (atRoot) ctx.atRoot = false
  if (ctx.atKey) ctx.atKey = false
  let offset = fc.offset + fc.start.source.length
  for (let i = 0; i < fc.items.length; ++i) {
    const collItem = fc.items[i]
    const { start, key, sep, value } = collItem
    const props = resolveProps(start, {
      flow: fcName,
      indicator: "explicit-key-ind",
      next: key ?? sep?.[0],
      offset,
      onError,
      parentIndent: fc.indent,
      startOnNewline: false,
    })
    if (!props.found) {
      if (!props.anchor && !props.tag && !sep && !value) {
        if (i === 0 && props.comma)
          onError(props.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${fcName}`)
        else if (i < fc.items.length - 1)
          onError(props.start, "UNEXPECTED_TOKEN", `Unexpected empty item in ${fcName}`)
        if (props.comment) {
          if (coll.comment) coll.comment += `\n${props.comment}`
          else coll.comment = props.comment
        }
        offset = props.end
        continue
      }
      if (!isMap && ctx.options.strict && containsNewline(key))
        onError(
          key,
          "MULTILINE_IMPLICIT_KEY",
          "Implicit keys of flow sequence pairs need to be on a single line",
        )
    }
    if (i === 0) {
      if (props.comma) onError(props.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${fcName}`)
    } else {
      if (!props.comma) onError(props.start, "MISSING_CHAR", `Missing , between ${fcName} items`)
      if (props.comment) {
        let prevItemComment = ""
        loop: for (const st of start)
          switch (st.type) {
            case "comma":
            case "space":
              break
            case "comment":
              prevItemComment = st.source.slice(1)
              break loop
            default:
              break loop
          }
        if (prevItemComment) {
          let prev = coll.items.at(-1)
          if (isPair(prev)) prev = prev.value ?? prev.key
          if (prev.comment) prev.comment += `\n${prevItemComment}`
          else prev.comment = prevItemComment
          props.comment = props.comment.substring(prevItemComment.length + 1)
        }
      }
    }
    if (!isMap && !sep && !props.found) {
      const valueNode = value
        ? composeNode(ctx, value, props, onError)
        : composeEmptyNode(ctx, props.end, sep, null, props, onError)
      coll.items.push(valueNode)
      offset = valueNode.range[2]
      if (isBlock(value)) onError(valueNode.range, "BLOCK_IN_FLOW", blockMsg)
    } else {
      ctx.atKey = true
      const keyStart = props.end
      const keyNode = key
        ? composeNode(ctx, key, props, onError)
        : composeEmptyNode(ctx, keyStart, start, null, props, onError)
      if (isBlock(key)) onError(keyNode.range, "BLOCK_IN_FLOW", blockMsg)
      ctx.atKey = false
      const valueProps = resolveProps(sep ?? [], {
        flow: fcName,
        indicator: "map-value-ind",
        next: value,
        offset: keyNode.range[2],
        onError,
        parentIndent: fc.indent,
        startOnNewline: false,
      })
      if (valueProps.found) {
        if (!isMap && !props.found && ctx.options.strict) {
          if (sep)
            for (const st of sep) {
              if (st === valueProps.found) break
              if (st.type === "newline") {
                onError(
                  st,
                  "MULTILINE_IMPLICIT_KEY",
                  "Implicit keys of flow sequence pairs need to be on a single line",
                )
                break
              }
            }
          if (props.start < valueProps.found.offset - 1024)
            onError(
              valueProps.found,
              "KEY_OVER_1024_CHARS",
              "The : indicator must be at most 1024 chars after the start of an implicit flow sequence key",
            )
        }
      } else if (value) {
        if ("source" in value && value.source?.[0] === ":")
          onError(value, "MISSING_CHAR", `Missing space after : in ${fcName}`)
        else onError(valueProps.start, "MISSING_CHAR", `Missing , or : between ${fcName} items`)
      }
      const valueNode = value
        ? composeNode(ctx, value, valueProps, onError)
        : valueProps.found
          ? composeEmptyNode(ctx, valueProps.end, sep, null, valueProps, onError)
          : null
      if (valueNode) {
        if (isBlock(value)) onError(valueNode.range, "BLOCK_IN_FLOW", blockMsg)
      } else if (valueProps.comment) {
        if (keyNode.comment) keyNode.comment += `\n${valueProps.comment}`
        else keyNode.comment = valueProps.comment
      }
      const pair = new Pair(keyNode, valueNode)
      if (ctx.options.keepSourceTokens) pair.srcToken = collItem
      if (isMap) {
        const map = coll
        if (mapIncludes(ctx, map.items, keyNode))
          onError(keyStart, "DUPLICATE_KEY", "Map keys must be unique")
        map.items.push(pair)
      } else {
        const map = new YAMLMap(ctx.schema)
        map.flow = true
        map.items.push(pair)
        const endRange = (valueNode ?? keyNode).range
        map.range = [keyNode.range[0], endRange[1], endRange[2]]
        coll.items.push(map)
      }
      offset = valueNode ? valueNode.range[2] : valueProps.end
    }
  }
  const expectedEnd = isMap ? "}" : "]"
  const [ce, ...ee] = fc.end
  let cePos = offset
  if (ce?.source === expectedEnd) cePos = ce.offset + ce.source.length
  else {
    const name = fcName[0].toUpperCase() + fcName.slice(1)
    const msg = atRoot
      ? `${name} must end with a ${expectedEnd}`
      : `${name} in block collection must be sufficiently indented and end with a ${expectedEnd}`
    onError(offset, atRoot ? "MISSING_CHAR" : "BAD_INDENT", msg)
    if (ce && ce.source.length !== 1) ee.unshift(ce)
  }
  if (ee.length > 0) {
    const end = resolveEnd(ee, cePos, ctx.options.strict, onError)
    if (end.comment) {
      if (coll.comment) coll.comment += `\n${end.comment}`
      else coll.comment = end.comment
    }
    coll.range = [fc.offset, cePos, end.offset]
  } else coll.range = [fc.offset, cePos, cePos]
  return coll
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/compose/compose-collection.js
function resolveCollection(CN, ctx, token, onError, tagName, tag) {
  const coll =
    token.type === "block-map"
      ? resolveBlockMap(CN, ctx, token, onError, tag)
      : token.type === "block-seq"
        ? resolveBlockSeq(CN, ctx, token, onError, tag)
        : resolveFlowCollection(CN, ctx, token, onError, tag)
  const Coll = coll.constructor
  if (tagName === "!" || tagName === Coll.tagName) {
    coll.tag = Coll.tagName
    return coll
  }
  if (tagName) coll.tag = tagName
  return coll
}
function composeCollection(CN, ctx, token, props, onError) {
  const tagToken = props.tag
  const tagName = !tagToken
    ? null
    : ctx.directives.tagName(tagToken.source, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg))
  if (token.type === "block-seq") {
    const { anchor, newlineAfterProp: nl } = props
    const lastProp =
      anchor && tagToken
        ? anchor.offset > tagToken.offset
          ? anchor
          : tagToken
        : (anchor ?? tagToken)
    if (lastProp && (!nl || nl.offset < lastProp.offset))
      onError(lastProp, "MISSING_CHAR", "Missing newline after block sequence props")
  }
  const expType =
    token.type === "block-map"
      ? "map"
      : token.type === "block-seq"
        ? "seq"
        : token.start.source === "{"
          ? "map"
          : "seq"
  if (
    !tagToken ||
    !tagName ||
    tagName === "!" ||
    (tagName === YAMLMap.tagName && expType === "map") ||
    (tagName === YAMLSeq.tagName && expType === "seq")
  )
    return resolveCollection(CN, ctx, token, onError, tagName)
  let tag = ctx.schema.tags.find((t) => t.tag === tagName && t.collection === expType)
  if (!tag) {
    const kt = ctx.schema.knownTags[tagName]
    if (kt?.collection === expType) {
      ctx.schema.tags.push({ ...kt, default: false })
      tag = kt
    } else {
      if (kt)
        onError(
          tagToken,
          "BAD_COLLECTION_TYPE",
          `${kt.tag} used for ${expType} collection, but expects ${kt.collection ?? "scalar"}`,
          true,
        )
      else onError(tagToken, "TAG_RESOLVE_FAILED", `Unresolved tag: ${tagName}`, true)
      return resolveCollection(CN, ctx, token, onError, tagName)
    }
  }
  const coll = resolveCollection(CN, ctx, token, onError, tagName, tag)
  const res =
    tag.resolve?.(coll, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg), ctx.options) ?? coll
  const node = isNode(res) ? res : new Scalar(res)
  node.range = coll.range
  node.tag = tagName
  if (tag?.format) node.format = tag.format
  return node
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/compose/resolve-block-scalar.js
function resolveBlockScalar(ctx, scalar, onError) {
  const start = scalar.offset
  const header = parseBlockScalarHeader(scalar, ctx.options.strict, onError)
  if (!header)
    return {
      value: "",
      type: null,
      comment: "",
      range: [start, start, start],
    }
  const type = header.mode === ">" ? Scalar.BLOCK_FOLDED : Scalar.BLOCK_LITERAL
  const lines = scalar.source ? splitLines(scalar.source) : []
  let chompStart = lines.length
  for (let i = lines.length - 1; i >= 0; --i) {
    const content = lines[i][1]
    if (content === "" || content === "\r") chompStart = i
    else break
  }
  if (chompStart === 0) {
    const value =
      header.chomp === "+" && lines.length > 0 ? "\n".repeat(Math.max(1, lines.length - 1)) : ""
    let end = start + header.length
    if (scalar.source) end += scalar.source.length
    return {
      value,
      type,
      comment: header.comment,
      range: [start, end, end],
    }
  }
  let trimIndent = scalar.indent + header.indent
  let offset = scalar.offset + header.length
  let contentStart = 0
  for (let i = 0; i < chompStart; ++i) {
    const [indent, content] = lines[i]
    if (content === "" || content === "\r") {
      if (header.indent === 0 && indent.length > trimIndent) trimIndent = indent.length
    } else {
      if (indent.length < trimIndent)
        onError(
          offset + indent.length,
          "MISSING_CHAR",
          "Block scalars with more-indented leading empty lines must use an explicit indentation indicator",
        )
      if (header.indent === 0) trimIndent = indent.length
      contentStart = i
      if (trimIndent === 0 && !ctx.atRoot)
        onError(offset, "BAD_INDENT", "Block scalar values in collections must be indented")
      break
    }
    offset += indent.length + content.length + 1
  }
  for (let i = lines.length - 1; i >= chompStart; --i)
    if (lines[i][0].length > trimIndent) chompStart = i + 1
  let value = ""
  let sep = ""
  let prevMoreIndented = false
  for (let i = 0; i < contentStart; ++i) value += `${lines[i][0].slice(trimIndent)}\n`
  for (let i = contentStart; i < chompStart; ++i) {
    let [indent, content] = lines[i]
    offset += indent.length + content.length + 1
    const crlf = content.at(-1) === "\r"
    if (crlf) content = content.slice(0, -1)
    /* istanbul ignore if already caught in lexer */
    if (content && indent.length < trimIndent) {
      const message = `Block scalar lines must not be less indented than their ${header.indent ? "explicit indentation indicator" : "first line"}`
      onError(offset - content.length - (crlf ? 2 : 1), "BAD_INDENT", message)
      indent = ""
    }
    if (type === Scalar.BLOCK_LITERAL) {
      value += sep + indent.slice(trimIndent) + content
      sep = "\n"
    } else if (indent.length > trimIndent || content[0] === "	") {
      if (sep === " ") sep = "\n"
      else if (!prevMoreIndented && sep === "\n") sep = "\n\n"
      value += sep + indent.slice(trimIndent) + content
      sep = "\n"
      prevMoreIndented = true
    } else if (content === "") {
      if (sep === "\n") value += "\n"
      else sep = "\n"
    } else {
      value += sep + content
      sep = " "
      prevMoreIndented = false
    }
  }
  switch (header.chomp) {
    case "-":
      break
    case "+":
      for (let i = chompStart; i < lines.length; ++i) value += `\n${lines[i][0].slice(trimIndent)}`
      if (value.at(-1) !== "\n") value += "\n"
      break
    default:
      value += "\n"
  }
  const end = start + header.length + scalar.source.length
  return {
    value,
    type,
    comment: header.comment,
    range: [start, end, end],
  }
}
function parseBlockScalarHeader({ offset, props }, strict, onError) {
  /* istanbul ignore if should not happen */
  if (props[0].type !== "block-scalar-header") {
    onError(props[0], "IMPOSSIBLE", "Block scalar header not found")
    return null
  }
  const { source } = props[0]
  const mode = source[0]
  let indent = 0
  let chomp = ""
  let error = -1
  for (let i = 1; i < source.length; ++i) {
    const ch = source[i]
    if (!chomp && (ch === "-" || ch === "+")) chomp = ch
    else {
      const n = Number(ch)
      if (!indent && n) indent = n
      else if (error === -1) error = offset + i
    }
  }
  if (error !== -1)
    onError(error, "UNEXPECTED_TOKEN", `Block scalar header includes extra characters: ${source}`)
  let hasSpace = false
  let comment = ""
  let length = source.length
  for (let i = 1; i < props.length; ++i) {
    const token = props[i]
    switch (token.type) {
      case "space":
        hasSpace = true
      case "newline":
        length += token.source.length
        break
      case "comment":
        if (strict && !hasSpace)
          onError(
            token,
            "MISSING_CHAR",
            "Comments must be separated from other tokens by white space characters",
          )
        length += token.source.length
        comment = token.source.slice(1)
        break
      case "error":
        onError(token, "UNEXPECTED_TOKEN", token.message)
        length += token.source.length
        break
      /* istanbul ignore next should not happen */
      default: {
        onError(token, "UNEXPECTED_TOKEN", `Unexpected token in block scalar header: ${token.type}`)
        const ts = token.source
        if (ts && typeof ts === "string") length += ts.length
      }
    }
  }
  return {
    mode,
    indent,
    chomp,
    comment,
    length,
  }
}
/** @returns Array of lines split up as `[indent, content]` */
function splitLines(source) {
  const split = source.split(/\n( *)/)
  const first = split[0]
  const m = first.match(/^( *)/)
  const lines = [m?.[1] ? [m[1], first.slice(m[1].length)] : ["", first]]
  for (let i = 1; i < split.length; i += 2) lines.push([split[i], split[i + 1]])
  return lines
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/compose/resolve-flow-scalar.js
function resolveFlowScalar(scalar, strict, onError) {
  const { offset, type, source, end } = scalar
  let _type
  let value
  const _onError = (rel, code, msg) => onError(offset + rel, code, msg)
  switch (type) {
    case "scalar":
      _type = Scalar.PLAIN
      value = plainValue(source, _onError)
      break
    case "single-quoted-scalar":
      _type = Scalar.QUOTE_SINGLE
      value = singleQuotedValue(source, _onError)
      break
    case "double-quoted-scalar":
      _type = Scalar.QUOTE_DOUBLE
      value = doubleQuotedValue(source, _onError)
      break
    /* istanbul ignore next should not happen */
    default:
      onError(scalar, "UNEXPECTED_TOKEN", `Expected a flow scalar value, but found: ${type}`)
      return {
        value: "",
        type: null,
        comment: "",
        range: [offset, offset + source.length, offset + source.length],
      }
  }
  const valueEnd = offset + source.length
  const re = resolveEnd(end, valueEnd, strict, onError)
  return {
    value,
    type: _type,
    comment: re.comment,
    range: [offset, valueEnd, re.offset],
  }
}
function plainValue(source, onError) {
  let badChar = ""
  switch (source[0]) {
    /* istanbul ignore next should not happen */
    case "	":
      badChar = "a tab character"
      break
    case ",":
      badChar = "flow indicator character ,"
      break
    case "%":
      badChar = "directive indicator character %"
      break
    case "|":
    case ">":
      badChar = `block scalar indicator ${source[0]}`
      break
    case "@":
    case "`":
      badChar = `reserved character ${source[0]}`
  }
  if (badChar) onError(0, "BAD_SCALAR_START", `Plain value cannot start with ${badChar}`)
  return foldLines(source)
}
function singleQuotedValue(source, onError) {
  if (source.at(-1) !== "'" || source.length === 1)
    onError(source.length, "MISSING_CHAR", "Missing closing 'quote")
  return foldLines(source.slice(1, -1)).replaceAll("''", "'")
}
function foldLines(source) {
  /**
   * The negative lookbehind here and in the `re` RegExp is to
   * prevent causing a polynomial search time in certain cases.
   *
   * The try-catch is for Safari, which doesn't support this yet:
   * https://caniuse.com/js-regexp-lookbehind
   */
  let first, line
  try {
    first = /* @__PURE__ */ new RegExp("(.*?)(?<![ 	])[ 	]*\r?\n", "sy")
    line = /* @__PURE__ */ new RegExp("[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?\n", "sy")
  } catch {
    first = /(.*?)[ \t]*\r?\n/sy
    line = /[ \t]*(.*?)[ \t]*\r?\n/sy
  }
  let match = first.exec(source)
  if (!match) return source
  let res = match[1]
  let sep = " "
  let pos = first.lastIndex
  line.lastIndex = pos
  while ((match = line.exec(source))) {
    if (match[1] === "") {
      if (sep === "\n") res += sep
      else sep = "\n"
    } else {
      res += sep + match[1]
      sep = " "
    }
    pos = line.lastIndex
  }
  const last = /[ \t]*(.*)/sy
  last.lastIndex = pos
  match = last.exec(source)
  return res + sep + (match?.[1] ?? "")
}
function doubleQuotedValue(source, onError) {
  let res = ""
  for (let i = 1; i < source.length - 1; ++i) {
    const ch = source[i]
    if (ch === "\r" && source[i + 1] === "\n") continue
    if (ch === "\n") {
      const { fold, offset } = foldNewline(source, i)
      res += fold
      i = offset
    } else if (ch === "\\") {
      let next = source[++i]
      const cc = escapeCodes[next]
      if (cc) res += cc
      else if (next === "\n") {
        next = source[i + 1]
        while (next === " " || next === "	") next = source[++i + 1]
      } else if (next === "\r" && source[i + 1] === "\n") {
        next = source[++i + 1]
        while (next === " " || next === "	") next = source[++i + 1]
      } else if (next === "x" || next === "u" || next === "U") {
        const length = next === "x" ? 2 : next === "u" ? 4 : 8
        res += parseCharCode(source, i + 1, length, onError)
        i += length
      } else {
        const raw = source.substr(i - 1, 2)
        onError(i - 1, "BAD_DQ_ESCAPE", `Invalid escape sequence ${raw}`)
        res += raw
      }
    } else if (ch === " " || ch === "	") {
      const wsStart = i
      let next = source[i + 1]
      while (next === " " || next === "	") next = source[++i + 1]
      if (next !== "\n" && !(next === "\r" && source[i + 2] === "\n"))
        res += i > wsStart ? source.slice(wsStart, i + 1) : ch
    } else res += ch
  }
  if (source.at(-1) !== '"' || source.length === 1)
    onError(source.length, "MISSING_CHAR", 'Missing closing "quote')
  return res
}
/**
 * Fold a single newline into a space, multiple newlines to N - 1 newlines.
 * Presumes `source[offset] === '\n'`
 */
function foldNewline(source, offset) {
  let fold = ""
  let ch = source[offset + 1]
  while (ch === " " || ch === "	" || ch === "\n" || ch === "\r") {
    if (ch === "\r" && source[offset + 2] !== "\n") break
    if (ch === "\n") fold += "\n"
    offset += 1
    ch = source[offset + 1]
  }
  if (!fold) fold = " "
  return {
    fold,
    offset,
  }
}
const escapeCodes = {
  "0": "\0",
  "a": "\x07",
  "b": "\b",
  "e": "\x1B",
  "f": "\f",
  "n": "\n",
  "r": "\r",
  "t": "	",
  "v": "\v",
  "N": "",
  "_": "\xA0",
  "L": "\u2028",
  "P": "\u2029",
  " ": " ",
  '"': '"',
  "/": "/",
  "\\": "\\",
  "	": "	",
}
function parseCharCode(source, offset, length, onError) {
  const cc = source.substr(offset, length)
  const code = cc.length === length && /^[0-9a-fA-F]+$/.test(cc) ? parseInt(cc, 16) : NaN
  try {
    return String.fromCodePoint(code)
  } catch {
    const raw = source.substr(offset - 2, length + 2)
    onError(offset - 2, "BAD_DQ_ESCAPE", `Invalid escape sequence ${raw}`)
    return raw
  }
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/compose/compose-scalar.js
function composeScalar(ctx, token, tagToken, onError) {
  const { value, type, comment, range } =
    token.type === "block-scalar"
      ? resolveBlockScalar(ctx, token, onError)
      : resolveFlowScalar(token, ctx.options.strict, onError)
  const tagName = tagToken
    ? ctx.directives.tagName(tagToken.source, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg))
    : null
  let tag
  if (ctx.options.stringKeys && ctx.atKey) tag = ctx.schema[SCALAR$1]
  else if (tagName) tag = findScalarTagByName(ctx.schema, value, tagName, tagToken, onError)
  else if (token.type === "scalar") tag = findScalarTagByTest(ctx, value, token, onError)
  else tag = ctx.schema[SCALAR$1]
  let scalar
  try {
    const res = tag.resolve(
      value,
      (msg) => onError(tagToken ?? token, "TAG_RESOLVE_FAILED", msg),
      ctx.options,
    )
    scalar = isScalar(res) ? res : new Scalar(res)
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    onError(tagToken ?? token, "TAG_RESOLVE_FAILED", msg)
    scalar = new Scalar(value)
  }
  scalar.range = range
  scalar.source = value
  if (type) scalar.type = type
  if (tagName) scalar.tag = tagName
  if (tag.format) scalar.format = tag.format
  if (comment) scalar.comment = comment
  return scalar
}
function findScalarTagByName(schema, value, tagName, tagToken, onError) {
  if (tagName === "!") return schema[SCALAR$1]
  const matchWithTest = []
  for (const tag of schema.tags)
    if (!tag.collection && tag.tag === tagName) {
      if (tag.default && tag.test) matchWithTest.push(tag)
      else return tag
    }
  for (const tag of matchWithTest) if (tag.test?.test(value)) return tag
  const kt = schema.knownTags[tagName]
  if (kt && !kt.collection) {
    schema.tags.push({ ...kt, default: false, test: void 0 })
    return kt
  }
  onError(
    tagToken,
    "TAG_RESOLVE_FAILED",
    `Unresolved tag: ${tagName}`,
    tagName !== "tag:yaml.org,2002:str",
  )
  return schema[SCALAR$1]
}
function findScalarTagByTest({ atKey, directives, schema }, value, token, onError) {
  const tag =
    schema.tags.find(
      (tag) => (tag.default === true || (atKey && tag.default === "key")) && tag.test?.test(value),
    ) || schema[SCALAR$1]
  if (schema.compat) {
    const compat =
      schema.compat.find((tag) => tag.default && tag.test?.test(value)) ?? schema[SCALAR$1]
    if (tag.tag !== compat.tag)
      onError(
        token,
        "TAG_RESOLVE_FAILED",
        `Value may be parsed as either ${directives.tagString(tag.tag)} or ${directives.tagString(compat.tag)}`,
        true,
      )
  }
  return tag
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/compose/util-empty-scalar-position.js
function emptyScalarPosition(offset, before, pos) {
  if (before) {
    pos ?? (pos = before.length)
    for (let i = pos - 1; i >= 0; --i) {
      let st = before[i]
      switch (st.type) {
        case "space":
        case "comment":
        case "newline":
          offset -= st.source.length
          continue
      }
      st = before[++i]
      while (st?.type === "space") {
        offset += st.source.length
        st = before[++i]
      }
      break
    }
  }
  return offset
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/compose/compose-node.js
const CN = {
  composeNode,
  composeEmptyNode,
}
function composeNode(ctx, token, props, onError) {
  const atKey = ctx.atKey
  const { spaceBefore, comment, anchor, tag } = props
  let node
  let isSrcToken = true
  switch (token.type) {
    case "alias":
      node = composeAlias(ctx, token, onError)
      if (anchor || tag)
        onError(token, "ALIAS_PROPS", "An alias node must not specify any properties")
      break
    case "scalar":
    case "single-quoted-scalar":
    case "double-quoted-scalar":
    case "block-scalar":
      node = composeScalar(ctx, token, tag, onError)
      if (anchor) node.anchor = anchor.source.slice(1)
      break
    case "block-map":
    case "block-seq":
    case "flow-collection":
      try {
        node = composeCollection(CN, ctx, token, props, onError)
        if (anchor) node.anchor = anchor.source.slice(1)
      } catch (error) {
        onError(
          token,
          "RESOURCE_EXHAUSTION",
          error instanceof Error ? error.message : String(error),
        )
      }
      break
    default:
      onError(
        token,
        "UNEXPECTED_TOKEN",
        token.type === "error" ? token.message : `Unsupported token (type: ${token.type})`,
      )
      isSrcToken = false
  }
  node ?? (node = composeEmptyNode(ctx, token.offset, void 0, null, props, onError))
  if (anchor && node.anchor === "") onError(anchor, "BAD_ALIAS", "Anchor cannot be an empty string")
  if (
    atKey &&
    ctx.options.stringKeys &&
    (!isScalar(node) ||
      typeof node.value !== "string" ||
      (node.tag && node.tag !== "tag:yaml.org,2002:str"))
  )
    onError(tag ?? token, "NON_STRING_KEY", "With stringKeys, all keys must be strings")
  if (spaceBefore) node.spaceBefore = true
  if (comment) {
    if (token.type === "scalar" && token.source === "") node.comment = comment
    else node.commentBefore = comment
  }
  if (ctx.options.keepSourceTokens && isSrcToken) node.srcToken = token
  return node
}
function composeEmptyNode(
  ctx,
  offset,
  before,
  pos,
  { spaceBefore, comment, anchor, tag, end },
  onError,
) {
  const node = composeScalar(
    ctx,
    {
      type: "scalar",
      offset: emptyScalarPosition(offset, before, pos),
      indent: -1,
      source: "",
    },
    tag,
    onError,
  )
  if (anchor) {
    node.anchor = anchor.source.slice(1)
    if (node.anchor === "") onError(anchor, "BAD_ALIAS", "Anchor cannot be an empty string")
  }
  if (spaceBefore) node.spaceBefore = true
  if (comment) {
    node.comment = comment
    node.range[2] = end
  }
  return node
}
function composeAlias({ options }, { offset, source, end }, onError) {
  const alias = new Alias(source.slice(1))
  if (alias.source === "") onError(offset, "BAD_ALIAS", "Alias cannot be an empty string")
  if (alias.source.endsWith(":"))
    onError(offset + source.length - 1, "BAD_ALIAS", "Alias ending in : is ambiguous", true)
  const valueEnd = offset + source.length
  const re = resolveEnd(end, valueEnd, options.strict, onError)
  alias.range = [offset, valueEnd, re.offset]
  if (re.comment) alias.comment = re.comment
  return alias
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/compose/compose-doc.js
function composeDoc(options, directives, { offset, start, value, end }, onError) {
  const doc = new Document(void 0, { _directives: directives, ...options })
  const ctx = {
    atKey: false,
    atRoot: true,
    directives: doc.directives,
    options: doc.options,
    schema: doc.schema,
  }
  const props = resolveProps(start, {
    indicator: "doc-start",
    next: value ?? end?.[0],
    offset,
    onError,
    parentIndent: 0,
    startOnNewline: true,
  })
  if (props.found) {
    doc.directives.docStart = true
    if (value && (value.type === "block-map" || value.type === "block-seq") && !props.hasNewline)
      onError(
        props.end,
        "MISSING_CHAR",
        "Block collection cannot start on same line with directives-end marker",
      )
  }
  doc.contents = value
    ? composeNode(ctx, value, props, onError)
    : composeEmptyNode(ctx, props.end, start, null, props, onError)
  const contentEnd = doc.contents.range[2]
  const re = resolveEnd(end, contentEnd, false, onError)
  if (re.comment) doc.comment = re.comment
  doc.range = [offset, contentEnd, re.offset]
  return doc
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/compose/composer.js
function getErrorPos(src) {
  if (typeof src === "number") return [src, src + 1]
  if (Array.isArray(src)) return src.length === 2 ? src : [src[0], src[1]]
  const { offset, source } = src
  return [offset, offset + (typeof source === "string" ? source.length : 1)]
}
function parsePrelude(prelude) {
  let comment = ""
  let atComment = false
  let afterEmptyLine = false
  for (let i = 0; i < prelude.length; ++i) {
    const source = prelude[i]
    switch (source[0]) {
      case "#":
        comment += (comment === "" ? "" : afterEmptyLine ? "\n\n" : "\n") + (source.slice(1) || " ")
        atComment = true
        afterEmptyLine = false
        break
      case "%":
        if (prelude[i + 1]?.[0] !== "#") i += 1
        atComment = false
        break
      default:
        if (!atComment) afterEmptyLine = true
        atComment = false
    }
  }
  return {
    comment,
    afterEmptyLine,
  }
}
/**
 * Compose a stream of CST nodes into a stream of YAML Documents.
 *
 * ```ts
 * import { Composer, Parser } from 'yaml'
 *
 * const src: string = ...
 * const tokens = new Parser().parse(src)
 * const docs = new Composer().compose(tokens)
 * ```
 */
const Composer = class {
  constructor(options = {}) {
    this.doc = null
    this.atDirectives = false
    this.prelude = []
    this.errors = []
    this.warnings = []
    this.onError = (source, code, message, warning) => {
      const pos = getErrorPos(source)
      if (warning) this.warnings.push(new YAMLWarning(pos, code, message))
      else this.errors.push(new YAMLParseError(pos, code, message))
    }
    this.directives = new Directives({ version: options.version || "1.2" })
    this.options = options
  }
  decorate(doc, afterDoc) {
    const { comment, afterEmptyLine } = parsePrelude(this.prelude)
    if (comment) {
      const dc = doc.contents
      if (afterDoc) doc.comment = doc.comment ? `${doc.comment}\n${comment}` : comment
      else if (afterEmptyLine || doc.directives.docStart || !dc) doc.commentBefore = comment
      else if (isCollection(dc) && !dc.flow && dc.items.length > 0) {
        let it = dc.items[0]
        if (isPair(it)) it = it.key
        const cb = it.commentBefore
        it.commentBefore = cb ? `${comment}\n${cb}` : comment
      } else {
        const cb = dc.commentBefore
        dc.commentBefore = cb ? `${comment}\n${cb}` : comment
      }
    }
    if (afterDoc) {
      for (let i = 0; i < this.errors.length; ++i) doc.errors.push(this.errors[i])
      for (let i = 0; i < this.warnings.length; ++i) doc.warnings.push(this.warnings[i])
    } else {
      doc.errors = this.errors
      doc.warnings = this.warnings
    }
    this.prelude = []
    this.errors = []
    this.warnings = []
  }
  /**
   * Current stream status information.
   *
   * Mostly useful at the end of input for an empty stream.
   */
  streamInfo() {
    return {
      comment: parsePrelude(this.prelude).comment,
      directives: this.directives,
      errors: this.errors,
      warnings: this.warnings,
    }
  }
  /**
   * Compose tokens into documents.
   *
   * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
   * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
   */
  *compose(tokens, forceDoc = false, endOffset = -1) {
    for (const token of tokens) yield* this.next(token)
    yield* this.end(forceDoc, endOffset)
  }
  /** Advance the composer by one CST token. */
  *next(token) {
    switch (token.type) {
      case "directive":
        this.directives.add(token.source, (offset, message, warning) => {
          const pos = getErrorPos(token)
          pos[0] += offset
          this.onError(pos, "BAD_DIRECTIVE", message, warning)
        })
        this.prelude.push(token.source)
        this.atDirectives = true
        break
      case "document": {
        const doc = composeDoc(this.options, this.directives, token, this.onError)
        if (this.atDirectives && !doc.directives.docStart)
          this.onError(token, "MISSING_CHAR", "Missing directives-end/doc-start indicator line")
        this.decorate(doc, false)
        if (this.doc) yield this.doc
        this.doc = doc
        this.atDirectives = false
        break
      }
      case "byte-order-mark":
      case "space":
        break
      case "comment":
      case "newline":
        this.prelude.push(token.source)
        break
      case "error": {
        const msg = token.source
          ? `${token.message}: ${JSON.stringify(token.source)}`
          : token.message
        const error = new YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", msg)
        if (this.atDirectives || !this.doc) this.errors.push(error)
        else this.doc.errors.push(error)
        break
      }
      case "doc-end": {
        if (!this.doc) {
          this.errors.push(
            new YAMLParseError(
              getErrorPos(token),
              "UNEXPECTED_TOKEN",
              "Unexpected doc-end without preceding document",
            ),
          )
          break
        }
        this.doc.directives.docEnd = true
        const end = resolveEnd(
          token.end,
          token.offset + token.source.length,
          this.doc.options.strict,
          this.onError,
        )
        this.decorate(this.doc, true)
        if (end.comment) {
          const dc = this.doc.comment
          this.doc.comment = dc ? `${dc}\n${end.comment}` : end.comment
        }
        this.doc.range[2] = end.offset
        break
      }
      default:
        this.errors.push(
          new YAMLParseError(
            getErrorPos(token),
            "UNEXPECTED_TOKEN",
            `Unsupported token ${token.type}`,
          ),
        )
    }
  }
  /**
   * Call at end of input to yield any remaining document.
   *
   * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
   * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
   */
  *end(forceDoc = false, endOffset = -1) {
    if (this.doc) {
      this.decorate(this.doc, true)
      yield this.doc
      this.doc = null
    } else if (forceDoc) {
      const doc = new Document(
        void 0,
        Object.assign({ _directives: this.directives }, this.options),
      )
      if (this.atDirectives)
        this.onError(endOffset, "MISSING_CHAR", "Missing directives-end indicator line")
      doc.range = [0, endOffset, endOffset]
      this.decorate(doc, false)
      yield doc
    }
  }
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/parse/cst-visit.js
const BREAK = Symbol("break visit")
const SKIP = Symbol("skip children")
const REMOVE = Symbol("remove item")
/**
 * Apply a visitor to a CST document or item.
 *
 * Walks through the tree (depth-first) starting from the root, calling a
 * `visitor` function with two arguments when entering each item:
 *   - `item`: The current item, which included the following members:
 *     - `start: SourceToken[]` – Source tokens before the key or value,
 *       possibly including its anchor or tag.
 *     - `key?: Token | null` – Set for pair values. May then be `null`, if
 *       the key before the `:` separator is empty.
 *     - `sep?: SourceToken[]` – Source tokens between the key and the value,
 *       which should include the `:` map value indicator if `value` is set.
 *     - `value?: Token` – The value of a sequence item, or of a map pair.
 *   - `path`: The steps from the root to the current node, as an array of
 *     `['key' | 'value', number]` tuples.
 *
 * The return value of the visitor may be used to control the traversal:
 *   - `undefined` (default): Do nothing and continue
 *   - `visit.SKIP`: Do not visit the children of this token, continue with
 *      next sibling
 *   - `visit.BREAK`: Terminate traversal completely
 *   - `visit.REMOVE`: Remove the current item, then continue with the next one
 *   - `number`: Set the index of the next step. This is useful especially if
 *     the index of the current token has changed.
 *   - `function`: Define the next visitor for this item. After the original
 *     visitor is called on item entry, next visitors are called after handling
 *     a non-empty `key` and when exiting the item.
 */
function visit(cst, visitor) {
  if ("type" in cst && cst.type === "document")
    cst = {
      start: cst.start,
      value: cst.value,
    }
  _visit(Object.freeze([]), cst, visitor)
}
/** Terminate visit traversal completely */
visit.BREAK = BREAK
/** Do not visit the children of the current item */
visit.SKIP = SKIP
/** Remove the current item */
visit.REMOVE = REMOVE
/** Find the item at `path` from `cst` as the root */
visit.itemAtPath = (cst, path) => {
  let item = cst
  for (const [field, index] of path) {
    const tok = item?.[field]
    if (tok && "items" in tok) item = tok.items[index]
    else return void 0
  }
  return item
}
/**
 * Get the immediate parent collection of the item at `path` from `cst` as the root.
 *
 * Throws an error if the collection is not found, which should never happen if the item itself exists.
 */
visit.parentCollection = (cst, path) => {
  const parent = visit.itemAtPath(cst, path.slice(0, -1))
  const field = path.at(-1)[0]
  const coll = parent?.[field]
  if (coll && "items" in coll) return coll
  throw new Error("Parent collection not found")
}
function _visit(path, item, visitor) {
  let ctrl = visitor(item, path)
  if (typeof ctrl === "symbol") return ctrl
  for (const field of ["key", "value"]) {
    const token = item[field]
    if (token && "items" in token) {
      for (let i = 0; i < token.items.length; ++i) {
        const ci = _visit(Object.freeze(path.concat([[field, i]])), token.items[i], visitor)
        if (typeof ci === "number") i = ci - 1
        else if (ci === BREAK) return BREAK
        else if (ci === REMOVE) {
          token.items.splice(i, 1)
          i -= 1
        }
      }
      if (typeof ctrl === "function" && field === "key") ctrl = ctrl(item, path)
    }
  }
  return typeof ctrl === "function" ? ctrl(item, path) : ctrl
}
/** Identify the type of a lexer token. May return `null` for unknown tokens. */
function tokenType(source) {
  switch (source) {
    case "﻿":
      return "byte-order-mark"
    case "":
      return "doc-mode"
    case "":
      return "flow-error-end"
    case "":
      return "scalar"
    case "---":
      return "doc-start"
    case "...":
      return "doc-end"
    case "":
    case "\n":
    case "\r\n":
      return "newline"
    case "-":
      return "seq-item-ind"
    case "?":
      return "explicit-key-ind"
    case ":":
      return "map-value-ind"
    case "{":
      return "flow-map-start"
    case "}":
      return "flow-map-end"
    case "[":
      return "flow-seq-start"
    case "]":
      return "flow-seq-end"
    case ",":
      return "comma"
  }
  switch (source[0]) {
    case " ":
    case "	":
      return "space"
    case "#":
      return "comment"
    case "%":
      return "directive-line"
    case "*":
      return "alias"
    case "&":
      return "anchor"
    case "!":
      return "tag"
    case "'":
      return "single-quoted-scalar"
    case '"':
      return "double-quoted-scalar"
    case "|":
    case ">":
      return "block-scalar-header"
  }
  return null
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/parse/lexer.js
function isEmpty(ch) {
  switch (ch) {
    case void 0:
    case " ":
    case "\n":
    case "\r":
    case "	":
      return true
    default:
      return false
  }
}
const hexDigits = /* @__PURE__ */ new Set("0123456789ABCDEFabcdef")
const tagChars = /* @__PURE__ */ new Set(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()",
)
const flowIndicatorChars = /* @__PURE__ */ new Set(",[]{}")
const invalidAnchorChars = /* @__PURE__ */ new Set(" ,[]{}\n\r	")
const isNotAnchorChar = (ch) => !ch || invalidAnchorChars.has(ch)
/**
 * Splits an input string into lexical tokens, i.e. smaller strings that are
 * easily identifiable by `tokens.tokenType()`.
 *
 * Lexing starts always in a "stream" context. Incomplete input may be buffered
 * until a complete token can be emitted.
 *
 * In addition to slices of the original input, the following control characters
 * may also be emitted:
 *
 * - `\x02` (Start of Text): A document starts with the next token
 * - `\x18` (Cancel): Unexpected end of flow-mode (indicates an error)
 * - `\x1f` (Unit Separator): Next token is a scalar value
 * - `\u{FEFF}` (Byte order mark): Emitted separately outside documents
 */
const Lexer = class {
  constructor() {
    /**
     * Flag indicating whether the end of the current buffer marks the end of
     * all input
     */
    this.atEnd = false
    /**
     * Explicit indent set in block scalar header, as an offset from the current
     * minimum indent, so e.g. set to 1 from a header `|2+`. Set to -1 if not
     * explicitly set.
     */
    this.blockScalarIndent = -1
    /**
     * Block scalars that include a + (keep) chomping indicator in their header
     * include trailing empty lines, which are otherwise excluded from the
     * scalar's contents.
     */
    this.blockScalarKeep = false
    /** Current input */
    this.buffer = ""
    /**
     * Flag noting whether the map value indicator : can immediately follow this
     * node within a flow context.
     */
    this.flowKey = false
    /** Count of surrounding flow collection levels. */
    this.flowLevel = 0
    /**
     * Minimum level of indentation required for next lines to be parsed as a
     * part of the current scalar value.
     */
    this.indentNext = 0
    /** Indentation level of the current line. */
    this.indentValue = 0
    /** Position of the next \n character. */
    this.lineEndPos = null
    /** Stores the state of the lexer if reaching the end of incpomplete input */
    this.next = null
    /** A pointer to `buffer`; the current position of the lexer. */
    this.pos = 0
  }
  /**
   * Generate YAML tokens from the `source` string. If `incomplete`,
   * a part of the last line may be left as a buffer for the next call.
   *
   * @returns A generator of lexical tokens
   */
  *lex(source, incomplete = false) {
    if (source) {
      if (typeof source !== "string") throw TypeError("source is not a string")
      this.buffer = this.buffer ? this.buffer + source : source
      this.lineEndPos = null
    }
    this.atEnd = !incomplete
    let next = this.next ?? "stream"
    while (next && (incomplete || this.hasChars(1))) next = yield* this.parseNext(next)
  }
  atLineEnd() {
    let i = this.pos
    let ch = this.buffer[i]
    while (ch === " " || ch === "	") ch = this.buffer[++i]
    if (!ch || ch === "#" || ch === "\n") return true
    if (ch === "\r") return this.buffer[i + 1] === "\n"
    return false
  }
  charAt(n) {
    return this.buffer[this.pos + n]
  }
  continueScalar(offset) {
    let ch = this.buffer[offset]
    if (this.indentNext > 0) {
      let indent = 0
      while (ch === " ") ch = this.buffer[++indent + offset]
      if (ch === "\r") {
        const next = this.buffer[indent + offset + 1]
        if (next === "\n" || (!next && !this.atEnd)) return offset + indent + 1
      }
      return ch === "\n" || indent >= this.indentNext || (!ch && !this.atEnd) ? offset + indent : -1
    }
    if (ch === "-" || ch === ".") {
      const dt = this.buffer.substr(offset, 3)
      if ((dt === "---" || dt === "...") && isEmpty(this.buffer[offset + 3])) return -1
    }
    return offset
  }
  getLine() {
    let end = this.lineEndPos
    if (typeof end !== "number" || (end !== -1 && end < this.pos)) {
      end = this.buffer.indexOf("\n", this.pos)
      this.lineEndPos = end
    }
    if (end === -1) return this.atEnd ? this.buffer.substring(this.pos) : null
    if (this.buffer[end - 1] === "\r") end -= 1
    return this.buffer.substring(this.pos, end)
  }
  hasChars(n) {
    return this.pos + n <= this.buffer.length
  }
  setNext(state) {
    this.buffer = this.buffer.substring(this.pos)
    this.pos = 0
    this.lineEndPos = null
    this.next = state
    return null
  }
  peek(n) {
    return this.buffer.substr(this.pos, n)
  }
  *parseNext(next) {
    switch (next) {
      case "stream":
        return yield* this.parseStream()
      case "line-start":
        return yield* this.parseLineStart()
      case "block-start":
        return yield* this.parseBlockStart()
      case "doc":
        return yield* this.parseDocument()
      case "flow":
        return yield* this.parseFlowCollection()
      case "quoted-scalar":
        return yield* this.parseQuotedScalar()
      case "block-scalar":
        return yield* this.parseBlockScalar()
      case "plain-scalar":
        return yield* this.parsePlainScalar()
    }
  }
  *parseStream() {
    let line = this.getLine()
    if (line === null) return this.setNext("stream")
    if (line[0] === "﻿") {
      yield* this.pushCount(1)
      line = line.substring(1)
    }
    if (line[0] === "%") {
      let dirEnd = line.length
      let cs = line.indexOf("#")
      while (cs !== -1) {
        const ch = line[cs - 1]
        if (ch === " " || ch === "	") {
          dirEnd = cs - 1
          break
        } else cs = line.indexOf("#", cs + 1)
      }
      while (true) {
        const ch = line[dirEnd - 1]
        if (ch === " " || ch === "	") dirEnd -= 1
        else break
      }
      const n = (yield* this.pushCount(dirEnd)) + (yield* this.pushSpaces(true))
      yield* this.pushCount(line.length - n)
      this.pushNewline()
      return "stream"
    }
    if (this.atLineEnd()) {
      const sp = yield* this.pushSpaces(true)
      yield* this.pushCount(line.length - sp)
      yield* this.pushNewline()
      return "stream"
    }
    yield ""
    return yield* this.parseLineStart()
  }
  *parseLineStart() {
    const ch = this.charAt(0)
    if (!ch && !this.atEnd) return this.setNext("line-start")
    if (ch === "-" || ch === ".") {
      if (!this.atEnd && !this.hasChars(4)) return this.setNext("line-start")
      const s = this.peek(3)
      if ((s === "---" || s === "...") && isEmpty(this.charAt(3))) {
        yield* this.pushCount(3)
        this.indentValue = 0
        this.indentNext = 0
        return s === "---" ? "doc" : "stream"
      }
    }
    this.indentValue = yield* this.pushSpaces(false)
    if (this.indentNext > this.indentValue && !isEmpty(this.charAt(1)))
      this.indentNext = this.indentValue
    return yield* this.parseBlockStart()
  }
  *parseBlockStart() {
    const [ch0, ch1] = this.peek(2)
    if (!ch1 && !this.atEnd) return this.setNext("block-start")
    if ((ch0 === "-" || ch0 === "?" || ch0 === ":") && isEmpty(ch1)) {
      const n = (yield* this.pushCount(1)) + (yield* this.pushSpaces(true))
      this.indentNext = this.indentValue + 1
      this.indentValue += n
      return "block-start"
    }
    return "doc"
  }
  *parseDocument() {
    yield* this.pushSpaces(true)
    const line = this.getLine()
    if (line === null) return this.setNext("doc")
    let n = yield* this.pushIndicators()
    switch (line[n]) {
      case "#":
        yield* this.pushCount(line.length - n)
      case void 0:
        yield* this.pushNewline()
        return yield* this.parseLineStart()
      case "{":
      case "[":
        yield* this.pushCount(1)
        this.flowKey = false
        this.flowLevel = 1
        return "flow"
      case "}":
      case "]":
        yield* this.pushCount(1)
        return "doc"
      case "*":
        yield* this.pushUntil(isNotAnchorChar)
        return "doc"
      case '"':
      case "'":
        return yield* this.parseQuotedScalar()
      case "|":
      case ">":
        n += yield* this.parseBlockScalarHeader()
        n += yield* this.pushSpaces(true)
        yield* this.pushCount(line.length - n)
        yield* this.pushNewline()
        return yield* this.parseBlockScalar()
      default:
        return yield* this.parsePlainScalar()
    }
  }
  *parseFlowCollection() {
    let nl, sp
    let indent = -1
    do {
      nl = yield* this.pushNewline()
      if (nl > 0) {
        sp = yield* this.pushSpaces(false)
        this.indentValue = indent = sp
      } else sp = 0
      sp += yield* this.pushSpaces(true)
    } while (nl + sp > 0)
    const line = this.getLine()
    if (line === null) return this.setNext("flow")
    if (
      (indent !== -1 && indent < this.indentNext && line[0] !== "#") ||
      (indent === 0 && (line.startsWith("---") || line.startsWith("...")) && isEmpty(line[3]))
    ) {
      if (
        !(
          indent === this.indentNext - 1 &&
          this.flowLevel === 1 &&
          (line[0] === "]" || line[0] === "}")
        )
      ) {
        this.flowLevel = 0
        yield ""
        return yield* this.parseLineStart()
      }
    }
    let n = 0
    while (line[n] === ",") {
      n += yield* this.pushCount(1)
      n += yield* this.pushSpaces(true)
      this.flowKey = false
    }
    n += yield* this.pushIndicators()
    switch (line[n]) {
      case void 0:
        return "flow"
      case "#":
        yield* this.pushCount(line.length - n)
        return "flow"
      case "{":
      case "[":
        yield* this.pushCount(1)
        this.flowKey = false
        this.flowLevel += 1
        return "flow"
      case "}":
      case "]":
        yield* this.pushCount(1)
        this.flowKey = true
        this.flowLevel -= 1
        return this.flowLevel ? "flow" : "doc"
      case "*":
        yield* this.pushUntil(isNotAnchorChar)
        return "flow"
      case '"':
      case "'":
        this.flowKey = true
        return yield* this.parseQuotedScalar()
      case ":": {
        const next = this.charAt(1)
        if (this.flowKey || isEmpty(next) || next === ",") {
          this.flowKey = false
          yield* this.pushCount(1)
          yield* this.pushSpaces(true)
          return "flow"
        }
      }
      default:
        this.flowKey = false
        return yield* this.parsePlainScalar()
    }
  }
  *parseQuotedScalar() {
    const quote = this.charAt(0)
    let end = this.buffer.indexOf(quote, this.pos + 1)
    if (quote === "'")
      while (end !== -1 && this.buffer[end + 1] === "'") end = this.buffer.indexOf("'", end + 2)
    else
      while (end !== -1) {
        let n = 0
        while (this.buffer[end - 1 - n] === "\\") n += 1
        if (n % 2 === 0) break
        end = this.buffer.indexOf('"', end + 1)
      }
    const qb = this.buffer.substring(0, end)
    let nl = qb.indexOf("\n", this.pos)
    if (nl !== -1) {
      while (nl !== -1) {
        const cs = this.continueScalar(nl + 1)
        if (cs === -1) break
        nl = qb.indexOf("\n", cs)
      }
      if (nl !== -1) end = nl - (qb[nl - 1] === "\r" ? 2 : 1)
    }
    if (end === -1) {
      if (!this.atEnd) return this.setNext("quoted-scalar")
      end = this.buffer.length
    }
    yield* this.pushToIndex(end + 1, false)
    return this.flowLevel ? "flow" : "doc"
  }
  *parseBlockScalarHeader() {
    this.blockScalarIndent = -1
    this.blockScalarKeep = false
    let i = this.pos
    while (true) {
      const ch = this.buffer[++i]
      if (ch === "+") this.blockScalarKeep = true
      else if (ch > "0" && ch <= "9") this.blockScalarIndent = Number(ch) - 1
      else if (ch !== "-") break
    }
    return yield* this.pushUntil((ch) => isEmpty(ch) || ch === "#")
  }
  *parseBlockScalar() {
    let nl = this.pos - 1
    let indent = 0
    let ch
    loop: for (let i = this.pos; (ch = this.buffer[i]); ++i)
      switch (ch) {
        case " ":
          indent += 1
          break
        case "\n":
          nl = i
          indent = 0
          break
        case "\r": {
          const next = this.buffer[i + 1]
          if (!next && !this.atEnd) return this.setNext("block-scalar")
          if (next === "\n") break
        }
        default:
          break loop
      }
    if (!ch && !this.atEnd) return this.setNext("block-scalar")
    if (indent >= this.indentNext) {
      if (this.blockScalarIndent === -1) this.indentNext = indent
      else this.indentNext = this.blockScalarIndent + (this.indentNext === 0 ? 1 : this.indentNext)
      do {
        const cs = this.continueScalar(nl + 1)
        if (cs === -1) break
        nl = this.buffer.indexOf("\n", cs)
      } while (nl !== -1)
      if (nl === -1) {
        if (!this.atEnd) return this.setNext("block-scalar")
        nl = this.buffer.length
      }
    }
    let i = nl + 1
    ch = this.buffer[i]
    while (ch === " ") ch = this.buffer[++i]
    if (ch === "	") {
      while (ch === "	" || ch === " " || ch === "\r" || ch === "\n") ch = this.buffer[++i]
      nl = i - 1
    } else if (!this.blockScalarKeep)
      do {
        let i = nl - 1
        let ch = this.buffer[i]
        if (ch === "\r") ch = this.buffer[--i]
        const lastChar = i
        while (ch === " ") ch = this.buffer[--i]
        if (ch === "\n" && i >= this.pos && i + 1 + indent > lastChar) nl = i
        else break
      } while (true)
    yield ""
    yield* this.pushToIndex(nl + 1, true)
    return yield* this.parseLineStart()
  }
  *parsePlainScalar() {
    const inFlow = this.flowLevel > 0
    let end = this.pos - 1
    let i = this.pos - 1
    let ch
    while ((ch = this.buffer[++i]))
      if (ch === ":") {
        const next = this.buffer[i + 1]
        if (isEmpty(next) || (inFlow && flowIndicatorChars.has(next))) break
        end = i
      } else if (isEmpty(ch)) {
        let next = this.buffer[i + 1]
        if (ch === "\r") {
          if (next === "\n") {
            i += 1
            ch = "\n"
            next = this.buffer[i + 1]
          } else end = i
        }
        if (next === "#" || (inFlow && flowIndicatorChars.has(next))) break
        if (ch === "\n") {
          const cs = this.continueScalar(i + 1)
          if (cs === -1) break
          i = Math.max(i, cs - 2)
        }
      } else {
        if (inFlow && flowIndicatorChars.has(ch)) break
        end = i
      }
    if (!ch && !this.atEnd) return this.setNext("plain-scalar")
    yield ""
    yield* this.pushToIndex(end + 1, true)
    return inFlow ? "flow" : "doc"
  }
  *pushCount(n) {
    if (n > 0) {
      yield this.buffer.substr(this.pos, n)
      this.pos += n
      return n
    }
    return 0
  }
  *pushToIndex(i, allowEmpty) {
    const s = this.buffer.slice(this.pos, i)
    if (s) {
      yield s
      this.pos += s.length
      return s.length
    } else if (allowEmpty) yield ""
    return 0
  }
  *pushIndicators() {
    let n = 0
    loop: while (true) {
      switch (this.charAt(0)) {
        case "!":
          n += yield* this.pushTag()
          n += yield* this.pushSpaces(true)
          continue loop
        case "&":
          n += yield* this.pushUntil(isNotAnchorChar)
          n += yield* this.pushSpaces(true)
          continue loop
        case "-":
        case "?":
        case ":": {
          const inFlow = this.flowLevel > 0
          const ch1 = this.charAt(1)
          if (isEmpty(ch1) || (inFlow && flowIndicatorChars.has(ch1))) {
            if (!inFlow) this.indentNext = this.indentValue + 1
            else if (this.flowKey) this.flowKey = false
            n += yield* this.pushCount(1)
            n += yield* this.pushSpaces(true)
            continue loop
          }
        }
      }
      break loop
    }
    return n
  }
  *pushTag() {
    if (this.charAt(1) === "<") {
      let i = this.pos + 2
      let ch = this.buffer[i]
      while (!isEmpty(ch) && ch !== ">") ch = this.buffer[++i]
      return yield* this.pushToIndex(ch === ">" ? i + 1 : i, false)
    } else {
      let i = this.pos + 1
      let ch = this.buffer[i]
      while (ch)
        if (tagChars.has(ch)) ch = this.buffer[++i]
        else if (
          ch === "%" &&
          hexDigits.has(this.buffer[i + 1]) &&
          hexDigits.has(this.buffer[i + 2])
        )
          ch = this.buffer[(i += 3)]
        else break
      return yield* this.pushToIndex(i, false)
    }
  }
  *pushNewline() {
    const ch = this.buffer[this.pos]
    if (ch === "\n") return yield* this.pushCount(1)
    else if (ch === "\r" && this.charAt(1) === "\n") return yield* this.pushCount(2)
    else return 0
  }
  *pushSpaces(allowTabs) {
    let i = this.pos - 1
    let ch
    do ch = this.buffer[++i]
    while (ch === " " || (allowTabs && ch === "	"))
    const n = i - this.pos
    if (n > 0) {
      yield this.buffer.substr(this.pos, n)
      this.pos = i
    }
    return n
  }
  *pushUntil(test) {
    let i = this.pos
    let ch = this.buffer[i]
    while (!test(ch)) ch = this.buffer[++i]
    return yield* this.pushToIndex(i, false)
  }
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/parse/line-counter.js
/**
 * Tracks newlines during parsing in order to provide an efficient API for
 * determining the one-indexed `{ line, col }` position for any offset
 * within the input.
 */
const LineCounter = class {
  constructor() {
    this.lineStarts = []
    /**
     * Should be called in ascending order. Otherwise, call
     * `lineCounter.lineStarts.sort()` before calling `linePos()`.
     */
    this.addNewLine = (offset) => this.lineStarts.push(offset)
    /**
     * Performs a binary search and returns the 1-indexed { line, col }
     * position of `offset`. If `line === 0`, `addNewLine` has never been
     * called or `offset` is before the first known newline.
     */
    this.linePos = (offset) => {
      let low = 0
      let high = this.lineStarts.length
      while (low < high) {
        const mid = (low + high) >> 1
        if (this.lineStarts[mid] < offset) low = mid + 1
        else high = mid
      }
      if (this.lineStarts[low] === offset)
        return {
          line: low + 1,
          col: 1,
        }
      if (low === 0)
        return {
          line: 0,
          col: offset,
        }
      const start = this.lineStarts[low - 1]
      return {
        line: low,
        col: offset - start + 1,
      }
    }
  }
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/parse/parser.js
function includesToken(list, type) {
  for (let i = 0; i < list.length; ++i) if (list[i].type === type) return true
  return false
}
function findNonEmptyIndex(list) {
  for (let i = 0; i < list.length; ++i)
    switch (list[i].type) {
      case "space":
      case "comment":
      case "newline":
        break
      default:
        return i
    }
  return -1
}
function isFlowToken(token) {
  switch (token?.type) {
    case "alias":
    case "scalar":
    case "single-quoted-scalar":
    case "double-quoted-scalar":
    case "flow-collection":
      return true
    default:
      return false
  }
}
function getPrevProps(parent) {
  switch (parent.type) {
    case "document":
      return parent.start
    case "block-map": {
      const it = parent.items.at(-1)
      return it.sep ?? it.start
    }
    case "block-seq":
      return parent.items.at(-1).start
    /* istanbul ignore next should not happen */
    default:
      return []
  }
}
/** Note: May modify input array */
function getFirstKeyStartProps(prev) {
  if (prev.length === 0) return []
  let i = prev.length
  loop: while (--i >= 0)
    switch (prev[i].type) {
      case "doc-start":
      case "explicit-key-ind":
      case "map-value-ind":
      case "seq-item-ind":
      case "newline":
        break loop
    }
  while (prev[++i]?.type === "space");
  return prev.splice(i, prev.length)
}
function arrayPushArray(target, source) {
  if (source.length < 1e5) Array.prototype.push.apply(target, source)
  else for (let i = 0; i < source.length; ++i) target.push(source[i])
}
function fixFlowSeqItems(fc) {
  if (fc.start.type === "flow-seq-start") {
    for (const it of fc.items)
      if (
        it.sep &&
        !it.value &&
        !includesToken(it.start, "explicit-key-ind") &&
        !includesToken(it.sep, "map-value-ind")
      ) {
        if (it.key) it.value = it.key
        delete it.key
        if (isFlowToken(it.value)) {
          if (it.value.end) arrayPushArray(it.value.end, it.sep)
          else it.value.end = it.sep
        } else arrayPushArray(it.start, it.sep)
        delete it.sep
      }
  }
}
/**
 * A YAML concrete syntax tree (CST) parser
 *
 * ```ts
 * const src: string = ...
 * for (const token of new Parser().parse(src)) {
 *   // token: Token
 * }
 * ```
 *
 * To use the parser with a user-provided lexer:
 *
 * ```ts
 * function* parse(source: string, lexer: Lexer) {
 *   const parser = new Parser()
 *   for (const lexeme of lexer.lex(source))
 *     yield* parser.next(lexeme)
 *   yield* parser.end()
 * }
 *
 * const src: string = ...
 * const lexer = new Lexer()
 * for (const token of parse(src, lexer)) {
 *   // token: Token
 * }
 * ```
 */
const Parser = class {
  /**
   * @param onNewLine - If defined, called separately with the start position of
   *   each new line (in `parse()`, including the start of input).
   */
  constructor(onNewLine) {
    /** If true, space and sequence indicators count as indentation */
    this.atNewLine = true
    /** If true, next token is a scalar value */
    this.atScalar = false
    /** Current indentation level */
    this.indent = 0
    /** Current offset since the start of parsing */
    this.offset = 0
    /** On the same line with a block map key */
    this.onKeyLine = false
    /** Top indicates the node that's currently being built */
    this.stack = []
    /** The source of the current token, set in parse() */
    this.source = ""
    /** The type of the current token, set in parse() */
    this.type = ""
    this.lexer = new Lexer()
    this.onNewLine = onNewLine
  }
  /**
   * Parse `source` as a YAML stream.
   * If `incomplete`, a part of the last line may be left as a buffer for the next call.
   *
   * Errors are not thrown, but yielded as `{ type: 'error', message }` tokens.
   *
   * @returns A generator of tokens representing each directive, document, and other structure.
   */
  *parse(source, incomplete = false) {
    if (this.onNewLine && this.offset === 0) this.onNewLine(0)
    for (const lexeme of this.lexer.lex(source, incomplete)) yield* this.next(lexeme)
    if (!incomplete) yield* this.end()
  }
  /**
   * Advance the parser by the `source` of one lexical token.
   */
  *next(source) {
    this.source = source
    if (this.atScalar) {
      this.atScalar = false
      yield* this.step()
      this.offset += source.length
      return
    }
    const type = tokenType(source)
    if (!type) {
      const message = `Not a YAML token: ${source}`
      yield* this.pop({
        type: "error",
        offset: this.offset,
        message,
        source,
      })
      this.offset += source.length
    } else if (type === "scalar") {
      this.atNewLine = false
      this.atScalar = true
      this.type = "scalar"
    } else {
      this.type = type
      yield* this.step()
      switch (type) {
        case "newline":
          this.atNewLine = true
          this.indent = 0
          if (this.onNewLine) this.onNewLine(this.offset + source.length)
          break
        case "space":
          if (this.atNewLine && source[0] === " ") this.indent += source.length
          break
        case "explicit-key-ind":
        case "map-value-ind":
        case "seq-item-ind":
          if (this.atNewLine) this.indent += source.length
          break
        case "doc-mode":
        case "flow-error-end":
          return
        default:
          this.atNewLine = false
      }
      this.offset += source.length
    }
  }
  /** Call at end of input to push out any remaining constructions */
  *end() {
    while (this.stack.length > 0) yield* this.pop()
  }
  get sourceToken() {
    return {
      type: this.type,
      offset: this.offset,
      indent: this.indent,
      source: this.source,
    }
  }
  *step() {
    const top = this.peek(1)
    if (this.type === "doc-end" && top?.type !== "doc-end") {
      while (this.stack.length > 0) yield* this.pop()
      this.stack.push({
        type: "doc-end",
        offset: this.offset,
        source: this.source,
      })
      return
    }
    if (!top) return yield* this.stream()
    switch (top.type) {
      case "document":
        return yield* this.document(top)
      case "alias":
      case "scalar":
      case "single-quoted-scalar":
      case "double-quoted-scalar":
        return yield* this.scalar(top)
      case "block-scalar":
        return yield* this.blockScalar(top)
      case "block-map":
        return yield* this.blockMap(top)
      case "block-seq":
        return yield* this.blockSequence(top)
      case "flow-collection":
        return yield* this.flowCollection(top)
      case "doc-end":
        return yield* this.documentEnd(top)
    }
    /* istanbul ignore next should not happen */
    yield* this.pop()
  }
  peek(n) {
    return this.stack[this.stack.length - n]
  }
  *pop(error) {
    const token = error ?? this.stack.pop()
    /* istanbul ignore if should not happen */
    if (!token)
      yield {
        type: "error",
        offset: this.offset,
        source: "",
        message: "Tried to pop an empty stack",
      }
    else if (this.stack.length === 0) yield token
    else {
      const top = this.peek(1)
      if (token.type === "block-scalar") token.indent = "indent" in top ? top.indent : 0
      else if (token.type === "flow-collection" && top.type === "document") token.indent = 0
      if (token.type === "flow-collection") fixFlowSeqItems(token)
      switch (top.type) {
        case "document":
          top.value = token
          break
        case "block-scalar":
          top.props.push(token)
          break
        case "block-map": {
          const it = top.items[top.items.length - 1]
          if (it.value) {
            top.items.push({
              start: [],
              key: token,
              sep: [],
            })
            this.onKeyLine = true
            return
          } else if (it.sep) it.value = token
          else {
            Object.assign(it, {
              key: token,
              sep: [],
            })
            this.onKeyLine = !it.explicitKey
            return
          }
          break
        }
        case "block-seq": {
          const it = top.items[top.items.length - 1]
          if (it.value)
            top.items.push({
              start: [],
              value: token,
            })
          else it.value = token
          break
        }
        case "flow-collection": {
          const it = top.items[top.items.length - 1]
          if (!it || it.value)
            top.items.push({
              start: [],
              key: token,
              sep: [],
            })
          else if (it.sep) it.value = token
          else
            Object.assign(it, {
              key: token,
              sep: [],
            })
          return
        }
        /* istanbul ignore next should not happen */
        default:
          yield* this.pop()
          yield* this.pop(token)
      }
      if (
        (top.type === "document" || top.type === "block-map" || top.type === "block-seq") &&
        (token.type === "block-map" || token.type === "block-seq")
      ) {
        const last = token.items[token.items.length - 1]
        if (
          last &&
          !last.sep &&
          !last.value &&
          last.start.length > 0 &&
          findNonEmptyIndex(last.start) === -1 &&
          (token.indent === 0 ||
            last.start.every((st) => st.type !== "comment" || st.indent < token.indent))
        ) {
          if (top.type === "document") top.end = last.start
          else top.items.push({ start: last.start })
          token.items.splice(-1, 1)
        }
      }
    }
  }
  *stream() {
    switch (this.type) {
      case "directive-line":
        yield {
          type: "directive",
          offset: this.offset,
          source: this.source,
        }
        return
      case "byte-order-mark":
      case "space":
      case "comment":
      case "newline":
        yield this.sourceToken
        return
      case "doc-mode":
      case "doc-start": {
        const doc = {
          type: "document",
          offset: this.offset,
          start: [],
        }
        if (this.type === "doc-start") doc.start.push(this.sourceToken)
        this.stack.push(doc)
        return
      }
    }
    yield {
      type: "error",
      offset: this.offset,
      message: `Unexpected ${this.type} token in YAML stream`,
      source: this.source,
    }
  }
  *document(doc) {
    if (doc.value) return yield* this.lineEnd(doc)
    switch (this.type) {
      case "doc-start":
        if (findNonEmptyIndex(doc.start) !== -1) {
          yield* this.pop()
          yield* this.step()
        } else doc.start.push(this.sourceToken)
        return
      case "anchor":
      case "tag":
      case "space":
      case "comment":
      case "newline":
        doc.start.push(this.sourceToken)
        return
    }
    const bv = this.startBlockValue(doc)
    if (bv) this.stack.push(bv)
    else
      yield {
        type: "error",
        offset: this.offset,
        message: `Unexpected ${this.type} token in YAML document`,
        source: this.source,
      }
  }
  *scalar(scalar) {
    if (this.type === "map-value-ind") {
      const start = getFirstKeyStartProps(getPrevProps(this.peek(2)))
      let sep
      if (scalar.end) {
        sep = scalar.end
        sep.push(this.sourceToken)
        delete scalar.end
      } else sep = [this.sourceToken]
      const map = {
        type: "block-map",
        offset: scalar.offset,
        indent: scalar.indent,
        items: [
          {
            start,
            key: scalar,
            sep,
          },
        ],
      }
      this.onKeyLine = true
      this.stack[this.stack.length - 1] = map
    } else yield* this.lineEnd(scalar)
  }
  *blockScalar(scalar) {
    switch (this.type) {
      case "space":
      case "comment":
      case "newline":
        scalar.props.push(this.sourceToken)
        return
      case "scalar":
        scalar.source = this.source
        this.atNewLine = true
        this.indent = 0
        if (this.onNewLine) {
          let nl = this.source.indexOf("\n") + 1
          while (nl !== 0) {
            this.onNewLine(this.offset + nl)
            nl = this.source.indexOf("\n", nl) + 1
          }
        }
        yield* this.pop()
        break
      /* istanbul ignore next should not happen */
      default:
        yield* this.pop()
        yield* this.step()
    }
  }
  *blockMap(map) {
    const it = map.items[map.items.length - 1]
    switch (this.type) {
      case "newline":
        this.onKeyLine = false
        if (it.value) {
          const end = "end" in it.value ? it.value.end : void 0
          if ((Array.isArray(end) ? end[end.length - 1] : void 0)?.type === "comment")
            end?.push(this.sourceToken)
          else map.items.push({ start: [this.sourceToken] })
        } else if (it.sep) it.sep.push(this.sourceToken)
        else it.start.push(this.sourceToken)
        return
      case "space":
      case "comment":
        if (it.value) map.items.push({ start: [this.sourceToken] })
        else if (it.sep) it.sep.push(this.sourceToken)
        else {
          if (this.atIndentedComment(it.start, map.indent)) {
            const end = map.items[map.items.length - 2]?.value?.end
            if (Array.isArray(end)) {
              arrayPushArray(end, it.start)
              end.push(this.sourceToken)
              map.items.pop()
              return
            }
          }
          it.start.push(this.sourceToken)
        }
        return
    }
    if (this.indent >= map.indent) {
      const atMapIndent = !this.onKeyLine && this.indent === map.indent
      const atNextItem = atMapIndent && (it.sep || it.explicitKey) && this.type !== "seq-item-ind"
      let start = []
      if (atNextItem && it.sep && !it.value) {
        const nl = []
        for (let i = 0; i < it.sep.length; ++i) {
          const st = it.sep[i]
          switch (st.type) {
            case "newline":
              nl.push(i)
              break
            case "space":
              break
            case "comment":
              if (st.indent > map.indent) nl.length = 0
              break
            default:
              nl.length = 0
          }
        }
        if (nl.length >= 2) start = it.sep.splice(nl[1])
      }
      switch (this.type) {
        case "anchor":
        case "tag":
          if (atNextItem || it.value) {
            start.push(this.sourceToken)
            map.items.push({ start })
            this.onKeyLine = true
          } else if (it.sep) it.sep.push(this.sourceToken)
          else it.start.push(this.sourceToken)
          return
        case "explicit-key-ind":
          if (!it.sep && !it.explicitKey) {
            it.start.push(this.sourceToken)
            it.explicitKey = true
          } else if (atNextItem || it.value) {
            start.push(this.sourceToken)
            map.items.push({
              start,
              explicitKey: true,
            })
          } else
            this.stack.push({
              type: "block-map",
              offset: this.offset,
              indent: this.indent,
              items: [
                {
                  start: [this.sourceToken],
                  explicitKey: true,
                },
              ],
            })
          this.onKeyLine = true
          return
        case "map-value-ind":
          if (it.explicitKey) {
            if (!it.sep) {
              if (includesToken(it.start, "newline"))
                Object.assign(it, {
                  key: null,
                  sep: [this.sourceToken],
                })
              else {
                const start = getFirstKeyStartProps(it.start)
                this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [
                    {
                      start,
                      key: null,
                      sep: [this.sourceToken],
                    },
                  ],
                })
              }
            } else if (it.value)
              map.items.push({
                start: [],
                key: null,
                sep: [this.sourceToken],
              })
            else if (includesToken(it.sep, "map-value-ind"))
              this.stack.push({
                type: "block-map",
                offset: this.offset,
                indent: this.indent,
                items: [
                  {
                    start,
                    key: null,
                    sep: [this.sourceToken],
                  },
                ],
              })
            else if (isFlowToken(it.key) && !includesToken(it.sep, "newline")) {
              const start = getFirstKeyStartProps(it.start)
              const key = it.key
              const sep = it.sep
              sep.push(this.sourceToken)
              delete it.key
              delete it.sep
              this.stack.push({
                type: "block-map",
                offset: this.offset,
                indent: this.indent,
                items: [
                  {
                    start,
                    key,
                    sep,
                  },
                ],
              })
            } else if (start.length > 0) it.sep = it.sep.concat(start, this.sourceToken)
            else it.sep.push(this.sourceToken)
          } else if (!it.sep)
            Object.assign(it, {
              key: null,
              sep: [this.sourceToken],
            })
          else if (it.value || atNextItem)
            map.items.push({
              start,
              key: null,
              sep: [this.sourceToken],
            })
          else if (includesToken(it.sep, "map-value-ind"))
            this.stack.push({
              type: "block-map",
              offset: this.offset,
              indent: this.indent,
              items: [
                {
                  start: [],
                  key: null,
                  sep: [this.sourceToken],
                },
              ],
            })
          else it.sep.push(this.sourceToken)
          this.onKeyLine = true
          return
        case "alias":
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar": {
          const fs = this.flowScalar(this.type)
          if (atNextItem || it.value) {
            map.items.push({
              start,
              key: fs,
              sep: [],
            })
            this.onKeyLine = true
          } else if (it.sep) this.stack.push(fs)
          else {
            Object.assign(it, {
              key: fs,
              sep: [],
            })
            this.onKeyLine = true
          }
          return
        }
        default: {
          const bv = this.startBlockValue(map)
          if (bv) {
            if (bv.type === "block-seq") {
              if (!it.explicitKey && it.sep && !includesToken(it.sep, "newline")) {
                yield* this.pop({
                  type: "error",
                  offset: this.offset,
                  message: "Unexpected block-seq-ind on same line with key",
                  source: this.source,
                })
                return
              }
            } else if (atMapIndent) map.items.push({ start })
            this.stack.push(bv)
            return
          }
        }
      }
    }
    yield* this.pop()
    yield* this.step()
  }
  *blockSequence(seq) {
    const it = seq.items[seq.items.length - 1]
    switch (this.type) {
      case "newline":
        if (it.value) {
          const end = "end" in it.value ? it.value.end : void 0
          if ((Array.isArray(end) ? end[end.length - 1] : void 0)?.type === "comment")
            end?.push(this.sourceToken)
          else seq.items.push({ start: [this.sourceToken] })
        } else it.start.push(this.sourceToken)
        return
      case "space":
      case "comment":
        if (it.value) seq.items.push({ start: [this.sourceToken] })
        else {
          if (this.atIndentedComment(it.start, seq.indent)) {
            const end = seq.items[seq.items.length - 2]?.value?.end
            if (Array.isArray(end)) {
              arrayPushArray(end, it.start)
              end.push(this.sourceToken)
              seq.items.pop()
              return
            }
          }
          it.start.push(this.sourceToken)
        }
        return
      case "anchor":
      case "tag":
        if (it.value || this.indent <= seq.indent) break
        it.start.push(this.sourceToken)
        return
      case "seq-item-ind":
        if (this.indent !== seq.indent) break
        if (it.value || includesToken(it.start, "seq-item-ind"))
          seq.items.push({ start: [this.sourceToken] })
        else it.start.push(this.sourceToken)
        return
    }
    if (this.indent > seq.indent) {
      const bv = this.startBlockValue(seq)
      if (bv) {
        this.stack.push(bv)
        return
      }
    }
    yield* this.pop()
    yield* this.step()
  }
  *flowCollection(fc) {
    const it = fc.items[fc.items.length - 1]
    if (this.type === "flow-error-end") {
      let top
      do {
        yield* this.pop()
        top = this.peek(1)
      } while (top?.type === "flow-collection")
    } else if (fc.end.length === 0) {
      switch (this.type) {
        case "comma":
        case "explicit-key-ind":
          if (!it || it.sep) fc.items.push({ start: [this.sourceToken] })
          else it.start.push(this.sourceToken)
          return
        case "map-value-ind":
          if (!it || it.value)
            fc.items.push({
              start: [],
              key: null,
              sep: [this.sourceToken],
            })
          else if (it.sep) it.sep.push(this.sourceToken)
          else
            Object.assign(it, {
              key: null,
              sep: [this.sourceToken],
            })
          return
        case "space":
        case "comment":
        case "newline":
        case "anchor":
        case "tag":
          if (!it || it.value) fc.items.push({ start: [this.sourceToken] })
          else if (it.sep) it.sep.push(this.sourceToken)
          else it.start.push(this.sourceToken)
          return
        case "alias":
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar": {
          const fs = this.flowScalar(this.type)
          if (!it || it.value)
            fc.items.push({
              start: [],
              key: fs,
              sep: [],
            })
          else if (it.sep) this.stack.push(fs)
          else
            Object.assign(it, {
              key: fs,
              sep: [],
            })
          return
        }
        case "flow-map-end":
        case "flow-seq-end":
          fc.end.push(this.sourceToken)
          return
      }
      const bv = this.startBlockValue(fc)
      /* istanbul ignore else should not happen */
      if (bv) this.stack.push(bv)
      else {
        yield* this.pop()
        yield* this.step()
      }
    } else {
      const parent = this.peek(2)
      if (
        parent.type === "block-map" &&
        ((this.type === "map-value-ind" && parent.indent === fc.indent) ||
          (this.type === "newline" && !parent.items[parent.items.length - 1].sep))
      ) {
        yield* this.pop()
        yield* this.step()
      } else if (this.type === "map-value-ind" && parent.type !== "flow-collection") {
        const start = getFirstKeyStartProps(getPrevProps(parent))
        fixFlowSeqItems(fc)
        const sep = fc.end.splice(1, fc.end.length)
        sep.push(this.sourceToken)
        const map = {
          type: "block-map",
          offset: fc.offset,
          indent: fc.indent,
          items: [
            {
              start,
              key: fc,
              sep,
            },
          ],
        }
        this.onKeyLine = true
        this.stack[this.stack.length - 1] = map
      } else yield* this.lineEnd(fc)
    }
  }
  flowScalar(type) {
    if (this.onNewLine) {
      let nl = this.source.indexOf("\n") + 1
      while (nl !== 0) {
        this.onNewLine(this.offset + nl)
        nl = this.source.indexOf("\n", nl) + 1
      }
    }
    return {
      type,
      offset: this.offset,
      indent: this.indent,
      source: this.source,
    }
  }
  startBlockValue(parent) {
    switch (this.type) {
      case "alias":
      case "scalar":
      case "single-quoted-scalar":
      case "double-quoted-scalar":
        return this.flowScalar(this.type)
      case "block-scalar-header":
        return {
          type: "block-scalar",
          offset: this.offset,
          indent: this.indent,
          props: [this.sourceToken],
          source: "",
        }
      case "flow-map-start":
      case "flow-seq-start":
        return {
          type: "flow-collection",
          offset: this.offset,
          indent: this.indent,
          start: this.sourceToken,
          items: [],
          end: [],
        }
      case "seq-item-ind":
        return {
          type: "block-seq",
          offset: this.offset,
          indent: this.indent,
          items: [{ start: [this.sourceToken] }],
        }
      case "explicit-key-ind": {
        this.onKeyLine = true
        const start = getFirstKeyStartProps(getPrevProps(parent))
        start.push(this.sourceToken)
        return {
          type: "block-map",
          offset: this.offset,
          indent: this.indent,
          items: [
            {
              start,
              explicitKey: true,
            },
          ],
        }
      }
      case "map-value-ind": {
        this.onKeyLine = true
        const start = getFirstKeyStartProps(getPrevProps(parent))
        return {
          type: "block-map",
          offset: this.offset,
          indent: this.indent,
          items: [
            {
              start,
              key: null,
              sep: [this.sourceToken],
            },
          ],
        }
      }
    }
    return null
  }
  atIndentedComment(start, indent) {
    if (this.type !== "comment") return false
    if (this.indent <= indent) return false
    return start.every((st) => st.type === "newline" || st.type === "space")
  }
  *documentEnd(docEnd) {
    if (this.type !== "doc-mode") {
      if (docEnd.end) docEnd.end.push(this.sourceToken)
      else docEnd.end = [this.sourceToken]
      if (this.type === "newline") yield* this.pop()
    }
  }
  *lineEnd(token) {
    switch (this.type) {
      case "comma":
      case "doc-start":
      case "doc-end":
      case "flow-seq-end":
      case "flow-map-end":
      case "map-value-ind":
        yield* this.pop()
        yield* this.step()
        break
      case "newline":
        this.onKeyLine = false
      default:
        if (token.end) token.end.push(this.sourceToken)
        else token.end = [this.sourceToken]
        if (this.type === "newline") yield* this.pop()
    }
  }
}
//#endregion
//#region node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/public-api.js
function parseOptions(options) {
  const prettyErrors = options.prettyErrors !== false
  return {
    lineCounter: options.lineCounter || (prettyErrors && new LineCounter()) || null,
    prettyErrors,
  }
}
/** Parse an input string into a single YAML.Document */
function parseDocument(source, options = {}) {
  const { lineCounter, prettyErrors } = parseOptions(options)
  const parser = new Parser(lineCounter?.addNewLine)
  const composer = new Composer(options)
  let doc = null
  for (const _doc of composer.compose(parser.parse(source), true, source.length))
    if (!doc) doc = _doc
    else if (doc.options.logLevel !== "silent") {
      doc.errors.push(
        new YAMLParseError(
          _doc.range.slice(0, 2),
          "MULTIPLE_DOCS",
          "Source contains multiple documents; please use YAML.parseAllDocuments()",
        ),
      )
      break
    }
  if (prettyErrors && lineCounter) {
    doc.errors.forEach(prettifyError(source, lineCounter))
    doc.warnings.forEach(prettifyError(source, lineCounter))
  }
  return doc
}
function parse(src, reviver, options) {
  let _reviver = void 0
  if (typeof reviver === "function") _reviver = reviver
  else if (options === void 0 && reviver && typeof reviver === "object") options = reviver
  const doc = parseDocument(src, options)
  if (!doc) return null
  doc.warnings.forEach((warning) => warn(doc.options.logLevel, warning))
  if (doc.errors.length > 0) {
    if (doc.options.logLevel !== "silent") throw doc.errors[0]
    else doc.errors = []
  }
  return doc.toJS({ reviver: _reviver, ...options })
}
function stringify(value, replacer, options) {
  let _replacer = null
  if (typeof replacer === "function" || Array.isArray(replacer)) _replacer = replacer
  else if (options === void 0 && replacer) options = replacer
  if (typeof options === "string") options = options.length
  if (typeof options === "number") {
    const indent = Math.round(options)
    options = indent < 1 ? void 0 : indent > 8 ? { indent: 8 } : { indent }
  }
  if (value === void 0) {
    const { keepUndefined } = options ?? replacer ?? {}
    if (!keepUndefined) return void 0
  }
  if (isDocument(value) && !_replacer) return value.toString(options)
  return new Document(value, _replacer, options).toString(options)
}
//#endregion
//#region src/core/nodes/protocols.ts
/**
 * Which version of a protocol a node speaks, for the protocols where that is not a field anyone
 * states outright.
 *
 * Both rules were already shared, and neither was findable: `tuicIsV5` sat in `transport.ts`, which
 * is about the stream a proxy runs over and not about how it authenticates, and `snellVersion` in
 * `targets/shared/ciphers.ts`, which is about cipher lists. Two answers to one kind of question,
 * in two modules named after other things.
 *
 * They belong together because every caller asks them for the same reason: a client's capability
 * list and its spelling both turn on the version, so the rule has to be the same one in the
 * capability check and in the renderer that runs after it.
 */
/**
 * Whether a TUIC node speaks version 5.
 *
 * The two differ by credential rather than by a field a source states: v5 authenticates with a uuid
 * and a password, v4 with a single token — and a v4 URI carries that token where a v5 one carries its
 * uuid, so the password is the only thing telling them apart. Every client that reads TUIC hangs
 * something on this, so the rule is stated once rather than re-derived per renderer.
 */
function tuicIsV5(node) {
  return node.password !== void 0
}
/** Snell v4 and later are mihomo-era; Clash classic and Stash stop at 3, Egern at 5. */
function snellVersion(node) {
  return Number(node.version ?? 1)
}
//#endregion
//#region src/core/nodes/targets/define.ts
/**
 * The one place a target's own unit type is erased for the registry.
 *
 * The cast is here so it is nowhere else: inside a target's own file `renderNode` and `assemble` agree
 * on that client's concrete unit type and need no assertion, while the registry holds them all under
 * one contract. It also folds `Unit | Unit[] | null` down to `Unit[] | null`, so `pipeline/render.ts`
 * faces one shape instead of three.
 */
function defineTarget(spec) {
  return {
    ...spec,
    renderNode(node) {
      const rendered = spec.renderNode(node)
      if (rendered === null) return null
      return Array.isArray(rendered) ? rendered : [rendered]
    },
  }
}
//#endregion
//#region src/core/nodes/targets/shared/ciphers.ts
/** Clash classic's Shadowsocks ciphers; the 2022 series belongs to mihomo and Stash. */
const CLASH_CIPHERS = /* @__PURE__ */ new Set([
  "aes-128-cfb",
  "aes-128-ctr",
  "aes-128-gcm",
  "aes-192-cfb",
  "aes-192-ctr",
  "aes-192-gcm",
  "aes-256-cfb",
  "aes-256-ctr",
  "aes-256-gcm",
  "chacha20-ietf",
  "chacha20-ietf-poly1305",
  "rc4-md5",
  "xchacha20",
  "xchacha20-ietf-poly1305",
])
/** Egern's Shadowsocks ciphers, which are its own list rather than Clash's. */
const EGERN_CIPHERS = /* @__PURE__ */ new Set([
  "2022-blake3-aes-128-gcm",
  "2022-blake3-aes-256-gcm",
  "aes-128-cfb",
  "aes-128-ctr",
  "aes-128-gcm",
  "aes-192-cfb",
  "aes-192-ctr",
  "aes-256-cfb",
  "aes-256-ctr",
  "aes-256-gcm",
  "bf-cfb",
  "camellia-128-cfb",
  "camellia-192-cfb",
  "camellia-256-cfb",
  "cast5-cfb",
  "chacha20",
  "chacha20-ietf",
  "chacha20-ietf-poly1305",
  "chacha20-poly1305",
  "des-cfb",
  "idea-cfb",
  "none",
  "rc2-cfb",
  "rc4",
  "rc4-md5",
  "salsa20",
  "seed-cfb",
  "table",
])
/** Surge's Shadowsocks ciphers, which run wider than Clash's and include the 2022 series. */
const SURGE_CIPHERS = /* @__PURE__ */ new Set([
  "2022-blake3-aes-128-gcm",
  "2022-blake3-aes-256-gcm",
  "aes-128-cfb",
  "aes-128-ctr",
  "aes-128-gcm",
  "aes-192-cfb",
  "aes-192-ctr",
  "aes-192-gcm",
  "aes-256-cfb",
  "aes-256-ctr",
  "aes-256-gcm",
  "bf-cfb",
  "camellia-128-cfb",
  "camellia-192-cfb",
  "camellia-256-cfb",
  "cast5-cfb",
  "chacha20",
  "chacha20-ietf",
  "chacha20-ietf-poly1305",
  "des-cfb",
  "idea-cfb",
  "none",
  "rc2-cfb",
  "rc4",
  "rc4-md5",
  "salsa20",
  "seed-cfb",
  "xchacha20-ietf-poly1305",
])
/** Surfboard implements a narrower list than Surge: no `none`, and none of the rarer CFB ciphers. */
const SURFBOARD_CIPHERS = new Set(
  [...SURGE_CIPHERS].filter(
    (cipher) =>
      !["cast5-cfb", "des-cfb", "idea-cfb", "none", "rc2-cfb", "seed-cfb"].includes(cipher),
  ),
)
/** A Shadowsocks node that never said which cipher it uses is plain `none`, not an unknown one. */
function cipherOf(node) {
  return String(node.cipher ?? "none")
}
//#endregion
//#region src/core/nodes/plugins.ts
function shadowsocksPlugin(node) {
  const name = asString(node.plugin)
  if (!name) return
  const options = node["plugin-opts"] ?? {}
  const host = asString(options["obfs-host"]) ?? asString(options.host)
  const path = asString(options["obfs-uri"]) ?? asString(options.path)
  if (["obfs", "obfs-local", "simple-obfs"].includes(name))
    return {
      host,
      mode: asString(options.obfs) ?? asString(options.mode) ?? "http",
      path,
      tls: false,
      type: "obfs",
    }
  if (name.includes("v2ray"))
    return {
      host,
      mode: asString(options.mode) ?? asString(options.obfs) ?? "websocket",
      path,
      tls: options.tls === true,
      type: "v2ray",
    }
  return {
    host,
    mode: asString(options.mode) ?? asString(options.obfs),
    path,
    tls: options.tls === true,
    type: "other",
  }
}
function shadowTls(node) {
  if (asString(node.plugin) !== "shadow-tls") return
  const options = node["plugin-opts"] ?? {}
  const password = asString(options.password)
  if (!password) return
  const version = Number(options.version ?? 3)
  return {
    host: asString(options.host),
    password,
    version: Number.isInteger(version) && version > 0 ? version : 3,
  }
}
/**
 * Whether the node carries a plugin the line-format clients cannot express. Surge, Surfboard, Loon
 * and Egern write simple-obfs and Shadow-TLS and nothing else; writing such a node without its plugin
 * would hand the user a proxy that connects differently, so those renderers refuse it instead.
 */
function pluginBeyondObfs(node) {
  const plugin = shadowsocksPlugin(node)
  if (plugin === void 0 || plugin.type === "obfs") return false
  return shadowTls(node) === void 0
}
/** The `plugin=` value of a SIP002 URI, where simple-obfs keeps its original name. */
function uriPlugin(node) {
  const plugin = shadowsocksPlugin(node)
  if (!plugin) return
  if (plugin.type === "obfs")
    return [
      "simple-obfs",
      `obfs=${plugin.mode}`,
      plugin.host && `obfs-host=${plugin.host}`,
      plugin.path && `obfs-uri=${plugin.path}`,
    ]
      .filter(Boolean)
      .join(";")
  if (plugin.type === "v2ray")
    return [
      "v2ray-plugin",
      `obfs=${plugin.mode}`,
      `mode=${plugin.mode}`,
      plugin.host && `obfs-host=${plugin.host}`,
      plugin.host && `host=${plugin.host}`,
      plugin.path && `path=${plugin.path}`,
      plugin.tls && "tls",
    ]
      .filter(Boolean)
      .join(";")
  const options = node["plugin-opts"] ?? {}
  return [
    String(node.plugin),
    ...Object.entries(options).map(([key, value]) =>
      value === true ? key : `${key}=${String(value)}`,
    ),
  ].join(";")
}
/** sing-box keeps the executable's name and passes its options through as one string. */
function singBoxPlugin(node) {
  const plugin = shadowsocksPlugin(node)
  if (!plugin) return
  if (plugin.type === "obfs")
    return {
      name: "obfs-local",
      options: [
        `obfs=${plugin.mode}`,
        plugin.host && `obfs-host=${plugin.host}`,
        plugin.path && `obfs-uri=${plugin.path}`,
      ]
        .filter(Boolean)
        .join(";"),
    }
  if (plugin.type === "v2ray")
    return {
      name: "v2ray-plugin",
      options: [
        `mode=${plugin.mode}`,
        plugin.host && `host=${plugin.host}`,
        plugin.path && `path=${plugin.path}`,
        plugin.tls && "tls",
      ]
        .filter(Boolean)
        .join(";"),
    }
}
//#endregion
//#region src/core/nodes/wireguard.ts
/**
 * A WireGuard interface's own addresses, read and written.
 *
 * Its own module rather than a corner of `transport.ts`, which is where this lived: a WireGuard node
 * has no transport in this model at all — `dropUnsupportedSwitches` deletes `network` for every
 * protocol outside VMess, VLESS and Trojan — so nothing here answers a question about a stream.
 *
 * What it is instead is one shape read four ways. A source states the interface address as `address`,
 * as `ip` plus `ipv6`, as a comma-separated list, as a repeated URI parameter, or with a prefix
 * length attached; a client then wants it back as exactly one of those. The canonical node keeps the
 * halves apart — `ip`, `ipv6`, `ip-cidr`, `ipv6-cidr` — and both directions are stated here so a
 * renderer never has to reassemble them itself.
 */
function addressValues(value) {
  if (Array.isArray(value)) return value.flatMap((item) => addressValues(item))
  if (typeof value !== "string") return []
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
}
function parseAddress(value) {
  const match = /^(.*?)(?:\/(\d+))?$/.exec(value)
  const host = (match?.[1] ?? value).replaceAll(/^\[|]$/g, "")
  const ipv6 = host.includes(":")
  const max = ipv6 ? 128 : 32
  const cidr = match?.[2] == null ? void 0 : Number(match[2])
  if (!ipv6) {
    const parts = host.split(".").map(Number)
    if (
      parts.length !== 4 ||
      parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255)
    )
      return null
  }
  if (cidr != null && (!Number.isInteger(cidr) || cidr < 0 || cidr > max)) return null
  return {
    host,
    cidr,
    ipv6,
  }
}
/**
 * Takes a `DraftNode` rather than a `CanonicalNode`: a parser calls this before Parse Validation has
 * had a say, on an entry that may still be missing the fields that make it a node. Every field read
 * or written here lives on both shapes through the index signature alone.
 */
function applyWireGuardAddresses(node, value) {
  const candidates = [
    ...addressValues(value),
    ...addressValues(node.ip),
    ...addressValues(node.ipv6),
  ]
  for (const candidate of candidates) {
    const parsed = parseAddress(candidate)
    if (!parsed) continue
    if (parsed.ipv6) {
      if (typeof node.ipv6 !== "string" || node.ipv6.includes("/")) node.ipv6 = parsed.host
      if (parsed.cidr != null) node["ipv6-cidr"] = parsed.cidr
    } else {
      if (typeof node.ip !== "string" || node.ip.includes("/")) node.ip = parsed.host
      if (parsed.cidr != null) node["ip-cidr"] = parsed.cidr
    }
  }
  return node
}
function wireGuardAddresses(node) {
  const normalized = { ...node }
  applyWireGuardAddresses(normalized, normalized.address)
  const output = []
  if (typeof normalized.ip === "string" && normalized.ip)
    output.push(
      `${normalized.ip}/${Number.isInteger(normalized["ip-cidr"]) ? normalized["ip-cidr"] : 32}`,
    )
  if (typeof normalized.ipv6 === "string" && normalized.ipv6)
    output.push(
      `${normalized.ipv6}/${Number.isInteger(normalized["ipv6-cidr"]) ? normalized["ipv6-cidr"] : 128}`,
    )
  return output
}
//#endregion
//#region src/core/nodes/targets/shared/clash-family.ts
/**
 * The normalizations Clash Classic, mihomo and Stash share, and the one place each is written.
 *
 * Three YAML clients reading one schema family, each with its own list of what it implements: the
 * differences are real (Clash predates the QUIC-era protocols, Stash spells three fields its own way)
 * but the rules they *do* share are the same rules — three copies of them is how a client comes to
 * write a field the other two learned to drop.
 *
 * Every function mutates the node it is given, and each target calls the ones it needs in its own
 * order. That order is load-bearing rather than a style: the Clash-family YAML serializes in key
 * insertion order, so deleting and re-adding a key moves it, and a target's output is pinned to
 * `tests/fixtures/clients/`.
 */
/** The protocols whose schema has a `tls` key at all; the rest run over TLS by definition. */
const TLS_PROTOCOLS = /* @__PURE__ */ new Set(["vmess", "vless", "http", "socks5"])
/** The protocols whose schema has a `network` key at all; the rest have no transport to choose. */
const TRANSPORT_PROTOCOLS = /* @__PURE__ */ new Set(["vmess", "vless", "trojan"])
/** The VMess ciphers Clash and mihomo enumerate; anything else is `auto` to them. */
const CLASH_VMESS_CIPHERS = /* @__PURE__ */ new Set([
  "auto",
  "none",
  "zero",
  "aes-128-gcm",
  "chacha20-poly1305",
])
/**
 * VMess needs a cipher and an `alterId` stated as a number whatever the source said.
 *
 * `allowed` is the client's own enumeration, for the two that have one: a cipher outside it has to
 * become `auto` rather than reach the client as a value it rejects. Stash names no list and so passes
 * none — narrowing a cipher it would have accepted is how a working node comes back downgraded.
 */
function normalizeVmess(output, allowed) {
  if (output.type !== "vmess") return
  const cipher = output.cipher ?? "auto"
  output.cipher = !allowed || allowed.has(String(cipher)) ? cipher : "auto"
  output.alterId = Number(output.alterId ?? 0)
}
/**
 * Which key carries the TLS server name is a property of the protocol, not of the client: the
 * protocols named in `servernameProtocols` read `servername`, everything else reads `sni`. Writing one
 * of them everywhere leaves the other half with a name the client never looks at, so it falls back to
 * the address and the handshake goes out with the wrong SNI.
 *
 * Clash reads `servername` for VMess alone; mihomo and Stash read it for VLESS too.
 */
function moveServerName(output, servernameProtocols) {
  const server = output.servername || output.sni
  if (!server) return
  const key = servernameProtocols.includes(String(output.type)) ? "servername" : "sni"
  delete output.servername
  delete output.sni
  output[key] = server
}
/** All three read the plugin by the name of the protocol, not by the binary that implements it. */
function normalizePlugin(output) {
  const plugin = shadowsocksPlugin(output)
  if (plugin?.type === "other") {
    const options = output["plugin-opts"] ?? {}
    output.plugin = String(output.plugin)
    output["plugin-opts"] = options
    return
  }
  if (!plugin) return
  const options = { mode: plugin.mode }
  if (plugin.host) options.host = plugin.host
  if (plugin.type !== "obfs" && plugin.path) options.path = plugin.path
  if (plugin.type !== "obfs" && plugin.tls) options.tls = true
  output.plugin = plugin.type === "obfs" ? "obfs" : "v2ray-plugin"
  output["plugin-opts"] = options
}
/**
 * The switches a node carries for someone else's benefit. A Shadowsocks proxy holding `network: tcp`
 * and `tls: false` states two keys none of these clients has a field for — both stay on the canonical
 * node, because Quantumult X reads `tls` on a Shadowsocks node to write `obfs=over-tls`, so they are
 * dropped on the way out instead. Snell only learned to relay UDP in version 3; before that the
 * switch means nothing.
 */
function dropUnsupportedSwitches(output) {
  if (!TLS_PROTOCOLS.has(String(output.type))) delete output.tls
  if (!TRANSPORT_PROTOCOLS.has(String(output.type))) delete output.network
  if (output.type === "snell" && snellVersion(output) < 3) delete output.udp
}
/**
 * The gRPC stream mode is a URI-level field: all three read `grpc-opts.grpc-service-name` and nothing
 * else, so `mode` would be a key they do not know.
 */
function dropGrpcMode(output) {
  const options = output["grpc-opts"]
  if (!options || typeof options !== "object" || !("mode" in options)) return
  const { mode: _mode, ...rest } = options
  output["grpc-opts"] = rest
}
/**
 * The QUIC-era protocols reached each client with its own spelling: mihomo and Stash read TUIC's
 * congestion control as `congestion-controller` and want its ALPN as a list. The canonical node keeps
 * the names the URI used, so the translation happens here.
 *
 * Both read the TUIC version off the presence of `token` rather than off a field, so leaving a v4
 * node's token under `uuid` hands them a v5 node whose password is missing.
 */
function normalizeTuic(output) {
  if (output.type !== "tuic") return
  if (output.congestion_control !== void 0) {
    output["congestion-controller"] = output.congestion_control
    delete output.congestion_control
  }
  if (output.udp_relay_mode !== void 0) {
    output["udp-relay-mode"] = output.udp_relay_mode
    delete output.udp_relay_mode
  }
  if (output.alpn !== void 0) output.alpn = alpnList(output.alpn)
  if (tuicIsV5(output)) {
    output.version = output.version ?? 5
    return
  }
  const token = output.token ?? output.uuid
  delete output.uuid
  if (token !== void 0) output.token = token
}
/**
 * A WireGuard interface can hold several addresses, and mihomo and Stash both say so two ways: a
 * single address goes in `ip`, several in `address`. Writing both, plus the parsed-out `ip-cidr`
 * halves, leaves the client to guess which is real.
 *
 * `prefix` is the one difference between them: mihomo keeps the prefix length on the single-address
 * form, Stash takes the bare address.
 */
function normalizeWireGuardAddresses(output, prefix) {
  if (output.type !== "wireguard") return
  const addresses = wireGuardAddresses(output)
  delete output.publickey
  delete output["ip-cidr"]
  delete output["ipv6-cidr"]
  delete output.ip
  delete output.ipv6
  if (addresses.length === 1) {
    const [only] = addresses
    delete output.address
    output[only.includes(":") ? "ipv6" : "ip"] =
      prefix === "keep-prefix" ? only : only.split("/")[0]
  } else if (addresses.length > 0) output.address = addresses
}
/**
 * Neither mihomo nor Stash has an HTTPUpgrade transport: both carry one as a WebSocket the client is
 * told to upgrade over plain HTTP. `network: httpupgrade` with options of its own is a transport they
 * do not recognise, so they fall back to TCP and the connection never forms.
 */
function httpUpgradeAsWebSocket(output) {
  if (output.network !== "httpupgrade") return
  const options = output["httpupgrade-opts"] ?? {}
  const headers = { ...options.headers }
  if (options.host) headers.Host = options.host
  output.network = "ws"
  output["ws-opts"] = {
    ...(options.path === void 0 ? {} : { path: options.path }),
    ...(Object.keys(headers).length === 0 ? {} : { headers }),
    "v2ray-http-upgrade": true,
    ...(options["max-early-data"] === void 0 ? {} : { "v2ray-http-upgrade-fast-open": true }),
  }
  delete output["httpupgrade-opts"]
}
//#endregion
//#region src/core/nodes/targets/shared/public-node.ts
/** Fields starting with `_` are the core's own bookkeeping and never reach a client's config. */
function publicNode(node) {
  return Object.fromEntries(
    Object.entries(node).filter(([key, value]) => !key.startsWith("_") && value !== void 0),
  )
}
//#endregion
//#region src/core/nodes/targets/clash.ts
/**
 * Clash classic predates Reality, packet encoding and the fingerprint field entirely, and carries
 * neither the QUIC-era protocols nor WireGuard nor HTTPUpgrade. What it needs from a node is only what
 * the protocols and transports below can produce — which is why it calls the fewest of the shared
 * Clash-family rules, and why the three fields it never learned are deleted outright at the end.
 *
 * Clash reads `servername` for VMess alone; mihomo and Stash extended it to VLESS.
 */
function normalizeClash(node) {
  const output = publicNode(node)
  normalizeVmess(output, CLASH_VMESS_CIPHERS)
  moveServerName(output, ["vmess"])
  normalizePlugin(output)
  dropUnsupportedSwitches(output)
  dropGrpcMode(output)
  delete output["client-fingerprint"]
  delete output["reality-opts"]
  delete output["packet-encoding"]
  return output
}
const clashTarget = defineTarget({
  id: "clash",
  label: "Clash Classic",
  protocols: ["ss", "ssr", "vmess", "trojan", "http", "socks5", "snell"],
  transports: ["tcp", "ws", "http", "h2", "grpc"],
  notes: "Clash Classic does not support VLESS, Hysteria, TUIC, WireGuard or AnyTLS.",
  accepts: (node) =>
    (node.type !== "ss" || CLASH_CIPHERS.has(cipherOf(node))) &&
    (node.type !== "snell" || snellVersion(node) < 4),
  uniqueNames: true,
  contentType: "text/yaml; charset=utf-8",
  fileExtension: "yaml",
  renderNode: (node) => normalizeClash(node),
  assemble: (proxies) => stringify({ proxies }, { lineWidth: 0 }),
})
//#endregion
//#region src/core/nodes/targets/egern.ts
function reality(node) {
  const options = asRecord(node["reality-opts"])
  if (!options) return
  return compactRecord({
    public_key: options["public-key"],
    short_id: options["short-id"],
  })
}
function transport(node) {
  const network = String(node.network ?? "tcp")
  if (network === "ws") {
    const options = asRecord(node["ws-opts"])
    const headers = asRecord(options?.headers)
    const host = headers?.Host ?? headers?.host
    return {
      [node.tls ? "wss" : "ws"]: compactRecord({
        path: options?.path,
        headers: host === void 0 ? void 0 : { Host: host },
        sni: node.tls ? node.sni : void 0,
        reality: reality(node),
        skip_tls_verify: node.tls ? node["skip-cert-verify"] : void 0,
      }),
    }
  }
  if (network === "http" || network === "h2") {
    const options = asRecord(node[`${network}-opts`])
    const headers = asRecord(options?.headers)
    const host = firstOf(options?.host ?? headers?.Host ?? headers?.host)
    return {
      [network === "http" ? "http1" : "http2"]: compactRecord({
        method: options?.method,
        path: firstOf(options?.path),
        headers: host === void 0 ? void 0 : { Host: host },
        sni: network === "h2" ? node.sni : void 0,
        skip_tls_verify: node["skip-cert-verify"],
      }),
    }
  }
  if (network === "grpc")
    return {
      grpc: compactRecord({
        service_name: asRecord(node["grpc-opts"])?.["grpc-service-name"],
        sni: node.sni,
        reality: reality(node),
        skip_tls_verify: node["skip-cert-verify"],
      }),
    }
  if (node.tls)
    return {
      tls: compactRecord({
        sni: node.sni,
        reality: reality(node),
        skip_tls_verify: node["skip-cert-verify"],
      }),
    }
}
/**
 * Egern keys each proxy by its protocol — `- {shadowsocks: {…}}` — rather than carrying a `type`
 * field the way Clash does. A flat object with `type` inside is not a proxy Egern can read at all.
 */
function wrap(kind, fields) {
  return { [kind]: compactRecord(fields) }
}
/** Egern's gRPC is the plain `gun` stream; a multiplexed one is a connection it cannot make. */
function multiplexedGrpc(node) {
  if (String(node.network ?? "tcp") !== "grpc") return false
  const mode = asRecord(node["grpc-opts"])?.mode
  return mode !== void 0 && String(mode).toLowerCase() !== "gun"
}
function egernNode(node) {
  if (multiplexedGrpc(node)) return null
  const common = {
    name: node.name,
    server: node.server,
    port: node.port,
  }
  if (node.type === "ss") {
    if (pluginBeyondObfs(node)) return null
    const wrapper = shadowTls(node)
    if (wrapper && wrapper.version !== 3) return null
    const plugin = shadowsocksPlugin(node)
    const obfs = plugin?.type === "obfs" ? plugin : void 0
    return wrap("shadowsocks", {
      ...common,
      method: node.cipher === "chacha20-ietf-poly1305" ? "chacha20-poly1305" : node.cipher,
      password: node.password,
      udp_relay: node.udp,
      tfo: node.tfo ?? node["fast-open"],
      obfs: obfs?.mode,
      obfs_host: obfs?.host,
      obfs_uri: obfs?.path,
      shadow_tls:
        wrapper &&
        compactRecord({
          password: wrapper.password,
          sni: wrapper.host,
        }),
    })
  }
  if (node.type === "vmess")
    return wrap("vmess", {
      ...common,
      user_id: node.uuid,
      security: node.cipher ?? "auto",
      legacy: Number(node.alterId ?? 0) > 0,
      udp_relay: node.udp,
      transport: transport(node),
    })
  if (node.type === "vless")
    return wrap("vless", {
      ...common,
      user_id: node.uuid,
      flow: node.flow,
      udp_relay: node.udp,
      transport: transport(node),
    })
  if (node.type === "trojan") {
    const network = String(node.network ?? "tcp")
    if (!["tcp", "ws"].includes(network)) return null
    const options = asRecord(node["ws-opts"])
    const headers = asRecord(options?.headers)
    return wrap("trojan", {
      ...common,
      password: node.password,
      udp_relay: node.udp,
      sni: node.sni,
      skip_tls_verify: node["skip-cert-verify"],
      websocket:
        network === "ws"
          ? compactRecord({
              path: options?.path,
              host: headers?.Host ?? headers?.host,
            })
          : void 0,
    })
  }
  if (["hysteria2", "tuic", "anytls"].includes(node.type))
    return wrap(node.type, {
      ...common,
      auth: node.type === "hysteria2" ? node.password : void 0,
      uuid: node.type === "tuic" ? node.uuid : void 0,
      password: node.type === "hysteria2" ? void 0 : node.password,
      sni: node.sni,
      alpn: node.alpn === void 0 ? void 0 : [node.alpn].flat(),
      skip_tls_verify: node["skip-cert-verify"],
      udp_relay: node.type === "tuic" ? void 0 : node.udp,
    })
  if (node.type === "ssh")
    return wrap("ssh", {
      ...common,
      username: node.username,
      password: node.password,
      private_key: node["private-key"],
      tfo: node.tfo ?? node["fast-open"],
    })
  if (node.type === "snell") {
    const obfs = asRecord(node["obfs-opts"])
    return wrap("snell", {
      ...common,
      psk: node.psk ?? node.password,
      version: node.version,
      udp_relay: snellVersion(node) >= 3 ? node.udp : void 0,
      reuse: node.reuse,
      obfs: obfs?.mode ?? node.obfs,
      obfs_host: obfs?.host ?? node["obfs-host"],
      tfo: node.tfo ?? node["fast-open"],
    })
  }
  if (node.type === "http" || node.type === "socks5")
    return wrap(node.type === "http" && node.tls ? "https" : node.type, {
      ...common,
      username: node.username,
      password: node.password,
      udp_relay: node.type === "socks5" ? node.udp : void 0,
      sni: node.tls ? node.sni : void 0,
      skip_tls_verify: node.tls ? node["skip-cert-verify"] : void 0,
    })
  return null
}
const egernTarget = defineTarget({
  id: "egern",
  label: "Egern",
  protocols: [
    "ss",
    "vmess",
    "vless",
    "trojan",
    "hysteria2",
    "tuic",
    "anytls",
    "http",
    "socks5",
    "snell",
    "ssh",
  ],
  transports: ["tcp", "ws", "http", "h2", "grpc"],
  accepts: (node) =>
    (node.type !== "ss" || EGERN_CIPHERS.has(cipherOf(node))) &&
    (node.type !== "snell" || snellVersion(node) <= 5) &&
    (node.type !== "tuic" || tuicIsV5(node)),
  uniqueNames: true,
  contentType: "text/yaml; charset=utf-8",
  fileExtension: "yaml",
  renderNode: (node) => egernNode(node),
  assemble: (proxies) => stringify({ proxies }, { lineWidth: 0 }),
})
//#endregion
//#region src/core/nodes/targets/json.ts
/**
 * The canonical model itself, serialized. Not a client: it is what the extract API answers with and
 * what a caller feeds back in, so it carries every node unchanged and refuses nothing.
 */
const jsonTarget = defineTarget({
  id: "json",
  label: "Canonical JSON",
  protocols: "all",
  transports: "all",
  selectable: false,
  uniqueNames: false,
  contentType: "application/json; charset=utf-8",
  fileExtension: "json",
  renderNode: (node) => publicNode(node),
  assemble: (nodes) => JSON.stringify(nodes, null, 2),
})
//#endregion
//#region src/core/nodes/targets/shared/node-line.ts
/**
 * The kit every line-format client is written with. A node line is positional and separator
 * delimited, so most of this is about getting a value onto one safely: normalising it, quoting it the
 * way that client quotes, and refusing it when the separator itself is inside it.
 */
function value$1(input) {
  return input === void 0 || input === null ? "" : String(input).replaceAll(/[\r\n]/g, " ")
}
/** `host:port`, with an IPv6 literal bracketed. Also what `uri-node.ts` writes an authority with. */
function endpoint$1(node) {
  return `${node.server.includes(":") ? `[${node.server}]` : node.server}:${node.port}`
}
function parameter(name, input) {
  return input === void 0 || input === null || input === "" ? null : `${name}=${value$1(input)}`
}
function parameters(entries) {
  return entries.flatMap(([name, input]) => {
    const output = parameter(name, input)
    return output ? [output] : []
  })
}
function wsOptions(node) {
  const options = asRecord(node["ws-opts"])
  const headers = asRecord(options?.headers)
  return {
    path: options?.path,
    host: headers?.Host ?? headers?.host,
    headers,
  }
}
/** The simple-obfs part of a node's plugin, which is the only part an obfs field may come from. */
function obfsOf(node) {
  const plugin = shadowsocksPlugin(node)
  return plugin?.type === "obfs" ? plugin : void 0
}
/** The path and host of whichever transport the node uses, wherever that client keeps them. */
function streamOptions(node, network) {
  if (network === "ws") {
    const ws = wsOptions(node)
    return {
      path: ws.path,
      host: ws.host,
    }
  }
  if (network === "http") {
    const options = asRecord(node["http-opts"])
    const headers = asRecord(options?.headers)
    return {
      path: firstOf(options?.path),
      host: firstOf(headers?.Host ?? headers?.host),
    }
  }
  return {
    path: void 0,
    host: void 0,
  }
}
function headerList(input) {
  if (!input) return
  return (
    Object.entries(input)
      .map(([key, item]) => `${key}:${value$1(item)}`)
      .join("|") || void 0
  )
}
function quoted(input) {
  return `"${value$1(input).replaceAll("\\", "\\\\").replaceAll('"', '\\"')}"`
}
/**
 * Surge strips one surrounding quote pair and reads what is between it literally — it has no escape
 * sequence, so a quote inside the value has to travel as itself.
 */
function wrapped(input) {
  return `"${value$1(input)}"`
}
/**
 * The fields a node line writes verbatim. A line format has no escape for its own separator, so a
 * credential holding one cannot be written: Surge and Quantumult X read a value as "everything up to
 * the next comma", Loon as "everything up to the next quote". Writing it anyway produces a line the
 * client mis-reads — a truncated password, or the following parameters swallowed into it.
 */
const CREDENTIALS = ["password", "psk", "username", "uuid", "token", "private-key", "obfs-password"]
function credentialsFit(node, forbidden) {
  return CREDENTIALS.every((key) => !forbidden.test(String(node[key] ?? "")))
}
function policyName(node) {
  return value$1(node.name).replaceAll(/[=,]/g, " ").trim() || `${node.type}-${node.port}`
}
//#endregion
//#region src/core/nodes/targets/loon.ts
function loonTlsParameters(node) {
  const reality = asRecord(node["reality-opts"])
  return parameters([
    ["over-tls", node.tls],
    [reality ? "sni" : "tls-name", node.sni],
    ["skip-cert-verify", node.tls ? node["skip-cert-verify"] === true : null],
    ["alpn", node.tls && node.alpn !== void 0 ? quoted(alpnList(node.alpn)?.join(",")) : null],
    ["tls-profile", node["client-fingerprint"]],
    ["public-key", reality ? quoted(reality["public-key"]) : null],
    ["short-id", reality ? reality["short-id"] : null],
  ])
}
function loonNode(node) {
  if (!credentialsFit(node, /"/)) return null
  const network = value$1(node.network || "tcp")
  const stream = streamOptions(node, network)
  let parts
  switch (node.type) {
    case "ss": {
      if (network !== "tcp" || pluginBeyondObfs(node)) return null
      const wrapper = shadowTls(node)
      if (wrapper && wrapper.version < 2) return null
      const plugin = shadowsocksPlugin(node)
      parts = ["shadowsocks", node.server, node.port, value$1(node.cipher), quoted(node.password)]
      if (plugin?.type === "obfs")
        parts.push(
          ...parameters([
            ["obfs-name", plugin.mode],
            ["obfs-host", plugin.host],
          ]),
        )
      parts.push(
        ...parameters([
          ["shadow-tls-password", wrapper?.password],
          ["shadow-tls-sni", wrapper?.host],
          ["shadow-tls-version", wrapper?.version],
        ]),
      )
      break
    }
    case "ssr":
      if (network !== "tcp") return null
      parts = [
        "shadowsocksr",
        node.server,
        node.port,
        value$1(node.cipher),
        quoted(node.password),
        ...parameters([
          ["protocol", node.protocol],
          ["protocol-param", node["protocol-param"]],
          ["obfs", node.obfs],
          ["obfs-param", node["obfs-param"]],
        ]),
      ]
      break
    case "vmess":
      if (!["tcp", "ws", "http"].includes(network)) return null
      parts = [
        "vmess",
        node.server,
        node.port,
        value$1(node.cipher ?? "auto"),
        quoted(node.uuid),
        ...parameters([
          ["alterId", Number(node.alterId ?? 0)],
          ["transport", network],
          ["path", stream.path],
          ["host", stream.host],
        ]),
        ...loonTlsParameters(node),
      ]
      break
    case "trojan":
      if (!["tcp", "ws"].includes(network)) return null
      parts = [
        "trojan",
        node.server,
        node.port,
        quoted(node.password),
        ...parameters([
          ["transport", network],
          ["path", stream.path],
          ["host", stream.host],
        ]),
        ...loonTlsParameters(node),
      ]
      break
    case "vless":
      if (!["tcp", "ws", "http"].includes(network)) return null
      parts = [
        "vless",
        node.server,
        node.port,
        quoted(node.uuid),
        ...parameters([
          ["transport", network],
          ["path", stream.path],
          ["host", stream.host],
          ["flow", node.flow],
        ]),
        ...loonTlsParameters(node),
      ]
      break
    case "hysteria2":
      parts = [
        "Hysteria2",
        node.server,
        node.port,
        quoted(node.password),
        ...parameters([
          ["tls-name", node.sni],
          ["skip-cert-verify", node["skip-cert-verify"]],
          ["obfs", node.obfs],
          ["obfs-password", node["obfs-password"]],
        ]),
      ]
      break
    case "anytls":
      parts = ["anytls", node.server, node.port, quoted(node.password), ...loonTlsParameters(node)]
      break
    case "http":
      if (network !== "tcp") return null
      parts = [
        node.tls ? "https" : "http",
        node.server,
        node.port,
        value$1(node.username),
        quoted(node.password),
      ]
      break
    case "socks5":
      parts = ["socks5", node.server, node.port, value$1(node.username), quoted(node.password)]
      break
    case "wireguard": {
      const addresses = wireGuardAddresses(node)
      const peer = [
        `public-key=${quoted(node["public-key"])}`,
        `allowed-ips=${quoted(node["allowed-ips"] ?? node.allowed_ips ?? "0.0.0.0/0,::/0")}`,
        node["pre-shared-key"] ? `pre-shared-key=${quoted(node["pre-shared-key"])}` : void 0,
        `endpoint=${node.server}:${node.port}`,
      ].filter(Boolean)
      parts = [
        "wireguard",
        ...parameters([
          ["interface-ip", addresses.length === 1 ? addresses[0].split("/")[0] : void 0],
          ["private-key", quoted(node["private-key"])],
          ["mtu", node.mtu],
        ]),
        `peers=[{${peer.join(",")}}]`,
      ]
      break
    }
    default:
      return null
  }
  const udp =
    node.udp === true && !["http", "wireguard"].includes(String(node.type))
      ? parameters([["udp", true]])
      : []
  return `${policyName(node)} = ${[...parts, ...udp].join(", ")}`
}
const loonTarget = defineTarget({
  id: "loon",
  label: "Loon",
  protocols: [
    "ss",
    "ssr",
    "vmess",
    "vless",
    "trojan",
    "hysteria2",
    "anytls",
    "http",
    "socks5",
    "wireguard",
  ],
  transports: ["tcp", "ws", "http"],
  uniqueNames: true,
  renderedName: policyName,
  contentType: "text/plain; charset=utf-8",
  fileExtension: "conf",
  renderNode: loonNode,
  assemble: (lines) => lines.join("\n"),
})
//#endregion
//#region src/core/nodes/targets/mihomo.ts
function normalizeMihomo(node) {
  const output = publicNode(node)
  normalizeVmess(output, CLASH_VMESS_CIPHERS)
  moveServerName(output, ["vmess", "vless"])
  normalizePlugin(output)
  dropUnsupportedSwitches(output)
  if (output.type === "hysteria" && output.alpn !== void 0) output.alpn = alpnList(output.alpn)
  if (output.type === "hysteria2") delete output.username
  normalizeTuic(output)
  normalizeWireGuardAddresses(output, "keep-prefix")
  httpUpgradeAsWebSocket(output)
  dropGrpcMode(output)
  return output
}
/** The reference YAML client: it carries everything the canonical model can express. */
const mihomoTarget = defineTarget({
  id: "mihomo",
  label: "Mihomo",
  protocols: "all",
  transports: "all",
  uniqueNames: true,
  contentType: "text/yaml; charset=utf-8",
  fileExtension: "yaml",
  renderNode: (node) => normalizeMihomo(node),
  assemble: (proxies) => stringify({ proxies }, { lineWidth: 0 }),
})
//#endregion
//#region src/core/nodes/targets/quantumult-x.ts
function commonQuantumultXParameters(node) {
  const reality = asRecord(node["reality-opts"])
  const network = value$1(node.network || "tcp")
  const stream = streamOptions(node, network)
  const obfs =
    network === "ws"
      ? node.tls
        ? "wss"
        : "ws"
      : network === "http"
        ? "http"
        : node.tls && ["ss", "vmess", "vless"].includes(node.type)
          ? "over-tls"
          : null
  const overTls = node.tls && !obfs && ["trojan", "anytls", "http", "socks5"].includes(node.type)
  return parameters([
    ["obfs", obfs],
    ["obfs-host", network === "ws" ? (stream.host ?? node.sni) : (stream.host ?? null)],
    ["obfs-uri", stream.path],
    ["over-tls", overTls ? true : null],
    ["tls-host", node.tls ? node.sni : null],
    ["tls-verification", node.tls ? !node["skip-cert-verify"] : null],
    ["reality-base64-pubkey", reality?.["public-key"]],
    ["reality-hex-shortid", reality?.["short-id"]],
    ["udp-relay", node.udp ?? false],
  ])
}
function quantumultXNode(node) {
  const network = value$1(node.network || "tcp")
  if (!["tcp", "ws", "http"].includes(network)) return null
  if (!credentialsFit(node, /,/)) return null
  const base = `${endpoint$1(node)}`
  const common = commonQuantumultXParameters(node)
  let protocol
  let specific
  switch (node.type) {
    case "ss": {
      const plugin = shadowsocksPlugin(node)
      const obfs =
        plugin?.type === "obfs"
          ? plugin.mode
          : plugin?.mode === "websocket"
            ? plugin.tls
              ? "wss"
              : "ws"
            : void 0
      if (plugin && obfs === void 0) return null
      protocol = "shadowsocks"
      specific = parameters([
        ["method", node.cipher],
        ["password", node.password],
        ["obfs", obfs],
        ["obfs-host", plugin?.host],
        ["obfs-uri", plugin?.path],
      ])
      break
    }
    case "ssr":
      protocol = "shadowsocks"
      specific = parameters([
        ["method", node.cipher],
        ["password", node.password],
        ["ssr-protocol", node.protocol],
        ["ssr-protocol-param", node["protocol-param"]],
        ["obfs", node.obfs],
        ["obfs-host", node["obfs-param"]],
      ])
      break
    case "vmess":
      protocol = "vmess"
      specific = parameters([
        ["method", !node.cipher || node.cipher === "auto" ? "chacha20-poly1305" : node.cipher],
        ["password", node.uuid],
        ["aead", Number(node.alterId ?? 0) === 0],
      ])
      break
    case "vless":
      protocol = "vless"
      specific = parameters([
        ["method", "none"],
        ["password", node.uuid],
        ["vless-flow", node.flow],
      ])
      break
    case "trojan":
      protocol = "trojan"
      specific = parameters([["password", node.password]])
      break
    case "anytls":
      protocol = "anytls"
      specific = parameters([["password", node.password]])
      break
    case "http":
    case "socks5":
      protocol = node.type
      specific = parameters([
        ["username", node.username],
        ["password", node.password],
      ])
      break
    default:
      return null
  }
  return `${protocol}=${[base, ...specific, ...common, `tag=${policyName(node)}`].join(", ")}`
}
const quantumultXTarget = defineTarget({
  id: "quantumult-x",
  label: "Quantumult X",
  protocols: ["ss", "ssr", "vmess", "vless", "trojan", "anytls", "http", "socks5"],
  transports: ["tcp", "ws", "http"],
  uniqueNames: true,
  renderedName: policyName,
  contentType: "text/plain; charset=utf-8",
  fileExtension: "conf",
  renderNode: quantumultXNode,
  assemble: (lines) => lines.join("\n"),
})
//#endregion
//#region src/core/nodes/base64.ts
function normalizeBase64(value) {
  const normalized = value.replaceAll(/\s+/g, "").replaceAll("-", "+").replaceAll("_", "/")
  return normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=")
}
function decodeBase64(value) {
  const binary = atob(normalizeBase64(value))
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}
function encodeBase64(value, urlSafe = false) {
  const bytes = new TextEncoder().encode(value)
  let binary = ""
  for (const byte of bytes) binary += String.fromCharCode(byte)
  const encoded = btoa(binary)
  return urlSafe
    ? encoded.replaceAll("+", "-").replaceAll("/", "_").replaceAll(/=+$/g, "")
    : encoded
}
function maybeDecodeBase64(value) {
  const compact = value.trim().replaceAll(/\s+/g, "")
  if (!compact || compact.length < 8 || !/^[A-Za-z0-9+/_=-]+$/.test(compact)) return null
  try {
    const decoded = decodeBase64(compact).trim()
    return /(?:^|\n)(?:ss|ssr|vmess|vless|trojan|hysteria2?|hy2|tuic|wireguard|wg|anytls|socks5?|https?):\/\//m.test(
      decoded,
    ) || /(?:^|\n)(?:proxies\s*:|[^\n=]+\s*=\s*[^\n,]+,)/m.test(decoded)
      ? decoded
      : null
  } catch {
    return null
  }
}
//#endregion
//#region src/core/nodes/transport.ts
/**
 * The stream a proxy runs over, and the one field of the handshake that is read off it.
 *
 * Narrow on purpose. This module had grown to hold WireGuard's interface addresses, TUIC's version
 * rule and an ALPN coercion as well — three subjects that answer nothing about a transport, and that
 * arrived because the boundary was never written down. They are now `wireguard.ts`, `protocols.ts`
 * and `values.ts`'s. What belongs here is what a WebSocket or HTTPUpgrade transport carries in its
 * path, which every reader has to take apart and every writer has to put back.
 *
 * `effectiveSni` stays despite being a TLS question, because it is one answered out of the transport
 * options: the server name a node presents falls back to the transport `Host`, so the rule cannot be
 * stated without reading `ws-opts` and `httpupgrade-opts`.
 */
function safeEarlyData(value) {
  if (value == null || value === "") return
  const parsed = Number(value)
  return Number.isSafeInteger(parsed) && parsed >= 0 ? parsed : void 0
}
/**
 * A transport path carries a query and a fragment of its own, and `ed` rides in that query. Both
 * functions below have to take one apart and put it back together, so the taking apart is written
 * once: two copies is how the reader and the writer came to disagree about where a fragment goes.
 */
function splitPath(value) {
  const hashIndex = value.indexOf("#")
  const fragment = hashIndex === -1 ? "" : value.slice(hashIndex)
  const withoutFragment = hashIndex === -1 ? value : value.slice(0, hashIndex)
  const queryIndex = withoutFragment.indexOf("?")
  return {
    pathname: queryIndex === -1 ? withoutFragment : withoutFragment.slice(0, queryIndex),
    params: new URLSearchParams(queryIndex === -1 ? "" : withoutFragment.slice(queryIndex + 1)),
    fragment,
  }
}
function joinPath({ fragment, params, pathname }) {
  const query = params.toString()
  return `${pathname || "/"}${query ? `?${query}` : ""}${fragment}`
}
function extractEarlyData(pathValue, explicitValue) {
  const split = splitPath(typeof pathValue === "string" && pathValue ? pathValue : "/")
  const maxEarlyData = safeEarlyData(explicitValue) ?? safeEarlyData(split.params.get("ed"))
  split.params.delete("ed")
  return {
    path: joinPath(split),
    maxEarlyData,
  }
}
function pathWithEarlyData(pathValue, maxEarlyData) {
  const extracted = extractEarlyData(pathValue)
  const parsed = safeEarlyData(maxEarlyData)
  if (parsed == null) return extracted.path
  const split = splitPath(extracted.path)
  split.params.set("ed", String(parsed))
  return joinPath(split)
}
/**
 * The TLS server name a node will actually present. A source that names no SNI but routes through a
 * CDN host still has one: every client falls back to the transport `Host`, so leaving it unstated
 * leaves each client guessing, and the ones that guess the address fail the handshake.
 */
function effectiveSni(node) {
  if (!node.tls) return
  const explicit = node.sni ?? node.servername
  if (typeof explicit === "string" && explicit) return explicit
  const options = node["ws-opts"] ?? node["httpupgrade-opts"]
  const headers = options?.headers ?? {}
  const host = options?.host ?? headers.Host ?? headers.host
  if (typeof host !== "string" || !host) return
  if (/^[\d.]+$/.test(host) || host.includes(":")) return
  return host
}
//#endregion
//#region src/core/nodes/targets/shared/uri-node.ts
/**
 * The protocols `renderUriNode` has a spelling for, and what every target that serves a URI list
 * declares. One list rather than three: it is a claim about the switch below, so a protocol added
 * there and forgotten here is one no URI target will carry.
 *
 * None of those targets sets `uniqueNames`: a URI carries its own name in its fragment and clients
 * read the list as given, so nothing is renumbered.
 */
const URI_PROTOCOLS = [
  "ss",
  "ssr",
  "vmess",
  "vless",
  "trojan",
  "hysteria",
  "hysteria2",
  "tuic",
  "wireguard",
  "anytls",
  "http",
  "socks5",
]
function queryString(entries) {
  const params = new URLSearchParams()
  for (const [key, value] of entries)
    if (Array.isArray(value)) for (const item of value) params.append(key, String(item))
    else if (value !== void 0 && value !== null && value !== "")
      params.set(key, typeof value === "object" ? JSON.stringify(value) : String(value))
  const query = params.toString()
  return query ? `?${query}` : ""
}
function renderUriNode(node) {
  const name = `#${encodeURIComponent(node.name)}`
  switch (node.type) {
    case "ss":
      return `ss://${String(node.cipher).startsWith("2022-blake3-") ? `${encodeURIComponent(String(node.cipher))}:${encodeURIComponent(String(node.password ?? ""))}` : encodeBase64(`${node.cipher}:${node.password}`)}@${endpoint$1(node)}${queryString([["plugin", uriPlugin(node)]])}${name}`
    case "ssr": {
      const password = encodeBase64(String(node.password ?? ""), true)
      const query = queryString([
        ["remarks", encodeBase64(node.name, true)],
        [
          "protoparam",
          node["protocol-param"] ? encodeBase64(String(node["protocol-param"]), true) : null,
        ],
        ["obfsparam", node["obfs-param"] ? encodeBase64(String(node["obfs-param"]), true) : null],
      ])
      return `ssr://${encodeBase64(`${endpoint$1(node)}:${node.protocol}:${node.cipher}:${node.obfs}:${password}/${query}`, true)}`
    }
    case "vmess": {
      const ws = asRecord(node["ws-opts"])
      const headers = asRecord(ws?.headers)
      const network = String(node.network ?? "tcp")
      const grpc = asRecord(node["grpc-opts"])
      const options = asRecord(node[`${network}-opts`])
      const transportHeaders = asRecord(options?.headers) ?? headers
      const transportHost =
        transportHeaders?.Host ?? transportHeaders?.host ?? options?.host ?? headers?.Host
      const transportPath =
        network === "ws"
          ? pathWithEarlyData(ws?.path, ws?.["max-early-data"])
          : network === "grpc"
            ? grpc?.["grpc-service-name"]
            : options?.path
      return `vmess://${encodeBase64(
        JSON.stringify({
          v: "2",
          ps: node.name,
          add: node.server,
          port: String(node.port),
          id: node.uuid,
          aid: String(node.alterId ?? 0),
          scy: node.cipher ?? "auto",
          net: network === "http" ? "tcp" : network,
          type: network === "http" ? "http" : network === "grpc" ? (grpc?.mode ?? "gun") : void 0,
          host: Array.isArray(transportHost) ? transportHost[0] : transportHost,
          path: Array.isArray(transportPath) ? transportPath[0] : transportPath,
          eh: ws?.["early-data-header-name"],
          tls: node.tls ? "tls" : "",
          sni: node.sni,
          fp: node["client-fingerprint"],
        }),
      )}`
    }
    case "vless":
    case "trojan": {
      const ws = asRecord(node["ws-opts"])
      const headers = asRecord(ws?.headers)
      const grpc = asRecord(node["grpc-opts"])
      const reality = asRecord(node["reality-opts"])
      const options = asRecord(node[`${String(node.network)}-opts`])
      const query = queryString([
        [
          "security",
          reality ? "reality" : node.type === "trojan" ? void 0 : node.tls ? "tls" : "none",
        ],
        ["encryption", node.type === "vless" ? node.encryption : void 0],
        ["type", node.network ?? "tcp"],
        ["sni", node.sni],
        ["fp", node["client-fingerprint"]],
        ["alpn", alpnList(node.alpn)?.join(",")],
        ["allowInsecure", node["skip-cert-verify"] ? 1 : void 0],
        ["flow", node.flow],
        ["host", headers?.Host ?? headers?.host ?? options?.host],
        [
          "path",
          ["ws", "httpupgrade"].includes(String(node.network))
            ? pathWithEarlyData(
                ws?.path ?? options?.path,
                ws?.["max-early-data"] ?? options?.["max-early-data"],
              )
            : (ws?.path ?? options?.path),
        ],
        ["eh", ws?.["early-data-header-name"] ?? options?.["early-data-header-name"]],
        ["serviceName", grpc?.["grpc-service-name"]],
        ["mode", options?.mode ?? grpc?.mode ?? (node.network === "grpc" ? "gun" : void 0)],
        ["extra", options?.extra],
        ["pbk", reality?.["public-key"]],
        ["sid", reality?.["short-id"]],
        ["spx", reality?.["spider-x"]],
      ])
      const credential = node.type === "vless" ? node.uuid : node.password
      return `${node.type}://${encodeURIComponent(String(credential ?? ""))}@${endpoint$1(node)}${query}${name}`
    }
    case "hysteria":
      return `hysteria://${endpoint$1(node)}${queryString([
        ["protocol", node.protocol],
        ["auth", node["auth-str"]],
        ["peer", node.sni],
        ["insecure", node["skip-cert-verify"] ? 1 : void 0],
        ["upmbps", node.up],
        ["downmbps", node.down],
        ["alpn", alpnList(node.alpn)?.join(",")],
        ["obfs", node.obfs],
        ["udp", node.udp],
      ])}${name}`
    case "hysteria2":
      return `hysteria2://${encodeURIComponent(String(node.password ?? ""))}@${endpoint$1(node)}${queryString(
        [
          ["sni", node.sni],
          ["insecure", node["skip-cert-verify"] ? 1 : void 0],
          ["obfs", node.obfs],
          ["obfs-password", node["obfs-password"]],
        ],
      )}${name}`
    case "tuic":
      return `tuic://${encodeURIComponent(String(node.uuid ?? node.token ?? ""))}:${encodeURIComponent(String(node.password ?? ""))}@${endpoint$1(node)}${queryString(
        [
          ["sni", node.sni],
          ["congestion_control", node["congestion-controller"] ?? node.congestion_control],
          ["alpn", alpnList(node.alpn)?.join(",")],
          ["udp_relay_mode", node["udp-relay-mode"] ?? node.udp_relay_mode],
          ["udp", node.udp],
          ["allow_insecure", node["skip-cert-verify"]],
        ],
      )}${name}`
    case "wireguard": {
      const addresses = wireGuardAddresses(node)
      return `wireguard://${encodeURIComponent(String(node["private-key"] ?? ""))}@${endpoint$1(node)}${queryString(
        [
          ["publickey", node["public-key"]],
          ["presharedkey", node["pre-shared-key"]],
          ["address", addresses.length > 0 ? addresses.join(",") : node.address],
          ["reserved", node.reserved],
          ["mtu", node.mtu],
          ["udp", node.udp ? 1 : void 0],
        ],
      )}${name}`
    }
    case "socks5":
      return `socks://${node.username ? `${encodeBase64(`${String(node.username)}:${String(node.password ?? "")}`)}@` : ""}${endpoint$1(node)}${name}`
    case "http":
      return `${node.tls ? "https" : "http"}://${node.username ? `${encodeURIComponent(String(node.username))}:${encodeURIComponent(String(node.password ?? ""))}@` : ""}${endpoint$1(node)}${name}`
    case "anytls":
      return `anytls://${encodeURIComponent(String(node.password ?? ""))}@${endpoint$1(node)}${queryString(
        [
          ["sni", node.sni],
          ["insecure", node["skip-cert-verify"] ? 1 : void 0],
        ],
      )}${name}`
    default:
      return null
  }
}
//#endregion
//#region src/core/nodes/targets/shadowrocket.ts
/**
 * A Shadowrocket subscription link serves the URI list, Base64 encoded as a whole — the same format
 * V2Ray subscribes to. The YAML and Surge-style documents Shadowrocket also reads are config files a
 * user imports by hand, not what sits behind a subscription URL.
 *
 * Snell and SSH go with the format: Shadowrocket runs both, but neither has a URI spelling.
 */
const shadowrocketTarget = defineTarget({
  id: "shadowrocket",
  label: "Shadowrocket",
  protocols: URI_PROTOCOLS,
  transports: "all",
  notes: "Writes a Base64-encoded list of protocol URIs, not a YAML configuration.",
  uniqueNames: false,
  contentType: "text/plain; charset=utf-8",
  fileExtension: "txt",
  renderNode: (node) => renderUriNode(node),
  assemble: (lines) => encodeBase64(lines.join("\n")),
})
//#endregion
//#region src/core/nodes/targets/sing-box.ts
const TYPE_FROM_CANONICAL$1 = {
  ss: "shadowsocks",
  socks5: "socks",
}
function renderPluginOptions(value) {
  const options = asRecord(value)
  if (!options) return
  return Object.entries(options)
    .map(([key, item]) => (item === true ? key : `${key}=${String(item)}`))
    .join(";")
}
function omitHost(headers) {
  const rest = Object.fromEntries(
    Object.entries(headers).filter(([key]) => key.toLowerCase() !== "host"),
  )
  return Object.keys(rest).length > 0 ? rest : void 0
}
function renderTransport(node) {
  const network = asString(node.network)
  if (!network || network === "tcp") return
  if (network === "ws" || network === "websocket") {
    const options = asRecord(node["ws-opts"])
    return compactRecord({
      type: "ws",
      path: asString(options?.path),
      headers: asRecord(options?.headers),
      max_early_data: options?.["max-early-data"],
      early_data_header_name: asString(options?.["early-data-header-name"]),
    })
  }
  if (network === "grpc") {
    const options = asRecord(node["grpc-opts"])
    return compactRecord({
      type: "grpc",
      service_name: asString(options?.["grpc-service-name"]),
      idle_timeout: asString(options?.["idle-timeout"]),
      ping_timeout: asString(options?.["ping-timeout"]),
      permit_without_stream: asBoolean(options?.["permit-without-stream"]),
    })
  }
  if (network === "http" || network === "h2") {
    const options = asRecord(node[`${network}-opts`])
    const headers = asRecord(options?.headers)
    return compactRecord({
      type: "http",
      host: stringArray(options?.host ?? headers?.Host ?? headers?.host),
      path: asString(firstOf(options?.path)),
      method: asString(options?.method),
      headers: headers && omitHost(headers),
    })
  }
  if (network === "httpupgrade") {
    const options = asRecord(node["httpupgrade-opts"])
    return compactRecord({
      type: "httpupgrade",
      host: asString(options?.host),
      path: asString(options?.path),
      headers: asRecord(options?.headers),
    })
  }
  if (network === "quic") return { type: "quic" }
}
function renderSingBoxTls(node) {
  const reality = asRecord(node["reality-opts"])
  if (!node.tls && !reality) return void 0
  const fingerprint = asString(node["client-fingerprint"])
  return compactRecord({
    enabled: true,
    server_name: asString(node.sni),
    insecure: asBoolean(node["skip-cert-verify"]),
    alpn: stringArray(node.alpn),
    utls: fingerprint
      ? {
          enabled: true,
          fingerprint,
        }
      : void 0,
    reality: reality
      ? compactRecord({
          enabled: true,
          public_key: asString(reality["public-key"]),
          short_id: asString(reality["short-id"]),
        })
      : void 0,
  })
}
function renderOutbound$1(node) {
  if (node.type === "ss" && node.plugin && !singBoxPlugin(node) && !shadowTls(node)) return null
  if (node.type === "tuic" && !tuicIsV5(node)) return null
  const base = {
    type: TYPE_FROM_CANONICAL$1[node.type] ?? node.type,
    tag: node.name,
    server: node.server,
    server_port: node.port,
  }
  if (node.type === "ss") {
    const wrapper = shadowTls(node)
    if (wrapper) {
      delete base.server
      delete base.server_port
      base.detour = shadowTlsTag(node)
    }
    Object.assign(base, {
      method: asString(node.cipher),
      password: asString(node.password),
      plugin: wrapper ? void 0 : (singBoxPlugin(node)?.name ?? asString(node.plugin)),
      plugin_opts: wrapper
        ? void 0
        : (singBoxPlugin(node)?.options ?? renderPluginOptions(node["plugin-opts"])),
    })
  } else if (node.type === "socks5" || node.type === "http")
    Object.assign(base, {
      username: asString(node.username),
      password: asString(node.password),
      ...(node.type === "socks5" ? { version: "5" } : {}),
    })
  else if (node.type === "vmess")
    Object.assign(base, {
      uuid: asString(node.uuid),
      security: asString(node.cipher) ?? "auto",
      alter_id: node.alterId,
      packet_encoding: asString(node["packet-encoding"]),
    })
  else if (node.type === "vless")
    Object.assign(base, {
      uuid: asString(node.uuid),
      flow: asString(node.flow),
      packet_encoding: asString(node["packet-encoding"]),
    })
  else if (["trojan", "hysteria2", "tuic", "anytls"].includes(node.type))
    base.password = asString(node.password)
  else if (node.type === "hysteria")
    Object.assign(base, {
      auth_str: asString(node["auth-str"] ?? node.password),
      obfs: asString(node.obfs),
      up_mbps: asMegabits(node.up),
      down_mbps: asMegabits(node.down),
    })
  else if (node.type === "ssh")
    Object.assign(base, {
      user: asString(node.username),
      password: asString(node.password),
      private_key: asString(node["private-key"]),
    })
  else if (node.type === "wireguard")
    Object.assign(base, {
      private_key: asString(node["private-key"]),
      peer_public_key: asString(node["public-key"]),
      pre_shared_key: asString(node["pre-shared-key"]),
      local_address: wireGuardAddresses(node),
      reserved: node.reserved,
      mtu: node.mtu,
    })
  if (node.type === "hysteria2") {
    base.obfs = node.obfs
      ? compactRecord({
          type: asString(node.obfs),
          password: asString(node["obfs-password"]),
        })
      : void 0
    base.up_mbps = asMegabits(node.up)
    base.down_mbps = asMegabits(node.down)
  } else if (node.type === "tuic")
    Object.assign(base, {
      uuid: asString(node.uuid),
      congestion_control: asString(node["congestion-controller"] ?? node.congestion_control),
      udp_relay_mode: asString(node["udp-relay-mode"] ?? node.udp_relay_mode),
      zero_rtt_handshake: asBoolean(node["zero-rtt"]),
    })
  if (node.udp === false && !["http", "ssh", "anytls"].includes(node.type)) base.network = "tcp"
  if (node.type !== "wireguard") {
    base.tls = renderSingBoxTls(node)
    base.transport = renderTransport(node)
  }
  return compactRecord(base)
}
function shadowTlsTag(node) {
  return `${node.name}_shadowtls`
}
/**
 * Shadow-TLS is an outbound of its own in sing-box: it owns the address and the fake handshake, and
 * the proxy that runs over it reaches it through `detour`.
 */
function renderShadowTlsOutbound(node) {
  const wrapper = shadowTls(node)
  if (!wrapper) return null
  return compactRecord({
    type: "shadowtls",
    tag: shadowTlsTag(node),
    server: node.server,
    server_port: node.port,
    version: wrapper.version,
    password: wrapper.password,
    tls: compactRecord({
      enabled: true,
      server_name: wrapper.host,
    }),
  })
}
/**
 * A WireGuard endpoint as sing-box 1.11 and later describe one: the interface holds the addresses
 * and the private key, and the far side is a peer with its own allowed routes.
 */
function renderWireGuardEndpoint(node) {
  if (!node.server || !node.port) return null
  const allowed = node["allowed-ips"] ?? node.allowed_ips
  return {
    type: "wireguard",
    tag: node.name,
    address: wireGuardAddresses(node),
    private_key: asString(node["private-key"]),
    mtu: node.mtu,
    peers: [
      {
        address: node.server,
        port: node.port,
        public_key: asString(node["public-key"]),
        pre_shared_key: asString(node["pre-shared-key"]),
        allowed_ips:
          allowed === void 0
            ? ["0.0.0.0/0", "::/0"]
            : String(allowed)
                .split(",")
                .map((entry) => entry.trim())
                .filter(Boolean),
        reserved: node.reserved,
      },
    ],
  }
}
const singBoxTarget = defineTarget({
  id: "sing-box",
  label: "sing-box",
  protocols: [
    "ss",
    "socks5",
    "http",
    "vmess",
    "vless",
    "trojan",
    "hysteria",
    "hysteria2",
    "tuic",
    "anytls",
    "wireguard",
    "ssh",
  ],
  transports: ["tcp", "ws", "grpc", "http", "h2", "httpupgrade", "quic"],
  uniqueNames: true,
  derivedNames: (node) => (shadowTls(node) ? [shadowTlsTag(node)] : []),
  contentType: "application/json; charset=utf-8",
  fileExtension: "json",
  renderNode: (node) => {
    if (node.type === "wireguard") return renderWireGuardEndpoint(node)
    const outbound = renderOutbound$1(node)
    if (!outbound) return null
    const wrapper = renderShadowTlsOutbound(node)
    return wrapper ? [outbound, wrapper] : [outbound]
  },
  assemble: (units) => {
    const endpoints = units.filter((unit) => unit.type === "wireguard")
    const outbounds = units.filter((unit) => unit.type !== "wireguard")
    return JSON.stringify(
      endpoints.length > 0
        ? {
            endpoints,
            outbounds,
          }
        : { outbounds },
      null,
      2,
    )
  },
})
//#endregion
//#region src/core/nodes/targets/stash.ts
function normalizeStash(node) {
  const output = publicNode(node)
  normalizeVmess(output)
  if (output.type === "vless" && output.network === "xhttp" && !output["xhttp-opts"])
    output["xhttp-opts"] = {}
  moveServerName(output, ["vmess", "vless"])
  normalizePlugin(output)
  dropUnsupportedSwitches(output)
  if (output.type === "hysteria") {
    if (output.alpn !== void 0) output.alpn = alpnList(output.alpn)
    output["up-speed"] = output["up-speed"] ?? output.up
    output["down-speed"] = output["down-speed"] ?? output.down
    delete output.up
    delete output.down
  }
  if (output.type === "hysteria2") {
    delete output.username
    output.auth = output.auth ?? output.password
    delete output.password
  }
  normalizeTuic(output)
  normalizeWireGuardAddresses(output, "drop-prefix")
  httpUpgradeAsWebSocket(output)
  dropGrpcMode(output)
  return output
}
const stashTarget = defineTarget({
  id: "stash",
  label: "Stash",
  protocols: [
    "ss",
    "ssr",
    "vmess",
    "vless",
    "trojan",
    "http",
    "socks5",
    "hysteria",
    "hysteria2",
    "tuic",
    "wireguard",
    "snell",
    "anytls",
    "mieru",
    "ssh",
  ],
  transports: "all",
  accepts: (node) => node.type !== "snell" || snellVersion(node) < 4,
  uniqueNames: true,
  contentType: "text/yaml; charset=utf-8",
  fileExtension: "yaml",
  renderNode: (node) => normalizeStash(node),
  assemble: (proxies) => stringify({ proxies }, { lineWidth: 0 }),
})
//#endregion
//#region src/core/nodes/targets/surge.ts
function commonSurgeParameters(node) {
  const alpn = alpnList(node.alpn)?.join(";")
  return parameters([
    ["sni", node.sni],
    ["skip-cert-verify", node.tls ? Boolean(node["skip-cert-verify"]) : null],
    ["alpn", alpn],
    ["udp-relay", ["hysteria2", "tuic"].includes(String(node.type)) ? null : (node.udp ?? false)],
  ])
}
/**
 * Surge and Surfboard share a line format, but not every parameter in it: Shadow-TLS is Surge's.
 * A Surfboard node carrying it has to be refused rather than written without the wrapper.
 */
function surgeNode(node, target = "surge") {
  if (asRecord(node["reality-opts"])) return null
  if (!credentialsFit(node, /,/)) return null
  const network = value$1(node.network || "tcp")
  if (network !== "tcp" && !(network === "ws" && ["vmess", "trojan"].includes(node.type)))
    return null
  const ws = wsOptions(node)
  let protocol
  let specific
  switch (node.type) {
    case "ss": {
      if (pluginBeyondObfs(node)) return null
      const wrapper = target === "surge" ? shadowTls(node) : void 0
      if (target === "surfboard" && shadowTls(node)) return null
      if (wrapper && wrapper.version < 2) return null
      const obfs = obfsOf(node)
      protocol = "ss"
      specific = parameters([
        ["encrypt-method", node.cipher],
        ["password", wrapped(node.password)],
        ["obfs", obfs?.mode],
        ["obfs-host", obfs?.host],
        ["obfs-uri", obfs?.path],
        ["shadow-tls-password", wrapper && wrapped(wrapper.password)],
        ["shadow-tls-sni", wrapper?.host],
        ["shadow-tls-version", wrapper?.version],
      ])
      break
    }
    case "vmess":
      protocol = "vmess"
      specific = parameters([
        ["username", node.uuid],
        ["encrypt-method", node.cipher === "auto" ? void 0 : node.cipher],
        ["vmess-aead", Number(node.alterId ?? 0) === 0],
        ["tls", node.tls],
        ["ws", network === "ws"],
        ["ws-path", ws.path],
        ["ws-headers", headerList(ws.headers)],
      ])
      break
    case "trojan":
      protocol = "trojan"
      specific = parameters([
        ["password", wrapped(node.password)],
        ["tls", node.tls === false ? null : true],
        ["ws", network === "ws"],
        ["ws-path", ws.path],
        ["ws-headers", headerList(ws.headers)],
      ])
      break
    case "tuic": {
      const v5 = tuicIsV5(node)
      protocol = v5 ? "tuic-v5" : "tuic"
      specific = v5
        ? parameters([
            ["uuid", node.uuid],
            ["password", node.password],
          ])
        : parameters([["token", node.token ?? node.uuid]])
      break
    }
    case "hysteria2":
      protocol = "hysteria2"
      specific = parameters([
        ["password", node.password],
        ["download-bandwidth", node.down],
        [node.obfs === "gecko" ? "gecko-password" : "salamander-password", node["obfs-password"]],
      ])
      break
    case "anytls":
      protocol = "anytls"
      specific = parameters([["password", node.password]])
      break
    case "http":
      protocol = node.tls ? "https" : "http"
      specific = parameters([
        ["username", node.username],
        ["password", node.password],
      ])
      break
    case "socks5":
      protocol = node.tls ? "socks5-tls" : "socks5"
      specific = parameters([
        ["username", node.username],
        ["password", node.password],
      ])
      break
    case "snell": {
      const obfs = asRecord(node["obfs-opts"])
      protocol = "snell"
      specific = parameters([
        ["psk", wrapped(node.psk ?? node.password)],
        ["version", node.version],
        ["obfs", obfs?.mode ?? node.obfs],
        ["obfs-host", obfs?.host ?? node["obfs-host"]],
      ])
      break
    }
    case "ssh":
      protocol = "ssh"
      specific = parameters([
        ["username", node.username],
        ["password", node.password],
        ["private-key", node["private-key"]],
        ["server-fingerprint", node["server-fingerprint"]],
      ])
      break
    default:
      return null
  }
  return `${policyName(node)} = ${[
    protocol,
    node.server,
    node.port,
    ...specific,
    ...commonSurgeParameters(node),
  ].join(", ")}`
}
/** Surge for iOS and Surge for macOS read the same node line and refuse the same nodes. */
const SURGE_CAPABILITY = {
  protocols: [
    "ss",
    "vmess",
    "trojan",
    "tuic",
    "hysteria2",
    "anytls",
    "http",
    "socks5",
    "snell",
    "ssh",
  ],
  transports: ["tcp", "ws"],
  accepts: (node) => node.type !== "ss" || SURGE_CIPHERS.has(cipherOf(node)),
}
const surgeTarget = defineTarget({
  id: "surge",
  label: "Surge",
  ...SURGE_CAPABILITY,
  uniqueNames: true,
  renderedName: policyName,
  contentType: "text/plain; charset=utf-8",
  fileExtension: "conf",
  renderNode: (node) => surgeNode(node),
  assemble: (lines) => lines.join("\n"),
})
//#endregion
//#region src/core/nodes/targets/surfboard.ts
function surfboardNode(node) {
  if (
    (node.type === "socks5" || node.type === "http") &&
    value$1(node.network || "tcp") === "tcp"
  ) {
    const protocol =
      node.type === "socks5" ? (node.tls ? "socks5-tls" : "socks5") : node.tls ? "https" : "http"
    const credentials = [node.username, node.password].filter(Boolean).map((item) => value$1(item))
    return `${policyName(node)} = ${[
      protocol,
      node.server,
      node.port,
      ...credentials,
      ...parameters([["udp-relay", node.udp]]),
    ].join(", ")}`
  }
  const shared = surgeNode(node, "surfboard")
  if (shared && ["hysteria2", "tuic"].includes(String(node.type)) && node.udp !== void 0)
    return `${shared}, udp-relay=${String(node.udp)}`
  return shared
}
const surfboardTarget = defineTarget({
  id: "surfboard",
  label: "Surfboard",
  protocols: ["ss", "vmess", "trojan", "tuic", "hysteria2", "anytls", "http", "socks5", "snell"],
  transports: ["tcp", "ws"],
  accepts: (node) =>
    (node.type !== "ss" || SURFBOARD_CIPHERS.has(cipherOf(node))) &&
    (node.type !== "tuic" || tuicIsV5(node)),
  uniqueNames: true,
  renderedName: policyName,
  contentType: "text/plain; charset=utf-8",
  fileExtension: "conf",
  renderNode: surfboardNode,
  assemble: (lines) => lines.join("\n"),
})
//#endregion
//#region src/core/nodes/targets/surge-mac.ts
/**
 * Surge for macOS reads the same node lines as Surge for iOS. A separate target because what people
 * ask for under this name is native macOS proxy lines — not a full configuration, and not the
 * external-proxy-program bridge to mihomo.
 */
const surgeMacTarget = defineTarget({
  id: "surge-mac",
  label: "Surge Mac",
  ...SURGE_CAPABILITY,
  uniqueNames: true,
  renderedName: policyName,
  notes:
    "Writes native Surge for macOS node lines; not a full configuration and not the mihomo external-proxy bridge.",
  contentType: "text/plain; charset=utf-8",
  fileExtension: "conf",
  renderNode: (node) => surgeNode(node),
  assemble: (lines) => lines.join("\n"),
})
//#endregion
//#region src/core/nodes/targets/uri.ts
/** A plain list of protocol URIs, which nearly every client can import by hand. */
const uriTarget = defineTarget({
  id: "uri",
  label: "URI",
  protocols: URI_PROTOCOLS,
  transports: "all",
  uniqueNames: false,
  contentType: "text/plain; charset=utf-8",
  fileExtension: "txt",
  renderNode: (node) => renderUriNode(node),
  assemble: (lines) => lines.join("\n"),
})
//#endregion
//#region src/core/nodes/targets/v2ray.ts
/**
 * V2Ray's subscription format is the URI list again, Base64 encoded as a whole. It is deliberately
 * not a V2Ray JSON configuration: what a client subscribes to is the encoded line list.
 */
const v2rayTarget = defineTarget({
  id: "v2ray",
  label: "V2Ray",
  protocols: URI_PROTOCOLS,
  transports: "all",
  notes: "Writes a Base64-encoded list of protocol URIs, not a V2Ray JSON configuration.",
  uniqueNames: false,
  contentType: "text/plain; charset=utf-8",
  fileExtension: "txt",
  renderNode: (node) => renderUriNode(node),
  assemble: (lines) => encodeBase64(lines.join("\n")),
})
//#endregion
//#region src/core/nodes/targets/xray.ts
const TYPE_FROM_CANONICAL = {
  ss: "shadowsocks",
  socks5: "socks",
}
function renderStreamSettings(node) {
  const network = asString(node.network) ?? "tcp"
  const stream = {
    method:
      network === "tcp"
        ? "raw"
        : network === "ws"
          ? "websocket"
          : network === "kcp"
            ? "mkcp"
            : network,
  }
  if (network === "ws") {
    const options = asRecord(node["ws-opts"])
    stream.wsSettings = compactRecord({
      path: asString(options?.path),
      headers: asRecord(options?.headers) ?? void 0,
      maxEarlyData: options?.["max-early-data"],
      earlyDataHeaderName: asString(options?.["early-data-header-name"]),
    })
  } else if (network === "grpc") {
    const options = asRecord(node["grpc-opts"])
    stream.grpcSettings = compactRecord({
      serviceName: asString(options?.["grpc-service-name"]),
      multiMode: asBoolean(options?.["multi-mode"]),
      idle_timeout: options?.["idle-timeout"],
      health_check_timeout: options?.["health-check-timeout"],
    })
  } else if (network === "xhttp") stream.xhttpSettings = asRecord(node["xhttp-opts"]) ?? {}
  else if (network === "httpupgrade") {
    const options = asRecord(node["httpupgrade-opts"])
    stream.httpupgradeSettings = compactRecord({
      host: asString(options?.host),
      path: asString(options?.path),
      headers: asRecord(options?.headers) ?? void 0,
      maxEarlyData: options?.["max-early-data"],
      earlyDataHeaderName: asString(options?.["early-data-header-name"]),
    })
  } else if (network === "kcp") stream.kcpSettings = asRecord(node["kcp-opts"]) ?? {}
  const reality = asRecord(node["reality-opts"])
  if (reality) {
    stream.security = "reality"
    stream.realitySettings = compactRecord({
      serverName: asString(node.sni),
      fingerprint: asString(node["client-fingerprint"]),
      publicKey: asString(reality["public-key"]),
      shortId: asString(reality["short-id"]),
      spiderX: asString(reality["spider-x"]),
    })
  } else if (node.tls) {
    stream.security = "tls"
    stream.tlsSettings = compactRecord({
      serverName: asString(node.sni),
      allowInsecure: asBoolean(node["skip-cert-verify"]),
      alpn: stringArray(node.alpn),
      fingerprint: asString(node["client-fingerprint"]),
    })
  } else stream.security = "none"
  return stream
}
function renderOutbound(node) {
  if (node.type === "ss" && node.plugin) return null
  const protocol = TYPE_FROM_CANONICAL[node.type] ?? node.type
  let settings
  if (node.type === "vmess")
    settings = compactRecord({
      address: node.server,
      port: node.port,
      id: asString(node.uuid),
      security: asString(node.cipher) ?? "auto",
    })
  else if (node.type === "vless")
    settings = compactRecord({
      address: node.server,
      port: node.port,
      id: asString(node.uuid),
      encryption: asString(node.encryption) ?? "none",
      flow: asString(node.flow),
    })
  else if (node.type === "ss")
    settings = compactRecord({
      address: node.server,
      port: node.port,
      method: asString(node.cipher),
      password: asString(node.password),
    })
  else if (node.type === "trojan")
    settings = compactRecord({
      address: node.server,
      port: node.port,
      password: asString(node.password),
    })
  else
    settings = compactRecord({
      address: node.server,
      port: node.port,
      user: asString(node.username),
      pass: asString(node.password),
    })
  return {
    tag: node.name,
    protocol,
    settings,
    streamSettings: renderStreamSettings(node),
  }
}
//#endregion
//#region src/core/nodes/targets/index.ts
/**
 * Every client this core can write, and the only list of them. The order is the one the API states a
 * rejected `target` against, so it is part of that error message: do not rearrange.
 */
const TARGETS = [
  jsonTarget,
  uriTarget,
  mihomoTarget,
  clashTarget,
  singBoxTarget,
  defineTarget({
    id: "xray",
    label: "Xray",
    protocols: ["ss", "socks5", "http", "vmess", "vless", "trojan"],
    transports: ["tcp", "ws", "grpc", "xhttp", "httpupgrade", "kcp"],
    uniqueNames: true,
    contentType: "application/json; charset=utf-8",
    fileExtension: "json",
    renderNode: (node) => renderOutbound(node),
    assemble: (outbounds) => JSON.stringify({ outbounds }, null, 2),
  }),
  quantumultXTarget,
  surgeTarget,
  surgeMacTarget,
  egernTarget,
  stashTarget,
  loonTarget,
  shadowrocketTarget,
  surfboardTarget,
  v2rayTarget,
]
const TARGET_IDS = TARGETS.map((target) => target.id)
const BY_ID = new Map(TARGETS.map((target) => [target.id, target]))
function targetDefinition(id) {
  const target = BY_ID.get(id)
  if (!target) throw new Error(`Missing target definition for ${id}`)
  return target
}
function targetLabel(id) {
  return BY_ID.get(id)?.label ?? id
}
//#endregion
//#region src/core/nodes/pipeline/canonical-validation.ts
/**
 * The single gate every node passes before any client sees it.
 *
 * After the rule chain on purpose: canonicalization guarantees the shape of what a parser produced,
 * but a rule that renames on a bad pattern or sorts on a missing field can hand the renderers a node
 * with an empty name or a `NaN` port. The parser-side checks are Parse Validation's.
 *
 * A failure is a warning rather than an error, matching how an unreadable input node is treated:
 * the rest of the subscription is still worth serving.
 */
function validateCanonical(nodes) {
  const diagnostics = []
  return {
    nodes: nodes.filter((node) => {
      if (
        !(
          typeof node.type !== "string" ||
          node.type.length === 0 ||
          typeof node.name !== "string" ||
          node.name.length === 0 ||
          typeof node.server !== "string" ||
          node.server.length === 0 ||
          !isDialablePort(node.port)
        )
      )
        return true
      diagnostics.push({
        level: "warning",
        stage: "canonical-validation",
        code: "invalid-canonical-node",
        message: `${String(node.name || node.server || node.type)} is not a valid node (invalid type, name, server or port); skipped.`,
      })
      return false
    }),
    diagnostics,
  }
}
//#endregion
//#region src/core/nodes/pipeline/canonicalize.ts
/**
 * The protocols whose name differs between the clients that write them.
 *
 * One table, not one per parser: `platform-lines.ts` needs the answer before this stage runs, to
 * know which fields a line even has, so it imports this rather than keeping a copy. Two copies is
 * how `hy2`, `tuic-v5`, `https` and `socks5-tls` came to be canonical on a proxy line and left as
 * written in a document — naming a protocol no client declares, refused by every one of them.
 */
const TYPE_ALIASES = {
  "hy2": "hysteria2",
  "https": "http",
  "shadowsocks": "ss",
  "shadowsocksr": "ssr",
  "socks": "socks5",
  "socks5-tls": "socks5",
  "tuic-v5": "tuic",
}
/**
 * The spellings that name a transport security as well as a protocol. The name normalizes away —
 * `https` is an `http` node, `socks5-tls` a `socks5` one — and the TLS must not go with it, or the
 * proxy comes back out as the plaintext version of itself, credentials and all.
 */
const ALIAS_IMPLIES_TLS = /* @__PURE__ */ new Set(["https", "socks5-tls"])
/** `_` and `-` are one separator in a protocol name: `tuic_v5` and `tuic-v5` are the same spelling. */
function spelling(raw) {
  return raw.toLowerCase().replaceAll("_", "-")
}
/**
 * The protocol name in the spelling the rest of this codebase reads. An unrecognised name is
 * lower-cased and otherwise returned as it came, underscores included: a type this core does not
 * know travels through the canonical model untouched, like every other unknown field.
 */
function canonicalType(raw) {
  return TYPE_ALIASES[spelling(raw)] ?? raw.toLowerCase()
}
/** Whether the source's own spelling of the protocol says it speaks TLS. */
function spellsTls(raw) {
  return ALIAS_IMPLIES_TLS.has(spelling(raw))
}
/** The protocols that run over TLS by definition rather than by saying so. */
const IMPLIES_TLS = /* @__PURE__ */ new Set(["trojan", "hysteria", "hysteria2", "tuic", "anytls"])
/**
 * Whether the protocol runs over TLS by definition rather than by saying so — Hysteria and TUIC are
 * QUIC, Trojan and AnyTLS have no plaintext mode at all.
 *
 * Exported because `platform-lines.ts` needs the same answer while it is still reading the line,
 * before this stage runs. One list, not two: a second copy keyed on the same canonical type is one
 * more place to forget the next protocol added. Unlike `spellsTls`, which needs the source's own
 * spelling, this takes a canonical type, so both callers can share it outright.
 */
function impliesTls(type) {
  return IMPLIES_TLS.has(type)
}
/** The protocols whose transport has to be named, because every client asks which one it is. */
const NEEDS_NETWORK = /* @__PURE__ */ new Set(["vmess", "vless", "trojan"])
/**
 * The value a source actually stated. Every fallback chain here is built out of `??`, which reads
 * `""` as a value — so without this an empty `name` shadows a usable `tag`, an empty `server` a
 * usable `address`, an empty `password` the credential the source did carry. An empty string is the
 * third way a source says nothing, and the structured readers hand it straight through: a YAML
 * `password:` with nothing after it reaches here as exactly that.
 *
 * Not `||`: `0` and `false` are values, and a node named `0` has a name.
 */
function stated$1(value) {
  return value === void 0 || value === null || value === "" ? void 0 : value
}
/**
 * The one place a parsed node becomes a canonical one. A default that disagrees with itself across
 * formats is how the same node comes to connect one way from a URI and another from a YAML file.
 *
 * Everything here defaults rather than overwrites: a parser that already states a value keeps it,
 * which is what lets a SIP002 URI say `udp: false` for itself against the `?? true` default. What
 * counts as stated is the qualification — an empty string is not one, which is `stated()` below.
 */
function canonicalize(draft) {
  const sourceType = String(draft.type ?? "")
  const type = canonicalType(sourceType)
  const server = String(stated$1(draft.server) ?? stated$1(draft.address) ?? "")
  const port = integer(draft.port, integer(draft.server_port))
  const node = structuredClone(draft)
  node.type = type
  node.server = server
  node.port = port
  node.name = String(stated$1(draft.name) ?? stated$1(draft.tag) ?? `${type} ${server}:${port}`)
  if (draft.server_port != null) delete node.server_port
  if (typeof draft.udp === "string") node.udp = booleanFlag(draft.udp)
  if (typeof draft.tls === "string") node.tls = booleanFlag(draft.tls)
  if (impliesTls(type) || spellsTls(sourceType)) node.tls = node.tls ?? true
  if (type === "hysteria2" && node.auth !== void 0) {
    node.password = stated$1(node.password) ?? node.auth
    delete node.auth
  }
  if (type === "hysteria") {
    node["auth-str"] =
      stated$1(node["auth-str"]) ??
      stated$1(node.auth_str) ??
      stated$1(node.auth) ??
      stated$1(node.password)
    delete node.auth_str
    delete node.auth
    delete node.password
  }
  if (NEEDS_NETWORK.has(type) && !node.network) node.network = "tcp"
  if (type === "wireguard") applyWireGuardAddresses(node, draft.address ?? draft.local_address)
  if (type === "vmess") {
    node.cipher = stated$1(node.cipher) ?? "auto"
    node.alterId = integer(node.alterId, 0)
  }
  for (const key of Object.keys(node)) {
    if (!key.toLowerCase().endsWith("-opts") || key === key.toLowerCase()) continue
    node[key.toLowerCase()] = node[key]
    delete node[key]
  }
  node.udp = node.udp ?? type !== "http"
  if (type === "ss") node.cipher = stated$1(node.cipher) ?? "none"
  const sni = effectiveSni(node)
  if (sni !== void 0) node.sni = sni
  return node
}
//#endregion
//#region src/core/nodes/pipeline/input.ts
/**
 * The largest source this core will read, and the ceiling everything upstream is held to: a source the
 * store accepted but the compiler refuses is a subscription that saves and then fails every delivery.
 * `subscriptions/schema.ts` caps what may be stored against this, and
 * `subscriptions/source-resolver.ts` caps what may be fetched and merged.
 */
const MAX_SOURCE_SIZE = 2097152
/**
 * Surge and Quantumult X hand out whole configuration files. The nodes are in one named section of
 * them, and the rest is rules and settings no reader here has any use for.
 *
 * The section ends at the next `[header]` or at the end of the file. `$` cannot say the latter here:
 * `m` is needed so `^` anchors the header, and under `m` a `$` matches every line ending — which the
 * lazy quantifier takes, cutting the section off after its first line. `(?![\s\S])` is end of input
 * regardless of the flag.
 */
function extractProxySection(source) {
  return (
    source
      .match(/^\[(?:Proxy|server_local)\]\s*\r?\n([\s\S]*?)(?=^\[|$(?![\s\S]))/im)?.[1]
      ?.trim() || source
  )
}
/**
 * The first stage: everything that happens to a source before any format looks at it.
 *
 * Both unwrapping steps are shared — a Base64 body can hold any format, a configuration file any of
 * the line ones — and so is the parsed document: sing-box, Xray, V2Ray and the generic proxy-list
 * reader are four formats over the same JSON or YAML, and parsing up to 2 MiB once per format is
 * four times the work for one answer.
 */
function prepareInput(source) {
  if (typeof source !== "string") throw new ValidationError("source must be a string")
  if (new TextEncoder().encode(source).byteLength > 2097152)
    throw new ValidationError("Subscription content must not exceed 2 MiB")
  const decoded = maybeDecodeBase64(source)
  const text = extractProxySection(decoded ?? source).trim()
  let parsed = false
  let document = null
  return {
    text,
    encoded: decoded !== null,
    document() {
      if (parsed) return document
      parsed = true
      try {
        const value = text.startsWith("{") || text.startsWith("[") ? JSON.parse(text) : parse(text)
        document = value && typeof value === "object" ? value : null
      } catch {
        document = null
      }
      return document
    },
  }
}
//#endregion
//#region src/core/nodes/formats/empty.ts
/** Nothing to read. Reported rather than treated as an unreadable format. */
const emptyFormat = {
  id: "empty",
  parse: ({ text }) =>
    text
      ? null
      : {
          format: "empty",
          drafts: [],
          diagnostics: [],
        },
}
//#endregion
//#region src/core/nodes/formats/html.ts
/**
 * An upstream that answered with a login page or an error page rather than a subscription. Saying so
 * is far more use than the pile of unreadable-line warnings the line reader would otherwise produce.
 *
 * `<html>` counts as well as a doctype: the pages this catches are the ones a portal or a proxy
 * emits by hand, and those are exactly the ones that leave the doctype off. Nothing else can start
 * this way — a proxy URI, a config file and a Base64 envelope all begin with something else — so the
 * wider test costs no format its own source.
 */
const HTML_START = /^(?:<!doctype\s+html|<html[\s>])/i
const htmlFormat = {
  id: "html",
  parse: ({ text }) =>
    HTML_START.test(text)
      ? {
          format: "html",
          drafts: [],
          diagnostics: [
            {
              level: "error",
              stage: "parse",
              code: "html-input",
              message: "The input is HTML, not a valid subscription.",
            },
          ],
        }
      : null,
}
//#endregion
//#region src/core/nodes/formats/mieru.ts
/**
 * Mieru's native client.json format. The official shape is intentionally handled before the generic
 * structured reader: one server can expose several port bindings, so each binding becomes a node.
 * A few older exporters used the shorter aliases (`ip`, `domain`, `port`, `username`); accepting them
 * here preserves compatibility without weakening the generic node parser.
 */
function isProfile(value) {
  const profile = asRecord(value)
  return Boolean(profile && (asRecord(profile.user) || Array.isArray(profile.servers)))
}
function detect$2(value) {
  return asArray(asRecord(value)?.profiles).some((profile) => isProfile(profile))
}
function stated(value) {
  return value === void 0 || value === null || value === "" ? void 0 : value
}
function profileOption(profile, endpoint, key) {
  return asString(endpoint[key]) ?? asString(profile[key])
}
function multiplexingValue(value) {
  return asString(asRecord(value)?.level) ?? asString(value)
}
function bindingsFor(endpoint) {
  const bindings = asArray(endpoint.portBindings)
  return bindings.length > 0 ? bindings.map((binding) => asRecord(binding) ?? {}) : [endpoint]
}
function endpointNodes(
  profile,
  endpoint,
  profileName,
  nodeOffset,
  bindingCount,
  diagnostics,
  ordinal,
) {
  const server =
    asString(endpoint.domainName) ??
    asString(endpoint.ipAddress) ??
    asString(endpoint.domain) ??
    asString(endpoint.ip)
  const user = asRecord(profile.user)
  const username = asString(user?.name) ?? asString(user?.username)
  const nodes = []
  for (const [bindingIndex, binding] of bindingsFor(endpoint).entries()) {
    const port = asPort(binding.port ?? endpoint.port)
    const currentOrdinal = ordinal + bindingIndex
    if (!server || !port) {
      diagnostics.push({
        level: "warning",
        stage: "parse",
        code: "invalid-mieru-node",
        message: `Mieru server #${currentOrdinal + 1} is missing address or port; skipped.`,
      })
      continue
    }
    const name =
      profileName && bindingCount > 1
        ? `${profileName} ${nodeOffset + bindingIndex + 1}`
        : profileName
    const node = {
      type: "mieru",
      ...(name ? { name } : {}),
      server,
      port,
      username,
      password: asString(user?.password),
      transport: asString(binding.protocol) ?? asString(endpoint.transportProtocol),
      multiplexing:
        multiplexingValue(binding.multiplexing) ??
        multiplexingValue(endpoint.multiplexing) ??
        multiplexingValue(profile.multiplexing),
      congestionControl:
        asString(binding.congestionControl) ??
        asString(endpoint.congestionControl) ??
        asString(profile.congestionControl),
      handshakeMode: asString(profile.handshakeMode),
    }
    for (const key of ["mtu", "pacingWindow", "streamTimeout"]) {
      const value = stated(profile[key])
      if (value !== void 0) node[key] = value
    }
    const transport = profileOption(profile, endpoint, "transportProtocol")
    if (transport !== void 0 && node.transport === void 0) node.transport = transport
    nodes.push({
      value: node,
      index: currentOrdinal,
    })
  }
  return nodes
}
function parseMieru(value) {
  const diagnostics = []
  const drafts = []
  let ordinal = 0
  for (const profileValue of asArray(asRecord(value)?.profiles)) {
    const profile = asRecord(profileValue)
    if (!profile) continue
    const endpoints = asArray(profile.servers)
    const profileName = asString(profile.profileName)
    const bindingCount = endpoints.reduce((count, endpoint) => {
      const record = asRecord(endpoint)
      return count + ((record ? asArray(record.portBindings) : []).length || 1)
    }, 0)
    let nodeOffset = 0
    for (const endpointValue of endpoints) {
      const endpoint = asRecord(endpointValue) ?? {}
      const nodes = endpointNodes(
        profile,
        endpoint,
        profileName,
        nodeOffset,
        bindingCount,
        diagnostics,
        ordinal,
      )
      drafts.push(...nodes)
      const endpointBindingCount = bindingsFor(endpoint).length
      ordinal += endpointBindingCount
      nodeOffset += endpointBindingCount
    }
  }
  return {
    format: "mieru",
    drafts,
    diagnostics,
  }
}
const mieruFormat = {
  id: "mieru",
  parse: (source) => {
    const value = source.document()
    return detect$2(value) ? parseMieru(value) : null
  },
}
//#endregion
//#region src/core/nodes/formats/platform-lines.ts
/**
 * Surge, Loon and Quantumult X proxy lines, and Egern proxy objects, read into drafts.
 *
 * The answers shared with every other input format are asked for rather than repeated: the spelling
 * table, the protocols that are TLS by definition, the readable fallback name, the `udp` default and
 * the VMess cipher all live in `pipeline/canonicalize.ts`. A line parser has to know the canonical
 * type before that stage runs — it decides which fields the line even has — so it imports the table.
 *
 * What stays is what that stage cannot see, or cannot place: these clients spell half the shared
 * fields their own way — `udp-relay`, `over-tls`, `udp_relay`, `auth`, `method`, `aead` — and a key it
 * never reads is a setting silently lost. Each such read is marked where it is not obvious, as is the
 * one write kept for where it puts a key rather than for the value.
 */
function value(input) {
  const trimmed = input?.trim() ?? ""
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  )
    return trimmed.slice(1, -1).replaceAll('\\"', '"').replaceAll("\\'", "'")
  if (trimmed.startsWith("{") && trimmed.endsWith("}")) return trimmed.slice(1, -1)
  return trimmed
}
/** `booleanFlag`'s rule, read off a line: what these clients quote, this has to unquote first. */
function bool(input) {
  return input == null ? void 0 : booleanFlag(value(input))
}
function splitCsv(input) {
  const result = []
  let current = ""
  let quote = ""
  let depth = 0
  for (let index = 0; index < input.length; index += 1) {
    const character = input[index]
    if (quote) {
      current += character
      if (character === quote && input[index - 1] !== "\\") quote = ""
      continue
    }
    if (character === '"' || character === "'") {
      quote = character
      current += character
    } else if (character === "{" || character === "[") {
      depth += 1
      current += character
    } else if (character === "}" || character === "]") {
      depth = Math.max(0, depth - 1)
      current += character
    } else if (character === "," && depth === 0) {
      result.push(current.trim())
      current = ""
    } else current += character
  }
  result.push(current.trim())
  return result
}
/**
 * A `key=value` token, as opposed to a positional argument that merely contains an `=` — which a
 * base64 password does, swallowing the password of every 2022-cipher node.
 */
function keyed(part) {
  return /^[A-Za-z][\w-]*\s*=/.test(part.trim())
}
function options(parts) {
  const result = {}
  for (const part of parts) {
    if (!keyed(part)) continue
    const separator = part.indexOf("=")
    result[part.slice(0, separator).trim().toLowerCase()] = value(part.slice(separator + 1))
  }
  return result
}
function endpoint(input) {
  const match = value(input).match(/^\[([^\]]+)]:(\d+)$/) ?? value(input).match(/^(.+):(\d+)$/)
  if (!match) return null
  return {
    server: match[1],
    port: Number(match[2]),
  }
}
function applyCommon(node, input) {
  node.udp = bool(input["udp-relay"] ?? input.udp)
  node.tfo = bool(input["fast-open"] ?? input.tfo)
  node.sni = input.sni ?? input["tls-name"] ?? input["tls-host"] ?? input.servername
  node["skip-cert-verify"] =
    bool(input["skip-cert-verify"]) ??
    (input["tls-verification"] == null ? void 0 : !bool(input["tls-verification"]))
  const alpn = input.alpn
    ?.split(/[;,]/)
    .map((entry) => entry.trim())
    .filter(Boolean)
  if (alpn?.length) node.alpn = alpn
  const transport = (input.transport ?? "").toLowerCase()
  const obfs = (input.obfs ?? "").toLowerCase()
  const obfsNetwork =
    (obfs === "ws" || obfs === "wss") && !["ss", "ssr"].includes(String(node.type))
      ? "ws"
      : obfs === "http" && ["vmess", "vless", "trojan"].includes(String(node.type))
        ? "http"
        : "tcp"
  const network = transport || (bool(input.ws) ? "ws" : obfsNetwork)
  node.network = network
  node.tls =
    bool(input["over-tls"] ?? input.tls) ??
    node.tls ??
    (["wss", "over-tls"].includes(obfs) || impliesTls(node.type))
  if (network === "ws") {
    node["ws-opts"] = {
      path: input.path ?? input["ws-path"] ?? input["obfs-uri"] ?? "/",
      headers:
        (input.host ?? input["ws-host"] ?? input["obfs-host"])
          ? { Host: input.host ?? input["ws-host"] ?? input["obfs-host"] }
          : void 0,
    }
    if (input["ws-headers"])
      node["ws-opts"] = {
        ...node["ws-opts"],
        headers: Object.fromEntries(
          input["ws-headers"].split("|").flatMap((header) => {
            const separator = header.indexOf(":")
            return separator === -1
              ? []
              : [[header.slice(0, separator), header.slice(separator + 1)]]
          }),
        ),
      }
  } else if (network === "http") {
    const path = input.path ?? input["obfs-uri"]
    const host = input.host ?? input["obfs-host"]
    node["http-opts"] = {
      path: path === void 0 ? void 0 : [path],
      headers: host === void 0 ? void 0 : { Host: [host] },
    }
  } else if (network === "grpc")
    node["grpc-opts"] = { "grpc-service-name": input["service-name"] ?? input["grpc-service-name"] }
  if (input["reality-base64-pubkey"]) {
    node["reality-opts"] = {
      "public-key": input["reality-base64-pubkey"],
      "short-id": input["reality-hex-shortid"] ?? "",
    }
    node.tls = true
  }
  return node
}
function parseQuantumultX(left, parts) {
  const ep = endpoint(parts[0])
  if (!ep) return null
  const input = options(parts.slice(1))
  const protocol = left.toLowerCase()
  const type = protocol === "shadowsocks" && input["ssr-protocol"] ? "ssr" : canonicalType(protocol)
  const node = {
    type,
    name: input.tag,
    ...ep,
  }
  if (type === "ss" || type === "ssr") {
    node.cipher = input.method
    node.password = input.password
    const obfs = (input.obfs ?? "").toLowerCase()
    if (type === "ssr") {
      node.protocol = input["ssr-protocol"]
      node["protocol-param"] = input["ssr-protocol-param"]
      node.obfs = input.obfs
      node["obfs-param"] = input["obfs-host"]
    } else if (["http", "tls"].includes(obfs)) {
      node.plugin = "obfs"
      node["plugin-opts"] = {
        mode: obfs,
        host: input["obfs-host"],
        path: input["obfs-uri"],
      }
    } else if (["ws", "wss"].includes(obfs)) {
      node.plugin = "v2ray-plugin"
      node["plugin-opts"] = {
        mode: "websocket",
        host: input["obfs-host"],
        path: input["obfs-uri"],
        tls: obfs === "wss",
      }
    }
  } else if (type === "vmess" || type === "vless") {
    node.uuid = input.password
    node.cipher = input.method ?? (type === "vless" ? "none" : void 0)
    node.flow = input["vless-flow"]
    node.alterId = bool(input.aead) === false ? 1 : 0
  } else if (["trojan", "anytls", "hysteria2", "tuic"].includes(type)) {
    if (type === "tuic") node.token = input.token
    node.password = input.password ?? (type === "tuic" ? void 0 : input.token)
    node.uuid = input.uuid
  } else {
    node.username = input.username
    node.password = input.password
    if (spellsTls(protocol)) node.tls = true
  }
  return {
    node: applyCommon(node, input),
    format: "quantumult-x",
  }
}
const QX_TYPES = /* @__PURE__ */ new Set([
  "shadowsocks",
  "vmess",
  "vless",
  "trojan",
  "anytls",
  "hysteria2",
  "tuic",
  "http",
  "https",
  "socks5",
  "socks5-tls",
])
/**
 * Loon's WireGuard line carries no address of its own: the endpoint belongs to the first peer, and
 * the peer list is a literal in the middle of the line.
 */
function parseLoonWireGuard(left, parts) {
  const input = options(parts.slice(1))
  const peer = options(
    splitCsv(
      (input.peers ?? "").replace(/^\[/, "").replace(/]$/, "").replace(/^{/, "").replace(/}$/, ""),
    ),
  )
  const ep = endpoint(peer.endpoint ?? "")
  if (!ep) return null
  return {
    node: {
      "type": "wireguard",
      "name": value(left),
      ...ep,
      "private-key": input["private-key"],
      "public-key": peer["public-key"],
      "pre-shared-key": peer["pre-shared-key"],
      "allowed-ips": peer["allowed-ips"],
      "ip": input["interface-ip"],
      "mtu": Number(input.mtu) || void 0,
      "udp": true,
    },
    format: "loon",
  }
}
function parseAssignment(left, parts) {
  const sourceType = value(parts[0])
  const type = canonicalType(sourceType)
  if (type === "wireguard" && !Number(parts[2])) return parseLoonWireGuard(left, parts)
  if (!parts[1] || !Number(parts[2])) return null
  const format =
    ["shadowsocks", "shadowsocksr", "vless", "hysteria2", "wireguard"].includes(
      sourceType.toLowerCase(),
    ) ||
    (["vmess", "vless", "trojan", "anytls", "hysteria2", "http", "https", "socks5"].includes(
      sourceType.toLowerCase(),
    ) &&
      parts.slice(3).some((part) => !keyed(part)))
      ? "loon"
      : "surge"
  let positionalEnd = 3
  while (positionalEnd < parts.length && !keyed(parts[positionalEnd])) positionalEnd += 1
  const positional = parts.slice(3, positionalEnd).map((item) => value(item))
  const input = options(parts.slice(positionalEnd))
  const node = {
    type,
    name: value(left),
    server: value(parts[1]),
    port: Number(parts[2]),
  }
  if (type === "ss") {
    node.cipher = input["encrypt-method"] ?? positional[0]
    node.password = input.password ?? positional[1]
    const obfs = input.obfs ?? input["obfs-name"]
    if (obfs) {
      node.plugin = "obfs"
      node["plugin-opts"] = {
        mode: obfs,
        host: input["obfs-host"],
        path: input["obfs-uri"],
      }
    }
    if (input["shadow-tls-password"]) {
      node.plugin = "shadow-tls"
      node["plugin-opts"] = {
        host: input["shadow-tls-sni"],
        password: input["shadow-tls-password"],
        version: Number(input["shadow-tls-version"] ?? 3),
      }
    }
  } else if (type === "ssr")
    [
      node.cipher,
      node.password,
      node.protocol,
      node["protocol-param"],
      node.obfs,
      node["obfs-param"],
    ] = positional
  else if (type === "vmess") {
    node.cipher = input["encrypt-method"] ?? positional[0]
    node.uuid = input.username ?? positional[1]
    node.alterId = Number(input.alterid ?? (bool(input["vmess-aead"]) === false ? 1 : 0))
  } else if (type === "vless") {
    node.uuid = input.username ?? positional[0]
    node.flow = input.flow
  } else if (["trojan", "anytls", "hysteria2", "tuic"].includes(type)) {
    if (type === "tuic") node.token = input.token
    node.password = input.password ?? (type === "tuic" ? void 0 : input.token) ?? positional[0]
    node.uuid = input.uuid
    node.obfs = input.obfs
    node["obfs-password"] = input["obfs-password"] ?? input["salamander-password"]
    node.down = input["download-bandwidth"]
  } else if (type === "snell") {
    node.psk = input.psk ?? positional[0]
    node.version = Number(input.version ?? 3)
    node.obfs = input.obfs
    node["obfs-host"] = input["obfs-host"]
  } else if (type === "ssh") {
    node.username = input.username
    node.password = input.password
    node["private-key"] = input["private-key"]
    node["server-fingerprint"] = input["server-fingerprint"]
  } else if (type === "wireguard") {
    node["private-key"] = positional[0] ?? input["private-key"]
    node["public-key"] = input["public-key"]
    node["pre-shared-key"] = input["pre-shared-key"]
    node.ip = input["interface-ip"]
    node.mtu = Number(input.mtu) || void 0
  } else {
    node.username = input.username ?? positional[0]
    node.password = input.password ?? positional[1]
    if (spellsTls(sourceType)) node.tls = true
  }
  return {
    node: applyCommon(node, input),
    format,
  }
}
function parsePlatformLine(line) {
  const separator = line.indexOf("=")
  if (separator === -1) return null
  const left = line.slice(0, separator).trim()
  const parts = splitCsv(line.slice(separator + 1))
  if (QX_TYPES.has(left.toLowerCase()) && endpoint(parts[0])) return parseQuantumultX(left, parts)
  return parseAssignment(left, parts)
}
/**
 * Egern keys each proxy by its protocol — `- {shadowsocks: {…}}` — and names half its fields its own
 * way. Reading that back is what makes an Egern config an input as well as an output.
 */
const EGERN_TYPES = {
  anytls: "anytls",
  http: "http",
  https: "http",
  hysteria2: "hysteria2",
  shadowsocks: "ss",
  snell: "snell",
  socks5: "socks5",
  ssh: "ssh",
  trojan: "trojan",
  tuic: "tuic",
  vless: "vless",
  vmess: "vmess",
}
function egernReality(input) {
  const reality = asRecord(input)
  if (!reality) return
  return {
    "public-key": reality.public_key,
    "short-id": reality.short_id,
  }
}
/** The one transport an Egern proxy declares, translated back into a network and its options. */
function egernTransport(node, transport) {
  const [kind] = Object.keys(transport)
  const stream = asRecord(transport[kind]) ?? {}
  const headers = asRecord(stream.headers)
  const host = firstOf(stream.host ?? headers?.Host ?? headers?.host)
  const reality = egernReality(stream.reality)
  node.sni = asString(stream.sni) ?? node.sni
  if (stream.skip_tls_verify !== void 0) node["skip-cert-verify"] = stream.skip_tls_verify
  if (reality) node["reality-opts"] = reality
  if (kind === "ws" || kind === "wss") {
    node.network = "ws"
    node.tls = kind === "wss"
    node["ws-opts"] = {
      path: stream.path,
      headers: host === void 0 ? void 0 : { Host: host },
    }
  } else if (kind === "http1" || kind === "http2") {
    node.network = kind === "http1" ? "http" : "h2"
    node[`${node.network}-opts`] = {
      method: stream.method,
      path: stream.path === void 0 ? void 0 : [stream.path],
      ...(kind === "http1"
        ? { headers: host === void 0 ? void 0 : { Host: [host] } }
        : { host: host === void 0 ? void 0 : [host] }),
    }
  } else if (kind === "grpc") {
    node.network = "grpc"
    node["grpc-opts"] = { "grpc-service-name": stream.service_name }
    node.tls = true
  } else if (kind === "tls") node.tls = true
}
function parseEgernProxy(proxy) {
  const entry = asRecord(proxy)
  const keys = entry ? Object.keys(entry) : []
  if (!entry || keys.length !== 1) return null
  const type = EGERN_TYPES[keys[0]]
  const fields = asRecord(entry[keys[0]])
  const server = asString(fields?.server)
  const port = Number(fields?.port)
  if (!type || !fields || !server || !Number.isInteger(port)) return null
  const node = {
    type,
    name: asString(fields.name) ?? "",
    server,
    port,
    udp: typeof fields.udp_relay === "boolean" ? fields.udp_relay : void 0,
    tfo: fields.tfo,
    sni: asString(fields.sni),
    alpn: fields.alpn,
    tls: keys[0] === "https" || void 0,
  }
  if (fields.skip_tls_verify !== void 0) node["skip-cert-verify"] = fields.skip_tls_verify
  if (type === "ss") {
    node.cipher = asString(fields.method)
    node.password = asString(fields.password)
    if (fields.obfs) {
      node.plugin = "obfs"
      node["plugin-opts"] = {
        mode: fields.obfs,
        host: fields.obfs_host,
        path: fields.obfs_uri,
      }
    }
  } else if (type === "vmess" || type === "vless") {
    node.uuid = asString(fields.user_id)
    node.cipher = asString(fields.security)
    node.flow = asString(fields.flow)
    node.alterId = fields.legacy === true ? 1 : 0
  } else if (type === "hysteria2") {
    node.password = asString(fields.auth)
    node.up = fields.bandwidth
    node.obfs = asString(fields.obfs)
    node["obfs-password"] = asString(fields.obfs_password)
  } else if (type === "tuic") {
    node.uuid = asString(fields.uuid)
    node.password = asString(fields.password)
  } else if (type === "snell") {
    node.psk = asString(fields.psk)
    node.version = fields.version
    node.obfs = asString(fields.obfs)
    node["obfs-host"] = asString(fields.obfs_host)
  } else if (type === "ssh") {
    node.username = asString(fields.username)
    node.password = asString(fields.password)
    node["private-key"] = asString(fields.private_key)
  } else if (type === "http" || type === "socks5") {
    node.username = asString(fields.username)
    node.password = asString(fields.password)
  } else node.password = asString(fields.password)
  const websocket = asRecord(fields.websocket)
  if (websocket) {
    node.network = "ws"
    node["ws-opts"] = {
      path: websocket.path,
      headers: websocket.host === void 0 ? void 0 : { Host: websocket.host },
    }
  }
  const transport = asRecord(fields.transport)
  if (transport) egernTransport(node, transport)
  const shadowTls = asRecord(fields.shadow_tls)
  if (shadowTls) {
    node.plugin = "shadow-tls"
    node["plugin-opts"] = {
      host: shadowTls.sni,
      password: shadowTls.password,
      version: 3,
    }
  }
  const reality = egernReality(fields.reality)
  if (reality) node["reality-opts"] = reality
  return node
}
//#endregion
//#region src/core/nodes/formats/proxy-object.ts
/**
 * Reads a proxy the way the Clash family and the canonical model write one: an object that names its
 * own `type`, `server` and `port`.
 *
 * All this does is decide whether an entry is that shape; the entry travels on exactly as the
 * document wrote it, and every normalization it needs is `pipeline/canonicalize.ts`'s.
 *
 * A `type` key is the shape signal, not a completeness one: `structured.ts` reads `null` here to
 * decide whether to try the Egern shape instead, because an Egern proxy is the one shape that carries
 * no usable `type` — its protocol is the key it hangs under. Once a `type` is present this parser
 * owns the entry, even one missing `server` or `port`; whether that is enough to canonicalize is
 * Parse Validation's question.
 */
function readStructuredProxy(value) {
  const input = asRecord(value)
  if (!input) return null
  if (String(input.type ?? "").length === 0) return null
  return input
}
//#endregion
//#region src/core/nodes/formats/proxy-uri.ts
/**
 * Protocol URIs, read into drafts.
 *
 * `udp`, the TLS a protocol runs on by definition, and the VMess cipher and `alterId` are decided
 * once in `pipeline/canonicalize.ts`, which runs on every draft this returns. A copy here is how the
 * same answer came to differ per input format.
 *
 * What stays is what that stage cannot see, or cannot place: a key it never reads, a repeated
 * parameter it would only see one of, a value the URI actually stated — every rule there defers to a
 * statement, so deleting one silently gains the node a setting its source refused — and two `udp`
 * writes kept for where they put the key. Each is marked at its own line.
 */
function decode(value, fallback = "") {
  if (!value) return fallback
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}
/**
 * The readable fallback name is canonicalize's rule too, but not the trim — and the trim is what keeps
 * this here: a `#%20%20` fragment is a name of two spaces, which the shared rule reads as a stated
 * value and canonical validation then accepts. Trimming turns it back into silence.
 */
function named(node) {
  return {
    ...node,
    name: node.name?.trim() || `${node.type} ${node.server}:${node.port}`,
  }
}
/**
 * Takes a parsed `URL` rather than the line: three of the callers below need the same `URL` for
 * fields this cannot reach, and handing the string back for a second parse is how they came to
 * build one twice per node.
 */
function urlNode(url, type) {
  const query = url.searchParams
  const node = named({
    type,
    name: decode(url.hash.slice(1)),
    server: url.hostname,
    port: integer(url.port, query.get("security") === "tls" ? 443 : 0),
  })
  if (url.username) node.username = decode(url.username)
  if (url.password) node.password = decode(url.password)
  if (type === "socks5" && url.username && !url.password) {
    const decoded = decodeBase64(decode(url.username))
    const at = decoded?.indexOf(":") ?? -1
    if (decoded && at > 0 && !decoded.slice(at + 1).includes(":")) {
      node.username = decoded.slice(0, at)
      node.password = decoded.slice(at + 1)
    }
  }
  for (const [key, value] of query) node[key] = value
  const udp = booleanFlag(query.get("udp"))
  if (udp != null) node.udp = udp
  const insecure = booleanFlag(
    query.get("insecure") ?? query.get("allowInsecure") ?? query.get("allow_insecure"),
  )
  if (insecure != null) node["skip-cert-verify"] = insecure
  delete node.insecure
  delete node.allowInsecure
  delete node.allow_insecure
  return node
}
function parseShadowsocks(line) {
  let body = line.slice(5)
  const hashIndex = body.indexOf("#")
  const name = hashIndex !== -1 ? decode(body.slice(hashIndex + 1)) : ""
  if (hashIndex !== -1) body = body.slice(0, hashIndex)
  const queryIndex = body.indexOf("?")
  const query = new URLSearchParams(queryIndex !== -1 ? body.slice(queryIndex + 1) : "")
  if (queryIndex !== -1) body = body.slice(0, queryIndex)
  if (!body.includes("@")) body = decodeBase64(body)
  const at = body.lastIndexOf("@")
  if (at === -1) throw new Error("Shadowsocks URI is missing its server information")
  let userInfo = decode(body.slice(0, at))
  if (!userInfo.includes(":")) userInfo = decodeBase64(userInfo)
  const separator = userInfo.indexOf(":")
  const endpoint = new URL(`http://${body.slice(at + 1)}`)
  const node = named({
    type: "ss",
    name,
    server: endpoint.hostname,
    port: integer(endpoint.port),
    cipher: userInfo.slice(0, separator),
    password: userInfo.slice(separator + 1),
    udp: false,
  })
  const statedUdp = booleanFlag(query.get("udp"))
  if (statedUdp != null) node.udp = statedUdp
  const plugin = query.get("plugin")
  if (plugin) {
    const [pluginName, ...options] = decode(plugin).split(";")
    node.plugin = pluginName
    node["plugin-opts"] = Object.fromEntries(
      options.map((option) => {
        const [key, ...rest] = option.split("=")
        if (rest.length === 0) return [key, true]
        const text = rest.join("=")
        return [
          key,
          pluginName === "shadow-tls" && key === "version" && /^\d+$/.test(text)
            ? Number(text)
            : text,
        ]
      }),
    )
  }
  return node
}
function parseShadowsocksR(line) {
  const [main, query = ""] = decodeBase64(line.slice(6)).split("/?")
  const parts = main.split(":")
  if (parts.length < 6) throw new Error("ShadowsocksR URI has too few fields")
  const [server, port, protocol, cipher, obfs, ...passwordParts] = parts
  const params = new URLSearchParams(query)
  return named({
    "type": "ssr",
    "name": params.get("remarks") ? decodeBase64(params.get("remarks") ?? "") : "",
    server,
    "port": integer(port),
    protocol,
    cipher,
    obfs,
    "password": decodeBase64(passwordParts.join(":")),
    "protocol-param": params.get("protoparam")
      ? decodeBase64(params.get("protoparam") ?? "")
      : void 0,
    "obfs-param": params.get("obfsparam") ? decodeBase64(params.get("obfsparam") ?? "") : void 0,
  })
}
function parseVmess(line) {
  const value = JSON.parse(decodeBase64(line.slice(8)))
  const stated = String(value.net ?? "tcp")
  const headerType = String(value.type ?? "")
  const network =
    stated === "tcp" && headerType === "http" ? "http" : stated === "http" ? "h2" : stated
  const node = named({
    type: "vmess",
    name: String(value.ps ?? ""),
    server: String(value.add ?? ""),
    port: integer(value.port),
    uuid: String(value.id ?? ""),
    alterId: value.aid,
    cipher: String(value.scy ?? ""),
    network,
    tls: value.tls === "tls" || value.tls === true,
    udp: true,
  })
  if (value.sni) node.sni = String(value.sni)
  if (value.fp) node["client-fingerprint"] = String(value.fp)
  if (value.alpn) node.alpn = String(value.alpn).split(",")
  if (network === "ws") {
    const earlyData = extractEarlyData(value.path, value.ed)
    node["ws-opts"] = {
      "path": earlyData.path,
      "headers": value.host ? { Host: String(value.host) } : void 0,
      "max-early-data": earlyData.maxEarlyData,
      "early-data-header-name":
        earlyData.maxEarlyData != null ? String(value.eh ?? "Sec-WebSocket-Protocol") : void 0,
    }
  }
  if (network === "grpc") node["grpc-opts"] = { "grpc-service-name": String(value.path ?? "") }
  if (network === "http" || network === "h2") {
    const host = value.host
      ? String(value.host)
          .split(",")
          .map((entry) => entry.trim())
      : void 0
    node[`${network}-opts`] = {
      path: value.path === void 0 ? void 0 : [String(value.path)],
      ...(network === "h2" ? { host } : { headers: host ? { Host: host } : void 0 }),
    }
  }
  return node
}
function parseVlessOrTrojan(line, type) {
  const url = new URL(line)
  const query = url.searchParams
  const network = query.get("type") || "tcp"
  const node = named({
    type,
    name: decode(url.hash.slice(1)),
    server: url.hostname,
    port: integer(url.port, 443),
    network,
    tls:
      type === "trojan"
        ? query.get("security") !== "none"
        : ["tls", "reality"].includes(query.get("security") ?? ""),
    udp: true,
  })
  if (type === "vless") node.uuid = decode(url.username)
  else node.password = decode(url.username)
  const encryption = type === "vless" ? query.get("encryption") : null
  const flow = query.get("flow")
  const sni = query.get("sni")
  const fingerprint = query.get("fp")
  if (encryption) node.encryption = encryption
  if (flow) node.flow = flow
  if (sni) node.sni = sni
  if (fingerprint) node["client-fingerprint"] = fingerprint
  const alpn = query.get("alpn")
  if (alpn) node.alpn = alpnList(alpn)
  const insecure = booleanFlag(query.get("allowInsecure") ?? query.get("insecure"))
  if (insecure != null) node["skip-cert-verify"] = insecure
  if (query.get("security") === "reality")
    node["reality-opts"] = {
      "public-key": query.get("pbk") ?? "",
      "short-id": query.get("sid") ?? "",
      "spider-x": query.get("spx") ?? void 0,
    }
  if (network === "ws") {
    const earlyData = extractEarlyData(query.get("path"), query.get("ed"))
    node["ws-opts"] = {
      "path": earlyData.path,
      "headers": query.get("host") ? { Host: query.get("host") } : void 0,
      "max-early-data": earlyData.maxEarlyData,
      "early-data-header-name":
        earlyData.maxEarlyData != null ? (query.get("eh") ?? "Sec-WebSocket-Protocol") : void 0,
    }
  } else if (network === "grpc")
    node["grpc-opts"] = {
      "grpc-service-name": query.get("serviceName") ?? "",
      ...(query.get("mode") ? { mode: query.get("mode") } : {}),
    }
  else if (network === "xhttp" || network === "splithttp") {
    node.network = "xhttp"
    node["xhttp-opts"] = Object.fromEntries(
      ["host", "path", "mode", "extra"].flatMap((key) => {
        const value = query.get(key)
        if (value == null) return []
        if (key !== "extra") return [[key, value]]
        try {
          return [[key, JSON.parse(value)]]
        } catch {
          return [[key, value]]
        }
      }),
    )
  } else if (network === "httpupgrade") {
    const earlyData = extractEarlyData(query.get("path"), query.get("ed"))
    node["httpupgrade-opts"] = {
      "host": query.get("host") ?? void 0,
      "path": earlyData.path,
      "max-early-data": earlyData.maxEarlyData,
      "early-data-header-name":
        earlyData.maxEarlyData != null ? (query.get("eh") ?? "Sec-WebSocket-Protocol") : void 0,
    }
  }
  return node
}
/**
 * The secret sits in the user position, which is the one field `urlNode` cannot place: a Hysteria 2
 * URI has no separate user name, so what looks like one is the password. `sni`, `obfs`,
 * `obfs-password` and `insecure` need nothing here — the shared query copy and the shared `insecure`
 * rule already carry all four.
 */
function parseHysteria2(line) {
  const url = new URL(line.replace(/^hy2:/, "hysteria2:"))
  const node = urlNode(url, "hysteria2")
  node.password = decode(url.username || url.password)
  return node
}
/**
 * Hysteria 1 spells every field its own way — `auth`, `peer`, `upmbps` — and the secret may arrive in
 * the user position or in the query. The canonical node keeps the Clash names, so each renderer
 * translates from one shape instead of from the query string.
 */
function parseHysteria(line) {
  const url = new URL(line)
  const query = url.searchParams
  const node = urlNode(url, "hysteria")
  node["auth-str"] = decode(url.username || url.password || query.get("auth")) || void 0
  node.protocol = query.get("protocol") ?? "udp"
  node.sni = query.get("peer") ?? query.get("sni") ?? void 0
  node.up = query.get("upmbps") ?? query.get("up") ?? void 0
  node.down = query.get("downmbps") ?? query.get("down") ?? void 0
  node.obfs = query.get("obfs") ?? void 0
  if (node.alpn !== void 0) node.alpn = alpnList(node.alpn)
  for (const key of ["auth", "peer", "upmbps", "downmbps", "password"]) delete node[key]
  return node
}
function parseWireGuard(line) {
  const url = new URL(line.replace(/^wg:/, "wireguard:"))
  const node = urlNode(url, "wireguard")
  node["private-key"] = decode(url.username)
  delete node.username
  node["public-key"] =
    url.searchParams.get("publickey") ?? url.searchParams.get("public-key") ?? void 0
  node["pre-shared-key"] =
    url.searchParams.get("presharedkey") ?? url.searchParams.get("pre-shared-key") ?? void 0
  applyWireGuardAddresses(node, url.searchParams.getAll("address"))
  node.reserved = url.searchParams
    .get("reserved")
    ?.split(/[-,]/)
    .map((item) => integer(item))
  node.mtu = integer(url.searchParams.get("mtu"), 0) || void 0
  return node
}
function parseTuic(line) {
  const node = urlNode(new URL(line), "tuic")
  node.uuid = node.username
  delete node.username
  return node
}
function parseUri(line) {
  const scheme = /^([a-zA-Z][\w+.-]*):\/\//.exec(line)?.[1]?.toLowerCase()
  switch (scheme) {
    case "ss":
      return parseShadowsocks(line)
    case "ssr":
      return parseShadowsocksR(line)
    case "vmess":
      return parseVmess(line)
    case "vless":
      return parseVlessOrTrojan(line, "vless")
    case "trojan":
      return parseVlessOrTrojan(line, "trojan")
    case "hysteria2":
    case "hy2":
      return parseHysteria2(line)
    case "hysteria":
      return parseHysteria(line)
    case "tuic":
      return parseTuic(line)
    case "wireguard":
    case "wg":
      return parseWireGuard(line)
    case "socks":
    case "socks5":
      return urlNode(new URL(line), "socks5")
    case "http":
    case "https": {
      const node = urlNode(new URL(line), "http")
      node.tls = scheme === "https"
      return node
    }
    case "anytls": {
      const node = urlNode(new URL(line), "anytls")
      node.password = node.username
      delete node.username
      return node
    }
    default:
      return null
  }
}
//#endregion
//#region src/core/nodes/formats/node-lines.ts
const URI_SCHEME = /^[a-z][a-z0-9+.-]*:\/\//i
/** Only whitespace that is followed by another `scheme://` starts a new node. */
const URI_BOUNDARY = /\s+(?=[a-z][a-z0-9+.-]*:\/\/)/i
/**
 * Subscriptions are often pasted with every URI on one line, separated by spaces. Splitting on the
 * boundary rather than on all whitespace keeps an unencoded `#Hong Kong` in one piece, and leaves
 * non-URI lines (platform rows, JSON) to their own parsers.
 */
function splitUriLine(line) {
  if (!URI_SCHEME.test(line)) return [line]
  return line.split(URI_BOUNDARY)
}
/**
 * What to call a list of lines. One recognised line format names the whole source; several, or none,
 * make it `mixed`. Protocol URIs are the one format whose name is not its own — a list of them is a
 * `uri-list` — and a Base64 envelope prefixes whatever the answer was.
 */
function lineListFormat(formats, encoded) {
  const only = formats.size === 1 ? [...formats][0] : null
  const name = only === "uri" ? "uri-list" : (only ?? "mixed")
  return encoded ? `base64-${name}` : name
}
/**
 * One node per line: protocol URIs, Surge, Loon and Quantumult X proxy rows, and single-line JSON
 * objects. The last reader tried, so also where anything nothing else recognised ends up — every line
 * it cannot read becomes a diagnostic naming that line.
 */
const nodeLinesFormat = {
  id: "node-lines",
  parse: ({ encoded, text }) => {
    const drafts = []
    const diagnostics = []
    const formats = /* @__PURE__ */ new Set()
    for (const [index, rawLine] of text.split(/\r?\n/).entries()) {
      const line = rawLine.trim().replace(/^\s*-\s*/, "")
      if (!line || line.startsWith("#") || line.startsWith("//")) continue
      for (const candidate of splitUriLine(line))
        try {
          const platform = candidate.startsWith("{") ? null : parsePlatformLine(candidate)
          const node = candidate.startsWith("{")
            ? readStructuredProxy(JSON.parse(candidate))
            : (parseUri(candidate) ?? platform?.node ?? null)
          if (platform && node === platform.node) formats.add(platform.format)
          else if (node) formats.add("uri")
          if (node)
            drafts.push({
              value: node,
              line: index + 1,
            })
          else
            diagnostics.push({
              level: "warning",
              stage: "parse",
              code: "unsupported-input-line",
              message: "Unrecognised node format on this line.",
              line: index + 1,
            })
        } catch (error) {
          diagnostics.push({
            level: "warning",
            stage: "parse",
            code: "invalid-input-line",
            message: error instanceof Error ? error.message : "Node parsing failed.",
            line: index + 1,
          })
        }
    }
    return {
      format: lineListFormat(formats, encoded),
      drafts,
      diagnostics,
    }
  },
}
//#endregion
//#region src/core/nodes/formats/sing-box.ts
const SKIPPED_TYPES = /* @__PURE__ */ new Set([
  "direct",
  "block",
  "dns",
  "selector",
  "urltest",
  "bridge",
])
const TYPE_TO_CANONICAL$1 = {
  shadowsocks: "ss",
  socks: "socks5",
}
/**
 * A Shadowsocks outbound's plugin options, in either shape they arrive in: the `;`-delimited string
 * sing-box writes, and the record `mergeShadowTls` folds a Shadow-TLS wrapper back into. Reading only
 * the string drops the host, password and version of every Shadow-TLS proxy in a configuration we
 * wrote ourselves, leaving `shadowTls()` unable to see a plugin at all.
 */
function parsePluginOptions(value) {
  const record = asRecord(value)
  if (record) return compactRecord(record)
  if (typeof value !== "string" || !value) return
  return Object.fromEntries(
    value.split(";").map((option) => {
      const [key, ...rest] = option.split("=")
      return [key, rest.length > 0 ? rest.join("=") : true]
    }),
  )
}
function parseTransport(node, value) {
  const transport = asRecord(value)
  const type = asString(transport?.type)
  if (!transport || !type) return
  node.network = type === "websocket" ? "ws" : type
  if (type === "ws" || type === "websocket") {
    const earlyData = extractEarlyData(transport.path, transport.max_early_data)
    node["ws-opts"] = compactRecord({
      "path": earlyData.path,
      "headers": asRecord(transport.headers),
      "max-early-data": earlyData.maxEarlyData,
      "early-data-header-name": asString(transport.early_data_header_name),
    })
  } else if (type === "grpc")
    node["grpc-opts"] = compactRecord({
      "grpc-service-name": asString(transport.service_name),
      "idle-timeout": asString(transport.idle_timeout),
      "ping-timeout": asString(transport.ping_timeout),
      "permit-without-stream": asBoolean(transport.permit_without_stream),
    })
  else if (type === "http")
    node["http-opts"] = compactRecord({
      host: stringArray(transport.host),
      path: asString(transport.path),
      method: asString(transport.method),
      headers: asRecord(transport.headers),
    })
  else if (type === "httpupgrade") {
    const earlyData = extractEarlyData(transport.path)
    node["httpupgrade-opts"] = compactRecord({
      host: asString(transport.host),
      path: earlyData.path,
      headers: asRecord(transport.headers),
    })
  }
}
function canonicalTls(node, value) {
  const tls = asRecord(value)
  if (!tls) return
  if (tls.enabled === false) {
    node.tls = false
    return
  }
  node.tls = true
  const serverName = asString(tls.server_name)
  const insecure = asBoolean(tls.insecure)
  const alpn = stringArray(tls.alpn)
  const utls = asRecord(tls.utls)
  const reality = asRecord(tls.reality)
  if (serverName) node.sni = serverName
  if (insecure !== void 0) node["skip-cert-verify"] = insecure
  if (alpn) node.alpn = alpn
  if (asString(utls?.fingerprint)) node["client-fingerprint"] = utls?.fingerprint
  if (reality?.enabled !== false && (reality?.public_key || reality?.short_id))
    node["reality-opts"] = compactRecord({
      "public-key": asString(reality.public_key),
      "short-id": asString(reality.short_id),
    })
}
function parseOutbound$1(input) {
  const sourceType = asString(input.type)
  if (!sourceType) return null
  const peer = sourceType === "wireguard" ? (asRecord(asArray(input.peers)[0]) ?? {}) : {}
  const server = asString(input.server ?? peer.address)
  const port = asPort(input.server_port ?? peer.port)
  if (!server || !port) return null
  const type = TYPE_TO_CANONICAL$1[sourceType] ?? sourceType
  const node = canonicalNode(input, type, server, port)
  if (type === "ss") {
    node.cipher = asString(input.method)
    node.password = asString(input.password)
    node.plugin = asString(input.plugin)
    node["plugin-opts"] = parsePluginOptions(input.plugin_opts ?? input.plugin_options)
  } else if (type === "socks5" || type === "http") {
    node.username = asString(input.username)
    node.password = asString(input.password)
  } else if (type === "vmess") {
    node.uuid = asString(input.uuid)
    node.cipher = asString(input.security) ?? "auto"
    node.alterId = input.alter_id
    node["packet-encoding"] = asString(input.packet_encoding)
  } else if (type === "vless") {
    node.uuid = asString(input.uuid)
    node.flow = asString(input.flow)
    node["packet-encoding"] = asString(input.packet_encoding)
  } else if (["trojan", "hysteria2", "tuic", "anytls"].includes(type))
    node.password = asString(input.password)
  else if (type === "hysteria") {
    node["auth-str"] = asString(input.auth_str)
    node.obfs = asString(input.obfs)
    node.up = input.up ?? input.up_mbps
    node.down = input.down ?? input.down_mbps
  } else if (type === "ssh") {
    node.username = asString(input.user)
    node.password = asString(input.password)
    node["private-key"] = asString(input.private_key)
  } else if (type === "wireguard") {
    node["private-key"] = asString(input.private_key)
    node["public-key"] = asString(input.peer_public_key ?? peer.public_key)
    node["pre-shared-key"] = asString(input.pre_shared_key ?? peer.pre_shared_key)
    node.reserved = Array.isArray(input.reserved ?? peer.reserved)
      ? (input.reserved ?? peer.reserved)
      : void 0
    node.mtu = input.mtu
    if (Array.isArray(peer.allowed_ips)) node["allowed-ips"] = peer.allowed_ips.join(",")
    applyWireGuardAddresses(node, input.local_address ?? input.address)
  }
  if (type === "hysteria2") {
    const obfs = asRecord(input.obfs)
    node.obfs = asString(obfs?.type)
    node["obfs-password"] = asString(obfs?.password)
    node.up = input.up_mbps
    node.down = input.down_mbps
  } else if (type === "tuic") {
    node.uuid = asString(input.uuid)
    node["congestion-controller"] = asString(input.congestion_control)
    node["udp-relay-mode"] = asString(input.udp_relay_mode)
    node["zero-rtt"] = asBoolean(input.zero_rtt_handshake)
  }
  canonicalTls(node, input.tls)
  parseTransport(node, input.transport)
  return node
}
/** Folds the Shadow-TLS outbound a proxy detours through back into the proxy itself. */
function mergeShadowTls(input, wrappers) {
  const detour = asString(input?.detour)
  const wrapper = detour === void 0 ? void 0 : wrappers.get(detour)
  if (!input || !wrapper) return input
  return {
    ...input,
    server: input.server ?? wrapper.server,
    server_port: input.server_port ?? wrapper.server_port,
    detour: void 0,
    plugin: "shadow-tls",
    plugin_opts: {
      host: asString(asRecord(wrapper.tls)?.server_name),
      password: asString(wrapper.password),
      version: wrapper.version,
    },
  }
}
function detect$1(value) {
  const root = asRecord(value)
  return [...asArray(root?.outbounds), ...asArray(root?.endpoints)].some((item) =>
    Boolean(asString(asRecord(item)?.type)),
  )
}
function parseConfig(value) {
  const diagnostics = []
  const root = asRecord(value)
  const outbounds = [...asArray(root?.outbounds), ...asArray(root?.endpoints)]
  const wrappers = /* @__PURE__ */ new Map()
  for (const item of outbounds) {
    const input = asRecord(item)
    const tag = asString(input?.tag)
    if (input && tag && asString(input.type) === "shadowtls") wrappers.set(tag, input)
  }
  return {
    drafts: outbounds.flatMap((item, index) => {
      const input = mergeShadowTls(asRecord(item), wrappers)
      const type = asString(input?.type)
      if (type === "shadowtls" || (type && SKIPPED_TYPES.has(type))) return []
      const node = input ? parseOutbound$1(input) : null
      if (node)
        return [
          {
            value: node,
            index,
          },
        ]
      diagnostics.push({
        level: "warning",
        stage: "parse",
        code: "invalid-sing-box-outbound",
        message: `sing-box outbound #${index + 1} is unsupported or missing server/server_port; skipped.`,
      })
      return []
    }),
    diagnostics,
  }
}
/**
 * A sing-box configuration, read.
 *
 * The writing half lives in `targets/sing-box.ts`, the same split every other bidirectional format
 * here has. What the two halves share — the canonical type aliases — is `pipeline/canonicalize.ts`'s.
 */
const singBoxFormat = {
  id: "sing-box",
  parse: (source) => {
    const value = source.document()
    if (!detect$1(value)) return null
    const { drafts, diagnostics } = parseConfig(value)
    return {
      format: "sing-box",
      drafts,
      diagnostics,
    }
  },
}
//#endregion
//#region src/core/nodes/formats/ssd.ts
function pluginOptions(value) {
  if (typeof value !== "string" || !value) return
  return Object.fromEntries(
    value.split(";").flatMap((item) => {
      const [key, ...rest] = item.split("=")
      return key ? [[key, rest.length > 0 ? rest.join("=") : true]] : []
    }),
  )
}
function parseSsd(source) {
  if (!source.trim().startsWith("ssd://")) return null
  const diagnostics = []
  try {
    const document = JSON.parse(decodeBase64(source.trim().slice(6)))
    return {
      format: "ssd",
      drafts: (document.servers ?? []).flatMap((server, index) => {
        const host = String(server.server ?? "")
        const port = Number(server.port ?? document.port)
        if (!host || !Number.isInteger(port) || port <= 0) {
          diagnostics.push({
            level: "warning",
            stage: "parse",
            code: "invalid-ssd-node",
            message: `SSD node #${index + 1} is missing server or port; skipped.`,
          })
          return []
        }
        const plugin = String(server.plugin ?? document.plugin ?? "") || void 0
        const node = {
          type: "ss",
          name: String(server.remarks ?? `${document.airport ?? "SSD"} ${index + 1}`),
          server: host,
          port,
          cipher: String(server.encryption ?? document.encryption ?? ""),
          password: String(server.password ?? document.password ?? ""),
          udp: true,
        }
        if (plugin) {
          node.plugin = plugin
          node["plugin-opts"] = pluginOptions(server.plugin_options ?? document.plugin_options)
        }
        return [
          {
            value: node,
            index,
          },
        ]
      }),
      diagnostics,
    }
  } catch (error) {
    return {
      format: "ssd",
      drafts: [],
      diagnostics: [
        {
          level: "error",
          stage: "parse",
          code: "invalid-ssd",
          message:
            error instanceof Error
              ? `SSD subscription could not be parsed: ${error.message}`
              : "SSD subscription could not be parsed.",
        },
      ],
    }
  }
}
/** SSD is its own envelope: a Base64 JSON document listing one airport's Shadowsocks servers. */
const ssdFormat = {
  id: "ssd",
  parse: ({ text }) => parseSsd(text),
}
//#endregion
//#region src/core/nodes/formats/structured.ts
/**
 * Where a document of this shape keeps its proxies, whichever of the two spellings it uses.
 *
 * No skip list for the `direct`/`block`/`selector` outbounds a sing-box or Xray config carries: one
 * of those names *is* a `type`, and an `outbounds` array holding any entry with a `type` is claimed
 * by `formats/sing-box.ts` before this reader is offered the source. Only an `outbounds` list where
 * no entry names a type or a protocol arrives here, and there is nothing in one for such a list to
 * skip. What the entries are is `readStructuredProxy`'s question; the array's shape is this one's.
 */
function proxyEntries(value) {
  if (Array.isArray(value)) return value
  if (!value || typeof value !== "object") return null
  const record = value
  if (Array.isArray(record.proxies)) return record.proxies
  if (Array.isArray(record.outbounds))
    return record.outbounds.filter((item) => item && typeof item === "object")
  return null
}
/**
 * JSON and YAML documents: Clash-family proxy lists, Egern proxy lists and the canonical model
 * itself. A sing-box, Xray or V2Ray configuration is caught earlier, by `formats/sing-box.ts`,
 * `formats/xray.ts` and `formats/v2ray.ts` — none of them ever reach this reader.
 *
 * The format is named by what the entries turned out to be, not by how the document parsed.
 *
 * Every entry becomes a draft, complete or not: this parser only tells a canonical-shaped entry from
 * an Egern-shaped one. Whether an entry is complete enough to canonicalize is Parse Validation's.
 */
const structuredFormat = {
  id: "structured",
  parse: ({ text, document }) => {
    const value = document()
    if (value === null) return null
    const entries = proxyEntries(value)
    if (!entries) return null
    let egern = false
    const drafts = entries.map((item, index) => {
      const structuredNode = readStructuredProxy(item)
      const egernNode = structuredNode === null ? parseEgernProxy(item) : null
      if (egernNode) egern = true
      return {
        value: structuredNode ?? egernNode ?? asRecord(item) ?? {},
        index,
      }
    })
    return {
      format: egern ? "egern" : text.startsWith("{") || text.startsWith("[") ? "json" : "yaml",
      drafts,
      diagnostics: [],
    }
  },
}
//#endregion
//#region src/core/nodes/formats/xray.ts
const SKIPPED_PROTOCOLS = /* @__PURE__ */ new Set(["freedom", "blackhole", "dns", "loopback"])
const TYPE_TO_CANONICAL = {
  shadowsocks: "ss",
  socks: "socks5",
}
function applyStreamSettings(node, value) {
  const stream = asRecord(value)
  if (!stream) return
  const sourceMethod = asString(stream.method) ?? asString(stream.network) ?? "raw"
  const network =
    sourceMethod === "raw" || sourceMethod === "tcp"
      ? "tcp"
      : sourceMethod === "websocket"
        ? "ws"
        : sourceMethod === "mkcp"
          ? "kcp"
          : sourceMethod
  node.network = network
  if (network === "ws") {
    const options = asRecord(stream.wsSettings)
    const earlyData = extractEarlyData(options?.path, options?.maxEarlyData)
    node["ws-opts"] = compactRecord({
      "path": earlyData.path,
      "headers": asRecord(options?.headers) ?? void 0,
      "max-early-data": earlyData.maxEarlyData,
      "early-data-header-name": asString(options?.earlyDataHeaderName),
    })
  } else if (network === "grpc") {
    const options = asRecord(stream.grpcSettings)
    node["grpc-opts"] = compactRecord({
      "grpc-service-name": asString(options?.serviceName),
      "multi-mode": asBoolean(options?.multiMode),
      "idle-timeout": options?.idle_timeout,
      "health-check-timeout": options?.health_check_timeout,
    })
  } else if (network === "xhttp") node["xhttp-opts"] = asRecord(stream.xhttpSettings) ?? {}
  else if (network === "httpupgrade") {
    const options = asRecord(stream.httpupgradeSettings)
    const earlyData = extractEarlyData(options?.path, options?.maxEarlyData)
    node["httpupgrade-opts"] = compactRecord({
      "host": asString(options?.host),
      "path": earlyData.path,
      "headers": asRecord(options?.headers) ?? void 0,
      "max-early-data": earlyData.maxEarlyData,
      "early-data-header-name": asString(options?.earlyDataHeaderName),
    })
  } else if (network === "kcp") node["kcp-opts"] = asRecord(stream.kcpSettings) ?? {}
  const security = asString(stream.security)
  if (security === "tls") {
    const tls = asRecord(stream.tlsSettings)
    node.tls = true
    node.sni = asString(tls?.serverName)
    node["skip-cert-verify"] = asBoolean(tls?.allowInsecure)
    node.alpn = stringArray(tls?.alpn)
    node["client-fingerprint"] = asString(tls?.fingerprint)
  } else if (security === "reality") {
    const reality = asRecord(stream.realitySettings)
    node.tls = true
    node.sni = asString(reality?.serverName)
    node["client-fingerprint"] = asString(reality?.fingerprint)
    node["reality-opts"] = compactRecord({
      "public-key": asString(reality?.publicKey),
      "short-id": asString(reality?.shortId),
      "spider-x": asString(reality?.spiderX),
    })
  }
}
function currentSettings(input) {
  const settings = asRecord(input.settings)
  const server = asString(settings?.address)
  const port = asPort(settings?.port)
  return server && port
    ? [
        {
          server,
          port,
          user: settings,
        },
      ]
    : []
}
function legacySettings(input, protocol) {
  const settings = asRecord(input.settings)
  if (!settings) return []
  if (protocol === "vmess" || protocol === "vless")
    return asArray(settings.vnext).flatMap((entry) => {
      const endpoint = asRecord(entry)
      const server = asString(endpoint?.address)
      const port = asPort(endpoint?.port)
      if (!server || !port) return []
      const users = asArray(endpoint?.users)
      return (users.length > 0 ? users : [{}]).flatMap((user) => {
        const record = asRecord(user)
        return record
          ? [
              {
                server,
                port,
                user: record,
              },
            ]
          : []
      })
    })
  return asArray(settings.servers).flatMap((entry) => {
    const endpoint = asRecord(entry)
    const server = asString(endpoint?.address)
    const port = asPort(endpoint?.port)
    if (!endpoint || !server || !port) return []
    const users = asArray(endpoint.users)
    return users.length > 0
      ? users.flatMap((user) => {
          const record = asRecord(user)
          return record
            ? [
                {
                  server,
                  port,
                  user: {
                    ...endpoint,
                    ...record,
                  },
                },
              ]
            : []
        })
      : [
          {
            server,
            port,
            user: endpoint,
          },
        ]
  })
}
function parseOutbound(input) {
  const protocol = asString(input.protocol)
  if (!protocol) return []
  const type = TYPE_TO_CANONICAL[protocol] ?? protocol
  const endpoints = [...currentSettings(input), ...legacySettings(input, protocol)]
  return endpoints.map(({ server, port, user }, index) => {
    const node = canonicalNode(input, type, server, port)
    if (endpoints.length > 1) node.name = `${node.name} ${index + 1}`
    if (type === "vmess") {
      node.uuid = asString(user.id)
      node.cipher = asString(user.security) ?? "auto"
      node.alterId = user.alterId
    } else if (type === "vless") {
      node.uuid = asString(user.id)
      node.flow = asString(user.flow)
      node.encryption = asString(user.encryption) ?? "none"
    } else if (type === "ss") {
      node.cipher = asString(user.method)
      node.password = asString(user.password)
    } else if (type === "trojan") node.password = asString(user.password)
    else if (type === "socks5" || type === "http") {
      node.username = asString(user.user)
      node.password = asString(user.pass)
    }
    applyStreamSettings(node, input.streamSettings)
    return node
  })
}
function detect(value) {
  return asArray(asRecord(value)?.outbounds).some((item) =>
    Boolean(asString(asRecord(item)?.protocol)),
  )
}
/**
 * Parses an Xray `outbounds` list into canonical nodes. Exported so `formats/v2ray.ts` can reuse it
 * verbatim: Xray forked V2Ray and kept the outbound shape.
 */
function parseXrayOutbounds(value) {
  const diagnostics = []
  return {
    drafts: asArray(asRecord(value)?.outbounds).flatMap((item, index) => {
      const input = asRecord(item)
      const protocol = asString(input?.protocol)
      if (protocol && SKIPPED_PROTOCOLS.has(protocol)) return []
      const parsed = input ? parseOutbound(input) : []
      if (parsed.length > 0)
        return parsed.map((node) => ({
          value: node,
          index,
        }))
      diagnostics.push({
        level: "warning",
        stage: "parse",
        code: "invalid-xray-outbound",
        message: `Xray outbound #${index + 1} is unsupported or missing connection parameters; skipped.`,
      })
      return []
    }),
    diagnostics,
  }
}
//#endregion
//#region src/core/nodes/formats/index.ts
/**
 * Every way a subscription can be read, in the order they are tried. The order is the detection
 * rule: cheap unambiguous answers first, structured documents before lines so a YAML proxy list is
 * not read a line at a time, and the line reader last because it accepts anything and reports
 * whatever it could not read.
 *
 * `singBoxFormat`, `v2rayFormat`, `xrayFormat` and `mieruFormat` run before `structuredFormat`, or
 * the generic `proxies`/`outbounds` reader takes them and reports the wrong format name — and a
 * Mieru `profiles` document the generic reader cannot claim would fall to the line reader, one
 * unreadable-line warning per line. V2Ray before Xray: both `detect` functions match an outbound
 * list, V2Ray's is the narrower one, and whichever matches first decides the reported name.
 */
const FORMATS = [
  emptyFormat,
  htmlFormat,
  ssdFormat,
  singBoxFormat,
  {
    id: "v2ray",
    parse: (source) => {
      const value = source.document()
      if (
        !asArray(asRecord(value)?.outbounds).some((item) => {
          const settings = asRecord(asRecord(item)?.settings)
          return Array.isArray(settings?.vnext) || Array.isArray(settings?.servers)
        })
      )
        return null
      const { drafts, diagnostics } = parseXrayOutbounds(value)
      return {
        format: "v2ray",
        drafts,
        diagnostics,
      }
    },
  },
  {
    id: "xray",
    parse: (source) => {
      const value = source.document()
      if (!detect(value)) return null
      const { drafts, diagnostics } = parseXrayOutbounds(value)
      return {
        format: "xray",
        drafts,
        diagnostics,
      }
    },
  },
  mieruFormat,
  structuredFormat,
  nodeLinesFormat,
]
//#endregion
//#region src/core/nodes/pipeline/parse.ts
/**
 * The first format that recognises the source reads it; the registry order is the detection rule.
 * Why that order, in `formats/index.ts`.
 */
function parseSource(input) {
  for (const format of FORMATS) {
    const output = format.parse(input)
    if (output) return output
  }
  return {
    format: "mixed",
    drafts: [],
    diagnostics: [],
  }
}
//#endregion
//#region src/core/nodes/pipeline/parse-validation.ts
/**
 * Whether a draft is node-shaped enough to canonicalize: it names a protocol, an address and a
 * port a client could dial.
 *
 * The generic answer, for the formats whose completeness is a generic question: whatever a
 * structured entry or a line resolved to, either it names a protocol, an address and a port or it
 * does not. `ssd.ts`, `sing-box.ts` and `xray.ts` still answer this themselves, because for
 * them completeness is a protocol-shape question — a WireGuard peer's address, an Xray
 * legacy-vs-current settings shape — and their own diagnostic names the outbound kind.
 */
function usable(draft) {
  return Boolean(
    asString(String(draft.type ?? "")) &&
    asString(String(draft.server ?? draft.address ?? "")) &&
    asPort(draft.port ?? draft.server_port),
  )
}
function validateDrafts(drafts) {
  const diagnostics = []
  return {
    drafts: drafts.filter((entry) => {
      if (usable(entry.value)) return true
      const position = entry.index === void 0 ? "" : ` #${entry.index + 1}`
      diagnostics.push({
        level: "warning",
        stage: "parse-validation",
        code: "incomplete-node",
        message: `Node${position} is missing type, server or port; skipped.`,
        ...(entry.line === void 0 ? {} : { line: entry.line }),
      })
      return false
    }),
    diagnostics,
  }
}
//#endregion
//#region src/core/nodes/pipeline/capability.ts
/**
 * Whether a client can carry this node at all; the renderer decides how to spell what is left.
 *
 * The only reading of the three fields above: the `"all"` sentinel, a missing `transports` list and
 * the `tcp` default live here rather than at the call sites, so no renderer can check the protocol
 * list and forget what `accepts` had to say.
 */
function acceptsNode(capability, node) {
  if (capability.protocols !== "all" && !capability.protocols.includes(node.type)) return false
  if (capability.accepts && !capability.accepts(node)) return false
  const network = String(node.network || "tcp")
  return (
    capability.transports === "all" ||
    !capability.transports ||
    capability.transports.includes(network)
  )
}
//#endregion
//#region src/core/nodes/pipeline/render.ts
function renamed(node, name) {
  return name === node.name
    ? node
    : {
        ...node,
        name,
      }
}
/**
 * A client keys its policies by proxy name, so two nodes called the same thing leave one of them
 * unreachable — and sing-box refuses to load a configuration with a duplicate tag at all. The second
 * occurrence onwards is numbered rather than dropped.
 *
 * Numbered over the whole list before anything is refused: a node the client cannot carry still
 * consumes its name, and dropping it from the count would renumber every node after it.
 */
function uniqueNames(nodes, target) {
  const counts = /* @__PURE__ */ new Map()
  const taken = /* @__PURE__ */ new Set()
  return nodes.map((node) => {
    let count = counts.get(node.name) ?? 0
    let candidate
    let occupied
    do {
      count += 1
      candidate = renamed(node, count === 1 ? node.name : `${node.name} ${count}`)
      occupied = [
        target.renderedName?.(candidate) ?? candidate.name,
        ...(target.derivedNames?.(candidate) ?? []),
      ]
    } while (occupied.some((name) => taken.has(name)))
    counts.set(node.name, count)
    for (const name of occupied) taken.add(name)
    return candidate
  })
}
/**
 * A diagnostic reaches logs and the interface, where a value holding a line separator would forge a
 * second entry. Every field a refusal interpolates carries remote input — a name from a URI fragment
 * or a YAML `name:`, a type from whatever the source called the protocol — so all of them go through
 * here, not only the one that happened to be noticed.
 */
function scrubbed(value) {
  return String(value).replaceAll(/[\r\n]/g, " ")
}
/**
 * A node can fail to appear for two reasons: the capability lists say the client cannot carry it at
 * all, or the renderer found it could not be spelled. That is the difference between "this client
 * does not do WireGuard" and "this client does TUIC, but not version 4", so the message and the
 * stage both say which.
 *
 * `network` is read with `||` rather than `??`: an empty string is not a transport name, and a node
 * carrying one still runs over TCP.
 */
function refusal(node, target, stage) {
  const name = scrubbed(node.name)
  const type = scrubbed(node.type)
  const network = scrubbed(node.network || "tcp")
  return {
    level: "warning",
    stage,
    code: stage === "capability" ? "capability-refused" : "render-refused",
    message:
      stage === "capability"
        ? `${name} (${type}/${network}) cannot be carried by ${target.id}; skipped.`
        : `${name} (${type}/${network}) has no ${target.id} spelling; skipped.`,
  }
}
/**
 * Capability Check, Target Node Render and Target Node Validation, in that order and for every
 * client the same way. The gate is here rather than in something a target has to remember to call,
 * so it applies to every client in the registry — including the next one added, which is the point.
 *
 * `renderedNodes` is the node list rather than a count because nothing downstream can re-derive it: a
 * node can clear the capability lists and still have no line the renderer can write it on, so this is
 * the only place that knows which ones came out — carrying the names the document gave them.
 */
function renderDocument(nodes, target) {
  const diagnostics = []
  const renderedNodes = []
  const units = []
  for (const node of target.uniqueNames ? uniqueNames(nodes, target) : nodes) {
    if (!acceptsNode(target, node)) {
      diagnostics.push(refusal(node, target, "capability"))
      continue
    }
    const rendered = target.renderNode(node)
    if (rendered === null || rendered.length === 0) {
      diagnostics.push(refusal(node, target, "target-validation"))
      continue
    }
    renderedNodes.push(node)
    units.push(...rendered)
  }
  return {
    content: target.assemble(units),
    diagnostics,
    renderedNodes,
  }
}
//#endregion
//#region src/core/nodes/pipeline/index.ts
/**
 * Reads source text into the canonical node model, whatever format it arrived in, and reports
 * which format that turned out to be. Nothing here fetches, stores or renders: it is the same
 * function in a browser and in a Worker.
 */
function inspectNodeList(source) {
  const parsed = parseSource(prepareInput(source))
  const validated = validateDrafts(parsed.drafts)
  return {
    nodes: validated.drafts.map((entry) => canonicalize(entry.value)),
    detectedFormat: parsed.format,
    diagnostics: [...parsed.diagnostics, ...validated.diagnostics],
  }
}
/** Parse, process, render: the whole pipeline, and the one call a node list is compiled by. */
function compileNodeList(request) {
  const inspected = inspectNodeList(request.source)
  const sourceValidation = validateCanonical(inspected.nodes)
  const sourceNodes = sourceValidation.nodes
  const processed = processNodes(sourceNodes, request.processors)
  const validated = validateCanonical(processed.nodes)
  const definition = targetDefinition(request.target)
  const rendered = renderDocument(validated.nodes, definition)
  return {
    ...inspected,
    sourceNodes,
    nodes: validated.nodes,
    content: rendered.content,
    contentType: definition.contentType,
    fileExtension: definition.fileExtension,
    renderedNodes: rendered.renderedNodes,
    diagnostics: [
      ...inspected.diagnostics,
      ...sourceValidation.diagnostics,
      ...processed.diagnostics,
      ...validated.diagnostics,
      ...rendered.diagnostics,
    ],
  }
}
//#endregion
export {
  readToken as A,
  RATE_LIMITED_MESSAGE as C,
  commitToken as D,
  clearToken as E,
  batch as F,
  createAtom as I,
  toObserver as L,
  useTokenRefused as M,
  useTokenUsable as N,
  hasToken as O,
  useTokenVerified as P,
  INTERNAL_MESSAGE as S,
  authorizeAdminRequest as T,
  ApiError as _,
  TARGET_IDS as a,
  ADMIN_ERROR_CODES as b,
  parseProcessors as c,
  fail as d,
  onlyKeys as f,
  ValidationError as g,
  ConflictError as h,
  validateCanonical as i,
  useToken as j,
  noteTokenRefused as k,
  SET_OPTIONS as l,
  asRecord as m,
  inspectNodeList as n,
  targetDefinition as o,
  text as p,
  MAX_SOURCE_SIZE as r,
  targetLabel as s,
  compileNodeList as t,
  DEDUPE_DEFAULT_FIELDS as u,
  apiErrorFromMessage as v,
  UNAUTHORIZED_MESSAGE as w,
  AdminFailure as x,
  messageWithCode as y,
}
