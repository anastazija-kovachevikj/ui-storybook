export type PolicyTab = "details" | "items" | "documents" | "activity"

export type PolicyDetail = {
  draftCode: string
  status: "Sent" | "Draft" | "Signed"
  insuredName: string
  partner: string
  hid: string
  policyNumber: string | null
  building: string
  startDate: string
  endDate: string
  insuranceLocation: string
  draftedAt: string
  approvedAt: string | null
  sentAt: string
  signedAt: string | null
  notes: string
  clauses: string[]
  delivery: {
    fileName: string
    deliveredTo: string
    deliveredAt: string
  }
  insuranceSum: string
  premium: string
  client: {
    name: string
    taxId: string
    farmRegistration: string
    phone: string
    email: string | null
  }
}

export const policyDetail: PolicyDetail = {
  draftCode: "807875 IIe2",
  status: "Sent",
  insuredName: "CARNEX STOČARSTVO DOO BEČEJ",
  partner: '"AMS OSIGURANJE" A.D.O.',
  hid: "801003006112",
  policyNumber: null,
  building: "6b",
  startDate: "01.12.2025",
  endDate: "31.12.2025",
  insuranceLocation: "Farma Zalivno Polje",
  draftedAt: "31.12.2025",
  approvedAt: null,
  sentAt: "04.08.2026",
  signedAt: null,
  notes: "Comments",
  clauses: ["test"],
  delivery: {
    fileName: "polisa-807875 IIe2.pdf",
    deliveredTo: "carnexstocarstvo@carnex.rs",
    deliveredAt: "04.08.2026",
  },
  insuranceSum: "0,00 RSD",
  premium: "0,00 RSD",
  client: {
    name: "CARNEX STOČARSTVO DOO BEČEJ",
    taxId: "112289556",
    farmRegistration: "801003021681",
    phone: "0217953630",
    email: null,
  },
}

export function displayValue(value: string | null | undefined) {
  return value?.trim() || "--"
}
