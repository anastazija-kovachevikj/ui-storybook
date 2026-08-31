"use client"

import {
  Area,
  AreaChart,
  ResponsiveContainer,
} from "recharts"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const spark = [
  { v: 12 },
  { v: 18 },
  { v: 14 },
  { v: 22 },
  { v: 20 },
  { v: 28 },
  { v: 24 },
]

export function CustomersProductsCards({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-4 md:grid-cols-2", className)}>
      <Card className="rounded-2xl border-0 bg-card shadow-none ring-1 ring-border">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-base font-semibold">Customers</CardTitle>
            <span className="text-xs text-muted-foreground">Last 7 days</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <p className="text-3xl font-semibold tracking-tight">6,380</p>
            <Badge className="border-0 bg-success/10 text-muted-foreground shadow-none">
              +26.5%
            </Badge>
          </div>
          <div className="h-16">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={spark}>
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  fill="color-mix(in oklab, var(--primary) 15%, transparent)"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>April 07 - April 14</span>
            <span>Last Week 4,298</span>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-0 bg-card shadow-none ring-1 ring-border">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-base font-semibold">Products</CardTitle>
            <span className="text-xs text-muted-foreground">Last 7 days</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <p className="text-3xl font-semibold tracking-tight">12,389</p>
            <Badge className="border-0 bg-success/10 text-muted-foreground shadow-none">
              +26.5%
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            $18k Profit more than last month
          </p>
          <div className="flex h-12 items-end gap-1.5">
            {[40, 55, 35, 70, 48, 62, 50].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-md bg-primary/70"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CustomersProductsCards
