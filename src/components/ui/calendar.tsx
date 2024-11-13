"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  selectedDates: Date[];
  setSelectedDates: (dates: Date[]) => void;
  className?: string;
};


function Calendar({
  selectedDates,
  setSelectedDates,
  className, // Include className in the function parameters
  ...props
}: CalendarProps) {
  const handleDayClick = (date: Date) => {
    // Ensure selectedDates only contains Date objects
    setSelectedDates((prevDates) => {
      const isSelected = prevDates.some(
        (selectedDate) => selectedDate instanceof Date && selectedDate.getTime() === date.getTime()
      );
      
      // If date is already selected, remove it
      if (isSelected) {
        return prevDates.filter(
          (d) => d instanceof Date && d.getTime() !== date.getTime()
        );
      }
      // Otherwise, add the date
      return [...prevDates, date];
    });
  };
  
  return (
    <DayPicker
    showOutsideDays={true}
      selected={selectedDates} // Corrected prop name
      onDayClick={handleDayClick}
    className={cn("p-6 md:p-8 lg:p-10", className)}
      disabled={{
        before: new Date(),
      }}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pb-5 relative items-center text-lg md:text-xl lg:text-xl font-semibold",
        caption_label: "text-lg md:text-xl lg:text-xl font-semibold",
        nav: "space-x-2 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1", 
        head_row: "flex",
        head_cell:
          "text-muted-foreground h-12 w-12 md:h-9 md:w-16 text-center text-sm p-0 relative",
        row: "flex w-full mt-2",
        cell: "h-12 w-12 md:h-16 md:w-16 text-center text-sm relative",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-full w-full p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected: "bg-green-500 text-white font-semibold rounded-full hover:bg-green-600",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
