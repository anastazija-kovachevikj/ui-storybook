"use client"

import { useState } from "react"
import { ArrowRight, CheckCircle2, ChevronDown, LockKeyhole } from "lucide-react"

import type { RiskAssessmentDetail, WorkflowPhase } from "@/components/risk-assessments/data"
import { WorkflowStepper } from "@/components/risk-assessments/workflow-stepper"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

function phaseComplete(phase: WorkflowPhase) {
  return phase.steps.every(
    (s) => s.status === "done" || s.status === "skipped"
  )
}

function lastCompletedStep(phase: WorkflowPhase) {
  const done = [...phase.steps]
    .reverse()
    .find((s) => s.status === "done" || s.status === "current")
  return done
}

export function ApprovalWorkflow({
  detail,
  className,
  defaultExpanded,
}: {
  detail: RiskAssessmentDetail
  className?: string
  /** When omitted, collapses if both phases are complete. */
  defaultExpanded?: boolean
}) {
  const bothDone =
    phaseComplete(detail.draftPhase) && phaseComplete(detail.offerPhase)
  const [expanded, setExpanded] = useState(
    defaultExpanded ?? !bothDone
  )

  const offerLast = lastCompletedStep(detail.offerPhase)
  const draftLast = lastCompletedStep(detail.draftPhase)
  const summaryLabel = bothDone
    ? `Offer ${offerLast?.label ?? "complete"}${offerLast?.date ? ` · ${offerLast.date}` : ""}`
    : `Draft ${draftLast?.label ?? "in progress"}${draftLast?.date ? ` · ${draftLast.date}` : ""}`

  const isLocked = Boolean(detail.lockedMessage)

  return (
    <Card
      className={cn(
        "overflow-hidden rounded-2xl border-0 bg-card shadow-sm ring-1 ring-border/80",
        className
      )}
    >
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_340px]">
        {/* Summary / toggle */}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className={cn(
            "flex min-w-0 items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-muted/40 sm:px-6",
            expanded && "border-b border-border lg:border-r lg:border-b-0"
          )}
        >
          <span
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-xl",
              bothDone
                ? "bg-success-muted text-success"
                : "bg-primary/10 text-primary"
            )}
            aria-hidden
          >
            <CheckCircle2 className="size-4" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
              Review progress
            </span>
            <span className="mt-0.5 block text-base font-semibold text-foreground">
              Approval workflow
            </span>
            <span className="mt-1 block truncate text-xs text-muted-foreground">
              {summaryLabel}
              {!expanded && (
                <span className="text-muted-foreground/80">
                  {" "}
                  · Draft & offer phases
                </span>
              )}
            </span>
          </span>
          <ChevronDown
            className={cn(
              "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
              expanded && "rotate-180"
            )}
            aria-hidden
          />
        </button>

        {/* Next action — always glanceable */}
        <div className="flex min-w-0 items-center bg-muted/25 px-5 py-4 sm:px-6">
          {isLocked ? (
            <div className="flex w-full items-start gap-3 rounded-xl border border-success/20 bg-success-muted/50 px-3.5 py-3">
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
                <LockKeyhole className="size-3.5" />
              </span>
              <div>
              <p className="text-sm font-semibold text-foreground">No action needed</p>
              <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                Assessment is approved and locked.
              </p>
              </div>
            </div>
          ) : (
            <Button className="h-auto w-full justify-between rounded-xl px-3.5 py-3 text-left shadow-sm">
              <span className="min-w-0">
                <span className="block text-[11px] font-medium text-primary-foreground/70">
                  Available action
                </span>
                <span className="mt-0.5 block text-sm font-semibold">
                  {detail.availableAction.title}
                </span>
                <span className="mt-0.5 block text-[11px] leading-snug text-primary-foreground/75">
                  {detail.availableAction.description}
                </span>
              </span>
              <ArrowRight className="size-4 shrink-0" strokeWidth={2.5} />
            </Button>
          )}
        </div>
      </div>

      {expanded && (
        <CardContent className="border-t border-border bg-background pt-5 pb-5">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start">
            <div className="min-w-0 flex-1">
              <WorkflowStepper phase={detail.draftPhase} />
            </div>
            <Separator
              orientation="vertical"
              className="hidden h-auto self-stretch xl:block"
            />
            <Separator className="xl:hidden" />
            <div className="min-w-0 flex-1">
              <WorkflowStepper phase={detail.offerPhase} />
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
