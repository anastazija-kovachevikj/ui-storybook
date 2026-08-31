"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const INDIA_COLOR = "var(--primary)"
const USA_COLOR = "var(--chart-5)"

const data = [
  { month: "Jan", usa: 78, india: 34 },
  { month: "Feb", usa: 128, india: 84 },
  { month: "Mar", usa: 100, india: 50 },
  { month: "Apr", usa: 31, india: 80 },
  { month: "May", usa: 88, india: 55 },
  { month: "Jun", usa: 90, india: 59 },
]

export function SalesFromLocations({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "w-full gap-5 rounded-xl border-0 bg-card py-6 shadow-none ring-1 ring-foreground/10",
        className
      )}
    >
      <CardHeader className="gap-1 space-y-0 px-6 pb-0">
        <CardTitle className="text-lg font-semibold leading-7 text-foreground">
          Sales from Locations
        </CardTitle>
        <p className="text-sm font-medium leading-5 text-muted-foreground">
          This Year
        </p>
      </CardHeader>
      <CardContent className="flex flex-col px-6 pt-0">
        <div className="h-[268px] w-full min-h-[268px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 8, right: 4, left: 4, bottom: 0 }}
              barCategoryGap="32%"
            >
              <CartesianGrid
                vertical={false}
                strokeDasharray="4 4"
                stroke="color-mix(in oklab, var(--foreground) 8%, transparent)"
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                dy={8}
              />
              <YAxis hide domain={[0, 230]} />
              <Tooltip
                cursor={{ fill: "transparent" }}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid var(--border)",
                  fontSize: 12,
                }}
              />
              <Bar
                dataKey="usa"
                name="USA"
                stackId="location"
                fill={USA_COLOR}
                radius={[8, 8, 8, 8]}
                barSize={16}
              />
              <Bar
                dataKey="india"
                name="India"
                stackId="location"
                fill={INDIA_COLOR}
                radius={[8, 8, 8, 8]}
                barSize={16}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-4 pt-3">
          <span className="inline-flex items-center gap-1.5 text-xs text-foreground">
            <span
              className="size-2 shrink-0 rounded-[2px]"
              style={{ backgroundColor: INDIA_COLOR }}
            />
            India
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-foreground">
            <span
              className="size-2 shrink-0 rounded-[2px]"
              style={{ backgroundColor: USA_COLOR }}
            />
            USA
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

export default SalesFromLocations
