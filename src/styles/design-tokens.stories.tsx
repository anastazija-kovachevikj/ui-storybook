import type { Meta, StoryObj } from "@storybook/nextjs-vite"

/**
 * Visual reference for design tokens.
 * Edit values in `src/styles/design-tokens.css` — Storybook + the app both pick them up.
 */
const meta = {
  title: "Foundation/DesignTokens",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const swatches = [
  { name: "background", className: "bg-background" },
  { name: "foreground", className: "bg-foreground" },
  { name: "card", className: "bg-card" },
  { name: "primary", className: "bg-primary" },
  { name: "secondary", className: "bg-secondary" },
  { name: "muted", className: "bg-muted" },
  { name: "accent", className: "bg-accent" },
  { name: "border", className: "bg-border" },
  { name: "destructive", className: "bg-destructive" },
  { name: "success", className: "bg-success" },
  { name: "success-muted", className: "bg-success-muted" },
  { name: "warning", className: "bg-warning" },
  { name: "warning-muted", className: "bg-warning-muted" },
  { name: "badge-count", className: "bg-badge-count" },
  { name: "badge-positive-fill", className: "bg-badge-positive-fill" },
  { name: "badge-glow-positive", className: "bg-badge-glow-positive" },
  { name: "badge-glow-warning", className: "bg-badge-glow-warning" },
  { name: "badge-glow-negative", className: "bg-badge-glow-negative" },
] as const

export const Colors: Story = {
  render: () => (
    <div className="flex max-w-3xl flex-col gap-6">
      <div>
        <h2 className="mb-1 text-lg font-semibold text-foreground">
          Color tokens
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Utilities like{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
            bg-card
          </code>
          ,{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
            text-success
          </code>{" "}
          come from{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
            design-tokens.css
          </code>
          . Toggle Theme in the toolbar for dark.
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {swatches.map((s) => (
            <div
              key={s.name}
              className="overflow-hidden rounded-xl ring-1 ring-foreground/10"
            >
              <div className={`h-16 w-full ${s.className}`} />
              <div className="bg-card px-2 py-1.5 text-xs text-card-foreground">
                {s.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
}

export const KpiGeometry: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col gap-4">
      <h2 className="text-lg font-semibold text-foreground">KPI geometry</h2>
      <p className="text-sm text-muted-foreground">
        Figma stat-card sizes as CSS variables / Tailwind theme tokens.
      </p>
      <dl className="grid grid-cols-2 gap-2 text-sm">
        {[
          ["--kpi-width", "220px"],
          ["--kpi-height", "110px"],
          ["--kpi-padding", "16px"],
          ["--kpi-radius", "16px"],
          ["--kpi-gap", "6px"],
          ["--kpi-icon-size", "36px"],
          ["--kpi-group-max-width", "920px"],
        ].map(([token, value]) => (
          <div
            key={token}
            className="flex items-center justify-between rounded-lg bg-card px-3 py-2 ring-1 ring-foreground/10"
          >
            <dt className="font-mono text-xs text-muted-foreground">{token}</dt>
            <dd className="font-medium text-card-foreground">{value}</dd>
          </div>
        ))}
      </dl>
      <div
        className="flex items-start justify-between bg-card p-[var(--kpi-padding)] text-card-foreground ring-1 ring-foreground/10"
        style={{
          width: "var(--kpi-width)",
          height: "var(--kpi-height)",
          borderRadius: "var(--kpi-radius)",
        }}
      >
        <div className="flex flex-col" style={{ gap: "var(--kpi-gap)" }}>
          <span className="text-[13px] text-muted-foreground">Token demo</span>
          <span className="text-2xl font-semibold">KPI</span>
          <span className="text-[11px] text-muted-foreground">
            padding / radius from vars
          </span>
        </div>
        <div
          className="flex shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground"
          style={{
            width: "var(--kpi-icon-size)",
            height: "var(--kpi-icon-size)",
          }}
        >
          ★
        </div>
      </div>
    </div>
  ),
}

export const Typography: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-3 font-sans">
      <p className="text-2xl font-semibold text-card-foreground">
        Semi Bold 24 — KPI value
      </p>
      <p className="text-[13px] font-normal text-muted-foreground">
        Regular 13 — KPI label
      </p>
      <p className="text-[11px] font-normal text-muted-foreground">
        Regular 11 — period
      </p>
      <p className="text-[11px] font-medium text-success">
        Medium 11 — change up
      </p>
      <p className="text-[11px] font-medium text-warning">
        Medium 11 — change down
      </p>
    </div>
  ),
}
