import { ValidationError } from "@/core/errors"
import type { NodeFormData } from "./types"

/**
 * Validates a node form for create/update. Throws `ValidationError` with a user-facing Chinese
 * message on the first problem found. All fields are trimmed before use by the caller.
 */
export function validateNodeForm(data: NodeFormData): void {
  if (!data.name || !data.name.trim()) {
    throw new ValidationError("节点名称不能为空。")
  }
  if (data.name.trim().length > 200) {
    throw new ValidationError("节点名称不能超过 200 个字符。")
  }
  if (!data.type || !data.type.trim()) {
    throw new ValidationError("请选择节点协议类型。")
  }
  if (!data.server || !data.server.trim()) {
    throw new ValidationError("服务器地址不能为空。")
  }
  if (data.server.trim().length > 500) {
    throw new ValidationError("服务器地址不能超过 500 个字符。")
  }
  if (!Number.isInteger(data.port) || data.port <= 0 || data.port >= 65536) {
    throw new ValidationError("端口必须是 1–65535 之间的整数。")
  }
}
