import React, { useState } from 'react';

interface ClientInfo {
  ContactNum: string;  // Changed to match database schema
  Address: string;
  City: string;
  Province: string;
  Zipcode: number;    // Changed to number to match database
}

interface StepProps {
  formData: ClientInfo;
  updateFormData: (field: keyof ClientInfo, value: ClientInfo[keyof ClientInfo]) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function PersonalInformation({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  const [errors, setErrors] = useState<Partial<Record<keyof ClientInfo, string>>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData(
      name as keyof ClientInfo,
      name === 'Zipcode' ? (value ? parseInt(value) : 0) : value
    );
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof ClientInfo, string>> = {};
    let isValid = true;

    if (!formData.ContactNum) {
      newErrors.ContactNum = 'Contact number is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateForm()) {
      nextStep();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 mt-12">Personal Information</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-6 mt-6">
          <div>
            <label htmlFor="ContactNum" className="block text-sm font-medium text-gray-700">
              Contact Number<span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="ContactNum"
              name="ContactNum"
              value={formData.ContactNum || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
            {errors.ContactNum && (
              <p className="text-red-500 text-sm mt-1">{errors.ContactNum}</p>
            )}
          </div>

          <div>
            <label htmlFor="Zipcode" className="block text-sm font-medium text-gray-700">Zipcode</label>
            <input
              type="text"
              id="Zipcode"
              name="Zipcode"
              value={formData.Zipcode || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div className="col-span-2">
            <label htmlFor="Address" className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              id="Address"
              name="Address"
              value={formData.Address || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div>
            <label htmlFor="City" className="block text-sm font-medium text-gray-700">City/Municipality</label>
            <input
              type="text"
              id="City"
              name="City"
              value={formData.City || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div>
            <label htmlFor="Province" className="block text-sm font-medium text-gray-700">Province</label>
            <input
              type="text"
              id="Province"
              name="Province"
              value={formData.Province || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded">Previous</button>
        <button onClick={handleNext} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
      </div>
    </div>
  );
}