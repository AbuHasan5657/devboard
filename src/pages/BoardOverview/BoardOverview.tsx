import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useBoards } from "@/context/BoardsContext"
import BoardCard from "./components/BoardCard"

export default function BoardOverview() {
  const { boards, addBoard, deleteBoard } = useBoards()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")

  function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    addBoard(name.trim())
    setName("")
    setOpen(false)
  }

  return (
    <main className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Meine Boards</h1>
        <Button onClick={() => setOpen(true)}>
          <Plus /> Neues Board
        </Button>
      </div>

      {boards.length === 0 ? (
        <div className="mt-20 text-center text-muted-foreground">
          <p className="text-2xl">Noch keine Boards vorhanden.</p>
          <p className="mt-2 text-lg">
            Erstelle dein erstes Board, um loszulegen!
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {boards.map((b) => (
            <BoardCard key={b.id} board={b} onDelete={deleteBoard} />
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <form onSubmit={handleCreate} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Neues Board erstellen</DialogTitle>
              <DialogDescription>
                Gib dem Board einen Namen. Es werden automatisch drei Spalten
                angelegt (To Do, In Progress, Done).
              </DialogDescription>
            </DialogHeader>

            <Input
              placeholder="Board-Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Abbrechen
              </Button>
              <Button type="submit" disabled={!name.trim()}>
                Erstellen
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  )
}
