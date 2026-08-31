"use client"

import { useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  MoreHorizontal,
  Send,
  ShieldCheck,
  StickyNote,
} from "lucide-react"
import Link from "next/link"

import { DashboardSidebar } from "@/components/dashboard"
import {
  displayValue,
  policyDetail,
  type PolicyDetail,
  type PolicyTab,
} from "@/components/policies/data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DocumentsDisplay } from "@/components/ui/documents-display"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { InfoCard, InfoFieldList } from "@/components/ui/info-card"
import { cn } from "@/lib/utils"

const tabs: { id: PolicyTab; label: string; count?: number }[] = [
  { id: "details", label: "Details" },
  { id: "items", label: "Items", count: 1 },
  { id: "documents", label: "Documents" },
  { id: "activity", label: "Activity" },
]

function StatusBadge({ status }: { status: PolicyDetail["status"] }) {
  return (
    <Badge className="border-warning/35 bg-warning-muted text-warning" variant="outline">
      {status}
    </Badge>
  )
}

function TopBar({ code }: { code: string }) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-card px-4 sm:px-5">
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground">
          <FileText className="size-4" aria-hidden />
        </span>
        <span className="h-4 w-px bg-border" aria-hidden />
        <div className="min-w-0 leading-tight">
          <p className="truncate text-sm font-semibold text-foreground">{code}</p>
          <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>Insurance</span>
            <ChevronRight className="size-3" aria-hidden />
            <span className="text-foreground">Policies</span>
          </nav>
        </div>
      </div>
      <Button variant="ghost" size="icon-sm" className="relative" aria-label="Notifications">
        <Bell className="size-4" aria-hidden />
        <span className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">3</span>
      </Button>
    </header>
  )
}

function PageHeader({ detail }: { detail: PolicyDetail }) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
      <div className="flex min-w-0 items-start gap-3">
        <Link href="/policies" aria-label="Back to policies" className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
          <ArrowLeft className="size-4" aria-hidden />
        </Link>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">{detail.draftCode}</h1>
            <StatusBadge status={detail.status} />
          </div>
          <p className="mt-1.5 max-w-3xl text-sm leading-5 text-muted-foreground">
            <span className="font-medium text-foreground/85">{detail.insuredName}</span>
            <span className="mx-1.5 text-border">·</span>
            Partner: {detail.partner}
            <span className="mx-1.5 text-border">·</span>
            HID {detail.hid}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 pl-[52px] sm:pl-0">
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label="More policy actions" />}>
            <MoreHorizontal className="size-4" aria-hidden />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Duplicate policy</DropdownMenuItem>
            <DropdownMenuItem>Export record</DropdownMenuItem>
            <DropdownMenuItem variant="destructive">Archive policy</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button size="sm" className="gap-1.5">
          Record signature
          <ArrowRight className="size-3.5" aria-hidden />
        </Button>
      </div>
    </div>
  )
}

