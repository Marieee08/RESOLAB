import React, { useState } from 'react';

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
  const [errors, setErrors] = useState<Partial<Record<keyof BusinessFormData, string>>>({});
  const [touchedFields, setTouchedFields] = useState<Set<keyof BusinessFormData>>(new Set());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateFormData(
      name as keyof BusinessFormData,
      name === 'CompanyZipcode' ? (value === '' ? '' : Number(value)) : value
    );
    
    setErrors(prev => ({
      ...prev,
      [name]: undefined
    }));
  };

  const handleBlur = (fieldName: keyof BusinessFormData) => {
    const newTouchedFields = new Set(touchedFields);
    newTouchedFields.add(fieldName);
    setTouchedFields(newTouchedFields);
    validateField(fieldName);
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateField = (fieldName: keyof BusinessFormData) => {
    const value = formData[fieldName];
    let error = '';

    if (value === undefined || value === '' || value === 0) {
      error = 'This field is required';
    } else if (fieldName === 'CompanyEmail' && !validateEmail(value as string)) {
      error = 'Please enter a valid email address';
    } else if (fieldName === 'CompanyZipcode' && (value as number) <= 0) {
      error = 'Please enter a valid zipcode';
    } else if (fieldName === 'ProductionFrequency' && 
    !['daily', 'weekly', 'monthly'].includes(value as string)) {
    error = 'Please select a valid production frequency';
  }

    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));

    return !error;
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof BusinessFormData, string>> = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof BusinessFormData>).forEach(field => {
      const value = formData[field];
      if (value === undefined || value === '' || value === 0) {
        newErrors[field] = 'This field is required';
        isValid = false;
      } else if (field === 'CompanyEmail' && !validateEmail(value as string)) {
        newErrors[field] = 'Please enter a valid email address';
        isValid = false;
      } 
    });

    setErrors(newErrors);
    const allFields = new Set(Object.keys(formData) as Array<keyof BusinessFormData>);
    setTouchedFields(allFields);
    return isValid;
  };

  const handleNext = () => {
    if (validateForm()) {
      nextStep();
    }
  };

  const getInputClassName = (fieldName: keyof BusinessFormData) => {
    const baseClasses = "mt-1 block w-full border rounded-md shadow-sm p-2";
    const errorClasses = touchedFields.has(fieldName) && errors[fieldName] 
      ? "border-red-500 focus:ring-red-500 focus:border-red-500" 
      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500";
    return `${baseClasses} ${errorClasses}`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 mt-12">Business Information</h2>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2">
          <label htmlFor="CompanyName" className="block text-sm font-medium text-gray-700">
            Company Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="CompanyName"
            name="CompanyName"
            value={formData.CompanyName || ''}
            onChange={handleInputChange}
            onBlur={() => handleBlur('CompanyName')}
            className={getInputClassName('CompanyName')}
            required
          />
          {touchedFields.has('CompanyName') && errors.CompanyName && (
            <p className="mt-1 text-sm text-red-500">{errors.CompanyName}</p>
          )}
        </div>

        <div>
          <label htmlFor="BusinessOwner" className="block text-sm font-medium text-gray-700">
            Company/Business Owner<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="BusinessOwner"
            name="BusinessOwner"
            value={formData.BusinessOwner || ''}
            onChange={handleInputChange}
            onBlur={() => handleBlur('BusinessOwner')}
            className={getInputClassName('BusinessOwner')}
            required
          />
          {touchedFields.has('BusinessOwner') && errors.BusinessOwner && (
            <p className="mt-1 text-sm text-red-500">{errors.BusinessOwner}</p>
          )}
        </div>

        <div>
          <label htmlFor="CompanyEmail" className="block text-sm font-medium text-gray-700">
            E-mail<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="CompanyEmail"
            name="CompanyEmail"
            value={formData.CompanyEmail || ''}
            onChange={handleInputChange}
            onBlur={() => handleBlur('CompanyEmail')}
            className={getInputClassName('CompanyEmail')}
            required
          />
          {touchedFields.has('CompanyEmail') && errors.CompanyEmail && (
            <p className="mt-1 text-sm text-red-500">{errors.CompanyEmail}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mt-6">
        {/* TIN Number */}
        <div>
          <label htmlFor="TINNum" className="block text-sm font-medium text-gray-700">
            TIN No.<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="TINNum"
            name="TINNum"
            value={formData.TINNum || ''}
            onChange={handleInputChange}
            onBlur={() => handleBlur('TINNum')}
            className={getInputClassName('TINNum')}
            required
          />
          {touchedFields.has('TINNum') && errors.TINNum && (
            <p className="mt-1 text-sm text-red-500">{errors.TINNum}</p>
          )}
        </div>

        {/* Business Permit Number */}
        <div>
          <label htmlFor="BusinessPermitNum" className="block text-sm font-medium text-gray-700">
            Business Permit No.<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="BusinessPermitNum"
            name="BusinessPermitNum"
            value={formData.BusinessPermitNum || ''}
            onChange={handleInputChange}
            onBlur={() => handleBlur('BusinessPermitNum')}
            className={getInputClassName('BusinessPermitNum')}
            required
          />
          {touchedFields.has('BusinessPermitNum') && errors.BusinessPermitNum && (
            <p className="mt-1 text-sm text-red-500">{errors.BusinessPermitNum}</p>
          )}
        </div>

        {/* Company ID Number */}
        <div>
          <label htmlFor="CompanyIDNum" className="block text-sm font-medium text-gray-700">
            Company ID No.<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="CompanyIDNum"
            name="CompanyIDNum"
            value={formData.CompanyIDNum || ''}
            onChange={handleInputChange}
            onBlur={() => handleBlur('CompanyIDNum')}
            className={getInputClassName('CompanyIDNum')}
            required
          />
          {touchedFields.has('CompanyIDNum') && errors.CompanyIDNum && (
            <p className="mt-1 text-sm text-red-500">{errors.CompanyIDNum}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">
        {/* Contact Person */}
        <div>
          <label htmlFor="ContactPerson" className="block text-sm font-medium text-gray-700">
            Contact Person<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="ContactPerson"
            name="ContactPerson"
            value={formData.ContactPerson || ''}
            onChange={handleInputChange}
            onBlur={() => handleBlur('ContactPerson')}
            className={getInputClassName('ContactPerson')}
            required
          />
          {touchedFields.has('ContactPerson') && errors.ContactPerson && (
            <p className="mt-1 text-sm text-red-500">{errors.ContactPerson}</p>
          )}
        </div>

        {/* Designation */}
        <div>
          <label htmlFor="Designation" className="block text-sm font-medium text-gray-700">
            Position/Designation<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="Designation"
            name="Designation"
            value={formData.Designation || ''}
            onChange={handleInputChange}
            onBlur={() => handleBlur('Designation')}
            className={getInputClassName('Designation')}
            required
          />
          {touchedFields.has('Designation') && errors.Designation && (
            <p className="mt-1 text-sm text-red-500">{errors.Designation}</p>
          )}
        </div>

        {/* Company Address */}
        <div className="col-span-2">
          <label htmlFor="CompanyAddress" className="block text-sm font-medium text-gray-700">
            Company Address<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="CompanyAddress"
            name="CompanyAddress"
            value={formData.CompanyAddress || ''}
            onChange={handleInputChange}
            onBlur={() => handleBlur('CompanyAddress')}
            className={getInputClassName('CompanyAddress')}
            required
          />
          {touchedFields.has('CompanyAddress') && errors.CompanyAddress && (
            <p className="mt-1 text-sm text-red-500">{errors.CompanyAddress}</p>
          )}
        </div>

        {/* City */}
        <div>
          <label htmlFor="CompanyCity" className="block text-sm font-medium text-gray-700">
            City/Municipality<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="CompanyCity"
            name="CompanyCity"
            value={formData.CompanyCity || ''}
            onChange={handleInputChange}
            onBlur={() => handleBlur('CompanyCity')}
            className={getInputClassName('CompanyCity')}
            required
          />
          {touchedFields.has('CompanyCity') && errors.CompanyCity && (
            <p className="mt-1 text-sm text-red-500">{errors.CompanyCity}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Province */}
          <div>
            <label htmlFor="CompanyProvince" className="block text-sm font-medium text-gray-700">
              Province<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="CompanyProvince"
              name="CompanyProvince"
              value={formData.CompanyProvince || ''}
              onChange={handleInputChange}
              onBlur={() => handleBlur('CompanyProvince')}
              className={getInputClassName('CompanyProvince')}
              required
            />
            {touchedFields.has('CompanyProvince') && errors.CompanyProvince && (
              <p className="mt-1 text-sm text-red-500">{errors.CompanyProvince}</p>
            )}
          </div>

          {/* Zipcode */}
          <div>
            <label htmlFor="CompanyZipcode" className="block text-sm font-medium text-gray-700">
              Zipcode<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="CompanyZipcode"
              name="CompanyZipcode"
              value={formData.CompanyZipcode}
              onChange={handleInputChange}
              onBlur={() => handleBlur('CompanyZipcode')}
              className={getInputClassName('CompanyZipcode')}
              required
              min="1"
            />
            {touchedFields.has('CompanyZipcode') && errors.CompanyZipcode && (
              <p className="mt-1 text-sm text-red-500">{errors.CompanyZipcode}</p>
            )}
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="CompanyPhoneNum" className="block text-sm font-medium text-gray-700">
            Phone No.<span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="CompanyPhoneNum"
            name="CompanyPhoneNum"
            value={formData.CompanyPhoneNum || ''}
            onChange={handleInputChange}
            onBlur={() => handleBlur('CompanyPhoneNum')}
            className={getInputClassName('CompanyPhoneNum')}
            required
          />
          {touchedFields.has('CompanyPhoneNum') && errors.CompanyPhoneNum && (
            <p className="mt-1 text-sm text-red-500">{errors.CompanyPhoneNum}</p>
          )}
        </div>

        {/* Mobile Number */}

        <div>
          <label htmlFor="CompanyMobileNum" className="block text-sm font-medium text-gray-700">
            Mobile No. <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="CompanyMobileNum"
            name="CompanyMobileNum"
            value={formData.CompanyMobileNum || ''}
            onChange={handleInputChange}
            className={getInputClassName('CompanyMobileNum')}
            required
          />
          {touchedFields.has('CompanyMobileNum') && errors.CompanyMobileNum && (
            <p className="mt-1 text-sm text-red-500">{errors.CompanyMobileNum}</p>
          )}
        </div>

        <div className="col-span-2">
          <label htmlFor="Manufactured" className="block text-sm font-medium text-gray-700">
            Commodity/Products Manufactured <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="Manufactured"
            name="Manufactured"
            value={formData.Manufactured || ''}
            onChange={handleInputChange}
            className={getInputClassName('Manufactured')}
            required
          />
          {touchedFields.has('Manufactured') && errors.Manufactured && (
            <p className="mt-1 text-sm text-red-500">{errors.Manufactured}</p>
          )}
        </div>

        <div className="col-span-2">
          <label htmlFor="ProductionFrequency" className="block text-sm font-medium text-gray-700">
            Frequency of Production<span className="text-red-500">*</span>
          </label>
          <select
            id="ProductionFrequency"
            name="ProductionFrequency"
            value={formData.ProductionFrequency || ''}
            onChange={handleInputChange}
            onBlur={() => handleBlur('ProductionFrequency')}
            className={getInputClassName('ProductionFrequency')}
            required
          >
            <option value="">Select frequency</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          {touchedFields.has('ProductionFrequency') && errors.ProductionFrequency && (
            <p className="mt-1 text-sm text-red-500">{errors.ProductionFrequency}</p>
          )}
        </div>



        <div className="col-span-2">
          <label htmlFor="Bulk" className="block text-sm font-medium text-gray-700">
            Bulk of Commodity per Production (in volume or weight) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="Bulk"
            name="Bulk"
            value={formData.Bulk || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {touchedFields.has('Bulk') && errors.Bulk && (
            <p className="mt-1 text-sm text-red-500">{errors.Bulk}</p>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded">Previous</button>
        <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
      </div>
    </div>
  );
}