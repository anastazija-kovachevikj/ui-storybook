"use client"

import { useState } from "react"

import {
  ContentTabs,
  type VetClinicTab,
} from "@/components/vet-clinics/content-tabs"
import {
  vetClinicDetail,
  type VetClinicDetail as VetClinicDetailType,
} from "@/components/vet-clinics/data"
import { DetailsGrid } from "@/components/vet-clinics/detail-cards"
import { ListPreview } from "@/components/vet-clinics/list-preview"
import {
  VetClinicPageHeader,
  VetClinicTopBar,
} from "@/components/vet-clinics/page-header"
import { SummaryMetrics } from "@/components/vet-clinics/summary-metrics"
import { VeterinariansTable } from "@/components/vet-clinics/veterinarians-table"
import { cn } from "@/lib/utils"

/**
 * Vet clinic detail — natural scan path (aligned with Proposals / RA):
 * 1. Identity + status
 * 2. Key figures (always visible)
 * 3. Overview | Veterinarians
 */
export function VetClinicDetailView({
  detail = vetClinicDetail,
  className,
}: {
  detail?: VetClinicDetailType
  className?: string
}) {
  const [tab, setTab] = useState<VetClinicTab>("details")

  return (
    <div
      className={cn(
        "flex h-full min-h-0 w-full flex-col overflow-hidden bg-background text-foreground",
        className
      )}
    >
      <VetClinicTopBar name={detail.name} />

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[1200px] space-y-5 p-5 md:p-6 lg:p-8">
          <VetClinicPageHeader detail={detail} />

          <SummaryMetrics detail={detail} />

          <div className="space-y-4">
            <ContentTabs
              value={tab}
              onValueChange={setTab}
              veterinarianCount={detail.veterinarians.length}
            />

            {tab === "details" ? (
              <div
                role="tabpanel"
                id="clinic-panel-details"
                aria-labelledby="clinic-tab-details"
                className="space-y-4"
              >
                <DetailsGrid detail={detail} />
                <ListPreview
                  detail={detail}
                  onOpenVeterinarians={() => setTab("veterinarians")}
                />
              </div>
            ) : (
              <div
                role="tabpanel"
                id="clinic-panel-veterinarians"
                aria-labelledby="clinic-tab-veterinarians"
              >
                <VeterinariansTable detail={detail} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default VetClinicDetailView
