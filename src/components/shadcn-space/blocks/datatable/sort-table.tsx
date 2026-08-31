"use client"

import * as React from "react"
import {
  createColumnHelper,
  useTable,
  type SortingState,
} from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

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

import { apiListings, type ApiListing } from "./data"
import { TableFrame } from "./shared"

const columnHelper = createColumnHelper<DataTableFeatures, ApiListing>()

function SortHeader({
  label,
  column,
}: {
  label: string
  column: {
    toggleSorting: (desc?: boolean) => void
    getIsSorted: () => false | "asc" | "desc"
  }
}) {
  return (
    <Button
      variant="ghost"
      className="-ml-3 h-8 px-3"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {label}
      <ArrowUpDown className="ml-2 size-4" />
    </Button>
  )
}

const columns = columnHelper.columns([
  columnHelper.accessor("name", {
    header: ({ column }) => <SortHeader label="API Listings" column={column} />,
    cell: ({ getValue }) => (
      <span className="font-medium">{getValue()}</span>
    ),
  }),
  columnHelper.accessor("balanceUsed", {
    header: ({ column }) => <SortHeader label="Balance" column={column} />,
    cell: ({ row }) => {
      const used = row.original.balanceUsed
      const max = row.original.balanceMax
      const pct = Math.round((used / max) * 100)
      return (
        <div className="min-w-40 space-y-1.5">
          <div className="text-sm tabular-nums">
            ${used.toLocaleString()} / ${max.toLocaleString()}
          </div>
          <Progress value={pct} className="gap-0" />
        </div>
      )
    },
  }),
  columnHelper.accessor("issuedDate", {
    header: ({ column }) => (
      <SortHeader label="Issued Date" column={column} />
    ),
  }),
  columnHelper.accessor("expirationDate", {
    header: ({ column }) => (
      <SortHeader label="Expiration Date" column={column} />
    ),
  }),
])

export function SortTable({ className }: { className?: string }) {
  const [data] = React.useState(apiListings)
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useTable({
    features,
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
  })

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
