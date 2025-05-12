import bcrypt from 'bcryptjs';
import clientPromise from '../config/mongodb.js';
import mongoose from 'mongoose';

const COLLECTION_NAME = 'users';
const PRESCRIPTIONS_COLLECTION = 'Prescriptions';

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

// Update timestamps on save
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model('User', userSchema);

export async function createUser(userData) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection(COLLECTION_NAME);

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);

  const user = {
    ...userData,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const result = await collection.insertOne(user);
  return { ...user, _id: result.insertedId };
}

export async function findUserByEmail(email) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection(COLLECTION_NAME);
  return collection.findOne({ email });
}

export async function findUserById(id) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection(COLLECTION_NAME);
  return collection.findOne({ _id: id });
}

export async function matchPassword(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

export async function addPrescription(userId, prescriptionData) {
  try {
    console.log('Adding prescription for user:', userId);
    console.log('Prescription data:', prescriptionData);

    const client = await clientPromise;
    console.log('MongoDB client connected');

    const db = client.db('test');
    console.log('Using test database');

    const collection = db.collection(PRESCRIPTIONS_COLLECTION);
    console.log('Using Prescriptions collection');

    const prescription = {
      ...prescriptionData,
      userId,
      createdAt: new Date()
    };

    console.log('Final prescription document:', prescription);

    const result = await collection.insertOne(prescription);
    console.log('Insert result:', result);

    return { ...prescription, _id: result.insertedId };
  } catch (error) {
    console.error('Error in addPrescription:', error);
    throw error;
  }
}

export async function getPrescriptions(userId) {
  const client = await clientPromise;
  const db = client.db('test');
  const collection = db.collection(PRESCRIPTIONS_COLLECTION);
  return collection.find({ userId }).toArray();
}

// Create a notification
export const createNotification = async (userId, notificationData) => {
  try {
    const client = await clientPromise;
    const db = client.db('test');
    const collection = db.collection('Notifications');

    const notification = {
      userId,
      ...notificationData,
      read: false,
      createdAt: new Date()
    };

    const result = await collection.insertOne(notification);
    return { ...notification, _id: result.insertedId };
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
}; 