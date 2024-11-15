import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface FormData {
  days: {
    date: Date;
    startTime: string | null;
    endTime: string | null;
  }[];

  // Personal Info
  name: string;
  contactNum: string;
  address: string;
  city: string;
  province: string;
  zipcode: string;

  // Business Info
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

  // Utilization Info
  ProductsManufactured: string;
  BulkofCommodity: string;
  Equipment: string;
  Tools: string;
  ToolsQty: number;
}

interface ReviewSubmitProps {
  formData: FormData;
  prevStep: () => void;
  updateFormData: (field: keyof FormData, value: FormData[keyof FormData]) => void;
  nextStep: () => void;
}

const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export default function ReviewSubmit({ formData, prevStep, updateFormData }: ReviewSubmitProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { getToken } = useAuth();

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError('');

      const token = await getToken();
      
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit reservation');
      }

      router.push('/dashboard/user');
      
    } catch (err) {
      console.error('Submission error:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit reservation');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderSection = (title: string, fields: { label: string, value: any }[]) => (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-3">{title}</h3>
      <div className="grid grid-cols-2 gap-4">
        {fields.map(({ label, value }) => (
          <div key={label} className={`${label.includes('Address') ? 'col-span-2' : ''}`}>
            <p className="text-sm text-gray-600">{label}</p>
            <p className="mt-1">{value?.toString() || 'Not provided'}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Review Your Information</h2>
        
        <div className="border border-gray-300 rounded-md shadow-sm p-4 mb-6">
          <h3 className="text-lg font-medium mb-3">Selected Dates and Times</h3>
          {formData.days.length > 0 ? (
            [...formData.days]
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map((day, index) => (
                <div key={index} className="mb-4">
                  <h4 className="font-medium">Day {index + 1}</h4>
                  <p>Date: {formatDate(day.date)}</p>
                  <p>Start Time: {day.startTime}</p>
                  <p>End Time: {day.endTime}</p>
                </div>
              ))
          ) : (
            <p>No dates selected</p>
          )}
        </div>

        {renderSection('Personal Information', [
          { label: 'Name', value: formData.name },
          { label: 'Contact Number', value: formData.contactNum },
          { label: 'Complete Address', value: `${formData.address}, ${formData.city}, ${formData.province} ${formData.zipcode}` }
        ])}

        {renderSection('Business Information', [
          { label: 'Company Name', value: formData.CompanyName },
          { label: 'Business Owner', value: formData.BusinessOwner },
          { label: 'Email', value: formData.CompanyEmail },
          { label: 'Business Permit Number', value: formData.BusinessPermitNum },
          { label: 'TIN Number', value: formData.TINNum },
          { label: 'Contact Person', value: formData.ContactPerson },
          { label: 'Position/Designation', value: formData.Designation },
          { label: 'Company Address', value: `${formData.CompanyAddress}, ${formData.CompanyCity}, ${formData.CompanyProvince} ${formData.CompanyZipcode}` },
          { label: 'Phone Number', value: formData.CompanyPhoneNum },
          { label: 'Mobile Number', value: formData.CompanyMobileNum },
          { label: 'Products Manufactured', value: formData.Manufactured },
          { label: 'Production Frequency', value: formData.ProductionFrequency },
          { label: 'Bulk per Production', value: formData.Bulk }
        ])}

        {renderSection('Utilization Information', [
          { label: 'Products to be Manufactured', value: formData.ProductsManufactured },
          { label: 'Bulk of Commodity', value: formData.BulkofCommodity },
          { label: 'Equipment', value: formData.Equipment },
          { label: 'Tools', value: formData.Tools },
          { label: 'Tools Quantity', value: formData.ToolsQty }
        ])}

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="mt-6 flex justify-between">
          <button 
            onClick={prevStep}
            disabled={isSubmitting}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>
      </Card>
    </div>
  );
}