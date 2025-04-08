import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Homepage } from "./screens/Homepage";
import { Contact } from "./screens/Contact";
import { About } from "./screens/About";
import { Doctors } from "./screens/Doctors";
import { Services } from "./screens/Services";
import { Login, Register, DoctorLogin } from "./screens/Auth";
import { Layout } from "./components/Layout";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* Auth routes (without standard layout) */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/doctor-login" element={<DoctorLogin />} />
        
        {/* Main routes with standard layout */}
        <Route path="/" element={<Layout><Homepage /></Layout>} />
        <Route path="/services" element={<Layout><Services /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/doctors" element={<Layout><Doctors /></Layout>} />
      </Routes>
    </Router>
  </StrictMode>
);