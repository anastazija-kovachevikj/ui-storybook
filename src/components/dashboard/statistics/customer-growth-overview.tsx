"use client"

import { Line, LineChart } from "recharts"

import { Card, CardContent } from "@/components/ui/card"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { cn } from "@/lib/utils"

const customerGrowthData = [
  { day: "1", current: 8, previous: 10 },
  { day: "2", current: 76, previous: 35 },
  { day: "3", current: 55, previous: 70 },
  { day: "4", current: 71, previous: 46 },
  { day: "5", current: 47, previous: 97 },
  { day: "6", current: 94, previous: 57 },
  { day: "7", current: 109, previous: 92 },
]

const customerGrowthConfig = {
  current: { label: "April 07 - April 14", color: "var(--primary)" },
  previous: {
    label: "Last Week",
    color: "color-mix(in oklab, var(--primary) 20%, var(--background))",
  },
} satisfies ChartConfig

type LegendRowProps = {
  label: string
  value: string
  color: string
}

function LegendRow({ label, value, color }: LegendRowProps) {
  return (
    <div className="flex items-center justify-between text-sm leading-5 text-muted-foreground">
      <span className="flex items-center gap-2">
        <span className="size-2.5 rounded-full" style={{ backgroundColor: color }} aria-hidden />
        {label}
      </span>
      <span className="tabular-nums">{value}</span>
    </div>
  )
}

/** Customer-growth comparison card based on Figma Statistics 15. */
export function CustomerGrowthOverview({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "flex w-[calc(100vw-5rem)] max-w-[1600px] justify-center px-6 py-20",
        className
      )}
      aria-label="Customer growth overview"
    >
      <Card className="h-[308px] w-full max-w-72 overflow-hidden rounded-xl border bg-card pt-6 shadow-none">
        <CardContent className="h-full p-0">
          <div className="flex items-start justify-between px-6">
            <div>
              <h2 className="text-lg font-semibold leading-7 tracking-tight text-foreground">Customers</h2>
              <p className="text-sm leading-5 text-muted-foreground">Last 7 days</p>
            </div>
            <span className="rounded-full bg-success/10 px-3 py-0 text-sm leading-5 text-muted-foreground">
              +26.5%
            </span>
          </div>

          <ChartContainer
            config={customerGrowthConfig}
            className="mx-6 mt-6 h-28 w-auto aspect-auto"
            initialDimension={{ width: 240, height: 112 }}
          >
            <LineChart data={customerGrowthData} margin={{ top: 7, right: 0, bottom: 0, left: 0 }}>
              <Line
                type="monotone"
                dataKey="previous"
                stroke="var(--color-previous)"
                strokeWidth={2}
                dot={false}
                activeDot={false}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="current"
                stroke="var(--color-current)"
                strokeWidth={2}
                dot={false}
                activeDot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ChartContainer>

          <div className="mt-6 space-y-3 px-6 pb-6">
            <LegendRow label="April 07 - April 14" value="6,380" color="var(--primary)" />
            <LegendRow
              label="Last Week"
              value="4,298"
              color="color-mix(in oklab, var(--primary) 20%, var(--background))"
            />
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

export default CustomerGrowthOverview
