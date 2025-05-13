import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { useAuth } from "../../lib/AuthContext";
import axiosInstance from "../../lib/axios";
import type { User } from '../../lib/AuthContext';

interface DashboardData {
  appointments: {
    total: number;
    upcoming: number;
    list: Array<{
      patientId?: { name: string; age: number; gender: string };
      doctorId?: { name: string; specialty: string };
      date: string;
      time: string;
      status: string;
      type?: string;
      notes?: string;
    }>;
  };
  patients?: {
    total: number;
    active: number;
    list: Array<{
      id: string;
      name: string;
      age: number;
      gender: string;
      lastVisit: string;
      nextAppointment: string;
      status: string;
    }>;
  };
  prescriptions: {
    total: number;
    active: number;
    list: Array<{
      patientId?: { name: string; age: number };
      doctorId?: { name: string; specialty: string };
      medication: string;
      dosage: string;
      frequency: string;
      startDate: string;
      endDate: string;
      status: string;
      notes?: string;
    }>;
  };
  healthRecords?: {
    total: number;
    recent: Array<{
      type: string;
      date: string;
      provider: string;
      description: string;
      attachments: string[];
    }>;
  };
  analytics?: {
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
  };
  recentActivities: Array<{
    type: string;
    description: string;
    date: string;
    relatedId: string;
  }>;
}

interface TopClinic {
  _id: string;
  name: string;
  specialty: string;
  location: string;
  rating: number;
}

interface HealthTip {
  id: number;
  title: string;
  description: string;
  category: string;
}

