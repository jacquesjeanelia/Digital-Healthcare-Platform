import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

export const RoleSelection = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-gray-900 flex items-center justify-center min-h-screen py-8">
      <div className="w-full max-w-md px-4">
        <div className="flex flex-col items-center mb-8">
          <img 
            src="/logo-colored.svg" 
            alt="Sehaty" 
            className="w-16 h-16 mb-2" 
          />
          <h1 className="text-2xl font-bold text-blue-900 dark:text-white">Join Sehaty</h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
            Choose your role to get started
          </p>
        </div>

        <Card className="dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="space-y-4">
              <Button
                className="w-full h-16 bg-[#4caf96] text-white font-bold rounded-lg hover:bg-[#3d9d86] transition-colors flex items-center justify-center gap-3"
                onClick={() => navigate("/auth/register?role=patient")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <div className="text-left">
                  <div className="font-bold">I am a Patient</div>
                  <div className="text-sm font-normal opacity-90">Book appointments and manage your health</div>
                </div>
              </Button>

              <Button
                className="w-full h-16 bg-[#4caf96] text-white font-bold rounded-lg hover:bg-[#3d9d86] transition-colors flex items-center justify-center gap-3"
                onClick={() => navigate("/auth/provider-selection")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                </svg>
                <div className="text-left">
                  <div className="font-bold">I am a Healthcare Provider</div>
                  <div className="text-sm font-normal opacity-90">Manage your practice and appointments</div>
                </div>
              </Button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <button 
                  onClick={() => navigate("/auth/login")} 
                  className="text-[#4caf96] hover:underline"
                >
                  Log in
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            className="border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}; 