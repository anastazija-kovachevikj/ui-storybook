"use client"

import { ChartLine, TrendingUp } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const MONTHLY_BARS = [
  { back: 50, front: 17 },
  { back: 83, front: 50 },
  { back: 58, front: 42 },
  { back: 42, front: 25 },
]

function TotalSalesSparkline() {
  return (
    <svg
      viewBox="0 0 156 112"
      fill="none"
      className="block size-full max-w-none text-primary"
      aria-hidden
    >
      <path
        d="M0 105c1.857-.745 3.714-1.491 5.571-1.4 1.858.091 3.715 1.018 5.572 0 1.857-1.018 3.714-3.981 5.571-4.2 1.857-.219 3.715 2.306 5.572 2.1 1.857-.206 3.714-3.142 5.57-3.5 1.857-.358 3.714 1.862 5.572 1.4 1.857-.462 3.714-3.605 5.571-4.9 1.857-1.295 3.714-.742 5.57-2.1 1.858-1.358 3.715-4.625 5.572-4.9 1.857-.275 3.714 2.443 5.571 2.1 1.857-.343 3.715-3.748 5.572-5.6 1.857-1.852 3.714-2.15 5.57-1.4 1.857.75 3.714 2.547 5.572 1.4 1.857-1.147 3.714-5.237 5.571-5.6 1.857-.363 3.714 3 5.57 2.1 1.858-.9 3.715-6.063 5.572-7 1.857-.937 3.714 2.352 5.571 2.1 1.857-.252 3.715-4.046 5.571-4.2 1.857-.154 3.714 3.333 5.571 2.1 1.857-1.233 3.714-7.186 5.572-9.1 1.856-1.913 3.713.213 5.57 2.1 1.857 1.887 3.714 3.534 5.571 3.5 1.858-.034 3.714-1.748 5.571-3.5 1.857-1.752 3.714-3.54 5.571-3.5 1.857.04 3.715 1.909 5.572 1.4 1.856-.509 3.713-3.395 5.57-2.8 1.857.595 3.714 4.67 5.572 4.9 1.857.23 3.713-3.385 5.57-7"
        className="text-foreground"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.1"
      />
      <path
        d="M0 101.5c1.857-1.515 3.714-3.03 5.571-3.5 1.858-.469 3.715.107 5.572-1.4 1.857-1.507 3.714-5.099 5.571-5.6 1.857-.501 3.715 2.089 5.572 1.4 1.857-.689 3.714-4.658 5.57-4.9 1.857-.242 3.714 3.244 5.572 2.1 1.857-1.144 3.714-6.918 5.571-9.1 1.857-2.181 3.714-.77 5.57-3.5 1.858-2.73 3.715-9.6 5.572-10.5 1.857-.899 3.714 4.175 5.571 3.5 1.857-.675 3.715-7.097 5.572-10.5 1.857-3.403 3.714-3.786 5.57-3.5 1.857.286 3.714 1.241 5.572-1.4 1.857-2.641 3.714-8.877 5.571-9.1 1.857-.222 3.714 5.571 5.57 3.5 1.858-2.071 3.715-12.004 5.572-14 1.857-1.995 3.714 3.948 5.571 3.5 1.857-.448 3.715-7.286 5.571-7 1.857.286 3.714 7.695 5.571 4.9 1.857-2.795 3.714-15.792 5.572-18.9 1.856-3.107 3.713 3.676 5.57 4.9 1.857 1.224 3.714-3.111 5.571-1.4 1.858 1.711 3.714 9.468 5.571 7 1.857-2.469 3.714-15.163 5.571-17.5 1.857-2.336 3.715 5.687 5.572 7 1.856 1.312 3.713-4.089 5.57-3.5 1.857.589 3.714 7.168 5.572 7 1.857-.168 3.713-7.083 5.57-14V112H0V101.5Z"
        fill="currentColor"
        fillOpacity="0.12"
      />
      <path
        d="M0 101.5c1.857-1.515 3.714-3.03 5.571-3.5 1.858-.469 3.715.107 5.572-1.4 1.857-1.507 3.714-5.099 5.571-5.6 1.857-.501 3.715 2.089 5.572 1.4 1.857-.689 3.714-4.658 5.57-4.9 1.857-.242 3.714 3.244 5.572 2.1 1.857-1.144 3.714-6.918 5.571-9.1 1.857-2.181 3.714-.77 5.57-3.5 1.858-2.73 3.715-9.6 5.572-10.5 1.857-.899 3.714 4.175 5.571 3.5 1.857-.675 3.715-7.097 5.572-10.5 1.857-3.403 3.714-3.786 5.57-3.5 1.857.286 3.714 1.241 5.572-1.4 1.857-2.641 3.714-8.877 5.571-9.1 1.857-.222 3.714 5.571 5.57 3.5 1.858-2.071 3.715-12.004 5.572-14 1.857-1.995 3.714 3.948 5.571 3.5 1.857-.448 3.715-7.286 5.571-7 1.857.286 3.714 7.695 5.571 4.9 1.857-2.795 3.714-15.792 5.572-18.9 1.856-3.107 3.713 3.676 5.57 4.9 1.857 1.224 3.714-3.111 5.571-1.4 1.858 1.711 3.714 9.468 5.571 7 1.857-2.469 3.714-15.163 5.571-17.5 1.857-2.336 3.715 5.687 5.572 7 1.856 1.312 3.713-4.089 5.57-3.5 1.857.589 3.714 7.168 5.572 7 1.857-.168 3.713-7.083 5.57-14"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  )
}

