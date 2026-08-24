import { createFileRoute } from "@tanstack/react-router"
import { AuditLog } from "@/features/audit"
import { AppShell, ConnectionGate } from "@/features/shell"

export const Route = createFileRoute("/audit")({
  component: AuditPage,
})

function AuditPage() {
  return (
    <AppShell active="audit">
      <ConnectionGate>
        <AuditLog />
      </ConnectionGate>
    </AppShell>
  )
}
