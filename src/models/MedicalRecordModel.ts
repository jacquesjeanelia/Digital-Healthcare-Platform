import mongoose, { Schema, Document, Types } from 'mongoose';
import { MedicalRecord, Medication, TestResult, Attachment } from './MedicalRecord';

interface IMedicalRecord extends Omit<MedicalRecord, 'id'>, Document {}
interface IMedication extends Medication, Document {}
interface ITestResult extends TestResult, Document {}
interface IAttachment extends Attachment, Document {}

const medicationSchema = new Schema<IMedication>({
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  frequency: { type: String, required: true },
  duration: { type: String, required: true },
  instructions: String,
  startDate: { type: Date, required: true },
  endDate: Date,
});

const testResultSchema = new Schema<ITestResult>({
  testName: { type: String, required: true },
  testDate: { type: Date, required: true },
  result: { type: String, required: true },
  normalRange: String,
  interpretation: String,
  fileUrl: String,
});

const attachmentSchema = new Schema<IAttachment>({
  name: { type: String, required: true },
  type: { type: String, required: true, enum: ['image', 'pdf', 'document', 'other'] },
  url: { type: String, required: true },
  size: { type: Number, required: true },
  uploadedAt: { type: Date, required: true },
});

const medicalRecordSchema = new Schema<IMedicalRecord>({
  patientId: { type: Types.ObjectId, ref: 'User', required: true },
  doctorId: { type: Types.ObjectId, ref: 'User', required: true },
  appointmentId: { type: Types.ObjectId, ref: 'Appointment' },
  date: { type: Date, required: true },
  diagnosis: { type: String, required: true },
  symptoms: [{ type: String, required: true }],
  treatment: { type: String, required: true },
  medications: [medicationSchema],
  testResults: [testResultSchema],
  notes: String,
  followUpRequired: { type: Boolean, required: true, default: false },
  followUpDate: Date,
  attachments: [attachmentSchema],
}, { timestamps: true });

// Add indexes for better query performance
medicalRecordSchema.index({ patientId: 1, date: -1 });
medicalRecordSchema.index({ doctorId: 1, date: -1 });
medicalRecordSchema.index({ appointmentId: 1 });

const MedicalRecordModel = mongoose.model<IMedicalRecord>('MedicalRecord', medicalRecordSchema);

export default MedicalRecordModel; 