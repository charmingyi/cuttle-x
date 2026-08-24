import { createFileRoute } from "@tanstack/react-router"
import { appendSubscriptionNodes } from "@/features/subscriptions/api/operations"
import { jsonError } from "@/server/error-response"
import { readJsonBody } from "@/server/request-body"

/**
 * This child route intentionally inherits `noStore` and `adminOnly` from `/api/v1/subscriptions`,
 * exactly like the sibling `$id` route. Keeping the endpoint nested preserves the management boundary.
 */
export const Route = createFileRoute("/api/v1/subscriptions/$id/nodes")({
  server: {
    handlers: {
      POST: async ({ params, request }) => {
        try {
          const body = await readJsonBody(request)
          const content =
            body && typeof body === "object" && !Array.isArray(body)
              ? (body as { content?: unknown }).content
              : undefined
          const payload = await appendSubscriptionNodes({
            id: params.id,
            content: content ?? "",
          })
          return Response.json(payload)
        } catch (error) {
          return jsonError(error, "append-subscription-nodes")
        }
      },
    },
  },
})
