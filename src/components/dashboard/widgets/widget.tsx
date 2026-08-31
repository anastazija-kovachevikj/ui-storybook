"use client"

import SalesByCountryWidget from "@/components/shadcn-space/blocks/dashboard-shell-01/salesbycountrywidget"
import { CampaignPerformance } from "@/components/shadcn-space/blocks/dashboard-shell-02/campaign-performance"
import { TipBanner } from "@/components/shadcn-space/blocks/dashboard-shell-02/tip-banner"
import { RecentTransactions } from "@/components/shadcn-space/blocks/dashboard-shell-03/recent-transactions"
import { SalesFromLocations } from "@/components/shadcn-space/blocks/dashboard-shell-03/sales-from-locations"
import { UpcomingSchedules } from "@/components/shadcn-space/blocks/dashboard-shell-03/upcoming-schedules"
import { WeeklyStats } from "@/components/shadcn-space/blocks/dashboard-shell-03/weekly-stats"
import { WelcomeBanner } from "@/components/shadcn-space/blocks/dashboard-shell-03/welcome-banner"
import { DailyActivities } from "@/components/dashboard/daily-activities"
import { AnalyticsOverview } from "@/components/dashboard/widgets/analytics-overview"
import { AssetDistribution } from "@/components/dashboard/widgets/asset-distribution"
import { OrderPerformance } from "@/components/dashboard/widgets/order-performance"
import { PaymentsTransactionsPanel } from "@/components/dashboard/widgets/payments-transactions-panel"
import { SalesGrowthBanner } from "@/components/dashboard/widgets/sales-growth-banner"
import { SalesPerformanceSummary } from "@/components/dashboard/widgets/sales-performance-summary"
import { cn } from "@/lib/utils"

export const widgetVariants = [
  "analyticsOverview",
  "salesGrowthBanner",
  "salesByCountry",
  "coursePreview",
  "activityTimeline",
  "campaignPerformance",
  "assetDistribution",
  "kpiWelcome",
  "salesPerformanceSummary",
  "weeklySalesInsights",
  "salesByLocation",
  "transactionSummary",
  "upcomingSchedule",
  "paymentsTransactions",
  "orderPerformance",
] as const

export type WidgetVariant = (typeof widgetVariants)[number]

/** Figma preview card widths (px) from Widgets section 452:7756 */
export const widgetWidths = {
  analyticsOverview: 576,
  salesGrowthBanner: 1280,
  salesByCountry: 384,
  coursePreview: 384,
  activityTimeline: 384,
  campaignPerformance: 384,
  assetDistribution: 384,
  kpiWelcome: 576,
  salesPerformanceSummary: 532,
  weeklySalesInsights: 384,
  salesByLocation: 384,
  transactionSummary: 384,
  upcomingSchedule: 384,
  paymentsTransactions: 672,
  orderPerformance: 448,
} as const satisfies Record<WidgetVariant, number>

export const widgetMeta: Record<
  WidgetVariant,
  {
    title: string
    figmaSection: string
    figmaNodeId: string
    /** Figma annotation labelMarkdown for this widget */
    description: string
    /** Figma preview card width in px */
    width: number
  }
