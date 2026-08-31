import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ArrowUpRight, CircleCheck, CircleX, Star } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { PendingBadge } from "@/components/ui/pending-badge"

const meta = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "ClaimUW badge primitives transferred from Figma (ClaimUW · Badges, node 357:6231). Compact chips use Default, Count, Outline, With Icon, Link, and Error. Status pills (Success, Pending, Failed) are larger, with a top glow. Pending is animated (spinner + letter drop). Person chips compose Outline + Avatar.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "solid",
        "secondary",
        "destructive",
        "outline",
        "ghost",
        "link",
        "count",
        "success",
        "status-success",
        "status-pending",
        "status-failed",
      ],
    },
    size: {
      control: "select",
      options: ["default", "lg", "count"],
    },
    children: { control: "text" },
  },
  args: {
    variant: "solid",
    size: "default",
    children: "Default",
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

/** Figma Default — high-contrast solid chip */
export const Default: Story = {
  args: {
    variant: "solid",
    children: "Default",
  },
}

/** Figma Count — circular notification / tally mark */
export const Count: Story = {
  args: {
    variant: "count",
    size: "count",
    children: "3",
  },
}

/** Figma Outline */
export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
}

/** Figma With Icon — positive fill + leading star */
export const WithIcon: Story = {
  render: () => (
    <Badge variant="success">
      <Star data-icon="inline-start" aria-hidden />
      With Icon
    </Badge>
  ),
}

/** Figma Link — solid chip with trailing arrow, rendered as an anchor */
export const Link: Story = {
  render: () => (
    <Badge variant="solid" render={<a href="#badge-link" />}>
      Link
      <ArrowUpRight data-icon="inline-end" aria-hidden />
    </Badge>
  ),
}

/** Figma Error — soft destructive */
export const Error: Story = {
  args: {
    variant: "destructive",
    children: "Error",
  },
}

/** Figma Success — status pill with teal glow */
export const Success: Story = {
  render: () => (
    <Badge variant="status-success">
      <CircleCheck aria-hidden />
      Success
    </Badge>
  ),
}

/** Animated pending pill — spinner, letter drop, amber crown glow */
export const Pending: Story = {
  render: () => <PendingBadge />,
}

/** Figma Failed — status pill with red glow */
export const Failed: Story = {
  render: () => (
    <Badge variant="status-failed">
      <CircleX aria-hidden />
      Failed
    </Badge>
  ),
}

/** Figma With avatar — outline chip + person mark */
export const WithAvatar: Story = {
  render: () => (
    <Badge variant="outline" size="lg" className="gap-1.5 py-1 pl-1 pr-2.5">
      <Avatar size="sm">
        <AvatarFallback className="bg-transparent" />
      </Avatar>
      Olivia Carter
    </Badge>
  ),
}

/**
 * Full Figma Badges section — same set and left-to-right order as
 * https://www.figma.com/design/6xIhCodCDBKHoKlYvv4MBP/ClaimUW?node-id=357-6231
 */
export const FigmaSection: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => (
    <div className="flex max-w-[1024px] flex-col gap-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Badges</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Design-system chips from Figma node 357:6231. Compact variants on the
          left; status pills and person chip on the right.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="solid">Default</Badge>
        <Badge variant="count">3</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="success">
          <Star data-icon="inline-start" aria-hidden />
          With Icon
        </Badge>
        <Badge variant="solid" render={<a href="#badge-link" />}>
          Link
          <ArrowUpRight data-icon="inline-end" aria-hidden />
        </Badge>
        <Badge variant="destructive">Error</Badge>
        <Badge variant="status-success">
          <CircleCheck aria-hidden />
          Success
        </Badge>
        <PendingBadge />
        <Badge variant="status-failed">
          <CircleX aria-hidden />
          Failed
        </Badge>
        <Badge variant="outline" size="lg" className="gap-1.5 py-1 pl-1 pr-2.5">
          <Avatar size="sm">
            <AvatarFallback className="bg-transparent" />
          </Avatar>
          Olivia Carter
        </Badge>
      </div>
    </div>
  ),
}

/** Same Figma set on the dark canvas */
export const FigmaSectionDark: Story = {
  globals: {
    theme: "dark",
  },
  parameters: {
    layout: "padded",
  },
  render: FigmaSection.render,
}
