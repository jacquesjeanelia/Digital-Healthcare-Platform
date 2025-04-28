import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Homepage } from "./screens/Homepage";
import { Contact } from "./screens/Contact";
import { About } from "./screens/About";
import { Doctors } from "./screens/Doctors";
import { Services } from "./screens/Services";
import { Login, Register, DoctorLogin } from "./screens/Auth";
import { Dashboard } from "./screens/Dashboard";
import { Appointments } from "./screens/Appointments";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./lib/AuthContext";
import React, { Component, ErrorInfo, ReactNode } from 'react';

// Add error boundary
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: 'red' }}>
          <h1>Something went wrong</h1>
          <pre>{this.state.error?.toString()}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

// Debug mount point
const rootElement = document.getElementById('app');
if (!rootElement) {
  console.error('Root element not found!');
  document.body.innerHTML = '<div style="color: red; padding: 20px;">Root element not found!</div>';
} else {
  console.log('Root element found:', rootElement);
  
  try {
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <ErrorBoundary>
          <AuthProvider>
            <Router>
              <Routes>
                {/* Auth routes (without standard layout) */}
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/auth/doctor-login" element={<DoctorLogin />} />
                
                {/* Dashboard routes with layout - protected */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Layout><Dashboard /></Layout>
                  </ProtectedRoute>
                } />
                <Route path="/appointments" element={
                  <ProtectedRoute>
                    <Layout><Appointments /></Layout>
                  </ProtectedRoute>
                } />
                
                {/* Main routes with standard layout */}
                <Route path="/" element={<Layout><Homepage /></Layout>} />
                <Route path="/services" element={<Layout><Services /></Layout>} />
                <Route path="/contact" element={<Layout><Contact /></Layout>} />
                <Route path="/about" element={<Layout><About /></Layout>} />
                <Route path="/doctors" element={<Layout><Doctors /></Layout>} />
              </Routes>
            </Router>
          </AuthProvider>
        </ErrorBoundary>
      </StrictMode>
    );
    console.log('React app mounted successfully');
  } catch (error) {
    console.error('Error mounting React app:', error);
    if (error instanceof Error) {
      rootElement.innerHTML = `<div style="color: red; padding: 20px;">Error mounting app: ${error.message}</div>`;
    }
  }
}