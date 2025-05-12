import express from 'express';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail, findUserById, matchPassword } from '../models/User.js';

const router = express.Router();

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user already exists
    const userExists = await findUserByEmail(email);
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = await createUser(req.body);

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber,
        // Include other relevant fields based on role
        ...(user.role === 'patient' && {
          dateOfBirth: user.dateOfBirth,
          gender: user.gender,
          address: user.address,
          insuranceProvider: user.insuranceProvider,
        }),
        ...(user.role === 'doctor' && {
          specialty: user.specialty,
          location: user.location,
          licenseNumber: user.licenseNumber,
          contactInfo: user.contactInfo,
        }),
        ...(user.role === 'clinic' && {
          clinicName: user.clinicName,
          specialty: user.specialty,
          location: user.location,
          website: user.website,
          licenseNumber: user.licenseNumber,
          contactInfo: user.contactInfo,
        }),
      },
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await matchPassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber,
        // Include other relevant fields based on role
        ...(user.role === 'patient' && {
          dateOfBirth: user.dateOfBirth,
          gender: user.gender,
          address: user.address,
          insuranceProvider: user.insuranceProvider,
        }),
        ...(user.role === 'doctor' && {
          specialty: user.specialty,
          location: user.location,
          licenseNumber: user.licenseNumber,
          contactInfo: user.contactInfo,
        }),
        ...(user.role === 'clinic' && {
          clinicName: user.clinicName,
          specialty: user.specialty,
          location: user.location,
          website: user.website,
          licenseNumber: user.licenseNumber,
          contactInfo: user.contactInfo,
        }),
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await findUserById(decoded.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ message: 'Server error while fetching profile' });
  }
});

export default router; 