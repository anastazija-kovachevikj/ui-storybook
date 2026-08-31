"use client"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const metrics = [
  {
    label: "Employees",
    value: "96",
    iconSrc: "/dashboard/statistics/colorful-employees.svg",
    cardBg: "bg-primary/10",
    textColor: "text-primary",
  },
  {
    label: "Clients",
    value: "3,650",
    iconSrc: "/dashboard/statistics/colorful-clients.svg",
    cardBg: "bg-chart-4/10",
    textColor: "text-chart-4",
  },
  {
    label: "Projects",
    value: "356",
    iconSrc: "/dashboard/statistics/colorful-projects.svg",
    cardBg: "bg-chart-5/10",
    textColor: "text-chart-5",
  },
  {
    label: "Events",
    value: "696",
    iconSrc: "/dashboard/statistics/colorful-events.svg",
    cardBg: "bg-destructive/10",
    textColor: "text-destructive",
  },
  {
    label: "Payroll",
    value: "$96k",
    iconSrc: "/dashboard/statistics/colorful-payroll.svg",
    cardBg: "bg-warning/10",
    textColor: "text-warning",
  },
  {
    label: "Reports",
    value: "59",
    iconSrc: "/dashboard/statistics/colorful-reports.svg",
    cardBg: "bg-chart-2/10",
    textColor: "text-chart-2",
  },
] as const

export function ColorfulDashboardSummary({
  className,
}: {
  className?: string
}) {
  return (
    <div className={cn("flex w-full items-stretch gap-6", className)}>
      {metrics.map((metric) => (
        <Card
          key={metric.label}
          className={cn(
            "min-w-0 flex-1 overflow-hidden rounded-xl border-0 py-6 shadow-none ring-0",
            metric.cardBg
          )}
        >
          <CardContent className="px-6">
            <div className="flex flex-col items-center justify-center gap-3 text-center">
              <div className="relative size-12 shrink-0 overflow-clip">
                <img
                  src={metric.iconSrc}
                  alt=""
                  width={48}
                  height={48}
                  className="block size-12 max-w-none"
                />
              </div>
              <div
                className={cn(
                  "flex flex-col items-center gap-0.5 whitespace-nowrap",
                  metric.textColor
                )}
              >
                <p className="text-sm font-semibold leading-5">{metric.label}</p>
                <p className="text-lg font-bold leading-6 tracking-tight">
                  {metric.value}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default ColorfulDashboardSummary
