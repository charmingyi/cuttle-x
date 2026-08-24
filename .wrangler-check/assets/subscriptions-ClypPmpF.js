import { c as require_react, u as __toESM } from "./createMiddleware-CkzUAgXb.js"
import {
  F as batch,
  I as createAtom,
  L as toObserver,
  n as inspectNodeList,
  s as targetLabel,
} from "./nodes-b2qYjNQG.js"
import { d as require_jsx_runtime, s as useRouter } from "./react-dom-C7iwyEt6.js"
import {
  $ as showSuccess,
  A as DialogBackdrop,
  C as FieldGroup,
  E as SideSurface,
  I as DialogPortal$1,
  N as DialogTitle$1,
  O as DialogRoot,
  P as useRenderDialogRoot,
  S as FieldError,
  T as FieldTitle,
  X as Separator,
  Y as DialogClose$1,
  a as EmptyDescription,
  at as IconX,
  b as FieldContent,
  br as getRouteApi,
  c as EmptyTitle,
  ct as IconDatabase,
  f as Input,
  i as EmptyContent,
  k as DialogPopup,
  l as AppShell,
  lt as IconAlertTriangle,
  n as ConnectionGate,
  nt as buttonVariants,
  o as EmptyHeader,
  ot as IconTransform,
  q as DialogDescription$1,
  r as Empty,
  rt as cn,
  s as EmptyMedia,
  st as IconLoader2,
  tt as Button,
  ut as createReactComponent,
  w as FieldLabel,
  x as FieldDescription,
  xr as Link,
  y as Field$1,
} from "./shell-CGXDXMPw.js"
import { n as DEFAULT_FRESH_ARTIFACT_MS } from "./subscriptions-D1og5ExQ.js"
import {
  $ as IconChevronDown,
  A as mergeRuleChain,
  B as SelectGroup,
  C as useSubscriptionSnapshot,
  E as RuleChainForm,
  F as CollapsibleContent,
  H as SelectTrigger,
  I as CollapsibleTrigger,
  J as IconListDetails,
  L as Textarea,
  M as splitProcessors,
  N as Switch,
  O as describeProcessor,
  P as Collapsible,
  Q as IconChevronRight,
  R as Select,
  S as useSubscription,
  U as SelectValue,
  V as SelectItem,
  X as IconClipboard,
  Y as IconLink,
  Z as IconChevronUp,
  _ as useRenameSubscription,
  a as TableCell,
  b as useSaveSubscription,
  c as TableRow,
  d as splitSourceUrls,
  f as SOURCE_TYPE_LABELS,
  g as useRemoveSubscription,
  h as useRegisterSubscriptionLink,
  i as TableBody,
  l as DEFAULT_TARGET,
  m as useCopySubscriptionLink,
  n as NodeTable,
  nt as useSelector,
  o as TableHead,
  p as useAppendSubscriptionNodes,
  q as ButtonGroup,
  r as Table,
  s as TableHeader,
  t as useWebWorker,
  u as TARGET_OPTIONS,
  v as useReorderSubscriptions,
  w as useSubscriptions,
  x as useSetSubscriptionEnabled,
  y as useRotateToken,
  z as SelectContent,
} from "./web-worker-Bdzv_Tz9.js"
//#region node_modules/.pnpm/@tanstack+react-router@1.17_a412b0d82c3a1e1649d65373a448407f/node_modules/@tanstack/react-router/dist/esm/useRouterState.js
/**
 * Subscribe to the router's state store with optional selection and
 * structural sharing for render optimization.
 *
 * Options:
 * - `select`: Project the full router state to a derived slice
 * - `structuralSharing`: Replace-equal semantics for stable references
 * - `router`: Read state from a specific router instance instead of context
 *
 * @returns The selected router state (or the full state by default).
 * @link https://tanstack.com/router/latest/docs/framework/react/api/router/useRouterStateHook
 */
function useRouterState(opts) {
  const contextRouter = useRouter({ warn: opts?.router === void 0 })
  const router = opts?.router || contextRouter
  {
    const state = router.stores.__store.get()
    return opts?.select ? opts.select(state) : state
  }
}
//#endregion
//#region node_modules/.pnpm/@tanstack+store@0.11.1/node_modules/@tanstack/store/dist/store.js
const Store = class {
  constructor(valueOrFn, actionsFactory) {
    this.atom = createAtom(valueOrFn)
    this.get = this.get.bind(this)
    this.setState = this.setState.bind(this)
    this.subscribe = this.subscribe.bind(this)
    if (actionsFactory) this.actions = actionsFactory(this)
  }
  setState(updater) {
    this.atom.set(updater)
  }
  get state() {
    return this.atom.get()
  }
  get() {
    return this.state
  }
  subscribe(observerOrFn) {
    return this.atom.subscribe(toObserver(observerOrFn))
  }
}
const ReadonlyStore = class {
  constructor(valueOrFn) {
    this.atom = createAtom(valueOrFn)
  }
  get state() {
    return this.atom.get()
  }
  get() {
    return this.state
  }
  subscribe(observerOrFn) {
    return this.atom.subscribe(toObserver(observerOrFn))
  }
}
function createStore(valueOrFn, actions) {
  if (typeof valueOrFn === "function") return new ReadonlyStore(valueOrFn)
  if (actions) return new Store(valueOrFn, actions)
  return new Store(valueOrFn)
}
/**
 * @license @tabler/icons-react v3.46.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const IconAlertCircle = createReactComponent("outline", "alert-circle", "AlertCircle", [
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
const IconCloudDownload = createReactComponent("outline", "cloud-download", "CloudDownload", [
  [
    "path",
    {
      d: "M19 18a3.5 3.5 0 0 0 0 -7h-1a5 4.5 0 0 0 -11 -2a4.6 4.4 0 0 0 -2.1 8.4",
      key: "svg-0",
    },
  ],
  [
    "path",
    {
      d: "M12 13l0 9",
      key: "svg-1",
    },
  ],
  [
    "path",
    {
      d: "M9 19l3 3l3 -3",
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
const IconEdit = createReactComponent("outline", "edit", "Edit", [
  [
    "path",
    {
      d: "M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1",
      key: "svg-0",
    },
  ],
  [
    "path",
    {
      d: "M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415",
      key: "svg-1",
    },
  ],
  [
    "path",
    {
      d: "M16 5l3 3",
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
const IconFileText = createReactComponent("outline", "file-text", "FileText", [
  [
    "path",
    {
      d: "M14 3v4a1 1 0 0 0 1 1h4",
      key: "svg-0",
    },
  ],
  [
    "path",
    {
      d: "M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2",
      key: "svg-1",
    },
  ],
  [
    "path",
    {
      d: "M9 9l1 0",
      key: "svg-2",
    },
  ],
  [
    "path",
    {
      d: "M9 13l6 0",
      key: "svg-3",
    },
  ],
  [
    "path",
    {
      d: "M9 17l6 0",
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
const IconFilter = createReactComponent("outline", "filter", "Filter", [
  [
    "path",
    {
      d: "M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227",
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
const IconFolder = createReactComponent("outline", "folder", "Folder", [
  [
    "path",
    {
      d: "M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2",
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
const IconKey = createReactComponent("outline", "key", "Key", [
  [
    "path",
    {
      d: "M16.555 3.843l3.602 3.602a2.877 2.877 0 0 1 0 4.069l-2.643 2.643a2.877 2.877 0 0 1 -4.069 0l-.301 -.301l-6.558 6.558a2 2 0 0 1 -1.239 .578l-.175 .008h-1.172a1 1 0 0 1 -.993 -.883l-.007 -.117v-1.172a2 2 0 0 1 .467 -1.284l.119 -.13l.414 -.414h2v-2h2v-2l2.144 -2.144l-.301 -.301a2.877 2.877 0 0 1 0 -4.069l2.643 -2.643a2.877 2.877 0 0 1 4.069 0",
      key: "svg-0",
    },
  ],
  [
    "path",
    {
      d: "M15 9h.01",
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
const IconPencil = createReactComponent("outline", "pencil", "Pencil", [
  [
    "path",
    {
      d: "M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4",
      key: "svg-0",
    },
  ],
  [
    "path",
    {
      d: "M13.5 6.5l4 4",
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
const IconPlus = createReactComponent("outline", "plus", "Plus", [
  [
    "path",
    {
      d: "M12 5l0 14",
      key: "svg-0",
    },
  ],
  [
    "path",
    {
      d: "M5 12l14 0",
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
const IconSearch = createReactComponent("outline", "search", "Search", [
  [
    "path",
    {
      d: "M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0",
      key: "svg-0",
    },
  ],
  [
    "path",
    {
      d: "M21 21l-6 -6",
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
const IconTrash = createReactComponent("outline", "trash", "Trash", [
  [
    "path",
    {
      d: "M4 7l16 0",
      key: "svg-0",
    },
  ],
  [
    "path",
    {
      d: "M10 11l0 6",
      key: "svg-1",
    },
  ],
  [
    "path",
    {
      d: "M14 11l0 6",
      key: "svg-2",
    },
  ],
  [
    "path",
    {
      d: "M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12",
      key: "svg-3",
    },
  ],
  [
    "path",
    {
      d: "M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3",
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
const IconUsers = createReactComponent("outline", "users", "Users", [
  [
    "path",
    {
      d: "M5 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0",
      key: "svg-0",
    },
  ],
  [
    "path",
    {
      d: "M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2",
      key: "svg-1",
    },
  ],
  [
    "path",
    {
      d: "M16 3.13a4 4 0 0 1 0 7.75",
      key: "svg-2",
    },
  ],
  [
    "path",
    {
      d: "M21 21v-2a4 4 0 0 0 -3 -3.85",
      key: "svg-3",
    },
  ],
])
//#endregion
//#region src/shared/deferred-close.ts
const import_react = /* @__PURE__ */ __toESM(require_react(), 1)
/**
 * Holds a surface open for its own exit animation, then reports the close.
 *
 * Whether a dialog is open lives in the URL here, so clearing it navigates the surface out of the
 * tree in the same commit that would have told it to close — it is already gone by the time it could
 * animate. The local flag is what the surface closes against; the navigation waits for
 * `onOpenChangeComplete`, which also keeps the unmount, and with it the `key` remount that gives
 * each open a fresh form.
 *
 * `open` going false on its own (the record vanished, the URL changed elsewhere) resets the flag, so
 * the next open does not start out already closing.
 */
function useDeferredClose(open, onClosed) {
  const [closing, setClosing] = (0, import_react.useState)(false)
  const [tracked, setTracked] = (0, import_react.useState)(open)
  if (tracked !== open) {
    setTracked(open)
    if (!open) setClosing(false)
  }
  return {
    onOpenChange: (next) => {
      if (!next) setClosing(true)
    },
    onOpenChangeComplete: (next) => {
      if (!next) onClosed()
    },
    open: open && !closing,
  }
}
//#endregion
//#region src/components/ui/dialog.tsx
const import_jsx_runtime = require_jsx_runtime()
function Dialog({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogRoot, {
    "data-slot": "dialog",
    ...props,
  })
}
function DialogPortal({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogPortal$1, {
    "data-slot": "dialog-portal",
    ...props,
  })
}
function DialogClose({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose$1, {
    "data-slot": "dialog-close",
    ...props,
  })
}
function DialogOverlay({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogBackdrop, {
    "data-slot": "dialog-overlay",
    "className": cn(
      "fixed inset-0 isolate z-50 bg-black/10 transition-opacity duration-100 supports-backdrop-filter:backdrop-blur-xs data-ending-style:opacity-0 data-starting-style:opacity-0",
      className,
    ),
    ...props,
  })
}
function DialogContent({ className, children, showCloseButton = true, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, {
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPopup, {
        "data-slot": "dialog-content",
        "className": cn(
          "fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-none bg-popover p-4 text-xs/relaxed text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className,
        ),
        ...props,
        "children": [
          children,
          showCloseButton &&
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose$1, {
              "data-slot": "dialog-close",
              "render": /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                variant: "ghost",
                className: "absolute top-2 right-2",
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
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    "data-slot": "dialog-header",
    "className": cn("flex flex-col gap-1 text-left", className),
    ...props,
  })
}
function DialogFooter({ className, showCloseButton = false, children, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    "data-slot": "dialog-footer",
    "className": cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
    ...props,
    "children": [
      children,
      showCloseButton &&
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose$1, {
          render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { variant: "outline" }),
          children: "Close",
        }),
    ],
  })
}
function DialogTitle({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
    "data-slot": "dialog-title",
    "className": cn("font-heading text-sm font-medium", className),
    ...props,
  })
}
function DialogDescription({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
    "data-slot": "dialog-description",
    "className": cn(
      "text-xs/relaxed text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
      className,
    ),
    ...props,
  })
}
//#endregion
//#region src/features/subscriptions/collection-dialog.tsx
function emptyCollectionValues() {
  return {
    name: "",
    folder: "",
    memberIds: [],
    defaultTarget: DEFAULT_TARGET,
    processors: [],
    enabled: true,
  }
}
/**
 * The managed surface for a collection: a name, an optional folder, and the set of persistent pool
 * subscriptions it aggregates. The created row is an ordinary subscription whose source is
 * `{ type: "collection", memberIds }`, so it gets its own fixed token and `/subscribe/<token>` URL
 * like anything else — updating membership keeps that address, exactly like editing any source.
 */
function CollectionDialog({ onOpenChange, onOpenChangeComplete, onSave, open, pools, values }) {
  const [name, setName] = (0, import_react.useState)(values.name)
  const [folder, setFolder] = (0, import_react.useState)(values.folder ?? "")
  const [filter, setFilter] = (0, import_react.useState)("")
  const [selected, setSelected] = (0, import_react.useState)(values.memberIds)
  const [pending, setPending] = (0, import_react.useState)(false)
  const [attempted, setAttempted] = (0, import_react.useState)(false)
  const needle = filter.trim().toLowerCase()
  const visible = (0, import_react.useMemo)(
    () => pools.filter((pool) => !needle || pool.name.toLowerCase().includes(needle)),
    [needle, pools],
  )
  function toggle(memberId) {
    setSelected((current) =>
      current.includes(memberId)
        ? current.filter((entry) => entry !== memberId)
        : current.length >= 64
          ? current
          : [...current, memberId],
    )
  }
  const nameInvalid = attempted && !name.trim()
  const selectionEmpty = attempted && selected.length === 0
  async function submit() {
    if (pending) return
    setAttempted(true)
    if (!name.trim() || selected.length === 0) return
    setPending(true)
    try {
      const memberIds = pools.filter((pool) => selected.includes(pool.id)).map((pool) => pool.id)
      if (
        await onSave(
          {
            name: name.trim(),
            folder: folder.trim() || void 0,
            source: {
              type: "collection",
              memberIds,
            },
            defaultTarget: values.defaultTarget,
            processors: values.processors,
            enabled: values.enabled,
          },
          values.id,
        )
      )
        onOpenChange(false)
    } finally {
      setPending(false)
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
    open,
    onOpenChange,
    onOpenChangeComplete,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
      showCloseButton: false,
      className: "flex max-h-[88svh] flex-col gap-0 p-0 sm:max-w-lg",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
          className:
            "flex-none flex-row items-start justify-between gap-4 border-b p-4 md:px-6 md:py-5",
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className: "flex min-w-0 flex-col gap-1.5",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
                className: "md:text-xl",
                children: values.id ? "编辑集合" : "新建集合",
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
                render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}),
                className: "flex items-center gap-2",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconUsers, {
                    className: "size-3.5 shrink-0",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                    children: "合并多个持久化节点订阅，生成一条独立的固定订阅地址。",
                  }),
                ],
              }),
            ],
          }),
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          className: "flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto p-4 md:px-6",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field$1, {
              "data-invalid": nameInvalid,
              "children": [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
                  htmlFor: "collection-name",
                  children: "名称",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                  "id": "collection-name",
                  "maxLength": 100,
                  "value": name,
                  "onChange": (event) => setName(event.target.value),
                  "aria-invalid": nameInvalid,
                }),
                nameInvalid
                  ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, {
                      children: "名称不能为空。",
                    })
                  : null,
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field$1, {
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
                  htmlFor: "collection-folder",
                  children: "分组",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                  id: "collection-folder",
                  maxLength: 100,
                  value: folder,
                  onChange: (event) => setFolder(event.target.value),
                  placeholder: "可选，例如“主力机场”",
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field$1, {
              "data-invalid": selectionEmpty,
              "children": [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
                  children: "成员（持久化节点订阅）",
                }),
                pools.length === 0
                  ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldDescription, {
                      children:
                        "还没有持久化节点订阅。先在“新建订阅”里用“持久化节点”来源保存节点，再回来创建集合。",
                    })
                  : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                          className: "relative",
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconSearch, {
                              className:
                                "pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground",
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                              "aria-label": "筛选成员",
                              "value": filter,
                              "onChange": (event) => setFilter(event.target.value),
                              "placeholder": "筛选成员",
                              "className": "h-8 pl-8",
                            }),
                          ],
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                          className: "flex max-h-56 flex-col overflow-y-auto border bg-sidebar",
                          children:
                            visible.length === 0
                              ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                                  className: "p-3 text-xs leading-relaxed text-muted-foreground",
                                  children: "没有名称匹配的持久化节点订阅。",
                                })
                              : visible.map((pool) =>
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                                    "label",
                                    {
                                      className:
                                        "flex items-center gap-2.5 border-b px-3 py-2.5 last:border-b-0",
                                      children: [
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
                                          type: "checkbox",
                                          checked: selected.includes(pool.id),
                                          onChange: () => toggle(pool.id),
                                          className: "size-4 shrink-0 accent-foreground",
                                        }),
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                                          className:
                                            "min-w-0 flex-1 truncate text-[12.5px] font-medium",
                                          children: pool.name,
                                        }),
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
                                          className:
                                            "shrink-0 text-[11px] text-muted-foreground tabular-nums",
                                          children: [pool.nodeCount ?? "—", " 节点"],
                                        }),
                                      ],
                                    },
                                    pool.id,
                                  ),
                                ),
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldDescription, {
                          children: [
                            "已选 ",
                            selected.length,
                            " 个成员（最多 ",
                            64,
                            " 个）· 按列表顺序合并，重复端点只保留一个。",
                          ],
                        }),
                        selectionEmpty
                          ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, {
                              children: "至少选择一个持久化节点订阅。",
                            })
                          : null,
                      ],
                    }),
              ],
            }),
          ],
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
          className: "flex-none flex-row gap-2 border-t p-3 md:px-6 md:py-3.5",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
              variant: "outline",
              className: "flex-1 md:h-10 md:flex-none",
              onClick: () => onOpenChange(false),
              children: "取消",
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
              className: cn("flex-[1.4] md:h-10 md:flex-none"),
              disabled: pending || pools.length === 0,
              onClick: () => void submit(),
              children: pending ? "保存中" : values.id ? "保存修改" : "创建集合",
            }),
          ],
        }),
      ],
    }),
  })
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@types_e9c1e83f6bc6140c3efaf3427f2fbf0a/node_modules/@base-ui/react/alert-dialog/root/AlertDialogRoot.mjs
/**
 * Groups all parts of the alert dialog.
 * Doesn't render its own HTML element.
 *
 * Documentation: [Base UI Alert Dialog](https://base-ui.com/react/components/alert-dialog)
 */
function AlertDialogRoot(props) {
  return useRenderDialogRoot("alert-dialog", props)
}
//#endregion
//#region src/components/ui/alert-dialog.tsx
function AlertDialog({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogRoot, {
    "data-slot": "alert-dialog",
    ...props,
  })
}
function AlertDialogPortal({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogPortal$1, {
    "data-slot": "alert-dialog-portal",
    ...props,
  })
}
function AlertDialogOverlay({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogBackdrop, {
    "data-slot": "alert-dialog-overlay",
    "className": cn(
      "fixed inset-0 isolate z-50 bg-black/10 transition-opacity duration-100 supports-backdrop-filter:backdrop-blur-xs data-ending-style:opacity-0 data-starting-style:opacity-0",
      className,
    ),
    ...props,
  })
}
function AlertDialogContent({ className, size = "default", ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, {
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogPopup, {
        "data-slot": "alert-dialog-content",
        "data-size": size,
        "className": cn(
          "group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 rounded-none bg-popover p-4 text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className,
        ),
        ...props,
      }),
    ],
  })
}
function AlertDialogHeader({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    "data-slot": "alert-dialog-header",
    "className": cn(
      "grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-4 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]",
      className,
    ),
    ...props,
  })
}
function AlertDialogFooter({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    "data-slot": "alert-dialog-footer",
    "className": cn(
      "flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end",
      className,
    ),
    ...props,
  })
}
function AlertDialogTitle({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
    "data-slot": "alert-dialog-title",
    "className": cn(
      "font-heading text-sm font-medium sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2",
      className,
    ),
    ...props,
  })
}
function AlertDialogDescription({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
    "data-slot": "alert-dialog-description",
    "className": cn(
      "text-xs/relaxed text-balance text-muted-foreground md:text-pretty *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
      className,
    ),
    ...props,
  })
}
function AlertDialogAction({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
    "data-slot": "alert-dialog-action",
    "className": cn(className),
    ...props,
  })
}
function AlertDialogCancel({ className, variant = "outline", size = "default", ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose$1, {
    "data-slot": "alert-dialog-cancel",
    "className": cn(className),
    "render": /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
      variant,
      size,
    }),
    ...props,
  })
}
//#endregion
//#region src/features/subscriptions/confirm-dialog.tsx
const COPY = {
  rotate: {
    title: "轮换订阅 token？",
    description: "旧订阅地址会立即失效，必须重新分发新地址。",
    confirm: "轮换",
  },
  delete: {
    description: "订阅定义、编译快照和对应地址都会永久失效。",
    confirm: "删除",
  },
}
/**
 * One confirmation for both destructive actions, owned by the page rather than by the button that
 * asks for it. That placement is load-bearing: the detail dialog also asks for these, and a nested
 * alert dialog would unmount together with the dialog that contains it, so the prompt never lands.
 */
function ConfirmDialog({ onConfirm, onOpenChange, request }) {
  const [shown, setShown] = (0, import_react.useState)(null)
  const [tracked, setTracked] = (0, import_react.useState)(request)
  if (tracked !== request) {
    setTracked(request)
    if (request) setShown(request)
  }
  if (!shown) return null
  const copy = COPY[shown.action]
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
    open: Boolean(request),
    onOpenChange,
    onOpenChangeComplete: (open) => {
      if (!open) setShown(null)
    },
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
      size: "sm",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, {
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, {
              children: shown.action === "delete" ? `删除 ${shown.name}？` : COPY.rotate.title,
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, {
              children: copy.description,
            }),
          ],
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, {
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "取消" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
              variant: shown.action === "delete" ? "destructive" : "default",
              onClick: () => onConfirm(shown),
              children: copy.confirm,
            }),
          ],
        }),
      ],
    }),
  })
}
//#endregion
//#region src/features/subscriptions/editor/editor-values.ts
const EMPTY_EDITOR_VALUES = {
  name: "",
  folder: "",
  sourceType: "remote",
  sourceValue: "",
  defaultTarget: DEFAULT_TARGET,
  processors: [],
  enabled: true,
}
function sourceToValues(source) {
  return {
    sourceType: source.type,
    sourceValue:
      source.type === "raw" || source.type === "pool"
        ? source.content
        : source.type === "remote"
          ? source.urls.join("\n")
          : "",
  }
}
function editorValuesFromRecord(subscription) {
  return {
    id: subscription.id,
    name: subscription.name,
    folder: subscription.folder ?? "",
    ...sourceToValues(subscription.source),
    defaultTarget: subscription.defaultTarget,
    processors: subscription.processors ?? [],
    enabled: subscription.enabled,
  }
}
/** Turns the workbench's "存为订阅" hand-off into a prefilled draft, keeping its source kind. */
function editorValuesFromHandoff(handoff) {
  return {
    ...EMPTY_EDITOR_VALUES,
    ...sourceToValues(handoff.source),
    defaultTarget: handoff.defaultTarget,
    processors: handoff.processors,
  }
}
function sourceFromValues(values) {
  if (values.sourceType === "raw")
    return {
      type: "raw",
      content: values.sourceValue,
    }
  if (values.sourceType === "pool")
    return {
      type: "pool",
      content: values.sourceValue,
    }
  if (values.sourceType === "remote")
    return {
      type: "remote",
      urls: splitSourceUrls(values.sourceValue),
    }
  return {
    type: "collection",
    memberIds: [],
  }
}
//#endregion
//#region node_modules/.pnpm/@tanstack+pacer-lite@0.1.1/node_modules/@tanstack/pacer-lite/dist/lite-throttler.js
/**
 * A lightweight class that creates a throttled function.
 *
 * This is an alternative to the Throttler in the core @tanstack/pacer package, but is more
 * suitable for libraries and npm packages that need minimal overhead. Unlike the core Throttler,
 * this version does not use TanStack Store for state management, has no devtools integration,
 * and provides only essential throttling functionality.
 *
 * Throttling ensures a function is called at most once within a specified time window.
 * Unlike debouncing which waits for a pause in calls, throttling guarantees consistent
 * execution timing regardless of call frequency.
 *
 * Supports both leading and trailing edge execution:
 * - Leading: Execute immediately on first call (default: true)
 * - Trailing: Execute after wait period if called during throttle (default: true)
 *
 * Features:
 * - Zero dependencies - no external libraries required
 * - Minimal API surface - only essential methods (maybeExecute, flush, cancel)
 * - Simple state management - uses basic private properties instead of reactive stores
 * - Callback support for monitoring execution events
 * - Lightweight - designed for use in npm packages where bundle size matters
 *
 * @example
 * ```ts
 * const throttler = new LiteThrottler((scrollY: number) => {
 *   updateScrollPosition(scrollY);
 * }, {
 *   wait: 100,
 *   onExecute: (args, throttler) => {
 *     console.log('Updated scroll position:', args[0]);
 *   }
 * });
 *
 * // Will execute at most once per 100ms
 * window.addEventListener('scroll', () => {
 *   throttler.maybeExecute(window.scrollY);
 * });
 * ```
 */
