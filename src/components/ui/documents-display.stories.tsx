import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  DocumentsDisplay,
  type DocumentField,
} from "@/components/ui/documents-display"

/** Reusable sample — labels/icons omitted so the component uses placeholders + default FileText. */
const sampleFields: DocumentField[] = [
  {
    id: "field-1",
    value: "Akutna mastitis sepsa (E. coli), potvrđeno na terenu 10.08.2026.",
  },
  { id: "field-2", value: "--" },
  { id: "field-3", value: "--" },
  { id: "field-4", value: "--" },
  { id: "field-5", value: "--" },
  { id: "field-6", value: "--" },
  {
    id: "field-7",
    value: "Uginuće dva grla u Štali 1 — akutna sepsa nakon mastitisa.",
  },
  { id: "field-8", value: "--" },
]

const labeledFields: DocumentField[] = sampleFields.map((field, index) => ({
  ...field,
  label: `Document ${index + 1}`,
}))

const allCompleteFields: DocumentField[] = sampleFields.map((field, index) => ({
  ...field,
  label: `Document ${index + 1}`,
  value:
    field.value && field.value !== "--"
      ? field.value
      : `Sample content for document ${index + 1}.`,
}))

const meta = {
  title: "Components/DocumentsDisplay",
  component: DocumentsDisplay,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Reusable document-field grid built with shadcn Card + Attachment. Labels and icons are optional placeholders (default FileText). Compact variants truncate titles and open an Expand dialog for the full list.",
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
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    variant: {
      control: "select",
      options: ["default", "compact"],
    },
    orientation: {
      control: "select",
      options: ["vertical", "horizontal"],
    },
    fields: { control: false },
    onFieldClick: { control: false },
  },
  args: {
    title: "Documents",
    description: "Attach or review documents for this record.",
    fields: sampleFields,
    variant: "default",
    orientation: "vertical",
  },
} satisfies Meta<typeof DocumentsDisplay>

export default meta
type Story = StoryObj<typeof meta>

/** Default grid with placeholder titles and default icons */
export const Default: Story = {}

/** Same data with explicit reusable labels (still default FileText icons) */
export const WithLabels: Story = {
  args: {
    fields: labeledFields,
  },
}

/** Interactive tiles */
export const Interactive: Story = {
  args: {
    fields: labeledFields,
    onFieldClick: (field) => {
      console.log("document clicked", field.id, field.label)
    },
  },
}

/** Every field filled */
export const AllComplete: Story = {
  args: {
    description: "All documents are on file.",
    fields: allCompleteFields,
  },
}

/** Nothing filled yet */
export const Empty: Story = {
  args: {
    description: "No documents have been added yet.",
    fields: sampleFields.map((field) => ({ ...field, value: "--" })),
  },
}

/**
 * Compact vertical stack — truncated placeholder titles,
 * Expand opens the full list in a dialog.
 */
export const CompactVertical: Story = {
  args: {
    variant: "compact",
    orientation: "vertical",
    title: "Documents",
  },
  decorators: [
    (Story) => (
      <div className="w-[320px] max-w-full">
        <Story />
      </div>
    ),
  ],
}

/**
 * Compact horizontal 2×4 grid — same truncated tiles as vertical,
 * laid out in four columns (two rows for eight documents).
 */
export const CompactHorizontal: Story = {
  args: {
    variant: "compact",
    orientation: "horizontal",
    title: "Documents",
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-3xl">
        <Story />
      </div>
    ),
  ],
}

/** Dark theme canvas */
export const Dark: Story = {
  globals: {
    theme: "dark",
  },
}
