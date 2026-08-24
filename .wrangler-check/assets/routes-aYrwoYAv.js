import { t as adminFunctionMiddleware } from "./admin-function-D_xAk7Bk.js"
import { c as require_react, u as __toESM } from "./createMiddleware-CkzUAgXb.js"
import { t as createServerFn } from "./createServerFn-DRD1-jCn.js"
import { N as useTokenUsable, t as compileNodeList } from "./nodes-b2qYjNQG.js"
import { d as require_jsx_runtime } from "./react-dom-C7iwyEt6.js"
import {
  $ as showSuccess,
  $t as transitionStatusMapping,
  B as ARROW_RIGHT,
  Bn as useIsoLayoutEffect,
  D as useMediaQuery,
  F as useControlled,
  Ft as initial,
  G as isNativeInput,
  Gt as CompositeRootContext,
  H as COMPOSITE_KEYS,
  Hn as EMPTY_ARRAY$1,
  J as useBaseUiId,
  K as scrollIntoViewIfNeeded,
  Kt as useCompositeRootContext,
  Ln as useStableCallback,
  Mn as ownerDocument,
  Nt as disabled,
  Q as showError,
  R as ARROW_DOWN,
  Rt as missing,
  Un as EMPTY_OBJECT,
  Ut as useButton,
  V as ARROW_UP,
  W as MODIFIER_KEYS,
  Xt as useOpenChangeComplete,
  _t as useDirection,
  a as EmptyDescription,
  bn as contains,
  br as getRouteApi,
  bt as useTransitionStatus,
  c as EmptyTitle,
  cn as getMaxListIndex,
  dn as isIndexOutOfListBounds,
  en as inertValue,
  fn as isListIndexDisabled,
  in as useMergedRefs,
  it as tv,
  jt as createChangeEventDetails,
  l as AppShell,
  ln as getMinListIndex,
  lt as IconAlertTriangle,
  n as ConnectionGate,
  o as EmptyHeader,
  r as Empty,
  rt as cn,
  s as EmptyMedia,
  sn as findNonDisabledListIndex,
  tn as useRenderElement,
  tt as Button,
  ut as createReactComponent,
  xn as getTarget,
  yn as activeElement,
  z as ARROW_LEFT,
  zn as formatErrorMessage,
  zt as none,
} from "./shell-CGXDXMPw.js"
import {
  B as SelectGroup,
  D as RuleChain,
  G as CompositeList,
  H as SelectTrigger,
  J as IconListDetails,
  K as isElementDisabled,
  L as Textarea,
  R as Select,
  T as createSsrRpc,
  U as SelectValue,
  V as SelectItem,
  W as useCompositeListItem,
  X as IconClipboard,
  Y as IconLink,
  Z as IconChevronUp,
  b as useSaveSubscription,
  d as splitSourceUrls,
  et as IconCheck,
  f as SOURCE_TYPE_LABELS,
  j as ruleChainToProcessors,
  k as EMPTY_RULE_CHAIN,
  l as DEFAULT_TARGET,
  n as NodeTable,
  q as ButtonGroup,
  t as useWebWorker,
  tt as useMutation,
  u as TARGET_OPTIONS,
  z as SelectContent,
} from "./web-worker-Bdzv_Tz9.js"
/**
 * @license @tabler/icons-react v3.46.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const IconCode = createReactComponent("outline", "code", "Code", [
  [
    "path",
    {
      d: "M7 8l-4 4l4 4",
      key: "svg-0",
    },
  ],
  [
    "path",
    {
      d: "M17 8l4 4l-4 4",
      key: "svg-1",
    },
  ],
  [
    "path",
    {
      d: "M14 4l-4 16",
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
const IconDownload = createReactComponent("outline", "download", "Download", [
  [
    "path",
    {
      d: "M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2",
      key: "svg-0",
    },
  ],
  [
    "path",
    {
      d: "M7 11l5 5l5 -5",
      key: "svg-1",
    },
  ],
  [
    "path",
    {
      d: "M12 4l0 12",
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
const IconSparkles = createReactComponent("outline", "sparkles", "Sparkles", [
  [
    "path",
    {
      d: "M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2m0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2m-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6",
      key: "svg-0",
    },
  ],
])
//#endregion
//#region src/components/ui/alert.tsx
const import_react = /* @__PURE__ */ __toESM(require_react(), 1)
const import_jsx_runtime = require_jsx_runtime()
const alertVariants = tv({
  base: "group/alert relative grid w-full gap-0.5 rounded-none border px-2.5 py-2 text-left text-xs has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 *:[svg]:row-span-2 *:[svg]:translate-y-0 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4",
  variants: {
    variant: {
      default: "bg-card text-card-foreground",
      destructive:
        "bg-card text-destructive *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-current",
    },
  },
  defaultVariants: { variant: "default" },
})
function Alert({ className, variant, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    "data-slot": "alert",
    "role": "alert",
    "className": cn(alertVariants({ variant }), className),
    ...props,
  })
}
function AlertTitle({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    "data-slot": "alert-title",
    "className": cn(
      "font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
      className,
    ),
    ...props,
  })
}
function AlertDescription({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    "data-slot": "alert-description",
    "className": cn(
      "text-xs/relaxed text-balance text-muted-foreground md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-2",
      className,
    ),
    ...props,
  })
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/tabs/root/TabsRootContext.mjs
/**
 * @internal
 */
