import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const attachmentVariants = cva(
  "group/attachment flex w-full items-center gap-3 rounded-xl border bg-card text-card-foreground transition-colors",
  {
    variants: {
      size: {
        default: "min-h-16 px-3.5 py-3",
        sm: "min-h-13 px-3 py-2.5",
        xs: "min-h-10 gap-2 px-2.5 py-2",
      },
      state: {
        idle: "border-border hover:bg-muted/25",
        uploading: "border-primary/30 bg-primary/3",
        processing: "border-border bg-muted/20",
        error: "border-destructive/30 bg-destructive/5",
        done: "border-success/30 bg-success-muted/35",
      },
    },
    defaultVariants: {
      size: "default",
      state: "idle",
    },
  }
)

function Attachment({
  className,
  size,
  state,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof attachmentVariants>) {
  return (
    <div
      data-slot="attachment"
      data-size={size}
      data-state={state}
      className={cn(attachmentVariants({ size, state, className }))}
      {...props}
    />
  )
}

function AttachmentMedia({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="attachment-media"
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground [&>svg]:size-4",
        "group-data-[size=sm]/attachment:size-8 group-data-[size=sm]/attachment:[&>svg]:size-3.5",
        "group-data-[size=xs]/attachment:size-7 group-data-[size=xs]/attachment:[&>svg]:size-3.5",
        "group-data-[state=uploading]/attachment:bg-primary/10 group-data-[state=uploading]/attachment:text-primary",
        "group-data-[state=error]/attachment:bg-destructive/10 group-data-[state=error]/attachment:text-destructive",
        "group-data-[state=done]/attachment:bg-success-muted group-data-[state=done]/attachment:text-success",
        className
      )}
      {...props}
    />
  )
}

function AttachmentContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="attachment-content"
      className={cn("min-w-0 flex-1", className)}
      {...props}
    />
  )
}

function AttachmentTitle({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="attachment-title"
      className={cn(
        "truncate text-sm font-medium leading-5 group-data-[size=xs]/attachment:text-xs",
        className
      )}
      {...props}
    />
  )
}

function AttachmentDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="attachment-description"
      className={cn("mt-0.5 truncate text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

function AttachmentActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="attachment-actions"
      className={cn("flex shrink-0 items-center gap-1", className)}
      {...props}
    />
  )
}

function AttachmentAction({
  className,
  type = "button",
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      data-slot="attachment-action"
      type={type}
      className={cn(
        "inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors",
        "hover:bg-muted hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "[&>svg]:size-3.5",
        className
      )}
      {...props}
    />
  )
}

export {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
  attachmentVariants,
}
