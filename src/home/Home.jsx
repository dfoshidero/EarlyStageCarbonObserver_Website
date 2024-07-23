import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HomePage.scss";
import { FaArrowRight, FaExternalLinkAlt } from "react-icons/fa"; // Import the icons

const examples = [
  {
    text: "A triple glazed curtain wall facade construction with concrete pile foundations and steel supports. The building area is approx 4000 square metres, for 80 users.",
    carbon: "450 kgCO2e/sq.m",
  },
  {
    text: "A timber-framed structure using natural insulation materials such as sheep's wool.",
    carbon: "150 kgCO2e/sq.m",
  },
  {
    text: "A 15 storey high-rise residential building with a reinforced concrete frame and masonry curtain wall.",
    carbon: "700 kgCO2e/sq.m",
  },
  {
    text: "A prefabricated modular building with steel framing and SIP panels. The composite panels are designed for quick assembly, integrating materials like fiber cement and other composites.",
    carbon: "350 kgCO2e/sq.m",
  },
  {
    text: "A clay or mud building featuring thick, masonry block walls.",
    carbon: "50 kgCO2e/sq.m",
  },
];

const HomePage = () => {
  const settings = {
    dots: false,
    infinite: true,
    variableWidth: true,
    speed: 15000,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    ltr: false,
  };

  return (
    <div className="home-page">
      <header className="header">
        <h1 className="title">
          HEY <span className="eco-text">ECO</span>
          <img src="/assets/images/eco.svg" alt="Eco" className="eco-image" />I
          AM DESIGNING...
        </h1>
        <div className="try-button-container">
          <a className="try-button" href="/quickview">
            TRY IT OUT <FaArrowRight className="enter-icon" />
          </a>
        </div>
        <img
          src="/assets/images/arch-bg.svg"
          alt="Background"
          className="background-image"
        />
      </header>
      <section className="carousel-container">
        <Slider {...settings}>
          {examples.map((example, index) => (
            <div key={index} className="example">
              <p className="text">{example.text}</p>
              <div className="carbon response">
                <img
                  src="/assets/images/logo-head-nbg.svg"
                  alt="logo"
                  className="response-logo"
                />
                <p className="carbon-text">{example.carbon}</p>
              </div>
            </div>
          ))}
        </Slider>
        <div className="description-contact">
          <div className="project-description">
            <h3>About</h3>
            <p className="description-text">
              ECO Insight (Early-stage Carbon Observer) is a tool designed to
              bridge the gap between early-stage architectural design and
              sustainable outcomes. ECO is trained on 150,000 synthetic
              datapoints, and exists as an elegant means of providing realistic
              carbon grounding to early design concepts. Using machine learning
              and natural language feature extraction, ECO translates initial design
              descriptions into predictions of embodied carbon footprints.
            </p>
            <p>
              This tool provides architects and designers with immediate
              feedback on the environmental implications of their design
              choices, promoting iteration towards sustainable
              practices.
            </p>
          </div>
          <div className="contact-form">
            <h3>
              <a
                className="devlink"
                href="https://www.linkedin.com/in/favourdo/"
              >
                Contact Dev <FaExternalLinkAlt className="link-icon" />
              </a>
            </h3>
            <form>
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="Your Message" required></textarea>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
