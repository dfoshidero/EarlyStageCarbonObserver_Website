import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./home/Home";
import ContactPage from "./pages/Contact/Contact";
import SupportPage from "./pages/Support/Support";
import ProjectPage from "./pages/Project/Project";
import Layout from "./components/Layout/Layout";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <ContactPage />
            </Layout>
          }
        />
        <Route
          path="/projects/:id"
          element={
            <Layout>
              <ProjectPage />
            </Layout>
          }
        />
        <Route
          path="/support"
          element={
            <Layout>
              <SupportPage />
            </Layout>
          }
        />
      </Routes>
    </Router>
  </React.StrictMode>
);
