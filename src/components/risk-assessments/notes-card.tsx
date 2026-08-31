import {
  NotesCard as StorybookNotesCard,
  type Note,
} from "@/components/ui/notes-card"

/**
 * Adapts the assessment's persisted note string to the shared Storybook card.
 */
export function NotesCard({
  notes,
  className,
}: {
  notes: string | null
  className?: string
}) {
  const noteEntries: Note[] = notes
    ? [
        {
          id: "assessment-note",
          body: notes,
          author: "System Administrator",
          createdAt: "Assessment record",
        },
      ]
    : []

  return (
    <StorybookNotesCard
      title="Underwriter notes"
      authorName="System Administrator"
      notes={noteEntries}
      className={className}
    />
  )
}
