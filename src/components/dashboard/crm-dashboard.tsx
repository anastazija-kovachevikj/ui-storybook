"use client"

import { useMemo, useState, type ComponentType } from "react"
import Link from "next/link"
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  ChevronRight,
  FileText,
  HeartPulse,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  PawPrint,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  UsersRound,
  X,
} from "lucide-react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts"

import {
  periodOptions,
  periodSnapshots,
  type OpsKpi,
  type PeriodKey,
  type WorkItem,
} from "@/components/dashboard/data"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

type Icon = ComponentType<{ className?: string }>

const navigation: Array<{ label: string; icon: Icon; href: string }> = [
  { label: "Overview", icon: LayoutDashboard, href: "/" },
  { label: "Claims", icon: FileText, href: "/dashboard" },
  { label: "Assessments", icon: ShieldCheck, href: "/risk-assessments" },
  { label: "Proposals", icon: BookOpen, href: "/proposals" },
  { label: "Clients", icon: UsersRound, href: "/vet-clinics" },
]

const kpiIcons: Record<OpsKpi["id"], Icon> = {
  claims: FileText,
  risk: ShieldCheck,
  policies: BookOpen,
  animals: PawPrint,
}

const priorityStyles: Record<WorkItem["priority"], string> = {
  urgent: "bg-destructive/10 text-destructive",
  high: "bg-warning-muted text-warning",
  medium: "bg-primary/10 text-primary",
  low: "bg-muted text-muted-foreground",
}

const statusStyles: Record<WorkItem["status"], string> = {
  overdue: "text-destructive",
  waiting: "text-warning",
  "in-progress": "text-primary",
  open: "text-muted-foreground",
}

const claimsFlowConfig = {
  opened: { label: "Opened", color: "var(--primary)" },
  closed: { label: "Resolved", color: "var(--chart-2)" },
} satisfies ChartConfig

