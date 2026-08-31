"use client"

import { useMemo, useState } from "react"
import {
  ArrowLeft,
  FileCode2,
  Plus,
  Search,
} from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AddFieldDialog } from "@/components/vendors/add-field-dialog"
import {
  initialPolicyFields,
  vendorMeta,
  type NewPolicyFieldInput,
  type PolicyField,
} from "@/components/vendors/data"
import { PolicyFieldsTable } from "@/components/vendors/policy-fields-table"
import { cn } from "@/lib/utils"

const PAGE_SIZE = 10

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "sftp", label: "SFTP" },
  { id: "policy-fields", label: "Policy Fields", active: true },
  { id: "approved-products", label: "Approved Products" },
  { id: "fronting-insurers", label: "Fronting Insurers" },
  { id: "policies", label: "Policies", count: 15 },
  { id: "claims", label: "Claims", count: 0 },
] as const

function createFieldFromInput(input: NewPolicyFieldInput): PolicyField {
  const outbound = input.outboundPath.trim() || input.key
  const inbound = input.inboundPath.trim() || outbound
  return {
    id: `new-${Date.now()}`,
    key: input.key,
    label: input.label.trim() || input.key,
    type: input.type,
    required: input.required,
    attribute: input.attribute,
    inPolicyForm: input.showInPolicyForm ? "Yes" : null,
    defaultValue: input.defaultValue.trim() || null,
    outboundPath: outbound,
    inboundPath: inbound,
  }
}

export function VendorPolicyFields() {
  const [fields, setFields] = useState<PolicyField[]>(initialPolicyFields)
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState("")
  const [addOpen, setAddOpen] = useState(false)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return fields
    return fields.filter(
      (field) =>
        field.key.toLowerCase().includes(q) ||
        field.label.toLowerCase().includes(q) ||
        field.type.toLowerCase().includes(q)
    )
  }, [fields, query])

  const totalCount = filtered.length
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const pageFields = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  )

  function handleAdd(input: NewPolicyFieldInput) {
    setFields((prev) => [createFieldFromInput(input), ...prev])
    setPage(1)
  }

  function handleDelete(field: PolicyField) {
    setFields((prev) => prev.filter((item) => item.id !== field.id))
  }

  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-background">
      <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b bg-card px-5">
        <nav
          aria-label="Breadcrumb"
          className="flex min-w-0 items-center gap-1.5 text-sm text-muted-foreground"
        >
          <Link href="/" className="hover:text-foreground">
            Vendors
          </Link>
          <span aria-hidden>/</span>
          <span className="truncate font-medium text-foreground">
            {vendorMeta.name}
          </span>
        </nav>
        <div className="relative hidden w-full max-w-sm md:block">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search policies, partners, claims…"
            className="h-9 pl-8"
            aria-label="Global search"
          />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto bg-muted/35">
        <div className="mx-auto max-w-[1400px] space-y-5 p-5 md:p-6 lg:p-8">
          <div className="flex items-start gap-3">
            <Link
              href="/"
              aria-label="Back to vendors"
              className="mt-0.5 flex size-9 items-center justify-center rounded-full border bg-card text-muted-foreground hover:bg-muted"
            >
              <ArrowLeft className="size-4" />
            </Link>
            <div className="min-w-0 space-y-1.5">
              <h1 className="text-2xl font-bold tracking-tight">
                {vendorMeta.name}
              </h1>
              <p className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span>#{vendorMeta.id}</span>
                <Badge variant="outline" className="font-mono text-[11px]">
                  {vendorMeta.slug}
                </Badge>
              </p>
            </div>
          </div>

          <div
            role="tablist"
            aria-label="Vendor sections"
            className="flex w-full gap-1 overflow-x-auto rounded-xl bg-muted/70 p-1 ring-1 ring-border"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={"active" in tab && tab.active}
                className={cn(
                  "inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-colors",
                  "active" in tab && tab.active
                    ? "bg-card font-medium text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
                {"count" in tab ? (
                  <span className="text-muted-foreground">· {tab.count}</span>
                ) : null}
              </button>
            ))}
          </div>

          <Card className="gap-3 border-0 py-4 shadow-none ring-1 ring-border">
            <CardHeader className="gap-3 pb-0">
              <div className="min-w-0 space-y-1.5">
                <CardTitle className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                  Policy Fields
                </CardTitle>
                <CardDescription className="max-w-2xl leading-relaxed">
                  Fields this vendor requires on every policy. Required fields
                  become mandatory inputs when a policy is created for this
                  vendor.
                </CardDescription>
              </div>

              <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2.5">
                  <div className="relative w-full max-w-sm">
                    <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value)
                        setPage(1)
                      }}
                      placeholder="Search and filter fields…"
                      className="h-8 pl-8"
                      aria-label="Search and filter policy fields"
                    />
                  </div>
                  <Badge variant="success" className="font-medium tabular-nums">
                    {fields.length} fields
                  </Badge>
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
                  <Button type="button" variant="outline" className="h-8 gap-1.5">
                    <FileCode2 className="size-3.5" aria-hidden />
                    Import from XML
                  </Button>
                  <Button
                    type="button"
                    className="h-8 gap-1.5"
                    onClick={() => setAddOpen(true)}
                    data-testid="open-add-field"
                  >
                    <Plus className="size-3.5" aria-hidden />
                    Add field
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <PolicyFieldsTable
                fields={pageFields}
                page={safePage}
                pageSize={PAGE_SIZE}
                totalCount={totalCount}
                onPageChange={setPage}
                onDelete={handleDelete}
              />
            </CardContent>
          </Card>
        </div>
      </main>

      <AddFieldDialog
        open={addOpen}
        onOpenChange={setAddOpen}
        fields={fields}
        onSubmit={handleAdd}
      />
    </div>
  )
}
