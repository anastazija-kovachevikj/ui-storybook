"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const data = [
  { day: "16/08", profit: 2.2, expense: -1.4 },
  { day: "17/08", profit: 1.8, expense: -0.9 },
  { day: "18/08", profit: 2.9, expense: -1.8 },
  { day: "19/08", profit: 1.2, expense: -2.4 },
  { day: "20/08", profit: 2.6, expense: -1.1 },
  { day: "21/08", profit: 3.1, expense: -1.6 },
  { day: "22/08", profit: 1.5, expense: -0.7 },
]

export function RevenueUpdates({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "rounded-2xl border-0 bg-card shadow-none ring-1 ring-border",
        className
      )}
    >
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
        <div>
          <CardTitle className="text-base font-semibold">
            Revenue Updates
          </CardTitle>
          <p className="text-xs text-muted-foreground">Overview of profit</p>
        </div>
        <Button variant="outline" size="sm" className="rounded-xl">
          Year 2026
        </Button>
      </CardHeader>
      <CardContent className="grid gap-6 xl:grid-cols-[1fr_220px]">
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              stackOffset="sign"
              margin={{ top: 8, right: 8, left: -8, bottom: 0 }}
            >
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 6"
                stroke="var(--border)"
              />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                tickFormatter={(v) => `${v}k`}
                domain={[-3, 3]}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid var(--border)",
                  fontSize: 12,
                }}
              />
              <Bar dataKey="profit" stackId="a" radius={[6, 6, 0, 0]}>
                {data.map((entry) => (
                  <Cell key={`p-${entry.day}`} fill="var(--chart-5)" />
                ))}
              </Bar>
              <Bar dataKey="expense" stackId="a" radius={[0, 0, 6, 6]}>
                {data.map((entry) => (
                  <Cell key={`e-${entry.day}`} fill="var(--chart-4)" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col justify-center gap-5">
          <div>
            <p className="text-2xl font-semibold tracking-tight">$63,489.50</p>
            <p className="text-xs text-muted-foreground">Total Earnings</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="size-2.5 rounded-full bg-chart-5" />
              <div>
                <p className="text-xs text-muted-foreground">
                  Earnings this month
                </p>
                <p className="text-sm font-semibold">$48,820</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="size-2.5 rounded-full bg-chart-4" />
              <div>
                <p className="text-xs text-muted-foreground">
                  Expense this month
                </p>
                <p className="text-sm font-semibold">$26,498</p>
              </div>
            </div>
          </div>
          <Button className="w-full rounded-xl bg-primary hover:bg-primary/90">
            View Full Report
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default RevenueUpdates
