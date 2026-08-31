import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Search,
  Star,
} from "lucide-react"
import { expect, within } from "storybook/test"

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTable } from "@/components/ui/data-table"
import { Input } from "@/components/ui/input"
import {
  paymentColumns,
  payments,
} from "@/components/ui/payments-columns"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const meta = {
  title: "Components/Table",
  component: Table,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Default is the shadcn Data Table (TanStack Table) payments demo from https://ui.shadcn.com/docs/components/base/data-table, plus 11 dashboard variants from https://shadcnspace.com/blocks/dashboard-ui/tables (Tables 01–11).",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-full max-w-5xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

async function expectColumnHeaders(
  canvasElement: HTMLElement,
  headers: string[]
) {
  const canvas = within(canvasElement)
  for (const header of headers) {
    await expect(
      canvas.getByRole("columnheader", { name: header })
    ).toBeInTheDocument()
  }
  const rows = canvas.getAllByRole("row")
  await expect(rows.length).toBeGreaterThan(1)
}

function PersonCell({
  name,
  detail,
  initials,
}: {
  name: string
  detail?: string
  initials: string
}) {
  return (
    <div className="flex items-center gap-2">
      <Avatar size="sm">
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <div className="truncate font-medium">{name}</div>
        {detail ? (
          <div className="truncate text-xs text-muted-foreground">{detail}</div>
        ) : null}
      </div>
    </div>
  )
}

/** Simple line sparkline used by Project Tracking Activity Log. */
function Sparkline({ values }: { values: number[] }) {
  const max = Math.max(...values, 1)
  const points = values
    .map((v, i) => {
      const x = (i / Math.max(values.length - 1, 1)) * 64
      const y = 20 - (v / max) * 16
      return `${x},${y}`
    })
    .join(" ")
  return (
    <svg
      aria-hidden
      viewBox="0 0 64 24"
      className="h-6 w-16 text-primary"
      role="img"
    >
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        points={points}
      />
    </svg>
  )
}

type ProjectBrand = "photoshop" | "seo" | "ios" | "figma" | "react"

function ProjectBrandIcon({ brand }: { brand: ProjectBrand }) {
  if (brand === "photoshop") {
    return (
      <span
        aria-hidden
        className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#31A8FF] text-[11px] font-bold tracking-tight text-white shadow-sm"
      >
        Ps
      </span>
    )
  }
  if (brand === "seo") {
    return (
      <span
        aria-hidden
        className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-teal-50 shadow-sm"
      >
        <svg viewBox="0 0 24 24" className="size-5 text-teal-500">
          <path
            fill="currentColor"
            d="M12 2.5 20.5 12 12 21.5 3.5 12 12 2.5Zm0 4.2L7.7 12 12 16.3 16.3 12 12 6.7Z"
          />
        </svg>
      </span>
    )
  }
  if (brand === "ios") {
    return (
      <span
        aria-hidden
        className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#7C3AED] text-[10px] font-bold tracking-wide text-white shadow-sm"
      >
        WS
      </span>
    )
  }
  if (brand === "figma") {
    return (
      <span
        aria-hidden
        className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 shadow-sm"
      >
        <svg viewBox="0 0 24 24" className="size-5">
          <path fill="#F24E1E" d="M8 2h4a3 3 0 0 1 0 6H8V2Z" />
          <path fill="#A259FF" d="M8 8h4a3 3 0 0 1 0 6H8V8Z" />
          <path fill="#1ABCFE" d="M8 14h4a3 3 0 1 1-3 3v-3Z" />
          <path fill="#0ACF83" d="M12 2h4a3 3 0 1 1 0 6h-4V2Z" />
          <circle cx="15" cy="11" r="3" fill="#FF7262" />
        </svg>
      </span>
    )
  }
  return (
    <span
      aria-hidden
      className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-cyan-50 shadow-sm"
    >
      <svg viewBox="0 0 24 24" className="size-5 text-cyan-500">
        <circle cx="12" cy="12" r="2.2" fill="currentColor" />
        <ellipse
          cx="12"
          cy="12"
          rx="9"
          ry="3.6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="9"
          ry="3.6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          transform="rotate(60 12 12)"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="9"
          ry="3.6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          transform="rotate(120 12 12)"
        />
      </svg>
    </span>
  )
}

function PaginationChrome({
  label = "Showing 1–5 of 15",
}: {
  label?: string
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-1 pt-3 text-sm text-muted-foreground">
      <span>{label}</span>
      <div className="flex items-center gap-1">
        <Button variant="outline" size="icon-sm" aria-label="Previous page">
          <ChevronLeft />
        </Button>
        <Button variant="outline" size="sm">
          1
        </Button>
        <Button variant="outline" size="icon-sm" aria-label="Next page">
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}

/** Default — shadcn Data Table (payments) from ui.shadcn.com */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    await expectColumnHeaders(canvasElement, ["Status", "Email", "Amount"])
    const canvas = within(canvasElement)
    await expect(canvas.getByText("ken99@example.com")).toBeInTheDocument()
    await expect(canvas.getByText(/0 of 5 row/i)).toBeInTheDocument()
    await expect(
      canvas.getByPlaceholderText("Filter emails...")
    ).toBeInTheDocument()
  },
  render: () => <DataTable columns={paymentColumns} data={payments} />,
}

