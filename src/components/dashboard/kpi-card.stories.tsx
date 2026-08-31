import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BarChart3, Box, ShoppingBag, Star } from "lucide-react"

import { KpiCard, KpiCardGroup } from "@/components/dashboard/kpi-card"

const dashboardItems = [
  {
    label: "Orders",
    value: "5868",
    period: "Last 7 days",
    change: "+18%",
    tone: "up" as const,
    icon: ShoppingBag,
  },
  {
    label: "Sales",
    value: "$96,850",
    period: "Last 7 days",
    change: "-5%",
    tone: "down" as const,
    icon: Box,
  },
  {
    label: "Profit",
    value: "$82,906",
    period: "Last 7 days",
    change: "+18%",
    tone: "up" as const,
    icon: BarChart3,
  },
  {
    label: "Expense",
    value: "$14,653",
    period: "Last 7 days",
    change: "+18%",
    tone: "up" as const,
    icon: Star,
  },
]

const meta = {
  title: "Dashboard/KpiCard",
  component: KpiCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    tone: {
      control: "select",
      options: ["up", "down"],
      description: "Controls positive/negative change badge styling",
    },
    label: { control: "text" },
    value: { control: "text" },
    period: { control: "text" },
    change: { control: "text" },
  },
  args: {
    label: "Orders",
    value: "5868",
    period: "Last 7 days",
    change: "+18%",
    tone: "up",
    icon: ShoppingBag,
  },
} satisfies Meta<typeof KpiCard>

export default meta
type Story = StoryObj<typeof meta>

/** Figma default — positive change (teal badge) */
export const Up: Story = {
  args: {
    tone: "up",
    change: "+18%",
  },
}

/** Figma variant — negative change (orange badge) */
export const Down: Story = {
  args: {
    tone: "down",
    change: "+18%",
  },
}

/** Both tones as separate cards (light) */
export const BothTones: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-4">
      <KpiCard
        label="Orders"
        value="5868"
        period="Last 7 days"
        change="+18%"
        tone="up"
        icon={ShoppingBag}
      />
      <KpiCard
        label="Orders"
        value="5868"
        period="Last 7 days"
        change="+18%"
        tone="down"
        icon={ShoppingBag}
      />
    </div>
  ),
}

/** Four separate cards at fixed Figma size (220×110) */
export const DashboardRow: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-4">
      {dashboardItems.map((item) => (
        <KpiCard key={item.label} {...item} />
      ))}
    </div>
  ),
}

/** One shared shell with vertical separators (full-width group) */
export const DashboardRowGrouped: Story = {
  render: () => (
    <div className="w-[920px] max-w-full">
      <KpiCardGroup items={dashboardItems} />
    </div>
  ),
}

/**
 * Dark theme — separate standalone KPI cards (shadcn dark card surface).
 * Fixed 220×110 cards; not stretched in a wide container.
 */
export const Dark: Story = {
  globals: {
    theme: "dark",
  },
  render: () => (
    <div className="flex flex-wrap items-start gap-4">
      <KpiCard
        label="Orders"
        value="5868"
        period="Last 7 days"
        change="+18%"
        tone="up"
        icon={ShoppingBag}
      />
      <KpiCard
        label="Sales"
        value="$96,850"
        period="Last 7 days"
        change="-5%"
        tone="down"
        icon={Box}
      />
      <KpiCard
        label="Profit"
        value="$82,906"
        period="Last 7 days"
        change="+18%"
        tone="up"
        icon={BarChart3}
      />
      <KpiCard
        label="Expense"
        value="$14,653"
        period="Last 7 days"
        change="+18%"
        tone="up"
        icon={Star}
      />
    </div>
  ),
}

/** Dark theme — single separate card (up) */
export const DarkUp: Story = {
  globals: {
    theme: "dark",
  },
  args: {
    label: "Orders",
    value: "5868",
    period: "Last 7 days",
    change: "+18%",
    tone: "up",
    icon: ShoppingBag,
  },
}

/** Dark theme — single separate card (down) */
export const DarkDown: Story = {
  globals: {
    theme: "dark",
  },
  args: {
    label: "Sales",
    value: "$96,850",
    period: "Last 7 days",
    change: "-5%",
    tone: "down",
    icon: Box,
  },
}

/** Dark theme — grouped row with separators (bounded width, not viewport-wide) */
export const DarkGrouped: Story = {
  globals: {
    theme: "dark",
  },
  render: () => (
    <div className="w-[920px] max-w-full">
      <KpiCardGroup items={dashboardItems} />
    </div>
  ),
}
