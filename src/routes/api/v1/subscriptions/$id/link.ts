import { createFileRoute } from "@tanstack/react-router"
import {
  getSubscriptionLink,
  registerSubscriptionLink,
} from "@/features/subscriptions/api/operations"
import { jsonError } from "@/server/error-response"
import { readJsonBody } from "@/server/request-body"

export const Route = createFileRoute("/api/v1/subscriptions/$id/link")({
  server: {
    handlers: {
      GET: async ({ params, request }) => {
        try {
          return Response.json(await getSubscriptionLink({ id: params.id, origin: request.url }))
        } catch (error) {
          return jsonError(error, "get-subscription-link")
        }
      },
      POST: async ({ params, request }) => {
        try {
          const body = await readJsonBody(request)
          const link = body && typeof body === "object" ? Reflect.get(body, "link") : undefined
          return Response.json(
            await registerSubscriptionLink({ id: params.id, link, origin: request.url }),
          )
        } catch (error) {
          return jsonError(error, "register-subscription-link")
        }
      },
    },
  },
})
