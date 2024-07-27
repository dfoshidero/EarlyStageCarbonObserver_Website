import React from "react";
import { TypeAnimation } from "react-type-animation";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  pointer-events: none;
  color: #888;
  opacity: 0.8;
  font-size: 18px;

  @media (min-width: 992px) and (min-height: 992px) {
    font-size: 20px;
  }

  @media (min-width: 1200px) and (min-height: 1200px) {
    font-size: 22px;
  }
`;

// Function to shuffle an array
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const EcoAnimatedText = ({ examples }) => {
  // Shuffle examples array
  const shuffledExamples = shuffleArray(examples);
  const sequence = shuffledExamples.flatMap((text) => [
    1000,
    text,
    5000,
    "",
    1000,
  ]);

  return (
    <Container>
      <TypeAnimation
        cursor={true}
        sequence={sequence}
        wrapper="div"
        repeat={Infinity}
        speed={65}
        deletionSpeed={70}
      />
    </Container>
  );
};

export default EcoAnimatedText;
