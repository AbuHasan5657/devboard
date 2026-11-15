import { useState } from "react"
import { CalendarDays, CircleUser, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Task } from "@/types"

type TaskCardProps = {
  task: Task
  columnId: string
  onDelete: (taskId: string) => void
  onEdit: (task: Task) => void
}

function formatDate(value: string) {
  const [year, month, day] = value.split("-")
  return `${day}.${month}.${year}`
}

export default function TaskCard({
  task,
  columnId,
  onDelete,
  onEdit,
}: TaskCardProps) {
  const [isDragging, setIsDragging] = useState(false)
  const today = new Date().toLocaleDateString("sv-SE")
  const overdue = task.dueDate ? task.dueDate < today : false

  function handleDragStart(e: React.DragEvent<HTMLLIElement>) {
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({ taskId: task.id, fromColumnId: columnId })
    )
    e.dataTransfer.effectAllowed = "move"
    setIsDragging(true)
  }

  return (
    <li
      draggable
      onClick={() => onEdit(task)}
      onDragStart={handleDragStart}
      onDragEnd={() => setIsDragging(false)}
      className={`group relative cursor-pointer rounded-md border bg-card p-3 pr-16 transition hover:border-primary/50 hover:shadow-sm ${
        isDragging ? "opacity-40" : ""
      }`}
    >
      <p className="font-medium">{task.title}</p>
      {task.description && (
        <p className="mt-1 line-clamp-3 text-xs whitespace-pre-line text-muted-foreground">
          {task.description}
        </p>
      )}
      {task.assignee && (
        <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
          <CircleUser className="size-3.5" />
          {task.assignee}
        </p>
      )}
      {task.dueDate && (
        <p
          className={`mt-1 flex items-center gap-1 text-xs ${
            overdue ? "text-destructive" : "text-muted-foreground"
          }`}
        >
          <CalendarDays className="size-3.5" />
          {formatDate(task.dueDate)}
        </p>
      )}

      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1.5 right-9 size-7 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
        onClick={(e) => {
          e.stopPropagation()
          onEdit(task)
        }}
        aria-label="Task bearbeiten"
      >
        <Pencil className="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1.5 right-1.5 size-7 text-muted-foreground hover:text-destructive"
        onClick={(e) => {
          e.stopPropagation()
          onDelete(task.id)
        }}
        aria-label="Task löschen"
      >
        <Trash2 className="size-4" />
      </Button>
    </li>
  )
}
