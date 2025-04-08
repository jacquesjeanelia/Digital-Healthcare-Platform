import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Dashboard.module.css';

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
  const [error, setError] = useState<string | null>(null);
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

    // Fetch user data
    const fetchUserData = async () => {
      try {
        console.log('Dashboard: Fetching user profile with token', token.substring(0, 15) + '...');
        
        const response = await fetch('/api/user/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('Dashboard: Profile API response status:', response.status);
        
        if (!response.ok) {
          // Check content type before trying to parse as JSON
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            console.error('Dashboard: Failed to fetch user data', errorData);
            throw new Error(errorData.message || `Failed to fetch user data: ${response.status}`);
          } else {
            // Handle non-JSON response (like HTML error pages)
            const textResponse = await response.text();
            console.error('Dashboard: Received non-JSON response:', textResponse.substring(0, 100) + '...');
            throw new Error(`Server returned non-JSON response (${response.status})`);
          }
        }

        // Only parse as JSON for successful responses
        const contentType = response.headers.get('content-type');
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
      <div className={styles.container}>
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <h2>Loading your dashboard...</h2>
          <div style={{ 
            margin: '20px auto', 
            width: '40px', 
            height: '40px', 
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #3498db',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <style jsx>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div style={{ 
          padding: '20px', 
          background: '#fee2e2', 
          border: '1px solid #ef4444',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h2>Authentication Error</h2>
          <p>{error}</p>
          <p>You will be redirected to the login page shortly...</p>
        </div>
        <button 
          onClick={handleRedirectToLogin}
          style={{
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Return to Login
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Dashboard - Sehaty</title>
        <meta name="description" content="Your health dashboard on Sehaty" />
      </Head>

      <header className={styles.header}>
        <h1>Welcome to Sehaty, {user?.name}</h1>
        <div>
          <Link href="/auth/debug" style={{ marginRight: '15px' }}>Debug Auth</Link>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.grid}>
          {user?.role === 'patient' ? (
            <>
              <Link href="/appointments" className={styles.card}>
                <h2>My Appointments &rarr;</h2>
                <p>View and manage your medical appointments.</p>
              </Link>

              <Link href="/medical-records" className={styles.card}>
                <h2>Medical Records &rarr;</h2>
                <p>Access your electronic health records.</p>
              </Link>

              <Link href="/prescriptions" className={styles.card}>
                <h2>Prescriptions &rarr;</h2>
                <p>View your current and past prescriptions.</p>
              </Link>

              <Link href="/profile" className={styles.card}>
                <h2>My Profile &rarr;</h2>
                <p>Update your personal information.</p>
              </Link>
            </>
          ) : (
            <>
              <Link href="/doctor/appointments" className={styles.card}>
                <h2>Appointments &rarr;</h2>
                <p>View and manage your patient appointments.</p>
              </Link>

              <Link href="/doctor/patients" className={styles.card}>
                <h2>My Patients &rarr;</h2>
                <p>Access your patient list and records.</p>
              </Link>

              <Link href="/doctor/schedule" className={styles.card}>
                <h2>Schedule &rarr;</h2>
                <p>Manage your availability and schedule.</p>
              </Link>

              <Link href="/doctor/profile" className={styles.card}>
                <h2>My Profile &rarr;</h2>
                <p>Update your professional information.</p>
              </Link>
            </>
          )}
        </div>
      </main>
    </div>
  );
} 