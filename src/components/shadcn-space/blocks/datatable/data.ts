export type ExportUser = {
  id: string
  name: string
  email: string
  role: string
  plan: string
  billing: string
  status: "Active" | "Inactive" | "Pending"
  avatar: string
}

export const exportUsers: ExportUser[] = [
  {
    id: "1",
    name: "Olivia Rhye",
    email: "olivia@ui.com",
    role: "Maintainer",
    plan: "Enterprise",
    billing: "Auto debit",
    status: "Active",
    avatar: "https://images.shadcnspace.com/assets/profiles/user-11.jpg",
  },
  {
    id: "2",
    name: "Barbara Steele",
    email: "steele@ui.com",
    role: "Admin",
    plan: "Enterprise",
    billing: "Auto debit",
    status: "Inactive",
    avatar: "https://images.shadcnspace.com/assets/profiles/user-8.jpg",
  },
  {
    id: "3",
    name: "Leonard Gordon",
    email: "leonard@ui.com",
    role: "Editor",
    plan: "Team",
    billing: "Manual - PayPal",
    status: "Active",
    avatar: "https://images.shadcnspace.com/assets/profiles/user-3.jpg",
  },
  {
    id: "4",
    name: "Evelyn Pope",
    email: "evelyn@ui.com",
    role: "Author",
    plan: "Basic",
    billing: "Manual - cash",
    status: "Pending",
    avatar: "https://images.shadcnspace.com/assets/profiles/user-4.jpg",
  },
  {
    id: "5",
    name: "Tommy Garza",
    email: "tommy@ui.com",
    role: "Subscriber",
    plan: "Company",
    billing: "Auto debit",
    status: "Inactive",
    avatar: "https://images.shadcnspace.com/assets/profiles/user-5.jpg",
  },
  {
    id: "6",
    name: "Isabel Vasquez",
    email: "isabel@ui.com",
    role: "Editor",
    plan: "Team",
    billing: "Auto debit",
    status: "Active",
    avatar: "https://images.shadcnspace.com/assets/profiles/user-12.jpg",
  },
]

export type ApiListing = {
  id: string
  name: string
  balanceUsed: number
  balanceMax: number
  issuedDate: string
  expirationDate: string
}

export const apiListings: ApiListing[] = [
  {
    id: "1",
    name: "Image Generation API",
    balanceUsed: 850,
    balanceMax: 1000,
    issuedDate: "03 Apr 2025",
    expirationDate: "03 Jul 2025",
  },
  {
    id: "2",
    name: "Video Generation API",
    balanceUsed: 320,
    balanceMax: 500,
    issuedDate: "12 May 2025",
    expirationDate: "12 Aug 2025",
  },
  {
    id: "3",
    name: "Text-to-Speech API",
    balanceUsed: 1200,
    balanceMax: 1500,
    issuedDate: "26 Jun 2025",
    expirationDate: "26 Sept 2025",
  },
  {
    id: "4",
    name: "Language Translation API",
    balanceUsed: 50,
    balanceMax: 200,
    issuedDate: "05 Jul 2025",
    expirationDate: "05 Oct 2025",
  },
  {
    id: "5",
    name: "Data Analytics API",
    balanceUsed: 280,
    balanceMax: 300,
    issuedDate: "07 Aug 2025",
    expirationDate: "07 Nov 2025",
  },
  {
    id: "6",
    name: "Speech Recognition API",
    balanceUsed: 900,
    balanceMax: 1000,
    issuedDate: "11 Aug 2025",
    expirationDate: "11 Nov 2025",
  },
  {
    id: "7",
    name: "Semantic Search API",
    balanceUsed: 150,
    balanceMax: 1000,
    issuedDate: "15 Sep 2025",
    expirationDate: "15 Dec 2025",
  },
]

export type Ticket = {
  id: string
  requester: string
  email: string
  subject: string
  priority: "High" | "Medium" | "Critical" | "Low"
  category: "Billing" | "Account" | "Technical" | "Feedback"
  status: "Open" | "In Progress" | "Resolved" | "Closed"
}