const LiteThrottler = class {
  constructor(fn, options) {
    this.fn = fn
    this.options = options
    this.lastExecutionTime = 0
    this.isPending = false
    this.maybeExecute = (...args) => {
      const timeSinceLastExecution = Date.now() - this.lastExecutionTime
      if (this.options.leading && timeSinceLastExecution >= this.options.wait) this.execute(...args)
      else {
        this.lastArgs = args
        if (!this.timeoutId && this.options.trailing) {
          const timeoutDuration = this.options.wait - timeSinceLastExecution
          this.isPending = true
          this.timeoutId = setTimeout(() => {
            if (this.lastArgs !== void 0) this.execute(...this.lastArgs)
          }, timeoutDuration)
        }
      }
    }
    this.execute = (...args) => {
      this.fn(...args)
      this.options.onExecute?.(args, this)
      this.lastExecutionTime = Date.now()
      this.clearTimeout()
      this.lastArgs = void 0
      this.isPending = false
    }
    this.flush = () => {
      if (this.isPending && this.lastArgs) this.execute(...this.lastArgs)
    }
    this.cancel = () => {
      this.clearTimeout()
      this.lastArgs = void 0
      this.isPending = false
    }
    this.clearTimeout = () => {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId)
        this.timeoutId = void 0
      }
    }
    if (this.options.leading === void 0 && this.options.trailing === void 0) {
      this.options.leading = true
      this.options.trailing = true
    }
  }
}
/**
 * Creates a lightweight throttled function that limits how often the provided function can execute.
 *
 * This is an alternative to the throttle function in the core @tanstack/pacer package, but is more
 * suitable for libraries and npm packages that need minimal overhead. Unlike the core version,
 * this function creates a throttler with no external dependencies, devtools integration, or reactive state.
 *
 * Throttling ensures a function executes at most once within a specified time window,
 * regardless of how many times it is called. This is useful for rate-limiting
 * expensive operations or UI updates.
 *
 * @example
 * ```ts
 * const throttledScroll = liteThrottle(() => {
 *   updateScrollIndicator();
 * }, { wait: 100 });
 *
 * // Will execute at most once per 100ms
 * window.addEventListener('scroll', throttledScroll);
 * ```
 *
 * @example
 * ```ts
 * // Leading edge execution - fires immediately then throttles
 * const throttledResize = liteThrottle(() => {
 *   recalculateLayout();
 * }, { wait: 250, leading: true, trailing: false });
 * ```
 */
