import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the shape of the user object
export interface User {
  id: string;
  name: string;
  email: string;
  role: "patient" | "doctor" | "admin" | "clinic";
  phone?: string;
  specialization?: string;
  bio?: string;
  consultationFee?: string;
  availability?: {
    [key: string]: {
      start: string;
      end: string;
    };
  };
  verificationStatus?: "pending" | "approved" | "rejected";
  // Patient specific fields
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  insuranceProvider?: string;
  bloodType?: string;
  allergies?: string[];
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  medicalHistory?: Array<{
    condition: string;
    diagnosed: string;
    status: string;
  }>;
  // Provider specific fields
  clinicName?: string;
  specialty?: string;
  location?: string;
  licenseNumber?: string;
  website?: string;
  contactInfo?: string;
  dashboardData?: {
    appointments: {
      total: number;
      upcoming: number;
      list: Array<{
        patientId?: { name: string; age: number; gender: string };
        doctorId?: { name: string; specialty: string };
        date: string;
        time: string;
        status: string;
        type?: string;
        notes?: string;
      }>;
    };
    patients?: {
      total: number;
      active: number;
      list: Array<{
        id: string;
        name: string;
        age: number;
        gender: string;
        lastVisit: string;
        nextAppointment: string;
        status: string;
      }>;
    };
    prescriptions: {
      total: number;
      active: number;
      list: Array<{
        patientId?: { name: string; age: number };
        doctorId?: { name: string; specialty: string };
        medication: string;
        dosage: string;
        frequency: string;
        startDate: string;
        endDate: string;
        status: string;
        notes?: string;
      }>;
    };
    healthRecords?: {
      total: number;
      recent: Array<{
        type: string;
        date: string;
        provider: string;
        description: string;
        attachments: string[];
      }>;
    };
    analytics?: {
      monthlyStats: {
        totalAppointments: number;
        completedAppointments: number;
        newPatients: number;
        prescriptionsIssued: number;
        averageRating: number;
      };
      weeklySchedule: {
        monday: number;
        tuesday: number;
        wednesday: number;
        thursday: number;
        friday: number;
      };
    };
    recentActivities: Array<{
      type: string;
      description: string;
      date: string;
      relatedId: string;
    }>;
  };
}

// Define the shape of the registration data
interface RegisterData {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: 'patient' | 'doctor' | 'clinic';
  // Patient specific fields
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  insuranceProvider?: string;
  // Provider specific fields
  clinicName?: string;
  specialty?: string;
  location?: string;
  licenseNumber?: string;
  website?: string;
  contactInfo?: string;
}

