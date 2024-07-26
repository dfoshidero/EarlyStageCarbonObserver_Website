import React from "react";
import AnimatedText from "../components/AnimatedText/AnimatedText";
import { FaArrowRight, FaExternalLinkAlt } from "react-icons/fa";
import "./HomePage.scss";


const examples = [
  {
    text: 'A triple-glazed curtain wall facade with pile foundations and steel supports, covering 4000 square metres."',
    carbon: "3102.74 kgCO2e/sq.m",
  },
  {
    text: 'A timber-framed building with a green roof and sheep\'s wool insulation."',
    carbon: "230.43 kgCO2e/sq.m",
  },
  {
    text: 'A 15-storey high-rise with a reinforced concrete frame and masonry curtain wall, rising tall."',
    carbon: "1528.82 kgCO2e/sq.m",
  },
  {
    text: 'A prefabricated modular building with steel framing and SIP panels, for quick assembly. With fiber cement and composite materials."',
    carbon: "2385.99 kgCO2e/sq.m",
  },
  {
    text: 'A clay or mud building with thick masonry block walls, rooted in vernacular tradition."',
    carbon: "496.61 kgCO2e/sq.m",
  },
];

const HomePage = () => {
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
      </header>

      <div className="middle">
        <section className="animated-text-container">
          <AnimatedText examples={examples} />
        </section>
      </div>

        <div className="description-contact">
          <div className="project-description">
            <h3>About</h3>
            <p className="description-text">
              ECO Insight (Early-stage Carbon Observer) is a tool designed to
              bridge the gap between early-stage architectural design and
              sustainable outcomes. ECO is trained on 150,000 synthetic
              datapoints, and exists as an elegant means of providing realistic
              carbon grounding to early design concepts. Using machine learning
              and natural language feature extraction, ECO translates initial
              design descriptions into predictions of embodied carbon
              footprints.
            </p>
            <p>
              This tool provides architects and designers with immediate
              feedback on the environmental implications of their design
              choices, promoting iteration towards sustainable practices.
            </p>
          </div>
          <div className="contact-form">
            <h3>
                Collaborate!
            </h3>
            <form>
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="Your Message" required></textarea>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
  );
};

export default HomePage;
