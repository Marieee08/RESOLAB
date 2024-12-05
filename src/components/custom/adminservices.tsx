"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';

interface Service {
    id: string;
    Service: string;
    Equipment?: string | null;
    Costs?: number | null;
}

interface Machine {
    id: string;
    Machine: string;
}

export default function AdminServices() {
    const [services, setServices] = useState<Service[]>([]);
    const [machines, setMachines] = useState<Machine[]>([]);
    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
    const [newServiceName, setNewServiceName] = useState('');
    const [selectedMachine, setSelectedMachine] = useState('');
    const [serviceCosts, setServiceCosts] = useState('');
    const [editingService, setEditingService] = useState<Service | null>(null);

    useEffect(() => {
        fetchServices();
        fetchMachines();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await fetch('/api/services');
            if (response.ok) {
                const data = await response.json();
                // Convert Costs to number if it's a string or Decimal
                const processedServices = data.map((service: Service) => ({
                    ...service,
                    Costs: service.Costs !== null && service.Costs !== undefined 
                        ? Number(service.Costs) 
                        : null
                }));
                setServices(processedServices);
            }
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

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

    const handleServiceSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!newServiceName.trim()) {
            alert('Please enter a service name');
            return;
        }
    
        try {
            const serviceData = {
                Service: newServiceName.trim(),
                // Change this to match the Prisma schema
                machineId: selectedMachine || null, // Use machineId instead of Equipment
                Costs: serviceCosts ? parseFloat(serviceCosts) : null
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
                    service.id === savedService.id 
                        ? { ...savedService, Costs: savedService.Costs ? Number(savedService.Costs) : null }
                        : service
                ));
            } else {
                // If adding new, append to the list
                setServices([
                    ...services, 
                    { ...savedService, Costs: savedService.Costs ? Number(savedService.Costs) : null }
                ]);
            }
    
            // Close the modal and reset state
            setIsServiceModalOpen(false);
            setNewServiceName('');
            setSelectedMachine('');
            setServiceCosts('');
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
        setIsServiceModalOpen(true);
        setEditingService(service);
        setNewServiceName(service ? service.Service : '');
        setSelectedMachine(service?.Equipment || '');
        setServiceCosts(service?.Costs ? service.Costs.toString() : '');
    };

    // Helper function to get machine name by ID
    const getMachineName = (machineId: string) => {
        const machine = machines.find(m => m.id === machineId);
        return machine ? machine.Machine : 'No Equipment';
    };

    return (
        <main className="min-h-screen">
            <div className="container mx-auto p-10 mt-16">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Manage Services</h2>
                    <button
                        onClick={() => openServiceModal()}
                        className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center"
                    >
                        <Plus size={20} className="mr-2" /> Add New Service
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map(service => (
                        <div key={service.id} className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex flex-col mb-4">
                                <h3 className="text-xl font-semibold">{service.Service}</h3>
                                {service.machineId && (
                                    <span className="text-sm text-gray-500 mt-2">
                                        Equipment: {getMachineName(service.machineId)}
                                    </span>
                                )}
                                {service.Costs !== null && service.Costs !== undefined && (
                                    <span className="text-sm text-gray-500 mt-1">
                                        Cost: PHP {Number(service.Costs).toFixed(2)}/hour
                                    </span>
                                )}
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

            {/* Rest of the component remains the same */}
            {isServiceModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">
                                {editingService ? 'Edit Service' : 'Add New Service'}
                            </h2>
                            <button 
                                onClick={() => {
                                    setIsServiceModalOpen(false);
                                    setEditingService(null);
                                }} 
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleServiceSubmit}>
                            {/* Form fields remain the same */}
                            <div className="mb-4">
                                <label htmlFor="serviceName" className="block text-sm font-medium text-gray-700">
                                    Service Name
                                </label>
                                <input
                                    type="text"
                                    id="serviceName"
                                    value={newServiceName}
                                    onChange={(e) => setNewServiceName(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="machineSelect" className="block text-sm font-medium text-gray-700">
                                    Select Equipment
                                </label>
                                <select
                                    id="machineSelect"
                                    value={selectedMachine}
                                    onChange={(e) => setSelectedMachine(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                >
                                    <option value="">No Equipment Selected</option>
                                    {machines.map((machine) => (
                                        <option key={machine.id} value={machine.id}>
                                            {machine.Machine}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="serviceCosts" className="block text-sm font-medium text-gray-700">
                                    Service Costs
                                </label>
                                <input
                                    type="number"
                                    id="serviceCosts"
                                    value={serviceCosts}
                                    onChange={(e) => setServiceCosts(e.target.value)}
                                    step="0.01"
                                    min="0"
                                    placeholder="Enter service cost"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>

                            <div className="flex justify-end space-x-2">
                                <button
                                    type="submit"
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                                >
                                    {editingService ? 'Update Service' : 'Add Service'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsServiceModalOpen(false);
                                        setEditingService(null);
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