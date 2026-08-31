"use client"

import {
  BarChart3,
  Copy,
  Eye,
  Folder,
  Plus,
  Plug,
  RotateCcw,
  Search,
  Upload,
  UserRoundPlus,
  X,
} from "lucide-react"
import type { ComponentProps, CSSProperties, ReactNode } from "react"
import { motion, useReducedMotion } from "motion/react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const emptyStateContent = {
  "no-projects-yet": {
    title: "No Projects yet",
    description: "Get started by creating your first project",
    actionLabel: "Create project",
  },
  "invite-your-team": {
    title: "Bring your team on board",
    description:
      "Invite owners, editors, and reviewers by email or share a secure link. Collaboration starts the moment they join.",
    actionLabel: "Invite member",
    secondaryActionLabel: "Copy invite link",
  },
  "no-data-yet": {
    title: "No data yet",
    description:
      "Get started by adding your first record. You can add one manually or import a file to populate this list.",
    actionLabel: "Add data",
    secondaryActionLabel: "Import CSV",
  },
  "no-data-yet-animated": {
    title: "No data yet",
    description:
      "Get started by adding your first record. You can add one manually or import a file to populate this list.",
    actionLabel: "Add data",
    secondaryActionLabel: "Import CSV",
  },
  "split-panel-preview": {
    title: "No reports for this workspace",
    description:
      "Create your first report to turn tracked companies into one clear view your team can share.",
    actionLabel: "Add report",
    secondaryActionLabel: "View sample",
  },
  "no-search-matches": {
    title: 'No matches for "integration webhook v3"',
    description:
      "Try a different keyword, remove filters, or check for typos in your search term.",
    actionLabel: "Reset search",
    secondaryActionLabel: "Browse all",
  },
  "chart-data-empty": {
    title: "No chart data available",
    description: "Connect a data source to start visualizing your metrics here.",
    actionLabel: "Connect data source",
  },
} as const

export type EmptyStateVariant = keyof typeof emptyStateContent

export type EmptyStateProps = Omit<
  ComponentProps<"section">,
  "title"
> & {
  /** The empty-state layout to display. */
  variant?: EmptyStateVariant
  /** Called when the primary action is selected. */
  onAction?: () => void
  /** Called when an optional secondary action is selected. */
  onSecondaryAction?: () => void
}

/**
 * A focused prompt for a new or empty workspace.
 *
 * Variants provide their own copy and action label so future empty states remain
 * consistent while still using the shared layout and interaction pattern.
 */
