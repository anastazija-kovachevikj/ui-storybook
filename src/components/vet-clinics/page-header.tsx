"use client"

import { ArrowLeft, Bell, Building2, MoreHorizontal, Pencil } from "lucide-react"
import Link from "next/link"

import type { EntityStatus, VetClinicDetail } from "@/components/vet-clinics/data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export function statusBadgeClass(status: EntityStatus) {
  switch (status) {
    case "Active":
      return "border-success/30 bg-success-muted text-success"
    case "Inactive":
      return "border-border bg-muted text-muted-foreground"
  }
}

export function VetClinicTopBar({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  return (
    <header
      className={cn(
        "flex h-12 shrink-0 items-center justify-between gap-3 border-b border-border bg-card px-5",
        className
      )}
    >
      <div className="flex min-w-0 items-center gap-2.5 text-sm">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground">
          <Building2 className="size-3.5" />
        </span>
        <span className="truncate font-medium text-foreground">{name}</span>
        <nav
          aria-label="Breadcrumb"
          className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex"
        >
          <span className="text-border">|</span>
          <Link href="/" className="hover:text-foreground">
            Insurance
          </Link>
          <span aria-hidden>›</span>
          <span className="font-medium text-foreground">Vet clinics</span>
        </nav>
      </div>

      <Button
        variant="ghost"
        size="icon-sm"
        className="relative text-muted-foreground"
        aria-label="Notifications"
      >
        <Bell className="size-4" />
        <span className="absolute top-1 right-1 size-1.5 rounded-full bg-primary" />
      </Button>
    </header>
  )
}

export function VetClinicPageHeader({
  detail,
  className,
}: {
  detail: VetClinicDetail
  className?: string
}) {
  const activeCount = detail.veterinarians.filter(
    (vet) => vet.status === "Active"
  ).length

  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
        className
      )}
    >
      <div className="flex min-w-0 items-start gap-3">
        <Link
          href="/vet-clinics"
          aria-label="Back to vet clinics"
          className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
        </Link>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
              {detail.name}
            </h1>
            <Badge
              variant="outline"
              className={statusBadgeClass(detail.status)}
            >
              {detail.status}
            </Badge>
          </div>
          <p className="mt-1.5 text-sm text-muted-foreground">
            <span className="font-medium text-foreground/85">
              {detail.veterinarians.length} veterinarian
              {detail.veterinarians.length === 1 ? "" : "s"}
            </span>
            <span className="mx-1.5 text-border">·</span>
            <span>{activeCount} active</span>
            {detail.city && (
              <>
                <span className="mx-1.5 text-border">·</span>
                <span>{detail.city}</span>
              </>
            )}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-stretch gap-1 pl-12 sm:items-end sm:pl-0">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger
              className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-muted"
              aria-label="More actions"
            >
              <MoreHorizontal className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Assign veterinarian</DropdownMenuItem>
              <DropdownMenuItem>Export record</DropdownMenuItem>
              <DropdownMenuItem variant="destructive">
                Deactivate
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button className="h-9 gap-1.5 rounded-lg px-3.5">
            <Pencil className="size-3.5" />
            Edit
          </Button>
        </div>
        <p className="text-right text-xs text-muted-foreground">
          Updated {detail.updatedAt}
        </p>
      </div>
    </div>
  )
}
