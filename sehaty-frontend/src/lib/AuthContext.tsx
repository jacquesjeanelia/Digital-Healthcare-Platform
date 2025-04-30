import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { API_URL } from "./config/api";

// Define the shape of the user object
interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor' | 'admin';
  phone: string;
  providerInfo?: {
    location: string;
    specialty: string;
    workingHours: string;
    clinicName: string;
    contactInfo: string;
  };
}

// Define the shape of the auth context
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    name: string;
    email: string;
    password: string;
    phone: string;
    role: 'patient' | 'doctor';
    providerInfo?: {
      location: string;
      specialty: string;
      workingHours: string;
      clinicName: string;
      contactInfo: string;
    };
  }) => Promise<void>;
  logout: () => Promise<void>;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {
    throw new Error('Auth context not initialized');
  },
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    phone: string;
    role: 'patient' | 'doctor';
    providerInfo?: {
      location: string;
      specialty: string;
      workingHours: string;
      clinicName: string;
      contactInfo: string;
    };
  }) => {
    throw new Error('Auth context not initialized');
  },
  logout: async () => {},
});

// Hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth token and fetch user data
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        
        if (token) {
          const response = await fetch(`${API_URL}/auth/me`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.ok) {
            const data = await response.json();
            setUser(data.user);
          } else {
            // If token is invalid, remove it
            localStorage.removeItem("token");
          }
        }
      } catch (error) {
        console.error("Auth error:", error);
        localStorage.removeItem("token");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Auto logout after 30 minutes of inactivity
    let inactivityTimer: NodeJS.Timeout;
    
    const resetTimer = () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      
      inactivityTimer = setTimeout(() => {
        logout();
        alert("You have been logged out due to inactivity");
      }, 30 * 60 * 1000); // 30 minutes
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
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include' // Important for cookies
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      const data = await response.json();
      
      // Set the user
      setUser(data.user);
      
      // No need to handle token as it's handled by cookies
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData: {
    name: string;
    email: string;
    password: string;
    phone: string;
    role: 'patient' | 'doctor';
    providerInfo?: {
      location: string;
      specialty: string;
      workingHours: string;
      clinicName: string;
      contactInfo: string;
    };
  }) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
        credentials: 'include' // Important for cookies
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }

      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      localStorage.removeItem("token");
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 