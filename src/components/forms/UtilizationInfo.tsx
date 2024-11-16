import React, { useState, ChangeEvent, useEffect } from 'react';

interface FormData {
  ProductsManufactured: string;
  BulkofCommodity: string;
  Equipment: string;
  Tools: string;
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
  const [previousService, setPreviousService] = useState<string>('');
  
  useEffect(() => {
    if (formData.ProductsManufactured === 'Benchmarking') {
      setPreviousService('Benchmarking');
      updateFormData('BulkofCommodity', 'NOT APPLICABLE');
      updateFormData('Equipment', 'NOT APPLICABLE');
      updateFormData('Tools', 'NOT APPLICABLE');
    } else if (previousService === 'Benchmarking') {
      updateFormData('BulkofCommodity', '');
      updateFormData('Equipment', '');
      updateFormData('Tools', '');
      setPreviousService(formData.ProductsManufactured);
    } else {
      setPreviousService(formData.ProductsManufactured);
    }
  }, [formData.ProductsManufactured]);

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

  const isFieldDisabled = (fieldName: keyof FormData) => {
    return formData.ProductsManufactured === 'Benchmarking' && fieldName !== 'ProductsManufactured';
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
    const disabledClasses = isFieldDisabled(fieldName) ? "bg-gray-100 cursor-not-allowed" : "";
    return `${baseClasses} ${errorClasses} ${disabledClasses}`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 mt-12">Utilization Information</h2>
      
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label htmlFor="ProductsManufactured" className="block text-sm font-medium text-gray-700">
            Service to be availed<span className="text-red-500">*</span>
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
            <option value="Select service">Select service</option>
            <option value="Benchmarking">Benchmarking</option>
            <option value="2D CNC Milling">2D CNC Milling</option>
            <option value="3D CNC Milling">3D CNC Milling</option>
            <option value="3D Printing">3D Printing</option>
            <option value="CNC Wood Routing">CNC Wood Routing</option>
            <option value="Heat Pressing">Heat Pressing</option>
            <option value="Large Format Printing">Large Format Printing</option>
            <option value="Laser Cutting & Engraving">Laser Cutting & Engraving</option>
            <option value="Laser Printing">Laser Printing</option>
            <option value="Lathe Machining">Lathe Machining</option>
          </select>
          {touchedFields.has('ProductsManufactured') && errors.ProductsManufactured && (
            <p className="mt-1 text-sm text-red-500">{errors.ProductsManufactured}</p>
          )}
        </div>

        <div>
          <label htmlFor="Equipment" className="block text-sm font-medium text-gray-700">
            Equipment<span className="text-red-500">*</span>
          </label>
          <select
            id="Equipment"
            name="Equipment"
            value={formData.Equipment || ''}
            onChange={handleInputChange}
            onBlur={() => handleBlur('Equipment')}
            className={getInputClassName('Equipment')}
            disabled={isFieldDisabled('Equipment')}
            required
          >
            <option value="Select equipment">Select equipment</option>
            <option value="3D Printer">3D Printer</option>
            <option value="CNC Wood Router">CNC Wood Router</option>
            <option value="CO2 Laser Cutter & Engraver">CO2 Laser Cutter & Engraver</option>
            <option value="Lathe Machine">Lathe Machine</option>
            <option value="Milling Machine">Milling Machine</option>
            <option value="Print & Cut">Print & Cut</option>
          </select>
          {touchedFields.has('Equipment') && errors.Equipment && (
            <p className="mt-1 text-sm text-red-500">{errors.Equipment}</p>
          )}
        </div>

        <div>
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
            disabled={isFieldDisabled('BulkofCommodity')}
            required
          />
          {touchedFields.has('BulkofCommodity') && errors.BulkofCommodity && (
            <p className="mt-1 text-sm text-red-500">{errors.BulkofCommodity}</p>
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
            disabled={isFieldDisabled('Tools')}
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