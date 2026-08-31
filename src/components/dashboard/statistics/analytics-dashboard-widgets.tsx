"use client"

import { Area, AreaChart, Cell, Pie, PieChart } from "recharts"

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { cn } from "@/lib/utils"

const customerTrend = [
  { day: "Apr 07", value: 16 },
  { day: "Apr 08", value: 18 },
  { day: "Apr 09", value: 22 },
  { day: "Apr 10", value: 86 },
  { day: "Apr 11", value: 22 },
  { day: "Apr 12", value: 48 },
  { day: "Apr 13", value: 12 },
  { day: "Apr 14", value: 36 },
]

const productSplit = [
  { name: "Products", value: 68, color: "var(--primary)" },
  { name: "Profit", value: 14, color: "var(--chart-2)" },
  {
    name: "Previous period",
    value: 18,
    color: "color-mix(in oklab, var(--destructive) 18%, var(--background))",
  },
]

const customerTrendConfig = {
  customers: { label: "Customers", color: "var(--chart-1)" },
} satisfies ChartConfig

const productSplitConfig = Object.fromEntries(
  productSplit.map((segment) => [
    segment.name,
    { label: segment.name, color: segment.color },
  ])
) satisfies ChartConfig

function WidgetHeader({
  title,
  value,
  change,
  changeTone = "primary",
}: {
  title: string
  value?: string
  change?: string
  changeTone?: "primary" | "success"
}) {
  const changeColor =
    changeTone === "success" ? "var(--success)" : "var(--primary)"

  return (
    <header className="flex items-start justify-between gap-3 px-6 pt-6">
      <div>
        <h2 className="text-lg font-semibold leading-7 tracking-tight text-foreground">{title}</h2>
        <p className="text-sm leading-5 text-muted-foreground">Last 7 days</p>
      </div>
      {value ? (
        <div className="flex flex-col items-end gap-0.5">
          <p className="text-base font-semibold leading-6 text-foreground tabular-nums">{value}</p>
          {change ? (
            <span
              className="rounded-full px-2 py-0.5 text-xs leading-4 text-muted-foreground"
              style={{
                backgroundColor: `color-mix(in oklab, ${changeColor} 10%, var(--background))`,
              }}
            >
              {change}
            </span>
          ) : null}
        </div>
      ) : null}
    </header>
  )
}

function LegendRow({
  label,
  value,
  color,
}: {
  label: string
  value: string
  color: string
}) {
  return (
    <div className="flex items-center justify-between text-sm leading-5">
      <span className="flex items-center gap-2 text-foreground">
        <span
          className="h-3 w-5 rounded-full"
          style={{ backgroundColor: color }}
          aria-hidden
        />
        {label}
      </span>
      <span className="text-muted-foreground tabular-nums">{value}</span>
    </div>
  )
}

