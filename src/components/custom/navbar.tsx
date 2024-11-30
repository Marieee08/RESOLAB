"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [bgColor, setBgColor] = useState('transparent');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const userRole = user?.publicMetadata?.role as string || "USER";


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setBgColor('white');
      } else {
        setBgColor('transparent');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isLoaded && user) {
      const path = window.location.pathname;
      if (path.includes('/dashboard/admin') && userRole !== 'ADMIN') {
        router.push('/dashboard/user');
      }
    }
  }, [isLoaded, user, userRole, router]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`py-4 fixed w-full top-0 z-50 transition duration-300 ease-in-out`}
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex justify-between items-center px-4 md:px-10">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <Image src="/images/logos/SSF-logo.png" alt="SSF Logo" width={40} height={40} />
          <Link href="/" className="text-[#0b1d41] text-2xl font-qanelas4">FABLAB</Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-[#0e4579]"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-6 lg:space-x-10">
            <Link href="/" className="font-qanelas1 text-black px-4 py-2 rounded-full hover:bg-[#d5d7e2] transition duration-300">
              Home
            </Link>

            <SignedOut>
              <Link href="/services/user" className="font-qanelas1 text-black px-4 py-2 rounded-full hover:bg-[#d5d7e2] transition duration-300">
                Services
              </Link>
            </SignedOut>
            
            <SignedIn>

            {userRole === 'USER' && (
                <>
                  <Link href="/user-dashboard" className="font-qanelas1 text-black px-4 py-2 rounded-full hover:bg-[#d5d7e2] transition duration-300">
                    Dashboard
                  </Link>
                  <Link href="/user-services" className="font-qanelas1 text-black px-4 py-2 rounded-full hover:bg-[#d5d7e2] transition duration-300">
                    Services
                  </Link>
                </>
              )}
              {userRole === 'ADMIN' && (
                <>
                  <Link href="/admin-dashboard" className="font-qanelas1 text-black px-4 py-2 rounded-full hover:bg-[#d5d7e2] transition duration-300">
                    Dashboard
                  </Link>
                  <Link href="/admin-services" className="font-qanelas1 text-black px-4 py-2 rounded-full hover:bg-[#d5d7e2] transition duration-300">
                    Services
                  </Link>
                </>
              )}
            </SignedIn>

            <Link href="/contact" className="font-qanelas1 text-black px-4 py-2 rounded-full hover:bg-[#d5d7e2] transition duration-300">
              Contact
            </Link>
            
            <Link href="/USERDATA" className="font-qanelas1 text-black px-4 py-2 rounded-full hover:bg-[#d5d7e2] transition duration-300">
              USER DATA
            </Link>

          </div>
        </div>

        {/* User Profile and Notifications - Desktop */}
        <div className="hidden md:flex items-center space-x-4 mr-8">
          <div className="relative group">
            <button className="text-[#0e4579] px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition duration-300 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405C18.79 14.79 18 13.42 18 12V8a6 6 0 10-12 0v4c0 1.42-.79 2.79-2.595 3.595L3 17h5m4 0v1a3 3 0 11-6 0v-1m6 0a3 3 0 01-6 0"></path>
              </svg>
            </button>
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
              <ul className="divide-y divide-gray-300">
                <li className="px-4 py-2 text-gray-800 hover:bg-gray-100">Order Notification 1</li>
                <li className="px-4 py-2 text-gray-800 hover:bg-gray-100">Announcement 1</li>
                <li className="px-4 py-2 text-gray-800 hover:bg-gray-100">Message Notification 1</li>
                <li className="px-4 py-2 text-gray-800 hover:bg-gray-100">Order Notification 2</li>
                <li className="px-4 py-2 text-gray-800 hover:bg-gray-100">Announcement 2</li>
                <li className="px-4 py-2 text-gray-800 hover:bg-gray-100">Message Notification 2</li>
              </ul>
            </div>
          </div>
          <div className="flex items-center gap-3 2xsm:gap-7">
            <SignedOut>
              <SignInButton mode='modal' />
            </SignedOut>
            <SignedIn>
              <UserButton showName />
            </SignedIn>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white shadow-lg`}>
        <div className="px-4 pt-2 pb-3 space-y-1">
          <Link href="/" className="block font-qanelas1 text-black px-4 py-2 rounded-full hover:bg-[#d5d7e2] transition duration-300">
            Home
          </Link>
          <Link href="/dashboard" className="block font-qanelas1 text-black px-4 py-2 rounded-full hover:bg-[#d5d7e2] transition duration-300">
            Dashboard
          </Link>
          <Link href="/services" className="block font-qanelas1 text-black px-4 py-2 rounded-full hover:bg-[#d5d7e2] transition duration-300">
            Services
          </Link>
          <Link href="/contact" className="block font-qanelas1 text-black px-4 py-2 rounded-full hover:bg-[#d5d7e2] transition duration-300">
            Contact
          </Link>
          <Link href="/dashboard-admin" className="block font-qanelas1 text-black px-4 py-2 rounded-full hover:bg-[#d5d7e2] transition duration-300">
            Admin
          </Link>
        </div>
        
        {/* Mobile User Profile */}
        <div className="px-4 py-3 border-t border-gray-200">
          <div className="flex items-center">
            <span className="h-10 w-10 rounded-full bg-gray-300"></span>
            <div className="ml-3">
              <span className="block text-sm font-medium text-black">Leila Sabando</span>
              <span className="block text-xs text-gray-500">Student</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;