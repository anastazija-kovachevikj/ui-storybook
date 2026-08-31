"use client"

import { MoreVertical, Zap } from "lucide-react"
import { Cell, Pie, PieChart } from "recharts"

import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { cn } from "@/lib/utils"

const salesSegments = [
  { name: "Modernize", value: 36, color: "var(--chart-2)" },
  { name: "Spike", value: 17, color: "var(--chart-1)" },
  {
    name: "Ample",
    value: 22,
    color: "color-mix(in oklab, var(--destructive) 12%, var(--background))",
  },
  { name: "MaterialM", value: 31, color: "var(--muted)" },
  { name: "Performance", value: 14, color: "var(--success)" },
]

const chartConfig = {
  modernize: { label: "Modernize", color: "var(--chart-2)" },
  spike: { label: "Spike", color: "var(--chart-1)" },
  ample: {
    label: "Ample",
    color: "color-mix(in oklab, var(--destructive) 12%, var(--background))",
  },
  materialM: { label: "MaterialM", color: "var(--muted)" },
  performance: { label: "Performance", color: "var(--success)" },
} satisfies ChartConfig

/** Product sales performance gauge based on Figma Components → Chart. */
export function ProductSalesGaugeChart({ className }: { className?: string }) {
  return (
    <section
      data-slot="product-sales-gauge-chart"
      className={cn(
        "w-full rounded-xl bg-card text-card-foreground shadow-sm ring-1 ring-foreground/10",
        className
      )}
      style={{ height: "568px", padding: "30px" }}
      aria-labelledby="product-sales-gauge-chart-title"
    >
      <header className="flex items-center justify-between">
        <h2
          id="product-sales-gauge-chart-title"
          className="text-xl leading-6 font-semibold text-foreground"
        >
          Product Sales
        </h2>
        <MoreVertical aria-label="More product sales options" />
      </header>

      <div className="relative" style={{ height: "196px", marginTop: "16px" }}>
        <ChartContainer
          config={chartConfig}
          className="w-full"
          style={{ height: "196px", aspectRatio: "auto" }}
          initialDimension={{ width: 402, height: 196 }}
        >
          <PieChart>
            <Pie
              data={salesSegments}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="72%"
              startAngle={180}
              endAngle={0}
              innerRadius={84}
              outerRadius={120}
              paddingAngle={0}
              stroke="none"
              isAnimationActive={false}
            >
              {salesSegments.map((segment) => (
                <Cell key={segment.name} fill={segment.color} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <strong
          className="pointer-events-none absolute left-0 right-0 text-center text-4xl leading-10 font-semibold text-foreground tabular-nums"
          style={{ top: "110px" }}
        >
          8364
        </strong>
      </div>

      <div className="flex justify-center" style={{ marginTop: "2px" }}>
        <span className="flex items-center rounded-full bg-success-muted px-3 py-1 text-sm leading-4 font-medium text-success">
          <Zap aria-hidden style={{ width: "16px", height: "16px" }} />
          <span style={{ marginLeft: "4px" }}>Best Seller</span>
        </span>
      </div>

      <div
        className="grid grid-cols-2"
        style={{ margin: "38px 32px 0", columnGap: "20px", rowGap: "14px" }}
      >
        <LegendItem color="var(--chart-2)" label="36% Modernize" />
        <LegendItem color="var(--chart-1)" label="17% Spike" />
        <LegendItem
          color="color-mix(in oklab, var(--destructive) 12%, var(--background))"
          label="22% Ample"
        />
        <LegendItem color="var(--muted)" label="31% MaterialM" />
      </div>

      <p
        className="m-0 border-t border-border text-center text-sm leading-5 text-muted-foreground"
        style={{ marginTop: "42px", paddingTop: "36px" }}
      >
        This is overview of the sales happened this month for the material website
      </p>
    </section>
  )
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center" style={{ gap: "10px" }}>
      <i
        className="block shrink-0 rounded-full"
        style={{ width: "20px", height: "10px", backgroundColor: color }}
        aria-hidden
      />
      <span className="text-base leading-5 text-foreground">{label}</span>
    </span>
  )
}

export default ProductSalesGaugeChart
