"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ThemedSvg } from "@/components/ui/themed-svg"
import { cn } from "@/lib/utils"

const orders = [
  {
    title: "64 new orders",
    subtitle: "Processing",
    iconSrc: "/dashboard/widgets/sales-order-processing.svg",
    iconBg: "bg-chart-5/10",
    iconColor: "text-chart-5",
  },
  {
    title: "4 orders",
    subtitle: "On hold",
    iconSrc: "/dashboard/widgets/sales-order-hold.svg",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    title: "12 orders",
    subtitle: "Delivered",
    iconSrc: "/dashboard/widgets/sales-order-delivered.svg",
    iconBg: "bg-chart-4/10",
    iconColor: "text-chart-4",
  },
]

export function SalesPerformanceSummary({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "w-full overflow-hidden rounded-xl border-0 bg-card shadow-none ring-1 ring-foreground/10 [--card-spacing:--spacing(6)]",
        className
      )}
    >
      <CardContent className="flex items-center gap-6">
        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <div>
            <p className="text-lg font-semibold leading-7 text-foreground">
              Congratulations Jonathan
            </p>
            <p className="text-sm leading-5 text-muted-foreground">
              You have done 38% more sales
            </p>
          </div>

          {orders.map((order) => (
            <div key={order.subtitle} className="flex items-center gap-4">
              <div
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center overflow-clip rounded-lg p-3",
                  order.iconBg
                )}
              >
                <ThemedSvg
                  src={order.iconSrc}
                  className={cn("size-4", order.iconColor)}
                />
              </div>
              <div className="min-w-0">
                <p className="text-base font-semibold leading-6 text-foreground">
                  {order.title}
                </p>
                <p className="text-sm leading-5 text-muted-foreground">
                  {order.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative hidden h-[236px] w-[260px] shrink-0 sm:block" aria-hidden />
      </CardContent>
    </Card>
  )
}

export default SalesPerformanceSummary
