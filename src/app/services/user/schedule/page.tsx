'use client';

import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import TimePicker from '@/components/custom/time-picker';
import ProgressBar from '@/components/custom/progress-bar';
import Navbar from '@/components/custom/navbar';
import PersonalInformation from '@/components/forms/PersonalInfo';
import ProcessInformation from '@/components/forms/UtilizationInfo';
import BusinessInformation from '@/components/forms/BusinessInfo';
import ReviewSubmit from '@/components/forms/ReviewSubmit';


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
    setFormData(prevData => ({
      ...prevData,
      days: [...prevData.days, { date, startTime: null, endTime: null }],
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
        return <DateTimeSelection formData={formData}  addNewDay={addNewDay} updateDayTime={updateDayTime} nextStep={nextStep} />;
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
        return <DateTimeSelection formData={formData} updateFormData={updateFormData} nextStep={nextStep} />;
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
    addNewDay: (date: Date) => void;
    updateDayTime: (index: number, time: string, field: 'startTime' | 'endTime') => void;
    nextStep: () => void;
  }

  function DateTimeSelection({ formData, addNewDay, updateDayTime, nextStep }: DateTimeSelectionProps) {
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined);
  
    const handleSelect = (date: Date | undefined) => {
      if (date) {
        setSelectedDate(date); // Update selected date
        if (!formData.days.some(day => day.date.toDateString() === date.toDateString())) {
          addNewDay(date);
        }
      }
    };

    // const [selectedDates, setSelectedDates] = React.useState<Date[]>([]);
    //const handleSelect = (date: Date | undefined) => {
      //if (date) {
        //setSelectedDates(prevDates =>
          //prevDates.some(d => d.getTime() === date.getTime())
          //? prevDates.filter(d => d.getTime() !== date.getTime())
          //: [...prevDates, date]
        //);}};
  
    return (
      <div>
      <h2 className="text-xl font-semibold mb-4 mt-8">Select Dates and Times</h2>
      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="items-start w-full h-full">
          <Calendar
            className="w-full h-full" 
            mode="single"       // multiple
            selected={selectedDate}      //selectedDates
            onSelect={handleSelect}
          />
        </div>
        <div className="mt-4 space-y-4">
          {formData.days.map((day, index) => (
            <div key={index} className="border p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Day {index + 1}: {day.date.toDateString()}</h3>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <TimePicker
                  label="Start Time"
                  value={day.startTime}
                  onChange={(time) => updateDayTime(index, time, 'startTime')}
                />
                <TimePicker
                  label="End Time"
                  value={day.endTime}
                  onChange={(time) => updateDayTime(index, time, 'endTime')}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <button onClick={nextStep} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Next</button>
    </div>
    );
  }


interface ReviewSubmitProps {
  formData: FormData;
  prevStep: () => void;
}