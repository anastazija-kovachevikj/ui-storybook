export type WorkflowStepStatus = "skipped" | "done" | "current" | "pending"

export type WorkflowStep = {
  id: string
  label: string
  role?: string
  date?: string
  status: WorkflowStepStatus
}

export type WorkflowPhase = {
  id: string
  title: string
  steps: WorkflowStep[]
}

export type RiskItemStatus = "Active" | "Inactive" | "Draft"

export type RiskAssessmentItem = {
  id: string
  description: string
  species: string
  category: string
  qty: number
  unitValue: number
  rate: number
  premium: number
  assessedValue: number
  status: RiskItemStatus
}

export type RiskAssessmentDetail = {
  code: string
  statusLabel: string
  lockedMessage: string
  client: string
  clientHid: string
  insuranceLocation: string
  insurer: string
  policy: string | null
  policyCode: string
  assessmentDate: string | null
  sumInsured: number
  premiumNet: number
  subsidyPercentMin: number
  subsidyPercentMax: number
  subsidyMin: number
  subsidyMax: number
  subsidyNote: string
  owner: {
    draftAppraiser: string
    draftApprover: string
    offerAppraiser: string
    offerApprover: string
  }
  availableAction: {
    title: string
    description: string
  }
  draftPhase: WorkflowPhase
  offerPhase: WorkflowPhase
  items: RiskAssessmentItem[]
  taxRate: number
  clauses: string[]
  notes: string | null
}

/** Serbian-style currency formatting matching the Figma mock. */
export function formatRsd(value: number): string {
  return (
    new Intl.NumberFormat("sr-RS", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value) + " RSD"
  )
}

export function formatRate(value: number): string {
  return (
    new Intl.NumberFormat("sr-RS", {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    }).format(value) + "%"
  )
}

export const riskAssessmentDetail: RiskAssessmentDetail = {
  code: "NP-PIK-20241122-P1",
  statusLabel: "Offer Assessment Approved",
  lockedMessage: "This risk assessment is approved and locked.",
  client: "PIK-BEČEJ DOO BEČEJ",
  clientHid: "801003001980",
  insuranceLocation: "Farma Zalivno Polje",
  insurer: '"AMS OSIGURANJE" A.D.O.',
  policy: null,
  policyCode: "COV-2026-00005",
  assessmentDate: null,
  sumInsured: 609_000,
  premiumNet: 580_000,
  subsidyPercentMin: 40,
  subsidyPercentMax: 45,
  subsidyMin: 232_000,
  subsidyMax: 261_000,
  subsidyNote:
    "Treasury subsidy: 40–45% of premium, 1 July – 15 November, capped at 2,000,000 RSD.",
  owner: {
    draftAppraiser: "Doktor Duliti",
    draftApprover: "Kosta Trpkov",
    offerAppraiser: "Kosta Trpkov",
    offerApprover: "Doktor Duliti",
  },
  availableAction: {
    title: "What is missing?",
    description: "Submit the completed dossier for approval.",
  },
  draftPhase: {
    id: "draft",
    title: "Draft Phase",
    steps: [
      { id: "pre-draft", label: "Pre-Draft", status: "skipped" },
      {
        id: "submitted",
        label: "Submitted",
        role: "Request",
        date: "10.07.2026",
        status: "done",
      },
      {
        id: "ongoing",
        label: "Ongoing",
        role: "Assessment",
        date: "10.07.2026",
        status: "done",
      },
      {
        id: "for-approval",
        label: "For Approval",
        role: "Approval",
        date: "10.07.2026",
        status: "done",
      },
      {
        id: "approved",
        label: "Approved",
        role: "Sent",
        date: "10.07.2026",
        status: "done",
      },
    ],
  },
  offerPhase: {
    id: "offer",
    title: "Offer Phase",
    steps: [
      {
        id: "offer-submitted",
        label: "Submitted",
        role: "Request",
        date: "10.07.2026",
        status: "done",
      },
      {
        id: "offer-ongoing",
        label: "Ongoing",
        role: "Assessment",
        date: "10.07.2026",
        status: "done",
      },
      {
        id: "offer-for-approval",
        label: "For Approval",
        role: "Approval",
        date: "10.07.2026",
        status: "done",
      },
      {
        id: "offer-approved",
        label: "Approved",
        role: "Sent",
        date: "10.07.2026",
        status: "done",
      },
    ],
  },
  items: [
    {
      id: "1",
      description: "Koki test spisak",
      species: "Svinje",
      category: "Krmace",
      qty: 1,
      unitValue: 22_000,
      rate: 10,
      premium: 2_200,
      assessedValue: 22_000,
      status: "Active",
    },
    {
      id: "2",
      description: "Tovljenici — sektor B",
      species: "Svinje",
      category: "Tovljenici",
      qty: 120,
      unitValue: 4_500,
      rate: 8.5,
      premium: 45_900,
      assessedValue: 540_000,
      status: "Active",
    },
    {
      id: "3",
      description: "Prasad — farma 2",
      species: "Svinje",
      category: "Prasad",
      qty: 40,
      unitValue: 1_175,
      rate: 12,
      premium: 5_640,
      assessedValue: 47_000,
      status: "Draft",
    },
  ],
  taxRate: 0.2,
  clauses: [],
  notes: null,
}
