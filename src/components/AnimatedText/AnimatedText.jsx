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
  text-align: left; /* Justify text to the left */
  word-wrap: break-word; /* Allow long text to wrap */
  max-width: 90%; /* Limit the width to prevent overflow */
  white-space: normal; /* Allow text to wrap normally */
  opacity: 0.8;

  /* Base font size */
  font-size: 32px;

  /* Media queries for responsive font sizes */
  @media (min-width: 576px) and (min-height: 576px) {
    font-size: 30px; /* 36px at 576px */
  }

  @media (min-width: 768px) and (min-height: 768px) {
    font-size: 36px; /* 40px at 768px */
  }

  @media (min-width: 992px) and (min-height: 992px) {
    font-size: 40px; /* 45px at 992px */
  }

  @media (min-width: 1200px) and (min-height: 1200px) {
    font-size: 50px; /* 50px at 1200px */
  }
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
