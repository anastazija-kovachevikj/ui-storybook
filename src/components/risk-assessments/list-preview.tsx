"use client"

import { ArrowRight, Plus } from "lucide-react"

import {
  formatRate,
  formatRsd,
  type RiskAssessmentDetail,
  type RiskAssessmentItem,
} from "@/components/risk-assessments/data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

function statusBadgeClass(status: RiskAssessmentItem["status"]) {
  switch (status) {
    case "Active":
      return "border-success/30 bg-success-muted text-success"
    case "Inactive":
      return "border-border bg-muted text-muted-foreground"
    default:
      return "border-border bg-secondary text-secondary-foreground"
  }
}

/**
 * Compact line-item snapshot on the Overview tab.
 * Avoids wireframe "List preview" language; deep-links into the full table.
 */
export function ListPreview({
  detail,
  onOpenItems,
  className,
}: {
  detail: RiskAssessmentDetail
  onOpenItems?: () => void
  className?: string
}) {
  const totalWithoutTax = detail.items.reduce(
    (sum, item) => sum + item.premium,
    0
  )
  const previewItems = detail.items.slice(0, 5)
  const remaining = detail.items.length - previewItems.length

  return (
    <Card
      className={cn(
        "rounded-xl border-0 bg-card shadow-none ring-1 ring-border",
        className
      )}
    >
      <CardHeader className="flex flex-row items-start justify-between gap-3 border-b border-border/70 [.border-b]:pb-3.5">
        <div className="min-w-0">
          <CardTitle className="text-sm font-semibold">Line items</CardTitle>
          <CardDescription className="mt-0.5">
            {detail.items.length === 0
              ? "Nothing assessed yet"
              : `${detail.items.length} item${detail.items.length === 1 ? "" : "s"} · net premium ${formatRsd(totalWithoutTax)}`}
          </CardDescription>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1.5 rounded-lg">
            <Plus className="size-3.5" />
            Add
          </Button>
          {onOpenItems && detail.items.length > 0 && (
            <Button
              size="sm"
              variant="ghost"
              className="h-8 gap-1 rounded-lg text-primary"
              onClick={onOpenItems}
            >
              Open table
              <ArrowRight className="size-3.5" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0 px-0 pb-0">
        {detail.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 px-4 py-10 text-center">
            <p className="text-sm text-muted-foreground">
              Add livestock or crop lines to calculate premium and subsidy.
            </p>
            {onOpenItems && (
              <Button size="sm" className="mt-1 h-8 gap-1.5" onClick={onOpenItems}>
                <Plus className="size-3.5" />
                Go to line items
              </Button>
            )}
          </div>
        ) : (
          <>
            <ul className="divide-y divide-border/70">
              {previewItems.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {item.description}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {item.species}
                      <span className="mx-1.5 text-border">·</span>
                      {item.category}
                      <span className="mx-1.5 text-border">·</span>
                      Qty {item.qty}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <div className="text-left text-sm sm:text-right">
                      <p className="font-medium tabular-nums text-foreground">
                        {formatRsd(item.premium)}
                      </p>
                      <p className="text-[11px] tabular-nums text-muted-foreground">
                        {formatRate(item.rate)} · {formatRsd(item.assessedValue)}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn("font-medium", statusBadgeClass(item.status))}
                    >
                      {item.status}
                    </Badge>
                  </div>
                </li>
              ))}
            </ul>
            {remaining > 0 && onOpenItems && (
              <button
                type="button"
                onClick={onOpenItems}
                className="w-full border-t border-border px-4 py-2.5 text-center text-sm font-medium text-primary hover:bg-muted/40"
              >
                View {remaining} more in table
              </button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
