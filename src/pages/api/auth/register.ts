import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connectDB from '@/utils/mongodb';
import { UserModel, PatientModel, DoctorModel } from '@/models/UserModel';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();

    const {
      name,
      email,
      password,
      role,
      phoneNumber,
      dateOfBirth,
      gender,
      // Doctor-specific fields
      specialization,
      license,
      yearsOfExperience,
      hospital,
      department
    } = req.body;

    // Validate required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validate doctor-specific fields if role is doctor
    if (role === 'doctor') {
      if (!specialization || !license || !yearsOfExperience) {
        return res.status(400).json({ message: 'Missing required doctor fields' });
      }
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user based on role
    let user;
    if (role === 'patient') {
      user = await PatientModel.create({
        name,
        email,
        password: hashedPassword,
        role,
        phoneNumber,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
        gender
      });
    } else if (role === 'doctor') {
      user = await DoctorModel.create({
        name,
        email,
        password: hashedPassword,
        role,
        phoneNumber,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
        gender,
        specialization,
        license,
        yearsOfExperience: Number(yearsOfExperience),
        hospital,
        department
      });
    } else {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // Create JWT token
    const token = jwt.sign(
      { 
        userId: user._id,
        role: user.role
      },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    // Return user data and token
    return res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 