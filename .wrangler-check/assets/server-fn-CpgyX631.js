import { t as adminFunctionMiddleware } from "./admin-function-D_xAk7Bk.js"
import { m as getRequest, t as createServerFn } from "./createServerFn-DRD1-jCn.js"
import { t as createServerRpc } from "./createServerRpc-D-yeXwOu.js"
import {
  a as listSubscriptions$1,
  c as removeSubscription$1,
  d as updateSubscription$1,
  i as getSubscriptionLink$1,
  l as reorderSubscriptions$1,
  n as createSubscription$1,
  o as readSubscriptionSnapshot$1,
  r as getSubscription$1,
  s as registerSubscriptionLink$1,
  t as appendSubscriptionNodes$1,
  u as rotateSubscriptionToken$1,
} from "./operations-BGD-JhgG.js"
//#region src/features/subscriptions/api/server-fn.ts?tss-serverfn-split
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
const listSubscriptions_createServerFn_handler = createServerRpc(
  {
    id: "89fd89bbad38db578c6cb2bf86e8b3305ee392359297cb8c98424c9c04551a04",
    name: "listSubscriptions",
    filename: "src/features/subscriptions/api/server-fn.ts",
  },
  (opts) => listSubscriptions.__executeServer(opts),
)
const listSubscriptions = createServerFn({ method: "POST" })
  .middleware([adminFunctionMiddleware])
  .handler(listSubscriptions_createServerFn_handler, () => listSubscriptions$1())
const reorderSubscriptions_createServerFn_handler = createServerRpc(
  {
    id: "aa15fce652c028452a0b598d161f382f9d376aaa0b9d2f41f95ee98a5f8fd18e",
    name: "reorderSubscriptions",
    filename: "src/features/subscriptions/api/server-fn.ts",
  },
  (opts) => reorderSubscriptions.__executeServer(opts),
)
const reorderSubscriptions = createServerFn({ method: "POST" })
  .middleware([adminFunctionMiddleware])
  .validator((input) => input)
  .handler(reorderSubscriptions_createServerFn_handler, ({ data }) => reorderSubscriptions$1(data))
const getSubscription_createServerFn_handler = createServerRpc(
  {
    id: "f62d263e50d86de549bebc46361ec3893eaedd47c827551346dcaf249ffb4cfe",
    name: "getSubscription",
    filename: "src/features/subscriptions/api/server-fn.ts",
  },
  (opts) => getSubscription.__executeServer(opts),
)
const getSubscription = createServerFn({ method: "POST" })
  .middleware([adminFunctionMiddleware])
  .validator((input) => input)
  .handler(getSubscription_createServerFn_handler, ({ data }) => getSubscription$1(data))
const getSubscriptionLink_createServerFn_handler = createServerRpc(
  {
    id: "bd995696fd52ca7994f7c0aec15c1ae829ed95a204ebbc0eaf0c2257f267f2ad",
    name: "getSubscriptionLink",
    filename: "src/features/subscriptions/api/server-fn.ts",
  },
  (opts) => getSubscriptionLink.__executeServer(opts),
)
const getSubscriptionLink = createServerFn({ method: "POST" })
  .middleware([adminFunctionMiddleware])
  .validator((input) => input)
  .handler(getSubscriptionLink_createServerFn_handler, ({ data }) =>
    getSubscriptionLink$1({
      id: data.id,
      origin: getRequest().url,
    }),
  )
const registerSubscriptionLink_createServerFn_handler = createServerRpc(
  {
    id: "58f0261279c365dd49e4b1273259e91f13f06b060bf838cfa65dc8fe81ef5dd1",
    name: "registerSubscriptionLink",
    filename: "src/features/subscriptions/api/server-fn.ts",
  },
  (opts) => registerSubscriptionLink.__executeServer(opts),
)
const registerSubscriptionLink = createServerFn({ method: "POST" })
  .middleware([adminFunctionMiddleware])
  .validator((input) => input)
  .handler(registerSubscriptionLink_createServerFn_handler, ({ data }) =>
    registerSubscriptionLink$1({
      ...data,
      origin: getRequest().url,
    }),
  )
