import { createFileRoute, redirect } from "@tanstack/react-router"

/**
 * The workbench was removed: nodes, subscriptions and the audit log cover its flows now. The root
 * keeps existing so old links and the brand mark land somewhere real — the node library, which is
 * where the "import once, reference everywhere" loop starts.
 */
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/nodes", replace: true })
  },
})
