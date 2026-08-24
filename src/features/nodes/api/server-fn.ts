import { createServerFn } from "@tanstack/react-start"
import type { CanonicalNode } from "@/core/nodes"
import { adminFunctionMiddleware } from "@/middleware/admin-function"
import * as operations from "./operations"

export const listNodes = createServerFn({ method: "POST" })
  .middleware([adminFunctionMiddleware])
  .handler(() => operations.listNodes())

export const getNode = createServerFn({ method: "POST" })
  .middleware([adminFunctionMiddleware])
  .validator((input: { id: string }) => input)
  .handler(({ data }) => operations.getNode(data))

export const createNode = createServerFn({ method: "POST" })
  .middleware([adminFunctionMiddleware])
  .validator((input: { data: unknown }) => input)
  .handler(({ data }) => operations.createNode(data))

export const updateNode = createServerFn({ method: "POST" })
  .middleware([adminFunctionMiddleware])
  .validator((input: { id: string; data: unknown }) => input)
  .handler(({ data }) => operations.updateNode(data))

export const removeNode = createServerFn({ method: "POST" })
  .middleware([adminFunctionMiddleware])
  .validator((input: { id: string }) => input)
  .handler(({ data }) => operations.removeNode(data))

export const removeNodes = createServerFn({ method: "POST" })
  .middleware([adminFunctionMiddleware])
  .validator((input: { ids: string[] }) => input)
  .handler(({ data }) => operations.removeNodes(data))

export const reorderNodes = createServerFn({ method: "POST" })
  .middleware([adminFunctionMiddleware])
  .validator((input: { ids: string[] }) => input)
  .handler(({ data }) => operations.reorderNodes(data))

export const importNodes = createServerFn({ method: "POST" })
  .middleware([adminFunctionMiddleware])
  .validator((input: { nodes: unknown }) => input)
  .handler(({ data }) => operations.importNodes(data as { nodes: CanonicalNode[] }))
