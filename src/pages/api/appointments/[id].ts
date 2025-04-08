import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/utils/mongodb';
import AppointmentModel from '@/models/AppointmentModel';
import { verifyToken } from '@/utils/auth';
import { UserModel } from '@/models/UserModel';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
    
    // Route based on HTTP method
    switch (req.method) {
      case 'GET':
        return await getAppointmentById(res, id, user);
      case 'PUT':
        return await updateAppointmentById(req, res, id, user);
      case 'DELETE':
        return await deleteAppointmentById(res, id, user);
      default:
        return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error: any) {
    console.error('Appointment API error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
}

// GET: Retrieve a specific appointment with details
async function getAppointmentById(res: NextApiResponse, id: string, user: any) {
  try {
    const { userId, role } = user;
    
    // Find the appointment
    const appointment = await AppointmentModel.findById(id);
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    // Check if user has permission to access this appointment
    if (role === 'patient' && appointment.patientId.toString() !== userId) {
      return res.status(403).json({ message: 'You do not have permission to view this appointment' });
    }
    
    if (role === 'doctor' && appointment.doctorId.toString() !== userId) {
      return res.status(403).json({ message: 'You do not have permission to view this appointment' });
    }
    
    // Populate with patient and doctor details
    const appointmentObj = appointment.toObject();
    
    // Add patient details if the viewer is a doctor
    if (role === 'doctor' || role === 'admin') {
      const patient = await UserModel.findById(appointment.patientId);
      if (patient) {
        appointmentObj.patient = {
          id: patient._id,
          name: patient.name,
          email: patient.email,
          profileImage: patient.profileImage
        };
      }
    }
    
    // Add doctor details if the viewer is a patient
    if (role === 'patient' || role === 'admin') {
      const doctor = await UserModel.findById(appointment.doctorId);
      if (doctor) {
        // Use type assertion for doctor data
        const doctorData = doctor.toObject() as any;
        appointmentObj.doctor = {
          id: doctor._id,
          name: doctor.name,
          email: doctor.email,
          specialization: doctorData.specialization,
          profileImage: doctor.profileImage
        };
      }
    }
    
    return res.status(200).json({ appointment: appointmentObj });
  } catch (error: any) {
    console.error('Error fetching appointment:', error);
    return res.status(500).json({ message: 'Failed to fetch appointment', error: error.message });
  }
}

// PUT: Update a specific appointment
async function updateAppointmentById(req: NextApiRequest, res: NextApiResponse, id: string, user: any) {
  try {
    const { userId, role } = user;
    const updateData = req.body;
    
    // Find the appointment
    const appointment = await AppointmentModel.findById(id);
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    // Check permissions - patients can only update their own appointments
    if (role === 'patient' && appointment.patientId.toString() !== userId) {
      return res.status(403).json({ message: 'You do not have permission to update this appointment' });
    }
    
    // Check permissions - doctors can only update their own appointments
    if (role === 'doctor' && appointment.doctorId.toString() !== userId) {
      return res.status(403).json({ message: 'You do not have permission to update this appointment' });
    }
    
    // Patients should not be able to change certain fields
    if (role === 'patient') {
      // Prevent patients from changing the doctor, status to completed, etc.
      delete updateData.doctorId;
      if (updateData.status === 'completed' || updateData.status === 'in-progress') {
        delete updateData.status;
      }
    }
    
    // Update the appointment
    updateData.updatedAt = new Date();
    const updatedAppointment = await AppointmentModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );
    
    return res.status(200).json({ 
      message: 'Appointment updated successfully',
      appointment: updatedAppointment 
    });
  } catch (error: any) {
    console.error('Error updating appointment:', error);
    return res.status(500).json({ message: 'Failed to update appointment', error: error.message });
  }
}

// DELETE: Remove a specific appointment
async function deleteAppointmentById(res: NextApiResponse, id: string, user: any) {
  try {
    const { userId, role } = user;
    
    // Find the appointment
    const appointment = await AppointmentModel.findById(id);
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    // Check permissions - only allow deletion of own appointments
    if (role === 'patient' && appointment.patientId.toString() !== userId) {
      return res.status(403).json({ message: 'You do not have permission to delete this appointment' });
    }
    
    if (role === 'doctor' && appointment.doctorId.toString() !== userId) {
      return res.status(403).json({ message: 'You do not have permission to delete this appointment' });
    }
    
    // Delete the appointment
    await AppointmentModel.findByIdAndDelete(id);
    
    return res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting appointment:', error);
    return res.status(500).json({ message: 'Failed to delete appointment', error: error.message });
  }
} 