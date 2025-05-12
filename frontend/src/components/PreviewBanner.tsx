import React from "react";
import { useAuth } from "../lib/AuthContext";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export const PreviewBanner: React.FC = () => {
  const { isPreviewMode, disablePreviewMode } = useAuth();
  const navigate = useNavigate();

  if (!isPreviewMode) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#4caf96] text-white p-2 z-50 animate-slideUp">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-2 mb-2 md:mb-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"></path>
            <path d="M12 8v4"></path>
            <path d="M12 16h.01"></path>
          </svg>
          <span className="font-medium">You are in preview mode. This is a mock account for testing purposes.</span>
        </div>
        <div className="flex gap-2">
          <Button 
            className="bg-white text-[#4caf96] hover:bg-gray-100"
            onClick={() => navigate("/appointments")}
          >
            View Appointments
          </Button>
          <Button 
            className="bg-white text-[#4caf96] hover:bg-gray-100"
            onClick={() => navigate("/dashboard")}  
          >
            View Dashboard
          </Button>
          <Button 
            variant="outline" 
            className="border-white text-white hover:bg-[#3d9d86]"
            onClick={disablePreviewMode}
          >
            Exit Preview
          </Button>
        </div>
      </div>
    </div>
  );
}; 