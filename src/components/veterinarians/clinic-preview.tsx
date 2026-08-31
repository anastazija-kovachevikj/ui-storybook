"use client"

import { ArrowRight, Building2 } from "lucide-react"
import Link from "next/link"

import type { VeterinarianDetail } from "@/components/veterinarians/data"
import { statusBadgeClass } from "@/components/veterinarians/page-header"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

/**
 * Assigned-clinic snapshot on Overview — deep-links into the clinic record.
 * Same role as ListPreview on proposals / risk assessments.
 */
export function ClinicPreview({
  detail,
  className,
}: {
  detail: VeterinarianDetail
  className?: string
}) {
  const clinic = detail.assignedClinic

  return (
    <Card
      className={cn(
        "rounded-xl border-0 bg-card shadow-none ring-1 ring-border",
        className
      )}
    >
      <CardHeader className="flex flex-row items-start justify-between gap-3 border-b border-border/70 [.border-b]:pb-3.5">
        <div className="min-w-0">
          <CardTitle className="text-sm font-semibold">
            Assigned clinic
          </CardTitle>
          <CardDescription className="mt-0.5">
            {clinic
              ? "Workplace on the book of business"
              : "Not assigned to a clinic"}
          </CardDescription>
        </div>
        {clinic && (
          <Link
            href="/vet-clinics"
            className="inline-flex h-8 shrink-0 items-center gap-1 rounded-lg px-2.5 text-sm font-medium text-primary transition-colors hover:bg-muted"
          >
            Open clinic
            <ArrowRight className="size-3.5" />
          </Link>
        )}
      </CardHeader>

      <CardContent className="px-0 pt-0 pb-0">
        {!clinic ? (
          <div className="flex flex-col items-center justify-center gap-2 px-4 py-10 text-center">
            <p className="text-sm text-muted-foreground">
              Assign this veterinarian to a clinic to show workplace details.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <Building2 className="size-4" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {clinic.name}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {clinic.city || clinic.address
                    ? [clinic.city, clinic.address].filter(Boolean).join(" · ")
                    : "Location not set"}
                </p>
              </div>
            </div>
            <Badge
              variant="outline"
              className={cn("font-medium", statusBadgeClass(clinic.status))}
            >
              {clinic.status}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
