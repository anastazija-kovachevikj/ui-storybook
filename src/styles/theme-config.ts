/**
 * Storybook theme configurator
 * -----------------------------
 * Presets inspired by shadcn/create: fonts, base colors, radius, density.
 * Applied as CSS variables on document.documentElement (and the story
 * wrapper) so Tailwind @theme utilities and every story stay in sync.
 */

export type ColorPresetId =
  | "claimuw"
  | "neutral"
  | "zinc"
  | "slate"
  | "violet"
  | "emerald"
  | "orange"
  | "rose"

export type FontId =
  | "inter"
  | "geist"
  | "dm-sans"
  | "plus-jakarta"
  | "ibm-plex"
  | "space-grotesk"
  | "manrope"

export type RadiusId = "none" | "sm" | "md" | "lg" | "xl"

export type DensityId = "compact" | "default" | "comfortable"

export type StylePresetId = "claimuw" | "soft" | "sharp" | "brutal"

export interface ThemeConfigGlobals {
  theme?: "light" | "dark"
  colorPreset?: ColorPresetId
  font?: FontId
  radius?: RadiusId
  density?: DensityId
  stylePreset?: StylePresetId
}

export interface FontOption {
  id: FontId
  label: string
  stack: string
  google?: string
}

export interface ColorPreset {
  id: ColorPresetId
  label: string
  /** Swatch shown in the lab / toolbar */
  swatch: string
  light: Record<string, string>
  dark: Record<string, string>
}

export const FONT_OPTIONS: FontOption[] = [
  {
    id: "inter",
    label: "Inter",
    stack: '"Inter", ui-sans-serif, system-ui, sans-serif',
  },
  {
    id: "geist",
    label: "Geist",
    stack: '"Geist", "Inter", ui-sans-serif, system-ui, sans-serif',
    google: "Geist:wght@400;500;600;700",
  },
  {
    id: "dm-sans",
    label: "DM Sans",
    stack: '"DM Sans", ui-sans-serif, system-ui, sans-serif',
    google: "DM+Sans:wght@400;500;600;700",
  },
  {
    id: "plus-jakarta",
    label: "Plus Jakarta Sans",
    stack: '"Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif',
    google: "Plus+Jakarta+Sans:wght@400;500;600;700",
  },
  {
    id: "ibm-plex",
    label: "IBM Plex Sans",
    stack: '"IBM Plex Sans", ui-sans-serif, system-ui, sans-serif',
    google: "IBM+Plex+Sans:wght@400;500;600;700",
  },
  {
    id: "space-grotesk",
    label: "Space Grotesk",
    stack: '"Space Grotesk", ui-sans-serif, system-ui, sans-serif',
    google: "Space+Grotesk:wght@400;500;600;700",
  },
  {
    id: "manrope",
    label: "Manrope",
    stack: '"Manrope", ui-sans-serif, system-ui, sans-serif',
    google: "Manrope:wght@400;500;600;700",
  },
]

export const RADIUS_OPTIONS: { id: RadiusId; label: string; value: string }[] =
  [
    { id: "none", label: "None", value: "0" },
    { id: "sm", label: "Small", value: "0.35rem" },
    { id: "md", label: "Medium", value: "0.5rem" },
    { id: "lg", label: "Large", value: "0.75rem" },
    { id: "xl", label: "XL", value: "1rem" },
  ]

export const DENSITY_OPTIONS: {
  id: DensityId
  label: string
  description: string
  spacing: string
  cardSpacing: string
}[] = [
  {
    id: "compact",
    label: "Compact",
    description: "Tighter padding — dense dashboards",
    spacing: "0.2rem",
    cardSpacing: "0.75rem",
  },
  {
    id: "default",
    label: "Default",
    description: "Balanced ClaimUW rhythm",
    spacing: "0.25rem",
    cardSpacing: "1rem",
  },
  {
    id: "comfortable",
    label: "Comfortable",
    description: "More air — marketing / docs",
    spacing: "0.3rem",
    cardSpacing: "1.25rem",
  },
]

