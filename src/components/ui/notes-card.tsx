"use client"

import { useId, useState } from "react"
import { MessageSquarePlus, Send, StickyNote, Trash2, X } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

export type Note = {
  id: string
  body: string
  author: string
  createdAt: string
}

export type NotesCardProps = {
  notes?: Note[]
  title?: string
  authorName?: string
  className?: string
  /** Opens the composer on mount — useful for Storybook demos */
  defaultComposing?: boolean
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
}

const AVATAR_TONES = [
  "bg-primary/12 text-primary",
  "bg-badge-positive-fill/50 text-badge-positive-fill-foreground",
  "bg-badge-glow-warning/20 text-warning",
  "bg-muted text-foreground/70",
] as const

function avatarTone(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i += 1) {
    hash = (hash + name.charCodeAt(i) * (i + 1)) % AVATAR_TONES.length
  }
  return AVATAR_TONES[hash]
}

export function NotesCard({
  notes: initialNotes = [],
  title = "Notes",
  authorName = "System Administrator",
  className,
  defaultComposing = false,
}: NotesCardProps) {
  const draftId = useId()
  const [notes, setNotes] = useState(initialNotes)
  const [draft, setDraft] = useState("")
  const [isComposing, setIsComposing] = useState(defaultComposing)
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null)

  function closeComposer() {
    setDraft("")
    setIsComposing(false)
  }

  function addNote() {
    const body = draft.trim()
    if (!body) return

    setNotes((current) => [
      {
        id: crypto.randomUUID(),
        body,
        author: authorName,
        createdAt: "Just now",
      },
      ...current,
    ])
    closeComposer()
  }

  function deleteNote() {
    if (!noteToDelete) return

    setNotes((current) => current.filter((note) => note.id !== noteToDelete.id))
    setNoteToDelete(null)
  }

  const hasNotes = notes.length > 0
  const showHeaderAction = hasNotes && !isComposing

  return (
    <Card
      size="sm"
      className={cn(
        "flex h-full flex-col border-0 bg-card shadow-none ring-1 ring-border",
        className
      )}
    >
      <CardHeader className="items-center">
        <CardTitle className="flex min-w-0 items-center gap-2 text-sm font-semibold">
          <span className="flex size-5 shrink-0 items-center justify-center text-muted-foreground">
            <StickyNote className="size-4" aria-hidden />
          </span>
          <span className="truncate">{title}</span>
          {hasNotes ? (
            <Badge variant="count" size="count" className="size-5 text-[10px]">
              {notes.length}
            </Badge>
          ) : null}
        </CardTitle>
        {showHeaderAction ? (
          <CardAction>
            <Button
              variant="outline"
              size="sm"
              className="h-7 gap-1.5"
              onClick={() => setIsComposing(true)}
            >
              <MessageSquarePlus className="size-3.5" aria-hidden />
              Add note
            </Button>
          </CardAction>
        ) : null}
      </CardHeader>

      <CardContent className="flex min-h-0 flex-1 flex-col gap-3">
        {isComposing ? (
          <NoteComposer
            draftId={draftId}
            draft={draft}
            onDraftChange={setDraft}
            onCancel={closeComposer}
            onSave={addNote}
          />
        ) : null}

        {!hasNotes && !isComposing ? (
          <EmptyNotes onAdd={() => setIsComposing(true)} />
        ) : hasNotes ? (
          <ul className="flex max-h-80 flex-col gap-2 overflow-y-auto overscroll-contain pr-0.5">
            {notes.map((note) => (
              <NoteItem key={note.id} note={note} onDelete={() => setNoteToDelete(note)} />
            ))}
          </ul>
        ) : null}
      </CardContent>

      <Dialog
        open={noteToDelete !== null}
        onOpenChange={(open) => {
          if (!open) setNoteToDelete(null)
        }}
      >
        <DialogContent showCloseButton={false} className="gap-0 overflow-hidden p-0 sm:max-w-sm">
          <DialogHeader className="gap-2 px-4 py-4">
            <DialogTitle>Delete note?</DialogTitle>
            <DialogDescription>
              This will permanently delete this note. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mx-0 mb-0 gap-2 px-4 py-3">
            <Button variant="outline" onClick={() => setNoteToDelete(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={deleteNote}>
              Delete note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

function NoteComposer({
  draftId,
  draft,
  onDraftChange,
  onCancel,
  onSave,
}: {
  draftId: string
  draft: string
  onDraftChange: (value: string) => void
  onCancel: () => void
  onSave: () => void
}) {
  return (
    <div className="rounded-xl border border-border/80 bg-muted/30 p-3 shadow-sm ring-1 ring-foreground/5">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-xs font-medium text-muted-foreground">New note</p>
        <span className="text-[11px] text-muted-foreground/80">
          Visible to your team
        </span>
      </div>
      <label className="sr-only" htmlFor={draftId}>
        New note
      </label>
      <textarea
        id={draftId}
        value={draft}
        onChange={(event) => onDraftChange(event.target.value)}
        placeholder="Write a note…"
        className="min-h-24 w-full resize-y rounded-lg border border-transparent bg-background/80 px-3 py-2.5 text-sm leading-6 text-foreground outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
        autoFocus
      />
      <div className="mt-3 flex items-center justify-end gap-2">
        <Button variant="ghost" size="sm" className="h-8" onClick={onCancel}>
          <X className="size-3.5" aria-hidden />
          Cancel
        </Button>
        <Button
          size="sm"
          className="h-8 gap-1.5"
          onClick={onSave}
          disabled={!draft.trim()}
        >
          <Send className="size-3.5" aria-hidden />
          Save note
        </Button>
      </div>
    </div>
  )
}

function NoteItem({ note, onDelete }: { note: Note; onDelete: () => void }) {
  return (
    <li className="group rounded-xl bg-muted/45 px-3 py-3 ring-1 ring-border/60 transition-colors hover:bg-muted/70">
      <div className="flex items-start gap-3">
        <Avatar size="sm" className="mt-0.5">
          <AvatarFallback className={cn("text-[10px] font-semibold", avatarTone(note.author))}>
            {getInitials(note.author)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-2">
            <div className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="text-sm font-semibold text-foreground">
              {note.author}
            </span>
            <time className="text-xs text-muted-foreground">{note.createdAt}</time>
            </div>
            <Button
              variant="ghost"
              size="icon-xs"
              className="-mr-1 -mt-1 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 hover:bg-destructive/10 hover:text-destructive"
              onClick={onDelete}
              aria-label={`Delete note by ${note.author}`}
            >
              <Trash2 className="size-3.5" aria-hidden />
            </Button>
          </div>
          <p className="mt-1.5 whitespace-pre-wrap text-sm leading-6 text-foreground/90">
            {note.body}
          </p>
        </div>
      </div>
    </li>
  )
}

function EmptyNotes({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 px-5 py-8 text-center">
      <span className="flex size-11 items-center justify-center rounded-2xl bg-background text-muted-foreground shadow-sm ring-1 ring-border">
        <StickyNote className="size-4" aria-hidden />
      </span>
      <h3 className="mt-3.5 text-sm font-semibold text-foreground">
        No notes yet
      </h3>
      <p className="mt-1 max-w-[16rem] text-sm leading-6 text-muted-foreground">
        Capture context, follow-ups, or details for everyone working on this
        record.
      </p>
      <Button
        variant="outline"
        size="sm"
        className="mt-4 h-8 gap-1.5"
        onClick={onAdd}
      >
        <MessageSquarePlus className="size-3.5" aria-hidden />
        Add the first note
      </Button>
    </div>
  )
}
