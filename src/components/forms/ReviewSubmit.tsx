import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ToolItem {
  id: string;
  name: string;
  quantity: number;
}

interface ClientInfo {
  ContactNum: string;
  Address: string | null;
  City: string | null;
  Province: string | null;
  Zipcode: number | null;
}

interface BusinessInfo {
  CompanyName: string | null;
  BusinessOwner: string | null;
  BusinessPermitNum: string | null;
  TINNum: string | null;
  CompanyEmail: string | null;
  ContactPerson: string | null;
  Designation: string | null;
  CompanyAddress: string | null;
  CompanyCity: string | null;
  CompanyProvince: string | null;
  CompanyZipcode: number | null;
  CompanyPhoneNum: string | null;
  CompanyMobileNum: string | null;
  Manufactured: string | null;
  ProductionFrequency: string | null;
  Bulk: string | null;
}

interface AccInfo {
  id: number;
  clerkId: string;
  Name: string;
  email: string;
  Role: string;
  ClientInfo: ClientInfo | null;
  BusinessInfo: BusinessInfo | null;
}

interface FormData {
  days: {
    date: Date;
    startTime: string | null;
    endTime: string | null;
  }[];
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

const parseToolString = (toolString: string): ToolItem[] => {
  if (!toolString || toolString === 'NOT APPLICABLE') return [];
  try {
    return JSON.parse(toolString);
  } catch {
    return [];
  }
};

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
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const [accInfo, setAccInfo] = useState<AccInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!user) return;

      try {
        const response = await fetch(`/api/account/${user.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user information');
        }
        const data = await response.json();
        setAccInfo(data);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user information');
      } finally {
        setLoading(false);
      }
    };

    if (isLoaded) {
      fetchUserInfo();
    }
  }, [user, isLoaded]);

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
        body: JSON.stringify({
          ...formData,
          // Include user information from accInfo
          userInfo: {
            clientInfo: accInfo?.ClientInfo,
            businessInfo: accInfo?.BusinessInfo
          }
        }),
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

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto mt-11">
        <Card className="p-6">
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"/>
          </div>
        </Card>
      </div>
    );
  }

  const renderSection = (title: string, content: JSX.Element) => (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-3">{title}</h3>
      {content}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-6 mt-11">
        <h2 className="text-2xl font-semibold mb-6">Review Your Information</h2>

        {renderSection('Selected Dates and Times',
          <div className="grid grid-cols-2 gap-6 border border-gray-300 rounded-md p-4">
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
        )}

        {renderSection('Personal Information',
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="mt-1">{user?.firstName} {user?.lastName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Contact Number</p>
              <p className="mt-1">{accInfo?.ClientInfo?.ContactNum || 'Not provided'}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-600">Complete Address</p>
              <p className="mt-1">
                {accInfo?.ClientInfo ? 
                  `${accInfo.ClientInfo.Address || ''}, ${accInfo.ClientInfo.City || ''}, ${accInfo.ClientInfo.Province || ''} ${accInfo.ClientInfo.Zipcode || ''}`.replace(/^[,\s]+|[,\s]+$/g, '') 
                  : 'Not provided'}
              </p>
            </div>
          </div>
        )}

        {renderSection('Business Information',
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <p className="text-sm text-gray-600">Company Name</p>
              <p className="mt-1">{accInfo?.BusinessInfo?.CompanyName || 'Not provided'}</p>
            </div>
            {[
              { label: 'Business Owner', value: accInfo?.BusinessInfo?.BusinessOwner },
              { label: 'Email', value: accInfo?.BusinessInfo?.CompanyEmail },
              { label: 'Business Permit Number', value: accInfo?.BusinessInfo?.BusinessPermitNum },
              { label: 'TIN Number', value: accInfo?.BusinessInfo?.TINNum },
              { label: 'Contact Person', value: accInfo?.BusinessInfo?.ContactPerson },
              { label: 'Position/Designation', value: accInfo?.BusinessInfo?.Designation }
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-sm text-gray-600">{label}</p>
                <p className="mt-1">{value || 'Not provided'}</p>
              </div>
            ))}
            <div className="col-span-2">
              <p className="text-sm text-gray-600">Company Address</p>
              <p className="mt-1">
                {accInfo?.BusinessInfo ? 
                  `${accInfo.BusinessInfo.CompanyAddress || ''}, ${accInfo.BusinessInfo.CompanyCity || ''}, ${accInfo.BusinessInfo.CompanyProvince || ''} ${accInfo.BusinessInfo.CompanyZipcode || ''}`.replace(/^[,\s]+|[,\s]+$/g, '')
                  : 'Not provided'}
              </p>
            </div>
          </div>
        )}

        {renderSection('Utilization Information',
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <p className="text-sm text-gray-600">Products to be Manufactured</p>
              <p className="mt-1">{formData.ProductsManufactured || 'Not provided'}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-600">Bulk of Commodity</p>
              <p className="mt-1">{formData.BulkofCommodity || 'Not provided'}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-600">Equipment</p>
              <p className="mt-1">{formData.Equipment || 'Not provided'}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-600">Tools</p>
              {parseToolString(formData.Tools).length > 0 ? (
                <div className="mt-2 space-y-1">
                  {parseToolString(formData.Tools).map((tool, index) => (
                    <div key={index} className="bg-gray-50 p-2 rounded">
                      <span>{tool.name}</span>
                      <span className="ml-2 text-gray-600">Quantity: {tool.quantity}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-1">No tools selected</p>
              )}
            </div>
          </div>
        )}

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
            disabled={isSubmitting || loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>
      </Card>
    </div>
  );
}