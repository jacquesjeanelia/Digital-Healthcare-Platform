import mongoose, { Schema, Document } from 'mongoose';
import { Appointment } from './Appointment';

interface IAppointment extends Omit<Appointment, 'id'>, Document {}

const appointmentSchema = new Schema<IAppointment>({
  patientId: { type: String, ref: 'User', required: true },
  doctorId: { type: String, ref: 'User', required: true },
  dateTime: { type: Date, required: true },
  duration: { type: Number, required: true }, // In minutes
  status: { 
    type: String, 
    required: true, 
    enum: ['scheduled', 'confirmed', 'in-progress', 'completed', 'cancelled', 'no-show'] 
  },
  type: { 
    type: String, 
    required: true, 
    enum: ['general-checkup', 'follow-up', 'consultation', 'emergency', 'vaccination', 'telemedicine'] 
  },
  notes: String,
  symptoms: [{ type: String }],
  reasonForVisit: { type: String, required: true },
  virtualMeetingLink: String,
  location: String,
}, { timestamps: true });

// Add indexes for better query performance
appointmentSchema.index({ patientId: 1, dateTime: 1 });
appointmentSchema.index({ doctorId: 1, dateTime: 1 });
appointmentSchema.index({ status: 1, dateTime: 1 });

// Check if model already exists to prevent OverwriteModelError
const AppointmentModel = mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', appointmentSchema);

export default AppointmentModel; 