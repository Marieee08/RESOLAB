//Not used rn because I canot figure it out

import axios from 'axios';

interface FormData {
    startDate: Date | null;
    endDate: Date | null;
    startTime: string | null;
    endTime: string | null;
  
    // ClientInfo fields
    contactNum: string;
    address: string;
    city: string;
    province: string;
    zipcode: string;
  
    // ProcessInfo fields
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
  

interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

export async function submitForm(formData: FormData): Promise<ApiResponse> {
  try {
    // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
    const response = await axios.post<ApiResponse>('YOUR_API_ENDPOINT', formData);

    if (response.status === 200 && response.data.success) {
      return {
        success: true,
        message: 'Form submitted successfully',
        data: response.data.data
      };
    } else {
      throw new Error(response.data.message || 'Submission failed');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios errors
      const errorMessage = error.response?.data?.message || error.message;
      return {
        success: false,
        message: `API error: ${errorMessage}`
      };
    } else {
      // Handle other errors
      return {
        success: false,
        message: 'An unexpected error occurred'
      };
    }
  }
}