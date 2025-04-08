import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Auth.module.css';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  
  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    console.log('Login: Token exists on page load?', !!token);
    
    if (token) {
      // Try to verify the token first to make sure it's valid
      const verifyToken = async () => {
        try {
          console.log('Login: Verifying existing token');
          const response = await fetch('/api/auth/test-token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
          });
          
          const data = await response.json();
          
          if (response.ok && data.valid) {
            console.log('Login: Token is valid, redirecting to homepage');
            router.push('/');
          } else {
            console.log('Login: Token is invalid, clearing it', data);
            localStorage.removeItem('token');
          }
        } catch (err) {
          console.error('Login: Error verifying token', err);
          localStorage.removeItem('token');
        }
      };
      
      verifyToken();
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setLoginSuccess(false);

    try {
      console.log('Login: Attempting login with:', { email: formData.email });
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Login failed with status: ${response.status}`);
        } else {
          const textError = await response.text();
          console.error('Login: Non-JSON error response:', textError);
          throw new Error(`Server error (${response.status}). Please try again later.`);
        }
      }
      
      // Only try to parse JSON if we know it's a successful response
      const data = await response.json();
      console.log('Login: Login successful:', { userId: data.user?.id, role: data.user?.role });

      // Store the token in localStorage
      localStorage.setItem('token', data.token);
      console.log('Login: Token stored in localStorage');
      
      // Show success state before redirect
      setLoginSuccess(true);
      
      // Redirect to homepage after a delay to ensure token is stored and prevent flickering
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } catch (err: any) {
      console.error('Login: Login error:', err);
      setError(err.message || 'An unexpected error occurred');
      setLoginSuccess(false);
      setLoading(false);
    }
  };

  if (loginSuccess) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Login Successful - Sehaty</title>
        </Head>
        <main className={styles.main}>
          <div className={styles.formContainer} style={{ textAlign: 'center' }}>
            <h1 className={styles.title}>Login Successful</h1>
            <p>Redirecting to homepage...</p>
            <div style={{ 
              margin: '20px auto', 
              width: '40px', 
              height: '40px', 
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #a818fc',
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
        </main>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Login - Sehaty</title>
        <meta name="description" content="Login to your account" />
      </Head>

      <main className={styles.main}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Login</h1>
          
          {error && <div className={styles.error}>{error}</div>}
          
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>

            <button 
              type="submit" 
              className={styles.button}
              disabled={loading}
              style={{ 
                backgroundColor: '#a818fc', 
                borderRadius: '8px',
              }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className={styles.switch}>
            Don't have an account?{' '}
            <Link href="/auth/register" className={styles.link}>
              Register here
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
} 