import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import React from 'react';

export default function Home() {
  const router = useRouter();
  
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
    <>
      <Head>
        <title>Sehaty | Modern Healthcare Platform</title>
        <meta name="description" content="Sehaty - A comprehensive digital healthcare solution for patients and medical providers" />
      </Head>

      <main className="flex flex-col w-full items-center gap-[50px] bg-white px-4 md:px-6">
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
                onClick={() => router.push('/about')}
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
            <Button 
              className="w-full md:w-[99px] h-10 bg-[#a818fc] rounded-lg text-white font-bold"
              onClick={() => router.push('/doctors')}
            >
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
                    <Button 
                      className="w-[110px] h-8 bg-[#a818fc] rounded-lg text-white font-bold text-sm"
                      onClick={() => router.push('/doctors')}
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

        <Button 
          className="w-[136px] h-10 bg-[#a818fc] rounded-lg text-white"
          onClick={() => router.push('/doctors')}
        >
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
    </>
  );
} 