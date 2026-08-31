"use client"

import {
  Area,
  AreaChart,
  ResponsiveContainer,
} from "recharts"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const monthlySpark = [
  { v: 18 },
  { v: 28 },
  { v: 22 },
  { v: 36 },
  { v: 30 },
  { v: 42 },
  { v: 38 },
]

const yearlyBars = [
  { year: "2022", value: 42 },
  { year: "2023", value: 68 },
]

export function EarningsBackupCards({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-4", className)}>
      <Card className="overflow-hidden rounded-2xl border-0 bg-chart-5 text-primary-foreground shadow-none">
        <CardContent className="space-y-3 p-5">
          <p className="text-sm text-primary-foreground/80">Monthly earnings</p>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-semibold tracking-tight">$6,820</p>
            <Badge className="border-0 bg-primary-foreground/20 text-primary-foreground shadow-none">
              -9%
            </Badge>
          </div>
          <p className="text-xs text-primary-foreground/70">than last year</p>
          <div className="h-16 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlySpark}>
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke="currentColor"
                  strokeWidth={2}
                  fill="currentColor"
                  fillOpacity={0.25}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-0 bg-card shadow-none ring-1 ring-border">
        <CardContent className="space-y-4 p-5">
          <div>
            <p className="text-sm text-muted-foreground">Yearly Backup</p>
            <div className="mt-1 flex items-center gap-2">
              <p className="text-2xl font-semibold tracking-tight">$36,358</p>
              <Badge className="border-0 bg-success/10 text-muted-foreground shadow-none">
                +9%
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">last year</p>
          </div>
          <div className="flex items-end gap-3">
            {yearlyBars.map((bar) => (
              <div key={bar.year} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-lg bg-primary/80"
                  style={{ height: `${bar.value}px` }}
                />
                <span className="text-xs text-muted-foreground">{bar.year}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default EarningsBackupCards
