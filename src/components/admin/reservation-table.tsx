import React from 'react';
import { MoreVertical, Star } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Reservation {
  id: string;
  date: string;
  name: string;
  email: string;
  status: 'Pending' | 'Approved' | 'Completed' | 'Cancelled';
  role: 'MSME' | 'Student';
  service: string;
}

const ReservationManagement = () => {
  // Sample data
  const reservations: Reservation[] = [
    {
      id: '1',
      date: '2024-12-02',
      name: 'Sir Rolex Padilla',
      email: 'havemercyonus@pls.com',
      status: 'Approved',
      role: 'MSME',
      service: 'Laser Cutting	'
    },
    {
      id: '2',
      date: '2024-12-03',
      name: 'Leila Sabando',
      email: 'havemercyonus@pls.com',
      status: 'Pending',
      role: 'Student',
      service: 'Heat Press	'
    },
    {
      id: '3',
      date: '2024-12-04',
      name: 'Jezrel Sano',
      email: 'havemercyonus@pls.com',
      status: 'Completed',
      role: 'MSME',
      service: 'Tarpaulin Printing'
    }
  ];

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

  const handleReview = (reservationId: string) => {
    console.log('Review reservation:', reservationId);
  };

  const ReservationTable = ({ reservations }: { reservations: Reservation[] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Service</TableHead>
          <TableHead className="w-24">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reservations.map((reservation) => (
          <TableRow key={reservation.id}>
            <TableCell className="font-medium">
              {formatDate(reservation.date)}
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <span className="font-medium">{reservation.name}</span>
                <span className="text-sm text-gray-500">{reservation.email}</span>
              </div>
            </TableCell>
            <TableCell>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(reservation.status)}`}>
                {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
              </span>
            </TableCell>
            <TableCell className="uppercase text-xs font-medium">
              {reservation.role}
            </TableCell>
            <TableCell>{reservation.service}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger className="p-2 hover:bg-gray-100 rounded-full">
                  <MoreVertical className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleReview(reservation.id)}>
                    Review
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleReview(reservation.id)}>
                    Generate PDF
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mt-4">
      <p className="text-xl font-semibold pb-2">Recent Orders</p>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="msme">MSME</TabsTrigger>
          <TabsTrigger value="student">Student</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <ReservationTable reservations={reservations} />
        </TabsContent>
        <TabsContent value="msme">
          <ReservationTable reservations={reservations.filter(res => res.role === 'MSME')} />
        </TabsContent>
        <TabsContent value="student">
          <ReservationTable reservations={reservations.filter(res => res.role === 'Student')} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReservationManagement;