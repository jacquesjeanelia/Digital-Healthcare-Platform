import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/AuthContext';
import './Register.css';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  role: 'patient' | 'doctor';
  providerInfo: {
    location: string;
    specialty: string;
    workingHours: string;
    clinicName: string;
    contactInfo: string;
  };
}

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'patient',
    providerInfo: {
      location: '',
      specialty: '',
      workingHours: '',
      clinicName: '',
      contactInfo: ''
    }
  });

  const navigate = useNavigate();
  const { register, isLoading: authLoading } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('providerInfo.')) {
      setFormData(prev => ({
        ...prev,
        providerInfo: {
          ...prev.providerInfo,
          [name.replace('providerInfo.', '')]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsLoading(true);
      await register(formData);
      navigate("/dashboard");
    } catch (error) {
      setErrors({
        general: 'Registration failed. Please try again later.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one uppercase letter";
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one lowercase letter";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?\d{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number (e.g., +201234567890)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('providerInfo.')) {
      setFormData(prev => ({
        ...prev,
        providerInfo: {
          ...prev.providerInfo,
          [name.replace('providerInfo.', '')]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      await register(formData);
      navigate("/");
    } catch (err: any) {
      setErrors({
        ...errors,
        general: err.message || "Registration failed. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 flex items-center justify-center min-h-screen py-8">
      <div className="w-full max-w-md px-4">
        <div className="flex flex-col items-center mb-8">
          <img 
            src="/logo.svg"
            alt="Sehaty"
            className="h-12 w-auto"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <a
              href="/login"
              className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
            >
              Sign in
            </a>
          </p>
        </div>

        <Card className="w-full">
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Account Type
                </label>
                <div className="mt-1">
                  <button
                    type="button"
                    onClick={() => setIsProvider(false)}
                    className={`w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      !isProvider ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : ''
                    }`}
                  >
                    Patient
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsProvider(true)}
                    className={`w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      isProvider ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : ''
                    }`}
                  >
                    Healthcare Provider
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 dark:focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 dark:focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 dark:focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>
                )}
              </div>

              {isProvider && (
                <div>
                  <label htmlFor="providerInfo.location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Location
                  </label>
                  <Input
                    id="providerInfo.location"
                    name="providerInfo.location"
                    type="text"
                    required
                    value={formData.providerInfo.location}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 dark:focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  {errors['providerInfo.location'] && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors['providerInfo.location']}</p>
                  )}
                </div>
              )}

              {isProvider && (
                <div>
                  <label htmlFor="providerInfo.specialty" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Specialty
                  </label>
                  <Input
                    id="providerInfo.specialty"
                    name="providerInfo.specialty"
                    type="text"
                    required
                    value={formData.providerInfo.specialty}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 dark:focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  {errors['providerInfo.specialty'] && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors['providerInfo.specialty']}</p>
                  )}
                </div>
              )}

              {isProvider && (
                <div>
                  <label htmlFor="providerInfo.workingHours" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Working Hours
                  </label>
                  <Input
                    id="providerInfo.workingHours"
                    name="providerInfo.workingHours"
                    type="text"
                    required
                    value={formData.providerInfo.workingHours}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 dark:focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  {errors['providerInfo.workingHours'] && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors['providerInfo.workingHours']}</p>
                  )}
                </div>
              )}

              {isProvider && (
                <div>
                  <label htmlFor="providerInfo.clinicName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Clinic Name (Optional)
                  </label>
                  <Input
                    id="providerInfo.clinicName"
                    name="providerInfo.clinicName"
                    type="text"
                    value={formData.providerInfo.clinicName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 dark:focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              )}

              {isProvider && (
                <div>
                  <label htmlFor="providerInfo.contactInfo" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Contact Information
                  </label>
                  <Input
                    id="providerInfo.contactInfo"
                    name="providerInfo.contactInfo"
                    type="text"
                    required
                    value={formData.providerInfo.contactInfo}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 dark:focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  {errors['providerInfo.contactInfo'] && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors['providerInfo.contactInfo']}</p>
                  )}
                </div>
              )}

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="mt-1 relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 dark:focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-500"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 dark:focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-500"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword}</p>
                )}
              </div>

              <div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {isLoading ? 'Creating account...' : 'Create account'}
                </Button>
              </div>

              {errors.general && (
                <div className="text-center text-red-600 dark:text-red-400">
                  {errors.general}
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );            src="/logo-colored.svg" 
            alt="Sehaty" 
            className="w-16 h-16 mb-2" 
          />
          <h1 className="text-2xl font-bold text-blue-900 dark:text-white">Create an Account</h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
            Join Sehaty to start managing your healthcare
          </p>
        </div>

        <Card className="dark:bg-gray-800">
          <CardContent className="p-6">
            {errors.general && (
              <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-md mb-4">
                {errors.general}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white dark:bg-gray-700"
                  required
                />
                {errors.name && (
                  <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white dark:bg-gray-700"
                  required
                />
                {errors.email && (
                  <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="+201234567890"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-white dark:bg-gray-700"
                  required
                />
                {errors.phone && (
                  <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-white dark:bg-gray-700"
                  required
                />
                {errors.password && (
                  <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    className="mb-2"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
                      </svg>
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              <div>
                <label htmlFor="medicalHistory" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Medical History (optional)
                </label>
                <textarea
                  id="medicalHistory"
                  name="medicalHistory"
                  rows={3}
                  value={formData.medicalHistory}
                  onChange={handleChange}
                  className="w-full bg-white dark:bg-gray-700 p-2 rounded-md text-gray-900 dark:text-white"
                  placeholder="Any existing medical conditions or allergies..."
                />
              </div>

              <div>
                <label htmlFor="preferences" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Preferences (optional)
                </label>
                <textarea
                  id="preferences"
                  name="preferences"
                  rows={3}
                  value={formData.preferences}
                  onChange={handleChange}
                  className="w-full bg-white dark:bg-gray-700 p-2 rounded-md text-gray-900 dark:text-white"
                  placeholder="Preferred appointment times, language preferences..."
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 dark:bg-blue-700 text-white font-bold rounded-lg py-3 hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
                disabled={isLoading || authLoading}
              >
                {isLoading || authLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Already have an account?{' '}
                  <a href="/auth/login" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                    Sign in
                  </a>
                </p>
              </div>
            </form>

            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full border-gray-300 dark:border-gray-700 flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                onClick={() => navigate("/auth/doctor-login")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#4caf96]">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                </svg>
                <span>I am a Healthcare Provider</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}; 