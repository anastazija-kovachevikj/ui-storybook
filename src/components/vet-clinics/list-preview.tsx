"use client"

import { ArrowRight, Plus } from "lucide-react"
import Link from "next/link"

import {
  displayValue,
  initialsFromName,
  type ClinicVeterinarian,
  type VetClinicDetail,
} from "@/components/vet-clinics/data"
import { statusBadgeClass } from "@/components/vet-clinics/page-header"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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

/**
 * Compact veterinarian snapshot on Overview — deep-links into the full table.
 */
export function ListPreview({
  detail,
  onOpenVeterinarians,
  className,
}: {
  detail: VetClinicDetail
  onOpenVeterinarians?: () => void
  className?: string
}) {
  const previewItems = detail.veterinarians.slice(0, 5)
  const remaining = detail.veterinarians.length - previewItems.length
  const active = detail.veterinarians.filter((vet) => vet.status === "Active").length

  return (
    <Card
      className={cn(
        "rounded-xl border-0 bg-card shadow-none ring-1 ring-border",
        className
      )}
    >
      <CardHeader className="flex flex-row items-start justify-between gap-3 border-b border-border/70 [.border-b]:pb-3.5">
        <div className="min-w-0">
          <CardTitle className="text-sm font-semibold">Veterinarians</CardTitle>
          <CardDescription className="mt-0.5">
            {detail.veterinarians.length === 0
              ? "No veterinarians assigned"
              : `${detail.veterinarians.length} assigned · ${active} active`}
          </CardDescription>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1.5 rounded-lg">
            <Plus className="size-3.5" />
            Assign
          </Button>
          {onOpenVeterinarians && detail.veterinarians.length > 0 && (
            <Button
              size="sm"
              variant="ghost"
              className="h-8 gap-1 rounded-lg text-primary"
              onClick={onOpenVeterinarians}
            >
              Open table
              <ArrowRight className="size-3.5" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="px-0 pt-0 pb-0">
        {detail.veterinarians.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 px-4 py-10 text-center">
            <p className="text-sm text-muted-foreground">
              Assign veterinarians so this clinic can appear on risk work.
            </p>
            {onOpenVeterinarians && (
              <Button
                size="sm"
                className="mt-1 h-8 gap-1.5"
                onClick={onOpenVeterinarians}
              >
                <Plus className="size-3.5" />
                Go to veterinarians
              </Button>
            )}
          </div>
        ) : (
          <>
            <ul className="divide-y divide-border/70">
              {previewItems.map((vet) => (
                <VeterinarianPreviewRow key={vet.id} vet={vet} />
              ))}
            </ul>
            {remaining > 0 && onOpenVeterinarians && (
              <button
                type="button"
                onClick={onOpenVeterinarians}
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

function VeterinarianPreviewRow({ vet }: { vet: ClinicVeterinarian }) {
  return (
    <li className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-2.5">
        <Avatar size="sm">
          <AvatarFallback className="bg-muted text-[10px] font-semibold">
            {initialsFromName(vet.name)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <Link
            href="/veterinarians"
            className="truncate text-sm font-medium text-foreground hover:text-primary hover:underline"
          >
            {vet.name}
          </Link>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {displayValue(vet.licenseNumber)}
            <span className="mx-1.5 text-border">·</span>
            {displayValue(vet.email)}
          </p>
        </div>
      </div>
      <Badge
        variant="outline"
        className={cn("font-medium", statusBadgeClass(vet.status))}
      >
        {vet.status}
      </Badge>
    </li>
  )
}
