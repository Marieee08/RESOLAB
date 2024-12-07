"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Minus } from 'lucide-react';

interface Tool {
    id: string;
    Tool: string;
    Quantity: number;
}

export default function AdminServices() {
    const [tools, setTools] = useState<Tool[]>([]);
    const [editingTool, setEditingTool] = useState<Tool | null>(null);
    const [isAddingTool, setIsAddingTool] = useState(false);
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

            let response;
            let responseData;

            if (editingTool) {
                // If editing an existing tool, send a PUT request
                response = await fetch(`/api/tools/${editingTool.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(toolData),
                });
            } else {
                // If adding a new tool, send a POST request
                response = await fetch('/api/tools', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(toolData),
                });
            }

            responseData = await response.json();

            if (!response.ok) {
                alert(`Error: ${responseData.error || 'Failed to save tool'}`);
                return;
            }

            // Successfully added or updated tool
            if (editingTool) {
                // Update the existing tool in the tools array
                setTools(tools.map(tool => 
                    tool.id === editingTool.id ? responseData : tool
                ));
            } else {
                // Add new tool to the tools array
                setTools([...tools, responseData]);
            }

            // Reset form
            setNewTool('');
            setToolQuantity(1);
            setEditingTool(null);
            setIsAddingTool(false);
        } catch (error) {
            console.error('Submission error:', error);
            alert('Failed to save tool. Please try again.');
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

    const cancelAdding = () => {
        setIsAddingTool(false);
        setEditingTool(null);
        setNewTool('');
        setToolQuantity(1);
    };

    return (
        <main className="min-h-screen">
            <div className="container mx-auto p-10 mt-16">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Manage Tools</h2>
                    {!isAddingTool && (
                        <button
                            onClick={() => {
                                setIsAddingTool(true);
                                setEditingTool(null);
                            }}
                            className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center"
                        >
                            <Plus size={20} className="mr-2" /> Add New Tool
                        </button>
                    )}
                </div>

                {/* Add/Edit Tool Form */}
                {isAddingTool && (
                    <form onSubmit={handleToolSubmit} className="bg-white shadow-md rounded-lg p-6 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="toolName" className="block text-sm font-medium text-gray-700">
                                    Tool Name
                                </label>
                                <input
                                    type="text"
                                    id="toolName"
                                    value={newTool}
                                    onChange={(e) => setNewTool(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    placeholder="Enter tool name"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                                    Quantity Available
                                </label>
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

                            <div className="flex items-end space-x-2">
                                <button
                                    type="submit"
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                                >
                                    {editingTool ? 'Update Tool' : 'Add Tool'}
                                </button>
                                <button
                                    type="button"
                                    onClick={cancelAdding}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                )}

                {/* Tools List */}
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
                                    onClick={() => {
                                        setEditingTool(tool);
                                        setNewTool(tool.Tool);
                                        setToolQuantity(tool.Quantity);
                                        setIsAddingTool(true);
                                    }}
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
        </main>
    );
}