//#region \0%23tanstack-start-server-fn-resolver
const manifest = {
  "14d07b44b6810ae2698986cc6844093df35e2271f1e77793ed42413a98d518b0": {
    functionName: "removeSubscription_createServerFn_handler",
    importer: () => import("./server-fn-CpgyX631.js"),
  },
  "45be2eb57a6db9a94ee93a4b772a37d509cfd2fbd33a1120319511f459719643": {
    functionName: "readSubscriptionSnapshot_createServerFn_handler",
    importer: () => import("./server-fn-CpgyX631.js"),
  },
  "58f0261279c365dd49e4b1273259e91f13f06b060bf838cfa65dc8fe81ef5dd1": {
    functionName: "registerSubscriptionLink_createServerFn_handler",
    importer: () => import("./server-fn-CpgyX631.js"),
  },
  "89fd89bbad38db578c6cb2bf86e8b3305ee392359297cb8c98424c9c04551a04": {
    functionName: "listSubscriptions_createServerFn_handler",
    importer: () => import("./server-fn-CpgyX631.js"),
  },
  "997c5ebbff41e37d0a9bdf27c3cde5d12f9a18007caf5a3a9c6549b6cba4bb9d": {
    functionName: "readRemoteSource_createServerFn_handler",
    importer: () => import("./server-fn-ByXxfLHH.js"),
  },
  "aa15fce652c028452a0b598d161f382f9d376aaa0b9d2f41f95ee98a5f8fd18e": {
    functionName: "reorderSubscriptions_createServerFn_handler",
    importer: () => import("./server-fn-CpgyX631.js"),
  },
  "bd995696fd52ca7994f7c0aec15c1ae829ed95a204ebbc0eaf0c2257f267f2ad": {
    functionName: "getSubscriptionLink_createServerFn_handler",
    importer: () => import("./server-fn-CpgyX631.js"),
  },
  "d57d823ede0b5b48ffd55a001c11e50ac8f1350dd48e483c12be43eb21bc9464": {
    functionName: "rotateSubscriptionToken_createServerFn_handler",
    importer: () => import("./server-fn-CpgyX631.js"),
  },
  "e2b0ee9c340b1f9484a63ecb8509e9b5e7c55ae3cb81c459bcf538870e5bab0f": {
    functionName: "appendSubscriptionNodes_createServerFn_handler",
    importer: () => import("./server-fn-CpgyX631.js"),
  },
  "eb218f3236c3e2f3ba75455f70aa5307da043613515eb670351254f1e17e5c07": {
    functionName: "updateSubscription_createServerFn_handler",
    importer: () => import("./server-fn-CpgyX631.js"),
  },
  "f4dbccdbcddea8abfadb634a92f41620fe942e5ebabcbc7b535267a094c3fdf0": {
    functionName: "createSubscription_createServerFn_handler",
    importer: () => import("./server-fn-CpgyX631.js"),
  },
  "f62d263e50d86de549bebc46361ec3893eaedd47c827551346dcaf249ffb4cfe": {
    functionName: "getSubscription_createServerFn_handler",
    importer: () => import("./server-fn-CpgyX631.js"),
  },
}
async function getServerFnById(id, access) {
  const serverFnInfo = manifest[id]
  if (!serverFnInfo) throw new Error(`Server function info not found for ${id}`)
  const fnModule = serverFnInfo.module ?? (await serverFnInfo.importer())
  if (!fnModule) throw new Error(`Server function module not resolved for ${id}`)
  const action = fnModule[serverFnInfo.functionName]
  if (!action) throw new Error(`Server function module export not resolved for serverFn ID: ${id}`)
  return action
}
//#endregion
export { getServerFnById as t }
