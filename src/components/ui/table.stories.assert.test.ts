/**
 * Structural + render assertions for Components/Table stories.
 * Drives the real shadcn Table primitives and the story module renders.
 */
import { createElement, type ReactElement, type ReactNode } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, it } from "vitest"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

/** Expected story export names → primary column headers (criterion 2). */
export const TABLE_STORY_SPECS = [
  {
    exportName: "Default",
    storyName: "Default",
    headers: ["Status", "Email", "Amount"],
    sampleCell: "ken99@example.com",
  },
  {
    exportName: "ProjectManagement",
    storyName: "01 Project Management",
    headers: ["#", "Project Name", "Budget", "Manager", "Progress", "Action"],
    sampleCell: "Web App Project",
  },
  {
    exportName: "InvoiceManagement",
    storyName: "02 Invoice Management",
    headers: ["ID", "Status", "Customer", "Total", "Issued Date", "Actions"],
    sampleCell: "#5099",
  },
  {
    exportName: "CourseAssignmentOverview",
    storyName: "03 Course Assignment Overview",
    headers: ["Authors", "Courses", "Users"],
    sampleCell: "Top Authors",
  },
  {
    exportName: "RevenueTracker",
    storyName: "04 Revenue Tracker",
    headers: ["Assigned", "Progress", "Priority", "Budget"],
    sampleCell: "Minecraf App",
  },
  {
    exportName: "TransactionStatus",
    storyName: "05 Transaction Status",
    headers: ["Status", "Email", "Amount"],
    sampleCell: "ken99@example.com",
  },
  {
    exportName: "UserSubscriptionManagement",
    storyName: "06 User Subscription Management",
    headers: ["User", "Role", "Plan", "Billing", "Status", "Actions"],
    sampleCell: "Olivia Rhye",
  },
  {
    exportName: "ProjectOverview",
    storyName: "07 Project Overview",
    headers: ["User", "Project Name", "Team", "Status", "Budget"],
    sampleCell: "Elite Admin",
  },
  {
    exportName: "TopPerformingProducts",
    storyName: "08 Top Performing Products",
    headers: ["Product Name", "Category", "Sales", "Earnings", "Technology"],
    sampleCell: "MaterialM - Admin",
  },
  {
    exportName: "PopularProducts",
    storyName: "09 Popular Products",
    headers: ["Products", "Payment", "Status"],
    sampleCell: "iPhone 13 pro max",
  },
  {
    exportName: "CustomerReviews",
    storyName: "10 Customer Reviews",
    headers: ["#", "Customer", "Reviews", "Time"],
    sampleCell: "Arlene McCoy",
  },
  {
    exportName: "ProjectTracking",
    storyName: "11 Project Tracking",
    headers: ["Name", "Budget", "Team", "Leader", "Activity Log"],
    sampleCell: "Photoshop",
  },
] as const

type StoryExport = {
  name?: string
  play?: unknown
  render?: () => ReactNode
}

function renderBaselineTable(headers: readonly string[], sampleCell: string) {
  return createElement(
    Table,
    null,
    createElement(
      TableHeader,
      null,
      createElement(
        TableRow,
        null,
        ...headers.map((h) => createElement(TableHead, { key: h }, h))
      )
    ),
    createElement(
      TableBody,
      null,
      createElement(
        TableRow,
        null,
        createElement(TableCell, null, sampleCell),
        ...headers.slice(1).map((h) =>
          createElement(TableCell, { key: h }, "—")
        )
      )
    )
  )
}

describe("Table story specs (Default + 11 variants)", () => {
  it("defines Default plus exactly 11 named variants", () => {
    expect(TABLE_STORY_SPECS).toHaveLength(12)
    expect(TABLE_STORY_SPECS[0]?.exportName).toBe("Default")
    expect(
      TABLE_STORY_SPECS.filter((s) => s.exportName !== "Default")
    ).toHaveLength(11)
  })

  it.each([...TABLE_STORY_SPECS])(
    "$exportName ($storyName) renders required headers and a data cell via Table primitives",
    ({ headers, sampleCell }) => {
      const html = renderToStaticMarkup(
        renderBaselineTable(headers, sampleCell)
      )
      expect(html).toContain('data-slot="table"')
      for (const header of headers) {
        expect(html).toContain(`>${header}</th>`)
      }
      expect(html).toContain(sampleCell)
      expect(html).toContain('data-slot="table-row"')
    }
  )
})

describe("table.stories.tsx module exports", async () => {
  const stories = await import("./table.stories")

  it("exports Default and all 11 variant stories", () => {
    for (const spec of TABLE_STORY_SPECS) {
      expect(stories).toHaveProperty(spec.exportName)
      const story = (stories as Record<string, StoryExport>)[spec.exportName]
      expect(story).toBeTruthy()
      expect(typeof story.render).toBe("function")
      expect(typeof story.play).toBe("function")
      if (spec.exportName !== "Default") {
        expect(story.name).toBe(spec.storyName)
      }
    }
  })

  it.each([...TABLE_STORY_SPECS])(
    "$exportName story render() markup includes headers and sample cell",
    ({ exportName, headers, sampleCell }) => {
      const story = (stories as Record<string, StoryExport>)[exportName]
      const node = story.render?.()
      expect(node).toBeTruthy()
      const html = renderToStaticMarkup(node as ReactElement)
      expect(html).toContain('data-slot="table"')
      for (const header of headers) {
        // Data Table headers may wrap label text in buttons/divs.
        expect(html).toContain(header)
      }
      expect(html).toContain(sampleCell)
    }
  )
})
