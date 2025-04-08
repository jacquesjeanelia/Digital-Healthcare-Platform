import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Dashboard.module.css';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  hospital?: string;
  department?: string;
}

interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
}

export default function NewAppointment() {
  const router = useRouter();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [appointmentType, setAppointmentType] = useState<string>('general-checkup');
  const [appointmentDate, setAppointmentDate] = useState<string>('');
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [reasonForVisit, setReasonForVisit] = useState<string>('');
  const [symptoms, setSymptoms] = useState<string>('');
  const [isVirtual, setIsVirtual] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    // Fetch doctors
    const fetchDoctors = async () => {
      try {
        const response = await fetch('/api/doctors', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch doctors: ${response.status}`);
        }

        const data = await response.json();
        setDoctors(data.doctors);
      } catch (error: any) {
        console.error('Error fetching doctors:', error);
        setError(error.message || 'Failed to load doctors');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [router]);

  useEffect(() => {
    if (selectedDoctor && appointmentDate) {
      // Fetch available time slots
      const fetchTimeSlots = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
          setLoading(true);
          const response = await fetch(`/api/doctors/${selectedDoctor}/availability?date=${appointmentDate}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch time slots: ${response.status}`);
          }

          const data = await response.json();
          setTimeSlots(data.timeSlots);
          // Reset selected time when date or doctor changes
          setSelectedTime('');
        } catch (error: any) {
          console.error('Error fetching time slots:', error);
          setError(error.message || 'Failed to load time slots');
        } finally {
          setLoading(false);
        }
      };

      fetchTimeSlots();
    }
  }, [selectedDoctor, appointmentDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!selectedDoctor) {
      setError('Please select a doctor');
      return;
    }
    if (!appointmentDate) {
      setError('Please select a date');
      return;
    }
    if (!selectedTime) {
      setError('Please select a time slot');
      return;
    }
    if (!reasonForVisit) {
      setError('Please provide a reason for your visit');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    try {
      setSubmitLoading(true);
      setError(null);

      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctorId: selectedDoctor,
          dateTime: `${appointmentDate}T${selectedTime}`,
          type: appointmentType,
          reasonForVisit,
          symptoms: symptoms.split(',').map(s => s.trim()).filter(s => s),
          isVirtual,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to book appointment: ${response.status}`);
      }

      const data = await response.json();
      
      // Redirect to appointment details page
      router.push(`/appointments/${data.appointment.id}`);
    } catch (error: any) {
      console.error('Error booking appointment:', error);
      setError(error.message || 'Failed to book appointment');
      setSubmitLoading(false);
    }
  };

  // Get tomorrow's date as the minimum selectable date
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (loading && doctors.length === 0) {
    return (
      <div className={styles.container}>
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <h2>Loading...</h2>
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
        <title>Book New Appointment - Digital Healthcare Platform</title>
        <meta name="description" content="Book a new medical appointment" />
      </Head>

      <header className={styles.header}>
        <h1>Book New Appointment</h1>
        <div>
          <Link href="/appointments" style={{ marginRight: '15px' }}>Back to Appointments</Link>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.formContainer}>
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

          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="doctor">Select Doctor</label>
              <select
                id="doctor"
                className={styles.formSelect}
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                required
              >
                <option value="">-- Select a doctor --</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    Dr. {doctor.name} - {doctor.specialization}
                    {doctor.department && ` (${doctor.department})`}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="appointmentType">Appointment Type</label>
              <select
                id="appointmentType"
                className={styles.formSelect}
                value={appointmentType}
                onChange={(e) => setAppointmentType(e.target.value)}
                required
              >
                <option value="general-checkup">General Checkup</option>
                <option value="follow-up">Follow-up</option>
                <option value="consultation">Consultation</option>
                <option value="vaccination">Vaccination</option>
                <option value="telemedicine">Telemedicine</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="appointmentDate">Select Date</label>
              <input
                type="date"
                id="appointmentDate"
                className={styles.formInput}
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                min={getTomorrowDate()}
                required
              />
            </div>

            {appointmentDate && selectedDoctor && (
              <div className={styles.formGroup}>
                <label>Select Time Slot</label>
                {loading ? (
                  <p>Loading available time slots...</p>
                ) : timeSlots.length === 0 ? (
                  <p>No available time slots for this date. Please select another date.</p>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                    {timeSlots.map((slot, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setSelectedTime(slot.start)}
                        disabled={!slot.available}
                        style={{
                          padding: '8px',
                          border: selectedTime === slot.start 
                            ? '2px solid #3b82f6' 
                            : '1px solid #d1d5db',
                          borderRadius: '4px',
                          backgroundColor: !slot.available 
                            ? '#f3f4f6' 
                            : selectedTime === slot.start 
                              ? 'rgba(59, 130, 246, 0.1)' 
                              : 'white',
                          cursor: slot.available ? 'pointer' : 'not-allowed',
                          opacity: slot.available ? 1 : 0.6,
                        }}
                      >
                        {new Date(`2000-01-01T${slot.start}`).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className={styles.formGroup}>
              <label htmlFor="reasonForVisit">Reason for Visit</label>
              <textarea
                id="reasonForVisit"
                className={styles.formInput}
                value={reasonForVisit}
                onChange={(e) => setReasonForVisit(e.target.value)}
                rows={3}
                required
              ></textarea>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="symptoms">Symptoms (comma separated)</label>
              <textarea
                id="symptoms"
                className={styles.formInput}
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                rows={2}
                placeholder="e.g. headache, fever, cough"
              ></textarea>
            </div>

            <div className={styles.formGroup} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="checkbox"
                id="isVirtual"
                checked={isVirtual}
                onChange={(e) => setIsVirtual(e.target.checked)}
              />
              <label htmlFor="isVirtual" style={{ margin: 0 }}>Virtual Appointment (Telemedicine)</label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
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
                Cancel
              </Link>
              <button
                type="submit"
                className={styles.button}
                disabled={submitLoading}
                style={{ padding: '10px 20px' }}
              >
                {submitLoading ? 'Booking...' : 'Book Appointment'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
} 