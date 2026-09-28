/**
 * One-click import links: turn a plain subscription URL into the deep link each client app
 * registers to import a remote subscription.
 *
 * The schemes are the ones the apps document themselves; where an app wants base64 (Shadowrocket's
 * `sub://`) or JSON (Quantumult X's remote-resource), the wrapper below does it, so a call site
 * passes only the plain URL.
 */

export interface ClientImport {
  client: string
  scheme: string
  href: (url: string) => string
}

export const CLIENT_IMPORTS: ClientImport[] = [
  {
    client: "Clash / Mihomo",
    scheme: "clash://",
    href: (url) => `clash://install-config?url=${encodeURIComponent(url)}`,
  },
  {
    client: "sing-box",
    scheme: "sing-box://",
    href: (url) => `sing-box://import-remote?url=${encodeURIComponent(url)}`,
  },
  {
    client: "Shadowrocket",
    scheme: "sub://",
    href: (url) => `sub://${btoa(url)}`,
  },
  {
    client: "Stash",
    scheme: "stash://",
    href: (url) => `stash://install-config?url=${encodeURIComponent(url)}`,
  },
  {
    client: "Surge",
    scheme: "surge://",
    href: (url) => `surge:///install-config?url=${encodeURIComponent(url)}`,
  },
  {
    client: "Loon",
    scheme: "loon://",
    href: (url) => `loon://import-sub?url=${encodeURIComponent(url)}`,
  },
  {
    client: "Quantumult X",
    scheme: "quantumult-x://",
    href: (url) =>
      `quantumult-x:///update-configuration?remote-resource=${encodeURIComponent(
        JSON.stringify({ remote_resource: [url] }),
      )}`,
  },
]
