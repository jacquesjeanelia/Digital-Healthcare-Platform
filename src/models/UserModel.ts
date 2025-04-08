import mongoose, { Schema, Document, Model } from 'mongoose';
import { User, Patient, Doctor } from './User';

interface IUser extends Omit<User, 'id'>, Document {}
interface IPatient extends Omit<Patient, 'id'>, Document {}
interface IDoctor extends Omit<Doctor, 'id'>, Document {}

// Define schemas outside any conditional blocks
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['patient', 'doctor', 'admin'] },
  profileImage: { type: String },
  phoneNumber: { type: String },
  address: { type: String },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ['male', 'female', 'other', 'prefer-not-to-say'] },
}, { timestamps: true });

const patientSchema = new Schema<IPatient>({
  medicalHistory: [{ type: String }],
  allergies: [{ type: String }],
  emergencyContact: {
    name: String,
    phoneNumber: String,
    relationship: String,
  },
  bloodType: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
  insuranceInfo: {
    provider: String,
    policyNumber: String,
    expiryDate: Date,
  },
});

const doctorSchema = new Schema<IDoctor>({
  specialization: { type: String, required: true },
  license: { type: String, required: true },
  yearsOfExperience: { type: Number, required: true },
  availability: [{
    days: [{ type: String }],
    startTime: String,
    endTime: String,
  }],
  hospital: String,
  department: String,
  ratings: Number,
  education: [{
    degree: String,
    institution: String,
    year: Number,
  }],
});

// Helper function to create models safely
function getModels() {
  // Check for existing models first
  if (mongoose.models.User) {
    return {
      UserModel: mongoose.models.User as Model<IUser>,
      PatientModel: mongoose.models.Patient as Model<IPatient>,
      DoctorModel: mongoose.models.Doctor as Model<IDoctor>,
    };
  }

  // Create base model
  const UserModel = mongoose.model<IUser>('User', userSchema);
  
  // Create discriminators
  const PatientModel = UserModel.discriminator<IPatient>('Patient', patientSchema);
  const DoctorModel = UserModel.discriminator<IDoctor>('Doctor', doctorSchema);
  
  return { UserModel, PatientModel, DoctorModel };
}

// Export the models
const { UserModel, PatientModel, DoctorModel } = getModels();
export { UserModel, PatientModel, DoctorModel }; 