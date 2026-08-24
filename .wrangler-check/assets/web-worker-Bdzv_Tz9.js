import { t as getServerFnById } from "./__23tanstack-start-server-fn-resolver-Ciu3mqBX.js"
import { t as adminFunctionMiddleware } from "./admin-function-D_xAk7Bk.js"
import { c as require_react, u as __toESM } from "./createMiddleware-CkzUAgXb.js"
import { d as TSS_SERVER_FUNCTION, t as createServerFn } from "./createServerFn-DRD1-jCn.js"
import {
  F as batch,
  I as createAtom,
  N as useTokenUsable,
  l as SET_OPTIONS,
  s as targetLabel,
  u as DEDUPE_DEFAULT_FIELDS,
} from "./nodes-b2qYjNQG.js"
import { d as require_jsx_runtime, r as require_with_selector } from "./react-dom-C7iwyEt6.js"
import {
  $ as showSuccess,
  $n as environmentManager,
  $t as transitionStatusMapping,
  An as useAnimationFrame,
  At as FloatingPortal,
  Bn as useIsoLayoutEffect,
  C as FieldGroup,
  Cn as ARROW_LEFT,
  Ct as useDismiss,
  Dn as webkit,
  Dt as useFloatingTree,
  En as jsdom,
  Et as useFloatingParentNodeId,
  F as useControlled,
  Fn as isHTMLElement,
  Gn as useQueryClient,
  H as COMPOSITE_KEYS,
  Hn as EMPTY_ARRAY,
  Ht as windowResize,
  In as ReactStore,
  It as itemPress,
  J as useBaseUiId,
  Jt as clamp,
  L as InternalBackdrop,
  Ln as useStableCallback,
  Lt as listNavigation,
  M as useValueChanged,
  Mn as ownerDocument,
  Mt as cancelOpen,
  Nn as getWindow,
  On as useTimeout,
  Ot as enqueueFocus,
  Pn as isElement,
  Pt as focusOut,
  Q as showError,
  Qn as pendingThenable,
  Qt as TransitionStatusDataAttributes,
  Rn as useStore,
  Sn as ARROW_DOWN,
  St as platform,
  T as FieldTitle,
  Tn as ARROW_UP,
  Tt as FloatingFocusManager,
  Un as EMPTY_OBJECT,
  Ut as useButton,
  Vn as useRefWithInit,
  Vt as triggerPress,
  Wt as dispatchClickWithModifiers,
  Xt as useOpenChangeComplete,
  Yn as fetchState,
  Yt as DROPDOWN_COLLISION_AVOIDANCE,
  Zn as notifyManager,
  Zt as useAnimationsFinished,
  _ as useFieldRootContext,
  _n as getFloatingFocusElement,
  _r as Subscribable,
  _t as useDirection,
  an as visuallyHidden,
  bn as contains,
  bt as useTransitionStatus,
  cn as getMaxListIndex,
  cr as replaceData,
  d as useAnchoredPopupScrollLock,
  dn as isIndexOutOfListBounds,
  dr as shallowEqualObjects,
  dt as usePositioner,
  en as inertValue,
  f as Input,
  fn as isListIndexDisabled,
  fr as shouldThrowError,
  ft as getDisabledMountTransitionStyles,
  g as useFormContext,
  gn as stopEvent,
  gr as focusManager,
  gt as useAnchorPositioning,
  h as useLabelableContext,
  hn as isVirtualPointerEvent,
  hr as timeoutManager,
  ht as triggerOpenStateMapping$1,
  in as useMergedRefs,
  it as tv,
  j as useOpenInteractionType,
  jn as addEventListener,
  jt as createChangeEventDetails,
  kn as AnimationFrame,
  kt as useValueAsRef,
  ln as getMinListIndex,
  lr as resolveQueryBoolean,
  m as useLabelableId,
  mn as isVirtualClick,
  mr as timeUntilStale,
  mt as pressableTriggerOpenStateMapping,
  nn as mergeProps,
  on as visuallyHiddenInput,
  or as noop,
  p as useRegisterFieldControl,
  pn as rectToClientRect,
  pt as popupStateMapping,
  qn as getDefaultState,
  qt as useId,
  rn as resolveStyle,
  rr as isValidTimeout,
  rt as cn,
  sn as findNonDisabledListIndex,
  tn as useRenderElement,
  tr as hashKey,
  tt as Button,
  u as useToolbarRootContext,
  un as isElementVisible,
  ur as resolveStaleTime,
  ut as createReactComponent,
  v as fieldValidityMapping,
  vn as isTypeableCombobox,
  vt as PopupTriggerMap,
  w as FieldLabel,
  wn as ARROW_RIGHT,
  wt as useClick,
  x as FieldDescription,
  xn as getTarget,
  xt as FloatingRootStore,
  y as Field,
  yn as activeElement,
  yt as FOCUSABLE_POPUP_PROPS,
  zn as formatErrorMessage,
  zt as none,
} from "./shell-CGXDXMPw.js"
//#region node_modules/.pnpm/@tanstack+store@0.11.1/node_modules/@tanstack/store/dist/shallow.js
function shallow(objA, objB) {
  if (Object.is(objA, objB)) return true
  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null)
    return false
  if (objA instanceof Map && objB instanceof Map) {
    if (objA.size !== objB.size) return false
    for (const [k, v] of objA) if (!objB.has(k) || !Object.is(v, objB.get(k))) return false
    return true
  }
  if (objA instanceof Set && objB instanceof Set) {
    if (objA.size !== objB.size) return false
    for (const v of objA) if (!objB.has(v)) return false
    return true
  }
  if (objA instanceof Date && objB instanceof Date) {
    if (objA.getTime() !== objB.getTime()) return false
    return true
  }
  const keysA = getOwnKeys(objA)
  if (keysA.length !== getOwnKeys(objB).length) return false
  for (let i = 0; i < keysA.length; i++)
    if (!Object.hasOwn(objB, keysA[i]) || !Object.is(objA[keysA[i]], objB[keysA[i]])) return false
  return true
}
function getOwnKeys(obj) {
  return Object.keys(obj).concat(Object.getOwnPropertySymbols(obj))
}
//#endregion
//#region node_modules/.pnpm/@tanstack+react-store@0.11._c1e08e2bc94a81f53d95c7e8c2502f5f/node_modules/@tanstack/react-store/dist/useSelector.js
const import_react = /* @__PURE__ */ __toESM(require_react(), 1)
const import_with_selector = require_with_selector()
function defaultCompare(a, b) {
  return a === b
}
/**
 * Selects a slice of state from an atom or store and subscribes the component
 * to that selection.
 *
 * This is the primary React read hook for TanStack Store. It works with any
 * source that exposes `get()` and `subscribe()`, including atoms, readonly
 * atoms, stores, and readonly stores.
 *
 * Omit the selector to subscribe to the whole value.
 *
 * @example
 * ```tsx
 * const count = useSelector(counterStore, (state) => state.count)
 * ```
 *
 * @example
 * ```tsx
 * const value = useSelector(countAtom)
 * ```
 */
function useSelector(source, selector = (s) => s, options) {
  const compare = options?.compare ?? defaultCompare
  const subscribe = (0, import_react.useCallback)(
    (handleStoreChange) => {
      const { unsubscribe } = source.subscribe(handleStoreChange)
      return unsubscribe
    },
    [source],
  )
  const getSnapshot = (0, import_react.useCallback)(() => source.get(), [source])
  return (0, import_with_selector.useSyncExternalStoreWithSelector)(
    subscribe,
    getSnapshot,
    getSnapshot,
    selector,
    compare,
  )
}
//#endregion
//#region node_modules/.pnpm/@tanstack+query-core@5.101.4/node_modules/@tanstack/query-core/build/modern/queryObserver.js
const QueryObserver = class extends Subscribable {
  constructor(client, options) {
    super()
    this.options = options
    this.#client = client
    this.#selectError = null
    this.#currentThenable = pendingThenable()
    this.bindMethods()
    this.setOptions(options)
  }
  #client
  #currentQuery = void 0
  #currentQueryInitialState = void 0
  #currentResult = void 0
  #currentResultState
  #currentResultOptions
  #currentThenable
  #selectError
  #selectFn
  #selectResult
  #lastQueryWithDefinedData
  #staleTimeoutId
  #refetchIntervalId
  #currentRefetchInterval
  #trackedProps = /* @__PURE__ */ new Set()
  bindMethods() {
    this.refetch = this.refetch.bind(this)
  }
  onSubscribe() {
    if (this.listeners.size === 1) {
      this.#currentQuery.addObserver(this)
      if (shouldFetchOnMount(this.#currentQuery, this.options)) this.#executeFetch()
      else this.updateResult()
      this.#updateTimers()
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) this.destroy()
  }
  shouldFetchOnReconnect() {
    return shouldFetchOn(this.#currentQuery, this.options, this.options.refetchOnReconnect)
  }
  shouldFetchOnWindowFocus() {
    return shouldFetchOn(this.#currentQuery, this.options, this.options.refetchOnWindowFocus)
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set()
    this.#clearStaleTimeout()
    this.#clearRefetchInterval()
    this.#currentQuery.removeObserver(this)
  }
  setOptions(options) {
    const prevOptions = this.options
    const prevQuery = this.#currentQuery
    this.options = this.#client.defaultQueryOptions(options)
    if (
      this.options.enabled !== void 0 &&
      typeof this.options.enabled !== "boolean" &&
      typeof this.options.enabled !== "function" &&
      typeof resolveQueryBoolean(this.options.enabled, this.#currentQuery) !== "boolean"
    )
      throw new Error("Expected enabled to be a boolean or a callback that returns a boolean")
    this.#updateQuery()
    this.#currentQuery.setOptions(this.options)
    if (prevOptions._defaulted && !shallowEqualObjects(this.options, prevOptions))
      this.#client.getQueryCache().notify({
        type: "observerOptionsUpdated",
        query: this.#currentQuery,
        observer: this,
      })
    const mounted = this.hasListeners()
    if (mounted && shouldFetchOptionally(this.#currentQuery, prevQuery, this.options, prevOptions))
      this.#executeFetch()
    this.updateResult()
    if (
      mounted &&
      (this.#currentQuery !== prevQuery ||
        resolveQueryBoolean(this.options.enabled, this.#currentQuery) !==
          resolveQueryBoolean(prevOptions.enabled, this.#currentQuery) ||
        resolveStaleTime(this.options.staleTime, this.#currentQuery) !==
          resolveStaleTime(prevOptions.staleTime, this.#currentQuery))
    )
      this.#updateStaleTimeout()
    const nextRefetchInterval = this.#computeRefetchInterval()
    if (
      mounted &&
      (this.#currentQuery !== prevQuery ||
        resolveQueryBoolean(this.options.enabled, this.#currentQuery) !==
          resolveQueryBoolean(prevOptions.enabled, this.#currentQuery) ||
        nextRefetchInterval !== this.#currentRefetchInterval)
    )
      this.#updateRefetchInterval(nextRefetchInterval)
  }
  getOptimisticResult(options) {
    const query = this.#client.getQueryCache().build(this.#client, options)
    const result = this.createResult(query, options)
    if (shouldAssignObserverCurrentProperties(this, result)) {
      this.#currentResult = result
      this.#currentResultOptions = this.options
      this.#currentResultState = this.#currentQuery.state
    }
    return result
  }
  getCurrentResult() {
    return this.#currentResult
  }
  trackResult(result, onPropTracked) {
    return new Proxy(result, {
      get: (target, key) => {
        this.trackProp(key)
        onPropTracked?.(key)
        if (key === "promise") {
          this.trackProp("data")
          if (
            !this.options.experimental_prefetchInRender &&
            this.#currentThenable.status === "pending"
          )
            this.#currentThenable.reject(
              /* @__PURE__ */ new Error(
                "experimental_prefetchInRender feature flag is not enabled",
              ),
            )
        }
        return Reflect.get(target, key)
      },
    })
  }
  trackProp(key) {
    this.#trackedProps.add(key)
  }
  getCurrentQuery() {
    return this.#currentQuery
  }
  refetch({ ...options } = {}) {
    return this.fetch({ ...options })
  }
  fetchOptimistic(options) {
    const defaultedOptions = this.#client.defaultQueryOptions(options)
    const query = this.#client.getQueryCache().build(this.#client, defaultedOptions)
    return query.fetch().then(() => this.createResult(query, defaultedOptions))
  }
  fetch(fetchOptions) {
    return this.#executeFetch({
      ...fetchOptions,
      cancelRefetch: fetchOptions.cancelRefetch ?? true,
    }).then(() => {
      this.updateResult()
      return this.#currentResult
    })
  }
  #executeFetch(fetchOptions) {
    this.#updateQuery()
    let promise = this.#currentQuery.fetch(this.options, fetchOptions)
    if (!fetchOptions?.throwOnError) promise = promise.catch(noop)
    return promise
  }
  #updateStaleTimeout() {
    this.#clearStaleTimeout()
    const staleTime = resolveStaleTime(this.options.staleTime, this.#currentQuery)
    if (environmentManager.isServer() || this.#currentResult.isStale || !isValidTimeout(staleTime))
      return
    const timeout = timeUntilStale(this.#currentResult.dataUpdatedAt, staleTime) + 1
    this.#staleTimeoutId = timeoutManager.setTimeout(() => {
      if (!this.#currentResult.isStale) this.updateResult()
    }, timeout)
  }
  #computeRefetchInterval() {
    return (
      (typeof this.options.refetchInterval === "function"
        ? this.options.refetchInterval(this.#currentQuery)
        : this.options.refetchInterval) ?? false
    )
  }
  #updateRefetchInterval(nextInterval) {
    this.#clearRefetchInterval()
    this.#currentRefetchInterval = nextInterval
    if (
      environmentManager.isServer() ||
      resolveQueryBoolean(this.options.enabled, this.#currentQuery) === false ||
      !isValidTimeout(this.#currentRefetchInterval) ||
      this.#currentRefetchInterval === 0
    )
      return
    this.#refetchIntervalId = timeoutManager.setInterval(() => {
      if (this.options.refetchIntervalInBackground || focusManager.isFocused()) this.#executeFetch()
    }, this.#currentRefetchInterval)
  }
  #updateTimers() {
    this.#updateStaleTimeout()
    this.#updateRefetchInterval(this.#computeRefetchInterval())
  }
  #clearStaleTimeout() {
    if (this.#staleTimeoutId !== void 0) {
      timeoutManager.clearTimeout(this.#staleTimeoutId)
      this.#staleTimeoutId = void 0
    }
  }
  #clearRefetchInterval() {
    if (this.#refetchIntervalId !== void 0) {
      timeoutManager.clearInterval(this.#refetchIntervalId)
      this.#refetchIntervalId = void 0
    }
  }
  createResult(query, options) {
    const prevQuery = this.#currentQuery
    const prevOptions = this.options
    const prevResult = this.#currentResult
    const prevResultState = this.#currentResultState
    const prevResultOptions = this.#currentResultOptions
    const queryInitialState = query !== prevQuery ? query.state : this.#currentQueryInitialState
    const { state } = query
    let newState = { ...state }
    let isPlaceholderData = false
    let data
    if (options._optimisticResults) {
      const mounted = this.hasListeners()
      const fetchOnMount = !mounted && shouldFetchOnMount(query, options)
      const fetchOptionally =
        mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions)
      if (fetchOnMount || fetchOptionally)
        newState = {
          ...newState,
          ...fetchState(state.data, query.options),
        }
      if (options._optimisticResults === "isRestoring") newState.fetchStatus = "idle"
    }
    let { error, errorUpdatedAt, status } = newState
    data = newState.data
    let skipSelect = false
    if (options.placeholderData !== void 0 && data === void 0 && status === "pending") {
      let placeholderData
      if (
        prevResult?.isPlaceholderData &&
        options.placeholderData === prevResultOptions?.placeholderData
      ) {
        placeholderData = prevResult.data
        skipSelect = true
      } else
        placeholderData =
          typeof options.placeholderData === "function"
            ? options.placeholderData(
                this.#lastQueryWithDefinedData?.state.data,
                this.#lastQueryWithDefinedData,
              )
            : options.placeholderData
      if (placeholderData !== void 0) {
        status = "success"
        data = replaceData(prevResult?.data, placeholderData, options)
        isPlaceholderData = true
      }
    }
    if (options.select && data !== void 0 && !skipSelect) {
      if (prevResult && data === prevResultState?.data && options.select === this.#selectFn)
        data = this.#selectResult
      else
        try {
          this.#selectFn = options.select
          data = options.select(data)
          data = replaceData(prevResult?.data, data, options)
          this.#selectResult = data
          this.#selectError = null
        } catch (selectError) {
          this.#selectError = selectError
        }
    }
    if (this.#selectError) {
      error = this.#selectError
      data = this.#selectResult
      errorUpdatedAt = Date.now()
      status = "error"
    }
    const isFetching = newState.fetchStatus === "fetching"
    const isPending = status === "pending"
    const isError = status === "error"
    const isLoading = isPending && isFetching
    const hasData = data !== void 0
    const nextResult = {
      status,
      fetchStatus: newState.fetchStatus,
      isPending,
      isSuccess: status === "success",
      isError,
      isInitialLoading: isLoading,
      isLoading,
      data,
      dataUpdatedAt: newState.dataUpdatedAt,
      error,
      errorUpdatedAt,
      failureCount: newState.fetchFailureCount,
      failureReason: newState.fetchFailureReason,
      errorUpdateCount: newState.errorUpdateCount,
      isFetched: query.isFetched(),
      isFetchedAfterMount:
        newState.dataUpdateCount > queryInitialState.dataUpdateCount ||
        newState.errorUpdateCount > queryInitialState.errorUpdateCount,
      isFetching,
      isRefetching: isFetching && !isPending,
      isLoadingError: isError && !hasData,
      isPaused: newState.fetchStatus === "paused",
      isPlaceholderData,
      isRefetchError: isError && hasData,
      isStale: isStale(query, options),
      refetch: this.refetch,
      promise: this.#currentThenable,
      isEnabled: resolveQueryBoolean(options.enabled, query) !== false,
    }
    if (this.options.experimental_prefetchInRender) {
      const hasResultData = nextResult.data !== void 0
      const isErrorWithoutData = nextResult.status === "error" && !hasResultData
      const finalizeThenableIfPossible = (thenable) => {
        if (isErrorWithoutData) thenable.reject(nextResult.error)
        else if (hasResultData) thenable.resolve(nextResult.data)
      }
      const recreateThenable = () => {
        const pending = (this.#currentThenable = nextResult.promise = pendingThenable())
        finalizeThenableIfPossible(pending)
      }
      const prevThenable = this.#currentThenable
      switch (prevThenable.status) {
        case "pending":
          if (query.queryHash === prevQuery.queryHash) finalizeThenableIfPossible(prevThenable)
          break
        case "fulfilled":
          if (isErrorWithoutData || nextResult.data !== prevThenable.value) recreateThenable()
          break
        case "rejected":
          if (!isErrorWithoutData || nextResult.error !== prevThenable.reason) recreateThenable()
      }
    }
    return nextResult
  }
  updateResult() {
    const prevResult = this.#currentResult
    const nextResult = this.createResult(this.#currentQuery, this.options)
    this.#currentResultState = this.#currentQuery.state
    this.#currentResultOptions = this.options
    if (this.#currentResultState.data !== void 0)
      this.#lastQueryWithDefinedData = this.#currentQuery
    if (shallowEqualObjects(nextResult, prevResult)) return
    this.#currentResult = nextResult
    const shouldNotifyListeners = () => {
      if (!prevResult) return true
      const { notifyOnChangeProps } = this.options
      const notifyOnChangePropsValue =
        typeof notifyOnChangeProps === "function" ? notifyOnChangeProps() : notifyOnChangeProps
      if (
        notifyOnChangePropsValue === "all" ||
        (!notifyOnChangePropsValue && !this.#trackedProps.size)
      )
        return true
      const includedProps = new Set(notifyOnChangePropsValue ?? this.#trackedProps)
      if (this.options.throwOnError) includedProps.add("error")
      return Object.keys(this.#currentResult).some((key) => {
        const typedKey = key
        return this.#currentResult[typedKey] !== prevResult[typedKey] && includedProps.has(typedKey)
      })
    }
    this.#notify({ listeners: shouldNotifyListeners() })
  }
  #updateQuery() {
    const query = this.#client.getQueryCache().build(this.#client, this.options)
    if (query === this.#currentQuery) return
    const prevQuery = this.#currentQuery
    this.#currentQuery = query
    this.#currentQueryInitialState = query.state
    if (this.hasListeners()) {
      prevQuery?.removeObserver(this)
      query.addObserver(this)
    }
  }
  onQueryUpdate() {
    this.updateResult()
    if (this.hasListeners()) this.#updateTimers()
  }
  #notify(notifyOptions) {
    notifyManager.batch(() => {
      if (notifyOptions.listeners)
        this.listeners.forEach((listener) => {
          listener(this.#currentResult)
        })
      this.#client.getQueryCache().notify({
        query: this.#currentQuery,
        type: "observerResultsUpdated",
      })
    })
  }
}
function shouldLoadOnMount(query, options) {
  return (
    resolveQueryBoolean(options.enabled, query) !== false &&
    query.state.data === void 0 &&
    !(query.state.status === "error" && resolveQueryBoolean(options.retryOnMount, query) === false)
  )
}
function shouldFetchOnMount(query, options) {
  return (
    shouldLoadOnMount(query, options) ||
    (query.state.data !== void 0 && shouldFetchOn(query, options, options.refetchOnMount))
  )
}
function shouldFetchOn(query, options, field) {
  if (
    resolveQueryBoolean(options.enabled, query) !== false &&
    resolveStaleTime(options.staleTime, query) !== "static"
  ) {
    const value = typeof field === "function" ? field(query) : field
    return value === "always" || (value !== false && isStale(query, options))
  }
  return false
}
function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
  return (
    (query !== prevQuery || resolveQueryBoolean(prevOptions.enabled, query) === false) &&
    (!options.suspense || query.state.status !== "error") &&
    isStale(query, options)
  )
}
function isStale(query, options) {
  return (
    resolveQueryBoolean(options.enabled, query) !== false &&
    query.isStaleByTime(resolveStaleTime(options.staleTime, query))
  )
}
function shouldAssignObserverCurrentProperties(observer, optimisticResult) {
  if (!shallowEqualObjects(observer.getCurrentResult(), optimisticResult)) return true
  return false
}
//#endregion
//#region node_modules/.pnpm/@tanstack+query-core@5.101.4/node_modules/@tanstack/query-core/build/modern/mutationObserver.js
const MutationObserver$1 = class extends Subscribable {
  #client
  #currentResult = void 0
  #currentMutation
  #mutateOptions
  constructor(client, options) {
    super()
    this.#client = client
    this.setOptions(options)
    this.bindMethods()
    this.#updateResult()
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this)
    this.reset = this.reset.bind(this)
  }
  setOptions(options) {
    const prevOptions = this.options
    this.options = this.#client.defaultMutationOptions(options)
    if (!shallowEqualObjects(this.options, prevOptions))
      this.#client.getMutationCache().notify({
        type: "observerOptionsUpdated",
        mutation: this.#currentMutation,
        observer: this,
      })
    if (
      prevOptions?.mutationKey &&
      this.options.mutationKey &&
      hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)
    )
      this.reset()
    else if (this.#currentMutation?.state.status === "pending")
      this.#currentMutation.setOptions(this.options)
  }
  onUnsubscribe() {
    if (!this.hasListeners()) this.#currentMutation?.removeObserver(this)
  }
  onMutationUpdate(action) {
    this.#updateResult()
    this.#notify(action)
  }
  getCurrentResult() {
    return this.#currentResult
  }
  reset() {
    this.#currentMutation?.removeObserver(this)
    this.#currentMutation = void 0
    this.#updateResult()
    this.#notify()
  }
  mutate(variables, options) {
    this.#mutateOptions = options
    this.#currentMutation?.removeObserver(this)
    this.#currentMutation = this.#client.getMutationCache().build(this.#client, this.options)
    this.#currentMutation.addObserver(this)
    return this.#currentMutation.execute(variables)
  }
  #updateResult() {
    const state = this.#currentMutation?.state ?? getDefaultState()
    this.#currentResult = {
      ...state,
      isPending: state.status === "pending",
      isSuccess: state.status === "success",
      isError: state.status === "error",
      isIdle: state.status === "idle",
      mutate: this.mutate,
      reset: this.reset,
    }
  }
  #notify(action) {
    notifyManager.batch(() => {
      if (this.#mutateOptions && this.hasListeners()) {
        const variables = this.#currentResult.variables
        const onMutateResult = this.#currentResult.context
        const context = {
          client: this.#client,
          meta: this.options.meta,
          mutationKey: this.options.mutationKey,
        }
        if (action?.type === "success") {
          try {
            this.#mutateOptions.onSuccess?.(action.data, variables, onMutateResult, context)
          } catch (e) {
            Promise.reject(e)
          }
          try {
            this.#mutateOptions.onSettled?.(action.data, null, variables, onMutateResult, context)
          } catch (e) {
            Promise.reject(e)
          }
        } else if (action?.type === "error") {
          try {
            this.#mutateOptions.onError?.(action.error, variables, onMutateResult, context)
          } catch (e) {
            Promise.reject(e)
          }
          try {
            this.#mutateOptions.onSettled?.(
              void 0,
              action.error,
              variables,
              onMutateResult,
              context,
            )
          } catch (e) {
            Promise.reject(e)
          }
        }
      }
      this.listeners.forEach((listener) => {
        listener(this.#currentResult)
      })
    })
  }
}
//#endregion
//#region node_modules/.pnpm/@tanstack+react-query@5.101.4_react@19.2.8/node_modules/@tanstack/react-query/build/modern/IsRestoringProvider.js
const import_jsx_runtime = require_jsx_runtime()
const IsRestoringContext = import_react.createContext(false)
const useIsRestoring = () => import_react.useContext(IsRestoringContext)
IsRestoringContext.Provider
//#endregion
//#region node_modules/.pnpm/@tanstack+react-query@5.101.4_react@19.2.8/node_modules/@tanstack/react-query/build/modern/QueryErrorResetBoundary.js
function createValue() {
  let isReset = false
  return {
    clearReset: () => {
      isReset = false
    },
    reset: () => {
      isReset = true
    },
    isReset: () => {
      return isReset
    },
  }
}
const QueryErrorResetBoundaryContext = import_react.createContext(createValue())
const useQueryErrorResetBoundary = () => import_react.useContext(QueryErrorResetBoundaryContext)
//#endregion
//#region node_modules/.pnpm/@tanstack+react-query@5.101.4_react@19.2.8/node_modules/@tanstack/react-query/build/modern/errorBoundaryUtils.js
const ensurePreventErrorBoundaryRetry = (options, errorResetBoundary, query) => {
  const throwOnError =
    query?.state.error && typeof options.throwOnError === "function"
      ? shouldThrowError(options.throwOnError, [query.state.error, query])
      : options.throwOnError
  if (options.suspense || options.experimental_prefetchInRender || throwOnError) {
    if (!errorResetBoundary.isReset()) options.retryOnMount = false
  }
}
const useClearResetErrorBoundary = (errorResetBoundary) => {
  import_react.useEffect(() => {
    errorResetBoundary.clearReset()
  }, [errorResetBoundary])
}
const getHasError = ({ result, errorResetBoundary, throwOnError, query, suspense }) => {
  return (
    result.isError &&
    !errorResetBoundary.isReset() &&
    !result.isFetching &&
    query &&
    ((suspense && result.data === void 0) || shouldThrowError(throwOnError, [result.error, query]))
  )
}
//#endregion
//#region node_modules/.pnpm/@tanstack+react-query@5.101.4_react@19.2.8/node_modules/@tanstack/react-query/build/modern/suspense.js
const ensureSuspenseTimers = (defaultedOptions) => {
  if (defaultedOptions.suspense) {
    const MIN_SUSPENSE_TIME_MS = 1e3
    const clamp = (value) =>
      value === "static" ? value : Math.max(value ?? MIN_SUSPENSE_TIME_MS, MIN_SUSPENSE_TIME_MS)
    const originalStaleTime = defaultedOptions.staleTime
    defaultedOptions.staleTime =
      typeof originalStaleTime === "function"
        ? (...args) => clamp(originalStaleTime(...args))
        : clamp(originalStaleTime)
    if (typeof defaultedOptions.gcTime === "number")
      defaultedOptions.gcTime = Math.max(defaultedOptions.gcTime, MIN_SUSPENSE_TIME_MS)
  }
}
const willFetch = (result, isRestoring) => result.isLoading && result.isFetching && !isRestoring
const shouldSuspend = (defaultedOptions, result) => defaultedOptions?.suspense && result.isPending
const fetchOptimistic = (defaultedOptions, observer, errorResetBoundary) =>
  observer.fetchOptimistic(defaultedOptions).catch(() => {
    errorResetBoundary.clearReset()
  })
//#endregion
//#region node_modules/.pnpm/@tanstack+react-query@5.101.4_react@19.2.8/node_modules/@tanstack/react-query/build/modern/useBaseQuery.js
function useBaseQuery(options, Observer, queryClient) {
  const isRestoring = useIsRestoring()
  const errorResetBoundary = useQueryErrorResetBoundary()
  const client = useQueryClient(queryClient)
  const defaultedOptions = client.defaultQueryOptions(options)
  client.getDefaultOptions().queries?._experimental_beforeQuery?.(defaultedOptions)
  const query = client.getQueryCache().get(defaultedOptions.queryHash)
  const subscribed = options.subscribed !== false
  defaultedOptions._optimisticResults = isRestoring
    ? "isRestoring"
    : subscribed
      ? "optimistic"
      : void 0
  ensureSuspenseTimers(defaultedOptions)
  ensurePreventErrorBoundaryRetry(defaultedOptions, errorResetBoundary, query)
  useClearResetErrorBoundary(errorResetBoundary)
  const isNewCacheEntry = !client.getQueryCache().get(defaultedOptions.queryHash)
  const [observer] = import_react.useState(() => new Observer(client, defaultedOptions))
  const result = observer.getOptimisticResult(defaultedOptions)
  const shouldSubscribe = !isRestoring && subscribed
  import_react.useSyncExternalStore(
    import_react.useCallback(
      (onStoreChange) => {
        const unsubscribe = shouldSubscribe
          ? observer.subscribe(notifyManager.batchCalls(onStoreChange))
          : noop
        observer.updateResult()
        return unsubscribe
      },
      [observer, shouldSubscribe],
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult(),
  )
  import_react.useEffect(() => {
    observer.setOptions(defaultedOptions)
  }, [defaultedOptions, observer])
  if (shouldSuspend(defaultedOptions, result))
    throw fetchOptimistic(defaultedOptions, observer, errorResetBoundary)
  if (
    getHasError({
      result,
      errorResetBoundary,
      throwOnError: defaultedOptions.throwOnError,
      query,
      suspense: defaultedOptions.suspense,
    })
  )
    throw result.error
  client.getDefaultOptions().queries?._experimental_afterQuery?.(defaultedOptions, result)
  if (
    defaultedOptions.experimental_prefetchInRender &&
    !environmentManager.isServer() &&
    willFetch(result, isRestoring)
  )
    (isNewCacheEntry
      ? fetchOptimistic(defaultedOptions, observer, errorResetBoundary)
      : query?.promise
    )
      ?.catch(noop)
      .finally(() => {
        observer.updateResult()
      })
  return !defaultedOptions.notifyOnChangeProps ? observer.trackResult(result) : result
}
//#endregion
//#region node_modules/.pnpm/@tanstack+react-query@5.101.4_react@19.2.8/node_modules/@tanstack/react-query/build/modern/useQuery.js
function useQuery(options, queryClient) {
  return useBaseQuery(options, QueryObserver, queryClient)
}
//#endregion
//#region node_modules/.pnpm/@tanstack+react-query@5.101.4_react@19.2.8/node_modules/@tanstack/react-query/build/modern/queryOptions.js
function queryOptions(options) {
  return options
}
//#endregion
//#region node_modules/.pnpm/@tanstack+react-query@5.101.4_react@19.2.8/node_modules/@tanstack/react-query/build/modern/useMutation.js
function useMutation(options, queryClient) {
  const client = useQueryClient(queryClient)
  const [observer] = import_react.useState(() => new MutationObserver$1(client, options))
  import_react.useEffect(() => {
    observer.setOptions(options)
  }, [observer, options])
  const result = import_react.useSyncExternalStore(
    import_react.useCallback(
      (onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)),
      [observer],
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult(),
  )
  const mutate = import_react.useCallback(
    (variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(noop)
    },
    [observer],
  )
  if (result.error && shouldThrowError(observer.options.throwOnError, [result.error]))
    throw result.error
  return {
    ...result,
    mutate,
    mutateAsync: result.mutate,
  }
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/floating-ui-react/hooks/useFloatingRootContext.mjs
function useFloatingRootContext(options) {
  const { open = false, onOpenChange, elements = {} } = options
  const floatingId = useId()
  const nested = useFloatingParentNodeId() != null
  const store = useRefWithInit(
    () =>
      new FloatingRootStore({
        open,
        transitionStatus: void 0,
        onOpenChange,
        referenceElement: elements.reference ?? null,
        floatingElement: elements.floating ?? null,
        triggerElements: new PopupTriggerMap(),
        floatingId,
        syncOnly: false,
        nested,
      }),
  ).current
  useIsoLayoutEffect(() => {
    const valuesToSync = {
      open,
      floatingId,
    }
    if (elements.reference !== void 0) {
      valuesToSync.referenceElement = elements.reference
      valuesToSync.domReferenceElement = isElement(elements.reference) ? elements.reference : null
    }
    if (elements.floating !== void 0) valuesToSync.floatingElement = elements.floating
    store.update(valuesToSync)
  }, [open, floatingId, elements.reference, elements.floating, store])
  store.context.onOpenChange = onOpenChange
  store.context.nested = nested
  return store
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/floating-ui-react/hooks/useListNavigation.mjs
const ESCAPE = "Escape"
function isStationaryWebKitPointer(event) {
  return webkit && event.movementX === 0 && event.movementY === 0
}
function doSwitch(orientation, vertical, horizontal) {
  switch (orientation) {
    case "vertical":
      return vertical
    case "horizontal":
      return horizontal
    default:
      return vertical || horizontal
  }
}
function isMainOrientationKey(key, orientation) {
  return doSwitch(
    orientation,
    key === "ArrowUp" || key === "ArrowDown",
    key === "ArrowLeft" || key === "ArrowRight",
  )
}
function isMainOrientationToEndKey(key, orientation, rtl) {
  return (
    doSwitch(orientation, key === "ArrowDown", rtl ? key === "ArrowLeft" : key === "ArrowRight") ||
    key === "Enter" ||
    key === " " ||
    key === ""
  )
}
function isCrossOrientationOpenKey(key, orientation, rtl) {
  return doSwitch(orientation, rtl ? key === ARROW_LEFT : key === ARROW_RIGHT, key === ARROW_DOWN)
}
function isCrossOrientationCloseKey(key, orientation, rtl, grid) {
  const vertical = rtl ? key === ARROW_RIGHT : key === ARROW_LEFT
  const horizontal = key === ARROW_UP
  if (orientation === "both" || (orientation === "horizontal" && grid)) return key === ESCAPE
  return doSwitch(orientation, vertical, horizontal)
}
/**
 * Adds arrow key-based navigation of a list of items, either using real DOM
 * focus or virtual focus.
 * @see https://floating-ui.com/docs/useListNavigation
 */
function useListNavigation(context, props) {
  const {
    listRef,
    activeIndex,
    onNavigate: onNavigateProp = () => {},
    enabled = true,
    selectedIndex = null,
    allowEscape = false,
    loopFocus = false,
    nested = false,
    rtl = false,
    virtual = false,
    focusItemOnOpen = "auto",
    focusItemOnHover = true,
    openOnArrowKeyDown = true,
    disabledIndices = void 0,
    orientation = "vertical",
    parentOrientation,
    id,
    resetOnPointerLeave = true,
    externalTree,
    grid: navigateGrid,
  } = props
  const isGrid = navigateGrid != null
  const store = "rootStore" in context ? context.rootStore : context
  const open = store.useState("open")
  const floatingElement = store.useState("floatingElement")
  const domReferenceElement = store.useState("domReferenceElement")
  const dataRef = store.context.dataRef
  const floatingFocusElement = getFloatingFocusElement(floatingElement)
  const typeableComboboxReference = isTypeableCombobox(domReferenceElement)
  const floatingFocusElementRef = useValueAsRef(floatingFocusElement)
  const parentId = useFloatingParentNodeId()
  const tree = useFloatingTree(externalTree)
  const focusItemOnOpenRef = import_react.useRef(focusItemOnOpen)
  const indexRef = import_react.useRef(selectedIndex ?? -1)
  const keyRef = import_react.useRef(null)
  const isPointerModalityRef = import_react.useRef(true)
  const onNavigate = useStableCallback((event) => {
    onNavigateProp(indexRef.current === -1 ? null : indexRef.current, event)
  })
  const previousMountedRef = import_react.useRef(Boolean(floatingElement))
  const previousOpenRef = import_react.useRef(open)
  const forceSyncFocusRef = import_react.useRef(false)
  const forceScrollIntoViewRef = import_react.useRef(false)
  const cancelQueuedFocusRef = import_react.useRef(null)
  const disabledIndicesRef = useValueAsRef(disabledIndices)
  const latestOpenRef = useValueAsRef(open)
  const selectedIndexRef = useValueAsRef(selectedIndex)
  const resetOnPointerLeaveRef = useValueAsRef(resetOnPointerLeave)
  const focusFrame = useAnimationFrame()
  const waitForListPopulatedFrame = useAnimationFrame()
  const focusItem = useStableCallback(() => {
    function runFocus(item) {
      if (virtual) tree?.events.emit("virtualfocus", item)
      else
        cancelQueuedFocusRef.current = enqueueFocus(item, {
          sync: forceSyncFocusRef.current,
          preventScroll: true,
        })
    }
    const initialItem = listRef.current[indexRef.current]
    const forceScrollIntoView = forceScrollIntoViewRef.current
    if (initialItem) runFocus(initialItem)
    ;(forceSyncFocusRef.current
      ? (callback) => callback()
      : (callback) => focusFrame.request(callback))(() => {
      const waitedItem = listRef.current[indexRef.current] || initialItem
      if (!waitedItem) return
      if (!initialItem) runFocus(waitedItem)
      if (item && (forceScrollIntoView || !isPointerModalityRef.current))
        waitedItem.scrollIntoView?.({
          block: "nearest",
          inline: "nearest",
        })
    })
  })
  useIsoLayoutEffect(() => {
    dataRef.current.orientation = orientation
  }, [dataRef, orientation])
  useIsoLayoutEffect(() => {
    if (!enabled) return
    if (open && floatingElement) {
      indexRef.current = selectedIndex ?? -1
      if (focusItemOnOpenRef.current && selectedIndex != null) {
        forceScrollIntoViewRef.current = true
        onNavigate()
      }
    } else if (previousMountedRef.current) {
      indexRef.current = -1
      onNavigate()
    }
  }, [enabled, open, floatingElement, selectedIndex, onNavigate])
  useIsoLayoutEffect(() => {
    if (!enabled) return
    if (!open) {
      forceSyncFocusRef.current = false
      return
    }
    if (!floatingElement) return
    if (activeIndex == null) {
      forceSyncFocusRef.current = false
      if (selectedIndexRef.current != null) return
      if (previousMountedRef.current) {
        indexRef.current = -1
        focusItem()
      }
      if (
        (!previousOpenRef.current || !previousMountedRef.current) &&
        focusItemOnOpenRef.current &&
        (keyRef.current != null || (focusItemOnOpenRef.current === true && keyRef.current == null))
      ) {
        let runs = 0
        const waitForListPopulated = () => {
          if (listRef.current[0] == null) {
            if (runs < 2)
              (runs ? (callback) => waitForListPopulatedFrame.request(callback) : queueMicrotask)(
                waitForListPopulated,
              )
            runs += 1
          } else {
            indexRef.current =
              keyRef.current == null ||
              isMainOrientationToEndKey(keyRef.current, orientation, rtl) ||
              nested
                ? getMinListIndex(listRef)
                : getMaxListIndex(listRef)
            keyRef.current = null
            onNavigate()
          }
        }
        waitForListPopulated()
      }
    } else if (!isIndexOutOfListBounds(listRef.current, activeIndex)) {
      indexRef.current = activeIndex
      focusItem()
      forceScrollIntoViewRef.current = false
    }
  }, [
    enabled,
    open,
    floatingElement,
    activeIndex,
    selectedIndexRef,
    nested,
    listRef,
    orientation,
    rtl,
    onNavigate,
    focusItem,
    waitForListPopulatedFrame,
  ])
  useIsoLayoutEffect(() => {
    if (!enabled || floatingElement || !tree || virtual || !previousMountedRef.current) return
    const nodes = tree.nodesRef.current
    const parent = nodes.find((node) => node.id === parentId)?.context?.elements.floating
    const activeEl = activeElement(ownerDocument(domReferenceElement ?? parent ?? null))
    const treeContainsActiveEl = nodes.some(
      (node) => node.context && contains(node.context.elements.floating, activeEl),
    )
    if (parent && !treeContainsActiveEl && isPointerModalityRef.current)
      parent.focus({ preventScroll: true })
  }, [enabled, floatingElement, domReferenceElement, tree, parentId, virtual])
  useIsoLayoutEffect(() => {
    previousOpenRef.current = open
    previousMountedRef.current = Boolean(floatingElement)
  })
  useIsoLayoutEffect(() => {
    if (!open) {
      keyRef.current = null
      focusItemOnOpenRef.current = focusItemOnOpen
    }
  }, [open, focusItemOnOpen])
  const hasActiveIndex = activeIndex != null
  const syncCurrentTarget = useStableCallback((event) => {
    if (!latestOpenRef.current) return
    const index = listRef.current.indexOf(event.currentTarget)
    if (index !== -1 && (indexRef.current !== index || activeIndex !== index)) {
      indexRef.current = index
      onNavigate(event)
    }
  })
  const getParentOrientation = useStableCallback(() => {
    return (
      parentOrientation ??
      tree?.nodesRef.current.find((node) => node.id === parentId)?.context?.dataRef?.current
        .orientation
    )
  })
  const getMinEnabledIndex = useStableCallback(() => {
    return getMinListIndex(listRef, disabledIndicesRef.current)
  })
  const commonOnKeyDown = useStableCallback((event) => {
    isPointerModalityRef.current = false
    forceSyncFocusRef.current = true
    if (event.which === 229) return
    if (!latestOpenRef.current && event.currentTarget === floatingFocusElementRef.current) return
    if (nested && isCrossOrientationCloseKey(event.key, orientation, rtl, isGrid)) {
      if (!isMainOrientationKey(event.key, getParentOrientation())) stopEvent(event)
      store.setOpen(false, createChangeEventDetails(listNavigation, event.nativeEvent))
      if (isHTMLElement(domReferenceElement)) {
        if (virtual) tree?.events.emit("virtualfocus", domReferenceElement)
        else domReferenceElement.focus()
      }
      return
    }
    const currentIndex = indexRef.current
    const minIndex = getMinListIndex(listRef, disabledIndices)
    const maxIndex = getMaxListIndex(listRef, disabledIndices)
    if (!typeableComboboxReference) {
      if (event.key === "Home") {
        stopEvent(event)
        indexRef.current = minIndex
        onNavigate(event)
      }
      if (event.key === "End") {
        stopEvent(event)
        indexRef.current = maxIndex
        onNavigate(event)
      }
    }
    if (navigateGrid != null) {
      const index = navigateGrid(
        event,
        indexRef.current,
        listRef,
        orientation,
        loopFocus,
        rtl,
        disabledIndices,
        minIndex,
        maxIndex,
      )
      if (index != null) {
        indexRef.current = index
        onNavigate(event)
      }
      if (orientation === "both") return
    }
    if (isMainOrientationKey(event.key, orientation)) {
      stopEvent(event)
      if (
        open &&
        !virtual &&
        activeElement(event.currentTarget.ownerDocument) === event.currentTarget
      ) {
        indexRef.current = isMainOrientationToEndKey(event.key, orientation, rtl)
          ? minIndex
          : maxIndex
        onNavigate(event)
        return
      }
      if (isMainOrientationToEndKey(event.key, orientation, rtl)) {
        if (loopFocus) {
          if (currentIndex >= maxIndex) {
            if (allowEscape && currentIndex !== listRef.current.length) indexRef.current = -1
            else {
              forceSyncFocusRef.current = false
              indexRef.current = minIndex
            }
          } else
            indexRef.current = findNonDisabledListIndex(listRef.current, {
              startingIndex: currentIndex,
              disabledIndices,
            })
        } else
          indexRef.current = Math.min(
            maxIndex,
            findNonDisabledListIndex(listRef.current, {
              startingIndex: currentIndex,
              disabledIndices,
            }),
          )
      } else if (loopFocus) {
        if (currentIndex <= minIndex) {
          if (allowEscape && currentIndex !== -1) indexRef.current = listRef.current.length
          else {
            forceSyncFocusRef.current = false
            indexRef.current = maxIndex
          }
        } else
          indexRef.current = findNonDisabledListIndex(listRef.current, {
            startingIndex: currentIndex,
            decrement: true,
            disabledIndices,
          })
      } else
        indexRef.current = Math.max(
          minIndex,
          findNonDisabledListIndex(listRef.current, {
            startingIndex: currentIndex,
            decrement: true,
            disabledIndices,
          }),
        )
      if (isIndexOutOfListBounds(listRef.current, indexRef.current)) indexRef.current = -1
      onNavigate(event)
    }
  })
  const item = import_react.useMemo(() => {
    return {
      onFocus(event) {
        forceSyncFocusRef.current = true
        syncCurrentTarget(event)
      },
      onClick: ({ currentTarget }) => currentTarget.focus({ preventScroll: true }),
      onMouseMove(event) {
        if (isStationaryWebKitPointer(event)) return
        forceSyncFocusRef.current = true
        forceScrollIntoViewRef.current = false
        if (focusItemOnHover) syncCurrentTarget(event)
      },
      onPointerLeave(event) {
        if (
          !latestOpenRef.current ||
          !isPointerModalityRef.current ||
          event.pointerType === "touch"
        )
          return
        forceSyncFocusRef.current = true
        const relatedTarget = event.relatedTarget
        if (!focusItemOnHover || listRef.current.includes(relatedTarget)) return
        if (!resetOnPointerLeaveRef.current) return
        cancelQueuedFocusRef.current?.()
        cancelQueuedFocusRef.current = null
        indexRef.current = -1
        onNavigate(event)
        if (!virtual) {
          const floatingFocusEl = floatingFocusElementRef.current
          const activeEl = activeElement(ownerDocument(floatingFocusEl))
          if (floatingFocusEl && contains(floatingFocusEl, activeEl))
            floatingFocusEl.focus({ preventScroll: true })
        }
      },
    }
  }, [
    syncCurrentTarget,
    latestOpenRef,
    floatingFocusElementRef,
    focusItemOnHover,
    listRef,
    onNavigate,
    resetOnPointerLeaveRef,
    virtual,
  ])
  const ariaActiveDescendantProp = import_react.useMemo(() => {
    return virtual && open && hasActiveIndex && { "aria-activedescendant": `${id}-${activeIndex}` }
  }, [virtual, open, hasActiveIndex, id, activeIndex])
  const floating = import_react.useMemo(() => {
    return {
      "aria-orientation": orientation === "both" ? void 0 : orientation,
      ...(!typeableComboboxReference ? ariaActiveDescendantProp : {}),
      "onKeyDown"(event) {
        if (event.key === "Tab" && event.shiftKey && open && !virtual) {
          const target = getTarget(event.nativeEvent)
          if (target && !contains(floatingFocusElementRef.current, target)) return
          stopEvent(event)
          store.setOpen(false, createChangeEventDetails(focusOut, event.nativeEvent))
          if (isHTMLElement(domReferenceElement)) domReferenceElement.focus()
          return
        }
        commonOnKeyDown(event)
      },
      "onPointerMove"(event) {
        if (isStationaryWebKitPointer(event)) return
        isPointerModalityRef.current = true
      },
    }
  }, [
    ariaActiveDescendantProp,
    commonOnKeyDown,
    floatingFocusElementRef,
    orientation,
    typeableComboboxReference,
    store,
    open,
    virtual,
    domReferenceElement,
  ])
  const trigger = import_react.useMemo(() => {
    function openOnNavigationKeyDown(event) {
      store.setOpen(
        true,
        createChangeEventDetails(listNavigation, event.nativeEvent, event.currentTarget),
      )
    }
    function checkVirtualMouse(event) {
      if (focusItemOnOpen === "auto" && isVirtualClick(event.nativeEvent))
        focusItemOnOpenRef.current = !virtual
    }
    function checkVirtualPointer(event) {
      focusItemOnOpenRef.current = focusItemOnOpen
      if (focusItemOnOpen === "auto" && isVirtualPointerEvent(event.nativeEvent))
        focusItemOnOpenRef.current = true
    }
    return {
      onKeyDown(event) {
        const currentOpen = store.select("open")
        isPointerModalityRef.current = false
        const isArrowKey = event.key.startsWith("Arrow")
        const isParentCrossOpenKey = isCrossOrientationOpenKey(
          event.key,
          getParentOrientation(),
          rtl,
        )
        const isMainKey = isMainOrientationKey(event.key, orientation)
        const isNavigationKey =
          (nested ? isParentCrossOpenKey : isMainKey) ||
          event.key === "Enter" ||
          event.key.trim() === ""
        if (virtual && currentOpen) return commonOnKeyDown(event)
        if (!currentOpen && !openOnArrowKeyDown && isArrowKey) return
        if (isNavigationKey) {
          const isParentMainKey = isMainOrientationKey(event.key, getParentOrientation())
          keyRef.current = nested && isParentMainKey ? null : event.key
        }
        if (nested) {
          if (isParentCrossOpenKey) {
            stopEvent(event)
            if (currentOpen) {
              indexRef.current = getMinEnabledIndex()
              onNavigate(event)
            } else openOnNavigationKeyDown(event)
          }
          return
        }
        if (isMainKey) {
          if (selectedIndexRef.current != null) indexRef.current = selectedIndexRef.current
          stopEvent(event)
          if (!currentOpen && openOnArrowKeyDown) openOnNavigationKeyDown(event)
          else commonOnKeyDown(event)
          if (currentOpen) onNavigate(event)
        }
      },
      onFocus(event) {
        if (store.select("open") && !virtual) {
          indexRef.current = -1
          onNavigate(event)
        }
      },
      onPointerDown: checkVirtualPointer,
      onPointerEnter: checkVirtualPointer,
      onMouseDown: checkVirtualMouse,
      onClick: checkVirtualMouse,
    }
  }, [
    commonOnKeyDown,
    focusItemOnOpen,
    getMinEnabledIndex,
    nested,
    onNavigate,
    store,
    openOnArrowKeyDown,
    orientation,
    getParentOrientation,
    rtl,
    selectedIndexRef,
    virtual,
  ])
  const reference = import_react.useMemo(() => {
    return {
      ...ariaActiveDescendantProp,
      ...trigger,
    }
  }, [ariaActiveDescendantProp, trigger])
  return import_react.useMemo(
    () =>
      enabled
        ? {
            reference,
            floating,
            item,
            trigger,
          }
        : {},
    [enabled, reference, floating, trigger, item],
  )
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/floating-ui-react/hooks/useTypeahead.mjs
/**
 * Provides a matching callback that can be used to focus an item as the user
 * types, often used in tandem with `useListNavigation()`.
 * @see https://floating-ui.com/docs/useTypeahead
 */
function useTypeahead(context, props) {
  const {
    listRef,
    elementsRef,
    activeIndex,
    onMatch: onMatchProp,
    disabledIndices,
    onTyping,
    enabled = true,
    resetMs = 750,
    selectedIndex = null,
  } = props
  const store = "rootStore" in context ? context.rootStore : context
  const open = store.useState("open")
  const timeout = useTimeout()
  const stringRef = import_react.useRef("")
  const prevIndexRef = import_react.useRef(selectedIndex ?? activeIndex ?? -1)
  const matchIndexRef = import_react.useRef(null)
  const onKeyDown = useStableCallback((event) => {
    function getElement(index) {
      return elementsRef?.current[index]
    }
    function isItemAvailable(index) {
      const element = getElement(index)
      if ((element && !isElementVisible(element)) || element?.matches(":disabled")) return false
      return disabledIndices == null || !isListIndexDisabled(EMPTY_ARRAY, index, disabledIndices)
    }
    function getMatchingIndex(list, string, startIndex = 0) {
      if (list.length === 0) return -1
      const normalizedStartIndex = ((startIndex % list.length) + list.length) % list.length
      const lowerString = string.toLowerCase()
      for (let offset = 0; offset < list.length; offset += 1) {
        const index = (normalizedStartIndex + offset) % list.length
        if (!list[index]?.toLowerCase().startsWith(lowerString) || !isItemAvailable(index)) continue
        return index
      }
      return -1
    }
    const listContent = listRef.current
    if (stringRef.current.length > 0 && event.key === " ") {
      stopEvent(event)
      onTyping?.(true)
    }
    if (stringRef.current.length > 0 && stringRef.current[0] !== " ") {
      if (getMatchingIndex(listContent, stringRef.current) === -1 && event.key !== " ")
        onTyping?.(false)
    }
    if (
      listContent == null ||
      event.key.length !== 1 ||
      event.ctrlKey ||
      event.metaKey ||
      event.altKey
    )
      return
    if (open && event.key !== " ") {
      stopEvent(event)
      onTyping?.(true)
    }
    const isNewSession = stringRef.current === ""
    if (isNewSession) prevIndexRef.current = selectedIndex ?? activeIndex ?? -1
    if (
      listContent.every((text, index) =>
        text && isItemAvailable(index) ? text[0]?.toLowerCase() !== text[1]?.toLowerCase() : true,
      ) &&
      stringRef.current === event.key
    ) {
      stringRef.current = ""
      prevIndexRef.current = matchIndexRef.current
    }
    stringRef.current += event.key
    timeout.start(resetMs, () => {
      stringRef.current = ""
      prevIndexRef.current = matchIndexRef.current
      onTyping?.(false)
    })
    const startIndex =
      ((isNewSession ? (selectedIndex ?? activeIndex ?? -1) : prevIndexRef.current) ?? 0) + 1
    const index = getMatchingIndex(listContent, stringRef.current, startIndex)
    if (index !== -1) {
      onMatchProp?.(index)
      matchIndexRef.current = index
    } else if (event.key !== " ") {
      stringRef.current = ""
      onTyping?.(false)
    }
  })
  const onBlur = useStableCallback((event) => {
    const next = event.relatedTarget
    const currentDomReferenceElement = store.select("domReferenceElement")
    const currentFloatingElement = store.select("floatingElement")
    if (contains(currentDomReferenceElement, next) || contains(currentFloatingElement, next)) return
    timeout.clear()
    stringRef.current = ""
    prevIndexRef.current = matchIndexRef.current
    onTyping?.(false)
  })
  useIsoLayoutEffect(() => {
    if (!open && selectedIndex !== null) return
    timeout.clear()
    matchIndexRef.current = null
    if (stringRef.current !== "") stringRef.current = ""
  }, [open, selectedIndex, timeout])
  const sharedProps = import_react.useMemo(
    () => ({
      onKeyDown,
      onBlur,
    }),
    [onKeyDown, onBlur],
  )
  return import_react.useMemo(
    () =>
      enabled
        ? {
            reference: sharedProps,
            floating: sharedProps,
          }
        : {},
    [enabled, sharedProps],
  )
}
/**
 * @license @tabler/icons-react v3.46.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const IconArrowsSort = createReactComponent("outline", "arrows-sort", "ArrowsSort", [
  [
    "path",
    {
      d: "M3 9l4 -4l4 4m-4 -4v14",
      key: "svg-0",
    },
  ],
  [
    "path",
    {
      d: "M21 15l-4 4l-4 -4m4 4v-14",
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
const IconCheck = createReactComponent("outline", "check", "Check", [
  [
    "path",
    {
      d: "M5 12l5 5l10 -10",
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
const IconChevronDown = createReactComponent("outline", "chevron-down", "ChevronDown", [
  [
    "path",
    {
      d: "M6 9l6 6l6 -6",
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
const IconChevronLeft = createReactComponent("outline", "chevron-left", "ChevronLeft", [
  [
    "path",
    {
      d: "M15 6l-6 6l6 6",
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
const IconChevronRight = createReactComponent("outline", "chevron-right", "ChevronRight", [
  [
    "path",
    {
      d: "M9 6l6 6l-6 6",
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
const IconChevronUp = createReactComponent("outline", "chevron-up", "ChevronUp", [
  [
    "path",
    {
      d: "M6 15l6 -6l6 6",
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
const IconClipboard = createReactComponent("outline", "clipboard", "Clipboard", [
  [
    "path",
    {
      d: "M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2",
      key: "svg-0",
    },
  ],
  [
    "path",
    {
      d: "M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2",
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
const IconLink = createReactComponent("outline", "link", "Link", [
  [
    "path",
    {
      d: "M9 15l6 -6",
      key: "svg-0",
    },
  ],
  [
    "path",
    {
      d: "M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464",
      key: "svg-1",
    },
  ],
  [
    "path",
    {
      d: "M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463",
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
const IconListDetails = createReactComponent("outline", "list-details", "ListDetails", [
  [
    "path",
    {
      d: "M13 5h8",
      key: "svg-0",
    },
  ],
  [
    "path",
    {
      d: "M13 9h5",
      key: "svg-1",
    },
  ],
  [
    "path",
    {
      d: "M13 15h8",
      key: "svg-2",
    },
  ],
  [
    "path",
    {
      d: "M13 19h5",
      key: "svg-3",
    },
  ],
  [
    "path",
    {
      d: "M3 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4",
      key: "svg-4",
    },
  ],
  [
    "path",
    {
      d: "M3 15a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4",
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
const IconSelector = createReactComponent("outline", "selector", "Selector", [
  [
    "path",
    {
      d: "M8 9l4 -4l4 4",
      key: "svg-0",
    },
  ],
  [
    "path",
    {
      d: "M16 15l-4 4l-4 -4",
      key: "svg-1",
    },
  ],
])
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/internals/labelable-provider/useAriaLabelledBy.mjs
function useAriaLabelledBy(
  explicitAriaLabelledBy,
  labelId,
  labelSourceRef,
  enableFallback = true,
  labelSourceId,
) {
  const [fallbackAriaLabelledBy, setFallbackAriaLabelledBy] = import_react.useState()
  const generatedLabelId = useBaseUiId(labelSourceId ? `${labelSourceId}-label` : void 0)
  const ariaLabelledBy = explicitAriaLabelledBy ?? labelId ?? fallbackAriaLabelledBy
  useIsoLayoutEffect(() => {
    const nextAriaLabelledBy =
      explicitAriaLabelledBy || labelId || !enableFallback
        ? void 0
        : getAriaLabelledBy(labelSourceRef.current, generatedLabelId)
    if (fallbackAriaLabelledBy !== nextAriaLabelledBy) setFallbackAriaLabelledBy(nextAriaLabelledBy)
  })
  return ariaLabelledBy
}
function getAriaLabelledBy(labelSource, generatedLabelId) {
  const label = findAssociatedLabel(labelSource)
  if (!label) return
  if (!label.id && generatedLabelId) label.id = generatedLabelId
  return label.id || void 0
}
function findAssociatedLabel(labelSource) {
  if (!labelSource) return
  const parent = labelSource.parentElement
  if (parent && parent.tagName === "LABEL") return parent
  const controlId = labelSource.id
  if (controlId) {
    const nextSibling = labelSource.nextElementSibling
    if (nextSibling && nextSibling.htmlFor === controlId) return nextSibling
  }
  const labels = labelSource.labels
  return labels && labels[0]
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.2_@types_46200efdf1f5c806fc19b01530afd9e7/node_modules/@base-ui/utils/usePreviousValue.mjs
/**
 * Returns a previous value of its argument.
 * @param value Current value.
 * @returns Previous value, or null if there is no previous value.
 */
function usePreviousValue(value) {
  const [state, setState] = import_react.useState({
    current: value,
    previous: null,
  })
  if (!Object.is(value, state.current))
    setState({
      current: value,
      previous: state.current,
    })
  return state.previous
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/use-render/useRender.mjs
/**
 * Renders a Base UI element.
 *
 * @public
 */
function useRender(params) {
  return useRenderElement(params.defaultTagName ?? "div", params, params)
}
//#endregion
//#region src/components/ui/button-group.tsx
const buttonGroupVariants = tv({
  base: "flex w-fit items-stretch rounded-none *:focus-visible:relative *:focus-visible:z-10 has-[>[data-slot=button-group]]:gap-2 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-none [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  variants: {
    orientation: {
      horizontal:
        "*:data-slot:rounded-r-none [&>[data-slot]~[data-slot]]:rounded-l-none [&>[data-slot]~[data-slot]]:border-l-0",
      vertical:
        "flex-col *:data-slot:rounded-b-none [&>[data-slot]~[data-slot]]:rounded-t-none [&>[data-slot]~[data-slot]]:border-t-0",
    },
  },
  defaultVariants: { orientation: "horizontal" },
})
function ButtonGroup({ className, orientation, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    "role": "group",
    "data-slot": "button-group",
    "data-orientation": orientation,
    "className": cn(buttonGroupVariants({ orientation }), className),
    ...props,
  })
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.2_@types_46200efdf1f5c806fc19b01530afd9e7/node_modules/@base-ui/utils/useOnFirstRender.mjs
function useOnFirstRender(fn) {
  const ref = import_react.useRef(true)
  if (ref.current) {
    ref.current = false
    fn()
  }
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.2_@types_46200efdf1f5c806fc19b01530afd9e7/node_modules/@base-ui/utils/isElementDisabled.mjs
function isElementDisabled(element) {
  return (
    element == null ||
    element.hasAttribute("disabled") ||
    element.getAttribute("aria-disabled") === "true"
  )
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/select/root/SelectRootContext.mjs
const SelectRootContext = /*#__PURE__*/ import_react.createContext(null)
function useSelectRootContext() {
  const context = import_react.useContext(SelectRootContext)
  if (context === null) throw new Error(formatErrorMessage(60))
  return context
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/internals/itemEquality.mjs
const defaultItemEquality = (itemValue, selectedValue) => Object.is(itemValue, selectedValue)
function compareItemEquality(itemValue, selectedValue, comparer) {
  if (itemValue == null || selectedValue == null) return Object.is(itemValue, selectedValue)
  return comparer(itemValue, selectedValue)
}
function findItemIndex(itemValues, selectedValue, comparer) {
  if (!itemValues || itemValues.length === 0) return -1
  return itemValues.findIndex((itemValue) => {
    if (itemValue === void 0) return false
    return compareItemEquality(itemValue, selectedValue, comparer)
  })
}
function removeItem(selectedValues, itemValue, comparer) {
  return selectedValues.filter(
    (selectedValue) => !compareItemEquality(itemValue, selectedValue, comparer),
  )
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/internals/serializeValue.mjs
function serializeValue(value) {
  if (value == null) return ""
  if (typeof value === "string") return value
  try {
    return JSON.stringify(value)
  } catch {
    return String(value)
  }
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/internals/resolveValueLabel.mjs
function isGroupedItems(items) {
  return (
    items != null &&
    items.length > 0 &&
    typeof items[0] === "object" &&
    items[0] != null &&
    "items" in items[0]
  )
}
/**
 * Checks if the items array contains an item with a null value that has a non-null label.
 */
function hasNullItemLabel(items) {
  if (!Array.isArray(items)) return items != null && "null" in items
  const arrayItems = items
  if (isGroupedItems(arrayItems)) {
    for (const group of arrayItems)
      for (const item of group.items)
        if (item && item.value == null && item.label != null) return true
    return false
  }
  for (const item of arrayItems) if (item && item.value == null && item.label != null) return true
  return false
}
function stringifyAsLabel(item, itemToStringLabel) {
  if (itemToStringLabel && item != null) return itemToStringLabel(item) ?? ""
  if (item && typeof item === "object") {
    if ("label" in item && item.label != null) return String(item.label)
    if ("value" in item) return String(item.value)
  }
  return serializeValue(item)
}
function stringifyAsValue(item, itemToStringValue) {
  if (itemToStringValue && item != null) return itemToStringValue(item) ?? ""
  if (item && typeof item === "object" && "value" in item && "label" in item)
    return serializeValue(item.value)
  return serializeValue(item)
}
function resolveSelectedLabel(value, items, itemToStringLabel) {
  function fallback() {
    return stringifyAsLabel(value, itemToStringLabel)
  }
  if (itemToStringLabel && value != null) return itemToStringLabel(value)
  if (value && typeof value === "object" && "label" in value && value.label != null)
    return value.label
  if (items && !Array.isArray(items)) return items[value] ?? fallback()
  if (Array.isArray(items)) {
    const arrayItems = items
    const flatItems = isGroupedItems(arrayItems)
      ? arrayItems.flatMap((group) => group.items)
      : arrayItems
    if (value == null || typeof value !== "object") {
      const match = flatItems.find((item) => item.value === value)
      if (match && match.label != null) return match.label
      return fallback()
    }
    if ("value" in value) {
      const match = flatItems.find((item) => item && item.value === value.value)
      if (match && match.label != null) return match.label
    }
  }
  return fallback()
}
function resolveMultipleLabels(values, items, itemToStringLabel) {
  return values.reduce((acc, value, index) => {
    if (index > 0) acc.push(", ")
    acc.push(
      /*#__PURE__*/ (0, import_jsx_runtime.jsx)(
        import_react.Fragment,
        { children: resolveSelectedLabel(value, items, itemToStringLabel) },
        index,
      ),
    )
    return acc
  }, [])
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/select/store.mjs
const selectors = {
  id: (state) => state.id,
  labelId: (state) => state.labelId,
  modal: (state) => state.modal,
  items: (state) => state.items,
  itemToStringLabel: (state) => state.itemToStringLabel,
  isItemEqualToValue: (state) => state.isItemEqualToValue,
  value: (state) => state.value,
  hasSelectedValue: (state) => {
    const { value, multiple, itemToStringValue } = state
    if (value == null) return false
    if (multiple && Array.isArray(value)) return value.length > 0
    return stringifyAsValue(value, itemToStringValue) !== ""
  },
  hasNullItemLabel: (state, enabled) => {
    return enabled ? hasNullItemLabel(state.items) : false
  },
  open: (state) => state.open,
  mounted: (state) => state.mounted,
  forceMount: (state) => state.forceMount,
  transitionStatus: (state) => state.transitionStatus,
  openMethod: (state) => state.openMethod,
  activeIndex: (state) => state.activeIndex,
  selectedIndex: (state) => state.selectedIndex,
  isActive: (state, index) => state.activeIndex === index,
  isSelected: (state, itemValue) => {
    const comparer = state.isItemEqualToValue
    const storeValue = state.value
    if (state.multiple)
      return (
        Array.isArray(storeValue) &&
        storeValue.some((selectedItem) => compareItemEquality(itemValue, selectedItem, comparer))
      )
    return compareItemEquality(itemValue, storeValue, comparer)
  },
  isSelectedByFocus: (state, index) => {
    return state.selectedIndex === index
  },
  popupProps: (state) => state.popupProps,
  triggerProps: (state) => state.triggerProps,
  triggerElement: (state) => state.triggerElement,
  positionerElement: (state) => state.positionerElement,
  listElement: (state) => state.listElement,
  popupSide: (state) => state.popupSide,
  scrollUpArrowVisible: (state) => state.scrollUpArrowVisible,
  scrollDownArrowVisible: (state) => state.scrollDownArrowVisible,
  hasScrollArrows: (state) => state.hasScrollArrows,
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/internals/areArraysEqual.mjs
function areArraysEqual(array1, array2, itemComparer = (a, b) => a === b) {
  return (
    array1.length === array2.length &&
    array1.every((value, index) => itemComparer(value, array2[index]))
  )
}
function getMaxScrollOffset(scrollSize, clientSize) {
  return Math.max(0, scrollSize - clientSize)
}
function normalizeScrollOffset(value, max) {
  if (max <= 0) return 0
  const clamped = clamp(value, 0, max)
  const startDistance = clamped
  const endDistance = max - clamped
  const withinStartTolerance = startDistance <= 1
  const withinEndTolerance = endDistance <= 1
  if (withinStartTolerance && withinEndTolerance) return startDistance <= endDistance ? 0 : max
  if (withinStartTolerance) return 0
  if (withinEndTolerance) return max
  return clamped
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/select/root/SelectRoot.mjs
/**
 * Groups all parts of the select.
 * Doesn't render its own HTML element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
function SelectRoot(props) {
  const {
    id,
    value: valueProp,
    defaultValue = null,
    onValueChange,
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    name: nameProp,
    form,
    autoComplete,
    disabled: disabledProp = false,
    readOnly = false,
    required = false,
    modal = true,
    actionsRef,
    inputRef,
    onOpenChangeComplete,
    items,
    multiple = false,
    itemToStringLabel,
    itemToStringValue,
    isItemEqualToValue = defaultItemEquality,
    highlightItemOnHover = true,
    children,
  } = props
  const { clearErrors } = useFormContext()
  const {
    setDirty,
    setTouched,
    setFocused,
    validityData,
    setFilled,
    name: fieldName,
    disabled: fieldDisabled,
    validation,
    validationMode,
  } = useFieldRootContext()
  const generatedId = useLabelableId({ id })
  const disabled = fieldDisabled || disabledProp
  const name = fieldName ?? nameProp
  const [value, setValueUnwrapped] = useControlled({
    controlled: valueProp,
    default: multiple ? (defaultValue ?? EMPTY_ARRAY) : defaultValue,
    name: "Select",
    state: "value",
  })
  const [open, setOpenUnwrapped] = useControlled({
    controlled: openProp,
    default: defaultOpen,
    name: "Select",
    state: "open",
  })
  const listRef = import_react.useRef([])
  const labelsRef = import_react.useRef([])
  const popupRef = import_react.useRef(null)
  const scrollHandlerRef = import_react.useRef(null)
  const scrollArrowsMountedCountRef = import_react.useRef(0)
  const valueRef = import_react.useRef(null)
  const valuesRef = import_react.useRef([])
  const typingRef = import_react.useRef(false)
  const firstItemTextRef = import_react.useRef(null)
  const selectedItemTextRef = import_react.useRef(null)
  const selectionRef = import_react.useRef({
    allowSelectedMouseUp: false,
    allowUnselectedMouseUp: false,
    dragY: 0,
  })
  const alignItemWithTriggerActiveRef = import_react.useRef(false)
  const { mounted, setMounted, transitionStatus } = useTransitionStatus(open)
  const { openMethod, triggerProps: interactionTypeProps } = useOpenInteractionType(open)
  const store = useRefWithInit(
    () =>
      new ReactStore({
        id: generatedId,
        labelId: void 0,
        modal,
        multiple,
        itemToStringLabel,
        itemToStringValue,
        isItemEqualToValue,
        value,
        open,
        mounted,
        transitionStatus,
        items,
        forceMount: false,
        openMethod: null,
        activeIndex: null,
        selectedIndex: null,
        popupProps: {},
        triggerProps: {},
        triggerElement: null,
        positionerElement: null,
        listElement: null,
        popupSide: null,
        scrollUpArrowVisible: false,
        scrollDownArrowVisible: false,
        hasScrollArrows: false,
      }),
  ).current
  const activeIndex = useStore(store, selectors.activeIndex)
  const selectedIndex = useStore(store, selectors.selectedIndex)
  const triggerElement = useStore(store, selectors.triggerElement)
  const positionerElement = useStore(store, selectors.positionerElement)
  const previousOpenMethod = usePreviousValue(openMethod)
  const renderedOpenMethod = openMethod ?? previousOpenMethod
  const serializedValue = import_react.useMemo(() => {
    if (multiple) return ""
    return stringifyAsValue(value, itemToStringValue)
  }, [multiple, value, itemToStringValue])
  const fieldStringValue = import_react.useMemo(() => {
    if (multiple && Array.isArray(value))
      return value.map((currentValue) => stringifyAsValue(currentValue, itemToStringValue))
    return stringifyAsValue(value, itemToStringValue)
  }, [multiple, value, itemToStringValue])
  const controlRef = useValueAsRef(triggerElement)
  const getStringifiedValueForForm = useStableCallback(() => fieldStringValue)
  useRegisterFieldControl(
    controlRef,
    generatedId,
    value,
    getStringifiedValueForForm,
    !disabled,
    nameProp,
  )
  const initialValueRef = import_react.useRef(value)
  const hasSelectedValue = multiple
    ? Array.isArray(value) && value.length > 0
    : value != null && serializedValue !== ""
  useIsoLayoutEffect(() => {
    setFilled(hasSelectedValue)
  }, [hasSelectedValue, setFilled])
  useIsoLayoutEffect(
    function syncSelectedIndex() {
      let target = value
      let empty = false
      if (multiple) {
        const currentValue = Array.isArray(value) ? value : []
        empty = currentValue.length === 0
        target = currentValue.at(-1)
      }
      const index = empty ? -1 : findItemIndex(valuesRef.current, target, isItemEqualToValue)
      const nextIndex = index === -1 ? null : index
      if (nextIndex === null) selectedItemTextRef.current = null
      if (open) return
      store.set("selectedIndex", nextIndex)
    },
    [multiple, open, value, isItemEqualToValue, store],
  )
  function isSelectedValueDirty(currentValue) {
    const initialValue = validityData.initialValue
    if (Array.isArray(currentValue) && Array.isArray(initialValue))
      return !areArraysEqual(currentValue, initialValue, (itemValue, initialItemValue) =>
        compareItemEquality(itemValue, initialItemValue, isItemEqualToValue),
      )
    return currentValue !== initialValue
  }
  useValueChanged(value, () => {
    clearErrors(name)
    setDirty(isSelectedValueDirty(value))
    validation.change(value)
  })
  const setOpen = useStableCallback((nextOpen, eventDetails) => {
    onOpenChange?.(nextOpen, eventDetails)
    if (eventDetails.isCanceled) return
    setOpenUnwrapped(nextOpen)
    if (
      !nextOpen &&
      (eventDetails.reason === "focus-out" || eventDetails.reason === "outside-press")
    ) {
      setTouched(true)
      setFocused(false)
      if (validationMode === "onBlur") validation.commit(value)
    }
  })
  const handleUnmount = useStableCallback(() => {
    setMounted(false)
    store.update({
      activeIndex: null,
      openMethod: null,
      scrollUpArrowVisible: false,
      scrollDownArrowVisible: false,
    })
    onOpenChangeComplete?.(false)
  })
  useOpenChangeComplete({
    enabled: !actionsRef,
    open,
    ref: popupRef,
    onComplete() {
      if (!open) handleUnmount()
    },
  })
  import_react.useImperativeHandle(actionsRef, () => ({ unmount: handleUnmount }), [handleUnmount])
  const setValue = useStableCallback((nextValue, eventDetails) => {
    onValueChange?.(nextValue, eventDetails)
    if (eventDetails.isCanceled) return
    setValueUnwrapped(nextValue)
  })
  const handleScrollArrowVisibility = useStableCallback((scroller) => {
    const maxScrollTop = getMaxScrollOffset(scroller.scrollHeight, scroller.clientHeight)
    const scrollTop = normalizeScrollOffset(scroller.scrollTop, maxScrollTop)
    const shouldShowUp = scrollTop > 0
    const shouldShowDown = scrollTop < maxScrollTop
    store.set("scrollUpArrowVisible", shouldShowUp)
    store.set("scrollDownArrowVisible", shouldShowDown)
  })
  const floatingContext = useFloatingRootContext({
    open,
    onOpenChange: setOpen,
    elements: {
      reference: triggerElement,
      floating: positionerElement,
    },
  })
  const click = useClick(floatingContext, {
    enabled: !readOnly && !disabled,
    event: "mousedown",
  })
  const dismiss = useDismiss(floatingContext)
  const listNavigation = useListNavigation(floatingContext, {
    enabled: !readOnly && !disabled,
    listRef,
    activeIndex,
    selectedIndex,
    disabledIndices: EMPTY_ARRAY,
    onNavigate(nextActiveIndex) {
      if (nextActiveIndex === null && !open) return
      store.set("activeIndex", nextActiveIndex)
    },
    focusItemOnHover: highlightItemOnHover,
  })
  const typeahead = useTypeahead(floatingContext, {
    enabled: !readOnly && !disabled && (open || !multiple),
    listRef: labelsRef,
    activeIndex,
    selectedIndex,
    disabledIndices: (index) => isElementDisabled(listRef.current[index]),
    onMatch(index) {
      if (open) store.set("activeIndex", index)
      else setValue(valuesRef.current[index], createChangeEventDetails(none))
    },
    onTyping(typing) {
      typingRef.current = typing
    },
  })
  const mergedTriggerProps = import_react.useMemo(
    () =>
      mergeProps(
        typeahead.reference,
        listNavigation.reference,
        dismiss.reference,
        click.reference,
        interactionTypeProps,
      ),
    [
      click.reference,
      typeahead.reference,
      listNavigation.reference,
      dismiss.reference,
      interactionTypeProps,
    ],
  )
  const popupProps = import_react.useMemo(
    () =>
      mergeProps(
        FOCUSABLE_POPUP_PROPS,
        typeahead.floating,
        listNavigation.floating,
        dismiss.floating,
      ),
    [typeahead.floating, listNavigation.floating, dismiss.floating],
  )
  const itemProps = listNavigation.item ?? EMPTY_OBJECT
  useOnFirstRender(() => {
    store.update({
      popupProps,
      triggerProps: mergedTriggerProps,
    })
  })
  store.useSyncedValues({
    id: generatedId,
    modal,
    multiple,
    value,
    open,
    mounted,
    transitionStatus,
    popupProps,
    triggerProps: mergedTriggerProps,
    items,
    itemToStringLabel,
    itemToStringValue,
    isItemEqualToValue,
    openMethod: renderedOpenMethod,
  })
  const contextValue = import_react.useMemo(
    () => ({
      store,
      floatingContext,
      required,
      disabled,
      readOnly,
      multiple,
      highlightItemOnHover,
      setValue,
      setOpen,
      listRef,
      popupRef,
      scrollHandlerRef,
      handleScrollArrowVisibility,
      scrollArrowsMountedCountRef,
      itemProps,
      valueRef,
      valuesRef,
      labelsRef,
      typingRef,
      selectionRef,
      firstItemTextRef,
      selectedItemTextRef,
      validation,
      onOpenChangeComplete,
      alignItemWithTriggerActiveRef,
      initialValueRef,
    }),
    [
      store,
      floatingContext,
      required,
      disabled,
      readOnly,
      multiple,
      highlightItemOnHover,
      setValue,
      setOpen,
      itemProps,
      validation,
      onOpenChangeComplete,
      handleScrollArrowVisibility,
    ],
  )
  const ref = useMergedRefs(inputRef, validation.inputRef)
  const hiddenInputName = multiple ? void 0 : name
  const hiddenInputs = import_react.useMemo(() => {
    if (!multiple || !Array.isArray(value) || !name) return null
    return value.map((v) => {
      const currentSerializedValue = stringifyAsValue(v, itemToStringValue)
      return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(
        "input",
        {
          type: "hidden",
          form,
          name,
          value: currentSerializedValue,
          disabled,
        },
        currentSerializedValue,
      )
    })
  }, [multiple, value, form, name, itemToStringValue, disabled])
  return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(SelectRootContext.Provider, {
    value: contextValue,
    children: [
      children,
      /*#__PURE__*/ (0, import_jsx_runtime.jsx)("input", {
        ...validation.getValidationProps(disabled, {
          onFocus() {
            store.state.triggerElement?.focus({ focusVisible: true })
          },
          onChange(event) {
            if (event.nativeEvent.defaultPrevented || disabled || readOnly) return
            const nextValue = event.currentTarget.value
            const details = createChangeEventDetails(none, event.nativeEvent)
            function handleChange() {
              if (multiple) return
              const nextValueLower = nextValue.toLowerCase()
              let matchingIndex = valuesRef.current.findIndex(
                (candidate) =>
                  stringifyAsValue(candidate, itemToStringValue).toLowerCase() === nextValueLower ||
                  stringifyAsLabel(candidate, itemToStringLabel).toLowerCase() === nextValueLower,
              )
              if (matchingIndex === -1)
                matchingIndex = valuesRef.current.findIndex((_, index) => {
                  const renderedLabel = labelsRef.current[index]
                  return renderedLabel != null && renderedLabel.toLowerCase() === nextValueLower
                })
              const matchingValue = valuesRef.current[matchingIndex]
              if (matchingValue != null) setValue(matchingValue, details)
            }
            store.set("forceMount", true)
            queueMicrotask(handleChange)
          },
        }),
        "id": generatedId && hiddenInputName == null ? `${generatedId}-hidden-input` : void 0,
        form,
        "name": hiddenInputName,
        autoComplete,
        "value": serializedValue,
        disabled,
        "required": required && !(multiple && hasSelectedValue),
        readOnly,
        ref,
        "style": name ? visuallyHiddenInput : visuallyHidden,
        "tabIndex": -1,
        "aria-hidden": true,
        "suppressHydrationWarning": true,
      }),
      hiddenInputs,
    ],
  })
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/utils/resolveAriaLabelledBy.mjs
function resolveAriaLabelledBy(fieldLabelId, localLabelId) {
  return fieldLabelId ?? localLabelId
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/utils/getPseudoElementBounds.mjs
const BOUNDARY_OFFSET = 5
/**
 * Determines if a mouse event occurred within the bounds of an element
 * (including its pseudo-elements), with a small tolerance for pointer drift.
 */
function isMouseWithinBounds(event, element) {
  const bounds = getPseudoElementBounds(element)
  return (
    event.clientX >= bounds.left - BOUNDARY_OFFSET &&
    event.clientX <= bounds.right + BOUNDARY_OFFSET &&
    event.clientY >= bounds.top - BOUNDARY_OFFSET &&
    event.clientY <= bounds.bottom + BOUNDARY_OFFSET
  )
}
function getPseudoElementBounds(element) {
  const elementRect = element.getBoundingClientRect()
  const win = getWindow(element)
  if (jsdom) return elementRect
  const beforeStyles = win.getComputedStyle(element, "::before")
  const afterStyles = win.getComputedStyle(element, "::after")
  if (!(beforeStyles.content !== "none" || afterStyles.content !== "none")) return elementRect
  const beforeWidth = parseFloat(beforeStyles.width) || 0
  const beforeHeight = parseFloat(beforeStyles.height) || 0
  const afterWidth = parseFloat(afterStyles.width) || 0
  const afterHeight = parseFloat(afterStyles.height) || 0
  const totalWidth = Math.max(elementRect.width, beforeWidth, afterWidth)
  const totalHeight = Math.max(elementRect.height, beforeHeight, afterHeight)
  const widthDiff = totalWidth - elementRect.width
  const heightDiff = totalHeight - elementRect.height
  return {
    left: elementRect.left - widthDiff / 2,
    right: elementRect.right + widthDiff / 2,
    top: elementRect.top - heightDiff / 2,
    bottom: elementRect.bottom + heightDiff / 2,
  }
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/select/trigger/SelectTrigger.mjs
const SELECTED_DELAY = 400
const stateAttributesMapping$4 = {
  ...pressableTriggerOpenStateMapping,
  ...fieldValidityMapping,
  popupSide: (side) => (side ? { "data-popup-side": side } : null),
  value: () => null,
}
/**
 * A button that opens the select popup.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
const SelectTrigger$1 = /*#__PURE__*/ import_react.forwardRef(
  function SelectTrigger(componentProps, forwardedRef) {
    const {
      render,
      className,
      id: idProp,
      disabled: disabledProp = false,
      nativeButton = true,
      style,
      ...elementProps
    } = componentProps
    const {
      setTouched,
      setFocused,
      validationMode,
      state: fieldState,
      disabled: fieldDisabled,
    } = useFieldRootContext()
    const { labelId: fieldLabelId } = useLabelableContext()
    const {
      store,
      setOpen,
      selectionRef,
      validation,
      readOnly,
      required,
      alignItemWithTriggerActiveRef,
      disabled: selectDisabled,
    } = useSelectRootContext()
    const disabled = fieldDisabled || selectDisabled || disabledProp
    const open = useStore(store, selectors.open)
    const mounted = useStore(store, selectors.mounted)
    const value = useStore(store, selectors.value)
    const triggerProps = useStore(store, selectors.triggerProps)
    const positionerElement = useStore(store, selectors.positionerElement)
    const listElement = useStore(store, selectors.listElement)
    const popupSideValue = useStore(store, selectors.popupSide)
    const rootId = useStore(store, selectors.id)
    const selectLabelId = useStore(store, selectors.labelId)
    const hasSelectedValue = useStore(store, selectors.hasSelectedValue)
    const popupSide = mounted && positionerElement ? popupSideValue : null
    const id = idProp ?? rootId
    const ariaLabelledBy = resolveAriaLabelledBy(fieldLabelId, selectLabelId)
    useLabelableId({ id })
    const positionerRef = useValueAsRef(positionerElement)
    const triggerRef = import_react.useRef(null)
    const { getButtonProps, buttonRef } = useButton({
      disabled,
      native: nativeButton,
    })
    const setTriggerElement = store.useStateSetter("triggerElement")
    const timeoutFocus = useTimeout()
    const timeoutMouseDown = useTimeout()
    const selectedDelayTimeout = useTimeout()
    import_react.useEffect(() => {
      if (open) {
        selectedDelayTimeout.start(SELECTED_DELAY, () => {
          selectionRef.current.allowUnselectedMouseUp = true
          selectionRef.current.allowSelectedMouseUp = true
        })
        return () => {
          selectedDelayTimeout.clear()
        }
      }
      selectionRef.current = {
        allowSelectedMouseUp: false,
        allowUnselectedMouseUp: false,
        dragY: 0,
      }
      timeoutMouseDown.clear()
    }, [open, selectionRef, timeoutMouseDown, selectedDelayTimeout])
    const mergedProps = mergeProps(
      triggerProps,
      {
        id,
        "role": "combobox",
        "aria-expanded": open,
        "aria-haspopup": "listbox",
        "aria-controls": open
          ? (listElement?.id ?? getFloatingFocusElement(positionerElement)?.id)
          : void 0,
        "aria-labelledby": ariaLabelledBy,
        "aria-readonly": readOnly || void 0,
        "aria-required": required || void 0,
        "tabIndex": disabled ? -1 : 0,
        "onFocus"(event) {
          setFocused(true)
          if (open && alignItemWithTriggerActiveRef.current)
            setOpen(false, createChangeEventDetails(none, event.nativeEvent))
          timeoutFocus.start(0, () => {
            store.set("forceMount", true)
          })
        },
        "onBlur"(event) {
          if (contains(positionerElement, event.relatedTarget)) return
          setTouched(true)
          setFocused(false)
          if (validationMode === "onBlur") validation.commit(value)
        },
        "onMouseDown"(event) {
          if (open) return
          const doc = ownerDocument(event.currentTarget)
          function handleMouseUp(mouseEvent) {
            if (!triggerRef.current) return
            const mouseUpTarget = mouseEvent.target
            if (
              contains(triggerRef.current, mouseUpTarget) ||
              contains(positionerRef.current, mouseUpTarget)
            )
              return
            if (isMouseWithinBounds(mouseEvent, triggerRef.current)) return
            setOpen(false, createChangeEventDetails(cancelOpen, mouseEvent))
          }
          timeoutMouseDown.start(0, () => {
            doc.addEventListener("mouseup", handleMouseUp, { once: true })
          })
        },
      },
      elementProps,
      getButtonProps,
    )
    const props = validation.getValidationProps(disabled, mergedProps)
    props.role = "combobox"
    const state = {
      ...fieldState,
      open,
      disabled,
      value,
      readOnly,
      popupSide,
      placeholder: !hasSelectedValue,
    }
    return useRenderElement("button", componentProps, {
      ref: [forwardedRef, triggerRef, buttonRef, setTriggerElement],
      state,
      stateAttributesMapping: stateAttributesMapping$4,
      props,
    })
  },
)
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/select/value/SelectValue.mjs
const stateAttributesMapping$3 = { value: () => null }
/**
 * A text label of the currently selected item.
 * Renders a `<span>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
const SelectValue$1 = /*#__PURE__*/ import_react.forwardRef(
  function SelectValue(componentProps, forwardedRef) {
    const {
      className,
      render,
      children: childrenProp,
      placeholder,
      style,
      ...elementProps
    } = componentProps
    const { store, valueRef } = useSelectRootContext()
    const value = useStore(store, selectors.value)
    const items = useStore(store, selectors.items)
    const itemToStringLabel = useStore(store, selectors.itemToStringLabel)
    const hasSelectedValue = useStore(store, selectors.hasSelectedValue)
    const shouldCheckNullItemLabel =
      !hasSelectedValue && placeholder != null && childrenProp == null
    const hasNullLabel = useStore(store, selectors.hasNullItemLabel, shouldCheckNullItemLabel)
    const state = {
      value,
      placeholder: !hasSelectedValue,
    }
    let children = null
    if (typeof childrenProp === "function") children = childrenProp(value)
    else if (childrenProp != null) children = childrenProp
    else if (shouldCheckNullItemLabel && !hasNullLabel) children = placeholder
    else if (Array.isArray(value)) children = resolveMultipleLabels(value, items, itemToStringLabel)
    else children = resolveSelectedLabel(value, items, itemToStringLabel)
    return useRenderElement("span", componentProps, {
      state,
      ref: [forwardedRef, valueRef],
      props: [{ children }, elementProps],
      stateAttributesMapping: stateAttributesMapping$3,
    })
  },
)
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/select/icon/SelectIcon.mjs
/**
 * An icon that indicates that the trigger button opens a select popup.
 * Renders a `<span>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
const SelectIcon = /*#__PURE__*/ import_react.forwardRef(
  function SelectIcon(componentProps, forwardedRef) {
    const { render, className, style, ...elementProps } = componentProps
    const { store } = useSelectRootContext()
    const state = { open: useStore(store, selectors.open) }
    return useRenderElement("span", componentProps, {
      state,
      ref: forwardedRef,
      props: [
        {
          "aria-hidden": true,
          "children": "▼",
        },
        elementProps,
      ],
      stateAttributesMapping: triggerOpenStateMapping$1,
    })
  },
)
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/select/portal/SelectPortal.mjs
/**
 * A portal element that moves the popup to a different part of the DOM.
 * By default, the portal element is appended to `<body>`.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
const SelectPortal = /*#__PURE__*/ import_react.forwardRef(
  function SelectPortal(portalProps, forwardedRef) {
    const { store } = useSelectRootContext()
    const mounted = useStore(store, selectors.mounted)
    const forceMount = useStore(store, selectors.forceMount)
    if (!(mounted || forceMount)) return null
    return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FloatingPortal, {
      ref: forwardedRef,
      ...portalProps,
    })
  },
)
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/internals/composite/list/CompositeListContext.mjs
const CompositeListContext = /*#__PURE__*/ import_react.createContext({
  register: () => {},
  unregister: () => {},
  subscribeMapChange: () => () => {},
  nextIndexRef: { current: 0 },
})
function useCompositeListContext() {
  return import_react.useContext(CompositeListContext)
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/internals/composite/list/CompositeList.mjs
/**
 * Provides context for a list of items in a composite component.
 */
function CompositeList(props) {
  const { children, elementsRef, labelsRef, onMapChange: onMapChangeProp } = props
  const onMapChange = useStableCallback(onMapChangeProp)
  const [, setMapTick] = import_react.useState(false)
  const listeners = useRefWithInit(createListeners).current
  const map = useRefWithInit(createMap).current
  const nextIndexRef = import_react.useRef(0)
  const isDirtyRef = import_react.useRef(true)
  const itemsRef = import_react.useRef([])
  const mutationObserverRef = import_react.useRef(null)
  const scheduleMapUpdate = useStableCallback(() => {
    if (isDirtyRef.current) return
    isDirtyRef.current = true
    setMapTick((tick) => !tick)
  })
  const register = useStableCallback((node, registration) => {
    map.set(node, registration)
    scheduleMapUpdate()
  })
  const unregister = useStableCallback((node) => {
    map.delete(node)
    scheduleMapUpdate()
  })
  const syncRefs = useStableCallback((items) => {
    const nextMap = /* @__PURE__ */ new Map()
    elementsRef.current.length = 0
    if (labelsRef) labelsRef.current.length = 0
    items.forEach((item) => {
      nextMap.set(item.element, {
        ...item.registration.metadata,
        index: item.index,
      })
      elementsRef.current[item.index] = item.element
      if (labelsRef)
        labelsRef.current[item.index] =
          item.registration.label !== void 0
            ? item.registration.label
            : (item.registration.textRef?.current?.textContent ?? item.element.textContent)
    })
    nextIndexRef.current = elementsRef.current.length
    return nextMap
  })
  function observe(sortedNodes) {
    mutationObserverRef.current?.disconnect()
    mutationObserverRef.current = null
    if (typeof MutationObserver !== "function" || sortedNodes.length < 2) return
    const mutationObserver = new MutationObserver((entries) => {
      if (!hasMovedNode(entries)) return
      let previousConnectedNode = null
      for (const node of sortedNodes) {
        if (!node.isConnected) continue
        if (previousConnectedNode && sortByDocumentPosition(previousConnectedNode, node) > 0) {
          mutationObserver.disconnect()
          scheduleMapUpdate()
          return
        }
        previousConnectedNode = node
      }
    })
    mutationObserverRef.current = mutationObserver
    const roots = /* @__PURE__ */ new Set()
    for (let i = 1; i < sortedNodes.length; i += 1) {
      const root = getCommonAncestor(sortedNodes[i - 1], sortedNodes[i])
      if (root) roots.add(root)
    }
    roots.forEach((root) => mutationObserver.observe(root, { childList: true }))
  }
  const flush = useStableCallback(() => {
    const [items, automaticNodes] = getCompositeListSnapshot(map)
    const nextMap = syncRefs(items)
    observe(automaticNodes)
    itemsRef.current = items
    isDirtyRef.current = false
    listeners.forEach((listener) => listener(nextMap))
    onMapChange(nextMap)
  })
  useIsoLayoutEffect(() => {
    if (!isDirtyRef.current) syncRefs(itemsRef.current)
    return () => {
      elementsRef.current = []
      if (labelsRef) labelsRef.current = []
    }
  }, [elementsRef, labelsRef, syncRefs])
  useIsoLayoutEffect(() => {
    if (isDirtyRef.current) flush()
  })
  useIsoLayoutEffect(() => {
    return () => {
      mutationObserverRef.current?.disconnect()
      isDirtyRef.current = true
    }
  }, [])
  const subscribeMapChange = useStableCallback((fn) => {
    listeners.add(fn)
    return () => {
      listeners.delete(fn)
    }
  })
  const contextValue = import_react.useMemo(
    () => ({
      register,
      unregister,
      subscribeMapChange,
      nextIndexRef,
    }),
    [register, unregister, subscribeMapChange, nextIndexRef],
  )
  return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(CompositeListContext.Provider, {
    value: contextValue,
    children,
  })
}
function createMap() {
  return /* @__PURE__ */ new Map()
}
function createListeners() {
  return /* @__PURE__ */ new Set()
}
function getCompositeListSnapshot(map) {
  const reservedIndices = /* @__PURE__ */ new Set()
  const items = []
  const automaticItems = []
  map.forEach((registration, node) => {
    if (!node.isConnected) return
    const index = registration.index
    const item = {
      index: index ?? -1,
      element: node,
      registration,
    }
    if (index === null) automaticItems.push(item)
    else if (index >= 0) {
      reservedIndices.add(index)
      items.push(item)
    }
  })
  let nextAutomaticIndex = 0
  automaticItems.sort((a, b) => sortByDocumentPosition(a.element, b.element))
  automaticItems.forEach((item) => {
    while (reservedIndices.has(nextAutomaticIndex)) nextAutomaticIndex += 1
    item.index = nextAutomaticIndex
    items.push(item)
    nextAutomaticIndex += 1
  })
  if (reservedIndices.size > 0) items.sort((a, b) => a.index - b.index)
  return [items, automaticItems.map((item) => item.element)]
}
function getCommonAncestor(firstNode, lastNode) {
  let ancestor = firstNode.parentElement
  while (ancestor && !ancestor.contains(lastNode)) ancestor = ancestor.parentElement
  return ancestor
}
function hasMovedNode(entries) {
  for (const entry of entries)
    for (let i = 0; i < entry.removedNodes.length; i += 1)
      if (entry.removedNodes[i].isConnected) return true
  return false
}
function sortByDocumentPosition(a, b) {
  return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/select/positioner/SelectPositionerContext.mjs
const SelectPositionerContext = /*#__PURE__*/ import_react.createContext(void 0)
function useSelectPositionerContext() {
  const context = import_react.useContext(SelectPositionerContext)
  if (!context) throw new Error(formatErrorMessage(59))
  return context
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/select/popup/utils.mjs
function clearStyles(element, originalStyles) {
  if (element) Object.assign(element.style, originalStyles)
}
const LIST_FUNCTIONAL_STYLES = {
  position: "relative",
  maxHeight: "100%",
  overflowX: "hidden",
  overflowY: "auto",
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/select/positioner/SelectPositioner.mjs
const FIXED = { position: "fixed" }
/**
 * Positions the select popup.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
const SelectPositioner = /*#__PURE__*/ import_react.forwardRef(
  function SelectPositioner(componentProps, forwardedRef) {
    const {
      anchor,
      className,
      render,
      positionMethod,
      side,
      align,
      sideOffset,
      alignOffset,
      collisionBoundary = "clipping-ancestors",
      collisionPadding,
      arrowPadding,
      sticky,
      disableAnchorTracking,
      alignItemWithTrigger = true,
      collisionAvoidance = DROPDOWN_COLLISION_AVOIDANCE,
      style,
      ...elementProps
    } = componentProps
    const {
      store,
      listRef,
      labelsRef,
      alignItemWithTriggerActiveRef,
      selectedItemTextRef,
      valuesRef,
      initialValueRef,
      popupRef,
      setValue,
      floatingContext: floatingRootContext,
    } = useSelectRootContext()
    const open = useStore(store, selectors.open)
    const mounted = useStore(store, selectors.mounted)
    const modal = useStore(store, selectors.modal)
    const value = useStore(store, selectors.value)
    const openMethod = useStore(store, selectors.openMethod)
    const positionerElement = useStore(store, selectors.positionerElement)
    const triggerElement = useStore(store, selectors.triggerElement)
    const isItemEqualToValue = useStore(store, selectors.isItemEqualToValue)
    const transitionStatus = useStore(store, selectors.transitionStatus)
    const scrollUpArrowRef = import_react.useRef(null)
    const scrollDownArrowRef = import_react.useRef(null)
    const [controlledAlignItemWithTrigger, setControlledAlignItemWithTrigger] =
      import_react.useState(alignItemWithTrigger)
    const alignItemWithTriggerActive =
      mounted && controlledAlignItemWithTrigger && openMethod !== "touch"
    if (!mounted && controlledAlignItemWithTrigger !== alignItemWithTrigger)
      setControlledAlignItemWithTrigger(alignItemWithTrigger)
    import_react.useImperativeHandle(
      alignItemWithTriggerActiveRef,
      () => alignItemWithTriggerActive,
    )
    useAnchoredPopupScrollLock(
      (alignItemWithTriggerActive || modal) && open,
      openMethod === "touch",
      positionerElement,
      triggerElement,
    )
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
      disableAnchorTracking: disableAnchorTracking ?? alignItemWithTriggerActive,
      collisionAvoidance,
      keepMounted: true,
    })
    const renderedSide = alignItemWithTriggerActive ? "none" : positioning.side
    const positionerStyles = alignItemWithTriggerActive ? FIXED : positioning.positionerStyles
    const state = {
      open,
      side: renderedSide,
      align: positioning.align,
      anchorHidden: positioning.anchorHidden,
    }
    useIsoLayoutEffect(() => {
      store.set("popupSide", positioning.side)
    }, [store, positioning.side])
    const setPositionerElement = store.useStateSetter("positionerElement")
    const element = usePositioner(componentProps, state, {
      styles: positionerStyles,
      transitionStatus,
      props: elementProps,
      refs: [forwardedRef, setPositionerElement],
      hidden: !mounted,
      inert: !open,
    })
    const prevMapSizeRef = import_react.useRef(0)
    const onMapChange = useStableCallback((map) => {
      if (valuesRef.current.length === 0) return
      const prevSize = prevMapSizeRef.current
      prevMapSizeRef.current = map.size
      if (map.size === prevSize) return
      const eventDetails = createChangeEventDetails(none)
      if (prevSize !== 0 && !store.state.multiple && value !== null) {
        if (findItemIndex(valuesRef.current, value, isItemEqualToValue) === -1) {
          const initialSelectedValue = initialValueRef.current
          const nextValue =
            initialSelectedValue != null &&
            findItemIndex(valuesRef.current, initialSelectedValue, isItemEqualToValue) !== -1
              ? initialSelectedValue
              : null
          setValue(nextValue, eventDetails)
          if (nextValue === null) {
            store.set("selectedIndex", null)
            selectedItemTextRef.current = null
          }
        }
      }
      if (prevSize !== 0 && store.state.multiple && Array.isArray(value)) {
        const nextValue = value.filter(
          (selectedItemValue) =>
            findItemIndex(valuesRef.current, selectedItemValue, isItemEqualToValue) !== -1,
        )
        if (nextValue.length !== value.length) {
          setValue(nextValue, eventDetails)
          if (nextValue.length === 0) {
            store.set("selectedIndex", null)
            selectedItemTextRef.current = null
          }
        }
      }
      if (open && alignItemWithTriggerActive) {
        store.update({
          scrollUpArrowVisible: false,
          scrollDownArrowVisible: false,
        })
        const stylesToClear = { height: "" }
        clearStyles(positionerElement, stylesToClear)
        clearStyles(popupRef.current, stylesToClear)
      }
    })
    const contextValue = import_react.useMemo(
      () => ({
        ...positioning,
        side: renderedSide,
        alignItemWithTriggerActive,
        setControlledAlignItemWithTrigger,
        scrollUpArrowRef,
        scrollDownArrowRef,
      }),
      [positioning, renderedSide, alignItemWithTriggerActive, setControlledAlignItemWithTrigger],
    )
    return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(CompositeList, {
      elementsRef: listRef,
      labelsRef,
      onMapChange,
      children: /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(SelectPositionerContext.Provider, {
        value: contextValue,
        children: [
          mounted &&
            modal &&
            /*#__PURE__*/ (0, import_jsx_runtime.jsx)(InternalBackdrop, {
              inert: inertValue(!open),
              cutout: triggerElement,
            }),
          element,
        ],
      }),
    })
  },
)
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/utils/styles.mjs
const DISABLE_SCROLLBAR_CLASS_NAME = "base-ui-disable-scrollbar"
const styleDisableScrollbar = {
  className: DISABLE_SCROLLBAR_CLASS_NAME,
  getElement(nonce) {
    return /*#__PURE__*/ (0, import_jsx_runtime.jsx)("style", {
      nonce,
      href: DISABLE_SCROLLBAR_CLASS_NAME,
      precedence: "base-ui:low",
      children: `.${DISABLE_SCROLLBAR_CLASS_NAME}{scrollbar-width:none}.${DISABLE_SCROLLBAR_CLASS_NAME}::-webkit-scrollbar{display:none}`,
    })
  },
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/internals/csp-context/CSPContext.mjs
const CSPContext = /*#__PURE__*/ import_react.createContext(void 0)
const DEFAULT_CSP_CONTEXT_VALUE = { disableStyleElements: false }
function useCSPContext() {
  return import_react.useContext(CSPContext) ?? DEFAULT_CSP_CONTEXT_VALUE
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/select/popup/SelectPopup.mjs
const stateAttributesMapping$2 = {
  ...popupStateMapping,
  ...transitionStatusMapping,
}
/**
 * A container for the select list.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
const SelectPopup = /*#__PURE__*/ import_react.forwardRef(
  function SelectPopup(componentProps, forwardedRef) {
    const { render, className, style, finalFocus, ...elementProps } = componentProps
    const {
      store,
      popupRef,
      onOpenChangeComplete,
      setOpen,
      valueRef,
      firstItemTextRef,
      selectedItemTextRef,
      multiple,
      handleScrollArrowVisibility,
      scrollHandlerRef,
      listRef,
      highlightItemOnHover,
      floatingContext: floatingRootContext,
    } = useSelectRootContext()
    const {
      side,
      align,
      alignItemWithTriggerActive,
      isPositioned,
      setControlledAlignItemWithTrigger,
    } = useSelectPositionerContext()
    const insideToolbar = useToolbarRootContext(true) != null
    const direction = useDirection()
    const { nonce, disableStyleElements } = useCSPContext()
    const id = useStore(store, selectors.id)
    const open = useStore(store, selectors.open)
    const openMethod = useStore(store, selectors.openMethod)
    const mounted = useStore(store, selectors.mounted)
    const popupProps = useStore(store, selectors.popupProps)
    const transitionStatus = useStore(store, selectors.transitionStatus)
    const triggerElement = useStore(store, selectors.triggerElement)
    const positionerElement = useStore(store, selectors.positionerElement)
    const listElement = useStore(store, selectors.listElement)
    const reachedMaxHeightRef = import_react.useRef(false)
    const initialPlacedRef = import_react.useRef(false)
    const originalPositionerStylesRef = import_react.useRef({})
    const scrollArrowFrame = useAnimationFrame()
    const handleScroll = useStableCallback((scroller) => {
      if (!positionerElement || !popupRef.current || !initialPlacedRef.current) return
      const isTopPositioned = positionerElement.style.top === "0px"
      const isBottomPositioned = positionerElement.style.bottom === "0px"
      if (
        reachedMaxHeightRef.current ||
        !alignItemWithTriggerActive ||
        (!isTopPositioned && !isBottomPositioned)
      ) {
        handleScrollArrowVisibility(scroller)
        return
      }
      const scale = getScale(positionerElement)
      const currentHeight = normalizeSize(
        positionerElement.getBoundingClientRect().height,
        "y",
        scale,
      )
      const doc = ownerDocument(positionerElement)
      const win = getWindow(positionerElement)
      const positionerStyles = win.getComputedStyle(positionerElement)
      const marginTop = parseFloat(positionerStyles.marginTop)
      const marginBottom = parseFloat(positionerStyles.marginBottom)
      const maxPopupHeight = getMaxPopupHeight(win.getComputedStyle(popupRef.current))
      const maxAvailableHeight = Math.min(
        doc.documentElement.clientHeight - marginTop - marginBottom,
        maxPopupHeight,
      )
      const scrollTop = scroller.scrollTop
      const maxScrollTop = getMaxScrollTop(scroller)
      let nextScrollTop = null
      const setHeight = (height) => {
        positionerElement.style.height = `${height}px`
      }
      const diff = isTopPositioned ? maxScrollTop - scrollTop : scrollTop
      const nextHeight = Math.min(currentHeight + diff, maxAvailableHeight)
      if (diff <= 1) {
        const heightDelta = clamp(diff, 0, maxAvailableHeight - currentHeight)
        if (heightDelta > 0) setHeight(currentHeight + heightDelta)
        scroller.scrollTop = isTopPositioned ? maxScrollTop : 0
        if (maxAvailableHeight - (currentHeight + heightDelta) <= 1)
          reachedMaxHeightRef.current = true
        handleScrollArrowVisibility(scroller)
        return
      }
      if (maxAvailableHeight - nextHeight > 1) nextScrollTop = isTopPositioned ? Infinity : 0
      else if (isBottomPositioned && scrollTop < maxScrollTop)
        nextScrollTop = scrollTop - (diff - (currentHeight + diff - maxAvailableHeight))
      const nextPositionerHeight = Math.ceil(nextHeight)
      if (nextPositionerHeight !== 0) setHeight(nextPositionerHeight)
      if (nextScrollTop != null) {
        const target = clamp(nextScrollTop, 0, getMaxScrollTop(scroller))
        if (Math.abs(scroller.scrollTop - target) > 1) scroller.scrollTop = target
      }
      if (nextPositionerHeight >= maxAvailableHeight - 1) reachedMaxHeightRef.current = true
      handleScrollArrowVisibility(scroller)
    })
    import_react.useImperativeHandle(scrollHandlerRef, () => handleScroll, [handleScroll])
    useOpenChangeComplete({
      open,
      ref: popupRef,
      onComplete() {
        if (open) onOpenChangeComplete?.(true)
      },
    })
    const state = {
      open,
      transitionStatus,
      side,
      align,
    }
    useIsoLayoutEffect(() => {
      if (
        !positionerElement ||
        !popupRef.current ||
        Object.keys(originalPositionerStylesRef.current).length
      )
        return
      originalPositionerStylesRef.current = {
        top: positionerElement.style.top || "0",
        left: positionerElement.style.left || "0",
        right: positionerElement.style.right,
        height: positionerElement.style.height,
        bottom: positionerElement.style.bottom,
        minHeight: positionerElement.style.minHeight,
        maxHeight: positionerElement.style.maxHeight,
        marginTop: positionerElement.style.marginTop,
        marginBottom: positionerElement.style.marginBottom,
      }
    }, [popupRef, positionerElement])
    useIsoLayoutEffect(() => {
      if (open || alignItemWithTriggerActive) return
      initialPlacedRef.current = false
      reachedMaxHeightRef.current = false
      clearStyles(positionerElement, originalPositionerStylesRef.current)
    }, [open, alignItemWithTriggerActive, positionerElement, popupRef])
    useIsoLayoutEffect(() => {
      const popupElement = popupRef.current
      if (
        !open ||
        !triggerElement ||
        !positionerElement ||
        !popupElement ||
        (alignItemWithTriggerActive && !isPositioned) ||
        store.state.transitionStatus === "ending"
      )
        return
      initialPlacedRef.current = true
      popupElement.style.removeProperty("--transform-origin")
      if (!alignItemWithTriggerActive) {
        scrollArrowFrame.request(() => handleScrollArrowVisibility(listElement || popupElement))
        return
      }
      const restoreTransformStyles = unsetTransformStyles(popupElement)
      try {
        let textElement = selectedItemTextRef.current
        if (!textElement?.isConnected)
          textElement =
            !selectors.hasSelectedValue(store.state) && firstItemTextRef.current?.isConnected
              ? firstItemTextRef.current
              : null
        const valueElement = valueRef.current
        const win = getWindow(positionerElement)
        const positionerStyles = win.getComputedStyle(positionerElement)
        const popupStyles = win.getComputedStyle(popupElement)
        const doc = ownerDocument(triggerElement)
        const scale = getScale(triggerElement)
        const triggerRect = normalizeRect(triggerElement.getBoundingClientRect(), scale)
        const positionerRect = normalizeRect(positionerElement.getBoundingClientRect(), scale)
        const triggerHeight = triggerRect.height
        const scroller = listElement || popupElement
        const scrollHeight = scroller.scrollHeight
        const borderBottom = parseFloat(popupStyles.borderBottomWidth)
        const marginTop = parseFloat(positionerStyles.marginTop) || 10
        const marginBottom = parseFloat(positionerStyles.marginBottom) || 10
        const minHeight = parseFloat(positionerStyles.minHeight) || 100
        const maxPopupHeight = getMaxPopupHeight(popupStyles)
        const paddingLeft = 5
        const paddingRight = 5
        const triggerCollisionThreshold = 20
        const viewportHeight = doc.documentElement.clientHeight - marginTop - marginBottom
        const viewportWidth = doc.documentElement.clientWidth
        const availableSpaceBeneathTrigger = viewportHeight - triggerRect.bottom + triggerHeight
        let textRect
        let alignedLeft =
          direction === "rtl" ? triggerRect.right - positionerRect.width : triggerRect.left
        let offsetY = 0
        if (textElement && valueElement) {
          const valueRect = normalizeRect(valueElement.getBoundingClientRect(), scale)
          textRect = normalizeRect(textElement.getBoundingClientRect(), scale)
          alignedLeft =
            positionerRect.left +
            (direction === "rtl"
              ? valueRect.right - textRect.right
              : valueRect.left - textRect.left)
          const valueCenterFromTriggerTop = valueRect.top - triggerRect.top + valueRect.height / 2
          offsetY =
            textRect.top - positionerRect.top + textRect.height / 2 - valueCenterFromTriggerTop
        }
        const idealHeight = availableSpaceBeneathTrigger + offsetY + marginBottom + borderBottom
        let height = Math.min(viewportHeight, idealHeight)
        const maxHeight = viewportHeight - marginTop - marginBottom
        const scrollTop = idealHeight - height
        const maxRight = viewportWidth - paddingRight
        positionerElement.style.left = `${clamp(alignedLeft, paddingLeft, maxRight - positionerRect.width)}px`
        positionerElement.style.height = `${height}px`
        positionerElement.style.maxHeight = "none"
        positionerElement.style.marginTop = `${marginTop}px`
        positionerElement.style.marginBottom = `${marginBottom}px`
        popupElement.style.height = "100%"
        const maxScrollTop = getMaxScrollTop(scroller)
        const isTopPositioned = scrollTop >= maxScrollTop - 1
        if (isTopPositioned)
          height = Math.min(viewportHeight, positionerRect.height) - (scrollTop - maxScrollTop)
        const fallbackToAlignPopupToTrigger =
          triggerRect.top < triggerCollisionThreshold ||
          triggerRect.bottom > viewportHeight - triggerCollisionThreshold ||
          Math.ceil(height) + 1 < Math.min(scrollHeight, minHeight)
        const isPinchZoomed = (win.visualViewport?.scale ?? 1) !== 1 && webkit
        if (fallbackToAlignPopupToTrigger || isPinchZoomed) {
          clearStyles(positionerElement, originalPositionerStylesRef.current)
          setControlledAlignItemWithTrigger(false)
          return
        }
        const initialHeight = Math.max(minHeight, height)
        if (isTopPositioned) {
          const topOffset = Math.max(0, viewportHeight - idealHeight)
          positionerElement.style.top = positionerRect.height >= maxHeight ? "0" : `${topOffset}px`
          positionerElement.style.height = `${height}px`
          scroller.scrollTop = getMaxScrollTop(scroller)
        } else {
          positionerElement.style.bottom = "0"
          scroller.scrollTop = scrollTop
        }
        if (textRect) {
          const popupTop = positionerRect.top
          const popupHeight = positionerRect.height
          const textCenterY = textRect.top + textRect.height / 2
          const clampedY = clamp(
            popupHeight > 0 ? ((textCenterY - popupTop) / popupHeight) * 100 : 50,
            0,
            100,
          )
          popupElement.style.setProperty("--transform-origin", `50% ${clampedY}%`)
        }
        if (initialHeight === viewportHeight || height >= maxPopupHeight)
          reachedMaxHeightRef.current = true
        handleScrollArrowVisibility(scroller)
        if (
          highlightItemOnHover &&
          store.state.selectedIndex === null &&
          store.state.activeIndex === null &&
          listRef.current[0] != null
        )
          store.set("activeIndex", 0)
      } finally {
        restoreTransformStyles()
      }
    }, [
      store,
      open,
      positionerElement,
      triggerElement,
      valueRef,
      firstItemTextRef,
      selectedItemTextRef,
      popupRef,
      handleScrollArrowVisibility,
      alignItemWithTriggerActive,
      setControlledAlignItemWithTrigger,
      scrollArrowFrame,
      listElement,
      listRef,
      highlightItemOnHover,
      direction,
      isPositioned,
    ])
    import_react.useEffect(() => {
      if (!alignItemWithTriggerActive || !positionerElement || !open) return
      const win = getWindow(positionerElement)
      function handleResize(event) {
        setOpen(false, createChangeEventDetails(windowResize, event))
      }
      return addEventListener(win, "resize", handleResize)
    }, [setOpen, alignItemWithTriggerActive, positionerElement, open])
    const defaultProps = {
      ...(listElement
        ? {
            "role": "presentation",
            "aria-orientation": void 0,
          }
        : {
            "role": "listbox",
            "aria-multiselectable": multiple || void 0,
            "id": `${id}-list`,
          }),
      onKeyDown(event) {
        if (insideToolbar && COMPOSITE_KEYS.has(event.key)) event.stopPropagation()
      },
      onScroll(event) {
        if (listElement) return
        handleScroll(event.currentTarget)
      },
      ...(alignItemWithTriggerActive && {
        style: listElement ? { height: "100%" } : LIST_FUNCTIONAL_STYLES,
      }),
      className:
        !listElement && alignItemWithTriggerActive ? styleDisableScrollbar.className : void 0,
    }
    const element = useRenderElement("div", componentProps, {
      ref: [forwardedRef, popupRef],
      state,
      stateAttributesMapping: stateAttributesMapping$2,
      props: [
        popupProps,
        defaultProps,
        getDisabledMountTransitionStyles(transitionStatus),
        elementProps,
      ],
    })
    return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_react.Fragment, {
      children: [
        !disableStyleElements && styleDisableScrollbar.getElement(nonce),
        /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FloatingFocusManager, {
          context: floatingRootContext,
          modal: false,
          disabled: !mounted,
          openInteractionType: openMethod,
          returnFocus: finalFocus,
          restoreFocus: true,
          children: element,
        }),
      ],
    })
  },
)
function getMaxPopupHeight(popupStyles) {
  const maxHeightStyle = popupStyles.maxHeight
  return maxHeightStyle.endsWith("px") ? parseFloat(maxHeightStyle) || Infinity : Infinity
}
function getMaxScrollTop(scroller) {
  return getMaxScrollOffset(scroller.scrollHeight, scroller.clientHeight)
}
function getScale(element) {
  return platform.getScale(element)
}
function normalizeSize(size, axis, scale) {
  return size / scale[axis]
}
function normalizeRect(rect, scale) {
  return rectToClientRect({
    x: normalizeSize(rect.x, "x", scale),
    y: normalizeSize(rect.y, "y", scale),
    width: normalizeSize(rect.width, "x", scale),
    height: normalizeSize(rect.height, "y", scale),
  })
}
const TRANSFORM_STYLE_RESETS = [
  ["transform", "none"],
  ["scale", "1"],
  ["translate", "0 0"],
]
function unsetTransformStyles(popupElement) {
  const { style } = popupElement
  const originalStyles = {}
  for (const [property, value] of TRANSFORM_STYLE_RESETS) {
    originalStyles[property] = style.getPropertyValue(property)
    style.setProperty(property, value, "important")
  }
  return () => {
    for (const [property] of TRANSFORM_STYLE_RESETS) {
      const originalValue = originalStyles[property]
      if (originalValue) style.setProperty(property, originalValue)
      else style.removeProperty(property)
    }
  }
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/select/list/SelectList.mjs
/**
 * A container for the select items.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
const SelectList = /*#__PURE__*/ import_react.forwardRef(
  function SelectList(componentProps, forwardedRef) {
    const { render, className, style, ...elementProps } = componentProps
    const { store, scrollHandlerRef, multiple } = useSelectRootContext()
    const { alignItemWithTriggerActive } = useSelectPositionerContext()
    const hasScrollArrows = useStore(store, selectors.hasScrollArrows)
    const openMethod = useStore(store, selectors.openMethod)
    const defaultProps = {
      "id": `${useStore(store, selectors.id)}-list`,
      "role": "listbox",
      "aria-multiselectable": multiple || void 0,
      "onScroll"(event) {
        scrollHandlerRef.current?.(event.currentTarget)
      },
      ...(alignItemWithTriggerActive && { style: LIST_FUNCTIONAL_STYLES }),
      "className":
        hasScrollArrows && openMethod !== "touch" ? styleDisableScrollbar.className : void 0,
    }
    const setListElement = store.useStateSetter("listElement")
    return useRenderElement("div", componentProps, {
      ref: [forwardedRef, setListElement],
      props: [defaultProps, elementProps],
    })
  },
)
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/internals/composite/list/useCompositeListItem.mjs
/**
 * Used to register a list item and its index (DOM position) in the `CompositeList`.
 */
function useCompositeListItem(params = {}) {
  const { guess, label, metadata, textRef, index: externalIndex } = params
  const { register, unregister, subscribeMapChange, nextIndexRef } = useCompositeListContext()
  const indexRef = import_react.useRef(-1)
  const [internalIndex, setInternalIndex] = import_react.useState(
    externalIndex == null && guess
      ? () => {
          if (indexRef.current === -1) {
            const newIndex = nextIndexRef.current
            nextIndexRef.current += 1
            indexRef.current = newIndex
          }
          return indexRef.current
        }
      : -1,
  )
  const index = externalIndex ?? internalIndex
  const componentRef = import_react.useRef(null)
  const ref = import_react.useCallback(
    (node) => {
      const previousNode = componentRef.current
      if (previousNode) unregister(previousNode)
      componentRef.current = node
      if (node)
        register(node, {
          metadata: metadata ?? null,
          index: externalIndex ?? null,
          label,
          textRef,
        })
    },
    [externalIndex, register, unregister, metadata, label, textRef],
  )
  useIsoLayoutEffect(() => {
    if (externalIndex != null) return
    return subscribeMapChange((map) => {
      const i = componentRef.current ? map.get(componentRef.current)?.index : null
      if (i != null) setInternalIndex(i)
    })
  }, [externalIndex, subscribeMapChange])
  return {
    ref,
    index,
  }
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/select/item/SelectItemContext.mjs
const SelectItemContext = /*#__PURE__*/ import_react.createContext(void 0)
function useSelectItemContext() {
  const context = import_react.useContext(SelectItemContext)
  if (!context) throw new Error(formatErrorMessage(57))
  return context
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/select/item/SelectItem.mjs
/**
 * An individual option in the select popup.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
const SelectItem$1 = /*#__PURE__*/ import_react.memo(
  /*#__PURE__*/ import_react.forwardRef(function SelectItem(componentProps, forwardedRef) {
    const {
      render,
      className,
      style,
      value: itemValue = null,
      label,
      disabled: disabledProp = false,
      nativeButton = false,
      ...elementProps
    } = componentProps
    const textRef = import_react.useRef(null)
    const listItem = useCompositeListItem({
      guess: true,
      label,
      textRef,
    })
    const {
      store,
      itemProps,
      setOpen,
      setValue,
      selectionRef,
      typingRef,
      valuesRef,
      multiple,
      selectedItemTextRef,
      disabled: selectDisabled,
      readOnly,
    } = useSelectRootContext()
    const disabled = selectDisabled || disabledProp
    const highlighted = useStore(store, selectors.isActive, listItem.index)
    const open = useStore(store, selectors.open)
    const selected = useStore(store, selectors.isSelected, itemValue)
    const selectedByFocus = useStore(store, selectors.isSelectedByFocus, listItem.index)
    const isItemEqualToValue = useStore(store, selectors.isItemEqualToValue)
    const index = listItem.index
    const itemRef = import_react.useRef(null)
    useIsoLayoutEffect(() => {
      const values = valuesRef.current
      values[index] = itemValue
      return () => {
        delete values[index]
      }
    }, [index, itemValue, valuesRef])
    useIsoLayoutEffect(() => {
      const selectedValue = store.state.value
      let selectedCandidate = selectedValue
      if (multiple && Array.isArray(selectedValue))
        selectedCandidate =
          selectedValue.length > 0 ? selectedValue[selectedValue.length - 1] : void 0
      if (
        selectedCandidate !== void 0 &&
        compareItemEquality(itemValue, selectedCandidate, isItemEqualToValue)
      ) {
        store.set("selectedIndex", index)
        if (textRef.current) selectedItemTextRef.current = textRef.current
      }
    }, [index, multiple, isItemEqualToValue, store, itemValue, selectedItemTextRef])
    const pointerTypeRef = import_react.useRef("mouse")
    const allowMouseSelectionRef = import_react.useRef(false)
    const { getButtonProps, buttonRef } = useButton({
      disabled,
      focusableWhenDisabled: true,
      native: nativeButton,
      composite: true,
    })
    const state = {
      disabled,
      selected,
      highlighted,
    }
    function commitSelection(event) {
      if (selectDisabled || readOnly) return
      const selectedValue = store.state.value
      if (multiple) {
        const currentValue = Array.isArray(selectedValue) ? selectedValue : []
        const nextValue = selected
          ? removeItem(currentValue, itemValue, isItemEqualToValue)
          : [...currentValue, itemValue]
        setValue(nextValue, createChangeEventDetails(itemPress, event))
      } else {
        setValue(itemValue, createChangeEventDetails(itemPress, event))
        setOpen(false, createChangeEventDetails(itemPress, event))
      }
    }
    function resetDragMovement() {
      selectionRef.current.dragY = 0
    }
    const defaultProps = {
      "role": "option",
      "aria-selected": selected,
      "tabIndex": open && highlighted ? 0 : -1,
      "onKeyDown"(event) {
        store.set("activeIndex", index)
        if (event.key === " " && typingRef.current) event.preventDefault()
      },
      "onClick"(event) {
        const isMouseClick = pointerTypeRef.current !== "touch"
        const clickPointerType = event.nativeEvent.pointerType
        const isVirtualMouseClick =
          isMouseClick &&
          isVirtualClick(event.nativeEvent) &&
          (clickPointerType !== void 0 || highlighted)
        const isInvalidMouseClick =
          isMouseClick && !isVirtualMouseClick && !allowMouseSelectionRef.current
        allowMouseSelectionRef.current = false
        if (disabled || isInvalidMouseClick) return
        commitSelection(event.nativeEvent)
      },
      "onPointerEnter"(event) {
        pointerTypeRef.current = event.pointerType
      },
      "onPointerMove"(event) {
        if (event.pointerType === "mouse" && event.buttons === 1) {
          const selection = selectionRef.current
          selection.dragY += event.movementY
          if (selection.dragY ** 2 >= 64) selection.allowUnselectedMouseUp = true
        }
      },
      "onPointerDown"(event) {
        pointerTypeRef.current = event.pointerType
        allowMouseSelectionRef.current = true
        resetDragMovement()
      },
      "onMouseUp"() {
        resetDragMovement()
        if (disabled || pointerTypeRef.current === "touch") return
        if (allowMouseSelectionRef.current) return
        const disallowSelectedMouseUp = !selectionRef.current.allowSelectedMouseUp && selected
        const disallowUnselectedMouseUp = !selectionRef.current.allowUnselectedMouseUp && !selected
        if (disallowSelectedMouseUp || disallowUnselectedMouseUp) return
        allowMouseSelectionRef.current = true
        itemRef.current?.click()
        allowMouseSelectionRef.current = false
      },
    }
    const element = useRenderElement("div", componentProps, {
      ref: [buttonRef, forwardedRef, listItem.ref, itemRef],
      state,
      props: [itemProps, defaultProps, elementProps, getButtonProps],
    })
    const contextValue = import_react.useMemo(
      () => ({
        selected,
        index,
        textRef,
        selectedByFocus,
      }),
      [selected, index, textRef, selectedByFocus],
    )
    return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(SelectItemContext.Provider, {
      value: contextValue,
      children: element,
    })
  }),
)
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/select/item-indicator/SelectItemIndicator.mjs
/**
 * Indicates whether the select item is selected.
 * Renders a `<span>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
const SelectItemIndicator = /*#__PURE__*/ import_react.forwardRef(
  function SelectItemIndicator(componentProps, forwardedRef) {
    const { selected } = useSelectItemContext()
    if (!(componentProps.keepMounted || selected)) return null
    return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Inner, {
      ...componentProps,
      ref: forwardedRef,
    })
  },
)
const Inner = /*#__PURE__*/ import_react.memo(
  /*#__PURE__*/ import_react.forwardRef((componentProps, forwardedRef) => {
    const { render, className, style, keepMounted, ...elementProps } = componentProps
    const { selected } = useSelectItemContext()
    const indicatorRef = import_react.useRef(null)
    const { transitionStatus, setMounted } = useTransitionStatus(selected)
    const element = useRenderElement("span", componentProps, {
      ref: [forwardedRef, indicatorRef],
      state: {
        selected,
        transitionStatus,
      },
      props: [
        {
          "aria-hidden": true,
          "children": "✔️",
        },
        elementProps,
      ],
      stateAttributesMapping: transitionStatusMapping,
    })
    useOpenChangeComplete({
      open: selected,
      ref: indicatorRef,
      onComplete() {
        if (!selected) setMounted(false)
      },
    })
    return element
  }),
)
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/select/item-text/SelectItemText.mjs
/**
 * A text label of the select item.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
const SelectItemText = /*#__PURE__*/ import_react.memo(
  /*#__PURE__*/ import_react.forwardRef(function SelectItemText(componentProps, forwardedRef) {
    const { index, textRef, selectedByFocus } = useSelectItemContext()
    const { firstItemTextRef, selectedItemTextRef } = useSelectRootContext()
    const { render, className, style, ...elementProps } = componentProps
    const localRef = import_react.useCallback(
      (node) => {
        if (!node) return
        if (index === 0) firstItemTextRef.current = node
        if (selectedByFocus) selectedItemTextRef.current = node
      },
      [firstItemTextRef, selectedItemTextRef, index, selectedByFocus],
    )
    return useRenderElement("div", componentProps, {
      ref: [localRef, forwardedRef, textRef],
      props: elementProps,
    })
  }),
)
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/select/scroll-arrow/SelectScrollArrow.mjs
/**
 * @internal
 */
const SelectScrollArrow = /*#__PURE__*/ import_react.forwardRef(
  function SelectScrollArrow(componentProps, forwardedRef) {
    const { render, className, style, direction, keepMounted, ...elementProps } = componentProps
    const isUp = direction === "up"
    const { store, popupRef, listRef, handleScrollArrowVisibility, scrollArrowsMountedCountRef } =
      useSelectRootContext()
    const { side, scrollDownArrowRef, scrollUpArrowRef } = useSelectPositionerContext()
    const visibleSelector = isUp ? selectors.scrollUpArrowVisible : selectors.scrollDownArrowVisible
    const stateVisible = useStore(store, visibleSelector)
    const openMethod = useStore(store, selectors.openMethod)
    const visible = stateVisible && openMethod !== "touch"
    const timeout = useTimeout()
    const scrollArrowRef = isUp ? scrollUpArrowRef : scrollDownArrowRef
    const { mounted, transitionStatus, setMounted } = useTransitionStatus(visible)
    useIsoLayoutEffect(() => {
      scrollArrowsMountedCountRef.current += 1
      store.set("hasScrollArrows", true)
      return () => {
        scrollArrowsMountedCountRef.current = Math.max(0, scrollArrowsMountedCountRef.current - 1)
        if (scrollArrowsMountedCountRef.current === 0) store.set("hasScrollArrows", false)
      }
    }, [store, scrollArrowsMountedCountRef])
    useOpenChangeComplete({
      open: visible,
      ref: scrollArrowRef,
      onComplete() {
        if (!visible) setMounted(false)
      },
    })
    const element = useRenderElement("div", componentProps, {
      ref: [forwardedRef, scrollArrowRef],
      state: {
        direction,
        visible,
        side,
        transitionStatus,
      },
      props: [
        {
          "aria-hidden": true,
          "children": isUp ? "▲" : "▼",
          "style": { position: "absolute" },
          "onMouseMove"(event) {
            if ((event.movementX === 0 && event.movementY === 0) || timeout.isStarted()) return
            store.set("activeIndex", null)
            function scrollNextItem() {
              const scroller = store.state.listElement ?? popupRef.current
              if (!scroller) return
              store.set("activeIndex", null)
              handleScrollArrowVisibility(scroller)
              const maxScrollTop = getMaxScrollOffset(scroller.scrollHeight, scroller.clientHeight)
              const scrollTop = normalizeScrollOffset(scroller.scrollTop, maxScrollTop)
              const isScrolledToEdge = scrollTop === (isUp ? 0 : maxScrollTop)
              const items = listRef.current
              if (scrollTop !== scroller.scrollTop) scroller.scrollTop = scrollTop
              if (isScrolledToEdge) {
                timeout.clear()
                return
              }
              if (items.length > 0) {
                const scrollArrowHeight = scrollArrowRef.current?.offsetHeight || 0
                scroller.scrollTop = getTargetScrollTop(
                  items,
                  isUp,
                  scrollTop,
                  scroller.clientHeight,
                  scrollArrowHeight,
                  maxScrollTop,
                )
              }
              timeout.start(40, scrollNextItem)
            }
            timeout.start(40, scrollNextItem)
          },
          "onMouseLeave"() {
            timeout.clear()
          },
        },
        elementProps,
      ],
      stateAttributesMapping: transitionStatusMapping,
    })
    if (!(mounted || keepMounted)) return null
    return element
  },
)
function getTargetScrollTop(items, isUp, scrollTop, clientHeight, scrollArrowHeight, maxScrollTop) {
  if (isUp) {
    let firstVisibleIndex = 0
    const visibleTop = scrollTop + scrollArrowHeight - 1
    for (let i = 0; i < items.length; i += 1) {
      const item = items[i]
      if (item && item.offsetTop >= visibleTop) {
        firstVisibleIndex = i
        break
      }
    }
    const targetIndex = Math.max(0, firstVisibleIndex - 1)
    const targetItem = items[targetIndex]
    return targetIndex < firstVisibleIndex && targetItem
      ? normalizeScrollOffset(targetItem.offsetTop - scrollArrowHeight, maxScrollTop)
      : 0
  }
  let lastVisibleIndex = items.length - 1
  const visibleBottom = scrollTop + clientHeight - scrollArrowHeight + 1
  for (let i = 0; i < items.length; i += 1) {
    const item = items[i]
    if (item && item.offsetTop + item.offsetHeight > visibleBottom) {
      lastVisibleIndex = Math.max(0, i - 1)
      break
    }
  }
  const targetIndex = Math.min(items.length - 1, lastVisibleIndex + 1)
  const targetItem = items[targetIndex]
  return targetIndex > lastVisibleIndex && targetItem
    ? normalizeScrollOffset(
        targetItem.offsetTop + targetItem.offsetHeight - clientHeight + scrollArrowHeight,
        maxScrollTop,
      )
    : maxScrollTop
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/select/scroll-down-arrow/SelectScrollDownArrow.mjs
/**
 * An element that scrolls the select popup down when hovered. Does not render when using touch input.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
const SelectScrollDownArrow = /*#__PURE__*/ import_react.forwardRef(
  function SelectScrollDownArrow(props, forwardedRef) {
    return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(SelectScrollArrow, {
      ...props,
      ref: forwardedRef,
      direction: "down",
    })
  },
)
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/select/scroll-up-arrow/SelectScrollUpArrow.mjs
/**
 * An element that scrolls the select popup up when hovered. Does not render when using touch input.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
const SelectScrollUpArrow = /*#__PURE__*/ import_react.forwardRef(
  function SelectScrollUpArrow(props, forwardedRef) {
    return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(SelectScrollArrow, {
      ...props,
      ref: forwardedRef,
      direction: "up",
    })
  },
)
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/select/group/SelectGroupContext.mjs
const SelectGroupContext = /*#__PURE__*/ import_react.createContext(void 0)
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/select/group/SelectGroup.mjs
/**
 * Groups related select items with the corresponding label.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
const SelectGroup$1 = /*#__PURE__*/ import_react.forwardRef(
  function SelectGroup(componentProps, forwardedRef) {
    const { render, className, style, ...elementProps } = componentProps
    const [labelId, setLabelId] = import_react.useState()
    const contextValue = import_react.useMemo(
      () => ({
        labelId,
        setLabelId,
      }),
      [labelId, setLabelId],
    )
    const element = useRenderElement("div", componentProps, {
      ref: forwardedRef,
      props: [
        {
          "role": "group",
          "aria-labelledby": labelId,
        },
        elementProps,
      ],
    })
    return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(SelectGroupContext.Provider, {
      value: contextValue,
      children: element,
    })
  },
)
//#endregion
//#region src/components/ui/select.tsx
const Select = SelectRoot
function SelectGroup({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup$1, {
    "data-slot": "select-group",
    "className": cn("scroll-my-1", className),
    ...props,
  })
}
function SelectValue({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue$1, {
    "data-slot": "select-value",
    "className": cn("flex flex-1 text-left", className),
    ...props,
  })
}
function SelectTrigger({ className, size = "default", children, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
    "data-slot": "select-trigger",
    "data-size": size,
    "className": cn(
      "flex w-fit items-center justify-between gap-1.5 rounded-none border border-input bg-transparent py-2 pr-2 pl-2.5 text-xs whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground data-[size=default]:h-8 data-[size=sm]:h-7 data-[size=sm]:rounded-none *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      className,
    ),
    ...props,
    "children": [
      children,
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
        render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconSelector, {
          className: "pointer-events-none size-4 text-muted-foreground",
        }),
      }),
    ],
  })
}
function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, {
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPositioner, {
      side,
      sideOffset,
      align,
      alignOffset,
      alignItemWithTrigger,
      className: "isolate z-50",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectPopup, {
        "data-slot": "select-content",
        "className": cn(
          "relative isolate z-50 max-h-(--available-height) w-(--anchor-width) min-w-36 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-none bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0 not-data-[side=none]:data-open:zoom-in-95 not-data-[side=none]:data-closed:zoom-out-95",
          className,
        ),
        ...props,
        "children": [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton, {}),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectList, { children }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton, {}),
        ],
      }),
    }),
  })
}
function SelectItem({ className, children, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
    "data-slot": "select-item",
    "className": cn(
      "relative flex w-full cursor-default items-center gap-2 rounded-none py-2 pr-8 pl-2.75 text-xs outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
      className,
    ),
    ...props,
    "children": [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, {
        className: "flex flex-1 shrink-0 gap-2 whitespace-nowrap",
        children,
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, {
        render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
          className: "pointer-events-none absolute right-2 flex size-4 items-center justify-center",
        }),
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconCheck, {
          className: "pointer-events-none",
        }),
      }),
    ],
  })
}
function SelectScrollUpButton({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpArrow, {
    "data-slot": "select-scroll-up-button",
    "className": cn(
      "top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
      className,
    ),
    ...props,
    "children": /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconChevronUp, {}),
  })
}
function SelectScrollDownButton({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownArrow, {
    "data-slot": "select-scroll-down-button",
    "className": cn(
      "bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
      className,
    ),
    ...props,
    "children": /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconChevronDown, {}),
  })
}
//#endregion
//#region src/components/ui/textarea.tsx
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
    "data-slot": "textarea",
    "className": cn(
      "flex field-sizing-content min-h-16 w-full rounded-none border border-input bg-transparent px-2.5 py-2 text-xs transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 md:text-xs dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
      className,
    ),
    ...props,
  })
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/collapsible/root/useCollapsibleRoot.mjs
function useCollapsibleRoot(parameters) {
  const { open: openParam, defaultOpen, onOpenChange, disabled } = parameters
  const [open, setOpen] = useControlled({
    controlled: openParam,
    default: defaultOpen,
    name: "Collapsible",
    state: "open",
  })
  const { mounted, setMounted, transitionStatus } = useTransitionStatus(open, true, true)
  const defaultPanelId = useBaseUiId()
  const [registeredPanelId, setPanelIdState] = import_react.useState()
  const panelId = registeredPanelId === null ? void 0 : (registeredPanelId ?? defaultPanelId)
  const handleTrigger = useStableCallback((event) => {
    const nextOpen = !open
    const eventDetails = createChangeEventDetails(triggerPress, event.nativeEvent)
    onOpenChange(nextOpen, eventDetails)
    if (eventDetails.isCanceled) return
    setOpen(nextOpen)
  })
  return import_react.useMemo(
    () => ({
      defaultPanelId,
      disabled,
      handleTrigger,
      mounted,
      open,
      panelId,
      setMounted,
      setOpen,
      setPanelIdState,
      transitionStatus,
    }),
    [
      defaultPanelId,
      disabled,
      handleTrigger,
      mounted,
      open,
      panelId,
      setMounted,
      setOpen,
      setPanelIdState,
      transitionStatus,
    ],
  )
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/collapsible/root/CollapsibleRootContext.mjs
const CollapsibleRootContext = /*#__PURE__*/ import_react.createContext(void 0)
function useCollapsibleRootContext() {
  const context = import_react.useContext(CollapsibleRootContext)
  if (context === void 0) throw new Error(formatErrorMessage(15))
  return context
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/collapsible/panel/CollapsiblePanelDataAttributes.mjs
const CollapsiblePanelDataAttributes = (function (CollapsiblePanelDataAttributes) {
  /**
   * Present when the collapsible panel is open.
   */
  CollapsiblePanelDataAttributes["open"] = "data-open"
  /**
   * Present when the collapsible panel is closed.
   */
  CollapsiblePanelDataAttributes["closed"] = "data-closed"
  /**
   * Present when the panel begins animating in.
   */
  CollapsiblePanelDataAttributes[
    (CollapsiblePanelDataAttributes["startingStyle"] = TransitionStatusDataAttributes.startingStyle)
  ] = "startingStyle"
  /**
   * Present when the panel is animating out.
   */
  CollapsiblePanelDataAttributes[
    (CollapsiblePanelDataAttributes["endingStyle"] = TransitionStatusDataAttributes.endingStyle)
  ] = "endingStyle"
  return CollapsiblePanelDataAttributes
})({})
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/collapsible/trigger/CollapsibleTriggerDataAttributes.mjs
const CollapsibleTriggerDataAttributes = /*#__PURE__*/ (function (
  CollapsibleTriggerDataAttributes,
) {
  /**
   * Present when the collapsible panel is open.
   */
  CollapsibleTriggerDataAttributes["panelOpen"] = "data-panel-open"
  return CollapsibleTriggerDataAttributes
})({})
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/utils/collapsibleOpenStateMapping.mjs
const PANEL_OPEN_HOOK = { [CollapsiblePanelDataAttributes.open]: "" }
const PANEL_CLOSED_HOOK = { [CollapsiblePanelDataAttributes.closed]: "" }
const triggerOpenStateMapping = {
  open(value) {
    if (value) return { [CollapsibleTriggerDataAttributes.panelOpen]: "" }
    return null
  },
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/collapsible/root/stateAttributesMapping.mjs
const collapsibleStateAttributesMapping = {
  open(value) {
    if (value) return PANEL_OPEN_HOOK
    return PANEL_CLOSED_HOOK
  },
  ...transitionStatusMapping,
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/collapsible/root/CollapsibleRoot.mjs
/**
 * Groups all parts of the collapsible.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Collapsible](https://base-ui.com/react/components/collapsible)
 */
const CollapsibleRoot = /*#__PURE__*/ import_react.forwardRef(
  function CollapsibleRoot(componentProps, forwardedRef) {
    const {
      render,
      className,
      defaultOpen = false,
      disabled = false,
      onOpenChange: onOpenChangeProp,
      open,
      style,
      ...elementProps
    } = componentProps
    const onOpenChange = useStableCallback(onOpenChangeProp)
    const collapsible = useCollapsibleRoot({
      open,
      defaultOpen,
      onOpenChange,
      disabled,
    })
    const state = import_react.useMemo(
      () => ({
        open: collapsible.open,
        disabled: collapsible.disabled,
        transitionStatus: collapsible.transitionStatus,
      }),
      [collapsible.open, collapsible.disabled, collapsible.transitionStatus],
    )
    const contextValue = import_react.useMemo(
      () => ({
        ...collapsible,
        onOpenChange,
        state,
      }),
      [collapsible, onOpenChange, state],
    )
    const element = useRenderElement("div", componentProps, {
      state,
      ref: forwardedRef,
      props: elementProps,
      stateAttributesMapping: collapsibleStateAttributesMapping,
    })
    return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(CollapsibleRootContext.Provider, {
      value: contextValue,
      children: element,
    })
  },
)
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/collapsible/trigger/CollapsibleTrigger.mjs
const stateAttributesMapping$1 = {
  ...triggerOpenStateMapping,
  ...transitionStatusMapping,
}
/**
 * A button that opens and closes the collapsible panel.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Collapsible](https://base-ui.com/react/components/collapsible)
 */
const CollapsibleTrigger$1 = /*#__PURE__*/ import_react.forwardRef(
  function CollapsibleTrigger(componentProps, forwardedRef) {
    const {
      panelId,
      open,
      handleTrigger,
      state,
      disabled: contextDisabled,
    } = useCollapsibleRootContext()
    const {
      className,
      disabled = contextDisabled,
      render,
      nativeButton = true,
      style,
      ...elementProps
    } = componentProps
    const { getButtonProps, buttonRef } = useButton({
      disabled,
      focusableWhenDisabled: true,
      native: nativeButton,
    })
    return useRenderElement("button", componentProps, {
      state,
      ref: [forwardedRef, buttonRef],
      props: [
        {
          "aria-controls": open ? panelId : void 0,
          "aria-expanded": open,
          "onClick": handleTrigger,
        },
        elementProps,
        getButtonProps,
      ],
      stateAttributesMapping: stateAttributesMapping$1,
    })
  },
)
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/collapsible/panel/useCollapsiblePanel.mjs
const EMPTY_DIMENSIONS = {
  height: void 0,
  width: void 0,
}
function useCollapsiblePanel(parameters) {
  const {
    externalRef,
    hiddenUntilFound,
    id: idParam,
    keepMounted,
    mounted,
    onOpenChange,
    open,
    setMounted,
    setOpen,
    transitionStatus,
  } = parameters
  const panelRef = import_react.useRef(null)
  const animationTypeRef = import_react.useRef(null)
  const [dimensions, setDimensionsUnwrapped] = import_react.useState(EMPTY_DIMENSIONS)
  const lastMeasuredDimensionsRef = import_react.useRef(EMPTY_DIMENSIONS)
  const shouldSkipNextOpenRef = import_react.useRef(false)
  const shouldPreventMountAnimationRef = import_react.useRef(open)
  const shouldPreventActivityResumeAnimationRef = import_react.useRef(false)
  const [forcePanelIdle, setForcePanelIdle] = import_react.useState(false)
  const pendingTemporaryStyleRestoreRef = import_react.useRef(null)
  const mergedPanelRef = useMergedRefs(externalRef, panelRef)
  const latestOpenRef = useValueAsRef(open)
  const runOnceCloseAnimationsFinish = useAnimationsFinished(panelRef)
  const hidden = !open && !mounted
  const panelTransitionStatus = forcePanelIdle ? "idle" : transitionStatus
  const shouldPreventOpenAnimation =
    open &&
    (shouldPreventMountAnimationRef.current || shouldPreventActivityResumeAnimationRef.current)
  const renderedDimensions =
    !open &&
    mounted &&
    animationTypeRef.current === "css-animation" &&
    dimensions.height === void 0 &&
    dimensions.width === void 0
      ? lastMeasuredDimensionsRef.current
      : dimensions
  const shouldPersistHiddenTransitionStyles =
    hiddenUntilFound && hidden && animationTypeRef.current !== "css-animation"
  const setDimensions = useStableCallback((nextDimensions, shouldCacheMeasurement = true) => {
    if (shouldCacheMeasurement) lastMeasuredDimensionsRef.current = nextDimensions
    setDimensionsUnwrapped(nextDimensions)
  })
  const restorePendingTemporaryStyle = useStableCallback(() => {
    pendingTemporaryStyleRestoreRef.current?.()
    pendingTemporaryStyleRestoreRef.current = null
  })
  const setPendingTemporaryStyleRestore = useStableCallback((restore) => {
    restorePendingTemporaryStyle()
    pendingTemporaryStyleRestoreRef.current = () => {
      pendingTemporaryStyleRestoreRef.current = null
      restore()
    }
  })
  const markActivityResumeAnimationSuppressed = useStableCallback(() => {
    if (open && mounted && animationTypeRef.current === "css-animation")
      shouldPreventActivityResumeAnimationRef.current = true
  })
  useIsoLayoutEffect(() => {
    if (!forcePanelIdle || transitionStatus === "starting") return
    setForcePanelIdle(false)
  }, [forcePanelIdle, transitionStatus])
  import_react.useEffect(() => {
    return () => {
      markActivityResumeAnimationSuppressed()
      restorePendingTemporaryStyle()
    }
  }, [markActivityResumeAnimationSuppressed, restorePendingTemporaryStyle])
  useIsoLayoutEffect(() => {
    const panel = panelRef.current
    if (!panel) return
    if (!open && pendingTemporaryStyleRestoreRef.current) restorePendingTemporaryStyle()
    const animationType = getAnimationType(panel, shouldPreventOpenAnimation)
    animationTypeRef.current = animationType
    if (
      open &&
      transitionStatus === "idle" &&
      shouldPreventMountAnimationRef.current &&
      animationType === "css-animation"
    ) {
      lastMeasuredDimensionsRef.current = getDimensions(panel)
      return
    }
    if (open && transitionStatus === "starting") {
      const skipNextOpen = shouldSkipNextOpenRef.current
      shouldSkipNextOpenRef.current = false
      if (animationType === "none") {
        setDimensions(getDimensions(panel))
        setForcePanelIdle(true)
        return
      }
      if (animationType === "css-transition") {
        const restoreLayoutStyles = resetLayoutStyles(panel)
        setDimensions(getDimensions(panel))
        if (!skipNextOpen) return restoreLayoutStyles
        const restoreTransitionDuration = setTemporaryStyle(panel, "transition-duration", "0s")
        setPendingTemporaryStyleRestore(restoreTransitionDuration)
        setForcePanelIdle(true)
        return restoreLayoutStyles
      }
      setDimensions(getDimensions(panel))
      const restoreAnimationName = setTemporaryStyle(panel, "animation-name", "none")
      if (!skipNextOpen) {
        restoreAnimationName()
        return
      }
      const restoreAnimationDuration = setTemporaryStyle(panel, "animation-duration", "0s")
      restoreAnimationName()
      setPendingTemporaryStyleRestore(restoreAnimationDuration)
      setForcePanelIdle(true)
      return
    }
    if (!open && mounted && (transitionStatus === "idle" || transitionStatus === "starting")) {
      shouldPreventMountAnimationRef.current = false
      shouldPreventActivityResumeAnimationRef.current = false
      if (animationType === "none") {
        setDimensions(EMPTY_DIMENSIONS, false)
        setMounted(false)
        return
      }
      setDimensions(getDimensions(panel))
      return
    }
    if (transitionStatus !== "ending") return
    if (animationType === "none") {
      setMounted(false)
      return
    }
    const nextDimensions = getDimensions(panel)
    if (!(nextDimensions.height > 0 || nextDimensions.width > 0)) {
      setMounted(false)
      return
    }
    setDimensions(nextDimensions)
    if (animationType === "css-animation") setTemporaryStyle(panel, "animation-name", "none")()
  }, [
    mounted,
    open,
    restorePendingTemporaryStyle,
    setDimensions,
    setMounted,
    setPendingTemporaryStyleRestore,
    shouldPreventOpenAnimation,
    transitionStatus,
  ])
  useOpenChangeComplete({
    enabled: open && mounted && panelTransitionStatus === "idle",
    open: true,
    ref: panelRef,
    onComplete() {
      if (!open) return
      setDimensions(EMPTY_DIMENSIONS, false)
    },
  })
  import_react.useEffect(() => {
    if (open || !mounted || panelTransitionStatus !== "ending") return
    if (!panelRef.current) return
    const abortController = new AbortController()
    let endingStyleFrame = -1
    function handleComplete() {
      if (latestOpenRef.current) return
      setMounted(false)
      setDimensions(EMPTY_DIMENSIONS, false)
    }
    endingStyleFrame = AnimationFrame.request(() => {
      runOnceCloseAnimationsFinish(handleComplete, abortController.signal)
    })
    return () => {
      AnimationFrame.cancel(endingStyleFrame)
      abortController.abort()
    }
  }, [
    latestOpenRef,
    mounted,
    open,
    panelTransitionStatus,
    runOnceCloseAnimationsFinish,
    setDimensions,
    setMounted,
  ])
  useIsoLayoutEffect(() => {
    const panel = panelRef.current
    if (!panel || !hiddenUntilFound || !hidden) return
    panel.setAttribute("hidden", "until-found")
  }, [hidden, hiddenUntilFound])
  import_react.useEffect(
    function registerBeforeMatchListener() {
      const panel = panelRef.current
      if (!panel) return
      function handleBeforeMatch(event) {
        const eventDetails = createChangeEventDetails(none, event)
        onOpenChange(true, eventDetails)
        if (eventDetails.isCanceled) return
        shouldSkipNextOpenRef.current = true
        setOpen(true)
      }
      return addEventListener(panel, "beforematch", handleBeforeMatch)
    },
    [onOpenChange, setOpen],
  )
  const shouldRender = keepMounted || hiddenUntilFound || mounted || open
  return {
    height: renderedDimensions.height,
    props: {
      ...(shouldPersistHiddenTransitionStyles
        ? { [CollapsiblePanelDataAttributes.startingStyle]: "" }
        : void 0),
      hidden,
      id: idParam,
    },
    ref: mergedPanelRef,
    shouldPreventOpenAnimation,
    shouldRender,
    transitionStatus: panelTransitionStatus,
    width: renderedDimensions.width,
  }
}
function getDimensions(element) {
  return {
    height: element.scrollHeight,
    width: element.scrollWidth,
  }
}
function getAnimationType(element, hasSuppressedMountAnimation) {
  const panelStyles = getWindow(element).getComputedStyle(element)
  const hasAnimation =
    (panelStyles.animationName
      .split(",")
      .map((name) => name.trim())
      .some((name) => name !== "" && name !== "none") ||
      hasSuppressedMountAnimation) &&
    hasNonZeroDuration(panelStyles.animationDuration)
  const hasTransition = hasNonZeroDuration(panelStyles.transitionDuration)
  if (hasAnimation && hasTransition) return "css-transition"
  if (hasTransition) return "css-transition"
  if (hasAnimation) return "css-animation"
  return "none"
}
function hasNonZeroDuration(value) {
  return value
    .split(",")
    .map((part) => part.trim())
    .some((part) => part !== "" && Number.parseFloat(part) > 0)
}
/**
 * Temporarily overrides an inline style property and returns a cleanup that
 * restores the previous inline value and priority.
 * @param element - The element whose inline style should be updated.
 * @param property - The CSS property name to override.
 * @param value - The temporary value to assign.
 * @returns A cleanup function that restores the original inline style state.
 */
function setTemporaryStyle(element, property, value) {
  const previousValue = element.style.getPropertyValue(property)
  const previousPriority = element.style.getPropertyPriority(property)
  element.style.setProperty(property, value)
  return () => {
    if (previousValue === "") {
      element.style.removeProperty(property)
      return
    }
    element.style.setProperty(property, previousValue, previousPriority)
  }
}
/**
 * Temporarily resets inline alignment styles that can distort scroll-based
 * size measurements, then restores them on the next animation frame.
 * @param element - The panel element being measured.
 * @returns A cleanup function that cancels the scheduled restore and reapplies
 * the original inline layout styles immediately.
 */
function resetLayoutStyles(element) {
  const originalLayoutStyles = {
    "justify-content": element.style.justifyContent,
    "align-items": element.style.alignItems,
    "align-content": element.style.alignContent,
    "justify-items": element.style.justifyItems,
  }
  Object.keys(originalLayoutStyles).forEach((key) => {
    element.style.setProperty(key, "initial", "important")
  })
  function restoreLayoutStyles() {
    Object.entries(originalLayoutStyles).forEach(([key, value]) => {
      if (value === "") {
        element.style.removeProperty(key)
        return
      }
      element.style.setProperty(key, value)
    })
  }
  const frame = AnimationFrame.request(restoreLayoutStyles)
  return () => {
    AnimationFrame.cancel(frame)
    restoreLayoutStyles()
  }
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/collapsible/panel/CollapsiblePanelCssVars.mjs
const CollapsiblePanelCssVars = /*#__PURE__*/ (function (CollapsiblePanelCssVars) {
  /**
   * The collapsible panel's height.
   * @type {number}
   */
  CollapsiblePanelCssVars["collapsiblePanelHeight"] = "--collapsible-panel-height"
  /**
   * The collapsible panel's width.
   * @type {number}
   */
  CollapsiblePanelCssVars["collapsiblePanelWidth"] = "--collapsible-panel-width"
  return CollapsiblePanelCssVars
})({})
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/collapsible/panel/CollapsiblePanel.mjs
/**
 * A panel with the collapsible contents.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Collapsible](https://base-ui.com/react/components/collapsible)
 */
const CollapsiblePanel = /*#__PURE__*/ import_react.forwardRef(
  function CollapsiblePanel(componentProps, forwardedRef) {
    const {
      className,
      hiddenUntilFound: hiddenUntilFoundProp,
      keepMounted: keepMountedProp,
      render,
      id: idProp,
      style,
      ...elementProps
    } = componentProps
    const {
      defaultPanelId,
      mounted,
      onOpenChange,
      open,
      setMounted,
      setPanelIdState,
      setOpen,
      state,
      transitionStatus,
    } = useCollapsibleRootContext()
    const hiddenUntilFound = hiddenUntilFoundProp ?? false
    const keepMounted = keepMountedProp ?? false
    const registeredId = idProp || void 0
    const id = registeredId ?? defaultPanelId
    useIsoLayoutEffect(() => {
      setPanelIdState((currentId) => registeredId ?? (currentId === null ? void 0 : currentId))
      return () => {
        setPanelIdState((currentId) => (currentId === registeredId ? null : currentId))
      }
    }, [registeredId, setPanelIdState])
    const {
      height,
      props,
      ref,
      shouldPreventOpenAnimation,
      shouldRender,
      transitionStatus: panelTransitionStatus,
      width,
    } = useCollapsiblePanel({
      externalRef: forwardedRef,
      hiddenUntilFound,
      id,
      keepMounted,
      mounted,
      onOpenChange,
      open,
      setMounted,
      setOpen,
      transitionStatus,
    })
    const panelState = {
      ...state,
      transitionStatus: panelTransitionStatus,
    }
    const resolvedStyle = resolveStyle(style, panelState)
    const element = useRenderElement(
      "div",
      {
        ...componentProps,
        style: void 0,
      },
      {
        state: panelState,
        ref,
        props: [
          props,
          {
            style: {
              [CollapsiblePanelCssVars.collapsiblePanelHeight]:
                height === void 0 ? "auto" : `${height}px`,
              [CollapsiblePanelCssVars.collapsiblePanelWidth]:
                width === void 0 ? "auto" : `${width}px`,
            },
          },
          elementProps,
          resolvedStyle ? { style: resolvedStyle } : void 0,
          shouldPreventOpenAnimation ? { style: { animationName: "none" } } : void 0,
        ],
        stateAttributesMapping: collapsibleStateAttributesMapping,
      },
    )
    if (!shouldRender) return null
    return element
  },
)
//#endregion
//#region src/components/ui/collapsible.tsx
function Collapsible({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleRoot, {
    "data-slot": "collapsible",
    ...props,
  })
}
function CollapsibleTrigger({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleTrigger$1, {
    "data-slot": "collapsible-trigger",
    ...props,
  })
}
function CollapsibleContent({ className, children, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsiblePanel, {
    "data-slot": "collapsible-content",
    "className":
      "h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0",
    ...props,
    "children": /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
      className: cn(className),
      children,
    }),
  })
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/switch/root/SwitchRootContext.mjs
const SwitchRootContext = /*#__PURE__*/ import_react.createContext(void 0)
function useSwitchRootContext() {
  const context = import_react.useContext(SwitchRootContext)
  if (context === void 0) throw new Error(formatErrorMessage(63))
  return context
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/switch/stateAttributesMapping.mjs
const stateAttributesMapping = {
  ...fieldValidityMapping,
  checked(value) {
    if (value) return { "data-checked": "" }
    return { "data-unchecked": "" }
  },
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/switch/root/SwitchRoot.mjs
/**
 * Represents the switch itself.
 * Renders a `<span>` element and a hidden `<input>` beside.
 *
 * Documentation: [Base UI Switch](https://base-ui.com/react/components/switch)
 */
const SwitchRoot = /*#__PURE__*/ import_react.forwardRef(
  function SwitchRoot(componentProps, forwardedRef) {
    const {
      checked: checkedProp,
      className,
      defaultChecked,
      "aria-labelledby": ariaLabelledByProp,
      form,
      id: idProp,
      inputRef: externalInputRef,
      name: nameProp,
      nativeButton = false,
      onCheckedChange,
      readOnly = false,
      required = false,
      disabled: disabledProp = false,
      render,
      uncheckedValue,
      value,
      style,
      ...elementProps
    } = componentProps
    const { clearErrors } = useFormContext()
    const {
      state: fieldState,
      setTouched,
      setDirty,
      validityData,
      setFilled,
      setFocused,
      validationMode,
      disabled: fieldDisabled,
      name: fieldName,
      validation,
    } = useFieldRootContext()
    const { labelId } = useLabelableContext()
    const disabled = fieldDisabled || disabledProp
    const name = fieldName ?? nameProp
    const inputRef = import_react.useRef(null)
    const handleInputRef = useMergedRefs(inputRef, externalInputRef, validation.inputRef)
    const switchRef = import_react.useRef(null)
    const id = useBaseUiId()
    const controlId = useLabelableId({
      id: idProp,
      implicit: false,
      controlRef: switchRef,
    })
    const hiddenInputId = nativeButton ? void 0 : controlId
    const [checked, setCheckedState] = useControlled({
      controlled: checkedProp,
      default: Boolean(defaultChecked),
      name: "Switch",
      state: "checked",
    })
    useRegisterFieldControl(switchRef, id, checked, void 0, !disabled, nameProp)
    useIsoLayoutEffect(() => {
      if (inputRef.current) setFilled(inputRef.current.checked)
    }, [setFilled])
    useValueChanged(checked, () => {
      clearErrors(name)
      setDirty(checked !== validityData.initialValue)
      setFilled(checked)
      validation.change(checked)
    })
    const { getButtonProps, buttonRef } = useButton({
      disabled,
      native: nativeButton,
    })
    const ariaLabelledBy = useAriaLabelledBy(
      ariaLabelledByProp,
      labelId,
      inputRef,
      !nativeButton,
      hiddenInputId,
    )
    const rootProps = {
      "id": nativeButton ? controlId : id,
      "role": "switch",
      "aria-checked": checked,
      "aria-readonly": readOnly || void 0,
      "aria-required": required || void 0,
      "aria-labelledby": ariaLabelledBy,
      "onFocus"() {
        if (!disabled) setFocused(true)
      },
      "onBlur"() {
        const element = inputRef.current
        if (!element || disabled) return
        setTouched(true)
        setFocused(false)
        if (validationMode === "onBlur") validation.commit(element.checked)
      },
      "onClick"(event) {
        if (readOnly || disabled) return
        event.preventDefault()
        const input = inputRef.current
        if (!input) return
        dispatchClickWithModifiers(input, event)
      },
    }
    const inputProps = {
      ...validation.getValidationProps(disabled),
      checked,
      disabled,
      form,
      "id": hiddenInputId,
      name,
      required,
      "style": name ? visuallyHiddenInput : visuallyHidden,
      "tabIndex": -1,
      "type": "checkbox",
      "aria-hidden": true,
      "ref": handleInputRef,
      "onChange"(event) {
        if (event.nativeEvent.defaultPrevented) return
        if (readOnly) {
          event.preventDefault()
          return
        }
        const nextChecked = event.currentTarget.checked
        const eventDetails = createChangeEventDetails(none, event.nativeEvent)
        onCheckedChange?.(nextChecked, eventDetails)
        if (eventDetails.isCanceled) return
        setCheckedState(nextChecked)
      },
      "onClick"(event) {
        event.stopPropagation()
      },
      "onFocus"() {
        switchRef.current?.focus()
      },
      ...(value !== void 0 ? { value } : EMPTY_OBJECT),
    }
    const state = import_react.useMemo(
      () => ({
        ...fieldState,
        checked,
        disabled,
        readOnly,
        required,
      }),
      [fieldState, checked, disabled, readOnly, required],
    )
    const element = useRenderElement("span", componentProps, {
      state,
      ref: [forwardedRef, switchRef, buttonRef],
      props: [
        rootProps,
        elementProps,
        getButtonProps,
        (props) => validation.getValidationProps(disabled, props),
      ],
      stateAttributesMapping,
    })
    return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(SwitchRootContext.Provider, {
      value: state,
      children: [
        element,
        !checked &&
          name &&
          uncheckedValue !== void 0 &&
          /*#__PURE__*/ (0, import_jsx_runtime.jsx)("input", {
            type: "hidden",
            form,
            name,
            value: uncheckedValue,
            disabled,
          }),
        /*#__PURE__*/ (0, import_jsx_runtime.jsx)("input", {
          ...inputProps,
          suppressHydrationWarning: true,
        }),
      ],
    })
  },
)
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/switch/thumb/SwitchThumb.mjs
/**
 * The movable part of the switch that indicates whether the switch is on or off.
 * Renders a `<span>`.
 *
 * Documentation: [Base UI Switch](https://base-ui.com/react/components/switch)
 */
const SwitchThumb = /*#__PURE__*/ import_react.forwardRef(
  function SwitchThumb(componentProps, forwardedRef) {
    const { render, className, style, ...elementProps } = componentProps
    const state = useSwitchRootContext()
    return useRenderElement("span", componentProps, {
      state,
      ref: forwardedRef,
      stateAttributesMapping,
      props: elementProps,
    })
  },
)
//#endregion
//#region src/components/ui/switch.tsx
function Switch({ className, size = "default", ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchRoot, {
    "data-slot": "switch",
    "data-size": size,
    "className": cn(
      "peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-[color,background-color,border-color,outline-color,box-shadow,opacity,translate] outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 data-[size=default]:h-[18.4px] data-[size=default]:w-[32px] data-[size=sm]:h-[14px] data-[size=sm]:w-[24px] dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80 data-disabled:cursor-not-allowed data-disabled:opacity-50",
      className,
    ),
    ...props,
    "children": /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, {
      "data-slot": "switch-thumb",
      "className":
        "pointer-events-none block rounded-full bg-background ring-0 transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] dark:data-checked:bg-primary-foreground group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 dark:data-unchecked:bg-foreground",
    }),
  })
}
//#endregion
//#region src/features/rules/presets.ts
/**
 * The rules offered as a single switch, because they take no arguments and their whole meaning is
 * whether they run. Both rule-chain forms are built from this list, so the two stay in step.
 */
const PROCESSOR_PRESETS = [
  {
    label: "过滤无效节点",
    value: { type: "filter-useless" },
  },
  {
    label: "添加地区旗帜",
    value: {
      type: "flag",
      mode: "add",
    },
  },
  {
    label: "重名自动编号",
    value: {
      type: "handle-duplicates",
      action: "rename",
      fields: ["name"],
    },
  },
  {
    label: "删除重复节点",
    value: { type: "dedupe" },
  },
]
//#endregion
//#region src/features/rules/rule-chain-state.ts
/**
 * The fields the sort row offers. Narrower than `ProcessorField` on purpose: sorting a node list by
 * address or port orders it by something nobody reads, so the row does not offer either — while
 * `dedupe` and `handle-duplicates` still group on them, which is what those fields are for.
 */
const SORTABLE_FIELDS = ["name", "type"]
const EMPTY_RULE_CHAIN = {
  enabledPresets: [],
  filterPattern: "",
  renamePattern: "",
  renameReplacement: "",
  sortField: "",
  sortDescending: false,
  setOptions: {},
}
function ruleChainToProcessors(rules) {
  const list = []
  if (rules.filterPattern)
    list.push({
      type: "filter",
      field: "name",
      pattern: rules.filterPattern,
    })
  if (rules.renamePattern)
    list.push({
      type: "rename",
      pattern: rules.renamePattern,
      replacement: rules.renameReplacement,
    })
  if (rules.sortField)
    list.push({
      type: "sort",
      field: rules.sortField,
      ...(rules.sortDescending ? { order: "desc" } : {}),
    })
  for (const preset of PROCESSOR_PRESETS)
    if (rules.enabledPresets.includes(preset.value.type)) list.push(preset.value)
  if (Object.keys(rules.setOptions).length > 0)
    list.push({
      type: "set-options",
      values: rules.setOptions,
    })
  return list
}
function canonical(value) {
  if (Array.isArray(value)) return `[${value.map((item) => canonical(item)).join(",")}]`
  if (value && typeof value === "object")
    return `{${Object.entries(value)
      .filter(([, item]) => item !== void 0)
      .toSorted(([left], [right]) => (left < right ? -1 : 1))
      .map(([key, item]) => `${JSON.stringify(key)}:${canonical(item)}`)
      .join(",")}}`
  return JSON.stringify(value) ?? "null"
}
function sameProcessor(left, right) {
  return canonical(left) === canonical(right)
}
/**
 * The order the form can absorb a chain in, which is `ruleChainToProcessors`'s own order. A rule that
 * arrives out of this order cannot be moved into a form row without reordering the chain, so it is
 * preserved where it stands instead.
 */
const SLOTS = ["filter", "rename", "sort", "presets", "set-options"]
function slotOf(processor) {
  if (processor.type === "filter") return "filter"
  if (processor.type === "rename") return "rename"
  if (processor.type === "sort") return "sort"
  if (processor.type === "set-options") return "set-options"
  return "presets"
}
function fill(rules, processor, slot) {
  if (slot === "filter" && processor.type === "filter") {
    const { field = "name", flags, keep, pattern, ...rest } = processor
    if (flags !== void 0 || keep !== void 0 || Object.keys(rest).length > 1) return false
    if (field !== "name") return false
    rules.filterPattern = pattern
    return true
  }
  if (slot === "rename" && processor.type === "rename") {
    if (processor.flags !== void 0) return false
    rules.renamePattern = processor.pattern
    rules.renameReplacement = processor.replacement
    return true
  }
  if (slot === "sort" && processor.type === "sort") {
    const { field, order, ...rest } = processor
    if (Object.keys(rest).length > 1) return false
    if (!field) return false
    if (!SORTABLE_FIELDS.includes(field)) return false
    if (order === "asc") return false
    rules.sortField = field
    rules.sortDescending = order === "desc"
    return true
  }
  if (slot === "set-options" && processor.type === "set-options") {
    const stated = Object.entries(processor.values).filter(([, value]) => value !== void 0)
    if (stated.length === 0) return false
    if (!stated.every(([key]) => SET_OPTIONS.includes(key))) return false
    rules.setOptions = Object.fromEntries(stated)
    return true
  }
  const preset = PROCESSOR_PRESETS.find((item) => sameProcessor(item.value, processor))
  if (!preset || rules.enabledPresets.includes(preset.value.type)) return false
  rules.enabledPresets.push(preset.value.type)
  return true
}
function splitProcessors(processors) {
  const rules = {
    ...EMPTY_RULE_CHAIN,
    enabledPresets: [],
    setOptions: {},
  }
  const preserved = []
  let cursor = 0
  let owned = 0
  for (const processor of processors) {
    const slot = slotOf(processor)
    const index = SLOTS.indexOf(slot)
    if (index < cursor || !fill(rules, processor, slot)) {
      preserved.push({
        after: owned,
        processor,
      })
      continue
    }
    cursor = slot === "presets" ? index : index + 1
    owned += 1
  }
  return {
    preserved,
    rules,
  }
}
function mergeRuleChain({ preserved, rules }) {
  const list = ruleChainToProcessors(rules)
  for (const [inserted, entry] of preserved.entries()) {
    const at = Math.min(entry.after + inserted, list.length)
    list.splice(at, 0, entry.processor)
  }
  return list
}
function togglePreset(rules, type, enabled) {
  return {
    ...rules,
    enabledPresets: enabled
      ? [...rules.enabledPresets, type]
      : rules.enabledPresets.filter((item) => item !== type),
  }
}
/** Cycles one `set-options` switch between stating nothing, stating `true` and stating `false`. */
function setNodeOption(rules, option, value) {
  const { [option]: _dropped, ...rest } = rules.setOptions
  return {
    ...rules,
    setOptions:
      value === void 0
        ? rest
        : {
            ...rest,
            [option]: value,
          },
  }
}
//#endregion
//#region src/features/rules/processor-labels.ts
/**
 * What each rule is called, and how one reads back with its arguments.
 *
 * The wording lives here rather than in `core/nodes/processors/`, because a rule's name is a property
 * of this interface and not of the transform: core answers with a `type` and nothing else, so nothing
 * in it has to know which language anybody reads. That also means the mapping has to be exhaustive —
 * `Record<NodeProcessor["type"], string>` is what makes a rule added to core without a name here a
 * type error rather than a row reading `set-options` on screen.
 */
const PROCESSOR_LABELS = {
  "filter": "名称过滤",
  "rename": "重命名",
  "sort": "排序",
  "dedupe": "去重",
  "handle-duplicates": "重名处理",
  "filter-useless": "过滤无效节点",
  "flag": "地区旗帜",
  "set-options": "设置选项",
}
function processorLabel(type) {
  return PROCESSOR_LABELS[type]
}
/**
 * What each `set-options` switch is called. Exhaustive over `SetOption` for the reason the table above
 * is over `NodeProcessor["type"]`: a switch core learns to force without a name here would reach the
 * form as its raw key.
 */
const SET_OPTION_LABELS = {
  "udp": "UDP 转发",
  "tfo": "TCP Fast Open",
  "skip-cert-verify": "跳过证书验证",
}
/**
 * The three states a `set-options` switch can be put in, and the one place their wording lives.
 *
 * Three, not two: a switch left alone says nothing about that option and the node keeps whatever its
 * source stated, which is a different instruction from forcing it off. Neither control that offers
 * them can express that in a `Switch`, so both spell the choice out — the workbench as a button
 * group, the editor as a select — and both read the same list, because two encodings of one tri-state
 * is how the two came to disagree about what "默认" leaves behind.
 */
const SET_OPTION_CHOICES = [
  {
    label: "默认",
    value: "unset",
  },
  {
    label: "开启",
    value: "on",
  },
  {
    label: "关闭",
    value: "off",
  },
]
/** The choice a stated value stands at. */
function setOptionChoice(value) {
  return value === void 0 ? "unset" : value ? "on" : "off"
}
/** What a choice states, which for "默认" is nothing at all. */
function setOptionValue(choice) {
  return choice === "unset" ? void 0 : choice === "on"
}
/** Which node field a rule names, where a person reads it. */
const PROCESSOR_FIELD_LABELS = {
  name: "名称",
  type: "协议",
  server: "地址",
  port: "端口",
}
/**
 * What the sort row offers, built from the state module's own list so the two cannot drift. An empty
 * value is the row's "do not sort", which is why it is an option rather than a separate switch.
 */
const SORT_FIELD_OPTIONS = [
  {
    label: "不排序",
    value: "",
  },
  ...SORTABLE_FIELDS.map((field) => ({
    label: PROCESSOR_FIELD_LABELS[field],
    value: field,
  })),
]
const SORT_ORDER_OPTIONS = [
  {
    label: "升序",
    value: "asc",
  },
  {
    label: "降序",
    value: "desc",
  },
]
/**
 * A one-line summary. Rules that take arguments show the ones worth reading; the rest are their own
 * description, so they fall through to the label alone.
 *
 * `dedupe`'s fields come from `DEDUPE_DEFAULT_FIELDS` rather than being spelled out again: a rule that
 * states none of its own groups on those, and naming a different set here would describe a rule that
 * is not the one running.
 */
function describeProcessor(processor) {
  const label = processorLabel(processor.type)
  switch (processor.type) {
    case "filter":
      return `${label}（${processor.pattern}）`
    case "rename":
      return `${label}（→ ${processor.replacement || "空"}）`
    case "sort":
      return `${label}（${processor.field ?? "name"}）`
    case "dedupe":
      return `${label}（${(processor.fields?.length ? processor.fields : DEDUPE_DEFAULT_FIELDS).join(", ")}）`
    case "flag":
      return `${label}（${processor.mode === "add" ? "添加" : "移除"}）`
    default:
      return label
  }
}
//#endregion
//#region src/features/rules/rule-chain.tsx
/**
 * Fixed height, not vertical padding: with padding the row ends up as tall as whatever it happens to
 * contain — a 16.5px summary line in one row, an 18.4px switch in the next — so the chain staggered
 * against itself and against the output panel's tab strip, which states its own `h-10`. Always on the
 * inner element, never on the one carrying `ROW_STATE`'s border, or `border-box` eats a pixel of it
 * and the two kinds of row disagree again.
 */
const ROW = "flex h-10 w-full items-center gap-2.5 pr-4 pl-5 text-left"
const ROW_STATE = "border-b text-muted-foreground data-[configured=true]:text-foreground"
const ROW_INDEX = "font-mono text-[11px] text-muted-foreground"
const ROW_LABEL = "shrink-0 text-xs font-semibold tracking-[0.08em] uppercase"
/** Sits at the right edge next to the chevron, so every row's state reads down one line. */
const ROW_SUMMARY = "ml-auto truncate pl-2 text-xs text-muted-foreground"
const UNSET = "未启用"
/** Summary line for the collapsed rows, so the chain reads without expanding anything. */
function summarize(rules) {
  const stated = SET_OPTIONS.filter((option) => rules.setOptions[option] !== void 0)
  return {
    "filter": rules.filterPattern || UNSET,
    "sort": rules.sortField
      ? `${PROCESSOR_FIELD_LABELS[rules.sortField]} · ${rules.sortDescending ? "降序" : "升序"}`
      : UNSET,
    "rename": rules.renamePattern ? rules.renameReplacement || "（清空名称）" : UNSET,
    "set-options":
      stated.length > 0
        ? stated
            .map(
              (option) => `${SET_OPTION_LABELS[option]}${rules.setOptions[option] ? "开" : "关"}`,
            )
            .join(" · ")
        : UNSET,
  }
}
function ExpandableRule({ children, configured, index, label, onToggle, open, summary }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Collapsible, {
    "data-configured": configured,
    "className": ROW_STATE,
    open,
    "onOpenChange": onToggle,
    "children": [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CollapsibleTrigger, {
        className: cn(ROW, "group aria-expanded:bg-muted"),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
            className: ROW_INDEX,
            children: index,
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
            className: ROW_LABEL,
            children: label,
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
            className: ROW_SUMMARY,
            children: summary,
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconChevronRight, {
            className:
              "size-3.5 shrink-0 text-muted-foreground transition-transform duration-200 ease-out group-aria-expanded:rotate-90",
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleContent, {
        className: "flex flex-col gap-3 px-5 py-4",
        children,
      }),
    ],
  })
}
function ToggleRule({ checked, id, index, label, onCheckedChange }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    "data-configured": checked,
    "className": ROW_STATE,
    "children": /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
      className: ROW,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
          className: ROW_INDEX,
          children: index,
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
          htmlFor: id,
          className: ROW_LABEL,
          children: label,
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
          id,
          "aria-label": label,
          "className": "ml-auto",
          checked,
          onCheckedChange,
        }),
      ],
    }),
  })
}
/** The narrow panel's reading of `SET_OPTION_CHOICES`: all three at once, as a button group. */
function OptionTriState({ label, onChange, value }) {
  const current = setOptionChoice(value)
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    className: "flex items-center gap-2.5",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
        className: "min-w-0 flex-1 truncate text-xs",
        children: label,
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonGroup, {
        "aria-label": label,
        "children": SET_OPTION_CHOICES.map((choice) =>
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            Button,
            {
              "type": "button",
              "size": "xs",
              "variant": choice.value === current ? "default" : "outline",
              "aria-pressed": choice.value === current,
              "onClick": () => onChange(setOptionValue(choice.value)),
              "children": choice.label,
            },
            choice.value,
          ),
        ),
      }),
    ],
  })
}
function RuleChain({ className, onChange, value }) {
  const [openRule, setOpenRule] = (0, import_react.useState)("filter")
  const summary = summarize(value)
  function toggleRule(rule) {
    setOpenRule((current) => (current === rule ? null : rule))
  }
  function patch(changes) {
    onChange({
      ...value,
      ...changes,
    })
  }
  function onPresetChange(type, enabled) {
    onChange(togglePreset(value, type, enabled))
  }
  const presetsFrom = 4
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    className,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpandableRule, {
        index: 1,
        label: processorLabel("filter"),
        configured: Boolean(value.filterPattern),
        summary: summary.filter,
        open: openRule === "filter",
        onToggle: () => toggleRule("filter"),
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
              htmlFor: "rule-filter-pattern",
              children: "正则",
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
              id: "rule-filter-pattern",
              className: "h-8 font-mono text-sm",
              placeholder: "^HK|Hong Kong",
              value: value.filterPattern,
              onChange: (event) => patch({ filterPattern: event.target.value }),
            }),
          ],
        }),
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ExpandableRule, {
        index: 2,
        label: processorLabel("rename"),
        configured: Boolean(value.renamePattern),
        summary: summary.rename,
        open: openRule === "rename",
        onToggle: () => toggleRule("rename"),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
                htmlFor: "rule-rename-pattern",
                children: "匹配正则",
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                id: "rule-rename-pattern",
                className: "h-8 font-mono text-sm",
                placeholder: "^(.*)$",
                value: value.renamePattern,
                onChange: (event) => patch({ renamePattern: event.target.value }),
              }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
                htmlFor: "rule-rename-replacement",
                children: "替换内容",
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                id: "rule-rename-replacement",
                className: "h-8 font-mono text-sm",
                placeholder: "Proxy $1",
                value: value.renameReplacement,
                onChange: (event) => patch({ renameReplacement: event.target.value }),
              }),
            ],
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ExpandableRule, {
        index: 3,
        label: processorLabel("sort"),
        configured: Boolean(value.sortField),
        summary: summary.sort,
        open: openRule === "sort",
        onToggle: () => toggleRule("sort"),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
                htmlFor: "rule-sort-field",
                children: "排序字段",
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
                items: SORT_FIELD_OPTIONS,
                value: value.sortField,
                onValueChange: (next) => patch({ sortField: next }),
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
                    id: "rule-sort-field",
                    className: "h-8 w-full",
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}),
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup, {
                      children: SORT_FIELD_OPTIONS.map((option) =>
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                          SelectItem,
                          {
                            value: option.value,
                            children: option.label,
                          },
                          option.value,
                        ),
                      ),
                    }),
                  }),
                ],
              }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className: "flex items-center gap-2.5",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
                htmlFor: "rule-sort-descending",
                className: "min-w-0 flex-1 truncate text-xs",
                children: "降序",
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
                "id": "rule-sort-descending",
                "aria-label": "降序",
                "checked": value.sortDescending,
                "disabled": !value.sortField,
                "onCheckedChange": (checked) => patch({ sortDescending: checked }),
              }),
            ],
          }),
        ],
      }),
      PROCESSOR_PRESETS.map((preset, index) =>
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ToggleRule,
          {
            id: `rule-toggle-${preset.value.type}`,
            index: presetsFrom + index,
            label: preset.label,
            checked: value.enabledPresets.includes(preset.value.type),
            onCheckedChange: (checked) => onPresetChange(preset.value.type, checked),
          },
          preset.value.type,
        ),
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpandableRule, {
        index: presetsFrom + PROCESSOR_PRESETS.length,
        label: processorLabel("set-options"),
        configured: Object.keys(value.setOptions).length > 0,
        summary: summary["set-options"],
        open: openRule === "set-options",
        onToggle: () => toggleRule("set-options"),
        children: SET_OPTIONS.map((option) =>
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            OptionTriState,
            {
              label: SET_OPTION_LABELS[option],
              value: value.setOptions[option],
              onChange: (next) => onChange(setNodeOption(value, option, next)),
            },
            option,
          ),
        ),
      }),
    ],
  })
}
//#endregion
//#region src/features/rules/rule-chain-form.tsx
/**
 * The editor's own rule chain, deliberately not the workbench's: that one is a scrolling column in
 * a narrow panel, where folding each rule away earns its keep. Here there is a full form section to
 * spend, so the rules that take arguments show their inputs outright and the ones that are only on or
 * off collapse into one grid — no row has to be opened to be read.
 */
function RuleChainForm({ onChange, value }) {
  function patch(changes) {
    onChange({
      ...value,
      ...changes,
    })
  }
  const toggles = PROCESSOR_PRESETS.map((preset) => ({
    checked: value.enabledPresets.includes(preset.value.type),
    id: `editor-rule-toggle-${preset.value.type}`,
    label: preset.label,
    onCheckedChange: (checked) => onChange(togglePreset(value, preset.value.type, checked)),
  }))
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    className: "flex flex-col gap-4",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
            htmlFor: "editor-rule-filter-pattern",
            children: processorLabel("filter"),
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
            id: "editor-rule-filter-pattern",
            className: "font-mono text-xs",
            placeholder: "^HK|Hong Kong",
            value: value.filterPattern,
            onChange: (event) => patch({ filterPattern: event.target.value }),
            spellCheck: false,
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldTitle, {
            children: processorLabel("rename"),
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className: "grid gap-4 md:grid-cols-2",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
                    htmlFor: "editor-rule-rename-pattern",
                    className: "text-[11px] text-muted-foreground",
                    children: "匹配正则",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                    id: "editor-rule-rename-pattern",
                    className: "font-mono text-xs",
                    placeholder: "^(.*)$",
                    value: value.renamePattern,
                    onChange: (event) => patch({ renamePattern: event.target.value }),
                    spellCheck: false,
                  }),
                ],
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
                    htmlFor: "editor-rule-rename-replacement",
                    className: "text-[11px] text-muted-foreground",
                    children: "替换内容",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                    id: "editor-rule-rename-replacement",
                    className: "font-mono text-xs",
                    placeholder: "Proxy $1",
                    value: value.renameReplacement,
                    onChange: (event) => patch({ renameReplacement: event.target.value }),
                    spellCheck: false,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldTitle, {
            children: processorLabel("sort"),
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className: "grid gap-4 md:grid-cols-2",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
                    htmlFor: "editor-rule-sort-field",
                    className: "text-[11px] text-muted-foreground",
                    children: "排序字段",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
                    items: SORT_FIELD_OPTIONS,
                    value: value.sortField,
                    onValueChange: (next) => patch({ sortField: next }),
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
                        id: "editor-rule-sort-field",
                        className: "w-full",
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}),
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup, {
                          children: SORT_FIELD_OPTIONS.map((option) =>
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                              SelectItem,
                              {
                                value: option.value,
                                children: option.label,
                              },
                              option.value,
                            ),
                          ),
                        }),
                      }),
                    ],
                  }),
                ],
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
                    htmlFor: "editor-rule-sort-order",
                    className: "text-[11px] text-muted-foreground",
                    children: "顺序",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
                    items: SORT_ORDER_OPTIONS,
                    value: value.sortDescending ? "desc" : "asc",
                    onValueChange: (next) => patch({ sortDescending: next === "desc" }),
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
                        id: "editor-rule-sort-order",
                        className: "w-full",
                        disabled: !value.sortField,
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}),
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup, {
                          children: SORT_ORDER_OPTIONS.map((option) =>
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                              SelectItem,
                              {
                                value: option.value,
                                children: option.label,
                              },
                              option.value,
                            ),
                          ),
                        }),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
        className: "grid gap-x-8 md:grid-cols-2",
        children: toggles.map((toggle) =>
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "label",
            {
              htmlFor: toggle.id,
              className: "flex h-9 items-center gap-2.5",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                  className: "text-xs font-semibold tracking-[0.05em]",
                  children: toggle.label,
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
                  id: toggle.id,
                  className: "ml-auto",
                  checked: toggle.checked,
                  onCheckedChange: toggle.onCheckedChange,
                }),
              ],
            },
            toggle.id,
          ),
        ),
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldTitle, {
            children: processorLabel("set-options"),
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldDescription, {
            children: "不设置的开关保持来源里的原值。",
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
            className: "grid gap-4 md:grid-cols-3",
            children: SET_OPTIONS.map((option) =>
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                Field,
                {
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
                      htmlFor: `editor-rule-option-${option}`,
                      className: "text-[11px] text-muted-foreground",
                      children: SET_OPTION_LABELS[option],
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
                      items: SET_OPTION_CHOICES,
                      value: setOptionChoice(value.setOptions[option]),
                      onValueChange: (next) =>
                        onChange(setNodeOption(value, option, setOptionValue(next))),
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
                          id: `editor-rule-option-${option}`,
                          className: "w-full",
                          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}),
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
                          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup, {
                            children: SET_OPTION_CHOICES.map((choice) =>
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                SelectItem,
                                {
                                  value: choice.value,
                                  children: choice.label,
                                },
                                choice.value,
                              ),
                            ),
                          }),
                        }),
                      ],
                    }),
                  ],
                },
                option,
              ),
            ),
          }),
        ],
      }),
    ],
  })
}
//#endregion
//#region node_modules/.pnpm/@tanstack+start-server-core@1.169.30/node_modules/@tanstack/start-server-core/dist/esm/createSsrRpc.js
const createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId
  const serverFnMeta = { id: functionId }
  const fn = async (...args) => {
    return (await getServerFnById(functionId, { origin: "server" }))(...args)
  }
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true,
  })
}
//#endregion
//#region src/features/subscriptions/api/server-fn.ts
/**
 * The browser's side of the channel. Return types are inferred from `operations`'s own signatures, so
 * a call site writes no path, unwraps no envelope and asserts nothing about the response shape.
 *
 * The handler bodies are stripped from the client build by the Start plugin, which is what makes
 * importing server-only code here safe. A stripping failure is a build-time error (`cloudflare:workers`
 * unresolvable), not a silent leak.
 *
 * `.validator()` rather than `.inputValidator()`: the latter is marked `@deprecated` in the installed
 * version and behaves identically.
 *
 * A handler's ctx (`ServerFnCtx`) carries no `request` — that field belongs to `type: "request"`
 * middleware alone — so `origin` comes from `getRequest().url`. `new URL(path, origin)` reads only the
 * scheme and host, and `/_serverFn/*` is same-origin with the page, so which request's url it came
 * from cannot change the result.
 */
const listSubscriptions = createServerFn({ method: "POST" })
  .middleware([adminFunctionMiddleware])
  .handler(createSsrRpc("89fd89bbad38db578c6cb2bf86e8b3305ee392359297cb8c98424c9c04551a04"))
const reorderSubscriptions = createServerFn({ method: "POST" })
  .middleware([adminFunctionMiddleware])
  .validator((input) => input)
  .handler(createSsrRpc("aa15fce652c028452a0b598d161f382f9d376aaa0b9d2f41f95ee98a5f8fd18e"))
const getSubscription = createServerFn({ method: "POST" })
  .middleware([adminFunctionMiddleware])
  .validator((input) => input)
  .handler(createSsrRpc("f62d263e50d86de549bebc46361ec3893eaedd47c827551346dcaf249ffb4cfe"))
const getSubscriptionLink = createServerFn({ method: "POST" })
  .middleware([adminFunctionMiddleware])
  .validator((input) => input)
  .handler(createSsrRpc("bd995696fd52ca7994f7c0aec15c1ae829ed95a204ebbc0eaf0c2257f267f2ad"))
const registerSubscriptionLink = createServerFn({ method: "POST" })
  .middleware([adminFunctionMiddleware])
  .validator((input) => input)
  .handler(createSsrRpc("58f0261279c365dd49e4b1273259e91f13f06b060bf838cfa65dc8fe81ef5dd1"))
const createSubscription = createServerFn({ method: "POST" })
  .middleware([adminFunctionMiddleware])
  .validator((input) => input)
  .handler(createSsrRpc("f4dbccdbcddea8abfadb634a92f41620fe942e5ebabcbc7b535267a094c3fdf0"))
const appendSubscriptionNodes = createServerFn({ method: "POST" })
  .middleware([adminFunctionMiddleware])
  .validator((input) => input)
  .handler(createSsrRpc("e2b0ee9c340b1f9484a63ecb8509e9b5e7c55ae3cb81c459bcf538870e5bab0f"))
const updateSubscription = createServerFn({ method: "POST" })
  .middleware([adminFunctionMiddleware])
  .validator((input) => input)
  .handler(createSsrRpc("eb218f3236c3e2f3ba75455f70aa5307da043613515eb670351254f1e17e5c07"))
const readSubscriptionSnapshot = createServerFn({ method: "POST" })
  .middleware([adminFunctionMiddleware])
  .validator((input) => input)
  .handler(createSsrRpc("45be2eb57a6db9a94ee93a4b772a37d509cfd2fbd33a1120319511f459719643"))
const removeSubscription = createServerFn({ method: "POST" })
  .middleware([adminFunctionMiddleware])
  .validator((input) => input)
  .handler(createSsrRpc("14d07b44b6810ae2698986cc6844093df35e2271f1e77793ed42413a98d518b0"))
const rotateSubscriptionToken = createServerFn({ method: "POST" })
  .middleware([adminFunctionMiddleware])
  .validator((input) => input)
  .handler(createSsrRpc("d57d823ede0b5b48ffd55a001c11e50ac8f1350dd48e483c12be43eb21bc9464"))
//#endregion
//#region src/features/subscriptions/queries.ts
const NO_SUBSCRIPTIONS = []
const keys = {
  snapshot: (id, target) => ["subscriptions", id, "snapshot", target],
  subscription: (id) => ["subscriptions", id],
  subscriptions: ["subscriptions"],
}
function subscriptionsQuery() {
  return queryOptions({
    queryKey: keys.subscriptions,
    queryFn: () => listSubscriptions().then((payload) => payload.subscriptions),
  })
}
function subscriptionQuery(id) {
  return queryOptions({
    queryKey: keys.subscription(id),
    queryFn: () => getSubscription({ data: { id } }).then((payload) => payload.subscription),
    staleTime: 0,
  })
}
function invalidateSubscriptions(client) {
  return client.invalidateQueries({ queryKey: keys.subscriptions })
}
function useSubscriptions() {
  const query = useQuery({
    ...subscriptionsQuery(),
    enabled: useTokenUsable(),
  })
  return {
    failure: query.error,
    items: query.data ?? NO_SUBSCRIPTIONS,
    loaded: query.isSuccess,
  }
}
function useSubscription(id) {
  const query = useQuery({
    ...subscriptionQuery(id ?? ""),
    enabled: id !== null,
  })
  ;(0, import_react.useEffect)(() => {
    if (query.error) showError(query.error, "加载订阅失败。")
  }, [query.error])
  return query.data ?? null
}
function useSubscriptionSnapshot(id, target, enabled) {
  const query = useQuery({
    queryKey: keys.snapshot(id, target),
    queryFn: () =>
      readSubscriptionSnapshot({
        data: {
          id,
          target,
        },
      }).then((p) => p.snapshot),
    enabled,
  })
  return {
    failure: query.error,
    snapshot: query.data ?? null,
    loaded: query.isSuccess,
  }
}
async function discardResult(promise) {
  await promise
}
function useSaveSubscription() {
  const client = useQueryClient()
  return useMutation({
    mutationFn: ({ draft, id }) =>
      id
        ? discardResult(
            updateSubscription({
              data: {
                id,
                patch: draft,
              },
            }),
          )
        : createSubscription({ data: { draft } }),
    onSuccess: async (_result, { id }) => {
      await invalidateSubscriptions(client)
      showSuccess(id ? "订阅已更新" : "订阅已创建", id ? void 0 : "请立即保存新生成的订阅地址。")
    },
    onError: (error) => showError(error, "保存失败。"),
  })
}
function useAppendSubscriptionNodes() {
  const client = useQueryClient()
  return useMutation({
    mutationFn: ({ id, content }) =>
      appendSubscriptionNodes({
        data: {
          id,
          content,
        },
      }),
    onSuccess: async (result) => {
      await invalidateSubscriptions(client)
      await client.invalidateQueries({ queryKey: keys.subscription(result.subscription.id) })
      await client.invalidateQueries({
        queryKey: keys.snapshot(result.subscription.id, result.subscription.defaultTarget),
      })
      const message = result.added > 0 ? `已追加 ${result.added} 个新节点` : "没有新增节点"
      showSuccess(result.skipped > 0 ? `${message}，另有 ${result.skipped} 条内容未识别` : message)
    },
    onError: (error) => showError(error, "追加节点失败。"),
  })
}
function useRegisterSubscriptionLink() {
  const client = useQueryClient()
  return useMutation({
    mutationFn: ({ id, link }) =>
      registerSubscriptionLink({
        data: {
          id,
          link,
        },
      }),
    onSuccess: async () => {
      await invalidateSubscriptions(client)
      showSuccess("订阅链接已登记，现在可以重复复制")
    },
    onError: (error) => showError(error, "登记订阅链接失败。"),
  })
}
function useCopySubscriptionLink() {
  return useMutation({
    mutationFn: async (id) => {
      const result = await getSubscriptionLink({ data: { id } })
      if (!result.url)
        throw new Error("这是一条升级前创建的订阅，请先在详情中登记原链接或轮换 token。")
      await navigator.clipboard.writeText(result.url)
      return result.url
    },
    onSuccess: () => showSuccess("订阅链接已复制"),
    onError: (error) => showError(error, "无法复制订阅链接。"),
  })
}
function useRemoveSubscription() {
  const client = useQueryClient()
  return useMutation({
    mutationFn: (id) => removeSubscription({ data: { id } }),
    onSuccess: async () => {
      await invalidateSubscriptions(client)
      showSuccess("订阅已删除")
    },
    onError: (error) => showError(error, "删除失败。"),
  })
}
function useRotateToken() {
  const client = useQueryClient()
  return useMutation({
    mutationFn: (id) => rotateSubscriptionToken({ data: { id } }),
    onSuccess: async () => {
      await invalidateSubscriptions(client)
      showSuccess("token 已轮换", "旧订阅地址已失效，请保存新的订阅地址。")
    },
    onError: (error) => showError(error, "轮换失败。"),
  })
}
function useSetSubscriptionEnabled() {
  const client = useQueryClient()
  return useMutation({
    mutationFn: ({ enabled, subscription }) =>
      updateSubscription({
        data: {
          id: subscription.id,
          patch: { enabled },
        },
      }),
    onSuccess: async (_result, { enabled }) => {
      await invalidateSubscriptions(client)
      showSuccess(enabled ? "订阅已启用" : "订阅已停用")
    },
    onError: (error) => showError(error, "状态更新失败。"),
  })
}
/** The list's inline rename: the update API already accepts a name-only patch. */
function useRenameSubscription() {
  const client = useQueryClient()
  return useMutation({
    mutationFn: ({ id, name }) =>
      updateSubscription({
        data: {
          id,
          patch: { name },
        },
      }),
    onSuccess: async () => {
      await invalidateSubscriptions(client)
      showSuccess("订阅已重命名")
    },
    onError: (error) => showError(error, "重命名失败。"),
  })
}
/** One whole-order write per move; the refetch reorders the list on success. */
function useReorderSubscriptions() {
  const client = useQueryClient()
  return useMutation({
    mutationFn: (ids) => reorderSubscriptions({ data: { ids } }),
    onSuccess: async () => {
      await invalidateSubscriptions(client)
    },
    onError: (error) => showError(error, "排序失败。"),
  })
}
//#endregion
//#region src/features/subscriptions/source-types.ts
const SOURCE_TYPE_LABELS = {
  raw: "文本",
  pool: "持久化节点",
  remote: "远程",
  collection: "集合",
}
//#endregion
//#region src/features/subscriptions/source-urls.ts
/**
 * Splits the "远程" box into individual links. Newlines are the natural separator when pasting, and
 * `|` (half or full width) covers the single-line case.
 */
function splitSourceUrls(value) {
  return value
    .split(/[\n\r|｜]/)
    .map((item) => item.trim())
    .filter(Boolean)
}
const TARGET_OPTIONS = [
  "uri",
  "quantumult-x",
  "shadowrocket",
  "surge",
  "surge-mac",
  "surfboard",
  "loon",
  "mihomo",
  "clash",
  "stash",
  "egern",
  "v2ray",
  "xray",
  "sing-box",
].map((value) => ({
  label: targetLabel(value),
  value,
}))
/** What both the workbench and the editor start on, so reordering the picker moves neither alone. */
const DEFAULT_TARGET = TARGET_OPTIONS[0].value
//#endregion
//#region node_modules/.pnpm/@tanstack+react-table@9.1.2_d1d1cb6473c28c7e1a20fba9df5bced2/node_modules/@tanstack/react-table/dist/FlexRender.js
function isReactComponent(component) {
  return (
    isClassComponent(component) || typeof component === "function" || isExoticComponent(component)
  )
}
function isClassComponent(component) {
  return (
    typeof component === "function" &&
    (() => {
      const proto = Object.getPrototypeOf(component)
      return proto.prototype && proto.prototype.isReactComponent
    })()
  )
}
function isExoticComponent(component) {
  return (
    typeof component === "object" &&
    typeof component.$$typeof === "symbol" &&
    ["react.memo", "react.forward_ref"].includes(component.$$typeof.description)
  )
}
/**
 * If rendering headers, cells, or footers with custom markup, use flexRender instead of `cell.getValue()` or `cell.renderValue()`.
 * @example flexRender(cell.column.columnDef.cell, cell.getContext())
 */
function flexRender(Comp, props) {
  if (Comp === null || Comp === void 0) return null
  return isReactComponent(Comp) ? /* @__PURE__ */ import_react.createElement(Comp, props) : Comp
}
/**
 * Simplified component wrapper of `flexRender`. Use this utility component to render headers, cells, or footers with custom markup.
 * Only one prop (`cell`, `header`, or `footer`) may be passed.
 * @example
 * ```tsx
 * <FlexRender cell={cell} />
 * <FlexRender header={header} />
 * <FlexRender footer={footer} />
 * ```
 *
 * This replaces calling `flexRender` directly like this:
 * ```tsx
 * flexRender(cell.column.columnDef.cell, cell.getContext())
 * flexRender(header.column.columnDef.header, header.getContext())
 * flexRender(footer.column.columnDef.footer, footer.getContext())
 * ```
 */
function FlexRender(props) {
  if ("cell" in props && props.cell) {
    const cell = props.cell
    const def = cell.column.columnDef
    const groupingCell = cell
    const groupingDef = def
    if (groupingCell.getIsAggregated?.())
      return flexRender(groupingDef.aggregatedCell ?? def.cell, cell.getContext())
    if (groupingCell.getIsPlaceholder?.()) return null
    return flexRender(def.cell, cell.getContext())
  }
  if ("header" in props && props.header)
    return flexRender(props.header.column.columnDef.header, props.header.getContext())
  if ("footer" in props && props.footer)
    return flexRender(props.footer.column.columnDef.footer, props.footer.getContext())
  return null
}
//#endregion
//#region node_modules/.pnpm/@tanstack+react-table@9.1.2_d1d1cb6473c28c7e1a20fba9df5bced2/node_modules/@tanstack/react-table/dist/Subscribe.js
function Subscribe(props) {
  const selected = useSelector(props.source, props.selector, { compare: shallow })
  return typeof props.children === "function" ? props.children(selected) : props.children
}
//#endregion
//#region node_modules/.pnpm/@tanstack+table-core@9.1.2/node_modules/@tanstack/table-core/dist/core/reactivity/coreReactivityFeature.utils.js
/**
 * Bridges atom instances to the `Store`/`ReadonlyStore` API by exposing
 * a `state` getter backed by `atom.get()`, and wiring `setState` for
 * writable atoms.
 *
 * @example
 * ```ts
 * const store = atomToStore(atom)
 * ```
 */
function atomToStore(atom) {
  const store = atom
  Object.defineProperty(atom, "state", {
    get() {
      return atom.get()
    },
  })
  if ("set" in atom) store.setState = atom.set.bind(atom)
  return store
}
//#endregion
//#region node_modules/.pnpm/@tanstack+table-core@9.1.2/node_modules/@tanstack/table-core/dist/core/reactivity/renderPhaseReactivity.js
/**
 * Creates reactivity bindings for render-phase adapters (React, Preact, Lit):
 * frameworks with plain, non-reactive options that are re-synchronized during
 * component render, where store notifications must not fire until the host
 * commits.
 *
 * Readonly atoms are exposed as live facades. `get()` re-evaluates the
 * resolver against the options of the render in progress — a normal computed
 * cannot know that plain `options.state` changed — and caches the result
 * through the configured comparator so external-store consumers (e.g. React's
 * `useSyncExternalStore`) see referentially stable snapshots. `subscribe()`
 * goes through a hidden computed that tracks the resolver's real atom
 * dependencies plus a commit version, so subscribers are invalidated by
 * actual reactive writes and by the adapter's post-commit publication.
 *
 * @example
 * ```ts
 * import { batch, createAtom } from '@tanstack/react-store'
 *
 * export const reactReactivity = () =>
 *   renderPhaseReactivity({ createAtom, batch })
 * ```
 */
function renderPhaseReactivity(primitives) {
  const { createAtom, batch } = primitives
  const commitAtom = createAtom(0)
  return {
    createOptionsStore: false,
    wrapExternalAtoms: false,
    addSubscription: () => {
      throw new Error("Feature not supported in current reactivity implementation")
    },
    unmount: () => {
      throw new Error("Feature not supported in current reactivity implementation")
    },
    schedule: primitives.schedule ?? ((fn) => queueMicrotask(fn)),
    batch,
    untrack: (fn) => fn(),
    createReadonlyAtom: (fn, atomOptions) => {
      const compare = atomOptions?.compare ?? Object.is
      let hasSnapshot = false
      let snapshot
      const getSnapshot = () => {
        const nextSnapshot = fn()
        if (!hasSnapshot || !compare(snapshot, nextSnapshot)) {
          snapshot = nextSnapshot
          hasSnapshot = true
        }
        return snapshot
      }
      const reactiveAtom = createAtom(
        () => {
          commitAtom.get()
          return getSnapshot()
        },
        { compare },
      )
      return {
        get: getSnapshot,
        subscribe: reactiveAtom.subscribe.bind(reactiveAtom),
      }
    },
    createWritableAtom: (value, atomOptions) => {
      return createAtom(value, { compare: atomOptions?.compare })
    },
    commit: () => {
      commitAtom.set((version) => version + 1)
    },
  }
}
/**
 * Creates a render-phase source with an explicit commit baseline.
 *
 * Render-phase adapters publish controlled state after the host framework
 * commits so isolated subscribers update, but the component that owns the
 * table already rendered that exact snapshot — forwarding the notification to
 * its root subscription would produce a redundant render. Unlike a last-read
 * filter, speculative reads do not change notification behavior: only
 * `markCommitted()` advances the baseline.
 */
function createRenderPhaseSource(source, compare = Object.is) {
  let hasCommittedSnapshot = false
  let committedSnapshot
  return {
    get: source.get,
    markCommitted: (snapshot) => {
      committedSnapshot = snapshot
      hasCommittedSnapshot = true
    },
    subscribe: (listener) =>
      source.subscribe((value) => {
        if (!hasCommittedSnapshot || !compare(committedSnapshot, value)) listener(value)
      }),
  }
}
//#endregion
//#region node_modules/.pnpm/@tanstack+react-table@9.1.2_d1d1cb6473c28c7e1a20fba9df5bced2/node_modules/@tanstack/react-table/dist/reactivity.js
/**
 * Creates the table-core reactivity bindings used by the React adapter.
 *
 * React stores table state in TanStack Store atoms and leaves options as plain
 * resolved data because `useTable` synchronizes options during render. The
 * render-phase preset supplies the live readonly-atom facades and the `commit`
 * hook; the store primitives are passed in from `@tanstack/react-store` so all
 * atoms share one store instance with user-provided external atoms.
 */
function reactReactivity() {
  return renderPhaseReactivity({
    createAtom,
    batch,
  })
}
//#endregion
//#region node_modules/.pnpm/@tanstack+table-core@9.1.2/node_modules/@tanstack/table-core/dist/utils.js
/**
 * Applies a TanStack updater to a value.
 *
 * If the updater is a function it is called with the previous value; otherwise the updater value is returned directly.
 */
function functionalUpdate(updater, input) {
  return typeof updater === "function" ? updater(input) : updater
}
/**
 * Clones table state values while preserving non-plain objects.
 *
 * Plain objects and arrays are copied recursively so state updates can avoid mutating existing references.
 */
function cloneState(value) {
  if (Array.isArray(value)) return value.map(cloneState)
  if (value && typeof value === "object") {
    const proto = Object.getPrototypeOf(value)
    if (proto !== Object.prototype && proto !== null) return value
    const copy = proto === null ? makeObjectMap() : {}
    const keys = Object.keys(value)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      Object.defineProperty(copy, key, {
        configurable: true,
        enumerable: true,
        value: cloneState(value[key]),
        writable: true,
      })
    }
    return copy
  }
  return value
}
/**
 * Copies prototype-instance own properties without carrying over lazy memo
 * closures or the per-row cell cache, both of which are bound to the source
 * instance (cached cells reference the source row).
 */
function copyInstancePropertiesWithoutMemos(target, source) {
  const keys = Object.keys(source)
  const targetRecord = target
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (!key.startsWith("_memo_") && key !== "_cellsCache") targetRecord[key] = source[key]
  }
  return target
}
/**
 * Creates an object intended only for string-keyed dictionary lookups.
 *
 * The null prototype keeps user-controlled ids such as `__proto__` and
 * `hasOwnProperty` as plain data keys.
 */
function makeObjectMap() {
  return Object.create(null)
}
/**
 * Checks whether an object owns a key, including null-prototype dictionaries.
 */
function hasOwn(obj, key) {
  return Object.hasOwn(obj, key)
}
/**
 * Creates a table state updater for a single state slice.
 *
 * The updater writes through the table base atom for the slice and supports both value and functional updater forms.
 */
function makeStateUpdater(key, instance) {
  return (updater) => {
    ;(instance.options.atoms?.[key] ?? instance.baseAtoms[key]).set((old) =>
      functionalUpdate(updater, old),
    )
  }
}
/**
 * Checks whether a value is an array or a plain (or null-prototype) object.
 * Class instances, dates, and other exotic values compare by reference only,
 * mirroring the `cloneState` plain-object policy.
 */
function isPlainContainer(value) {
  if (typeof value !== "object" || value === null) return false
  if (Array.isArray(value)) return true
  const proto = Object.getPrototypeOf(value)
  return proto === Object.prototype || proto === null
}
/**
 * Returns every enumerable own key, including symbols and non-index array
 * properties. Keeping key presence explicit distinguishes sparse array holes
 * from entries whose value is `undefined`.
 */
function getEnumerableOwnKeys(value) {
  return Reflect.ownKeys(value).filter((key) =>
    Object.prototype.propertyIsEnumerable.call(value, key),
  )
}
const MAX_STATE_COMPARE_DEPTH = 3
/**
 * Structurally compares two state slice values as deeply as stock feature
 * state can nest and no deeper.
 *
 * Three container levels cover flat maps and arrays, arrays of state objects,
 * array-valued filter values, and `columnResizing.columnSizingStart` tuples.
 * Deeper containers and non-plain values compare by reference. A `false`
 * result is always safe: the state update simply proceeds.
 */
function stateSlicesEqual(a, b) {
  return stateSlicesEqualAtDepth(a, b, MAX_STATE_COMPARE_DEPTH)
}
function stateSlicesEqualAtDepth(a, b, depth) {
  if (Object.is(a, b)) return true
  if (depth <= 0 || !isPlainContainer(a) || !isPlainContainer(b)) return false
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false
  }
  const keysA = getEnumerableOwnKeys(a)
  const keysB = getEnumerableOwnKeys(b)
  if (keysA.length !== keysB.length) return false
  const recordA = a
  const recordB = b
  for (let i = 0; i < keysA.length; i++) {
    const key = keysA[i]
    if (!Object.prototype.propertyIsEnumerable.call(b, key)) return false
    if (!stateSlicesEqualAtDepth(recordA[key], recordB[key], depth - 1)) return false
  }
  return true
}
/**
 * Routes a state slice update through the slice's `on<State>Change` handler,
 * preserving the owner's current reference for structural no-ops.
 *
 * Equality is evaluated inside the updater received by the state owner, never
 * against the table's potentially stale controlled snapshot. This keeps
 * same-tick updates composable in queued host containers such as React state,
 * evaluates the original updater only when the owner applies it, and lets atom
 * owners suppress notifications by returning their existing reference.
 *
 * A user-provided change handler is still invoked for a no-op because only that
 * handler's state container can know its latest queued value. The guarded
 * updater returns that container's previous reference, preventing a state write
 * or render in state containers with identity bailout semantics.
 *
 * Hot-path slices that skip guarding entirely (selection maps that scale with
 * row count, pointer-frequency resize state) call their change handler
 * directly instead of routing through this util. Custom feature slices with a
 * cheaper or semantic-aware comparison can pass `isEqual` to override the
 * structural default.
 */
function setStateSlice(instance, key, updater, isEqual = stateSlicesEqual) {
  const onChangeKey = `on${key.charAt(0).toUpperCase()}${key.slice(1)}Change`
  const onChange = instance.options[onChangeKey]
  if (!onChange) return
  onChange((current) => {
    const next = functionalUpdate(updater, current)
    return isEqual(current, next) ? current : next
  })
}
/**
 * Returns whether a value is a function.
 */
function isFunction(d) {
  return d instanceof Function
}
/**
 * Flattens a tree of nodes by recursively reading child nodes.
 *
 * The original nodes are preserved in depth-first order.
 */
function flattenBy(arr, getChildren) {
  const flat = []
  const recurse = (subArr) => {
    subArr.forEach((item) => {
      flat.push(item)
      const children = getChildren(item)
      if (children.length > 0) recurse(children)
    })
  }
  recurse(arr)
  return flat
}
/**
 * Creates a dependency-tracked memoized function for table internals.
 *
 * The memo recomputes only when its dependency tuple changes and can emit debug timing information.
 */
const memo = ({ fn, memoDeps, onAfterCompare, onAfterUpdate, onBeforeCompare, onBeforeUpdate }) => {
  let deps = []
  let result
  const memoizedFn = (depArgs) => {
    onBeforeCompare?.()
    const newDeps = memoDeps?.(depArgs)
    let depsChanged = !newDeps || newDeps.length !== deps?.length
    if (!depsChanged && newDeps) {
      for (let i = 0; i < newDeps.length; i++)
        if (newDeps[i] !== deps[i]) {
          depsChanged = true
          break
        }
    }
    onAfterCompare?.(depsChanged)
    if (!depsChanged) return result
    deps = newDeps
    onBeforeUpdate?.()
    result = fn(...(newDeps ?? []))
    onAfterUpdate?.(result)
    return result
  }
  return memoizedFn
}
/**
 * Wraps a callback so that its first invocation is skipped.
 *
 * Row-model `onAfterUpdate` hooks schedule auto-resets when their inputs
 * change. The initial computation of a row model is not a change, so state
 * resets must not fire for it — otherwise merely reading a row model on mount
 * would wipe initial or controlled state.
 */
function skipFirstRun(fn) {
  let hasRun = false
  return () => {
    if (!hasRun) {
      hasRun = true
      return
    }
    fn()
  }
}
/**
 * Creates a table-aware memoized function.
 *
 * This wraps `memo` with table debug options and feature metadata so row models and derived APIs can share consistent diagnostics.
 */
function tableMemo({ feature, fnName, objectId, onAfterUpdate, table, ...memoOptions }) {
  const onAfterUpdateHandler = () => {
    if (!onAfterUpdate) return
    const { schedule, untrack } = table._reactivity
    schedule(() => untrack(() => onAfterUpdate()))
  }
  const debugOptions = {
    onAfterUpdate: () => {
      onAfterUpdateHandler()
    },
  }
  return memo({
    ...memoOptions,
    ...debugOptions,
  })
}
/**
 * Assumes that a function name is in the format of `parentName_fnKey` and returns the `fnKey` and `fnName` in the format of `parentName.fnKey`.
 */
function getFunctionNameInfo(staticFnName, splitBy = "_") {
  const [parentName, fnKey] = staticFnName.split(splitBy)
  return {
    fnKey,
    fnName: `${parentName}.${fnKey}`,
    parentName,
  }
}
/**
 * Assigns Table API methods directly to the table instance.
 * Unlike row/cell/column/header, the table is a singleton so methods are assigned directly.
 */
function assignTableAPIs(feature, table, apis) {
  for (const [staticFnName, { fn, memoDeps }] of Object.entries(apis)) {
    const { fnKey, fnName } = getFunctionNameInfo(staticFnName)
    table[fnKey] = memoDeps
      ? tableMemo({
          memoDeps,
          fn,
          fnName,
          table,
          feature,
        })
      : fn
  }
}
/**
 * Assigns API methods to a prototype object for memory-efficient method sharing.
 * All instances created with this prototype will share the same method references.
 *
 * For memoized methods, the memo state is lazily created and stored on each instance.
 * This provides the best of both worlds: shared method code + per-instance caching.
 */
function assignPrototypeAPIs(feature, prototype, table, apis) {
  for (const [staticFnName, { fn, memoDeps }] of Object.entries(apis)) {
    const { fnKey, fnName } = getFunctionNameInfo(staticFnName)
    if (memoDeps) {
      const memoKey = `_memo_${fnKey}`
      prototype[fnKey] = function (...args) {
        if (!this[memoKey]) {
          const self = this
          this[memoKey] = tableMemo({
            memoDeps: (depArgs) => memoDeps(self, depArgs),
            fn: (...deps) => fn(self, ...deps),
            fnName,
            objectId: self.id,
            table,
            feature,
          })
        }
        return this[memoKey](...args)
      }
    } else
      prototype[fnKey] = function (...args) {
        return fn(this, ...args)
      }
  }
}
/**
 * Looks to run the memoized function with the builder pattern on the object if it exists, otherwise fall back to the static method passed in.
 */
function callMemoOrStaticFn(obj, fnKey, staticFn, ...args) {
  return obj[fnKey]?.(...args) ?? staticFn(obj, ...args)
}
//#endregion
//#region node_modules/.pnpm/@tanstack+table-core@9.1.2/node_modules/@tanstack/table-core/dist/core/cells/coreCellsFeature.utils.js
/**
 * Reads this cell's accessor value from its owning row and column.
 *
 * This is the standalone implementation behind `cell.getValue()`, useful when
 * importing static APIs instead of calling methods from the cell prototype.
 *
 * @example
 * ```ts
 * const value = cell_getValue(cell)
 * ```
 */
function cell_getValue(cell) {
  return cell.row.getValue(cell.column.id)
}
/**
 * Reads the value that should be rendered for this cell.
 *
 * Nullish accessor values are replaced with `table.options.renderFallbackValue`,
 * matching the behavior of `cell.renderValue()`.
 *
 * @example
 * ```ts
 * const rendered = cell_renderValue(cell)
 * ```
 */
function cell_renderValue(cell) {
  return cell.getValue() ?? cell.table.options.renderFallbackValue
}
/**
 * Builds the render context passed to a column's `cell` template.
 *
 * The returned object includes stable references to the table, row, column, and
 * cell, plus bound `getValue` and `renderValue` helpers for render functions.
 *
 * @example
 * ```ts
 * const context = cell_getContext(cell)
 * ```
 */
function cell_getContext(cell) {
  return {
    table: cell.table,
    column: cell.column,
    row: cell.row,
    cell,
    getValue: () => cell.getValue(),
    renderValue: () => cell.renderValue(),
  }
}
//#endregion
//#region node_modules/.pnpm/@tanstack+table-core@9.1.2/node_modules/@tanstack/table-core/dist/core/cells/coreCellsFeature.js
/**
 * Core feature that adds cell value, render, and context APIs.
 */
const coreCellsFeature = {
  assignCellPrototype: (prototype, table) => {
    assignPrototypeAPIs("coreCellsFeature", prototype, table, {
      cell_getValue: { fn: (cell) => cell_getValue(cell) },
      cell_renderValue: { fn: (cell) => cell_renderValue(cell) },
      cell_getContext: {
        fn: (cell) => cell_getContext(cell),
        memoDeps: (cell) => [cell],
      },
    })
  },
}
//#endregion
//#region node_modules/.pnpm/@tanstack+table-core@9.1.2/node_modules/@tanstack/table-core/dist/core/headers/constructHeader.js
/**
 * Creates or retrieves the header prototype for a table.
 * The prototype is cached on the table and shared by all header instances.
 */
function getHeaderPrototype(table) {
  if (!table._headerPrototype) {
    table._headerPrototype = { table }
    const features = Object.values(table._features)
    for (let i = 0; i < features.length; i++)
      features[i].assignHeaderPrototype?.(table._headerPrototype, table)
  }
  return table._headerPrototype
}
/**
 * Constructs a header instance from normalized table internals.
 *
 * This wires core properties, feature prototype APIs, and instance data used by table rendering and row-model operations.
 */
function constructHeader(table, column, options) {
  const headerPrototype = getHeaderPrototype(table)
  const header = Object.create(headerPrototype)
  header.colSpan = 0
  header.column = column
  header.depth = options.depth
  header.headerGroup = null
  header.id = options.id ?? column.id
  header.index = options.index
  header.isPlaceholder = Boolean(options.isPlaceholder)
  header.placeholderId = options.placeholderId
  header.rowSpan = 0
  header.subHeaders = []
  const initFns = table._headerInstanceInitFns
  for (let i = 0; i < initFns.length; i++) initFns[i](header)
  return header
}
//#endregion
//#region node_modules/.pnpm/@tanstack+table-core@9.1.2/node_modules/@tanstack/table-core/dist/features/column-pinning/columnPinningFeature.utils.js
/**
 * Creates the default column pinning state.
 *
 * Both pinning regions start empty. Reset APIs use this value when
 * `defaultState` is `true`.
 *
 * @example
 * ```ts
 * const pinning = getDefaultColumnPinningState()
 * ```
 */
function getDefaultColumnPinningState() {
  return {
    start: [],
    end: [],
  }
}
//#endregion
//#region node_modules/.pnpm/@tanstack+table-core@9.1.2/node_modules/@tanstack/table-core/dist/features/column-visibility/columnVisibilityFeature.utils.js
/**
 * Checks whether this column is visible.
 *
 * Leaf columns read `state.columnVisibility[column.id]`, where missing entries
 * default to visible. Parent columns are visible when at least one child column
 * is visible.
 *
 * @example
 * ```ts
 * const visible = column_getIsVisible(column)
 * ```
 */
function column_getIsVisible(column) {
  const columnVisibility = column.table.atoms.columnVisibility?.get()
  if (!columnVisibility) return true
  const childColumns = column.columns
  if (childColumns.length > 0)
    return childColumns.some((childColumn) =>
      callMemoOrStaticFn(childColumn, "getIsVisible", column_getIsVisible),
    )
  return (hasOwn(columnVisibility, column.id) ? columnVisibility[column.id] : void 0) ?? true
}
/**
 * Filters leaf columns down to those currently visible.
 *
 * This is the column list most row rendering code uses before pinning-specific
 * partitioning.
 *
 * @example
 * ```ts
 * const columns = table_getVisibleLeafColumns(table)
 * ```
 */
function table_getVisibleLeafColumns(table) {
  return table
    .getAllLeafColumns()
    .filter((column) => callMemoOrStaticFn(column, "getIsVisible", column_getIsVisible))
}
//#endregion
//#region node_modules/.pnpm/@tanstack+table-core@9.1.2/node_modules/@tanstack/table-core/dist/core/headers/buildHeaderGroups.js
function getMaxHeaderDepth(columns, depth = 1) {
  let maxDepth = depth
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i]
    if (
      callMemoOrStaticFn(column, "getIsVisible", column_getIsVisible) &&
      column.columns.length > 0
    )
      maxDepth = Math.max(maxDepth, getMaxHeaderDepth(column.columns, depth + 1))
  }
  return maxDepth
}
function formatHeaderGroupId(headerFamily, depth) {
  return headerFamily ? `${headerFamily}_${depth}` : String(depth)
}
function formatHeaderId(headerFamily, depth, columnId, childHeaderId) {
  let id = headerFamily ?? ""
  if (depth) id = id ? `${id}_${depth}` : String(depth)
  if (columnId) id = id ? `${id}_${columnId}` : columnId
  if (childHeaderId) id = id ? `${id}_${childHeaderId}` : childHeaderId
  return id
}
function countPendingHeadersForColumn(headers, column) {
  let count = 0
  for (let i = 0; i < headers.length; i++) if (headers[i].column === column) count++
  return count
}
function constructHeaderGroup(
  headersToGroup,
  depth,
  table,
  headerFamily,
  headerGroups,
  headerGroupInitFns,
) {
  const headerGroup = {
    depth,
    id: formatHeaderGroupId(headerFamily, depth),
    headers: [],
  }
  const pendingParentHeaders = []
  for (let i = 0; i < headersToGroup.length; i++) {
    if (!(i in headersToGroup)) continue
    const headerToGroup = headersToGroup[i]
    const latestPendingParentHeader = pendingParentHeaders.at(-1)
    const isLeafHeader = headerToGroup.column.depth === headerGroup.depth
    let column
    let isPlaceholder = false
    if (isLeafHeader && headerToGroup.column.parent) column = headerToGroup.column.parent
    else {
      column = headerToGroup.column
      isPlaceholder = true
    }
    if (latestPendingParentHeader && latestPendingParentHeader.column === column)
      latestPendingParentHeader.subHeaders.push(headerToGroup)
    else {
      const header = constructHeader(table, column, {
        id: formatHeaderId(headerFamily, depth, column.id, headerToGroup.id),
        isPlaceholder,
        placeholderId: isPlaceholder
          ? String(countPendingHeadersForColumn(pendingParentHeaders, column))
          : void 0,
        depth,
        index: pendingParentHeaders.length,
      })
      header.subHeaders.push(headerToGroup)
      pendingParentHeaders.push(header)
    }
    headerGroup.headers.push(headerToGroup)
    headerToGroup.headerGroup = headerGroup
  }
  for (let i = 0; i < headerGroupInitFns.length; i++) headerGroupInitFns[i](headerGroup)
  headerGroups.push(headerGroup)
  if (depth > 0)
    constructHeaderGroup(
      pendingParentHeaders,
      depth - 1,
      table,
      headerFamily,
      headerGroups,
      headerGroupInitFns,
    )
}
function updateHeaderSpans(headers) {
  for (let i = 0; i < headers.length; i++) {
    const header = headers[i]
    if (!callMemoOrStaticFn(header.column, "getIsVisible", column_getIsVisible)) continue
    let colSpan = 0
    if (header.subHeaders.length > 0) {
      updateHeaderSpans(header.subHeaders)
      for (let j = 0; j < header.subHeaders.length; j++) {
        const child = header.subHeaders[j]
        if (!callMemoOrStaticFn(child.column, "getIsVisible", column_getIsVisible)) continue
        colSpan += child.colSpan
      }
    } else colSpan = 1
    header.colSpan = colSpan
    if (
      header.isPlaceholder &&
      header.subHeaders.length === 1 &&
      header.subHeaders[0].column === header.column
    ) {
      let rowSpan = 1
      let chainChild = header.subHeaders[0]
      while (chainChild) {
        chainChild.rowSpan = 0
        rowSpan++
        chainChild =
          chainChild.subHeaders.length === 1 && chainChild.subHeaders[0].column === header.column
            ? chainChild.subHeaders[0]
            : void 0
      }
      header.rowSpan = rowSpan
    } else header.rowSpan = 1
  }
}
/**
 * Builds the nested header group structure for a table.
 *
 * The result accounts for visible leaf columns, pinned column groups, and placeholder headers needed to render multi-level headers.
 */
function buildHeaderGroups(allColumns, columnsToGroup, table, headerFamily) {
  const maxDepth = getMaxHeaderDepth(allColumns)
  const headerGroups = []
  const headerGroupInitFns = table._headerGroupInstanceInitFns
  const bottomHeaders = new Array(columnsToGroup.length)
  for (let i = 0; i < columnsToGroup.length; i++) {
    if (!(i in columnsToGroup)) continue
    bottomHeaders[i] = constructHeader(table, columnsToGroup[i], {
      depth: maxDepth,
      index: i,
    })
  }
  constructHeaderGroup(
    bottomHeaders,
    maxDepth - 1,
    table,
    headerFamily,
    headerGroups,
    headerGroupInitFns,
  )
  headerGroups.reverse()
  updateHeaderSpans(headerGroups[0]?.headers ?? [])
  return headerGroups
}
//#endregion
//#region node_modules/.pnpm/@tanstack+table-core@9.1.2/node_modules/@tanstack/table-core/dist/core/columns/constructColumn.js
/**
 * Creates or retrieves the column prototype for a table.
 * The prototype is cached on the table and shared by all column instances.
 */
function getColumnPrototype(table) {
  if (!table._columnPrototype) {
    table._columnPrototype = { table }
    const features = Object.values(table._features)
    for (let i = 0; i < features.length; i++)
      features[i].assignColumnPrototype?.(table._columnPrototype, table)
  }
  return table._columnPrototype
}
/**
 * Constructs a column instance from normalized table internals.
 *
 * This wires core properties, feature prototype APIs, and instance data used by table rendering and row-model operations.
 */
function constructColumn(table, columnDef, depth, parent) {
  const resolvedColumnDef = {
    ...table.getDefaultColumnDef(),
    ...columnDef,
  }
  const accessorKey = resolvedColumnDef.accessorKey
  const accessorKeyString = accessorKey === void 0 ? void 0 : String(accessorKey)
  const id =
    resolvedColumnDef.id ??
    accessorKeyString?.replaceAll(".", "_") ??
    (typeof resolvedColumnDef.header === "string" ? resolvedColumnDef.header : void 0)
  let accessorFn
  if (resolvedColumnDef.accessorFn) accessorFn = resolvedColumnDef.accessorFn
  else if (accessorKey !== void 0)
    if (typeof accessorKey === "string" && accessorKey.includes(".")) {
      const keys = accessorKey.split(".")
      accessorFn = (originalRow) => {
        let result = originalRow
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i]
          result = result?.[key]
        }
        return result
      }
    } else accessorFn = (originalRow) => originalRow[resolvedColumnDef.accessorKey]
  if (!id) throw new Error()
  const columnPrototype = getColumnPrototype(table)
  const column = Object.create(columnPrototype)
  column.accessorFn = accessorFn
  column.columnDef = resolvedColumnDef
  column.columns = []
  column.depth = depth
  column.id = `${String(id)}`
  column.parent = parent
  const initFns = table._columnInstanceInitFns
  for (let i = 0; i < initFns.length; i++) initFns[i](column)
  return column
}
//#endregion
//#region node_modules/.pnpm/@tanstack+table-core@9.1.2/node_modules/@tanstack/table-core/dist/features/column-ordering/columnOrderingFeature.utils.js
/**
 * Creates the ordering function used to arrange leaf columns.
 *
 * The returned function applies `state.columnOrder`, preserves unspecified
 * columns in their original order, then delegates to grouping rules.
 *
 * @example
 * ```ts
 * const orderColumnsForTable = table_getOrderColumnsFn(table)
 * ```
 */
function table_getOrderColumnsFn(table) {
  const columnOrder = table.atoms.columnOrder?.get()
  return (columns) => {
    let orderedColumns = []
    if (!columnOrder?.length) orderedColumns = columns
    else {
      const remaining = /* @__PURE__ */ new Map()
      for (let i = 0; i < columns.length; i++) {
        const column = columns[i]
        remaining.set(column.id, column)
      }
      for (let i = 0; i < columnOrder.length; i++) {
        const id = columnOrder[i]
        const column = remaining.get(id)
        if (column) {
          orderedColumns.push(column)
          remaining.delete(id)
        }
      }
      for (let i = 0; i < columns.length; i++) {
        const column = columns[i]
        if (remaining.has(column.id)) orderedColumns.push(column)
      }
    }
    return orderColumns(table, orderedColumns)
  }
}
/**
 * Applies grouped-column placement rules to an already ordered leaf-column list.
 *
 * `groupedColumnMode: 'remove'` drops grouped columns from the list.
 * `groupedColumnMode: 'reorder'` moves grouped columns to the front in grouping
 * state order.
 *
 * @example
 * ```ts
 * const orderedColumns = orderColumns(table, leafColumns)
 * ```
 */
function orderColumns(table, leafColumns) {
  const grouping = table.atoms.grouping?.get() ?? []
  const { groupedColumnMode } = table.options
  if (grouping.length === 0 || !groupedColumnMode) return leafColumns
  const nonGroupingColumns = leafColumns.filter((col) => !grouping.includes(col.id))
  if (groupedColumnMode === "remove") return nonGroupingColumns
  const leafColumnsById = /* @__PURE__ */ new Map()
  for (let i = 0; i < leafColumns.length; i++) {
    const col = leafColumns[i]
    leafColumnsById.set(col.id, col)
  }
  const groupingColumns = []
  for (let i = 0; i < grouping.length; i++) {
    const col = leafColumnsById.get(grouping[i])
    if (col) groupingColumns.push(col)
  }
  return [...groupingColumns, ...nonGroupingColumns]
}
//#endregion
//#region node_modules/.pnpm/@tanstack+table-core@9.1.2/node_modules/@tanstack/table-core/dist/core/columns/coreColumnsFeature.utils.js
/**
 * Flattens this column and every descendant column into a single array.
 *
 * Group columns appear before their child columns, which matches the normalized
 * column hierarchy produced during table construction.
 *
 * @example
 * ```ts
 * const flatColumns = column_getFlatColumns(column)
 * ```
 */
function column_getFlatColumns(column) {
  return [column, ...column.columns.flatMap((col) => col.getFlatColumns())]
}
/**
 * Collects the terminal leaf columns below this column.
 *
 * Group columns return their ordered descendants. Non-group columns return an
 * array containing only the column itself.
 *
 * @example
 * ```ts
 * const leafColumns = column_getLeafColumns(column)
 * ```
 */
function column_getLeafColumns(column) {
  if (column.columns.length > 0) {
    const leafColumns = column.columns.flatMap((col) => col.getLeafColumns())
    return callMemoOrStaticFn(column.table, "getOrderColumns", table_getOrderColumnsFn)(leafColumns)
  }
  return [column]
}
/**
 * Merges built-in, feature, and user default column definitions.
 *
 * Built-in defaults provide a header and fallback cell renderer, feature
 * defaults can add feature-specific column options, and
 * `options.defaultColumn` wins last.
 *
 * @example
 * ```ts
 * const defaultColumn = table_getDefaultColumnDef(table)
 * ```
 */
function table_getDefaultColumnDef(table) {
  return {
    header: (props) => {
      const resolvedColumnDef = props.header.column.columnDef
      if (resolvedColumnDef.accessorKey) return resolvedColumnDef.accessorKey
      if (resolvedColumnDef.accessorFn) return resolvedColumnDef.id
      return null
    },
    cell: (props) => props.renderValue()?.toString?.() ?? null,
    ...Object.values(table._features).reduce((obj, feature) => {
      return Object.assign(obj, feature.getDefaultColumnDef?.())
    }, {}),
    ...table.options.defaultColumn,
  }
}
function constructColumns(table, columnDefs, parent, depth = 0) {
  const columns = new Array(columnDefs.length)
  for (let i = 0; i < columnDefs.length; i++) {
    if (!(i in columnDefs)) continue
    const columnDef = columnDefs[i]
    const column = constructColumn(table, columnDef, depth, parent)
    const groupingColumnDef = columnDef
    column.columns = groupingColumnDef.columns
      ? constructColumns(table, groupingColumnDef.columns, column, depth + 1)
      : []
    columns[i] = column
  }
  return columns
}
/**
 * Normalizes `options.columns` into the table's nested column tree.
 *
 * Each column definition is constructed with its parent and depth, and group
 * column children are recursively constructed.
 *
 * @example
 * ```ts
 * const columns = table_getAllColumns(table)
 * ```
 */
function table_getAllColumns(table) {
  return constructColumns(table, table.options.columns)
}
/**
 * Flattens every table column, including group columns and leaf columns.
 *
 * Use this when parent/group columns must be included in addition to data leaf
 * columns.
 *
 * @example
 * ```ts
 * const flatColumns = table_getAllFlatColumns(table)
 * ```
 */
function table_getAllFlatColumns(table) {
  return table.getAllColumns().flatMap((column) => column.getFlatColumns())
}
/**
 * Builds an id lookup for every flat column in the table.
 *
 * Group columns and leaf columns are included. Later columns with the same id
 * replace earlier entries.
 *
 * @example
 * ```ts
 * const columnsById = table_getAllFlatColumnsById(table)
 * ```
 */
function table_getAllFlatColumnsById(table) {
  const result = makeObjectMap()
  const flatColumns = table.getAllFlatColumns()
  for (let i = 0; i < flatColumns.length; i++) {
    const column = flatColumns[i]
    result[column.id] = column
  }
  return result
}
/**
 * Collects all terminal leaf columns in their current table order.
 *
 * Column ordering features can reorder the collected leaves before the result
 * is returned.
 *
 * @example
 * ```ts
 * const leafColumns = table_getAllLeafColumns(table)
 * ```
 */
function table_getAllLeafColumns(table) {
  const leafColumns = table.getAllColumns().flatMap((c) => c.getLeafColumns())
  return callMemoOrStaticFn(table, "getOrderColumns", table_getOrderColumnsFn)(leafColumns)
}
/**
 * Builds an id lookup for terminal leaf columns only.
 *
 * Parent/group columns are excluded, making this lookup appropriate for row
 * cells and feature state keyed by data columns.
 *
 * @example
 * ```ts
 * const leavesById = table_getAllLeafColumnsById(table)
 * ```
 */
function table_getAllLeafColumnsById(table) {
  const result = makeObjectMap()
  const leafColumns = table.getAllLeafColumns()
  for (let i = 0; i < leafColumns.length; i++) {
    const column = leafColumns[i]
    result[column.id] = column
  }
  return result
}
/**
 * Looks up a column by id from the flat column map.
 *
 * The lookup can return group columns or leaf columns. In development, a
 * missing id logs a warning to help catch stale column references.
 *
 * @example
 * ```ts
 * const column = table_getColumn(table, 'firstName')
 * ```
 */
function table_getColumn(table, columnId) {
  return table.getAllFlatColumnsById()[columnId]
}
//#endregion
//#region node_modules/.pnpm/@tanstack+table-core@9.1.2/node_modules/@tanstack/table-core/dist/core/columns/coreColumnsFeature.js
/**
 * Core feature that builds the column tree and exposes table/column APIs.
 */
const coreColumnsFeature = {
  assignColumnPrototype: (prototype, table) => {
    assignPrototypeAPIs("coreColumnsFeature", prototype, table, {
      column_getFlatColumns: {
        fn: (column) => column_getFlatColumns(column),
        memoDeps: (column) => [column.table.options.columns],
      },
      column_getLeafColumns: {
        fn: (column) => column_getLeafColumns(column),
        memoDeps: (column) => [
          column.table.atoms.columnOrder?.get(),
          column.table.atoms.grouping?.get(),
          column.table.options.columns,
          column.table.options.groupedColumnMode,
        ],
      },
    })
  },
  constructTableAPIs: (table) => {
    assignTableAPIs("coreColumnsFeature", table, {
      table_getDefaultColumnDef: {
        fn: () => table_getDefaultColumnDef(table),
        memoDeps: () => [table.options.defaultColumn],
      },
      table_getAllColumns: {
        fn: () => table_getAllColumns(table),
        memoDeps: () => [table.options.columns],
      },
      table_getAllFlatColumns: {
        fn: () => table_getAllFlatColumns(table),
        memoDeps: () => [table.options.columns],
      },
      table_getAllFlatColumnsById: {
        fn: () => table_getAllFlatColumnsById(table),
        memoDeps: () => [table.options.columns],
      },
      table_getAllLeafColumns: {
        fn: () => table_getAllLeafColumns(table),
        memoDeps: () => [
          table.atoms.columnOrder?.get(),
          table.atoms.grouping?.get(),
          table.options.columns,
          table.options.groupedColumnMode,
        ],
      },
      table_getAllLeafColumnsById: {
        fn: () => table_getAllLeafColumnsById(table),
        memoDeps: () => [table.getAllLeafColumns()],
      },
      table_getColumn: { fn: (columnId) => table_getColumn(table, columnId) },
    })
  },
}
//#endregion
//#region node_modules/.pnpm/@tanstack+table-core@9.1.2/node_modules/@tanstack/table-core/dist/core/headers/coreHeadersFeature.utils.js
function collectLeafHeaders(header, leafHeaders) {
  for (let i = 0; i < header.subHeaders.length; i++)
    collectLeafHeaders(header.subHeaders[i], leafHeaders)
  leafHeaders.push(header)
}
/**
 * Walks a header tree and collects all descendant leaf headers.
 *
 * The header itself is included after its descendants, matching the recursive
 * shape used by nested header groups.
 *
 * @example
 * ```ts
 * const leafHeaders = header_getLeafHeaders(header)
 * ```
 */
function header_getLeafHeaders(header) {
  const leafHeaders = []
  collectLeafHeaders(header, leafHeaders)
  return leafHeaders
}
/**
 * Builds the render context passed to a column's `header` or `footer` template.
 *
 * The context contains the header, its column, and the owning table instance.
 *
 * @example
 * ```ts
 * const context = header_getContext(header)
 * ```
 */
function header_getContext(header) {
  return {
    column: header.column,
    header,
    table: header.column.table,
  }
}
/**
 * Builds visible header groups for the current column tree.
 *
 * Column visibility and pinning are applied before groups are built. When no
 * columns are pinned, the fast path skips pin partitioning.
 *
 * @example
 * ```ts
 * const headerGroups = table_getHeaderGroups(table)
 * ```
 */
function table_getHeaderGroups(table) {
  const { start, end } = table.atoms.columnPinning?.get() ?? getDefaultColumnPinningState()
  const allColumns = table.getAllColumns()
  const leafColumns = callMemoOrStaticFn(
    table,
    "getVisibleLeafColumns",
    table_getVisibleLeafColumns,
  )
  if (start.length === 0 && end.length === 0)
    return buildHeaderGroups(allColumns, leafColumns, table)
  const leafColumnsById = table.getAllLeafColumnsById()
  const leftColumns = []
  for (let i = 0; i < start.length; i++) {
    const column = leafColumnsById[start[i]]
    if (column && callMemoOrStaticFn(column, "getIsVisible", column_getIsVisible))
      leftColumns.push(column)
  }
  const rightColumns = []
  for (let i = 0; i < end.length; i++) {
    const column = leafColumnsById[end[i]]
    if (column && callMemoOrStaticFn(column, "getIsVisible", column_getIsVisible))
      rightColumns.push(column)
  }
  const centerColumns = leafColumns.filter(
    (column) => !start.includes(column.id) && !end.includes(column.id),
  )
  return buildHeaderGroups(allColumns, [...leftColumns, ...centerColumns, ...rightColumns], table)
}
/**
 * Builds footer groups by reversing the current header groups.
 *
 * Footer rendering uses the same header objects and grouping structure, but
 * renders them from leaf level back toward the root.
 *
 * @example
 * ```ts
 * const footerGroups = table_getFooterGroups(table)
 * ```
 */
function table_getFooterGroups(table) {
  return [...table.getHeaderGroups()].reverse()
}
/**
 * Flattens every header from every header group into one array.
 *
 * The result includes parent headers and placeholder headers, in header-group
 * order from top to bottom.
 *
 * @example
 * ```ts
 * const flatHeaders = table_getFlatHeaders(table)
 * ```
 */
function table_getFlatHeaders(table) {
  const headerGroups = table.getHeaderGroups()
  const result = []
  for (let i = 0; i < headerGroups.length; i++) {
    const headers = headerGroups[i].headers
    for (let j = 0; j < headers.length; j++) result.push(headers[j])
  }
  return result
}
/**
 * Collects only the leaf headers from the current header tree.
 *
 * Parent/group headers are skipped, making the result suitable for rendering
 * one header per visible leaf column.
 *
 * @example
 * ```ts
 * const leafHeaders = table_getLeafHeaders(table)
 * ```
 */
function table_getLeafHeaders(table) {
  const topHeaders = table.getHeaderGroups()[0]?.headers ?? []
  const result = []
  for (let i = 0; i < topHeaders.length; i++) {
    const leafHeaders = topHeaders[i].getLeafHeaders()
    for (let j = 0; j < leafHeaders.length; j++) result.push(leafHeaders[j])
  }
  return result
}
//#endregion
//#region node_modules/.pnpm/@tanstack+table-core@9.1.2/node_modules/@tanstack/table-core/dist/core/headers/coreHeadersFeature.js
/**
 * Core feature that builds header groups and exposes header context APIs.
 */
const coreHeadersFeature = {
  assignHeaderPrototype: (prototype, table) => {
    assignPrototypeAPIs("coreHeadersFeature", prototype, table, {
      header_getLeafHeaders: {
        fn: (header) => header_getLeafHeaders(header),
        memoDeps: (header) => [header.column.table.options.columns],
      },
      header_getContext: {
        fn: (header) => header_getContext(header),
        memoDeps: (header) => [header.column.table.options.columns],
      },
    })
  },
  constructTableAPIs: (table) => {
    assignTableAPIs("coreHeadersFeature", table, {
      table_getHeaderGroups: {
        fn: () => table_getHeaderGroups(table),
        memoDeps: () => [
          table.options.columns,
          table.atoms.columnOrder?.get(),
          table.atoms.grouping?.get(),
          table.atoms.columnPinning?.get(),
          table.atoms.columnVisibility?.get(),
          table.options.groupedColumnMode,
        ],
      },
      table_getFooterGroups: {
        fn: () => table_getFooterGroups(table),
        memoDeps: () => [table.getHeaderGroups()],
      },
      table_getFlatHeaders: {
        fn: () => table_getFlatHeaders(table),
        memoDeps: () => [table.getHeaderGroups()],
      },
      table_getLeafHeaders: {
        fn: () => table_getLeafHeaders(table),
        memoDeps: () => [table.getHeaderGroups()],
      },
    })
  },
}
//#endregion
//#region node_modules/.pnpm/@tanstack+table-core@9.1.2/node_modules/@tanstack/table-core/dist/core/rows/constructRow.js
/**
 * Creates or retrieves the row prototype for a table.
 * The prototype is cached on the table and shared by all row instances.
 */
function getRowPrototype(table) {
  if (!table._rowPrototype) {
    table._rowPrototype = { table }
    const features = Object.values(table._features)
    for (let i = 0; i < features.length; i++)
      features[i].assignRowPrototype?.(table._rowPrototype, table)
  }
  return table._rowPrototype
}
/**
 * Constructs a row instance from normalized table internals.
 *
 * This wires core properties, feature prototype APIs, and instance data used by table rendering and row-model operations.
 */
const constructRow = (table, id, original, rowIndex, depth, subRows, parentId) => {
  const rowPrototype = getRowPrototype(table)
  const row = Object.create(rowPrototype)
  row._displayIndexCache = -1
  row._uniqueValuesCache = makeObjectMap()
  row._valuesCache = makeObjectMap()
  row.depth = depth
  row.id = id
  row.index = rowIndex
  row.original = original
  row.parentId = parentId
  row.subRows = subRows ?? []
  const initFns = table._rowInstanceInitFns
  for (let i = 0; i < initFns.length; i++) initFns[i](row)
  return row
}
//#endregion
//#region node_modules/.pnpm/@tanstack+table-core@9.1.2/node_modules/@tanstack/table-core/dist/features/row-sorting/sortFns.js
/**
 * Regular expression used to split mixed text and numeric chunks.
 *
 * The alphanumeric sort functions use these chunks for natural sorting of
 * strings like `item2` before `item10`.
 */
const reSplitAlphaNumeric = /([0-9]+)/gm
/**
 * Builds a `SortFn` from a value-level comparator plus an optional
 * `resolveDataValue` normalizer.
 *
 * The `sort` comparator receives both rows' data values, each already passed
 * through `resolveDataValue` when one is defined. Keeping normalization in the
 * resolver means a variant of an existing sorting function only has to swap
 * the resolver, not re-implement the comparison.
 *
 * The definition is attached to the returned function, so a variant can be
 * created by spreading a built-in sorting function and overriding what
 * differs:
 *
 * ```ts
 * const stripDiacritics = (value: string) =>
 *   value.normalize('NFD').replace(/\p{Diacritic}/gu, '')
 *
 * const alphanumericIgnoreDiacritics = constructSortFn({
 *   ...sortFn_alphanumeric,
 *   resolveDataValue: (value) =>
 *     stripDiacritics(sortFn_alphanumeric.resolveDataValue!(value)),
 * })
 * ```
 */
function constructSortFn(def) {
  const sortFn = Object.assign((rowA, rowB, columnId) => {
    let dataValueA = rowA.getValue(columnId)
    let dataValueB = rowB.getValue(columnId)
    const resolveDataValue = sortFn.resolveDataValue
    if (resolveDataValue) {
      dataValueA = resolveDataValue(dataValueA)
      dataValueB = resolveDataValue(dataValueB)
    }
    return sortFn.sort(dataValueA, dataValueB, rowA, rowB, columnId)
  }, def)
  return sortFn
}
constructSortFn({
  resolveDataValue: (dataValue) => toString(dataValue).toLowerCase(),
  sort: (dataValueA, dataValueB) => compareAlphanumeric(dataValueA, dataValueB),
})
constructSortFn({
  resolveDataValue: (dataValue) => toString(dataValue),
  sort: (dataValueA, dataValueB) => compareAlphanumeric(dataValueA, dataValueB),
})
/**
 * Sorts rows with the built-in text strategy.
 *
 * This comparator returns ascending-order results; descending order is applied by the sorting row model.
 */
const sortFn_text = constructSortFn({
  resolveDataValue: (dataValue) => toString(dataValue).toLowerCase(),
  sort: (dataValueA, dataValueB) => compareBasic(dataValueA, dataValueB),
})
constructSortFn({
  resolveDataValue: (dataValue) => toString(dataValue),
  sort: (dataValueA, dataValueB) => compareBasic(dataValueA, dataValueB),
})
constructSortFn({
  resolveDataValue: (dataValue) => toDateSortValue(dataValue),
  sort: (dataValueA, dataValueB) =>
    dataValueA > dataValueB ? 1 : dataValueA < dataValueB ? -1 : 0,
})
/**
 * Sorts rows with the built-in basic strategy.
 *
 * This comparator returns ascending-order results; descending order is applied by the sorting row model.
 */
const sortFn_basic = constructSortFn({
  sort: (dataValueA, dataValueB) => compareBasic(dataValueA, dataValueB),
})
function compareBasic(a, b) {
  return a === b ? 0 : a > b ? 1 : -1
}
function toDateSortValue(value) {
  return value instanceof Date ? value.getTime() : value
}
function toString(a) {
  if (typeof a === "number") {
    if (isNaN(a) || a === Infinity || a === -Infinity) return ""
    return String(a)
  }
  if (typeof a === "string") return a
  return ""
}
function compareAlphanumeric(aStr, bStr) {
  let ai = 0
  let bi = 0
  const aLen = aStr.length
  const bLen = bStr.length
  while (ai < aLen && bi < bLen) {
    const aIsNumeric = isDigit(aStr.charCodeAt(ai))
    const bIsNumeric = isDigit(bStr.charCodeAt(bi))
    const aEnd = findChunkEnd(aStr, ai, aIsNumeric)
    const bEnd = findChunkEnd(bStr, bi, bIsNumeric)
    if (!aIsNumeric && !bIsNumeric) {
      const stringComparison = compareStringChunks(aStr, ai, aEnd, bStr, bi, bEnd)
      if (stringComparison) return stringComparison
      ai = aEnd
      bi = bEnd
      continue
    }
    if (aIsNumeric !== bIsNumeric) return aIsNumeric ? 1 : -1
    const numericComparison = compareNumericChunks(aStr, ai, aEnd, bStr, bi, bEnd)
    if (numericComparison) return numericComparison
    ai = aEnd
    bi = bEnd
  }
  return countRemainingChunks(aStr, ai) - countRemainingChunks(bStr, bi)
}
function isDigit(charCode) {
  return charCode >= 48 && charCode <= 57
}
function findChunkEnd(str, start, isNumeric) {
  let end = start + 1
  while (end < str.length && isDigit(str.charCodeAt(end)) === isNumeric) end++
  return end
}
function compareStringChunks(aStr, aStart, aEnd, bStr, bStart, bEnd) {
  const aLength = aEnd - aStart
  const bLength = bEnd - bStart
  const minLength = aLength < bLength ? aLength : bLength
  for (let i = 0; i < minLength; i++) {
    const aCode = aStr.charCodeAt(aStart + i)
    const bCode = bStr.charCodeAt(bStart + i)
    if (aCode > bCode) return 1
    if (bCode > aCode) return -1
  }
  if (aLength > bLength) return 1
  if (bLength > aLength) return -1
  return 0
}
function compareNumericChunks(aStr, aStart, aEnd, bStr, bStart, bEnd) {
  let aSignificantStart = aStart
  while (aSignificantStart < aEnd && aStr.charCodeAt(aSignificantStart) === 48) aSignificantStart++
  let bSignificantStart = bStart
  while (bSignificantStart < bEnd && bStr.charCodeAt(bSignificantStart) === 48) bSignificantStart++
  const aSignificantLength = aEnd - aSignificantStart
  const bSignificantLength = bEnd - bSignificantStart
  if (aSignificantLength === 0 && bSignificantLength === 0) return 0
  if (aSignificantLength <= 15 && bSignificantLength <= 15) {
    const an = parseSmallInt(aStr, aSignificantStart, aEnd)
    const bn = parseSmallInt(bStr, bSignificantStart, bEnd)
    if (an > bn) return 1
    if (bn > an) return -1
    return 0
  }
  const an = parseInt(aStr.slice(aStart, aEnd), 10)
  const bn = parseInt(bStr.slice(bStart, bEnd), 10)
  if (an > bn) return 1
  if (bn > an) return -1
  return 0
}
function parseSmallInt(str, start, end) {
  let result = 0
  for (let i = start; i < end; i++) result = result * 10 + str.charCodeAt(i) - 48
  return result
}
function countRemainingChunks(str, start) {
  let count = 0
  let index = start
  while (index < str.length) {
    count++
    index = findChunkEnd(str, index, isDigit(str.charCodeAt(index)))
  }
  return count
}
//#endregion
//#region node_modules/.pnpm/@tanstack+table-core@9.1.2/node_modules/@tanstack/table-core/dist/features/cell-selection/cellSelectionFeature.utils.js
/**
 * Creates the default cell selection state.
 *
 * The feature default is an empty selection. Reset APIs use this value when
 * `defaultState` is `true`.
 *
 * @example
 * ```ts
 * const selection = getDefaultCellSelectionState()
 * ```
 */
function getDefaultCellSelectionState() {
  return []
}
/**
 * Resets `cellSelection` to the configured initial state or feature default.
 *
 * With no argument, the reset clones `table.initialState.cellSelection` when it
 * exists. Passing `true` ignores initial state and resets to an empty selection.
 *
 * @example
 * ```ts
 * table_resetCellSelection(table, true)
 * ```
 */
function table_resetCellSelection(table, defaultState) {
  setStateSlice(
    table,
    "cellSelection",
    defaultState
      ? getDefaultCellSelectionState()
      : (cloneState(table.initialState.cellSelection) ?? getDefaultCellSelectionState()),
  )
}
/**
 * Schedules a cell selection reset after `data` changes.
 *
 * Ranges are stored as row and column ids, so without this a data swap would
 * leave a selection pointing at rows that no longer exist, or silently
 * re-select cells whenever new data reuses ids. The reset runs when
 * `autoResetAll` or `autoResetCellSelection` allows it, defaulting to on.
 *
 * Resetting to `initialState.cellSelection` rather than to empty means the
 * first row-model computation is a no-op, matching `table_autoResetExpanded`.
 *
 * @example
 * ```ts
 * table_autoResetCellSelection(table)
 * ```
 */
function table_autoResetCellSelection(table) {
  if (!table.atoms.cellSelection) return
  if (table.options.autoResetAll ?? table.options.autoResetCellSelection ?? true)
    table._reactivity.schedule(() => table_resetCellSelection(table))
}
//#endregion
//#region node_modules/.pnpm/@tanstack+table-core@9.1.2/node_modules/@tanstack/table-core/dist/features/row-expanding/rowExpandingFeature.utils.js
/**
 * Schedules an expanded-state reset after row-structure changes.
 *
 * The reset runs when `autoResetAll`, `autoResetExpanded`, or the default
 * client-side expanding behavior allows it. Manual expanding opts out unless
 * the reset options explicitly opt back in.
 *
 * @example
 * ```ts
 * table_autoResetExpanded(table)
 * ```
 */
function table_autoResetExpanded(table) {
  if (!table.atoms.expanded) return
  if (
    table.options.autoResetAll ??
    table.options.autoResetExpanded ??
    !table.options.manualExpanding
  )
    table._reactivity.schedule(() => table_resetExpanded(table))
}
/**
 * Resets `expanded` to the configured initial state or feature default.
 *
 * With no argument, the reset clones `table.initialState.expanded` when it
 * exists. Passing `true` ignores initial state and resets to `{}`.
 *
 * @example
 * ```ts
 * table_resetExpanded(table)
 * table_resetExpanded(table, true)
 * ```
 */
function table_resetExpanded(table, defaultState) {
  const initialExpanded = table.initialState.expanded
  setStateSlice(
    table,
    "expanded",
    defaultState
      ? makeObjectMap()
      : initialExpanded === true
        ? true
        : Object.assign(makeObjectMap(), cloneState(initialExpanded ?? {})),
  )
}
/**
 * Checks whether this row is expanded.
 *
 * `options.getIsRowExpanded` can override state-derived behavior. Otherwise
 * the row is expanded when expanded state is `true` or contains this row id.
 *
 * @example
 * ```ts
 * const expanded = row_getIsExpanded(row)
 * ```
 */
function row_getIsExpanded(row) {
  const expanded = row.table.atoms.expanded?.get() ?? {}
  return Boolean(
    row.table.options.getIsRowExpanded?.(row) ??
    (expanded === true || isExpandedRowId(expanded, row.id)),
  )
}
function isExpandedRowId(expanded, rowId) {
  return Boolean(expanded && expanded !== true && hasOwn(expanded, rowId) && expanded[rowId])
}
//#endregion
//#region node_modules/.pnpm/@tanstack+table-core@9.1.2/node_modules/@tanstack/table-core/dist/features/row-pagination/rowPaginationFeature.utils.js
const defaultPageIndex = 0
const defaultPageSize = 10
/**
 * Creates the default pagination state used by the pagination feature.
 *
 * The feature default starts at the first page with a page size of 10. Reset
 * APIs use this value when `defaultState` is `true`.
 *
 * @example
 * ```ts
 * const pagination = getDefaultPaginationState()
 * ```
 */
function getDefaultPaginationState() {
  return {
    pageIndex: defaultPageIndex,
    pageSize: defaultPageSize,
  }
}
/**
 * Resets the page index when a page-altering change should return to page 0.
 *
 * The reset runs when `autoResetAll`, `autoResetPageIndex`, or the default
 * client-side pagination behavior allows it. Manual pagination opts out unless
 * the reset options explicitly opt back in.
 *
 * @example
 * ```ts
 * table_autoResetPageIndex(table)
 * ```
 */
function table_autoResetPageIndex(table) {
  if (
    table.options.autoResetAll ??
    table.options.autoResetPageIndex ??
    !table.options.manualPagination
  ) {
    if ((table.atoms.pagination?.get()?.pageIndex ?? defaultPageIndex) === defaultPageIndex) return
    table_resetPageIndex(table, true)
  }
}
/**
 * Routes a pagination updater through the table's pagination change handler.
 *
 * The updater may be a next state object or a function of the previous
 * `PaginationState`; controlled state and external atoms observe the same
 * updater path as the instance API.
 *
 * @example
 * ```ts
 * table_setPagination(table, (old) => old)
 * ```
 */
function table_setPagination(table, updater) {
  setStateSlice(table, "pagination", updater)
}
/**
 * Resets `pagination` to the configured initial state or feature default.
 *
 * With no argument, the reset clones `table.initialState.pagination` when it
 * exists. Passing `true` ignores initial state and resets to
 * `{ pageIndex: 0, pageSize: 10 }`.
 *
 * @example
 * ```ts
 * table_resetPagination(table)
 * table_resetPagination(table, true)
 * ```
 */
function table_resetPagination(table, defaultState) {
  table_setPagination(
    table,
    defaultState
      ? getDefaultPaginationState()
      : cloneState(table.initialState.pagination ?? getDefaultPaginationState()),
  )
}
/**
 * Updates `pagination.pageIndex` and clamps it to the known page range.
 *
 * Unknown page counts (`undefined` or `-1`) allow any non-negative page index.
 * Known page counts clamp the index between `0` and `pageCount - 1`.
 *
 * @example
 * ```ts
 * table_setPageIndex(table, (old) => old)
 * ```
 */
function table_setPageIndex(table, updater) {
  table_setPagination(table, (old) => {
    let pageIndex = functionalUpdate(updater, old.pageIndex)
    const maxPageIndex =
      table.options.pageCount === undefined || table.options.pageCount === -1
        ? Number.MAX_SAFE_INTEGER
        : table.options.pageCount - 1
    pageIndex = Math.max(0, Math.min(pageIndex, maxPageIndex))
    return {
      ...old,
      pageIndex,
    }
  })
}
/**
 * Resets only `pagination.pageIndex`.
 *
 * With no argument, the reset uses `table.initialState.pagination?.pageIndex`
 * or `0`. Passing `true` always resets the page index to `0`.
 *
 * @example
 * ```ts
 * table_resetPageIndex(table)
 * table_resetPageIndex(table, true)
 * ```
 */
function table_resetPageIndex(table, defaultState) {
  table_setPageIndex(
    table,
    defaultState
      ? defaultPageIndex
      : (table.initialState.pagination?.pageIndex ?? defaultPageIndex),
  )
}
/**
 * Resets only `pagination.pageSize`.
 *
 * With no argument, the reset uses `table.initialState.pagination?.pageSize`
 * or `10`. Passing `true` always resets the page size to `10`.
 *
 * @example
 * ```ts
 * table_resetPageSize(table)
 * table_resetPageSize(table, true)
 * ```
 */
function table_resetPageSize(table, defaultState) {
  table_setPageSize(
    table,
    defaultState ? defaultPageSize : (table.initialState.pagination?.pageSize ?? defaultPageSize),
  )
}
/**
 * Updates `pagination.pageSize` while preserving the current top row.
 *
 * The new size is clamped to at least `1`, and `pageIndex` is recalculated so
 * the row that was previously at the top of the page remains in view.
 *
 * @example
 * ```ts
 * table_setPageSize(table, (old) => old)
 * ```
 */
function table_setPageSize(table, updater) {
  table_setPagination(table, (old) => {
    const pageSize = Math.max(1, functionalUpdate(updater, old.pageSize))
    const topRowIndex = old.pageSize === Infinity ? 0 : old.pageSize * old.pageIndex
    const pageIndex = pageSize === Infinity ? 0 : Math.floor(topRowIndex / pageSize)
    return {
      ...old,
      pageIndex,
      pageSize,
    }
  })
}
/**
 * Builds the zero-based page indexes available for the current page count.
 *
 * Unknown or empty page counts return an empty array; otherwise the result is
 * `[0, 1, ...pageCount - 1]`.
 *
 * @example
 * ```ts
 * const pageIndexes = table_getPageOptions(table)
 * ```
 */
function table_getPageOptions(table) {
  const pageCount = table_getPageCount(table)
  let pageOptions = []
  if (pageCount && pageCount > 0)
    pageOptions = new Array(pageCount)
      .fill()
      .fill(null)
      .map((_, i) => i)
  return pageOptions
}
/**
 * Checks whether the current page index can move backward.
 *
 * The first page is page index `0`, so only positive page indexes can navigate
 * to a previous page.
 *
 * @example
 * ```ts
 * const canGoBack = table_getCanPreviousPage(table)
 * ```
 */
function table_getCanPreviousPage(table) {
  return (table.atoms.pagination?.get()?.pageIndex ?? 0) > 0
}
/**
 * Checks whether the current page index can move forward.
 *
 * A `pageCount` of `-1` means the caller does not know the total page count, so
 * this returns `true`. A page count of `0` returns `false`.
 *
 * @example
 * ```ts
 * const canGoForward = table_getCanNextPage(table)
 * ```
 */
function table_getCanNextPage(table) {
  const pageIndex = table.atoms.pagination?.get()?.pageIndex ?? defaultPageIndex
  const pageCount = table_getPageCount(table)
  if (pageCount === -1) return true
  if (pageCount === 0) return false
  return pageIndex < pageCount - 1
}
/**
 * Checks whether a known, finite last page exists after the current page.
 *
 * Unknown (`-1`), empty, and non-finite page counts do not have a navigable
 * last page.
 *
 * @example
 * ```ts
 * const canGoToLastPage = table_getCanLastPage(table)
 * ```
 */
function table_getCanLastPage(table) {
  const pageIndex = table.atoms.pagination?.get()?.pageIndex ?? defaultPageIndex
  const pageCount = table_getPageCount(table)
  return Number.isFinite(pageCount) && pageCount > 0 && pageIndex < pageCount - 1
}
/**
 * Moves the table to the previous page.
 *
 * This delegates to `table_setPageIndex` so pagination state ownership and
 * updater semantics remain consistent.
 *
 * @example
 * ```ts
 * table_previousPage(table)
 * ```
 */
function table_previousPage(table) {
  return table_setPageIndex(table, (old) => old - 1)
}
/**
 * Moves the table to the next page.
 *
 * This delegates to `table_setPageIndex` so pagination state ownership and
 * updater semantics remain consistent.
 *
 * @example
 * ```ts
 * table_nextPage(table)
 * ```
 */
function table_nextPage(table) {
  return table_setPageIndex(table, (old) => {
    return old + 1
  })
}
/**
 * Moves the table to the first page.
 *
 * This is a convenience wrapper around `table_setPageIndex(table, 0)`.
 *
 * @example
 * ```ts
 * table_firstPage(table)
 * ```
 */
function table_firstPage(table) {
  return table_setPageIndex(table, 0)
}
/**
 * Moves the table to the last known page.
 *
 * Unknown, empty, and non-finite page counts do not have a navigable last
 * page, so this does nothing for those states.
 *
 * @example
 * ```ts
 * table_lastPage(table)
 * ```
 */
function table_lastPage(table) {
  const pageCount = table_getPageCount(table)
  if (!Number.isFinite(pageCount) || pageCount <= 0) return
  return table_setPageIndex(table, pageCount - 1)
}
/**
 * Resolves the number of pages for the current pagination state.
 *
 * `options.pageCount` wins for manual pagination. Otherwise the value is
 * calculated from `table_getRowCount(table)` and the current `pageSize`.
 *
 * @example
 * ```ts
 * const pages = table_getPageCount(table)
 * ```
 */
function table_getPageCount(table) {
  const configuredPageCount = table.options.pageCount
  if (configuredPageCount != null) return configuredPageCount
  const rowCount = table_getRowCount(table)
  const pageSize = table.atoms.pagination?.get()?.pageSize ?? defaultPageSize
  if (pageSize === Infinity && Number.isFinite(rowCount) && rowCount > 0) return 1
  return Math.ceil(rowCount / pageSize)
}
/**
 * Resolves the total row count used for pagination math.
 *
 * `options.rowCount` wins for manual pagination. Otherwise the count comes
 * from the pre-paginated row model so filtering, grouping, sorting, and
 * expansion are reflected before the page slice is applied.
 *
 * @example
 * ```ts
 * const rows = table_getRowCount(table)
 * ```
 */
function table_getRowCount(table) {
  return table.options.rowCount ?? table.getPrePaginatedRowModel().rows.length
}
//#endregion
//#region node_modules/.pnpm/@tanstack+table-core@9.1.2/node_modules/@tanstack/table-core/dist/features/row-sorting/rowSortingFeature.utils.js
/**
 * Creates the default sorting state.
 *
 * The feature default is an empty array, meaning no columns are sorted. Reset
 * APIs use this value when `defaultState` is `true`.
 *
 * @example
 * ```ts
 * const sorting = getDefaultSortingState()
 * ```
 */
function getDefaultSortingState() {
  return []
}
/**
 * Routes a sorting updater through the table's sorting change handler.
 *
 * The updater may be a next `SortingState` array or a function of the previous
 * sorting state, matching the instance `table.setSorting` behavior. State
 * owners receive an equality-guarded updater so structurally equal sorting
 * values preserve the owner's existing reference.
 *
 * @example
 * ```ts
 * table_setSorting(table, (old) => [...old, { id: 'age', desc: true }])
 * ```
 */
function table_setSorting(table, updater) {
  setStateSlice(table, "sorting", updater)
}
/**
 * Resets `sorting` to the configured initial state or feature default.
 *
 * With no argument, the reset clones `table.initialState.sorting` when it
 * exists. Passing `true` ignores initial state and resets to `[]`.
 *
 * @example
 * ```ts
 * table_resetSorting(table)
 * table_resetSorting(table, true)
 * ```
 */
function table_resetSorting(table, defaultState) {
  table_setSorting(table, defaultState ? [] : cloneState(table.initialState.sorting ?? []))
}
/**
 * Resets sorting after the table data changes when explicitly enabled.
 *
 * Unlike other auto-reset behaviors, sorting is preserved by default. An
 * explicit `autoResetAll` value takes precedence over `autoResetSorting`.
 *
 * @example
 * ```ts
 * table_autoResetSorting(table)
 * ```
 */
function table_autoResetSorting(table) {
  if (!table.atoms.sorting) return
  if (table.options.autoResetAll ?? table.options.autoResetSorting ?? false)
    table_resetSorting(table)
}
/**
 * Chooses a built-in sorting function from sampled filtered row values.
 *
 * Date-like values use `datetime`, mixed text/numeric strings use
 * `alphanumeric`, plain strings use `text`, and unknown values fall back to
 * `basic`.
 *
 * @example
 * ```ts
 * const sortFn = column_getAutoSortFn(column)
 * ```
 */
function column_getAutoSortFn(column) {
  const sortFns = column.table._rowModelFns.sortFns
  const firstRows = column.table.getFilteredRowModel().flatRows.slice(0, 10)
  let sortFnName
  let isString = false
  for (let i = 0; i < firstRows.length; i++) {
    const value = firstRows[i].getValue(column.id)
    if (Object.prototype.toString.call(value) === "[object Date]") {
      sortFnName = "datetime"
      break
    }
    if (typeof value === "string") {
      isString = true
      if (value.split(reSplitAlphaNumeric).length > 1) {
        sortFnName = "alphanumeric"
        break
      }
    }
  }
  if (!sortFnName && isString) sortFnName = "text"
  if (sortFnName) {
    let sortFn = sortFns?.[sortFnName]
    if (!sortFn) {
      if (sortFnName === "alphanumeric") sortFn = sortFns?.text
    }
    if (sortFn) return sortFn
  }
  return sortFn_basic
}
/**
 * Chooses the default first sort direction from sampled filtered row values.
 *
 * The first non-nullish value among the sampled rows decides: string columns
 * start ascending so alphabetical order is natural; other value types (or
 * columns with no non-nullish sample) start descending. Sampling past leading
 * nullish values keeps the toggle cycle stable when sorting or a data swap
 * moves an empty value into the first row.
 *
 * @example
 * ```ts
 * const direction = column_getAutoSortDir(column)
 * ```
 */
function column_getAutoSortDir(column) {
  const firstRows = column.table.getFilteredRowModel().flatRows.slice(0, 10)
  for (let i = 0; i < firstRows.length; i++) {
    const value = firstRows[i].getValue(column.id)
    if (value == null) continue
    return typeof value === "string" ? "asc" : "desc"
  }
  return "desc"
}
/**
 * Resolves the sorting function configured for a column.
 *
 * Function-valued `columnDef.sortFn` is returned directly, `'auto'` delegates
 * to `column_getAutoSortFn`, and string values are looked up in the table's
 * sorting function registry before falling back to `basic`.
 *
 * @example
 * ```ts
 * const sortFn = column_getSortFn(column)
 * ```
 */
function column_getSortFn(column) {
  const sortFns = column.table._rowModelFns.sortFns
  if (isFunction(column.columnDef.sortFn)) return column.columnDef.sortFn
  if (column.columnDef.sortFn === "auto") return column_getAutoSortFn(column)
  return sortFns?.[column.columnDef.sortFn] ?? sortFn_basic
}
/**
 * Applies the next sorting state for this column.
 *
 * The toggle can add, replace, flip, or remove this column's sort entry. Multi
 * sorting respects `enableMultiSort`, `enableMultiRemove`,
 * `maxMultiSortColCount`, and the `multi` argument.
 *
 * @example
 * ```ts
 * column_toggleSorting(column, undefined, true)
 * ```
 */
function column_toggleSorting(column, desc, multi) {
  const nextSortingOrder = column_getNextSortingOrder(
    column,
    multi && column_getCanMultiSort(column),
  )
  const hasManualValue = desc !== undefined
  table_setSorting(column.table, (old) => {
    const existingIndex = old.findIndex((d) => d.id === column.id)
    const existingSorting = existingIndex === -1 ? void 0 : old[existingIndex]
    let newSorting = []
    let sortAction
    const nextDesc = hasManualValue ? desc : nextSortingOrder === "desc"
    const isMultiMode = Boolean(old.length && column_getCanMultiSort(column) && multi)
    if (isMultiMode)
      if (existingSorting) sortAction = "toggle"
      else sortAction = "add"
    else if (existingSorting) sortAction = "toggle"
    else sortAction = "replace"
    if (sortAction === "toggle") {
      if (!hasManualValue) {
        if (!nextSortingOrder) sortAction = "remove"
      }
    }
    if (sortAction === "add") {
      newSorting = [
        ...old,
        {
          id: column.id,
          desc: nextDesc,
        },
      ]
      newSorting.splice(
        0,
        newSorting.length - (column.table.options.maxMultiSortColCount ?? Number.MAX_SAFE_INTEGER),
      )
    } else if (sortAction === "toggle")
      newSorting = isMultiMode
        ? old.map((d) => {
            if (d.id === column.id)
              return {
                ...d,
                desc: nextDesc,
              }
            return d
          })
        : [
            {
              id: column.id,
              desc: nextDesc,
            },
          ]
    else if (sortAction === "remove")
      newSorting = isMultiMode ? old.filter((d) => d.id !== column.id) : []
    else
      newSorting = [
        {
          id: column.id,
          desc: nextDesc,
        },
      ]
    return newSorting
  })
}
/**
 * Resolves the first direction used when this column begins sorting.
 *
 * Column-level `sortDescFirst` wins, then table-level `sortDescFirst`, then the
 * auto direction inferred from sampled values.
 *
 * @example
 * ```ts
 * const firstDirection = column_getFirstSortDir(column)
 * ```
 */
function column_getFirstSortDir(column) {
  return (column.columnDef.sortDescFirst ??
    column.table.options.sortDescFirst ??
    column_getAutoSortDir(column) === "desc")
    ? "desc"
    : "asc"
}
/**
 * Resolves the next sort order for this column's toggle cycle.
 *
 * The cycle starts with the first sort direction, flips between `asc` and
 * `desc`, and can return `false` when sorting removal is enabled.
 *
 * @example
 * ```ts
 * const nextOrder = column_getNextSortingOrder(column)
 * ```
 */
function column_getNextSortingOrder(column, multi) {
  const firstSortDirection = column_getFirstSortDir(column)
  const isSorted = column_getIsSorted(column)
  if (!isSorted) return firstSortDirection
  if (
    isSorted !== firstSortDirection &&
    (column.table.options.enableSortingRemoval ?? true) &&
    (multi ? (column.table.options.enableMultiRemove ?? true) : true)
  )
    return false
  return isSorted === "desc" ? "asc" : "desc"
}
/**
 * Checks whether this accessor column can participate in sorting.
 *
 * The column must have an accessor and sorting must be enabled by both the
 * column definition and table options.
 *
 * @example
 * ```ts
 * const canSort = column_getCanSort(column)
 * ```
 */
function column_getCanSort(column) {
  return (
    (column.columnDef.enableSorting ?? true) &&
    (column.table.options.enableSorting ?? true) &&
    Boolean(column.accessorFn)
  )
}
/**
 * Checks whether this column can be added to a multi-sort state.
 *
 * Column-level `enableMultiSort` wins over table-level `enableMultiSort`; if
 * neither is set, accessor columns can multi-sort by default.
 *
 * @example
 * ```ts
 * const canMultiSort = column_getCanMultiSort(column)
 * ```
 */
function column_getCanMultiSort(column) {
  return (
    column.columnDef.enableMultiSort ??
    column.table.options.enableMultiSort ??
    Boolean(column.accessorFn)
  )
}
/**
 * Reads this column's current sort direction.
 *
 * The result is `false` when the column is not sorted, otherwise `'asc'` or
 * `'desc'` based on the column's entry in `state.sorting`.
 *
 * @example
 * ```ts
 * const direction = column_getIsSorted(column)
 * ```
 */
function column_getIsSorted(column) {
  const columnSort = column.table.atoms.sorting?.get()?.find((d) => d.id === column.id)
  return !columnSort ? false : columnSort.desc ? "desc" : "asc"
}
/**
 * Finds this column's position in the ordered `state.sorting` array.
 *
 * The result is `-1` when the column is not sorted.
 *
 * @example
 * ```ts
 * const index = column_getSortIndex(column)
 * ```
 */
function column_getSortIndex(column) {
  return column.table.atoms.sorting?.get()?.findIndex((d) => d.id === column.id) ?? -1
}
/**
 * Removes this column from the sorting state.
 *
 * Other sorted columns are preserved, including their relative order.
 *
 * @example
 * ```ts
 * column_clearSorting(column)
 * ```
 */
function column_clearSorting(column) {
  table_setSorting(column.table, (old) =>
    old.length > 0 ? old.filter((d) => d.id !== column.id) : [],
  )
}
/**
 * Creates a header event handler that toggles this column's sorting.
 *
 * The handler ignores events when the column cannot sort, and asks
 * `options.isMultiSortEvent` whether the event should add to a multi-sort.
 *
 * @example
 * ```ts
 * const onClick = column_getToggleSortingHandler(column)
 * ```
 */
function column_getToggleSortingHandler(column) {
  const canSort = column_getCanSort(column)
  return (e) => {
    if (!canSort) return
    column_toggleSorting(
      column,
      void 0,
      column_getCanMultiSort(column) ? column.table.options.isMultiSortEvent?.(e) : false,
    )
  }
}
//#endregion
//#region node_modules/.pnpm/@tanstack+table-core@9.1.2/node_modules/@tanstack/table-core/dist/core/row-models/createCoreRowModel.js
/**
 * Creates a memoized core row model factory.
 *
 * The factory reads the relevant table state atoms and options, then returns a row model function used by the table row-model pipeline.
 */
function createCoreRowModel() {
  return (table) => {
    return tableMemo({
      feature: "coreRowModelsFeature",
      table,
      fnName: "table.getCoreRowModel",
      memoDeps: () => [table.options.data],
      fn: () => _createCoreRowModel(table, table.options.data),
      onAfterUpdate: skipFirstRun(() => {
        table_autoResetExpanded(table)
        table_autoResetPageIndex(table)
        table_autoResetSorting(table)
        table_autoResetCellSelection(table)
      }),
    })
  }
}
function accessRows(table, rowModel, originalRows, depth = 0, parentRow) {
  const rows = []
  for (let i = 0; i < originalRows.length; i++) {
    const originalRow = originalRows[i]
    const row = constructRow(
      table,
      table.getRowId(originalRow, i, parentRow),
      originalRow,
      i,
      depth,
      void 0,
      parentRow?.id,
    )
    rowModel.flatRows.push(row)
    rowModel.rowsById[row.id] = row
    rows.push(row)
    if (table.options.getSubRows) {
      row.originalSubRows = table.options.getSubRows(originalRow, i)
      if (row.originalSubRows?.length)
        row.subRows = accessRows(table, rowModel, row.originalSubRows, depth + 1, row)
    }
  }
  return rows
}
function _createCoreRowModel(table, data) {
  const rowModel = {
    rows: [],
    flatRows: [],
    rowsById: makeObjectMap(),
  }
  rowModel.rows = accessRows(table, rowModel, data)
  return rowModel
}
//#endregion
//#region node_modules/.pnpm/@tanstack+table-core@9.1.2/node_modules/@tanstack/table-core/dist/core/row-models/coreRowModelsFeature.utils.js
/**
 * Resolves the table's unmodified core row model.
 *
 * The factory is created once per table, either from the `coreRowModel` slot on the `features` option
 * or the built-in `createCoreRowModel()`, then reused for later calls.
 *
 * @example
 * ```ts
 * const coreRows = table_getCoreRowModel(table)
 * ```
 */
function table_getCoreRowModel(table) {
  if (!table._rowModels.coreRowModel)
    table._rowModels.coreRowModel =
      table.options.features.coreRowModel?.(table) ?? createCoreRowModel()(table)
  return table._rowModels.coreRowModel()
}
/**
 * Reads the row model immediately before column/global filtering.
 *
 * Filtering is the first derived row-model stage, so this currently aliases
 * `table.getCoreRowModel()`.
 *
 * @example
 * ```ts
 * const rowsBeforeFiltering = table_getPreFilteredRowModel(table)
 * ```
 */
function table_getPreFilteredRowModel(table) {
  return table.getCoreRowModel()
}
/**
 * Resolves the row model after column and global filtering.
 *
 * When `manualFiltering` is enabled, or no filtered row-model factory was
 * registered, this returns the pre-filtered row model because filtering is
 * expected to happen outside the table.
 *
 * @example
 * ```ts
 * const filteredRows = table_getFilteredRowModel(table)
 * ```
 */
function table_getFilteredRowModel(table) {
  if (!table._rowModels.filteredRowModel)
    table._rowModels.filteredRowModel = table.options.features.filteredRowModel?.(table)
  if (table.options.manualFiltering || !table._rowModels.filteredRowModel)
    return table.getPreFilteredRowModel()
  return table._rowModels.filteredRowModel()
}
/**
 * Reads the row model immediately before grouping.
 *
 * Grouping runs after filtering, so this aliases `table.getFilteredRowModel()`.
 *
 * @example
 * ```ts
 * const rowsBeforeGrouping = table_getPreGroupedRowModel(table)
 * ```
 */
function table_getPreGroupedRowModel(table) {
  return table.getFilteredRowModel()
}
/**
 * Resolves the row model after grouping has produced grouped rows.
 *
 * When `manualGrouping` is enabled, or no grouped row-model factory was
 * registered, this returns the pre-grouped row model unchanged.
 *
 * @example
 * ```ts
 * const groupedRows = table_getGroupedRowModel(table)
 * ```
 */
function table_getGroupedRowModel(table) {
  if (!table._rowModels.groupedRowModel)
    table._rowModels.groupedRowModel = table.options.features.groupedRowModel?.(table)
  if (table.options.manualGrouping || !table._rowModels.groupedRowModel)
    return table.getPreGroupedRowModel()
  return table._rowModels.groupedRowModel()
}
/**
 * Reads the row model immediately before sorting.
 *
 * Sorting runs after grouping, so this aliases `table.getGroupedRowModel()`.
 *
 * @example
 * ```ts
 * const rowsBeforeSorting = table_getPreSortedRowModel(table)
 * ```
 */
function table_getPreSortedRowModel(table) {
  return table.getGroupedRowModel()
}
/**
 * Resolves the row model after sorting has been applied.
 *
 * When `manualSorting` is enabled, or no sorted row-model factory was
 * registered, this returns the pre-sorted row model because sorted data is
 * expected to be supplied by the caller.
 *
 * @example
 * ```ts
 * const sortedRows = table_getSortedRowModel(table)
 * ```
 */
function table_getSortedRowModel(table) {
  if (!table._rowModels.sortedRowModel)
    table._rowModels.sortedRowModel = table.options.features.sortedRowModel?.(table)
  if (table.options.manualSorting || !table._rowModels.sortedRowModel)
    return table.getPreSortedRowModel()
  return table._rowModels.sortedRowModel()
}
/**
 * Reads the row model immediately before row expansion.
 *
 * Expansion runs after sorting, so this aliases `table.getSortedRowModel()`.
 *
 * @example
 * ```ts
 * const rowsBeforeExpansion = table_getPreExpandedRowModel(table)
 * ```
 */
function table_getPreExpandedRowModel(table) {
  return table.getSortedRowModel()
}
/**
 * Resolves the row model after expanded rows have been flattened into view.
 *
 * When `manualExpanding` is enabled, or no expanded row-model factory was
 * registered, this returns the pre-expanded row model unchanged.
 *
 * @example
 * ```ts
 * const expandedRows = table_getExpandedRowModel(table)
 * ```
 */
function table_getExpandedRowModel(table) {
  if (!table._rowModels.expandedRowModel)
    table._rowModels.expandedRowModel = table.options.features.expandedRowModel?.(table)
  if (table.options.manualExpanding || !table._rowModels.expandedRowModel)
    return table.getPreExpandedRowModel()
  return table._rowModels.expandedRowModel()
}
/**
 * Reads the row model immediately before pagination.
 *
 * Pagination is the final built-in row-model stage, so this aliases
 * `table.getExpandedRowModel()`.
 *
 * @example
 * ```ts
 * const rowsBeforePagination = table_getPrePaginatedRowModel(table)
 * ```
 */
function table_getPrePaginatedRowModel(table) {
  return table.getExpandedRowModel()
}
/**
 * Resolves the row model after pagination has sliced rows for the current page.
 *
 * When `manualPagination` is enabled, or no paginated row-model factory was
 * registered, this returns the pre-paginated row model because pagination is
 * expected to happen before data reaches the table.
 *
 * @example
 * ```ts
 * const pageRows = table_getPaginatedRowModel(table)
 * ```
 */
function table_getPaginatedRowModel(table) {
  if (!table._rowModels.paginatedRowModel)
    table._rowModels.paginatedRowModel = table.options.features.paginatedRowModel?.(table)
  if (table.options.manualPagination || !table._rowModels.paginatedRowModel)
    return table.getPrePaginatedRowModel()
  return table._rowModels.paginatedRowModel()
}
/**
 * Resolves the final row model consumed by renderers.
 *
 * This is the end of the built-in row-model pipeline: core -> filtering ->
 * grouping -> sorting -> expanding -> pagination.
 *
 * @example
 * ```ts
 * const visibleRows = table_getRowModel(table)
 * ```
 */
function table_getRowModel(table) {
  return table.getPaginatedRowModel()
}
//#endregion
//#region node_modules/.pnpm/@tanstack+table-core@9.1.2/node_modules/@tanstack/table-core/dist/core/row-models/coreRowModelsFeature.js
/**
 * Core feature that wires table row-model accessors and row-model caches.
 */
const coreRowModelsFeature = {
  constructTableAPIs: (table) => {
    assignTableAPIs("coreRowModelsFeature", table, {
      table_getCoreRowModel: { fn: () => table_getCoreRowModel(table) },
      table_getPreFilteredRowModel: { fn: () => table_getPreFilteredRowModel(table) },
      table_getFilteredRowModel: { fn: () => table_getFilteredRowModel(table) },
      table_getPreGroupedRowModel: { fn: () => table_getPreGroupedRowModel(table) },
      table_getGroupedRowModel: { fn: () => table_getGroupedRowModel(table) },
      table_getPreSortedRowModel: { fn: () => table_getPreSortedRowModel(table) },
      table_getSortedRowModel: { fn: () => table_getSortedRowModel(table) },
      table_getPreExpandedRowModel: { fn: () => table_getPreExpandedRowModel(table) },
      table_getExpandedRowModel: { fn: () => table_getExpandedRowModel(table) },
      table_getPrePaginatedRowModel: { fn: () => table_getPrePaginatedRowModel(table) },
      table_getPaginatedRowModel: { fn: () => table_getPaginatedRowModel(table) },
      table_getRowModel: { fn: () => table_getRowModel(table) },
    })
  },
}
//#endregion
//#region node_modules/.pnpm/@tanstack+table-core@9.1.2/node_modules/@tanstack/table-core/dist/core/cells/constructCell.js
/**
 * Creates or retrieves the cell prototype for a table.
 * The prototype is cached on the table and shared by all cell instances.
 */
function getCellPrototype(table) {
  if (!table._cellPrototype) {
    table._cellPrototype = { table }
    const features = Object.values(table._features)
    for (let i = 0; i < features.length; i++)
      features[i].assignCellPrototype?.(table._cellPrototype, table)
  }
  return table._cellPrototype
}
/**
 * Constructs a cell instance from normalized table internals.
 *
 * This wires core properties, feature prototype APIs, and instance data used by table rendering and row-model operations.
 */
function constructCell(column, row, table) {
  const cellPrototype = getCellPrototype(table)
  const cell = Object.create(cellPrototype)
  cell.column = column
  cell.id = `${row.id}_${column.id}`
  cell.row = row
  const initFns = table._cellInstanceInitFns
  for (let i = 0; i < initFns.length; i++) initFns[i](cell)
  return cell
}
//#endregion
//#region node_modules/.pnpm/@tanstack+table-core@9.1.2/node_modules/@tanstack/table-core/dist/core/rows/coreRowsFeature.utils.js
/**
 * Returns this row's zero-based position in the current pre-pagination row
 * model. Rows outside that model return `-1`.
 */
function row_getDisplayIndex(row) {
  const rows = row.table.getRowsInDisplayOrder()
  const displayIndex = row._displayIndexCache
  return rows[displayIndex] === row ? displayIndex : -1
}
/**
 * Returns the rows in the current display order after assigning their
 * zero-based display indexes.
 *
 * When expanded rows bypass pagination, expanded descendants are inserted into
 * the returned order even though they are absent from the pre-pagination row
 * model.
 */
function table_getRowsInDisplayOrder(table) {
  const rows = table.getPrePaginatedRowModel().rows
  if (table.options.paginateExpandedRows === false) {
    const displayRows = []
    const handleRow = (row) => {
      row._displayIndexCache = displayRows.length
      displayRows.push(row)
      if (row.subRows.length > 0 && row.getIsExpanded?.()) row.subRows.forEach(handleRow)
    }
    rows.forEach(handleRow)
    return displayRows
  }
  for (let i = 0; i < rows.length; i++) rows[i]._displayIndexCache = i
  return rows
}
/**
 * Reads and caches this row's value for a column.
 *
 * The value is produced by the column accessor. Missing columns or display
 * columns without an accessor return `undefined`.
 *
 * @example
 * ```ts
 * const firstName = row_getValue(row, 'firstName')
 * ```
 */
function row_getValue(row, columnId) {
  if (hasOwn(row._valuesCache, columnId)) return row._valuesCache[columnId]
  const column = row.table.getColumn(columnId)
  if (!column?.accessorFn) return
  row._valuesCache[columnId] = column.accessorFn(row.original, row.index)
  return row._valuesCache[columnId]
}
/**
 * Reads and caches the values used by faceting/grouping for a column.
 *
 * If the column defines `getUniqueValues`, that result is used. Otherwise the
 * row's accessor value is wrapped in a single-item array.
 *
 * @example
 * ```ts
 * const values = row_getUniqueValues(row, 'tags')
 * ```
 */
function row_getUniqueValues(row, columnId) {
  if (hasOwn(row._uniqueValuesCache, columnId)) return row._uniqueValuesCache[columnId]
  const column = row.table.getColumn(columnId)
  if (!column?.accessorFn) return
  if (!column.columnDef.getUniqueValues) {
    row._uniqueValuesCache[columnId] = [row.getValue(columnId)]
    return row._uniqueValuesCache[columnId]
  }
  row._uniqueValuesCache[columnId] = column.columnDef.getUniqueValues(row.original, row.index)
  return row._uniqueValuesCache[columnId]
}
/**
 * Returns a renderable row value for a column.
 *
 * If the accessor value is nullish, the table's `renderFallbackValue` is used
 * instead.
 *
 * @example
 * ```ts
 * const value = row_renderValue(row, 'firstName')
 * ```
 */
function row_renderValue(row, columnId) {
  return row.getValue(columnId) ?? row.table.options.renderFallbackValue
}
/**
 * Flattens this row's descendant tree into leaf rows.
 *
 * The row itself is not included; only nested `subRows` are walked.
 *
 * @example
 * ```ts
 * const descendants = row_getLeafRows(row)
 * ```
 */
function row_getLeafRows(row) {
  return flattenBy(row.subRows, (d) => d.subRows)
}
/**
 * Returns the deepest structural row depth in the core row model.
 * Root rows are depth `0`, their direct sub-rows are depth `1`, and so on.
 */
function table_getMaxSubRowDepth(table) {
  const rows = table.getCoreRowModel().flatRows
  let maxDepth = 0
  for (let i = 0; i < rows.length; i++) maxDepth = Math.max(maxDepth, rows[i].depth)
  return maxDepth
}
/**
 * Looks up this row's direct parent, if it has one.
 *
 * Parent lookup prefers the core row model for structural parents, then falls
 * back to the pre-pagination row model for generated parent rows.
 *
 * @example
 * ```ts
 * const parent = row_getParentRow(row)
 * ```
 */
function row_getParentRow(row) {
  if (!row.parentId) return
  return row.table.getCoreRowModel().rowsById[row.parentId] ?? row.table.getRow(row.parentId, true)
}
/**
 * Collects this row's ancestor chain from root to direct parent.
 *
 * The current row is not included. Rows without a parent return an empty array.
 *
 * @example
 * ```ts
 * const ancestors = row_getParentRows(row)
 * ```
 */
function row_getParentRows(row) {
  const parentRows = []
  let currentRow = row
  while (true) {
    const parentRow = currentRow.getParentRow()
    if (!parentRow) break
    parentRows.push(parentRow)
    currentRow = parentRow
  }
  return parentRows.reverse()
}
/**
 * Constructs one cell for each leaf column in this row.
 *
 * The result follows `table.getAllLeafColumns()` order and includes hidden
 * columns; visibility-specific APIs filter this list later.
 *
 * @example
 * ```ts
 * const cells = row_getAllCells(row)
 * ```
 */
function row_getAllCells(row) {
  const columns = row.table.getAllLeafColumns()
  let cache = row._cellsCache
  if (!cache) cache = row._cellsCache = /* @__PURE__ */ new WeakMap()
  const cells = new Array(columns.length)
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i]
    let cell = cache.get(column)
    if (!cell) {
      cell = constructCell(column, row, row.table)
      cache.set(column, cell)
    }
    cells[i] = cell
  }
  return cells
}
/**
 * Builds a lookup map of this row's cells keyed by column id.
 *
 * This is the static implementation behind `row.getAllCellsByColumnId()`.
 *
 * @example
 * ```ts
 * const cellsById = row_getAllCellsByColumnId(row)
 * ```
 */
function row_getAllCellsByColumnId(row) {
  const result = makeObjectMap()
  const cells = row.getAllCells()
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i]
    result[cell.column.id] = cell
  }
  return result
}
/**
 * Resolves the stable id for a row.
 *
 * `options.getRowId` wins when provided. Otherwise root rows use their index
 * and child rows append their index to the parent id, such as `0.2`.
 *
 * @example
 * ```ts
 * const id = table_getRowId(originalRow, table, index, parentRow)
 * ```
 */
function table_getRowId(originalRow, table, index, parent) {
  return (
    table.options.getRowId?.(originalRow, index, parent) ??
    (parent ? `${parent.id}.${index}` : String(index))
  )
}
/**
 * Looks up a row by id from the current or full row model.
 *
 * By default this searches `table.getRowModel()`. Passing `searchAll` searches
 * the pre-pagination model first, then falls back to the core model.
 *
 * @example
 * ```ts
 * const row = table_getRow(table, rowId, true)
 * ```
 */
function table_getRow(table, rowId, searchAll) {
  let row = (searchAll ? table.getPrePaginatedRowModel() : table.getRowModel()).rowsById[rowId]
  if (!row) {
    row = table.getCoreRowModel().rowsById[rowId]
    if (!row) throw new Error()
  }
  return row
}
//#endregion
//#region node_modules/.pnpm/@tanstack+table-core@9.1.2/node_modules/@tanstack/table-core/dist/core/rows/coreRowsFeature.js
/**
 * Core feature that creates row APIs for values, cells, and tree traversal.
 */
const coreRowsFeature = {
  assignRowPrototype: (prototype, table) => {
    assignPrototypeAPIs("coreRowsFeature", prototype, table, {
      row_getDisplayIndex: { fn: (row) => row_getDisplayIndex(row) },
      row_getAllCellsByColumnId: {
        fn: (row) => row_getAllCellsByColumnId(row),
        memoDeps: (row) => [row.getAllCells()],
      },
      row_getAllCells: {
        fn: (row) => row_getAllCells(row),
        memoDeps: (row) => [row.table.getAllLeafColumns()],
      },
      row_getLeafRows: {
        fn: (row) => row_getLeafRows(row),
        memoDeps: (row) => [row.subRows],
      },
      row_getParentRow: { fn: (row) => row_getParentRow(row) },
      row_getParentRows: { fn: (row) => row_getParentRows(row) },
      row_getUniqueValues: { fn: (row, columnId) => row_getUniqueValues(row, columnId) },
      row_getValue: { fn: (row, columnId) => row_getValue(row, columnId) },
      row_renderValue: { fn: (row, columnId) => row_renderValue(row, columnId) },
    })
  },
  constructTableAPIs: (table) => {
    assignTableAPIs("coreRowsFeature", table, {
      table_getRowsInDisplayOrder: {
        fn: () => table_getRowsInDisplayOrder(table),
        memoDeps: () => [
          table.getPrePaginatedRowModel().rows,
          table.options.paginateExpandedRows,
          table.options.paginateExpandedRows === false ? table.atoms.expanded?.get() : void 0,
        ],
      },
      table_getRowId: {
        fn: (originalRow, index, parent) => table_getRowId(originalRow, table, index, parent),
      },
      table_getRow: { fn: (id, searchAll) => table_getRow(table, id, searchAll) },
      table_getMaxSubRowDepth: {
        fn: () => table_getMaxSubRowDepth(table),
        memoDeps: () => [table.getCoreRowModel()],
      },
    })
  },
}
//#endregion
//#region node_modules/.pnpm/@tanstack+table-core@9.1.2/node_modules/@tanstack/table-core/dist/core/table/coreTablesFeature.utils.js
/**
 * Synchronizes externally controlled state slices into the table's base atoms.
 *
 * This keeps `options.state` values mirrored in the atom graph so derived
 * atoms, stores, and table APIs read a consistent snapshot.
 *
 * Adapters that update options during their host's render phase pass the
 * state snapshot captured by the committed render as `capturedState` — the
 * shared options object may already hold values from a newer render that
 * never commits. Pass `null` to publish nothing (a captured "no controlled
 * state"); omitting the argument reads the current `table.options.state`
 * instead. An optional `compare` suppresses semantically unchanged slice
 * writes; the default remains reference equality.
 *
 * @example
 * ```ts
 * table_syncExternalStateToBaseAtoms(table)
 * table_syncExternalStateToBaseAtoms(table, capturedState ?? null, shallow)
 * ```
 */
function table_syncExternalStateToBaseAtoms(
  table,
  capturedState,
  compare = (currentState, externalState) => currentState === externalState,
) {
  const state = capturedState === void 0 ? table.options.state : capturedState
  table._reactivity.batch(() => {
    if (state)
      for (const key in state) {
        const baseAtom = table.baseAtoms[key]
        if (!baseAtom) continue
        const rawExternalState = state[key]
        const externalState =
          rawExternalState === void 0 ? table.initialState[key] : rawExternalState
        if (
          !compare(
            table._reactivity.untrack(() => baseAtom.get()),
            externalState,
          )
        )
          baseAtom.set(() => externalState)
      }
  })
}
/**
 * Publishes captured controlled state after a host framework commits.
 *
 * Render-phase adapters stage options without synchronizing base atoms, then
 * pass the state captured by the committed render here. The commit signal also
 * invalidates ownership changes when no base atom was written.
 */
function table_publishExternalState(
  table,
  state,
  compare = (currentState, externalState) => currentState === externalState,
) {
  table._reactivity.batch(() => {
    table_syncExternalStateToBaseAtoms(table, state, compare)
    table._reactivity.commit?.()
  })
}
/**
 * Resets all internal table base atoms to `table.initialState`, then clears
 * transient instance data through registered feature reset hooks.
 *
 * This resets internally owned state slices in a single reactivity batch. Use
 * feature-specific reset APIs when a slice may be externally owned.
 *
 * @example
 * ```ts
 * table_reset(table)
 * ```
 */
function table_reset(table) {
  const snap = cloneState(table.initialState)
  table._reactivity.batch(() => {
    const keys = Object.keys(snap)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      table.baseAtoms[key].set(snap[key])
    }
  })
  const features = Object.values(table._features)
  for (let i = 0; i < features.length; i++) features[i].resetTableInstanceData?.(table)
}
/**
 * Merges new table options with the current resolved options.
 *
 * If `options.mergeOptions` is provided, it owns the merge behavior; otherwise
 * options are shallow-merged. Static options that should never change after
 * initialization are restored on a fresh object so framework merge helpers may
 * return readonly getter/proxy objects.
 *
 * @example
 * ```ts
 * const options = table_mergeOptions(table, nextOptions)
 * ```
 */
function table_mergeOptions(table, newOptions) {
  const { features, atoms, initialState } = table.options
  if (!table.options.mergeOptions)
    return {
      ...table.options,
      ...newOptions,
      features,
      atoms,
      initialState,
    }
  const mergedOptions = table.options.mergeOptions(table.options, newOptions)
  const descriptors = { ...Object.getOwnPropertyDescriptors(mergedOptions) }
  return Object.defineProperties(Object.create(Object.getPrototypeOf(mergedOptions)), {
    ...descriptors,
    features: {
      value: features,
      enumerable: true,
      configurable: true,
      writable: true,
    },
    atoms: {
      value: atoms,
      enumerable: true,
      configurable: true,
      writable: true,
    },
    initialState: {
      value: initialState,
      enumerable: true,
      configurable: true,
      writable: true,
    },
  })
}
/**
 * Updates the table options object.
 *
 * The updater receives the current resolved options and the merged result is
 * immediately assigned to the table instance.
 *
 * @example
 * ```ts
 * table_setOptions(table, (old) => old)
 * table_setOptions(table, (old) => old, { syncExternalState: false })
 * ```
 */
function table_setOptions(table, updater, options) {
  const mergedOptions = table_mergeOptions(table, functionalUpdate(updater, table.options))
  if (table.optionsStore) table.optionsStore.set(() => mergedOptions)
  else table.options = mergedOptions
  if (options?.syncExternalState !== false)
    table_publishExternalState(table, mergedOptions.state ?? null)
}
//#endregion
//#region node_modules/.pnpm/@tanstack+table-core@9.1.2/node_modules/@tanstack/table-core/dist/core/coreFeatures.js
/**
 * The built-in core feature set required by every table.
 *
 * These features provide table, column, row, header, cell, and core row-model behavior before optional feature plugins are added.
 */
const coreFeatures = {
  coreCellsFeature,
  coreColumnsFeature,
  coreHeadersFeature,
  coreRowModelsFeature,
  coreRowsFeature,
  coreTablesFeature: {
    constructTableAPIs: (table) => {
      assignTableAPIs("coreTablesFeature", table, {
        table_reset: { fn: () => table_reset(table) },
        table_setOptions: { fn: (updater) => table_setOptions(table, updater) },
      })
    },
  },
}
//#endregion
//#region node_modules/.pnpm/@tanstack+table-core@9.1.2/node_modules/@tanstack/table-core/dist/helpers/columnHelper.js
/**
 * Creates helper functions for authoring column definitions with stronger value
 * inference.
 *
 * `accessor` infers `TValue` from an accessor key or accessor function,
 * `display` creates non-data columns, `group` creates parent columns, and
 * `columns` preserves tuple-level value types for arrays. At runtime these
 * helpers only return column definition objects.
 *
 * @example
 * ```tsx
 * const helper = createColumnHelper<typeof features, Person>() // features is the result of `tableFeatures({})` helper
 * const columns = [
 *  helper.display({ id: 'actions', header: 'Actions' }),
 *  helper.accessor('firstName', {}),
 *  helper.accessor((row) => row.lastName, { id: 'lastName' }),
 * ]
 * ```
 */
function createColumnHelper() {
  return {
    accessor: (accessor, column) => {
      return typeof accessor === "function"
        ? {
            ...column,
            accessorFn: accessor,
          }
        : {
            ...column,
            accessorKey: accessor,
          }
    },
    columns: (columns) => columns,
    display: (column) => column,
    group: (column) => column,
  }
}
//#endregion
//#region node_modules/.pnpm/@tanstack+table-core@9.1.2/node_modules/@tanstack/table-core/dist/helpers/tableFeatures.js
/**
 * A helper function to help define the features that are to be imported and applied to a table instance.
 * Use this utility to make it easier to have the correct type inference for the features that are being imported.
 * **Note:** It is recommended to use this utility statically outside of a component.
 *
 * Alongside feature modules, this object carries everything else that is
 * statically stitched into the table:
 *
 * - Row model factories (`sortedRowModel`, `filteredRowModel`, etc.)
 * - Row model function registries (`sortFns`, `filterFns`, `aggregationFns`),
 *   whose keys become the valid string values for `sortFn`, `filterFn`,
 *   `globalFilterFn`, and `aggregationFn` with full inference
 * - Type-only `tableMeta`/`columnMeta` slots for declaring per-table meta types
 *   instead of using global declaration merging. The values are phantom
 *   (ignored and stripped at runtime); only their types are used.
 * @example
 * ```
 * import {
 *   columnFilteringFeature,
 *   createFilteredRowModel,
 *   createSortedRowModel,
 *   filterFn_includesString,
 *   rowSortingFeature,
 *   sortFn_alphanumeric,
 *   sortFn_text,
 *   tableFeatures,
 * } from '@tanstack/react-table'
 * const features = tableFeatures({
 *   columnFilteringFeature,
 *   rowSortingFeature,
 *   filteredRowModel: createFilteredRowModel(),
 *   sortedRowModel: createSortedRowModel(),
 *   filterFns: { includesString: filterFn_includesString, myCustomFilterFn },
 *   sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text },
 *   tableMeta: {} as { updateData: (rowIndex: number, columnId: string, value: unknown) => void },
 *   columnMeta: {} as { align?: 'left' | 'right' },
 * });
 * const table = useTable({ features, columns, data });
 * ```
 */
function tableFeatures(features) {
  return features
}
//#endregion
//#region node_modules/.pnpm/@tanstack+table-core@9.1.2/node_modules/@tanstack/table-core/dist/core/table/constructTable.js
/**
 * Builds the initial table state from registered features and user initial state.
 *
 * Each feature contributes its default state before user-provided `initialState` values are merged in.
 */
function getInitialTableState(features, initialState = {}) {
  Object.values(features).forEach((feature) => {
    initialState = feature.getInitialState?.(initialState) ?? initialState
  })
  return cloneState(initialState)
}
/**
 * Constructs a table instance from normalized table internals.
 *
 * This wires core properties, feature prototype APIs, and instance data used by table rendering and row-model operations.
 */
function constructTable(tableOptions) {
  const _reactivity = tableOptions.features.coreReactivityFeature
  const {
    aggregationFns,
    columnMeta: _columnMeta,
    coreRowModel,
    expandedRowModel,
    facetedMinMaxValues,
    facetedRowModel,
    facetedUniqueValues,
    filterFns,
    filterMeta: _filterMeta,
    filteredRowModel,
    groupedRowModel,
    paginatedRowModel,
    sortFns,
    sortedRowModel,
    tableMeta: _tableMeta,
    ...features
  } = tableOptions.features
  const table = {
    _cellInstanceInitFns: [],
    _columnInstanceInitFns: [],
    _features: {
      ...coreFeatures,
      ...features,
    },
    _headerGroupInstanceInitFns: [],
    _headerInstanceInitFns: [],
    _reactivity,
    _rowInstanceInitFns: [],
    _rowModelFns: {
      aggregationFns,
      filterFns,
      sortFns,
    },
    _rowModels: {},
    atoms: {},
    baseAtoms: {},
  }
  const featuresList = Object.values(table._features)
  const mergedOptions = {
    ...featuresList.reduce((obj, feature) => {
      return Object.assign(obj, feature.getDefaultTableOptions?.(table))
    }, {}),
    ...tableOptions,
  }
  if (_reactivity.wrapExternalAtoms && mergedOptions.atoms)
    for (const [atomKey, _atom] of Object.entries(mergedOptions.atoms)) {
      const atom = _atom
      const wrappedAtom = _reactivity.createWritableAtom(atom.get(), {
        debugName: `externalAtom/${atomKey}`,
      })
      mergedOptions.atoms[atomKey] = wrappedAtom
      let syncExternal = false
      const syncAtomToWrappedSub = atom.subscribe((value) => {
        if (syncExternal) return
        wrappedAtom.set(value)
      })
      const syncWrappedToAtomSub = wrappedAtom.subscribe((value) => {
        syncExternal = true
        atom.set(value)
        syncExternal = false
      })
      _reactivity.addSubscription(syncAtomToWrappedSub)
      _reactivity.addSubscription(syncWrappedToAtomSub)
    }
  if (_reactivity.createOptionsStore) {
    table.optionsStore = _reactivity.createWritableAtom(mergedOptions, {
      debugName: "table/optionsStore",
    })
    Object.defineProperty(table, "options", {
      configurable: true,
      enumerable: true,
      get() {
        return table.optionsStore.get()
      },
      set(value) {
        table.optionsStore.set(() => value)
      },
    })
  } else table.options = mergedOptions
  table.initialState = getInitialTableState(table._features, table.options.initialState)
  const stateKeys = Object.keys(table.initialState)
  for (let i = 0; i < stateKeys.length; i++) {
    const key = stateKeys[i]
    table.baseAtoms[key] = _reactivity.createWritableAtom(table.initialState[key], {
      debugName: `table/baseAtoms/${key}`,
    })
    table.atoms[key] = _reactivity.createReadonlyAtom(
      () => {
        const options = table.options
        const externalAtom = options.atoms?.[key]
        const reactiveState = externalAtom ? externalAtom.get() : table.baseAtoms[key].get()
        if (externalAtom) return reactiveState
        const controlledState = options.state
        if (controlledState && hasOwn(controlledState, key)) {
          const controlledValue = controlledState[key]
          return controlledValue === void 0 ? table.initialState[key] : controlledValue
        }
        return reactiveState
      },
      { debugName: `table/atoms/${key}` },
    )
  }
  table_syncExternalStateToBaseAtoms(table)
  table.store = atomToStore(
    _reactivity.createReadonlyAtom(
      () => {
        const snapshot = {}
        for (let i = 0; i < stateKeys.length; i++) {
          const key = stateKeys[i]
          snapshot[key] = table.atoms[key].get()
        }
        return snapshot
      },
      {
        compare: shallow,
        debugName: "table/store",
      },
    ),
  )
  for (let i = 0; i < featuresList.length; i++) {
    const feature = featuresList[i]
    feature.initTableInstanceData?.(table)
    if (feature.initCellInstanceData)
      table._cellInstanceInitFns.push(feature.initCellInstanceData.bind(feature))
    if (feature.initColumnInstanceData)
      table._columnInstanceInitFns.push(feature.initColumnInstanceData.bind(feature))
    if (feature.initHeaderGroupInstanceData)
      table._headerGroupInstanceInitFns.push(feature.initHeaderGroupInstanceData.bind(feature))
    if (feature.initHeaderInstanceData)
      table._headerInstanceInitFns.push(feature.initHeaderInstanceData.bind(feature))
    if (feature.initRowInstanceData)
      table._rowInstanceInitFns.push(feature.initRowInstanceData.bind(feature))
    feature.constructTableAPIs?.(table)
  }
  return table
}
//#endregion
//#region node_modules/.pnpm/@tanstack+table-core@9.1.2/node_modules/@tanstack/table-core/dist/features/column-filtering/columnFilteringFeature.utils.js
/**
 * Creates the default column filter state.
 *
 * The feature default is an empty array, meaning no column filters are active.
 * Reset APIs use this value when `defaultState` is `true`.
 *
 * @example
 * ```ts
 * const filters = getDefaultColumnFiltersState()
 * ```
 */
function getDefaultColumnFiltersState() {
  return []
}
/**
 * Chooses a built-in filter function from the column's first core row value.
 *
 * Strings use `includesString`, numbers use `inNumberRange`, booleans and
 * objects use `equals`, dates use `inDateRange`, arrays use `arrIncludes`,
 * and unknown values fall back to `weakEquals`.
 *
 * The chosen filter function is looked up in the table's `filterFns`
 * registry. When it is not registered there, this returns `undefined` and
 * warns in development instead of substituting a different filter function.
 *
 * @example
 * ```ts
 * const filterFn = column_getAutoFilterFn(column)
 * ```
 */
function column_getAutoFilterFn(column) {
  const filterFns = column.table._rowModelFns.filterFns
  const rows = column.table.getCoreRowModel().flatRows
  let value
  for (let i = 0; i < rows.length; i++) {
    const rowValue = rows[i].getValue(column.id)
    if (rowValue !== null && rowValue !== void 0) {
      value = rowValue
      break
    }
  }
  let filterFnName
  if (typeof value === "string") filterFnName = "includesString"
  else if (typeof value === "number") filterFnName = "inNumberRange"
  else if (typeof value === "boolean") filterFnName = "equals"
  else if (Array.isArray(value)) filterFnName = "arrIncludes"
  else if (Object.prototype.toString.call(value) === "[object Date]") filterFnName = "inDateRange"
  else if (value !== null && typeof value === "object") filterFnName = "equals"
  else filterFnName = "weakEquals"
  return filterFns?.[filterFnName]
}
/**
 * Resolves the filter function configured for a column.
 *
 * Function-valued `columnDef.filterFn` is returned directly, `'auto'` delegates
 * to `column_getAutoFilterFn`, and string values are looked up in the table's
 * filter function registry.
 *
 * @example
 * ```ts
 * const filterFn = column_getFilterFn(column)
 * ```
 */
function column_getFilterFn(column) {
  let filterFn = null
  const filterFns = column.table._rowModelFns.filterFns
  filterFn = isFunction(column.columnDef.filterFn)
    ? column.columnDef.filterFn
    : column.columnDef.filterFn === "auto"
      ? column_getAutoFilterFn(column)
      : filterFns?.[column.columnDef.filterFn]
  return filterFn ?? void 0
}
/**
 * Checks whether column filtering is enabled for this accessor column.
 *
 * The column must have an accessor and filtering must be enabled by the column
 * definition, `enableColumnFilters`, and the table-wide `enableFilters` option.
 *
 * @example
 * ```ts
 * const canFilter = column_getCanFilter(column)
 * ```
 */
function column_getCanFilter(column) {
  return (
    (column.columnDef.enableColumnFilter ?? true) &&
    (column.table.options.enableColumnFilters ?? true) &&
    (column.table.options.enableFilters ?? true) &&
    Boolean(column.accessorFn)
  )
}
/**
 * Checks whether this column currently has an entry in `state.columnFilters`.
 *
 * This only reflects filter state presence; it does not indicate whether the
 * filter removes any rows.
 *
 * @example
 * ```ts
 * const isFiltered = column_getIsFiltered(column)
 * ```
 */
function column_getIsFiltered(column) {
  return column_getFilterIndex(column) > -1
}
/**
 * Reads this column's current filter value from `state.columnFilters`.
 *
 * Missing filter entries return `undefined`.
 *
 * @example
 * ```ts
 * const value = column_getFilterValue(column)
 * ```
 */
function column_getFilterValue(column) {
  return column.table.atoms.columnFilters?.get()?.find((d) => d.id === column.id)?.value
}
/**
 * Finds this column's position in the ordered `state.columnFilters` array.
 *
 * The result is `-1` when the column has no active filter.
 *
 * @example
 * ```ts
 * const index = column_getFilterIndex(column)
 * ```
 */
function column_getFilterIndex(column) {
  return column.table.atoms.columnFilters?.get()?.findIndex((d) => d.id === column.id) ?? -1
}
/**
 * Adds, updates, or removes this column's filter value.
 *
 * The incoming value may be an updater. After resolution, `autoRemove` rules
 * decide whether the filter should be removed instead of stored.
 *
 * @example
 * ```ts
 * column_setFilterValue(column, (old) => String(old ?? '').trim())
 * ```
 */
function column_setFilterValue(column, value) {
  table_setColumnFilters(column.table, (old) => {
    const filterFn = column_getFilterFn(column)
    const previousFilter = old.find((d) => d.id === column.id)
    const newFilter = functionalUpdate(value, previousFilter ? previousFilter.value : void 0)
    if (shouldAutoRemoveFilter(filterFn, newFilter, column))
      return old.filter((d) => d.id !== column.id)
    const newFilterObj = {
      id: column.id,
      value: newFilter,
    }
    if (previousFilter)
      return old.map((d) => {
        if (d.id === column.id) return newFilterObj
        return d
      })
    if (old.length > 0) return [...old, newFilterObj]
    return [newFilterObj]
  })
}
/**
 * Routes a column filter updater through the table's filter change handler.
 *
 * The resolved filters are cleaned before they are emitted: filters for known
 * columns are removed when their filter function says the value should be
 * auto-removed.
 *
 * @example
 * ```ts
 * table_setColumnFilters(table, (old) => old.filter((filter) => filter.id !== 'age'))
 * ```
 */
function table_setColumnFilters(table, updater) {
  const leafColumnsById = table.getAllLeafColumnsById()
  const updateFn = (old) => {
    return functionalUpdate(updater, old).filter((filter) => {
      const column = leafColumnsById[filter.id]
      if (column) {
        if (shouldAutoRemoveFilter(column_getFilterFn(column), filter.value, column)) return false
      }
      return true
    })
  }
  setStateSlice(table, "columnFilters", updateFn)
}
/**
 * Resets `columnFilters` to the configured initial state or feature default.
 *
 * With no argument, the reset clones `table.initialState.columnFilters` when it
 * exists. Passing `true` ignores initial state and resets to `[]`.
 *
 * @example
 * ```ts
 * table_resetColumnFilters(table)
 * table_resetColumnFilters(table, true)
 * ```
 */
function table_resetColumnFilters(table, defaultState) {
  table_setColumnFilters(
    table,
    defaultState ? [] : cloneState(table.initialState.columnFilters ?? []),
  )
}
/**
 * Returns whether a filter value should be removed from filter state.
 *
 * `undefined` always removes: it is the universal "clear this filter"
 * sentinel used by `setFilterValue(undefined)` and functional updaters. For
 * any other value, a filter function's `autoRemove` hook is authoritative
 * when provided, so custom filter functions can keep values (such as empty
 * strings) that the default heuristic would drop. Without an `autoRemove`
 * hook, empty strings are removed.
 *
 * @example
 * ```ts
 * const removeFilter = shouldAutoRemoveFilter(filterFn, value, column)
 * ```
 */
function shouldAutoRemoveFilter(filterFn, value, column) {
  if (value === undefined) return true
  if (filterFn?.autoRemove) return Boolean(filterFn.autoRemove(value, column))
  return typeof value === "string" && !value
}
//#endregion
//#region node_modules/.pnpm/@tanstack+table-core@9.1.2/node_modules/@tanstack/table-core/dist/features/column-filtering/columnFilteringFeature.js
/**
 * Feature that adds per-column filtering state, options, and column/table filter APIs.
 */
const columnFilteringFeature = {
  getInitialState: (initialState) => {
    return {
      columnFilters: getDefaultColumnFiltersState(),
      ...initialState,
    }
  },
  getDefaultColumnDef: () => {
    return { filterFn: "auto" }
  },
  getDefaultTableOptions: (table) => {
    return {
      onColumnFiltersChange: makeStateUpdater("columnFilters", table),
      filterFromLeafRows: false,
      maxLeafRowFilterDepth: 100,
    }
  },
  assignColumnPrototype: (prototype, table) => {
    assignPrototypeAPIs("columnFilteringFeature", prototype, table, {
      column_getAutoFilterFn: { fn: (column) => column_getAutoFilterFn(column) },
      column_getFilterFn: { fn: (column) => column_getFilterFn(column) },
      column_getCanFilter: { fn: (column) => column_getCanFilter(column) },
      column_getIsFiltered: { fn: (column) => column_getIsFiltered(column) },
      column_getFilterValue: { fn: (column) => column_getFilterValue(column) },
      column_getFilterIndex: { fn: (column) => column_getFilterIndex(column) },
      column_setFilterValue: { fn: (column, value) => column_setFilterValue(column, value) },
    })
  },
  initRowInstanceData: (row) => {
    row.columnFilters = makeObjectMap()
    row.columnFiltersMeta = makeObjectMap()
  },
  constructTableAPIs: (table) => {
    assignTableAPIs("columnFilteringFeature", table, {
      table_setColumnFilters: { fn: (updater) => table_setColumnFilters(table, updater) },
      table_resetColumnFilters: {
        fn: (defaultState) => table_resetColumnFilters(table, defaultState),
      },
    })
  },
}
//#endregion
//#region node_modules/.pnpm/@tanstack+table-core@9.1.2/node_modules/@tanstack/table-core/dist/features/column-filtering/filterFns.js
/**
 * Builds a `FilterFn` from a value-level comparator plus optional resolvers.
 *
 * The `filter` comparator receives the row's data value (already passed
 * through `resolveDataValue` when one is defined) and the filter value
 * (already passed through `resolveFilterValue` by the table). Keeping
 * normalization in the resolvers means a variant of an existing filter
 * function only has to swap the resolvers, not re-implement the comparison.
 *
 * The definition is attached to the returned function, so a variant can be
 * created by spreading a built-in filter function and overriding what differs:
 *
 * ```ts
 * const normalize = (value: unknown) =>
 *   String(value ?? '')
 *     .toLowerCase()
 *     .normalize('NFD')
 *     .replace(/\p{Diacritic}/gu, '')
 *
 * const includesStringIgnoreDiacritics = constructFilterFn({
 *   ...filterFn_includesString,
 *   resolveFilterValue: normalize,
 *   resolveDataValue: normalize,
 * })
 * ```
 *
 * Note: the table applies `resolveFilterValue` once per filter before any rows
 * are tested. When calling a filter function directly (outside of a table),
 * apply it yourself: `fn(row, columnId, fn.resolveFilterValue?.(value) ?? value)`.
 */
function constructFilterFn(def) {
  const filterFn = Object.assign((row, columnId, filterValue, addMeta) => {
    const rawValue = row.getValue(columnId)
    const dataValue = filterFn.resolveDataValue ? filterFn.resolveDataValue(rawValue) : rawValue
    return filterFn.filter(dataValue, filterValue, row, columnId, addMeta)
  }, def)
  return filterFn
}
constructFilterFn({
  filter: (dataValue, filterValue) => dataValue === filterValue,
  autoRemove: (val) => testFalsy(val),
})
constructFilterFn({
  filter: (dataValue, filterValue) => dataValue == filterValue,
  autoRemove: (val) => testFalsy(val),
})
constructFilterFn({
  filter: (dataValue, filterValue) => Boolean(dataValue?.includes(filterValue)),
  autoRemove: (val) => testFalsy(val),
  resolveFilterValue: (val) => String(val),
  resolveDataValue: (val) => (val == null ? void 0 : String(val)),
})
/**
 * Keeps rows whose stringified column value includes the filter text.
 *
 * Both values are lowercased before comparison, and empty filter values are
 * auto-removed.
 */
const filterFn_includesString = constructFilterFn({
  filter: (dataValue, filterValue) => Boolean(dataValue?.includes(filterValue)),
  autoRemove: (val) => testFalsy(val),
  resolveFilterValue: (val) => String(val).toLowerCase(),
  resolveDataValue: (val) => (val == null ? void 0 : String(val).toLowerCase()),
})
/**
 * Keeps rows whose stringified column value equals the filter text.
 *
 * Both values are lowercased before comparison, and empty filter values are
 * auto-removed.
 */
const filterFn_equalsString = constructFilterFn({
  filter: (dataValue, filterValue) => dataValue === filterValue,
  autoRemove: (val) => testFalsy(val),
  resolveFilterValue: (val) => String(val).toLowerCase(),
  resolveDataValue: (val) => (val == null ? void 0 : String(val).toLowerCase()),
})
constructFilterFn({
  filter: (dataValue, filterValue) => dataValue === filterValue,
  autoRemove: (val) => testFalsy(val),
  resolveFilterValue: (val) => String(val),
  resolveDataValue: (val) => (val == null ? void 0 : String(val)),
})
constructFilterFn({
  filter: (dataValue, filterValue) => Boolean(dataValue?.startsWith(filterValue)),
  autoRemove: (val) => testFalsy(val),
  resolveFilterValue: (val) => String(val).toLowerCase(),
  resolveDataValue: (val) => (val == null ? void 0 : String(val).toLowerCase()),
})
constructFilterFn({
  filter: (dataValue, filterValue) => Boolean(dataValue?.endsWith(filterValue)),
  autoRemove: (val) => testFalsy(val),
  resolveFilterValue: (val) => String(val).toLowerCase(),
  resolveDataValue: (val) => (val == null ? void 0 : String(val).toLowerCase()),
})
constructFilterFn({
  filter: (dataValue) => testValueEmpty(dataValue),
  autoRemove: (val) => testFalsy(val) || val === false,
})
constructFilterFn({
  filter: (dataValue) => !testValueEmpty(dataValue),
  autoRemove: (val) => testFalsy(val) || val === false,
})
constructFilterFn({
  filter: (dataValue, filterValue) => compareGreaterThan(dataValue, filterValue),
  autoRemove: (val) => testFalsy(val),
})
constructFilterFn({
  filter: (dataValue, filterValue) => compareGreaterThanOrEqualTo(dataValue, filterValue),
  autoRemove: (val) => testFalsy(val),
})
constructFilterFn({
  filter: (dataValue, filterValue) => !compareGreaterThanOrEqualTo(dataValue, filterValue),
  autoRemove: (val) => testFalsy(val),
})
constructFilterFn({
  filter: (dataValue, filterValue) => !compareGreaterThan(dataValue, filterValue),
  autoRemove: (val) => testFalsy(val),
})
constructFilterFn({
  filter: (dataValue, filterValues) => compareBetween(dataValue, filterValues, false),
  autoRemove: (val) =>
    testFalsy(val) || (Array.isArray(val) && testFalsy(val[0]) && testFalsy(val[1])),
})
constructFilterFn({
  filter: (dataValue, filterValues) => compareBetween(dataValue, filterValues, true),
  autoRemove: (val) =>
    testFalsy(val) || (Array.isArray(val) && testFalsy(val[0]) && testFalsy(val[1])),
})
constructFilterFn({
  filter: (dataValue, filterValue) => {
    if (typeof dataValue !== "number" || Number.isNaN(dataValue)) return false
    const [min, max] = filterValue
    return dataValue >= min && dataValue <= max
  },
  resolveFilterValue: (val) => {
    const [unsafeMin, unsafeMax] = val
    const parsedMin = typeof unsafeMin !== "number" ? parseFloat(unsafeMin) : unsafeMin
    const parsedMax = typeof unsafeMax !== "number" ? parseFloat(unsafeMax) : unsafeMax
    let min = unsafeMin === null || Number.isNaN(parsedMin) ? -Infinity : parsedMin
    let max = unsafeMax === null || Number.isNaN(parsedMax) ? Infinity : parsedMax
    if (min > max) {
      const temp = min
      min = max
      max = temp
    }
    return [min, max]
  },
  autoRemove: (val) =>
    testFalsy(val) || (Array.isArray(val) && testFalsy(val[0]) && testFalsy(val[1])),
})
constructFilterFn({
  filter: (dataValue, filterValue) => {
    const [min, max] = filterValue
    return dataValue >= min && dataValue <= max
  },
  resolveFilterValue: (val) => {
    const [unsafeMin, unsafeMax] = val
    const parsedMin = toDateTimestamp(unsafeMin)
    const parsedMax = toDateTimestamp(unsafeMax)
    let min = Number.isNaN(parsedMin) ? -Infinity : parsedMin
    let max = Number.isNaN(parsedMax) ? Infinity : parsedMax
    if (min > max) {
      const temp = min
      min = max
      max = temp
    }
    return [min, max]
  },
  resolveDataValue: (val) => toDateTimestamp(val),
  autoRemove: (val) =>
    testFalsy(val) || (Array.isArray(val) && testFalsy(val[0]) && testFalsy(val[1])),
})
constructFilterFn({
  filter: (dataValue, filterValue) => {
    for (let i = 0; i < filterValue.length; i++) if (dataValue === filterValue[i]) return true
    return false
  },
  autoRemove: (val) => testFalsy(val) || !val?.length,
})
constructFilterFn({
  filter: (dataValue, filterValue) => {
    if (typeof dataValue !== "string" && !Array.isArray(dataValue)) return false
    for (let i = 0; i < filterValue.length; i++) if (dataValue.includes(filterValue[i])) return true
    return false
  },
  autoRemove: (val) => testFalsy(val) || !val?.length,
})
constructFilterFn({
  filter: (dataValue, filterValue) => {
    if (!Array.isArray(dataValue)) return false
    for (let i = 0; i < filterValue.length; i++)
      if (!dataValue.includes(filterValue[i])) return false
    return true
  },
  autoRemove: (val) => testFalsy(val) || !val?.length,
})
constructFilterFn({
  filter: (dataValue, filterValue) => {
    if (!Array.isArray(dataValue)) return false
    for (let i = 0; i < filterValue.length; i++) if (dataValue.includes(filterValue[i])) return true
    return false
  },
  autoRemove: (val) => testFalsy(val) || !val?.length,
})
function testFalsy(val) {
  return val === void 0 || val === null || val === ""
}
function testValueEmpty(dataValue) {
  return dataValue == null || String(dataValue).trim() === ""
}
function toDateTimestamp(value) {
  if (value instanceof Date) return value.getTime()
  if (typeof value === "number") return value
  if (value == null || value === "") return NaN
  return new Date(value).getTime()
}
function compareGreaterThan(dataValue, filterValue) {
  const numericDataValue = dataValue == null ? 0 : Number(dataValue)
  const numericFilterValue = Number(filterValue)
  if (!isNaN(numericFilterValue) && !isNaN(numericDataValue))
    return numericDataValue > numericFilterValue
  return (
    String(dataValue ?? "")
      .toLowerCase()
      .trim() > String(filterValue).toLowerCase().trim()
  )
}
function compareGreaterThanOrEqualTo(dataValue, filterValue) {
  return dataValue === filterValue || compareGreaterThan(dataValue, filterValue)
}
function compareBetween(dataValue, filterValues, inclusive) {
  const min = filterValues[0]
  const hasMin = min !== "" && min !== void 0
  if (hasMin) {
    if (
      !(inclusive
        ? compareGreaterThanOrEqualTo(dataValue, min)
        : compareGreaterThan(dataValue, min))
    )
      return false
  }
  const max = filterValues[1]
  if (max === "" || max === void 0) return true
  if (hasMin) {
    const numericMin = Number(min)
    const numericMax = Number(max)
    if (!isNaN(numericMin) && !isNaN(numericMax) && numericMin > numericMax) return true
  }
  return inclusive
    ? !compareGreaterThan(dataValue, max)
    : !compareGreaterThanOrEqualTo(dataValue, max)
}
//#endregion
//#region node_modules/.pnpm/@tanstack+table-core@9.1.2/node_modules/@tanstack/table-core/dist/features/global-filtering/globalFilteringFeature.utils.js
/**
 * Checks whether this accessor column participates in global filtering.
 *
 * The column must have an accessor and pass column-level, table-level, and
 * optional `getColumnCanGlobalFilter` checks.
 *
 * @example
 * ```ts
 * const canGlobalFilter = column_getCanGlobalFilter(column)
 * ```
 */
function column_getCanGlobalFilter(column) {
  return (
    (column.columnDef.enableGlobalFilter ?? true) &&
    (column.table.options.enableGlobalFilter ?? true) &&
    (column.table.options.enableFilters ?? true) &&
    (column.table.options.getColumnCanGlobalFilter?.(column) ?? true) &&
    Boolean(column.accessorFn)
  )
}
/**
 * Provides the built-in automatic global filter function.
 *
 * Global filtering defaults to `includesString`, which gives search-box style
 * matching across globally filterable columns.
 *
 * @example
 * ```ts
 * const filterFn = table_getGlobalAutoFilterFn()
 * ```
 */
function table_getGlobalAutoFilterFn() {
  return filterFn_includesString
}
/**
 * Resolves the filter function used for global filtering.
 *
 * Function-valued `options.globalFilterFn` is returned directly, `'auto'`
 * delegates to `table_getGlobalAutoFilterFn`, and string values are looked up in
 * the table's filter function registry.
 *
 * @example
 * ```ts
 * const filterFn = table_getGlobalFilterFn(table)
 * ```
 */
function table_getGlobalFilterFn(table) {
  const { globalFilterFn } = table.options
  const filterFns = table._rowModelFns.filterFns
  return isFunction(globalFilterFn)
    ? globalFilterFn
    : globalFilterFn === "auto"
      ? table_getGlobalAutoFilterFn()
      : filterFns?.[globalFilterFn]
}
//#endregion
//#region node_modules/.pnpm/@tanstack+table-core@9.1.2/node_modules/@tanstack/table-core/dist/features/row-pagination/rowPaginationFeature.js
/**
 * Feature that adds pagination state and table APIs for page navigation.
 */
const rowPaginationFeature = {
  getInitialState: (initialState) => {
    return {
      ...initialState,
      pagination: {
        ...getDefaultPaginationState(),
        ...initialState.pagination,
      },
    }
  },
  getDefaultTableOptions: (table) => {
    return { onPaginationChange: makeStateUpdater("pagination", table) }
  },
  constructTableAPIs: (table) => {
    assignTableAPIs("rowPaginationFeature", table, {
      table_autoResetPageIndex: { fn: () => table_autoResetPageIndex(table) },
      table_setPagination: { fn: (updater) => table_setPagination(table, updater) },
      table_resetPagination: { fn: (defaultState) => table_resetPagination(table, defaultState) },
      table_setPageIndex: { fn: (updater) => table_setPageIndex(table, updater) },
      table_resetPageIndex: { fn: (defaultState) => table_resetPageIndex(table, defaultState) },
      table_setPageSize: { fn: (updater) => table_setPageSize(table, updater) },
      table_getPageCount: { fn: () => table_getPageCount(table) },
      table_resetPageSize: { fn: (defaultState) => table_resetPageSize(table, defaultState) },
      table_getPageOptions: { fn: () => table_getPageOptions(table) },
      table_getCanPreviousPage: { fn: () => table_getCanPreviousPage(table) },
      table_getCanNextPage: { fn: () => table_getCanNextPage(table) },
      table_getCanLastPage: { fn: () => table_getCanLastPage(table) },
      table_previousPage: { fn: () => table_previousPage(table) },
      table_nextPage: { fn: () => table_nextPage(table) },
      table_firstPage: { fn: () => table_firstPage(table) },
      table_lastPage: { fn: () => table_lastPage(table) },
      table_getRowCount: { fn: () => table_getRowCount(table) },
    })
  },
}
//#endregion
//#region node_modules/.pnpm/@tanstack+table-core@9.1.2/node_modules/@tanstack/table-core/dist/features/row-sorting/rowSortingFeature.js
/**
 * Feature that adds row sorting state, defaults, and column/table sorting APIs.
 */
const rowSortingFeature = {
  getInitialState(initialState) {
    return {
      sorting: getDefaultSortingState(),
      ...initialState,
    }
  },
  getDefaultColumnDef() {
    return {
      sortFn: "auto",
      sortUndefined: 1,
    }
  },
  getDefaultTableOptions(table) {
    return {
      autoResetSorting: false,
      onSortingChange: makeStateUpdater("sorting", table),
      isMultiSortEvent: (e) => {
        return e.shiftKey
      },
    }
  },
  assignColumnPrototype(prototype, table) {
    assignPrototypeAPIs("rowSortingFeature", prototype, table, {
      column_getAutoSortFn: { fn: (column) => column_getAutoSortFn(column) },
      column_getAutoSortDir: { fn: (column) => column_getAutoSortDir(column) },
      column_getSortFn: { fn: (column) => column_getSortFn(column) },
      column_toggleSorting: {
        fn: (column, desc, multi) => column_toggleSorting(column, desc, multi),
      },
      column_getFirstSortDir: { fn: (column) => column_getFirstSortDir(column) },
      column_getNextSortingOrder: {
        fn: (column, multi) => column_getNextSortingOrder(column, multi),
      },
      column_getCanSort: { fn: (column) => column_getCanSort(column) },
      column_getCanMultiSort: { fn: (column) => column_getCanMultiSort(column) },
      column_getIsSorted: { fn: (column) => column_getIsSorted(column) },
      column_getSortIndex: { fn: (column) => column_getSortIndex(column) },
      column_clearSorting: { fn: (column) => column_clearSorting(column) },
      column_getToggleSortingHandler: { fn: (column) => column_getToggleSortingHandler(column) },
    })
  },
  constructTableAPIs(table) {
    assignTableAPIs("rowSortingFeature", table, {
      table_setSorting: { fn: (updater) => table_setSorting(table, updater) },
      table_resetSorting: { fn: (defaultState) => table_resetSorting(table, defaultState) },
    })
  },
}
//#endregion
//#region node_modules/.pnpm/@tanstack+table-core@9.1.2/node_modules/@tanstack/table-core/dist/features/column-filtering/filterRowsUtils.js
/**
 * Filters a row model with the supplied row predicate.
 *
 * The helper supports both filtering from leaf rows upward and filtering parents before descendants, depending on table options.
 */
function filterRows(rows, filterRowImpl, table) {
  if (table.options.filterFromLeafRows) return filterRowModelFromLeafs(rows, filterRowImpl, table)
  return filterRowModelFromRoot(rows, filterRowImpl, table)
}
function filterRowModelFromLeafs(rowsToFilter, filterRow, table) {
  const newFilteredFlatRows = []
  const newFilteredRowsById = makeObjectMap()
  const maxDepth = table.options.maxLeafRowFilterDepth ?? 100
  const recurseFilterRows = (rowsToFilter, depth = 0) => {
    const filteredRows = []
    for (let row of rowsToFilter) {
      const newRow = constructRow(
        table,
        row.id,
        row.original,
        row.index,
        row.depth,
        void 0,
        row.parentId,
      )
      newRow.columnFilters = row.columnFilters
      if (row.subRows.length > 0 && depth < maxDepth) {
        newRow.subRows = recurseFilterRows(row.subRows, depth + 1)
        row = newRow
        if (filterRow(row) && newRow.subRows.length === 0) {
          filteredRows.push(row)
          newFilteredRowsById[row.id] = row
          newFilteredFlatRows.push(row)
          continue
        }
        if (filterRow(row) || newRow.subRows.length > 0) {
          filteredRows.push(row)
          newFilteredRowsById[row.id] = row
          newFilteredFlatRows.push(row)
          continue
        }
      } else {
        row = newRow
        if (filterRow(row)) {
          filteredRows.push(row)
          newFilteredRowsById[row.id] = row
          newFilteredFlatRows.push(row)
        }
      }
    }
    return filteredRows
  }
  return {
    rows: recurseFilterRows(rowsToFilter),
    flatRows: newFilteredFlatRows,
    rowsById: newFilteredRowsById,
  }
}
function filterRowModelFromRoot(rowsToFilter, filterRow, table) {
  const newFilteredFlatRows = []
  const newFilteredRowsById = makeObjectMap()
  const maxDepth = table.options.maxLeafRowFilterDepth ?? 100
  const recurseFilterRows = (rowsToFilter, depth = 0) => {
    const filteredRows = []
    for (let row of rowsToFilter)
      if (filterRow(row)) {
        if (row.subRows.length > 0 && depth < maxDepth) {
          const newRow = constructRow(
            table,
            row.id,
            row.original,
            row.index,
            row.depth,
            void 0,
            row.parentId,
          )
          newRow.subRows = recurseFilterRows(row.subRows, depth + 1)
          row = newRow
        }
        filteredRows.push(row)
        newFilteredFlatRows.push(row)
        newFilteredRowsById[row.id] = row
        if (row.subRows.length > 0 && depth >= maxDepth)
          addSubRowsToFlatArrays(row.subRows, newFilteredFlatRows, newFilteredRowsById)
      }
    return filteredRows
  }
  return {
    rows: recurseFilterRows(rowsToFilter),
    flatRows: newFilteredFlatRows,
    rowsById: newFilteredRowsById,
  }
}
function addSubRowsToFlatArrays(subRows, flatRows, rowsById) {
  for (const subRow of subRows) {
    flatRows.push(subRow)
    rowsById[subRow.id] = subRow
    if (subRow.subRows.length > 0) addSubRowsToFlatArrays(subRow.subRows, flatRows, rowsById)
  }
}
//#endregion
//#region node_modules/.pnpm/@tanstack+table-core@9.1.2/node_modules/@tanstack/table-core/dist/features/column-filtering/createFilteredRowModel.js
/**
 * Creates a memoized filtered row model factory.
 *
 * The factory reads the relevant table state atoms and options, then returns a row model function used by the table row-model pipeline.
 *
 * Register the filter functions you use with the `filterFns` slot on the
 * `features` option:
 * `tableFeatures({ columnFilteringFeature, filteredRowModel: createFilteredRowModel(), filterFns: { includesString: filterFn_includesString } })`.
 * Importing individual `filterFn_*` functions keeps unused built-ins out of
 * your bundle; filter functions passed directly to the `filterFn` column
 * option need no registration at all.
 */
function createFilteredRowModel() {
  return (_table) => {
    const table = _table
    return tableMemo({
      feature: "columnFilteringFeature",
      table,
      fnName: "table.getFilteredRowModel",
      memoDeps: () => [
        table.getPreFilteredRowModel(),
        table.atoms.columnFilters?.get(),
        table.atoms.globalFilter?.get(),
      ],
      fn: () => _createFilteredRowModel(table),
      onAfterUpdate: skipFirstRun(() => table_autoResetPageIndex(table)),
    })
  }
}
function _createFilteredRowModel(table) {
  const rowModel = table.getPreFilteredRowModel()
  const columnFilters = table.atoms.columnFilters?.get()
  const globalFilter = table.atoms.globalFilter?.get()
  const hasGlobalFilter = globalFilter !== void 0 && globalFilter !== null && globalFilter !== ""
  if (rowModel.rows.length === 0 || (!columnFilters?.length && !hasGlobalFilter)) {
    const flatRows = rowModel.flatRows
    for (let i = 0; i < flatRows.length; i++) {
      const row = flatRows[i]
      row.columnFilters = makeObjectMap()
      row.columnFiltersMeta = makeObjectMap()
    }
    return rowModel
  }
  const resolvedColumnFilters = []
  const resolvedGlobalFilters = []
  columnFilters?.forEach((columnFilter) => {
    const column = table_getColumn(table, columnFilter.id)
    if (!column) return
    const filterFn = column_getFilterFn(column)
    if (!filterFn) return
    resolvedColumnFilters.push({
      id: columnFilter.id,
      filterFn,
      resolvedValue: filterFn.resolveFilterValue?.(columnFilter.value) ?? columnFilter.value,
    })
  })
  const filterableIds = columnFilters?.map((d) => d.id) ?? []
  const globalFilterFn = table_getGlobalFilterFn(table)
  const globallyFilterableColumns = table
    .getAllLeafColumns()
    .filter((column) => column_getCanGlobalFilter(column))
  if (hasGlobalFilter && globalFilterFn && globallyFilterableColumns.length > 0) {
    filterableIds.push("__global__")
    globallyFilterableColumns.forEach((column) => {
      resolvedGlobalFilters.push({
        id: column.id,
        filterFn: globalFilterFn,
        resolvedValue: globalFilterFn.resolveFilterValue?.(globalFilter) ?? globalFilter,
      })
    })
  }
  const flatRows = rowModel.flatRows
  for (let i = 0; i < flatRows.length; i++) {
    const row = flatRows[i]
    row.columnFilters = makeObjectMap()
    row.columnFiltersMeta = makeObjectMap()
    if (resolvedColumnFilters.length > 0)
      for (let j = 0; j < resolvedColumnFilters.length; j++) {
        const currentColumnFilter = resolvedColumnFilters[j]
        const id = currentColumnFilter.id
        row.columnFilters[id] = currentColumnFilter.filterFn(
          row,
          id,
          currentColumnFilter.resolvedValue,
          (filterMeta) => {
            if (!row.columnFiltersMeta) row.columnFiltersMeta = makeObjectMap()
            row.columnFiltersMeta[id] = filterMeta
          },
        )
      }
    if (resolvedGlobalFilters.length > 0) {
      for (let j = 0; j < resolvedGlobalFilters.length; j++) {
        const currentGlobalFilter = resolvedGlobalFilters[j]
        const id = currentGlobalFilter.id
        if (
          currentGlobalFilter.filterFn(row, id, currentGlobalFilter.resolvedValue, (filterMeta) => {
            if (!row.columnFiltersMeta) row.columnFiltersMeta = makeObjectMap()
            row.columnFiltersMeta[id] = filterMeta
          })
        ) {
          row.columnFilters.__global__ = true
          break
        }
      }
      if (row.columnFilters.__global__ !== true) row.columnFilters.__global__ = false
    }
  }
  const filterRowsImpl = (row) => {
    for (let i = 0; i < filterableIds.length; i++)
      if (row.columnFilters[filterableIds[i]] === false) return false
    return true
  }
  return filterRows(rowModel.rows, filterRowsImpl, table)
}
//#endregion
//#region node_modules/.pnpm/@tanstack+table-core@9.1.2/node_modules/@tanstack/table-core/dist/features/row-expanding/createExpandedRowModel.js
/**
 * Expands a row model according to the current expanded row state.
 *
 * Expanded sub-rows are inserted into the flattened row order while preserving the original row hierarchy.
 */
function expandRows(rowModel) {
  const expandedRows = []
  const handleRow = (row) => {
    expandedRows.push(row)
    if (row.subRows.length > 0 && row_getIsExpanded(row)) row.subRows.forEach(handleRow)
  }
  rowModel.rows.forEach(handleRow)
  return {
    rows: expandedRows,
    flatRows: rowModel.flatRows,
    rowsById: rowModel.rowsById,
  }
}
//#endregion
//#region node_modules/.pnpm/@tanstack+table-core@9.1.2/node_modules/@tanstack/table-core/dist/features/row-pagination/createPaginatedRowModel.js
/**
 * Creates a memoized paginated row model factory.
 *
 * The factory reads the relevant table state atoms and options, then returns a row model function used by the table row-model pipeline.
 */
function createPaginatedRowModel() {
  return (_table) => {
    const table = _table
    return tableMemo({
      feature: "rowPaginationFeature",
      table,
      fnName: "table.getPaginatedRowModel",
      memoDeps: () => [
        table.getPrePaginatedRowModel(),
        table.atoms.pagination?.get(),
        !table.options.paginateExpandedRows ? table.atoms.expanded?.get() : void 0,
      ],
      fn: () => _createPaginatedRowModel(table),
    })
  }
}
function _createPaginatedRowModel(table) {
  const prePaginatedRowModel = table.getPrePaginatedRowModel()
  const pagination = table.atoms.pagination?.get()
  if (prePaginatedRowModel.rows.length === 0) return prePaginatedRowModel
  const { pageSize, pageIndex } = pagination ?? getDefaultPaginationState()
  const { rows, flatRows, rowsById } = prePaginatedRowModel
  let paginatedRows = rows
  if (pageSize !== Infinity || pageIndex !== 0) {
    const pageStart = pageSize * pageIndex
    const pageEnd = pageStart + pageSize
    paginatedRows = rows.slice(pageStart, pageEnd)
  }
  let paginatedRowModel
  if (!table.options.paginateExpandedRows)
    paginatedRowModel = expandRows({
      rows: paginatedRows,
      flatRows,
      rowsById,
    })
  else
    paginatedRowModel = {
      rows: paginatedRows,
      flatRows,
      rowsById,
    }
  paginatedRowModel.flatRows = []
  const seenFlatRows = /* @__PURE__ */ new Set()
  const handleRow = (row) => {
    if (seenFlatRows.has(row.id)) return
    seenFlatRows.add(row.id)
    paginatedRowModel.flatRows.push(row)
    if (row.subRows.length > 0) row.subRows.forEach(handleRow)
  }
  paginatedRowModel.rows.forEach(handleRow)
  return paginatedRowModel
}
//#endregion
//#region node_modules/.pnpm/@tanstack+table-core@9.1.2/node_modules/@tanstack/table-core/dist/features/row-sorting/createSortedRowModel.js
/**
 * Creates a memoized sorted row model factory.
 *
 * The factory reads the relevant table state atoms and options, then returns a row model function used by the table row-model pipeline.
 *
 * Register the sorting functions you use with the `sortFns` slot on the
 * `features` option:
 * `tableFeatures({ rowSortingFeature, sortedRowModel: createSortedRowModel(), sortFns: { alphanumeric: sortFn_alphanumeric } })`.
 * Importing individual `sortFn_*` functions keeps unused built-ins out of
 * your bundle; sorting functions passed directly to the `sortFn` column
 * option need no registration at all.
 */
function createSortedRowModel() {
  return (_table) => {
    const table = _table
    return tableMemo({
      feature: "rowSortingFeature",
      table,
      fnName: "table.getSortedRowModel",
      memoDeps: () => [table.atoms.sorting?.get(), table.getPreSortedRowModel()],
      fn: () => _createSortedRowModel(table),
      onAfterUpdate: skipFirstRun(() => table_autoResetPageIndex(table)),
    })
  }
}
function _createSortedRowModel(table) {
  const preSortedRowModel = table.getPreSortedRowModel()
  const sorting = table.atoms.sorting?.get()
  if (preSortedRowModel.rows.length === 0 || !sorting?.length) return preSortedRowModel
  const sortedFlatRows = []
  const availableSorting = sorting.filter((sort) => {
    const column = table.getColumn(sort.id)
    return column ? column_getCanSort(column) : false
  })
  if (availableSorting.length === 0) return preSortedRowModel
  const resolvedSorting = []
  for (let i = 0; i < availableSorting.length; i++) {
    const sortEntry = availableSorting[i]
    const column = table.getColumn(sortEntry.id)
    if (!column) continue
    resolvedSorting.push({
      id: sortEntry.id,
      desc: sortEntry.desc,
      sortUndefined: column.columnDef.sortUndefined,
      invertSorting: column.columnDef.invertSorting,
      sortFn: column_getSortFn(column),
    })
  }
  const compareRows = (rowA, rowB) => {
    for (let i = 0; i < resolvedSorting.length; i++) {
      const sortEntry = resolvedSorting[i]
      const sortUndefined = sortEntry.sortUndefined
      const isDesc = sortEntry.desc
      let sortInt = 0
      if (sortUndefined) {
        const aValue = rowA.getValue(sortEntry.id)
        const bValue = rowB.getValue(sortEntry.id)
        const aUndefined = aValue === void 0
        const bUndefined = bValue === void 0
        if (aUndefined && bUndefined) continue
        if (aUndefined || bUndefined) {
          if (sortUndefined === "first") return aUndefined ? -1 : 1
          if (sortUndefined === "last") return aUndefined ? 1 : -1
          sortInt = aUndefined ? sortUndefined : -sortUndefined
        }
      }
      if (sortInt === 0) sortInt = sortEntry.sortFn(rowA, rowB, sortEntry.id)
      if (sortInt !== 0) {
        if (isDesc) sortInt *= -1
        if (sortEntry.invertSorting) sortInt *= -1
        return sortInt
      }
    }
    return rowA.index - rowB.index
  }
  const sortData = (rows) => {
    const sortedData = [...rows]
    sortedData.sort(compareRows)
    let changed = false
    for (let i = 0; i < sortedData.length; i++) {
      const row = sortedData[i]
      if (row !== rows[i]) changed = true
      const flatIndex = sortedFlatRows.length
      sortedFlatRows.push(row)
      if (row.subRows.length > 0) {
        const sortedSubRows = sortData(row.subRows)
        if (sortedSubRows.changed) {
          const cloned = Object.create(Object.getPrototypeOf(row))
          copyInstancePropertiesWithoutMemos(cloned, row)
          cloned.subRows = sortedSubRows.rows
          sortedData[i] = cloned
          sortedFlatRows[flatIndex] = cloned
          changed = true
        }
      }
    }
    return {
      rows: sortedData,
      changed,
    }
  }
  return {
    rows: sortData(preSortedRowModel.rows).rows,
    flatRows: sortedFlatRows,
    rowsById: preSortedRowModel.rowsById,
  }
}
//#endregion
//#region node_modules/.pnpm/@tanstack+react-table@9.1.2_d1d1cb6473c28c7e1a20fba9df5bced2/node_modules/@tanstack/react-table/dist/useTable.js
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? import_react.useEffect : import_react.useLayoutEffect
/**
 * Creates a React table instance backed by TanStack Store atoms.
 *
 * The optional selector projects from `table.store`; the selected value is
 * exposed on `table.state` and compared shallowly for React re-renders. Omit
 * the selector to subscribe to every registered table state slice, or pass a
 * narrower selector and use `table.Subscribe` lower in the tree for targeted
 * subscriptions.
 *
 * @example
 * ```tsx
 * const table = useTable(
 *   {
 *     features,
 *     columns,
 *     data,
 *   },
 *   (state) => ({ pagination: state.pagination }),
 * )
 *
 * table.state.pagination
 * ```
 */
function useTable(tableOptions, selector) {
  const [{ table, rootSource }] = (0, import_react.useState)(() => {
    const tableInstance = constructTable({
      ...tableOptions,
      features: {
        coreReactivityFeature: reactReactivity(),
        ...tableOptions.features,
      },
    })
    tableInstance.Subscribe = (props) => {
      return Subscribe({
        ...props,
        source: props.source ?? tableInstance.store,
      })
    }
    tableInstance.FlexRender = FlexRender
    return {
      table: tableInstance,
      rootSource: createRenderPhaseSource(tableInstance.store, shallow),
    }
  })
  const coreTable = table
  table_setOptions(
    coreTable,
    (prev) => ({
      ...prev,
      ...tableOptions,
    }),
    { syncExternalState: false },
  )
  const controlledState = coreTable.options.state
  const renderSnapshot = rootSource.get()
  const state = useSelector(rootSource, selector, { compare: shallow })
  useIsomorphicLayoutEffect(() => {
    rootSource.markCommitted(renderSnapshot)
    table_publishExternalState(coreTable, controlledState ?? null, shallow)
  })
  return (0, import_react.useMemo)(
    () => ({
      ...table,
      options: tableOptions,
      state,
    }),
    [table, tableOptions, state],
  )
}
//#endregion
//#region src/components/ui/badge.tsx
const badgeVariants = tv({
  base: "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-none border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,background-color,border-color,outline-color,box-shadow,opacity,translate] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
      secondary: "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
      destructive:
        "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
      outline: "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
      ghost: "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
      link: "text-primary underline-offset-4 hover:underline",
    },
  },
  defaultVariants: { variant: "default" },
})
function Badge({ className, variant = "default", render, ...props }) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps({ className: cn(badgeVariants({ variant }), className) }, props),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}
//#endregion
//#region src/components/ui/table.tsx
function Table({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    "data-slot": "table-container",
    "className": "relative w-full overflow-x-auto",
    "children": /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
      "data-slot": "table",
      "className": cn("w-full caption-bottom text-xs", className),
      ...props,
    }),
  })
}
function TableHeader({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
    "data-slot": "table-header",
    "className": cn("[&_tr]:border-b", className),
    ...props,
  })
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
    "data-slot": "table-body",
    "className": cn("[&_tr:last-child]:border-0", className),
    ...props,
  })
}
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
    "data-slot": "table-row",
    "className": cn(
      "border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted",
      className,
    ),
    ...props,
  })
}
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
    "data-slot": "table-head",
    "className": cn(
      "h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0",
      className,
    ),
    ...props,
  })
}
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
    "data-slot": "table-cell",
    "className": cn("p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0", className),
    ...props,
  })
}
//#endregion
//#region src/features/extract/node-table.tsx
const features = tableFeatures({
  columnFilteringFeature,
  rowPaginationFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
  filterFns: {
    equalsString: filterFn_equalsString,
    includesString: filterFn_includesString,
  },
  sortFns: { text: sortFn_text },
})
const columnHelper = createColumnHelper()
function SortableHeader({ label, column }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
    variant: "ghost",
    size: "xs",
    onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
    children: [
      label,
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconArrowsSort, { "data-icon": "inline-end" }),
    ],
  })
}
const columns = columnHelper.columns([
  columnHelper.accessor("name", {
    header: ({ column }) =>
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableHeader, {
        label: "名称",
        column,
      }),
    cell: ({ row }) =>
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
        className: "block max-w-48 truncate font-medium",
        children: row.original.name,
      }),
    filterFn: "includesString",
    sortFn: "text",
  }),
  columnHelper.accessor("type", {
    header: ({ column }) =>
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableHeader, {
        label: "协议",
        column,
      }),
    cell: ({ row }) =>
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
        variant: "secondary",
        children: row.original.type,
      }),
    filterFn: "equalsString",
    sortFn: "text",
  }),
  columnHelper.accessor("server", {
    header: ({ column }) =>
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableHeader, {
        label: "服务器",
        column,
      }),
    cell: ({ row }) =>
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
        className: "block max-w-56 truncate font-mono text-xs",
        children: [row.original.server, ":", row.original.port],
      }),
    sortFn: "text",
  }),
])
function NodeTable({ className, nodes }) {
  const [sorting, setSorting] = (0, import_react.useState)([])
  const [columnFilters, setColumnFilters] = (0, import_react.useState)([])
  const protocolOptions = [
    {
      label: "全部协议",
      value: "all",
    },
    ...[...new Set(nodes.map((node) => node.type))].toSorted().map((protocol) => ({
      label: protocol,
      value: protocol,
    })),
  ]
  const table = useTable({
    features,
    columns,
    data: nodes,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  })
  const filteredCount = table.getFilteredRowModel().rows.length
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    className: cn("flex flex-col gap-4", className),
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldGroup, {
        className: "gap-4 flex-row",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
                htmlFor: "node-name-filter",
                children: "搜索名称",
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                id: "node-name-filter",
                placeholder: "输入节点名称…",
                value: table.getColumn("name")?.getFilterValue() ?? "",
                onChange: (event) => table.getColumn("name")?.setFilterValue(event.target.value),
              }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
                htmlFor: "node-type-filter",
                children: "协议",
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
                items: protocolOptions,
                value: table.getColumn("type")?.getFilterValue() || "all",
                onValueChange: (value) =>
                  table.getColumn("type")?.setFilterValue(!value || value === "all" ? "" : value),
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
                    id: "node-type-filter",
                    className: "min-w-32",
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}),
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup, {
                      children: protocolOptions.map((option) =>
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                          SelectItem,
                          {
                            value: option.value,
                            children: option.label,
                          },
                          option.value,
                        ),
                      ),
                    }),
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
        className: "min-h-0 flex-1 overflow-y-auto",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
              children: table
                .getHeaderGroups()
                .map((headerGroup) =>
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    TableRow,
                    {
                      children: headerGroup.headers.map((header) =>
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                          TableHead,
                          {
                            children: header.isPlaceholder
                              ? null
                              : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(table.FlexRender, {
                                  header,
                                }),
                          },
                          header.id,
                        ),
                      ),
                    },
                    headerGroup.id,
                  ),
                ),
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
              children:
                table.getRowModel().rows.length > 0
                  ? table
                      .getRowModel()
                      .rows.map((row) =>
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                          TableRow,
                          {
                            children: row
                              .getAllCells()
                              .map((cell) =>
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                  TableCell,
                                  {
                                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                      table.FlexRender,
                                      { cell },
                                    ),
                                  },
                                  cell.id,
                                ),
                              ),
                          },
                          row.id,
                        ),
                      )
                  : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
                      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                        colSpan: columns.length,
                        className: "h-28 text-center text-muted-foreground",
                        children: "没有匹配的节点。",
                      }),
                    }),
            }),
          ],
        }),
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        className:
          "flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
            children: [
              filteredCount,
              " 个节点 · 第 ",
              table.state.pagination.pageIndex + 1,
              " /",
              " ",
              Math.max(table.getPageCount(), 1),
              " 页",
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className: "flex gap-2",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                "variant": "outline",
                "size": "icon-xs",
                "aria-label": "上一页",
                "onClick": () => table.previousPage(),
                "disabled": !table.getCanPreviousPage(),
                "children": /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconChevronLeft, {}),
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                "variant": "outline",
                "size": "icon-xs",
                "aria-label": "下一页",
                "onClick": () => table.nextPage(),
                "disabled": !table.getCanNextPage(),
                "children": /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconChevronRight, {}),
              }),
            ],
          }),
        ],
      }),
    ],
  })
}
//#endregion
//#region src/shared/web-worker.ts
/**
 * A worker script the page is not allowed to load — a CSP without `worker-src`, a bundle a proxy
 * blocked — must not take the page down with it. Kept outside the hook so the caught error does not
 * shadow the failure this reports through.
 */
function createWorker(factory) {
  try {
    return {
      worker: factory(),
      failure: null,
    }
  } catch (error) {
    return {
      worker: null,
      failure: error instanceof Error ? error.message : "Worker could not be created",
    }
  }
}
/**
 * Owns a worker the bundler built: created once on mount, latest message and error tracked,
 * terminated on unmount.
 *
 * A factory rather than a source string, deliberately: a worker that has to import anything cannot
 * come from a string, because a Blob URL has no module graph to resolve against. Only the caller can
 * write the expression a bundler recognises — `new Worker(new URL("./x.worker.ts", import.meta.url),
 * { type: "module" })` — so only the caller can hand over the worker itself.
 *
 * `create` is read through a ref: an inline arrow would otherwise be a new function every render and
 * rebuild the worker with it. The ref is written in an effect rather than while rendering, so a
 * render React throws away cannot leave the latest factory behind. Mount order covers the first
 * pass — `useRef(create)` already holds it before any effect runs. `post` and `terminate` are stable
 * for the same reason `create` is, so an effect may depend on them.
 */
function useWebWorker(create) {
  const factory = (0, import_react.useRef)(create)
  const workerRef = (0, import_react.useRef)(null)
  const [data, setData] = (0, import_react.useState)(null)
  const [error, setError] = (0, import_react.useState)(null)
  const isSupported = typeof Worker !== "undefined"
  ;(0, import_react.useEffect)(() => {
    factory.current = create
  })
  ;(0, import_react.useEffect)(() => {
    if (!isSupported) return
    const created = createWorker(factory.current)
    if (!created.worker) {
      setError(created.failure)
      return
    }
    const worker = created.worker
    workerRef.current = worker
    worker.addEventListener("message", (event) => setData(event.data))
    worker.addEventListener("error", (event) =>
      setError(event.message || "Worker execution failed"),
    )
    return () => {
      worker.terminate()
      workerRef.current = null
    }
  }, [isSupported])
  return {
    isSupported,
    data,
    error,
    post: (0, import_react.useCallback)((payload) => {
      const worker = workerRef.current
      if (!worker) return false
      worker.postMessage(payload)
      return true
    }, []),
    terminate: (0, import_react.useCallback)(() => {
      workerRef.current?.terminate()
      workerRef.current = null
    }, []),
  }
}
//#endregion
export {
  IconChevronDown as $,
  mergeRuleChain as A,
  SelectGroup as B,
  useSubscriptionSnapshot as C,
  RuleChain as D,
  RuleChainForm as E,
  CollapsibleContent as F,
  CompositeList as G,
  SelectTrigger as H,
  CollapsibleTrigger as I,
  IconListDetails as J,
  isElementDisabled as K,
  Textarea as L,
  splitProcessors as M,
  Switch as N,
  describeProcessor as O,
  Collapsible as P,
  IconChevronRight as Q,
  Select as R,
  useSubscription as S,
  createSsrRpc as T,
  SelectValue as U,
  SelectItem as V,
  useCompositeListItem as W,
  IconClipboard as X,
  IconLink as Y,
  IconChevronUp as Z,
  useRenameSubscription as _,
  TableCell as a,
  useSaveSubscription as b,
  TableRow as c,
  splitSourceUrls as d,
  IconCheck as et,
  SOURCE_TYPE_LABELS as f,
  useRemoveSubscription as g,
  useRegisterSubscriptionLink as h,
  TableBody as i,
  ruleChainToProcessors as j,
  EMPTY_RULE_CHAIN as k,
  DEFAULT_TARGET as l,
  useCopySubscriptionLink as m,
  NodeTable as n,
  useSelector as nt,
  TableHead as o,
  useAppendSubscriptionNodes as p,
  ButtonGroup as q,
  Table as r,
  TableHeader as s,
  useWebWorker as t,
  useMutation as tt,
  TARGET_OPTIONS as u,
  useReorderSubscriptions as v,
  useSubscriptions as w,
  useSetSubscriptionEnabled as x,
  useRotateToken as y,
  SelectContent as z,
}
