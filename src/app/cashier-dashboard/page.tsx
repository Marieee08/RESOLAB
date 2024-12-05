"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const DashboardCashier = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Dummy completed job data
  const completedJobs = [
    {
      id: 1,
      date: "2024-12-04",
      customerName: "John Doe",
      service: "3D Printing",
      product: "Custom Phone Case",
      status: "Completed"
    }
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#f1f5f9]">
      {/* Sidebar */}
      <aside className={`absolute left-0 top-0 z-50 flex h-screen w-72 flex-col overflow-y-hidden bg-white duration-300 ease-linear lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
          <Link href="/" className="mt-5">
            <span className="text-[#143370] text-2xl font-bold">FABLAB</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="block lg:hidden">
            X
          </button>
        </div>
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div className="flex flex-col items-center py-8">
            <span className="h-36 w-36 rounded-full bg-gray-300 mb-2"></span>
            <h2 className="text-[#0d172c] text-xl font-bold">Cashier Name</h2>
            <p className="text-[#1c62b5]">Cashier</p>
          </div>
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-gray-600">MENU</h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <Link href="/cashier-dashboard" className="group relative flex items-center gap-2.5 rounded-full py-2 px-4 font-medium text-blue-800 bg-blue-100 border border-[#5e86ca]">
                  Completed Jobs
                </Link>
              </li>
              <li>
                <Link href="/cashier-dashboard/history" className="group relative flex items-center gap-2.5 rounded-full py-2 px-4 font-medium text-[#0d172c] border border-transparent hover:text-blue-800 hover:bg-blue-100 hover:border-[#5e86ca]">
                  History
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
              <Link href="/" className="font-medium text-black px-4 py-2 rounded-full hover:bg-[#d5d7e2] transition duration-300">
                Home
              </Link>
              <Link href="/services" className="font-medium text-black px-4 py-2 rounded-full hover:bg-[#d5d7e2] transition duration-300">
                Services
              </Link>
              <Link href="/contact" className="font-medium text-black px-4 py-2 rounded-full hover:bg-[#d5d7e2] transition duration-300">
                Contact
              </Link>
            </div>
            <div className="flex items-center gap-3 2xsm:gap-7">
              <div className="flex items-center gap-4">
                <span className="hidden text-right lg:block">
                  <span className="block text-sm font-medium text-black">Cashier Name</span>
                  <span className="block text-xs">Cashier</span>
                </span>
                <span className="h-12 w-12 rounded-full bg-gray-300"></span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
          <h2 className="text-[#143370] text-3xl font-bold mb-2">Completed Jobs</h2>
          <p className="text-sm text-[#143370] mb-6">Review and confirm completed jobs</p>

          {/* Jobs Table */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Jobs Pending Confirmation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {completedJobs.map(job => (
                      <tr key={job.id}>
                        <td className="px-6 py-4">{job.date}</td>
                        <td className="px-6 py-4">{job.customerName}</td>
                        <td className="px-6 py-4">{job.service}</td>
                        <td className="px-6 py-4">{job.product}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {job.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-blue-600 hover:text-blue-900">
                            View Details
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                            Confirm
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default DashboardCashier;