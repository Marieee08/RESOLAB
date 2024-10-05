import React from 'react';
import Link from 'next/link';

interface SidebarProps {
  username: string;
  role: string;
  profilePicture: string;
  activePath: string;
}

const Sidebar: React.FC<SidebarProps> = ({ username, role, profilePicture, activePath }) => {
  const isActive = (path: string) => activePath === path;

  const navItems = [
    { name: 'Orders', path: '/dashboard/user', icon: 'M2 8.5a3 3 0 013-3h10a3 3 0 013 3v7a3 3 0 01-3 3H5a3 3 0 01-3-3v-7zm3-1a1 1 0 00-1 1v7a1 1 0 001 1h10a1 1 0 001-1v-7a1 1 0 00-1-1H5z' },
    { name: 'Settings', path: '/dashboard/user/settings', icon: 'M10 2a2 2 0 100 4 2 2 0 000-4zM10 6a2 2 0 110 4 2 2 0 010-4zm0 4a2 2 0 100 4 2 2 0 000-4zM10 12a2 2 0 110 4 2 2 0 010-4zm0 4a2 2 0 100 4 2 2 0 000-4zM10 16a2 2 0 110 4 2 2 0 010-4zM10 2a2 2 0 100 4 2 2 0 000-4zM10 6a2 2 0 110 4 2 2 0 010-4zM10 10a2 2 0 110 4 2 2 0 010-4zM10 14a2 2 0 100 4 2 2 0 000-4zM10 18a2 2 0 100 4 2 2 0 000-4zM10 10a2 2 0 100 4 2 2 0 000-4zM10 14a2 2 0 100 4 2 2 0 000-4zM10 18a2 2 0 100 4 2 2 0 000-4zM10 10a2 2 0 100 4 2 2 0 000-4zM10 14a2 2 0 100 4 2 2 0 000-4zM10 18a2 2 0 100 4 2 2 0 000-4zM10 14a2 2 0 100 4 2 2 0 000-4zM10 18a2 2 0 100 4 2 2 0 000-4zM10 14a2 2 0 100 4 2 2 0 000-4zM10 18a2 2 0 100 4 2 2 0 000-4zM10 14a2 2 0 100 4 2 2 0 000-4zM10 18a2 2 0 100 4 2 2 0 000-4z' },
    { name: 'Information', path: '/dashboard/user/information', icon: 'M2 8.5a3 3 0 013-3h10a3 3 0 013 3v7a3 3 0 01-3 3H5a3 3 0 01-3-3v-7zm3-1a1 1 0 00-1 1v7a1 1 0 001 1h10a1 1 0 001-1v-7a1 1 0 00-1-1H5z' },
    { name: 'Logout', path: '/logout', icon: 'M2 8.5a3 3 0 013-3h10a3 3 0 013 3v7a3 3 0 01-3 3H5a3 3 0 01-3-3v-7zm3-1a1 1 0 00-1 1v7a1 1 0 001 1h10a1 1 0 001-1v-7a1 1 0 00-1-1H5z' },
  ];

  return (
    <aside className="bg-[#112235] w-64 h-full fixed top-0 left-0 pt-24">
      <div className="flex flex-col items-center py-8">
        <img src={profilePicture} alt="Profile" className="w-24 h-24 rounded-full mb-4" />
        <h2 className="text-white text-xl font-bold">{username}</h2>
        <p className="text-[#5394cf]">{role}</p>
      </div>
      <nav className="mt-10">
        <ul className="space-y-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link href={item.path} className={`text-white px-4 py-2 flex items-center ${isActive(item.path) ? 'bg-[#145da0]' : 'hover:bg-[#145da0]'} rounded transition duration-300`}>
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d={item.icon} />
                </svg>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;