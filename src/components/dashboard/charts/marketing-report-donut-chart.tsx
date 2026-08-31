"use client"

import { Lightbulb, MoreVertical, PieChart, Play, TrendingUp, UserRoundPlus } from "lucide-react"
import { Cell, Label, Pie, PieChart as RechartsPieChart } from "recharts"

import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { cn } from "@/lib/utils"

const marketingSources = [
  {
    name: "Organic",
    value: 12,
    color: "color-mix(in oklab, var(--destructive) 18%, var(--background))",
  },
  { name: "Google Ads", value: 68, color: "var(--chart-1)" },
  { name: "Referral", value: 20, color: "var(--chart-2)" },
]

const chartConfig = {
  googleAds: { label: "Google Ads", color: "var(--chart-1)" },
  referral: { label: "Referral", color: "var(--chart-2)" },
  organic: {
    label: "Organic",
    color: "color-mix(in oklab, var(--destructive) 18%, var(--background))",
  },
} satisfies ChartConfig

/** Marketing acquisition report based on Figma Components → Chart. */
export function MarketingReportDonutChart({ className }: { className?: string }) {
  return (
    <section
      data-slot="marketing-report-donut-chart"
      className={cn(
        "w-full rounded-xl bg-card text-card-foreground shadow-sm ring-1 ring-foreground/10",
        className
      )}
      style={{ height: "494px", padding: "30px" }}
      aria-labelledby="marketing-report-donut-chart-title"
    >
      <header className="flex items-center justify-between">
        <h2
          id="marketing-report-donut-chart-title"
          className="text-xl leading-6 font-semibold text-foreground"
        >
          Marketing Report
        </h2>
        <MoreVertical aria-label="More marketing report options" />
      </header>

      <div className="flex items-center" style={{ marginTop: "28px", gap: "20px" }}>
        <div className="flex shrink-0 flex-col" style={{ width: "196px", gap: "24px" }}>
          <MarketingMetric
            icon={<TrendingUp />}
            color="var(--destructive)"
            label="Google Ads"
            value="+2.9k"
          />
          <MarketingMetric
            icon={<UserRoundPlus />}
            color="var(--chart-2)"
            label="Referral"
            value="1.22"
          />
          <MarketingMetric
            icon={<PieChart />}
            color="var(--chart-1)"
            label="Organic"
            value="0.83"
          />
        </div>

        <ChartContainer
          config={chartConfig}
          className="min-w-0 flex-1"
          style={{ height: "206px", aspectRatio: "auto" }}
          initialDimension={{ width: 228, height: 206 }}
        >
          <RechartsPieChart>
            <Pie
              data={marketingSources}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={66}
              outerRadius={100}
              startAngle={110}
              endAngle={-250}
              paddingAngle={0}
              stroke="none"
              isAnimationActive={false}
            >
              {marketingSources.map((source) => (
                <Cell key={source.name} fill={source.color} />
              ))}
              <Label
                value="24.3k"
                position="center"
                className="fill-foreground text-2xl font-semibold"
              />
            </Pie>
          </RechartsPieChart>
        </ChartContainer>
      </div>

      <div
        className="flex items-center justify-between rounded-xl"
        style={{
          marginTop: "90px",
          height: "86px",
          padding: "16px 20px",
          backgroundColor: "color-mix(in oklab, var(--chart-2) 11%, var(--background))",
        }}
      >
        <div className="flex items-center" style={{ gap: "14px" }}>
          <Lightbulb className="shrink-0 text-primary" style={{ width: "28px", height: "28px" }} />
          <p className="m-0 max-w-60 text-base leading-5 text-muted-foreground">
            Learn insigs how to manage all aspects of your startup.
          </p>
        </div>
        <span
          className="flex shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
          style={{ width: "48px", height: "48px" }}
          aria-hidden
        >
          <Play fill="currentColor" style={{ width: "20px", height: "20px" }} />
        </span>
      </div>
    </section>
  )
}

function MarketingMetric({
  icon,
  color,
  label,
  value,
}: {
  icon: React.ReactNode
  color: string
  label: string
  value: string
}) {
  return (
    <div className="flex items-center" style={{ gap: "14px" }}>
      <span
        className="flex shrink-0 items-center justify-center rounded-full"
        style={{
          width: "56px",
          height: "40px",
          color,
          backgroundColor: `color-mix(in oklab, ${color} 11%, var(--background))`,
        }}
        aria-hidden
      >
        {icon}
      </span>
      <span>
        <span className="block text-base leading-5 text-muted-foreground">{label}</span>
        <strong className="mt-1 block text-2xl leading-7 font-semibold text-foreground tabular-nums">
          {value}
        </strong>
      </span>
    </div>
  )
}

export default MarketingReportDonutChart
