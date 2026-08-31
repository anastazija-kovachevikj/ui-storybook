"use client"

import {
  BarChart3,
  Box,
  ShoppingBag,
  Star,
} from "lucide-react"

import { DailyActivities } from "@/components/dashboard/daily-activities"
import { KpiCard } from "@/components/dashboard/kpi-card"
import { SalesReportChart } from "@/components/dashboard/sales-report-chart"
import { TopProjectsTable } from "@/components/dashboard/top-projects-table"
import { WeeklySalesChart } from "@/components/dashboard/weekly-sales-chart"
import EarningReportChart from "@/components/shadcn-space/blocks/dashboard-shell-01/earning-report-chart"
import SalesOverviewChart from "@/components/shadcn-space/blocks/dashboard-shell-01/sales-overview-chart"
import SalesByCountryWidget from "@/components/shadcn-space/blocks/dashboard-shell-01/salesbycountrywidget"
import StatisticsBlock from "@/components/shadcn-space/blocks/dashboard-shell-01/statistics"
import TopProductTable from "@/components/shadcn-space/blocks/dashboard-shell-01/top-product-table"
import { BestSellingProducts } from "@/components/shadcn-space/blocks/dashboard-shell-02/best-selling-products"
import { CampaignPerformance } from "@/components/shadcn-space/blocks/dashboard-shell-02/campaign-performance"
import { TipBanner } from "@/components/shadcn-space/blocks/dashboard-shell-02/tip-banner"
import { EarningsBackupCards } from "@/components/shadcn-space/blocks/dashboard-shell-03/earnings-backup-cards"
import { MetricStatCards } from "@/components/shadcn-space/blocks/dashboard-shell-03/metric-stat-cards"
import { RecentTransactions } from "@/components/shadcn-space/blocks/dashboard-shell-03/recent-transactions"
import { RevenueUpdates } from "@/components/shadcn-space/blocks/dashboard-shell-03/revenue-updates"
import { SalesFromLocations } from "@/components/shadcn-space/blocks/dashboard-shell-03/sales-from-locations"
import { UpcomingSchedules } from "@/components/shadcn-space/blocks/dashboard-shell-03/upcoming-schedules"
import { WeeklyStats } from "@/components/shadcn-space/blocks/dashboard-shell-03/weekly-stats"
import { WelcomeBanner } from "@/components/shadcn-space/blocks/dashboard-shell-03/welcome-banner"
import { AnnualProfit } from "@/components/shadcn-space/blocks/dashboard-shell-04/annual-profit"
import { CongratsBanner } from "@/components/shadcn-space/blocks/dashboard-shell-04/congrats-banner"
import { CustomersProductsCards } from "@/components/shadcn-space/blocks/dashboard-shell-04/customers-products-cards"
import { LatestDeal } from "@/components/shadcn-space/blocks/dashboard-shell-04/latest-deal"
import { LatestReviews } from "@/components/shadcn-space/blocks/dashboard-shell-04/latest-reviews"
import { PaymentsCard } from "@/components/shadcn-space/blocks/dashboard-shell-04/payments-card"
import { ProductsPaymentTable } from "@/components/shadcn-space/blocks/dashboard-shell-04/products-payment-table"
import { TotalSalesChart } from "@/components/shadcn-space/blocks/dashboard-shell-04/total-sales-chart"
import { cn } from "@/lib/utils"

export const dashboardVariants = [
  "analytics",
  "crm",
  "modern",
  "ecommerce",
] as const

export type DashboardVariant = (typeof dashboardVariants)[number]

export type DashboardProps = {
  variant?: DashboardVariant
  className?: string
}

const crmKpis = [
  {
    label: "Orders",
    value: "5868",
    change: "+18%",
    tone: "up" as const,
    icon: ShoppingBag,
  },
  {
    label: "Sales",
    value: "$96,850",
    change: "-5%",
    tone: "down" as const,
    icon: Box,
  },
  {
    label: "Profit",
    value: "$82,906",
    change: "+18%",
    tone: "up" as const,
    icon: BarChart3,
  },
  {
    label: "Expense",
    value: "$14,653",
    change: "+18%",
    tone: "up" as const,
    icon: Star,
  },
]

