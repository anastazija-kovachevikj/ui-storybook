export type ProposalStatus =
  | "Draft"
  | "Sent"
  | "Accepted"
  | "Rejected"
  | "Revised"
  | "Converted"

export type LifecycleStepStatus = "done" | "current" | "pending" | "skipped"

export type LifecycleStep = {
  id: string
  label: string
  date?: string
  status: LifecycleStepStatus
}

export type ProposalItem = {
  id: string
  description: string
  qty: number
  unit: string | null
  unitPrice: number
  lineTotal: number
}

export type ProposalRecipient = {
  relatedTo: string
  relatedToType: string
  proposalTo: string
  email: string | null
  phone: string | null
  address: string | null
  city: string | null
  postalCode: string | null
  country: string | null
}

export type ProposalDetail = {
  code: string
  statusLabel: ProposalStatus
  subject: string
  client: string
  clientType: string
  date: string
  validUntil: string | null
  currency: string | null
  assignedTo: string | null
  createdBy: string
  subtotal: number
  discount: number
  discountPercent: number
  adjustment: number
  total: number
  recipient: ProposalRecipient
  notes: string | null
  lockedMessage: string | null
  /** Primary next step shown in the status strip (like RA available action). */
  availableAction: {
    title: string
    description: string
  } | null
  lifecycle: LifecycleStep[]
  items: ProposalItem[]
}

/** Serbian-style currency formatting matching ClaimUW mocks. */
export function formatRsd(value: number): string {
  return (
    new Intl.NumberFormat("sr-RS", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value) + " RSD"
  )
}

export function formatQty(value: number): string {
  return new Intl.NumberFormat("sr-RS", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function displayValue(value: string | null | undefined): string {
  if (value == null || value.trim() === "") return "—"
  return value
}

export const proposalDetail: ProposalDetail = {
  code: "PRO-2026-00005",
  statusLabel: "Accepted",
  subject: "osiguranje svinje",
  client: "Clipiripi",
  clientType: "Client",
  date: "04.06.2026",
  validUntil: null,
  currency: null,
  assignedTo: null,
  createdBy: "System Administrator",
  subtotal: 264_000,
  discount: 0,
  discountPercent: 0,
  adjustment: 0,
  total: 264_000,
  recipient: {
    relatedTo: "Clipiripi",
    relatedToType: "Client",
    proposalTo: "Puno Ime2",
    email: "emajl@emajl.com",
    phone: "070333118",
    address: null,
    city: null,
    postalCode: null,
    country: null,
  },
  notes: "sdfsdfgfdsgfd",
  lockedMessage:
    "Edits are only allowed while the proposal is in DRAFT or REVISED. To change a sent proposal, revise it or create a new one.",
  availableAction: {
    title: "Convert to policy",
    description: "Client accepted — create coverage from this proposal.",
  },
  lifecycle: [
    { id: "draft", label: "Draft", date: "02.06.2026", status: "done" },
    { id: "sent", label: "Sent", date: "03.06.2026", status: "done" },
    { id: "accepted", label: "Accepted", date: "04.06.2026", status: "current" },
    { id: "converted", label: "Converted", status: "pending" },
  ],
  items: [
    {
      id: "item-1",
      description: "Svinje 24 meseca",
      qty: 12,
      unit: null,
      unitPrice: 22_000,
      lineTotal: 264_000,
    },
  ],
}
