"use client"

import {
  ArrowLeft,
  ArrowRight,
  Bell,
  FileText,
  Lock,
  MoreHorizontal,
} from "lucide-react"
import Link from "next/link"

import type { RiskAssessmentDetail } from "@/components/risk-assessments/data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export function RiskAssessmentTopBar({
  code,
  className,
}: {
  code: string
  className?: string
}) {
  return (
    <header
      className={cn(
        "flex h-12 shrink-0 items-center justify-between gap-3 border-b border-border bg-card/95 px-4 backdrop-blur sm:px-6",
        className
      )}
    >
      <div className="flex min-w-0 items-center gap-2.5 text-sm">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/15">
          <FileText className="size-3.5" />
        </span>
        <span className="truncate font-medium text-foreground">{code}</span>
        <nav
          aria-label="Breadcrumb"
          className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex"
        >
          <span className="text-border">|</span>
          <Link href="/" className="hover:text-foreground">
            Insurance
          </Link>
          <span aria-hidden>›</span>
          <span className="font-medium text-foreground">Risk assessments</span>
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

export function RiskAssessmentPageHeader({
  detail,
  className,
}: {
  detail: RiskAssessmentDetail
  className?: string
}) {
  const isLocked = Boolean(detail.lockedMessage)

  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
        className
      )}
    >
      <div className="flex min-w-0 items-start gap-3">
        <Link
          href="/risk-assessments"
          aria-label="Back to risk assessments"
          className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
        </Link>

        <div className="min-w-0">
          <p className="mb-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Risk assessment
          </p>
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {detail.code}
            </h1>
            <Badge
              variant="status-success"
              className="min-h-7 gap-1.5 px-2.5 py-1 text-xs"
            >
              {detail.statusLabel}
            </Badge>
            {isLocked && (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Lock className="size-3" aria-hidden />
                Locked
              </span>
            )}
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground/85">{detail.client}</span>
            <span className="mx-1.5 text-border">·</span>
            <span>HID {detail.clientHid}</span>
            <span className="mx-1.5 text-border">·</span>
            <span>{detail.insuranceLocation}</span>
          </p>
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-stretch gap-1.5 pl-12 sm:items-end sm:pl-0">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger
              className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-muted"
              aria-label="More actions"
            >
              <MoreHorizontal className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Export PDF</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem variant="destructive">Archive</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button className="h-9 gap-1.5 rounded-lg px-3.5 shadow-sm">
            Open policy
            <ArrowRight className="size-3.5" />
          </Button>
        </div>
        <p className="text-right text-xs text-muted-foreground">
          Policy {detail.policyCode}
        </p>
      </div>
    </div>
  )
}
