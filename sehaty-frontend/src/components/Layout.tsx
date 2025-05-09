import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useTheme } from "../lib/utils";
import { useAuth } from "../lib/AuthContext";
import { PreviewBanner } from "./PreviewBanner";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  // Handle click outside to close user menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Check if path is active for navigation
  const isActive = (path: string) => location.pathname === path;

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/");
    setIsUserMenuOpen(false);
  };

  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? "dark" : ""}`}>
      <header className="flex items-center w-full h-[58px] fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 border-b border-[#f0f0f0] dark:border-gray-800 z-10">
        <div className="w-full max-w-[1280px] mx-auto flex items-center justify-between px-4 md:px-6">
          <div className="relative h-[60px] flex items-center">
            <h1 
              className="font-['Montserrat',Helvetica] font-extrabold text-[#4caf96] text-[22px] text-center cursor-pointer"
              onClick={() => navigate('/')}
            >
              Sehaty
            </h1>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex flex-col justify-between w-6 h-5 bg-transparent border-none focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span className={`block w-full h-0.5 bg-gray-800 dark:bg-white transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`block w-full h-0.5 bg-gray-800 dark:bg-white transition-all duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"}`}></span>
            <span className={`block w-full h-0.5 bg-gray-800 dark:bg-white transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </button>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex items-center justify-center gap-[5px]`}>
            <Button
              variant="ghost"
              className={`font-['Montserrat',Helvetica] ${isActive('/') ? 'font-bold' : 'font-medium'} hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive('/') ? 'text-[#4caf96]' : 'text-gray-800 dark:text-white'}`}
              onClick={() => navigate('/')}
            >
              Home
            </Button>
            <Button
              variant="ghost"
              className={`font-['Montserrat',Helvetica] ${isActive('/doctors') ? 'font-bold' : 'font-medium'} hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive('/doctors') ? 'text-[#4caf96]' : 'text-gray-800 dark:text-white'}`}
              onClick={() => navigate('/doctors')}
            >
              Browse Doctors
            </Button>
            <Button
              variant="ghost"
              className={`font-['Montserrat',Helvetica] ${isActive('/services') ? 'font-bold' : 'font-medium'} hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive('/services') ? 'text-[#4caf96]' : 'text-gray-800 dark:text-white'}`}
              onClick={() => navigate('/services')}
            >
              Services
            </Button>
            <Button
              variant="ghost"
              className={`font-['Montserrat',Helvetica] ${isActive('/about') ? 'font-bold' : 'font-medium'} hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive('/about') ? 'text-[#4caf96]' : 'text-gray-800 dark:text-white'}`}
              onClick={() => navigate('/about')}
            >
              About Us
            </Button>
            <Button
              variant="ghost"
              className={`font-['Montserrat',Helvetica] ${isActive('/contact') ? 'font-bold' : 'font-medium'} hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive('/contact') ? 'text-[#4caf96]' : 'text-gray-800 dark:text-white'}`}
              onClick={() => navigate('/contact')}
            >
              Contact Us
            </Button>
          </nav>

          <div className="flex items-center gap-[15px]">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>

            {isAuthenticated ? (
              <>
                {/* Notification Icon */}
                <div className="relative">
                  <button
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors relative"
                    aria-label="Notifications"
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                    </svg>
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                  
                  {isNotificationsOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-20">
                      <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <p className="font-medium text-gray-800 dark:text-white">Notifications</p>
                        <span className="bg-[#4caf96] text-white text-xs px-2 py-1 rounded-full">3 new</span>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {[
                          {
                            title: "Appointment Confirmed",
                            description: "Your appointment with Dr. Sarah has been confirmed",
                            time: "Just now"
                          },
                          {
                            title: "Prescription Renewed",
                            description: "Your prescription for Amoxicillin has been renewed",
                            time: "2 hours ago"
                          },
                          {
                            title: "Lab Results Ready",
                            description: "Your recent lab results are now available",
                            time: "Yesterday"
                          }
                        ].map((notification, index) => (
                          <div key={index} className="p-3 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-[#4caf9620] dark:bg-[#4caf9640] rounded-full flex items-center justify-center text-[#4caf96] flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium text-gray-800 dark:text-white text-sm">{notification.title}</p>
                                <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">{notification.description}</p>
                                <p className="text-[#4caf96] text-xs mt-1">{notification.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 text-center">
                        <button className="text-sm text-[#4caf96] hover:underline">View all notifications</button>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Account with Dropdown */}
                <div className="relative" ref={userMenuRef}>
                  <button 
                    className="p-2 rounded-full bg-[#4caf9620] text-[#4caf96] hover:bg-[#4caf9630] transition-colors"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    aria-label="User Account"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </button>

                  {/* User Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-20">
                      <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                        <p className="font-medium text-gray-800 dark:text-white">{user?.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                      </div>
                      <div className="py-1">
                        <button 
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={() => {
                            navigate('/dashboard');
                            setIsUserMenuOpen(false);
                          }}
                        >
                          Dashboard
                        </button>
                        <button 
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={() => {
                            navigate('/appointments');
                            setIsUserMenuOpen(false);
                          }}
                        >
                          My Appointments
                        </button>
                        <button 
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={() => {
                            navigate('/profile');
                            setIsUserMenuOpen(false);
                          }}
                        >
                          Profile
                        </button>
                        <button 
                          className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="h-7 bg-[#4caf9620] text-[#4caf96] font-bold text-sm rounded-lg hover:bg-[#4caf9630] transition-colors"
                  onClick={() => navigate('/auth/login')}
                >
                  Login
                </Button>
                <Button 
                  className="h-7 bg-[#4caf96] text-white font-bold text-sm rounded-lg hover:bg-[#3d9d86] transition-colors"
                  onClick={() => navigate('/auth/register')}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden fixed top-[58px] left-0 right-0 bg-white dark:bg-gray-900 border-b border-[#f0f0f0] dark:border-gray-800 z-10 transition-all duration-300 ${isMenuOpen ? 'max-h-[300px] py-3' : 'max-h-0 py-0 overflow-hidden'}`}>
        <nav className="flex flex-col px-4">
          <Button
            variant="ghost"
            className={`w-full justify-start font-['Montserrat',Helvetica] ${isActive('/') ? 'font-bold' : 'font-medium'} hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive('/') ? 'text-[#4caf96]' : 'text-gray-800 dark:text-white'}`}
            onClick={() => navigate('/')}
          >
            Home
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start font-['Montserrat',Helvetica] ${isActive('/doctors') ? 'font-bold' : 'font-medium'} hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive('/doctors') ? 'text-[#4caf96]' : 'text-gray-800 dark:text-white'}`}
            onClick={() => navigate('/doctors')}
          >
            Browse Doctors
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start font-['Montserrat',Helvetica] ${isActive('/services') ? 'font-bold' : 'font-medium'} hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive('/services') ? 'text-[#4caf96]' : 'text-gray-800 dark:text-white'}`}
            onClick={() => navigate('/services')}
          >
            Services
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start font-['Montserrat',Helvetica] ${isActive('/about') ? 'font-bold' : 'font-medium'} hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive('/about') ? 'text-[#4caf96]' : 'text-gray-800 dark:text-white'}`}
            onClick={() => navigate('/about')}
          >
            About Us
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start font-['Montserrat',Helvetica] ${isActive('/contact') ? 'font-bold' : 'font-medium'} hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive('/contact') ? 'text-[#4caf96]' : 'text-gray-800 dark:text-white'}`}
            onClick={() => navigate('/contact')}
          >
            Contact Us
          </Button>
          
          {isAuthenticated && (
            <Button
              variant="ghost"
              className={`w-full justify-start font-['Montserrat',Helvetica] ${isActive('/dashboard') ? 'font-bold' : 'font-medium'} hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive('/dashboard') ? 'text-[#4caf96]' : 'text-gray-800 dark:text-white'}`}
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </Button>
          )}
        </nav>
      </div>

      <main className="flex-grow pt-[58px] bg-[#f8f5f2] dark:bg-gray-900">{children}</main>

      {/* Professional Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-[#f0f0f0] dark:border-gray-800 mt-12">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col gap-4">
              <h2 className="font-['Montserrat',Helvetica] font-extrabold text-[#4caf96] text-xl">Sehaty</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                Your trusted digital healthcare companion. We connect patients with top healthcare providers.
              </p>
              <div className="flex gap-4 mt-4">
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-[#4caf96]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-[#4caf96]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-[#4caf96]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-[#4caf96]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-['Montserrat',Helvetica] font-bold text-gray-800 dark:text-white text-lg mb-4">Quick Links</h3>
              <ul className="flex flex-col gap-2">
                <li>
                  <a 
                    href="/" 
                    className="text-gray-600 dark:text-gray-300 hover:text-[#4caf96] text-sm"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a 
                    href="/doctors" 
                    className="text-gray-600 dark:text-gray-300 hover:text-[#4caf96] text-sm"
                  >
                    Find Doctors
                  </a>
                </li>
                <li>
                  <a 
                    href="/about" 
                    className="text-gray-600 dark:text-gray-300 hover:text-[#4caf96] text-sm"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a 
                    href="/contact" 
                    className="text-gray-600 dark:text-gray-300 hover:text-[#4caf96] text-sm"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-['Montserrat',Helvetica] font-bold text-gray-800 dark:text-white text-lg mb-4">Services</h3>
              <ul className="flex flex-col gap-2">
                <li>
                  <a 
                    href="/services#teleconsultation" 
                    className="text-gray-600 dark:text-gray-300 hover:text-[#4caf96] text-sm"
                  >
                    Teleconsultation
                  </a>
                </li>
                <li>
                  <a 
                    href="/services#appointment-booking" 
                    className="text-gray-600 dark:text-gray-300 hover:text-[#4caf96] text-sm"
                  >
                    Appointment Booking
                  </a>
                </li>
                <li>
                  <a 
                    href="/services#medical-records" 
                    className="text-gray-600 dark:text-gray-300 hover:text-[#4caf96] text-sm"
                  >
                    Health Records
                  </a>
                </li>
                <li>
                  <a 
                    href="/services#prescription-management" 
                    className="text-gray-600 dark:text-gray-300 hover:text-[#4caf96] text-sm"
                  >
                    Prescription Management
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-['Montserrat',Helvetica] font-bold text-gray-800 dark:text-white text-lg mb-4">Contact</h3>
              <ul className="flex flex-col gap-3">
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#4caf96] mt-1">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300 text-sm">
                    Cairo, Egypt
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#4caf96]">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  {/* Phone number removed */}
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#4caf96]">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300 text-sm">info@sehaty.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Sehaty. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-[#4caf96] text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-[#4caf96] text-sm">Terms of Service</a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-[#4caf96] text-sm">Cookies Policy</a>
            </div>
          </div>
        </div>
      </footer>
      <PreviewBanner />
    </div>
  );
}; 