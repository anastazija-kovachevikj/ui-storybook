import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { EmptyState } from "@/components/ui/empty-state"

const meta = {
  title: "Components/EmptyState",
  component: EmptyState,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Reusable empty-workspace prompts for creating a first project or inviting collaborators.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "no-projects-yet",
        "invite-your-team",
        "no-data-yet",
        "no-data-yet-animated",
        "split-panel-preview",
        "no-search-matches",
        "chart-data-empty",
      ],
    },
    onAction: { action: "primary action" },
    onSecondaryAction: { action: "secondary action" },
  },
  args: {
    variant: "no-projects-yet",
  },
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

/** First Empty State variant from the component guide. */
export const NoProjectsYet: Story = {}

/** Invite colleagues by email or let an administrator copy a secure invite link. */
export const InviteYourTeam: Story = {
  args: {
    variant: "invite-your-team",
  },
}

/** Prompt for adding the first record or importing a CSV file. */
export const NoDataYet: Story = {
  args: {
    variant: "no-data-yet",
  },
}

/** A staged data-card stack entrance, disabled for users who prefer reduced motion. */
export const NoDataYetAnimated: Story = {
  args: {
    variant: "no-data-yet-animated",
  },
}

/** A report-focused empty state with a companion chart preview. */
export const SplitPanelPreview: Story = {
  args: {
    variant: "split-panel-preview",
  },
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          minHeight: "100svh",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px",
        }}
      >
        <Story />
      </div>
    ),
  ],
}

/** Search-result empty state with paths to reset the query or browse everything. */
export const NoSearchMatches: Story = {
  args: {
    variant: "no-search-matches",
  },
}

/** Dashed chart container with a prompt to connect a data source. */
export const ChartDataEmpty: Story = {
  args: {
    variant: "chart-data-empty",
  },
}
