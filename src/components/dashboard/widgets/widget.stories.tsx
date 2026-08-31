import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  Widget,
  widgetMeta,
  widgetVariants,
  type WidgetVariant,
} from "@/components/dashboard/widgets/widget"

const meta = {
  title: "Components/Widget",
  component: Widget,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "ClaimUW dashboard widgets from Figma section Widgets (452:7756). Each story maps one Figma section; the story description is the Figma annotation on that widget.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [...widgetVariants],
      description: "Which Figma Widgets section to render",
    },
  },
  args: {
    variant: "analyticsOverview",
  },
  decorators: [
    (Story, context) => {
      const variant = (context.args.variant ?? "analyticsOverview") as WidgetVariant
      const width = widgetMeta[variant].width
      // Match Figma preview card width exactly (global preview already adds padding)
      return (
        <div style={{ width }}>
          <Story />
        </div>
      )
    },
  ],
} satisfies Meta<typeof Widget>

export default meta
type Story = StoryObj<typeof meta>

function storyFor(variant: WidgetVariant): Story {
  const info = widgetMeta[variant]
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

/** Figma: Analytics overview */
export const AnalyticsOverview = storyFor("analyticsOverview")

/** Figma: Sales Growth Update Banner */
export const SalesGrowthUpdateBanner = storyFor("salesGrowthBanner")

/** Figma: Sales by Country Widget */
export const SalesByCountry = storyFor("salesByCountry")

/** Figma: Course Preview Card Widget */
export const CoursePreviewCard = storyFor("coursePreview")

/** Figma: Activity Timeline Widget */
export const ActivityTimeline = storyFor("activityTimeline")

/** Figma: Campaign Performance Widget */
export const CampaignPerformance = storyFor("campaignPerformance")

/** Figma: Statistics – Asset Distribution Overview Widget */
export const AssetDistribution = storyFor("assetDistribution")

/** Figma: Statistics – KPI Welcome Section Widget */
export const KpiWelcomeSection = storyFor("kpiWelcome")

/** Figma: Sales Performance Summary Widget */
export const SalesPerformanceSummary = storyFor("salesPerformanceSummary")

/** Figma: Weekly Sales Insights Widget */
export const WeeklySalesInsights = storyFor("weeklySalesInsights")

/** Figma: Sales by Location Overview */
export const SalesByLocation = storyFor("salesByLocation")

/** Figma: Transaction Summary Widget */
export const TransactionSummary = storyFor("transactionSummary")

/** Figma: Upcoming Schedule Management */
export const UpcomingScheduleManagement = storyFor("upcomingSchedule")

/** Figma: Payments & Transactions Panel Widget */
export const PaymentsTransactionsPanel = storyFor("paymentsTransactions")

/** Figma: Order Performance Overview Widget */
export const OrderPerformanceOverview = storyFor("orderPerformance")
