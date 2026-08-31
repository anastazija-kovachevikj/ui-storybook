"use client"

import { useCallback, useMemo, useState } from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useGlobals } from "storybook/preview-api"
import {
  Check,
  Copy,
  RotateCcw,
  Sparkles,
  Type,
  CircleDot,
  Rows3,
  Palette,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

import {
  buildThemeCssSnippet,
  COLOR_PRESETS,
  DEFAULT_THEME_CONFIG,
  DENSITY_OPTIONS,
  FONT_OPTIONS,
  matchStylePreset,
  RADIUS_OPTIONS,
  STYLE_PRESETS,
  type ColorPresetId,
  type DensityId,
  type FontId,
  type RadiusId,
  type StylePresetId,
  type ThemeConfigGlobals,
} from "./theme-config"

/**
 * Interactive theme lab (shadcn/create-inspired).
 * Choices sync to Storybook toolbar globals and apply to every story.
 */
const meta = {
  title: "Foundation/Configure",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Customize fonts, colors, radius, and spacing. Selections sync to the toolbar and apply across all stories.",
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function SectionLabel({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <div className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
      <Icon className="size-3.5" />
      {children}
    </div>
  )
}

function OptionChip({
  active,
  onClick,
  children,
  className,
  title,
}: {
  active?: boolean
  onClick: () => void
  children: React.ReactNode
  className?: string
  title?: string
}) {
  return (
    <Button
      type="button"
      title={title}
      variant={active ? "default" : "outline"}
      size="sm"
      onClick={onClick}
      className={cn(
        "h-auto justify-center px-2.5 py-1.5 text-xs",
        active && "border-transparent",
        className
      )}
    >
      {children}
    </Button>
  )
}

function PreviewSurface() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="status-pending">Pending</Badge>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Policy summary</CardTitle>
            <CardDescription>
              Live preview — tokens update as you configure.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Input placeholder="Search claims…" defaultValue="CLM-10482" />
            <div className="flex gap-2">
              <Button size="sm">Save</Button>
              <Button size="sm" variant="outline">
                Cancel
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <span className="text-xs text-muted-foreground">
              Card spacing follows density
            </span>
          </CardFooter>
        </Card>

        <div
          className="flex items-start justify-between bg-card p-[var(--kpi-padding)] text-card-foreground ring-1 ring-foreground/10"
          style={{
            borderRadius: "var(--kpi-radius)",
            minHeight: "var(--kpi-height)",
          }}
        >
          <div className="flex flex-col" style={{ gap: "var(--kpi-gap)" }}>
            <span className="text-[13px] text-muted-foreground">
              Open claims
            </span>
            <span className="text-2xl font-semibold tracking-tight">1,284</span>
            <span className="text-[11px] font-medium text-success">
              +8.2% vs last week
            </span>
          </div>
          <div
            className="flex shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
            style={{
              width: "var(--kpi-icon-size)",
              height: "var(--kpi-icon-size)",
            }}
          >
            <Sparkles className="size-4" />
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-muted/60 p-4 ring-1 ring-foreground/10">
        <p className="font-heading text-lg font-semibold text-foreground">
          The quick brown fox jumps over the lazy dog
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Typography sample — heading + body using the selected font stack.
        </p>
        <p className="mt-3 font-mono text-xs text-muted-foreground">
          mono · CLM-10482 · oklch tokens
        </p>
      </div>
    </div>
  )
}

