"use client"

import { ChevronDown, Globe2, House } from "lucide-react"
import { Bar, ComposedChart, Line, XAxis, YAxis } from "recharts"

import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { cn } from "@/lib/utils"

const salesData = [
  { month: "Jan", sales: 52 },
  { month: "", sales: 52 },
  { month: "", sales: 37 },
  { month: "Feb", sales: 53 },
  { month: "", sales: 52 },
  { month: "", sales: 60 },
  { month: "Mar", sales: 75 },
  { month: "", sales: 75 },
  { month: "", sales: 96 },
  { month: "Apr", sales: 95 },
  { month: "", sales: 87 },
  { month: "", sales: 76 },
  { month: "May", sales: 66 },
  { month: "", sales: 57 },
  { month: "", sales: 57 },
  { month: "Jun", sales: 57 },
  { month: "", sales: 48 },
  { month: "", sales: 70 },
  { month: "Jul", sales: 71 },
  { month: "", sales: 83 },
  { month: "", sales: 92 },
  { month: "Aug", sales: 92 },
  { month: "", sales: 71 },
  { month: "", sales: 71 },
  { month: "", sales: 53 },
]

const chartConfig = {
  sales: {
    label: "Sales",
    color: "var(--chart-1)",
  },
  volume: {
    label: "Sales volume",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

/** Online and offline sales comparison based on Figma Components → Chart. */
export function SalesComparisonAreaChart({ className }: { className?: string }) {
  return (
    <section
      data-slot="sales-comparison-area-chart"
      className={cn(
        "w-full rounded-xl bg-card text-card-foreground shadow-sm ring-1 ring-foreground/10",
        className
      )}
      style={{ height: "518px", padding: "30px" }}
      aria-labelledby="sales-comparison-area-chart-title"
    >
      <header className="flex items-start justify-between" style={{ gap: "24px" }}>
        <div>
          <h2
            id="sales-comparison-area-chart-title"
            className="text-lg leading-6 font-medium text-muted-foreground"
          >
            Total Sales
          </h2>
          <div className="flex items-center" style={{ marginTop: "6px", gap: "10px" }}>
            <strong className="text-3xl leading-9 font-semibold text-foreground tabular-nums">
              $12,150.00
            </strong>
            <span className="rounded-full bg-success-muted px-2 py-1 text-sm leading-4 font-medium text-success">
              +22%
            </span>
            <span className="text-sm leading-4 text-muted-foreground">
              compared to last year
            </span>
          </div>
        </div>
        <div
          className="flex shrink-0 items-center rounded-lg border border-border bg-background text-base font-medium text-foreground"
          style={{ height: "42px", padding: "0 12px", gap: "14px" }}
          aria-label="Selected year: 2026"
        >
          2026
          <ChevronDown aria-hidden style={{ width: "16px", height: "16px" }} />
        </div>
      </header>

      <div className="border-t border-border" style={{ marginTop: "28px" }} />

      <div className="flex flex-col" style={{ marginTop: "24px", gap: "16px" }}>
        <SalesMetric
          icon={<Globe2 />}
          label="Online store"
          value="$8,450.00"
          change="+10%"
        />
        <SalesMetric
          icon={<House />}
          label="Offline store"
          value="$3,700.00"
          change="-5%"
          decreasing
        />
      </div>

      <ChartContainer
        config={chartConfig}
        className="w-full"
        style={{ height: "230px", aspectRatio: "auto", marginTop: "32px" }}
        initialDimension={{ width: 866, height: 230 }}
      >
        <ComposedChart
          accessibilityLayer
          data={salesData}
          margin={{ top: 0, right: 4, left: 4, bottom: 0 }}
        >
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tickMargin={14}
            fontSize={14}
          />
          <YAxis domain={[0, 110]} hide />
          <Bar
            dataKey="sales"
            fill="var(--color-volume)"
            fillOpacity={0.16}
            barSize={24}
            radius={0}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="var(--color-sales)"
            strokeWidth={2.5}
            dot={false}
            activeDot={false}
            isAnimationActive={false}
          />
        </ComposedChart>
      </ChartContainer>
    </section>
  )
}

function SalesMetric({
  icon,
  label,
  value,
  change,
  decreasing = false,
}: {
  icon: React.ReactNode
  label: string
  value: string
  change: string
  decreasing?: boolean
}) {
  return (
    <div className="flex items-center justify-between" style={{ gap: "24px" }}>
      <span className="flex items-center" style={{ gap: "12px" }}>
        <span className="text-foreground" aria-hidden>
          {icon}
        </span>
        <span className="text-lg leading-6 text-muted-foreground">{label}</span>
      </span>
      <span className="flex items-center" style={{ gap: "20px" }}>
        <strong className="text-lg leading-6 font-semibold text-foreground tabular-nums">
          {value}
        </strong>
        <span
          className={cn(
            "text-sm leading-4 font-medium",
            decreasing ? "text-destructive" : "text-success"
          )}
        >
          {change}
        </span>
      </span>
    </div>
  )
}

export default SalesComparisonAreaChart
