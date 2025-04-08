export type AppointmentStatus = 
  | 'scheduled' 
  | 'confirmed' 
  | 'in-progress' 
  | 'completed' 
  | 'cancelled' 
  | 'no-show';

export type AppointmentType = 
  | 'general-checkup' 
  | 'follow-up' 
  | 'consultation' 
  | 'emergency' 
  | 'vaccination' 
  | 'telemedicine';

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  dateTime: Date;
  duration: number; // In minutes
  status: AppointmentStatus;
  type: AppointmentType;
  notes?: string;
  symptoms?: string[];
  reasonForVisit: string;
  virtualMeetingLink?: string;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AppointmentWithDetails extends Appointment {
  patient: {
    id: string;
    name: string;
    email: string;
    profileImage?: string;
  };
  doctor: {
    id: string;
    name: string;
    specialization: string;
    profileImage?: string;
  };
} 