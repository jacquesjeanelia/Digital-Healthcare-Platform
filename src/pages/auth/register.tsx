import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    role: 'patient',
    dateOfBirth: '',
    phoneNumber: '',
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
  const [ageError, setAgeError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear age error when date changes
    if (name === 'dateOfBirth') {
      setAgeError('');
    }
  };

  const validateAge = (dob: string): boolean => {
    if (!dob) return false;
    
    const birthDate = new Date(dob);
    const today = new Date();
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age >= 16;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setAgeError('');
    
    // Validation
    if (formData.password !== formData.passwordConfirm) {
      setError("Passwords don't match");
      return;
    }
    
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    
    // Age verification
    if (formData.dateOfBirth && !validateAge(formData.dateOfBirth)) {
      setAgeError("You must be at least 16 years old to register");
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
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender,
          phoneNumber: formData.phoneNumber,
          ...(formData.role === 'doctor' && {
            specialization: formData.specialization,
            license: formData.license,
            yearsOfExperience: formData.yearsOfExperience,
            hospital: formData.hospital,
            department: formData.department,
          }),
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
      }, 1500);
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'An unexpected error occurred');
      setLoading(false);
    }
  };

  if (registerSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <Head>
          <title>Registration Successful - Sehaty</title>
          <meta name="description" content="Your account has been created successfully" />
        </Head>
        <Card className="w-full max-w-md p-8 bg-white rounded-xl shadow-md">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#a918fd1a] rounded-full mx-auto flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#a818fc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful</h1>
            <p className="text-gray-600 mb-4">Your account has been created successfully</p>
            <p className="text-gray-600">Redirecting to homepage...</p>
            <div className="mx-auto mt-6 w-12 h-12 border-4 border-gray-200 border-t-[#a818fc] rounded-full animate-spin"></div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <Head>
        <title>Sign Up - Sehaty</title>
        <meta name="description" content="Create your Sehaty account" />
      </Head>

      <Card className="w-full max-w-md p-6 bg-white rounded-xl shadow-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Create an Account</h1>
          <p className="text-gray-600 mt-1">Join Sehaty and manage your healthcare easily</p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a818fc] focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a818fc] focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a818fc] focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a818fc] focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth <span className="text-xs text-gray-500">(Must be 16+ years old)</span>
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a818fc] focus:border-transparent"
            />
            {ageError && (
              <p className="mt-1 text-sm text-red-600">
                {ageError}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a818fc] focus:border-transparent"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a818fc] focus:border-transparent"
            />
          </div>

          <div>
            <p className="block text-sm font-medium text-gray-700 mb-2">Account Type</p>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="patient"
                  checked={formData.role === 'patient'}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#a818fc] focus:ring-[#a818fc]"
                />
                <span className="ml-2 text-gray-700">Patient</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="doctor"
                  checked={formData.role === 'doctor'}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#a818fc] focus:ring-[#a818fc]"
                />
                <span className="ml-2 text-gray-700">Doctor</span>
              </label>
            </div>
          </div>

          {formData.role === 'doctor' && (
            <div className="space-y-4 mt-4 pt-4 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-800">Professional Information</h3>
              
              <div>
                <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">
                  Specialization
                </label>
                <input
                  type="text"
                  id="specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a818fc] focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="license" className="block text-sm font-medium text-gray-700 mb-1">
                  License Number
                </label>
                <input
                  type="text"
                  id="license"
                  name="license"
                  value={formData.license}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a818fc] focus:border-transparent"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700 mb-1">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    id="yearsOfExperience"
                    name="yearsOfExperience"
                    value={formData.yearsOfExperience}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a818fc] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a818fc] focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="hospital" className="block text-sm font-medium text-gray-700 mb-1">
                  Hospital/Clinic
                </label>
                <input
                  type="text"
                  id="hospital"
                  name="hospital"
                  value={formData.hospital}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a818fc] focus:border-transparent"
                />
              </div>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full mt-6"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-[#a818fc] hover:text-[#8a14d4] font-medium">
            Login here
          </Link>
        </p>
      </Card>
    </div>
  );
} 