"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import UserManagement from '@/components/custom/usermanagement';
import { format } from 'date-fns';
import { useUser } from "@clerk/nextjs";

interface ClientInfo {
  ContactNum: string;
  Address: string;
  City: string;
  Province: string;
  Zipcode: number;
}

interface BusinessInfo {
  CompanyName: string;
  BusinessOwner: string;
  BusinessPermitNum: string;
  TINNum: string;
  CompanyEmail: string;
  ContactPerson: string;
  Designation: string;
  CompanyAddress: string;
  CompanyCity: string;
  CompanyProvince: string;
  CompanyZipcode: number;
}

const DashboardAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orderDropdownOpen, setOrderDropdownOpen] = useState(false);
  const today = new Date();
  const { user, isLoaded } = useUser();
  const [userRole, setUserRole] = useState<string>("Loading...");
  const formattedDate = format(today, 'EEEE, dd MMMM yyyy');
  const [isBusinessView, setIsBusinessView] = useState(false);
  const [clientInfo, setClientInfo] = useState<ClientInfo | null>(null);
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const checkUserRole = async () => {
      if (!user) {
        setUserRole("Not logged in");
        return;
      }
      try {
        const publicMetadata = user.publicMetadata;
        const role = publicMetadata.role || "USER";
        setUserRole(role as string);
      } catch (error) {
        console.error("Error fetching user role:", error);
        setUserRole("Error fetching role");
      }
    };
  
    if (isLoaded) {
      checkUserRole();
    }
  }, [user, isLoaded]);

  const fetchUserData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Fetch business info
      const businessResponse = await fetch(`/api/businessinfo?userId=${user.id}`);
      if (!businessResponse.ok) {
        console.warn("Business info fetch status:", businessResponse.status);
        const errorText = await businessResponse.text();
        console.warn("Business info error:", errorText);
        // Optionally, show an error to the user or set default business data
        setBusinessInfo(null);
      } else {
        const businessData = await businessResponse.json();
        console.log("Business Data:", businessData);
        if (businessData && Object.keys(businessData).length > 0) {
          setBusinessInfo(businessData);
        } else {
          console.warn("No business info found for the user.");
          setBusinessInfo(null); // Optionally, set an empty state or default value
        }
      }


    } catch (error) {
      console.error("Error fetching user data:", error);
      // You can also set an error state to show user-friendly messages if needed
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#f1f5f9]">
      {/* Sidebar */}
      <aside className={`absolute left-0 top-0 z-50 flex h-screen w-72 flex-col overflow-y-hidden bg-[#0d172c] duration-300 ease-linear lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
          <Link href="/" className="mt-5">
            <span className="text-white text-2xl font-bold font-qanelas4">FABLAB</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="block text-white lg:hidden">
            X
          </button>
        </div>
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
        <div className="flex flex-col items-center py-8">
            {user?.imageUrl ? (
              <img 
                src={user.imageUrl} 
                alt="Profile" 
                className="h-36 w-36 rounded-full object-cover mb-2"
              />
            ) : (
              <span className="h-36 w-36 rounded-full bg-gray-600 mb-2"></span>
            )}
            <h2 className="text-white text-xl font-bold">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-[#5e86ca]">{userRole}</p>
        </div>
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-gray-400">MENU</h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <button
                  onClick={() => setOrderDropdownOpen(!orderDropdownOpen)}
                  className="group relative flex w-full items-center justify-between gap-2.5 rounded-full py-2 px-4 font-medium text-white hover:bg-[#1c2a52] hover:border hover:border-[#5e86ca]"
                >
                  <span>Orders</span>
                  {/* Dropdown arrow */}
                  <svg
                    className={`w-4 h-4 transform transition-transform duration-300 ${orderDropdownOpen ? 'rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              </li>
              {orderDropdownOpen && (
                <>
                  <li className="ml-6">
                    <Link href="/dashboard/admin" className="group relative flex items-center gap-2.5 rounded-full py-2 px-4 font-medium text-gray-400 hover:text-white">
                      General
                    </Link>
                  </li>
                  <li className="ml-6">
                    <Link href="/dashboard/admin/history" className="group relative flex items-center gap-2.5 rounded-full py-2 px-4 font-medium text-gray-400 hover:text-white">
                      History
                    </Link>
                  </li>
                  <li className="ml-6">
                    <Link href="/dashboard/admin/machines" className="group relative flex items-center gap-2.5 rounded-full py-2 px-4 font-medium text-gray-400 hover:text-white">
                      Machines
                    </Link>
                  </li>
                  <li className="ml-6">
                    <Link href="/dashboard/admin/users" className="group relative flex items-center gap-2.5 rounded-full py-2 px-4 font-medium text-gray-400 hover:text-white">
                      Users
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link href="/dashboard/admin/reports" className="group relative flex items-center gap-2.5 rounded-full py-2 px-4 font-medium text-white border border-transparent hover:bg-[#1c2a52] hover:border-[#5e86ca]">
                  Reports
                </Link>
              </li>
              <li>
                <Link href="/dashboard/admin/profile" className="group relative flex w-full items-center justify-between gap-2.5 rounded-full py-2 px-4 font-medium text-white border bg-[#1c2a52] border-[#5e86ca]">
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/dashboard-admin" className="group relative flex items-center gap-2.5 rounded-full py-2 px-4 font-medium text-white border border-transparent hover:bg-[#1c2a52] hover:border-[#5e86ca]">
                  Settings
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </aside>






      {/* Main Content */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {/* Header */}
        <header className="sticky top-0 z-999 flex w-full bg-white shadow-md">
          <div className="flex flex-grow items-center justify-between py-4 px-4 shadow-2 md:px-6 2xl:px-11">
            <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="block rounded-sm border border-stroke bg-white p-1.5 shadow-sm lg:hidden"
              >
                Menu
              </button>
            </div>
            <div className="flex space-x-6 lg:space-x-10">
            <Link href="/" className="font-qanelas1 text-black px-4 py-2 rounded-full hover:bg-[#d5d7e2] transition duration-300">
              Home
            </Link>
            <Link href="/services/user" className="font-qanelas1 text-black px-4 py-2 rounded-full hover:bg-[#d5d7e2] transition duration-300">
              Services
            </Link>
            <Link href="/contact" className="font-qanelas1 text-black px-4 py-2 rounded-full hover:bg-[#d5d7e2] transition duration-300">
              Contact
            </Link>
            </div>
            <div className="hidden sm:block">
              <form action="#" method="POST">
                <input
                  type="text"
                  placeholder="Type to search..."
                  className="w-full bg-transparent pr-4 pl-9 focus:outline-none"
                />
              </form>
            </div>
            <div className="flex items-center gap-3 2xsm:gap-7">
              <Link href="#" className="flex items-center gap-4">
                <span className="hidden text-right lg:block">
                  <span className="block text-sm font-medium text-black">
                    {user?.firstName} {user?.lastName || ''}
                  </span>
                  <span className="block text-xs">{userRole}</span>
                </span>
                {user?.imageUrl ? (
                  <img 
                    src={user.imageUrl} 
                    alt="Profile" 
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <span className="h-12 w-12 rounded-full bg-gray-300"></span>
                )}
              </Link>
            </div>
          </div>
        </header>
          <main>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
          <h2 className="text-[#143370] text-3xl font-bold font-qanelas3">Account Information</h2>
          <p className="text-sm text-[#143370] mb-4 font-poppins1">{formattedDate}</p>
         
          <section className="flex-1">
          <div className="py-4 border-b border-gray-200">
            <div className="flex justify-left">
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
              <button
                  className="ml-4 px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 text-blue-800 bg-blue-100 border border-[#5e86ca]">
                  Edit Information
                </button>
              
            </div>




  {/* Information Display */}
  <div className="pt-8">
      {!isBusinessView ? (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border hover:border-[#5e86ca] transform hover:scale-105 transition-all duration-300">
              <h3 className="text-sm text-gray-500 mb-1">Full Name</h3>
              <p className="text-lg font-qanelas1 text-gray-800">
                {user?.firstName} {user?.lastName}
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border hover:border-[#5e86ca] transform hover:scale-105 transition-all duration-300">
              <h3 className="text-sm text-gray-500 mb-1">Contact Number</h3>
              <p className="text-lg font-qanelas1 text-gray-800">
                {clientInfo?.ContactNum || "Not provided"}
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border hover:border-[#5e86ca] transform hover:scale-105 transition-all duration-300">
              <h3 className="text-sm text-gray-500 mb-1">Address</h3>
              <p className="text-lg font-qanelas1 text-gray-800">
                {clientInfo?.Address || "Not provided"}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border hover:border-[#5e86ca] transform hover:scale-105 transition-all duration-300">
              <h3 className="text-sm text-gray-500 mb-1">City/Municipality</h3>
              <p className="text-lg font-qanelas1 text-gray-800">
                {clientInfo?.City || "Not provided"}
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border hover:border-[#5e86ca] transform hover:scale-105 transition-all duration-300">
              <h3 className="text-sm text-gray-500 mb-1">Province</h3>
              <p className="text-lg font-qanelas1 text-gray-800">
                {clientInfo?.Province || "Not provided"}
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border hover:border-[#5e86ca] transform hover:scale-105 transition-all duration-300">
              <h3 className="text-sm text-gray-500 mb-1">Zip Code</h3>
              <p className="text-lg font-qanelas1 text-gray-800">
                {clientInfo?.Zipcode || "Not provided"}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border hover:border-[#5e86ca] transform hover:scale-105 transition-all duration-300">
              <h3 className="text-sm text-gray-500 mb-1">Company Name</h3>
              <p className="text-lg font-qanelas1 text-gray-800">
                {businessInfo?.CompanyName || "Not provided"}
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border hover:border-[#5e86ca] transform hover:scale-105 transition-all duration-300">
              <h3 className="text-sm text-gray-500 mb-1">Business Owner</h3>
              <p className="text-lg font-qanelas1 text-gray-800">
                {businessInfo?.BusinessOwner || "Not provided"}
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border hover:border-[#5e86ca] transform hover:scale-105 transition-all duration-300">
              <h3 className="text-sm text-gray-500 mb-1">TIN No.</h3>
              <p className="text-lg font-qanelas1 text-gray-800">
                {businessInfo?.TINNum || "Not provided"}
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border hover:border-[#5e86ca] transform hover:scale-105 transition-all duration-300">
              <h3 className="text-sm text-gray-500 mb-1">Business Permit No.</h3>
              <p className="text-lg font-qanelas1 text-gray-800">
                {businessInfo?.BusinessPermitNum || "Not provided"}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border hover:border-[#5e86ca] transform hover:scale-105 transition-all duration-300">
              <h3 className="text-sm text-gray-500 mb-1">Contact Person</h3>
              <p className="text-lg font-qanelas1 text-gray-800">
                {businessInfo?.ContactPerson || "Not provided"}
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border hover:border-[#5e86ca] transform hover:scale-105 transition-all duration-300">
              <h3 className="text-sm text-gray-500 mb-1">Position/Designation</h3>
              <p className="text-lg font-qanelas1 text-gray-800">
                {businessInfo?.Designation || "Not provided"}
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border hover:border-[#5e86ca] transform hover:scale-105 transition-all duration-300">
              <h3 className="text-sm text-gray-500 mb-1">Company Address</h3>
              <p className="text-lg font-qanelas1 text-gray-800">
                {businessInfo?.CompanyAddress || "Not provided"}
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border hover:border-[#5e86ca] transform hover:scale-105 transition-all duration-300">
              <h3 className="text-sm text-gray-500 mb-1">Company City</h3>
              <p className="text-lg font-qanelas1 text-gray-800">
                {businessInfo?.CompanyCity || "Not provided"}
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border hover:border-[#5e86ca] transform hover:scale-105 transition-all duration-300">
              <h3 className="text-sm text-gray-500 mb-1">Company Province</h3>
              <p className="text-lg font-qanelas1 text-gray-800">
                {businessInfo?.CompanyProvince || "Not provided"}
              </p>
            </div>
          </div>
        </div>
      )}


          </div>
        </div>
            </section>
            </div>
          </main>
      </div>
    </div>
  );
};


export default DashboardAdmin;