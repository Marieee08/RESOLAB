import React, { useState, useEffect } from 'react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { format, startOfDay } from 'date-fns';
import { BanIcon } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface BlockedDate {
  id?: string;
  date: Date;
}

interface EditableCalendarProps {
  onDateUnblocked?: (date: Date) => void;
  onError?: (error: string) => void;
  externalRef?: React.RefObject<{
    unblockDate: (date: Date) => Promise<void>;
    refreshDates: () => Promise<void>;
  }>;
}

const EditableCalendar: React.FC<EditableCalendarProps> = ({
  onDateUnblocked,
  onError,
  externalRef
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateToModify, setDateToModify] = useState<Date | null>(null);
  const [isUnblocking, setIsUnblocking] = useState(false);

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    onError?.(errorMessage);
  };

  const fetchBlockedDates = async () => {
    try {
      const response = await fetch('/api/blocked-dates');
      const data: BlockedDate[] = await response.json();
      setBlockedDates(data.map(item => ({
        ...item,
        date: startOfDay(new Date(item.date))
      })));
    } catch (error) {
      handleError('Failed to fetch blocked dates');
    }
  };

  useEffect(() => {
    fetchBlockedDates();
  }, []);

  const handleBlockIconClick = (date: Date, isBlocked: boolean) => {
    const normalizedDate = startOfDay(date);
    setDateToModify(normalizedDate);
    setIsUnblocking(isBlocked);
    setIsModalOpen(true);
  };

  const handleConfirmAction = async () => {
    if (!dateToModify) return;

    if (isUnblocking) {
      await handleUnblockDate(dateToModify);
    } else {
      await handleBlockDate(dateToModify);
    }
    setIsModalOpen(false);
  };

  const handleBlockDate = async (date: Date) => {
    try {
      const response = await fetch('/api/blocked-dates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          date: format(date, "yyyy-MM-dd'T'00:00:00.000'Z'")
        }),
      });

      if (response.ok) {
        const newBlockedDate = await response.json();
        setBlockedDates([...blockedDates, {
          ...newBlockedDate,
          date: startOfDay(new Date(newBlockedDate.date))
        }]);
      } else {
        handleError('Failed to block date');
      }
    } catch (error) {
      handleError('Failed to block date');
    }
  };

  const handleUnblockDate = async (date: Date) => {
    try {
      const normalizedDate = startOfDay(date);
      const dateToUnblock = blockedDates.find(
        blockedDate => format(blockedDate.date, 'yyyy-MM-dd') === format(normalizedDate, 'yyyy-MM-dd')
      );

      if (!dateToUnblock?.id) {
        handleError('No matching blocked date found');
        return;
      }

      const response = await fetch(`/api/blocked-dates/${dateToUnblock.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setBlockedDates(
          blockedDates.filter(
            (blockedDate) =>
              format(blockedDate.date, 'yyyy-MM-dd') !== format(normalizedDate, 'yyyy-MM-dd')
          )
        );
        onDateUnblocked?.(normalizedDate);
      } else {
        handleError('Failed to unblock date');
        await fetchBlockedDates();
      }
    } catch (error) {
      handleError('Failed to unblock date');
      await fetchBlockedDates();
    }
  };

  // Expose methods through ref
  React.useImperativeHandle(externalRef, () => ({
    unblockDate: async (date: Date) => {
      await handleUnblockDate(date);
    },
    refreshDates: async () => {
      await fetchBlockedDates();
    }
  }));

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Alert>
        <AlertDescription>
          Click the block icon next to a date to block/unblock it. Red dates are currently blocked.
        </AlertDescription>
      </Alert>
      
      <div className="relative">
        <CalendarComponent
          mode="single"
          selected={selectedDate}
          className="rounded-md border"
          modifiers={{
            blocked: blockedDates.map(bd => bd.date)
          }}
          modifiersStyles={{
            blocked: { backgroundColor: 'rgb(254, 226, 226)', color: 'rgb(185, 28, 28)' }
          }}
          components={{
            DayContent: ({ date }) => {
              const normalizedDate = startOfDay(date);
              const dateString = format(normalizedDate, 'yyyy-MM-dd');
              const isBlocked = blockedDates.some(
                (blockedDate) => format(blockedDate.date, 'yyyy-MM-dd') === dateString
              );
              
              return (
                <div className="relative w-full h-full flex items-center justify-center group">
                  <span>{date.getDate()}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBlockIconClick(date, isBlocked);
                    }}
                    className={`absolute right-0 top-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity
                      ${isBlocked ? 'text-red-600 hover:text-red-700' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    <BanIcon className="w-3 h-3" />
                  </button>
                </div>
              );
            }
          }}
        />
      </div>

      <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {isUnblocking ? 'Unblock Date' : 'Block Date'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to {isUnblocking ? 'unblock' : 'block'} {dateToModify ? format(dateToModify, 'MMMM d, yyyy') : ''}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmAction}>
              {isUnblocking ? 'Unblock' : 'Block'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EditableCalendar;