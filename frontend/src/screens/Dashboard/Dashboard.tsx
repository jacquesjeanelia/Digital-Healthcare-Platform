import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { useAuth } from "../../lib/AuthContext";
import axiosInstance from "../../lib/axios";

interface DashboardData {
  appointments: {
    total: number;
    upcoming: number;
    list: Array<{
      doctorId: {
        name: string;
        specialty: string;
      };
      date: string;
      time: string;
      status: string;
      notes?: string;
    }>;
  };
  prescriptions: {
    total: number;
    active: number;
    list: Array<{
      doctorId: {
        name: string;
        specialty: string;
      };
      medication: string;
      dosage: string;
      frequency: string;
      startDate: string;
      endDate: string;
      status: string;
      notes?: string;
    }>;
  };
  healthRecords: {
    total: number;
    recent: Array<{
      type: string;
      date: string;
      provider: string;
      description: string;
      attachments: string[];
    }>;
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

export const Dashboard = (): JSX.Element => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [topClinics, setTopClinics] = useState<TopClinic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTips, setCurrentTips] = useState<HealthTip[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        
        const [dashboardResponse, clinicsResponse] = await Promise.all([
          axiosInstance.get<DashboardData>('/api/user/dashboard'),
          axiosInstance.get<TopClinic[]>('/api/user/top-clinics')
        ]);

        setDashboardData(dashboardResponse.data || {
          appointments: { total: 0, upcoming: 0, list: [] },
          prescriptions: { total: 0, active: 0, list: [] },
          healthRecords: { total: 0, recent: [] },
          recentActivities: []
        });
        
        setTopClinics(clinicsResponse.data || []);
      } catch (err: any) {
        console.error("Error fetching dashboard data:", err);
        // Set default empty data instead of showing error
        setDashboardData({
          appointments: { total: 0, upcoming: 0, list: [] },
          prescriptions: { total: 0, active: 0, list: [] },
          healthRecords: { total: 0, recent: [] },
          recentActivities: []
        });
        setTopClinics([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
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
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white dark:bg-gray-800 border-none shadow-sm">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-[#4caf9620] dark:bg-[#4caf9640] rounded-full flex items-center justify-center mb-4 text-[#4caf96]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <h3 className="font-['Montserrat',Helvetica] font-semibold text-[#1f4156] dark:text-white text-lg">
              Appointments
            </h3>
            <p className="text-3xl font-bold mt-2 text-[#4caf96]">
              {dashboardData?.appointments.total || 0}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {dashboardData?.appointments.upcoming || 0} upcoming appointments
            </p>
            <Button
              variant="ghost"
              className="w-full mt-4 bg-[#4caf9620] text-[#4caf96] font-medium hover:bg-[#4caf9630]"
              onClick={() => navigate('/appointments')}
            >
              {dashboardData?.appointments.total ? 'View All' : 'Schedule Appointment'}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-none shadow-sm">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-[#4caf9620] dark:bg-[#4caf9640] rounded-full flex items-center justify-center mb-4 text-[#4caf96]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                <line x1="4" y1="22" x2="4" y2="15" />
              </svg>
            </div>
            <h3 className="font-['Montserrat',Helvetica] font-semibold text-[#1f4156] dark:text-white text-lg">
              Prescriptions
            </h3>
            <p className="text-3xl font-bold mt-2 text-[#4caf96]">
              {dashboardData?.prescriptions.total || 0}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {dashboardData?.prescriptions.active || 0} active prescriptions
            </p>
            <Button
              variant="ghost"
              className="w-full mt-4 bg-[#4caf9620] text-[#4caf96] font-medium hover:bg-[#4caf9630]"
              onClick={() => navigate('/prescriptions')}
            >
              {dashboardData?.prescriptions.total ? 'View All' : 'Add Prescription'}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-none shadow-sm">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-[#4caf9620] dark:bg-[#4caf9640] rounded-full flex items-center justify-center mb-4 text-[#4caf96]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
                <path d="M16 13H8" />
                <path d="M16 17H8" />
                <path d="M10 9H8" />
              </svg>
            </div>
            <h3 className="font-['Montserrat',Helvetica] font-semibold text-[#1f4156] dark:text-white text-lg">
              Health Records
            </h3>
            <p className="text-3xl font-bold mt-2 text-[#4caf96]">
              {dashboardData?.healthRecords.total || 0}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Last updated: {dashboardData?.healthRecords.recent[0]?.date 
                ? new Date(dashboardData.healthRecords.recent[0].date).toLocaleDateString()
                : 'No records yet'}
            </p>
            <Button
              variant="ghost"
              className="w-full mt-4 bg-[#4caf9620] text-[#4caf96] font-medium hover:bg-[#4caf9630]"
              onClick={() => navigate('/records')}
            >
              {dashboardData?.healthRecords.total ? 'View All' : 'Add Health Record'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <div className="mt-8">
        <h2 className="font-['Montserrat',Helvetica] font-bold text-[#1f4156] dark:text-white text-xl mb-4">
          Recent Activities
        </h2>
        <Card className="bg-white dark:bg-gray-800 border-none shadow-sm">
          <CardContent className="p-0">
            {dashboardData?.recentActivities.length ? (
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {dashboardData.recentActivities.map((activity, index) => (
                  <div key={index} className="p-4 flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#4caf9620] dark:bg-[#4caf9640] rounded-full flex items-center justify-center text-[#4caf96]">
                      {activity.type === 'appointment' && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                          <line x1="16" x2="16" y1="2" y2="6" />
                          <line x1="8" x2="8" y1="2" y2="6" />
                          <line x1="3" x2="21" y1="10" y2="10" />
                          <path d="m9 16 2 2 4-4" />
                        </svg>
                      )}
                      {activity.type === 'prescription' && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                          <line x1="4" y1="22" x2="4" y2="15" />
                        </svg>
                      )}
                      {activity.type === 'record' && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <path d="M14 2v6h6" />
                          <path d="M16 13H8" />
                          <path d="M16 17H8" />
                          <path d="M10 9H8" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-[#1f4156] dark:text-white">
                        {activity.description}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(activity.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                No recent activities. Your activities will appear here.
              </div>
            )}
          </CardContent>
        </Card>
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