const healthTips: HealthTip[] = [
  {
    id: 1,
    title: "Stay Hydrated",
    description: "Drink at least 8 glasses of water daily to maintain proper hydration and support overall health.",
    category: "General Health"
  },
  {
    id: 2,
    title: "Regular Exercise",
    description: "Aim for at least 30 minutes of moderate exercise daily to improve cardiovascular health and maintain a healthy weight.",
    category: "Fitness"
  },
  {
    id: 3,
    title: "Balanced Diet",
    description: "Include a variety of fruits, vegetables, whole grains, and lean proteins in your daily meals.",
    category: "Nutrition"
  },
  {
    id: 4,
    title: "Quality Sleep",
    description: "Get 7-9 hours of sleep each night to support physical and mental well-being.",
    category: "Sleep"
  },
  {
    id: 5,
    title: "Stress Management",
    description: "Practice mindfulness and relaxation techniques to reduce stress and improve mental health.",
    category: "Mental Health"
  },
  {
    id: 6,
    title: "Regular Check-ups",
    description: "Schedule regular health check-ups to monitor your health and catch potential issues early.",
    category: "Preventive Care"
  }
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [topClinics, setTopClinics] = useState<TopClinic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTips, setCurrentTips] = useState<HealthTip[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        if (user?.email === 'test.doctor@sehaty.com' || user?.email === 'test.patient@sehaty.com') {
          setDashboardData(user.dashboardData as DashboardData);
        } else {
          const response = await fetch('/api/user/dashboard');
          if (!response.ok) throw new Error('Failed to fetch dashboard data');
          const data = await response.json();
          setDashboardData(data);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setDashboardData({
          appointments: { total: 0, upcoming: 0, list: [] },
          prescriptions: { total: 0, active: 0, list: [] },
          recentActivities: []
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  // Rotate health tips every 2 hours
  useEffect(() => {
    const rotateTips = () => {
      const startIndex = Math.floor(Date.now() / (2 * 60 * 60 * 1000)) % healthTips.length;
      const tips = [];
      for (let i = 0; i < 3; i++) {
        tips.push(healthTips[(startIndex + i) % healthTips.length]);
      }
      setCurrentTips(tips);
    };

    rotateTips();
    const interval = setInterval(rotateTips, 2 * 60 * 60 * 1000); // 2 hours

    return () => clearInterval(interval);
  }, []);

  if (!user) {
    navigate("/auth/login");
    return <div className="hidden">Redirecting...</div>;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4caf96]"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Appointments</h3>
          <p className="text-3xl font-bold">{dashboardData?.appointments.total || 0}</p>
          <p className="text-sm text-gray-600">{dashboardData?.appointments.upcoming || 0} upcoming</p>
        </div>
        
        {user.role === 'doctor' && dashboardData?.patients && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Patients</h3>
            <p className="text-3xl font-bold">{dashboardData.patients.total}</p>
            <p className="text-sm text-gray-600">{dashboardData.patients.active} active</p>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Prescriptions</h3>
          <p className="text-3xl font-bold">{dashboardData?.prescriptions.total || 0}</p>
          <p className="text-sm text-gray-600">{dashboardData?.prescriptions.active || 0} active</p>
        </div>
        
        {user.role === 'doctor' && dashboardData?.analytics && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Monthly Stats</h3>
            <p className="text-3xl font-bold">{dashboardData.analytics.monthlyStats.totalAppointments}</p>
            <p className="text-sm text-gray-600">{dashboardData.analytics.monthlyStats.newPatients} new patients</p>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="border-b">
          <nav className="flex">
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === 'appointments' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('appointments')}
            >
              Appointments
            </button>
            {user.role === 'doctor' && (
              <button
                className={`px-6 py-3 font-medium ${
                  activeTab === 'patients' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
                }`}
                onClick={() => setActiveTab('patients')}
              >
                Patients
              </button>
            )}
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === 'prescriptions' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('prescriptions')}
            >
              Prescriptions
            </button>
            {user.role === 'patient' && (
              <button
                className={`px-6 py-3 font-medium ${
                  activeTab === 'health-records' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
                }`}
                onClick={() => setActiveTab('health-records')}
              >
                Health Records
              </button>
            )}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {dashboardData?.recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-blue-600"></div>
                    <div>
                      <p className="text-sm text-gray-600">{activity.date}</p>
                      <p className="font-medium">{activity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
              <div className="space-y-4">
                {dashboardData?.appointments.list.map((appointment, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">
                          {user.role === 'doctor' ? appointment.patientId?.name : appointment.doctorId?.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {appointment.date} at {appointment.time}
                        </p>
                        <p className="text-sm text-gray-600">
                          {user.role === 'doctor' ? 'Patient' : 'Doctor'}: {user.role === 'doctor' ? appointment.patientId?.name : appointment.doctorId?.name}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded text-sm ${
                        appointment.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                        appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'patients' && user.role === 'doctor' && dashboardData?.patients && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Active Patients</h2>
              <div className="space-y-4">
                {dashboardData.patients.list.map((patient) => (
                  <div key={patient.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{patient.name}</h3>
                        <p className="text-sm text-gray-600">
                          Age: {patient.age} | Gender: {patient.gender}
                        </p>
                        <p className="text-sm text-gray-600">
                          Last Visit: {patient.lastVisit}
                        </p>
                        <p className="text-sm text-gray-600">
                          Next Appointment: {patient.nextAppointment}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded text-sm ${
                        patient.status === 'active' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {patient.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'prescriptions' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Active Prescriptions</h2>
              <div className="space-y-4">
                {dashboardData?.prescriptions.list.map((prescription, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{prescription.medication}</h3>
                        <p className="text-sm text-gray-600">
                          Dosage: {prescription.dosage} | Frequency: {prescription.frequency}
                        </p>
                        <p className="text-sm text-gray-600">
                          Start Date: {prescription.startDate} | End Date: {prescription.endDate}
                        </p>
                        {prescription.notes && (
                          <p className="text-sm text-gray-600 mt-2">Notes: {prescription.notes}</p>
                        )}
                      </div>
                      <span className={`px-2 py-1 rounded text-sm ${
                        prescription.status === 'active' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {prescription.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'health-records' && user.role === 'patient' && dashboardData?.healthRecords && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Recent Health Records</h2>
              <div className="space-y-4">
                {dashboardData.healthRecords.recent.map((record, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{record.type}</h3>
                        <p className="text-sm text-gray-600">
                          Date: {record.date} | Provider: {record.provider}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">{record.description}</p>
                        {record.attachments.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm font-medium">Attachments:</p>
                            <ul className="list-disc list-inside text-sm text-gray-600">
                              {record.attachments.map((attachment, i) => (
                                <li key={i}>{attachment}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Health Tips */}
      <div className="mt-8">
        <h2 className="font-['Montserrat',Helvetica] font-bold text-[#1f4156] dark:text-white text-xl mb-4">
          Health Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentTips.map((tip) => (
            <Card 
              key={tip.id}
              className="bg-white dark:bg-gray-800 border-none shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-[#4caf9620] text-[#4caf96]">
                    {tip.category}
                  </span>
                </div>
                <h3 className="font-bold text-[#1f4156] dark:text-white mb-2">
                  {tip.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {tip.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 