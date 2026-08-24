import { env } from "cloudflare:workers"
import type { NodeRepository } from "@/core/nodes/entity"
import { createNodeRepository } from "@/platform/d1/node-repository"

export function nodeRepository(): NodeRepository {
  return createNodeRepository(env.DB)
}
