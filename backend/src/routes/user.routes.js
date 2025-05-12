const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { addPrescription, getPrescriptions } = require('../models/User');
const auth = require('../middleware/auth');
const { clientPromise } = require('../config/db');
const { ObjectId } = require('mongodb');

// Get user dashboard data
router.get('/dashboard', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .populate('appointments.doctorId', 'name specialty');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get upcoming appointments
    const upcomingAppointments = user.appointments.filter(apt => 
      new Date(apt.date) >= new Date() && apt.status === 'scheduled'
    );

    // Get active prescriptions
    const activePrescriptions = user.prescriptions.filter(pres => 
      pres.status === 'active'
    );

    // Get recent health records
    const recentHealthRecords = user.healthRecords
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    // Get recent activities
    const recentActivities = user.recentActivities
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    res.json({
      appointments: {
        total: user.appointments.length,
        upcoming: upcomingAppointments.length,
        list: upcomingAppointments.slice(0, 3)
      },
      prescriptions: {
        total: user.prescriptions.length,
        active: activePrescriptions.length,
        list: activePrescriptions.slice(0, 3)
      },
      healthRecords: {
        total: user.healthRecords.length,
        recent: recentHealthRecords
      },
      recentActivities
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get top rated clinics
router.get('/top-clinics', async (req, res) => {
  try {
    const clinics = await User.find({ role: 'clinic' })
      .select('name specialty location rating')
      .sort({ rating: -1 })
      .limit(3);

    res.json(clinics);
  } catch (error) {
    console.error('Error fetching top clinics:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new appointment
router.post('/appointments', auth, async (req, res) => {
  try {
    const { doctorId, date, time, notes } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.appointments.push({
      doctorId,
      date,
      time,
      status: 'scheduled',
      notes
    });

    user.recentActivities.push({
      type: 'appointment',
      description: 'New appointment scheduled',
      relatedId: doctorId
    });

    await user.save();
    res.json(user.appointments[user.appointments.length - 1]);
  } catch (error) {
    console.error('Error adding appointment:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user prescriptions
router.get('/prescriptions', auth, async (req, res) => {
  try {
    console.log('Fetching prescriptions for user:', req.user.id);
    
    const client = await clientPromise;
    const db = client.db('test');
    const collection = db.collection('Prescriptions');
    
    const prescriptions = await collection.find({ userId: req.user.id }).toArray();
    console.log(`Found ${prescriptions.length} prescriptions`);
    
    res.json(prescriptions);
  } catch (error) {
    console.error('Error fetching prescriptions:', error);
    res.status(500).json({ 
      message: 'Server error',
      details: error.message 
    });
  }
});

// Add new prescription
router.post('/prescriptions', auth, async (req, res) => {
  try {
    console.log('Received prescription request');
    const { medication, dosage, frequency, startDate, endDate, notes, status } = req.body;
    
    const client = await clientPromise;
    const db = client.db('test');
    const collection = db.collection('Prescriptions');

    const prescriptionData = {
      medication,
      dosage,
      frequency,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      notes,
      status: status || 'active',
      userId: req.user.id,
      createdAt: new Date()
    };

    console.log('Inserting prescription:', prescriptionData);
    const result = await collection.insertOne(prescriptionData);
    
    if (!result.acknowledged) {
      throw new Error('Failed to insert prescription');
    }

    const newPrescription = { ...prescriptionData, _id: result.insertedId };
    console.log('Prescription saved successfully:', newPrescription);

    // Add to user's recent activities
    const user = await User.findById(req.user.id);
    if (user) {
      user.recentActivities.unshift({
        type: 'prescription',
        description: `Added new prescription: ${medication}`,
        date: new Date(),
        relatedId: newPrescription._id
      });
      await user.save();
    }

    res.status(201).json(newPrescription);
  } catch (error) {
    console.error('Error in prescription creation:', error);
    res.status(500).json({ 
      message: 'Server error',
      details: error.message 
    });
  }
});

// Update prescription status
router.patch('/prescriptions/:prescriptionId', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const prescription = user.prescriptions.id(req.params.prescriptionId);
    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }

    prescription.status = status;
    await user.save();
    
    res.json(prescription);
  } catch (error) {
    console.error('Error updating prescription:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new health record
router.post('/health-records', auth, async (req, res) => {
  try {
    const { type, date, provider, description, attachments } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.healthRecords.push({
      type,
      date,
      provider,
      description,
      attachments
    });

    user.recentActivities.push({
      type: 'record',
      description: 'New health record added',
      relatedId: user._id
    });

    await user.save();
    res.json(user.healthRecords[user.healthRecords.length - 1]);
  } catch (error) {
    console.error('Error adding health record:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user notifications
router.get('/notifications', auth, async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db('test');
    const collection = db.collection('Notifications');
    
    const notifications = await collection
      .find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(20)
      .toArray();
    
    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ 
      message: 'Server error',
      details: error.message 
    });
  }
});

// Mark notification as read
router.patch('/notifications/:notificationId/read', auth, async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db('test');
    const collection = db.collection('Notifications');
    
    const result = await collection.updateOne(
      { 
        _id: new ObjectId(req.params.notificationId),
        userId: req.user.id 
      },
      { $set: { read: true } }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    
    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ 
      message: 'Server error',
      details: error.message 
    });
  }
});

// Mark all notifications as read
router.patch('/notifications/read-all', auth, async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db('test');
    const collection = db.collection('Notifications');
    
    await collection.updateMany(
      { 
        userId: req.user.id,
        read: false 
      },
      { $set: { read: true } }
    );
    
    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    res.status(500).json({ 
      message: 'Server error',
      details: error.message 
    });
  }
});

module.exports = router; 