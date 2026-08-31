export type PolicyFieldType =
  | "string"
  | "number"
  | "boolean"
  | "date"
  | "object"
  | "array"

export type PolicyField = {
  id: string
  key: string
  label: string
  type: PolicyFieldType
  required: boolean
  attribute: boolean
  inPolicyForm: "Yes" | "No" | "Required but hidden" | null
  defaultValue: string | null
  outboundPath: string
  inboundPath: string
}

export const vendorMeta = {
  id: "4",
  name: "Allianz",
  slug: "allianz",
  fieldCount: 21,
}

export const initialPolicyFields: PolicyField[] = [
  {
    id: "1",
    key: "surname",
    label: "Surname",
    type: "string",
    required: false,
    attribute: true,
    inPolicyForm: null,
    defaultValue: null,
    outboundPath: "surname",
    inboundPath: "surname",
  },
  {
    id: "2",
    key: "company_name",
    label: "Company Name",
    type: "string",
    required: false,
    attribute: true,
    inPolicyForm: null,
    defaultValue: null,
    outboundPath: "company_name",
    inboundPath: "company_name",
  },
  {
    id: "3",
    key: "id_number",
    label: "ID Number (JMBG/MB)",
    type: "string",
    required: false,
    attribute: true,
    inPolicyForm: null,
    defaultValue: null,
    outboundPath: "id_number",
    inboundPath: "id_number",
  },
  {
    id: "4",
    key: "street",
    label: "Street",
    type: "string",
    required: false,
    attribute: true,
    inPolicyForm: null,
    defaultValue: null,
    outboundPath: "street",
    inboundPath: "street",
  },
  {
    id: "5",
    key: "post_code",
    label: "Post Code",
    type: "string",
    required: false,
    attribute: true,
    inPolicyForm: "Required but hidden",
    defaultValue: null,
    outboundPath: "post_code",
    inboundPath: "post_code",
  },
  {
    id: "6",
    key: "city",
    label: "City",
    type: "string",
    required: true,
    attribute: true,
    inPolicyForm: "Required but hidden",
    defaultValue: null,
    outboundPath: "city",
    inboundPath: "city",
  },
  {
    id: "7",
    key: "email",
    label: "Email",
    type: "string",
    required: true,
    attribute: false,
    inPolicyForm: "Yes",
    defaultValue: null,
    outboundPath: "email",
    inboundPath: "email",
  },
  {
    id: "8",
    key: "phone",
    label: "Phone",
    type: "string",
    required: false,
    attribute: false,
    inPolicyForm: "Yes",
    defaultValue: null,
    outboundPath: "phone",
    inboundPath: "phone",
  },
  {
    id: "9",
    key: "policy_start",
    label: "Policy Start Date",
    type: "date",
    required: true,
    attribute: false,
    inPolicyForm: "Yes",
    defaultValue: null,
    outboundPath: "policy_start",
    inboundPath: "policy_start",
  },
  {
    id: "10",
    key: "coverage_amount",
    label: "Coverage Amount",
    type: "number",
    required: true,
    attribute: false,
    inPolicyForm: "Yes",
    defaultValue: "0",
    outboundPath: "coverage/amount",
    inboundPath: "coverage/amount",
  },
]

export const fieldTypeOptions: { value: PolicyFieldType; label: string }[] = [
  { value: "string", label: "String" },
  { value: "number", label: "Number" },
  { value: "boolean", label: "Boolean" },
  { value: "date", label: "Date" },
  { value: "object", label: "Object" },
  { value: "array", label: "Array" },
]

export type NewPolicyFieldInput = {
  key: string
  label: string
  type: PolicyFieldType
  parentId: string
  required: boolean
  attribute: boolean
  showInPolicyForm: boolean
  defaultValue: string
  outboundPath: string
  inboundPath: string
  position: string
}