function liteThrottle(fn, options) {
  return new LiteThrottler(fn, options).maybeExecute
}
//#endregion
//#region node_modules/.pnpm/@tanstack+devtools-event-client@0.4.4/node_modules/@tanstack/devtools-event-client/dist/esm/plugin.js
const EventClient = class {
  #enabled = true
  #pluginId
  #eventTarget
  #debug
  #queuedEvents
  #connected
  #connectIntervalId
  #connectEveryMs
  #retryCount = 0
  #maxRetries = 5
  #connecting = false
  #failedToConnect = false
  #internalEventTarget = null
  #onConnected = () => {
    this.debugLog("Connected to event bus")
    this.#connected = true
    this.#connecting = false
    this.debugLog("Emitting queued events", this.#queuedEvents)
    this.#queuedEvents.forEach((event) => this.emitEventToBus(event))
    this.#queuedEvents = []
    this.stopConnectLoop()
    this.#eventTarget().removeEventListener("tanstack-connect-success", this.#onConnected)
  }
  #retryConnection = () => {
    if (this.#retryCount < this.#maxRetries) {
      this.#retryCount++
      this.dispatchCustomEvent("tanstack-connect", {})
      return
    }
    this.#eventTarget().removeEventListener("tanstack-connect", this.#retryConnection)
    this.#failedToConnect = true
    this.debugLog("Max retries reached, giving up on connection")
    this.stopConnectLoop()
  }
  #connectFunction = () => {
    if (this.#connecting) return
    this.#connecting = true
    this.#eventTarget().addEventListener("tanstack-connect-success", this.#onConnected)
    this.#retryConnection()
  }
  constructor({ pluginId, debug = false, enabled = true, reconnectEveryMs = 300 }) {
    this.#pluginId = pluginId
    this.#enabled = enabled
    this.#eventTarget = this.getGlobalTarget
    this.#debug = debug
    this.debugLog(" Initializing event subscription for plugin", this.#pluginId)
    this.#queuedEvents = []
    this.#connected = false
    this.#failedToConnect = false
    this.#connectIntervalId = null
    this.#connectEveryMs = reconnectEveryMs
  }
  startConnectLoop() {
    if (this.#connectIntervalId !== null || this.#connected) return
    this.debugLog(`Starting connect loop (every ${this.#connectEveryMs}ms)`)
    this.#connectIntervalId = setInterval(this.#retryConnection, this.#connectEveryMs)
  }
  stopConnectLoop() {
    this.#connecting = false
    if (this.#connectIntervalId === null) return
    clearInterval(this.#connectIntervalId)
    this.#connectIntervalId = null
    this.#queuedEvents = []
    this.debugLog("Stopped connect loop")
  }
  debugLog(...args) {
    if (this.#debug) console.log(`🌴 [tanstack-devtools:${this.#pluginId}-plugin]`, ...args)
  }
  getGlobalTarget() {
    if (typeof globalThis !== "undefined" && globalThis.__TANSTACK_EVENT_TARGET__) {
      this.debugLog("Using global event target")
      return globalThis.__TANSTACK_EVENT_TARGET__
    }
    if (typeof window !== "undefined" && typeof window.addEventListener !== "undefined") {
      this.debugLog("Using window as event target")
      return window
    }
    const eventTarget = typeof EventTarget !== "undefined" ? new EventTarget() : void 0
    if (typeof eventTarget === "undefined" || typeof eventTarget.addEventListener === "undefined") {
      this.debugLog("No event mechanism available, running in non-web environment")
      return {
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }
    }
    this.debugLog("Using new EventTarget as fallback")
    return eventTarget
  }
  getPluginId() {
    return this.#pluginId
  }
  dispatchCustomEventShim(eventName, detail) {
    try {
      const event = new Event(eventName, { detail })
      this.#eventTarget().dispatchEvent(event)
    } catch (e) {
      this.debugLog("Failed to dispatch shim event")
    }
  }
  dispatchCustomEvent(eventName, detail) {
    try {
      this.#eventTarget().dispatchEvent(new CustomEvent(eventName, { detail }))
    } catch (e) {
      this.dispatchCustomEventShim(eventName, detail)
    }
  }
  emitEventToBus(event) {
    this.debugLog("Emitting event to client bus", event)
    this.dispatchCustomEvent("tanstack-dispatch-event", event)
  }
  createEventPayload(eventSuffix, payload) {
    return {
      type: `${this.#pluginId}:${eventSuffix}`,
      payload,
      pluginId: this.#pluginId,
    }
  }
  emit(eventSuffix, payload) {
    if (!this.#enabled) {
      this.debugLog("Event bus client is disabled, not emitting event", eventSuffix, payload)
      return
    }
    if (this.#internalEventTarget) {
      this.debugLog("Emitting event to internal event target", eventSuffix, payload)
      this.#internalEventTarget.dispatchEvent(
        new CustomEvent(`${this.#pluginId}:${eventSuffix}`, {
          detail: this.createEventPayload(eventSuffix, payload),
        }),
      )
    }
    if (this.#failedToConnect) {
      this.debugLog("Previously failed to connect, not emitting to bus")
      return
    }
    if (!this.#connected) {
      this.debugLog("Bus not available, will be pushed as soon as connected")
      this.#queuedEvents.push(this.createEventPayload(eventSuffix, payload))
      if (typeof CustomEvent !== "undefined" && !this.#connecting) {
        this.#connectFunction()
        this.startConnectLoop()
      }
      return
    }
    return this.emitEventToBus(this.createEventPayload(eventSuffix, payload))
  }
  on(eventSuffix, cb, options) {
    const withEventTarget = options?.withEventTarget ?? false
    const eventName = `${this.#pluginId}:${eventSuffix}`
    if (withEventTarget) {
      if (!this.#internalEventTarget) this.#internalEventTarget = new EventTarget()
      this.#internalEventTarget.addEventListener(eventName, (e) => {
        cb(e.detail)
      })
    }
    if (!this.#enabled) {
      this.debugLog("Event bus client is disabled, not registering event", eventName)
      return () => {}
    }
    const handler = (e) => {
      this.debugLog("Received event from bus", e.detail)
      cb(e.detail)
    }
    this.#eventTarget().addEventListener(eventName, handler)
    this.debugLog("Registered event to bus", eventName)
    return () => {
      if (withEventTarget) this.#internalEventTarget?.removeEventListener(eventName, handler)
      this.#eventTarget().removeEventListener(eventName, handler)
    }
  }
  onAll(cb) {
    if (!this.#enabled) {
      this.debugLog("Event bus client is disabled, not registering event")
      return () => {}
    }
    const handler = (e) => {
      const event = e.detail
      cb(event)
    }
    this.#eventTarget().addEventListener("tanstack-devtools-global", handler)
    return () => this.#eventTarget().removeEventListener("tanstack-devtools-global", handler)
  }
  onAllPluginEvents(cb) {
    if (!this.#enabled) {
      this.debugLog("Event bus client is disabled, not registering event")
      return () => {}
    }
    const handler = (e) => {
      const event = e.detail
      if (this.#pluginId && event.pluginId !== this.#pluginId) return
      cb(event)
    }
    this.#eventTarget().addEventListener("tanstack-devtools-global", handler)
    return () => this.#eventTarget().removeEventListener("tanstack-devtools-global", handler)
  }
}
//#endregion
//#region node_modules/.pnpm/@tanstack+form-core@1.33.5/node_modules/@tanstack/form-core/dist/esm/EventClient.js
const FormEventClient = class extends EventClient {
  constructor() {
    super({
      pluginId: "form-devtools",
      reconnectEveryMs: 1e3,
    })
  }
}
const formEventClient = new FormEventClient()
//#endregion
//#region node_modules/.pnpm/@tanstack+form-core@1.33.5/node_modules/@tanstack/form-core/dist/esm/utils.js
function functionalUpdate(updater, input) {
  return typeof updater === "function" ? updater(input) : updater
}
function getBy(obj, path) {
  return makePathArray(path).reduce((current, pathPart) => {
    if (current === null) return null
    if (current !== undefined) return current[pathPart]
  }, obj)
}
function setBy(obj, _path, updater) {
  const path = makePathArray(_path)
  function doSet(parent) {
    if (path.length === 0) return functionalUpdate(updater, parent)
    const key = path.shift()
    if (typeof key === "string" || (typeof key === "number" && !Array.isArray(parent))) {
      if (typeof parent === "object") {
        if (parent === null) parent = {}
        return {
          ...parent,
          [key]: doSet(parent[key]),
        }
      }
      return { [key]: doSet() }
    }
    if (Array.isArray(parent) && typeof key === "number") {
      const prefix = parent.slice(0, key)
      return [
        ...(prefix.length > 0 ? prefix : new Array(key)),
        doSet(parent[key]),
        ...parent.slice(key + 1),
      ]
    }
    return [...new Array(key), doSet()]
  }
  return doSet(obj)
}
function deleteBy(obj, _path) {
  const path = makePathArray(_path)
  function doDelete(parent) {
    if (!parent) return
    if (path.length === 1) {
      const finalPath = path[0]
      if (Array.isArray(parent) && typeof finalPath === "number")
        return parent.filter((_, i) => i !== finalPath)
      const { [finalPath]: remove, ...rest } = parent
      return rest
    }
    const key = path.shift()
    if (typeof key === "string" || (typeof key === "number" && !Array.isArray(parent))) {
      if (typeof parent === "object")
        return {
          ...parent,
          [key]: doDelete(parent[key]),
        }
    }
    if (typeof key === "number") {
      if (Array.isArray(parent)) {
        if (key >= parent.length) return parent
        const prefix = parent.slice(0, key)
        return [
          ...(prefix.length > 0 ? prefix : new Array(key)),
          doDelete(parent[key]),
          ...parent.slice(key + 1),
        ]
      }
    }
    throw new Error("It seems we have created an infinite loop in deleteBy. ")
  }
  return doDelete(obj)
}
const CC_DOT = 46
const CC_OPEN = 91
const CC_CLOSE = 93
const CC_ZERO = 48
const CC_NINE = 57
function makePathArray(str) {
  if (Array.isArray(str)) return [...str]
  if (typeof str !== "string") throw new Error("Path must be a string.")
  const len = str.length
  const result = []
  let segStart = len > 0 && str.charCodeAt(0) === CC_OPEN ? 1 : 0
  let allDigits = true
  let prev = -1
  for (let i = segStart; i <= len; i++) {
    const char = i < len ? str.charCodeAt(i) : -1
    if (i === len || char === CC_DOT || char === CC_OPEN || char === CC_CLOSE) {
      const segLen = i - segStart
      if (segLen > 0) {
        const treatAsNumber = allDigits && (segLen === 1 || str.charCodeAt(segStart) !== CC_ZERO)
        const seg = str.slice(segStart, i)
        if (treatAsNumber) {
          const num = parseInt(seg, 10)
          if (segLen <= 15 || String(num) === seg) result.push(num)
          else result.push(seg)
        } else result.push(seg)
      } else if (
        prev !== CC_CLOSE &&
        !(prev === -1 && char === CC_CLOSE) &&
        !(prev === char && (char === CC_DOT || char === CC_OPEN))
      )
        result.push("")
      segStart = i + 1
      allDigits = true
    } else if (char < CC_ZERO || char > CC_NINE) allDigits = false
    prev = char
  }
  if (result.length === 0) result.push("")
  return result
}
function isNonEmptyArray(obj) {
  return !(Array.isArray(obj) && obj.length === 0)
}
function getSyncValidatorArray(cause, options) {
  const runValidation = (props) => {
    return props.validators.filter(Boolean).map((validator) => {
      return {
        cause: validator.cause,
        validate: validator.fn,
      }
    })
  }
  return options.validationLogic({
    form: options.form,
    group: options.group,
    validators: options.validators,
    event: {
      type: cause,
      fieldName: options.fieldName,
      async: false,
    },
    runValidation,
  })
}
function getAsyncValidatorArray(cause, options) {
  const { asyncDebounceMs } = options
  const { onBlurAsyncDebounceMs, onChangeAsyncDebounceMs, onDynamicAsyncDebounceMs } =
    options.validators || {}
  const defaultDebounceMs = asyncDebounceMs ?? 0
  const runValidation = (props) => {
    return props.validators.filter(Boolean).map((validator) => {
      const validatorCause = validator?.cause || cause
      let debounceMs = defaultDebounceMs
      switch (validatorCause) {
        case "change":
          debounceMs = onChangeAsyncDebounceMs ?? defaultDebounceMs
          break
        case "blur":
          debounceMs = onBlurAsyncDebounceMs ?? defaultDebounceMs
          break
        case "dynamic":
          debounceMs = onDynamicAsyncDebounceMs ?? defaultDebounceMs
          break
        case "submit":
          debounceMs = 0
      }
      if (cause === "submit") debounceMs = 0
      return {
        cause: validatorCause,
        validate: validator.fn,
        debounceMs,
      }
    })
  }
  return options.validationLogic({
    form: options.form,
    group: options.group,
    validators: options.validators,
    event: {
      type: cause,
      fieldName: options.fieldName,
      async: true,
    },
    runValidation,
  })
}
const isGlobalFormValidationError = (error) => {
  return !!error && typeof error === "object" && "fields" in error
}
function evaluate(objA, objB) {
  if (Object.is(objA, objB)) return true
  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null)
    return false
  if (objA instanceof Date && objB instanceof Date) return objA.getTime() === objB.getTime()
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
  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)
  if (keysA.length !== keysB.length) return false
  if (
    keysA.length === 0 &&
    !Array.isArray(objA) &&
    !Array.isArray(objB) &&
    (Object.getPrototypeOf(objA) !== Object.prototype ||
      Object.getPrototypeOf(objB) !== Object.prototype)
  )
    return false
  for (const key of keysA) if (!keysB.includes(key) || !evaluate(objA[key], objB[key])) return false
  return true
}
const determineFormLevelErrorSourceAndValue = ({
  newFormValidatorError,
  isPreviousErrorFromFormValidator,
  previousErrorValue,
}) => {
  if (newFormValidatorError)
    return {
      newErrorValue: newFormValidatorError,
      newSource: "form",
    }
  if (isPreviousErrorFromFormValidator)
    return {
      newErrorValue: void 0,
      newSource: void 0,
    }
  if (previousErrorValue)
    return {
      newErrorValue: previousErrorValue,
      newSource: "field",
    }
  return {
    newErrorValue: void 0,
    newSource: void 0,
  }
}
const determineFieldLevelErrorSourceAndValue = ({ formLevelError, fieldLevelError }) => {
  if (fieldLevelError)
    return {
      newErrorValue: fieldLevelError,
      newSource: "field",
    }
  if (formLevelError)
    return {
      newErrorValue: formLevelError,
      newSource: "form",
    }
  return {
    newErrorValue: void 0,
    newSource: void 0,
  }
}
function mergeOpts(originalOpts, overrides) {
  if (originalOpts === void 0 || originalOpts === null) return overrides
  return {
    ...originalOpts,
    ...overrides,
  }
}
let IDX = 256
const HEX = []
let BUFFER
while (IDX--) HEX[IDX] = (IDX + 256).toString(16).slice(1)
function uuid() {
  let i = 0
  let num
  let out = ""
  if (!BUFFER || IDX + 16 > 256) {
    BUFFER = new Array(256)
    i = 256
    while (i--) BUFFER[i] = (256 * Math.random()) | 0
    i = 0
    IDX = 0
  }
  for (; i < 16; i++) {
    num = BUFFER[IDX + i]
    if (i === 6) out += HEX[(num & 15) | 64]
    else if (i === 8) out += HEX[(num & 63) | 128]
    else out += HEX[num]
    if (i & 1 && i > 1 && i < 11) out += "-"
  }
  IDX++
  return out
}
const throttleFormState = liteThrottle(
  (form) =>
    formEventClient.emit("form-state", {
      id: form.formId,
      state: form.store.state,
    }),
  { wait: 300 },
)
function deepCopy(obj) {
  if (obj === null || typeof obj !== "object") return obj
  if (obj instanceof Date) return new Date(obj.getTime())
  if (Array.isArray(obj)) {
    const arrCopy = []
    for (let i = 0; i < obj.length; i++) arrCopy[i] = deepCopy(obj[i])
    return arrCopy
  }
  if (obj instanceof Map) {
    const mapCopy = /* @__PURE__ */ new Map()
    obj.forEach((value, key) => {
      mapCopy.set(key, deepCopy(value))
    })
    return mapCopy
  }
  if (obj instanceof Set) {
    const setCopy = /* @__PURE__ */ new Set()
    obj.forEach((value) => {
      setCopy.add(deepCopy(value))
    })
    return setCopy
  }
  const copy = {}
  for (const key in obj) if (Object.hasOwn(obj, key)) copy[key] = deepCopy(obj[key])
  return copy
}
function isFieldInGroup(groupName, fieldName) {
  return (
    fieldName === groupName ||
    fieldName.startsWith(`${groupName}.`) ||
    fieldName.startsWith(`${groupName}[`)
  )
}
//#endregion
//#region node_modules/.pnpm/@tanstack+form-core@1.33.5/node_modules/@tanstack/form-core/dist/esm/ValidationLogic.js
const defaultValidationLogic = (props) => {
  if (!props.validators)
    return props.runValidation({
      validators: [],
      form: props.form,
    })
  const isAsync = props.event.async
  const onMountValidator = isAsync
    ? void 0
    : {
        fn: props.validators.onMount,
        cause: "mount",
      }
  const onChangeValidator = {
    fn: isAsync ? props.validators.onChangeAsync : props.validators.onChange,
    cause: "change",
  }
  const onBlurValidator = {
    fn: isAsync ? props.validators.onBlurAsync : props.validators.onBlur,
    cause: "blur",
  }
  const onSubmitValidator = {
    fn: isAsync ? props.validators.onSubmitAsync : props.validators.onSubmit,
    cause: "submit",
  }
  const onServerValidator = isAsync
    ? void 0
    : {
        fn: () => void 0,
        cause: "server",
      }
  switch (props.event.type) {
    case "mount":
      return props.runValidation({
        validators: [onMountValidator],
        form: props.form,
      })
    case "submit":
      return props.runValidation({
        validators: [onChangeValidator, onBlurValidator, onSubmitValidator, onServerValidator],
        form: props.form,
      })
    case "server":
      return props.runValidation({
        validators: [],
        form: props.form,
      })
    case "blur":
      return props.runValidation({
        validators: [onBlurValidator, onServerValidator],
        form: props.form,
      })
    case "change":
      return props.runValidation({
        validators: [onChangeValidator, onServerValidator],
        form: props.form,
      })
    default:
      throw new Error(`Unknown validation event type: ${props.event.type}`)
  }
}
//#endregion
//#region node_modules/.pnpm/@tanstack+form-core@1.33.5/node_modules/@tanstack/form-core/dist/esm/standardSchemaValidator.js
function prefixSchemaToErrors(issues, formValue) {
  const schema = /* @__PURE__ */ new Map()
  for (const issue of issues) {
    const issuePath = issue.path ?? []
    let currentFormValue = formValue
    let path = ""
    for (let i = 0; i < issuePath.length; i++) {
      const pathSegment = issuePath[i]
      if (pathSegment === void 0) continue
      const segment = typeof pathSegment === "object" ? pathSegment.key : pathSegment
      const segmentAsNumber = Number(segment)
      if (Array.isArray(currentFormValue) && !Number.isNaN(segmentAsNumber))
        path += `[${segmentAsNumber}]`
      else path += (i > 0 ? "." : "") + String(segment)
      if (typeof currentFormValue === "object" && currentFormValue !== null)
        currentFormValue = currentFormValue[segment]
      else currentFormValue = void 0
    }
    schema.set(path, (schema.get(path) ?? []).concat(issue))
  }
  return Object.fromEntries(schema)
}
const transformFormIssues = (issues, formValue) => {
  const schemaErrors = prefixSchemaToErrors(issues, formValue)
  return {
    form: schemaErrors,
    fields: schemaErrors,
  }
}
const standardSchemaValidators = {
  validate({ value, validationSource }, schema) {
    const result = schema["~standard"].validate(value)
    if (result instanceof Promise) throw new Error("async function passed to sync validator")
    if (!result.issues) return
    if (validationSource === "field") return result.issues
    return transformFormIssues(result.issues, value)
  },
  async validateAsync({ value, validationSource }, schema) {
    const result = await schema["~standard"].validate(value)
    if (!result.issues) return
    if (validationSource === "field") return result.issues
    return transformFormIssues(result.issues, value)
  },
}
const isStandardSchemaValidator = (validator) => !!validator && "~standard" in validator
//#endregion
//#region node_modules/.pnpm/@tanstack+form-core@1.33.5/node_modules/@tanstack/form-core/dist/esm/metaHelper.js
const defaultFieldMeta = {
  isValidating: false,
  isTouched: false,
  isBlurred: false,
  isDirty: false,
  isPristine: true,
  isValid: true,
  isDefaultValue: true,
  errors: [],
  errorMap: {},
  errorSourceMap: {},
  _arrayVersion: 0,
  _pendingValidationsCount: 0,
}
function metaHelper(formApi) {
  function bumpArrayVersion(field) {
    const currentMeta = formApi.getFieldMeta(field) ?? defaultFieldMeta
    formApi.setFieldMeta(field, {
      ...currentMeta,
      _arrayVersion: (currentMeta._arrayVersion || 0) + 1,
    })
  }
  function handleArrayMove(field, fromIndex, toIndex) {
    bumpArrayVersion(field)
    const affectedFields = getAffectedFields(field, fromIndex, "move", toIndex)
    const startIndex = Math.min(fromIndex, toIndex)
    const endIndex = Math.max(fromIndex, toIndex)
    for (let i = startIndex; i <= endIndex; i++) affectedFields.push(getFieldPath(field, i))
    const fromFields = Object.keys(formApi.fieldInfo).reduce((fieldMap, fieldKey) => {
      if (fieldKey.startsWith(getFieldPath(field, fromIndex)))
        fieldMap.set(fieldKey, formApi.getFieldMeta(fieldKey))
      return fieldMap
    }, /* @__PURE__ */ new Map())
    shiftMeta(affectedFields, fromIndex < toIndex ? "up" : "down")
    Object.keys(formApi.fieldInfo)
      .filter((fieldKey) => fieldKey.startsWith(getFieldPath(field, toIndex)))
      .forEach((fieldKey) => {
        const fromKey = fieldKey.replace(
          getFieldPath(field, toIndex),
          getFieldPath(field, fromIndex),
        )
        const fromMeta = fromFields.get(fromKey)
        if (fromMeta) formApi.setFieldMeta(fieldKey, fromMeta)
      })
  }
  function handleArrayRemove(field, index) {
    bumpArrayVersion(field)
    shiftMeta(getAffectedFields(field, index, "remove"), "up")
  }
  function handleArraySwap(field, index, secondIndex) {
    bumpArrayVersion(field)
    getAffectedFields(field, index, "swap", secondIndex).forEach((fieldKey) => {
      if (!fieldKey.toString().startsWith(getFieldPath(field, index))) return
      const swappedKey = fieldKey
        .toString()
        .replace(getFieldPath(field, index), getFieldPath(field, secondIndex))
      const [meta1, meta2] = [formApi.getFieldMeta(fieldKey), formApi.getFieldMeta(swappedKey)]
      if (meta1) formApi.setFieldMeta(swappedKey, meta1)
      if (meta2) formApi.setFieldMeta(fieldKey, meta2)
    })
  }
  function handleArrayInsert(field, insertIndex) {
    bumpArrayVersion(field)
    const affectedFields = getAffectedFields(field, insertIndex, "insert")
    shiftMeta(affectedFields, "down")
    affectedFields.forEach((fieldKey) => {
      if (fieldKey.toString().startsWith(getFieldPath(field, insertIndex)))
        formApi.setFieldMeta(fieldKey, getEmptyFieldMeta())
    })
  }
  function getFieldPath(field, index) {
    return `${field}[${index}]`
  }
  function getAffectedFields(field, index, mode, secondIndex) {
    const affectedFieldKeys = [getFieldPath(field, index)]
    switch (mode) {
      case "swap":
        affectedFieldKeys.push(getFieldPath(field, secondIndex))
        break
      case "move": {
        const [startIndex, endIndex] = [Math.min(index, secondIndex), Math.max(index, secondIndex)]
        for (let i = startIndex; i <= endIndex; i++) affectedFieldKeys.push(getFieldPath(field, i))
        break
      }
      default: {
        const currentValue = formApi.getFieldValue(field)
        const fieldItems = Array.isArray(currentValue) ? currentValue.length : 0
        for (let i = index + 1; i < fieldItems; i++) affectedFieldKeys.push(getFieldPath(field, i))
        break
      }
    }
    return Object.keys(formApi.fieldInfo).filter((fieldKey) =>
      affectedFieldKeys.some((key) => fieldKey.startsWith(key)),
    )
  }
  function updateIndex(fieldKey, direction) {
    return fieldKey.replace(/\[(\d+)\]/, (_, num) => {
      const currIndex = parseInt(num, 10)
      return `[${direction === "up" ? currIndex + 1 : Math.max(0, currIndex - 1)}]`
    })
  }
  function shiftMeta(fields, direction) {
    ;(direction === "up" ? fields : [...fields].reverse()).forEach((fieldKey) => {
      const nextFieldKey = updateIndex(fieldKey.toString(), direction)
      const nextFieldMeta = formApi.getFieldMeta(nextFieldKey)
      if (nextFieldMeta) formApi.setFieldMeta(fieldKey, nextFieldMeta)
      else formApi.setFieldMeta(fieldKey, getEmptyFieldMeta())
    })
  }
  const getEmptyFieldMeta = () => defaultFieldMeta
  return {
    bumpArrayVersion,
    handleArrayMove,
    handleArrayRemove,
    handleArraySwap,
    handleArrayInsert,
  }
}
//#endregion
//#region node_modules/.pnpm/@tanstack+form-core@1.33.5/node_modules/@tanstack/form-core/dist/esm/FormApi.js
function getDefaultFormState(defaultState) {
  return {
    values: defaultState.values ?? {},
    errorMap: defaultState.errorMap ?? {},
    fieldMetaBase: defaultState.fieldMetaBase ?? {},
    formGroupStateBase: defaultState.formGroupStateBase ?? {},
    isSubmitted: defaultState.isSubmitted ?? false,
    isSubmitting: defaultState.isSubmitting ?? false,
    isValidating: defaultState.isValidating ?? false,
    submissionAttempts: defaultState.submissionAttempts ?? 0,
    isSubmitSuccessful: defaultState.isSubmitSuccessful ?? false,
    validationMetaMap: defaultState.validationMetaMap ?? {
      onChange: void 0,
      onBlur: void 0,
      onSubmit: void 0,
      onMount: void 0,
      onServer: void 0,
      onDynamic: void 0,
    },
  }
}
const FormApi = class {
  /**
   * Constructs a new `FormApi` instance with the given form options.
   */
  constructor(opts) {
    this.options = {}
    this.fieldInfo = {}
    this.formGroupApis = /* @__PURE__ */ new Set()
    this.mount = () => {
      const cleanupDevtoolBroadcast = this.store.subscribe(() => {
        throttleFormState(this)
      })
      const cleanupFormStateListener = formEventClient.on("request-form-state", (e) => {
        if (e.payload.id === this._formId)
          formEventClient.emit("form-api", {
            id: this._formId,
            state: this.store.state,
            options: this.options,
          })
      })
      const cleanupFormResetListener = formEventClient.on("request-form-reset", (e) => {
        if (e.payload.id === this._formId) this.reset()
      })
      const cleanupFormForceSubmitListener = formEventClient.on(
        "request-form-force-submit",
        (e) => {
          if (e.payload.id === this._formId) {
            this._devtoolsSubmissionOverride = true
            this.handleSubmit()
            this._devtoolsSubmissionOverride = false
          }
        },
      )
      const cleanup = () => {
        cleanupFormForceSubmitListener()
        cleanupFormResetListener()
        cleanupFormStateListener()
        cleanupDevtoolBroadcast.unsubscribe()
        formEventClient.emit("form-unmounted", { id: this._formId })
      }
      this.options.listeners?.onMount?.({ formApi: this })
      const { onMount } = this.options.validators || {}
      formEventClient.emit("form-api", {
        id: this._formId,
        state: this.store.state,
        options: this.options,
      })
      if (!onMount) return cleanup
      this.validateSync("mount")
      return cleanup
    }
    this.update = (options) => {
      if (!options) return
      const oldOptions = this.options
      this.options = options
      const shouldUpdateValues =
        options.defaultValues &&
        !evaluate(options.defaultValues, oldOptions.defaultValues) &&
        !this.state.isTouched
      const shouldUpdateState =
        !evaluate(options.defaultState, oldOptions.defaultState) && !this.state.isTouched
      if (!shouldUpdateValues && !shouldUpdateState) return
      batch(() => {
        this.baseStore.setState(() =>
          getDefaultFormState(
            Object.assign(
              {},
              this.state,
              shouldUpdateState ? options.defaultState : {},
              shouldUpdateValues ? { values: options.defaultValues } : {},
            ),
          ),
        )
      })
      if (shouldUpdateValues) {
        const helper = metaHelper(this)
        for (const fieldKey of Object.keys(this.fieldInfo))
          if (Array.isArray(this.getFieldValue(fieldKey))) helper.bumpArrayVersion(fieldKey)
      }
      formEventClient.emit("form-api", {
        id: this._formId,
        state: this.store.state,
        options: this.options,
      })
    }
    this.reset = (values, opts2) => {
      const { fieldMeta: currentFieldMeta } = this.state
      const fieldMetaBase = this.resetFieldMeta(currentFieldMeta)
      if (values && !opts2?.keepDefaultValues)
        this.options = {
          ...this.options,
          defaultValues: values,
        }
      this.baseStore.setState(() => {
        let nextValues = values ?? this.options.defaultValues ?? this.options.defaultState?.values
        if (!values)
          Object.values(this.fieldInfo).forEach((fieldInfo) => {
            if (fieldInfo.instance && fieldInfo.instance.options.defaultValue !== void 0)
              nextValues = setBy(
                nextValues,
                fieldInfo.instance.name,
                fieldInfo.instance.options.defaultValue,
              )
          })
        return getDefaultFormState({
          ...this.options.defaultState,
          values: nextValues,
          fieldMetaBase,
        })
      })
    }
    this.validateAllFields = async (cause) => {
      const fieldValidationPromises = []
      batch(() => {
        Object.values(this.fieldInfo).forEach((field) => {
          if (!field.instance) return
          const fieldInstance = field.instance
          fieldValidationPromises.push(
            Promise.resolve().then(() =>
              fieldInstance.validate(cause, {
                skipFormValidation: true,
                skipGroupValidation: true,
              }),
            ),
          )
          if (!field.instance.store.state.meta.isTouched)
            field.instance.setMeta((prev) => ({
              ...prev,
              isTouched: true,
            }))
        })
      })
      return (await Promise.all(fieldValidationPromises)).flat()
    }
    this.validateArrayFieldsStartingFrom = async (field, index, cause) => {
      const currentValue = this.getFieldValue(field)
      const lastIndex = Array.isArray(currentValue) ? Math.max(currentValue.length - 1, 0) : null
      const fieldKeysToValidate = [`${field}[${index}]`]
      for (let i = index + 1; i <= (lastIndex ?? 0); i++) fieldKeysToValidate.push(`${field}[${i}]`)
      const fieldsToValidate = Object.keys(this.fieldInfo).filter((fieldKey) =>
        fieldKeysToValidate.some((key) => fieldKey.startsWith(key)),
      )
      const fieldValidationPromises = []
      batch(() => {
        fieldsToValidate.forEach((nestedField) => {
          fieldValidationPromises.push(
            Promise.resolve().then(() => this.validateField(nestedField, cause)),
          )
        })
      })
      return (await Promise.all(fieldValidationPromises)).flat()
    }
    this.validateField = (field, cause) => {
      const fieldInstance = this.fieldInfo[field]?.instance
      if (!fieldInstance) {
        const { hasErrored } = this.validateSync(cause)
        if (hasErrored && !this.options.asyncAlways) return this.getFieldMeta(field)?.errors ?? []
        return this.validateAsync(cause).then(() => {
          return this.getFieldMeta(field)?.errors ?? []
        })
      }
      if (!fieldInstance.store.state.meta.isTouched)
        fieldInstance.setMeta((prev) => ({
          ...prev,
          isTouched: true,
        }))
      return fieldInstance.validate(cause)
    }
    this.validateSync = (cause, validateOpts) => {
      const validates = getSyncValidatorArray(cause, {
        ...this.options,
        form: this,
        group: validateOpts?.group,
        validationLogic: this.options.validationLogic || defaultValidationLogic,
      })
      let hasErrored = false
      const currentValidationErrorMap = {}
      batch(() => {
        for (const validateObj of validates) {
          if (!validateObj.validate) continue
          const { formError, fieldErrors } = normalizeError$2(
            this.runValidator({
              validate: validateObj.validate,
              value: {
                value: this.state.values,
                formApi: this,
                validationSource: "form",
              },
              type: "validate",
            }),
          )
          const errorMapKey = getErrorMapKey$2(validateObj.cause)
          let allFieldsToProcess = /* @__PURE__ */ new Set([
            ...Object.keys(this.state.fieldMeta),
            ...Object.keys(fieldErrors || {}),
          ])
          if (validateOpts?.filterFieldNames)
            allFieldsToProcess = new Set(
              [...allFieldsToProcess].filter(validateOpts.filterFieldNames),
            )
          for (const field of allFieldsToProcess) {
            if (this.baseStore.state.fieldMetaBase[field] === void 0 && !fieldErrors?.[field])
              continue
            const { errorMap: currentErrorMap, errorSourceMap: currentErrorMapSource } =
              this.getFieldMeta(field) ?? defaultFieldMeta
            const newFormValidatorError = fieldErrors?.[field]
            const { newErrorValue, newSource } = determineFormLevelErrorSourceAndValue({
              newFormValidatorError,
              isPreviousErrorFromFormValidator: currentErrorMapSource?.[errorMapKey] === "form",
              previousErrorValue: currentErrorMap?.[errorMapKey],
            })
            if (newSource === "form")
              currentValidationErrorMap[field] = {
                ...currentValidationErrorMap[field],
                [errorMapKey]: newFormValidatorError,
              }
            if (currentErrorMap?.[errorMapKey] !== newErrorValue)
              this.setFieldMeta(field, (prev = defaultFieldMeta) => ({
                ...prev,
                errorMap: {
                  ...prev.errorMap,
                  [errorMapKey]: newErrorValue,
                },
                errorSourceMap: {
                  ...prev.errorSourceMap,
                  [errorMapKey]: newSource,
                },
              }))
          }
          if (!validateOpts?.dontUpdateFormErrorMap) {
            if (this.state.errorMap?.[errorMapKey] !== formError)
              this.baseStore.setState((prev) => ({
                ...prev,
                errorMap: {
                  ...prev.errorMap,
                  [errorMapKey]: formError,
                },
              }))
          }
          if (formError || fieldErrors) hasErrored = true
        }
        if (validateOpts?.dontUpdateFormErrorMap) return
        const submitErrKey = getErrorMapKey$2("submit")
        if (this.state.errorMap?.[submitErrKey] && cause !== "submit" && !hasErrored)
          this.baseStore.setState((prev) => ({
            ...prev,
            errorMap: {
              ...prev.errorMap,
              [submitErrKey]: void 0,
            },
          }))
        const serverErrKey = getErrorMapKey$2("server")
        if (this.state.errorMap?.[serverErrKey] && cause !== "server" && !hasErrored)
          this.baseStore.setState((prev) => ({
            ...prev,
            errorMap: {
              ...prev.errorMap,
              [serverErrKey]: void 0,
            },
          }))
      })
      return {
        hasErrored,
        fieldsErrorMap: currentValidationErrorMap,
      }
    }
    this.validateAsync = async (cause, validateOpts) => {
      const validates = getAsyncValidatorArray(cause, {
        ...this.options,
        form: this,
        group: validateOpts?.group,
        validationLogic: this.options.validationLogic || defaultValidationLogic,
      })
      if (!this.state.isFormValidating)
        this.baseStore.setState((prev) => ({
          ...prev,
          isFormValidating: true,
        }))
      const promises = []
      let fieldErrorsFromFormValidators
      for (const validateObj of validates) {
        if (!validateObj.validate) continue
        const key = getErrorMapKey$2(validateObj.cause)
        this.state.validationMetaMap[key]?.lastAbortController.abort()
        const controller = new AbortController()
        this.state.validationMetaMap[key] = { lastAbortController: controller }
        promises.push(
          new Promise(async (resolve) => {
            let rawError
            try {
              rawError = await new Promise((rawResolve, rawReject) => {
                setTimeout(async () => {
                  if (controller.signal.aborted) return rawResolve(void 0)
                  try {
                    rawResolve(
                      await this.runValidator({
                        validate: validateObj.validate,
                        value: {
                          value: this.state.values,
                          formApi: this,
                          validationSource: "form",
                          signal: controller.signal,
                        },
                        type: "validateAsync",
                      }),
                    )
                  } catch (e) {
                    rawReject(e)
                  }
                }, validateObj.debounceMs)
              })
            } catch (e) {
              rawError = e
            }
            const { formError, fieldErrors: fieldErrorsFromNormalizeError } =
              normalizeError$2(rawError)
            if (fieldErrorsFromNormalizeError)
              fieldErrorsFromFormValidators = fieldErrorsFromFormValidators
                ? {
                    ...fieldErrorsFromFormValidators,
                    ...fieldErrorsFromNormalizeError,
                  }
                : fieldErrorsFromNormalizeError
            const errorMapKey = getErrorMapKey$2(validateObj.cause)
            const allFieldsToProcess = /* @__PURE__ */ new Set([
              ...Object.keys(this.state.fieldMeta),
              ...Object.keys(fieldErrorsFromFormValidators || {}),
            ])
            let fields = Array.from(allFieldsToProcess)
            if (validateOpts?.filterFieldNames)
              fields = fields.filter(validateOpts.filterFieldNames)
            for (const field of fields) {
              if (
                this.baseStore.state.fieldMetaBase[field] === void 0 &&
                !fieldErrorsFromFormValidators?.[field]
              )
                continue
              const { errorMap: currentErrorMap, errorSourceMap: currentErrorMapSource } =
                this.getFieldMeta(field) ?? defaultFieldMeta
              const newFormValidatorError = fieldErrorsFromFormValidators?.[field]
              const { newErrorValue, newSource } = determineFormLevelErrorSourceAndValue({
                newFormValidatorError,
                isPreviousErrorFromFormValidator: currentErrorMapSource?.[errorMapKey] === "form",
                previousErrorValue: currentErrorMap?.[errorMapKey],
              })
              if (currentErrorMap?.[errorMapKey] !== newErrorValue)
                this.setFieldMeta(field, (prev = defaultFieldMeta) => ({
                  ...prev,
                  errorMap: {
                    ...prev.errorMap,
                    [errorMapKey]: newErrorValue,
                  },
                  errorSourceMap: {
                    ...prev.errorSourceMap,
                    [errorMapKey]: newSource,
                  },
                }))
            }
            if (!validateOpts?.dontUpdateFormErrorMap)
              this.baseStore.setState((prev) => ({
                ...prev,
                errorMap: {
                  ...prev.errorMap,
                  [errorMapKey]: formError,
                },
              }))
            resolve(
              fieldErrorsFromFormValidators
                ? {
                    fieldErrors: fieldErrorsFromFormValidators,
                    errorMapKey,
                  }
                : void 0,
            )
          }),
        )
      }
      let results = []
      const fieldsErrorMap = {}
      if (promises.length) {
        results = await Promise.all(promises)
        for (const fieldValidationResult of results)
          if (fieldValidationResult?.fieldErrors) {
            const { errorMapKey } = fieldValidationResult
            for (const [field, fieldError] of Object.entries(fieldValidationResult.fieldErrors))
              fieldsErrorMap[field] = {
                ...(fieldsErrorMap[field] || {}),
                [errorMapKey]: fieldError,
              }
          }
      }
      this.baseStore.setState((prev) => ({
        ...prev,
        isFormValidating: false,
      }))
      return fieldsErrorMap
    }
    this.validate = (cause, validateOpts) => {
      const { hasErrored, fieldsErrorMap } = this.validateSync(cause, validateOpts)
      if (hasErrored && !this.options.asyncAlways) return fieldsErrorMap
      return this.validateAsync(cause, validateOpts)
    }
    this._handleSubmit = async (submitMeta) => {
      this.baseStore.setState((old) => ({
        ...old,
        isSubmitted: false,
        submissionAttempts: old.submissionAttempts + 1,
        isSubmitSuccessful: false,
      }))
      batch(() => {
        Object.values(this.fieldInfo).forEach((field) => {
          if (!field.instance) return
          if (!field.instance.store.state.meta.isTouched)
            field.instance.setMeta((prev) => ({
              ...prev,
              isTouched: true,
            }))
        })
      })
      const submitMetaArg = submitMeta ?? this.options.onSubmitMeta
      if (!this.state.canSubmit && !this._devtoolsSubmissionOverride) {
        if (this.baseStore.state.submissionAttempts <= 1) {
          this.options.onSubmitInvalid?.({
            value: this.state.values,
            formApi: this,
            meta: submitMetaArg,
          })
          return
        }
      }
      this.baseStore.setState((d) => ({
        ...d,
        isSubmitting: true,
      }))
      const done = () => {
        this.baseStore.setState((prev) => ({
          ...prev,
          isSubmitting: false,
        }))
      }
      await this.validateAllFields("submit")
      if (!this.state.isFieldsValid) {
        done()
        this.options.onSubmitInvalid?.({
          value: this.state.values,
          formApi: this,
          meta: submitMetaArg,
        })
        formEventClient.emit("form-submission", {
          id: this._formId,
          submissionAttempt: this.state.submissionAttempts,
          successful: false,
          stage: "validateAllFields",
          errors: Object.values(this.state.fieldMeta)
            .map((meta) => meta.errors)
            .flat(),
        })
        return
      }
      await this.validate("submit")
      if (!this.state.isValid) {
        done()
        this.options.onSubmitInvalid?.({
          value: this.state.values,
          formApi: this,
          meta: submitMetaArg,
        })
        formEventClient.emit("form-submission", {
          id: this._formId,
          submissionAttempt: this.state.submissionAttempts,
          successful: false,
          stage: "validate",
          errors: this.state.errors,
        })
        return
      }
      batch(() => {
        Object.values(this.fieldInfo).forEach((field) => {
          field.instance?.triggerOnSubmitListener()
        })
      })
      this.options.listeners?.onSubmit?.({
        formApi: this,
        meta: submitMetaArg,
      })
      try {
        await this.options.onSubmit?.({
          value: this.state.values,
          formApi: this,
          meta: submitMetaArg,
        })
        batch(() => {
          this.baseStore.setState((prev) => ({
            ...prev,
            isSubmitted: true,
            isSubmitSuccessful: true,
          }))
          formEventClient.emit("form-submission", {
            id: this._formId,
            submissionAttempt: this.state.submissionAttempts,
            successful: true,
          })
          done()
        })
      } catch (err) {
        this.baseStore.setState((prev) => ({
          ...prev,
          isSubmitSuccessful: false,
        }))
        formEventClient.emit("form-submission", {
          id: this._formId,
          submissionAttempt: this.state.submissionAttempts,
          successful: false,
          stage: "inflight",
          onError: err,
        })
        done()
        throw err
      }
    }
    this.getFieldValue = (field) => getBy(this.state.values, field)
    this.getFieldMeta = (field) => {
      return this.state.fieldMeta[field]
    }
    this.getFormGroupMeta = (name) => {
      return this.formGroupMetaDerived.state[name]
    }
    this.getFieldInfo = (field) => {
      return (this.fieldInfo[field] ||= {
        instance: null,
        validationMetaMap: {
          onChange: void 0,
          onBlur: void 0,
          onSubmit: void 0,
          onMount: void 0,
          onServer: void 0,
          onDynamic: void 0,
        },
      })
    }
    this.setFieldMeta = (field, updater) => {
      this.baseStore.setState((prev) => {
        return {
          ...prev,
          fieldMetaBase: {
            ...prev.fieldMetaBase,
            [field]: functionalUpdate(updater, prev.fieldMetaBase[field]),
          },
        }
      })
    }
    this.resetFieldMeta = (fieldMeta) => {
      return Object.keys(fieldMeta).reduce((acc, key) => {
        const fieldKey = key
        acc[fieldKey] = defaultFieldMeta
        return acc
      }, {})
    }
    this.setFieldValue = (field, updater, opts2) => {
      const dontUpdateMeta = opts2?.dontUpdateMeta ?? false
      const dontRunListeners = opts2?.dontRunListeners ?? false
      const dontValidate = opts2?.dontValidate ?? false
      batch(() => {
        if (!dontUpdateMeta)
          this.setFieldMeta(field, (prev) => ({
            ...prev,
            isTouched: true,
            isDirty: true,
            errorMap: {
              ...prev?.errorMap,
              onMount: void 0,
            },
          }))
        this.baseStore.setState((prev) => {
          return {
            ...prev,
            values: setBy(prev.values, field, updater),
          }
        })
      })
      if (!dontRunListeners) this.getFieldInfo(field).instance?.triggerOnChangeListener()
      if (!dontValidate) this.validateField(field, "change")
    }
    this.deleteField = (field) => {
      const fieldsToDelete = [
        ...Object.keys(this.fieldInfo).filter((f) => {
          const fieldStr = field.toString()
          return f.startsWith(`${fieldStr}.`) || f.startsWith(`${fieldStr}[`)
        }),
        field,
      ]
      this.baseStore.setState((prev) => {
        const newState = { ...prev }
        fieldsToDelete.forEach((f) => {
          newState.values = deleteBy(newState.values, f)
          delete this.fieldInfo[f]
          delete newState.fieldMetaBase[f]
        })
        return newState
      })
    }
    this.pushFieldValue = (field, value, options) => {
      this.setFieldValue(field, (prev) => [...(Array.isArray(prev) ? prev : []), value], options)
      metaHelper(this).bumpArrayVersion(field)
    }
    this.insertFieldValue = async (field, index, value, options) => {
      this.setFieldValue(
        field,
        (prev) => {
          return [...prev.slice(0, index), value, ...prev.slice(index)]
        },
        mergeOpts(options, { dontValidate: true }),
      )
      const dontValidate = options?.dontValidate ?? false
      if (!dontValidate) await this.validateField(field, "change")
      metaHelper(this).handleArrayInsert(field, index)
      if (!dontValidate) await this.validateArrayFieldsStartingFrom(field, index, "change")
    }
    this.replaceFieldValue = async (field, index, value, options) => {
      this.setFieldValue(
        field,
        (prev) => {
          return prev.map((d, i) => (i === index ? value : d))
        },
        mergeOpts(options, { dontValidate: true }),
      )
      metaHelper(this).bumpArrayVersion(field)
      if (!(options?.dontValidate ?? false)) {
        await this.validateField(field, "change")
        await this.validateArrayFieldsStartingFrom(field, index, "change")
      }
    }
    this.removeFieldValue = async (field, index, options) => {
      const fieldValue = this.getFieldValue(field)
      const lastIndex = Array.isArray(fieldValue) ? Math.max(fieldValue.length - 1, 0) : null
      this.setFieldValue(
        field,
        (prev) => {
          return prev.filter((_d, i) => i !== index)
        },
        mergeOpts(options, { dontValidate: true }),
      )
      metaHelper(this).handleArrayRemove(field, index)
      if (lastIndex !== null) {
        const start = `${field}[${lastIndex}]`
        this.deleteField(start)
      }
      if (!(options?.dontValidate ?? false)) {
        await this.validateField(field, "change")
        await this.validateArrayFieldsStartingFrom(field, index, "change")
      }
    }
    this.swapFieldValues = (field, index1, index2, options) => {
      this.setFieldValue(
        field,
        (prev) => {
          const prev1 = prev[index1]
          const prev2 = prev[index2]
          return setBy(setBy(prev, `${index1}`, prev2), `${index2}`, prev1)
        },
        mergeOpts(options, { dontValidate: true }),
      )
      metaHelper(this).handleArraySwap(field, index1, index2)
      if (!(options?.dontValidate ?? false)) {
        this.validateField(field, "change")
        this.validateField(`${field}[${index1}]`, "change")
        this.validateField(`${field}[${index2}]`, "change")
      }
    }
    this.moveFieldValues = (field, index1, index2, options) => {
      this.setFieldValue(
        field,
        (prev) => {
          const next = [...prev]
          next.splice(index2, 0, next.splice(index1, 1)[0])
          return next
        },
        mergeOpts(options, { dontValidate: true }),
      )
      metaHelper(this).handleArrayMove(field, index1, index2)
      if (!(options?.dontValidate ?? false)) {
        this.validateField(field, "change")
        this.validateField(`${field}[${index1}]`, "change")
        this.validateField(`${field}[${index2}]`, "change")
      }
    }
    this.clearFieldValues = (field, options) => {
      const fieldValue = this.getFieldValue(field)
      const lastIndex = Array.isArray(fieldValue) ? Math.max(fieldValue.length - 1, 0) : null
      this.setFieldValue(field, [], mergeOpts(options, { dontValidate: true }))
      metaHelper(this).bumpArrayVersion(field)
      if (lastIndex !== null)
        for (let i = 0; i <= lastIndex; i++) {
          const fieldKey = `${field}[${i}]`
          this.deleteField(fieldKey)
        }
      if (!(options?.dontValidate ?? false)) this.validateField(field, "change")
    }
    this.resetField = (field) => {
      this.baseStore.setState((prev) => {
        const fieldDefault = this.getFieldInfo(field).instance?.options.defaultValue
        const formDefault = getBy(this.options.defaultValues, field)
        const targetValue = fieldDefault ?? formDefault
        return {
          ...prev,
          fieldMetaBase: {
            ...prev.fieldMetaBase,
            [field]: defaultFieldMeta,
          },
          values: targetValue !== void 0 ? setBy(prev.values, field, targetValue) : prev.values,
        }
      })
    }
    this.setErrorMap = (errorMap) => {
      batch(() => {
        Object.entries(errorMap).forEach(([key, value]) => {
          const errorMapKey = key
          if (isGlobalFormValidationError(value)) {
            const { formError, fieldErrors } = normalizeError$2(value)
            for (const fieldName of Object.keys(this.fieldInfo)) {
              if (!this.getFieldMeta(fieldName)) continue
              this.setFieldMeta(fieldName, (prev) => ({
                ...prev,
                errorMap: {
                  ...prev.errorMap,
                  [errorMapKey]: fieldErrors?.[fieldName],
                },
                errorSourceMap: {
                  ...prev.errorSourceMap,
                  [errorMapKey]: "form",
                },
              }))
            }
            this.baseStore.setState((prev) => ({
              ...prev,
              errorMap: {
                ...prev.errorMap,
                [errorMapKey]: formError,
              },
            }))
          } else
            this.baseStore.setState((prev) => ({
              ...prev,
              errorMap: {
                ...prev.errorMap,
                [errorMapKey]: value,
              },
            }))
        })
      })
    }
    this.getAllErrors = () => {
      return {
        form: {
          errors: this.state.errors,
          errorMap: this.state.errorMap,
        },
        fields: Object.entries(this.state.fieldMeta).reduce((acc, [fieldName, fieldMeta]) => {
          if (Object.keys(fieldMeta).length && fieldMeta.errors.length)
            acc[fieldName] = {
              errors: fieldMeta.errors,
              errorMap: fieldMeta.errorMap,
            }
          return acc
        }, {}),
      }
    }
    this.parseValuesWithSchema = (schema) => {
      return standardSchemaValidators.validate(
        {
          value: this.state.values,
          validationSource: "form",
        },
        schema,
      )
    }
    this.parseValuesWithSchemaAsync = (schema) => {
      return standardSchemaValidators.validateAsync(
        {
          value: this.state.values,
          validationSource: "form",
        },
        schema,
      )
    }
    this.timeoutIds = {
      validations: {},
      listeners: {},
      formListeners: {},
    }
    this._formId = opts?.formId ?? uuid()
    this._devtoolsSubmissionOverride = false
    let baseStoreVal = getDefaultFormState({
      ...opts?.defaultState,
      values: opts?.defaultValues ?? opts?.defaultState?.values,
    })
    if (opts?.transform) {
      baseStoreVal = opts.transform({ state: baseStoreVal }).state
      for (const errKey of Object.keys(baseStoreVal.errorMap)) {
        const errKeyMap = baseStoreVal.errorMap[errKey]
        if (errKeyMap === void 0 || !isGlobalFormValidationError(errKeyMap)) continue
        for (const fieldName of Object.keys(errKeyMap.fields)) {
          const fieldErr = errKeyMap.fields[fieldName]
          if (fieldErr === void 0) continue
          const existingFieldMeta = baseStoreVal.fieldMetaBase[fieldName]
          baseStoreVal.fieldMetaBase[fieldName] = {
            isTouched: false,
            isValidating: false,
            isBlurred: false,
            isDirty: false,
            _arrayVersion: 0,
            _pendingValidationsCount: 0,
            ...(existingFieldMeta ?? {}),
            errorSourceMap: {
              ...(existingFieldMeta?.["errorSourceMap"] ?? {}),
              onChange: "form",
            },
            errorMap: {
              ...(existingFieldMeta?.["errorMap"] ?? {}),
              [errKey]: fieldErr,
            },
          }
        }
      }
    }
    this.baseStore = createStore(baseStoreVal)
    let prevBaseStore = void 0
    this.fieldMetaDerived = createStore((prevVal) => {
      const currBaseStore = this.baseStore.get()
      let originalMetaCount = 0
      const fieldMeta = {}
      for (const fieldName of Object.keys(currBaseStore.fieldMetaBase)) {
        const currBaseMeta = currBaseStore.fieldMetaBase[fieldName]
        const prevBaseMeta = prevBaseStore?.fieldMetaBase[fieldName]
        const prevFieldInfo = prevVal?.[fieldName]
        const curFieldVal = getBy(currBaseStore.values, fieldName)
        let fieldErrors = prevFieldInfo?.errors
        if (!prevBaseMeta || currBaseMeta.errorMap !== prevBaseMeta.errorMap) {
          fieldErrors = Object.values(currBaseMeta.errorMap ?? {}).filter((val) => val !== void 0)
          const fieldInstance = this.getFieldInfo(fieldName)?.instance
          if (!fieldInstance || !fieldInstance.options.disableErrorFlat)
            fieldErrors = fieldErrors.flat(1)
        }
        const isFieldValid = !isNonEmptyArray(fieldErrors)
        const isFieldPristine = !currBaseMeta.isDirty
        const isDefaultValue = evaluate(
          curFieldVal,
          this.getFieldInfo(fieldName)?.instance?.options.defaultValue ??
            getBy(this.options.defaultValues, fieldName),
        )
        if (
          prevFieldInfo &&
          prevFieldInfo.isPristine === isFieldPristine &&
          prevFieldInfo.isValid === isFieldValid &&
          prevFieldInfo.isDefaultValue === isDefaultValue &&
          prevFieldInfo.errors === fieldErrors &&
          currBaseMeta === prevBaseMeta
        ) {
          fieldMeta[fieldName] = prevFieldInfo
          originalMetaCount++
          continue
        }
        fieldMeta[fieldName] = {
          ...currBaseMeta,
          errors: fieldErrors ?? [],
          isPristine: isFieldPristine,
          isValid: isFieldValid,
          isDefaultValue,
        }
      }
      if (!Object.keys(currBaseStore.fieldMetaBase).length) return fieldMeta
      if (prevVal && originalMetaCount === Object.keys(currBaseStore.fieldMetaBase).length)
        return prevVal
      prevBaseStore = this.baseStore.get()
      return fieldMeta
    })
    this.formGroupMetaDerived = createStore((prevVal) => {
      const currBaseStore = this.baseStore.get()
      const currFieldMeta = this.fieldMetaDerived.get()
      const result = {}
      for (const group of this.formGroupApis) {
        const groupName = group.name
        const lifecycle = currBaseStore.formGroupStateBase[groupName] ?? {
          isSubmitted: false,
          isSubmitting: false,
          isValidating: false,
          submissionAttempts: 0,
          isSubmitSuccessful: false,
        }
        const ownFieldMeta = currFieldMeta[groupName]
        let isFieldsValidating = false
        let isFieldsValid = true
        let aggIsTouched = false
        let aggIsBlurred = false
        let aggIsDefaultValue = true
        let aggIsDirty = false
        for (const fieldName in currFieldMeta) {
          if (fieldName === groupName) continue
          if (!isFieldInGroup(groupName, fieldName)) continue
          const m = currFieldMeta[fieldName]
          if (!m) continue
          if (m.isValidating) isFieldsValidating = true
          if (!m.isValid) isFieldsValid = false
          if (m.isTouched) aggIsTouched = true
          if (m.isBlurred) aggIsBlurred = true
          if (!m.isDefaultValue) aggIsDefaultValue = false
          if (m.isDirty) aggIsDirty = true
        }
        const isPristine = !aggIsDirty
        const isValidating = !!isFieldsValidating || lifecycle.isValidating
        const errorMap = ownFieldMeta?.errorMap ?? {}
        const errorSourceMap = ownFieldMeta?.errorSourceMap ?? {}
        const hasOnMountError = Boolean(
          errorMap.onMount ||
          Object.entries(currFieldMeta).some(
            ([fieldName, field]) =>
              field &&
              fieldName !== groupName &&
              isFieldInGroup(groupName, fieldName) &&
              field.errorMap.onMount,
          ),
        )
        const prevGroupMeta = prevVal?.[groupName]
        let errors = prevGroupMeta?.errors ?? []
        if (!prevGroupMeta || prevGroupMeta.__srcErrorMap !== errorMap)
          errors = Object.values(errorMap).reduce((acc, curr) => {
            if (curr === void 0) return acc
            if (curr && typeof curr === "object" && "fields" in curr) {
              const groupErr = curr.group
              if (groupErr !== void 0) acc.push(groupErr)
              return acc
            }
            acc.push(curr)
            return acc
          }, [])
        const isGroupValid = errors.length === 0
        const isValid = isFieldsValid && isGroupValid
        const submitInvalid = group.options.canSubmitWhenInvalid ?? false
        const canSubmit =
          (lifecycle.submissionAttempts === 0 && !aggIsTouched && !hasOnMountError) ||
          (!isValidating && !lifecycle.isSubmitting && isValid) ||
          submitInvalid
        if (
          prevGroupMeta &&
          prevGroupMeta.errorMap === errorMap &&
          prevGroupMeta.errorSourceMap === errorSourceMap &&
          prevGroupMeta.errors === errors &&
          prevGroupMeta.isFieldsValidating === isFieldsValidating &&
          prevGroupMeta.isFieldsValid === isFieldsValid &&
          prevGroupMeta.isGroupValid === isGroupValid &&
          prevGroupMeta.isValid === isValid &&
          prevGroupMeta.canSubmit === canSubmit &&
          prevGroupMeta.isTouched === aggIsTouched &&
          prevGroupMeta.isBlurred === aggIsBlurred &&
          prevGroupMeta.isPristine === isPristine &&
          prevGroupMeta.isDefaultValue === aggIsDefaultValue &&
          prevGroupMeta.isDirty === aggIsDirty &&
          prevGroupMeta.isValidating === isValidating &&
          prevGroupMeta.isSubmitting === lifecycle.isSubmitting &&
          prevGroupMeta.isSubmitted === lifecycle.isSubmitted &&
          prevGroupMeta.submissionAttempts === lifecycle.submissionAttempts &&
          prevGroupMeta.isSubmitSuccessful === lifecycle.isSubmitSuccessful
        ) {
          result[groupName] = prevGroupMeta
          continue
        }
        const meta = {
          ...lifecycle,
          errorMap,
          errorSourceMap,
          _arrayVersion: ownFieldMeta?._arrayVersion ?? 0,
          isTouched: aggIsTouched,
          isBlurred: aggIsBlurred,
          isDirty: aggIsDirty,
          isPristine,
          isDefaultValue: aggIsDefaultValue,
          isValid,
          errors,
          isValidating,
          isFieldsValidating,
          isFieldsValid,
          isGroupValid,
          canSubmit,
        }
        Object.defineProperty(meta, "__srcErrorMap", {
          value: errorMap,
          enumerable: false,
          configurable: true,
        })
        result[groupName] = meta
      }
      return result
    })
    let prevBaseStoreForStore = void 0
    this.store = createStore((prevVal) => {
      const currBaseStore = this.baseStore.get()
      const currFieldMeta = this.fieldMetaDerived.get()
      const fieldMetaValues = Object.values(currFieldMeta).filter(Boolean)
      const isFieldsValidating = fieldMetaValues.some((field) => field.isValidating)
      const isFieldsValid = fieldMetaValues.every((field) => field.isValid)
      const isTouched = fieldMetaValues.some((field) => field.isTouched)
      const isBlurred = fieldMetaValues.some((field) => field.isBlurred)
      const isDefaultValue = fieldMetaValues.every((field) => field.isDefaultValue)
      const shouldInvalidateOnMount = isTouched && currBaseStore.errorMap?.onMount
      const isDirty = fieldMetaValues.some((field) => field.isDirty)
      const isPristine = !isDirty
      const hasOnMountError = Boolean(
        currBaseStore.errorMap?.onMount || fieldMetaValues.some((f) => f?.errorMap?.onMount),
      )
      const isValidating = !!isFieldsValidating
      let errors = prevVal?.errors ?? []
      if (!prevBaseStoreForStore || currBaseStore.errorMap !== prevBaseStoreForStore.errorMap)
        errors = Object.values(currBaseStore.errorMap).reduce((prev, curr) => {
          if (curr === void 0) return prev
          if (curr && isGlobalFormValidationError(curr)) {
            prev.push(curr.form)
            return prev
          }
          prev.push(curr)
          return prev
        }, [])
      const isFormValid = errors.length === 0
      const isValid = isFieldsValid && isFormValid
      const submitInvalid = this.options.canSubmitWhenInvalid ?? false
      const canSubmit =
        (currBaseStore.submissionAttempts === 0 && !isTouched && !hasOnMountError) ||
        (!isValidating && !currBaseStore.isSubmitting && isValid) ||
        submitInvalid
      let errorMap = currBaseStore.errorMap
      if (shouldInvalidateOnMount) {
        errors = errors.filter((err) => err !== currBaseStore.errorMap.onMount)
        errorMap = Object.assign(errorMap, { onMount: void 0 })
      }
      if (
        prevVal &&
        prevBaseStoreForStore &&
        prevVal.errorMap === errorMap &&
        prevVal.fieldMeta === this.fieldMetaDerived.state &&
        prevVal.errors === errors &&
        prevVal.isFieldsValidating === isFieldsValidating &&
        prevVal.isFieldsValid === isFieldsValid &&
        prevVal.isFormValid === isFormValid &&
        prevVal.isValid === isValid &&
        prevVal.canSubmit === canSubmit &&
        prevVal.isTouched === isTouched &&
        prevVal.isBlurred === isBlurred &&
        prevVal.isPristine === isPristine &&
        prevVal.isDefaultValue === isDefaultValue &&
        prevVal.isDirty === isDirty &&
        evaluate(prevBaseStoreForStore, currBaseStore)
      )
        return prevVal
      const state = {
        ...currBaseStore,
        errorMap,
        fieldMeta: this.fieldMetaDerived.state,
        errors,
        isFieldsValidating,
        isFieldsValid,
        isFormValid,
        isValid,
        canSubmit,
        isTouched,
        isBlurred,
        isPristine,
        isDefaultValue,
        isDirty,
      }
      prevBaseStoreForStore = this.baseStore.get()
      return state
    })
    this.handleSubmit = this.handleSubmit.bind(this)
    this.update(opts || {})
  }
  get state() {
    return this.store.state
  }
  get formId() {
    return this._formId
  }
  /**
   * @private
   */
  runValidator(props) {
    if (isStandardSchemaValidator(props.validate))
      return standardSchemaValidators[props.type](props.value, props.validate)
    return props.validate(props.value)
  }
  handleSubmit(submitMeta) {
    return this._handleSubmit(submitMeta)
  }
}
function normalizeError$2(rawError) {
  if (rawError) {
    if (isGlobalFormValidationError(rawError))
      return {
        formError: normalizeError$2(rawError.form).formError,
        fieldErrors: rawError.fields,
      }
    return { formError: rawError }
  }
  return { formError: void 0 }
}
function getErrorMapKey$2(cause) {
  switch (cause) {
    case "submit":
      return "onSubmit"
    case "blur":
      return "onBlur"
    case "mount":
      return "onMount"
    case "server":
      return "onServer"
    case "dynamic":
      return "onDynamic"
    default:
      return "onChange"
  }
}
//#endregion
//#region node_modules/.pnpm/@tanstack+form-core@1.33.5/node_modules/@tanstack/form-core/dist/esm/FieldApi.js
const FieldApi = class FieldApi {
  /**
   * Initializes a new `FieldApi` instance.
   */
  constructor(opts) {
    this.options = {}
    this.mount = () => {
      if (this.options.defaultValue !== void 0 && !this.getMeta().isTouched)
        this.form.setFieldValue(this.name, this.options.defaultValue, { dontUpdateMeta: true })
      const info = this.getInfo()
      info.instance = this
      this.update(this.options)
      const { onMount } = this.options.validators || {}
      if (onMount) {
        const error = this.runValidator({
          validate: onMount,
          value: {
            value: this.state.value,
            fieldApi: this,
            validationSource: "field",
          },
          type: "validate",
        })
        if (error)
          this.setMeta((prev) => ({
            ...prev,
            errorMap: {
              ...prev?.errorMap,
              onMount: error,
            },
            errorSourceMap: {
              ...prev?.errorSourceMap,
              onMount: "field",
            },
          }))
      }
      this.options.listeners?.onMount?.({
        value: this.state.value,
        fieldApi: this,
      })
      return () => {
        for (const [key, timeout] of Object.entries(this.timeoutIds.validations))
          if (timeout) {
            clearTimeout(timeout)
            this.timeoutIds.validations[key] = null
          }
        for (const [key, timeout] of Object.entries(this.timeoutIds.listeners))
          if (timeout) {
            clearTimeout(timeout)
            this.timeoutIds.listeners[key] = null
          }
        for (const [key, timeout] of Object.entries(this.timeoutIds.formListeners))
          if (timeout) {
            clearTimeout(timeout)
            this.timeoutIds.formListeners[key] = null
          }
        const fieldInfo = this.form.fieldInfo[this.name]
        if (!fieldInfo) return
        if (fieldInfo.instance !== this) return
        for (const [key, validationMeta] of Object.entries(fieldInfo.validationMetaMap)) {
          validationMeta?.lastAbortController.abort()
          fieldInfo.validationMetaMap[key] = void 0
        }
        this.form.baseStore.setState((prev) => ({
          ...prev,
          fieldMetaBase: {
            ...prev.fieldMetaBase,
            [this.name]: {
              ...defaultFieldMeta,
              isTouched: prev.fieldMetaBase[this.name]?.isTouched ?? defaultFieldMeta.isTouched,
              isBlurred: prev.fieldMetaBase[this.name]?.isBlurred ?? defaultFieldMeta.isBlurred,
              isDirty: prev.fieldMetaBase[this.name]?.isDirty ?? defaultFieldMeta.isDirty,
            },
          },
        }))
        fieldInfo.instance = null
        this.options.listeners?.onUnmount?.({
          value: this.state.value,
          fieldApi: this,
        })
        this.form.options.listeners?.onFieldUnmount?.({
          formApi: this.form,
          fieldApi: this,
        })
      }
    }
    this.update = (opts2) => {
      this.options = opts2
      this.name = opts2.name
      if (!this.state.meta.isTouched && this.options.defaultValue !== void 0) {
        if (!evaluate(this.form.getFieldValue(this.name), opts2.defaultValue))
          this.form.setFieldValue(this.name, opts2.defaultValue, {
            dontUpdateMeta: true,
            dontValidate: true,
            dontRunListeners: true,
          })
      }
      if (!this.form.getFieldMeta(this.name)) this.form.setFieldMeta(this.name, this.state.meta)
    }
    this.getValue = () => {
      return this.form.getFieldValue(this.name)
    }
    this.setValue = (updater, options) => {
      this.form.setFieldValue(
        this.name,
        updater,
        mergeOpts(options, {
          dontRunListeners: true,
          dontValidate: true,
        }),
      )
      if (!options?.dontRunListeners) this.triggerOnChangeListener()
      if (!options?.dontValidate) this.validate("change")
    }
    this.getMeta = () => this.store.state.meta
    this.setMeta = (updater) => this.form.setFieldMeta(this.name, updater)
    this.getInfo = () => this.form.getFieldInfo(this.name)
    this.pushValue = (value, options) => {
      this.form.pushFieldValue(this.name, value, mergeOpts(options, { dontRunListeners: true }))
      if (!options?.dontRunListeners) this.triggerOnChangeListener()
    }
    this.insertValue = (index, value, options) => {
      this.form.insertFieldValue(
        this.name,
        index,
        value,
        mergeOpts(options, { dontRunListeners: true }),
      )
      if (!options?.dontRunListeners) this.triggerOnChangeListener()
    }
    this.replaceValue = (index, value, options) => {
      this.form.replaceFieldValue(
        this.name,
        index,
        value,
        mergeOpts(options, { dontRunListeners: true }),
      )
      if (!options?.dontRunListeners) this.triggerOnChangeListener()
    }
    this.removeValue = (index, options) => {
      this.form.removeFieldValue(this.name, index, mergeOpts(options, { dontRunListeners: true }))
      if (!options?.dontRunListeners) this.triggerOnChangeListener()
    }
    this.swapValues = (aIndex, bIndex, options) => {
      this.form.swapFieldValues(
        this.name,
        aIndex,
        bIndex,
        mergeOpts(options, { dontRunListeners: true }),
      )
      if (!options?.dontRunListeners) this.triggerOnChangeListener()
    }
    this.moveValue = (aIndex, bIndex, options) => {
      this.form.moveFieldValues(
        this.name,
        aIndex,
        bIndex,
        mergeOpts(options, { dontRunListeners: true }),
      )
      if (!options?.dontRunListeners) this.triggerOnChangeListener()
    }
    this.clearValues = (options) => {
      this.form.clearFieldValues(this.name, mergeOpts(options, { dontRunListeners: true }))
      if (!options?.dontRunListeners) this.triggerOnChangeListener()
    }
    this.getLinkedFields = (cause) => {
      const fields = Object.values(this.form.fieldInfo)
      const linkedFields = []
      for (const field of fields) {
        if (!field.instance) continue
        if (!(field.instance instanceof FieldApi)) continue
        const { onChangeListenTo, onBlurListenTo } = field.instance.options.validators || {}
        if (cause === "change" && onChangeListenTo?.includes(this.name))
          linkedFields.push(field.instance)
        if (cause === "blur" && onBlurListenTo?.includes(this.name))
          linkedFields.push(field.instance)
      }
      return linkedFields
    }
    this.validateSync = (cause, errorFromForm) => {
      const validates = getSyncValidatorArray(cause, {
        ...this.options,
        form: this.form,
        fieldName: this.name,
        validationLogic: this.form.options.validationLogic || defaultValidationLogic,
      })
      const linkedFieldValidates = this.getLinkedFields(cause).reduce((acc, field) => {
        const fieldValidates = getSyncValidatorArray(cause, {
          ...field.options,
          form: field.form,
          fieldName: field.name,
          validationLogic: field.form.options.validationLogic || defaultValidationLogic,
        })
        fieldValidates.forEach((validate) => {
          validate.field = field
        })
        return acc.concat(fieldValidates)
      }, [])
      let hasErrored = false
      batch(() => {
        const validateFieldFn = (field, validateObj) => {
          const errorMapKey = getErrorMapKey$1(validateObj.cause)
          const fieldLevelError = validateObj.validate
            ? normalizeError$1(
                field.runValidator({
                  validate: validateObj.validate,
                  value: {
                    value: field.store.state.value,
                    validationSource: "field",
                    fieldApi: field,
                  },
                  type: "validate",
                }),
              )
            : void 0
          const formLevelError = errorFromForm[errorMapKey]
          const { newErrorValue, newSource } = determineFieldLevelErrorSourceAndValue({
            formLevelError,
            fieldLevelError,
          })
          if (field.state.meta.errorMap?.[errorMapKey] !== newErrorValue)
            field.setMeta((prev) => ({
              ...prev,
              errorMap: {
                ...prev.errorMap,
                [errorMapKey]: newErrorValue,
              },
              errorSourceMap: {
                ...prev.errorSourceMap,
                [errorMapKey]: newSource,
              },
            }))
          if (newErrorValue) hasErrored = true
        }
        for (const validateObj of validates) validateFieldFn(this, validateObj)
        for (const fieldValitateObj of linkedFieldValidates) {
          if (!fieldValitateObj.validate) continue
          validateFieldFn(fieldValitateObj.field, fieldValitateObj)
        }
      })
      const submitErrKey = getErrorMapKey$1("submit")
      if (this.state.meta.errorMap?.[submitErrKey] && cause !== "submit" && !hasErrored)
        this.setMeta((prev) => ({
          ...prev,
          errorMap: {
            ...prev.errorMap,
            [submitErrKey]: void 0,
          },
          errorSourceMap: {
            ...prev.errorSourceMap,
            [submitErrKey]: void 0,
          },
        }))
      return { hasErrored }
    }
    this.validateAsync = async (cause, formValidationResultPromise) => {
      const validates = getAsyncValidatorArray(cause, {
        ...this.options,
        form: this.form,
        fieldName: this.name,
        validationLogic: this.form.options.validationLogic || defaultValidationLogic,
      })
      const asyncFormValidationResults = await formValidationResultPromise
      const linkedFieldValidates = this.getLinkedFields(cause).reduce((acc, field) => {
        const fieldValidates = getAsyncValidatorArray(cause, {
          ...field.options,
          form: field.form,
          fieldName: field.name,
          validationLogic: field.form.options.validationLogic || defaultValidationLogic,
        })
        fieldValidates.forEach((validate) => {
          validate.field = field
        })
        return acc.concat(fieldValidates)
      }, [])
      const validatesPromises = []
      const linkedPromises = []
      const hasAsyncValidators = validates.some((v) => v.validate)
      const linkedFieldsWithAsyncValidators = Array.from(
        new Set(linkedFieldValidates.filter((v) => v.validate).map((v) => v.field)),
      )
      batch(() => {
        if (hasAsyncValidators) this.startValidation()
        for (const linkedField of linkedFieldsWithAsyncValidators) linkedField.startValidation()
      })
      const validateFieldAsyncFn = (field, validateObj, promises) => {
        const errorMapKey = getErrorMapKey$1(validateObj.cause)
        const fieldInfo = field.getInfo()
        fieldInfo.validationMetaMap[errorMapKey]?.lastAbortController.abort()
        const controller = new AbortController()
        fieldInfo.validationMetaMap[errorMapKey] = { lastAbortController: controller }
        promises.push(
          new Promise(async (resolve) => {
            let rawError
            try {
              rawError = await new Promise((rawResolve, rawReject) => {
                if (field.timeoutIds.validations[validateObj.cause]) {
                  clearTimeout(field.timeoutIds.validations[validateObj.cause])
                  field.endValidation()
                }
                field.timeoutIds.validations[validateObj.cause] = setTimeout(async () => {
                  if (controller.signal.aborted) return rawResolve(void 0)
                  try {
                    rawResolve(
                      await this.runValidator({
                        validate: validateObj.validate,
                        value: {
                          value: field.store.state.value,
                          fieldApi: field,
                          signal: controller.signal,
                          validationSource: "field",
                        },
                        type: "validateAsync",
                      }),
                    )
                  } catch (e) {
                    rawReject(e)
                  }
                }, validateObj.debounceMs)
              })
            } catch (e) {
              rawError = e
            }
            if (controller.signal.aborted) return resolve(void 0)
            const fieldLevelError = normalizeError$1(rawError)
            const formLevelError = asyncFormValidationResults[field.name]?.[errorMapKey]
            const { newErrorValue, newSource } = determineFieldLevelErrorSourceAndValue({
              formLevelError,
              fieldLevelError,
            })
            if (field.getInfo().instance !== field) return resolve(void 0)
            field.setMeta((prev) => {
              return {
                ...prev,
                errorMap: {
                  ...prev?.errorMap,
                  [errorMapKey]: newErrorValue,
                },
                errorSourceMap: {
                  ...prev.errorSourceMap,
                  [errorMapKey]: newSource,
                },
              }
            })
            resolve(newErrorValue)
          }),
        )
      }
      for (const validateObj of validates) {
        if (!validateObj.validate) continue
        validateFieldAsyncFn(this, validateObj, validatesPromises)
      }
      for (const fieldValitateObj of linkedFieldValidates) {
        if (!fieldValitateObj.validate) continue
        validateFieldAsyncFn(fieldValitateObj.field, fieldValitateObj, linkedPromises)
      }
      let results = []
      if (validatesPromises.length || linkedPromises.length) {
        results = await Promise.all(validatesPromises)
        await Promise.all(linkedPromises)
      }
      batch(() => {
        if (hasAsyncValidators) this.endValidation()
        for (const linkedField of linkedFieldsWithAsyncValidators) linkedField.endValidation()
      })
      return results.filter(Boolean)
    }
    this.validate = (cause, opts2) => {
      if (!this.state.meta.isTouched) return []
      const encompassingGroups = opts2?.skipGroupValidation
        ? []
        : Array.from(this.form.formGroupApis).filter((group) => this.name.startsWith(group.name))
      let fieldsErrorMap =
        (opts2?.skipFormValidation ? { fieldsErrorMap: {} } : this.form.validateSync(cause))
          .fieldsErrorMap[this.name] ?? {}
      if (!opts2?.skipFormValidation)
        for (const group of encompassingGroups) {
          if (group.state.meta.submissionAttempts === 0) continue
          const { fieldsErrorMap: groupFormErrors } = this.form.validateSync(cause, {
            group,
            dontUpdateFormErrorMap: true,
            filterFieldNames: (fieldName) => isFieldInGroup(group.name, fieldName),
          })
          fieldsErrorMap = {
            ...fieldsErrorMap,
            ...(groupFormErrors[this.name] ?? {}),
          }
        }
      const { hasErrored } = this.validateSync(cause, fieldsErrorMap)
      const groupHasErroredWeakMap = /* @__PURE__ */ new WeakMap()
      for (const group of encompassingGroups) {
        const { hasErrored: groupHasErrored } = group.validateSync(
          cause,
          {},
          { skipRelatedFieldValidation: true },
        )
        groupHasErroredWeakMap.set(group, groupHasErrored)
      }
      if (hasErrored && !this.options.asyncAlways) {
        this.getInfo().validationMetaMap[getErrorMapKey$1(cause)]?.lastAbortController.abort()
        const groupErrors = []
        for (const group of encompassingGroups) {
          group.getInfo().validationMetaMap[getErrorMapKey$1(cause)]?.lastAbortController.abort()
          groupErrors.push(group.state.meta.errors)
        }
        return [...this.state.meta.errors, ...groupErrors.flat()]
      }
      const formValidationResultPromise = opts2?.skipFormValidation
        ? Promise.resolve({})
        : this.form.validateAsync(cause)
      const fieldAsyncResults = this.validateAsync(cause, formValidationResultPromise)
      const groupAsyncResults = []
      for (const group of encompassingGroups) {
        if (groupHasErroredWeakMap.get(group) && !group.options.asyncAlways) continue
        groupAsyncResults.push(
          group.validateAsync(cause, formValidationResultPromise, {
            skipRelatedFieldValidation: true,
          }),
        )
      }
      if (groupAsyncResults.length === 0) return fieldAsyncResults
      return Promise.all([fieldAsyncResults, ...groupAsyncResults]).then((results) =>
        results.flat(),
      )
    }
    this.handleChange = (updater) => {
      this.setValue(updater)
    }
    this.handleBlur = () => {
      if (!this.state.meta.isTouched)
        this.setMeta((prev) => ({
          ...prev,
          isTouched: true,
        }))
      if (!this.state.meta.isBlurred)
        this.setMeta((prev) => ({
          ...prev,
          isBlurred: true,
        }))
      this.validate("blur")
      this.triggerOnBlurListener()
    }
    this.setErrorMap = (errorMap) => {
      this.setMeta((prev) => ({
        ...prev,
        errorMap: {
          ...prev.errorMap,
          ...errorMap,
        },
      }))
    }
    this.parseValueWithSchema = (schema) => {
      return standardSchemaValidators.validate(
        {
          value: this.state.value,
          validationSource: "field",
        },
        schema,
      )
    }
    this.parseValueWithSchemaAsync = (schema) => {
      return standardSchemaValidators.validateAsync(
        {
          value: this.state.value,
          validationSource: "field",
        },
        schema,
      )
    }
    this.triggerOnBlurListener = () => {
      const formDebounceMs = this.form.options.listeners?.onBlurDebounceMs
      if (formDebounceMs && formDebounceMs > 0) {
        if (this.timeoutIds.formListeners.blur) clearTimeout(this.timeoutIds.formListeners.blur)
        this.timeoutIds.formListeners.blur = setTimeout(() => {
          this.form.options.listeners?.onBlur?.({
            formApi: this.form,
            fieldApi: this,
          })
        }, formDebounceMs)
      } else
        this.form.options.listeners?.onBlur?.({
          formApi: this.form,
          fieldApi: this,
        })
      const fieldDebounceMs = this.options.listeners?.onBlurDebounceMs
      if (fieldDebounceMs && fieldDebounceMs > 0) {
        if (this.timeoutIds.listeners.blur) clearTimeout(this.timeoutIds.listeners.blur)
        this.timeoutIds.listeners.blur = setTimeout(() => {
          this.options.listeners?.onBlur?.({
            value: this.state.value,
            fieldApi: this,
          })
        }, fieldDebounceMs)
      } else
        this.options.listeners?.onBlur?.({
          value: this.state.value,
          fieldApi: this,
        })
    }
    this.triggerOnChangeListener = () => {
      const formDebounceMs = this.form.options.listeners?.onChangeDebounceMs
      if (formDebounceMs && formDebounceMs > 0) {
        if (this.timeoutIds.formListeners.change) clearTimeout(this.timeoutIds.formListeners.change)
        this.timeoutIds.formListeners.change = setTimeout(() => {
          this.form.options.listeners?.onChange?.({
            formApi: this.form,
            fieldApi: this,
          })
        }, formDebounceMs)
      } else
        this.form.options.listeners?.onChange?.({
          formApi: this.form,
          fieldApi: this,
        })
      const fieldDebounceMs = this.options.listeners?.onChangeDebounceMs
      if (fieldDebounceMs && fieldDebounceMs > 0) {
        if (this.timeoutIds.listeners.change) clearTimeout(this.timeoutIds.listeners.change)
        this.timeoutIds.listeners.change = setTimeout(() => {
          this.options.listeners?.onChange?.({
            value: this.state.value,
            fieldApi: this,
          })
        }, fieldDebounceMs)
      } else
        this.options.listeners?.onChange?.({
          value: this.state.value,
          fieldApi: this,
        })
      for (const group of this.form.formGroupApis)
        if (isFieldInGroup(group.name, this.name)) group.triggerOnChangeListener()
    }
    this.triggerOnSubmitListener = () => {
      this.options.listeners?.onSubmit?.({
        value: this.state.value,
        fieldApi: this,
      })
    }
    this.form = opts.form
    this.name = opts.name
    this.options = opts
    this.timeoutIds = {
      validations: {},
      listeners: {},
      formListeners: {},
    }
    this.store = createStore((prevVal) => {
      this.form.store.get()
      const meta = this.form.getFieldMeta(this.name) ?? {
        ...defaultFieldMeta,
        ...opts.defaultMeta,
      }
      let value = this.form.getFieldValue(this.name)
      if (
        !meta.isTouched &&
        value === void 0 &&
        this.options.defaultValue !== void 0 &&
        !evaluate(value, this.options.defaultValue)
      )
        value = this.options.defaultValue
      if (prevVal && prevVal.value === value && prevVal.meta === meta) return prevVal
      return {
        value,
        meta,
      }
    })
  }
  /**
   * The current field state.
   */
  get state() {
    return this.store.state
  }
  /**
   * @private
   */
  runValidator(props) {
    if (isStandardSchemaValidator(props.validate))
      return standardSchemaValidators[props.type](props.value, props.validate)
    return props.validate(props.value)
  }
  /**
   * `@private`
   * Starts tracking an async validation, incrementing the counter and setting isValidating if needed.
   */
  startValidation() {
    this.setMeta((prev) => {
      const newCount = prev._pendingValidationsCount + 1
      return {
        ...prev,
        _pendingValidationsCount: newCount,
        isValidating: newCount > 0 && !prev.isValidating ? true : prev.isValidating,
      }
    })
  }
  /**
   * `@private`
   * Ends tracking an async validation, decrementing the counter and clearing isValidating if no validations remain.
   */
  endValidation() {
    this.setMeta((prev) => {
      const newCount = Math.max(0, prev._pendingValidationsCount - 1)
      return {
        ...prev,
        _pendingValidationsCount: newCount,
        isValidating: newCount === 0 && prev.isValidating ? false : prev.isValidating,
      }
    })
  }
}
function normalizeError$1(rawError) {
  if (rawError) return rawError
}
function getErrorMapKey$1(cause) {
  switch (cause) {
    case "submit":
      return "onSubmit"
    case "blur":
      return "onBlur"
    case "mount":
      return "onMount"
    case "server":
      return "onServer"
    case "dynamic":
      return "onDynamic"
    default:
      return "onChange"
  }
}
//#endregion
//#region node_modules/.pnpm/@tanstack+form-core@1.33.5/node_modules/@tanstack/form-core/dist/esm/FormGroupApi.js
function getDefaultFormGroupState(defaultState) {
  return {
    isSubmitted: defaultState.isSubmitted ?? false,
    isSubmitting: defaultState.isSubmitting ?? false,
    isValidating: defaultState.isValidating ?? false,
    submissionAttempts: defaultState.submissionAttempts ?? 0,
    isSubmitSuccessful: defaultState.isSubmitSuccessful ?? false,
  }
}
function getDefaultFormGroupMeta(defaultMeta) {
  return {
    ...defaultFieldMeta,
    ...defaultMeta,
    errors: [],
    isPristine: true,
    isValid: true,
    isDefaultValue: true,
    isFieldsValidating: false,
    isFieldsValid: true,
    isGroupValid: true,
    canSubmit: true,
    isSubmitting: false,
    isSubmitted: false,
    isValidating: false,
    submissionAttempts: 0,
    isSubmitSuccessful: false,
  }
}
const FormGroupApi = class FormGroupApi {
  constructor(opts) {
    this.options = {}
    this.setFormGroupState = (updater) => {
      this.form.baseStore.setState((prev) => {
        const prevGroupState = prev.formGroupStateBase[this.name] ?? getDefaultFormGroupState({})
        return {
          ...prev,
          formGroupStateBase: {
            ...prev.formGroupStateBase,
            [this.name]: updater(prevGroupState),
          },
        }
      })
    }
    this._lastDistributedFieldNames = {}
    this.update = (opts2) => {
      this.options = opts2
      this.name = opts2.name
      if (!this.state.meta.isTouched && this.options.defaultValue !== void 0) {
        if (!evaluate(this.form.getFieldValue(this.name), opts2.defaultValue))
          this.form.setFieldValue(this.name, opts2.defaultValue, {
            dontUpdateMeta: true,
            dontValidate: true,
            dontRunListeners: true,
          })
      }
      if (!this.form.getFieldMeta(this.name))
        this.form.setFieldMeta(this.name, {
          ...defaultFieldMeta,
          ...this.options.defaultMeta,
        })
    }
    this.mount = () => {
      this.update(this.options)
      this.form.formGroupApis.add(this)
      this.fieldInfo.instance = this
      this.form.baseStore.setState((prev) => ({
        ...prev,
        formGroupStateBase: {
          ...prev.formGroupStateBase,
          [this.name]:
            prev.formGroupStateBase[this.name] ??
            getDefaultFormGroupState({ ...this.options.defaultState }),
        },
      }))
      const { onMount } = this.options.validators || {}
      if (onMount) {
        const rawError = this.runValidator({
          validate: onMount,
          value: {
            value: this.state.value,
            groupApi: this,
            validationSource: "form",
          },
          type: "validate",
        })
        let groupOwnRawError = rawError
        let groupFieldErrors = void 0
        if (isGlobalGroupValidationError(rawError)) {
          groupOwnRawError = rawError.group
          groupFieldErrors = rawError.fields
        }
        const error = normalizeError(groupOwnRawError)
        if (error)
          this.setMeta((prev) => ({
            ...prev,
            errorMap: {
              ...prev.errorMap,
              onMount: error,
            },
            errorSourceMap: {
              ...prev.errorSourceMap,
              onMount: "field",
            },
          }))
        this.distributeFieldErrors("onMount", groupFieldErrors)
      }
      this.options.listeners?.onMount?.({
        value: this.state.value,
        groupApi: this,
      })
      return () => {
        for (const [key, timeout] of Object.entries(this.timeoutIds.validations))
          if (timeout) {
            clearTimeout(timeout)
            this.timeoutIds.validations[key] = null
          }
        for (const [key, timeout] of Object.entries(this.timeoutIds.listeners))
          if (timeout) {
            clearTimeout(timeout)
            this.timeoutIds.listeners[key] = null
          }
        for (const [key, timeout] of Object.entries(this.timeoutIds.formListeners))
          if (timeout) {
            clearTimeout(timeout)
            this.timeoutIds.formListeners[key] = null
          }
        if (this.fieldInfo.instance !== this) return
        for (const [key, validationMeta] of Object.entries(this.fieldInfo.validationMetaMap)) {
          validationMeta?.lastAbortController.abort()
          this.fieldInfo.validationMetaMap[key] = void 0
        }
        this.form.formGroupApis.delete(this)
        this.form.baseStore.setState((prev) => ({
          ...prev,
          formGroupStateBase: {
            ...prev.formGroupStateBase,
            [this.name]: getDefaultFormGroupState({}),
          },
        }))
        this.fieldInfo.instance = null
        this.options.listeners?.onUnmount?.({
          value: this.state.value,
          groupApi: this,
        })
      }
    }
    this.setValue = (updater, options) => {
      this.form.setFieldValue(
        this.name,
        updater,
        mergeOpts(options, {
          dontRunListeners: true,
          dontValidate: true,
        }),
      )
      if (!options?.dontRunListeners) this.triggerOnChangeListener()
      if (!options?.dontValidate) this.validate("change")
    }
    this.getMeta = () => this.store.state.meta
    this.setMeta = (updater) => this.form.setFieldMeta(this.name, updater)
    this.getInfo = () => this.fieldInfo
    this.getRelatedFields = () => {
      const fields = Object.values(this.form.fieldInfo)
      const relatedFields = []
      for (const field of fields) {
        if (!field.instance) continue
        if (!(field.instance instanceof FieldApi)) continue
        if (field.instance.name.startsWith(this.name)) relatedFields.push(field.instance)
      }
      return relatedFields
    }
    this.getRelatedFieldMetasDerived = () => {
      const fields = Object.entries(this.form.fieldMetaDerived.state)
      const relatedFieldMetas = []
      for (const [fieldName, fieldMeta] of fields) {
        if (fieldName === this.name) continue
        if (isFieldInGroup(this.name, fieldName))
          relatedFieldMetas.push({
            ...fieldMeta,
            name: fieldName,
          })
      }
      return relatedFieldMetas
    }
    this.buildChildFieldName = (relativeName) => {
      if (relativeName === "") return this.name
      if (relativeName.startsWith("[")) return `${this.name}${relativeName}`
      return `${this.name}.${relativeName}`
    }
    this.distributeFieldErrors = (errorMapKey, fieldErrors) => {
      const previousNames =
        this._lastDistributedFieldNames[errorMapKey] ?? /* @__PURE__ */ new Set()
      const currentNames = /* @__PURE__ */ new Set()
      if (fieldErrors)
        for (const [relativeName, err] of Object.entries(fieldErrors)) {
          if (err === void 0 || err === null || err === false) continue
          currentNames.add(this.buildChildFieldName(relativeName))
        }
      const allNames = /* @__PURE__ */ new Set([...previousNames, ...currentNames])
      let hasErrored = false
      for (const fullName of allNames) {
        const relativeName = fullName.startsWith(this.name + "[")
          ? fullName.slice(this.name.length)
          : fullName.slice(this.name.length + 1)
        const newFormValidatorError = fieldErrors?.[relativeName]
        const fieldMeta = this.form.getFieldMeta(fullName)
        if (!fieldMeta && !newFormValidatorError) continue
        const previousErrorValue = fieldMeta?.errorMap[errorMapKey]
        const { newErrorValue, newSource } = determineFormLevelErrorSourceAndValue({
          newFormValidatorError,
          isPreviousErrorFromFormValidator: fieldMeta?.errorSourceMap[errorMapKey] === "form",
          previousErrorValue,
        })
        if (newErrorValue) hasErrored = true
        if (
          previousErrorValue === newErrorValue &&
          fieldMeta?.errorSourceMap[errorMapKey] === newSource
        )
          continue
        this.form.setFieldMeta(fullName, (prev = defaultFieldMeta) => ({
          ...prev,
          errorMap: {
            ...prev.errorMap,
            [errorMapKey]: newErrorValue,
          },
          errorSourceMap: {
            ...prev.errorSourceMap,
            [errorMapKey]: newSource,
          },
        }))
      }
      this._lastDistributedFieldNames[errorMapKey] = currentNames
      return hasErrored
    }
    this.validateSync = (cause, errorFromForm, opts2 = {}) => {
      const validates = getSyncValidatorArray(cause, {
        ...this.options,
        form: this.form,
        group: this,
        validationLogic:
          this.options.validationLogic ||
          this.form.options.validationLogic ||
          defaultValidationLogic,
      })
      const relatedFieldValidates = (
        opts2.skipRelatedFieldValidation ? [] : this.getRelatedFields()
      ).reduce((acc, field) => {
        const fieldValidates = getSyncValidatorArray(cause, {
          ...field.options,
          form: field.form,
          validationLogic: field.form.options.validationLogic || defaultValidationLogic,
        })
        fieldValidates.forEach((validate) => {
          validate.field = field
        })
        return acc.concat(fieldValidates)
      }, [])
      let hasErrored = false
      batch(() => {
        const validateFieldOrGroupFn = (fieldOrGroup, validateObj) => {
          const errorMapKey = getErrorMapKey(validateObj.cause)
          const isGroup = fieldOrGroup === this
          let rawError = void 0
          if (validateObj.validate)
            rawError = fieldOrGroup.runValidator({
              validate: validateObj.validate,
              value: {
                value: fieldOrGroup.store.state.value,
                validationSource: isGroup ? "form" : "field",
                ...(fieldOrGroup instanceof FormGroupApi
                  ? { groupApi: fieldOrGroup }
                  : { fieldApi: fieldOrGroup }),
              },
              type: "validate",
            })
          let groupOwnRawError = rawError
          let groupFieldErrors = void 0
          if (isGroup && isGlobalGroupValidationError(rawError)) {
            groupOwnRawError = rawError.group
            groupFieldErrors = rawError.fields
          }
          const fieldLevelError = normalizeError(groupOwnRawError)
          const formLevelError = errorFromForm[errorMapKey]
          const { newErrorValue, newSource } = determineFieldLevelErrorSourceAndValue({
            formLevelError,
            fieldLevelError,
          })
          if (fieldOrGroup.state.meta.errorMap?.[errorMapKey] !== newErrorValue)
            fieldOrGroup.setMeta((prev) => ({
              ...prev,
              errorMap: {
                ...prev.errorMap,
                [errorMapKey]: newErrorValue,
              },
              errorSourceMap: {
                ...prev.errorSourceMap,
                [errorMapKey]: newSource,
              },
            }))
          if (newErrorValue) hasErrored = true
          if (isGroup) {
            if (this.distributeFieldErrors(errorMapKey, groupFieldErrors)) hasErrored = true
          }
        }
        for (const validateObj of validates) validateFieldOrGroupFn(this, validateObj)
        for (const fieldValidateObj of relatedFieldValidates) {
          if (!fieldValidateObj.validate) continue
          validateFieldOrGroupFn(fieldValidateObj.field, fieldValidateObj)
        }
      })
      const submitErrKey = getErrorMapKey("submit")
      if (this.state.meta.errorMap?.[submitErrKey] && cause !== "submit" && !hasErrored)
        this.setMeta((prev) => ({
          ...prev,
          errorMap: {
            ...prev.errorMap,
            [submitErrKey]: void 0,
          },
          errorSourceMap: {
            ...prev.errorSourceMap,
            [submitErrKey]: void 0,
          },
        }))
      return { hasErrored }
    }
    this.validateAsync = async (cause, formValidationResultPromise, opts2 = {}) => {
      const validates = getAsyncValidatorArray(cause, {
        ...this.options,
        form: this.form,
        group: this,
        validationLogic:
          this.options.validationLogic ||
          this.form.options.validationLogic ||
          defaultValidationLogic,
      })
      const asyncFormValidationResults = await formValidationResultPromise
      const relatedFields = opts2.skipRelatedFieldValidation ? [] : this.getRelatedFields()
      const relatedFieldValidates = relatedFields.reduce((acc, field) => {
        const fieldValidates = getAsyncValidatorArray(cause, {
          ...field.options,
          form: field.form,
          validationLogic: field.form.options.validationLogic || defaultValidationLogic,
        })
        fieldValidates.forEach((validate) => {
          validate.field = field
        })
        return acc.concat(fieldValidates)
      }, [])
      const validatesPromises = []
      const linkedPromises = []
      const hasAsyncValidators =
        validates.some((v) => v.validate) || relatedFieldValidates.some((v) => v.validate)
      if (hasAsyncValidators) {
        if (!this.state.meta.isValidating)
          this.setMeta((prev) => ({
            ...prev,
            isValidating: true,
          }))
        for (const linkedField of relatedFields)
          linkedField.setMeta((prev) => ({
            ...prev,
            isValidating: true,
          }))
      }
      const validateFieldOrGroupAsyncFn = (fieldOrGroup, validateObj, promises) => {
        const errorMapKey = getErrorMapKey(validateObj.cause)
        const fieldInfo = fieldOrGroup.getInfo()
        fieldInfo.validationMetaMap[errorMapKey]?.lastAbortController.abort()
        const controller = new AbortController()
        fieldInfo.validationMetaMap[errorMapKey] = { lastAbortController: controller }
        const isGroup = fieldOrGroup === this
        promises.push(
          new Promise(async (resolve) => {
            let rawError
            try {
              rawError = await new Promise((rawResolve, rawReject) => {
                if (fieldOrGroup.timeoutIds.validations[validateObj.cause])
                  clearTimeout(fieldOrGroup.timeoutIds.validations[validateObj.cause])
                fieldOrGroup.timeoutIds.validations[validateObj.cause] = setTimeout(async () => {
                  if (controller.signal.aborted) return rawResolve(void 0)
                  try {
                    rawResolve(
                      await this.runValidator({
                        validate: validateObj.validate,
                        value: {
                          value: fieldOrGroup.store.state.value,
                          signal: controller.signal,
                          validationSource: isGroup ? "form" : "field",
                          ...(fieldOrGroup instanceof FormGroupApi
                            ? { groupApi: fieldOrGroup }
                            : { fieldApi: fieldOrGroup }),
                        },
                        type: "validateAsync",
                      }),
                    )
                  } catch (e) {
                    rawReject(e)
                  }
                }, validateObj.debounceMs)
              })
            } catch (e) {
              rawError = e
            }
            if (controller.signal.aborted) return resolve(void 0)
            let groupOwnRawError = rawError
            let groupFieldErrors = void 0
            if (isGroup && isGlobalGroupValidationError(rawError)) {
              groupOwnRawError = rawError.group
              groupFieldErrors = rawError.fields
            }
            const fieldLevelError = normalizeError(groupOwnRawError)
            const formLevelError = asyncFormValidationResults[fieldOrGroup.name]?.[errorMapKey]
            const { newErrorValue, newSource } = determineFieldLevelErrorSourceAndValue({
              formLevelError,
              fieldLevelError,
            })
            if (fieldOrGroup.getInfo().instance !== fieldOrGroup) return resolve(void 0)
            fieldOrGroup.setMeta((prev) => {
              return {
                ...prev,
                errorMap: {
                  ...prev?.errorMap,
                  [errorMapKey]: newErrorValue,
                },
                errorSourceMap: {
                  ...prev.errorSourceMap,
                  [errorMapKey]: newSource,
                },
              }
            })
            if (isGroup) this.distributeFieldErrors(errorMapKey, groupFieldErrors)
            resolve(newErrorValue)
          }),
        )
      }
      for (const validateObj of validates) {
        if (!validateObj.validate) continue
        validateFieldOrGroupAsyncFn(this, validateObj, validatesPromises)
      }
      for (const fieldValitateObj of relatedFieldValidates) {
        if (!fieldValitateObj.validate) continue
        validateFieldOrGroupAsyncFn(fieldValitateObj.field, fieldValitateObj, linkedPromises)
      }
      let results = []
      if (validatesPromises.length || linkedPromises.length) {
        results = await Promise.all(validatesPromises)
        await Promise.all(linkedPromises)
      }
      if (hasAsyncValidators) {
        this.setMeta((prev) => ({
          ...prev,
          isValidating: false,
        }))
        for (const linkedField of relatedFields)
          linkedField.setMeta((prev) => ({
            ...prev,
            isValidating: false,
          }))
      }
      return results.filter(Boolean)
    }
    this.validateAllFields = async (cause) => {
      const fieldValidationPromises = []
      batch(() => {
        Object.values(this.getRelatedFields()).forEach((fieldInstance) => {
          fieldValidationPromises.push(
            Promise.resolve().then(() =>
              fieldInstance.validate(cause, {
                skipFormValidation: true,
                skipGroupValidation: true,
              }),
            ),
          )
          if (!fieldInstance.store.state.meta.isTouched)
            fieldInstance.setMeta((prev) => ({
              ...prev,
              isTouched: true,
            }))
        })
      })
      return (await Promise.all(fieldValidationPromises)).flat()
    }
    this.validateArrayFieldsStartingFrom = (field, index, cause) => {
      return this.form.validateArrayFieldsStartingFrom(field, index, cause)
    }
    this.validateField = (field, cause) => {
      return this.form.validateField(field, cause)
    }
    this.getFieldValue = (field) => {
      return this.form.getFieldValue(field)
    }
    this.getFieldMeta = (field) => {
      return this.form.getFieldMeta(field)
    }
    this.setFieldMeta = (field, updater) => {
      return this.form.setFieldMeta(field, updater)
    }
    this.setFieldValue = (field, value) => {
      return this.form.setFieldValue(field, value)
    }
    this.deleteField = (field) => {
      return this.form.deleteField(field)
    }
    this.pushFieldValue = (field, value) => {
      return this.form.pushFieldValue(field, value)
    }
    this.insertFieldValue = (field, index, value) => {
      return this.form.insertFieldValue(field, index, value)
    }
    this.replaceFieldValue = (field, index, value) => {
      return this.form.replaceFieldValue(field, index, value)
    }
    this.swapFieldValues = (field, index1, index2) => {
      return this.form.swapFieldValues(field, index1, index2)
    }
    this.moveFieldValues = (field, fromIndex, toIndex) => {
      return this.form.moveFieldValues(field, fromIndex, toIndex)
    }
    this.clearFieldValues = (field) => {
      return this.form.clearFieldValues(field)
    }
    this.resetField = (field) => {
      return this.form.resetField(field)
    }
    this.removeFieldValue = (field, index) => {
      return this.form.removeFieldValue(field, index)
    }
    this.areRelatedFieldsValid = () => {
      return Object.values(this.getRelatedFields()).every((field) => field.state.meta.isValid)
    }
    this.validate = (cause, opts2) => {
      const { fieldsErrorMap } = opts2?.skipFormValidation
        ? { fieldsErrorMap: {} }
        : this.form.validateSync(cause, {
            dontUpdateFormErrorMap: true,
            filterFieldNames: (fieldName) => isFieldInGroup(this.name, fieldName),
          })
      const { hasErrored } = this.validateSync(cause, fieldsErrorMap[this.name] ?? {}, {
        skipRelatedFieldValidation: opts2?.skipRelatedFieldValidation,
      })
      if (hasErrored && !this.options.asyncAlways) {
        this.getInfo().validationMetaMap[getErrorMapKey(cause)]?.lastAbortController.abort()
        return this.state.meta.errors
      }
      const formValidationResultPromise = opts2?.skipFormValidation
        ? Promise.resolve({})
        : this.form.validateAsync(cause, {
            dontUpdateFormErrorMap: true,
            filterFieldNames: (fieldName) => isFieldInGroup(this.name, fieldName),
          })
      return this.validateAsync(cause, formValidationResultPromise, {
        skipRelatedFieldValidation: opts2?.skipRelatedFieldValidation,
      })
    }
    this.triggerOnChangeListener = () => {
      const formDebounceMs = this.form.options.listeners?.onChangeGroupDebounceMs
      if (formDebounceMs && formDebounceMs > 0) {
        if (this.timeoutIds.formListeners.change) clearTimeout(this.timeoutIds.formListeners.change)
        this.timeoutIds.formListeners.change = setTimeout(() => {
          this.form.options.listeners?.onChangeGroup?.({
            formApi: this.form,
            groupApi: this,
          })
        }, formDebounceMs)
      } else
        this.form.options.listeners?.onChangeGroup?.({
          formApi: this.form,
          groupApi: this,
        })
      const fieldDebounceMs = this.options.listeners?.onChangeDebounceMs
      if (fieldDebounceMs && fieldDebounceMs > 0) {
        if (this.timeoutIds.listeners.change) clearTimeout(this.timeoutIds.listeners.change)
        this.timeoutIds.listeners.change = setTimeout(() => {
          this.options.listeners?.onChange?.({
            value: this.state.value,
            groupApi: this,
          })
        }, fieldDebounceMs)
      } else
        this.options.listeners?.onChange?.({
          value: this.state.value,
          groupApi: this,
        })
    }
    this.triggerOnSubmitListener = () => {
      this.options.listeners?.onSubmit?.({
        value: this.state.value,
        groupApi: this,
      })
    }
    this._handleSubmit = async (submitMeta) => {
      this.setFormGroupState((old) => ({
        ...old,
        isSubmitted: false,
        submissionAttempts: old.submissionAttempts + 1,
        isSubmitSuccessful: false,
      }))
      batch(() => {
        Object.values(this.getRelatedFields()).forEach((field) => {
          if (!field.state.meta.isTouched)
            field.setMeta((prev) => ({
              ...prev,
              isTouched: true,
            }))
        })
      })
      const submitMetaArg = submitMeta ?? this.options.onSubmitMeta
      this.setFormGroupState((d) => ({
        ...d,
        isSubmitting: true,
      }))
      const done = () => {
        this.setFormGroupState((prev) => ({
          ...prev,
          isSubmitting: false,
        }))
      }
      await this.validateAllFields("submit")
      if (!this.areRelatedFieldsValid()) {
        done()
        this.options.onGroupSubmitInvalid?.({
          value: this.state.value,
          groupApi: this,
          meta: submitMetaArg,
        })
        return
      }
      await this.validate("submit", { skipRelatedFieldValidation: true })
      if (!this.areRelatedFieldsValid() || !this.state.meta.isValid) {
        done()
        this.options.onGroupSubmitInvalid?.({
          value: this.state.value,
          groupApi: this,
          meta: submitMetaArg,
        })
        return
      }
      batch(() => {
        Object.values(this.getRelatedFields()).forEach((field) => {
          field.options.listeners?.onGroupSubmit?.({
            value: field.state.value,
            fieldApi: field,
          })
        })
      })
      this.options.listeners?.onSubmit?.({
        groupApi: this,
        value: this.state.value,
      })
      try {
        await this.options.onGroupSubmit?.({
          value: this.state.value,
          groupApi: this,
          meta: submitMetaArg,
        })
        batch(() => {
          this.setFormGroupState((prev) => ({
            ...prev,
            isSubmitted: true,
            isSubmitSuccessful: true,
          }))
          done()
        })
      } catch (err) {
        this.setFormGroupState((prev) => ({
          ...prev,
          isSubmitSuccessful: false,
        }))
        done()
        throw err
      }
    }
    this.form = opts.form
    this.name = opts.name
    this.options = opts
    this.timeoutIds = {
      validations: {},
      listeners: {},
      formListeners: {},
    }
    this.fieldInfo = {
      instance: null,
      validationMetaMap: {
        onChange: void 0,
        onBlur: void 0,
        onSubmit: void 0,
        onMount: void 0,
        onServer: void 0,
        onDynamic: void 0,
      },
    }
    this.store = createStore((prevVal) => {
      this.form.formGroupMetaDerived.get()
      this.form.baseStore.get()
      const meta =
        this.form.getFormGroupMeta(this.name) ?? getDefaultFormGroupMeta(opts.defaultMeta)
      let value = this.form.getFieldValue(this.name)
      if (
        !meta.isTouched &&
        value === void 0 &&
        this.options.defaultValue !== void 0 &&
        !evaluate(value, this.options.defaultValue)
      )
        value = this.options.defaultValue
      if (prevVal && prevVal.value === value && prevVal.meta === meta) return prevVal
      return {
        value,
        meta,
      }
    })
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  /**
   * The current field state.
   */
  get state() {
    return this.store.state
  }
  /**
   * @private
   */
  runValidator(props) {
    if (isStandardSchemaValidator(props.validate)) {
      const result = standardSchemaValidators[props.type](props.value, props.validate)
      if (props.type === "validate") return remapStandardSchemaResultForGroup(result)
      return result.then(remapStandardSchemaResultForGroup)
    }
    return props.validate(props.value)
  }
  handleSubmit(submitMeta) {
    return this._handleSubmit(submitMeta)
  }
}
function normalizeError(rawError) {
  if (rawError) return rawError
}
function isGlobalGroupValidationError(error) {
  return Boolean(error) && typeof error === "object" && "fields" in error
}
function remapStandardSchemaResultForGroup(result) {
  if (!result || typeof result !== "object") return result
  if (!("form" in result) && !("fields" in result)) return result
  const { form, fields, ...rest } = result
  return {
    ...rest,
    group: form,
    fields,
  }
}
function getErrorMapKey(cause) {
  switch (cause) {
    case "submit":
      return "onSubmit"
    case "blur":
      return "onBlur"
    case "mount":
      return "onMount"
    case "server":
      return "onServer"
    case "dynamic":
      return "onDynamic"
    default:
      return "onChange"
  }
}
//#endregion
//#region node_modules/.pnpm/@tanstack+form-core@1.33.5/node_modules/@tanstack/form-core/dist/esm/transform.js
function mergeAndUpdate(form, fn) {
  if (!fn) return
  const newObj = { ...form, state: deepCopy(form.state) }
  fn(newObj)
  if (newObj.fieldInfo !== form.fieldInfo) form.fieldInfo = newObj.fieldInfo
  if (newObj.options !== form.options) form.options = newObj.options
  const diffedObject = Object.keys({
    values: null,
    validationMetaMap: null,
    fieldMetaBase: null,
    formGroupStateBase: null,
    isSubmitting: null,
    isSubmitted: null,
    isValidating: null,
    submissionAttempts: null,
    isSubmitSuccessful: null,
    _force_re_eval: null,
  }).reduce((prev, key) => {
    if (form.state[key] !== newObj.state[key]) prev[key] = newObj.state[key]
    return prev
  }, {})
  batch(() => {
    if (Object.keys(diffedObject).length > 0)
      form.baseStore.setState((prev) => ({
        ...prev,
        ...diffedObject,
      }))
    if (newObj.state.errorMap !== form.state.errorMap) form.setErrorMap(newObj.state.errorMap)
  })
  return newObj
}
//#endregion
//#region node_modules/.pnpm/@tanstack+react-form@1.33.5_1754d72bdaf1531cc071b11dd96bdaeb/node_modules/@tanstack/react-form/dist/esm/useIsomorphicLayoutEffect.js
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? import_react.useLayoutEffect : import_react.useEffect
//#endregion
//#region node_modules/.pnpm/@tanstack+react-form@1.33.5_1754d72bdaf1531cc071b11dd96bdaeb/node_modules/@tanstack/react-form/dist/esm/useField.js
function useField(opts) {
  const [prevOptions, setPrevOptions] = (0, import_react.useState)(() => ({
    form: opts.form,
    name: opts.name,
  }))
  const [fieldApiState, setFieldApi] = (0, import_react.useState)(() => {
    return new FieldApi({ ...opts })
  })
  let fieldApi = fieldApiState
  if (prevOptions.form !== opts.form || prevOptions.name !== opts.name) {
    fieldApi = new FieldApi({ ...opts })
    setFieldApi(fieldApi)
    setPrevOptions({
      form: opts.form,
      name: opts.name,
    })
  }
  const reactiveStateValue = useSelector(
    fieldApi.store,
    opts.mode === "array" ? (state) => state.meta._arrayVersion || 0 : (state) => state.value,
  )
  const reactiveMetaIsTouched = useSelector(fieldApi.store, (state) => state.meta.isTouched)
  const reactiveMetaIsBlurred = useSelector(fieldApi.store, (state) => state.meta.isBlurred)
  const reactiveMetaIsDirty = useSelector(fieldApi.store, (state) => state.meta.isDirty)
  const reactiveMetaErrorMap = useSelector(fieldApi.store, (state) => state.meta.errorMap)
  const reactiveMetaErrorSourceMap = useSelector(
    fieldApi.store,
    (state) => state.meta.errorSourceMap,
  )
  const reactiveMetaIsValidating = useSelector(fieldApi.store, (state) => state.meta.isValidating)
  const extendedFieldApi = (0, import_react.useMemo)(() => {
    return {
      ...fieldApi,
      get state() {
        return {
          value: opts.mode === "array" ? fieldApi.state.value : reactiveStateValue,
          get meta() {
            return {
              ...fieldApi.state.meta,
              isTouched: reactiveMetaIsTouched,
              isBlurred: reactiveMetaIsBlurred,
              isDirty: reactiveMetaIsDirty,
              errorMap: reactiveMetaErrorMap,
              errorSourceMap: reactiveMetaErrorSourceMap,
              isValidating: reactiveMetaIsValidating,
            }
          },
        }
      },
    }
  }, [
    fieldApi,
    opts.mode,
    reactiveStateValue,
    reactiveMetaIsTouched,
    reactiveMetaIsBlurred,
    reactiveMetaIsDirty,
    reactiveMetaErrorMap,
    reactiveMetaErrorSourceMap,
    reactiveMetaIsValidating,
  ])
  useIsomorphicLayoutEffect(fieldApi.mount, [fieldApi])
  useIsomorphicLayoutEffect(() => {
    fieldApi.update(opts)
  })
  return extendedFieldApi
}
const Field = ({ children, ...fieldOptions }) => {
  const fieldApi = useField(fieldOptions)
  const jsxToDisplay = (0, import_react.useMemo)(
    () => functionalUpdate(children, fieldApi),
    [children, fieldApi],
  )
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {
    children: jsxToDisplay,
  })
}
//#endregion
//#region node_modules/.pnpm/@tanstack+react-form@1.33.5_1754d72bdaf1531cc071b11dd96bdaeb/node_modules/@tanstack/react-form/dist/esm/useUUID.js
function useUUID() {
  return (0, import_react.useState)(() => uuid())[0]
}
//#endregion
//#region node_modules/.pnpm/@tanstack+react-form@1.33.5_1754d72bdaf1531cc071b11dd96bdaeb/node_modules/@tanstack/react-form/dist/esm/useFormId.js
const _React = import_react
const useFormId = "19.2.8".split(".")[0] === "17" ? useUUID : _React.useId
//#endregion
//#region node_modules/.pnpm/@tanstack+react-form@1.33.5_1754d72bdaf1531cc071b11dd96bdaeb/node_modules/@tanstack/react-form/dist/esm/useFormGroup.js
function useFormGroup(opts) {
  const [prevOptions, setPrevOptions] = (0, import_react.useState)(() => ({
    form: opts.form,
    name: opts.name,
  }))
  const [formGroupApi, setFormGroupApi] = (0, import_react.useState)(() => {
    return new FormGroupApi({ ...opts })
  })
  if (prevOptions.form !== opts.form || prevOptions.name !== opts.name) {
    setFormGroupApi(new FormGroupApi({ ...opts }))
    setPrevOptions({
      form: opts.form,
      name: opts.name,
    })
  }
  const reactiveStateValue = useSelector(formGroupApi.store, (state) => state.value)
  const reactiveMetaIsTouched = useSelector(formGroupApi.store, (state) => state.meta.isTouched)
  const reactiveMetaIsBlurred = useSelector(formGroupApi.store, (state) => state.meta.isBlurred)
  const reactiveMetaIsDirty = useSelector(formGroupApi.store, (state) => state.meta.isDirty)
  const reactiveMetaErrorMap = useSelector(formGroupApi.store, (state) => state.meta.errorMap)
  const reactiveMetaErrorSourceMap = useSelector(
    formGroupApi.store,
    (state) => state.meta.errorSourceMap,
  )
  const reactiveMetaIsValidating = useSelector(
    formGroupApi.store,
    (state) => state.meta.isValidating,
  )
  const reactiveMetaIsSubmitting = useSelector(
    formGroupApi.store,
    (state) => state.meta.isSubmitting,
  )
  const reactiveMetaIsSubmitted = useSelector(formGroupApi.store, (state) => state.meta.isSubmitted)
  const reactiveMetaSubmissionAttempts = useSelector(
    formGroupApi.store,
    (state) => state.meta.submissionAttempts,
  )
  const reactiveMetaIsSubmitSuccessful = useSelector(
    formGroupApi.store,
    (state) => state.meta.isSubmitSuccessful,
  )
  const reactiveMetaCanSubmit = useSelector(formGroupApi.store, (state) => state.meta.canSubmit)
  const reactiveMetaIsValid = useSelector(formGroupApi.store, (state) => state.meta.isValid)
  const reactiveMetaIsFieldsValid = useSelector(
    formGroupApi.store,
    (state) => state.meta.isFieldsValid,
  )
  const reactiveMetaIsFieldsValidating = useSelector(
    formGroupApi.store,
    (state) => state.meta.isFieldsValidating,
  )
  const reactiveMetaIsGroupValid = useSelector(
    formGroupApi.store,
    (state) => state.meta.isGroupValid,
  )
  const extendedFieldApi = (0, import_react.useMemo)(() => {
    return {
      ...formGroupApi,
      handleSubmit: (...props) => {
        return formGroupApi._handleSubmit(...props)
      },
      get state() {
        return {
          ...formGroupApi.state,
          value: reactiveStateValue,
          get meta() {
            return {
              ...formGroupApi.state.meta,
              isTouched: reactiveMetaIsTouched,
              isBlurred: reactiveMetaIsBlurred,
              isDirty: reactiveMetaIsDirty,
              errorMap: reactiveMetaErrorMap,
              errorSourceMap: reactiveMetaErrorSourceMap,
              isValidating: reactiveMetaIsValidating,
              isSubmitting: reactiveMetaIsSubmitting,
              isSubmitted: reactiveMetaIsSubmitted,
              submissionAttempts: reactiveMetaSubmissionAttempts,
              isSubmitSuccessful: reactiveMetaIsSubmitSuccessful,
              canSubmit: reactiveMetaCanSubmit,
              isValid: reactiveMetaIsValid,
              isFieldsValid: reactiveMetaIsFieldsValid,
              isFieldsValidating: reactiveMetaIsFieldsValidating,
              isGroupValid: reactiveMetaIsGroupValid,
            }
          },
        }
      },
    }
  }, [
    formGroupApi,
    reactiveStateValue,
    reactiveMetaIsTouched,
    reactiveMetaIsBlurred,
    reactiveMetaIsDirty,
    reactiveMetaErrorMap,
    reactiveMetaErrorSourceMap,
    reactiveMetaIsValidating,
    reactiveMetaIsSubmitting,
    reactiveMetaIsSubmitted,
    reactiveMetaSubmissionAttempts,
    reactiveMetaIsSubmitSuccessful,
    reactiveMetaCanSubmit,
    reactiveMetaIsValid,
    reactiveMetaIsFieldsValid,
    reactiveMetaIsFieldsValidating,
    reactiveMetaIsGroupValid,
  ])
  useIsomorphicLayoutEffect(formGroupApi.mount, [formGroupApi])
  useIsomorphicLayoutEffect(() => {
    formGroupApi.update(opts)
  })
  return extendedFieldApi
}
const FormGroup = ({ children, ...formGroupOptions }) => {
  const formGroupApi = useFormGroup(formGroupOptions)
  const jsxToDisplay = (0, import_react.useMemo)(
    () => functionalUpdate(children, formGroupApi),
    [children, formGroupApi],
  )
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {
    children: jsxToDisplay,
  })
}
//#endregion
//#region node_modules/.pnpm/@tanstack+react-form@1.33.5_1754d72bdaf1531cc071b11dd96bdaeb/node_modules/@tanstack/react-form/dist/esm/useForm.js
function LocalSubscribe({ form, selector = (state) => state, children }) {
  const data = useSelector(form.store, selector)
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {
    children: functionalUpdate(children, data),
  })
}
function useForm(opts) {
  const fallbackFormId = useFormId()
  const [prevFormId, setPrevFormId] = (0, import_react.useState)(opts?.formId)
  const [formApi, setFormApi] = (0, import_react.useState)(() => {
    return new FormApi({
      ...opts,
      formId: opts?.formId ?? fallbackFormId,
    })
  })
  if (prevFormId !== opts?.formId) {
    const formId = opts?.formId ?? fallbackFormId
    setFormApi(
      new FormApi({
        ...opts,
        formId,
      }),
    )
    setPrevFormId(formId)
  }
  const extendedFormApi = (0, import_react.useMemo)(() => {
    const extendedApi = {
      ...formApi,
      handleSubmit: (...props) => {
        return formApi._handleSubmit(...props)
      },
      get formId() {
        return formApi._formId
      },
      get state() {
        return formApi.store.state
      },
    }
    extendedApi.Field = function APIField(props) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
        ...props,
        form: formApi,
      })
    }
    extendedApi.FormGroup = function APIFormGroup(props) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroup, {
        ...props,
        form: formApi,
      })
    }
    extendedApi.Subscribe = function Subscribe(props) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocalSubscribe, {
        form: formApi,
        selector: props.selector,
        children: props.children,
      })
    }
    return extendedApi
  }, [formApi])
  useIsomorphicLayoutEffect(formApi.mount, [])
  useIsomorphicLayoutEffect(() => {
    formApi.update(opts)
  })
  const hasRan = (0, import_react.useRef)(false)
  useIsomorphicLayoutEffect(() => {
    if (!hasRan.current) return
    if (!opts?.transform) return
    mergeAndUpdate(formApi, opts.transform)
  }, [formApi, opts?.transform])
  useIsomorphicLayoutEffect(() => {
    hasRan.current = true
  })
  return extendedFormApi
}
//#endregion
//#region src/features/subscriptions/editor/editor-validation.ts
function isHttpUrl(value) {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}
/**
 * The same rules the API applies, so the form never accepts what the API would turn down. Length is
 * measured before trimming, exactly as the validator measures it — a name of a hundred characters
 * followed by a space is over the limit there, and has to read as over the limit here.
 */
