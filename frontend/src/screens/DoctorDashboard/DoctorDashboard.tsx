import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { useAuth } from "../../lib/AuthContext";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import { DoctorAppointments } from "./DoctorAppointments";
import { DoctorPatients } from "./DoctorPatients";
import { DoctorAnalytics } from "./DoctorAnalytics";
import { DoctorSettings } from "./DoctorSettings";
import { DoctorVerification } from "./DoctorVerification";
import { DoctorReview } from "../../components/DoctorReview";
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

export const DoctorDashboard = (): JSX.Element => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        if (user?.email === 'test.doctor@sehaty.com') {
          setDashboardData(user.dashboardData as DashboardData);
        } else {
          const response = await fetch('/api/doctor/dashboard');
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

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate("/auth/doctor-login");
    }
  }, [user, navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4caf96]"></div>
      </div>
    );
  }

  const handleReviewSubmit = async (rating: number, comment: string): Promise<void> => {
    // TODO: Implement review submission
    console.log('Submitting review:', { rating, comment });
  };

  return (
    <div className="bg-[#f8f5f2] dark:bg-gray-900 flex flex-row justify-center w-full min-h-screen">
      <div className="w-full max-w-[1280px] relative pt-[75px] px-4 md:px-6">
        <div className="flex flex-col gap-8">
          {/* Page Header */}
          <div className="flex flex-col items-start md:flex-row md:items-center md:justify-between gap-4 py-6">
            <div>
              <h1 className="font-['Montserrat',Helvetica] font-bold text-[#1f4156] dark:text-white text-3xl">
                Doctor Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Manage appointments, patients, and view analytics
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-[#4caf96] text-[#4caf96] hover:bg-[#4caf9610]"
                onClick={() => navigate('/doctor-profile')}
              >
                My Profile
              </Button>
              <Button
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                onClick={() => {
                  logout();
                  navigate('/auth/doctor-login');
                }}
              >
                Logout
              </Button>
            </div>
          </div>

          {/* Verification Status */}
          <DoctorVerification />

          {/* Doctor Dashboard Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                  Today's Appointments
                </h3>
                <p className="text-3xl font-bold mt-2 text-[#4caf96]">
                  {dashboardData?.appointments.upcoming || 0}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {dashboardData?.appointments.total || 0} total appointments
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-none shadow-sm">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[#4caf9620] dark:bg-[#4caf9640] rounded-full flex items-center justify-center mb-4 text-[#4caf96]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 className="font-['Montserrat',Helvetica] font-semibold text-[#1f4156] dark:text-white text-lg">
                  Active Patients
                </h3>
                <p className="text-3xl font-bold mt-2 text-[#4caf96]">
                  {dashboardData?.patients?.active || 0}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {dashboardData?.patients?.total || 0} total patients
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-none shadow-sm">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[#4caf9620] dark:bg-[#4caf9640] rounded-full flex items-center justify-center mb-4 text-[#4caf96]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                    <line x1="4" y1="22" x2="4" y2="15"></line>
                  </svg>
                </div>
                <h3 className="font-['Montserrat',Helvetica] font-semibold text-[#1f4156] dark:text-white text-lg">
                  Active Prescriptions
                </h3>
                <p className="text-3xl font-bold mt-2 text-[#4caf96]">
                  {dashboardData?.prescriptions.active || 0}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {dashboardData?.prescriptions.total || 0} total prescriptions
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-none shadow-sm">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[#4caf9620] dark:bg-[#4caf9640] rounded-full flex items-center justify-center mb-4 text-[#4caf96]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h3 className="font-['Montserrat',Helvetica] font-semibold text-[#1f4156] dark:text-white text-lg">
                  Monthly Stats
                </h3>
                <p className="text-3xl font-bold mt-2 text-[#4caf96]">
                  {dashboardData?.analytics?.monthlyStats.completedAppointments || 0}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Completed appointments this month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs
            defaultValue="overview" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-5 gap-2 bg-[#4caf9615] dark:bg-gray-800 p-1 rounded-xl mb-6">
              <TabsTrigger 
                value="overview" 
                className={`${activeTab === "overview" ? "bg-white dark:bg-gray-700 shadow-sm" : "hover:bg-[#4caf9620] dark:hover:bg-gray-700/70"} rounded-lg transition-all data-[state=active]:text-[#4caf96] data-[state=active]:font-medium`}
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="appointments" 
                className={`${activeTab === "appointments" ? "bg-white dark:bg-gray-700 shadow-sm" : "hover:bg-[#4caf9620] dark:hover:bg-gray-700/70"} rounded-lg transition-all data-[state=active]:text-[#4caf96] data-[state=active]:font-medium`}
              >
                Appointments
              </TabsTrigger>
              <TabsTrigger 
                value="patients" 
                className={`${activeTab === "patients" ? "bg-white dark:bg-gray-700 shadow-sm" : "hover:bg-[#4caf9620] dark:hover:bg-gray-700/70"} rounded-lg transition-all data-[state=active]:text-[#4caf96] data-[state=active]:font-medium`}
              >
                Patients
              </TabsTrigger>
              <TabsTrigger 
                value="analytics" 
                className={`${activeTab === "analytics" ? "bg-white dark:bg-gray-700 shadow-sm" : "hover:bg-[#4caf9620] dark:hover:bg-gray-700/70"} rounded-lg transition-all data-[state=active]:text-[#4caf96] data-[state=active]:font-medium`}
              >
                Analytics
              </TabsTrigger>
              <TabsTrigger 
                value="reviews" 
                className={`${activeTab === "reviews" ? "bg-white dark:bg-gray-700 shadow-sm" : "hover:bg-[#4caf9620] dark:hover:bg-gray-700/70"} rounded-lg transition-all data-[state=active]:text-[#4caf96] data-[state=active]:font-medium`}
              >
                Reviews
              </TabsTrigger>
              <TabsTrigger 
                value="settings" 
                className={`${activeTab === "settings" ? "bg-white dark:bg-gray-700 shadow-sm" : "hover:bg-[#4caf9620] dark:hover:bg-gray-700/70"} rounded-lg transition-all data-[state=active]:text-[#4caf96] data-[state=active]:font-medium`}
              >
                Settings
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-0">
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
            </TabsContent>
            
            <TabsContent value="appointments" className="mt-0">
              <DoctorAppointments appointments={dashboardData?.appointments.list || []} />
            </TabsContent>
            
            <TabsContent value="patients" className="mt-0">
              <DoctorPatients patients={dashboardData?.patients?.list || []} />
            </TabsContent>
            
            <TabsContent value="analytics">
              {dashboardData?.analytics ? (
                <DoctorAnalytics analytics={dashboardData.analytics} />
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">No analytics data available</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="reviews" className="mt-0">
              <DoctorReview
                doctorId={user.id}
                reviews={[]}
                onReviewSubmit={handleReviewSubmit}
              />
            </TabsContent>
            
            <TabsContent value="settings" className="mt-0">
              <DoctorSettings />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}; 