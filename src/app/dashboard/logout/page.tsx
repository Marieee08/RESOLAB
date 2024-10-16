"use client";

import { useState } from 'react';

export default function Dashboard() {
  const [formData, setFormData] = useState({ name: '', email: '', contactNum: '' });
  const [searchId, setSearchId] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to register user");

      const result = await response.json();
      alert(`User ${result.name} registered successfully!`);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/auth/search?id=${searchId}`);

      if (!response.ok) throw new Error("User not found");

      const result = await response.json();
      setUser(result);
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setUser(null);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Registration</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border px-2 py-1 mb-2 w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="border px-2 py-1 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Contact Number"
          value={formData.contactNum}
          onChange={(e) => setFormData({ ...formData, contactNum: e.target.value })}
          className="border px-2 py-1 mb-2 w-full"
        />
        <button onClick={handleRegister} className="bg-blue-500 text-white px-4 py-2">
          Register
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4">Search User by ID</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="User ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="border px-2 py-1 mb-2 w-full"
        />
        <button onClick={handleSearch} className="bg-green-500 text-white px-4 py-2">
          Search
        </button>
      </div>

      {user && (
        <div className="mt-4 p-4 border">
          <h3 className="text-xl font-bold">User Details</h3>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Contact Number: {user.contactNum}</p>
        </div>
      )}

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
}
