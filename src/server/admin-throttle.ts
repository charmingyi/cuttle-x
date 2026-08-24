const WINDOW_MS = 15 * 60 * 1000
const LOCK_MS = 15 * 60 * 1000
const FAILURE_LIMIT = 5
const MAX_ENTRIES = 512

interface AttemptState {
  failures: number
  lockedUntil: number
  windowStartedAt: number
}

const attempts = new Map<string, AttemptState>()
let callsSincePrune = 0

function clientKey(request: Request) {
  return request.headers.get("CF-Connecting-IP")?.trim() || "unknown"
}

function prune(now: number) {
  callsSincePrune += 1
  if (callsSincePrune < 128 && attempts.size <= MAX_ENTRIES) return
  callsSincePrune = 0
  for (const [key, state] of attempts) {
    if (state.lockedUntil <= now && state.windowStartedAt + WINDOW_MS <= now) attempts.delete(key)
  }
  while (attempts.size > MAX_ENTRIES) {
    const oldest = attempts.keys().next().value as string | undefined
    if (oldest === undefined) break
    attempts.delete(oldest)
  }
}

/**
 * Per-isolate backoff for the single shared admin password. Cloudflare supplies the client address;
 * local development deliberately falls into one shared bucket. This is a floor under the public
 * password verifier, not a claim of global rate limiting: deployments that need a global boundary
 * should additionally configure a Cloudflare Rate Limiting rule.
 */
export function adminThrottle(request: Request, now = Date.now()) {
  prune(now)
  const key = clientKey(request)
  const state = attempts.get(key)
  return {
    blocked: Boolean(state && state.lockedUntil > now),
    clear() {
      attempts.delete(key)
    },
    fail() {
      const current = attempts.get(key)
      if (!current || current.windowStartedAt + WINDOW_MS <= now) {
        attempts.set(key, { failures: 1, lockedUntil: 0, windowStartedAt: now })
        return false
      }
      current.failures += 1
      if (current.failures >= FAILURE_LIMIT) current.lockedUntil = now + LOCK_MS
      attempts.set(key, current)
      return current.lockedUntil > now
    },
  }
}