const TabsRootContext = /*#__PURE__*/ import_react.createContext(void 0)
function useTabsRootContext() {
  const context = import_react.useContext(TabsRootContext)
  if (context === void 0) throw new Error(formatErrorMessage(64))
  return context
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/tabs/root/stateAttributesMapping.mjs
const tabsStateAttributesMapping = {
  tabActivationDirection: (dir) => ({ "data-activation-direction": dir }),
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/tabs/root/TabsRoot.mjs
/**
 * Groups the tabs and the corresponding panels.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Tabs](https://base-ui.com/react/components/tabs)
 */
const TabsRoot = /*#__PURE__*/ import_react.forwardRef(
  function TabsRoot(componentProps, forwardedRef) {
    const {
      className,
      defaultValue: defaultValueProp = 0,
      onValueChange: onValueChangeProp,
      orientation = "horizontal",
      render,
      value: valueProp,
      style,
      ...elementProps
    } = componentProps
    const hasExplicitDefaultValueProp = componentProps.defaultValue !== void 0
    const tabPanelRefs = import_react.useRef([])
    const [mountedTabPanels, setMountedTabPanels] = import_react.useState(
      () => /* @__PURE__ */ new Map(),
    )
    const [value, setValue] = useControlled({
      controlled: valueProp,
      default: defaultValueProp,
      name: "Tabs",
      state: "value",
    })
    const isControlled = valueProp !== void 0
    const [tabMap, setTabMap] = import_react.useState(() => /* @__PURE__ */ new Map())
    const lastKnownTabElementRef = import_react.useRef(void 0)
    const getTabElementBySelectedValue = import_react.useCallback(
      (selectedValue) => findTabElement(tabMap, selectedValue),
      [tabMap],
    )
    const [activationDirectionState, setActivationDirectionState] = import_react.useState(() => ({
      previousValue: value,
      tabActivationDirection: "none",
    }))
    const { previousValue, tabActivationDirection: committedTabActivationDirection } =
      activationDirectionState
    let tabActivationDirection = committedTabActivationDirection
    let directionComputationIncomplete = false
    if (previousValue !== value) {
      tabActivationDirection = computeActivationDirection(previousValue, value, orientation, tabMap)
      directionComputationIncomplete =
        previousValue != null && value != null && getTabElementBySelectedValue(value) == null
    }
    const nextPreviousValue = directionComputationIncomplete ? previousValue : value
    const shouldSyncActivationDirectionState =
      previousValue !== nextPreviousValue ||
      committedTabActivationDirection !== tabActivationDirection
    useIsoLayoutEffect(() => {
      if (!shouldSyncActivationDirectionState) return
      setActivationDirectionState({
        previousValue: nextPreviousValue,
        tabActivationDirection,
      })
    }, [nextPreviousValue, shouldSyncActivationDirectionState, tabActivationDirection])
    const onValueChange = useStableCallback((newValue, eventDetails) => {
      eventDetails.activationDirection = computeActivationDirection(
        value,
        newValue,
        orientation,
        tabMap,
      )
      onValueChangeProp?.(newValue, eventDetails)
      if (eventDetails.isCanceled) return
      setValue(newValue)
    })
    const notifyAutomaticValueChange = useStableCallback((nextValue, reason) => {
      onValueChangeProp?.(
        nextValue,
        createChangeEventDetails(reason, void 0, void 0, { activationDirection: "none" }),
      )
    })
    const registerMountedTabPanel = useStableCallback((panelValue, panelId) => {
      setMountedTabPanels((prev) => {
        const next = new Map(prev)
        next.set(panelValue, panelId)
        return next
      })
      return () => {
        setMountedTabPanels((prev) => {
          if (prev.get(panelValue) !== panelId) return prev
          const next = new Map(prev)
          next.delete(panelValue)
          return next
        })
      }
    })
    const getTabPanelIdByValue = import_react.useCallback(
      (tabValue) => {
        return mountedTabPanels.get(tabValue)
      },
      [mountedTabPanels],
    )
    const getTabIdByPanelValue = import_react.useCallback(
      (tabPanelValue) => {
        for (const tabMetadata of tabMap.values())
          if (tabPanelValue === tabMetadata.value) return tabMetadata.id
      },
      [tabMap],
    )
    const tabsContextValue = import_react.useMemo(
      () => ({
        getTabElementBySelectedValue,
        getTabIdByPanelValue,
        getTabPanelIdByValue,
        onValueChange,
        orientation,
        registerMountedTabPanel,
        setTabMap,
        tabActivationDirection,
        value,
      }),
      [
        getTabElementBySelectedValue,
        getTabIdByPanelValue,
        getTabPanelIdByValue,
        onValueChange,
        orientation,
        registerMountedTabPanel,
        setTabMap,
        tabActivationDirection,
        value,
      ],
    )
    const selectedTabMetadata = import_react.useMemo(() => {
      for (const tabMetadata of tabMap.values()) if (tabMetadata.value === value) return tabMetadata
    }, [tabMap, value])
    const firstEnabledTabValue = import_react.useMemo(() => {
      for (const tabMetadata of tabMap.values()) if (!tabMetadata.disabled) return tabMetadata.value
    }, [tabMap])
    const shouldNotifyInitialValueChangeRef = import_react.useRef(!hasExplicitDefaultValueProp)
    const initialDefaultValueRef = import_react.useRef(defaultValueProp)
    const shouldHonorDisabledDefaultValueRef = import_react.useRef(hasExplicitDefaultValueProp)
    const didRegisterTabsRef = import_react.useRef(false)
    useIsoLayoutEffect(() => {
      if (isControlled) return
      function commitAutomaticValueChange(fallbackValue, fallbackReason) {
        setValue(fallbackValue)
        setActivationDirectionState({
          previousValue: fallbackValue,
          tabActivationDirection: "none",
        })
        notifyAutomaticValueChange(fallbackValue, fallbackReason)
        shouldNotifyInitialValueChangeRef.current = false
      }
      if (tabMap.size === 0) {
        if (
          didRegisterTabsRef.current &&
          value !== null &&
          !lastKnownTabElementRef.current?.isConnected
        )
          commitAutomaticValueChange(null, missing)
        return
      }
      didRegisterTabsRef.current = true
      lastKnownTabElementRef.current = tabMap.keys().next().value
      const selectionIsDisabled = selectedTabMetadata?.disabled
      const selectionIsMissing = selectedTabMetadata == null && value !== null
      if (!selectionIsDisabled && value === initialDefaultValueRef.current)
        shouldHonorDisabledDefaultValueRef.current = false
      if (
        shouldHonorDisabledDefaultValueRef.current &&
        selectionIsDisabled &&
        value === initialDefaultValueRef.current
      )
        return
      const shouldNotifyInitialValueChange = shouldNotifyInitialValueChangeRef.current
      if (selectionIsDisabled || selectionIsMissing) {
        const fallbackValue = firstEnabledTabValue ?? null
        if (value === fallbackValue) {
          shouldNotifyInitialValueChangeRef.current = false
          return
        }
        let fallbackReason = missing
        if (shouldNotifyInitialValueChange) fallbackReason = initial
        else if (selectionIsDisabled) fallbackReason = disabled
        commitAutomaticValueChange(fallbackValue, fallbackReason)
        return
      }
      if (shouldNotifyInitialValueChange && selectedTabMetadata != null) {
        notifyAutomaticValueChange(value, initial)
        shouldNotifyInitialValueChangeRef.current = false
      }
    }, [
      firstEnabledTabValue,
      isControlled,
      notifyAutomaticValueChange,
      selectedTabMetadata,
      setValue,
      tabMap,
      value,
    ])
    const element = useRenderElement("div", componentProps, {
      state: {
        orientation,
        tabActivationDirection,
      },
      ref: forwardedRef,
      props: elementProps,
      stateAttributesMapping: tabsStateAttributesMapping,
    })
    return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(TabsRootContext.Provider, {
      value: tabsContextValue,
      children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(CompositeList, {
        elementsRef: tabPanelRefs,
        children: element,
      }),
    })
  },
)
function findTabElement(tabMap, value) {
  for (const [tabElement, tabMetadata] of tabMap.entries())
    if (value === tabMetadata.value) return tabElement
  return null
}
function computeActivationDirection(oldValue, newValue, orientation, tabMap) {
  if (oldValue == null || newValue == null) return "none"
  const [positionProp, backward, forward] =
    orientation === "horizontal" ? ["left", "left", "right"] : ["top", "up", "down"]
  const oldTab = findTabElement(tabMap, oldValue)
  const newTab = findTabElement(tabMap, newValue)
  if (oldTab == null || newTab == null) {
    if (
      oldTab !== newTab &&
      (typeof oldValue === "number" || typeof oldValue === "string") &&
      typeof oldValue === typeof newValue
    )
      return newValue > oldValue ? forward : backward
    return "none"
  }
  const oldPosition = oldTab.getBoundingClientRect()[positionProp]
  const newPosition = newTab.getBoundingClientRect()[positionProp]
  if (newPosition < oldPosition) return backward
  if (newPosition > oldPosition) return forward
  return "none"
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/internals/composite/constants.mjs
const ACTIVE_COMPOSITE_ITEM = "data-composite-item-active"
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/internals/composite/item/useCompositeItem.mjs
function useCompositeItem(params = {}) {
  const { highlightItemOnHover, highlightedIndex, onHighlightedIndexChange } =
    useCompositeRootContext()
  const { ref, index } = useCompositeListItem(params)
  const isHighlighted = highlightedIndex === index
  const itemRef = import_react.useRef(null)
  const mergedRef = useMergedRefs(ref, itemRef)
  return {
    compositeProps: {
      tabIndex: isHighlighted ? 0 : -1,
      onFocus() {
        onHighlightedIndexChange(index)
      },
      onMouseMove() {
        const item = itemRef.current
        if (!highlightItemOnHover || !item) return
        const disabled = item.hasAttribute("disabled") || item.ariaDisabled === "true"
        if (!isHighlighted && !disabled) item.focus()
      },
    },
    compositeRef: mergedRef,
    index,
  }
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/tabs/list/TabsListContext.mjs
const TabsListContext = /*#__PURE__*/ import_react.createContext(void 0)
function useTabsListContext() {
  const context = import_react.useContext(TabsListContext)
  if (context === void 0) throw new Error(formatErrorMessage(65))
  return context
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/tabs/tab/TabsTab.mjs
/**
 * An individual interactive tab button that toggles the corresponding panel.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Tabs](https://base-ui.com/react/components/tabs)
 */
const TabsTab = /*#__PURE__*/ import_react.forwardRef(
  function TabsTab(componentProps, forwardedRef) {
    const {
      className,
      disabled = false,
      render,
      value,
      id: idProp,
      nativeButton = true,
      style,
      ...elementProps
    } = componentProps
    const {
      value: activeTabValue,
      getTabPanelIdByValue,
      onValueChange,
      orientation,
      tabActivationDirection,
    } = useTabsRootContext()
    const { activateOnFocus, registerTabResizeObserverElement, tabsListElement } =
      useTabsListContext()
    const { highlightedIndex, onHighlightedIndexChange } = useCompositeRootContext()
    const id = useBaseUiId(idProp)
    const { compositeProps, compositeRef, index } = useCompositeItem({
      metadata: import_react.useMemo(
        () => ({
          disabled,
          id,
          value,
        }),
        [disabled, id, value],
      ),
    })
    const active = value === activeTabValue
    const isNavigatingRef = import_react.useRef(false)
    const unobserveTabElementRef = import_react.useRef(null)
    const observeTabElement = useStableCallback((element) => {
      unobserveTabElementRef.current?.()
      unobserveTabElementRef.current = element ? registerTabResizeObserverElement(element) : null
    })
    useIsoLayoutEffect(() => {
      if (isNavigatingRef.current) {
        isNavigatingRef.current = false
        return
      }
      if (!(active && index > -1 && highlightedIndex !== index)) return
      const listElement = tabsListElement
      if (listElement != null) {
        const activeEl = activeElement(ownerDocument(listElement))
        if (activeEl && contains(listElement, activeEl)) return
      }
      if (!disabled) onHighlightedIndexChange(index)
    }, [active, index, highlightedIndex, onHighlightedIndexChange, disabled, tabsListElement])
    const { getButtonProps, buttonRef } = useButton({
      disabled,
      native: nativeButton,
      focusableWhenDisabled: true,
    })
    const tabPanelId = getTabPanelIdByValue(value)
    const isPressingRef = import_react.useRef(false)
    const isMainButtonRef = import_react.useRef(false)
    function activate(event) {
      onValueChange(
        value,
        createChangeEventDetails(none, event.nativeEvent, void 0, { activationDirection: "none" }),
      )
    }
    function onClick(event) {
      if (active || disabled) return
      activate(event)
    }
    function onFocus(event) {
      if (active || disabled) return
      if (activateOnFocus && (!isPressingRef.current || isMainButtonRef.current)) activate(event)
    }
    function onPointerDown(event) {
      if (active || disabled) return
      isPressingRef.current = true
      isMainButtonRef.current = event.button === 0
      const doc = ownerDocument(event.currentTarget)
      function handlePointerEnd() {
        isPressingRef.current = false
        isMainButtonRef.current = false
        doc.removeEventListener("pointerup", handlePointerEnd)
        doc.removeEventListener("pointercancel", handlePointerEnd)
      }
      doc.addEventListener("pointerup", handlePointerEnd)
      doc.addEventListener("pointercancel", handlePointerEnd)
    }
    return useRenderElement("button", componentProps, {
      state: {
        disabled,
        active,
        orientation,
        tabActivationDirection,
      },
      ref: [forwardedRef, buttonRef, compositeRef, observeTabElement],
      props: [
        compositeProps,
        {
          "role": "tab",
          "aria-controls": tabPanelId,
          "aria-selected": active,
          id,
          onClick,
          onFocus,
          onPointerDown,
          [ACTIVE_COMPOSITE_ITEM]: active ? "" : void 0,
          "onKeyDownCapture"() {
            isNavigatingRef.current = true
          },
        },
        elementProps,
        getButtonProps,
      ],
      stateAttributesMapping: tabsStateAttributesMapping,
    })
  },
)
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/tabs/panel/TabsPanel.mjs
const stateAttributesMapping = {
  ...tabsStateAttributesMapping,
  ...transitionStatusMapping,
}
/**
 * A panel displayed when the corresponding tab is active.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Tabs](https://base-ui.com/react/components/tabs)
 */
const TabsPanel = /*#__PURE__*/ import_react.forwardRef(
  function TabsPanel(componentProps, forwardedRef) {
    const { className, value, render, keepMounted = false, style, ...elementProps } = componentProps
    const {
      value: selectedValue,
      getTabIdByPanelValue,
      orientation,
      tabActivationDirection,
      registerMountedTabPanel,
    } = useTabsRootContext()
    const id = useBaseUiId()
    const { ref: listItemRef, index } = useCompositeListItem()
    const open = value === selectedValue
    const { mounted, transitionStatus, setMounted } = useTransitionStatus(open)
    const hidden = !mounted
    const correspondingTabId = getTabIdByPanelValue(value)
    const state = {
      hidden,
      orientation,
      tabActivationDirection,
      transitionStatus,
    }
    const panelRef = import_react.useRef(null)
    const element = useRenderElement("div", componentProps, {
      state,
      ref: [forwardedRef, listItemRef, panelRef],
      props: [
        {
          "aria-labelledby": correspondingTabId,
          hidden,
          id,
          "role": "tabpanel",
          "tabIndex": open ? 0 : -1,
          "inert": inertValue(!open),
          ["data-index"]: index,
        },
        elementProps,
      ],
      stateAttributesMapping,
    })
    useOpenChangeComplete({
      open,
      ref: panelRef,
      onComplete() {
        if (!open) setMounted(false)
      },
    })
    useIsoLayoutEffect(() => {
      if (id == null || (hidden && !keepMounted)) return
      return registerMountedTabPanel(value, id)
    }, [hidden, keepMounted, value, id, registerMountedTabPanel])
    if (!(keepMounted || mounted)) return null
    return element
  },
)
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/internals/composite/root/useCompositeRoot.mjs
const EMPTY_ARRAY = []
function useCompositeRoot(params) {
  const {
    loopFocus = true,
    orientation = "both",
    grid,
    onLoop,
    direction,
    highlightedIndex: externalHighlightedIndex,
    onHighlightedIndexChange: externalSetHighlightedIndex,
    rootRef: externalRef,
    enableHomeAndEndKeys = false,
    stopEventPropagation,
    disabledIndices,
    modifierKeys = EMPTY_ARRAY,
  } = params
  const [internalHighlightedIndex, internalSetHighlightedIndex] = import_react.useState(0)
  const isGrid = grid != null
  const rootRef = import_react.useRef(null)
  const mergedRef = useMergedRefs(rootRef, externalRef)
  const elementsRef = import_react.useRef([])
  const hasSetDefaultIndexRef = import_react.useRef(false)
  const highlightedIndex = externalHighlightedIndex ?? internalHighlightedIndex
  const onHighlightedIndexChange = useStableCallback((index, shouldScrollIntoView = false) => {
    ;(externalSetHighlightedIndex ?? internalSetHighlightedIndex)(index)
    if (shouldScrollIntoView) {
      const newActiveItem = elementsRef.current[index]
      scrollIntoViewIfNeeded(rootRef.current, newActiveItem, direction, orientation)
    }
  })
  const onMapChange = useStableCallback((map) => {
    if (map.size === 0 || hasSetDefaultIndexRef.current) return
    hasSetDefaultIndexRef.current = true
    const sortedElements = [...map.keys()]
    const activeItem =
      sortedElements.find((compositeElement) =>
        compositeElement?.hasAttribute("data-composite-item-active"),
      ) ?? null
    const activeIndex = activeItem ? (map.get(activeItem)?.index ?? -1) : -1
    if (activeIndex !== -1) onHighlightedIndexChange(activeIndex)
    else if (isListIndexDisabled(sortedElements, highlightedIndex, disabledIndices)) {
      const firstEnabledIndex = findNonDisabledListIndex(sortedElements, { disabledIndices })
      if (!isIndexOutOfListBounds(sortedElements, firstEnabledIndex))
        onHighlightedIndexChange(firstEnabledIndex)
    }
    scrollIntoViewIfNeeded(rootRef.current, activeItem, direction, orientation)
  })
  useIsoLayoutEffect(() => {
    if (
      disabledIndices == null ||
      externalHighlightedIndex != null ||
      !hasSetDefaultIndexRef.current
    )
      return
    const elements = elementsRef.current
    if (isListIndexDisabled(elements, highlightedIndex, disabledIndices)) {
      const firstEnabledIndex = findNonDisabledListIndex(elements, { disabledIndices })
      if (!isIndexOutOfListBounds(elements, firstEnabledIndex))
        onHighlightedIndexChange(firstEnabledIndex)
    }
  }, [
    disabledIndices,
    externalHighlightedIndex,
    highlightedIndex,
    elementsRef,
    onHighlightedIndexChange,
  ])
  const wrappedOnLoop = useStableCallback((event, prevIndex, nextIndex) => {
    if (!onLoop) return nextIndex
    return onLoop(event, prevIndex, nextIndex, elementsRef)
  })
  const onKeyDown = useStableCallback((event) => {
    const isHomeOrEnd = event.key === "Home" || event.key === "End"
    if (!COMPOSITE_KEYS.has(event.key) || (!enableHomeAndEndKeys && isHomeOrEnd)) return
    if (isModifierKeySet(event, modifierKeys)) return
    if (!rootRef.current) return
    const isRtl = direction === "rtl"
    const horizontalForwardKey = isRtl ? ARROW_LEFT : ARROW_RIGHT
    const horizontalBackwardKey = isRtl ? ARROW_RIGHT : ARROW_LEFT
    const forwardKey = orientation === "vertical" ? ARROW_DOWN : horizontalForwardKey
    const backwardKey = orientation === "vertical" ? ARROW_UP : horizontalBackwardKey
    const target = getTarget(event.nativeEvent)
    if (target != null && isNativeInput(target) && !isElementDisabled(target)) {
      const selectionStart = target.selectionStart
      const selectionEnd = target.selectionEnd
      const textContent = target.value
      if (selectionStart == null || event.shiftKey || selectionStart !== selectionEnd) return
      if (event.key !== backwardKey && selectionStart < textContent.length) return
      if (event.key !== forwardKey && selectionStart > 0) return
    }
    let nextIndex = highlightedIndex
    const minIndex = getMinListIndex(elementsRef, disabledIndices)
    const maxIndex = getMaxListIndex(elementsRef, disabledIndices)
    if (grid != null)
      nextIndex = grid({
        disabledIndices,
        elementsRef,
        event,
        highlightedIndex,
        loopFocus,
        maxIndex,
        minIndex,
        onLoop: wrappedOnLoop,
        orientation,
        rtl: isRtl,
      })
    const isForwardKey =
      (orientation !== "vertical" && event.key === horizontalForwardKey) ||
      (orientation !== "horizontal" && event.key === "ArrowDown")
    const isBackwardKey =
      (orientation !== "vertical" && event.key === horizontalBackwardKey) ||
      (orientation !== "horizontal" && event.key === "ArrowUp")
    if (enableHomeAndEndKeys) {
      if (event.key === "Home") nextIndex = minIndex
      else if (event.key === "End") nextIndex = maxIndex
    }
    if (nextIndex === highlightedIndex && (isForwardKey || isBackwardKey)) {
      if (loopFocus && nextIndex === maxIndex && isForwardKey) {
        nextIndex = minIndex
        if (onLoop) nextIndex = onLoop(event, highlightedIndex, nextIndex, elementsRef)
      } else if (loopFocus && nextIndex === minIndex && isBackwardKey) {
        nextIndex = maxIndex
        if (onLoop) nextIndex = onLoop(event, highlightedIndex, nextIndex, elementsRef)
      } else
        nextIndex = findNonDisabledListIndex(elementsRef.current, {
          startingIndex: nextIndex,
          decrement: isBackwardKey,
          disabledIndices,
        })
    }
    if (nextIndex !== highlightedIndex && !isIndexOutOfListBounds(elementsRef.current, nextIndex)) {
      if (stopEventPropagation) event.stopPropagation()
      if (isGrid || isHomeOrEnd || isForwardKey || isBackwardKey) event.preventDefault()
      onHighlightedIndexChange(nextIndex, true)
      queueMicrotask(() => {
        elementsRef.current[nextIndex]?.focus()
      })
    }
  })
  return {
    props: {
      ref: mergedRef,
      onFocus(event) {
        const element = rootRef.current
        const target = getTarget(event.nativeEvent)
        if (!element || target == null || !isNativeInput(target)) return
        target.setSelectionRange(0, target.value.length)
      },
      onKeyDown,
    },
    highlightedIndex,
    onHighlightedIndexChange,
    elementsRef,
    onMapChange,
    relayKeyboardEvent: onKeyDown,
  }
}
function isModifierKeySet(event, ignoredModifierKeys) {
  for (const key of MODIFIER_KEYS) {
    if (ignoredModifierKeys.includes(key)) continue
    if (event.getModifierState(key)) return true
  }
  return false
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/internals/composite/root/CompositeRoot.mjs
function CompositeRoot(componentProps) {
  const {
    render,
    className,
    style,
    refs = EMPTY_ARRAY$1,
    props = EMPTY_ARRAY$1,
    state = EMPTY_OBJECT,
    stateAttributesMapping,
    highlightedIndex: highlightedIndexProp,
    onHighlightedIndexChange: onHighlightedIndexChangeProp,
    orientation,
    grid,
    loopFocus,
    onLoop,
    enableHomeAndEndKeys,
    onMapChange: onMapChangeProp,
    stopEventPropagation = true,
    rootRef,
    disabledIndices,
    modifierKeys,
    highlightItemOnHover = false,
    tag = "div",
    ...elementProps
  } = componentProps
  const {
    props: defaultProps,
    highlightedIndex,
    onHighlightedIndexChange,
    elementsRef,
    onMapChange: onMapChangeUnwrapped,
    relayKeyboardEvent,
  } = useCompositeRoot({
    grid,
    loopFocus,
    onLoop,
    orientation,
    highlightedIndex: highlightedIndexProp,
    onHighlightedIndexChange: onHighlightedIndexChangeProp,
    rootRef,
    stopEventPropagation,
    enableHomeAndEndKeys,
    direction: useDirection(),
    disabledIndices,
    modifierKeys,
  })
  const element = useRenderElement(tag, componentProps, {
    state,
    ref: refs,
    props: [defaultProps, ...props, elementProps],
    stateAttributesMapping,
  })
  const contextValue = import_react.useMemo(
    () => ({
      highlightedIndex,
      onHighlightedIndexChange,
      highlightItemOnHover,
      relayKeyboardEvent,
    }),
    [highlightedIndex, onHighlightedIndexChange, highlightItemOnHover, relayKeyboardEvent],
  )
  return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(CompositeRootContext.Provider, {
    value: contextValue,
    children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(CompositeList, {
      elementsRef,
      onMapChange: (newMap) => {
        onMapChangeProp?.(newMap)
        onMapChangeUnwrapped(newMap)
      },
      children: element,
    }),
  })
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/tabs/list/TabsList.mjs
/**
 * Groups the individual tab buttons.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Tabs](https://base-ui.com/react/components/tabs)
 */
const TabsList$1 = /*#__PURE__*/ import_react.forwardRef(
  function TabsList(componentProps, forwardedRef) {
    const {
      activateOnFocus = false,
      className,
      loopFocus = true,
      render,
      style,
      ...elementProps
    } = componentProps
    const { orientation, setTabMap, tabActivationDirection } = useTabsRootContext()
    const [highlightedTabIndex, setHighlightedTabIndex] = import_react.useState(0)
    const [tabsListElement, setTabsListElement] = import_react.useState(null)
    const indicatorUpdateListenersRef = import_react.useRef(/* @__PURE__ */ new Set())
    const tabResizeObserverElementsRef = import_react.useRef(/* @__PURE__ */ new Set())
    const resizeObserverRef = import_react.useRef(null)
    useIsoLayoutEffect(() => {
      if (typeof ResizeObserver === "undefined") return
      const resizeObserver = new ResizeObserver(() => {
        indicatorUpdateListenersRef.current.forEach((listener) => {
          listener()
        })
      })
      resizeObserverRef.current = resizeObserver
      if (tabsListElement) resizeObserver.observe(tabsListElement)
      tabResizeObserverElementsRef.current.forEach((element) => {
        resizeObserver.observe(element)
      })
      return () => {
        resizeObserver.disconnect()
        resizeObserverRef.current = null
      }
    }, [tabsListElement])
    const registerIndicatorUpdateListener = useStableCallback((listener) => {
      indicatorUpdateListenersRef.current.add(listener)
      return () => {
        indicatorUpdateListenersRef.current.delete(listener)
      }
    })
    const registerTabResizeObserverElement = useStableCallback((element) => {
      tabResizeObserverElementsRef.current.add(element)
      resizeObserverRef.current?.observe(element)
      return () => {
        tabResizeObserverElementsRef.current.delete(element)
        resizeObserverRef.current?.unobserve(element)
      }
    })
    const state = {
      orientation,
      tabActivationDirection,
    }
    const defaultProps = {
      "aria-orientation": orientation === "vertical" ? "vertical" : void 0,
      "role": "tablist",
    }
    const tabsListContextValue = import_react.useMemo(
      () => ({
        activateOnFocus,
        registerIndicatorUpdateListener,
        registerTabResizeObserverElement,
        tabsListElement,
      }),
      [
        activateOnFocus,
        registerIndicatorUpdateListener,
        registerTabResizeObserverElement,
        tabsListElement,
      ],
    )
    return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(TabsListContext.Provider, {
      value: tabsListContextValue,
      children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(CompositeRoot, {
        render,
        className,
        style,
        state,
        refs: [forwardedRef, setTabsListElement],
        props: [defaultProps, elementProps],
        stateAttributesMapping: tabsStateAttributesMapping,
        highlightedIndex: highlightedTabIndex,
        enableHomeAndEndKeys: true,
        loopFocus,
        orientation,
        onHighlightedIndexChange: setHighlightedTabIndex,
        onMapChange: setTabMap,
        disabledIndices: EMPTY_ARRAY$1,
      }),
    })
  },
)
//#endregion
//#region src/components/ui/tabs.tsx
function Tabs({ className, orientation = "horizontal", ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsRoot, {
    "data-slot": "tabs",
    "data-orientation": orientation,
    "className": cn("group/tabs flex gap-2 data-horizontal:flex-col", className),
    ...props,
  })
}
const tabsListVariants = tv({
  base: "group/tabs-list inline-flex w-fit items-center justify-center rounded-none p-[3px] text-muted-foreground group-data-horizontal/tabs:h-8 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none",
  variants: {
    variant: {
      default: "bg-muted",
      line: "gap-1 bg-transparent",
    },
  },
  defaultVariants: { variant: "default" },
})
function TabsList({ className, variant = "default", ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsList$1, {
    "data-slot": "tabs-list",
    "data-variant": variant,
    "className": cn(tabsListVariants({ variant }), className),
    ...props,
  })
}
function TabsTrigger({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTab, {
    "data-slot": "tabs-trigger",
    "className": cn(
      "relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-none border border-transparent px-1.5 py-0.5 text-xs font-medium whitespace-nowrap text-foreground/60 transition-[color,background-color,border-color,outline-color,box-shadow,opacity,translate] group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start group-data-vertical/tabs:py-[calc(--spacing(1.25))] hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:text-muted-foreground dark:hover:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent",
      "data-active:bg-background data-active:text-foreground dark:data-active:border-input dark:data-active:bg-input/30 dark:data-active:text-foreground",
      "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
      className,
    ),
    ...props,
  })
}
function TabsContent({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsPanel, {
    "data-slot": "tabs-content",
    "className": cn("flex-1 text-xs/relaxed outline-none", className),
    ...props,
  })
}
//#endregion
//#region src/features/extract/api/server-fn.ts
/**
 * The browser's side of the channel, mirroring `subscriptions/api/server-fn.ts`: the handler body
 * is stripped from the client build by the Start plugin, so importing server-only code here is
 * safe, and a stripping failure is a build-time error (`cloudflare:workers` unresolvable), not a
 * silent leak.
 */
const readRemoteSource = createServerFn({ method: "POST" })
  .middleware([adminFunctionMiddleware])
  .validator((input) => input)
  .handler(createSsrRpc("997c5ebbff41e37d0a9bdf27c3cde5d12f9a18007caf5a3a9c6549b6cba4bb9d"))
//#endregion
//#region src/features/extract/remote-source.ts
/**
 * Reads a remote subscription the browser cannot fetch cross-origin itself. It goes through the
 * `readRemoteSource` server function rather than exposing a general-purpose HTTP proxy endpoint.
 */
function useReadRemoteSource() {
  return useMutation({
    mutationFn: (urls) => readRemoteSource({ data: { urls } }).then((payload) => payload.content),
    onSuccess: (_content, urls) =>
      showSuccess(urls.length > 1 ? `已获取 ${urls.length} 个远程订阅` : "已获取远程订阅"),
    onError: (error) => showError(error, "远程订阅读取失败。"),
  })
}
//#endregion
//#region src/features/extract/compile.ts
/**
 * One compile run, wherever it happens to be running. Shared by the worker and by the fallback that
 * runs on the main thread when there is no worker, so both describe a run the same way.
 */
function compileForWorkbench(request) {
  try {
    const compiled = compileNodeList(request)
    return {
      error: "",
      output: {
        content: compiled.content,
        contentType: compiled.contentType,
        detectedFormat: compiled.detectedFormat,
        diagnostics: compiled.diagnostics,
        fileExtension: compiled.fileExtension,
        sourceNodes: compiled.sourceNodes,
        nodes: compiled.nodes,
        renderedNodes: compiled.renderedNodes,
      },
    }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "解析失败",
      output: null,
    }
  }
}
//#endregion
//#region src/features/extract/use-extract-run.ts
/** Kept out of the hook so the same worker module is never described two ways. */
function createCompileWorker() {
  return new Worker(new URL("./compile.worker.ts", import.meta.url), { type: "module" })
}
/**
 * Change the source, the client or any rule and the result goes stale, which flips the primary
 * button from "存为订阅" back to "生成". One function, so it can be tested without rendering anything.
 *
 * Nothing generated yet is not the same as stale — a fresh page has no result to be stale about.
 * Processor order is compared too (via `JSON.stringify`, so order counts): a rule chain reordered
 * is a different chain even though the same rules are all still there.
 */
function isStale(generated, inputs) {
  if (!generated) return false
  return (
    generated.inputs.source !== inputs.source ||
    generated.inputs.target !== inputs.target ||
    JSON.stringify(generated.inputs.processors) !== JSON.stringify(inputs.processors)
  )
}
/**
 * Owns the workbench's compile run: what came out, what went wrong, and whether one is in flight.
 * The caller resolves its own input text (a pasted source or a fetched remote one) and passes the
 * resolved text in separately from `inputs`, since reading a remote source is the caller's concern
 * (it goes through the admin API) and has nothing to do with what a compile run is.
 *
 * The run happens in a worker. A megabyte of source is most of a second of pure computation, and on
 * this thread that second is one frozen frame: the button could not repaint to say it was working,
 * so `generating` was a flag nothing could ever observe — set and cleared inside a single commit.
 *
 * `inputs` stays here rather than travelling with the request. In local mode `inputs.source` *is*
 * the text, and posting both would structured-clone the whole source twice.
 */
function useExtractRun() {
  const [generated, setGenerated] = (0, import_react.useState)(null)
  const [errorMessage, setErrorMessage] = (0, import_react.useState)("")
  const [generating, setGenerating] = (0, import_react.useState)(false)
  const { data: answer, error: workerError, isSupported, post } = useWebWorker(createCompileWorker)
  const pending = (0, import_react.useRef)(null)
  const nextId = (0, import_react.useRef)(0)
  const settle = (0, import_react.useCallback)((inputs, outcome) => {
    setGenerating(false)
    setGenerated(
      outcome.output && {
        ...outcome.output,
        inputs,
      },
    )
    setErrorMessage(outcome.error)
  }, [])
  ;(0, import_react.useEffect)(() => {
    const request = pending.current
    if (!answer || !request || answer.id !== request.id) return
    pending.current = null
    settle(request.inputs, {
      error: answer.error,
      output: answer.output,
    })
  }, [answer, settle])
  function run(inputs, text) {
    const request = {
      processors: inputs.processors,
      source: text,
      target: inputs.target,
    }
    nextId.current += 1
    pending.current = {
      id: nextId.current,
      inputs,
    }
    if (
      isSupported &&
      post({
        ...request,
        id: nextId.current,
      })
    ) {
      setGenerating(true)
      return
    }
    pending.current = null
    settle(inputs, compileForWorkbench(request))
  }
  return {
    generated,
    errorMessage: workerError ?? errorMessage,
    generating: generating && workerError === null,
    run,
  }
}
//#endregion
//#region src/features/extract/workbench-panels.tsx
const PANEL_TITLE = "font-heading text-base font-semibold tracking-[0.05em] uppercase"
const PANEL_META =
  "text-[10px] font-semibold tracking-[0.14em] text-muted-foreground uppercase whitespace-nowrap"
const MONO_BLOCK = "font-mono text-xs leading-[1.8] wrap-anywhere whitespace-pre-wrap outline-none"
/** One header band per column so the three panels line up, whatever the column layout is. */
const PANEL_HEAD = "flex h-14 shrink-0 items-center justify-between gap-3 border-b px-4 md:px-5"
/**
 * The step marker lives in the panel it belongs to. A single strip above the grid can only line up
 * with columns, and from md up "源" and "处理" share one column, so no strip position fits both.
 */
function PanelHead({ children, index, status, title }) {
  const statusNode = status
    ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
        className: cn(PANEL_META, "truncate"),
        children: status,
      })
    : null
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    className: PANEL_HEAD,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        className: "flex min-w-0 items-baseline gap-2.5",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
            className: "hidden font-mono text-[11px] text-muted-foreground md:inline",
            children: index,
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
            className: PANEL_TITLE,
            children: title,
          }),
          children ? statusNode : null,
        ],
      }),
      children ?? statusNode,
    ],
  })
}
//#endregion
//#region src/features/extract/workbench.tsx
const STEPS = [
  {
    key: "source",
    index: "01",
    label: "源",
  },
  {
    key: "process",
    index: "02",
    label: "处理",
  },
  {
    key: "output",
    index: "03",
    label: "输出",
  },
]
/**
 * Both tabs empty out for the same reason, and it is the one a user is least likely to guess: the
 * source parsed and the rules ran, and then the client refused what came out. Stated once so the two
 * cannot drift into blaming different things for one situation.
 */
