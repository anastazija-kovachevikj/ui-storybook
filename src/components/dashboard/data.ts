export type ChangeTone = "up" | "down" | "neutral"

export type PeriodKey = "7d" | "30d" | "90d" | "ytd"

export type StatCard = {
  id: string
  label: string
  value: string
  period: string
  change: string
  tone: Exclude<ChangeTone, "neutral">
  icon: "bag" | "cube" | "chart" | "star"
}

export type Project = {
  id: string
  name: string
  date: string
  manager: string
  progress: number
  progressColor: string
  extra: number
  team: string[]
  iconBg: string
  iconColor: string
  icon: "folder" | "code" | "megaphone" | "alert" | "pen"
}

/** CRM Top Projects rows (Figma 444:4290) — Budget + manager email layout. */
export type CrmProject = {
  id: string
  name: string
  date: string
  budget: string
  manager: string
  email: string
  progress: number
  progressColor: string
  iconBg: string
  iconColor: string
  icon: Project["icon"]
}

export type ActivityItem = {
  id: string
  time: string
  color: string
  parts: Array<{ text: string; href?: boolean }>
}

export type KpiId = "claims" | "risk" | "policies" | "animals"

export type OpsKpi = {
  id: KpiId
  label: string
  value: string
  change: string
  tone: ChangeTone
  caption: string
  href?: string
  sparkline: number[]
}

export type WorkItemKind = "task" | "ticket"
export type WorkPriority = "urgent" | "high" | "medium" | "low"
export type WorkStatus = "overdue" | "waiting" | "in-progress" | "open"

export type WorkItem = {
  id: string
  title: string
  kind: WorkItemKind
  relatedLabel: string
  relatedHref?: string
  status: WorkStatus
  statusLabel: string
  dueLabel: string
  dueAbsolute: string
  priority: WorkPriority
  assignee: "me" | "unassigned" | "other"
  assigneeLabel: string
}

export type PortfolioMetric = {
  id: string
  label: string
  value: string
  hint: string
  progress: number
  tone: "primary" | "warning" | "negative" | "muted"
  href?: string
}

export type ClientItem = {
  id: string
  name: string
  initials: string
  type: string
  assignment: "unassigned" | "me" | "other"
  assignmentLabel: string
}

export type AttentionItem = {
  id: string
  label: string
  count: number
  tone: "warning" | "negative" | "primary"
}

export type TrendPoint = { label: string; opened: number; closed: number }

export type PeriodSnapshot = {
  kpis: OpsKpi[]
  claimsTrend: TrendPoint[]
  workItems: WorkItem[]
  portfolio: PortfolioMetric[]
  clients: ClientItem[]
  clientSummary: { total: number; mine: number; unassigned: number }
  attention: AttentionItem[]
}

const spark = {
  claims: [18, 22, 19, 24, 21, 23, 20, 22],
  risk: [8, 7, 6, 5, 4, 4, 3, 2],
  policies: [40, 38, 36, 32, 28, 24, 20, 16],
  animals: [12, 14, 13, 16, 15, 17, 16, 18],
}

export const periodOptions: Array<{ value: PeriodKey; label: string }> = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
  { value: "ytd", label: "This year" },
]

const workItems: WorkItem[] = [
  {
    id: "tsk-1842",
    title: "Collect FNOL photos",
    kind: "task",
    relatedLabel: "Claim CLM-08412",
    status: "overdue",
    statusLabel: "Overdue",
    dueLabel: "Overdue 12 days",
    dueAbsolute: "05 Aug 2026",
    priority: "urgent",
    assignee: "me",
    assigneeLabel: "You",
  },
  {
    id: "tsk-1848",
    title: "Complete risk dossier",
    kind: "task",
    relatedLabel: "RA-2026-0016",
    relatedHref: "/risk-assessments",
    status: "overdue",
    statusLabel: "Overdue",
    dueLabel: "Overdue 9 days",
    dueAbsolute: "08 Aug 2026",
    priority: "high",
    assignee: "me",
    assigneeLabel: "You",
  },
  {
    id: "tsk-1851",
    title: "Review referred claim",
    kind: "task",
    relatedLabel: "Claim CLM-08391",
    status: "waiting",
    statusLabel: "Waiting",
    dueLabel: "Due 20 Aug 2026",
    dueAbsolute: "20 Aug 2026",
    priority: "high",
    assignee: "other",
    assigneeLabel: "M. Petrović",
  },
  {
    id: "tsk-1854",
    title: "Assign client owner",
    kind: "task",
    relatedLabel: "Mlekara Simić DOO",
    status: "waiting",
    statusLabel: "Waiting",
    dueLabel: "Due 22 Aug 2026",
    dueAbsolute: "22 Aug 2026",
    priority: "medium",
    assignee: "unassigned",
    assigneeLabel: "Unassigned",
  },
  {
    id: "tkt-2201",
    title: "Missing veterinary certificate",
    kind: "ticket",
    relatedLabel: "Policy POL-314-10",
    relatedHref: "/proposals",
    status: "in-progress",
    statusLabel: "In progress",
    dueLabel: "No due date",
    dueAbsolute: "No due date",
    priority: "low",
    assignee: "me",
    assigneeLabel: "You",
  },
]

