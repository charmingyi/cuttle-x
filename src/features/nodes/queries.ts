import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useTokenUsable } from "@/features/session"
import { showError, showSuccess } from "@/shared/notify"
import * as api from "./api/server-fn"

const NO_NODES: never[] = []

export const keys = {
  nodes: ["nodes"] as const,
  node: (id: string) => ["nodes", id] as const,
}

export function useNodes() {
  const query = useQuery({
    queryKey: keys.nodes,
    queryFn: () => api.listNodes().then((p) => p.nodes),
    enabled: useTokenUsable(),
  })
  return {
    failure: query.error,
    items: query.data ?? NO_NODES,
    loaded: query.isSuccess,
  }
}

export function useCreateNode() {
  const client = useQueryClient()
  return useMutation({
    mutationFn: (data: unknown) => api.createNode({ data: { data } }),
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: keys.nodes })
      showSuccess("节点已创建")
    },
    onError: (error) => showError(error, "创建节点失败。"),
  })
}

export function useUpdateNode() {
  const client = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: unknown }) =>
      api.updateNode({ data: { id, data } }),
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: keys.nodes })
      showSuccess("节点已更新")
    },
    onError: (error) => showError(error, "更新节点失败。"),
  })
}

export function useRemoveNode() {
  const client = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => api.removeNode({ data: { id } }),
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: keys.nodes })
      showSuccess("节点已删除")
    },
    onError: (error) => showError(error, "删除失败。"),
  })
}

export function useRemoveNodes() {
  const client = useQueryClient()
  return useMutation({
    mutationFn: (ids: string[]) => api.removeNodes({ data: { ids } }),
    onSuccess: async (payload) => {
      await client.invalidateQueries({ queryKey: keys.nodes })
      showSuccess(`已删除 ${payload.deleted} 个节点`)
    },
    onError: (error) => showError(error, "批量删除失败。"),
  })
}

export function useReorderNodes() {
  const client = useQueryClient()
  return useMutation({
    mutationFn: (ids: string[]) => api.reorderNodes({ data: { ids } }),
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: keys.nodes })
    },
    onError: (error) => showError(error, "排序保存失败。"),
  })
}

export function useImportNodes() {
  const client = useQueryClient()
  return useMutation({
    mutationFn: (nodes: unknown) => api.importNodes({ data: { nodes } }),
    onSuccess: async (payload) => {
      await client.invalidateQueries({ queryKey: keys.nodes })
      if (payload.errors.length > 0) {
        showSuccess(`已导入 ${payload.imported} 个节点（${payload.errors.length} 个跳过）`)
      } else {
        showSuccess(`已导入 ${payload.imported} 个节点`)
      }
    },
    onError: (error) => showError(error, "导入节点失败。"),
  })
}
