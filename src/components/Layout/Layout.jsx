import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import "./Layout.scss";

const Layout = ({ children, pageTitle, additionalInfo }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [animateSidebar, setAnimateSidebar] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const hasAnimated = sessionStorage.getItem("sidebarAnimated");

    if (!hasAnimated) {
      setAnimateSidebar(true);
      sessionStorage.setItem("sidebarAnimated", "true");
      setTimeout(() => {
        setIsSidebarOpen(true);
        setTimeout(() => {
          setIsSidebarOpen(false);
          setTimeout(() => {
            setAnimateSidebar(false);
          }, 1000); // Time for sidebar to fully close
        }, 1000); // Time for sidebar to fully open
      }, 1000); // Time to start the animation
    } else {
      setIsSidebarOpen(true);
    }
  }, []);

  return (
    <div
      className={`app ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"} ${
        animateSidebar ? "animate-sidebar" : ""
      }`}
    >
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="main-container">
        <div className="header-area">
          <Header
            isSidebarOpen={isSidebarOpen}
            pageTitle={pageTitle}
            additionalInfo={additionalInfo}
            userName="User Name"
            onToggleSidebar={toggleSidebar}
          />
        </div>
        <div className="content-container">
          <div className="main-content">{children}</div>
          <footer className="footer">
            <small>
              ECO is close, but not perfect. Inspect project specs for accuracy.
              All rights reserved.
            </small>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Layout;
