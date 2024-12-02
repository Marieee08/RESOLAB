import React, { useState } from 'react';
import { MoreVertical, Edit, Trash2, Mail } from 'lucide-react';
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

interface User {
  id: string;
  name: string;
  email: string;
  permissions: string[];
  type: 'all' | 'msme' | 'student' | 'admin' | 'cashier';
}

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState('all');

  // Sample data
  const users: User[] = [
    {
      id: '1',
      name: 'Jesse Estoque',
      email: 'jesse@example.com',
      permissions: ['Student', 'User'],
      type: 'msme',
    },
    {
      id: '2',
      name: 'Rolex Padilla',
      email: 'rolex@example.com',
      permissions: ['Student'],
      type: 'student',
    },
    {
      id: '3',
      name: 'Cyrille Tapales',
      email: 'admin@example.com',
      permissions: ['User', 'Student', 'Admin'],
      type: 'admin',
    },
    {
      id: '4',
      name: 'Gimmemymoney',
      email: 'cashier@example.com',
      permissions: ['Student', 'Cashier'],
      type: 'cashier',
    },
  ];

  const getPermissionColor = (permission: string) => {
    const colors = {
      Student: 'bg-blue-100 text-blue-800',
      User: 'bg-green-100 text-green-800',
      Admin: 'bg-purple-100 text-purple-800',
      Cashier: 'bg-yellow-100 text-yellow-800'
    };
    return colors[permission as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const handleEditPermissions = (userId: string) => {
    console.log('Edit permissions for user:', userId);
  };

  const handleDeleteAccount = (userId: string) => {
    console.log('Delete account:', userId);
  };

  const handleContact = (userId: string) => {
    console.log('Contact user:', userId);
  };

  const UserTable = ({ users }: { users: User[] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Permissions</TableHead>
          <TableHead className="w-24">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <div className="flex gap-2 flex-wrap">
                {user.permissions.map((permission, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getPermissionColor(permission)}`}
                  >
                    {permission}
                  </span>
                ))}
              </div>
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger className="p-2 hover:bg-gray-100 rounded-full">
                  <MoreVertical className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleEditPermissions(user.id)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Permissions
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDeleteAccount(user.id)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Account
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleContact(user.id)}>
                    <Mail className="mr-2 h-4 w-4" />
                    Contact
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
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="msme">MSME</TabsTrigger>
          <TabsTrigger value="student">Student</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
          <TabsTrigger value="cashier">Cashier</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <UserTable users={users} />
        </TabsContent>
        <TabsContent value="msme">
          <UserTable users={users.filter(user => user.type === 'msme')} />
        </TabsContent>
        <TabsContent value="student">
          <UserTable users={users.filter(user => user.type === 'student')} />
        </TabsContent>
        <TabsContent value="admin">
          <UserTable users={users.filter(user => user.type === 'admin')} />
        </TabsContent>
        <TabsContent value="cashier">
          <UserTable users={users.filter(user => user.type === 'cashier')} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserManagement;