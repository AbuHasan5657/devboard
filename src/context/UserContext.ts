import { createContext, useContext } from "react"

export type UserContextType = {
  username: string
  setUsername: (name: string) => void
}

export const UserContext = createContext<UserContextType | null>(null)

export function useUser() {
  const ctx = useContext(UserContext)
  if (!ctx)
    throw new Error("useUser muss innerhalb von UserProvider benutzt werden")
  return ctx
}
