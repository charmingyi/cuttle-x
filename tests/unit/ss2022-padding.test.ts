import { describe, expect, test } from "vitest"
import { inspectNodeList } from "@/core/nodes"
import { encodeBase64, normalizeShadowsocks2022Password } from "@/core/nodes/base64"
import { nodeFromForm, nodeToCanonical } from "@/core/nodes/entity"
import { renderUriNode } from "@/core/nodes/targets/shared/uri-node"

const CIPHER = "2022-blake3-aes-256-gcm"
const MISSING_PADDING_KEY = "A".repeat(43)
const PADDED_KEY = `${MISSING_PADDING_KEY}=`
const OUTER_USERINFO = encodeBase64(`${CIPHER}:${MISSING_PADDING_KEY}`).replaceAll(/=+$/g, "")
const URI = `ss://${OUTER_USERINFO}@lqctv6.example.com:43455#DGN-HK-CN2`

describe("Shadowsocks 2022 PSK Base64 padding compatibility", () => {
  test("adds the missing padding when importing an unpadded outer share link", () => {
    const result = inspectNodeList(URI)
    const node = result.nodes[0]

    expect(result.diagnostics).toStrictEqual([])
    expect(node?.cipher).toBe(CIPHER)
    expect(node?.password).toBe(PADDED_KEY)
  })

  test("renders a padded key that Xray can decode and round-trips it", () => {
    const node = inspectNodeList(URI).nodes[0]
    if (!node) throw new Error("expected one Shadowsocks 2022 node")

    const rendered = renderUriNode(node)
    if (!rendered) throw new Error("expected a Shadowsocks URI")

    expect(rendered).toContain("%3D")
    expect(inspectNodeList(rendered).nodes[0]?.password).toBe(PADDED_KEY)
  })

  test("does not rewrite ordinary passwords or malformed SS2022 values", () => {
    expect(normalizeShadowsocks2022Password("aes-256-gcm", "password")).toBe("password")
    expect(normalizeShadowsocks2022Password(CIPHER, "A".repeat(42))).toBe("A".repeat(42))
    expect(normalizeShadowsocks2022Password(CIPHER, `${"A".repeat(43)}-`)).toBe(
      `${"A".repeat(43)}-`,
    )
    expect(normalizeShadowsocks2022Password(CIPHER, PADDED_KEY)).toBe(PADDED_KEY)
  })

  test("normalizes a manually saved or previously persisted SS2022 credential", () => {
    const entity = nodeFromForm(
      "ss2022-node",
      {
        name: "DGN-HK-CN2",
        type: "ss",
        server: "lqctv6.example.com",
        port: 43455,
        credentials: { method: CIPHER, password: MISSING_PADDING_KEY },
      },
      "2026-09-06T14:03:11.000Z",
    )
    expect(JSON.parse(entity.credentialJson).password).toBe(PADDED_KEY)
    expect(
      nodeToCanonical({
        ...entity,
        credentialJson: JSON.stringify({ method: CIPHER, password: MISSING_PADDING_KEY }),
      }).password,
    ).toBe(PADDED_KEY)
  })
})
