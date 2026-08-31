"use client"

import { useId } from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts"
import { TrendingUp } from "lucide-react"

import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { cn } from "@/lib/utils"

const salesData = [
  { month: "Jan", thisYear: 1000, lastYear: 4800 },
  { month: "Feb", thisYear: 1800, lastYear: 3000 },
  { month: "Mar", thisYear: 3900, lastYear: 4500 },
  { month: "Apr", thisYear: 3400, lastYear: 2000 },
  { month: "May", thisYear: 2000, lastYear: 2900 },
  { month: "Jun", thisYear: 4000, lastYear: 1000 },
  { month: "Jul", thisYear: 2000, lastYear: 0 },
  { month: "Aug", thisYear: 3000, lastYear: 2500 },
  { month: "Sep", thisYear: 2500, lastYear: 4000 },
  { month: "Oct", thisYear: 4500, lastYear: 6000 },
  { month: "Nov", thisYear: 5000, lastYear: 5500 },
  { month: "Dec", thisYear: 6000, lastYear: 7000 },
]

const chartConfig = {
  thisYear: {
    label: "Sales this year",
    color: "var(--chart-1)",
  },
  lastYear: {
    label: "Sales last year",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

/** Year-over-year sales area chart based on Figma Components → Chart. */
export function YearlySalesAreaChart({ className }: { className?: string }) {
  const gradientId = useId().replace(/:/g, "")

  return (
    <section
      data-slot="yearly-sales-area-chart"
      className={cn(
        "w-full rounded-xl bg-card text-card-foreground shadow-sm ring-1 ring-foreground/10",
        className
      )}
      style={{ height: "526px", padding: "32px 30px" }}
      aria-labelledby="yearly-sales-area-chart-title"
    >
      <h2
        id="yearly-sales-area-chart-title"
        className="text-xl leading-6 font-semibold text-foreground"
      >
        Sales Report
      </h2>

      <div className="flex items-center" style={{ marginTop: "28px", gap: "48px" }}>
        <SalesMetric
          label="Sales this year"
          value="$563,489"
          change="+18%"
        />
        <SalesMetric label="Sales last year" value="$438,928" />
      </div>

      <ChartContainer
        config={chartConfig}
        className="w-full"
        style={{ height: "300px", aspectRatio: "auto", marginTop: "42px" }}
        initialDimension={{ width: 866, height: 300 }}
      >
        <AreaChart
          accessibilityLayer
          data={salesData}
          margin={{ top: 8, right: 12, left: 6, bottom: 0 }}
        >
          <defs>
            <linearGradient id={`${gradientId}-this-year`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-thisYear)" stopOpacity={0.22} />
              <stop offset="100%" stopColor="var(--color-thisYear)" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id={`${gradientId}-last-year`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-lastYear)" stopOpacity={0.2} />
              <stop offset="100%" stopColor="var(--color-lastYear)" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid
            vertical={false}
            stroke="var(--border)"
            strokeDasharray="3 3"
          />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tickMargin={14}
            fontSize={14}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickMargin={14}
            width={36}
            fontSize={14}
            domain={[0, 8000]}
            ticks={[0, 2000, 4000, 6000, 8000]}
            tickFormatter={(value) => `${value / 1000}k`}
          />
          <Area
            type="monotone"
            dataKey="thisYear"
            stroke="var(--color-thisYear)"
            strokeWidth={1.5}
            fill={`url(#${gradientId}-this-year)`}
            isAnimationActive={false}
          />
          <Area
            type="monotone"
            dataKey="lastYear"
            stroke="var(--color-lastYear)"
            strokeWidth={1.5}
            fill={`url(#${gradientId}-last-year)`}
            isAnimationActive={false}
          />
        </AreaChart>
      </ChartContainer>
    </section>
  )
}

function SalesMetric({
  label,
  value,
  change,
}: {
  label: string
  value: string
  change?: string
}) {
  return (
    <div className="flex items-center" style={{ gap: "12px" }}>
      <span
        className="flex items-center justify-center rounded-full border border-border text-foreground"
        style={{ width: "60px", height: "60px" }}
        aria-hidden
      >
        <TrendingUp style={{ width: "22px", height: "22px" }} />
      </span>
      <div>
        <p className="m-0 text-base leading-5 text-muted-foreground">{label}</p>
        <div className="flex items-center" style={{ marginTop: "4px", gap: "8px" }}>
          <strong className="text-3xl leading-9 font-semibold text-foreground tabular-nums">
            {value}
          </strong>
          {change ? (
            <span className="rounded-full bg-success-muted px-2 py-0.5 text-xs font-medium text-success">
              {change}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default YearlySalesAreaChart
