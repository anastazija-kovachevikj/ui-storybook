"use client"

import { useState, type ReactNode } from "react"
import {
  CheckCircle2,
  Circle,
  Expand,
  FileText,
  type LucideIcon,
} from "lucide-react"

import {
  Attachment,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

/** Placeholder shown when a field has no custom label. */
export const DOCUMENT_LABEL_PLACEHOLDER = "Document title"

/** Default icon used when a field does not provide one. */
export const DOCUMENT_ICON_DEFAULT = FileText

export type DocumentField = {
  id: string
  /** Document title. Falls back to {@link DOCUMENT_LABEL_PLACEHOLDER}. */
  label?: string
  value?: string | null
  /** Override empty detection when value is present but should still show as incomplete */
  complete?: boolean
  /** Optional icon override. Defaults to {@link DOCUMENT_ICON_DEFAULT}. */
  icon?: LucideIcon
}

export type DocumentsDisplayProps = {
  fields: DocumentField[]
  title?: string
  description?: string
  className?: string
  onFieldClick?: (field: DocumentField) => void
  /**
   * `default` — full labels/values in a responsive card grid.
   * `compact` — denser truncated tiles with an Expand dialog.
   */
  variant?: "default" | "compact"
  /**
   * Compact layout only.
   * `vertical` — single column stack.
   * `horizontal` — 4-column grid (2×4 for eight fields).
   */
  orientation?: "vertical" | "horizontal"
}

function fieldLabel(field: DocumentField): string {
  const label = field.label?.trim()
  return label ? label : DOCUMENT_LABEL_PLACEHOLDER
}

function fieldIcon(field: DocumentField): LucideIcon {
  return field.icon ?? DOCUMENT_ICON_DEFAULT
}

function isFieldComplete(field: DocumentField): boolean {
  if (field.complete != null) return field.complete
  const value = field.value?.trim()
  return Boolean(value) && value !== "—" && value !== "--"
}

function displayValue(field: DocumentField, complete: boolean): string {
  if (!complete) return "Not provided"
  return field.value?.trim() || "—"
}

export function DocumentsDisplay({
  fields,
  title = "Documents",
  description,
  className,
  onFieldClick,
  variant = "default",
  orientation = "vertical",
}: DocumentsDisplayProps) {
  const [expanded, setExpanded] = useState(false)
  const isCompact = variant === "compact"
  const isHorizontal = isCompact && orientation === "horizontal"
  const completeCount = fields.filter(isFieldComplete).length
  const total = fields.length
  const allComplete = total > 0 && completeCount === total

  return (
    <>
      <Card
        size="sm"
        data-variant={variant}
        data-orientation={isCompact ? orientation : undefined}
        className={cn(
          "border-0 bg-card shadow-none ring-1 ring-border",
          isCompact && "gap-2",
          className
        )}
      >
        <CardHeader className={cn("items-center", isCompact && "gap-0 py-0")}>
          <CardTitle
            className={cn(
              "flex min-w-0 items-center gap-2 font-semibold",
              isCompact ? "text-xs" : "text-sm"
            )}
          >
            <span className="flex size-5 shrink-0 items-center justify-center text-muted-foreground">
              <FileText
                className={cn(isCompact ? "size-3.5" : "size-4")}
                aria-hidden
              />
            </span>
            <span className="truncate">{title}</span>
          </CardTitle>
          {!isCompact && description ? (
            <CardDescription>{description}</CardDescription>
          ) : null}
          <CardAction>
            <div className="flex items-center gap-1.5">
              <Badge
                variant={allComplete ? "success" : "outline"}
                className={cn(
                  "font-normal tabular-nums",
                  isCompact && "h-5 px-1.5 text-[10px]",
                  !allComplete && "text-muted-foreground"
                )}
              >
                {completeCount}/{total}
                {isCompact ? "" : " complete"}
              </Badge>
              {isCompact ? (
                <Button
                  type="button"
                  variant="outline"
                  size="xs"
                  className="gap-1"
                  onClick={() => setExpanded(true)}
                  data-testid="documents-display-expand"
                  aria-haspopup="dialog"
                >
                  <Expand className="size-3" aria-hidden />
                  Expand
                </Button>
              ) : null}
            </div>
          </CardAction>
        </CardHeader>

        <CardContent className={cn(isCompact && "pt-0")}>
          <DocumentsList
            fields={fields}
            title={title}
            compact={isCompact}
            horizontal={isHorizontal}
            onFieldClick={onFieldClick}
          />
        </CardContent>
      </Card>

      {isCompact ? (
        <Dialog open={expanded} onOpenChange={setExpanded}>
          <DialogContent
            className="sm:max-w-3xl"
            data-testid="documents-display-expand-dialog"
          >
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>
                {description ?? "Full list of documents and field values."}
              </DialogDescription>
              <div className="pt-1">
                <Badge
                  variant={allComplete ? "success" : "outline"}
                  className={cn(
                    "font-normal tabular-nums",
                    !allComplete && "text-muted-foreground"
                  )}
                >
                  {completeCount}/{total} complete
                </Badge>
              </div>
            </DialogHeader>
            <ScrollArea className="max-h-[min(70vh,32rem)] pr-3">
              <DocumentsList
                fields={fields}
                title={title}
                compact={false}
                horizontal={false}
                onFieldClick={(field) => {
                  onFieldClick?.(field)
                  setExpanded(false)
                }}
              />
            </ScrollArea>
          </DialogContent>
        </Dialog>
      ) : null}
    </>
  )
}

function DocumentsList({
  fields,
  title,
  compact,
  horizontal,
  onFieldClick,
}: {
  fields: DocumentField[]
  title: string
  compact: boolean
  horizontal: boolean
  onFieldClick?: (field: DocumentField) => void
}) {
  return (
    <div
      className={cn(
        "grid",
        compact
          ? horizontal
            ? "grid-cols-2 gap-1.5 sm:grid-cols-4"
            : "grid-cols-1 gap-1.5"
          : "grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-4"
      )}
      role="list"
      aria-label={title}
    >
      {fields.map((field) => {
        const complete = isFieldComplete(field)
        const Icon = fieldIcon(field)
        const interactive = Boolean(onFieldClick)

        return (
          <DocumentAttachment
            key={field.id}
            field={field}
            complete={complete}
            icon={<Icon aria-hidden />}
            compact={compact}
            interactive={interactive}
            onClick={interactive ? () => onFieldClick?.(field) : undefined}
          />
        )
      })}
    </div>
  )
}

function DocumentAttachment({
  field,
  complete,
  icon,
  compact,
  interactive,
  onClick,
}: {
  field: DocumentField
  complete: boolean
  icon: ReactNode
  compact: boolean
  interactive: boolean
  onClick?: () => void
}) {
  const label = fieldLabel(field)
  const value = displayValue(field, complete)
  const isPlaceholderLabel = !field.label?.trim()

  return (
    <Attachment
      role="listitem"
      size={compact ? "xs" : "sm"}
      state={complete ? "done" : "idle"}
      className={cn(
        "h-full",
        compact ? "items-center" : "items-start",
        interactive &&
          "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      )}
      tabIndex={interactive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        interactive
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault()
                onClick?.()
              }
            }
          : undefined
      }
      data-testid={`document-field-${field.id}`}
      title={`${label}: ${value}`}
      aria-label={`${label}: ${value}${complete ? ", complete" : ", incomplete"}`}
    >
      <AttachmentMedia className={cn(!compact && "mt-0.5")}>{icon}</AttachmentMedia>
      <AttachmentContent className="min-w-0">
        <AttachmentTitle
          className={cn(
            compact
              ? "truncate"
              : "overflow-visible whitespace-normal text-clip",
            isPlaceholderLabel
              ? "font-normal text-muted-foreground/70"
              : "text-muted-foreground"
          )}
        >
          {label}
        </AttachmentTitle>
        {compact ? (
          <AttachmentDescription
            className={cn(
              "mt-0.5 truncate text-[11px] leading-4",
              complete
                ? "font-medium text-foreground"
                : "font-normal text-muted-foreground/70"
            )}
          >
            {value}
          </AttachmentDescription>
        ) : (
          <p
            data-slot="attachment-description"
            className={cn(
              "mt-1 whitespace-pre-wrap text-sm leading-5",
              complete
                ? "font-medium text-foreground"
                : "font-normal text-muted-foreground/70"
            )}
          >
            {value}
          </p>
        )}
      </AttachmentContent>
      <AttachmentActions className={cn(!compact && "mt-0.5 self-start")}>
        {complete ? (
          <CheckCircle2
            className={cn(compact ? "size-3.5" : "size-4", "text-success")}
            aria-hidden
          />
        ) : (
          <Circle
            className={cn(
              compact ? "size-3.5" : "size-4",
              "text-muted-foreground/40"
            )}
            aria-hidden
          />
        )}
      </AttachmentActions>
    </Attachment>
  )
}
