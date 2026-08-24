import {
  c as require_react,
  t as createMiddleware,
  u as __toESM,
} from "./createMiddleware-CkzUAgXb.js"
import {
  a as getScriptPreloadAttrs,
  c as resolveManifestCssLink,
  d as RouterCore,
  h as createNonReactiveReadonlyStore,
  i as getAssetCrossOrigin,
  l as _getAssetMatches,
  m as createNonReactiveMutableStore,
  t as appendUniqueUserTags,
} from "./manifest-eNueMSOI.js"
import {
  C as RATE_LIMITED_MESSAGE,
  S as INTERNAL_MESSAGE,
  T as authorizeAdminRequest,
  a as TARGET_IDS,
  o as targetDefinition,
  r as MAX_SOURCE_SIZE,
  w as UNAUTHORIZED_MESSAGE,
  x as AdminFailure,
} from "./nodes-b2qYjNQG.js"
import {
  a as listSubscriptions,
  c as removeSubscription,
  d as updateSubscription,
  f as subscriptionDelivery,
  i as getSubscriptionLink,
  l as reorderSubscriptions,
  n as createSubscription,
  r as getSubscription,
  s as registerSubscriptionLink,
  t as appendSubscriptionNodes,
  u as rotateSubscriptionToken,
} from "./operations-BGD-JhgG.js"
import {
  H as isModuleNotFoundError,
  R as escapeHtml,
  d as require_jsx_runtime,
  f as reactUse,
  s as useRouter,
  u as useHydrated,
} from "./react-dom-C7iwyEt6.js"
import {
  Jn as Query,
  Kn as Mutation,
  Wn as QueryClientProvider,
  Xn as onlineManager,
  Z as noteAuthFailure,
  Zn as notifyManager,
  _r as Subscribable,
  ar as matchQuery,
  er as functionalUpdate,
  et as Toaster,
  gr as focusManager,
  ir as matchMutation,
  nr as hashQueryKeyByOptions,
  or as noop,
  pr as skipToken,
  sr as partialMatchKey,
  t as NotFound,
  tr as hashKey,
  ur as resolveStaleTime,
  vr as createRootRouteWithContext,
  yr as createRoute,
} from "./shell-CGXDXMPw.js"
//#region node_modules/.pnpm/@tanstack+store@0.9.3/node_modules/@tanstack/store/dist/esm/alien.js
const ReactiveFlags = /* @__PURE__ */ ((ReactiveFlags2) => {
  ReactiveFlags2[(ReactiveFlags2["None"] = 0)] = "None"
  ReactiveFlags2[(ReactiveFlags2["Mutable"] = 1)] = "Mutable"
  ReactiveFlags2[(ReactiveFlags2["Watching"] = 2)] = "Watching"
  ReactiveFlags2[(ReactiveFlags2["RecursedCheck"] = 4)] = "RecursedCheck"
  ReactiveFlags2[(ReactiveFlags2["Recursed"] = 8)] = "Recursed"
  ReactiveFlags2[(ReactiveFlags2["Dirty"] = 16)] = "Dirty"
  ReactiveFlags2[(ReactiveFlags2["Pending"] = 32)] = "Pending"
  return ReactiveFlags2
})(ReactiveFlags || {})
// @__NO_SIDE_EFFECTS__
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
  function unlink(link2, sub = link2.sub) {
    const dep = link2.dep
    const prevDep = link2.prevDep
    const nextDep = link2.nextDep
    const nextSub = link2.nextSub
    const prevSub = link2.prevSub
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
  function propagate(link2) {
    let next = link2.nextSub
    let stack
    top: do {
      const sub = link2.sub
      let flags = sub.flags
      if (!(flags & 60)) sub.flags = flags | 32
      else if (!(flags & 12)) flags = 0
      else if (!(flags & 4)) sub.flags = (flags & -9) | 32
      else if (!(flags & 48) && isValidLink(link2, sub)) {
        sub.flags = flags | 40
        flags &= 1
      } else flags = 0
      if (flags & 2) notify(sub)
      if (flags & 1) {
        const subSubs = sub.subs
        if (subSubs !== void 0) {
          const nextSub = (link2 = subSubs).nextSub
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
      if ((link2 = next) !== void 0) {
        next = link2.nextSub
        continue
      }
      while (stack !== void 0) {
        link2 = stack.value
        stack = stack.prev
        if (link2 !== void 0) {
          next = link2.nextSub
          continue top
        }
      }
      break
    } while (true)
  }
  function checkDirty(link2, sub) {
    let stack
    let checkDepth = 0
    let dirty = false
    top: do {
      const dep = link2.dep
      const flags = dep.flags
      if (sub.flags & 16) dirty = true
      else if ((flags & 17) === 17) {
        if (update(dep)) {
          const subs = dep.subs
          if (subs.nextSub !== void 0) shallowPropagate(subs)
          dirty = true
        }
      } else if ((flags & 33) === 33) {
        if (link2.nextSub !== void 0 || link2.prevSub !== void 0)
          stack = {
            value: link2,
            prev: stack,
          }
        link2 = dep.deps
        sub = dep
        ++checkDepth
        continue
      }
      if (!dirty) {
        const nextDep = link2.nextDep
        if (nextDep !== void 0) {
          link2 = nextDep
          continue
        }
      }
      while (checkDepth--) {
        const firstSub = sub.subs
        const hasMultipleSubs = firstSub.nextSub !== void 0
        if (hasMultipleSubs) {
          link2 = stack.value
          stack = stack.prev
        } else link2 = firstSub
        if (dirty) {
          if (update(sub)) {
            if (hasMultipleSubs) shallowPropagate(firstSub)
            sub = link2.sub
            continue
          }
          dirty = false
        } else sub.flags &= -33
        sub = link2.sub
        const nextDep = link2.nextDep
        if (nextDep !== void 0) {
          link2 = nextDep
          continue top
        }
      }
      return dirty
    } while (true)
  }
  function shallowPropagate(link2) {
    do {
      const sub = link2.sub
      const flags = sub.flags
      if ((flags & 48) === 32) {
        sub.flags = flags | 16
        if ((flags & 6) === 2) notify(sub)
      }
    } while ((link2 = link2.nextSub) !== void 0)
  }
  function isValidLink(checkLink, sub) {
    let link2 = sub.depsTail
    while (link2 !== void 0) {
      if (link2 === checkLink) return true
      link2 = link2.prevDep
    }
    return false
  }
}
const queuedEffects = []
const { link, unlink, propagate, checkDirty, shallowPropagate } =
  /* @__PURE__ */ createReactiveSystem({
    update(atom) {
      return atom._update()
    },
    notify(effect2) {
      queuedEffects[queuedEffectsLength++] = effect2
      effect2.flags &= ~ReactiveFlags.Watching
    },
    unwatched(atom) {
      if (atom.depsTail !== void 0) {
        atom.depsTail = void 0
        atom.flags = ReactiveFlags.Mutable | ReactiveFlags.Dirty
        purgeDeps(atom)
      }
    },
  })
let queuedEffectsLength = 0
function purgeDeps(sub) {
  const depsTail = sub.depsTail
  let dep = depsTail !== void 0 ? depsTail.nextDep : sub.deps
  while (dep !== void 0) dep = unlink(dep, sub)
}
//#endregion
//#region node_modules/.pnpm/@tanstack+react-router@1.17_a412b0d82c3a1e1649d65373a448407f/node_modules/@tanstack/react-router/dist/esm/fileRoute.js
/**
 * Creates a file-based Route factory for a given path.
 *
 * Used by TanStack Router's file-based routing to associate a file with a
 * route. The returned function accepts standard route options. In normal usage
 * the `path` string is inserted and maintained by the `tsr` generator.
 *
 * @param path File path literal for the route (usually auto-generated).
 * @returns A function that accepts Route options and returns a Route instance.
 * @link https://tanstack.com/router/latest/docs/framework/react/api/router/createFileRouteFunction
 */
function createFileRoute(path) {
  return (options) => {
    const route = createRoute(options)
    route.isRoot = false
    return route
  }
}
//#endregion
//#region node_modules/.pnpm/@tanstack+react-router@1.17_a412b0d82c3a1e1649d65373a448407f/node_modules/@tanstack/react-router/dist/esm/lazyRouteComponent.js
const import_react = /* @__PURE__ */ __toESM(require_react(), 1)
/**
 * Wrap a dynamic import to create a route component that supports
 * `.preload()` and friendly reload-on-module-missing behavior.
 *
 * @param importer Function returning a module promise
 * @param exportName Named export to use (default: `default`)
 * @returns A lazy route component compatible with TanStack Router
 * @link https://tanstack.com/router/latest/docs/framework/react/api/router/lazyRouteComponentFunction
 */
function lazyRouteComponent(importer, exportName) {
  let loadPromise
  let comp
  let error
  const load = () => {
    if (!loadPromise) {
      error = void 0
      loadPromise = importer()
        .then((res) => {
          comp = res[exportName ?? "default"]
        })
        .catch((error) => {
          loadPromise = void 0
          error = error
        })
    }
    return loadPromise
  }
  const lazyComp = function Lazy(props) {
    if (error) {
      if (isModuleNotFoundError(error) && false);
      throw error
    }
    if (!comp)
      if (reactUse) reactUse(load())
      else throw load()
    return import_react.createElement(comp, props)
  }
  lazyComp.preload = load
  return lazyComp
}
//#endregion
//#region node_modules/.pnpm/@tanstack+react-router@1.17_a412b0d82c3a1e1649d65373a448407f/node_modules/@tanstack/react-router/dist/esm/routerStores.js
const getStoreFactory = (opts) => {
  return {
    createMutableStore: createNonReactiveMutableStore,
    createReadonlyStore: createNonReactiveReadonlyStore,
    batch: (fn) => fn(),
  }
}
//#endregion
//#region node_modules/.pnpm/@tanstack+react-router@1.17_a412b0d82c3a1e1649d65373a448407f/node_modules/@tanstack/react-router/dist/esm/router.js
/**
 * Creates a new Router instance for React.
 *
 * Pass the returned router to `RouterProvider` to enable routing.
 * Notable options: `routeTree` (your route definitions) and `context`
 * (required if the root route was created with `createRootRouteWithContext`).
 *
 * @param options Router options used to configure the router.
 * @returns A Router instance to be provided to `RouterProvider`.
 * @link https://tanstack.com/router/latest/docs/framework/react/api/router/createRouterFunction
 */
const createRouter = (options) => {
  return new Router(options)
}
const Router = class extends RouterCore {
  constructor(options) {
    super(options, getStoreFactory)
  }
}
//#endregion
//#region node_modules/.pnpm/@tanstack+react-router@1.17_a412b0d82c3a1e1649d65373a448407f/node_modules/@tanstack/react-router/dist/esm/Asset.js
const import_jsx_runtime = require_jsx_runtime()
const noopScriptHandler = () => {}
function setScriptAttrs(script, attrs) {
  if (!attrs) return
  for (const [key, value] of Object.entries(attrs))
    if (key !== "suppressHydrationWarning" && value !== void 0 && value !== false)
      script.setAttribute(key, typeof value === "boolean" ? "" : String(value))
}
function Asset(asset) {
  const { attrs, children, nonce, preventScriptHoist } = asset
  switch (asset.tag) {
    case "title":
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", {
        ...attrs,
        suppressHydrationWarning: true,
        children,
      })
    case "meta":
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
        ...attrs,
        suppressHydrationWarning: true,
      })
    case "link":
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("link", {
        ...attrs,
        precedence: attrs?.precedence ?? (attrs?.rel === "stylesheet" ? "default" : void 0),
        nonce,
        suppressHydrationWarning: true,
      })
    case "style":
      if (asset.inlineCss && false);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", {
        ...attrs,
        dangerouslySetInnerHTML: { __html: children },
        nonce,
      })
    case "script":
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Script, {
        attrs,
        preventScriptHoist,
        children,
      })
    default:
      return null
  }
}
function Script({ attrs, children, preventScriptHoist }) {
  useRouter()
  useHydrated()
  const dataScript =
    typeof attrs?.type === "string" &&
    attrs.type !== "" &&
    attrs.type !== "text/javascript" &&
    attrs.type !== "module"
  import_react.useEffect(() => {
    if (dataScript) return
    if (attrs?.src) {
      const normSrc = (() => {
        try {
          const base = document.baseURI || window.location.href
          return new URL(attrs.src, base).href
        } catch {
          return attrs.src
        }
      })()
      for (const el of document.querySelectorAll("script[src]")) if (el.src === normSrc) return
      const script = document.createElement("script")
      setScriptAttrs(script, attrs)
      document.head.appendChild(script)
      return () => script.remove()
    }
    if (typeof children === "string") {
      const typeAttr = typeof attrs?.type === "string" ? attrs.type : "text/javascript"
      const nonceAttr = typeof attrs?.nonce === "string" ? attrs.nonce : void 0
      for (const el of document.querySelectorAll("script:not([src])")) {
        if (!(el instanceof HTMLScriptElement)) continue
        const sType = el.getAttribute("type") ?? "text/javascript"
        const sNonce = el.getAttribute("nonce") ?? void 0
        if (el.textContent === children && sType === typeAttr && sNonce === nonceAttr) return
      }
      const script = document.createElement("script")
      script.textContent = children
      setScriptAttrs(script, attrs)
      document.head.appendChild(script)
      return () => script.remove()
    }
  }, [attrs, children, dataScript])
  if (attrs?.src) {
    if (!preventScriptHoist)
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
        ...attrs,
        suppressHydrationWarning: true,
      })
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
      ...attrs,
      onLoad: noopScriptHandler,
      suppressHydrationWarning: true,
    })
  }
  if (typeof children === "string")
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
      ...attrs,
      dangerouslySetInnerHTML: { __html: children },
      suppressHydrationWarning: true,
    })
  return null
}
//#endregion
//#region node_modules/.pnpm/@tanstack+react-router@1.17_a412b0d82c3a1e1649d65373a448407f/node_modules/@tanstack/react-router/dist/esm/headContentUtils.js
function buildTagsFromMatches(router, nonce, matches, assetCrossOrigin) {
  matches = _getAssetMatches(matches)
  const routeMeta = matches.map((match) => match.meta).filter((meta) => meta !== void 0)
  const resultMeta = []
  const metaByAttribute = {}
  let title
  for (let i = routeMeta.length - 1; i >= 0; i--) {
    const metas = routeMeta[i]
    for (let j = metas.length - 1; j >= 0; j--) {
      const m = metas[j]
      if (!m) continue
      if (m.title) {
        if (!title)
          title = {
            tag: "title",
            children: m.title,
          }
      } else if ("script:ld+json" in m)
        try {
          const json = JSON.stringify(m["script:ld+json"])
          resultMeta.push({
            tag: "script",
            attrs: { type: "application/ld+json" },
            children: escapeHtml(json),
          })
        } catch {}
      else {
        const attribute = m.name ?? m.property
        if (attribute)
          if (metaByAttribute[attribute]) continue
          else metaByAttribute[attribute] = true
        resultMeta.push({
          tag: "meta",
          attrs: {
            ...m,
            nonce,
          },
        })
      }
    }
  }
  if (title) resultMeta.push(title)
  if (nonce)
    resultMeta.push({
      tag: "meta",
      attrs: {
        property: "csp-nonce",
        content: nonce,
      },
    })
  resultMeta.reverse()
  const constructedLinks = matches
    .flatMap((match) => match.links ?? [])
    .filter((link) => link !== void 0)
    .map((link) => ({
      tag: "link",
      attrs: {
        ...link,
        nonce,
      },
    }))
  const manifest = router.ssr?.manifest
  const manifestCssTags = []
  if (manifest) {
    matches.forEach((match) => {
      manifest.routes[match.routeId]?.css?.forEach((link) => {
        const resolvedLink = resolveManifestCssLink(link)
        manifestCssTags.push({
          tag: "link",
          attrs: {
            rel: "stylesheet",
            ...resolvedLink,
            crossOrigin:
              getAssetCrossOrigin(assetCrossOrigin, "stylesheet") ?? resolvedLink.crossOrigin,
            suppressHydrationWarning: true,
            nonce,
          },
        })
      })
    })
    if (manifest.inlineStyle)
      manifestCssTags.push({
        tag: "style",
        attrs: {
          ...manifest.inlineStyle.attrs,
          nonce,
        },
        children: manifest.inlineStyle.children,
        inlineCss: true,
      })
  }
  const preloadLinks = []
  if (manifest)
    matches.forEach((match) => {
      manifest.routes[match.routeId]?.preloads?.forEach((preload) => {
        preloadLinks.push({
          tag: "link",
          attrs: {
            ...getScriptPreloadAttrs(manifest, preload, assetCrossOrigin),
            nonce,
          },
        })
      })
    })
  const styles = matches
    .flatMap((match) => match.styles ?? [])
    .filter((style) => style !== void 0)
    .map(({ children, ...attrs }) => ({
      tag: "style",
      attrs: {
        ...attrs,
        nonce,
      },
      children,
    }))
  const headScripts = matches
    .flatMap((match) => match.headScripts ?? [])
    .filter((script) => script !== void 0)
    .map(({ children, ...script }) => ({
      tag: "script",
      attrs: {
        ...script,
        nonce,
      },
      children,
    }))
  const tags = []
  appendUniqueUserTags(tags, resultMeta)
  tags.push(...preloadLinks)
  appendUniqueUserTags(tags, constructedLinks)
  tags.push(...manifestCssTags)
  appendUniqueUserTags(tags, styles)
  appendUniqueUserTags(tags, headScripts)
  return tags
}
/**
 * Build the head/link/meta/script tags from the renderable presented prefix.
 * Used internally by `HeadContent`.
 */
