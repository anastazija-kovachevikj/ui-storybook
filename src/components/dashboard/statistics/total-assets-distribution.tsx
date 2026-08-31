import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const assetDistribution = [
  {
    label: "Product Sales",
    amount: "$312,500.45",
    percentage: "65%",
    value: 65,
    color: "var(--primary)",
  },
  {
    label: "Service Revenue",
    amount: "$125,000.25",
    percentage: "26%",
    value: 26,
    color: "var(--warning)",
  },
  {
    label: "Other Income",
    amount: "$40,730.20",
    percentage: "9%",
    value: 9,
    color: "var(--success)",
  },
]

/** Total-assets distribution card based on Figma Statistics 17. */
export function TotalAssetsDistribution({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "flex w-[calc(100vw-5rem)] max-w-[1600px] justify-center px-6 py-20",
        className
      )}
      aria-label="Total assets distribution"
    >
      <Card className="h-[330px] w-full max-w-96 overflow-hidden rounded-xl border bg-card py-6 shadow-xs">
        <CardContent className="h-full p-0">
          <div className="flex h-full flex-col gap-5">
            <header className="px-6">
              <h2 className="text-lg font-medium leading-7 tracking-tight text-foreground">Total Assets</h2>
              <div className="mt-3 space-y-0.5">
                <p className="text-2xl font-semibold leading-8 tracking-tight text-foreground tabular-nums">
                  $478,230.90
                </p>
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs leading-4 text-muted-foreground">
                    +14.6%
                  </span>
                  <span className="text-sm leading-5 text-foreground">+$65,000</span>
                  <span className="text-xs leading-4 text-muted-foreground">compared to last year</span>
                </div>
              </div>
            </header>

            <div className="px-6">
              <div className="space-y-1.5">
                <p className="text-sm font-medium leading-5 text-foreground">Distribution</p>
                <div className="flex h-3 gap-1" aria-label="Asset distribution">
                  {assetDistribution.map((asset) => (
                    <span
                      key={asset.label}
                      className="h-full rounded-sm"
                      style={{ width: `${asset.value}%`, backgroundColor: asset.color }}
                      aria-hidden
                    />
                  ))}
                </div>
              </div>

              <div className="mt-4">
                {assetDistribution.map((asset, index) => (
                  <div
                    key={asset.label}
                    className={cn(
                      "flex h-[37px] items-center justify-between py-2",
                      index < assetDistribution.length - 1 && "border-b border-border"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="size-2 rounded-full"
                        style={{ backgroundColor: asset.color }}
                        aria-hidden
                      />
                      <span className="text-sm font-medium leading-5 text-foreground">{asset.label}</span>
                    </div>
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <span className="text-sm leading-5 text-foreground tabular-nums">{asset.amount}</span>
                      <span className="text-xs leading-4 text-muted-foreground">({asset.percentage})</span>
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

export default TotalAssetsDistribution
