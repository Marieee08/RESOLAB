"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Minus } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import Navbar from '@/components/custom/navbar';

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

        </main>
    );
}