const NOTHING_RENDERED =
  "没有节点输出为当前客户端——检查节点源与规则链，也可能是这个客户端带不了它们。"
/** The two output tabs are one control; only their icon and label differ. */
const OUTPUT_TAB =
  "h-10 flex-none px-2.5 after:hidden data-active:shadow-[inset_0_-2px_0_var(--foreground)]"
const routeApi = getRouteApi("/")
function ExtractWorkbench() {
  const navigate = routeApi.useNavigate()
  const search = routeApi.useSearch()
  const tokenUsable = useTokenUsable()
  const readRemoteSource = useReadRemoteSource()
  const saveSubscription = useSaveSubscription()
  const { generated, errorMessage, generating, run } = useExtractRun()
  const [source, setSource] = (0, import_react.useState)("")
  const [sourceMode, setSourceMode] = (0, import_react.useState)("local")
  const [sourceUrl, setSourceUrl] = (0, import_react.useState)("")
  const [target, setTarget] = (0, import_react.useState)(DEFAULT_TARGET)
  const [rules, setRules] = (0, import_react.useState)(EMPTY_RULE_CHAIN)
  const activeStep = search.step ?? "source"
  const [outputTab, setOutputTab] = (0, import_react.useState)("output")
  const [copied, setCopied] = (0, import_react.useState)(false)
  const [subscriptionId, setSubscriptionId] = (0, import_react.useState)()
  const [subscriptionUrl, setSubscriptionUrl] = (0, import_react.useState)("")
  const [linkCopied, setLinkCopied] = (0, import_react.useState)(false)
  const [skippedOpen, setSkippedOpen] = (0, import_react.useState)(false)
  const processors = (0, import_react.useMemo)(() => ruleChainToProcessors(rules), [rules])
  const wide = useMediaQuery("(min-width: 768px)") === true
  ;(0, import_react.useEffect)(() => {
    if (!wide || search.step === void 0) return
    navigate({
      search: ({ step: _step, ...rest }) => rest,
      replace: true,
    })
  }, [navigate, search.step, wide])
  ;(0, import_react.useEffect)(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2e3)
    return () => clearTimeout(timer)
  }, [copied])
  ;(0, import_react.useEffect)(() => {
    if (!linkCopied) return
    const timer = setTimeout(() => setLinkCopied(false), 2e3)
    return () => clearTimeout(timer)
  }, [linkCopied])
  function setActiveStep(step) {
    if (wide) return
    navigate({
      search: (prev) => ({
        ...prev,
        step,
      }),
      replace: true,
    })
  }
  const remoteMode = tokenUsable && sourceMode === "remote"
  const input = remoteMode ? sourceUrl : source
  const inputs = {
    source: input,
    target,
    processors,
  }
  const fresh = generated !== null && !isStale(generated, inputs)
  const nodeCount = fresh ? generated.renderedNodes.length : 0
  /**
   * One line per step, in the two lengths the layout has room for: the sentence a panel header shows,
   * and the suffix the compact step strip can fit after the step's own label. Together rather than in
   * two tables, so a step cannot end up saying different things about itself.
   */
  const stepStatus = {
    source: {
      compact: "",
      full: input.trim() ? (remoteMode ? "远程链接" : `${input.length} 个字符`) : "等待输入",
    },
    process: {
      compact: processors.length > 0 ? ` · ${processors.length}` : "",
      full: processors.length > 0 ? `${processors.length} 条规则生效` : "未配置规则",
    },
    output: {
      compact: fresh ? ` · ${nodeCount}` : "",
      full: fresh ? `${nodeCount} 个节点` : generated ? "待重新生成" : "暂未生成",
    },
  }
  async function generate() {
    let text = source
    if (remoteMode) {
      const content = await readRemoteSource
        .mutateAsync(splitSourceUrls(sourceUrl))
        .catch(() => null)
      if (content === null) return
      text = content
    }
    setCopied(false)
    setSkippedOpen(false)
    setOutputTab("output")
    setActiveStep("output")
    run(inputs, text)
  }
  async function copyOutput() {
    if (!generated) return
    await navigator.clipboard.writeText(generated.content)
    setCopied(true)
  }
  function downloadOutput() {
    if (!generated) return
    const url = URL.createObjectURL(new Blob([generated.content], { type: generated.contentType }))
    const anchor = document.createElement("a")
    anchor.href = url
    anchor.download = `cuttle.${generated.fileExtension}`
    anchor.click()
    setTimeout(() => URL.revokeObjectURL(url), 0)
  }
  async function publishSubscription() {
    if (!generated || saveSubscription.isPending) return
    const draft = {
      name: "工作台订阅",
      defaultTarget: target,
      enabled: true,
      processors,
      source: {
        type: "pool",
        content: JSON.stringify({ proxies: generated.sourceNodes }),
      },
    }
    try {
      const result = await saveSubscription.mutateAsync({
        draft,
        id: subscriptionId,
      })
      if (result?.subscription?.id) setSubscriptionId(result.subscription.id)
      if (result?.url) setSubscriptionUrl(result.url)
    } catch {}
  }
  async function copySubscriptionLink() {
    if (!subscriptionUrl) return
    await navigator.clipboard.writeText(subscriptionUrl)
    setLinkCopied(true)
  }
  const targetPicker = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
    items: TARGET_OPTIONS,
    value: target,
    onValueChange: (value) => setTarget(value),
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
        "aria-label": "目标客户端",
        "className": "flex-1 border-input px-2.5 max-md:h-11! max-md:bg-background",
        "children": /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}),
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup, {
          children: TARGET_OPTIONS.map((option) =>
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
  })
  const primaryButton =
    fresh && tokenUsable
      ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
          className: "max-md:h-11 max-md:px-4.5",
          onClick: () => void publishSubscription(),
          disabled: saveSubscription.isPending,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconLink, { "data-icon": "inline-start" }),
            saveSubscription.isPending
              ? "发布中"
              : subscriptionUrl
                ? "更新订阅链接"
                : "生成订阅链接",
          ],
        })
      : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
          className: "max-md:h-11 max-md:px-4.5",
          onClick: () => void generate(),
          disabled: !input.trim() || generating,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconSparkles, {
              "data-icon": "inline-start",
            }),
            generating ? "生成中" : "生成",
          ],
        })
  const outputControls = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    className: "flex min-w-0 flex-1 items-center gap-2",
    children: [
      targetPicker,
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonGroup, {
        children: [
          primaryButton,
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
            "variant": "outline",
            "className": "max-md:size-11",
            "aria-label": copied ? "已复制" : "复制正文",
            "onClick": () => void copyOutput(),
            "disabled": !generated,
            "children": copied
              ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconCheck, {})
              : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconClipboard, {}),
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
            "variant": "outline",
            "className": "max-md:size-11",
            "aria-label": "下载正文",
            "onClick": downloadOutput,
            "disabled": !generated,
            "children": /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconDownload, {}),
          }),
        ],
      }),
    ],
  })
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    className: "flex flex-1 flex-col md:min-h-0 md:overflow-hidden",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
        className: "grid grid-cols-3 border-b bg-sidebar md:hidden",
        children: STEPS.map((step, index) =>
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "button",
            {
              "type": "button",
              "onClick": () => setActiveStep(step.key),
              "data-active": step.key === activeStep,
              "className": cn(
                "group/step flex flex-col gap-0.5 px-3 py-2.5 text-left",
                index < STEPS.length - 1 && "border-r",
                "data-[active=true]:shadow-[inset_0_-2px_0_var(--foreground)]",
              ),
              "children": [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                  className: "font-mono text-[10px] text-muted-foreground",
                  children: step.index,
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
                  className:
                    "text-xs font-semibold tracking-widest text-muted-foreground uppercase group-data-[active=true]/step:text-foreground",
                  children: [step.label, stepStatus[step.key].compact],
                }),
              ],
            },
            step.key,
          ),
        ),
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        className:
          "grid flex-1 grid-cols-1 md:min-h-0 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-3 lg:grid-rows-1",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
            "data-active": activeStep === "source",
            "className":
              "flex flex-col border-b max-md:data-[active=false]:hidden md:col-start-1 md:row-start-1 md:min-h-0 md:border-r lg:border-b-0",
            "children": [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHead, {
                index: "01",
                title: "节点源",
                status: stepStatus.source.full,
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonGroup, {
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                      "variant": remoteMode ? "outline" : "default",
                      "size": "xs",
                      "aria-pressed": !remoteMode,
                      "onClick": () => setSourceMode("local"),
                      "children": SOURCE_TYPE_LABELS.raw,
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                      "variant": remoteMode ? "default" : "outline",
                      "size": "xs",
                      "aria-pressed": remoteMode,
                      "disabled": !tokenUsable,
                      "onClick": () => setSourceMode("remote"),
                      "children": SOURCE_TYPE_LABELS.remote,
                    }),
                  ],
                }),
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                className: "flex min-h-0 flex-1 flex-col p-4 md:p-5",
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
                  "aria-label": remoteMode ? "远程订阅链接" : "节点源",
                  "placeholder": "多个链接需要换行或者使用 | 分隔",
                  "value": input,
                  "onChange": (event) =>
                    remoteMode ? setSourceUrl(event.target.value) : setSource(event.target.value),
                  "spellCheck": false,
                  "className": cn(
                    MONO_BLOCK,
                    "min-h-42 flex-1 resize-y border border-input px-3.5 py-3 md:min-h-0",
                  ),
                }),
              }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
            "data-active": activeStep === "process",
            "className":
              "flex flex-col border-b max-md:data-[active=false]:hidden md:col-start-1 md:row-start-2 md:min-h-0 md:border-r md:border-b-0 lg:col-start-2 lg:row-start-1",
            "children": [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHead, {
                index: "02",
                title: "规则链",
                status: stepStatus.process.full,
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RuleChain, {
                className: "min-h-0 overflow-y-auto",
                value: rules,
                onChange: setRules,
              }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
            "data-active": activeStep === "output",
            "className":
              "flex min-w-0 flex-col max-md:data-[active=false]:hidden md:col-start-2 md:row-span-2 md:row-start-1 md:min-h-0 lg:col-start-3 lg:row-span-1",
            "children": [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                className: cn(PANEL_HEAD, "hidden md:flex"),
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                    className: "shrink-0 font-mono text-[11px] text-muted-foreground",
                    children: "03",
                  }),
                  outputControls,
                ],
              }),
              subscriptionUrl
                ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                    className:
                      "flex flex-none flex-col gap-2 border-b bg-sidebar px-4 py-3.5 md:px-5",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                        className: "flex items-center justify-between gap-3",
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                            className:
                              "text-[10px] font-semibold tracking-[0.14em] text-muted-foreground uppercase",
                            children: "固定订阅链接",
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                            variant: "outline",
                            size: "xs",
                            onClick: () => void copySubscriptionLink(),
                            children: linkCopied ? "已复制" : "复制链接",
                          }),
                        ],
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
                        className: "font-mono text-xs leading-relaxed wrap-anywhere",
                        children: subscriptionUrl,
                      }),
                    ],
                  })
                : null,
              errorMessage
                ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                    className: "p-4 md:p-5",
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, {
                      variant: "destructive",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconAlertTriangle, {}),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertTitle, {
                          children: "无法处理输入",
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDescription, {
                          children: errorMessage,
                        }),
                      ],
                    }),
                  })
                : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
                        value: outputTab,
                        onValueChange: (value) => setOutputTab(value),
                        className: "min-h-0 flex-1 gap-0",
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
                            variant: "line",
                            className:
                              "h-auto! w-full justify-start gap-1 border-b px-4 py-0 md:px-5",
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
                                value: "output",
                                className: OUTPUT_TAB,
                                children: [
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconCode, {
                                    "data-icon": "inline-start",
                                  }),
                                  "正文",
                                ],
                              }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
                                value: "nodes",
                                className: OUTPUT_TAB,
                                children: [
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconListDetails, {
                                    "data-icon": "inline-start",
                                  }),
                                  "节点",
                                ],
                              }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                                className:
                                  "ml-auto self-center truncate text-xs text-muted-foreground",
                                children: stepStatus.output.full,
                              }),
                            ],
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
                            value: "output",
                            className: "flex min-h-0 flex-col",
                            children: generated?.content
                              ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
                                  className: cn(
                                    MONO_BLOCK,
                                    "m-4 min-h-0 flex-1 overflow-auto bg-muted p-3.5 text-[11px] leading-[1.9] md:m-5",
                                  ),
                                  children: generated.content,
                                })
                              : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
                                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                                    EmptyHeader,
                                    {
                                      children: [
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyMedia, {
                                          variant: "icon",
                                          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                            IconCode,
                                            {},
                                          ),
                                        }),
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyTitle, {
                                          children: "暂无正文",
                                        }),
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                          EmptyDescription,
                                          {
                                            children: generated
                                              ? NOTHING_RENDERED
                                              : "选择客户端后点击生成，转换结果会显示在这里。",
                                          },
                                        ),
                                      ],
                                    },
                                  ),
                                }),
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
                            value: "nodes",
                            className: "flex min-h-0 min-w-0 flex-col p-4 md:p-5",
                            children: generated?.renderedNodes.length
                              ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NodeTable, {
                                  className: "min-h-0 flex-1",
                                  nodes: generated.renderedNodes,
                                })
                              : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
                                  className: "p-8",
                                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                                    EmptyHeader,
                                    {
                                      children: [
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyMedia, {
                                          variant: "icon",
                                          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                            IconListDetails,
                                            {},
                                          ),
                                        }),
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyTitle, {
                                          children: "暂无节点",
                                        }),
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                          EmptyDescription,
                                          {
                                            children: generated
                                              ? NOTHING_RENDERED
                                              : "点击生成后，输出到当前客户端的节点会显示在这里。",
                                          },
                                        ),
                                      ],
                                    },
                                  ),
                                }),
                          }),
                        ],
                      }),
                      generated?.diagnostics.length
                        ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                            className: "px-4 pb-4 md:px-5 md:pb-5",
                            children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, {
                              variant: "destructive",
                              className: "relative",
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconAlertTriangle, {}),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertTitle, {
                                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
                                    "type": "button",
                                    "onClick": () => setSkippedOpen(!skippedOpen),
                                    "aria-expanded": skippedOpen,
                                    "className": "flex w-full items-center gap-2 text-left",
                                    "children": [
                                      generated.diagnostics.some(
                                        (diagnostic) => diagnostic.level === "error",
                                      )
                                        ? "转换未完成"
                                        : "部分节点未输出",
                                      " ",
                                      "· ",
                                      generated.diagnostics.length,
                                      " 条",
                                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconChevronUp, {
                                        className: cn(
                                          "ml-auto size-3.5 shrink-0 transition-transform duration-150 ease-out",
                                          skippedOpen && "rotate-180",
                                        ),
                                      }),
                                    ],
                                  }),
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDescription, {
                                  "inert": !skippedOpen,
                                  "data-open": skippedOpen,
                                  "className":
                                    "absolute -inset-x-px bottom-full z-10 mb-1 border bg-card p-2.5 shadow-md transition-[opacity,translate] duration-150 ease-out data-[open=false]:translate-y-1 data-[open=false]:opacity-0",
                                  "children": /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
                                    className:
                                      "mask-b-from-85% max-h-40 list-disc space-y-1 overflow-y-auto pb-6 pl-4",
                                    children: generated.diagnostics.map((diagnostic, index) =>
                                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                        "li",
                                        { children: diagnostic.message },
                                        `${diagnostic.code}-${diagnostic.line ?? index}`,
                                      ),
                                    ),
                                  }),
                                }),
                              ],
                            }),
                          })
                        : null,
                    ],
                  }),
            ],
          }),
        ],
      }),
      activeStep === "output"
        ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
            className: "sticky bottom-0 z-20 border-t bg-sidebar px-4 py-3 md:hidden",
            children: outputControls,
          })
        : null,
    ],
  })
}
//#endregion
//#region src/routes/index.tsx?tsr-split=component
/**
 * Input from the address bar is not to be trusted: an invalid `step` falls back to no parameter at
 * all — which is the first step — rather than throwing. A hand-mangled URL should open the workbench
 * at its first step, not an error page.
 */
function ExtractPage() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
    active: "extract",
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectionGate, {
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExtractWorkbench, {}),
    }),
  })
}
//#endregion
export { ExtractPage as component }
