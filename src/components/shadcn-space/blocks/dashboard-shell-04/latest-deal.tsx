"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

const purchasers = ["arlene", "jerome", "jacob", "annette"]

export function LatestDeal({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "rounded-2xl border-0 bg-card shadow-none ring-1 ring-border",
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Latest Deal</CardTitle>
        <span className="text-xs text-muted-foreground">Last 7 days</span>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <p className="text-3xl font-semibold tracking-tight">86.5%</p>
          <Progress value={86.5} />
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">$98,500</span>
            <span className="text-muted-foreground">$1,22,900</span>
          </div>
          <p className="text-xs text-muted-foreground">Coupons used: 18/22</p>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">Recent Purchasers</p>
          <div className="flex items-center">
            <div className="flex -space-x-2">
              {purchasers.map((name) => (
                <Avatar
                  key={name}
                  size="sm"
                  className="size-8 border-2 border-card"
                >
                  <AvatarImage
                    src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${name}`}
                    alt={name}
                  />
                  <AvatarFallback>{name.slice(0, 1).toUpperCase()}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
              +4
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default LatestDeal
