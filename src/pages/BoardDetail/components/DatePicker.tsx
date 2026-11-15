import { useState } from "react"
import { CalendarDays } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

type DatePickerProps = {
  value?: Date
  onChange: (date?: Date) => void
  placeholder?: string
}

export default function DatePicker({
  value,
  onChange,
  placeholder = "Datum wählen",
}: DatePickerProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        type="button"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "w-full justify-between font-normal",
          !value && "text-muted-foreground"
        )}
      >
        {value ? value.toLocaleDateString("de-DE") : placeholder}
        <CalendarDays className="size-4" />
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(d) => {
            onChange(d)
            setOpen(false)
          }}
          weekStartsOn={1}
        />
      </PopoverContent>
    </Popover>
  )
}
