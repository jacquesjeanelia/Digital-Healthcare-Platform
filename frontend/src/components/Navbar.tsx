import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useTheme } from "../lib/utils";
import { useAuth } from "../lib/AuthContext";
import { useNotifications } from "../contexts/NotificationsContext";
import { useState, useRef, useEffect } from "react";

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
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
              <div className="relative" ref={notificationsRef}>
                <button
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors relative"
                  aria-label="Notifications"
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                  </svg>
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>
                
                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-20">
                    <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                      <p className="font-medium text-gray-800 dark:text-white">Notifications</p>
                      {unreadCount > 0 && (
                        <span className="bg-[#4caf96] text-white text-xs px-2 py-1 rounded-full">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-3 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                              !notification.read ? 'bg-[#4caf9610] dark:bg-[#4caf9620]' : ''
                            }`}
                            onClick={() => markAsRead(notification.id)}
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-[#4caf9620] dark:bg-[#4caf9640] rounded-full flex items-center justify-center text-[#4caf96] flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium text-gray-800 dark:text-white text-sm">
                                  {notification.title}
                                </p>
                                <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                                  {notification.description}
                                </p>
                                <p className="text-[#4caf96] text-xs mt-1">
                                  {notification.time}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                          No notifications
                        </div>
                      )}
                    </div>
                    {notifications.length > 0 && (
                      <div className="p-3 text-center border-t border-gray-200 dark:border-gray-700">
                        <button
                          className="text-sm text-[#4caf96] hover:underline"
                          onClick={markAllAsRead}
                        >
                          Mark all as read
                        </button>
                      </div>
                    )}
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
    </header>
  );
}; 