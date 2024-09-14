"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';
import { Calendar } from '@/components/ui/calendar';
import Navbar from '@/components/custom/navbar';

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
      
    <Navbar />

      {/* Information Section with Schedule Service Button */}
      <section className="bg-white py-8">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-center">Avail a service now!</h2>
          <p className="text-gray-700 mb-6">Check out the latest updates on machine availability and maintenance.</p>
          <Link href="/services/schedule" className="bg-[#145da0] text-white py-2 px-4 rounded-full hover:bg-[#0d4a8d] transition duration-300">
            Schedule Service
          </Link>
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