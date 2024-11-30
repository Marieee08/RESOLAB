"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Minus } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import Navbar from '@/components/custom/navbar';


interface Machine {
  id: string;
  Machine: string;
  Image: string;
  Desc: string;
  Link?: string;
  isAvailable: boolean;
}

interface Tool {
  id: string;
  Tool: string;
  Quantity: number;
}

interface Service {
  id: string;
  Service: string;
}

export default function AdminServices() {
  // Machine states
  const [machines, setMachines] = useState<Machine[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [formData, setFormData] = useState<Partial<Machine>>({});
  const [editingMachine, setEditingMachine] = useState<Machine | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Tool states
  const [isToolModalOpen, setIsToolModalOpen] = useState(false);
  const [isAddingTool, setIsAddingTool] = useState(false);
  const [editingTool, setEditingTool] = useState<Tool | null>(null);
  const [newTool, setNewTool] = useState('');
  const [toolQuantity, setToolQuantity] = useState(1);

  // Services states
  const [services, setServices] = useState<Service[]>([]);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [newServiceName, setNewServiceName] = useState('');
  const [editingService, setEditingService] = useState<Service | null>(null);

  useEffect(() => {
    fetchMachines();
    fetchTools();
    fetchServices();
  }, []);

  const fetchMachines = async () => {
    try {
      const response = await fetch('/api/machines');
      if (response.ok) {
        const data = await response.json();
        setMachines(data);
      }
    } catch (error) {
      console.error('Error fetching machines:', error);
    }
  };

  const fetchTools = async () => {
    try {
      const response = await fetch('/api/tools');
      if (response.ok) {
        const data = await response.json();
        setTools(data);
      }
    } catch (error) {
      console.error('Error fetching tools:', error);
    }
  };

   const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const toggleAvailability = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/machines/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isAvailable: !currentStatus })
      });
      
      if (response.ok) {
        setMachines(prevMachines => 
          prevMachines.map(machine => 
            machine.id === id 
              ? { ...machine, isAvailable: !currentStatus }
              : machine
          )
        );
      }
    } catch (error) {
      console.error('Toggle error:', error);
    }
  };

  const deleteMachine = async (id: string) => {
    try {
      const response = await fetch(`/api/machines/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMachines(machines.filter((machine) => machine.id !== id));
      }
    } catch (error) {
      console.error('Error deleting machine:', error);
    }
  };

  const openModal = (machine: Machine | null = null) => {
    setEditingMachine(machine);
    if (machine) {
      setFormData({
        name: machine.Machine,
        image: machine.Image,
        description: machine.Desc,
        videoUrl: machine.Link,
      });
    } else {
      setFormData({});
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingMachine(null);
    setFormData({});
  };

  const openToolModal = (tool: Tool | null = null) => {
    setEditingTool(tool);
    if (tool) {
      setNewTool(tool.Tool);
      setToolQuantity(tool.Quantity);
    } else {
      setNewTool('');
      setToolQuantity(1);
    }
    setIsToolModalOpen(true);
    setIsAddingTool(true);  // Add this line
  };

  const closeToolModal = () => {
    setIsToolModalOpen(false);
    setEditingTool(null);
    setNewTool('');
    setToolQuantity(1);
  };

  const handleToolSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input
    if (!newTool.trim()) {
      alert('Please enter a tool name');
      return;
    }
  
    try {
      const toolData = {
        Tool: newTool.trim(),
        Quantity: toolQuantity
      };
  
      console.log('Sending tool data:', toolData);
  
      const response = await fetch('/api/tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toolData),
      });
  
      console.log('Response status:', response.status);
  
      const responseData = await response.json();
  
      if (!response.ok) {
        console.error('Error response:', responseData);
        alert(`Error: ${responseData.error || 'Failed to add tool'}`);
        return;
      }
  
      // Successfully added tool
      setTools([...tools, responseData]);
      closeToolModal();
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to add tool. Please try again.');
    }
  };

  const adjustQuantity = (amount: number) => {
    setToolQuantity(prev => Math.max(1, prev + amount));
  };

  const deleteTool = async (id: string) => {
    try {
      const response = await fetch(`/api/tools/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setTools(tools.filter((tool) => tool.id !== id));
      }
    } catch (error) {
      console.error('Error deleting tool:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const machineData = {
      name: formData.name,
      image: formData.image,
      description: formData.description,
      videoUrl: formData.videoUrl,
      isAvailable: formData.isAvailable ?? true,
    };

    try {
      let response;
      if (editingMachine) {
        response = await fetch(`/api/machines/${editingMachine.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(machineData),
        });
      } else {
        response = await fetch('/api/machines', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(machineData),
        });
      }

      if (response.ok) {
        const updatedMachine = await response.json();
        if (editingMachine) {
          setMachines(machines.map((m) => (m.id === updatedMachine.id ? updatedMachine : m)));
        } else {
          setMachines([...machines, updatedMachine]);
        }
        closeModal();
      }
    } catch (error) {
      console.error('Error submitting machine:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToolInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setToolFormData({
      ...toolFormData, 
      [name]: name === 'Quantity' ? parseInt(value) || 0 : value,
    });
  }; 

  const handleServiceSubmit = async (e: React.FormEvent) => {
    console.log('handleServiceSubmit called');
  console.log('isServiceModalOpen:', isServiceModalOpen);
  console.log('newServiceName:', newServiceName);
    e.preventDefault();
    
    if (!newServiceName.trim()) {
      alert('Please enter a service name');
      return;
    }
  
    try {
      const serviceData = {
        Service: newServiceName.trim()
      };
  
      const response = editingService 
        ? await fetch(`/api/services/${editingService.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(serviceData)
          })
        : await fetch('/api/services', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(serviceData)
          });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save service');
      }
  
      const savedService = await response.json();
  
      // Update services list
      if (editingService) {
        // If editing, replace the existing service
        setServices(services.map(service => 
          service.id === savedService.id ? savedService : service
        ));
      } else {
        // If adding new, append to the list
        setServices([...services, savedService]);
      }
  
      // Close the modal and reset state
      setIsServiceModalOpen(false);
      setNewServiceName('');
      setEditingService(null);
    } catch (error) {
      console.error('Service submission error:', error);
      alert(error instanceof Error ? error.message : 'Failed to add service');
    }
  };

  const deleteService = async (id: string) => {
    try {
      const response = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setServices(services.filter((service) => service.id !== id));
      }
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const openServiceModal = (service: Service | null = null) => {
    console.log('Opening service modal - Current state before:', {
      isServiceModalOpen,
      service,
      newServiceName: newServiceName
    });
  
    // Explicitly set the state
    setIsServiceModalOpen(true);
    setEditingService(service);
    setNewServiceName(service ? service.Service : '');
  
    console.log('Opening service modal - State after:', {
      isServiceModalOpen: true,
      service,
      newServiceName: service ? service.Service : ''
    });
  };

  return (
    <main className="min-h-screen bg-[#f1f1f8] pt-24">
      <Navbar />
      <div className="container mx-auto p-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Manage Services</h1>
          <div className="space-x-4">
            <button
              onClick={() => openModal()}
              className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center"
            >
              <Plus size={20} className="mr-2" /> Add New Machine
            </button>
          </div>
        </div>

        {/* Machines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {machines.map(machine => (
            <div key={machine.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{machine.Machine}</h2>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm ${machine.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                    {machine.isAvailable ? 'Available' : 'Unavailable'}
                  </span>
                  <Switch
                    checked={machine.isAvailable}
                    onCheckedChange={() => toggleAvailability(machine.id, machine.isAvailable)}
                    className="data-[state=checked]:bg-green-500"
                  />
                </div>
              </div>
              <img src={machine.Image} alt={machine.Machine} className="w-full h-48 object-cover rounded-md mb-4" />
              <p className="text-gray-600 mb-4">
                {machine.Desc.length > 100 ? `${machine.Desc.substring(0, 100)}...` : machine.Desc}
              </p>
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
      
      {/* Tools Section */}
      <div className="container mx-auto p-10 mt-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Manage Tools</h2>
            <button
              onClick={() => openToolModal()}
              className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center"
            >
              <Plus size={20} className="mr-2" /> Add New Tool
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map(tool => (
              <div key={tool.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">{tool.Tool}</h3>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Max Qty: {tool.Quantity}
                  </span>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    onClick={() => openToolModal(tool)}
                    className="bg-blue-500 text-white p-2 rounded-full"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => deleteTool(tool.id)}
                    className="bg-red-500 text-white p-2 rounded-full"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      {/* Services Section */}
      <div className="container mx-auto p-10 mt-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Manage Machines</h2>
          <button
  onClick={() => {
    console.log('Open service modal clicked');
    openServiceModal();
  }}
  className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center"
>
  <Plus size={20} className="mr-2" /> Add New Service
</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(service => (
            <div key={service.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">{service.Service}</h3>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => openServiceModal(service)}
                  className="bg-blue-500 text-white p-2 rounded-full"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => deleteService(service.id)}
                  className="bg-red-500 text-white p-2 rounded-full"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

        {/* Machine Modal */}
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

              <div className="flex justify-end space-x-2">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                >
                  {editingMachine ? 'Update' : 'Add'} Machine
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tool Modal */}
      {isToolModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Manage Tools</h2>
              <button onClick={() => setIsToolModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            {/* Tools List */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Available Tools</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tools.map(tool => (
                  <div key={tool.id} className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{tool.Tool}</h4>
                      <span className="text-sm text-gray-600">Quantity: {tool.Quantity}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingTool(tool);
                          setNewTool(tool.Tool);
                          setToolQuantity(tool.Quantity);
                          setIsAddingTool(true);
                        }}
                        className="bg-blue-500 text-white p-2 rounded-full"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => deleteTool(tool.id)}
                        className="bg-red-500 text-white p-2 rounded-full"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add/Edit Tool Form */}
            {isAddingTool && (
              <div className="border-t pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">{editingTool ? 'Edit' : 'Add'} Tool</h3>
                  <button 
                    onClick={() => setIsAddingTool(false)} 
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={20} />
                  </button>
                </div>
                <form onSubmit={handleToolSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="toolName" className="block text-sm font-medium text-gray-700">Tool Name</label>
                    <input
                      type="text"
                      id="toolName"
                      value={newTool}
                      onChange={(e) => setNewTool(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity Available</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <button
                        type="button"
                        onClick={() => adjustQuantity(-1)}
                        className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
                      >
                        <Minus size={16} />
                      </button>
                      <input
                        type="number"
                        id="quantity"
                        value={toolQuantity}
                        onChange={(e) => setToolQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="block w-20 text-center rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        min="1"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => adjustQuantity(1)}
                        className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <button
                      type="submit"
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                    >
                      {editingTool ? 'Update' : 'Add'} Tool
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingTool(false)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
      {isServiceModalOpen === true && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Add New Service</h2>
            <button 
              onClick={() => {
                console.log('Closing service modal');
                setIsServiceModalOpen(false);
              }} 
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          <form onSubmit={handleServiceSubmit}>
            <div className="mb-4">
              <label htmlFor="serviceName" className="block text-sm font-medium text-gray-700">Service Name</label>
              <input
                type="text"
                id="serviceName"
                value={newServiceName}
                onChange={(e) => {
                  console.log('Service name input changed:', e.target.value);
                  setNewServiceName(e.target.value);
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Add Service
              </button>
              <button
                type="button"
                onClick={() => {
                  console.log('Cancel button clicked');
                  setIsServiceModalOpen(false);
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
    </main>
  );
}