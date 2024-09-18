'use client'; // Add this at the very top of the file

import { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  email: string;
  name: string;
  contactNum: string;
}

interface SearchResult {
  id: number;
  email: string;
  name?: string;
  contactNum?: string;
}

export default function Register() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    contactNum: '',
  });

  const [searchId, setSearchId] = useState<number | null>(null);
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();

    if (searchId === null) return;

    const res = await fetch(`/api/search?id=${searchId}`);

    if (res.ok) {
      const data = await res.json();
      setSearchResult(data);
      setError(null);
    } else {
      const error = await res.json();
      setSearchResult(null);
      setError(error.error || 'Failed to fetch data');
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
            name="contactNum"
            value={formData.contactNum}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
      <br></br><br></br>
      <h2>Search by ID</h2>
      <form onSubmit={handleSearch}>
        <label>
          ID:
          <input
            type="number"
            value={searchId ?? ''}
            onChange={(e) => setSearchId(Number(e.target.value))}
            required
          />
        </label>
        <br />
        <button type="submit">Search</button>
      </form>
      <br></br>

      {searchResult && (
        <div>
          <h3>Search Results:</h3>
          <p><strong>ID:</strong> {searchResult.id}</p>
          <p><strong>Email:</strong> {searchResult.email}</p>
          <p><strong>Name:</strong> {searchResult.name}</p>
          <p><strong>Contact Number:</strong> {searchResult.contactNum}</p>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
