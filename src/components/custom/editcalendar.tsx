import React, { useState, useEffect } from 'react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { format } from 'date-fns';

interface BlockedDate {
  date: Date;
}

const EditableCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [blockedDates, setBlockedDates] = useState<Date[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchBlockedDates();
  }, []);

  const fetchBlockedDates = async () => {
    try {
      const response = await fetch('/api/blocked-dates');
      const data: BlockedDate[] = await response.json();
      setBlockedDates(data.map(item => new Date(item.date)));
    } catch (error) {
      setError('Failed to fetch blocked dates');
    }
  };

  const handleDateClick = (date: Date | undefined) => {
    if (!date) return;

    const dateString = format(date, 'yyyy-MM-dd');
    const isBlocked = blockedDates.some(
      (blockedDate) => format(blockedDate, 'yyyy-MM-dd') === dateString
    );

    if (isBlocked) {
      handleUnblockDate(date);
    } else {
      handleBlockDate(date);
    }
  };

  const handleBlockDate = async (date: Date) => {
    try {
      const response = await fetch('/api/blocked-dates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date }),
      });

      if (response.ok) {
        setBlockedDates([...blockedDates, date]);
      } else {
        setError('Failed to block date');
      }
    } catch (error) {
      setError('Failed to block date');
    }
  };

  const handleUnblockDate = async (date: Date) => {
    try {
      const response = await fetch('/api/blocked-dates', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date }),
      });

      if (response.ok) {
        setBlockedDates(
          blockedDates.filter(
            (blockedDate) =>
              format(blockedDate, 'yyyy-MM-dd') !== format(date, 'yyyy-MM-dd')
          )
        );
      } else {
        setError('Failed to unblock date');
      }
    } catch (error) {
      setError('Failed to unblock date');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="mb-4">
        <CalendarComponent
          mode="single"
          selected={selectedDate}
          onSelect={handleDateClick}
          className="rounded-md border"
          modifiers={{
            blocked: blockedDates
          }}
          modifiersStyles={{
            blocked: { 
              backgroundColor: 'rgb(239, 68, 68)',
              color: 'white',
              cursor: 'pointer'
            }
          }}
        />
      </div>

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="mt-4">
        <p className="text-sm text-gray-600">
          Click on a date to block/unblock it. Red dates are currently blocked.
        </p>
      </div>
    </div>
  );
};

export default EditableCalendar;