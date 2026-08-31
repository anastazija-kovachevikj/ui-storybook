"use client"

import { ChevronDown, LayoutGrid } from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts"

import { Button } from "@/components/ui/button"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { cn } from "@/lib/utils"

const revenueData = [
  { date: "16/08", earnings: 1450, expenses: -1750 },
  { date: "17/08", earnings: 2850, expenses: -1100 },
  { date: "18/08", earnings: 2200, expenses: -2450 },
  { date: "19/08", earnings: 3200, expenses: -1500 },
  { date: "20/08", earnings: 1450, expenses: -600 },
  { date: "21/08", earnings: 950, expenses: -1750 },
  { date: "22/08", earnings: 1350, expenses: -1200 },
]

const chartConfig = {
  earnings: {
    label: "Earnings",
    color: "var(--chart-1)",
  },
  expenses: {
    label: "Expenses",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

/** Daily earnings and expense comparison based on Figma Components → Chart. */
export function RevenueVsExpensesChart({ className }: { className?: string }) {
  return (
    <section
      data-slot="revenue-vs-expenses-chart"
      className={cn(
        "w-full rounded-xl bg-card text-card-foreground shadow-sm ring-1 ring-foreground/10",
        className
      )}
      style={{ height: "548px", padding: "30px" }}
      aria-labelledby="revenue-vs-expenses-chart-title"
    >
      <header className="flex items-start justify-between" style={{ gap: "24px" }}>
        <div>
          <h2
            id="revenue-vs-expenses-chart-title"
            className="text-xl leading-6 font-semibold text-foreground"
          >
            Revenue Updates
          </h2>
          <p className="m-0 mt-2 text-base leading-5 text-muted-foreground">
            Overview of profit
          </p>
        </div>
        <div
          className="flex shrink-0 items-center rounded-lg border border-border bg-background text-sm font-medium text-foreground"
          style={{ height: "42px", padding: "0 12px", gap: "18px" }}
          aria-label="Selected period: March 2026"
        >
          March 2026
          <ChevronDown aria-hidden style={{ width: "16px", height: "16px" }} />
        </div>
      </header>

      <div className="flex" style={{ marginTop: "44px", gap: "32px" }}>
        <ChartContainer
          config={chartConfig}
          className="min-w-0 flex-1"
          style={{ height: "366px", aspectRatio: "auto" }}
          initialDimension={{ width: 540, height: 366 }}
        >
          <BarChart
            accessibilityLayer
            data={revenueData}
            margin={{ top: 4, right: 2, left: 4, bottom: 0 }}
          >
            <CartesianGrid
              vertical={false}
              stroke="var(--border)"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tickMargin={14}
              fontSize={14}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={12}
              width={38}
              fontSize={14}
              domain={[-3000, 3000]}
              ticks={[-3000, -2000, -1000, 0, 1000, 2000, 3000]}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Bar
              dataKey="earnings"
              barSize={12}
              shape={(props) => <DivergingRevenueBar {...(props as DivergingBarProps)} />}
              isAnimationActive={false}
            />
          </BarChart>
        </ChartContainer>

        <aside
          className="flex shrink-0 flex-col"
          style={{ width: "242px", height: "366px" }}
          aria-label="Earnings summary"
        >
          <div className="flex items-center" style={{ gap: "14px" }}>
            <span
              className="flex items-center justify-center rounded-lg bg-primary/10 text-primary"
              style={{ width: "48px", height: "48px" }}
              aria-hidden
            >
              <LayoutGrid style={{ width: "21px", height: "21px" }} />
            </span>
            <div>
              <strong className="block text-2xl leading-7 font-semibold text-foreground tabular-nums">
                $63,489.50
              </strong>
              <p className="m-0 mt-1 text-sm leading-4 text-muted-foreground">
                Total Earnings
              </p>
            </div>
          </div>

          <div className="flex flex-col" style={{ marginTop: "44px", gap: "26px" }}>
            <SummaryMetric
              color="var(--chart-1)"
              label="Earnings this month"
              value="$48,820"
            />
            <SummaryMetric
              color="var(--chart-2)"
              label="Expense this month"
              value="$26,498"
            />
          </div>

          <Button
            className="mt-auto w-full bg-foreground text-background hover:bg-foreground/90"
            style={{ height: "42px" }}
          >
            View Full Report
          </Button>
        </aside>
      </div>
    </section>
  )
}

type DivergingBarProps = {
  x?: number
  y?: number
  width?: number
  height?: number
  payload?: {
    earnings: number
    expenses: number
  }
}

function DivergingRevenueBar({
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  payload,
}: DivergingBarProps) {
  const zeroLine = y + height
  const scale = height / (payload?.earnings || 1)
  const expenseHeight = Math.max(Math.abs(payload?.expenses || 0) * scale - 2, 0)
  const positiveHeight = Math.max(height - 2, 0)

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={positiveHeight}
        rx={5}
        ry={5}
        fill="var(--color-earnings)"
      />
      <rect
        x={x}
        y={zeroLine + 2}
        width={width}
        height={expenseHeight}
        rx={5}
        ry={5}
        fill="var(--color-expenses)"
      />
    </g>
  )
}

function SummaryMetric({
  color,
  label,
  value,
}: {
  color: string
  label: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between" style={{ gap: "12px" }}>
      <span className="flex min-w-0 items-center" style={{ gap: "10px" }}>
        <i
          className="block shrink-0 rounded-full"
          style={{ width: "10px", height: "10px", backgroundColor: color }}
          aria-hidden
        />
        <span className="text-base leading-5 text-muted-foreground">{label}</span>
      </span>
      <strong className="shrink-0 text-base leading-5 font-semibold text-foreground tabular-nums">
        {value}
      </strong>
    </div>
  )
}

export default RevenueVsExpensesChart
