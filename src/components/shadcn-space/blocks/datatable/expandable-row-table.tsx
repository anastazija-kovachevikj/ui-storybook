"use client"

import * as React from "react"
import {
  createColumnHelper,
  useTable,
  type ExpandedState,
} from "@tanstack/react-table"
import { ChevronDown, ChevronRight } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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

import { courses, type Course } from "./data"
import { ChipList, CourseIcon, initials, TableFrame } from "./shared"

const columnHelper = createColumnHelper<DataTableFeatures, Course>()

const columns = columnHelper.columns([
  columnHelper.display({
    id: "expand",
    header: () => null,
    cell: ({ row }) => (
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={row.getToggleExpandedHandler()}
        aria-label={
          row.getIsExpanded()
            ? `Collapse ${row.original.title}`
            : `Expand ${row.original.title}`
        }
      >
        {row.getIsExpanded() ? (
          <ChevronDown className="size-4" />
        ) : (
          <ChevronRight className="size-4" />
        )}
      </Button>
    ),
  }),
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
])

function ExpandedDetails({ course }: { course: Course }) {
  return (
    <div className="grid gap-3 rounded-md border border-border bg-muted/30 p-4 text-sm">
      <div className="font-medium">More Details</div>
      <div className="flex flex-wrap items-start gap-6">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Avatar:</span>
          <Avatar size="sm">
            <AvatarFallback>{initials(course.title)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="space-y-1">
          <div>Name: {course.title}</div>
          <div>Handle: {course.subtitle}</div>
          <div>Users: {course.users}</div>
        </div>
        <div className="space-y-2">
          <div className="text-muted-foreground">Technologies:</div>
          <ChipList items={course.technologies} />
        </div>
        <div className="max-w-sm text-muted-foreground">
          Description: {course.description}
        </div>
      </div>
    </div>
  )
}

export function ExpandableRowTable({ className }: { className?: string }) {
  const [data] = React.useState(courses)
  const [expanded, setExpanded] = React.useState<ExpandedState>({ "0": true })

  const table = useTable({
    features,
    data,
    columns,
    state: { expanded },
    onExpandedChange: setExpanded,
    getRowCanExpand: () => true,
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
              <React.Fragment key={row.id}>
                <TableRow>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 py-3">
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
                {row.getIsExpanded() ? (
                  <TableRow>
                    <TableCell
                      colSpan={row.getVisibleCells().length}
                      className="bg-muted/20 px-4 py-3"
                    >
                      <ExpandedDetails course={row.original} />
                    </TableCell>
                  </TableRow>
                ) : null}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </TableFrame>
  )
}
