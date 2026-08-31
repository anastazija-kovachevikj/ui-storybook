export type EntityStatus = "Active" | "Inactive"

export type AssignedClinic = {
  id: string
  name: string
  status: EntityStatus
  city: string | null
  address: string | null
}

export type VeterinarianDetail = {
  id: string
  name: string
  initials: string
  status: EntityStatus
  licenseNumber: string | null
  specialization: string | null
  phone: string | null
  email: string | null
  assignedClinic: AssignedClinic | null
  createdAt: string
  updatedAt: string
  notes: string | null
}

export function displayValue(value: string | null | undefined): string {
  if (value == null || value.trim() === "") return "—"
  return value
}

export function initialsFromName(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export const veterinarianDetail: VeterinarianDetail = {
  id: "vet-anastasija",
  name: "Anastasija Janakievska",
  initials: "AJ",
  status: "Active",
  licenseNumber: "VET-123",
  specialization: null,
  phone: null,
  email: null,
  assignedClinic: {
    id: "clinic-nova",
    name: "Nova Test stanica",
    status: "Active",
    city: null,
    address: null,
  },
  createdAt: "09.06.2026",
  updatedAt: "09.06.2026",
  notes: null,
}
