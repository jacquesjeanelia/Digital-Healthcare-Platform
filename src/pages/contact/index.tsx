import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Contact() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Contact Sehaty | Modern Healthcare Platform</title>
        <meta name="description" content="Get in touch with Sehaty - we're here to help with any questions about our healthcare services" />
      </Head>
      
      <main className="flex flex-col w-full items-center gap-[50px] bg-white px-4 md:px-6">
        <div className="w-full max-w-[1280px]">
          <h1 className="text-[#a818fc] text-4xl font-bold mb-4 mt-8">Contact Us</h1>
          <p className="text-gray-600 mb-8">We're here to help with any questions about our healthcare services.</p>
        </div>

        <div className="w-full max-w-[1280px]">
          <img
            src="/contact-image.jpg"
            alt="Contact"
            className="w-full h-[300px] object-cover rounded-xl mb-12"
          />

          <div className="max-w-[600px] mx-auto">
            <h2 className="text-2xl font-bold text-center text-[#a818fc] mb-8">Send Us a Message</h2>
            
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
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a818fc] focus:border-transparent"
                />
              </div>

              <Button className="w-full bg-[#a818fc] text-white font-bold py-3 rounded-lg hover:bg-[#8a14d4]">
                Submit Message
              </Button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
} 