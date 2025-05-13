import React, { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  lastVisit: string;
  nextAppointment: string;
  status: string;
}

interface DoctorPatientsProps {
  patients: Patient[];
}

export const DoctorPatients: React.FC<DoctorPatientsProps> = ({ patients }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Mock patients data
  const mockPatients: Patient[] = [
    {
      id: "1",
      name: "Ahmed Al-Mansouri",
      age: 42,
      gender: "male",
      lastVisit: "2023-05-12",
      nextAppointment: "2023-06-01",
      status: "Active"
    },
    {
      id: "2",
      name: "Fatima Hassan",
      age: 35,
      gender: "female",
      lastVisit: "2023-05-10",
      nextAppointment: "2023-05-20",
      status: "Active"
    },
    {
      id: "3",
      name: "Mahmoud Abbas",
      age: 55,
      gender: "male",
      lastVisit: "2023-05-04",
      nextAppointment: "2023-05-15",
      status: "Active"
    },
    {
      id: "4",
      name: "Layla Said",
      age: 28,
      gender: "female",
      lastVisit: "2023-04-28",
      nextAppointment: "2023-05-05",
      status: "Active"
    },
    {
      id: "5",
      name: "Omar Ibrahim",
      age: 63,
      gender: "male",
      lastVisit: "2023-04-15",
      nextAppointment: "2023-04-25",
      status: "Active"
    },
    {
      id: "6",
      name: "Nour Ahmed",
      age: 18,
      gender: "female",
      lastVisit: "2023-05-17",
      nextAppointment: "2023-05-27",
      status: "Active"
    }
  ];

  // Filter patients based on search query and active tab
  const filteredPatients = mockPatients.filter(patient => {
    // Search filter
    const searchMatches = 
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.gender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.lastVisit.includes(searchQuery) ||
      patient.nextAppointment.includes(searchQuery);
    
    // Tab filter - we're not implementing complex filtering for this demo
    // but in a real app you might filter by recent patients, conditions, etc.
    return searchMatches;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-[#1f4156] dark:text-white">Patients</h2>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Input
              placeholder="Search patients..."
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
          
          <Button className="bg-[#4caf96] hover:bg-[#3d9d86] text-white">
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
              className="mr-2"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <line x1="20" y1="8" x2="20" y2="14"></line>
              <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
            Add New Patient
          </Button>
        </div>
      </div>

      <Tabs 
        defaultValue="all" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full mb-6"
      >
        <TabsList className="grid grid-cols-3 w-[400px] bg-[#4caf9615] dark:bg-gray-800 p-1 rounded-xl">
          <TabsTrigger 
            value="all" 
            className={`${activeTab === "all" ? "bg-white dark:bg-gray-700 shadow-sm" : "hover:bg-[#4caf9620] dark:hover:bg-gray-700/70"} rounded-lg transition-all data-[state=active]:text-[#4caf96] data-[state=active]:font-medium`}
          >
            All Patients
          </TabsTrigger>
          <TabsTrigger 
            value="recent" 
            className={`${activeTab === "recent" ? "bg-white dark:bg-gray-700 shadow-sm" : "hover:bg-[#4caf9620] dark:hover:bg-gray-700/70"} rounded-lg transition-all data-[state=active]:text-[#4caf96] data-[state=active]:font-medium`}
          >
            Recent
          </TabsTrigger>
          <TabsTrigger 
            value="chronic" 
            className={`${activeTab === "chronic" ? "bg-white dark:bg-gray-700 shadow-sm" : "hover:bg-[#4caf9620] dark:hover:bg-gray-700/70"} rounded-lg transition-all data-[state=active]:text-[#4caf96] data-[state=active]:font-medium`}
          >
            Chronic Care
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        {filteredPatients.map((patient) => (
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
              <span className={`px-2 py-1 rounded text-sm ${getStatusColor(patient.status)}`}>
                {patient.status}
              </span>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md">
                View Profile
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md">
                Schedule Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 