function ThemeConfigureLab({
  globals,
  updateGlobals,
}: {
  globals: Record<string, unknown>
  updateGlobals: (next: Partial<ThemeConfigGlobals>) => void
}) {
  const [copied, setCopied] = useState(false)

  const config = useMemo(
    () => ({
      theme: (globals.theme as "light" | "dark") ?? DEFAULT_THEME_CONFIG.theme,
      colorPreset:
        (globals.colorPreset as ColorPresetId) ??
        DEFAULT_THEME_CONFIG.colorPreset,
      font: (globals.font as FontId) ?? DEFAULT_THEME_CONFIG.font,
      radius: (globals.radius as RadiusId) ?? DEFAULT_THEME_CONFIG.radius,
      density: (globals.density as DensityId) ?? DEFAULT_THEME_CONFIG.density,
    }),
    [globals]
  )

  const activeStyle = matchStylePreset(config)
  const cssSnippet = useMemo(() => buildThemeCssSnippet(config), [config])

  const patch = useCallback(
    (next: Partial<ThemeConfigGlobals>) => {
      updateGlobals(next)
    },
    [updateGlobals]
  )

  const applyStylePreset = useCallback(
    (id: StylePresetId) => {
      const preset = STYLE_PRESETS.find((item) => item.id === id)
      if (!preset) return
      updateGlobals({
        colorPreset: preset.colorPreset,
        font: preset.font,
        radius: preset.radius,
        density: preset.density,
      })
    },
    [updateGlobals]
  )

  const reset = useCallback(() => {
    updateGlobals({
      theme: DEFAULT_THEME_CONFIG.theme,
      colorPreset: DEFAULT_THEME_CONFIG.colorPreset,
      font: DEFAULT_THEME_CONFIG.font,
      radius: DEFAULT_THEME_CONFIG.radius,
      density: DEFAULT_THEME_CONFIG.density,
    })
  }, [updateGlobals])

  const copyCss = useCallback(async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(cssSnippet)
      } else {
        const textarea = document.createElement("textarea")
        textarea.value = cssSnippet
        textarea.setAttribute("readonly", "")
        textarea.style.position = "fixed"
        textarea.style.left = "-9999px"
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand("copy")
        document.body.removeChild(textarea)
      }
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }, [cssSnippet])

  return (
    <div className="min-h-svh w-full bg-background text-foreground">
      <div className="mx-auto grid max-w-6xl gap-6 p-4 md:grid-cols-[minmax(260px,320px)_1fr] md:p-8">
        {/* Controls */}
        <aside className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-4 text-card-foreground shadow-sm md:sticky md:top-4 md:max-h-[calc(100svh-2rem)] md:overflow-y-auto">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h1 className="text-base font-semibold tracking-tight">
                Configure
              </h1>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Fonts, colors, radius &amp; spacing — synced to the toolbar.
              </p>
            </div>
            <Button
              size="icon-sm"
              variant="ghost"
              title="Reset to ClaimUW defaults"
              onClick={reset}
            >
              <RotateCcw className="size-3.5" />
            </Button>
          </div>

          <div>
            <SectionLabel icon={Sparkles}>Style preset</SectionLabel>
            <div className="grid grid-cols-2 gap-1.5">
              {STYLE_PRESETS.map((preset) => (
                <OptionChip
                  key={preset.id}
                  active={activeStyle === preset.id}
                  title={preset.description}
                  onClick={() => applyStylePreset(preset.id)}
                  className="h-auto flex-col items-start gap-0.5 px-2.5 py-2 text-left"
                >
                  <span>{preset.label}</span>
                  <span
                    className={cn(
                      "text-[10px] font-normal",
                      activeStyle === preset.id
                        ? "text-primary-foreground/80"
                        : "text-muted-foreground"
                    )}
                  >
                    {preset.description}
                  </span>
                </OptionChip>
              ))}
            </div>
            {activeStyle === "custom" ? (
              <p className="mt-1.5 text-[10px] text-muted-foreground">
                Custom mix — no named preset matches.
              </p>
            ) : null}
          </div>

          <div>
            <SectionLabel icon={Palette}>Base color</SectionLabel>
            <div className="flex flex-wrap gap-1.5">
              {COLOR_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  title={preset.label}
                  onClick={() => patch({ colorPreset: preset.id })}
                  className={cn(
                    "size-8 rounded-full ring-2 ring-offset-2 ring-offset-card transition-shadow",
                    config.colorPreset === preset.id
                      ? "ring-foreground"
                      : "ring-transparent hover:ring-foreground/30"
                  )}
                  style={{ background: preset.swatch }}
                />
              ))}
            </div>
            <p className="mt-1.5 text-[11px] text-muted-foreground">
              {
                COLOR_PRESETS.find((p) => p.id === config.colorPreset)?.label
              }
            </p>
          </div>

          <div>
            <SectionLabel icon={Type}>Font</SectionLabel>
            <div className="flex flex-col gap-1">
              {FONT_OPTIONS.map((font) => (
                <OptionChip
                  key={font.id}
                  active={config.font === font.id}
                  onClick={() => patch({ font: font.id })}
                  className="w-full justify-between"
                >
                  <span style={{ fontFamily: font.stack }}>{font.label}</span>
                  {config.font === font.id ? (
                    <Check className="size-3.5 opacity-80" />
                  ) : null}
                </OptionChip>
              ))}
            </div>
          </div>

          <div>
            <SectionLabel icon={CircleDot}>Radius</SectionLabel>
            <div className="flex flex-wrap gap-1.5">
              {RADIUS_OPTIONS.map((radius) => (
                <OptionChip
                  key={radius.id}
                  active={config.radius === radius.id}
                  onClick={() => patch({ radius: radius.id })}
                  className="min-w-14"
                >
                  <span
                    className="mr-1.5 inline-block size-3.5 border border-current bg-current/10"
                    style={{ borderRadius: radius.value }}
                  />
                  {radius.label}
                </OptionChip>
              ))}
            </div>
          </div>

          <div>
            <SectionLabel icon={Rows3}>Spacing</SectionLabel>
            <div className="flex flex-col gap-1">
              {DENSITY_OPTIONS.map((density) => (
                <OptionChip
                  key={density.id}
                  active={config.density === density.id}
                  onClick={() => patch({ density: density.id })}
                  className="w-full flex-col items-start gap-0.5 py-2 text-left"
                >
                  <span>{density.label}</span>
                  <span
                    className={cn(
                      "text-[10px] font-normal",
                      config.density === density.id
                        ? "text-primary-foreground/80"
                        : "text-muted-foreground"
                    )}
                  >
                    {density.description}
                  </span>
                </OptionChip>
              ))}
            </div>
          </div>

          <div className="mt-auto border-t border-border pt-4">
            <div className="mb-2 flex items-center justify-between">
              <SectionLabel icon={Copy}>CSS export</SectionLabel>
              <Button size="xs" variant="outline" onClick={copyCss}>
                {copied ? (
                  <>
                    <Check className="size-3" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="size-3" /> Copy
                  </>
                )}
              </Button>
            </div>
            <pre className="max-h-40 overflow-auto rounded-lg bg-muted p-2.5 font-mono text-[10px] leading-relaxed text-muted-foreground">
              {cssSnippet}
            </pre>
            <p className="mt-2 text-[10px] text-muted-foreground">
              Paste into{" "}
              <code className="rounded bg-muted px-1">design-tokens.css</code>{" "}
              to persist beyond Storybook. Toolbar values already apply to all
              stories in this session.
            </p>
          </div>
        </aside>

        {/* Preview */}
        <main className="rounded-2xl border border-border bg-background p-4 md:p-6">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
            <div>
              <h2 className="text-sm font-semibold">Component preview</h2>
              <p className="text-xs text-muted-foreground">
                Toggle light/dark from the Theme toolbar. Other controls live
                here and in the toolbar.
              </p>
            </div>
            <div className="flex flex-wrap gap-1">
              <Badge variant="outline" className="font-mono text-[10px]">
                {config.colorPreset}
              </Badge>
              <Badge variant="outline" className="font-mono text-[10px]">
                {config.font}
              </Badge>
              <Badge variant="outline" className="font-mono text-[10px]">
                radius:{config.radius}
              </Badge>
              <Badge variant="outline" className="font-mono text-[10px]">
                {config.density}
              </Badge>
            </div>
          </div>
          <PreviewSurface />
        </main>
      </div>
    </div>
  )
}

export const ThemeLab: Story = {
  name: "Theme lab",
  // useGlobals must run in the story function (not a nested component)
  render: function ThemeLabStory() {
    const [globals, updateGlobals] = useGlobals()
    return (
      <ThemeConfigureLab globals={globals} updateGlobals={updateGlobals} />
    )
  },
}
