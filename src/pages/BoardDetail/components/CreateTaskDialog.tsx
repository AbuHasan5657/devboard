import { useState } from "react"
import { CalendarDays } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

type CreateTaskDialogProps = {
  open: boolean
  columnTitle?: string
  onClose: () => void
  onSubmit: (title: string, description: string, dueDate: string) => void
}

function toIso(date: Date) {
  return date.toLocaleDateString("sv-SE") // YYYY-MM-DD in lokaler Zeit
}

export default function CreateTaskDialog({
  open,
  columnTitle,
  onClose,
  onSubmit,
}: CreateTaskDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [calendarOpen, setCalendarOpen] = useState(false)

  function reset() {
    setTitle("")
    setDescription("")
    setDate(undefined)
    setCalendarOpen(false)
  }

  function handleClose() {
    reset()
    onClose()
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    onSubmit(title.trim(), description.trim(), date ? toIso(date) : "")
    reset()
    onClose()
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) handleClose()
      }}
    >
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Neue Task erstellen</DialogTitle>
            <DialogDescription>
              Erstelle eine neue Aufgabe für die Spalte „{columnTitle}“.
            </DialogDescription>
          </DialogHeader>

          <Input
            placeholder="Titel"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <Input
            placeholder="Beschreibung (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger
              type="button"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "w-full justify-between font-normal",
                !date && "text-muted-foreground"
              )}
            >
              {date
                ? date.toLocaleDateString("de-DE")
                : "Fälligkeitsdatum wählen"}
              <CalendarDays className="size-4" />
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => {
                  setDate(d)
                  setCalendarOpen(false)
                }}
                weekStartsOn={1}
              />
            </PopoverContent>
          </Popover>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Abbrechen
            </Button>
            <Button type="submit" disabled={!title.trim()}>
              Erstellen
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
