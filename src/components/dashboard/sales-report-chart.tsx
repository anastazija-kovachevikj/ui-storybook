"use client"

import { useState } from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { TrendingUp } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { salesReportData } from "@/components/dashboard/data"
import { cn } from "@/lib/utils"

export function SalesReportChart({ className }: { className?: string }) {
  const [tab, setTab] = useState<"profit" | "expenses">("profit")

  return (
    <Card
      className={cn(
        "min-w-0 flex-1 rounded-xl border-0 bg-card shadow-none ring-1 ring-border",
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0">
        <CardTitle className="text-lg font-medium leading-7">Sales Report</CardTitle>
        <div className="flex rounded-full bg-muted p-0.5">
          <Button
            size="sm"
            variant={tab === "profit" ? "secondary" : "ghost"}
            className={cn(
              "h-7 rounded-full px-3 text-xs",
              tab === "profit" && "bg-card shadow-sm"
            )}
            onClick={() => setTab("profit")}
          >
            Profit
          </Button>
          <Button
            size="sm"
            variant={tab === "expenses" ? "secondary" : "ghost"}
            className={cn(
              "h-7 rounded-full px-3 text-xs",
              tab === "expenses" && "bg-card shadow-sm"
            )}
            onClick={() => setTab("expenses")}
          >
            Expenses
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-8">
          <div className="flex items-start gap-2.5">
            <div className="mt-0.5 flex size-8 items-center justify-center rounded-full border border-border text-primary">
              <TrendingUp className="size-3.5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Sales this year</p>
              <div className="flex items-center gap-2">
                <p className="text-xl font-semibold tracking-tight">$563,489</p>
                <Badge className="h-5 border-0 bg-success/10 px-1.5 text-[11px] font-medium text-success">
                  +18%
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <div className="mt-0.5 flex size-8 items-center justify-center rounded-full border border-border text-chart-2">
              <TrendingUp className="size-3.5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Sales last year</p>
              <p className="text-xl font-semibold tracking-tight">$438,928</p>
            </div>
          </div>
        </div>

        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={salesReportData}
              margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
            >
              <defs>
                <linearGradient id="salesThisYear" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.28} />
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 6"
                stroke="var(--border)"
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                dy={8}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                tickFormatter={(v) => `${v / 10}k`}
                domain={[0, 80]}
                ticks={[0, 20, 40, 60, 80]}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid var(--border)",
                  boxShadow: "none",
                  fontSize: 12,
                }}
              />
              <Area
                type="monotone"
                dataKey="lastYear"
                stroke="var(--chart-2)"
                strokeWidth={2}
                fill="none"
                dot={false}
                name="Sales last year"
              />
              <Area
                type="monotone"
                dataKey="thisYear"
                stroke="var(--primary)"
                strokeWidth={2.5}
                fill="url(#salesThisYear)"
                dot={false}
                name="Sales this year"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
