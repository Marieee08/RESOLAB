'use client';

import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import TimePicker from '@/components/custom/time-picker';
import ProgressBar from '@/components/custom/progress-bar';
import Navbar from '@/components/custom/navbar';
import PersonalInformation from '@/components/forms/PersonalInfo';
import ProcessInformation from '@/components/forms/UtilizationInfo';
import BusinessInformation from '@/components/forms/BusinessInfo';
import ReviewSubmit from '@/components/forms/ReviewSubmit';

const MAX_DATES = 5;

interface FormData {
  days: {
    date: Date;
    startTime: string | null;
    endTime: string | null;
  }[];

  // ClientInfo fields
  name: string;
  contactNum: string;
  address: string;
  city: string;
  province: string;
  zipcode: string;

  // UtilizationInfo fields
  ProductsManufactured: string;
  BulkofCommodity: string;
  Facility: string;
  FacilityQty: number;
  FacilityHrs: number;
  Equipment: string;
  EquipmentQty: number;
  EquipmentHrs: number;
  Tools: string;
  ToolsQty: number;
  ToolsHrs: number;

  // Add BusinessInfo fields
  CompanyName: string;
  BusinessOwner: string;
  BusinessPermitNum: string;
  TINNum: string;
  CompanyIDNum: string;
  CompanyEmail: string;
  ContactPerson: string;
  Designation: string;
  CompanyAddress: string;
  CompanyCity: string;
  CompanyProvince: string;
  CompanyZipcode: number | '';
  CompanyPhoneNum: string;
  CompanyMobileNum: string;
  Manufactured: string;
  ProductionFrequency: string;
  Bulk: string;
}

type UpdateFormData = (field: keyof FormData, value: FormData[keyof FormData] | number) => void;

export default function Schedule() {
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState<FormData>({
    days: [],

    // Client Info
    name: '',
    contactNum: '',
    address: '',
    city: '',
    province: '',
    zipcode: '',

    // Initialize ProcessInfo fields
    ProductsManufactured: '',
    BulkofCommodity: '',
    Facility: '',
    FacilityQty: 0,
    FacilityHrs: 0,
    Equipment: '',
    EquipmentQty: 0,
    EquipmentHrs: 0,
    Tools: '',
    ToolsQty: 0,
    ToolsHrs: 0,

    // Initialize BusinessInfo fields
    CompanyName: '',
    BusinessOwner: '',
    BusinessPermitNum: '',
    TINNum: '',
    CompanyIDNum: '',
    CompanyEmail: '',
    ContactPerson: '',
    Designation: '',
    CompanyAddress: '',
    CompanyCity: '',
    CompanyProvince: '',
    CompanyZipcode: '',
    CompanyPhoneNum: '',
    CompanyMobileNum: '',
    Manufactured: '',
    ProductionFrequency: '',
    Bulk: '',
  });

  const updateFormData: UpdateFormData = (field, value) => {
    setFormData(prevData => ({ ...prevData, [field]: value }));
  };

  const addNewDay = (date: Date) => {
    const clickedDateString = date.toDateString();
    const existingDayIndex = formData.days.findIndex(
      day => new Date(day.date).toDateString() === clickedDateString
    );
  
    setFormData(prevData => ({
      ...prevData,
      days:
        existingDayIndex >= 0
          ? prevData.days.filter((_, index) => index !== existingDayIndex)
          : prevData.days.length < MAX_DATES // Only add if below MAX_DATES
          ? [...prevData.days, { date, startTime: null, endTime: null }]
          : prevData.days, // If MAX_DATES is reached, do nothing
    }));
  };

  const updateDayTime = (index: number, time: string, field: 'startTime' | 'endTime') => {
    const updatedDays = [...formData.days];
    updatedDays[index][field] = time;
    setFormData({ ...formData, days: updatedDays });
  };
  
  const nextStep = () => setStep(prevStep => prevStep + 1);
  const prevStep = () => setStep(prevStep => prevStep - 1);

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <DateTimeSelection 
            formData={formData} 
            setFormData={setFormData}
            addNewDay={addNewDay} 
            updateDayTime={updateDayTime} 
            nextStep={nextStep} 
          />
        );
      case 2:
        return <PersonalInformation formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <BusinessInformation formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <ProcessInformation formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 5:
        return <ReviewSubmit formData={formData} prevStep={prevStep} updateFormData={function (field: keyof FormData, value: string | number | Date | null): void {
          throw new Error('Function not implemented.');
        } } nextStep={function (): void {
          throw new Error('Function not implemented.');
        } } />;
        default:
          return <DateTimeSelection 
            formData={formData} 
            setFormData={setFormData}
            addNewDay={addNewDay} 
            updateDayTime={updateDayTime} 
            nextStep={nextStep} 
          />;
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 mt-16">
        <h1 className="text-2xl font-bold mb-4">Schedule a Service</h1>
        <ProgressBar currentStep={step} totalSteps={5} />
        {renderStep()}
      </div>
    </>
  );
}

