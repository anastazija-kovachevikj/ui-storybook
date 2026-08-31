"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemedSvg } from "@/components/ui/themed-svg"
import { cn } from "@/lib/utils"

type ScheduleStatus = "Delivered" | "Shipping"

const schedules = [
  {
    title: "Scooter Freight",
    id: "#9002-125423",
    status: "Delivered" as ScheduleStatus,
    iconSrc: "/dashboard/widgets/schedule-scooter.svg",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    from: "Messina Harbor",
    fromCity: "Sicily, Italy",
    to: "Hektor Container Hotel",
    toCity: "Tallin, EST",
  },
  {
    title: "Tram Freight",
    id: "#1245-780652",
    status: "Shipping" as ScheduleStatus,
    iconSrc: "/dashboard/widgets/schedule-tram.svg",
    iconBg: "bg-chart-2/10",
    iconColor: "text-chart-2",
    from: "Messina Harbor",
    fromCity: "Lester, United Kingdom",
    to: "Laxmi Empire Hotel",
    toCity: "Mumbai, India",
  },
]

const tabs = ["All", "Delivered", "Shipping"] as const

export function UpcomingSchedules({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("All")

  const visible = schedules.filter(
    (item) => activeTab === "All" || item.status === activeTab
  )

  return (
    <Card
      className={cn(
        "w-full gap-6 rounded-xl border-0 bg-card py-6 shadow-none ring-1 ring-foreground/10",
        className
      )}
    >
      <CardHeader className="flex flex-row items-start justify-between gap-1 space-y-0 px-6 pb-0">
        <div className="min-w-0">
          <CardTitle className="text-lg font-medium leading-7 text-foreground">
            Upcoming Schedules
          </CardTitle>
          <p className="text-sm leading-5 text-muted-foreground">
            Our corporate events
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-8 shrink-0 rounded-full hover:bg-transparent"
          aria-label="More options"
        >
          <ThemedSvg
            src="/dashboard/widgets/schedule-more.svg"
            className="size-4 text-foreground"
          />
        </Button>
      </CardHeader>

      <CardContent className="flex flex-col gap-2 px-6 pt-0">
        <div
          role="tablist"
          className="flex w-full items-center rounded-lg bg-muted p-[3px]"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "flex-1 rounded-md px-1.5 py-0.5 text-center text-base font-medium leading-6 transition-colors",
                  isActive
                    ? "bg-background text-foreground shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_rgba(0,0,0,0.1)]"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab}
              </button>
            )
          })}
        </div>

        <div role="tabpanel" className="flex flex-col pt-4">
          {visible.map((item, index) => (
            <div
              key={item.id}
              className={cn(
                "flex flex-col gap-2",
                index < visible.length - 1 && "border-b border-border pb-4",
                index > 0 && "pt-6"
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className={cn(
                      "flex shrink-0 items-center justify-center rounded-xl p-3",
                      item.iconBg
                    )}
                  >
                    <ThemedSvg
                      src={item.iconSrc}
                      className={cn("size-4", item.iconColor)}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm leading-5 text-muted-foreground">
                      {item.title}
                    </p>
                    <p className="truncate text-sm font-semibold leading-5 text-foreground">
                      {item.id}
                    </p>
                  </div>
                </div>
                <span className="inline-flex h-5 shrink-0 items-center rounded-full bg-chart-5/10 px-2 text-xs font-medium text-muted-foreground">
                  {item.status}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex shrink-0 items-center justify-center rounded-xl border border-border p-3">
                  <ThemedSvg
                    src="/dashboard/widgets/schedule-map-pin.svg"
                    className="size-4 text-foreground"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm leading-5 text-muted-foreground">
                    {item.from}
                  </p>
                  <p className="truncate text-sm font-semibold leading-5 text-foreground">
                    {item.fromCity}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex shrink-0 items-center justify-center rounded-xl border border-border p-3">
                  <ThemedSvg
                    src="/dashboard/widgets/schedule-flag.svg"
                    className="size-4 text-foreground"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm leading-5 text-muted-foreground">
                    {item.to}
                  </p>
                  <p className="truncate text-sm font-semibold leading-5 text-foreground">
                    {item.toCity}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default UpcomingSchedules
