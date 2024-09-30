// src/app/dashboard/admin/page.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch users or other admin-specific data
    const fetchUsers = async () => {
      const response = await fetch('/api/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Add admin-specific widgets or components here */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold mb-2">User Management</h2>
          <p>Total Users: {users.length}</p>
          {/* Add more user management functionality */}
        </div>
        {/* Add more admin widgets */}
      </div>
    </div>
  );
}