const useTags = (assetCrossOrigin) => {
  const router = useRouter()
  const nonce = router.options.ssr?.nonce
  return buildTagsFromMatches(router, nonce, router.stores.matches.get(), assetCrossOrigin)
}
//#endregion
//#region node_modules/.pnpm/@tanstack+react-router@1.17_a412b0d82c3a1e1649d65373a448407f/node_modules/@tanstack/react-router/dist/esm/HeadContent.js
/**
 * Render route-managed head tags (title, meta, links, styles, head scripts).
 * Place inside the document head of your app shell.
 * @link https://tanstack.com/router/latest/docs/framework/react/guide/document-head-management
 */
function HeadContent(props) {
  const tags = useTags(props.assetCrossOrigin)
  const nonce = useRouter().options.ssr?.nonce
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {
    children: tags.map((tag) =>
      /* @__PURE__ */ (0, import_react.createElement)(Asset, {
        ...tag,
        key: `tsr-meta-${JSON.stringify(tag)}`,
        nonce,
      }),
    ),
  })
}
//#endregion
//#region node_modules/.pnpm/@tanstack+react-router@1.17_a412b0d82c3a1e1649d65373a448407f/node_modules/@tanstack/react-router/dist/esm/Scripts.js
/**
 * Render body script tags collected from route matches and SSR manifests.
 * Should be placed near the end of the document body.
 */
