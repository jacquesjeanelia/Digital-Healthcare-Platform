import React from "react";
import { Button } from "../../components/ui/button";

export const About = (): JSX.Element => {
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
                className="font-['Montserrat',Helvetica] font-medium hover:bg-gray-100"
                onClick={() => window.location.href = '/'}
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
                className="font-['Montserrat',Helvetica] font-bold hover:bg-gray-100"
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

        <main className="flex flex-col w-full items-center gap-[50px] pt-[90px] bg-white px-4 md:px-6">
          <div className="w-full max-w-[1280px]">
            <h1 className="text-[#a818fc] text-4xl font-bold mb-4">Our Motivation</h1>
            <p className="text-gray-600 mb-8">
              Sehaty was founded with a simple mission: to make healthcare accessible to everyone in Egypt and the Middle East. 
              We believe that finding the right doctor and booking appointments should be simple, transparent, and stress-free.
            </p>
          </div>

          <div className="w-full max-w-[1280px]">
            <img
              src="/about-image.jpg"
              alt="Healthcare Team"
              className="w-full h-[300px] object-cover rounded-xl mb-12"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <div className="bg-[#a918fd0d] p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-3">Our Mission</h3>
                <p className="text-gray-600">
                  To transform healthcare access in the Middle East by connecting patients with the right healthcare providers through innovative technology.
                </p>
              </div>

              <div className="bg-[#a918fd0d] p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-3">Our Vision</h3>
                <p className="text-gray-600">
                  A world where quality healthcare is just a click away for everyone, regardless of location or background.
                </p>
              </div>

              <div className="bg-[#a918fd0d] p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-3">Our Values</h3>
                <p className="text-gray-600">
                  Accessibility, transparency, quality, and compassion guide everything we do at Sehaty.
                </p>
              </div>

              <div className="bg-[#a918fd0d] p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-3">Our Promise</h3>
                <p className="text-gray-600">
                  Continuous innovation and improvement in healthcare service delivery for our community.
                </p>
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-2xl font-bold text-[#a818fc] mb-8">What Sets Us Apart</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#a918fd1a] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-[#a818fc] text-xl">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Extensive Network</h3>
                    <p className="text-gray-600">Access to thousands of verified healthcare providers across specialties</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#a918fd1a] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-[#a818fc] text-xl">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">User-Friendly Platform</h3>
                    <p className="text-gray-600">Simple booking process designed with patients in mind</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#a918fd1a] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-[#a818fc] text-xl">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Verified Reviews</h3>
                    <p className="text-gray-600">Authentic patient feedback to help you make informed decisions</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#a918fd1a] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-[#a818fc] text-xl">4</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Multilingual Support</h3>
                    <p className="text-gray-600">Services available in Arabic, English, and other regional languages</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#a818fc] mb-8">Meet Our Team</h2>
              <p className="text-gray-600 mb-8">
                Our diverse team of healthcare professionals, technologists, and customer service experts work together 
                to make Sehaty the leading healthcare platform in the region.
              </p>
            </div>
          </div>
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