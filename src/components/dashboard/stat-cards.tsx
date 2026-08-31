"use client"

import {
  BarChart3,
  Box,
  ShoppingBag,
  Star,
  type LucideIcon,
} from "lucide-react"

import { KpiCard } from "@/components/dashboard/kpi-card"
import { stats, type StatCard } from "@/components/dashboard/data"
import { cn } from "@/lib/utils"

const icons: Record<StatCard["icon"], LucideIcon> = {
  bag: ShoppingBag,
  cube: Box,
  chart: BarChart3,
  star: Star,
}

export function StatCards({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-2 gap-3 xl:grid-cols-4", className)}>
      {stats.map((item) => (
        <KpiCard
          key={item.id}
          label={item.label}
          value={item.value}
          period={item.period}
          change={item.change}
          tone={item.tone}
          icon={icons[item.icon]}
          className="min-w-0 w-full flex-1"
        />
      ))}
    </div>
  )
}
