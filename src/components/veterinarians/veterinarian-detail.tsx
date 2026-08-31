"use client"

import { ClinicPreview } from "@/components/veterinarians/clinic-preview"
import {
  veterinarianDetail,
  type VeterinarianDetail as VeterinarianDetailType,
} from "@/components/veterinarians/data"
import { DetailsGrid } from "@/components/veterinarians/detail-cards"
import {
  VeterinarianPageHeader,
  VeterinarianTopBar,
} from "@/components/veterinarians/page-header"
import { SummaryMetrics } from "@/components/veterinarians/summary-metrics"
import { cn } from "@/lib/utils"

/**
 * Veterinarian detail — natural scan path (aligned with Proposals / RA):
 * 1. Identity + status
 * 2. Key figures (always visible)
 * 3. Professional | Contact | Record
 * 4. Assigned clinic
 */
export function VeterinarianDetailView({
  detail = veterinarianDetail,
  className,
}: {
  detail?: VeterinarianDetailType
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex h-full min-h-0 w-full flex-col overflow-hidden bg-background text-foreground",
        className
      )}
    >
      <VeterinarianTopBar name={detail.name} />

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[1200px] space-y-5 p-5 md:p-6 lg:p-8">
          <VeterinarianPageHeader detail={detail} />

          <SummaryMetrics detail={detail} />

          <DetailsGrid detail={detail} />

          <ClinicPreview detail={detail} />
        </div>
      </main>
    </div>
  )
}

export default VeterinarianDetailView
