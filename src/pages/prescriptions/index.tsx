import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Dashboard.module.css';

interface Prescription {
  id: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  doctorName: string;
  instructions: string;
  isActive: boolean;
  refillsRemaining: number;
  refillsTotal: number;
  lastRefillDate?: string;
  pharmacyName?: string;
  sideEffects?: string[];
}

export default function Prescriptions() {
  const router = useRouter();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterActive, setFilterActive] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    // Fetch prescriptions
    const fetchPrescriptions = async () => {
      try {
        const response = await fetch('/api/prescriptions', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch prescriptions: ${response.status}`);
        }

        const data = await response.json();
        setPrescriptions(data.prescriptions);
      } catch (error: any) {
        console.error('Error fetching prescriptions:', error);
        setError(error.message || 'Failed to load prescriptions');
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, [router]);

  // Filter prescriptions based on active status
  const filteredPrescriptions = filterActive === null
    ? prescriptions
    : prescriptions.filter(prescription => prescription.isActive === filterActive);

  const handleRequestRefill = async (prescriptionId: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    try {
      const response = await fetch(`/api/prescriptions/${prescriptionId}/refill`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to request refill: ${response.status}`);
      }

      const data = await response.json();
      
      // Update the prescription in the UI
      setPrescriptions(prevPrescriptions => 
        prevPrescriptions.map(prescription => 
          prescription.id === prescriptionId 
            ? { ...prescription, ...data.prescription } 
            : prescription
        )
      );

      alert('Refill request submitted successfully!');
    } catch (error: any) {
      console.error('Error requesting refill:', error);
      alert(error.message || 'Failed to request refill');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <h2>Loading prescriptions...</h2>
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

  return (
    <div className={styles.container}>
      <Head>
        <title>Prescriptions - Digital Healthcare Platform</title>
        <meta name="description" content="View and manage your prescriptions" />
      </Head>

      <header className={styles.header}>
        <h1>My Prescriptions</h1>
        <div>
          <Link href="/dashboard" style={{ marginRight: '15px' }}>Dashboard</Link>
        </div>
      </header>

      <main className={styles.main}>
        {error && (
          <div style={{ 
            padding: '10px', 
            margin: '0 0 20px',
            background: '#fee2e2', 
            border: '1px solid #ef4444',
            borderRadius: '8px' 
          }}>
            <p>{error}</p>
          </div>
        )}

        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '15px'
        }}>
          <h2 style={{ margin: 0 }}>
            {filterActive === true ? 'Active Prescriptions' : 
              filterActive === false ? 'Expired Prescriptions' : 
              'All Prescriptions'}
          </h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => setFilterActive(null)}
              style={{
                padding: '8px 12px',
                backgroundColor: filterActive === null ? '#3b82f6' : '#f3f4f6',
                color: filterActive === null ? 'white' : '#4b5563',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: filterActive === null ? 'bold' : 'normal'
              }}
            >
              All
            </button>
            <button 
              onClick={() => setFilterActive(true)}
              style={{
                padding: '8px 12px',
                backgroundColor: filterActive === true ? '#10b981' : '#f3f4f6',
                color: filterActive === true ? 'white' : '#4b5563',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: filterActive === true ? 'bold' : 'normal'
              }}
            >
              Active
            </button>
            <button 
              onClick={() => setFilterActive(false)}
              style={{
                padding: '8px 12px',
                backgroundColor: filterActive === false ? '#6b7280' : '#f3f4f6',
                color: filterActive === false ? 'white' : '#4b5563',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: filterActive === false ? 'bold' : 'normal'
              }}
            >
              Expired
            </button>
          </div>
        </div>

        {filteredPrescriptions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px 0' }}>
            <h2>No prescriptions found</h2>
            <p>
              {filterActive !== null
                ? `You don't have any ${filterActive ? 'active' : 'expired'} prescriptions`
                : 'You don\'t have any prescriptions yet'}
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
            {filteredPrescriptions.map(prescription => (
              <div 
                key={prescription.id} 
                className={styles.appointmentCard}
                style={{ 
                  borderLeftWidth: '4px', 
                  borderLeftStyle: 'solid',
                  borderLeftColor: prescription.isActive ? '#10b981' : '#6b7280'
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  marginBottom: '15px' 
                }}>
                  <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{prescription.medicationName}</h3>
                  <span style={{ 
                    padding: '3px 8px',
                    backgroundColor: prescription.isActive ? '#d1fae5' : '#f3f4f6',
                    color: prescription.isActive ? '#047857' : '#6b7280',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    {prescription.isActive ? 'ACTIVE' : 'EXPIRED'}
                  </span>
                </div>
                
                <p style={{ margin: '8px 0', color: '#4b5563' }}>
                  <strong>Dosage:</strong> {prescription.dosage}
                </p>
                <p style={{ margin: '8px 0', color: '#4b5563' }}>
                  <strong>Frequency:</strong> {prescription.frequency}
                </p>
                <p style={{ margin: '8px 0', color: '#4b5563' }}>
                  <strong>Dates:</strong> {formatDate(prescription.startDate)} to {formatDate(prescription.endDate)}
                </p>
                <p style={{ margin: '8px 0', color: '#4b5563' }}>
                  <strong>Doctor:</strong> {prescription.doctorName}
                </p>
                <p style={{ margin: '8px 0', color: '#4b5563' }}>
                  <strong>Refills:</strong> {prescription.refillsRemaining} of {prescription.refillsTotal} remaining
                </p>
                
                {prescription.pharmacyName && (
                  <p style={{ margin: '8px 0', color: '#4b5563' }}>
                    <strong>Pharmacy:</strong> {prescription.pharmacyName}
                  </p>
                )}
                
                <div style={{ 
                  marginTop: '15px', 
                  paddingTop: '15px', 
                  borderTop: '1px solid #e5e7eb',
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Link 
                    href={`/prescriptions/${prescription.id}`}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#f3f4f6',
                      borderRadius: '4px',
                      fontSize: '0.9rem',
                      textDecoration: 'none',
                      color: '#1f2937'
                    }}
                  >
                    View Details
                  </Link>
                  
                  {prescription.isActive && prescription.refillsRemaining > 0 && (
                    <button
                      onClick={() => handleRequestRefill(prescription.id)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#dbeafe',
                        color: '#2563eb',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                      }}
                    >
                      Request Refill
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
} 