export function RevenueSalesMetrics({ className }: { className?: string }) {
  return (
    <div className={cn("flex w-full items-stretch gap-6", className)}>
      <Card
        className={cn(
          "min-w-0 flex-1 overflow-hidden rounded-xl border bg-card py-6 shadow-xs",
          "ring-0"
        )}
      >
        <CardContent className="flex min-h-[138px] items-end gap-6 px-6">
          <div className="flex min-w-0 flex-1 flex-col gap-8">
            <div>
              <p className="text-sm text-muted-foreground">Total Sales</p>
              <p className="text-base font-semibold text-foreground">
                WrapPixel Store
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-2xl font-semibold tracking-tight text-foreground">
                $98,452.76
              </p>
              <div className="flex items-center gap-1.5">
                <div className="flex size-5 items-center justify-center rounded-full bg-success/10 p-1">
                  <TrendingUp className="size-3 text-success" aria-hidden />
                </div>
                <p className="text-xs text-success">+32.8%</p>
              </div>
            </div>
          </div>
          <div
            className="relative h-[96px] w-[140px] shrink-0 overflow-clip"
            aria-hidden
          >
            <TotalSalesSparkline />
          </div>
        </CardContent>
      </Card>

      <Card
        className={cn(
          "min-w-0 flex-1 overflow-hidden rounded-xl border-0 bg-primary py-6 text-primary-foreground shadow-xs",
          "ring-0"
        )}
      >
        <CardContent className="flex min-h-[138px] flex-col justify-between px-6">
          <p className="text-lg font-semibold text-primary-foreground">Monthly Sales</p>
          <div className="flex items-end justify-between gap-4">
            <div className="flex flex-col gap-1.5">
              <p className="text-2xl font-semibold text-primary-foreground">$36,890</p>
              <div className="flex items-center gap-2">
                <p className="text-sm text-primary-foreground/50">vs last month</p>
                <span className="inline-flex h-5 items-center gap-1 overflow-clip rounded-full bg-background px-2 py-0">
                  <TrendingUp className="size-3 text-foreground" aria-hidden />
                  <span className="text-xs font-medium text-foreground">
                    +18.4%
                  </span>
                </span>
              </div>
            </div>
            <div
              className="flex h-20 w-20 shrink-0 items-end justify-end gap-1.5"
              aria-hidden
            >
              {MONTHLY_BARS.map((bar, index) => (
                <div key={index} className="relative h-full w-2">
                  <div
                    className="absolute bottom-0 w-full rounded-full bg-primary-foreground/20"
                    style={{ height: `${bar.back}%` }}
                  />
                  <div
                    className="absolute bottom-0 w-full rounded-full bg-primary-foreground/80"
                    style={{ height: `${bar.front}%` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card
        className={cn(
          "min-w-0 flex-1 overflow-hidden rounded-xl border-0 bg-chart-2/20 py-6 shadow-xs",
          "ring-0"
        )}
      >
        <CardContent className="flex min-h-[138px] flex-col justify-between px-6">
          <div className="flex items-start justify-between gap-2">
            <p className="text-lg font-semibold text-foreground">
              Revenue Growth
            </p>
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary p-3">
              <ChartLine
                className="size-4 text-primary-foreground"
                aria-hidden
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-2xl font-semibold tracking-tight text-foreground">
              +24%
            </p>
            <p className="text-sm text-muted-foreground">
              Compared to Last Month
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default RevenueSalesMetrics
