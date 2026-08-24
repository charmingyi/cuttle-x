import { createFileRoute } from "@tanstack/react-router"
import { NodeManager } from "@/features/nodes"
import { AppShell, ConnectionGate } from "@/features/shell"

export const Route = createFileRoute("/nodes")({
  component: NodesPage,
})

function NodesPage() {
  return (
    <AppShell active="nodes">
      <ConnectionGate>
        <NodeManager />
      </ConnectionGate>
    </AppShell>
  )
}
