"use client";

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { Calendar } from '@/components/ui/calendar';
import Navbar from '@/components/custom/navbar';

interface Machine {
  id: string;
  Machine: string;
  Image: string;
  Desc: string;
  Link: string; // Add Link property for the video
}

export default function Services() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [machines, setMachines] = useState<Machine[]>([]);

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await fetch('/api/machines');
        const data = await response.json();
        setMachines(data);
      } catch (error) {
        console.error('Error fetching machines:', error);
      }
    };

    fetchMachines();
  }, []);

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

      <section className="bg-white py-8">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-center">Avail a service now!</h2>
          <p className="text-gray-700 mb-6">Check out the latest updates on machine availability and maintenance.</p>
          <Link href="/services/user/schedule" className="bg-[#145da0] text-white py-2 px-4 rounded-full hover:bg-[#0d4a8d] transition duration-300">
            Schedule Service
          </Link>
        </div>
      </section>

      {isScheduleModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Schedule a Service</h2>
              <button onClick={closeScheduleModal} className="text-gray-600 hover:text-gray-900 focus:outline-none">Close</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border p-4 rounded-lg">
                <Calendar />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-xl font-semibold mb-4">Choose a convenient time</h3>
                <p className="text-gray-700 mb-6">Select a date from the calendar to schedule your service. Our team will confirm availability and provide further instructions.</p>
                <p className="text-gray-700">Need help? Contact our support team, and we'll assist you with the booking process.</p>
              </div>
            </div>
          </div>
          <div onClick={closeScheduleModal} className="fixed inset-0 z-10"></div>
        </div>
      )}

      <section className="container mx-auto p-10">
        <h2 className="text-3xl font-semibold mb-4">Available Machines</h2>
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-opacity duration-1000 ease-in-out ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          {machines.map((machine) => (
            <div key={machine.id} className="bg-white p-6 rounded-lg shadow-lg">
              <img src={machine.Image} alt={machine.Machine} className="h-80 w-full object-cover rounded-t-lg mb-4" />
              <h3 className="text-2xl font-bold mb-2">{machine.Machine}</h3>
              <p className="text-gray-600 mb-4">
                {machine.Desc.length > 100 ? `${machine.Desc.substring(0, 100)}...` : machine.Desc}
              </p>
              <button 
                onClick={() => openModal(machine)} 
                className="bg-[#145da0] text-white py-2 px-4 rounded-full hover:bg-[#0d4a8d] transition duration-300 mt-4"
              >
                About Machine
              </button>
            </div>
          ))}
        </div>
      </section>

      {selectedMachine && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={closeModal}>
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg relative" onClick={(e) => e.stopPropagation()}>
            <img src={selectedMachine.Image} alt={selectedMachine.Machine} className="h-60 w-60 object-cover rounded-lg mb-4" />
            <h3 className="text-2xl font-bold mb-4">{selectedMachine.Machine}</h3>
            <p className="text-gray-700 mb-4">{selectedMachine.Desc}</p>
            <a
              href={selectedMachine.Link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mb-4 block"
            >
              Watch Video
            </a>
            <button onClick={closeModal} className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition duration-300">Close</button>
          </div>
        </div>
      )}
    </main>
  );
}
