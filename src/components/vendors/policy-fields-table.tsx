"use client"

import { ChevronLeft, ChevronRight, Pencil, Trash2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import type { PolicyField } from "@/components/vendors/data"
import { cn } from "@/lib/utils"

const stickyActionClass =
  "sticky right-0 z-20 border-l border-border/80 bg-background shadow-[-8px_0_12px_-10px_rgba(15,23,42,0.35)] group-hover/row:bg-muted"

type PolicyFieldsTableProps = {
  fields: PolicyField[]
  page: number
  pageSize?: number
  totalCount: number
  onPageChange: (page: number) => void
  onEdit?: (field: PolicyField) => void
  onDelete?: (field: PolicyField) => void
}

function YesNoBadge({ value }: { value: boolean }) {
  if (!value) {
    return <span className="block text-center text-muted-foreground/50">—</span>
  }
  return (
    <Badge variant="secondary" className="mx-auto font-medium">
      Yes
    </Badge>
  )
}

function FormBadge({ value }: { value: PolicyField["inPolicyForm"] }) {
  if (!value) {
    return <span className="block text-center text-muted-foreground/50">—</span>
  }
  return (
    <Badge
      variant="outline"
      className="mx-auto max-w-full truncate font-normal text-muted-foreground"
    >
      {value}
    </Badge>
  )
}

export function PolicyFieldsTable({
  fields,
  page,
  pageSize = 10,
  totalCount,
  onPageChange,
  onEdit,
  onDelete,
}: PolicyFieldsTableProps) {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize))
  const start = totalCount === 0 ? 0 : (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, totalCount)

  return (
    <div
      className="overflow-hidden rounded-xl ring-1 ring-border"
      data-testid="policy-fields-table"
    >
      <Table className="min-w-[1100px]">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="h-9 bg-muted px-3 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
              Key
            </TableHead>
            <TableHead className="h-9 bg-muted px-3 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
              Label
            </TableHead>
            <TableHead className="h-9 bg-muted px-3 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
              Type
            </TableHead>
            <TableHead className="h-9 bg-muted px-3 text-center text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
              Required
            </TableHead>
            <TableHead className="h-9 bg-muted px-3 text-center text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
              Attribute
            </TableHead>
            <TableHead className="h-9 bg-muted px-3 text-center text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
              In policy form
            </TableHead>
            <TableHead className="h-9 bg-muted px-3 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
              Default
            </TableHead>
            <TableHead className="h-9 bg-muted px-3 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
              Outbound path
            </TableHead>
            <TableHead className="h-9 bg-muted px-3 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
              Inbound path
            </TableHead>
            <TableHead
              className={cn(
                stickyActionClass,
                "h-9 bg-muted px-2.5 text-right text-[11px] font-semibold tracking-wide text-muted-foreground uppercase group-hover/row:bg-muted"
              )}
            >
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((field) => (
            <TableRow key={field.id} className="group/row border-border/70">
              <TableCell className="px-3 py-2.5 font-mono text-sm text-foreground">
                {field.key}
              </TableCell>
              <TableCell className="px-3 py-2.5 text-muted-foreground">
                {field.label}
              </TableCell>
              <TableCell className="px-3 py-2.5">
                <Badge variant="secondary" className="font-medium">
                  {field.type}
                </Badge>
              </TableCell>
              <TableCell className="px-3 py-2.5">
                <YesNoBadge value={field.required} />
              </TableCell>
              <TableCell className="px-3 py-2.5">
                <YesNoBadge value={field.attribute} />
              </TableCell>
              <TableCell className="px-3 py-2.5">
                <FormBadge value={field.inPolicyForm} />
              </TableCell>
              <TableCell className="px-3 py-2.5 text-muted-foreground">
                {field.defaultValue ?? (
                  <span className="text-muted-foreground/50">—</span>
                )}
              </TableCell>
              <TableCell className="px-3 py-2.5 font-mono text-xs text-muted-foreground">
                {field.outboundPath}
              </TableCell>
              <TableCell className="px-3 py-2.5 font-mono text-xs text-muted-foreground">
                {field.inboundPath}
              </TableCell>
              <TableCell
                className={cn(stickyActionClass, "px-2.5 py-2.5")}
                data-testid={`policy-field-actions-${field.id}`}
              >
                <div className="flex items-center justify-end gap-1">
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <Button
                          type="button"
                          variant="outline"
                          size="icon-sm"
                          aria-label={`Edit ${field.key}`}
                          onClick={() => onEdit?.(field)}
                        />
                      }
                    >
                      <Pencil className="size-3.5" aria-hidden />
                    </TooltipTrigger>
                    <TooltipContent>Edit field</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <Button
                          type="button"
                          variant="outline"
                          size="icon-sm"
                          aria-label={`Delete ${field.key}`}
                          onClick={() => onDelete?.(field)}
                        />
                      }
                    >
                      <Trash2 className="size-3.5" aria-hidden />
                    </TooltipTrigger>
                    <TooltipContent>Delete field</TooltipContent>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex flex-wrap items-center justify-between gap-2.5 border-t bg-card px-3 py-2.5">
        <p className="text-xs text-muted-foreground">
          Showing {start}–{end} of {totalCount}
        </p>
        <div className="flex items-center gap-1.5">
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            aria-label="Previous page"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            <ChevronLeft className="size-4" aria-hidden />
          </Button>
          <span className="min-w-24 text-center text-xs text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            aria-label="Next page"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            <ChevronRight className="size-4" aria-hidden />
          </Button>
        </div>
      </div>
    </div>
  )
}
