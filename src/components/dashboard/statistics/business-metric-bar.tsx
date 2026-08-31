"use client"

import {
  Box,
  ChartColumnIncreasing,
  Handbag,
  Star,
  type LucideIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const metrics: Array<{
  label: string
  value: string
  period: string
  change: string
  isPositive: boolean
  icon: LucideIcon
}> = [
  {
    label: "Orders",
    value: "5868",
    period: "Last 7 days",
    change: "+18%",
    isPositive: true,
    icon: Handbag,
  },
  {
    label: "Sales",
    value: "$96,850",
    period: "Last 7 days",
    change: "-5%",
    isPositive: false,
    icon: Box,
  },
  {
    label: "Profit",
    value: "$82,906",
    period: "Last 7 days",
    change: "+18%",
    isPositive: true,
    icon: ChartColumnIncreasing,
  },
  {
    label: "Expense",
    value: "$14,653",
    period: "Last 7 days",
    change: "+18%",
    isPositive: true,
    icon: Star,
  },
]

export function BusinessMetricBar({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "w-full overflow-hidden rounded-2xl border bg-card p-0 shadow-xs ring-0",
        className
      )}
    >
      <CardContent className="flex w-full flex-wrap items-center px-0 lg:flex-nowrap">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <div
              key={metric.label}
              className={cn(
                "flex w-full items-start justify-between border-border p-6 md:w-6/12 lg:w-3/12",
                "border-b last:border-b-0",
                "md:border-e md:even:border-e-0 md:nth-[n+3]:border-b-0",
                "lg:border-b-0 lg:even:border-e lg:last:border-e-0",
                index === metrics.length - 1 && "lg:border-e-0"
              )}
            >
              <div className="flex flex-col gap-4">
                <p className="text-base font-medium text-card-foreground">
                  {metric.label}
                </p>
                <div>
                  <p className="text-2xl font-medium text-card-foreground">
                    {metric.value}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <p className="text-xs text-muted-foreground">
                      {metric.period}
                    </p>
                    <Badge
                      className={cn(
                        "rounded-full border-0 font-normal text-muted-foreground shadow-none",
                        metric.isPositive
                          ? "bg-success/10"
                          : "bg-warning/10"
                      )}
                    >
                      {metric.change}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="rounded-full p-3 outline">
                <Icon size={16} aria-hidden />
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default BusinessMetricBar
