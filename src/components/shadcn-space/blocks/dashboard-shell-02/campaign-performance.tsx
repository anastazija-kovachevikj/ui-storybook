"use client"

import {
  Camera,
  Globe,
  MoreVertical,
  Share2,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const campaigns: Array<{
  name: string
  subtitle: string
  status: "Running" | "Paused"
  icon: LucideIcon
  iconBg: string
}> = [
  {
    name: "Instagram",
    subtitle: "523 new leads",
    status: "Running",
    icon: Camera,
    iconBg: "bg-chart-4/10 text-chart-4",
  },
  {
    name: "Facebook",
    subtitle: "5490 new followers",
    status: "Running",
    icon: Users,
    iconBg: "bg-primary/10 text-primary",
  },
  {
    name: "Google Adwords",
    subtitle: "790 paid clicks",
    status: "Paused",
    icon: Globe,
    iconBg: "bg-warning/10 text-warning",
  },
  {
    name: "Youtube",
    subtitle: "2763 new Subscribers",
    status: "Paused",
    icon: Video,
    iconBg: "bg-destructive/10 text-destructive",
  },
  {
    name: "Linkedin",
    subtitle: "5039 new followers",
    status: "Paused",
    icon: Share2,
    iconBg: "bg-chart-2/10 text-chart-2",
  },
]

export function CampaignPerformance({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "rounded-xl border-0 bg-card shadow-none ring-1 ring-foreground/10",
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium leading-7">
          Campaign Performance
        </CardTitle>
        <Button variant="ghost" size="icon-xs" className="text-muted-foreground">
          <MoreVertical className="size-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-0 px-0 pb-2">
        {campaigns.map((item, index) => {
          const Icon = item.icon
          const running = item.status === "Running"
          return (
            <div key={item.name}>
              {index > 0 && <div className="h-px w-full bg-border" />}
              <div className="flex items-center gap-3 px-6 py-3.5">
                <div
                  className={cn(
                    "flex size-12 shrink-0 items-center justify-center rounded-xl",
                    item.iconBg
                  )}
                >
                  <Icon className="size-6" />
                </div>
                <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-base font-medium text-foreground">
                      {item.name}
                    </p>
                    <p className="truncate text-sm tracking-wide text-muted-foreground">
                      {item.subtitle}
                    </p>
                  </div>
                  <Badge
                    className={cn(
                      "h-5 shrink-0 border-0 px-2 text-xs font-medium shadow-none",
                      running
                        ? "bg-success/10 text-muted-foreground"
                        : "bg-warning/10 text-muted-foreground"
                    )}
                  >
                    {item.status}
                  </Badge>
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default CampaignPerformance