export const STYLE_PRESETS: {
  id: StylePresetId
  label: string
  description: string
  colorPreset: ColorPresetId
  font: FontId
  radius: RadiusId
  density: DensityId
}[] = [
  {
    id: "claimuw",
    label: "ClaimUW",
    description: "Ops blue, Inter, rounded cards",
    colorPreset: "claimuw",
    font: "inter",
    radius: "lg",
    density: "default",
  },
  {
    id: "soft",
    label: "Soft",
    description: "Rounded, airy, friendly",
    colorPreset: "violet",
    font: "plus-jakarta",
    radius: "xl",
    density: "comfortable",
  },
  {
    id: "sharp",
    label: "Sharp",
    description: "Boxy edges, compact density",
    colorPreset: "zinc",
    font: "ibm-plex",
    radius: "sm",
    density: "compact",
  },
  {
    id: "brutal",
    label: "Brutal",
    description: "Zero radius, bold mono-ish sans",
    colorPreset: "orange",
    font: "space-grotesk",
    radius: "none",
    density: "default",
  },
]

/** Semantic token overrides per base color (light + dark). */
export const COLOR_PRESETS: ColorPreset[] = [
  {
    id: "claimuw",
    label: "ClaimUW Blue",
    swatch: "oklch(0.62 0.19 255)",
    light: {},
    dark: {},
  },
  {
    id: "neutral",
    label: "Neutral",
    swatch: "oklch(0.45 0 0)",
    light: {
      "--primary": "oklch(0.35 0 0)",
      "--primary-foreground": "oklch(0.99 0 0)",
      "--secondary": "oklch(0.96 0 0)",
      "--secondary-foreground": "oklch(0.3 0 0)",
      "--ring": "oklch(0.45 0 0)",
      "--accent": "oklch(0.96 0 0)",
      "--accent-foreground": "oklch(0.28 0 0)",
      "--chart-1": "oklch(0.45 0 0)",
      "--chart-2": "oklch(0.55 0 0)",
      "--chart-3": "oklch(0.72 0 0)",
      "--chart-4": "oklch(0.62 0 0)",
      "--chart-5": "oklch(0.80 0 0)",
    },
    dark: {
      "--primary": "oklch(0.92 0 0)",
      "--primary-foreground": "oklch(0.2 0 0)",
      "--secondary": "oklch(0.27 0 0)",
      "--secondary-foreground": "oklch(0.98 0 0)",
      "--ring": "oklch(0.7 0 0)",
      "--accent": "oklch(0.27 0 0)",
      "--accent-foreground": "oklch(0.98 0 0)",
      "--chart-1": "oklch(0.87 0 0)",
      "--chart-2": "oklch(0.70 0 0)",
      "--chart-3": "oklch(0.56 0 0)",
      "--chart-4": "oklch(0.44 0 0)",
      "--chart-5": "oklch(0.37 0 0)",
    },
  },
  {
    id: "zinc",
    label: "Zinc",
    swatch: "oklch(0.44 0.01 260)",
    light: {
      "--primary": "oklch(0.32 0.02 260)",
      "--primary-foreground": "oklch(0.99 0 0)",
      "--secondary": "oklch(0.96 0.005 260)",
      "--secondary-foreground": "oklch(0.3 0.02 260)",
      "--ring": "oklch(0.5 0.02 260)",
      "--accent": "oklch(0.96 0.005 260)",
      "--accent-foreground": "oklch(0.28 0.02 260)",
      "--chart-1": "oklch(0.5 0.02 260)",
      "--chart-2": "oklch(0.62 0.03 250)",
      "--chart-3": "oklch(0.78 0.02 250)",
      "--chart-4": "oklch(0.68 0.03 240)",
      "--chart-5": "oklch(0.82 0.015 260)",
    },
    dark: {
      "--primary": "oklch(0.92 0.01 260)",
      "--primary-foreground": "oklch(0.2 0.02 260)",
      "--secondary": "oklch(0.27 0.01 260)",
      "--secondary-foreground": "oklch(0.98 0 0)",
      "--ring": "oklch(0.6 0.02 260)",
      "--accent": "oklch(0.27 0.01 260)",
      "--accent-foreground": "oklch(0.98 0 0)",
      "--chart-1": "oklch(0.85 0.01 260)",
      "--chart-2": "oklch(0.72 0.02 250)",
      "--chart-3": "oklch(0.58 0.02 250)",
      "--chart-4": "oklch(0.65 0.03 240)",
      "--chart-5": "oklch(0.78 0.015 260)",
    },
  },
  {
    id: "slate",
    label: "Slate",
    swatch: "oklch(0.45 0.03 250)",
    light: {
      "--primary": "oklch(0.35 0.04 250)",
      "--primary-foreground": "oklch(0.99 0 0)",
      "--secondary": "oklch(0.96 0.01 250)",
      "--secondary-foreground": "oklch(0.3 0.04 250)",
      "--ring": "oklch(0.5 0.04 250)",
      "--accent": "oklch(0.96 0.01 250)",
      "--accent-foreground": "oklch(0.28 0.04 250)",
      "--chart-1": "oklch(0.5 0.05 250)",
      "--chart-2": "oklch(0.62 0.06 230)",
      "--chart-3": "oklch(0.78 0.05 230)",
      "--chart-4": "oklch(0.68 0.06 220)",
      "--chart-5": "oklch(0.82 0.04 250)",
    },
    dark: {
      "--primary": "oklch(0.9 0.02 250)",
      "--primary-foreground": "oklch(0.22 0.03 250)",
      "--secondary": "oklch(0.27 0.02 250)",
      "--secondary-foreground": "oklch(0.98 0 0)",
      "--ring": "oklch(0.6 0.03 250)",
      "--accent": "oklch(0.27 0.02 250)",
      "--accent-foreground": "oklch(0.98 0 0)",
      "--chart-1": "oklch(0.85 0.03 250)",
      "--chart-2": "oklch(0.72 0.05 230)",
      "--chart-3": "oklch(0.60 0.04 230)",
      "--chart-4": "oklch(0.68 0.05 220)",
      "--chart-5": "oklch(0.78 0.03 250)",
    },
  },
  {
    id: "violet",
    label: "Violet",
    swatch: "oklch(0.55 0.2 295)",
    light: {
      "--primary": "oklch(0.52 0.22 295)",
      "--primary-foreground": "oklch(0.99 0 0)",
      "--secondary": "oklch(0.96 0.02 295)",
      "--secondary-foreground": "oklch(0.35 0.08 295)",
      "--ring": "oklch(0.55 0.2 295)",
      "--accent": "oklch(0.96 0.025 295)",
      "--accent-foreground": "oklch(0.32 0.1 295)",
      "--chart-1": "oklch(0.55 0.2 295)",
      "--chart-2": "oklch(0.65 0.16 320)",
      "--chart-3": "oklch(0.80 0.12 300)",
      "--chart-4": "oklch(0.62 0.18 280)",
      "--chart-5": "oklch(0.72 0.14 270)",
    },
    dark: {
      "--primary": "oklch(0.75 0.14 295)",
      "--primary-foreground": "oklch(0.2 0.05 295)",
      "--secondary": "oklch(0.28 0.04 295)",
      "--secondary-foreground": "oklch(0.98 0 0)",
      "--ring": "oklch(0.65 0.14 295)",
      "--accent": "oklch(0.28 0.04 295)",
      "--accent-foreground": "oklch(0.98 0 0)",
      "--chart-1": "oklch(0.72 0.14 295)",
      "--chart-2": "oklch(0.68 0.14 320)",
      "--chart-3": "oklch(0.80 0.10 300)",
      "--chart-4": "oklch(0.62 0.14 280)",
      "--chart-5": "oklch(0.75 0.12 270)",
    },
  },
  {
    id: "emerald",
    label: "Emerald",
    swatch: "oklch(0.58 0.14 160)",
    light: {
      "--primary": "oklch(0.52 0.14 160)",
      "--primary-foreground": "oklch(0.99 0 0)",
      "--secondary": "oklch(0.96 0.02 160)",
      "--secondary-foreground": "oklch(0.32 0.06 160)",
      "--ring": "oklch(0.55 0.12 160)",
      "--accent": "oklch(0.96 0.025 160)",
      "--accent-foreground": "oklch(0.3 0.08 160)",
      "--chart-1": "oklch(0.58 0.14 160)",
      "--chart-2": "oklch(0.68 0.12 190)",
      "--chart-3": "oklch(0.82 0.09 175)",
      "--chart-4": "oklch(0.62 0.12 145)",
      "--chart-5": "oklch(0.72 0.10 200)",
    },
    dark: {
      "--primary": "oklch(0.75 0.12 160)",
      "--primary-foreground": "oklch(0.2 0.04 160)",
      "--secondary": "oklch(0.28 0.03 160)",
      "--secondary-foreground": "oklch(0.98 0 0)",
      "--ring": "oklch(0.65 0.1 160)",
      "--accent": "oklch(0.28 0.03 160)",
      "--accent-foreground": "oklch(0.98 0 0)",
      "--chart-1": "oklch(0.72 0.12 160)",
      "--chart-2": "oklch(0.70 0.10 190)",
      "--chart-3": "oklch(0.82 0.08 175)",
      "--chart-4": "oklch(0.65 0.10 145)",
      "--chart-5": "oklch(0.75 0.09 200)",
    },
  },
  {
    id: "orange",
    label: "Orange",
    swatch: "oklch(0.7 0.17 50)",
    light: {
      "--primary": "oklch(0.65 0.18 45)",
      "--primary-foreground": "oklch(0.99 0 0)",
      "--secondary": "oklch(0.97 0.02 70)",
      "--secondary-foreground": "oklch(0.35 0.08 45)",
      "--ring": "oklch(0.68 0.16 45)",
      "--accent": "oklch(0.97 0.03 70)",
      "--accent-foreground": "oklch(0.32 0.1 45)",
      "--chart-1": "oklch(0.7 0.17 50)",
      "--chart-2": "oklch(0.72 0.14 25)",
      "--chart-3": "oklch(0.84 0.10 55)",
      "--chart-4": "oklch(0.68 0.16 70)",
      "--chart-5": "oklch(0.76 0.12 35)",
    },
    dark: {
      "--primary": "oklch(0.78 0.14 55)",
      "--primary-foreground": "oklch(0.22 0.05 45)",
      "--secondary": "oklch(0.28 0.03 50)",
      "--secondary-foreground": "oklch(0.98 0 0)",
      "--ring": "oklch(0.7 0.12 55)",
      "--accent": "oklch(0.28 0.03 50)",
      "--accent-foreground": "oklch(0.98 0 0)",
      "--chart-1": "oklch(0.75 0.14 55)",
      "--chart-2": "oklch(0.72 0.14 25)",
      "--chart-3": "oklch(0.84 0.10 55)",
      "--chart-4": "oklch(0.70 0.14 70)",
      "--chart-5": "oklch(0.78 0.12 35)",
    },
  },
  {
    id: "rose",
    label: "Rose",
    swatch: "oklch(0.6 0.2 15)",
    light: {
      "--primary": "oklch(0.55 0.2 15)",
      "--primary-foreground": "oklch(0.99 0 0)",
      "--secondary": "oklch(0.97 0.015 15)",
      "--secondary-foreground": "oklch(0.35 0.08 15)",
      "--ring": "oklch(0.58 0.18 15)",
      "--accent": "oklch(0.97 0.02 15)",
      "--accent-foreground": "oklch(0.32 0.1 15)",
      "--chart-1": "oklch(0.6 0.2 15)",
      "--chart-2": "oklch(0.68 0.16 350)",
      "--chart-3": "oklch(0.82 0.10 15)",
      "--chart-4": "oklch(0.62 0.18 350)",
      "--chart-5": "oklch(0.72 0.14 30)",
    },
    dark: {
      "--primary": "oklch(0.75 0.14 15)",
      "--primary-foreground": "oklch(0.2 0.05 15)",
      "--secondary": "oklch(0.28 0.03 15)",
      "--secondary-foreground": "oklch(0.98 0 0)",
      "--ring": "oklch(0.65 0.12 15)",
      "--accent": "oklch(0.28 0.03 15)",
      "--accent-foreground": "oklch(0.98 0 0)",
      "--chart-1": "oklch(0.72 0.14 15)",
      "--chart-2": "oklch(0.68 0.12 350)",
      "--chart-3": "oklch(0.82 0.09 15)",
      "--chart-4": "oklch(0.62 0.14 350)",
      "--chart-5": "oklch(0.75 0.12 30)",
    },
  },
]

