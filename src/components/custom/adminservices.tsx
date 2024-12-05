"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';

interface Service {
    id: string;
    Service: string;
}

export default function AdminServices() {
    const [services, setServices] = useState<Service[]>([]);
    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
    const [newServiceName, setNewServiceName] = useState('');
    const [editingService, setEditingService] = useState<Service | null>(null);

    useEffect(() => {
        fetchServices();
    }, []);

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
        <main className="min-h-screen">
            <div className="container mx-auto p-10 mt-16">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Manage Services</h2>
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

            {isServiceModalOpen && (
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