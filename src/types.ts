export type Task = {
  id: string
  title: string
  description: string
  dueDate?: string
  assignee?: string
}
export type TaskUpdate = {
  title: string
  description: string
  dueDate?: string
  assignee?: string
}
export type Column = { id: string; title: string; tasks: Task[] }
export type Board = { id: string; name: string; columns: Column[] }
