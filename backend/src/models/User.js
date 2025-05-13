import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema({
  medication: {
    type: String,
    required: true
  },
  dosage: {
    type: String,
    required: true
  },
  frequency: {
    type: String,
    required: true,
    enum: ['once_daily', 'twice_daily', 'three_times_daily', 'four_times_daily', 'as_needed']
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['patient', 'doctor', 'clinic'], required: true },
  phoneNumber: String,
  dateOfBirth: Date,
  gender: String,
  address: String,
  insuranceProvider: String,
  appointments: [{
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: Date,
    time: String,
    status: { type: String, enum: ['scheduled', 'completed', 'cancelled'] },
    notes: String
  }],
  prescriptions: [prescriptionSchema],
  healthRecords: [{
    type: { type: String, enum: ['lab_result', 'diagnosis', 'treatment', 'vaccination'] },
    date: Date,
    provider: String,
    description: String,
    attachments: [String]
  }],
  recentActivities: [{
    type: { type: String, enum: ['appointment', 'prescription', 'record', 'login'] },
    description: String,
    date: { type: Date, default: Date.now },
    relatedId: mongoose.Schema.Types.ObjectId
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.updatedAt = Date.now();
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export async function createUser(userData) {
  try {
    const user = new User(userData);
    await user.save();
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function findUserByEmail(email) {
  try {
    return await User.findOne({ email });
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw error;
  }
}

export async function findUserById(id) {
  try {
    return await User.findById(id);
  } catch (error) {
    console.error('Error finding user by id:', error);
    throw error;
  }
}

export async function matchPassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

export default User; 