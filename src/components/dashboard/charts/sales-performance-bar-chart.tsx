"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"

const chartData = [
  { month: "Jan", expense: 31, profit: 31, earning: 31 },
  { month: "Feb", expense: 83, profit: 83, earning: 83 },
  { month: "Mar", expense: 53, profit: 53, earning: 53 },
  { month: "Apr", expense: 36, profit: 36, earning: 36 },
  { month: "May", expense: 64, profit: 64, earning: 64 },
  { month: "Jun", expense: 47, profit: 47, earning: 47 },
  { month: "Jul", expense: 100, profit: 100, earning: 100 },
  { month: "Aug", expense: 69, profit: 69, earning: 69 },
  { month: "Sep", expense: 29, profit: 29, earning: 29 },
  { month: "Oct", expense: 73, profit: 73, earning: 73 },
  { month: "Nov", expense: 27, profit: 27, earning: 27 },
  { month: "Dec", expense: 53, profit: 53, earning: 53 },
]

const chartConfig = {
  earning: {
    label: "Earning",
    color: "var(--chart-3)",
  },
  profit: {
    label: "Profit",
    color: "var(--chart-2)",
  },
  expense: {
    label: "Expense",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

const legend = [
  { id: "earning", title: "Earning", color: "var(--chart-3)" },
  { id: "profit", title: "Profit", color: "var(--chart-2)" },
  { id: "expense", title: "Expense", color: "var(--chart-1)" },
] as const

export function SalesPerformanceBarChart({
  className,
}: {
  className?: string
}) {
  return (
    <Card
      className={cn(
        "w-full gap-6 overflow-hidden rounded-xl border-0 bg-card py-6 shadow-none ring-1 ring-foreground/10 [--card-spacing:--spacing(6)]",
        className
      )}
    >
      <CardHeader className="flex flex-col items-start justify-between gap-3 px-6 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-1">
          <CardTitle className="text-lg font-semibold leading-7 text-foreground">
            Sales Overview
          </CardTitle>
          <div className="flex items-center gap-2">
            <p className="text-3xl font-medium leading-9 text-card-foreground">
              $386.53K
            </p>
            <Badge className="border-0 bg-success/10 font-medium text-muted-foreground shadow-none">
              +18%
            </Badge>
            <span className="text-xs text-muted-foreground">
              than last year
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {legend.map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <p className="text-sm text-muted-foreground">{item.title}</p>
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-6">
        <ChartContainer
          config={chartConfig}
          className="h-[300px] w-full shrink-0"
          style={{ height: 340 }}
          initialDimension={{ width: 860, height: 340 }}
        >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="var(--border)"
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              interval={0}
              fontSize={12}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={36}
              fontSize={12}
              tickFormatter={(value) => `${value / 10}k`}
              domain={[0, 300]}
              ticks={[0, 50, 100, 150, 200, 250, 300]}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Bar
              dataKey="expense"
              stackId="a"
              fill="var(--color-expense)"
              radius={[0, 0, 4, 4]}
              barSize={20}
              isAnimationActive={false}
            />
            <Bar
              dataKey="profit"
              stackId="a"
              fill="var(--color-profit)"
              radius={[0, 0, 0, 0]}
              barSize={20}
              isAnimationActive={false}
            />
            <Bar
              dataKey="earning"
              stackId="a"
              fill="var(--color-earning)"
              radius={[4, 4, 0, 0]}
              barSize={20}
              isAnimationActive={false}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default SalesPerformanceBarChart
