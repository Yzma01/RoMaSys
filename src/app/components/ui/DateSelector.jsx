"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "../../../lib/utils";
import { Button } from "./button"
import { Calendar } from "./calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"

export function DatePickerWithRange({
  className,
  date, setDate
}) {
  
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left text-gray-400 font-bold bg-adminBackground rounded-none border-none",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span className="pl-5">Seleccione un rango</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            modifiers={{
              range: date?.from && date?.to ? { from: date.from, to: date.to } : undefined,
            }}
            modifiersClassNames={{
              range: "bg-blueDark text-white", // Aplica color de fondo y texto a las fechas dentro del rango
              selected: "bg-blueDark text-white", // Color más oscuro para las fechas `from` y `to`
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