const projects01 = [
  {
    name: "Web App Project",
    date: "04 June 2026",
    budget: "$12,000",
    manager: "Olivia Rhye",
    email: "olivia@example.com",
    initials: "OR",
    progress: 78,
  },
  {
    name: "MaterialM Admin",
    date: "09 January 2026",
    budget: "$8,000",
    manager: "Barbara Steele",
    email: "barbara@example.com",
    initials: "BS",
    progress: 45,
  },
  {
    name: "Digital Marketing",
    date: "15 April 2026",
    budget: "$15,000",
    manager: "Leonard Gordon",
    email: "leonard@example.com",
    initials: "LG",
    progress: 92,
  },
  {
    name: "Shadcn Space Design",
    date: "30 March 2026",
    budget: "$1,000",
    manager: "Evelyn Pope",
    email: "evelyn@example.com",
    initials: "EP",
    progress: 34,
  },
  {
    name: "Graphic Design",
    date: "23 October 2026",
    budget: "$7,000",
    manager: "Tommy Garza",
    email: "tommy@example.com",
    initials: "TG",
    progress: 61,
  },
]

/** Table 01 — Project Management */
export const ProjectManagement: Story = {
  name: "01 Project Management",
  play: async ({ canvasElement }) => {
    await expectColumnHeaders(canvasElement, [
      "#",
      "Project Name",
      "Budget",
      "Manager",
      "Progress",
      "Action",
    ])
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Web App Project")).toBeInTheDocument()
    await expect(canvas.getByPlaceholderText("Search projects...")).toBeInTheDocument()
  },
  render: () => (
    <Card>
      <CardHeader className="border-b">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <CardTitle>Top Projects</CardTitle>
            <p className="text-sm text-muted-foreground">
              Checkout the statistics of top projects
            </p>
          </div>
          <div className="relative w-56">
            <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-8"
              placeholder="Search projects..."
              aria-label="Search projects"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-(--card-spacing)">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">#</TableHead>
              <TableHead>Project Name</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Manager</TableHead>
              <TableHead className="w-40">Progress</TableHead>
              <TableHead className="w-16">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects01.map((row, i) => (
              <TableRow key={row.name}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>
                  <div className="font-medium">{row.name}</div>
                  <div className="text-xs text-muted-foreground">{row.date}</div>
                </TableCell>
                <TableCell>{row.budget}</TableCell>
                <TableCell>
                  <PersonCell
                    name={row.manager}
                    detail={row.email}
                    initials={row.initials}
                  />
                </TableCell>
                <TableCell>
                  <Progress value={row.progress} className="min-w-28" />
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${row.name}`}>
                    <MoreHorizontal />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <PaginationChrome />
      </CardContent>
    </Card>
  ),
}

const invoices02 = [
  {
    id: "#5099",
    status: "Paid",
    name: "Olivia Rhye",
    role: "UI/UX designer",
    initials: "OR",
    total: "$3,120",
    issued: "03 Apr 2025",
  },
  {
    id: "#5008",
    status: "Draft",
    name: "Barbara Steele",
    role: "Frontend developer",
    initials: "BS",
    total: "$1,450",
    issued: "12 May 2025",
  },
  {
    id: "#5101",
    status: "Draft",
    name: "Leonard Gordon",
    role: "Graphic designer",
    initials: "LG",
    total: "$1,200",
    issued: "26 Jun 2025",
  },
  {
    id: "#4586",
    status: "Paid",
    name: "Evelyn Pope",
    role: "UI/UX designer",
    initials: "EP",
    total: "$2,680",
    issued: "05 Jul 2025",
  },
  {
    id: "#4360",
    status: "Paid",
    name: "Tommy Garza",
    role: "Backend developer",
    initials: "TG",
    total: "$3,120",
    issued: "07 Aug 2025",
  },
]

/** Table 02 — Invoice Management */
export const InvoiceManagement: Story = {
  name: "02 Invoice Management",
  play: async ({ canvasElement }) => {
    await expectColumnHeaders(canvasElement, [
      "ID",
      "Status",
      "Customer",
      "Total",
      "Issued Date",
      "Actions",
    ])
    const canvas = within(canvasElement)
    await expect(canvas.getByText("#5099")).toBeInTheDocument()
    await expect(canvas.getByText("Show")).toBeInTheDocument()
  },
  render: () => (
    <Card>
      <CardHeader className="border-b">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm text-muted-foreground">Show</span>
          <Button variant="outline" size="sm">
            5
          </Button>
          <Button variant="outline" size="sm">
            All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-(--card-spacing)">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <Checkbox aria-label="Select all invoices" />
              </TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Issued Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices02.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Checkbox aria-label={`Select ${row.id}`} />
                </TableCell>
                <TableCell className="font-medium">{row.id}</TableCell>
                <TableCell>
                  <Badge
                    variant={row.status === "Paid" ? "success" : "outline"}
                  >
                    {row.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <PersonCell
                    name={row.name}
                    detail={row.role}
                    initials={row.initials}
                  />
                </TableCell>
                <TableCell>{row.total}</TableCell>
                <TableCell>{row.issued}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${row.id}`}>
                    <MoreHorizontal />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <PaginationChrome label="Showing 5 of 15 entries" />
      </CardContent>
    </Card>
  ),
}

const courses03 = [
  {
    title: "Top Authors",
    subtitle: "Successful Fellas",
    initials: "TA",
    tags: ["Angular", "PHP"],
    users: "4300 Users",
  },
  {
    title: "Popular Authors",
    subtitle: "Most Successful",
    initials: "PA",
    tags: ["Bootstrap"],
    users: "1200 Users",
  },
  {
    title: "New Users",
    subtitle: "Awesome Users",
    initials: "NU",
    tags: ["Reactjs", "Angular"],
    users: "2000 Users",
  },
  {
    title: "Active Customers",
    subtitle: "Best Customers",
    initials: "AC",
    tags: ["Bootstrap"],
    users: "1500 Users",
  },
  {
    title: "Bestseller Theme",
    subtitle: "Amazing Templates",
    initials: "BT",
    tags: ["Angular", "Reactjs"],
    users: "9500 Users",
  },
]

/** Table 03 — Course Assignment Overview */
export const CourseAssignmentOverview: Story = {
  name: "03 Course Assignment Overview",
  play: async ({ canvasElement }) => {
    await expectColumnHeaders(canvasElement, ["Authors", "Courses", "Users"])
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Top Authors")).toBeInTheDocument()
    await expect(canvas.getByText("4300 Users")).toBeInTheDocument()
  },
  render: () => (
    <Card>
      <CardContent className="pt-(--card-spacing)">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Authors</TableHead>
              <TableHead>Courses</TableHead>
              <TableHead>Users</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses03.map((row) => (
              <TableRow key={row.title}>
                <TableCell>
                  <PersonCell
                    name={row.title}
                    detail={row.subtitle}
                    initials={row.initials}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {row.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{row.users}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon-sm" aria-label={`Open ${row.title}`}>
                    <MoreHorizontal />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  ),
}

const revenue04 = [
  {
    product: "Minecraf App",
    assignee: "Jason Roy",
    initials: "JR",
    progress: 73.2,
    priority: "Medium",
    budget: "$3.5K",
  },
  {
    product: "Web App Project",
    assignee: "Mathew Flintoff",
    initials: "MF",
    progress: 73.2,
    priority: "Very High",
    budget: "$24.5K",
  },
  {
    product: "Modernize Dashboard",
    assignee: "Anil Kumar",
    initials: "AK",
    progress: 73.2,
    priority: "Low",
    budget: "$12.8K",
  },
  {
    product: "Dashboard Co",
    assignee: "George Cruize",
    initials: "GC",
    progress: 73.2,
    priority: "High",
    budget: "$2.4K",
  },
]

function priorityVariant(priority: string) {
  if (priority === "Very High" || priority === "High") return "destructive" as const
  if (priority === "Medium") return "secondary" as const
  return "outline" as const
}

/** Table 04 — Revenue Tracker */
export const RevenueTracker: Story = {
  name: "04 Revenue Tracker",
  play: async ({ canvasElement }) => {
    await expectColumnHeaders(canvasElement, [
      "Assigned",
      "Progress",
      "Priority",
      "Budget",
    ])
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Minecraf App")).toBeInTheDocument()
    await expect(canvas.getByText("Revenue by Product")).toBeInTheDocument()
  },
  render: () => (
    <Card>
      <CardHeader className="border-b">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <CardTitle>Revenue by Product</CardTitle>
            <p className="text-sm text-muted-foreground">Sep 2026</p>
          </div>
          <div className="flex flex-wrap gap-1">
            {["App", "Mobile", "SaaS", "Others"].map((filter) => (
              <Button key={filter} variant="outline" size="sm">
                {filter}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-(--card-spacing)">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Assigned</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Budget</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {revenue04.map((row) => (
              <TableRow key={row.product}>
                <TableCell>
                  <PersonCell
                    name={row.product}
                    detail={row.assignee}
                    initials={row.initials}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex min-w-28 items-center gap-2">
                    <Progress value={row.progress} className="flex-1" />
                    <span className="text-xs tabular-nums text-muted-foreground">
                      {row.progress}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={priorityVariant(row.priority)}>
                    {row.priority}
                  </Badge>
                </TableCell>
                <TableCell>{row.budget}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  ),
}

const transactions05 = [
  { status: "success", email: "ken99@example.com", amount: "$316.00" },
  { status: "success", email: "abe45@example.com", amount: "$242.00" },
  { status: "processing", email: "monserrat44@example.com", amount: "$837.00" },
  { status: "success", email: "silas22@example.com", amount: "$874.00" },
  { status: "failed", email: "carmella@example.com", amount: "$721.00" },
]

function statusBadgeVariant(status: string) {
  if (status === "success") return "success" as const
  if (status === "failed") return "destructive" as const
  return "outline" as const
}

/** Table 05 — Transaction Status */
export const TransactionStatus: Story = {
  name: "05 Transaction Status",
  play: async ({ canvasElement }) => {
    await expectColumnHeaders(canvasElement, ["Status", "Email", "Amount"])
    const canvas = within(canvasElement)
    await expect(canvas.getByText("ken99@example.com")).toBeInTheDocument()
    await expect(canvas.getByText(/0 of 5 row/i)).toBeInTheDocument()
  },
  render: () => (
    <Card>
      <CardContent className="pt-(--card-spacing)">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <Checkbox aria-label="Select all transactions" />
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions05.map((row) => (
              <TableRow key={row.email}>
                <TableCell>
                  <Checkbox aria-label={`Select ${row.email}`} />
                </TableCell>
                <TableCell>
                  <Badge variant={statusBadgeVariant(row.status)}>
                    {row.status}
                  </Badge>
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell className="font-medium">{row.amount}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${row.email}`}>
                    <MoreHorizontal />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between gap-3 px-1 pt-3 text-sm text-muted-foreground">
          <span>0 of 5 row(s) selected.</span>
          <div className="flex gap-1">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
}

const subscriptions06 = [
  {
    name: "Olivia Rhye",
    email: "olivia@example.com",
    initials: "OR",
    role: "Maintainer",
    plan: "Enterprise",
    billing: "Auto debit",
    status: "Active",
  },
  {
    name: "Barbara Steele",
    email: "barbara@example.com",
    initials: "BS",
    role: "Admin",
    plan: "Enterprise",
    billing: "Auto debit",
    status: "Inactive",
  },
  {
    name: "Leonard Gordon",
    email: "leonard@example.com",
    initials: "LG",
    role: "Editor",
    plan: "Team",
    billing: "Manual - PayPal",
    status: "Active",
  },
  {
    name: "Evelyn Pope",
    email: "evelyn@example.com",
    initials: "EP",
    role: "Author",
    plan: "Basic",
    billing: "Manual - cash",
    status: "Pending",
  },
  {
    name: "Tommy Garza",
    email: "tommy@example.com",
    initials: "TG",
    role: "Subscriber",
    plan: "Company",
    billing: "Auto debit",
    status: "Inactive",
  },
  {
    name: "Isabel Vasquez",
    email: "isabel@example.com",
    initials: "IV",
    role: "Editor",
    plan: "Team",
    billing: "Auto debit",
    status: "Active",
  },
]

/** Table 06 — User Subscription Management */
export const UserSubscriptionManagement: Story = {
  name: "06 User Subscription Management",
  play: async ({ canvasElement }) => {
    await expectColumnHeaders(canvasElement, [
      "User",
      "Role",
      "Plan",
      "Billing",
      "Status",
      "Actions",
    ])
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Olivia Rhye")).toBeInTheDocument()
    await expect(canvas.getByText("Select Role")).toBeInTheDocument()
  },
  render: () => (
    <Card>
      <CardHeader className="border-b">
        <div className="flex flex-wrap items-center gap-3">
          {[
            ["Select Role", "All"],
            ["Select Plan", "All"],
            ["Select Status", "All"],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{label}</span>
              <Button variant="outline" size="sm">
                {value}
              </Button>
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent className="pt-(--card-spacing)">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <Checkbox aria-label="Select all users" />
              </TableHead>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Billing</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscriptions06.map((row) => (
              <TableRow key={row.email}>
                <TableCell>
                  <Checkbox aria-label={`Select ${row.name}`} />
                </TableCell>
                <TableCell>
                  <PersonCell
                    name={row.name}
                    detail={row.email}
                    initials={row.initials}
                  />
                </TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.plan}</TableCell>
                <TableCell>{row.billing}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      row.status === "Active"
                        ? "success"
                        : row.status === "Pending"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {row.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${row.name}`}>
                    <MoreHorizontal />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  ),
}

const overview07 = [
  {
    name: "Sunil Joshi",
    role: "Web Designer",
    initials: "SJ",
    project: "Elite Admin",
    team: ["S", "W"],
    status: "Active",
    budget: "$3.9k",
  },
  {
    name: "Andrew McDownland",
    role: "Project Manager",
    initials: "AM",
    project: "Real Homes WP Theme",
    team: ["N", "X", "A"],
    status: "Pending",
    budget: "$24.5k",
  },
  {
    name: "Christopher Jamil",
    role: "Project Manager",
    initials: "CJ",
    project: "MedicalPro WP Theme",
    team: ["X"],
    status: "Completed",
    budget: "$12.8k",
  },
  {
    name: "Nirav Joshi",
    role: "Frontend Engineer",
    initials: "NJ",
    project: "Hosting Press HTML",
    team: ["X", "Y"],
    status: "Active",
    budget: "$2.4k",
  },
  {
    name: "Micheal Doe",
    role: "Content Writer",
    initials: "MD",
    project: "Helping Hands WP Theme",
    team: ["S"],
    status: "Cancel",
    budget: "$9.3k",
  },
]

/** Table 07 — Project Overview */
export const ProjectOverview: Story = {
  name: "07 Project Overview",
  play: async ({ canvasElement }) => {
    await expectColumnHeaders(canvasElement, [
      "User",
      "Project Name",
      "Team",
      "Status",
      "Budget",
    ])
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Elite Admin")).toBeInTheDocument()
  },
  render: () => (
    <Card>
      <CardContent className="pt-(--card-spacing)">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Project Name</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Budget</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {overview07.map((row) => (
              <TableRow key={row.name}>
                <TableCell>
                  <PersonCell
                    name={row.name}
                    detail={row.role}
                    initials={row.initials}
                  />
                </TableCell>
                <TableCell className="font-medium">{row.project}</TableCell>
                <TableCell>
                  <AvatarGroup>
                    {row.team.map((member) => (
                      <Avatar key={member} size="sm">
                        <AvatarFallback>{member}</AvatarFallback>
                      </Avatar>
                    ))}
                  </AvatarGroup>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      row.status === "Active" || row.status === "Completed"
                        ? "success"
                        : row.status === "Pending"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {row.status}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{row.budget}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  ),
}

const products08 = [
  {
    name: "MaterialM - Admin",
    subtitle: "Dashboard Template",
    initials: "MM",
    category: "Mobile",
    sales: "2,350",
    earnings: "$24,235",
    tech: ["Ps"],
  },
  {
    name: "MatDash - Admin",
    subtitle: "Dashboard Template",
    initials: "MD",
    category: "Web App",
    sales: "1,630",
    earnings: "$13,699",
    tech: ["Fg", "Vu"],
  },
  {
    name: "Spike - Admin",
    subtitle: "Dashboard Template",
    initials: "SP",
    category: "Website",
    sales: "480",
    earnings: "$13,699",
    tech: ["Xd", "Bs"],
  },
  {
    name: "Modernize - Admin",
    subtitle: "Dashboard Template",
    initials: "MZ",
    category: "Marketing",
    sales: "874",
    earnings: "$10,250",
    tech: ["Ng"],
  },
  {
    name: "MaterialPro - Admin",
    subtitle: "Dashboard Template",
    initials: "MP",
    category: "SSM",
    sales: "3715",
    earnings: "$36,400",
    tech: ["Nx", "Js"],
  },
]

/** Table 08 — Top Performing Products */
export const TopPerformingProducts: Story = {
  name: "08 Top Performing Products",
  play: async ({ canvasElement }) => {
    await expectColumnHeaders(canvasElement, [
      "Product Name",
      "Category",
      "Sales",
      "Earnings",
      "Technology",
    ])
    const canvas = within(canvasElement)
    await expect(canvas.getByText("MaterialM - Admin")).toBeInTheDocument()
  },
  render: () => (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Top Performing Products</CardTitle>
      </CardHeader>
      <CardContent className="pt-(--card-spacing)">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Sales</TableHead>
              <TableHead>Earnings</TableHead>
              <TableHead>Technology</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products08.map((row) => (
              <TableRow key={row.name}>
                <TableCell>
                  <PersonCell
                    name={row.name}
                    detail={row.subtitle}
                    initials={row.initials}
                  />
                </TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.sales}</TableCell>
                <TableCell className="font-medium">{row.earnings}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {row.tech.map((t) => (
                      <Badge key={t} variant="outline">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  ),
}

const popular09 = [
  {
    name: "iPhone 13 pro max-Pacific Blue-128GB storage",
    initials: "IP",
    paid: "$180",
    total: "$499",
    payment: "Partially paid",
    status: "Confirmed",
    pct: 36,
  },
  {
    name: "Apple MacBook Pro 13 inch-M1-8/256GB-space",
    initials: "MB",
    paid: "$120",
    total: "$499",
    payment: "Full paid",
    status: "Confirmed",
    pct: 100,
  },
  {
    name: "PlayStation 5 DualSense Wireless Controller",
    initials: "PS",
    paid: "$120",
    total: "$499",
    payment: "Cancelled",
    status: "Cancelled",
    pct: 24,
  },
  {
    name: "Amazon Basics Mesh, Mid-Back, Swivel Office",
    initials: "AM",
    paid: "$120",
    total: "$499",
    payment: "Partially paid",
    status: "Confirmed",
    pct: 24,
  },
  {
    name: "Sony X85J 75 Inch Sony 4K Ultra HD LED Smart",
    initials: "SN",
    paid: "$120",
    total: "$499",
    payment: "Full paid",
    status: "Confirmed",
    pct: 100,
  },
]

/** Table 09 — Popular Products */
export const PopularProducts: Story = {
  name: "09 Popular Products",
  play: async ({ canvasElement }) => {
    await expectColumnHeaders(canvasElement, ["Products", "Payment", "Status"])
    const canvas = within(canvasElement)
    await expect(
      canvas.getByText(/iPhone 13 pro max/i)
    ).toBeInTheDocument()
  },
  render: () => (
    <Card>
      <CardHeader className="border-b">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle>Popular Products</CardTitle>
          <span className="text-sm text-muted-foreground">Total 9k Visitors</span>
        </div>
      </CardHeader>
      <CardContent className="pt-(--card-spacing)">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Products</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {popular09.map((row) => (
              <TableRow key={row.name}>
                <TableCell>
                  <PersonCell name={row.name} initials={row.initials} />
                </TableCell>
                <TableCell>
                  <div className="min-w-36 space-y-1">
                    <div className="text-sm font-medium">
                      {row.paid}/{row.total}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {row.payment}
                    </div>
                    <Progress value={row.pct} />
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      row.status === "Confirmed" ? "success" : "destructive"
                    }
                  >
                    {row.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon-sm" aria-label={`Open ${row.name}`}>
                    <MoreHorizontal />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  ),
}

const reviews10 = [
  {
    name: "Arlene McCoy",
    email: "arlene@example.com",
    initials: "AM",
    review:
      "This theme is great. Clean and easy to understand. Perfect for those who don't have time to",
    time: "Nov 8",
    rating: 5,
  },
  {
    name: "Jerome Bell",
    email: "jerome@example.com",
    initials: "JB",
    review:
      "It is a Mac, after all. Once you have gone Mac, there's no going back. My first Mac lasted over nine years",
    time: "Nov 8",
    rating: 4,
  },
  {
    name: "Jacob Jones",
    email: "jacob@example.com",
    initials: "JJ",
    review:
      "The best experience we could hope for. Customer service team is amazing and the quality of their products",
    time: "Nov 8",
    rating: 5,
  },
  {
    name: "Annette Black",
    email: "annette@example.com",
    initials: "AB",
    review:
      "The controller is quite comfy for me. Despite its increased size, the controller still fits well",
    time: "Nov 8",
    rating: 4,
  },
]

/** Table 10 — Customer Reviews */
export const CustomerReviews: Story = {
  name: "10 Customer Reviews",
  play: async ({ canvasElement }) => {
    await expectColumnHeaders(canvasElement, [
      "#",
      "Customer",
      "Reviews",
      "Time",
    ])
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Arlene McCoy")).toBeInTheDocument()
    await expect(
      canvas.getByPlaceholderText("Search reviews...")
    ).toBeInTheDocument()
  },
  render: () => (
    <Card>
      <CardHeader className="border-b">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <CardTitle>Latest Reviews</CardTitle>
            <p className="text-sm text-muted-foreground">
              Reviewed received across all channels
            </p>
          </div>
          <div className="relative w-56">
            <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-8"
              placeholder="Search reviews..."
              aria-label="Search reviews"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-(--card-spacing)">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">#</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Reviews</TableHead>
              <TableHead>Time</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews10.map((row, i) => (
              <TableRow key={row.email}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>
                  <PersonCell
                    name={row.name}
                    detail={row.email}
                    initials={row.initials}
                  />
                </TableCell>
                <TableCell className="max-w-md whitespace-normal">
                  <div className="mb-1 flex gap-0.5">
                    {Array.from({ length: row.rating }).map((_, star) => (
                      <Star
                        key={star}
                        className="size-3 fill-warning text-warning"
                        aria-hidden
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">{row.review}</p>
                </TableCell>
                <TableCell>{row.time}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon-sm" aria-label={`Actions for review by ${row.name}`}>
                    <MoreHorizontal />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between gap-3 px-1 pt-3 text-sm text-muted-foreground">
          <span>1-6 of 32</span>
          <Button variant="outline" size="sm">
            View All Reviews
          </Button>
        </div>
      </CardContent>
    </Card>
  ),
}

const tracking11 = [
  {
    name: "Photoshop",
    brand: "photoshop" as ProjectBrand,
    budget: "$29,374.60",
    team: [
      "https://images.shadcnspace.com/assets/profiles/user-2.jpg",
      "https://images.shadcnspace.com/assets/profiles/user-3.jpg",
      "https://images.shadcnspace.com/assets/profiles/user-4.jpg",
    ],
    teamFallback: ["ER", "TM", "TY"],
    leader: "Erin",
    activity: [3, 7, 5, 9, 6, 11, 8, 10],
  },
  {
    name: "Website SEO",
    brand: "seo" as ProjectBrand,
    budget: "$1,843.73",
    team: [
      "https://images.shadcnspace.com/assets/profiles/user-5.jpg",
      "https://images.shadcnspace.com/assets/profiles/user-6.jpg",
      "https://images.shadcnspace.com/assets/profiles/user-4.jpg",
    ],
    teamFallback: ["KR", "IS", "JN"],
    leader: "Timothy",
    activity: [5, 4, 8, 6, 10, 7, 12, 9],
  },
  {
    name: "iOS Mobile App Design",
    brand: "ios" as ProjectBrand,
    budget: "$0.9989",
    team: [
      "https://images.shadcnspace.com/assets/profiles/user-2.jpg",
      "https://images.shadcnspace.com/assets/profiles/user-3.jpg",
      "https://images.shadcnspace.com/assets/profiles/user-4.jpg",
    ],
    teamFallback: ["AL", "MJ", "SK"],
    leader: "Tyler",
    activity: [2, 5, 4, 8, 6, 9, 7, 10],
  },
  {
    name: "Figma Components",
    brand: "figma" as ProjectBrand,
    budget: "$238.61",
    team: [
      "https://images.shadcnspace.com/assets/profiles/user-6.jpg",
      "https://images.shadcnspace.com/assets/profiles/user-3.jpg",
      "https://images.shadcnspace.com/assets/profiles/user-2.jpg",
    ],
    teamFallback: ["LB", "CW", "NP"],
    leader: "Kristen",
    activity: [6, 8, 5, 9, 7, 11, 10, 12],
  },
  {
    name: "Web App Design",
    brand: "react" as ProjectBrand,
    budget: "$0.629",
    team: [
      "https://images.shadcnspace.com/assets/profiles/user-3.jpg",
      "https://images.shadcnspace.com/assets/profiles/user-2.jpg",
      "https://images.shadcnspace.com/assets/profiles/user-5.jpg",
    ],
    teamFallback: ["RH", "DW", "FT"],
    leader: "Isabelle",
    activity: [4, 6, 9, 5, 8, 7, 11, 10],
  },
]

/** Table 11 — Project Tracking (matches shadcnspace preview layout) */
export const ProjectTracking: Story = {
  name: "11 Project Tracking",
  globals: {
    theme: "light",
  },
  parameters: {
    backgrounds: { default: "light" },
  },
  play: async ({ canvasElement }) => {
    await expectColumnHeaders(canvasElement, [
      "Name",
      "Budget",
      "Team",
      "Leader",
      "Activity Log",
    ])
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Photoshop")).toBeInTheDocument()
    await expect(canvas.getByText("Sass")).toBeInTheDocument()
  },
  render: () => (
    <div className="overflow-hidden rounded-2xl border border-border bg-card text-foreground shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
        <div className="flex items-center gap-1.5">
          <h3 className="text-base font-semibold tracking-tight text-foreground">
            Recent Projects
          </h3>
          <ArrowUpRight className="size-4 text-muted-foreground" aria-hidden />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 rounded-full border-primary bg-background px-3.5 text-primary hover:bg-primary/10 hover:text-primary"
          >
            Sass
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 rounded-full px-3.5 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            Mobile
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 rounded-full px-3.5 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            Others
          </Button>
        </div>
      </div>
      <div className="px-2 pb-2">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="w-10 pl-3">
                <Checkbox aria-label="Select all projects" />
              </TableHead>
              <TableHead className="font-medium text-muted-foreground">Name</TableHead>
              <TableHead className="font-medium text-muted-foreground">Budget</TableHead>
              <TableHead className="font-medium text-muted-foreground">Team</TableHead>
              <TableHead className="font-medium text-muted-foreground">Leader</TableHead>
              <TableHead className="pr-4 font-medium text-muted-foreground">
                Activity Log
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tracking11.map((row) => (
              <TableRow key={row.name} className="border-border">
                <TableCell className="pl-3">
                  <Checkbox aria-label={`Select ${row.name}`} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <ProjectBrandIcon brand={row.brand} />
                    <span className="font-medium text-foreground">{row.name}</span>
                  </div>
                </TableCell>
                <TableCell className="tabular-nums text-muted-foreground">
                  {row.budget}
                </TableCell>
                <TableCell>
                  <AvatarGroup className="-space-x-2.5">
                    {row.team.map((src, i) => (
                      <Avatar
                        key={src + i}
                        size="sm"
                        className="size-7 ring-2 ring-background"
                      >
                        <AvatarImage src={src} alt="" />
                        <AvatarFallback className="bg-muted text-[10px] text-muted-foreground">
                          {row.teamFallback[i]}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    <AvatarGroupCount className="size-7 bg-muted text-xs text-muted-foreground ring-2 ring-background">
                      +3
                    </AvatarGroupCount>
                  </AvatarGroup>
                </TableCell>
                <TableCell className="text-muted-foreground">{row.leader}</TableCell>
                <TableCell className="pr-4">
                  <Sparkline values={row.activity} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  ),
}
