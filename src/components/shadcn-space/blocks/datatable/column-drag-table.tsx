"use client"

import * as React from "react"
import {
  createColumnHelper,
  useTable,
  type ColumnOrderState,
} from "@tanstack/react-table"
import { GripVertical, MoreHorizontal, Pencil, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  features,
  type DataTableFeatures,
} from "@/components/ui/data-table-features"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { projectRows, type ProjectRow } from "./data"
import { PersonCell, ProjectIcon } from "./shared"

const columnHelper = createColumnHelper<DataTableFeatures, ProjectRow>()

function DraggableHeader({
  label,
  columnId,
  onDragStart,
  onDrop,
}: {
  label: string
  columnId: string
  onDragStart: (columnId: string) => void
  onDrop: (columnId: string) => void
}) {
  return (
    <div
      className="flex items-center gap-1"
      onDragOver={(event) => event.preventDefault()}
      onDrop={() => onDrop(columnId)}
    >
      <button
        type="button"
        draggable
        onDragStart={() => onDragStart(columnId)}
        className="inline-flex size-7 cursor-grab items-center justify-center rounded-md text-muted-foreground hover:bg-muted active:cursor-grabbing"
        aria-label={`Drag ${label} column`}
      >
        <GripVertical className="size-4" />
      </button>
      <span>{label}</span>
    </div>
  )
}

export function ColumnDragTable({ className }: { className?: string }) {
  const [data] = React.useState(projectRows)
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>([
    "name",
    "budget",
    "manager",
    "progress",
    "action",
  ])
  const dragColumnId = React.useRef<string | null>(null)

  const onDragStart = (columnId: string) => {
    dragColumnId.current = columnId
  }

  const onDrop = (targetId: string) => {
    const sourceId = dragColumnId.current
    dragColumnId.current = null
    if (!sourceId || sourceId === targetId || targetId === "action") return
    setColumnOrder((prev) => {
      const next = prev.filter((id) => id !== sourceId)
      const targetIndex = next.indexOf(targetId)
      if (targetIndex === -1) return prev
      next.splice(targetIndex, 0, sourceId)
      if (!next.includes("action")) next.push("action")
      return next
    })
  }

  const columns = React.useMemo(
    () =>
      columnHelper.columns([
        columnHelper.accessor("name", {
          id: "name",
          header: () => (
            <DraggableHeader
              label="Project Name"
              columnId="name"
              onDragStart={onDragStart}
              onDrop={onDrop}
            />
          ),
          cell: ({ row }) => (
            <div className="flex items-center gap-3">
              <ProjectIcon name={row.original.name} />
              <div className="min-w-0">
                <div className="truncate font-medium">{row.original.name}</div>
                <div className="truncate text-xs text-muted-foreground">
                  {row.original.date}
                </div>
              </div>
            </div>
          ),
        }),
        columnHelper.accessor("budget", {
          id: "budget",
          header: () => (
            <DraggableHeader
              label="Budget"
              columnId="budget"
              onDragStart={onDragStart}
              onDrop={onDrop}
            />
          ),
        }),
        columnHelper.accessor("manager", {
          id: "manager",
          header: () => (
            <DraggableHeader
              label="Manager"
              columnId="manager"
              onDragStart={onDragStart}
              onDrop={onDrop}
            />
          ),
          cell: ({ row }) => (
            <PersonCell name={row.original.manager} detail={row.original.email} />
          ),
        }),
        columnHelper.accessor("progress", {
          id: "progress",
          header: () => (
            <DraggableHeader
              label="Progress"
              columnId="progress"
              onDragStart={onDragStart}
              onDrop={onDrop}
            />
          ),
          cell: ({ getValue }) => (
            <Progress value={getValue()} className="min-w-28 gap-0" />
          ),
        }),
        columnHelper.display({
          id: "action",
          header: "Action",
          cell: ({ row }) => (
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={`Edit ${row.original.name}`}
              >
                <Pencil className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={`Delete ${row.original.name}`}
              >
                <Trash2 className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={`More actions for ${row.original.name}`}
              >
                <MoreHorizontal className="size-4" />
              </Button>
            </div>
          ),
        }),
      ]),
    []
  )

  const table = useTable({
    features,
    data,
    columns,
    state: { columnOrder },
    onColumnOrderChange: setColumnOrder,
  })

  return (
    <Card className={className}>
      <CardHeader className="border-b">
        <CardTitle>Top Projects</CardTitle>
        <CardDescription>
          Checkout the statistics of top projects
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-(--card-spacing)">
        <div className="overflow-hidden rounded-md border border-border">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} className="px-4 py-3">
                        {header.isPlaceholder ? null : (
                          <table.FlexRender header={header} />
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-4 py-3">
                        <table.FlexRender cell={cell} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
