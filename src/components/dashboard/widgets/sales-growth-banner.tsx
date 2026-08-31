"use client"

import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

export function SalesGrowthBanner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-between gap-6 overflow-hidden rounded-xl bg-primary/10 px-8 py-8",
        className
      )}
    >
      <div className="flex min-w-0 flex-col gap-3">
        <div className="flex items-center gap-2.5">
          <span className="size-1.5 shrink-0 rounded-full bg-destructive" />
          <p className="text-sm font-medium text-foreground">Update</p>
        </div>
        <p className="text-lg font-medium leading-7 text-foreground">
          Sales revenue increased 40% in 1 week
        </p>
      </div>
      <a
        href="#"
        className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-primary hover:underline"
      >
        See Statistics
        <ArrowRight className="size-5" />
      </a>
    </div>
  )
}

export default SalesGrowthBanner
