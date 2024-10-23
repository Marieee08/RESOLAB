"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import Navbar from '@/components/custom/navbar';

interface Machine {
  id: string;
  name: string;
  image: string;
  description: string;
  videoUrl?: string;
}

export default function AdminServices() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMachine, setEditingMachine] = useState<Machine | null>(null);
  const [formData, setFormData] = useState<Partial<Machine>>({});

  useEffect(() => {
    fetchMachines();
  }, []);

  const fetchMachines = async () => {
    try {
      const response = await fetch('/api/machines');
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched machines:', data); // Log the data to inspect the structure
        setMachines(data);
      } else {
        console.error('Failed to fetch machines');
      }
    } catch (error) {
      console.error('Error fetching machines:', error);
    }
  };  

  const deleteMachine = async (id: string) => {
      try {
        const response = await fetch(`/api/machines/${id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          // Remove the deleted machine from the state
          setMachines(machines.filter((machine) => machine.id !== id));
          console.log('Machine deleted successfully');
        } else {
          console.error('Failed to delete machine:', await response.text());
        }
      } catch (error) {
        console.error('Error deleting machine:', error);
      }
  };  
  

  const openModal = (machine: Machine | null = null) => {
    console.log(machine);
    setEditingMachine(machine); // Set the machine being edited
  
    // Pre-fill the form data with the machine's data
    if (machine) {
      setFormData({
        name: machine.Machine || '', // Capitalized field
        image: machine.Image || '',   // Capitalized field
        description: machine.Desc || '', // Capitalized field
        videoUrl: machine.Link || '',
      });
    } else {
      setFormData({}); // If adding a new machine, reset formData
    }
  
    setIsModalOpen(true); // Open the modal
  };   
  

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingMachine(null);
    setFormData({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Prepare data consistent with the form inputs
  const machineData = {
    name: formData.name,
    image: formData.image,
    description: formData.description,
    videoUrl: formData.videoUrl,
  };

  try {
    let response;

    if (editingMachine) {
      // Update existing machine
      response = await fetch(`/api/machines/${editingMachine.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(machineData),
      });
    }
     else {
      // Add new machine
      response = await fetch('/api/machines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(machineData),
      });
    }

    if (response.ok) {
      const updatedMachine = await response.json();
      if (editingMachine) {
        // Update machine in state
        setMachines(machines.map((m) => (m.id === updatedMachine.id ? updatedMachine : m)));
      } else {
        // Add new machine to state
        setMachines([...machines, updatedMachine]);
      }
      closeModal();
    } else {
      console.error('Failed to save machine:', await response.text());
    }
  } catch (error) {
    console.error('Error submitting machine:', error);
  }
};

  

  return (
    <main className="min-h-screen bg-[#f1f1f8] pt-24">
      <Navbar />
      
      <div className="container mx-auto p-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Manage Services</h1>
          <button
            onClick={() => openModal()}
            className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center"
          >
            <Plus size={20} className="mr-2" /> Add New Machine
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {machines.map(machine => (
  <div key={machine.id} className="bg-white rounded-lg shadow-md p-6">
    <img src={machine.Image} alt={machine.Machine} className="w-full h-48 object-cover rounded-md mb-4" />
    <h2 className="text-xl font-semibold mb-2">{machine.Machine}</h2>
    <p className="text-gray-600 mb-4">{machine.Desc}</p>
    {machine.Link && (
      <a href={machine.Link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mb-4 block">
        Watch Video
      </a>
    )}
    <div className="flex justify-end space-x-2">
      <button
        onClick={() => openModal(machine)}
        className="bg-blue-500 text-white p-2 rounded-full"
      >
        <Edit size={20} />
      </button>
      <button
        onClick={() => deleteMachine(machine.id)}
        className="bg-red-500 text-white p-2 rounded-full"
      >
        <Trash2 size={20} />
      </button>
    </div>
  </div>
))}

        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{editingMachine ? 'Edit' : 'Add'} Machine</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
  <div className="mb-4">
    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
    <input
      type="text"
      id="name"
      name="name"
      value={formData.name || ''}
      onChange={handleInputChange}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      required
    />
  </div>

  <div className="mb-4">
    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
    <textarea
      id="description"
      name="description"
      value={formData.description || ''}
      onChange={handleInputChange}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      rows={3}
      required
    ></textarea>
  </div>

  <div className="mb-4">
    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
    <input
      type="text"
      id="image"
      name="image"
      value={formData.image || ''}
      onChange={handleInputChange}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      required
    />
  </div>

  <div className="mb-4">
    <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700">YouTube Video URL</label>
    <input
      type="text"
      id="videoUrl"
      name="videoUrl"
      value={formData.videoUrl || ''}
      onChange={handleInputChange}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    />
  </div>

  <div className="flex justify-end">
    <button
      type="submit"
      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      {editingMachine ? 'Update' : 'Add'} Machine
    </button>
  </div>
</form>

          </div>
        </div>
      )}
    </main>
  );
}