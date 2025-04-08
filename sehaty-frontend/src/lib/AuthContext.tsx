import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the shape of the user object
interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor' | 'admin';
}

// Define the shape of the auth context
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth token
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          // For demo purposes - in a real app, validate the token with your backend
          setUser({
            id: "1",
            name: "Test User",
            email: "test@example.com",
            role: "patient"
          });
        }
      } catch (error) {
        console.error("Auth error:", error);
        localStorage.removeItem("token");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, make an API call to your backend
      // Mock login for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      
      // Set the user
      setUser({
        id: "1",
        name: "Test User",
        email,
        role: "patient"
      });
      
      // Save token
      localStorage.setItem("token", "mock-token");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, make an API call to your backend
      // Mock registration for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      
      // Set the user
      setUser({
        id: "1",
        name,
        email,
        role: "patient"
      });
      
      // Save token
      localStorage.setItem("token", "mock-token");
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 