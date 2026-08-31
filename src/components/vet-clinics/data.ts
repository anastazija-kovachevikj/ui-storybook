export type EntityStatus = "Active" | "Inactive"

export type ClinicVeterinarian = {
  id: string
  name: string
  licenseNumber: string | null
  phone: string | null
  email: string | null
  status: EntityStatus
}

export type VetClinicDetail = {
  id: string
  name: string
  status: EntityStatus
  address: string | null
  city: string | null
  postalCode: string | null
  phone: string | null
  email: string | null
  createdAt: string
  updatedAt: string
  notes: string | null
  veterinarians: ClinicVeterinarian[]
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

export const vetClinicDetail: VetClinicDetail = {
  id: "clinic-carnex",
  name: "Carnex Veterina",
  status: "Active",
  address: null,
  city: null,
  postalCode: null,
  phone: null,
  email: null,
  createdAt: "19.03.2026",
  updatedAt: "19.03.2026",
  notes: null,
  veterinarians: [
    {
      id: "vet-biljana",
      name: "Biljana Naumov",
      licenseNumber: null,
      phone: null,
      email: "biljana.naumov@carnex.rs",
      status: "Active",
    },
    {
      id: "vet-ivan",
      name: "Ivan Jeremić",
      licenseNumber: null,
      phone: null,
      email: "ivan.jeremic@carnex.rs",
      status: "Active",
    },
    {
      id: "vet-milorad",
      name: "Milorad Dujaković",
      licenseNumber: null,
      phone: null,
      email: "milorad.dujakovic@carnex.rs",
      status: "Active",
    },
    {
      id: "vet-ordinirajuci",
      name: "Ordinirajući veterinar Carnex Stočarstvo",
      licenseNumber: "123321456",
      phone: null,
      email: null,
      status: "Inactive",
    },
    {
      id: "vet-radoslav",
      name: "Radoslav Štulić",
      licenseNumber: null,
      phone: null,
      email: "radoslav.stulic@carnex.rs",
      status: "Active",
    },
    {
      id: "vet-srboljub",
      name: "Srboljub Mihajlović",
      licenseNumber: null,
      phone: "+38166815128",
      email: "srboljub.mihajlovic@carnex.rs",
      status: "Active",
    },
    {
      id: "vet-carnex-2",
      name: "Veterinar Carnex 2",
      licenseNumber: null,
      phone: null,
      email: null,
      status: "Inactive",
    },
    {
      id: "vet-zivko",
      name: "Živko Klajić",
      licenseNumber: null,
      phone: null,
      email: "zivko.klajic@carnex.rs",
      status: "Active",
    },
    {
      id: "vet-zlatica",
      name: "Zlatica Vučetić",
      licenseNumber: null,
      phone: null,
      email: "zlatica.vucetic@carnex.rs",
      status: "Active",
    },
  ],
}
