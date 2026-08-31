"use client"

import type { ReactNode } from "react"
import { CircleDollarSign, Clock3, RefreshCw } from "lucide-react"

import { cn } from "@/lib/utils"

type SummaryMetricProps = {
  label: string
  value: string
  change: string
  icon: ReactNode
  color: string
}

const summaryMetrics: SummaryMetricProps[] = [
  {
    label: "Refunds",
    value: "434",
    change: "-12%",
    icon: <RefreshCw className="size-5" strokeWidth={1.8} />,
    color: "var(--primary)",
  },
  {
    label: "Sales",
    value: "2358",
    change: "+23%",
    icon: <Clock3 className="size-5" strokeWidth={1.8} />,
    color: "var(--destructive)",
  },
  {
    label: "Earnings",
    value: "$245k",
    change: "-12%",
    icon: <CircleDollarSign className="size-5" strokeWidth={1.8} />,
    color: "var(--success)",
  },
]

function SummaryMetric({ label, value, change, icon, color }: SummaryMetricProps) {
  const tintedSurface = `color-mix(in oklab, ${color} 10%, var(--background))`

  return (
    <article
      className="flex h-[184px] min-w-0 flex-col justify-between rounded-xl p-6"
      style={{ backgroundColor: tintedSurface }}
    >
      <div
        className="flex size-10 items-center justify-center rounded-lg"
        style={{ backgroundColor: tintedSurface, color }}
        aria-hidden="true"
      >
        {icon}
      </div>

      <div className="space-y-1">
        <div className="flex items-baseline gap-2">
          <p className="text-lg font-semibold leading-7 tracking-tight text-foreground">{value}</p>
          <span
            className="rounded-md px-1.5 py-0.5 text-xs font-medium leading-none text-muted-foreground"
            style={{ backgroundColor: tintedSurface }}
          >
            {change}
          </span>
        </div>
        <p className="text-sm leading-5 text-muted-foreground">{label}</p>
      </div>
    </article>
  )
}

export function DashboardSummaryHeader({ className }: { className?: string }) {
  return (
    <section
      className={cn("flex w-full items-center gap-6 px-16", className)}
      aria-label="Dashboard summary"
    >
      <article className="flex h-[184px] w-[564px] shrink-0 flex-col rounded-xl bg-primary px-6 py-6 text-primary-foreground shadow-sm ring-1 ring-foreground/10">
        <div>
          <h2 className="text-lg font-semibold leading-7 tracking-tight">Welcome Jonathan Deo</h2>
          <p className="text-sm leading-5 text-primary-foreground/50">Check all the statastics</p>
        </div>

        <div className="mt-auto flex h-[68px] w-[185px] overflow-hidden rounded-lg bg-foreground/10">
          <div className="flex w-1/2 flex-col justify-center px-3">
            <p className="text-lg font-semibold leading-6">573</p>
            <p className="text-xs leading-4 text-primary-foreground/60">New Leads</p>
          </div>
          <div className="flex w-1/2 flex-col justify-center border-l border-primary-foreground/20 px-3">
            <p className="text-lg font-semibold leading-6">87%</p>
            <p className="text-xs leading-4 text-primary-foreground/60">Conversion</p>
          </div>
        </div>
      </article>

      <div className="grid min-w-0 flex-1 grid-cols-3 gap-6">
        {summaryMetrics.map((metric) => (
          <SummaryMetric key={metric.label} {...metric} />
        ))}
      </div>
    </section>
  )
}
