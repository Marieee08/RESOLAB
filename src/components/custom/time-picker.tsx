import React, { useState } from 'react';

interface TimePickerProps {
  label: string;
  value: string | null;
  onChange: (time: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ label, value, onChange }) => {
  const [hours, setHours] = useState(value ? parseInt(value.split(':')[0]) : 12);
  const [minutes, setMinutes] = useState(value ? parseInt(value.split(':')[1]) : 0);
  const [period, setPeriod] = useState(value ? (parseInt(value.split(':')[0]) >= 12 ? 'PM' : 'AM') : 'AM');

  const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newHours = parseInt(e.target.value);
    setHours(newHours);
    updateTime(newHours, minutes, period);
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMinutes = parseInt(e.target.value);
    setMinutes(newMinutes);
    updateTime(hours, newMinutes, period);
  };

  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPeriod = e.target.value;
    setPeriod(newPeriod);
    updateTime(hours, minutes, newPeriod);
  };

  const updateTime = (h: number, m: number, p: string) => {
    const formattedHours = p === 'PM' ? (h % 12) + 12 : h % 12;
    const time = `${formattedHours.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    onChange(time);
  };

  return (
    <div className="flex flex-col">
      <label className="mb-2 text-sm font-medium text-gray-900">{label}</label>
      <div className="flex">
        <select 
          value={hours} 
          onChange={handleHourChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          {[...Array(12)].map((_, i) => (
            <option key={i} value={i + 1}>{i + 1}</option>
          ))}
        </select>
        <select 
          value={minutes} 
          onChange={handleMinuteChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ml-2"
        >
          {[...Array(60)].map((_, i) => (
            <option key={i} value={i}>{i.toString().padStart(2, '0')}</option>
          ))}
        </select>
        <select 
          value={period} 
          onChange={handlePeriodChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ml-2"
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
    </div>
  );
};

export default TimePicker;