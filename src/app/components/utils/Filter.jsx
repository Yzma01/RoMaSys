"use client";

import * as React from "react";
import { Check } from "lucide-react";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";

import { cn } from "../../../lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const frameworks = [
  {
    value: "Day",
    label: "Dia",
  },
  {
    value: "Fortnight",
    label: "Quincena",
  },
  {
    value: "Month",
    label: "Mes",
  },
  {
    value: "Overdue",
    label: "Vencidos",
  },
];

export function Filter({ searchClientsByFilter }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen} className="bg-transparent">
      <PopoverTrigger asChild>
        <button className="px-4 pl-3 h-10 bg-transparent cursor-pointer">
          <TuneOutlinedIcon sx={{ color: "#6b7280" }} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    searchClientsByFilter(currentValue);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
