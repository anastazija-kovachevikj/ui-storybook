import type { LucideIcon } from "lucide-react"
import {
  FileStack,
  FileText,
  PawPrint,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  Minus,
} from "lucide-react"
import Link from "next/link"

import type { ChangeTone, KpiId, OpsKpi } from "@/components/dashboard/data"
import { cn } from "@/lib/utils"

const icons: Record<KpiId, LucideIcon> = {
  claims: FileText,
  risk: ShieldCheck,
  policies: FileStack,
  animals: PawPrint,
}

function Sparkline({
  values,
  tone,
}: {
  values: number[]
  tone: ChangeTone
}) {
  const width = 80
  const height = 28
  const min = Math.min(...values)
  const max = Math.max(...values)
  const span = max - min || 1
  const points = values
    .map((value, index) => {
      const x = (index / Math.max(values.length - 1, 1)) * width
      const y = height - ((value - min) / span) * (height - 4) - 2
      return `${x},${y}`
    })
    .join(" ")

  const stroke =
    tone === "down"
      ? "var(--destructive)"
      : tone === "up"
        ? "var(--success)"
        : "var(--primary)"

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden
      className="shrink-0 overflow-clip"
    >
      <polyline
        fill="none"
        stroke={stroke}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  )
}

function Delta({ change, tone }: { change: string; tone: ChangeTone }) {
  const Icon =
    tone === "down" ? TrendingDown : tone === "up" ? TrendingUp : Minus

  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[11px] font-medium",
        tone === "down" && "bg-danger-soft text-destructive",
        tone === "up" && "bg-success-muted text-success",
        tone === "neutral" && "bg-muted text-muted-foreground"
      )}
    >
      <Icon className="size-3" aria-hidden />
      {change}
      <span className="font-normal text-current/80">vs prior</span>
    </span>
  )
}

export function OpsKpiCard({
  kpi,
  className,
}: {
  kpi: OpsKpi
  className?: string
}) {
  const Icon = icons[kpi.id]
  const interactive = Boolean(kpi.href)

  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/10">
          <Icon className="size-4" aria-hidden />
        </div>
        <Sparkline values={kpi.sparkline} tone={kpi.tone} />
      </div>

      <div className="mt-3 min-w-0">
        <p className="text-[13px] text-muted-foreground">{kpi.label}</p>
        <div className="mt-0.5 flex flex-wrap items-end gap-2">
          <p className="text-[28px] leading-9 font-semibold tracking-tight text-card-foreground">
            {kpi.value}
          </p>
          <Delta change={kpi.change} tone={kpi.tone} />
        </div>
        <p className="mt-1 text-xs text-muted-foreground">{kpi.caption}</p>
      </div>
    </>
  )

  const surface = cn(
    "group block min-h-[166px] rounded-2xl border border-border/80 bg-card p-5 font-sans shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
    interactive &&
      "transition-shadow hover:ring-foreground/20 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
    className
  )

  if (kpi.href) {
    return (
      <Link href={kpi.href} className={surface}>
        {content}
      </Link>
    )
  }

  return <div className={surface}>{content}</div>
}
