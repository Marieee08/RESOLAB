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
      const dateKey = ${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day};
      setReservations(prev => ({
        ...prev,
        [dateKey]: newReservation.trim()
      }));
      setNewReservation('');
    }
  };

  const removeReservation = (day: number) => {
    const dateKey = ${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day};
    setReservations(prev => {
      const newReservations = { ...prev };
      delete newReservations[dateKey];
      return newReservations;
    });
  };

  return (
    <div className="calendar">
      <style jsx>{`
        .calendar {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          font-family: Arial, sans-serif;
          background-color: #f8f9fa;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
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
        .calendar-day span {
          font-weight: bold;
          margin-bottom: 5px;
        }
        .calendar-day p {
          font-size: 12px;
          margin: 5px 0;
          color: #666;
        }
        .calendar-day input {
          width: 100%;
          padding: 5px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 12px;
          margin-top: auto;
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
        .remove-btn {
          background: none;
          border: none;
          color: #ff4d4d;
          cursor: pointer;
          font-size: 16px;
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
        }
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
          const dateKey = ${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day};
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