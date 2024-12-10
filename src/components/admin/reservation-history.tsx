import React, { useState } from 'react';
import { Calendar, MoreHorizontal as MoreHorizontalIcon } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Reservation = {
  id: string;
  date: string;
  name: string;
  email: string;
  status: 'Pending' | 'Approved' | 'Completed' | 'Cancelled';
  role: string;
  service: string;
};

const ReservationHistory = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedDate, setSelectedDate] = useState('all');
  const [isCustomSelectOpen, setIsCustomSelectOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());

  // Generate array of years (current year -10 to +10 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);
  
  // Array of months
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Mock data
  const reservations: Reservation[] = [
    {
      id: '1',
      date: '2024-12-01',
      name: 'John Doe',
      email: 'john@example.com',
      status: 'Completed',
      role: 'MSME',
      service: 'Laser Cutter'
    },
    {
      id: '2',
      date: '2024-12-02',
      name: 'Jane Smith',
      email: 'jane@example.com',
      status: 'Pending',
      role: 'Student',
      service: '3D Print'
    }
  ];

  const handleDateSelect = (year: number, month: number) => {
    setSelectedYear(year);
    setSelectedMonth(month);
    setSelectedDate(`${year}-${String(month + 1).padStart(2, '0')}`);
    setIsCustomSelectOpen(false);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      Pending: 'bg-yellow-100 text-yellow-800',
      Approved: 'bg-blue-100 text-blue-800',
      Completed: 'bg-green-100 text-green-800',
      Cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Filter reservations
  const filteredReservations = reservations.filter(reservation => {
    const matchesTab = activeTab === 'all' || reservation.role.toLowerCase() === activeTab.toLowerCase();
    
    if (selectedDate === 'all') {
      return matchesTab;
    }
    
    const reservationDate = new Date(reservation.date);
    const [filterYear, filterMonth] = selectedDate.split('-').map(Number);
    
    return matchesTab && 
           reservationDate.getFullYear() === filterYear &&
           reservationDate.getMonth() === filterMonth - 1;
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <Tabs defaultValue="all" className="w-[400px]" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="msme">MSME</TabsTrigger>
            <TabsTrigger value="student">Student</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="relative">
          <Button
            variant="outline"
            className="w-[240px] justify-start text-left font-normal"
            onClick={() => setIsCustomSelectOpen(!isCustomSelectOpen)}
          >
            <Calendar className="mr-2 h-4 w-4" />
            {selectedDate === 'all' 
              ? 'All Dates'
              : `${months[selectedMonth]} ${selectedYear}`
            }
          </Button>

          {isCustomSelectOpen && (
            <div className="absolute top-full mt-2 right-0 w-[280px] rounded-md border bg-white shadow-lg z-50">
              <div className="p-2">
                <button
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md mb-2"
                  onClick={() => {
                    setSelectedDate('all');
                    setIsCustomSelectOpen(false);
                  }}
                >
                  All Dates
                </button>
                
                <div className="flex gap-2">
                  <div className="w-1/2 border-r">
                    <div className="font-medium px-3 py-1">Year</div>
                    <div className="max-h-48 overflow-y-auto">
                      {years.map(year => (
                        <button
                          key={year}
                          className={cn(
                            "w-full text-left px-3 py-1 hover:bg-gray-100",
                            selectedYear === year && "bg-gray-100 font-medium"
                          )}
                          onClick={() => setSelectedYear(year)}
                        >
                          {year}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="w-1/2">
                    <div className="font-medium px-3 py-1">Month</div>
                    <div className="max-h-48 overflow-y-auto">
                      {months.map((month, index) => (
                        <button
                          key={month}
                          className={cn(
                            "w-full text-left px-3 py-1 hover:bg-gray-100",
                            selectedMonth === index && "bg-gray-100 font-medium"
                          )}
                          onClick={() => handleDateSelect(selectedYear, index)}
                        >
                          {month}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredReservations.map((reservation) => (
            <TableRow key={reservation.id}>
              <TableCell className="font-medium">{formatDate(reservation.date)}</TableCell>
              <TableCell>
                <div>{reservation.name}</div>
                <div className="text-sm text-gray-500">{reservation.email}</div>
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(reservation.status)}`}>
                  {reservation.status}
                </span>
              </TableCell>
              <TableCell>{reservation.role}</TableCell>
              <TableCell>{reservation.service}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontalIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Review</DropdownMenuItem>
                      <DropdownMenuItem>Generate PDF</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReservationHistory;