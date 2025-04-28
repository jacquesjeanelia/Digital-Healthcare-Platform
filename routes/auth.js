const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const path = require('path');

// Input validation middleware
const validateRegistration = (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = [];

  // Name validation
  if (!name || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push('Please provide a valid email address');
  }

  // Password validation
  if (!password || password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    errors.push('Password must contain at least one uppercase letter, one lowercase letter, and one number');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: 'Validation failed',
      errors
    });
  }

  next();
};

// Register route
router.post('/register', validateRegistration, async (req, res) => {
  const { name, email, password } = req.body;

  try {
    console.log('Registration attempt:', { email, name });

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Registration failed: User already exists', { email });
      return res.status(409).json({
        message: 'Registration failed',
        errors: ['An account with this email already exists']
      });
    }

    // Create new user
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password
    });

    console.log('User created successfully:', { userId: user._id, email });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    // Set secure cookie with token
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });

    // Send success response
    res.status(201).json({
      message: 'Registration successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Registration error:', {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack,
      requestBody: { email, name }
    });

    // Handle specific error types
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Registration failed',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        message: 'Registration failed',
        errors: ['An account with this email already exists']
      });
    }

    // Handle database connection errors
    if (error.name === 'MongoError' && error.message.includes('connection')) {
      return res.status(503).json({
        message: 'Registration failed',
        errors: ['Unable to connect to the database. Please try again later.']
      });
    }

    res.status(500).json({
      message: 'Registration failed',
      errors: ['An unexpected error occurred. Please try again later.']
    });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Input validation
    if (!email || !password) {
      return res.status(400).json({
        message: 'Login failed',
        errors: ['Please provide both email and password']
      });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');
    if (!user) {
      return res.status(401).json({
        message: 'Login failed',
        errors: ['Invalid email or password']
      });
    }

    // Check password
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: 'Login failed',
        errors: ['Invalid email or password']
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    // Set secure cookie with token
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });

    // Send success response
    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      message: 'Login failed',
      errors: ['An unexpected error occurred. Please try again later.']
    });
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
        role: user.role
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Serve registration page
router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../../sehaty-frontend/dist/index.html'));
});

module.exports = router; 