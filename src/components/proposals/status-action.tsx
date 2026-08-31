"use client"

import { useState } from "react"
import { ArrowRight, CheckCircle2, ChevronDown, Lock } from "lucide-react"

import type {
  LifecycleStep,
  ProposalDetail,
} from "@/components/proposals/data"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

function lifecycleSummary(steps: LifecycleStep[]) {
  const current = steps.find((s) => s.status === "current")
  const doneCount = steps.filter(
    (s) => s.status === "done" || s.status === "current"
  ).length
  if (current) {
    return `${current.label}${current.date ? ` · ${current.date}` : ""} · ${doneCount}/${steps.length} stages`
  }
  const lastDone = [...steps].reverse().find((s) => s.status === "done")
  if (lastDone) {
    return `${lastDone.label}${lastDone.date ? ` · ${lastDone.date}` : ""} · ${doneCount}/${steps.length} stages`
  }
  return `${doneCount}/${steps.length} stages`
}

function StepDot({ status }: { status: LifecycleStep["status"] }) {
  return (
    <span
      className={cn(
        "size-2.5 shrink-0 rounded-full ring-2 ring-background",
        status === "done" && "bg-primary",
        status === "current" && "bg-primary shadow-[0_0_0_3px] shadow-primary/20",
        status === "pending" && "bg-muted-foreground/25",
        status === "skipped" && "bg-muted-foreground/20"
      )}
      aria-hidden
    />
  )
}

/**
 * Glanceable lifecycle + next action — mirrors Risk Assessments ApprovalWorkflow.
 * Collapsed when terminal (Converted / Rejected); expanded by default otherwise.
 */
export function StatusAction({
  detail,
  className,
  defaultExpanded,
}: {
  detail: ProposalDetail
  className?: string
  defaultExpanded?: boolean
}) {
  const isTerminal =
    detail.statusLabel === "Converted" || detail.statusLabel === "Rejected"
  const [expanded, setExpanded] = useState(defaultExpanded ?? !isTerminal)

  const isLocked = Boolean(detail.lockedMessage)
  const hasAction = Boolean(detail.availableAction)
  const summary = lifecycleSummary(detail.lifecycle)

  return (
    <Card
      className={cn(
        "rounded-xl border-0 bg-card shadow-none ring-1 ring-border",
        className
      )}
    >
      <div className="flex flex-col gap-0 sm:flex-row sm:items-stretch">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className={cn(
            "flex min-w-0 flex-1 items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-muted/40",
            expanded && "border-b border-border sm:border-b-0 sm:border-r"
          )}
        >
          <span
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-full",
              isTerminal
                ? "bg-success-muted text-success"
                : "bg-primary/10 text-primary"
            )}
            aria-hidden
          >
            <CheckCircle2 className="size-4" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold text-foreground">
              Proposal lifecycle
            </span>
            <span className="mt-0.5 block truncate text-xs text-muted-foreground">
              {summary}
              {!expanded && isLocked && (
                <span className="text-muted-foreground/80"> · Locked</span>
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

        <div className="flex w-full shrink-0 items-center px-4 py-3 sm:max-w-[280px] sm:border-l sm:border-border">
          {hasAction ? (
            <button
              type="button"
              className="group flex w-full items-start gap-2.5 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-left transition-colors hover:border-primary/30 hover:bg-primary/10"
            >
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <ArrowRight className="size-3" strokeWidth={2.5} />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-primary">
                  {detail.availableAction!.title}
                </span>
                <span className="mt-0.5 block text-[11px] leading-snug text-muted-foreground">
                  {detail.availableAction!.description}
                </span>
              </span>
            </button>
          ) : isLocked ? (
            <div className="w-full rounded-lg bg-muted/50 px-3 py-2">
              <p className="text-xs font-medium text-foreground">
                No action needed
              </p>
              <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                Proposal is locked for editing.
              </p>
            </div>
          ) : (
            <div className="w-full rounded-lg bg-muted/50 px-3 py-2">
              <p className="text-xs font-medium text-foreground">
                Waiting on client
              </p>
              <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                Send or follow up when ready.
              </p>
            </div>
          )}
        </div>
      </div>

      {expanded && (
        <CardContent className="border-t border-border pt-4 pb-4">
          <ol className="flex flex-col gap-0 sm:flex-row sm:items-start sm:justify-between">
            {detail.lifecycle.map((step, index) => {
              const next = detail.lifecycle[index + 1]
              const lineDone =
                step.status === "done" ||
                step.status === "current" ||
                step.status === "skipped"
              return (
                <li
                  key={step.id}
                  className="relative flex min-w-0 flex-1 items-start gap-3 sm:flex-col sm:items-center sm:gap-2 sm:text-center"
                >
                  <div className="relative flex items-center sm:w-full sm:justify-center">
                    <StepDot status={step.status} />
                    {next && (
                      <span
                        className={cn(
                          "absolute top-1/2 left-[calc(50%+8px)] hidden h-0.5 w-[calc(100%-16px)] -translate-y-1/2 sm:block",
                          lineDone && next.status !== "pending"
                            ? "bg-primary"
                            : "bg-border"
                        )}
                        aria-hidden
                      />
                    )}
                  </div>
                  <div className="min-w-0 pb-3 sm:pb-0">
                    <p
                      className={cn(
                        "text-sm font-medium",
                        step.status === "current"
                          ? "text-primary"
                          : step.status === "pending"
                            ? "text-muted-foreground"
                            : "text-foreground"
                      )}
                    >
                      {step.label}
                    </p>
                    {step.date ? (
                      <p className="mt-0.5 text-[11px] tabular-nums text-muted-foreground">
                        {step.date}
                      </p>
                    ) : step.status === "pending" ? (
                      <p className="mt-0.5 text-[11px] text-muted-foreground/70">
                        Pending
                      </p>
                    ) : null}
                  </div>
                </li>
              )
            })}
          </ol>

          {isLocked && detail.lockedMessage && (
            <div className="mt-4 flex gap-2.5 rounded-lg border border-border bg-muted/40 px-3 py-2.5">
              <Lock
                className="mt-0.5 size-3.5 shrink-0 text-muted-foreground"
                aria-hidden
              />
              <p className="text-xs leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">Locked. </span>
                {detail.lockedMessage}
              </p>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}