function validateName(value) {
  if (!value.trim()) return "名称不能为空。"
  if (value.length > 100) return `名称不能超过 100 个字符。`
}
function validateSource(value, sourceType) {
  if (!value.trim()) return "订阅来源不能为空。"
  if (sourceType !== "remote") return
  const urls = splitSourceUrls(value)
  if (urls.length === 0) return "请至少填写一个远程订阅链接。"
  if (urls.length > 32) return `最多填写 32 个链接。`
  for (const [index, entry] of urls.entries())
    try {
      const url = new URL(entry)
      if (url.protocol !== "http:" && url.protocol !== "https:")
        return `第 ${index + 1} 个链接只支持 HTTP 或 HTTPS。`
    } catch {
      return `第 ${index + 1} 个链接不是有效 URL。`
    }
}
//#endregion
//#region src/features/subscriptions/editor/editor-sections.tsx
/**
 * The three field sections, in the order they are numbered. "发布状态" is deliberately absent: it is
 * a single switch, so it reads as one closing row rather than a section of its own.
 */
const SECTIONS = [
  {
    id: "01",
    title: "基本信息",
    field: "name",
  },
  {
    id: "02",
    title: "订阅来源",
    field: "sourceValue",
  },
  {
    id: "03",
    title: "规则链",
    field: "processors",
  },
]
const SOURCE_TYPE_ICONS = {
  raw: IconFileText,
  pool: IconDatabase,
  remote: IconCloudDownload,
}
/**
 * A field only counts as broken once the user has been near it, matching what the field itself
 * shows — otherwise opening a blank draft would light up as broken before anything is typed.
 * Returns the message so a section can render an error for a field it does not itself own.
 */
