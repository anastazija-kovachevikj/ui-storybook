"use client"

import {
  BadgeDollarSign,
  RotateCcw,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const metrics: Array<{
  label: string
  value: string
  change: string
  positive: boolean
  icon: LucideIcon
}> = [
  {
    label: "Refunds",
    value: "434",
    change: "-12%",
    positive: false,
    icon: RotateCcw,
  },
  {
    label: "Sales",
    value: "2358",
    change: "+23%",
    positive: true,
    icon: ShoppingBag,
  },
  {
    label: "Earnings",
    value: "$245k",
    change: "-12%",
    positive: false,
    icon: BadgeDollarSign,
  },
]

export function MetricStatCards({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 gap-4 sm:grid-cols-3", className)}>
      {metrics.map((metric) => {
        const Icon = metric.icon
        return (
          <Card
            key={metric.label}
            className="rounded-2xl border-0 bg-card py-5 shadow-none ring-1 ring-border"
          >
            <CardContent className="flex items-start justify-between px-5">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-semibold tracking-tight">
                    {metric.value}
                  </p>
                  <Badge
                    className={cn(
                      "border-0 shadow-none",
                      metric.positive
                        ? "bg-success/10 text-muted-foreground"
                        : "bg-destructive/10 text-muted-foreground"
                    )}
                  >
                    {metric.change}
                  </Badge>
                </div>
              </div>
              <div className="rounded-full border border-border p-2.5 text-muted-foreground">
                <Icon className="size-4" />
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default MetricStatCards
