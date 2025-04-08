import Head from 'next/head';
import Link from 'next/link';
import { ReactNode, useState, useEffect } from 'react';
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
  const router = useRouter();
  
  // Check authentication status on client-side only
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

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
                <Button
                  variant="ghost"
                  className="font-medium hover:bg-gray-100"
                  onClick={() => router.push('/dashboard')}
                >
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  className="font-medium hover:bg-gray-100"
                  onClick={() => router.push('/profile')}
                >
                  Profile
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow pt-[58px]">{children}</main>

      <footer className="py-8 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Sehaty. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 