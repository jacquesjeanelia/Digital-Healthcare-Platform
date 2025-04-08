import Head from 'next/head';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';

export default function AboutUs() {
  return (
    <Layout>
      <Head>
        <title>About Us - Sehaty</title>
        <meta name="description" content="Learn about Sehaty - Your Digital Healthcare Platform" />
      </Head>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#a918fd0d] rounded-xl p-8 mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              About <span className="text-[#a818fc]">Sehaty</span>
            </h1>
            <p className="text-gray-600 text-lg">
              Your comprehensive digital healthcare platform designed to connect patients with healthcare providers seamlessly.
            </p>
          </div>

          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
              <Card className="p-6">
                <p className="text-gray-600 mb-4">
                  At Sehaty, our mission is to revolutionize healthcare access by creating a user-friendly digital platform that connects patients with healthcare providers efficiently and securely.
                </p>
                <p className="text-gray-600">
                  We strive to make quality healthcare accessible to everyone, reduce waiting times, and improve the overall patient experience through innovative technology solutions.
                </p>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h2>
              <Card className="p-6">
                <p className="text-gray-600">
                  We envision a world where healthcare is easily accessible, patient-centered, and technologically advanced. Our goal is to become the leading digital healthcare platform, trusted by patients and healthcare providers alike for its reliability, security, and ease of use.
                </p>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Choose Sehaty?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 border-t-4 border-[#a818fc]">
                  <div className="w-12 h-12 bg-[#a918fd1a] rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#a818fc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
                  <p className="text-gray-600">
                    Your health data is protected with industry-standard security measures. We prioritize your privacy and confidentiality at every step.
                  </p>
                </Card>

                <Card className="p-6 border-t-4 border-[#a818fc]">
                  <div className="w-12 h-12 bg-[#a918fd1a] rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#a818fc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Time-Saving</h3>
                  <p className="text-gray-600">
                    Book appointments, access medical records, and consult with healthcare providers without leaving your home, saving you valuable time.
                  </p>
                </Card>

                <Card className="p-6 border-t-4 border-[#a818fc]">
                  <div className="w-12 h-12 bg-[#a918fd1a] rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#a818fc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Expert Providers</h3>
                  <p className="text-gray-600">
                    Access a network of qualified and verified healthcare professionals across various specialties and fields.
                  </p>
                </Card>

                <Card className="p-6 border-t-4 border-[#a818fc]">
                  <div className="w-12 h-12 bg-[#a918fd1a] rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#a818fc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Centralized Records</h3>
                  <p className="text-gray-600">
                    Keep all your medical records in one secure place, accessible whenever you need them, for better continuity of care.
                  </p>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Team</h2>
              <Card className="p-6">
                <p className="text-gray-600 mb-6">
                  Sehaty is backed by a team of passionate healthcare professionals, software engineers, and user experience designers who are committed to improving healthcare delivery through technology.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-[#a918fd1a] rounded-full mx-auto flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#a818fc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold">Dr. Sarah Ahmed</h3>
                    <p className="text-gray-600">Medical Director</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-24 h-24 bg-[#a918fd1a] rounded-full mx-auto flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#a818fc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold">Mohammed Al-Farsi</h3>
                    <p className="text-gray-600">Chief Technology Officer</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-24 h-24 bg-[#a918fd1a] rounded-full mx-auto flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#a818fc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold">Fatima Khalid</h3>
                    <p className="text-gray-600">Product Manager</p>
                  </div>
                </div>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
} 