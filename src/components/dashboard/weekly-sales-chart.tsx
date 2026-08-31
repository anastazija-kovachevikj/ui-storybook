"use client"

import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { MoreVertical, TrendingUp } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { weeklySalesData } from "@/components/dashboard/data"
import { cn } from "@/lib/utils"

export function WeeklySalesChart({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "w-full min-w-0 rounded-xl border-0 bg-card shadow-none ring-1 ring-border",
        className
      )}
    >
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <CardTitle className="text-lg font-medium leading-7">Weekly Stats</CardTitle>
        <Button variant="ghost" size="icon-xs" className="text-muted-foreground">
          <MoreVertical className="size-4" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-start gap-2.5">
          <div className="mt-0.5 flex size-8 items-center justify-center rounded-full border border-border text-primary">
            <TrendingUp className="size-3.5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-xl font-semibold tracking-tight">$96,850</p>
              <Badge className="h-5 border-0 bg-warning/10 px-1.5 text-[11px] font-medium text-warning">
                -5%
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">Last 7 days</p>
          </div>
        </div>

        <div className="h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={weeklySalesData}
              margin={{ top: 8, right: 0, left: -24, bottom: 0 }}
              barCategoryGap="28%"
            >
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                dy={8}
              />
              <YAxis hide domain={[0, 100]} />
              <Tooltip
                cursor={{ fill: "transparent" }}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid var(--border)",
                  fontSize: 12,
                }}
              />
              <Bar dataKey="value" radius={[8, 8, 8, 8]} maxBarSize={28}>
                {weeklySalesData.map((entry, index) => (
                  <Cell
                    key={entry.day}
                    fill={index === 1 ? "var(--primary)" : "var(--chart-3)"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
