'use client'; // Add this at the very top of the file

import { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  email: string;
  name: string;
  contactNum: string; // Update field name
}

export default function Register() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    contactNum: '', // Update field name
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      console.log('Account created successfully!');
    } else {
      console.error('Failed to create account');
      const error = await res.json();
      console.error('Error details:', error);
    }
  };

  return (
    <div>
      <h1>Create an Account</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Contact Number:
          <input
            type="tel"
            name="contactNum" // Update field name
            value={formData.contactNum} // Update field name
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