function AnalyticsMain() {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-12 gap-6 p-6">
      <div className="col-span-12">
        <StatisticsBlock />
      </div>
      <div className="col-span-12 xl:col-span-8">
        <SalesOverviewChart />
      </div>
      <div className="col-span-12 xl:col-span-4">
        <EarningReportChart />
      </div>
      <div className="col-span-12 xl:col-span-8">
        <TopProductTable />
      </div>
      <div className="col-span-12 xl:col-span-4">
        <SalesByCountryWidget />
      </div>
    </div>
  )
}

function CrmMain() {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-12 gap-6 p-6">
      <div className="col-span-12 grid grid-cols-2 gap-3 xl:grid-cols-4">
        {crmKpis.map((kpi) => (
          <KpiCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            period="Last 7 days"
            change={kpi.change}
            tone={kpi.tone}
            icon={kpi.icon}
            className="min-w-0 w-full max-w-none"
          />
        ))}
      </div>

      <div className="col-span-12 xl:col-span-8">
        <SalesReportChart />
      </div>
      <div className="col-span-12 xl:col-span-4">
        <WeeklySalesChart className="h-full xl:w-full" />
      </div>

      <div className="col-span-12 md:col-span-6 xl:col-span-4">
        <TipBanner className="h-full" />
      </div>
      <div className="col-span-12 md:col-span-6 xl:col-span-4">
        <CampaignPerformance className="h-full" />
      </div>
      <div className="col-span-12 xl:col-span-4">
        <BestSellingProducts className="h-full" />
      </div>

      <div className="col-span-12 xl:col-span-8">
        <TopProjectsTable variant="crm" />
      </div>
      <div className="col-span-12 xl:col-span-4">
        <DailyActivities className="h-full xl:w-full" />
      </div>
    </div>
  )
}

function ModernMain() {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-12 gap-6 p-6">
      <div className="col-span-12 xl:col-span-5">
        <WelcomeBanner className="h-full" />
      </div>
      <div className="col-span-12 xl:col-span-7">
        <MetricStatCards />
      </div>

      <div className="col-span-12 xl:col-span-8">
        <RevenueUpdates />
      </div>
      <div className="col-span-12 xl:col-span-4">
        <EarningsBackupCards />
      </div>

      <div className="col-span-12 md:col-span-6 xl:col-span-4">
        <WeeklyStats />
      </div>
      <div className="col-span-12 md:col-span-6 xl:col-span-4">
        <SalesFromLocations />
      </div>
      <div className="col-span-12 xl:col-span-4">
        <RecentTransactions />
      </div>

      <div className="col-span-12 xl:col-span-8">
        <TopProjectsTable />
      </div>
      <div className="col-span-12 xl:col-span-4">
        <UpcomingSchedules />
      </div>
    </div>
  )
}

function EcommerceMain() {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-12 gap-6 p-6">
      <div className="col-span-12">
        <CongratsBanner />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <CustomersProductsCards />
      </div>
      <div className="col-span-12 xl:col-span-4">
        <TotalSalesChart />
      </div>
      <div className="col-span-12 xl:col-span-3">
        <LatestDeal />
      </div>

      <div className="col-span-12 xl:col-span-3">
        <PaymentsCard />
      </div>
      <div className="col-span-12 xl:col-span-6">
        <ProductsPaymentTable />
      </div>
      <div className="col-span-12 xl:col-span-3">
        <AnnualProfit />
      </div>

      <div className="col-span-12">
        <LatestReviews />
      </div>
    </div>
  )
}

function DashboardMain({ variant }: { variant: DashboardVariant }) {
  switch (variant) {
    case "analytics":
      return <AnalyticsMain />
    case "crm":
      return <CrmMain />
    case "modern":
      return <ModernMain />
    case "ecommerce":
      return <EcommerceMain />
  }
}

/**
 * ClaimUW Dashboard variants from Figma section 446:7755
 * (Analytics / CRM / Modern / eCommerce). Main content only — no sidebar.
 * Viewport-height host with internal scroll so tall grids are not clipped.
 */
export function Dashboard({
  variant = "analytics",
  className,
}: DashboardProps) {
  return (
    <main
      className={cn(
        // h-svh for app routes; Storybook stories pass h-full to fill the preview host
        "h-svh min-h-0 w-full overflow-y-auto overflow-x-hidden bg-background",
        className
      )}
    >
      <DashboardMain variant={variant} />
    </main>
  )
}

export default Dashboard
