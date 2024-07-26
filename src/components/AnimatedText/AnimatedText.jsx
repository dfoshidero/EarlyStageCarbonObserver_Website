import React from "react";
import { TypeAnimation } from "react-type-animation";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  width: 100%;
`;

const Wrapper = styled.div`
  font-size: 4vmin; /* Responsive font size based on viewport width */
  text-align: left; /* Justify text to the left */
  word-wrap: break-word; /* Allow long text to wrap */
  max-width: 90%; /* Limit the width to prevent overflow */
  white-space: normal; /* Allow text to wrap normally */
  opacity: 0.8;
  
`;

const AnimatedText = ({ examples }) => {
  const sequence = examples.flatMap(({ text }) => [
    2000, // Wait 2 seconds with blinking cursor
    text,
    5000, // Show text for 5 seconds
    "", // Clear text
    2000, // Wait 2 seconds with blinking cursor
  ]);

  return (
    <Container>
      <Wrapper>
        <TypeAnimation
          cursor={true}
          sequence={sequence}
          wrapper="div"
          repeat={Infinity}
          speed={43}
          deletionSpeed={55}
        />
      </Wrapper>
    </Container>
  );
};

export default AnimatedText;
