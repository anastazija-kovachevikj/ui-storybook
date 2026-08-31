"use client"

import { useState } from "react"

import { ApprovalWorkflow } from "@/components/risk-assessments/approval-workflow"
import {
  ContentTabs,
  type RiskAssessmentTab,
} from "@/components/risk-assessments/content-tabs"
import {
  riskAssessmentDetail,
  type RiskAssessmentDetail as RiskAssessmentDetailType,
} from "@/components/risk-assessments/data"
import { DetailsGrid } from "@/components/risk-assessments/detail-cards"
import { ListPreview } from "@/components/risk-assessments/list-preview"
import {
  RiskAssessmentPageHeader,
  RiskAssessmentTopBar,
} from "@/components/risk-assessments/page-header"
import { RiskItemsTable } from "@/components/risk-assessments/risk-items-table"
import { SummaryMetrics } from "@/components/risk-assessments/summary-metrics"
import { cn } from "@/lib/utils"

/**
 * Risk Assessment detail — natural scan path:
 * 1. Identity + status
 * 2. Key figures (always visible)
 * 3. Workflow (collapsed when complete) + next action
 * 4. Overview | Line items
 */
export function RiskAssessmentDetailView({
  detail = riskAssessmentDetail,
  className,
}: {
  detail?: RiskAssessmentDetailType
  className?: string
}) {
  const [tab, setTab] = useState<RiskAssessmentTab>("details")

  return (
    <div
      className={cn(
        "flex h-svh min-h-[720px] w-full flex-col overflow-hidden bg-background text-foreground",
        className
      )}
    >
      <RiskAssessmentTopBar code={detail.code} />

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[1440px] space-y-6 p-4 sm:p-6 lg:p-8">
          <section className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm">
            <RiskAssessmentPageHeader detail={detail} className="p-5 sm:p-6" />
            <div className="border-t border-border/70 bg-muted/30 px-5 py-1.5 sm:px-6">
              <SummaryMetrics detail={detail} className="-mx-5 sm:-mx-6" />
            </div>
          </section>

          <ApprovalWorkflow detail={detail} />

          <div className="space-y-4">
            <ContentTabs
              value={tab}
              onValueChange={setTab}
              itemCount={detail.items.length}
            />

            {tab === "details" ? (
              <div
                role="tabpanel"
                id="ra-panel-details"
                aria-labelledby="ra-tab-details"
                className="space-y-4"
              >
                <DetailsGrid detail={detail} />
                <ListPreview
                  detail={detail}
                  onOpenItems={() => setTab("items")}
                />
              </div>
            ) : (
              <div
                role="tabpanel"
                id="ra-panel-items"
                aria-labelledby="ra-tab-items"
              >
                <RiskItemsTable detail={detail} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default RiskAssessmentDetailView
