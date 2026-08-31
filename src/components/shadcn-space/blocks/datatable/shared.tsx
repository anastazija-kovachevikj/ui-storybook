"use client"

import type { ReactNode } from "react"

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

export function PersonCell({
  name,
  detail,
  avatar,
  className,
}: {
  name: string
  detail?: string
  avatar?: string
  className?: string
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Avatar size="sm" className="size-10">
        {avatar ? <AvatarImage src={avatar} alt="" /> : null}
        <AvatarFallback>{initials(name)}</AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <div className="truncate text-sm font-medium">{name}</div>
        {detail ? (
          <div className="truncate text-xs text-muted-foreground">{detail}</div>
        ) : null}
      </div>
    </div>
  )
}

export function LetterAvatarGroup({ letters }: { letters: string[] }) {
  return (
    <AvatarGroup>
      {letters.map((letter) => (
        <Avatar key={letter} size="sm">
          <AvatarFallback>{letter}</AvatarFallback>
        </Avatar>
      ))}
    </AvatarGroup>
  )
}

const softBadgeColors: Record<string, string> = {
  Active: "border-0 bg-success/10 text-success shadow-none hover:bg-success/10",
  Inactive:
    "border-0 bg-destructive/10 text-destructive shadow-none hover:bg-destructive/10",
  Pending: "border-0 bg-warning/10 text-warning shadow-none hover:bg-warning/10",
  Open: "border-0 bg-primary/10 text-primary shadow-none hover:bg-primary/10",
  "In Progress":
    "border-0 bg-chart-1/10 text-chart-1 shadow-none hover:bg-chart-1/10",
  Resolved: "border-0 bg-success/10 text-success shadow-none hover:bg-success/10",
  Closed: "border-0 bg-muted text-muted-foreground shadow-none hover:bg-muted",
  High: "border-0 bg-warning/10 text-warning shadow-none hover:bg-warning/10",
  Medium: "border-0 bg-warning/10 text-warning shadow-none hover:bg-warning/10",
  Critical:
    "border-0 bg-destructive/10 text-destructive shadow-none hover:bg-destructive/10",
  Low: "border-0 bg-success/10 text-success shadow-none hover:bg-success/10",
  Qualified:
    "border-0 bg-success/10 text-success shadow-none hover:bg-success/10",
  Discovery: "border-0 bg-primary/10 text-primary shadow-none hover:bg-primary/10",
  Proposal: "border-0 bg-chart-1/10 text-chart-1 shadow-none hover:bg-chart-1/10",
  Negotiation:
    "border-0 bg-warning/10 text-warning shadow-none hover:bg-warning/10",
  Lost: "border-0 bg-destructive/10 text-destructive shadow-none hover:bg-destructive/10",
  active: "border-0 bg-success/10 text-success shadow-none hover:bg-success/10",
  cancel:
    "border-0 bg-destructive/10 text-destructive shadow-none hover:bg-destructive/10",
  pending: "border-0 bg-warning/10 text-warning shadow-none hover:bg-warning/10",
}

export function SoftBadge({
  value,
  className,
}: {
  value: string
  className?: string
}) {
  return (
    <Badge
      className={cn(
        softBadgeColors[value] ??
          "border-0 bg-muted text-muted-foreground shadow-none",
        className
      )}
    >
      {value}
    </Badge>
  )
}

export function ChipList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <Badge
          key={item}
          variant="secondary"
          className="rounded-md font-normal"
        >
          {item}
        </Badge>
      ))}
    </div>
  )
}

export function CourseIcon({ title }: { title: string }) {
  return (
    <span
      aria-hidden
      className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-semibold text-primary"
    >
      {initials(title).slice(0, 2)}
    </span>
  )
}

export function ProjectIcon({ name }: { name: string }) {
  return (
    <span
      aria-hidden
      className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-semibold text-foreground"
    >
      {initials(name).slice(0, 2)}
    </span>
  )
}

export function TableFrame({
  children,
  className,
  toolbar,
  footer,
}: {
  children: ReactNode
  className?: string
  toolbar?: ReactNode
  footer?: ReactNode
}) {
  return (
    <div className={cn("w-full", className)}>
      {toolbar ? <div className="mb-3">{toolbar}</div> : null}
      <div className="overflow-hidden rounded-md border border-border">
        {children}
      </div>
      {footer ? <div className="mt-3">{footer}</div> : null}
    </div>
  )
}

export const nativeSelectClassName =
  "h-9 rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
