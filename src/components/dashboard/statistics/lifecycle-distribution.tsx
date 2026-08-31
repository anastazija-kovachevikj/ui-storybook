import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const lifecycleStages = [
  {
    label: "Completed",
    count: 732,
    percentage: 85,
    colorClass: "bg-success",
    textClass: "text-success",
  },
  {
    label: "Submitted",
    count: 54,
    percentage: 6,
    colorClass: "bg-primary",
    textClass: "text-primary",
  },
  {
    label: "Started",
    count: 49,
    percentage: 6,
    colorClass: "bg-muted-foreground",
    textClass: "text-muted-foreground",
  },
  {
    label: "In review",
    count: 28,
    percentage: 3,
    colorClass: "bg-warning",
    textClass: "text-warning",
  },
]

/** Claim lifecycle summary using the project shadcn card and semantic tokens. */
export function LifecycleDistribution({ className }: { className?: string }) {
  return (
    <section className={cn("w-full px-6 py-20", className)} aria-label="Claim lifecycle distribution">
      <Card className="w-full border bg-card py-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex min-h-32 items-stretch gap-6">
            <div className="flex w-56 shrink-0 flex-col justify-center">
              <p className="text-sm font-medium text-muted-foreground">Total claims</p>
              <p className="mt-1 text-5xl font-semibold tracking-tight text-foreground tabular-nums">863</p>
            </div>

            <Separator orientation="vertical" />

            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">Lifecycle distribution</p>
              <div
                className="mt-3 flex h-6 overflow-hidden rounded-md bg-muted"
                role="progressbar"
                aria-label="Claim lifecycle distribution"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={100}
              >
                {lifecycleStages.map((stage, index) => (
                  <span
                    key={stage.label}
                    className={cn(
                      "h-full",
                      stage.colorClass,
                      index > 0 && "border-l-2 border-card"
                    )}
                    style={{ width: `${stage.percentage}%` }}
                    aria-hidden
                  />
                ))}
              </div>

              <div className="mt-5 grid grid-cols-4 divide-x divide-border">
                {lifecycleStages.map((stage, index) => (
                  <div key={stage.label} className={cn("px-6", index === 0 && "pl-0", index === lifecycleStages.length - 1 && "pr-0")}>
                    <div className="flex items-center gap-2">
                      <span className={cn("size-2.5 rounded-full", stage.colorClass)} aria-hidden />
                      <span className="text-sm font-medium text-foreground">{stage.label}</span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-6">
                      <span className="text-xl font-semibold tracking-tight text-foreground tabular-nums">
                        {stage.count}
                      </span>
                      <span className={cn("text-sm font-semibold tabular-nums", stage.textClass)}>
                        {stage.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

export default LifecycleDistribution
