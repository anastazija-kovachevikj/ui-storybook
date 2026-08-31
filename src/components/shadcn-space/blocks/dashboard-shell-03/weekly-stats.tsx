"use client"

import { Area, AreaChart, ResponsiveContainer } from "recharts"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemedSvg } from "@/components/ui/themed-svg"
import { cn } from "@/lib/utils"

const chartData = [
  { v: 41 },
  { v: 124 },
  { v: 83 },
  { v: 165 },
]

const stats = [
  {
    title: "Top Sales",
    subtitle: "Johnathan Doe",
    value: "+68",
    iconSrc: "/dashboard/widgets/weekly-stats-icon-sales.svg",
    iconBg: "bg-chart-2/10",
    iconColor: "text-chart-2",
    badgeBg: "bg-primary/10",
  },
  {
    title: "Best Seller",
    subtitle: "MaterialPro Admin",
    value: "+68",
    iconSrc: "/dashboard/widgets/weekly-stats-icon-star.svg",
    iconBg: "bg-chart-5/10",
    iconColor: "text-chart-5",
    badgeBg: "bg-chart-5/10",
  },
  {
    title: "Most Commented",
    subtitle: "Ample Admin",
    value: "+68",
    iconSrc: "/dashboard/widgets/weekly-stats-icon-comment.svg",
    iconBg: "bg-chart-4/10",
    iconColor: "text-chart-4",
    badgeBg: "bg-chart-4/10",
  },
]

export function WeeklyStats({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "w-full gap-6 rounded-xl border-0 bg-card py-6 shadow-none ring-1 ring-foreground/10",
        className
      )}
    >
      <CardHeader className="space-y-0 px-6 pb-0">
        <CardTitle className="text-lg font-semibold leading-7 text-foreground">
          Weekly Stats
        </CardTitle>
        <p className="text-sm leading-5 text-muted-foreground">Average sales</p>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 px-6 pt-0">
        <div className="h-[170px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 8, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="weeklyStatsArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke="var(--primary)"
                strokeWidth={2}
                fill="url(#weeklyStatsArea)"
                fillOpacity={0.4}
                dot={false}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col gap-4">
          {stats.map((item) => (
            <div
              key={item.title}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-md",
                    item.iconBg
                  )}
                >
                  <ThemedSvg
                    src={item.iconSrc}
                    className={cn("size-4", item.iconColor)}
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-base font-semibold leading-6 text-foreground">
                    {item.title}
                  </p>
                  <p className="truncate text-sm leading-5 text-muted-foreground">
                    {item.subtitle}
                  </p>
                </div>
              </div>
              <Badge
                className={cn(
                  "h-[22px] border-0 px-2 text-sm font-medium text-muted-foreground shadow-none",
                  item.badgeBg
                )}
              >
                {item.value}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default WeeklyStats
