"use client"

import { useState, type ComponentType } from "react"
import {
  Building2,
  ClipboardList,
  FileStack,
  FileCheck2,
  Home,
  Menu,
  ShieldCheck,
  Store,
  Stethoscope,
  X,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { currentUser } from "@/components/dashboard/data"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

type NavItem = {
  label: string
  icon: ComponentType<{ className?: string }>
  href: string
}

const primaryNav: NavItem[] = [
  { label: "Dashboard", icon: Home, href: "/dashboard" },
  { label: "Risk assessments", icon: ShieldCheck, href: "/risk-assessments" },
  { label: "Policies", icon: FileCheck2, href: "/policies" },
  { label: "Proposals", icon: FileStack, href: "/proposals" },
]

const referenceNav: NavItem[] = [
  { label: "Veterinarians", icon: Stethoscope, href: "/veterinarians" },
  { label: "Vet clinics", icon: Building2, href: "/vet-clinics" },
  { label: "Vendor fields", icon: Store, href: "/vendors/allianz" },
]

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  return pathname.startsWith(href)
}

function NavList({ items, pathname }: { items: NavItem[]; pathname: string }) {
  return (
    <ul className="space-y-0.5">
      {items.map((item) => {
        const Icon = item.icon
        const active = isActive(pathname, item.href)

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/70 hover:text-sidebar-foreground"
              )}
            >
              <Icon className="size-4 shrink-0 opacity-90" />
              <span className="flex-1 text-left">{item.label}</span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

function SidebarBody({
  pathname,
  onNavigate,
}: {
  pathname: string
  onNavigate?: () => void
}) {
  return (
    <>
      <div className="flex h-16 items-center gap-2.5 px-5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary text-xs font-bold tracking-tight text-sidebar-primary-foreground">
          CU
        </div>
        <div className="min-w-0 leading-tight">
          <p className="truncate text-sm font-semibold text-sidebar-foreground">
            ClaimUW
          </p>
          <p className="truncate text-[11px] text-sidebar-foreground/55">
            Operations
          </p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-4" onClick={onNavigate}>
        <p className="mb-1.5 px-3 text-[11px] font-semibold tracking-wider text-sidebar-foreground/45">
          Work
        </p>
        <NavList items={primaryNav} pathname={pathname} />

        <p className="mt-5 mb-1.5 px-3 text-[11px] font-semibold tracking-wider text-sidebar-foreground/45">
          Reference
        </p>
        <NavList items={referenceNav} pathname={pathname} />

        <p className="mt-5 mb-1.5 px-3 text-[11px] font-semibold tracking-wider text-sidebar-foreground/45">
          Queues
        </p>
        <div className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-sidebar-foreground/45">
          <ClipboardList className="size-4 shrink-0" />
          <span>Claims</span>
          <span className="ml-auto text-[11px]">Soon</span>
        </div>
      </nav>

      <Separator className="bg-sidebar-border" />

      <div className="flex items-center gap-2.5 px-4 py-3">
        <div className="flex size-8 items-center justify-center rounded-full bg-sidebar-accent text-[11px] font-medium text-sidebar-accent-foreground">
          {currentUser.initials}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-sidebar-foreground">
            {currentUser.name}
          </p>
          <p className="truncate text-[11px] text-sidebar-foreground/55">
            {currentUser.email}
          </p>
        </div>
      </div>
    </>
  )
}

export function DashboardSidebar({
  className,
  open,
  onOpenChange,
}: {
  className?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const pathname = usePathname()
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  const mobileOpen = open ?? uncontrolledOpen
  const setMobileOpen = onOpenChange ?? setUncontrolledOpen
  const showFab = onOpenChange == null

  return (
    <>
      <aside
        className={cn(
          "hidden h-full w-[240px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:flex",
          className
        )}
      >
        <SidebarBody pathname={pathname} />
      </aside>

      {showFab && (
        <Button
          variant="secondary"
          size="icon"
          className="fixed bottom-4 left-4 z-40 size-10 rounded-full shadow-md lg:hidden"
          aria-label="Open navigation"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="size-4" />
        </Button>
      )}

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-foreground/40"
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative flex h-full w-[240px] flex-col bg-sidebar text-sidebar-foreground shadow-xl">
            <Button
              variant="ghost"
              size="icon-sm"
              className="absolute top-3 right-3 text-sidebar-foreground/70"
              aria-label="Close navigation"
              onClick={() => setMobileOpen(false)}
            >
              <X className="size-4" />
            </Button>
            <SidebarBody
              pathname={pathname}
              onNavigate={() => setMobileOpen(false)}
            />
          </aside>
        </div>
      )}
    </>
  )
}
