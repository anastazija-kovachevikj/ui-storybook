import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"

import {
  Dashboard,
  dashboardVariants,
  type DashboardVariant,
} from "@/components/dashboard/dashboard"

const meta = {
  title: "Components/Dashboard",
  component: Dashboard,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "ClaimUW Dashboard variants from Figma section 446:7755 (Analytics, CRM, Modern, eCommerce). Main content only — no sidebar. Fullscreen host with scrollable main so content is not clipped.",
      },
    },
    nextjs: {
      navigation: {
        pathname: "/",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [...dashboardVariants],
    },
  },
  args: {
    variant: "analytics" as DashboardVariant,
    className: "h-full min-w-[1280px]",
  },
} satisfies Meta<typeof Dashboard>

export default meta
type Story = StoryObj<typeof meta>

export const Analytics: Story = {
  name: "Analytics",
  args: { variant: "analytics" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Sales Overview")).toBeInTheDocument()
    await expect(canvas.getByText("Analytics Dashboard")).toBeInTheDocument()
  },
}

export const Crm: Story = {
  name: "CRM",
  args: { variant: "crm" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Campaign Performance")).toBeInTheDocument()
    await expect(canvas.getByText("Sales Report")).toBeInTheDocument()
  },
}

export const Modern: Story = {
  name: "Modern",
  args: { variant: "modern" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Welcome Jonathan Deo")).toBeInTheDocument()
    await expect(canvas.getByText("Revenue Updates")).toBeInTheDocument()
  },
}

export const Ecommerce: Story = {
  name: "eCommerce",
  args: { variant: "ecommerce" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(
      canvas.getByText("Congratulations Jonathan")
    ).toBeInTheDocument()
    await expect(canvas.getByText("Latest Reviews")).toBeInTheDocument()
  },
}
