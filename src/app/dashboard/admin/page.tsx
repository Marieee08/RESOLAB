"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import EditableCalendar from '@/components/custom/editcalendar';

const DashboardAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orderDropdownOpen, setOrderDropdownOpen] = useState(false);

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
        <span className="h-36 w-36 rounded-full bg-gray-300 mb-2"></span>
          <h2 className="text-white text-xl font-bold">Username</h2>
          <p className="text-[#5e86ca]">Admin</p>
        </div>
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-gray-400">MENU</h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <button
                  onClick={() => setOrderDropdownOpen(!orderDropdownOpen)}
                  className="group relative flex w-full items-center justify-between gap-2.5 rounded-full py-2 px-4 font-medium text-white border bg-[#1c2a52] border-[#5e86ca]"
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
                    <Link href="/dashboard/admin/history" className="group relative flex items-center gap-2.5 rounded-full py-2 px-4 font-medium text-gray-400 hover:text-white">
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
                <Link href="/dashboard-admin" className="group relative flex items-center gap-2.5 rounded-full py-2 px-4 font-medium text-white border border-transparent hover:bg-[#1c2a52] hover:border-[#5e86ca]">
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
                  <span className="block text-sm font-medium text-black">Ashkinaz Canonoy</span>
                  <span className="block text-xs">Student</span>
                </span>
                <span className="h-12 w-12 rounded-full bg-gray-300"></span>
              </Link>
            </div>
          </div>
        </header>

        {/* Main */}
        <main>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
          <h2 className="text-[#143370] text-3xl font-bold font-qanelas3">Dashboard</h2>
          <p className="text-sm text-[#143370] mb-4 font-poppins1">Wednesday, 30 October 2024</p>
          <EditableCalendar />
            <div className="bg-white p-6 rounded-3xl shadow-lg mt-6">
              <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
              <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 rounded-xl">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div>
                                        <div className="text-sm font-medium text-gray-500">
                                            9/29/24
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">
                                            Sir Rolex Padilla
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            havemercyonus@example.com
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">Our Beloved Teacher</div>
                                <div className="text-sm text-gray-500">Please Please</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Pending
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                Admin
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                Tarpaulin Printing
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                                <a href="#" className="text-indigo-600 hover:text-indigo-900">Approve</a>
                                <a href="#" className="ml-2 text-red-600 hover:text-red-900">Review</a>
                            </td>
                        </tr>


                        <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div>
                                        <div className="text-sm font-medium text-gray-500">
                                            9/29/24
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">
                                            Sir Rolex Padilla
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            havemercyonus@example.com
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">Our Beloved Teacher</div>
                                <div className="text-sm text-gray-500">Please Please</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Pending
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                Admin
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                Heat Press
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                                <a href="#" className="text-indigo-600 hover:text-indigo-900">Approve</a>
                                <a href="#" className="ml-2 text-red-600 hover:text-red-900">Review</a>
                            </td>
                        </tr>


                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div>
                                        <div className="text-sm font-medium text-gray-500">
                                            9/29/24
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">
                                            Sir Rolex Padilla
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            havemercyonus@example.com
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">Our Beloved Teacher</div>
                                <div className="text-sm text-gray-500">Please Please</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Pending
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                Admin
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                3D Printing
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                                <a href="#" className="text-indigo-600 hover:text-indigo-900">Approve</a>
                                <a href="#" className="ml-2 text-red-600 hover:text-red-900">Review</a>
                            </td>
                        </tr>



                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div>
                                        <div className="text-sm font-medium text-gray-500">
                                            9/29/24
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">
                                            Sir Rolex Padilla
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            havemercyonus@example.com
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">Our Beloved Teacher</div>
                                <div className="text-sm text-gray-500">Please Please</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Pending
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                Admin
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                Laser Cutting
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                                <a href="#" className="text-indigo-600 hover:text-indigo-900">Approve</a>
                                <a href="#" className="ml-2 text-red-600 hover:text-red-900">Review</a>
                            </td>
                        </tr>

                        </tbody>
            </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardAdmin;