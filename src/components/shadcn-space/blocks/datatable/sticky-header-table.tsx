"use client"

import * as React from "react"
import { createColumnHelper, useTable } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  features,
  type DataTableFeatures,
} from "@/components/ui/data-table-features"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { stickyCourses, type Course } from "./data"
import { ChipList, CourseIcon, TableFrame } from "./shared"

const columnHelper = createColumnHelper<DataTableFeatures, Course>()

const columns = columnHelper.columns([
  columnHelper.accessor("title", {
    header: "Courses",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <CourseIcon title={row.original.title} />
        <div className="min-w-0">
          <div className="truncate font-medium">{row.original.title}</div>
          <div className="truncate text-xs text-muted-foreground">
            {row.original.subtitle}
          </div>
        </div>
      </div>
    ),
  }),
  columnHelper.accessor("technologies", {
    header: "Technologies",
    cell: ({ getValue }) => <ChipList items={getValue()} />,
    enableSorting: false,
  }),
  columnHelper.accessor("users", {
    header: "Users",
  }),
  columnHelper.display({
    id: "action",
    header: "",
    cell: ({ row }) => (
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label={`Actions for ${row.original.title}`}
      >
        <MoreHorizontal />
      </Button>
    ),
  }),
])

export function StickyHeaderTable({ className }: { className?: string }) {
  const [data] = React.useState(stickyCourses)

  const table = useTable({
    features,
    data,
    columns,
  })

  return (
    <TableFrame className={className}>
      <div className="max-h-[500px] overflow-auto">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-background shadow-sm">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="bg-background px-4 py-3">
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
    </TableFrame>
  )
}
