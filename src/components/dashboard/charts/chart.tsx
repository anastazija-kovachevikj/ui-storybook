"use client"

import { SalesPerformanceBarChart } from "@/components/dashboard/charts/sales-performance-bar-chart"
import { EarningsPieChart } from "@/components/dashboard/charts/earnings-pie-chart"
import { YearlySalesAreaChart } from "@/components/dashboard/charts/yearly-sales-area-chart"
import { WeeklySalesBarChart } from "@/components/dashboard/charts/weekly-sales-bar-chart"
import { RevenueVsExpensesChart } from "@/components/dashboard/charts/revenue-vs-expenses-chart"
import { SalesProfitOverviewChart } from "@/components/dashboard/charts/sales-profit-overview-chart"
import { SalesComparisonAreaChart } from "@/components/dashboard/charts/sales-comparison-area-chart"
import { ProductSalesGaugeChart } from "@/components/dashboard/charts/product-sales-gauge-chart"
import { PipelinePerformanceRadarChart } from "@/components/dashboard/charts/pipeline-performance-radar-chart"
import { MarketingReportDonutChart } from "@/components/dashboard/charts/marketing-report-donut-chart"
import { ProfitExpenseBarChart } from "@/components/dashboard/charts/profit-expense-bar-chart"
import { EmployeeSalaryBarChart } from "@/components/dashboard/charts/employee-salary-bar-chart"
import { ProductSalesLineChart } from "@/components/dashboard/charts/product-sales-line-chart"
import { TotalSettlementsAreaChart } from "@/components/dashboard/charts/total-settlements-area-chart"
import { RevenueForecastBarChart } from "@/components/dashboard/charts/revenue-forecast-bar-chart"
import { RevenueForecastLineChart } from "@/components/dashboard/charts/revenue-forecast-line-chart"

export const chartVariants = [
  "salesPerformanceBar",
  "earningsPie",
  "yearlySalesArea",
  "weeklySalesBar",
  "revenueVsExpenses",
  "salesProfitOverview",
  "salesComparisonArea",
  "productSalesGauge",
  "pipelinePerformanceRadar",
  "marketingReportDonut",
  "profitExpenseBar",
  "employeeSalaryBar",
  "productSalesLine",
  "totalSettlementsArea",
  "revenueForecastBar",
  "revenueForecastLine",
] as const

export type ChartVariant = (typeof chartVariants)[number]

/** Figma preview card widths (px) from Components → Chart */
export const chartWidths = {
  salesPerformanceBar: 926,
  earningsPie: 462,
  yearlySalesArea: 926,
  weeklySalesBar: 462,
  revenueVsExpenses: 926,
  salesProfitOverview: 926,
  salesComparisonArea: 926,
  productSalesGauge: 462,
  pipelinePerformanceRadar: 926,
  marketingReportDonut: 542,
  profitExpenseBar: 926,
  employeeSalaryBar: 462,
  productSalesLine: 462,
  totalSettlementsArea: 462,
  revenueForecastBar: 926,
  revenueForecastLine: 806,
} as const satisfies Record<ChartVariant, number>

export const chartMeta: Record<
  ChartVariant,
  {
    title: string
    figmaSection: string
    figmaNodeId: string
    description: string
    width: number
  }
