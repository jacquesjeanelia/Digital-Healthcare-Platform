import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";

export const Homepage = (): JSX.Element => {
  // Data for specialty cards
  const specialties = [
    {
      title: "General Medicine",
      description: "Primary healthcare services for all ages.",
    },
    {
      title: "Pediatrics",
      description: "Specialized healthcare for children",
    },
    {
      title: "Dentistry",
      description: "Complete dental care services",
    },
    {
      title: "Dermatology",
      description: "Skin, hair and nail treatments",
    },
  ];

  // Data for top rated clinics
  const topRatedClinics = [
    {
      name: "Cairo Medical Center",
      specialty: "General Medicine",
      rating: "4.8",
      image: "/image-1.png",
    },
    {
      name: "Alexandria Dental Clinic",
      specialty: "Dentistry",
      rating: "4.7",
      image: "/image-2.png",
    },
    {
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
    },
    {
      step: "Step 2",
      title: "Book",
      description: "Select your preferred date and time slot",
    },
    {
      step: "Step 3",
      title: "Visit",
      description: "Attend your appointment and receive care",
    },
  ];

  return (
    <div className="bg-white flex flex-row justify-center w-full min-h-screen">
      <div className="bg-white w-full max-w-[1550px] relative">
        <header className="flex items-center w-full h-[58px] fixed top-0 left-0 right-0 bg-white border-b border-[#f0f0f0] z-10">
          <div className="w-full max-w-[1280px] mx-auto flex items-center justify-between px-4 md:px-6">
            <div className="relative h-[60px] flex items-center">
              <h1 className="font-['Montserrat',Helvetica] font-extrabold text-[#a818fc] text-[22px] text-center">
                Sehaty
              </h1>
            </div>

            <nav className="hidden md:flex items-center justify-center gap-[5px]">
              <Button
                variant="ghost"
                className="font-['Montserrat',Helvetica] font-bold hover:bg-gray-100"
              >
                Home
              </Button>
              <Button
                variant="ghost"
                className="font-['Montserrat',Helvetica] font-medium hover:bg-gray-100"
              >
                Browse Clinics
              </Button>
              <Button
                variant="ghost"
                className="font-['Montserrat',Helvetica] font-medium hover:bg-gray-100"
              >
                Services
              </Button>
              <Button
                variant="ghost"
                className="font-['Montserrat',Helvetica] font-medium hover:bg-gray-100"
                onClick={() => window.location.href = '/about'}
              >
                About Us
              </Button>
              <Button
                variant="ghost"
                className="font-['Montserrat',Helvetica] font-medium hover:bg-gray-100"
                onClick={() => window.location.href = '/contact'}
              >
                Contact Us
              </Button>
            </nav>

            <div className="flex items-center gap-[15px]">
              <Button
                variant="ghost"
                className="h-7 bg-[#a918fd0d] text-[#a818fc] font-bold text-sm rounded-lg hover:bg-[#a918fd1a]"
              >
                Login
              </Button>
              <Button className="h-7 bg-[#a818fc] text-white font-bold text-sm rounded-lg hover:bg-[#8a14d4]">
                Sign Up
              </Button>
            </div>
          </div>
        </header>

        <main className="flex flex-col w-full items-center gap-[50px] pt-[57px] bg-white px-4 md:px-6">
          {/* Hero Section */}
          <section className="flex flex-col items-center justify-center w-full bg-white">
            <div className="flex flex-col md:flex-row h-auto md:h-[410px] w-full max-w-[1280px] items-start gap-[46px] bg-[#a918fd0d] rounded-3xl p-6 md:p-0">
              <div className="flex flex-col w-full md:w-[298px] h-auto md:h-[278px] items-start gap-6 p-5">
                <h2 className="self-stretch font-['Inter',Helvetica] font-bold text-blue-900 text-[28px] md:text-[35px] tracking-[-0.70px] leading-[40px] md:leading-[50.4px]">
                  Your trusted
                  <br />
                  partner in
                  <br />
                  healthcare
                  <br />
                  appointments
                </h2>

                <Button
                  variant="ghost"
                  className="inline-flex items-start bg-[#a918fd0d] rounded-lg gap-2.5 px-5 py-4 hover:bg-[#a918fd1a]"
                >
                  <span className="font-['Inter',Helvetica] font-bold text-[#a818fc] text-[15px]">
                    Learn More →
                  </span>
                </Button>
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
                className="h-10 bg-[#f8f8f7] rounded-xl text-[#00000080] text-sm w-full"
                placeholder="Find clinics, doctors and services"
              />
              <Button className="w-full md:w-[99px] h-10 bg-[#a818fc] rounded-lg text-white font-bold">
                Search
              </Button>
            </div>
          </section>

          {/* Popular Specialties Section */}
          <section className="flex flex-col items-center justify-center w-full">
            <div className="flex flex-col items-center justify-center gap-[38px] w-full max-w-[1280px]">
              <h2 className="font-['Inter',Helvetica] text-blue-900 text-[28px] text-center">
                Popular Specialties
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                {specialties.map((specialty, index) => (
                  <Card
                    key={index}
                    className="flex flex-col w-full h-[230px] bg-[#f0edff] rounded-2xl border-none"
                  >
                    <CardContent className="flex flex-col items-start gap-[11px] p-5">
                      <div className="w-[45px] h-[45px] bg-[#e9e5ff] rounded-[32px] shadow-[10px_10px_24px_-4px_#0000004c]" />
                      <h3 className="self-stretch h-[26px] font-h2-clinics text-neutral-950 text-[length:var(--h2-clinics-font-size)] tracking-[var(--h2-clinics-letter-spacing)] leading-[var(--h2-clinics-line-height)]">
                        {specialty.title}
                      </h3>
                      <p className="self-stretch h-[39px] font-['Inter',Helvetica] text-gray-500 text-sm leading-[22px]">
                        {specialty.description}
                      </p>
                      <Button className="w-[110px] h-8 bg-[#a818fc] rounded-lg text-white font-bold text-sm">
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
            <h2 className="font-['Inter',Helvetica] text-blue-900 text-[28px] text-center">
              Top Rated Clinics
            </h2>

            <div className="flex flex-col items-start py-5 w-full">
              <Card className="w-full border border-[#838383] rounded-[16px] overflow-hidden">
                {topRatedClinics.map((clinic, index) => (
                  <React.Fragment key={index}>
                    <CardContent className="flex items-center gap-1 p-2.5">
                      <img
                        className="w-11 h-11 object-cover"
                        alt={clinic.name}
                        src={clinic.image}
                      />
                      <div className="font-['Inter',Helvetica] text-sm leading-6">
                        <span className="font-medium text-black block">
                          {clinic.name}
                        </span>
                        <span className="text-[#00000080]">
                          {clinic.specialty} • {clinic.rating} ★
                        </span>
                      </div>
                    </CardContent>
                    {index < topRatedClinics.length - 1 && <Separator />}
                  </React.Fragment>
                ))}
              </Card>
            </div>
          </section>

          <Button className="w-[136px] h-10 bg-[#a818fc] rounded-lg text-white">
            View All Clinics
          </Button>

          {/* How It Works Section */}
          <section className="flex flex-col items-center justify-center w-full">
            <div className="flex flex-col items-center justify-center gap-9 w-full max-w-[1280px]">
              <h2 className="font-['Inter',Helvetica] text-blue-900 text-[28px] text-center">
                How It Works
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                {howItWorksSteps.map((step, index) => (
                  <Card
                    key={index}
                    className="flex flex-col w-full h-[205px] bg-[#a918fd1a] rounded-2xl border-none"
                  >
                    <CardContent className="flex flex-col items-start gap-[3px] p-6">
                      <div className="w-9 h-9 bg-[#a918fd0d] rounded-[18px]" />
                      <span className="font-['Inter',Helvetica] font-medium text-neutral-950 text-sm leading-6">
                        {step.step}
                      </span>
                      <h3 className="font-['Inter',Helvetica] text-neutral-950 text-xl leading-7">
                        {step.title}
                      </h3>
                      <p className="font-['Inter',Helvetica] text-gray-500 text-sm leading-[22px]">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </main>

        <footer className="w-full h-[57px] bg-[#a818fc] flex items-center justify-center mt-12">
          <div className="font-['Inter',Helvetica] text-white text-sm text-center">
            © 2025 Sehaty. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};