import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useUser } from "@/context/UserContext"

export default function Profile() {
  const { username, setUsername } = useUser()
  const [name, setName] = useState(username)
  const [saved, setSaved] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    setUsername(name.trim())
    setSaved(true)
  }

  return (
    <main className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Profil</h1>

      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Benutzername ändern</CardTitle>
          <CardDescription>
            Ändere deinen Anzeigenamen für das Kanban-Board.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  setSaved(false)
                }}
              />
            </div>

            <div className="flex items-center gap-3">
              <Button type="submit" disabled={!name.trim()}>
                Speichern
              </Button>
              {saved && (
                <span className="text-sm text-muted-foreground">
                  Gespeichert!
                </span>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
