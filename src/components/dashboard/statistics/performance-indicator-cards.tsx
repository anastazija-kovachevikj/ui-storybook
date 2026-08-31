import Image from "next/image"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const performanceIndicators = [
  {
    label: "Total Orders",
    value: "16,689",
    action: "View Orders",
    icon: "/dashboard/statistics/performance-indicators/total-orders.svg",
    color: "var(--primary)",
  },
  {
    label: "Return Item",
    value: "148",
    action: "Product Detail",
    icon: "/dashboard/statistics/performance-indicators/return-item.svg",
    color: "var(--warning)",
  },
  {
    label: "Annual Budget",
    value: "$156K",
    action: "Budget Overview",
    icon: "/dashboard/statistics/performance-indicators/annual-budget.svg",
    color: "var(--success)",
  },
  {
    label: "Cancel Orders",
    value: "64",
    action: "View All",
    icon: "/dashboard/statistics/performance-indicators/cancel-orders.svg",
    color: "var(--destructive)",
  },
  {
    label: "Total Income",
    value: "$36,715",
    action: "View Balance",
    icon: "/dashboard/statistics/performance-indicators/total-income.svg",
    color: "var(--badge-count)",
  },
  {
    label: "Expense",
    value: "$36,715",
    action: "View Details",
    icon: "/dashboard/statistics/performance-indicators/expense.svg",
    color: "var(--chart-2)",
  },
]

/** Performance indicator cards based on Figma Statistics 18. */
export function PerformanceIndicatorCards({ className }: { className?: string }) {
  return (
    <section
      className={cn("w-full px-7 py-20", className)}
      aria-label="Performance indicator cards"
    >
      <div className="grid grid-cols-6 gap-6">
        {performanceIndicators.map((indicator) => (
          <article
            key={indicator.label}
            className="flex h-[212px] min-w-0 flex-col items-center rounded-xl p-6 text-center"
            style={{
              backgroundImage: `linear-gradient(to bottom, color-mix(in oklab, ${indicator.color} 20%, var(--background)), var(--background))`,
            }}
          >
            <span
              className="flex size-12 items-center justify-center rounded-lg"
              style={{ backgroundColor: indicator.color }}
            >
              <Image src={indicator.icon} alt="" width={24} height={24} className="size-6" unoptimized />
            </span>
            <p className="mt-4 text-sm leading-5 text-foreground">{indicator.label}</p>
            <p className="mt-1 text-xl font-medium leading-7 tracking-tight text-foreground tabular-nums">
              {indicator.value}
            </p>
            <Button
              variant="outline"
              className="mt-auto h-8 rounded-md border-transparent bg-card px-3 text-sm font-medium leading-5 text-foreground shadow-xs hover:bg-card"
            >
              {indicator.action}
            </Button>
          </article>
        ))}
      </div>
    </section>
  )
}

export default PerformanceIndicatorCards
