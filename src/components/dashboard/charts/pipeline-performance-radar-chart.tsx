"use client"

import { ChevronDown, Target } from "lucide-react"
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "recharts"

import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { cn } from "@/lib/utils"

const pipelineData = [
  { month: "Jan", benchmark: 100, velocity: 86, growth: 70 },
  { month: "Feb", benchmark: 82, velocity: 76, growth: 96 },
  { month: "Mar", benchmark: 82, velocity: 76, growth: 34 },
  { month: "Apr", benchmark: 100, velocity: 84, growth: 56 },
  { month: "May", benchmark: 84, velocity: 68, growth: 50 },
  { month: "Jun", benchmark: 84, velocity: 68, growth: 62 },
]

const chartConfig = {
  benchmark: { label: "Benchmark", color: "var(--chart-1)" },
  velocity: { label: "Pipeline velocity", color: "var(--primary)" },
  growth: { label: "Growth potential", color: "var(--chart-2)" },
} satisfies ChartConfig

/** Pipeline performance radar chart based on Figma Components → Chart. */
export function PipelinePerformanceRadarChart({
  className,
}: {
  className?: string
}) {
  return (
    <section
      data-slot="pipeline-performance-radar-chart"
      className={cn(
        "w-full rounded-xl bg-card text-card-foreground shadow-sm ring-1 ring-foreground/10",
        className
      )}
      style={{ height: "512px", padding: "30px" }}
      aria-labelledby="pipeline-performance-radar-chart-title"
    >
      <header className="flex items-center justify-between" style={{ gap: "24px" }}>
        <h2
          id="pipeline-performance-radar-chart-title"
          className="text-xl leading-6 font-semibold text-foreground"
        >
          Pipeline Analytics
        </h2>
        <div
          className="flex shrink-0 items-center rounded-lg border border-border bg-background text-sm font-medium text-foreground shadow-sm"
          style={{ height: "42px", padding: "0 12px", gap: "14px" }}
          aria-label="Selected period: March 2026"
        >
          March 2026
          <ChevronDown aria-hidden style={{ width: "16px", height: "16px" }} />
        </div>
      </header>

      <div className="flex" style={{ marginTop: "30px", gap: "30px" }}>
        <ChartContainer
          config={chartConfig}
          className="shrink-0"
          style={{ width: "414px", height: "330px", aspectRatio: "auto" }}
          initialDimension={{ width: 414, height: 330 }}
        >
          <RadarChart
            data={pipelineData}
            cx="50%"
            cy="51%"
            outerRadius="86%"
          >
            <PolarGrid gridType="polygon" stroke="var(--border)" />
            <PolarAngleAxis
              dataKey="month"
              tickLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 14 }}
            />
            <PolarRadiusAxis axisLine={false} tick={false} domain={[0, 100]} />
            <Radar
              dataKey="benchmark"
              stroke="var(--color-benchmark)"
              strokeWidth={1.5}
              fill="var(--color-benchmark)"
              fillOpacity={0.03}
              isAnimationActive={false}
            />
            <Radar
              dataKey="velocity"
              stroke="var(--color-velocity)"
              strokeWidth={1.5}
              fill="var(--color-velocity)"
              fillOpacity={0.15}
              isAnimationActive={false}
            />
            <Radar
              dataKey="growth"
              stroke="var(--color-growth)"
              strokeWidth={1.5}
              fill="var(--color-growth)"
              fillOpacity={0.17}
              isAnimationActive={false}
            />
          </RadarChart>
        </ChartContainer>

        <aside className="min-w-0 flex-1" aria-label="Pipeline summary">
          <div
            className="rounded-2xl bg-primary/10"
            style={{ height: "164px", padding: "24px" }}
          >
            <Target className="text-primary" style={{ width: "28px", height: "28px" }} />
            <h3 className="mt-4 text-2xl leading-7 font-semibold text-foreground">
              Opportunities
            </h3>
            <p className="m-0 mt-3 text-base leading-5 text-muted-foreground">
              Q2 deals show strong growth potential!
            </p>
          </div>

          <div className="flex flex-col" style={{ marginTop: "34px", gap: "24px" }}>
            <PipelineMetric
              color="var(--chart-2)"
              value="22.3%"
              label="Lead Conversion Rate"
            />
            <PipelineMetric
              color="var(--chart-1)"
              value="14.2%"
              label="Opportunity Win Rate"
            />
            <PipelineMetric
              color="var(--warning)"
              value="11.6%"
              label="Churn Rate"
            />
          </div>
        </aside>
      </div>
    </section>
  )
}

function PipelineMetric({
  color,
  value,
  label,
}: {
  color: string
  value: string
  label: string
}) {
  return (
    <div className="flex items-center" style={{ gap: "12px" }}>
      <i
        className="block shrink-0 rounded"
        style={{ width: "14px", height: "14px", backgroundColor: color }}
        aria-hidden
      />
      <strong className="text-lg leading-6 font-semibold text-foreground tabular-nums">
        {value}
      </strong>
      <span className="text-base leading-5 text-muted-foreground">{label}</span>
    </div>
  )
}

export default PipelinePerformanceRadarChart
