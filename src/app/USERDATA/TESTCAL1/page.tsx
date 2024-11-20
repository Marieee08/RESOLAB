"use client";
import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner'; // Assuming you're using shadcn/ui toast

// Type definitions
type BlockedDate = {
  id: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
};

type CalendarProps = {
  title: string;
  onDateBlock?: (newBlockedDate: BlockedDate) => void;
  blockedDates?: BlockedDate[];
  isSecondary?: boolean;
};

// Shared utility function for API calls
const fetchBlockedDates = async (start: string, end: string): Promise<BlockedDate[]> => {
  try {
    const response = await fetch(`/api/blocked-dates?start=${start}&end=${end}`);
    if (!response.ok) {
      throw new Error('Failed to fetch blocked dates');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching blocked dates:', error);
    return [];
  }
};

const blockDate = async (date: Date): Promise<BlockedDate | null> => {
  try {
    const response = await fetch('/api/blocked-dates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: date.toISOString() })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to block date');
    }

    return await response.json();
  } catch (error) {
    console.error('Error blocking date:', error);
    toast.error(error instanceof Error ? error.message : 'Failed to block date');
    return null;
  }
};

const unblockDate = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`/api/blocked-dates/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to unblock date');
    }

    return true;
  } catch (error) {
    console.error('Error unblocking date:', error);
    return false;
  }
};

// Calendar Component
const Calendar: React.FC<CalendarProps> = ({ 
  title, 
  onDateBlock = () => {}, 
  blockedDates = [], 
  isSecondary = false 
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  const handleDateClick = (date: Date) => {
    if (isSecondary) return; // Prevent interactions on secondary calendar
    
    const isBlocked = blockedDates.some(
      blockedDate => new Date(blockedDate.date).toDateString() === date.toDateString()
    );
    
    if (isBlocked) return;

    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleBlockDate = async () => {
    if (selectedDate) {
      const newBlockedDate = await blockDate(selectedDate);
      
      if (newBlockedDate) {
        onDateBlock(newBlockedDate);
        setIsModalOpen(false);
        toast.success(`Date ${format(selectedDate, 'MMMM d, yyyy')} blocked`);
      }
    }
  };

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-bold">{day}</div>
        ))}
        {daysInMonth.map(date => {
          const isBlocked = blockedDates.some(
            blockedDate => new Date(blockedDate.date).toDateString() === date.toDateString()
          );
          
          return (
            <button
              key={date.toISOString()}
              onClick={() => handleDateClick(date)}
              className={`p-2 border rounded ${
                isBlocked 
                  ? 'bg-red-200 cursor-not-allowed' 
                  : 'hover:bg-blue-100 cursor-pointer'
              }`}
              disabled={isBlocked && isSecondary}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Block Date</DialogTitle>
            <DialogDescription>
              Do you want to block {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : ''}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleBlockDate}>Block</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Parent Component to Manage Blocked Dates
export default function CalendarPage() {
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);

  useEffect(() => {
    const loadBlockedDates = async () => {
      const dates = await fetchBlockedDates(
        startOfMonth(new Date()).toISOString(),
        endOfMonth(new Date()).toISOString()
      );
      setBlockedDates(dates);
    };
    loadBlockedDates();
  }, []);

  const handleDateBlock = (newBlockedDate: BlockedDate) => {
    setBlockedDates(prevDates => [...prevDates, newBlockedDate]);
  };

  return (
    <div className="flex space-x-4">
      <Calendar 
        title="Calendar 1" 
        onDateBlock={handleDateBlock} 
        blockedDates={blockedDates} 
      />
      <Calendar 
        title="Calendar 2" 
        blockedDates={blockedDates} 
        isSecondary={true} 
      />
    </div>
  );
}