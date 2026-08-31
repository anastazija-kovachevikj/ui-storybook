import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import type { ReactNode } from "react"
import { CheckIcon, ClockIcon, FileTextIcon, FileWarningIcon, RefreshCwIcon, XIcon } from "lucide-react"

import { Attachment, AttachmentAction, AttachmentActions, AttachmentContent, AttachmentDescription, AttachmentMedia, AttachmentTitle } from "@/components/ui/attachment"
import { Spinner } from "@/components/ui/spinner"

type AttachmentExampleProps = {
  size?: "default" | "sm" | "xs"
  state?: "idle" | "uploading" | "processing" | "error" | "done"
  title: string
  description?: string
  icon?: ReactNode
  actions?: ReactNode
}

function AttachmentExample({ size = "default", state = "idle", title, description, icon = <FileTextIcon aria-hidden />, actions }: AttachmentExampleProps) {
  return <Attachment size={size} state={state}><AttachmentMedia>{icon}</AttachmentMedia><AttachmentContent><AttachmentTitle>{title}</AttachmentTitle>{description ? <AttachmentDescription>{description}</AttachmentDescription> : null}</AttachmentContent>{actions ? <AttachmentActions>{actions}</AttachmentActions> : null}</Attachment>
}

function RemoveAction({ label }: { label: string }) {
  return <AttachmentAction aria-label={`Remove ${label}`}><XIcon aria-hidden /></AttachmentAction>
}

const meta = {
  title: "Components/Attachment",
  component: Attachment,
  parameters: { layout: "padded", docs: { description: { component: "Composable file attachment row with size and upload-state variants. Build rows from AttachmentMedia, AttachmentContent, AttachmentTitle, AttachmentDescription, and AttachmentActions." } } },
  tags: ["autodocs"],
  decorators: [(Story) => <div className="w-[420px] max-w-full"><Story /></div>],
  argTypes: { size: { control: "select", options: ["default", "sm", "xs"] }, state: { control: "select", options: ["idle", "uploading", "processing", "error", "done"] } },
  args: { size: "default", state: "idle" },
} satisfies Meta<typeof Attachment>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: (args) => <AttachmentExample size={args.size ?? undefined} state={args.state ?? undefined} title="policy-documents.pdf" description="PDF · 2.4 MB" actions={<RemoveAction label="policy-documents.pdf" />} /> }

export const Sizes: Story = { render: () => <div className="flex flex-col gap-3"><AttachmentExample title="Default attachment" description="PDF · 2.4 MB" /><AttachmentExample size="sm" title="Small attachment" description="PDF · 2.4 MB" /><AttachmentExample size="xs" title="Extra small attachment" /></div> }

export const States: Story = { render: () => <div className="flex flex-col gap-2"><AttachmentExample state="idle" title="selected-file.pdf" description="Ready to upload" icon={<ClockIcon aria-hidden />} actions={<RemoveAction label="selected-file.pdf" />} /><AttachmentExample state="uploading" title="design-system.zip" description="Uploading · 64%" icon={<Spinner />} actions={<AttachmentAction aria-label="Cancel upload"><XIcon aria-hidden /></AttachmentAction>} /><AttachmentExample state="processing" title="market-research.pdf" description="Processing document" actions={<RemoveAction label="market-research.pdf" />} /><AttachmentExample state="error" title="financial-model.xlsx" description="Upload failed. Try again." icon={<FileWarningIcon aria-hidden />} actions={<><AttachmentAction aria-label="Retry upload"><RefreshCwIcon aria-hidden /></AttachmentAction><RemoveAction label="financial-model.xlsx" /></>} /><AttachmentExample state="done" title="uploaded-report.pdf" description="Uploaded · 1.8 MB" icon={<CheckIcon aria-hidden />} actions={<RemoveAction label="uploaded-report.pdf" />} /></div> }

export const Idle: Story = { render: () => <AttachmentExample state="idle" title="selected-file.pdf" description="Ready to upload" icon={<ClockIcon aria-hidden />} actions={<RemoveAction label="selected-file.pdf" />} /> }
export const Uploading: Story = { render: () => <AttachmentExample state="uploading" title="design-system.zip" description="Uploading · 64%" icon={<Spinner />} actions={<AttachmentAction aria-label="Cancel upload"><XIcon aria-hidden /></AttachmentAction>} /> }
export const Processing: Story = { render: () => <AttachmentExample state="processing" title="market-research.pdf" description="Processing document" actions={<RemoveAction label="market-research.pdf" />} /> }
export const Error: Story = { render: () => <AttachmentExample state="error" title="financial-model.xlsx" description="Upload failed. Try again." icon={<FileWarningIcon aria-hidden />} actions={<><AttachmentAction aria-label="Retry upload"><RefreshCwIcon aria-hidden /></AttachmentAction><RemoveAction label="financial-model.xlsx" /></>} /> }
export const Done: Story = { render: () => <AttachmentExample state="done" title="uploaded-report.pdf" description="Uploaded · 1.8 MB" icon={<CheckIcon aria-hidden />} actions={<RemoveAction label="uploaded-report.pdf" />} /> }
export const StatesDark: Story = { globals: { theme: "dark" }, render: States.render }
