import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

export const ProviderSelection = (): JSX.Element => {
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
          <h1 className="text-2xl font-bold text-blue-900 dark:text-white">Choose Your Provider Type</h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
            Select your healthcare provider role
          </p>
        </div>

        <Card className="dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="space-y-4">
              <Button
                className="w-full h-16 bg-[#4caf96] text-white font-bold rounded-lg hover:bg-[#3d9d86] transition-colors flex items-center justify-center gap-3"
                onClick={() => navigate("/auth/register?role=doctor")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                  <path d="M12 11v4"></path>
                  <path d="M10 13h4"></path>
                </svg>
                <div className="text-left">
                  <div className="font-bold">I am a Doctor</div>
                  <div className="text-sm font-normal opacity-90">Register as an individual healthcare provider</div>
                </div>
              </Button>

              <Button
                className="w-full h-16 bg-[#4caf96] text-white font-bold rounded-lg hover:bg-[#3d9d86] transition-colors flex items-center justify-center gap-3"
                onClick={() => navigate("/auth/register?role=clinic")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <div className="text-left">
                  <div className="font-bold">I am a Clinic</div>
                  <div className="text-sm font-normal opacity-90">Register as a healthcare facility</div>
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
            onClick={() => navigate("/auth/role-selection")}
          >
            Back to Role Selection
          </Button>
        </div>
      </div>
    </div>
  );
}; 