function PolicyTabs({ value, onValueChange }: { value: PolicyTab; onValueChange: (value: PolicyTab) => void }) {
  return (
    <div role="tablist" aria-label="Policy sections" className="grid w-full grid-cols-2 gap-1 rounded-xl border border-border bg-muted p-1 sm:grid-cols-4">
      {tabs.map((tab) => {
        const selected = value === tab.id
        return (
          <button key={tab.id} type="button" role="tab" id={`policy-tab-${tab.id}`} aria-selected={selected} aria-controls={`policy-panel-${tab.id}`} onClick={() => onValueChange(tab.id)} className={cn("inline-flex min-w-0 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", selected ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-card hover:text-foreground")}>
            {tab.label}
            {tab.count ? <span className={cn("inline-flex size-5 items-center justify-center rounded-full text-[11px] font-semibold", selected ? "bg-primary-foreground/15 text-primary-foreground" : "bg-primary/10 text-primary")}>{tab.count}</span> : null}
          </button>
        )
      })}
    </div>
  )
}

function PolicyInformation({ detail }: { detail: PolicyDetail }) {
  return <InfoCard title="Policy information" icon={<ShieldCheck aria-hidden />} editable>
    <InfoFieldList fields={[
      { label: "Policy number", value: displayValue(detail.policyNumber) },
      { label: "Draft code", value: detail.draftCode, mono: true },
      { label: "HID", value: detail.hid, mono: true },
      { label: "Building (Objekat)", value: detail.building },
      { label: "From", value: detail.startDate },
      { label: "To", value: detail.endDate },
      { label: "Insurance location", value: detail.insuranceLocation },
    ]} />
  </InfoCard>
}

function WorkflowDates({ detail }: { detail: PolicyDetail }) {
  const steps = [
    { label: "Drafted", value: detail.draftedAt, icon: Clock3 },
    { label: "Approved", value: displayValue(detail.approvedAt), icon: CheckCircle2 },
    { label: "Sent", value: detail.sentAt, icon: Send },
    { label: "Signed", value: displayValue(detail.signedAt), icon: CheckCircle2 },
  ]
  return <InfoCard title="Workflow dates" icon={<Clock3 aria-hidden />}>
    <ol className="space-y-3 px-1 py-0.5">
      {steps.map((step, index) => {
        const Icon = step.icon
        const complete = step.value !== "--"
        return <li key={step.label} className="relative flex gap-3">
          {index < steps.length - 1 ? <span className="absolute top-6 left-[9px] h-5 w-px bg-border" aria-hidden /> : null}
          <span className={cn("relative z-10 mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full", complete ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground")}><Icon className="size-3" aria-hidden /></span>
          <div className="flex min-w-0 flex-1 items-center justify-between gap-3 pb-2">
            <span className="text-sm text-muted-foreground">{step.label}</span>
            <span className={cn("text-sm font-semibold", complete ? "text-foreground" : "text-muted-foreground/65")}>{step.value}</span>
          </div>
        </li>
      })}
    </ol>
  </InfoCard>
}

function NotesAndClauses({ detail }: { detail: PolicyDetail }) {
  return <InfoCard title="Notes" icon={<StickyNote aria-hidden />} editable className="lg:col-span-2">
    <div className="space-y-4">
      <p className="rounded-lg bg-muted/65 px-3 py-2.5 text-sm text-foreground">{detail.notes}</p>
      <div className="flex flex-wrap items-center gap-2 border-t border-border pt-3">
        <span className="text-sm text-muted-foreground">Clauses</span>
        {detail.clauses.map((clause) => <Badge key={clause} variant="secondary" className="font-normal">{clause}</Badge>)}
      </div>
    </div>
  </InfoCard>
}

function SummarySidebar({ detail }: { detail: PolicyDetail }) {
  return <aside className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
    <InfoCard title="Summary">
      <InfoFieldList fields={[
        { label: "Policy number", value: displayValue(detail.policyNumber) },
        { label: "Draft code", value: detail.draftCode, mono: true },
        { label: "From", value: detail.startDate },
        { label: "To", value: detail.endDate },
        { label: "Insurance sum (total)", value: detail.insuranceSum },
        { label: "Premium (total)", value: detail.premium },
      ]} />
    </InfoCard>
    <InfoCard title="Client">
      <InfoFieldList fields={[
        { label: "Name", value: detail.client.name },
        { label: "Tax ID", value: detail.client.taxId, mono: true },
        { label: "Farm Reg. No.", value: detail.client.farmRegistration, mono: true },
        { label: "Phone", value: detail.client.phone },
        { label: "Email", value: displayValue(detail.client.email) },
      ]} />
    </InfoCard>
  </aside>
}

function DetailsPanel({ detail }: { detail: PolicyDetail }) {
  return <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
    <div className="grid gap-4 lg:grid-cols-2">
      <PolicyInformation detail={detail} />
      <WorkflowDates detail={detail} />
      <NotesAndClauses detail={detail} />
      <DocumentsPanel detail={detail} />
    </div>
    <SummarySidebar detail={detail} />
  </div>
}

function DocumentsPanel({ detail }: { detail: PolicyDetail }) {
  return <DocumentsDisplay title="Delivery" description="Files sent to the policy holder." fields={[{ id: "policy-pdf", label: "File", value: detail.delivery.fileName, complete: true, icon: FileText }, { id: "delivered-to", label: "Delivered to", value: detail.delivery.deliveredTo, complete: true, icon: Send }, { id: "delivered-at", label: "Delivered at", value: detail.delivery.deliveredAt, complete: true, icon: CheckCircle2 }]} />
}

function EmptyPanel({ title, description }: { title: string; description: string }) {
  return <div className="flex min-h-60 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card px-6 text-center">
    <span className="flex size-10 items-center justify-center rounded-xl bg-muted text-muted-foreground"><FileText className="size-4" aria-hidden /></span>
    <h2 className="mt-3 text-sm font-semibold text-foreground">{title}</h2>
    <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
  </div>
}

export function PolicyDetailView({ detail = policyDetail }: { detail?: PolicyDetail }) {
  const [tab, setTab] = useState<PolicyTab>("details")
  return <div className="flex h-svh min-h-[720px] w-full overflow-hidden bg-background text-foreground">
    <DashboardSidebar />
    <div className="flex min-w-0 flex-1 flex-col p-0 lg:p-2">
      <section className="flex min-h-0 flex-1 flex-col overflow-hidden bg-card lg:rounded-2xl lg:shadow-sm lg:ring-1 lg:ring-border">
        <TopBar code={detail.draftCode} />
        <main className="flex-1 overflow-y-auto bg-muted/35">
          <div className="mx-auto max-w-[1500px] space-y-6 p-4 sm:p-6">
            <PageHeader detail={detail} />
            <PolicyTabs value={tab} onValueChange={setTab} />
            <div role="tabpanel" id={`policy-panel-${tab}`} aria-labelledby={`policy-tab-${tab}`}>
              {tab === "details" ? <DetailsPanel detail={detail} /> : null}
              {tab === "documents" ? <DocumentsPanel detail={detail} /> : null}
              {tab === "items" ? <EmptyPanel title="Policy items" description="This policy contains one coverage item. Item details will appear here when available." /> : null}
              {tab === "activity" ? <EmptyPanel title="No recent activity" description="Policy actions and milestones will appear in this timeline." /> : null}
            </div>
          </div>
        </main>
      </section>
    </div>
  </div>
}
