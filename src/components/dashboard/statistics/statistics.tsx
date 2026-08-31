"use client"

import { BusinessInsightsCard } from "@/components/dashboard/statistics/business-insights-card"
import { BusinessMetricBar } from "@/components/dashboard/statistics/business-metric-bar"
import { AnalyticsDashboardWidgets } from "@/components/dashboard/statistics/analytics-dashboard-widgets"
import { BusinessPerformanceCards } from "@/components/dashboard/statistics/business-performance-cards"
import { ColorfulDashboardSummary } from "@/components/dashboard/statistics/colorful-dashboard-summary"
import { CustomerGrowthOverview } from "@/components/dashboard/statistics/customer-growth-overview"
import { DashboardSummaryHeader } from "@/components/dashboard/statistics/dashboard-summary-header"
import { FinancialPerformanceCards } from "@/components/dashboard/statistics/financial-performance-cards"
import { KpiSummaryCard } from "@/components/dashboard/statistics/kpi-summary-card"
import { LifecycleDistribution } from "@/components/dashboard/statistics/lifecycle-distribution"
import { MonthlyEarningsOverview } from "@/components/dashboard/statistics/monthly-earnings-overview"
import { PerformanceIndicatorCards } from "@/components/dashboard/statistics/performance-indicator-cards"
import { RevenueInsightsCard } from "@/components/dashboard/statistics/revenue-insights-card"
import { RevenueSalesMetrics } from "@/components/dashboard/statistics/revenue-sales-metrics"
import { SalesOverviewCard } from "@/components/dashboard/statistics/sales-overview-card"
import { TotalAssetsSummary } from "@/components/dashboard/statistics/total-assets-summary"
import { TotalAssetsDistribution } from "@/components/dashboard/statistics/total-assets-distribution"
import { UsersSubscriptionsOverview } from "@/components/dashboard/statistics/users-subscriptions-overview"
import { YearlyBackupOverview } from "@/components/dashboard/statistics/yearly-backup-overview"

export const statisticsVariants = [
  "kpiSummary",
  "businessMetricBar",
  "businessInsights",
  "financialPerformance",
  "revenueSalesMetrics",
  "colorfulDashboardSummary",
  "dashboardSummaryHeader",
  "analyticsDashboardWidgets",
  "revenueInsightsCard",
  "monthlyEarningsOverview",
  "yearlyBackupOverview",
  "totalAssetsSummary",
  "usersSubscriptionsOverview",
  "salesOverviewCard",
  "customerGrowthOverview",
  "businessPerformanceCards",
  "totalAssetsDistribution",
  "performanceIndicatorCards",
  "lifecycleDistribution",
] as const

export type StatisticsVariant = (typeof statisticsVariants)[number]

/** Figma preview content widths (px) from Statistics sections */
export const statisticsWidths = {
  kpiSummary: 1152,
  businessMetricBar: 1280,
  businessInsights: 1152,
  financialPerformance: 1152,
  revenueSalesMetrics: 1216,
  colorfulDashboardSummary: 1280,
  dashboardSummaryHeader: 1280,
  analyticsDashboardWidgets: 1280,
  revenueInsightsCard: 1280,
  monthlyEarningsOverview: 1280,
  yearlyBackupOverview: 1280,
  totalAssetsSummary: 1280,
  usersSubscriptionsOverview: 1280,
  salesOverviewCard: 1280,
  customerGrowthOverview: 1280,
  businessPerformanceCards: 1280,
  totalAssetsDistribution: 1280,
  performanceIndicatorCards: 1552,
  lifecycleDistribution: 1600,
} as const satisfies Record<StatisticsVariant, number>

export const statisticsMeta: Record<
  StatisticsVariant,
  {
    title: string
    figmaSection: string
    figmaNodeId: string
    description: string
    width: number
  }