interface DateTimeSelectionProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  addNewDay: (date: Date) => void;
  updateDayTime: (index: number, time: string, field: 'startTime' | 'endTime') => void;
  nextStep: () => void;
}

function DateTimeSelection({ formData, addNewDay, updateDayTime, nextStep }: DateTimeSelectionProps) {
  const handleSelect = (date: Date | undefined) => {
    if (!date) return;
    addNewDay(date);
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    const oneMonthLater = new Date();
    oneMonthLater.setMonth(today.getMonth() + 1);
    today.setHours(0, 0, 0, 0);
    oneMonthLater.setHours(0, 0, 0, 0);

    return (
      date < today ||
      date > oneMonthLater ||
      date.getDay() === 0 ||
      date.getDay() === 6 ||
      formData.days.length >= MAX_DATES
    );
  };

  const selectedDates = formData.days.map(day => new Date(day.date));
  const sortedDays = [...formData.days].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 mt-8">Select Dates and Times</h2>
      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="items-start w-full h-full">
          <Calendar
            mode="multiple"
            selected={selectedDates}
            onSelect={(_, selectedDay) => {
              if (selectedDay) {
                handleSelect(selectedDay);
              }
            }}
            disabled={isDateDisabled}
            className="w-full h-full"
          />
        </div>
        <div className="mt-4 space-y-4">
          {sortedDays.map((day, index) => (
            <div key={new Date(day.date).toISOString()} className="border p-4 rounded-lg">
              <h3 className="text-lg font-semibold">
                {new Date(day.date).toDateString()}
              </h3>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <TimePicker
                  className="w-5"
                  label="Start Time"
                  value={day.startTime}
                  onChange={(time) => {
                    const originalIndex = formData.days.findIndex(
                      d => new Date(d.date).getTime() === new Date(day.date).getTime()
                    );
                    updateDayTime(originalIndex, time, 'startTime');
                  }}
                />
                <TimePicker
                  label="End Time"
                  value={day.endTime}
                  onChange={(time) => {
                    const originalIndex = formData.days.findIndex(
                      d => new Date(d.date).getTime() === new Date(day.date).getTime()
                    );
                    updateDayTime(originalIndex, time, 'endTime');
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <button 
        onClick={nextStep} 
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Next
      </button>
    </div>
  );
}

function TimePicker({ label, value, onChange }: { 
  label: string; 
  value: string | null; 
  onChange: (time: string) => void; 
}) {
  const [hour, setHour] = useState<string>('08');
  const [minute, setMinute] = useState<string>('00');

  // Update the time when any of the fields change
  const updateTime = (newHour: string, newMinute: string) => {
    const formattedTime = `${newHour}:${newMinute}`;
    onChange(formattedTime);
  };

  // Handle changes to hour and minute
  const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newHour = e.target.value;
    setHour(newHour);
    updateTime(newHour, minute);
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMinute = e.target.value;
    setMinute(newMinute);
    updateTime(hour, newMinute);
  };

  // Generate the hours from 8 AM to 5 PM, including AM/PM in the hour
  const hours = [
    '08 AM', '09 AM', '10 AM', '11 AM', '12 PM', '01 PM', '02 PM', '03 PM', '04 PM', '05 PM'
  ];

  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className="flex space-x-2">
        <select
          className="border rounded-md p-2 w-auto"
          value={hour}
          onChange={handleHourChange}
        >
          {hours.map(hourValue => (
            <option key={hourValue} value={hourValue}>{hourValue}</option>
          ))}
        </select>

        <select
          className="border rounded-md p-2 w-auto"
          value={minute}
          onChange={handleMinuteChange}
        >
          {Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0')).map(minuteValue => (
            <option key={minuteValue} value={minuteValue}>{minuteValue}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

interface ReviewSubmitProps {
  formData: FormData;
  prevStep: () => void;
}