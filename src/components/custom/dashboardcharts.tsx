"use client";
import React, { useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

type TimePeriod = 'week' | 'month' | 'year';

const DashboardCharts: React.FC = () => {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('month');

  // Dummy data for users over time
  const usersData: Record<TimePeriod, number[]> = {
    week: [50, 70, 60, 80, 95],
    month: [200, 300, 250, 320, 400],
    year: [2400, 2700, 2600, 3200, 3800]
  };

  // Toggle Data based on time period selection
  const toggleUsersData = {
    labels: timePeriod === 'week' ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] :
            timePeriod === 'month' ? ['Jan', 'Feb', 'Mar', 'Apr', 'May'] :
            ['2020', '2021', '2022', '2023', '2024'],
    datasets: [{
      label: 'Number of Users',
      data: usersData[timePeriod],
      backgroundColor: '#5e86ca',
      borderColor: '#1c2a52',
      borderWidth: 1
    }]
  };

  // Most Used Machines Data (Bar Chart)
  const machinesData = {
    labels: ['Laser Cutter', '3D Printer', 'CNC Machine', 'Vinyl Cutter'],
    datasets: [{
      label: 'Usage Count',
      data: [50, 70, 30, 40],
      backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0']
    }]
  };

  // Website Visitors Data (Line Chart)
  const visitorsData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [{
      label: 'Website Visitors',
      data: [300, 400, 350, 500, 600],
      borderColor: '#ff6384',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      fill: true
    }]
  };

  // Types of Clients (Pie Chart)
  const clientTypesData = {
    labels: ['Student', 'MSME', 'External', 'Internal'],
    datasets: [{
      label: 'Types of Clients',
      data: [50, 30, 15, 5],
      backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0']
    }]
  };

  // User Satisfaction Survey (Bar Chart)
  const satisfactionData = {
    labels: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'],
    datasets: [{
      label: 'User Satisfaction Survey',
      data: [60, 30, 5, 3, 2],
      backgroundColor: ['#4caf50', '#8bc34a', '#ffeb3b', '#ff9800', '#f44336']
    }]
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Users over Time */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Number of Users</h2>
        <div className="flex justify-around mb-4">
          <button onClick={() => setTimePeriod('week')} className={`px-4 py-2 ${timePeriod === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Weekly</button>
          <button onClick={() => setTimePeriod('month')} className={`px-4 py-2 ${timePeriod === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Monthly</button>
          <button onClick={() => setTimePeriod('year')} className={`px-4 py-2 ${timePeriod === 'year' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Yearly</button>
        </div>
        <Bar data={toggleUsersData} />
      </div>

      {/* Most Used Machines */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Most Used Machines</h2>
        <Bar data={machinesData} />
      </div>

      {/* Website Visitors */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Website Visitors</h2>
        <Line data={visitorsData} />
      </div>

      {/* Types of Clients */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Types of Clients</h2>
        <Pie data={clientTypesData} />
      </div>

      {/* User Satisfaction Survey */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">User Satisfaction Survey</h2>
        <Bar data={satisfactionData} />
      </div>
    </div>
  );
};

export default DashboardCharts;