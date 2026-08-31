"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemedSvg } from "@/components/ui/themed-svg"
import { cn } from "@/lib/utils"

const rows = [
  {
    title: "64 new orders",
    subtitle: "Processing",
    iconSrc: "/dashboard/widgets/order-processing.svg",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    title: "4 orders",
    subtitle: "On hold",
    iconSrc: "/dashboard/widgets/order-hold.svg",
    iconBg: "bg-chart-2/10",
    iconColor: "text-chart-2",
  },
  {
    title: "12 orders",
    subtitle: "Delivered",
    iconSrc: "/dashboard/widgets/order-delivered.svg",
    iconBg: "bg-chart-4/10",
    iconColor: "text-chart-4",
  },
]

const gaugeSegments = [
  {
    src: "/dashboard/widgets/gauge-1.svg",
    color: "text-primary",
    style: { top: "42.82%", right: "76.51%", bottom: "20%", left: "12%" },
  },
  {
    src: "/dashboard/widgets/gauge-2.svg",
    color: "text-chart-2",
    style: { top: "22.9%", right: "59.33%", bottom: "55.39%", left: "21.66%" },
  },
  {
    src: "/dashboard/widgets/gauge-3.svg",
    color: "text-chart-4",
    style: { top: "20.63%", right: "29.69%", bottom: "64.9%", left: "41.5%" },
  },
  {
    src: "/dashboard/widgets/gauge-4.svg",
    color: "text-chart-2/10",
    style: { top: "31.55%", right: "16.72%", bottom: "45.63%", left: "69.65%" },
  },
  {
    src: "/dashboard/widgets/gauge-5.svg",
    color: "text-primary/10",
    style: { top: "54.12%", right: "12%", bottom: "20%", left: "80.6%" },
  },
]

export function OrderPerformance({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "rounded-xl border-0 bg-card shadow-none ring-1 ring-foreground/10 [--card-spacing:--spacing(6)]",
        className
      )}
    >
      <CardHeader className="gap-0 space-y-0 pb-0">
        <CardTitle className="text-lg font-semibold leading-7 text-foreground">
          Your Performance
        </CardTitle>
        <p className="text-sm leading-5 text-muted-foreground">
          Last check on 25 february
        </p>
      </CardHeader>
      <CardContent className="flex items-start">
        <div className="flex min-w-0 flex-1 flex-col gap-5">
          {rows.map((row) => (
            <div key={row.subtitle} className="flex items-center gap-4">
              <div
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-lg p-3",
                  row.iconBg
                )}
              >
                <ThemedSvg
                  src={row.iconSrc}
                  className={cn("size-4", row.iconColor)}
                />
              </div>
              <div className="min-w-0">
                <p className="text-base font-medium leading-6 text-foreground">
                  {row.title}
                </p>
                <p className="text-sm leading-5 text-muted-foreground">
                  {row.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative h-[128px] w-[200px] max-w-[256px] shrink-0">
          <div className="absolute inset-0 overflow-hidden">
            {gaugeSegments.map((segment) => (
              <div
                key={segment.src}
                className="absolute"
                style={segment.style}
              >
                <ThemedSvg
                  src={segment.src}
                  className={cn(
                    "absolute inset-0 block size-full max-w-none",
                    segment.color
                  )}
                />
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end pb-1 text-center">
            <p className="text-2xl font-bold leading-8 tracking-[-0.6px] text-foreground">
              260
            </p>
            <p className="w-[128px] text-[11px] leading-[13.75px] text-muted-foreground">
              Learn insights how to manage all aspects of your startup.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default OrderPerformance
