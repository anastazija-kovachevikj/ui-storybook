"use client"

import { Cell, Pie, PieChart } from "recharts"

import { Card, CardContent } from "@/components/ui/card"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { cn } from "@/lib/utils"

const backupData = [
  { year: "2022", value: 38, color: "var(--primary)" },
  { year: "2023", value: 62, color: "color-mix(in oklab, var(--primary) 50%, var(--background))" },
]

const backupChartConfig = {
  year2022: { label: "2022", color: "var(--primary)" },
  year2023: {
    label: "2023",
    color: "color-mix(in oklab, var(--primary) 50%, var(--background))",
  },
} satisfies ChartConfig

/** Yearly backup comparison card based on Figma Statistics 11. */
export function YearlyBackupOverview({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "flex w-[calc(100vw-5rem)] max-w-[1600px] justify-center px-6 py-20",
        className
      )}
      aria-label="Yearly backup overview"
    >
      <Card className="h-[194px] w-full max-w-96 overflow-hidden rounded-xl border bg-card py-6 shadow-none">
        <CardContent className="h-full p-0">
          <div className="flex h-full items-start gap-6 px-6">
            <div className="flex min-w-0 flex-1 flex-col gap-6">
              <h2 className="text-lg font-semibold leading-7 tracking-tight text-foreground">
                Yearly Backup
              </h2>

              <div className="space-y-0.5">
                <p className="text-xl font-semibold leading-7 tracking-tight text-foreground tabular-nums">
                  $36,358
                </p>
                <div className="flex items-center gap-1">
                  <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs leading-4 text-muted-foreground">
                    +9%
                  </span>
                  <span className="text-sm leading-5 text-muted-foreground">last year</span>
                </div>
              </div>

              <ul className="mt-auto flex list-none items-center gap-6 p-0" aria-label="Yearly backup legend">
                {backupData.map((item) => (
                  <li key={item.year} className="flex items-center gap-2 text-sm leading-5 text-muted-foreground">
                    <span
                      className="size-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                      aria-hidden
                    />
                    {item.year}
                  </li>
                ))}
              </ul>
            </div>

            <ChartContainer
              config={backupChartConfig}
              className="mt-2 size-32 shrink-0 aspect-auto"
              initialDimension={{ width: 128, height: 128 }}
            >
              <PieChart>
                <Pie
                  data={backupData}
                  dataKey="value"
                  nameKey="year"
                  cx="50%"
                  cy="50%"
                  innerRadius={37}
                  outerRadius={51}
                  startAngle={90}
                  endAngle={-270}
                  stroke="none"
                  isAnimationActive={false}
                >
                  {backupData.map((item) => (
                    <Cell key={item.year} fill={item.color} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

export default YearlyBackupOverview
