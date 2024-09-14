"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';
import { Calendar } from '@/components/ui/calendar';

interface Machine {
  name: string;
  image: string;
  description: string;
}

export default function Services() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false); // State for the Schedule Service modal



  const machines = [
    {
      name: '3D Printer',
      image: 'path/to/3d-printer-image.jpg',
      description: 'Create precise and intricate 3D models with our advanced 3D printers.',
    },
    {
      name: 'Laser Cutter',
      image: 'path/to/laser-cutter-image.jpg',
      description: 'Cut and engrave materials with high precision using our laser cutters.',
    },
    {
      name: 'CNC Machine',
      image: 'path/to/cnc-machine-image.jpg',
      description: 'Produce complex parts with our computer-controlled CNC machines.',
    },
    {
      name: 'Vinyl Cutter',
      image: 'path/to/vinyl-cutter-image.jpg',
      description: 'Cut vinyl and other materials to create custom designs and decals.',
    },
    {
      name: 'Precision Miller',
      image: 'path/to/precision-miller-image.jpg',
      description: 'Assemble and repair electronic components with our soldering stations.',
    },
  ];

  const openModal = (machine: Machine) => {
    setSelectedMachine(machine);
  };

  const closeModal = () => {
    setSelectedMachine(null);
  };

  const openScheduleModal = () => {
    setIsScheduleModalOpen(true);
  };

  const closeScheduleModal = () => {
    setIsScheduleModalOpen(false);
  };


  return (
    <main className="min-h-screen bg-[#f1f1f8] pt-24">
      
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

      {/* Information Section with Schedule Service Button */}
      <section className="bg-white py-8">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-center">Avail a service now!</h2>
          <p className="text-gray-700 mb-6">Check out the latest updates on machine availability and maintenance.</p>
          <button className="bg-[#145da0] text-white py-2 px-4 rounded-full hover:bg-[#0d4a8d] transition duration-300">
            Schedule Service
          </button>
        </div>
      </section>

      {/* Schedule Service Modal */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Schedule a Service</h2>
              <button
                onClick={closeScheduleModal}
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                Close
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Calendar Component */}
              <div className="border p-4 rounded-lg">
                <Calendar />
              </div>

              {/* Informational Text */}
              <div className="flex flex-col justify-center">
                <h3 className="text-xl font-semibold mb-4">Choose a convenient time</h3>
                <p className="text-gray-700 mb-6">
                  Select a date from the calendar to schedule your service. Our team will confirm
                  availability and provide further instructions.
                </p>
                <p className="text-gray-700">
                  Need help? Contact our support team, and we'll assist you with the booking process.
                </p>
              </div>
            </div>
          </div>
          {/* Click outside the modal to close */}
          <div
            onClick={closeScheduleModal}
            className="fixed inset-0 z-10"
          ></div>
        </div>
      )}

      {/* Machines Section */}
      <section className="container mx-auto p-10">
        <h2 className="text-3xl font-semibold mb-4">Available Machines</h2>
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-opacity duration-1000 ease-in-out ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          {machines.map((machine, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <img src={machine.image} alt={machine.name} className="h-80 w-full object-cover rounded-t-lg mb-4" />
              <h3 className="text-2xl font-bold mb-2">{machine.name}</h3>
              <p className="text-gray-700 mb-4">{machine.description}</p>
              <button 
                onClick={() => openModal(machine)} 
                className="bg-[#145da0] text-white py-2 px-4 rounded-full hover:bg-[#0d4a8d] transition duration-300"
              >
                About Machine
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedMachine && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div 
            className="bg-white p-8 rounded-lg shadow-lg max-w-lg relative"
            onClick={(e) => e.stopPropagation()}  // Prevent closing when clicking inside modal
          >
            <img src={selectedMachine.image} alt={selectedMachine.name} className="h-60 w-60 object-cover rounded-lg mb-4" />
            <h3 className="text-2xl font-bold mb-4">{selectedMachine.name}</h3>
            <p className="text-gray-700 mb-4">{selectedMachine.description}</p>
            <button 
              onClick={closeModal} 
              className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </main>
  );
}
