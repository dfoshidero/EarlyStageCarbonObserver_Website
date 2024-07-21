import React, { useState } from "react";
import "./DescriptionTool.scss";

const DescriptionTool = () => {
  const [isNewProject, setIsNewProject] = useState(true);
  const [description, setDescription] = useState("");

  const handleInputChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePredict = () => {
    // Implement the prediction logic here
    console.log("Predicting carbon impact for:", description);
  };

  return (
    <div className="chat-description">
      {isNewProject ? (
        <div className="input-container">
          <textarea
            className="description-input"
            value={description}
            onChange={handleInputChange}
            placeholder="Enter project description..."
          />
          <button className="predict-button" onClick={handlePredict}>
            Predict
          </button>
        </div>
      ) : (
        <>
          <h2>Chat Description</h2>
          <p>
            Here will be the chat description and interactions related to the
            eco model.
          </p>
        </>
      )}
    </div>
  );
};

export default DescriptionTool;
