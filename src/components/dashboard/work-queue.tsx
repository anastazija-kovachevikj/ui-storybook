"use client"

import { useMemo, useState } from "react"
import Link from "next/link"

import type { WorkItem, WorkItemKind } from "@/components/dashboard/data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

type QueueTab = "all" | WorkItemKind

const tabs: Array<{ id: QueueTab; label: string }> = [
  { id: "all", label: "All" },
  { id: "task", label: "Tasks" },
  { id: "ticket", label: "Tickets" },
]

const priorityClass: Record<WorkItem["priority"], string> = {
  urgent: "border-0 bg-danger-soft text-destructive",
  high: "border-0 bg-warning-muted text-warning",
  medium: "border-border text-foreground",
  low: "border-0 bg-muted text-muted-foreground",
}

const statusClass: Record<WorkItem["status"], string> = {
  overdue: "text-destructive",
  waiting: "text-warning",
  "in-progress": "text-primary",
  open: "text-muted-foreground",
}

export function WorkQueue({
  items,
  className,
}: {
  items: WorkItem[]
  className?: string
}) {
  const [tab, setTab] = useState<QueueTab>("all")

  const filtered = useMemo(
    () => (tab === "all" ? items : items.filter((item) => item.kind === tab)),
    [items, tab]
  )

  const counts = useMemo(
    () => ({
      all: items.length,
      task: items.filter((item) => item.kind === "task").length,
      ticket: items.filter((item) => item.kind === "ticket").length,
    }),
    [items]
  )

  return (
    <Card className={cn("min-w-0 border-border/80 shadow-sm", className)}>
      <CardHeader className="border-b bg-muted/25">
        <CardTitle className="text-base font-semibold">
          Tasks and tickets
        </CardTitle>
        <CardAction>
          <Button variant="outline" size="sm" className="h-7">
            View all
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="px-0">
        <div
          role="tablist"
          aria-label="Work queue filters"
          className="flex gap-1 px-4 pt-1 pb-3"
        >
          {tabs.map((item) => {
            const selected = tab === item.id
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`queue-tab-${item.id}`}
                aria-selected={selected}
                aria-controls="queue-panel"
                className={cn(
                  "inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-sm transition-colors",
                  selected
                    ? "bg-primary font-medium text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                onClick={() => setTab(item.id)}
              >
                {item.label}
                <span
                  className={cn(
                    "inline-flex min-w-5 items-center justify-center rounded-md px-1 text-[11px]",
                    selected
                      ? "bg-primary-foreground/15 text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {counts[item.id]}
                </span>
              </button>
            )
          })}
        </div>

        <div
          role="tabpanel"
          id="queue-panel"
          aria-labelledby={`queue-tab-${tab}`}
        >
          {filtered.length === 0 ? (
            <p className="px-4 py-8 text-sm text-muted-foreground">
              No items in this queue. Clear “My work only” or pick another
              period.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Work</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due</TableHead>
                  <TableHead>Priority</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="max-w-[220px]">
                      <p className="truncate font-medium text-foreground">
                        {item.title}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {item.relatedHref ? (
                          <Link
                            href={item.relatedHref}
                            className="hover:text-foreground hover:underline"
                          >
                            {item.relatedLabel}
                          </Link>
                        ) : (
                          item.relatedLabel
                        )}
                        <span className="mx-1 text-border">·</span>
                        {item.assigneeLabel}
                      </p>
                    </TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "text-sm font-medium",
                          statusClass[item.status]
                        )}
                      >
                        {item.statusLabel}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger className="text-left text-sm text-muted-foreground">
                          {item.dueLabel}
                        </TooltipTrigger>
                        <TooltipContent>{item.dueAbsolute}</TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn("capitalize", priorityClass[item.priority])}
                      >
                        {item.priority}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
