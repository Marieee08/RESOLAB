import React from 'react';

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
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData(name as keyof FormData, name.includes('Qty') || name.includes('Hrs') ? Number(value) : value);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 mt-12">Utilization Information</h2>
      
      <div className="grid grid-cols-3 gap-6">
      <div className="col-span-3">
          <label htmlFor="Manufactured" className="block text-sm font-medium text-gray-700">Commodity/Products Manufactured</label>
          <input
            type="text"
            id="ProductsManufactured"
            name="ProductsManufactured"
            value={formData.ProductsManufactured || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
      </div>
      <div className="col-span-3">
          <label htmlFor="Bulk" className="block text-sm font-medium text-gray-700">Bulk of Commodity per Production (in volume or weight)</label>
          <input
            type="text"
            id="BulkofCommodity"
            name="BulkofCommodity"
            value={formData.BulkofCommodity || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
      </div>

        <div>
          <label htmlFor="Facility" className="block text-sm font-medium text-gray-700">Facility</label>
          <input
            type="text"
            id="Facility"
            name="Facility"
            value={formData.Facility || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="FacilityQty" className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            id="FacilityQty"
            name="FacilityQty"
            value={formData.FacilityQty || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="FacilityHrs" className="block text-sm font-medium text-gray-700">No. of hours</label>
          <input
            type="number"
            id="FacilityHrs"
            name="FacilityHrs"
            value={formData.FacilityHrs || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="Equipment" className="block text-sm font-medium text-gray-700">Equipment</label>
          <input
            type="text"
            id="Equipment"
            name="Equipment"
            value={formData.Equipment || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="EquipmentQty" className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            id="EquipmentQty"
            name="EquipmentQty"
            value={formData.EquipmentQty || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="EquipmentHrs" className="block text-sm font-medium text-gray-700">No. of hours</label>
          <input
            type="number"
            id="EquipmentHrs"
            name="EquipmentHrs"
            value={formData.EquipmentHrs || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="Tools" className="block text-sm font-medium text-gray-700">Tools</label>
          <input
            type="text"
            id="Tools"
            name="Tools"
            value={formData.Tools || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="ToolsQty" className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            id="ToolsQty"
            name="ToolsQty"
            value={formData.ToolsQty || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="ToolsHrs" className="block text-sm font-medium text-gray-700">No. of hours</label>
          <input
            type="number"
            id="ToolsHrs"
            name="ToolsHrs"
            value={formData.ToolsHrs || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded">Previous</button>
        <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
      </div>
    </div>
  );
}