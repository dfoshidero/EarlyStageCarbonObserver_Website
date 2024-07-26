// src/QuickView.js
import React, { useState } from "react";
import axios from "axios";

const QuickView = () => {
  const [description, setDescription] = useState("");
  const [prediction, setPrediction] = useState(null);

  const handlePredict = async () => {
    const features = await axios.post("/api/extract-features", { description });
    const result = await axios.post("/api/predict", features.data);
    setPrediction(result.data);
  };

  return (
    <div className="quick-view">
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handlePredict}>Predict</button>
      {prediction && (
        <div className="prediction-result">
          <h4>Prediction Result:</h4>
          <pre>{JSON.stringify(prediction, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default QuickView;
