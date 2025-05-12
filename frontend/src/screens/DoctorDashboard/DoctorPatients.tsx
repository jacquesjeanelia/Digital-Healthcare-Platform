import React, { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  lastVisit: string;
  contactNumber: string;
  email: string;
  condition?: string;
  medicalRecordNumber: string;
}

export const DoctorPatients = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Mock patients data
  const mockPatients: Patient[] = [
    {
      id: 1,
      name: "Ahmed Al-Mansouri",
      age: 42,
      gender: "male",
      lastVisit: "2023-05-12",
      contactNumber: "+20 123 456 7890",
      email: "ahmed.mansouri@example.com",
      condition: "Hypertension",
      medicalRecordNumber: "MRN2023001"
    },
    {
      id: 2,
      name: "Fatima Hassan",
      age: 35,
      gender: "female",
      lastVisit: "2023-05-10",
      contactNumber: "+20 123 555 7890",
      email: "fatima.hassan@example.com",
      condition: "Post-operative care",
      medicalRecordNumber: "MRN2023015"
    },
    {
      id: 3,
      name: "Mahmoud Abbas",
      age: 55,
      gender: "male",
      lastVisit: "2023-05-04",
      contactNumber: "+20 128 456 1230",
      email: "mahmoud.abbas@example.com",
      condition: "Diabetes Type 2",
      medicalRecordNumber: "MRN2022189"
    },
    {
      id: 4,
      name: "Layla Said",
      age: 28,
      gender: "female",
      lastVisit: "2023-04-28",
      contactNumber: "+20 111 456 7890",
      email: "layla.said@example.com",
      medicalRecordNumber: "MRN2023042"
    },
    {
      id: 5,
      name: "Omar Ibrahim",
      age: 63,
      gender: "male",
      lastVisit: "2023-04-15",
      contactNumber: "+20 123 456 5555",
      email: "omar.ibrahim@example.com",
      condition: "Arthritis",
      medicalRecordNumber: "MRN2022076"
    },
    {
      id: 6,
      name: "Nour Ahmed",
      age: 18,
      gender: "female",
      lastVisit: "2023-05-17",
      contactNumber: "+20 123 456 8888",
      email: "nour.ahmed@example.com",
      medicalRecordNumber: "MRN2023105"
    }
  ];

  // Filter patients based on search query and active tab
  const filteredPatients = mockPatients.filter(patient => {
    // Search filter
    const searchMatches = 
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.contactNumber.includes(searchQuery) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.medicalRecordNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Tab filter - we're not implementing complex filtering for this demo
    // but in a real app you might filter by recent patients, conditions, etc.
    return searchMatches;
  });

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient) => (
            <Card 
              key={patient.id} 
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-[#4caf96] dark:hover:border-[#4caf96] transition-all"
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#4caf9610] dark:bg-[#4caf9630] rounded-full flex items-center justify-center text-[#4caf96] font-bold flex-shrink-0">
                    {patient.name.charAt(0)}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-[#1f4156] dark:text-white">{patient.name}</h3>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {patient.age} yrs • {patient.gender === "male" ? "Male" : patient.gender === "female" ? "Female" : "Other"}
                    </div>
                    
                    <div className="grid grid-cols-1 gap-1 mt-3 text-sm">
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">{patient.contactNumber}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                          <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">{patient.email}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                          <path d="M19 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="3"></circle>
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">{patient.medicalRecordNumber}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">
                          Last visit: {new Date(patient.lastVisit).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric"
                          })}
                        </span>
                      </div>
                    </div>
                    
                    {patient.condition && (
                      <div className="mt-3 bg-[#4caf9610] dark:bg-[#4caf9620] text-[#4caf96] text-xs px-2 py-1 rounded-full inline-block">
                        {patient.condition}
                      </div>
                    )}
                    
                    <div className="mt-4 flex gap-2">
                      <Button 
                        size="sm" 
                        className="bg-[#4caf96] hover:bg-[#3d9d86] text-white"
                      >
                        View Record
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-[#4caf96] text-[#4caf96] hover:bg-[#4caf9610]"
                      >
                        Book Appointment
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-[#4caf9620] dark:bg-[#4caf9640] rounded-full flex items-center justify-center text-[#4caf96] mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <path d="M20 8v6"></path>
                <path d="M23 11h-6"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#1f4156] dark:text-white mb-2">No patients found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchQuery 
                ? "No patients match your search criteria." 
                : "You haven't added any patients yet."
              }
            </p>
            <Button 
              className="bg-[#4caf96] hover:bg-[#3d9d86] text-white"
            >
              Add New Patient
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}; 