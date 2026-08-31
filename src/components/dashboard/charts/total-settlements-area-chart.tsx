"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { TrendingUp } from "lucide-react"

import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { cn } from "@/lib/utils"

const settlementData = [
  { week: "", value: 35 },
  { week: "3W", value: 68 },
  { week: "", value: 68 },
  { week: "5W", value: 24 },
  { week: "", value: 24 },
  { week: "7W", value: 12 },
  { week: "", value: 12 },
  { week: "9W", value: 24 },
  { week: "", value: 24 },
  { week: "11W", value: 82 },
  { week: "", value: 82 },
  { week: "13W", value: 12 },
  { week: "", value: 12 },
  { week: "15W", value: 100 },
  { week: "", value: 100 },
] as const

const chartConfig = {
  settlements: { label: "Settlements", color: "var(--chart-1)" },
} satisfies ChartConfig

/** Total settlements trend card based on Figma Components → Chart. */
export function TotalSettlementsAreaChart({ className }: { className?: string }) {
  return (
    <section
      data-slot="total-settlements-area-chart"
      className={cn(
        "w-full overflow-hidden rounded-xl text-card-foreground shadow-sm ring-1 ring-foreground/10",
        className
      )}
      style={{
        height: "566px",
        paddingTop: "30px",
        backgroundColor: "color-mix(in oklab, var(--chart-1) 10%, var(--background))",
      }}
      aria-labelledby="total-settlements-area-chart-title"
    >
      <header className="flex items-center" style={{ padding: "0 30px", gap: "20px" }}>
        <span
          className="flex shrink-0 items-center justify-center rounded-xl"
          style={{
            width: "58px",
            height: "58px",
            color: "var(--chart-1)",
            backgroundColor: "color-mix(in oklab, var(--chart-1) 16%, var(--background))",
          }}
          aria-hidden
        >
          <TrendingUp style={{ width: "29px", height: "29px" }} />
        </span>
        <div>
          <p className="m-0 text-base leading-5 text-muted-foreground">Total settlements</p>
          <h2
            id="total-settlements-area-chart-title"
            className="m-0 text-2xl leading-7 font-semibold text-foreground tabular-nums"
          >
            $122,580
          </h2>
        </div>
      </header>

      <ChartContainer
        config={chartConfig}
        className="w-full"
        style={{ height: "288px", aspectRatio: "auto", marginTop: "44px", padding: "0 30px" }}
        initialDimension={{ width: 402, height: 288 }}
      >
        <AreaChart
          accessibilityLayer
          data={settlementData}
          margin={{ top: 0, right: 0, left: 0, bottom: 12 }}
        >
          <CartesianGrid
            vertical={false}
            stroke="var(--chart-1)"
            strokeOpacity={0.25}
            strokeDasharray="4 4"
          />
          <XAxis
            dataKey="week"
            axisLine={false}
            tickLine={false}
            tickMargin={15}
            interval={0}
            fontSize={14}
          />
          <YAxis domain={[0, 100]} hide />
          <Area
            type="monotone"
            dataKey="value"
            stroke="var(--color-settlements)"
            strokeWidth={3.5}
            fill="var(--color-settlements)"
            fillOpacity={0.12}
            dot={false}
            activeDot={false}
            isAnimationActive={false}
          />
        </AreaChart>
      </ChartContainer>

      <footer
        className="flex items-center"
        style={{
          height: "117px",
          marginTop: "29px",
          padding: "29px 30px",
          gap: "38px",
          backgroundColor: "color-mix(in oklab, var(--muted) 62%, var(--background))",
        }}
      >
        <SettlementMetric label="Total balance" value="$122,580" />
        <SettlementMetric label="Withdrawals" value="$31,640" />
      </footer>
    </section>
  )
}

function SettlementMetric({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ minWidth: "102px" }}>
      <p className="m-0 text-base leading-5 text-muted-foreground">{label}</p>
      <strong className="block text-2xl leading-7 font-semibold text-foreground tabular-nums">
        {value}
      </strong>
    </div>
  )
}

export default TotalSettlementsAreaChart
