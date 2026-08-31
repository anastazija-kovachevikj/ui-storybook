"use client"

import { Pencil, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

import {
  displayValue,
  type VetClinicDetail,
} from "@/components/vet-clinics/data"
import { statusBadgeClass } from "@/components/vet-clinics/page-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
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

export function VeterinariansTable({
  detail,
  className,
}: {
  detail: VetClinicDetail
  className?: string
}) {
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
            Veterinarians
          </CardTitle>
          <CardDescription className="mt-0.5">
            Practitioners assigned to this clinic
          </CardDescription>
        </div>
        <CardAction>
          <Button size="sm" className="h-8 gap-1.5 rounded-lg">
            <Plus className="size-3.5" />
            Assign
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="px-0 pb-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-5 text-xs font-medium text-muted-foreground">
                Name
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground">
                License #
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground">
                Phone
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground">
                Email
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
            {detail.veterinarians.map((vet) => (
              <TableRow key={vet.id} className="border-border/70">
                <TableCell className="pl-5 font-medium whitespace-normal text-foreground">
                  <Link
                    href="/veterinarians"
                    className="hover:text-primary hover:underline"
                  >
                    {vet.name}
                  </Link>
                </TableCell>
                <TableCell
                  className={cn(
                    "font-mono text-[13px] tracking-tight",
                    vet.licenseNumber
                      ? "text-muted-foreground"
                      : "text-muted-foreground/60"
                  )}
                >
                  {displayValue(vet.licenseNumber)}
                </TableCell>
                <TableCell
                  className={cn(
                    vet.phone
                      ? "text-muted-foreground"
                      : "text-muted-foreground/60"
                  )}
                >
                  {displayValue(vet.phone)}
                </TableCell>
                <TableCell
                  className={cn(
                    "whitespace-normal",
                    vet.email
                      ? "text-muted-foreground"
                      : "text-muted-foreground/60"
                  )}
                >
                  {displayValue(vet.email)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn("font-medium", statusBadgeClass(vet.status))}
                  >
                    {vet.status}
                  </Badge>
                </TableCell>
                <TableCell className="pr-5">
                  <div className="flex items-center justify-end gap-0.5">
                    <Tooltip>
                      <TooltipTrigger
                        className="inline-flex size-6 items-center justify-center rounded-[min(var(--radius-md),10px)] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        aria-label={`Edit ${vet.name}`}
                      >
                        <Pencil className="size-3.5" />
                      </TooltipTrigger>
                      <TooltipContent>Edit veterinarian</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger
                        className="inline-flex size-6 items-center justify-center rounded-[min(var(--radius-md),10px)] text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
                        aria-label={`Remove ${vet.name}`}
                      >
                        <Trash2 className="size-3.5" />
                      </TooltipTrigger>
                      <TooltipContent>Remove from clinic</TooltipContent>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {detail.veterinarians.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-muted-foreground"
                >
                  No veterinarians assigned. Assign one to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
