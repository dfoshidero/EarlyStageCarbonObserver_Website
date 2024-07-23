import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import "./Sidebar.scss";
import { ReactComponent as NewBuildingIcon } from "../../assets/images/new-building.svg";
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
    Cookies.set("projectName", projectName); // Set project name in cookies
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
            <img
              src="/assets/images/logo-full-grey-nbg.svg"
              alt="Logo"
              className="logo-image"
            />
          </div>
        </div>
        <div className="sidebar-nav">
          <a className={`sidebar-link ${isActive("/")}`} href="/">
            ECO
          </a>
          <a
            className={`sidebar-link ${isActive("/quickview")}`}
            href="/quickview"
          >
            Insight
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
            <NewBuildingIcon style={{ color: "#000", fontSize: "20px" }} />{" "}
            {/* Smaller icon */}
          </button>
        </div>
        <div className="projects">
          {projects.map((project, index) => (
            <a
              key={index}
              className={`project-link ${
                index === projects.length - 1 && projects.length > 1
                  ? "fade"
                  : ""
              }`}
              href={`/projects/${project}`}
              onClick={() => Cookies.set("projectName", project)} // Update cookie on project link click
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
