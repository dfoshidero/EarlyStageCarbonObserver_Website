import React from "react";
import { useParams } from "react-router-dom";

const ProjectPage = () => {
  const { id } = useParams();

  return (
    <div>
      <p>This is the project page for project ID: {id}</p>
      {/* You can add more detailed project information here */}
    </div>
  );
};

export default ProjectPage;
