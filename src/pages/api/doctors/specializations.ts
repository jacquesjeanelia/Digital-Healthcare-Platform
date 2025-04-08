import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/utils/mongodb';
import { DoctorModel } from '@/models/UserModel';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Connect to database
    await connectDB();
    
    // Aggregate query to get unique specializations
    const specializations = await DoctorModel.aggregate([
      { $group: { _id: '$specialization' } },
      { $match: { _id: { $ne: null } } },
      { $sort: { _id: 1 } },
      { $project: { specialization: '$_id', _id: 0 } }
    ]);
    
    // Format the response
    const formattedSpecializations = specializations.map(item => item.specialization);
    
    return res.status(200).json({ specializations: formattedSpecializations });
  } catch (error: any) {
    console.error('Error fetching specializations:', error);
    return res.status(500).json({ message: 'Failed to fetch specializations', error: error.message });
  }
} 