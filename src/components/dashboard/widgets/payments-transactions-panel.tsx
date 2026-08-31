"use client"

import { CreditCard, MoreHorizontal, ShoppingBag } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const cards = [
  {
    last4: "**** 8942",
    balance: "$26,561",
    className: "bg-foreground text-background",
    muted: "text-background/80",
  },
  {
    last4: "**** 8942",
    balance: "$46,561",
    className: "bg-chart-2/10 text-foreground",
    muted: "text-foreground/80",
  },
]

const transactions = [
  {
    title: "Netflix Subscription",
    time: "Today, 09:23am",
    status: "Approved",
    statusClass: "bg-success/10 text-success",
    amount: "- $4.58",
    bonus: "+5 Bonus",
    bonusClass: "text-destructive",
    icon: ShoppingBag,
  },
  {
    title: "Upwork",
    time: "August 15, 10:35pm",
    status: "Pending",
    statusClass: "bg-warning/10 text-warning",
    amount: "+ $15.60",
    bonus: "+30 Bonus",
    bonusClass: "text-success",
    icon: CreditCard,
  },
]

export function PaymentsTransactionsPanel({
  className,
}: {
  className?: string
}) {
  return (
    <Card
      className={cn(
        "rounded-xl border-0 bg-card shadow-none ring-1 ring-foreground/10 [--card-spacing:--spacing(8)]",
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
        <CardTitle className="text-lg font-semibold leading-7">
          Payment Methods
        </CardTitle>
        <Button variant="ghost" size="icon" className="size-9 rounded-full">
          <MoreHorizontal className="size-5" />
          <span className="sr-only">More options</span>
        </Button>
      </CardHeader>
      <CardContent className="space-y-8 pt-8">
        <div className="grid gap-5 sm:grid-cols-2">
          {cards.map((card, index) => (
            <div
              key={`${card.balance}-${index}`}
              className={cn(
                "flex flex-col rounded-md p-6",
                card.className
              )}
            >
              <div className="mb-10 flex items-start justify-between">
                <p className="text-lg font-semibold">{card.last4}</p>
                <CreditCard className="size-8 opacity-80" />
              </div>
              <p className={cn("text-sm font-medium", card.muted)}>Balance</p>
              <p className="pt-1 text-lg font-semibold">{card.balance}</p>
            </div>
          ))}
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between border-b border-border pb-4">
            <p className="text-base font-semibold">Transactions</p>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:underline"
            >
              See All
              <span aria-hidden>→</span>
            </a>
          </div>
          <ul>
            {transactions.map((tx) => {
              const Icon = tx.icon
              return (
                <li
                  key={tx.title}
                  className="flex items-center gap-4 border-b border-border py-4 last:border-b-0"
                >
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-muted">
                    <Icon className="size-6 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-base font-semibold">
                      {tx.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{tx.time}</p>
                  </div>
                  <Badge
                    className={cn(
                      "border-0 shadow-none",
                      tx.statusClass
                    )}
                  >
                    {tx.status}
                  </Badge>
                  <div className="w-[100px] shrink-0 text-right">
                    <p className="text-base font-semibold">{tx.amount}</p>
                    <p className={cn("text-xs font-medium", tx.bonusClass)}>
                      {tx.bonus}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

export default PaymentsTransactionsPanel
