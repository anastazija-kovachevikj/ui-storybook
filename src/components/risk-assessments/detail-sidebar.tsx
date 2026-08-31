"use client"

import { ClausesCard } from "@/components/risk-assessments/clauses-card"
import {
  InfoCard,
  OwnerCard,
  RiskResultCard,
} from "@/components/risk-assessments/detail-cards"
import type { RiskAssessmentDetail } from "@/components/risk-assessments/data"
import { NotesCard } from "@/components/risk-assessments/notes-card"
import { cn } from "@/lib/utils"

/**
 * Stacked detail panels (legacy sidebar layout).
 * Prefer DetailsGrid on the main risk assessment screen.
 */
export function DetailSidebar({
  detail,
  className,
}: {
  detail: RiskAssessmentDetail
  className?: string
}) {
  return (
    <aside
      className={cn(
        "flex w-full flex-col gap-3 xl:w-[300px] xl:shrink-0",
        className
      )}
    >
      <InfoCard detail={detail} />
      <RiskResultCard detail={detail} />
      <OwnerCard detail={detail} />
      <NotesCard notes={detail.notes} />
      <ClausesCard clauses={detail.clauses} />
    </aside>
  )
}