> = {
  kpiSummary: {
    title: "KPI Summary card",
    figmaSection: "KPI Summary card",
    figmaNodeId: "470:13263",
    width: statisticsWidths.kpiSummary,
    description:
      "A dashboard KPI summary row combining an analytics welcome card with earnings and expense figures alongside weekly sales and purchase order cards with report actions.",
  },
  businessMetricBar: {
    title: "Business Metric Bar Preview",
    figmaSection: "Business Metric Bar Preview",
    figmaNodeId: "471:1489",
    width: statisticsWidths.businessMetricBar,
    description:
      "A horizontal KPI bar displaying orders, sales, profit, and expenses with weekly change indicators, ideal for dashboards to monitor short-term performance and trends at a glance.",
  },
  businessInsights: {
    title: "Business Insights Card Preview",
    figmaSection: "Business Insights Card Preview",
    figmaNodeId: "471:1490",
    width: statisticsWidths.businessInsights,
    description:
      "A set of clean analytics cards displaying key metrics like followers, income, and balance, perfect for dashboards to highlight performance insights, track progress, and present essential data clearly.",
  },
  financialPerformance: {
    title: "Financial Performance Cards Preview",
    figmaSection: "Financial Performance Cards Preview",
    figmaNodeId: "471:1491",
    width: statisticsWidths.financialPerformance,
    description:
      "A row of financial metric cards showing total sales, total profit, and advertising costs with absolute deltas, percentage pills, and sparkline charts for quick performance comparison.",
  },
  revenueSalesMetrics: {
    title: "Revenue & Sales Metrics Cards Preview",
    figmaSection: "Revenue & Sales Metrics Cards Preview",
    figmaNodeId: "471:1492",
    width: statisticsWidths.revenueSalesMetrics,
    description:
      "A set of revenue and sales metric cards presenting total sales, monthly sales, and revenue growth with trend indicators and charts for dashboard performance monitoring.",
  },
  colorfulDashboardSummary: {
    title: "Colorful Dashboard Summary Cards Preview",
    figmaSection: "Colorful Dashboard Summary Cards Preview",
    figmaNodeId: "471:1493",
    width: statisticsWidths.colorfulDashboardSummary,
    description:
      "A vibrant set of metric cards displaying key business indicators like employees, clients, projects, events, payroll, and reports, perfect for dashboards to present data in a visually engaging layout.",
  },
  dashboardSummaryHeader: {
    title: "Dashboard Summary Header",
    figmaSection: "Dashboard Summary Header Preview",
    figmaNodeId: "471:1494",
    width: statisticsWidths.dashboardSummaryHeader,
    description:
      "A dashboard summary header that welcomes the user and combines lead and conversion totals with refunds, sales, and earnings metrics.",
  },
  analyticsDashboardWidgets: {
    title: "Analytics Dashboard Widgets Preview",
    figmaSection: "Analytics Dashboard Widgets Preview",
    figmaNodeId: "471:1495",
    width: statisticsWidths.analyticsDashboardWidgets,
    description:
      "A four-widget analytics dashboard row showing customer growth, product performance, latest-deal progress, and weekly payment activity.",
  },
  revenueInsightsCard: {
    title: "Revenue Insights Card Preview",
    figmaSection: "Statistics 09 - Revenue Insights Card Preview",
    figmaNodeId: "471:1496",
    width: statisticsWidths.revenueInsightsCard,
    description:
      "A compact revenue-insights card displaying all-time revenue, its growth, and a regional distribution across Asia, USA, and Europe.",
  },
  monthlyEarningsOverview: {
    title: "Monthly Earnings Overview Preview",
    figmaSection: "Statistics 10 - Monthly Earnings Overview Preview",
    figmaNodeId: "471:1497",
    width: statisticsWidths.monthlyEarningsOverview,
    description:
      "A monthly earnings card that pairs current revenue and its year-over-year change with a compact area trend chart.",
  },
  yearlyBackupOverview: {
    title: "Yearly Backup Overview Preview",
    figmaSection: "Statistics 11 - Yearly Backup Overview Preview",
    figmaNodeId: "471:1498",
    width: statisticsWidths.yearlyBackupOverview,
    description:
      "A yearly backup summary card that compares two annual data segments alongside the current backup value and year-over-year growth.",
  },
  totalAssetsSummary: {
    title: "Total Assets Summary Preview",
    figmaSection: "Total Assets Summary Preview",
    figmaNodeId: "471:1499",
    width: statisticsWidths.totalAssetsSummary,
    description:
      "A colorful total-assets summary card that highlights employees, clients, projects, payroll, and events in a compact masonry layout.",
  },
  usersSubscriptionsOverview: {
    title: "Users & Subscriptions Overview Cards Preview",
    figmaSection: "Users & Subscriptions Overview Cards Preview",
    figmaNodeId: "471:1500",
    width: statisticsWidths.usersSubscriptionsOverview,
    description:
      "A two-card overview that highlights user growth with an area chart and subscription activity with paired vertical bars.",
  },
  salesOverviewCard: {
    title: "Sales Overview Card Preview",
    figmaSection: "Sales Overview Card Preview",
    figmaNodeId: "471:1501",
    width: statisticsWidths.salesOverviewCard,
    description:
      "A sales overview card that visualizes the last seven days with three nested percentage progress arcs.",
  },
  customerGrowthOverview: {
    title: "Customer Growth Overview Preview",
    figmaSection: "Customer Growth Overview Preview",
    figmaNodeId: "471:1502",
    width: statisticsWidths.customerGrowthOverview,
    description:
      "A customer-growth comparison card that overlays this week's acquisition trend with last week's performance.",
  },
  businessPerformanceCards: {
    title: "Business Performance Cards Preview",
    figmaSection: "Statistics Business Performance Cards Preview",
    figmaNodeId: "471:1503",
    width: statisticsWidths.businessPerformanceCards,
    description:
      "A four-card business-performance grid showing customer and project trends, overall growth, and the expense distribution.",
  },
  totalAssetsDistribution: {
    title: "Total Assets Distribution Card Preview",
    figmaSection: "Total Assets Distribution Card Preview",
    figmaNodeId: "471:1504",
    width: statisticsWidths.totalAssetsDistribution,
    description:
      "A total-assets summary card with year-over-year growth, a segmented revenue distribution, and itemized asset values.",
  },
  performanceIndicatorCards: {
    title: "Performance Indicator Cards Preview",
    figmaSection: "Performance Indicator Cards Preview",
    figmaNodeId: "471:1505",
    width: statisticsWidths.performanceIndicatorCards,
    description:
      "A six-card performance indicator row that combines order, budget, income, and expense figures with focused actions.",
  },
  lifecycleDistribution: {
    title: "Lifecycle Distribution",
    figmaSection: "User reference — lifecycle distribution",
    figmaNodeId: "reference",
    width: statisticsWidths.lifecycleDistribution,
    description:
      "A shadcn-styled lifecycle summary that shows total claims alongside the distribution of completed, submitted, started, and in-review claims.",
  },
}