export const DEFAULT_THEME_CONFIG = {
  theme: "light" as const,
  colorPreset: "claimuw" as ColorPresetId,
  font: "inter" as FontId,
  radius: "lg" as RadiusId,
  density: "default" as DensityId,
  stylePreset: "claimuw" as StylePresetId,
}

function findOrDefault<T extends { id: string }>(
  list: T[],
  id: string | undefined,
  fallbackId: string
): T {
  return list.find((item) => item.id === id) ?? list.find((item) => item.id === fallbackId)!
}

/** Semantic tokens presets may override (cleared when switching to ClaimUW). */
const COLOR_TOKEN_KEYS = [
  "--primary",
  "--primary-foreground",
  "--secondary",
  "--secondary-foreground",
  "--accent",
  "--accent-foreground",
  "--ring",
  "--chart-1",
  "--chart-2",
  "--chart-3",
  "--chart-4",
  "--chart-5",
] as const

/** Non-color tokens always written by the Storybook theme lab / toolbar. */
const STRUCTURAL_TOKEN_KEYS = [
  "--radius",
  "--spacing",
  "--card-spacing",
  "--font-sans",
  "--font-heading",
] as const

/** Keys we may set on documentElement and must clear when unused. */
export const THEME_MANAGED_KEYS: string[] = [
  ...COLOR_TOKEN_KEYS,
  ...STRUCTURAL_TOKEN_KEYS,
  ...COLOR_TOKEN_KEYS.map((key) => `--color-${key.slice(2)}`),
]