function fieldError(fieldMeta, field) {
  const meta = fieldMeta[field]
  if (!meta?.isTouched || meta.isValid) return ""
  return String(meta.errors[0] ?? "")
}
function invalidField(fieldMeta, field) {
  return fieldError(fieldMeta, field).length > 0
}
/** Only rendered in remote mode, so a pasted 2 MiB source is never split just to be discarded. */
function RemoteUrlCount({ value }) {
  const urls = splitSourceUrls(value)
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldDescription, {
    children: [
      "多个链接需要换行或者使用 | 分隔 · 已识别 ",
      urls.filter((url) => isHttpUrl(url)).length,
      " /",
      " ",
      urls.length,
      " 条",
    ],
  })
}
/**
 * Sections are always open. Every one of them holds either a single control or two closely related
 * ones, so a collapsed row would have hidden one field behind one click and bought nothing; the
 * numbered header is here to group and to carry the error, not to fold.
 */
function SectionHeader({ id, invalid, title }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    "data-invalid": invalid,
    "className":
      "flex h-12 flex-none items-center gap-2.5 border-b bg-sidebar px-4 data-[invalid=true]:bg-destructive/6 md:gap-3 md:px-8",
    "children": [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
        "aria-hidden": true,
        "className": cn(
          "inline-flex size-5 shrink-0 items-center justify-center text-[10px] font-bold",
          invalid ? "bg-destructive/12 text-destructive" : "bg-muted text-foreground",
        ),
        "children": id,
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
        className: "text-[11px] font-semibold tracking-[0.14em] uppercase",
        children: title,
      }),
      invalid
        ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
            className:
              "ml-auto inline-flex shrink-0 items-center gap-1.25 text-[11px] text-destructive",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconAlertTriangle, {
                className: "size-3",
              }),
              "1 处错误",
            ],
          })
        : null,
    ],
  })
}
function SectionBody({ children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    className: "border-b px-4 py-5 md:px-8 md:py-6",
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldGroup, {
      className: "gap-5",
      children,
    }),
  })
}
//#endregion
//#region src/features/subscriptions/editor/subscription-editor.tsx
/**
 * Uncontrolled with respect to `values`: the manager remounts this with a fresh `key` whenever it
 * opens the editor, so `defaultValues` is always the draft the user asked for.
 */
