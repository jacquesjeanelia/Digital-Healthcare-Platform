import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { useAuth } from "../../lib/AuthContext";

export const Dashboard = (): JSX.Element => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate("/auth/login");
    }
  }, [user, navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#f8f5f2] dark:bg-gray-900 flex flex-row justify-center w-full min-h-screen">
      <div className="w-full max-w-[1280px] relative pt-[75px] px-4 md:px-6">
        <div className="flex flex-col gap-8">
          {/* Dashboard Header */}
          <div className="flex flex-col items-start md:flex-row md:items-center md:justify-between gap-4 py-6">
            <div>
              <h1 className="font-['Montserrat',Helvetica] font-bold text-[#1f4156] dark:text-white text-3xl">
                Welcome back, {user.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Manage your healthcare journey from your personal dashboard
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-[#4caf96] text-[#4caf96] hover:bg-[#4caf9610]"
                onClick={() => navigate('/profile')}
              >
                My Profile
              </Button>
              <Button
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                onClick={() => {
                  logout();
                  navigate('/');
                }}
              >
                Logout
              </Button>
            </div>
          </div>

          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white dark:bg-gray-800 border-none shadow-sm">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[#4caf9620] dark:bg-[#4caf9640] rounded-full flex items-center justify-center mb-4 text-[#4caf96]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <h3 className="font-['Montserrat',Helvetica] font-semibold text-[#1f4156] dark:text-white text-lg">
                  Appointments
                </h3>
                <p className="text-3xl font-bold mt-2 text-[#4caf96]">3</p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  2 upcoming appointments
                </p>
                <Button
                  variant="ghost"
                  className="w-full mt-4 bg-[#4caf9620] text-[#4caf96] font-medium hover:bg-[#4caf9630]"
                  onClick={() => navigate('/appointments')}
                >
                  View All
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-none shadow-sm">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[#4caf9620] dark:bg-[#4caf9640] rounded-full flex items-center justify-center mb-4 text-[#4caf96]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                    <line x1="4" y1="22" x2="4" y2="15" />
                  </svg>
                </div>
                <h3 className="font-['Montserrat',Helvetica] font-semibold text-[#1f4156] dark:text-white text-lg">
                  Prescriptions
                </h3>
                <p className="text-3xl font-bold mt-2 text-[#4caf96]">5</p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  2 active prescriptions
                </p>
                <Button
                  variant="ghost"
                  className="w-full mt-4 bg-[#4caf9620] text-[#4caf96] font-medium hover:bg-[#4caf9630]"
                  onClick={() => navigate('/prescriptions')}
                >
                  View All
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-none shadow-sm">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[#4caf9620] dark:bg-[#4caf9640] rounded-full flex items-center justify-center mb-4 text-[#4caf96]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6" />
                    <path d="M16 13H8" />
                    <path d="M16 17H8" />
                    <path d="M10 9H8" />
                  </svg>
                </div>
                <h3 className="font-['Montserrat',Helvetica] font-semibold text-[#1f4156] dark:text-white text-lg">
                  Health Records
                </h3>
                <p className="text-3xl font-bold mt-2 text-[#4caf96]">12</p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Last updated: March 28, 2024
                </p>
                <Button
                  variant="ghost"
                  className="w-full mt-4 bg-[#4caf9620] text-[#4caf96] font-medium hover:bg-[#4caf9630]"
                  onClick={() => navigate('/records')}
                >
                  View All
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <div className="mt-8">
            <h2 className="font-['Montserrat',Helvetica] font-bold text-[#1f4156] dark:text-white text-xl mb-4">
              Recent Activities
            </h2>
            <Card className="bg-white dark:bg-gray-800 border-none shadow-sm">
              <CardContent className="p-0">
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {[
                    {
                      title: "Appointment Scheduled",
                      description: "You scheduled an appointment with Dr. Smith for April 15, 10:00 AM",
                      date: "2 days ago",
                      icon: (
                        <div className="w-10 h-10 bg-[#4caf9620] dark:bg-[#4caf9640] rounded-full flex items-center justify-center text-[#4caf96]">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                            <line x1="16" x2="16" y1="2" y2="6" />
                            <line x1="8" x2="8" y1="2" y2="6" />
                            <line x1="3" x2="21" y1="10" y2="10" />
                            <path d="m9 16 2 2 4-4" />
                          </svg>
                        </div>
                      ),
                    },
                    {
                      title: "Prescription Renewed",
                      description: "Your prescription for Amoxicillin has been renewed",
                      date: "1 week ago",
                      icon: (
                        <div className="w-10 h-10 bg-[#4caf9620] dark:bg-[#4caf9640] rounded-full flex items-center justify-center text-[#4caf96]">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                            <line x1="4" y1="22" x2="4" y2="15" />
                          </svg>
                        </div>
                      ),
                    },
                    {
                      title: "Health Record Updated",
                      description: "Your health record has been updated with recent lab results",
                      date: "2 weeks ago",
                      icon: (
                        <div className="w-10 h-10 bg-[#4caf9620] dark:bg-[#4caf9640] rounded-full flex items-center justify-center text-[#4caf96]">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <path d="M14 2v6h6" />
                            <path d="M16 13H8" />
                            <path d="M16 17H8" />
                            <path d="M10 9H8" />
                          </svg>
                        </div>
                      ),
                    },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start gap-4 p-4">
                      {activity.icon}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-[#1f4156] dark:text-white">{activity.title}</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{activity.description}</p>
                      </div>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">{activity.date}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Health Tips */}
          <div className="mt-8 mb-12">
            <h2 className="font-['Montserrat',Helvetica] font-bold text-[#1f4156] dark:text-white text-xl mb-4">
              Health Tips
            </h2>
            <div className="bg-[#4caf9620] dark:bg-[#4caf9640] rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-[#4caf96] flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-['Montserrat',Helvetica] font-semibold text-[#1f4156] dark:text-white text-lg">
                    Stay Hydrated
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mt-2">
                    Remember to drink at least 8 glasses of water daily. Staying hydrated helps maintain your body's temperature, lubricates joints, and helps deliver nutrients to cells.
                  </p>
                  <Button
                    variant="ghost"
                    className="mt-4 bg-white dark:bg-gray-800 text-[#4caf96] font-medium hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => navigate('/health-tips')}
                  >
                    More Health Tips
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 