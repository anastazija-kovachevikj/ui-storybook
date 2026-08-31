"use client"

import { Calculator, Shield, UserRound } from "lucide-react"

import { ClausesCard } from "@/components/risk-assessments/clauses-card"
import {
  formatRsd,
  type RiskAssessmentDetail,
} from "@/components/risk-assessments/data"
import { NotesCard } from "@/components/risk-assessments/notes-card"
import { Badge } from "@/components/ui/badge"
import {
  InfoCard as FieldCard,
  InfoFieldList,
  InfoFieldRow,
} from "@/components/ui/info-card"
import { cn } from "@/lib/utils"

/** Context fields — code omitted (already in page header). */
export function InfoCard({
  detail,
  className,
}: {
  detail: RiskAssessmentDetail
  className?: string
}) {
  return (
    <FieldCard
      title="Policy context"
      icon={<Shield aria-hidden />}
      editable
      className={className}
    >
      <InfoFieldList
        fields={[
          { label: "Client", value: detail.client },
          { label: "HID", value: detail.clientHid, mono: true },
          { label: "Insurer", value: detail.insurer },
          { label: "Policy", value: detail.policy ?? "Not linked" },
          { label: "Location", value: detail.insuranceLocation },
          {
            label: "Assessment date",
            value: detail.assessmentDate ?? "Not set",
          },
        ]}
      />
    </FieldCard>
  )
}

export function OwnerCard({
  detail,
  className,
}: {
  detail: RiskAssessmentDetail
  className?: string
}) {
  const people = [
    { phase: "Draft", role: "Appraiser", name: detail.owner.draftAppraiser },
    { phase: "Draft", role: "Approver", name: detail.owner.draftApprover },
    { phase: "Offer", role: "Appraiser", name: detail.owner.offerAppraiser },
    { phase: "Offer", role: "Approver", name: detail.owner.offerApprover },
  ]

  return (
    <FieldCard
      title="Owners"
      icon={<UserRound aria-hidden />}
      className={className}
    >
      <ul className="flex flex-col gap-0.5">
        {people.map((person, index) => (
          <li
            key={`${person.phase}-${person.role}`}
            className={cn(
              "flex items-center gap-2.5 rounded-xl px-3 py-2.5",
              index % 2 === 0 && "bg-muted/70"
            )}
          >
            <span
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary ring-1 ring-primary/15"
              aria-hidden
            >
              {person.name
                .split(/\s+/)
                .map((p) => p[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground">
                {person.name}
              </p>
              <p className="text-[11px] font-medium text-muted-foreground">
                {person.phase} · {person.role}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </FieldCard>
  )
}

/**
 * Result summary — stretches to match Policy context when placed in the same row.
 */
export function RiskResultCard({
  detail,
  className,
}: {
  detail: RiskAssessmentDetail
  className?: string
}) {
  return (
    <FieldCard
      title="Result summary"
      action={
        <Badge
          variant="outline"
          className="gap-1 border-success/30 bg-success-muted font-normal text-success"
        >
          <Calculator className="size-3" aria-hidden />
          Calculated
        </Badge>
      }
      className={className}
    >
      <div className="flex flex-col gap-3">
        <div className="rounded-xl border border-success/20 bg-success-muted/60 px-3.5 py-3">
          <p className="text-xs font-semibold text-success">
            Estimated subsidy
            <span className="ml-1.5 font-normal text-muted-foreground">
              {detail.subsidyPercentMin}–{detail.subsidyPercentMax}%
            </span>
          </p>
          <p className="mt-1 text-xl font-semibold tracking-tight tabular-nums text-foreground">
            {formatRsd(detail.subsidyMin)} – {formatRsd(detail.subsidyMax)}
          </p>
        </div>
        <dl className="flex flex-col gap-0.5">
          <InfoFieldRow
            label="Sum insured"
            value={formatRsd(detail.sumInsured)}
            striped
          />
          <InfoFieldRow
            label="Premium (net)"
            value={formatRsd(detail.premiumNet)}
          />
        </dl>
        <p className="px-1 text-[11px] leading-relaxed text-muted-foreground">
          {detail.subsidyNote}
        </p>
      </div>
    </FieldCard>
  )
}

/**
 * Overview layout:
 * 1. Policy context | Owners | Result summary (equal height)
 * 2. Notes | Clauses — full width of the row above
 */
export function DetailsGrid({
  detail,
  className,
}: {
  detail: RiskAssessmentDetail
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2 xl:grid-cols-[1.1fr_1fr_0.9fr] xl:auto-rows-fr">
        <InfoCard detail={detail} />
        <OwnerCard detail={detail} />
        <RiskResultCard detail={detail} />
      </div>

      <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2">
        <NotesCard notes={detail.notes} />
        <ClausesCard clauses={detail.clauses} />
      </div>
    </div>
  )
}