> = {
  analyticsOverview: {
    title: "Analytics overview",
    figmaSection: "Analytics overview",
    figmaNodeId: "454:7797",
    width: widgetWidths.analyticsOverview,
    description:
      "A compact analytics widget displaying earnings and expenses with growth indicators, perfect for admin dashboards to provide quick financial insights without overwhelming the interface.",
  },
  salesGrowthBanner: {
    title: "Sales Growth Update Banner",
    figmaSection: "Sales Growth Update Banner",
    figmaNodeId: "454:10137",
    width: widgetWidths.salesGrowthBanner,
    description:
      "A highlight notification banner showcasing a 40% weekly revenue increase, ideal for dashboards to communicate performance milestones and key business achievements instantly.",
  },
  salesByCountry: {
    title: "Sales by Country Widget",
    figmaSection: "Sales by Country Wdiget",
    figmaNodeId: "454:7798",
    width: widgetWidths.salesByCountry,
    description:
      "A ranked country wise sales widget with flags, revenue values, and growth indicators, ideal for dashboards to monitor geographic performance and spot emerging market trends quickly.",
  },
  coursePreview: {
    title: "Course Preview Card Widget",
    figmaSection: "Course Preview Card Widget",
    figmaNodeId: "454:8021",
    width: widgetWidths.coursePreview,
    description:
      "A content preview widget with cover image, title, short description, and participant avatars, ideal for learning platforms or blogs to showcase featured courses or trending articles.",
  },
  activityTimeline: {
    title: "Activity Timeline Widget",
    figmaSection: "Activity Timeline Widget",
    figmaNodeId: "454:8244",
    width: widgetWidths.activityTimeline,
    description:
      "A vertical activity feed displaying real-time events like payments, sales, and meetings, ideal for dashboards to keep teams updated with the latest business actions.",
  },
  campaignPerformance: {
    title: "Campaign Performance Widget",
    figmaSection: "Campaing Performance Widget",
    figmaNodeId: "454:9360",
    width: widgetWidths.campaignPerformance,
    description:
      "A social campaign tracking widget showing leads, followers, and ad clicks with status labels, ideal for dashboards to monitor marketing performance across multiple platforms.",
  },
  assetDistribution: {
    title: "Statistics – Asset Distribution Overview Widget",
    figmaSection: "Statistics – Asset Distribution Overview Widget",
    figmaNodeId: "454:9515",
    width: widgetWidths.assetDistribution,
    description:
      "An informative analytics card outlining asset value, annual growth metrics, and revenue allocation across multiple streams to enhance financial clarity and decision-making.",
  },
  kpiWelcome: {
    title: "Statistics – KPI Welcome Section Widget",
    figmaSection: "Statistics – KPI Welcome Section Widget",
    figmaNodeId: "454:9655",
    width: widgetWidths.kpiWelcome,
    description:
      "A modern dashboard welcome banner displaying personalized greeting with key metrics like new leads and conversion rate, ideal for highlighting performance insights and engagement at a glance.",
  },
  salesPerformanceSummary: {
    title: "Sales Performance Summary Widget",
    figmaSection: "Sales Performance Summary Wdiget",
    figmaNodeId: "454:9725",
    width: widgetWidths.salesPerformanceSummary,
    description:
      "A sales summary widget presenting active, pending, and delivered orders with achievement insights, perfect for dashboards to visualize growth performance and order management trends.",
  },
  weeklySalesInsights: {
    title: "Weekly Sales Insights Widget",
    figmaSection: "Weekly Sales Insights Widget",
    figmaNodeId: "454:9795",
    width: widgetWidths.weeklySalesInsights,
    description:
      "A compact performance overview card displaying weekly sales patterns, best contributors, trending products, and engagement data, perfect for dashboards to assess short-term operational success.",
  },
  salesByLocation: {
    title: "Sales by Location Overview",
    figmaSection: "Sales by Location Overview",
    figmaNodeId: "454:9843",
    width: widgetWidths.salesByLocation,
    description:
      "A geographic sales widget showing state-wise performance with percentage breakdowns, ideal for tracking regional revenue trends and identifying top-performing markets.",
  },
  transactionSummary: {
    title: "Transaction Summary Widget",
    figmaSection: "Transaction Summary Widget",
    figmaNodeId: "454:9902",
    width: widgetWidths.transactionSummary,
    description:
      "A transaction summary widget displaying recent payments, transfers, refunds, and wallet activities with amount indicators, ideal for dashboards to monitor financial activity and cash flow updates",
  },
  upcomingSchedule: {
    title: "Upcoming Schedule Management",
    figmaSection: "Upcoming Schedule Management",
    figmaNodeId: "454:9950",
    width: widgetWidths.upcomingSchedule,
    description:
      "A scheduling overview widget displaying upcoming shipments, freight details, locations, and status filters, ideal for dashboards to track logistics activities and manage delivery timelines efficiently.",
  },
  paymentsTransactions: {
    title: "Payments & Transactions Panel Widget",
    figmaSection: "Payments & Transactions Panel Widget",
    figmaNodeId: "454:10021",
    width: widgetWidths.paymentsTransactions,
    description:
      "A financial dashboard widget displaying saved payment cards, account balances, and recent transactions with status indicators, ideal for monitoring spending activity and managing digital payments efficiently.",
  },
  orderPerformance: {
    title: "Order Performance Overview Widget",
    figmaSection: "Order Performance Overview Widget",
    figmaNodeId: "454:10181",
    width: widgetWidths.orderPerformance,
    description:
      "A real-time order performance widget displaying new, on-hold, and delivered orders with a visual score indicator, perfect for businesses monitor fulfillment efficiency and operational progress.",
  },
}

export type WidgetProps = {
  variant: WidgetVariant
  className?: string
}

export function Widget({ variant, className }: WidgetProps) {
  switch (variant) {
    case "analyticsOverview":
      return <AnalyticsOverview className={className} />
    case "salesGrowthBanner":
      return <SalesGrowthBanner className={className} />
    case "salesByCountry":
      return (
        <div className={cn("w-full", className)}>
          <SalesByCountryWidget />
        </div>
      )
    case "coursePreview":
      return <TipBanner className={cn("gap-6", className)} />
    case "activityTimeline":
      return (
        <DailyActivities
          className={cn("[--card-spacing:--spacing(6)]", className)}
        />
      )
    case "campaignPerformance":
      return (
        <CampaignPerformance
          className={cn("[--card-spacing:--spacing(6)]", className)}
        />
      )
    case "assetDistribution":
      return <AssetDistribution className={className} />
    case "kpiWelcome":
      return <WelcomeBanner className={className} />
    case "salesPerformanceSummary":
      return <SalesPerformanceSummary className={className} />
    case "weeklySalesInsights":
      return (
        <WeeklyStats
          className={cn("[--card-spacing:--spacing(6)]", className)}
        />
      )
    case "salesByLocation":
      return (
        <SalesFromLocations
          className={cn("[--card-spacing:--spacing(6)]", className)}
        />
      )
    case "transactionSummary":
      return (
        <RecentTransactions
          className={cn("[--card-spacing:--spacing(6)]", className)}
        />
      )
    case "upcomingSchedule":
      return (
        <UpcomingSchedules
          className={cn("[--card-spacing:--spacing(6)]", className)}
        />
      )
    case "paymentsTransactions":
      return <PaymentsTransactionsPanel className={className} />
    case "orderPerformance":
      return <OrderPerformance className={className} />
    default: {
      const _exhaustive: never = variant
      return _exhaustive
    }
  }
}

export default Widget
