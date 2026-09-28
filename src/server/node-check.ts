import { connect } from "cloudflare:sockets"
import { env } from "cloudflare:workers"
import { createNodeRepository } from "@/platform/d1/node-repository"
import { recordAudit } from "./audit-log"

/**
 * Reachability probe for saved nodes: a plain TCP dial to server:port from the Worker.
 *
 * A successful dial says the host resolves and something accepts connections on that port — it does
 * not validate credentials or the proxy protocol. That is still the fastest signal this deployment
 * can produce about "is this node even up", and the latency it measures is the connect handshake,
 * DNS included, which is what the client experiences too.
 */

const DIAL_TIMEOUT_MS = 5_000
const CONCURRENCY = 6

export interface NodeCheckOutcome {
  id: string
  ok: boolean
  ms: number | null
  error: string
}

async function dial(node: { id: string; server: string; port: number }): Promise<NodeCheckOutcome> {
  const startedAt = Date.now()
  const socket = connect({ hostname: node.server, port: node.port })
  try {
    // `opened` resolves once the TCP handshake completes; the race caps a hung connect at the
    // timeout, since Workers sockets expose no dial-level signal to cancel with.
    let timer: ReturnType<typeof setTimeout> | undefined
    const timeout = new Promise<never>((_, reject) => {
      timer = setTimeout(() => reject(new Error("连接超时")), DIAL_TIMEOUT_MS)
    })
    await Promise.race([socket.opened, timeout]).finally(() => clearTimeout(timer))
    return { id: node.id, ok: true, ms: Date.now() - startedAt, error: "" }
  } catch (error) {
    return {
      id: node.id,
      ok: false,
      ms: null,
      error: error instanceof Error ? error.message : "连接失败",
    }
  } finally {
    try {
      socket.close()
    } catch {
      // Closing an unopened or already-dead socket must not mask the dial result.
    }
  }
}

export async function checkNodes(
  ids: string[] | undefined,
): Promise<{ results: NodeCheckOutcome[] }> {
  const repository = createNodeRepository(env.DB)
  const nodes = await repository.list()
  // An undefined id list means "all nodes"; a list that names unknown ids simply checks nothing.
  const targets = ids && ids.length > 0 ? nodes.filter((node) => ids.includes(node.id)) : nodes

  const results: NodeCheckOutcome[] = []
  const queue = [...targets]

  // Deliberately awaited in a loop inside each of the N workers: the concurrency here is the
  // throttle, and the lint's "parallelize instead" advice is what this structure already does
  // N times over.
  async function worker() {
    while (queue.length > 0) {
      const node = queue.shift()
      if (!node) return
      // oxlint-disable-next-line no-await-in-loop -- The loop is the concurrency limiter.
      results.push(await dial(node))
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()))

  const checkedAt = new Date().toISOString()
  await repository.saveCheckResults(
    results.map((r) => ({ id: r.id, ok: r.ok, ms: r.ms, checkedAt })),
  )
  void recordAudit("node_check", {
    count: results.length,
    ok: results.filter((r) => r.ok).length,
    failed: results.filter((r) => !r.ok).length,
  })

  return { results }
}
