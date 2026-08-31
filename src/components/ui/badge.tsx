"use client"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

/** Top glow — radial bloom sitting on the rim. Color comes from --badge-glow. */
function StatusGlow() {
  return (
    <motion.span
      aria-hidden
      data-slot="badge-glow"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.55 }}
      transition={{ duration: 0.45 }}
      className="pointer-events-none absolute -top-2 right-[10%] left-[10%] z-10 h-4 bg-[radial-gradient(ellipse_80%_100%_at_50%_100%,color-mix(in_srgb,var(--badge-glow)_95%,transparent)_0%,transparent_70%)] blur"
    />
  )
}

const badgeVariants = cva(
  "group/badge relative inline-flex w-fit shrink-0 items-center justify-center rounded-4xl border border-transparent font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "overflow-hidden bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        solid:
          "overflow-hidden bg-foreground text-background [a]:hover:bg-foreground/85",
        secondary:
          "overflow-hidden bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive:
          "overflow-hidden bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        outline:
          "overflow-hidden border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost:
          "overflow-hidden hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "overflow-hidden text-primary underline-offset-4 hover:underline",
        count:
          "size-6 overflow-hidden rounded-full bg-badge-count p-0 text-xs text-badge-count-foreground",
        success:
          "overflow-hidden bg-badge-positive-fill text-badge-positive-fill-foreground [a]:hover:bg-badge-positive-fill/80",
        "status-success":
          "overflow-visible border-badge-glow-positive/25 bg-background text-foreground backdrop-blur-md [--badge-glow:var(--badge-glow-positive)] [&>svg]:text-badge-glow-positive",
        "status-pending":
          "overflow-visible border-badge-glow-warning/25 bg-background text-foreground backdrop-blur-md [--badge-glow:var(--badge-glow-warning)] [&>svg]:text-badge-glow-warning",
        "status-failed":
          "overflow-visible border-badge-glow-negative/25 bg-background text-foreground backdrop-blur-md [--badge-glow:var(--badge-glow-negative)] [&>svg]:text-badge-glow-negative",
      },
      size: {
        default:
          "h-5 gap-1 px-2 py-0.5 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:size-3",
        lg: "h-auto min-h-8 gap-2 px-3 py-2 text-sm [&>svg]:size-4",
        count: "size-6 gap-0 p-0 text-xs",
      },
    },
    compoundVariants: [
      {
        variant: "count",
        class: "size-6 gap-0 p-0",
      },
      {
        variant: ["status-success", "status-pending", "status-failed"],
        size: "default",
        class: "h-auto min-h-8 gap-2 border px-3 py-2 text-sm [&>svg]:size-4",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  size = "default",
  render,
  children,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  const isStatus =
    variant === "status-success" ||
    variant === "status-pending" ||
    variant === "status-failed"

  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant, size }), className),
        children: (
          <>
            {isStatus ? <StatusGlow /> : null}
            {children}
          </>
        ),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
      size,
    },
  })
}

export { Badge, badgeVariants }
