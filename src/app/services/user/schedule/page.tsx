'use client';

import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import TimePicker from '@/components/custom/time-picker';
import ProgressBar from '@/components/custom/progress-bar';
import { DateRange } from 'react-day-picker';
import Navbar from '@/components/custom/navbar'

<Navbar />

interface FormData {
    startDate: Date | null;
    endDate: Date | null;
    startTime: string | null;
    endTime: string | null;
    // ... other fields
  }
type UpdateFormData = (field: keyof FormData, value: FormData[keyof FormData]) => void;

export default function Schedule() {
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState<FormData>({
    startDate: null,
    endDate: null,
    startTime: null,
    endTime: null,
    // Add other form fields here
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
        return <UtilizationRequest formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 5:
        return <ProcessInformation formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 6:
        return <ReviewSubmit formData={formData} prevStep={prevStep} />;
      default:
        return <DateTimeSelection formData={formData} updateFormData={updateFormData} nextStep={nextStep} />;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Schedule a Service</h1>
      <ProgressBar currentStep={step} totalSteps={6} />
      {renderStep()}
    </div>
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
        <h2 className="text-xl font-semibold mb-4">Select Date and Time</h2>
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

// Add proper interfaces for these components
interface StepProps {
  formData: FormData;
  updateFormData: UpdateFormData;
  nextStep: () => void;
  prevStep: () => void;
}

function PersonalInformation({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  // Implement form for personal information (ClientInfo model)
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
      {/* Add form fields for ClientInfo */}
      <button onClick={prevStep} className="mr-2 bg-gray-500 text-white px-4 py-2 rounded">Previous</button>
      <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
    </div>
  );
}

function BusinessInformation({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  // Implement form for business information (BusinessInfo model)
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Business Information</h2>
      {/* Add form fields for BusinessInfo */}
      <button onClick={prevStep} className="mr-2 bg-gray-500 text-white px-4 py-2 rounded">Previous</button>
      <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
    </div>
  );
}

function UtilizationRequest({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  // Implement form for utilization request (UtilReq model)
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Utilization Request</h2>
      {/* Add form fields for UtilReq */}
      <button onClick={prevStep} className="mr-2 bg-gray-500 text-white px-4 py-2 rounded">Previous</button>
      <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
    </div>
  );
}

function ProcessInformation({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  // Implement form for process information (ProcessInfo model)
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Process Information</h2>
      {/* Add form fields for ProcessInfo */}
      <button onClick={prevStep} className="mr-2 bg-gray-500 text-white px-4 py-2 rounded">Previous</button>
      <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
    </div>
  );
}

interface ReviewSubmitProps {
  formData: FormData;
  prevStep: () => void;
}

function ReviewSubmit({ formData, prevStep }: ReviewSubmitProps) {
  const handleSubmit = () => {
    // Implement form submission logic
    console.log('Form submitted:', formData);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Review and Submit</h2>
      {/* Display a summary of all entered information */}
      <button onClick={prevStep} className="mr-2 bg-gray-500 text-white px-4 py-2 rounded">Previous</button>
      <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded">Submit</button>
    </div>
  );
}