export function CrmDashboard({ className }: { className?: string }) {
  const [period, setPeriod] = useState<PeriodKey>("30d")
  const [myWorkOnly, setMyWorkOnly] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const snapshot = periodSnapshots[period]
  const periodLabel = periodOptions.find((option) => option.value === period)?.label ?? "Last 30 days"
  const workItems = useMemo(
    () => myWorkOnly ? snapshot.workItems.filter((item) => item.assignee === "me") : snapshot.workItems,
    [myWorkOnly, snapshot.workItems]
  )
  const opened = snapshot.claimsTrend.reduce((sum, item) => sum + item.opened, 0)
  const closed = snapshot.claimsTrend.reduce((sum, item) => sum + item.closed, 0)
  const overdue = snapshot.attention.find((item) => item.id === "overdue")?.count ?? 0

  return (
    <div className={cn("flex h-svh min-h-[640px] overflow-hidden bg-[#f4f7fb] font-sans text-foreground", className)}>
      <SideRail className="hidden md:flex" />
      {mobileNavOpen && <div className="fixed inset-0 z-50 md:hidden"><button aria-label="Close navigation" className="absolute inset-0 bg-foreground/40" onClick={() => setMobileNavOpen(false)} /><SideRail className="relative z-10 flex h-full w-[256px] shadow-2xl" expanded onNavigate={() => setMobileNavOpen(false)} /></div>}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex h-[76px] shrink-0 items-center gap-3 border-b border-border/80 bg-background/90 px-4 backdrop-blur sm:px-7">
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open navigation" onClick={() => setMobileNavOpen(true)}><Menu className="size-4" /></Button>
          <div className="min-w-0"><div className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground"><span>Operations</span><ChevronRight className="size-3" /><span className="text-foreground">Portfolio</span></div><h1 className="mt-0.5 text-xl font-semibold tracking-tight">Portfolio overview</h1></div>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden w-56 lg:block"><Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" /><Input className="h-9 rounded-xl border-0 bg-muted/70 pl-9 shadow-none" placeholder="Search your book" aria-label="Search your book" /></div>
            <DropdownMenu><DropdownMenuTrigger className="inline-flex h-9 items-center gap-2 rounded-xl border border-border bg-background px-3 text-xs font-medium shadow-sm hover:bg-muted"><CalendarDays className="size-3.5 text-muted-foreground" /><span className="hidden sm:inline">{periodLabel}</span></DropdownMenuTrigger><DropdownMenuContent align="end" className="w-44">{periodOptions.map((option) => <DropdownMenuItem key={option.value} onClick={() => setPeriod(option.value)}><span className="flex-1">{option.label}</span>{period === option.value && <Check className="size-3.5 text-primary" />}</DropdownMenuItem>)}</DropdownMenuContent></DropdownMenu>
            <Button variant={myWorkOnly ? "default" : "outline"} size="sm" className="hidden h-9 rounded-xl px-3 sm:inline-flex" aria-pressed={myWorkOnly} onClick={() => setMyWorkOnly((value) => !value)}>My work</Button>
            <Button variant="ghost" size="icon" className="relative rounded-xl" aria-label="Notifications, 3 unread"><Bell className="size-4" /><span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-destructive ring-2 ring-background" /></Button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto"><div className="mx-auto max-w-[1600px] space-y-5 px-4 py-5 sm:px-7 sm:py-7">
          <section className="grid gap-5 xl:grid-cols-12">
            <div className="relative overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#2450d3,#5587f5)] px-6 py-6 text-primary-foreground shadow-[0_18px_45px_-26px_rgba(37,80,211,0.95)] sm:px-7 xl:col-span-8"><div className="pointer-events-none absolute -top-24 right-8 size-72 rounded-full border-[32px] border-white/10" /><div className="pointer-events-none absolute -bottom-36 right-44 size-72 rounded-full bg-white/10 blur-3xl" /><div className="relative flex h-full flex-col justify-between gap-8"><div className="flex items-start justify-between gap-6"><div className="max-w-xl"><div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/13 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-white/15"><Sparkles className="size-3" />Today&apos;s portfolio pulse</div><h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">A clearer path through today&apos;s workload.</h2><p className="mt-3 max-w-lg text-sm leading-6 text-white/75">{overdue} tasks need immediate attention. Close those first to keep claims and assessments on track.</p></div><div className="hidden size-12 shrink-0 items-center justify-center rounded-2xl bg-white/12 ring-1 ring-white/20 sm:flex"><HeartPulse className="size-6" /></div></div><div className="grid max-w-[560px] grid-cols-3 gap-3"><HeroMetric label="Opened" value={opened.toLocaleString()} /><HeroMetric label="Resolved" value={closed.toLocaleString()} /><HeroMetric label="In review" value={snapshot.kpis[1]?.value ?? "—"} /></div></div></div>
            <section className="rounded-3xl border border-border/80 bg-card p-5 shadow-sm xl:col-span-4" aria-labelledby="focus-title"><div className="flex items-start justify-between"><div><p className="text-xs font-medium uppercase tracking-[0.14em] text-primary">Action list</p><h2 id="focus-title" className="mt-1 text-lg font-semibold tracking-tight">Where to focus</h2></div><Button variant="ghost" size="icon-sm" className="rounded-lg" aria-label="More actions"><MoreHorizontal className="size-4" /></Button></div><div className="mt-5 space-y-4"><FocusRow value={overdue} label="overdue tasks" tone="danger" /><FocusRow value={snapshot.attention.find((item) => item.id === "pending")?.count ?? 0} label="claims pending action" tone="warning" /><FocusRow value={snapshot.attention.find((item) => item.id === "unassigned")?.count ?? 0} label="clients need an owner" tone="primary" /></div><a href="#priority-work" className="mt-5 flex items-center justify-between rounded-xl bg-muted/65 px-3 py-2.5 text-xs font-medium text-foreground transition-colors hover:bg-muted">Open priority queue <ArrowUpRight className="size-3.5 text-primary" /></a></section>
          </section>
          <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Portfolio metrics">{snapshot.kpis.map((kpi) => <MetricCard key={kpi.id} metric={kpi} periodLabel={periodLabel} />)}</section>
          <section className="grid items-start gap-5 xl:grid-cols-12">
            <Card id="priority-work" className="overflow-hidden rounded-3xl py-0 shadow-sm xl:col-span-8" aria-labelledby="priority-work-title"><CardHeader className="border-b px-5 py-4 sm:px-6"><div><p className="text-xs font-medium uppercase tracking-[0.14em] text-primary">Workstream</p><CardTitle id="priority-work-title" className="mt-0.5 text-lg font-semibold tracking-tight">Priority work</CardTitle></div><CardAction><Button variant="outline" size="sm" className="rounded-lg">View all <ArrowUpRight className="size-3.5" /></Button></CardAction></CardHeader><CardContent className="px-0"><Table className="min-w-[650px] text-left text-sm"><TableHeader className="bg-muted/45 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground"><TableRow><TableHead className="px-6 py-3 font-medium">Work item</TableHead><TableHead className="px-4 py-3 font-medium">Owner</TableHead><TableHead className="px-4 py-3 font-medium">Due</TableHead><TableHead className="px-6 py-3 text-right font-medium">Priority</TableHead></TableRow></TableHeader><TableBody>{workItems.map((item) => <WorkRow key={item.id} item={item} />)}</TableBody></Table></CardContent></Card>
            <section className="rounded-3xl border border-border/80 bg-card p-5 shadow-sm xl:col-span-4" aria-labelledby="book-health-title"><div className="flex items-center justify-between"><div><p className="text-xs font-medium uppercase tracking-[0.14em] text-primary">Coverage</p><h2 id="book-health-title" className="mt-0.5 text-lg font-semibold tracking-tight">Book health</h2></div><span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary"><Activity className="size-4" /></span></div><p className="mt-2 text-sm leading-5 text-muted-foreground">Work linked to the active portfolio.</p><div className="mt-5 space-y-5">{snapshot.portfolio.map((metric) => <div key={metric.id}><div className="mb-2 flex items-end justify-between gap-3"><div><p className="text-sm font-medium">{metric.label}</p><p className="mt-0.5 text-xs text-muted-foreground">{metric.hint}</p></div><p className="text-sm font-semibold tabular-nums text-foreground">{metric.value}</p></div><Progress value={metric.progress} className="gap-0 [&_[data-slot=progress-indicator]]:bg-primary" aria-label={`${metric.label}: ${metric.progress}%`} /></div>)}</div></section>
          </section>
          <section className="grid items-start gap-5 xl:grid-cols-12"><TrendPanel data={snapshot.claimsTrend} opened={opened} closed={closed} className="xl:col-span-7" /><TeamLoad clients={snapshot.clients} className="xl:col-span-5" /></section>
        </div></main>
      </div>
    </div>
  )
}

