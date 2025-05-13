import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { useLocation } from "react-router-dom";

// Sample services data with detailed descriptions
const SERVICES = [
  {
    id: 1,
    title: "Teleconsultation",
    description: "Connect with healthcare professionals from the comfort of your home through secure video consultations.",
    detailedDescription: "Our teleconsultation service allows you to connect with qualified healthcare providers through secure video calls. Features include:\n\n• Real-time video consultations\n• Secure messaging with healthcare providers\n• Digital prescription management\n• Medical record sharing\n• Follow-up appointment scheduling\n\nAvailable 24/7 for urgent care needs.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="14" height="14" x="5" y="5" rx="2" />
        <path d="m12 12 5-3-5-3v6Z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Appointment Booking",
    description: "Schedule appointments with healthcare providers based on your availability.",
    detailedDescription: "Our appointment booking system makes scheduling healthcare visits simple and efficient:\n\n• Real-time availability checking\n• Multiple booking options (in-person, video, phone)\n• Automated reminders via SMS and email\n• Easy rescheduling and cancellation\n• Waitlist for earlier appointments\n\nBook appointments with specialists, general practitioners, and diagnostic services.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
        <path d="m9 16 2 2 4-4" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Prescription Management",
    description: "Manage and renew prescriptions online with electronic prescriptions sent directly to your pharmacy.",
    detailedDescription: "Our prescription management system streamlines medication management:\n\n• Digital prescription storage\n• Automatic refill reminders\n• Pharmacy integration\n• Medication interaction checking\n• Prescription sharing with healthcare providers\n\nKeep track of all your medications in one secure place.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Medical Records",
    description: "Access and manage your health records securely in one place.",
    detailedDescription: "Our medical records system provides comprehensive health information management:\n\n• Secure storage of medical history\n• Lab results and imaging reports\n• Vaccination records\n• Allergies and medications\n• Family medical history\n\nAccess your complete medical history anytime, anywhere.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M16 13H8" />
        <path d="M16 17H8" />
        <path d="M10 9H8" />
      </svg>
    ),
  },
  {
    id: 5,
    title: "Health Monitoring",
    description: "Track your vital signs and health metrics over time with automated reminders.",
    detailedDescription: "Our health monitoring system helps you stay on top of your health:\n\n• Vital signs tracking (blood pressure, heart rate, etc.)\n• Blood sugar monitoring\n• Weight management\n• Sleep tracking\n• Activity monitoring\n\nSet health goals and track your progress over time.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    id: 6,
    title: "Medication Reminders",
    description: "Get timely reminders for your medications to ensure you never miss a dose.",
    detailedDescription: "Our medication reminder system helps you stay on track with your treatment:\n\n• Customizable reminder schedules\n• Multiple medication tracking\n• Refill reminders\n• Missed dose alerts\n• Medication history tracking\n\nNever miss a dose with our smart reminder system.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 3a2 2 0 0 0-2 2" />
        <path d="M19 3a2 2 0 0 1 2 2" />
        <path d="M21 19a2 2 0 0 1-2 2" />
        <path d="M5 21a2 2 0 0 1-2-2" />
        <path d="M9 3h6" />
        <path d="M9 21h6" />
        <path d="M3 9v6" />
        <path d="M21 9v6" />
        <path d="M12 12h.01" />
        <path d="M12 16v-4" />
      </svg>
    ),
  },
];

export const Services = (): JSX.Element => {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Handle service selection from URL
    const searchParams = new URLSearchParams(location.search);
    const serviceParam = searchParams.get('service');
    
    if (serviceParam) {
      const serviceId = SERVICES.findIndex(s => 
        s.title.toLowerCase().replace(/\s+/g, '-') === serviceParam
      ) + 1;
      if (serviceId > 0) {
        setSelectedService(serviceId);
      }
    }
  }, [location]);

  return (
    <div className="bg-[#f8f5f2] dark:bg-gray-900 flex flex-row justify-center w-full min-h-screen">
      <div className="w-full max-w-[1440px] relative pt-[75px] px-4 md:px-6">
        <div className="flex flex-col gap-8">
          {/* Hero Section */}
          <div className="flex flex-col items-center text-center gap-4 py-12">
            <h1 className="font-['Montserrat',Helvetica] font-bold text-[#1f4156] dark:text-white text-3xl md:text-4xl">
              Our Healthcare Services
            </h1>
            <p className="font-['Inter',Helvetica] text-gray-600 dark:text-gray-400 text-lg max-w-3xl">
              Sehaty provides a comprehensive range of digital healthcare services designed to make healthcare more accessible, convenient, and efficient.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
            {SERVICES.map((service) => (
              <Card 
                key={service.id} 
                id={service.title.toLowerCase().replace(/\s+/g, '-')}
                className="border border-gray-200 dark:border-gray-700 dark:bg-gray-800 overflow-hidden h-full bg-white"
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="w-12 h-12 bg-[#4caf9630] dark:bg-[#4caf9640] rounded-lg flex items-center justify-center mb-4 text-[#4caf96]">
                    {service.icon}
                  </div>
                  <h3 className="font-['Montserrat',Helvetica] font-bold text-[#1f4156] dark:text-white text-xl mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 flex-grow mb-4">
                    {service.description}
                  </p>
                  <div className="mt-auto">
                    <Button
                      variant="ghost"
                      className="w-full justify-center bg-[#4caf9620] text-[#4caf96] font-bold text-sm rounded-lg hover:bg-[#4caf9630] h-10"
                      onClick={() => setSelectedService(service.id)}
                    >
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Service Modal */}
          {selectedService !== null && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-2xl mx-4">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-[#1f4156] dark:text-white">
                    {SERVICES.find(s => s.id === selectedService)?.title}
                  </h2>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="whitespace-pre-line text-gray-600 dark:text-gray-300">
                    {SERVICES.find(s => s.id === selectedService)?.detailedDescription}
                  </p>
                </div>
                <div className="mt-6 flex justify-end">
                  <Button
                    className="bg-[#4caf96] text-white hover:bg-[#3d9d86]"
                    onClick={() => setSelectedService(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="bg-[#4caf9620] dark:bg-[#4caf9640] rounded-xl p-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col gap-3 max-w-xl">
              <h2 className="font-['Montserrat',Helvetica] font-bold text-[#1f4156] dark:text-white text-2xl">
                Ready to experience better healthcare?
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Create an account today and start managing your healthcare needs with Sehaty's digital platform.
              </p>
            </div>
            <Button 
              className="h-10 px-6 bg-[#4caf96] text-white font-bold text-sm rounded-lg hover:bg-[#3d9d86] whitespace-nowrap"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}; 