export function EmptyState({
  variant = "no-projects-yet",
  className,
  onAction,
  onSecondaryAction,
  style,
  ...props
}: EmptyStateProps) {
  const { title, description, actionLabel } = emptyStateContent[variant]
  const isInviteTeam = variant === "invite-your-team"
  const isNoDataAnimated = variant === "no-data-yet-animated"
  const isNoData = variant === "no-data-yet" || isNoDataAnimated
  const titleId = `empty-state-${variant}-title`

  if (variant === "split-panel-preview") {
    return (
      <SplitPanelEmptyState
        title={title}
        description={description}
        actionLabel={actionLabel}
        secondaryActionLabel={emptyStateContent[variant].secondaryActionLabel}
        titleId={titleId}
        className={className}
        style={style}
        onAction={onAction}
        onSecondaryAction={onSecondaryAction}
        {...props}
      />
    )
  }

  if (variant === "no-search-matches") {
    return (
      <SearchEmptyState
        title={title}
        description={description}
        actionLabel={actionLabel}
        secondaryActionLabel={emptyStateContent[variant].secondaryActionLabel}
        titleId={titleId}
        className={className}
        style={style}
        onAction={onAction}
        onSecondaryAction={onSecondaryAction}
        {...props}
      />
    )
  }

  if (variant === "chart-data-empty") {
    return (
      <ChartDataEmptyState
        title={title}
        description={description}
        actionLabel={actionLabel}
        titleId={titleId}
        className={className}
        style={style}
        onAction={onAction}
        {...props}
      />
    )
  }

  return (
    <section
      data-slot="empty-state"
      data-variant={variant}
      aria-labelledby={titleId}
      className={cn(
        "flex max-w-full flex-col items-center text-center text-card-foreground",
        isInviteTeam
          ? "w-full px-6 py-10"
          : isNoData
            ? "w-full px-6 py-10"
          : "w-[360px] justify-start rounded-2xl bg-card px-8 pt-11 pb-10 shadow-sm ring-1 ring-foreground/10",
        className
      )}
      style={{
        ...(isInviteTeam
          ? { width: "540px" }
          : isNoData
            ? { width: "440px" }
          : { height: "264px", paddingTop: "48px" }),
        ...style,
      }}
      {...props}
    >
      {isInviteTeam ? (
        <UserRoundPlus
          className="text-foreground"
          style={{ width: "112px", height: "112px" }}
          strokeWidth={1.75}
          aria-hidden
        />
      ) : isNoData ? (
        <DataPreview animated={isNoDataAnimated} aria-hidden />
      ) : (
        <div
          className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary"
          aria-hidden
        >
          <Folder className="size-5" strokeWidth={2} />
        </div>
      )}
      <h2
        id={titleId}
        className={cn(
          "mt-5 text-lg leading-6 font-semibold"
        )}
        style={
          isInviteTeam
            ? { marginTop: "28px" }
            : isNoData
              ? { marginTop: "40px" }
              : undefined
        }
      >
        {title}
      </h2>
      <p
        className={cn(
          "text-sm text-muted-foreground",
          "mt-1 leading-5"
        )}
        style={
          isInviteTeam
            ? { maxWidth: "420px", lineHeight: "24px" }
            : isNoData
              ? { maxWidth: "400px", marginTop: "8px", lineHeight: "24px" }
              : undefined
        }
      >
        {description}
      </p>
      <div
        className="flex items-center"
        style={{
          marginTop: isInviteTeam ? "20px" : isNoData ? "20px" : "24px",
          gap: isInviteTeam || isNoData ? "12px" : undefined,
        }}
      >
        <Button
          className="bg-foreground text-background hover:bg-foreground/85"
          onClick={onAction}
        >
          <Plus className="size-4" aria-hidden />
          {actionLabel}
        </Button>
        {isInviteTeam ? (
          <Button variant="outline" onClick={onSecondaryAction}>
            <Copy className="size-4" aria-hidden />
            {emptyStateContent[variant].secondaryActionLabel}
          </Button>
        ) : isNoData ? (
          <Button variant="outline" onClick={onSecondaryAction}>
            <Upload className="size-4" aria-hidden />
            {emptyStateContent[variant].secondaryActionLabel}
          </Button>
        ) : null}
      </div>
    </section>
  )
}

function ChartDataEmptyState({
  title,
  description,
  actionLabel,
  titleId,
  className,
  style,
  onAction,
  ...props
}: Omit<EmptyStateProps, "variant"> & {
  title: string
  description: string
  actionLabel: string
  titleId: string
}) {
  return (
    <section
      data-slot="empty-state"
      data-variant="chart-data-empty"
      aria-labelledby={titleId}
      className={cn("max-w-full rounded-2xl text-center text-card-foreground", className)}
      style={{
        width: "486px",
        height: "320px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "2px dashed var(--border)",
        ...style,
      }}
      {...props}
    >
      <div
        className="flex items-center justify-center rounded-lg bg-muted text-foreground"
        style={{ width: "35px", height: "35px" }}
        aria-hidden
      >
        <BarChart3 style={{ width: "18px", height: "18px" }} />
      </div>
      <h2
        id={titleId}
        className="font-semibold"
        style={{ marginTop: "24px", fontSize: "18px", lineHeight: "24px" }}
      >
        {title}
      </h2>
      <p
        className="text-muted-foreground"
        style={{
          maxWidth: "310px",
          marginTop: "8px",
          fontSize: "16px",
          lineHeight: "22px",
        }}
      >
        {description}
      </p>
      <Button
        className="bg-foreground text-background hover:bg-foreground/85"
        style={{ marginTop: "20px" }}
        onClick={onAction}
      >
        <Plug className="size-4" aria-hidden />
        {actionLabel}
      </Button>
    </section>
  )
}

