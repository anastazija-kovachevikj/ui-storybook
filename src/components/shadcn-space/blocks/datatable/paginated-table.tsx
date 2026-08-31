"use client"

import * as React from "react"
import {
  createColumnHelper,
  useTable,
  type PaginationState,
} from "@tanstack/react-table"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  features,
  type DataTableFeatures,
} from "@/components/ui/data-table-features"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { products, type Product } from "./data"
import {
  ChipList,
  nativeSelectClassName,
  ProjectIcon,
  TableFrame,
} from "./shared"

const columnHelper = createColumnHelper<DataTableFeatures, Product>()

const columns = columnHelper.columns([
  columnHelper.accessor("name", {
    header: "Product",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <ProjectIcon name={row.original.name} />
        <div className="min-w-0">
          <div className="truncate text-sm font-medium">{row.original.name}</div>
          <div className="truncate text-xs text-muted-foreground">
            {row.original.sku}
          </div>
        </div>
      </div>
    ),
  }),
  columnHelper.accessor("categories", {
    header: "Categories",
    cell: ({ getValue }) => <ChipList items={getValue()} />,
    enableSorting: false,
  }),
  columnHelper.accessor("stock", {
    header: "Stock Level",
    cell: ({ row }) => {
      const stock = row.original.stock
      const max = row.original.stockMax
      const pct = max ? Math.round((stock / max) * 100) : 0
      return (
        <div className="min-w-40 space-y-1.5">
          <div className="text-sm">
            {row.original.outOfStock || stock === 0
              ? "Out of Stock"
              : `${stock} units`}{" "}
            / {max} max
          </div>
          <Progress value={pct} className="gap-0" />
        </div>
      )
    },
  }),
  columnHelper.accessor("price", {
    header: "Price",
    cell: ({ getValue }) => (
      <span className="font-medium tabular-nums">{getValue()}</span>
    ),
  }),
])

export function PaginatedTable({ className }: { className?: string }) {
  const [data] = React.useState(products)
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [goToPage, setGoToPage] = React.useState("1")

  const table = useTable({
    features,
    data,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
  })

  const pageCount = table.getPageCount()
  const pageIndex = pagination.pageIndex

  React.useEffect(() => {
    setGoToPage(String(pageIndex + 1))
  }, [pageIndex])

  return (
    <TableFrame
      className={className}
      footer={
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
          <span>{data.length} Rows</span>
          <div className="flex flex-wrap items-center gap-3">
            <span>
              Page {pageIndex + 1} of {Math.max(pageCount, 1)}
            </span>
            <label className="flex items-center gap-2">
              <span>Go to page</span>
              <Input
                className="h-8 w-14"
                value={goToPage}
                onChange={(event) => setGoToPage(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key !== "Enter") return
                  const next = Number(goToPage)
                  if (!Number.isFinite(next)) return
                  table.setPageIndex(
                    Math.min(Math.max(next - 1, 0), Math.max(pageCount - 1, 0))
                  )
                }}
                aria-label="Go to page"
              />
            </label>
            <label className="flex items-center gap-2">
              <span>Show</span>
              <select
                className={nativeSelectClassName}
                value={pagination.pageSize}
                onChange={(event) =>
                  table.setPageSize(Number(event.target.value))
                }
                aria-label="Page size"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </label>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                aria-label="First page"
              >
                <ChevronsLeft />
              </Button>
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                aria-label="Previous page"
              >
                <ChevronLeft />
              </Button>
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                aria-label="Next page"
              >
                <ChevronRight />
              </Button>
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => table.setPageIndex(pageCount - 1)}
                disabled={!table.getCanNextPage()}
                aria-label="Last page"
              >
                <ChevronsRight />
              </Button>
            </div>
          </div>
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