function SubscriptionEditor({ onOpenChange, onOpenChangeComplete, onSave, open, values }) {
  const [chain, setChain] = (0, import_react.useState)(() => splitProcessors(values.processors))
  const form = useForm({
    defaultValues: values,
    onSubmit: async ({ value }) => {
      if (
        await onSave(
          {
            name: value.name,
            folder: value.folder || void 0,
            source: sourceFromValues(value),
            defaultTarget: value.defaultTarget,
            processors: value.processors,
            enabled: value.enabled,
          },
          value.id,
        )
      )
        onOpenChange(false)
    },
  })
  const actions = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Subscribe, {
    selector: (state) => [state.canSubmit, state.isSubmitting, state.values.id, state.fieldMeta],
    children: ([canSubmit, isSubmitting, id, fieldMeta]) => {
      const broken = SECTIONS.filter((section) => invalidField(fieldMeta, section.field))
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
        children: [
          broken.length > 0
            ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
                className:
                  "mr-auto inline-flex items-center gap-2 text-[12.5px] font-medium text-destructive",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconAlertTriangle, {
                    className: "size-3.75 shrink-0",
                  }),
                  broken.length,
                  " 处需要修正 · 分区 ",
                  broken.map((item) => item.id).join("、"),
                ],
              })
            : null,
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
            type: "button",
            variant: "outline",
            onClick: () => onOpenChange(false),
            children: "取消",
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
            type: "submit",
            form: "subscription-editor",
            disabled: isSubmitting || !canSubmit,
            children: [
              id
                ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconEdit, {
                    "data-icon": "inline-start",
                  })
                : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconPlus, {
                    "data-icon": "inline-start",
                  }),
              isSubmitting ? "保存中" : id ? "保存修改" : "创建订阅",
            ],
          }),
        ],
      })
    },
  })
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SideSurface, {
    actions,
    bodyClassName: "p-0",
    className: "data-[side=right]:sm:max-w-lg data-[side=right]:xl:max-w-xl",
    description: "订阅源、默认客户端和规则链会一起持久化。",
    onOpenChange,
    onOpenChangeComplete,
    open,
    title: values.id ? "编辑订阅" : "创建订阅",
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
      id: "subscription-editor",
      onSubmit: (event) => {
        event.preventDefault()
        event.stopPropagation()
        form.handleSubmit()
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Subscribe, {
        selector: (state) => [state.values, state.fieldMeta],
        children: ([current, fieldMeta]) => {
          const broken = SECTIONS.filter((section) => invalidField(fieldMeta, section.field))
          const isBroken = (id) => broken.some((section) => section.id === id)
          const sourceError = fieldError(fieldMeta, "sourceValue")
          return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className: "flex flex-col",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
                id: "01",
                title: "基本信息",
                invalid: isBroken("01"),
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionBody, {
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "grid gap-5 md:grid-cols-2",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
                      name: "name",
                      validators: { onChange: ({ value }) => validateName(value) },
                      children: (field) => {
                        const invalid = field.state.meta.isTouched && !field.state.meta.isValid
                        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field$1, {
                          "data-invalid": invalid,
                          "children": [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
                              htmlFor: field.name,
                              children: "名称",
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                              "id": field.name,
                              "name": field.name,
                              "value": field.state.value,
                              "onBlur": field.handleBlur,
                              "onChange": (event) => field.handleChange(event.target.value),
                              "aria-invalid": invalid,
                            }),
                            invalid
                              ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, {
                                  children: String(field.state.meta.errors[0] ?? ""),
                                })
                              : null,
                          ],
                        })
                      },
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
                      name: "defaultTarget",
                      children: (field) =>
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field$1, {
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
                              htmlFor: field.name,
                              children: "默认客户端",
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
                              items: TARGET_OPTIONS,
                              value: field.state.value,
                              onValueChange: (value) => field.handleChange(value),
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
                                  id: field.name,
                                  className: "w-full",
                                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                    SelectValue,
                                    {},
                                  ),
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
                                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                    SelectGroup,
                                    {
                                      children: TARGET_OPTIONS.map((item) =>
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                          SelectItem,
                                          {
                                            value: item.value,
                                            children: item.label,
                                          },
                                          item.value,
                                        ),
                                      ),
                                    },
                                  ),
                                }),
                              ],
                            }),
                          ],
                        }),
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
                      name: "folder",
                      children: (field) =>
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field$1, {
                          className: "md:col-span-2",
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
                              htmlFor: field.name,
                              children: "分组",
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                              id: field.name,
                              name: field.name,
                              maxLength: 100,
                              value: field.state.value,
                              onBlur: field.handleBlur,
                              onChange: (event) => field.handleChange(event.target.value),
                              placeholder: "可选，例如“机场 A”",
                            }),
                          ],
                        }),
                    }),
                  ],
                }),
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
                id: "02",
                title: "订阅来源",
                invalid: isBroken("02"),
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionBody, {
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
                    name: "sourceType",
                    children: (field) =>
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field$1, {
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldTitle, {
                            children: "来源类型",
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                            className:
                              "flex flex-wrap items-center justify-between gap-x-4 gap-y-2",
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonGroup, {
                                children: ["raw", "pool", "remote"].map((option) => {
                                  const Icon = SOURCE_TYPE_ICONS[option]
                                  const active = field.state.value === option
                                  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                                    Button,
                                    {
                                      "type": "button",
                                      "size": "sm",
                                      "variant": active ? "default" : "outline",
                                      "aria-pressed": active,
                                      "onClick": () => {
                                        if (active) return
                                        field.handleChange(option)
                                        form.setFieldValue("sourceValue", "")
                                      },
                                      "children": [
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
                                          "data-icon": "inline-start",
                                        }),
                                        SOURCE_TYPE_LABELS[option],
                                      ],
                                    },
                                    option,
                                  )
                                }),
                              }),
                              sourceError
                                ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldError, {
                                    className: "inline-flex items-center gap-1.5 text-[12.5px]",
                                    children: [
                                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconAlertCircle, {
                                        className: "size-3 shrink-0",
                                      }),
                                      sourceError,
                                    ],
                                  })
                                : null,
                            ],
                          }),
                        ],
                      }),
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
                    name: "sourceValue",
                    validators: {
                      onChange: ({ value }) => validateSource(value, current.sourceType),
                    },
                    children: (field) =>
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field$1, {
                        "data-invalid": Boolean(sourceError),
                        "children": [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
                            "id": field.name,
                            "name": field.name,
                            "aria-label":
                              current.sourceType === "remote"
                                ? "远程链接"
                                : current.sourceType === "pool"
                                  ? "持久化节点数据"
                                  : "订阅原文",
                            "className": cn(
                              "max-h-80 font-mono text-xs",
                              current.sourceType === "remote" ? "min-h-24" : "min-h-44",
                            ),
                            "placeholder":
                              current.sourceType === "remote"
                                ? "多个链接需要换行或者使用 | 分隔"
                                : void 0,
                            "value": field.state.value,
                            "onBlur": field.handleBlur,
                            "onChange": (event) => field.handleChange(event.target.value),
                            "aria-invalid": Boolean(sourceError),
                            "readOnly": current.sourceType === "pool",
                            "spellCheck": false,
                          }),
                          current.sourceType === "remote"
                            ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RemoteUrlCount, {
                                value: field.state.value,
                              })
                            : null,
                        ],
                      }),
                  }),
                ],
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
                id: "03",
                title: "规则链",
                invalid: isBroken("03"),
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionBody, {
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
                  name: "processors",
                  children: (field) =>
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field$1, {
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RuleChainForm, {
                          value: chain.rules,
                          onChange: (rules) => {
                            const next = {
                              ...chain,
                              rules,
                            }
                            setChain(next)
                            field.handleChange(mergeRuleChain(next))
                          },
                        }),
                        chain.preserved.length > 0
                          ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldDescription, {
                              children: [
                                "另有 ",
                                chain.preserved.length,
                                " 条这个表单没有对应行的规则：",
                                chain.preserved
                                  .map(({ processor }) => describeProcessor(processor))
                                  .join("、"),
                                "。保存时按原位置原样保留。",
                              ],
                            })
                          : null,
                      ],
                    }),
                }),
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
                name: "enabled",
                children: (field) =>
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field$1, {
                    orientation: "horizontal",
                    className: "px-4 py-4 md:px-8 md:py-5",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldContent, {
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldTitle, {
                            children: "启用订阅",
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldDescription, {
                            children: "停用后订阅地址返回 410。",
                          }),
                        ],
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
                        "aria-label": "启用订阅",
                        "checked": field.state.value,
                        "onCheckedChange": field.handleChange,
                      }),
                    ],
                  }),
              }),
            ],
          })
        },
      }),
    }),
  })
}
//#endregion
//#region src/features/subscriptions/labels.ts
/** One-liner for a resolved source; a lone remote link is short enough to show in full. */
function describeSource(source) {
  const label = SOURCE_TYPE_LABELS[source.type]
  if (source.type === "raw") return `${label} · ${source.content.length} 个字符`
  if (source.type === "pool")
    try {
      const count = JSON.parse(source.content).proxies
      return `${label} · ${Array.isArray(count) ? count.length : 0} 个节点`
    } catch {
      return `${label} · 节点数据异常`
    }
  if (source.type === "collection") return `${label} · ${source.memberIds.length} 个成员`
  return source.urls.length === 1
    ? `${label} · ${source.urls[0]}`
    : `${label} · ${source.urls.length} 个链接`
}
const RELATIVE_TIME = new Intl.RelativeTimeFormat("zh-CN", { numeric: "auto" })
function formatRelativeTime(value) {
  const stamp = Date.parse(value)
  if (Number.isNaN(stamp)) return "—"
  const seconds = Math.round((stamp - Date.now()) / 1e3)
  const magnitude = Math.abs(seconds)
  if (magnitude < 60) return RELATIVE_TIME.format(seconds, "second")
  if (magnitude < 3600) return RELATIVE_TIME.format(Math.round(seconds / 60), "minute")
  if (magnitude < 86400) return RELATIVE_TIME.format(Math.round(seconds / 3600), "hour")
  if (magnitude < 2592e3) return RELATIVE_TIME.format(Math.round(seconds / 86400), "day")
  if (magnitude < 31536e3) return RELATIVE_TIME.format(Math.round(seconds / 2592e3), "month")
  return RELATIVE_TIME.format(Math.round(seconds / 31536e3), "year")
}
/** A failed compile outranks the last success: the delivered snapshot is stale either way. */
function describeLastCompile(subscription) {
  if (subscription.lastError)
    return {
      failed: true,
      text: "编译失败",
    }
  if (subscription.lastSuccessAt)
    return {
      failed: false,
      text: formatRelativeTime(subscription.lastSuccessAt),
    }
  return {
    failed: false,
    text: "尚未编译",
  }
}
const SUBSCRIPTION_STATES = {
  failed: {
    text: "最近失败",
    tone: "text-destructive",
  },
  enabled: {
    text: "已启用",
    tone: "text-success",
  },
  disabled: {
    text: "已停用",
    tone: "text-muted-foreground",
  },
}
const SUBSCRIPTION_STATE_LABELS = Object.entries(SUBSCRIPTION_STATES).map(([value, state]) => ({
  label: state.text,
  value,
}))
/**
 * The one classification behind the row label, the status filter and the metric. A failed compile
 * outranks enabled/disabled because that is what the row already says the subscription is: a filter
 * or a count that disagreed with the visible label would describe a different set than the one on
 * screen.
 */
