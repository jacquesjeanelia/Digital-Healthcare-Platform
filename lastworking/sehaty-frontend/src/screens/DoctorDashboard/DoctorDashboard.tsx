import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { useAuth } from "../../lib/AuthContext";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import { DoctorAppointments } from "./DoctorAppointments";
import { DoctorPatients } from "./DoctorPatients";
import { DoctorAnalytics } from "./DoctorAnalytics";
import { DoctorSettings } from "./DoctorSettings";

export const DoctorDashboard = (): JSX.Element => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("appointments");

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate("/auth/doctor-login");
    }
  }, [user, navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

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

          {/* Doctor Dashboard Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-white dark:bg-gray-800 border-none shadow-sm transform transition-transform hover:scale-105">
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
                <p className="text-3xl font-bold mt-2 text-[#4caf96]">8</p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  3 pending, 2 completed
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-none shadow-sm transform transition-transform hover:scale-105">
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
                  Total Patients
                </h3>
                <p className="text-3xl font-bold mt-2 text-[#4caf96]">126</p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  12 new this month
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-none shadow-sm transform transition-transform hover:scale-105">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[#4caf9620] dark:bg-[#4caf9640] rounded-full flex items-center justify-center mb-4 text-[#4caf96]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <h3 className="font-['Montserrat',Helvetica] font-semibold text-[#1f4156] dark:text-white text-lg">
                  Avg. Wait Time
                </h3>
                <p className="text-3xl font-bold mt-2 text-[#4caf96]">14<span className="text-lg">min</span></p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Down 3 min from last week
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-none shadow-sm transform transition-transform hover:scale-105">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[#4caf9620] dark:bg-[#4caf9640] rounded-full flex items-center justify-center mb-4 text-[#4caf96]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13"></rect>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                  </svg>
                </div>
                <h3 className="font-['Montserrat',Helvetica] font-semibold text-[#1f4156] dark:text-white text-lg">
                  Home Visits
                </h3>
                <p className="text-3xl font-bold mt-2 text-[#4caf96]">4</p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Scheduled for this week
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Content */}
          <Tabs 
            defaultValue="appointments" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-4 gap-2 bg-[#4caf9615] dark:bg-gray-800 p-1 rounded-xl mb-6">
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
                value="settings" 
                className={`${activeTab === "settings" ? "bg-white dark:bg-gray-700 shadow-sm" : "hover:bg-[#4caf9620] dark:hover:bg-gray-700/70"} rounded-lg transition-all data-[state=active]:text-[#4caf96] data-[state=active]:font-medium`}
              >
                Settings
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="appointments" className="mt-0">
              <DoctorAppointments />
            </TabsContent>
            
            <TabsContent value="patients" className="mt-0">
              <DoctorPatients />
            </TabsContent>
            
            <TabsContent value="analytics" className="mt-0">
              <DoctorAnalytics />
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