import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";

const ProjectPage = () => {
  const { id } = useParams();

  return (
    <Layout>
      <h1>Project {id}</h1>
      <p>Details about project {id}.</p>
    </Layout>
  );
};

export default ProjectPage;
