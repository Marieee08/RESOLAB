import React, { useState, ChangeEvent } from 'react';

interface FormData {
  ProductsManufactured: string;
  BulkofCommodity: string;
  Equipment: string;
  Tools: string;
}

interface StepProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: string) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function ProcessInformation({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [touchedFields, setTouchedFields] = useState<Set<keyof FormData>>(new Set());

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    updateFormData(name as keyof FormData, value);
    
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

    if (value === undefined || value === '') {
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
      if (value === undefined || value === '') {
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
          <label htmlFor="ProductsManufactured" className="block text-sm font-medium text-gray-700">
            Commodity/Products Manufactured<span className="text-red-500">*</span>
          </label>
          <select
            id="ProductsManufactured"
            name="ProductsManufactured"
            value={formData.ProductsManufactured || ''}
            onChange={handleInputChange}
            onBlur={() => handleBlur('ProductsManufactured')}
            className={getInputClassName('ProductsManufactured')}
            required
          >
            <option value="">Select service</option>
            <option value="3D_Printing">3D Printing</option>
            <option value="LaserPrinting">Laser Printing </option>
            <option value="LaserCutting_Engraving">Laser Cutting and/or Engraving</option>
            <option value="HeatPrinting">Heat Pressing</option>
            <option value="FormatPrinting">Large Format Printing </option>
            <option value="3D_CNC">3D CNC Milling</option>
            <option value="2D_CNC">2D CNC Milling</option>
            <option value="CNC_Wood">CNC Wood Routing</option>
            <option value="Lathe">Lathe Machining</option>
          </select>
          {touchedFields.has('ProductsManufactured') && errors.ProductsManufactured && (
            <p className="mt-1 text-sm text-red-500">{errors.ProductsManufactured}</p>
          )}
        </div>

        <div className="col-span-3">
          <label htmlFor="BulkofCommodity" className="block text-sm font-medium text-gray-700">
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
      </div>

      <div className="mt-6 flex justify-between">
        <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded">Previous</button>
        <button onClick={handleNext} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
      </div>
    </div>
  );
}