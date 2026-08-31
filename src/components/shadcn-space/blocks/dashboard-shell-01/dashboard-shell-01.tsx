"use client"

import { Dashboard } from "@/components/dashboard/dashboard"

export function DashboardShell01({ className }: { className?: string }) {
  return <Dashboard variant="analytics" className={className} />
}

export default DashboardShell01
