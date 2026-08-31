"use client"

import { Bell, CalendarRange, Check, Menu, Search, Sparkles } from "lucide-react"

import {
  periodOptions,
  type PeriodKey,
} from "@/components/dashboard/data"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function DashboardHeader({
  period,
  onPeriodChange,
  myWorkOnly,
  onMyWorkOnlyChange,
  onOpenNav,
  className,
}: {
  period: PeriodKey
  onPeriodChange: (value: PeriodKey) => void
  myWorkOnly: boolean
  onMyWorkOnlyChange: (value: boolean) => void
  onOpenNav?: () => void
  className?: string
}) {
  const periodLabel =
    periodOptions.find((option) => option.value === period)?.label ??
    "Last 30 days"

  return (
    <header
      className={cn(
        "flex h-[72px] shrink-0 items-center gap-3 border-b border-border/80 bg-card/95 px-4 backdrop-blur sm:px-6",
        className
      )}
    >
      {onOpenNav && (
        <Button
          variant="ghost"
          size="icon-sm"
          className="lg:hidden"
          aria-label="Open navigation"
          onClick={onOpenNav}
        >
          <Menu className="size-4" />
        </Button>
      )}

      <div className="min-w-0 leading-tight">
        <div className="flex items-center gap-1.5">
          <Sparkles className="size-3 text-primary" aria-hidden />
          <p className="text-[11px] font-medium text-primary">ClaimUW operations</p>
        </div>
        <h1 className="mt-0.5 text-base font-semibold tracking-tight text-foreground">
          Dashboard
        </h1>
      </div>

      <div className="ml-auto flex min-w-0 items-center gap-1.5">
        <div className="relative hidden w-full max-w-[200px] md:block">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search claims, clients…"
            className="h-8 rounded-lg border-border bg-background pl-8 text-sm shadow-none"
            aria-label="Search"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "h-8 gap-1.5"
            )}
          >
            <CalendarRange className="size-3.5" />
            <span>{periodLabel}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            {periodOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => onPeriodChange(option.value)}
              >
                <span className="flex-1">{option.label}</span>
                {period === option.value && (
                  <Check className="size-3.5 text-primary" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant={myWorkOnly ? "secondary" : "outline"}
          size="sm"
          className="hidden h-8 md:inline-flex"
          aria-pressed={myWorkOnly}
          onClick={() => onMyWorkOnlyChange(!myWorkOnly)}
        >
          My work only
        </Button>

        <Button
          variant="ghost"
          size="icon-sm"
          className="relative text-muted-foreground"
          aria-label="Notifications, 3 unread"
        >
          <Bell className="size-4" />
          <Badge
            variant="destructive"
            className="absolute -top-0.5 -right-0.5 h-4 min-w-4 rounded-full px-1 text-[10px]"
          >
            3
          </Badge>
        </Button>
      </div>
    </header>
  )
}