function CustomersWidget() {
  return (
    <Card className="h-[340px] overflow-hidden rounded-xl border bg-card py-0 shadow-none">
      <CardContent className="flex h-full flex-col p-0">
        <WidgetHeader title="Customers" value="6,380" change="+26.5%" />
        <ChartContainer
          config={customerTrendConfig}
          className="mx-6 mt-auto h-24 w-auto aspect-auto"
          initialDimension={{ width: 222, height: 96 }}
        >
          <AreaChart data={customerTrend} margin={{ top: 1, right: 0, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="analytics-customers-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--color-customers)" stopOpacity={0.16} />
                <stop offset="100%" stopColor="var(--color-customers)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--color-customers)"
              strokeWidth={2}
              fill="url(#analytics-customers-fill)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ChartContainer>
        <div className="space-y-2 px-6 pb-6 pt-5">
          <LegendRow label="April 07 - April 14" value="6,380" color="var(--primary)" />
          <LegendRow label="Last Week" value="4,298" color="var(--muted)" />
        </div>
      </CardContent>
    </Card>
  )
}

function ProductsWidget() {
  return (
    <Card className="h-[340px] overflow-hidden rounded-xl border bg-card py-0 shadow-none">
      <CardContent className="flex h-full flex-col p-0">
        <WidgetHeader title="Products" value="12,389" change="+26.5%" changeTone="success" />
        <ChartContainer
          config={productSplitConfig}
          className="mx-auto mt-4 size-44 aspect-auto"
          initialDimension={{ width: 176, height: 176 }}
        >
          <PieChart>
            <Pie
              data={productSplit}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={59}
              outerRadius={72}
              startAngle={90}
              endAngle={-270}
              stroke="none"
              isAnimationActive={false}
            >
              {productSplit.map((segment) => (
                <Cell key={segment.name} fill={segment.color} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <p className="mt-auto px-6 pb-6 text-center text-sm leading-5 text-muted-foreground">
          $18k Profit more than last month
        </p>
      </CardContent>
    </Card>
  )
}

function LatestDealWidget() {
  return (
    <Card className="h-[340px] overflow-hidden rounded-xl border bg-card py-0 shadow-none">
      <CardContent className="flex h-full flex-col p-0">
        <header className="flex items-start justify-between gap-3 px-6 pt-6">
          <div>
            <h2 className="text-lg font-semibold leading-7 tracking-tight text-foreground">Latest Deal</h2>
            <p className="text-sm leading-5 text-muted-foreground">Last 7 days</p>
          </div>
          <span className="mt-1.5 rounded-full bg-success/10 px-3 py-0.5 text-xs leading-4 text-muted-foreground">
            86.5%
          </span>
        </header>

        <div className="flex flex-1 items-center px-6">
          <div className="w-full">
            <div className="flex items-center justify-between text-base font-semibold leading-6 text-foreground tabular-nums">
              <span>$98,500</span>
              <span>$1,22,900</span>
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-success/10">
              <div className="h-full w-4/5 bg-success" />
            </div>
            <p className="mt-2 text-sm leading-5 text-muted-foreground">Coupons used: 18/22</p>
          </div>
        </div>

        <div className="px-6 pb-6">
          <p className="text-sm font-semibold leading-5 text-foreground">Recent Purchasers</p>
          <AvatarGroup className="mt-4">
            <Avatar>
              <AvatarFallback className="bg-primary/15 text-xs font-semibold text-primary">JD</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback className="bg-chart-4/20 text-xs font-semibold text-chart-4">MS</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback className="bg-chart-2/15 text-xs font-semibold text-chart-2">RK</AvatarFallback>
            </Avatar>
            <AvatarGroupCount className="bg-muted text-sm font-medium text-foreground">+4</AvatarGroupCount>
          </AvatarGroup>
        </div>
      </CardContent>
    </Card>
  )
}

const paymentActivity = [
  { day: "M", value: 18, total: 49 },
  { day: "T", value: 24, total: 55 },
  { day: "W", value: 17, total: 47 },
  { day: "T", value: 22, total: 50 },
  { day: "F", value: 27, total: 57 },
  { day: "S", value: 18, total: 48 },
  { day: "S", value: 22, total: 53 },
]

function PaymentsWidget() {
  return (
    <Card className="h-[340px] overflow-hidden rounded-xl border bg-card py-0 shadow-none">
      <CardContent className="flex h-full flex-col p-0">
        <WidgetHeader title="Payments" value="12,389" change="+26.5%" />
        <div className="flex flex-1 items-center justify-center px-6" aria-label="Payments this week">
          <div className="flex h-24 w-full items-end justify-between px-3">
            {paymentActivity.map((payment, index) => (
              <div key={`${payment.day}-${index}`} className="flex h-full flex-col items-center justify-end gap-2">
                <div className="relative h-16 w-2.5 overflow-hidden rounded-full bg-primary/10">
                  <div
                    className="absolute bottom-0 w-full rounded-full bg-primary"
                    style={{ height: `${(payment.value / payment.total) * 100}%` }}
                  />
                </div>
                <span className="text-xs leading-4 text-muted-foreground">{payment.day}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2 px-6 pb-6 pt-5">
          <LegendRow label="Paypal" value="52%" color="var(--primary)" />
          <LegendRow label="Credit Debit Card" value="48%" color="color-mix(in oklab, var(--primary) 10%, var(--background))" />
        </div>
      </CardContent>
    </Card>
  )
}

/** Four analytics widgets based on Figma Statistics 08. */
export function AnalyticsDashboardWidgets({ className }: { className?: string }) {
  return (
    <section
      className={cn("grid w-full grid-cols-4 gap-6 px-16", className)}
      aria-label="Analytics dashboard widgets"
    >
      <CustomersWidget />
      <ProductsWidget />
      <LatestDealWidget />
      <PaymentsWidget />
    </section>
  )
}

export default AnalyticsDashboardWidgets
