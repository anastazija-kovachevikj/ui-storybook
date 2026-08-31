"use client"

import type { ReactNode } from "react"
import { Layers, ShieldCheck, Wallet } from "lucide-react"

import {
  formatRsd,
  type RiskAssessmentDetail,
} from "@/components/risk-assessments/data"
import { cn } from "@/lib/utils"

function Metric({
  label,
  value,
  hint,
  icon,
  emphasize,
}: {
  label: string
  value: string
  hint?: string
  icon?: ReactNode
  emphasize?: boolean
}) {
  return (
    <div className="min-w-0 px-4 py-3.5 sm:px-5">
      <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        {icon}
        {label}
      </div>
      <p
        className={cn(
          "mt-1.5 truncate font-semibold tracking-tight tabular-nums text-foreground",
          emphasize ? "text-base text-success sm:text-lg" : "text-sm sm:text-base"
        )}
      >
        {value}
      </p>
      {hint && (
        <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{hint}</p>
      )}
    </div>
  )
}

/**
 * Always-visible key figures so users orient without opening cards or tabs.
 */
export function SummaryMetrics({
  detail,
  className,
}: {
  detail: RiskAssessmentDetail
  className?: string
}) {
  const itemCount = detail.items.length

  return (
    <section
      aria-label="Key figures"
      className={cn(
        "grid grid-cols-2 overflow-hidden bg-transparent sm:grid-cols-4",
        className
      )}
    >
      <div className="border-b border-border/70 sm:border-r sm:border-b-0">
        <Metric
          label="Sum insured"
          value={formatRsd(detail.sumInsured)}
          icon={<Wallet className="size-3" aria-hidden />}
        />
      </div>
      <div className="border-b border-border/70 sm:border-r sm:border-b-0">
        <Metric
          label="Premium (net)"
          value={formatRsd(detail.premiumNet)}
        />
      </div>
      <div className="border-b border-border/70 sm:border-r sm:border-b-0">
        <Metric
          label="Est. subsidy"
          value={`${formatRsd(detail.subsidyMin)} – ${formatRsd(detail.subsidyMax)}`}
          hint={`${detail.subsidyPercentMin}–${detail.subsidyPercentMax}% of premium`}
          icon={<ShieldCheck className="size-3 text-success" aria-hidden />}
          emphasize
        />
      </div>
      <div>
        <Metric
          label="Line items"
          value={
            itemCount === 0
              ? "None yet"
              : `${itemCount} item${itemCount === 1 ? "" : "s"}`
          }
          icon={<Layers className="size-3" aria-hidden />}
        />
      </div>
    </section>
  )
}
