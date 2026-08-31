"use client"

import { CircleDollarSign } from "lucide-react"
import { Area, AreaChart } from "recharts"

import { Card, CardContent } from "@/components/ui/card"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { cn } from "@/lib/utils"

const earningsTrend = [
  { month: "Jan", value: 8 },
  { month: "Feb", value: 42 },
  { month: "Mar", value: 76 },
  { month: "Apr", value: 51 },
  { month: "May", value: 14 },
  { month: "Jun", value: 31 },
  { month: "Jul", value: 86 },
  { month: "Aug", value: 63 },
  { month: "Sep", value: 25 },
  { month: "Oct", value: 72 },
  { month: "Nov", value: 120 },
  { month: "Dec", value: 95 },
  { month: "Jan", value: 72 },
]

const earningsTrendConfig = {
  earnings: { label: "Monthly earnings", color: "var(--primary)" },
} satisfies ChartConfig

/** Monthly earnings overview based on Figma Statistics 10. */
export function MonthlyEarningsOverview({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "flex w-[calc(100vw-5rem)] max-w-[1600px] justify-center px-6 py-20",
        className
      )}
      aria-label="Monthly earnings overview"
    >
      <Card className="h-[262px] w-full max-w-96 overflow-hidden rounded-xl border bg-card py-6 shadow-xs">
        <CardContent className="h-full p-0">
          <div className="flex h-full flex-col">
            <div className="flex flex-col gap-3 px-6">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-semibold leading-7 tracking-tight text-foreground">
                  Monthly earnings
                </h2>
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <CircleDollarSign className="size-4" strokeWidth={1.8} aria-hidden />
                </div>
              </div>

              <div className="space-y-0.5">
                <p className="text-xl font-semibold leading-7 tracking-tight text-foreground tabular-nums">
                  $6,820
                </p>
                <div className="flex items-center gap-1">
                  <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-xs leading-4 text-muted-foreground">
                    -9%
                  </span>
                  <span className="text-sm leading-5 text-muted-foreground">than last year</span>
                </div>
              </div>
            </div>

            <ChartContainer
              config={earningsTrendConfig}
              className="mt-8 h-20 w-auto px-6 aspect-auto"
              initialDimension={{ width: 336, height: 80 }}
            >
              <AreaChart data={earningsTrend} margin={{ top: 3, right: 0, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="monthly-earnings-fill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-earnings)" stopOpacity={0.14} />
                    <stop offset="100%" stopColor="var(--color-earnings)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="var(--color-earnings)"
                  strokeWidth={2}
                  fill="url(#monthly-earnings-fill)"
                  isAnimationActive={false}
                />
              </AreaChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

export default MonthlyEarningsOverview
