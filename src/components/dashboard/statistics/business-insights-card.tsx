"use client"

import {
  DollarSign,
  MoreHorizontal,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const insights: Array<{
  title: string
  value: string
  change: string
  badgeClass: string
  icon: LucideIcon
  chartSrc: string
  chartWidth: number
  chartHeight: number
}> = [
  {
    title: "Total Followers",
    value: "4,562",
    change: "+23%",
    badgeClass: "bg-success/10",
    icon: Users,
    chartSrc: "/dashboard/statistics/bi-chart-bars.png",
    chartWidth: 88,
    chartHeight: 72,
  },
  {
    title: "Total Income",
    value: "$6,280",
    change: "+18%",
    badgeClass: "bg-success/10",
    icon: DollarSign,
    chartSrc: "/dashboard/statistics/bi-chart-line.png",
    chartWidth: 112,
    chartHeight: 72,
  },
  {
    title: "Current Balance",
    value: "$2,529",
    change: "+42%",
    badgeClass: "bg-success/10",
    icon: Wallet,
    chartSrc: "/dashboard/statistics/bi-chart-donut.png",
    chartWidth: 88,
    chartHeight: 72,
  },
]

export function BusinessInsightsCard({ className }: { className?: string }) {
  return (
    <div className={cn("flex w-full items-stretch gap-6", className)}>
      {insights.map((insight) => {
        const Icon = insight.icon
        return (
          <Card
            key={insight.title}
            className="min-w-0 flex-1 overflow-hidden rounded-xl border bg-card py-0 shadow-xs ring-0"
          >
            <CardContent className="flex flex-col gap-4 p-6">
              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="rounded-full p-3 outline">
                    <Icon size={16} aria-hidden />
                  </div>
                  <p className="truncate text-base font-semibold text-muted-foreground">
                    {insight.title}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-8 shrink-0 rounded-md"
                  aria-label={`${insight.title} options`}
                >
                  <MoreHorizontal size={16} />
                </Button>
              </div>

              <div className="flex items-end justify-between gap-3">
                <div className="flex flex-col items-start gap-2">
                  <p className="text-2xl font-semibold tracking-tight text-foreground">
                    {insight.value}
                  </p>
                  <Badge
                    className={cn(
                      "rounded-full border-0 font-normal text-muted-foreground shadow-none",
                      insight.badgeClass
                    )}
                  >
                    {insight.change}
                  </Badge>
                </div>
                <div
                  className="shrink-0 overflow-clip"
                  style={{
                    width: insight.chartWidth,
                    height: insight.chartHeight,
                  }}
                >
                  <img
                    src={insight.chartSrc}
                    alt=""
                    width={insight.chartWidth}
                    height={insight.chartHeight}
                    className="block size-full max-w-none object-contain"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default BusinessInsightsCard
