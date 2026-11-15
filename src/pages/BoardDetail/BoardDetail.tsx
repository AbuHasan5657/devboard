import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ArrowLeft, Check, Pencil, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useBoards } from "@/context/BoardsContext"
import type { Task } from "@/types"
import BoardColumn from "./components/BoardColumn"
import CreateTaskDialog from "./components/CreateTaskDialog"
import EditTaskDialog from "./components/EditTaskDialog"

export default function BoardDetail() {
  const { boardId } = useParams()
  const {
    boards,
    renameBoard,
    addTask,
    deleteTask,
    moveTask,
    renameColumn,
    updateTask,
  } = useBoards()
  const board = boards.find((b) => b.id === boardId)

  const [editingTitle, setEditingTitle] = useState(false)
  const [draft, setDraft] = useState("")
  const [taskColumnId, setTaskColumnId] = useState<string | null>(null)
  const [taskToEdit, setTaskToEdit] = useState<{
    columnId: string
    task: Task
  } | null>(null)

  if (!board) {
    return (
      <main className="p-6">
        <p className="text-lg">Board nicht gefunden.</p>
        <Link to="/devboard/boards" className="text-sky-500 underline">
          Zurück zur Übersicht
        </Link>
      </main>
    )
  }

  function startEdit() {
    setDraft(board!.name)
    setEditingTitle(true)
  }

  function cancelEdit() {
    setEditingTitle(false)
  }

  function saveEdit() {
    if (!draft.trim()) return
    renameBoard(board!.id, draft.trim())
    setEditingTitle(false)
  }

  const taskColumn = board.columns.find((c) => c.id === taskColumnId)

  return (
    <main className="p-6">
      <div className="mb-6 flex items-center gap-3">
        <Link
          to="/devboard/boards"
          aria-label="Zurück"
          className="inline-flex size-9 items-center justify-center rounded-md hover:bg-accent"
        >
          <ArrowLeft className="size-5" />
        </Link>

        {editingTitle ? (
          <>
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") saveEdit()
                if (e.key === "Escape") cancelEdit()
              }}
              className="h-9 w-64 text-lg font-bold"
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
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold">{board.name}</h1>
            <Button
              variant="ghost"
              size="icon"
              className="size-7"
              onClick={startEdit}
              aria-label="Umbenennen"
            >
              <Pencil className="size-4" />
            </Button>
          </>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {board.columns.map((col) => (
          <BoardColumn
            key={col.id}
            column={col}
            onAddTask={setTaskColumnId}
            onDeleteTask={(columnId, taskId) =>
              deleteTask(board.id, columnId, taskId)
            }
            onMoveTask={(taskId, fromColumnId, toColumnId) =>
              moveTask(board.id, taskId, fromColumnId, toColumnId)
            }
            onRenameColumn={(columnId, title) =>
              renameColumn(board.id, columnId, title)
            }
            onEditTask={(columnId, task) => setTaskToEdit({ columnId, task })}
          />
        ))}
      </div>

      <CreateTaskDialog
        open={taskColumnId !== null}
        columnTitle={taskColumn?.title}
        onClose={() => setTaskColumnId(null)}
        onSubmit={(title, description, dueDate) => {
          if (taskColumnId) {
            addTask(board.id, taskColumnId, title, description, dueDate)
          }
        }}
      />

      {taskToEdit && (
        <EditTaskDialog
          key={taskToEdit.task.id}
          task={taskToEdit.task}
          onClose={() => setTaskToEdit(null)}
          onSubmit={(updates) =>
            updateTask(
              board.id,
              taskToEdit.columnId,
              taskToEdit.task.id,
              updates
            )
          }
        />
      )}
    </main>
  )
}
