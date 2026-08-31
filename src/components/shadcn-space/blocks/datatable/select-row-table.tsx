"use client"

import * as React from "react"
import {
  createColumnHelper,
  useTable,
  type RowSelectionState,
} from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/checkbox"
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

import { deals, type Deal } from "./data"
import { LetterAvatarGroup, PersonCell, SoftBadge, TableFrame } from "./shared"

const columnHelper = createColumnHelper<DataTableFeatures, Deal>()

const columns = columnHelper.columns([
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={
          table.getIsSomePageRowsSelected() &&
          !table.getIsAllPageRowsSelected()
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label={`Select ${row.original.contact}`}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor("contact", {
    header: "Contact",
    cell: ({ row }) => (
      <PersonCell name={row.original.contact} detail={row.original.company} />
    ),
  }),
  columnHelper.accessor("source", {
    header: "Source",
  }),
  columnHelper.accessor("team", {
    header: "Account Team",
    cell: ({ getValue }) => <LetterAvatarGroup letters={getValue()} />,
    enableSorting: false,
  }),
  columnHelper.accessor("stage", {
    header: "Deal Stage",
    cell: ({ getValue }) => <SoftBadge value={getValue()} />,
  }),
  columnHelper.accessor("value", {
    header: "Deal Value",
    cell: ({ getValue }) => (
      <span className="font-medium tabular-nums">{getValue()}</span>
    ),
  }),
])

export function SelectRowTable({ className }: { className?: string }) {
  const [data] = React.useState(deals)
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})

  const table = useTable({
    features,
    data,
    columns,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
  })

  return (
    <TableFrame
      className={className}
      footer={
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
      }
    >
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
                data-state={row.getIsSelected() ? "selected" : undefined}
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
