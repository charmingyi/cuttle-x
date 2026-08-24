import type { NodeEntity } from "@/core/nodes/entity"

export interface NodeListPayload {
  nodes: NodeEntity[]
}

export interface NodePayload {
  node: NodeEntity
}

export interface ImportNodesPayload {
  imported: number
  errors: Array<{ index: number; message: string }>
  nodes: NodeEntity[]
}
