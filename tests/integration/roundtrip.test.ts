import { env } from "cloudflare:workers"
import { describe, expect, test } from "vitest"
import { canonicalToNodeForm, nodeToCanonical } from "@/core/nodes/entity"
import { inspectNodeList } from "@/core/nodes/pipeline"
import { createNodeRepository } from "@/platform/d1/node-repository"

/** A VLESS share link in the Xray-family base64 envelope, as one real subscription delivered. */
const VLESS_ENVELOPE =
  "vless://OmFjZmNjMWVkLTgyMGUtNDk0Yi1iNjUxLWZlYTlkZmM1ZTUxZUA3Mi4yNDkuMjAwLjcwOjU0NTQ1?remarks=CA%20Bell&tls=1&peer=apple.com&allowInsecure=1&udp=1&xtls=2&pbk=EW0Uda0mRwsuvvsozQkyqXIe-mYRwKCvWcG6qTAwlh4&sid=8e7b5f82e7ea3ec6"

/** The same envelope with an explicit `none:` encryption and extra TLS flags. */
const VLESS_NONE =
  "vless://bm9uZToyNDZkOGE4Mi04ZTg5LTQ3MzAtODJlNC05MzFlMmFlMWUzNzlAODcuODMuMTA3Ljg6MTMyNDM?remarks=YXVM%20HK&tls=1&peer=m.media-amazon.com&allowInsecure=1&tfo=1&udp=1&xtls=2&pbk=TENM-A9rzf9LroX9c0A5XRtjbt44NWHjJ6piw3136Rg&sid=c277ea89&fingerprint=chrome"

/** A mieru profile link in the official `mierus://` spelling. */
const MIERU = "mierus://QXmwJTupO1:eLYZJelhwk@211.136.162.190?udp=1&port=20949&profile=nb-cm"

async function persistAndReadBack(link: string) {
  const result = inspectNodeList(link)
  expect(result.diagnostics).toHaveLength(0)
  expect(result.nodes).toHaveLength(1)
  const node = result.nodes[0]
  if (!node) throw new Error("expected a node")
  const repository = createNodeRepository(env.DB)
  const created = await repository.createMany([canonicalToNodeForm(node)])
  expect(created).toHaveLength(1)
  const first = created[0]
  if (!first) throw new Error("created[0] must exist")
  return { node, back: nodeToCanonical(first) }
}

describe("real user share links persist and read back whole", () => {
  test("a vless base64 envelope keeps uuid, Reality and Vision flow", async () => {
    const { node, back } = await persistAndReadBack(VLESS_ENVELOPE)
    expect(back.type).toBe(node.type)
    expect(back.server).toBe(node.server)
    expect(back.port).toBe(node.port)
    expect(back.uuid).toBe(node.uuid)
    expect(back["reality-opts"]).toMatchObject(node["reality-opts"] ?? {})
    expect(back.sni).toBe(node.sni)
    expect(back.flow).toBe(node.flow)
  })

  test("a vless envelope with `none` encryption keeps its signal flags", async () => {
    const { node, back } = await persistAndReadBack(VLESS_NONE)
    expect(back.uuid).toBe(node.uuid)
    expect(back.encryption).toBe("none")
    expect(back["client-fingerprint"]).toBe("chrome")
    expect(back.tfo).toBe(true)
    expect(back["reality-opts"]).toMatchObject(node["reality-opts"] ?? {})
  })

  test("a mierus:// profile link keeps its credentials and transport", async () => {
    const { back } = await persistAndReadBack(MIERU)
    expect(back.type).toBe("mieru")
    expect(back.server).toBe("211.136.162.190")
    expect(back.port).toBe(20949)
    expect(back.username).toBe("QXmwJTupO1")
    expect(back.password).toBe("eLYZJelhwk")
    expect(back.transport).toBe("tcp")
    expect(back.udp).toBe(true)
  })
})
