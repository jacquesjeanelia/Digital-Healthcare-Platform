import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

export const DoctorAnalytics = (): JSX.Element => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-[#1f4156] dark:text-white">Analytics</h2>
        
        <div className="flex gap-3">
          <Select defaultValue="week">
            <SelectTrigger className="w-[180px] bg-white dark:bg-gray-700">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full mb-6">
        <TabsList className="grid grid-cols-4 w-full max-w-[600px] bg-[#4caf9615] dark:bg-gray-800 p-1 rounded-xl">
          <TabsTrigger value="overview" className="rounded-lg transition-all data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm data-[state=active]:text-[#4caf96] data-[state=active]:font-medium">
            Overview
          </TabsTrigger>
          <TabsTrigger value="appointments" className="rounded-lg transition-all data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm data-[state=active]:text-[#4caf96] data-[state=active]:font-medium">
            Appointments
          </TabsTrigger>
          <TabsTrigger value="patients" className="rounded-lg transition-all data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm data-[state=active]:text-[#4caf96] data-[state=active]:font-medium">
            Patients
          </TabsTrigger>
          <TabsTrigger value="revenue" className="rounded-lg transition-all data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm data-[state=active]:text-[#4caf96] data-[state=active]:font-medium">
            Revenue
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Patients Treated</p>
                    <h3 className="text-2xl font-bold text-[#1f4156] dark:text-white mt-1">128</h3>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                        <polyline points="16 7 22 7 22 13"></polyline>
                      </svg>
                      12% from last period
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-[#4caf9615] rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4caf96" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Average Rating</p>
                    <h3 className="text-2xl font-bold text-[#1f4156] dark:text-white mt-1">4.8</h3>
                    <div className="flex items-center mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg 
                          key={star}
                          xmlns="http://www.w3.org/2000/svg" 
                          width="12" 
                          height="12" 
                          viewBox="0 0 24 24" 
                          fill={star <= 4 ? "#FFB800" : "#FFB800"}
                          stroke={star <= 4 ? "#FFB800" : "#E0E0E0"}
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          className="mr-0.5"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                      ))}
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">(42 reviews)</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/20 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No-Show Rate</p>
                    <h3 className="text-2xl font-bold text-[#1f4156] dark:text-white mt-1">4.2%</h3>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                        <polyline points="16 7 22 7 22 13"></polyline>
                      </svg>
                      1.8% better than average
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-[#4caf9615] rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4caf96" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 lg:col-span-2">
              <CardContent className="p-6">
                <h3 className="font-semibold text-[#1f4156] dark:text-white mb-4">Appointment Trends</h3>
                <div className="w-full h-[280px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#4caf9620] dark:bg-[#4caf9640] rounded-full flex items-center justify-center text-[#4caf96] mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="1" y="3" width="15" height="13"></rect>
                        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                        <circle cx="5.5" cy="18.5" r="2.5"></circle>
                        <circle cx="18.5" cy="18.5" r="2.5"></circle>
                      </svg>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Chart library not integrated in this example.
                      <br />
                      This would show weekly appointment trends.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <h3 className="font-semibold text-[#1f4156] dark:text-white mb-4">Appointment Types</h3>
                <div className="w-full h-[280px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#4caf9620] dark:bg-[#4caf9640] rounded-full flex items-center justify-center text-[#4caf96] mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                        <line x1="9" y1="9" x2="9.01" y2="9"></line>
                        <line x1="15" y1="9" x2="15.01" y2="9"></line>
                      </svg>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Chart library not integrated in this example.
                      <br />
                      This would show appointment types breakdown.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="appointments" className="mt-6">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-[#4caf9620] dark:bg-[#4caf9640] rounded-full flex items-center justify-center text-[#4caf96] mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#1f4156] dark:text-white mb-2">Appointment Analytics</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Detailed appointment analytics would appear here, showing trends, cancellation rates, popular times, and more.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="patients" className="mt-6">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-[#4caf9620] dark:bg-[#4caf9640] rounded-full flex items-center justify-center text-[#4caf96] mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#1f4156] dark:text-white mb-2">Patient Analytics</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Detailed patient analytics would appear here, showing demographics, retention rates, and patient growth over time.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="mt-6">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-[#4caf9620] dark:bg-[#4caf9640] rounded-full flex items-center justify-center text-[#4caf96] mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#1f4156] dark:text-white mb-2">Revenue Analytics</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Detailed revenue analytics would appear here, showing income trends, average revenue per patient, and financial projections.
            </p>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-10">
        <h3 className="font-semibold text-[#1f4156] dark:text-white mb-4">Weekly Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <h4 className="font-medium text-[#1f4156] dark:text-white mb-4">Key Metrics</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Patient Satisfaction</span>
                    <span className="font-medium text-[#1f4156] dark:text-white">92%</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                    <div className="h-2 bg-[#4caf96] rounded-full" style={{ width: "92%" }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Appointment Utilization</span>
                    <span className="font-medium text-[#1f4156] dark:text-white">85%</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                    <div className="h-2 bg-[#4caf96] rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Digital Prescriptions</span>
                    <span className="font-medium text-[#1f4156] dark:text-white">78%</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                    <div className="h-2 bg-[#4caf96] rounded-full" style={{ width: "78%" }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Follow-up Compliance</span>
                    <span className="font-medium text-[#1f4156] dark:text-white">64%</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                    <div className="h-2 bg-[#4caf96] rounded-full" style={{ width: "64%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <h4 className="font-medium text-[#1f4156] dark:text-white mb-4">Top Diagnoses</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Hypertension</span>
                  <span className="text-sm font-medium text-[#1f4156] dark:text-white">24 patients</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Diabetes Type 2</span>
                  <span className="text-sm font-medium text-[#1f4156] dark:text-white">18 patients</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Respiratory Infections</span>
                  <span className="text-sm font-medium text-[#1f4156] dark:text-white">15 patients</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Anxiety Disorders</span>
                  <span className="text-sm font-medium text-[#1f4156] dark:text-white">12 patients</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Back Pain</span>
                  <span className="text-sm font-medium text-[#1f4156] dark:text-white">10 patients</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}; 