export const tickets: Ticket[] = [
  {
    id: "1",
    requester: "Marcus Aurelius",
    email: "marcus@company.com",
    subject: "Payment processing failed at checkout",
    priority: "High",
    category: "Billing",
    status: "Open",
  },
  {
    id: "2",
    requester: "Barbara Steele",
    email: "steele@ui.com",
    subject: "Cannot reset password via email link",
    priority: "Medium",
    category: "Account",
    status: "In Progress",
  },
  {
    id: "3",
    requester: "Leonard Gordon",
    email: "leonard@ui.com",
    subject: "App crashes on startup after v2.1 update",
    priority: "Critical",
    category: "Technical",
    status: "Open",
  },
  {
    id: "4",
    requester: "Evelyn Pope",
    email: "evelyn@ui.com",
    subject: "Requesting dark mode for mobile app",
    priority: "Low",
    category: "Feedback",
    status: "Resolved",
  },
  {
    id: "5",
    requester: "Tommy Garza",
    email: "tommy@ui.com",
    subject: "Subscription refund request - Order #772",
    priority: "High",
    category: "Billing",
    status: "Closed",
  },
  {
    id: "6",
    requester: "Isabel Vasquez",
    email: "isabel@ui.com",
    subject: "API documentation contains invalid examples",
    priority: "Low",
    category: "Technical",
    status: "Resolved",
  },
]

export type Product = {
  id: string
  name: string
  sku: string
  categories: string[]
  stock: number
  stockMax: number
  price: string
  outOfStock?: boolean
}

const productSeed: Product[] = [
  {
    id: "1",
    name: 'MacBook Pro 16"',
    sku: "MBP-16-GRY",
    categories: ["Hardware", "Laptop"],
    stock: 42,
    stockMax: 100,
    price: "$2,499",
  },
  {
    id: "2",
    name: "Magic Keyboard",
    sku: "MK-WHT-US",
    categories: ["Accessory"],
    stock: 85,
    stockMax: 120,
    price: "$129",
  },
  {
    id: "3",
    name: 'UltraWide Monitor 34"',
    sku: "MN-34-UW",
    categories: ["Hardware", "Display"],
    stock: 12,
    stockMax: 50,
    price: "$899",
  },
  {
    id: "4",
    name: "Noise Cancelling Headphones",
    sku: "HP-ANC-BLK",
    categories: ["Audio"],
    stock: 5,
    stockMax: 80,
    price: "$349",
  },
  {
    id: "5",
    name: "Ergonomic Desk Chair",
    sku: "CH-ER-99",
    categories: ["Office", "Furniture"],
    stock: 15,
    stockMax: 40,
    price: "$599",
  },
  {
    id: "6",
    name: "4K Webcam Pro",
    sku: "WC-4K-USB",
    categories: ["Peripheral"],
    stock: 0,
    stockMax: 100,
    price: "$199",
    outOfStock: true,
  },
  {
    id: "7",
    name: 'iPad Air 11"',
    sku: "IP-A11-BLU",
    categories: ["Hardware", "Tablet"],
    stock: 62,
    stockMax: 150,
    price: "$599",
  },
  {
    id: "8",
    name: "Thunderbolt 4 Dock",
    sku: "DK-TB4-SIL",
    categories: ["Accessory"],
    stock: 28,
    stockMax: 60,
    price: "$299",
  },
  {
    id: "9",
    name: "Standing Desk XL",
    sku: "DSK-ST-60",
    categories: ["Office", "Furniture"],
    stock: 8,
    stockMax: 30,
    price: "$749",
  },
  {
    id: "10",
    name: "Mechanical Keyboard TKL",
    sku: "KB-ME-RGB",
    categories: ["Peripheral"],
    stock: 45,
    stockMax: 200,
    price: "$159",
  },
]

/** Pad to 15 rows to match Figma pagination chrome ("15 Rows", page 1 of 2 at size 10). */
export const products: Product[] = [
  ...productSeed,
  {
    id: "11",
    name: "USB-C Hub Mini",
    sku: "HB-USC-MN",
    categories: ["Accessory"],
    stock: 90,
    stockMax: 150,
    price: "$79",
  },
  {
    id: "12",
    name: "Wireless Mouse Pro",
    sku: "MS-WL-PRO",
    categories: ["Peripheral"],
    stock: 33,
    stockMax: 100,
    price: "$99",
  },
  {
    id: "13",
    name: "Studio Display",
    sku: "SD-27-5K",
    categories: ["Hardware", "Display"],
    stock: 7,
    stockMax: 25,
    price: "$1,599",
  },
  {
    id: "14",
    name: "Laptop Sleeve 16\"",
    sku: "SL-16-GRY",
    categories: ["Accessory"],
    stock: 120,
    stockMax: 200,
    price: "$49",
  },
  {
    id: "15",
    name: "Desk Lamp LED",
    sku: "LM-LED-01",
    categories: ["Office"],
    stock: 54,
    stockMax: 80,
    price: "$89",
  },
]

export type Deal = {
  id: string
  contact: string
  company: string
  source: string
  team: string[]
  stage: "Qualified" | "Discovery" | "Proposal" | "Negotiation" | "Lost"
  value: string
}

