import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./home/Home";
import AboutPage from "./pages/Contact/Contact";
import SupportPage from "./pages/Support/Support";
import ProjectPage from "./pages/Project/Project";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects/:id" element={<ProjectPage />} />
        <Route path="/support" element={<SupportPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