function subscriptionState(subscription) {
  if (subscription.lastError) return "failed"
  return subscription.enabled ? "enabled" : "disabled"
}
function describeSubscriptionState(subscription) {
  return SUBSCRIPTION_STATES[subscriptionState(subscription)]
}
//#endregion
//#region src/features/subscriptions/subscription-row.tsx
const META = "text-[10px] font-semibold tracking-[0.14em] uppercase"
const LABEL = "text-[10px] font-semibold tracking-[0.14em] text-muted-foreground uppercase"
/** Wraps the controls inside a clickable row so operating them never opens the detail dialog. */
function RowControls({ children, className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    className,
    onClick: (event) => event.stopPropagation(),
    onKeyDown: (event) => event.stopPropagation(),
    role: "presentation",
    children,
  })
}
function StateLabel({ className, dot, subscription }) {
  const state = describeSubscriptionState(subscription)
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
    className: cn("inline-flex items-center gap-1.5", state.tone, className),
    children: [
      dot
        ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
            "aria-hidden": true,
            "className": "size-1.5 shrink-0 bg-current",
          })
        : null,
      state.text,
    ],
  })
}
function EnabledSwitch({ actions, subscription }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
    "aria-label": `${subscription.name} 启用状态`,
    "checked": subscription.enabled,
    "onCheckedChange": (checked) => actions.onToggleEnabled(subscription, checked),
  })
}
/**
 * `compact` is the touch layout, where every target is 44px rather than an icon button. Reordering
 * is pointer-only for now: the touch cards stay at four targets, and the move buttons join the
 * pointer cluster instead.
 */
function RowActions({ actions, compact, moveDisabled, subscription }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RowControls, {
    className: "flex justify-end gap-1.5",
    children: [
      !compact
        ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                "variant": "outline",
                "size": "icon-xs",
                "aria-label": "上移",
                "disabled": moveDisabled,
                "onClick": () => actions.onMove(subscription, "up"),
                "children": /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconChevronUp, {}),
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                "variant": "outline",
                "size": "icon-xs",
                "aria-label": "下移",
                "disabled": moveDisabled,
                "onClick": () => actions.onMove(subscription, "down"),
                "children": /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconChevronDown, {}),
              }),
            ],
          })
        : null,
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
        "variant": "outline",
        "size": "icon-xs",
        "aria-label": "复制订阅链接",
        "className": compact ? "size-10" : void 0,
        "onClick": () => actions.onCopyLink(subscription),
        "children": /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconLink, {}),
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
        "variant": "outline",
        "size": "icon-xs",
        "aria-label": "编辑",
        "className": compact ? "size-10" : void 0,
        "onClick": () => actions.onEdit(subscription),
        "children": /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconEdit, {}),
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
        "variant": "outline",
        "size": "icon-xs",
        "aria-label": "轮换 token",
        "className": compact ? "size-10" : void 0,
        "onClick": () => actions.onRotate(subscription),
        "children": /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconKey, {}),
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
        "variant": "destructive",
        "size": "icon-xs",
        "aria-label": "删除",
        "className": compact ? "size-10" : void 0,
        "onClick": () => actions.onRemove(subscription),
        "children": /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconTrash, {}),
      }),
    ],
  })
}
//#endregion
//#region src/features/subscriptions/subscription-name.tsx
/**
 * The list's name cell, shared by the pointer table and the touch cards: the name stays a
 * navigation target, and a pencil beside it swaps the name for an input.
 *
 * Enter or blur commits through `onRename`; Escape cancels. A rejected `onRename` keeps the input
 * open so the operator can retry — the mutation's own toast reports the failure. Blank names are
 * refused here rather than sent: the server would only reject them, and the field stays focused.
 */
function EditableName({ className, name, nameClassName, onOpen, onRename, subtitle }) {
  const [editing, setEditing] = (0, import_react.useState)(false)
  const [value, setValue] = (0, import_react.useState)(name)
  const [pending, setPending] = (0, import_react.useState)(false)
  function begin() {
    setValue(name)
    setEditing(true)
  }
  function cancel() {
    setEditing(false)
  }
  async function commit() {
    if (pending) return
    const next = value.trim()
    if (!next) return
    if (next === name) {
      setEditing(false)
      return
    }
    setPending(true)
    try {
      await onRename(next)
      setEditing(false)
    } catch {
    } finally {
      setPending(false)
    }
  }
  return editing
    ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowControls, {
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
          "aria-label": "重命名订阅",
          "autoFocus": true,
          "disabled": pending,
          "maxLength": 100,
          "onBlur": () => void commit(),
          "onFocus": (event) => event.target.select(),
          "onKeyDown": (event) => {
            if (event.key === "Enter") commit()
            else if (event.key === "Escape") cancel()
          },
          value,
          "onChange": (event) => setValue(event.target.value),
          "className": "h-7 text-sm font-medium",
        }),
      })
    : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        className: cn("flex min-w-0 items-start gap-1", className),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
            type: "button",
            onClick: onOpen,
            className: "flex min-w-0 flex-col gap-0.5 text-left",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                className: cn("truncate", nameClassName),
                children: name,
              }),
              subtitle,
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowControls, {
            className: "flex-none",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
              "variant": "ghost",
              "size": "icon-xs",
              "aria-label": "重命名",
              "onClick": begin,
              "children": /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconPencil, {}),
            }),
          }),
        ],
      })
}
//#endregion
//#region src/features/subscriptions/subscription-cards.tsx
/** The touch layout: the same subscription as a card, with 44px targets, below md. */
function SubscriptionCards({ actions, subscriptions }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    className: "flex flex-col md:hidden",
    children: subscriptions.map((subscription) => {
      const compile = describeLastCompile(subscription)
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "div",
        {
          "data-failed": Boolean(subscription.lastError),
          "className": "flex flex-col gap-3 border-b px-4 py-4 data-[failed=true]:bg-destructive/5",
          "children": [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              className: "flex items-start justify-between gap-3",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableName, {
                  className: "min-w-0 flex-1",
                  name: subscription.name,
                  nameClassName: "text-[15px] leading-tight font-semibold",
                  onOpen: () => actions.onSelect(subscription),
                  onRename: (name) => actions.onRename(subscription, name),
                  subtitle: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateLabel, {
                    className: "text-[11px] font-semibold tracking-[0.1em] uppercase",
                    dot: true,
                    subscription,
                  }),
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnabledSwitch, {
                  actions,
                  subscription,
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              className: "grid grid-cols-2 gap-x-4 gap-y-2.5 border-t pt-3",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "flex flex-col gap-0.75",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                      className: LABEL,
                      children: "来源",
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                      className: "text-xs font-medium",
                      children: SOURCE_TYPE_LABELS[subscription.sourceType],
                    }),
                    subscription.folder
                      ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                          className: "text-xs text-muted-foreground",
                          children: subscription.folder,
                        })
                      : null,
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "flex flex-col gap-0.75",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                      className: LABEL,
                      children: "客户端",
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                      className: "text-xs font-medium",
                      children: targetLabel(subscription.defaultTarget),
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "flex flex-col gap-0.75",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                      className: LABEL,
                      children: "节点",
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                      className: "text-xs font-medium",
                      children: subscription.nodeCount ?? "—",
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "flex flex-col gap-0.75",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                      className: LABEL,
                      children: "最近编译",
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                      className: cn(
                        "text-xs font-medium",
                        compile.failed ? "text-destructive" : void 0,
                      ),
                      children: compile.text,
                    }),
                  ],
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              className: "flex items-center gap-2 border-t pt-3",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
                  className: "min-w-0 flex-1 font-mono text-xs text-muted-foreground",
                  children: ["token …", subscription.tokenHint],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowActions, {
                  actions,
                  compact: true,
                  subscription,
                }),
              ],
            }),
          ],
        },
        subscription.id,
      )
    }),
  })
}
//#endregion
//#region src/features/subscriptions/inspect-snapshot.ts
/**
 * The node list a delivered document describes. The artifact stores the rendered client document,
 * not a list, so previewing it means parsing one back out — which is the one thing this application
 * is for.
 *
 * A throw is an answer here rather than a failure to be propagated: it means this snapshot cannot be
 * read back at all, which the preview reports. Shared with the worker that runs this off the main
 * thread, so both paths describe a document the same way.
 */
function inspectSnapshot(content) {
  try {
    return {
      error: "",
      nodes: inspectNodeList(content).nodes,
    }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "解析失败",
      nodes: [],
    }
  }
}
//#endregion
//#region src/features/subscriptions/subscription-detail-dialog.tsx
/** Kept out of the hook so the same worker module is never described two ways. */
function createInspectWorker() {
  return new Worker(new URL("./inspect-snapshot.worker.ts", import.meta.url), { type: "module" })
}
function Stat({ label, tone, value }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    className: "flex flex-col gap-1.5 p-3.5 not-last:border-r md:px-4",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
        className: LABEL,
        children: label,
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
        className: cn("text-[15px] font-semibold -tracking-[0.01em]", tone),
        children: value,
      }),
    ],
  })
}
function NumberedLine({ children, index }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
    className: "flex items-center gap-2.5",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
        "aria-hidden": true,
        "className":
          "inline-flex size-4.5 shrink-0 items-center justify-center bg-muted text-[10px] font-semibold",
        "children": index,
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
        className: "text-[12.5px] leading-snug",
        children,
      }),
    ],
  })
}
/**
 * The nodes in the document this subscription last handed a subscriber — read out of storage, never
 * recompiled. That is the whole point of previewing here rather than in the workbench: the count in
 * the stat above comes from this same artifact, so the two cannot disagree about what went out.
 *
 * Two steps, and neither runs on the main thread's critical path: read the stored document, then
 * parse a node list back out of it in a worker. The parse is the expensive half for a large document
 * — off the main thread it leaves the trigger's spinner actually spinning, which an effect on this
 * thread could not do: it would paint the spinner and then freeze it.
 *
 * Nothing happens until `wanted`. Afterwards the query keeps its cache and this keeps its state, so
 * collapsing and expanding again costs neither a request nor a reparse.
 */
function useNodePreview(subscription, wanted) {
  const { failure, loaded, snapshot } = useSubscriptionSnapshot(
    subscription.id,
    subscription.defaultTarget,
    wanted,
  )
  const { data: answer, error: workerError, isSupported, post } = useWebWorker(createInspectWorker)
  const [parsed, setParsed] = (0, import_react.useState)(null)
  const posted = (0, import_react.useRef)(null)
  const nextId = (0, import_react.useRef)(0)
  const onThisThread = (0, import_react.useMemo)(
    () => (isSupported || !snapshot ? null : inspectSnapshot(snapshot.content)),
    [isSupported, snapshot],
  )
  ;(0, import_react.useEffect)(() => {
    if (!snapshot || !isSupported) return
    nextId.current += 1
    posted.current = {
      from: snapshot,
      id: nextId.current,
    }
    post({
      content: snapshot.content,
      id: nextId.current,
    })
  }, [isSupported, post, snapshot])
  ;(0, import_react.useEffect)(() => {
    const request = posted.current
    if (!answer || !request || answer.id !== request.id) return
    setParsed({
      from: request.from,
      result: {
        error: answer.error,
        nodes: answer.nodes,
      },
    })
  }, [answer])
  if (failure)
    return {
      status: "failed",
      message: failure.message,
    }
  if (workerError)
    return {
      status: "failed",
      message: workerError,
    }
  if (!loaded) return { status: "loading" }
  if (!snapshot) return { status: "empty" }
  const preview = onThisThread
    ? {
        from: snapshot,
        result: onThisThread,
      }
    : parsed
  if (preview?.from !== snapshot) return { status: "loading" }
  if (preview.result.error)
    return {
      status: "failed",
      message: `快照无法解析：${preview.result.error}`,
    }
  return {
    nodes: preview.result.nodes,
    recorded: snapshot.nodeCount,
    status: "ready",
    version: snapshot.subscriptionVersion,
  }
}
/**
 * Never rendered while the preview is still loading — the surface stays shut until then, so there is
 * no in-place spinner to write copy for.
 *
 * A parse that finds a different number than the artifact recorded is reported rather than smoothed
 * over: it would mean this client's format cannot round-trip, and hiding that would make the table
 * quietly wrong.
 */
function NodePreviewBody({ definitionVersion, preview }) {
  if (preview.status === "loading") return null
  if (preview.status === "failed")
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewNote, { children: preview.message })
  if (preview.status === "empty")
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewNote, {
      children: "还没有编译过快照，下一次有人拉取这条订阅时才会生成。",
    })
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    className: "flex flex-col gap-2.5",
    children: [
      preview.version === definitionVersion
        ? null
        : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PreviewNote, {
            children: [
              "这份快照编译自 v",
              preview.version,
              "，当前定义已经是 v",
              definitionVersion,
              "——下一次拉取会重新编译。",
            ],
          }),
      preview.nodes.length === preview.recorded
        ? null
        : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PreviewNote, {
            children: [
              "快照记录了 ",
              preview.recorded,
              " 个节点，但从它的正文里只解析回",
              preview.nodes.length,
              " 个：这个客户端的格式无法完整往回解析。",
            ],
          }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NodeTable, { nodes: preview.nodes }),
    ],
  })
}
function PreviewNote({ children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
    className: "text-[12.5px] leading-relaxed text-muted-foreground",
    children,
  })
}
/**
 * Opened by clicking a row in the subscription table. Stays a centred dialog at every width — the
 * content is a read-only summary, so there is nothing here that a Drawer's reachability would buy.
 */
