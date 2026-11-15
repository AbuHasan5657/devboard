import { Link } from "react-router-dom"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import type { Board } from "@/types"

type BoardCardProps = {
  board: Board
  onDelete: (id: string) => void
}

export default function BoardCard({ board, onDelete }: BoardCardProps) {
  const taskCount = board.columns.reduce((sum, c) => sum + c.tasks.length, 0)

  return (
    <Card className="relative w-56">
      <Link to={`/devboard/boards/${board.id}`} className="block">
        <CardHeader>
          <CardTitle>{board.name}</CardTitle>
          <CardDescription>
            {board.columns.length} Spalten · {taskCount} Tasks
          </CardDescription>
        </CardHeader>
      </Link>

      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 size-7 text-muted-foreground hover:text-destructive"
        onClick={() => onDelete(board.id)}
        aria-label="Board löschen"
      >
        <Trash2 className="size-4" />
      </Button>
    </Card>
  )
}
