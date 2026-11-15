import { useState } from "react"
import { Check, Pencil, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import type { Column, Task } from "@/types"
import TaskCard from "./TaskCard"

type BoardColumnProps = {
  column: Column
  onAddTask: (columnId: string) => void
  onDeleteTask: (columnId: string, taskId: string) => void
  onMoveTask: (taskId: string, fromColumnId: string, toColumnId: string) => void
  onRenameColumn: (columnId: string, title: string) => void
  onEditTask: (columnId: string, task: Task) => void
}

export default function BoardColumn({
  column,
  onAddTask,
  onDeleteTask,
  onMoveTask,
  onRenameColumn,
  onEditTask,
}: BoardColumnProps) {
  const [isDragHover, setIsDragHover] = useState(false)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState("")

  function startEdit() {
    setDraft(column.title)
    setEditing(true)
  }

  function cancelEdit() {
    setEditing(false)
  }

  function saveEdit() {
    if (!draft.trim()) return
    onRenameColumn(column.id, draft.trim())
    setEditing(false)
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    setIsDragHover(true)
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragHover(false)
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragHover(false)
    try {
      const data = JSON.parse(e.dataTransfer.getData("application/json"))
      onMoveTask(data.taskId, data.fromColumnId, column.id)
    } catch {
      // kein gültiger Task: ignorieren
    }
  }

  return (
    <Card
      onDragEnter={() => setIsDragHover(true)}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`gap-0 py-0 transition-colors ${
        isDragHover ? "border-2 border-sky-500" : ""
      }`}
    >
      <div className="group flex items-center justify-between border-b px-4 py-3">
        {editing ? (
          <div className="flex items-center gap-1">
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") saveEdit()
                if (e.key === "Escape") cancelEdit()
              }}
              className="h-8 w-40"
              autoFocus
            />
            <Button
              variant="ghost"
              size="icon"
              className="size-7"
              onClick={saveEdit}
              disabled={!draft.trim()}
              aria-label="Speichern"
            >
              <Check className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-7"
              onClick={cancelEdit}
              aria-label="Abbrechen"
            >
              <X className="size-4" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <h2 className="font-semibold">{column.title}</h2>
            <span className="text-sm text-muted-foreground">
              {column.tasks.length}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="size-6 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
              onClick={startEdit}
              aria-label="Spalte umbenennen"
            >
              <Pencil className="size-3.5" />
            </Button>
          </div>
        )}

        <Button
          variant="ghost"
          size="icon"
          className="size-7"
          onClick={() => onAddTask(column.id)}
          aria-label="Task hinzufügen"
        >
          <Plus className="size-4" />
        </Button>
      </div>

      <div className="min-h-24 space-y-2 p-3 text-sm">
        {isDragHover && (
          <div className="rounded-lg border-2 border-dashed border-primary bg-primary/10 p-2 text-center text-primary">
            Hier ablegen
          </div>
        )}

        {column.tasks.length === 0 && !isDragHover ? (
          <p className="py-3 text-center text-muted-foreground">
            Keine Tasks vorhanden.
          </p>
        ) : (
          <ul className="space-y-2">
            {column.tasks.map((t) => (
              <TaskCard
                key={t.id}
                task={t}
                columnId={column.id}
                onDelete={(taskId) => onDeleteTask(column.id, taskId)}
                onEdit={(task) => onEditTask(column.id, task)}
              />
            ))}
          </ul>
        )}
      </div>
    </Card>
  )
}
