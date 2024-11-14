import React, { useState } from 'react';

interface FormData {
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

interface StepProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: FormData[keyof FormData]) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function ProcessInformation({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [touchedFields, setTouchedFields] = useState<Set<keyof FormData>>(new Set());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData(name as keyof FormData, name.includes('Qty') || name.includes('Hrs') ? Number(value) : value);
    
    setErrors(prev => ({
      ...prev,
      [name]: undefined
    }));
  };

  const handleBlur = (fieldName: keyof FormData) => {
    const newTouchedFields = new Set(touchedFields);
    newTouchedFields.add(fieldName);
    setTouchedFields(newTouchedFields);
    validateField(fieldName);
  };

  const validateField = (fieldName: keyof FormData) => {
    const value = formData[fieldName];
    let error = '';

    if (value === undefined || value === '' || value === 0) {
      error = 'This field is required';
    }

    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));

    return !error;
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof FormData>).forEach(field => {
      const value = formData[field];
      if (value === undefined || value === '' || value === 0) {
        newErrors[field] = 'This field is required';
        isValid = false;
      }
    });

    setErrors(newErrors);
    const allFields = new Set(Object.keys(formData) as Array<keyof FormData>);
    setTouchedFields(allFields);
    return isValid;
  };

  const handleNext = () => {
    if (validateForm()) {
      nextStep();
    }
  };

  const getInputClassName = (fieldName: keyof FormData) => {
    const baseClasses = "mt-1 block w-full border rounded-md shadow-sm p-2";
    const errorClasses = touchedFields.has(fieldName) && errors[fieldName] 
      ? "border-red-500 focus:ring-red-500 focus:border-red-500" 
      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500";
    return `${baseClasses} ${errorClasses}`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 mt-12">Utilization Information</h2>
      
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-3">
          <label htmlFor="Manufactured" className="block text-sm font-medium text-gray-700">
            Commodity/Products Manufactured<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="ProductsManufactured"
            name="ProductsManufactured"
            value={formData.ProductsManufactured || ''}
            onChange={handleInputChange}
            onBlur={() => handleBlur('ProductsManufactured')}
            className={getInputClassName('ProductsManufactured')}
            required
          />
          {touchedFields.has('ProductsManufactured') && errors.ProductsManufactured && (
            <p className="mt-1 text-sm text-red-500">{errors.ProductsManufactured}</p>
          )}
        </div>

        <div className="col-span-3">
          <label htmlFor="Bulk" className="block text-sm font-medium text-gray-700">
            Bulk of Commodity per Production (in volume or weight)<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="BulkofCommodity"
            name="BulkofCommodity"
            value={formData.BulkofCommodity || ''}
            onChange={handleInputChange}
            onBlur={() => handleBlur('BulkofCommodity')}
            className={getInputClassName('BulkofCommodity')}
            required
          />
          {touchedFields.has('BulkofCommodity') && errors.BulkofCommodity && (
            <p className="mt-1 text-sm text-red-500">{errors.BulkofCommodity}</p>
          )}
        </div>

        <div>
          <label htmlFor="Facility" className="block text-sm font-medium text-gray-700">
            Facility<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="Facility"
            name="Facility"
            value={formData.Facility || ''}
            onChange={handleInputChange}
            onBlur={() => handleBlur('Facility')}
            className={getInputClassName('Facility')}
            required
          />
          {touchedFields.has('Facility') && errors.Facility && (
            <p className="mt-1 text-sm text-red-500">{errors.Facility}</p>
          )}
        </div>

        <div>
          <label htmlFor="FacilityQty" className="block text-sm font-medium text-gray-700">
            Quantity<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="FacilityQty"
            name="FacilityQty"
            value={formData.FacilityQty || ''}
            onChange={handleInputChange}
            onBlur={() => handleBlur('FacilityQty')}
            className={getInputClassName('FacilityQty')}
            required
            min="1"
          />
          {touchedFields.has('FacilityQty') && errors.FacilityQty && (
            <p className="mt-1 text-sm text-red-500">{errors.FacilityQty}</p>
          )}
        </div>

        <div>
          <label htmlFor="FacilityHrs" className="block text-sm font-medium text-gray-700">
            No. of hours<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="FacilityHrs"
            name="FacilityHrs"
            value={formData.FacilityHrs || ''}
            onChange={handleInputChange}
            onBlur={() => handleBlur('FacilityHrs')}
            className={getInputClassName('FacilityHrs')}
            required
            min="1"
          />
          {touchedFields.has('FacilityHrs') && errors.FacilityHrs && (
            <p className="mt-1 text-sm text-red-500">{errors.FacilityHrs}</p>
          )}
        </div>

        <div>
          <label htmlFor="Equipment" className="block text-sm font-medium text-gray-700">
            Equipment<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="Equipment"
            name="Equipment"
            value={formData.Equipment || ''}
            onChange={handleInputChange}
            onBlur={() => handleBlur('Equipment')}
            className={getInputClassName('Equipment')}
            required
          />
          {touchedFields.has('Equipment') && errors.Equipment && (
            <p className="mt-1 text-sm text-red-500">{errors.Equipment}</p>
          )}
        </div>

        <div>
          <label htmlFor="EquipmentQty" className="block text-sm font-medium text-gray-700">
            Quantity<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="EquipmentQty"
            name="EquipmentQty"
            value={formData.EquipmentQty || ''}
            onChange={handleInputChange}
            onBlur={() => handleBlur('EquipmentQty')}
            className={getInputClassName('EquipmentQty')}
            required
            min="1"
          />
          {touchedFields.has('EquipmentQty') && errors.EquipmentQty && (
            <p className="mt-1 text-sm text-red-500">{errors.EquipmentQty}</p>
          )}
        </div>

        <div>
          <label htmlFor="EquipmentHrs" className="block text-sm font-medium text-gray-700">
            No. of hours<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="EquipmentHrs"
            name="EquipmentHrs"
            value={formData.EquipmentHrs || ''}
            onChange={handleInputChange}
            onBlur={() => handleBlur('EquipmentHrs')}
            className={getInputClassName('EquipmentHrs')}
            required
            min="1"
          />
          {touchedFields.has('EquipmentHrs') && errors.EquipmentHrs && (
            <p className="mt-1 text-sm text-red-500">{errors.EquipmentHrs}</p>
          )}
        </div>

        <div>
          <label htmlFor="Tools" className="block text-sm font-medium text-gray-700">
            Tools<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="Tools"
            name="Tools"
            value={formData.Tools || ''}
            onChange={handleInputChange}
            onBlur={() => handleBlur('Tools')}
            className={getInputClassName('Tools')}
            required
          />
          {touchedFields.has('Tools') && errors.Tools && (
            <p className="mt-1 text-sm text-red-500">{errors.Tools}</p>
          )}
        </div>

        <div>
          <label htmlFor="ToolsQty" className="block text-sm font-medium text-gray-700">
            Quantity<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="ToolsQty"
            name="ToolsQty"
            value={formData.ToolsQty || ''}
            onChange={handleInputChange}
            onBlur={() => handleBlur('ToolsQty')}
            className={getInputClassName('ToolsQty')}
            required
            min="1"
          />
          {touchedFields.has('ToolsQty') && errors.ToolsQty && (
            <p className="mt-1 text-sm text-red-500">{errors.ToolsQty}</p>
          )}
        </div>

        <div>
          <label htmlFor="ToolsHrs" className="block text-sm font-medium text-gray-700">
            No. of hours<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="ToolsHrs"
            name="ToolsHrs"
            value={formData.ToolsHrs || ''}
            onChange={handleInputChange}
            onBlur={() => handleBlur('ToolsHrs')}
            className={getInputClassName('ToolsHrs')}
            required
            min="1"
          />
          {touchedFields.has('ToolsHrs') && errors.ToolsHrs && (
            <p className="mt-1 text-sm text-red-500">{errors.ToolsHrs}</p>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded">Previous</button>
        <button onClick={handleNext} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
      </div>
    </div>
  );
}