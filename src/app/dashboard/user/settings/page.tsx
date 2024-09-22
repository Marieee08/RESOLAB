"use client";

import React, { useState } from 'react';
import Link from "next/link";
import Navbar from '@/components/custom/navbar';

const SettingsContent = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');

  return (
    <div className="bg-white shadow-md rounded-lg p-6 ml-64 mt-24 w-3/4">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Preferences</h3>
        
        <div className="flex items-center justify-between mb-4">
          <span>Enable Notifications</span>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={notifications} 
              onChange={() => setNotifications(!notifications)}
            />
            <span className="slider round"></span>
          </label>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <span>Dark Mode</span>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={darkMode} 
              onChange={() => setDarkMode(!darkMode)}
            />
            <span className="slider round"></span>
          </label>
        </div>
        
        <div className="flex items-center justify-between">
          <span>Language</span>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="border rounded p-2"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select>
        </div>
      </div>
      
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
        Save Changes
      </button>
    </div>
  );
};

export default function Settings() {
  return (
    <main className="min-h-screen bg-[#f1f1f8] flex">
        
      <Navbar />

      <aside className="bg-[#112235] w-64 h-full fixed top-0 left-0 pt-24">
        <div className="flex flex-col items-center py-8">
          <img src="path/to/profile-picture.jpg" alt="Profile" className="w-24 h-24 rounded-full mb-4" />
          <h2 className="text-white text-xl font-bold">Username</h2>
          <p className="text-[#5394cf]">Role</p>
        </div>
        <nav className="mt-10">
          <ul className="space-y-4">

             <li>
              <a href="/dashboard" className="text-white px-4 py-2 flex items-center hover:bg-[#145da0] rounded transition duration-300">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 8.5a3 3 0 013-3h10a3 3 0 013 3v7a3 3 0 01-3 3H5a3 3 0 01-3-3v-7zm3-1a1 1 0 00-1 1v7a1 1 0 001 1h10a1 1 0 001-1v-7a1 1 0 00-1-1H5z" />
                </svg>
                Orders
              </a>
            </li>
            
            <li>
              <Link href="/dashboard/settings" className="text-white px-4 py-2 flex items-center bg-[#145da0] rounded transition duration-300">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a2 2 0 100 4 2 2 0 000-4zM10 6a2 2 0 110 4 2 2 0 010-4zm0 4a2 2 0 100 4 2 2 0 000-4zM10 12a2 2 0 110 4 2 2 0 010-4zm0 4a2 2 0 100 4 2 2 0 000-4zM10 16a2 2 0 110 4 2 2 0 010-4zM10 2a2 2 0 100 4 2 2 0 000-4zM10 6a2 2 0 110 4 2 2 0 010-4zM10 10a2 2 0 110 4 2 2 0 010-4zM10 14a2 2 0 100 4 2 2 0 000-4zM10 18a2 2 0 100 4 2 2 0 000-4zM10 10a2 2 0 100 4 2 2 0 000-4zM10 14a2 2 0 100 4 2 2 0 000-4zM10 18a2 2 0 100 4 2 2 0 000-4zM10 10a2 2 0 100 4 2 2 0 000-4zM10 14a2 2 0 100 4 2 2 0 000-4zM10 18a2 2 0 100 4 2 2 0 000-4zM10 14a2 2 0 100 4 2 2 0 000-4zM10 18a2 2 0 100 4 2 2 0 000-4zM10 14a2 2 0 100 4 2 2 0 000-4zM10 18a2 2 0 100 4 2 2 0 000-4zM10 14a2 2 0 100 4 2 2 0 000-4zM10 18a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
                Settings
              </Link>
            </li>

            <li>
              <Link href="/dashboard/information" className="text-white px-4 py-2 flex items-center hover:bg-[#145da0] rounded transition duration-300">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 8.5a3 3 0 013-3h10a3 3 0 013 3v7a3 3 0 01-3 3H5a3 3 0 01-3-3v-7zm3-1a1 1 0 00-1 1v7a1 1 0 001 1h10a1 1 0 001-1v-7a1 1 0 00-1-1H5z" />
                </svg>
                Information
              </Link>
            </li>
            <li>
              <Link href="/logout" className="text-white px-4 py-2 flex items-center hover:bg-[#145da0] rounded transition duration-300">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 8.5a3 3 0 013-3h10a3 3 0 013 3v7a3 3 0 01-3 3H5a3 3 0 01-3-3v-7zm3-1a1 1 0 00-1 1v7a1 1 0 001 1h10a1 1 0 001-1v-7a1 1 0 00-1-1H5z" />
              </svg>
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <SettingsContent />
    </main>
  );
}