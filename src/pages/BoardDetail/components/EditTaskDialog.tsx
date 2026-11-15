import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useUser } from "@/context/UserContext"
import type { Task, TaskUpdate } from "@/types"
import DatePicker from "./DatePicker"

type EditTaskDialogProps = {
  task: Task
  onClose: () => void
  onSubmit: (updates: TaskUpdate) => void
}

function parseIso(value?: string) {
  if (!value) return undefined
  const [y, m, d] = value.split("-").map(Number)
  return new Date(y, m - 1, d)
}

export default function EditTaskDialog({
  task,
  onClose,
  onSubmit,
}: EditTaskDialogProps) {
  const { username } = useUser()
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [assignee, setAssignee] = useState(task.assignee ?? "")
  const [date, setDate] = useState<Date | undefined>(parseIso(task.dueDate))

  const assignees = Array.from(
    new Set([username, task.assignee].filter((n): n is string => Boolean(n)))
  )

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      assignee: assignee || undefined,
      dueDate: date ? date.toLocaleDateString("sv-SE") : undefined,
    })
    onClose()
  }

  return (
    <Dialog
      open
      onOpenChange={(o) => {
        if (!o) onClose()
      }}
    >
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Task bearbeiten</DialogTitle>
            <DialogDescription>
              Ändere die Details dieser Aufgabe.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <label htmlFor="edit-title" className="text-sm font-medium">
              Titel
            </label>
            <Input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="edit-description" className="text-sm font-medium">
              Beschreibung
            </label>
            <Textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Was soll erledigt werden?"
              className="min-h-32"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="edit-assignee" className="text-sm font-medium">
              Zugewiesen an
            </label>
            <select
              id="edit-assignee"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              <option value="">Niemand</option>
              {assignees.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Deadline</label>
            <div className="flex gap-2">
              <DatePicker
                value={date}
                onChange={setDate}
                placeholder="Keine Deadline"
              />
              {date && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setDate(undefined)}
                  aria-label="Deadline entfernen"
                >
                  <X className="size-4" />
                </Button>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Abbrechen
            </Button>
            <Button type="submit" disabled={!title.trim()}>
              Speichern
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
