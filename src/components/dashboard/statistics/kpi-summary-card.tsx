"use client"

import { ArrowRight, CalendarDays, ShoppingBag, type LucideIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const metrics = [
  {
    label: "Earnings",
    value: "$27,850",
    percentage: "+18%",
    isPositive: true,
  },
  {
    label: "Expense",
    value: "$18,453",
    percentage: "-5%",
    isPositive: false,
  },
]

const secondaryStats: Array<{
  title: string
  value: string
  percentage: string
  icon: LucideIcon
}> = [
  {
    title: "Weekly Sales",
    value: "$4,587",
    percentage: "+18%",
    icon: CalendarDays,
  },
  {
    title: "Purchase Orders",
    value: "230",
    percentage: "+18%",
    icon: ShoppingBag,
  },
]

export function KpiSummaryCard({ className }: { className?: string }) {
  return (
    <div className={cn("grid h-full w-full grid-cols-12 gap-6", className)}>
      <div className="col-span-12 h-full xl:col-span-6">
        <Card className="relative h-full rounded-2xl border p-0 shadow-xs ring-0">
          <CardContent className="relative p-0">
            <div className="flex flex-col justify-between gap-9 py-4 ps-6 pe-4 sm:pe-44">
              <div>
                <p className="text-lg font-medium text-card-foreground">
                  Analytics Dashboard
                </p>
                <p className="text-xs font-normal text-muted-foreground">
                  Check all the statistics
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-6 sm:flex-nowrap">
                {metrics.map((metric, index) => (
                  <div key={metric.label} className="flex items-center gap-6">
                    <div>
                      <p className="text-xs font-normal text-muted-foreground">
                        {metric.label}
                      </p>
                      <div className="flex items-center gap-1">
                        <p className="text-2xl font-medium text-card-foreground">
                          {metric.value}
                        </p>
                        <Badge
                          className={cn(
                            "border-0 font-normal text-muted-foreground shadow-none",
                            metric.isPositive
                              ? "bg-success/10"
                              : "bg-destructive/10"
                          )}
                        >
                          {metric.percentage}
                        </Badge>
                      </div>
                    </div>
                    {index < metrics.length - 1 && (
                      <Separator
                        orientation="vertical"
                        className="hidden h-12 sm:block"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <img
              src="/dashboard/statistics/analytics-dashboard-illustration.webp"
              alt=""
              width={211}
              height={168}
              className="pointer-events-none absolute right-0 bottom-0 hidden sm:block"
            />
          </CardContent>
        </Card>
      </div>

      {secondaryStats.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.title}
            className="col-span-12 sm:col-span-6 xl:col-span-3"
          >
            <Card className="rounded-2xl border py-6 shadow-xs ring-0">
              <CardContent className="flex items-start justify-between px-6">
                <div className="flex flex-col justify-between gap-5">
                  <div className="flex flex-col gap-1">
                    <p className="text-lg font-medium text-card-foreground">
                      {stat.title}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-2xl font-medium text-card-foreground">
                        {stat.value}
                      </p>
                      <Badge className="border-0 bg-success/10 font-normal text-muted-foreground shadow-none">
                        {stat.percentage}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="h-9 w-fit cursor-pointer gap-1.5 rounded-xl shadow-xs"
                  >
                    <span>See Report</span>
                    <ArrowRight size={16} />
                  </Button>
                </div>
                <div className="rounded-full p-3 outline">
                  <Icon size={16} aria-hidden />
                </div>
              </CardContent>
            </Card>
          </div>
        )
      })}
    </div>
  )
}

export default KpiSummaryCard
