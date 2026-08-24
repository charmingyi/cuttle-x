import { MAX_SOURCE_SIZE, parseProcessors, TARGET_IDS } from "@/core/nodes"
import type { TargetId } from "@/core/nodes"
import { asRecord } from "@/core/nodes/values"
import { fail, onlyKeys, text } from "@/core/validation"
import type { SubscriptionDraft, SubscriptionSource } from "./types"

export const MAX_REMOTE_URLS = 32
export const MAX_COLLECTION_MEMBERS = 64
export const MAX_NODES_IDS = 256
export const MAX_SUBSCRIPTION_NAME_LENGTH = 100

/** Optional folder/group: empty and whitespace both mean "ungrouped". */
function folderField(value: unknown): string | undefined {
  if (value == null) return undefined
  if (typeof value !== "string") fail("folder must be a string.")
  if (value.length > MAX_SUBSCRIPTION_NAME_LENGTH) {
    fail(`folder must not exceed ${MAX_SUBSCRIPTION_NAME_LENGTH} characters.`)
  }
  const output = value.trim()
  return output.length > 0 ? output : undefined
}

export function parseSubscriptionSource(value: unknown): SubscriptionSource {
  const input = asRecord(value) ?? fail("source must be an object.")
  if (input.type === "raw") {
    onlyKeys(input, ["type", "content"], "source")
    const content = text(input.content, "source.content", MAX_SOURCE_SIZE, true)
    if (new TextEncoder().encode(content).byteLength > MAX_SOURCE_SIZE) {
      fail("source.content must not exceed 2 MiB.")
    }
    return { type: "raw", content }
  }
  if (input.type === "pool") {
    onlyKeys(input, ["type", "content"], "source")
    const content = text(input.content, "source.content", MAX_SOURCE_SIZE, true)
    if (new TextEncoder().encode(content).byteLength > MAX_SOURCE_SIZE) {
      fail("source.content must not exceed 2 MiB.")
    }
    return { type: "pool", content }
  }
  if (input.type === "collection") {
    onlyKeys(input, ["type", "memberIds"], "source")
    if (!Array.isArray(input.memberIds) || input.memberIds.length === 0) {
      fail("source.memberIds must be a non-empty array.")
    }
    if (input.memberIds.length > MAX_COLLECTION_MEMBERS) {
      fail(`source.memberIds may hold at most ${MAX_COLLECTION_MEMBERS} members.`)
    }
    const memberIds = input.memberIds.map((entry, index) =>
      text(entry, `source.memberIds[${index}]`, 128),
    )
    if (new Set(memberIds).size !== memberIds.length) {
      fail("source.memberIds must not contain duplicates.")
    }
    return { type: "collection", memberIds }
  }
  if (input.type === "remote") {
    onlyKeys(input, ["type", "urls"], "source")
    if (!Array.isArray(input.urls) || input.urls.length === 0) {
      fail("source.urls must be a non-empty array.")
    }
    if (input.urls.length > MAX_REMOTE_URLS) {
      fail(`source.urls may hold at most ${MAX_REMOTE_URLS} links.`)
    }
    const urls = input.urls.map((entry, index) => {
      const rawUrl = text(entry, `source.urls[${index}]`, 4096)
      let url: URL
      try {
        url = new URL(rawUrl)
      } catch {
        return fail(`source.urls[${index}] is not a valid URL.`)
      }
      if (!["http:", "https:"].includes(url.protocol)) {
        fail(`source.urls[${index}] may only use HTTP(S).`)
      }
      if (url.username || url.password)
        fail(`source.urls[${index}] must not carry user information.`)
      return url.toString()
    })
    return { type: "remote", urls }
  }
  if (input.type === "nodes") {
    onlyKeys(input, ["type", "ids"], "source")
    if (!Array.isArray(input.ids) || input.ids.length === 0) {
      fail("source.ids must be a non-empty array.")
    }
    if (input.ids.length > MAX_NODES_IDS) {
      fail(`source.ids may hold at most ${MAX_NODES_IDS} IDs.`)
    }
    const ids = input.ids.map((entry, index) => text(entry, `source.ids[${index}]`, 128))
    if (new Set(ids).size !== ids.length) {
      fail("source.ids must not contain duplicates.")
    }
    return { type: "nodes", ids }
  }
  return fail("source.type must be raw, pool, remote, collection or nodes.")
}

function target(value: unknown): TargetId {
  if (!TARGET_IDS.includes(value as TargetId)) {
    fail(`defaultTarget must be one of ${TARGET_IDS.join(", ")}.`)
  }
  return value as TargetId
}

const DRAFT_KEYS = ["name", "folder", "source", "defaultTarget", "processors", "enabled"]

function fieldsBeforeSource(input: Record<string, unknown>) {
  if (input.enabled != null && typeof input.enabled !== "boolean")
    fail("enabled must be a boolean.")
  const processors = parseProcessors(input.processors ?? [])
  return {
    name: text(input.name, "name", MAX_SUBSCRIPTION_NAME_LENGTH),
    folder: folderField(input.folder),
    processors: processors.length > 0 ? processors : undefined,
    enabled: input.enabled !== false,
  }
}

export function parseSubscriptionMetadata(value: unknown): Omit<SubscriptionDraft, "source"> {
  const input = asRecord(value) ?? fail("A subscription definition must be an object.")
  const fields = fieldsBeforeSource(input)
  return { ...fields, defaultTarget: target(input.defaultTarget) }
}

export function parseSubscriptionDraft(value: unknown): SubscriptionDraft {
  const input = asRecord(value) ?? fail("A subscription definition must be an object.")
  onlyKeys(input, DRAFT_KEYS, "The subscription definition")
  const fields = fieldsBeforeSource(input)
  const source = parseSubscriptionSource(input.source)
  return { ...fields, source, defaultTarget: target(input.defaultTarget) }
}

export function parseSubscriptionUpdate(current: SubscriptionDraft, value: unknown) {
  const input = asRecord(value) ?? fail("A subscription update must be an object.")
  const allowed = new Set(DRAFT_KEYS)
  if (!Object.keys(input).some((key) => allowed.has(key)))
    fail("The subscription update has no modifiable field.")
  return parseSubscriptionDraft({
    name: current.name,
    folder: current.folder,
    source: current.source,
    defaultTarget: current.defaultTarget,
    processors: current.processors,
    enabled: current.enabled,
    ...input,
  })
}
