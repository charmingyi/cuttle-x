import { describe, expect, test } from "vitest"
import { compileNodeList, inspectNodeList } from "@/core/nodes"

/** The Mieru client's own configuration file, the way `mieru client` writes `client.json`. */
const CLIENT_JSON = JSON.stringify({
  profiles: [
    {
      profileName: "Mieru Client",
      user: { name: "user", password: "pass" },
      servers: [
        {
          ipAddress: "1.2.3.4",
          domainName: "mi.example.com",
          portBindings: [{ port: 2999, protocol: "TCP" }],
        },
      ],
      mtu: 1400,
      multiplexing: { level: "MULTIPLEXING_HIGH" },
      handshakeMode: "HANDSHAKE_STANDARD",
      congestionControl: "BBR",
      pacingWindow: "8M",
      streamTimeout: 30,
    },
  ],
})

describe("the Mieru client configuration format", () => {
  test("the official client JSON is read as its own format, endpoint by endpoint", () => {
    const result = inspectNodeList(CLIENT_JSON)

    expect(result.detectedFormat).toBe("mieru")
    expect(result.diagnostics).toStrictEqual([])
    expect(result.nodes).toHaveLength(1)
    expect(result.nodes[0]).toMatchObject({
      type: "mieru",
      name: "Mieru Client",
      // The domain is the address a dialer prefers, so it wins over the IP.
      server: "mi.example.com",
      port: 2999,
      username: "user",
      password: "pass",
      transport: "TCP",
      multiplexing: "MULTIPLEXING_HIGH",
      handshakeMode: "HANDSHAKE_STANDARD",
      congestionControl: "BBR",
      mtu: 1400,
      pacingWindow: "8M",
      streamTimeout: 30,
    })
  })

  test("each official port binding becomes a distinct node with stable numbering", () => {
    const source = JSON.stringify({
      profiles: [
        {
          profileName: "Bindings",
          user: { name: "u", password: "p" },
          servers: [
            {
              domainName: "a.example.com",
              portBindings: [
                { port: 443, protocol: "TCP" },
                { port: 8443, protocol: "UDP" },
              ],
            },
            { ipAddress: "203.0.113.9", portBindings: [{ port: 9443, protocol: "TCP" }] },
          ],
        },
      ],
    })

    const result = inspectNodeList(source)
    expect(
      result.nodes.map((node) => [node.name, node.server, node.port, node.transport]),
    ).toStrictEqual([
      ["Bindings 1", "a.example.com", 443, "TCP"],
      ["Bindings 2", "a.example.com", 8443, "UDP"],
      ["Bindings 3", "203.0.113.9", 9443, "TCP"],
    ])
  })

  test("an endpoint with only an IP dials the IP, and profile-level tuning fills the rest", () => {
    const source = JSON.stringify({
      profiles: [
        {
          profileName: "IP Only",
          user: { username: "u", password: "p" },
          // The official client writes `domain: ""` when a profile is IP-only; an empty domain must
          // not shadow the IP the endpoint did carry.
          servers: [{ ip: "203.0.113.7", domain: "", port: 8443, transportProtocol: "UDP" }],
          multiplexing: "ON",
          congestionControl: "CUBIC",
        },
      ],
    })

    const [node] = inspectNodeList(source).nodes
    expect(node.server).toBe("203.0.113.7")
    expect(node.transport).toBe("UDP")
    expect(node.multiplexing).toBe("ON")
    expect(node.congestionControl).toBe("CUBIC")
  })

  test("an endpoint that spells a field overrides the profile, and the profile's is the default", () => {
    const source = JSON.stringify({
      profiles: [
        {
          profileName: "Multi",
          user: { username: "u", password: "p" },
          servers: [
            { ip: "10.0.0.1", port: 1000, multiplexing: "ON" },
            { ip: "10.0.0.2", port: 2000 },
          ],
          multiplexing: "OFF",
          congestionControl: "BBR",
        },
      ],
    })

    const { nodes } = inspectNodeList(source)
    // Two servers under one profile share the credential, and are numbered to stay distinguishable.
    expect(nodes.map((node) => node.name)).toStrictEqual(["Multi 1", "Multi 2"])
    expect(nodes[0].username).toBe("u")
    expect(nodes[1].username).toBe("u")
    expect(nodes[0].multiplexing).toBe("ON")
    expect(nodes[1].multiplexing).toBe("OFF")
    expect(nodes[1].congestionControl).toBe("BBR")
  })

  test("an endpoint missing address or port is skipped, numbered across the whole document", () => {
    const source = JSON.stringify({
      profiles: [
        {
          profileName: "Broken",
          user: { username: "u", password: "p" },
          servers: [
            { ip: "10.0.0.1", port: 1000 },
            { ip: "10.0.0.2" },
            { domain: "d.example.com", port: 3000 },
            { port: 4000 },
          ],
        },
      ],
    })

    const result = inspectNodeList(source)
    expect(result.nodes).toHaveLength(2)
    const diagnostics = result.diagnostics.filter((item) => item.code === "invalid-mieru-node")
    expect(diagnostics.map((item) => item.message)).toStrictEqual([
      "Mieru server #2 is missing address or port; skipped.",
      "Mieru server #4 is missing address or port; skipped.",
    ])
  })

  test("a document that merely uses the word profiles is left to the next reader", () => {
    const result = inspectNodeList(JSON.stringify({ profiles: [{ name: "x" }] }))

    expect(result.detectedFormat).not.toBe("mieru")
    expect(result.nodes).toStrictEqual([])
  })

  test("a node survives the round trip through the mihomo rendering", () => {
    const { content, renderedNodes } = compileNodeList({ source: CLIENT_JSON, target: "mihomo" })
    expect(renderedNodes).toHaveLength(1)

    // Every field the client config carried comes back out of the rendered YAML, whole.
    const [node] = inspectNodeList(content).nodes
    expect(node).toMatchObject({
      type: "mieru",
      name: "Mieru Client",
      server: "mi.example.com",
      port: 2999,
      username: "user",
      password: "pass",
      transport: "TCP",
      multiplexing: "MULTIPLEXING_HIGH",
      handshakeMode: "HANDSHAKE_STANDARD",
      congestionControl: "BBR",
      mtu: 1400,
      pacingWindow: "8M",
      streamTimeout: 30,
    })
  })
})
