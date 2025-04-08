import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Dashboard.module.css';

interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  dateTime: string;
  duration: number;
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
  type: string;
  reasonForVisit: string;
  symptoms: string[];
  notes?: string;
  location?: string;
  virtualMeetingLink?: string;
  createdAt: string;
  updatedAt: string;
}

export default function AppointmentDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    // Make sure we have the appointment ID from the route
    if (!id) return;

    // Fetch appointment data
    const fetchAppointment = async () => {
      try {
        const response = await fetch(`/api/appointments/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch appointment: ${response.status}`);
        }

        const data = await response.json();
        setAppointment(data.appointment);
      } catch (error: any) {
        console.error('Error fetching appointment:', error);
        setError(error.message || 'Failed to load appointment');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id, router]);

  const handleCancelAppointment = async () => {
    if (!appointment) return;
    
    if (!confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'cancelled' }),
      });

      if (!response.ok) {
        throw new Error(`Failed to cancel appointment: ${response.status}`);
      }

      const data = await response.json();
      setAppointment(data.appointment);
    } catch (error: any) {
      console.error('Error cancelling appointment:', error);
      setError(error.message || 'Failed to cancel appointment');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return '#3b82f6'; // blue
      case 'confirmed': return '#10b981'; // green
      case 'in-progress': return '#f59e0b'; // amber
      case 'completed': return '#1f2937'; // gray-800
      case 'cancelled': return '#ef4444'; // red
      case 'no-show': return '#6b7280'; // gray-500
      default: return '#6b7280';
    }
  };

  const getStatusBadge = (status: string) => {
    return (
      <span style={{ 
        padding: '4px 10px',
        borderRadius: '4px',
        backgroundColor: getStatusColor(status),
        color: 'white',
        fontSize: '0.8rem',
        fontWeight: 'bold',
        textTransform: 'uppercase'
      }}>
        {status}
      </span>
    );
  };

  const canCancel = appointment && 
    (appointment.status === 'scheduled' || appointment.status === 'confirmed');

  if (loading) {
    return (
      <div className={styles.container}>
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <h2>Loading appointment details...</h2>
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
        <header className={styles.header}>
          <h1>Appointment Not Found</h1>
          <div>
            <Link href="/appointments">Back to Appointments</Link>
          </div>
        </header>
        <div style={{ 
          padding: '20px', 
          background: '#fee2e2', 
          border: '1px solid #ef4444',
          borderRadius: '8px',
          marginTop: '20px'
        }}>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Appointment Not Found</h1>
          <div>
            <Link href="/appointments">Back to Appointments</Link>
          </div>
        </header>
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <p>The appointment you're looking for could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Appointment Details - Digital Healthcare Platform</title>
        <meta name="description" content="View appointment details" />
      </Head>

      <header className={styles.header}>
        <h1>Appointment Details</h1>
        <div>
          <Link href="/appointments" style={{ marginRight: '15px' }}>Back to Appointments</Link>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.formContainer} style={{ maxWidth: '800px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            <h2 style={{ margin: 0 }}>{appointment.type}</h2>
            {getStatusBadge(appointment.status)}
          </div>

          <div style={{ marginBottom: '30px' }}>
            <div style={{ 
              padding: '15px',
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: '#6b7280' }}>Date & Time</h3>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>{formatDate(appointment.dateTime)}</p>
                </div>
                <div>
                  <h3 style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: '#6b7280' }}>Duration</h3>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>{appointment.duration} minutes</p>
                </div>
                <div>
                  <h3 style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: '#6b7280' }}>Doctor</h3>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>Dr. {appointment.doctorName}</p>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>Appointment Details</h3>
              
              <div style={{ marginBottom: '15px' }}>
                <h4 style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: '#6b7280' }}>Reason for Visit</h4>
                <p style={{ margin: 0 }}>{appointment.reasonForVisit}</p>
              </div>
              
              {appointment.symptoms && appointment.symptoms.length > 0 && (
                <div style={{ marginBottom: '15px' }}>
                  <h4 style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: '#6b7280' }}>Symptoms</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {appointment.symptoms.map((symptom, index) => (
                      <span
                        key={index}
                        style={{
                          padding: '2px 8px',
                          backgroundColor: '#e5e7eb',
                          borderRadius: '4px',
                          fontSize: '0.85rem'
                        }}
                      >
                        {symptom}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {appointment.notes && (
                <div style={{ marginBottom: '15px' }}>
                  <h4 style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: '#6b7280' }}>Doctor's Notes</h4>
                  <p style={{ margin: 0 }}>{appointment.notes}</p>
                </div>
              )}
              
              {appointment.location && (
                <div style={{ marginBottom: '15px' }}>
                  <h4 style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: '#6b7280' }}>Location</h4>
                  <p style={{ margin: 0 }}>{appointment.location}</p>
                </div>
              )}
              
              {appointment.virtualMeetingLink && (
                <div style={{ marginBottom: '15px' }}>
                  <h4 style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: '#6b7280' }}>Virtual Meeting</h4>
                  <a 
                    href={appointment.virtualMeetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.button}
                    style={{ display: 'inline-block', marginTop: '5px' }}
                  >
                    Join Meeting
                  </a>
                </div>
              )}
            </div>

            <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '30px' }}>
              <p>Appointment ID: {appointment.id}</p>
              <p>Created: {new Date(appointment.createdAt).toLocaleString()}</p>
              {appointment.updatedAt !== appointment.createdAt && (
                <p>Last Updated: {new Date(appointment.updatedAt).toLocaleString()}</p>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e5e7eb', paddingTop: '20px' }}>
            <Link
              href="/appointments"
              style={{
                padding: '10px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                textDecoration: 'none',
                color: '#4b5563',
              }}
            >
              Back to Appointments
            </Link>
            
            {canCancel && (
              <button
                onClick={handleCancelAppointment}
                style={{
                  padding: '10px 16px',
                  backgroundColor: '#fee2e2',
                  color: '#b91c1c',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Cancel Appointment
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 