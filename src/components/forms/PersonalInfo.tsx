import React from 'react';

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
}

type UpdateFormData = (field: keyof FormData, value: FormData[keyof FormData]) => void;

interface StepProps {
  formData: FormData;
  updateFormData: UpdateFormData;
  nextStep: () => void;
  prevStep: () => void;
}

export default function PersonalInformation({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData(name as keyof FormData, value);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 mt-12">Personal Information</h2>
      
      <div className="space-y-4">
      <div className="grid grid-cols-2 gap-6 mt-6">
      <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        
        <div>
          <label htmlFor="contactNum" className="block text-sm font-medium text-gray-700">Contact Number</label>
          <input
            type="tel"
            id="contactNum"
            name="contactNum"
            value={formData.contactNum || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>

        <div className="col-span-2">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">City/Municipality</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
        <div>
          <label htmlFor="province" className="block text-sm font-medium text-gray-700">Province</label>
          <input
            type="text"
            id="province"
            name="province"
            value={formData.province || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700">Zipcode</label>
          <input
            type="text"
            id="zipcode"
            name="zipcode"
            value={formData.zipcode || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      </div>
      </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded">Previous</button>
        <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
      </div>
    </div>
  );
}