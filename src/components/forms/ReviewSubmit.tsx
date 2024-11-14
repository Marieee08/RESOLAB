import React from 'react';
import Link from 'next/link';

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
  
    // ProcessInfo fields
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
  
    // Add BusinessInfo fields
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

type UpdateFormData = (field: keyof FormData, value: FormData[keyof FormData]) => void;

interface StepProps {
    formData: FormData;
    updateFormData: UpdateFormData;
    nextStep: () => void;
    prevStep: () => void;
}

const formatTime = (time: string | null): string => {
    if (!time) return 'Not selected';
    
    // Split on colon first to separate hour+period from minutes
    const [hourPart, minutes] = time.split(':');
    
    if (!hourPart || !minutes) return 'Invalid time format';
    
    // Split hour and period (e.g., "08 AM" -> ["08", "AM"])
    const [hour, period] = hourPart.split(' ');
    
    if (!hour || !period) return 'Invalid time format';
    
    // Remove leading zero from hour
    const formattedHour = hour.replace(/^0/, '');
    
    // Combine in desired format
    return `${formattedHour}:${minutes} ${period}`;
};

const handleSubmit = () => {
    // Implement form submission logic
    console.log('Form submitted:', FormData);
};

interface ReviewSubmitProps {
    formData: FormData;
    prevStep: () => void;
  }

export default function PersonalInformation({ formData, updateFormData, nextStep, prevStep }: StepProps) {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        updateFormData(name as keyof FormData, value);
    };

    // Sort the days chronologically
    const sortedDays = [...formData.days].sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 mt-12">Review Your Information</h2>
            
            {/* Updated Date and Time Section */}
            <div className="border border-gray-300 rounded-md shadow-sm p-4">
    <h2 className="text-2xl font-semibold mb-4">Selected Dates and Times</h2>
    {formData.days.length > 0 ? (
        [...formData.days]
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .map((day, index) => (
            <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold">
                    Day {index + 1}: {new Date(day.date).toDateString()}
                </h3>
                <p><strong>Start Time:</strong> {formatTime(day.startTime)}</p>
                <p><strong>End Time:</strong> {formatTime(day.endTime)}</p>
            </div>
        ))
    ) : (
        <p>No dates selected.</p>
    )}
