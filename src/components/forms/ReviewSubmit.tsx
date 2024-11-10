import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface FormData {
  startDate: Date | null;
  endDate: Date | null;
  startTime: string | null;
  endTime: string | null;
  
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
  Facility: string;
  FacilityQty: number;
  FacilityHrs: number;
  Equipment: string;
  EquipmentQty: number;
  EquipmentHrs: number;
  Tools: string;
  ToolsQty: number;
  ToolsHrs: number;
}

interface ReviewSubmitProps {
  formData: FormData;
  prevStep: () => void;
  updateFormData: (field: keyof FormData, value: FormData[keyof FormData]) => void;
  nextStep: () => void;
}

export default function ReviewSubmit({ formData, prevStep, updateFormData, nextStep }: ReviewSubmitProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { getToken } = useAuth();

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError('');

    // Get the authentication token from Clerk
    const token = await getToken();


      // Format dates and times for submission
    const startDateTime = formData.startDate ? new Date(formData.startDate) : null;
    const endDateTime = formData.endDate ? new Date(formData.endDate) : null;
      
    if (startDateTime && formData.startTime) {
        const [hours, minutes] = formData.startTime.split(':');
        startDateTime.setHours(parseInt(hours), parseInt(minutes));
    }
      
      if (endDateTime && formData.endTime) {
        const [hours, minutes] = formData.endTime.split(':');
        endDateTime.setHours(parseInt(hours), parseInt(minutes));
      }

      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Add the auth token
        },
        body: JSON.stringify({
          ...formData,
          startTime: startDateTime?.toISOString(),
          endTime: endDateTime?.toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit reservation');
      }

      const result = await response.json();
      
      // Redirect to success page or dashboard
      router.push('/dashboard/user');
      
    } catch (err) {
      console.error('Submission error:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit reservation');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Review Your Information</h2>
        
        <div className="space-y-6">
          {/* DateTime Section */}
          <div>
            <h3 className="text-lg font-medium mb-2">Schedule</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Start Date & Time</p>
                <p>{formData.startDate?.toLocaleDateString()} {formData.startTime}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">End Date & Time</p>
                <p>{formData.endDate?.toLocaleDateString()} {formData.endTime}</p>
              </div>
            </div>
          </div>

          {/* Personal Info Section */}
          <div>
            <h3 className="text-lg font-medium mb-2">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p>{formData.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Contact Number</p>
                <p>{formData.contactNum}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-600">Address</p>
                <p>{formData.address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">City</p>
                <p>{formData.city}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Province</p>
                <p>{formData.province}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Zipcode</p>
                <p>{formData.zipcode}</p>
              </div>
            </div>
          </div>

          {/* Business Info Section */}
          <div>
            <h3 className="text-lg font-medium mb-2">Business Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <p className="text-sm text-gray-600">Company Name</p>
                <p>{formData.CompanyName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Business Owner</p>
                <p>{formData.BusinessOwner}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p>{formData.CompanyEmail}</p>
              </div>
              {/* Add more business info fields as needed */}
            </div>
          </div>

          {/* Utilization Info Section */}
          <div>
            <h3 className="text-lg font-medium mb-2">Utilization Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <p className="text-sm text-gray-600">Products Manufactured</p>
                <p>{formData.ProductsManufactured}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-600">Bulk of Commodity</p>
                <p>{formData.BulkofCommodity}</p>
              </div>
              {/* Add more utilization info fields as needed */}
            </div>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="mt-6 flex justify-between">
          <button 
            onClick={prevStep} 
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            disabled={isSubmitting}
          >
            Previous
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>
      </Card>
    </div>
  );
}