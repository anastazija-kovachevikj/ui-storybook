"use client"

import { ShoppingCart, Store } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const steps = [
  {
    title: "Added to Cart",
    clicks: "5 clicks",
    amount: "$21,120.70",
    change: "+13.2%",
    positive: true,
    icon: ShoppingCart,
    iconBg: "bg-primary/10 text-primary",
  },
  {
    title: "Reached to Checkout",
    clicks: "12 clicks",
    amount: "$16,100.00",
    change: "-7.4%",
    positive: false,
    icon: Store,
    iconBg: "bg-chart-4/10 text-chart-4",
  },
]

export function AnnualProfit({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "rounded-2xl border-0 bg-card shadow-none ring-1 ring-border",
        className
      )}
    >
      <CardHeader>
        <CardTitle className="text-base font-semibold">Annual Profit</CardTitle>
        <p className="text-xs text-muted-foreground">Conversion Rate</p>
        <p className="text-3xl font-semibold tracking-tight">18.4%</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {steps.map((step) => {
          const Icon = step.icon
          return (
            <div
              key={step.title}
              className="flex items-start justify-between gap-3 rounded-xl border border-border/70 p-3"
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "mt-0.5 flex size-9 items-center justify-center rounded-full",
                    step.iconBg
                  )}
                >
                  <Icon className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">{step.title}</p>
                  <p className="text-xs text-muted-foreground">{step.clicks}</p>
                  <p className="mt-1 text-sm font-semibold">{step.amount}</p>
                </div>
              </div>
              <Badge
                className={cn(
                  "border-0 shadow-none",
                  step.positive
                    ? "bg-success/10 text-muted-foreground"
                    : "bg-destructive/10 text-muted-foreground"
                )}
              >
                {step.change}
              </Badge>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default AnnualProfit
