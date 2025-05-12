import React from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export const Contact = (): JSX.Element => {
  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-6">
      <div className="w-full">
        <h1 className="text-[#4caf96] text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          We're here to help with any questions about our healthcare services.
        </p>
      </div>

      <div className="w-full">
        <img
          src="/images/contact.jpg"
          alt="Contact Us - Keyboard and Watch"
          className="w-full h-[300px] object-cover rounded-xl mb-12"
        />

        <div className="max-w-[600px] mx-auto">
          <h2 className="text-2xl font-bold text-center text-[#4caf96] mb-8">Send Us a Message</h2>
          
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <Input
                type="text"
                placeholder="Enter your full name"
                className="w-full bg-white dark:bg-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
              <Input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-white dark:bg-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
              <Input
                type="text"
                placeholder="What is your message about?"
                className="w-full bg-white dark:bg-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
              <textarea
                placeholder="Type your message here..."
                className="w-full h-32 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4caf96] focus:border-transparent bg-white dark:bg-gray-800 dark:text-white"
              />
            </div>

            <Button className="w-full bg-[#4caf96] text-white font-bold py-3 rounded-lg hover:bg-[#3d9d86]">
              Submit Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};