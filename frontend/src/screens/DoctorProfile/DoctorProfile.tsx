import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { DOCTORS, Doctor } from "../Doctors/Doctors";
import { LiveQueue } from '../../components/LiveQueue';

// Define the Review type
type Review = {
  id: number;
  patientName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
};

// Define the QueueStatus type
type QueueStatus = {
  currentNumber: number;
  estimatedWaitTime: number;
  totalInQueue: number;
  lastUpdated: string;
};

// Sample reviews data
const SAMPLE_REVIEWS: Review[] = [
  {
    id: 1,
    patientName: "Ahmed M.",
    rating: 5,
    date: "2024-03-15",
    comment: "Excellent doctor! Very professional and caring. Explained everything clearly.",
    verified: true,
  },
  {
    id: 2,
    patientName: "Sarah K.",
    rating: 4,
    date: "2024-03-10",
    comment: "Great experience. The doctor was very thorough and attentive.",
    verified: true,
  },
  {
    id: 3,
    patientName: "Mohammed A.",
    rating: 5,
    date: "2024-03-05",
    comment: "Highly recommended. Very knowledgeable and patient.",
    verified: true,
  },
];

// Sample queue status
const SAMPLE_QUEUE_STATUS: QueueStatus = {
  currentNumber: 15,
  estimatedWaitTime: 45,
  totalInQueue: 8,
  lastUpdated: new Date().toISOString(),
};

export const DoctorProfile = (): JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [queueStatus, setQueueStatus] = useState<QueueStatus>(SAMPLE_QUEUE_STATUS);
  const [selectedTab, setSelectedTab] = useState("about");

  useEffect(() => {
    // Find the doctor by ID
    const foundDoctor = DOCTORS.find((d) => d.id === Number(id));
    if (foundDoctor) {
      setDoctor(foundDoctor);
    } else {
      // Handle doctor not found
      navigate("/doctors");
    }
  }, [id, navigate]);

  // Update queue status every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setQueueStatus(prev => ({
        ...prev,
        lastUpdated: new Date().toISOString(),
      }));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (!doctor) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4caf96]"></div>
      </div>
    );
  }

  const handleBookAppointment = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setShowBookingModal(true);
    } else {
      navigate('/auth/login');
    }
  };

  const handleConfirmBooking = () => {
    alert(`Appointment booked with ${doctor.name} on ${bookingDate} at ${bookingTime}`);
    setShowBookingModal(false);
    setBookingDate("");
    setBookingTime("");
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[300px] bg-gradient-to-r from-[#4caf96] to-[#3d9d86]">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="flex items-center gap-6">
            <div className="w-32 h-32 rounded-full bg-white p-2">
              <img
                src="/logo-colored.svg"
                alt={doctor.name}
                className="w-full h-full object-cover rounded-full opacity-80"
              />
            </div>
            <div className="text-white">
              <h1 className="text-3xl font-bold mb-2">{doctor.name}</h1>
              <p className="text-xl mb-2">{doctor.specialty}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#FCAC12" stroke="#FCAC12" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <span className="font-medium">{doctor.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  <span>{doctor.patients}+ Patients</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                  </svg>
                  <span>{doctor.experience} Experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Quick Info */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="flex flex-col gap-6">
                  {/* Queue Status */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Live Queue Status</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Current Number</span>
                        <span className="font-semibold text-[#4caf96]">{queueStatus.currentNumber}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Estimated Wait Time</span>
                        <span className="font-semibold text-[#4caf96]">{queueStatus.estimatedWaitTime} mins</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Total in Queue</span>
                        <span className="font-semibold text-[#4caf96]">{queueStatus.totalInQueue}</span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
                        Last updated: {new Date(queueStatus.lastUpdated).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Info</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#4caf96]">
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span>Main Hospital, Floor 3</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#4caf96]">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                        </svg>
                        <span>Available {doctor.available ? "Now" : "Soon"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#4caf96]">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                        </svg>
                        <span>Insurance Accepted</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Working Hours</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span>9:00 AM - 5:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <span>9:00 AM - 1:00 PM</span>
                      </div>
                      <div className="flex justify-between text-gray-500">
                        <span>Sunday</span>
                        <span>Closed</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-[#4caf96] hover:bg-[#3d9d86] text-white font-bold"
                    onClick={handleBookAppointment}
                  >
                    Book Appointment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Detailed Info */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="about" className="w-full" onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">About Dr. {doctor.name.split(" ")[1]}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Dr. {doctor.name} is a highly experienced {doctor.specialty} specialist with {doctor.experience} of practice. 
                      They have treated over {doctor.patients} patients and maintain a {doctor.rating} star rating based on patient reviews.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Their approach combines evidence-based medicine with personalized care, ensuring each patient receives 
                      the highest quality treatment tailored to their specific needs.
                    </p>
                    <h4 className="font-semibold mb-2">Education</h4>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
                      <li>Medical Degree from Cairo University</li>
                      <li>Specialization in {doctor.specialty}</li>
                      <li>Advanced Training in Modern Treatment Methods</li>
                    </ul>
                    <h4 className="font-semibold mb-2">Languages</h4>
                    <div className="flex gap-2 mb-4">
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">Arabic</span>
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">English</span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experience" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Professional Experience</h3>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold">Senior {doctor.specialty} Specialist</h4>
                        <p className="text-gray-500 dark:text-gray-400">Main Hospital • 2018 - Present</p>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          Leading the {doctor.specialty} department and providing specialized care to patients.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold">{doctor.specialty} Consultant</h4>
                        <p className="text-gray-500 dark:text-gray-400">City Medical Center • 2015 - 2018</p>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          Provided expert consultation and treatment for complex cases.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold">Resident Physician</h4>
                        <p className="text-gray-500 dark:text-gray-400">University Hospital • 2012 - 2015</p>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          Completed residency training in {doctor.specialty} with focus on patient care.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-semibold">Patient Reviews</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold">{doctor.rating}</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill={star <= Math.floor(doctor.rating) ? "#FCAC12" : "none"}
                              stroke="#FCAC12"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6">
                      {SAMPLE_REVIEWS.map((review) => (
                        <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-semibold">{review.patientName}</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{review.date}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <svg
                                  key={i}
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill={i < review.rating ? "#FCAC12" : "none"}
                                  stroke="#FCAC12"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                </svg>
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                          {review.verified && (
                            <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                              </svg>
                              <span>Verified Patient</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="location" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Location & Contact</h3>
                    <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg mb-4">
                      {/* Replace with actual map component */}
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        Map View
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Address</h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          Main Hospital, Floor 3<br />
                          123 Medical Center Street<br />
                          Cairo, Egypt
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Contact Information</h4>
                        <div className="space-y-2">
                          <p className="text-gray-600 dark:text-gray-300">
                            Phone: +20 123 456 7890
                          </p>
                          <p className="text-gray-600 dark:text-gray-300">
                            Email: doctor@hospital.com
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Book Appointment with {doctor.name}</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Time</label>
                <input
                  type="time"
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
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

      <div className="mt-8">
        <LiveQueue
          currentNumber={5}
          totalInQueue={8}
          estimatedWaitTime={15}
          userPosition={3}
        />
      </div>
    </div>
  );
}; 