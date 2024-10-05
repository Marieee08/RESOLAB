import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { format } from 'date-fns';

interface ReservationType {
  [key: string]: string;
}

const EditableCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [reservations, setReservations] = useState<ReservationType>({});
  const [newReservation, setNewReservation] = useState<string>('');

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const addReservation = (day: number) => {
    if (newReservation.trim() !== '') {
      const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
      setReservations(prev => ({
        ...prev,
        [dateKey]: newReservation.trim()
      }));
      setNewReservation('');
    }
  };

  const removeReservation = (day: number) => {
    const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
    setReservations(prev => {
      const newReservations = { ...prev };
      delete newReservations[dateKey];
      return newReservations;
    });
  };

  return (
    <div className="calendar">
      <style jsx>{`
        /* Your existing styles here */
      `}</style>
      <div className="calendar-header">
        <button onClick={prevMonth}>&lt;</button>
        <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        <button onClick={nextMonth}>&gt;</button>
      </div>
      <div className="calendar-body">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="calendar-day-name">{day}</div>
        ))}
        {[...Array(firstDayOfMonth)].map((_, i) => (
          <div key={`empty-${i}`} className="calendar-day empty"></div>
        ))}
        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
          const reservation = reservations[dateKey];
          return (
            <div key={day} className="calendar-day">
              <span>{day}</span>
              {reservation ? (
                <div className="reservation">
                  {reservation}
                  <button className="remove-btn" onClick={() => removeReservation(day)}>&times;</button>
                </div>
              ) : (
                <p>Available</p>
              )}
              <input
                type="text"
                value={newReservation}
                onChange={(e) => setNewReservation(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addReservation(day)}
                placeholder="Add reservation"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EditableCalendar;