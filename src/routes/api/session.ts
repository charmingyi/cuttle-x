import { createFileRoute } from "@tanstack/react-router"
import { adminOnly } from "@/middleware/admin-only.server"
import { noStore } from "@/middleware/no-store.server"

/**
 * A deliberately empty authenticated request. The browser uses it before committing the single-user
 * password to its session, so a typo never becomes a remembered credential. Management requests keep
 * using the same `adminOnly` middleware; this route is a proof of that door, not a second auth system.
 */
export const Route = createFileRoute("/api/session")({
  server: {
    middleware: [noStore, adminOnly],
    handlers: {
      POST: () => new Response(null, { status: 204 }),
    },
  },
})
