import { useEffect, useReducer, type ReactNode } from "react"
import type { Board, TaskUpdate } from "@/types"
import { boardsReducer } from "@/hooks/boardsReducer"
import { BoardsContext } from "./BoardsContext"

const STORAGE_KEY = "devboard-boards"

function loadBoards(): Board[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function BoardsProvider({ children }: { children: ReactNode }) {
  const [boards, dispatch] = useReducer(boardsReducer, undefined, loadBoards)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(boards))
  }, [boards])

  function addBoard(name: string) {
    const board: Board = {
      id: crypto.randomUUID(),
      name,
      columns: ["To Do", "In Progress", "Done"].map((title) => ({
        id: crypto.randomUUID(),
        title,
        tasks: [],
      })),
    }
    dispatch({ type: "ADD_BOARD", payload: { board } })
  }

  function deleteBoard(id: string) {
    dispatch({ type: "DELETE_BOARD", payload: { id } })
  }

  function renameBoard(id: string, name: string) {
    dispatch({ type: "RENAME_BOARD", payload: { id, name } })
  }

  function addTask(
    boardId: string,
    columnId: string,
    title: string,
    description: string,
    dueDate: string
  ) {
    const task = {
      id: crypto.randomUUID(),
      title,
      description,
      dueDate: dueDate || undefined,
    }
    dispatch({ type: "ADD_TASK", payload: { boardId, columnId, task } })
  }

  function deleteTask(boardId: string, columnId: string, taskId: string) {
    dispatch({ type: "DELETE_TASK", payload: { boardId, columnId, taskId } })
  }

  function moveTask(
    boardId: string,
    taskId: string,
    fromColumnId: string,
    toColumnId: string
  ) {
    dispatch({
      type: "MOVE_TASK",
      payload: { boardId, taskId, fromColumnId, toColumnId },
    })
  }
  function renameColumn(boardId: string, columnId: string, title: string) {
    dispatch({ type: "RENAME_COLUMN", payload: { boardId, columnId, title } })
  }

  function updateTask(
    boardId: string,
    columnId: string,
    taskId: string,
    updates: TaskUpdate
  ) {
    dispatch({
      type: "UPDATE_TASK",
      payload: { boardId, columnId, taskId, updates },
    })
  }
  return (
    <BoardsContext.Provider
      value={{
        boards,
        addBoard,
        deleteBoard,
        renameBoard,
        addTask,
        deleteTask,
        moveTask,
        renameColumn,
        updateTask,
      }}
    >
      {children}
    </BoardsContext.Provider>
  )
}
