"use client"

import { Package, PauseCircle, Truck } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const orders = [
  {
    count: "64",
    label: "Processing",
    detail: "new orders",
    icon: Package,
    iconBg: "bg-primary/10 text-primary",
  },
  {
    count: "4",
    label: "On hold",
    detail: "orders",
    icon: PauseCircle,
    iconBg: "bg-chart-4/10 text-chart-4",
  },
  {
    count: "12",
    label: "Delivered",
    detail: "orders",
    icon: Truck,
    iconBg: "bg-chart-5/10 text-chart-5",
  },
]

export function CongratsBanner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-1 gap-4 sm:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] sm:gap-5",
        className
      )}
    >
      <Card className="relative overflow-hidden rounded-2xl border-0 bg-primary text-primary-foreground shadow-none">
        <CardContent className="relative z-10 flex h-full min-h-[200px] flex-col justify-center gap-3 p-8 pe-28 sm:min-h-full">
          <p className="text-xl font-semibold">Congratulations Jonathan</p>
          <p className="text-sm text-primary-foreground/80">
            You have done 38% more sales
          </p>
        </CardContent>
        <img
          src="https://images.shadcnspace.com/assets/backgrounds/download-img.png"
          alt=""
          className="pointer-events-none absolute right-2 bottom-0 h-36 w-36 object-contain opacity-90"
        />
      </Card>

      <div className="flex flex-col gap-4">
        {orders.map((order) => {
          const Icon = order.icon
          return (
            <Card
              key={order.label}
              className="rounded-2xl border-0 bg-card py-5 shadow-none ring-1 ring-border"
            >
              <CardContent className="flex items-start justify-between px-5">
                <div className="space-y-0.5">
                  <p className="text-2xl font-semibold tracking-tight">
                    {order.count}
                  </p>
                  <p className="text-sm font-medium">{order.label}</p>
                  <p className="text-xs text-muted-foreground">{order.detail}</p>
                </div>
                <div className={cn("rounded-full p-2.5", order.iconBg)}>
                  <Icon className="size-4" />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default CongratsBanner
