"use client";

import React, { useState } from 'react';
import Link from "next/link";
import Navbar from '@/components/custom/navbar';
import DynamicSidebar from '@/components/custom/DynamicSidebar';


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

      <DynamicSidebar  
      username="John Doe"
      role="User"
      profilePicture="/path/to/profile-picture.jpg"
      activePath="/dashboard/user/settings"
      />

      <SettingsContent />
    </main>
  );
}