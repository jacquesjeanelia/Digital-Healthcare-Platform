import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/utils/mongodb';
import { DoctorModel } from '@/models/UserModel';
import AppointmentModel from '@/models/AppointmentModel';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Get doctor ID from the URL parameter
  const { id } = req.query;
  
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid doctor ID' });
  }

  try {
    // Connect to the database
    await connectDB();
    
    // Find the doctor by ID
    const doctor = await DoctorModel.findById(id).select('-password');
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    
    // Get the doctor's schedule/availability
    const doctorData = doctor.toObject();
    
    // Get upcoming appointments for availability calculation
    const currentDate = new Date();
    const appointments = await AppointmentModel.find({
      doctorId: id,
      dateTime: { $gte: currentDate },
      status: { $nin: ['cancelled', 'no-show'] }
    }).select('dateTime duration').lean();
    
    // Format the response object
    const doctorDetails = {
      id: doctorData._id,
      name: doctorData.name,
      email: doctorData.email,
      profileImage: doctorData.profileImage,
      phoneNumber: doctorData.phoneNumber,
      specialization: doctorData.specialization,
      yearsOfExperience: doctorData.yearsOfExperience,
      hospital: doctorData.hospital,
      department: doctorData.department,
      availability: doctorData.availability || [],
      education: doctorData.education || [],
      ratings: doctorData.ratings,
      // Don't include the full list of appointments, just the count
      upcomingAppointmentsCount: appointments.length
    };
    
    return res.status(200).json({ doctor: doctorDetails });
  } catch (error: any) {
    console.error('Error fetching doctor details:', error);
    return res.status(500).json({ message: 'Failed to fetch doctor details', error: error.message });
  }
} 