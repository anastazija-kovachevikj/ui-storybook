"use client"

import type { ReactNode } from "react"
import { Pencil } from "lucide-react"

import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type InfoField = {
  label: string
  value?: ReactNode
  empty?: boolean
  mono?: boolean
}

function isEmptyField(field: InfoField): boolean {
  if (field.empty != null) return field.empty
  const value = field.value
  return value == null || value === "" || value === "—" || value === "--"
}

export function InfoCard({
  title,
  icon,
  editable,
  onEdit,
  action,
  children,
  className,
}: {
  title: string
  icon?: ReactNode
  editable?: boolean
  onEdit?: () => void
  action?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <Card
      className={cn(
        "flex h-full flex-col rounded-xl border-0 bg-card shadow-none ring-1 ring-border",
        className
      )}
      size="sm"
    >
      <CardHeader className="items-center">
        <CardTitle className="flex min-w-0 items-center gap-2 text-sm font-semibold">
          {icon ? (
            <span className="flex size-5 shrink-0 items-center justify-center text-muted-foreground [&>svg]:size-4">
              {icon}
            </span>
          ) : null}
          <span className="truncate">{title}</span>
        </CardTitle>
        {action ? (
          <CardAction>{action}</CardAction>
        ) : editable ? (
          <CardAction>
            <button
              type="button"
              onClick={onEdit}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Pencil className="size-3.5" aria-hidden />
              Edit
            </button>
          </CardAction>
        ) : null}
      </CardHeader>
      <CardContent className="flex-1">{children}</CardContent>
    </Card>
  )
}

export function InfoFieldRow({
  label,
  value,
  empty,
  mono,
  striped,
}: {
  label: string
  value: ReactNode
  empty?: boolean
  mono?: boolean
  striped?: boolean
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 rounded-lg px-3 py-2",
        striped && "bg-muted/70"
      )}
    >
      <dt className="shrink-0 text-sm text-muted-foreground">{label}</dt>
      <dd
        className={cn(
          "min-w-0 text-right text-sm font-semibold break-words",
          empty ? "font-medium text-muted-foreground/60" : "text-foreground",
          mono && "font-mono text-[13px] font-medium tracking-tight"
        )}
      >
        {value}
      </dd>
    </div>
  )
}

export function InfoFieldList({
  fields,
  className,
}: {
  fields: InfoField[]
  className?: string
}) {
  return (
    <dl className={cn("flex flex-col gap-0.5", className)}>
      {fields.map((field, index) => {
        const empty = isEmptyField(field)
        return (
          <InfoFieldRow
            key={field.label}
            label={field.label}
            value={empty ? (field.value ?? "—") : field.value}
            empty={empty}
            mono={field.mono}
            striped={index % 2 === 0}
          />
        )
      })}
    </dl>
  )
}
