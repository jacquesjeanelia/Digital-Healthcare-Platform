import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Dashboard.module.css';

interface MedicalRecord {
  id: string;
  title: string;
  recordType: string;
  date: string;
  doctorName: string;
  description: string;
  fileUrl?: string;
  isConfidential: boolean;
}

export default function MedicalRecords() {
  const router = useRouter();
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [recordType, setRecordType] = useState('all');

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    // Fetch medical records
    const fetchMedicalRecords = async () => {
      try {
        const response = await fetch('/api/medical-records', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch medical records: ${response.status}`);
        }

        const data = await response.json();
        setRecords(data.records);
      } catch (error: any) {
        console.error('Error fetching medical records:', error);
        setError(error.message || 'Failed to load medical records');
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalRecords();
  }, [router]);

  // Filter records based on search term and record type
  const filteredRecords = records.filter(record => {
    const matchesSearch = searchTerm === '' || 
      record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.doctorName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = recordType === 'all' || record.recordType === recordType;
    
    return matchesSearch && matchesType;
  });

  // Group records by year
  const recordsByYear = filteredRecords.reduce((acc, record) => {
    const year = new Date(record.date).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(record);
    return acc;
  }, {} as Record<number, MedicalRecord[]>);

  // Sort years in descending order
  const sortedYears = Object.keys(recordsByYear)
    .map(year => parseInt(year))
    .sort((a, b) => b - a);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRecordTypeIcon = (type: string) => {
    switch (type) {
      case 'labResult':
        return '🔬';
      case 'diagnosis':
        return '🩺';
      case 'prescription':
        return '💊';
      case 'surgeryReport':
        return '🏥';
      case 'vaccineRecord':
        return '💉';
      case 'radiologyImage':
        return '📷';
      case 'referral':
        return '📋';
      default:
        return '📄';
    }
  };

  const getRecordTypeName = (type: string) => {
    switch (type) {
      case 'labResult':
        return 'Lab Result';
      case 'diagnosis':
        return 'Diagnosis';
      case 'prescription':
        return 'Prescription';
      case 'surgeryReport':
        return 'Surgery Report';
      case 'vaccineRecord':
        return 'Vaccine Record';
      case 'radiologyImage':
        return 'Radiology Image';
      case 'referral':
        return 'Referral';
      default:
        return type;
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <h2>Loading medical records...</h2>
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
        <title>Medical Records - Digital Healthcare Platform</title>
        <meta name="description" content="View your medical records" />
      </Head>

      <header className={styles.header}>
        <h1>Medical Records</h1>
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
          <div style={{ maxWidth: '400px', width: '100%' }}>
            <input
              type="text"
              placeholder="Search medical records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #d1d5db',
                borderRadius: '4px'
              }}
            />
          </div>
          <div>
            <select
              value={recordType}
              onChange={(e) => setRecordType(e.target.value)}
              style={{
                padding: '10px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                backgroundColor: 'white'
              }}
            >
              <option value="all">All Record Types</option>
              <option value="labResult">Lab Results</option>
              <option value="diagnosis">Diagnoses</option>
              <option value="prescription">Prescriptions</option>
              <option value="surgeryReport">Surgery Reports</option>
              <option value="vaccineRecord">Vaccine Records</option>
              <option value="radiologyImage">Radiology Images</option>
              <option value="referral">Referrals</option>
            </select>
          </div>
        </div>

        {filteredRecords.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px 0' }}>
            <h2>No medical records found</h2>
            <p>
              {searchTerm || recordType !== 'all' 
                ? 'Try changing your search or filter criteria' 
                : 'You don\'t have any medical records yet'}
            </p>
          </div>
        ) : (
          <div>
            {sortedYears.map(year => (
              <div key={year} style={{ marginBottom: '30px' }}>
                <h2 style={{ 
                  fontSize: '1.25rem', 
                  borderBottom: '1px solid #e5e7eb',
                  paddingBottom: '8px',
                  marginBottom: '16px'
                }}>
                  {year}
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                  {recordsByYear[year]
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map(record => (
                      <div 
                        key={record.id} 
                        className={styles.appointmentCard}
                        style={{ 
                          position: 'relative',
                          borderLeftWidth: '4px', 
                          borderLeftStyle: 'solid',
                          borderLeftColor: record.isConfidential ? '#ef4444' : '#10b981'
                        }}
                      >
                        {record.isConfidential && (
                          <div style={{ 
                            position: 'absolute', 
                            top: '15px', 
                            right: '15px',
                            background: '#fee2e2',
                            color: '#b91c1c',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontSize: '0.7rem',
                            fontWeight: 'bold'
                          }}>
                            CONFIDENTIAL
                          </div>
                        )}
                        
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '10px',
                          marginBottom: '10px'
                        }}>
                          <span style={{ fontSize: '1.5rem' }}>{getRecordTypeIcon(record.recordType)}</span>
                          <div>
                            <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{record.title}</div>
                            <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                              {getRecordTypeName(record.recordType)}
                            </div>
                          </div>
                        </div>
                        
                        <p style={{ margin: '5px 0', color: '#4b5563' }}>
                          <strong>Date:</strong> {formatDate(record.date)}
                        </p>
                        <p style={{ margin: '5px 0', color: '#4b5563' }}>
                          <strong>Doctor:</strong> {record.doctorName}
                        </p>
                        <p style={{ margin: '10px 0', color: '#1f2937' }}>
                          {record.description.length > 100 
                            ? `${record.description.substring(0, 100)}...` 
                            : record.description}
                        </p>
                        
                        <div style={{ marginTop: '15px' }}>
                          <Link 
                            href={`/medical-records/${record.id}`}
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
                          
                          {record.fileUrl && (
                            <a 
                              href={record.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                padding: '6px 12px',
                                backgroundColor: '#dbeafe',
                                color: '#2563eb',
                                borderRadius: '4px',
                                fontSize: '0.9rem',
                                textDecoration: 'none',
                                marginLeft: '8px'
                              }}
                            >
                              View File
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
} 