const clients: ClientItem[] = [
  {
    id: "c-1",
    name: "Mlekara Simić DOO",
    initials: "MS",
    type: "Farm · dairy",
    assignment: "unassigned",
    assignmentLabel: "Unassigned",
  },
  {
    id: "c-2",
    name: "Koki farma",
    initials: "KF",
    type: "Farm · poultry",
    assignment: "other",
    assignmentLabel: "A. Jovanović",
  },
  {
    id: "c-3",
    name: "Farma UAT DOO",
    initials: "FU",
    type: "Farm · mixed",
    assignment: "unassigned",
    assignmentLabel: "Unassigned",
  },
  {
    id: "c-4",
    name: "Agro Livno",
    initials: "AL",
    type: "Cooperative",
    assignment: "me",
    assignmentLabel: "You",
  },
]

const claimsTrendYear = [
  { label: "Jan", opened: 62, closed: 48 },
  { label: "Feb", opened: 71, closed: 66 },
  { label: "Mar", opened: 58, closed: 61 },
  { label: "Apr", opened: 80, closed: 54 },
  { label: "May", opened: 74, closed: 70 },
  { label: "Jun", opened: 69, closed: 63 },
  { label: "Jul", opened: 86, closed: 59 },
  { label: "Aug", opened: 48, closed: 41 },
]

const claimsTrend30 = claimsTrendYear.slice(-6)
const claimsTrend7 = [
  { label: "Tue", opened: 2, closed: 1 },
  { label: "Wed", opened: 1, closed: 2 },
  { label: "Thu", opened: 3, closed: 1 },
  { label: "Fri", opened: 2, closed: 2 },
  { label: "Sat", opened: 1, closed: 0 },
  { label: "Sun", opened: 0, closed: 1 },
  { label: "Mon", opened: 3, closed: 2 },
]

