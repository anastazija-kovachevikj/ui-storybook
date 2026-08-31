"use client"

import { EllipsisVertical } from "lucide-react"
import Image from "next/image"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const regions = [
  { label: "Asia", color: "var(--primary)" },
  { label: "USA", color: "var(--warning)" },
  { label: "Europe", color: "var(--chart-2)" },
] as const

export function RevenueInsightsCard({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "flex w-[calc(100vw-5rem)] max-w-[1600px] justify-center px-6 py-20",
        className
      )}
      aria-label="Revenue insights"
    >
      <Card className="h-[218px] w-full max-w-96 overflow-hidden rounded-xl border bg-card py-6 shadow-xs">
        <CardContent className="h-full p-0">
          <div className="flex h-full flex-col">
            <header className="flex items-start justify-between px-6">
              <div>
                <h2 className="text-lg font-semibold leading-7 tracking-tight text-foreground">
                  Key Insights
                </h2>
                <div className="mt-4">
                  <p className="text-base leading-6 text-muted-foreground">All-time Revenue</p>
                  <div className="mt-1 flex items-center gap-2">
                    <p className="text-2xl font-medium leading-8 tracking-tight text-foreground tabular-nums">
                      $395.7k
                    </p>
                    <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs leading-4 text-muted-foreground">
                      +2.7%
                    </span>
                  </div>
                </div>
              </div>
              <EllipsisVertical className="mt-1.5 size-3 text-foreground" aria-label="More insight options" />
            </header>

            <div className="mt-6 px-6">
              <div className="flex h-[14px] items-center overflow-hidden" aria-label="Revenue distribution by region">
                <Image
                  src="/dashboard/statistics/revenue-insights-asia.svg"
                  alt=""
                  width={206}
                  height={14}
                  unoptimized
                  className="h-[14px] w-[206px] shrink-0"
                />
                <Image
                  src="/dashboard/statistics/revenue-insights-usa.svg"
                  alt=""
                  width={88}
                  height={14}
                  unoptimized
                  className="-ml-2 h-[14px] w-[88px] shrink-0"
                />
                <Image
                  src="/dashboard/statistics/revenue-insights-europe.svg"
                  alt=""
                  width={54}
                  height={14}
                  unoptimized
                  className="-ml-2 h-[14px] w-[54px] shrink-0"
                />
              </div>
              <ul className="mt-4 flex list-none items-center gap-4 p-0" aria-label="Revenue regions">
                {regions.map((region) => (
                  <li key={region.label} className="flex items-center gap-2 text-xs leading-4 text-foreground">
                    <span
                      className="size-2.5 rounded-full"
                      style={{ backgroundColor: region.color }}
                      aria-hidden
                    />
                    {region.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

export default RevenueInsightsCard
