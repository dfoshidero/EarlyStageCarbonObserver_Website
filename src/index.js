import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./home/Home";
import Insight from "./pages/Insight/Insight";
import SupportPage from "./pages/Support/Support";
import ProjectPage from "./pages/Project/Project";
import Layout from "./components/Layout/Layout";
import "./index.css";
import { useParams } from "react-router-dom";

// Dummy function to simulate fetching project name
const fetchProjectName = (projectId) => {
  const projects = {
    1: "Project One",
    2: "Project Two",
    3: "Project Three",
  };
  return projects[projectId] || "Unknown Project";
};

const ProjectLayout = () => {
  const { id } = useParams();
  const projectName = fetchProjectName(id);

  return (
    <Layout pageTitle={`Project: ${projectName}`} additionalInfo={`ID: ${id}`}>
      <ProjectPage />
    </Layout>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout pageTitle="Home" additionalInfo="">
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/quickview"
          element={
            <Layout pageTitle="Quick View" additionalInfo="">
              <Insight />
            </Layout>
          }
        />
        <Route path="/projects/:id" element={<ProjectLayout />} />
        <Route
          path="/support"
          element={
            <Layout pageTitle="Support" additionalInfo="">
              <SupportPage />
            </Layout>
          }
        />
      </Routes>
    </Router>
  </React.StrictMode>
);
