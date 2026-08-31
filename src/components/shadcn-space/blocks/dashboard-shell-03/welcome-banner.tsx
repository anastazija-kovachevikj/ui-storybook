"use client"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function WelcomeBanner({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden rounded-xl border-0 bg-primary py-6 text-primary-foreground shadow-none ring-1 ring-foreground/10",
        className
      )}
    >
      <CardContent className="relative flex min-h-[136px] flex-col justify-between gap-5 px-6 pe-36 sm:pe-56">
        <div>
          <p className="text-lg font-semibold leading-7 text-primary-foreground">
            Welcome Jonathan Deo
          </p>
          <p className="text-sm leading-5 text-primary-foreground/50">
            Check all the statistics
          </p>
        </div>

        <div className="flex w-fit items-stretch overflow-hidden rounded-lg bg-foreground/10">
          <div className="flex flex-col items-start px-4 py-3">
            <p className="w-full text-center text-lg font-bold leading-7 text-primary-foreground">
              573
            </p>
            <p className="text-xs leading-4 text-primary-foreground">New Leads</p>
          </div>
          <div className="flex flex-col items-start border-l border-primary-foreground/20 px-4 py-3">
            <p className="w-full text-center text-lg font-bold leading-7 text-primary-foreground">
              87%
            </p>
            <p className="text-xs leading-4 text-primary-foreground">Conversion</p>
          </div>
        </div>

        <img
          src="/dashboard/widgets/kpi-welcome-illustration.webp"
          alt=""
          width={250}
          height={175}
          className="pointer-events-none absolute right-0 top-[-15px] hidden h-[175px] w-[250px] object-contain object-right sm:block"
        />
      </CardContent>
    </Card>
  )
}

export default WelcomeBanner
