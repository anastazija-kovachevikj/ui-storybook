"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const streams = [
  {
    label: "Product Sales",
    amount: "$312,500.45",
    percent: "(65%)",
    color: "bg-primary",
    width: "65%",
  },
  {
    label: "Service Revenue",
    amount: "$125,000.25",
    percent: "(26%)",
    color: "bg-chart-2",
    width: "26%",
  },
  {
    label: "Other Income",
    amount: "$40,730.20",
    percent: "(9%)",
    color: "bg-chart-5",
    width: "9%",
  },
]

export function AssetDistribution({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "rounded-xl border-0 bg-card shadow-none ring-1 ring-foreground/10 [--card-spacing:--spacing(8)]",
        className
      )}
    >
      <CardHeader className="gap-5 space-y-0 pb-0">
        <CardTitle className="text-lg font-semibold leading-7">
          Total Assets
        </CardTitle>
        <div className="space-y-1.5">
          <p className="text-2xl font-semibold tracking-tight">$478,230.90</p>
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge className="border-0 bg-success/10 font-medium text-muted-foreground shadow-none">
              +14.6%
            </Badge>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">+$65,000</span>
              <span className="text-xs"> compared to last year</span>
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-8">
        <div className="space-y-2.5">
          <p className="text-sm font-medium text-foreground">Distribution</p>
          <div className="flex h-8 w-full overflow-hidden rounded-md">
            {streams.map((stream) => (
              <div
                key={stream.label}
                className={cn("h-full", stream.color)}
                style={{ width: stream.width }}
              />
            ))}
          </div>
        </div>
        <ul className="space-y-0">
          {streams.map((stream, index) => (
            <li
              key={stream.label}
              className={cn(
                "flex items-center justify-between gap-3 py-3",
                index === 1 && "border-y border-border"
              )}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={cn("size-2 shrink-0 rounded-full", stream.color)}
                />
                <span className="text-sm font-medium">{stream.label}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-medium">{stream.amount}</span>
                <span className="text-xs text-muted-foreground">
                  {stream.percent}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export default AssetDistribution
