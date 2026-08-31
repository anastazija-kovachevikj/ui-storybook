"use client"

import { useEffect, useId, useState, type ReactNode } from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  fieldTypeOptions,
  type NewPolicyFieldInput,
  type PolicyField,
  type PolicyFieldType,
} from "@/components/vendors/data"
import { cn } from "@/lib/utils"

const emptyForm: NewPolicyFieldInput = {
  key: "",
  label: "",
  type: "string",
  parentId: "",
  required: false,
  attribute: false,
  showInPolicyForm: false,
  defaultValue: "",
  outboundPath: "",
  inboundPath: "",
  position: "",
}

type AddFieldDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  fields: PolicyField[]
  onSubmit: (input: NewPolicyFieldInput) => void
}

function FieldHint({
  children,
  variant = "optional",
  title,
}: {
  children: ReactNode
  variant?: "optional" | "fallback"
  title?: string
}) {
  return (
    <span
      title={title}
      className={cn(
        "inline-flex h-4 max-w-full shrink-0 items-center truncate rounded-md px-1.5 text-[10px] leading-none",
        variant === "optional"
          ? "bg-muted font-medium tracking-wide text-muted-foreground uppercase"
          : "bg-muted/80 font-mono text-muted-foreground ring-1 ring-border/60"
      )}
    >
      {children}
    </span>
  )
}

function FieldLabel({
  htmlFor,
  children,
  hint,
}: {
  htmlFor: string
  children: ReactNode
  hint?: ReactNode
}) {
  return (
    <div className="mb-1 flex min-w-0 items-center gap-1.5">
      <label
        htmlFor={htmlFor}
        className="truncate text-xs font-medium text-muted-foreground"
      >
        {children}
      </label>
      {hint}
    </div>
  )
}

function FormSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="space-y-2">
      <h3 className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
        {title}
      </h3>
      {children}
    </section>
  )
}

const controlClassName = cn(
  "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none transition-colors",
  "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
  "disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30"
)

