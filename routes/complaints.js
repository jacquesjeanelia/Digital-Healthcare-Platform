const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Complaint = require('../models/Complaint');
const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Submit a new complaint
router.post('/submit', authenticateToken, async (req, res) => {
  const { title, description } = req.body;
  const userId = req.userId;

  try {
    // Validate input
    if (!title || !description) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: ['Title and description are required']
      });
    }

    // Create new complaint
    const complaint = new Complaint({
      user: userId,
      title,
      description
    });

    // Save complaint
    const savedComplaint = await complaint.save();

    // Add complaint to user's complaints array
    await User.findByIdAndUpdate(userId, {
      $push: { complaints: savedComplaint._id }
    });

    // Send email notification (we'll implement this later)
    // For now, we'll just log the complaint
    console.log('New complaint submitted:', {
      userId,
      title,
      description
    });

    res.status(201).json({
      message: 'Complaint submitted successfully',
      complaint: savedComplaint
    });
  } catch (error) {
    console.error('Complaint submission error:', error);
    res.status(500).json({
      message: 'Failed to submit complaint',
      error: error.message
    });
  }
});

// Get user's complaints
router.get('/my-complaints', authenticateToken, async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.userId })
      .sort({ createdAt: -1 })
      .populate('user', 'name email');

    res.json({
      complaints
    });
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).json({
      message: 'Failed to fetch complaints',
      error: error.message
    });
  }
});

module.exports = router;
