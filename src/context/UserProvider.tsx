import { useEffect, useState, type ReactNode } from "react"
import { UserContext } from "./UserContext"

const STORAGE_KEY = "devboard-username"
const DEFAULT_NAME = "Nutzer"

function loadName(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_NAME
  } catch {
    return DEFAULT_NAME
  }
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState(loadName)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, username)
  }, [username])

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  )
}
