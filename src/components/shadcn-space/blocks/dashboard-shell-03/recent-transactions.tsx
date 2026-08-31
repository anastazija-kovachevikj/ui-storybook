"use client"

import {
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  Landmark,
  Wallet,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const transactions = [
  {
    title: "Paypal",
    subtitle: "Big Brands",
    amount: "+$6,235",
    positive: true,
    icon: Wallet,
    iconBg: "bg-primary/10 text-primary",
  },
  {
    title: "Wallet",
    subtitle: "Big Brands",
    amount: "+$345",
    positive: true,
    icon: Wallet,
    iconBg: "bg-chart-5/10 text-chart-5",
  },
  {
    title: "Credit card",
    subtitle: "Money reversed",
    amount: "+$2,235",
    positive: true,
    icon: CreditCard,
    iconBg: "bg-chart-4/10 text-chart-4",
  },
  {
    title: "Bank Transfer",
    subtitle: "Money added",
    amount: "+$320",
    positive: true,
    icon: Landmark,
    iconBg: "bg-chart-2/10 text-chart-2",
  },
  {
    title: "Refund",
    subtitle: "Bill payment",
    amount: "-$32",
    positive: false,
    icon: ArrowDownLeft,
    iconBg: "bg-destructive/10 text-destructive",
  },
]

export function RecentTransactions({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "rounded-2xl border-0 bg-card shadow-none ring-1 ring-border",
        className
      )}
    >
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Recent Transactions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {transactions.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.title}
              className="flex items-center justify-between gap-3 rounded-xl px-1 py-2.5"
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex size-9 items-center justify-center rounded-full",
                    item.iconBg
                  )}
                >
                  <Icon className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm font-semibold">
                {item.positive ? (
                  <ArrowUpRight className="size-3.5 text-success" />
                ) : (
                  <ArrowDownLeft className="size-3.5 text-destructive" />
                )}
                <span
                  className={
                    item.positive ? "text-success" : "text-destructive"
                  }
                >
                  {item.amount}
                </span>
              </div>
            </div>
          )
        })}
        <Button variant="outline" className="mt-3 w-full rounded-xl">
          View full report
        </Button>
      </CardContent>
    </Card>
  )
}

export default RecentTransactions