function SideRail({ className, expanded = false, onNavigate }: { className?: string; expanded?: boolean; onNavigate?: () => void }) { return <aside className={cn("z-20 flex w-[76px] shrink-0 flex-col border-r border-white/10 bg-[#101a31] py-4 text-[#aebbd4]", expanded && "w-[256px]", className)}><div className={cn("flex h-12 items-center px-4", expanded ? "justify-between" : "justify-center")}><Link href="/" className="flex items-center gap-3" onClick={onNavigate}><span className="flex size-9 items-center justify-center rounded-xl bg-[linear-gradient(145deg,#4f8df8,#35c6df)] text-sm font-bold text-[#102247] shadow-lg shadow-blue-950/30">CU</span>{expanded && <span className="text-sm font-semibold tracking-tight text-white">ClaimUW</span>}</Link>{expanded && <Button variant="ghost" size="icon-sm" className="text-[#aebbd4] hover:bg-white/10 hover:text-white" aria-label="Close navigation" onClick={onNavigate}><X className="size-4" /></Button>}</div><nav className="mt-8 flex flex-1 flex-col gap-2 px-3">{navigation.map((item, index) => { const Icon = item.icon; const active = index === 0; return <Link key={item.label} href={item.href} title={expanded ? undefined : item.label} onClick={onNavigate} className={cn("group flex h-11 items-center rounded-xl text-sm font-medium transition-colors", expanded ? "gap-3 px-3" : "justify-center", active ? "bg-white/12 text-white shadow-sm" : "hover:bg-white/7 hover:text-white")}><Icon className="size-[18px] shrink-0" />{expanded && <span>{item.label}</span>}</Link>})}</nav><div className="space-y-2 border-t border-white/10 px-3 pt-4"><button className={cn("flex h-10 w-full items-center rounded-xl hover:bg-white/7 hover:text-white", expanded ? "gap-3 px-3" : "justify-center")} aria-label="Settings"><Settings className="size-[18px]" />{expanded && <span className="text-sm font-medium">Settings</span>}</button><div className={cn("flex items-center", expanded ? "gap-3 px-2" : "justify-center")}><Avatar size="sm" className="size-8 border border-white/15"><AvatarFallback className="bg-[#22325b] text-[10px] font-semibold text-white">SA</AvatarFallback></Avatar>{expanded && <div className="min-w-0"><p className="truncate text-xs font-medium text-white">System Administrator</p><p className="truncate text-[10px] text-[#8190ad]">ClaimUW team</p></div>}</div></div></aside> }

