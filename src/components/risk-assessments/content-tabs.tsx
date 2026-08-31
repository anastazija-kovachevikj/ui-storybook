"use client"

import { cn } from "@/lib/utils"

export type RiskAssessmentTab = "details" | "items"

type TabDef = {
  id: RiskAssessmentTab
  label: string
  count?: number
}

/**
 * Segmented navigation keeps the workspace switch close to the content.
 */
export function ContentTabs({
  value,
  onValueChange,
  itemCount,
  className,
}: {
  value: RiskAssessmentTab
  onValueChange: (tab: RiskAssessmentTab) => void
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
      aria-label="Risk assessment sections"
      className={cn(
        "inline-flex max-w-full gap-1 rounded-xl bg-muted/70 p-1 ring-1 ring-border/70",
        className
      )}
    >
      {tabs.map((tab) => {
        const selected = value === tab.id
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`ra-tab-${tab.id}`}
            aria-selected={selected}
            aria-controls={`ra-panel-${tab.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onValueChange(tab.id)}
            className={cn(
              "inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              selected
                ? "bg-card text-foreground shadow-sm ring-1 ring-border/70"
                : "text-muted-foreground hover:bg-background/70 hover:text-foreground"
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
