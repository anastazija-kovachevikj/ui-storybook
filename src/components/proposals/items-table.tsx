"use client"

import { Pencil, Plus, Trash2 } from "lucide-react"

import {
  displayValue,
  formatQty,
  formatRsd,
  type ProposalDetail,
} from "@/components/proposals/data"
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

export function ItemsTable({
  detail,
  className,
}: {
  detail: ProposalDetail
  className?: string
}) {
  const locked = Boolean(detail.lockedMessage)

  return (
    <Card
      className={cn(
        "rounded-2xl border-0 bg-card shadow-none ring-1 ring-border",
        className
      )}
    >
      <CardHeader className="border-b border-border/70 [.border-b]:pb-4">
        <div>
          <CardTitle className="text-base font-semibold">Line items</CardTitle>
          <CardDescription className="mt-0.5">
            Products and services on this proposal
          </CardDescription>
        </div>
        <CardAction>
          <Button
            size="sm"
            className="h-8 gap-1.5 rounded-lg"
            disabled={locked}
          >
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
                Qty
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground">
                Unit
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground">
                Unit price
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground">
                Line total
              </TableHead>
              <TableHead className="pr-5 text-right text-xs font-medium text-muted-foreground">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {detail.items.map((item) => (
              <TableRow key={item.id} className="border-border/70">
                <TableCell className="pl-5 font-medium whitespace-normal text-foreground">
                  {item.description}
                </TableCell>
                <TableCell className="tabular-nums text-muted-foreground">
                  {formatQty(item.qty)}
                </TableCell>
                <TableCell
                  className={cn(
                    !item.unit
                      ? "text-muted-foreground/60"
                      : "text-muted-foreground"
                  )}
                >
                  {displayValue(item.unit)}
                </TableCell>
                <TableCell className="tabular-nums text-muted-foreground">
                  {formatRsd(item.unitPrice)}
                </TableCell>
                <TableCell className="font-medium tabular-nums text-foreground">
                  {formatRsd(item.lineTotal)}
                </TableCell>
                <TableCell className="pr-5">
                  <div className="flex items-center justify-end gap-0.5">
                    <Tooltip>
                      <TooltipTrigger
                        className="inline-flex size-6 items-center justify-center rounded-[min(var(--radius-md),10px)] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
                        aria-label={`Edit ${item.description}`}
                        disabled={locked}
                      >
                        <Pencil className="size-3.5" />
                      </TooltipTrigger>
                      <TooltipContent>
                        {locked ? "Locked" : "Edit item"}
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger
                        className="inline-flex size-6 items-center justify-center rounded-[min(var(--radius-md),10px)] text-muted-foreground transition-colors hover:bg-muted hover:text-destructive disabled:pointer-events-none disabled:opacity-40"
                        aria-label={`Delete ${item.description}`}
                        disabled={locked}
                      >
                        <Trash2 className="size-3.5" />
                      </TooltipTrigger>
                      <TooltipContent>
                        {locked ? "Locked" : "Delete item"}
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {detail.items.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-muted-foreground"
                >
                  No line items yet. Add an item to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      <CardFooter className="justify-end border-t border-border bg-transparent">
        <dl className="w-full max-w-[280px] space-y-1.5 text-sm">
          <div className="flex items-center justify-between gap-6">
            <dt className="text-muted-foreground">Subtotal</dt>
            <dd className="tabular-nums text-foreground">
              {formatRsd(detail.subtotal)}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-6">
            <dt className="text-muted-foreground">
              Discount ({detail.discountPercent.toFixed(2)}%)
            </dt>
            <dd className="tabular-nums text-foreground">
              {formatRsd(detail.discount)}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-6">
            <dt className="text-muted-foreground">Adjustment</dt>
            <dd className="tabular-nums text-foreground">
              {formatRsd(detail.adjustment)}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-6 border-t border-border pt-1.5 font-semibold">
            <dt className="text-foreground">Total</dt>
            <dd className="tabular-nums text-foreground">
              {formatRsd(detail.total)}
            </dd>
          </div>
        </dl>
      </CardFooter>
    </Card>
  )
}
