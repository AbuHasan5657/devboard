import { createContext, useContext } from "react"
import type { Board, TaskUpdate } from "@/types"

export type BoardsContextType = {
  boards: Board[]
  addBoard: (name: string) => void
  deleteBoard: (id: string) => void
  renameBoard: (id: string, name: string) => void
  addTask: (
    boardId: string,
    columnId: string,
    title: string,
    description: string,
    dueDate: string
  ) => void
  deleteTask: (boardId: string, columnId: string, taskId: string) => void
  moveTask: (
    boardId: string,
    taskId: string,
    fromColumnId: string,
    toColumnId: string
  ) => void
  renameColumn: (boardId: string, columnId: string, title: string) => void
  updateTask: (
    boardId: string,
    columnId: string,
    taskId: string,
    updates: TaskUpdate
  ) => void
}

export const BoardsContext = createContext<BoardsContextType | null>(null)

export function useBoards() {
  const ctx = useContext(BoardsContext)
  if (!ctx)
    throw new Error(
      "useBoards muss innerhalb von BoardsProvider benutzt werden"
    )
  return ctx
}