export const deals: Deal[] = [
  {
    id: "1",
    contact: "Sunil Joshi",
    company: "Stark Industries",
    source: "LinkedIn",
    team: ["A", "B"],
    stage: "Qualified",
    value: "$12,500",
  },
  {
    id: "2",
    contact: "Andrew McDownland",
    company: "Wayne Enterprises",
    source: "Referral",
    team: ["C", "D", "E"],
    stage: "Discovery",
    value: "$45,000",
  },
  {
    id: "3",
    contact: "Christopher Jamil",
    company: "Oscorp Corp",
    source: "Direct",
    team: ["F"],
    stage: "Proposal",
    value: "$8,200",
  },
  {
    id: "4",
    contact: "Nirav Joshi",
    company: "LexCorp",
    source: "Webinar",
    team: ["G", "H"],
    stage: "Negotiation",
    value: "$24,000",
  },
  {
    id: "5",
    contact: "Micheal Doe",
    company: "Umbrella Corp",
    source: "LinkedIn",
    team: ["I"],
    stage: "Lost",
    value: "$15,000",
  },
]

export type EditableProject = {
  id: string
  username: string
  projectName: string
  status: "active" | "cancel" | "pending"
}

export const editableProjects: EditableProject[] = [
  {
    id: "1",
    username: "Olivia Rhye",
    projectName: "Xtreme admin",
    status: "active",
  },
  {
    id: "2",
    username: "Barbara Steele",
    projectName: "Adminpro admin",
    status: "cancel",
  },
  {
    id: "3",
    username: "Leonard Gordon",
    projectName: "Monster admin",
    status: "active",
  },
  {
    id: "4",
    username: "Evelyn Pope",
    projectName: "matdashpro admin",
    status: "pending",
  },
  {
    id: "5",
    username: "Tommy Garza",
    projectName: "Elegant admin",
    status: "cancel",
  },
  {
    id: "6",
    username: "Isabel Vasquez",
    projectName: "TailwindAdmin admin",
    status: "pending",
  },
]

export type Course = {
  id: string
  title: string
  subtitle: string
  technologies: string[]
  users: string
  description: string
}

export const courses: Course[] = [
  {
    id: "1",
    title: "React Mastery",
    subtitle: "Advanced Patterns",
    technologies: ["React", "TypeScript"],
    users: "1.2k Students",
    description: "Deep dive into advanced React pattern",
  },
  {
    id: "2",
    title: "Next.js 14 Fullstack",
    subtitle: "Modern Development",
    technologies: ["Next.js", "Prisma"],
    users: "2.5k Students",
    description: "Build production Next.js apps with Prisma",
  },
  {
    id: "3",
    title: "UI/UX Design Essentials",
    subtitle: "Product Design",
    technologies: ["Figma", "Tailwind"],
    users: "800 Students",
    description: "Design systems and product workflows",
  },
  {
    id: "4",
    title: "Backend Engineering",
    subtitle: "Node.js & Express",
    technologies: ["Node.js", "Express"],
    users: "3.1k Students",
    description: "APIs, auth, and scalable Node services",
  },
  {
    id: "5",
    title: "Mobile App Development",
    subtitle: "Cross-platform",
    technologies: ["React Native", "Expo"],
    users: "1.5k Students",
    description: "Ship cross-platform mobile apps with Expo",
  },
]

/** Sticky header demo uses 10 rows (5 courses duplicated). */
export const stickyCourses: Course[] = [
  ...courses,
  ...courses.map((c, i) => ({ ...c, id: `${c.id}-dup-${i}` })),
]

export type ProjectRow = {
  id: string
  name: string
  date: string
  budget: string
  manager: string
  email: string
  progress: number
}

export const projectRows: ProjectRow[] = [
  {
    id: "1",
    name: "Web App Project",
    date: "04 June 2026",
    budget: "$12,000",
    manager: "Olivia Rhye",
    email: "olivia@ui.com",
    progress: 60,
  },
  {
    id: "2",
    name: "MaterialM Admin",
    date: "09 January 2026",
    budget: "$8000",
    manager: "Barbara Steele",
    email: "steele@ui.com",
    progress: 30,
  },
  {
    id: "3",
    name: "Digital Marketing",
    date: "15 April 2026",
    budget: "$15,000",
    manager: "Leonard Gordon",
    email: "olivia@ui.com",
    progress: 45,
  },
  {
    id: "4",
    name: "Shadcn Space Design",
    date: "30 March 2026",
    budget: "$1000",
    manager: "Evelyn Pope",
    email: "steele@ui.com",
    progress: 37,
  },
  {
    id: "5",
    name: "Graphic Design",
    date: "23 October 2026",
    budget: "$7000",
    manager: "Tommy Garza",
    email: "olivia@ui.com",
    progress: 87,
  },
]
