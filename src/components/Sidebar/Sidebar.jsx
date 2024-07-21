import React, { useState, useEffect } from "react";
import "./Sidebar.scss";

const Sidebar = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    setProjects(savedProjects);
  }, []);

  const addProject = (projectName) => {
    const newProjects = [...projects, projectName];
    setProjects(newProjects);
    /*localStorage.setItem("projects", JSON.stringify(newProjects));*/
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="sr-only">Chat history</h2>
        <nav aria-label="Chat history">
          <div className="sidebar-nav">
            <button className="sidebar-button">
              <svg
                className="icon"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              // ADD LOGO HERE. 
              >
                
              </svg>
            </button>
          </div>
          <div className="sidebar-content">
            <a className="sidebar-link" href="/">
              Home
            </a>
            <a className="sidebar-link" href="/dalle">
              Insight
            </a>
            <a className="sidebar-link" href="/gpts">
              Optimizer
            </a>
            <a className="sidebar-link" href="/gpts">
              Search
            </a>
            <div className="divider"></div>
            <div className="projects">
              {projects.map((project, index) => (
                <a
                  key={index}
                  className="project-link"
                  href={`/project/${project}`}
                >
                  {project}
                </a>
              ))}
            </div>
          </div>
          <button onClick={() => addProject(`Project ${projects.length + 1}`)}>
            Add Project
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
