"use client"

import {
  AlertCircle,
  Code2,
  Folder,
  Megaphone,
  MoreVertical,
  PenLine,
  Search,
  type LucideIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  avatarUrl,
  crmProjects,
  projects,
  type CrmProject,
  type Project,
} from "@/components/dashboard/data"
import { cn } from "@/lib/utils"

const projectIcons: Record<Project["icon"], LucideIcon> = {
  folder: Folder,
  code: Code2,
  megaphone: Megaphone,
  alert: AlertCircle,
  pen: PenLine,
}

function ProjectIcon({
  project,
}: {
  project: Pick<Project, "icon" | "iconBg" | "iconColor">
}) {
  const Icon = projectIcons[project.icon]
  return (
    <div
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-full",
        project.iconBg,
        project.iconColor
      )}
    >
      <Icon className="size-[18px]" />
    </div>
  )
}

function DefaultTopProjects({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "min-w-0 flex-1 rounded-2xl border-0 bg-card shadow-none ring-1 ring-border",
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0">
        <CardTitle className="text-base font-semibold">Top Projects</CardTitle>
        <div className="relative w-full max-w-[200px]">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search"
            className="h-9 rounded-full border-border bg-background pl-8 text-sm shadow-none"
          />
        </div>
      </CardHeader>

      <CardContent className="px-0 pb-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-10 pl-5">
                <Checkbox aria-label="Select all" />
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground">
                Project Name
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground">
                Manager
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground">
                Team
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground">
                Progress
              </TableHead>
              <TableHead className="pr-5 text-right text-xs font-medium text-muted-foreground">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id} className="border-border/70">
                <TableCell className="pl-5">
                  <Checkbox aria-label={`Select ${project.name}`} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <ProjectIcon project={project} />
                    <div>
                      <p className="font-medium text-foreground">
                        {project.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {project.date}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {project.manager}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      {project.team.slice(0, 3).map((member) => (
                        <Avatar
                          key={member}
                          size="sm"
                          className="size-7 border-2 border-card"
                        >
                          <AvatarImage src={avatarUrl(member)} alt={member} />
                          <AvatarFallback>
                            {member.slice(0, 1).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    {project.extra > 0 && (
                      <span className="ml-2 rounded-full bg-muted px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                        +{project.extra}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${project.progress}%`,
                        backgroundColor: project.progressColor,
                      }}
                    />
                  </div>
                </TableCell>
                <TableCell className="pr-5 text-right">
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    className="text-muted-foreground"
                  >
                    <MoreVertical className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-3">
          <p className="text-xs text-muted-foreground">
            Showing 1 to 5 of 10 entries
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs text-muted-foreground"
            >
              ← Previous
            </Button>
            <Button size="sm" className="size-8 rounded-lg p-0 text-xs">
              1
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="size-8 rounded-lg p-0 text-xs text-muted-foreground"
            >
              2
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs text-muted-foreground"
            >
              Next →
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function CrmTopProjects({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "min-w-0 flex-1 rounded-xl border-0 bg-card shadow-none ring-1 ring-border",
        className
      )}
    >
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
        <div className="space-y-0.5">
          <CardTitle className="text-lg font-medium leading-7">Top Projects</CardTitle>
          <p className="text-sm leading-5 text-muted-foreground">
            Checkout the statistics of top projects
          </p>
        </div>
        <div className="relative w-full max-w-[215px]">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search"
            className="h-9 rounded-md border-border bg-background pl-8 text-sm shadow-none"
          />
        </div>
      </CardHeader>

      <CardContent className="px-0 pb-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-10 pl-6 text-sm font-medium text-foreground">
                #
              </TableHead>
              <TableHead className="text-sm font-medium text-foreground">
                Project Name
              </TableHead>
              <TableHead className="text-sm font-medium text-foreground">
                Budget
              </TableHead>
              <TableHead className="text-sm font-medium text-foreground">
                Manager
              </TableHead>
              <TableHead className="text-sm font-medium text-foreground">
                Progress
              </TableHead>
              <TableHead className="pr-6 text-right text-sm font-medium text-foreground">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {crmProjects.map((project: CrmProject) => (
              <TableRow key={project.id} className="border-border/70">
                <TableCell className="pl-6">
                  <Checkbox aria-label={`Select ${project.name}`} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <ProjectIcon project={project} />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {project.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {project.date}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-foreground">
                  {project.budget}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-9">
                      <AvatarImage
                        src={avatarUrl(project.manager)}
                        alt={project.manager}
                      />
                      <AvatarFallback>
                        {project.manager.slice(0, 1)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate text-base text-foreground">
                        {project.manager}
                      </p>
                      <p className="truncate text-sm text-muted-foreground">
                        {project.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="h-1.5 w-[76px] overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${project.progress}%`,
                        backgroundColor: project.progressColor,
                      }}
                    />
                  </div>
                </TableCell>
                <TableCell className="pr-6 text-right">
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    className="text-muted-foreground"
                  >
                    <MoreVertical className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export function TopProjectsTable({
  className,
  variant = "default",
}: {
  className?: string
  variant?: "default" | "crm"
}) {
  if (variant === "crm") {
    return <CrmTopProjects className={className} />
  }
  return <DefaultTopProjects className={className} />
}
