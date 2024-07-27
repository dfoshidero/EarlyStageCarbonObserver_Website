import React, { useState, useEffect } from "react";
import { extract, predict } from "../../utils/modelapi";
import EcoAnimatedText from "../../components/AnimatedText/EcoAnimatedText";
import "./InsightPage.scss";

const QuickView = () => {
  const [description, setDescription] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [greeting, setGreeting] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const placeholders = [
    "ECO loooves to help you predict your carbon! 🌱",
    "What are you thinking of designing today?",
    "Carbon carbon carbon...",
    "Tell me about your cool eco-friendly idea! 🌟",
    "Thinking sustainable? ECO's heeere to help! 🫡",
    "Carbon time! 🚀",
  ];

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) setGreeting("Good morning.");
    else if (hours < 18) setGreeting("Good afternoon.");
    else setGreeting("Good evening.");
  }, []);

  const handlePredict = async () => {
    setPrediction(null);
    try {
      const trimmedDescription = String(description).trim();
      const extractedData = await extract(trimmedDescription);
      console.log(extractedData);
      const result = await predict(extractedData);
      setPrediction(parseFloat(result[0]).toFixed(2));
    } catch (error) {
      console.error("Error in handlePredict:", error);
    }
  };

  const handleExampleClick = async (input) => {
    setDescription(input);
    try {
      const extractedData = await extract(input);
      console.log(extractedData);
      const result = await predict(extractedData);
      setPrediction(parseFloat(result[0]).toFixed(2));
    } catch (error) {
      console.error("Error in handleExampleClick:", error);
    }
  };

  const exampleInputs = [
    "Design a sustainable office building",
    "Plan a residential complex",
    "Develop an eco-friendly retail store",
  ];

  return (
    <div className="quick-view">
      <div className="content-wrapper">
        <div className="greeting-wrapper">
          <img
            src="/assets/images/logo-head-nbg.svg"
            alt="Logo"
            className="logo"
          />
          <h1 className="greeting">{greeting}</h1>
        </div>
        <div className="textarea-wrapper">
          {!isFocused && description === "" && (
            <EcoAnimatedText examples={placeholders} />
          )}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="description-textarea"
          />
        </div>
        <button onClick={handlePredict} className="predict-button">
          Predict
        </button>
        {prediction && (
          <div className="prediction-result">
            <h4>Prediction Result:</h4>
            <pre>
              {prediction} kgCO2e/m<sup>2</sup>
            </pre>
          </div>
        )}
        <div className={`examples ${isFocused ? "show" : ""}`}>
          <h4>Example Inputs:</h4>
          <div className="example-list">
            {exampleInputs.map((input, index) => (
              <div
                key={index}
                className="example-item"
                onClick={() => handleExampleClick(input)}
              >
                {input}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView;
