import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { PeriodSnapshot } from "@/components/dashboard/data"
import { cn } from "@/lib/utils"

export function ClientQueue({
  clients,
  summary,
  className,
}: {
  clients: PeriodSnapshot["clients"]
  summary: PeriodSnapshot["clientSummary"]
  className?: string
}) {
  return (
    <Card className={cn("min-w-0 border-border/80 shadow-sm", className)}>
      <CardHeader className="border-b bg-muted/25">
        <CardTitle className="text-base font-semibold">Clients</CardTitle>
        <CardDescription>
          Assignment gaps in the current book of business
        </CardDescription>
        <CardAction>
          <Button variant="outline" size="sm" className="h-7">
            View all
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          <SummaryChip label="In book" value={summary.total} />
          <SummaryChip label="Assigned to me" value={summary.mine} />
          <SummaryChip
            label="Unassigned"
            value={summary.unassigned}
            emphasize
          />
        </div>

        <ul className="divide-y divide-border">
          {clients.map((client) => (
            <li key={client.id} className="flex items-center gap-3 py-2.5">
              <Avatar size="sm" className="size-8">
                <AvatarFallback className="bg-muted text-[11px] font-medium">
                  {client.initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">
                  {client.name}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {client.type}
                </p>
              </div>
              <Badge
                variant="outline"
                className={cn(
                  client.assignment === "unassigned" &&
                    "border-0 bg-warning-muted text-warning"
                )}
              >
                {client.assignmentLabel}
              </Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

function SummaryChip({
  label,
  value,
  emphasize,
}: {
  label: string
  value: number
  emphasize?: boolean
}) {
  return (
    <div
      className={cn(
        "rounded-lg bg-muted/60 px-3 py-2",
        emphasize && "bg-warning-muted"
      )}
    >
      <p
        className={cn(
          "text-lg font-semibold tabular-nums",
          emphasize ? "text-warning" : "text-foreground"
        )}
      >
        {value}
      </p>
      <p className="text-[11px] text-muted-foreground">{label}</p>
    </div>
  )
}
