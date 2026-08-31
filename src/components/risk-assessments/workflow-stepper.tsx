"use client"

import { Check, Minus } from "lucide-react"

import type { WorkflowPhase, WorkflowStepStatus } from "@/components/risk-assessments/data"
import { cn } from "@/lib/utils"

function StepIcon({ status }: { status: WorkflowStepStatus }) {
  if (status === "skipped") {
    return (
      <span
        className="flex size-5 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground"
        aria-hidden
      >
        <Minus className="size-2.5" strokeWidth={2.5} />
      </span>
    )
  }

  if (status === "done" || status === "current") {
    return (
      <span
        className={cn(
          "flex size-5 items-center justify-center rounded-full text-white",
          status === "current" ? "bg-primary ring-4 ring-primary/15" : "bg-primary"
        )}
        aria-hidden
      >
        <Check className="size-3" strokeWidth={3} />
      </span>
    )
  }

  return (
    <span
      className="flex size-5 items-center justify-center rounded-full border-2 border-border bg-card"
      aria-hidden
    />
  )
}

export function WorkflowStepper({
  phase,
  className,
}: {
  phase: WorkflowPhase
  className?: string
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <p className="mb-3 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
        {phase.title}
      </p>

      <ol className="flex items-start">
        {phase.steps.map((step, index) => {
          const isLast = index === phase.steps.length - 1
          const connectorDone =
            step.status === "done" ||
            step.status === "current" ||
            step.status === "skipped"

          return (
            <li
              key={step.id}
              className={cn("relative flex min-w-0 flex-1 flex-col items-center", !isLast && "pr-1")}
            >
              {!isLast && (
                <span
                  className={cn(
                    "absolute top-[11px] left-[calc(50%+12px)] right-[calc(-50%+12px)] h-0.5",
                    connectorDone ? "bg-primary" : "bg-border"
                  )}
                  aria-hidden
                />
              )}

              <div className="relative z-10 flex flex-col items-center gap-1.5 text-center">
                <StepIcon status={step.status} />
                <div className="px-0.5">
                  <p
                    className={cn(
                      "text-xs leading-tight font-medium",
                      step.status === "skipped"
                        ? "text-muted-foreground"
                        : step.label === "Approved"
                          ? "text-success"
                          : "text-foreground"
                    )}
                  >
                    {step.label}
                  </p>
                  {step.role && (
                    <p className="mt-0.5 text-[10px] leading-tight tracking-wide text-muted-foreground uppercase">
                      {step.role}
                    </p>
                  )}
                  {step.date && (
                    <p className="mt-0.5 text-[11px] leading-tight text-muted-foreground">
                      {step.date}
                    </p>
                  )}
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
