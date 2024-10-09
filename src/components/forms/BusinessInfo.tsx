import React from 'react';

interface BusinessFormData {
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

interface StepProps {
  formData: BusinessFormData;
  updateFormData: (field: keyof BusinessFormData, value: string | number) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function BusinessInformation({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData(name as keyof BusinessFormData, 
      name === 'CompanyZipcode' ? (value === '' ? '' : Number(value)) : value
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 mt-12">Business Information</h2>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2">
          <label htmlFor="CompanyName" className="block text-sm font-medium text-gray-700">Company Name</label>
          <input
            type="text"
            id="CompanyName"
            name="CompanyName"
            value={formData.CompanyName || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="BusinessOwner" className="block text-sm font-medium text-gray-700">Company/Business Owner</label>
          <input
            type="text"
            id="BusinessOwner"
            name="BusinessOwner"
            value={formData.BusinessOwner || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="CompanyEmail" className="block text-sm font-medium text-gray-700">E-mail</label>
          <input
            type="email"
            id="CompanyEmail"
            name="CompanyEmail"
            value={formData.CompanyEmail || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6 mt-6">
        <div>
          <label htmlFor="TINNum" className="block text-sm font-medium text-gray-700">TIN No.</label>
          <input
            type="text"
            id="TINNum"
            name="TINNum"
            value={formData.TINNum || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="BusinessPermitNum" className="block text-sm font-medium text-gray-700">Business Permit No.</label>
          <input
            type="text"
            id="BusinessPermitNum"
            name="BusinessPermitNum"
            value={formData.BusinessPermitNum || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="CompanyIDNum" className="block text-sm font-medium text-gray-700">Company ID No.</label>
          <input
            type="text"
            id="CompanyIDNum"
            name="CompanyIDNum"
            value={formData.CompanyIDNum || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 mt-6">
        <div>
          <label htmlFor="ContactPerson" className="block text-sm font-medium text-gray-700">Contact Person</label>
          <input
            type="text"
            id="ContactPerson"
            name="ContactPerson"
            value={formData.ContactPerson || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="Designation" className="block text-sm font-medium text-gray-700">Position/Designation</label>
          <input
            type="text"
            id="Designation"
            name="Designation"
            value={formData.Designation || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="col-span-2">
          <label htmlFor="CompanyAddress" className="block text-sm font-medium text-gray-700">Company Address</label>
          <input
            type="text"
            id="CompanyAddress"
            name="CompanyAddress"
            value={formData.CompanyAddress || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="CompanyCity" className="block text-sm font-medium text-gray-700">City/Municipality</label>
          <input
            type="text"
            id="CompanyCity"
            name="CompanyCity"
            value={formData.CompanyCity || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
        <div>
          <label htmlFor="CompanyProvince" className="block text-sm font-medium text-gray-700">Province</label>
          <input
            type="text"
            id="CompanyProvince"
            name="CompanyProvince"
            value={formData.CompanyProvince || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="CompanyZipcode" className="block text-sm font-medium text-gray-700">Zipcode</label>
          <input
            type="number"
            id="CompanyZipcode"
            name="CompanyZipcode"
            value={formData.CompanyZipcode}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        </div>
        <div>
          <label htmlFor="CompanyPhoneNum" className="block text-sm font-medium text-gray-700">Phone No.</label>
          <input
            type="tel"
            id="CompanyPhoneNum"
            name="CompanyPhoneNum"
            value={formData.CompanyPhoneNum || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="CompanyMobileNum" className="block text-sm font-medium text-gray-700">Mobile No.</label>
          <input
            type="tel"
            id="CompanyMobileNum"
            name="CompanyMobileNum"
            value={formData.CompanyMobileNum || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="col-span-2">
          <label htmlFor="Manufactured" className="block text-sm font-medium text-gray-700">Commodity/Products Manufactured</label>
          <input
            type="text"
            id="Manufactured"
            name="Manufactured"
            value={formData.Manufactured || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="col-span-2">
          <label htmlFor="ProductionFrequency" className="block text-sm font-medium text-gray-700">Frequency of Production (Daily, Weekly, or Monthly)</label>
          <input
            type="text"
            id="ProductionFrequency"
            name="ProductionFrequency"
            value={formData.ProductionFrequency || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="col-span-2">
          <label htmlFor="Bulk" className="block text-sm font-medium text-gray-700">Bulk of Commodity per Production (in volume or weight)</label>
          <input
            type="text"
            id="Bulk"
            name="Bulk"
            value={formData.Bulk || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded">Previous</button>
        <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
      </div>
    </div>
  );
}