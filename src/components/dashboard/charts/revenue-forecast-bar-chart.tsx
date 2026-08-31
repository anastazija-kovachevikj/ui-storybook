"use client"

import { Clock3, DollarSign, WalletCards } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { cn } from "@/lib/utils"

const forecastData = [
  { month: "Jan", forecast2025: 1, forecast2026: -4.5 },
  { month: "Feb", forecast2025: 2.5, forecast2026: -1 },
  { month: "Mar", forecast2025: 1.9, forecast2026: -2.3 },
  { month: "Apr", forecast2025: 3.3, forecast2026: -1.3 },
  { month: "May", forecast2025: 1.8, forecast2026: -2.1 },
  { month: "Jun", forecast2025: 2.5, forecast2026: -1.7 },
  { month: "July", forecast2025: 2, forecast2026: -0.9 },
  { month: "Aug", forecast2025: 1, forecast2026: -2 },
  { month: "Sep", forecast2025: 2.3, forecast2026: -1.1 },
  { month: "Oct", forecast2025: 3.4, forecast2026: -3.5 },
  { month: "Nov", forecast2025: 1.6, forecast2026: -2.9 },
  { month: "Dec", forecast2025: 3.3, forecast2026: -1.6 },
] as const

const chartConfig = {
  forecast2025: { label: "2025", color: "var(--chart-2)" },
  forecast2026: { label: "2026", color: "var(--chart-1)" },
} satisfies ChartConfig

type ForecastBarProps = {
  x?: number
  y?: number
  width?: number
  height?: number
  payload?: (typeof forecastData)[number]
}

function DivergingForecastBar({ x = 0, y = 0, width = 0, height = 0, payload }: ForecastBarProps) {
  if (!payload || height <= 0) return null
  const baseline = y + height
  const negativeHeight = (Math.abs(payload.forecast2026) / payload.forecast2025) * height
  return <g>
    <rect x={x} y={y} width={width} height={Math.max(0, height - 3)} rx={8} fill="var(--color-forecast2025)" />
    <rect x={x} y={baseline + 3} width={width} height={Math.max(0, negativeHeight - 3)} rx={8} fill="var(--color-forecast2026)" />
  </g>
}

export function RevenueForecastBarChart({ className }: { className?: string }) {
  return <section data-slot="revenue-forecast-bar-chart" className={cn("w-full rounded-xl bg-card text-card-foreground shadow-sm ring-1 ring-foreground/10", className)} style={{ height: "590px", padding: "30px" }} aria-labelledby="revenue-forecast-bar-chart-title">
    <header className="flex items-center justify-between">
      <div><h2 id="revenue-forecast-bar-chart-title" className="text-xl leading-7 font-semibold text-foreground">Revenue Forecast</h2><p className="m-0 text-base leading-5 text-muted-foreground">Overview of Profit</p></div>
      <div className="flex items-center text-base text-muted-foreground" style={{ gap: "20px" }}><Legend color="var(--chart-2)" label="2025" /><Legend color="var(--chart-1)" label="2026" /></div>
    </header>
    <ChartContainer config={chartConfig} className="w-full" style={{ height: "330px", aspectRatio: "auto", marginTop: "30px" }} initialDimension={{ width: 866, height: 330 }}>
      <BarChart accessibilityLayer data={forecastData} margin={{ top: 8, right: 0, left: 0, bottom: 12 }}>
        <CartesianGrid vertical={false} stroke="var(--border)" />
        <XAxis dataKey="month" axisLine={false} tickLine={false} tickMargin={15} interval={0} fontSize={14} />
        <YAxis domain={[-5, 5]} ticks={[-5, -2.5, 0, 2.5, 5]} tickFormatter={(value) => value.toFixed(1)} axisLine={false} tickLine={false} tickMargin={10} width={36} fontSize={14} />
        <Bar dataKey="forecast2025" shape={(props) => <DivergingForecastBar {...(props as ForecastBarProps)} />} barSize={16} isAnimationActive={false} />
      </BarChart>
    </ChartContainer>
    <footer className="grid grid-cols-3" style={{ marginTop: "20px", gap: "32px" }}>
      <ForecastMetric icon={<Clock3 />} label="Total" value="$96,640" color="var(--foreground)" neutral />
      <ForecastMetric icon={<DollarSign />} label="Profit" value="$48,820" color="var(--chart-2)" />
      <ForecastMetric icon={<WalletCards />} label="Earnings" value="$48,820" color="var(--chart-1)" />
    </footer>
  </section>
}

function Legend({ color, label }: { color: string; label: string }) { return <span className="flex items-center" style={{ gap: "7px" }}><i className="size-2 rounded-full" style={{ backgroundColor: color }} />{label}</span> }
function ForecastMetric({ icon, label, value, color, neutral = false }: { icon: React.ReactNode; label: string; value: string; color: string; neutral?: boolean }) { return <div className="flex items-center" style={{ gap: "14px" }}><span className="flex shrink-0 items-center justify-center rounded-xl" style={{ width: "54px", height: "54px", color, backgroundColor: neutral ? "var(--muted)" : `color-mix(in oklab, ${color} 11%, var(--background))` }} aria-hidden>{icon}</span><span><span className="block text-base leading-5 text-muted-foreground">{label}</span><strong className="block text-xl leading-7 font-semibold text-foreground tabular-nums">{value}</strong></span></div> }
export default RevenueForecastBarChart
