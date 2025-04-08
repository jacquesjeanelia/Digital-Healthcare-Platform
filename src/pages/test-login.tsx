import { useState } from 'react';
import Head from 'next/head';

export default function TestLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      // Test the database connection first
      const dbTestResponse = await fetch('/api/test-db');
      const dbTestData = await dbTestResponse.json();
      
      console.log('DB Test result:', dbTestData);
      
      if (!dbTestData.success) {
        throw new Error('Database connection failed: ' + dbTestData.message);
      }
      
      // Then try to login
      const loginResponse = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Get response as text first to check what's happening
      const responseText = await loginResponse.text();
      console.log('Raw login response:', responseText);
      
      // Try to parse as JSON if possible
      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (parseError) {
        setError(`Received non-JSON response: ${responseText.substring(0, 100)}...`);
        return;
      }
      
      if (!loginResponse.ok) {
        throw new Error(responseData.message || `Login failed with status: ${loginResponse.status}`);
      }
      
      setResult(responseData);
    } catch (err: any) {
      console.error('Login test error:', err);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <Head>
        <title>Login Test</title>
      </Head>
      
      <h1>Login Test Page</h1>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ 
                display: 'block', 
                width: '100%', 
                padding: '0.5rem',
                marginTop: '0.25rem',
                border: '1px solid #ccc',
                borderRadius: '0.25rem'
              }}
            />
          </label>
        </div>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ 
                display: 'block', 
                width: '100%', 
                padding: '0.5rem',
                marginTop: '0.25rem',
                border: '1px solid #ccc',
                borderRadius: '0.25rem'
              }}
            />
          </label>
        </div>
        
        <button 
          type="submit" 
          disabled={isLoading}
          style={{
            background: '#4f46e5',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.25rem',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.7 : 1
          }}
        >
          {isLoading ? 'Testing...' : 'Test Login'}
        </button>
      </form>
      
      {error && (
        <div style={{ 
          padding: '1rem', 
          background: '#fee2e2', 
          border: '1px solid #f87171',
          borderRadius: '0.25rem',
          color: '#b91c1c',
          marginBottom: '1.5rem'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}
      
      {result && (
        <div style={{ 
          padding: '1rem', 
          background: '#ecfdf5', 
          border: '1px solid #10b981',
          borderRadius: '0.25rem',
          color: '#065f46',
          marginBottom: '1.5rem'
        }}>
          <strong>Success:</strong> Login successful!
          <pre style={{ 
            marginTop: '1rem', 
            padding: '1rem', 
            background: '#f1f5f9', 
            borderRadius: '0.25rem',
            overflow: 'auto'
          }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
} 