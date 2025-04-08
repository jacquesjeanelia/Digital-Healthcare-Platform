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
  const { date } = req.query;
  
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid doctor ID' });
  }
  
  // Validate the date parameter if provided
  let targetDate: Date;
  if (date && typeof date === 'string') {
    targetDate = new Date(date);
    if (isNaN(targetDate.getTime())) {
      return res.status(400).json({ message: 'Invalid date format' });
    }
  } else {
    // Default to today
    targetDate = new Date();
  }
  
  try {
    // Connect to the database
    await connectDB();
    
    // Find the doctor by ID
    const doctor = await DoctorModel.findById(id);
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    
    // Convert targetDate to day of week (0 = Sunday, 1 = Monday, etc.)
    const dayOfWeek = targetDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    
    // Get doctor's availability for this day of week
    const doctorData = doctor.toObject();
    const availabilitySchedule = doctorData.availability || [];
    
    // Find the schedule for the requested day
    const daySchedule = availabilitySchedule.find((schedule: any) => 
      schedule.days.map((d: string) => d.toLowerCase()).includes(dayOfWeek)
    );
    
    if (!daySchedule) {
      return res.status(200).json({ 
        message: 'Doctor is not available on this day',
        availableSlots: []
      });
    }
    
    // Set the date start and end time to midnight to get the full day
    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);
    
    // Get doctor's existing appointments for the specified date
    const appointments = await AppointmentModel.find({
      doctorId: id,
      dateTime: { $gte: startOfDay, $lte: endOfDay },
      status: { $nin: ['cancelled', 'no-show'] }
    }).select('dateTime duration').lean();
    
    // Parse doctor's working hours
    const startTime = daySchedule.startTime || '09:00';
    const endTime = daySchedule.endTime || '17:00';
    
    // Generate available time slots (assuming 30-minute intervals)
    const availableSlots = generateTimeSlots(
      targetDate, 
      startTime, 
      endTime, 
      30, // slot duration in minutes
      appointments
    );
    
    return res.status(200).json({ 
      date: targetDate,
      day: dayOfWeek,
      workingHours: {
        start: startTime,
        end: endTime
      },
      availableSlots
    });
  } catch (error: any) {
    console.error('Error fetching doctor availability:', error);
    return res.status(500).json({ message: 'Failed to fetch availability', error: error.message });
  }
}

// Helper function to generate available time slots
function generateTimeSlots(
  date: Date, 
  startTime: string, 
  endTime: string, 
  slotDurationMinutes: number, 
  bookedAppointments: any[]
) {
  const slots = [];
  const [startHour, startMinute] = startTime.split(':').map(num => parseInt(num, 10));
  const [endHour, endMinute] = endTime.split(':').map(num => parseInt(num, 10));
  
  // Create slot start time
  const slotDate = new Date(date);
  slotDate.setHours(startHour, startMinute, 0, 0);
  
  // Create end time boundary
  const endTimeDate = new Date(date);
  endTimeDate.setHours(endHour, endMinute, 0, 0);
  
  // Convert booked appointments to blocked time ranges
  const blockedRanges = bookedAppointments.map(appt => {
    const appointmentStart = new Date(appt.dateTime);
    const appointmentEnd = new Date(appt.dateTime);
    appointmentEnd.setMinutes(appointmentEnd.getMinutes() + appt.duration);
    return { start: appointmentStart, end: appointmentEnd };
  });
  
  // Generate slots until we reach the end time
  while (slotDate < endTimeDate) {
    const slotStart = new Date(slotDate);
    
    // Calculate slot end time
    const slotEnd = new Date(slotDate);
    slotEnd.setMinutes(slotEnd.getMinutes() + slotDurationMinutes);
    
    // Check if this slot overlaps with any booked appointment
    const isAvailable = !blockedRanges.some(range => {
      return (slotStart < range.end && slotEnd > range.start);
    });
    
    // Don't include slots in the past
    const now = new Date();
    const isPast = slotStart <= now;
    
    if (isAvailable && !isPast) {
      slots.push({
        start: slotStart.toISOString(),
        end: slotEnd.toISOString(),
        formattedTime: formatTime(slotStart)
      });
    }
    
    // Move to the next slot
    slotDate.setMinutes(slotDate.getMinutes() + slotDurationMinutes);
  }
  
  return slots;
}

// Helper function to format time as "HH:MM AM/PM"
function formatTime(date: Date) {
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
} 