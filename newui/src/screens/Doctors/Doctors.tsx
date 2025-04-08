import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";

// Sample doctor data
const DOCTORS = [
  {
    id: 1,
    name: "Dr. Ahmed Hassan",
    specialty: "Cardiology",
    experience: "15 years",
    rating: 4.9,
    patients: 1500,
    image: "/doctor1.png",
    available: true,
  },
  {
    id: 2,
    name: "Dr. Sara Mohamed",
    specialty: "Dermatology",
    experience: "8 years",
    rating: 4.7,
    patients: 950,
    image: "/doctor2.png",
    available: true,
  },
  {
    id: 3,
    name: "Dr. Mahmoud Ali",
    specialty: "Pediatrics",
    experience: "12 years",
    rating: 4.8,
    patients: 1200,
    image: "/doctor3.png",
    available: false,
  },
  {
    id: 4,
    name: "Dr. Nadia Ibrahim",
    specialty: "Orthopedics",
    experience: "10 years",
    rating: 4.6,
    patients: 870,
    image: "/doctor4.png",
    available: true,
  },
  {
    id: 5,
    name: "Dr. Khaled Omar",
    specialty: "General Medicine",
    experience: "7 years",
    rating: 4.5,
    patients: 650,
    image: "/doctor5.png",
    available: true,
  },
  {
    id: 6,
    name: "Dr. Laila Farouk",
    specialty: "Ophthalmology",
    experience: "9 years",
    rating: 4.8,
    patients: 780,
    image: "/doctor6.png",
    available: false,
  },
];

// List of specialties for filter
const SPECIALTIES = [
  "All Specialties",
  "Cardiology",
  "Dermatology",
  "Pediatrics",
  "Orthopedics",
  "General Medicine",
  "Ophthalmology",
  "Neurology",
  "Gynecology",
];

export const Doctors = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 4;

  // Filter doctors based on search, specialty, and availability
  const filteredDoctors = DOCTORS.filter((doctor) => {
    // Filter by search term
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by specialty
    const matchesSpecialty = 
      selectedSpecialty === "All Specialties" || 
      doctor.specialty === selectedSpecialty;
    
    // Filter by availability
    const matchesAvailability = !availableOnly || doctor.available;
    
    return matchesSearch && matchesSpecialty && matchesAvailability;
  });

  // Pagination logic
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

  // Handle page change
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="bg-white dark:bg-gray-900 flex flex-row justify-center w-full min-h-screen">
      <div className="w-full max-w-[1280px] relative pt-[75px] px-4 md:px-6">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-start gap-4">
            <h1 className="font-['Montserrat',Helvetica] font-bold text-blue-900 dark:text-white text-3xl">
              Find the Right Doctor
            </h1>
            <p className="font-['Inter',Helvetica] text-gray-500 dark:text-gray-400 text-lg">
              Search and filter to find the healthcare professional that meets your needs
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 p-5 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <Input
              className="h-10 flex-grow bg-white dark:bg-gray-700 rounded-xl text-gray-800 dark:text-white text-sm"
              placeholder="Search by doctor name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <div className="flex flex-col md:flex-row gap-4">
              <select
                className="h-10 px-3 py-2 bg-white dark:bg-gray-700 rounded-xl text-gray-800 dark:text-white text-sm border border-gray-200 dark:border-gray-600"
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
              >
                {SPECIALTIES.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="available"
                  className="w-4 h-4 accent-[#a818fc]"
                  checked={availableOnly}
                  onChange={() => setAvailableOnly(!availableOnly)}
                />
                <label htmlFor="available" className="text-gray-800 dark:text-white text-sm">
                  Available Now
                </label>
              </div>
            </div>
          </div>

          {/* Doctors List */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="font-['Inter',Helvetica] font-medium text-gray-800 dark:text-white text-lg">
                {filteredDoctors.length} {filteredDoctors.length === 1 ? "Doctor" : "Doctors"} Found
              </h2>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing {indexOfFirstDoctor + 1}-{Math.min(indexOfLastDoctor, filteredDoctors.length)} of {filteredDoctors.length}
              </div>
            </div>
            
            {currentDoctors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {currentDoctors.map((doctor) => (
                  <Card 
                    key={doctor.id} 
                    className="border border-gray-200 dark:border-gray-700 dark:bg-gray-800 overflow-hidden"
                  >
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-[120px] h-[120px] bg-gray-200 dark:bg-gray-700 relative">
                          <div className="w-full h-full flex items-center justify-center">
                            {/* Doctor image placeholder */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                              <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                          </div>
                          
                          {doctor.available && (
                            <div className="absolute top-2 left-2 flex items-center gap-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-xs text-green-500 font-medium">Available</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="p-4 flex-1">
                          <div className="flex flex-col gap-2">
                            <div className="flex justify-between">
                              <h3 className="font-['Montserrat',Helvetica] font-bold text-blue-900 dark:text-white text-lg">
                                {doctor.name}
                              </h3>
                              <div className="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FCAC12" stroke="#FCAC12" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                </svg>
                                <span className="text-sm font-medium">{doctor.rating}</span>
                              </div>
                            </div>
                            
                            <p className="text-[#a818fc] text-sm font-medium">{doctor.specialty}</p>
                            
                            <div className="grid grid-cols-2 gap-2 mt-1">
                              <div className="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 dark:text-gray-400">
                                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                                  <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                                <span className="text-xs text-gray-500 dark:text-gray-400">{doctor.experience}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 dark:text-gray-400">
                                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                  <circle cx="9" cy="7" r="4"></circle>
                                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg>
                                <span className="text-xs text-gray-500 dark:text-gray-400">{doctor.patients}+ Patients</span>
                              </div>
                            </div>
                            
                            <div className="mt-2 flex gap-2">
                              <Button 
                                className="flex-1 h-9 bg-[#a818fc] text-white font-bold text-sm rounded-lg hover:bg-[#8a14d4]"
                              >
                                Book Appointment
                              </Button>
                              <Button 
                                variant="ghost" 
                                className="h-9 px-3 bg-[#a918fd0d] text-[#a818fc] font-bold text-sm rounded-lg hover:bg-[#a918fd1a]"
                              >
                                View Profile
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center bg-gray-50 dark:bg-gray-800 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mb-4">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
                <h3 className="font-['Montserrat',Helvetica] font-medium text-gray-800 dark:text-white text-lg mb-1">
                  No doctors found
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-4">
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    className="h-8 w-8 p-0 text-sm"
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    &lt;
                  </Button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                    <Button
                      key={number}
                      variant={currentPage === number ? "default" : "ghost"}
                      className={`h-8 w-8 p-0 text-sm ${
                        currentPage === number 
                          ? "bg-[#a818fc] text-white"
                          : "text-gray-800 dark:text-white"
                      }`}
                      onClick={() => paginate(number)}
                    >
                      {number}
                    </Button>
                  ))}
                  
                  <Button
                    variant="ghost"
                    className="h-8 w-8 p-0 text-sm"
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    &gt;
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 