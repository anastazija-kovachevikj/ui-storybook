import type { StorybookConfig } from "@storybook/nextjs-vite"
import tailwindcss from "@tailwindcss/vite"
import { mergeConfig } from "vite"

/**
 * Storybook + Tailwind v4
 * -----------------------
 * - @tailwindcss/vite processes utilities and @theme tokens in stories
 * - Design tokens live in src/styles/design-tokens.css (imported via globals.css)
 * - Change tokens once → app + Storybook stay aligned
 */
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp",
  ],
  framework: "@storybook/nextjs-vite",
  staticDirs: ["../public"],
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [tailwindcss()],
    })
  },
}

export default config