export const periodSnapshots: Record<PeriodKey, PeriodSnapshot> = {
  "7d": {
    kpis: [
      {
        id: "claims",
        label: "Claims",
        value: "12",
        change: "+8%",
        tone: "up",
        caption: "4 new this week",
        sparkline: [8, 9, 7, 11, 10, 12, 12],
      },
      {
        id: "risk",
        label: "Risk assessments",
        value: "2",
        change: "0%",
        tone: "neutral",
        caption: "1 new this week",
        href: "/risk-assessments",
        sparkline: [2, 2, 1, 2, 2, 2, 2],
      },
      {
        id: "policies",
        label: "Policies",
        value: "6",
        change: "-12%",
        tone: "down",
        caption: "0 new this week",
        href: "/proposals",
        sparkline: [8, 7, 7, 6, 6, 6, 6],
      },
      {
        id: "animals",
        label: "Animals",
        value: "166,927",
        change: "+0.1%",
        tone: "up",
        caption: "18 added this week",
        href: "/vet-clinics",
        sparkline: spark.animals,
      },
    ],
    claimsTrend: claimsTrend7,
    workItems,
    portfolio: [
      {
        id: "pending-claims",
        label: "Claims pending action",
        value: "128",
        hint: "of 863 in book",
        progress: 15,
        tone: "warning",
      },
      {
        id: "risk-coverage",
        label: "Risk assessments in progress",
        value: "3 / 16",
        hint: "19% of pipeline",
        progress: 19,
        tone: "primary",
        href: "/risk-assessments",
      },
      {
        id: "linked-policies",
        label: "Policies linked to open work",
        value: "10 / 314",
        hint: "3% of book",
        progress: 3,
        tone: "muted",
        href: "/proposals",
      },
    ],
    clients,
    clientSummary: { total: 22, mine: 0, unassigned: 6 },
    attention: [
      { id: "overdue", label: "overdue tasks", count: 2, tone: "negative" },
      { id: "pending", label: "claims pending action", count: 128, tone: "warning" },
      { id: "unassigned", label: "clients unassigned", count: 6, tone: "primary" },
    ],
  },
  "30d": {
    kpis: [
      {
        id: "claims",
        label: "Claims",
        value: "863",
        change: "0%",
        tone: "neutral",
        caption: "3 new in 30 days",
        sparkline: spark.claims,
      },
      {
        id: "risk",
        label: "Risk assessments",
        value: "16",
        change: "-50%",
        tone: "down",
        caption: "3 new in 30 days",
        href: "/risk-assessments",
        sparkline: spark.risk,
      },
      {
        id: "policies",
        label: "Policies",
        value: "314",
        change: "-50%",
        tone: "down",
        caption: "3 new in 30 days",
        href: "/proposals",
        sparkline: spark.policies,
      },
      {
        id: "animals",
        label: "Animals",
        value: "166,927",
        change: "+0.4%",
        tone: "up",
        caption: "3 new in 30 days",
        href: "/vet-clinics",
        sparkline: spark.animals,
      },
    ],
    claimsTrend: claimsTrend30,
    workItems,
    portfolio: [
      {
        id: "pending-claims",
        label: "Claims pending action",
        value: "128",
        hint: "of 863 in book",
        progress: 15,
        tone: "warning",
      },
      {
        id: "risk-coverage",
        label: "Risk assessments in progress",
        value: "3 / 16",
        hint: "19% of pipeline",
        progress: 19,
        tone: "primary",
        href: "/risk-assessments",
      },
      {
        id: "linked-policies",
        label: "Policies linked to open work",
        value: "10 / 314",
        hint: "3% of book",
        progress: 3,
        tone: "muted",
        href: "/proposals",
      },
    ],
    clients,
    clientSummary: { total: 22, mine: 0, unassigned: 6 },
    attention: [
      { id: "overdue", label: "overdue tasks", count: 2, tone: "negative" },
      { id: "pending", label: "claims pending action", count: 128, tone: "warning" },
      { id: "unassigned", label: "clients unassigned", count: 6, tone: "primary" },
    ],
  },
  "90d": {
    kpis: [
      {
        id: "claims",
        label: "Claims",
        value: "1,204",
        change: "+6%",
        tone: "up",
        caption: "41 new in 90 days",
        sparkline: [20, 24, 22, 28, 26, 30, 27, 32],
      },
      {
        id: "risk",
        label: "Risk assessments",
        value: "28",
        change: "-22%",
        tone: "down",
        caption: "9 new in 90 days",
        href: "/risk-assessments",
        sparkline: [10, 9, 8, 7, 6, 5, 4, 4],
      },
      {
        id: "policies",
        label: "Policies",
        value: "361",
        change: "-18%",
        tone: "down",
        caption: "11 new in 90 days",
        href: "/proposals",
        sparkline: [44, 40, 38, 34, 30, 28, 24, 22],
      },
      {
        id: "animals",
        label: "Animals",
        value: "166,927",
        change: "+1.2%",
        tone: "up",
        caption: "86 added in 90 days",
        href: "/vet-clinics",
        sparkline: spark.animals,
      },
    ],
    claimsTrend: claimsTrendYear,
    workItems,
    portfolio: [
      {
        id: "pending-claims",
        label: "Claims pending action",
        value: "128",
        hint: "of 1,204 in range",
        progress: 11,
        tone: "warning",
      },
      {
        id: "risk-coverage",
        label: "Risk assessments in progress",
        value: "5 / 28",
        hint: "18% of pipeline",
        progress: 18,
        tone: "primary",
        href: "/risk-assessments",
      },
      {
        id: "linked-policies",
        label: "Policies linked to open work",
        value: "14 / 361",
        hint: "4% of book",
        progress: 4,
        tone: "muted",
        href: "/proposals",
      },
    ],
    clients,
    clientSummary: { total: 22, mine: 0, unassigned: 6 },
    attention: [
      { id: "overdue", label: "overdue tasks", count: 2, tone: "negative" },
      { id: "pending", label: "claims pending action", count: 128, tone: "warning" },
      { id: "unassigned", label: "clients unassigned", count: 6, tone: "primary" },
    ],
  },
  ytd: {
    kpis: [
      {
        id: "claims",
        label: "Claims",
        value: "2,418",
        change: "+11%",
        tone: "up",
        caption: "548 opened this year",
        sparkline: [30, 34, 32, 40, 38, 44, 41, 48],
      },
      {
        id: "risk",
        label: "Risk assessments",
        value: "54",
        change: "-8%",
        tone: "down",
        caption: "16 opened this year",
        href: "/risk-assessments",
        sparkline: spark.risk,
      },
      {
        id: "policies",
        label: "Policies",
        value: "412",
        change: "+3%",
        tone: "up",
        caption: "38 issued this year",
        href: "/proposals",
        sparkline: [18, 20, 19, 22, 24, 23, 26, 28],
      },
      {
        id: "animals",
        label: "Animals",
        value: "166,927",
        change: "+2.1%",
        tone: "up",
        caption: "214 added this year",
        href: "/vet-clinics",
        sparkline: spark.animals,
      },
    ],
    claimsTrend: claimsTrendYear,
    workItems,
    portfolio: [
      {
        id: "pending-claims",
        label: "Claims pending action",
        value: "128",
        hint: "of 2,418 YTD",
        progress: 5,
        tone: "warning",
      },
      {
        id: "risk-coverage",
        label: "Risk assessments in progress",
        value: "8 / 54",
        hint: "15% of pipeline",
        progress: 15,
        tone: "primary",
        href: "/risk-assessments",
      },
      {
        id: "linked-policies",
        label: "Policies linked to open work",
        value: "18 / 412",
        hint: "4% of book",
        progress: 4,
        tone: "muted",
        href: "/proposals",
      },
    ],
    clients,
    clientSummary: { total: 22, mine: 0, unassigned: 6 },
    attention: [
      { id: "overdue", label: "overdue tasks", count: 2, tone: "negative" },
      { id: "pending", label: "claims pending action", count: 128, tone: "warning" },
      { id: "unassigned", label: "clients unassigned", count: 6, tone: "primary" },
    ],
  },
}

