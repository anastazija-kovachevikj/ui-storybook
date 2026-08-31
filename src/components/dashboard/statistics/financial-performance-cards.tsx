"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ThemedSvg } from "@/components/ui/themed-svg"
import { cn } from "@/lib/utils"

type FinancialCard = {
  label: string
  value: string
  delta: string
  change: string
  tone: "up" | "down"
  chartSrc: string
  chartColor: string
  chartWidth: number
  chartHeight: number
}

const cards: FinancialCard[] = [
  {
    label: "Total sales",
    value: "$45,320.75",
    delta: "+$1,470",
    change: "+18%",
    tone: "up",
    chartSrc: "/dashboard/statistics/financial-total-sales-chart.svg",
    chartColor: "text-primary",
    chartWidth: 96,
    chartHeight: 96,
  },
  {
    label: "Total profit",
    value: "$18,260.50",
    delta: "-$680",
    change: "-14%",
    tone: "down",
    chartSrc: "/dashboard/statistics/financial-total-profit-chart.svg",
    chartColor: "text-chart-2",
    chartWidth: 96,
    chartHeight: 96,
  },
  {
    label: "Advertising costs",
    value: "$3,150.00",
    delta: "+$179",
    change: "+16%",
    tone: "up",
    chartSrc: "/dashboard/statistics/financial-advertising-costs-chart.svg",
    chartColor: "text-chart-5",
    chartWidth: 128,
    chartHeight: 96,
  },
]

export function FinancialPerformanceCards({
  className,
}: {
  className?: string
}) {
  return (
    <div className={cn("flex w-full items-stretch gap-6", className)}>
      {cards.map((card) => (
        <Card
          key={card.label}
          className="min-w-0 flex-1 overflow-hidden rounded-xl border bg-card py-0 shadow-xs ring-0"
        >
          <CardContent className="flex items-center justify-between gap-4 p-6">
            <div className="flex min-w-0 flex-col gap-1">
              <p className="text-sm text-muted-foreground">{card.label}</p>
              <p className="text-2xl font-semibold tracking-tight text-foreground">
                {card.value}
              </p>
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">{card.delta}</p>
                <Badge
                  className={cn(
                    "rounded-full border-0 font-normal text-muted-foreground shadow-none",
                    card.tone === "up" ? "bg-success/10" : "bg-destructive/10"
                  )}
                >
                  {card.change}
                </Badge>
              </div>
            </div>

            <div
              className="relative shrink-0 overflow-clip"
              style={{
                width: card.chartWidth,
                height: card.chartHeight,
              }}
              aria-hidden
            >
              <ThemedSvg
                src={card.chartSrc}
                className={cn("size-full max-w-none", card.chartColor)}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default FinancialPerformanceCards