</div>   
        <div className="border border-gray-300 rounded-md shadow-sm p-4 mt-6">
            <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <h3 className="font-medium">Name:</h3>
                    <p>{formData.name}</p>
                </div>
                <div>
                    <h3 className="font-medium">Contact Number:</h3>
                    <p>{formData.contactNum}</p>
                </div>
                <div className="col-span-2">
                    <h3 className="font-medium">Address:</h3>
                    <p>{formData.address}</p>
                </div>
                <div>
                    <h3 className="font-medium">City:</h3>
                    <p>{formData.city}</p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-medium">Province:</h3>
                        <p>{formData.province}</p>
                    </div>
                    <div>
                        <h3 className="font-medium">Zipcode:</h3>
                        <p>{formData.zipcode}</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="border border-gray-300 rounded-md shadow-sm p-4 mt-6">
            <h2 className="text-2xl font-semibold mb-4">Business Information</h2>
            <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                    <h3 className="font-medium">Company Name:</h3>
                    <p>{formData.CompanyName}</p>
                </div>
                <div>
                    <h3 className="font-medium">Company/Business Owner:</h3>
                    <p>{formData.BusinessOwner}</p>
                </div>
                <div>
                    <h3 className="font-medium">E-mail:</h3>
                    <p>{formData.CompanyEmail}</p>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-6">
                <div>
                    <h3 className="font-medium">TIN No.:</h3>
                    <p>{formData.TINNum}</p>
                </div>
                <div>
                    <h3 className="font-medium">Business Permit No.:</h3>
                    <p>{formData.BusinessPermitNum}</p>
                </div>
                <div>
                    <h3 className="font-medium">Company ID No.:</h3>
                    <p>{formData.CompanyIDNum}</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-6">
                <div>
                    <h3 className="font-medium">Contact Person:</h3>
                    <p>{formData.ContactPerson}</p>
                </div>
                <div>
                    <h3 className="font-medium">Designation</h3>
                    <p>{formData.Designation}</p>
                </div>
                <div className="col-span-2">
                    <h3 className="font-medium">Company Address:</h3>
                    <p>{formData.CompanyAddress}</p>
                </div>
                <div>
                    <h3 className="font-medium">City/Municipality:</h3>
                    <p>{formData.CompanyCity}</p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-medium">Province:</h3>
                        <p>{formData.CompanyProvince}</p>
                    </div>
                    <div>
                        <h3 className="font-medium">Zipcode:</h3>
                        <p>{formData.CompanyZipcode}</p>
                    </div>
                </div>
                <div>
                    <h3 className="font-medium">Phone No.:</h3>
                    <p>{formData.CompanyPhoneNum}</p>
                </div>
                <div>
                    <h3 className="font-medium">Mobile No.:</h3>
                    <p>{formData.CompanyMobileNum}</p>
                </div>
                <div className="col-span-2">
                    <h3 className="font-medium">Commodity/Products Manufactured:</h3>
                    <p>{formData.Manufactured}</p>
                </div>
                <div className="col-span-2">
                    <h3 className="font-medium">Frequency of Production:</h3>
                    <p>{formData.ProductionFrequency}</p>
                </div>
                <div className="col-span-2">
                    <h3 className="font-medium">Bulk of Commodity per Production:</h3>
                    <p>{formData.Bulk}</p>
                </div>
            </div>
        </div>

        <div className="border border-gray-300 rounded-md shadow-sm p-4 mt-6">
            <div className="grid grid-cols-3 gap-6">
                <h2 className="text-2xl font-semibold">Utilization Information</h2>
                <div className="col-span-3">
                    <h3 className="font-medium">Commodity/Products Manufactured:</h3>
                    <p>{formData.ProductsManufactured}</p>
                </div>
                <div className="col-span-3">
                    <h3 className="font-medium">Bulk of Commodity per Production:</h3>
                    <p>{formData.BulkofCommodity}</p>
                </div>
                <div>
                    <h3 className="font-medium">Facility:</h3>
                    <p>{formData.Facility}</p>
                </div>
                <div>
                    <h3 className="font-medium">Quantity:</h3>
                    <p>{formData.FacilityQty}</p>
                </div>
                <div>
                    <h3 className="font-medium">No. of hours:</h3>
                    <p>{formData.FacilityHrs}</p>
                </div>
                <div>
                    <h3 className="font-medium">Equipment:</h3>
                    <p>{formData.Equipment}</p>
                </div>
                <div>
                    <h3 className="font-medium">Quantity:</h3>
                    <p>{formData.EquipmentQty}</p>
                </div>
                <div>
                    <h3 className="font-medium">No. of hours:</h3>
                    <p>{formData.EquipmentHrs}</p>
                </div>
                <div>
                    <h3 className="font-medium">Tools:</h3>
                    <p>{formData.Tools}</p>
                </div>
                <div>
                    <h3 className="font-medium">Quantity:</h3>
                    <p>{formData.ToolsQty}</p>
                </div>
                <div>
                    <h3 className="font-medium">No. of hours:</h3>
                    <p>{formData.ToolsHrs}</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                    <h3 className="font-medium">Request Date:</h3>
                    <p>//insert current date</p>
                </div>
                <div>
                    <h3 className="font-medium">Start Date:</h3>
                    <p></p>
                </div>
                <div>
                    <h3 className="font-medium">Start Time:</h3>
                    <p></p>
                </div>
                <div>
                    <h3 className="font-medium">End Date:</h3>
                    <p></p>
                </div>
                <div>
                    <h3 className="font-medium">End Time:</h3>
                    <p></p>
                </div>
            </div>
        </div>

        <div className="mt-6 flex justify-between">
            <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded">Previous</button>
            
//temporary
            <Link href="/dashboard/user">
                <span className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">Submit</span>
            </Link>
        </div>
    </div>
  );
}
