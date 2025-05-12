import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/AuthContext";

export const Homepage = (): JSX.Element => {
  const navigate = useNavigate();
  
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

  // Data for top rated clinics
  const topRatedClinics = [
    {
      id: 1,
      name: "Cairo Medical Center",
      specialty: "General Medicine",
      rating: "4.8",
      image: "/image-1.png",
    },
    {
      id: 2,
      name: "Alexandria Dental Clinic",
      specialty: "Dentistry",
      rating: "4.7",
      image: "/image-2.png",
    },
    {
      id: 3,
      name: "Giza Pediatric Center",
      specialty: "Pediatrics",
      rating: "4.9",
      image: "/image-3.png",
    },
  ];

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
                        onClick={() => navigate("/doctors")}
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
          <section className="flex flex-col w-full md:w-[820px] items-center justify-center">
            <h2 className="font-['Inter',Helvetica] text-blue-900 dark:text-white text-[28px] text-center">
              Top Rated Clinics
            </h2>

            <div className="flex flex-col items-start py-5 w-full">
              <Card className="w-full border border-[#838383] dark:border-gray-700 rounded-[16px] overflow-hidden dark:bg-gray-800">
                {topRatedClinics.map((clinic, index) => (
                  <React.Fragment key={clinic.id}>
                    <CardContent 
                      className="flex items-center gap-1 p-2.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                      onClick={() => navigate(`/doctors?clinic=${clinic.id}`)}
                    >
                      <img
                        className="w-11 h-11 object-cover"
                        alt={clinic.name}
                        src={clinic.image}
                      />
                      <div className="font-['Inter',Helvetica] text-sm leading-6">
                        <span className="font-medium text-black dark:text-white block">
                          {clinic.name}
                        </span>
                        <span className="text-[#00000080] dark:text-gray-300">
                          {clinic.specialty}
                        </span>
                      </div>
                    </CardContent>
                    {index < topRatedClinics.length - 1 && <Separator className="dark:bg-gray-700" />}
                  </React.Fragment>
                ))}
              </Card>
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