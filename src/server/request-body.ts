import { MAX_SOURCE_SIZE } from "@/core/nodes"
import { AdminFailure } from "@/shared/admin-error"

// Leave room for the JSON envelope and subscription metadata while keeping raw content capped by the
// core parser's own 2 MiB limit.
const MAX_JSON_BODY_SIZE = MAX_SOURCE_SIZE + 64 * 1024

export async function readJsonBody(request: Request): Promise<unknown> {
  const length = Number(request.headers.get("content-length") ?? 0)
  if (length > MAX_JSON_BODY_SIZE) {
    throw new AdminFailure("payload_too_large", "The request body is too large.")
  }
  try {
    const body = await request.text()
    if (new TextEncoder().encode(body).byteLength > MAX_JSON_BODY_SIZE) {
      throw new AdminFailure("payload_too_large", "The request body is too large.")
    }
    return JSON.parse(body)
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new AdminFailure("invalid_request", "The request body must be valid JSON.", {
        cause: error,
      })
    }
    throw error
  }
}
