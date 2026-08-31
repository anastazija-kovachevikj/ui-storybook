"use client"

import { Grip } from "lucide-react"

import { cn } from "@/lib/utils"

const salaryMonths = [
  { label: "4 Apr", height: 184, active: false },
  { label: "5 May", height: 230, active: false },
  { label: "6 June", height: 138, active: false },
  { label: "7 July", height: 276, active: true },
  { label: "8 Aug", height: 92, active: false },
  { label: "9 Sept", height: 138, active: false },
] as const

/** Compact employee salary overview based on Figma Components → Chart. */
export function EmployeeSalaryBarChart({ className }: { className?: string }) {
  return (
    <section
      data-slot="employee-salary-bar-chart"
      className={cn(
        "w-full rounded-xl bg-card text-card-foreground shadow-sm ring-1 ring-foreground/10",
        className
      )}
      style={{ height: "574px", padding: "30px" }}
      aria-labelledby="employee-salary-bar-chart-title"
    >
      <header>
        <h2
          id="employee-salary-bar-chart-title"
          className="text-xl leading-7 font-semibold text-foreground"
        >
          Employee Salary
        </h2>
        <p className="mt-1 text-base leading-5 text-muted-foreground">Every month</p>
      </header>

      <div style={{ marginTop: "60px" }}>
        <div className="flex items-end justify-between" style={{ height: "276px" }}>
          {salaryMonths.map((month) => (
            <span
              key={month.label}
              className="shrink-0 rounded-xl"
              style={{
                width: "36px",
                height: `${month.height}px`,
                backgroundColor: month.active
                  ? "var(--chart-1)"
                  : "color-mix(in oklab, var(--chart-1) 20%, var(--background))",
              }}
              aria-label={`${month.label}: ${month.height} salary units`}
            />
          ))}
        </div>
        <div className="flex justify-between" style={{ marginTop: "10px" }} aria-hidden>
          {salaryMonths.map((month) => (
            <span
              key={month.label}
              className="text-sm leading-5 whitespace-nowrap text-muted-foreground"
              style={{ width: "36px", textAlign: "center" }}
            >
              {month.label}
            </span>
          ))}
        </div>
      </div>

      <footer className="flex items-center" style={{ marginTop: "48px", gap: "32px" }}>
        <SalaryMetric label="Total Sales" value="$36,358" color="var(--chart-1)" />
        <SalaryMetric label="Expenses" value="$5,296" color="var(--muted-foreground)" neutral />
      </footer>
    </section>
  )
}

function SalaryMetric({
  label,
  value,
  color,
  neutral = false,
}: {
  label: string
  value: string
  color: string
  neutral?: boolean
}) {
  return (
    <div className="flex items-center" style={{ gap: "14px" }}>
      <span
        className="flex shrink-0 items-center justify-center rounded-lg"
        style={{
          width: "48px",
          height: "48px",
          color,
          backgroundColor: neutral
            ? "var(--muted)"
            : "color-mix(in oklab, var(--chart-1) 10%, var(--background))",
        }}
        aria-hidden
      >
        <Grip style={{ width: "22px", height: "22px" }} />
      </span>
      <span>
        <span className="block text-base leading-5 text-muted-foreground">{label}</span>
        <strong className="block text-xl leading-6 font-semibold text-foreground tabular-nums">
          {value}
        </strong>
      </span>
    </div>
  )
}

export default EmployeeSalaryBarChart
