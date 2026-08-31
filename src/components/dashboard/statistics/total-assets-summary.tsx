"use client"

import type { LucideIcon } from "lucide-react"
import { BriefcaseBusiness, CalendarDays, DollarSign, UserRound, UsersRound } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type AssetTileProps = {
  label: string
  value: string
  icon: LucideIcon
  className: string
  iconClassName: string
}

const assets: AssetTileProps[] = [
  {
    label: "Employees",
    value: "96",
    icon: UsersRound,
    className: "bg-success/10",
    iconClassName: "text-success",
  },
  {
    label: "Clients",
    value: "3,650",
    icon: UserRound,
    className: "bg-warning/10",
    iconClassName: "text-warning",
  },
  {
    label: "Projects",
    value: "356",
    icon: BriefcaseBusiness,
    className: "bg-destructive/10",
    iconClassName: "text-destructive",
  },
  {
    label: "Payroll",
    value: "$96k",
    icon: DollarSign,
    className: "bg-warning-muted",
    iconClassName: "text-warning",
  },
  {
    label: "Events",
    value: "96",
    icon: CalendarDays,
    className: "bg-primary/10",
    iconClassName: "text-primary",
  },
]

function AssetTile({ label, value, icon: Icon, className, iconClassName }: AssetTileProps) {
  return (
    <article className={cn("flex flex-col justify-between rounded-xl p-4", className)}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm leading-5 text-foreground">{label}</p>
        <Icon className={cn("size-4 shrink-0", iconClassName)} strokeWidth={1.8} aria-hidden />
      </div>
      <p className="text-lg font-semibold leading-7 tracking-tight text-foreground tabular-nums">{value}</p>
    </article>
  )
}

/** Total asset summary with employees, clients, projects, payroll, and events. */
export function TotalAssetsSummary({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "flex w-[calc(100vw-5rem)] max-w-[1600px] justify-center px-6 py-20",
        className
      )}
      aria-label="Total assets"
    >
      <Card className="h-[404px] w-full max-w-[448px] overflow-hidden rounded-xl border bg-card py-6 shadow-none">
        <CardContent className="h-full p-0">
          <div className="px-6">
            <h2 className="text-lg font-semibold leading-7 tracking-tight text-foreground">Total Assets</h2>
            <div className="mt-8 grid h-[296px] grid-cols-2 gap-4">
              <div className="grid grid-rows-2 gap-4">
                <AssetTile {...assets[0]} />
                <AssetTile {...assets[1]} />
              </div>
              <div className="grid grid-rows-3 gap-4">
                <AssetTile {...assets[2]} />
                <AssetTile {...assets[3]} />
                <AssetTile {...assets[4]} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

export default TotalAssetsSummary