export function AddFieldDialog({
  open,
  onOpenChange,
  fields,
  onSubmit,
}: AddFieldDialogProps) {
  const formId = useId()
  const [form, setForm] = useState<NewPolicyFieldInput>(emptyForm)

  useEffect(() => {
    if (open) setForm(emptyForm)
  }, [open])

  function update<K extends keyof NewPolicyFieldInput>(
    key: K,
    value: NewPolicyFieldInput[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const key = form.key.trim()
    if (!key) return
    onSubmit({ ...form, key })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="gap-0 overflow-hidden p-0 sm:max-w-lg"
        data-testid="add-field-dialog"
      >
        <DialogHeader className="gap-1 border-b px-4 py-3 pr-12">
          <DialogTitle>Add field</DialogTitle>
          <DialogDescription>
            Identity, flags, and XML path mapping.
          </DialogDescription>
        </DialogHeader>

        <form
          id={formId}
          onSubmit={handleSubmit}
          className="space-y-3.5 px-4 py-3.5"
        >
          <FormSection title="Identity">
            <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
              <div>
                <FieldLabel htmlFor={`${formId}-key`}>Key</FieldLabel>
                <Input
                  id={`${formId}-key`}
                  name="key"
                  required
                  autoFocus
                  placeholder="e.g. broker_id"
                  value={form.key}
                  onChange={(e) => update("key", e.target.value)}
                  className="font-mono"
                />
              </div>
              <div>
                <FieldLabel
                  htmlFor={`${formId}-label`}
                  hint={<FieldHint>Optional</FieldHint>}
                >
                  Display label
                </FieldLabel>
                <Input
                  id={`${formId}-label`}
                  name="label"
                  value={form.label}
                  onChange={(e) => update("label", e.target.value)}
                />
              </div>
              <div>
                <FieldLabel htmlFor={`${formId}-type`}>Type</FieldLabel>
                <select
                  id={`${formId}-type`}
                  name="type"
                  className={controlClassName}
                  value={form.type}
                  onChange={(e) =>
                    update("type", e.target.value as PolicyFieldType)
                  }
                >
                  {fieldTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <FieldLabel htmlFor={`${formId}-parent`}>Parent</FieldLabel>
                <select
                  id={`${formId}-parent`}
                  name="parent"
                  className={controlClassName}
                  value={form.parentId}
                  onChange={(e) => update("parentId", e.target.value)}
                >
                  <option value="">— top level —</option>
                  {fields.map((field) => (
                    <option key={field.id} value={field.id}>
                      {field.key}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <FieldLabel
                  htmlFor={`${formId}-position`}
                  hint={<FieldHint>Optional</FieldHint>}
                >
                  Position
                </FieldLabel>
                <Input
                  id={`${formId}-position`}
                  name="position"
                  type="number"
                  min={0}
                  value={form.position}
                  onChange={(e) => update("position", e.target.value)}
                />
              </div>
              <div>
                <FieldLabel
                  htmlFor={`${formId}-default`}
                  hint={<FieldHint>Optional</FieldHint>}
                >
                  Default value
                </FieldLabel>
                <Input
                  id={`${formId}-default`}
                  name="defaultValue"
                  value={form.defaultValue}
                  onChange={(e) => update("defaultValue", e.target.value)}
                />
              </div>
            </div>
          </FormSection>

          <FormSection title="Flags">
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-3">
              <label className="flex items-center gap-2 rounded-md px-1 py-1 text-sm">
                <Checkbox
                  checked={form.required}
                  onCheckedChange={(checked) =>
                    update("required", checked === true)
                  }
                />
                Required
              </label>
              <label className="flex items-center gap-2 rounded-md px-1 py-1 text-sm">
                <Checkbox
                  checked={form.attribute}
                  onCheckedChange={(checked) =>
                    update("attribute", checked === true)
                  }
                />
                XML attribute
              </label>
              <label className="flex items-center gap-2 rounded-md px-1 py-1 text-sm">
                <Checkbox
                  checked={form.showInPolicyForm}
                  onCheckedChange={(checked) =>
                    update("showInPolicyForm", checked === true)
                  }
                />
                In policy form
              </label>
            </div>
          </FormSection>

          <FormSection title="Paths">
            <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
              <div>
                <FieldLabel
                  htmlFor={`${formId}-outbound`}
                  hint={
                    <FieldHint
                      variant="fallback"
                      title="Leave empty to use the field key"
                    >
                      → {form.key.trim() || "key"}
                    </FieldHint>
                  }
                >
                  Outbound path
                </FieldLabel>
                <Input
                  id={`${formId}-outbound`}
                  name="outboundPath"
                  className="font-mono"
                  placeholder={form.key.trim() || "key"}
                  value={form.outboundPath}
                  onChange={(e) => update("outboundPath", e.target.value)}
                />
              </div>
              <div>
                <FieldLabel
                  htmlFor={`${formId}-inbound`}
                  hint={
                    <FieldHint
                      variant="fallback"
                      title="Leave empty to use the outbound path"
                    >
                      {`→ ${form.outboundPath.trim() || form.key.trim() || "outbound"}`}
                    </FieldHint>
                  }
                >
                  Inbound path
                </FieldLabel>
                <Input
                  id={`${formId}-inbound`}
                  name="inboundPath"
                  className="font-mono"
                  placeholder={
                    form.outboundPath.trim() || form.key.trim() || "outbound"
                  }
                  value={form.inboundPath}
                  onChange={(e) => update("inboundPath", e.target.value)}
                />
              </div>
            </div>
          </FormSection>
        </form>

        <DialogFooter className="mx-0 mb-0 gap-2 border-t px-4 py-3">
          <Button
            type="button"
            variant="outline"
            className="h-8"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button type="submit" form={formId} className="h-8 gap-1.5">
            <Plus className="size-3.5" aria-hidden />
            Add field
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