/** Build CSS variable map for the Storybook decorator / lab preview. */
export function resolveThemeCssVars(
  globals: ThemeConfigGlobals
): Record<string, string> {
  const isDark = (globals.theme ?? "light") === "dark"
  const color = findOrDefault(
    COLOR_PRESETS,
    globals.colorPreset,
    DEFAULT_THEME_CONFIG.colorPreset
  )
  const font = findOrDefault(FONT_OPTIONS, globals.font, DEFAULT_THEME_CONFIG.font)
  const radius = findOrDefault(
    RADIUS_OPTIONS,
    globals.radius,
    DEFAULT_THEME_CONFIG.radius
  )
  const density = findOrDefault(
    DENSITY_OPTIONS,
    globals.density,
    DEFAULT_THEME_CONFIG.density
  )

  const colorVars = isDark ? color.dark : color.light

  return {
    ...colorVars,
    "--radius": radius.value,
    "--spacing": density.spacing,
    "--card-spacing": density.cardSpacing,
    "--font-sans": font.stack,
    "--font-heading": font.stack,
    fontFamily: font.stack,
  }
}

/** Expand semantic overrides with Tailwind @theme --color-* bridges. */
export function withColorBridges(
  vars: Record<string, string>
): Record<string, string> {
  const bridged: Record<string, string> = { ...vars }
  for (const [key, value] of Object.entries(vars)) {
    if (key.startsWith("--") && !key.startsWith("--color-") && !STRUCTURAL_TOKEN_KEYS.includes(key as (typeof STRUCTURAL_TOKEN_KEYS)[number])) {
      bridged[`--color-${key.slice(2)}`] = value
    }
  }
  return bridged
}

