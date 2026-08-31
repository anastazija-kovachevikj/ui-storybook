"use client"

import Image from "next/image"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type GaugeLayer = {
  src: string
  width: number
  height: number
  left: number
  top: number
}

const gaugeTracks: GaugeLayer[] = [
  { src: "/dashboard/statistics/sales-overview-track-inner.svg", width: 101, height: 101, left: 46, top: 62 },
  { src: "/dashboard/statistics/sales-overview-track-middle.svg", width: 137, height: 137, left: 27, top: 44 },
  { src: "/dashboard/statistics/sales-overview-track-outer.svg", width: 173, height: 173, left: 9, top: 25 },
]

const gaugeProgress: GaugeLayer[] = [
  { src: "/dashboard/statistics/sales-overview-progress-inner.svg", width: 50, height: 59, left: 96, top: 62 },
  { src: "/dashboard/statistics/sales-overview-progress-middle.svg", width: 137, height: 137, left: 27, top: 44 },
  { src: "/dashboard/statistics/sales-overview-progress-outer.svg", width: 87, height: 171, left: 96, top: 25 },
]

function GaugeLayerImage({ layer }: { layer: GaugeLayer }) {
  return (
    <Image
      src={layer.src}
      alt=""
      width={layer.width}
      height={layer.height}
      unoptimized
      className="absolute"
      style={{ left: layer.left, top: layer.top, width: layer.width, height: layer.height }}
    />
  )
}

/** Sales overview gauge card based on Figma Statistics 14. */
export function SalesOverviewCard({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "flex w-[calc(100vw-5rem)] max-w-[1600px] justify-center px-6 py-20",
        className
      )}
      aria-label="Sales overview"
    >
      <Card className="h-[344px] w-full max-w-72 overflow-hidden rounded-xl border bg-card py-6 shadow-none">
        <CardContent className="h-full p-0">
          <header className="px-6">
            <h2 className="text-lg font-semibold leading-7 tracking-tight text-foreground">Sales Overview</h2>
            <p className="text-sm leading-5 text-muted-foreground">Last 7 days</p>
          </header>

          <div className="relative mx-6 mt-6 h-56" aria-label="Sales percentage gauge">
            <div className="absolute left-6 top-0 size-[192px]" aria-hidden>
              {gaugeTracks.map((layer) => (
                <GaugeLayerImage key={layer.src} layer={layer} />
              ))}
              {gaugeProgress.map((layer) => (
                <GaugeLayerImage key={layer.src} layer={layer} />
              ))}
            </div>
            <span className="absolute left-1/2 top-2 -translate-x-1/2 text-xs leading-4 text-muted-foreground">0%</span>
            <span className="absolute left-[208px] top-[104px] w-8 text-center text-xs leading-4 text-muted-foreground">25%</span>
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs leading-4 text-muted-foreground">50%</span>
            <span className="absolute left-0 top-[104px] w-8 text-center text-xs leading-4 text-muted-foreground">75%</span>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

export default SalesOverviewCard