// Define the shape of the auth context
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Mock user data
const mockUsers: Record<string, User> = {
  'test.doctor@sehaty.com': {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'test.doctor@sehaty.com',
    role: 'doctor',
    phone: '+1234567890',
    specialty: 'General Medicine',
    location: 'City General Hospital',
    licenseNumber: 'TEST123',
    contactInfo: 'Available Mon-Fri, 9 AM - 5 PM',
    verificationStatus: 'approved',
    bio: 'Experienced general practitioner with over 10 years of practice. Specializing in preventive care and chronic disease management.',
    consultationFee: '$100',
    availability: {
      'Monday': { start: '09:00', end: '17:00' },
      'Tuesday': { start: '09:00', end: '17:00' },
      'Wednesday': { start: '09:00', end: '17:00' },
      'Thursday': { start: '09:00', end: '17:00' },
      'Friday': { start: '09:00', end: '17:00' }
    },
    dashboardData: {
      appointments: {
        total: 25,
        upcoming: 8,
        list: [
          {
            patientId: { name: 'John Smith', age: 45, gender: 'Male' },
            date: '2024-03-30',
            time: '10:00 AM',
            status: 'scheduled',
            type: 'regular',
            notes: 'Regular checkup'
          },
          {
            patientId: { name: 'Emma Wilson', age: 32, gender: 'Female' },
            date: '2024-03-30',
            time: '11:30 AM',
            status: 'scheduled',
            type: 'follow-up',
            notes: 'Post-surgery follow-up'
          },
          {
            patientId: { name: 'Michael Brown', age: 58, gender: 'Male' },
            date: '2024-03-30',
            time: '02:00 PM',
            status: 'scheduled',
            type: 'urgent',
            notes: 'Blood pressure check'
          }
        ]
      },
      patients: {
        total: 150,
        active: 120,
        list: [
          {
            id: '1',
            name: 'John Smith',
            age: 45,
            gender: 'Male',
            lastVisit: '2024-03-15',
            nextAppointment: '2024-03-30',
            status: 'active'
          },
          {
            id: '2',
            name: 'Emma Wilson',
            age: 32,
            gender: 'Female',
            lastVisit: '2024-03-10',
            nextAppointment: '2024-03-30',
            status: 'active'
          }
        ]
      },
      prescriptions: {
        total: 45,
        active: 30,
        list: [
          {
            patientId: { name: 'John Smith', age: 45 },
            medication: 'Metformin',
            dosage: '1000mg',
            frequency: 'Twice daily',
            startDate: '2024-03-01',
            endDate: '2024-06-01',
            status: 'active',
            notes: 'Take with meals'
          },
          {
            patientId: { name: 'Emma Wilson', age: 32 },
            medication: 'Amoxicillin',
            dosage: '500mg',
            frequency: 'Three times daily',
            startDate: '2024-03-25',
            endDate: '2024-04-01',
            status: 'active',
            notes: 'Take after meals'
          }
        ]
      },
      analytics: {
        monthlyStats: {
          totalAppointments: 120,
          completedAppointments: 110,
          newPatients: 15,
          prescriptionsIssued: 45,
          averageRating: 4.8
        },
        weeklySchedule: {
          monday: 8,
          tuesday: 7,
          wednesday: 9,
          thursday: 8,
          friday: 6
        }
      },
      recentActivities: [
        {
          type: 'appointment',
          description: 'Completed appointment with John Smith',
          date: '2024-03-28',
          relatedId: 'apt1'
        },
        {
          type: 'prescription',
          description: 'Prescribed Amoxicillin to Emma Wilson',
          date: '2024-03-25',
          relatedId: 'pres1'
        },
        {
          type: 'patient',
          description: 'New patient registration: Michael Brown',
          date: '2024-03-24',
          relatedId: 'pat1'
        }
      ]
    }
  },
  'test.patient@sehaty.com': {
    id: '2',
    name: 'John Smith',
    email: 'test.patient@sehaty.com',
    role: 'patient',
    phone: '+1234567891',
    dateOfBirth: '1990-01-01',
    gender: 'Male',
    address: '123 Health Street, Medical District',
    insuranceProvider: 'Blue Cross Health Insurance',
    bloodType: 'O+',
    allergies: ['Penicillin', 'Pollen'],
    emergencyContact: {
      name: 'Jane Smith',
      relationship: 'Spouse',
      phone: '+1234567892'
    },
    medicalHistory: [
      {
        condition: 'Hypertension',
        diagnosed: '2020-05-15',
        status: 'Under Control'
      },
      {
        condition: 'Type 2 Diabetes',
        diagnosed: '2019-03-10',
        status: 'Managed'
      }
    ],
    dashboardData: {
      appointments: {
        total: 3,
        upcoming: 2,
        list: [
          {
            doctorId: { name: 'Dr. Sarah Johnson', specialty: 'General Medicine' },
            date: '2024-03-30',
            time: '10:00 AM',
            status: 'scheduled',
            notes: 'Regular checkup'
          },
          {
            doctorId: { name: 'Dr. Michael Brown', specialty: 'Cardiology' },
            date: '2024-04-02',
            time: '02:30 PM',
            status: 'scheduled',
            notes: 'Heart condition follow-up'
          }
        ]
      },
      prescriptions: {
        total: 2,
        active: 2,
        list: [
          {
            doctorId: { name: 'Dr. Sarah Johnson', specialty: 'General Medicine' },
            medication: 'Metformin',
            dosage: '1000mg',
            frequency: 'Twice daily',
            startDate: '2024-03-01',
            endDate: '2024-06-01',
            status: 'active',
            notes: 'Take with meals'
          },
          {
            doctorId: { name: 'Dr. Michael Brown', specialty: 'Cardiology' },
            medication: 'Lisinopril',
            dosage: '10mg',
            frequency: 'Once daily',
            startDate: '2024-02-15',
            endDate: '2024-05-15',
            status: 'active',
            notes: 'Take in the morning'
          }
        ]
      },
      healthRecords: {
        total: 4,
        recent: [
          {
            type: 'Lab Results',
            date: '2024-03-15',
            provider: 'City General Hospital',
            description: 'Blood work results',
            attachments: ['blood_work_20240315.pdf']
          },
          {
            type: 'Checkup',
            date: '2024-03-01',
            provider: 'Dr. Sarah Johnson',
            description: 'Regular checkup',
            attachments: []
          }
        ]
      },
      recentActivities: [
        {
          type: 'appointment',
          description: 'Scheduled appointment with Dr. Sarah Johnson',
          date: '2024-03-28',
          relatedId: 'apt1'
        },
        {
          type: 'prescription',
          description: 'Prescribed Metformin',
          date: '2024-03-01',
          relatedId: 'pres1'
        },
        {
          type: 'healthRecord',
          description: 'Added new lab results',
          date: '2024-03-15',
          relatedId: 'rec1'
        }
      ]
    }
  }
};

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth token
        const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Check if it's a test user
      if (email === 'test.doctor@sehaty.com' || email === 'test.patient@sehaty.com') {
        if (password !== 'test123') {
          throw new Error('Invalid credentials');
      }
        const userData = mockUsers[email];
        setUser(userData);
        localStorage.setItem("token", "mock-token");
        localStorage.setItem("user", JSON.stringify(userData));
        return;
      }

      // For other users, simulate failed login
      throw new Error('Invalid credentials');
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simulate successful registration
      const userData: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: data.name,
        email: data.email,
        role: data.role,
        phone: data.phoneNumber,
        ...(data.role === 'patient' && {
          dateOfBirth: data.dateOfBirth,
          gender: data.gender,
          address: data.address,
          insuranceProvider: data.insuranceProvider,
        }),
        ...(data.role === 'doctor' && {
          specialty: data.specialty,
          location: data.location,
          licenseNumber: data.licenseNumber,
          contactInfo: data.contactInfo,
        }),
        ...(data.role === 'clinic' && {
          clinicName: data.clinicName,
          specialty: data.specialty,
          location: data.location,
          licenseNumber: data.licenseNumber,
          contactInfo: data.contactInfo,
        })
      };
      
      setUser(userData);
      localStorage.setItem("token", "mock-token");
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 