function HeroMetric({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl bg-white/12 px-3.5 py-3 ring-1 ring-white/12"><p className="text-[11px] font-medium text-white/65">{label}</p><p className="mt-1 text-xl font-semibold tracking-tight tabular-nums">{value}</p></div> }
function FocusRow({ value, label, tone }: { value: number; label: string; tone: "danger" | "warning" | "primary" }) { const tones = { danger: "bg-destructive/10 text-destructive", warning: "bg-warning-muted text-warning", primary: "bg-primary/10 text-primary" }; return <div className="flex items-center gap-3"><span className={cn("flex size-9 shrink-0 items-center justify-center rounded-xl text-sm font-semibold tabular-nums", tones[tone])}>{value}</span><span className="flex-1 text-sm font-medium text-foreground">{label}</span><ChevronRight className="size-4 text-muted-foreground" /></div> }
function MetricCard({ metric, periodLabel }: { metric: OpsKpi; periodLabel: string }) {
  const Icon = kpiIcons[metric.id]
  const isNegative = metric.tone === "down"
  return <Card className="rounded-2xl py-0 shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md"><CardContent className="p-4"><div className="flex items-start justify-between"><p className="text-sm font-medium text-muted-foreground">{metric.label}</p><span className="flex size-8 items-center justify-center rounded-xl bg-muted text-muted-foreground"><Icon className="size-4" /></span></div><div className="mt-4 flex items-end justify-between gap-2"><p className="text-2xl font-semibold tracking-tight tabular-nums">{metric.value}</p><span className={cn("inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-[11px] font-semibold", isNegative ? "bg-warning-muted text-warning" : "bg-success-muted text-success")}>{isNegative ? <ArrowDownRight className="size-3" /> : <ArrowUpRight className="size-3" />}{metric.change}</span></div><p className="mt-2 text-xs text-muted-foreground">{metric.caption} · {periodLabel}</p></CardContent></Card>
}
function WorkRow({ item }: { item: WorkItem }) { return <TableRow><TableCell className="px-6 py-3.5"><p className="font-medium text-foreground">{item.title}</p><p className="mt-0.5 text-xs text-muted-foreground">{item.relatedLabel}</p></TableCell><TableCell className="px-4 py-3.5"><span className="text-xs font-medium text-muted-foreground">{item.assigneeLabel}</span></TableCell><TableCell className="px-4 py-3.5"><p className={cn("text-sm font-medium", statusStyles[item.status])}>{item.dueLabel}</p></TableCell><TableCell className="px-6 py-3.5 text-right"><Badge className={cn("border-0 capitalize", priorityStyles[item.priority])}>{item.priority}</Badge></TableCell></TableRow> }
function TrendPanel({ data, opened, closed, className }: { data: Array<{ label: string; opened: number; closed: number }>; opened: number; closed: number; className?: string }) { const delta = opened - closed; return <Card className={cn("rounded-3xl py-0 shadow-sm", className)} aria-labelledby="claims-trend-title"><CardHeader className="px-5 pt-5"><div><p className="text-xs font-medium uppercase tracking-[0.14em] text-primary">Throughput</p><CardTitle id="claims-trend-title" className="mt-0.5 text-lg font-semibold tracking-tight">Claims flow</CardTitle><p className="mt-1 text-sm text-muted-foreground">Opened and resolved claims across this period.</p></div><CardAction><div className="rounded-xl bg-muted/65 px-3 py-2 text-right"><p className="text-[11px] text-muted-foreground">Net change</p><p className={cn("text-sm font-semibold tabular-nums", delta > 0 ? "text-warning" : "text-success")}>{delta > 0 ? `+${delta}` : delta}</p></div></CardAction></CardHeader><CardContent className="px-5 pb-5"><div className="flex gap-6"><ChartNumber label="Opened" value={opened} color="bg-primary" /><ChartNumber label="Resolved" value={closed} color="bg-chart-2" /></div><ChartContainer config={claimsFlowConfig} className="mt-4 h-[220px] w-full aspect-auto"><AreaChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}><defs><linearGradient id="flowOpen" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-opened)" stopOpacity={0.35} /><stop offset="100%" stopColor="var(--color-opened)" stopOpacity={0.02} /></linearGradient></defs><CartesianGrid vertical={false} strokeDasharray="3 6" /><XAxis dataKey="label" axisLine={false} tickLine={false} dy={8} /><YAxis axisLine={false} tickLine={false} /><ChartTooltip content={<ChartTooltipContent />} /><Area type="monotone" dataKey="closed" stroke="var(--color-closed)" strokeWidth={2} fill="none" name="Resolved" /><Area type="monotone" dataKey="opened" stroke="var(--color-opened)" strokeWidth={2.5} fill="url(#flowOpen)" name="Opened" /></AreaChart></ChartContainer></CardContent></Card> }
function ChartNumber({ label, value, color }: { label: string; value: number; color: string }) { return <div className="flex items-center gap-2"><span className={cn("size-2 rounded-full", color)} /><span className="text-xs text-muted-foreground">{label}</span><span className="text-sm font-semibold tabular-nums">{value}</span></div> }
function TeamLoad({ clients, className }: { clients: Array<{ id: string; initials: string; name: string; type: string; assignmentLabel: string; assignment: string }>; className?: string }) { return <section className={cn("rounded-3xl border border-border/80 bg-card p-5 shadow-sm", className)} aria-labelledby="team-load-title"><div className="flex items-start justify-between"><div><p className="text-xs font-medium uppercase tracking-[0.14em] text-primary">Client coverage</p><h2 id="team-load-title" className="mt-0.5 text-lg font-semibold tracking-tight">Recent client activity</h2></div><span className="flex size-9 items-center justify-center rounded-xl bg-muted text-muted-foreground"><UsersRound className="size-4" /></span></div><div className="mt-5 divide-y divide-border/70">{clients.map((client) => <div key={client.id} className="flex items-center gap-3 py-3 first:pt-0"><Avatar size="sm" className="size-9"><AvatarFallback className="bg-primary/10 text-[11px] font-semibold text-primary">{client.initials}</AvatarFallback></Avatar><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{client.name}</p><p className="truncate text-xs text-muted-foreground">{client.type}</p></div><span className={cn("rounded-full px-2 py-1 text-[10px] font-semibold", client.assignment === "unassigned" ? "bg-warning-muted text-warning" : "bg-muted text-muted-foreground")}>{client.assignmentLabel}</span></div>)}</div><Button variant="ghost" className="mt-2 w-full justify-between rounded-xl text-primary">View all clients <ChevronRight className="size-4" /></Button></section> }

export default CrmDashboard