function SubscriptionDetailDialog({
  detail,
  actions,
  onOpenChange,
  onOpenChangeComplete,
  open,
  subscription,
}) {
  const processors = detail?.processors ?? []
  const compile = describeLastCompile(subscription)
  const [previewWanted, setPreviewWanted] = (0, import_react.useState)(false)
  const [appendOpen, setAppendOpen] = (0, import_react.useState)(false)
  const [appendContent, setAppendContent] = (0, import_react.useState)("")
  const [legacyLink, setLegacyLink] = (0, import_react.useState)("")
  const append = useAppendSubscriptionNodes()
  const registerLink = useRegisterSubscriptionLink()
  const preview = useNodePreview(subscription, previewWanted)
  const poolSubscription = subscription.sourceType === "pool"
  const previewOpen = previewWanted && preview.status !== "loading"
  async function submitAppend() {
    if (!appendContent.trim() || append.isPending) return
    try {
      await append.mutateAsync({
        id: subscription.id,
        content: appendContent,
      })
      setAppendContent("")
      setAppendOpen(false)
    } catch {}
  }
  async function submitLegacyLink() {
    if (!legacyLink.trim() || registerLink.isPending) return
    try {
      await registerLink.mutateAsync({
        id: subscription.id,
        link: legacyLink,
      })
      setLegacyLink("")
    } catch {}
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
    open,
    onOpenChange,
    onOpenChangeComplete,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
      showCloseButton: false,
      className: "flex max-h-[92svh] flex-col gap-0 p-0 sm:max-w-2xl",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
          className:
            "flex-none flex-row items-start justify-between gap-4 border-b p-4 md:px-6 md:py-5",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              className: "flex min-w-0 flex-col gap-1.5",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
                  className: "md:text-xl",
                  children: subscription.name,
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
                  render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}),
                  className: cn("flex flex-wrap items-center gap-2.5 md:gap-3", LABEL),
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                      children: detail
                        ? describeSource(detail.source)
                        : `${SOURCE_TYPE_LABELS[subscription.sourceType]} · 读取中`,
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {
                      orientation: "vertical",
                      className: "h-2.75",
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateLabel, {
                      dot: true,
                      subscription,
                    }),
                  ],
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
              "render": /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                variant: "ghost",
                size: "icon-xs",
                className: "flex-none max-md:size-10",
              }),
              "aria-label": "关闭",
              "children": /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconX, {}),
            }),
          ],
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          className: "flex min-h-0 flex-1 flex-col overflow-y-auto",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              className: "grid grid-cols-2 border-b md:grid-cols-4",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
                  label: "节点数",
                  value: subscription.nodeCount?.toString() ?? "—",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
                  label: "客户端",
                  value: targetLabel(subscription.defaultTarget),
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
                  label: "最近编译",
                  value: compile.text,
                  tone: compile.failed ? "text-destructive" : void 0,
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
                  label: "快照版本",
                  value: `v${subscription.version}`,
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Collapsible, {
              className: "border-b",
              open: previewOpen,
              onOpenChange: setPreviewWanted,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CollapsibleTrigger, {
                  render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
                    type: "button",
                    className: "flex h-11 w-full items-center gap-2.5 px-4 text-left md:px-6",
                  }),
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconListDetails, {
                      className: "size-3.5 shrink-0 text-muted-foreground",
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                      className: LABEL,
                      children: "预览节点",
                    }),
                    previewWanted && !previewOpen
                      ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconLoader2, {
                          className: "ml-auto size-3.5 shrink-0 animate-spin text-muted-foreground",
                        })
                      : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconChevronRight, {
                          className: cn(
                            "ml-auto size-3.5 shrink-0 text-muted-foreground transition-transform duration-150 ease-out",
                            previewOpen && "rotate-90",
                          ),
                        }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleContent, {
                  className: "px-4 pb-4 md:px-6",
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NodePreviewBody, {
                    definitionVersion: subscription.version,
                    preview,
                  }),
                }),
              ],
            }),
            subscription.lastError
              ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "flex flex-col gap-1 border-b bg-destructive/5 p-4 md:px-6",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                      className: cn(LABEL, "text-destructive"),
                      children: "最近错误",
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                      className: "text-[12.5px] leading-relaxed text-destructive",
                      children: subscription.lastError,
                    }),
                  ],
                })
              : null,
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              className: "flex flex-col gap-2.5 p-4 md:px-6 md:py-4.5",
              children: [
                poolSubscription && appendOpen
                  ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                      className: "flex flex-col gap-2.5 border-b bg-sidebar p-4 md:px-6 md:py-4.5",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                          className: LABEL,
                          children: "追加节点",
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
                          "aria-label": "追加节点",
                          "value": appendContent,
                          "onChange": (event) => setAppendContent(event.target.value),
                          "placeholder": "粘贴单节点、节点列表或配置内容",
                          "className": "min-h-32 font-mono text-xs",
                          "spellCheck": false,
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                          className: "flex justify-end gap-2",
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                              variant: "outline",
                              size: "sm",
                              onClick: () => setAppendOpen(false),
                              children: "取消",
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                              size: "sm",
                              disabled: !appendContent.trim() || append.isPending,
                              onClick: () => void submitAppend(),
                              children: append.isPending ? "保存中" : "追加到订阅",
                            }),
                          ],
                        }),
                      ],
                    })
                  : null,
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "flex flex-col gap-2 border-b bg-sidebar p-3.5 md:p-4",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                      className: LABEL,
                      children: "登记或修复订阅链接",
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                      className: "text-xs leading-relaxed text-muted-foreground",
                      children:
                        "可粘贴已有完整链接。适用于升级前订阅，或更换 CUTTLE_LINK_KEY 后重新加密保存 token。",
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                      className: "flex gap-2",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                          "aria-label": "现有订阅链接",
                          "value": legacyLink,
                          "onChange": (event) => setLegacyLink(event.target.value),
                          "placeholder": "https://example.com/subscribe/...",
                          "className": "min-w-0 font-mono text-xs",
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
                          size: "sm",
                          disabled: !legacyLink.trim() || registerLink.isPending,
                          onClick: () => void submitLegacyLink(),
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconLink, {
                              "data-icon": "inline-start",
                            }),
                            registerLink.isPending ? "保存中" : "保存链接",
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
                  className: LABEL,
                  children: ["规则链 · ", processors.length, " 条"],
                }),
                detail === null
                  ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                      className: "text-[12.5px] text-muted-foreground",
                      children: "读取中",
                    })
                  : processors.length === 0
                    ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                        className: "text-[12.5px] text-muted-foreground",
                        children: "未配置规则",
                      })
                    : processors.map((processor, index) =>
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                          NumberedLine,
                          {
                            index: index + 1,
                            children: describeProcessor(processor),
                          },
                          index,
                        ),
                      ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
                  className: "mt-1 border-t pt-2.5 text-xs leading-relaxed text-muted-foreground",
                  children: [
                    "同版本快照 ",
                    DEFAULT_FRESH_ARTIFACT_MS / 1e3,
                    " 秒内直接复用，配置改动会立即失效。",
                  ],
                }),
              ],
            }),
          ],
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
          className: "flex-none flex-row gap-2 border-t p-3 md:px-6 md:py-3.5",
          children: [
            poolSubscription
              ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
                  variant: "outline",
                  size: "lg",
                  className: "flex-1 md:h-10 md:flex-none",
                  onClick: () => setAppendOpen((isOpen) => !isOpen),
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconPlus, {
                      "data-icon": "inline-start",
                    }),
                    "追加节点",
                  ],
                })
              : null,
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
              variant: "outline",
              size: "lg",
              className: "flex-1 md:h-10 md:flex-none",
              onClick: () => actions.onRotate(subscription),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconKey, {
                  "data-icon": "inline-start",
                }),
                "轮换",
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
              variant: "destructive",
              size: "lg",
              className: "flex-1 md:h-10 md:flex-none",
              onClick: () => actions.onRemove(subscription),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconTrash, {
                  "data-icon": "inline-start",
                }),
                "删除",
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
              size: "lg",
              className: "flex-[1.4] md:h-10 md:flex-none",
              onClick: () => actions.onEdit(subscription),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconEdit, {
                  "data-icon": "inline-start",
                }),
                "编辑订阅",
              ],
            }),
          ],
        }),
      ],
    }),
  })
}
//#endregion
//#region src/features/subscriptions/subscription-metrics.tsx
function SubscriptionMetrics({ subscriptions }) {
  const enabled = subscriptions.filter((item) => subscriptionState(item) === "enabled").length
  const failed = subscriptions.filter((item) => subscriptionState(item) === "failed").length
  const nodes = subscriptions.reduce((total, item) => total + (item.nodeCount ?? 0), 0)
  const metrics = [
    {
      label: "订阅总数",
      note: "全部持久化",
      value: subscriptions.length,
    },
    {
      label: "已启用",
      note: "对外可取",
      value: enabled,
    },
    {
      label: "最近失败",
      note: "需要处理",
      value: failed,
      alert: failed > 0,
    },
    {
      label: "节点总数",
      note: "最新快照",
      value: nodes,
    },
  ]
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    className: "grid flex-none grid-cols-2 border-b bg-sidebar md:grid-cols-4",
    children: metrics.map((metric) =>
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "div",
        {
          className:
            "flex flex-col gap-1 border-border px-4 py-3.5 not-last:border-r max-md:nth-[-n+2]:border-b md:gap-1.5 md:px-5 md:py-4",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
              className: LABEL,
              children: metric.label,
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
              className: "flex items-baseline gap-2",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                  className: cn(
                    "text-[22px] leading-none font-semibold -tracking-[0.01em] lg:text-[28px] lg:-tracking-[0.02em]",
                    metric.alert ? "text-destructive" : "text-foreground",
                  ),
                  children: metric.value,
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                  className: "hidden text-xs text-muted-foreground lg:inline",
                  children: metric.note,
                }),
              ],
            }),
          ],
        },
        metric.label,
      ),
    ),
  })
}
//#endregion
//#region src/features/subscriptions/subscription-table.tsx
/** The pointer layout: one scannable row per subscription, from md up. */
function SubscriptionTable({ actions, moveDisabled, subscriptions }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    className: "hidden md:block",
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "名称" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
                className: "hidden lg:table-cell",
                children: "来源",
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
                className: "hidden lg:table-cell",
                children: "客户端",
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
                className: "lg:hidden",
                children: "来源 / 客户端",
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
                className: "text-right",
                children: "节点",
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
                className: "hidden lg:table-cell",
                children: "最近编译",
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "状态" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
                className: "text-right",
                children: "操作",
              }),
            ],
          }),
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
          children: subscriptions.map((subscription) => {
            const compile = describeLastCompile(subscription)
            return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              TableRow,
              {
                "data-failed": Boolean(subscription.lastError),
                "className": "cursor-pointer data-[failed=true]:bg-destructive/5",
                "onClick": () => actions.onSelect(subscription),
                "children": [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableName, {
                      name: subscription.name,
                      onOpen: () => actions.onSelect(subscription),
                      onRename: (name) => actions.onRename(subscription, name),
                      subtitle: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
                        className: "font-mono text-xs text-muted-foreground",
                        children: ["token …", subscription.tokenHint],
                      }),
                    }),
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                    className: "hidden lg:table-cell",
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
                      className: "flex flex-col gap-0.5",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                          className: META,
                          children: SOURCE_TYPE_LABELS[subscription.sourceType],
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
                          className: "text-xs text-muted-foreground",
                          children: [subscription.processorCount, " 条规则"],
                        }),
                        subscription.folder
                          ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                              className: "text-xs text-muted-foreground",
                              children: subscription.folder,
                            })
                          : null,
                      ],
                    }),
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                    className: cn(META, "hidden text-muted-foreground lg:table-cell"),
                    children: targetLabel(subscription.defaultTarget),
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
                    className: cn(META, "lg:hidden"),
                    children: [
                      SOURCE_TYPE_LABELS[subscription.sourceType],
                      " ·",
                      " ",
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                        className: "text-muted-foreground",
                        children: targetLabel(subscription.defaultTarget),
                      }),
                    ],
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                    className: "text-right text-sm font-semibold tabular-nums",
                    children: subscription.nodeCount ?? "—",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                    className: cn(
                      "hidden text-xs lg:table-cell",
                      compile.failed ? "text-destructive" : "text-muted-foreground",
                    ),
                    children: compile.text,
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RowControls, {
                      className: "flex items-center gap-2.5",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnabledSwitch, {
                          actions,
                          subscription,
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateLabel, {
                          className: "text-xs",
                          subscription,
                        }),
                      ],
                    }),
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowActions, {
                      actions,
                      compact: false,
                      moveDisabled,
                      subscription,
                    }),
                  }),
                ],
              },
              subscription.id,
            )
          }),
        }),
      ],
    }),
  })
}
//#endregion
//#region src/features/subscriptions/subscription-toolbar.tsx
const STATUS_OPTIONS = [
  {
    label: "全部状态",
    value: "all",
  },
  ...SUBSCRIPTION_STATE_LABELS,
]
/**
 * The search box, status filter and the two create actions. Sits beside the page's own title inside
 * the toolbar row; the search is what the list narrows by (name and folder), the status select the
 * existing state filter.
 */
function SubscriptionToolbar({
  onCreate,
  onCreateCollection,
  onQueryChange,
  onStatusChange,
  query,
  status,
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    className: "flex min-w-0 flex-1 items-center justify-end gap-2.5 md:gap-3",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        className: "relative min-w-0 flex-1 md:flex-none md:w-44",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconSearch, {
            className:
              "pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground",
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
            "aria-label": "搜索订阅名称或分组",
            "value": query,
            "onChange": (event) => onQueryChange(event.target.value),
            "placeholder": "搜索名称 / 分组",
            "className": "h-8 pl-8",
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
        items: STATUS_OPTIONS,
        value: status,
        onValueChange: (value) => onStatusChange(value ?? "all"),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
            "aria-label": "按状态过滤",
            "className": cn(
              "border-border px-2.5 text-[12.5px] max-md:h-11!",
              "hidden lg:flex lg:w-[7.5rem]",
            ),
            "children": /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}),
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup, {
              children: STATUS_OPTIONS.map((option) =>
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
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
        variant: "outline",
        onClick: onCreateCollection,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconFolder, { "data-icon": "inline-start" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
            className: "md:hidden",
            children: "集合",
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
            className: "max-md:hidden",
            children: "新建集合",
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
        onClick: onCreate,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconPlus, { "data-icon": "inline-start" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
            className: "md:hidden",
            children: "新建",
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
            className: "max-md:hidden",
            children: "新建订阅",
          }),
        ],
      }),
    ],
  })
}
//#endregion
//#region src/features/subscriptions/use-subscription-actions.ts
/**
 * Owns everything about a subscription row's destructive and toggling actions: the pending
 * confirmation, the one-time credential banner a rotation mints, and enable/disable. Creating and
 * editing stay with the page, since those own the editor's open state and the URL it lives in —
 * this hook only ever answers for a row already on screen.
 */
function useSubscriptionActions(options) {
  const copyLink = useCopySubscriptionLink()
  const remove = useRemoveSubscription()
  const rotate = useRotateToken()
  const setEnabled = useSetSubscriptionEnabled()
  const [confirming, setConfirming] = (0, import_react.useState)(null)
  const [credentialUrl, setCredentialUrl] = (0, import_react.useState)("")
  /**
   * Both destructive actions route through the same confirmation, and close whatever asked for it
   * on the way — the caller's detail dialog, most likely — so the prompt is never a child of a
   * surface that is about to unmount.
   */
  function request(action) {
    return (subscription) => {
      options?.onBeforeConfirm?.()
      setConfirming({
        action,
        id: subscription.id,
        name: subscription.name,
      })
    }
  }
  /**
   * Acts on the request the dialog hands back rather than on `confirming`. The dialog outlives the
   * state — it keeps the last request through its own exit animation — so taking the argument is what
   * makes "which subscription was confirmed" a single answer instead of two that have to agree.
   */
  function confirm(pending) {
    setConfirming(null)
    if (pending.action === "delete") {
      remove.mutate(pending.id)
      return
    }
    rotate.mutate(pending.id, {
      onSuccess: (result) => {
        if (result.url) setCredentialUrl(result.url)
      },
    })
  }
  function cancel() {
    setConfirming(null)
  }
  function dismissCredential() {
    setCredentialUrl("")
  }
  /** Lets the page show a newly created subscription's address in the same one-time banner. */
  function revealCredential(url) {
    setCredentialUrl(url)
  }
  function toggleEnabled(subscription, enabled) {
    setEnabled.mutate({
      enabled,
      subscription,
    })
  }
  function copySubscriptionLink(subscription) {
    copyLink.mutate(subscription.id)
  }
  return {
    cancel,
    confirm,
    confirming,
    copySubscriptionLink,
    credentialUrl,
    dismissCredential,
    requestDelete: request("delete"),
    requestRotate: request("rotate"),
    revealCredential,
    toggleEnabled,
  }
}
//#endregion
//#region src/features/subscriptions/subscription-manager.tsx
const TOOLBAR_ROW =
  "flex h-12 flex-none items-center justify-between gap-2.5 border-b px-4 md:gap-3 md:px-5"
const TOOLBAR_TITLE = "shrink-0 text-xs font-semibold tracking-widest uppercase"
const CREDENTIAL = "font-mono text-xs leading-relaxed wrap-anywhere"
function matchesStatus(subscription, status) {
  return status === "all" || subscriptionState(subscription) === status
}
function matchesQuery(subscription, query) {
  const needle = query.trim().toLowerCase()
  if (!needle) return true
  if (subscription.name.toLowerCase().includes(needle)) return true
  return subscription.folder?.toLowerCase().includes(needle) ?? false
}
async function copyToClipboard(value, message) {
  await navigator.clipboard.writeText(value)
  showSuccess(message)
}
const routeApi = getRouteApi("/subscriptions")
function ListNotice({ children, description, icon, title }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Empty, {
    className: "flex-1 border-b",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(EmptyHeader, {
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyMedia, {
            variant: "icon",
            children: icon,
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyTitle, { children: title }),
          description
            ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyDescription, {
                children: description,
              })
            : null,
        ],
      }),
      children ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyContent, { children }) : null,
    ],
  })
}
function SubscriptionManager() {
  const navigate = routeApi.useNavigate()
  const search = routeApi.useSearch()
  const { failure, items: subscriptions, loaded } = useSubscriptions()
  const subscriptionDraft = useRouterState({
    select: (routerState) => routerState.location.state.subscriptionDraft,
  })
  const [handoffDraft, setHandoffDraft] = (0, import_react.useState)(subscriptionDraft)
  const save = useSaveSubscription()
  const rename = useRenameSubscription()
  const reorder = useReorderSubscriptions()
  const activeId = search.mode === "create" ? null : (search.id ?? null)
  const record = useSubscription(activeId)
  const [query, setQuery] = (0, import_react.useState)("")
  const [status, setStatus] = (0, import_react.useState)("all")
  const [handoffMode, setHandoffMode] = (0, import_react.useState)(search.mode)
  if (handoffMode !== search.mode) {
    setHandoffMode(search.mode)
    if (search.mode !== "create") setHandoffDraft(void 0)
  }
  const draftScrubbed = (0, import_react.useRef)(false)
  ;(0, import_react.useEffect)(() => {
    if (!subscriptionDraft || draftScrubbed.current) return
    draftScrubbed.current = true
    const rest = { ...window.history.state }
    delete rest.subscriptionDraft
    window.history.replaceState(rest, "", window.location.href)
  }, [subscriptionDraft])
  const close = (0, import_react.useCallback)(() => {
    navigate({
      search: (prev) => ({
        ...prev,
        id: void 0,
        mode: void 0,
      }),
    })
  }, [navigate])
  ;(0, import_react.useEffect)(() => {
    if (loaded && activeId && !subscriptions.some((item) => item.id === activeId)) close()
  }, [activeId, close, loaded, subscriptions])
  const actions = useSubscriptionActions({ onBeforeConfirm: close })
  function edit(subscription) {
    navigate({
      search: (prev) => ({
        ...prev,
        id: subscription.id,
        mode: "edit",
      }),
    })
  }
  function openCreate() {
    navigate({ search: () => ({ mode: "create" }) })
  }
  function openCreateCollection() {
    navigate({ search: () => ({ mode: "createCollection" }) })
  }
  /** The move buttons send the full current order; the server only accepts full permutations. */
  function move(subscription, direction) {
    const index = subscriptions.findIndex((item) => item.id === subscription.id)
    const target = index + (direction === "up" ? -1 : 1)
    if (index === -1 || target < 0 || target >= subscriptions.length) return
    const next = [...subscriptions]
    const [moved] = next.splice(index, 1)
    next.splice(target, 0, moved)
    reorder.mutate(next.map((item) => item.id))
  }
  async function saveSubscription(draft, id) {
    try {
      const credential = await save.mutateAsync({
        draft,
        id,
      })
      if (credential) actions.revealCredential(credential.url)
      return true
    } catch {
      return false
    }
  }
  const rowActions = {
    onCopyLink: actions.copySubscriptionLink,
    onEdit: edit,
    onMove: move,
    onRemove: actions.requestDelete,
    onRename: async (subscription, name) => {
      await rename.mutateAsync({
        id: subscription.id,
        name,
      })
    },
    onRotate: actions.requestRotate,
    onSelect: (subscription) =>
      void navigate({
        search: (prev) => ({
          ...prev,
          id: subscription.id,
        }),
      }),
    onToggleEnabled: actions.toggleEnabled,
  }
  const editorSurface = useDeferredClose(search.mode === "edit" || search.mode === "create", close)
  const collectionValues =
    search.mode === "createCollection"
      ? emptyCollectionValues()
      : search.mode === "edit" && record?.source.type === "collection"
        ? {
            id: record.id,
            name: record.name,
            folder: record.folder ?? "",
            memberIds: record.source.memberIds,
            defaultTarget: record.defaultTarget,
            processors: record.processors ?? [],
            enabled: record.enabled,
          }
        : null
  const collectionSurface = useDeferredClose(Boolean(collectionValues), close)
  const editorValues =
    search.mode === "create"
      ? handoffDraft
        ? editorValuesFromHandoff(handoffDraft)
        : EMPTY_EDITOR_VALUES
      : search.mode === "edit" && record && record.source.type !== "collection"
        ? editorValuesFromRecord(record)
        : null
  const selected = !search.mode
    ? (subscriptions.find((item) => item.id === activeId) ?? null)
    : null
  const detailSurface = useDeferredClose(Boolean(selected), close)
  const visible = subscriptions.filter(
    (item) => matchesStatus(item, status) && matchesQuery(item, query),
  )
  const failures = subscriptions.filter((item) => item.lastError)
  function listBody() {
    if (failure)
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListNotice, {
        description: failure.message,
        icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconAlertTriangle, {}),
        title: "读取订阅失败",
      })
    if (!loaded)
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListNotice, {
        icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconLoader2, {
          className: "animate-spin",
        }),
        title: "正在读取订阅",
      })
    if (subscriptions.length === 0)
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListNotice, {
        description: "从提取转换页面配好源与规则链后用“存为订阅”持久化，或者直接新建一条。",
        icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconDatabase, {}),
        title: "还没有持久化订阅",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          className: "flex flex-wrap justify-center gap-2",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
              onClick: openCreate,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconPlus, {
                  "data-icon": "inline-start",
                }),
                "新建订阅",
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
              to: "/",
              viewTransition: true,
              className: cn(buttonVariants({ variant: "outline" })),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconTransform, {
                  "data-icon": "inline-start",
                }),
                "去提取转换",
              ],
            }),
          ],
        }),
      })
    if (visible.length === 0)
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListNotice, {
        description: query.trim()
          ? "没有名称或分组匹配的订阅，换个搜索词试试。"
          : "把状态过滤调回“全部状态”就能看到全部订阅。",
        icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconFilter, {}),
        title: "没有匹配的订阅",
      })
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubscriptionTable, {
          actions: rowActions,
          moveDisabled: reorder.isPending,
          subscriptions: visible,
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubscriptionCards, {
          actions: rowActions,
          subscriptions: visible,
        }),
      ],
    })
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    className: "flex flex-1 flex-col",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        className: TOOLBAR_ROW,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
            className: TOOLBAR_TITLE,
            children: "全部订阅",
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubscriptionToolbar, {
            onCreate: openCreate,
            onCreateCollection: openCreateCollection,
            onQueryChange: setQuery,
            onStatusChange: setStatus,
            query,
            status,
          }),
        ],
      }),
      subscriptions.length > 0
        ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubscriptionMetrics, { subscriptions })
        : null,
      actions.credentialUrl
        ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className:
              "flex flex-none flex-col gap-2 border-b bg-sidebar px-4 py-3.5 md:flex-row md:items-center md:justify-between md:px-5",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                className: "flex min-w-0 flex-col gap-1",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                    className: LABEL,
                    children: "新的订阅地址只展示一次",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
                    className: CREDENTIAL,
                    children: actions.credentialUrl,
                  }),
                ],
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                className: "flex shrink-0 gap-2",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
                    variant: "outline",
                    size: "xs",
                    onClick: () => void copyToClipboard(actions.credentialUrl, "订阅地址已复制"),
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconClipboard, {
                        "data-icon": "inline-start",
                      }),
                      "复制地址",
                    ],
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                    variant: "ghost",
                    size: "xs",
                    onClick: actions.dismissCredential,
                    children: "知道了",
                  }),
                ],
              }),
            ],
          })
        : null,
      listBody(),
      failures.length > 0
        ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className:
              "mt-auto flex flex-none items-center gap-2.5 border-t bg-sidebar px-4 py-3.5 md:px-5",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconAlertTriangle, {
                className: "size-3.5 shrink-0 text-destructive",
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
                className: "text-[12.5px] leading-relaxed text-destructive",
                children: [
                  failures[0].name,
                  " 最近一次编译失败：",
                  failures[0].lastError,
                  failures.length > 1 ? `（另有 ${failures.length - 1} 条同样失败）` : "",
                ],
              }),
            ],
          })
        : null,
      selected
        ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubscriptionDetailDialog, {
            actions: rowActions,
            detail: record,
            onOpenChange: detailSurface.onOpenChange,
            onOpenChangeComplete: detailSurface.onOpenChangeComplete,
            open: detailSurface.open,
            subscription: selected,
          })
        : null,
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
        request: actions.confirming,
        onOpenChange: (next) => {
          if (!next) actions.cancel()
        },
        onConfirm: actions.confirm,
      }),
      collectionValues
        ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            CollectionDialog,
            {
              onOpenChange: collectionSurface.onOpenChange,
              onOpenChangeComplete: collectionSurface.onOpenChangeComplete,
              onSave: saveSubscription,
              open: collectionSurface.open,
              pools: subscriptions.filter((item) => item.sourceType === "pool"),
              values: collectionValues,
            },
            `collection-${collectionValues.id ?? "new"}`,
          )
        : null,
      editorValues
        ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            SubscriptionEditor,
            {
              onOpenChange: editorSurface.onOpenChange,
              onOpenChangeComplete: editorSurface.onOpenChangeComplete,
              onSave: saveSubscription,
              open: editorSurface.open,
              values: editorValues,
            },
            search.id ?? "new",
          )
        : null,
    ],
  })
}
//#endregion
//#region src/routes/subscriptions.tsx?tsr-split=component
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
function SubscriptionsPage() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
    active: "subscriptions",
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectionGate, {
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubscriptionManager, {}),
    }),
  })
}
//#endregion
export { SubscriptionsPage as component, parseSubscriptionsSearch }
