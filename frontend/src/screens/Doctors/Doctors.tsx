import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";
import { useNavigate, useSearchParams } from "react-router-dom";

// Define the Doctor type
export type Doctor = {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  patients: number;
  available: boolean;
};

// Sample doctor data
export const DOCTORS: Doctor[] = [
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
  {
    id: 7,
    name: "Dr. Omar El-Sayed",
    specialty: "Neurology",
    experience: "14 years",
    rating: 4.9,
    patients: 1800,
    available: true,
  },
  {
    id: 8,
    name: "Dr. Mona Hassan",
    specialty: "Gynecology",
    experience: "11 years",
    rating: 4.7,
    patients: 1400,
    available: true,
  },
  {
    id: 9,
    name: "Dr. Youssef Ahmed",
    specialty: "ENT",
    experience: "9 years",
    rating: 4.6,
    patients: 920,
    available: false,
  },
  {
    id: 10,
    name: "Dr. Hana Mahmoud",
    specialty: "Gastroenterology",
    experience: "13 years",
    rating: 4.8,
    patients: 1600,
    available: true,
  },
  {
    id: 11,
    name: "Dr. Karim Hassan",
    specialty: "Urology",
    experience: "10 years",
    rating: 4.7,
    patients: 1100,
    available: true,
  },
  {
    id: 12,
    name: "Dr. Nour El-Din",
    specialty: "Endocrinology",
    experience: "8 years",
    rating: 4.6,
    patients: 850,
    available: false,
  },
  {
    id: 13,
    name: "Dr. Amira Mohamed",
    specialty: "Rheumatology",
    experience: "12 years",
    rating: 4.8,
    patients: 1300,
    available: true,
  },
  {
    id: 14,
    name: "Dr. Tarek Ali",
    specialty: "Pulmonology",
    experience: "11 years",
    rating: 4.7,
    patients: 1200,
    available: true,
  },
  {
    id: 15,
    name: "Dr. Dina Hassan",
    specialty: "Oncology",
    experience: "15 years",
    rating: 4.9,
    patients: 2000,
    available: false,
  },
  {
    id: 16,
    name: "Dr. Mostafa Ibrahim",
    specialty: "Nephrology",
    experience: "9 years",
    rating: 4.6,
    patients: 950,
    available: true,
  },
  {
    id: 17,
    name: "Dr. Yasmin Omar",
    specialty: "Hematology",
    experience: "10 years",
    rating: 4.7,
    patients: 1100,
    available: true,
  },
  {
    id: 18,
    name: "Dr. Amir Hassan",
    specialty: "Infectious Diseases",
    experience: "12 years",
    rating: 4.8,
    patients: 1400,
    available: false,
  },
  {
    id: 19,
    name: "Dr. Salma Mohamed",
    specialty: "Allergy & Immunology",
    experience: "8 years",
    rating: 4.6,
    patients: 900,
    available: true,
  },
  {
    id: 20,
    name: "Dr. Ziad Ali",
    specialty: "Geriatrics",
    experience: "14 years",
    rating: 4.9,
    patients: 1800,
    available: true,
  },
  {
    id: 21,
    name: "Dr. Rania Hassan",
    specialty: "Sports Medicine",
    experience: "7 years",
    rating: 4.5,
    patients: 800,
    available: false,
  },
  {
    id: 22,
    name: "Dr. Samir Omar",
    specialty: "Sleep Medicine",
    experience: "9 years",
    rating: 4.7,
    patients: 1000,
    available: true,
  },
  {
    id: 23,
    name: "Dr. Layla Ibrahim",
    specialty: "Pain Management",
    experience: "11 years",
    rating: 4.8,
    patients: 1300,
    available: true,
  },
  {
    id: 24,
    name: "Dr. Hossam Hassan",
    specialty: "Physical Medicine & Rehabilitation",
    experience: "10 years",
    rating: 4.6,
    patients: 1100,
    available: false,
  },
  {
    id: 25,
    name: "Dr. Nada Mohamed",
    specialty: "Psychiatry",
    experience: "13 years",
    rating: 4.8,
    patients: 1600,
    available: true,
  },
  {
    id: 26,
    name: "Dr. Wael Ali",
    specialty: "Child Psychiatry",
    experience: "9 years",
    rating: 4.7,
    patients: 950,
    available: true,
  },
  {
    id: 27,
    name: "Dr. Ghada Hassan",
    specialty: "Dermatologic Surgery",
    experience: "12 years",
    rating: 4.8,
    patients: 1400,
    available: false,
  },
  {
    id: 28,
    name: "Dr. Ashraf Omar",
    specialty: "Plastic Surgery",
    experience: "15 years",
    rating: 4.9,
    patients: 1900,
    available: true,
  },
  {
    id: 29,
    name: "Dr. Heba Ibrahim",
    specialty: "Vascular Surgery",
    experience: "10 years",
    rating: 4.7,
    patients: 1200,
    available: true,
  },
  {
    id: 30,
    name: "Dr. Mohamed Hassan",
    specialty: "Thoracic Surgery",
    experience: "14 years",
    rating: 4.8,
    patients: 1700,
    available: false,
  },
  {
    id: 31,
    name: "Dr. Aya Mohamed",
    specialty: "Neurosurgery",
    experience: "13 years",
    rating: 4.9,
    patients: 1800,
    available: true,
  },
  {
    id: 32,
    name: "Dr. Karim Ali",
    specialty: "Pediatric Surgery",
    experience: "11 years",
    rating: 4.7,
    patients: 1300,
    available: true,
  },
  {
    id: 33,
    name: "Dr. Nour Hassan",
    specialty: "Colorectal Surgery",
    experience: "9 years",
    rating: 4.6,
    patients: 1000,
    available: false,
  },
  {
    id: 34,
    name: "Dr. Omar Ibrahim",
    specialty: "Breast Surgery",
    experience: "12 years",
    rating: 4.8,
    patients: 1500,
    available: true,
  },
  {
    id: 35,
    name: "Dr. Mona Hassan",
    specialty: "Endocrine Surgery",
    experience: "10 years",
    rating: 4.7,
    patients: 1200,
    available: true,
  },
  {
    id: 36,
    name: "Dr. Ahmed Mohamed",
    specialty: "Hand Surgery",
    experience: "8 years",
    rating: 4.6,
    patients: 900,
    available: false,
  },
  {
    id: 37,
    name: "Dr. Sara Ali",
    specialty: "Transplant Surgery",
    experience: "15 years",
    rating: 4.9,
    patients: 2000,
    available: true,
  },
  {
    id: 38,
    name: "Dr. Mahmoud Hassan",
    specialty: "Trauma Surgery",
    experience: "13 years",
    rating: 4.8,
    patients: 1700,
    available: true,
  },
  {
    id: 39,
    name: "Dr. Nadia Omar",
    specialty: "Bariatric Surgery",
    experience: "11 years",
    rating: 4.7,
    patients: 1400,
    available: false,
  },
  {
    id: 40,
    name: "Dr. Khaled Ibrahim",
    specialty: "Cardiac Surgery",
    experience: "14 years",
    rating: 4.9,
    patients: 1900,
    available: true,
  },
  {
    id: 41,
    name: "Dr. Laila Hassan",
    specialty: "Vascular Surgery",
    experience: "10 years",
    rating: 4.7,
    patients: 1300,
    available: true,
  },
  {
    id: 42,
    name: "Dr. Omar Mohamed",
    specialty: "Pediatric Cardiology",
    experience: "12 years",
    rating: 4.8,
    patients: 1500,
    available: false,
  },
  {
    id: 43,
    name: "Dr. Mona Ali",
    specialty: "Pediatric Neurology",
    experience: "9 years",
    rating: 4.6,
    patients: 1100,
    available: true,
  },
  {
    id: 44,
    name: "Dr. Youssef Hassan",
    specialty: "Pediatric Oncology",
    experience: "13 years",
    rating: 4.8,
    patients: 1600,
    available: true,
  },
  {
    id: 45,
    name: "Dr. Hana Omar",
    specialty: "Pediatric Surgery",
    experience: "11 years",
    rating: 4.7,
    patients: 1400,
    available: false,
  },
  {
    id: 46,
    name: "Dr. Karim Ibrahim",
    specialty: "Pediatric ENT",
    experience: "10 years",
    rating: 4.6,
    patients: 1200,
    available: true,
  },
  {
    id: 47,
    name: "Dr. Nour Hassan",
    specialty: "Pediatric Dermatology",
    experience: "8 years",
    rating: 4.5,
    patients: 950,
    available: true,
  },
  {
    id: 48,
    name: "Dr. Amira Mohamed",
    specialty: "Pediatric Orthopedics",
    experience: "12 years",
    rating: 4.8,
    patients: 1500,
    available: false,
  },
  {
    id: 49,
    name: "Dr. Tarek Ali",
    specialty: "Pediatric Ophthalmology",
    experience: "9 years",
    rating: 4.7,
    patients: 1100,
    available: true,
  },
  {
    id: 50,
    name: "Dr. Dina Hassan",
    specialty: "Pediatric Gastroenterology",
    experience: "11 years",
    rating: 4.8,
    patients: 1300,
    available: true,
  },
  {
    id: 51,
    name: "Dr. Amira Hassan",
    specialty: "Dentistry",
    experience: "12 years",
    rating: 4.9,
    patients: 2100,
    available: true,
  },
  {
    id: 52,
    name: "Dr. Karim Mohamed",
    specialty: "Dentistry",
    experience: "8 years",
    rating: 4.7,
    patients: 1500,
    available: true,
  },
  {
    id: 53,
    name: "Dr. Nour Ali",
    specialty: "Dentistry",
    experience: "15 years",
    rating: 4.9,
    patients: 2800,
    available: false,
  },
  {
    id: 54,
    name: "Dr. Yasmine Omar",
    specialty: "Dentistry",
    experience: "10 years",
    rating: 4.8,
    patients: 1900,
    available: true,
  },
  {
    id: 55,
    name: "Dr. Ahmed Ibrahim",
    specialty: "Dentistry",
    experience: "13 years",
    rating: 4.9,
    patients: 2400,
    available: true,
  },
  {
    id: 56,
    name: "Dr. Sara Hassan",
    specialty: "Dentistry",
    experience: "9 years",
    rating: 4.7,
    patients: 1600,
    available: false,
  },
  {
    id: 57,
    name: "Dr. Mohamed Ali",
    specialty: "Dentistry",
    experience: "11 years",
    rating: 4.8,
    patients: 2000,
    available: true,
  },
  {
    id: 58,
    name: "Dr. Laila Omar",
    specialty: "Dentistry",
    experience: "14 years",
    rating: 4.9,
    patients: 2600,
    available: true,
  },
  {
    id: 59,
    name: "Dr. Tarek Hassan",
    specialty: "Dentistry",
    experience: "7 years",
    rating: 4.6,
    patients: 1300,
    available: false,
  },
  {
    id: 60,
    name: "Dr. Dina Mohamed",
    specialty: "Dentistry",
    experience: "12 years",
    rating: 4.8,
    patients: 2200,
    available: true,
  },
];

