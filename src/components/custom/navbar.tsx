"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import { useRouter, usePathname } from 'next/navigation';

const Navbar = () => {
  const [bgColor, setBgColor] = useState('transparent');
  const [textColor, setTextColor] = useState('');
  const [iconColor, setIconColor] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const userRole = user?.publicMetadata?.role || "USER";
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
    const handleScroll = () => {
      if (pathname === '/user-services') {
        if (window.scrollY > 50) {
          setBgColor('white');
          setTextColor('black');
          setIconColor('#0e4579');
        } else {
          setBgColor('transparent');
          setTextColor('');
          setIconColor('white');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

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

  const linkClassName = `font-qanelas1 px-4 py-2 rounded-full hover:bg-[#d5d7e2] transition duration-300 ${
    pathname === '/user-services' ? 'text-white hover:text-black' : 'text-black'
  }`;

  return (
    <nav
      className={`py-4 fixed w-full top-0 z-50 transition duration-300 ease-in-out`}
      style={{ backgroundColor: bgColor}}
    >
      <div className="flex justify-between items-center px-4 md:px-10">
        <div className="flex items-center space-x-4">
          <Image src="/images/logos/SSF-logo.png" alt="SSF Logo" width={40} height={40} />
          <Link href="/" style={{color: textColor}}  className={pathname === '/user-services' ? "text-white text-2xl font-qanelas4" : "text-[#0b1d41] text-2xl font-qanelas4"}>FABLAB</Link>
        </div>

        <button 
          className={`md:hidden ${pathname === '/user-services' ? "text-white" : "text-[#0e4579]"}`}
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-6 lg:space-x-10">
            <Link href="/" className={linkClassName}  style={{color: textColor}} >
              Home
            </Link>

            <SignedOut>
              <Link href="/user-services" className={linkClassName} style={{color: textColor}} >
                Services
              </Link>
            </SignedOut>
            
            <SignedIn>
              {userRole === 'USER' && (
                <>
                  <Link href="/user-dashboard" className={linkClassName} style={{color: textColor}} >
                    Dashboard
                  </Link>
                  <Link href="/user-services" className={linkClassName} style={{color: textColor}} >
                    Services
                  </Link>
                </>
              )}
              {userRole === 'ADMIN' && (
                <>
                  <Link href="/admin-dashboard" className={linkClassName} style={{color: textColor}} >
                    Dashboard
                  </Link>
                  <Link href="/admin-services" className={linkClassName} style={{color: textColor}} >
                    Services
                  </Link>
                </>
              )}
            </SignedIn>

            <Link href="/contact" className={linkClassName} style={{color: textColor}} >
              Contact
            </Link>
            
            <Link href="/USERDATA" className={linkClassName} style={{color: textColor}} >
              USER DATA
            </Link>

            <Link href="/student-dashboard" className={linkClassName} style={{color: textColor}} >
              Student Dashboard
            </Link>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-4 mr-8">
          <div className="relative group">
            <button className={`px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition duration-300 focus:outline-none ${
              pathname === '/user-services' ? 'text-white' : 'text-[#0e4579]'
            }`}>
              <svg style={{color: iconColor}} className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
              <SignInButton mode='modal'>
                <button style={{color: iconColor}} className="font-qanelas1 text-[#0e4579]">Sign In</button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton showName />
            </SignedIn>
          </div>
        </div>
      </div>

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