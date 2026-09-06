import { normalizeShadowsocks2022Password } from "../base64"
import type { NodeEntity, NodeFormData } from "./types"

export function parseJsonObject(raw: string): Record<string, unknown> {
  if (!raw) return {}
  const value = JSON.parse(raw)
  if (!value || typeof value !== "object" || Array.isArray(value)) return {}
  return value as Record<string, unknown>
}

export function nodeToForm(node: NodeEntity): NodeFormData {
  return {
    name: node.name,
    type: node.type,
    server: node.server,
    port: node.port,
    country: node.country ?? undefined,
    security: node.security ?? undefined,
    transport: node.transport ?? undefined,
    credentials: parseJsonObject(node.credentialJson),
    extra: parseJsonObject(node.extraJson),
  }
}

export function nodeFromForm(id: string, data: NodeFormData, now: string): NodeEntity {
  const type = data.type.trim()
  const credentials = { ...data.credentials }
  const extra = data.extra ?? {}
  if (type === "ss") {
    const cipher = credentials.method ?? credentials.cipher
    credentials.password = normalizeShadowsocks2022Password(cipher, credentials.password)
  }
  return {
    id,
    name: data.name.trim(),
    type,
    server: data.server.trim(),
    port: data.port,
    country: data.country?.trim() || null,
    security: data.security?.trim() || null,
    transport: data.transport?.trim() || null,
    credentialJson: JSON.stringify(credentials),
    extraJson: JSON.stringify(extra),
    sortOrder: null,
    createdAt: now,
    updatedAt: now,
  }
}
