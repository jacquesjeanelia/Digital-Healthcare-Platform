import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/utils/mongodb';
import AppointmentModel from '@/models/AppointmentModel';
import { verifyToken } from '@/utils/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Check authentication for all routes
    const user = await verifyToken(req, res);
    if (!user) return; // Response is already sent in verifyToken
    
    // Route handlers based on HTTP method
    switch (req.method) {
      case 'GET':
        return await getAppointments(req, res, user);
      case 'POST':
        return await createAppointment(req, res, user);
      case 'PUT':
        return await updateAppointment(req, res, user);
      case 'DELETE':
        return await deleteAppointment(req, res, user);
      default:
        return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error: any) {
    console.error('Appointment API error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
}

// Get appointments with filtering
async function getAppointments(req: NextApiRequest, res: NextApiResponse, user: any) {
  const { userId, role } = user;
  const { startDate, endDate, status } = req.query;
  
  // Build query based on user role and filters
  let query: any = {};
  
  // Restrict patients to only see their own appointments
  if (role === 'patient') {
    query.patientId = userId;
  } 
  // Doctors can only see their own appointments
  else if (role === 'doctor') {
    query.doctorId = userId;
  }
  
  // Apply date range filter if provided
  if (startDate && endDate) {
    query.dateTime = {
      $gte: new Date(startDate as string),
      $lte: new Date(endDate as string)
    };
  }
  
  // Apply status filter if provided
  if (status) {
    query.status = status;
  }
  
  // Fetch appointments
  const appointments = await AppointmentModel.find(query)
    .sort({ dateTime: 1 })
    .lean();
  
  return res.status(200).json({ appointments });
}

// Create new appointment
async function createAppointment(req: NextApiRequest, res: NextApiResponse, user: any) {
  const { role } = user;
  const {
    patientId,
    doctorId,
    dateTime,
    duration,
    type,
    reasonForVisit,
    symptoms,
    virtualMeetingLink,
    location
  } = req.body;
  
  // Validate required fields
  if (!patientId || !doctorId || !dateTime || !duration || !type) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  
  // Make sure patients can only create appointments for themselves
  if (role === 'patient' && patientId !== user.userId) {
    return res.status(403).json({ message: 'Patients can only create appointments for themselves' });
  }
  
  // Create the appointment
  const appointment = await AppointmentModel.create({
    patientId,
    doctorId,
    dateTime: new Date(dateTime),
    duration,
    status: 'scheduled',
    type,
    reasonForVisit,
    symptoms,
    virtualMeetingLink,
    location,
    createdAt: new Date(),
    updatedAt: new Date()
  });
  
  return res.status(201).json({ appointment });
}

// Update appointment
async function updateAppointment(req: NextApiRequest, res: NextApiResponse, user: any) {
  const { role } = user;
  const { id } = req.query;
  const updateData = req.body;
  
  // Validate appointment ID
  if (!id) {
    return res.status(400).json({ message: 'Appointment ID is required' });
  }
  
  // Find existing appointment
  const appointment = await AppointmentModel.findById(id);
  if (!appointment) {
    return res.status(404).json({ message: 'Appointment not found' });
  }
  
  // Check permissions - patients can only modify their own appointments
  if (role === 'patient' && appointment.patientId.toString() !== user.userId) {
    return res.status(403).json({ message: 'You can only update your own appointments' });
  }
  
  // Check permissions - doctors can only modify their own appointments
  if (role === 'doctor' && appointment.doctorId.toString() !== user.userId) {
    return res.status(403).json({ message: 'You can only update your own appointments' });
  }
  
  // Update the appointment
  updateData.updatedAt = new Date();
  const updatedAppointment = await AppointmentModel.findByIdAndUpdate(
    id,
    updateData,
    { new: true }
  );
  
  return res.status(200).json({ appointment: updatedAppointment });
}

// Delete appointment
async function deleteAppointment(req: NextApiRequest, res: NextApiResponse, user: any) {
  const { role } = user;
  const { id } = req.query;
  
  // Validate appointment ID
  if (!id) {
    return res.status(400).json({ message: 'Appointment ID is required' });
  }
  
  // Find existing appointment
  const appointment = await AppointmentModel.findById(id);
  if (!appointment) {
    return res.status(404).json({ message: 'Appointment not found' });
  }
  
  // Check permissions - only allow deletion of own appointments
  if (role === 'patient' && appointment.patientId.toString() !== user.userId) {
    return res.status(403).json({ message: 'You can only delete your own appointments' });
  }
  
  if (role === 'doctor' && appointment.doctorId.toString() !== user.userId) {
    return res.status(403).json({ message: 'You can only delete your own appointments' });
  }
  
  // Delete the appointment
  await AppointmentModel.findByIdAndDelete(id);
  
  return res.status(200).json({ message: 'Appointment deleted successfully' });
} 