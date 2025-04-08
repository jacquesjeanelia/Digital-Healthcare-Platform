export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  appointmentId?: string;
  date: Date;
  diagnosis: string;
  symptoms: string[];
  treatment: string;
  medications?: Medication[];
  testResults?: TestResult[];
  notes?: string;
  followUpRequired: boolean;
  followUpDate?: Date;
  attachments?: Attachment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
  startDate: Date;
  endDate?: Date;
}

export interface TestResult {
  testName: string;
  testDate: Date;
  result: string;
  normalRange?: string;
  interpretation?: string;
  fileUrl?: string;
}

export interface Attachment {
  name: string;
  type: 'image' | 'pdf' | 'document' | 'other';
  url: string;
  size: number; // In bytes
  uploadedAt: Date;
} 