import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Auth.module.css';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    role: 'patient',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
    // Doctor-specific fields
    specialization: '',
    license: '',
    yearsOfExperience: '',
    hospital: '',
    department: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (formData.password !== formData.passwordConfirm) {
      setError("Passwords don't match");
      return;
    }
    
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      // Store the token
      localStorage.setItem('token', data.token);
      
      // Show success state
      setRegisterSuccess(true);
      
      // Redirect to homepage
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'An unexpected error occurred');
      setLoading(false);
    }
  };

  if (registerSuccess) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Registration Successful - Sehaty</title>
        </Head>
        <main className={styles.main}>
          <div className={styles.formContainer} style={{ textAlign: 'center' }}>
            <h1 className={styles.title}>Registration Successful</h1>
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
        <title>Sign Up - Sehaty</title>
        <meta name="description" content="Create your Sehaty account" />
      </Head>

      <main className={styles.main}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Create an Account</h1>
          
          {error && <div className={styles.error}>{error}</div>}
          
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>

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

            <div className={styles.formGroup}>
              <label htmlFor="passwordConfirm">Confirm Password</label>
              <input
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <p style={{ marginBottom: '5px' }}>Account Type</p>
              <div style={{ display: 'flex', gap: '15px' }}>
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="patient"
                    checked={formData.role === 'patient'}
                    onChange={handleChange}
                  /> Patient
                </label>
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="doctor"
                    checked={formData.role === 'doctor'}
                    onChange={handleChange}
                  /> Doctor
                </label>
              </div>
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
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <p className={styles.switch}>
            Already have an account?{' '}
            <Link href="/auth/login" className={styles.link}>
              Login here
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
} 