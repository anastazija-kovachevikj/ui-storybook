"use client"

import { CircleUserRound, MoreVertical } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { cn } from "@/lib/utils"

const productSalesData = [
  { year: "2019", sales: 13, comparison: 13 },
  { year: "", sales: 16, comparison: 18 },
  { year: "2020", sales: 14, comparison: 13.5 },
  { year: "", sales: 18, comparison: 15 },
  { year: "2021", sales: 15, comparison: 12.5 },
  { year: "", sales: 15, comparison: 13.3 },
  { year: "", sales: 16, comparison: 13.1 },
  { year: "2022", sales: 19, comparison: 13 },
] as const

const chartConfig = {
  sales: { label: "Product sales", color: "var(--chart-1)" },
  comparison: {
    label: "Previous period",
    color: "color-mix(in oklab, var(--muted-foreground) 22%, var(--background))",
  },
} satisfies ChartConfig

/** Product sales trend and new-customer total based on Chart reference 13. */
export function ProductSalesLineChart({ className }: { className?: string }) {
  return (
    <section
      data-slot="product-sales-line-chart"
      className={cn(
        "w-full rounded-xl bg-card text-card-foreground shadow-sm ring-1 ring-foreground/10",
        className
      )}
      style={{ height: "496px", padding: "30px" }}
      aria-labelledby="product-sales-line-chart-title"
    >
      <header className="flex items-center justify-between">
        <h2
          id="product-sales-line-chart-title"
          className="text-xl leading-6 font-semibold text-foreground"
        >
          Product Sales
        </h2>
        <MoreVertical aria-label="More product sales options" />
      </header>

      <ChartContainer
        config={chartConfig}
        className="w-full"
        style={{ height: "292px", aspectRatio: "auto", marginTop: "42px" }}
        initialDimension={{ width: 402, height: 292 }}
      >
        <LineChart
          accessibilityLayer
          data={productSalesData}
          margin={{ top: 8, right: 0, left: 0, bottom: 12 }}
        >
          <CartesianGrid vertical={false} stroke="var(--border)" />
          <XAxis
            dataKey="year"
            axisLine={false}
            tickLine={false}
            tickMargin={15}
            interval={0}
            padding={{ left: 18, right: 24 }}
            fontSize={14}
          />
          <YAxis
            domain={[12, 20]}
            ticks={[12, 14, 16, 18, 20]}
            tickFormatter={(value) => `${value}k`}
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            width={42}
            fontSize={14}
          />
          <Line
            type="monotone"
            dataKey="comparison"
            stroke="var(--color-comparison)"
            strokeWidth={2.5}
            dot={false}
            activeDot={false}
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
        </LineChart>
      </ChartContainer>

      <div className="flex items-center" style={{ marginTop: "31px", gap: "14px" }}>
        <span
          className="flex shrink-0 items-center justify-center rounded-xl"
          style={{
            width: "48px",
            height: "48px",
            color: "var(--chart-1)",
            backgroundColor: "color-mix(in oklab, var(--chart-1) 10%, var(--background))",
          }}
          aria-hidden
        >
          <CircleUserRound style={{ width: "22px", height: "22px" }} />
        </span>
        <div>
          <strong className="block text-xl leading-6 font-semibold text-foreground tabular-nums">
            36,436
            <span className="ml-2 rounded-full bg-success-muted px-2 py-0.5 text-xs leading-4 font-medium text-muted-foreground">
              +12%
            </span>
          </strong>
          <p className="m-0 text-base leading-5 text-muted-foreground">New Customer</p>
        </div>
      </div>
    </section>
  )
}

export default ProductSalesLineChart
