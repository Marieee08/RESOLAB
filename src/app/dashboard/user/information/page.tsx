"use client";

import React, { useState, useEffect } from 'react';
import { useUser } from "@clerk/nextjs";

// Define types based on your Prisma models
interface ClientInfo {
  id: number;
  ContactNum: string;
  Address: string | null;
  City: string | null;
  Province: string | null;
  Zipcode: number | null;
  accInfoId: number;
}

interface AccInfo {
  id: number;
  clerkId: string;
  Name: string;
  email: string;
  Role: string;
  ClientInfo: ClientInfo | null;
}

interface UserData {
  accInfo: AccInfo | null;
  clientInfo: ClientInfo | null;
}

const DashboardUser = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orderDropdownOpen, setOrderDropdownOpen] = useState(false);
  const [isBusinessView, setIsBusinessView] = useState(false);
  const [userData, setUserData] = useState<AccInfo | null>(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.id) {
        try {
          const response = await fetch(`/api/user-info?clerkId=${user.id}`);
          const data = await response.json();
          setUserData(data);
          console.log('Fetched data:', data); // For debugging
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [user?.id]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f1f5f9]">
      {/* Sidebar code remains the same */}
      
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {/* Header code remains the same */}

        <main>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            <h2 className="text-[#143370] text-3xl font-bold font-qanelas3">Account Information</h2>
            <p className="text-sm text-[#143370] mb-4 font-poppins1">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}
            </p>

            <section className="flex-1">
              <div className="py-4 border-b border-gray-200">
                <div className="flex justify-left">
                  <div className="inline-flex bg-white rounded-full p-1 border border-[#5e86ca]">
                    <button
                      className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        !isBusinessView ? 'text-blue-800 bg-blue-100 border border-[#5e86ca]' : 'text-gray-600 hover:bg-gray-300'
                      }`}
                      onClick={() => setIsBusinessView(false)}
                    >
                      Personal Info
                    </button>
                    <button
                      className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        isBusinessView ? 'text-blue-800 bg-blue-100 border border-[#5e86ca]' : 'text-gray-600 hover:bg-gray-300'
                      }`}
                      onClick={() => setIsBusinessView(true)}
                    >
                      Business Info
                    </button>
                  </div>
                  <button className="ml-4 px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 text-blue-800 bg-blue-100 border border-[#5e86ca]">
                    Edit Information
                  </button>
                </div>

                <div className="pt-8">
                  {!isBusinessView ? (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-xl border border-[#5e86ca]">
                          <h3 className="text-sm text-gray-500 mb-1">Full Name</h3>
                          <p className="text-lg font-qanelas1 text-gray-800">
                            {userData?.Name || 'Not provided'}
                          </p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-[#5e86ca]">
                          <h3 className="text-sm text-gray-500 mb-1">Contact Number</h3>
                          <p className="text-lg font-qanelas1 text-gray-800">
                            {userData?.ClientInfo?.ContactNum || 'Not provided'}
                          </p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-[#5e86ca]">
                          <h3 className="text-sm text-gray-500 mb-1">Address</h3>
                          <p className="text-lg font-qanelas1 text-gray-800">
                            {userData?.ClientInfo?.Address || 'Not provided'}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-xl border border-[#5e86ca]">
                          <h3 className="text-sm text-gray-500 mb-1">City/Municipality</h3>
                          <p className="text-lg font-qanelas1 text-gray-800">
                            {userData?.ClientInfo?.City || 'Not provided'}
                          </p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-[#5e86ca]">
                          <h3 className="text-sm text-gray-500 mb-1">Province</h3>
                          <p className="text-lg font-qanelas1 text-gray-800">
                            {userData?.ClientInfo?.Province || 'Not provided'}
                          </p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-[#5e86ca]">
                          <h3 className="text-sm text-gray-500 mb-1">Zip Code</h3>
                          <p className="text-lg font-qanelas1 text-gray-800">
                            {userData?.ClientInfo?.Zipcode || 'Not provided'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Business Info view remains the same */}
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

export default DashboardUser;