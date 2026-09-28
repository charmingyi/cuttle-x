import { describe, expect, test } from "vitest"
import type { CanonicalNode } from "@/core/nodes"
import { KNOWN_PROTOCOLS } from "@/core/nodes/entity"
import { renderUriNode } from "@/core/nodes/targets/shared/uri-node"

/**
 * Which protocols a scanned code can carry.
 *
 * The node page turns `renderUriNode`'s result into the node's QR code, so a protocol that renders
 * null is a protocol whose dialog has to say there is no share link rather than show a code. This
 * pins that set: Snell, Mieru and SSH have no URI spelling in the converter, and a protocol added
 * later without one has to be added here too — on purpose, instead of quietly producing a code that
 * looks scannable and imports nothing.
 */
const NO_URI_SPELLING = ["mieru", "snell", "ssh"]

function minimal(type: string): CanonicalNode {
  return { type, name: `node-${type}`, server: "example.com", port: 443 }
}

describe("URI share links cover the protocols a client can import", () => {
  test("exactly the protocols with no URI spelling render nothing", () => {
    const missing: string[] = []
    const blank: string[] = []
    for (const type of KNOWN_PROTOCOLS) {
      const uri = renderUriNode(minimal(type))
      if (uri === null) missing.push(type)
      else if (!uri) blank.push(type)
    }
    expect(blank).toStrictEqual([])
    expect(missing.toSorted()).toStrictEqual(NO_URI_SPELLING)
  })
})