const Scripts = () => {
  const router = useRouter()
  const nonce = router.options.ssr?.nonce
  const getScripts = (matches) => {
    matches = _getAssetMatches(matches)
    const scripts = matches
      .flatMap((match) => match.scripts ?? [])
      .filter(Boolean)
      .map(({ children, ...script }) => ({
        tag: "script",
        attrs: {
          ...script,
          suppressHydrationWarning: true,
          nonce,
        },
        children,
      }))
    const manifest = router.ssr?.manifest
    if (!manifest) return scripts
    for (const match of matches) {
      const manifestScripts = manifest.routes[match.routeId]?.scripts
      if (!manifestScripts) continue
      for (const asset of manifestScripts)
        scripts.push({
          tag: "script",
          attrs: {
            ...asset.attrs,
            nonce,
          },
          children: asset.children,
          ...(typeof asset.attrs?.src === "string" ? { preventScriptHoist: true } : {}),
        })
    }
    return scripts
  }
  return renderScripts(router, getScripts(router.stores.matches.get()))
}
function renderScripts(router, scripts) {
  if (router.serverSsr) {
    const serverBufferedScript = router.serverSsr.takeBufferedScripts()
    if (serverBufferedScript) scripts.unshift(serverBufferedScript)
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {
    children: scripts.map((asset, i) =>
      /* @__PURE__ */ (0, import_react.createElement)(Asset, {
        ...asset,
        key: `tsr-scripts-${asset.tag}-${i}`,
      }),
    ),
  })
}
//#endregion
//#region node_modules/.pnpm/@tanstack+query-core@5.101.4/node_modules/@tanstack/query-core/build/modern/mutationCache.js
const MutationCache = class extends Subscribable {
  constructor(config = {}) {
    super()
    this.config = config
    this.#mutations = /* @__PURE__ */ new Set()
    this.#scopes = /* @__PURE__ */ new Map()
    this.#mutationId = 0
  }
  #mutations
  #scopes
  #mutationId
  build(client, options, state) {
    const mutation = new Mutation({
      client,
      mutationCache: this,
      mutationId: ++this.#mutationId,
      options: client.defaultMutationOptions(options),
      state,
    })
    this.add(mutation)
    return mutation
  }
  add(mutation) {
    this.#mutations.add(mutation)
    const scope = scopeFor(mutation)
    if (typeof scope === "string") {
      const scopedMutations = this.#scopes.get(scope)
      if (scopedMutations) scopedMutations.push(mutation)
      else this.#scopes.set(scope, [mutation])
    }
    this.notify({
      type: "added",
      mutation,
    })
  }
  remove(mutation) {
    if (this.#mutations.delete(mutation)) {
      const scope = scopeFor(mutation)
      if (typeof scope === "string") {
        const scopedMutations = this.#scopes.get(scope)
        if (scopedMutations) {
          if (scopedMutations.length > 1) {
            const index = scopedMutations.indexOf(mutation)
            if (index !== -1) scopedMutations.splice(index, 1)
          } else if (scopedMutations[0] === mutation) this.#scopes.delete(scope)
        }
      }
    }
    this.notify({
      type: "removed",
      mutation,
    })
  }
  canRun(mutation) {
    const scope = scopeFor(mutation)
    if (typeof scope === "string") {
      const firstPendingMutation = this.#scopes
        .get(scope)
        ?.find((m) => m.state.status === "pending")
      return !firstPendingMutation || firstPendingMutation === mutation
    } else return true
  }
  runNext(mutation) {
    const scope = scopeFor(mutation)
    if (typeof scope === "string")
      return (
        this.#scopes
          .get(scope)
          ?.find((m) => m !== mutation && m.state.isPaused)
          ?.continue() ?? Promise.resolve()
      )
    else return Promise.resolve()
  }
  clear() {
    notifyManager.batch(() => {
      this.#mutations.forEach((mutation) => {
        this.notify({
          type: "removed",
          mutation,
        })
      })
      this.#mutations.clear()
      this.#scopes.clear()
    })
  }
  getAll() {
    return Array.from(this.#mutations)
  }
  find(filters) {
    const defaultedFilters = {
      exact: true,
      ...filters,
    }
    return this.getAll().find((mutation) => matchMutation(defaultedFilters, mutation))
  }
  findAll(filters = {}) {
    return this.getAll().filter((mutation) => matchMutation(filters, mutation))
  }
  notify(event) {
    notifyManager.batch(() => {
      this.listeners.forEach((listener) => {
        listener(event)
      })
    })
  }
  resumePausedMutations() {
    const pausedMutations = this.getAll().filter((x) => x.state.isPaused)
    return notifyManager.batch(() =>
      Promise.all(pausedMutations.map((mutation) => mutation.continue().catch(noop))),
    )
  }
}
function scopeFor(mutation) {
  return mutation.options.scope?.id
}
//#endregion
//#region node_modules/.pnpm/@tanstack+query-core@5.101.4/node_modules/@tanstack/query-core/build/modern/queryCache.js
const QueryCache = class extends Subscribable {
  constructor(config = {}) {
    super()
    this.config = config
    this.#queries = /* @__PURE__ */ new Map()
  }
  #queries
  build(client, options, state) {
    const queryKey = options.queryKey
    const queryHash = options.queryHash ?? hashQueryKeyByOptions(queryKey, options)
    let query = this.get(queryHash)
    if (!query) {
      query = new Query({
        client,
        queryKey,
        queryHash,
        options: client.defaultQueryOptions(options),
        state,
        defaultOptions: client.getQueryDefaults(queryKey),
      })
      this.add(query)
    }
    return query
  }
  add(query) {
    if (!this.#queries.has(query.queryHash)) {
      this.#queries.set(query.queryHash, query)
      this.notify({
        type: "added",
        query,
      })
    }
  }
  remove(query) {
    const queryInMap = this.#queries.get(query.queryHash)
    if (queryInMap) {
      query.destroy()
      if (queryInMap === query) this.#queries.delete(query.queryHash)
      this.notify({
        type: "removed",
        query,
      })
    }
  }
  clear() {
    notifyManager.batch(() => {
      this.getAll().forEach((query) => {
        this.remove(query)
      })
    })
  }
  get(queryHash) {
    return this.#queries.get(queryHash)
  }
  getAll() {
    return [...this.#queries.values()]
  }
  find(filters) {
    const defaultedFilters = {
      exact: true,
      ...filters,
    }
    return this.getAll().find((query) => matchQuery(defaultedFilters, query))
  }
  findAll(filters = {}) {
    const queries = this.getAll()
    return Object.keys(filters).length > 0
      ? queries.filter((query) => matchQuery(filters, query))
      : queries
  }
  notify(event) {
    notifyManager.batch(() => {
      this.listeners.forEach((listener) => {
        listener(event)
      })
    })
  }
  onFocus() {
    notifyManager.batch(() => {
      this.getAll().forEach((query) => {
        query.onFocus()
      })
    })
  }
  onOnline() {
    notifyManager.batch(() => {
      this.getAll().forEach((query) => {
        query.onOnline()
      })
    })
  }
}
//#endregion
//#region node_modules/.pnpm/@tanstack+query-core@5.101.4/node_modules/@tanstack/query-core/build/modern/queryClient.js
const QueryClient = class {
  #queryCache
  #mutationCache
  #defaultOptions
  #queryDefaults
  #mutationDefaults
  #mountCount
  #unsubscribeFocus
  #unsubscribeOnline
  constructor(config = {}) {
    this.#queryCache = config.queryCache || new QueryCache()
    this.#mutationCache = config.mutationCache || new MutationCache()
    this.#defaultOptions = config.defaultOptions || {}
    this.#queryDefaults = /* @__PURE__ */ new Map()
    this.#mutationDefaults = /* @__PURE__ */ new Map()
    this.#mountCount = 0
  }
  mount() {
    this.#mountCount++
    if (this.#mountCount !== 1) return
    this.#unsubscribeFocus = focusManager.subscribe(async (focused) => {
      if (focused) {
        await this.resumePausedMutations()
        this.#queryCache.onFocus()
      }
    })
    this.#unsubscribeOnline = onlineManager.subscribe(async (online) => {
      if (online) {
        await this.resumePausedMutations()
        this.#queryCache.onOnline()
      }
    })
  }
  unmount() {
    this.#mountCount--
    if (this.#mountCount !== 0) return
    this.#unsubscribeFocus?.()
    this.#unsubscribeFocus = void 0
    this.#unsubscribeOnline?.()
    this.#unsubscribeOnline = void 0
  }
  isFetching(filters) {
    return this.#queryCache.findAll({
      ...filters,
      fetchStatus: "fetching",
    }).length
  }
  isMutating(filters) {
    return this.#mutationCache.findAll({
      ...filters,
      status: "pending",
    }).length
  }
  /**
   * Imperative (non-reactive) way to retrieve data for a QueryKey.
   * Should only be used in callbacks or functions where reading the latest data is necessary, e.g. for optimistic updates.
   *
   * Hint: Do not use this function inside a component, because it won't receive updates.
   * Use `useQuery` to create a `QueryObserver` that subscribes to changes.
   */
  getQueryData(queryKey) {
    const options = this.defaultQueryOptions({ queryKey })
    return this.#queryCache.get(options.queryHash)?.state.data
  }
  ensureQueryData(options) {
    const defaultedOptions = this.defaultQueryOptions(options)
    const query = this.#queryCache.build(this, defaultedOptions)
    const cachedData = query.state.data
    if (cachedData === void 0) return this.fetchQuery(options)
    if (
      options.revalidateIfStale &&
      query.isStaleByTime(resolveStaleTime(defaultedOptions.staleTime, query))
    )
      this.prefetchQuery(defaultedOptions)
    return Promise.resolve(cachedData)
  }
  getQueriesData(filters) {
    return this.#queryCache.findAll(filters).map(({ queryKey, state }) => {
      return [queryKey, state.data]
    })
  }
  setQueryData(queryKey, updater, options) {
    const defaultedOptions = this.defaultQueryOptions({ queryKey })
    const prevData = this.#queryCache.get(defaultedOptions.queryHash)?.state.data
    const data = functionalUpdate(updater, prevData)
    if (data === void 0) return
    return this.#queryCache.build(this, defaultedOptions).setData(data, {
      ...options,
      manual: true,
    })
  }
  setQueriesData(filters, updater, options) {
    return notifyManager.batch(() =>
      this.#queryCache
        .findAll(filters)
        .map(({ queryKey }) => [queryKey, this.setQueryData(queryKey, updater, options)]),
    )
  }
  getQueryState(queryKey) {
    const options = this.defaultQueryOptions({ queryKey })
    return this.#queryCache.get(options.queryHash)?.state
  }
  removeQueries(filters) {
    const queryCache = this.#queryCache
    notifyManager.batch(() => {
      queryCache.findAll(filters).forEach((query) => {
        queryCache.remove(query)
      })
    })
  }
  resetQueries(filters, options) {
    const queryCache = this.#queryCache
    return notifyManager.batch(() => {
      queryCache.findAll(filters).forEach((query) => {
        query.reset()
      })
      return this.refetchQueries(
        {
          type: "active",
          ...filters,
        },
        options,
      )
    })
  }
  cancelQueries(filters, cancelOptions = {}) {
    const defaultedCancelOptions = {
      revert: true,
      ...cancelOptions,
    }
    const promises = notifyManager.batch(() =>
      this.#queryCache.findAll(filters).map((query) => query.cancel(defaultedCancelOptions)),
    )
    return Promise.all(promises).then(noop).catch(noop)
  }
  invalidateQueries(filters, options = {}) {
    return notifyManager.batch(() => {
      this.#queryCache.findAll(filters).forEach((query) => {
        query.invalidate()
      })
      if (filters?.refetchType === "none") return Promise.resolve()
      return this.refetchQueries(
        {
          ...filters,
          type: filters?.refetchType ?? filters?.type ?? "active",
        },
        options,
      )
    })
  }
  refetchQueries(filters, options = {}) {
    const fetchOptions = {
      ...options,
      cancelRefetch: options.cancelRefetch ?? true,
    }
    const promises = notifyManager.batch(() =>
      this.#queryCache
        .findAll(filters)
        .filter((query) => !query.isDisabled() && !query.isStatic())
        .map((query) => {
          let promise = query.fetch(void 0, fetchOptions)
          if (!fetchOptions.throwOnError) promise = promise.catch(noop)
          return query.state.fetchStatus === "paused" ? Promise.resolve() : promise
        }),
    )
    return Promise.all(promises).then(noop)
  }
  fetchQuery(options) {
    const defaultedOptions = this.defaultQueryOptions(options)
    if (defaultedOptions.retry === void 0) defaultedOptions.retry = false
    const query = this.#queryCache.build(this, defaultedOptions)
    return query.isStaleByTime(resolveStaleTime(defaultedOptions.staleTime, query))
      ? query.fetch(defaultedOptions)
      : Promise.resolve(query.state.data)
  }
  prefetchQuery(options) {
    return this.fetchQuery(options).then(noop).catch(noop)
  }
  fetchInfiniteQuery(options) {
    options._type = "infinite"
    return this.fetchQuery(options)
  }
  prefetchInfiniteQuery(options) {
    return this.fetchInfiniteQuery(options).then(noop).catch(noop)
  }
  ensureInfiniteQueryData(options) {
    options._type = "infinite"
    return this.ensureQueryData(options)
  }
  resumePausedMutations() {
    if (onlineManager.isOnline()) return this.#mutationCache.resumePausedMutations()
    return Promise.resolve()
  }
  getQueryCache() {
    return this.#queryCache
  }
  getMutationCache() {
    return this.#mutationCache
  }
  getDefaultOptions() {
    return this.#defaultOptions
  }
  setDefaultOptions(options) {
    this.#defaultOptions = options
  }
  setQueryDefaults(queryKey, options) {
    this.#queryDefaults.set(hashKey(queryKey), {
      queryKey,
      defaultOptions: options,
    })
  }
  getQueryDefaults(queryKey) {
    const defaults = [...this.#queryDefaults.values()]
    const result = {}
    defaults.forEach((queryDefault) => {
      if (partialMatchKey(queryKey, queryDefault.queryKey))
        Object.assign(result, queryDefault.defaultOptions)
    })
    return result
  }
  setMutationDefaults(mutationKey, options) {
    this.#mutationDefaults.set(hashKey(mutationKey), {
      mutationKey,
      defaultOptions: options,
    })
  }
  getMutationDefaults(mutationKey) {
    const defaults = [...this.#mutationDefaults.values()]
    const result = {}
    defaults.forEach((queryDefault) => {
      if (partialMatchKey(mutationKey, queryDefault.mutationKey))
        Object.assign(result, queryDefault.defaultOptions)
    })
    return result
  }
  defaultQueryOptions(options) {
    if (options._defaulted) return options
    const defaultedOptions = {
      ...this.#defaultOptions.queries,
      ...this.getQueryDefaults(options.queryKey),
      ...options,
      _defaulted: true,
    }
    if (!defaultedOptions.queryHash)
      defaultedOptions.queryHash = hashQueryKeyByOptions(
        defaultedOptions.queryKey,
        defaultedOptions,
      )
    if (defaultedOptions.refetchOnReconnect === void 0)
      defaultedOptions.refetchOnReconnect = defaultedOptions.networkMode !== "always"
    if (defaultedOptions.throwOnError === void 0)
      defaultedOptions.throwOnError = !!defaultedOptions.suspense
    if (!defaultedOptions.networkMode && defaultedOptions.persister)
      defaultedOptions.networkMode = "offlineFirst"
    if (defaultedOptions.queryFn === skipToken) defaultedOptions.enabled = false
    return defaultedOptions
  }
  defaultMutationOptions(options) {
    if (options?._defaulted) return options
    return {
      ...this.#defaultOptions.mutations,
      ...(options?.mutationKey && this.getMutationDefaults(options.mutationKey)),
      ...options,
      _defaulted: true,
    }
  }
  clear() {
    this.#queryCache.clear()
    this.#mutationCache.clear()
  }
}
//#endregion
//#region src/styles.css?url
const styles_default = "/assets/styles-CF-gbgjv.css"
//#endregion
//#region src/routes/__root.tsx
function parseRootSearch(input) {
  return input.connect === true ? { connect: true } : {}
}
const Route$9 = createRootRouteWithContext()({
  validateSearch: parseRootSearch,
  head: () => ({
    meta: [
      { title: "Cuttle" },
      {
        name: "description",
        content: "Cuttle：通用代理节点转换器。提取、处理并发布多客户端订阅。",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: styles_default,
      },
    ],
  }),
  notFoundComponent: NotFound,
  shellComponent: RootDocument,
})
function RootDocument({ children }) {
  const { queryClient } = Route$9.useRouteContext()
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
    lang: "zh-CN",
    suppressHydrationWarning: true,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", {
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", { charSet: "utf-8" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
            name: "viewport",
            content:
              "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover",
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
            name: "robots",
            content: "noindex, nofollow",
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
            name: "format-detection",
            content: "telephone=no,email=no,address=no",
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
            name: "color-scheme",
            content: "dark light",
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
            name: "theme-color",
            media: "(prefers-color-scheme: light)",
            content: "#ffffff",
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
            name: "theme-color",
            media: "(prefers-color-scheme: dark)",
            content: "#0a0a0a",
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
        className: "font-sans antialiased wrap-anywhere selection:bg-primary/15",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
            client: queryClient,
            children,
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {}),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {}),
        ],
      }),
    ],
  })
}
//#endregion
//#region src/routes/index.tsx
const $$splitComponentImporter$1 = () => import("./routes-aYrwoYAv.js")
const STEP_VALUES = /* @__PURE__ */ new Set(["source", "process", "output"])
function isStepKey(value) {
  return typeof value === "string" && STEP_VALUES.has(value)
}
/**
 * Input from the address bar is not to be trusted: an invalid `step` falls back to no parameter at
 * all — which is the first step — rather than throwing. A hand-mangled URL should open the workbench
 * at its first step, not an error page.
 */