export const currentUser = {
  name: "System Administrator",
  email: "admin@claimuw.com",
  initials: "SA",
}

/** Legacy Storybook / unused CRM fixtures kept for KpiCard stories. */
export const stats: StatCard[] = [
  {
    id: "orders",
    label: "Orders",
    value: "5868",
    period: "Last 7 days",
    change: "+18%",
    tone: "up",
    icon: "bag",
  },
  {
    id: "sales",
    label: "Sales",
    value: "$96,850",
    period: "Last 7 days",
    change: "-5%",
    tone: "down",
    icon: "cube",
  },
  {
    id: "profit",
    label: "Profit",
    value: "$82,906",
    period: "Last 7 days",
    change: "+18%",
    tone: "up",
    icon: "chart",
  },
  {
    id: "expense",
    label: "Expense",
    value: "$14,653",
    period: "Last 7 days",
    change: "+18%",
    tone: "up",
    icon: "star",
  },
]

export const salesReportData = [
  { month: "Jan", thisYear: 22, lastYear: 8 },
  { month: "Feb", thisYear: 48, lastYear: 35 },
  { month: "Mar", thisYear: 42, lastYear: 55 },
  { month: "Apr", thisYear: 12, lastYear: 38 },
  { month: "May", thisYear: 28, lastYear: 18 },
  { month: "Jun", thisYear: 55, lastYear: 32 },
  { month: "Jul", thisYear: 78, lastYear: 22 },
  { month: "Aug", thisYear: 52, lastYear: 10 },
  { month: "Sep", thisYear: 18, lastYear: 8 },
  { month: "Oct", thisYear: 28, lastYear: 45 },
  { month: "Nov", thisYear: 22, lastYear: 18 },
  { month: "Dec", thisYear: 48, lastYear: 0 },
]

export const weeklySalesData = [
  { day: "Mon", value: 42 },
  { day: "Tue", value: 88 },
  { day: "Wed", value: 48 },
  { day: "Thu", value: 36 },
  { day: "Fri", value: 62 },
  { day: "Sat", value: 54 },
]

