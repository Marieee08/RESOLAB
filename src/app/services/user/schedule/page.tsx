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
  startDate: Date | null;
  endDate: Date | null;
  startTime: string | null;
  endTime: string | null;

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
    startDate: null,
    endDate: null,
    startTime: null,
    endTime: null,
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
  
  const nextStep = () => setStep(prevStep => prevStep + 1);
  const prevStep = () => setStep(prevStep => prevStep - 1);

  const renderStep = () => {
    switch(step) {
      case 1:
        return <DateTimeSelection formData={formData} updateFormData={updateFormData} nextStep={nextStep} />;
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
    updateFormData: UpdateFormData;
    nextStep: () => void;
  }

  function DateTimeSelection({ formData, updateFormData, nextStep }: DateTimeSelectionProps) {
    const handleSelect = (date: Date | undefined, key: 'startDate' | 'endDate') => {
      if (date) {
        updateFormData(key, date);
      }
    };
  
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4 mt-8">Select Date and Time</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3>Start Date</h3>
            <Calendar 
              mode="single"
              selected={formData.startDate || undefined}
              onSelect={(date) => handleSelect(date, 'startDate')}
            />
          </div>
          <div>
            <h3>End Date</h3>
            <Calendar 
              mode="single"
              selected={formData.endDate || undefined}
              onSelect={(date) => handleSelect(date, 'endDate')}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <TimePicker
            label="Start Time"
            value={formData.startTime}
            onChange={(time) => updateFormData('startTime', time)}
          />
          <TimePicker
            label="End Time"
            value={formData.endTime}
            onChange={(time) => updateFormData('endTime', time)}
          />
        </div>
        <button onClick={nextStep} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Next</button>
      </div>
    );
  }


interface ReviewSubmitProps {
  formData: FormData;
  prevStep: () => void;
}