import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { useAuth } from "../../lib/AuthContext";

export const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const { login, isLoading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
          <h1 className="text-2xl font-bold text-blue-900 dark:text-white">Welcome Back</h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
            Log in to access your health services
          </p>
        </div>

        {/* Sign Up Recommendation Banner */}
        <div className="bg-[#4caf9620] dark:bg-[#4caf9640] border-l-4 border-[#4caf96] p-4 mb-6 rounded-lg shadow-md animate-fadeIn">
          <div className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4caf96" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 mt-0.5 flex-shrink-0">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <div>
              <h3 className="font-bold text-[#4caf96] text-lg mb-1">New to Sehaty?</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Create an account to access personalized healthcare services, appointment booking, and secure medical records.
              </p>
              <Button 
                className="w-full h-10 bg-[#4caf96] text-white font-bold rounded-lg hover:bg-[#3d9d86] transition-colors"
                onClick={() => navigate("/auth/register")}
              >
                Create an Account
              </Button>
            </div>
          </div>
        </div>

        <Card className="dark:bg-gray-800">
          <CardContent className="p-6">
            {error && (
              <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-md mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
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
                    className="h-4 w-4 accent-[#4caf96]"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-[#4caf96] hover:underline">
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full h-10 bg-[#4caf96] text-white font-bold rounded-lg hover:bg-[#3d9d86] transition-colors"
                disabled={isLoading || authLoading}
              >
                {isLoading ? "Logging in..." : "Log in"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <button 
                  onClick={() => navigate("/auth/register")} 
                  className="text-[#4caf96] hover:underline"
                >
                  Sign up
                </button>
              </p>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">Or</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full border-gray-300 dark:border-gray-700 flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                onClick={() => navigate("/auth/doctor-login")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#4caf96]">
                  <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5"></path>
                </svg>
                <span>Login as Healthcare Provider</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center mt-8 space-x-4 text-sm text-gray-500 dark:text-gray-400">
          <a href="/about" className="hover:text-[#4caf96]">Privacy Policy</a>
          <span>•</span>
          <a href="/contact" className="hover:text-[#4caf96]">Terms of Service</a>
        </div>
      </div>
    </div>
  );
}; 