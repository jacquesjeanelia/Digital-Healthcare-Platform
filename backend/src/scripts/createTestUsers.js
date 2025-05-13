import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

// Load environment variables
dotenv.config();

const createTestUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if test users already exist
    const testDoctor = await User.findOne({ email: 'test.doctor@sehaty.com' });
    const testPatient = await User.findOne({ email: 'test.patient@sehaty.com' });

    if (!testDoctor) {
      // Create test doctor
      const doctorData = {
        name: 'Test Doctor',
        email: 'test.doctor@sehaty.com',
        password: 'test123',
        role: 'doctor',
        phoneNumber: '+1234567890',
        specialty: 'General Medicine',
        location: 'Test Hospital',
        licenseNumber: 'TEST123',
        contactInfo: 'Contact via email',
        verificationStatus: 'approved'
      };

      const doctor = new User(doctorData);
      await doctor.save();
      console.log('Test doctor created successfully');
    } else {
      console.log('Test doctor already exists');
    }

    if (!testPatient) {
      // Create test patient
      const patientData = {
        name: 'Test Patient',
        email: 'test.patient@sehaty.com',
        password: 'test123',
        role: 'patient',
        phoneNumber: '+1234567891',
        dateOfBirth: '1990-01-01',
        gender: 'Male',
        address: '123 Test Street',
        insuranceProvider: 'Test Insurance'
      };

      const patient = new User(patientData);
      await patient.save();
      console.log('Test patient created successfully');
    } else {
      console.log('Test patient already exists');
    }

    console.log('Test users setup completed');
    process.exit(0);
  } catch (error) {
    console.error('Error creating test users:', error);
    process.exit(1);
  }
};

createTestUsers(); 