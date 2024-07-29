import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { extract, predict } from "../../utils/modelapi";
import EcoAnimatedText from "../../components/AnimatedText/EcoAnimatedText";
import "./InsightPage.scss";

const QuickView = () => {
  const [description, setDescription] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [greeting, setGreeting] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [randomExamples, setRandomExamples] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState("");
  const [extractedData, setExtractedData] = useState({});

  const navigate = useNavigate(); // Initialize navigate function

  const placeholders = [
    "ECO loooves to help you predict your carbon! 🌱",
    "What are you thinking of designing today?",
    "Carbon carbon carbon...",
    "Tell me about your cool eco-friendly idea! 🌟",
    "Thinking sustainable? ECO's heeere to help! 🫡",
    "Carbon time! 🚀",
  ];

  const tooltips = [
    "I need a bit more info to give you a spot-on prediction!",
    "More details will help me make a precise prediction! 😊",
    "Add a touch more info for an accurate result!",
    "Just add a bit more detail for the best prediction! 🧐",
    "Your project needs a little more info for accuracy! 🌱",
    "Share a bit more so I can give you a great prediction!",
    "More details are needed to ensure a precise prediction! ✨",
    "I need additional info to provide an accurate result!",
    "Help me with a bit more info for a better prediction! 💪",
    "Please provide a description so I can make a prediction! ✏️",
  ];

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) setGreeting("Good morning.");
    else if (hours < 18) setGreeting("Good afternoon.");
    else setGreeting("Good evening.");
  }, []);

  const handlePredict = async () => {
    setPrediction(null);
    setShowTooltip(false);
    setIsLoading(true);
    try {
      const trimmedDescription = String(description).trim();

      if (!trimmedDescription) {
        const randomTooltip =
          "Please provide a description so I can make a prediction! ✏️";
        setTooltipMessage(randomTooltip);
        setShowTooltip(true);
        setIsLoading(false);
        return;
      }

      const extracted = await extract(trimmedDescription);
      setExtractedData(extracted);
      console.log(extracted);

      const validFieldsCount = Object.values(extracted).filter(
        (field) => field !== null && field !== "None"
      ).length;

      if (validFieldsCount < 3) {
        const randomTooltip =
          tooltips[Math.floor(Math.random() * tooltips.length)];
        setTooltipMessage(randomTooltip);
        setShowTooltip(true);
      } else {
        const result = await predict(extracted);
        setPrediction(parseFloat(result[0]).toFixed(2));
      }
    } catch (error) {
      console.error("Error in handlePredict:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = async (input) => {
    setDescription(input);
    setIsLoading(true);
    setShowTooltip(false);
    try {
      const extracted = await extract(input);
      setExtractedData(extracted);
      const result = await predict(extracted);
      setPrediction(parseFloat(result[0]).toFixed(2));
    } catch (error) {
      console.error("Error in handleExampleClick:", error);
    } finally {
      setDescription(input);
      setIsLoading(false);
    }
  };

  const exampleInputs = [
    "An office building with glulam beams",
    "A triple-glazed curtain wall high-rise",
    "A two-storey precast concrete store",
    "A masonry residential complex with RCC substructure",
    "A steel framed warehouse with an asphalt roof",
    "A school with softwood frames and a sloped roof",
    "A library with a green roof and SIPs panels",
    "A clay block and concrete community center",
    "A retail store with masonry bricks and ceramic tiles",
    "A museum with glass panes and steel supports",
  ];

  const getRandomExamples = (arr, num) => {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setRandomExamples(getRandomExamples(exampleInputs, 3));
  };

  const handleDetails = () => {
    navigate("/project", {
      state: {
        extractedData,
        input: description,
        prediction,
      },
    });
  };

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
          <div className="description-container">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onFocus={handleFocus}
              onBlur={() => setIsFocused(false)}
              className="description-textarea"
            />
            {prediction && (
              <div className="details-container">
                <svg
                  className="arrow"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M2 12L14 12L10 8L10 16L14 12Z" />
                </svg>
                <button onClick={handleDetails} className="details-button">
                  See Details
                </button>
              </div>
            )}
          </div>
        </div>
        {isLoading ? (
          <div className="jelly-triangle">
            <div className="jelly-triangle__dot"></div>
            <div className="jelly-triangle__traveler"></div>
          </div>
        ) : (
          <button onClick={handlePredict} className="predict-button">
            Predict
          </button>
        )}
        {showTooltip && <div className="tooltip">{tooltipMessage}</div>}
        {!isLoading && prediction && (
          <div className="prediction-result">
            <div className="dot"></div>
            <pre>
              {prediction} kgCO2e/m<sup>2</sup>
            </pre>
          </div>
        )}

        <div className={`examples ${isFocused ? "show" : ""}`}>
          <h4>Example Inputs:</h4>
          <div className="example-list">
            {randomExamples.map((input, index) => (
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
      <svg width="0" height="0" className="jelly-maker">
        <defs>
          <filter id="uib-jelly-triangle-ooze">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="7.3"
              result="blur"
            ></feGaussianBlur>
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="ooze"
            ></feColorMatrix>
            <feBlend in="SourceGraphic" in2="ooze"></feBlend>
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default QuickView;
