"use client"

import { CircleDollarSign, DollarSign, LifeBuoy, MoreVertical } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { Button } from "@/components/ui/button"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { cn } from "@/lib/utils"

const profitExpenseData = [
  { month: "Jan", profit: 60, earnings: 15 },
  { month: "Feb", profit: 40, earnings: 30 },
  { month: "Mar", profit: 36, earnings: 15 },
  { month: "Apr", profit: 35, earnings: 35 },
  { month: "May", profit: 35, earnings: 25 },
  { month: "Jun", profit: 50, earnings: 50 },
  { month: "Jul", profit: 30, earnings: 30 },
  { month: "Aug", profit: 20, earnings: 40 },
] as const

const chartConfig = {
  profit: { label: "Profit", color: "var(--chart-1)" },
  earnings: { label: "Earnings", color: "var(--chart-2)" },
} satisfies ChartConfig

/** Monthly profit and earnings overview based on Figma Components → Chart. */
export function ProfitExpenseBarChart({ className }: { className?: string }) {
  return (
    <section
      data-slot="profit-expense-bar-chart"
      className={cn(
        "w-full rounded-xl bg-card text-card-foreground shadow-sm ring-1 ring-foreground/10",
        className
      )}
      style={{ height: "490px", padding: "30px" }}
      aria-labelledby="profit-expense-bar-chart-title"
    >
      <header className="flex items-center justify-between">
        <h2
          id="profit-expense-bar-chart-title"
          className="text-xl leading-6 font-semibold text-foreground"
        >
          Profit &amp; Expenses
        </h2>
        <MoreVertical aria-label="More profit and expense options" />
      </header>

      <div
        className="grid items-start"
        style={{ gridTemplateColumns: "minmax(0, 1fr) 262px", gap: "38px", marginTop: "66px" }}
      >
        <ChartContainer
          config={chartConfig}
          className="w-full"
          style={{ height: "320px", aspectRatio: "auto" }}
          initialDimension={{ width: 564, height: 320 }}
        >
          <BarChart
            accessibilityLayer
            data={profitExpenseData}
            margin={{ top: 0, right: 0, left: 14, bottom: 0 }}
          >
            <CartesianGrid vertical={false} stroke="var(--border)" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tickMargin={15}
              fontSize={14}
            />
            <YAxis
              domain={[0, 125]}
              ticks={[0, 25, 50, 75, 100, 125]}
              axisLine={false}
              tickLine={false}
              tickMargin={12}
              width={34}
              fontSize={14}
            />
            <Bar
              dataKey="profit"
              stackId="profit"
              fill="var(--color-profit)"
              stroke="var(--card)"
              strokeWidth={4}
              radius={8}
              barSize={18}
              isAnimationActive={false}
            />
            <Bar
              dataKey="earnings"
              stackId="profit"
              fill="var(--color-earnings)"
              stroke="var(--card)"
              strokeWidth={4}
              radius={8}
              barSize={18}
              isAnimationActive={false}
            />
          </BarChart>
        </ChartContainer>

        <aside
          className="flex flex-col"
          style={{ paddingTop: "4px", gap: "24px" }}
          aria-label="Profit and expense summary"
        >
          <ProfitMetric
            icon={<DollarSign />}
            color="var(--chart-2)"
            label="Earning this year"
          />
          <ProfitMetric
            icon={<CircleDollarSign />}
            color="var(--chart-1)"
            label="Profit this year"
            change="+26.5%"
          />
          <ProfitMetric
            icon={<LifeBuoy />}
            color="var(--foreground)"
            label="Overall earnings"
            neutral
          />
          <Button className="mt-0 h-10 w-fit rounded-full px-5 text-sm" type="button">
            View Full Report
          </Button>
        </aside>
      </div>
    </section>
  )
}

function ProfitMetric({
  icon,
  color,
  label,
  change,
  neutral = false,
}: {
  icon: React.ReactNode
  color: string
  label: string
  change?: string
  neutral?: boolean
}) {
  return (
    <div className="flex items-center" style={{ gap: "14px" }}>
      <span
        className="flex shrink-0 items-center justify-center rounded-xl"
        style={{
          width: "54px",
          height: "54px",
          color,
          backgroundColor: neutral
            ? "var(--muted)"
            : `color-mix(in oklab, ${color} 12%, var(--background))`,
        }}
        aria-hidden
      >
        {icon}
      </span>
      <div className="min-w-0">
        <div className="flex items-center" style={{ gap: "8px" }}>
          <strong className="text-xl leading-6 font-semibold text-foreground tabular-nums">
            $63,489.50
          </strong>
          {change ? (
            <span className="rounded-full bg-success-muted px-2 py-0.5 text-xs leading-4 text-muted-foreground">
              {change}
            </span>
          ) : null}
        </div>
        <p className="m-0 text-base leading-5 text-muted-foreground">{label}</p>
      </div>
    </div>
  )
}

export default ProfitExpenseBarChart
