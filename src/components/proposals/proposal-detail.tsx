"use client"

import { useState } from "react"

import {
  ContentTabs,
  type ProposalTab,
} from "@/components/proposals/content-tabs"
import {
  proposalDetail,
  type ProposalDetail as ProposalDetailType,
} from "@/components/proposals/data"
import { DetailsGrid } from "@/components/proposals/detail-cards"
import { ItemsTable } from "@/components/proposals/items-table"
import { ListPreview } from "@/components/proposals/list-preview"
import {
  ProposalPageHeader,
  ProposalTopBar,
} from "@/components/proposals/page-header"
import { StatusAction } from "@/components/proposals/status-action"
import { SummaryMetrics } from "@/components/proposals/summary-metrics"
import { cn } from "@/lib/utils"

/**
 * Proposal detail — natural scan path (aligned with Risk Assessments):
 * 1. Identity + status
 * 2. Key figures (always visible)
 * 3. Lifecycle (collapsible) + next action
 * 4. Overview | Line items
 */
export function ProposalDetailView({
  detail = proposalDetail,
  className,
}: {
  detail?: ProposalDetailType
  className?: string
}) {
  const [tab, setTab] = useState<ProposalTab>("details")

  return (
    <div
      className={cn(
        "flex h-full min-h-0 w-full flex-col overflow-hidden bg-background text-foreground",
        className
      )}
    >
      <ProposalTopBar code={detail.code} />

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[1200px] space-y-5 p-5 md:p-6 lg:p-8">
          <ProposalPageHeader detail={detail} />

          <SummaryMetrics detail={detail} />

          <StatusAction detail={detail} />

          <div className="space-y-4">
            <ContentTabs
              value={tab}
              onValueChange={setTab}
              itemCount={detail.items.length}
            />

            {tab === "details" ? (
              <div
                role="tabpanel"
                id="prop-panel-details"
                aria-labelledby="prop-tab-details"
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
                id="prop-panel-items"
                aria-labelledby="prop-tab-items"
              >
                <ItemsTable detail={detail} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default ProposalDetailView
