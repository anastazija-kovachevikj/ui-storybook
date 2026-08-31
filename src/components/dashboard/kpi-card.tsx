import type { LucideIcon } from "lucide-react"
import { ShoppingBag } from "lucide-react"

import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export type KpiCardTone = "up" | "down"

export type KpiCardProps = {
  label?: string
  value?: string
  period?: string
  change?: string
  /** Controls positive/negative change badge styling */
  tone?: KpiCardTone
  icon?: LucideIcon
  className?: string
  /**
   * `standalone` — individual card with border/radius (default).
   * `grouped` — segment inside a KpiCardGroup (no own border).
   */
  variant?: "standalone" | "grouped"
}

/**
 * KPI metric card (Figma: dashboard/stat-card).
 * Sizing & colors use design tokens from `src/styles/design-tokens.css`
 * so light/dark and Storybook stay aligned with shadcn surfaces.
 */
export function KpiCard({
  label = "Orders",
  value = "5868",
  period = "Last 7 days",
  change = "+18%",
  tone = "up",
  icon: Icon = ShoppingBag,
  className,
  variant = "standalone",
}: KpiCardProps) {
  const isDown = tone === "down"
  const isGrouped = variant === "grouped"

  return (
    <div
      className={cn(
        "box-border inline-flex shrink-0 items-start justify-between font-sans",
        isGrouped
          ? "h-full min-w-0 w-full flex-1 bg-transparent p-[var(--kpi-padding)]"
          : [
              "bg-card text-card-foreground ring-1 ring-foreground/10",
              "h-[var(--kpi-height)] w-[var(--kpi-width)] max-w-[var(--kpi-width)]",
              "rounded-[var(--kpi-radius)] p-[var(--kpi-padding)]",
            ],
        className
      )}
    >
      <div
        className="inline-flex min-w-0 flex-col items-start overflow-hidden"
        style={{ gap: "var(--kpi-gap)" }}
      >
        <p className="m-0 text-[13px] font-normal leading-normal text-muted-foreground">
          {label}
        </p>
        <p className="m-0 text-2xl font-semibold leading-normal tracking-tight text-card-foreground">
          {value}
        </p>
        <div
          className="inline-flex items-center overflow-hidden"
          style={{ gap: "var(--kpi-gap)" }}
        >
          <span className="m-0 text-[11px] font-normal leading-normal text-muted-foreground">
            {period}
          </span>
          <span
            className={cn(
              "inline-flex items-start overflow-hidden rounded-md px-1.5 py-0.5 text-[11px] font-medium leading-normal whitespace-nowrap",
              isDown
                ? "bg-warning-muted text-warning"
                : "bg-success-muted text-success"
            )}
          >
            {change}
          </span>
        </div>
      </div>
      <div
        className="flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-muted-foreground"
        style={{
          width: "var(--kpi-icon-size)",
          height: "var(--kpi-icon-size)",
        }}
      >
        <Icon className="size-4" aria-hidden />
      </div>
    </div>
  )
}

export type KpiCardGroupProps = {
  /** KPI items to render as segments (order preserved) */
  items: Array<Omit<KpiCardProps, "variant" | "className">>
  className?: string
}

/**
 * One large KPI container with vertical separators between metrics.
 */
export function KpiCardGroup({ items, className }: KpiCardGroupProps) {
  return (
    <div
      role="group"
      className={cn(
        "flex h-[var(--kpi-height)] w-full max-w-[var(--kpi-group-max-width)] items-stretch overflow-hidden rounded-[var(--kpi-radius)] bg-card font-sans text-card-foreground ring-1 ring-foreground/10",
        className
      )}
    >
      {items.map((item, index) => (
        <div
          key={item.label ?? index}
          className="flex min-w-0 flex-1 items-stretch"
        >
          {index > 0 && (
            <Separator
              orientation="vertical"
              className="my-4 self-stretch bg-border"
            />
          )}
          <KpiCard {...item} variant="grouped" className="w-full" />
        </div>
      ))}
    </div>
  )
}
