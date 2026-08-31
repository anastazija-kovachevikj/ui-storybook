"use client"

import { useId, useState } from "react"
import { FilePlus2, FileText, Plus, Send, X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

/**
 * Clause companion to the Storybook NotesCard: a small editable record list.
 */
export function ClausesCard({
  clauses,
  className,
}: {
  clauses: string[]
  className?: string
}) {
  const clauseId = useId()
  const [entries, setEntries] = useState(clauses)
  const [draft, setDraft] = useState("")
  const [isComposing, setIsComposing] = useState(false)

  function closeComposer() {
    setDraft("")
    setIsComposing(false)
  }

  function addClause() {
    const clause = draft.trim()
    if (!clause) return

    setEntries((current) => [clause, ...current])
    closeComposer()
  }

  const hasClauses = entries.length > 0

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
            <FileText className="size-4" aria-hidden />
          </span>
          <span className="truncate">Clauses</span>
          {hasClauses ? (
            <Badge variant="count" size="count" className="size-5 text-[10px]">
              {entries.length}
            </Badge>
          ) : null}
        </CardTitle>
        {hasClauses && !isComposing ? (
          <CardAction>
            <Button
              variant="outline"
              size="sm"
              className="h-7 gap-1.5"
              onClick={() => setIsComposing(true)}
            >
              <Plus className="size-3.5" aria-hidden />
              Add clause
            </Button>
          </CardAction>
        ) : null}
      </CardHeader>

      <CardContent className="flex min-h-0 flex-1 flex-col gap-3">
        {isComposing ? (
          <ClauseComposer
            clauseId={clauseId}
            draft={draft}
            onDraftChange={setDraft}
            onCancel={closeComposer}
            onSave={addClause}
          />
        ) : null}

        {!hasClauses && !isComposing ? (
          <EmptyClauses onAdd={() => setIsComposing(true)} />
        ) : hasClauses ? (
          <ul className="flex max-h-80 flex-col gap-2 overflow-y-auto overscroll-contain pr-0.5">
            {entries.map((clause, index) => (
              <li
                key={`${clause}-${index}`}
                className="flex items-start gap-3 rounded-xl bg-muted/45 px-3 py-3 ring-1 ring-border/60 transition-colors hover:bg-muted/70"
              >
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileText className="size-3.5" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm leading-6 font-semibold text-foreground">
                    {clause}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Applies to this assessment
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </CardContent>
    </Card>
  )
}

function ClauseComposer({
  clauseId,
  draft,
  onDraftChange,
  onCancel,
  onSave,
}: {
  clauseId: string
  draft: string
  onDraftChange: (value: string) => void
  onCancel: () => void
  onSave: () => void
}) {
  return (
    <div className="rounded-xl border border-border/80 bg-muted/30 p-3 shadow-sm ring-1 ring-foreground/5">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-xs font-medium text-muted-foreground">New clause</p>
        <span className="text-[11px] text-muted-foreground/80">
          Included in the offer
        </span>
      </div>
      <label className="sr-only" htmlFor={clauseId}>
        New clause
      </label>
      <textarea
        id={clauseId}
        value={draft}
        onChange={(event) => onDraftChange(event.target.value)}
        placeholder="Add a special condition…"
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
          Save clause
        </Button>
      </div>
    </div>
  )
}

function EmptyClauses({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 px-5 py-8 text-center">
      <span className="flex size-11 items-center justify-center rounded-2xl bg-background text-muted-foreground shadow-sm ring-1 ring-border">
        <FilePlus2 className="size-4" aria-hidden />
      </span>
      <h3 className="mt-3.5 text-sm font-semibold text-foreground">
        No clauses yet
      </h3>
      <p className="mt-1 max-w-[16rem] text-sm leading-6 text-muted-foreground">
        Add special conditions that should travel with this assessment.
      </p>
      <Button
        variant="outline"
        size="sm"
        className="mt-4 h-8 gap-1.5"
        onClick={onAdd}
      >
        <Plus className="size-3.5" aria-hidden />
        Add the first clause
      </Button>
    </div>
  )
}