function parseExtractSearch(input) {
  return isStepKey(input.step) ? { step: input.step } : {}
}
const Route$8 = createFileRoute("/")({
  validateSearch: parseExtractSearch,
  component: lazyRouteComponent($$splitComponentImporter$1, "component"),
})
//#endregion
//#region src/routes/subscriptions.tsx
const $$splitComponentImporter = () => import("./subscriptions-ClypPmpF.js")
/**
 * Input from the address bar is not to be trusted: junk falls back to the default state rather than
 * throwing, because a hand-mangled URL should open a working page and not an error one.
 *
 * `mode` is one union rather than two booleans — "editing and creating at once" is not a reachable
 * state, so the type must not let it be expressed. "Creating while pointing at an existing
 * subscription" is not reachable either, which is why `id` is dropped along with it when
 * `mode === "create"` (and "createCollection", which creates through the same machinery).
 */
function parseSubscriptionsSearch(input) {
  const mode =
    input.mode === "edit" || input.mode === "create" || input.mode === "createCollection"
      ? input.mode
      : void 0
  if (mode === "create" || mode === "createCollection") return { mode }
  const id = typeof input.id === "string" && input.id.length > 0 ? input.id : void 0
  const search = {}
  if (id !== void 0) search.id = id
  if (mode !== void 0) search.mode = mode
  return search
}
/**
 * This route has no loader, and that is not an omission.
 *
 * The admin key lives only in sessionStorage, so a server render holds no credential and any loader
 * running there would get a 401. The data is fetched by a query when the page mounts — which is also
 * why the Router–Query SSR dehydrate integration is not installed: there is nothing to prefetch on
 * the server.
 */
