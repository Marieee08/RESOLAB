import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Ban, CircleSlash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

interface CalendarDate extends Date {}

interface BlockedDate {
  id: string;
  date: string;
}

interface CalendarDate extends Date {
  getDate(): number;
  getMonth(): number;
  getFullYear(): number;
}

const EditableCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(null);
  const [blockedDates, setBlockedDates] = useState<CalendarDate[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentMonth, setCurrentMonth] = useState<CalendarDate>(new Date());
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch blocked dates on component mount
  useEffect(() => {
    fetchBlockedDates();
  }, []);

  const fetchBlockedDates = async () => {
    try {
      const response = await fetch('/api/blocked-dates');
      const data = await response.json();
      const dates = data.map((item: BlockedDate) => new Date(item.date));
      setBlockedDates(dates);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch blocked dates",
        variant: "destructive",
      });
    }
  };

  const handleBlockDate = async () => {
    if (!selectedDate || isDateBlocked(selectedDate)) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/blocked-dates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date: selectedDate }),
      });

      if (!response.ok) throw new Error('Failed to block date');

      setBlockedDates([...blockedDates, selectedDate]);
      toast({
        title: "Success",
        description: "Date blocked successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to block date",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  const handleDateClick = (date: Date): void => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleUnblockDate = async () => {
    if (!selectedDate) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/blocked-dates', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date: selectedDate }),
      });

      if (!response.ok) throw new Error('Failed to unblock date');

      setBlockedDates(blockedDates.filter(date => 
        date.getDate() !== selectedDate.getDate() ||
        date.getMonth() !== selectedDate.getMonth() ||
        date.getFullYear() !== selectedDate.getFullYear()
      ));
      toast({
        title: "Success",
        description: "Date unblocked successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to unblock date",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  const isSameDay = (date1: CalendarDate | null, date2: CalendarDate): boolean => {
    if (!date1) return false;
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };
  
  const isDateBlocked = (date: CalendarDate | null): boolean => {
    if (!date) return false;
    return blockedDates.some(blockedDate => isSameDay(blockedDate, date));
  };

  const nextMonth = (): void => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const previousMonth = (): void => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const formatDate = (date: CalendarDate | null): string => {
    if (!date) return '';
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const getDaysInMonth = (date: Date): (Date | null)[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days: (Date | null)[] = [];
    
    // Add empty slots for days before the first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Add dates for current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const days = getDaysInMonth(currentMonth);
  const weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return (
    <div className="calendar">
            <div className="calendar-header">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          {new Intl.DateTimeFormat('en-US', { 
            month: 'long', 
            year: 'numeric' 
          }).format(currentMonth)}
        </h2>
        <div>
          <button onClick={previousMonth}>&lt;</button>
          <button onClick={nextMonth}>&gt;</button>
        </div>
      </div>

      <div className="calendar-body">
        {weekDays.map(day => (
          <div key={day} className="calendar-day-name text-[#143370]">
            {day}
          </div>
        ))}
        
        {days.map((date, index) => (
          <div
            key={index}
            className={`calendar-day ${!date ? 'empty' : ''} ${isDateBlocked(date) ? 'bg-red-50' : ''}`}
          >
            {date && (
              <>
                <div className="day-header">
                  <span>{date.getDate()}</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="block-button"
                    onClick={() => handleDateClick(date)}
                  >
                    {isDateBlocked(date) ? 
                      <Ban className="h-4 w-4 text-red-500" /> : 
                      <CircleSlash2 className="h-4 w-4 text-gray-500" />
                    }
                  </Button>
                </div>
                {isDateBlocked(date) && (
                  <div className="reservation">
                    <p>Blocked</p>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{formatDate(selectedDate)}</DialogTitle>
            <DialogDescription>
              Would you like to {isDateBlocked(selectedDate) ? 'unblock' : 'block'} this date?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant={isDateBlocked(selectedDate) ? "destructive" : "default"}
              onClick={isDateBlocked(selectedDate) ? handleUnblockDate : handleBlockDate}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : isDateBlocked(selectedDate) ? 'Unblock Date' : 'Block Date'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <style jsx>{`
        .calendar {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          font-family: Arial, sans-serif;
          background-color: #f8f9fa;
          border-radius: 20px;
          overflow: hidden;
        }
        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          background-color: white;
          color: black;
        }
        .calendar-header button {
          background: none;
          border: none;
          font-size: 24px;
          color: black;
          cursor: pointer;
          padding-left: 10px;
          padding-right: 10px;
          transition: transform 0.2s;
        }
        .calendar-header button:hover {
          transform: scale(1.1);
        }
        .calendar-body {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 10px;
          padding: 20px;
        }
        .calendar-day-name {
          text-align: center;
          font-weight: bold;
          color: black;
          padding: 10px;
        }
        .calendar-day {
          background-color: white;
          border-radius: 10px;
          padding: 10px;
          min-height: 100px;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .calendar-day:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        .calendar-day.empty {
          background-color: transparent;
        }
        .day-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .day-header span {
          font-weight: bold;
        }
        .block-button {
          padding: 2px !important;
          height: auto !important;
          min-width: 0 !important;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .calendar-day:hover .block-button {
          opacity: 1;
        }
        .reservation {
          background-color: #e6f3ff;
          border-radius: 5px;
          padding: 5px;
          font-size: 12px;
          margin-top: 5px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        @media (max-width: 768px) {
          .calendar-body {
            grid-template-columns: repeat(1, 1fr);
          }
          .calendar-day-name {
            display: none;
          }
          .calendar-day {
            min-height: auto;
          }
          .block-button {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default EditableCalendar;