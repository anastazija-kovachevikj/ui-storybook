import { ArrowRight, ArrowUpRight, CircleAlert, Clock3, Sparkles } from "lucide-react"

import { AttentionBanner } from "@/components/dashboard/attention-banner"
import type { AttentionItem, WorkItem } from "@/components/dashboard/data"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type DashboardOverviewProps = {
  attention: AttentionItem[]
  workItems: WorkItem[]
}

/**
 * The opening dashboard region: sets the daily priority before users enter
 * the detailed work, portfolio, and client sections below it.
 */
export function DashboardOverview({
  attention,
  workItems,
}: DashboardOverviewProps) {
  const overdueCount =
    attention.find((item) => item.id === "overdue")?.count ?? 0
  const nextItems = workItems
    .filter((item) => item.status === "overdue" || item.status === "waiting")
    .slice(0, 2)

  return (
    <section aria-labelledby="dashboard-overview-title" className="space-y-4">
      <div className="grid overflow-hidden rounded-2xl border border-primary/15 bg-card shadow-sm lg:grid-cols-[minmax(0,1.45fr)_minmax(310px,0.85fr)]">
        <div className="relative overflow-hidden bg-[linear-gradient(125deg,color-mix(in_oklab,var(--primary)_12%,var(--card)),var(--card)_62%)] px-5 py-6 sm:px-7 sm:py-7">
          <div className="pointer-events-none absolute -top-20 right-8 size-56 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 size-56 rounded-full bg-chart-2/10 blur-3xl" />
          <div className="relative max-w-xl">
            <div className="mb-3 flex items-center gap-2 text-xs font-medium text-primary">
              <span className="flex size-6 items-center justify-center rounded-lg bg-primary/10">
                <Sparkles className="size-3.5" aria-hidden />
              </span>
              Daily command center
            </div>
            <h2
              id="dashboard-overview-title"
              className="text-2xl font-semibold tracking-tight text-foreground sm:text-[1.75rem]"
            >
              Keep the claims book moving.
            </h2>
            <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
              Your clearest path today is to resolve the overdue work first,
              then balance new claims against the open assessment pipeline.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <a
                href="#work-queue"
                className={cn(buttonVariants({ size: "lg" }), "shadow-sm")}
              >
                Review priority queue
                <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-warning/15 bg-warning-muted/80 px-3 py-2 text-xs font-semibold text-warning">
                <CircleAlert className="size-3.5" aria-hidden />
                {overdueCount} overdue items
              </span>
            </div>
          </div>
        </div>

        <aside className="border-t border-border/70 bg-card px-5 py-5 sm:px-6 lg:border-t-0 lg:border-l">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-foreground">Next up</p>
              <p className="mt-0.5 text-xs text-muted-foreground">Priority work requiring a decision</p>
            </div>
            <span className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <Clock3 className="size-4" aria-hidden />
            </span>
          </div>
          <div className="mt-4 space-y-2.5">
            {nextItems.map((item, index) => (
              <a
                key={item.id}
                href="#work-queue"
                className="group flex items-center gap-3 rounded-xl border border-border/80 bg-background px-3 py-2.5 transition-colors hover:border-primary/30 hover:bg-primary/5"
              >
                <span className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-lg text-xs font-semibold",
                  index === 0 ? "bg-danger-soft text-destructive" : "bg-warning-muted text-warning"
                )}>
                  {index + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-foreground">{item.title}</span>
                  <span className="block truncate text-xs text-muted-foreground">{item.dueLabel}</span>
                </span>
                <ArrowRight className="size-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden />
              </a>
            ))}
          </div>
        </aside>
      </div>

      <AttentionBanner items={attention} />
    </section>
  )
}
