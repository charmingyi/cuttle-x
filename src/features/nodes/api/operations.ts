import type { CanonicalNode } from "@/core/nodes"
import { canonicalToNodeForm, validateNodeForm } from "@/core/nodes/entity"
import type { NodeFormData } from "@/core/nodes/entity"
import { nodeRepository } from "@/server/node-services"
import { AdminFailure } from "@/shared/admin-error"
import type { NodeListPayload, NodePayload, ImportNodesPayload } from "./contract"

function readForm(input: unknown): NodeFormData {
  if (!input || typeof input !== "object") {
    throw new AdminFailure("invalid_request", "节点数据格式无效。")
  }
  const data = input as Partial<NodeFormData>
  const form: NodeFormData = {
    name: typeof data.name === "string" ? data.name.trim() : "",
    type: typeof data.type === "string" ? data.type.trim() : "",
    server: typeof data.server === "string" ? data.server.trim() : "",
    port: typeof data.port === "number" && Number.isFinite(data.port) ? Math.floor(data.port) : 0,
  }
  if (typeof data.country === "string" && data.country.trim()) form.country = data.country.trim()
  if (typeof data.security === "string" && data.security.trim())
    form.security = data.security.trim()
  if (typeof data.transport === "string" && data.transport.trim())
    form.transport = data.transport.trim()
  if (
    data.credentials &&
    typeof data.credentials === "object" &&
    !Array.isArray(data.credentials)
  ) {
    form.credentials = data.credentials as Record<string, unknown>
  }
  if (data.extra && typeof data.extra === "object" && !Array.isArray(data.extra)) {
    form.extra = data.extra as Record<string, unknown>
  }
  validateNodeForm(form)
  return form
}

export async function listNodes(): Promise<NodeListPayload> {
  return { nodes: await nodeRepository().list() }
}

export async function getNode({ id }: { id: string }): Promise<NodePayload> {
  const node = await nodeRepository().findById(id)
  if (!node) throw new AdminFailure("not_found", "节点不存在。")
  return { node }
}

export async function createNode({ data }: { data: unknown }): Promise<NodePayload> {
  const form = readForm(data)
  const node = await nodeRepository().create(form)
  return { node }
}

export async function updateNode({
  id,
  data,
}: {
  id: string
  data: unknown
}): Promise<NodePayload> {
  const form = readForm(data)
  const node = await nodeRepository().update(id, form)
  if (!node) throw new AdminFailure("not_found", "节点不存在。")
  return { node }
}

export async function removeNode({ id }: { id: string }): Promise<void> {
  if (!(await nodeRepository().deleteById(id))) {
    throw new AdminFailure("not_found", "节点不存在。")
  }
}

export async function removeNodes({ ids }: { ids: string[] }): Promise<{ deleted: number }> {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new AdminFailure("invalid_request", "节点列表不能为空。")
  }
  if (ids.length > 500) {
    throw new AdminFailure("invalid_request", "一次最多删除 500 个节点。")
  }
  const deleted = await nodeRepository().deleteMany(ids)
  return { deleted }
}

export async function reorderNodes({ ids }: { ids: string[] }): Promise<void> {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new AdminFailure("invalid_request", "节点顺序不能为空。")
  }
  await nodeRepository().reorder(ids)
}

export async function importNodes({
  nodes,
}: {
  nodes: CanonicalNode[]
}): Promise<ImportNodesPayload> {
  if (!Array.isArray(nodes) || nodes.length === 0) {
    throw new AdminFailure("invalid_request", "节点列表不能为空。")
  }
  const forms: NodeFormData[] = []
  const errors: Array<{ index: number; message: string }> = []
  for (let i = 0; i < nodes.length; i++) {
    try {
      const form = canonicalToNodeForm(nodes[i])
      validateNodeForm(form)
      forms.push(form)
    } catch (error) {
      errors.push({
        index: i,
        message: error instanceof Error ? error.message : "未知错误",
      })
    }
  }
  const created = forms.length > 0 ? await nodeRepository().createMany(forms) : []
  return { imported: created.length, errors, nodes: created }
}
