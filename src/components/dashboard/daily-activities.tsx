"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { activities } from "@/components/dashboard/data"
import { cn } from "@/lib/utils"

export function DailyActivities({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "w-full min-w-0 gap-5 rounded-xl border-0 bg-card py-6 shadow-none ring-1 ring-foreground/10 [--card-spacing:--spacing(6)]",
        className
      )}
    >
      <CardHeader>
        <CardTitle className="text-lg font-medium leading-7 text-foreground">
          Daily activities
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <ul className="relative">
          {activities.map((item, index) => {
            const isLast = index === activities.length - 1
            return (
              <li
                key={item.id}
                className="relative flex items-start gap-3 pb-5 last:pb-0"
              >
                <span className="w-14 shrink-0 text-right text-sm font-medium leading-5 tabular-nums text-foreground">
                  {item.time}
                </span>

                {/* Timeline rail: 28px track, 12px hollow stroked dot, centered connector */}
                <span className="relative flex w-7 shrink-0 justify-center">
                  {!isLast && (
                    <span
                      className="absolute top-3 bottom-[-20px] left-1/2 w-px -translate-x-1/2 bg-border"
                      aria-hidden
                    />
                  )}
                  <span
                    className="relative z-10 mt-1 size-3 shrink-0 rounded-full border-2 bg-card"
                    style={{ borderColor: item.color }}
                    aria-hidden
                  />
                </span>

                <p className="min-w-0 flex-1 pt-0.5 text-sm leading-5 text-muted-foreground">
                  {item.parts.map((part, i) =>
                    part.href ? (
                      <a
                        key={i}
                        href="#"
                        className="text-primary hover:underline"
                      >
                        {part.text}
                      </a>
                    ) : (
                      <span key={i}>{part.text}</span>
                    )
                  )}
                </p>
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}
