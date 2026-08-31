"use client"

import { Cell, Pie, PieChart } from "recharts"

import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { cn } from "@/lib/utils"

const earningsData = [
  {
    source: "website",
    label: "Website",
    value: 18356,
    displayValue: "$18,356",
    change: "+4.7%",
    color: "var(--chart-1)",
  },
  {
    source: "marketplace",
    label: "Marketplace",
    value: 4590,
    displayValue: "$4,590",
    change: "+2.1%",
    color: "var(--chart-2)",
  },
  {
    source: "affiliate",
    label: "Affiliate",
    value: 4385,
    displayValue: "$4,385",
    change: "-1.7%",
    color: "var(--chart-3)",
  },
] as const

const chartConfig = Object.fromEntries(
  earningsData.map((item) => [
    item.source,
    { label: item.label, color: item.color },
  ])
) satisfies ChartConfig

/** Donut chart breakdown for revenue sources, based on Figma Components → Chart. */
export function EarningsPieChart({ className }: { className?: string }) {
  return (
    <section
      data-slot="earnings-pie-chart"
      className={cn(
        "w-full rounded-xl bg-card text-card-foreground shadow-sm ring-1 ring-foreground/10",
        className
      )}
      style={{ height: "502px", padding: "32px 28px" }}
      aria-labelledby="earnings-pie-chart-title"
    >
      <h2
        id="earnings-pie-chart-title"
        className="text-xl leading-6 font-semibold text-foreground"
      >
        Earning Reports
      </h2>

      <div
        className="relative mx-auto"
        style={{ width: "212px", height: "212px", marginTop: "32px" }}
      >
        <ChartContainer
          config={chartConfig}
          className="w-full"
          style={{ width: "212px", height: "212px", aspectRatio: "auto" }}
          initialDimension={{ width: 212, height: 212 }}
        >
          <PieChart>
            <Pie
              data={earningsData}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy="50%"
              innerRadius={76}
              outerRadius={106}
              startAngle={90}
              endAngle={-270}
              stroke="none"
              isAnimationActive={false}
            >
              {earningsData.map((item) => (
                <Cell key={item.source} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <div
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
          aria-hidden
        >
          <span className="text-base leading-5 text-muted-foreground">Total</span>
          <strong className="text-2xl leading-7 font-semibold text-foreground">
            $27,850
          </strong>
        </div>
      </div>

      <ul
        className="m-0 flex list-none flex-col p-0"
        style={{ marginTop: "64px", gap: "12px" }}
        aria-label="Earning report breakdown"
      >
        {earningsData.map((item) => (
          <li
            key={item.source}
            className="flex items-center"
            style={{ minHeight: "24px" }}
          >
            <span
              className="shrink-0 rounded-full"
              style={{
                width: "4px",
                height: "19px",
                backgroundColor: item.color,
              }}
              aria-hidden
            />
            <span className="ml-3 text-base leading-5 text-foreground">
              {item.label}
            </span>
            <span className="ml-auto text-base leading-5 font-semibold text-foreground tabular-nums">
              {item.displayValue}
            </span>
            <span
              className="ml-3 inline-flex items-center justify-center rounded-full bg-success-muted text-xs leading-5 font-medium text-success tabular-nums"
              style={{ minWidth: "62px", height: "24px" }}
            >
              {item.change}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default EarningsPieChart