export const projects: Project[] = [
  {
    id: "1",
    name: "Web App Project",
    date: "04 June 2026",
    manager: "Jonathan",
    progress: 45,
    progressColor: "var(--warning)",
    extra: 2,
    team: ["jonathan", "sara", "mike"],
    iconBg: "bg-warning/10",
    iconColor: "text-warning",
    icon: "folder",
  },
  {
    id: "2",
    name: "MaterialM Admin",
    date: "09 January 2026",
    manager: "Mathew",
    progress: 55,
    progressColor: "var(--primary)",
    extra: 2,
    team: ["mathew", "lisa", "tom"],
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    icon: "code",
  },
  {
    id: "3",
    name: "Digital Marketing",
    date: "15 April 2026",
    manager: "Rubel",
    progress: 40,
    progressColor: "var(--warning)",
    extra: 0,
    team: ["rubel", "anna", "chris"],
    iconBg: "bg-success/10",
    iconColor: "text-success",
    icon: "megaphone",
  },
  {
    id: "4",
    name: "Shadcn Space Design",
    date: "30 March 2026",
    manager: "Anil",
    progress: 22,
    progressColor: "var(--destructive)",
    extra: 1,
    team: ["anil", "jen", "paul"],
    iconBg: "bg-destructive/10",
    iconColor: "text-destructive",
    icon: "alert",
  },
  {
    id: "5",
    name: "Graphic Design",
    date: "23 October 2026",
    manager: "Anderson",
    progress: 80,
    progressColor: "var(--chart-5)",
    extra: 0,
    team: ["anderson", "kate"],
    iconBg: "bg-chart-2/10",
    iconColor: "text-chart-2",
    icon: "pen",
  },
]

export const crmProjects: CrmProject[] = [
  {
    id: "1",
    name: "Web App Project",
    date: "04 June 2026",
    budget: "$12,000",
    manager: "Olivia Rhye",
    email: "olivia@ui.com",
    progress: 60,
    progressColor: "var(--chart-4)",
    iconBg: "bg-chart-4/20",
    iconColor: "text-chart-4",
    icon: "folder",
  },
  {
    id: "2",
    name: "MaterialM Admin",
    date: "09 January 2026",
    budget: "$8000",
    manager: "Barbara Steele",
    email: "steele@ui.com",
    progress: 30,
    progressColor: "var(--primary)",
    iconBg: "bg-primary/20",
    iconColor: "text-primary",
    icon: "code",
  },
  {
    id: "3",
    name: "Digital Marketing",
    date: "15 April 2026",
    budget: "$15,000",
    manager: "Leonard Gordon",
    email: "olivia@ui.com",
    progress: 45,
    progressColor: "var(--warning)",
    iconBg: "bg-chart-5/20",
    iconColor: "text-chart-5",
    icon: "megaphone",
  },
  {
    id: "4",
    name: "Shadcn Space Design",
    date: "30 March 2026",
    budget: "$1000",
    manager: "Evelyn Pope",
    email: "steele@ui.com",
    progress: 37,
    progressColor: "var(--destructive)",
    iconBg: "bg-destructive/20",
    iconColor: "text-destructive",
    icon: "alert",
  },
  {
    id: "5",
    name: "Graphic Design",
    date: "23 October 2026",
    budget: "$7000",
    manager: "Tommy Garza",
    email: "olivia@ui.com",
    progress: 87,
    progressColor: "var(--chart-5)",
    iconBg: "bg-primary/20",
    iconColor: "text-primary",
    icon: "pen",
  },
  {
    id: "6",
    name: "Digital Marketing",
    date: "15 April 2026",
    budget: "$15,000",
    manager: "Leonard Gordon",
    email: "olivia@ui.com",
    progress: 45,
    progressColor: "var(--warning)",
    iconBg: "bg-chart-5/20",
    iconColor: "text-chart-5",
    icon: "megaphone",
  },
]

export const activities: ActivityItem[] = [
  {
    id: "1",
    time: "09:46",
    color: "var(--chart-1)",
    parts: [{ text: "Payment received from John Doe of $385.90" }],
  },
  {
    id: "2",
    time: "09:46",
    color: "var(--chart-5)",
    parts: [
      { text: "New sale recorded " },
      { text: "#ML-3467", href: true },
    ],
  },
  {
    id: "3",
    time: "09:46",
    color: "var(--chart-4)",
    parts: [{ text: "Payment was made of $64.95 to Michael" }],
  },
  {
    id: "4",
    time: "09:46",
    color: "var(--chart-5)",
    parts: [
      { text: "New sale recorded " },
      { text: "#ML-3467", href: true },
    ],
  },
  {
    id: "5",
    time: "09:46",
    color: "var(--destructive)",
    parts: [{ text: "Project meeting" }],
  },
  {
    id: "6",
    time: "09:46",
    color: "var(--warning)",
    parts: [{ text: "Payment received from John Doe of $385.90" }],
  },
  {
    id: "7",
    time: "09:46",
    color: "var(--chart-1)",
    parts: [
      { text: "New sale recorded " },
      { text: "#ML-3467", href: true },
    ],
  },
]

export function avatarUrl(seed: string) {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4,c0aede,d1d4f9`
}