> = {
  salesPerformanceBar: {
    title: "Sales Performance Bar Chart",
    figmaSection: "Sales Performance Bar Chart",
    figmaNodeId: "16:17973",
    width: chartWidths.salesPerformanceBar,
    description:
      "A stacked monthly sales overview chart comparing earning, profit, and expense with year-over-year growth, ideal for dashboards that need a compact yearly performance snapshot. Bar colors follow the Storybook Color theme (--chart-1 expense, --chart-2 profit, --chart-3 earning).",
  },
  earningsPie: {
    title: "Earnings Pie Chart",
    figmaSection: "Earnings Pie Chart - Donut with Text",
    figmaNodeId: "16:18173",
    width: chartWidths.earningsPie,
    description:
      "A compact earnings-source donut with a centered total and a source-by-source summary of value and period change.",
  },
  yearlySalesArea: {
    title: "Yearly Sales Comparison",
    figmaSection: "Area Chart Gradient - Yearly Sales Comparison",
    figmaNodeId: "16:18233",
    width: chartWidths.yearlySalesArea,
    description:
      "A year-over-year sales comparison with headline totals and two gradient area series across the calendar year.",
  },
  weeklySalesBar: {
    title: "Weekly Sales",
    figmaSection: "Bar Chart - Weekly Sales",
    figmaNodeId: "16:18321",
    width: chartWidths.weeklySalesBar,
    description:
      "A compact last-seven-days sales summary with a highlighted day and vertical bar comparison.",
  },
  revenueVsExpenses: {
    title: "Revenue vs Expenses",
    figmaSection: "Bar Chart - Revenue vs Expenses",
    figmaNodeId: "16:18389",
    width: chartWidths.revenueVsExpenses,
    description:
      "A diverging daily earnings-versus-expenses bar chart with a selected period and monthly earnings summary.",
  },
  salesProfitOverview: {
    title: "Sales & Profit Overview",
    figmaSection: "Line Chart - Sales & Profit Overview",
    figmaNodeId: "16:18618",
    width: chartWidths.salesProfitOverview,
    description:
      "A yearly sales trend with selectable Orders and Expenses views, paired with a compact four-metric performance summary.",
  },
  salesComparisonArea: {
    title: "Sales Comparison Area Chart",
    figmaSection: "Sales Comparison Area Chart",
    figmaNodeId: "16:19459",
    width: chartWidths.salesComparisonArea,
    description:
      "An online-versus-offline sales summary with a yearly comparison selector, pale daily volume bars, and a smooth sales trend line.",
  },
  productSalesGauge: {
    title: "Product Sales Performance Gauge Chart",
    figmaSection: "Product Sales Performance Gauge Chart",
    figmaNodeId: "16:18806",
    width: chartWidths.productSalesGauge,
    description:
      "A compact product-sales gauge with a half-donut performance breakdown, best-seller status, and product mix legend.",
  },
  pipelinePerformanceRadar: {
    title: "Pipeline Performance Radar Chart",
    figmaSection: "Pipeline Performance Radar Chart",
    figmaNodeId: "16:18527",
    width: chartWidths.pipelinePerformanceRadar,
    description:
      "A six-month pipeline radar with an opportunities callout and conversion, win-rate, and churn-rate indicators.",
  },
  marketingReportDonut: {
    title: "Marketing Report Donut Chart",
    figmaSection: "Marketing Report Donut Chart",
    figmaNodeId: "16:18728",
    width: chartWidths.marketingReportDonut,
    description:
      "A marketing acquisition snapshot showing Google Ads, referrals, and organic performance alongside a total-source donut and learning callout.",
  },
  profitExpenseBar: {
    title: "Profit & Expense Bar Chart",
    figmaSection: "Profit & Expense Bar Chart",
    figmaNodeId: "16:18873",
    width: chartWidths.profitExpenseBar,
    description:
      "A monthly profit-and-earnings bar overview paired with yearly earnings, profit, and overall-earnings summaries.",
  },
  employeeSalaryBar: {
    title: "Profit & Expense Bar Chart 2",
    figmaSection: "Profit & Expense Bar Chart 2",
    figmaNodeId: "16:19645",
    width: chartWidths.employeeSalaryBar,
    description:
      "A compact monthly employee-salary bar chart with a highlighted pay period and total sales and expenses summary.",
  },
  productSalesLine: {
    title: "Product Sales Line Chart",
    figmaSection: "Product Sales Line Chart",
    figmaNodeId: "16:19824",
    width: chartWidths.productSalesLine,
    description:
      "A compact multi-year product-sales trend, compared with the previous period and paired with a new-customer summary.",
  },
  totalSettlementsArea: {
    title: "Total Settlements Area Chart",
    figmaSection: "Total Settlements Area Chart",
    figmaNodeId: "16:19309",
    width: chartWidths.totalSettlementsArea,
    description:
      "A total-settlements area trend across fifteen weeks with total balance and withdrawals shown in the card footer.",
  },
  revenueForecastBar: { title: "Revenue Forecast Bar Chart", figmaSection: "Bar Chart - Revenue Forecast", figmaNodeId: "16:19030", width: chartWidths.revenueForecastBar, description: "A monthly revenue forecast comparing 2025 gains with 2026 projected losses, followed by total, profit, and earnings metrics." },
  revenueForecastLine: { title: "Revenue Forecast Line Chart", figmaSection: "Revenue Forecast Line Chart", figmaNodeId: "16:19208", width: chartWidths.revenueForecastLine, description: "A three-year revenue forecast area comparison." },
}

export type ChartProps = {
  variant: ChartVariant
  className?: string
}

export function Chart({ variant, className }: ChartProps) {
  switch (variant) {
    case "salesPerformanceBar":
      return <SalesPerformanceBarChart className={className} />
    case "earningsPie":
      return <EarningsPieChart className={className} />
    case "yearlySalesArea":
      return <YearlySalesAreaChart className={className} />
    case "weeklySalesBar":
      return <WeeklySalesBarChart className={className} />
    case "revenueVsExpenses":
      return <RevenueVsExpensesChart className={className} />
    case "salesProfitOverview":
      return <SalesProfitOverviewChart className={className} />
    case "salesComparisonArea":
      return <SalesComparisonAreaChart className={className} />
    case "productSalesGauge":
      return <ProductSalesGaugeChart className={className} />
    case "pipelinePerformanceRadar":
      return <PipelinePerformanceRadarChart className={className} />
    case "marketingReportDonut":
      return <MarketingReportDonutChart className={className} />
    case "profitExpenseBar":
      return <ProfitExpenseBarChart className={className} />
    case "employeeSalaryBar":
      return <EmployeeSalaryBarChart className={className} />
    case "productSalesLine":
      return <ProductSalesLineChart className={className} />
    case "totalSettlementsArea":
      return <TotalSettlementsAreaChart className={className} />
    case "revenueForecastBar":
      return <RevenueForecastBarChart className={className} />
    case "revenueForecastLine": return <RevenueForecastLineChart className={className} />
    default: {
      const _exhaustive: never = variant
      return _exhaustive
    }
  }
}

export default Chart
