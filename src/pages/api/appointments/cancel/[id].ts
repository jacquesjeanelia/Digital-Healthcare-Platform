import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/utils/mongodb';
import AppointmentModel from '@/models/AppointmentModel';
import { verifyToken } from '@/utils/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests for cancellation
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  // Get appointment ID from the URL parameter
  const { id } = req.query;
  
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid appointment ID' });
  }
  
  try {
    // Connect to the database
    await connectDB();
    
    // Authenticate the user
    const user = await verifyToken(req, res);
    if (!user) return; // Response already sent in verifyToken
    
    const { userId, role } = user;
    const { cancellationReason } = req.body;
    
    // Find the appointment
    const appointment = await AppointmentModel.findById(id);
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    // Check permissions - users can only cancel their own appointments
    if (role === 'patient' && appointment.patientId.toString() !== userId) {
      return res.status(403).json({ message: 'You do not have permission to cancel this appointment' });
    }
    
    if (role === 'doctor' && appointment.doctorId.toString() !== userId) {
      return res.status(403).json({ message: 'You do not have permission to cancel this appointment' });
    }
    
    // Check if appointment is already cancelled
    if (appointment.status === 'cancelled') {
      return res.status(400).json({ message: 'This appointment is already cancelled' });
    }
    
    // Check if appointment is already completed
    if (appointment.status === 'completed') {
      return res.status(400).json({ message: 'Cannot cancel a completed appointment' });
    }
    
    // Check if appointment is already in progress
    if (appointment.status === 'in-progress') {
      // Only doctors can cancel in-progress appointments
      if (role !== 'doctor' && role !== 'admin') {
        return res.status(403).json({ 
          message: 'Patients cannot cancel an in-progress appointment' 
        });
      }
    }
    
    // Calculate time difference from now to appointment time (in hours)
    const appointmentTime = new Date(appointment.dateTime).getTime();
    const currentTime = new Date().getTime();
    const timeDifferenceHours = (appointmentTime - currentTime) / (1000 * 60 * 60);
    
    // Apply cancellation policy based on time remaining
    let cancellationFee = 0;
    let cancellationNotes = '';
    
    // If patient is cancelling and less than 24 hours remain
    if (role === 'patient' && timeDifferenceHours < 24) {
      cancellationFee = 25; // $25 late cancellation fee for example
      cancellationNotes = 'Late cancellation fee applied (less than 24 hours notice).';
    }
    
    // Update the appointment status to cancelled
    const updatedAppointment = await AppointmentModel.findByIdAndUpdate(
      id,
      {
        status: 'cancelled',
        notes: appointment.notes 
          ? `${appointment.notes}\n\nCancellation: ${cancellationReason || 'No reason provided'}`
          : `Cancellation: ${cancellationReason || 'No reason provided'}`,
        updatedAt: new Date(),
        cancellationDetails: {
          cancelledBy: role,
          cancelledById: userId,
          cancellationTime: new Date(),
          cancellationReason: cancellationReason || 'No reason provided',
          cancellationFee: cancellationFee,
          cancellationNotes: cancellationNotes
        }
      },
      { new: true }
    );
    
    // Return the updated appointment
    return res.status(200).json({
      message: 'Appointment cancelled successfully',
      appointment: updatedAppointment,
      cancellationFee: cancellationFee > 0 ? `$${cancellationFee}` : 'None'
    });
  } catch (error: any) {
    console.error('Error cancelling appointment:', error);
    return res.status(500).json({ message: 'Failed to cancel appointment', error: error.message });
  }
} 