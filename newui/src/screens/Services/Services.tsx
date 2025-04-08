import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

// Sample services data
const SERVICES = [
  {
    id: 1,
    title: "Teleconsultation",
    description: "Connect with healthcare professionals from the comfort of your home through secure video consultations.",
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
  return (
    <div className="bg-[#f8f5f2] dark:bg-gray-900 flex flex-row justify-center w-full min-h-screen">
      <div className="w-full max-w-[1280px] relative pt-[75px] px-4 md:px-6">
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
              <Card key={service.id} className="border border-gray-200 dark:border-gray-700 dark:bg-gray-800 overflow-hidden h-full bg-white">
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
                    >
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

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