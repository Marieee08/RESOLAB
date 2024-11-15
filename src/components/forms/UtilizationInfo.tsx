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

        {renderSection('Selected Dates and Times', [
        ...formData.days.map((day, index) => ({
            label: `Day ${index + 1}`,
            value: `${new Date(day.date).toLocaleDateString()} (${day.startTime} - ${day.endTime})`
          }))
        ])}
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
          { label: 'Company Address', value: `${formData.CompanyAddress}, ${formData.CompanyCity}, ${formData.CompanyProvince} ${formData.CompanyZipcode}` }
        ])}

        {renderSection('Utilization Information', [
          { label: 'Products Manufactured', value: formData.ProductsManufactured },
          { label: 'Bulk of Commodity', value: formData.BulkofCommodity },
          { label: 'Equipment', value: formData.Equipment },
          { label: 'Tools', value: formData.Tools }
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
            {isSubmitting ? 'Submitting...' : 'Submit Reservation'}
          </button>
        </div>
      </Card>
    </div>
  );
}