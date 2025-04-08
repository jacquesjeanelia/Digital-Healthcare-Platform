import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [redirectingToLogin, setRedirectingToLogin] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    console.log('Dashboard: Token exists?', !!token);
    
    if (!token) {
      console.log('Dashboard: No token found, redirecting to login');
      handleRedirectToLogin();
      return;
    }

    const fetchUserData = async () => {
      try {
        console.log('Dashboard: Fetching user data');
        const response = await fetch('/api/user/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        console.log('Dashboard: Response status:', response.status);
        
        if (!response.ok) {
          console.log('Dashboard: Response not OK');
          
          if (response.status === 401) {
            console.log('Dashboard: Unauthorized access - token might be invalid');
            localStorage.removeItem('token');
            throw new Error('Invalid or expired token. Please login again.');
          }
          
          throw new Error(`Error: ${response.status}`);
        }
        
        // Check if response is JSON
        const contentType = response.headers.get('content-type');
        console.log('Dashboard: Content type:', contentType);
        
        if (!contentType || !contentType.includes('application/json')) {
          const textResponse = await response.text();
          console.error('Dashboard: Expected JSON but got:', textResponse.substring(0, 100) + '...');
          throw new Error('Server returned unexpected content type');
        }

        const data = await response.json();
        console.log('Dashboard: User data received', data);
        setUser(data.user);
        setLoading(false);
      } catch (error: any) {
        console.error('Dashboard: Error fetching user data:', error);
        setError(error.message || 'Unknown error occurred');
        
        // Clear token if it's invalid
        if (error.message?.includes('Invalid token') || 
            error.message?.includes('Unauthorized') || 
            error.message?.includes('non-JSON')) {
          console.log('Dashboard: Clearing token due to error');
          localStorage.removeItem('token');
          
          // Wait a moment before redirecting to prevent rapid flickering
          setTimeout(() => {
            handleRedirectToLogin();
          }, 2000);
        } else {
          // For other errors, just mark loading as complete
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleRedirectToLogin = () => {
    // Set redirecting state to prevent multiple redirects
    if (!redirectingToLogin) {
      setRedirectingToLogin(true);
      router.push('/auth/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    handleRedirectToLogin();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Loading your dashboard...</h2>
          <div className="mx-auto w-12 h-12 border-4 border-gray-200 border-t-[#a818fc] rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-red-600 mb-2">Authentication Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <p className="text-gray-600 mb-4">You will be redirected to the login page shortly...</p>
          <Button
            onClick={handleRedirectToLogin}
            className="w-full"
          >
            Return to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Head>
        <title>Dashboard - Sehaty</title>
        <meta name="description" content="Your health dashboard on Sehaty" />
      </Head>

      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="bg-[#a918fd0d] rounded-lg p-6 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Welcome, <span className="text-[#a818fc]">{user?.name}</span>
          </h1>
          <p className="text-gray-600">Manage your healthcare journey in one place</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {user?.role === 'patient' ? (
            <>
              <Card className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="p-6">
                  <div className="w-12 h-12 bg-[#a918fd1a] rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#a818fc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold mb-2">My Appointments</h2>
                  <p className="text-gray-600 mb-4">View and manage your upcoming medical appointments.</p>
                  <Button
                    variant="link"
                    className="text-[#a818fc] p-0 hover:text-[#8a14d4]"
                    onClick={() => router.push('/appointments')}
                  >
                    View Appointments →
                  </Button>
                </div>
              </Card>

              <Card className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="p-6">
                  <div className="w-12 h-12 bg-[#a918fd1a] rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#a818fc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold mb-2">Medical Records</h2>
                  <p className="text-gray-600 mb-4">Access your electronic health records securely.</p>
                  <Button
                    variant="link"
                    className="text-[#a818fc] p-0 hover:text-[#8a14d4]"
                    onClick={() => router.push('/medical-records')}
                  >
                    View Records →
                  </Button>
                </div>
              </Card>

              <Card className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="p-6">
                  <div className="w-12 h-12 bg-[#a918fd1a] rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#a818fc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold mb-2">Prescriptions</h2>
                  <p className="text-gray-600 mb-4">View your current and past medical prescriptions.</p>
                  <Button
                    variant="link"
                    className="text-[#a818fc] p-0 hover:text-[#8a14d4]"
                    onClick={() => router.push('/prescriptions')}
                  >
                    View Prescriptions →
                  </Button>
                </div>
              </Card>

              <Card className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="p-6">
                  <div className="w-12 h-12 bg-[#a918fd1a] rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#a818fc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold mb-2">My Profile</h2>
                  <p className="text-gray-600 mb-4">View and update your personal information.</p>
                  <Button
                    variant="link"
                    className="text-[#a818fc] p-0 hover:text-[#8a14d4]"
                    onClick={() => router.push('/profile')}
                  >
                    View Profile →
                  </Button>
                </div>
              </Card>
            </>
          ) : (
            <>
              <Card className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="p-6">
                  <div className="w-12 h-12 bg-[#a918fd1a] rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#a818fc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold mb-2">Appointments</h2>
                  <p className="text-gray-600 mb-4">View and manage your patient appointments.</p>
                  <Button
                    variant="link"
                    className="text-[#a818fc] p-0 hover:text-[#8a14d4]"
                    onClick={() => router.push('/doctor/appointments')}
                  >
                    Manage Appointments →
                  </Button>
                </div>
              </Card>

              <Card className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="p-6">
                  <div className="w-12 h-12 bg-[#a918fd1a] rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#a818fc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold mb-2">My Patients</h2>
                  <p className="text-gray-600 mb-4">Access your patient list and records.</p>
                  <Button
                    variant="link"
                    className="text-[#a818fc] p-0 hover:text-[#8a14d4]"
                    onClick={() => router.push('/doctor/patients')}
                  >
                    View Patients →
                  </Button>
                </div>
              </Card>

              <Card className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="p-6">
                  <div className="w-12 h-12 bg-[#a918fd1a] rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#a818fc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold mb-2">Schedule</h2>
                  <p className="text-gray-600 mb-4">Manage your availability and schedule.</p>
                  <Button
                    variant="link"
                    className="text-[#a818fc] p-0 hover:text-[#8a14d4]"
                    onClick={() => router.push('/doctor/schedule')}
                  >
                    Manage Schedule →
                  </Button>
                </div>
              </Card>

              <Card className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="p-6">
                  <div className="w-12 h-12 bg-[#a918fd1a] rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#a818fc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold mb-2">My Profile</h2>
                  <p className="text-gray-600 mb-4">Update your professional information.</p>
                  <Button
                    variant="link"
                    className="text-[#a818fc] p-0 hover:text-[#8a14d4]"
                    onClick={() => router.push('/doctor/profile')}
                  >
                    View Profile →
                  </Button>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 