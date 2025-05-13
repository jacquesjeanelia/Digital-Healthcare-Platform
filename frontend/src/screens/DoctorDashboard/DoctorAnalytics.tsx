import React from 'react';

interface Analytics {
  monthlyStats: {
    totalAppointments: number;
    completedAppointments: number;
    newPatients: number;
    prescriptionsIssued: number;
    averageRating: number;
  };
  weeklySchedule: {
    monday: number;
    tuesday: number;
    wednesday: number;
    thursday: number;
    friday: number;
  };
}

interface DoctorAnalyticsProps {
  analytics: Analytics;
}

export const DoctorAnalytics: React.FC<DoctorAnalyticsProps> = ({ analytics }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Monthly Statistics</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Total Appointments</p>
              <p className="text-2xl font-bold">{analytics.monthlyStats.totalAppointments}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Completed Appointments</p>
              <p className="text-2xl font-bold">{analytics.monthlyStats.completedAppointments}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">New Patients</p>
              <p className="text-2xl font-bold">{analytics.monthlyStats.newPatients}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Prescriptions Issued</p>
              <p className="text-2xl font-bold">{analytics.monthlyStats.prescriptionsIssued}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Average Rating</p>
              <p className="text-2xl font-bold">{analytics.monthlyStats.averageRating.toFixed(1)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Weekly Schedule</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Monday</p>
              <p className="text-2xl font-bold">{analytics.weeklySchedule.monday} appointments</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Tuesday</p>
              <p className="text-2xl font-bold">{analytics.weeklySchedule.tuesday} appointments</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Wednesday</p>
              <p className="text-2xl font-bold">{analytics.weeklySchedule.wednesday} appointments</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Thursday</p>
              <p className="text-2xl font-bold">{analytics.weeklySchedule.thursday} appointments</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Friday</p>
              <p className="text-2xl font-bold">{analytics.weeklySchedule.friday} appointments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 