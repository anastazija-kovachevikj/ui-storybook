"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const products = [
  {
    name: "MaterialPro Dashboard",
    amount: "$23,568",
    progress: 55,
    barClass: "bg-primary",
    trackClass: "bg-primary/10",
    pillClass: "bg-primary/10 text-primary",
  },
  {
    name: "Flexy Admin Template",
    amount: "$24,468",
    progress: 65,
    barClass: "bg-chart-2",
    trackClass: "bg-chart-2/10",
    pillClass: "bg-chart-2/10 text-chart-2",
  },
]

export function BestSellingProducts({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border-0 bg-primary p-0 text-primary-foreground shadow-none ring-1 ring-foreground/10",
        className
      )}
    >
      <CardHeader className="space-y-0 px-6 pt-6 pb-0">
        <CardTitle className="text-lg font-medium leading-7 text-primary-foreground">
          Best Selling Products
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-0 px-6 pt-6 pb-6">
        <div className="relative z-0 flex h-[160px] items-start justify-center overflow-hidden rounded-xl bg-primary/10 pt-3 sm:h-[190px]">
          <img
            src="/dashboard/crm-best-selling-bg.png"
            alt=""
            className="h-full w-auto max-w-full object-contain object-bottom"
          />
        </div>
        <div className="relative z-10 space-y-5 rounded-xl bg-card p-5">
          {products.map((product) => (
            <div key={product.name} className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-base font-medium leading-6 text-foreground">
                    {product.name}
                  </p>
                  <p className="text-sm leading-5 text-muted-foreground">
                    {product.amount}
                  </p>
                </div>
                <span
                  className={cn(
                    "inline-flex h-[26px] shrink-0 items-center rounded-full px-2 text-sm font-medium",
                    product.pillClass
                  )}
                >
                  {product.progress}%
                </span>
              </div>
              <div
                className={cn(
                  "h-1.5 w-full overflow-hidden rounded-full",
                  product.trackClass
                )}
              >
                <div
                  className={cn("h-full rounded-full", product.barClass)}
                  style={{ width: `${product.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default BestSellingProducts
