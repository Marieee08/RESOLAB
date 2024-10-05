'use client';

import Link from "next/link";
import Navbar from '@/components/custom/navbar';
import DynamicSidebar from '@/components/custom/DynamicSidebar';


export default function Dashboard() {
  return (

    <main className="min-h-screen bg-[#f1f1f8] pt-24 flex">
      
    <Navbar />
    <DynamicSidebar  
    username="John Doe"
    role="User"
    profilePicture="/path/to/profile-picture.jpg"
    activePath="/dashboard/user"
    />
  

      <section className="flex-1 ml-64 p-8">
        <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Pending</h2>
          <p className="text-gray-700">You have no pending orders.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">History</h2>
          <p className="text-gray-700">You have no past orders.</p>
        </div>

      </section>
    </main>
  );
}