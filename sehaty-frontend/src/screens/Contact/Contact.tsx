import React from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export const Contact = (): JSX.Element => {
  return (
    <div className="bg-white flex flex-row justify-center w-full min-h-screen">
      <div className="bg-white w-full max-w-[1550px] relative">
        <header className="flex items-center w-full h-[58px] fixed top-0 left-0 right-0 bg-white border-b border-[#f0f0f0] z-10">
          <div className="w-full max-w-[1280px] mx-auto flex items-center justify-between px-4 md:px-6">
            <div className="relative h-[60px] flex items-center">
              <h1 className="font-['Montserrat',Helvetica] font-extrabold text-[#4caf96] text-[22px] text-center">
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
                className="font-['Montserrat',Helvetica] font-medium hover:bg-gray-100"
              >
                About Us
              </Button>
              <Button
                variant="ghost"
                className="font-['Montserrat',Helvetica] font-bold hover:bg-gray-100"
              >
                Contact Us
              </Button>
            </nav>

            <div className="flex items-center gap-[15px]">
              <Button
                variant="ghost"
                className="h-7 bg-[#4caf9620] text-[#4caf96] font-bold text-sm rounded-lg hover:bg-[#4caf9630]"
              >
                Login
              </Button>
              <Button className="h-7 bg-[#4caf96] text-white font-bold text-sm rounded-lg hover:bg-[#3d9d86]">
                Sign Up
              </Button>
            </div>
          </div>
        </header>

        <main className="flex flex-col w-full items-center gap-[50px] pt-[90px] bg-white px-4 md:px-6">
          <div className="w-full max-w-[1280px]">
            <h1 className="text-[#4caf96] text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-gray-600 mb-8">We're here to help with any questions about our healthcare services.</p>
          </div>

          <div className="w-full max-w-[1280px]">
            <img
              src="/contact-image.jpg"
              alt="Contact"
              className="w-full h-[300px] object-cover rounded-xl mb-12"
            />

            <div className="max-w-[600px] mx-auto">
              <h2 className="text-2xl font-bold text-center text-[#4caf96] mb-8">Send Us a Message</h2>
              
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <Input
                    type="text"
                    placeholder="What is your message about?"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    placeholder="Type your message here..."
                    className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4caf96] focus:border-transparent"
                  />
                </div>

                <Button className="w-full bg-[#4caf96] text-white font-bold py-3 rounded-lg hover:bg-[#3d9d86]">
                  Submit Message
                </Button>
              </form>
            </div>
          </div>
        </main>

        <footer className="w-full h-[57px] bg-[#4caf96] flex items-center justify-center mt-12">
          <div className="font-['Inter',Helvetica] text-white text-sm text-center">
            © 2025 Sehaty. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};