const Route$7 = createFileRoute("/subscriptions")({
  validateSearch: parseSubscriptionsSearch,
  component: lazyRouteComponent($$splitComponentImporter, "component"),
})
//#endregion
//#region src/server/error-response.ts
const HTTP_STATUS = {
  invalid_request: 400,
  conflict: 409,
  rate_limited: 429,
  unauthorized: 401,
  not_found: 404,
  payload_too_large: 413,
  invalid_definition: 422,
  internal: 500,
  upstream_unavailable: 502,
}
function jsonError(error, operation) {
  if (error instanceof AdminFailure) {
    const status = HTTP_STATUS[error.code]
    if (status >= 500) console.error(operation, error)
    return Response.json(
      {
        error: error.code === "internal" ? INTERNAL_MESSAGE : error.message,
        code: error.code,
      },
      { status },
    )
  }
  console.error(operation, error)
  return Response.json(
    {
      error: INTERNAL_MESSAGE,
      code: "internal",
    },
    { status: 500 },
  )
}
//#endregion
//#region src/middleware/admin-only.server.ts
const adminOnly = createMiddleware({ type: "request" }).server(async ({ next, request }) => {
  let result
  try {
    result = await authorizeAdminRequest(request)
  } catch (error) {
    return jsonError(error, "authorize-admin-request")
  }
  if (result === "authorized") return next()
  return jsonError(
    result === "rate_limited"
      ? new AdminFailure("rate_limited", RATE_LIMITED_MESSAGE)
      : new AdminFailure("unauthorized", UNAUTHORIZED_MESSAGE),
    "authorize-admin-request",
  )
})
//#endregion
//#region src/middleware/no-store.server.ts
/**
 * Management answers carry subscription data, and on creation and rotation the subscription token
 * itself; none of it may be held by a proxy or a browser cache. Stated once per route rather than
 * once per response, because the way that guarantee breaks is a handler added later whose author
 * did not know it existed.
 *
 * List it first. `next()` resolves after everything downstream has run, so the response it hands
 * back is whatever the route settled on — a handler's, or a middleware's own short-circuit, which
 * is why neither of those has to set the header itself. A handler that throws never reaches here,
 * but that answer comes from the framework and carries no subscription data to protect.
 */
