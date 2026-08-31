import { AlertTriangle, ArrowRight, UserRoundPlus } from "lucide-react"

import type { AttentionItem } from "@/components/dashboard/data"
import { cn } from "@/lib/utils"

export function AttentionBanner({
  items,
  className,
}: {
  items: AttentionItem[]
  className?: string
}) {
  if (items.length === 0) return null

  return (
    <div
      role="status"
      className={cn(
        "flex flex-col gap-3 rounded-xl border border-border/80 bg-card px-4 py-3 text-sm shadow-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-2",
        className
      )}
    >
        <span className="inline-flex items-center gap-2 font-semibold text-foreground">
        <span className="flex size-7 items-center justify-center rounded-lg bg-danger-soft text-destructive">
          <AlertTriangle className="size-3.5" aria-hidden />
        </span>
        Needs attention
      </span>
      <div className="flex flex-1 flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item.id}
            className="inline-flex items-center gap-1.5 rounded-lg bg-muted/70 px-2.5 py-1.5 text-xs"
          >
          <span
            className={cn(
              "font-semibold tabular-nums",
              item.tone === "negative" && "text-destructive",
              item.tone === "warning" && "text-warning",
              item.tone === "primary" && "text-primary"
            )}
          >
            {item.count}
          </span>
          <span className="text-muted-foreground">{item.label}</span>
          </span>
        ))}
      </div>
      <a
        href="#clients"
        className="inline-flex items-center gap-1 self-start text-xs font-medium text-primary hover:text-primary/80 sm:self-auto"
      >
        <UserRoundPlus className="size-3.5" aria-hidden />
        Assign work
        <ArrowRight className="size-3.5" aria-hidden />
      </a>
    </div>
  )
}
