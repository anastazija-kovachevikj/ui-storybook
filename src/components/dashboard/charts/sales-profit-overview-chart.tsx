"use client"

import { useState } from "react"
import {
  CircleDollarSign,
  Flag,
  PieChart,
  TrendingUp,
} from "lucide-react"
import { Line, LineChart, XAxis, YAxis } from "recharts"

import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { cn } from "@/lib/utils"

const ordersData = [
  { month: "Jan", sales: 54, comparison: 47 },
  { month: "Feb", sales: 58, comparison: 44 },
  { month: "Mar", sales: 78, comparison: 68 },
  { month: "Apr", sales: 58, comparison: 90 },
  { month: "May", sales: 104, comparison: 65 },
  { month: "Jun", sales: 76, comparison: 104 },
  { month: "Jul", sales: 58, comparison: 70 },
  { month: "Aug", sales: 69, comparison: 70 },
  { month: "Sep", sales: 89, comparison: 65 },
]

const expensesData = [
  { month: "Jan", sales: 46, comparison: 62 },
  { month: "Feb", sales: 50, comparison: 55 },
  { month: "Mar", sales: 64, comparison: 73 },
  { month: "Apr", sales: 55, comparison: 86 },
  { month: "May", sales: 78, comparison: 62 },
  { month: "Jun", sales: 64, comparison: 90 },
  { month: "Jul", sales: 52, comparison: 68 },
  { month: "Aug", sales: 61, comparison: 74 },
  { month: "Sep", sales: 72, comparison: 58 },
]

const chartConfig = {
  sales: {
    label: "Sales",
    color: "var(--chart-1)",
  },
  comparison: {
    label: "Comparison",
    color: "var(--muted-foreground)",
  },
} satisfies ChartConfig

type OverviewTab = "orders" | "expenses"

/** Sales and profit overview based on Figma Components → Chart. */
export function SalesProfitOverviewChart({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<OverviewTab>("orders")
  const data = activeTab === "orders" ? ordersData : expensesData

  return (
    <section
      data-slot="sales-profit-overview-chart"
      className={cn(
        "w-full rounded-xl bg-card text-card-foreground shadow-sm ring-1 ring-foreground/10",
        className
      )}
      style={{ height: "458px", padding: "30px" }}
      aria-labelledby="sales-profit-overview-chart-title"
    >
      <div className="flex h-full" style={{ gap: "34px" }}>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-start justify-between" style={{ gap: "24px" }}>
            <div>
              <p className="m-0 text-base leading-5 text-muted-foreground">
                Overall Balance
              </p>
              <h2
                id="sales-profit-overview-chart-title"
                className="mt-2 text-4xl leading-10 font-semibold tracking-tight text-foreground tabular-nums"
              >
                $2,538,942
              </h2>
              <div className="flex items-center" style={{ marginTop: "12px", gap: "10px" }}>
                <span className="flex items-center rounded-full bg-success-muted px-2 py-1 text-sm leading-4 font-medium text-success">
                  <TrendingUp aria-hidden style={{ width: "14px", height: "14px" }} />
                  <span style={{ marginLeft: "4px" }}>16.3%</span>
                </span>
                <span className="text-sm leading-4 text-muted-foreground">last 12 months</span>
              </div>
            </div>

            <div
              className="flex rounded-full bg-muted p-1"
              role="tablist"
              aria-label="Sales overview category"
              style={{ minWidth: "264px", height: "50px" }}
            >
              <OverviewTabButton
                active={activeTab === "orders"}
                label="Orders"
                onClick={() => setActiveTab("orders")}
              />
              <OverviewTabButton
                active={activeTab === "expenses"}
                label="Expenses"
                onClick={() => setActiveTab("expenses")}
              />
            </div>
          </header>

          <ChartContainer
            config={chartConfig}
            className="w-full"
            style={{ height: "238px", aspectRatio: "auto", marginTop: "26px" }}
            initialDimension={{ width: 540, height: 238 }}
          >
            <LineChart
              accessibilityLayer
              data={data}
              margin={{ top: 8, right: 4, left: 4, bottom: 0 }}
            >
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tickMargin={15}
                fontSize={14}
              />
              <YAxis domain={[35, 110]} hide />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="var(--color-sales)"
                strokeWidth={3.5}
                dot={false}
                activeDot={false}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="comparison"
                stroke="var(--color-comparison)"
                strokeOpacity={0.35}
                strokeWidth={3.5}
                dot={false}
                activeDot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ChartContainer>
        </div>

        <aside
          className="flex shrink-0 flex-col"
          style={{ width: "266px", gap: "10px" }}
          aria-label="Sales summary"
        >
          <OverviewMetric
            icon={<TrendingUp />}
            iconColor="var(--chart-1)"
            label="Total Sales"
            value="$14,673"
          />
          <OverviewMetric
            icon={<CircleDollarSign />}
            iconColor="var(--chart-3)"
            label="Total Profit"
            value="$9,281"
          />
          <OverviewMetric
            icon={<Flag />}
            iconColor="var(--chart-4)"
            label="Total Users"
            value="45.1k"
          />
          <OverviewMetric
            icon={<PieChart />}
            iconColor="var(--chart-2)"
            label="Total Expense"
            value="$4,673"
          />
        </aside>
      </div>
    </section>
  )
}

function OverviewTabButton({
  active,
  label,
  onClick,
}: {
  active: boolean
  label: string
  onClick: () => void
}) {
  return (
    <button
      className={cn(
        "flex flex-1 items-center justify-center rounded-full text-base font-medium transition-colors",
        active
          ? "bg-background text-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground"
      )}
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

function OverviewMetric({
  icon,
  iconColor,
  label,
  value,
}: {
  icon: React.ReactNode
  iconColor: string
  label: string
  value: string
}) {
  return (
    <div
      className="flex flex-1 items-center rounded-xl"
      style={{
        padding: "20px 24px",
        gap: "14px",
        backgroundColor: `color-mix(in oklab, ${iconColor} 12%, var(--background))`,
      }}
    >
      <span
        className="flex shrink-0 items-center justify-center rounded-full"
        style={{
          width: "40px",
          height: "40px",
          color: iconColor,
          backgroundColor: `color-mix(in oklab, ${iconColor} 22%, transparent)`,
        }}
        aria-hidden
      >
        {icon}
      </span>
      <div>
        <p className="m-0 text-sm leading-4 text-muted-foreground">{label}</p>
        <strong className="mt-1 block text-base leading-5 font-semibold text-foreground tabular-nums">
          {value}
        </strong>
      </div>
    </div>
  )
}

export default SalesProfitOverviewChart
