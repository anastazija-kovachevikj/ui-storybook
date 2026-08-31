"use client"

import * as React from "react"
import { createColumnHelper, useTable } from "@tanstack/react-table"
import { Check, Pencil, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  features,
  type DataTableFeatures,
} from "@/components/ui/data-table-features"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { editableProjects, type EditableProject } from "./data"
import { nativeSelectClassName, SoftBadge, TableFrame } from "./shared"

const columnHelper = createColumnHelper<DataTableFeatures, EditableProject>()

type Draft = {
  username: string
  projectName: string
  status: EditableProject["status"]
}

export function EditRowTable({ className }: { className?: string }) {
  const [data, setData] = React.useState(editableProjects)
  const [editingId, setEditingId] = React.useState<string | null>("3")
  const [draft, setDraft] = React.useState<Draft | null>(() => {
    const row = editableProjects.find((item) => item.id === "3")
    return row
      ? {
          username: row.username,
          projectName: row.projectName,
          status: row.status,
        }
      : null
  })

  const startEdit = (row: EditableProject) => {
    setEditingId(row.id)
    setDraft({
      username: row.username,
      projectName: row.projectName,
      status: row.status,
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setDraft(null)
  }

  const saveEdit = () => {
    if (!editingId || !draft) return
    setData((prev) =>
      prev.map((row) => (row.id === editingId ? { ...row, ...draft } : row))
    )
    cancelEdit()
  }

  const columns = React.useMemo(
    () =>
      columnHelper.columns([
        columnHelper.accessor("username", {
          header: "Username",
          cell: ({ row }) =>
            editingId === row.original.id && draft ? (
              <Input
                value={draft.username}
                onChange={(event) =>
                  setDraft((prev) =>
                    prev ? { ...prev, username: event.target.value } : prev
                  )
                }
                aria-label="Edit username"
              />
            ) : (
              <span className="font-medium">{row.original.username}</span>
            ),
        }),
        columnHelper.accessor("projectName", {
          header: "Project Name",
          cell: ({ row }) =>
            editingId === row.original.id && draft ? (
              <Input
                value={draft.projectName}
                onChange={(event) =>
                  setDraft((prev) =>
                    prev ? { ...prev, projectName: event.target.value } : prev
                  )
                }
                aria-label="Edit project name"
              />
            ) : (
              row.original.projectName
            ),
        }),
        columnHelper.accessor("status", {
          header: "Status",
          cell: ({ row }) =>
            editingId === row.original.id && draft ? (
              <select
                className={nativeSelectClassName}
                value={draft.status}
                onChange={(event) =>
                  setDraft((prev) =>
                    prev
                      ? {
                          ...prev,
                          status: event.target
                            .value as EditableProject["status"],
                        }
                      : prev
                  )
                }
                aria-label="Edit status"
              >
                <option value="active">active</option>
                <option value="pending">pending</option>
                <option value="cancel">cancel</option>
              </select>
            ) : (
              <SoftBadge value={row.original.status} />
            ),
        }),
        columnHelper.display({
          id: "edit",
          header: "Edit",
          cell: ({ row }) =>
            editingId === row.original.id ? (
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={saveEdit}
                  aria-label="Confirm edit"
                >
                  <Check className="size-4 text-success" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={cancelEdit}
                  aria-label="Cancel edit"
                >
                  <X className="size-4 text-destructive" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => startEdit(row.original)}
                aria-label={`Edit ${row.original.username}`}
              >
                <Pencil className="size-4" />
              </Button>
            ),
        }),
      ]),
    [draft, editingId]
  )

  const table = useTable({
    features,
    data,
    columns,
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
