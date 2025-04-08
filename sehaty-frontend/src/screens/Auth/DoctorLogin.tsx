import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";

export const DoctorLogin = (): JSX.Element => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // TODO: Implement actual doctor login functionality
    // This is just a placeholder for demonstration
    setTimeout(() => {
      if (email && password) {
        // Mock successful login
        setIsLoading(false);
        // Store token or doctor data
        localStorage.setItem("doctorToken", "mock-token");
        navigate("/doctors/dashboard");
      } else {
        setError("Please enter your credentials");
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="bg-white dark:bg-gray-900 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md px-4">
        <div className="flex flex-col items-center mb-8">
          <img 
            src="/logo-colored.svg" 
            alt="Sehaty" 
            className="w-16 h-16 mb-2" 
          />
          <h1 className="text-2xl font-bold text-blue-900 dark:text-white">Healthcare Provider Portal</h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
            Access your doctor dashboard and manage appointments
          </p>
        </div>

        <Card className="border-[#a818fc] dark:border-[#a818fc] dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="bg-[#a918fd0d] dark:bg-[#a918fd19] rounded-lg p-4 mb-6 flex items-center">
              <div className="w-10 h-10 bg-[#a818fc] rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-[#a818fc]">Doctor Access Only</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">This portal is exclusively for verified healthcare providers</p>
              </div>
            </div>

            {error && (
              <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-md mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Professional Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="doctor@hospital.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white dark:bg-gray-700"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white dark:bg-gray-700"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 accent-[#a818fc]"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-[#a818fc] hover:underline">
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full h-10 bg-[#a818fc] text-white font-bold rounded-lg hover:bg-[#8a14d4]"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Sign in to Portal"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Not registered as a provider? <a href="#" className="text-[#a818fc] hover:underline">Contact admin</a>
              </p>
            </div>

            <div className="mt-4">
              <Button
                variant="ghost" 
                className="w-full text-gray-700 dark:text-gray-300"
                onClick={() => navigate("/")}
              >
                ← Back to main site
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col items-center mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p className="mb-2">Secured login for healthcare providers</p>
          <div className="flex space-x-4">
            <a href="/contact" className="hover:text-[#a818fc]">Help</a>
            <a href="/about" className="hover:text-[#a818fc]">Privacy</a>
            <a href="/about" className="hover:text-[#a818fc]">Terms</a>
          </div>
        </div>
      </div>
    </div>
  );
}; 