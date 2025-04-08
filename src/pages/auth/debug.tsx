import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '@/styles/Auth.module.css';

export default function DebugAuth() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [tokenData, setTokenData] = useState<any>(null);
  const [dbStatus, setDbStatus] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [localStorageData, setLocalStorageData] = useState<Record<string, string>>({});

  useEffect(() => {
    // Get token from localStorage
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }

    // Collect all localStorage data for debugging
    const storageData: Record<string, string> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const value = localStorage.getItem(key);
        if (value) {
          storageData[key] = value;
        }
      }
    }
    setLocalStorageData(storageData);

    // Check DB connection automatically on page load
    checkDbConnection();
  }, []);

  const handleVerifyToken = async () => {
    if (!token) {
      setError('No token found');
      return;
    }

    setLoading(true);
    setError('');
    setTokenData(null);

    try {
      const response = await fetch('/api/auth/test-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();
      setApiResponse({
        status: response.status,
        headers: Object.fromEntries(response.headers.entries()),
        data
      });
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to verify token');
      }

      setTokenData(data);
    } catch (err: any) {
      console.error('Token verification error:', err);
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleFetchProfile = async () => {
    if (!token) {
      setError('No token found');
      return;
    }

    setLoading(true);
    setError('');
    setApiResponse(null);

    try {
      const response = await fetch('/api/user/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // First capture response metadata
      const responseData = {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
      };

      // Safely try to parse response as JSON or get text
      let responseBody;
      const contentType = response.headers.get('content-type') || '';
      
      if (contentType.includes('application/json')) {
        try {
          responseBody = await response.json();
        } catch (e) {
          console.error('Error parsing JSON:', e);
          responseBody = { error: 'Failed to parse JSON response' };
        }
      } else {
        try {
          const text = await response.text();
          responseBody = { text: text.substring(0, 500) + (text.length > 500 ? '...' : '') };
        } catch (e) {
          console.error('Error getting response text:', e);
          responseBody = { error: 'Failed to get response text' };
        }
      }
      
      setApiResponse({
        ...responseData,
        body: responseBody
      });
      
      if (!response.ok) {
        throw new Error(
          (responseBody?.message || responseBody?.error || 'Failed to fetch profile') + 
          ` (Status: ${response.status})`
        );
      }

      setTokenData({ profile: responseBody.user });
    } catch (err: any) {
      console.error('Profile fetch error:', err);
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const checkDbConnection = async () => {
    setLoading(true);
    setDbStatus(null);
    setError('');
    
    try {
      const response = await fetch('/api/test-db');
      
      // Capture response metadata
      const responseData = {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
      };
      
      let data;
      try {
        data = await response.json();
      } catch (e) {
        console.error('Error parsing JSON from DB test:', e);
        const text = await response.text();
        data = { 
          error: 'Failed to parse JSON',
          rawResponse: text.substring(0, 200) + (text.length > 200 ? '...' : '')
        };
      }
      
      setDbStatus({
        ...responseData,
        data
      });
      
      if (!response.ok) {
        throw new Error(`Database connection failed: ${data.message || response.statusText}`);
      }
    } catch (err: any) {
      console.error('DB connection test error:', err);
      setError(`Database test error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleClearToken = () => {
    localStorage.removeItem('token');
    setToken('');
    setTokenData(null);
    // Update local storage data display
    setLocalStorageData(prev => {
      const updated = {...prev};
      delete updated['token'];
      return updated;
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Auth Debug - Digital Healthcare Platform</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.formContainer} style={{ maxWidth: '800px' }}>
          <h1 className={styles.title}>Authentication Debug Tool</h1>
          
          {error && (
            <div style={{ 
              padding: '10px', 
              background: '#fee2e2', 
              border: '1px solid #ef4444',
              borderRadius: '4px',
              marginBottom: '15px' 
            }}>
              <strong>Error:</strong> {error}
            </div>
          )}
          
          <div style={{ marginBottom: '20px' }}>
            <h2>1. Database Connection</h2>
            <button 
              onClick={checkDbConnection} 
              className={styles.button}
              disabled={loading}
              style={{ marginBottom: '10px' }}
            >
              Test Database Connection
            </button>
            
            {dbStatus && (
              <div style={{ 
                backgroundColor: dbStatus.status === 200 ? '#ecfdf5' : '#fee2e2',
                padding: '10px',
                borderRadius: '4px' 
              }}>
                <p><strong>Status:</strong> {dbStatus.status} {dbStatus.statusText}</p>
                <p><strong>Connection:</strong> {dbStatus.data?.success ? 'Successful' : 'Failed'}</p>
                {dbStatus.data?.message && <p><strong>Message:</strong> {dbStatus.data.message}</p>}
                
                <details>
                  <summary>Details</summary>
                  <pre style={{ 
                    overflow: 'auto', 
                    maxHeight: '200px',
                    background: '#f5f5f5',
                    padding: '10px',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    {JSON.stringify(dbStatus, null, 2)}
                  </pre>
                </details>
              </div>
            )}
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <h2>2. Current JWT Token</h2>
            <div className={styles.formGroup}>
              <label htmlFor="token">JWT Token</label>
              <textarea
                id="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className={styles.input}
                rows={3}
                style={{ resize: 'vertical', fontFamily: 'monospace', fontSize: '12px' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h2>3. Actions</h2>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button 
                onClick={handleVerifyToken} 
                className={styles.button}
                disabled={loading}
              >
                Verify Token
              </button>
              
              <button 
                onClick={handleFetchProfile} 
                className={styles.button}
                disabled={loading}
              >
                Fetch Profile
              </button>
              
              <button 
                onClick={handleClearToken} 
                className={styles.button}
                disabled={loading}
              >
                Clear Token
              </button>
            </div>
          </div>

          {loading && (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <p>Loading...</p>
            </div>
          )}
          
          <div style={{ marginBottom: '20px' }}>
            <h2>4. API Response</h2>
            {apiResponse ? (
              <div style={{ 
                backgroundColor: apiResponse.status >= 200 && apiResponse.status < 300 ? '#ecfdf5' : '#fee2e2',
                padding: '10px',
                borderRadius: '4px' 
              }}>
                <p><strong>Status:</strong> {apiResponse.status} {apiResponse.statusText}</p>
                <p><strong>Content-Type:</strong> {apiResponse.headers['content-type']}</p>
                
                <details>
                  <summary>Response Data</summary>
                  <pre style={{ 
                    overflow: 'auto', 
                    maxHeight: '300px',
                    background: '#f5f5f5',
                    padding: '10px',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    {JSON.stringify(apiResponse.body || apiResponse.data, null, 2)}
                  </pre>
                </details>
              </div>
            ) : (
              <p>No API response yet</p>
            )}
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <h2>5. Local Storage</h2>
            <pre style={{ 
              backgroundColor: '#f5f5f5',
              padding: '10px',
              borderRadius: '5px',
              overflow: 'auto',
              maxHeight: '200px',
              fontSize: '12px'
            }}>
              {JSON.stringify(localStorageData, null, 2)}
            </pre>
          </div>
          
          <div style={{ marginTop: '20px' }}>
            <button 
              onClick={() => router.push('/dashboard')} 
              className={styles.button}
            >
              Go to Dashboard
            </button>
            
            <button 
              onClick={() => router.push('/auth/login')} 
              className={styles.button}
              style={{ marginLeft: '10px' }}
            >
              Go to Login
            </button>
          </div>
        </div>
      </main>
    </div>
  );
} 