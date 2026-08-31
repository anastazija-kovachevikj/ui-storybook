"use client"

import * as React from "react"
import { createColumnHelper, useTable } from "@tanstack/react-table"
import { GripVertical, MoreHorizontal, Pencil, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
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
import { PersonCell, ProjectIcon, TableFrame } from "./shared"

const columnHelper = createColumnHelper<DataTableFeatures, ProjectRow>()

export function RowDragTable({ className }: { className?: string }) {
  const [data, setData] = React.useState(projectRows)
  const dragRowId = React.useRef<string | null>(null)

  const columns = React.useMemo(
    () =>
      columnHelper.columns([
        columnHelper.display({
          id: "drag",
          header: () => null,
          cell: ({ row }) => (
            <button
              type="button"
              draggable
              onDragStart={() => {
                dragRowId.current = row.original.id
              }}
              className="inline-flex size-7 cursor-grab items-center justify-center rounded-md text-muted-foreground hover:bg-muted active:cursor-grabbing"
              aria-label={`Drag ${row.original.name}`}
            >
              <GripVertical className="size-4" />
            </button>
          ),
        }),
        columnHelper.accessor("name", {
          header: "Project Name",
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
          header: "Budget",
        }),
        columnHelper.accessor("manager", {
          header: "Manager",
          cell: ({ row }) => (
            <PersonCell
              name={row.original.manager}
              detail={row.original.email}
            />
          ),
        }),
        columnHelper.accessor("progress", {
          header: "Progress",
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
    getRowId: (row) => row.id,
  })

  const reorder = (targetId: string) => {
    const sourceId = dragRowId.current
    dragRowId.current = null
    if (!sourceId || sourceId === targetId) return
    setData((prev) => {
      const next = [...prev]
      const from = next.findIndex((row) => row.id === sourceId)
      const to = next.findIndex((row) => row.id === targetId)
      if (from < 0 || to < 0) return prev
      const [moved] = next.splice(from, 1)
      next.splice(to, 0, moved)
      return next
    })
  }

  return (
    <TableFrame className={className}>
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
              <TableRow
                key={row.id}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => reorder(row.original.id)}
              >
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
    </TableFrame>
  )
}
