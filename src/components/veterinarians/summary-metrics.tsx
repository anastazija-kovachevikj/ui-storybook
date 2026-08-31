"use client"

import type { ReactNode } from "react"
import { BriefcaseMedical, Building2, IdCard, ShieldCheck } from "lucide-react"

import {
  displayValue,
  type VeterinarianDetail,
} from "@/components/veterinarians/data"
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
  const empty = value === "—"
  return (
    <div className="min-w-0 px-4 py-3.5 sm:px-5">
      <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        {icon}
        {label}
      </div>
      <p
        className={cn(
          "mt-1.5 truncate font-semibold tracking-tight text-foreground",
          emphasize ? "text-base text-success sm:text-lg" : "text-sm sm:text-base",
          empty && "text-muted-foreground/60"
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
 * Always-visible key figures so users orient without opening cards.
 * Same role as Proposals / Risk Assessments SummaryMetrics.
 */
export function SummaryMetrics({
  detail,
  className,
}: {
  detail: VeterinarianDetail
  className?: string
}) {
  return (
    <section
      aria-label="Key figures"
      className={cn(
        "grid grid-cols-2 overflow-hidden rounded-xl bg-card ring-1 ring-border sm:grid-cols-4",
        className
      )}
    >
      <div className="border-b border-border sm:border-r sm:border-b-0">
        <Metric
          label="License"
          value={displayValue(detail.licenseNumber)}
          icon={<IdCard className="size-3" aria-hidden />}
        />
      </div>
      <div className="border-b border-border sm:border-r sm:border-b-0">
        <Metric
          label="Specialization"
          value={displayValue(detail.specialization)}
          icon={<BriefcaseMedical className="size-3" aria-hidden />}
        />
      </div>
      <div className="border-b border-border sm:border-r sm:border-b-0">
        <Metric
          label="Assigned clinic"
          value={detail.assignedClinic?.name ?? "—"}
          hint={detail.assignedClinic ? detail.assignedClinic.status : undefined}
          icon={<Building2 className="size-3" aria-hidden />}
        />
      </div>
      <div>
        <Metric
          label="Status"
          value={detail.status}
          hint={`Created ${detail.createdAt}`}
          icon={<ShieldCheck className="size-3 text-success" aria-hidden />}
          emphasize={detail.status === "Active"}
        />
      </div>
    </section>
  )
}
