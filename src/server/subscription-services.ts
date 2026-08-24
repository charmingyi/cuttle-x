import { env } from "cloudflare:workers"
import { SubscriptionDelivery, SubscriptionPublishing } from "@/core/subscriptions"
import { createNodeRepository } from "@/platform/d1/node-repository"
import { D1SubscriptionRepository } from "@/platform/d1/subscription-repository"
import { resolvePublicHostname } from "@/platform/dns"
import { AesSubscriptionTokenProtector } from "./subscription-token-protector"

function repository() {
  return new D1SubscriptionRepository(
    env.DB,
    new AesSubscriptionTokenProtector(env.CUTTLE_LINK_KEY),
  )
}

export function subscriptionPublishing() {
  return new SubscriptionPublishing(repository())
}

export function subscriptionDelivery() {
  const nodeRepo = createNodeRepository(env.DB)
  return new SubscriptionDelivery(repository(), {
    resolveHost: resolvePublicHostname,
    findNodesByIds: (ids) => nodeRepo.findByIds(ids),
  })
}