/**
 * Write theme tokens onto an element (typically document.documentElement)
 * so every story, portal, and :root-scoped utility picks them up. Clears
 * managed keys that are not in the current map (e.g. ClaimUW empty preset).
 */
export function applyThemeToElement(
  element: HTMLElement,
  vars: Record<string, string>,
  isDark: boolean
): void {
  const next = withColorBridges(vars)

  for (const key of THEME_MANAGED_KEYS) {
    if (key in next) {
      element.style.setProperty(key, next[key]!)
    } else {
      element.style.removeProperty(key)
    }
  }

  element.classList.toggle("dark", isDark)
  element.style.fontFamily = vars.fontFamily ?? ""
}

/** CSS snippet users can copy into design-tokens.css / globals. */
export function buildThemeCssSnippet(globals: ThemeConfigGlobals): string {
  const vars = resolveThemeCssVars({ ...globals, theme: "light" })
  const darkVars = resolveThemeCssVars({ ...globals, theme: "dark" })
  const font = findOrDefault(FONT_OPTIONS, globals.font, DEFAULT_THEME_CONFIG.font)
  const radius = findOrDefault(
    RADIUS_OPTIONS,
    globals.radius,
    DEFAULT_THEME_CONFIG.radius
  )
  const density = findOrDefault(
    DENSITY_OPTIONS,
    globals.density,
    DEFAULT_THEME_CONFIG.density
  )

  const formatBlock = (map: Record<string, string>) =>
    Object.entries(map)
      .filter(([key]) => key.startsWith("--"))
      .map(([key, value]) => `  ${key}: ${value};`)
      .join("\n")

  const lightOnly = Object.fromEntries(
    Object.entries(vars).filter(([key]) => key.startsWith("--"))
  )
  const darkOnly = Object.fromEntries(
    Object.entries(darkVars).filter(
      ([key, value]) =>
        key.startsWith("--") &&
        !["--radius", "--spacing", "--card-spacing", "--font-sans", "--font-heading"].includes(
          key
        ) &&
        lightOnly[key] !== value
    )
  )

  return `/* Generated from Storybook → Foundation / Configure */
:root {
  --radius: ${radius.value};
  --spacing: ${density.spacing};
${formatBlock(
  Object.fromEntries(
    Object.entries(lightOnly).filter(
      ([key]) =>
        !["--radius", "--spacing", "--card-spacing", "--font-sans", "--font-heading"].includes(
          key
        )
    )
  )
)}
}

@theme inline {
  --font-sans: ${font.stack};
  --font-heading: ${font.stack};
}

.dark {
${formatBlock(darkOnly) || "  /* no dark overrides for this preset */"}
}

/* Density hint for cards (optional) */
[data-slot="card"] {
  --card-spacing: ${density.cardSpacing};
}
`
}

export function matchStylePreset(
  globals: ThemeConfigGlobals
): StylePresetId | "custom" {
  const match = STYLE_PRESETS.find(
    (preset) =>
      preset.colorPreset === (globals.colorPreset ?? DEFAULT_THEME_CONFIG.colorPreset) &&
      preset.font === (globals.font ?? DEFAULT_THEME_CONFIG.font) &&
      preset.radius === (globals.radius ?? DEFAULT_THEME_CONFIG.radius) &&
      preset.density === (globals.density ?? DEFAULT_THEME_CONFIG.density)
  )
  return match?.id ?? "custom"
}
