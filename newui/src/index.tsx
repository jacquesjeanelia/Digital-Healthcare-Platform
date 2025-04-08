import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Homepage } from "./screens/Homepage";
import { Contact } from "./screens/Contact";
import { About } from "./screens/About";
import { Doctors } from "./screens/Doctors";
import { Layout } from "./components/Layout";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/doctors" element={<Doctors />} />
        </Routes>
      </Layout>
    </Router>
  </StrictMode>
);