const noStore = createMiddleware({ type: "request" }).server(async ({ next }) => {
  const result = await next()
  result.response.headers.set("Cache-Control", "no-store")
  return result
})
//#endregion
//#region src/routes/api/session.ts
/**
 * A deliberately empty authenticated request. The browser uses it before committing the single-user
 * password to its session, so a typo never becomes a remembered credential. Management requests keep
 * using the same `adminOnly` middleware; this route is a proof of that door, not a second auth system.
 */
const Route$6 = createFileRoute("/api/session")({
  server: {
    middleware: [noStore, adminOnly],
    handlers: { POST: () => new Response(null, { status: 204 }) },
  },
})
//#endregion
//#region src/server/delivery-response.ts
const CACHE_POLICY = "public, max-age=60, stale-while-revalidate=300, stale-if-error=86400"
function safeFileName(value) {
  return value.replaceAll(/[^a-zA-Z0-9._-]+/g, "-").replaceAll(/^-+|-+$/g, "") || "cuttle"
}
function deliveryResponse(delivery) {
  const { artifact, content, stale, subscription } = delivery
  const target = targetDefinition(artifact.target)
  const headers = new Headers({
    "Cache-Control": CACHE_POLICY,
    "CDN-Cache-Control": CACHE_POLICY,
    "ETag": artifact.etag,
    "X-Cuttle-Stale": stale ? "1" : "0",
  })
  if (content !== null) {
    headers.set("Content-Type", target.contentType)
    headers.set(
      "Content-Disposition",
      `inline; filename="${safeFileName(subscription.name)}.${target.fileExtension}"`,
    )
    headers.set("X-Node-Count", String(artifact.nodeCount))
  }
  for (const [name, value] of Object.entries(artifact.responseHeaders)) headers.set(name, value)
  if (stale) headers.set("Warning", '110 - "Response is stale"')
  if (content === null)
    return new Response(null, {
      status: 304,
      headers,
    })
  return new Response(content, { headers })
}
//#endregion
//#region src/server/serve-subscription.ts
function text(status, message) {
  return new Response(message, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "text/plain; charset=utf-8",
    },
  })
}
async function serveSubscription(request, token) {
  const startedAt = Date.now()
  try {
    const requestedTarget = new URL(request.url).searchParams.get("target")
    if (requestedTarget && !TARGET_IDS.includes(requestedTarget))
      return text(400, `Unsupported target: ${requestedTarget}`)
    const outcome = await subscriptionDelivery().deliver(
      token,
      requestedTarget ?? void 0,
      request.headers.get("If-None-Match"),
    )
    switch (outcome.kind) {
      case "not-found":
        return text(404, "Subscription not found")
      case "disabled":
        return text(410, "Subscription disabled")
      case "unavailable":
        console.error("Subscription unavailable", outcome.error)
        return text(502, "Subscription upstream unavailable")
      case "delivered": {
        const { delivery } = outcome
        console.info("Subscription delivered", {
          subscriptionId: delivery.subscription.id,
          target: delivery.artifact.target,
          nodeCount: delivery.artifact.nodeCount,
          stale: delivery.stale,
          durationMs: Date.now() - startedAt,
        })
        return deliveryResponse(delivery)
      }
    }
  } catch (error) {
    console.error("Unexpected subscription delivery failure", error)
    return text(500, "Internal server error")
  }
}
//#endregion
//#region src/routes/subscribe/$token.ts
const Route$5 = createFileRoute("/subscribe/$token")({
  server: { handlers: { GET: ({ params, request }) => serveSubscription(request, params.token) } },
})
//#endregion
//#region src/server/request-body.ts
const MAX_JSON_BODY_SIZE = MAX_SOURCE_SIZE + 65536
async function readJsonBody(request) {
  if (Number(request.headers.get("content-length") ?? 0) > MAX_JSON_BODY_SIZE)
    throw new AdminFailure("payload_too_large", "The request body is too large.")
  try {
    const body = await request.text()
    if (new TextEncoder().encode(body).byteLength > MAX_JSON_BODY_SIZE)
      throw new AdminFailure("payload_too_large", "The request body is too large.")
    return JSON.parse(body)
  } catch (error) {
    if (error instanceof SyntaxError)
      throw new AdminFailure("invalid_request", "The request body must be valid JSON.", {
        cause: error,
      })
    throw error
  }
}
//#endregion
//#region src/routes/api/v1/subscriptions.ts
const Route$4 = createFileRoute("/api/v1/subscriptions")({
  server: {
    middleware: [noStore, adminOnly],
    handlers: {
      GET: async () => {
        try {
          return Response.json(await listSubscriptions())
        } catch (error) {
          return jsonError(error, "list-subscriptions")
        }
      },
      PUT: async ({ request }) => {
        try {
          const body = await readJsonBody(request)
          await reorderSubscriptions({ ids: body?.ids })
          return new Response(null, { status: 204 })
        } catch (error) {
          return jsonError(error, "reorder-subscriptions")
        }
      },
      POST: async ({ request }) => {
        try {
          const payload = await createSubscription({
            draft: await readJsonBody(request),
            origin: request.url,
          })
          return Response.json(payload, { status: 201 })
        } catch (error) {
          return jsonError(error, "create-subscription")
        }
      },
    },
  },
})
//#endregion
//#region src/routes/api/v1/subscriptions/$id.ts
/**
 * No `server.middleware` here on purpose. This route is a child of `/api/v1/subscriptions` in the
 * generated route tree, and the framework composes `server.middleware` from every matched ancestor,
 * so `noStore` and `adminOnly` already reach every request here. Declaring them again would not add
 * a layer of safety — it would only run the same authorization twice.
 *
 * Nothing pins that inheritance. Detaching this route from its parent, or the parent dropping either
 * middleware, would leave a management route unauthenticated with nothing here saying so.
 */
