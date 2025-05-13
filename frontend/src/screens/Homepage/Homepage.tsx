import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/AuthContext";
import { DOCTORS, Doctor } from "../Doctors/Doctors";

export const Homepage = (): JSX.Element => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  
  // Data for specialty cards
  const specialties = [
    {
      title: "General Medicine",
      description: "Primary healthcare services for all ages.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4caf96" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"></path>
          <path d="M12 6v12"></path>
          <path d="M6 12h12"></path>
        </svg>
      ),
    },
    {
      title: "Pediatrics",
      description: "Specialized healthcare for children",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4caf96" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 9h1h1"></path>
          <path d="M14 9h1h1"></path>
          <path d="M10 13c.5 1 1.5 1 2 0"></path>
          <path d="M8 20v1h8v-1"></path>
          <path d="M12 17v3"></path>
          <path d="M19 12c0-4.4-3.6-8-8-8s-8 3.6-8 8c0 1.6.5 3 1.3 4.2.8 1.2 2 2.2 3.5 2.8"></path>
          <path d="M17.2 16.2c.5.2 1 .3 1.6.3 2.2 0 4-1.8 4-4s-1.8-4-4-4"></path>
        </svg>
      ),
    },
    {
      title: "Dentistry",
      description: "Complete dental care services",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4caf96" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5.5c-1.7-.7-3.4-.7-5-.7-2.3 0-4.3.3-5.6 1-1 .4-1.4 1.4-1.4 2.8 0 1.6.5 3 1.4 4.2 2 2.7 8.2 7.5 10.6 9.5 2.4-2 8.6-6.8 10.6-9.5.9-1.2 1.4-2.6 1.4-4.2 0-1.4-.4-2.4-1.4-2.8-1.3-.7-3.3-1-5.6-1-1.6 0-3.3 0-5 .7"></path>
          <path d="m7 10 3 1.5L12 10l2 1.5L17 10"></path>
        </svg>
      ),
    },
    {
      title: "Dermatology",
      description: "Skin, hair and nail treatments",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4caf96" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 12a6 6 0 0 0 12 0"></path>
          <path d="M6 12a6 6 0 0 1 12 0"></path>
          <path d="M2 9h2"></path>
          <path d="M20 9h2"></path>
          <path d="M12 2v2"></path>
          <path d="M12 13v2"></path>
          <path d="m4.93 4.93 1.41 1.41"></path>
          <path d="m17.66 17.66 1.41 1.41"></path>
          <path d="m17.66 4.93-1.41 1.41"></path>
          <path d="m4.93 17.66 1.41-1.41"></path>
        </svg>
      ),
    },
  ];

  // Update the SPECIALTIES array to include all specialties from DOCTORS
  const SPECIALTIES = [
    "All Specialties",
    ...Array.from(new Set(DOCTORS.map(doctor => doctor.specialty))).sort()
  ];

  // Data for top rated clinics
  const clinics = [
    {
      id: 1,
      name: "Cairo Medical Center",
      specialty: "General Medicine",
      rating: 4.8,
      image: "/image-1.png",
      location: "Cairo",
      patients: 2500,
    },
    {
      id: 2,
      name: "Alexandria Dental Clinic",
      specialty: "Dentistry",
      rating: 4.7,
      image: "/image-2.png",
      location: "Alexandria",
      patients: 1800,
    },
    {
      id: 3,
      name: "Giza Pediatric Center",
      specialty: "Pediatrics",
      rating: 4.9,
      image: "/image-3.png",
      location: "Giza",
      patients: 3200,
    },
    {
      id: 4,
      name: "Cairo Heart Institute",
      specialty: "Cardiology",
      rating: 4.9,
      image: "/image-4.png",
      location: "Cairo",
      patients: 2800,
    },
    {
      id: 5,
      name: "DermaCare Clinic",
      specialty: "Dermatology",
      rating: 4.8,
      image: "/image-5.png",
      location: "Cairo",
      patients: 1500,
    },
    {
      id: 6,
      name: "OrthoPlus Center",
      specialty: "Orthopedics",
      rating: 4.7,
      image: "/image-6.png",
      location: "Alexandria",
      patients: 1200,
    },
    {
      id: 7,
      name: "EyeCare Vision Center",
      specialty: "Ophthalmology",
      rating: 4.8,
      image: "/image-7.png",
      location: "Giza",
      patients: 2000,
    },
    {
      id: 8,
      name: "NeuroCare Institute",
      specialty: "Neurology",
      rating: 4.9,
      image: "/image-8.png",
      location: "Cairo",
      patients: 1800,
    },
    {
      id: 9,
      name: "Women's Health Center",
      specialty: "Gynecology",
      rating: 4.8,
      image: "/image-9.png",
      location: "Alexandria",
      patients: 2200,
    },
    {
      id: 10,
      name: "ENT Specialists",
      specialty: "ENT",
      rating: 4.7,
      image: "/image-10.png",
      location: "Cairo",
      patients: 1600,
    },
    {
      id: 11,
      name: "GastroCare Clinic",
      specialty: "Gastroenterology",
      rating: 4.8,
      image: "/image-11.png",
      location: "Giza",
      patients: 1400,
    },
    {
      id: 12,
      name: "Urology Center",
      specialty: "Urology",
      rating: 4.7,
      image: "/image-12.png",
      location: "Cairo",
      patients: 1300,
    },
    {
      id: 13,
      name: "EndoCare Clinic",
      specialty: "Endocrinology",
      rating: 4.8,
      image: "/image-13.png",
      location: "Alexandria",
      patients: 1100,
    },
    {
      id: 14,
      name: "RheumaCare Center",
      specialty: "Rheumatology",
      rating: 4.6,
      image: "/image-14.png",
      location: "Cairo",
      patients: 900,
    },
    {
      id: 15,
      name: "PulmoCare Institute",
      specialty: "Pulmonology",
      rating: 4.8,
      image: "/image-15.png",
      location: "Giza",
      patients: 1700,
    },
    {
      id: 16,
      name: "OncoCare Center",
      specialty: "Oncology",
      rating: 4.9,
      image: "/image-16.png",
      location: "Cairo",
      patients: 2100,
    },
    {
      id: 17,
      name: "NephroCare Clinic",
      specialty: "Nephrology",
      rating: 4.7,
      image: "/image-17.png",
      location: "Alexandria",
      patients: 1200,
    },
    {
      id: 18,
      name: "HemaCare Institute",
      specialty: "Hematology",
      rating: 4.8,
      image: "/image-18.png",
      location: "Cairo",
      patients: 1000,
    },
    {
      id: 19,
      name: "Infectious Disease Center",
      specialty: "Infectious Diseases",
      rating: 4.7,
      image: "/image-19.png",
      location: "Giza",
      patients: 1500,
    },
    {
      id: 20,
      name: "AllergyCare Clinic",
      specialty: "Allergy & Immunology",
      rating: 4.8,
      image: "/image-20.png",
      location: "Cairo",
      patients: 1300,
    },
    {
      id: 21,
      name: "Geriatric Care Center",
      specialty: "Geriatrics",
      rating: 4.7,
      image: "/image-21.png",
      location: "Alexandria",
      patients: 900,
    },
    {
      id: 22,
      name: "Sports Medicine Center",
      specialty: "Sports Medicine",
      rating: 4.8,
      image: "/image-22.png",
      location: "Cairo",
      patients: 1100,
    },
    {
      id: 23,
      name: "SleepCare Clinic",
      specialty: "Sleep Medicine",
      rating: 4.6,
      image: "/image-23.png",
      location: "Giza",
      patients: 800,
    },
    {
      id: 24,
      name: "Pain Management Center",
      specialty: "Pain Management",
      rating: 4.7,
      image: "/image-24.png",
      location: "Cairo",
      patients: 1200,
    },
    {
      id: 25,
      name: "RehabCare Institute",
      specialty: "Physical Medicine & Rehabilitation",
      rating: 4.8,
      image: "/image-25.png",
      location: "Alexandria",
      patients: 1400,
    },
    {
      id: 26,
      name: "PsychCare Center",
      specialty: "Psychiatry",
      rating: 4.7,
      image: "/image-26.png",
      location: "Cairo",
      patients: 1600,
    },
    {
      id: 27,
      name: "Child PsychCare Clinic",
      specialty: "Child Psychiatry",
      rating: 4.8,
      image: "/image-27.png",
      location: "Giza",
      patients: 1000,
    },
    {
      id: 28,
      name: "DermaSurgery Center",
      specialty: "Dermatologic Surgery",
      rating: 4.7,
      image: "/image-28.png",
      location: "Cairo",
      patients: 900,
    },
    {
      id: 29,
      name: "Plastic Surgery Institute",
      specialty: "Plastic Surgery",
      rating: 4.8,
      image: "/image-29.png",
      location: "Alexandria",
      patients: 1100,
    },
    {
      id: 30,
      name: "Vascular Care Center",
      specialty: "Vascular Surgery",
      rating: 4.7,
      image: "/image-30.png",
      location: "Cairo",
      patients: 800,
    },
    {
      id: 31,
      name: "Thoracic Surgery Center",
      specialty: "Thoracic Surgery",
      rating: 4.8,
      image: "/image-31.png",
      location: "Giza",
      patients: 700,
    },
    {
      id: 32,
      name: "NeuroSurgery Institute",
      specialty: "Neurosurgery",
      rating: 4.9,
      image: "/image-32.png",
      location: "Cairo",
      patients: 1300,
    },
    {
      id: 33,
      name: "Pediatric Surgery Center",
      specialty: "Pediatric Surgery",
      rating: 4.8,
      image: "/image-33.png",
      location: "Alexandria",
      patients: 1000,
    },
    {
      id: 34,
      name: "Colorectal Surgery Clinic",
      specialty: "Colorectal Surgery",
      rating: 4.7,
      image: "/image-34.png",
      location: "Cairo",
      patients: 900,
    },
    {
      id: 35,
      name: "Breast Surgery Center",
      specialty: "Breast Surgery",
      rating: 4.8,
      image: "/image-35.png",
      location: "Giza",
      patients: 1200,
    },
    {
      id: 36,
      name: "Endocrine Surgery Institute",
      specialty: "Endocrine Surgery",
      rating: 4.7,
      image: "/image-36.png",
      location: "Cairo",
      patients: 800,
    },
    {
      id: 37,
      name: "Hand Surgery Center",
      specialty: "Hand Surgery",
      rating: 4.8,
      image: "/image-37.png",
      location: "Alexandria",
      patients: 700,
    },
    {
      id: 38,
      name: "Transplant Surgery Clinic",
      specialty: "Transplant Surgery",
      rating: 4.9,
      image: "/image-38.png",
      location: "Cairo",
      patients: 600,
    },
    {
      id: 39,
      name: "Trauma Surgery Center",
      specialty: "Trauma Surgery",
      rating: 4.8,
      image: "/image-39.png",
      location: "Giza",
      patients: 1500,
    },
    {
      id: 40,
      name: "Bariatric Surgery Institute",
      specialty: "Bariatric Surgery",
      rating: 4.7,
      image: "/image-40.png",
      location: "Cairo",
      patients: 1100,
    },
    {
      id: 41,
      name: "Cardiac Surgery Center",
      specialty: "Cardiac Surgery",
      rating: 4.9,
      image: "/image-41.png",
      location: "Alexandria",
      patients: 1400,
    },
    {
      id: 42,
      name: "Vascular Surgery Clinic",
      specialty: "Vascular Surgery",
      rating: 4.8,
      image: "/image-42.png",
      location: "Cairo",
      patients: 900,
    },
    {
      id: 43,
      name: "Pediatric Cardiology Center",
      specialty: "Pediatric Cardiology",
      rating: 4.7,
      image: "/image-43.png",
      location: "Giza",
      patients: 800,
    },
    {
      id: 44,
      name: "Pediatric Neurology Institute",
      specialty: "Pediatric Neurology",
      rating: 4.8,
      image: "/image-44.png",
      location: "Cairo",
      patients: 700,
    },
    {
      id: 45,
      name: "Pediatric Oncology Center",
      specialty: "Pediatric Oncology",
      rating: 4.9,
      image: "/image-45.png",
      location: "Alexandria",
      patients: 600,
    },
    {
      id: 46,
      name: "Pediatric Surgery Clinic",
      specialty: "Pediatric Surgery",
      rating: 4.8,
      image: "/image-46.png",
      location: "Cairo",
      patients: 900,
    },
    {
      id: 47,
      name: "Pediatric ENT Center",
      specialty: "Pediatric ENT",
      rating: 4.7,
      image: "/image-47.png",
      location: "Giza",
      patients: 800,
    },
    {
      id: 48,
      name: "Pediatric Dermatology Institute",
      specialty: "Pediatric Dermatology",
      rating: 4.8,
      image: "/image-48.png",
      location: "Cairo",
      patients: 700,
    },
    {
      id: 49,
      name: "Pediatric Orthopedics Center",
      specialty: "Pediatric Orthopedics",
      rating: 4.7,
      image: "/image-49.png",
      location: "Alexandria",
      patients: 900,
    },
    {
      id: 50,
      name: "Pediatric Ophthalmology Clinic",
      specialty: "Pediatric Ophthalmology",
      rating: 4.8,
      image: "/image-50.png",
      location: "Cairo",
      patients: 800,
    },
  ];

  // Get top rated clinics (top 3 by rating)
  const topRatedClinics = [...clinics]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  // Data for how it works steps
  const howItWorksSteps = [
    {
      step: "Step 1",
      title: "Search",
      description: "Find clinics and doctors by specialty or location",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4caf96" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
      ),
    },
    {
      step: "Step 2",
      title: "Book",
      description: "Select your preferred date and time slot",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4caf96" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
          <path d="M8 14h.01"></path>
          <path d="M12 14h.01"></path>
          <path d="M16 14h.01"></path>
          <path d="M8 18h.01"></path>
          <path d="M12 18h.01"></path>
          <path d="M16 18h.01"></path>
        </svg>
      ),
    },
    {
      step: "Step 3",
      title: "Visit",
      description: "Attend your appointment and receive care",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4caf96" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 flex flex-row justify-center w-full min-h-screen">
      <div className="bg-white dark:bg-gray-900 w-full max-w-[1550px] relative">
        <main className="flex flex-col w-full items-center gap-[50px] bg-white dark:bg-gray-900 px-4 md:px-6">
          {/* Hero Section */}
          <section className="flex flex-col items-center justify-center w-full bg-white dark:bg-gray-900">
            <div className="flex flex-col md:flex-row h-auto md:h-[410px] w-full max-w-[1280px] items-start gap-[46px] bg-[#4caf9620] dark:bg-[#4caf9640] rounded-3xl p-6 md:p-0">
              <div className="flex flex-col w-full md:w-[298px] h-auto md:h-[278px] items-start gap-6 p-5">
                <h2 className="self-stretch font-['Inter',Helvetica] font-bold text-blue-900 dark:text-white text-[28px] md:text-[35px] tracking-[-0.70px] leading-[40px] md:leading-[50.4px]">
                  Your trusted
                  <br />
                  partner in
                  <br />
                  healthcare
                  <br />
                  appointments
                </h2>

                <div className="w-full flex justify-center">
                  <Button
                    variant="ghost"
                    className="inline-flex items-center bg-[#4caf9620] dark:bg-[#4caf9640] rounded-lg gap-2.5 px-5 py-4 hover:bg-[#4caf9630] transition-all duration-300 transform hover:scale-105"
                    onClick={() => navigate("/doctors")}
                  >
                    <span className="font-['Inter',Helvetica] font-bold text-[#4caf96] text-[15px]">
                      Learn More →
                    </span>
                  </Button>
                </div>
              </div>

              <img
                className="w-full md:w-[940px] h-auto md:h-[410px] object-cover rounded-2xl md:rounded-none"
                alt="Healthcare professionals"
                src="/image.png"
              />
            </div>
          </section>

          {/* Search Section */}
          <section className="flex items-center justify-center w-full">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-[26px] w-full max-w-[725px]">
              <Input
                className="h-10 bg-[#f8f8f7] dark:bg-gray-800 dark:text-white rounded-xl text-[#00000080] text-sm w-full"
                placeholder="Find clinics, doctors and services"
              />
              <Button className="w-full md:w-[99px] h-10 bg-[#4caf96] rounded-lg text-white font-bold">
                Search
              </Button>
            </div>
          </section>

          {/* Popular Specialties Section */}
          <section className="flex flex-col items-center justify-center w-full">
            <div className="flex flex-col items-center justify-center gap-[38px] w-full max-w-[1280px]">
              <h2 className="font-['Inter',Helvetica] text-blue-900 dark:text-white text-[28px] text-center">
                Popular Specialties
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                {specialties.map((specialty, index) => (
                  <Card
                    key={index}
                    className="w-full border border-[#838383] dark:border-gray-700 rounded-[16px] overflow-hidden dark:bg-gray-800"
                  >
                    <CardContent className="flex flex-col items-start gap-[11px] p-5">
                      <div className="w-[45px] h-[45px] bg-[#4caf9620] dark:bg-[#4caf9650] rounded-[32px] shadow-[10px_10px_24px_-4px_#0000004c] flex items-center justify-center">
                        {specialty.icon}
                      </div>
                      <h3 className="self-stretch h-[26px] font-['Inter',Helvetica] font-bold text-neutral-950 dark:text-white text-lg tracking-[-0.36px]">
                        {specialty.title}
                      </h3>
                      <p className="self-stretch h-[39px] font-['Inter',Helvetica] text-gray-500 dark:text-gray-300 text-sm leading-[22px]">
                        {specialty.description}
                      </p>
                      <Button 
                        className="w-[110px] h-8 bg-[#4caf96] rounded-lg text-white font-bold text-sm"
                        onClick={() => navigate(`/doctors?specialty=${specialty.title}`)}
                      >
                        Find Doctors
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Top Rated Clinics Section */}
          <section className="py-16 bg-gray-50 dark:bg-gray-800 w-full">
            <div className="container mx-auto px-4">
              <div className="flex flex-col items-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Top Rated Clinics</h2>
                <p className="text-gray-600 dark:text-gray-400 text-center max-w-2xl">
                  Discover our highest-rated medical facilities, known for exceptional care and patient satisfaction
                </p>
              </div>

              {/* Specialty Filter */}
              <div className="flex justify-center mb-8">
                <div className="flex flex-wrap gap-2 justify-center">
                  {SPECIALTIES.map((specialty) => (
                    <button
                      key={specialty}
                      onClick={() => setSelectedSpecialty(specialty)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedSpecialty === specialty
                          ? "bg-[#4caf96] text-white"
                          : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                      }`}
                    >
                      {specialty}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {DOCTORS
                  .filter(doctor => 
                    selectedSpecialty === "All Specialties" || 
                    doctor.specialty === selectedSpecialty
                  )
                  .sort((a, b) => b.rating - a.rating)
                  .slice(0, 3)
                  .map((doctor) => (
                    <div
                      key={doctor.id}
                      className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105 cursor-pointer"
                      onClick={() => navigate(`/doctors?specialty=${doctor.specialty}`)}
                    >
                      <div className="p-6">
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#FCAC12" stroke="#FCAC12" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                            <span className="font-medium text-gray-900 dark:text-white">{doctor.rating}</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                              <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            <span>Main Hospital, Floor 3</span>
                          </div>
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

                        <div className="mt-6">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/doctors?specialty=${doctor.specialty}`);
                            }}
                            className="w-full py-2 bg-[#4caf96] text-white rounded-lg font-medium hover:bg-[#3d9d86] transition-colors"
                          >
                            View Doctors
                          </button>
                        </div>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </section>

          <Button 
            className="w-[136px] h-10 bg-[#4caf96] rounded-lg text-white transform transition-transform duration-300 hover:scale-105"
            onClick={() => navigate("/doctors")}
          >
            View All Clinics
          </Button>
        </main>
      </div>
    </div>
  );
};