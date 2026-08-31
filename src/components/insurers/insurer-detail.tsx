"use client"

import { ArrowLeft, Building2, MapPin, MoreHorizontal, Pencil, StickyNote, UserRound } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { InfoCard, InfoFieldList } from "@/components/ui/info-card"

const empty = "—"

export function InsurerDetail() {
  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-background">
      <header className="flex h-14 shrink-0 items-center justify-between border-b bg-card px-5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary"><Building2 className="size-4" /></span>
          <div className="min-w-0"><p className="truncate text-sm font-semibold">Dzoni Najlepshi</p><p className="text-xs text-muted-foreground">Insurers · Client record</p></div>
        </div>
        <Button variant="ghost" size="icon-sm" aria-label="More actions"><MoreHorizontal className="size-4" /></Button>
      </header>
      <main className="flex-1 overflow-y-auto bg-muted/35">
        <div className="mx-auto max-w-[1200px] space-y-5 p-5 md:p-6 lg:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3">
              <Link href="/" aria-label="Back to insurers" className="mt-0.5 flex size-9 items-center justify-center rounded-full border bg-card text-muted-foreground hover:bg-muted"><ArrowLeft className="size-4" /></Link>
              <div><div className="flex flex-wrap items-center gap-2"><h1 className="text-2xl font-bold tracking-tight">Dzoni Najlepshi</h1><Badge variant="outline" className="border-success/30 bg-success-muted text-success">Active</Badge></div><p className="mt-1.5 text-sm text-muted-foreground">Insurer record · Created 30 May 2026 · Assigned to Kosta Trpkov</p></div>
            </div>
            <Button className="h-9 gap-1.5 self-start"><Pencil className="size-3.5" />Edit record</Button>
          </div>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
            <InfoCard title="Company profile" icon={<Building2 />} editable>
              <div className="space-y-5">
                <div>
                  <p className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">Legal and account details</p>
                  <InfoFieldList fields={[{ label: "Tax number (PIB)", value: "21321321323113", mono: true }, { label: "Registration number", value: empty }, { label: "Bank account", value: empty }, { label: "Industry", value: empty }, { label: "Employees", value: empty }, { label: "Established", value: empty }]} />
                </div>
                <div className="border-t pt-5">
                  <div className="mb-2 flex items-center gap-2"><MapPin className="size-4 text-muted-foreground" /><p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Billing address</p></div>
                  <InfoFieldList fields={[{ label: "Street", value: empty }, { label: "City", value: empty }, { label: "State", value: empty }, { label: "Postal code", value: empty }, { label: "Country", value: empty }]} />
                </div>
                <p className="border-t pt-4 text-xs text-muted-foreground">Managed by <span className="font-medium text-foreground">Kosta Trpkov</span> · Created 30.05.2026</p>
              </div>
            </InfoCard>
            <aside className="flex self-stretch flex-col gap-4">
              <InfoCard title="Primary contact" icon={<UserRound />} editable className="h-auto shrink-0">
                <InfoFieldList fields={[{ label: "Contact person", value: empty }, { label: "Email", value: empty }, { label: "Phone", value: empty }, { label: "Mobile", value: empty }, { label: "Website", value: empty }]} />
              </InfoCard>
              <InfoCard title="Notes" icon={<StickyNote />} editable className="h-auto flex-1">
                <div className="flex h-full min-h-28 items-center justify-center rounded-lg border border-dashed border-border bg-muted/25 px-4 text-center text-sm text-muted-foreground">No notes have been added yet.</div>
              </InfoCard>
            </aside>
          </div>

        </div>
      </main>
    </div>
  )
}