const Route$3 = createFileRoute("/api/v1/subscriptions/$id")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          return Response.json(await getSubscription({ id: params.id }))
        } catch (error) {
          return jsonError(error, "get-subscription")
        }
      },
      PATCH: async ({ params, request }) => {
        try {
          const payload = await updateSubscription({
            id: params.id,
            patch: await readJsonBody(request),
          })
          return Response.json(payload)
        } catch (error) {
          return jsonError(error, "update-subscription")
        }
      },
      DELETE: async ({ params }) => {
        try {
          await removeSubscription({ id: params.id })
          return new Response(null, { status: 204 })
        } catch (error) {
          return jsonError(error, "remove-subscription")
        }
      },
    },
  },
})
//#endregion
//#region src/routes/api/v1/subscriptions/$id/link.ts
const Route$2 = createFileRoute("/api/v1/subscriptions/$id/link")({
  server: {
    handlers: {
      GET: async ({ params, request }) => {
        try {
          return Response.json(
            await getSubscriptionLink({
              id: params.id,
              origin: request.url,
            }),
          )
        } catch (error) {
          return jsonError(error, "get-subscription-link")
        }
      },
      POST: async ({ params, request }) => {
        try {
          const body = await readJsonBody(request)
          const link = body && typeof body === "object" ? Reflect.get(body, "link") : void 0
          return Response.json(
            await registerSubscriptionLink({
              id: params.id,
              link,
              origin: request.url,
            }),
          )
        } catch (error) {
          return jsonError(error, "register-subscription-link")
        }
      },
    },
  },
})
//#endregion
//#region src/routes/api/v1/subscriptions/$id/nodes.ts
/**
 * This child route intentionally inherits `noStore` and `adminOnly` from `/api/v1/subscriptions`,
 * exactly like the sibling `$id` route. Keeping the endpoint nested preserves the management boundary.
 */
