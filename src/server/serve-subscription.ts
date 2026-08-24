import { TARGET_IDS } from "@/core/nodes"
import type { TargetId } from "@/core/nodes"
import { recordAudit } from "./audit-log"
import { deliveryResponse } from "./delivery-response"
import { subscriptionDelivery } from "./subscription-services"

function text(status: number, message: string) {
  return new Response(message, {
    status,
    headers: { "Cache-Control": "no-store", "Content-Type": "text/plain; charset=utf-8" },
  })
}

export async function serveSubscription(request: Request, token: string): Promise<Response> {
  const startedAt = Date.now()
  try {
    const requestedTarget = new URL(request.url).searchParams.get("target")
    if (requestedTarget && !TARGET_IDS.includes(requestedTarget as TargetId)) {
      return text(400, `Unsupported target: ${requestedTarget}`)
    }

    const outcome = await subscriptionDelivery().deliver(
      token,
      (requestedTarget as TargetId | null) ?? undefined,
      request.headers.get("If-None-Match"),
    )

    switch (outcome.kind) {
      case "not-found":
        return text(404, "Subscription not found")
      case "disabled":
        return text(410, "Subscription disabled")
      case "unavailable":
        console.error("Subscription unavailable", outcome.error)
        return text(502, "Subscription upstream unavailable")
      case "delivered": {
        const { delivery } = outcome
        console.info("Subscription delivered", {
          subscriptionId: delivery.subscription.id,
          target: delivery.artifact.target,
          nodeCount: delivery.artifact.nodeCount,
          stale: delivery.stale,
          durationMs: Date.now() - startedAt,
        })
        // The leak story: a token delivered to some IP is the first fact a compromised link surfaces.
        void recordAudit("delivery", {
          subscriptionId: delivery.subscription.id,
          name: delivery.subscription.name,
          target: delivery.artifact.target,
          nodeCount: delivery.artifact.nodeCount,
          ip:
            request.headers.get("CF-Connecting-IP") ?? request.headers.get("X-Forwarded-For") ?? "",
          ua: (request.headers.get("User-Agent") ?? "").slice(0, 200),
        })
        return deliveryResponse(delivery)
      }
    }
  } catch (error) {
    console.error("Unexpected subscription delivery failure", error)
    return text(500, "Internal server error")
  }
}
