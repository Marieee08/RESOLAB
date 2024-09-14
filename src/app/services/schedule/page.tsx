"use client";

import Link from "next/link";

export default function Schedule(){
    <main>
        <nav className="bg-[#0d4a8d] p-4 fixed w-full top-0 z-10">
        <div className="container mx-auto flex items-center justify-between relative">
          <div className="flex items-center space-x-4">
            <img src="/images" alt="DOST Logo" className="w-10 h-10" />
            <img src="SSF-logo.png" alt="SSF Logo" className="w-10 h-10" />
            <Link href="/.." className="text-white text-lg">RESOLAB</Link>
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-10">
              <Link href="/dashboard" className="text-white px-4 py-2 rounded hover:bg-[#5394cf] transition duration-300">Dashboard</Link>
              <Link href="/services" className="text-white px-4 py-2 rounded hover:bg-[#5394cf] transition duration-300">Services</Link>
              <Link href="/contact" className="text-white px-4 py-2 rounded hover:bg-[#5394cf] transition duration-300">Contact</Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative group">
              <button className="text-white px-4 py-2 rounded hover:bg-blue-500 transition duration-300 focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405C18.79 14.79 18 13.42 18 12V8a6 6 0 10-12 0v4c0 1.42-.79 2.79-2.595 3.595L3 17h5m4 0v1a3 3 0 11-6 0v-1m6 0a3 3 0 01-6 0"></path>
                </svg>
              </button>
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                <ul className="divide-y divide-gray-300">
                  <li className="px-4 py-2 text-gray-800 hover:bg-gray-100">
                    Order Notification 1
                  </li>
                  <li className="px-4 py-2 text-gray-800 hover:bg-gray-100">
                    Announcement 1
                  </li>
                  <li className="px-4 py-2 text-gray-800 hover:bg-gray-100">
                    Message Notification 1
                  </li>
                  <li className="px-4 py-2 text-gray-800 hover:bg-gray-100">
                    Order Notification 2
                  </li>
                  <li className="px-4 py-2 text-gray-800 hover:bg-gray-100">
                    Announcement 2
                  </li>
                  <li className="px-4 py-2 text-gray-800 hover:bg-gray-100">
                    Message Notification 2
                  </li>
                </ul>
              </div>
            </div>

            <img src="path/to/profile-picture.jpg" alt="Profile" className="w-10 h-10 rounded-full" />
          </div>
        </div>
      </nav>




      

    </main>
}