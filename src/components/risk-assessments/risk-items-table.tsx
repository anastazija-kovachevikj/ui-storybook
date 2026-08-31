"use client"

import { Pencil, Plus, Trash2 } from "lucide-react"

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
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
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

export function RiskItemsTable({
  detail,
  className,
}: {
  detail: RiskAssessmentDetail
  className?: string
}) {
  const totalWithoutTax = detail.items.reduce((sum, item) => sum + item.premium, 0)
  const taxOnPremium = totalWithoutTax * detail.taxRate
  const total = totalWithoutTax + taxOnPremium

  return (
    <Card
      className={cn(
        "rounded-2xl border-0 bg-card shadow-none ring-1 ring-border",
        className
      )}
    >
      <CardHeader className="border-b border-border/70 [.border-b]:pb-4">
        <div>
          <CardTitle className="text-base font-semibold">
            Line items
          </CardTitle>
          <CardDescription className="mt-0.5">
            Premium and assessed value by risk line
          </CardDescription>
        </div>
        <CardAction>
          <Button size="sm" className="h-8 gap-1.5 rounded-lg">
            <Plus className="size-3.5" />
            Add Item
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="px-0 pb-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-5 text-xs font-medium text-muted-foreground">
                Description
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground">
                Species
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground">
                Category
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground">
                Qty
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground">
                Unit Value
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground">
                Rate
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground">
                Premium
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground">
                Assessed Value
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground">
                Status
              </TableHead>
              <TableHead className="pr-5 text-right text-xs font-medium text-muted-foreground">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {detail.items.map((item) => (
              <TableRow key={item.id} className="border-border/70">
                <TableCell className="pl-5 font-medium text-foreground">
                  {item.description}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {item.species}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {item.category}
                </TableCell>
                <TableCell className="tabular-nums text-muted-foreground">
                  {item.qty}
                </TableCell>
                <TableCell className="tabular-nums text-muted-foreground">
                  {formatRsd(item.unitValue)}
                </TableCell>
                <TableCell className="tabular-nums text-muted-foreground">
                  {formatRate(item.rate)}
                </TableCell>
                <TableCell className="tabular-nums text-muted-foreground">
                  {formatRsd(item.premium)}
                </TableCell>
                <TableCell className="tabular-nums text-muted-foreground">
                  {formatRsd(item.assessedValue)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn("font-medium", statusBadgeClass(item.status))}
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="pr-5">
                  <div className="flex items-center justify-end gap-0.5">
                    <Tooltip>
                      <TooltipTrigger
                        className="inline-flex size-6 items-center justify-center rounded-[min(var(--radius-md),10px)] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        aria-label={`Edit ${item.description}`}
                      >
                        <Pencil className="size-3.5" />
                      </TooltipTrigger>
                      <TooltipContent>Edit item</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger
                        className="inline-flex size-6 items-center justify-center rounded-[min(var(--radius-md),10px)] text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
                        aria-label={`Delete ${item.description}`}
                      >
                        <Trash2 className="size-3.5" />
                      </TooltipTrigger>
                      <TooltipContent>Delete item</TooltipContent>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {detail.items.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={10}
                  className="h-24 text-center text-muted-foreground"
                >
                  No risk assessment items yet. Add an item to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      <CardFooter className="justify-end border-t border-border bg-transparent">
        <dl className="w-full max-w-[260px] space-y-1.5 text-sm">
          <div className="flex items-center justify-between gap-6">
            <dt className="text-muted-foreground">Total without tax</dt>
            <dd className="tabular-nums text-foreground">
              {formatRsd(totalWithoutTax)}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-6">
            <dt className="text-muted-foreground">Tax on premium</dt>
            <dd className="tabular-nums text-foreground">
              {formatRsd(taxOnPremium)}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-6 border-t border-border pt-2">
            <dt className="font-semibold text-foreground">Total</dt>
            <dd className="tabular-nums font-semibold text-primary">
              {formatRsd(total)}
            </dd>
          </div>
        </dl>
      </CardFooter>
    </Card>
  )
}
