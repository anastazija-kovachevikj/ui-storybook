import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  Statistics,
  statisticsMeta,
  statisticsVariants,
  type StatisticsVariant,
} from "@/components/dashboard/statistics/statistics"

const meta = {
  title: "Components/Statistics",
  component: Statistics,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "ClaimUW dashboard statistics cards aligned with shadcnspace Statistics 01–06. Each story maps one statistics variant.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [...statisticsVariants],
      description: "Which Figma Statistics section to render",
    },
  },
  args: {
    variant: "kpiSummary",
  },
  decorators: [
    (Story, context) => {
      const variant = (context.args.variant ?? "kpiSummary") as StatisticsVariant
      const width = statisticsMeta[variant].width
      return (
        <div style={{ width: "100%", maxWidth: width }}>
          <Story />
        </div>
      )
    },
  ],
} satisfies Meta<typeof Statistics>

export default meta
type Story = StoryObj<typeof meta>

function storyFor(variant: StatisticsVariant): Story {
  const info = statisticsMeta[variant]
  return {
    name: info.title,
    args: { variant },
    parameters: {
      docs: {
        description: {
          story: info.description,
        },
      },
    },
  }
}

/** Figma: KPI Summary card */
export const KpiSummaryCard = storyFor("kpiSummary")

/** Figma: Business Metric Bar Preview */
export const BusinessMetricBar = storyFor("businessMetricBar")

/** Figma: Business Insights Card Preview */
export const BusinessInsightsCard = storyFor("businessInsights")

/** Figma: Financial Performance Cards Preview */
export const FinancialPerformanceCards = storyFor("financialPerformance")

/** Figma: Revenue & Sales Metrics Cards Preview */
export const RevenueSalesMetrics = storyFor("revenueSalesMetrics")

/** Figma: Colorful Dashboard Summary Cards Preview */
export const ColorfulDashboardSummary = storyFor("colorfulDashboardSummary")

/** Figma: Dashboard Summary Header Preview */
export const DashboardSummaryHeader = storyFor("dashboardSummaryHeader")

/** Figma: Analytics Dashboard Widgets Preview */
export const AnalyticsDashboardWidgets = storyFor("analyticsDashboardWidgets")

/** Figma: Statistics 09 - Revenue Insights Card Preview */
export const RevenueInsightsCard = storyFor("revenueInsightsCard")

/** Figma: Statistics 10 - Monthly Earnings Overview Preview */
export const MonthlyEarningsOverview = storyFor("monthlyEarningsOverview")

/** Figma: Statistics 11 - Yearly Backup Overview Preview */
export const YearlyBackupOverview = storyFor("yearlyBackupOverview")

/** Figma: Total Assets Summary Preview */
export const TotalAssetsSummary = storyFor("totalAssetsSummary")

/** Figma: Users & Subscriptions Overview Cards Preview */
export const UsersSubscriptionsOverview = storyFor("usersSubscriptionsOverview")

/** Figma: Sales Overview Card Preview */
export const SalesOverviewCard = storyFor("salesOverviewCard")

/** Figma: Customer Growth Overview Preview */
export const CustomerGrowthOverview = storyFor("customerGrowthOverview")

/** Figma: Business Performance Cards Preview */
export const BusinessPerformanceCards = storyFor("businessPerformanceCards")

/** Figma: Total Assets Distribution Card Preview */
export const TotalAssetsDistribution = storyFor("totalAssetsDistribution")

/** Figma: Performance Indicator Cards Preview */
export const PerformanceIndicatorCards = storyFor("performanceIndicatorCards")

/** Lifecycle distribution based on the supplied reference */
export const LifecycleDistribution = storyFor("lifecycleDistribution")
