import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  Chart,
  chartMeta,
  chartVariants,
  type ChartVariant,
} from "@/components/dashboard/charts/chart"

const meta = {
  title: "Components/Chart",
  component: Chart,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "ClaimUW dashboard charts from Figma section Components. Each story maps one Figma chart; the story description is the intent of that chart.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [...chartVariants],
      description: "Which Figma Chart section to render",
    },
  },
  args: {
    variant: "salesPerformanceBar",
  },
  decorators: [
    (Story, context) => {
      const variant = (context.args.variant ??
        "salesPerformanceBar") as ChartVariant
      const width = chartMeta[variant].width
      return (
        <div style={{ width }}>
          <Story />
        </div>
      )
    },
  ],
} satisfies Meta<typeof Chart>

export default meta
type Story = StoryObj<typeof meta>

function storyFor(variant: ChartVariant): Story {
  const info = chartMeta[variant]
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

/** Figma: Sales Performance Bar Chart (16:17973) */
export const SalesPerformanceBarChart = storyFor("salesPerformanceBar")

/** Figma: Earnings Pie Chart - Donut with Text (16:18173) */
export const EarningsPieChart = storyFor("earningsPie")

/** Figma: Area Chart Gradient - Yearly Sales Comparison (16:18233) */
export const YearlySalesComparison = storyFor("yearlySalesArea")

/** Figma: Bar Chart - Weekly Sales (16:18321) */
export const WeeklySales = storyFor("weeklySalesBar")

/** Figma: Bar Chart - Revenue vs Expenses (16:18389) */
export const RevenueVsExpenses = storyFor("revenueVsExpenses")

/** Figma: Line Chart - Sales & Profit Overview (16:18618) */
export const SalesProfitOverview = storyFor("salesProfitOverview")

/** Figma: Sales Comparison Area Chart (16:19459) */
export const SalesComparisonArea = storyFor("salesComparisonArea")

/** Figma: Product Sales Performance Gauge Chart (16:18806) */
export const ProductSalesPerformanceGaugeChart = storyFor("productSalesGauge")

/** Figma: Pipeline Performance Radar Chart (16:18527) */
export const PipelinePerformanceRadarChart = storyFor("pipelinePerformanceRadar")

/** Figma: Marketing Report Donut Chart (16:18728) */
export const MarketingReportDonutChart = storyFor("marketingReportDonut")

/** Figma: Profit & Expense Bar Chart (16:18873) */
export const ProfitExpenseBarChart = storyFor("profitExpenseBar")

/** Figma: Profit & Expense Bar Chart 2 (16:19645) */
export const ProfitExpenseBarChart2 = storyFor("employeeSalaryBar")

/** Figma: Product Sales Line Chart (16:19824) */
export const ProductSalesLineChart = storyFor("productSalesLine")

/** Figma: Total Settlements Area Chart (16:19309) */
export const TotalSettlementsAreaChart = storyFor("totalSettlementsArea")

/** Figma: Bar Chart - Revenue Forecast (16:19030) */
export const RevenueForecastBarChart = storyFor("revenueForecastBar")
export const RevenueForecastLineChart = storyFor("revenueForecastLine")
