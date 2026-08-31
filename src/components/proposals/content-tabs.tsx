"use client"

import { cn } from "@/lib/utils"

export type ProposalTab = "details" | "items"

type TabDef = {
  id: ProposalTab
  label: string
  count?: number
}

/**
 * Compact underline tabs — matches Risk Assessments overview / line items pattern.
 */
export function ContentTabs({
  value,
  onValueChange,
  itemCount,
  className,
}: {
  value: ProposalTab
  onValueChange: (tab: ProposalTab) => void
  itemCount?: number
  className?: string
}) {
  const tabs: TabDef[] = [
    { id: "details", label: "Overview" },
    {
      id: "items",
      label: "Line items",
      count: itemCount,
    },
  ]

  return (
    <div
      role="tablist"
      aria-label="Proposal sections"
      className={cn("flex gap-1 border-b border-border", className)}
    >
      {tabs.map((tab) => {
        const selected = value === tab.id
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`prop-tab-${tab.id}`}
            aria-selected={selected}
            aria-controls={`prop-panel-${tab.id}`}
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
