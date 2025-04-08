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
  isPreviewMode: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  enablePreviewMode: () => void;
  disablePreviewMode: () => void;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  isPreviewMode: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  enablePreviewMode: () => {},
  disablePreviewMode: () => {},
});

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  useEffect(() => {
    // Check for existing auth token
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        const previewMode = localStorage.getItem("previewMode") === "true";
        
        if (previewMode) {
          setIsPreviewMode(true);
          setUser({
            id: "preview",
            name: "Preview User",
            email: "preview@example.com",
            role: "patient"
          });
        } else if (token) {
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
        localStorage.removeItem("previewMode");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Auto logout after 30 minutes of inactivity (unless in preview mode)
    let inactivityTimer: number;
    
    const resetTimer = () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      
      // Only set timer if not in preview mode
      if (!isPreviewMode) {
        inactivityTimer = window.setTimeout(() => {
          logout();
          alert("You have been logged out due to inactivity");
        }, 30 * 60 * 1000); // 30 minutes
      }
    };

    // Reset timer on user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, resetTimer);
    });

    // Start the timer
    resetTimer();

    // Clean up
    return () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      events.forEach(event => {
        document.removeEventListener(event, resetTimer);
      });
    };
  }, [isPreviewMode]);

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
    setIsPreviewMode(false);
    localStorage.removeItem("token");
    localStorage.removeItem("previewMode");
  };

  // Enable preview mode
  const enablePreviewMode = () => {
    setIsPreviewMode(true);
    setUser({
      id: "preview",
      name: "Preview User",
      email: "preview@example.com",
      role: "patient"
    });
    localStorage.setItem("previewMode", "true");
  };

  // Disable preview mode
  const disablePreviewMode = () => {
    setIsPreviewMode(false);
    if (!localStorage.getItem("token")) {
      setUser(null);
    }
    localStorage.removeItem("previewMode");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    isPreviewMode,
    login,
    register,
    logout,
    enablePreviewMode,
    disablePreviewMode
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 