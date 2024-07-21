import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Sidebar.scss";
import DomainAddRoundedIcon from "@mui/icons-material/DomainAddRounded";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [projects, setProjects] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    setProjects(savedProjects);
  }, []);

  const addProject = (projectName) => {
    const newProjects = [...projects, projectName];
    setProjects(newProjects);
    localStorage.setItem("projects", JSON.stringify(newProjects));
  };

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <div>
      <button
        className={`open-sidebar-button ${isOpen ? "" : "visible"}`}
        onClick={toggleSidebar}
      >
        <MenuIcon style={{ color: "#000", fontSize: "20px" }} />{" "}
        {/* Smaller icon */}
      </button>
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <button className="close-sidebar-button" onClick={toggleSidebar}>
            <CloseIcon style={{ color: "#000", fontSize: "20px" }} />{" "}
            {/* Smaller icon */}
          </button>
        </div>
        <div className="sidebar-icon">
          <div className="logo-container">
            <img src="/Logo Full_NBG.png" alt="Logo" className="logo-image" />
          </div>
        </div>
        <div className="sidebar-nav">
          <a className={`sidebar-link ${isActive("/")}`} href="/">
            ECO
          </a>
          <a className={`sidebar-link ${isActive("/contact")}`} href="/contact">
            Contact
          </a>
          <a className={`sidebar-link ${isActive("/support")}`} href="/support">
            Support
          </a>
        </div>
        <div className="divider"></div>
        <div className="add-project-container">
          <button
            className="add-project-button"
            onClick={() => addProject(`Project ${projects.length + 1}`)}
          >
            <DomainAddRoundedIcon style={{ color: "#000", fontSize: "20px" }} />{" "}
            {/* Smaller icon */}
          </button>
        </div>
        <div className="projects">
          {projects.map((project, index) => (
            <a
              key={index}
              className="project-link"
              href={`/projects/${project}`}
            >
              {project}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
