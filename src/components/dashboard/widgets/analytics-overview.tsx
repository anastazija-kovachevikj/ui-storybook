"use client"

import { Badge } from "@/components/ui/badge"
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

export function AnalyticsOverview({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-card p-0 shadow-none",
        className
      )}
    >
      <CardContent className="relative p-0">
        <div className="flex flex-col justify-between gap-10 py-8 ps-8 pe-28 sm:pe-52">
          <div className="space-y-1">
            <p className="text-lg font-medium text-card-foreground">
              Analytics Dashboard
            </p>
            <p className="text-xs font-normal text-muted-foreground">
              Check all the statistics
            </p>
          </div>
          <div className="flex items-center gap-8">
            {metrics.map((metric, index) => (
              <div key={metric.label} className="flex items-center gap-8">
                <div className="space-y-1">
                  <p className="text-xs font-normal text-muted-foreground">
                    {metric.label}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <p className="text-2xl font-medium text-card-foreground">
                      {metric.value}
                    </p>
                    <Badge
                      className={cn(
                        "border-0 font-normal text-muted-foreground shadow-none",
                        metric.isPositive ? "bg-success/10" : "bg-destructive/10"
                      )}
                    >
                      {metric.percentage}
                    </Badge>
                  </div>
                </div>
                {index < metrics.length - 1 && (
                  <Separator orientation="vertical" className="h-12" />
                )}
              </div>
            ))}
          </div>
        </div>
        <img
          src="https://images.shadcnspace.com/assets/backgrounds/stats-01.webp"
          alt=""
          width={211}
          height={169}
          className="pointer-events-none absolute right-0 bottom-0 hidden sm:block"
        />
      </CardContent>
    </Card>
  )
}

export default AnalyticsOverview
