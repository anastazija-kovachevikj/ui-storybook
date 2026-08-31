"use client"

import { Calculator, FileText, StickyNote, UserRound } from "lucide-react"

import {
  displayValue,
  formatRsd,
  type ProposalDetail,
} from "@/components/proposals/data"
import { Badge } from "@/components/ui/badge"
import { InfoCard, InfoFieldList, InfoFieldRow } from "@/components/ui/info-card"
import { cn } from "@/lib/utils"

/** Context fields — code omitted (already in page header). */
export function ProposalInfoCard({
  detail,
  className,
}: {
  detail: ProposalDetail
  className?: string
}) {
  return (
    <InfoCard
      title="Proposal context"
      icon={<FileText aria-hidden />}
      editable
      className={className}
    >
      <InfoFieldList
        fields={[
          { label: "Subject", value: detail.subject },
          { label: "Date", value: displayValue(detail.date) },
          { label: "Valid until", value: displayValue(detail.validUntil) },
          { label: "Currency", value: displayValue(detail.currency) },
          { label: "Assigned to", value: displayValue(detail.assignedTo) },
          { label: "Created by", value: detail.createdBy },
        ]}
      />
    </InfoCard>
  )
}

export function RecipientCard({
  detail,
  className,
}: {
  detail: ProposalDetail
  className?: string
}) {
  const r = detail.recipient
  return (
    <InfoCard
      title="Recipient"
      icon={<UserRound aria-hidden />}
      editable
      className={className}
    >
      <InfoFieldList
        fields={[
          {
            label: "Related to",
            value: `${r.relatedTo} (${r.relatedToType})`,
          },
          { label: "Proposal to", value: displayValue(r.proposalTo) },
          { label: "Email", value: displayValue(r.email) },
          { label: "Phone", value: displayValue(r.phone) },
          { label: "Address", value: displayValue(r.address) },
          { label: "City", value: displayValue(r.city) },
          { label: "Postal code", value: displayValue(r.postalCode) },
          { label: "Country", value: displayValue(r.country) },
        ]}
      />
    </InfoCard>
  )
}

/**
 * Result summary — same field-row language as the other info cards.
 */
export function ResultSummaryCard({
  detail,
  className,
}: {
  detail: ProposalDetail
  className?: string
}) {
  return (
    <InfoCard
      title="Result summary"
      action={
        <Badge
          variant="outline"
          className="gap-1 border-success/30 bg-success-muted font-normal text-success"
        >
          <Calculator className="size-3" aria-hidden />
          {detail.statusLabel}
        </Badge>
      }
      className={className}
    >
      <div className="flex flex-col gap-3">
        <div className="rounded-xl border border-success/20 bg-success-muted/60 px-3 py-2.5">
          <p className="text-xs font-medium text-success">Proposal total</p>
          <p className="mt-0.5 text-lg font-semibold tracking-tight tabular-nums text-foreground">
            {formatRsd(detail.total)}
          </p>
        </div>
        <dl className="flex flex-col gap-0.5">
          <InfoFieldRow
            label="Subtotal"
            value={formatRsd(detail.subtotal)}
            striped
          />
          <InfoFieldRow
            label={`Discount (${detail.discountPercent.toFixed(2)}%)`}
            value={formatRsd(detail.discount)}
          />
          <InfoFieldRow
            label="Adjustment"
            value={formatRsd(detail.adjustment)}
            striped
          />
        </dl>
        <p className="px-1 text-[11px] leading-relaxed text-muted-foreground">
          {detail.validUntil
            ? `Valid until ${detail.validUntil}`
            : "No validity date set."}
        </p>
      </div>
    </InfoCard>
  )
}

export function ProposalNotesCard({
  notes,
  className,
}: {
  notes: string | null
  className?: string
}) {
  return (
    <InfoCard
      title="Notes"
      icon={<StickyNote aria-hidden />}
      className={className}
    >
      {notes ? (
        <p className="text-sm leading-relaxed whitespace-pre-wrap text-foreground">
          {notes}
        </p>
      ) : (
        <p className="rounded-lg border border-dashed border-border bg-muted/20 px-3 py-3 text-sm text-muted-foreground">
          No notes on this proposal.
        </p>
      )}
    </InfoCard>
  )
}

/**
 * Overview layout (mirrors Risk Assessments):
 * 1. Proposal context | Recipient | Result summary (equal height)
 * 2. Notes — full width of the row above
 */
export function DetailsGrid({
  detail,
  className,
}: {
  detail: ProposalDetail
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-3 lg:auto-rows-fr">
        <ProposalInfoCard detail={detail} />
        <RecipientCard detail={detail} />
        <ResultSummaryCard detail={detail} />
      </div>
      <ProposalNotesCard notes={detail.notes} />
    </div>
  )
}
