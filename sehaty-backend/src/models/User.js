import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: String,
  role: {
    type: String,
    enum: ['patient', 'doctor', 'clinic'],
    required: true
  },
  // Patient specific fields
  dateOfBirth: Date,
  gender: String,
  address: String,
  insuranceProvider: String,
  
  // Provider specific fields
  clinicName: String,
  specialty: String,
  location: String,
  licenseNumber: String,
  website: String,
  contactInfo: String
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User; 