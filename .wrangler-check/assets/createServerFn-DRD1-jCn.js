import { AsyncLocalStorage } from "node:async_hooks"
import { i as parseRedirect, n as isRedirect } from "./createMiddleware-CkzUAgXb.js"
//#region node_modules/.pnpm/cookie-es@3.1.1/node_modules/cookie-es/dist/index.mjs
function splitSetCookieString(cookiesString) {
  if (Array.isArray(cookiesString)) return cookiesString.flatMap((c) => splitSetCookieString(c))
  if (typeof cookiesString !== "string") return []
  const cookiesStrings = []
  let pos = 0
  let start
  let ch
  let lastComma
  let nextStart
  let cookiesSeparatorFound
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) pos += 1
    return pos < cookiesString.length
  }
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos)
    return ch !== "=" && ch !== ";" && ch !== ","
  }
  while (pos < cookiesString.length) {
    start = pos
    cookiesSeparatorFound = false
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos)
      if (ch === ",") {
        lastComma = pos
        pos += 1
        skipWhitespace()
        nextStart = pos
        while (pos < cookiesString.length && notSpecialChar()) pos += 1
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true
          pos = nextStart
          cookiesStrings.push(cookiesString.slice(start, lastComma))
          start = pos
        } else pos = lastComma + 1
      } else pos += 1
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length)
      cookiesStrings.push(cookiesString.slice(start))
  }
  return cookiesStrings
}
//#endregion
//#region node_modules/.pnpm/@tanstack+router-core@1.171.26/node_modules/@tanstack/router-core/dist/esm/ssr/headers.js
function toHeadersInstance(init) {
  if (init instanceof Headers) return init
  else if (Array.isArray(init)) return new Headers(init)
  else if (typeof init === "object") return new Headers(init)
  else return null
}
function mergeHeaders(...headers) {
  return headers.reduce((acc, header) => {
    const headersInstance = toHeadersInstance(header)
    if (!headersInstance) return acc
    for (const [key, value] of headersInstance.entries())
      if (key === "set-cookie")
        splitSetCookieString(value).forEach((cookie) => acc.append("set-cookie", cookie))
      else acc.set(key, value)
    return acc
  }, new Headers())
}
//#endregion
//#region node_modules/.pnpm/rou3@0.8.1/node_modules/rou3/dist/index.mjs
const NullProtoObj = /* @__PURE__ */ (() => {
  const e = function () {}
  return ((e.prototype = Object.create(null)), Object.freeze(e.prototype), e)
})()
//#endregion
//#region node_modules/.pnpm/srvx@0.11.22/node_modules/srvx/dist/adapters/cloudflare.mjs
const FastURL = URL
const FastResponse = Response
//#endregion
//#region node_modules/.pnpm/h3@2.0.1-rc.20/node_modules/h3/dist/h3-Bz4OPZv_.mjs
function decodePathname(pathname) {
  return decodeURI(pathname.includes("%25") ? pathname.replaceAll("%25", "%2525") : pathname)
}
const kEventNS = "h3.internal.event."
const kEventRes = /* @__PURE__ */ Symbol.for(`${kEventNS}res`)
const kEventResHeaders = /* @__PURE__ */ Symbol.for(`${kEventNS}res.headers`)
const kEventResErrHeaders = /* @__PURE__ */ Symbol.for(`${kEventNS}res.err.headers`)
const H3Event = class {
  app
  req
  url
  context
  static __is_event__ = true
  constructor(req, context, app) {
    this.context = context || req.context || new NullProtoObj()
    this.req = req
    this.app = app
    const _url = req._url
    const url = _url && _url instanceof URL ? _url : new FastURL(req.url)
    if (url.pathname.includes("%")) url.pathname = decodePathname(url.pathname)
    this.url = url
  }
  get res() {
    return (this[kEventRes] ||= new H3EventResponse())
  }
  get runtime() {
    return this.req.runtime
  }
  waitUntil(promise) {
    this.req.waitUntil?.(promise)
  }
  toString() {
    return `[${this.req.method}] ${this.req.url}`
  }
  toJSON() {
    return this.toString()
  }
  get node() {
    return this.req.runtime?.node
  }
  get headers() {
    return this.req.headers
  }
  get path() {
    return this.url.pathname + this.url.search
  }
  get method() {
    return this.req.method
  }
}
const H3EventResponse = class {
  status
  statusText
  get headers() {
    return (this[kEventResHeaders] ||= new Headers())
  }
  get errHeaders() {
    return (this[kEventResErrHeaders] ||= new Headers())
  }
}
const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "")
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) return defaultStatusCode
  if (typeof statusCode === "string") statusCode = Number(statusCode)
  if (statusCode < 100 || statusCode > 599) return defaultStatusCode
  return statusCode
}
const HTTPError = class HTTPError extends Error {
  get name() {
    return "HTTPError"
  }
  status
  statusText
  headers
  cause
  data
  body
  unhandled
  static isError(input) {
    return input instanceof Error && input?.name === "HTTPError"
  }
  static status(status, statusText, details) {
    return new HTTPError({
      ...details,
      statusText,
      status,
    })
  }
  constructor(arg1, arg2) {
    let messageInput
    let details
    if (typeof arg1 === "string") {
      messageInput = arg1
      details = arg2
    } else details = arg1
    const status = sanitizeStatusCode(
      details?.status ||
        details?.statusCode ||
        details?.cause?.status ||
        details?.cause?.statusCode,
      500,
    )
    const statusText = sanitizeStatusMessage(
      details?.statusText ||
        details?.statusMessage ||
        details?.cause?.statusText ||
        details?.cause?.statusMessage,
    )
    const message =
      messageInput ||
      details?.message ||
      details?.cause?.message ||
      details?.statusText ||
      details?.statusMessage ||
      ["HTTPError", status, statusText].filter(Boolean).join(" ")
    super(message, { cause: details })
    this.cause = details
    this.status = status
    this.statusText = statusText || void 0
    const rawHeaders = details?.headers || details?.cause?.headers
    this.headers = rawHeaders ? new Headers(rawHeaders) : void 0
    this.unhandled = details?.unhandled ?? details?.cause?.unhandled ?? void 0
    this.data = details?.data
    this.body = details?.body
  }
  get statusCode() {
    return this.status
  }
  get statusMessage() {
    return this.statusText
  }
  toJSON() {
    const unhandled = this.unhandled
    return {
      status: this.status,
      statusText: this.statusText,
      unhandled,
      message: unhandled ? "HTTPError" : this.message,
      data: unhandled ? void 0 : this.data,
      ...(unhandled ? void 0 : this.body),
    }
  }
}
function isJSONSerializable(value, _type) {
  if (value === null || value === void 0) return true
  if (_type !== "object") return _type === "boolean" || _type === "number" || _type === "string"
  if (typeof value.toJSON === "function") return true
  if (Array.isArray(value)) return true
  if (typeof value.pipe === "function" || typeof value.pipeTo === "function") return false
  if (value instanceof NullProtoObj) return true
  const proto = Object.getPrototypeOf(value)
  return proto === Object.prototype || proto === null
}
const kNotFound = /* @__PURE__ */ Symbol.for("h3.notFound")
const kHandled = /* @__PURE__ */ Symbol.for("h3.handled")
function toResponse(val, event, config = {}) {
  if (typeof val?.then === "function")
    return (val.catch?.((error) => error) || Promise.resolve(val)).then((resolvedVal) =>
      toResponse(resolvedVal, event, config),
    )
  const response = prepareResponse(val, event, config)
  if (typeof response?.then === "function") return toResponse(response, event, config)
  const { onResponse } = config
  return onResponse ? Promise.resolve(onResponse(response, event)).then(() => response) : response
}
const HTTPResponse = class {
  #headers
  #init
  body
  constructor(body, init) {
    this.body = body
    this.#init = init
  }
  get status() {
    return this.#init?.status || 200
  }
  get statusText() {
    return this.#init?.statusText || "OK"
  }
  get headers() {
    return (this.#headers ||= new Headers(this.#init?.headers))
  }
}
function prepareResponse(val, event, config, nested) {
  if (val === kHandled) return new FastResponse(null)
  if (val === kNotFound)
    val = new HTTPError({
      status: 404,
      message: `Cannot find any route matching [${event.req.method}] ${event.url}`,
    })
  if (val && val instanceof Error) {
    const isHTTPError = HTTPError.isError(val)
    const error = isHTTPError ? val : new HTTPError(val)
    if (!isHTTPError) {
      error.unhandled = true
      if (val?.stack) error.stack = val.stack
    }
    if (error.unhandled && !config.silent) console.error(error)
    const { onError } = config
    const errHeaders = event[kEventRes]?.[kEventResErrHeaders]
    return onError && !nested
      ? Promise.resolve(onError(error, event))
          .catch((error) => error)
          .then((newVal) => prepareResponse(newVal ?? val, event, config, true))
      : errorResponse(error, config.debug, errHeaders)
  }
  const preparedRes = event[kEventRes]
  const preparedHeaders = preparedRes?.[kEventResHeaders]
  event[kEventRes] = void 0
  if (!(val instanceof Response)) {
    const res = prepareResponseBody(val, event, config)
    const status = res.status || preparedRes?.status
    return new FastResponse(nullBody(event.req.method, status) ? null : res.body, {
      status,
      statusText: res.statusText || preparedRes?.statusText,
      headers:
        res.headers && preparedHeaders
          ? mergeHeaders$1(res.headers, preparedHeaders)
          : res.headers || preparedHeaders,
    })
  }
  if (!preparedHeaders || nested || !val.ok) return val
  try {
    mergeHeaders$1(val.headers, preparedHeaders, val.headers)
    return val
  } catch {
    return new FastResponse(nullBody(event.req.method, val.status) ? null : val.body, {
      status: val.status,
      statusText: val.statusText,
      headers: mergeHeaders$1(val.headers, preparedHeaders),
    })
  }
}
function mergeHeaders$1(base, overrides, target = new Headers(base)) {
  for (const [name, value] of overrides)
    if (name === "set-cookie") target.append(name, value)
    else target.set(name, value)
  return target
}
const frozen =
  (name) =>
  (...args) => {
    throw new Error(`Headers are frozen (${name} ${args.join(", ")})`)
  }
const FrozenHeaders = class extends Headers {
  set = frozen("set")
  append = frozen("append")
  delete = frozen("delete")
}
const emptyHeaders = /* @__PURE__ */ new FrozenHeaders({ "content-length": "0" })
const jsonHeaders = /* @__PURE__ */ new FrozenHeaders({
  "content-type": "application/json;charset=UTF-8",
})
function prepareResponseBody(val, event, config) {
  if (val === null || val === void 0)
    return {
      body: "",
      headers: emptyHeaders,
    }
  const valType = typeof val
  if (valType === "string") return { body: val }
  if (val instanceof Uint8Array) {
    event.res.headers.set("content-length", val.byteLength.toString())
    return { body: val }
  }
  if (val instanceof HTTPResponse || val?.constructor?.name === "HTTPResponse") return val
  if (isJSONSerializable(val, valType))
    return {
      body: JSON.stringify(val, void 0, config.debug ? 2 : void 0),
      headers: jsonHeaders,
    }
  if (valType === "bigint")
    return {
      body: val.toString(),
      headers: jsonHeaders,
    }
  if (val instanceof Blob) {
    const headers = new Headers({
      "content-type": val.type,
      "content-length": val.size.toString(),
    })
    let filename = val.name
    if (filename) {
      filename = encodeURIComponent(filename)
      headers.set("content-disposition", `filename="${filename}"; filename*=UTF-8''${filename}`)
    }
    return {
      body: val.stream(),
      headers,
    }
  }
  if (valType === "symbol") return { body: val.toString() }
  if (valType === "function") return { body: `${val.name}()` }
  return { body: val }
}
function nullBody(method, status) {
  return (
    method === "HEAD" ||
    status === 100 ||
    status === 101 ||
    status === 102 ||
    status === 204 ||
    status === 205 ||
    status === 304
  )
}
function errorResponse(error, debug, errHeaders) {
  let headers = error.headers
    ? mergeHeaders$1(jsonHeaders, error.headers)
    : new Headers(jsonHeaders)
  if (errHeaders) headers = mergeHeaders$1(headers, errHeaders)
  return new FastResponse(
    JSON.stringify(
      {
        ...error.toJSON(),
        stack: debug && error.stack ? error.stack.split("\n").map((l) => l.trim()) : void 0,
      },
      void 0,
      debug ? 2 : void 0,
    ),
    {
      status: error.status,
      statusText: error.statusText,
      headers,
    },
  )
}
//#endregion
//#region node_modules/.pnpm/@tanstack+start-server-core@1.169.30/node_modules/@tanstack/start-server-core/dist/esm/request-response.js
const GLOBAL_EVENT_STORAGE_KEY = Symbol.for("tanstack-start:event-storage")
const globalObj$1 = globalThis
if (!globalObj$1[GLOBAL_EVENT_STORAGE_KEY])
  globalObj$1[GLOBAL_EVENT_STORAGE_KEY] = new AsyncLocalStorage()
const eventStorage = globalObj$1[GLOBAL_EVENT_STORAGE_KEY]
function isPromiseLike(value) {
  return typeof value.then === "function"
}
function getSetCookieValues(headers) {
  const headersWithSetCookie = headers
  if (typeof headersWithSetCookie.getSetCookie === "function")
    return headersWithSetCookie.getSetCookie()
  const value = headers.get("set-cookie")
  return value ? [value] : []
}
function mergeEventResponseHeaders(response, event) {
  if (response.ok) return
  const eventSetCookies = getSetCookieValues(event.res.headers)
  if (eventSetCookies.length === 0) return
  const responseSetCookies = getSetCookieValues(response.headers)
  response.headers.delete("set-cookie")
  for (const cookie of responseSetCookies) response.headers.append("set-cookie", cookie)
  for (const cookie of eventSetCookies) response.headers.append("set-cookie", cookie)
}
function attachResponseHeaders(value, event) {
  if (isPromiseLike(value))
    return value.then((resolved) => {
      if (resolved instanceof Response) mergeEventResponseHeaders(resolved, event)
      return resolved
    })
  if (value instanceof Response) mergeEventResponseHeaders(value, event)
  return value
}
function requestHandler(handler) {
  return (request, requestOpts) => {
    let h3Event
    try {
      h3Event = new H3Event(request)
    } catch (error) {
      if (error instanceof URIError)
        return new Response(null, {
          status: 400,
          statusText: "Bad Request",
        })
      throw error
    }
    return toResponse(
      attachResponseHeaders(
        eventStorage.run({ h3Event }, () => handler(request, requestOpts)),
        h3Event,
      ),
      h3Event,
    )
  }
}
function getH3Event() {
  const event = eventStorage.getStore()
  if (!event)
    throw new Error(
      `No StartEvent found in AsyncLocalStorage. Make sure you are using the function within the server runtime.`,
    )
  return event.h3Event
}
function getRequest() {
  return getH3Event().req
}
function setResponseHeader(name, value) {
  const event = getH3Event()
  if (Array.isArray(value)) {
    event.res.headers.delete(name)
    for (const valueItem of value) event.res.headers.append(name, valueItem)
  } else event.res.headers.set(name, value)
}
function getResponse() {
  return getH3Event().res
}
//#endregion
//#region node_modules/.pnpm/@tanstack+start-client-core@1.170.26/node_modules/@tanstack/start-client-core/dist/esm/constants.js
const TSS_FORMDATA_CONTEXT = "__TSS_CONTEXT"
const TSS_SERVER_FUNCTION = Symbol.for("TSS_SERVER_FUNCTION")
const TSS_SERVER_FUNCTION_FACTORY = Symbol.for("TSS_SERVER_FUNCTION_FACTORY")
const X_TSS_SERIALIZED = "x-tss-serialized"
const X_TSS_RAW_RESPONSE = "x-tss-raw"
/** Content-Type for multiplexed framed responses (RawStream support) */
const TSS_CONTENT_TYPE_FRAMED = "application/x-tss-framed"
/**
 * Frame types for binary multiplexing protocol.
 */
const FrameType = {
  /** Seroval JSON chunk (NDJSON line) */
  JSON: 0,
  /** Raw stream data chunk */
  CHUNK: 1,
  /** Raw stream end (EOF) */
  END: 2,
  /** Raw stream error */
  ERROR: 3,
}
/** Full Content-Type header value with version parameter */
const TSS_CONTENT_TYPE_FRAMED_VERSIONED = `${TSS_CONTENT_TYPE_FRAMED}; v=1`
//#endregion
//#region node_modules/.pnpm/@tanstack+start-client-core@1.170.26/node_modules/@tanstack/start-client-core/dist/esm/safeObjectMerge.js
function isSafeKey(key) {
  return key !== "__proto__" && key !== "constructor" && key !== "prototype"
}
/**
 * Merge target and source into a new null-proto object, filtering dangerous keys.
 */
function safeObjectMerge(target, source) {
  const result = Object.create(null)
  if (target) {
    for (const key of Object.keys(target)) if (isSafeKey(key)) result[key] = target[key]
  }
  if (source && typeof source === "object") {
    for (const key of Object.keys(source)) if (isSafeKey(key)) result[key] = source[key]
  }
  return result
}
/**
 * Create a null-prototype object, optionally copying from source.
 */
function createNullProtoObject(source) {
  if (!source) return Object.create(null)
  const obj = Object.create(null)
  for (const key of Object.keys(source)) if (isSafeKey(key)) obj[key] = source[key]
  return obj
}
//#endregion
//#region node_modules/.pnpm/@tanstack+start-storage-context@1.167.28/node_modules/@tanstack/start-storage-context/dist/esm/async-local-storage.js
const GLOBAL_STORAGE_KEY = Symbol.for("tanstack-start:start-storage-context")
const globalObj = globalThis
if (!globalObj[GLOBAL_STORAGE_KEY]) globalObj[GLOBAL_STORAGE_KEY] = new AsyncLocalStorage()
const startStorage = globalObj[GLOBAL_STORAGE_KEY]
async function runWithStartContext(context, fn) {
  return startStorage.run(context, fn)
}
function getStartContext(opts) {
  const context = startStorage.getStore()
  if (!context && opts?.throwIfNotFound !== false)
    throw new Error(
      `No Start context found in AsyncLocalStorage. Make sure you are using the function within the server runtime.`,
    )
  return context
}
//#endregion
//#region node_modules/.pnpm/@tanstack+start-client-core@1.170.26/node_modules/@tanstack/start-client-core/dist/esm/getStartOptions.js
const getStartOptions = () => getStartContext().startOptions
//#endregion
//#region node_modules/.pnpm/@tanstack+start-client-core@1.170.26/node_modules/@tanstack/start-client-core/dist/esm/getStartContextServerOnly.js
const getStartContextServerOnly = getStartContext
//#endregion
//#region node_modules/.pnpm/@tanstack+start-client-core@1.170.26/node_modules/@tanstack/start-client-core/dist/esm/createServerFn.js
const createServerFn = (options, __opts) => {
  const resolvedOptions = __opts || options || {}
  if (typeof resolvedOptions.method === "undefined") resolvedOptions.method = "GET"
  const setValidator = (validator) => {
    return createServerFn(void 0, {
      ...resolvedOptions,
      validator,
      inputValidator: validator,
    })
  }
  const res = {
    options: resolvedOptions,
    middleware: (middleware) => {
      const newMiddleware = [...(resolvedOptions.middleware || [])]
      middleware.map((m) => {
        if (TSS_SERVER_FUNCTION_FACTORY in m) {
          if (m.options.middleware) newMiddleware.push(...m.options.middleware)
        } else newMiddleware.push(m)
      })
      const res = createServerFn(void 0, {
        ...resolvedOptions,
        middleware: newMiddleware,
      })
      res[TSS_SERVER_FUNCTION_FACTORY] = true
      return res
    },
    validator: setValidator,
    inputValidator: setValidator,
    handler: (...args) => {
      const [extractedFn, serverFn] = args
      const newOptions = {
        ...resolvedOptions,
        extractedFn,
        serverFn,
      }
      const resolvedMiddleware = [
        ...(newOptions.middleware || []),
        serverFnBaseToMiddleware(newOptions),
      ]
      extractedFn.method = resolvedOptions.method
      return Object.assign(
        async (opts) => {
          const result = await executeMiddleware(resolvedMiddleware, "client", {
            ...extractedFn,
            ...newOptions,
            data: opts?.data,
            headers: opts?.headers,
            signal: opts?.signal,
            fetch: opts?.fetch,
            context: createNullProtoObject(),
          })
          const redirect = parseRedirect(result.error)
          if (redirect) throw redirect
          if (result.error) throw result.error
          return result.result
        },
        {
          ...extractedFn,
          method: resolvedOptions.method,
          __executeServer: async (opts) => {
            const startContext = getStartContextServerOnly()
            const serverContextAfterGlobalMiddlewares = startContext.contextAfterGlobalMiddlewares
            return await executeMiddleware(resolvedMiddleware, "server", {
              ...extractedFn,
              ...opts,
              serverFnMeta: extractedFn.serverFnMeta,
              context: safeObjectMerge(opts.context, serverContextAfterGlobalMiddlewares),
              request: startContext.request,
            }).then((d) => ({
              result: d.result,
              error: d.error,
              context: d.sendContext,
            }))
          },
        },
      )
    },
  }
  const fun = (options) => {
    return createServerFn(void 0, {
      ...resolvedOptions,
      ...options,
    })
  }
  return Object.assign(fun, res)
}
async function executeMiddleware(middlewares, env, opts) {
  let flattenedMiddlewares = flattenMiddlewares([
    ...(getStartOptions()?.functionMiddleware || []),
    ...middlewares,
  ])
  if (env === "server") {
    const startContext = getStartContextServerOnly({ throwIfNotFound: false })
    if (startContext?.executedRequestMiddlewares)
      flattenedMiddlewares = flattenedMiddlewares.filter(
        (m) => !startContext.executedRequestMiddlewares.has(m),
      )
  }
  const callNextMiddleware = async (ctx) => {
    const nextMiddleware = flattenedMiddlewares.shift()
    if (!nextMiddleware) return ctx
    try {
      let validator =
        "validator" in nextMiddleware.options ? nextMiddleware.options.validator : void 0
      if (!validator && "inputValidator" in nextMiddleware.options)
        validator = nextMiddleware.options.inputValidator
      if (validator && env === "server") ctx.data = await execValidator(validator, ctx.data)
      let middlewareFn = void 0
      if (env === "client") {
        if ("client" in nextMiddleware.options) middlewareFn = nextMiddleware.options.client
      } else if ("server" in nextMiddleware.options) middlewareFn = nextMiddleware.options.server
      if (middlewareFn) {
        const userNext = async (userCtx = {}) => {
          const result = await callNextMiddleware({
            ...ctx,
            ...userCtx,
            context: safeObjectMerge(ctx.context, userCtx.context),
            sendContext: safeObjectMerge(ctx.sendContext, userCtx.sendContext),
            headers: mergeHeaders(ctx.headers, userCtx.headers),
            _callSiteFetch: ctx._callSiteFetch,
            fetch: ctx._callSiteFetch ?? userCtx.fetch ?? ctx.fetch,
            result:
              userCtx.result !== void 0
                ? userCtx.result
                : userCtx instanceof Response
                  ? userCtx
                  : ctx.result,
            error: userCtx.error ?? ctx.error,
          })
          if (result.error) throw result.error
          return result
        }
        const result = await middlewareFn({
          ...ctx,
          next: userNext,
        })
        if (isRedirect(result))
          return {
            ...ctx,
            error: result,
          }
        if (result instanceof Response)
          return {
            ...ctx,
            result,
          }
        if (!result)
          throw new Error(
            "User middleware returned undefined. You must call next() or return a result in your middlewares.",
          )
        return result
      }
      return callNextMiddleware(ctx)
    } catch (error) {
      return {
        ...ctx,
        error,
      }
    }
  }
  return callNextMiddleware({
    ...opts,
    headers: opts.headers || {},
    sendContext: opts.sendContext || {},
    context: opts.context || createNullProtoObject(),
    _callSiteFetch: opts.fetch,
  })
}
function flattenMiddlewares(middlewares, maxDepth = 100) {
  const seen = /* @__PURE__ */ new Set()
  const flattened = []
  const recurse = (middleware, depth) => {
    if (depth > maxDepth)
      throw new Error(
        `Middleware nesting depth exceeded maximum of ${maxDepth}. Check for circular references.`,
      )
    middleware.forEach((m) => {
      if (m.options.middleware) recurse(m.options.middleware, depth + 1)
      if (!seen.has(m)) {
        seen.add(m)
        flattened.push(m)
      }
    })
  }
  recurse(middlewares, 0)
  return flattened
}
async function execValidator(validator, input) {
  if (validator == null) return {}
  if ("~standard" in validator) {
    const result = await validator["~standard"].validate(input)
    if (result.issues) throw new Error(JSON.stringify(result.issues, void 0, 2))
    return result.value
  }
  if ("parse" in validator) return validator.parse(input)
  if (typeof validator === "function") return validator(input)
  throw new Error("Invalid validator type!")
}
function serverFnBaseToMiddleware(options) {
  return {
    "~types": void 0,
    "options": {
      inputValidator: options.validator ?? options.inputValidator,
      client: async ({ next, sendContext, fetch, ...ctx }) => {
        const payload = {
          ...ctx,
          context: sendContext,
          fetch,
        }
        return next(await options.extractedFn?.(payload))
      },
      server: async ({ next, ...ctx }) => {
        const result = await options.serverFn?.(ctx)
        return next({
          ...ctx,
          result,
        })
      },
    },
  }
}
//#endregion
export {
  setResponseHeader as _,
  runWithStartContext as a,
  FrameType as c,
  TSS_SERVER_FUNCTION as d,
  X_TSS_RAW_RESPONSE as f,
  requestHandler as g,
  getResponse as h,
  getStartContext as i,
  TSS_CONTENT_TYPE_FRAMED_VERSIONED as l,
  getRequest as m,
  flattenMiddlewares as n,
  createNullProtoObject as o,
  X_TSS_SERIALIZED as p,
  getStartOptions as r,
  safeObjectMerge as s,
  createServerFn as t,
  TSS_FORMDATA_CONTEXT as u,
  mergeHeaders as v,
}
