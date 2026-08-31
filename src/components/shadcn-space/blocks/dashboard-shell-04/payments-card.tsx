"use client"

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const spark = [
  { day: "M", value: 42 },
  { day: "T", value: 58 },
  { day: "W", value: 36 },
  { day: "T", value: 70 },
  { day: "F", value: 48 },
  { day: "S", value: 62 },
  { day: "S", value: 55 },
]

export function PaymentsCard({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "rounded-2xl border-0 bg-card shadow-none ring-1 ring-border",
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Payments</CardTitle>
        <span className="text-xs text-muted-foreground">Last 7 days</span>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex items-center gap-2">
          <p className="text-3xl font-semibold tracking-tight">12,389</p>
          <Badge className="border-0 bg-success/10 text-muted-foreground shadow-none">
            +26.5%
          </Badge>
        </div>

        <div className="h-[88px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={spark} barCategoryGap="28%">
              <Tooltip
                cursor={{ fill: "transparent" }}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid var(--border)",
                  fontSize: 12,
                }}
              />
              <Bar dataKey="value" fill="var(--primary)" radius={[6, 6, 6, 6]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Paypal</span>
            <span className="font-semibold">52%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-[52%] rounded-full bg-primary" />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Credit Debit Card</span>
            <span className="font-semibold">48%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-[48%] rounded-full bg-chart-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PaymentsCard
