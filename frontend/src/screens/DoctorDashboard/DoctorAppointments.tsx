import React, { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../components/ui/select";

interface Appointment {
  id: number;
  patientName: string;
  patientAge: number;
  patientGender: "male" | "female" | "other";
  date: string;
  time: string;
  status: "scheduled" | "checked-in" | "in-progress" | "completed" | "cancelled" | "no-show";
  type: "regular" | "follow-up" | "urgent" | "new-patient";
  notes?: string;
  contactNumber: string;
}

export const DoctorAppointments = (): JSX.Element => {
  const [filter, setFilter] = useState("today");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock appointments data
  const mockAppointments: Appointment[] = [
    {
      id: 1,
      patientName: "Ahmed Al-Mansouri",
      patientAge: 42,
      patientGender: "male",
      date: "2023-05-18",
      time: "09:00 AM",
      status: "scheduled",
      type: "regular",
      contactNumber: "+20 123 456 7890",
      notes: "Follow-up on blood pressure medication"
    },
    {
      id: 2,
      patientName: "Fatima Hassan",
      patientAge: 35,
      patientGender: "female",
      date: "2023-05-18",
      time: "10:00 AM",
      status: "checked-in",
      type: "follow-up",
      contactNumber: "+20 123 555 7890",
      notes: "Post-surgery check-up"
    },
    {
      id: 3,
      patientName: "Mahmoud Abbas",
      patientAge: 55,
      patientGender: "male",
      date: "2023-05-18",
      time: "11:30 AM",
      status: "in-progress",
      type: "urgent",
      contactNumber: "+20 128 456 1230",
    },
    {
      id: 4,
      patientName: "Layla Said",
      patientAge: 28,
      patientGender: "female",
      date: "2023-05-18",
      time: "01:00 PM",
      status: "scheduled",
      type: "regular",
      contactNumber: "+20 111 456 7890",
    },
    {
      id: 5,
      patientName: "Omar Ibrahim",
      patientAge: 63,
      patientGender: "male",
      date: "2023-05-18",
      time: "02:30 PM",
      status: "scheduled",
      type: "follow-up",
      contactNumber: "+20 123 456 5555",
      notes: "Diabetic review"
    },
    {
      id: 6,
      patientName: "Nour Ahmed",
      patientAge: 18,
      patientGender: "female",
      date: "2023-05-17",
      time: "09:30 AM",
      status: "completed",
      type: "new-patient",
      contactNumber: "+20 123 456 8888",
    },
    {
      id: 7,
      patientName: "Karim Essam",
      patientAge: 45,
      patientGender: "male",
      date: "2023-05-17",
      time: "11:00 AM",
      status: "no-show",
      type: "regular",
      contactNumber: "+20 123 999 7890",
    },
    {
      id: 8,
      patientName: "Sara Mohamed",
      patientAge: 32,
      patientGender: "female",
      date: "2023-05-19",
      time: "10:00 AM",
      status: "scheduled",
      type: "regular",
      contactNumber: "+20 123 456 7890",
    }
  ];

  // Filter appointments based on selected filters
  const filteredAppointments = mockAppointments.filter(appointment => {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    // Date filter
    const dateMatches = 
      (filter === "today" && appointment.date === today) ||
      (filter === "tomorrow" && appointment.date === tomorrowStr) ||
      (filter === "all");

    // Status filter
    const statusMatches = 
      statusFilter === "all" || 
      appointment.status === statusFilter;

    // Search query
    const searchMatches = 
      appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.contactNumber.includes(searchQuery);

    return dateMatches && statusMatches && searchMatches;
  });

  // Sort appointments by time
  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    // First by date
    if (a.date !== b.date) {
      return a.date.localeCompare(b.date);
    }
    
    // Then by time
    return a.time.localeCompare(b.time);
  });

  // Status color mapping
  const getStatusColor = (status: Appointment["status"]) => {
    switch (status) {
      case "scheduled": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "checked-in": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "in-progress": return "bg-[#4caf9620] text-[#4caf96] dark:bg-[#4caf9640] dark:text-[#4caf96]";
      case "completed": return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
      case "cancelled": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "no-show": return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  // Type label mapping
  const getTypeLabel = (type: Appointment["type"]) => {
    switch (type) {
      case "regular": return "Regular";
      case "follow-up": return "Follow-up";
      case "urgent": return "Urgent";
      case "new-patient": return "New Patient";
      default: return type;
    }
  };

  // Type color mapping
  const getTypeColor = (type: Appointment["type"]) => {
    switch (type) {
      case "regular": return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
      case "follow-up": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "urgent": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "new-patient": return "bg-[#4caf9620] text-[#4caf96] dark:bg-[#4caf9640] dark:text-[#4caf96]";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-[#1f4156] dark:text-white">Appointments</h2>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Input
              placeholder="Search patient name or contact..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-gray-700 pr-8"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          
          <div className="flex gap-2">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-32 bg-white dark:bg-gray-700">
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="tomorrow">Tomorrow</SelectItem>
                <SelectItem value="all">All</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32 bg-white dark:bg-gray-700">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="checked-in">Checked In</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="no-show">No Show</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {sortedAppointments.length > 0 ? (
          sortedAppointments.map((appointment) => (
            <Card 
              key={appointment.id} 
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-[#4caf96] dark:hover:border-[#4caf96] transition-all"
            >
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <div className="w-10 h-10 bg-[#4caf9610] dark:bg-[#4caf9630] rounded-full flex items-center justify-center text-[#4caf96] font-bold flex-shrink-0">
                      {appointment.patientName.charAt(0)}
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-[#1f4156] dark:text-white">{appointment.patientName}</h3>
                      <div className="flex flex-wrap gap-2 mt-1 text-sm">
                        <span className="text-gray-600 dark:text-gray-400">{appointment.patientAge} yrs • {appointment.patientGender === "male" ? "Male" : appointment.patientGender === "female" ? "Female" : "Other"}</span>
                        <span className="text-gray-600 dark:text-gray-400">•</span>
                        <span className="text-gray-600 dark:text-gray-400">{appointment.contactNumber}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 items-center">
                    <div className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {new Date(appointment.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{appointment.time}</span>
                    </div>
                    
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(appointment.status)}`}>
                      {appointment.status.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                    
                    <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(appointment.type)}`}>
                      {getTypeLabel(appointment.type)}
                    </span>
                  </div>
                </div>
                
                {appointment.notes && (
                  <div className="mt-3 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-750 p-2 rounded">
                    <span className="font-medium">Notes:</span> {appointment.notes}
                  </div>
                )}
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {appointment.status === "scheduled" && (
                    <>
                      <Button 
                        size="sm" 
                        className="bg-[#4caf96] hover:bg-[#3d9d86] text-white"
                      >
                        Check-in
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-[#4caf96] text-[#4caf96] hover:bg-[#4caf9610]"
                      >
                        Reschedule
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                  
                  {appointment.status === "checked-in" && (
                    <Button 
                      size="sm" 
                      className="bg-[#4caf96] hover:bg-[#3d9d86] text-white"
                    >
                      Start Appointment
                    </Button>
                  )}
                  
                  {appointment.status === "in-progress" && (
                    <Button 
                      size="sm" 
                      className="bg-[#4caf96] hover:bg-[#3d9d86] text-white"
                    >
                      Complete Appointment
                    </Button>
                  )}
                  
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="ml-auto border-gray-300 dark:border-gray-600"
                  >
                    View Patient Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-[#4caf9620] dark:bg-[#4caf9640] rounded-full flex items-center justify-center text-[#4caf96] mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
                <path d="M12 18v-6" />
                <path d="M9 15h6" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#1f4156] dark:text-white mb-2">No appointments found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchQuery 
                ? "No appointments match your search criteria." 
                : filter === "today" 
                  ? "You don't have any appointments scheduled for today."
                  : filter === "tomorrow"
                    ? "You don't have any appointments scheduled for tomorrow."
                    : "You don't have any appointments in the selected period."
              }
            </p>
            <Button 
              className="bg-[#4caf96] hover:bg-[#3d9d86] text-white"
            >
              Create New Appointment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}; 