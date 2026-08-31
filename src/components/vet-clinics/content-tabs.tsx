"use client"

import { cn } from "@/lib/utils"

export type VetClinicTab = "details" | "veterinarians"

type TabDef = {
  id: VetClinicTab
  label: string
  count?: number
}

/**
 * Compact underline tabs — matches Proposals / Risk Assessments.
 */
export function ContentTabs({
  value,
  onValueChange,
  veterinarianCount,
  className,
}: {
  value: VetClinicTab
  onValueChange: (tab: VetClinicTab) => void
  veterinarianCount?: number
  className?: string
}) {
  const tabs: TabDef[] = [
    { id: "details", label: "Overview" },
    {
      id: "veterinarians",
      label: "Veterinarians",
      count: veterinarianCount,
    },
  ]

  return (
    <div
      role="tablist"
      aria-label="Vet clinic sections"
      className={cn("flex gap-1 border-b border-border", className)}
    >
      {tabs.map((tab) => {
        const selected = value === tab.id
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`clinic-tab-${tab.id}`}
            aria-selected={selected}
            aria-controls={`clinic-panel-${tab.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onValueChange(tab.id)}
            className={cn(
              "relative -mb-px inline-flex items-center gap-2 px-3.5 py-2.5 text-sm font-medium transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              selected
                ? "border-b-2 border-primary text-foreground"
                : "border-b-2 border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
            {typeof tab.count === "number" && (
              <span
                className={cn(
                  "inline-flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-[11px] font-semibold tabular-nums",
                  selected
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
