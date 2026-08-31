"use client"

import { BriefcaseMedical, CalendarClock, Phone, StickyNote } from "lucide-react"
import Link from "next/link"

import {
  displayValue,
  type VeterinarianDetail,
} from "@/components/veterinarians/data"
import { statusBadgeClass } from "@/components/veterinarians/page-header"
import { Badge } from "@/components/ui/badge"
import { InfoCard, InfoFieldList } from "@/components/ui/info-card"
import { cn } from "@/lib/utils"

export function ProfessionalCard({
  detail,
  className,
}: {
  detail: VeterinarianDetail
  className?: string
}) {
  return (
    <InfoCard
      title="Professional"
      icon={<BriefcaseMedical aria-hidden />}
      editable
      className={className}
    >
      <InfoFieldList
        fields={[
          {
            label: "License number",
            value: displayValue(detail.licenseNumber),
            mono: true,
          },
          {
            label: "Specialization",
            value: displayValue(detail.specialization),
          },
          {
            label: "Assigned clinic",
            value: detail.assignedClinic ? (
              <Link
                href="/vet-clinics"
                className="text-primary hover:underline"
              >
                {detail.assignedClinic.name}
              </Link>
            ) : (
              "—"
            ),
            empty: !detail.assignedClinic,
          },
        ]}
      />
    </InfoCard>
  )
}

export function ContactCard({
  detail,
  className,
}: {
  detail: VeterinarianDetail
  className?: string
}) {
  return (
    <InfoCard
      title="Contact"
      icon={<Phone aria-hidden />}
      editable
      className={className}
    >
      <InfoFieldList
        fields={[
          { label: "Phone", value: displayValue(detail.phone) },
          { label: "Email", value: displayValue(detail.email) },
        ]}
      />
    </InfoCard>
  )
}

export function RecordCard({
  detail,
  className,
}: {
  detail: VeterinarianDetail
  className?: string
}) {
  return (
    <InfoCard
      title="Record"
      icon={<CalendarClock aria-hidden />}
      className={className}
    >
      <InfoFieldList
        fields={[
          {
            label: "Status",
            value: (
              <Badge
                variant="outline"
                className={cn("font-medium", statusBadgeClass(detail.status))}
              >
                {detail.status}
              </Badge>
            ),
            empty: false,
          },
          { label: "Created", value: detail.createdAt },
          { label: "Updated", value: detail.updatedAt },
        ]}
      />
    </InfoCard>
  )
}

export function VeterinarianNotesCard({
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
          No notes on this veterinarian.
        </p>
      )}
    </InfoCard>
  )
}

/**
 * Overview layout (mirrors Proposals / Risk Assessments):
 * 1. Professional | Contact | Record (equal height)
 * 2. Notes — full width of the row above
 */
export function DetailsGrid({
  detail,
  className,
}: {
  detail: VeterinarianDetail
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-3 lg:auto-rows-fr">
        <ProfessionalCard detail={detail} />
        <ContactCard detail={detail} />
        <RecordCard detail={detail} />
      </div>
      <VeterinarianNotesCard notes={detail.notes} />
    </div>
  )
}
