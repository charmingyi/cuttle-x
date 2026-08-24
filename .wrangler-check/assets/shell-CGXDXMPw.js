import {
  a as redirect,
  c as require_react,
  s as notFound,
  u as __toESM,
} from "./createMiddleware-CkzUAgXb.js"
import {
  D as commitToken,
  E as clearToken,
  M as useTokenRefused,
  N as useTokenUsable,
  O as hasToken,
  P as useTokenVerified,
  _ as ApiError,
  b as ADMIN_ERROR_CODES,
  j as useToken,
  k as noteTokenRefused,
} from "./nodes-b2qYjNQG.js"
import {
  B as hasKeys,
  C as trimPathLeft,
  G as replaceEqualDeep$1,
  I as deepEqual$1,
  K as rootRouteId,
  V as isDangerousProtocol,
  _ as exactPathTest,
  a as dummyMatchContext,
  b as removeTrailingSlash,
  d as require_jsx_runtime,
  i as require_shim,
  j as invariant,
  o as matchContext,
  p as useForwardedRef,
  r as require_with_selector,
  s as useRouter,
  t as require_react_dom,
  w as trimPathRight,
  y as joinPaths,
  z as functionalUpdate$1,
} from "./react-dom-C7iwyEt6.js"
//#endregion
//#region node_modules/.pnpm/@tanstack+router-core@1.171.26/node_modules/@tanstack/router-core/dist/esm/route.js
const BaseRoute = class {
  get to() {
    return this._to
  }
  get id() {
    return this._id
  }
  get path() {
    return this._path
  }
  get fullPath() {
    return this._fullPath
  }
  constructor(options) {
    this.init = (opts) => {
      this.originalIndex = opts.originalIndex
      const options = this.options
      const isRoot = !options?.path && !options?.id
      this.parentRoute = this.options.getParentRoute?.()
      if (isRoot) this._path = rootRouteId
      else if (!this.parentRoute) invariant()
      let path = isRoot ? rootRouteId : options?.path
      if (path && path !== "/") path = trimPathLeft(path)
      const customId = options?.id || path
      let id = isRoot
        ? rootRouteId
        : joinPaths([this.parentRoute.id === "__root__" ? "" : this.parentRoute.id, customId])
      if (path === "__root__") path = "/"
      if (id !== "__root__") id = joinPaths(["/", id])
      const fullPath = id === "__root__" ? "/" : joinPaths([this.parentRoute.fullPath, path])
      this._path = path
      this._id = id
      this._fullPath = fullPath
      this._to = trimPathRight(fullPath)
    }
    this.addChildren = (children) => {
      return this._addFileChildren(children)
    }
    this._addFileChildren = (children) => {
      if (Array.isArray(children)) this.children = children
      if (typeof children === "object" && children !== null) this.children = Object.values(children)
      return this
    }
    this._addFileTypes = () => {
      return this
    }
    this.updateLoader = (options) => {
      Object.assign(this.options, options)
      return this
    }
    this.update = (options) => {
      Object.assign(this.options, options)
      return this
    }
    this.lazy = (lazyFn) => {
      this.lazyFn = lazyFn
      return this
    }
    this.redirect = (opts) =>
      redirect({
        from: this.fullPath,
        ...opts,
      })
    this.options = options || {}
    this.isRoot = !options?.getParentRoute
    if (options?.id && options?.path)
      throw new Error(`Route cannot have both an 'id' and a 'path' option.`)
  }
}
const BaseRouteApi = class {
  constructor({ id }) {
    this.notFound = (opts) => {
      return notFound({
        routeId: this.id,
        ...opts,
      })
    }
    this.redirect = (opts) =>
      redirect({
        from: this.id,
        ...opts,
      })
    this.id = id
  }
}
const BaseRootRoute = class extends BaseRoute {
  constructor(options) {
    super(options)
  }
}
//#endregion
//#region node_modules/.pnpm/@tanstack+react-router@1.17_a412b0d82c3a1e1649d65373a448407f/node_modules/@tanstack/react-router/dist/esm/useMatch.js
const import_react = /* @__PURE__ */ __toESM(require_react(), 1)
function useStructuralSharing(opts, router) {
  const previousResult = import_react.useRef()
  return (slice) => {
    const selected = opts?.select ? opts.select(slice) : slice
    if (opts?.structuralSharing ?? router.options.defaultStructuralSharing)
      return (previousResult.current = replaceEqualDeep$1(previousResult.current, selected))
    return selected
  }
}
/**
 * Read and select the nearest or targeted route match.
 * @link https://tanstack.com/router/latest/docs/framework/react/api/router/useMatchHook
 */
function useMatch(opts) {
  const router = useRouter()
  const nearestRouteId = import_react.useContext(opts.from ? dummyMatchContext : matchContext)
  const routeId = opts.from ?? nearestRouteId
  const matchStore = router.stores.getMatchStore(routeId)
  {
    const match = matchStore.get()
    if (!match) {
      if (opts.shouldThrow ?? true) invariant()
      return
    }
    return opts.select ? opts.select(match) : match
  }
}
//#endregion
//#region node_modules/.pnpm/@tanstack+react-router@1.17_a412b0d82c3a1e1649d65373a448407f/node_modules/@tanstack/react-router/dist/esm/useLoaderData.js
/**
 * Read and select the current route's loader data with type‑safety.
 *
 * Options:
 * - `from`/`strict`: Choose which route's data to read and strictness
 * - `select`: Map the loader data to a derived value
 * - `structuralSharing`: Enable structural sharing for stable references
 *
 * @returns The loader data (or selected value) for the matched route.
 * @link https://tanstack.com/router/latest/docs/framework/react/api/router/useLoaderDataHook
 */
function useLoaderData(opts) {
  return useMatch({
    from: opts.from,
    strict: opts.strict,
    structuralSharing: opts.structuralSharing,
    select: (match) => {
      return opts.select ? opts.select(match.loaderData) : match.loaderData
    },
  })
}
//#endregion
//#region node_modules/.pnpm/@tanstack+react-router@1.17_a412b0d82c3a1e1649d65373a448407f/node_modules/@tanstack/react-router/dist/esm/useLoaderDeps.js
/**
 * Read and select the current route's loader dependencies object.
 *
 * Options:
 * - `from`: Choose which route's loader deps to read
 * - `select`: Map the deps to a derived value
 * - `structuralSharing`: Enable structural sharing for stable references
 *
 * @returns The loader deps (or selected value) for the matched route.
 * @link https://tanstack.com/router/latest/docs/framework/react/api/router/useLoaderDepsHook
 */
function useLoaderDeps(opts) {
  const { select, ...rest } = opts
  return useMatch({
    ...rest,
    select: (match) => {
      return select ? select(match.loaderDeps) : match.loaderDeps
    },
  })
}
//#endregion
//#region node_modules/.pnpm/@tanstack+react-router@1.17_a412b0d82c3a1e1649d65373a448407f/node_modules/@tanstack/react-router/dist/esm/useParams.js
/**
 * Access the current route's path parameters with type-safety.
 *
 * Options:
 * - `from`/`strict`: Specify the matched route and whether to enforce strict typing
 * - `select`: Project the params object to a derived value for memoized renders
 * - `structuralSharing`: Enable structural sharing for stable references
 * - `shouldThrow`: Throw if the route is not found in strict contexts
 *
 * @returns The params object (or selected value) for the matched route.
 * @link https://tanstack.com/router/latest/docs/framework/react/api/router/useParamsHook
 */
function useParams(opts) {
  return useMatch({
    from: opts.from,
    shouldThrow: opts.shouldThrow,
    structuralSharing: opts.structuralSharing,
    strict: opts.strict,
    select: (match) => {
      const params = opts.strict === false ? match.params : match._strictParams
      return opts.select ? opts.select(params) : params
    },
  })
}
//#endregion
//#region node_modules/.pnpm/@tanstack+react-router@1.17_a412b0d82c3a1e1649d65373a448407f/node_modules/@tanstack/react-router/dist/esm/useSearch.js
/**
 * Read and select the current route's search parameters with type-safety.
 *
 * Options:
 * - `from`/`strict`: Control which route's search is read and how strictly it's typed
 * - `select`: Map the search object to a derived value for render optimization
 * - `structuralSharing`: Enable structural sharing for stable references
 * - `shouldThrow`: Throw when the route is not found (strict contexts)
 *
 * @returns The search object (or selected value) for the matched route.
 * @link https://tanstack.com/router/latest/docs/framework/react/api/router/useSearchHook
 */
function useSearch(opts) {
  return useMatch({
    from: opts.from,
    strict: opts.strict,
    shouldThrow: opts.shouldThrow,
    structuralSharing: opts.structuralSharing,
    select: (match) => {
      return opts.select ? opts.select(match.search) : match.search
    },
  })
}
//#endregion
//#region node_modules/.pnpm/@tanstack+react-router@1.17_a412b0d82c3a1e1649d65373a448407f/node_modules/@tanstack/react-router/dist/esm/useNavigate.js
/**
 * Imperative navigation hook.
 *
 * Returns a stable `navigate(options)` function to change the current location
 * programmatically. Prefer the `Link` component for user-initiated navigation,
 * and use this hook from effects, callbacks, or handlers where imperative
 * navigation is required.
 *
 * Options:
 * - `from`: Optional route base used to resolve relative `to` paths.
 *
 * @returns A function that accepts `NavigateOptions`.
 * @link https://tanstack.com/router/latest/docs/framework/react/api/router/useNavigateHook
 */
function useNavigate(_defaultOpts) {
  const router = useRouter()
  return import_react.useCallback(
    (options) => {
      return router.navigate({
        ...options,
        from: options.from ?? _defaultOpts?.from,
      })
    },
    [_defaultOpts?.from, router],
  )
}
//#endregion
//#region node_modules/.pnpm/@tanstack+react-router@1.17_a412b0d82c3a1e1649d65373a448407f/node_modules/@tanstack/react-router/dist/esm/useRouteContext.js
function useRouteContext(opts) {
  return useMatch({
    ...opts,
    select: (match) => (opts.select ? opts.select(match.context) : match.context),
  })
}
//#endregion
//#region node_modules/.pnpm/@tanstack+react-router@1.17_a412b0d82c3a1e1649d65373a448407f/node_modules/@tanstack/react-router/dist/esm/link.js
const import_jsx_runtime = require_jsx_runtime()
/**
 * Build anchor-like props for declarative navigation and preloading.
 *
 * Returns stable `href`, event handlers and accessibility props derived from
 * router options and active state. Used internally by `Link` and custom links.
 *
 * Options cover `to`, `params`, `search`, `hash`, `state`, `preload`,
 * `activeProps`, `inactiveProps`, and more.
 *
 * @returns React anchor props suitable for `<a>` or custom components.
 * @link https://tanstack.com/router/latest/docs/framework/react/api/router/useLinkPropsHook
 */
function useLinkProps(options, forwardedRef) {
  const router = useRouter()
  const innerRef = useForwardedRef(forwardedRef)
  const {
    activeProps,
    inactiveProps,
    activeOptions,
    to,
    preload: userPreload,
    preloadDelay: userPreloadDelay,
    preloadIntentProximity: _preloadIntentProximity,
    hashScrollIntoView,
    replace,
    startTransition,
    resetScroll,
    viewTransition,
    children,
    target,
    disabled,
    style,
    className,
    onClick,
    onBlur,
    onFocus,
    onMouseEnter,
    onMouseLeave,
    onTouchStart,
    ignoreBlocker,
    params: _params,
    search: _search,
    hash: _hash,
    state: _state,
    mask: _mask,
    reloadDocument: _reloadDocument,
    unsafeRelative: _unsafeRelative,
    from: _from,
    _fromLocation,
    ...propsSafeToSpread
  } = options
  {
    const safeInternal = isSafeInternal(to)
    if (typeof to === "string" && !safeInternal && to.indexOf(":") > -1)
      try {
        new URL(to)
        if (isDangerousProtocol(to, router.protocolAllowlist))
          return {
            ...propsSafeToSpread,
            ref: innerRef,
            href: void 0,
            ...(children && { children }),
            ...(target && { target }),
            ...(disabled && { disabled }),
            ...(style && { style }),
            ...(className && { className }),
          }
        return {
          ...propsSafeToSpread,
          ref: innerRef,
          href: to,
          ...(children && { children }),
          ...(target && { target }),
          ...(disabled && { disabled }),
          ...(style && { style }),
          ...(className && { className }),
        }
      } catch {}
    const next = router.buildLocation({
      ...options,
      from: options.from,
    })
    const hrefOption = getHrefOption(
      next.maskedLocation ? next.maskedLocation.publicHref : next.publicHref,
      next.maskedLocation ? next.maskedLocation.external : next.external,
      router.history,
      disabled,
    )
    const externalLink = (() => {
      if (hrefOption?.external) {
        if (isDangerousProtocol(hrefOption.href, router.protocolAllowlist)) return
        return hrefOption.href
      }
      if (safeInternal) return void 0
      if (typeof to === "string" && to.indexOf(":") > -1)
        try {
          new URL(to)
          if (isDangerousProtocol(to, router.protocolAllowlist)) return
          return to
        } catch {}
    })()
    const isActive = (() => {
      if (externalLink) return false
      const currentLocation = router.stores.location.get()
      const exact = activeOptions?.exact ?? false
      if (exact) {
        if (!exactPathTest(currentLocation.pathname, next.pathname, router.basepath)) return false
      } else {
        const currentPathSplit = removeTrailingSlash(currentLocation.pathname, router.basepath)
        const nextPathSplit = removeTrailingSlash(next.pathname, router.basepath)
        if (
          !(
            currentPathSplit.startsWith(nextPathSplit) &&
            (currentPathSplit.length === nextPathSplit.length ||
              currentPathSplit[nextPathSplit.length] === "/")
          )
        )
          return false
      }
      if (activeOptions?.includeSearch ?? true) {
        if (currentLocation.search !== next.search) {
          const currentSearchEmpty =
            !currentLocation.search ||
            (typeof currentLocation.search === "object" && !hasKeys(currentLocation.search))
          const nextSearchEmpty =
            !next.search || (typeof next.search === "object" && !hasKeys(next.search))
          if (!(currentSearchEmpty && nextSearchEmpty)) {
            if (
              !deepEqual$1(currentLocation.search, next.search, {
                partial: !exact,
                ignoreUndefined: !activeOptions?.explicitUndefined,
              })
            )
              return false
          }
        }
      }
      if (activeOptions?.includeHash) return false
      return true
    })()
    if (externalLink)
      return {
        ...propsSafeToSpread,
        ref: innerRef,
        href: externalLink,
        ...(children && { children }),
        ...(target && { target }),
        ...(disabled && { disabled }),
        ...(style && { style }),
        ...(className && { className }),
      }
    const resolvedActiveProps = isActive
      ? (functionalUpdate$1(activeProps, {}) ?? STATIC_ACTIVE_OBJECT)
      : STATIC_EMPTY_OBJECT
    const resolvedInactiveProps = isActive
      ? STATIC_EMPTY_OBJECT
      : (functionalUpdate$1(inactiveProps, {}) ?? STATIC_EMPTY_OBJECT)
    const resolvedStyle = (() => {
      const baseStyle = style
      const activeStyle = resolvedActiveProps.style
      const inactiveStyle = resolvedInactiveProps.style
      if (!baseStyle && !activeStyle && !inactiveStyle) return
      if (baseStyle && !activeStyle && !inactiveStyle) return baseStyle
      if (!baseStyle && activeStyle && !inactiveStyle) return activeStyle
      if (!baseStyle && !activeStyle && inactiveStyle) return inactiveStyle
      return {
        ...baseStyle,
        ...activeStyle,
        ...inactiveStyle,
      }
    })()
    const resolvedClassName = (() => {
      const baseClassName = className
      const activeClassName = resolvedActiveProps.className
      const inactiveClassName = resolvedInactiveProps.className
      if (!baseClassName && !activeClassName && !inactiveClassName) return ""
      let out = ""
      if (baseClassName) out = baseClassName
      if (activeClassName) out = out ? `${out} ${activeClassName}` : activeClassName
      if (inactiveClassName) out = out ? `${out} ${inactiveClassName}` : inactiveClassName
      return out
    })()
    return {
      ...propsSafeToSpread,
      ...resolvedActiveProps,
      ...resolvedInactiveProps,
      href: hrefOption?.href,
      ref: innerRef,
      disabled: Boolean(disabled),
      target,
      ...(resolvedStyle && { style: resolvedStyle }),
      ...(resolvedClassName && { className: resolvedClassName }),
      ...(disabled && STATIC_DISABLED_PROPS),
      ...(isActive && STATIC_ACTIVE_PROPS),
    }
  }
}
const STATIC_EMPTY_OBJECT = {}
const STATIC_ACTIVE_OBJECT = { className: "active" }
const STATIC_DISABLED_PROPS = {
  "role": "link",
  "aria-disabled": true,
}
const STATIC_ACTIVE_PROPS = {
  "data-status": "active",
  "aria-current": "page",
}
function getHrefOption(publicHref, external, history, disabled) {
  if (disabled) return void 0
  if (external)
    return {
      href: publicHref,
      external: true,
    }
  return {
    href: history.createHref(publicHref) || "/",
    external: false,
  }
}
function isSafeInternal(to) {
  if (typeof to !== "string") return false
  const zero = to.charCodeAt(0)
  if (zero === 47) return to.charCodeAt(1) !== 47
  return zero === 46
}
/**
 * A strongly-typed anchor component for declarative navigation.
 * Handles path, search, hash and state updates with optional route preloading
 * and active-state styling.
 *
 * Props:
 * - `preload`: Controls route preloading (eg. 'intent', 'render', 'viewport', true/false)
 * - `preloadDelay`: Delay in ms before preloading on focus, hover, or viewport entry
 * - `activeProps`/`inactiveProps`: Additional props merged when link is active/inactive
 * - `resetScroll`/`hashScrollIntoView`: Control scroll behavior on navigation
 * - `viewTransition`/`startTransition`: Use View Transitions/React transitions for navigation
 * - `ignoreBlocker`: Bypass registered blockers
 *
 * @returns An anchor-like element that navigates without full page reloads.
 * @link https://tanstack.com/router/latest/docs/framework/react/api/router/linkComponent
 */
const Link = import_react.forwardRef((props, ref) => {
  const { _asChild, ...rest } = props
  const { type: _type, ...linkProps } = useLinkProps(rest, ref)
  const children =
    typeof rest.children === "function"
      ? rest.children({ isActive: linkProps["data-status"] === "active" })
      : rest.children
  if (!_asChild) {
    const { disabled: _, ...rest } = linkProps
    return import_react.createElement("a", rest, children)
  }
  return import_react.createElement(_asChild, linkProps, children)
})
//#endregion
//#region node_modules/.pnpm/@tanstack+react-router@1.17_a412b0d82c3a1e1649d65373a448407f/node_modules/@tanstack/react-router/dist/esm/route.js
/**
 * Returns a route-specific API that exposes type-safe hooks pre-bound
 * to a single route ID. Useful for consuming a route's APIs from files
 * where the route object isn't directly imported (e.g. code-split files).
 *
 * @param id Route ID string literal for the target route.
 * @returns A `RouteApi` instance bound to the given route ID.
 * @link https://tanstack.com/router/latest/docs/framework/react/api/router/getRouteApiFunction
 */
function getRouteApi(id) {
  return new RouteApi({ id })
}
const RouteApi = class extends BaseRouteApi {
  /**
   * @deprecated Use the `getRouteApi` function instead.
   */
  constructor({ id }) {
    super({ id })
    this.useMatch = (opts) => {
      return useMatch({
        select: opts?.select,
        from: this.id,
        structuralSharing: opts?.structuralSharing,
      })
    }
    this.useRouteContext = (opts) => {
      return useRouteContext({
        ...opts,
        from: this.id,
      })
    }
    this.useSearch = (opts) => {
      return useSearch({
        select: opts?.select,
        structuralSharing: opts?.structuralSharing,
        from: this.id,
      })
    }
    this.useParams = (opts) => {
      return useParams({
        select: opts?.select,
        structuralSharing: opts?.structuralSharing,
        from: this.id,
      })
    }
    this.useLoaderDeps = (opts) => {
      return useLoaderDeps({
        ...opts,
        from: this.id,
        strict: false,
      })
    }
    this.useLoaderData = (opts) => {
      return useLoaderData({
        ...opts,
        from: this.id,
        strict: false,
      })
    }
    this.useNavigate = () => {
      return useNavigate({ from: useRouter().routesById[this.id].fullPath })
    }
    this.notFound = (opts) => {
      return notFound({
        routeId: this.id,
        ...opts,
      })
    }
    this.Link = import_react.forwardRef((props, ref) => {
      const fullPath = useRouter().routesById[this.id].fullPath
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
        ref,
        from: fullPath,
        ...props,
      })
    })
  }
}
const Route = class extends BaseRoute {
  /**
   * @deprecated Use the `createRoute` function instead.
   */
  constructor(options) {
    super(options)
    this.useMatch = (opts) => {
      return useMatch({
        select: opts?.select,
        from: this.id,
        structuralSharing: opts?.structuralSharing,
      })
    }
    this.useRouteContext = (opts) => {
      return useRouteContext({
        ...opts,
        from: this.id,
      })
    }
    this.useSearch = (opts) => {
      return useSearch({
        select: opts?.select,
        structuralSharing: opts?.structuralSharing,
        from: this.id,
      })
    }
    this.useParams = (opts) => {
      return useParams({
        select: opts?.select,
        structuralSharing: opts?.structuralSharing,
        from: this.id,
      })
    }
    this.useLoaderDeps = (opts) => {
      return useLoaderDeps({
        ...opts,
        from: this.id,
      })
    }
    this.useLoaderData = (opts) => {
      return useLoaderData({
        ...opts,
        from: this.id,
      })
    }
    this.useNavigate = () => {
      return useNavigate({ from: this.fullPath })
    }
    this.Link = import_react.forwardRef((props, ref) => {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
        ref,
        from: this.fullPath,
        ...props,
      })
    })
  }
}
/**
 * Creates a non-root Route instance for code-based routing.
 *
 * Use this to define a route that will be composed into a route tree
 * (typically via a parent route's `addChildren`). If you're using file-based
 * routing, prefer `createFileRoute`.
 *
 * @param options Route options (path, component, loader, context, etc.).
 * @returns A Route instance to be attached to the route tree.
 * @link https://tanstack.com/router/latest/docs/framework/react/api/router/createRouteFunction
 */
function createRoute(options) {
  return new Route(options)
}
/**
 * Creates a root route factory that requires a router context type.
 *
 * Use when your root route expects `context` to be provided to `createRouter`.
 * The returned function behaves like `createRootRoute` but enforces a context type.
 *
 * @returns A factory function to configure and return a root route.
 * @link https://tanstack.com/router/latest/docs/framework/react/api/router/createRootRouteWithContextFunction
 */
function createRootRouteWithContext() {
  return (options) => {
    return createRootRoute(options)
  }
}
const RootRoute = class extends BaseRootRoute {
  /**
   * @deprecated `RootRoute` is now an internal implementation detail. Use `createRootRoute()` instead.
   */
  constructor(options) {
    super(options)
    this.useMatch = (opts) => {
      return useMatch({
        select: opts?.select,
        from: this.id,
        structuralSharing: opts?.structuralSharing,
      })
    }
    this.useRouteContext = (opts) => {
      return useRouteContext({
        ...opts,
        from: this.id,
      })
    }
    this.useSearch = (opts) => {
      return useSearch({
        select: opts?.select,
        structuralSharing: opts?.structuralSharing,
        from: this.id,
      })
    }
    this.useParams = (opts) => {
      return useParams({
        select: opts?.select,
        structuralSharing: opts?.structuralSharing,
        from: this.id,
      })
    }
    this.useLoaderDeps = (opts) => {
      return useLoaderDeps({
        ...opts,
        from: this.id,
      })
    }
    this.useLoaderData = (opts) => {
      return useLoaderData({
        ...opts,
        from: this.id,
      })
    }
    this.useNavigate = () => {
      return useNavigate({ from: this.fullPath })
    }
    this.Link = import_react.forwardRef((props, ref) => {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
        ref,
        from: this.fullPath,
        ...props,
      })
    })
  }
}
/**
 * Creates a root Route instance used to build your route tree.
 *
 * Typically paired with `createRouter({ routeTree })`. If you need to require
 * a typed router context, use `createRootRouteWithContext` instead.
 *
 * @param options Root route options (component, error, pending, etc.).
 * @returns A root route instance.
 * @link https://tanstack.com/router/latest/docs/framework/react/api/router/createRootRouteFunction
 */
function createRootRoute(options) {
  return new RootRoute(options)
}
//#endregion
//#region node_modules/.pnpm/@tanstack+query-core@5.101.4/node_modules/@tanstack/query-core/build/modern/subscribable.js
const Subscribable = class {
  constructor() {
    this.listeners = /* @__PURE__ */ new Set()
    this.subscribe = this.subscribe.bind(this)
  }
  subscribe(listener) {
    this.listeners.add(listener)
    this.onSubscribe()
    return () => {
      this.listeners.delete(listener)
      this.onUnsubscribe()
    }
  }
  hasListeners() {
    return this.listeners.size > 0
  }
  onSubscribe() {}
  onUnsubscribe() {}
}
//#endregion
//#region node_modules/.pnpm/@tanstack+query-core@5.101.4/node_modules/@tanstack/query-core/build/modern/focusManager.js
const FocusManager = class extends Subscribable {
  #focused
  #cleanup
  #setup
  constructor() {
    super()
    this.#setup = (onFocus) => {
      if (typeof window !== "undefined" && window.addEventListener) {
        const listener = () => onFocus()
        window.addEventListener("visibilitychange", listener, false)
        return () => {
          window.removeEventListener("visibilitychange", listener)
        }
      }
    }
  }
  onSubscribe() {
    if (!this.#cleanup) this.setEventListener(this.#setup)
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.#cleanup?.()
      this.#cleanup = void 0
    }
  }
  setEventListener(setup) {
    this.#setup = setup
    this.#cleanup?.()
    this.#cleanup = setup((focused) => {
      if (typeof focused === "boolean") this.setFocused(focused)
      else this.onFocus()
    })
  }
  setFocused(focused) {
    if (this.#focused !== focused) {
      this.#focused = focused
      this.onFocus()
    }
  }
  onFocus() {
    const isFocused = this.isFocused()
    this.listeners.forEach((listener) => {
      listener(isFocused)
    })
  }
  isFocused() {
    if (typeof this.#focused === "boolean") return this.#focused
    return globalThis.document?.visibilityState !== "hidden"
  }
}
const focusManager = new FocusManager()
//#endregion
//#region node_modules/.pnpm/@tanstack+query-core@5.101.4/node_modules/@tanstack/query-core/build/modern/timeoutManager.js
const defaultTimeoutProvider = {
  setTimeout: (callback, delay) => setTimeout(callback, delay),
  clearTimeout: (timeoutId) => clearTimeout(timeoutId),
  setInterval: (callback, delay) => setInterval(callback, delay),
  clearInterval: (intervalId) => clearInterval(intervalId),
}
const TimeoutManager = class {
  #provider = defaultTimeoutProvider
  #providerCalled = false
  setTimeoutProvider(provider) {
    this.#provider = provider
  }
  setTimeout(callback, delay) {
    return this.#provider.setTimeout(callback, delay)
  }
  clearTimeout(timeoutId) {
    this.#provider.clearTimeout(timeoutId)
  }
  setInterval(callback, delay) {
    return this.#provider.setInterval(callback, delay)
  }
  clearInterval(intervalId) {
    this.#provider.clearInterval(intervalId)
  }
}
const timeoutManager = new TimeoutManager()
function systemSetTimeoutZero(callback) {
  setTimeout(callback, 0)
}
//#endregion
//#region node_modules/.pnpm/@tanstack+query-core@5.101.4/node_modules/@tanstack/query-core/build/modern/utils.js
const isServer = typeof window === "undefined" || "Deno" in globalThis
function noop$1() {}
function functionalUpdate(updater, input) {
  return typeof updater === "function" ? updater(input) : updater
}
function isValidTimeout(value) {
  return typeof value === "number" && value >= 0 && value !== Infinity
}
function timeUntilStale(updatedAt, staleTime) {
  return Math.max(updatedAt + (staleTime || 0) - Date.now(), 0)
}
function resolveStaleTime(staleTime, query) {
  return typeof staleTime === "function" ? staleTime(query) : staleTime
}
function resolveQueryBoolean(option, query) {
  return typeof option === "function" ? option(query) : option
}
function matchQuery(filters, query) {
  const { type = "all", exact, fetchStatus, predicate, queryKey, stale } = filters
  if (queryKey) {
    if (exact) {
      if (query.queryHash !== hashQueryKeyByOptions(queryKey, query.options)) return false
    } else if (!partialMatchKey(query.queryKey, queryKey)) return false
  }
  if (type !== "all") {
    const isActive = query.isActive()
    if (type === "active" && !isActive) return false
    if (type === "inactive" && isActive) return false
  }
  if (typeof stale === "boolean" && query.isStale() !== stale) return false
  if (fetchStatus && fetchStatus !== query.state.fetchStatus) return false
  if (predicate && !predicate(query)) return false
  return true
}
function matchMutation(filters, mutation) {
  const { exact, status, predicate, mutationKey } = filters
  if (mutationKey) {
    if (!mutation.options.mutationKey) return false
    if (exact) {
      if (hashKey(mutation.options.mutationKey) !== hashKey(mutationKey)) return false
    } else if (!partialMatchKey(mutation.options.mutationKey, mutationKey)) return false
  }
  if (status && mutation.state.status !== status) return false
  if (predicate && !predicate(mutation)) return false
  return true
}
function hashQueryKeyByOptions(queryKey, options) {
  return (options?.queryKeyHashFn || hashKey)(queryKey)
}
function hashKey(queryKey) {
  return JSON.stringify(queryKey, (_, val) =>
    isPlainObject(val)
      ? Object.keys(val)
          .sort()
          .reduce((result, key) => {
            result[key] = val[key]
            return result
          }, {})
      : val,
  )
}
function partialMatchKey(a, b) {
  if (a === b) return true
  if (typeof a !== typeof b) return false
  if (a && b && typeof a === "object" && typeof b === "object") {
    if (Array.isArray(a) && Array.isArray(b)) {
      for (let i = 0; i < b.length; i++) if (!partialMatchKey(a[i], b[i])) return false
      return true
    }
    const bKeys = Object.keys(b)
    for (const key of bKeys) if (!partialMatchKey(a[key], b[key])) return false
    return true
  }
  return false
}
const hasOwn = Object.prototype.hasOwnProperty
function replaceEqualDeep(a, b, depth = 0) {
  if (a === b) return a
  if (depth > 500) return b
  const array = isPlainArray(a) && isPlainArray(b)
  if (!array && !(isPlainObject(a) && isPlainObject(b))) return b
  const aSize = (array ? a : Object.keys(a)).length
  const bItems = array ? b : Object.keys(b)
  const bSize = bItems.length
  const copy = array ? new Array(bSize) : {}
  let equalItems = 0
  for (let i = 0; i < bSize; i++) {
    const key = array ? i : bItems[i]
    const aItem = a[key]
    const bItem = b[key]
    if (aItem === bItem) {
      copy[key] = aItem
      if (array ? i < aSize : hasOwn.call(a, key)) equalItems++
      continue
    }
    if (
      aItem === null ||
      bItem === null ||
      typeof aItem !== "object" ||
      typeof bItem !== "object"
    ) {
      copy[key] = bItem
      continue
    }
    const v = replaceEqualDeep(aItem, bItem, depth + 1)
    copy[key] = v
    if (v === aItem) equalItems++
  }
  return aSize === bSize && equalItems === aSize ? a : copy
}
function shallowEqualObjects(a, b) {
  if (!b || Object.keys(a).length !== Object.keys(b).length) return false
  for (const key in a) if (a[key] !== b[key]) return false
  return true
}
function isPlainArray(value) {
  return Array.isArray(value) && value.length === Object.keys(value).length
}
function isPlainObject(o) {
  if (!hasObjectPrototype(o)) return false
  const ctor = o.constructor
  if (ctor === void 0) return true
  const prot = ctor.prototype
  if (!hasObjectPrototype(prot)) return false
  if (!prot.hasOwnProperty("isPrototypeOf")) return false
  if (Object.getPrototypeOf(o) !== Object.prototype) return false
  return true
}
function hasObjectPrototype(o) {
  return Object.prototype.toString.call(o) === "[object Object]"
}
function sleep(timeout) {
  return new Promise((resolve) => {
    timeoutManager.setTimeout(resolve, timeout)
  })
}
function replaceData(prevData, data, options) {
  if (typeof options.structuralSharing === "function")
    return options.structuralSharing(prevData, data)
  else if (options.structuralSharing !== false) return replaceEqualDeep(prevData, data)
  return data
}
function addToEnd(items, item, max = 0) {
  const newItems = [...items, item]
  return max && newItems.length > max ? newItems.slice(1) : newItems
}
function addToStart(items, item, max = 0) {
  const newItems = [item, ...items]
  return max && newItems.length > max ? newItems.slice(0, -1) : newItems
}
const skipToken = /* @__PURE__ */ Symbol()
function ensureQueryFn(options, fetchOptions) {
  if (!options.queryFn && fetchOptions?.initialPromise) return () => fetchOptions.initialPromise
  if (!options.queryFn || options.queryFn === skipToken)
    return () =>
      Promise.reject(/* @__PURE__ */ new Error(`Missing queryFn: '${options.queryHash}'`))
  return options.queryFn
}
function shouldThrowError(throwOnError, params) {
  if (typeof throwOnError === "function") return throwOnError(...params)
  return Boolean(throwOnError)
}
function addConsumeAwareSignal(object, getSignal, onCancelled) {
  let consumed = false
  let signal
  Object.defineProperty(object, "signal", {
    enumerable: true,
    get: () => {
      signal ??= getSignal()
      if (consumed) return signal
      consumed = true
      if (signal.aborted) onCancelled()
      else signal.addEventListener("abort", onCancelled, { once: true })
      return signal
    },
  })
  return object
}
//#endregion
//#region node_modules/.pnpm/@tanstack+query-core@5.101.4/node_modules/@tanstack/query-core/build/modern/environmentManager.js
const environmentManager = /* @__PURE__ */ (() => {
  let isServerFn = () => isServer
  return {
    /**
     * Returns whether the current runtime should be treated as a server environment.
     */
    isServer() {
      return isServerFn()
    },
    /**
     * Overrides the server check globally.
     */
    setIsServer(isServerValue) {
      isServerFn = isServerValue
    },
  }
})()
//#endregion
//#region node_modules/.pnpm/@tanstack+query-core@5.101.4/node_modules/@tanstack/query-core/build/modern/thenable.js
function pendingThenable() {
  let resolve
  let reject
  const thenable = new Promise((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject
  })
  thenable.status = "pending"
  thenable.catch(() => {})
  function finalize(data) {
    Object.assign(thenable, data)
    delete thenable.resolve
    delete thenable.reject
  }
  thenable.resolve = (value) => {
    finalize({
      status: "fulfilled",
      value,
    })
    resolve(value)
  }
  thenable.reject = (reason) => {
    finalize({
      status: "rejected",
      reason,
    })
    reject(reason)
  }
  return thenable
}
//#endregion
//#region node_modules/.pnpm/@tanstack+query-core@5.101.4/node_modules/@tanstack/query-core/build/modern/notifyManager.js
const defaultScheduler = systemSetTimeoutZero
function createNotifyManager() {
  let queue = []
  let transactions = 0
  let notifyFn = (callback) => {
    callback()
  }
  let batchNotifyFn = (callback) => {
    callback()
  }
  let scheduleFn = defaultScheduler
  const schedule = (callback) => {
    if (transactions) queue.push(callback)
    else
      scheduleFn(() => {
        notifyFn(callback)
      })
  }
  const flush = () => {
    const originalQueue = queue
    queue = []
    if (originalQueue.length > 0)
      scheduleFn(() => {
        batchNotifyFn(() => {
          originalQueue.forEach((callback) => {
            notifyFn(callback)
          })
        })
      })
  }
  return {
    batch: (callback) => {
      let result
      transactions++
      try {
        result = callback()
      } finally {
        transactions--
        if (!transactions) flush()
      }
      return result
    },
    /**
     * All calls to the wrapped function will be batched.
     */
    batchCalls: (callback) => {
      return (...args) => {
        schedule(() => {
          callback(...args)
        })
      }
    },
    schedule,
    /**
     * Use this method to set a custom notify function.
     * This can be used to for example wrap notifications with `React.act` while running tests.
     */
    setNotifyFunction: (fn) => {
      notifyFn = fn
    },
    /**
     * Use this method to set a custom function to batch notifications together into a single tick.
     * By default React Query will use the batch function provided by ReactDOM or React Native.
     */
    setBatchNotifyFunction: (fn) => {
      batchNotifyFn = fn
    },
    setScheduler: (fn) => {
      scheduleFn = fn
    },
  }
}
const notifyManager = createNotifyManager()
//#endregion
//#region node_modules/.pnpm/@tanstack+query-core@5.101.4/node_modules/@tanstack/query-core/build/modern/onlineManager.js
const OnlineManager = class extends Subscribable {
  #online = true
  #cleanup
  #setup
  constructor() {
    super()
    this.#setup = (onOnline) => {
      if (typeof window !== "undefined" && window.addEventListener) {
        const onlineListener = () => onOnline(true)
        const offlineListener = () => onOnline(false)
        window.addEventListener("online", onlineListener, false)
        window.addEventListener("offline", offlineListener, false)
        return () => {
          window.removeEventListener("online", onlineListener)
          window.removeEventListener("offline", offlineListener)
        }
      }
    }
  }
  onSubscribe() {
    if (!this.#cleanup) this.setEventListener(this.#setup)
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.#cleanup?.()
      this.#cleanup = void 0
    }
  }
  setEventListener(setup) {
    this.#setup = setup
    this.#cleanup?.()
    this.#cleanup = setup(this.setOnline.bind(this))
  }
  setOnline(online) {
    if (this.#online !== online) {
      this.#online = online
      this.listeners.forEach((listener) => {
        listener(online)
      })
    }
  }
  isOnline() {
    return this.#online
  }
}
const onlineManager = new OnlineManager()
//#endregion
//#region node_modules/.pnpm/@tanstack+query-core@5.101.4/node_modules/@tanstack/query-core/build/modern/retryer.js
function defaultRetryDelay(failureCount) {
  return Math.min(1e3 * 2 ** failureCount, 3e4)
}
function canFetch(networkMode) {
  return (networkMode ?? "online") === "online" ? onlineManager.isOnline() : true
}
const CancelledError = class extends Error {
  constructor(options) {
    super("CancelledError")
    this.revert = options?.revert
    this.silent = options?.silent
  }
}
function createRetryer(config) {
  let isRetryCancelled = false
  let failureCount = 0
  let continueFn
  const thenable = pendingThenable()
  const isResolved = () => thenable.status !== "pending"
  const cancel = (cancelOptions) => {
    if (!isResolved()) {
      const error = new CancelledError(cancelOptions)
      reject(error)
      config.onCancel?.(error)
    }
  }
  const cancelRetry = () => {
    isRetryCancelled = true
  }
  const continueRetry = () => {
    isRetryCancelled = false
  }
  const canContinue = () =>
    focusManager.isFocused() &&
    (config.networkMode === "always" || onlineManager.isOnline()) &&
    config.canRun()
  const canStart = () => canFetch(config.networkMode) && config.canRun()
  const resolve = (value) => {
    if (!isResolved()) {
      continueFn?.()
      thenable.resolve(value)
    }
  }
  const reject = (value) => {
    if (!isResolved()) {
      continueFn?.()
      thenable.reject(value)
    }
  }
  const pause = () => {
    return new Promise((continueResolve) => {
      continueFn = (value) => {
        if (isResolved() || canContinue()) continueResolve(value)
      }
      config.onPause?.()
    }).then(() => {
      continueFn = void 0
      if (!isResolved()) config.onContinue?.()
    })
  }
  const run = () => {
    if (isResolved()) return
    let promiseOrValue
    const initialPromise = failureCount === 0 ? config.initialPromise : void 0
    try {
      promiseOrValue = initialPromise ?? config.fn()
    } catch (error) {
      promiseOrValue = Promise.reject(error)
    }
    Promise.resolve(promiseOrValue)
      .then(resolve)
      .catch((error) => {
        if (isResolved()) return
        const retry = config.retry ?? (environmentManager.isServer() ? 0 : 3)
        const retryDelay = config.retryDelay ?? defaultRetryDelay
        const delay =
          typeof retryDelay === "function" ? retryDelay(failureCount, error) : retryDelay
        const shouldRetry =
          retry === true ||
          (typeof retry === "number" && failureCount < retry) ||
          (typeof retry === "function" && retry(failureCount, error))
        if (isRetryCancelled || !shouldRetry) {
          reject(error)
          return
        }
        failureCount++
        config.onFail?.(failureCount, error)
        sleep(delay)
          .then(() => {
            return canContinue() ? void 0 : pause()
          })
          .then(() => {
            if (isRetryCancelled) reject(error)
            else run()
          })
      })
  }
  return {
    promise: thenable,
    status: () => thenable.status,
    cancel,
    continue: () => {
      continueFn?.()
      return thenable
    },
    cancelRetry,
    continueRetry,
    canStart,
    start: () => {
      if (canStart()) run()
      else pause().then(run)
      return thenable
    },
  }
}
//#endregion
//#region node_modules/.pnpm/@tanstack+query-core@5.101.4/node_modules/@tanstack/query-core/build/modern/removable.js
const Removable = class {
  #gcTimeout
  destroy() {
    this.clearGcTimeout()
  }
  scheduleGc() {
    this.clearGcTimeout()
    if (isValidTimeout(this.gcTime))
      this.#gcTimeout = timeoutManager.setTimeout(() => {
        this.optionalRemove()
      }, this.gcTime)
  }
  updateGcTime(newGcTime) {
    this.gcTime = Math.max(
      this.gcTime || 0,
      newGcTime ?? (environmentManager.isServer() ? Infinity : 3e5),
    )
  }
  clearGcTimeout() {
    if (this.#gcTimeout !== void 0) {
      timeoutManager.clearTimeout(this.#gcTimeout)
      this.#gcTimeout = void 0
    }
  }
}
//#endregion
//#region node_modules/.pnpm/@tanstack+query-core@5.101.4/node_modules/@tanstack/query-core/build/modern/infiniteQueryBehavior.js
function infiniteQueryBehavior(pages) {
  return {
    onFetch: (context, query) => {
      const options = context.options
      const direction = context.fetchOptions?.meta?.fetchMore?.direction
      const oldPages = context.state.data?.pages || []
      const oldPageParams = context.state.data?.pageParams || []
      let result = {
        pages: [],
        pageParams: [],
      }
      let currentPage = 0
      const fetchFn = async () => {
        let cancelled = false
        const addSignalProperty = (object) => {
          addConsumeAwareSignal(
            object,
            () => context.signal,
            () => (cancelled = true),
          )
        }
        const queryFn = ensureQueryFn(context.options, context.fetchOptions)
        const fetchPage = async (data, param, previous) => {
          if (cancelled) throw context.signal.reason
          if (param == null && data.pages.length > 0) return data
          const createQueryFnContext = () => {
            const queryFnContext2 = {
              client: context.client,
              queryKey: context.queryKey,
              pageParam: param,
              direction: previous ? "backward" : "forward",
              meta: context.options.meta,
            }
            addSignalProperty(queryFnContext2)
            return queryFnContext2
          }
          const queryFnContext = createQueryFnContext()
          const page = await queryFn(queryFnContext)
          const { maxPages } = context.options
          const addTo = previous ? addToStart : addToEnd
          return {
            pages: addTo(data.pages, page, maxPages),
            pageParams: addTo(data.pageParams, param, maxPages),
          }
        }
        if (direction && oldPages.length > 0) {
          const previous = direction === "backward"
          const pageParamFn = previous ? getPreviousPageParam : getNextPageParam
          const oldData = {
            pages: oldPages,
            pageParams: oldPageParams,
          }
          result = await fetchPage(oldData, pageParamFn(options, oldData), previous)
        } else {
          const remainingPages = pages ?? oldPages.length
          do {
            const param =
              currentPage === 0
                ? (oldPageParams[0] ?? options.initialPageParam)
                : getNextPageParam(options, result)
            if (currentPage > 0 && param == null) break
            result = await fetchPage(result, param)
            currentPage++
          } while (currentPage < remainingPages)
        }
        return result
      }
      if (context.options.persister)
        context.fetchFn = () => {
          return context.options.persister?.(
            fetchFn,
            {
              client: context.client,
              queryKey: context.queryKey,
              meta: context.options.meta,
              signal: context.signal,
            },
            query,
          )
        }
      else context.fetchFn = fetchFn
    },
  }
}
function getNextPageParam(options, { pages, pageParams }) {
  const lastIndex = pages.length - 1
  return pages.length > 0
    ? options.getNextPageParam(pages[lastIndex], pages, pageParams[lastIndex], pageParams)
    : void 0
}
function getPreviousPageParam(options, { pages, pageParams }) {
  return pages.length > 0
    ? options.getPreviousPageParam?.(pages[0], pages, pageParams[0], pageParams)
    : void 0
}
//#endregion
//#region node_modules/.pnpm/@tanstack+query-core@5.101.4/node_modules/@tanstack/query-core/build/modern/query.js
const Query = class extends Removable {
  #queryType
  #initialState
  #revertState
  #cache
  #client
  #retryer
  #defaultOptions
  #abortSignalConsumed
  constructor(config) {
    super()
    this.#abortSignalConsumed = false
    this.#defaultOptions = config.defaultOptions
    this.setOptions(config.options)
    this.observers = []
    this.#client = config.client
    this.#cache = this.#client.getQueryCache()
    this.queryKey = config.queryKey
    this.queryHash = config.queryHash
    this.#initialState = getDefaultState$1(this.options)
    this.state = config.state ?? this.#initialState
    this.scheduleGc()
  }
  get meta() {
    return this.options.meta
  }
  get queryType() {
    return this.#queryType
  }
  get promise() {
    return this.#retryer?.promise
  }
  setOptions(options) {
    this.options = {
      ...this.#defaultOptions,
      ...options,
    }
    if (options?._type) this.#queryType = options._type
    this.updateGcTime(this.options.gcTime)
    if (this.state && this.state.data === void 0) {
      const defaultState = getDefaultState$1(this.options)
      if (defaultState.data !== void 0) {
        this.setState(successState(defaultState.data, defaultState.dataUpdatedAt))
        this.#initialState = defaultState
      }
    }
  }
  optionalRemove() {
    if (!this.observers.length && this.state.fetchStatus === "idle") this.#cache.remove(this)
  }
  setData(newData, options) {
    const data = replaceData(this.state.data, newData, this.options)
    this.#dispatch({
      data,
      type: "success",
      dataUpdatedAt: options?.updatedAt,
      manual: options?.manual,
    })
    return data
  }
  setState(state) {
    this.#dispatch({
      type: "setState",
      state,
    })
  }
  cancel(options) {
    const promise = this.#retryer?.promise
    this.#retryer?.cancel(options)
    return promise ? promise.then(noop$1).catch(noop$1) : Promise.resolve()
  }
  destroy() {
    super.destroy()
    this.cancel({ silent: true })
  }
  get resetState() {
    return this.#initialState
  }
  reset() {
    this.destroy()
    this.setState(this.resetState)
  }
  isActive() {
    return this.observers.some(
      (observer) => resolveQueryBoolean(observer.options.enabled, this) !== false,
    )
  }
  isDisabled() {
    if (this.getObserversCount() > 0) return !this.isActive()
    return this.options.queryFn === skipToken || !this.isFetched()
  }
  isFetched() {
    return this.state.dataUpdateCount + this.state.errorUpdateCount > 0
  }
  isStatic() {
    if (this.getObserversCount() > 0)
      return this.observers.some(
        (observer) => resolveStaleTime(observer.options.staleTime, this) === "static",
      )
    return false
  }
  isStale() {
    if (this.getObserversCount() > 0)
      return this.observers.some((observer) => observer.getCurrentResult().isStale)
    return this.state.data === void 0 || this.state.isInvalidated
  }
  isStaleByTime(staleTime = 0) {
    if (this.state.data === void 0) return true
    if (staleTime === "static") return false
    if (this.state.isInvalidated) return true
    return !timeUntilStale(this.state.dataUpdatedAt, staleTime)
  }
  onFocus() {
    this.observers.find((x) => x.shouldFetchOnWindowFocus())?.refetch({ cancelRefetch: false })
    this.#retryer?.continue()
  }
  onOnline() {
    this.observers.find((x) => x.shouldFetchOnReconnect())?.refetch({ cancelRefetch: false })
    this.#retryer?.continue()
  }
  addObserver(observer) {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer)
      this.clearGcTimeout()
      this.#cache.notify({
        type: "observerAdded",
        query: this,
        observer,
      })
    }
  }
  removeObserver(observer) {
    if (this.observers.includes(observer)) {
      this.observers = this.observers.filter((x) => x !== observer)
      if (!this.observers.length) {
        if (this.#retryer) {
          if (this.#abortSignalConsumed || this.#isInitialPausedFetch())
            this.#retryer.cancel({ revert: true })
          else this.#retryer.cancelRetry()
        }
        this.scheduleGc()
      }
      this.#cache.notify({
        type: "observerRemoved",
        query: this,
        observer,
      })
    }
  }
  getObserversCount() {
    return this.observers.length
  }
  #isInitialPausedFetch() {
    return this.state.fetchStatus === "paused" && this.state.status === "pending"
  }
  invalidate() {
    if (!this.state.isInvalidated) this.#dispatch({ type: "invalidate" })
  }
  async fetch(options, fetchOptions) {
    if (this.state.fetchStatus !== "idle" && this.#retryer?.status() !== "rejected") {
      if (this.state.data !== void 0 && fetchOptions?.cancelRefetch) this.cancel({ silent: true })
      else if (this.#retryer) {
        this.#retryer.continueRetry()
        return this.#retryer.promise
      }
    }
    if (options) this.setOptions(options)
    if (!this.options.queryFn) {
      const observer = this.observers.find((x) => x.options.queryFn)
      if (observer) this.setOptions(observer.options)
    }
    const abortController = new AbortController()
    const addSignalProperty = (object) => {
      Object.defineProperty(object, "signal", {
        enumerable: true,
        get: () => {
          this.#abortSignalConsumed = true
          return abortController.signal
        },
      })
    }
    const fetchFn = () => {
      const queryFn = ensureQueryFn(this.options, fetchOptions)
      const createQueryFnContext = () => {
        const queryFnContext2 = {
          client: this.#client,
          queryKey: this.queryKey,
          meta: this.meta,
        }
        addSignalProperty(queryFnContext2)
        return queryFnContext2
      }
      const queryFnContext = createQueryFnContext()
      this.#abortSignalConsumed = false
      if (this.options.persister) return this.options.persister(queryFn, queryFnContext, this)
      return queryFn(queryFnContext)
    }
    const createFetchContext = () => {
      const context2 = {
        fetchOptions,
        options: this.options,
        queryKey: this.queryKey,
        client: this.#client,
        state: this.state,
        fetchFn,
      }
      addSignalProperty(context2)
      return context2
    }
    const context = createFetchContext()
    ;(this.#queryType === "infinite"
      ? infiniteQueryBehavior(this.options.pages)
      : this.options.behavior
    )?.onFetch(context, this)
    this.#revertState = this.state
    if (this.state.fetchStatus === "idle" || this.state.fetchMeta !== context.fetchOptions?.meta)
      this.#dispatch({
        type: "fetch",
        meta: context.fetchOptions?.meta,
      })
    this.#retryer = createRetryer({
      initialPromise: fetchOptions?.initialPromise,
      fn: context.fetchFn,
      onCancel: (error) => {
        if (error instanceof CancelledError && error.revert)
          this.setState({
            ...this.#revertState,
            fetchStatus: "idle",
          })
        abortController.abort()
      },
      onFail: (failureCount, error) => {
        this.#dispatch({
          type: "failed",
          failureCount,
          error,
        })
      },
      onPause: () => {
        this.#dispatch({ type: "pause" })
      },
      onContinue: () => {
        this.#dispatch({ type: "continue" })
      },
      retry: context.options.retry,
      retryDelay: context.options.retryDelay,
      networkMode: context.options.networkMode,
      canRun: () => true,
    })
    try {
      const data = await this.#retryer.start()
      if (data === void 0) throw new Error(`${this.queryHash} data is undefined`)
      this.setData(data)
      this.#cache.config.onSuccess?.(data, this)
      this.#cache.config.onSettled?.(data, this.state.error, this)
      return data
    } catch (error) {
      if (error instanceof CancelledError) {
        if (error.silent) return this.#retryer.promise
        else if (error.revert) {
          if (this.state.data === void 0) throw error
          return this.state.data
        }
      }
      this.#dispatch({
        type: "error",
        error,
      })
      this.#cache.config.onError?.(error, this)
      this.#cache.config.onSettled?.(this.state.data, error, this)
      throw error
    } finally {
      this.scheduleGc()
    }
  }
  #dispatch(action) {
    const reducer = (state) => {
      switch (action.type) {
        case "failed":
          return {
            ...state,
            fetchFailureCount: action.failureCount,
            fetchFailureReason: action.error,
          }
        case "pause":
          return {
            ...state,
            fetchStatus: "paused",
          }
        case "continue":
          return {
            ...state,
            fetchStatus: "fetching",
          }
        case "fetch":
          return {
            ...state,
            ...fetchState(state.data, this.options),
            fetchMeta: action.meta ?? null,
          }
        case "success":
          const newState = {
            ...state,
            ...successState(action.data, action.dataUpdatedAt),
            dataUpdateCount: state.dataUpdateCount + 1,
            ...(!action.manual && {
              fetchStatus: "idle",
              fetchFailureCount: 0,
              fetchFailureReason: null,
            }),
          }
          this.#revertState = action.manual ? newState : void 0
          return newState
        case "error":
          const error = action.error
          return {
            ...state,
            error,
            errorUpdateCount: state.errorUpdateCount + 1,
            errorUpdatedAt: Date.now(),
            fetchFailureCount: state.fetchFailureCount + 1,
            fetchFailureReason: error,
            fetchStatus: "idle",
            status: "error",
            isInvalidated: true,
          }
        case "invalidate":
          return {
            ...state,
            isInvalidated: true,
          }
        case "setState":
          return {
            ...state,
            ...action.state,
          }
      }
    }
    this.state = reducer(this.state)
    notifyManager.batch(() => {
      this.observers.forEach((observer) => {
        observer.onQueryUpdate()
      })
      this.#cache.notify({
        query: this,
        type: "updated",
        action,
      })
    })
  }
}
function fetchState(data, options) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: canFetch(options.networkMode) ? "fetching" : "paused",
    ...(data === void 0 && {
      error: null,
      status: "pending",
    }),
  }
}
function successState(data, dataUpdatedAt) {
  return {
    data,
    dataUpdatedAt: dataUpdatedAt ?? Date.now(),
    error: null,
    isInvalidated: false,
    status: "success",
  }
}
function getDefaultState$1(options) {
  const data =
    typeof options.initialData === "function" ? options.initialData() : options.initialData
  const hasData = data !== void 0
  const initialDataUpdatedAt = hasData
    ? typeof options.initialDataUpdatedAt === "function"
      ? options.initialDataUpdatedAt()
      : options.initialDataUpdatedAt
    : 0
  return {
    data,
    dataUpdateCount: 0,
    dataUpdatedAt: hasData ? (initialDataUpdatedAt ?? Date.now()) : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: false,
    status: hasData ? "success" : "pending",
    fetchStatus: "idle",
  }
}
//#endregion
//#region node_modules/.pnpm/@tanstack+query-core@5.101.4/node_modules/@tanstack/query-core/build/modern/mutation.js
const Mutation = class extends Removable {
  #client
  #observers
  #mutationCache
  #retryer
  constructor(config) {
    super()
    this.#client = config.client
    this.mutationId = config.mutationId
    this.#mutationCache = config.mutationCache
    this.#observers = []
    this.state = config.state || getDefaultState()
    this.setOptions(config.options)
    this.scheduleGc()
  }
  setOptions(options) {
    this.options = options
    this.updateGcTime(this.options.gcTime)
  }
  get meta() {
    return this.options.meta
  }
  addObserver(observer) {
    if (!this.#observers.includes(observer)) {
      this.#observers.push(observer)
      this.clearGcTimeout()
      this.#mutationCache.notify({
        type: "observerAdded",
        mutation: this,
        observer,
      })
    }
  }
  removeObserver(observer) {
    this.#observers = this.#observers.filter((x) => x !== observer)
    this.scheduleGc()
    this.#mutationCache.notify({
      type: "observerRemoved",
      mutation: this,
      observer,
    })
  }
  optionalRemove() {
    if (!this.#observers.length) {
      if (this.state.status === "pending") this.scheduleGc()
      else this.#mutationCache.remove(this)
    }
  }
  continue() {
    return this.#retryer?.continue() ?? this.execute(this.state.variables)
  }
  async execute(variables) {
    const onContinue = () => {
      this.#dispatch({ type: "continue" })
    }
    const mutationFnContext = {
      client: this.#client,
      meta: this.options.meta,
      mutationKey: this.options.mutationKey,
    }
    this.#retryer = createRetryer({
      fn: () => {
        if (!this.options.mutationFn)
          return Promise.reject(/* @__PURE__ */ new Error("No mutationFn found"))
        return this.options.mutationFn(variables, mutationFnContext)
      },
      onFail: (failureCount, error) => {
        this.#dispatch({
          type: "failed",
          failureCount,
          error,
        })
      },
      onPause: () => {
        this.#dispatch({ type: "pause" })
      },
      onContinue,
      retry: this.options.retry ?? 0,
      retryDelay: this.options.retryDelay,
      networkMode: this.options.networkMode,
      canRun: () => this.#mutationCache.canRun(this),
    })
    const restored = this.state.status === "pending"
    const isPaused = !this.#retryer.canStart()
    try {
      if (restored) onContinue()
      else {
        this.#dispatch({
          type: "pending",
          variables,
          isPaused,
        })
        if (this.#mutationCache.config.onMutate)
          await this.#mutationCache.config.onMutate(variables, this, mutationFnContext)
        const context = await this.options.onMutate?.(variables, mutationFnContext)
        if (context !== this.state.context)
          this.#dispatch({
            type: "pending",
            context,
            variables,
            isPaused,
          })
      }
      const data = await this.#retryer.start()
      await this.#mutationCache.config.onSuccess?.(
        data,
        variables,
        this.state.context,
        this,
        mutationFnContext,
      )
      await this.options.onSuccess?.(data, variables, this.state.context, mutationFnContext)
      await this.#mutationCache.config.onSettled?.(
        data,
        null,
        this.state.variables,
        this.state.context,
        this,
        mutationFnContext,
      )
      await this.options.onSettled?.(data, null, variables, this.state.context, mutationFnContext)
      this.#dispatch({
        type: "success",
        data,
      })
      return data
    } catch (error) {
      try {
        await this.#mutationCache.config.onError?.(
          error,
          variables,
          this.state.context,
          this,
          mutationFnContext,
        )
      } catch (e) {
        Promise.reject(e)
      }
      try {
        await this.options.onError?.(error, variables, this.state.context, mutationFnContext)
      } catch (e) {
        Promise.reject(e)
      }
      try {
        await this.#mutationCache.config.onSettled?.(
          void 0,
          error,
          this.state.variables,
          this.state.context,
          this,
          mutationFnContext,
        )
      } catch (e) {
        Promise.reject(e)
      }
      try {
        await this.options.onSettled?.(
          void 0,
          error,
          variables,
          this.state.context,
          mutationFnContext,
        )
      } catch (e) {
        Promise.reject(e)
      }
      this.#dispatch({
        type: "error",
        error,
      })
      throw error
    } finally {
      this.#mutationCache.runNext(this)
    }
  }
  #dispatch(action) {
    const reducer = (state) => {
      switch (action.type) {
        case "failed":
          return {
            ...state,
            failureCount: action.failureCount,
            failureReason: action.error,
          }
        case "pause":
          return {
            ...state,
            isPaused: true,
          }
        case "continue":
          return {
            ...state,
            isPaused: false,
          }
        case "pending":
          return {
            ...state,
            context: action.context,
            data: void 0,
            failureCount: 0,
            failureReason: null,
            error: null,
            isPaused: action.isPaused,
            status: "pending",
            variables: action.variables,
            submittedAt: Date.now(),
          }
        case "success":
          return {
            ...state,
            data: action.data,
            failureCount: 0,
            failureReason: null,
            error: null,
            status: "success",
            isPaused: false,
          }
        case "error":
          return {
            ...state,
            data: void 0,
            error: action.error,
            failureCount: state.failureCount + 1,
            failureReason: action.error,
            isPaused: false,
            status: "error",
          }
      }
    }
    this.state = reducer(this.state)
    notifyManager.batch(() => {
      this.#observers.forEach((observer) => {
        observer.onMutationUpdate(action)
      })
      this.#mutationCache.notify({
        mutation: this,
        type: "updated",
        action,
      })
    })
  }
}
function getDefaultState() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: false,
    status: "idle",
    variables: void 0,
    submittedAt: 0,
  }
}
//#endregion
//#region node_modules/.pnpm/@tanstack+react-query@5.101.4_react@19.2.8/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js
const QueryClientContext = import_react.createContext(void 0)
const useQueryClient = (queryClient) => {
  const client = import_react.useContext(QueryClientContext)
  if (queryClient) return queryClient
  if (!client) throw new Error("No QueryClient set, use QueryClientProvider to set one")
  return client
}
const QueryClientProvider = ({ client, children }) => {
  import_react.useEffect(() => {
    client.mount()
    return () => {
      client.unmount()
    }
  }, [client])
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientContext.Provider, {
    value: client,
    children,
  })
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.2_@types_46200efdf1f5c806fc19b01530afd9e7/node_modules/@base-ui/utils/empty.mjs
const import_shim = require_shim()
const import_with_selector = require_with_selector()
function NOOP() {}
const EMPTY_ARRAY$1 = Object.freeze([])
const EMPTY_OBJECT = Object.freeze({})
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.2_@types_46200efdf1f5c806fc19b01530afd9e7/node_modules/@base-ui/utils/useOnMount.mjs
/**
 * A React.useEffect equivalent that runs once, when the component is mounted.
 */
function useOnMount(fn) {
  import_react.useEffect(fn, EMPTY_ARRAY$1)
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.2_@types_46200efdf1f5c806fc19b01530afd9e7/node_modules/@base-ui/utils/useRefWithInit.mjs
const UNINITIALIZED = {}
/**
 * A React.useRef() that is initialized with a function. Note that it accepts an optional
 * initialization argument, so the initialization function doesn't need to be an inline closure.
 *
 * @usage
 *   const ref = useRefWithInit(sortColumns, columns)
 */
function useRefWithInit(init, initArg) {
  const ref = import_react.useRef(UNINITIALIZED)
  if (ref.current === UNINITIALIZED) ref.current = init(initArg)
  return ref
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.2_@types_46200efdf1f5c806fc19b01530afd9e7/node_modules/@base-ui/utils/useIsoLayoutEffect.mjs
const noop = () => {}
const useIsoLayoutEffect = typeof document !== "undefined" ? import_react.useLayoutEffect : noop
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.2_@types_46200efdf1f5c806fc19b01530afd9e7/node_modules/@base-ui/utils/formatErrorMessage.mjs
/**
 * Creates a formatErrorMessage function with a custom URL and prefix.
 * @param baseUrl - The base URL for the error page (e.g., 'https://base-ui.com/production-error')
 * @param prefix - The prefix for the error message (e.g., 'Base UI')
 * @returns A function that formats error messages with the given URL and prefix
 */
function createFormatErrorMessage(baseUrl, prefix) {
  return function formatErrorMessage(code, ...args) {
    const url = new URL(baseUrl)
    url.searchParams.set("code", code.toString())
    args.forEach((arg) => url.searchParams.append("args[]", arg))
    return `${prefix} error #${code}; visit ${url} for the full message.`
  }
}
/**
 * WARNING: Don't import this directly. It's imported by the code generated by
 * `@mui/internal-babel-plugin-minify-errors`. Make sure to always use string literals in `Error`
 * constructors to ensure the plugin works as expected. Supported patterns include:
 *   throw new Error('My message');
 *   throw new Error(`My message: ${foo}`);
 *   throw new Error(`My message: ${foo}` + 'another string');
 *   ...
 */
const formatErrorMessage = createFormatErrorMessage(
  "https://base-ui.com/production-error",
  "Base UI",
)
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/toast/provider/ToastProviderContext.mjs
const ToastContext = /*#__PURE__*/ import_react.createContext(void 0)
function useToastProviderContext() {
  const context = import_react.useContext(ToastContext)
  if (!context) throw new Error(formatErrorMessage(73))
  return context
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.2_@types_46200efdf1f5c806fc19b01530afd9e7/node_modules/@base-ui/utils/reactVersion.mjs
const majorVersion = parseInt("19.2.8", 10)
function isReactVersionAtLeast(reactVersionToCheck) {
  return majorVersion >= reactVersionToCheck
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.2_@types_46200efdf1f5c806fc19b01530afd9e7/node_modules/@base-ui/utils/fastHooks.mjs
const hooks = []
const currentInstance = void 0
function getInstance() {
  return currentInstance
}
function register(hook) {
  hooks.push(hook)
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.2_@types_46200efdf1f5c806fc19b01530afd9e7/node_modules/@base-ui/utils/store/useStore.mjs
const useStoreImplementation = isReactVersionAtLeast(19) ? useStoreFast : useStoreLegacy
function useStore(store, selector, a1, a2, a3) {
  return useStoreImplementation(store, selector, a1, a2, a3)
}
function useStoreR19(store, selector, a1, a2, a3) {
  const getSelection = import_react.useCallback(
    () => selector(store.getSnapshot(), a1, a2, a3),
    [store, selector, a1, a2, a3],
  )
  return (0, import_shim.useSyncExternalStore)(store.subscribe, getSelection, getSelection)
}
register({
  before(instance) {
    instance.syncIndex = 0
    if (!instance.didInitialize) {
      instance.syncTick = 1
      instance.syncHooks = []
      instance.didChangeStore = true
      instance.getSnapshot = () => {
        let didChange = false
        for (let i = 0; i < instance.syncHooks.length; i += 1) {
          const hook = instance.syncHooks[i]
          const value = hook.selector(hook.store.state, hook.a1, hook.a2, hook.a3)
          if (!Object.is(hook.value, value)) {
            didChange = true
            hook.value = value
          }
        }
        if (didChange) instance.syncTick += 1
        return instance.syncTick
      }
    }
  },
  after(instance) {
    if (instance.syncHooks.length > 0) {
      if (instance.didChangeStore) {
        instance.didChangeStore = false
        instance.subscribe = (onStoreChange) => {
          const stores = /* @__PURE__ */ new Set()
          for (const hook of instance.syncHooks) stores.add(hook.store)
          const unsubscribes = []
          for (const store of stores) unsubscribes.push(store.subscribe(onStoreChange))
          return () => {
            for (const unsubscribe of unsubscribes) unsubscribe()
          }
        }
      }
      ;(0, import_shim.useSyncExternalStore)(
        instance.subscribe,
        instance.getSnapshot,
        instance.getSnapshot,
      )
    }
  },
})
function useStoreFast(store, selector, a1, a2, a3) {
  const instance = getInstance()
  if (!instance) return useStoreR19(store, selector, a1, a2, a3)
  const index = instance.syncIndex
  instance.syncIndex += 1
  let hook
  if (!instance.didInitialize) {
    hook = {
      store,
      selector,
      a1,
      a2,
      a3,
      value: selector(store.getSnapshot(), a1, a2, a3),
    }
    instance.syncHooks.push(hook)
  } else {
    hook = instance.syncHooks[index]
    if (
      hook.store !== store ||
      hook.selector !== selector ||
      !Object.is(hook.a1, a1) ||
      !Object.is(hook.a2, a2) ||
      !Object.is(hook.a3, a3)
    ) {
      if (hook.store !== store) instance.didChangeStore = true
      hook.store = store
      hook.selector = selector
      hook.a1 = a1
      hook.a2 = a2
      hook.a3 = a3
      hook.value = selector(store.getSnapshot(), a1, a2, a3)
    }
  }
  return hook.value
}
function useStoreLegacy(store, selector, a1, a2, a3) {
  return (0, import_with_selector.useSyncExternalStoreWithSelector)(
    store.subscribe,
    store.getSnapshot,
    store.getSnapshot,
    (state) => selector(state, a1, a2, a3),
  )
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.2_@types_46200efdf1f5c806fc19b01530afd9e7/node_modules/@base-ui/utils/store/Store.mjs
/**
 * A data store implementation that allows subscribing to state changes and updating the state.
 * It uses an observer pattern to notify subscribers when the state changes.
 */
const Store = class {
  /**
   * The current state of the store.
   * This property is updated immediately when the state changes as a result of calling {@link setState}, {@link update}, or {@link set}.
   * To subscribe to state changes, use the {@link useState} method. The value returned by {@link useState} is updated after the component renders (similarly to React's useState).
   * The values can be used directly (to avoid subscribing to the store) in effects or event handlers.
   *
   * Do not modify properties in state directly. Instead, use the provided methods to ensure proper state management and listener notification.
   */
  constructor(state) {
    this.state = state
    this.listeners = /* @__PURE__ */ new Set()
    this.updateTick = 0
  }
  /**
   * Registers a listener that will be called whenever the store's state changes.
   *
   * @param fn The listener function to be called on state changes.
   * @returns A function to unsubscribe the listener.
   */
  subscribe = (fn) => {
    this.listeners.add(fn)
    return () => {
      this.listeners.delete(fn)
    }
  }
  /**
   * Returns the current state of the store.
   */
  getSnapshot = () => {
    return this.state
  }
  /**
   * Updates the entire store's state and notifies all registered listeners.
   *
   * @param newState The new state to set for the store.
   */
  setState(newState) {
    if (this.state === newState) return
    this.state = newState
    this.updateTick += 1
    const currentTick = this.updateTick
    for (const listener of this.listeners) {
      if (currentTick !== this.updateTick) return
      listener(newState)
    }
  }
  /**
   * Merges the provided changes into the current state and notifies listeners if there are changes.
   *
   * @param changes An object containing the changes to apply to the current state.
   */
  update(changes) {
    for (const key in changes)
      if (!Object.is(this.state[key], changes[key])) {
        this.setState({
          ...this.state,
          ...changes,
        })
        return
      }
  }
  /**
   * Sets a specific key in the store's state to a new value and notifies listeners if the value has changed.
   *
   * @param key The key in the store's state to update.
   * @param value The new value to set for the specified key.
   */
  set(key, value) {
    if (!Object.is(this.state[key], value))
      this.setState({
        ...this.state,
        [key]: value,
      })
  }
  /**
   * Gives the state a new reference and updates all registered listeners.
   */
  notifyAll() {
    const newState = { ...this.state }
    this.setState(newState)
  }
  use(selector, a1, a2, a3) {
    return useStore(this, selector, a1, a2, a3)
  }
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.2_@types_46200efdf1f5c806fc19b01530afd9e7/node_modules/@base-ui/utils/safeReact.mjs
/**
 * A clone of the React namespace for reading APIs that may be missing in older
 * supported React versions. Bundlers can rewrite direct `React.someNewApi`
 * reads into named imports, which breaks React 17. Reading from this cloned
 * object keeps those lookups optional.
 *
 * @see https://github.com/mui/material-ui/issues/41190#issuecomment-2040873379
 */
const SafeReact = { ...import_react }
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.2_@types_46200efdf1f5c806fc19b01530afd9e7/node_modules/@base-ui/utils/useStableCallback.mjs
const useInsertionEffect = SafeReact.useInsertionEffect
const useSafeInsertionEffect =
  useInsertionEffect && useInsertionEffect !== SafeReact.useLayoutEffect
    ? useInsertionEffect
    : (fn) => fn()
/**
 * Stabilizes the function passed so it's always the same between renders.
 *
 * The function becomes non-reactive to any values it captures.
 * It can safely be passed as a dependency of `React.useMemo` and `React.useEffect` without re-triggering them if its captured values change.
 *
 * The function must only be called inside effects and event handlers, never during render (which throws an error).
 *
 * This hook is a more permissive version of React 19.2's `React.useEffectEvent` in that it can be passed through contexts and called in event handler props, not just effects.
 */
function useStableCallback(callback) {
  const stable = useRefWithInit(createStableCallback).current
  stable.next = callback
  useSafeInsertionEffect(stable.effect)
  return stable.trampoline
}
function createStableCallback() {
  const stable = {
    next: void 0,
    callback: assertNotCalled,
    trampoline: (...args) => stable.callback?.(...args),
    effect: () => {
      stable.callback = stable.next
    },
  }
  return stable
}
function assertNotCalled() {}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.2_@types_46200efdf1f5c806fc19b01530afd9e7/node_modules/@base-ui/utils/store/ReactStore.mjs
/**
 * A Store that supports controlled state keys, non-reactive values and provides utility methods for React.
 */
const ReactStore = class extends Store {
  /**
   * Creates a new ReactStore instance.
   *
   * @param state Initial state of the store.
   * @param context Non-reactive context values.
   * @param selectors Optional selectors for use with `useState`.
   */
  constructor(state, context = {}, selectors) {
    super(state)
    this.context = context
    this.selectors = selectors
  }
  /**
   * Non-reactive values such as refs, callbacks, etc.
   */
  /**
   * Synchronizes a single external value into the store.
   *
   * Note that the while the value in `state` is updated immediately, the value returned
   * by `useState` is updated before the next render (similarly to React's `useState`).
   */
  useSyncedValue(key, value) {
    import_react.useDebugValue(key)
    const store = this
    useIsoLayoutEffect(() => {
      if (store.state[key] !== value) store.set(key, value)
    }, [store, key, value])
  }
  /**
   * Synchronizes a single external value into the store and
   * cleans it up (sets to `undefined`) on unmount.
   *
   * Note that the while the value in `state` is updated immediately, the value returned
   * by `useState` is updated before the next render (similarly to React's `useState`).
   */
  useSyncedValueWithCleanup(key, value) {
    const store = this
    useIsoLayoutEffect(() => {
      if (store.state[key] !== value) store.set(key, value)
      return () => {
        store.set(key, void 0)
      }
    }, [store, key, value])
  }
  /**
   * Synchronizes multiple external values into the store.
   *
   * Note that the while the values in `state` are updated immediately, the values returned
   * by `useState` are updated before the next render (similarly to React's `useState`).
   */
  useSyncedValues(statePart) {
    const store = this
    useIsoLayoutEffect(() => {
      store.update(statePart)
    }, [store, ...Object.values(statePart)])
  }
  /**
   * Registers a controllable prop pair (`controlled`, `defaultValue`) for a specific key. If `controlled`
   * is non-undefined, the store's state at `key` is updated to match `controlled`.
   */
  useControlledProp(key, controlled) {
    import_react.useDebugValue(key)
    const store = this
    const isControlled = controlled !== void 0
    useIsoLayoutEffect(() => {
      if (isControlled && !Object.is(store.state[key], controlled))
        store.setState({
          ...store.state,
          [key]: controlled,
        })
    }, [store, key, controlled, isControlled])
  }
  /** Gets the current value from the store using a selector with the provided key.
   *
   * @param key Key of the selector to use.
   */
  select(key, a1, a2, a3) {
    const selector = this.selectors[key]
    return selector(this.state, a1, a2, a3)
  }
  /**
   * Returns a value from the store's state using a selector function.
   * Used to subscribe to specific parts of the state.
   * This methods causes a rerender whenever the selected state changes.
   *
   * @param key Key of the selector to use.
   */
  useState(key, a1, a2, a3) {
    import_react.useDebugValue(key)
    return useStore(this, this.selectors[key], a1, a2, a3)
  }
  /**
   * Wraps a function with `useStableCallback` to ensure it has a stable reference
   * and assigns it to the context.
   *
   * @param key Key of the event callback. Must be a function in the context.
   * @param fn Function to assign.
   */
  useContextCallback(key, fn) {
    import_react.useDebugValue(key)
    const stableFunction = useStableCallback(fn ?? NOOP)
    this.context[key] = stableFunction
  }
  /**
   * Returns a stable setter function for a specific key in the store's state.
   * It's commonly used to pass as a ref callback to React elements.
   *
   * @param key Key of the state to set.
   */
  useStateSetter(key) {
    const ref = import_react.useRef(void 0)
    if (ref.current === void 0)
      ref.current = (value) => {
        this.set(key, value)
      }
    return ref.current
  }
  /**
   * Observes changes derived from the store's selectors and calls the listener when the selected value changes.
   *
   * @param key Key of the selector to observe.
   * @param listener Listener function called when the selector result changes.
   */
  observe(selector, listener) {
    let selectFn
    if (typeof selector === "function") selectFn = selector
    else selectFn = this.selectors[selector]
    let prevValue = selectFn(this.state)
    listener(prevValue, prevValue, this)
    return this.subscribe((nextState) => {
      const nextValue = selectFn(nextState)
      if (!Object.is(prevValue, nextValue)) {
        const oldValue = prevValue
        prevValue = nextValue
        listener(nextValue, oldValue, this)
      }
    })
  }
}
//#endregion
//#region node_modules/.pnpm/@floating-ui+utils@0.2.12/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function hasWindow() {
  return typeof window !== "undefined"
}
function getNodeName(node) {
  if (isNode(node)) return (node.nodeName || "").toLowerCase()
  return "#document"
}
function getWindow(node) {
  let _node$ownerDocument
  return (
    (node == null || (_node$ownerDocument = node.ownerDocument) == null
      ? void 0
      : _node$ownerDocument.defaultView) || window
  )
}
function getDocumentElement(node) {
  let _ref
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null
    ? void 0
    : _ref.documentElement
}
function isNode(value) {
  if (!hasWindow()) return false
  return value instanceof Node || value instanceof getWindow(value).Node
}
function isElement(value) {
  if (!hasWindow()) return false
  return value instanceof Element || value instanceof getWindow(value).Element
}
function isHTMLElement(value) {
  if (!hasWindow()) return false
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === "undefined") return false
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot
}
function isOverflowElement(element) {
  const { overflow, overflowX, overflowY, display } = getComputedStyle$1(element)
  return (
    /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) &&
    display !== "inline" &&
    display !== "contents"
  )
}
function isTableElement(element) {
  return /^(table|td|th)$/.test(getNodeName(element))
}
function isTopLayer(element) {
  try {
    if (element.matches(":popover-open")) return true
  } catch {}
  try {
    return element.matches(":modal")
  } catch {
    return false
  }
}
const willChangeRe = /transform|translate|scale|rotate|perspective|filter/
const containRe = /paint|layout|strict|content/
const isNotNone = (value) => !!value && value !== "none"
let isWebKitValue
function isContainingBlock(elementOrCss) {
  const css = isElement(elementOrCss) ? getComputedStyle$1(elementOrCss) : elementOrCss
  return (
    isNotNone(css.transform) ||
    isNotNone(css.translate) ||
    isNotNone(css.scale) ||
    isNotNone(css.rotate) ||
    isNotNone(css.perspective) ||
    (!isWebKit() && (isNotNone(css.backdropFilter) || isNotNone(css.filter))) ||
    willChangeRe.test(css.willChange || "") ||
    containRe.test(css.contain || "")
  )
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element)
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) return currentNode
    else if (isTopLayer(currentNode)) return null
    currentNode = getParentNode(currentNode)
  }
  return null
}
function isWebKit() {
  if (isWebKitValue == null)
    isWebKitValue =
      typeof CSS !== "undefined" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")
  return isWebKitValue
}
function isLastTraversableNode(node) {
  return /^(html|body|#document)$/.test(getNodeName(node))
}
function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element)
}
function getNodeScroll(element) {
  if (isElement(element))
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop,
    }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY,
  }
}
function getParentNode(node) {
  if (getNodeName(node) === "html") return node
  const result =
    node.assignedSlot ||
    node.parentNode ||
    (isShadowRoot(node) && node.host) ||
    getDocumentElement(node)
  return isShadowRoot(result) ? result.host : result
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node)
  if (isLastTraversableNode(parentNode)) return (node.ownerDocument || node).body
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) return parentNode
  return getNearestOverflowAncestor(parentNode)
}
function getOverflowAncestors(node, list, traverseIframes) {
  let _node$ownerDocument2
  if (list === void 0) list = []
  if (traverseIframes === void 0) traverseIframes = true
  const scrollableAncestor = getNearestOverflowAncestor(node)
  const isBody =
    scrollableAncestor ===
    ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body)
  const win = getWindow(scrollableAncestor)
  if (isBody) {
    const frameElement = getFrameElement(win)
    return list.concat(
      win,
      win.visualViewport || [],
      isOverflowElement(scrollableAncestor) ? scrollableAncestor : [],
      frameElement && traverseIframes ? getOverflowAncestors(frameElement) : [],
    )
  } else
    return list.concat(
      scrollableAncestor,
      getOverflowAncestors(scrollableAncestor, [], traverseIframes),
    )
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.2_@types_46200efdf1f5c806fc19b01530afd9e7/node_modules/@base-ui/utils/mergeCleanups.mjs
/**
 * Combines multiple cleanup functions into a single cleanup function.
 */
function mergeCleanups(...cleanups) {
  return () => {
    for (let i = 0; i < cleanups.length; i += 1) {
      const cleanup = cleanups[i]
      if (cleanup) cleanup()
    }
  }
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.2_@types_46200efdf1f5c806fc19b01530afd9e7/node_modules/@base-ui/utils/owner.mjs
function ownerDocument(node) {
  return node?.ownerDocument || document
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.2_@types_46200efdf1f5c806fc19b01530afd9e7/node_modules/@base-ui/utils/addEventListener.mjs
/**
 * Adds an event listener and returns a cleanup function to remove it.
 */
function addEventListener(target, type, listener, options) {
  target.addEventListener(type, listener, options)
  return () => {
    target.removeEventListener(type, listener, options)
  }
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.2_@types_46200efdf1f5c806fc19b01530afd9e7/node_modules/@base-ui/utils/useAnimationFrame.mjs
const import_react_dom = /* @__PURE__ */ __toESM(require_react_dom(), 1)
/** Unlike `setTimeout`, rAF doesn't guarantee a positive integer return value, so we can't have
 * a monomorphic `uint` type with `0` meaning empty.
 * See warning note at:
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame#return_value */
const EMPTY$1 = null
globalThis.requestAnimationFrame
const Scheduler = class {
  callbacks = []
  callbacksCount = 0
  nextId = 1
  startId = 1
  isScheduled = false
  tick = (timestamp) => {
    this.isScheduled = false
    const currentCallbacks = this.callbacks
    const currentCallbacksCount = this.callbacksCount
    this.callbacks = []
    this.callbacksCount = 0
    this.startId = this.nextId
    if (currentCallbacksCount > 0)
      for (let i = 0; i < currentCallbacks.length; i += 1) currentCallbacks[i]?.(timestamp)
  }
  request(fn) {
    const id = this.nextId
    this.nextId += 1
    this.callbacks.push(fn)
    this.callbacksCount += 1
    if (!this.isScheduled || false) {
      requestAnimationFrame(this.tick)
      this.isScheduled = true
    }
    return id
  }
  cancel(id) {
    const index = id - this.startId
    if (index < 0 || index >= this.callbacks.length) return
    this.callbacks[index] = null
    this.callbacksCount -= 1
  }
}
const scheduler = new Scheduler()
const AnimationFrame = class AnimationFrame {
  static create() {
    return new AnimationFrame()
  }
  static request(fn) {
    return scheduler.request(fn)
  }
  static cancel(id) {
    return scheduler.cancel(id)
  }
  currentId = EMPTY$1
  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  request(fn) {
    this.cancel()
    this.currentId = scheduler.request(() => {
      this.currentId = EMPTY$1
      fn()
    })
  }
  cancel = () => {
    if (this.currentId !== EMPTY$1) {
      scheduler.cancel(this.currentId)
      this.currentId = EMPTY$1
    }
  }
  disposeEffect = () => {
    return this.cancel
  }
}
/**
 * A `requestAnimationFrame` with automatic cleanup and guard.
 */
function useAnimationFrame() {
  const timeout = useRefWithInit(AnimationFrame.create).current
  useOnMount(timeout.disposeEffect)
  return timeout
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.2_@types_46200efdf1f5c806fc19b01530afd9e7/node_modules/@base-ui/utils/useTimeout.mjs
const EMPTY = 0
const Timeout = class Timeout {
  static create() {
    return new Timeout()
  }
  currentId = EMPTY
  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  start(delay, fn) {
    this.clear()
    this.currentId = setTimeout(() => {
      this.currentId = EMPTY
      fn()
    }, delay)
  }
  isStarted() {
    return this.currentId !== EMPTY
  }
  clear = () => {
    if (this.currentId !== EMPTY) {
      clearTimeout(this.currentId)
      this.currentId = EMPTY
    }
  }
  disposeEffect = () => {
    return this.clear
  }
}
/**
 * A `setTimeout` with automatic cleanup and guard.
 */
function useTimeout() {
  const timeout = useRefWithInit(Timeout.create).current
  useOnMount(timeout.disposeEffect)
  return timeout
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.2_@types_46200efdf1f5c806fc19b01530afd9e7/node_modules/@base-ui/utils/generateId.mjs
let counter = 0
function generateId(prefix) {
  counter += 1
  return `${prefix}-${Math.random().toString(36).slice(2, 6)}-${counter}`
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/toast/utils/resolvePromiseOptions.mjs
function resolvePromiseOptions(options, result) {
  if (typeof options === "string") return { description: options }
  if (typeof options === "function") {
    const resolvedOptions = options(result)
    return typeof resolvedOptions === "string" ? { description: resolvedOptions } : resolvedOptions
  }
  return options
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.2_@types_46200efdf1f5c806fc19b01530afd9e7/node_modules/@base-ui/utils/platform/shared.mjs
/**
 * Reads `navigator.userAgent` / `navigator.platform` (legacy but universally
 * supported) into a normalized shape. In development, prefers the modern
 * `navigator.userAgentData` API on Chromium to avoid DevTools warnings about
 * the deprecated reads; that branch is dead-code-eliminated in production
 * builds to keep the bundle small.
 *
 * Returns empty/zero values when `navigator` is undefined (SSR), so every
 * derived flag safely evaluates to `false`.
 */
function readRawData() {
  if (typeof navigator === "undefined")
    return {
      userAgent: "",
      platform: "",
      maxTouchPoints: 0,
    }
  return {
    userAgent: navigator.userAgent,
    platform: navigator.platform ?? "",
    maxTouchPoints: navigator.maxTouchPoints ?? 0,
  }
}
const { userAgent, platform: platform$1, maxTouchPoints } = readRawData()
const lowerUserAgent = userAgent.toLowerCase()
const lowerPlatform = platform$1.toLowerCase()
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.2_@types_46200efdf1f5c806fc19b01530afd9e7/node_modules/@base-ui/utils/platform/os.mjs
/** iPhone, iPad (including iPadOS 13+ reporting as macOS), iPod. */
const ios = /^i(os$|p)/.test(lowerPlatform) || (lowerPlatform === "macintel" && maxTouchPoints > 1)
/** Android phones, tablets, and embedded Android browsers. */
const ANDROID_STRING = "android"
const android = lowerPlatform === ANDROID_STRING || lowerUserAgent.includes(ANDROID_STRING)
/** macOS desktop. Excludes iPadOS, which reports as `MacIntel`. */
const mac = !ios && lowerPlatform.startsWith("mac")
lowerPlatform.startsWith("win")
!android && /^(linux|chrome os)/.test(lowerPlatform)
/** Any Apple OS (`mac || ios`). */
const apple = mac || ios
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.2_@types_46200efdf1f5c806fc19b01530afd9e7/node_modules/@base-ui/utils/platform/engine.mjs
/** WebKit: Safari, all iOS browsers, GNOME Web. Excludes Blink. */
const webkit = typeof CSS !== "undefined" && !!CSS.supports?.("-webkit-backdrop-filter:none")
!webkit && lowerUserAgent.includes("firefox")
!webkit && lowerUserAgent.includes("chrom")
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.2_@types_46200efdf1f5c806fc19b01530afd9e7/node_modules/@base-ui/utils/platform/screen-reader.mjs
/**
 * The user *may* be using VoiceOver — actual activation is not detectable.
 * True on any Apple platform (macOS, iOS, iPadOS).
 */
const voiceOver = apple
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.2_@types_46200efdf1f5c806fc19b01530afd9e7/node_modules/@base-ui/utils/platform/env.mjs
/** Running in jsdom or HappyDOM (used by unit tests). */
const jsdom = /jsdom|happydom/.test(lowerUserAgent)
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/floating-ui-react/utils/constants.mjs
const FOCUSABLE_ATTRIBUTE = "data-base-ui-focusable"
const TYPEABLE_SELECTOR =
  "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])"
const ARROW_LEFT$1 = "ArrowLeft"
const ARROW_RIGHT$1 = "ArrowRight"
const ARROW_UP$1 = "ArrowUp"
const ARROW_DOWN$1 = "ArrowDown"
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/internals/shadowDom.mjs
function activeElement(doc) {
  let element = doc.activeElement
  while (element?.shadowRoot?.activeElement != null) element = element.shadowRoot.activeElement
  return element
}
function contains(parent, child) {
  if (!parent || !child) return false
  const rootNode = child.getRootNode?.()
  if (parent.contains(child)) return true
  if (rootNode && isShadowRoot(rootNode)) {
    let next = child
    while (next) {
      if (parent === next) return true
      next = next.parentNode || next.host
    }
  }
  return false
}
function getTarget(event) {
  if ("composedPath" in event) return event.composedPath()[0]
  return event.target
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/floating-ui-react/utils/element.mjs
function isTargetInsideEnabledTrigger(target, triggerElements) {
  if (!isElement(target)) return false
  const targetElement = target
  if (triggerElements.hasElement(targetElement))
    return !targetElement.hasAttribute("data-trigger-disabled")
  for (const [, trigger] of triggerElements.entries())
    if (contains(trigger, targetElement)) return !trigger.hasAttribute("data-trigger-disabled")
  return false
}
function isEventTargetWithin(event, node) {
  if (node == null) return false
  if ("composedPath" in event) return event.composedPath().includes(node)
  const eventAgain = event
  return eventAgain.target != null && node.contains(eventAgain.target)
}
function isRootElement(element) {
  return element.matches("html,body")
}
function isTypeableElement(element) {
  return (
    isHTMLElement(element) &&
    element.matches(
      "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])",
    )
  )
}
function isInteractiveElement(element) {
  return (
    element?.closest(
      `button,a[href],[role="button"],select,[tabindex]:not([tabindex="-1"]),${TYPEABLE_SELECTOR}`,
    ) != null
  )
}
function isTypeableCombobox(element) {
  if (!element) return false
  return element.getAttribute("role") === "combobox" && isTypeableElement(element)
}
function matchesFocusVisible(element) {
  if (!element || jsdom) return true
  try {
    return element.matches(":focus-visible")
  } catch {
    return true
  }
}
function getFloatingFocusElement(floatingElement) {
  if (!floatingElement) return null
  return floatingElement.hasAttribute("data-base-ui-focusable")
    ? floatingElement
    : floatingElement.querySelector(`[data-base-ui-focusable]`) || floatingElement
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/floating-ui-react/utils/nodes.mjs
function getNodeChildren(nodes, id, onlyOpenChildren = true) {
  return nodes
    .filter((node) => node.parentId === id)
    .flatMap((child) => [
      ...(!onlyOpenChildren || child.context?.open ? [child] : []),
      ...getNodeChildren(nodes, child.id, onlyOpenChildren),
    ])
}
function getNodeAncestors(nodes, id) {
  let allAncestors = []
  let currentParentId = nodes.find((node) => node.id === id)?.parentId
  while (currentParentId) {
    const currentNode = nodes.find((node) => node.id === currentParentId)
    currentParentId = currentNode?.parentId
    if (currentNode) allAncestors = allAncestors.concat(currentNode)
  }
  return allAncestors
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/floating-ui-react/utils/event.mjs
function stopEvent(event) {
  event.preventDefault()
  event.stopPropagation()
}
function isReactEvent(event) {
  return "nativeEvent" in event
}
function isVirtualClick(event) {
  if (event.pointerType === "" && event.isTrusted) return true
  if (android && event.pointerType) return event.type === "click" && event.buttons === 1
  return event.detail === 0 && !event.pointerType
}
function isVirtualPointerEvent(event) {
  if (jsdom) return false
  return (
    (!android && event.width === 0 && event.height === 0) ||
    (android &&
      event.width === 1 &&
      event.height === 1 &&
      event.pressure === 0 &&
      event.detail === 0 &&
      event.pointerType === "mouse") ||
    (event.width < 1 &&
      event.height < 1 &&
      event.pressure === 0 &&
      event.detail === 0 &&
      event.pointerType === "touch")
  )
}
function isMouseLikePointerType(pointerType, strict) {
  const values = ["mouse", "pen"]
  if (!strict) values.push("", void 0)
  return values.includes(pointerType)
}
function isClickLikeEvent(event) {
  const type = event.type
  return type === "click" || type === "mousedown" || type === "keydown" || type === "keyup"
}
//#endregion
//#region node_modules/.pnpm/@floating-ui+utils@0.2.12/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
const min = Math.min
const max = Math.max
const round = Math.round
const floor = Math.floor
const createCoords = (v) => ({
  x: v,
  y: v,
})
const oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom",
}
function clamp$1(start, value, end) {
  return max(start, min(value, end))
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value
}
function getSide(placement) {
  return placement.split("-")[0]
}
function getAlignment(placement) {
  return placement.split("-")[1]
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x"
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width"
}
function getSideAxis(placement) {
  const firstChar = placement[0]
  return firstChar === "t" || firstChar === "b" ? "y" : "x"
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement))
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) rtl = false
  const alignment = getAlignment(placement)
  const alignmentAxis = getAlignmentAxis(placement)
  const length = getAxisLength(alignmentAxis)
  let mainAlignmentSide =
    alignmentAxis === "x"
      ? alignment === (rtl ? "end" : "start")
        ? "right"
        : "left"
      : alignment === "start"
        ? "bottom"
        : "top"
  if (rects.reference[length] > rects.floating[length])
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide)
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)]
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement)
  return [
    getOppositeAlignmentPlacement(placement),
    oppositePlacement,
    getOppositeAlignmentPlacement(oppositePlacement),
  ]
}
function getOppositeAlignmentPlacement(placement) {
  return placement.includes("start")
    ? placement.replace("start", "end")
    : placement.replace("end", "start")
}
const lrPlacement = ["left", "right"]
const rlPlacement = ["right", "left"]
const tbPlacement = ["top", "bottom"]
const btPlacement = ["bottom", "top"]
function getSideList(side, isStart, rtl) {
  switch (side) {
    case "top":
    case "bottom":
      if (rtl) return isStart ? rlPlacement : lrPlacement
      return isStart ? lrPlacement : rlPlacement
    case "left":
    case "right":
      return isStart ? tbPlacement : btPlacement
    default:
      return []
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement)
  let list = getSideList(getSide(placement), direction === "start", rtl)
  if (alignment) {
    list = list.map((side) => `${side}-${alignment}`)
    if (flipAlignment) list = list.concat(list.map(getOppositeAlignmentPlacement))
  }
  return list
}
function getOppositePlacement(placement) {
  const side = getSide(placement)
  return oppositeSideMap[side] + placement.slice(side.length)
}
function expandPaddingObject(padding) {
  let _padding$top, _padding$right, _padding$bottom, _padding$left
  return {
    top: (_padding$top = padding.top) != null ? _padding$top : 0,
    right: (_padding$right = padding.right) != null ? _padding$right : 0,
    bottom: (_padding$bottom = padding.bottom) != null ? _padding$bottom : 0,
    left: (_padding$left = padding.left) != null ? _padding$left : 0,
  }
}
function getPaddingObject(padding) {
  return typeof padding !== "number"
    ? expandPaddingObject(padding)
    : {
        top: padding,
        right: padding,
        bottom: padding,
        left: padding,
      }
}
function rectToClientRect(rect) {
  const { x, y, width, height } = rect
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y,
  }
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/floating-ui-react/utils/composite.mjs
function isIndexOutOfListBounds(list, index) {
  return index < 0 || index >= list.length
}
function getMinListIndex(listRef, disabledIndices) {
  return findNonDisabledListIndex(listRef.current, { disabledIndices })
}
function getMaxListIndex(listRef, disabledIndices) {
  return findNonDisabledListIndex(listRef.current, {
    decrement: true,
    startingIndex: listRef.current.length,
    disabledIndices,
  })
}
function findNonDisabledListIndex(
  list,
  { startingIndex = -1, decrement = false, disabledIndices, amount = 1 } = {},
) {
  let index = startingIndex
  do index += decrement ? -amount : amount
  while (
    index >= 0 &&
    index <= list.length - 1 &&
    isListIndexDisabled(list, index, disabledIndices)
  )
  return index
}
function isListIndexDisabled(list, index, disabledIndices) {
  if (
    typeof disabledIndices === "function"
      ? disabledIndices(index)
      : (disabledIndices?.includes(index) ?? false)
  )
    return true
  const element = list[index]
  if (!element) return false
  if (!isElementVisible(element)) return true
  if (element.matches(":disabled")) return true
  return (
    !disabledIndices &&
    (element.hasAttribute("disabled") || element.getAttribute("aria-disabled") === "true")
  )
}
function isHiddenByStyles(styles) {
  return styles.visibility === "hidden" || styles.visibility === "collapse"
}
function isElementVisible(element, styles = element ? getComputedStyle$1(element) : null) {
  if (!element || !element.isConnected || !styles || isHiddenByStyles(styles)) return false
  if (typeof element.checkVisibility === "function") return element.checkVisibility()
  return styles.display !== "none" && styles.display !== "contents"
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/floating-ui-react/utils/tabbable.mjs
const CANDIDATE_SELECTOR =
  'a[href],button,input,select,textarea,summary,details,iframe,object,embed,[tabindex],[contenteditable]:not([contenteditable="false"]),audio[controls],video[controls]'
function getParentElement(element) {
  const assignedSlot = element.assignedSlot
  if (assignedSlot) return assignedSlot
  if (element.parentElement) return element.parentElement
  const rootNode = element.getRootNode()
  return isShadowRoot(rootNode) ? rootNode.host : null
}
function getDetailsSummary(details) {
  for (const child of [...details.children]) if (getNodeName(child) === "summary") return child
  return null
}
function isWithinOpenDetailsSummary(element, details) {
  const summary = getDetailsSummary(details)
  return Boolean(summary) && (element === summary || contains(summary, element))
}
function isFocusableCandidate(element) {
  const nodeName = element ? getNodeName(element) : ""
  return (
    element != null &&
    element.matches(CANDIDATE_SELECTOR) &&
    (nodeName !== "summary" ||
      (element.parentElement != null &&
        getNodeName(element.parentElement) === "details" &&
        getDetailsSummary(element.parentElement) === element)) &&
    (nodeName !== "details" || getDetailsSummary(element) == null) &&
    (nodeName !== "input" || element.type !== "hidden")
  )
}
function isFocusableElement(element) {
  if (!isFocusableCandidate(element) || !element.isConnected || element.matches(":disabled"))
    return false
  for (let current = element; current; current = getParentElement(current)) {
    const isAncestor = current !== element
    const isSlot = getNodeName(current) === "slot"
    if (current.hasAttribute("inert")) return false
    if (
      (isAncestor &&
        getNodeName(current) === "details" &&
        !current.open &&
        !isWithinOpenDetailsSummary(element, current)) ||
      current.hasAttribute("hidden") ||
      (!isSlot && !isVisibleInTabbableTree(current, isAncestor))
    )
      return false
  }
  return true
}
function isVisibleInTabbableTree(element, isAncestor) {
  const styles = getComputedStyle$1(element)
  if (!isAncestor) return isElementVisible(element, styles)
  return styles.display !== "none"
}
function getTabIndex(element) {
  const tabIndex = element.tabIndex
  if (tabIndex < 0) {
    const nodeName = getNodeName(element)
    if (
      nodeName === "details" ||
      nodeName === "audio" ||
      nodeName === "video" ||
      (isHTMLElement(element) && element.isContentEditable)
    )
      return 0
  }
  return tabIndex
}
function getNamedRadioInput(element) {
  if (getNodeName(element) !== "input") return null
  const input = element
  return input.type === "radio" && input.name !== "" ? input : null
}
function isTabbableRadio(element, candidates) {
  const input = getNamedRadioInput(element)
  if (!input) return true
  const checkedRadio = candidates.find((candidate) => {
    const radio = getNamedRadioInput(candidate)
    return radio?.name === input.name && radio.form === input.form && radio.checked
  })
  if (checkedRadio) return checkedRadio === input
  return (
    candidates.find((candidate) => {
      const radio = getNamedRadioInput(candidate)
      return radio?.name === input.name && radio.form === input.form
    }) === input
  )
}
function getComposedChildren(container) {
  if (isHTMLElement(container) && getNodeName(container) === "slot") {
    const assignedElements = container.assignedElements({ flatten: true })
    if (assignedElements.length > 0) return assignedElements
  }
  if (isHTMLElement(container) && container.shadowRoot) return [...container.shadowRoot.children]
  return [...container.children]
}
function appendCandidates(container, list) {
  getComposedChildren(container).forEach((child) => {
    if (isFocusableCandidate(child)) list.push(child)
    appendCandidates(child, list)
  })
}
function appendMatchingElements(container, selector, list) {
  getComposedChildren(container).forEach((child) => {
    if (isHTMLElement(child) && child.matches(selector)) list.push(child)
    appendMatchingElements(child, selector, list)
  })
}
function isTabbable(element) {
  return isFocusableElement(element) && getTabIndex(element) >= 0
}
function focusable(container) {
  const candidates = []
  appendCandidates(container, candidates)
  return candidates.filter(isFocusableElement)
}
function tabbable(container) {
  const candidates = focusable(container)
  return candidates.filter(
    (element) => getTabIndex(element) >= 0 && isTabbableRadio(element, candidates),
  )
}
function getTabbableIn(container, dir) {
  const list = tabbable(container)
  const len = list.length
  if (len === 0) return
  const active = activeElement(ownerDocument(container))
  const index = list.indexOf(active)
  return list[index === -1 ? (dir === 1 ? 0 : len - 1) : index + dir]
}
function getNextTabbable(referenceElement) {
  return getTabbableIn(ownerDocument(referenceElement).body, 1) || referenceElement
}
function getPreviousTabbable(referenceElement) {
  return getTabbableIn(ownerDocument(referenceElement).body, -1) || referenceElement
}
function getTabbableNearElement(referenceElement, dir) {
  if (!referenceElement) return null
  const list = tabbable(ownerDocument(referenceElement).body)
  const elementCount = list.length
  if (elementCount === 0) return null
  const index = list.indexOf(referenceElement)
  if (index === -1) return null
  return list[(index + dir + elementCount) % elementCount]
}
function getTabbableAfterElement(referenceElement) {
  return getTabbableNearElement(referenceElement, 1)
}
function getTabbableBeforeElement(referenceElement) {
  return getTabbableNearElement(referenceElement, -1)
}
function isOutsideEvent(event, container) {
  const containerElement = container || event.currentTarget
  const relatedTarget = event.relatedTarget
  return !relatedTarget || !contains(containerElement, relatedTarget)
}
function disableFocusInside(container) {
  tabbable(container).forEach((element) => {
    element.dataset.tabindex = element.getAttribute("tabindex") || ""
    element.setAttribute("tabindex", "-1")
  })
}
function enableFocusInside(container) {
  const elements = []
  appendMatchingElements(container, "[data-tabindex]", elements)
  elements.forEach((element) => {
    const tabindex = element.dataset.tabindex
    delete element.dataset.tabindex
    if (tabindex) element.setAttribute("tabindex", tabindex)
    else element.removeAttribute("tabindex")
  })
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/toast/store.mjs
/**
 * A toast once it lives in the store. `addToast` is the only way in and it always
 * assigns `updateKey`, so unlike the public `ToastObject` it is never missing.
 */
function createToastMetadata(toasts) {
  const metadata = /* @__PURE__ */ new Map()
  let visibleIndex = 0
  let offsetY = 0
  toasts.forEach((toast, toastIndex) => {
    const isEnding = toast.transitionStatus === "ending"
    metadata.set(toast.id, {
      value: toast,
      domIndex: toastIndex,
      visibleIndex: isEnding ? -1 : visibleIndex,
      offsetY,
    })
    offsetY += toast.height || 0
    if (!isEnding) visibleIndex += 1
  })
  return metadata
}
function applyLimited(toasts, limit) {
  let activeIndex = 0
  return toasts.map((toast) => {
    if (toast.transitionStatus === "ending") return toast
    const limited = activeIndex >= limit
    activeIndex += 1
    return toast.limited === limited
      ? toast
      : {
          ...toast,
          limited,
        }
  })
}
const selectors$3 = {
  toasts: (state) => state.toasts,
  isEmpty: (state) => state.toasts.length === 0,
  toast: (state, id) => state.toastMetadata.get(id)?.value,
  toastIndex: (state, id) => state.toastMetadata.get(id)?.domIndex ?? -1,
  toastOffsetY: (state, id) => state.toastMetadata.get(id)?.offsetY ?? 0,
  toastVisibleIndex: (state, id) => state.toastMetadata.get(id)?.visibleIndex ?? -1,
  focused: (state) => state.focused,
  expanded: (state) => state.hovering || state.focused,
  expandedOrOutOfFocus: (state) => state.hovering || state.focused || !state.isWindowFocused,
  prevFocusElement: (state) => state.prevFocusElement,
}
const ToastStore = class extends ReactStore {
  timers = /* @__PURE__ */ new Map()
  areTimersPaused = false
  constructor(initialState) {
    super(
      {
        ...initialState,
        toastMetadata: createToastMetadata(initialState.toasts),
      },
      {},
      selectors$3,
    )
  }
  setViewport = (viewport) => {
    this.set("viewport", viewport)
  }
  syncProviderProps(timeout, limit) {
    const limitChanged = this.state.limit !== limit
    if (this.state.timeout === timeout && !limitChanged) return
    const updates = {
      timeout,
      limit,
    }
    if (limitChanged) {
      const newToasts = applyLimited(this.state.toasts, limit)
      updates.toasts = newToasts
      updates.toastMetadata = createToastMetadata(newToasts)
    }
    this.update(updates)
  }
  disposeEffect = () => {
    return () => {
      this.timers.forEach((timer) => {
        timer.timeout?.clear()
      })
      this.timers.clear()
    }
  }
  removeToast(toastId, skipOnRemove = false) {
    const index = selectors$3.toastIndex(this.state, toastId)
    if (index === -1) return
    const toast = this.state.toasts[index]
    if (!skipOnRemove) toast?.onRemove?.()
    const newToasts = [...this.state.toasts]
    newToasts.splice(index, 1)
    this.setToasts(newToasts)
  }
  addToast = (toast) => {
    const { timeout, limit } = this.state
    const id = toast.id || generateId("toast")
    if (toast.id) {
      const existingToast = selectors$3.toast(this.state, toast.id)
      if (existingToast) {
        if (existingToast.transitionStatus === "ending") this.removeToast(toast.id, true)
        else {
          const { id: ignoredId, transitionStatus: ignoredTransitionStatus, ...updates } = toast
          this.updateToastInternal(toast.id, updates, true, true)
          return toast.id
        }
      }
    }
    const toastToAdd = {
      ...toast,
      id,
      updateKey: 0,
      transitionStatus: "starting",
    }
    const updatedToasts = [toastToAdd, ...this.state.toasts]
    this.setToasts(applyLimited(updatedToasts, limit))
    const duration = toastToAdd.timeout ?? timeout
    if (toastToAdd.type !== "loading" && duration > 0)
      this.scheduleTimer(id, duration, () => this.closeToast(id))
    if (selectors$3.expandedOrOutOfFocus(this.state)) this.pauseTimers()
    return id
  }
  updateToast = (id, updates) => {
    this.updateToastInternal(id, updates, false, true)
  }
  updateToastInternal = (id, updates, resetTimer = false, markUpdated = false) => {
    const { timeout, toasts } = this.state
    const prevToast = selectors$3.toast(this.state, id)
    if (!prevToast) return
    if (prevToast.transitionStatus === "ending") return
    const nextToast = {
      ...prevToast,
      ...updates,
      ...(markUpdated && { updateKey: prevToast.updateKey + 1 }),
    }
    this.setToasts(toasts.map((toast) => (toast.id === id ? nextToast : toast)))
    const nextTimeout = nextToast.timeout ?? timeout
    const prevTimeout = prevToast.timeout ?? timeout
    const timeoutUpdated = Object.hasOwn(updates, "timeout")
    const shouldHaveTimer =
      nextToast.transitionStatus !== "ending" && nextToast.type !== "loading" && nextTimeout > 0
    const hasTimer = this.timers.has(id)
    const timeoutChanged = prevTimeout !== nextTimeout
    const wasLoading = prevToast.type === "loading"
    if (!shouldHaveTimer && hasTimer) {
      this.clearTimer(id)
      return
    }
    if (
      shouldHaveTimer &&
      (!hasTimer || timeoutChanged || timeoutUpdated || wasLoading || resetTimer)
    ) {
      this.clearTimer(id)
      this.scheduleTimer(id, nextTimeout, () => this.closeToast(id))
      if (selectors$3.expandedOrOutOfFocus(this.state)) this.pauseTimers()
    }
  }
  closeToast = (toastId) => {
    const closeAll = toastId === void 0
    const { limit, toasts } = this.state
    let toastsToClose
    if (closeAll) {
      toastsToClose = toasts
      this.clearTimers()
    } else {
      const toast = selectors$3.toast(this.state, toastId)
      if (!toast) return
      toastsToClose = [toast]
      this.clearTimer(toastId)
    }
    const newToasts = applyLimited(
      toasts.map((item) =>
        closeAll || item.id === toastId
          ? {
              ...item,
              transitionStatus: "ending",
              height: 0,
            }
          : item,
      ),
      limit,
    )
    this.setToasts(newToasts, !newToasts.some((toast) => toast.transitionStatus !== "ending"))
    toastsToClose.forEach((toast) => {
      if (toast.transitionStatus !== "ending") toast.onClose?.()
    })
    this.handleFocusManagement(toastId)
  }
  promiseToast = (promiseValue, options) => {
    const loadingOptions = resolvePromiseOptions(options.loading)
    const id = this.addToast({
      ...loadingOptions,
      type: "loading",
    })
    const handledPromise = promiseValue
      .then((result) => {
        const successOptions = resolvePromiseOptions(options.success, result)
        this.updateToast(id, {
          ...successOptions,
          type: "success",
          timeout: successOptions.timeout,
        })
        return result
      })
      .catch((error) => {
        const errorOptions = resolvePromiseOptions(options.error, error)
        this.updateToast(id, {
          ...errorOptions,
          type: "error",
          timeout: errorOptions.timeout,
        })
        return Promise.reject(error)
      })
    if ({}.hasOwnProperty.call(options, "setPromise")) options.setPromise(handledPromise)
    return handledPromise
  }
  pauseTimers() {
    if (this.areTimersPaused) return
    this.areTimersPaused = true
    this.timers.forEach((timer) => {
      if (timer.timeout) {
        timer.timeout.clear()
        timer.remaining = Math.max(timer.remaining - (Date.now() - timer.start), 0)
      }
    })
  }
  resumeTimers() {
    if (!this.areTimersPaused) return
    this.areTimersPaused = false
    this.timers.forEach((timer, id) => {
      timer.remaining = timer.remaining > 0 ? timer.remaining : timer.delay
      timer.timeout ??= Timeout.create()
      timer.timeout.start(timer.remaining, () => {
        this.handleTimerFired(id)
        timer.callback()
      })
      timer.start = Date.now()
    })
  }
  restoreFocusToPrevElement() {
    this.state.prevFocusElement?.focus({ preventScroll: true })
  }
  handleDocumentPointerDown = (event) => {
    if (event.pointerType !== "touch") return
    const target = getTarget(event)
    if (contains(this.state.viewport, target)) return
    this.resumeTimers()
    this.update({
      hovering: false,
      focused: false,
    })
  }
  scheduleTimer(id, delay, callback) {
    const start = Date.now()
    const currentTimeout = !selectors$3.expandedOrOutOfFocus(this.state) ? Timeout.create() : void 0
    currentTimeout?.start(delay, () => {
      this.handleTimerFired(id)
      callback()
    })
    this.timers.set(id, {
      timeout: currentTimeout,
      start,
      delay,
      remaining: delay,
      callback,
    })
  }
  clearTimers() {
    this.timers.forEach((timer) => {
      timer.timeout?.clear()
    })
    this.timers.clear()
    this.areTimersPaused = false
  }
  clearTimer(id) {
    this.timers.get(id)?.timeout?.clear()
    this.timers.delete(id)
    this.resetPausedStateIfNoTimersRemain()
  }
  handleTimerFired(id) {
    this.timers.delete(id)
    this.resetPausedStateIfNoTimersRemain()
  }
  resetPausedStateIfNoTimersRemain() {
    if (this.timers.size === 0) this.areTimersPaused = false
  }
  setToasts(newToasts, clearInteraction = newToasts.length === 0) {
    const updates = {
      toasts: newToasts,
      toastMetadata: createToastMetadata(newToasts),
    }
    if (clearInteraction) {
      updates.hovering = false
      updates.focused = false
    }
    this.update(updates)
  }
  handleFocusManagement(toastId) {
    const activeEl = activeElement(ownerDocument(this.state.viewport))
    if (
      !this.state.viewport ||
      !contains(this.state.viewport, activeEl) ||
      !matchesFocusVisible(activeEl)
    )
      return
    if (toastId === void 0) {
      this.restoreFocusToPrevElement()
      return
    }
    const toasts = selectors$3.toasts(this.state)
    const currentIndex = selectors$3.toastIndex(this.state, toastId)
    const scan = (from, step) => {
      for (let index = from; index >= 0 && index < toasts.length; index += step)
        if (toasts[index].transitionStatus !== "ending") return toasts[index]
      return null
    }
    const nextToast = scan(currentIndex + 1, 1) ?? scan(currentIndex - 1, -1)
    if (nextToast) nextToast.ref?.current?.focus()
    else this.restoreFocusToPrevElement()
  }
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/toast/provider/ToastProvider.mjs
/**
 * Provides a context for creating and managing toasts.
 *
 * Documentation: [Base UI Toast](https://base-ui.com/react/components/toast)
 */
const ToastProvider$1 = function ToastProvider(props) {
  const { children, timeout = 5e3, limit = 3, toastManager } = props
  const store = useRefWithInit(
    () =>
      new ToastStore({
        timeout,
        limit,
        viewport: null,
        toasts: [],
        hovering: false,
        focused: false,
        isWindowFocused: true,
        prevFocusElement: null,
      }),
  ).current
  useOnMount(store.disposeEffect)
  import_react.useEffect(
    function subscribeToToastManager() {
      if (!toastManager) return
      return toastManager[" subscribe"](({ action, options }) => {
        const id = options.id
        if (action === "promise" && options.promise) store.promiseToast(options.promise, options)
        else if (action === "update" && id) store.updateToast(id, options)
        else if (action === "close") store.closeToast(id)
        else store.addToast(options)
      })
    },
    [store, toastManager],
  )
  return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(ToastContext.Provider, {
    value: store,
    children: [
      /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ToastProviderPropsSynchronizer, {
        store,
        timeout,
        limit,
      }),
      children,
    ],
  })
}
function ToastProviderPropsSynchronizer(props) {
  const { store, timeout, limit } = props
  useIsoLayoutEffect(() => {
    store.syncProviderProps(timeout, limit)
  }, [store, timeout, limit])
  return null
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.2_@types_46200efdf1f5c806fc19b01530afd9e7/node_modules/@base-ui/utils/visuallyHidden.mjs
const visuallyHiddenBase = {
  clipPath: "inset(50%)",
  overflow: "hidden",
  whiteSpace: "nowrap",
  border: 0,
  padding: 0,
  width: 1,
  height: 1,
  margin: -1,
}
const visuallyHidden = {
  ...visuallyHiddenBase,
  position: "fixed",
  top: 0,
  left: 0,
}
const visuallyHiddenInput = {
  ...visuallyHiddenBase,
  position: "absolute",
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/utils/FocusGuard.mjs
/**
 * @internal
 */
const FocusGuard = /*#__PURE__*/ import_react.forwardRef(function FocusGuard(props, ref) {
  const [role, setRole] = import_react.useState()
  useIsoLayoutEffect(() => {
    if (voiceOver && webkit) setRole("button")
  }, [])
  const restProps = {
    tabIndex: 0,
    role,
  }
  return /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
    ...props,
    ref,
    "style": visuallyHidden,
    "aria-hidden": role ? void 0 : true,
    ...restProps,
    "data-base-ui-focus-guard": "",
  })
})
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.2_@types_46200efdf1f5c806fc19b01530afd9e7/node_modules/@base-ui/utils/useMergedRefs.mjs
/**
 * Merges refs into a single memoized callback ref or `null`.
 * This makes sure multiple refs are updated together and have the same value.
 *
 * This function accepts up to four refs. If you need to merge more, or have an unspecified number of refs to merge,
 * use `useMergedRefsN` instead.
 */
function useMergedRefs(a, b, c, d) {
  const forkRef = useRefWithInit(createForkRef).current
  if (didChange(forkRef, a, b, c, d)) update(forkRef, [a, b, c, d])
  return forkRef.callback
}
/**
 * Merges an array of refs into a single memoized callback ref or `null`.
 *
 * If you need to merge a fixed number (up to four) of refs, use `useMergedRefs` instead for better performance.
 */
function useMergedRefsN(refs) {
  const forkRef = useRefWithInit(createForkRef).current
  if (didChangeN(forkRef, refs)) update(forkRef, refs)
  return forkRef.callback
}
function createForkRef() {
  return {
    callback: null,
    cleanup: null,
    refs: [],
  }
}
function didChange(forkRef, a, b, c, d) {
  return (
    forkRef.refs[0] !== a || forkRef.refs[1] !== b || forkRef.refs[2] !== c || forkRef.refs[3] !== d
  )
}
function didChangeN(forkRef, newRefs) {
  return (
    forkRef.refs.length !== newRefs.length ||
    forkRef.refs.some((ref, index) => ref !== newRefs[index])
  )
}
function update(forkRef, refs) {
  forkRef.refs = refs
  if (refs.every((ref) => ref == null)) {
    forkRef.callback = null
    return
  }
  forkRef.callback = (instance) => {
    if (forkRef.cleanup) {
      forkRef.cleanup()
      forkRef.cleanup = null
    }
    if (instance != null) {
      const cleanupCallbacks = Array(refs.length).fill(null)
      for (let i = 0; i < refs.length; i += 1) {
        const ref = refs[i]
        if (ref == null) continue
        switch (typeof ref) {
          case "function": {
            const refCleanup = ref(instance)
            if (typeof refCleanup === "function") cleanupCallbacks[i] = refCleanup
            break
          }
          case "object":
            ref.current = instance
        }
      }
      forkRef.cleanup = () => {
        for (let i = 0; i < refs.length; i += 1) {
          const ref = refs[i]
          if (ref == null) continue
          switch (typeof ref) {
            case "function": {
              const cleanupCallback = cleanupCallbacks[i]
              if (typeof cleanupCallback === "function") cleanupCallback()
              else ref(null)
              break
            }
            case "object":
              ref.current = null
          }
        }
      }
    }
  }
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.2_@types_46200efdf1f5c806fc19b01530afd9e7/node_modules/@base-ui/utils/getReactElementRef.mjs
/**
 * Extracts the `ref` from a React element, handling different React versions.
 */
function getReactElementRef(element) {
  if (!(/*#__PURE__*/ import_react.isValidElement(element))) return null
  const reactElement = element
  const propsWithRef = reactElement.props
  return (isReactVersionAtLeast(19) ? propsWithRef?.ref : reactElement.ref) ?? null
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.2_@types_46200efdf1f5c806fc19b01530afd9e7/node_modules/@base-ui/utils/mergeObjects.mjs
function mergeObjects$1(a, b) {
  if (a && !b) return a
  if (!a && b) return b
  if (a || b)
    return {
      ...a,
      ...b,
    }
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/internals/getStateAttributesProps.mjs
function getStateAttributesProps(state, customMapping) {
  const props = {}
  for (const key in state) {
    const value = state[key]
    if (customMapping?.hasOwnProperty(key)) {
      const customProps = customMapping[key](value)
      if (customProps != null) Object.assign(props, customProps)
      continue
    }
    if (value === true) props[`data-${key.toLowerCase()}`] = ""
    else if (value) props[`data-${key.toLowerCase()}`] = value.toString()
  }
  return props
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/utils/resolveClassName.mjs
/**
 * If the provided className is a string, it will be returned as is.
 * Otherwise, the function will call the className function with the state as the first argument.
 *
 * @param className
 * @param state
 */
function resolveClassName(className, state) {
  return typeof className === "function" ? className(state) : className
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/utils/resolveStyle.mjs
/**
 * If the provided style is an object, it will be returned as is.
 * Otherwise, the function will call the style function with the state as the first argument.
 *
 * @param style
 * @param state
 */
function resolveStyle(style, state) {
  return typeof style === "function" ? style(state) : style
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/merge-props/mergeProps.mjs
const EMPTY_PROPS = {}
/**
 * Merges multiple sets of React props. It follows the Object.assign pattern where the rightmost object's fields overwrite
 * the conflicting ones from others. This doesn't apply to event handlers, `className` and `style` props.
 *
 * Event handlers are merged and called in right-to-left order (rightmost handler executes first, leftmost last).
 * For React synthetic events, the rightmost handler can prevent prior (left-positioned) handlers from executing
 * by calling `event.preventBaseUIHandler()`. For non-synthetic events (custom events with primitive/object values),
 * all handlers always execute without prevention capability.
 *
 * The `className` prop is merged by concatenating classes in right-to-left order (rightmost class appears first in the string).
 * The `style` prop is merged with rightmost styles overwriting the prior ones.
 *
 * Props can either be provided as objects or as functions that take the previous props as an argument.
 * The function will receive the merged props up to that point (going from left to right):
 * so in the case of `(obj1, obj2, fn, obj3)`, `fn` will receive the merged props of `obj1` and `obj2`.
 * The function is responsible for chaining event handlers if needed (that is, we don't run the merge logic).
 *
 * Event handlers returned by the functions are not automatically prevented when `preventBaseUIHandler` is called.
 * They must check `event.baseUIHandlerPrevented` themselves and bail out if it's true.
 *
 * @important **`ref` is not merged.**
 * @param a Props object to merge.
 * @param b Props object to merge. The function will overwrite conflicting props from `a`.
 * @param c Props object to merge. The function will overwrite conflicting props from previous parameters.
 * @param d Props object to merge. The function will overwrite conflicting props from previous parameters.
 * @param e Props object to merge. The function will overwrite conflicting props from previous parameters.
 * @returns The merged props.
 * @public
 */
function mergeProps(a, b, c, d, e) {
  if (!c && !d && !e && !a) return createInitialMergedProps(b)
  let merged = createInitialMergedProps(a)
  if (b) merged = mergeInto(merged, b)
  if (c) merged = mergeInto(merged, c)
  if (d) merged = mergeInto(merged, d)
  if (e) merged = mergeInto(merged, e)
  return merged
}
/**
 * Merges an arbitrary number of React props using the same logic as {@link mergeProps}.
 * This function accepts an array of props instead of individual arguments.
 *
 * This has slightly lower performance than {@link mergeProps} due to accepting an array
 * instead of a fixed number of arguments. Prefer {@link mergeProps} when merging 5 or
 * fewer prop sets for better performance.
 *
 * @param props Array of props to merge.
 * @returns The merged props.
 * @see mergeProps
 * @public
 */
function mergePropsN(props) {
  if (props.length === 0) return EMPTY_PROPS
  if (props.length === 1) return createInitialMergedProps(props[0])
  let merged = createInitialMergedProps(props[0])
  for (let i = 1; i < props.length; i += 1) merged = mergeInto(merged, props[i])
  return merged
}
function createInitialMergedProps(inputProps) {
  if (isPropsGetter(inputProps)) return { ...resolvePropsGetter(inputProps, EMPTY_PROPS) }
  return copyInitialProps(inputProps)
}
function mergeInto(merged, inputProps) {
  if (isPropsGetter(inputProps)) return resolvePropsGetter(inputProps, merged)
  return mutablyMergeInto(merged, inputProps)
}
function copyInitialProps(inputProps) {
  const copiedProps = { ...inputProps }
  for (const propName in copiedProps) {
    const propValue = copiedProps[propName]
    if (isEventHandler(propName, propValue)) copiedProps[propName] = wrapEventHandler(propValue)
  }
  return copiedProps
}
/**
 * Merges two sets of props. In case of conflicts, the external props take precedence.
 */
function mutablyMergeInto(mergedProps, externalProps) {
  if (!externalProps) return mergedProps
  for (const propName in externalProps) {
    const externalPropValue = externalProps[propName]
    switch (propName) {
      case "style":
        mergedProps[propName] = mergeObjects$1(mergedProps.style, externalPropValue)
        break
      case "className":
        mergedProps[propName] = mergeClassNames(mergedProps.className, externalPropValue)
        break
      default:
        if (isEventHandler(propName, externalPropValue))
          mergedProps[propName] = mergeEventHandlers(mergedProps[propName], externalPropValue)
        else mergedProps[propName] = externalPropValue
    }
  }
  return mergedProps
}
function isEventHandler(key, value) {
  const code0 = key.charCodeAt(0)
  const code1 = key.charCodeAt(1)
  const code2 = key.charCodeAt(2)
  return (
    code0 === 111 &&
    code1 === 110 &&
    code2 >= 65 &&
    code2 <= 90 &&
    (typeof value === "function" || value === undefined)
  )
}
function isPropsGetter(inputProps) {
  return typeof inputProps === "function"
}
function resolvePropsGetter(inputProps, previousProps) {
  if (isPropsGetter(inputProps)) return inputProps(previousProps)
  return inputProps ?? EMPTY_PROPS
}
function mergeEventHandlers(ourHandler, theirHandler) {
  if (!theirHandler) return ourHandler
  if (!ourHandler) return wrapEventHandler(theirHandler)
  return (...args) => {
    const event = args[0]
    if (isSyntheticEvent(event)) {
      const baseUIEvent = event
      makeEventPreventable(baseUIEvent)
      const result = theirHandler(...args)
      if (!baseUIEvent.baseUIHandlerPrevented) ourHandler?.(...args)
      return result
    }
    const result = theirHandler(...args)
    ourHandler?.(...args)
    return result
  }
}
function wrapEventHandler(handler) {
  if (!handler) return handler
  return (...args) => {
    const event = args[0]
    if (isSyntheticEvent(event)) makeEventPreventable(event)
    return handler(...args)
  }
}
function makeEventPreventable(event) {
  event.preventBaseUIHandler = () => {
    event.baseUIHandlerPrevented = true
  }
  return event
}
function mergeClassNames(ourClassName, theirClassName) {
  if (theirClassName) {
    if (ourClassName) return `${theirClassName} ${ourClassName}`
    return theirClassName
  }
  return ourClassName
}
function isSyntheticEvent(event) {
  return event != null && typeof event === "object" && "nativeEvent" in event
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/internals/useRenderElement.mjs
/**
 * Renders a Base UI element.
 *
 * @param element The default HTML element to render. Can be overridden by the `render` prop.
 * @param componentProps An object containing the `render` and `className` props to be used for element customization. Other props are ignored.
 * @param params Additional parameters for rendering the element.
 */
function useRenderElement(element, componentProps, params = {}) {
  const renderProp = componentProps.render
  const outProps = useRenderElementProps(componentProps, params)
  if (params.enabled === false) return null
  return evaluateRenderProp(element, renderProp, outProps, params.state ?? EMPTY_OBJECT)
}
/**
 * Computes render element final props.
 */
function useRenderElementProps(componentProps, params = {}) {
  const { className: classNameProp, style: styleProp, render: renderProp } = componentProps
  const { state = EMPTY_OBJECT, ref, props, stateAttributesMapping, enabled = true } = params
  const className = enabled ? resolveClassName(classNameProp, state) : void 0
  const style = enabled ? resolveStyle(styleProp, state) : void 0
  const stateProps = enabled ? getStateAttributesProps(state, stateAttributesMapping) : EMPTY_OBJECT
  const resolvedProps = enabled && props ? resolveRenderFunctionProps(props) : void 0
  const outProps = enabled ? (mergeObjects$1(stateProps, resolvedProps) ?? {}) : EMPTY_OBJECT
  if (typeof document !== "undefined") {
    if (!enabled) useMergedRefs(null, null)
    else if (Array.isArray(ref))
      outProps.ref = useMergedRefsN([outProps.ref, getReactElementRef(renderProp), ...ref])
    else outProps.ref = useMergedRefs(outProps.ref, getReactElementRef(renderProp), ref)
  }
  if (!enabled) return EMPTY_OBJECT
  if (className !== void 0) outProps.className = mergeClassNames(outProps.className, className)
  if (style !== void 0) outProps.style = mergeObjects$1(outProps.style, style)
  return outProps
}
function resolveRenderFunctionProps(props) {
  if (Array.isArray(props)) return mergePropsN(props)
  return mergeProps(void 0, props)
}
const REACT_LAZY_TYPE = Symbol.for("react.lazy")
function evaluateRenderProp(element, render, props, state) {
  if (render) {
    if (typeof render === "function") return render(props, state)
    const mergedProps = mergeProps(props, render.props)
    mergedProps.ref = props.ref
    let newElement = render
    if (newElement?.$$typeof === REACT_LAZY_TYPE)
      newElement = import_react.Children.toArray(render)[0]
    return /*#__PURE__*/ import_react.cloneElement(newElement, mergedProps)
  }
  if (element) {
    if (typeof element === "string") return renderTag(element, props)
  }
  throw new Error(formatErrorMessage(8))
}
function renderTag(Tag, props) {
  if (Tag === "button")
    return /*#__PURE__*/ (0, import_react.createElement)("button", {
      type: "button",
      ...props,
      key: props.key,
    })
  if (Tag === "img")
    return /*#__PURE__*/ (0, import_react.createElement)("img", {
      alt: "",
      ...props,
      key: props.key,
    })
  return /*#__PURE__*/ import_react.createElement(Tag, props)
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/toast/viewport/ToastViewport.mjs
/**
 * A container viewport for toasts.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Toast](https://base-ui.com/react/components/toast)
 */
const ToastViewport$1 = /*#__PURE__*/ import_react.forwardRef(
  function ToastViewport(componentProps, forwardedRef) {
    const { render, className, style, children, ...elementProps } = componentProps
    const store = useToastProviderContext()
    const windowFocusTimeout = useTimeout()
    const handlingFocusGuardRef = import_react.useRef(false)
    const markedReadyForMouseLeaveRef = import_react.useRef(false)
    const touchActiveRef = import_react.useRef(false)
    const isEmpty = store.useState("isEmpty")
    const toasts = store.useState("toasts")
    const focused = store.useState("focused")
    const expanded = store.useState("expanded")
    const prevFocusElement = store.useState("prevFocusElement")
    const frontmostHeight = toasts[0]?.height
    const hasTransitioningToasts = toasts.some((toast) => toast.transitionStatus === "ending")
    const highPriorityToasts = toasts.filter((toast) => toast.priority === "high")
    import_react.useEffect(() => {
      const viewport = store.state.viewport
      if (!viewport || isEmpty) return
      const win = getWindow(viewport)
      const doc = ownerDocument(viewport)
      function handleGlobalKeyDown(event) {
        if (event.key === "F6" && getTarget(event) !== viewport) {
          event.preventDefault()
          store.set("prevFocusElement", activeElement(doc))
          viewport?.focus({ preventScroll: true })
          store.pauseTimers()
          store.set("focused", true)
        }
      }
      function handleWindowBlur(event) {
        if (getTarget(event) !== win) return
        store.set("isWindowFocused", false)
        store.pauseTimers()
      }
      function handleWindowFocus(event) {
        if (event.relatedTarget) return
        const target = getTarget(event)
        const activeEl = activeElement(ownerDocument(viewport))
        if (target === win || !contains(viewport, target) || !matchesFocusVisible(activeEl))
          store.resumeTimers()
        windowFocusTimeout.start(0, () => store.set("isWindowFocused", true))
      }
      return mergeCleanups(
        addEventListener(win, "keydown", handleGlobalKeyDown),
        addEventListener(win, "blur", handleWindowBlur, true),
        addEventListener(win, "focus", handleWindowFocus, true),
        addEventListener(doc, "pointerdown", store.handleDocumentPointerDown, true),
      )
    }, [store, windowFocusTimeout, isEmpty])
    function handleFocusGuard(event) {
      handlingFocusGuardRef.current = true
      const firstFocusableToast =
        event.relatedTarget === store.state.viewport
          ? toasts.find((toast) => toast.transitionStatus !== "ending" && !toast.limited)
          : void 0
      if (firstFocusableToast) firstFocusableToast.ref?.current?.focus()
      else store.restoreFocusToPrevElement()
    }
    function handleKeyDown(event) {
      if (
        event.key === "Tab" &&
        event.shiftKey &&
        getTarget(event.nativeEvent) === store.state.viewport
      ) {
        event.preventDefault()
        store.restoreFocusToPrevElement()
      }
    }
    function flushMouseLeave() {
      if (
        store.state.toasts.some((toast) => toast.transitionStatus === "ending") ||
        touchActiveRef.current ||
        !markedReadyForMouseLeaveRef.current
      )
        return
      if (store.state.isWindowFocused) store.resumeTimers()
      store.set("hovering", false)
      markedReadyForMouseLeaveRef.current = false
    }
    import_react.useEffect(flushMouseLeave, [hasTransitioningToasts, store])
    function handleMouseEnter() {
      store.pauseTimers()
      store.set("hovering", true)
      markedReadyForMouseLeaveRef.current = false
    }
    function resumeTimersIfWindowFocused() {
      if (store.state.isWindowFocused) store.resumeTimers()
    }
    function handleMouseLeave() {
      markedReadyForMouseLeaveRef.current = true
      flushMouseLeave()
    }
    function handlePointerDown(event) {
      if (event.pointerType === "touch") touchActiveRef.current = true
    }
    function handlePointerEnd(event) {
      if (event.pointerType !== "touch") return
      touchActiveRef.current = false
      flushMouseLeave()
    }
    function handleFocus() {
      if (handlingFocusGuardRef.current) {
        handlingFocusGuardRef.current = false
        return
      }
      if (focused) return
      if (matchesFocusVisible(activeElement(ownerDocument(store.state.viewport)))) {
        store.set("focused", true)
        store.pauseTimers()
      }
    }
    function handleBlur(event) {
      if (!focused || contains(store.state.viewport, event.relatedTarget)) return
      store.set("focused", false)
      resumeTimersIfWindowFocused()
    }
    const defaultProps = {
      "tabIndex": -1,
      "role": "region",
      "aria-live": "polite",
      "aria-atomic": false,
      "aria-relevant": "additions text",
      "aria-label": "Notifications",
      "onMouseEnter": handleMouseEnter,
      "onMouseMove": handleMouseEnter,
      "onMouseLeave": handleMouseLeave,
      "onFocus": handleFocus,
      "onBlur": handleBlur,
      "onKeyDown": handleKeyDown,
      "onClick": handleFocus,
      "onPointerDown": handlePointerDown,
      "onPointerUp": handlePointerEnd,
      "onPointerCancel": handlePointerEnd,
      "style": { ["--toast-frontmost-height"]: frontmostHeight ? `${frontmostHeight}px` : void 0 },
    }
    const state = { expanded }
    const focusGuard =
      !isEmpty &&
      prevFocusElement &&
      /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FocusGuard, { onFocus: handleFocusGuard })
    const element = useRenderElement("div", componentProps, {
      ref: [forwardedRef, store.setViewport],
      state,
      props: [
        defaultProps,
        elementProps,
        {
          children: /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_react.Fragment, {
            children: [focusGuard, children, focusGuard],
          }),
        },
      ],
    })
    return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_react.Fragment, {
      children: [
        focusGuard,
        element,
        !focused &&
          highPriorityToasts.length > 0 &&
          /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
            style: visuallyHidden,
            children: highPriorityToasts.map((toast) =>
              /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(
                "div",
                {
                  "role": "alert",
                  "aria-atomic": true,
                  "children": [
                    /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", { children: toast.title }),
                    /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
                      children: toast.description,
                    }),
                  ],
                },
                toast.id,
              ),
            ),
          }),
      ],
    })
  },
)
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.2_@types_46200efdf1f5c806fc19b01530afd9e7/node_modules/@base-ui/utils/inertValue.mjs
function inertValue(value) {
  if (isReactVersionAtLeast(19)) return value
  return value ? "true" : void 0
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/toast/root/ToastRootContext.mjs
const ToastRootContext = /*#__PURE__*/ import_react.createContext(void 0)
function useToastRootContext() {
  const context = import_react.useContext(ToastRootContext)
  if (!context) throw new Error(formatErrorMessage(66))
  return context
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/internals/stateAttributesMapping.mjs
const TransitionStatusDataAttributes = /*#__PURE__*/ (function (TransitionStatusDataAttributes) {
  /**
   * Present when the component begins animating in.
   */
  TransitionStatusDataAttributes["startingStyle"] = "data-starting-style"
  /**
   * Present when the component is animating out.
   */
  TransitionStatusDataAttributes["endingStyle"] = "data-ending-style"
  return TransitionStatusDataAttributes
})({})
const STARTING_HOOK = { "data-starting-style": "" }
const ENDING_HOOK = { "data-ending-style": "" }
const transitionStatusMapping = {
  transitionStatus(value) {
    if (value === "starting") return STARTING_HOOK
    if (value === "ending") return ENDING_HOOK
    return null
  },
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/utils/resolveRef.mjs
/**
 * If the provided argument is a ref object, returns its `current` value.
 * Otherwise, returns the argument itself.
 */
function resolveRef(maybeRef) {
  if (maybeRef == null) return maybeRef
  return "current" in maybeRef ? maybeRef.current : maybeRef
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/internals/useAnimationsFinished.mjs
/**
 * Executes a function once all animations have finished on the provided element.
 * If an animation is canceled, waits for any replacement animations before executing.
 * @param elementOrRef - The element to watch for animations.
 * @param waitForStartingStyleRemoved - Whether to wait for [data-starting-style] to be removed before checking for animations.
 * @returns A function that takes a callback to execute once all animations have finished, and an optional AbortSignal to abort the callback
 */
function useAnimationsFinished(elementOrRef, waitForStartingStyleRemoved = false) {
  const frame = useAnimationFrame()
  return useStableCallback((fnToExecute, signal = null) => {
    frame.cancel()
    const element = resolveRef(elementOrRef)
    if (element == null) return
    const resolvedElement = element
    const done = () => {
      import_react_dom.flushSync(fnToExecute)
    }
    if (
      typeof resolvedElement.getAnimations !== "function" ||
      globalThis.BASE_UI_ANIMATIONS_DISABLED
    ) {
      fnToExecute()
      return
    }
    function exec() {
      Promise.all(resolvedElement.getAnimations().map((animation) => animation.finished)).then(
        () => {
          if (!signal?.aborted) done()
        },
        () => {
          if (signal?.aborted) return
          if (
            resolvedElement
              .getAnimations()
              .some((animation) => animation.pending || animation.playState !== "finished")
          ) {
            exec()
            return
          }
          done()
        },
      )
    }
    if (waitForStartingStyleRemoved) {
      const startingStyleAttribute = "data-starting-style"
      if (!resolvedElement.hasAttribute(startingStyleAttribute)) {
        frame.request(exec)
        return
      }
      const attributeObserver = new MutationObserver(() => {
        if (!resolvedElement.hasAttribute(startingStyleAttribute)) {
          attributeObserver.disconnect()
          exec()
        }
      })
      attributeObserver.observe(resolvedElement, {
        attributes: true,
        attributeFilter: [startingStyleAttribute],
      })
      signal?.addEventListener("abort", () => attributeObserver.disconnect(), { once: true })
      return
    }
    frame.request(exec)
  })
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/internals/useOpenChangeComplete.mjs
/**
 * Calls the provided function when the CSS open/close animation or transition completes.
 */
function useOpenChangeComplete(parameters) {
  const { enabled = true, open, ref, onComplete: onCompleteParam } = parameters
  const onComplete = useStableCallback(onCompleteParam)
  const runOnceAnimationsFinish = useAnimationsFinished(ref, open)
  import_react.useEffect(() => {
    if (!enabled) return
    const abortController = new AbortController()
    runOnceAnimationsFinish(onComplete, abortController.signal)
    return () => {
      abortController.abort()
    }
  }, [enabled, open, onComplete, runOnceAnimationsFinish])
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/internals/constants.mjs
const DISABLED_TRANSITIONS_STYLE = { style: { transition: "none" } }
const CLICK_TRIGGER_IDENTIFIER = "data-base-ui-click-trigger"
const BASE_UI_SWIPE_IGNORE_ATTRIBUTE = "data-base-ui-swipe-ignore"
const LEGACY_SWIPE_IGNORE_ATTRIBUTE = "data-swipe-ignore"
const BASE_UI_SWIPE_IGNORE_SELECTOR = `[${BASE_UI_SWIPE_IGNORE_ATTRIBUTE}]`
const LEGACY_SWIPE_IGNORE_SELECTOR = `[${LEGACY_SWIPE_IGNORE_ATTRIBUTE}]`
/**
 * Used for dropdowns that usually strictly prefer top/bottom placements and
 * use `var(--available-height)` to limit their height.
 */
const DROPDOWN_COLLISION_AVOIDANCE = { fallbackAxisSide: "none" }
/**
 * Used by regular popups that usually aren't scrollable and are allowed to
 * freely flip to any axis of placement.
 */
const POPUP_COLLISION_AVOIDANCE = { fallbackAxisSide: "end" }
/**
 * Special visually hidden styles for the aria-owns owner element to ensure owned element
 * accessibility in iOS/Safari/VoiceControl.
 * The owner element is an empty span, so most of the common visually hidden styles are not needed.
 * @see https://github.com/floating-ui/floating-ui/issues/3403
 */
const ownerVisuallyHidden = {
  clipPath: "inset(50%)",
  position: "fixed",
  top: 0,
  left: 0,
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/utils/scrollable.mjs
function isScrollableY(element, allowOverflowIntent = false) {
  const { overflowY } = getComputedStyle$1(element)
  if (overflowY !== "auto" && overflowY !== "scroll") return false
  return allowOverflowIntent
    ? element.clientHeight > 0
    : element.scrollHeight > element.clientHeight
}
function isScrollableX(element, allowOverflowIntent = false) {
  const { overflowX } = getComputedStyle$1(element)
  if (overflowX !== "auto" && overflowX !== "scroll") return false
  return allowOverflowIntent ? element.clientWidth > 0 : element.scrollWidth > element.clientWidth
}
function isScrollable(element, axis, allowOverflowIntent = false) {
  return axis === "vertical"
    ? isScrollableY(element, allowOverflowIntent)
    : isScrollableX(element, allowOverflowIntent)
}
function hasScrollableAncestor(target, root, axes) {
  let node = target
  while (isHTMLElement(node) && node !== root && !isLastTraversableNode(node)) {
    for (const axis of axes) if (isScrollable(node, axis)) return true
    node = getParentNode(node)
  }
  return false
}
function findScrollableTouchTarget(target, root, axis = "vertical", allowOverflowIntent = false) {
  let node = isHTMLElement(target) ? target : null
  while (isHTMLElement(node) && node !== root && !isLastTraversableNode(node)) {
    if (isScrollable(node, axis, allowOverflowIntent)) return node
    node = getParentNode(node)
  }
  return isScrollable(root, axis, allowOverflowIntent) ? root : null
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/internals/clamp.mjs
function clamp(val, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) {
  return Math.max(min, Math.min(val, max))
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/utils/getElementAtPoint.mjs
function getElementAtPoint(root, x, y) {
  return typeof root?.elementFromPoint === "function" ? root.elementFromPoint(x, y) : null
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/utils/useSwipeDismiss.mjs
const DEFAULT_SWIPE_THRESHOLD = 40
const REVERSE_CANCEL_THRESHOLD$1 = 10
const MIN_DRAG_THRESHOLD$1 = 1
const MIN_VELOCITY_DURATION_MS = 50
const MIN_RELEASE_VELOCITY_DURATION_MS = 16
const MAX_RELEASE_VELOCITY_AGE_MS = 80
const DEFAULT_IGNORE_SELECTOR = 'button,a,input,select,textarea,label,[role="button"]'
function getDisplacement(direction, deltaX, deltaY) {
  switch (direction) {
    case "up":
      return -deltaY
    case "down":
      return deltaY
    case "left":
      return -deltaX
    case "right":
      return deltaX
    default:
      return 0
  }
}
function getElementTransform(element) {
  const transform = getWindow(element).getComputedStyle(element).transform
  let translateX = 0
  let translateY = 0
  let scale = 1
  if (transform && transform !== "none") {
    const matrix = transform.match(/matrix(?:3d)?\(([^)]+)\)/)
    if (matrix) {
      const values = matrix[1].split(", ").map(parseFloat)
      if (values.length === 6) {
        translateX = values[4]
        translateY = values[5]
        scale = Math.sqrt(values[0] * values[0] + values[1] * values[1])
      } else if (values.length === 16) {
        translateX = values[12]
        translateY = values[13]
        scale = values[0]
      }
    }
  }
  return {
    x: translateX,
    y: translateY,
    scale,
  }
}
function getValidTimeStamp(timeStamp) {
  return Number.isFinite(timeStamp) && timeStamp > 0 ? timeStamp : null
}
function getDragTransform(dragOffset, scale) {
  return `translate3d(${dragOffset.x}px,${dragOffset.y}px,0) scale(${scale})`
}
function hasPrimaryMouseButton(buttons) {
  return buttons % 2 === 1
}
function safelyChangePointerCapture(element, pointerId, method) {
  const pointerCaptureMethod = element[method]
  if (typeof pointerCaptureMethod !== "function") return
  try {
    pointerCaptureMethod.call(element, pointerId)
  } catch (error) {
    if (error && typeof error === "object" && "name" in error && error.name === "NotFoundError")
      return
    throw error
  }
}
function useSwipeDismiss(options) {
  const {
    enabled,
    directions,
    elementRef,
    movementCssVars,
    canStart,
    ignoreSelectorWhenTouch = true,
    ignoreScrollableAncestors = false,
    swipeThreshold: swipeThresholdProp,
    onDismiss,
    onProgress,
    onCancel,
    onSwipeStart,
    onRelease,
    onSwipingChange,
    trackDrag = true,
  } = options
  const ignoreSelector = DEFAULT_IGNORE_SELECTOR
  const primaryDirection = directions.length === 1 ? directions[0] : void 0
  const swipeThresholdDefault = Math.max(
    0,
    typeof swipeThresholdProp === "number" ? swipeThresholdProp : DEFAULT_SWIPE_THRESHOLD,
  )
  const allowLeft = directions.includes("left")
  const allowRight = directions.includes("right")
  const allowUp = directions.includes("up")
  const allowDown = directions.includes("down")
  const hasHorizontal = allowLeft || allowRight
  const hasVertical = allowUp || allowDown
  const scrollAxes = import_react.useMemo(() => {
    const axes = []
    if (hasVertical) axes.push("vertical")
    if (hasHorizontal) axes.push("horizontal")
    return axes
  }, [hasHorizontal, hasVertical])
  const [currentSwipeDirection, setCurrentSwipeDirection] = import_react.useState(void 0)
  const [isSwiping, setIsSwiping] = import_react.useState(false)
  const [dragDismissed, setDragDismissed] = import_react.useState(false)
  const dragStartPosRef = import_react.useRef({
    x: 0,
    y: 0,
  })
  const dragOffsetRef = import_react.useRef({
    x: 0,
    y: 0,
  })
  const lastMovePosRef = import_react.useRef(null)
  const initialTransformRef = import_react.useRef({
    x: 0,
    y: 0,
    scale: 1,
  })
  const intendedSwipeDirectionRef = import_react.useRef(void 0)
  const maxSwipeDisplacementRef = import_react.useRef(0)
  const cancelledSwipeRef = import_react.useRef(false)
  const swipeCancelBaselineRef = import_react.useRef({
    x: 0,
    y: 0,
  })
  const lockedDirectionRef = import_react.useRef(null)
  const isFirstPointerMoveRef = import_react.useRef(false)
  const pendingSwipeRef = import_react.useRef(false)
  const pendingSwipeStartPosRef = import_react.useRef(null)
  const swipeFromScrollableRef = import_react.useRef(false)
  const sawPrimaryButtonsOnMoveRef = import_react.useRef(false)
  const elementSizeRef = import_react.useRef({
    width: 0,
    height: 0,
  })
  const swipeProgressRef = import_react.useRef(0)
  const swipeThresholdRef = import_react.useRef(swipeThresholdDefault)
  const swipeThresholdFunctionRef = import_react.useRef(null)
  const swipeStartTimeRef = import_react.useRef(null)
  const lastDragSampleRef = import_react.useRef(null)
  const lastDragVelocityRef = import_react.useRef({
    x: 0,
    y: 0,
  })
  const lastProgressDetailsRef = import_react.useRef(null)
  const isSwipingRef = import_react.useRef(false)
  const dragStyleSnapshotRef = import_react.useRef(null)
  const setSwiping = useStableCallback((nextSwiping) => {
    if (isSwipingRef.current === nextSwiping) return
    isSwipingRef.current = nextSwiping
    setIsSwiping(nextSwiping)
    onSwipingChange?.(nextSwiping)
  })
  function resolveSwipeThreshold(direction) {
    if (!direction) return
    const element = elementRef.current
    const thresholdFunction = swipeThresholdFunctionRef.current
    if (!element || !thresholdFunction) return
    const value = thresholdFunction({
      element,
      direction,
    })
    swipeThresholdRef.current = Math.max(0, value)
  }
  const updateSwipeProgress = useStableCallback((progress, details) => {
    const nextProgress = Number.isFinite(progress) ? clamp(progress, 0, 1) : 0
    const progressChanged = nextProgress !== swipeProgressRef.current
    let detailsChanged = false
    if (details) {
      const lastDetails = lastProgressDetailsRef.current
      detailsChanged =
        !lastDetails ||
        lastDetails.deltaX !== details.deltaX ||
        lastDetails.deltaY !== details.deltaY ||
        lastDetails.direction !== details.direction
    }
    if (!progressChanged && !detailsChanged) return
    swipeProgressRef.current = nextProgress
    if (details) lastProgressDetailsRef.current = details
    else if (progressChanged) lastProgressDetailsRef.current = null
    onProgress?.(nextProgress, details)
  })
  const syncDragStyles = useStableCallback((swiping) => {
    const element = elementRef.current
    if (!trackDrag || !element) {
      if (!swiping) dragStyleSnapshotRef.current = null
      return
    }
    const style = element.style
    const dragStyleSnapshot = dragStyleSnapshotRef.current
    if (swiping) {
      if (!dragStyleSnapshot) dragStyleSnapshotRef.current = [style.transition, style.transform]
      style.transition = "none"
    } else if (dragStyleSnapshot) {
      ;[style.transition, style.transform] = dragStyleSnapshot
      dragStyleSnapshotRef.current = null
    }
    const dragOffset = dragOffsetRef.current
    const initialTransform = initialTransformRef.current
    const deltaX = dragOffset.x - initialTransform.x
    const deltaY = dragOffset.y - initialTransform.y
    if (swiping) style.transform = getDragTransform(dragOffset, initialTransform.scale)
    style.setProperty(movementCssVars.x, `${deltaX}px`)
    style.setProperty(movementCssVars.y, `${deltaY}px`)
  })
  function recordDragSample(offset, timeStamp) {
    if (timeStamp === null) return
    const lastSample = lastDragSampleRef.current
    if (lastSample && timeStamp > lastSample.time) {
      const durationMs = Math.max(timeStamp - lastSample.time, MIN_RELEASE_VELOCITY_DURATION_MS)
      lastDragVelocityRef.current = {
        x: (offset.x - lastSample.x) / durationMs,
        y: (offset.y - lastSample.y) / durationMs,
      }
    }
    lastDragSampleRef.current = {
      x: offset.x,
      y: offset.y,
      time: timeStamp,
    }
  }
  const reset = import_react.useCallback(() => {
    setCurrentSwipeDirection(void 0)
    setSwiping(false)
    setDragDismissed(false)
    updateSwipeProgress(0)
    swipeThresholdRef.current = swipeThresholdDefault
    swipeThresholdFunctionRef.current = null
    dragStartPosRef.current = {
      x: 0,
      y: 0,
    }
    dragOffsetRef.current = {
      x: 0,
      y: 0,
    }
    initialTransformRef.current = {
      x: 0,
      y: 0,
      scale: 1,
    }
    intendedSwipeDirectionRef.current = void 0
    maxSwipeDisplacementRef.current = 0
    cancelledSwipeRef.current = false
    swipeCancelBaselineRef.current = {
      x: 0,
      y: 0,
    }
    lockedDirectionRef.current = null
    isFirstPointerMoveRef.current = false
    lastMovePosRef.current = null
    pendingSwipeRef.current = false
    pendingSwipeStartPosRef.current = null
    swipeFromScrollableRef.current = false
    sawPrimaryButtonsOnMoveRef.current = false
    elementSizeRef.current = {
      width: 0,
      height: 0,
    }
    swipeStartTimeRef.current = null
    lastDragSampleRef.current = null
    lastDragVelocityRef.current = {
      x: 0,
      y: 0,
    }
    lastProgressDetailsRef.current = null
    syncDragStyles(false)
  }, [setSwiping, swipeThresholdDefault, syncDragStyles, updateSwipeProgress])
  function getPrimaryPointerPosition(event) {
    if ("touches" in event) {
      const touch = event.touches[0]
      return touch
        ? {
            x: touch.clientX,
            y: touch.clientY,
          }
        : null
    }
    return {
      x: event.clientX,
      y: event.clientY,
    }
  }
  function isTouchLikeEvent(event) {
    if ("touches" in event) return true
    return event.pointerType === "touch"
  }
  function getTargetAtPoint(position, nativeEvent) {
    const root = elementRef.current?.getRootNode()
    return getElementAtPoint(root, position.x, position.y) ?? getTarget(nativeEvent)
  }
  function findGestureScrollableTouchTarget(target, root) {
    if (hasHorizontal && !hasVertical) return findScrollableTouchTarget(target, root, "horizontal")
    if (hasVertical && !hasHorizontal) return findScrollableTouchTarget(target, root, "vertical")
    return (
      findScrollableTouchTarget(target, root, "vertical") ??
      findScrollableTouchTarget(target, root, "horizontal")
    )
  }
  function startSwipeAtPosition(event, position, startOptions) {
    swipeFromScrollableRef.current = false
    const touchLike = isTouchLikeEvent(event)
    const target = getTargetAtPoint(position, event.nativeEvent)
    const body = ownerDocument(elementRef.current).body
    const scrollableTarget =
      touchLike && body ? findGestureScrollableTouchTarget(target, body) : null
    const ignoreScrollableTarget = startOptions?.ignoreScrollableTarget ?? false
    if (scrollableTarget && !ignoreScrollableTarget) return false
    swipeFromScrollableRef.current = Boolean(scrollableTarget && ignoreScrollableTarget)
    if (
      (target ? target.closest(ignoreSelector) : false) &&
      (!touchLike || ignoreSelectorWhenTouch)
    )
      return false
    const element = elementRef.current
    if (ignoreScrollableAncestors && element && target && scrollAxes.length > 0) {
      if (
        !(startOptions?.ignoreScrollableAncestors ?? false) &&
        hasScrollableAncestor(target, element, scrollAxes)
      )
        return false
    }
    cancelledSwipeRef.current = false
    intendedSwipeDirectionRef.current = void 0
    maxSwipeDisplacementRef.current = 0
    dragStartPosRef.current = position
    swipeStartTimeRef.current = getValidTimeStamp(event.timeStamp)
    swipeCancelBaselineRef.current = position
    lastMovePosRef.current = position
    swipeThresholdRef.current = swipeThresholdDefault
    swipeThresholdFunctionRef.current =
      typeof swipeThresholdProp === "function" ? swipeThresholdProp : null
    if (element) {
      elementSizeRef.current = {
        width: element.offsetWidth,
        height: element.offsetHeight,
      }
      resolveSwipeThreshold(primaryDirection)
      const transform = getElementTransform(element)
      initialTransformRef.current = transform
      dragOffsetRef.current = {
        x: transform.x,
        y: transform.y,
      }
      recordDragSample(
        {
          x: transform.x,
          y: transform.y,
        },
        swipeStartTimeRef.current,
      )
      if (!("touches" in event))
        safelyChangePointerCapture(element, event.pointerId, "setPointerCapture")
    }
    onSwipeStart?.(event.nativeEvent)
    setSwiping(true)
    lockedDirectionRef.current = null
    isFirstPointerMoveRef.current = true
    updateSwipeProgress(0)
    syncDragStyles(true)
    return true
  }
  function resetPendingSwipeState() {
    clearPendingSwipeStartState()
    swipeFromScrollableRef.current = false
    lastMovePosRef.current = null
  }
  function clearPendingSwipeStartState() {
    pendingSwipeRef.current = false
    pendingSwipeStartPosRef.current = null
  }
  function cancelSwipeInteraction(event) {
    resetPendingSwipeState()
    if (!isSwipingRef.current) return
    setSwiping(false)
    lockedDirectionRef.current = null
    const resolvedInitialTransform = initialTransformRef.current
    dragOffsetRef.current = {
      x: resolvedInitialTransform.x,
      y: resolvedInitialTransform.y,
    }
    setCurrentSwipeDirection(void 0)
    sawPrimaryButtonsOnMoveRef.current = false
    syncDragStyles(false)
    const element = elementRef.current
    if (element) safelyChangePointerCapture(element, event.pointerId, "releasePointerCapture")
    updateSwipeProgress(0, {
      deltaX: 0,
      deltaY: 0,
      direction: void 0,
    })
    onCancel?.(event.nativeEvent)
  }
  function applyDirectionalDamping(deltaX, deltaY) {
    const exponent = (value) => Math.sign(value) * Math.abs(value) ** 0.5
    const dampAxis = (delta, allowNegative, allowPositive) => {
      if ((!allowNegative && delta < 0) || (!allowPositive && delta > 0)) return exponent(delta)
      return delta
    }
    return {
      x: hasHorizontal ? dampAxis(deltaX, allowLeft, allowRight) : exponent(deltaX),
      y: hasVertical ? dampAxis(deltaY, allowUp, allowDown) : exponent(deltaY),
    }
  }
  function canSwipeFromScrollEdgeOnPendingMove(scrollTarget, deltaX, deltaY) {
    const canSwipeOnAxis = (
      delta,
      scrollOffset,
      maxScrollOffset,
      allowTowardStart,
      allowTowardEnd,
    ) =>
      (delta > 0 && scrollOffset <= 0 && allowTowardStart) ||
      (delta < 0 && scrollOffset >= Math.max(0, maxScrollOffset) && allowTowardEnd)
    const absDeltaX = Math.abs(deltaX)
    const absDeltaY = Math.abs(deltaY)
    if (hasVertical && deltaY !== 0 && (!hasHorizontal || absDeltaY >= absDeltaX))
      return canSwipeOnAxis(
        deltaY,
        scrollTarget.scrollTop,
        scrollTarget.scrollHeight - scrollTarget.clientHeight,
        allowDown,
        allowUp,
      )
    if (hasHorizontal && deltaX !== 0 && (!hasVertical || absDeltaX > absDeltaY))
      return canSwipeOnAxis(
        deltaX,
        scrollTarget.scrollLeft,
        scrollTarget.scrollWidth - scrollTarget.clientWidth,
        allowRight,
        allowLeft,
      )
    return null
  }
  const handleStart = useStableCallback((event) => {
    if (!enabled) return
    if (event.defaultPrevented || event.nativeEvent.defaultPrevented) return
    if (!("touches" in event) && event.button !== 0) return
    const startPos = getPrimaryPointerPosition(event)
    if (!startPos) return
    pendingSwipeRef.current = true
    pendingSwipeStartPosRef.current = startPos
    swipeFromScrollableRef.current = false
    sawPrimaryButtonsOnMoveRef.current = !("touches" in event)
    if (
      !(canStart
        ? canStart(startPos, {
            nativeEvent: event.nativeEvent,
            direction: primaryDirection,
          })
        : true)
    )
      return
    if (startSwipeAtPosition(event, startPos)) clearPendingSwipeStartState()
  })
  function handleMoveCore(event, position, movement) {
    if (!enabled || !isSwipingRef.current) return
    const target = getTarget(event.nativeEvent)
    if (isTouchLikeEvent(event) && !swipeFromScrollableRef.current) {
      const boundaryElement = event.currentTarget
      if (findGestureScrollableTouchTarget(target, boundaryElement)) return
    }
    if (!("touches" in event)) event.preventDefault()
    if (isFirstPointerMoveRef.current) {
      isFirstPointerMoveRef.current = false
      if (trackDrag) {
        dragStartPosRef.current = position
        const moveTime = getValidTimeStamp(event.timeStamp)
        if (moveTime !== null) swipeStartTimeRef.current = moveTime
      }
    }
    const clientX = position.x
    const clientY = position.y
    const movementX = movement.x
    const movementY = movement.y
    if (
      (movementY < 0 && clientY > swipeCancelBaselineRef.current.y) ||
      (movementY > 0 && clientY < swipeCancelBaselineRef.current.y)
    )
      swipeCancelBaselineRef.current = {
        x: swipeCancelBaselineRef.current.x,
        y: clientY,
      }
    if (
      (movementX < 0 && clientX > swipeCancelBaselineRef.current.x) ||
      (movementX > 0 && clientX < swipeCancelBaselineRef.current.x)
    )
      swipeCancelBaselineRef.current = {
        x: clientX,
        y: swipeCancelBaselineRef.current.y,
      }
    const deltaX = clientX - dragStartPosRef.current.x
    const deltaY = clientY - dragStartPosRef.current.y
    const cancelDeltaY = clientY - swipeCancelBaselineRef.current.y
    const cancelDeltaX = clientX - swipeCancelBaselineRef.current.x
    let lockedDirection = lockedDirectionRef.current
    if (lockedDirection === null && hasHorizontal && hasVertical) {
      if (Math.sqrt(deltaX * deltaX + deltaY * deltaY) >= MIN_DRAG_THRESHOLD$1) {
        lockedDirection = Math.abs(deltaX) > Math.abs(deltaY) ? "horizontal" : "vertical"
        lockedDirectionRef.current = lockedDirection
      }
    }
    let candidate
    if (!intendedSwipeDirectionRef.current) {
      if (lockedDirection === "vertical") {
        if (deltaY > 0) candidate = "down"
        else if (deltaY < 0) candidate = "up"
      } else if (lockedDirection === "horizontal") {
        if (deltaX > 0) candidate = "right"
        else if (deltaX < 0) candidate = "left"
      } else if (Math.abs(deltaX) >= Math.abs(deltaY)) candidate = deltaX > 0 ? "right" : "left"
      else candidate = deltaY > 0 ? "down" : "up"
      if (candidate) {
        if (
          (candidate === "left" && allowLeft) ||
          (candidate === "right" && allowRight) ||
          (candidate === "up" && allowUp) ||
          (candidate === "down" && allowDown)
        ) {
          intendedSwipeDirectionRef.current = candidate
          maxSwipeDisplacementRef.current = getDisplacement(candidate, deltaX, deltaY)
          setCurrentSwipeDirection(candidate)
          resolveSwipeThreshold(candidate)
        }
      }
    } else {
      const direction = intendedSwipeDirectionRef.current
      const currentDisplacement = getDisplacement(direction, cancelDeltaX, cancelDeltaY)
      if (currentDisplacement > swipeThresholdRef.current) {
        cancelledSwipeRef.current = false
        setCurrentSwipeDirection(direction)
      } else if (
        !(allowLeft && allowRight) &&
        !(allowUp && allowDown) &&
        maxSwipeDisplacementRef.current - currentDisplacement >= REVERSE_CANCEL_THRESHOLD$1
      )
        cancelledSwipeRef.current = true
    }
    const dampedDelta = applyDirectionalDamping(deltaX, deltaY)
    let newOffsetX = initialTransformRef.current.x
    let newOffsetY = initialTransformRef.current.y
    if (lockedDirection === "horizontal") {
      if (hasHorizontal) newOffsetX += dampedDelta.x
    } else if (lockedDirection === "vertical") {
      if (hasVertical) newOffsetY += dampedDelta.y
    } else {
      if (hasHorizontal) newOffsetX += dampedDelta.x
      if (hasVertical) newOffsetY += dampedDelta.y
    }
    const previousOffset = dragOffsetRef.current
    const offsetChanged = newOffsetX !== previousOffset.x || newOffsetY !== previousOffset.y
    dragOffsetRef.current = {
      x: newOffsetX,
      y: newOffsetY,
    }
    if (offsetChanged) syncDragStyles(true)
    recordDragSample(
      {
        x: newOffsetX,
        y: newOffsetY,
      },
      getValidTimeStamp(event.timeStamp),
    )
    const dragDeltaX = newOffsetX - initialTransformRef.current.x
    const dragDeltaY = newOffsetY - initialTransformRef.current.y
    const progressDetails = {
      deltaX: dragDeltaX,
      deltaY: dragDeltaY,
      direction: intendedSwipeDirectionRef.current,
    }
    let progress = 0
    const progressDirection = primaryDirection ?? intendedSwipeDirectionRef.current
    if (progressDirection) {
      const size =
        progressDirection === "left" || progressDirection === "right"
          ? elementSizeRef.current.width
          : elementSizeRef.current.height
      const scale = initialTransformRef.current.scale || 1
      const progressDisplacement = getDisplacement(progressDirection, dragDeltaX, dragDeltaY)
      if (size > 0 && scale > 0 && progressDisplacement > 0)
        progress = progressDisplacement / (size * scale)
    }
    updateSwipeProgress(progress, progressDetails)
  }
  const handleEnd = useStableCallback((event) => {
    if (!enabled) return
    const resolvedDragOffset = dragOffsetRef.current
    const resolvedInitialTransform = initialTransformRef.current
    const releaseDeltaX = resolvedDragOffset.x - resolvedInitialTransform.x
    const releaseDeltaY = resolvedDragOffset.y - resolvedInitialTransform.y
    const progressDetails = {
      deltaX: releaseDeltaX,
      deltaY: releaseDeltaY,
      direction: intendedSwipeDirectionRef.current,
    }
    if (!isSwipingRef.current) {
      resetPendingSwipeState()
      updateSwipeProgress(0, progressDetails)
      return
    }
    setSwiping(false)
    lockedDirectionRef.current = null
    resetPendingSwipeState()
    sawPrimaryButtonsOnMoveRef.current = false
    const element = elementRef.current
    if (element) {
      if (!("touches" in event))
        safelyChangePointerCapture(element, event.pointerId, "releasePointerCapture")
    }
    const deltaX = releaseDeltaX
    const deltaY = releaseDeltaY
    const startTime = swipeStartTimeRef.current
    const endTime = getValidTimeStamp(event.timeStamp)
    const durationMs =
      startTime !== null && endTime !== null && endTime > startTime ? endTime - startTime : 0
    const velocityDurationMs = durationMs > 0 ? Math.max(durationMs, MIN_VELOCITY_DURATION_MS) : 0
    const velocityX = velocityDurationMs > 0 ? deltaX / velocityDurationMs : 0
    const velocityY = velocityDurationMs > 0 ? deltaY / velocityDurationMs : 0
    let releaseVelocityX = lastDragVelocityRef.current.x
    let releaseVelocityY = lastDragVelocityRef.current.y
    const lastSample = lastDragSampleRef.current
    if (lastSample && endTime !== null && endTime >= lastSample.time) {
      const ageMs = endTime - lastSample.time
      if (ageMs <= MAX_RELEASE_VELOCITY_AGE_MS) {
        const sampleDurationMs = Math.max(ageMs, MIN_RELEASE_VELOCITY_DURATION_MS)
        const deltaFromLastSampleX = resolvedDragOffset.x - lastSample.x
        const deltaFromLastSampleY = resolvedDragOffset.y - lastSample.y
        const sampleVelocityX = deltaFromLastSampleX / sampleDurationMs
        const sampleVelocityY = deltaFromLastSampleY / sampleDurationMs
        if (sampleVelocityX !== 0) releaseVelocityX = sampleVelocityX
        if (sampleVelocityY !== 0) releaseVelocityY = sampleVelocityY
      } else {
        releaseVelocityX = 0
        releaseVelocityY = 0
      }
    }
    const releaseDecision = onRelease?.({
      event: event.nativeEvent,
      direction: intendedSwipeDirectionRef.current,
      deltaX,
      deltaY,
      velocityX,
      velocityY,
      releaseVelocityX,
      releaseVelocityY,
    })
    const hasReleaseDecision = typeof releaseDecision === "boolean"
    if (cancelledSwipeRef.current && !hasReleaseDecision) {
      dragOffsetRef.current = {
        x: resolvedInitialTransform.x,
        y: resolvedInitialTransform.y,
      }
      setCurrentSwipeDirection(void 0)
      syncDragStyles(false)
      updateSwipeProgress(0, progressDetails)
      return
    }
    let shouldClose = false
    let dismissDirection
    if (hasReleaseDecision) {
      shouldClose = releaseDecision
      dismissDirection = intendedSwipeDirectionRef.current ?? primaryDirection
    } else
      for (const direction of directions)
        if (getDisplacement(direction, deltaX, deltaY) > swipeThresholdRef.current) {
          shouldClose = true
          dismissDirection = direction
          break
        }
    if (shouldClose && dismissDirection) {
      setCurrentSwipeDirection(dismissDirection)
      setDragDismissed(true)
      syncDragStyles(false)
      onDismiss?.(event.nativeEvent, { direction: dismissDirection })
    } else {
      dragOffsetRef.current = {
        x: resolvedInitialTransform.x,
        y: resolvedInitialTransform.y,
      }
      setCurrentSwipeDirection(void 0)
      syncDragStyles(false)
      updateSwipeProgress(0, progressDetails)
    }
  })
  const handleMove = useStableCallback((event) => {
    const currentPos = getPrimaryPointerPosition(event)
    if (!currentPos) return
    let endAfterMove = false
    if (!("touches" in event)) {
      const hasPrimaryButton = hasPrimaryMouseButton(event.buttons)
      if (hasPrimaryButton) sawPrimaryButtonsOnMoveRef.current = true
      if (event.buttons !== 0 && !hasPrimaryButton) {
        cancelSwipeInteraction(event)
        return
      }
      if (event.buttons === 0 && sawPrimaryButtonsOnMoveRef.current) {
        if (!isSwipingRef.current) {
          handleEnd(event)
          return
        }
        endAfterMove = true
      }
    }
    if (!isSwiping && pendingSwipeRef.current) {
      if (
        !isTouchLikeEvent(event) &&
        (event.defaultPrevented || event.nativeEvent.defaultPrevented)
      ) {
        resetPendingSwipeState()
        return
      }
      if (
        canStart
          ? canStart(currentPos, {
              nativeEvent: event.nativeEvent,
              direction: primaryDirection,
            })
          : true
      ) {
        const pendingStartPos = pendingSwipeStartPosRef.current
        let ignoreScrollableOnStart = false
        if (isTouchLikeEvent(event)) {
          const element = elementRef.current
          if (pendingStartPos && element) {
            const target = getTargetAtPoint(currentPos, event.nativeEvent)
            const body = ownerDocument(element).body
            const scrollTarget = body ? findGestureScrollableTouchTarget(target, body) : null
            if (
              scrollTarget &&
              (contains(element, scrollTarget) || contains(scrollTarget, element))
            ) {
              const canSwipeFromEdge = canSwipeFromScrollEdgeOnPendingMove(
                scrollTarget,
                currentPos.x - pendingStartPos.x,
                currentPos.y - pendingStartPos.y,
              )
              if (canSwipeFromEdge === false) return
              if (canSwipeFromEdge === true) ignoreScrollableOnStart = true
            }
          }
        }
        if (
          startSwipeAtPosition(event, currentPos, {
            ignoreScrollableTarget: ignoreScrollableOnStart,
            ignoreScrollableAncestors: ignoreScrollableOnStart,
          })
        ) {
          if (pendingStartPos && ignoreScrollableOnStart) {
            clearPendingSwipeStartState()
            dragStartPosRef.current = pendingStartPos
            swipeCancelBaselineRef.current = pendingStartPos
            lastMovePosRef.current = pendingStartPos
            isFirstPointerMoveRef.current = false
          } else {
            clearPendingSwipeStartState()
            swipeFromScrollableRef.current = false
          }
        }
      }
    }
    const previousPos = lastMovePosRef.current
    const movement =
      previousPos === null
        ? {
            x: 0,
            y: 0,
          }
        : {
            x: currentPos.x - previousPos.x,
            y: currentPos.y - previousPos.y,
          }
    lastMovePosRef.current = currentPos
    handleMoveCore(event, currentPos, movement)
    if (endAfterMove && !("touches" in event)) handleEnd(event)
  })
  const moveNative = useStableCallback((nativeEvent, currentTarget) => {
    handleMove({
      touches: nativeEvent.touches,
      currentTarget,
      nativeEvent,
      defaultPrevented: nativeEvent.defaultPrevented,
      timeStamp: nativeEvent.timeStamp,
    })
  })
  const getDragStyles = import_react.useCallback(() => {
    const swiping = isSwipingRef.current
    const dragOffset = dragOffsetRef.current
    const initialTransform = initialTransformRef.current
    const deltaX = dragOffset.x - initialTransform.x
    const deltaY = dragOffset.y - initialTransform.y
    if (!swiping && deltaX === 0 && deltaY === 0 && !dragDismissed)
      return {
        [movementCssVars.x]: "0px",
        [movementCssVars.y]: "0px",
      }
    return {
      transition: swiping ? "none" : void 0,
      transform: swiping ? getDragTransform(dragOffset, initialTransform.scale) : void 0,
      [movementCssVars.x]: `${deltaX}px`,
      [movementCssVars.y]: `${deltaY}px`,
    }
  }, [dragDismissed, movementCssVars])
  return {
    swiping: isSwiping,
    swipeDirection: currentSwipeDirection,
    dragDismissed,
    getPointerProps: import_react.useCallback(() => {
      if (!enabled) return {}
      return {
        onPointerDown: handleStart,
        onPointerMove: handleMove,
        onPointerUp: handleEnd,
        onPointerCancel: handleEnd,
      }
    }, [enabled, handleEnd, handleMove, handleStart]),
    getTouchProps: import_react.useCallback(() => {
      if (!enabled) return {}
      return {
        onTouchStart: handleStart,
        onTouchMove: handleMove,
        onTouchEnd: handleEnd,
        onTouchCancel: handleEnd,
      }
    }, [enabled, handleEnd, handleMove, handleStart]),
    moveNative,
    getDragStyles,
    reset,
  }
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/toast/root/ToastRoot.mjs
const toastRootStateAttributesMapping = {
  ...transitionStatusMapping,
  swipeDirection(value) {
    return value ? { "data-swipe-direction": value } : null
  },
}
const SWIPE_THRESHOLD = 40
const REVERSE_CANCEL_THRESHOLD = 10
const OPPOSITE_DIRECTION_DAMPING_FACTOR = 0.5
const MIN_DRAG_THRESHOLD = 1
const TOAST_SWIPE_IGNORE_SELECTOR = `${BASE_UI_SWIPE_IGNORE_SELECTOR},${LEGACY_SWIPE_IGNORE_SELECTOR}`
/**
 * Groups all parts of an individual toast.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Toast](https://base-ui.com/react/components/toast)
 */
const ToastRoot = /*#__PURE__*/ import_react.forwardRef(
  function ToastRoot(componentProps, forwardedRef) {
    const {
      toast,
      render,
      className,
      swipeDirection = ["down", "right"],
      style,
      ...elementProps
    } = componentProps
    const isAnchored = toast.positionerProps?.anchor !== void 0
    let swipeDirections = []
    if (!isAnchored)
      swipeDirections = Array.isArray(swipeDirection) ? swipeDirection : [swipeDirection]
    const swipeEnabled = swipeDirections.length > 0
    const store = useToastProviderContext()
    const [currentSwipeDirection, setCurrentSwipeDirection] = import_react.useState(void 0)
    const [isSwiping, setIsSwiping] = import_react.useState(false)
    const [isRealSwipe, setIsRealSwipe] = import_react.useState(false)
    const [dragOffset, setDragOffset] = import_react.useState({
      x: 0,
      y: 0,
    })
    const [initialTransform, setInitialTransform] = import_react.useState({
      x: 0,
      y: 0,
      scale: 1,
    })
    const [titleId, setTitleId] = import_react.useState()
    const [descriptionId, setDescriptionId] = import_react.useState()
    const [lockedDirection, setLockedDirection] = import_react.useState(null)
    const rootRef = import_react.useRef(null)
    const lastToastIdRef = import_react.useRef(void 0)
    const dragStartPosRef = import_react.useRef({
      x: 0,
      y: 0,
    })
    const initialTransformRef = import_react.useRef({
      x: 0,
      y: 0,
      scale: 1,
    })
    const intendedSwipeDirectionRef = import_react.useRef(void 0)
    const maxSwipeDisplacementRef = import_react.useRef(0)
    const cancelledSwipeRef = import_react.useRef(false)
    const swipeCancelBaselineRef = import_react.useRef({
      x: 0,
      y: 0,
    })
    const isFirstPointerMoveRef = import_react.useRef(false)
    const dragOffsetRef = import_react.useRef({
      x: 0,
      y: 0,
    })
    const activePointerIdRef = import_react.useRef(null)
    const dragAbortControllerRef = import_react.useRef(null)
    const domIndex = store.useState("toastIndex", toast.id)
    const visibleIndex = store.useState("toastVisibleIndex", toast.id)
    const offsetY = store.useState("toastOffsetY", toast.id)
    const focused = store.useState("focused")
    const expanded = store.useState("expanded")
    useOpenChangeComplete({
      open: toast.transitionStatus !== "ending",
      ref: rootRef,
      onComplete() {
        if (toast.transitionStatus === "ending") store.removeToast(toast.id)
      },
    })
    const recalculateHeight = useStableCallback((flushSync = false) => {
      const element = rootRef.current
      if (!element) return
      const previousHeight = element.style.height
      element.style.height = "auto"
      const height = element.offsetHeight
      element.style.height = previousHeight
      function update() {
        store.updateToastInternal(toast.id, {
          ref: rootRef,
          height,
          transitionStatus: void 0,
        })
      }
      if (flushSync) import_react_dom.flushSync(update)
      else update()
    })
    useIsoLayoutEffect(() => {
      const previousToastId = lastToastIdRef.current
      if (toast.transitionStatus !== "starting" && previousToastId === toast.id) return
      if (previousToastId !== void 0) {
        setCurrentSwipeDirection(void 0)
        setInitialTransform({
          x: 0,
          y: 0,
          scale: 1,
        })
        setResolvedDragOffset({
          x: 0,
          y: 0,
        })
      }
      lastToastIdRef.current = toast.id
      recalculateHeight()
    }, [recalculateHeight, toast.id, toast.transitionStatus])
    function setResolvedDragOffset(nextDragOffset) {
      dragOffsetRef.current = nextDragOffset
      setDragOffset(nextDragOffset)
    }
    useIsoLayoutEffect(() => {
      return () => {
        dragAbortControllerRef.current?.abort()
      }
    }, [])
    function applyDirectionalDamping(deltaX, deltaY) {
      const damp = (delta) =>
        delta > 0
          ? delta ** OPPOSITE_DIRECTION_DAMPING_FACTOR
          : -(Math.abs(delta) ** OPPOSITE_DIRECTION_DAMPING_FACTOR)
      const dampX =
        (deltaX > 0 && !swipeDirections.includes("right")) ||
        (deltaX < 0 && !swipeDirections.includes("left"))
      const dampY =
        (deltaY > 0 && !swipeDirections.includes("down")) ||
        (deltaY < 0 && !swipeDirections.includes("up"))
      return {
        x: dampX ? damp(deltaX) : deltaX,
        y: dampY ? damp(deltaY) : deltaY,
      }
    }
    const handleSwipeEnd = useStableCallback((event) => {
      if (event.pointerId !== activePointerIdRef.current) return
      activePointerIdRef.current = null
      dragAbortControllerRef.current?.abort()
      dragAbortControllerRef.current = null
      setIsSwiping(false)
      setIsRealSwipe(false)
      setLockedDirection(null)
      const resolvedInitialTransform = initialTransformRef.current
      if (event.type === "pointercancel" || cancelledSwipeRef.current) {
        setResolvedDragOffset({
          x: resolvedInitialTransform.x,
          y: resolvedInitialTransform.y,
        })
        setCurrentSwipeDirection(void 0)
        return
      }
      const resolvedDragOffset = dragOffsetRef.current
      const deltaX = resolvedDragOffset.x - resolvedInitialTransform.x
      const deltaY = resolvedDragOffset.y - resolvedInitialTransform.y
      let dismissDirection
      for (const direction of swipeDirections)
        if (getDisplacement(direction, deltaX, deltaY) > SWIPE_THRESHOLD) {
          dismissDirection = direction
          break
        }
      if (dismissDirection) {
        setCurrentSwipeDirection(dismissDirection)
        store.closeToast(toast.id)
      } else {
        setResolvedDragOffset({
          x: resolvedInitialTransform.x,
          y: resolvedInitialTransform.y,
        })
        setCurrentSwipeDirection(void 0)
      }
    })
    function handlePointerDown(event) {
      if (event.button !== 0) return
      if (event.pointerType === "touch") store.pauseTimers()
      if (
        getTarget(event.nativeEvent)?.closest(
          `button,a,input,textarea,[role="button"],${TOAST_SWIPE_IGNORE_SELECTOR}`,
        )
      )
        return
      cancelledSwipeRef.current = false
      intendedSwipeDirectionRef.current = void 0
      maxSwipeDisplacementRef.current = 0
      activePointerIdRef.current = event.pointerId
      dragStartPosRef.current = {
        x: event.clientX,
        y: event.clientY,
      }
      swipeCancelBaselineRef.current = dragStartPosRef.current
      const element = event.currentTarget
      const transform = getElementTransform(element)
      initialTransformRef.current = transform
      setInitialTransform(transform)
      setResolvedDragOffset({
        x: transform.x,
        y: transform.y,
      })
      store.set("hovering", true)
      setIsSwiping(true)
      setIsRealSwipe(false)
      setLockedDirection(null)
      isFirstPointerMoveRef.current = true
      dragAbortControllerRef.current?.abort()
      const dragAbortController = new AbortController()
      dragAbortControllerRef.current = dragAbortController
      const doc = ownerDocument(element)
      doc.addEventListener("pointerup", handleSwipeEnd, { signal: dragAbortController.signal })
      doc.addEventListener("pointercancel", handleSwipeEnd, { signal: dragAbortController.signal })
      element.setPointerCapture?.(event.pointerId)
    }
    function handlePointerMove(event) {
      if (event.pointerId !== activePointerIdRef.current) return
      event.preventDefault()
      if (isFirstPointerMoveRef.current) {
        dragStartPosRef.current = {
          x: event.clientX,
          y: event.clientY,
        }
        isFirstPointerMoveRef.current = false
      }
      const { clientY, clientX, movementX, movementY } = event
      if (
        (movementY < 0 && clientY > swipeCancelBaselineRef.current.y) ||
        (movementY > 0 && clientY < swipeCancelBaselineRef.current.y)
      )
        swipeCancelBaselineRef.current = {
          x: swipeCancelBaselineRef.current.x,
          y: clientY,
        }
      if (
        (movementX < 0 && clientX > swipeCancelBaselineRef.current.x) ||
        (movementX > 0 && clientX < swipeCancelBaselineRef.current.x)
      )
        swipeCancelBaselineRef.current = {
          x: clientX,
          y: swipeCancelBaselineRef.current.y,
        }
      const deltaX = clientX - dragStartPosRef.current.x
      const deltaY = clientY - dragStartPosRef.current.y
      const cancelDeltaY = clientY - swipeCancelBaselineRef.current.y
      const cancelDeltaX = clientX - swipeCancelBaselineRef.current.x
      let resolvedLockedDirection = lockedDirection
      if (!isRealSwipe) {
        if (Math.sqrt(deltaX * deltaX + deltaY * deltaY) >= MIN_DRAG_THRESHOLD) {
          setIsRealSwipe(true)
          const hasHorizontal =
            swipeDirections.includes("left") || swipeDirections.includes("right")
          const hasVertical = swipeDirections.includes("up") || swipeDirections.includes("down")
          if (hasHorizontal && hasVertical) {
            resolvedLockedDirection =
              Math.abs(deltaX) > Math.abs(deltaY) ? "horizontal" : "vertical"
            setLockedDirection(resolvedLockedDirection)
          }
        }
      }
      let candidate
      if (!intendedSwipeDirectionRef.current) {
        if (resolvedLockedDirection === "vertical") {
          if (deltaY > 0) candidate = "down"
          else if (deltaY < 0) candidate = "up"
        } else if (resolvedLockedDirection === "horizontal") {
          if (deltaX > 0) candidate = "right"
          else if (deltaX < 0) candidate = "left"
        } else if (Math.abs(deltaX) >= Math.abs(deltaY)) candidate = deltaX > 0 ? "right" : "left"
        else candidate = deltaY > 0 ? "down" : "up"
        if (candidate && swipeDirections.includes(candidate)) {
          intendedSwipeDirectionRef.current = candidate
          maxSwipeDisplacementRef.current = getDisplacement(candidate, deltaX, deltaY)
          setCurrentSwipeDirection(candidate)
        }
      } else {
        const direction = intendedSwipeDirectionRef.current
        const currentDisplacement = getDisplacement(direction, cancelDeltaX, cancelDeltaY)
        if (currentDisplacement > SWIPE_THRESHOLD) {
          cancelledSwipeRef.current = false
          setCurrentSwipeDirection(direction)
        } else if (
          !(swipeDirections.includes("left") && swipeDirections.includes("right")) &&
          !(swipeDirections.includes("up") && swipeDirections.includes("down")) &&
          maxSwipeDisplacementRef.current - currentDisplacement >= REVERSE_CANCEL_THRESHOLD
        )
          cancelledSwipeRef.current = true
      }
      const dampedDelta = applyDirectionalDamping(deltaX, deltaY)
      let newOffsetX = initialTransformRef.current.x
      let newOffsetY = initialTransformRef.current.y
      const hasHorizontalDir = swipeDirections.includes("left") || swipeDirections.includes("right")
      const hasVerticalDir = swipeDirections.includes("up") || swipeDirections.includes("down")
      if (resolvedLockedDirection !== "vertical" && hasHorizontalDir) newOffsetX += dampedDelta.x
      if (resolvedLockedDirection !== "horizontal" && hasVerticalDir) newOffsetY += dampedDelta.y
      setResolvedDragOffset({
        x: newOffsetX,
        y: newOffsetY,
      })
    }
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        if (
          !rootRef.current ||
          !contains(rootRef.current, activeElement(ownerDocument(rootRef.current)))
        )
          return
        store.closeToast(toast.id)
      }
    }
    import_react.useEffect(() => {
      const element = rootRef.current
      if (!swipeEnabled || !element) return
      function preventDefaultTouchStart(event) {
        if (activePointerIdRef.current === null || !contains(element, getTarget(event))) return
        event.preventDefault()
      }
      return addEventListener(element, "touchmove", preventDefaultTouchStart, { passive: false })
    }, [swipeEnabled])
    function getDragStyles() {
      const deltaX = dragOffset.x - initialTransform.x
      const deltaY = dragOffset.y - initialTransform.y
      return {
        "transition": isSwiping ? "none" : void 0,
        "transform": isSwiping
          ? `translateX(${dragOffset.x}px) translateY(${dragOffset.y}px) scale(${initialTransform.scale})`
          : void 0,
        ["--toast-swipe-movement-x"]: `${deltaX}px`,
        ["--toast-swipe-movement-y"]: `${deltaY}px`,
      }
    }
    const isHighPriority = toast.priority === "high"
    const defaultProps = {
      "role": isHighPriority ? "alertdialog" : "dialog",
      "tabIndex": 0,
      "aria-modal": false,
      "aria-labelledby": titleId,
      "aria-describedby": descriptionId,
      "aria-hidden": isHighPriority && !focused ? true : void 0,
      "onPointerDown": swipeEnabled ? handlePointerDown : void 0,
      "onPointerMove": swipeEnabled ? handlePointerMove : void 0,
      "onPointerUp": swipeEnabled ? handleSwipeEnd : void 0,
      "onPointerCancel": swipeEnabled ? handleSwipeEnd : void 0,
      "onKeyDown": handleKeyDown,
      "inert": inertValue(toast.limited),
      "style": {
        ...getDragStyles(),
        ["--toast-index"]: toast.transitionStatus === "ending" ? domIndex : visibleIndex,
        ["--toast-offset-y"]: `${offsetY}px`,
        ["--toast-height"]: toast.height ? `${toast.height}px` : void 0,
      },
    }
    const toastRoot = import_react.useMemo(
      () => ({
        toast,
        setTitleId,
        setDescriptionId,
        recalculateHeight,
        visibleIndex,
        expanded,
      }),
      [toast, setTitleId, setDescriptionId, recalculateHeight, visibleIndex, expanded],
    )
    const state = {
      transitionStatus: toast.transitionStatus,
      expanded,
      limited: toast.limited || false,
      type: toast.type,
      swiping: isSwiping,
      swipeDirection: currentSwipeDirection,
    }
    const element = useRenderElement("div", componentProps, {
      ref: [forwardedRef, rootRef],
      state,
      stateAttributesMapping: toastRootStateAttributesMapping,
      props: [defaultProps, elementProps],
    })
    return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ToastRootContext.Provider, {
      value: toastRoot,
      children: element,
    })
  },
)
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/toast/content/ToastContent.mjs
/**
 * A container for the contents of a toast.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Toast](https://base-ui.com/react/components/toast)
 */
const ToastContent$1 = /*#__PURE__*/ import_react.forwardRef(
  function ToastContent(componentProps, forwardedRef) {
    const { render, className, style, ...elementProps } = componentProps
    const { visibleIndex, expanded, recalculateHeight } = useToastRootContext()
    const contentRef = import_react.useRef(null)
    useIsoLayoutEffect(() => {
      recalculateHeight()
      const node = contentRef.current
      if (!node || typeof ResizeObserver !== "function" || typeof MutationObserver !== "function")
        return
      const resizeObserver = new ResizeObserver(() => recalculateHeight(true))
      const mutationObserver = new MutationObserver(() => recalculateHeight(true))
      resizeObserver.observe(node)
      mutationObserver.observe(node, {
        childList: true,
        subtree: true,
        characterData: true,
      })
      return () => {
        resizeObserver.disconnect()
        mutationObserver.disconnect()
      }
    }, [recalculateHeight])
    return useRenderElement("div", componentProps, {
      ref: [forwardedRef, contentRef],
      state: {
        expanded,
        behind: visibleIndex > 0,
      },
      props: elementProps,
    })
  },
)
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.2_@types_46200efdf1f5c806fc19b01530afd9e7/node_modules/@base-ui/utils/useId.mjs
let globalId = 0
function useGlobalId(idOverride, prefix = "mui") {
  const [defaultId, setDefaultId] = import_react.useState(idOverride)
  const id = idOverride || defaultId
  import_react.useEffect(() => {
    if (defaultId == null) {
      globalId += 1
      setDefaultId(`${prefix}-${globalId}`)
    }
  }, [defaultId, prefix])
  return id
}
const maybeReactUseId = SafeReact.useId
/**
 *
 * @example <div id={useId()} />
 * @param idOverride
 * @returns {string}
 */
function useId(idOverride, prefix) {
  if (maybeReactUseId !== void 0) {
    const reactId = maybeReactUseId()
    return idOverride ?? (prefix ? `${prefix}-${reactId}` : reactId)
  }
  return useGlobalId(idOverride, prefix)
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/toast/utils/isRenderableNode.mjs
function isRenderableNode(node) {
  if (node == null || typeof node === "boolean" || node === "") return false
  if (Array.isArray(node)) return node.some(isRenderableNode)
  return true
}
function hasRenderableChildren(element) {
  return (
    /*#__PURE__*/ import_react.isValidElement(element) && isRenderableNode(element.props.children)
  )
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/toast/utils/useToastLabelPart.mjs
/**
 * Shared logic for `Toast.Title` and `Toast.Description`, which only differ by the rendered tag,
 * the fallback content, and which id setter they register with. Resolves the content and returns
 * the pieces each part passes to `useRenderElement` and `useToastLabelElement`.
 */
function useToastLabelPart(idProp, childrenProp, part) {
  const { toast, setTitleId, setDescriptionId } = useToastRootContext()
  const setId = part === "title" ? setTitleId : setDescriptionId
  const children = childrenProp ?? (part === "title" ? toast.title : toast.description)
  return {
    id: useId(idProp),
    children,
    type: toast.type,
    setId,
  }
}
/**
 * Mounts the evaluated label element only when it carries renderable content (so a `render` prop's
 * own children count, while a childless styling-only `render` stays conditional), registering the
 * generated id with the root while the part renders.
 */
function useToastLabelElement(element, id, setId) {
  const shouldRender = hasRenderableChildren(element)
  useIsoLayoutEffect(() => {
    if (!shouldRender) return
    setId(id)
    return () => {
      setId((currentId) => (currentId === id ? void 0 : currentId))
    }
  }, [shouldRender, id, setId])
  return shouldRender ? element : null
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/toast/description/ToastDescription.mjs
/**
 * A description that describes the toast.
 * Can be used as the default message for the toast when no title is provided.
 * Renders a `<p>` element.
 *
 * Documentation: [Base UI Toast](https://base-ui.com/react/components/toast)
 */
const ToastDescription$1 = /*#__PURE__*/ import_react.forwardRef(
  function ToastDescription(componentProps, forwardedRef) {
    const {
      render,
      className,
      style,
      id: idProp,
      children: childrenProp,
      ...elementProps
    } = componentProps
    const { id, children, type, setId } = useToastLabelPart(idProp, childrenProp, "description")
    return useToastLabelElement(
      useRenderElement("p", componentProps, {
        ref: forwardedRef,
        state: { type },
        props: {
          ...elementProps,
          id,
          children,
        },
      }),
      id,
      setId,
    )
  },
)
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/toast/title/ToastTitle.mjs
/**
 * A title that labels the toast.
 * Renders an `<h2>` element.
 *
 * Documentation: [Base UI Toast](https://base-ui.com/react/components/toast)
 */
const ToastTitle$1 = /*#__PURE__*/ import_react.forwardRef(
  function ToastTitle(componentProps, forwardedRef) {
    const {
      render,
      className,
      style,
      id: idProp,
      children: childrenProp,
      ...elementProps
    } = componentProps
    const { id, children, type, setId } = useToastLabelPart(idProp, childrenProp, "title")
    return useToastLabelElement(
      useRenderElement("h2", componentProps, {
        ref: forwardedRef,
        state: { type },
        props: {
          ...elementProps,
          id,
          children,
        },
      }),
      id,
      setId,
    )
  },
)
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/internals/composite/root/CompositeRootContext.mjs
const CompositeRootContext = /*#__PURE__*/ import_react.createContext(void 0)
function useCompositeRootContext(optional = false) {
  const context = import_react.useContext(CompositeRootContext)
  if (context === void 0 && !optional) throw new Error(formatErrorMessage(16))
  return context
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/utils/useFocusableWhenDisabled.mjs
function useFocusableWhenDisabled(parameters) {
  const {
    focusableWhenDisabled,
    disabled,
    composite = false,
    tabIndex: tabIndexProp = 0,
    isNativeButton,
  } = parameters
  const isFocusableComposite = composite && focusableWhenDisabled !== false
  const isNonFocusableComposite = composite && focusableWhenDisabled === false
  return {
    props: import_react.useMemo(() => {
      const additionalProps = {
        onKeyDown(event) {
          if (disabled && focusableWhenDisabled && event.key !== "Tab") event.preventDefault()
        },
      }
      if (!composite) {
        additionalProps.tabIndex = tabIndexProp
        if (!isNativeButton && disabled)
          additionalProps.tabIndex = focusableWhenDisabled ? tabIndexProp : -1
      }
      if (
        (isNativeButton && (focusableWhenDisabled || isFocusableComposite)) ||
        (!isNativeButton && disabled)
      )
        additionalProps["aria-disabled"] = disabled
      if (isNativeButton && (!focusableWhenDisabled || isNonFocusableComposite))
        additionalProps.disabled = disabled
      return additionalProps
    }, [
      composite,
      disabled,
      focusableWhenDisabled,
      isFocusableComposite,
      isNonFocusableComposite,
      isNativeButton,
      tabIndexProp,
    ]),
  }
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/utils/dispatchClickWithModifiers.mjs
/**
 * Dispatches a constructed click on the target so it carries the source event's
 * modifier state, which `click()` always reports as unpressed. Like `click()`,
 * the untrusted click still runs native activation behavior (form submission,
 * link navigation).
 * `detail` defaults to 0 (the native convention for keyboard-generated clicks);
 * pass `detail: 1` when the click represents a mouse gesture so consumers keying
 * off `detail === 0` don't classify it as a keyboard activation.
 */
function dispatchClickWithModifiers(target, sourceEvent, { detail = 0 } = {}) {
  target.dispatchEvent(
    new (getWindow(target).PointerEvent)("click", {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail,
      shiftKey: sourceEvent.shiftKey,
      ctrlKey: sourceEvent.ctrlKey,
      altKey: sourceEvent.altKey,
      metaKey: sourceEvent.metaKey,
    }),
  )
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/internals/use-button/useButton.mjs
function useButton(parameters = {}) {
  const {
    disabled = false,
    focusableWhenDisabled,
    tabIndex = 0,
    native: isNativeButton = true,
    composite: compositeProp,
  } = parameters
  const elementRef = import_react.useRef(null)
  const compositeRootContext = useCompositeRootContext(true)
  const isCompositeItem = compositeProp ?? compositeRootContext !== void 0
  const { props: focusableWhenDisabledProps } = useFocusableWhenDisabled({
    focusableWhenDisabled,
    disabled,
    composite: isCompositeItem,
    tabIndex,
    isNativeButton,
  })
  const updateDisabled = import_react.useCallback(() => {
    const element = elementRef.current
    if (!isButtonElement(element)) return
    if (
      isCompositeItem &&
      disabled &&
      focusableWhenDisabledProps.disabled === void 0 &&
      element.disabled
    )
      element.disabled = false
  }, [disabled, focusableWhenDisabledProps.disabled, isCompositeItem])
  useIsoLayoutEffect(updateDisabled, [updateDisabled])
  return {
    getButtonProps: import_react.useCallback(
      (externalProps = {}) => {
        const {
          onClick: externalOnClick,
          onMouseDown: externalOnMouseDown,
          onKeyUp: externalOnKeyUp,
          onKeyDown: externalOnKeyDown,
          onPointerDown: externalOnPointerDown,
          ...otherExternalProps
        } = externalProps
        return mergeProps(
          {
            onClick(event) {
              if (disabled) {
                event.preventDefault()
                return
              }
              externalOnClick?.(event)
            },
            onMouseDown(event) {
              if (!disabled) externalOnMouseDown?.(event)
            },
            onKeyDown(event) {
              if (disabled) return
              makeEventPreventable(event)
              externalOnKeyDown?.(event)
              if (event.baseUIHandlerPrevented) return
              const isCurrentTarget = event.target === event.currentTarget
              const currentTarget = event.currentTarget
              const isButton = isButtonElement(currentTarget)
              const isLink = !isNativeButton && isValidLinkElement(currentTarget)
              const shouldClick = isCurrentTarget && (isNativeButton ? isButton : !isLink)
              const isEnterKey = event.key === "Enter"
              const isSpaceKey = event.key === " "
              const role = currentTarget.getAttribute("role")
              const isTextNavigationRole =
                role?.startsWith("menuitem") || role === "option" || role === "gridcell"
              if (isCurrentTarget && isCompositeItem && isSpaceKey) {
                if (event.defaultPrevented && isTextNavigationRole) return
                event.preventDefault()
                if (!isNativeButton || isButton) {
                  event.preventBaseUIHandler()
                  dispatchClickWithModifiers(currentTarget, event)
                }
                return
              }
              if (!shouldClick || isNativeButton || (!isSpaceKey && !isEnterKey)) {
                if (isCurrentTarget && isLink && isSpaceKey) event.preventDefault()
                return
              }
              if (event.defaultPrevented) return
              event.preventDefault()
              if (isEnterKey) {
                event.preventBaseUIHandler()
                dispatchClickWithModifiers(currentTarget, event)
              }
            },
            onKeyUp(event) {
              if (disabled) return
              makeEventPreventable(event)
              externalOnKeyUp?.(event)
              if (
                event.target === event.currentTarget &&
                isNativeButton &&
                isCompositeItem &&
                isButtonElement(event.currentTarget) &&
                event.key === " "
              ) {
                event.preventDefault()
                return
              }
              if (event.baseUIHandlerPrevented) return
              if (
                event.target === event.currentTarget &&
                !isNativeButton &&
                !isCompositeItem &&
                !event.defaultPrevented &&
                event.key === " "
              ) {
                event.preventBaseUIHandler()
                dispatchClickWithModifiers(event.currentTarget, event)
              }
            },
            onPointerDown(event) {
              if (disabled) {
                event.preventDefault()
                return
              }
              externalOnPointerDown?.(event)
            },
          },
          isNativeButton ? { type: "button" } : { role: "button" },
          focusableWhenDisabledProps,
          otherExternalProps,
        )
      },
      [disabled, focusableWhenDisabledProps, isCompositeItem, isNativeButton],
    ),
    buttonRef: useStableCallback((element) => {
      elementRef.current = element
      updateDisabled()
    }),
  }
}
function isButtonElement(elem) {
  return isHTMLElement(elem) && elem.tagName === "BUTTON"
}
function isValidLinkElement(elem) {
  return isHTMLElement(elem) && elem.tagName === "A" && Boolean(elem.href)
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/toast/close/ToastClose.mjs
/**
 * Closes the toast when clicked.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Toast](https://base-ui.com/react/components/toast)
 */
const ToastClose$1 = /*#__PURE__*/ import_react.forwardRef(
  function ToastClose(componentProps, forwardedRef) {
    const {
      render,
      className,
      style,
      disabled,
      nativeButton = true,
      ...elementProps
    } = componentProps
    const store = useToastProviderContext()
    const { toast, expanded } = useToastRootContext()
    const [hasFocus, setHasFocus] = import_react.useState(false)
    const { getButtonProps, buttonRef } = useButton({
      disabled,
      native: nativeButton,
    })
    const state = { type: toast.type }
    return useRenderElement("button", componentProps, {
      ref: [forwardedRef, buttonRef],
      state,
      props: [
        {
          "aria-hidden": !expanded && !hasFocus,
          "onClick"() {
            store.closeToast(toast.id)
          },
          "onFocus"() {
            setHasFocus(true)
          },
          "onBlur"() {
            setHasFocus(false)
          },
        },
        elementProps,
        getButtonProps,
      ],
    })
  },
)
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/toast/action/ToastAction.mjs
/**
 * Performs an action when clicked.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Toast](https://base-ui.com/react/components/toast)
 */
const ToastAction$1 = /*#__PURE__*/ import_react.forwardRef(
  function ToastAction(componentProps, forwardedRef) {
    const {
      render,
      className,
      style,
      disabled,
      nativeButton = true,
      ...elementProps
    } = componentProps
    const { toast } = useToastRootContext()
    const computedChildren = toast.actionProps?.children ?? elementProps.children
    const { getButtonProps, buttonRef } = useButton({
      disabled,
      native: nativeButton,
    })
    const state = { type: toast.type }
    const element = useRenderElement("button", componentProps, {
      ref: [forwardedRef, buttonRef],
      state,
      props: [elementProps, toast.actionProps, getButtonProps, { children: computedChildren }],
    })
    return hasRenderableChildren(element) ? element : null
  },
)
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/internals/reason-parts.mjs
const none = "none"
const triggerPress = "trigger-press"
const triggerHover = "trigger-hover"
const outsidePress = "outside-press"
const itemPress = "item-press"
const closePress = "close-press"
const focusOut = "focus-out"
const escapeKey = "escape-key"
const closeWatcher = "close-watcher"
const listNavigation = "list-navigation"
const cancelOpen = "cancel-open"
const disabled = "disabled"
const missing = "missing"
const initial = "initial"
const imperativeAction = "imperative-action"
const swipe = "swipe"
const windowResize = "window-resize"
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/internals/createBaseUIEventDetails.mjs
/**
 * Maps a change `reason` string to the corresponding native event type.
 */
/**
 * Details of custom change events emitted by Base UI components.
 */
/**
 * Details of custom generic events emitted by Base UI components.
 */
/**
 * Creates a Base UI event details object with the given reason and utilities
 * for preventing Base UI's internal event handling.
 */
function createChangeEventDetails(reason, event, trigger, customProperties) {
  let canceled = false
  let allowPropagation = false
  const custom = customProperties ?? EMPTY_OBJECT
  return {
    reason,
    event: event ?? new Event("base-ui"),
    cancel() {
      canceled = true
    },
    allowPropagation() {
      allowPropagation = true
    },
    get isCanceled() {
      return canceled
    },
    get isPropagationAllowed() {
      return allowPropagation
    },
    trigger,
    ...custom,
  }
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/floating-ui-react/utils/createAttribute.mjs
function createAttribute(name) {
  return `data-base-ui-${name}`
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/floating-ui-react/components/FloatingPortal.mjs
const PortalContext = /*#__PURE__*/ import_react.createContext(null)
const usePortalContext = () => import_react.useContext(PortalContext)
const attr = createAttribute("portal")
function useFloatingPortalNode(props = {}) {
  const { ref, container: containerProp, componentProps = EMPTY_OBJECT, elementProps } = props
  const uniqueId = useId()
  const parentPortalNode = usePortalContext()?.portalNode
  const [containerElement, setContainerElement] = import_react.useState(null)
  const [portalNode, setPortalNode] = import_react.useState(null)
  const setPortalNodeRef = useStableCallback((node) => {
    if (node !== null) setPortalNode(node)
  })
  const containerRef = import_react.useRef(null)
  useIsoLayoutEffect(() => {
    if (containerProp === null) {
      if (containerRef.current) {
        containerRef.current = null
        setPortalNode(null)
        setContainerElement(null)
      }
      return
    }
    const resolvedContainer =
      (containerProp && (isNode(containerProp) ? containerProp : containerProp.current)) ??
      parentPortalNode ??
      document.body
    if (resolvedContainer == null) {
      if (containerRef.current) {
        containerRef.current = null
        setPortalNode(null)
        setContainerElement(null)
      }
      return
    }
    if (containerRef.current !== resolvedContainer) {
      containerRef.current = resolvedContainer
      setPortalNode(null)
      setContainerElement(resolvedContainer)
    }
  }, [containerProp, parentPortalNode])
  const portalElement = useRenderElement("div", componentProps, {
    ref: [ref, setPortalNodeRef],
    props: [
      {
        id: uniqueId,
        [attr]: "",
      },
      elementProps,
    ],
  })
  const portalSubtree =
    containerElement && portalElement
      ? /*#__PURE__*/ import_react_dom.createPortal(portalElement, containerElement)
      : null
  return {
    node: portalNode,
    nodeId: /*#__PURE__*/ import_react.isValidElement(portalElement)
      ? portalElement.props.id
      : void 0,
    subtree: portalSubtree,
  }
}
/**
 * Portals the floating element into a given container element — by default,
 * outside of the app root and into the body.
 * This is necessary to ensure the floating element can appear outside any
 * potential parent containers that cause clipping (such as `overflow: hidden`),
 * while retaining its location in the React tree.
 * @see https://floating-ui.com/docs/FloatingPortal
 * @internal
 */
const FloatingPortal = /*#__PURE__*/ import_react.forwardRef(
  function FloatingPortal(componentProps, forwardedRef) {
    const { render, className, style, children, container, ...elementProps } = componentProps
    const {
      node: portalNode,
      nodeId: portalNodeId,
      subtree: portalSubtree,
    } = useFloatingPortalNode({
      container,
      ref: forwardedRef,
      componentProps,
      elementProps,
    })
    const beforeOutsideRef = import_react.useRef(null)
    const afterOutsideRef = import_react.useRef(null)
    const beforeInsideRef = import_react.useRef(null)
    const afterInsideRef = import_react.useRef(null)
    const [focusManagerState, setFocusManagerState] = import_react.useState(null)
    const focusInsideDisabledRef = import_react.useRef(false)
    const modal = focusManagerState?.modal
    const open = focusManagerState?.open
    const shouldRenderGuards =
      !!focusManagerState && !focusManagerState.modal && focusManagerState.open && !!portalNode
    import_react.useEffect(() => {
      if (!portalNode || modal) return
      function onFocus(event) {
        if (portalNode && event.relatedTarget && isOutsideEvent(event)) {
          if (event.type === "focusin") {
            if (focusInsideDisabledRef.current) {
              enableFocusInside(portalNode)
              focusInsideDisabledRef.current = false
            }
          } else {
            disableFocusInside(portalNode)
            focusInsideDisabledRef.current = true
          }
        }
      }
      return mergeCleanups(
        addEventListener(portalNode, "focusin", onFocus, true),
        addEventListener(portalNode, "focusout", onFocus, true),
      )
    }, [portalNode, modal])
    useIsoLayoutEffect(() => {
      if (!portalNode || open !== true || !focusInsideDisabledRef.current) return
      enableFocusInside(portalNode)
      focusInsideDisabledRef.current = false
    }, [open, portalNode])
    const portalContextValue = import_react.useMemo(
      () => ({
        beforeOutsideRef,
        afterOutsideRef,
        beforeInsideRef,
        afterInsideRef,
        portalNode,
        setFocusManagerState,
      }),
      [portalNode],
    )
    return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_react.Fragment, {
      children: [
        portalSubtree,
        /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(PortalContext.Provider, {
          value: portalContextValue,
          children: [
            shouldRenderGuards &&
              portalNode &&
              /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FocusGuard, {
                "data-type": "outside",
                "ref": beforeOutsideRef,
                "onFocus": (event) => {
                  if (isOutsideEvent(event, portalNode)) beforeInsideRef.current?.focus()
                  else
                    getPreviousTabbable(
                      focusManagerState ? focusManagerState.domReference : null,
                    )?.focus()
                },
              }),
            shouldRenderGuards &&
              portalNode &&
              /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
                "aria-owns": portalNodeId,
                "style": ownerVisuallyHidden,
              }),
            portalNode && /*#__PURE__*/ import_react_dom.createPortal(children, portalNode),
            shouldRenderGuards &&
              portalNode &&
              /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FocusGuard, {
                "data-type": "outside",
                "ref": afterOutsideRef,
                "onFocus": (event) => {
                  if (isOutsideEvent(event, portalNode)) afterInsideRef.current?.focus()
                  else {
                    getNextTabbable(
                      focusManagerState ? focusManagerState.domReference : null,
                    )?.focus()
                    if (focusManagerState?.closeOnFocusOut)
                      focusManagerState?.onOpenChange(
                        false,
                        createChangeEventDetails("focus-out", event.nativeEvent),
                      )
                  }
                },
              }),
          ],
        }),
      ],
    })
  },
)
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/utils/FloatingPortalLite.mjs
/**
 * `FloatingPortal` includes tabbable logic handling for focus management.
 * For components that don't need tabbable logic, use `FloatingPortalLite`.
 * @internal
 */
const FloatingPortalLite = /*#__PURE__*/ import_react.forwardRef(
  function FloatingPortalLite(componentProps, forwardedRef) {
    const { children, container, className, render, style, ...elementProps } = componentProps
    const { node: portalNode, subtree: portalSubtree } = useFloatingPortalNode({
      container,
      ref: forwardedRef,
      componentProps,
      elementProps,
    })
    if (!portalSubtree && !portalNode) return null
    return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_react.Fragment, {
      children: [
        portalSubtree,
        portalNode && /*#__PURE__*/ import_react_dom.createPortal(children, portalNode),
      ],
    })
  },
)
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/toast/portal/ToastPortal.mjs
/**
 * A portal element that moves the viewport to a different part of the DOM.
 * By default, the portal element is appended to `<body>`.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Toast](https://base-ui.com/react/components/toast)
 */
const ToastPortal$1 = /*#__PURE__*/ import_react.forwardRef(
  function ToastPortal(props, forwardedRef) {
    return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FloatingPortalLite, {
      ref: forwardedRef,
      ...props,
    })
  },
)
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.2_@types_46200efdf1f5c806fc19b01530afd9e7/node_modules/@base-ui/utils/useValueAsRef.mjs
/**
 * Untracks the provided value by turning it into a ref to remove its reactivity.
 *
 * Used to access the passed value inside `React.useEffect` without causing the effect to re-run when the value changes.
 */
function useValueAsRef(value) {
  const latest = useRefWithInit(createLatestRef, value).current
  latest.next = value
  useIsoLayoutEffect(latest.effect)
  return latest
}
function createLatestRef(value) {
  const latest = {
    current: value,
    next: value,
    effect: () => {
      latest.current = latest.next
    },
  }
  return latest
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/floating-ui-react/hooks/useHoverShared.mjs
function resolveValue(value, pointerType) {
  if (pointerType != null && !isMouseLikePointerType(pointerType)) return 0
  if (typeof value === "function") return value()
  return value
}
function getDelay(value, prop, pointerType) {
  const result = resolveValue(value, pointerType)
  if (typeof result === "number") return result
  return result?.[prop]
}
function getRestMs(value) {
  if (typeof value === "function") return value()
  return value
}
function isClickLikeOpenEvent(openEventType, interactedInside) {
  return interactedInside || openEventType === "click" || openEventType === "mousedown"
}
function isHoverOpenEvent(openEventType) {
  return openEventType?.includes("mouse") && openEventType !== "mousedown"
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/floating-ui-react/utils/enqueueFocus.mjs
let rafId = 0
function enqueueFocus(el, options = {}) {
  const { preventScroll = false, sync = false, shouldFocus } = options
  cancelAnimationFrame(rafId)
  function exec() {
    if (shouldFocus && !shouldFocus()) return
    el?.focus({ preventScroll })
  }
  if (sync) {
    exec()
    return NOOP
  }
  const currentRafId = requestAnimationFrame(exec)
  rafId = currentRafId
  return () => {
    if (rafId === currentRafId) {
      cancelAnimationFrame(currentRafId)
      rafId = 0
    }
  }
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/floating-ui-react/utils/markOthers.mjs
const counters = {
  "inert": /* @__PURE__ */ new WeakMap(),
  "aria-hidden": /* @__PURE__ */ new WeakMap(),
}
const markerName = "data-base-ui-inert"
const uncontrolledElementsSets = {
  "inert": /* @__PURE__ */ new WeakSet(),
  "aria-hidden": /* @__PURE__ */ new WeakSet(),
}
let markerCounterMap = /* @__PURE__ */ new WeakMap()
let lockCount = 0
function getUncontrolledElementsSet(controlAttribute) {
  return uncontrolledElementsSets[controlAttribute]
}
function unwrapHost(node) {
  if (!node) return null
  return isShadowRoot(node) ? node.host : unwrapHost(node.parentNode)
}
const correctElements = (parent, targets) =>
  targets
    .map((target) => {
      if (parent.contains(target)) return target
      const correctedTarget = unwrapHost(target)
      if (parent.contains(correctedTarget)) return correctedTarget
      return null
    })
    .filter((x) => x != null)
const buildKeepSet = (targets) => {
  const keep = /* @__PURE__ */ new Set()
  targets.forEach((target) => {
    let node = target
    while (node && !keep.has(node)) {
      keep.add(node)
      node = node.parentNode
    }
  })
  return keep
}
const collectOutsideElements = (root, keepElements, stopElements) => {
  const outside = []
  const walk = (parent) => {
    if (!parent || stopElements.has(parent)) return
    Array.from(parent.children).forEach((node) => {
      if (getNodeName(node) === "script") return
      if (keepElements.has(node)) walk(node)
      else outside.push(node)
    })
  }
  walk(root)
  return outside
}
function applyAttributeToOthers(
  uncorrectedAvoidElements,
  body,
  ariaHidden,
  inert,
  { mark = true },
) {
  let controlAttribute = null
  if (inert) controlAttribute = "inert"
  else if (ariaHidden) controlAttribute = "aria-hidden"
  let counterMap = null
  let uncontrolledElementsSet = null
  const avoidElements = correctElements(body, uncorrectedAvoidElements)
  const markerTargets = mark
    ? collectOutsideElements(body, buildKeepSet(avoidElements), new Set(avoidElements))
    : []
  const hiddenElements = []
  const markedElements = []
  if (controlAttribute) {
    const map = counters[controlAttribute]
    const currentUncontrolledElementsSet = getUncontrolledElementsSet(controlAttribute)
    uncontrolledElementsSet = currentUncontrolledElementsSet
    counterMap = map
    const ariaLiveElements = correctElements(body, [...body.querySelectorAll("[aria-live]")])
    const controlElements = avoidElements.concat(ariaLiveElements)
    collectOutsideElements(body, buildKeepSet(controlElements), new Set(controlElements)).forEach(
      (node) => {
        const attr = node.getAttribute(controlAttribute)
        const alreadyHidden = attr !== null && attr !== "false"
        const counterValue = (map.get(node) || 0) + 1
        map.set(node, counterValue)
        hiddenElements.push(node)
        if (counterValue === 1 && alreadyHidden) currentUncontrolledElementsSet.add(node)
        if (!alreadyHidden)
          node.setAttribute(controlAttribute, controlAttribute === "inert" ? "" : "true")
      },
    )
  }
  if (mark)
    markerTargets.forEach((node) => {
      const markerValue = (markerCounterMap.get(node) || 0) + 1
      markerCounterMap.set(node, markerValue)
      markedElements.push(node)
      if (markerValue === 1) node.setAttribute(markerName, "")
    })
  lockCount += 1
  return () => {
    if (counterMap)
      hiddenElements.forEach((element) => {
        const counterValue = (counterMap.get(element) || 0) - 1
        counterMap.set(element, counterValue)
        if (!counterValue) {
          if (!uncontrolledElementsSet?.has(element) && controlAttribute)
            element.removeAttribute(controlAttribute)
          uncontrolledElementsSet?.delete(element)
        }
      })
    if (mark)
      markedElements.forEach((element) => {
        const markerValue = (markerCounterMap.get(element) || 0) - 1
        markerCounterMap.set(element, markerValue)
        if (!markerValue) element.removeAttribute(markerName)
      })
    lockCount -= 1
    if (!lockCount) {
      counters.inert = /* @__PURE__ */ new WeakMap()
      counters["aria-hidden"] = /* @__PURE__ */ new WeakMap()
      uncontrolledElementsSets.inert = /* @__PURE__ */ new WeakSet()
      uncontrolledElementsSets["aria-hidden"] = /* @__PURE__ */ new WeakSet()
      markerCounterMap = /* @__PURE__ */ new WeakMap()
    }
  }
}
function markOthers(avoidElements, options = {}) {
  const { ariaHidden = false, inert = false, mark = true } = options
  const body = ownerDocument(avoidElements[0]).body
  return applyAttributeToOthers(avoidElements, body, ariaHidden, inert, { mark })
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/floating-ui-react/utils/createEventEmitter.mjs
function createEventEmitter() {
  const map = /* @__PURE__ */ new Map()
  return {
    emit(event, data) {
      map.get(event)?.forEach((listener) => listener(data))
    },
    on(event, listener) {
      if (!map.has(event)) map.set(event, /* @__PURE__ */ new Set())
      map.get(event).add(listener)
    },
    off(event, listener) {
      map.get(event)?.delete(listener)
    },
  }
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/floating-ui-react/components/FloatingTreeStore.mjs
/**
 * Stores and manages floating elements in a tree structure.
 * This is a backing store for the `FloatingTree` component.
 */
const FloatingTreeStore = class {
  nodesRef = { current: [] }
  events = createEventEmitter()
  addNode(node) {
    this.nodesRef.current.push(node)
  }
  removeNode(node) {
    const index = this.nodesRef.current.findIndex((n) => n === node)
    if (index !== -1) this.nodesRef.current.splice(index, 1)
  }
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/floating-ui-react/components/FloatingTree.mjs
const FloatingNodeContext = /*#__PURE__*/ import_react.createContext(null)
const FloatingTreeContext = /*#__PURE__*/ import_react.createContext(null)
const useFloatingParentNodeId = () => import_react.useContext(FloatingNodeContext)?.id || null
/**
 * Returns the nearest floating tree context, if available.
 */
const useFloatingTree = (externalTree) => {
  const contextTree = import_react.useContext(FloatingTreeContext)
  return externalTree ?? contextTree
}
/**
 * Registers a node into the `FloatingTree`, returning its id.
 * @see https://floating-ui.com/docs/FloatingTree
 */
function useFloatingNodeId(externalTree) {
  const id = useId()
  const tree = useFloatingTree(externalTree)
  const parentId = useFloatingParentNodeId()
  useIsoLayoutEffect(() => {
    if (!id) return
    const node = {
      id,
      parentId,
    }
    tree?.addNode(node)
    return () => {
      tree?.removeNode(node)
    }
  }, [tree, id, parentId])
  return id
}
/**
 * Provides parent node context for nested floating elements.
 * @see https://floating-ui.com/docs/FloatingTree
 * @internal
 */
function FloatingNode(props) {
  const { children, id } = props
  const parentId = useFloatingParentNodeId()
  return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FloatingNodeContext.Provider, {
    value: import_react.useMemo(
      () => ({
        id,
        parentId,
      }),
      [id, parentId],
    ),
    children,
  })
}
/**
 * Provides context for nested floating elements when they are not children of
 * each other on the DOM.
 * This is not necessary in all cases, except when there must be explicit communication between parent and child floating elements. It is necessary for:
 * - The `bubbles` option in the `useDismiss()` Hook
 * - Nested virtual list navigation
 * - Nested floating elements that each open on hover
 * - Custom communication between parent and child floating elements
 * @see https://floating-ui.com/docs/FloatingTree
 * @internal
 */
function FloatingTree(props) {
  const { children, externalTree } = props
  const tree = useRefWithInit(() => externalTree ?? new FloatingTreeStore()).current
  return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FloatingTreeContext.Provider, {
    value: tree,
    children,
  })
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/floating-ui-react/components/FloatingFocusManager.mjs
function getEventType(event, lastInteractionType) {
  const win = getWindow(getTarget(event))
  if (event instanceof win.KeyboardEvent) return "keyboard"
  if (event instanceof win.FocusEvent) return lastInteractionType || "keyboard"
  if ("pointerType" in event) return event.pointerType || "keyboard"
  if ("touches" in event) return "touch"
  if (event instanceof win.MouseEvent)
    return lastInteractionType || (event.detail === 0 ? "keyboard" : "mouse")
  return ""
}
const LIST_LIMIT = 20
let previouslyFocusedElements = []
function clearDisconnectedPreviouslyFocusedElements() {
  previouslyFocusedElements = previouslyFocusedElements.filter((entry) => {
    return entry.deref()?.isConnected
  })
}
function addPreviouslyFocusedElement(element) {
  clearDisconnectedPreviouslyFocusedElements()
  if (element && getNodeName(element) !== "body") {
    previouslyFocusedElements.push(new WeakRef(element))
    if (previouslyFocusedElements.length > LIST_LIMIT)
      previouslyFocusedElements = previouslyFocusedElements.slice(-20)
  }
}
function getPreviouslyFocusedElement() {
  clearDisconnectedPreviouslyFocusedElements()
  return previouslyFocusedElements.at(-1)?.deref()
}
function getFirstTabbableElement(container) {
  if (!container) return null
  if (isTabbable(container)) return container
  return tabbable(container)[0] || container
}
function handleTabIndex(floatingFocusElement) {
  if (
    floatingFocusElement.hasAttribute("tabindex") &&
    !floatingFocusElement.hasAttribute("data-tabindex")
  )
    return
  if (!floatingFocusElement.getAttribute("role")?.includes("dialog")) return
  const tabbableContent = focusable(floatingFocusElement).filter((element) => {
    const dataTabIndex = element.getAttribute("data-tabindex") || ""
    return (
      isTabbable(element) ||
      (element.hasAttribute("data-tabindex") && !dataTabIndex.startsWith("-"))
    )
  })
  const tabIndex = floatingFocusElement.getAttribute("tabindex")
  if (tabbableContent.length === 0) {
    if (tabIndex !== "0") {
      floatingFocusElement.setAttribute("tabindex", "0")
      floatingFocusElement.setAttribute("data-tabindex", "0")
    }
  } else if (
    tabIndex !== "-1" ||
    (floatingFocusElement.hasAttribute("data-tabindex") &&
      floatingFocusElement.getAttribute("data-tabindex") !== "-1")
  ) {
    floatingFocusElement.setAttribute("tabindex", "-1")
    floatingFocusElement.setAttribute("data-tabindex", "-1")
  }
}
/**
 * Provides focus management for the floating element.
 * @see https://floating-ui.com/docs/FloatingFocusManager
 * @internal
 */
function FloatingFocusManager(props) {
  const {
    context,
    children,
    disabled = false,
    initialFocus = true,
    returnFocus = true,
    restoreFocus = false,
    modal = true,
    closeOnFocusOut = true,
    openInteractionType = "",
    nextFocusableElement,
    previousFocusableElement,
    beforeContentFocusGuardRef,
    externalTree,
    getInsideElements,
  } = props
  const store = "rootStore" in context ? context.rootStore : context
  const open = store.useState("open")
  const domReference = store.useState("domReferenceElement")
  const floating = store.useState("floatingElement")
  const { events, dataRef } = store.context
  const getNodeId = useStableCallback(() => dataRef.current.floatingContext?.nodeId)
  const ignoreInitialFocus = initialFocus === false
  const isUntrappedTypeableCombobox = isTypeableCombobox(domReference) && ignoreInitialFocus
  const initialFocusRef = useValueAsRef(initialFocus)
  const returnFocusRef = useValueAsRef(returnFocus)
  const openInteractionTypeRef = useValueAsRef(openInteractionType)
  const openRef = useValueAsRef(open)
  const tree = useFloatingTree(externalTree)
  const portalContext = usePortalContext()
  const preventReturnFocusRef = import_react.useRef(false)
  const isPointerDownRef = import_react.useRef(false)
  const pointerDownOutsideRef = import_react.useRef(false)
  const lastFocusedTabbableRef = import_react.useRef(null)
  const closeTypeRef = import_react.useRef("")
  const lastInteractionTypeRef = import_react.useRef("")
  const beforeGuardRef = import_react.useRef(null)
  const afterGuardRef = import_react.useRef(null)
  const mergedBeforeGuardRef = useMergedRefs(
    beforeGuardRef,
    beforeContentFocusGuardRef,
    portalContext?.beforeInsideRef,
  )
  const mergedAfterGuardRef = useMergedRefs(afterGuardRef, portalContext?.afterInsideRef)
  const blurTimeout = useTimeout()
  const pointerDownTimeout = useTimeout()
  const restoreFocusFrame = useAnimationFrame()
  const isInsidePortal = portalContext != null
  const floatingFocusElement = getFloatingFocusElement(floating)
  const getTabbableContent = useStableCallback((container = floatingFocusElement) => {
    return container ? tabbable(container) : []
  })
  const getResolvedInsideElements = useStableCallback(
    () => getInsideElements?.().filter((element) => element != null) ?? [],
  )
  import_react.useEffect(() => {
    if (disabled || !modal) return
    function onKeyDown(event) {
      if (event.key === "Tab") {
        if (
          contains(floatingFocusElement, activeElement(ownerDocument(floatingFocusElement))) &&
          getTabbableContent().length === 0 &&
          !isUntrappedTypeableCombobox
        )
          stopEvent(event)
      }
    }
    return addEventListener(ownerDocument(floatingFocusElement), "keydown", onKeyDown)
  }, [disabled, floatingFocusElement, modal, isUntrappedTypeableCombobox, getTabbableContent])
  import_react.useEffect(() => {
    if (disabled || !open) return
    const doc = ownerDocument(floatingFocusElement)
    function clearPointerDownOutside() {
      pointerDownOutsideRef.current = false
    }
    function onPointerDown(event) {
      const target = getTarget(event)
      const insideElements = getResolvedInsideElements()
      const pointerTargetInside =
        contains(floating, target) ||
        contains(domReference, target) ||
        contains(portalContext?.portalNode, target) ||
        insideElements.some((element) => element === target || contains(element, target))
      pointerDownOutsideRef.current = !pointerTargetInside
      lastInteractionTypeRef.current = event.pointerType || "keyboard"
      if (target?.closest(`[data-base-ui-click-trigger]`)) {
        isPointerDownRef.current = true
        pointerDownTimeout.start(0, () => {
          isPointerDownRef.current = false
        })
      }
    }
    function onKeyDown() {
      lastInteractionTypeRef.current = "keyboard"
    }
    return mergeCleanups(
      addEventListener(doc, "pointerdown", onPointerDown, true),
      addEventListener(doc, "pointerup", clearPointerDownOutside, true),
      addEventListener(doc, "pointercancel", clearPointerDownOutside, true),
      addEventListener(doc, "keydown", onKeyDown, true),
      clearPointerDownOutside,
    )
  }, [
    disabled,
    floating,
    domReference,
    floatingFocusElement,
    open,
    portalContext,
    pointerDownTimeout,
    getResolvedInsideElements,
  ])
  import_react.useEffect(() => {
    if (disabled || !closeOnFocusOut) return
    const doc = ownerDocument(floatingFocusElement)
    function handlePointerDown() {
      isPointerDownRef.current = true
      pointerDownTimeout.start(0, () => {
        isPointerDownRef.current = false
      })
    }
    function handleFocusIn(event) {
      const target = getTarget(event)
      if (isTabbable(target)) lastFocusedTabbableRef.current = target
    }
    function handleFocusOutside(event) {
      const relatedTarget = event.relatedTarget
      const currentTarget = event.currentTarget
      const target = getTarget(event)
      if (modal && relatedTarget == null && target != null && contains(floating, target))
        addPreviouslyFocusedElement(target)
      queueMicrotask(() => {
        const nodeId = getNodeId()
        const triggers = store.context.triggerElements
        const insideElements = getResolvedInsideElements()
        const isRelatedFocusGuard =
          relatedTarget?.hasAttribute(createAttribute("focus-guard")) &&
          [
            beforeGuardRef.current,
            afterGuardRef.current,
            portalContext?.beforeInsideRef.current,
            portalContext?.afterInsideRef.current,
            portalContext?.beforeOutsideRef.current,
            portalContext?.afterOutsideRef.current,
            resolveRef(previousFocusableElement),
            resolveRef(nextFocusableElement),
          ].includes(relatedTarget)
        const movedToUnrelatedNode = !(
          contains(domReference, relatedTarget) ||
          contains(floating, relatedTarget) ||
          contains(relatedTarget, floating) ||
          contains(portalContext?.portalNode, relatedTarget) ||
          insideElements.some(
            (element) => element === relatedTarget || contains(element, relatedTarget),
          ) ||
          triggers.hasMatchingElement((trigger) => contains(trigger, relatedTarget)) ||
          isRelatedFocusGuard ||
          (tree &&
            (getNodeChildren(tree.nodesRef.current, nodeId).find(
              (node) =>
                contains(node.context?.elements.floating, relatedTarget) ||
                contains(node.context?.elements.domReference, relatedTarget),
            ) ||
              getNodeAncestors(tree.nodesRef.current, nodeId).find(
                (node) =>
                  [
                    node.context?.elements.floating,
                    getFloatingFocusElement(node.context?.elements.floating),
                  ].includes(relatedTarget) ||
                  node.context?.elements.domReference === relatedTarget,
              )))
        )
        if (currentTarget === domReference && floatingFocusElement)
          handleTabIndex(floatingFocusElement)
        if (
          restoreFocus &&
          currentTarget !== domReference &&
          !isElementVisible(target) &&
          activeElement(doc) === doc.body
        ) {
          if (isHTMLElement(floatingFocusElement)) {
            floatingFocusElement.focus()
            if (restoreFocus === "popup") {
              restoreFocusFrame.request(() => {
                floatingFocusElement.focus()
              })
              return
            }
          }
          const tabbableContent = getTabbableContent()
          const prevTabbable = lastFocusedTabbableRef.current
          const nodeToFocus =
            (prevTabbable && tabbableContent.includes(prevTabbable) ? prevTabbable : null) ||
            tabbableContent.at(-1) ||
            floatingFocusElement
          if (isHTMLElement(nodeToFocus)) nodeToFocus.focus()
        }
        if (dataRef.current.insideReactTree) {
          dataRef.current.insideReactTree = false
          return
        }
        if (
          (isUntrappedTypeableCombobox ? true : !modal) &&
          relatedTarget &&
          movedToUnrelatedNode &&
          !isPointerDownRef.current &&
          (isUntrappedTypeableCombobox || relatedTarget !== getPreviouslyFocusedElement())
        ) {
          preventReturnFocusRef.current = true
          store.setOpen(false, createChangeEventDetails(focusOut, event))
        }
      })
    }
    function markInsideReactTree() {
      if (pointerDownOutsideRef.current) return
      dataRef.current.insideReactTree = true
      blurTimeout.start(0, () => {
        dataRef.current.insideReactTree = false
      })
    }
    const domReferenceElement = isHTMLElement(domReference) ? domReference : null
    if (!floating && !domReferenceElement) return
    return mergeCleanups(
      domReferenceElement && addEventListener(domReferenceElement, "focusout", handleFocusOutside),
      domReferenceElement &&
        addEventListener(domReferenceElement, "pointerdown", handlePointerDown),
      floating && addEventListener(floating, "focusin", handleFocusIn),
      floating && addEventListener(floating, "focusout", handleFocusOutside),
      floating &&
        portalContext &&
        addEventListener(floating, "focusout", markInsideReactTree, true),
    )
  }, [
    disabled,
    domReference,
    floating,
    floatingFocusElement,
    modal,
    tree,
    portalContext,
    store,
    closeOnFocusOut,
    restoreFocus,
    getTabbableContent,
    isUntrappedTypeableCombobox,
    getNodeId,
    dataRef,
    blurTimeout,
    pointerDownTimeout,
    restoreFocusFrame,
    nextFocusableElement,
    previousFocusableElement,
    getResolvedInsideElements,
  ])
  import_react.useEffect(() => {
    if (disabled || !floating || !open) return
    const portalNodes = [
      ...(portalContext?.portalNode?.querySelectorAll(`[${createAttribute("portal")}]`) || []),
    ]
    const rootAncestorComboboxDomReference = (
      tree ? getNodeAncestors(tree.nodesRef.current, getNodeId()) : []
    ).find((node) => isTypeableCombobox(node.context?.elements.domReference || null))?.context
      ?.elements.domReference
    const ariaHiddenCleanup = markOthers(
      [
        ...[
          floating,
          ...portalNodes,
          beforeGuardRef.current,
          afterGuardRef.current,
          portalContext?.beforeOutsideRef.current,
          portalContext?.afterOutsideRef.current,
          ...getResolvedInsideElements(),
        ],
        rootAncestorComboboxDomReference,
        resolveRef(previousFocusableElement),
        resolveRef(nextFocusableElement),
        isUntrappedTypeableCombobox ? domReference : null,
      ].filter((x) => x != null),
      {
        ariaHidden: modal || isUntrappedTypeableCombobox,
        mark: false,
      },
    )
    const markerCleanup = markOthers([floating, ...portalNodes].filter((x) => x != null))
    return () => {
      markerCleanup()
      ariaHiddenCleanup()
    }
  }, [
    open,
    disabled,
    domReference,
    floating,
    modal,
    portalContext,
    isUntrappedTypeableCombobox,
    tree,
    getNodeId,
    nextFocusableElement,
    previousFocusableElement,
    getResolvedInsideElements,
  ])
  useIsoLayoutEffect(() => {
    if (!open || disabled || !isHTMLElement(floatingFocusElement)) return
    closeTypeRef.current = ""
    lastInteractionTypeRef.current = ""
    const doc = ownerDocument(floatingFocusElement)
    const previouslyFocusedElement = activeElement(doc)
    queueMicrotask(() => {
      const initialFocusValueOrFn = initialFocusRef.current
      const resolvedInitialFocus =
        typeof initialFocusValueOrFn === "function"
          ? initialFocusValueOrFn(openInteractionTypeRef.current || "")
          : initialFocusValueOrFn
      if (resolvedInitialFocus === void 0 || resolvedInitialFocus === false) return
      if (contains(floatingFocusElement, previouslyFocusedElement)) return
      let focusableElements = null
      const getDefaultFocusElement = () => {
        if (focusableElements == null) focusableElements = getTabbableContent(floatingFocusElement)
        return focusableElements[0] || floatingFocusElement
      }
      let elToFocus
      if (resolvedInitialFocus === true || resolvedInitialFocus === null)
        elToFocus = getDefaultFocusElement()
      else elToFocus = resolveRef(resolvedInitialFocus)
      elToFocus = elToFocus || getDefaultFocusElement()
      const hadFocusInside = contains(floatingFocusElement, activeElement(doc))
      enqueueFocus(elToFocus, {
        preventScroll: elToFocus === floatingFocusElement,
        shouldFocus() {
          if (!openRef.current) return false
          if (hadFocusInside) return true
          const currentActiveElement = activeElement(doc)
          return !(
            currentActiveElement !== elToFocus &&
            contains(floatingFocusElement, currentActiveElement)
          )
        },
      })
    })
  }, [
    disabled,
    open,
    floatingFocusElement,
    getTabbableContent,
    initialFocusRef,
    openInteractionTypeRef,
    openRef,
  ])
  useIsoLayoutEffect(() => {
    if (disabled || !floatingFocusElement) return
    const doc = ownerDocument(floatingFocusElement)
    const elementFocusedBeforeOpen = activeElement(doc)
    const preferPreviousFocus = openInteractionTypeRef.current == null
    addPreviouslyFocusedElement(elementFocusedBeforeOpen)
    function onOpenChangeLocal(details) {
      if (!details.open)
        closeTypeRef.current = getEventType(details.nativeEvent, lastInteractionTypeRef.current)
      if (details.reason === "trigger-hover" && details.nativeEvent.type === "mouseleave")
        preventReturnFocusRef.current = true
      if (details.reason !== "outside-press") return
      if (details.nested) preventReturnFocusRef.current = false
      else if (isVirtualClick(details.nativeEvent) || isVirtualPointerEvent(details.nativeEvent))
        preventReturnFocusRef.current = false
      else {
        let isPreventScrollSupported = false
        ownerDocument(floatingFocusElement)
          .createElement("div")
          .focus({
            get preventScroll() {
              isPreventScrollSupported = true
              return false
            },
          })
        if (isPreventScrollSupported) preventReturnFocusRef.current = false
        else preventReturnFocusRef.current = true
      }
    }
    events.on("openchange", onOpenChangeLocal)
    function getReturnElement(closeType) {
      const returnFocusValueOrFn = returnFocusRef.current
      let resolvedReturnFocusValue =
        typeof returnFocusValueOrFn === "function"
          ? returnFocusValueOrFn(closeType)
          : returnFocusValueOrFn
      if (resolvedReturnFocusValue === void 0 || resolvedReturnFocusValue === false) return null
      if (resolvedReturnFocusValue === null) resolvedReturnFocusValue = true
      const referenceReturnElement = domReference?.isConnected ? domReference : null
      const previousReturnElement =
        elementFocusedBeforeOpen?.isConnected && getNodeName(elementFocusedBeforeOpen) !== "body"
          ? elementFocusedBeforeOpen
          : null
      let defaultReturnElement = preferPreviousFocus
        ? previousReturnElement || referenceReturnElement
        : referenceReturnElement || previousReturnElement
      if (!defaultReturnElement) defaultReturnElement = getPreviouslyFocusedElement() || null
      if (typeof resolvedReturnFocusValue === "boolean") return defaultReturnElement
      return resolveRef(resolvedReturnFocusValue) || defaultReturnElement || null
    }
    return () => {
      events.off("openchange", onOpenChangeLocal)
      const activeEl = activeElement(doc)
      const insideElements = getResolvedInsideElements()
      const isFocusInsideFloatingTree =
        contains(floating, activeEl) ||
        insideElements.some((element) => element === activeEl || contains(element, activeEl)) ||
        (tree &&
          getNodeChildren(tree.nodesRef.current, getNodeId(), false).some((node) =>
            contains(node.context?.elements.floating, activeEl),
          ))
      const returnFocusValueOrFn = returnFocusRef.current
      const closeType = closeTypeRef.current
      const returnElement = getReturnElement(closeType)
      queueMicrotask(() => {
        const tabbableReturnElement = getFirstTabbableElement(returnElement)
        const hasExplicitReturnFocus = typeof returnFocusValueOrFn !== "boolean"
        if (
          returnFocusValueOrFn &&
          !preventReturnFocusRef.current &&
          isHTMLElement(tabbableReturnElement) &&
          (!hasExplicitReturnFocus && tabbableReturnElement !== activeEl && activeEl !== doc.body
            ? isFocusInsideFloatingTree
            : true)
        ) {
          const focusOptions = { preventScroll: true }
          if (closeType === "keyboard") focusOptions.focusVisible = true
          tabbableReturnElement.focus(focusOptions)
        }
        preventReturnFocusRef.current = false
      })
    }
  }, [
    disabled,
    floating,
    floatingFocusElement,
    returnFocusRef,
    openInteractionTypeRef,
    events,
    tree,
    domReference,
    getNodeId,
    getResolvedInsideElements,
  ])
  useIsoLayoutEffect(() => {
    if (!webkit || open || !floating) return
    const activeEl = activeElement(ownerDocument(floating))
    if (!isHTMLElement(activeEl) || !isTypeableElement(activeEl)) return
    if (contains(floating, activeEl)) activeEl.blur()
  }, [open, floating])
  useIsoLayoutEffect(() => {
    if (disabled || !portalContext) return
    portalContext.setFocusManagerState({
      modal,
      closeOnFocusOut,
      open,
      onOpenChange: store.setOpen,
      domReference,
    })
    return () => {
      portalContext.setFocusManagerState(null)
    }
  }, [disabled, portalContext, modal, open, store, closeOnFocusOut, domReference])
  useIsoLayoutEffect(() => {
    if (disabled || !floatingFocusElement) return
    handleTabIndex(floatingFocusElement)
    return () => {
      queueMicrotask(clearDisconnectedPreviouslyFocusedElements)
    }
  }, [disabled, floatingFocusElement])
  const shouldRenderGuards =
    !disabled && (modal ? !isUntrappedTypeableCombobox : true) && (isInsidePortal || modal)
  return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_react.Fragment, {
    children: [
      shouldRenderGuards &&
        /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FocusGuard, {
          "data-type": "inside",
          "ref": mergedBeforeGuardRef,
          "onFocus": (event) => {
            if (modal) {
              const els = getTabbableContent()
              enqueueFocus(els.at(-1))
            } else if (portalContext?.portalNode) {
              preventReturnFocusRef.current = false
              if (isOutsideEvent(event, portalContext.portalNode))
                getNextTabbable(domReference)?.focus()
              else resolveRef(previousFocusableElement ?? portalContext.beforeOutsideRef)?.focus()
            }
          },
        }),
      children,
      shouldRenderGuards &&
        /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FocusGuard, {
          "data-type": "inside",
          "ref": mergedAfterGuardRef,
          "onFocus": (event) => {
            if (modal) enqueueFocus(getTabbableContent()[0])
            else if (portalContext?.portalNode) {
              if (closeOnFocusOut) preventReturnFocusRef.current = true
              if (isOutsideEvent(event, portalContext.portalNode))
                getPreviousTabbable(domReference)?.focus()
              else resolveRef(nextFocusableElement ?? portalContext.afterOutsideRef)?.focus()
            }
          },
        }),
    ],
  })
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/floating-ui-react/hooks/useClick.mjs
/**
 * Opens or closes the floating element when clicking the reference element.
 * @see https://floating-ui.com/docs/useClick
 */
function useClick(context, props = {}) {
  const {
    enabled = true,
    event: eventOption = "click",
    toggle = true,
    ignoreMouse = false,
    stickIfOpen = true,
    touchOpenDelay = 0,
    reason = triggerPress,
  } = props
  const store = "rootStore" in context ? context.rootStore : context
  const dataRef = store.context.dataRef
  const pointerTypeRef = import_react.useRef(void 0)
  const frame = useAnimationFrame()
  const touchOpenTimeout = useTimeout()
  const reference = import_react.useMemo(() => {
    function setOpenWithTouchDelay(nextOpen, nativeEvent, target, pointerType) {
      const details = createChangeEventDetails(reason, nativeEvent, target)
      if (nextOpen && pointerType === "touch" && touchOpenDelay > 0)
        touchOpenTimeout.start(touchOpenDelay, () => {
          store.setOpen(true, details)
        })
      else store.setOpen(nextOpen, details)
    }
    function getNextOpen(open, currentTarget, isClickLikeOpenEvent) {
      const openEvent = dataRef.current.openEvent
      const hasClickedOnInactiveTrigger = store.select("domReferenceElement") !== currentTarget
      if (open && hasClickedOnInactiveTrigger) return true
      if (!open) return true
      if (!toggle) return true
      if (openEvent && stickIfOpen) return !isClickLikeOpenEvent(openEvent.type)
      return false
    }
    return {
      onPointerDown(event) {
        pointerTypeRef.current =
          isMouseLikePointerType(event.pointerType, true) &&
          isVirtualPointerEvent(event.nativeEvent)
            ? "virtual"
            : event.pointerType
      },
      onMouseDown(event) {
        const pointerType = pointerTypeRef.current
        const nativeEvent = event.nativeEvent
        const open = store.select("open")
        if (
          event.button !== 0 ||
          eventOption === "click" ||
          (isMouseLikePointerType(pointerType, true) && ignoreMouse)
        )
          return
        const nextOpen = getNextOpen(
          open,
          event.currentTarget,
          (openEventType) => openEventType === "click" || openEventType === "mousedown",
        )
        const target = getTarget(nativeEvent)
        if (isTypeableElement(target)) {
          setOpenWithTouchDelay(nextOpen, nativeEvent, target, pointerType)
          return
        }
        const eventCurrentTarget = event.currentTarget
        frame.request(() => {
          setOpenWithTouchDelay(nextOpen, nativeEvent, eventCurrentTarget, pointerType)
        })
      },
      onClick(event) {
        if (eventOption === "mousedown-only") return
        const pointerType = pointerTypeRef.current
        if (eventOption === "mousedown" && pointerType) {
          pointerTypeRef.current = void 0
          return
        }
        if (isMouseLikePointerType(pointerType, true) && ignoreMouse) return
        setOpenWithTouchDelay(
          getNextOpen(
            store.select("open"),
            event.currentTarget,
            (openEventType) =>
              openEventType === "click" ||
              openEventType === "mousedown" ||
              openEventType === "keydown" ||
              openEventType === "keyup",
          ),
          event.nativeEvent,
          event.currentTarget,
          pointerType,
        )
      },
      onKeyDown() {
        pointerTypeRef.current = void 0
      },
    }
  }, [
    dataRef,
    eventOption,
    ignoreMouse,
    reason,
    store,
    stickIfOpen,
    toggle,
    frame,
    touchOpenTimeout,
    touchOpenDelay,
  ])
  return import_react.useMemo(() => (enabled ? { reference } : EMPTY_OBJECT), [enabled, reference])
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/floating-ui-react/hooks/useDismiss.mjs
function alwaysFalse() {
  return false
}
function normalizeProp(normalizable) {
  return {
    escapeKey:
      typeof normalizable === "boolean" ? normalizable : (normalizable?.escapeKey ?? false),
    outsidePress:
      typeof normalizable === "boolean" ? normalizable : (normalizable?.outsidePress ?? true),
  }
}
/**
 * Closes the floating element when a dismissal is requested — by default, when
 * the user presses the `escape` key or outside of the floating element.
 * @see https://floating-ui.com/docs/useDismiss
 */
function useDismiss(context, props = {}) {
  const {
    enabled = true,
    escapeKey: escapeKey$1 = true,
    outsidePress: outsidePressProp = true,
    outsidePressEvent = "sloppy",
    referencePress = alwaysFalse,
    bubbles,
    externalTree,
  } = props
  const store = "rootStore" in context ? context.rootStore : context
  const open = store.useState("open")
  const floatingElement = store.useState("floatingElement")
  const { dataRef } = store.context
  const tree = useFloatingTree(externalTree)
  const outsidePressFn = useStableCallback(
    typeof outsidePressProp === "function" ? outsidePressProp : () => false,
  )
  const outsidePress$1 = typeof outsidePressProp === "function" ? outsidePressFn : outsidePressProp
  const outsidePressEnabled = outsidePress$1 !== false
  const getOutsidePressEventProp = useStableCallback(() => outsidePressEvent)
  const { escapeKey: escapeKeyBubbles, outsidePress: outsidePressBubbles } = normalizeProp(bubbles)
  const pressStartedInsideRef = import_react.useRef(false)
  const pressStartPreventedRef = import_react.useRef(false)
  const suppressNextOutsideClickRef = import_react.useRef(false)
  const isComposingRef = import_react.useRef(false)
  const currentPointerTypeRef = import_react.useRef("")
  const touchStateRef = import_react.useRef(null)
  const cancelDismissOnEndTimeout = useTimeout()
  const clearInsideReactTreeTimeout = useTimeout()
  const clearInsideReactTree = useStableCallback(() => {
    clearInsideReactTreeTimeout.clear()
    dataRef.current.insideReactTree = false
  })
  const hasBlockingChild = useStableCallback((bubbleKey) => {
    const nodeId = dataRef.current.floatingContext?.nodeId
    return (tree ? getNodeChildren(tree.nodesRef.current, nodeId) : []).some(
      (child) => child.context?.open && !child.context.dataRef.current[bubbleKey],
    )
  })
  const isEventWithinOwnElements = useStableCallback((event) => {
    return (
      isEventTargetWithin(event, store.select("floatingElement")) ||
      isEventTargetWithin(event, store.select("domReferenceElement"))
    )
  })
  const closeOnReferencePress = useStableCallback((event) => {
    if (!referencePress()) return
    store.setOpen(false, createChangeEventDetails(triggerPress, event.nativeEvent))
  })
  const closeOnEscapeKeyDown = useStableCallback((event) => {
    if (!open || !enabled || !escapeKey$1 || event.key !== "Escape") return
    if (isComposingRef.current) return
    if (!escapeKeyBubbles && hasBlockingChild("__escapeKeyBubbles")) return
    const eventDetails = createChangeEventDetails(
      escapeKey,
      isReactEvent(event) ? event.nativeEvent : event,
    )
    store.setOpen(false, eventDetails)
    if (!eventDetails.isCanceled) event.preventDefault()
    if (!escapeKeyBubbles && !eventDetails.isPropagationAllowed) event.stopPropagation()
  })
  const markInsideReactTree = useStableCallback(() => {
    dataRef.current.insideReactTree = true
    clearInsideReactTreeTimeout.start(0, clearInsideReactTree)
  })
  const markPressStartedInsideReactTree = useStableCallback((event) => {
    if (!open || !enabled || event.button !== 0) return
    const target = getTarget(event.nativeEvent)
    if (!contains(store.select("floatingElement"), target)) return
    if (!pressStartedInsideRef.current) {
      pressStartedInsideRef.current = true
      pressStartPreventedRef.current = false
    }
  })
  const markInsidePressStartPrevented = useStableCallback((event) => {
    if (!open || !enabled) return
    if (!(event.defaultPrevented || event.nativeEvent.defaultPrevented)) return
    if (pressStartedInsideRef.current) pressStartPreventedRef.current = true
  })
  import_react.useEffect(() => {
    if (!open || !enabled) return clearInsideReactTree
    dataRef.current.__escapeKeyBubbles = escapeKeyBubbles
    dataRef.current.__outsidePressBubbles = outsidePressBubbles
    const compositionTimeout = new Timeout()
    const preventedPressSuppressionTimeout = new Timeout()
    function handleCompositionStart() {
      compositionTimeout.clear()
      isComposingRef.current = true
    }
    function handleCompositionEnd() {
      compositionTimeout.start(webkit ? 5 : 0, () => {
        isComposingRef.current = false
      })
    }
    function suppressImmediateOutsideClickAfterPreventedStart() {
      suppressNextOutsideClickRef.current = true
      preventedPressSuppressionTimeout.start(0, () => {
        suppressNextOutsideClickRef.current = false
      })
    }
    function resetPressStartState() {
      pressStartedInsideRef.current = false
      pressStartPreventedRef.current = false
    }
    function getOutsidePressEvent() {
      const type = currentPointerTypeRef.current
      const computedType = type === "pen" || !type ? "mouse" : type
      const outsidePressEventValue = getOutsidePressEventProp()
      const resolved =
        typeof outsidePressEventValue === "function"
          ? outsidePressEventValue()
          : outsidePressEventValue
      if (typeof resolved === "string") return resolved
      return resolved[computedType]
    }
    function shouldIgnoreEvent(event) {
      const computedOutsidePressEvent = getOutsidePressEvent()
      return (
        (computedOutsidePressEvent === "intentional" && event.type !== "click") ||
        (computedOutsidePressEvent === "sloppy" && event.type === "click")
      )
    }
    function isEventWithinFloatingTree(event) {
      const nodeId = dataRef.current.floatingContext?.nodeId
      const targetIsInsideChildren =
        tree &&
        getNodeChildren(tree.nodesRef.current, nodeId).some((node) =>
          isEventTargetWithin(event, node.context?.elements.floating),
        )
      return isEventWithinOwnElements(event) || targetIsInsideChildren
    }
    function closeOnPressOutside(event) {
      if (shouldIgnoreEvent(event)) {
        if (event.type !== "click" && !isEventWithinOwnElements(event)) {
          preventedPressSuppressionTimeout.clear()
          suppressNextOutsideClickRef.current = false
        }
        clearInsideReactTree()
        return
      }
      if (dataRef.current.insideReactTree) {
        clearInsideReactTree()
        return
      }
      const target = getTarget(event)
      const inertSelector = `[${createAttribute("inert")}]`
      const targetRoot = isElement(target) ? target.getRootNode() : null
      const markers = [
        ...(isShadowRoot(targetRoot)
          ? targetRoot
          : ownerDocument(store.select("floatingElement"))
        ).querySelectorAll(inertSelector),
      ]
      const triggers = store.context.triggerElements
      if (
        target &&
        (triggers.hasElement(target) ||
          triggers.hasMatchingElement((trigger) => contains(trigger, target)))
      )
        return
      let targetRootAncestor = isElement(target) ? target : null
      while (targetRootAncestor && !isLastTraversableNode(targetRootAncestor)) {
        const nextParent = getParentNode(targetRootAncestor)
        if (isLastTraversableNode(nextParent) || !isElement(nextParent)) break
        targetRootAncestor = nextParent
      }
      if (
        markers.length > 0 &&
        isElement(target) &&
        !isRootElement(target) &&
        !contains(target, store.select("floatingElement")) &&
        markers.every((marker) => !contains(targetRootAncestor, marker))
      )
        return
      if (isHTMLElement(target) && !("touches" in event)) {
        const lastTraversableNode = isLastTraversableNode(target)
        const style = getComputedStyle$1(target)
        const scrollRe = /auto|scroll/
        const isScrollableX = lastTraversableNode || scrollRe.test(style.overflowX)
        const isScrollableY = lastTraversableNode || scrollRe.test(style.overflowY)
        const canScrollX =
          isScrollableX && target.clientWidth > 0 && target.scrollWidth > target.clientWidth
        const canScrollY =
          isScrollableY && target.clientHeight > 0 && target.scrollHeight > target.clientHeight
        const isRTL = style.direction === "rtl"
        const pressedVerticalScrollbar =
          canScrollY &&
          (isRTL
            ? event.offsetX <= target.offsetWidth - target.clientWidth
            : event.offsetX > target.clientWidth)
        const pressedHorizontalScrollbar = canScrollX && event.offsetY > target.clientHeight
        if (pressedVerticalScrollbar || pressedHorizontalScrollbar) return
      }
      if (isEventWithinFloatingTree(event)) return
      if (getOutsidePressEvent() === "intentional" && suppressNextOutsideClickRef.current) {
        preventedPressSuppressionTimeout.clear()
        suppressNextOutsideClickRef.current = false
        return
      }
      if (typeof outsidePress$1 === "function" && !outsidePress$1(event)) return
      if (hasBlockingChild("__outsidePressBubbles")) return
      store.setOpen(false, createChangeEventDetails(outsidePress, event))
      clearInsideReactTree()
    }
    function handlePointerDown(event) {
      if (
        getOutsidePressEvent() !== "sloppy" ||
        event.pointerType === "touch" ||
        !store.select("open") ||
        !enabled ||
        isEventWithinOwnElements(event)
      )
        return
      closeOnPressOutside(event)
    }
    function handleTouchStart(event) {
      if (
        getOutsidePressEvent() !== "sloppy" ||
        !store.select("open") ||
        !enabled ||
        isEventWithinOwnElements(event)
      )
        return
      const touch = event.touches[0]
      if (touch) {
        touchStateRef.current = {
          startTime: Date.now(),
          startX: touch.clientX,
          startY: touch.clientY,
          dismissOnTouchEnd: false,
          dismissOnMouseDown: true,
        }
        cancelDismissOnEndTimeout.start(1e3, () => {
          if (touchStateRef.current) {
            touchStateRef.current.dismissOnTouchEnd = false
            touchStateRef.current.dismissOnMouseDown = false
          }
        })
      }
    }
    function addTargetEventListenerOnce(event, listener) {
      const target = getTarget(event)
      if (!target) return
      const unsubscribe = addEventListener(target, event.type, () => {
        listener(event)
        unsubscribe()
      })
    }
    function handleTouchStartCapture(event) {
      currentPointerTypeRef.current = "touch"
      addTargetEventListenerOnce(event, handleTouchStart)
    }
    function closeOnPressOutsideCapture(event) {
      cancelDismissOnEndTimeout.clear()
      if (event.type === "pointerdown") currentPointerTypeRef.current = event.pointerType
      if (
        event.type === "mousedown" &&
        touchStateRef.current &&
        !touchStateRef.current.dismissOnMouseDown
      )
        return
      addTargetEventListenerOnce(event, (targetEvent) => {
        if (targetEvent.type === "pointerdown") handlePointerDown(targetEvent)
        else closeOnPressOutside(targetEvent)
      })
    }
    function handlePressEndCapture(event) {
      if (!pressStartedInsideRef.current) return
      const pressStartedInsideDefaultPrevented = pressStartPreventedRef.current
      resetPressStartState()
      if (getOutsidePressEvent() !== "intentional") return
      if (event.type === "pointercancel") {
        if (pressStartedInsideDefaultPrevented) suppressImmediateOutsideClickAfterPreventedStart()
        return
      }
      if (isEventWithinFloatingTree(event)) return
      if (pressStartedInsideDefaultPrevented) {
        suppressImmediateOutsideClickAfterPreventedStart()
        return
      }
      if (typeof outsidePress$1 === "function" && !outsidePress$1(event)) return
      preventedPressSuppressionTimeout.clear()
      suppressNextOutsideClickRef.current = true
      clearInsideReactTree()
    }
    function handleTouchMove(event) {
      if (
        getOutsidePressEvent() !== "sloppy" ||
        !touchStateRef.current ||
        isEventWithinOwnElements(event)
      )
        return
      const touch = event.touches[0]
      if (!touch) return
      const deltaX = Math.abs(touch.clientX - touchStateRef.current.startX)
      const deltaY = Math.abs(touch.clientY - touchStateRef.current.startY)
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      if (distance > 5) touchStateRef.current.dismissOnTouchEnd = true
      if (distance > 10) {
        closeOnPressOutside(event)
        cancelDismissOnEndTimeout.clear()
        touchStateRef.current = null
      }
    }
    function handleTouchMoveCapture(event) {
      addTargetEventListenerOnce(event, handleTouchMove)
    }
    function handleTouchEnd(event) {
      if (
        getOutsidePressEvent() !== "sloppy" ||
        !touchStateRef.current ||
        isEventWithinOwnElements(event)
      )
        return
      if (touchStateRef.current.dismissOnTouchEnd) closeOnPressOutside(event)
      cancelDismissOnEndTimeout.clear()
      touchStateRef.current = null
    }
    function handleTouchEndCapture(event) {
      addTargetEventListenerOnce(event, handleTouchEnd)
    }
    const doc = ownerDocument(floatingElement)
    const unsubscribe = mergeCleanups(
      escapeKey$1 &&
        mergeCleanups(
          addEventListener(doc, "keydown", closeOnEscapeKeyDown),
          addEventListener(doc, "compositionstart", handleCompositionStart),
          addEventListener(doc, "compositionend", handleCompositionEnd),
        ),
      outsidePressEnabled &&
        mergeCleanups(
          addEventListener(doc, "click", closeOnPressOutsideCapture, true),
          addEventListener(doc, "pointerdown", closeOnPressOutsideCapture, true),
          addEventListener(doc, "pointerup", handlePressEndCapture, true),
          addEventListener(doc, "pointercancel", handlePressEndCapture, true),
          addEventListener(doc, "mousedown", closeOnPressOutsideCapture, true),
          addEventListener(doc, "mouseup", handlePressEndCapture, true),
          addEventListener(doc, "touchstart", handleTouchStartCapture, true),
          addEventListener(doc, "touchmove", handleTouchMoveCapture, true),
          addEventListener(doc, "touchend", handleTouchEndCapture, true),
        ),
    )
    return () => {
      unsubscribe()
      compositionTimeout.clear()
      preventedPressSuppressionTimeout.clear()
      resetPressStartState()
      suppressNextOutsideClickRef.current = false
      clearInsideReactTree()
    }
  }, [
    dataRef,
    floatingElement,
    escapeKey$1,
    outsidePressEnabled,
    outsidePress$1,
    open,
    enabled,
    escapeKeyBubbles,
    outsidePressBubbles,
    closeOnEscapeKeyDown,
    clearInsideReactTree,
    getOutsidePressEventProp,
    hasBlockingChild,
    isEventWithinOwnElements,
    tree,
    store,
    cancelDismissOnEndTimeout,
  ])
  const reference = import_react.useMemo(
    () => ({
      onKeyDown: closeOnEscapeKeyDown,
      onPointerDown: closeOnReferencePress,
      onClick: closeOnReferencePress,
    }),
    [closeOnEscapeKeyDown, closeOnReferencePress],
  )
  const floating = import_react.useMemo(
    () => ({
      onKeyDown: closeOnEscapeKeyDown,
      onPointerDown: markInsidePressStartPrevented,
      onMouseDown: markInsidePressStartPrevented,
      onClickCapture: markInsideReactTree,
      onMouseDownCapture(event) {
        markInsideReactTree()
        markPressStartedInsideReactTree(event)
      },
      onPointerDownCapture(event) {
        markInsideReactTree()
        markPressStartedInsideReactTree(event)
      },
      onMouseUpCapture: markInsideReactTree,
      onTouchEndCapture: markInsideReactTree,
      onTouchMoveCapture: markInsideReactTree,
    }),
    [
      closeOnEscapeKeyDown,
      markInsideReactTree,
      markPressStartedInsideReactTree,
      markInsidePressStartPrevented,
    ],
  )
  return import_react.useMemo(
    () =>
      enabled
        ? {
            reference,
            floating,
            trigger: reference,
          }
        : {},
    [enabled, reference, floating],
  )
}
//#endregion
//#region node_modules/.pnpm/@floating-ui+core@1.8.0/node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
  const { reference, floating } = _ref
  const sideAxis = getSideAxis(placement)
  const alignmentAxis = getAlignmentAxis(placement)
  const alignLength = getAxisLength(alignmentAxis)
  const side = getSide(placement)
  const isVertical = sideAxis === "y"
  const commonX = reference.x + reference.width / 2 - floating.width / 2
  const commonY = reference.y + reference.height / 2 - floating.height / 2
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2
  let coords
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height,
      }
      break
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height,
      }
      break
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY,
      }
      break
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY,
      }
      break
    default:
      coords = {
        x: reference.x,
        y: reference.y,
      }
  }
  const alignment = getAlignment(placement)
  if (alignment)
    coords[alignmentAxis] +=
      commonAlign * (alignment === "end" ? 1 : -1) * (rtl && isVertical ? -1 : 1)
  return coords
}
/**
 * Resolves with an object of overflow side offsets that determine how much the
 * element is overflowing a given clipping boundary on each side.
 * - positive = overflowing the boundary by that number of pixels
 * - negative = how many pixels left before it will overflow
 * - 0 = lies flush with the boundary
 * @see https://floating-ui.com/docs/detectOverflow
 */
async function detectOverflow(state, options) {
  let _await$platform$isEle
  if (options === void 0) options = {}
  const { x, y, platform, rects, elements, strategy } = state
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0,
  } = evaluate(options, state)
  const paddingObject = getPaddingObject(padding)
  const element =
    elements[
      altBoundary ? (elementContext === "floating" ? "reference" : "floating") : elementContext
    ]
  const clippingClientRect = rectToClientRect(
    await platform.getClippingRect({
      element: (
        (_await$platform$isEle = await (platform.isElement == null
          ? void 0
          : platform.isElement(element))) != null
          ? _await$platform$isEle
          : true
      )
        ? element
        : element.contextElement ||
          (await (platform.getDocumentElement == null
            ? void 0
            : platform.getDocumentElement(elements.floating))),
      boundary,
      rootBoundary,
      strategy,
    }),
  )
  const rect =
    elementContext === "floating"
      ? {
          x,
          y,
          width: rects.floating.width,
          height: rects.floating.height,
        }
      : rects.reference
  const offsetParent = await (platform.getOffsetParent == null
    ? void 0
    : platform.getOffsetParent(elements.floating))
  const offsetScale = ((await (platform.isElement == null
    ? void 0
    : platform.isElement(offsetParent))) &&
    (await (platform.getScale == null ? void 0 : platform.getScale(offsetParent)))) || {
    x: 1,
    y: 1,
  }
  const elementClientRect = rectToClientRect(
    platform.convertOffsetParentRelativeRectToViewportRelativeRect
      ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
          elements,
          rect,
          offsetParent,
          strategy,
        })
      : rect,
  )
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom:
      (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right:
      (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x,
  }
}
const MAX_RESET_COUNT = 50
/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a given reference element.
 *
 * This export does not have any `platform` interface logic. You will need to
 * write one for the platform you are using Floating UI with.
 */
const computePosition$1 = async (reference, floating, config) => {
  const { placement = "bottom", strategy = "absolute", middleware = [], platform } = config
  const platformWithDetectOverflow = platform.detectOverflow
    ? platform
    : {
        ...platform,
        detectOverflow,
      }
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating))
  let rects = await platform.getElementRects({
    reference,
    floating,
    strategy,
  })
  let { x, y } = computeCoordsFromPlacement(rects, placement, rtl)
  let statefulPlacement = placement
  let resetCount = 0
  const middlewareData = {}
  for (let i = 0; i < middleware.length; i++) {
    const currentMiddleware = middleware[i]
    if (!currentMiddleware) continue
    const { name, fn } = currentMiddleware
    const {
      x: nextX,
      y: nextY,
      data,
      reset,
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platformWithDetectOverflow,
      elements: {
        reference,
        floating,
      },
    })
    x = nextX != null ? nextX : x
    y = nextY != null ? nextY : y
    middlewareData[name] = {
      ...middlewareData[name],
      ...data,
    }
    if (reset && resetCount < MAX_RESET_COUNT) {
      resetCount++
      if (typeof reset === "object") {
        if (reset.placement) statefulPlacement = reset.placement
        if (reset.rects)
          rects =
            reset.rects === true
              ? await platform.getElementRects({
                  reference,
                  floating,
                  strategy,
                })
              : reset.rects
        ;({ x, y } = computeCoordsFromPlacement(rects, statefulPlacement, rtl))
      }
      i = -1
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData,
  }
}
/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
const flip$2 = function (options) {
  if (options === void 0) options = {}
  return {
    name: "flip",
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip
      const { placement, middlewareData, rects, initialPlacement, platform, elements } = state
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state)
      if (
        (_middlewareData$arrow = middlewareData.arrow) != null &&
        _middlewareData$arrow.alignmentOffset
      )
        return {}
      const side = getSide(placement)
      const initialSideAxis = getSideAxis(initialPlacement)
      const isBasePlacement = getSide(initialPlacement) === initialPlacement
      const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating))
      const fallbackPlacements =
        specifiedFallbackPlacements ||
        (isBasePlacement || !flipAlignment
          ? [getOppositePlacement(initialPlacement)]
          : getExpandedPlacements(initialPlacement))
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none"
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection)
        fallbackPlacements.push(
          ...getOppositeAxisPlacements(
            initialPlacement,
            flipAlignment,
            fallbackAxisSideDirection,
            rtl,
          ),
        )
      const placements = [initialPlacement, ...fallbackPlacements]
      const overflow = await platform.detectOverflow(state, detectOverflowOptions)
      const overflows = []
      let overflowsData =
        ((_middlewareData$flip = middlewareData.flip) == null
          ? void 0
          : _middlewareData$flip.overflows) || []
      if (checkMainAxis) overflows.push(overflow[side])
      if (checkCrossAxis) {
        const sides = getAlignmentSides(placement, rects, rtl)
        overflows.push(overflow[sides[0]], overflow[sides[1]])
      }
      overflowsData = [
        ...overflowsData,
        {
          placement,
          overflows,
        },
      ]
      if (!overflows.every((side) => side <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter
        const nextIndex =
          (((_middlewareData$flip2 = middlewareData.flip) == null
            ? void 0
            : _middlewareData$flip2.index) || 0) + 1
        const nextPlacement = placements[nextIndex]
        if (nextPlacement) {
          if (
            !(checkCrossAxis === "alignment"
              ? initialSideAxis !== getSideAxis(nextPlacement)
              : false) ||
            overflowsData.every((d) =>
              getSideAxis(d.placement) === initialSideAxis ? d.overflows[0] > 0 : true,
            )
          )
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData,
              },
              reset: { placement: nextPlacement },
            }
        }
        let resetPlacement =
          (_overflowsData$filter = overflowsData
            .filter((d) => d.overflows[0] <= 0)
            .sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null
            ? void 0
            : _overflowsData$filter.placement
        if (!resetPlacement)
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$filter2
              const placement =
                (_overflowsData$filter2 = overflowsData
                  .filter((d) => {
                    if (hasFallbackAxisSideDirection) {
                      const currentSideAxis = getSideAxis(d.placement)
                      return currentSideAxis === initialSideAxis || currentSideAxis === "y"
                    }
                    return true
                  })
                  .map((d) => [
                    d.placement,
                    d.overflows
                      .filter((overflow) => overflow > 0)
                      .reduce((acc, overflow) => acc + overflow, 0),
                  ])
                  .sort((a, b) => a[1] - b[1])[0]) == null
                  ? void 0
                  : _overflowsData$filter2[0]
              if (placement) resetPlacement = placement
              break
            }
            case "initialPlacement":
              resetPlacement = initialPlacement
          }
        if (placement !== resetPlacement) return { reset: { placement: resetPlacement } }
      }
      return {}
    },
  }
}
const originSides = /*#__PURE__*/ new Set(["left", "top"])
async function convertValueToCoords(state, options) {
  const { placement, platform, elements } = state
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating))
  const side = getSide(placement)
  const alignment = getAlignment(placement)
  const isVertical = getSideAxis(placement) === "y"
  const mainAxisMulti = originSides.has(side) ? -1 : 1
  const crossAxisMulti = rtl && isVertical ? -1 : 1
  const rawValue = evaluate(options, state)
  let { mainAxis, crossAxis, alignmentAxis } =
    typeof rawValue === "number"
      ? {
          mainAxis: rawValue,
          crossAxis: 0,
          alignmentAxis: null,
        }
      : {
          mainAxis: rawValue.mainAxis || 0,
          crossAxis: rawValue.crossAxis || 0,
          alignmentAxis: rawValue.alignmentAxis,
        }
  if (alignment && typeof alignmentAxis === "number")
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis
  return isVertical
    ? {
        x: crossAxis * crossAxisMulti,
        y: mainAxis * mainAxisMulti,
      }
    : {
        x: mainAxis * mainAxisMulti,
        y: crossAxis * crossAxisMulti,
      }
}
/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
const offset$2 = function (options) {
  if (options === void 0) options = 0
  return {
    name: "offset",
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow
      const { x, y, placement, middlewareData } = state
      const diffCoords = await convertValueToCoords(state, options)
      if (
        placement ===
          ((_middlewareData$offse = middlewareData.offset) == null
            ? void 0
            : _middlewareData$offse.placement) &&
        (_middlewareData$arrow = middlewareData.arrow) != null &&
        _middlewareData$arrow.alignmentOffset
      )
        return {}
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement,
        },
      }
    },
  }
}
/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift$2 = function (options) {
  if (options === void 0) options = {}
  return {
    name: "shift",
    options,
    async fn(state) {
      const { x, y, placement, platform } = state
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let { x, y } = _ref
            return {
              x,
              y,
            }
          },
        },
        ...detectOverflowOptions
      } = evaluate(options, state)
      const coords = {
        x,
        y,
      }
      const overflow = await platform.detectOverflow(state, detectOverflowOptions)
      const crossAxis = getSideAxis(placement)
      const mainAxis = getOppositeAxis(crossAxis)
      let mainAxisCoord = coords[mainAxis]
      let crossAxisCoord = coords[crossAxis]
      const clampCoord = (axis, coord) =>
        clamp$1(
          coord + overflow[axis === "y" ? "top" : "left"],
          coord,
          coord - overflow[axis === "y" ? "bottom" : "right"],
        )
      if (checkMainAxis) mainAxisCoord = clampCoord(mainAxis, mainAxisCoord)
      if (checkCrossAxis) crossAxisCoord = clampCoord(crossAxis, crossAxisCoord)
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord,
      })
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis,
          },
        },
      }
    },
  }
}
/**
 * Built-in `limiter` that will stop `shift()` at a certain point.
 */
const limitShift$2 = function (options) {
  if (options === void 0) options = {}
  return {
    options,
    fn(state) {
      var _rawOffset$mainAxis, _rawOffset$crossAxis
      const { x, y, placement, rects, middlewareData } = state
      const {
        offset = 0,
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
      } = evaluate(options, state)
      const coords = {
        x,
        y,
      }
      const crossAxis = getSideAxis(placement)
      const mainAxis = getOppositeAxis(crossAxis)
      let mainAxisCoord = coords[mainAxis]
      let crossAxisCoord = coords[crossAxis]
      const rawOffset = evaluate(offset, state)
      const computedOffset =
        typeof rawOffset === "number"
          ? {
              mainAxis: rawOffset,
              crossAxis: 0,
            }
          : {
              mainAxis:
                (_rawOffset$mainAxis = rawOffset.mainAxis) != null ? _rawOffset$mainAxis : 0,
              crossAxis:
                (_rawOffset$crossAxis = rawOffset.crossAxis) != null ? _rawOffset$crossAxis : 0,
            }
      if (checkMainAxis) {
        const len = mainAxis === "y" ? "height" : "width"
        const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis
        const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis
        if (mainAxisCoord < limitMin) mainAxisCoord = limitMin
        else if (mainAxisCoord > limitMax) mainAxisCoord = limitMax
      }
      if (checkCrossAxis) {
        var _middlewareData$offse, _middlewareData$offse2
        const len = mainAxis === "y" ? "width" : "height"
        const isOriginSide = originSides.has(getSide(placement))
        const limitMin =
          rects.reference[crossAxis] -
          rects.floating[len] +
          (isOriginSide
            ? ((_middlewareData$offse = middlewareData.offset) == null
                ? void 0
                : _middlewareData$offse[crossAxis]) || 0
            : 0) +
          (isOriginSide ? 0 : computedOffset.crossAxis)
        const limitMax =
          rects.reference[crossAxis] +
          rects.reference[len] +
          (isOriginSide
            ? 0
            : ((_middlewareData$offse2 = middlewareData.offset) == null
                ? void 0
                : _middlewareData$offse2[crossAxis]) || 0) -
          (isOriginSide ? computedOffset.crossAxis : 0)
        if (crossAxisCoord < limitMin) crossAxisCoord = limitMin
        else if (crossAxisCoord > limitMax) crossAxisCoord = limitMax
      }
      return {
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord,
      }
    },
  }
}
/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */
const size$2 = function (options) {
  if (options === void 0) options = {}
  return {
    name: "size",
    options,
    async fn(state) {
      const { placement, rects, platform, elements } = state
      const { apply = () => {}, ...detectOverflowOptions } = evaluate(options, state)
      const overflow = await platform.detectOverflow(state, detectOverflowOptions)
      const side = getSide(placement)
      const alignment = getAlignment(placement)
      const isYAxis = getSideAxis(placement) === "y"
      const { width, height } = rects.floating
      let heightSide
      let widthSide
      if (side === "top" || side === "bottom") {
        heightSide = side
        widthSide =
          alignment ===
          ((await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating)))
            ? "start"
            : "end")
            ? "left"
            : "right"
      } else {
        widthSide = side
        heightSide = alignment === "end" ? "top" : "bottom"
      }
      const maximumClippingHeight = height - overflow.top - overflow.bottom
      const maximumClippingWidth = width - overflow.left - overflow.right
      const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight)
      const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth)
      const shiftData = state.middlewareData.shift
      const noShift = !shiftData
      let availableHeight = overflowAvailableHeight
      let availableWidth = overflowAvailableWidth
      if (shiftData != null && shiftData.enabled.x) availableWidth = maximumClippingWidth
      if (shiftData != null && shiftData.enabled.y) availableHeight = maximumClippingHeight
      if (noShift && !alignment) {
        if (isYAxis) availableWidth = width - 2 * max(overflow.left, overflow.right)
        else availableHeight = height - 2 * max(overflow.top, overflow.bottom)
      }
      await apply({
        ...state,
        availableWidth,
        availableHeight,
      })
      const nextDimensions = await platform.getDimensions(elements.floating)
      if (width !== nextDimensions.width || height !== nextDimensions.height)
        return { reset: { rects: true } }
      return {}
    },
  }
}
//#endregion
//#region node_modules/.pnpm/@floating-ui+dom@1.8.0/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
  const css = getComputedStyle$1(element)
  let width = parseFloat(css.width) || 0
  let height = parseFloat(css.height) || 0
  const hasOffset = isHTMLElement(element)
  const offsetWidth = hasOffset ? element.offsetWidth : width
  const offsetHeight = hasOffset ? element.offsetHeight : height
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight
  if (shouldFallback) {
    width = offsetWidth
    height = offsetHeight
  }
  return {
    width,
    height,
    $: shouldFallback,
  }
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element
}
function getScale(element) {
  const domElement = unwrapElement(element)
  if (!isHTMLElement(domElement)) return createCoords(1)
  const rect = domElement.getBoundingClientRect()
  const { width, height, $ } = getCssDimensions(domElement)
  let x = ($ ? round(rect.width) : rect.width) / width
  let y = ($ ? round(rect.height) : rect.height) / height
  if (!x || !Number.isFinite(x)) x = 1
  if (!y || !Number.isFinite(y)) y = 1
  return {
    x,
    y,
  }
}
const noOffsets = /*#__PURE__*/ createCoords(0)
function getVisualOffsets(element) {
  const win = getWindow(element)
  if (!isWebKit() || !win.visualViewport) return noOffsets
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop,
  }
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) isFixed = false
  return Boolean(floatingOffsetParent) && isFixed && floatingOffsetParent === getWindow(element)
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) includeScale = false
  if (isFixedStrategy === void 0) isFixedStrategy = false
  const clientRect = element.getBoundingClientRect()
  const domElement = unwrapElement(element)
  let scale = createCoords(1)
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) scale = getScale(offsetParent)
    } else scale = getScale(element)
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent)
    ? getVisualOffsets(domElement)
    : createCoords(0)
  let x = (clientRect.left + visualOffsets.x) / scale.x
  let y = (clientRect.top + visualOffsets.y) / scale.y
  let width = clientRect.width / scale.x
  let height = clientRect.height / scale.y
  if (domElement && offsetParent) {
    const win = getWindow(domElement)
    const offsetWin = isElement(offsetParent) ? getWindow(offsetParent) : offsetParent
    let currentWin = win
    let currentIFrame = getFrameElement(currentWin)
    while (currentIFrame && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame)
      const iframeRect = currentIFrame.getBoundingClientRect()
      const css = getComputedStyle$1(currentIFrame)
      const left =
        iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x
      const top =
        iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y
      x *= iframeScale.x
      y *= iframeScale.y
      width *= iframeScale.x
      height *= iframeScale.y
      x += left
      y += top
      currentWin = getWindow(currentIFrame)
      currentIFrame = getFrameElement(currentWin)
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y,
  })
}
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft
  if (!rect) return getBoundingClientRect(getDocumentElement(element)).left + leftScroll
  return rect.left + leftScroll
}
function getHTMLOffset(documentElement, scroll) {
  const htmlRect = documentElement.getBoundingClientRect()
  return {
    x: htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect),
    y: htmlRect.top + scroll.scrollTop,
  }
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  const { elements, rect, offsetParent, strategy } = _ref
  const isFixed = strategy === "fixed"
  const documentElement = getDocumentElement(offsetParent)
  const topLayer = elements ? isTopLayer(elements.floating) : false
  if (offsetParent === documentElement || (topLayer && isFixed)) return rect
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0,
  }
  let scale = createCoords(1)
  const offsets = createCoords(0)
  const isOffsetParentAnElement = isHTMLElement(offsetParent)
  if (isOffsetParentAnElement || !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement))
      scroll = getNodeScroll(offsetParent)
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent)
      scale = getScale(offsetParent)
      offsets.x = offsetRect.x + offsetParent.clientLeft
      offsets.y = offsetRect.y + offsetParent.clientTop
    }
  }
  const htmlOffset =
    documentElement && !isOffsetParentAnElement && !isFixed
      ? getHTMLOffset(documentElement, scroll)
      : createCoords(0)
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y,
  }
}
function getClientRects(element) {
  return element.getClientRects ? [...element.getClientRects()] : []
}
function getDocumentRect(html) {
  const scroll = getNodeScroll(html)
  const body = html.ownerDocument.body
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth)
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight)
  let x = -scroll.scrollLeft + getWindowScrollBarX(html)
  const y = -scroll.scrollTop
  if (getComputedStyle$1(body).direction === "rtl")
    x += max(html.clientWidth, body.clientWidth) - width
  return {
    width,
    height,
    x,
    y,
  }
}
const SCROLLBAR_MAX = 25
function getViewportRect(element, strategy, rootBoundary) {
  if (rootBoundary === void 0) rootBoundary = "viewport"
  const isLayoutViewport = rootBoundary === "layoutViewport"
  const win = getWindow(element)
  const html = getDocumentElement(element)
  const visualViewport = win.visualViewport
  let width = html.clientWidth
  let height = html.clientHeight
  let x = 0
  let y = 0
  if (visualViewport) {
    const layoutRelativeClientCoords = !isWebKit() || strategy === "fixed"
    if (isLayoutViewport) {
      if (!layoutRelativeClientCoords) {
        x = -visualViewport.offsetLeft
        y = -visualViewport.offsetTop
      }
    } else {
      width = visualViewport.width
      height = visualViewport.height
      if (layoutRelativeClientCoords) {
        x = visualViewport.offsetLeft
        y = visualViewport.offsetTop
      }
    }
  }
  if (getWindowScrollBarX(html) <= 0) {
    const doc = html.ownerDocument
    const body = doc.body
    const bodyStyles = getComputedStyle(body)
    const bodyMarginInline =
      doc.compatMode === "CSS1Compat"
        ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0
        : 0
    const reservedWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline)
    const gutter =
      getComputedStyle(html).scrollbarGutter === "stable both-edges"
        ? reservedWidth / 2
        : reservedWidth
    if (gutter <= SCROLLBAR_MAX) width -= gutter
  }
  return {
    width,
    height,
    x,
    y,
  }
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed")
  const top = clientRect.top + element.clientTop
  const left = clientRect.left + element.clientLeft
  const scale = getScale(element)
  return {
    width: element.clientWidth * scale.x,
    height: element.clientHeight * scale.y,
    x: left * scale.x,
    y: top * scale.y,
  }
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect
  if (clippingAncestor === "viewport" || clippingAncestor === "layoutViewport")
    rect = getViewportRect(element, strategy, clippingAncestor)
  else if (clippingAncestor === "document") rect = getDocumentRect(getDocumentElement(element))
  else if (isElement(clippingAncestor))
    rect = getInnerBoundingClientRect(clippingAncestor, strategy)
  else {
    const visualOffsets = getVisualOffsets(element)
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height,
    }
  }
  return rectToClientRect(rect)
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element)
  if (cachedResult) return cachedResult
  let result = getOverflowAncestors(element, [], false).filter(
    (el) => isElement(el) && getNodeName(el) !== "body",
  )
  let lastKeptComputedStyle = null
  const elementIsFixed = getComputedStyle$1(element).position === "fixed"
  let currentNode = elementIsFixed ? getParentNode(element) : element
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle$1(currentNode)
    const currentNodeIsContaining = isContainingBlock(currentNode)
    const lastPosition = lastKeptComputedStyle
      ? lastKeptComputedStyle.position
      : elementIsFixed
        ? "fixed"
        : ""
    if (
      !currentNodeIsContaining &&
      (lastPosition === "fixed" ||
        (lastPosition === "absolute" && computedStyle.position === "static"))
    )
      result = result.filter((ancestor) => ancestor !== currentNode)
    else lastKeptComputedStyle = computedStyle
    currentNode = getParentNode(currentNode)
  }
  cache.set(element, result)
  return result
}
function getClippingRect(_ref) {
  const { element, boundary, rootBoundary, strategy } = _ref
  const clippingAncestors = [
    ...(boundary === "clippingAncestors"
      ? isTopLayer(element)
        ? []
        : getClippingElementAncestors(element, this._c)
      : [].concat(boundary)),
    rootBoundary,
  ]
  const firstRect = getClientRectFromClippingAncestor(element, clippingAncestors[0], strategy)
  let top = firstRect.top
  let right = firstRect.right
  let bottom = firstRect.bottom
  let left = firstRect.left
  for (let i = 1; i < clippingAncestors.length; i++) {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestors[i], strategy)
    top = max(rect.top, top)
    right = min(rect.right, right)
    bottom = min(rect.bottom, bottom)
    left = max(rect.left, left)
  }
  return {
    width: right - left,
    height: bottom - top,
    x: left,
    y: top,
  }
}
function getDimensions(element) {
  const { width, height } = getCssDimensions(element)
  return {
    width,
    height,
  }
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent)
  const documentElement = getDocumentElement(offsetParent)
  const isFixed = strategy === "fixed"
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent)
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0,
  }
  const offsets = createCoords(0)
  if (isOffsetParentAnElement || !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement))
      scroll = getNodeScroll(offsetParent)
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent)
      offsets.x = offsetRect.x + offsetParent.clientLeft
      offsets.y = offsetRect.y + offsetParent.clientTop
    }
  }
  if (!isOffsetParentAnElement && documentElement) offsets.x = getWindowScrollBarX(documentElement)
  const htmlOffset =
    documentElement && !isOffsetParentAnElement && !isFixed
      ? getHTMLOffset(documentElement, scroll)
      : createCoords(0)
  return {
    x: rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x,
    y: rect.top + scroll.scrollTop - offsets.y - htmlOffset.y,
    width: rect.width,
    height: rect.height,
  }
}
function isStaticPositioned(element) {
  return getComputedStyle$1(element).position === "static"
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle$1(element).position === "fixed") return null
  if (polyfill) return polyfill(element)
  let rawOffsetParent = element.offsetParent
  if (getDocumentElement(element) === rawOffsetParent)
    rawOffsetParent = rawOffsetParent.ownerDocument.body
  return rawOffsetParent
}
function getOffsetParent(element, polyfill) {
  const win = getWindow(element)
  if (isTopLayer(element)) return win
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element)
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) return svgOffsetParent
      svgOffsetParent = getParentNode(svgOffsetParent)
    }
    return win
  }
  let offsetParent = getTrueOffsetParent(element, polyfill)
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent))
    offsetParent = getTrueOffsetParent(offsetParent, polyfill)
  if (
    offsetParent &&
    isLastTraversableNode(offsetParent) &&
    isStaticPositioned(offsetParent) &&
    !isContainingBlock(offsetParent)
  )
    return win
  return offsetParent || getContainingBlock(element) || win
}
const getElementRects = async function (data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent
  const getDimensionsFn = this.getDimensions
  const floatingDimensions = await getDimensionsFn(data.floating)
  return {
    reference: getRectRelativeToOffsetParent(
      data.reference,
      await getOffsetParentFn(data.floating),
      data.strategy,
    ),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height,
    },
  }
}
function isRTL(element) {
  return getComputedStyle$1(element).direction === "rtl"
}
const platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL,
}
function rectsAreEqual(a, b) {
  return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height
}
function observeMove(element, onMove, ancestorResize) {
  let io = null
  let timeoutId
  const root = getDocumentElement(element)
  function cleanup() {
    let _io
    clearTimeout(timeoutId)
    ;(_io = io) == null || _io.disconnect()
    io = null
  }
  function refresh(skip, threshold) {
    if (skip === void 0) skip = false
    if (threshold === void 0) threshold = 1
    cleanup()
    const elementRectForRootMargin = element.getBoundingClientRect()
    const { left, top, width, height } = elementRectForRootMargin
    if (!skip) onMove()
    if (!width || !height) return
    const insetTop = floor(top)
    const insetRight = floor(root.clientWidth - (left + width))
    const insetBottom = floor(root.clientHeight - (top + height))
    const insetLeft = floor(left)
    const options = {
      rootMargin: `${-insetTop}px ${-insetRight}px ${-insetBottom}px ${-insetLeft}px`,
      threshold: max(0, min(1, threshold)) || 1,
    }
    let isFirstUpdate = true
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio
      if (!rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect()))
        return refresh()
      if (ratio !== threshold) {
        if (!isFirstUpdate) return refresh()
        if (!ratio)
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7)
          }, 1e3)
        else refresh(false, ratio)
      }
      isFirstUpdate = false
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        root: root.ownerDocument,
      })
    } catch {
      io = new IntersectionObserver(handleObserve, options)
    }
    io.observe(element)
  }
  const win = getWindow(element)
  const handleResize = () => refresh(ancestorResize)
  win.addEventListener("resize", handleResize)
  refresh(true)
  return () => {
    win.removeEventListener("resize", handleResize)
    cleanup()
  }
}
/**
 * Automatically updates the position of the floating element when necessary.
 * Should only be called when the floating element is mounted on the DOM or
 * visible on the screen.
 * @returns cleanup function that should be invoked when the floating element is
 * removed from the DOM or hidden from the screen.
 * @see https://floating-ui.com/docs/autoUpdate
 */
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) options = {}
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false,
  } = options
  const referenceEl = unwrapElement(reference)
  const ancestors =
    ancestorScroll || ancestorResize
      ? [
          ...(referenceEl ? getOverflowAncestors(referenceEl) : []),
          ...(floating ? getOverflowAncestors(floating) : []),
        ]
      : []
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update)
    ancestorResize && ancestor.addEventListener("resize", update)
  })
  const cleanupIo =
    referenceEl && layoutShift ? observeMove(referenceEl, update, ancestorResize) : null
  let reobserveFrame = -1
  let resizeObserver = null
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      const [firstEntry] = _ref
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver && floating) {
        resizeObserver.unobserve(floating)
        cancelAnimationFrame(reobserveFrame)
        reobserveFrame = requestAnimationFrame(() => {
          let _resizeObserver
          ;(_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating)
        })
      }
      update()
    })
    if (referenceEl && !animationFrame) resizeObserver.observe(referenceEl)
    if (floating) resizeObserver.observe(floating)
  }
  let frameId
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null
  if (animationFrame) frameLoop()
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference)
    if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) update()
    prevRefRect = nextRefRect
    frameId = requestAnimationFrame(frameLoop)
  }
  update()
  return () => {
    let _resizeObserver2
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update)
      ancestorResize && ancestor.removeEventListener("resize", update)
    })
    cleanupIo?.()
    ;(_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect()
    resizeObserver = null
    if (animationFrame) cancelAnimationFrame(frameId)
  }
}
/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
const offset$1 = offset$2
/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift$1 = shift$2
/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
const flip$1 = flip$2
/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */
const size$1 = size$2
/**
 * Built-in `limiter` that will stop `shift()` at a certain point.
 */
const limitShift$1 = limitShift$2
/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a given reference element.
 */
const computePosition = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map()
  const mergedOptions = options != null ? options : {}
  const platformWithCache = {
    ...platform,
    ...mergedOptions.platform,
    _c: cache,
  }
  return computePosition$1(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache,
  })
}
//#endregion
//#region node_modules/.pnpm/@floating-ui+react-dom@2.1._735e95704ae5cf22d7cb7c1194888638/node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs
const index = typeof document !== "undefined" ? import_react.useLayoutEffect : function noop() {}
function deepEqual(a, b) {
  if (a === b) return true
  if (typeof a !== typeof b) return false
  if (typeof a === "function" && a.toString() === b.toString()) return true
  let length
  let i
  let keys
  if (a && b && typeof a === "object") {
    if (Array.isArray(a)) {
      length = a.length
      if (length !== b.length) return false
      for (i = length; i-- !== 0;) if (!deepEqual(a[i], b[i])) return false
      return true
    }
    keys = Object.keys(a)
    length = keys.length
    if (length !== Object.keys(b).length) return false
    for (i = length; i-- !== 0;) if (!Object.hasOwn(b, keys[i])) return false
    for (i = length; i-- !== 0;) {
      const key = keys[i]
      if (key === "_owner" && a.$$typeof) continue
      if (!deepEqual(a[key], b[key])) return false
    }
    return true
  }
  return a !== a && b !== b
}
function getDPR(element) {
  if (typeof window === "undefined") return 1
  return (element.ownerDocument.defaultView || window).devicePixelRatio || 1
}
function roundByDPR(element, value) {
  const dpr = getDPR(element)
  return Math.round(value * dpr) / dpr
}
function useLatestRef(value) {
  const ref = import_react.useRef(value)
  index(() => {
    ref.current = value
  })
  return ref
}
/**
 * Provides data to position a floating element.
 * @see https://floating-ui.com/docs/useFloating
 */
function useFloating(options) {
  if (options === void 0) options = {}
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform,
    elements: { reference: externalReference, floating: externalFloating } = {},
    transform = true,
    whileElementsMounted,
    open,
  } = options
  const [data, setData] = import_react.useState({
    x: 0,
    y: 0,
    strategy,
    placement,
    middlewareData: {},
    isPositioned: false,
  })
  const [latestMiddleware, setLatestMiddleware] = import_react.useState(middleware)
  if (!deepEqual(latestMiddleware, middleware)) setLatestMiddleware(middleware)
  const [_reference, _setReference] = import_react.useState(null)
  const [_floating, _setFloating] = import_react.useState(null)
  const setReference = import_react.useCallback((node) => {
    if (node !== referenceRef.current) {
      referenceRef.current = node
      _setReference(node)
    }
  }, [])
  const setFloating = import_react.useCallback((node) => {
    if (node !== floatingRef.current) {
      floatingRef.current = node
      _setFloating(node)
    }
  }, [])
  const referenceEl = externalReference || _reference
  const floatingEl = externalFloating || _floating
  const referenceRef = import_react.useRef(null)
  const floatingRef = import_react.useRef(null)
  const dataRef = import_react.useRef(data)
  const hasWhileElementsMounted = whileElementsMounted != null
  const whileElementsMountedRef = useLatestRef(whileElementsMounted)
  const platformRef = useLatestRef(platform)
  const openRef = useLatestRef(open)
  const update = import_react.useCallback(() => {
    if (!referenceRef.current || !floatingRef.current) return
    const config = {
      placement,
      strategy,
      middleware: latestMiddleware,
    }
    if (platformRef.current) config.platform = platformRef.current
    computePosition(referenceRef.current, floatingRef.current, config).then((data) => {
      const fullData = {
        ...data,
        isPositioned: openRef.current !== false,
      }
      if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
        dataRef.current = fullData
        import_react_dom.flushSync(() => {
          setData(fullData)
        })
      }
    })
  }, [latestMiddleware, placement, strategy, platformRef, openRef])
  index(() => {
    if (open === false && dataRef.current.isPositioned) {
      dataRef.current.isPositioned = false
      setData((data) => ({
        ...data,
        isPositioned: false,
      }))
    }
  }, [open])
  const isMountedRef = import_react.useRef(false)
  index(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])
  index(() => {
    if (referenceEl) referenceRef.current = referenceEl
    if (floatingEl) floatingRef.current = floatingEl
    if (referenceEl && floatingEl) {
      if (whileElementsMountedRef.current)
        return whileElementsMountedRef.current(referenceEl, floatingEl, update)
      update()
    }
  }, [referenceEl, floatingEl, update, whileElementsMountedRef, hasWhileElementsMounted])
  const refs = import_react.useMemo(
    () => ({
      reference: referenceRef,
      floating: floatingRef,
      setReference,
      setFloating,
    }),
    [setReference, setFloating],
  )
  const elements = import_react.useMemo(
    () => ({
      reference: referenceEl,
      floating: floatingEl,
    }),
    [referenceEl, floatingEl],
  )
  const floatingStyles = import_react.useMemo(() => {
    const initialStyles = {
      position: strategy,
      left: 0,
      top: 0,
    }
    if (!elements.floating) return initialStyles
    const x = roundByDPR(elements.floating, data.x)
    const y = roundByDPR(elements.floating, data.y)
    if (transform)
      return {
        ...initialStyles,
        transform: `translate(${x}px, ${y}px)`,
        ...(getDPR(elements.floating) >= 1.5 && { willChange: "transform" }),
      }
    return {
      position: strategy,
      left: x,
      top: y,
    }
  }, [strategy, transform, elements.floating, data.x, data.y])
  return import_react.useMemo(
    () => ({
      ...data,
      update,
      refs,
      elements,
      floatingStyles,
    }),
    [data, update, refs, elements, floatingStyles],
  )
}
/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
const offset = (options, deps) => {
  const result = offset$1(options)
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps],
  }
}
/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift = (options, deps) => {
  const result = shift$1(options)
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps],
  }
}
/**
 * Built-in `limiter` that will stop `shift()` at a certain point.
 */
const limitShift = (options, deps) => {
  return {
    fn: limitShift$1(options).fn,
    options: [options, deps],
  }
}
/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
const flip = (options, deps) => {
  const result = flip$1(options)
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps],
  }
}
/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */
const size = (options, deps) => {
  const result = size$1(options)
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps],
  }
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/floating-ui-react/components/FloatingRootStore.mjs
const selectors$2 = {
  open: (state) => state.open,
  transitionStatus: (state) => state.transitionStatus,
  domReferenceElement: (state) => state.domReferenceElement,
  referenceElement: (state) => state.positionReference ?? state.referenceElement,
  floatingElement: (state) => state.floatingElement,
  floatingId: (state) => state.floatingId,
}
const FloatingRootStore = class extends ReactStore {
  constructor(options) {
    const { syncOnly, nested, onOpenChange, triggerElements, ...initialState } = options
    super(
      {
        ...initialState,
        positionReference: initialState.referenceElement,
        domReferenceElement: initialState.referenceElement,
      },
      {
        onOpenChange,
        dataRef: { current: {} },
        events: createEventEmitter(),
        nested,
        triggerElements,
      },
      selectors$2,
    )
    this.syncOnly = syncOnly
  }
  /**
   * Syncs the event used by hover logic to distinguish hover-open from click-like interaction.
   */
  syncOpenEvent = (newOpen, event) => {
    if (!newOpen || !this.state.open || (event != null && isClickLikeEvent(event)))
      this.context.dataRef.current.openEvent = newOpen ? event : void 0
  }
  /**
   * Runs the root-owned side effects for an open state change.
   */
  dispatchOpenChange = (newOpen, eventDetails) => {
    this.syncOpenEvent(newOpen, eventDetails.event)
    const details = {
      open: newOpen,
      reason: eventDetails.reason,
      nativeEvent: eventDetails.event,
      nested: this.context.nested,
      triggerElement: eventDetails.trigger,
    }
    this.context.events.emit("openchange", details)
  }
  /**
   * Emits the `openchange` event through the internal event emitter and calls the `onOpenChange` handler with the provided arguments.
   *
   * @param newOpen The new open state.
   * @param eventDetails Details about the event that triggered the open state change.
   */
  setOpen = (newOpen, eventDetails) => {
    if (this.syncOnly) {
      this.context.onOpenChange?.(newOpen, eventDetails)
      return
    }
    this.dispatchOpenChange(newOpen, eventDetails)
    this.context.onOpenChange?.(newOpen, eventDetails)
  }
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/floating-ui-react/hooks/useSyncedFloatingRootContext.mjs
/**
 * Keeps a FloatingRootStore in sync with the provided PopupStore.
 * Uses the provided FloatingRootStore when one exists, otherwise creates one once and updates it on every render.
 */
function useSyncedFloatingRootContext(options) {
  const {
    popupStore,
    treatPopupAsFloatingElement = false,
    floatingRootContext: floatingRootContextProp,
    floatingId,
    nested,
    onOpenChange,
  } = options
  const open = popupStore.useState("open")
  const referenceElement = popupStore.useState("activeTriggerElement")
  const floatingElement = popupStore.useState(
    treatPopupAsFloatingElement ? "popupElement" : "positionerElement",
  )
  const triggerElements = popupStore.context.triggerElements
  const handleOpenChange = onOpenChange
  const internalStoreRef = import_react.useRef(null)
  if (floatingRootContextProp === void 0 && internalStoreRef.current === null)
    internalStoreRef.current = new FloatingRootStore({
      open,
      transitionStatus: void 0,
      referenceElement,
      floatingElement,
      triggerElements,
      onOpenChange: handleOpenChange,
      floatingId,
      syncOnly: true,
      nested,
    })
  const store = floatingRootContextProp ?? internalStoreRef.current
  popupStore.useSyncedValue("floatingId", floatingId)
  useIsoLayoutEffect(() => {
    const valuesToSync = {
      open,
      floatingId,
      referenceElement,
      floatingElement,
    }
    if (isElement(referenceElement)) valuesToSync.domReferenceElement = referenceElement
    if (store.state.positionReference === store.state.referenceElement)
      valuesToSync.positionReference = referenceElement
    store.update(valuesToSync)
  }, [open, floatingId, referenceElement, floatingElement, store])
  store.context.onOpenChange = handleOpenChange
  store.context.nested = nested
  return store
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/internals/useTransitionStatus.mjs
/**
 * Provides a status string for CSS animations.
 * @param open - a boolean that determines if the element is open.
 * @param enableIdleState - a boolean that enables the `'idle'` state between `'starting'` and `'ending'`
 */
function useTransitionStatus(open, enableIdleState = false, deferEndingState = false) {
  const [transitionStatus, setTransitionStatus] = import_react.useState(
    open && enableIdleState ? "idle" : void 0,
  )
  const [mounted, setMounted] = import_react.useState(open)
  if (open && !mounted) {
    setMounted(true)
    setTransitionStatus("starting")
  }
  if (!open && mounted && transitionStatus !== "ending" && !deferEndingState)
    setTransitionStatus("ending")
  if (!open && !mounted && transitionStatus === "ending") setTransitionStatus(void 0)
  useIsoLayoutEffect(() => {
    if (!open && mounted && transitionStatus !== "ending" && deferEndingState) {
      const frame = AnimationFrame.request(() => {
        setTransitionStatus("ending")
      })
      return () => {
        AnimationFrame.cancel(frame)
      }
    }
  }, [open, mounted, transitionStatus, deferEndingState])
  useIsoLayoutEffect(() => {
    if (!open || enableIdleState) return
    const frame = AnimationFrame.request(() => {
      setTransitionStatus(void 0)
    })
    return () => {
      AnimationFrame.cancel(frame)
    }
  }, [enableIdleState, open])
  useIsoLayoutEffect(() => {
    if (!open || !enableIdleState) return
    if (open && mounted && transitionStatus !== "idle") setTransitionStatus("starting")
    const frame = AnimationFrame.request(() => {
      setTransitionStatus("idle")
    })
    return () => {
      AnimationFrame.cancel(frame)
    }
  }, [enableIdleState, open, mounted, transitionStatus])
  return {
    mounted,
    setMounted,
    transitionStatus,
  }
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/utils/popups/popupStoreUtils.mjs
const FOCUSABLE_POPUP_PROPS = {
  tabIndex: -1,
  [FOCUSABLE_ATTRIBUTE]: "",
}
/**
 * Returns the default `initialFocus` resolver for a popup. When opened by touch it focuses the
 * popup element itself to prevent the virtual keyboard from opening (required for Android
 * specifically; iOS handles this automatically). Otherwise it falls back to the default behavior.
 */
function createDefaultInitialFocus(popupRef) {
  return (interactionType) => (interactionType === "touch" ? popupRef.current : true)
}
/**
 * The subset of a popup handle that a Root needs to bind its store to. Both the real handle classes
 * and any test double satisfy it.
 */
/**
 * Creates and owns a popup store on behalf of a Root part. The store is created exactly once, with
 * controlled props and root state synced separately after creation. Sets up the synced floating
 * root context and returns the store.
 *
 * @param createStore Factory that builds the store. Called exactly once, receiving the floating id
 * and whether the popup is nested inside another floating element, both resolved on the first render.
 * @param treatPopupAsFloatingElement Whether the popup element is passed to Floating UI as the
 * floating element instead of the default positioner.
 */
function usePopupRootStore(createStore, treatPopupAsFloatingElement = false) {
  const floatingId = useId()
  const nested = useFloatingParentNodeId() != null
  const store = useRefWithInit(() => createStore(floatingId, nested)).current
  useSyncedFloatingRootContext({
    popupStore: store,
    treatPopupAsFloatingElement,
    floatingRootContext: store.state.floatingRootContext,
    floatingId,
    nested,
    onOpenChange: store.setOpen,
  })
  return store
}
/**
 * Attaches a Root's store to a handle for this component's committed lifetime. Popup Roots render
 * it before their interactions and user children so its layout effect runs before descendant layout
 * effects. This lets descendants call the handle during the Root's initial commit without attaching
 * during render, which would leak suspended or abandoned stores. Store subscribers are notified by
 * `attachStore` in this ordinary layout phase, where React permits synchronous updates.
 *
 * Popup Roots must render this component only when a handle is present so handle-less Roots avoid
 * mounting an extra fiber and layout effect.
 */
function PopupHandleAttachment({ handle, store }) {
  useIsoLayoutEffect(() => {
    return handle.attachStore(store)
  }, [handle, store])
  return null
}
/**
 * Returns a callback ref that registers/unregisters the trigger element in the store.
 *
 * @param store The Store instance where the trigger should be registered.
 */
function useTriggerRegistration(id, store) {
  const registeredElementIdRef = import_react.useRef(null)
  const registeredElementRef = import_react.useRef(null)
  return import_react.useCallback(
    (element) => {
      if (id === void 0) return
      let shouldSyncTriggerCount = false
      if (registeredElementIdRef.current !== null) {
        const registeredId = registeredElementIdRef.current
        const registeredElement = registeredElementRef.current
        const currentElement = store.context.triggerElements.getById(registeredId)
        if (registeredElement && currentElement === registeredElement) {
          store.context.triggerElements.delete(registeredId)
          shouldSyncTriggerCount = true
        }
        registeredElementIdRef.current = null
        registeredElementRef.current = null
      }
      if (element !== null) {
        registeredElementIdRef.current = id
        registeredElementRef.current = element
        store.context.triggerElements.add(id, element)
        shouldSyncTriggerCount = true
      }
      if (shouldSyncTriggerCount) {
        const triggerCount = store.context.triggerElements.size
        if (store.select("open") && store.state.triggerCount !== triggerCount)
          store.set("triggerCount", triggerCount)
      }
    },
    [store, id],
  )
}
function setPopupOpenState(state, open, trigger, preventUnmountOnClose = false) {
  if (open) state.preventUnmountingOnClose = false
  else if (preventUnmountOnClose) state.preventUnmountingOnClose = true
  const triggerId = trigger?.id ?? null
  if (triggerId || open) {
    state.activeTriggerId = triggerId
    state.activeTriggerElement = trigger ?? null
  }
}
function attachPreventUnmountOnClose(eventDetails) {
  let preventUnmountOnClose = false
  eventDetails.preventUnmountOnClose = () => {
    preventUnmountOnClose = true
  }
  return () => preventUnmountOnClose
}
/**
 * Sets up trigger data forwarding to the store.
 *
 * @param triggerId Id of the trigger.
 * @param triggerElementRef Ref for the trigger DOM element.
 * @param store The Store instance managing the popup state.
 * @param stateUpdates An object with state updates to apply when the trigger is active.
 */
function useTriggerDataForwarding(triggerId, triggerElementRef, store, stateUpdates) {
  const isMountedByThisTrigger = store.useState("isMountedByTrigger", triggerId)
  const baseRegisterTrigger = useTriggerRegistration(triggerId, store)
  const applyTriggerData = useStableCallback((element) => {
    const open = store.select("open")
    const activeTriggerId = store.select("activeTriggerId")
    if (activeTriggerId === triggerId) {
      store.update({
        activeTriggerElement: element,
        ...(open ? stateUpdates : null),
      })
      return
    }
    if (activeTriggerId == null && open)
      store.update({
        activeTriggerId: triggerId,
        activeTriggerElement: element,
        ...stateUpdates,
      })
  })
  const registerTrigger = import_react.useCallback(
    (element) => {
      baseRegisterTrigger(element)
      if (element) applyTriggerData(element)
    },
    [baseRegisterTrigger, applyTriggerData],
  )
  useIsoLayoutEffect(() => {
    if (isMountedByThisTrigger)
      store.update({
        activeTriggerElement: triggerElementRef.current,
        ...stateUpdates,
      })
  }, [isMountedByThisTrigger, store, triggerElementRef, ...Object.values(stateUpdates)])
  return {
    registerTrigger,
    isMountedByThisTrigger,
  }
}
/**
 * Keeps trigger registration state synchronized while the popup is open.
 *
 * When a popup opens without an explicit trigger id and exactly one trigger is registered, that
 * trigger is claimed as the active trigger. When the active trigger id is still registered but its
 * element changed, the active element is refreshed. When the active trigger id is missing from the
 * registry but the same element is still registered under a different id (e.g. the rendered trigger
 * carries its own DOM `id` that differs from Base UI's internal trigger id), the active id is
 * reassociated to the registered id instead of being treated as lost. When the active trigger
 * unregisters, the default path preserves existing ownership so non-closing popup families do not
 * silently claim a different trigger while staying open.
 *
 * If `closeOnActiveTriggerUnmount` is enabled, unregistering a previously resolved active trigger
 * requests a close after a microtask so a same-tick replacement trigger with the same id can
 * register first. An active trigger id that has not matched a registered trigger yet is treated as
 * pending and does not request a close.
 *
 * This should be called on the Root part.
 *
 * @param store The Store instance managing the popup state.
 * @param options Options for active trigger unmount behavior.
 */
function useImplicitActiveTrigger(store, options = {}) {
  const { closeOnActiveTriggerUnmount = false } = options
  const resolvedActiveTriggerIdRef = import_react.useRef(null)
  const open = store.useState("open")
  useIsoLayoutEffect(() => {
    if (!open) {
      resolvedActiveTriggerIdRef.current = null
      if (store.state.triggerCount !== 0) store.set("triggerCount", 0)
      return
    }
    const triggerCount = store.context.triggerElements.size
    const stateUpdates = {}
    if (store.state.triggerCount !== triggerCount) stateUpdates.triggerCount = triggerCount
    const currentActiveTriggerId = store.select("activeTriggerId")
    let lostActiveTriggerId = null
    if (currentActiveTriggerId) {
      const activeTriggerElement = store.context.triggerElements.getById(currentActiveTriggerId)
      if (!activeTriggerElement) {
        for (const [triggerId, triggerElement] of store.context.triggerElements.entries())
          if (triggerElement === store.state.activeTriggerElement) {
            stateUpdates.activeTriggerId = triggerId
            stateUpdates.activeTriggerElement = triggerElement
            resolvedActiveTriggerIdRef.current = triggerId
            break
          }
        if (stateUpdates.activeTriggerId === void 0) {
          if (resolvedActiveTriggerIdRef.current === currentActiveTriggerId)
            lostActiveTriggerId = currentActiveTriggerId
          else resolvedActiveTriggerIdRef.current = null
        }
      } else {
        resolvedActiveTriggerIdRef.current = currentActiveTriggerId
        if (activeTriggerElement !== store.state.activeTriggerElement)
          stateUpdates.activeTriggerElement = activeTriggerElement
      }
    } else resolvedActiveTriggerIdRef.current = null
    if (!lostActiveTriggerId && !currentActiveTriggerId && triggerCount === 1) {
      const iteratorResult = store.context.triggerElements.entries().next()
      if (!iteratorResult.done) {
        const [implicitTriggerId, implicitTriggerElement] = iteratorResult.value
        stateUpdates.activeTriggerId = implicitTriggerId
        stateUpdates.activeTriggerElement = implicitTriggerElement
        resolvedActiveTriggerIdRef.current = implicitTriggerId
      }
    }
    if (
      stateUpdates.triggerCount !== void 0 ||
      stateUpdates.activeTriggerId !== void 0 ||
      stateUpdates.activeTriggerElement !== void 0
    )
      store.update(stateUpdates)
    if (lostActiveTriggerId) {
      if (closeOnActiveTriggerUnmount)
        queueMicrotask(() => {
          if (
            store.select("open") &&
            store.select("activeTriggerId") === lostActiveTriggerId &&
            !store.context.triggerElements.getById(lostActiveTriggerId)
          ) {
            const eventDetails = createChangeEventDetails(none)
            store.setOpen(false, eventDetails)
            if (!eventDetails.isCanceled)
              store.update({
                activeTriggerId: null,
                activeTriggerElement: null,
              })
          }
        })
    }
  }, [
    open,
    store,
    store.useState("triggerCount"),
    store.useState("activeTriggerId"),
    store.useState("activeTriggerElement"),
    closeOnActiveTriggerUnmount,
  ])
}
/**
 * Manages the mounted state of the popup.
 * Sets up the transition status listeners and handles unmounting when needed.
 * Updates the `mounted`, `transitionStatus`, and `preventUnmountingOnClose` states in the store.
 *
 * @param open Whether the popup is open.
 * @param store The Store instance managing the popup state.
 * @param onUnmount Optional callback to be called when the popup is unmounted.
 *
 * @returns A function to forcibly unmount the popup.
 */
function useOpenStateTransitions(open, store, onUnmount) {
  const { mounted, setMounted, transitionStatus } = useTransitionStatus(open)
  const preventUnmountingOnClose = store.useState("preventUnmountingOnClose")
  const syncedPreventUnmountingOnClose = open ? false : preventUnmountingOnClose
  store.useSyncedValues({
    mounted,
    transitionStatus,
    preventUnmountingOnClose: syncedPreventUnmountingOnClose,
  })
  const forceUnmount = useStableCallback(() => {
    setMounted(false)
    store.update({
      activeTriggerId: null,
      activeTriggerElement: null,
      mounted: false,
      preventUnmountingOnClose: false,
    })
    onUnmount?.()
    store.context.onOpenChangeComplete?.(false)
  })
  useOpenChangeComplete({
    enabled: mounted && !open && !syncedPreventUnmountingOnClose,
    open,
    ref: store.context.popupRef,
    onComplete() {
      if (!open) forceUnmount()
    },
  })
  return {
    forceUnmount,
    transitionStatus,
  }
}
function usePopupInteractionProps(store, statePart) {
  store.useSyncedValues(statePart)
  useIsoLayoutEffect(
    () => () => {
      store.update({
        activeTriggerProps: EMPTY_OBJECT,
        inactiveTriggerProps: EMPTY_OBJECT,
        popupProps: EMPTY_OBJECT,
      })
    },
    [store],
  )
}
function usePopupRootSync(store, open) {
  useIsoLayoutEffect(() => {
    if (!open && store.state.openMethod !== null) store.set("openMethod", null)
  }, [open, store])
  useIsoLayoutEffect(
    () => () => {
      if (store.state.openMethod !== null) store.set("openMethod", null)
    },
    [store],
  )
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/utils/popups/popupTriggerMap.mjs
/**
 * Data structure to keep track of popup trigger elements by their IDs.
 *
 * Element lookups iterate the id map rather than maintaining a parallel Set. Registration is O(1),
 * while `hasElement` and `hasMatchingElement` are linear in the number of triggers.
 */
const PopupTriggerMap = class {
  constructor() {
    this.idMap = /* @__PURE__ */ new Map()
  }
  /**
   * Adds a trigger element with the given ID.
   *
   * Note: The provided element is assumed to not be registered under multiple IDs.
   */
  add(id, element) {
    this.idMap.set(id, element)
  }
  /**
   * Removes the trigger element with the given ID.
   */
  delete(id) {
    this.idMap.delete(id)
  }
  /**
   * Whether the given element is registered as a trigger.
   */
  hasElement(element) {
    for (const registered of this.idMap.values()) if (registered === element) return true
    return false
  }
  /**
   * Whether there is a registered trigger element matching the given predicate.
   */
  hasMatchingElement(predicate) {
    for (const element of this.idMap.values()) if (predicate(element)) return true
    return false
  }
  /**
   * Returns the trigger element associated with the given ID, or undefined if no such element exists.
   */
  getById(id) {
    return this.idMap.get(id)
  }
  /**
   * Returns an iterable of all registered trigger entries, where each entry is a tuple of [id, element].
   */
  entries() {
    return this.idMap.entries()
  }
  /**
   * Returns an iterable of all registered trigger elements.
   */
  elements() {
    return this.idMap.values()
  }
  /**
   * Returns the number of registered trigger elements.
   */
  get size() {
    return this.idMap.size
  }
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/floating-ui-react/utils/getEmptyRootContext.mjs
function getEmptyRootContext() {
  return new FloatingRootStore({
    open: false,
    transitionStatus: void 0,
    floatingElement: null,
    referenceElement: null,
    triggerElements: new PopupTriggerMap(),
    floatingId: void 0,
    syncOnly: false,
    nested: false,
    onOpenChange: void 0,
  })
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/utils/popups/store.mjs
/**
 * State common to all popup stores.
 */
function createInitialPopupStoreState() {
  return {
    open: false,
    openProp: void 0,
    mounted: false,
    transitionStatus: void 0,
    floatingRootContext: getEmptyRootContext(),
    floatingId: void 0,
    triggerCount: 0,
    preventUnmountingOnClose: false,
    payload: void 0,
    activeTriggerId: null,
    activeTriggerElement: null,
    triggerIdProp: void 0,
    popupElement: null,
    positionerElement: null,
    activeTriggerProps: EMPTY_OBJECT,
    inactiveTriggerProps: EMPTY_OBJECT,
    popupProps: EMPTY_OBJECT,
  }
}
function createPopupFloatingRootContext(triggerElements, floatingId, nested = false) {
  return new FloatingRootStore({
    open: false,
    transitionStatus: void 0,
    floatingElement: null,
    referenceElement: null,
    triggerElements,
    floatingId,
    syncOnly: true,
    nested,
    onOpenChange: void 0,
  })
}
const activeTriggerIdSelector = (state) => state.triggerIdProp ?? state.activeTriggerId
const openSelector = (state) => state.openProp ?? state.open
const popupIdSelector = (state) => {
  return (state.popupElement?.id ?? state.floatingId) || void 0
}
function triggerOwnsOpenPopup(state, triggerId) {
  return triggerId !== void 0 && openSelector(state) && activeTriggerIdSelector(state) === triggerId
}
function triggerOwnsOpenPopupOrIsOnlyTrigger(state, triggerId) {
  if (triggerOwnsOpenPopup(state, triggerId)) return true
  return (
    triggerId !== void 0 &&
    openSelector(state) &&
    activeTriggerIdSelector(state) == null &&
    state.triggerCount === 1
  )
}
const popupStoreSelectors = {
  open: openSelector,
  mounted: (state) => state.mounted,
  transitionStatus: (state) => state.transitionStatus,
  floatingRootContext: (state) => state.floatingRootContext,
  triggerCount: (state) => state.triggerCount,
  preventUnmountingOnClose: (state) => state.preventUnmountingOnClose,
  payload: (state) => state.payload,
  activeTriggerId: activeTriggerIdSelector,
  activeTriggerElement: (state) => (state.mounted ? state.activeTriggerElement : null),
  popupId: popupIdSelector,
  /**
   * Whether the trigger with the given ID was used to open the popup.
   */
  isTriggerActive: (state, triggerId) =>
    triggerId !== void 0 && activeTriggerIdSelector(state) === triggerId,
  /**
   * Whether the popup is open and was activated by a trigger with the given ID.
   */
  isOpenedByTrigger: (state, triggerId) => triggerOwnsOpenPopup(state, triggerId),
  /**
   * Whether the popup is mounted and was activated by a trigger with the given ID.
   */
  isMountedByTrigger: (state, triggerId) =>
    triggerId !== void 0 && activeTriggerIdSelector(state) === triggerId && state.mounted,
  triggerProps: (state, isActive) =>
    isActive ? state.activeTriggerProps : state.inactiveTriggerProps,
  /**
   * Popup id for the trigger that currently owns the open popup.
   */
  triggerPopupId: (state, triggerId) =>
    triggerOwnsOpenPopupOrIsOnlyTrigger(state, triggerId) ? popupIdSelector(state) : void 0,
  popupProps: (state) => state.popupProps,
  popupElement: (state) => state.popupElement,
  positionerElement: (state) => state.positionerElement,
}
/**
 * Store members a detached handle-backed trigger reads or invokes for trigger registration and data
 * forwarding. `set`/`update` are included only for trigger-count and trigger-data bookkeeping; on a
 * detached (inert) store they are intentionally no-ops, so a write through them is not guaranteed to
 * be durable. Component handle-store views Pick these from their concrete store (preserving its
 * context and selectors) and add any component-specific trigger-invoked members such as `setOpen`.
 */
/**
 * The subset of a popup store that trigger registration and data forwarding rely on. Narrow enough
 * that an inert store can be passed while detached.
 */
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/utils/popups/usePopupHandleStore.mjs
/**
 * Reads the store currently exposed by a popup handle and subscribes to store-pointer changes.
 * Detached triggers use this to follow a handle as a root attaches or detaches: while no root is
 * attached, the handle exposes its fallback store; once a root attaches, subscribers re-render and
 * read from the live root store.
 *
 * Returns `undefined` when no handle is provided so callers can fall back to their root context.
 *
 * @param handle The popup handle to read from, or `undefined` when the trigger is not handle-bound.
 */
function usePopupHandleStore(handle) {
  const subscribe = import_react.useCallback(
    (listener) => {
      if (handle === void 0) return NOOP
      return handle.subscribeStore(listener)
    },
    [handle],
  )
  const getSnapshot = import_react.useCallback(() => {
    return handle === void 0 ? void 0 : handle.store
  }, [handle])
  return (0, import_shim.useSyncExternalStore)(subscribe, getSnapshot, () => handle?.serverStore)
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/floating-ui-react/hooks/useFloating.mjs
/**
 * Base UI's private `useFloating` path. The caller must supply the root store, so this skips the
 * internal root-context hook used by the public Floating UI-compatible API.
 */
function useBaseUIFloating(options) {
  return useFloatingWithStore(options, options.rootContext)
}
function useFloatingWithStore(options, store) {
  const { nodeId, externalTree } = options
  const referenceElement = store.useState("referenceElement")
  const floatingElement = store.useState("floatingElement")
  const domReferenceElement = store.useState("domReferenceElement")
  const open = store.useState("open")
  const floatingId = store.useState("floatingId")
  const [positionReference, setPositionReferenceRaw] = import_react.useState(null)
  const [localDomReference, setLocalDomReference] = import_react.useState(void 0)
  const [localFloatingElement, setLocalFloatingElement] = import_react.useState(void 0)
  const domReferenceRef = import_react.useRef(null)
  const tree = useFloatingTree(externalTree)
  const storeElements = import_react.useMemo(
    () => ({
      reference: referenceElement,
      floating: floatingElement,
      domReference: domReferenceElement,
    }),
    [referenceElement, floatingElement, domReferenceElement],
  )
  const position = useFloating({
    ...options,
    elements: {
      ...storeElements,
      ...(positionReference && { reference: positionReference }),
    },
  })
  const localDomReferenceElement = isElement(localDomReference) ? localDomReference : null
  const syncedFloatingElement =
    localFloatingElement === void 0 ? store.state.floatingElement : localFloatingElement
  store.useSyncedValue("referenceElement", localDomReference ?? null)
  store.useSyncedValue(
    "domReferenceElement",
    localDomReference === void 0 ? domReferenceElement : localDomReferenceElement,
  )
  store.useSyncedValue("floatingElement", syncedFloatingElement)
  const setPositionReference = import_react.useCallback(
    (node) => {
      const computedPositionReference = isElement(node)
        ? {
            getBoundingClientRect: () => node.getBoundingClientRect(),
            getClientRects: () => node.getClientRects(),
            contextElement: node,
          }
        : node
      setPositionReferenceRaw(computedPositionReference)
      position.refs.setReference(computedPositionReference)
    },
    [position.refs],
  )
  const setReference = import_react.useCallback(
    (node) => {
      if (isElement(node) || node === null) {
        domReferenceRef.current = node
        setLocalDomReference(node)
      }
      if (
        isElement(position.refs.reference.current) ||
        position.refs.reference.current === null ||
        (node !== null && !isElement(node))
      )
        position.refs.setReference(node)
    },
    [position.refs, setLocalDomReference],
  )
  const setFloating = import_react.useCallback(
    (node) => {
      setLocalFloatingElement(node)
      position.refs.setFloating(node)
    },
    [position.refs],
  )
  const refs = import_react.useMemo(
    () => ({
      ...position.refs,
      setReference,
      setFloating,
      setPositionReference,
      domReference: domReferenceRef,
    }),
    [position.refs, setReference, setFloating, setPositionReference],
  )
  const elements = import_react.useMemo(
    () => ({
      ...position.elements,
      domReference: domReferenceElement,
    }),
    [position.elements, domReferenceElement],
  )
  const context = import_react.useMemo(
    () => ({
      ...position,
      dataRef: store.context.dataRef,
      open,
      onOpenChange: store.setOpen,
      events: store.context.events,
      floatingId,
      refs,
      elements,
      nodeId,
      rootStore: store,
    }),
    [position, refs, elements, nodeId, store, open, floatingId],
  )
  useIsoLayoutEffect(() => {
    if (domReferenceElement) domReferenceRef.current = domReferenceElement
  }, [domReferenceElement])
  useIsoLayoutEffect(() => {
    store.context.dataRef.current.floatingContext = context
    const node = tree?.nodesRef.current.find((n) => n.id === nodeId)
    if (node) node.context = context
  })
  return import_react.useMemo(
    () => ({
      ...position,
      context,
      refs,
      elements,
      rootStore: store,
    }),
    [position, refs, elements, context, store],
  )
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/floating-ui-react/hooks/useHoverInteractionSharedState.mjs
const HoverInteraction = class HoverInteraction {
  constructor() {
    this.pointerType = void 0
    this.interactedInside = false
    this.handler = void 0
    this.blockMouseMove = true
    this.performedPointerEventsMutation = false
    this.pointerEventsScopeElement = null
    this.pointerEventsReferenceElement = null
    this.pointerEventsFloatingElement = null
    this.restTimeoutPending = false
    this.openChangeTimeout = new Timeout()
    this.restTimeout = new Timeout()
    this.handleCloseOptions = void 0
  }
  static create() {
    return new HoverInteraction()
  }
  dispose = () => {
    this.openChangeTimeout.clear()
    this.restTimeout.clear()
  }
  disposeEffect = () => {
    return this.dispose
  }
}
const pointerEventsMutationOwnerByScopeElement = /* @__PURE__ */ new WeakMap()
function clearSafePolygonPointerEventsMutation(instance) {
  if (!instance.performedPointerEventsMutation) return
  const scopeElement = instance.pointerEventsScopeElement
  if (scopeElement && pointerEventsMutationOwnerByScopeElement.get(scopeElement) === instance) {
    instance.pointerEventsScopeElement?.style.removeProperty("pointer-events")
    instance.pointerEventsReferenceElement?.style.removeProperty("pointer-events")
    instance.pointerEventsFloatingElement?.style.removeProperty("pointer-events")
    pointerEventsMutationOwnerByScopeElement.delete(scopeElement)
  }
  instance.performedPointerEventsMutation = false
  instance.pointerEventsScopeElement = null
  instance.pointerEventsReferenceElement = null
  instance.pointerEventsFloatingElement = null
}
function applySafePolygonPointerEventsMutation(instance, options) {
  const { scopeElement, referenceElement, floatingElement } = options
  const existingOwner = pointerEventsMutationOwnerByScopeElement.get(scopeElement)
  if (existingOwner && existingOwner !== instance)
    clearSafePolygonPointerEventsMutation(existingOwner)
  clearSafePolygonPointerEventsMutation(instance)
  instance.performedPointerEventsMutation = true
  instance.pointerEventsScopeElement = scopeElement
  instance.pointerEventsReferenceElement = referenceElement
  instance.pointerEventsFloatingElement = floatingElement
  pointerEventsMutationOwnerByScopeElement.set(scopeElement, instance)
  scopeElement.style.pointerEvents = "none"
  referenceElement.style.pointerEvents = "auto"
  floatingElement.style.pointerEvents = "auto"
}
function useHoverInteractionSharedState(store) {
  const data = store.context.dataRef.current
  const instance = useRefWithInit(
    () => data.hoverInteractionState ?? HoverInteraction.create(),
  ).current
  if (!data.hoverInteractionState) data.hoverInteractionState = instance
  useOnMount(data.hoverInteractionState.disposeEffect)
  return data.hoverInteractionState
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/floating-ui-react/hooks/useHoverFloatingInteraction.mjs
/**
 * Provides hover interactions that should be attached to the floating element.
 */
function useHoverFloatingInteraction(context, parameters = {}) {
  const { enabled = true, closeDelay: closeDelayProp = 0, nodeId: nodeIdProp } = parameters
  const store = "rootStore" in context ? context.rootStore : context
  const open = store.useState("open")
  const floatingElement = store.useState("floatingElement")
  const domReferenceElement = store.useState("domReferenceElement")
  const { dataRef } = store.context
  const tree = useFloatingTree()
  const parentId = useFloatingParentNodeId()
  const instance = useHoverInteractionSharedState(store)
  const childClosedTimeout = useTimeout()
  const isClickLikeOpenEvent$2 = useStableCallback(() => {
    return isClickLikeOpenEvent(dataRef.current.openEvent?.type, instance.interactedInside)
  })
  const isHoverOpen = useStableCallback(() => {
    return isHoverOpenEvent(dataRef.current.openEvent?.type)
  })
  const clearPointerEvents = useStableCallback(() => {
    clearSafePolygonPointerEventsMutation(instance)
  })
  useIsoLayoutEffect(() => {
    if (!open) {
      instance.pointerType = void 0
      instance.restTimeoutPending = false
      instance.interactedInside = false
      clearPointerEvents()
    }
  }, [open, instance, clearPointerEvents])
  import_react.useEffect(() => {
    return clearPointerEvents
  }, [clearPointerEvents])
  useIsoLayoutEffect(() => {
    if (!enabled) return
    if (
      open &&
      instance.handleCloseOptions?.blockPointerEvents &&
      isHoverOpen() &&
      isElement(domReferenceElement) &&
      floatingElement
    ) {
      const ref = domReferenceElement
      const floatingEl = floatingElement
      const doc = ownerDocument(floatingElement)
      const parentFloating = tree?.nodesRef.current.find((node) => node.id === parentId)?.context
        ?.elements.floating
      if (parentFloating) parentFloating.style.pointerEvents = ""
      const cachedScopeElement =
        instance.pointerEventsScopeElement !== floatingEl
          ? instance.pointerEventsScopeElement
          : null
      const parentScopeElement = parentFloating !== floatingEl ? parentFloating : null
      const scopeElement =
        instance.handleCloseOptions?.getScope?.() ??
        cachedScopeElement ??
        parentScopeElement ??
        ref.closest("[data-rootownerid]") ??
        doc.body
      applySafePolygonPointerEventsMutation(instance, {
        scopeElement,
        referenceElement: ref,
        floatingElement: floatingEl,
      })
      return () => {
        clearPointerEvents()
      }
    }
  }, [
    enabled,
    open,
    domReferenceElement,
    floatingElement,
    instance,
    isHoverOpen,
    tree,
    parentId,
    clearPointerEvents,
  ])
  import_react.useEffect(() => {
    if (!enabled) return
    function hasParentChildren() {
      return Boolean(
        tree && parentId && getNodeChildren(tree.nodesRef.current, parentId).length > 0,
      )
    }
    function closeWithDelay(event) {
      const closeDelay = getDelay(closeDelayProp, "close", instance.pointerType)
      const close = () => {
        store.setOpen(false, createChangeEventDetails(triggerHover, event))
        tree?.events.emit("floating.closed", event)
      }
      if (closeDelay) instance.openChangeTimeout.start(closeDelay, close)
      else {
        instance.openChangeTimeout.clear()
        close()
      }
    }
    function handleInteractInside(event) {
      const target = getTarget(event)
      if (!isInteractiveElement(target)) {
        instance.interactedInside = false
        return
      }
      instance.interactedInside = target?.closest("[aria-haspopup]") != null
    }
    function onFloatingMouseEnter() {
      instance.openChangeTimeout.clear()
      childClosedTimeout.clear()
      tree?.events.off("floating.closed", onNodeClosed)
      clearPointerEvents()
    }
    function onFloatingMouseLeave(event) {
      if (hasParentChildren() && tree) {
        tree.events.on("floating.closed", onNodeClosed)
        return
      }
      if (isTargetInsideEnabledTrigger(event.relatedTarget, store.context.triggerElements)) return
      const currentNodeId = dataRef.current.floatingContext?.nodeId ?? nodeIdProp
      const relatedTarget = event.relatedTarget
      if (
        tree &&
        currentNodeId &&
        isElement(relatedTarget) &&
        getNodeChildren(tree.nodesRef.current, currentNodeId, false).some((node) =>
          contains(node.context?.elements.floating, relatedTarget),
        )
      )
        return
      if (instance.handler) {
        instance.handler(event)
        return
      }
      clearPointerEvents()
      if (isHoverOpen() && !isClickLikeOpenEvent$2()) closeWithDelay(event)
    }
    function onNodeClosed(event) {
      if (!tree || !parentId || hasParentChildren()) return
      childClosedTimeout.start(0, () => {
        tree.events.off("floating.closed", onNodeClosed)
        store.setOpen(false, createChangeEventDetails(triggerHover, event))
        tree.events.emit("floating.closed", event)
      })
    }
    const floating = floatingElement
    return mergeCleanups(
      floating && addEventListener(floating, "mouseenter", onFloatingMouseEnter),
      floating && addEventListener(floating, "mouseleave", onFloatingMouseLeave),
      floating && addEventListener(floating, "pointerdown", handleInteractInside, true),
      () => {
        tree?.events.off("floating.closed", onNodeClosed)
      },
    )
  }, [
    enabled,
    floatingElement,
    store,
    dataRef,
    closeDelayProp,
    nodeIdProp,
    isHoverOpen,
    isClickLikeOpenEvent$2,
    clearPointerEvents,
    instance,
    tree,
    parentId,
    childClosedTimeout,
  ])
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/floating-ui-react/hooks/useHoverReferenceInteraction.mjs
const EMPTY_REF = { current: null }
/**
 * Provides hover interactions that should be attached to reference or trigger
 * elements.
 */
function useHoverReferenceInteraction(context, props = {}) {
  const {
    enabled = true,
    delay = 0,
    handleClose = null,
    mouseOnly = false,
    restMs = 0,
    move = true,
    triggerElementRef = EMPTY_REF,
    externalTree,
    isActiveTrigger = true,
    getHandleCloseContext,
    isClosing,
    shouldOpen: shouldOpenProp,
    guardStaleOpen = false,
  } = props
  const store = "rootStore" in context ? context.rootStore : context
  const { dataRef, events } = store.context
  const tree = useFloatingTree(externalTree)
  const instance = useHoverInteractionSharedState(store)
  const isHoverCloseActiveRef = import_react.useRef(false)
  const handleCloseRef = useValueAsRef(handleClose)
  const delayRef = useValueAsRef(delay)
  const restMsRef = useValueAsRef(restMs)
  const enabledRef = useValueAsRef(enabled)
  const shouldOpenRef = useValueAsRef(shouldOpenProp)
  const isClosingRef = useValueAsRef(isClosing)
  const isClickLikeOpenEvent$1 = useStableCallback(() => {
    return isClickLikeOpenEvent(dataRef.current.openEvent?.type, instance.interactedInside)
  })
  const checkShouldOpen = useStableCallback(() => {
    return shouldOpenRef.current?.() !== false
  })
  const isOverInactiveTrigger = useStableCallback((currentDomReference, currentTarget, target) => {
    const allTriggers = store.context.triggerElements
    if (allTriggers.hasElement(currentTarget))
      return !currentDomReference || !contains(currentDomReference, currentTarget)
    if (!isElement(target)) return false
    const targetElement = target
    return (
      allTriggers.hasMatchingElement((trigger) => contains(trigger, targetElement)) &&
      (!currentDomReference || !contains(currentDomReference, targetElement))
    )
  })
  const cleanupMouseMoveHandler = useStableCallback(() => {
    if (!instance.handler) return
    ownerDocument(store.select("domReferenceElement")).removeEventListener(
      "mousemove",
      instance.handler,
    )
    instance.handler = void 0
  })
  const clearPointerEvents = useStableCallback(() => {
    clearSafePolygonPointerEventsMutation(instance)
  })
  if (isActiveTrigger) instance.handleCloseOptions = handleCloseRef.current?.__options
  import_react.useEffect(() => cleanupMouseMoveHandler, [cleanupMouseMoveHandler])
  import_react.useEffect(() => {
    if (!enabled) return
    function onOpenChangeLocal(details) {
      if (!details.open) {
        isHoverCloseActiveRef.current = details.reason === triggerHover
        cleanupMouseMoveHandler()
        instance.openChangeTimeout.clear()
        instance.restTimeout.clear()
        instance.blockMouseMove = true
        instance.restTimeoutPending = false
      } else isHoverCloseActiveRef.current = false
    }
    events.on("openchange", onOpenChangeLocal)
    return () => {
      events.off("openchange", onOpenChangeLocal)
    }
  }, [enabled, events, instance, cleanupMouseMoveHandler])
  import_react.useEffect(() => {
    if (!enabled) return
    function closeWithDelay(event, runElseBranch = true) {
      const closeDelay = getDelay(delayRef.current, "close", instance.pointerType)
      if (closeDelay)
        instance.openChangeTimeout.start(closeDelay, () => {
          store.setOpen(false, createChangeEventDetails(triggerHover, event))
          tree?.events.emit("floating.closed", event)
        })
      else if (runElseBranch) {
        instance.openChangeTimeout.clear()
        store.setOpen(false, createChangeEventDetails(triggerHover, event))
        tree?.events.emit("floating.closed", event)
      }
    }
    const trigger =
      triggerElementRef.current ?? (isActiveTrigger ? store.select("domReferenceElement") : null)
    if (!isElement(trigger)) return
    function onMouseEnter(event) {
      instance.openChangeTimeout.clear()
      instance.blockMouseMove = false
      if (mouseOnly && !isMouseLikePointerType(instance.pointerType)) return
      const restMsValue = getRestMs(restMsRef.current)
      const openDelay = getDelay(delayRef.current, "open", instance.pointerType)
      const eventTarget = getTarget(event)
      const currentTarget = event.currentTarget ?? null
      const currentDomReference = store.select("domReferenceElement")
      let triggerNode = currentTarget
      if (isElement(eventTarget) && !store.context.triggerElements.hasElement(eventTarget)) {
        for (const triggerElement of store.context.triggerElements.elements())
          if (contains(triggerElement, eventTarget)) {
            triggerNode = triggerElement
            break
          }
      }
      if (
        isElement(currentTarget) &&
        isElement(currentDomReference) &&
        !store.context.triggerElements.hasElement(currentTarget) &&
        contains(currentTarget, currentDomReference)
      )
        triggerNode = currentDomReference
      const isOverInactive =
        triggerNode == null
          ? false
          : isOverInactiveTrigger(currentDomReference, triggerNode, eventTarget)
      const isOpen = store.select("open")
      const isInClosingTransition =
        isClosingRef.current?.() ?? store.select("transitionStatus") === "ending"
      const isHoverCloseTransition =
        !isOpen && isInClosingTransition && isHoverCloseActiveRef.current
      const isReenteringSameTriggerDuringCloseTransition =
        !isOverInactive &&
        isElement(triggerNode) &&
        isElement(currentDomReference) &&
        contains(currentDomReference, triggerNode) &&
        isHoverCloseTransition
      const isRestOnlyDelay = restMsValue > 0 && !openDelay
      const shouldOpenImmediately =
        (isOverInactive && (isOpen || isHoverCloseTransition)) ||
        isReenteringSameTriggerDuringCloseTransition
      const shouldOpen = !isOpen || isOverInactive
      if (shouldOpenImmediately) {
        if (checkShouldOpen())
          store.setOpen(true, createChangeEventDetails(triggerHover, event, triggerNode))
        return
      }
      if (isRestOnlyDelay) return
      if (openDelay)
        instance.openChangeTimeout.start(openDelay, () => {
          if (shouldOpen && checkShouldOpen())
            store.setOpen(true, createChangeEventDetails(triggerHover, event, triggerNode))
        })
      else if (shouldOpen) {
        if (checkShouldOpen())
          store.setOpen(true, createChangeEventDetails(triggerHover, event, triggerNode))
      }
    }
    function onMouseLeave(event) {
      if (isClickLikeOpenEvent$1()) {
        clearPointerEvents()
        return
      }
      cleanupMouseMoveHandler()
      const doc = ownerDocument(store.select("domReferenceElement"))
      instance.restTimeout.clear()
      instance.restTimeoutPending = false
      const handleCloseContextBase = dataRef.current.floatingContext ?? getHandleCloseContext?.()
      if (isTargetInsideEnabledTrigger(event.relatedTarget, store.context.triggerElements)) return
      if (handleCloseRef.current && handleCloseContextBase) {
        if (!store.select("open")) instance.openChangeTimeout.clear()
        const currentTrigger = triggerElementRef.current
        instance.handler = handleCloseRef.current({
          ...handleCloseContextBase,
          tree,
          x: event.clientX,
          y: event.clientY,
          onClose() {
            clearPointerEvents()
            cleanupMouseMoveHandler()
            if (
              enabledRef.current &&
              !isClickLikeOpenEvent$1() &&
              currentTrigger === store.select("domReferenceElement")
            )
              closeWithDelay(event, true)
          },
        })
        doc.addEventListener("mousemove", instance.handler)
        instance.handler(event)
        return
      }
      if (
        instance.pointerType === "touch"
          ? !contains(store.select("floatingElement"), event.relatedTarget)
          : true
      )
        closeWithDelay(event)
    }
    function onMouseOut(event) {
      if (contains(trigger, event.relatedTarget)) return
      instance.openChangeTimeout.clear()
      instance.restTimeout.clear()
      instance.restTimeoutPending = false
    }
    const staleOpenGuard = guardStaleOpen
      ? addEventListener(trigger, "mouseout", onMouseOut)
      : void 0
    if (move)
      return mergeCleanups(
        addEventListener(trigger, "mousemove", onMouseEnter, { once: true }),
        addEventListener(trigger, "mouseenter", onMouseEnter),
        addEventListener(trigger, "mouseleave", onMouseLeave),
        staleOpenGuard,
      )
    return mergeCleanups(
      addEventListener(trigger, "mouseenter", onMouseEnter),
      addEventListener(trigger, "mouseleave", onMouseLeave),
      staleOpenGuard,
    )
  }, [
    cleanupMouseMoveHandler,
    clearPointerEvents,
    dataRef,
    delayRef,
    store,
    enabled,
    handleCloseRef,
    instance,
    isActiveTrigger,
    isOverInactiveTrigger,
    isClickLikeOpenEvent$1,
    mouseOnly,
    move,
    restMsRef,
    triggerElementRef,
    tree,
    enabledRef,
    getHandleCloseContext,
    isClosingRef,
    checkShouldOpen,
    guardStaleOpen,
  ])
  return import_react.useMemo(() => {
    if (!enabled) return
    function setPointerRef(event) {
      instance.pointerType = event.pointerType
    }
    return {
      onPointerDown: setPointerRef,
      onPointerEnter: setPointerRef,
      onMouseMove(event) {
        const { nativeEvent } = event
        const trigger = event.currentTarget
        const currentDomReference = store.select("domReferenceElement")
        const currentOpen = store.select("open")
        const isOverInactive = isOverInactiveTrigger(currentDomReference, trigger, event.target)
        if (mouseOnly && !isMouseLikePointerType(instance.pointerType)) return
        if (currentOpen && isOverInactive && instance.handleCloseOptions?.blockPointerEvents) {
          const floatingElement = store.select("floatingElement")
          if (floatingElement) {
            const scopeElement =
              instance.handleCloseOptions?.getScope?.() ?? trigger.ownerDocument.body
            applySafePolygonPointerEventsMutation(instance, {
              scopeElement,
              referenceElement: trigger,
              floatingElement,
            })
          }
        }
        const restMsValue = getRestMs(restMsRef.current)
        if ((currentOpen && !isOverInactive) || restMsValue === 0) return
        if (
          !isOverInactive &&
          instance.restTimeoutPending &&
          event.movementX ** 2 + event.movementY ** 2 < 2
        )
          return
        instance.restTimeout.clear()
        function handleMouseMove() {
          instance.restTimeoutPending = false
          if (isClickLikeOpenEvent$1()) return
          const latestOpen = store.select("open")
          if (!instance.blockMouseMove && (!latestOpen || isOverInactive) && checkShouldOpen())
            store.setOpen(true, createChangeEventDetails(triggerHover, nativeEvent, trigger))
        }
        if (instance.pointerType === "touch")
          import_react_dom.flushSync(() => {
            handleMouseMove()
          })
        else if (isOverInactive && currentOpen) handleMouseMove()
        else {
          instance.restTimeoutPending = true
          instance.restTimeout.start(restMsValue, handleMouseMove)
        }
      },
    }
  }, [
    enabled,
    instance,
    isClickLikeOpenEvent$1,
    isOverInactiveTrigger,
    mouseOnly,
    store,
    restMsRef,
    checkShouldOpen,
  ])
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/floating-ui-react/safePolygon.mjs
const CURSOR_SPEED_THRESHOLD = 0.1
const CURSOR_SPEED_THRESHOLD_SQUARED = CURSOR_SPEED_THRESHOLD * CURSOR_SPEED_THRESHOLD
const POLYGON_BUFFER = 0.5
function hasIntersectingEdge(pointX, pointY, xi, yi, xj, yj) {
  return yi >= pointY !== yj >= pointY && pointX <= ((xj - xi) * (pointY - yi)) / (yj - yi) + xi
}
function isPointInQuadrilateral(pointX, pointY, x1, y1, x2, y2, x3, y3, x4, y4) {
  let isInsideValue = false
  if (hasIntersectingEdge(pointX, pointY, x1, y1, x2, y2)) isInsideValue = !isInsideValue
  if (hasIntersectingEdge(pointX, pointY, x2, y2, x3, y3)) isInsideValue = !isInsideValue
  if (hasIntersectingEdge(pointX, pointY, x3, y3, x4, y4)) isInsideValue = !isInsideValue
  if (hasIntersectingEdge(pointX, pointY, x4, y4, x1, y1)) isInsideValue = !isInsideValue
  return isInsideValue
}
function isInsideRect(pointX, pointY, rect) {
  return (
    pointX >= rect.x &&
    pointX <= rect.x + rect.width &&
    pointY >= rect.y &&
    pointY <= rect.y + rect.height
  )
}
function isInsideAxisAlignedRect(pointX, pointY, x1, y1, x2, y2) {
  return (
    pointX >= Math.min(x1, x2) &&
    pointX <= Math.max(x1, x2) &&
    pointY >= Math.min(y1, y2) &&
    pointY <= Math.max(y1, y2)
  )
}
/**
 * Generates a safe polygon area that the user can traverse without closing the
 * floating element once leaving the reference element.
 * @see https://floating-ui.com/docs/useHover#safepolygon
 */
function safePolygon(options = {}) {
  const { blockPointerEvents = false } = options
  const timeout = new Timeout()
  const fn = ({ x, y, placement, elements, onClose, nodeId, tree }) => {
    const side = placement?.split("-")[0]
    let hasLanded = false
    let lastX = null
    let lastY = null
    let lastCursorTime = typeof performance !== "undefined" ? performance.now() : 0
    function isCursorMovingSlowly(nextX, nextY) {
      const currentTime = performance.now()
      const elapsedTime = currentTime - lastCursorTime
      if (lastX === null || lastY === null || elapsedTime === 0) {
        lastX = nextX
        lastY = nextY
        lastCursorTime = currentTime
        return false
      }
      const deltaX = nextX - lastX
      const deltaY = nextY - lastY
      const distanceSquared = deltaX * deltaX + deltaY * deltaY
      const thresholdSquared = elapsedTime * elapsedTime * CURSOR_SPEED_THRESHOLD_SQUARED
      lastX = nextX
      lastY = nextY
      lastCursorTime = currentTime
      return distanceSquared < thresholdSquared
    }
    function close() {
      timeout.clear()
      onClose()
    }
    return function onMouseMove(event) {
      timeout.clear()
      const domReference = elements.domReference
      const floating = elements.floating
      if (!domReference || !floating || side == null || x == null || y == null) return
      const { clientX, clientY } = event
      const target = getTarget(event)
      const isLeave = event.type === "mouseleave"
      const isOverFloatingEl = contains(floating, target)
      const isOverReferenceEl = contains(domReference, target)
      if (isOverFloatingEl) {
        hasLanded = true
        if (!isLeave) return
      }
      if (isOverReferenceEl) {
        hasLanded = false
        if (!isLeave) {
          hasLanded = true
          return
        }
      }
      if (isLeave && isElement(event.relatedTarget) && contains(floating, event.relatedTarget))
        return
      function hasOpenChildNode() {
        return Boolean(tree && getNodeChildren(tree.nodesRef.current, nodeId).length > 0)
      }
      function closeIfNoOpenChild() {
        if (!hasOpenChildNode()) close()
      }
      if (hasOpenChildNode()) return
      const refRect = domReference.getBoundingClientRect()
      const rect = floating.getBoundingClientRect()
      const cursorLeaveFromRight = x > rect.right - rect.width / 2
      const cursorLeaveFromBottom = y > rect.bottom - rect.height / 2
      const isFloatingWider = rect.width > refRect.width
      const isFloatingTaller = rect.height > refRect.height
      const left = (isFloatingWider ? refRect : rect).left
      const right = (isFloatingWider ? refRect : rect).right
      const top = (isFloatingTaller ? refRect : rect).top
      const bottom = (isFloatingTaller ? refRect : rect).bottom
      if (
        (side === "top" && y >= refRect.bottom - 1) ||
        (side === "bottom" && y <= refRect.top + 1) ||
        (side === "left" && x >= refRect.right - 1) ||
        (side === "right" && x <= refRect.left + 1)
      ) {
        closeIfNoOpenChild()
        return
      }
      let isInsideTroughRect = false
      switch (side) {
        case "top":
          isInsideTroughRect = isInsideAxisAlignedRect(
            clientX,
            clientY,
            left,
            refRect.top + 1,
            right,
            rect.bottom - 1,
          )
          break
        case "bottom":
          isInsideTroughRect = isInsideAxisAlignedRect(
            clientX,
            clientY,
            left,
            rect.top + 1,
            right,
            refRect.bottom - 1,
          )
          break
        case "left":
          isInsideTroughRect = isInsideAxisAlignedRect(
            clientX,
            clientY,
            rect.right - 1,
            bottom,
            refRect.left + 1,
            top,
          )
          break
        case "right":
          isInsideTroughRect = isInsideAxisAlignedRect(
            clientX,
            clientY,
            refRect.right - 1,
            bottom,
            rect.left + 1,
            top,
          )
      }
      if (isInsideTroughRect) return
      if (hasLanded && !isInsideRect(clientX, clientY, refRect)) {
        closeIfNoOpenChild()
        return
      }
      if (!isLeave && isCursorMovingSlowly(clientX, clientY)) {
        closeIfNoOpenChild()
        return
      }
      let isInsidePolygon = false
      switch (side) {
        case "top": {
          const cursorXOffset = isFloatingWider ? POLYGON_BUFFER / 2 : POLYGON_BUFFER * 4
          const cursorPointOneX = isFloatingWider
            ? x + cursorXOffset
            : cursorLeaveFromRight
              ? x + cursorXOffset
              : x - cursorXOffset
          const cursorPointTwoX = isFloatingWider
            ? x - cursorXOffset
            : cursorLeaveFromRight
              ? x + cursorXOffset
              : x - cursorXOffset
          const cursorPointY = y + POLYGON_BUFFER + 1
          const commonYLeft = cursorLeaveFromRight
            ? rect.bottom - POLYGON_BUFFER
            : isFloatingWider
              ? rect.bottom - POLYGON_BUFFER
              : rect.top
          const commonYRight = cursorLeaveFromRight
            ? isFloatingWider
              ? rect.bottom - POLYGON_BUFFER
              : rect.top
            : rect.bottom - POLYGON_BUFFER
          isInsidePolygon = isPointInQuadrilateral(
            clientX,
            clientY,
            cursorPointOneX,
            cursorPointY,
            cursorPointTwoX,
            cursorPointY,
            rect.left,
            commonYLeft,
            rect.right,
            commonYRight,
          )
          break
        }
        case "bottom": {
          const cursorXOffset = isFloatingWider ? POLYGON_BUFFER / 2 : POLYGON_BUFFER * 4
          const cursorPointOneX = isFloatingWider
            ? x + cursorXOffset
            : cursorLeaveFromRight
              ? x + cursorXOffset
              : x - cursorXOffset
          const cursorPointTwoX = isFloatingWider
            ? x - cursorXOffset
            : cursorLeaveFromRight
              ? x + cursorXOffset
              : x - cursorXOffset
          const cursorPointY = y - POLYGON_BUFFER
          const commonYLeft = cursorLeaveFromRight
            ? rect.top + POLYGON_BUFFER
            : isFloatingWider
              ? rect.top + POLYGON_BUFFER
              : rect.bottom
          const commonYRight = cursorLeaveFromRight
            ? isFloatingWider
              ? rect.top + POLYGON_BUFFER
              : rect.bottom
            : rect.top + POLYGON_BUFFER
          isInsidePolygon = isPointInQuadrilateral(
            clientX,
            clientY,
            cursorPointOneX,
            cursorPointY,
            cursorPointTwoX,
            cursorPointY,
            rect.left,
            commonYLeft,
            rect.right,
            commonYRight,
          )
          break
        }
        case "left": {
          const cursorYOffset = isFloatingTaller ? POLYGON_BUFFER / 2 : POLYGON_BUFFER * 4
          const cursorPointOneY = isFloatingTaller
            ? y + cursorYOffset
            : cursorLeaveFromBottom
              ? y + cursorYOffset
              : y - cursorYOffset
          const cursorPointTwoY = isFloatingTaller
            ? y - cursorYOffset
            : cursorLeaveFromBottom
              ? y + cursorYOffset
              : y - cursorYOffset
          const cursorPointX = x + POLYGON_BUFFER + 1
          const commonXTop = cursorLeaveFromBottom
            ? rect.right - POLYGON_BUFFER
            : isFloatingTaller
              ? rect.right - POLYGON_BUFFER
              : rect.left
          const commonXBottom = cursorLeaveFromBottom
            ? isFloatingTaller
              ? rect.right - POLYGON_BUFFER
              : rect.left
            : rect.right - POLYGON_BUFFER
          isInsidePolygon = isPointInQuadrilateral(
            clientX,
            clientY,
            commonXTop,
            rect.top,
            commonXBottom,
            rect.bottom,
            cursorPointX,
            cursorPointOneY,
            cursorPointX,
            cursorPointTwoY,
          )
          break
        }
        case "right": {
          const cursorYOffset = isFloatingTaller ? POLYGON_BUFFER / 2 : POLYGON_BUFFER * 4
          const cursorPointOneY = isFloatingTaller
            ? y + cursorYOffset
            : cursorLeaveFromBottom
              ? y + cursorYOffset
              : y - cursorYOffset
          const cursorPointTwoY = isFloatingTaller
            ? y - cursorYOffset
            : cursorLeaveFromBottom
              ? y + cursorYOffset
              : y - cursorYOffset
          const cursorPointX = x - POLYGON_BUFFER
          const commonXTop = cursorLeaveFromBottom
            ? rect.left + POLYGON_BUFFER
            : isFloatingTaller
              ? rect.left + POLYGON_BUFFER
              : rect.right
          const commonXBottom = cursorLeaveFromBottom
            ? isFloatingTaller
              ? rect.left + POLYGON_BUFFER
              : rect.right
            : rect.left + POLYGON_BUFFER
          isInsidePolygon = isPointInQuadrilateral(
            clientX,
            clientY,
            cursorPointX,
            cursorPointOneY,
            cursorPointX,
            cursorPointTwoY,
            commonXTop,
            rect.top,
            commonXBottom,
            rect.bottom,
          )
          break
        }
      }
      if (!isInsidePolygon) closeIfNoOpenChild()
      else if (!hasLanded) timeout.start(40, closeIfNoOpenChild)
    }
  }
  fn.__options = {
    ...options,
    blockPointerEvents,
  }
  return fn
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/internals/direction-context/DirectionContext.mjs
const DirectionContext = /*#__PURE__*/ import_react.createContext(void 0)
function useDirection() {
  return import_react.useContext(DirectionContext)?.direction ?? "ltr"
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/floating-ui-react/middleware/arrow.mjs
/**
 * Fork of the original `arrow` middleware from Floating UI that allows
 * configuring the offset parent.
 */
const baseArrow = (options) => ({
  name: "arrow",
  options,
  async fn(state) {
    const { x, y, placement, rects, platform, elements, middlewareData } = state
    const { element, padding = 0, offsetParent = "real" } = evaluate(options, state) || {}
    if (element == null) return {}
    const paddingObject = getPaddingObject(padding)
    const coords = {
      x,
      y,
    }
    const axis = getAlignmentAxis(placement)
    const length = getAxisLength(axis)
    const arrowDimensions = await platform.getDimensions(element)
    const isYAxis = axis === "y"
    const minProp = isYAxis ? "top" : "left"
    const maxProp = isYAxis ? "bottom" : "right"
    const clientProp = isYAxis ? "clientHeight" : "clientWidth"
    const endDiff =
      rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length]
    const startDiff = coords[axis] - rects.reference[axis]
    const arrowOffsetParent =
      offsetParent === "real" ? await platform.getOffsetParent?.(element) : elements.floating
    let clientSize = elements.floating[clientProp] || rects.floating[length]
    if (!clientSize || !(await platform.isElement?.(arrowOffsetParent)))
      clientSize = elements.floating[clientProp] || rects.floating[length]
    const centerToReference = endDiff / 2 - startDiff / 2
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1
    const minPadding = Math.min(paddingObject[minProp], largestPossiblePadding)
    const maxPadding = Math.min(paddingObject[maxProp], largestPossiblePadding)
    const min = minPadding
    const max = clientSize - arrowDimensions[length] - maxPadding
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference
    const offset = clamp$1(min, center, max)
    const shouldAddOffset =
      !middlewareData.arrow &&
      getAlignment(placement) != null &&
      center !== offset &&
      rects.reference[length] / 2 -
        (center < min ? minPadding : maxPadding) -
        arrowDimensions[length] / 2 <
        0
    const alignmentOffset = shouldAddOffset ? (center < min ? center - min : center - max) : 0
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset,
        centerOffset: center - offset - alignmentOffset,
        ...(shouldAddOffset && { alignmentOffset }),
      },
      reset: shouldAddOffset,
    }
  },
})
/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * This wraps the core `arrow` middleware to allow React refs as the element.
 * @see https://floating-ui.com/docs/arrow
 */
const arrow = (options, deps) => ({
  ...baseArrow(options),
  options: [options, deps],
})
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/utils/hideMiddleware.mjs
const hide = {
  name: "hide",
  async fn(state) {
    const { width, height, x, y } = state.rects.reference
    const anchorHidden = width === 0 && height === 0 && x === 0 && y === 0
    const overflow = await state.platform.detectOverflow(state, { elementContext: "reference" })
    return {
      data: {
        referenceHidden:
          overflow.top - height >= 0 ||
          overflow.right - width >= 0 ||
          overflow.bottom - height >= 0 ||
          overflow.left - width >= 0 ||
          anchorHidden,
      },
    }
  },
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/utils/adaptiveOriginConstants.mjs
const DEFAULT_SIDES = {
  sideX: "left",
  sideY: "top",
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/internals/useAnchorPositioning.mjs
const AVAILABLE_WIDTH_VAR = "--available-width"
const AVAILABLE_HEIGHT_VAR = "--available-height"
function getLogicalSide(sideParam, renderedSide, isRtl) {
  const isLogicalSideParam = sideParam === "inline-start" || sideParam === "inline-end"
  return {
    top: "top",
    right: isLogicalSideParam ? (isRtl ? "inline-start" : "inline-end") : "right",
    bottom: "bottom",
    left: isLogicalSideParam ? (isRtl ? "inline-end" : "inline-start") : "left",
  }[renderedSide]
}
function getOffsetData(state, sideParam, isRtl) {
  const { rects, placement } = state
  return {
    side: getLogicalSide(sideParam, getSide(placement), isRtl),
    align: getAlignment(placement) || "center",
    anchor: {
      width: rects.reference.width,
      height: rects.reference.height,
    },
    positioner: {
      width: rects.floating.width,
      height: rects.floating.height,
    },
  }
}
/**
 * Provides standardized anchor positioning behavior for floating elements. Wraps Floating UI's
 * `useFloating` hook.
 */
function useAnchorPositioning(params) {
  return useAnchorPositioningWithHook(params, useBaseUIFloating)
}
function useAnchorPositioningWithHook(params, useFloatingHook) {
  const {
    anchor,
    positionMethod = "absolute",
    side: sideParam = "bottom",
    sideOffset = 0,
    align = "center",
    alignOffset = 0,
    collisionBoundary,
    collisionPadding: collisionPaddingParam = 5,
    sticky = false,
    arrowPadding = 5,
    disableAnchorTracking = false,
    inline: inlineMiddleware,
    keepMounted = false,
    floatingRootContext,
    mounted,
    collisionAvoidance,
    shift: shift$3,
    nodeId,
    adaptiveOrigin,
    lazyFlip = false,
    externalTree,
  } = params
  const [mountSide, setMountSide] = import_react.useState(null)
  if (!mounted && mountSide !== null) setMountSide(null)
  const collisionAvoidanceSide = collisionAvoidance.side || "flip"
  const collisionAvoidanceAlign = collisionAvoidance.align || "flip"
  const collisionAvoidanceFallbackAxisSide = collisionAvoidance.fallbackAxisSide || "end"
  const shiftCrossAxis = shift$3?.crossAxis ?? false
  const shiftRootBoundary = shift$3?.rootBoundary
  const anchorFn = typeof anchor === "function" ? anchor : void 0
  const anchorFnCallback = useStableCallback(anchorFn)
  const anchorDep = anchorFn ? anchorFnCallback : anchor
  const anchorValueRef = useValueAsRef(anchor)
  const mountedRef = useValueAsRef(mounted)
  const isRtl = useDirection() === "rtl"
  const side =
    mountSide ||
    {
      "top": "top",
      "right": "right",
      "bottom": "bottom",
      "left": "left",
      "inline-end": isRtl ? "left" : "right",
      "inline-start": isRtl ? "right" : "left",
    }[sideParam]
  const placement = align === "center" ? side : `${side}-${align}`
  let collisionPadding = collisionPaddingParam
  if (typeof collisionPadding === "number")
    collisionPadding = {
      top: collisionPadding,
      right: collisionPadding,
      bottom: collisionPadding,
      left: collisionPadding,
    }
  else if (collisionPadding)
    collisionPadding = {
      top: collisionPadding.top || 0,
      right: collisionPadding.right || 0,
      bottom: collisionPadding.bottom || 0,
      left: collisionPadding.left || 0,
    }
  const bias = 1
  const biasTop = sideParam === "bottom" ? bias : 0
  const biasBottom = sideParam === "top" ? bias : 0
  const biasLeft = sideParam === "right" ? bias : 0
  const biasRight = sideParam === "left" ? bias : 0
  const commonCollisionProps = {
    boundary: collisionBoundary === "clipping-ancestors" ? "clippingAncestors" : collisionBoundary,
    padding: collisionPadding,
  }
  const arrowRef = import_react.useRef(null)
  const sideOffsetRef = useValueAsRef(sideOffset)
  const alignOffsetRef = useValueAsRef(alignOffset)
  const sideOffsetDep = typeof sideOffset !== "function" ? sideOffset : 0
  const alignOffsetDep = typeof alignOffset !== "function" ? alignOffset : 0
  const middleware = []
  if (inlineMiddleware) middleware.push(inlineMiddleware)
  middleware.push(
    offset(
      (state) => {
        const data = getOffsetData(state, sideParam, isRtl)
        const sideAxis =
          typeof sideOffsetRef.current === "function"
            ? sideOffsetRef.current(data)
            : sideOffsetRef.current
        const alignAxis =
          typeof alignOffsetRef.current === "function"
            ? alignOffsetRef.current(data)
            : alignOffsetRef.current
        return {
          mainAxis: sideAxis,
          crossAxis: alignAxis,
          alignmentAxis: alignAxis,
        }
      },
      [sideOffsetDep, alignOffsetDep, isRtl, sideParam],
    ),
  )
  const shiftDisabled = collisionAvoidanceAlign === "none" && collisionAvoidanceSide !== "shift"
  const crossAxisShiftEnabled =
    !shiftDisabled && (sticky || shiftCrossAxis || collisionAvoidanceSide === "shift")
  const flipMiddleware =
    collisionAvoidanceSide === "none"
      ? null
      : flip({
          ...commonCollisionProps,
          padding: {
            top: collisionPadding.top + bias + biasTop,
            right: collisionPadding.right + bias + biasRight,
            bottom: collisionPadding.bottom + bias + biasBottom,
            left: collisionPadding.left + bias + biasLeft,
          },
          mainAxis: !shiftCrossAxis && collisionAvoidanceSide === "flip",
          crossAxis: collisionAvoidanceAlign === "flip" ? "alignment" : false,
          fallbackAxisSideDirection: collisionAvoidanceFallbackAxisSide,
        })
  const shiftMiddleware = shiftDisabled
    ? null
    : shift(
        {
          ...commonCollisionProps,
          rootBoundary: shiftRootBoundary,
          mainAxis: collisionAvoidanceAlign !== "none",
          crossAxis: crossAxisShiftEnabled,
          limiter:
            sticky || shiftCrossAxis
              ? void 0
              : limitShift((limitData) => {
                  if (!arrowRef.current) return {}
                  const { width, height } = arrowRef.current.getBoundingClientRect()
                  const sideAxis = getSideAxis(getSide(limitData.placement))
                  const arrowSize = sideAxis === "y" ? width : height
                  const offsetAmount =
                    sideAxis === "y"
                      ? collisionPadding.left + collisionPadding.right
                      : collisionPadding.top + collisionPadding.bottom
                  return { offset: arrowSize / 2 + offsetAmount / 2 }
                }),
        },
        [
          commonCollisionProps,
          sticky,
          shiftCrossAxis,
          shiftRootBoundary,
          collisionPadding,
          collisionAvoidanceAlign,
        ],
      )
  if (
    collisionAvoidanceSide === "shift" ||
    collisionAvoidanceAlign === "shift" ||
    align === "center"
  )
    middleware.push(shiftMiddleware, flipMiddleware)
  else middleware.push(flipMiddleware, shiftMiddleware)
  middleware.push(
    size({
      ...commonCollisionProps,
      apply({ elements: { floating }, availableWidth, availableHeight, rects }) {
        if (!mountedRef.current) return
        const floatingStyle = floating.style
        floatingStyle.setProperty(AVAILABLE_WIDTH_VAR, `${availableWidth}px`)
        floatingStyle.setProperty(AVAILABLE_HEIGHT_VAR, `${availableHeight}px`)
        const dpr = getWindow(floating).devicePixelRatio || 1
        const { x, y, width, height } = rects.reference
        const anchorWidth = (Math.round((x + width) * dpr) - Math.round(x * dpr)) / dpr
        const anchorHeight = (Math.round((y + height) * dpr) - Math.round(y * dpr)) / dpr
        floatingStyle.setProperty("--anchor-width", `${anchorWidth}px`)
        floatingStyle.setProperty("--anchor-height", `${anchorHeight}px`)
      },
    }),
    arrow(
      (state) => ({
        element: arrowRef.current || ownerDocument(state.elements.floating).createElement("div"),
        padding: arrowPadding,
        offsetParent: "floating",
      }),
      [arrowPadding],
    ),
    {
      name: "transformOrigin",
      fn(state) {
        const { elements, middlewareData, placement: renderedPlacement, rects, y } = state
        const currentRenderedSide = getSide(renderedPlacement)
        const currentRenderedAxis = getSideAxis(currentRenderedSide)
        const arrowEl = arrowRef.current
        const arrowX = middlewareData.arrow?.x || 0
        const arrowY = middlewareData.arrow?.y || 0
        const arrowWidth = arrowEl?.clientWidth || 0
        const arrowHeight = arrowEl?.clientHeight || 0
        const transformX = arrowX + arrowWidth / 2
        const transformY = arrowY + arrowHeight / 2
        const shiftY = Math.abs(middlewareData.shift?.y || 0)
        const halfAnchorHeight = rects.reference.height / 2
        const sideOffsetValue =
          typeof sideOffset === "function"
            ? sideOffset(getOffsetData(state, sideParam, isRtl))
            : sideOffset
        const isOverlappingAnchor = shiftY > sideOffsetValue
        const adjacentTransformOrigin = {
          top: `${transformX}px calc(100% + ${sideOffsetValue}px)`,
          bottom: `${transformX}px ${-sideOffsetValue}px`,
          left: `calc(100% + ${sideOffsetValue}px) ${transformY}px`,
          right: `${-sideOffsetValue}px ${transformY}px`,
        }[currentRenderedSide]
        const overlapTransformOrigin = `${transformX}px ${rects.reference.y + halfAnchorHeight - y}px`
        elements.floating.style.setProperty(
          "--transform-origin",
          crossAxisShiftEnabled && currentRenderedAxis === "y" && isOverlappingAnchor
            ? overlapTransformOrigin
            : adjacentTransformOrigin,
        )
        return {}
      },
    },
    hide,
    adaptiveOrigin,
  )
  useIsoLayoutEffect(() => {
    if (!mounted && floatingRootContext)
      floatingRootContext.update({
        referenceElement: null,
        floatingElement: null,
        domReferenceElement: null,
        positionReference: null,
      })
  }, [mounted, floatingRootContext])
  const autoUpdateOptions = import_react.useMemo(
    () => ({
      elementResize: !disableAnchorTracking && typeof ResizeObserver !== "undefined",
      layoutShift: !disableAnchorTracking && typeof IntersectionObserver !== "undefined",
    }),
    [disableAnchorTracking],
  )
  const {
    refs,
    elements,
    x,
    y,
    middlewareData,
    update,
    placement: renderedPlacement,
    context,
    isPositioned,
    floatingStyles: originalFloatingStyles,
  } = useFloatingHook({
    rootContext: floatingRootContext,
    open: keepMounted ? mounted : void 0,
    placement,
    middleware,
    strategy: positionMethod,
    whileElementsMounted: keepMounted
      ? void 0
      : (...args) => autoUpdate(...args, autoUpdateOptions),
    nodeId,
    externalTree,
  })
  const { sideX, sideY } = middlewareData.adaptiveOrigin || DEFAULT_SIDES
  const resolvedPosition = isPositioned ? positionMethod : "fixed"
  const floatingStyles = import_react.useMemo(() => {
    let base
    if (!isPositioned)
      base = {
        position: resolvedPosition,
        top: 0,
        left: 0,
      }
    else if (adaptiveOrigin)
      base = {
        position: resolvedPosition,
        [sideX]: x,
        [sideY]: y,
      }
    else
      base = {
        ...originalFloatingStyles,
        position: resolvedPosition,
      }
    base[AVAILABLE_WIDTH_VAR] = "100vw"
    base[AVAILABLE_HEIGHT_VAR] = "100vh"
    if (!isPositioned) base.opacity = 0
    return base
  }, [adaptiveOrigin, resolvedPosition, sideX, x, sideY, y, originalFloatingStyles, isPositioned])
  const registeredPositionReferenceRef = import_react.useRef(null)
  useIsoLayoutEffect(() => {
    if (!mounted) return
    const anchorValue = anchorValueRef.current
    const resolvedAnchor = typeof anchorValue === "function" ? anchorValue() : anchorValue
    const finalAnchor = (isRef(resolvedAnchor) ? resolvedAnchor.current : resolvedAnchor) || null
    if (finalAnchor !== registeredPositionReferenceRef.current) {
      refs.setPositionReference(finalAnchor)
      registeredPositionReferenceRef.current = finalAnchor
    }
  }, [mounted, refs, anchorDep, anchorValueRef])
  import_react.useEffect(() => {
    if (!mounted) return
    const anchorValue = anchorValueRef.current
    if (typeof anchorValue === "function") return
    if (isRef(anchorValue) && anchorValue.current !== registeredPositionReferenceRef.current) {
      refs.setPositionReference(anchorValue.current)
      registeredPositionReferenceRef.current = anchorValue.current
    }
  }, [mounted, refs, anchorDep, anchorValueRef])
  import_react.useEffect(() => {
    if (keepMounted && mounted && elements.reference && elements.floating)
      return autoUpdate(elements.reference, elements.floating, update, autoUpdateOptions)
  }, [keepMounted, mounted, elements, update, autoUpdateOptions])
  const renderedSide = getSide(renderedPlacement)
  const logicalRenderedSide = getLogicalSide(sideParam, renderedSide, isRtl)
  const renderedAlign = getAlignment(renderedPlacement) || "center"
  const anchorHidden = Boolean(middlewareData.hide?.referenceHidden)
  useIsoLayoutEffect(() => {
    if (lazyFlip && mounted && isPositioned && renderedSide !== side) setMountSide(renderedSide)
  }, [lazyFlip, mounted, isPositioned, renderedSide, side])
  const arrowStyles = import_react.useMemo(
    () => ({
      position: "absolute",
      top: middlewareData.arrow?.y,
      left: middlewareData.arrow?.x,
    }),
    [middlewareData.arrow],
  )
  const arrowUncentered = middlewareData.arrow?.centerOffset !== 0
  return import_react.useMemo(
    () => ({
      positionerStyles: floatingStyles,
      arrowStyles,
      arrowRef,
      arrowUncentered,
      side: logicalRenderedSide,
      align: renderedAlign,
      physicalSide: renderedSide,
      anchorHidden,
      refs,
      context,
      isPositioned,
      update,
    }),
    [
      floatingStyles,
      arrowStyles,
      arrowRef,
      arrowUncentered,
      logicalRenderedSide,
      renderedAlign,
      renderedSide,
      anchorHidden,
      refs,
      context,
      isPositioned,
      update,
    ],
  )
}
function isRef(param) {
  return param != null && "current" in param
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/utils/popupStateMapping.mjs
const CommonPopupDataAttributes = (function (CommonPopupDataAttributes) {
  /**
   * Present when the popup is open.
   */
  CommonPopupDataAttributes["open"] = "data-open"
  /**
   * Present when the popup is closed.
   */
  CommonPopupDataAttributes["closed"] = "data-closed"
  /**
   * Present when the popup begins animating in.
   */
  CommonPopupDataAttributes[
    (CommonPopupDataAttributes["startingStyle"] = TransitionStatusDataAttributes.startingStyle)
  ] = "startingStyle"
  /**
   * Present when the popup is animating out.
   */
  CommonPopupDataAttributes[
    (CommonPopupDataAttributes["endingStyle"] = TransitionStatusDataAttributes.endingStyle)
  ] = "endingStyle"
  /**
   * Present when the anchor is hidden.
   */
  CommonPopupDataAttributes["anchorHidden"] = "data-anchor-hidden"
  /**
   * Indicates which side the popup is positioned relative to the trigger.
   * @type { 'top' | 'bottom' | 'left' | 'right' | 'inline-end' | 'inline-start'}
   */
  CommonPopupDataAttributes["side"] = "data-side"
  /**
   * Indicates how the popup is aligned relative to specified side.
   * @type {'start' | 'center' | 'end'}
   */
  CommonPopupDataAttributes["align"] = "data-align"
  return CommonPopupDataAttributes
})({})
const TRIGGER_HOOK = { "data-popup-open": "" }
const PRESSABLE_TRIGGER_HOOK = {
  "data-popup-open": "",
  "data-pressed": "",
}
const POPUP_OPEN_HOOK = { "data-open": "" }
const POPUP_CLOSED_HOOK = { "data-closed": "" }
const ANCHOR_HIDDEN_HOOK = { "data-anchor-hidden": "" }
const triggerOpenStateMapping = {
  open(value) {
    if (value) return TRIGGER_HOOK
    return null
  },
}
const pressableTriggerOpenStateMapping = {
  open(value) {
    if (value) return PRESSABLE_TRIGGER_HOOK
    return null
  },
}
const popupStateMapping = {
  open(value) {
    if (value) return POPUP_OPEN_HOOK
    return POPUP_CLOSED_HOOK
  },
  anchorHidden(value) {
    if (value) return ANCHOR_HIDDEN_HOOK
    return null
  },
}
const popupTransitionStateMapping = {
  ...popupStateMapping,
  ...transitionStatusMapping,
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/internals/getDisabledMountTransitionStyles.mjs
function getDisabledMountTransitionStyles(transitionStatus) {
  return transitionStatus === "starting" ? DISABLED_TRANSITIONS_STYLE : EMPTY_OBJECT
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/utils/usePositioner.mjs
/**
 * Renders the shared outer Positioner element used by popup components.
 * Applies the common role, hidden state, transition styles, state attributes, and optional inert styling.
 */
function usePositioner(
  componentProps,
  state,
  { styles, transitionStatus, props, refs, hidden, inert = false },
) {
  const style = { ...styles }
  if (inert) style.pointerEvents = "none"
  return useRenderElement("div", componentProps, {
    state,
    ref: refs,
    props: [
      {
        role: "presentation",
        hidden,
        style,
      },
      getDisabledMountTransitionStyles(transitionStatus),
      props,
    ],
    stateAttributesMapping: popupStateMapping,
  })
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/toast/useToastManager.mjs
/**
 * Returns the array of toasts and methods to manage them.
 */
function useToastManager$1() {
  const store = useToastProviderContext()
  const toasts = store.useState("toasts")
  return import_react.useMemo(
    () => ({
      toasts,
      add: store.addToast,
      close: store.closeToast,
      update: store.updateToast,
      promise: store.promiseToast,
    }),
    [toasts, store],
  )
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/toast/createToastManager.mjs
/**
 * Creates a new toast manager.
 */
function createToastManager$1() {
  const listeners = /* @__PURE__ */ new Set()
  function emit(data) {
    listeners.forEach((listener) => listener(data))
  }
  return {
    " subscribe": function subscribe(listener) {
      listeners.add(listener)
      return () => {
        listeners.delete(listener)
      }
    },
    "add"(options) {
      const id = options.id || generateId("toast")
      emit({
        action: "add",
        options: {
          ...options,
          id,
          transitionStatus: "starting",
        },
      })
      return id
    },
    "close"(id) {
      emit({
        action: "close",
        options: { id },
      })
    },
    "update"(id, updates) {
      emit({
        action: "update",
        options: {
          ...updates,
          id,
        },
      })
    },
    "promise"(promiseValue, options) {
      let handledPromise = promiseValue
      emit({
        action: "promise",
        options: {
          ...options,
          promise: promiseValue,
          setPromise(promise) {
            handledPromise = promise
          },
        },
      })
      return handledPromise
    },
  }
}
//#endregion
//#region node_modules/.pnpm/@tabler+icons-react@3.46.0_react@19.2.8/node_modules/@tabler/icons-react/dist/esm/defaultAttributes.mjs
/**
 * @license @tabler/icons-react v3.46.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const defaultAttributes = {
  outline: {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  },
  filled: {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    stroke: "none",
  },
}
//#endregion
//#region node_modules/.pnpm/@tabler+icons-react@3.46.0_react@19.2.8/node_modules/@tabler/icons-react/dist/esm/createReactComponent.mjs
/**
 * @license @tabler/icons-react v3.46.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const createReactComponent = (type, iconName, iconNamePascal, iconNode) => {
  const Component = (0, import_react.forwardRef)(
    ({ color = "currentColor", size = 24, stroke = 2, title, className, children, ...rest }, ref) =>
      (0, import_react.createElement)(
        "svg",
        {
          ref,
          ...defaultAttributes[type],
          width: size,
          height: size,
          className: [`tabler-icon`, `tabler-icon-${iconName}`, className].join(" "),
          ...(type === "filled"
            ? { fill: color }
            : {
                strokeWidth: stroke,
                stroke: color,
              }),
          ...rest,
        },
        [
          title && (0, import_react.createElement)("title", { key: "svg-title" }, title),
          ...iconNode.map(([tag, attrs]) => (0, import_react.createElement)(tag, attrs)),
          ...(Array.isArray(children) ? children : [children]),
        ],
      ),
  )
  Component.displayName = `${iconNamePascal}`
  return Component
}
/**
 * @license @tabler/icons-react v3.46.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const IconAlertOctagon = createReactComponent("outline", "alert-octagon", "AlertOctagon", [
  [
    "path",
    {
      d: "M12.802 2.165l5.575 2.389c.48 .206 .863 .589 1.07 1.07l2.388 5.574c.22 .512 .22 1.092 0 1.604l-2.389 5.575c-.206 .48 -.589 .863 -1.07 1.07l-5.574 2.388c-.512 .22 -1.092 .22 -1.604 0l-5.575 -2.389a2.036 2.036 0 0 1 -1.07 -1.07l-2.388 -5.574a2.036 2.036 0 0 1 0 -1.604l2.389 -5.575c.206 -.48 .589 -.863 1.07 -1.07l5.574 -2.388a2.036 2.036 0 0 1 1.604 0",
      key: "svg-0",
    },
  ],
  [
    "path",
    {
      d: "M12 8v4",
      key: "svg-1",
    },
  ],
  [
    "path",
    {
      d: "M12 16h.01",
      key: "svg-2",
    },
  ],
])
/**
 * @license @tabler/icons-react v3.46.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const IconAlertTriangle = createReactComponent("outline", "alert-triangle", "AlertTriangle", [
  [
    "path",
    {
      d: "M12 9v4",
      key: "svg-0",
    },
  ],
  [
    "path",
    {
      d: "M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0",
      key: "svg-1",
    },
  ],
  [
    "path",
    {
      d: "M12 16h.01",
      key: "svg-2",
    },
  ],
])
/**
 * @license @tabler/icons-react v3.46.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const IconCircleCheck = createReactComponent("outline", "circle-check", "CircleCheck", [
  [
    "path",
    {
      d: "M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0",
      key: "svg-0",
    },
  ],
  [
    "path",
    {
      d: "M9 12l2 2l4 -4",
      key: "svg-1",
    },
  ],
])
/**
 * @license @tabler/icons-react v3.46.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const IconDatabase = createReactComponent("outline", "database", "Database", [
  [
    "path",
    {
      d: "M4 6a8 3 0 1 0 16 0a8 3 0 1 0 -16 0",
      key: "svg-0",
    },
  ],
  [
    "path",
    {
      d: "M4 6v6a8 3 0 0 0 16 0v-6",
      key: "svg-1",
    },
  ],
  [
    "path",
    {
      d: "M4 12v6a8 3 0 0 0 16 0v-6",
      key: "svg-2",
    },
  ],
])
/**
 * @license @tabler/icons-react v3.46.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const IconError404 = createReactComponent("outline", "error-404", "Error404", [
  [
    "path",
    {
      d: "M3 8v3a1 1 0 0 0 1 1h3",
      key: "svg-0",
    },
  ],
  [
    "path",
    {
      d: "M7 8v8",
      key: "svg-1",
    },
  ],
  [
    "path",
    {
      d: "M17 8v3a1 1 0 0 0 1 1h3",
      key: "svg-2",
    },
  ],
  [
    "path",
    {
      d: "M21 8v8",
      key: "svg-3",
    },
  ],
  [
    "path",
    {
      d: "M10 10v4a2 2 0 1 0 4 0v-4a2 2 0 1 0 -4 0",
      key: "svg-4",
    },
  ],
])
/**
 * @license @tabler/icons-react v3.46.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const IconHome = createReactComponent("outline", "home", "Home", [
  [
    "path",
    {
      d: "M5 12l-2 0l9 -9l9 9l-2 0",
      key: "svg-0",
    },
  ],
  [
    "path",
    {
      d: "M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7",
      key: "svg-1",
    },
  ],
  [
    "path",
    {
      d: "M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6",
      key: "svg-2",
    },
  ],
])
/**
 * @license @tabler/icons-react v3.46.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const IconInfoCircle = createReactComponent("outline", "info-circle", "InfoCircle", [
  [
    "path",
    {
      d: "M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0",
      key: "svg-0",
    },
  ],
  [
    "path",
    {
      d: "M12 9h.01",
      key: "svg-1",
    },
  ],
  [
    "path",
    {
      d: "M11 12h1v4h1",
      key: "svg-2",
    },
  ],
])
/**
 * @license @tabler/icons-react v3.46.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const IconLoader2 = createReactComponent("outline", "loader-2", "Loader2", [
  [
    "path",
    {
      d: "M12 3a9 9 0 1 0 9 9",
      key: "svg-0",
    },
  ],
])
/**
 * @license @tabler/icons-react v3.46.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const IconLoader = createReactComponent("outline", "loader", "Loader", [
  [
    "path",
    {
      d: "M12 6l0 -3",
      key: "svg-0",
    },
  ],
  [
    "path",
    {
      d: "M16.25 7.75l2.15 -2.15",
      key: "svg-1",
    },
  ],
  [
    "path",
    {
      d: "M18 12l3 0",
      key: "svg-2",
    },
  ],
  [
    "path",
    {
      d: "M16.25 16.25l2.15 2.15",
      key: "svg-3",
    },
  ],
  [
    "path",
    {
      d: "M12 18l0 3",
      key: "svg-4",
    },
  ],
  [
    "path",
    {
      d: "M7.75 16.25l-2.15 2.15",
      key: "svg-5",
    },
  ],
  [
    "path",
    {
      d: "M6 12l-3 0",
      key: "svg-6",
    },
  ],
  [
    "path",
    {
      d: "M7.75 7.75l-2.15 -2.15",
      key: "svg-7",
    },
  ],
])
/**
 * @license @tabler/icons-react v3.46.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const IconMenu2 = createReactComponent("outline", "menu-2", "Menu2", [
  [
    "path",
    {
      d: "M4 6l16 0",
      key: "svg-0",
    },
  ],
  [
    "path",
    {
      d: "M4 12l16 0",
      key: "svg-1",
    },
  ],
  [
    "path",
    {
      d: "M4 18l16 0",
      key: "svg-2",
    },
  ],
])
/**
 * @license @tabler/icons-react v3.46.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const IconPlugConnectedX = createReactComponent("outline", "plug-connected-x", "PlugConnectedX", [
  [
    "path",
    {
      d: "M20 16l-4 4",
      key: "svg-0",
    },
  ],
  [
    "path",
    {
      d: "M7 12l5 5l-1.5 1.5a3.536 3.536 0 1 1 -5 -5l1.5 -1.5",
      key: "svg-1",
    },
  ],
  [
    "path",
    {
      d: "M17 12l-5 -5l1.5 -1.5a3.536 3.536 0 1 1 5 5l-1.5 1.5",
      key: "svg-2",
    },
  ],
  [
    "path",
    {
      d: "M3 21l2.5 -2.5",
      key: "svg-3",
    },
  ],
  [
    "path",
    {
      d: "M18.5 5.5l2.5 -2.5",
      key: "svg-4",
    },
  ],
  [
    "path",
    {
      d: "M10 11l-2 2",
      key: "svg-5",
    },
  ],
  [
    "path",
    {
      d: "M13 14l-2 2",
      key: "svg-6",
    },
  ],
  [
    "path",
    {
      d: "M16 16l4 4",
      key: "svg-7",
    },
  ],
])
/**
 * @license @tabler/icons-react v3.46.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const IconPlugConnected = createReactComponent("outline", "plug-connected", "PlugConnected", [
  [
    "path",
    {
      d: "M7 12l5 5l-1.5 1.5a3.536 3.536 0 1 1 -5 -5l1.5 -1.5",
      key: "svg-0",
    },
  ],
  [
    "path",
    {
      d: "M17 12l-5 -5l1.5 -1.5a3.536 3.536 0 1 1 5 5l-1.5 1.5",
      key: "svg-1",
    },
  ],
  [
    "path",
    {
      d: "M3 21l2.5 -2.5",
      key: "svg-2",
    },
  ],
  [
    "path",
    {
      d: "M18.5 5.5l2.5 -2.5",
      key: "svg-3",
    },
  ],
  [
    "path",
    {
      d: "M10 11l-2 2",
      key: "svg-4",
    },
  ],
  [
    "path",
    {
      d: "M13 14l-2 2",
      key: "svg-5",
    },
  ],
])
/**
 * @license @tabler/icons-react v3.46.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const IconTransform = createReactComponent("outline", "transform", "Transform", [
  [
    "path",
    {
      d: "M3 6a3 3 0 1 0 6 0a3 3 0 0 0 -6 0",
      key: "svg-0",
    },
  ],
  [
    "path",
    {
      d: "M21 11v-3a2 2 0 0 0 -2 -2h-6l3 3m0 -6l-3 3",
      key: "svg-1",
    },
  ],
  [
    "path",
    {
      d: "M3 13v3a2 2 0 0 0 2 2h6l-3 -3m0 6l3 -3",
      key: "svg-2",
    },
  ],
  [
    "path",
    {
      d: "M15 18a3 3 0 1 0 6 0a3 3 0 0 0 -6 0",
      key: "svg-3",
    },
  ],
])
/**
 * @license @tabler/icons-react v3.46.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const IconX = createReactComponent("outline", "x", "X", [
  [
    "path",
    {
      d: "M18 6l-12 12",
      key: "svg-0",
    },
  ],
  [
    "path",
    {
      d: "M6 6l12 12",
      key: "svg-1",
    },
  ],
])
//#endregion
//#region node_modules/.pnpm/tailwind-variants@3.3.1_tai_a0d26b71ce9e28cd9d002deff65621c9/node_modules/tailwind-variants/dist/chunk-OYFAXDFZ.js
const isArray = Array.isArray
const joinClassValue = (value) => {
  if (!value && value !== 0 && value !== 0n) return ""
  if (typeof value === "string") return value
  if (typeof value === "number") {
    if (value !== value) return ""
    return "" + value
  }
  if (typeof value === "bigint") return "" + value
  let result = ""
  if (isArray(value)) {
    const length = value.length
    for (let index = 0; index < length; index++) {
      const item = value[index]
      if (!item && item !== 0 && item !== 0n) continue
      const resolved = typeof item === "string" ? item : joinClassValue(item)
      if (resolved) {
        if (result) result += " "
        result += resolved
      }
    }
    return result
  }
  if (typeof value === "object") {
    for (const key in value)
      if (value[key]) {
        if (result) result += " "
        result += key
      }
  }
  return result
}
const SPACE_REGEX = /\s+/g
const isArray2 = Array.isArray
const removeExtraSpaces = (str) => {
  if (typeof str !== "string" || !str) return str
  return str.replace(SPACE_REGEX, " ").trim()
}
const stringNeedsNormalize = (str) => {
  const len = str.length
  if (len === 0) return false
  const first = str.charCodeAt(0)
  const last = str.charCodeAt(len - 1)
  if (
    first === 32 ||
    last === 32 ||
    (first >= 9 && first <= 13) ||
    first === 160 ||
    (last >= 9 && last <= 13) ||
    last === 160
  )
    return true
  for (let i = 0; i < len; i++) {
    const code = str.charCodeAt(i)
    if ((code >= 9 && code <= 13) || code === 160) return true
    if (code === 32 && i + 1 < len && str.charCodeAt(i + 1) === 32) return true
  }
  return false
}
const cx = (...classnames) => {
  const result = joinClassValue(classnames)
  if (!result) return void 0
  return stringNeedsNormalize(result) ? removeExtraSpaces(result) : result
}
const falsyToString = (value) =>
  value === false ? "false" : value === true ? "true" : value === 0 ? "0" : value
const isEmptyObject = (obj) => {
  if (!obj || typeof obj !== "object") return true
  for (const _ in obj) return false
  return true
}
const isEqual = (obj1, obj2) => {
  if (obj1 === obj2) return true
  if (!obj1 || !obj2) return false
  const record1 = obj1
  const record2 = obj2
  const keys1 = Object.keys(record1)
  const keys2 = Object.keys(record2)
  if (keys1.length !== keys2.length) return false
  for (let i = 0; i < keys1.length; i++) {
    const key = keys1[i]
    if (!keys2.includes(key)) return false
    if (record1[key] !== record2[key]) return false
  }
  return true
}
const joinObjects = (obj1, obj2) => {
  const target = obj1
  for (const key in obj2)
    if (Object.hasOwn(obj2, key)) {
      const val2 = obj2[key]
      if (key in target) target[key] = cx(target[key], val2)
      else target[key] = val2
    }
  return obj1
}
const flat = (arr, target) => {
  for (let i = 0; i < arr.length; i++) {
    const el = arr[i]
    if (isArray2(el)) flat(el, target)
    else if (el) target.push(el)
  }
}
const flatMergeArrays = (...arrays) => {
  const result = []
  flat(arrays, result)
  const filtered = []
  for (let i = 0; i < result.length; i++) if (result[i]) filtered.push(result[i])
  return filtered
}
const mergeObjects = (obj1, obj2) => {
  const record1 = obj1
  const record2 = obj2
  const result = {}
  for (const key in record1) {
    const val1 = record1[key]
    if (key in record2) {
      const val2 = record2[key]
      if (isArray2(val1) || isArray2(val2)) result[key] = flatMergeArrays(val2, val1)
      else if (typeof val1 === "object" && typeof val2 === "object" && val1 && val2)
        result[key] = mergeObjects(val1, val2)
      else result[key] = val2 + " " + val1
    } else result[key] = val1
  }
  for (const key in record2) if (!(key in record1)) result[key] = record2[key]
  return result
}
//#endregion
//#region node_modules/.pnpm/tailwind-variants@3.3.1_tai_a0d26b71ce9e28cd9d002deff65621c9/node_modules/tailwind-variants/dist/chunk-SUL6UUW2.js
const defaultConfig = {
  twMerge: true,
  twMergeConfig: {},
}
const VARIANT_CACHE_LIMIT = 256
const OVERRIDE_CACHE_LIMIT = 128
const CACHE_MISS = /* @__PURE__ */ Symbol("tv-cache-miss")
const hasClassOverride = (props) =>
  ((props == null ? void 0 : props.class) != null && props.class !== "") ||
  ((props == null ? void 0 : props.className) != null && props.className !== "")
const serializeFingerprintValue = (value) => {
  if (value === void 0) return ""
  if (value === null) return "null"
  if (typeof value === "string") return value
  if (typeof value === "boolean") return value ? "true" : "false"
  if (typeof value === "number") return value === 0 ? "0" : String(value)
  if (typeof value === "bigint") return String(value)
  const mapped = falsyToString(value)
  const mappedType = typeof mapped
  if (
    mappedType === "string" ||
    mappedType === "number" ||
    mappedType === "boolean" ||
    mappedType === "bigint"
  )
    return String(mapped)
  if (mappedType === "object")
    try {
      return JSON.stringify(mapped)
    } catch {
      return null
    }
  return null
}
const appendSignatureValue = (out, value) => {
  if (value === void 0) return out
  if (value === null) return out + "null"
  const type = typeof value
  if (type === "string" || type === "number" || type === "boolean" || type === "bigint")
    return out + String(value)
  if (Array.isArray(value)) return out + value.join("\0")
  try {
    return out + JSON.stringify(value)
  } catch {
    return out + "?"
  }
}
const buildPropsFingerprint = (variantKeys, defaultVariants, props, slotProps) => {
  let fingerprint = ""
  const seen = /* @__PURE__ */ Object.create(null)
  for (let i = 0; i < variantKeys.length; i++) {
    const key = variantKeys[i]
    seen[key] = 1
    let value = defaultVariants[key]
    if (props && props[key] !== void 0) value = props[key]
    const serialized = serializeFingerprintValue(value)
    if (serialized === null) return null
    fingerprint += key + ":" + serialized + ";"
  }
  const extras = []
  for (const key in defaultVariants) {
    if (key === "class" || key === "className" || seen[key]) continue
    seen[key] = 1
    extras.push(key)
  }
  if (props)
    for (const key in props) {
      if (key === "class" || key === "className" || seen[key] || props[key] === void 0) continue
      seen[key] = 1
      extras.push(key)
    }
  if (extras.length > 1) extras.sort()
  for (let i = 0; i < extras.length; i++) {
    const key = extras[i]
    let value = defaultVariants[key]
    if (props && props[key] !== void 0) value = props[key]
    const serialized = serializeFingerprintValue(value)
    if (serialized === null) return null
    fingerprint += key + ":" + serialized + ";"
  }
  return fingerprint
}
const buildCompoundsSignature = (compoundVariants, compoundSlots) => {
  let signature = ""
  for (let i = 0; i < compoundVariants.length; i++) {
    const { conditionKeys, source } = compoundVariants[i]
    for (let j = 0; j < conditionKeys.length; j++) {
      const key = conditionKeys[j]
      signature += key + "="
      signature = appendSignatureValue(signature, source[key])
      signature += ","
    }
    signature += "c="
    signature = appendSignatureValue(signature, source.class)
    signature += "|cn="
    signature = appendSignatureValue(signature, source.className)
    signature += ";"
  }
  for (let i = 0; i < compoundSlots.length; i++) {
    const { conditionKeys, source } = compoundSlots[i]
    for (let j = 0; j < conditionKeys.length; j++) {
      const key = conditionKeys[j]
      signature += key + "="
      signature = appendSignatureValue(signature, source[key])
      signature += ","
    }
    if (Array.isArray(source.slots)) signature += "slots=" + source.slots.join(",") + ","
    signature += "c="
    signature = appendSignatureValue(signature, source.class)
    signature += "|cn="
    signature = appendSignatureValue(signature, source.className)
    signature += ";"
  }
  return signature
}
const createBoundedCache = (limit = VARIANT_CACHE_LIMIT) => {
  let primary = /* @__PURE__ */ new Map()
  let secondary = null
  return {
    get(key) {
      if (primary.has(key)) return primary.get(key)
      if (secondary == null ? void 0 : secondary.has(key)) {
        const value = secondary.get(key)
        primary.set(key, value)
        return value
      }
      return CACHE_MISS
    },
    set(key, value) {
      if (primary.size >= limit) {
        secondary = primary
        primary = /* @__PURE__ */ new Map()
      }
      primary.set(key, value)
    },
  }
}
const createResultCache = (limit = VARIANT_CACHE_LIMIT) => {
  const cache = createBoundedCache(limit)
  return {
    get(key) {
      return cache.get(key)
    },
    set(key, value) {
      cache.set(key, value)
    },
  }
}
const createNestedOverrideCache = (limit = OVERRIDE_CACHE_LIMIT) => {
  let primary = /* @__PURE__ */ new Map()
  let secondary = null
  let size = 0
  return {
    get(coreKey, overrideKey) {
      const primaryInner = primary.get(coreKey)
      if (primaryInner) {
        const value = primaryInner.get(overrideKey)
        if (value !== void 0 || primaryInner.has(overrideKey)) return value
      }
      if (secondary) {
        const secondaryInner = secondary.get(coreKey)
        if (secondaryInner) {
          const value = secondaryInner.get(overrideKey)
          if (value !== void 0 || secondaryInner.has(overrideKey)) {
            let promoteInner = primary.get(coreKey)
            if (!promoteInner) {
              promoteInner = /* @__PURE__ */ new Map()
              primary.set(coreKey, promoteInner)
            }
            if (!promoteInner.has(overrideKey)) size++
            promoteInner.set(overrideKey, value)
            return value
          }
        }
      }
      return CACHE_MISS
    },
    set(coreKey, overrideKey, value) {
      if (size >= limit) {
        secondary = primary
        primary = /* @__PURE__ */ new Map()
        size = 0
      }
      let inner = primary.get(coreKey)
      if (!inner) {
        inner = /* @__PURE__ */ new Map()
        primary.set(coreKey, inner)
      }
      if (!inner.has(overrideKey)) size++
      inner.set(overrideKey, value)
    },
  }
}
const createLazyOverrideMerge = (cn, config) => {
  let cache = null
  return (core, props) => {
    if (!hasClassOverride(props)) return core
    const classVal = props.class
    const classNameVal = props.className
    if (
      (classVal != null && classVal !== "" && typeof classVal !== "string") ||
      (classNameVal != null && classNameVal !== "" && typeof classNameVal !== "string")
    )
      return cn(config, core, classVal, classNameVal)
    cache ??= createNestedOverrideCache()
    const coreKey = core ?? ""
    const overrideKey =
      (typeof classVal === "string" ? classVal : "") +
      "\0" +
      (typeof classNameVal === "string" ? classNameVal : "")
    const cached = cache.get(coreKey, overrideKey)
    if (cached !== CACHE_MISS) return cached
    const merged = cn(config, core, classVal, classNameVal)
    cache.set(coreKey, overrideKey, merged)
    return merged
  }
}
function createState() {
  let cachedTwMerge = null
  let cachedTwMergeConfig = {}
  let didTwMergeConfigChange = false
  return {
    get cachedTwMerge() {
      return cachedTwMerge
    },
    set cachedTwMerge(value) {
      cachedTwMerge = value
    },
    get cachedTwMergeConfig() {
      return cachedTwMergeConfig
    },
    set cachedTwMergeConfig(value) {
      cachedTwMergeConfig = value
    },
    get didTwMergeConfigChange() {
      return didTwMergeConfigChange
    },
    set didTwMergeConfigChange(value) {
      didTwMergeConfigChange = value
    },
    reset() {
      cachedTwMerge = null
      cachedTwMergeConfig = {}
      didTwMergeConfigChange = false
    },
  }
}
const state = createState()
const synchronizeTwMergeConfig = (config) => {
  if (
    !isEmptyObject(config.twMergeConfig) &&
    !isEqual(config.twMergeConfig, state.cachedTwMergeConfig)
  ) {
    state.didTwMergeConfigChange = true
    state.cachedTwMergeConfig = config.twMergeConfig
  }
}
const compileVariants = (variants, variantKeys) => {
  const compiledVariants = []
  for (let i = 0; i < variantKeys.length; i++) {
    const key = variantKeys[i]
    const values = variants[key]
    compiledVariants.push({
      key,
      values,
      isEmpty: isEmptyObject(values),
    })
  }
  return compiledVariants
}
const compileCompoundVariants = (compoundVariants) => {
  if (!Array.isArray(compoundVariants) || compoundVariants.length === 0) return []
  const result = []
  for (let i = 0; i < compoundVariants.length; i++) {
    const compoundVariant = compoundVariants[i]
    const conditionKeys = []
    for (const key in compoundVariant)
      if (key !== "class" && key !== "className") conditionKeys.push(key)
    result.push({
      conditionKeys,
      source: compoundVariant,
    })
  }
  return result
}
const compileCompoundSlots = (compoundSlots) => {
  if (!Array.isArray(compoundSlots) || compoundSlots.length === 0) return []
  const result = []
  for (let i = 0; i < compoundSlots.length; i++) {
    const compoundSlot = compoundSlots[i]
    const conditionKeys = []
    for (const key in compoundSlot)
      if (key !== "slots" && key !== "class" && key !== "className") conditionKeys.push(key)
    result.push({
      conditionKeys,
      source: compoundSlot,
    })
  }
  return result
}
const indexCompoundSlotsBySlot = (compiledCompoundSlots) => {
  const index = {}
  for (let i = 0; i < compiledCompoundSlots.length; i++) {
    const compoundSlot = compiledCompoundSlots[i]
    const slots = compoundSlot.source.slots
    if (!Array.isArray(slots)) continue
    for (let j = 0; j < slots.length; j++) {
      const slotKey = slots[j]
      if (!index[slotKey]) index[slotKey] = []
      index[slotKey].push(compoundSlot)
    }
  }
  return index
}
const resolveOptions = (options, configProp) => {
  const {
    extend = null,
    slots: slotProps = {},
    variants: variantsProps = {},
    compoundVariants: compoundVariantsProps = [],
    compoundSlots: compoundSlotsProps = [],
    defaultVariants: defaultVariantsProps = {},
  } = options
  const config = {
    ...defaultConfig,
    ...configProp,
  }
  const hasSlots = options.slots !== void 0
  const base = (extend == null ? void 0 : extend.base)
    ? cx(extend.base, options == null ? void 0 : options.base)
    : options == null
      ? void 0
      : options.base
  const variants =
    (extend == null ? void 0 : extend.variants) && !isEmptyObject(extend.variants)
      ? mergeObjects(variantsProps, extend.variants)
      : variantsProps
  const defaultVariants =
    (extend == null ? void 0 : extend.defaultVariants) && !isEmptyObject(extend.defaultVariants)
      ? {
          ...extend.defaultVariants,
          ...defaultVariantsProps,
        }
      : defaultVariantsProps
  synchronizeTwMergeConfig(config)
  const isExtendedSlotsEmpty =
    !(extend == null ? void 0 : extend.slots) || isEmptyObject(extend.slots)
  const componentBase = hasSlots
    ? isExtendedSlotsEmpty && (extend == null ? void 0 : extend.base)
      ? cx(options == null ? void 0 : options.base, extend.base)
      : typeof (options == null ? void 0 : options.base) === "string" ||
          (options == null ? void 0 : options.base) == null
        ? options.base
        : cx(options.base)
    : void 0
  const componentSlots = hasSlots
    ? {
        base: componentBase,
        ...slotProps,
      }
    : {}
  const slots = isExtendedSlotsEmpty
    ? componentSlots
    : joinObjects(
        { ...(extend == null ? void 0 : extend.slots) },
        isEmptyObject(componentSlots)
          ? { base: options == null ? void 0 : options.base }
          : componentSlots,
      )
  const compoundVariants =
    !(extend == null ? void 0 : extend.compoundVariants) || isEmptyObject(extend.compoundVariants)
      ? compoundVariantsProps
      : flatMergeArrays(extend == null ? void 0 : extend.compoundVariants, compoundVariantsProps)
  const compoundSlots =
    !(extend == null ? void 0 : extend.compoundSlots) || isEmptyObject(extend.compoundSlots)
      ? compoundSlotsProps
      : flatMergeArrays(extend == null ? void 0 : extend.compoundSlots, compoundSlotsProps)
  const variantKeys = Object.keys(variants)
  return {
    config,
    extend,
    base,
    variants,
    defaultVariants,
    slots,
    compoundVariants,
    compoundSlots,
    compiledVariants: null,
    compiledCompoundVariants: null,
    compiledCompoundSlots: null,
    compiledCompoundSlotsBySlot: null,
    deferredError:
      compoundVariants && !Array.isArray(compoundVariants)
        ? /* @__PURE__ */ new TypeError(
            `The "compoundVariants" prop must be an array. Received: ${typeof compoundVariants}`,
          )
        : compoundSlots && !Array.isArray(compoundSlots)
          ? /* @__PURE__ */ new TypeError(
              `The "compoundSlots" prop must be an array. Received: ${typeof compoundSlots}`,
            )
          : null,
    mode:
      hasSlots || !isExtendedSlotsEmpty ? "slots" : variantKeys.length === 0 ? "plain" : "variants",
    slotKeys: null,
    variantKeys,
  }
}
const compileResolvedOptions = (resolved) => {
  if (resolved.compiledVariants !== null) return resolved
  resolved.compiledVariants = compileVariants(resolved.variants, resolved.variantKeys)
  resolved.compiledCompoundVariants = compileCompoundVariants(resolved.compoundVariants)
  resolved.compiledCompoundSlots = compileCompoundSlots(resolved.compoundSlots)
  resolved.compiledCompoundSlotsBySlot = indexCompoundSlotsBySlot(resolved.compiledCompoundSlots)
  resolved.slotKeys =
    resolved.slots && typeof resolved.slots === "object" ? Object.keys(resolved.slots) : []
  return resolved
}
const EMPTY_ARRAY = []
const variantClassesScratch = []
const compoundClassesScratch = []
const compoundVariantBySlotScratch = []
const compoundSlotClassesScratch = []
const getCompleteProps = (defaultVariants, props, slotProps) => {
  const result = {}
  for (const key in defaultVariants) result[key] = defaultVariants[key]
  if (props) {
    for (const key in props) if (props[key] !== void 0) result[key] = props[key]
  }
  if (slotProps) {
    for (const key in slotProps) if (slotProps[key] !== void 0) result[key] = slotProps[key]
  }
  return result
}
const isNullishOrFalse = (value) => value == null || value === false
const matchesCompoundValue = (expected, actual) => {
  if (!Array.isArray(expected))
    return expected === actual || (isNullishOrFalse(expected) && isNullishOrFalse(actual))
  for (let i = 0; i < expected.length; i++) {
    const expectedValue = expected[i]
    if (expectedValue === actual || (isNullishOrFalse(expectedValue) && isNullishOrFalse(actual)))
      return true
  }
  return false
}
const getVariantValue = (variant, defaultVariants, props, slotProps) => {
  if (variant.isEmpty) return null
  const variantProp =
    (slotProps == null ? void 0 : slotProps[variant.key]) ??
    (props == null ? void 0 : props[variant.key])
  if (variantProp === null) return null
  const variantKey = falsyToString(variantProp)
  if (typeof variantKey === "object") return null
  const defaultVariantProp = defaultVariants == null ? void 0 : defaultVariants[variant.key]
  const key = variantKey != null ? variantKey : falsyToString(defaultVariantProp)
  return variant.values[key || "false"]
}
const matchesConditions = (compound, completeProps) => {
  const { conditionKeys, source } = compound
  for (let i = 0; i < conditionKeys.length; i++) {
    const key = conditionKeys[i]
    if (!matchesCompoundValue(source[key], completeProps[key])) return false
  }
  return true
}
const pushCompoundClassForSlot = (result, slotKey, classValue) => {
  if (typeof classValue === "string") {
    if (slotKey === "base") result.push(classValue)
  } else if (classValue && typeof classValue === "object" && classValue[slotKey])
    result.push(classValue[slotKey])
}
const getVariantClassNames = (variants, defaultVariants, props) => {
  const result = variantClassesScratch
  result.length = 0
  for (let i = 0; i < variants.length; i++) {
    const value = getVariantValue(variants[i], defaultVariants, props)
    if (value) result.push(value)
  }
  return result
}
const getVariantClassNamesBySlot = (slotKey, variants, defaultVariants, props, slotProps) => {
  const result = variantClassesScratch
  result.length = 0
  for (let i = 0; i < variants.length; i++) {
    const variantValue = getVariantValue(variants[i], defaultVariants, props, slotProps)
    const value =
      slotKey === "base" && typeof variantValue === "string"
        ? variantValue
        : variantValue && variantValue[slotKey]
    if (value) result.push(value)
  }
  return result
}
const getCompoundVariantClasses = (compoundVariants, completeProps) => {
  const result = compoundClassesScratch
  result.length = 0
  for (let i = 0; i < compoundVariants.length; i++) {
    const compoundVariant = compoundVariants[i]
    if (!matchesConditions(compoundVariant, completeProps)) continue
    if (compoundVariant.source.class) result.push(compoundVariant.source.class)
    if (compoundVariant.source.className) result.push(compoundVariant.source.className)
  }
  return result
}
const getCompoundVariantClassesBySlot = (slotKey, compoundVariants, completeProps) => {
  const result = compoundVariantBySlotScratch
  result.length = 0
  for (let i = 0; i < compoundVariants.length; i++) {
    const compoundVariant = compoundVariants[i]
    if (!matchesConditions(compoundVariant, completeProps)) continue
    pushCompoundClassForSlot(result, slotKey, compoundVariant.source.class)
    pushCompoundClassForSlot(result, slotKey, compoundVariant.source.className)
  }
  return result
}
const getCompoundSlotClasses = (compoundSlotsForKey, completeProps) => {
  const result = compoundSlotClassesScratch
  result.length = 0
  for (let i = 0; i < compoundSlotsForKey.length; i++) {
    const compoundSlot = compoundSlotsForKey[i]
    if (!matchesConditions(compoundSlot, completeProps)) continue
    if (compoundSlot.source.class) result.push(compoundSlot.source.class)
    if (compoundSlot.source.className) result.push(compoundSlot.source.className)
  }
  return result
}
const createPlainResolver = (resolved, cn) => {
  const { base, config } = resolved
  let core = CACHE_MISS
  const mergeOverride = createLazyOverrideMerge(cn, config)
  return (props) => {
    if (core === CACHE_MISS) core = cn(config, base)
    return mergeOverride(core, props)
  }
}
const createVariantResolver = (resolved, cn) => {
  const { base, config, defaultVariants, deferredError, variantKeys } = resolved
  let compiledCompoundVariants = resolved.compiledCompoundVariants
  let compiledVariants = resolved.compiledVariants
  let compiledCompoundSlots = EMPTY_ARRAY
  let cache = null
  const mergeOverride = createLazyOverrideMerge(cn, config)
  let coldInvokesRemaining = 1
  const computeCore = (props) => {
    const compoundClasses =
      compiledCompoundVariants.length > 0
        ? getCompoundVariantClasses(
            compiledCompoundVariants,
            getCompleteProps(defaultVariants, props),
          )
        : void 0
    return cn(
      config,
      base,
      getVariantClassNames(compiledVariants, defaultVariants, props),
      compoundClasses,
    )
  }
  return (props) => {
    if (deferredError) throw deferredError
    if (compiledVariants === null || compiledCompoundVariants === null) {
      compileResolvedOptions(resolved)
      compiledVariants = resolved.compiledVariants
      compiledCompoundVariants = resolved.compiledCompoundVariants
      compiledCompoundSlots = resolved.compiledCompoundSlots ?? EMPTY_ARRAY
    }
    let core
    if (coldInvokesRemaining > 0) {
      coldInvokesRemaining--
      core = computeCore(props)
    } else {
      cache ??= createResultCache()
      const propsFingerprint = buildPropsFingerprint(variantKeys, defaultVariants, props)
      if (propsFingerprint !== null) {
        const compoundsSig =
          compiledCompoundVariants.length > 0 || compiledCompoundSlots.length > 0
            ? buildCompoundsSignature(compiledCompoundVariants, compiledCompoundSlots)
            : ""
        const cacheKey = propsFingerprint + "#" + compoundsSig
        const cached = cache.get(cacheKey)
        if (cached !== CACHE_MISS) core = cached
        else {
          core = computeCore(props)
          cache.set(cacheKey, core)
        }
      } else core = computeCore(props)
    }
    return mergeOverride(core, props)
  }
}
const createSlotsResolver = (resolved, cn) => {
  const { config, defaultVariants, deferredError, slots, variantKeys } = resolved
  let compoundVariants = null
  let compoundSlots = null
  let keys = null
  let slotComputers = null
  let hasCompounds = false
  let mergeOverride = null
  let parentCache = null
  let coldParentInvokesRemaining = 1
  const ensureCompiled = () => {
    if (keys !== null) return
    if (
      resolved.compiledVariants === null ||
      resolved.compiledCompoundVariants === null ||
      resolved.compiledCompoundSlots === null ||
      resolved.compiledCompoundSlotsBySlot === null ||
      resolved.slotKeys === null
    )
      compileResolvedOptions(resolved)
    const variants = resolved.compiledVariants
    compoundVariants = resolved.compiledCompoundVariants
    compoundSlots = resolved.compiledCompoundSlots
    const compoundSlotsBySlot = resolved.compiledCompoundSlotsBySlot
    keys = resolved.slotKeys
    hasCompounds = compoundVariants.length > 0 || compoundSlots.length > 0
    mergeOverride = createLazyOverrideMerge(cn, config)
    const computers = new Array(keys.length)
    for (let i = 0; i < keys.length; i++) {
      const slotKey = keys[i]
      const compoundSlotsForKey = compoundSlotsBySlot[slotKey] ?? EMPTY_ARRAY
      computers[i] = (propsRef, slotProps) => {
        const completeProps = hasCompounds
          ? getCompleteProps(defaultVariants, propsRef, slotProps)
          : void 0
        const compoundVariantClasses = completeProps
          ? getCompoundVariantClassesBySlot(slotKey, compoundVariants, completeProps)
          : void 0
        const compoundSlotClasses = completeProps
          ? getCompoundSlotClasses(compoundSlotsForKey, completeProps)
          : void 0
        return cn(
          config,
          slots[slotKey],
          getVariantClassNamesBySlot(slotKey, variants, defaultVariants, propsRef, slotProps),
          compoundVariantClasses,
          compoundSlotClasses,
        )
      }
    }
    slotComputers = computers
  }
  const createSlotsResult = (props) => {
    const slotKeys = keys
    const computers = slotComputers
    const overrideMerge = mergeOverride
    const result = {}
    for (let i = 0; i < slotKeys.length; i++) {
      const compute = computers[i]
      const core = compute(props)
      result[slotKeys[i]] = (slotProps) => {
        if (slotProps == null) return core
        let hasVariantOverride = false
        for (const key in slotProps) {
          if (key === "class" || key === "className") continue
          if (slotProps[key] !== void 0) {
            hasVariantOverride = true
            break
          }
        }
        if (!hasVariantOverride) return overrideMerge(core, slotProps)
        return overrideMerge(compute(props, slotProps), slotProps)
      }
    }
    return result
  }
  return (props) => {
    if (deferredError) throw deferredError
    ensureCompiled()
    if (coldParentInvokesRemaining > 0) {
      coldParentInvokesRemaining--
      return createSlotsResult(props)
    }
    const propsFingerprint = buildPropsFingerprint(variantKeys, defaultVariants, props)
    if (propsFingerprint === null) return createSlotsResult(props)
    const compoundsSig = hasCompounds
      ? buildCompoundsSignature(compoundVariants, compoundSlots)
      : ""
    const cacheKey = propsFingerprint + "#" + compoundsSig
    parentCache ??= createBoundedCache()
    const cached = parentCache.get(cacheKey)
    if (cached !== CACHE_MISS) return cached
    const next = createSlotsResult(props)
    parentCache.set(cacheKey, next)
    return next
  }
}
const createClassResolver = (resolved, cn) => {
  if (resolved.mode === "plain") return createPlainResolver(resolved, cn)
  let resolver
  return (props) => {
    resolver ??=
      resolved.mode === "slots"
        ? createSlotsResolver(resolved, cn)
        : createVariantResolver(resolved, cn)
    return resolver(props)
  }
}
const attachComponentMetadata = (component, resolved) => {
  component.variantKeys = resolved.variantKeys
  component.extend = resolved.extend
  component.base = resolved.base
  component.slots = resolved.slots
  component.variants = resolved.variants
  component.defaultVariants = resolved.defaultVariants
  component.compoundSlots = resolved.compoundSlots
  component.compoundVariants = resolved.compoundVariants
}
const getTailwindVariants = (cn) => {
  const tv = (options, configProp) => {
    const resolved = resolveOptions(options, configProp)
    const component = createClassResolver(resolved, cn)
    attachComponentMetadata(component, resolved)
    return component
  }
  const createTV = (configProp) => {
    return (options, config) => tv(options, config ? mergeObjects(configProp, config) : configProp)
  }
  return {
    tv,
    createTV,
  }
}
//#endregion
//#region node_modules/.pnpm/tailwind-variants@3.3.1_tai_a0d26b71ce9e28cd9d002deff65621c9/node_modules/tailwind-variants/dist/index.js
const concatArrays = (array1, array2) => {
  const length1 = array1.length
  const length2 = array2.length
  const combined = new Array(length1 + length2)
  for (let i = 0; i < length1; i++) combined[i] = array1[i]
  for (let i = 0; i < length2; i++) combined[length1 + i] = array2[i]
  return combined
}
const createClassValidatorObject = (classGroupId, validator) => ({
  classGroupId,
  validator,
})
const createClassPartObject = (
  nextPart = /* @__PURE__ */ new Map(),
  validators = null,
  classGroupId,
) => ({
  nextPart,
  validators,
  classGroupId,
})
const CLASS_PART_SEPARATOR = "-"
const EMPTY_CONFLICTS = []
const ARBITRARY_PROPERTY_PREFIX = "arbitrary.."
const createClassGroupUtils = (config) => {
  const classMap = createClassMap(config)
  const { conflictingClassGroups, conflictingClassGroupModifiers } = config
  const getClassGroupId = (className) => {
    if (className[0] === "[" && className[className.length - 1] === "]")
      return getGroupIdForArbitraryProperty(className)
    const classParts = className.split(CLASS_PART_SEPARATOR)
    return getGroupRecursive(
      classParts,
      classParts[0] === "" && classParts.length > 1 ? 1 : 0,
      classMap,
    )
  }
  const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
    if (hasPostfixModifier) {
      const modifierConflicts = conflictingClassGroupModifiers[classGroupId]
      const baseConflicts = conflictingClassGroups[classGroupId]
      if (modifierConflicts) {
        if (baseConflicts) return concatArrays(baseConflicts, modifierConflicts)
        return modifierConflicts
      }
      return baseConflicts || EMPTY_CONFLICTS
    }
    return conflictingClassGroups[classGroupId] || EMPTY_CONFLICTS
  }
  return {
    getClassGroupId,
    getConflictingClassGroupIds,
  }
}
const getGroupRecursive = (classParts, startIndex, classPartObject) => {
  if (classParts.length - startIndex === 0) return classPartObject.classGroupId
  const currentClassPart = classParts[startIndex]
  const nextClassPartObject = classPartObject.nextPart.get(currentClassPart)
  if (nextClassPartObject) {
    const result = getGroupRecursive(classParts, startIndex + 1, nextClassPartObject)
    if (result) return result
  }
  const validators = classPartObject.validators
  if (validators === null) return
  const classRest =
    startIndex === 0
      ? classParts.join(CLASS_PART_SEPARATOR)
      : classParts.slice(startIndex).join(CLASS_PART_SEPARATOR)
  const validatorsLength = validators.length
  for (let index = 0; index < validatorsLength; index++) {
    const validatorObject = validators[index]
    if (validatorObject.validator(classRest)) return validatorObject.classGroupId
  }
}
const getGroupIdForArbitraryProperty = (className) => {
  const content = className.slice(1, -1)
  const colonIndex = content.indexOf(":")
  if (colonIndex === -1) return
  const property = content.slice(0, colonIndex)
  return property ? ARBITRARY_PROPERTY_PREFIX + property : void 0
}
const createClassMap = (config) => {
  const { theme, classGroups } = config
  return processClassGroups(classGroups, theme)
}
const processClassGroups = (classGroups, theme) => {
  const classMap = createClassPartObject()
  for (const classGroupId in classGroups) {
    const group = classGroups[classGroupId]
    processClassesRecursively(group, classMap, classGroupId, theme)
  }
  return classMap
}
const processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
  const length = classGroup.length
  for (let index = 0; index < length; index++) {
    const classDefinition = classGroup[index]
    processClassDefinition(classDefinition, classPartObject, classGroupId, theme)
  }
}
const processClassDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
  if (typeof classDefinition === "string") {
    processStringDefinition(classDefinition, classPartObject, classGroupId)
    return
  }
  if (typeof classDefinition === "function") {
    processFunctionDefinition(classDefinition, classPartObject, classGroupId, theme)
    return
  }
  processObjectDefinition(classDefinition, classPartObject, classGroupId, theme)
}
const processStringDefinition = (classDefinition, classPartObject, classGroupId) => {
  const classPartObjectToEdit =
    classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition)
  classPartObjectToEdit.classGroupId = classGroupId
}
const processFunctionDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
  if (isThemeGetter(classDefinition)) {
    processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme)
    return
  }
  if (classPartObject.validators === null) classPartObject.validators = []
  classPartObject.validators.push(createClassValidatorObject(classGroupId, classDefinition))
}
const processObjectDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
  const entries = Object.entries(classDefinition)
  const length = entries.length
  for (let index = 0; index < length; index++) {
    const [key, value] = entries[index]
    processClassesRecursively(value, getPart(classPartObject, key), classGroupId, theme)
  }
}
const getPart = (classPartObject, path) => {
  let current = classPartObject
  const parts = path.split(CLASS_PART_SEPARATOR)
  const length = parts.length
  for (let index = 0; index < length; index++) {
    const part = parts[index]
    let next = current.nextPart.get(part)
    if (!next) {
      next = createClassPartObject()
      current.nextPart.set(part, next)
    }
    current = next
  }
  return current
}
const isThemeGetter = (classDefinition) =>
  "isThemeGetter" in classDefinition && classDefinition.isThemeGetter === true
const IMPORTANT_MODIFIER = "!"
const CHAR_MODIFIER_SEPARATOR = 58
const CHAR_POSTFIX_SEPARATOR = 47
const CHAR_OPEN_BRACKET = 91
const CHAR_CLOSE_BRACKET = 93
const CHAR_OPEN_PAREN = 40
const CHAR_CLOSE_PAREN = 41
const CHAR_IMPORTANT = 33
const createResultObject = (
  modifiers,
  hasImportantModifier,
  baseClassName,
  maybePostfixModifierPosition,
) => ({
  modifiers,
  hasImportantModifier,
  baseClassName,
  maybePostfixModifierPosition,
  isExternal: void 0,
})
const parseClassName = (className) => {
  const modifiers = []
  let bracketDepth = 0
  let parenDepth = 0
  let modifierStart = 0
  let postfixModifierPosition
  const len = className.length
  for (let index = 0; index < len; index++) {
    const charCode = className.charCodeAt(index)
    if (bracketDepth === 0 && parenDepth === 0) {
      if (charCode === CHAR_MODIFIER_SEPARATOR) {
        modifiers.push(className.slice(modifierStart, index))
        modifierStart = index + 1
        continue
      }
      if (charCode === CHAR_POSTFIX_SEPARATOR) {
        postfixModifierPosition = index
        continue
      }
    }
    if (charCode === CHAR_OPEN_BRACKET) bracketDepth++
    else if (charCode === CHAR_CLOSE_BRACKET) bracketDepth--
    else if (charCode === CHAR_OPEN_PAREN) parenDepth++
    else if (charCode === CHAR_CLOSE_PAREN) parenDepth--
  }
  const baseClassNameWithImportantModifier =
    modifiers.length === 0 ? className : className.slice(modifierStart)
  let baseClassName = baseClassNameWithImportantModifier
  let hasImportantModifier = false
  const lastIndex = baseClassNameWithImportantModifier.length - 1
  if (baseClassNameWithImportantModifier.charCodeAt(lastIndex) === CHAR_IMPORTANT) {
    baseClassName = baseClassNameWithImportantModifier.slice(0, -1)
    hasImportantModifier = true
  } else if (baseClassNameWithImportantModifier.charCodeAt(0) === CHAR_IMPORTANT) {
    baseClassName = baseClassNameWithImportantModifier.slice(1)
    hasImportantModifier = true
  }
  const maybePostfixModifierPosition =
    postfixModifierPosition && postfixModifierPosition > modifierStart
      ? postfixModifierPosition - modifierStart
      : void 0
  return createResultObject(
    modifiers,
    hasImportantModifier,
    baseClassName,
    maybePostfixModifierPosition,
  )
}
const createSortModifiers = (config) => {
  const orderSensitiveModifiers = new Set(config.orderSensitiveModifiers)
  return (modifiers) => {
    const result = []
    let currentSegment = []
    for (let index = 0; index < modifiers.length; index++) {
      const modifier = modifiers[index]
      const isArbitrary = modifier[0] === "["
      const isOrderSensitive = orderSensitiveModifiers.has(modifier)
      if (isArbitrary || isOrderSensitive) {
        if (currentSegment.length > 0) {
          currentSegment.sort()
          for (let segmentIndex = 0; segmentIndex < currentSegment.length; segmentIndex++)
            result.push(currentSegment[segmentIndex])
          currentSegment = []
        }
        result.push(modifier)
      } else currentSegment.push(modifier)
    }
    if (currentSegment.length > 0) {
      currentSegment.sort()
      for (let segmentIndex = 0; segmentIndex < currentSegment.length; segmentIndex++)
        result.push(currentSegment[segmentIndex])
    }
    return result
  }
}
const EXTERNAL_DESCRIPTOR = {
  isExternal: true,
  classId: -1,
  conflictIds: [],
}
const DESCRIPTOR_CACHE_SIZE = 4096
const MAX_CONFLICT_KEYS = 16384
const createConfigUtils = (config) => {
  const sortModifiers = createSortModifiers(config)
  const postfixLookupClassGroupIds = createPostfixLookupClassGroupIds(config)
  const { getClassGroupId, getConflictingClassGroupIds } = createClassGroupUtils(config)
  let descriptorCache = /* @__PURE__ */ Object.create(null)
  let previousDescriptorCache = /* @__PURE__ */ Object.create(null)
  let descriptorCacheSize = 0
  let claimedGeneration = /* @__PURE__ */ new Int32Array(256)
  let currentGeneration = 0
  let keepFlags = /* @__PURE__ */ new Uint8Array(64)
  let splitSawNonSpaceWhitespace = false
  const splitClassList = (classList) => {
    const tokens = []
    const length = classList.length
    let tokenStart = -1
    splitSawNonSpaceWhitespace = false
    for (let index = 0; index < length; index++) {
      const charCode = classList.charCodeAt(index)
      if (charCode === 32) {
        if (tokenStart !== -1) {
          tokens.push(classList.slice(tokenStart, index))
          tokenStart = -1
        }
      } else if (charCode >= 9 && charCode <= 13) {
        splitSawNonSpaceWhitespace = true
        if (tokenStart !== -1) {
          tokens.push(classList.slice(tokenStart, index))
          tokenStart = -1
        }
      } else if (tokenStart === -1) tokenStart = index
    }
    if (tokenStart !== -1) tokens.push(classList.slice(tokenStart))
    return tokens
  }
  const conflictKeyIds = /* @__PURE__ */ new Map()
  let nextConflictKeyId = 0
  const internConflictKey = (conflictKey) => {
    let id = conflictKeyIds.get(conflictKey)
    if (id === void 0) {
      id = nextConflictKeyId++
      conflictKeyIds.set(conflictKey, id)
      if (id >= claimedGeneration.length) {
        const grown = new Int32Array(claimedGeneration.length * 2)
        grown.set(claimedGeneration)
        claimedGeneration = grown
      }
    }
    return id
  }
  const computeClassDescriptor = (originalClassName) => {
    const {
      isExternal,
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition,
    } = parseClassName(originalClassName)
    if (isExternal) return EXTERNAL_DESCRIPTOR
    let hasPostfixModifier = Boolean(maybePostfixModifierPosition)
    let classGroupId
    if (hasPostfixModifier) {
      const baseClassNameWithoutPostfix = baseClassName.substring(0, maybePostfixModifierPosition)
      classGroupId = getClassGroupId(baseClassNameWithoutPostfix)
      const classGroupIdWithPostfix =
        classGroupId && postfixLookupClassGroupIds[classGroupId]
          ? getClassGroupId(baseClassName)
          : void 0
      if (classGroupIdWithPostfix && classGroupIdWithPostfix !== classGroupId) {
        classGroupId = classGroupIdWithPostfix
        hasPostfixModifier = false
      }
    } else classGroupId = getClassGroupId(baseClassName)
    if (!classGroupId) {
      if (!hasPostfixModifier) return EXTERNAL_DESCRIPTOR
      classGroupId = getClassGroupId(baseClassName)
      if (!classGroupId) return EXTERNAL_DESCRIPTOR
      hasPostfixModifier = false
    }
    const variantModifier =
      modifiers.length === 0
        ? ""
        : modifiers.length === 1
          ? modifiers[0]
          : sortModifiers(modifiers).join(":")
    const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier
    const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier)
    const conflictIds = []
    for (let index = 0; index < conflictGroups.length; index++)
      conflictIds.push(internConflictKey(modifierId + conflictGroups[index]))
    return {
      isExternal: false,
      classId: internConflictKey(modifierId + classGroupId),
      conflictIds,
    }
  }
  const getClassDescriptor = (originalClassName) => {
    let descriptor = descriptorCache[originalClassName]
    if (descriptor !== void 0) return descriptor
    descriptor = previousDescriptorCache[originalClassName]
    if (descriptor === void 0) descriptor = computeClassDescriptor(originalClassName)
    descriptorCache[originalClassName] = descriptor
    if (++descriptorCacheSize > DESCRIPTOR_CACHE_SIZE) {
      descriptorCacheSize = 0
      previousDescriptorCache = descriptorCache
      descriptorCache = /* @__PURE__ */ Object.create(null)
    }
    return descriptor
  }
  const mergeClassList = (classList) => {
    const classNames = splitClassList(classList)
    const classCount = classNames.length
    if (classCount === 1) return classNames[0]
    if (nextConflictKeyId > MAX_CONFLICT_KEYS) {
      conflictKeyIds.clear()
      nextConflictKeyId = 0
      descriptorCache = /* @__PURE__ */ Object.create(null)
      previousDescriptorCache = /* @__PURE__ */ Object.create(null)
      descriptorCacheSize = 0
    }
    currentGeneration = (currentGeneration + 1) | 0
    if (currentGeneration === 0) currentGeneration = 1
    const generation = currentGeneration
    if (classCount > keepFlags.length) {
      let capacity = keepFlags.length
      while (capacity < classCount) capacity *= 2
      keepFlags = new Uint8Array(capacity)
    }
    let didDrop = false
    let tokenCharCount = 0
    for (let index = classCount - 1; index >= 0; index -= 1) {
      const className = classNames[index]
      tokenCharCount += className.length
      const descriptor = getClassDescriptor(className)
      if (descriptor.isExternal) {
        keepFlags[index] = 1
        continue
      }
      const classId = descriptor.classId
      if (claimedGeneration[classId] === generation) {
        keepFlags[index] = 0
        didDrop = true
        continue
      }
      claimedGeneration[classId] = generation
      const conflictIds = descriptor.conflictIds
      for (let conflictIndex = 0; conflictIndex < conflictIds.length; conflictIndex++)
        claimedGeneration[conflictIds[conflictIndex]] = generation
      keepFlags[index] = 1
    }
    if (
      !didDrop &&
      !splitSawNonSpaceWhitespace &&
      classList.length === tokenCharCount + classCount - 1
    )
      return classList
    let result = ""
    for (let index = 0; index < classCount; index++)
      if (keepFlags[index] === 1) {
        if (result) result += " "
        result += classNames[index]
      }
    return result
  }
  return {
    parseClassName,
    sortModifiers,
    postfixLookupClassGroupIds,
    getClassGroupId,
    getConflictingClassGroupIds,
    getClassDescriptor,
    mergeClassList,
  }
}
const createPostfixLookupClassGroupIds = (config) => {
  const lookup = /* @__PURE__ */ Object.create(null)
  const classGroupIds = config.postfixLookupClassGroups
  if (classGroupIds)
    for (let index = 0; index < classGroupIds.length; index++) lookup[classGroupIds[index]] = true
  return lookup
}
const MERGE_CACHE_SIZE = 500
const createTailwindMerge = (createConfig) => {
  let configUtils
  let mergeClassList
  let cache = /* @__PURE__ */ Object.create(null)
  let previousCache = /* @__PURE__ */ Object.create(null)
  let cacheSize = 0
  const initTailwindMerge = (classList) => {
    configUtils = createConfigUtils(createConfig())
    mergeClassList = configUtils.mergeClassList
    merge.mergeString = tailwindMerge
    return tailwindMerge(classList)
  }
  const tailwindMerge = (classList) => {
    let result = cache[classList]
    if (result !== void 0) return result
    result = previousCache[classList]
    if (result === void 0) result = mergeClassList(classList)
    cache[classList] = result
    if (++cacheSize > MERGE_CACHE_SIZE) {
      cacheSize = 0
      previousCache = cache
      cache = /* @__PURE__ */ Object.create(null)
    }
    return result
  }
  const merge = (...args) => merge.mergeString(joinClassValue(args))
  merge.mergeString = initTailwindMerge
  return merge
}
const fallbackThemeArr = []
const fromTheme = (key) => {
  const themeGetter = (theme) => theme[key] || fallbackThemeArr
  themeGetter.isThemeGetter = true
  return themeGetter
}
const arbitraryValueRegex = /^\[(?:(\w[\w-]*):)?(.+)\]$/i
const arbitraryVariableRegex = /^\((?:(\w[\w-]*):)?(.+)\)$/i
const fractionRegex = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/
const tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/
const lengthUnitRegex =
  /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/
const colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/
const shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/
const imageRegex =
  /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/
const toNumber = Number
const numberIsNaN = Number.isNaN
const numberIsInteger = Number.isInteger
const isFraction = (value) => fractionRegex.test(value)
const isNumber = (value) => Boolean(value) && !numberIsNaN(toNumber(value))
const isInteger = (value) => Boolean(value) && numberIsInteger(toNumber(value))
const isPercent = (value) => value.endsWith("%") && isNumber(value.slice(0, -1))
const isTshirtSize = (value) => tshirtUnitRegex.test(value)
const isAny = () => true
const isLengthOnly = (value) => lengthUnitRegex.test(value) && !colorFunctionRegex.test(value)
const isNever = () => false
const isShadow = (value) => shadowRegex.test(value)
const isImage = (value) => imageRegex.test(value)
const isAnyNonArbitrary = (value) => !isArbitraryValue(value) && !isArbitraryVariable(value)
const isNamedContainerQuery = (value) =>
  value.startsWith("@container") &&
  ((value[10] === "/" && value[11] !== void 0) ||
    (value[11] === "s" && value[16] !== void 0 && value.startsWith("-size/", 10)) ||
    (value[11] === "n" && value[18] !== void 0 && value.startsWith("-normal/", 10)))
const isArbitrarySize = (value) => getIsArbitraryValue(value, isLabelSize, isNever)
const isArbitraryValue = (value) => arbitraryValueRegex.test(value)
const isArbitraryLength = (value) => getIsArbitraryValue(value, isLabelLength, isLengthOnly)
const isArbitraryNumber = (value) => getIsArbitraryValue(value, isLabelNumber, isNumber)
const isArbitraryWeight = (value) => getIsArbitraryValue(value, isLabelWeight, isAny)
const isArbitraryFamilyName = (value) => getIsArbitraryValue(value, isLabelFamilyName, isNever)
const isArbitraryPosition = (value) => getIsArbitraryValue(value, isLabelPosition, isNever)
const isArbitraryImage = (value) => getIsArbitraryValue(value, isLabelImage, isImage)
const isArbitraryShadow = (value) => getIsArbitraryValue(value, isLabelShadow, isShadow)
const isArbitraryVariable = (value) => arbitraryVariableRegex.test(value)
const isArbitraryVariableLength = (value) => getIsArbitraryVariable(value, isLabelLength)
const isArbitraryVariableFamilyName = (value) => getIsArbitraryVariable(value, isLabelFamilyName)
const isArbitraryVariablePosition = (value) => getIsArbitraryVariable(value, isLabelPosition)
const isArbitraryVariableSize = (value) => getIsArbitraryVariable(value, isLabelSize)
const isArbitraryVariableImage = (value) => getIsArbitraryVariable(value, isLabelImage)
const isArbitraryVariableShadow = (value) => getIsArbitraryVariable(value, isLabelShadow, true)
const isArbitraryVariableWeight = (value) => getIsArbitraryVariable(value, isLabelWeight, true)
const getIsArbitraryValue = (value, testLabel, testValue) => {
  const result = arbitraryValueRegex.exec(value)
  if (result) {
    if (result[1]) return testLabel(result[1])
    return testValue(result[2])
  }
  return false
}
const getIsArbitraryVariable = (value, testLabel, shouldMatchNoLabel = false) => {
  const result = arbitraryVariableRegex.exec(value)
  if (result) {
    if (result[1]) return testLabel(result[1])
    return shouldMatchNoLabel
  }
  return false
}
const isLabelPosition = (label) => label === "position" || label === "percentage"
const isLabelImage = (label) => label === "image" || label === "url"
const isLabelSize = (label) => label === "length" || label === "size" || label === "bg-size"
const isLabelLength = (label) => label === "length"
const isLabelNumber = (label) => label === "number"
const isLabelFamilyName = (label) => label === "family-name"
const isLabelWeight = (label) => label === "number" || label === "weight"
const isLabelShadow = (label) => label === "shadow"
const getDefaultConfig = () => {
  const themeColor = fromTheme("color")
  const themeFont = fromTheme("font")
  const themeText = fromTheme("text")
  const themeFontWeight = fromTheme("font-weight")
  const themeTracking = fromTheme("tracking")
  const themeLeading = fromTheme("leading")
  const themeBreakpoint = fromTheme("breakpoint")
  const themeContainer = fromTheme("container")
  const themeSpacing = fromTheme("spacing")
  const themeRadius = fromTheme("radius")
  const themeShadow = fromTheme("shadow")
  const themeInsetShadow = fromTheme("inset-shadow")
  const themeTextShadow = fromTheme("text-shadow")
  const themeDropShadow = fromTheme("drop-shadow")
  const themeBlur = fromTheme("blur")
  const themePerspective = fromTheme("perspective")
  const themeAspect = fromTheme("aspect")
  const themeEase = fromTheme("ease")
  const themeAnimate = fromTheme("animate")
  const scaleBreak = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"]
  const scalePosition = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    "left-top",
    "top-right",
    "right-top",
    "bottom-right",
    "right-bottom",
    "bottom-left",
    "left-bottom",
  ]
  const scalePositionWithArbitrary = () => [
    ...scalePosition(),
    isArbitraryVariable,
    isArbitraryValue,
  ]
  const scaleOverflow = () => ["auto", "hidden", "clip", "visible", "scroll"]
  const scaleOverscroll = () => ["auto", "contain", "none"]
  const scaleUnambiguousSpacing = () => [isArbitraryVariable, isArbitraryValue, themeSpacing]
  const scaleInset = () => [isFraction, "full", "auto", ...scaleUnambiguousSpacing()]
  const scaleGridTemplateColsRows = () => [
    isInteger,
    "none",
    "subgrid",
    isArbitraryVariable,
    isArbitraryValue,
  ]
  const scaleGridColRowStartAndEnd = () => [
    "auto",
    { span: ["full", isInteger, isArbitraryVariable, isArbitraryValue] },
    isInteger,
    isArbitraryVariable,
    isArbitraryValue,
  ]
  const scaleGridColRowStartOrEnd = () => [isInteger, "auto", isArbitraryVariable, isArbitraryValue]
  const scaleGridAutoColsRows = () => [
    "auto",
    "min",
    "max",
    "fr",
    isArbitraryVariable,
    isArbitraryValue,
  ]
  const scaleAlignPrimaryAxis = () => [
    "start",
    "end",
    "center",
    "between",
    "around",
    "evenly",
    "stretch",
    "baseline",
    "center-safe",
    "end-safe",
  ]
  const scaleAlignSecondaryAxis = () => [
    "start",
    "end",
    "center",
    "stretch",
    "center-safe",
    "end-safe",
  ]
  const scaleMargin = () => ["auto", ...scaleUnambiguousSpacing()]
  const scaleSizing = () => [
    isFraction,
    "auto",
    "full",
    "dvw",
    "dvh",
    "lvw",
    "lvh",
    "svw",
    "svh",
    "min",
    "max",
    "fit",
    ...scaleUnambiguousSpacing(),
  ]
  const scaleSizingInline = () => [
    isFraction,
    "screen",
    "full",
    "dvw",
    "lvw",
    "svw",
    "min",
    "max",
    "fit",
    ...scaleUnambiguousSpacing(),
  ]
  const scaleSizingBlock = () => [
    isFraction,
    "screen",
    "full",
    "lh",
    "dvh",
    "lvh",
    "svh",
    "min",
    "max",
    "fit",
    ...scaleUnambiguousSpacing(),
  ]
  const scaleColor = () => [themeColor, isArbitraryVariable, isArbitraryValue]
  const scaleBgPosition = () => [
    ...scalePosition(),
    isArbitraryVariablePosition,
    isArbitraryPosition,
    { position: [isArbitraryVariable, isArbitraryValue] },
  ]
  const scaleBgRepeat = () => ["no-repeat", { repeat: ["", "x", "y", "space", "round"] }]
  const scaleBgSize = () => [
    "auto",
    "cover",
    "contain",
    isArbitraryVariableSize,
    isArbitrarySize,
    { size: [isArbitraryVariable, isArbitraryValue] },
  ]
  const scaleGradientStopPosition = () => [isPercent, isArbitraryVariableLength, isArbitraryLength]
  const scaleRadius = () => ["", "none", "full", themeRadius, isArbitraryVariable, isArbitraryValue]
  const scaleBorderWidth = () => ["", isNumber, isArbitraryVariableLength, isArbitraryLength]
  const scaleLineStyle = () => ["solid", "dashed", "dotted", "double"]
  const scaleBlendMode = () => [
    "normal",
    "multiply",
    "screen",
    "overlay",
    "darken",
    "lighten",
    "color-dodge",
    "color-burn",
    "hard-light",
    "soft-light",
    "difference",
    "exclusion",
    "hue",
    "saturation",
    "color",
    "luminosity",
  ]
  const scaleMaskImagePosition = () => [
    isNumber,
    isPercent,
    isArbitraryVariablePosition,
    isArbitraryPosition,
  ]
  const scaleBlur = () => ["", "none", themeBlur, isArbitraryVariable, isArbitraryValue]
  const scaleRotate = () => ["none", isNumber, isArbitraryVariable, isArbitraryValue]
  const scaleScale = () => ["none", isNumber, isArbitraryVariable, isArbitraryValue]
  const scaleSkew = () => [isNumber, isArbitraryVariable, isArbitraryValue]
  const scaleTranslate = () => [isFraction, "full", ...scaleUnambiguousSpacing()]
  return {
    theme: {
      "animate": ["spin", "ping", "pulse", "bounce"],
      "aspect": ["video"],
      "blur": [isTshirtSize],
      "breakpoint": [isTshirtSize],
      "color": [isAny],
      "container": [isTshirtSize],
      "drop-shadow": [isTshirtSize],
      "ease": ["in", "out", "in-out"],
      "font": [isAnyNonArbitrary],
      "font-weight": [
        "thin",
        "extralight",
        "light",
        "normal",
        "medium",
        "semibold",
        "bold",
        "extrabold",
        "black",
      ],
      "inset-shadow": [isTshirtSize],
      "leading": ["none", "tight", "snug", "normal", "relaxed", "loose"],
      "perspective": ["dramatic", "near", "normal", "midrange", "distant", "none"],
      "radius": [isTshirtSize],
      "shadow": [isTshirtSize],
      "spacing": ["px", isNumber],
      "text": [isTshirtSize],
      "text-shadow": [isTshirtSize],
      "tracking": ["tighter", "tight", "normal", "wide", "wider", "widest"],
    },
    classGroups: {
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      "aspect": [
        {
          aspect: [
            "auto",
            "square",
            isFraction,
            isArbitraryValue,
            isArbitraryVariable,
            themeAspect,
          ],
        },
      ],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      "container": ["container"],
      /**
       * Container Type
       * @see https://tailwindcss.com/docs/responsive-design#container-queries
       */
      "container-type": [
        { "@container": ["", "normal", "size", isArbitraryVariable, isArbitraryValue] },
      ],
      /**
       * Container Name
       * @see https://tailwindcss.com/docs/responsive-design#named-containers
       */
      "container-named": [isNamedContainerQuery],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      "columns": [{ columns: [isNumber, isArbitraryValue, isArbitraryVariable, themeContainer] }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{ "break-after": scaleBreak() }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{ "break-before": scaleBreak() }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{ "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"] }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{ "box-decoration": ["slice", "clone"] }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      "box": [{ box: ["border", "content"] }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      "display": [
        "block",
        "inline-block",
        "inline",
        "flex",
        "inline-flex",
        "table",
        "inline-table",
        "table-caption",
        "table-cell",
        "table-column",
        "table-column-group",
        "table-footer-group",
        "table-header-group",
        "table-row-group",
        "table-row",
        "flow-root",
        "grid",
        "inline-grid",
        "contents",
        "list-item",
        "hidden",
      ],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      "sr": ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      "float": [{ float: ["right", "left", "none", "start", "end"] }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      "clear": [{ clear: ["left", "right", "both", "none", "start", "end"] }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      "isolation": ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{ object: ["contain", "cover", "fill", "none", "scale-down"] }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{ object: scalePositionWithArbitrary() }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow": [{ overflow: scaleOverflow() }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{ "overflow-x": scaleOverflow() }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{ "overflow-y": scaleOverflow() }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll": [{ overscroll: scaleOverscroll() }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{ "overscroll-x": scaleOverscroll() }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{ "overscroll-y": scaleOverscroll() }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      "position": ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Inset
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset": [{ inset: scaleInset() }],
      /**
       * Inset Inline
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{ "inset-x": scaleInset() }],
      /**
       * Inset Block
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{ "inset-y": scaleInset() }],
      /**
       * Inset Inline Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-s` in next major release
       */
      "start": [
        {
          "inset-s": scaleInset(),
          /**
           * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
           * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
           */
          "start": scaleInset(),
        },
      ],
      /**
       * Inset Inline End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-e` in next major release
       */
      "end": [
        {
          "inset-e": scaleInset(),
          /**
           * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
           * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
           */
          "end": scaleInset(),
        },
      ],
      /**
       * Inset Block Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-bs": [{ "inset-bs": scaleInset() }],
      /**
       * Inset Block End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-be": [{ "inset-be": scaleInset() }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "top": [{ top: scaleInset() }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "right": [{ right: scaleInset() }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "bottom": [{ bottom: scaleInset() }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "left": [{ left: scaleInset() }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      "visibility": ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      "z": [{ z: [isInteger, "auto", isArbitraryVariable, isArbitraryValue] }],
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      "basis": [
        { basis: [isFraction, "full", "auto", themeContainer, ...scaleUnambiguousSpacing()] },
      ],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{ flex: ["row", "row-reverse", "col", "col-reverse"] }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{ flex: ["nowrap", "wrap", "wrap-reverse"] }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      "flex": [{ flex: [isNumber, isFraction, "auto", "initial", "none", isArbitraryValue] }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      "grow": [{ grow: ["", isNumber, isArbitraryVariable, isArbitraryValue] }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      "shrink": [{ shrink: ["", isNumber, isArbitraryVariable, isArbitraryValue] }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      "order": [
        { order: [isInteger, "first", "last", "none", isArbitraryVariable, isArbitraryValue] },
      ],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{ "grid-cols": scaleGridTemplateColsRows() }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{ col: scaleGridColRowStartAndEnd() }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{ "col-start": scaleGridColRowStartOrEnd() }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{ "col-end": scaleGridColRowStartOrEnd() }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{ "grid-rows": scaleGridTemplateColsRows() }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{ row: scaleGridColRowStartAndEnd() }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{ "row-start": scaleGridColRowStartOrEnd() }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{ "row-end": scaleGridColRowStartOrEnd() }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{ "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"] }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{ "auto-cols": scaleGridAutoColsRows() }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{ "auto-rows": scaleGridAutoColsRows() }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      "gap": [{ gap: scaleUnambiguousSpacing() }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{ "gap-x": scaleUnambiguousSpacing() }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{ "gap-y": scaleUnambiguousSpacing() }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{ justify: [...scaleAlignPrimaryAxis(), "normal"] }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{ "justify-items": [...scaleAlignSecondaryAxis(), "normal"] }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{ "justify-self": ["auto", ...scaleAlignSecondaryAxis()] }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{ content: ["normal", ...scaleAlignPrimaryAxis()] }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{ items: [...scaleAlignSecondaryAxis(), { baseline: ["", "last"] }] }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{ self: ["auto", ...scaleAlignSecondaryAxis(), { baseline: ["", "last"] }] }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{ "place-content": scaleAlignPrimaryAxis() }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{ "place-items": [...scaleAlignSecondaryAxis(), "baseline"] }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{ "place-self": ["auto", ...scaleAlignSecondaryAxis()] }],
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      "p": [{ p: scaleUnambiguousSpacing() }],
      /**
       * Padding Inline
       * @see https://tailwindcss.com/docs/padding
       */
      "px": [{ px: scaleUnambiguousSpacing() }],
      /**
       * Padding Block
       * @see https://tailwindcss.com/docs/padding
       */
      "py": [{ py: scaleUnambiguousSpacing() }],
      /**
       * Padding Inline Start
       * @see https://tailwindcss.com/docs/padding
       */
      "ps": [{ ps: scaleUnambiguousSpacing() }],
      /**
       * Padding Inline End
       * @see https://tailwindcss.com/docs/padding
       */
      "pe": [{ pe: scaleUnambiguousSpacing() }],
      /**
       * Padding Block Start
       * @see https://tailwindcss.com/docs/padding
       */
      "pbs": [{ pbs: scaleUnambiguousSpacing() }],
      /**
       * Padding Block End
       * @see https://tailwindcss.com/docs/padding
       */
      "pbe": [{ pbe: scaleUnambiguousSpacing() }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      "pt": [{ pt: scaleUnambiguousSpacing() }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      "pr": [{ pr: scaleUnambiguousSpacing() }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      "pb": [{ pb: scaleUnambiguousSpacing() }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      "pl": [{ pl: scaleUnambiguousSpacing() }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      "m": [{ m: scaleMargin() }],
      /**
       * Margin Inline
       * @see https://tailwindcss.com/docs/margin
       */
      "mx": [{ mx: scaleMargin() }],
      /**
       * Margin Block
       * @see https://tailwindcss.com/docs/margin
       */
      "my": [{ my: scaleMargin() }],
      /**
       * Margin Inline Start
       * @see https://tailwindcss.com/docs/margin
       */
      "ms": [{ ms: scaleMargin() }],
      /**
       * Margin Inline End
       * @see https://tailwindcss.com/docs/margin
       */
      "me": [{ me: scaleMargin() }],
      /**
       * Margin Block Start
       * @see https://tailwindcss.com/docs/margin
       */
      "mbs": [{ mbs: scaleMargin() }],
      /**
       * Margin Block End
       * @see https://tailwindcss.com/docs/margin
       */
      "mbe": [{ mbe: scaleMargin() }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      "mt": [{ mt: scaleMargin() }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      "mr": [{ mr: scaleMargin() }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      "mb": [{ mb: scaleMargin() }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      "ml": [{ ml: scaleMargin() }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{ "space-x": scaleUnambiguousSpacing() }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{ "space-y": scaleUnambiguousSpacing() }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      "size": [{ size: scaleSizing() }],
      /**
       * Inline Size
       * @see https://tailwindcss.com/docs/width
       */
      "inline-size": [{ inline: ["auto", ...scaleSizingInline()] }],
      /**
       * Min-Inline Size
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-inline-size": [{ "min-inline": ["auto", ...scaleSizingInline()] }],
      /**
       * Max-Inline Size
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-inline-size": [{ "max-inline": ["none", ...scaleSizingInline()] }],
      /**
       * Block Size
       * @see https://tailwindcss.com/docs/height
       */
      "block-size": [{ block: ["auto", ...scaleSizingBlock()] }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-block-size": [{ "min-block": ["auto", ...scaleSizingBlock()] }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-block-size": [{ "max-block": ["none", ...scaleSizingBlock()] }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      "w": [{ w: [themeContainer, "screen", ...scaleSizing()] }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{ "min-w": [themeContainer, "screen", "none", ...scaleSizing()] }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [
        {
          "max-w": [
            themeContainer,
            "screen",
            "none",
            "prose",
            /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
            { screen: [themeBreakpoint] },
            ...scaleSizing(),
          ],
        },
      ],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      "h": [{ h: ["screen", "lh", ...scaleSizing()] }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{ "min-h": ["screen", "lh", "none", ...scaleSizing()] }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{ "max-h": ["screen", "lh", ...scaleSizing()] }],
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{ text: ["base", themeText, isArbitraryVariableLength, isArbitraryLength] }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{ font: [themeFontWeight, isArbitraryVariableWeight, isArbitraryWeight] }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [
        {
          "font-stretch": [
            "ultra-condensed",
            "extra-condensed",
            "condensed",
            "semi-condensed",
            "normal",
            "semi-expanded",
            "expanded",
            "extra-expanded",
            "ultra-expanded",
            isPercent,
            isArbitraryValue,
          ],
        },
      ],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{ font: [isArbitraryVariableFamilyName, isArbitraryFamilyName, themeFont] }],
      /**
       * Font Feature Settings
       * @see https://tailwindcss.com/docs/font-feature-settings
       */
      "font-features": [{ "font-features": [isArbitraryValue] }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      "tracking": [{ tracking: [themeTracking, isArbitraryVariable, isArbitraryValue] }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{ "line-clamp": [isNumber, "none", isArbitraryVariable, isArbitraryNumber] }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      "leading": [{ leading: [themeLeading, ...scaleUnambiguousSpacing()] }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{ "list-image": ["none", isArbitraryVariable, isArbitraryValue] }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{ list: ["inside", "outside"] }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [
        { list: ["disc", "decimal", "none", isArbitraryVariable, isArbitraryValue] },
      ],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{ text: ["left", "center", "right", "justify", "start", "end"] }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{ placeholder: scaleColor() }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{ text: scaleColor() }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{ decoration: [...scaleLineStyle(), "wavy"] }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [
        { decoration: [isNumber, "from-font", "auto", isArbitraryVariable, isArbitraryLength] },
      ],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{ decoration: scaleColor() }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [
        { "underline-offset": [isNumber, "auto", isArbitraryVariable, isArbitraryValue] },
      ],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      "indent": [{ indent: scaleUnambiguousSpacing() }],
      /**
       * Tab Size
       * @see https://tailwindcss.com/docs/tab-size
       */
      "tab-size": [{ tab: [isInteger, isArbitraryVariable, isArbitraryValue] }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [
        {
          align: [
            "baseline",
            "top",
            "middle",
            "bottom",
            "text-top",
            "text-bottom",
            "sub",
            "super",
            isArbitraryVariable,
            isArbitraryValue,
          ],
        },
      ],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      "whitespace": [
        { whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"] },
      ],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      "break": [{ break: ["normal", "words", "all", "keep"] }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      "wrap": [{ wrap: ["break-word", "anywhere", "normal"] }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      "hyphens": [{ hyphens: ["none", "manual", "auto"] }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      "content": [{ content: ["none", isArbitraryVariable, isArbitraryValue] }],
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{ bg: ["fixed", "local", "scroll"] }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{ "bg-clip": ["border", "padding", "content", "text"] }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{ "bg-origin": ["border", "padding", "content"] }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{ bg: scaleBgPosition() }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{ bg: scaleBgRepeat() }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{ bg: scaleBgSize() }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [
        {
          bg: [
            "none",
            {
              linear: [
                { to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"] },
                isInteger,
                isArbitraryVariable,
                isArbitraryValue,
              ],
              radial: ["", isArbitraryVariable, isArbitraryValue],
              conic: [isInteger, isArbitraryVariable, isArbitraryValue],
            },
            isArbitraryVariableImage,
            isArbitraryImage,
          ],
        },
      ],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{ bg: scaleColor() }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{ from: scaleGradientStopPosition() }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{ via: scaleGradientStopPosition() }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{ to: scaleGradientStopPosition() }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{ from: scaleColor() }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{ via: scaleColor() }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{ to: scaleColor() }],
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded": [{ rounded: scaleRadius() }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{ "rounded-s": scaleRadius() }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{ "rounded-e": scaleRadius() }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{ "rounded-t": scaleRadius() }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{ "rounded-r": scaleRadius() }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{ "rounded-b": scaleRadius() }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{ "rounded-l": scaleRadius() }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{ "rounded-ss": scaleRadius() }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{ "rounded-se": scaleRadius() }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{ "rounded-ee": scaleRadius() }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{ "rounded-es": scaleRadius() }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{ "rounded-tl": scaleRadius() }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{ "rounded-tr": scaleRadius() }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{ "rounded-br": scaleRadius() }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{ "rounded-bl": scaleRadius() }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{ border: scaleBorderWidth() }],
      /**
       * Border Width Inline
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{ "border-x": scaleBorderWidth() }],
      /**
       * Border Width Block
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{ "border-y": scaleBorderWidth() }],
      /**
       * Border Width Inline Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{ "border-s": scaleBorderWidth() }],
      /**
       * Border Width Inline End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{ "border-e": scaleBorderWidth() }],
      /**
       * Border Width Block Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-bs": [{ "border-bs": scaleBorderWidth() }],
      /**
       * Border Width Block End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-be": [{ "border-be": scaleBorderWidth() }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{ "border-t": scaleBorderWidth() }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{ "border-r": scaleBorderWidth() }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{ "border-b": scaleBorderWidth() }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{ "border-l": scaleBorderWidth() }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{ "divide-x": scaleBorderWidth() }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{ "divide-y": scaleBorderWidth() }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{ border: [...scaleLineStyle(), "hidden", "none"] }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{ divide: [...scaleLineStyle(), "hidden", "none"] }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{ border: scaleColor() }],
      /**
       * Border Color Inline
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{ "border-x": scaleColor() }],
      /**
       * Border Color Block
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{ "border-y": scaleColor() }],
      /**
       * Border Color Inline Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{ "border-s": scaleColor() }],
      /**
       * Border Color Inline End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{ "border-e": scaleColor() }],
      /**
       * Border Color Block Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-bs": [{ "border-bs": scaleColor() }],
      /**
       * Border Color Block End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-be": [{ "border-be": scaleColor() }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{ "border-t": scaleColor() }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{ "border-r": scaleColor() }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{ "border-b": scaleColor() }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{ "border-l": scaleColor() }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{ divide: scaleColor() }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{ outline: [...scaleLineStyle(), "none", "hidden"] }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{ "outline-offset": [isNumber, isArbitraryVariable, isArbitraryValue] }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{ outline: ["", isNumber, isArbitraryVariableLength, isArbitraryLength] }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{ outline: scaleColor() }],
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      "shadow": [
        { shadow: ["", "none", themeShadow, isArbitraryVariableShadow, isArbitraryShadow] },
      ],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{ shadow: scaleColor() }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [
        {
          "inset-shadow": ["none", themeInsetShadow, isArbitraryVariableShadow, isArbitraryShadow],
        },
      ],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{ "inset-shadow": scaleColor() }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{ ring: scaleBorderWidth() }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{ ring: scaleColor() }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{ "ring-offset": [isNumber, isArbitraryLength] }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{ "ring-offset": scaleColor() }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{ "inset-ring": scaleBorderWidth() }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{ "inset-ring": scaleColor() }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [
        { "text-shadow": ["none", themeTextShadow, isArbitraryVariableShadow, isArbitraryShadow] },
      ],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{ "text-shadow": scaleColor() }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      "opacity": [{ opacity: [isNumber, isArbitraryVariable, isArbitraryValue] }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{ "mix-blend": [...scaleBlendMode(), "plus-darker", "plus-lighter"] }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{ "bg-blend": scaleBlendMode() }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      "mask-clip": [
        { "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"] },
        "mask-no-clip",
      ],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      "mask-composite": [{ mask: ["add", "subtract", "intersect", "exclude"] }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image-linear-pos": [{ "mask-linear": [isNumber] }],
      "mask-image-linear-from-pos": [{ "mask-linear-from": scaleMaskImagePosition() }],
      "mask-image-linear-to-pos": [{ "mask-linear-to": scaleMaskImagePosition() }],
      "mask-image-linear-from-color": [{ "mask-linear-from": scaleColor() }],
      "mask-image-linear-to-color": [{ "mask-linear-to": scaleColor() }],
      "mask-image-t-from-pos": [{ "mask-t-from": scaleMaskImagePosition() }],
      "mask-image-t-to-pos": [{ "mask-t-to": scaleMaskImagePosition() }],
      "mask-image-t-from-color": [{ "mask-t-from": scaleColor() }],
      "mask-image-t-to-color": [{ "mask-t-to": scaleColor() }],
      "mask-image-r-from-pos": [{ "mask-r-from": scaleMaskImagePosition() }],
      "mask-image-r-to-pos": [{ "mask-r-to": scaleMaskImagePosition() }],
      "mask-image-r-from-color": [{ "mask-r-from": scaleColor() }],
      "mask-image-r-to-color": [{ "mask-r-to": scaleColor() }],
      "mask-image-b-from-pos": [{ "mask-b-from": scaleMaskImagePosition() }],
      "mask-image-b-to-pos": [{ "mask-b-to": scaleMaskImagePosition() }],
      "mask-image-b-from-color": [{ "mask-b-from": scaleColor() }],
      "mask-image-b-to-color": [{ "mask-b-to": scaleColor() }],
      "mask-image-l-from-pos": [{ "mask-l-from": scaleMaskImagePosition() }],
      "mask-image-l-to-pos": [{ "mask-l-to": scaleMaskImagePosition() }],
      "mask-image-l-from-color": [{ "mask-l-from": scaleColor() }],
      "mask-image-l-to-color": [{ "mask-l-to": scaleColor() }],
      "mask-image-x-from-pos": [{ "mask-x-from": scaleMaskImagePosition() }],
      "mask-image-x-to-pos": [{ "mask-x-to": scaleMaskImagePosition() }],
      "mask-image-x-from-color": [{ "mask-x-from": scaleColor() }],
      "mask-image-x-to-color": [{ "mask-x-to": scaleColor() }],
      "mask-image-y-from-pos": [{ "mask-y-from": scaleMaskImagePosition() }],
      "mask-image-y-to-pos": [{ "mask-y-to": scaleMaskImagePosition() }],
      "mask-image-y-from-color": [{ "mask-y-from": scaleColor() }],
      "mask-image-y-to-color": [{ "mask-y-to": scaleColor() }],
      "mask-image-radial": [{ "mask-radial": [isArbitraryVariable, isArbitraryValue] }],
      "mask-image-radial-from-pos": [{ "mask-radial-from": scaleMaskImagePosition() }],
      "mask-image-radial-to-pos": [{ "mask-radial-to": scaleMaskImagePosition() }],
      "mask-image-radial-from-color": [{ "mask-radial-from": scaleColor() }],
      "mask-image-radial-to-color": [{ "mask-radial-to": scaleColor() }],
      "mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
      "mask-image-radial-size": [
        {
          "mask-radial": [
            {
              closest: ["side", "corner"],
              farthest: ["side", "corner"],
            },
          ],
        },
      ],
      "mask-image-radial-pos": [{ "mask-radial-at": scalePosition() }],
      "mask-image-conic-pos": [{ "mask-conic": [isNumber] }],
      "mask-image-conic-from-pos": [{ "mask-conic-from": scaleMaskImagePosition() }],
      "mask-image-conic-to-pos": [{ "mask-conic-to": scaleMaskImagePosition() }],
      "mask-image-conic-from-color": [{ "mask-conic-from": scaleColor() }],
      "mask-image-conic-to-color": [{ "mask-conic-to": scaleColor() }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      "mask-mode": [{ mask: ["alpha", "luminance", "match"] }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      "mask-origin": [
        { "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"] },
      ],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      "mask-position": [{ mask: scaleBgPosition() }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{ mask: scaleBgRepeat() }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{ mask: scaleBgSize() }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      "mask-type": [{ "mask-type": ["alpha", "luminance"] }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image": [{ mask: ["none", isArbitraryVariable, isArbitraryValue] }],
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      "filter": [{ filter: ["", "none", isArbitraryVariable, isArbitraryValue] }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      "blur": [{ blur: scaleBlur() }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      "brightness": [{ brightness: [isNumber, isArbitraryVariable, isArbitraryValue] }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      "contrast": [{ contrast: [isNumber, isArbitraryVariable, isArbitraryValue] }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [
        {
          "drop-shadow": [
            "",
            "none",
            themeDropShadow,
            isArbitraryVariableShadow,
            isArbitraryShadow,
          ],
        },
      ],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{ "drop-shadow": scaleColor() }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      "grayscale": [{ grayscale: ["", isNumber, isArbitraryVariable, isArbitraryValue] }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{ "hue-rotate": [isNumber, isArbitraryVariable, isArbitraryValue] }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      "invert": [{ invert: ["", isNumber, isArbitraryVariable, isArbitraryValue] }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      "saturate": [{ saturate: [isNumber, isArbitraryVariable, isArbitraryValue] }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      "sepia": [{ sepia: ["", isNumber, isArbitraryVariable, isArbitraryValue] }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [
        { "backdrop-filter": ["", "none", isArbitraryVariable, isArbitraryValue] },
      ],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{ "backdrop-blur": scaleBlur() }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [
        { "backdrop-brightness": [isNumber, isArbitraryVariable, isArbitraryValue] },
      ],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [
        { "backdrop-contrast": [isNumber, isArbitraryVariable, isArbitraryValue] },
      ],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [
        { "backdrop-grayscale": ["", isNumber, isArbitraryVariable, isArbitraryValue] },
      ],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [
        { "backdrop-hue-rotate": [isNumber, isArbitraryVariable, isArbitraryValue] },
      ],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [
        { "backdrop-invert": ["", isNumber, isArbitraryVariable, isArbitraryValue] },
      ],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [
        { "backdrop-opacity": [isNumber, isArbitraryVariable, isArbitraryValue] },
      ],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [
        { "backdrop-saturate": [isNumber, isArbitraryVariable, isArbitraryValue] },
      ],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [
        { "backdrop-sepia": ["", isNumber, isArbitraryVariable, isArbitraryValue] },
      ],
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{ border: ["collapse", "separate"] }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{ "border-spacing": scaleUnambiguousSpacing() }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{ "border-spacing-x": scaleUnambiguousSpacing() }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{ "border-spacing-y": scaleUnambiguousSpacing() }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{ table: ["auto", "fixed"] }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      "caption": [{ caption: ["top", "bottom"] }],
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      "transition": [
        {
          transition: [
            "",
            "all",
            "colors",
            "opacity",
            "shadow",
            "transform",
            "none",
            isArbitraryVariable,
            isArbitraryValue,
          ],
        },
      ],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{ transition: ["normal", "discrete"] }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      "duration": [{ duration: [isNumber, "initial", isArbitraryVariable, isArbitraryValue] }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      "ease": [{ ease: ["linear", "initial", themeEase, isArbitraryVariable, isArbitraryValue] }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      "delay": [{ delay: [isNumber, isArbitraryVariable, isArbitraryValue] }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      "animate": [{ animate: ["none", themeAnimate, isArbitraryVariable, isArbitraryValue] }],
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      "backface": [{ backface: ["hidden", "visible"] }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      "perspective": [{ perspective: [themePerspective, isArbitraryVariable, isArbitraryValue] }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{ "perspective-origin": scalePositionWithArbitrary() }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate": [{ rotate: scaleRotate() }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{ "rotate-x": scaleRotate() }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{ "rotate-y": scaleRotate() }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{ "rotate-z": scaleRotate() }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      "scale": [{ scale: scaleScale() }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{ "scale-x": scaleScale() }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{ "scale-y": scaleScale() }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{ "scale-z": scaleScale() }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      "skew": [{ skew: scaleSkew() }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{ "skew-x": scaleSkew() }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{ "skew-y": scaleSkew() }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      "transform": [
        { transform: [isArbitraryVariable, isArbitraryValue, "", "none", "gpu", "cpu"] },
      ],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{ origin: scalePositionWithArbitrary() }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{ transform: ["3d", "flat"] }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      "translate": [{ translate: scaleTranslate() }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{ "translate-x": scaleTranslate() }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{ "translate-y": scaleTranslate() }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{ "translate-z": scaleTranslate() }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      /**
       * Zoom
       * @see https://tailwindcss.com/docs/zoom
       */
      "zoom": [{ zoom: [isInteger, isArbitraryVariable, isArbitraryValue] }],
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      "accent": [{ accent: scaleColor() }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      "appearance": [{ appearance: ["none", "auto"] }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{ caret: scaleColor() }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [
        { scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"] },
      ],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      "cursor": [
        {
          cursor: [
            "auto",
            "default",
            "pointer",
            "wait",
            "text",
            "move",
            "help",
            "not-allowed",
            "none",
            "context-menu",
            "progress",
            "cell",
            "crosshair",
            "vertical-text",
            "alias",
            "copy",
            "no-drop",
            "grab",
            "grabbing",
            "all-scroll",
            "col-resize",
            "row-resize",
            "n-resize",
            "e-resize",
            "s-resize",
            "w-resize",
            "ne-resize",
            "nw-resize",
            "se-resize",
            "sw-resize",
            "ew-resize",
            "ns-resize",
            "nesw-resize",
            "nwse-resize",
            "zoom-in",
            "zoom-out",
            isArbitraryVariable,
            isArbitraryValue,
          ],
        },
      ],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{ "field-sizing": ["fixed", "content"] }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{ "pointer-events": ["auto", "none"] }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      "resize": [{ resize: ["none", "", "y", "x"] }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{ scroll: ["auto", "smooth"] }],
      /**
       * Scrollbar Thumb Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-thumb-color": [{ "scrollbar-thumb": scaleColor() }],
      /**
       * Scrollbar Track Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-track-color": [{ "scrollbar-track": scaleColor() }],
      /**
       * Scrollbar Gutter
       * @see https://tailwindcss.com/docs/scrollbar-gutter
       */
      "scrollbar-gutter": [{ "scrollbar-gutter": ["auto", "stable", "both"] }],
      /**
       * Scrollbar Width
       * @see https://tailwindcss.com/docs/scrollbar-width
       */
      "scrollbar-w": [{ scrollbar: ["auto", "thin", "none"] }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{ "scroll-m": scaleUnambiguousSpacing() }],
      /**
       * Scroll Margin Inline
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{ "scroll-mx": scaleUnambiguousSpacing() }],
      /**
       * Scroll Margin Block
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{ "scroll-my": scaleUnambiguousSpacing() }],
      /**
       * Scroll Margin Inline Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{ "scroll-ms": scaleUnambiguousSpacing() }],
      /**
       * Scroll Margin Inline End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{ "scroll-me": scaleUnambiguousSpacing() }],
      /**
       * Scroll Margin Block Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbs": [{ "scroll-mbs": scaleUnambiguousSpacing() }],
      /**
       * Scroll Margin Block End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbe": [{ "scroll-mbe": scaleUnambiguousSpacing() }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{ "scroll-mt": scaleUnambiguousSpacing() }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{ "scroll-mr": scaleUnambiguousSpacing() }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{ "scroll-mb": scaleUnambiguousSpacing() }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{ "scroll-ml": scaleUnambiguousSpacing() }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{ "scroll-p": scaleUnambiguousSpacing() }],
      /**
       * Scroll Padding Inline
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{ "scroll-px": scaleUnambiguousSpacing() }],
      /**
       * Scroll Padding Block
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{ "scroll-py": scaleUnambiguousSpacing() }],
      /**
       * Scroll Padding Inline Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{ "scroll-ps": scaleUnambiguousSpacing() }],
      /**
       * Scroll Padding Inline End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{ "scroll-pe": scaleUnambiguousSpacing() }],
      /**
       * Scroll Padding Block Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbs": [{ "scroll-pbs": scaleUnambiguousSpacing() }],
      /**
       * Scroll Padding Block End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbe": [{ "scroll-pbe": scaleUnambiguousSpacing() }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{ "scroll-pt": scaleUnambiguousSpacing() }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{ "scroll-pr": scaleUnambiguousSpacing() }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{ "scroll-pb": scaleUnambiguousSpacing() }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{ "scroll-pl": scaleUnambiguousSpacing() }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{ snap: ["start", "end", "center", "align-none"] }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{ snap: ["normal", "always"] }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{ snap: ["none", "x", "y", "both"] }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{ snap: ["mandatory", "proximity"] }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch": [{ touch: ["auto", "none", "manipulation"] }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{ "touch-pan": ["x", "left", "right"] }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{ "touch-pan": ["y", "up", "down"] }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      "select": [{ select: ["none", "text", "all", "auto"] }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [
        {
          "will-change": [
            "auto",
            "scroll",
            "contents",
            "transform",
            isArbitraryVariable,
            isArbitraryValue,
          ],
        },
      ],
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      "fill": [{ fill: ["none", ...scaleColor()] }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [
        { stroke: [isNumber, isArbitraryVariableLength, isArbitraryLength, isArbitraryNumber] },
      ],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      "stroke": [{ stroke: ["none", ...scaleColor()] }],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }],
    },
    conflictingClassGroups: {
      "container-named": ["container-type"],
      "overflow": ["overflow-x", "overflow-y"],
      "overscroll": ["overscroll-x", "overscroll-y"],
      "inset": [
        "inset-x",
        "inset-y",
        "inset-bs",
        "inset-be",
        "start",
        "end",
        "top",
        "right",
        "bottom",
        "left",
      ],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      "flex": ["basis", "grow", "shrink"],
      "gap": ["gap-x", "gap-y"],
      "p": ["px", "py", "ps", "pe", "pbs", "pbe", "pt", "pr", "pb", "pl"],
      "px": ["pr", "pl"],
      "py": ["pt", "pb"],
      "m": ["mx", "my", "ms", "me", "mbs", "mbe", "mt", "mr", "mb", "ml"],
      "mx": ["mr", "ml"],
      "my": ["mt", "mb"],
      "size": ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": [
        "fvn-ordinal",
        "fvn-slashed-zero",
        "fvn-figure",
        "fvn-spacing",
        "fvn-fraction",
      ],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      "rounded": [
        "rounded-s",
        "rounded-e",
        "rounded-t",
        "rounded-r",
        "rounded-b",
        "rounded-l",
        "rounded-ss",
        "rounded-se",
        "rounded-ee",
        "rounded-es",
        "rounded-tl",
        "rounded-tr",
        "rounded-br",
        "rounded-bl",
      ],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": [
        "border-w-x",
        "border-w-y",
        "border-w-s",
        "border-w-e",
        "border-w-bs",
        "border-w-be",
        "border-w-t",
        "border-w-r",
        "border-w-b",
        "border-w-l",
      ],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": [
        "border-color-x",
        "border-color-y",
        "border-color-s",
        "border-color-e",
        "border-color-bs",
        "border-color-be",
        "border-color-t",
        "border-color-r",
        "border-color-b",
        "border-color-l",
      ],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "translate": ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": [
        "scroll-mx",
        "scroll-my",
        "scroll-ms",
        "scroll-me",
        "scroll-mbs",
        "scroll-mbe",
        "scroll-mt",
        "scroll-mr",
        "scroll-mb",
        "scroll-ml",
      ],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": [
        "scroll-px",
        "scroll-py",
        "scroll-ps",
        "scroll-pe",
        "scroll-pbs",
        "scroll-pbe",
        "scroll-pt",
        "scroll-pr",
        "scroll-pb",
        "scroll-pl",
      ],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      "touch": ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"],
    },
    conflictingClassGroupModifiers: { "font-size": ["leading"] },
    postfixLookupClassGroups: ["container-type"],
    orderSensitiveModifiers: [
      "*",
      "**",
      "after",
      "backdrop",
      "before",
      "details-content",
      "file",
      "first-letter",
      "first-line",
      "marker",
      "placeholder",
      "selection",
    ],
  }
}
const mergeConfigs = (baseConfig, { extend = {}, override = {} }) => {
  overrideConfigProperties(baseConfig.theme, override.theme)
  overrideConfigProperties(baseConfig.classGroups, override.classGroups)
  overrideConfigProperties(baseConfig.conflictingClassGroups, override.conflictingClassGroups)
  overrideConfigProperties(
    baseConfig.conflictingClassGroupModifiers,
    override.conflictingClassGroupModifiers,
  )
  overrideProperty(baseConfig, "postfixLookupClassGroups", override.postfixLookupClassGroups)
  overrideProperty(baseConfig, "orderSensitiveModifiers", override.orderSensitiveModifiers)
  mergeConfigProperties(baseConfig.theme, extend.theme)
  mergeConfigProperties(baseConfig.classGroups, extend.classGroups)
  mergeConfigProperties(baseConfig.conflictingClassGroups, extend.conflictingClassGroups)
  mergeConfigProperties(
    baseConfig.conflictingClassGroupModifiers,
    extend.conflictingClassGroupModifiers,
  )
  mergeArrayProperties(baseConfig, extend, "postfixLookupClassGroups")
  mergeArrayProperties(baseConfig, extend, "orderSensitiveModifiers")
  return baseConfig
}
const overrideProperty = (baseObject, overrideKey, overrideValue) => {
  if (overrideValue !== void 0) baseObject[overrideKey] = overrideValue
}
const overrideConfigProperties = (baseObject, overrideObject) => {
  if (overrideObject)
    for (const key in overrideObject) overrideProperty(baseObject, key, overrideObject[key])
}
const mergeConfigProperties = (baseObject, mergeObject) => {
  if (mergeObject) for (const key in mergeObject) mergeArrayProperties(baseObject, mergeObject, key)
}
const mergeArrayProperties = (baseObject, mergeObject, key) => {
  const mergeValue = mergeObject[key]
  if (mergeValue !== void 0)
    baseObject[key] = baseObject[key] ? baseObject[key].concat(mergeValue) : mergeValue
}
const createMerger = (config) => {
  if (!config) return createTailwindMerge(getDefaultConfig)
  return createTailwindMerge(
    typeof config === "function"
      ? () => config(getDefaultConfig())
      : () => mergeConfigs(getDefaultConfig(), config),
  )
}
const toMergerConfig = (config) => {
  if (isEmptyObject(config)) return void 0
  const source = config
  const extend = { ...(source.extend ?? {}) }
  for (const key of [
    "theme",
    "classGroups",
    "conflictingClassGroups",
    "conflictingClassGroupModifiers",
    "postfixLookupClassGroups",
    "orderSensitiveModifiers",
    "cacheSize",
    "prefix",
    "separator",
    "experimentalParseClassName",
  ])
    if (source[key] !== void 0 && extend[key] === void 0) extend[key] = source[key]
  const result = {}
  if (Object.keys(extend).length > 0) result.extend = extend
  if (source.override != null && !isEmptyObject(source.override)) result.override = source.override
  if (!result.extend && !result.override) return void 0
  return result
}
const createTwMerge = (cachedTwMergeConfig) => {
  const merger = createMerger(toMergerConfig(cachedTwMergeConfig))
  return (classList) => merger.mergeString(classList)
}
let defaultMerger
const getDefaultMerger = () => {
  if (!defaultMerger) defaultMerger = createMerger()
  return defaultMerger
}
const ensureConfiguredMerger = () => {
  if (!state.cachedTwMerge || state.didTwMergeConfigChange) {
    state.didTwMergeConfigChange = false
    state.cachedTwMerge = createTwMerge(state.cachedTwMergeConfig)
  }
  return state.cachedTwMerge
}
const syncTwMergeConfig = (config) => {
  const next = config == null ? void 0 : config.twMergeConfig
  if (!next || isEmptyObject(next)) return
  if (!isEqual(next, state.cachedTwMergeConfig)) {
    state.cachedTwMergeConfig = next
    state.didTwMergeConfigChange = true
  }
}
const joinArgs = (classnames) => joinClassValue(classnames)
const IS_V8 = (() => {
  const error = /* @__PURE__ */ new Error()
  return !("line" in error) && !("lineNumber" in error)
})()
const ARG_CACHE_BUCKET_SIZE = 64
const ARG_CACHE_SIZE = 500
let argCache = /* @__PURE__ */ new Map()
let previousArgCache = /* @__PURE__ */ new Map()
let argCacheCount = 0
const clearArgCache = () => {
  argCache = /* @__PURE__ */ new Map()
  previousArgCache = /* @__PURE__ */ new Map()
  argCacheCount = 0
}
const mergeStringDefault = (joined) => {
  if (!joined) return void 0
  if (joined.indexOf(" ") === -1) return joined
  return getDefaultMerger().mergeString(joined) || void 0
}
const storeArgCache = (firstKey, rest, result) => {
  let target = argCache.get(firstKey)
  if (target === void 0) {
    target = []
    argCache.set(firstKey, target)
  }
  if (target.length >= ARG_CACHE_BUCKET_SIZE) target.shift()
  target.push({
    rest,
    result,
  })
  if (++argCacheCount > ARG_CACHE_SIZE) {
    argCacheCount = 0
    previousArgCache = argCache
    argCache = /* @__PURE__ */ new Map()
  }
}
const lookupArgCache = (firstKey, firstKeyIndex, truthyStringCount, length, getItem) => {
  let bucket = argCache.get(firstKey)
  if (bucket === void 0) bucket = previousArgCache.get(firstKey)
  if (bucket === void 0) return void 0
  for (let entryIndex = 0; entryIndex < bucket.length; entryIndex++) {
    const entry = bucket[entryIndex]
    const rest = entry.rest
    if (rest.length !== truthyStringCount - 1) continue
    let restIndex = 0
    let isMatch = true
    for (let index = firstKeyIndex + 1; index < length; index++) {
      const item = getItem(index)
      if (!item) continue
      if (item !== rest[restIndex++]) {
        isMatch = false
        break
      }
    }
    if (isMatch) return entry.result
  }
}
const mergeVariadicFromGetter = (length, getItem) => {
  let firstKey = ""
  let firstKeyIndex = -1
  let truthyStringCount = 0
  let everyTruthyIsString = true
  for (let index = 0; index < length; index++) {
    const item = getItem(index)
    if (!item) continue
    if (typeof item !== "string") {
      everyTruthyIsString = false
      break
    }
    if (firstKeyIndex === -1) {
      firstKey = item
      firstKeyIndex = index
    }
    truthyStringCount++
  }
  if (!everyTruthyIsString) {
    const inputs = new Array(length)
    for (let index = 0; index < length; index++) inputs[index] = getItem(index)
    return mergeStringDefault(joinArgs(inputs))
  }
  if (truthyStringCount === 0) return void 0
  if (truthyStringCount === 1) return mergeStringDefault(firstKey)
  const cached = lookupArgCache(firstKey, firstKeyIndex, truthyStringCount, length, getItem)
  if (cached !== void 0) return cached || void 0
  let joined = firstKey
  const rest = []
  for (let index = firstKeyIndex + 1; index < length; index++) {
    const item = getItem(index)
    if (!item) continue
    joined += " " + item
    rest.push(item)
  }
  const result = mergeStringDefault(joined) ?? ""
  storeArgCache(firstKey, rest, result)
  return result || void 0
}
const originalStateReset = state.reset.bind(state)
state.reset = () => {
  defaultMerger = void 0
  clearArgCache()
  originalStateReset()
}
const executeMerge = (classnames, config) => {
  const base = joinArgs(classnames)
  if (!base || !((config == null ? void 0 : config.twMerge) ?? true)) return base || void 0
  if (base.indexOf(" ") === -1) return base
  syncTwMergeConfig(config)
  return (
    (Boolean(
      (config == null ? void 0 : config.twMergeConfig) && !isEmptyObject(config.twMergeConfig),
    )
      ? ensureConfiguredMerger()
      : getDefaultMerger().mergeString)(base) || void 0
  )
}
const cnAdapter = (config, ...classnames) => executeMerge(classnames, config)
const cn = function cn2() {
  const length = arguments.length
  if (length === 0) return void 0
  const first = arguments[0]
  if (length === 1) return mergeStringDefault(typeof first === "string" ? first : joinArgs([first]))
  if (IS_V8) return mergeVariadicFromGetter(length, (index) => arguments[index])
  const inputs = new Array(length)
  for (let index = 0; index < length; index++) inputs[index] = arguments[index]
  return mergeStringDefault(joinArgs(inputs))
}
const runtime = getTailwindVariants(cnAdapter)
const tv = runtime.tv
runtime.createTV
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/button/Button.mjs
/**
 * A button component that can be used to trigger actions.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Button](https://base-ui.com/react/components/button)
 */
const Button$1 = /*#__PURE__*/ import_react.forwardRef(
  function Button(componentProps, forwardedRef) {
    const {
      render,
      className,
      disabled = false,
      focusableWhenDisabled = false,
      nativeButton = true,
      style,
      ...elementProps
    } = componentProps
    const { getButtonProps, buttonRef } = useButton({
      disabled,
      focusableWhenDisabled,
      native: nativeButton,
    })
    return useRenderElement("button", componentProps, {
      state: { disabled },
      ref: [forwardedRef, buttonRef],
      props: [elementProps, getButtonProps],
    })
  },
)
//#endregion
//#region src/components/ui/button.tsx
const buttonVariants = tv({
  base: "group/button inline-flex shrink-0 items-center justify-center rounded-none border border-transparent bg-clip-padding text-xs font-medium whitespace-nowrap transition-[color,background-color,border-color,outline-color,box-shadow,opacity,translate] outline-none select-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/80",
      outline:
        "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
      ghost:
        "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
      destructive:
        "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
      link: "text-primary underline-offset-4 hover:underline",
    },
    size: {
      "default":
        "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
      "xs": "h-6 gap-1 rounded-none px-2 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
      "sm": "h-7 gap-1 rounded-none px-2.5 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
      "lg": "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
      "icon": "size-8",
      "icon-xs": "size-6 rounded-none [&_svg:not([class*='size-'])]:size-3",
      "icon-sm": "size-7 rounded-none",
      "icon-lg": "size-9",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})
/**
 * Base UI types this button's `className` as a string *or* a function of its own state, and the
 * caller's value goes through `cn`, which accepts neither a function nor takes one as input. So the
 * merge is handed back as a function too: it resolves the caller's form first, then merges whatever
 * that produced. `cva`'s looser typing used to let a function through to be stringified.
 */
function Button({ className, variant = "default", size = "default", ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
    "data-slot": "button",
    "className": (state) =>
      cn(
        buttonVariants({
          variant,
          size,
        }),
        typeof className === "function" ? className(state) : className,
      ),
    ...props,
  })
}
//#endregion
//#region src/components/ui/toast.tsx
const toast = createToastManager$1()
function ToastProvider({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastProvider$1, { ...props })
}
function ToastPortal({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastPortal$1, {
    "data-slot": "toast-portal",
    ...props,
  })
}
function ToastViewport({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastViewport$1, {
    "data-slot": "toast-viewport",
    "className": cn(
      "pointer-events-none fixed inset-x-4 bottom-4 z-50 mx-auto w-auto max-w-sm outline-none sm:right-4 sm:left-auto sm:mx-0 sm:w-full",
      className,
    ),
    ...props,
  })
}
function Toast({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastRoot, {
    "data-slot": "toast",
    "className": cn(
      "group/toast pointer-events-auto absolute right-0 bottom-0 z-[calc(1000-var(--toast-index))] w-full origin-bottom rounded-none border bg-popover text-popover-foreground shadow-lg will-change-transform outline-none select-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
      "[--gap:0.75rem] [--height:var(--toast-frontmost-height,var(--toast-height))] [--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))]",
      "h-(--height) [transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))] [transition:transform_500ms_cubic-bezier(0.22,1,0.36,1),opacity_500ms,height_150ms]",
      "after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
      "data-expanded:h-(--toast-height) data-expanded:[transform:translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))]",
      "data-limited:opacity-0 data-starting-style:[transform:translateY(150%)]",
      "[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(150%)]",
      "data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]",
      "data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
      "data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
      "data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]",
      "data-expanded:data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]",
      "data-expanded:data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
      "data-expanded:data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
      "data-expanded:data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]",
      className,
    ),
    ...props,
  })
}
function ToastContent({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastContent$1, {
    "data-slot": "toast-content",
    "className": cn(
      "flex h-full items-center gap-3 overflow-hidden p-4 transition-opacity duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] data-behind:opacity-0 data-expanded:opacity-100",
      className,
    ),
    ...props,
  })
}
function ToastTitle({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastTitle$1, {
    "data-slot": "toast-title",
    "className": cn("text-sm font-medium", className),
    ...props,
  })
}
function ToastDescription({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastDescription$1, {
    "data-slot": "toast-description",
    "className": cn("text-sm text-muted-foreground", className),
    ...props,
  })
}
function ToastAction({
  className,
  render = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
    variant: "outline",
    size: "sm",
  }),
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastAction$1, {
    "data-slot": "toast-action",
    render,
    "className": cn("shrink-0", className),
    ...props,
  })
}
function ToastClose({
  className,
  children,
  render = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
    variant: "ghost",
    size: "icon-sm",
  }),
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastClose$1, {
    "data-slot": "toast-close",
    "aria-label": "Close toast",
    render,
    "className": cn(
      "relative shrink-0 text-muted-foreground after:absolute after:-inset-2 after:content-[''] hover:text-foreground",
      className,
    ),
    ...props,
    "children":
      children ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconX, { "aria-hidden": "true" }),
  })
}
function ToastIcon({ type }) {
  let icon = null
  if (type === "success")
    icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconCircleCheck, { "aria-hidden": "true" })
  if (type === "info")
    icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconInfoCircle, { "aria-hidden": "true" })
  if (type === "warning")
    icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconAlertTriangle, { "aria-hidden": "true" })
  if (type === "error")
    icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconAlertOctagon, {
      "className": "text-destructive",
      "aria-hidden": "true",
    })
  if (type === "loading")
    icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconLoader, {
      "className": "animate-spin",
      "aria-hidden": "true",
    })
  if (!icon) return null
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
    "data-slot": "toast-icon",
    "className": "shrink-0 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
    "children": icon,
  })
}
function ToastList() {
  const { toasts } = useToastManager$1()
  return toasts.map((toastItem) =>
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      Toast,
      {
        toast: toastItem,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToastContent, {
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastIcon, { type: toastItem.type }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              className: "flex min-w-0 flex-1 flex-col gap-1",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastTitle, {}),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastDescription, {}),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastAction, {}),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastClose, {}),
          ],
        }),
      },
      toastItem.id,
    ),
  )
}
function Toaster({ children, toastManager = toast, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToastProvider, {
    toastManager,
    ...props,
    children: [
      children,
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastPortal, {
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastViewport, {
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastList, {}),
        }),
      }),
    ],
  })
}
//#endregion
//#region src/shared/notify.ts
function showError(error, fallback) {
  showFailure(error instanceof Error ? error.message : fallback)
}
function showFailure(description) {
  toast.add({
    title: "操作失败",
    description,
    type: "error",
  })
}
function showSuccess(title, description) {
  toast.add({
    title,
    description,
    type: "success",
  })
}
//#endregion
//#region src/features/session/auth-failure.ts
/**
 * What the admin API's refusal does to the session, in one place. Wired into the query and mutation
 * caches (`@/router`), so it runs for every admin read and write any feature makes — which is why it
 * lives here rather than beside the pages that happen to make them.
 *
 * It also reports, because nowhere else can. A key is never proven before it is spent
 * (`./queries.ts`), so this is where an operator finds out theirs is not one — and marking the key
 * refused makes the gate swap the page out in the same commit the error lands in, which unmounts
 * whatever was rendering under it. No effect down there survives to say anything, so the notice a page
 * keeps for its own failures never reaches the eye on this path. This runs from the cache, outside
 * every page.
 *
 * A mutation that is refused reports twice — once for the mutation, once for the session it just lost.
 * Both are true, and the second is what explains the redirect that follows.
 */
function noteAuthFailure(error) {
  if (!(error instanceof ApiError) || error.code !== "unauthorized") return
  noteTokenRefused()
  showError(error, "管理密钥未通过验证。")
}
//#endregion
//#region src/features/session/queries.ts
/**
 * The two `useQueryClient()` call sites session needs. Cache operations are confined to a feature's
 * `queries.ts` — a component or hook file outside it may only call the named hooks this module
 * exports, never reach the client itself.
 */
/** Anything already cached was read with the previous key. */
function resetAdminCache(client) {
  client.removeQueries()
}
function isAdminErrorCode(value) {
  return typeof value === "string" && ADMIN_ERROR_CODES.includes(value)
}
async function verifyToken(token) {
  const response = await fetch("/api/session", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  })
  if (response.ok) return
  let body = {}
  try {
    body = await response.json()
  } catch {}
  const code = isAdminErrorCode(body.code) ? body.code : "internal"
  const message = typeof body.error === "string" ? body.error : "无法验证管理密码。"
  throw new ApiError(code, message)
}
/**
 * Proves the single-user password before it enters the browser session. The same `adminOnly`
 * middleware protects this probe and every management request, so a password accepted here is not a
 * second credential with a weaker definition. A later 401 still refuses the session normally — for
 * example after the deployment secret changes.
 */
function useConnect() {
  const client = useQueryClient()
  return async (draft) => {
    const token = draft.trim()
    if (!hasToken(token)) return false
    await verifyToken(token)
    commitToken(token)
    resetAdminCache(client)
    return true
  }
}
/**
 * The way out: the key goes, and with it everything that was read under it.
 * Nothing in flight gates this — dropping a credential is not an action to make someone wait for.
 */
function useDisconnect() {
  const client = useQueryClient()
  return () => {
    clearToken()
    resetAdminCache(client)
    showSuccess("已断开连接", "管理密钥已从这个浏览器会话清除。")
  }
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/separator/Separator.mjs
/**
 * A separator element accessible to screen readers.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Separator](https://base-ui.com/react/components/separator)
 */
const Separator$1 = /*#__PURE__*/ import_react.forwardRef(
  function SeparatorComponent(componentProps, forwardedRef) {
    const { className, render, orientation = "horizontal", style, ...elementProps } = componentProps
    return useRenderElement("div", componentProps, {
      state: { orientation },
      ref: forwardedRef,
      props: [
        {
          "role": "separator",
          "aria-orientation": orientation,
        },
        elementProps,
      ],
    })
  },
)
//#endregion
//#region src/components/ui/separator.tsx
function Separator({ className, orientation = "horizontal", ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {
    "data-slot": "separator",
    orientation,
    "className": cn(
      "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
      className,
    ),
    ...props,
  })
}
//#endregion
//#region src/shared/hydrated.ts
/**
 * Nothing to subscribe to: the answer changes once, and React itself is what changes it — the
 * unsubscribe is returned only because the signature asks for one.
 */
const noStore = () => () => {}
const onClient = () => true
const onServer = () => false
/**
 * Whether this render is a post-hydration one.
 *
 * `false` during the server render and during the hydration render that has to match its HTML, then
 * `true` for every render after. React drives the flip itself: `useSyncExternalStore` renders the
 * server snapshot while hydrating and re-renders with the client one once it is done, which is the
 * same mechanism that lets `session/token.ts` seed a key at module scope without tearing hydration.
 *
 * For callers whose markup cannot describe what the browser knows yet — a session key in
 * sessionStorage, a viewport measurement — and who would rather cover the frame than render a claim
 * they are about to retract.
 */
function useHydrated() {
  return (0, import_react.useSyncExternalStore)(noStore, onClient, onServer)
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/dialog/root/DialogRootContext.mjs
const DialogRootContext = /*#__PURE__*/ import_react.createContext(void 0)
function useDialogRootContext(optional) {
  const store = import_react.useContext(DialogRootContext)
  if (!optional && store === void 0) throw new Error(formatErrorMessage(27))
  return store
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/drawer/popup/DrawerPopupCssVars.mjs
const DrawerPopupCssVars = /*#__PURE__*/ (function (DrawerPopupCssVars) {
  /**
   * The number of nested drawers that are currently open.
   * @type {number}
   */
  DrawerPopupCssVars["nestedDrawers"] = "--nested-drawers"
  /**
   * The height of the drawer popup.
   * @type {CSS length}
   */
  DrawerPopupCssVars["height"] = "--drawer-height"
  /**
   * The height of the frontmost open drawer in the current nested drawer stack.
   * @type {CSS length}
   */
  DrawerPopupCssVars["frontmostHeight"] = "--drawer-frontmost-height"
  /**
   * The swipe movement on the X axis.
   * @type {CSS length}
   */
  DrawerPopupCssVars["swipeMovementX"] = "--drawer-swipe-movement-x"
  /**
   * The swipe movement on the Y axis.
   * @type {CSS length}
   */
  DrawerPopupCssVars["swipeMovementY"] = "--drawer-swipe-movement-y"
  /**
   * The snap point offset used for translating the drawer.
   * @type {CSS length}
   */
  DrawerPopupCssVars["snapPointOffset"] = "--drawer-snap-point-offset"
  /**
   * A scalar (0.1-1) used to scale the swipe release transition duration in CSS.
   * @type {number}
   */
  DrawerPopupCssVars["swipeStrength"] = "--drawer-swipe-strength"
  return DrawerPopupCssVars
})({})
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/drawer/backdrop/DrawerBackdropCssVars.mjs
const DrawerBackdropCssVars = /*#__PURE__*/ (function (DrawerBackdropCssVars) {
  /**
   * The swipe progress of the drawer gesture.
   * @type {number}
   */
  DrawerBackdropCssVars["swipeProgress"] = "--drawer-swipe-progress"
  return DrawerBackdropCssVars
})({})
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/drawer/backdrop/DrawerBackdrop.mjs
/**
 * An overlay displayed beneath the popup.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Drawer](https://base-ui.com/react/components/drawer)
 */
const DrawerBackdrop = /*#__PURE__*/ import_react.forwardRef(
  function DrawerBackdrop(componentProps, forwardedRef) {
    const { render, className, style, forceRender = false, ...elementProps } = componentProps
    const store = useDialogRootContext()
    const open = store.useState("open")
    const nested = store.useState("nested")
    const mounted = store.useState("mounted")
    return useRenderElement("div", componentProps, {
      state: {
        open,
        transitionStatus: store.useState("transitionStatus"),
      },
      ref: [store.context.backdropRef, forwardedRef],
      stateAttributesMapping: popupTransitionStateMapping,
      props: [
        {
          role: "presentation",
          hidden: !mounted,
          style: {
            pointerEvents: !open ? "none" : void 0,
            userSelect: "none",
            WebkitUserSelect: "none",
            [DrawerBackdropCssVars.swipeProgress]: "0",
            [DrawerPopupCssVars.swipeStrength]: "1",
          },
        },
        elementProps,
      ],
      enabled: forceRender || !nested,
    })
  },
)
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/dialog/close/DialogClose.mjs
/**
 * A button that closes the dialog.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
 */
const DialogClose = /*#__PURE__*/ import_react.forwardRef(
  function DialogClose(componentProps, forwardedRef) {
    const {
      render,
      className,
      style,
      disabled = false,
      nativeButton = true,
      ...elementProps
    } = componentProps
    const store = useDialogRootContext()
    const open = store.useState("open")
    const { getButtonProps, buttonRef } = useButton({
      disabled,
      native: nativeButton,
    })
    const state = { disabled }
    function handleClick(event) {
      if (open) store.setOpen(false, createChangeEventDetails(closePress, event.nativeEvent))
    }
    return useRenderElement("button", componentProps, {
      state,
      ref: [forwardedRef, buttonRef],
      props: [{ onClick: handleClick }, elementProps, getButtonProps],
    })
  },
)
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/drawer/content/DrawerContentDataAttributes.mjs
const DRAWER_CONTENT_ATTRIBUTE = "data-drawer-content"
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/drawer/content/DrawerContent.mjs
/**
 * A container for the drawer contents.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Drawer](https://base-ui.com/react/components/drawer)
 */
const DrawerContent$1 = /*#__PURE__*/ import_react.forwardRef(
  function DrawerContent(componentProps, forwardedRef) {
    const { render, className, style, ...elementProps } = componentProps
    useDialogRootContext()
    return useRenderElement("div", componentProps, {
      ref: forwardedRef,
      props: [{ [DRAWER_CONTENT_ATTRIBUTE]: "" }, elementProps],
    })
  },
)
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/internals/useBaseUiId.mjs
/**
 * Wraps `useId` and prefixes generated `id`s with `base-ui-`
 * @param {string | undefined} idOverride overrides the generated id when provided
 * @returns {string | undefined}
 */
function useBaseUiId(idOverride) {
  return useId(idOverride, "base-ui")
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/dialog/description/DialogDescription.mjs
/**
 * A paragraph with additional information about the dialog.
 * Renders a `<p>` element.
 *
 * Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
 */
const DialogDescription = /*#__PURE__*/ import_react.forwardRef(
  function DialogDescription(componentProps, forwardedRef) {
    const { render, className, style, id: idProp, ...elementProps } = componentProps
    const store = useDialogRootContext()
    const id = useBaseUiId(idProp)
    store.useSyncedValueWithCleanup("descriptionElementId", id)
    return useRenderElement("p", componentProps, {
      ref: forwardedRef,
      props: [{ id }, elementProps],
    })
  },
)
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/drawer/description/DrawerDescription.mjs
/**
 * A paragraph with additional information about the drawer.
 * Renders a `<p>` element.
 *
 * Documentation: [Base UI Drawer](https://base-ui.com/react/components/drawer)
 */
const DrawerDescription$1 = DialogDescription
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/drawer/provider/DrawerProviderContext.mjs
const DrawerProviderContext = /*#__PURE__*/ import_react.createContext(void 0)
function useDrawerProviderContext() {
  return import_react.useContext(DrawerProviderContext)
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/drawer/popup/DrawerPopupDataAttributes.mjs
const DrawerPopupDataAttributes = (function (DrawerPopupDataAttributes) {
  /**
   * Present when the drawer is open.
   */
  DrawerPopupDataAttributes[(DrawerPopupDataAttributes["open"] = CommonPopupDataAttributes.open)] =
    "open"
  /**
   * Present when the drawer is closed.
   */
  DrawerPopupDataAttributes[
    (DrawerPopupDataAttributes["closed"] = CommonPopupDataAttributes.closed)
  ] = "closed"
  /**
   * Present when the drawer begins animating in.
   */
  DrawerPopupDataAttributes[
    (DrawerPopupDataAttributes["startingStyle"] = CommonPopupDataAttributes.startingStyle)
  ] = "startingStyle"
  /**
   * Present when the drawer is animating out.
   */
  DrawerPopupDataAttributes[
    (DrawerPopupDataAttributes["endingStyle"] = CommonPopupDataAttributes.endingStyle)
  ] = "endingStyle"
  /**
   * Present when the drawer is at the expanded (full-height) snap point.
   */
  DrawerPopupDataAttributes["expanded"] = "data-expanded"
  /**
   * Present when a nested drawer is open.
   */
  DrawerPopupDataAttributes["nestedDrawerOpen"] = "data-nested-drawer-open"
  /**
   * Present when a nested drawer is being swiped.
   */
  DrawerPopupDataAttributes["nestedDrawerSwiping"] = "data-nested-drawer-swiping"
  /**
   * Present when the drawer is dismissed by swiping.
   */
  DrawerPopupDataAttributes["swipeDismiss"] = "data-swipe-dismiss"
  /**
   * Indicates the swipe direction.
   * @type {'up' | 'down' | 'left' | 'right'}
   */
  DrawerPopupDataAttributes["swipeDirection"] = "data-swipe-direction"
  /**
   * Present when the drawer is being swiped.
   */
  DrawerPopupDataAttributes["swiping"] = "data-swiping"
  return DrawerPopupDataAttributes
})({})
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/dialog/portal/DialogPortalContext.mjs
const DialogPortalContext = /*#__PURE__*/ import_react.createContext(void 0)
function useDialogPortalContext() {
  const value = import_react.useContext(DialogPortalContext)
  if (value === void 0) throw new Error(formatErrorMessage(26))
  return value
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/internals/composite/composite.mjs
const ARROW_UP = "ArrowUp"
const ARROW_DOWN = "ArrowDown"
const ARROW_LEFT = "ArrowLeft"
const ARROW_RIGHT = "ArrowRight"
const HOME = "Home"
const COMPOSITE_KEYS = /* @__PURE__ */ new Set([
  ARROW_UP,
  ARROW_DOWN,
  ARROW_LEFT,
  ARROW_RIGHT,
  HOME,
  "End",
])
const MODIFIER_KEYS = ["Shift", "Control", "Alt", "Meta"]
function isInputElement(element) {
  return isHTMLElement(element) && element.tagName === "INPUT"
}
function isNativeInput(element) {
  if (isInputElement(element) && element.selectionStart != null) return true
  if (isHTMLElement(element) && element.tagName === "TEXTAREA") return true
  return false
}
function scrollIntoViewIfNeeded(scrollContainer, element, direction, orientation) {
  if (!scrollContainer || !element || !element.scrollTo) return
  let targetX = scrollContainer.scrollLeft
  let targetY = scrollContainer.scrollTop
  const isOverflowingX = scrollContainer.clientWidth < scrollContainer.scrollWidth
  const isOverflowingY = scrollContainer.clientHeight < scrollContainer.scrollHeight
  if (isOverflowingX && orientation !== "vertical") {
    const elementOffsetLeft = getOffset(scrollContainer, element, "left")
    const containerStyles = getStyles(scrollContainer)
    const elementStyles = getStyles(element)
    if (direction === "ltr") {
      if (
        elementOffsetLeft + element.offsetWidth + elementStyles.scrollMarginRight >
        scrollContainer.scrollLeft +
          scrollContainer.clientWidth -
          containerStyles.scrollPaddingRight
      )
        targetX =
          elementOffsetLeft +
          element.offsetWidth +
          elementStyles.scrollMarginRight -
          scrollContainer.clientWidth +
          containerStyles.scrollPaddingRight
      else if (
        elementOffsetLeft - elementStyles.scrollMarginLeft <
        scrollContainer.scrollLeft + containerStyles.scrollPaddingLeft
      )
        targetX =
          elementOffsetLeft - elementStyles.scrollMarginLeft - containerStyles.scrollPaddingLeft
    }
    if (direction === "rtl") {
      if (
        elementOffsetLeft - elementStyles.scrollMarginLeft <
        scrollContainer.scrollLeft + containerStyles.scrollPaddingLeft
      )
        targetX =
          elementOffsetLeft - elementStyles.scrollMarginLeft - containerStyles.scrollPaddingLeft
      else if (
        elementOffsetLeft + element.offsetWidth + elementStyles.scrollMarginRight >
        scrollContainer.scrollLeft +
          scrollContainer.clientWidth -
          containerStyles.scrollPaddingRight
      )
        targetX =
          elementOffsetLeft +
          element.offsetWidth +
          elementStyles.scrollMarginRight -
          scrollContainer.clientWidth +
          containerStyles.scrollPaddingRight
    }
  }
  if (isOverflowingY && orientation !== "horizontal") {
    const elementOffsetTop = getOffset(scrollContainer, element, "top")
    const containerStyles = getStyles(scrollContainer)
    const elementStyles = getStyles(element)
    if (
      elementOffsetTop - elementStyles.scrollMarginTop <
      scrollContainer.scrollTop + containerStyles.scrollPaddingTop
    )
      targetY = elementOffsetTop - elementStyles.scrollMarginTop - containerStyles.scrollPaddingTop
    else if (
      elementOffsetTop + element.offsetHeight + elementStyles.scrollMarginBottom >
      scrollContainer.scrollTop + scrollContainer.clientHeight - containerStyles.scrollPaddingBottom
    )
      targetY =
        elementOffsetTop +
        element.offsetHeight +
        elementStyles.scrollMarginBottom -
        scrollContainer.clientHeight +
        containerStyles.scrollPaddingBottom
  }
  scrollContainer.scrollTo({
    left: targetX,
    top: targetY,
    behavior: "auto",
  })
}
function getOffset(ancestor, element, side) {
  const propName = side === "left" ? "offsetLeft" : "offsetTop"
  let result = 0
  while (element.offsetParent) {
    result += element[propName]
    if (element.offsetParent === ancestor) break
    element = element.offsetParent
  }
  return result
}
function getStyles(element) {
  const styles = getComputedStyle(element)
  return {
    scrollMarginTop: parseFloat(styles.scrollMarginTop) || 0,
    scrollMarginRight: parseFloat(styles.scrollMarginRight) || 0,
    scrollMarginBottom: parseFloat(styles.scrollMarginBottom) || 0,
    scrollMarginLeft: parseFloat(styles.scrollMarginLeft) || 0,
    scrollPaddingTop: parseFloat(styles.scrollPaddingTop) || 0,
    scrollPaddingRight: parseFloat(styles.scrollPaddingRight) || 0,
    scrollPaddingBottom: parseFloat(styles.scrollPaddingBottom) || 0,
    scrollPaddingLeft: parseFloat(styles.scrollPaddingLeft) || 0,
  }
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/drawer/root/DrawerRootContext.mjs
const DrawerRootContext = /*#__PURE__*/ import_react.createContext(void 0)
function useDrawerRootContext(optional) {
  const drawerRootContext = import_react.useContext(DrawerRootContext)
  if (optional !== true && drawerRootContext === void 0) throw new Error(formatErrorMessage(90))
  return drawerRootContext
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/drawer/root/useDrawerSnapPoints.mjs
/**
 * Resolves the vertical swipe movement for a snap point, applying square-root damping once the drag
 * overshoots the fully-open edge (`nextOffset < 0`) so the popup resists travelling past it.
 */
function getSnapPointSwipeMovement(baseOffset, movementValue) {
  const nextOffset = baseOffset + movementValue
  if (nextOffset >= 0) return movementValue
  return -Math.sqrt(-nextOffset) - baseOffset
}
function resolveSnapPointValue(snapPoint, viewportHeight, rootFontSize) {
  if (!Number.isFinite(viewportHeight) || viewportHeight <= 0) return null
  if (typeof snapPoint === "number") {
    if (!Number.isFinite(snapPoint)) return null
    if (snapPoint <= 1) return clamp(snapPoint, 0, 1) * viewportHeight
    return snapPoint
  }
  const trimmed = snapPoint.trim()
  if (trimmed.endsWith("px")) {
    const value = Number.parseFloat(trimmed)
    return Number.isFinite(value) ? value : null
  }
  if (trimmed.endsWith("rem")) {
    const value = Number.parseFloat(trimmed)
    return Number.isFinite(value) ? value * rootFontSize : null
  }
  return null
}
/**
 * Returns the index of the value closest to `target`, or `-1` if `values` is empty.
 */
function closestSnapPointIndex(values, target) {
  let closestIndex = -1
  let closestDistance = Infinity
  for (let index = 0; index < values.length; index += 1) {
    const distance = Math.abs(values[index] - target)
    if (distance < closestDistance) {
      closestDistance = distance
      closestIndex = index
    }
  }
  return closestIndex
}
function useDrawerSnapPoints() {
  const store = useDialogRootContext()
  const { snapPoints, activeSnapPoint, setActiveSnapPoint, popupHeight } = useDrawerRootContext()
  const viewportElement = store.useState("viewportElement")
  const [viewportHeight, setViewportHeight] = import_react.useState(0)
  const [rootFontSize, setRootFontSize] = import_react.useState(16)
  const measureViewportHeight = useStableCallback(() => {
    const html = ownerDocument(viewportElement).documentElement
    setViewportHeight(viewportElement ? viewportElement.offsetHeight : html.clientHeight)
    const fontSize = parseFloat(getComputedStyle(html).fontSize)
    if (Number.isFinite(fontSize)) setRootFontSize(fontSize)
  })
  useIsoLayoutEffect(() => {
    measureViewportHeight()
    if (!viewportElement || typeof ResizeObserver !== "function") return
    const resizeObserver = new ResizeObserver(measureViewportHeight)
    resizeObserver.observe(viewportElement)
    return () => {
      resizeObserver.disconnect()
    }
  }, [measureViewportHeight, viewportElement])
  const resolvedSnapPoints = import_react.useMemo(() => {
    if (!snapPoints || snapPoints.length === 0 || viewportHeight <= 0 || popupHeight <= 0) return []
    const maxHeight = Math.min(popupHeight, viewportHeight)
    const resolved = snapPoints
      .map((value) => {
        const resolvedHeight = resolveSnapPointValue(value, viewportHeight, rootFontSize)
        if (resolvedHeight === null) return null
        const clampedHeight = clamp(resolvedHeight, 0, maxHeight)
        return {
          value,
          height: clampedHeight,
          offset: Math.max(0, popupHeight - clampedHeight),
        }
      })
      .filter((point) => Boolean(point))
    if (resolved.length <= 1) return resolved
    const deduped = []
    const seenHeights = []
    for (let index = resolved.length - 1; index >= 0; index -= 1) {
      const point = resolved[index]
      if (seenHeights.some((height) => Math.abs(height - point.height) <= 1)) continue
      seenHeights.push(point.height)
      deduped.push(point)
    }
    deduped.reverse()
    return deduped
  }, [popupHeight, rootFontSize, snapPoints, viewportHeight])
  return {
    snapPoints,
    activeSnapPoint,
    setActiveSnapPoint,
    popupHeight,
    viewportHeight,
    resolvedSnapPoints,
    activeSnapPointOffset:
      import_react.useMemo(() => {
        if (activeSnapPoint === null) return
        const exactMatch = resolvedSnapPoints.find((point) =>
          Object.is(point.value, activeSnapPoint),
        )
        if (exactMatch) return exactMatch
        const maxHeight = Math.min(popupHeight, viewportHeight)
        const resolvedHeight = resolveSnapPointValue(activeSnapPoint, viewportHeight, rootFontSize)
        if (resolvedHeight === null) return
        const clampedHeight = clamp(resolvedHeight, 0, maxHeight)
        return resolvedSnapPoints[
          closestSnapPointIndex(
            resolvedSnapPoints.map((point) => point.height),
            clampedHeight,
          )
        ]
      }, [activeSnapPoint, popupHeight, resolvedSnapPoints, rootFontSize, viewportHeight])
        ?.offset ?? null,
  }
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/drawer/viewport/DrawerViewportContext.mjs
const DrawerViewportContext = /*#__PURE__*/ import_react.createContext(null)
function useDrawerViewportContext() {
  return import_react.useContext(DrawerViewportContext)
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/drawer/popup/DrawerPopup.mjs
let drawerSwipeVarsRegistered = false
/**
 * Removes inheritance of high-frequency drawer swipe CSS variables, which
 * reduces style recalculation cost in complex drawers with deep subtrees.
 * See https://motion.dev/blog/web-animation-performance-tier-list
 * under the "Improving CSS variable performance" section.
 */
function removeCSSVariableInheritance() {
  if (drawerSwipeVarsRegistered) return
  if (typeof CSS !== "undefined" && "registerProperty" in CSS) {
    ;[
      DrawerPopupCssVars.swipeMovementX,
      DrawerPopupCssVars.swipeMovementY,
      DrawerPopupCssVars.snapPointOffset,
    ].forEach((name) => {
      try {
        CSS.registerProperty({
          name,
          syntax: "<length>",
          inherits: false,
          initialValue: "0px",
        })
      } catch {}
    })
    ;[
      {
        name: DrawerBackdropCssVars.swipeProgress,
        initialValue: "0",
      },
      {
        name: DrawerPopupCssVars.swipeStrength,
        initialValue: "1",
      },
    ].forEach(({ name, initialValue }) => {
      try {
        CSS.registerProperty({
          name,
          syntax: "<number>",
          inherits: false,
          initialValue,
        })
      } catch {}
    })
  }
  drawerSwipeVarsRegistered = true
}
const stateAttributesMapping = {
  ...popupTransitionStateMapping,
  expanded(value) {
    return value ? { [DrawerPopupDataAttributes.expanded]: "" } : null
  },
  nestedDrawerOpen(value) {
    return value ? { [DrawerPopupDataAttributes.nestedDrawerOpen]: "" } : null
  },
  nestedDrawerSwiping(value) {
    return value ? { [DrawerPopupDataAttributes.nestedDrawerSwiping]: "" } : null
  },
  swipeDirection(value) {
    return { [DrawerPopupDataAttributes.swipeDirection]: value }
  },
  swiping(value) {
    return value ? { [DrawerPopupDataAttributes.swiping]: "" } : null
  },
}
/**
 * A container for the drawer contents.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Drawer](https://base-ui.com/react/components/drawer)
 */
const DrawerPopup = /*#__PURE__*/ import_react.forwardRef(
  function DrawerPopup(componentProps, forwardedRef) {
    const { render, className, style, finalFocus, initialFocus, ...elementProps } = componentProps
    const store = useDialogRootContext()
    const popupRef = store.context.popupRef
    const {
      swipeDirection,
      frontmostHeight,
      hasNestedDrawer,
      nestedSwiping,
      nestedSwipeProgressStore,
      onPopupHeightChange,
      notifyParentFrontmostHeight,
      notifyParentHasNestedDrawer,
    } = useDrawerRootContext()
    const descriptionElementId = store.useState("descriptionElementId")
    const disablePointerDismissal = store.useState("disablePointerDismissal")
    const floatingRootContext = store.useState("floatingRootContext")
    const rootPopupProps = store.useState("popupProps")
    const modal = store.useState("modal")
    const mounted = store.useState("mounted")
    const nested = store.useState("nested")
    const nestedOpenDrawerCount = store.useState("nestedOpenDrawerCount")
    const transitionStatus = store.useState("transitionStatus")
    const open = store.useState("open")
    const openMethod = store.useState("openMethod")
    const titleElementId = store.useState("titleElementId")
    const role = store.useState("role")
    const floatingId = floatingRootContext.useState("floatingId")
    const popupId = elementProps.id ?? floatingId
    const swipe = useDrawerViewportContext()
    useDialogPortalContext()
    const { snapPoints, activeSnapPoint, activeSnapPointOffset } = useDrawerSnapPoints()
    const nestedDrawerOpen = nestedOpenDrawerCount > 0
    const swiping = swipe?.swiping ?? false
    const swipeStrength = swipe?.swipeStrength ?? null
    const [popupHeight, setPopupHeight] = import_react.useState(0)
    const popupHeightRef = import_react.useRef(0)
    const measureHeight = useStableCallback(() => {
      const popupElement = popupRef.current
      if (!popupElement) return
      const offsetHeight = popupElement.offsetHeight
      if (
        popupHeightRef.current > 0 &&
        frontmostHeight > popupHeightRef.current &&
        offsetHeight > popupHeightRef.current
      )
        return
      if (popupHeightRef.current > 0 && hasNestedDrawer) {
        const oldHeight = popupHeightRef.current
        setPopupHeight(oldHeight)
        onPopupHeightChange(oldHeight)
        return
      }
      const nextHeight = offsetHeight
      if (nextHeight === popupHeightRef.current) return
      popupHeightRef.current = nextHeight
      setPopupHeight(nextHeight)
      onPopupHeightChange(nextHeight)
    })
    useIsoLayoutEffect(() => {
      if (!mounted) {
        popupHeightRef.current = 0
        setPopupHeight(0)
        onPopupHeightChange(0)
        return
      }
      const popupElement = popupRef.current
      if (!popupElement) return
      removeCSSVariableInheritance()
      measureHeight()
      if (typeof ResizeObserver !== "function") return
      const resizeObserver = new ResizeObserver(measureHeight)
      resizeObserver.observe(popupElement)
      return () => {
        resizeObserver.disconnect()
      }
    }, [measureHeight, mounted, nestedDrawerOpen, onPopupHeightChange, popupRef])
    useIsoLayoutEffect(() => {
      const syncNestedSwipeProgress = () => {
        const popupElement = popupRef.current
        if (!popupElement) return
        const progress = nestedSwipeProgressStore.getSnapshot()
        if (progress > 0)
          popupElement.style.setProperty(DrawerBackdropCssVars.swipeProgress, `${progress}`)
        else popupElement.style.setProperty(DrawerBackdropCssVars.swipeProgress, "0")
      }
      syncNestedSwipeProgress()
      const unsubscribe = nestedSwipeProgressStore.subscribe(syncNestedSwipeProgress)
      const popupElement = popupRef.current
      return () => {
        unsubscribe()
        if (popupElement) popupElement.style.setProperty(DrawerBackdropCssVars.swipeProgress, "0")
      }
    }, [nestedSwipeProgressStore, popupRef])
    useIsoLayoutEffect(() => {
      if (!open) return
      notifyParentFrontmostHeight?.(frontmostHeight)
      return () => {
        notifyParentFrontmostHeight?.(0)
      }
    }, [frontmostHeight, open, notifyParentFrontmostHeight])
    useIsoLayoutEffect(() => {
      if (!notifyParentHasNestedDrawer) return
      notifyParentHasNestedDrawer(open || transitionStatus === "ending")
      return () => {
        notifyParentHasNestedDrawer(false)
      }
    }, [notifyParentHasNestedDrawer, open, transitionStatus])
    useOpenChangeComplete({
      open,
      ref: popupRef,
      onComplete() {
        if (open) store.context.onOpenChangeComplete?.(true)
      },
    })
    const resolvedInitialFocus = initialFocus === void 0 ? popupRef : initialFocus
    const setPopupElement = store.useStateSetter("popupElement")
    const state = {
      open,
      nested,
      transitionStatus,
      expanded: activeSnapPoint === 1,
      nestedDrawerOpen,
      nestedDrawerSwiping: nestedSwiping,
      swipeDirection,
      swiping,
    }
    let popupHeightCssVarValue
    if (popupHeight && !(!hasNestedDrawer && transitionStatus !== "ending"))
      popupHeightCssVarValue = `${popupHeight}px`
    const shouldApplySnapPoints =
      snapPoints && snapPoints.length > 0 && (swipeDirection === "down" || swipeDirection === "up")
    let snapPointOffsetValue = null
    if (shouldApplySnapPoints && activeSnapPointOffset !== null)
      snapPointOffsetValue =
        swipeDirection === "up" ? -activeSnapPointOffset : activeSnapPointOffset
    let dragStyles = swipe ? swipe.getDragStyles() : EMPTY_OBJECT
    if (shouldApplySnapPoints && swipeDirection === "down") {
      const baseOffset = activeSnapPointOffset ?? 0
      const movementValue = Number.parseFloat(String(dragStyles[DrawerPopupCssVars.swipeMovementY]))
      if (swiping && Number.isFinite(movementValue))
        dragStyles = {
          ...dragStyles,
          transform: void 0,
          [DrawerPopupCssVars.swipeMovementY]: `${getSnapPointSwipeMovement(baseOffset, movementValue)}px`,
        }
      else
        dragStyles = {
          ...dragStyles,
          transform: void 0,
        }
    }
    const element = useRenderElement("div", componentProps, {
      state,
      props: [
        rootPopupProps,
        {
          "id": popupId,
          "aria-labelledby": titleElementId,
          "aria-describedby": descriptionElementId,
          role,
          ...FOCUSABLE_POPUP_PROPS,
          "hidden": !mounted,
          "onKeyDown"(event) {
            if (COMPOSITE_KEYS.has(event.key)) event.stopPropagation()
          },
          "style": {
            ...dragStyles,
            [DrawerBackdropCssVars.swipeProgress]: "0",
            [DrawerPopupCssVars.nestedDrawers]: nestedOpenDrawerCount,
            [DrawerPopupCssVars.height]: popupHeightCssVarValue,
            [DrawerPopupCssVars.snapPointOffset]:
              typeof snapPointOffsetValue === "number" ? `${snapPointOffsetValue}px` : "0px",
            [DrawerPopupCssVars.frontmostHeight]: frontmostHeight ? `${frontmostHeight}px` : void 0,
            [DrawerPopupCssVars.swipeStrength]:
              typeof swipeStrength === "number" &&
              Number.isFinite(swipeStrength) &&
              swipeStrength > 0
                ? `${swipeStrength}`
                : "1",
          },
        },
        elementProps,
      ],
      ref: [forwardedRef, popupRef, setPopupElement],
      stateAttributesMapping,
    })
    return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FloatingFocusManager, {
      context: floatingRootContext,
      openInteractionType: openMethod,
      disabled: !mounted,
      closeOnFocusOut: !disablePointerDismissal,
      initialFocus: resolvedInitialFocus,
      returnFocus: finalFocus,
      modal: modal !== false,
      restoreFocus: "popup",
      children: element,
    })
  },
)
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/utils/InternalBackdrop.mjs
/**
 * @internal
 */
const InternalBackdrop = /*#__PURE__*/ import_react.forwardRef(
  function InternalBackdrop(props, ref) {
    const { cutout, ...otherProps } = props
    let clipPath
    if (cutout) {
      const rect = cutout.getBoundingClientRect()
      clipPath = `polygon(0% 0%,100% 0%,100% 100%,0% 100%,0% 0%,${rect.left}px ${rect.top}px,${rect.left}px ${rect.bottom}px,${rect.right}px ${rect.bottom}px,${rect.right}px ${rect.top}px,${rect.left}px ${rect.top}px)`
    }
    return /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
      ref,
      "role": "presentation",
      "data-base-ui-inert": "",
      ...otherProps,
      "style": {
        position: "fixed",
        inset: 0,
        userSelect: "none",
        WebkitUserSelect: "none",
        clipPath,
      },
    })
  },
)
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/dialog/portal/DialogPortal.mjs
/**
 * A portal element that moves the popup to a different part of the DOM.
 * By default, the portal element is appended to `<body>`.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
 */
const DialogPortal = /*#__PURE__*/ import_react.forwardRef(
  function DialogPortal(props, forwardedRef) {
    const { keepMounted = false, ...portalProps } = props
    const store = useDialogRootContext()
    const mounted = store.useState("mounted")
    const modal = store.useState("modal")
    const open = store.useState("open")
    if (!(mounted || keepMounted)) return null
    return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(DialogPortalContext.Provider, {
      value: keepMounted,
      children: /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(FloatingPortal, {
        ref: forwardedRef,
        ...portalProps,
        children: [
          mounted &&
            modal === true &&
            /*#__PURE__*/ (0, import_jsx_runtime.jsx)(InternalBackdrop, {
              ref: store.context.internalBackdropRef,
              inert: inertValue(!open),
            }),
          props.children,
        ],
      }),
    })
  },
)
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/drawer/portal/DrawerPortal.mjs
/**
 * A portal element that moves the popup to a different part of the DOM.
 * By default, the portal element is appended to `<body>`.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Drawer](https://base-ui.com/react/components/drawer)
 */
const DrawerPortal$1 = DialogPortal
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.2_@types_46200efdf1f5c806fc19b01530afd9e7/node_modules/@base-ui/utils/useControlled.mjs
function useControlled({ controlled, default: defaultProp, name, state = "value" }) {
  const { current: isControlled } = import_react.useRef(controlled !== void 0)
  const [valueState, setValue] = import_react.useState(defaultProp)
  return [
    isControlled ? controlled : valueState,
    import_react.useCallback((newValue) => {
      if (!isControlled) setValue(newValue)
    }, []),
  ]
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.2_@types_46200efdf1f5c806fc19b01530afd9e7/node_modules/@base-ui/utils/useScrollLock.mjs
let originalHtmlStyles = {}
let originalBodyStyles = {}
let originalHtmlScrollBehavior = ""
function getViewportScroller(html, body) {
  return isOverflowElement(html) ? html : body
}
function isPageScrollLocked(win, html, body) {
  return /hidden|clip/.test(win.getComputedStyle(getViewportScroller(html, body)).overflowY)
}
function hasInsetScrollbars(referenceElement) {
  if (typeof document === "undefined") return false
  const doc = ownerDocument(referenceElement)
  return getWindow(doc).innerWidth - doc.documentElement.clientWidth > 0
}
function supportsStableScrollbarGutter(referenceElement) {
  if (
    !(typeof CSS !== "undefined" && CSS.supports && CSS.supports("scrollbar-gutter", "stable")) ||
    typeof document === "undefined"
  )
    return false
  const doc = ownerDocument(referenceElement)
  const html = doc.documentElement
  const body = doc.body
  const scrollContainer = getViewportScroller(html, body)
  const originalScrollContainerOverflowY = scrollContainer.style.overflowY
  const originalHtmlStyleGutter = html.style.scrollbarGutter
  html.style.scrollbarGutter = "stable"
  scrollContainer.style.overflowY = "scroll"
  const before = scrollContainer.offsetWidth
  scrollContainer.style.overflowY = "hidden"
  const after = scrollContainer.offsetWidth
  scrollContainer.style.overflowY = originalScrollContainerOverflowY
  html.style.scrollbarGutter = originalHtmlStyleGutter
  return before === after
}
function preventScrollOverlayScrollbars(referenceElement) {
  const doc = ownerDocument(referenceElement)
  const html = doc.documentElement
  const body = doc.body
  const elementToLock = getViewportScroller(html, body)
  const originalElementToLockStyles = {
    overflowY: elementToLock.style.overflowY,
    overflowX: elementToLock.style.overflowX,
  }
  Object.assign(elementToLock.style, {
    overflowY: "hidden",
    overflowX: "hidden",
  })
  return () => {
    Object.assign(elementToLock.style, originalElementToLockStyles)
  }
}
function preventScrollInsetScrollbars(referenceElement) {
  const doc = ownerDocument(referenceElement)
  const html = doc.documentElement
  const body = doc.body
  const win = getWindow(html)
  let scrollTop = 0
  let scrollLeft = 0
  let updateGutterOnly = false
  const resizeFrame = AnimationFrame.create()
  if (webkit && (win.visualViewport?.scale ?? 1) !== 1) return () => {}
  function lockScroll() {
    const htmlStyles = win.getComputedStyle(html)
    const bodyStyles = win.getComputedStyle(body)
    const scrollbarGutterValue = (htmlStyles.scrollbarGutter || "").includes("both-edges")
      ? "stable both-edges"
      : "stable"
    scrollTop = html.scrollTop
    scrollLeft = html.scrollLeft
    originalHtmlStyles = {
      scrollbarGutter: html.style.scrollbarGutter,
      overflowY: html.style.overflowY,
      overflowX: html.style.overflowX,
    }
    originalHtmlScrollBehavior = html.style.scrollBehavior
    originalBodyStyles = {
      position: body.style.position,
      height: body.style.height,
      width: body.style.width,
      boxSizing: body.style.boxSizing,
      overflowY: body.style.overflowY,
      overflowX: body.style.overflowX,
      scrollBehavior: body.style.scrollBehavior,
    }
    const isScrollableY = html.scrollHeight > html.clientHeight
    const isScrollableX = html.scrollWidth > html.clientWidth
    const hasConstantOverflowY =
      htmlStyles.overflowY === "scroll" || bodyStyles.overflowY === "scroll"
    const hasConstantOverflowX =
      htmlStyles.overflowX === "scroll" || bodyStyles.overflowX === "scroll"
    const scrollbarWidth = Math.max(0, win.innerWidth - body.clientWidth)
    const scrollbarHeight = Math.max(0, win.innerHeight - body.clientHeight)
    const marginY = parseFloat(bodyStyles.marginTop) + parseFloat(bodyStyles.marginBottom)
    const marginX = parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight)
    const elementToLock = getViewportScroller(html, body)
    updateGutterOnly = supportsStableScrollbarGutter(referenceElement)
    if (updateGutterOnly) {
      html.style.scrollbarGutter = scrollbarGutterValue
      elementToLock.style.overflowY = "hidden"
      elementToLock.style.overflowX = "hidden"
      return
    }
    Object.assign(html.style, {
      scrollbarGutter: scrollbarGutterValue,
      overflowY: "hidden",
      overflowX: "hidden",
    })
    if (isScrollableY || hasConstantOverflowY) html.style.overflowY = "scroll"
    if (isScrollableX || hasConstantOverflowX) html.style.overflowX = "scroll"
    Object.assign(body.style, {
      position: "relative",
      height:
        marginY || scrollbarHeight ? `calc(100dvh - ${marginY + scrollbarHeight}px)` : "100dvh",
      width: marginX || scrollbarWidth ? `calc(100vw - ${marginX + scrollbarWidth}px)` : "100vw",
      boxSizing: "border-box",
      overflowY: "hidden",
      overflowX: "hidden",
      scrollBehavior: "unset",
    })
    body.scrollTop = scrollTop
    body.scrollLeft = scrollLeft
    html.setAttribute("data-base-ui-scroll-locked", "")
    html.style.scrollBehavior = "unset"
  }
  function cleanup() {
    Object.assign(html.style, originalHtmlStyles)
    Object.assign(body.style, originalBodyStyles)
    if (!updateGutterOnly) {
      html.scrollTop = scrollTop
      html.scrollLeft = scrollLeft
      html.removeAttribute("data-base-ui-scroll-locked")
      html.style.scrollBehavior = originalHtmlScrollBehavior
    }
  }
  function handleResize() {
    cleanup()
    resizeFrame.request(lockScroll)
  }
  lockScroll()
  const unsubscribeResize = addEventListener(win, "resize", handleResize)
  return () => {
    resizeFrame.cancel()
    cleanup()
    if (typeof win.removeEventListener === "function") unsubscribeResize()
  }
}
const ScrollLocker = class {
  lockCount = 0
  restore = null
  timeoutLock = Timeout.create()
  timeoutUnlock = Timeout.create()
  acquire(referenceElement) {
    this.lockCount += 1
    if (this.lockCount === 1 && this.restore === null)
      this.timeoutLock.start(0, () => this.lock(referenceElement))
    return this.release
  }
  release = () => {
    this.lockCount -= 1
    if (this.lockCount === 0 && this.restore) this.timeoutUnlock.start(0, this.unlock)
  }
  unlock = () => {
    if (this.lockCount === 0 && this.restore) {
      this.restore?.()
      this.restore = null
    }
  }
  lock(referenceElement) {
    if (this.lockCount === 0 || this.restore !== null) return
    const doc = ownerDocument(referenceElement)
    const html = doc.documentElement
    const body = doc.body
    const win = getWindow(html)
    if (isPageScrollLocked(win, html, body)) {
      const observer = new win.MutationObserver(() => {
        if (isPageScrollLocked(win, html, body)) return
        observer.disconnect()
        this.restore = null
        this.lock(referenceElement)
      })
      const options = { attributes: true }
      observer.observe(html, options)
      observer.observe(body, options)
      this.restore = () => observer.disconnect()
      return
    }
    const hasOverlayScrollbars = ios || !hasInsetScrollbars(referenceElement)
    this.restore = hasOverlayScrollbars
      ? preventScrollOverlayScrollbars(referenceElement)
      : preventScrollInsetScrollbars(referenceElement)
  }
}
const SCROLL_LOCKER = new ScrollLocker()
/**
 * Locks the scroll of the document when enabled.
 *
 * @param enabled - Whether to enable the scroll lock.
 * @param referenceElement - Element to use as a reference for lock calculations.
 */
function useScrollLock(enabled = true, referenceElement = null) {
  useIsoLayoutEffect(() => {
    if (!enabled) return
    return SCROLL_LOCKER.acquire(referenceElement)
  }, [enabled, referenceElement])
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/dialog/root/useDialogRoot.mjs
function DialogInteractions({ store, parentContext, isDrawer }) {
  const open = store.useState("open")
  const disablePointerDismissal = store.useState("disablePointerDismissal")
  const modal = store.useState("modal")
  const popupElement = store.useState("popupElement")
  const floatingRootContext = store.useState("floatingRootContext")
  const [ownNestedOpenDialogs, setOwnNestedOpenDialogs] = import_react.useState(0)
  const [ownNestedOpenDrawers, setOwnNestedOpenDrawers] = import_react.useState(0)
  const isTopmost = ownNestedOpenDialogs === 0
  const dismiss = useDismiss(floatingRootContext, {
    outsidePressEvent() {
      if (store.context.internalBackdropRef.current || store.context.backdropRef.current)
        return "intentional"
      return {
        mouse: modal === "trap-focus" ? "sloppy" : "intentional",
        touch: "sloppy",
      }
    },
    outsidePress(event) {
      if (!store.context.outsidePressEnabledRef.current) return false
      if ("button" in event && event.button !== 0) return false
      if ("touches" in event) {
        if (event.type === "touchend") {
          if (event.changedTouches.length !== 1 || event.touches.length > 0) return false
        } else if (event.touches.length !== 1) return false
      }
      const target = getTarget(event)
      if (isTopmost && !disablePointerDismissal) {
        if (modal) {
          const internalBackdrop = store.context.internalBackdropRef.current
          const backdrop = store.context.backdropRef.current
          return internalBackdrop || backdrop
            ? internalBackdrop === target ||
                backdrop === target ||
                (contains(target, popupElement) && !target?.hasAttribute("data-base-ui-portal"))
            : true
        }
        return true
      }
      return false
    },
    escapeKey: isTopmost,
  })
  useScrollLock(open && modal === true, popupElement)
  store.useContextCallback("onNestedDialogOpen", (dialogCount, drawerCount) => {
    setOwnNestedOpenDialogs(dialogCount)
    setOwnNestedOpenDrawers(drawerCount)
  })
  useIsoLayoutEffect(() => {
    if (parentContext?.onNestedDialogOpen) {
      if (open)
        parentContext.onNestedDialogOpen(
          ownNestedOpenDialogs + 1,
          ownNestedOpenDrawers + (isDrawer ? 1 : 0),
        )
      else parentContext.onNestedDialogOpen(0, 0)
    }
    return () => {
      if (parentContext?.onNestedDialogOpen && open) parentContext.onNestedDialogOpen(0, 0)
    }
  }, [isDrawer, open, ownNestedOpenDialogs, ownNestedOpenDrawers, parentContext])
  usePopupInteractionProps(store, {
    activeTriggerProps: dismiss.reference,
    inactiveTriggerProps: dismiss.trigger,
    popupProps: dismiss.floating,
    nestedOpenDialogCount: ownNestedOpenDialogs,
    nestedOpenDrawerCount: ownNestedOpenDrawers,
  })
  return null
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/dialog/store/DialogStore.mjs
const selectors$1 = {
  ...popupStoreSelectors,
  modal: (state) => state.modal,
  nested: (state) => state.nested,
  nestedOpenDialogCount: (state) => state.nestedOpenDialogCount,
  nestedOpenDrawerCount: (state) => state.nestedOpenDrawerCount,
  disablePointerDismissal: (state) => state.disablePointerDismissal,
  openMethod: (state) => state.openMethod,
  descriptionElementId: (state) => state.descriptionElementId,
  titleElementId: (state) => state.titleElementId,
  viewportElement: (state) => state.viewportElement,
  role: (state) => state.role,
}
/**
 * The subset of `DialogStore` that detached handle-backed triggers rely on. Both the real
 * `DialogStore` and the inert fallback store satisfy it, so a trigger can read from whichever
 * store the handle currently exposes.
 */
const DialogStore = class extends ReactStore {
  constructor(initialState, floatingId, nested) {
    const triggerElements = new PopupTriggerMap()
    const state = createInitialState$1(initialState, triggerElements, floatingId, nested)
    super(state, createInitialContext$1(triggerElements), selectors$1)
  }
  setOpen = (nextOpen, eventDetails) => {
    eventDetails.preventUnmountOnClose = () => {
      this.set("preventUnmountingOnClose", true)
    }
    if (!nextOpen && eventDetails.trigger == null && this.state.activeTriggerId != null)
      eventDetails.trigger = this.state.activeTriggerElement ?? void 0
    this.context.onOpenChange?.(nextOpen, eventDetails)
    if (eventDetails.isCanceled) return
    this.state.floatingRootContext.dispatchOpenChange(nextOpen, eventDetails)
    const updatedState = { open: nextOpen }
    setPopupOpenState(updatedState, nextOpen, eventDetails.trigger)
    this.update(updatedState)
  }
}
function createInitialState$1(initialState, triggerElements, floatingId, nested = false) {
  const state = {
    ...createInitialPopupStoreState(),
    modal: true,
    disablePointerDismissal: false,
    viewportElement: null,
    descriptionElementId: void 0,
    titleElementId: void 0,
    openMethod: null,
    nested: false,
    nestedOpenDialogCount: 0,
    nestedOpenDrawerCount: 0,
    role: "dialog",
    ...initialState,
  }
  state.floatingRootContext = createPopupFloatingRootContext(triggerElements, floatingId, nested)
  return state
}
function createInitialContext$1(triggerElements) {
  return {
    popupRef: /*#__PURE__*/ import_react.createRef(),
    backdropRef: /*#__PURE__*/ import_react.createRef(),
    internalBackdropRef: /*#__PURE__*/ import_react.createRef(),
    outsidePressEnabledRef: { current: true },
    triggerElements,
    onOpenChange: void 0,
    onOpenChangeComplete: void 0,
  }
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/dialog/root/useRenderDialogRoot.mjs
function useRenderDialogRoot(mode, props) {
  const {
    children,
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    onOpenChangeComplete,
    disablePointerDismissal: disablePointerDismissalProp = false,
    modal: modalProp = true,
    actionsRef,
    handle,
    triggerId: triggerIdProp,
    defaultTriggerId: defaultTriggerIdProp = null,
  } = props
  const isDrawer = mode === "drawer"
  const isAlertDialog = mode === "alert-dialog"
  const modal = isAlertDialog ? true : modalProp
  const disablePointerDismissal = isAlertDialog || disablePointerDismissalProp
  const role = isAlertDialog ? "alertdialog" : "dialog"
  const parentStore = useDialogRootContext(true)
  const rootState = {
    modal,
    disablePointerDismissal,
    nested: parentStore != null,
    role,
  }
  const store = usePopupRootStore(
    (floatingId, floatingNested) =>
      new DialogStore(
        {
          open: defaultOpen,
          openProp,
          activeTriggerId: defaultTriggerIdProp,
          triggerIdProp,
          ...rootState,
        },
        floatingId,
        floatingNested,
      ),
    true,
  )
  store.useControlledProp("openProp", openProp)
  store.useControlledProp("triggerIdProp", triggerIdProp)
  store.useSyncedValues(rootState)
  store.useContextCallback("onOpenChange", onOpenChange)
  store.useContextCallback("onOpenChangeComplete", onOpenChangeComplete)
  const open = store.useState("open")
  const mounted = store.useState("mounted")
  const payload = store.useState("payload")
  usePopupRootSync(store, open)
  useImplicitActiveTrigger(store)
  const { forceUnmount } = useOpenStateTransitions(open, store)
  import_react.useImperativeHandle(
    actionsRef,
    () => ({
      unmount: forceUnmount,
      close: () => store.setOpen(false, createChangeEventDetails(imperativeAction)),
    }),
    [forceUnmount, store],
  )
  const shouldRenderInteractions = open || mounted
  return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(DialogRootContext.Provider, {
    value: store,
    children: [
      handle &&
        /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PopupHandleAttachment, {
          handle,
          store,
        }),
      shouldRenderInteractions &&
        /*#__PURE__*/ (0, import_jsx_runtime.jsx)(DialogInteractions, {
          store,
          parentContext: parentStore?.context,
          isDrawer,
        }),
      typeof children === "function" ? children({ payload }) : children,
    ],
  })
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/drawer/root/DrawerRoot.mjs
let _DrawerProviderReport
let _DrawerProviderReport2
/**
 * Groups all parts of the drawer.
 * Doesn't render its own HTML element.
 *
 * Documentation: [Base UI Drawer](https://base-ui.com/react/components/drawer)
 */
function DrawerRoot(props) {
  const {
    children,
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    onOpenChangeComplete,
    disablePointerDismissal = false,
    modal = true,
    actionsRef,
    handle,
    triggerId: triggerIdProp,
    defaultTriggerId: defaultTriggerIdProp = null,
    swipeDirection = "down",
    snapToSequentialPoints = false,
    snapPoints,
    snapPoint: snapPointProp,
    defaultSnapPoint,
    onSnapPointChange,
  } = props
  const parentDrawerRootContext = useDrawerRootContext(true)
  const notifyParentSwipeProgressChange = parentDrawerRootContext?.onNestedSwipeProgressChange
  const notifyParentFrontmostHeight = parentDrawerRootContext?.onNestedFrontmostHeightChange
  const notifyParentSwipingChange = parentDrawerRootContext?.onNestedSwipingChange
  const notifyParentHasNestedDrawer = parentDrawerRootContext?.onNestedDrawerPresenceChange
  const [popupHeight, setPopupHeight] = import_react.useState(0)
  const [frontmostHeight, setFrontmostHeight] = import_react.useState(0)
  const [hasNestedDrawer, setHasNestedDrawer] = import_react.useState(false)
  const [nestedSwiping, setNestedSwiping] = import_react.useState(false)
  const [nestedSwipeProgressStore] = import_react.useState(createNestedSwipeProgressStore)
  const resolvedDefaultSnapPoint =
    defaultSnapPoint !== void 0 ? defaultSnapPoint : (snapPoints?.[0] ?? null)
  const isSnapPointControlled = snapPointProp !== void 0
  const [activeSnapPoint, setActiveSnapPointUnwrapped] = useControlled({
    controlled: snapPointProp,
    default: resolvedDefaultSnapPoint,
    name: "Drawer",
    state: "snapPoint",
  })
  const isNestedDrawerOpenRef = import_react.useRef(false)
  const swipeAreaActiveRef = import_react.useRef(false)
  const setActiveSnapPoint = useStableCallback((nextSnapPoint, eventDetails) => {
    const resolvedEventDetails = eventDetails ?? createChangeEventDetails("none")
    onSnapPointChange?.(nextSnapPoint, resolvedEventDetails)
    if (resolvedEventDetails.isCanceled) return
    setActiveSnapPointUnwrapped(nextSnapPoint)
  })
  const resolvedActiveSnapPoint = import_react.useMemo(() => {
    if (isSnapPointControlled) return activeSnapPoint
    if (!snapPoints || snapPoints.length === 0) return activeSnapPoint
    if (
      activeSnapPoint === null ||
      !snapPoints.some((snapPoint) => Object.is(snapPoint, activeSnapPoint))
    )
      return resolvedDefaultSnapPoint
    return activeSnapPoint
  }, [activeSnapPoint, isSnapPointControlled, resolvedDefaultSnapPoint, snapPoints])
  const onPopupHeightChange = useStableCallback((height) => {
    setPopupHeight(height)
    if (!isNestedDrawerOpenRef.current && height > 0) setFrontmostHeight(height)
  })
  const onNestedFrontmostHeightChange = useStableCallback((height) => {
    if (height > 0) {
      isNestedDrawerOpenRef.current = true
      setFrontmostHeight(height)
      return
    }
    isNestedDrawerOpenRef.current = false
    if (popupHeight > 0) setFrontmostHeight(popupHeight)
  })
  const onNestedDrawerPresenceChange = useStableCallback((present) => {
    setHasNestedDrawer(present)
  })
  const onNestedSwipeProgressChange = useStableCallback((progress) => {
    nestedSwipeProgressStore.set(progress)
    notifyParentSwipeProgressChange?.(progress)
  })
  const onNestedSwipingChange = useStableCallback((swiping) => {
    setNestedSwiping(swiping)
    notifyParentSwipingChange?.(swiping)
  })
  const handleOpenChange = useStableCallback((nextOpen, eventDetails) => {
    onOpenChange?.(nextOpen, eventDetails)
    if (eventDetails.isCanceled) return
    if (!nextOpen && snapPoints && snapPoints.length > 0)
      setActiveSnapPoint(
        resolvedDefaultSnapPoint,
        createChangeEventDetails(eventDetails.reason, eventDetails.event, eventDetails.trigger),
      )
  })
  const contextValue = import_react.useMemo(
    () => ({
      swipeDirection,
      swipeAreaActiveRef,
      snapToSequentialPoints,
      snapPoints,
      activeSnapPoint: resolvedActiveSnapPoint,
      setActiveSnapPoint,
      frontmostHeight,
      popupHeight,
      hasNestedDrawer,
      nestedSwiping,
      nestedSwipeProgressStore,
      onNestedDrawerPresenceChange,
      onPopupHeightChange,
      onNestedFrontmostHeightChange,
      onNestedSwipingChange,
      onNestedSwipeProgressChange,
      notifyParentFrontmostHeight,
      notifyParentSwipingChange,
      notifyParentSwipeProgressChange,
      notifyParentHasNestedDrawer,
    }),
    [
      resolvedActiveSnapPoint,
      frontmostHeight,
      hasNestedDrawer,
      nestedSwiping,
      nestedSwipeProgressStore,
      notifyParentHasNestedDrawer,
      notifyParentSwipeProgressChange,
      notifyParentSwipingChange,
      notifyParentFrontmostHeight,
      onNestedDrawerPresenceChange,
      onNestedFrontmostHeightChange,
      onNestedSwipeProgressChange,
      onNestedSwipingChange,
      onPopupHeightChange,
      popupHeight,
      setActiveSnapPoint,
      snapPoints,
      snapToSequentialPoints,
      swipeAreaActiveRef,
      swipeDirection,
    ],
  )
  const dialog = useRenderDialogRoot("drawer", {
    open: openProp,
    defaultOpen,
    onOpenChange: handleOpenChange,
    onOpenChangeComplete,
    disablePointerDismissal,
    modal,
    actionsRef,
    handle,
    triggerId: triggerIdProp,
    defaultTriggerId: defaultTriggerIdProp,
    children:
      typeof children === "function"
        ? (payload) =>
            /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_react.Fragment, {
              children: [
                _DrawerProviderReport ||
                  (_DrawerProviderReport = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(
                    DrawerProviderReporter,
                    {},
                  )),
                children(payload),
              ],
            })
        : /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_react.Fragment, {
            children: [
              _DrawerProviderReport2 ||
                (_DrawerProviderReport2 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(
                  DrawerProviderReporter,
                  {},
                )),
              children,
            ],
          }),
  })
  return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(DrawerRootContext.Provider, {
    value: contextValue,
    children: dialog,
  })
}
function createNestedSwipeProgressStore() {
  let progress = 0
  const listeners = /* @__PURE__ */ new Set()
  return {
    getSnapshot: () => progress,
    set(nextProgress) {
      const resolved = Number.isFinite(nextProgress) ? nextProgress : 0
      if (resolved === progress) return
      progress = resolved
      listeners.forEach((listener) => {
        listener()
      })
    },
    subscribe(listener) {
      listeners.add(listener)
      return () => {
        listeners.delete(listener)
      }
    },
  }
}
function DrawerProviderReporter() {
  const providerContext = useDrawerProviderContext()
  const store = useDialogRootContext(false)
  const setDrawerOpen = providerContext?.setDrawerOpen
  const removeDrawer = providerContext?.removeDrawer
  const open = store.useState("open")
  const nestedOpenDialogCount = store.useState("nestedOpenDialogCount")
  const popupElement = store.useState("popupElement")
  const isTopmost = nestedOpenDialogCount === 0
  useIsoLayoutEffect(() => {
    if (!removeDrawer) return
    return () => {
      removeDrawer(store)
    }
  }, [removeDrawer, store])
  useIsoLayoutEffect(() => {
    setDrawerOpen?.(store, open)
  }, [open, setDrawerOpen, store])
  import_react.useEffect(() => {
    if (!open || !isTopmost || !android) return
    const CloseWatcherCtor = getWindow(popupElement).CloseWatcher
    if (!CloseWatcherCtor) return
    function handleCloseWatcher(event) {
      if (!store.select("open")) return
      store.setOpen(false, createChangeEventDetails(closeWatcher, event))
    }
    const closeWatcher$1 = new CloseWatcherCtor()
    const unsubscribe = addEventListener(closeWatcher$1, "close", handleCloseWatcher)
    return () => {
      unsubscribe()
      closeWatcher$1.destroy()
    }
  }, [store, isTopmost, open, popupElement])
  return null
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/dialog/title/DialogTitle.mjs
/**
 * A heading that labels the dialog.
 * Renders an `<h2>` element.
 *
 * Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
 */
const DialogTitle = /*#__PURE__*/ import_react.forwardRef(
  function DialogTitle(componentProps, forwardedRef) {
    const { render, className, style, id: idProp, ...elementProps } = componentProps
    const store = useDialogRootContext()
    const id = useBaseUiId(idProp)
    store.useSyncedValueWithCleanup("titleElementId", id)
    return useRenderElement("h2", componentProps, {
      ref: forwardedRef,
      props: [{ id }, elementProps],
    })
  },
)
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/drawer/title/DrawerTitle.mjs
/**
 * A heading that labels the drawer.
 * Renders an `<h2>` element.
 *
 * Documentation: [Base UI Drawer](https://base-ui.com/react/components/drawer)
 */
const DrawerTitle$1 = DialogTitle
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.2_@types_46200efdf1f5c806fc19b01530afd9e7/node_modules/@base-ui/utils/useEnhancedClickHandler.mjs
/**
 * Provides a cross-browser way to determine the type of the pointer used to click.
 * Safari and Firefox do not provide the PointerEvent to the click handler (they use MouseEvent) yet.
 * Additionally, this implementation detects if the click was triggered by the keyboard.
 *
 * @param handler The function to be called when the button is clicked. The first parameter is the original event and the second parameter is the pointer type.
 */
function useEnhancedClickHandler(handler) {
  const lastClickInteractionTypeRef = import_react.useRef("")
  const handlePointerDown = import_react.useCallback(
    (event) => {
      if (event.defaultPrevented) return
      lastClickInteractionTypeRef.current = event.pointerType
      handler(event, event.pointerType)
    },
    [handler],
  )
  return {
    onClick: import_react.useCallback(
      (event) => {
        if (event.detail === 0) {
          handler(event, "keyboard")
          return
        }
        if ("pointerType" in event) handler(event, event.pointerType)
        else handler(event, lastClickInteractionTypeRef.current)
        lastClickInteractionTypeRef.current = ""
      },
      [handler],
    ),
    onPointerDown: handlePointerDown,
  }
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/internals/useValueChanged.mjs
function useValueChanged(value, onChange) {
  const valueRef = import_react.useRef(value)
  const onChangeCallback = useStableCallback(onChange)
  useIsoLayoutEffect(() => {
    if (valueRef.current !== value) onChangeCallback(valueRef.current)
    valueRef.current = value
  }, [value, onChangeCallback])
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/utils/useOpenInteractionType.mjs
function useOpenMethodTriggerProps(open, setOpenMethod) {
  const { onClick, onPointerDown } = useEnhancedClickHandler(
    useStableCallback((_, interactionType) => {
      if (!(typeof open === "function" ? open() : open))
        setOpenMethod(interactionType || (ios ? "touch" : ""))
    }),
  )
  return import_react.useMemo(
    () => ({
      onClick,
      onPointerDown,
    }),
    [onClick, onPointerDown],
  )
}
/**
 * Determines the interaction type (keyboard, mouse, touch, etc.) that opened the component.
 *
 * @param open The open state of the component.
 */
function useOpenInteractionType(open) {
  const [openMethod, setOpenMethod] = import_react.useState(null)
  const triggerProps = useOpenMethodTriggerProps(open, setOpenMethod)
  useValueChanged(open, (previousOpen) => {
    if (previousOpen && !open) setOpenMethod(null)
  })
  return import_react.useMemo(
    () => ({
      openMethod,
      triggerProps,
    }),
    [openMethod, triggerProps],
  )
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/dialog/utils/stateAttributesMapping.mjs
/**
 * Shared by `Dialog.Popup` and `Dialog.Viewport`, whose states have the same shape.
 * `nested` is not mapped: unmapped `true` booleans already render as `data-nested`.
 */
const dialogStateAttributesMapping = {
  ...popupStateMapping,
  ...transitionStatusMapping,
  nestedDialogOpen(value) {
    return value ? { "data-nested-dialog-open": "" } : null
  },
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/dialog/viewport/DialogViewport.mjs
/**
 * A positioning container for the dialog popup that can be made scrollable.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
 */
const DialogViewport = /*#__PURE__*/ import_react.forwardRef(
  function DialogViewport(componentProps, forwardedRef) {
    const { render, className, style, children, ...elementProps } = componentProps
    const keepMounted = useDialogPortalContext()
    const store = useDialogRootContext()
    const open = store.useState("open")
    const nested = store.useState("nested")
    const transitionStatus = store.useState("transitionStatus")
    const nestedOpenDialogCount = store.useState("nestedOpenDialogCount")
    const mounted = store.useState("mounted")
    const setViewportElement = store.useStateSetter("viewportElement")
    return useRenderElement("div", componentProps, {
      enabled: keepMounted || mounted,
      state: {
        open,
        nested,
        transitionStatus,
        nestedDialogOpen: nestedOpenDialogCount > 0,
      },
      ref: [forwardedRef, setViewportElement],
      stateAttributesMapping: dialogStateAttributesMapping,
      props: [
        {
          role: "presentation",
          hidden: !mounted,
          style: { pointerEvents: !open ? "none" : void 0 },
          children,
        },
        elementProps,
      ],
    })
  },
)
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/drawer/virtual-keyboard-provider/DrawerVirtualKeyboardContext.mjs
const DrawerVirtualKeyboardContext = /*#__PURE__*/ import_react.createContext(void 0)
function useDrawerVirtualKeyboardContext() {
  return import_react.useContext(DrawerVirtualKeyboardContext)
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/drawer/viewport/DrawerViewport.mjs
const MIN_SWIPE_THRESHOLD = 10
const FAST_SWIPE_VELOCITY = 0.5
const SNAP_VELOCITY_THRESHOLD = 0.5
const SNAP_VELOCITY_MULTIPLIER = 300
const MAX_SNAP_VELOCITY = 4
const MIN_SWIPE_RELEASE_VELOCITY = 0.2
const MAX_SWIPE_RELEASE_VELOCITY = 4
const MIN_SWIPE_RELEASE_DURATION_MS = 80
const MAX_SWIPE_RELEASE_DURATION_MS = 360
const MIN_SWIPE_RELEASE_SCALAR = 0.1
const AXIS_LOCK_SLOP = 6
const AXIS_LOCK_BIAS = 2
const DRAWER_CONTENT_SELECTOR = `[${DRAWER_CONTENT_ATTRIBUTE}]`
/**
 * A positioning container for the drawer popup that can be made scrollable.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Drawer](https://base-ui.com/react/components/drawer)
 */
const DrawerViewport = /*#__PURE__*/ import_react.forwardRef(
  function DrawerViewport(props, forwardedRef) {
    const { render, className, style, children, ...elementProps } = props
    const store = useDialogRootContext()
    const popupRef = store.context.popupRef
    const backdropRef = store.context.backdropRef
    const {
      swipeDirection,
      notifyParentSwipingChange,
      notifyParentSwipeProgressChange,
      frontmostHeight,
      snapToSequentialPoints,
      swipeAreaActiveRef,
    } = useDrawerRootContext()
    const providerContext = useDrawerProviderContext()
    const {
      snapPoints,
      resolvedSnapPoints,
      activeSnapPoint,
      activeSnapPointOffset,
      setActiveSnapPoint,
      popupHeight,
    } = useDrawerSnapPoints()
    const open = store.useState("open")
    const mounted = store.useState("mounted")
    const nested = store.useState("nested")
    const nestedOpenDrawerCount = store.useState("nestedOpenDrawerCount")
    const viewportElement = store.useState("viewportElement")
    const popupElementState = store.useState("popupElement")
    const visualStateStore = providerContext?.visualStateStore
    const nestedDrawerOpen = nestedOpenDrawerCount > 0
    const scrollAxis =
      swipeDirection === "left" || swipeDirection === "right" ? "horizontal" : "vertical"
    const isVerticalScrollAxis = scrollAxis === "vertical"
    const crossScrollAxis = isVerticalScrollAxis ? "horizontal" : "vertical"
    const [swipeRelease, setSwipeRelease] = import_react.useState(null)
    const pendingSwipeCloseSnapPointRef = import_react.useRef(void 0)
    const resetSwipeRef = import_react.useRef(null)
    const controlledDismissFrame = useAnimationFrame()
    const swipingRef = import_react.useRef(false)
    const nestedSwipeActiveRef = import_react.useRef(false)
    const lastPointerTypeRef = import_react.useRef("")
    const ignoreNextTouchStartFromPenRef = import_react.useRef(false)
    const ignoreTouchSwipeRef = import_react.useRef(false)
    const touchScrollStateRef = import_react.useRef(null)
    const virtualKeyboard = useDrawerVirtualKeyboardContext()
    const snapPointRange = import_react.useMemo(() => {
      if (
        !snapPoints ||
        snapPoints.length < 2 ||
        resolvedSnapPoints.length < 2 ||
        (swipeDirection !== "down" && swipeDirection !== "up")
      )
        return null
      const offsets = resolvedSnapPoints.map((point) => point.offset).sort((a, b) => a - b)
      const minOffset = offsets[0]
      return {
        minOffset,
        range: offsets[1] - minOffset,
      }
    }, [resolvedSnapPoints, snapPoints, swipeDirection])
    const snapPointProgress = import_react.useMemo(() => {
      if (!snapPointRange || activeSnapPointOffset === null) return null
      return clamp((activeSnapPointOffset - snapPointRange.minOffset) / snapPointRange.range, 0, 1)
    }, [activeSnapPointOffset, snapPointRange])
    const swipeDirections = import_react.useMemo(() => {
      if (
        snapPoints &&
        snapPoints.length > 0 &&
        (swipeDirection === "down" || swipeDirection === "up")
      )
        return swipeDirection === "down" ? ["down", "up"] : ["up", "down"]
      return [swipeDirection]
    }, [snapPoints, swipeDirection])
    const setSwipeDismissed = useStableCallback((dismissed) => {
      popupRef.current?.toggleAttribute(DrawerPopupDataAttributes.swipeDismiss, dismissed)
      backdropRef.current?.toggleAttribute(DrawerPopupDataAttributes.swipeDismiss, dismissed)
    })
    const clearSwipeRelease = useStableCallback(() => {
      setSwipeDismissed(false)
      popupRef.current?.removeAttribute(TransitionStatusDataAttributes.endingStyle)
      setSwipeRelease(null)
    })
    const finishNestedSwipe = useStableCallback(() => {
      if (!nestedSwipeActiveRef.current) return
      nestedSwipeActiveRef.current = false
      notifyParentSwipingChange?.(false)
    })
    const applySwipeProgress = useStableCallback(
      (resolvedProgress, shouldTrackProgress, notifyParent) => {
        const isActive = open && !nested && shouldTrackProgress
        const swipeProgress = isActive ? resolvedProgress : 0
        const nestedSwipeProgress = open && shouldTrackProgress ? resolvedProgress : 0
        if (notifyParent && notifyParentSwipeProgressChange) {
          notifyParentSwipeProgressChange(nestedSwipeProgress)
          if (nestedSwipeProgress <= 0) finishNestedSwipe()
        }
        visualStateStore?.set({
          swipeProgress,
          frontmostHeight: swipeProgress > 0 ? frontmostHeight : 0,
        })
        const backdropElement = backdropRef.current
        if (!backdropElement) return
        const showProgress = isActive && swipeProgress > 0
        backdropElement.style.setProperty(
          DrawerBackdropCssVars.swipeProgress,
          showProgress ? `${swipeProgress}` : "0",
        )
        if (showProgress && frontmostHeight > 0)
          backdropElement.style.setProperty(DrawerPopupCssVars.height, `${frontmostHeight}px`)
        else backdropElement.style.removeProperty(DrawerPopupCssVars.height)
      },
    )
    function resolveSwipeRelease(
      popupElement,
      direction,
      deltaX,
      deltaY,
      velocityX,
      velocityY,
      releaseVelocityX,
      releaseVelocityY,
    ) {
      const size = getBaseSwipeSize(popupElement, direction)
      if (size <= 0) return null
      const translationAlongDirection =
        ((direction === "down" || direction === "up") && snapPoints && snapPoints.length > 0
          ? (activeSnapPointOffset ?? 0)
          : 0) + getDisplacement(direction, deltaX, deltaY)
      const remainingDistance = Math.max(0, size - translationAlongDirection)
      if (remainingDistance <= 0) return null
      const releaseVelocity = getDisplacement(direction, releaseVelocityX, releaseVelocityY)
      const directionalVelocity =
        Math.abs(releaseVelocity) > 0
          ? releaseVelocity
          : getDisplacement(direction, velocityX, velocityY)
      if (directionalVelocity <= MIN_SWIPE_RELEASE_VELOCITY) return null
      return (
        MIN_SWIPE_RELEASE_SCALAR +
        ((clamp(
          remainingDistance /
            clamp(directionalVelocity, MIN_SWIPE_RELEASE_VELOCITY, MAX_SWIPE_RELEASE_VELOCITY),
          MIN_SWIPE_RELEASE_DURATION_MS,
          MAX_SWIPE_RELEASE_DURATION_MS,
        ) -
          MIN_SWIPE_RELEASE_DURATION_MS) /
          280) *
          0.9
      )
    }
    function updateNestedSwipeActive(details) {
      if (nestedSwipeActiveRef.current || !details) return
      const delta = getDisplacement(
        details.direction ?? swipeDirection,
        details.deltaX,
        details.deltaY,
      )
      if (Math.abs(delta) < MIN_SWIPE_THRESHOLD) return
      nestedSwipeActiveRef.current = true
      notifyParentSwipingChange?.(true)
    }
    const swipe$1 = useSwipeDismiss({
      enabled: mounted && !nestedDrawerOpen,
      directions: swipeDirections,
      elementRef: store.context.popupRef,
      ignoreSelectorWhenTouch: false,
      ignoreScrollableAncestors: true,
      movementCssVars: {
        x: DrawerPopupCssVars.swipeMovementX,
        y: DrawerPopupCssVars.swipeMovementY,
      },
      onSwipeStart(event) {
        if ("touches" in event || event.pointerType === "touch") return
        const popupElement = popupRef.current
        const selection = ownerDocument(popupElement).getSelection?.()
        if (!selection || selection.isCollapsed) return
        const anchorElement = isElement(selection.anchorNode)
          ? selection.anchorNode
          : selection.anchorNode?.parentElement
        const focusElement = isElement(selection.focusNode)
          ? selection.focusNode
          : selection.focusNode?.parentElement
        if (!contains(popupElement, anchorElement) && !contains(popupElement, focusElement)) return
        selection.removeAllRanges()
      },
      onSwipingChange(swiping) {
        swipingRef.current = swiping
        setBackdropSwipingAttribute(store.context.backdropRef.current, swiping)
        if (!swiping && !notifyParentSwipeProgressChange) finishNestedSwipe()
      },
      swipeThreshold({ element, direction }) {
        return getBaseSwipeThreshold(element, direction)
      },
      canStart(position, details) {
        const popupElement = store.context.popupRef.current
        if (!popupElement) return false
        const doc = popupElement.ownerDocument
        const elementAtPoint = getElementAtPoint(popupElement.getRootNode(), position.x, position.y)
        if (!elementAtPoint || !contains(popupElement, elementAtPoint)) return false
        const nativeEvent = details.nativeEvent
        if (
          ("touches" in nativeEvent || nativeEvent.pointerType === "touch") &&
          shouldIgnoreSwipeForTextSelection(doc, popupElement)
        )
          return false
        return true
      },
      onProgress(progress, details) {
        updateNestedSwipeActive(details)
        const hasSnapPoints = Boolean(snapPoints && snapPoints.length > 0)
        if (swipingRef.current && swipeDirection === "down" && hasSnapPoints && details) {
          const popupElement = store.context.popupRef.current
          if (popupElement) {
            popupElement.style.removeProperty("transform")
            popupElement.style.setProperty(
              DrawerPopupCssVars.swipeMovementY,
              `${getSnapPointSwipeMovement(activeSnapPointOffset ?? 0, details.deltaY)}px`,
            )
          }
        }
        let resolvedProgress = progress
        if (snapPointRange && popupHeight > 0) {
          const baseOffset = activeSnapPointOffset ?? snapPointRange.minOffset
          const offsetToProgress = (nextOffset) =>
            clamp((nextOffset - snapPointRange.minOffset) / snapPointRange.range, 0, 1)
          if (details && Number.isFinite(details.deltaY))
            resolvedProgress = offsetToProgress(clamp(baseOffset + details.deltaY, 0, popupHeight))
          else if (snapPointProgress !== null) resolvedProgress = snapPointProgress
        }
        applySwipeProgress(resolvedProgress, true, true)
      },
      onRelease({
        event,
        deltaX,
        deltaY,
        direction,
        velocityX,
        velocityY,
        releaseVelocityX,
        releaseVelocityY,
      }) {
        const popupElement = store.context.popupRef.current
        if (!popupElement) {
          clearSwipeRelease()
          return
        }
        const releasePopupElement = popupElement
        function startSwipeRelease(resolvedDirection) {
          finishNestedSwipe()
          setSwipeDismissed(true)
          releasePopupElement.style.removeProperty("transition")
          releasePopupElement.setAttribute(TransitionStatusDataAttributes.endingStyle, "")
          import_react_dom.flushSync(() => {
            setSwipeRelease(
              resolveSwipeRelease(
                releasePopupElement,
                resolvedDirection,
                deltaX,
                deltaY,
                velocityX,
                velocityY,
                releaseVelocityX,
                releaseVelocityY,
              ),
            )
          })
        }
        if (!snapPoints || snapPoints.length === 0) {
          if (!direction) {
            clearSwipeRelease()
            return
          }
          const directionalDelta = getDisplacement(direction, deltaX, deltaY)
          if (directionalDelta <= 0) {
            clearSwipeRelease()
            return false
          }
          if (getDisplacement(direction, velocityX, velocityY) >= FAST_SWIPE_VELOCITY) {
            startSwipeRelease(direction)
            return true
          }
          const shouldClose =
            directionalDelta > getBaseSwipeThreshold(releasePopupElement, direction)
          if (shouldClose) startSwipeRelease(direction)
          else clearSwipeRelease()
          return shouldClose
        }
        if (swipeDirection !== "down" && swipeDirection !== "up") {
          clearSwipeRelease()
          return
        }
        if (!popupHeight) {
          clearSwipeRelease()
          return false
        }
        if (resolvedSnapPoints.length === 0) {
          clearSwipeRelease()
          return
        }
        const dragDelta = swipeDirection === "down" ? deltaY : -deltaY
        const dragDirection = Math.sign(dragDelta)
        const releaseDirectionalVelocity =
          swipeDirection === "down" ? releaseVelocityY : -releaseVelocityY
        const fallbackDirectionalVelocity = swipeDirection === "down" ? velocityY : -velocityY
        let resolvedDirectionalVelocity = releaseDirectionalVelocity
        if (dragDirection !== 0 && Math.abs(dragDelta) >= MIN_SWIPE_THRESHOLD) {
          const velocityDirection = Math.sign(resolvedDirectionalVelocity)
          if (velocityDirection !== 0 && velocityDirection !== dragDirection)
            resolvedDirectionalVelocity = fallbackDirectionalVelocity
        }
        const currentOffset = activeSnapPointOffset ?? 0
        const dragTargetOffset = clamp(currentOffset + dragDelta, 0, popupHeight)
        const velocityOffset =
          Math.abs(resolvedDirectionalVelocity) >= SNAP_VELOCITY_THRESHOLD
            ? clamp(resolvedDirectionalVelocity, -4, MAX_SNAP_VELOCITY) * SNAP_VELOCITY_MULTIPLIER
            : 0
        const targetOffset = snapToSequentialPoints
          ? dragTargetOffset
          : clamp(dragTargetOffset + velocityOffset, 0, popupHeight)
        const snapPointEventDetails = createChangeEventDetails(swipe, event)
        const closeFromSnapPoints = () => {
          pendingSwipeCloseSnapPointRef.current = activeSnapPoint
          setActiveSnapPoint(null, snapPointEventDetails)
          startSwipeRelease(swipeDirection)
          return true
        }
        if (snapToSequentialPoints) {
          const orderedSnapPoints = [...resolvedSnapPoints].sort(
            (first, second) => first.offset - second.offset,
          )
          const orderedOffsets = orderedSnapPoints.map((point) => point.offset)
          const currentIndex = closestSnapPointIndex(orderedOffsets, currentOffset)
          let targetSnapPoint =
            orderedSnapPoints[closestSnapPointIndex(orderedOffsets, targetOffset)]
          const velocityDirection = Math.sign(resolvedDirectionalVelocity)
          const shouldAdvance =
            dragDirection !== 0 &&
            velocityDirection !== 0 &&
            velocityDirection === dragDirection &&
            Math.abs(resolvedDirectionalVelocity) >= SNAP_VELOCITY_THRESHOLD
          let effectiveTargetOffset = targetOffset
          if (shouldAdvance) {
            const adjacentIndex = clamp(
              currentIndex + dragDirection,
              0,
              orderedSnapPoints.length - 1,
            )
            if (adjacentIndex !== currentIndex) {
              const adjacentPoint = orderedSnapPoints[adjacentIndex]
              if (
                dragDirection > 0
                  ? targetOffset < adjacentPoint.offset
                  : targetOffset > adjacentPoint.offset
              ) {
                targetSnapPoint = adjacentPoint
                effectiveTargetOffset = adjacentPoint.offset
              }
            } else if (dragDirection > 0) return closeFromSnapPoints()
          }
          if (
            Math.abs(effectiveTargetOffset - popupHeight) <
            Math.abs(effectiveTargetOffset - targetSnapPoint.offset)
          )
            return closeFromSnapPoints()
          setActiveSnapPoint(targetSnapPoint.value, snapPointEventDetails)
          clearSwipeRelease()
          return false
        }
        if (resolvedDirectionalVelocity >= FAST_SWIPE_VELOCITY && dragDelta > 0)
          return closeFromSnapPoints()
        const closestSnapPoint =
          resolvedSnapPoints[
            closestSnapPointIndex(
              resolvedSnapPoints.map((point) => point.offset),
              targetOffset,
            )
          ]
        if (Math.abs(targetOffset - popupHeight) < Math.abs(targetOffset - closestSnapPoint.offset))
          return closeFromSnapPoints()
        setActiveSnapPoint(closestSnapPoint.value, snapPointEventDetails)
        clearSwipeRelease()
        return false
      },
      onDismiss(event) {
        visualStateStore?.set({
          swipeProgress: 0,
          frontmostHeight: 0,
        })
        const backdropElement = store.context.backdropRef.current
        if (backdropElement) {
          backdropElement.style.setProperty(DrawerBackdropCssVars.swipeProgress, "0")
          backdropElement.style.removeProperty(DrawerPopupCssVars.height)
        }
        const dismissEventDetails = createChangeEventDetails(swipe, event)
        store.setOpen(false, dismissEventDetails)
        if (dismissEventDetails.isCanceled) {
          const pendingSnapPoint = pendingSwipeCloseSnapPointRef.current
          if (pendingSnapPoint !== void 0)
            setActiveSnapPoint(pendingSnapPoint, createChangeEventDetails(swipe, event))
          pendingSwipeCloseSnapPointRef.current = void 0
          resetSwipeRef.current?.()
          clearSwipeRelease()
          return
        }
        if (store.select("open")) {
          const savedEvent = event
          controlledDismissFrame.request(() => {
            if (store.select("open")) {
              const pendingSnapPoint = pendingSwipeCloseSnapPointRef.current
              if (pendingSnapPoint !== void 0)
                setActiveSnapPoint(pendingSnapPoint, createChangeEventDetails(swipe, savedEvent))
              pendingSwipeCloseSnapPointRef.current = void 0
              clearSwipeRelease()
              resetSwipeRef.current?.()
            } else pendingSwipeCloseSnapPointRef.current = void 0
          })
          return
        }
        pendingSwipeCloseSnapPointRef.current = void 0
        setSwipeDismissed(true)
      },
    })
    const swipePointerProps = swipe$1.getPointerProps()
    const swipeTouchProps = swipe$1.getTouchProps()
    const { moveNative: moveSwipeNative, reset: resetSwipe } = swipe$1
    resetSwipeRef.current = resetSwipe
    import_react.useEffect(() => {
      const rootElement = viewportElement ?? popupElementState
      if (!rootElement) return
      const resolvedRootElement = rootElement
      const doc = ownerDocument(resolvedRootElement)
      function processTouchMove(event, touchState, touch) {
        const drawerAxisDelta = isVerticalScrollAxis
          ? touch.clientY - touchState.lastY
          : touch.clientX - touchState.lastX
        if (event.touches.length === 2) return
        if (
          shouldIgnoreSwipeForTextSelection(doc, resolvedRootElement) ||
          !open ||
          !mounted ||
          nestedDrawerOpen
        )
          return
        if (shouldYieldTouchMove(touchState, event, touch, isVerticalScrollAxis)) return
        const scrollTarget = touchState.scrollTarget
        if (!scrollTarget || scrollTarget === doc.documentElement || scrollTarget === doc.body) {
          if (event.cancelable) event.preventDefault()
          event.stopPropagation()
          moveSwipeNative(event, resolvedRootElement)
          return
        }
        if (!hasScrollableContentOnAxis(scrollTarget, scrollAxis)) {
          if (event.cancelable) event.preventDefault()
          event.stopPropagation()
          return
        }
        if (drawerAxisDelta !== 0) {
          const canSwipeFromScrollEdge = canSwipeFromScrollEdgeOnMove(
            scrollTarget,
            scrollAxis,
            swipeDirection,
            drawerAxisDelta,
          )
          if (!touchState.allowSwipe) {
            if (event.cancelable && canSwipeFromScrollEdge) {
              touchState.allowSwipe = true
              event.preventDefault()
            } else touchState.allowSwipe = false
          } else if (event.cancelable) event.preventDefault()
        }
        if (touchState.allowSwipe === true) {
          event.stopPropagation()
          moveSwipeNative(event, resolvedRootElement)
        }
      }
      function handleNativeTouchMove(event) {
        virtualKeyboard?.onTouchMove(event)
        if (ignoreTouchSwipeRef.current) return
        const touchState = touchScrollStateRef.current
        const touch = event.touches[0]
        if (!touch || !touchState) return
        processTouchMove(event, touchState, touch)
        updateTouchScrollPosition(touchState, touch)
      }
      return addEventListener(doc, "touchmove", handleNativeTouchMove, {
        passive: false,
        capture: true,
      })
    }, [
      mounted,
      nestedDrawerOpen,
      open,
      popupElementState,
      isVerticalScrollAxis,
      scrollAxis,
      swipeDirection,
      moveSwipeNative,
      viewportElement,
      virtualKeyboard,
    ])
    useIsoLayoutEffect(() => {
      if (!snapPointRange || swipe$1.swiping) return
      applySwipeProgress(!open || nested ? 0 : (snapPointProgress ?? 0), true, false)
    }, [
      applySwipeProgress,
      frontmostHeight,
      nested,
      notifyParentSwipeProgressChange,
      open,
      snapPointProgress,
      snapPointRange,
      swipe$1.swiping,
      store,
      visualStateStore,
    ])
    useIsoLayoutEffect(() => {
      if (!notifyParentSwipeProgressChange) return
      if (!open) notifyParentSwipeProgressChange(0)
      return () => {
        notifyParentSwipeProgressChange(0)
      }
    }, [notifyParentSwipeProgressChange, open])
    useIsoLayoutEffect(() => {
      if (open) {
        if (!swipeAreaActiveRef.current) resetSwipe()
        clearSwipeRelease()
      }
    }, [clearSwipeRelease, open, resetSwipe, swipeAreaActiveRef])
    useIsoLayoutEffect(() => {
      const backdropElement = backdropRef.current
      return () => {
        visualStateStore?.set({
          swipeProgress: 0,
          frontmostHeight: 0,
        })
        setBackdropSwipingAttribute(backdropElement, false)
        const currentBackdrop = backdropRef.current
        if (currentBackdrop !== backdropElement) setBackdropSwipingAttribute(currentBackdrop, false)
        finishNestedSwipe()
      }
    }, [backdropRef, finishNestedSwipe, visualStateStore])
    const swipeProviderValue = import_react.useMemo(
      () => ({
        swiping: swipe$1.swiping,
        getDragStyles: swipe$1.getDragStyles,
        swipeStrength: swipeRelease ?? null,
        setSwipeDismissed,
      }),
      [setSwipeDismissed, swipe$1.getDragStyles, swipe$1.swiping, swipeRelease],
    )
    function resetTouchSwipeState(ignoreSwipe) {
      ignoreTouchSwipeRef.current = ignoreSwipe
      touchScrollStateRef.current = null
    }
    function resetTouchTrackingState() {
      resetTouchSwipeState(false)
      lastPointerTypeRef.current = ""
      ignoreNextTouchStartFromPenRef.current = false
    }
    function handlePointerEnd(event) {
      lastPointerTypeRef.current = ""
      return event.pointerType !== "touch"
    }
    return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(DialogViewport, {
      ref: forwardedRef,
      className,
      style,
      render,
      ...mergeProps(elementProps, {
        "onPointerDown"(event) {
          lastPointerTypeRef.current = event.pointerType
          ignoreNextTouchStartFromPenRef.current = event.pointerType === "pen"
          if (!open || !mounted || nestedDrawerOpen) return
          const elementAtPoint = getElementAtPoint(
            event.currentTarget.getRootNode(),
            event.clientX,
            event.clientY,
          )
          if (isSwipeIgnoredTarget(elementAtPoint) || isDrawerContentTarget(elementAtPoint)) return
          if (event.pointerType === "touch") return
          swipePointerProps.onPointerDown?.(event)
        },
        "onPointerMove"(event) {
          if (event.pointerType === "touch") return
          swipePointerProps.onPointerMove?.(event)
        },
        "onPointerUp"(event) {
          if (handlePointerEnd(event)) swipePointerProps.onPointerUp?.(event)
        },
        "onPointerCancel"(event) {
          if (handlePointerEnd(event)) swipePointerProps.onPointerCancel?.(event)
        },
        "onTouchStart"(event) {
          if (lastPointerTypeRef.current === "pen" && ignoreNextTouchStartFromPenRef.current) {
            ignoreNextTouchStartFromPenRef.current = false
            resetTouchSwipeState(false)
            return
          }
          if (!open || !mounted || nestedDrawerOpen) {
            resetTouchSwipeState(false)
            return
          }
          const touch = event.touches[0]
          if (!touch) return
          if (isReactTouchEventOnRangeInput(event)) {
            resetTouchSwipeState(false)
            return
          }
          const rootElement = event.currentTarget
          const elementAtPoint = getElementAtPoint(
            rootElement.getRootNode(),
            touch.clientX,
            touch.clientY,
          )
          const eventTarget = getTarget(event.nativeEvent)
          const target = isElement(eventTarget) ? eventTarget : rootElement
          if (!contains(rootElement, target)) {
            resetTouchSwipeState(true)
            return
          }
          virtualKeyboard?.onTouchStart(event)
          if (isSwipeIgnoredTarget(elementAtPoint)) {
            resetTouchSwipeState(true)
            return
          }
          ignoreTouchSwipeRef.current = false
          const scrollTarget = findScrollableTouchTarget(target, rootElement, scrollAxis)
          const hasCrossAxisScrollableContent =
            findScrollableTouchTarget(target, rootElement, crossScrollAxis) != null
          let allowSwipe = null
          if (scrollTarget)
            allowSwipe = isAtSwipeStartEdge(scrollTarget, scrollAxis, swipeDirection) ? null : false
          touchScrollStateRef.current = {
            startX: touch.clientX,
            startY: touch.clientY,
            lastX: touch.clientX,
            lastY: touch.clientY,
            scrollTarget,
            hasCrossAxisScrollableContent,
            allowSwipe,
            preserveNativeCrossAxisScroll: false,
            drawerAxisAttributed: false,
          }
          swipeTouchProps.onTouchStart?.(event)
        },
        "onTouchEnd"(event) {
          virtualKeyboard?.onTouchEnd(event)
          resetTouchTrackingState()
          swipeTouchProps.onTouchEnd?.(event)
        },
        "onTouchCancel"(event) {
          virtualKeyboard?.onTouchCancel()
          resetTouchTrackingState()
          swipeTouchProps.onTouchCancel?.(event)
        },
        ["data-nested-dialog-open"]: void 0,
      }),
      children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(DrawerViewportContext.Provider, {
        value: swipeProviderValue,
        children,
      }),
    })
  },
)
function setBackdropSwipingAttribute(backdropElement, swiping) {
  backdropElement?.toggleAttribute(DrawerPopupDataAttributes.swiping, swiping)
}
function isSwipeIgnoredTarget(target) {
  return Boolean(target?.closest(BASE_UI_SWIPE_IGNORE_SELECTOR))
}
function isDrawerContentTarget(target) {
  return Boolean(target?.closest(DRAWER_CONTENT_SELECTOR))
}
function getBaseSwipeSize(element, direction) {
  return direction === "left" || direction === "right" ? element.offsetWidth : element.offsetHeight
}
function getBaseSwipeThreshold(element, direction) {
  return Math.max(getBaseSwipeSize(element, direction) * 0.5, MIN_SWIPE_THRESHOLD)
}
function isRangeInput(target, win) {
  return target instanceof win.HTMLInputElement && target.type === "range"
}
function isTextSelectionControl(target) {
  return target.tagName === "INPUT" || target.tagName === "TEXTAREA"
}
function hasExpandedSelectionWithinTarget(selection, target) {
  const anchorElement = isElement(selection.anchorNode)
    ? selection.anchorNode
    : selection.anchorNode?.parentElement
  const focusElement = isElement(selection.focusNode)
    ? selection.focusNode
    : selection.focusNode?.parentElement
  return (
    selection.containsNode(target, true) ||
    contains(target, anchorElement) ||
    contains(target, focusElement)
  )
}
function shouldIgnoreSwipeForTextSelection(doc, rootElement) {
  const activeEl = activeElement(doc)
  if (activeEl && contains(rootElement, activeEl) && isTextSelectionControl(activeEl)) {
    const { selectionStart, selectionEnd } = activeEl
    if (selectionStart != null && selectionEnd != null && selectionStart < selectionEnd) return true
  }
  const selection = doc.getSelection?.()
  if (!selection || selection.isCollapsed) return false
  return hasExpandedSelectionWithinTarget(selection, rootElement)
}
function isEventOnRangeInput(event, win) {
  return event.composedPath().some((pathTarget) => isRangeInput(pathTarget, win))
}
function isReactTouchEventOnRangeInput(event) {
  return isEventOnRangeInput(event.nativeEvent, getWindow(event.currentTarget))
}
function updateTouchScrollPosition(touchState, touch) {
  touchState.lastX = touch.clientX
  touchState.lastY = touch.clientY
}
/**
 * Arbitrates a touchmove between the drawer swipe and a native cross-axis scroll.
 * Returns `true` when the move must be left alone — either because the cross axis already won the
 * gesture, or because neither axis has passed the slop yet and the gesture cannot be attributed.
 */
function shouldYieldTouchMove(touchState, event, touch, isVerticalScrollAxis) {
  if (touchState.preserveNativeCrossAxisScroll) return true
  if (
    touchState.drawerAxisAttributed ||
    touchState.allowSwipe === true ||
    !touchState.hasCrossAxisScrollableContent
  )
    return false
  if (!event.cancelable) {
    touchState.preserveNativeCrossAxisScroll = true
    return true
  }
  const drawerAxisGestureDelta = isVerticalScrollAxis
    ? touch.clientY - touchState.startY
    : touch.clientX - touchState.startX
  const crossAxisGestureDelta = isVerticalScrollAxis
    ? touch.clientX - touchState.startX
    : touch.clientY - touchState.startY
  const absDrawerAxisGestureDelta = Math.abs(drawerAxisGestureDelta)
  const absCrossAxisGestureDelta = Math.abs(crossAxisGestureDelta)
  if (
    absCrossAxisGestureDelta >= AXIS_LOCK_SLOP &&
    absCrossAxisGestureDelta > absDrawerAxisGestureDelta + AXIS_LOCK_BIAS
  ) {
    touchState.preserveNativeCrossAxisScroll = true
    return true
  }
  if (absDrawerAxisGestureDelta >= AXIS_LOCK_SLOP) {
    touchState.drawerAxisAttributed = true
    return false
  }
  return true
}
function hasScrollableContentOnAxis(scrollTarget, axis) {
  return getScrollMetrics(scrollTarget, axis).max > 0
}
function getScrollMetrics(scrollTarget, axis) {
  if (axis === "vertical") {
    const max = Math.max(0, scrollTarget.scrollHeight - scrollTarget.clientHeight)
    return {
      offset: scrollTarget.scrollTop,
      max,
    }
  }
  const max = Math.max(0, scrollTarget.scrollWidth - scrollTarget.clientWidth)
  return {
    offset: scrollTarget.scrollLeft,
    max,
  }
}
function isAtSwipeStartEdge(scrollTarget, axis, direction) {
  const dismissFromStartEdge = shouldDismissFromStartEdge(direction, axis)
  const { offset, max } = getScrollMetrics(scrollTarget, axis)
  return dismissFromStartEdge ? offset <= 0 : offset >= max
}
function canSwipeFromScrollEdgeOnMove(scrollTarget, axis, direction, delta) {
  if (!(shouldDismissFromStartEdge(direction, axis) ? delta > 0 : delta < 0)) return false
  return isAtSwipeStartEdge(scrollTarget, axis, direction)
}
function shouldDismissFromStartEdge(direction, axis) {
  return axis === "vertical" ? direction === "down" : direction === "right"
}
//#endregion
//#region src/components/ui/drawer.tsx
const DrawerContext = import_react.createContext(null)
function useDrawer() {
  const context = import_react.useContext(DrawerContext)
  if (!context) throw new Error("useDrawer must be used within a Drawer.")
  return context
}
function Drawer({
  modal = true,
  showSwipeHandle = false,
  snapPoints,
  swipeDirection = "down",
  ...props
}) {
  const hasSnapPoints = snapPoints != null && snapPoints.length > 0
  const contextValue = import_react.useMemo(
    () => ({
      hasSnapPoints,
      modal,
      showSwipeHandle,
      swipeDirection,
    }),
    [hasSnapPoints, modal, showSwipeHandle, swipeDirection],
  )
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerContext.Provider, {
    value: contextValue,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerRoot, {
      "data-slot": "drawer",
      modal,
      snapPoints,
      swipeDirection,
      ...props,
    }),
  })
}
function DrawerPortal({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerPortal$1, {
    "data-slot": "drawer-portal",
    ...props,
  })
}
function DrawerOverlay({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerBackdrop, {
    "data-slot": "drawer-overlay",
    "className": cn(
      "fixed inset-0 z-50 min-h-dvh bg-black/10 opacity-[max(var(--drawer-overlay-min-opacity,0),calc(1-var(--drawer-swipe-progress)))] transition-opacity duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] select-none data-ending-style:pointer-events-none data-ending-style:opacity-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-snap-points:[--drawer-overlay-min-opacity:0.5] data-starting-style:opacity-0 data-swiping:duration-0 supports-backdrop-filter:backdrop-blur-xs supports-[-webkit-touch-callout:none]:absolute",
      className,
    ),
    ...props,
  })
}
function DrawerSwipeHandle({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    "data-slot": "drawer-swipe-handle",
    "aria-hidden": "true",
    "className": cn(
      "relative z-10 flex shrink-0 cursor-grab transition-opacity duration-200 group-data-nested-drawer-open/drawer-popup:opacity-0 group-data-nested-drawer-swiping/drawer-popup:opacity-100 group-data-[swipe-axis=x]/drawer-popup:h-full group-data-[swipe-axis=x]/drawer-popup:w-3 group-data-[swipe-axis=x]/drawer-popup:items-center group-data-[swipe-axis=y]/drawer-popup:h-3 group-data-[swipe-axis=y]/drawer-popup:w-full group-data-[swipe-axis=y]/drawer-popup:justify-center group-data-[swipe-direction=down]/drawer-popup:items-end group-data-[swipe-direction=left]/drawer-popup:order-last group-data-[swipe-direction=left]/drawer-popup:justify-start group-data-[swipe-direction=right]/drawer-popup:justify-end group-data-[swipe-direction=up]/drawer-popup:order-last group-data-[swipe-direction=up]/drawer-popup:items-start after:block after:shrink-0 after:rounded-none after:bg-muted group-data-[swipe-axis=x]/drawer-popup:after:h-12 group-data-[swipe-axis=x]/drawer-popup:after:w-1 group-data-[swipe-axis=y]/drawer-popup:after:h-1 group-data-[swipe-axis=y]/drawer-popup:after:w-12 active:cursor-grabbing",
      className,
    ),
    ...props,
  })
}
function DrawerContent({ className, children, ...props }) {
  const { hasSnapPoints, modal, showSwipeHandle, swipeDirection } = useDrawer()
  const swipeAxis = swipeDirection === "down" || swipeDirection === "up" ? "y" : "x"
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerPortal, {
    "data-slot": "drawer-portal",
    "children": [
      modal === true &&
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerOverlay, {
          "data-snap-points": hasSnapPoints ? "" : void 0,
        }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerViewport, {
        "data-slot": "drawer-viewport",
        "data-modal": modal,
        "className":
          "pointer-events-none fixed inset-0 z-50 select-none data-[modal=true]:pointer-events-auto",
        "children": /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerPopup, {
          "data-slot": "drawer-popup",
          "data-swipe-axis": swipeAxis,
          "data-snap-points": hasSnapPoints ? "" : void 0,
          "className": cn(
            "group/drawer-popup pointer-events-auto fixed z-50 m-(--drawer-inset,0px) flex h-(--drawer-content-height) max-h-(--drawer-content-max-height,none) min-h-0 w-(--drawer-content-width,auto) transform-[translate3d(var(--translate-x,0px),var(--translate-y,0px),0)_scale(var(--stack-scale))] flex-col bg-popover text-xs/relaxed text-popover-foreground transition-[transform,height,opacity,filter] duration-450 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform outline-none select-none [interpolate-size:allow-keywords] data-[swipe-direction=down]:rounded-none data-[swipe-direction=down]:border-t data-[swipe-direction=left]:rounded-none data-[swipe-direction=left]:border-r data-[swipe-direction=right]:rounded-none data-[swipe-direction=right]:border-l data-[swipe-direction=up]:rounded-none data-[swipe-direction=up]:border-b",
            "data-nested-drawer-open:overflow-hidden data-nested-drawer-open:brightness-95",
            "after:pointer-events-none after:absolute after:bg-(--drawer-bleed-background,var(--color-popover)) data-[swipe-axis=x]:after:inset-y-0 data-[swipe-axis=x]:after:w-(--bleed) data-[swipe-axis=y]:after:inset-x-0 data-[swipe-axis=y]:after:h-(--bleed) data-[swipe-direction=down]:after:top-full data-[swipe-direction=left]:after:right-full data-[swipe-direction=right]:after:left-full data-[swipe-direction=up]:after:bottom-full",
            "[--drawer-content-height:var(--drawer-height,auto)] data-[swipe-axis=x]:[--drawer-content-width:75%] data-[swipe-axis=y]:[--drawer-content-max-height:calc(100dvh-6rem)] data-[swipe-axis=y]:data-snap-points:[--drawer-content-height:100dvh] data-[swipe-axis=x]:sm:[--drawer-content-width:24rem]",
            "[--bleed:3rem] [--peek:1rem] [--stack-height:var(--drawer-frontmost-height,var(--drawer-height,0px))] [--stack-peek-offset:max(0px,calc((var(--nested-drawers)-var(--stack-progress))*var(--peek)))] [--stack-progress:clamp(0,var(--drawer-swipe-progress),1)] [--stack-scale-base:max(0,calc(1-(var(--nested-drawers)*var(--stack-step))))] [--stack-scale:clamp(0,calc(var(--stack-scale-base)+(var(--stack-step)*var(--stack-progress))),1)] [--stack-shrink:calc(1-var(--stack-scale))] [--stack-step:0.05]",
            "data-ending-style:transform-(--closed-transform) data-ending-style:opacity-[0.9999] data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-nested-drawer-swiping:duration-0 data-ending-style:data-nested-drawer-swiping:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-starting-style:transform-(--closed-transform) data-swiping:duration-0 data-ending-style:data-swiping:duration-[calc(var(--drawer-swipe-strength)*400ms)]",
            "data-[swipe-axis=y]:inset-x-0 data-[swipe-axis=y]:data-nested-drawer-open:h-(--stack-height)",
            "data-[swipe-axis=x]:inset-y-0 data-[swipe-axis=x]:flex-row",
            "data-[swipe-direction=down]:bottom-0 data-[swipe-direction=down]:origin-bottom data-[swipe-direction=down]:[--closed-transform:translate3d(0,calc(100%+var(--drawer-inset,0px)+2px),0)] data-[swipe-direction=down]:[--translate-y:calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y)-var(--stack-peek-offset)-(var(--stack-shrink)*var(--stack-height)))]",
            "data-[swipe-direction=up]:top-0 data-[swipe-direction=up]:origin-top data-[swipe-direction=up]:[--closed-transform:translate3d(0,calc(-100%-var(--drawer-inset,0px)-2px),0)] data-[swipe-direction=up]:[--translate-y:calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y)+var(--stack-peek-offset)+(var(--stack-shrink)*var(--stack-height)))]",
            "data-[swipe-direction=left]:left-0 data-[swipe-direction=left]:origin-left data-[swipe-direction=left]:[--closed-transform:translate3d(calc(-100%-var(--drawer-inset,0px)-2px),0,0)] data-[swipe-direction=left]:[--translate-x:calc(var(--drawer-swipe-movement-x)+var(--stack-peek-offset)+(var(--stack-shrink)*100%))]",
            "data-[swipe-direction=right]:right-0 data-[swipe-direction=right]:origin-right data-[swipe-direction=right]:[--closed-transform:translate3d(calc(100%+var(--drawer-inset,0px)+2px),0,0)] data-[swipe-direction=right]:[--translate-x:calc(var(--drawer-swipe-movement-x)-var(--stack-peek-offset)-(var(--stack-shrink)*100%))]",
            className,
          ),
          ...props,
          "children": [
            showSwipeHandle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerSwipeHandle, {}),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerContent$1, {
              "data-slot": "drawer-content",
              "className": cn(
                "flex min-h-0 flex-1 flex-col overflow-hidden overscroll-contain rounded-[inherit] transition-opacity duration-300 ease-[cubic-bezier(0.45,1.005,0,1.005)] select-text group-data-nested-drawer-open/drawer-popup:opacity-0 group-data-nested-drawer-swiping/drawer-popup:opacity-100 group-data-swiping/drawer-popup:select-none",
              ),
              children,
            }),
          ],
        }),
      }),
    ],
  })
}
function DrawerHeader({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    "data-slot": "drawer-header",
    "className": cn(
      "flex shrink-0 flex-col gap-0.5 p-4 pb-0 group-data-[swipe-axis=y]/drawer-popup:text-center md:gap-0.5 md:text-left",
      className,
    ),
    ...props,
  })
}
function DrawerFooter({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    "data-slot": "drawer-footer",
    "className": cn("mt-auto flex shrink-0 flex-col gap-2 p-4 pt-0", className),
    ...props,
  })
}
function DrawerTitle({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerTitle$1, {
    "data-slot": "drawer-title",
    "className": cn("font-heading text-sm font-medium text-foreground", className),
    ...props,
  })
}
function DrawerDescription({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerDescription$1, {
    "data-slot": "drawer-description",
    "className": cn("text-xs/relaxed text-balance text-muted-foreground", className),
    ...props,
  })
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/dialog/backdrop/DialogBackdrop.mjs
/**
 * An overlay displayed beneath the popup.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
 */
const DialogBackdrop = /*#__PURE__*/ import_react.forwardRef(
  function DialogBackdrop(componentProps, forwardedRef) {
    const { render, className, style, forceRender = false, ...elementProps } = componentProps
    const store = useDialogRootContext()
    const open = store.useState("open")
    const nested = store.useState("nested")
    const mounted = store.useState("mounted")
    return useRenderElement("div", componentProps, {
      state: {
        open,
        transitionStatus: store.useState("transitionStatus"),
      },
      ref: [store.context.backdropRef, forwardedRef],
      stateAttributesMapping: popupTransitionStateMapping,
      props: [
        {
          role: "presentation",
          hidden: !mounted,
          style: {
            userSelect: "none",
            WebkitUserSelect: "none",
          },
        },
        elementProps,
      ],
      enabled: forceRender || !nested,
    })
  },
)
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/dialog/popup/DialogPopup.mjs
/**
 * A container for the dialog contents.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
 */
const DialogPopup = /*#__PURE__*/ import_react.forwardRef(
  function DialogPopup(componentProps, forwardedRef) {
    const { render, className, style, finalFocus, initialFocus, ...elementProps } = componentProps
    const store = useDialogRootContext()
    const descriptionElementId = store.useState("descriptionElementId")
    const disablePointerDismissal = store.useState("disablePointerDismissal")
    const floatingRootContext = store.useState("floatingRootContext")
    const rootPopupProps = store.useState("popupProps")
    const modal = store.useState("modal")
    const mounted = store.useState("mounted")
    const nested = store.useState("nested")
    const nestedOpenDialogCount = store.useState("nestedOpenDialogCount")
    const open = store.useState("open")
    const openMethod = store.useState("openMethod")
    const titleElementId = store.useState("titleElementId")
    const transitionStatus = store.useState("transitionStatus")
    const role = store.useState("role")
    const floatingId = floatingRootContext.useState("floatingId")
    useDialogPortalContext()
    useOpenChangeComplete({
      open,
      ref: store.context.popupRef,
      onComplete() {
        if (open) store.context.onOpenChangeComplete?.(true)
      },
    })
    const resolvedInitialFocus =
      initialFocus === void 0 ? createDefaultInitialFocus(store.context.popupRef) : initialFocus
    const nestedDialogOpen = nestedOpenDialogCount > 0
    const setPopupElement = store.useStateSetter("popupElement")
    const element = useRenderElement("div", componentProps, {
      state: {
        open,
        nested,
        transitionStatus,
        nestedDialogOpen,
      },
      props: [
        rootPopupProps,
        {
          "id": floatingId,
          "aria-labelledby": titleElementId,
          "aria-describedby": descriptionElementId,
          role,
          ...FOCUSABLE_POPUP_PROPS,
          "hidden": !mounted,
          "onKeyDown"(event) {
            if (COMPOSITE_KEYS.has(event.key)) event.stopPropagation()
          },
          "style": { "--nested-dialogs": nestedOpenDialogCount },
        },
        elementProps,
      ],
      ref: [forwardedRef, store.context.popupRef, setPopupElement],
      stateAttributesMapping: dialogStateAttributesMapping,
    })
    return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FloatingFocusManager, {
      context: floatingRootContext,
      openInteractionType: openMethod,
      disabled: !mounted,
      closeOnFocusOut: !disablePointerDismissal,
      initialFocus: resolvedInitialFocus,
      returnFocus: finalFocus,
      modal: modal !== false,
      restoreFocus: "popup",
      children: element,
    })
  },
)
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/dialog/root/DialogRoot.mjs
/**
 * Groups all parts of the dialog.
 * Doesn't render its own HTML element.
 *
 * Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
 */
function DialogRoot(props) {
  return useRenderDialogRoot("dialog", props)
}
//#endregion
//#region src/components/ui/sheet.tsx
function Sheet({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogRoot, {
    "data-slot": "sheet",
    ...props,
  })
}
function SheetPortal({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogPortal, {
    "data-slot": "sheet-portal",
    ...props,
  })
}
function SheetOverlay({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogBackdrop, {
    "data-slot": "sheet-overlay",
    "className": cn(
      "fixed inset-0 z-50 bg-black/10 text-xs/relaxed transition-opacity duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs",
      className,
    ),
    ...props,
  })
}
function SheetContent({ className, children, side = "right", showCloseButton = true, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, {
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPopup, {
        "data-slot": "sheet-content",
        "data-side": side,
        "className": cn(
          "fixed z-50 flex flex-col bg-popover bg-clip-padding text-xs/relaxed text-popover-foreground shadow-lg transition-transform duration-450 ease-[cubic-bezier(0.22,1,0.36,1)] [--sheet-offset:calc(100%+2px)] data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=bottom]:data-ending-style:translate-y-(--sheet-offset) data-[side=bottom]:data-starting-style:translate-y-(--sheet-offset) data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=left]:data-ending-style:translate-x-[calc(var(--sheet-offset)*-1)] data-[side=left]:data-starting-style:translate-x-[calc(var(--sheet-offset)*-1)] data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=right]:data-ending-style:translate-x-(--sheet-offset) data-[side=right]:data-starting-style:translate-x-(--sheet-offset) data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=top]:data-ending-style:translate-y-[calc(var(--sheet-offset)*-1)] data-[side=top]:data-starting-style:translate-y-[calc(var(--sheet-offset)*-1)] data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm",
          className,
        ),
        ...props,
        "children": [
          children,
          showCloseButton &&
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
              "data-slot": "sheet-close",
              "render": /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                variant: "ghost",
                className: "absolute top-3 right-3",
                size: "icon-sm",
              }),
              "children": [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconX, {}),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                  className: "sr-only",
                  children: "Close",
                }),
              ],
            }),
        ],
      }),
    ],
  })
}
function SheetHeader({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    "data-slot": "sheet-header",
    "className": cn("flex flex-col gap-0.5 p-4", className),
    ...props,
  })
}
function SheetFooter({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    "data-slot": "sheet-footer",
    "className": cn("mt-auto flex flex-col gap-2 p-4", className),
    ...props,
  })
}
function SheetTitle({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
    "data-slot": "sheet-title",
    "className": cn("font-heading text-sm font-medium text-foreground", className),
    ...props,
  })
}
function SheetDescription({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
    "data-slot": "sheet-description",
    "className": cn("text-xs/relaxed text-muted-foreground", className),
    ...props,
  })
}
//#endregion
//#region src/shared/media-query.ts
/**
 * Whether the viewport matches — `null` until it has been measured.
 *
 * That third value is not pedantry: `matchMedia` is unreadable to a server render and to the
 * hydration render that has to match it, so a caller whose two layouts are genuinely different
 * components has to wait rather than render one and swap. A caller that only needs a default in the
 * meantime compares against `true` and gets one.
 */
function useMediaQuery(query) {
  const [matches, setMatches] = (0, import_react.useState)(null)
  ;(0, import_react.useEffect)(() => {
    const media = window.matchMedia(query)
    const update = () => setMatches(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [query])
  return matches
}
//#endregion
//#region src/components/side-surface.tsx
function SideSurface({
  actions,
  bodyClassName,
  children,
  className,
  description,
  onOpenChange,
  onOpenChangeComplete,
  open,
  title,
}) {
  const wide = useMediaQuery("(min-width: 768px)")
  const [shown, setShown] = (0, import_react.useState)(false)
  ;(0, import_react.useEffect)(() => {
    if (wide !== null) setShown(open)
  }, [wide, open])
  if (wide === null) return null
  if (wide)
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
      open: shown,
      onOpenChange,
      onOpenChangeComplete,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
        className: cn(
          "data-[side=right]:inset-y-5 data-[side=right]:right-5 data-[side=right]:h-auto data-[side=right]:w-[calc(100%-2.5rem)] data-[side=right]:border [--sheet-offset:calc(100%+1.25rem+2px)]",
          className,
        ),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
            className: "shrink-0 border-b",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: title }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, {
                children: description,
              }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
            className: cn("min-h-0 flex-1 overflow-y-auto px-8 py-6", bodyClassName),
            children,
          }),
          actions
            ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetFooter, {
                className: "shrink-0 flex-row items-center justify-end border-t",
                children: actions,
              })
            : null,
        ],
      }),
    })
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer, {
    swipeDirection: "up",
    open: shown,
    onOpenChange,
    onOpenChangeComplete,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerContent, {
      className: "rounded-none [--drawer-content-max-height:70dvh]!",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerHeader, {
          className: "shrink-0 border-b px-4 py-4 text-left",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerTitle, { children: title }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerDescription, {
              children: description,
            }),
          ],
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
          className: cn("min-h-0 flex-1 overflow-y-auto px-4 py-6", bodyClassName),
          children,
        }),
        actions
          ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerFooter, {
              className:
                "shrink-0 flex-row flex-wrap items-center justify-end gap-y-2 border-t px-4 py-4",
              children: actions,
            })
          : null,
      ],
    }),
  })
}
//#endregion
//#region src/components/ui/label.tsx
function Label({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
    "data-slot": "label",
    "className": cn(
      "flex items-center gap-2 text-xs leading-none select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
      className,
    ),
    ...props,
  })
}
//#endregion
//#region src/components/ui/field.tsx
function FieldGroup({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    "data-slot": "field-group",
    "className": cn(
      "group/field-group @container/field-group flex w-full flex-col gap-5 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4",
      className,
    ),
    ...props,
  })
}
const fieldVariants = tv({
  base: "group/field flex w-full gap-2 data-[invalid=true]:text-destructive",
  variants: {
    orientation: {
      vertical: "flex-col *:w-full [&>.sr-only]:w-auto",
      horizontal:
        "flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
      responsive:
        "flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
    },
  },
  defaultVariants: { orientation: "vertical" },
})
function Field({ className, orientation = "vertical", ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    "role": "group",
    "data-slot": "field",
    "data-orientation": orientation,
    "className": cn(fieldVariants({ orientation }), className),
    ...props,
  })
}
function FieldContent({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    "data-slot": "field-content",
    "className": cn("group/field-content flex flex-1 flex-col gap-0.5 leading-snug", className),
    ...props,
  })
}
function FieldLabel({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
    "data-slot": "field-label",
    "className": cn(
      "group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-data-checked:border-primary/30 has-data-checked:bg-primary/5 has-[>[data-slot=field]]:rounded-none has-[>[data-slot=field]]:border *:data-[slot=field]:p-2 dark:has-data-checked:border-primary/20 dark:has-data-checked:bg-primary/10",
      "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col",
      className,
    ),
    ...props,
  })
}
function FieldTitle({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    "data-slot": "field-label",
    "className": cn(
      "flex w-fit items-center gap-2 text-xs/relaxed group-data-[disabled=true]/field:opacity-50",
      className,
    ),
    ...props,
  })
}
function FieldDescription({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
    "data-slot": "field-description",
    "className": cn(
      "text-left text-xs/relaxed leading-normal font-normal text-muted-foreground group-has-data-horizontal/field:text-balance [[data-variant=legend]+&]:-mt-1.5",
      "last:mt-0 nth-last-2:-mt-1",
      "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
      className,
    ),
    ...props,
  })
}
function FieldError({ className, children, errors, ...props }) {
  const content = (0, import_react.useMemo)(() => {
    if (children) return children
    if (!errors?.length) return null
    const uniqueErrors = [...new Map(errors.map((error) => [error?.message, error])).values()]
    if (uniqueErrors?.length === 1) return uniqueErrors[0]?.message
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
      className: "ml-4 flex list-disc flex-col gap-1",
      children: uniqueErrors.map(
        (error, index) =>
          error?.message &&
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: error.message }, index),
      ),
    })
  }, [children, errors])
  if (!content) return null
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    "role": "alert",
    "data-slot": "field-error",
    "className": cn("text-xs font-normal text-destructive", className),
    ...props,
    "children": content,
  })
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/internals/field-constants/constants.mjs
const DEFAULT_VALIDITY_STATE = {
  badInput: false,
  customError: false,
  patternMismatch: false,
  rangeOverflow: false,
  rangeUnderflow: false,
  stepMismatch: false,
  tooLong: false,
  tooShort: false,
  typeMismatch: false,
  valid: null,
  valueMissing: false,
}
const DEFAULT_FIELD_ROOT_STATE = {
  disabled: false,
  valid: null,
  touched: false,
  dirty: false,
  filled: false,
  focused: false,
}
const fieldValidityMapping = {
  valid(value) {
    if (value === null) return null
    if (value) return { "data-valid": "" }
    return { "data-invalid": "" }
  },
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/internals/field-root-context/FieldRootContext.mjs
const DEFAULT_FIELD_ROOT_CONTEXT = {
  invalid: void 0,
  name: void 0,
  validityData: {
    state: DEFAULT_VALIDITY_STATE,
    errors: [],
    error: "",
    value: "",
    initialValue: null,
  },
  setValidityData: NOOP,
  disabled: void 0,
  setTouched: NOOP,
  setDirty: NOOP,
  setFilled: NOOP,
  setFocused: NOOP,
  validationMode: "onSubmit",
  shouldValidateOnChange: () => false,
  state: DEFAULT_FIELD_ROOT_STATE,
  registerFieldControl: NOOP,
  validation: {
    getValidationProps: (_disabled, props = EMPTY_OBJECT) => props,
    inputRef: { current: null },
    registeredInputs: /* @__PURE__ */ new Map(),
    registerInput: NOOP,
    getInputControl: () => null,
    commit: async () => {},
    change: NOOP,
  },
}
const FieldRootContext = /*#__PURE__*/ import_react.createContext(DEFAULT_FIELD_ROOT_CONTEXT)
function useFieldRootContext(optional = true) {
  const context = import_react.useContext(FieldRootContext)
  if (context.setValidityData === NOOP && !optional) throw new Error(formatErrorMessage(28))
  return context
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/internals/form-context/FormContext.mjs
const FormContext = /*#__PURE__*/ import_react.createContext({
  elementRef: { current: null },
  formRef: { current: { fields: /* @__PURE__ */ new Map() } },
  errors: {},
  clearErrors: NOOP,
  validationMode: "onSubmit",
  submitAttemptedRef: { current: false },
})
function useFormContext() {
  return import_react.useContext(FormContext)
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/internals/labelable-provider/LabelableContext.mjs
/**
 * A context for providing [labelable elements](https://html.spec.whatwg.org/multipage/forms.html#category-label)\
 * with an accessible name (label) and description.
 */
const LabelableContext = /*#__PURE__*/ import_react.createContext({
  controlId: void 0,
  registerControlId: NOOP,
  labelId: void 0,
  setLabelId: NOOP,
  messageIds: [],
  setMessageIds: NOOP,
  getDescriptionProps: (externalProps) => externalProps,
})
function useLabelableContext() {
  return import_react.useContext(LabelableContext)
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/internals/labelable-provider/useLabelableId.mjs
function useLabelableId(params = {}) {
  const { id, implicit = false, controlRef } = params
  const { controlId, registerControlId } = useLabelableContext()
  const defaultId = useBaseUiId(id)
  const controlIdForEffect = implicit ? controlId : void 0
  const controlSourceRef = useRefWithInit(() => Symbol())
  const hasRegisteredRef = import_react.useRef(false)
  const hadExplicitIdRef = import_react.useRef(id != null)
  const unregisterControlId = useStableCallback(() => {
    if (!hasRegisteredRef.current || registerControlId === NOOP) return
    hasRegisteredRef.current = false
    registerControlId(controlSourceRef.current, void 0)
  })
  useIsoLayoutEffect(() => {
    if (registerControlId === NOOP) return
    let nextId
    if (implicit) {
      const elem = controlRef?.current
      if (isElement(elem) && elem.closest("label") != null) nextId = id ?? null
      else nextId = controlIdForEffect ?? defaultId
    } else if (id != null) {
      hadExplicitIdRef.current = true
      nextId = id
    } else if (hadExplicitIdRef.current) nextId = defaultId
    else {
      unregisterControlId()
      return
    }
    if (nextId === void 0) {
      unregisterControlId()
      return
    }
    hasRegisteredRef.current = true
    registerControlId(controlSourceRef.current, nextId)
  }, [
    id,
    controlRef,
    controlIdForEffect,
    registerControlId,
    implicit,
    defaultId,
    controlSourceRef,
    unregisterControlId,
  ])
  import_react.useEffect(() => {
    return unregisterControlId
  }, [unregisterControlId])
  return controlId ?? defaultId
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/internals/field-register-control/useRegisterFieldControl.mjs
function useRegisterFieldControl(
  controlRef,
  id,
  value,
  getFormValueOverride,
  enabled = true,
  name,
) {
  const { registerFieldControl } = useFieldRootContext()
  const sourceRef = useRefWithInit(() => Symbol())
  useIsoLayoutEffect(() => {
    const source = sourceRef.current
    if (!enabled) {
      registerFieldControl(source, void 0)
      return
    }
    registerFieldControl(source, {
      controlRef,
      getValue: getFormValueOverride,
      id,
      name,
      value,
    })
  }, [controlRef, enabled, getFormValueOverride, id, name, registerFieldControl, sourceRef, value])
  useIsoLayoutEffect(() => {
    const source = sourceRef.current
    return () => {
      registerFieldControl(source, void 0)
    }
  }, [registerFieldControl, sourceRef])
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/field/control/FieldControl.mjs
/**
 * The form control to label and validate.
 * Renders an `<input>` element.
 *
 * You can omit this part and use any Base UI input component instead. For example,
 * [Input](https://base-ui.com/react/components/input), [Checkbox](https://base-ui.com/react/components/checkbox),
 * or [Select](https://base-ui.com/react/components/select), among others, will work with Field out of the box.
 *
 * Documentation: [Base UI Field](https://base-ui.com/react/components/field)
 */
const FieldControl = /*#__PURE__*/ import_react.forwardRef(
  function FieldControl(componentProps, forwardedRef) {
    const {
      render,
      className,
      id: idProp,
      name: nameProp,
      value: valueProp,
      disabled: disabledProp = false,
      onValueChange,
      defaultValue,
      autoFocus = false,
      style,
      ...elementProps
    } = componentProps
    const {
      state: fieldState,
      name: fieldName,
      disabled: fieldDisabled,
      setTouched,
      setDirty,
      validityData,
      setFocused,
      setFilled,
      validationMode,
      validation,
    } = useFieldRootContext()
    const { clearErrors } = useFormContext()
    const disabled = fieldDisabled || disabledProp
    const name = fieldName ?? nameProp
    const state = {
      ...fieldState,
      disabled,
    }
    const { labelId } = useLabelableContext()
    const id = useLabelableId({ id: idProp })
    useIsoLayoutEffect(() => {
      const hasExternalValue = valueProp != null
      if (validation.inputRef.current?.value || (hasExternalValue && valueProp !== ""))
        setFilled(true)
      else if (hasExternalValue && valueProp === "") setFilled(false)
    }, [validation.inputRef, setFilled, valueProp])
    const inputRef = import_react.useRef(null)
    useIsoLayoutEffect(() => {
      if (autoFocus && inputRef.current === activeElement(ownerDocument(inputRef.current)))
        setFocused(true)
    }, [autoFocus, setFocused])
    const [valueUnwrapped] = useControlled({
      controlled: valueProp,
      default: defaultValue,
      name: "FieldControl",
      state: "value",
    })
    const isControlled = valueProp !== void 0
    const value = isControlled ? valueUnwrapped : void 0
    const getValueFromInput = useStableCallback(() => validation.inputRef.current?.value)
    useRegisterFieldControl(validation.inputRef, id, value, getValueFromInput, !disabled, nameProp)
    return useRenderElement("input", componentProps, {
      ref: [forwardedRef, inputRef],
      state,
      props: [
        {
          id,
          disabled,
          name,
          "ref": validation.inputRef,
          "aria-labelledby": labelId,
          autoFocus,
          ...(isControlled ? { value } : { defaultValue }),
          "onChange"(event) {
            const inputValue = event.currentTarget.value
            onValueChange?.(inputValue, createChangeEventDetails(none, event.nativeEvent))
            setDirty(inputValue !== (validityData.initialValue ?? ""))
            setFilled(inputValue !== "")
            if (!event.nativeEvent.defaultPrevented) {
              clearErrors(name)
              validation.change(inputValue)
            }
          },
          "onFocus"() {
            setFocused(true)
          },
          "onBlur"(event) {
            setTouched(true)
            setFocused(false)
            if (validationMode === "onBlur") validation.commit(event.currentTarget.value)
          },
          "onKeyDown"(event) {
            if (event.currentTarget.tagName === "INPUT" && event.key === "Enter") {
              setTouched(true)
              validation.commit(event.currentTarget.value)
            }
          },
        },
        elementProps,
        (props) => validation.getValidationProps(disabled, props),
      ],
      stateAttributesMapping: fieldValidityMapping,
    })
  },
)
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/input/Input.mjs
/**
 * A native input element that automatically works with [Field](https://base-ui.com/react/components/field).
 * Renders an `<input>` element.
 *
 * Documentation: [Base UI Input](https://base-ui.com/react/components/input)
 */
const Input$1 = /*#__PURE__*/ import_react.forwardRef(function Input(props, forwardedRef) {
  return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FieldControl, {
    ref: forwardedRef,
    ...props,
  })
})
//#endregion
//#region src/components/ui/input.tsx
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
    type,
    "data-slot": "input",
    "className": cn(
      "h-8 w-full min-w-0 rounded-none border border-input bg-transparent px-2.5 py-1 text-xs transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-xs file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 md:text-xs dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
      className,
    ),
    ...props,
  })
}
//#endregion
//#region src/features/shell/connection-panel-state.ts
/**
 * Whether the connection panel is open, and the only place that decides it.
 *
 * The state lives in the URL so a reader can be sent straight to it and so the back button closes
 * the panel rather than leaving the page. `connect` is owned by the root route: the panel is mounted
 * from `AppShell` under both `/` and `/subscriptions`, so nothing narrower can own it — which is also
 * why the reads are loosely typed (`strict: false`) and the writes go through `to: "."` rather than a
 * route this hook cannot commit to.
 *
 * Every consumer of that param goes through here: the header button, the gate's prompt and the panel
 * itself, which previously each spelled the same incantation out by hand.
 */
function useConnectionPanel() {
  const navigate = useNavigate()
  const search = useSearch({ strict: false })
  function setOpen(open) {
    navigate({
      to: ".",
      search: (prev) => ({
        ...prev,
        connect: open ? true : void 0,
      }),
    })
  }
  return {
    open: search.connect === true,
    setOpen,
  }
}
//#endregion
//#region src/features/shell/connection-panel.tsx
function ConnectionDot({ connected }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
    "aria-hidden": true,
    "data-connected": connected,
    "className":
      "size-1.5 shrink-0 bg-border data-[connected=true]:bg-primary data-[connected=true]:animate-bounce",
  })
}
function ConnectionPanel() {
  const navigate = useNavigate()
  const adminToken = useToken()
  const tokenUsable = useTokenUsable()
  const { open: connectionOpen, setOpen: setConnectionOpen } = useConnectionPanel()
  const connect = useConnect()
  const disconnect = useDisconnect()
  const [draft, setDraft] = (0, import_react.useState)(adminToken)
  const [failure, setFailure] = (0, import_react.useState)("")
  const [pending, setPending] = (0, import_react.useState)(false)
  const committed = tokenUsable && draft === adminToken
  const [tracked, setTracked] = (0, import_react.useState)({
    adminToken,
    connectionOpen,
  })
  if (tracked.adminToken !== adminToken || tracked.connectionOpen !== connectionOpen) {
    setTracked({
      adminToken,
      connectionOpen,
    })
    setDraft(adminToken)
    setFailure("")
  }
  function disconnectAndLeave() {
    disconnect()
    navigate({
      to: "/",
      replace: true,
      viewTransition: true,
    })
  }
  async function commit() {
    if (pending) return
    setPending(true)
    setFailure("")
    try {
      if (await connect(draft)) setConnectionOpen(false)
    } catch (error) {
      setFailure(error instanceof Error ? error.message : "无法验证管理密码。")
    } finally {
      setPending(false)
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SideSurface, {
    className: "data-[side=right]:sm:max-w-md",
    description:
      "密码通过服务端验证后只保存在当前浏览器会话，不会写入 D1，也不会随订阅一起持久化。",
    onOpenChange: setConnectionOpen,
    open: connectionOpen,
    title: committed ? "管理连接" : "进入 Cuttle",
    actions: committed
      ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
          variant: "outline",
          onClick: disconnectAndLeave,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconPlugConnectedX, {
              "data-icon": "inline-start",
            }),
            "断开连接",
          ],
        })
      : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
          onClick: () => void commit(),
          disabled: !hasToken(draft) || pending,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconPlugConnected, {
              "data-icon": "inline-start",
            }),
            pending ? "验证中" : "进入",
          ],
        }),
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
      className: "flex flex-col gap-6",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
          "data-invalid": Boolean(failure),
          "children": [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
              htmlFor: "admin-token",
              children: "访问密码",
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
              "id": "admin-token",
              "type": "password",
              "autoComplete": "current-password",
              "aria-invalid": Boolean(failure),
              "value": draft,
              "placeholder": "CUTTLE_TOKEN",
              "onChange": (event) => {
                setDraft(event.target.value)
                setFailure("")
              },
              "onKeyDown": (event) => {
                if (event.key === "Enter") commit()
              },
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { children: failure }),
          ],
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
          className: "text-xs leading-relaxed text-muted-foreground",
          children: "请仅将 Cuttle 用于你拥有或获准使用的服务器与网络资源，并遵守所在地法律法规。",
        }),
      ],
    }),
  })
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/popover/root/PopoverRootContext.mjs
const PopoverRootContext = /*#__PURE__*/ import_react.createContext(void 0)
function usePopoverRootContext(optional) {
  const context = import_react.useContext(PopoverRootContext)
  if (context === void 0 && !optional) throw new Error(formatErrorMessage(47))
  return context
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/popover/store/PopoverStore.mjs
const selectors = {
  ...popupStoreSelectors,
  disabled: (state) => state.disabled,
  instantType: (state) => state.instantType,
  openMethod: (state) => state.openMethod,
  openChangeReason: (state) => state.openChangeReason,
  modal: (state) => state.modal,
  focusManagerModal: (state) => state.focusManagerModal,
  stickIfOpen: (state) => state.stickIfOpen,
  titleElementId: (state) => state.titleElementId,
  descriptionElementId: (state) => state.descriptionElementId,
  openOnHover: (state) => state.openOnHover,
  closeDelay: (state) => state.closeDelay,
  adaptiveOrigin: (state) => state.adaptiveOrigin,
}
/**
 * The store view that detached handle-backed triggers read from. Both the real `PopoverStore` and
 * the inert fallback store satisfy it, so a trigger can read from whichever store the handle
 * currently exposes. Narrowed to the members a trigger actually uses — the trigger-data members plus
 * `setOpen` (called by the focus guards) — so the exposed surface can't bypass the open-change
 * pipeline; on the detached fallback store every one of these mutations is a no-op.
 */
const PopoverStore = class extends ReactStore {
  constructor(initialState, floatingId, nested) {
    const triggerElements = new PopupTriggerMap()
    super(
      createInitialState(initialState, triggerElements, floatingId, nested),
      createInitialContext(triggerElements),
      selectors,
    )
  }
  setOpen = (nextOpen, eventDetails) => {
    const isHover = eventDetails.reason === triggerHover
    const isKeyboardClick =
      eventDetails.reason === "trigger-press" && eventDetails.event.detail === 0
    const isDismissClose =
      !nextOpen && (eventDetails.reason === "escape-key" || eventDetails.reason == null)
    const shouldPreventUnmountOnClose = attachPreventUnmountOnClose(eventDetails)
    const activeTriggerId = this.select("activeTriggerId")
    if (
      !nextOpen &&
      eventDetails.reason === "close-press" &&
      eventDetails.trigger == null &&
      activeTriggerId != null
    )
      eventDetails.trigger =
        this.context.triggerElements.getById(activeTriggerId) ??
        this.select("activeTriggerElement") ??
        void 0
    this.context.onOpenChange?.(nextOpen, eventDetails)
    if (eventDetails.isCanceled) return
    this.state.floatingRootContext.dispatchOpenChange(nextOpen, eventDetails)
    const changeState = () => {
      const updatedState = {
        open: nextOpen,
        openChangeReason: eventDetails.reason,
      }
      setPopupOpenState(updatedState, nextOpen, eventDetails.trigger, shouldPreventUnmountOnClose())
      this.update(updatedState)
    }
    if (isHover) {
      this.set("stickIfOpen", true)
      this.context.stickIfOpenTimeout.start(500, () => {
        this.set("stickIfOpen", false)
      })
      import_react_dom.flushSync(changeState)
    } else changeState()
    let instantType
    if (isKeyboardClick) instantType = "click"
    else if (isDismissClose) instantType = "dismiss"
    else if (eventDetails.reason === "focus-out") instantType = "focus"
    this.set("instantType", instantType)
  }
}
function createInitialState(initialState, triggerElements, floatingId, nested = false) {
  const state = {
    ...createInitialPopupStoreState(),
    disabled: false,
    modal: false,
    focusManagerModal: false,
    instantType: void 0,
    openMethod: null,
    openChangeReason: null,
    titleElementId: void 0,
    descriptionElementId: void 0,
    stickIfOpen: true,
    openOnHover: false,
    closeDelay: 0,
    adaptiveOrigin: void 0,
    ...initialState,
  }
  if (state.open && initialState?.mounted === void 0) state.mounted = true
  state.floatingRootContext = createPopupFloatingRootContext(triggerElements, floatingId, nested)
  return state
}
function createInitialContext(triggerElements) {
  return {
    popupRef: /*#__PURE__*/ import_react.createRef(),
    onOpenChange: void 0,
    onOpenChangeComplete: void 0,
    triggerFocusTargetRef: /*#__PURE__*/ import_react.createRef(),
    beforeContentFocusGuardRef: /*#__PURE__*/ import_react.createRef(),
    stickIfOpenTimeout: new Timeout(),
    triggerElements,
  }
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/popover/root/PopoverRoot.mjs
function PopoverRootComponent({ props }) {
  const {
    children,
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    onOpenChangeComplete,
    modal = false,
    handle,
    triggerId: triggerIdProp,
    defaultTriggerId: defaultTriggerIdProp = null,
  } = props
  const store = usePopoverRootStore(handle, {
    modal,
    open: defaultOpen,
    openProp,
    activeTriggerId: defaultTriggerIdProp,
    triggerIdProp,
  })
  store.useControlledProp("openProp", openProp)
  store.useControlledProp("triggerIdProp", triggerIdProp)
  const open = store.useState("open")
  const mounted = store.useState("mounted")
  const payload = store.useState("payload")
  store.useContextCallback("onOpenChange", onOpenChange)
  store.useContextCallback("onOpenChangeComplete", onOpenChangeComplete)
  usePopupRootSync(store, open)
  useImplicitActiveTrigger(store)
  const { forceUnmount } = useOpenStateTransitions(open, store, () => {
    store.update({
      stickIfOpen: true,
      openChangeReason: null,
    })
  })
  store.useSyncedValues({ modal })
  import_react.useEffect(() => {
    if (!open) store.context.stickIfOpenTimeout.clear()
  }, [store, open])
  import_react.useImperativeHandle(
    props.actionsRef,
    () => ({
      unmount: forceUnmount,
      close: () => store.setOpen(false, createChangeEventDetails(imperativeAction)),
    }),
    [forceUnmount, store],
  )
  const shouldRenderInteractions = open || mounted
  return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(PopoverRootContext.Provider, {
    value: store,
    children: [
      handle &&
        /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PopupHandleAttachment, {
          handle,
          store,
        }),
      shouldRenderInteractions &&
        /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PopoverInteractions, {
          store,
          modal,
        }),
      typeof children === "function" ? children({ payload }) : children,
    ],
  })
}
/**
 * Groups all parts of the popover.
 * Doesn't render its own HTML element.
 *
 * Documentation: [Base UI Popover](https://base-ui.com/react/components/popover)
 */
function PopoverRoot(props) {
  if (usePopoverRootContext(true))
    return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PopoverRootComponent, { props })
  return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FloatingTree, {
    children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PopoverRootComponent, { props }),
  })
}
function usePopoverRootStore(handle, initialState) {
  const store = usePopupRootStore(
    (floatingId, nested) => new PopoverStore(initialState, floatingId, nested),
  )
  import_react.useEffect(() => store.context.stickIfOpenTimeout.disposeEffect(), [store])
  return store
}
function PopoverInteractions({ store, modal }) {
  const dismiss = useDismiss(store.useState("floatingRootContext"), {
    outsidePressEvent: {
      mouse: modal === "trap-focus" ? "sloppy" : "intentional",
      touch: "sloppy",
    },
  })
  const triggerProps = dismiss.reference
  const popupProps = dismiss.floating
  usePopupInteractionProps(store, {
    activeTriggerProps: triggerProps,
    inactiveTriggerProps: triggerProps,
    popupProps,
  })
  return null
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/utils/popups/useTriggerFocusGuards.mjs
/**
 * Minimal store interface required by the focus guard hook.
 * Both PopoverStore and MenuStore satisfy this interface.
 */
/**
 * Provides focus guard handlers for popup triggers (Popover, Menu).
 *
 * When the popup is open, invisible focus guard elements are placed before and after
 * the trigger. These handlers close the popup and move focus to the appropriate
 * tabbable element when the guards receive focus (i.e. when the user tabs out).
 */
function useTriggerFocusGuards(store, triggerElementRef) {
  const preFocusGuardRef = import_react.useRef(null)
  function handlePreFocusGuardFocus(event) {
    import_react_dom.flushSync(() => {
      store.setOpen(
        false,
        createChangeEventDetails(focusOut, event.nativeEvent, event.currentTarget),
      )
    })
    getTabbableBeforeElement(preFocusGuardRef.current)?.focus()
  }
  function handleFocusTargetFocus(event) {
    const positionerElement = store.select("positionerElement")
    if (positionerElement && isOutsideEvent(event, positionerElement))
      store.context.beforeContentFocusGuardRef.current?.focus()
    else {
      import_react_dom.flushSync(() => {
        store.setOpen(
          false,
          createChangeEventDetails(focusOut, event.nativeEvent, event.currentTarget),
        )
      })
      let nextTabbable = getTabbableAfterElement(
        store.context.triggerFocusTargetRef.current || triggerElementRef.current,
      )
      while (nextTabbable !== null && contains(positionerElement, nextTabbable)) {
        const prevTabbable = nextTabbable
        nextTabbable = getNextTabbable(nextTabbable)
        if (nextTabbable === prevTabbable) break
      }
      nextTabbable?.focus()
    }
  }
  return {
    preFocusGuardRef,
    handlePreFocusGuardFocus,
    handleFocusTargetFocus,
  }
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/popover/trigger/PopoverTrigger.mjs
/**
 * A button that opens the popover.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Popover](https://base-ui.com/react/components/popover)
 */
const PopoverTrigger$1 = /*#__PURE__*/ import_react.forwardRef(
  function PopoverTrigger(componentProps, forwardedRef) {
    const {
      render,
      className,
      style,
      disabled = false,
      nativeButton = true,
      handle,
      payload,
      openOnHover = false,
      delay = 300,
      closeDelay = 0,
      id: idProp,
      ...elementProps
    } = componentProps
    const rootStore = usePopoverRootContext(true)
    const store = usePopupHandleStore(handle) ?? rootStore
    if (!store) throw new Error(formatErrorMessage(74))
    const thisTriggerId = useBaseUiId(idProp)
    const isTriggerActive = store.useState("isTriggerActive", thisTriggerId)
    const floatingContext = store.useState("floatingRootContext")
    const isOpenedByThisTrigger = store.useState("isOpenedByTrigger", thisTriggerId)
    const popupId = store.useState("triggerPopupId", thisTriggerId)
    const triggerElementRef = import_react.useRef(null)
    const { registerTrigger, isMountedByThisTrigger } = useTriggerDataForwarding(
      thisTriggerId,
      triggerElementRef,
      store,
      {
        payload,
        disabled,
        openOnHover,
        closeDelay,
      },
    )
    const openReason = store.useState("openChangeReason")
    const stickIfOpen = store.useState("stickIfOpen")
    const openMethod = store.useState("openMethod")
    const focusManagerModal = store.useState("focusManagerModal")
    const hoverProps = useHoverReferenceInteraction(floatingContext, {
      enabled:
        !disabled && openOnHover && (openMethod !== "touch" || openReason !== "trigger-press"),
      mouseOnly: true,
      move: false,
      handleClose: safePolygon(),
      restMs: delay,
      delay: { close: closeDelay },
      triggerElementRef,
      isActiveTrigger: isTriggerActive,
      isClosing: () => store.select("transitionStatus") === "ending",
    })
    const click = useClick(floatingContext, { stickIfOpen })
    const interactionTypeProps = useOpenMethodTriggerProps(
      () => store.select("open"),
      (interactionType) => {
        store.set("openMethod", interactionType)
      },
    )
    const rootTriggerProps = store.useState("triggerProps", isMountedByThisTrigger)
    const { getButtonProps, buttonRef } = useButton({
      disabled,
      native: nativeButton,
    })
    const stateAttributesMapping = {
      open(value) {
        if (value && openReason === "trigger-press")
          return pressableTriggerOpenStateMapping.open(value)
        return triggerOpenStateMapping.open(value)
      },
    }
    const { preFocusGuardRef, handlePreFocusGuardFocus, handleFocusTargetFocus } =
      useTriggerFocusGuards(store, triggerElementRef)
    const element = useRenderElement("button", componentProps, {
      state: {
        disabled,
        open: isOpenedByThisTrigger,
      },
      ref: [buttonRef, forwardedRef, registerTrigger, triggerElementRef],
      props: [
        click.reference,
        hoverProps,
        rootTriggerProps,
        interactionTypeProps,
        {
          [CLICK_TRIGGER_IDENTIFIER]: "",
          "id": thisTriggerId,
          "aria-haspopup": "dialog",
          "aria-expanded": isOpenedByThisTrigger,
          "aria-controls": popupId,
        },
        elementProps,
        getButtonProps,
      ],
      stateAttributesMapping,
    })
    const keyedElement = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(
      import_react.Fragment,
      { children: element },
      thisTriggerId,
    )
    if (isMountedByThisTrigger && !focusManagerModal)
      return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_react.Fragment, {
        children: [
          /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FocusGuard, {
            ref: preFocusGuardRef,
            onFocus: handlePreFocusGuardFocus,
          }),
          keyedElement,
          /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FocusGuard, {
            ref: store.context.triggerFocusTargetRef,
            onFocus: handleFocusTargetFocus,
          }),
        ],
      })
    return keyedElement
  },
)
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/popover/portal/PopoverPortalContext.mjs
const PopoverPortalContext = /*#__PURE__*/ import_react.createContext(void 0)
function usePopoverPortalContext() {
  const value = import_react.useContext(PopoverPortalContext)
  if (value === void 0) throw new Error(formatErrorMessage(45))
  return value
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/popover/portal/PopoverPortal.mjs
/**
 * A portal element that moves the popup to a different part of the DOM.
 * By default, the portal element is appended to `<body>`.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Popover](https://base-ui.com/react/components/popover)
 */
const PopoverPortal = /*#__PURE__*/ import_react.forwardRef(
  function PopoverPortal(props, forwardedRef) {
    const { keepMounted = false, ...portalProps } = props
    if (!(usePopoverRootContext().useState("mounted") || keepMounted)) return null
    return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PopoverPortalContext.Provider, {
      value: keepMounted,
      children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FloatingPortal, {
        ref: forwardedRef,
        ...portalProps,
      }),
    })
  },
)
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/popover/positioner/PopoverPositionerContext.mjs
const PopoverPositionerContext = /*#__PURE__*/ import_react.createContext(void 0)
function usePopoverPositionerContext() {
  const context = import_react.useContext(PopoverPositionerContext)
  if (!context) throw new Error(formatErrorMessage(46))
  return context
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/utils/useAnchoredPopupScrollLock.mjs
const VIEWPORT_WIDTH_TOLERANCE_PX = 20
/**
 * Manages scroll lock for anchored popups. For non-touch opens, scroll lock is applied when
 * enabled. For touch opens, scroll lock is applied only when the positioner width is effectively
 * viewport-sized.
 */
function useAnchoredPopupScrollLock(enabled, touchOpen, positionerElement, referenceElement) {
  const [touchOpenShouldLockScroll, setTouchOpenShouldLockScroll] = import_react.useState(false)
  useIsoLayoutEffect(() => {
    if (!enabled || !touchOpen || positionerElement == null) {
      setTouchOpenShouldLockScroll(false)
      return
    }
    const viewportWidth = ownerDocument(positionerElement).documentElement.clientWidth
    const popupWidth = positionerElement.offsetWidth
    setTouchOpenShouldLockScroll(
      viewportWidth > 0 &&
        popupWidth > 0 &&
        popupWidth >= viewportWidth - VIEWPORT_WIDTH_TOLERANCE_PX,
    )
  }, [enabled, touchOpen, positionerElement])
  useScrollLock(enabled && (!touchOpen || touchOpenShouldLockScroll), referenceElement)
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/popover/positioner/PopoverPositioner.mjs
/**
 * Positions the popover against the trigger.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Popover](https://base-ui.com/react/components/popover)
 */
const PopoverPositioner = /*#__PURE__*/ import_react.forwardRef(
  function PopoverPositioner(componentProps, forwardedRef) {
    const {
      render,
      className,
      style,
      anchor,
      positionMethod,
      side,
      align,
      sideOffset,
      alignOffset,
      collisionBoundary = "clipping-ancestors",
      collisionPadding,
      arrowPadding,
      sticky,
      disableAnchorTracking = false,
      collisionAvoidance = POPUP_COLLISION_AVOIDANCE,
      ...elementProps
    } = componentProps
    const store = usePopoverRootContext()
    const keepMounted = usePopoverPortalContext()
    const nodeId = useFloatingNodeId()
    const floatingRootContext = store.useState("floatingRootContext")
    const mounted = store.useState("mounted")
    const open = store.useState("open")
    const openReason = store.useState("openChangeReason")
    const triggerElement = store.useState("activeTriggerElement")
    const modal = store.useState("modal")
    const openMethod = store.useState("openMethod")
    const positionerElement = store.useState("positionerElement")
    const instantType = store.useState("instantType")
    const transitionStatus = store.useState("transitionStatus")
    const adaptiveOrigin = store.useState("adaptiveOrigin")
    const prevTriggerElementRef = import_react.useRef(null)
    const runOnceAnimationsFinish = useAnimationsFinished(positionerElement)
    const positioning = useAnchorPositioning({
      anchor,
      floatingRootContext,
      positionMethod,
      mounted,
      side,
      sideOffset,
      align,
      alignOffset,
      arrowPadding,
      collisionBoundary,
      collisionPadding,
      sticky,
      disableAnchorTracking,
      keepMounted,
      nodeId,
      collisionAvoidance,
      adaptiveOrigin,
    })
    const domReference = floatingRootContext.useState("domReferenceElement")
    useIsoLayoutEffect(() => {
      const currentTriggerElement = domReference
      const prevTriggerElement = prevTriggerElementRef.current
      if (currentTriggerElement) prevTriggerElementRef.current = currentTriggerElement
      if (
        prevTriggerElement &&
        currentTriggerElement &&
        currentTriggerElement !== prevTriggerElement
      ) {
        store.set("instantType", void 0)
        const ac = new AbortController()
        runOnceAnimationsFinish(() => {
          store.set("instantType", "trigger-change")
        }, ac.signal)
        return () => {
          ac.abort()
        }
      }
    }, [domReference, runOnceAnimationsFinish, store])
    const trueModalNonHover = modal === true && openReason !== "trigger-hover"
    useAnchoredPopupScrollLock(
      open && trueModalNonHover,
      openMethod === "touch",
      positionerElement,
      triggerElement,
    )
    const setPositionerElement = store.useStateSetter("positionerElement")
    const element = usePositioner(
      componentProps,
      {
        open,
        side: positioning.side,
        align: positioning.align,
        anchorHidden: positioning.anchorHidden,
        instant: instantType,
      },
      {
        styles: positioning.positionerStyles,
        transitionStatus,
        props: elementProps,
        refs: [forwardedRef, setPositionerElement],
        hidden: !mounted,
        inert: !open,
      },
    )
    return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(PopoverPositionerContext.Provider, {
      value: positioning,
      children: [
        mounted &&
          trueModalNonHover &&
          /*#__PURE__*/ (0, import_jsx_runtime.jsx)(InternalBackdrop, {
            inert: inertValue(!open),
            cutout: triggerElement,
          }),
        /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FloatingNode, {
          id: nodeId,
          children: element,
        }),
      ],
    })
  },
)
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/toolbar/root/ToolbarRootContext.mjs
const ToolbarRootContext = /*#__PURE__*/ import_react.createContext(void 0)
function useToolbarRootContext(optional) {
  const context = import_react.useContext(ToolbarRootContext)
  if (context === void 0 && !optional) throw new Error(formatErrorMessage(69))
  return context
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/utils/closePart.mjs
const ClosePartContext = /*#__PURE__*/ import_react.createContext(void 0)
function useClosePartCount() {
  const [closePartCount, setClosePartCount] = import_react.useState(0)
  const register = useStableCallback(() => {
    setClosePartCount((count) => count + 1)
    return () => {
      setClosePartCount((count) => Math.max(0, count - 1))
    }
  })
  return {
    context: import_react.useMemo(() => ({ register }), [register]),
    hasClosePart: closePartCount > 0,
  }
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/popover/popup/PopoverPopup.mjs
/**
 * A container for the popover contents.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Popover](https://base-ui.com/react/components/popover)
 */
const PopoverPopup = /*#__PURE__*/ import_react.forwardRef(
  function PopoverPopup(componentProps, forwardedRef) {
    const { render, className, style, initialFocus, finalFocus, ...elementProps } = componentProps
    const store = usePopoverRootContext()
    const positioner = usePopoverPositionerContext()
    const insideToolbar = useToolbarRootContext(true) != null
    const { context: closePartContext, hasClosePart } = useClosePartCount()
    const open = store.useState("open")
    const openMethod = store.useState("openMethod")
    const instantType = store.useState("instantType")
    const transitionStatus = store.useState("transitionStatus")
    const popupProps = store.useState("popupProps")
    const titleId = store.useState("titleElementId")
    const descriptionId = store.useState("descriptionElementId")
    const modal = store.useState("modal")
    const mounted = store.useState("mounted")
    const openReason = store.useState("openChangeReason")
    const activeTriggerElement = store.useState("activeTriggerElement")
    const floatingContext = store.useState("floatingRootContext")
    const floatingId = floatingContext.useState("floatingId")
    const disabled = store.useState("disabled")
    const openOnHover = store.useState("openOnHover")
    const closeDelay = store.useState("closeDelay")
    useOpenChangeComplete({
      open,
      ref: store.context.popupRef,
      onComplete() {
        if (open) store.context.onOpenChangeComplete?.(true)
      },
    })
    useHoverFloatingInteraction(floatingContext, {
      enabled: openOnHover && !disabled,
      closeDelay,
    })
    const resolvedInitialFocus =
      initialFocus === void 0 ? createDefaultInitialFocus(store.context.popupRef) : initialFocus
    const focusManagerModal = modal !== false && hasClosePart
    store.useSyncedValue("focusManagerModal", focusManagerModal)
    const setPopupElement = store.useStateSetter("popupElement")
    const element = useRenderElement("div", componentProps, {
      state: {
        open,
        side: positioner.side,
        align: positioner.align,
        instant: instantType,
        transitionStatus,
      },
      ref: [forwardedRef, store.context.popupRef, setPopupElement],
      props: [
        popupProps,
        {
          "id": floatingId,
          "role": "dialog",
          ...FOCUSABLE_POPUP_PROPS,
          "aria-labelledby": titleId,
          "aria-describedby": descriptionId,
          "onKeyDown"(event) {
            if (insideToolbar && COMPOSITE_KEYS.has(event.key)) event.stopPropagation()
          },
        },
        getDisabledMountTransitionStyles(transitionStatus),
        elementProps,
      ],
      stateAttributesMapping: popupTransitionStateMapping,
    })
    return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FloatingFocusManager, {
      context: floatingContext,
      openInteractionType: openMethod,
      modal: focusManagerModal,
      disabled: !mounted || openReason === "trigger-hover",
      initialFocus: resolvedInitialFocus,
      returnFocus: finalFocus,
      restoreFocus: "popup",
      previousFocusableElement: isHTMLElement(activeTriggerElement) ? activeTriggerElement : void 0,
      nextFocusableElement: store.context.triggerFocusTargetRef,
      beforeContentFocusGuardRef: store.context.beforeContentFocusGuardRef,
      children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ClosePartContext.Provider, {
        value: closePartContext,
        children: element,
      }),
    })
  },
)
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/popover/backdrop/PopoverBackdrop.mjs
/**
 * An overlay displayed beneath the popover.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Popover](https://base-ui.com/react/components/popover)
 */
const PopoverBackdrop = /*#__PURE__*/ import_react.forwardRef(
  function PopoverBackdrop(props, forwardedRef) {
    const { render, className, style, ...elementProps } = props
    const store = usePopoverRootContext()
    const open = store.useState("open")
    const mounted = store.useState("mounted")
    const transitionStatus = store.useState("transitionStatus")
    const openReason = store.useState("openChangeReason")
    return useRenderElement("div", props, {
      state: {
        open,
        transitionStatus,
      },
      ref: forwardedRef,
      props: [
        {
          role: "presentation",
          hidden: !mounted,
          style: {
            pointerEvents: openReason === "trigger-hover" ? "none" : void 0,
            userSelect: "none",
            WebkitUserSelect: "none",
          },
        },
        elementProps,
      ],
      stateAttributesMapping: popupTransitionStateMapping,
    })
  },
)
//#endregion
//#region src/components/ui/popover.tsx
function Popover({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverRoot, {
    "data-slot": "popover",
    ...props,
  })
}
function PopoverTrigger({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger$1, {
    "data-slot": "popover-trigger",
    ...props,
  })
}
function PopoverContent({
  className,
  align = "center",
  alignOffset = 0,
  anchor,
  backdrop = false,
  collisionPadding,
  side = "bottom",
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverPortal, {
    children: [
      backdrop
        ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverBackdrop, {
            "data-slot": "popover-backdrop",
            "className":
              "fixed inset-0 z-40 bg-black/10 transition-opacity duration-100 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs",
          })
        : null,
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverPositioner, {
        align,
        alignOffset,
        anchor,
        collisionPadding,
        side,
        sideOffset,
        className: "isolate z-50",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverPopup, {
          "data-slot": "popover-content",
          "className": cn(
            "z-50 flex w-72 origin-(--transform-origin) flex-col gap-2.5 rounded-none bg-popover p-2.5 text-xs text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className,
          ),
          ...props,
        }),
      }),
    ],
  })
}
//#endregion
//#region src/features/shell/navigation.tsx
const NAV_ENTRIES = [
  {
    page: "extract",
    to: "/",
    label: "提取转换",
    compactLabel: "转换",
    icon: IconTransform,
    admin: false,
  },
  {
    page: "subscriptions",
    to: "/subscriptions",
    label: "订阅管理",
    compactLabel: "订阅",
    icon: IconDatabase,
    admin: true,
  },
]
function visibleNavEntries(tokenUsable) {
  return NAV_ENTRIES.filter((entry) => tokenUsable || !entry.admin)
}
function NavMenu({ active, anchor }) {
  const tokenUsable = useTokenUsable()
  const [open, setOpen] = (0, import_react.useState)(false)
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
    open,
    onOpenChange: setOpen,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
        render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
          "type": "button",
          "aria-label": "打开导航",
          "className": "inline-flex size-10 items-center justify-center",
        }),
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconMenu2, {
          className: "size-4.25",
        }),
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
        align: "center",
        anchor,
        backdrop: true,
        collisionPadding: 0,
        sideOffset: 0,
        className: "w-(--anchor-width) gap-0 border-b p-0 ring-0",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
          className: "flex flex-col",
          children: visibleNavEntries(tokenUsable).map((entry) =>
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              Link,
              {
                "to": entry.to,
                "viewTransition": true,
                "onClick": () => setOpen(false),
                "data-active": active === entry.page,
                "className":
                  "flex h-14 items-center gap-3 border-b px-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase last:border-b-0 data-[active=true]:bg-muted data-[active=true]:text-foreground",
                "children": [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(entry.icon, { className: "size-4" }),
                  entry.label,
                ],
              },
              entry.page,
            ),
          ),
        }),
      }),
    ],
  })
}
//#endregion
//#region src/features/shell/app-shell.tsx
function AppShell({ active, children }) {
  const tokenUsable = useTokenUsable()
  const { setOpen: setPanelOpen } = useConnectionPanel()
  const [maskGone, setMaskGone] = (0, import_react.useState)(false)
  const header = (0, import_react.useRef)(null)
  const hydrated = useHydrated()
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    className: "flex h-dvh flex-col overflow-hidden",
    children: [
      maskGone
        ? null
        : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
            "role": "status",
            "aria-label": "正在确认管理连接",
            "data-settled": hydrated,
            "onTransitionEnd": () => setMaskGone(true),
            "className":
              "fixed inset-0 z-[60] flex items-center justify-center bg-background transition-opacity duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] data-[settled=true]:pointer-events-none data-[settled=true]:opacity-0",
            "children": /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconLoader2, {
              className: "size-5 animate-spin text-muted-foreground",
            }),
          }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
        ref: header,
        className: "z-50 shrink-0 border-b bg-background",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          className:
            "mx-auto flex h-12 w-full max-w-340 items-center justify-between gap-4 px-4 md:h-13 md:px-5",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
              to: "/",
              viewTransition: true,
              className:
                "font-heading text-sm font-semibold tracking-[0.08em] text-foreground uppercase md:text-[15px] lg:text-[17px]",
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Cuttle" }),
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              className: "hidden items-center gap-3 md:flex lg:gap-3.5",
              children: [
                visibleNavEntries(tokenUsable).map((entry) =>
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                    Link,
                    {
                      "to": entry.to,
                      "viewTransition": true,
                      "data-active": active === entry.page,
                      "className":
                        "inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase transition-colors hover:text-foreground data-[active=true]:text-foreground lg:gap-1.75 lg:text-xs",
                      "children": [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(entry.icon, {
                          className: "size-3.5",
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                          className: "lg:hidden",
                          children: entry.compactLabel,
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                          className: "hidden lg:inline",
                          children: entry.label,
                        }),
                      ],
                    },
                    entry.page,
                  ),
                ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {
                  orientation: "vertical",
                  className: "h-3.5 lg:h-4",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
                  type: "button",
                  onClick: () => setPanelOpen(true),
                  className:
                    "inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] text-muted-foreground uppercase transition-colors hover:text-foreground",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectionDot, {
                      connected: tokenUsable,
                    }),
                    tokenUsable ? "已连接" : "未连接",
                  ],
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              className: "flex items-center gap-1 md:hidden",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
                  "type": "button",
                  "aria-label": "管理连接",
                  "onClick": () => setPanelOpen(true),
                  "className": "inline-flex size-10 items-center justify-center",
                  "children": /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectionDot, {
                    connected: tokenUsable,
                  }),
                }),
                tokenUsable
                  ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavMenu, {
                      active,
                      anchor: header,
                    })
                  : null,
              ],
            }),
          ],
        }),
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
        className:
          "mx-auto flex w-full max-w-340 min-h-0 flex-1 flex-col overflow-y-auto lg:border-x",
        children,
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectionPanel, {}),
    ],
  })
}
//#endregion
//#region src/components/ui/empty.tsx
function Empty({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    "data-slot": "empty",
    "className": cn(
      "flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-4 rounded-none border-dashed p-6 text-center text-balance",
      className,
    ),
    ...props,
  })
}
function EmptyHeader({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    "data-slot": "empty-header",
    "className": cn("flex max-w-sm flex-col items-center gap-2", className),
    ...props,
  })
}
const emptyMediaVariants = tv({
  base: "mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  variants: {
    variant: {
      default: "bg-transparent",
      icon: "flex size-8 shrink-0 items-center justify-center rounded-none bg-muted text-foreground [&_svg:not([class*='size-'])]:size-4",
    },
  },
  defaultVariants: { variant: "default" },
})
function EmptyMedia({ className, variant = "default", ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    "data-slot": "empty-icon",
    "data-variant": variant,
    "className": cn(
      emptyMediaVariants({
        variant,
        className,
      }),
    ),
    ...props,
  })
}
function EmptyTitle({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    "data-slot": "empty-title",
    "className": cn("font-heading text-sm font-medium", className),
    ...props,
  })
}
function EmptyDescription({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    "data-slot": "empty-description",
    "className": cn(
      "text-xs/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
      className,
    ),
    ...props,
  })
}
function EmptyContent({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    "data-slot": "empty-content",
    "className": cn(
      "flex w-full max-w-sm min-w-0 flex-col items-center gap-2.5 text-xs text-balance",
      className,
    ),
    ...props,
  })
}
//#endregion
//#region src/features/shell/connection-gate.tsx
/**
 * Decides between the page, the password prompt and leaving. A password restored from sessionStorage
 * is deliberately unverified; the effect below probes it through the same authenticated session route
 * before protected content renders. Passwords entered in the panel use that same probe in
 * `session/queries.ts` before they are committed.
 */
function ConnectionGate({ children }) {
  const navigate = useNavigate()
  const token = useToken()
  const tokenUsable = useTokenUsable()
  const tokenRefused = useTokenRefused()
  const tokenVerified = useTokenVerified()
  const connect = useConnect()
  const { open: panelOpen, setOpen: setPanelOpen } = useConnectionPanel()
  const checking = (0, import_react.useRef)(false)
  ;(0, import_react.useEffect)(() => {
    if (!hasToken(token) || tokenVerified || tokenRefused || panelOpen || checking.current) return
    checking.current = true
    connect(token)
      .catch((error) => {
        if (error instanceof ApiError && error.code === "unauthorized") clearToken()
        showError(error, "无法验证访问密码。")
        setPanelOpen(true)
      })
      .finally(() => {
        checking.current = false
      })
  }, [connect, panelOpen, setPanelOpen, token, tokenRefused, tokenVerified])
  const leaving = tokenRefused && !panelOpen
  ;(0, import_react.useEffect)(() => {
    if (leaving)
      navigate({
        to: "/",
        replace: true,
        viewTransition: true,
      })
  }, [navigate, leaving])
  if (tokenUsable) return children
  if (hasToken(token) && !tokenVerified && !panelOpen)
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
      className: "flex-1 border-b",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(EmptyHeader, {
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyMedia, {
            variant: "icon",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconLoader2, {
              className: "animate-spin",
            }),
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyTitle, { children: "正在验证访问密码" }),
        ],
      }),
    })
  if (leaving)
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
      className: "flex-1 border-b",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyHeader, {
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyMedia, {
          variant: "icon",
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconLoader2, {
            className: "animate-spin",
          }),
        }),
      }),
    })
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Empty, {
    className: "flex-1 border-b",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(EmptyHeader, {
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyMedia, {
            variant: "icon",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconPlugConnected, {}),
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyTitle, { children: "请输入访问密码" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyDescription, {
            children: "Cuttle 是单用户管理工具。密码通过服务端验证后，只保留在当前浏览器会话。",
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyContent, {
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
          onClick: () => setPanelOpen(true),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconPlugConnected, {
              "data-icon": "inline-start",
            }),
            "输入访问密码",
          ],
        }),
      }),
    ],
  })
}
//#endregion
//#region src/features/shell/not-found.tsx
/**
 * Deliberately outside `AppShell`: an address that does not exist has no page to be a header
 * for, and no navigation of its own worth offering beyond the way back.
 */
function NotFound() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Empty, {
    className: "h-dvh border-0",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(EmptyHeader, {
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyMedia, {
            variant: "icon",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconError404, {}),
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyTitle, { children: "找不到这个页面" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyDescription, {
            children: "这个地址不存在，或者已经被删掉了。",
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyContent, {
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
          to: "/",
          viewTransition: true,
          className: cn(buttonVariants(), "max-md:h-11 max-md:w-full"),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconHome, { "data-icon": "inline-start" }),
            "回首页",
          ],
        }),
      }),
    ],
  })
}
//#endregion
export {
  showSuccess as $,
  environmentManager as $n,
  transitionStatusMapping as $t,
  DialogBackdrop as A,
  useAnimationFrame as An,
  FloatingPortal as At,
  ARROW_RIGHT as B,
  useIsoLayoutEffect as Bn,
  outsidePress as Bt,
  FieldGroup as C,
  ARROW_LEFT$1 as Cn,
  useDismiss as Ct,
  useMediaQuery as D,
  webkit as Dn,
  useFloatingTree as Dt,
  SideSurface as E,
  jsdom as En,
  useFloatingParentNodeId as Et,
  useControlled as F,
  isHTMLElement as Fn,
  initial as Ft,
  isNativeInput as G,
  useQueryClient as Gn,
  CompositeRootContext as Gt,
  COMPOSITE_KEYS as H,
  EMPTY_ARRAY$1 as Hn,
  windowResize as Ht,
  DialogPortal as I,
  ReactStore as In,
  itemPress as It,
  useBaseUiId as J,
  Query as Jn,
  clamp as Jt,
  scrollIntoViewIfNeeded as K,
  Mutation as Kn,
  useCompositeRootContext as Kt,
  InternalBackdrop as L,
  useStableCallback as Ln,
  listNavigation as Lt,
  useValueChanged as M,
  ownerDocument as Mn,
  cancelOpen as Mt,
  DialogTitle as N,
  getWindow as Nn,
  disabled as Nt,
  DialogRoot as O,
  useTimeout as On,
  enqueueFocus as Ot,
  useRenderDialogRoot as P,
  isElement as Pn,
  focusOut as Pt,
  showError as Q,
  pendingThenable as Qn,
  TransitionStatusDataAttributes as Qt,
  ARROW_DOWN as R,
  useStore as Rn,
  missing as Rt,
  FieldError as S,
  ARROW_DOWN$1 as Sn,
  useStructuralSharing as Sr,
  platform as St,
  FieldTitle as T,
  ARROW_UP$1 as Tn,
  FloatingFocusManager as Tt,
  HOME as U,
  EMPTY_OBJECT as Un,
  useButton as Ut,
  ARROW_UP as V,
  useRefWithInit as Vn,
  triggerPress as Vt,
  MODIFIER_KEYS as W,
  QueryClientProvider as Wn,
  dispatchClickWithModifiers as Wt,
  Separator as X,
  onlineManager as Xn,
  useOpenChangeComplete as Xt,
  DialogClose as Y,
  fetchState as Yn,
  DROPDOWN_COLLISION_AVOIDANCE as Yt,
  noteAuthFailure as Z,
  notifyManager as Zn,
  useAnimationsFinished as Zt,
  useFieldRootContext as _,
  getFloatingFocusElement as _n,
  Subscribable as _r,
  useDirection as _t,
  EmptyDescription as a,
  visuallyHidden as an,
  matchQuery as ar,
  IconX as at,
  FieldContent as b,
  contains as bn,
  getRouteApi as br,
  useTransitionStatus as bt,
  EmptyTitle as c,
  getMaxListIndex as cn,
  replaceData as cr,
  IconDatabase as ct,
  useAnchoredPopupScrollLock as d,
  isIndexOutOfListBounds as dn,
  shallowEqualObjects as dr,
  usePositioner as dt,
  inertValue as en,
  functionalUpdate as er,
  Toaster as et,
  Input as f,
  isListIndexDisabled as fn,
  shouldThrowError as fr,
  getDisabledMountTransitionStyles as ft,
  useFormContext as g,
  stopEvent as gn,
  focusManager as gr,
  useAnchorPositioning as gt,
  useLabelableContext as h,
  isVirtualPointerEvent as hn,
  timeoutManager as hr,
  triggerOpenStateMapping as ht,
  EmptyContent as i,
  useMergedRefs as in,
  matchMutation as ir,
  tv as it,
  useOpenInteractionType as j,
  addEventListener as jn,
  createChangeEventDetails as jt,
  DialogPopup as k,
  AnimationFrame as kn,
  useValueAsRef as kt,
  AppShell as l,
  getMinListIndex as ln,
  resolveQueryBoolean as lr,
  IconAlertTriangle as lt,
  useLabelableId as m,
  isVirtualClick as mn,
  timeUntilStale as mr,
  pressableTriggerOpenStateMapping as mt,
  ConnectionGate as n,
  mergeProps as nn,
  hashQueryKeyByOptions as nr,
  buttonVariants as nt,
  EmptyHeader as o,
  visuallyHiddenInput as on,
  noop$1 as or,
  IconTransform as ot,
  useRegisterFieldControl as p,
  rectToClientRect as pn,
  skipToken as pr,
  popupStateMapping as pt,
  DialogDescription as q,
  getDefaultState as qn,
  useId as qt,
  Empty as r,
  resolveStyle as rn,
  isValidTimeout as rr,
  cn as rt,
  EmptyMedia as s,
  findNonDisabledListIndex as sn,
  partialMatchKey as sr,
  IconLoader2 as st,
  NotFound as t,
  useRenderElement as tn,
  hashKey as tr,
  Button as tt,
  useToolbarRootContext as u,
  isElementVisible as un,
  resolveStaleTime as ur,
  createReactComponent as ut,
  fieldValidityMapping as v,
  isTypeableCombobox as vn,
  createRootRouteWithContext as vr,
  PopupTriggerMap as vt,
  FieldLabel as w,
  ARROW_RIGHT$1 as wn,
  useClick as wt,
  FieldDescription as x,
  getTarget as xn,
  Link as xr,
  FloatingRootStore as xt,
  Field as y,
  activeElement as yn,
  createRoute as yr,
  FOCUSABLE_POPUP_PROPS as yt,
  ARROW_LEFT as z,
  formatErrorMessage as zn,
  none as zt,
}
