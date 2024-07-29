import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import { ModalProvider } from "./context/ModalContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import HomePage from "./home/Home";
import QuickView from "./pages/Insight/Insight";
import SupportPage from "./pages/Support/Support";
import Layout from "./components/Layout/Layout";
import Project from "./pages/Project/Project";
import "@fortawesome/fontawesome-free/css/all.min.css";

import logo from "./assets/images/logo-head-nbg.svg"; // Import the logo

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  if (isMobile) {
    return (
      <div className="mobile-message">
        <img src={logo} alt="Logo" className="mobile-logo" />
        <p>
          ECO is not yet optimized for mobile. <br />
          Please open on a computer.
        </p>
      </div>
    );
  }

  return (
    <Router>
      <ModalProvider>
        <main>
          <DndProvider backend={HTML5Backend}>
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
                    <QuickView />
                  </Layout>
                }
              />
              <Route
                path="/support"
                element={
                  <Layout pageTitle="Support" additionalInfo="">
                    <SupportPage />
                  </Layout>
                }
              />
              <Route
                path="/project"
                element={
                  <Layout pageTitle="Project" additionalInfo="">
                    <Project />
                  </Layout>
                }
              />
            </Routes>
          </DndProvider>
        </main>
      </ModalProvider>
    </Router>
  );
}

export default App;
