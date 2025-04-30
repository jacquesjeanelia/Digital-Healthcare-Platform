const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  console.log('Registration attempt:', {
    body: { ...req.body, password: req.body.password ? '***' : undefined },
    headers: req.headers
  });

  try {
    const { role, name, email, phoneNumber, password } = req.body;

    // Basic input validation
    if (!role || !name || !email || !phoneNumber || !password) {
      return res.status(400).json({ 
        message: 'Please provide all required fields',
        fields: { 
          role: !role, 
          name: !name, 
          email: !email, 
          phoneNumber: !phoneNumber, 
          password: !password 
        }
      });
    }

    // Role-specific validation
    if (role === 'patient') {
      const { dateOfBirth, gender, address, insuranceProvider } = req.body;
      if (!dateOfBirth || !gender || !address || !insuranceProvider) {
        return res.status(400).json({
          message: 'Please provide all required patient information',
          fields: {
            dateOfBirth: !dateOfBirth,
            gender: !gender,
            address: !address,
            insuranceProvider: !insuranceProvider
          }
        });
      }
    } else if (role === 'clinic') {
      const { clinicName, specialty, location, workingHours, licenseNumber, website } = req.body;
      if (!clinicName || !specialty || !location || !workingHours || !licenseNumber || !website) {
        return res.status(400).json({
          message: 'Please provide all required clinic information',
          fields: {
            clinicName: !clinicName,
            specialty: !specialty,
            location: !location,
            workingHours: !workingHours,
            licenseNumber: !licenseNumber,
            website: !website
          }
        });
      }
    }

    // Password validation
    if (password.length < 8) {
      return res.status(400).json({ 
        message: 'Password must be at least 8 characters long'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: 'Please provide a valid email address'
      });
    }

    // Phone number validation
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return res.status(400).json({
        message: 'Please provide a valid phone number'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        message: 'User with this email already exists'
      });
    }

    // Create new user
    const user = await User.create(req.body);

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    // Send response
    res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        ...(user.role === 'patient' ? {
          dateOfBirth: user.dateOfBirth,
          gender: user.gender,
          address: user.address,
          insuranceProvider: user.insuranceProvider
        } : {
          clinicName: user.clinicName,
          specialty: user.specialty,
          location: user.location,
          workingHours: user.workingHours,
          licenseNumber: user.licenseNumber,
          website: user.website
        })
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({ 
        message: 'Email already exists'
      });
    }

    res.status(500).json({ 
      message: 'Registration failed. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user and include password for comparison
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    // Send response
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        ...(user.role === 'patient' ? {
          dateOfBirth: user.dateOfBirth,
          gender: user.gender,
          address: user.address,
          insuranceProvider: user.insuranceProvider
        } : {
          clinicName: user.clinicName,
          specialty: user.specialty,
          location: user.location,
          workingHours: user.workingHours,
          licenseNumber: user.licenseNumber,
          website: user.website
        })
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Get current user route
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send response
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        ...(user.role === 'patient' ? {
          dateOfBirth: user.dateOfBirth,
          gender: user.gender,
          address: user.address,
          insuranceProvider: user.insuranceProvider
        } : {
          clinicName: user.clinicName,
          specialty: user.specialty,
          location: user.location,
          workingHours: user.workingHours,
          licenseNumber: user.licenseNumber,
          website: user.website
        })
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router; 