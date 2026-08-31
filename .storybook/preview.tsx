import { useEffect, useMemo, type CSSProperties, type ReactNode } from "react"
import type { Preview } from "@storybook/nextjs-vite"

// Tailwind v4 + design tokens (colors, spacing, KPI geometry, dark theme)
import "../src/app/globals.css"
import {
  applyThemeToElement,
  COLOR_PRESETS,
  DEFAULT_THEME_CONFIG,
  DENSITY_OPTIONS,
  FONT_OPTIONS,
  RADIUS_OPTIONS,
  resolveThemeCssVars,
  withColorBridges,
  type ThemeConfigGlobals,
} from "../src/styles/theme-config"

function ThemeDecorator({
  globals,
  layout,
  children,
}: {
  globals: ThemeConfigGlobals
  layout?: string
  children: ReactNode
}) {
  const isDark = (globals.theme ?? "light") === "dark"
  const isFullscreen = layout === "fullscreen"
  const themeKey = [
    globals.theme,
    globals.colorPreset,
    globals.font,
    globals.radius,
    globals.density,
  ].join("|")
  const cssVars = useMemo(
    () => withColorBridges(resolveThemeCssVars(globals)),
    // globals fields are encoded in themeKey
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [themeKey]
  )

  useEffect(() => {
    applyThemeToElement(document.documentElement, cssVars, isDark)
  }, [cssVars, isDark])

  return (
    <div
      className={
        isFullscreen
          ? "h-svh w-full overflow-auto bg-background font-sans text-foreground antialiased"
          : "inline-block rounded-xl bg-background p-8 font-sans text-foreground antialiased"
      }
      style={cssVars as CSSProperties}
    >
      {children}
    </div>
  )
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
    layout: "centered",
    backgrounds: {
      disable: true,
    },
    docs: {
      toc: true,
    },
  },
  globalTypes: {
    theme: {
      description: "Light / dark color scheme",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", icon: "sun", title: "Light" },
          { value: "dark", icon: "moon", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
    colorPreset: {
      description: "Base color / primary palette",
      toolbar: {
        title: "Color",
        icon: "paintbrush",
        items: COLOR_PRESETS.map((preset) => ({
          value: preset.id,
          title: preset.label,
        })),
        dynamicTitle: true,
      },
    },
    font: {
      description: "Sans font stack",
      toolbar: {
        title: "Font",
        icon: "paragraph",
        items: FONT_OPTIONS.map((font) => ({
          value: font.id,
          title: font.label,
        })),
        dynamicTitle: true,
      },
    },
    radius: {
      description: "Border radius base token",
      toolbar: {
        title: "Radius",
        icon: "button",
        items: RADIUS_OPTIONS.map((radius) => ({
          value: radius.id,
          title: radius.label,
        })),
        dynamicTitle: true,
      },
    },
    density: {
      description: "Spacing density",
      toolbar: {
        title: "Spacing",
        icon: "expand",
        items: DENSITY_OPTIONS.map((density) => ({
          value: density.id,
          title: density.label,
        })),
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: DEFAULT_THEME_CONFIG.theme,
    colorPreset: DEFAULT_THEME_CONFIG.colorPreset,
    font: DEFAULT_THEME_CONFIG.font,
    radius: DEFAULT_THEME_CONFIG.radius,
    density: DEFAULT_THEME_CONFIG.density,
  },
  decorators: [
    (Story, context) => (
      <ThemeDecorator
        globals={context.globals as ThemeConfigGlobals}
        layout={context.parameters.layout as string | undefined}
      >
        <Story />
      </ThemeDecorator>
    ),
  ],
}

export default preview