const createSubscription_createServerFn_handler = createServerRpc(
  {
    id: "f4dbccdbcddea8abfadb634a92f41620fe942e5ebabcbc7b535267a094c3fdf0",
    name: "createSubscription",
    filename: "src/features/subscriptions/api/server-fn.ts",
  },
  (opts) => createSubscription.__executeServer(opts),
)
const createSubscription = createServerFn({ method: "POST" })
  .middleware([adminFunctionMiddleware])
  .validator((input) => input)
  .handler(createSubscription_createServerFn_handler, ({ data }) =>
    createSubscription$1({
      draft: data.draft,
      origin: getRequest().url,
    }),
  )
const appendSubscriptionNodes_createServerFn_handler = createServerRpc(
  {
    id: "e2b0ee9c340b1f9484a63ecb8509e9b5e7c55ae3cb81c459bcf538870e5bab0f",
    name: "appendSubscriptionNodes",
    filename: "src/features/subscriptions/api/server-fn.ts",
  },
  (opts) => appendSubscriptionNodes.__executeServer(opts),
)
const appendSubscriptionNodes = createServerFn({ method: "POST" })
  .middleware([adminFunctionMiddleware])
  .validator((input) => input)
  .handler(appendSubscriptionNodes_createServerFn_handler, ({ data }) =>
    appendSubscriptionNodes$1(data),
  )
const updateSubscription_createServerFn_handler = createServerRpc(
  {
    id: "eb218f3236c3e2f3ba75455f70aa5307da043613515eb670351254f1e17e5c07",
    name: "updateSubscription",
    filename: "src/features/subscriptions/api/server-fn.ts",
  },
  (opts) => updateSubscription.__executeServer(opts),
)
const updateSubscription = createServerFn({ method: "POST" })
  .middleware([adminFunctionMiddleware])
  .validator((input) => input)
  .handler(updateSubscription_createServerFn_handler, ({ data }) => updateSubscription$1(data))
const readSubscriptionSnapshot_createServerFn_handler = createServerRpc(
  {
    id: "45be2eb57a6db9a94ee93a4b772a37d509cfd2fbd33a1120319511f459719643",
    name: "readSubscriptionSnapshot",
    filename: "src/features/subscriptions/api/server-fn.ts",
  },
  (opts) => readSubscriptionSnapshot.__executeServer(opts),
)
const readSubscriptionSnapshot = createServerFn({ method: "POST" })
  .middleware([adminFunctionMiddleware])
  .validator((input) => input)
  .handler(readSubscriptionSnapshot_createServerFn_handler, ({ data }) =>
    readSubscriptionSnapshot$1(data),
  )
const removeSubscription_createServerFn_handler = createServerRpc(
  {
    id: "14d07b44b6810ae2698986cc6844093df35e2271f1e77793ed42413a98d518b0",
    name: "removeSubscription",
    filename: "src/features/subscriptions/api/server-fn.ts",
  },
  (opts) => removeSubscription.__executeServer(opts),
)
const removeSubscription = createServerFn({ method: "POST" })
  .middleware([adminFunctionMiddleware])
  .validator((input) => input)
  .handler(removeSubscription_createServerFn_handler, ({ data }) => removeSubscription$1(data))
const rotateSubscriptionToken_createServerFn_handler = createServerRpc(
  {
    id: "d57d823ede0b5b48ffd55a001c11e50ac8f1350dd48e483c12be43eb21bc9464",
    name: "rotateSubscriptionToken",
    filename: "src/features/subscriptions/api/server-fn.ts",
  },
  (opts) => rotateSubscriptionToken.__executeServer(opts),
)
const rotateSubscriptionToken = createServerFn({ method: "POST" })
  .middleware([adminFunctionMiddleware])
  .validator((input) => input)
  .handler(rotateSubscriptionToken_createServerFn_handler, ({ data }) =>
    rotateSubscriptionToken$1({
      id: data.id,
      origin: getRequest().url,
    }),
  )
//#endregion
export {
  appendSubscriptionNodes_createServerFn_handler,
  createSubscription_createServerFn_handler,
  getSubscriptionLink_createServerFn_handler,
  getSubscription_createServerFn_handler,
  listSubscriptions_createServerFn_handler,
  readSubscriptionSnapshot_createServerFn_handler,
  registerSubscriptionLink_createServerFn_handler,
  removeSubscription_createServerFn_handler,
  reorderSubscriptions_createServerFn_handler,
  rotateSubscriptionToken_createServerFn_handler,
  updateSubscription_createServerFn_handler,
}
