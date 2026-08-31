"use client"

import * as React from "react"
import { createColumnHelper, useTable } from "@tanstack/react-table"
import { Download } from "lucide-react"

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

import { exportUsers, type ExportUser } from "./data"
import { PersonCell, SoftBadge, TableFrame } from "./shared"

const columnHelper = createColumnHelper<DataTableFeatures, ExportUser>()

const columns = columnHelper.columns([
  columnHelper.accessor("name", {
    header: "User",
    cell: ({ row }) => (
      <PersonCell
        name={row.original.name}
        detail={row.original.email}
        avatar={row.original.avatar}
      />
    ),
  }),
  columnHelper.accessor("role", {
    header: "Role",
    cell: ({ getValue }) => <span className="text-sm">{getValue()}</span>,
  }),
  columnHelper.accessor("plan", {
    header: "Plan",
    cell: ({ getValue }) => <span className="text-sm">{getValue()}</span>,
  }),
  columnHelper.accessor("billing", {
    header: "Billing",
    cell: ({ getValue }) => <span className="text-sm">{getValue()}</span>,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ getValue }) => <SoftBadge value={getValue()} />,
  }),
])

export function ExportTable({ className }: { className?: string }) {
  const [data] = React.useState(exportUsers)

  const table = useTable({
    features,
    data,
    columns,
  })

  const handleDownload = () => {
    const headers = ["Name", "Email", "Role", "Plan", "Billing", "Status"]
    const csvRows = data.map((item) =>
      [item.name, item.email, item.role, item.plan, item.billing, item.status]
        .map((value) => `"${value}"`)
        .join(",")
    )
    const csvContent = [headers.join(","), ...csvRows].join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", "table-data.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <TableFrame
      className={className}
      toolbar={
        <div className="flex items-center justify-end">
          <Button onClick={handleDownload} className="inline-flex gap-2">
            <Download className="size-4" />
            Export CSV
          </Button>
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
