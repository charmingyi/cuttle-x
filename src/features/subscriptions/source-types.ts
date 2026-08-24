import type { SubscriptionSource } from "@/core/subscriptions"

export const SOURCE_TYPE_LABELS: Record<SubscriptionSource["type"], string> = {
  raw: "文本",
  pool: "持久化节点",
  remote: "远程",
  collection: "集合",
  nodes: "节点管理",
}
