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

export function Filter({
  searchClientsByFilter,
  frameworks,
  icon,
  text,
  className,
  value,
  setValue,
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen} className="bg-transparent">
      <PopoverTrigger asChild>
        <button className="px-4 pl-3 h-10 bg-transparent cursor-pointer">
          {icon ? (
            <TuneOutlinedIcon sx={{ color: "#6b7280" }} />
          ) : (
            <div className={`w-fit h-fit ${className}`}>
              {value == "" ? text : (value.length > 10? value.substring(0,10) + "...": value)}
            </div>
          )}
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
                    icon &&
                      searchClientsByFilter(
                        currentValue === value ? "" : currentValue
                      );
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
