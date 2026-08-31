"use client"

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import type { PeriodSnapshot } from "@/components/dashboard/data"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function ClaimsTrendChart({
  data,
  className,
}: {
  data: PeriodSnapshot["claimsTrend"]
  className?: string
}) {
  const opened = data.reduce((sum, row) => sum + row.opened, 0)
  const closed = data.reduce((sum, row) => sum + row.closed, 0)
  const backlog = opened - closed

  return (
    <Card className={cn("min-w-0 flex-1 border-0 shadow-none", className)}>
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
        <div>
          <CardTitle className="text-base font-semibold">
            Claims opened vs closed
          </CardTitle>
          <CardDescription>
            Pipeline throughput for the selected period
          </CardDescription>
        </div>
        <Badge
          variant="outline"
          className={cn(
            "border-0",
            backlog > 0
              ? "bg-warning-muted text-warning"
              : "bg-success-muted text-success"
          )}
        >
          {backlog > 0 ? `+${backlog} net open` : "Caught up"}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-8">
          <div>
            <p className="text-xs text-muted-foreground">Opened</p>
            <p className="text-xl font-semibold tracking-tight tabular-nums">
              {opened}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Closed</p>
            <p className="text-xl font-semibold tracking-tight tabular-nums">
              {closed}
            </p>
          </div>
        </div>

        <div className="h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 8, right: 20, left: 4, bottom: 4 }}
            >
              <defs>
                <linearGradient id="claimsOpened" x1="0" y1="0" x2="0" y2="1">
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
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                dy={8}
                padding={{ left: 8, right: 8 }}
              />
              <YAxis
                width={32}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid var(--border)",
                  boxShadow: "none",
                  fontSize: 12,
                  background: "var(--popover)",
                  color: "var(--popover-foreground)",
                }}
              />
              <Area
                type="monotone"
                dataKey="closed"
                stroke="var(--chart-2)"
                strokeWidth={2}
                fill="none"
                dot={false}
                name="Closed"
              />
              <Area
                type="monotone"
                dataKey="opened"
                stroke="var(--primary)"
                strokeWidth={2.5}
                fill="url(#claimsOpened)"
                dot={false}
                name="Opened"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
