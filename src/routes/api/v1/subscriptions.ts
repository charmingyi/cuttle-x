import { createFileRoute } from "@tanstack/react-router"
import {
  createSubscription,
  listSubscriptions,
  reorderSubscriptions,
} from "@/features/subscriptions/api/operations"
import { adminOnly } from "@/middleware/admin-only.server"
import { noStore } from "@/middleware/no-store.server"
import { jsonError } from "@/server/error-response"
import { readJsonBody } from "@/server/request-body"

export const Route = createFileRoute("/api/v1/subscriptions")({
  server: {
    middleware: [noStore, adminOnly],
    handlers: {
      GET: async () => {
        try {
          return Response.json(await listSubscriptions())
        } catch (error) {
          return jsonError(error, "list-subscriptions")
        }
      },
      // The collection's order as one write, `{ ids: string[] }` — a full permutation of the current
      // subscription ids, validated server-side. PUT is unclaimed here and matches that whole-value
      // semantics; per-row PATCHes would leave the list permanently disagreeable.
      PUT: async ({ request }) => {
        try {
          const body = (await readJsonBody(request)) as { ids?: unknown }
          await reorderSubscriptions({ ids: body?.ids })
          return new Response(null, { status: 204 })
        } catch (error) {
          return jsonError(error, "reorder-subscriptions")
        }
      },
      POST: async ({ request }) => {
        try {
          const payload = await createSubscription({
            draft: await readJsonBody(request),
            origin: request.url,
          })
          return Response.json(payload, { status: 201 })
        } catch (error) {
          return jsonError(error, "create-subscription")
        }
      },
    },
  },
})
