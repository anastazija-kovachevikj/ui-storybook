import {
  FileStack,
  FileText,
  PawPrint,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react"

import type { KpiId, OpsKpi } from "@/components/dashboard/data"
import { KpiCard, KpiCardGroup } from "@/components/dashboard/kpi-card"

const kpiIcons: Record<KpiId, LucideIcon> = {
  claims: FileText,
  risk: ShieldCheck,
  policies: FileStack,
  animals: PawPrint,
}

type DashboardKpiSummaryProps = {
  kpis: OpsKpi[]
  periodLabel: string
}

/**
 * Responsive adapter for the Storybook KPI cards. A grouped desktop row keeps
 * the page compact; the individual card view gives every metric room on mobile.
 */
export function DashboardKpiSummary({
  kpis,
  periodLabel,
}: DashboardKpiSummaryProps) {
  const items = kpis.map((kpi) => ({
    label: kpi.label,
    value: kpi.value,
    period: periodLabel,
    change: kpi.change,
    tone: kpi.tone === "down" ? ("down" as const) : ("up" as const),
    icon: kpiIcons[kpi.id],
  }))

  return (
    <section aria-label="Portfolio summary">
      <div className="hidden xl:block">
        <KpiCardGroup items={items} className="max-w-none shadow-sm" />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:hidden">
        {items.map((item) => (
          <KpiCard
            key={item.label}
            {...item}
            className="h-[var(--kpi-height)] w-full max-w-none shadow-sm"
          />
        ))}
      </div>
    </section>
  )
}
