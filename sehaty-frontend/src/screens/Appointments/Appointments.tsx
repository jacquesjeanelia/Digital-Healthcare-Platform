import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { useAuth } from "../../lib/AuthContext";
import { QueueManager } from "../../components/QueueManager";

// Define the Appointment type
type Appointment = {
  id: number;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: string;
  location: string;
  notes: string;
};

export const Appointments = (): JSX.Element => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("upcoming"); // upcoming, past, all
  const [userAppointments, setUserAppointments] = useState<Appointment[]>([]);

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate("/auth/login");
    }
  }, [user, navigate]);

  // Filter appointments based on selected filter
  const filteredAppointments = userAppointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.date);
    const today = new Date();
    
    if (filter === "upcoming") {
      return appointmentDate >= today;
    } else if (filter === "past") {
      return appointmentDate < today;
    } else {
      return true; // all appointments
    }
  });

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
                My Appointments
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                View and manage your upcoming and past appointments
              </p>
            </div>
            <Button
              className="bg-[#4caf96] hover:bg-[#3d9d86] text-white font-bold"
              onClick={() => navigate('/doctors')}
            >
              Book New Appointment
            </Button>
          </div>

          {/* Filter Controls */}
          <div className="flex gap-2 mb-6">
            <Button
              variant={filter === "upcoming" ? "default" : "outline"}
              className={filter === "upcoming" 
                ? "bg-[#4caf96] hover:bg-[#3d9d86] text-white" 
                : "border-[#4caf96] text-[#4caf96] hover:bg-[#4caf9610]"}
              onClick={() => setFilter("upcoming")}
            >
              Upcoming
            </Button>
            <Button
              variant={filter === "past" ? "default" : "outline"}
              className={filter === "past" 
                ? "bg-[#4caf96] hover:bg-[#3d9d86] text-white" 
                : "border-[#4caf96] text-[#4caf96] hover:bg-[#4caf9610]"}
              onClick={() => setFilter("past")}
            >
              Past
            </Button>
            <Button
              variant={filter === "all" ? "default" : "outline"}
              className={filter === "all" 
                ? "bg-[#4caf96] hover:bg-[#3d9d86] text-white" 
                : "border-[#4caf96] text-[#4caf96] hover:bg-[#4caf9610]"}
              onClick={() => setFilter("all")}
            >
              All
            </Button>
          </div>

          {/* Appointments List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="grid grid-cols-1 gap-4">
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((appointment) => (
                    <Card key={appointment.id} className="bg-white dark:bg-gray-800 border-none shadow-sm overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          {/* Status Indicator */}
                          <div 
                            className={`w-full md:w-2 ${
                              appointment.status === "confirmed" 
                                ? "bg-[#4caf96]" 
                                : appointment.status === "completed" 
                                  ? "bg-blue-500" 
                                  : "bg-yellow-500"
                            }`}
                          />
                          
                          <div className="p-6 flex-1">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-bold text-[#1f4156] dark:text-white text-lg">
                                    {appointment.doctorName}
                                  </h3>
                                  <span className="text-[#4caf96] text-sm font-medium">
                                    {appointment.specialty}
                                  </span>
                                </div>
                                
                                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mt-2">
                                  <div className="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                      <line x1="16" y1="2" x2="16" y2="6"></line>
                                      <line x1="8" y1="2" x2="8" y2="6"></line>
                                      <line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                    <span className="text-gray-700 dark:text-gray-300 text-sm">
                                      {new Date(appointment.date).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                      })}
                                    </span>
                                  </div>
                                  
                                  <div className="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                                      <circle cx="12" cy="12" r="10"></circle>
                                      <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg>
                                    <span className="text-gray-700 dark:text-gray-300 text-sm">
                                      {appointment.time}
                                    </span>
                                  </div>
                                  
                                  <div className="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                      <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                    <span className="text-gray-700 dark:text-gray-300 text-sm">
                                      {appointment.location}
                                    </span>
                                  </div>
                                </div>
                                
                                <div className="mt-4">
                                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    {appointment.notes}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex flex-col gap-2">
                                <Button
                                  variant="outline"
                                  className="border-[#4caf96] text-[#4caf96] hover:bg-[#4caf9610]"
                                  onClick={() => {
                                    // Handle reschedule
                                    alert('Reschedule appointment with ' + appointment.doctorName);
                                  }}
                                >
                                  Reschedule
                                </Button>
                                <Button
                                  variant="outline"
                                  className="border-red-500 text-red-500 hover:bg-red-50"
                                  onClick={() => {
                                    // Handle cancel
                                    alert('Cancel appointment with ' + appointment.doctorName);
                                  }}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">No appointments found.</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Queue Manager */}
            <div className="md:col-span-1">
              <QueueManager />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 