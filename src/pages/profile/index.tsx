import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Dashboard.module.css';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  phoneNumber?: string;
  address?: string;
  dateOfBirth?: string;
  gender?: string;
  profileImage?: string;
  medicalHistory?: string[];
  allergies?: string[];
  bloodType?: string;
  emergencyContact?: {
    name: string;
    phoneNumber: string;
    relationship: string;
  };
  insuranceInfo?: {
    provider: string;
    policyNumber: string;
    expiryDate: string;
  };
}

export default function Profile() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    // Fetch user profile
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/user/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch profile: ${response.status}`);
        }

        const data = await response.json();
        setProfile(data.user);
        setEditedProfile(data.user);
      } catch (error: any) {
        console.error('Error fetching profile:', error);
        setError(error.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (!editedProfile) return;

    // Handle nested properties
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      
      if (parent === 'emergencyContact') {
        setEditedProfile({
          ...editedProfile,
          emergencyContact: {
            ...(editedProfile.emergencyContact || { name: '', phoneNumber: '', relationship: '' }),
            [child]: value
          }
        });
      } else if (parent === 'insuranceInfo') {
        setEditedProfile({
          ...editedProfile,
          insuranceInfo: {
            ...(editedProfile.insuranceInfo || { provider: '', policyNumber: '', expiryDate: '' }),
            [child]: value
          }
        });
      }
    } else {
      setEditedProfile({
        ...editedProfile,
        [name]: value
      });
    }
  };

  const handleArrayChange = (name: string, index: number, value: string) => {
    if (!editedProfile) return;
    
    const array = [...(editedProfile[name as keyof UserProfile] as string[] || [])];
    array[index] = value;
    
    setEditedProfile({
      ...editedProfile,
      [name]: array
    });
  };

  const handleAddArrayItem = (name: string) => {
    if (!editedProfile) return;
    
    const array = [...(editedProfile[name as keyof UserProfile] as string[] || []), ''];
    
    setEditedProfile({
      ...editedProfile,
      [name]: array
    });
  };

  const handleRemoveArrayItem = (name: string, index: number) => {
    if (!editedProfile) return;
    
    const array = [...(editedProfile[name as keyof UserProfile] as string[] || [])];
    array.splice(index, 1);
    
    setEditedProfile({
      ...editedProfile,
      [name]: array
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editedProfile) return;
    
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }
    
    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedProfile),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to update profile: ${response.status}`);
      }
      
      const data = await response.json();
      setProfile(data.user);
      setEditedProfile(data.user);
      setIsEditing(false);
      setSuccessMessage('Profile updated successfully!');
      
      // Hide success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error: any) {
      console.error('Error updating profile:', error);
      setError(error.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const cancelEdit = () => {
    setEditedProfile(profile);
    setIsEditing(false);
    setError(null);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    
    // If it's already in YYYY-MM-DD format, return as is for input fields
    if (isEditing && /^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString;
    }
    
    try {
      const date = new Date(dateString);
      return isEditing 
        ? date.toISOString().split('T')[0] // YYYY-MM-DD for inputs
        : date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
    } catch (e) {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <h2>Loading profile...</h2>
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

  if (!profile) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Profile</h1>
          <div>
            <Link href="/dashboard">Dashboard</Link>
          </div>
        </header>
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <h2>Profile not found</h2>
          <p>There was a problem loading your profile.</p>
          {error && <p style={{ color: '#ef4444' }}>{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>My Profile - Digital Healthcare Platform</title>
        <meta name="description" content="View and update your profile information" />
      </Head>

      <header className={styles.header}>
        <h1>My Profile</h1>
        <div>
          <Link href="/dashboard" style={{ marginRight: '15px' }}>Dashboard</Link>
          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)}
              className={styles.button}
            >
              Edit Profile
            </button>
          ) : (
            <button 
              onClick={cancelEdit}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#f3f4f6',
                color: '#4b5563',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          )}
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
        
        {successMessage && (
          <div style={{ 
            padding: '10px', 
            margin: '0 0 20px',
            background: '#d1fae5', 
            border: '1px solid #10b981',
            borderRadius: '8px' 
          }}>
            <p>{successMessage}</p>
          </div>
        )}

        <div className={styles.formContainer} style={{ maxWidth: '800px' }}>
          {isEditing ? (
            // Edit mode
            <form onSubmit={handleSubmit}>
              <h2 style={{ marginBottom: '20px' }}>Personal Information</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={editedProfile?.name || ''}
                    onChange={handleChange}
                    className={styles.formInput}
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={editedProfile?.email || ''}
                    onChange={handleChange}
                    className={styles.formInput}
                    required
                    disabled
                  />
                  <small style={{ color: '#6b7280' }}>Email cannot be changed</small>
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={editedProfile?.phoneNumber || ''}
                    onChange={handleChange}
                    className={styles.formInput}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="dateOfBirth">Date of Birth</label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formatDate(editedProfile?.dateOfBirth)}
                    onChange={handleChange}
                    className={styles.formInput}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    value={editedProfile?.gender || ''}
                    onChange={handleChange}
                    className={styles.formSelect}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="bloodType">Blood Type</label>
                  <select
                    id="bloodType"
                    name="bloodType"
                    value={editedProfile?.bloodType || ''}
                    onChange={handleChange}
                    className={styles.formSelect}
                  >
                    <option value="">Select blood type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>
              
              <div className={styles.formGroup} style={{ marginTop: '10px' }}>
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={editedProfile?.address || ''}
                  onChange={handleChange}
                  className={styles.formInput}
                  rows={3}
                />
              </div>
              
              <h2 style={{ margin: '30px 0 20px' }}>Medical Information</h2>
              
              <div className={styles.formGroup}>
                <label>Medical History</label>
                {editedProfile?.medicalHistory?.map((item, index) => (
                  <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleArrayChange('medicalHistory', index, e.target.value)}
                      className={styles.formInput}
                      style={{ flex: 1 }}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveArrayItem('medicalHistory', index)}
                      style={{
                        padding: '5px 10px',
                        backgroundColor: '#fee2e2',
                        color: '#b91c1c',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddArrayItem('medicalHistory')}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#f3f4f6',
                    color: '#4b5563',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginTop: '5px'
                  }}
                >
                  Add Medical History Item
                </button>
              </div>
              
              <div className={styles.formGroup}>
                <label>Allergies</label>
                {editedProfile?.allergies?.map((item, index) => (
                  <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleArrayChange('allergies', index, e.target.value)}
                      className={styles.formInput}
                      style={{ flex: 1 }}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveArrayItem('allergies', index)}
                      style={{
                        padding: '5px 10px',
                        backgroundColor: '#fee2e2',
                        color: '#b91c1c',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddArrayItem('allergies')}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#f3f4f6',
                    color: '#4b5563',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginTop: '5px'
                  }}
                >
                  Add Allergy
                </button>
              </div>
              
              <h2 style={{ margin: '30px 0 20px' }}>Emergency Contact</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className={styles.formGroup}>
                  <label htmlFor="emergencyContact.name">Contact Name</label>
                  <input
                    type="text"
                    id="emergencyContact.name"
                    name="emergencyContact.name"
                    value={editedProfile?.emergencyContact?.name || ''}
                    onChange={handleChange}
                    className={styles.formInput}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="emergencyContact.phoneNumber">Contact Phone</label>
                  <input
                    type="tel"
                    id="emergencyContact.phoneNumber"
                    name="emergencyContact.phoneNumber"
                    value={editedProfile?.emergencyContact?.phoneNumber || ''}
                    onChange={handleChange}
                    className={styles.formInput}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="emergencyContact.relationship">Relationship</label>
                  <input
                    type="text"
                    id="emergencyContact.relationship"
                    name="emergencyContact.relationship"
                    value={editedProfile?.emergencyContact?.relationship || ''}
                    onChange={handleChange}
                    className={styles.formInput}
                  />
                </div>
              </div>
              
              <h2 style={{ margin: '30px 0 20px' }}>Insurance Information</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className={styles.formGroup}>
                  <label htmlFor="insuranceInfo.provider">Insurance Provider</label>
                  <input
                    type="text"
                    id="insuranceInfo.provider"
                    name="insuranceInfo.provider"
                    value={editedProfile?.insuranceInfo?.provider || ''}
                    onChange={handleChange}
                    className={styles.formInput}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="insuranceInfo.policyNumber">Policy Number</label>
                  <input
                    type="text"
                    id="insuranceInfo.policyNumber"
                    name="insuranceInfo.policyNumber"
                    value={editedProfile?.insuranceInfo?.policyNumber || ''}
                    onChange={handleChange}
                    className={styles.formInput}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="insuranceInfo.expiryDate">Expiry Date</label>
                  <input
                    type="date"
                    id="insuranceInfo.expiryDate"
                    name="insuranceInfo.expiryDate"
                    value={formatDate(editedProfile?.insuranceInfo?.expiryDate)}
                    onChange={handleChange}
                    className={styles.formInput}
                  />
                </div>
              </div>
              
              <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={cancelEdit}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#f3f4f6',
                    color: '#4b5563',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginRight: '10px'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.button}
                  disabled={isSaving}
                  style={{ padding: '10px 20px' }}
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          ) : (
            // View mode
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                <div style={{ 
                  width: '80px', 
                  height: '80px', 
                  borderRadius: '50%', 
                  backgroundColor: '#e5e7eb',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '2rem',
                  color: '#6b7280'
                }}>
                  {profile.profileImage ? (
                    <img 
                      src={profile.profileImage} 
                      alt={profile.name} 
                      style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} 
                    />
                  ) : (
                    profile.name.charAt(0).toUpperCase()
                  )}
                </div>
                <div>
                  <h2 style={{ margin: '0 0 5px 0' }}>{profile.name}</h2>
                  <p style={{ margin: 0, color: '#6b7280' }}>{profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}</p>
                </div>
              </div>
              
              <section style={{ marginBottom: '30px' }}>
                <h3 style={{ 
                  fontSize: '1.1rem', 
                  borderBottom: '1px solid #e5e7eb',
                  paddingBottom: '10px',
                  marginBottom: '15px'
                }}>
                  Personal Information
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '15px' }}>
                  <div>
                    <h4 style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: '#6b7280' }}>Email</h4>
                    <p style={{ margin: 0 }}>{profile.email}</p>
                  </div>
                  
                  <div>
                    <h4 style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: '#6b7280' }}>Phone Number</h4>
                    <p style={{ margin: 0 }}>{profile.phoneNumber || 'Not provided'}</p>
                  </div>
                  
                  <div>
                    <h4 style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: '#6b7280' }}>Date of Birth</h4>
                    <p style={{ margin: 0 }}>{profile.dateOfBirth ? formatDate(profile.dateOfBirth) : 'Not provided'}</p>
                  </div>
                  
                  <div>
                    <h4 style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: '#6b7280' }}>Gender</h4>
                    <p style={{ margin: 0 }}>{profile.gender ? 
                      profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1) : 
                      'Not provided'}</p>
                  </div>
                  
                  <div>
                    <h4 style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: '#6b7280' }}>Blood Type</h4>
                    <p style={{ margin: 0 }}>{profile.bloodType || 'Not provided'}</p>
                  </div>
                </div>
                
                {profile.address && (
                  <div style={{ marginTop: '15px' }}>
                    <h4 style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: '#6b7280' }}>Address</h4>
                    <p style={{ margin: 0 }}>{profile.address}</p>
                  </div>
                )}
              </section>
              
              <section style={{ marginBottom: '30px' }}>
                <h3 style={{ 
                  fontSize: '1.1rem', 
                  borderBottom: '1px solid #e5e7eb',
                  paddingBottom: '10px',
                  marginBottom: '15px'
                }}>
                  Medical Information
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                  <div>
                    <h4 style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: '#6b7280' }}>Medical History</h4>
                    {profile.medicalHistory && profile.medicalHistory.length > 0 ? (
                      <ul style={{ margin: 0, paddingLeft: '20px' }}>
                        {profile.medicalHistory.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p style={{ margin: 0 }}>No medical history provided</p>
                    )}
                  </div>
                  
                  <div>
                    <h4 style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: '#6b7280' }}>Allergies</h4>
                    {profile.allergies && profile.allergies.length > 0 ? (
                      <ul style={{ margin: 0, paddingLeft: '20px' }}>
                        {profile.allergies.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p style={{ margin: 0 }}>No allergies provided</p>
                    )}
                  </div>
                </div>
              </section>
              
              {profile.emergencyContact && (
                <section style={{ marginBottom: '30px' }}>
                  <h3 style={{ 
                    fontSize: '1.1rem', 
                    borderBottom: '1px solid #e5e7eb',
                    paddingBottom: '10px',
                    marginBottom: '15px'
                  }}>
                    Emergency Contact
                  </h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
                    <div>
                      <h4 style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: '#6b7280' }}>Name</h4>
                      <p style={{ margin: 0 }}>{profile.emergencyContact.name || 'Not provided'}</p>
                    </div>
                    
                    <div>
                      <h4 style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: '#6b7280' }}>Phone Number</h4>
                      <p style={{ margin: 0 }}>{profile.emergencyContact.phoneNumber || 'Not provided'}</p>
                    </div>
                    
                    <div>
                      <h4 style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: '#6b7280' }}>Relationship</h4>
                      <p style={{ margin: 0 }}>{profile.emergencyContact.relationship || 'Not provided'}</p>
                    </div>
                  </div>
                </section>
              )}
              
              {profile.insuranceInfo && (
                <section>
                  <h3 style={{ 
                    fontSize: '1.1rem', 
                    borderBottom: '1px solid #e5e7eb',
                    paddingBottom: '10px',
                    marginBottom: '15px'
                  }}>
                    Insurance Information
                  </h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
                    <div>
                      <h4 style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: '#6b7280' }}>Provider</h4>
                      <p style={{ margin: 0 }}>{profile.insuranceInfo.provider || 'Not provided'}</p>
                    </div>
                    
                    <div>
                      <h4 style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: '#6b7280' }}>Policy Number</h4>
                      <p style={{ margin: 0 }}>{profile.insuranceInfo.policyNumber || 'Not provided'}</p>
                    </div>
                    
                    <div>
                      <h4 style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: '#6b7280' }}>Expiry Date</h4>
                      <p style={{ margin: 0 }}>{profile.insuranceInfo.expiryDate ? 
                        formatDate(profile.insuranceInfo.expiryDate) : 
                        'Not provided'}</p>
                    </div>
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 