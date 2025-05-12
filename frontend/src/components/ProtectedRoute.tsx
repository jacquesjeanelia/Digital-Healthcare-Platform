import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isAuthenticated, isPreviewMode, isLoading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Store the route the user was trying to access for redirect after login
    if (!isAuthenticated && !isLoading && !isPreviewMode) {
      sessionStorage.setItem("redirectAfterLogin", location.pathname);
    }
  }, [isAuthenticated, isLoading, isPreviewMode, location.pathname]);

  if (isLoading) {
    // Show loading state
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#4caf96] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#4caf96] font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated and not in preview mode, redirect to login page
  if (!isAuthenticated && !isPreviewMode) {
    return <Navigate to="/auth/login" />;
  }

  // If user is in preview mode or is authenticated, show the protected content
  return <>{children}</>;
}; 