import React, { useState, ChangeEvent, useEffect } from 'react';
import { Plus, Minus, X } from 'lucide-react';

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

interface ToolItem {
  id: string;
  name: string;
  quantity: number;
}

interface ToolsSelectorProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  disabled?: boolean;
  className?: string;
}

const ToolsSelector = ({ value, onChange, onBlur, disabled, className }: ToolsSelectorProps) => {
  const availableTools = [
    "Cutting Tool",
    "End Mill",
    "Drill Bit",
    "Face Mill",
    "Boring Bar",
    "Threading Tool",
    "Reamer",
    "Collet",
    "Tool Holder",
    "Measuring Tool"
  ];

  const parseToolString = (str: string): ToolItem[] => {
    if (!str || str === 'NOT APPLICABLE') return [];
    try {
      return JSON.parse(str);
    } catch {
      return [];
    }
  };

  const [selectedTools, setSelectedTools] = useState<ToolItem[]>(parseToolString(value));
  const [showDropdown, setShowDropdown] = useState(false);

  const updateParentValue = (tools: ToolItem[]) => {
    const toolString = tools.length > 0 ? JSON.stringify(tools) : '';
    onChange(toolString);
  };

  const addTool = (toolName: string) => {
    const existingTool = selectedTools.find(tool => tool.name === toolName);
    if (!existingTool) {
      const newTool: ToolItem = {
        id: Math.random().toString(36).substr(2, 9),
        name: toolName,
        quantity: 1
      };
      const updatedTools = [...selectedTools, newTool];
      setSelectedTools(updatedTools);
      updateParentValue(updatedTools);
    }
    setShowDropdown(false);
  };

  const removeTool = (toolId: string) => {
    const updatedTools = selectedTools.filter(tool => tool.id !== toolId);
    setSelectedTools(updatedTools);
    updateParentValue(updatedTools);
  };

  const updateQuantity = (toolId: string, delta: number) => {
    const updatedTools = selectedTools.map(tool => {
      if (tool.id === toolId) {
        const newQuantity = Math.max(1, tool.quantity + delta);
        return { ...tool, quantity: newQuantity };
      }
      return tool;
    });
    setSelectedTools(updatedTools);
    updateParentValue(updatedTools);
  };

  return (
    <div className="relative">
      <div 
        className={`min-h-[120px] p-4 border rounded-md ${
          disabled ? 'bg-gray-100' : 'bg-white'
        } ${className}`}
      >
        {selectedTools.length === 0 ? (
          <div className="text-gray-500 text-sm">No tools selected</div>
        ) : (
          <div className="space-y-2">
            {selectedTools.map(tool => (
              <div key={tool.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <span className="flex-grow">{tool.name}</span>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => updateQuantity(tool.id, -1)}
                    className="p-1 hover:bg-gray-200 rounded"
                    disabled={disabled}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center">{tool.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(tool.id, 1)}
                    className="p-1 hover:bg-gray-200 rounded"
                    disabled={disabled}
                  >
                    <Plus size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeTool(tool.id)}
                    className="p-1 hover:bg-gray-200 rounded text-red-500"
                    disabled={disabled}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!disabled && (
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className="mt-2 px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Tool
          </button>
        )}

        {showDropdown && !disabled && (
          <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg">
            <div className="max-h-48 overflow-y-auto">
              {availableTools
                .filter(tool => !selectedTools.some(st => st.name === tool))
                .map(tool => (
                  <div
                    key={tool}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => addTool(tool)}
                  >
                    {tool}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

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
    validateField(name as keyof FormData, value);
  };

  const isFieldDisabled = (fieldName: keyof FormData) => {
    return formData.ProductsManufactured === 'Benchmarking' && fieldName !== 'ProductsManufactured';
  };

  const handleBlur = (fieldName: keyof FormData) => {
    const newTouchedFields = new Set(touchedFields);
    newTouchedFields.add(fieldName);
    setTouchedFields(newTouchedFields);
    validateField(fieldName, formData[fieldName]);
  };

  const validateField = (fieldName: keyof FormData, value: string) => {
    let error = '';

    if (fieldName === 'ProductsManufactured') {
      if (!value || value === 'Select service') {
        error = 'Please select a service';
      }
    } else if (!isFieldDisabled(fieldName)) {
      if (!value || value === 'Select equipment') {
        error = 'This field is required';
      }
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

    if (!formData.ProductsManufactured || formData.ProductsManufactured === 'Select service') {
      newErrors.ProductsManufactured = 'Please select a service';
      isValid = false;
    }

    if (formData.ProductsManufactured !== 'Benchmarking') {
      if (!formData.Equipment || formData.Equipment === 'Select equipment') {
        newErrors.Equipment = 'Please select equipment';
        isValid = false;
      }
      if (!formData.BulkofCommodity) {
        newErrors.BulkofCommodity = 'This field is required';
        isValid = false;
      }
      if (!formData.Tools) {
        newErrors.Tools = 'This field is required';
        isValid = false;
      }
    }

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
            value={formData.ProductsManufactured}
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
            value={formData.Equipment}
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
            value={formData.BulkofCommodity}
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
          <ToolsSelector
            id="Tools"
            value={formData.Tools}
            onChange={(value) => updateFormData('Tools', value)}
            onBlur={() => handleBlur('Tools')}
            className={getInputClassName('Tools')}
            disabled={isFieldDisabled('Tools')}
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