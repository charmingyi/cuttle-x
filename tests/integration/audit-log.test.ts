import { env } from "cloudflare:workers"
import { describe, expect, test } from "vitest"
import { canonicalToNodeForm } from "@/core/nodes/entity"
import { inspectNodeList } from "@/core/nodes/pipeline"
import { createNode } from "@/features/nodes/api/operations"
import { listAudit, recordAudit } from "@/server/audit-log"

const SS = "ss://YWVzLTI1Ni1nY206cGFzc3dvcmQ=@audit.example.com:8388#Audit"

describe("the audit log", () => {
  test("recordAudit writes and listAudit returns newest first", async () => {
    await recordAudit("node_create", { name: "audit-a" })
    await recordAudit("node_import", { imported: 3 })
    const entries = await listAudit({ limit: 10 })
    expect(entries.length).toBeGreaterThanOrEqual(2)
    expect(entries[0]?.kind).toBe("node_import")
    expect(entries[0]?.detailJson).toContain("imported")
    expect(entries[1]?.kind).toBe("node_create")
  })

  test("the kind filter narrows to exactly one kind", async () => {
    await recordAudit("node_update", { name: "audit-b" })
    const entries = await listAudit({ kind: "node_update", limit: 5 })
    expect(entries.length).toBeGreaterThanOrEqual(1)
    expect(entries.every((entry) => entry.kind === "node_update")).toBe(true)
  })

  test("rows older than the retention window are pruned on read", async () => {
    const db = env.DB
    const old = new Date(Date.now() - 100 * 24 * 60 * 60 * 1000).toISOString()
    await db
      .prepare(
        `INSERT INTO audit_log (id, kind, detail_json, created_at) VALUES (?, 'node_delete', '{"name":"old"}', ?)`,
      )
      .bind("audit-old-row", old)
      .run()
    await listAudit({ limit: 10 })
    const row = await db
      .prepare(`SELECT id FROM audit_log WHERE id = ?`)
      .bind("audit-old-row")
      .first()
    expect(row).toBeNull()
  })

  test("the createNode operation records a node_create entry", async () => {
    const node = inspectNodeList(SS).nodes[0]
    if (!node) throw new Error("expected parsed node")
    await createNode({ data: canonicalToNodeForm(node) })
    const entries = await listAudit({ kind: "node_create", limit: 5 })
    expect(entries[0]?.detailJson).toContain("Audit")
  })
})