// List of specialties for filter
const SPECIALTIES = [
  "All Specialties",
  ...Array.from(new Set(DOCTORS.map(doctor => doctor.specialty))).sort()
];

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
  const [searchParams] = useSearchParams();
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

  // Set initial specialty filter from URL query parameter
  useEffect(() => {
    const specialtyFromUrl = searchParams.get('specialty');
    if (specialtyFromUrl && SPECIALTIES.includes(specialtyFromUrl)) {
      setSelectedSpecialty(specialtyFromUrl);
    }
  }, [searchParams]);

  // Filter doctors based on search, specialty, and availability
  const filteredDoctors = DOCTORS.filter((doctor) => {
    // Filter by search term
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by specialty
    const matchesSpecialty = 
      selectedSpecialty === "All Specialties" || 
      doctor.specialty.toLowerCase() === selectedSpecialty.toLowerCase();
    
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
      <div className="w-full max-w-[1440px] relative pt-[75px] px-4 md:px-6">
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
                onChange={(e) => {
                  setSelectedSpecialty(e.target.value);
                  setCurrentPage(1); // Reset to first page when changing specialty
                }}
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
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-[#4caf96] bg-opacity-10 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#4caf96]">
                              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                              <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">{doctor.name}</h3>
                            <p className="text-sm text-[#4caf96]">{doctor.specialty}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FCAC12" stroke="#FCAC12" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                          </svg>
                          <span className="text-sm font-medium">{doctor.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                          <span>{doctor.patients}+ Patients</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                          </svg>
                          <span>{doctor.experience} Experience</span>
                        </div>
                      </div>

                      <Button
                        className="w-full bg-[#4caf96] text-white hover:bg-[#3d9d86]"
                        onClick={() => handleBookAppointment(doctor)}
                        disabled={!doctor.available}
                      >
                        {doctor.available ? "Book Appointment" : "Not Available"}
                      </Button>
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
              <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    className={`w-10 h-10 ${
                      currentPage === page
                        ? "bg-[#4caf96] text-white"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    }`}
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
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4">Book Appointment with {selectedDoctor.name}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
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
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowBookingModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-[#4caf96] text-white"
                onClick={handleConfirmBooking}
                disabled={!bookingDate || !bookingTime}
              >
                Confirm Booking
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 