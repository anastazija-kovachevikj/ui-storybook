"use client"

import type { ReactNode } from "react"
import { CalendarClock, ShieldCheck, Stethoscope, UserCheck } from "lucide-react"

import type { VetClinicDetail } from "@/components/vet-clinics/data"
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
  detail: VetClinicDetail
  className?: string
}) {
  const total = detail.veterinarians.length
  const active = detail.veterinarians.filter((vet) => vet.status === "Active").length
  const inactive = total - active

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
          label="Veterinarians"
          value={total === 0 ? "None yet" : `${total}`}
          hint="On this clinic"
          icon={<Stethoscope className="size-3" aria-hidden />}
        />
      </div>
      <div className="border-b border-border sm:border-r sm:border-b-0">
        <Metric
          label="Active"
          value={`${active}`}
          hint={inactive > 0 ? `${inactive} inactive` : "All active"}
          icon={<UserCheck className="size-3" aria-hidden />}
        />
      </div>
      <div className="border-b border-border sm:border-r sm:border-b-0">
        <Metric
          label="Status"
          value={detail.status}
          icon={<ShieldCheck className="size-3 text-success" aria-hidden />}
          emphasize={detail.status === "Active"}
        />
      </div>
      <div>
        <Metric
          label="Last updated"
          value={detail.updatedAt}
          hint={`Created ${detail.createdAt}`}
          icon={<CalendarClock className="size-3" aria-hidden />}
        />
      </div>
    </section>
  )
}
