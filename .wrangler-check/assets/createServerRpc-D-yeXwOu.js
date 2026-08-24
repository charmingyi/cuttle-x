import { d as TSS_SERVER_FUNCTION } from "./createServerFn-DRD1-jCn.js"
//#region node_modules/.pnpm/@tanstack+start-server-core@1.169.30/node_modules/@tanstack/start-server-core/dist/esm/createServerRpc.js
const createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true,
  })
}
//#endregion
export { createServerRpc as t }
