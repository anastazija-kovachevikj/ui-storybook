"use client"

import * as React from "react"
import { createColumnHelper, useTable } from "@tanstack/react-table"

import { Input } from "@/components/ui/input"
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

import { tickets, type Ticket } from "./data"
import {
  nativeSelectClassName,
  PersonCell,
  SoftBadge,
  TableFrame,
} from "./shared"

const columnHelper = createColumnHelper<DataTableFeatures, Ticket>()

const columns = columnHelper.columns([
  columnHelper.accessor("requester", {
    header: "Requester",
    cell: ({ row }) => (
      <PersonCell name={row.original.requester} detail={row.original.email} />
    ),
  }),
  columnHelper.accessor("subject", {
    header: "Subject",
    cell: ({ getValue }) => (
      <span className="max-w-xs text-sm whitespace-normal">{getValue()}</span>
    ),
  }),
  columnHelper.accessor("priority", {
    header: "Priority",
    cell: ({ getValue }) => <SoftBadge value={getValue()} />,
  }),
  columnHelper.accessor("category", {
    header: "Category",
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ getValue }) => <SoftBadge value={getValue()} />,
  }),
])

export function FilterTable({ className }: { className?: string }) {
  const [search, setSearch] = React.useState("")
  const [priority, setPriority] = React.useState("All")
  const [category, setCategory] = React.useState("All")
  const [status, setStatus] = React.useState("All")

  const data = React.useMemo(() => {
    const query = search.trim().toLowerCase()
    return tickets.filter((ticket) => {
      const matchesSearch =
        !query ||
        ticket.requester.toLowerCase().includes(query) ||
        ticket.subject.toLowerCase().includes(query)
      const matchesPriority = priority === "All" || ticket.priority === priority
      const matchesCategory = category === "All" || ticket.category === category
      const matchesStatus = status === "All" || ticket.status === status
      return (
        matchesSearch && matchesPriority && matchesCategory && matchesStatus
      )
    })
  }, [search, priority, category, status])

  const table = useTable({
    features,
    data,
    columns,
  })

  return (
    <TableFrame
      className={className}
      toolbar={
        <div className="flex flex-wrap items-end gap-3">
          <label className="grid gap-1.5 text-sm">
            <span className="text-muted-foreground">Search</span>
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Requester or Subject"
              className="w-64"
            />
          </label>
          <label className="grid gap-1.5 text-sm">
            <span className="text-muted-foreground">Priority</span>
            <select
              className={nativeSelectClassName}
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
              aria-label="Select Priority"
            >
              <option>All</option>
              <option>High</option>
              <option>Medium</option>
              <option>Critical</option>
              <option>Low</option>
            </select>
          </label>
          <label className="grid gap-1.5 text-sm">
            <span className="text-muted-foreground">Category</span>
            <select
              className={nativeSelectClassName}
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              aria-label="Select Category"
            >
              <option>All</option>
              <option>Billing</option>
              <option>Account</option>
              <option>Technical</option>
              <option>Feedback</option>
            </select>
          </label>
          <label className="grid gap-1.5 text-sm">
            <span className="text-muted-foreground">Status</span>
            <select
              className={nativeSelectClassName}
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              aria-label="Select Status"
            >
              <option>All</option>
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
              <option>Closed</option>
            </select>
          </label>
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
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 py-3">
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </TableFrame>
  )
}
