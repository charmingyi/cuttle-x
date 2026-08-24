import { describe, expect, test } from "vitest"
import { inspectNodeList } from "@/core/nodes"
import { shadowTls } from "@/core/nodes/plugins"

/** A Shadowsocks outbound dialing through a Shadow-TLS one, the way sing-box spells that pair. */
const SHADOW_TLS_CONFIG = JSON.stringify({
  outbounds: [
    {
      type: "shadowsocks",
      tag: "STLS",
      detour: "STLS_wrapper",
      method: "aes-128-gcm",
      password: "pass",
    },
    {
      type: "shadowtls",
      tag: "STLS_wrapper",
      server: "example.com",
      server_port: 443,
      password: "secret",
      version: 3,
      tls: { enabled: true, server_name: "cdn.example.com" },
    },
  ],
})

describe("the parse stage", () => {
  test("a sing-box outbound detouring through Shadow-TLS keeps the whole handshake", () => {
    // The wrapper is folded back into the proxy as a record rather than the `;`-delimited string a
    // sing-box `plugin_opts` normally is, and a reader that accepts only the string hands back a plain
    // Shadowsocks node dialing a server that answers nothing but a Shadow-TLS handshake.
    const { nodes, detectedFormat } = inspectNodeList(SHADOW_TLS_CONFIG)

    expect(detectedFormat).toBe("sing-box")
    expect(nodes).toHaveLength(1)
    expect(nodes[0].server).toBe("example.com")
    expect(shadowTls(nodes[0])).toStrictEqual({
      host: "cdn.example.com",
      password: "secret",
      version: 3,
    })
  })

  test("a URI query value is percent-decoded once, not twice", () => {
    // `URLSearchParams` decodes as it parses. Decoding what it hands back reads a `%xx` the value
    // itself contains as an escape of its own, so `%2525` — one escaped `%25` — comes back as a bare
    // `%` instead of `%25`, and the credential no longer authenticates.
    const [node] = inspectNodeList(
      "hy2://user@example.com:443?obfs=salamander&obfs-password=a%2525b&sni=c%2525d#n",
    ).nodes

    expect(node["obfs-password"]).toBe("a%25b")
    expect(node.sni).toBe("c%25d")
  })

  test("every protocol reading a URI query shares that one decode", () => {
    // The copy lives in `urlNode`, so the protocols that reach it — not Hysteria 2 alone — all have
    // to read the same value back. Hysteria 2 was the only one a per-field re-read had ever covered.
    const [tuic] = inspectNodeList("tuic://id:pass@example.com:443?sni=a%2525b#n").nodes
    const [anytls] = inspectNodeList("anytls://pass@example.com:443?sni=a%2525b#n").nodes

    expect(tuic.sni).toBe("a%25b")
    expect(anytls.sni).toBe("a%25b")
  })
})

