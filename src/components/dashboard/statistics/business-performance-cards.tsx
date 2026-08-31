"use client"

import { ArrowDown, ArrowUp, ChartNoAxesColumnIncreasing } from "lucide-react"
import { Area, AreaChart, Bar, BarChart, Cell, Pie, PieChart } from "recharts"

import { Card, CardContent } from "@/components/ui/card"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { cn } from "@/lib/utils"

const customerTrend = [18, 64, 22, 56, 19, 68, 32].map((value, day) => ({ day, value }))
const projectActivity = [28, 38, 34, 55, 43, 31, 49, 23].map((value, day) => ({ day, value }))
const growthTrend = [10, 42, 30, 15, 64, 32, 72, 48, 78, 66, 82].map((value, day) => ({
  day,
  value,
}))

const expenseSplit = [
  { name: "Operations", value: 60, color: "var(--primary)" },
  { name: "Sales", value: 20, color: "var(--chart-4)" },
  { name: "Marketing", value: 20, color: "var(--success)" },
]

const businessPerformanceConfig = {
  customers: { label: "Customers", color: "var(--primary)" },
  projects: { label: "Projects", color: "var(--primary)" },
  growth: { label: "Growth", color: "var(--warning)" },
  operations: { label: "Operations", color: "var(--primary)" },
  sales: { label: "Sales", color: "var(--chart-4)" },
  marketing: { label: "Marketing", color: "var(--success)" },
} satisfies ChartConfig

function ChangeIndicator({ direction }: { direction: "up" | "down" }) {
  const isUp = direction === "up"
  const Icon = isUp ? ArrowUp : ArrowDown

  return (
    <span
      className={cn(
        "flex size-5 items-center justify-center rounded-full",
        isUp ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
      )}
    >
      <Icon className="size-3" strokeWidth={1.8} aria-hidden />
    </span>
  )
}

function MetricHeader({ label, value, direction }: { label: string; value: string; direction: "up" | "down" }) {
  return (
    <div className="space-y-1 px-6">
      <p className="text-sm leading-5 text-muted-foreground">{label}</p>
      <p className="text-xl font-semibold leading-7 tracking-tight text-foreground tabular-nums">{value}</p>
      <div className="flex items-center gap-1">
        <ChangeIndicator direction={direction} />
        <span className="text-sm leading-5 text-muted-foreground">+9%</span>
      </div>
    </div>
  )
}

function TrendCard({ type }: { type: "customers" | "projects" }) {
  const isCustomers = type === "customers"

  return (
    <Card className="h-[212px] w-[180px] overflow-hidden rounded-xl border bg-card py-6 shadow-xs">
      <CardContent className="flex h-full flex-col p-0">
        <MetricHeader
          label={isCustomers ? "Customers" : "Projects"}
          value={isCustomers ? "36,358" : "78,298"}
          direction={isCustomers ? "down" : "up"}
        />
        <ChartContainer
          config={businessPerformanceConfig}
          className="mx-6 mt-10 h-12 w-auto aspect-auto"
          initialDimension={{ width: 132, height: 48 }}
        >
          {isCustomers ? (
            <AreaChart data={customerTrend} margin={{ top: 1, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="business-customers-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-customers)" stopOpacity={0.16} />
                  <stop offset="100%" stopColor="var(--color-customers)" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke="var(--color-customers)"
                strokeWidth={2}
                fill="url(#business-customers-fill)"
                isAnimationActive={false}
              />
            </AreaChart>
          ) : (
            <BarChart data={projectActivity} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <Bar dataKey="value" fill="var(--color-projects)" radius={4} barSize={8} isAnimationActive={false} />
            </BarChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

function GrowthCard() {
  return (
    <Card className="h-[232px] w-[180px] overflow-hidden rounded-xl border bg-card py-6 shadow-xs">
      <CardContent className="flex h-full flex-col justify-between p-0 px-6">
        <div>
          <div className="flex size-8 items-center justify-center rounded-lg bg-warning/20 text-warning">
            <ChartNoAxesColumnIncreasing className="size-4" strokeWidth={1.8} aria-hidden />
          </div>
          <ChartContainer
            config={businessPerformanceConfig}
            className="mt-4 h-12 w-full aspect-auto"
            initialDimension={{ width: 132, height: 48 }}
          >
            <AreaChart data={growthTrend} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="business-growth-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-growth)" stopOpacity={0.12} />
                  <stop offset="100%" stopColor="var(--color-growth)" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke="var(--color-growth)"
                strokeWidth={2}
                fill="url(#business-growth-fill)"
                isAnimationActive={false}
              />
            </AreaChart>
          </ChartContainer>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <ChangeIndicator direction="up" />
            <p className="text-lg font-semibold leading-7 tracking-tight text-foreground">24%</p>
          </div>
          <p className="text-sm leading-5 text-muted-foreground">Growth</p>
        </div>
      </CardContent>
    </Card>
  )
}

function ExpenseCard() {
  return (
    <Card className="h-[232px] w-[180px] overflow-hidden rounded-xl border bg-card py-6 shadow-xs">
      <CardContent className="h-full p-0">
        <div className="px-6">
          <p className="text-xl font-semibold leading-7 tracking-tight text-foreground tabular-nums">$10,230</p>
          <p className="mt-1 text-sm leading-5 text-muted-foreground">Expense</p>
        </div>
        <ChartContainer
          config={businessPerformanceConfig}
          className="mx-6 mt-4 size-[132px] aspect-auto"
          initialDimension={{ width: 132, height: 132 }}
        >
          <PieChart>
            <Pie
              data={expenseSplit}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={38}
              outerRadius={60}
              startAngle={90}
              endAngle={-270}
              stroke="none"
              isAnimationActive={false}
            >
              {expenseSplit.map((segment) => (
                <Cell key={segment.name} fill={segment.color} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

/** Business performance summary cards based on Figma Statistics 16. */
export function BusinessPerformanceCards({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "flex w-[calc(100vw-5rem)] max-w-[1600px] justify-center px-6 py-20",
        className
      )}
      aria-label="Business performance cards"
    >
      <div className="grid grid-cols-2 gap-6">
        <TrendCard type="customers" />
        <TrendCard type="projects" />
        <GrowthCard />
        <ExpenseCard />
      </div>
    </section>
  )
}

export default BusinessPerformanceCards
