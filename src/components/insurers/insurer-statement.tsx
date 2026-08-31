"use client"

import { useState } from "react"
import { ArrowLeft, CalendarDays, CheckCircle2, CircleDollarSign, Download, ReceiptText, RotateCcw, WalletCards } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const summaries = [
  { label: "Total invoiced", detail: "All issued invoices", value: "0,00 RSD", Icon: ReceiptText, iconClass: "bg-primary/10 text-primary" },
  { label: "Total paid", detail: "Payments received", value: "0,00 RSD", Icon: CheckCircle2, iconClass: "bg-success-muted text-success" },
  { label: "Total credits", detail: "Credits applied", value: "0,00 RSD", Icon: CircleDollarSign, iconClass: "bg-warning-muted text-warning" },
  { label: "Balance due", detail: "Currently outstanding", value: "0,00 RSD", Icon: WalletCards, iconClass: "bg-muted text-muted-foreground" },
]

export function InsurerStatement() {
  const [period, setPeriod] = useState("year")
  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-background">
      <header className="flex h-14 shrink-0 items-center justify-between border-b bg-card px-5">
        <div className="flex min-w-0 items-center gap-3"><span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary"><WalletCards className="size-4" /></span><div><p className="text-sm font-semibold">Statement</p><p className="text-xs text-muted-foreground">Dzoni Najlepshi · Financial activity</p></div></div>
        <Button variant="outline" size="sm" className="gap-1.5"><Download className="size-3.5" />Export</Button>
      </header>
      <main className="flex-1 overflow-y-auto bg-muted/35">
        <div className="mx-auto max-w-[1200px] space-y-5 p-5 md:p-6 lg:p-8">
          <div className="flex items-start gap-3"><Link href="/insurers/dzoni-najlepshi" aria-label="Back to insurer" className="mt-0.5 flex size-9 items-center justify-center rounded-full border bg-card text-muted-foreground hover:bg-muted"><ArrowLeft className="size-4" /></Link><div><h1 className="text-2xl font-bold tracking-tight">Account statement</h1><p className="mt-1 text-sm text-muted-foreground">Review invoices, payments, credits, and outstanding balance for a selected period.</p></div></div>

          <div className="space-y-3"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div className="flex flex-wrap items-center gap-2"><div className="flex rounded-lg bg-muted p-1" role="group" aria-label="Quick date ranges">{[{ id: "month", label: "This month" }, { id: "30d", label: "Last 30 days" }, { id: "year", label: "This year" }].map((item) => <button key={item.id} type="button" onClick={() => setPeriod(item.id)} className={cn("h-7 rounded-md px-2.5 text-xs font-medium transition-colors", period === item.id ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}>{item.label}</button>)}</div><Button variant={period === "custom" ? "secondary" : "outline"} size="sm" className="h-8" onClick={() => setPeriod("custom")}>Custom range</Button></div><p className="text-xs text-muted-foreground">All amounts in RSD</p></div>{period === "custom" && <div className="flex flex-col gap-3 border-t pt-3 sm:flex-row sm:items-end"><DateField label="From" value="01.01.2026" /><DateField label="To" value="10.08.2026" /><Button className="h-9">Apply range</Button><Button variant="ghost" size="sm" className="h-9 gap-1.5 text-muted-foreground"><RotateCcw className="size-3.5" />Reset</Button></div>}</div>

          <section aria-label="Statement analytics"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{summaries.map((item) => <AnalyticsCard key={item.label} {...item} />)}</div></section>

          <Card className="min-h-[340px] border-border/80 shadow-sm"><CardContent className="flex min-h-[340px] flex-col items-center justify-center p-6 text-center"><span className="flex size-12 items-center justify-center rounded-xl bg-muted text-muted-foreground"><ReceiptText className="size-5" /></span><h2 className="mt-4 text-base font-semibold">No transactions for this period</h2><p className="mt-1 max-w-sm text-sm leading-6 text-muted-foreground">There are no invoices, payments, or credits between 01 Jan and 10 Aug 2026.</p><Button variant="outline" className="mt-5 gap-1.5"><CalendarDays className="size-3.5" />Change period</Button></CardContent></Card>
        </div>
      </main>
    </div>
  )
}

function DateField({ label, value }: { label: string; value: string }) {
  return <label className="grid gap-1 text-xs font-medium text-muted-foreground"><span>{label}</span><div className="relative"><CalendarDays className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" /><Input value={value} readOnly className="h-9 w-[150px] bg-background pl-8 text-sm" /></div></label>
}

function AnalyticsCard({ label, detail, value, Icon, iconClass }: (typeof summaries)[number]) {
  return <Card className="border-border/80 shadow-sm"><CardContent className="p-4"><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-medium text-foreground">{label}</p><p className="mt-0.5 text-xs text-muted-foreground">{detail}</p></div><span className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${iconClass}`}><Icon className="size-4" /></span></div><p className="mt-5 text-2xl font-semibold tracking-tight tabular-nums">{value}</p></CardContent></Card>
}
