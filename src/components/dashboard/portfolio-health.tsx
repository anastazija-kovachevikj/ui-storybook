import Link from "next/link"

import type { PeriodSnapshot } from "@/components/dashboard/data"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

const valueClass = {
  primary: "text-primary",
  warning: "text-warning",
  negative: "text-destructive",
  muted: "text-foreground",
} as const

export function PortfolioHealth({
  metrics,
  className,
}: {
  metrics: PeriodSnapshot["portfolio"]
  className?: string
}) {
  return (
    <Card className={cn("min-w-0 border-border/80 shadow-sm xl:w-[360px]", className)}>
      <CardHeader className="border-b bg-muted/25">
        <CardTitle className="text-base font-semibold">
          Claims in my book
        </CardTitle>
        <CardDescription>
          Completeness of open work against the portfolio
        </CardDescription>
        <CardAction>
          <Button variant="outline" size="sm" className="h-7">
            View all
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-3">
        {metrics.map((metric) => {
          const body = (
            <>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {metric.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{metric.hint}</p>
                </div>
                <p
                  className={cn(
                    "text-sm font-semibold tabular-nums",
                    valueClass[metric.tone]
                  )}
                >
                  {metric.value}
                </p>
              </div>
              <Progress
                value={metric.progress}
                className="gap-0"
                aria-label={`${metric.label} ${metric.progress}%`}
              />
            </>
          )

          const className = cn(
            "space-y-2 rounded-lg border border-border p-3",
            metric.href && "transition-colors hover:bg-muted/40"
          )

          if (metric.href) {
            return (
              <Link key={metric.id} href={metric.href} className={className}>
                {body}
              </Link>
            )
          }

          return (
            <div key={metric.id} className={className}>
              {body}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
