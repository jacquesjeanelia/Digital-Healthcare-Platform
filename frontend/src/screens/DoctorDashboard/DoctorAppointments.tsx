import React from 'react';

interface Appointment {
  patientId?: { name: string; age: number; gender: string };
  doctorId?: { name: string; specialty: string };
  date: string;
  time: string;
  status: string;
  type?: string;
  notes?: string;
}

interface DoctorAppointmentsProps {
  appointments: Appointment[];
}

export const DoctorAppointments: React.FC<DoctorAppointmentsProps> = ({ appointments }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {appointments.map((appointment, index) => (
        <div key={index} className="border rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{appointment.patientId?.name}</h3>
              <p className="text-sm text-gray-600">
                {appointment.date} at {appointment.time}
              </p>
              <p className="text-sm text-gray-600">
                Patient: {appointment.patientId?.name} ({appointment.patientId?.age} years, {appointment.patientId?.gender})
              </p>
            </div>
            <span className={`px-2 py-1 rounded text-sm ${getStatusColor(appointment.status)}`}>
              {appointment.status}
            </span>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md">
              View Details
            </button>
            {appointment.status === 'scheduled' && (
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md">
                Start Session
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}; 