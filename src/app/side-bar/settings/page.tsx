import { useState } from 'react';

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'settings':
        return <Settings />;
      // Other cases for "orders", "information", "forms", etc.
      default:
        return <DashboardHome />;
    }
  };

  return (
    <main className="min-h-screen bg-[#f1f1f8] flex">
      {/* Navbar */}
      <nav className="bg-[#0d4a8d] p-4 fixed w-full top-0 z-10 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src="/images" alt="DOST Logo" className="w-10 h-10" />
          <img src="SSF-logo.png" alt="SSF Logo" className="w-10 h-10" />
          <a href="/.." className="text-white text-lg">RESOLAB</a>
        </div>

        <div className="flex space-x-10 absolute left-1/2 transform -translate-x-1/2">
          <a href="/dashboard" className="text-white px-4 py-2 rounded hover:bg-[#5394cf] transition duration-300">Dashboard</a>
          <a href="/services" className="text-white px-4 py-2 rounded hover:bg-[#5394cf] transition duration-300">Services</a>
          <a href="/contact" className="text-white px-4 py-2 rounded hover:bg-[#5394cf] transition duration-300">Contact</a>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notification Icon */}
          <div className="relative group">
            <button className="text-white relative px-4 py-2 rounded hover:bg-blue-500 transition duration-300 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 01-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">3</span>
            </button>
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg hidden group-hover:block">
              <div className="p-4">
                <h4 className="font-bold text-gray-800 mb-2">Notifications</h4>
                <ul>
                  <li className="border-b border-gray-200 py-2">Order #1234 has been shipped.</li>
                  <li className="border-b border-gray-200 py-2">New message from Admin.</li>
                  <li className="border-b border-gray-200 py-2">Upcoming event: Webinar on Digital Fabrication.</li>
                </ul>
              </div>
            </div>
          </div>
          
          <img src="path/to/profile-picture.jpg" alt="Profile" className="w-10 h-10 rounded-full" />
        </div>
      </nav>

      {/* Sidebar */}
      <aside className="bg-[#0d4a8d] w-64 h-full fixed top-0 left-0 pt-24">
        <div className="flex flex-col items-center py-8">
          <img src="path/to/profile-picture.jpg" alt="Profile" className="w-24 h-24 rounded-full mb-4" />
          <h2 className="text-white text-xl font-bold">Admin Name</h2>
          <p className="text-[#5394cf]">Admin Role</p>
        </div>
        <nav className="mt-10">
          <ul className="space-y-4">
            <li>
              <button 
                onClick={() => setCurrentPage('settings')} 
                className="text-white px-4 py-2 flex items-center hover:bg-[#145da0] rounded transition duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a2 2 0 100 4 2 2 0 000-4zM10 6a2 2 0 110 4 2 2 0 010-4zm0 4a2 2 0 100 4 2 2 0 000-4zM10 12a2 2 0 110 4 2 2 0 010-4zm0 4a2 2 0 100 4 2 2 0 000-4zM10 16a2 2 0 110 4 2 2 0 010-4zM10 2a2 2 0 100 4 2 2 0 000-4zM10 6a2 2 0 110 4 2 2 0 010-4zm0 4a2 2 0 100 4 2 2 0 000-4zM10 10a2 2 0 110 4 2 2 0 010-4zM10 14a2 2 0 100 4 2 2 0 000-4zM10 18a2 2 0 100 4 2 2 0 000-4zM10 14a2 2 0 110 4 2 2 0 010-4zM10 18a2 2 0 100 4 2 2 0 000-4zM10 14a2 2 0 100 4 2 2 0 000-4zM10 18a2 2 0 100 4 2 2 0 000-4zM10 14a2 2 0 100 4 2 2 0 000-4zM10 18a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
                Settings
              </button>
            </li>
            <li>
              <button 
                onClick={() => setCurrentPage('orders')} 
                className="text-white px-4 py-2 flex items-center hover:bg-[#145da0] rounded transition duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 8.5a3 3 0 013-3h10a3 3 0 013 3v7a3 3 0 01-3 3H5a3 3 0 01-3-3v-7zm3-1a1 1 0 00-1 1v7a1 1 0 001 1h10a1 1 0 001-1v-7a1 1 0 00-1-1H5z" />
                </svg>
                Orders
              </button>
            </li>
            <li>
              <button 
                onClick={() => setCurrentPage('information')} 
                className="text-white px-4 py-2 flex items-center hover:bg-[#145da0] rounded transition duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 8.5a3 3 0 013-3h10a3 3 0 013 3v7a3 3 0 01-3 3H5a3 3 0 01-3-3v-7zm3-1a1 1 0 00-1 1v7a1 1 0 001 1h10a1 1 0 001-1v-7a1 1 0 00-1-1H5z" />
                </svg>
                Information
              </button>
            </li>
            <li>
              <button 
                onClick={() => setCurrentPage('forms')} 
                className="text-white px-4 py-2 flex items-center hover:bg-[#145da0] rounded transition duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 5a1 1 0 011-1h12a1 1 0 011 1v11a1 1 0 01-1 1H4a1 1 0 01-1-1V5z" />
                </svg>
                Forms
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <section className="flex-1 ml-64 pt-24 p-8">
        {renderPage()}
      </section>
    </main>
  );
}

function DashboardHome() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Home</h1>
      <p>Welcome to your dashboard. Use the sidebar to navigate to different sections.</p>
    </div>
  );
}

function Settings() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Settings</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter your password"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-[#145da0] text-white px-4 py-2 rounded hover:bg-[#5394cf] transition duration-300"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
