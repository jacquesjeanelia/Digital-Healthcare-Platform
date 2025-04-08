import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/utils/mongodb';
import { DoctorModel } from '@/models/UserModel';
import { verifyToken } from '@/utils/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Connect to the database
    await connectDB();
    
    // Get query parameters for filtering
    const { 
      specialization,
      hospital,
      department,
      search,
      limit = '20',
      page = '1'
    } = req.query;
    
    // Build the query
    const query: any = {};
    
    // Apply filters if provided
    if (specialization) {
      query.specialization = specialization;
    }
    
    if (hospital) {
      query.hospital = hospital;
    }
    
    if (department) {
      query.department = department;
    }
    
    // Add search functionality
    if (search && typeof search === 'string') {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { specialization: { $regex: search, $options: 'i' } },
        { hospital: { $regex: search, $options: 'i' } },
        { department: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Parse pagination parameters
    const pageNumber = parseInt(page as string, 10);
    const pageSize = parseInt(limit as string, 10);
    const skip = (pageNumber - 1) * pageSize;
    
    // Execute the query
    const totalDoctors = await DoctorModel.countDocuments(query);
    const doctors = await DoctorModel.find(query)
      .select('-password')
      .skip(skip)
      .limit(pageSize)
      .sort({ name: 1 })
      .lean();
    
    // Format the response
    const formattedDoctors = doctors.map(doctor => ({
      id: doctor._id,
      name: doctor.name,
      email: doctor.email,
      profileImage: doctor.profileImage,
      phoneNumber: doctor.phoneNumber,
      specialization: doctor.specialization,
      hospital: doctor.hospital,
      department: doctor.department,
      yearsOfExperience: doctor.yearsOfExperience,
      ratings: doctor.ratings
    }));
    
    // Return the formatted doctors list with pagination info
    return res.status(200).json({
      doctors: formattedDoctors,
      pagination: {
        total: totalDoctors,
        page: pageNumber,
        pageSize,
        totalPages: Math.ceil(totalDoctors / pageSize)
      }
    });
  } catch (error: any) {
    console.error('Error fetching doctors:', error);
    return res.status(500).json({ message: 'Failed to fetch doctors', error: error.message });
  }
} 