function SearchEmptyState({
  title,
  description,
  actionLabel,
  secondaryActionLabel,
  titleId,
  className,
  style,
  onAction,
  onSecondaryAction,
  ...props
}: Omit<EmptyStateProps, "variant"> & {
  title: string
  description: string
  actionLabel: string
  secondaryActionLabel: string
  titleId: string
}) {
  return (
    <section
      data-slot="empty-state"
      data-variant="no-search-matches"
      aria-labelledby={titleId}
      className={cn(
        "max-w-full rounded-2xl bg-card p-4 text-center text-card-foreground shadow-sm ring-1 ring-foreground/10",
        className
      )}
      style={{ width: "486px", height: "328px", ...style }}
      {...props}
    >
      <div
        className="flex items-center rounded-lg border border-border bg-card px-3 text-sm"
        style={{ height: "36px", gap: "8px" }}
        role="search"
        aria-label="Current search"
      >
        <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
        <span className="min-w-0 flex-1 truncate text-left">
          integration webhook v3
        </span>
        <X className="size-4 shrink-0 text-muted-foreground" aria-hidden />
      </div>
      <div
        className="flex flex-col items-center"
        style={{ marginTop: "53px" }}
      >
        <div
          className="flex items-center justify-center rounded-lg bg-muted text-foreground"
          style={{ width: "34px", height: "34px" }}
          aria-hidden
        >
          <Search style={{ width: "18px", height: "18px" }} />
        </div>
        <h2
          id={titleId}
          className="font-semibold"
          style={{ marginTop: "20px", fontSize: "18px", lineHeight: "24px" }}
        >
          {title}
        </h2>
        <p
          className="text-sm text-muted-foreground"
          style={{ maxWidth: "350px", marginTop: "8px", lineHeight: "24px" }}
        >
          {description}
        </p>
        <div
          className="flex items-center"
          style={{ marginTop: "18px", gap: "12px" }}
        >
          <Button variant="outline" onClick={onAction}>
            <RotateCcw className="size-4" aria-hidden />
            {actionLabel}
          </Button>
          <Button
            className="bg-foreground text-background hover:bg-foreground/85"
            onClick={onSecondaryAction}
          >
            {secondaryActionLabel}
          </Button>
        </div>
      </div>
    </section>
  )
}

function SplitPanelEmptyState({
  title,
  description,
  actionLabel,
  secondaryActionLabel,
  titleId,
  className,
  style,
  onAction,
  onSecondaryAction,
  ...props
}: Omit<EmptyStateProps, "variant"> & {
  title: string
  description: string
  actionLabel: string
  secondaryActionLabel: string
  titleId: string
}) {
  return (
    <section
      data-slot="empty-state"
      data-variant="split-panel-preview"
      aria-labelledby={titleId}
      className={cn(
        "grid max-w-full overflow-hidden rounded-2xl bg-card text-card-foreground shadow-sm ring-1 ring-foreground/10",
        className
      )}
      style={{
        width: "min(934px, 100%)",
        minHeight: "454px",
        gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
        ...style,
      }}
      {...props}
    >
      <div
        className="flex flex-col justify-center"
        style={{ padding: "48px 44px" }}
      >
        <div
          className="flex items-center justify-center rounded-lg bg-muted text-foreground"
          style={{ width: "35px", height: "35px" }}
          aria-hidden
        >
          <BarChart3 style={{ width: "18px", height: "18px" }} />
        </div>
        <h2
          id={titleId}
          className="mt-6 font-semibold"
          style={{ marginTop: "24px", fontSize: "26px", lineHeight: "32px" }}
        >
          {title}
        </h2>
        <p
          className="mt-2 text-muted-foreground"
          style={{
            maxWidth: "375px",
            marginTop: "8px",
            fontSize: "16px",
            lineHeight: "24px",
          }}
        >
          {description}
        </p>
        <div
          className="flex items-center"
          style={{ marginTop: "24px", gap: "12px" }}
        >
          <Button
            className="bg-foreground text-background hover:bg-foreground/85"
            onClick={onAction}
          >
            <Plus className="size-4" aria-hidden />
            {actionLabel}
          </Button>
          <Button variant="outline" onClick={onSecondaryAction}>
            <Eye className="size-4" aria-hidden />
            {secondaryActionLabel}
          </Button>
        </div>
      </div>
      <ReportPreview />
    </section>
  )
}

