import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./ProjectPage.scss"; // Import the SCSS file

const ProjectPage = () => {
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    const project = Cookies.get("projectName");
    if (project) {
      setProjectName(project);
    }
  }, []);

  return (
    <div className="project-page">
      <header className="header">
        <h1 className="title">{projectName}</h1>
      </header>
      <section className="projects-container">
        <div className="text-input-box">
          <textarea placeholder="Enter your project details here..." />
        </div>
        <div className="smaller-boxes">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="box">
              <p>Box {index + 1}</p>
              {/* Add more fields as needed */}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProjectPage;
