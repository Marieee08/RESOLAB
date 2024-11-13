"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={`p-6 md:p-8 lg:p-10 ${className}`}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pb-5 relative items-center text-lg md:text-xl lg:text-xl font-semibold",
        caption_label: "text-lg md:text-xl lg:text-xl font-semibold",
        nav: "space-x-2 flex items-center",
        nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 border rounded-md",
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground h-12 w-12 md:h-9 md:w-16 text-center text-sm p-0 relative",
        row: "flex w-full mt-2",
        cell: "h-12 w-12 md:h-16 md:w-16 text-center text-sm relative",
        day: "h-full w-full p-0 font-normal aria-selected:opacity-100 hover:bg-gray-100 rounded-full",
        day_selected: "bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  )
}

Calendar.displayName = "Calendar"

export { Calendar }