function ReportPreview() {
  const bars = [96, 156, 116, 142, 178, 78]

  return (
    <div
      className="relative overflow-hidden border-l border-border"
      style={{
        backgroundImage:
          "radial-gradient(circle, var(--border) 1px, transparent 1px)",
        backgroundPosition: "10px 10px",
        backgroundSize: "20px 20px",
      }}
      aria-hidden
    >
      <div
        className="absolute right-10 bottom-10 left-10 flex items-end justify-between"
        style={{ gap: "18px", opacity: 0.5 }}
      >
        {bars.map((height, index) => (
          <span
            key={index}
            className="flex-1 rounded-t-lg bg-muted"
            style={{ height: `${height}px` }}
          />
        ))}
      </div>
    </div>
  )
}

function DataPreview({
  animated = false,
  ...props
}: ComponentProps<"div"> & { animated?: boolean }) {
  const reduceMotion = useReducedMotion()
  const layerStyle = {
    border: "1px solid var(--border)",
    background: "var(--card)",
  }
  const shouldAnimate = animated && !reduceMotion

  const layers = (
    <>
      <DataPreviewLayer
        animated={shouldAnimate}
        delay={0}
        className="rounded-2xl"
        style={{
          ...layerStyle,
          top: "0",
          left: "17px",
          width: "218px",
          height: "62px",
        }}
      />
      <DataPreviewLayer
        animated={shouldAnimate}
        delay={0.12}
        className="rounded-2xl"
        style={{
          ...layerStyle,
          top: "10px",
          left: "8px",
          width: "236px",
          height: "62px",
        }}
      />
      <DataPreviewLayer
        animated={shouldAnimate}
        delay={0.24}
        className="rounded-2xl shadow-sm"
        style={{
          ...layerStyle,
          top: "20px",
          left: "0",
          width: "252px",
          height: "60px",
        }}
      >
        <span
          className="absolute rounded-lg"
          style={{
            top: "13px",
            left: "17px",
            width: "35px",
            height: "35px",
            background: "var(--muted)",
          }}
        />
        <span
          className="absolute rounded-full"
          style={{
            top: "14px",
            left: "66px",
            width: "159px",
            height: "10px",
            background: "var(--muted)",
          }}
        />
        <span
          className="absolute rounded-full"
          style={{
            top: "34px",
            left: "66px",
            width: "105px",
            height: "10px",
            background: "var(--muted)",
          }}
        />
      </DataPreviewLayer>
    </>
  )

  return (
    <div
      className="relative"
      style={{ width: "252px", height: "80px" }}
      {...props}
    >
      {layers}
    </div>
  )
}

function DataPreviewLayer({
  animated,
  delay,
  className,
  style,
  children,
}: {
  animated: boolean
  delay: number
  className: string
  style: CSSProperties
  children?: ReactNode
}) {
  const sharedProps = {
    className: cn("absolute", className),
    style,
    children,
  }

  if (!animated) return <div {...sharedProps} />

  return (
    <motion.div
      {...sharedProps}
      initial={{ opacity: 0, y: 24, scale: 0.82 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay,
        duration: 0.48,
        ease: [0.22, 1, 0.36, 1],
      }}
    />
  )
}
