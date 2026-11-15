import type { Board, Task, TaskUpdate } from "@/types"

export type BoardsAction =
  | { type: "ADD_BOARD"; payload: { board: Board } }
  | { type: "DELETE_BOARD"; payload: { id: string } }
  | { type: "RENAME_BOARD"; payload: { id: string; name: string } }
  | {
      type: "ADD_TASK"
      payload: { boardId: string; columnId: string; task: Task }
    }
  | {
      type: "DELETE_TASK"
      payload: { boardId: string; columnId: string; taskId: string }
    }
  | {
      type: "MOVE_TASK"
      payload: {
        boardId: string
        taskId: string
        fromColumnId: string
        toColumnId: string
      }
    }
  | {
      type: "RENAME_COLUMN"
      payload: { boardId: string; columnId: string; title: string }
    }
  | {
      type: "UPDATE_TASK"
      payload: {
        boardId: string
        columnId: string
        taskId: string
        updates: TaskUpdate
      }
    }

export function boardsReducer(state: Board[], action: BoardsAction): Board[] {
  switch (action.type) {
    case "ADD_BOARD":
      return [...state, action.payload.board]

    case "DELETE_BOARD":
      return state.filter((b) => b.id !== action.payload.id)

    case "RENAME_BOARD":
      return state.map((b) =>
        b.id === action.payload.id ? { ...b, name: action.payload.name } : b
      )

    case "ADD_TASK": {
      const { boardId, columnId, task } = action.payload
      return state.map((b) =>
        b.id !== boardId
          ? b
          : {
              ...b,
              columns: b.columns.map((c) =>
                c.id !== columnId ? c : { ...c, tasks: [...c.tasks, task] }
              ),
            }
      )
    }

    case "DELETE_TASK": {
      const { boardId, columnId, taskId } = action.payload
      return state.map((b) =>
        b.id !== boardId
          ? b
          : {
              ...b,
              columns: b.columns.map((c) =>
                c.id !== columnId
                  ? c
                  : { ...c, tasks: c.tasks.filter((t) => t.id !== taskId) }
              ),
            }
      )
    }

    case "MOVE_TASK": {
      const { boardId, taskId, fromColumnId, toColumnId } = action.payload
      if (fromColumnId === toColumnId) return state
      return state.map((b) => {
        if (b.id !== boardId) return b
        const task = b.columns
          .find((c) => c.id === fromColumnId)
          ?.tasks.find((t) => t.id === taskId)
        if (!task) return b
        return {
          ...b,
          columns: b.columns.map((c) => {
            if (c.id === fromColumnId) {
              return { ...c, tasks: c.tasks.filter((t) => t.id !== taskId) }
            }
            if (c.id === toColumnId) {
              return { ...c, tasks: [...c.tasks, task] }
            }
            return c
          }),
        }
      })
    }
    case "RENAME_COLUMN": {
      const { boardId, columnId, title } = action.payload
      return state.map((b) =>
        b.id !== boardId
          ? b
          : {
              ...b,
              columns: b.columns.map((c) =>
                c.id !== columnId ? c : { ...c, title }
              ),
            }
      )
    }

    case "UPDATE_TASK": {
      const { boardId, columnId, taskId, updates } = action.payload
      return state.map((b) =>
        b.id !== boardId
          ? b
          : {
              ...b,
              columns: b.columns.map((c) =>
                c.id !== columnId
                  ? c
                  : {
                      ...c,
                      tasks: c.tasks.map((t) =>
                        t.id === taskId ? { ...t, ...updates } : t
                      ),
                    }
              ),
            }
      )
    }
  }
}
