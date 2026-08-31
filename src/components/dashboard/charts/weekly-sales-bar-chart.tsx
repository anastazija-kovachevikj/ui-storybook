"use client"

import { EllipsisVertical, TrendingUp } from "lucide-react"

import { cn } from "@/lib/utils"

const weeklySales = [
  { day: "Mon", value: 136, active: false },
  { day: "Tue", value: 226, active: true },
  { day: "Wed", value: 163, active: false },
  { day: "Thu", value: 136, active: false },
  { day: "Fri", value: 208, active: false },
  { day: "Sat", value: 182, active: false },
] as const

/** Compact weekly sales chart based on Figma Components → Chart. */
export function WeeklySalesBarChart({ className }: { className?: string }) {
  return (
    <section
      data-slot="weekly-sales-bar-chart"
      className={cn(
        "w-full rounded-xl bg-card text-card-foreground shadow-sm ring-1 ring-foreground/10",
        className
      )}
      style={{ height: "522px", padding: "32px 28px" }}
      aria-labelledby="weekly-sales-bar-chart-title"
    >
      <div className="flex items-center justify-between">
        <h2
          id="weekly-sales-bar-chart-title"
          className="text-xl leading-6 font-semibold text-foreground"
        >
          Weekly Sales
        </h2>
        <EllipsisVertical className="size-5 text-foreground" aria-label="More options" />
      </div>

      <div className="flex items-center" style={{ marginTop: "36px", gap: "12px" }}>
        <span
          className="flex items-center justify-center rounded-full border border-border text-foreground"
          style={{ width: "60px", height: "60px" }}
          aria-hidden
        >
          <TrendingUp style={{ width: "22px", height: "22px" }} />
        </span>
        <div>
          <div className="flex items-center" style={{ gap: "8px" }}>
            <strong className="text-3xl leading-9 font-semibold text-foreground tabular-nums">
              $96,850
            </strong>
            <span className="rounded-full bg-warning-muted px-2 py-0.5 text-xs font-medium text-warning">
              -5%
            </span>
          </div>
          <p className="m-0 text-base leading-5 text-muted-foreground">Last 7 days</p>
        </div>
      </div>

      <div className="flex items-end justify-between" style={{ height: "226px", marginTop: "74px" }}>
        {weeklySales.map((item) => (
          <span
            key={item.day}
            className="rounded-full"
            style={{
              width: "34px",
              height: `${item.value}px`,
              backgroundColor: item.active ? "var(--chart-1)" : "var(--secondary)",
            }}
            aria-label={`${item.day}: ${item.value} sales units`}
          />
        ))}
      </div>
      <div className="flex justify-between" style={{ marginTop: "14px" }} aria-hidden>
        {weeklySales.map((item) => (
          <span
            key={item.day}
            className="text-sm leading-5 text-muted-foreground"
            style={{ width: "34px", textAlign: "center" }}
          >
            {item.day}
          </span>
        ))}
      </div>
    </section>
  )
}

export default WeeklySalesBarChart
