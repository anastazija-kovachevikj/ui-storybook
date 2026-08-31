import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"

import {
  ColumnDragTable as ColumnDragTableView,
  EditRowTable as EditRowTableView,
  ExpandableRowTable as ExpandableRowTableView,
  ExportTable as ExportTableView,
  FilterTable as FilterTableView,
  PaginatedTable as PaginatedTableView,
  RowDragTable as RowDragTableView,
  SelectRowTable as SelectRowTableView,
  SortTable as SortTableView,
  StickyHeaderTable as StickyHeaderTableView,
} from "@/components/shadcn-space/blocks/datatable"

const meta = {
  title: "Components/Datatable",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "ClaimUW Datatable variants from Figma section 438:1712 (Export, Select row, Row drag, Expandable, Edit, Sticky, Column drag, Sort, Filter, Paginated), mapped to shadcnspace Datatable 01/03–06/08–12 and built with TanStack Table v9.",
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
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

async function expectHeaders(canvasElement: HTMLElement, headers: string[]) {
  const canvas = within(canvasElement)
  for (const header of headers) {
    await expect(
      canvas.getByRole("columnheader", { name: header })
    ).toBeInTheDocument()
  }
}

export const ExportTable: Story = {
  name: "ExportTable",
  play: async ({ canvasElement }) => {
    await expectHeaders(canvasElement, [
      "User",
      "Role",
      "Plan",
      "Billing",
      "Status",
    ])
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Olivia Rhye")).toBeInTheDocument()
    await expect(
      canvas.getByRole("button", { name: /export csv/i })
    ).toBeInTheDocument()
  },
  render: () => <ExportTableView />,
}

export const SelectRowTable: Story = {
  name: "SelectRowTable",
  play: async ({ canvasElement }) => {
    await expectHeaders(canvasElement, [
      "Contact",
      "Source",
      "Account Team",
      "Deal Stage",
      "Deal Value",
    ])
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Sunil Joshi")).toBeInTheDocument()
    await expect(canvas.getByText("Stark Industries")).toBeInTheDocument()
  },
  render: () => <SelectRowTableView />,
}

export const RowDragTable: Story = {
  name: "RowDragTable",
  play: async ({ canvasElement }) => {
    await expectHeaders(canvasElement, [
      "Project Name",
      "Budget",
      "Manager",
      "Progress",
      "Action",
    ])
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Web App Project")).toBeInTheDocument()
    await expect(
      canvas.getByRole("button", { name: /drag web app project/i })
    ).toBeInTheDocument()
  },
  render: () => <RowDragTableView />,
}

export const ExpandableRowTable: Story = {
  name: "ExpandableRowTable",
  play: async ({ canvasElement }) => {
    await expectHeaders(canvasElement, ["Courses", "Technologies", "Users"])
    const canvas = within(canvasElement)
    await expect(canvas.getByText("React Mastery")).toBeInTheDocument()
    await expect(canvas.getByText("More Details")).toBeInTheDocument()
  },
  render: () => <ExpandableRowTableView />,
}

export const EditRowTable: Story = {
  name: "EditRowTable",
  play: async ({ canvasElement }) => {
    await expectHeaders(canvasElement, [
      "Username",
      "Project Name",
      "Status",
      "Edit",
    ])
    const canvas = within(canvasElement)
    await expect(canvas.getByLabelText("Edit username")).toHaveValue(
      "Leonard Gordon"
    )
    await expect(canvas.getByLabelText("Confirm edit")).toBeInTheDocument()
  },
  render: () => <EditRowTableView />,
}

export const StickyHeaderTable: Story = {
  name: "StickyHeaderTable",
  play: async ({ canvasElement }) => {
    await expectHeaders(canvasElement, ["Courses", "Technologies", "Users"])
    const canvas = within(canvasElement)
    await expect(canvas.getAllByText("React Mastery").length).toBeGreaterThan(1)
  },
  render: () => <StickyHeaderTableView />,
}

export const ColumnDragTable: Story = {
  name: "ColumnDragTable",
  decorators: [
    (Story) => (
      <div className="w-full max-w-6xl">
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Top Projects")).toBeInTheDocument()
    await expect(
      canvas.getByText("Checkout the statistics of top projects")
    ).toBeInTheDocument()
    await expect(canvas.getByText("Web App Project")).toBeInTheDocument()
    await expect(
      canvas.getByRole("button", { name: /drag project name column/i })
    ).toBeInTheDocument()
  },
  render: () => <ColumnDragTableView />,
}

export const SortTable: Story = {
  name: "SortTable",
  play: async ({ canvasElement }) => {
    await expectHeaders(canvasElement, [
      "API Listings",
      "Balance",
      "Issued Date",
      "Expiration Date",
    ])
    const canvas = within(canvasElement)
    await expect(
      canvas.getByText("Image Generation API")
    ).toBeInTheDocument()
  },
  render: () => <SortTableView />,
}

export const FilterTable: Story = {
  name: "FilterTable",
  play: async ({ canvasElement }) => {
    await expectHeaders(canvasElement, [
      "Requester",
      "Subject",
      "Priority",
      "Category",
      "Status",
    ])
    const canvas = within(canvasElement)
    await expect(
      canvas.getByPlaceholderText("Requester or Subject")
    ).toBeInTheDocument()
    await expect(canvas.getByLabelText("Select Priority")).toBeInTheDocument()
    await expect(canvas.getByText("Marcus Aurelius")).toBeInTheDocument()
  },
  render: () => <FilterTableView />,
}

export const PaginatedTable: Story = {
  name: "PaginatedTable",
  play: async ({ canvasElement }) => {
    await expectHeaders(canvasElement, [
      "Product",
      "Categories",
      "Stock Level",
      "Price",
    ])
    const canvas = within(canvasElement)
    await expect(canvas.getByText('MacBook Pro 16"')).toBeInTheDocument()
    await expect(canvas.getByText("15 Rows")).toBeInTheDocument()
    await expect(canvas.getByText(/Page 1 of 2/i)).toBeInTheDocument()
  },
  render: () => <PaginatedTableView />,
}
