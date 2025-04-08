import Head from 'next/head';
import Link from 'next/link';
import { ReactNode, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { Button } from './ui/button';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export default function Layout({
  children,
  title = 'Sehaty',
  description = 'Your trusted digital healthcare companion',
}: LayoutProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Check authentication status on client-side only
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <header className="flex items-center w-full h-[58px] fixed top-0 left-0 right-0 bg-white border-b border-[#f0f0f0] z-10">
        <div className="w-full max-w-[1280px] mx-auto flex items-center justify-between px-4 md:px-6">
          <div className="relative h-[60px] flex items-center">
            <h1 className="font-['Montserrat',Helvetica] font-extrabold text-[#a818fc] text-[22px] text-center">
              Sehaty
            </h1>
          </div>

          <nav className="hidden md:flex items-center justify-center gap-[5px]">
            <Button
              variant="ghost"
              className="font-['Montserrat',Helvetica] font-bold hover:bg-gray-100"
              onClick={() => router.push('/')}
            >
              Home
            </Button>
            <Button
              variant="ghost"
              className="font-['Montserrat',Helvetica] font-medium hover:bg-gray-100"
              onClick={() => router.push('/doctors')}
            >
              Browse Doctors
            </Button>
            <Button
              variant="ghost"
              className="font-['Montserrat',Helvetica] font-medium hover:bg-gray-100"
              onClick={() => router.push('/appointments')}
            >
              Appointments
            </Button>
            <Button
              variant="ghost"
              className="font-['Montserrat',Helvetica] font-medium hover:bg-gray-100"
              onClick={() => router.push('/about')}
            >
              About Us
            </Button>
            <Button
              variant="ghost"
              className="font-['Montserrat',Helvetica] font-medium hover:bg-gray-100"
              onClick={() => router.push('/contact')}
            >
              Contact Us
            </Button>
          </nav>

          <div className="flex items-center gap-[15px]">
            {!isLoggedIn ? (
              <>
                <Button
                  variant="ghost"
                  className="h-7 bg-[#a918fd0d] text-[#a818fc] font-bold text-sm rounded-lg hover:bg-[#a918fd1a]"
                  onClick={() => router.push('/auth/login')}
                >
                  Login
                </Button>
                <Button 
                  className="h-7 bg-[#a818fc] text-white font-bold text-sm rounded-lg hover:bg-[#8a14d4]"
                  onClick={() => router.push('/auth/register')}
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                {/* Notification Icon */}
                <Button
                  variant="ghost"
                  className="relative p-2 rounded-full hover:bg-gray-100"
                  onClick={() => router.push('/notifications')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[#a818fc] rounded-full"></span>
                </Button>
                
                {/* Account Icon with Dropdown */}
                <div ref={dropdownRef} className="relative">
                  <Button
                    variant="ghost"
                    className="p-2 rounded-full hover:bg-gray-100"
                    onClick={toggleDropdown}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </Button>
                  
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-20 border border-gray-200">
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          router.push('/dashboard');
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </button>
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          router.push('/profile');
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </button>
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          handleLogout();
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow pt-[58px]">{children}</main>

      <footer className="py-8 bg-gray-100 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Sehaty. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 