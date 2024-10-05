import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
      <div 
        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
        style={{ width: `${progress}%` }}
      ></div>
      <div className="text-center text-sm text-gray-600 mt-2">
        Step {currentStep} of {totalSteps}
      </div>
    </div>
  );
};

export default ProgressBar;