describe("the Xray-family VLESS share-link envelope", () => {
  // Some clients write `vless://<base64("[encryption:]<uuid>@<host>:<port>")>` with the query under
  // the Xray spellings — `remarks`, `tls=1`, `xtls=2`, `peer`, `fingerprint` — rather than the
  // standard `vless://uuid@host:port?...` form.
  test("an empty-encryption envelope is unwrapped into a full node", () => {
    const [node] = inspectNodeList(
      "vless://OmFjZmNjMWVkLTgyMGUtNDk0Yi1iNjUxLWZlYTlkZmM1ZTUxZUA3Mi4yNDkuMjAwLjcwOjU0NTQ1?remarks=CA%20Bell&tls=1&peer=apple.com&allowInsecure=1&udp=1&xtls=2&pbk=EW0Uda0mRwsuvvsozQkyqXIe-mYRwKCvWcG6qTAwlh4&sid=8e7b5f82e7ea3ec6",
    ).nodes

    expect(node.type).toBe("vless")
    expect(node.name).toBe("CA Bell")
    expect(node.server).toBe("72.249.200.70")
    expect(node.port).toBe(54545)
    expect(node.uuid).toBe("acfcc1ed-820e-494b-b651-fea9dfc5e51e")
    expect(node.tls).toBe(true)
    expect(node.flow).toBe("xtls-rprx-vision")
    expect(node.sni).toBe("apple.com")
    expect(node["skip-cert-verify"]).toBe(true)
    expect(node.udp).toBe(true)
    expect(node["reality-opts"]).toMatchObject({
      "public-key": "EW0Uda0mRwsuvvsozQkyqXIe-mYRwKCvWcG6qTAwlh4",
      "short-id": "8e7b5f82e7ea3ec6",
    })
  })

  test("a `none`-encryption envelope keeps the stated encryption and its extra flags", () => {
    const [node] = inspectNodeList(
      "vless://bm9uZToyNDZkOGE4Mi04ZTg5LTQ3MzAtODJlNC05MzFlMmFlMWUzNzlAODcuODMuMTA3Ljg6MTMyNDM?remarks=YXVM%20HK&tls=1&peer=m.media-amazon.com&allowInsecure=1&tfo=1&udp=1&xtls=2&pbk=TENM-A9rzf9LroX9c0A5XRtjbt44NWHjJ6piw3136Rg&sid=c277ea89&fingerprint=chrome",
    ).nodes

    expect(node.name).toBe("YXVM HK")
    expect(node.server).toBe("87.83.107.8")
    expect(node.port).toBe(13243)
    expect(node.uuid).toBe("246d8a82-8e89-4730-82e4-931e2ae1e379")
    expect(node.encryption).toBe("none")
    expect(node.flow).toBe("xtls-rprx-vision")
    expect(node["client-fingerprint"]).toBe("chrome")
    expect(node.tfo).toBe(true)
  })

  test("a standard VLESS URI is unchanged by the envelope reader", () => {
    // The envelope must not touch a URI that already carries its uuid in the user position.
    const [node] = inspectNodeList(
      "vless://246d8a82-8e89-4730-82e4-931e2ae1e379@87.83.107.8:13243?encryption=none&security=reality&sni=m.media-amazon.com&fp=chrome&pbk=x&sid=y#plain",
    ).nodes

    expect(node.server).toBe("87.83.107.8")
    expect(node.uuid).toBe("246d8a82-8e89-4730-82e4-931e2ae1e379")
    expect(node.tls).toBe(true)
    expect(node.encryption).toBe("none")
    expect(node["client-fingerprint"]).toBe("chrome")
  })

  test("a non-base64 authority (e.g. an IPv6 host) is not mistaken for an envelope", () => {
    // `2001:db8::1` is a valid hostname without `@`; the envelope reader must decline it.
    const [node] = inspectNodeList("vless://uuid@[2001:db8::1]:443?type=tcp#v6").nodes
    expect(node.server).toBe("[2001:db8::1]")
    expect(node.port).toBe(443)
  })
})

describe("the mieru share link", () => {
  test("an official mierus:// profile link yields one mieru node", () => {
    const [node] = inspectNodeList(
      "mierus://QXmwJTupO1:eLYZJelhwk@211.136.162.190?udp=1&port=20949&profile=nb-cm",
    ).nodes

    expect(node.type).toBe("mieru")
    expect(node.server).toBe("211.136.162.190")
    expect(node.port).toBe(20949)
    expect(node.username).toBe("QXmwJTupO1")
    expect(node.password).toBe("eLYZJelhwk")
    expect(node.name).toBe("nb-cm")
    expect(node.udp).toBe(true)
  })

  test("a mieru profile link naming its protocols carries each transport", () => {
    const [node] = inspectNodeList(
      "mierus://user:pass@example.com?port=8080&protocol=tcp&profile=p",
    ).nodes

    expect(node.server).toBe("example.com")
    expect(node.port).toBe(8080)
    expect(node.transport).toBe("tcp")
  })
})
