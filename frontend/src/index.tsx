import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Homepage } from "./screens/Homepage";
import { Contact } from "./screens/Contact";
import { About } from "./screens/About";
import { Doctors } from "./screens/Doctors";
import { Services } from "./screens/Services";
import { Login, Register, RoleSelection, ProviderSelection } from "./screens/Auth";
import { Dashboard } from "./screens/Dashboard";
import { Appointments } from "./screens/Appointments";
import { Prescriptions } from "./screens/Prescriptions/Prescriptions";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./lib/AuthContext";
import { ThemeProvider } from "./lib/ThemeContext";
import { NotificationsProvider } from "./contexts/NotificationsContext";
import { DoctorVerificationList } from "./screens/Admin/DoctorVerificationList";
import { DoctorProfile } from "./screens/DoctorProfile/DoctorProfile";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <NotificationsProvider>
            <Routes>
              {/* Auth routes (without standard layout) */}
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/role-selection" element={<RoleSelection />} />
              <Route path="/auth/provider-selection" element={<ProviderSelection />} />
              <Route path="/auth/register" element={<Register />} />
              
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
              <Route path="/prescriptions" element={
                <ProtectedRoute>
                  <Layout><Prescriptions /></Layout>
                </ProtectedRoute>
              } />

              {/* Admin routes - protected */}
              <Route path="/admin/doctor-verifications" element={
                <ProtectedRoute>
                  <Layout><DoctorVerificationList /></Layout>
                </ProtectedRoute>
              } />
              
              {/* Main routes with standard layout */}
              <Route path="/" element={<Layout><Homepage /></Layout>} />
              <Route path="/services" element={<Layout><Services /></Layout>} />
              <Route path="/contact" element={<Layout><Contact /></Layout>} />
              <Route path="/about" element={<Layout><About /></Layout>} />
              <Route path="/doctors" element={<Layout><Doctors /></Layout>} />
              <Route path="/doctors/:id" element={<Layout><DoctorProfile /></Layout>} />
            </Routes>
          </NotificationsProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  </StrictMode>
);