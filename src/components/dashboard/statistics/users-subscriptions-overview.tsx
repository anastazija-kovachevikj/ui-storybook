"use client"

import { ChartLine, Layers } from "lucide-react"
import { Area, AreaChart } from "recharts"

import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { cn } from "@/lib/utils"

const usersTrend = [
  { period: "1", value: 24 },
  { period: "2", value: 58 },
  { period: "3", value: 72 },
  { period: "4", value: 48 },
  { period: "5", value: 92 },
  { period: "6", value: 61 },
  { period: "7", value: 66 },
  { period: "8", value: 79 },
]

const usersChartConfig = {
  users: { label: "Users", color: "var(--primary)" },
} satisfies ChartConfig

const subscriptionBars = [
  { light: 50, dark: 38 },
  { light: 24, dark: 26 },
  { light: 36, dark: 30 },
  { light: 63, dark: 44 },
  { light: 49, dark: 37 },
  { light: 54, dark: 40 },
]

function MetricHeader({
  label,
  value,
  change,
  icon,
  iconClassName,
}: {
  label: string
  value: string
  change: string
  icon: React.ReactNode
  iconClassName: string
}) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm leading-5 text-muted-foreground">{label}</p>
        <div className="flex items-baseline gap-2">
          <p className="text-xl font-semibold leading-7 tracking-tight text-foreground tabular-nums">{value}</p>
          <span className="text-sm leading-5 text-muted-foreground">{change}</span>
        </div>
      </div>
      <div className={cn("flex size-11 items-center justify-center rounded-lg", iconClassName)}>{icon}</div>
    </div>
  )
}

/** Users and subscriptions summary cards based on Figma Statistics 13. */
export function UsersSubscriptionsOverview({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "flex w-[calc(100vw-5rem)] max-w-[1600px] justify-center px-6 py-20",
        className
      )}
      aria-label="Users and subscriptions overview"
    >
      <div className="flex gap-6">
        <article className="h-[216px] w-[260px] overflow-hidden rounded-xl bg-primary/10 py-6">
          <div className="px-6">
            <MetricHeader
              label="Users"
              value="14,872"
              change="+6.4%"
              icon={<ChartLine className="size-5" strokeWidth={1.8} aria-hidden />}
              iconClassName="bg-primary/20 text-primary"
            />
            <ChartContainer
              config={usersChartConfig}
              className="mt-6 h-24 w-full aspect-auto"
              initialDimension={{ width: 212, height: 96 }}
            >
              <AreaChart data={usersTrend} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="users-subscriptions-fill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-users)" stopOpacity={0.16} />
                    <stop offset="100%" stopColor="var(--color-users)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="var(--color-users)"
                  strokeWidth={2}
                  fill="url(#users-subscriptions-fill)"
                  isAnimationActive={false}
                />
              </AreaChart>
            </ChartContainer>
          </div>
        </article>

        <article className="h-[216px] w-[260px] overflow-hidden rounded-xl bg-warning/10 py-6">
          <div className="px-6">
            <MetricHeader
              label="Subscriptions"
              value="78,298"
              change="-12%"
              icon={<Layers className="size-5" strokeWidth={1.8} aria-hidden />}
              iconClassName="bg-warning/20 text-warning"
            />
            <div className="mt-6 flex h-24 items-end justify-around px-1" aria-label="Subscription activity">
              {subscriptionBars.map((bar, index) => (
                <div key={index} className="flex h-full w-2.5 flex-col justify-end gap-0.5">
                  <div
                    className="w-full rounded-full bg-warning/50"
                    style={{ height: `${bar.light}px` }}
                  />
                  <div
                    className="w-full rounded-full bg-warning"
                    style={{ height: `${bar.dark}px` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

export default UsersSubscriptionsOverview
