export type UserRole = 'patient' | 'doctor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password?: string; // Not returned in API responses
  profileImage?: string;
  phoneNumber?: string;
  address?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  createdAt: Date;
  updatedAt: Date;
}

export interface Patient extends User {
  role: 'patient';
  medicalHistory?: string[];
  allergies?: string[];
  emergencyContact?: {
    name: string;
    phoneNumber: string;
    relationship: string;
  };
  bloodType?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  insuranceInfo?: {
    provider: string;
    policyNumber: string;
    expiryDate: Date;
  };
}

export interface Doctor extends User {
  role: 'doctor';
  specialization: string;
  license: string;
  yearsOfExperience: number;
  availability?: {
    days: string[];
    startTime: string;
    endTime: string;
  }[];
  hospital?: string;
  department?: string;
  ratings?: number;
  education?: {
    degree: string;
    institution: string;
    year: number;
  }[];
} 