export type StatisticsProps = {
  variant: StatisticsVariant
  className?: string
}

export function Statistics({ variant, className }: StatisticsProps) {
  switch (variant) {
    case "kpiSummary":
      return <KpiSummaryCard className={className} />
    case "businessMetricBar":
      return <BusinessMetricBar className={className} />
    case "businessInsights":
      return <BusinessInsightsCard className={className} />
    case "financialPerformance":
      return <FinancialPerformanceCards className={className} />
    case "revenueSalesMetrics":
      return <RevenueSalesMetrics className={className} />
    case "colorfulDashboardSummary":
      return <ColorfulDashboardSummary className={className} />
    case "dashboardSummaryHeader":
      return <DashboardSummaryHeader className={className} />
    case "analyticsDashboardWidgets":
      return <AnalyticsDashboardWidgets className={className} />
    case "revenueInsightsCard":
      return <RevenueInsightsCard className={className} />
    case "monthlyEarningsOverview":
      return <MonthlyEarningsOverview className={className} />
    case "yearlyBackupOverview":
      return <YearlyBackupOverview className={className} />
    case "totalAssetsSummary":
      return <TotalAssetsSummary className={className} />
    case "usersSubscriptionsOverview":
      return <UsersSubscriptionsOverview className={className} />
    case "salesOverviewCard":
      return <SalesOverviewCard className={className} />
    case "customerGrowthOverview":
      return <CustomerGrowthOverview className={className} />
    case "businessPerformanceCards":
      return <BusinessPerformanceCards className={className} />
    case "totalAssetsDistribution":
      return <TotalAssetsDistribution className={className} />
    case "performanceIndicatorCards":
      return <PerformanceIndicatorCards className={className} />
    case "lifecycleDistribution":
      return <LifecycleDistribution className={className} />
    default: {
      const _exhaustive: never = variant
      return _exhaustive
    }
  }
}

export default Statistics