const Route$1 = createFileRoute("/api/v1/subscriptions/$id/nodes")({
  server: {
    handlers: {
      POST: async ({ params, request }) => {
        try {
          const body = await readJsonBody(request)
          const content =
            body && typeof body === "object" && !Array.isArray(body) ? body.content : void 0
          const payload = await appendSubscriptionNodes({
            id: params.id,
            content: content ?? "",
          })
          return Response.json(payload)
        } catch (error) {
          return jsonError(error, "append-subscription-nodes")
        }
      },
    },
  },
})
//#endregion
//#region src/routes/api/v1/subscriptions/$id/token.ts
const Route = createFileRoute("/api/v1/subscriptions/$id/token")({
  server: {
    handlers: {
      POST: async ({ params, request }) => {
        try {
          const payload = await rotateSubscriptionToken({
            id: params.id,
            origin: request.url,
          })
          return Response.json(payload)
        } catch (error) {
          return jsonError(error, "rotate-subscription-token")
        }
      },
    },
  },
})
//#endregion
//#region src/routeTree.gen.ts
const IndexRoute = Route$8.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$9,
})
const SubscriptionsRoute = Route$7.update({
  id: "/subscriptions",
  path: "/subscriptions",
  getParentRoute: () => Route$9,
})
const ApiSessionRoute = Route$6.update({
  id: "/api/session",
  path: "/api/session",
  getParentRoute: () => Route$9,
})
const SubscribeTokenRoute = Route$5.update({
  id: "/subscribe/$token",
  path: "/subscribe/$token",
  getParentRoute: () => Route$9,
})
const ApiV1SubscriptionsRoute = Route$4.update({
  id: "/api/v1/subscriptions",
  path: "/api/v1/subscriptions",
  getParentRoute: () => Route$9,
})
const ApiV1SubscriptionsIdRoute = Route$3.update({
  id: "/$id",
  path: "/$id",
  getParentRoute: () => ApiV1SubscriptionsRoute,
})
const ApiV1SubscriptionsIdRouteChildren = {
  ApiV1SubscriptionsIdLinkRoute: Route$2.update({
    id: "/link",
    path: "/link",
    getParentRoute: () => ApiV1SubscriptionsIdRoute,
  }),
  ApiV1SubscriptionsIdNodesRoute: Route$1.update({
    id: "/nodes",
    path: "/nodes",
    getParentRoute: () => ApiV1SubscriptionsIdRoute,
  }),
  ApiV1SubscriptionsIdTokenRoute: Route.update({
    id: "/token",
    path: "/token",
    getParentRoute: () => ApiV1SubscriptionsIdRoute,
  }),
}
const ApiV1SubscriptionsRouteChildren = {
  ApiV1SubscriptionsIdRoute: ApiV1SubscriptionsIdRoute._addFileChildren(
    ApiV1SubscriptionsIdRouteChildren,
  ),
}
const rootRouteChildren = {
  IndexRoute,
  SubscriptionsRoute,
  ApiSessionRoute,
  SubscribeTokenRoute,
  ApiV1SubscriptionsRoute: ApiV1SubscriptionsRoute._addFileChildren(
    ApiV1SubscriptionsRouteChildren,
  ),
}
const routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes()
//#endregion
//#region src/router.tsx
function createQueryClient() {
  return new QueryClient({
    queryCache: new QueryCache({ onError: noteAuthFailure }),
    mutationCache: new MutationCache({ onError: noteAuthFailure }),
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: Number.POSITIVE_INFINITY,
      },
    },
  })
}
function getRouter() {
  return createRouter({
    routeTree,
    context: { queryClient: createQueryClient() },
    scrollRestoration: true,
    defaultPreload: "intent",
  })
}
//#endregion
export { getRouter }
