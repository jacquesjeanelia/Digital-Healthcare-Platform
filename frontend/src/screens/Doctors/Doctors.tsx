import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";
import { useNavigate } from "react-router-dom";

// Sample doctor data
const DOCTORS = [
  {
    id: 1,
    name: "Dr. Ahmed Hassan",
    specialty: "Cardiology",
    experience: "15 years",
    rating: 4.9,
    patients: 1500,
    available: true,
  },
  {
    id: 2,
    name: "Dr. Sara Mohamed",
    specialty: "Dermatology",
    experience: "8 years",
    rating: 4.7,
    patients: 950,
    available: true,
  },
  {
    id: 3,
    name: "Dr. Mahmoud Ali",
    specialty: "Pediatrics",
    experience: "12 years",
    rating: 4.8,
    patients: 1200,
    available: false,
  },
  {
    id: 4,
    name: "Dr. Nadia Ibrahim",
    specialty: "Orthopedics",
    experience: "10 years",
    rating: 4.6,
    patients: 870,
    available: true,
  },
  {
    id: 5,
    name: "Dr. Khaled Omar",
    specialty: "General Medicine",
    experience: "7 years",
    rating: 4.5,
    patients: 650,
    available: true,
  },
  {
    id: 6,
    name: "Dr. Laila Farouk",
    specialty: "Ophthalmology",
    experience: "9 years",
    rating: 4.8,
    patients: 780,
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

// Define the Doctor type
type Doctor = {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  patients: number;
  available: boolean;
};

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

export const Doctors = (): JSX.Element => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 4;
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [userAppointments, setUserAppointments] = useState<Appointment[]>([]);

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

  // Handle booking appointment
  const handleBookAppointment = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setShowBookingModal(true);
  };

  // Handle confirm booking
  const handleConfirmBooking = () => {
    if (selectedDoctor) {
      const newAppointment: Appointment = {
        id: userAppointments.length + 1,
        doctorName: selectedDoctor.name,
        specialty: selectedDoctor.specialty,
        date: bookingDate,
        time: bookingTime,
        status: "confirmed",
        location: "Main Hospital, Floor 3",
        notes: "Please arrive 15 minutes early to complete paperwork",
      };
      setUserAppointments([...userAppointments, newAppointment]);
      alert(`Appointment booked with ${selectedDoctor.name} on ${bookingDate} at ${bookingTime}`);
      setShowBookingModal(false);
      setSelectedDoctor(null);
      setBookingDate("");
      setBookingTime("");
    }
  };

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
                  className="w-4 h-4 accent-[#4caf96]"
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
                        <div className="w-full md:w-[120px] h-[120px] bg-gray-200 dark:bg-gray-700 relative flex items-center justify-center">
                          <img 
                            src="/logo-colored.svg" 
                            alt={doctor.name} 
                            className="w-16 h-16 opacity-40"
                          />
                          
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
                            
                            <p className="text-[#4caf96] text-sm font-medium">{doctor.specialty}</p>
                            
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
                                className="flex-1 h-9 bg-[#4caf96] text-white font-bold text-sm rounded-lg hover:bg-[#3d9d86]"
                                onClick={() => {
                                  // Check if user is logged in
                                  const token = localStorage.getItem('token');
                                  if (token) {
                                    handleBookAppointment(doctor);
                                  } else {
                                    // Redirect to login
                                    navigate('/auth/login');
                                  }
                                }}
                              >
                                Book Appointment
                              </Button>
                              <Button 
                                variant="ghost" 
                                className="h-9 px-3 bg-[#4caf9620] text-[#4caf96] font-bold text-sm rounded-lg hover:bg-[#4caf9630]"
                                onClick={() => {
                                  alert('View profile for ' + doctor.name);
                                }}
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
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">No doctors found matching your criteria.</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={page === currentPage ? "default" : "outline"}
                    className={page === currentPage 
                      ? "bg-[#4caf96] hover:bg-[#3d9d86] text-white" 
                      : "border-[#4caf96] text-[#4caf96] hover:bg-[#4caf9610]"}
                    onClick={() => paginate(page)}
                  >
                    {page}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Book Appointment with {selectedDoctor.name}</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Time</label>
                <input
                  type="time"
                  className="w-full p-2 border rounded"
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                />
              </div>
              <div className="flex gap-2 mt-4">
                <Button
                  className="flex-1 bg-[#4caf96] text-white"
                  onClick={handleConfirmBooking}
                >
                  Confirm Booking
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setShowBookingModal(false);
                    setSelectedDoctor(null);
                    setBookingDate("");
                    setBookingTime("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 