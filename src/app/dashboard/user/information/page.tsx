import { useUser } from "@clerk/nextjs";
import { format } from 'date-fns';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState, useEffect, AwaitedReactNode, JSXElementConstructor, ReactElement, ReactNode } from 'react';

const DashboardUser = () => {
  const { user } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orderDropdownOpen, setOrderDropdownOpen] = useState(false);
  const [isBusinessView, setIsBusinessView] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const today = new Date();
  const formattedDate = format(today, 'EEEE, dd MMMM yyyy');

  // Personal Information State
  const [personalInfo, setPersonalInfo] = useState({
    ContactNum: "",
    Address: "",
    City: "",
    Province: "",
    Zipcode: ""
  });

  // Business Information State
  const [businessInfo, setBusinessInfo] = useState({
    CompanyName: "",
    BusinessOwner: "",
    BusinessPermitNum: "",
    TINNum: "",
    CompanyEmail: "",
    ContactPerson: "",
    Designation: "",
    CompanyAddress: "",
    CompanyCity: "",
    CompanyProvince: ""
  });

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user/info');
        const data = await response.json();
        
        if (data.clientInfo) {
          setPersonalInfo(data.clientInfo);
        }
        if (data.businessInfo) {
          setBusinessInfo(data.businessInfo);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  // Update functions using field name
  const updatePersonalField = (fieldName: any, value: any) => {
    setPersonalInfo(current => ({
      ...current,
      [fieldName]: value
    }));
  };

  const updateBusinessField = (fieldName: any, value: any) => {
    setBusinessInfo(current => ({
      ...current,
      [fieldName]: value
    }));
  };

  // Save changes
  const saveChanges = async () => {
    try {
      const response = await fetch('/api/user/info', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalInfo,
          businessInfo,
          isBusinessView
        }),
      });

      if (response.ok) {
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating information:', error);
    }
  };

  // Render an input field
  const renderField = (label: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<AwaitedReactNode> | null | undefined, value: string, fieldName: string, updateFunction: { (fieldName: any, value: any): void; (fieldName: any, value: any): void; (fieldName: any, value: any): void; (fieldName: any, value: any): void; (fieldName: any, value: any): void; (fieldName: any, value: any): void; (fieldName: any, value: any): void; (fieldName: any, value: any): void; (fieldName: any, value: any): void; (fieldName: any, value: any): void; (fieldName: any, value: any): void; (fieldName: any, value: any): void; (fieldName: any, value: any): void; (fieldName: any, value: any): void; (fieldName: any, value: any): void; (arg0: any, arg1: string): void; } | null) => (
    <div className="bg-white p-4 rounded-xl border border-[#5e86ca]">
      <h3 className="text-sm text-gray-500 mb-1">{label}</h3>
      {isEditing ? (
        <Input
          value={value || ''}
          onChange={(input) => updateFunction(fieldName, input.target.value)}
          className="text-lg font-qanelas1 text-gray-800"
        />
      ) : (
        <p className="text-lg font-qanelas1 text-gray-800">{value || 'Not provided'}</p>
      )}
    </div>
  );

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#f1f5f9]">
      <main className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-[#143370] text-3xl font-bold font-qanelas3">Account Information</h2>
              <p className="text-sm text-[#143370] font-poppins1">{formattedDate}</p>
            </div>
            <Button
              onClick={() => isEditing ? saveChanges() : setIsEditing(true)}
              className="px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 text-blue-800 bg-blue-100 border border-[#5e86ca] hover:bg-blue-200"
            >
              {isEditing ? 'Save Changes' : 'Edit Information'}
            </Button>
          </div>

          <div className="flex justify-left mb-6">
            <div className="inline-flex bg-white rounded-full p-1 border border-[#5e86ca]">
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${!isBusinessView ? 'text-blue-800 bg-blue-100 border border-[#5e86ca]' : 'text-gray-600 hover:bg-gray-300'}`}
                onClick={() => setIsBusinessView(false)}
              >
                Personal Info
              </button>
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isBusinessView ? 'text-blue-800 bg-blue-100 border border-[#5e86ca]' : 'text-gray-600 hover:bg-gray-300'}`}
                onClick={() => setIsBusinessView(true)}
              >
                Business Info
              </button>
            </div>
          </div>

          <div className="pt-8">
            {!isBusinessView ? (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {renderField("Full Name", user?.firstName + " " + user?.lastName, "fullName", null)}
                  {renderField("Contact Number", personalInfo.ContactNum, "ContactNum", updatePersonalField)}
                  {renderField("Address", personalInfo.Address, "Address", updatePersonalField)}
                </div>
                <div className="space-y-4">
                  {renderField("City/Municipality", personalInfo.City, "City", updatePersonalField)}
                  {renderField("Province", personalInfo.Province, "Province", updatePersonalField)}
                  {renderField("Zip Code", personalInfo.Zipcode, "Zipcode", updatePersonalField)}
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {renderField("Company Name", businessInfo.CompanyName, "CompanyName", updateBusinessField)}
                  {renderField("Business Owner", businessInfo.BusinessOwner, "BusinessOwner", updateBusinessField)}
                  {renderField("Business Permit Number", businessInfo.BusinessPermitNum, "BusinessPermitNum", updateBusinessField)}
                  {renderField("TIN Number", businessInfo.TINNum, "TINNum", updateBusinessField)}
                  {renderField("Company Email", businessInfo.CompanyEmail, "CompanyEmail", updateBusinessField)}
                </div>
                <div className="space-y-4">
                  {renderField("Contact Person", businessInfo.ContactPerson, "ContactPerson", updateBusinessField)}
                  {renderField("Designation", businessInfo.Designation, "Designation", updateBusinessField)}
                  {renderField("Company Address", businessInfo.CompanyAddress, "CompanyAddress", updateBusinessField)}
                  {renderField("Company City", businessInfo.CompanyCity, "CompanyCity", updateBusinessField)}
                  {renderField("Company Province", businessInfo.CompanyProvince, "CompanyProvince", updateBusinessField)}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardUser;