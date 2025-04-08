import { useEffect, useState } from 'react';
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
  location?: string;
  virtualMeetingLink?: string;
}

export default function Appointments() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    // Fetch appointments data
    const fetchAppointments = async () => {
      try {
        const response = await fetch('/api/appointments', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch appointments: ${response.status}`);
        }

        const data = await response.json();
        setAppointments(data.appointments);
      } catch (error: any) {
        console.error('Error fetching appointments:', error);
        setError(error.message || 'Failed to load appointments');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [router]);

  const handleCancelAppointment = async (appointmentId: string) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    try {
      const response = await fetch(`/api/appointments/${appointmentId}`, {
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

      // Update the appointment status in the UI
      setAppointments(prevAppointments => 
        prevAppointments.map(appointment => 
          appointment.id === appointmentId 
            ? { ...appointment, status: 'cancelled' as const } 
            : appointment
        )
      );
    } catch (error: any) {
      console.error('Error cancelling appointment:', error);
      setError(error.message || 'Failed to cancel appointment');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
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

  if (loading) {
    return (
      <div className={styles.container}>
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <h2>Loading appointments...</h2>
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
        <title>My Appointments - Digital Healthcare Platform</title>
        <meta name="description" content="View and manage your medical appointments" />
      </Head>

      <header className={styles.header}>
        <h1>My Appointments</h1>
        <div>
          <Link href="/dashboard" style={{ marginRight: '15px' }}>Dashboard</Link>
          <Link href="/appointments/new" className={styles.button}>
            Book New Appointment
          </Link>
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

        {appointments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px 0' }}>
            <h2>No appointments found</h2>
            <p>You don't have any appointments scheduled. Book a new appointment to get started.</p>
            <Link href="/appointments/new" className={styles.button} style={{ marginTop: '20px' }}>
              Book New Appointment
            </Link>
          </div>
        ) : (
          <div className={styles.appointmentsGrid}>
            {appointments.map((appointment) => (
              <div key={appointment.id} className={styles.appointmentCard}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '10px' 
                }}>
                  <span style={{ 
                    padding: '4px 10px',
                    borderRadius: '4px',
                    backgroundColor: getStatusColor(appointment.status),
                    color: 'white',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                  }}>
                    {appointment.status}
                  </span>
                  <span style={{ fontSize: '0.9rem' }}>
                    {appointment.duration} mins
                  </span>
                </div>
                
                <h3>{appointment.type}</h3>
                <p><strong>Doctor:</strong> {appointment.doctorName}</p>
                <p><strong>Date & Time:</strong> {formatDate(appointment.dateTime)}</p>
                <p><strong>Reason:</strong> {appointment.reasonForVisit}</p>
                
                {appointment.location && (
                  <p><strong>Location:</strong> {appointment.location}</p>
                )}
                
                {appointment.virtualMeetingLink && (
                  <p>
                    <strong>Virtual Link:</strong>{' '}
                    <a 
                      href={appointment.virtualMeetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#3b82f6' }}
                    >
                      Join Meeting
                    </a>
                  </p>
                )}
                
                <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                  <Link 
                    href={`/appointments/${appointment.id}`}
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
                  
                  {(appointment.status === 'scheduled' || appointment.status === 'confirmed') && (
                    <button
                      onClick={() => handleCancelAppointment(appointment.id)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#fee2e2',
                        color: '#b91c1c',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '0.9rem',
                        cursor: 'pointer'
                      }}
                    >
                      Cancel
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