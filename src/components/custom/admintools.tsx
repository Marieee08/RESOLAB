"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Minus } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import Navbar from '@/components/custom/navbar';

interface Tool {
    id: string;
    Tool: string;
    Quantity: number;
  }

export default function AdminServices() {
    const [tools, setTools] = useState<Tool[]>([]);
    const [isToolModalOpen, setIsToolModalOpen] = useState(false);
    const [isAddingTool, setIsAddingTool] = useState(false);
    const [editingTool, setEditingTool] = useState<Tool | null>(null);
    const [newTool, setNewTool] = useState('');
    const [toolQuantity, setToolQuantity] = useState(1);

    useEffect(() => {
        fetchTools();
      }, []);

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

      const handleToolInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setToolFormData({
          ...toolFormData, 
          [name]: name === 'Quantity' ? parseInt(value) || 0 : value,
        });
      }; 

    return (
        <main className="min-h-screen">
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
        </main>
    );
}

