//#region \0tanstack-start-manifest:v
const tsrStartManifest = () => ({
  routes: {
    "__root__": {
      filePath: "C:/Users/Administrator/Documents/cuttle-src/cuttle-main/src/routes/__root.tsx",
      children: [
        "/",
        "/subscriptions",
        "/api/session",
        "/subscribe/$token",
        "/api/v1/subscriptions",
      ],
      preloads: [
        "/assets/index-485N6AeB.js",
        "/assets/rolldown-runtime-CbXtAM7H.js",
        "/assets/shell-BtDVE5S2.js",
      ],
      scripts: [
        {
          attrs: {
            type: "module",
            async: !0,
            src: "/assets/index-485N6AeB.js",
          },
        },
      ],
    },
    "/": {
      filePath: "C:/Users/Administrator/Documents/cuttle-src/cuttle-main/src/routes/index.tsx",
      children: void 0,
      preloads: ["/assets/routes-GfcbTAKx.js", "/assets/web-worker-C2TRNj9c.js"],
    },
    "/subscriptions": {
      filePath:
        "C:/Users/Administrator/Documents/cuttle-src/cuttle-main/src/routes/subscriptions.tsx",
      children: void 0,
      preloads: ["/assets/subscriptions-Cm-t1pC_.js", "/assets/web-worker-C2TRNj9c.js"],
    },
  },
})
//#endregion
export { tsrStartManifest }
