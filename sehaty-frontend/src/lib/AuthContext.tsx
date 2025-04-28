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

// API base URL - use environment variable or fallback to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
    let inactivityTimer: number;
    
    const resetTimer = () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      
      inactivityTimer = window.setTimeout(() => {
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
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      const data = await response.json();
      
      // Set the user
      setUser(data.user);
      
      // Save token
      localStorage.setItem("token", data.token);
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
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }

      const data = await response.json();
      
      // Set the user
      setUser(data.user);
      
      // Save token
      localStorage.setItem("token", data.token);
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
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 