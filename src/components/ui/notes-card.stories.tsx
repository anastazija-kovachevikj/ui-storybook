import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { NotesCard, type Note } from "@/components/ui/notes-card"

const sampleNotes: Note[] = [
  {
    id: "note-1",
    body: "Follow up with the client once the missing policy documents are available.",
    author: "Kosta Trpkov",
    createdAt: "Today at 09:42",
  },
  {
    id: "note-2",
    body: "Bank account verification is still pending.",
    author: "System Administrator",
    createdAt: "Yesterday at 14:15",
  },
]

const longThread: Note[] = [
  ...sampleNotes,
  {
    id: "note-3",
    body: "Requested updated veterinary records for the last 12 months.",
    author: "Ana Stojanovska",
    createdAt: "Mon at 11:05",
  },
  {
    id: "note-4",
    body: "Client confirmed they will upload the missing documents by Friday.",
    author: "Kosta Trpkov",
    createdAt: "Mon at 16:20",
  },
]

const meta = {
  title: "Components/NotesCard",
  component: NotesCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Interactive notes panel for record detail views. Supports an empty state, note list, and inline composer for adding new notes.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[420px] max-w-full">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    title: { control: "text" },
    authorName: { control: "text" },
    notes: { control: false },
  },
  args: {
    title: "Notes",
    authorName: "System Administrator",
    notes: [],
  },
} satisfies Meta<typeof NotesCard>

export default meta
type Story = StoryObj<typeof meta>

/** Empty state with dashed placeholder and CTA */
export const Empty: Story = {
  args: {
    notes: [],
  },
}

/** Card with a short note thread */
export const WithNotes: Story = {
  args: {
    notes: sampleNotes,
  },
}

/** Longer thread for scroll / density checks */
export const LongThread: Story = {
  args: {
    notes: longThread,
  },
}

/** Custom card title */
export const CustomTitle: Story = {
  args: {
    title: "Underwriter notes",
    notes: sampleNotes,
  },
}

/** Composer open above an existing thread */
export const Composing: Story = {
  args: {
    notes: sampleNotes,
    defaultComposing: true,
  },
}

/** Empty state on the dark canvas */
export const EmptyDark: Story = {
  globals: {
    theme: "dark",
  },
  args: {
    notes: [],
  },
}

/** Populated notes on the dark canvas */
export const WithNotesDark: Story = {
  globals: {
    theme: "dark",
  },
  args: {
    notes: sampleNotes,
  },
}
