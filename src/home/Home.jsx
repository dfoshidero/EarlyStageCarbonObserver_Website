import React, { useState } from "react";
import AnimatedText from "../components/AnimatedText/AnimatedText";
import { FaArrowRight } from "react-icons/fa";
import emailjs from "emailjs-com";
import "./HomePage.scss";

const examples = [
  {
    text: 'A triple-glazed curtain wall facade with pile foundations and steel supports."',
    carbon: "3102.74 kgCO2e/sq.m",
  },
  {
    text: "A timber-framed house with a green roof and sheep's wool insulation.\"",
    carbon: "230.43 kgCO2e/sq.m",
  },
  {
    text: 'A 15-storey high-rise with a reinforced concrete frame and masonry curtain wall, rising tall."',
    carbon: "1528.82 kgCO2e/sq.m",
  },
  {
    text: 'A prefabricated modular building with steel framing and SIP panels, for quick assembly."',
    carbon: "2385.99 kgCO2e/sq.m",
  },
  {
    text: 'A clay or mud building with thick masonry block walls, rooted in vernacular tradition."',
    carbon: "496.61 kgCO2e/sq.m",
  },
];

const HomePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_EMAILJS_USER_ID
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setEmailSent(true);
          setLoading(false);
        },
        (error) => {
          console.log("FAILED...", error);
          setLoading(false);
          alert("Failed to send email.");
        }
      );

    setFormData({
      name: "",
      email: "",
      message: "",
    });
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
            sustainable outcomes. ECO is trained on 150,000 synthetically generated buildings,
            covering a wide range of constructions and sizes,
            and exists as an elegant means of providing realistic
            carbon grounding to early design concepts. Using machine learning
            and natural language feature extraction, ECO translates initial
            design descriptions into predictions of embodied carbon footprints.
            <br />
            <br />
            This tool provides architects and designers with immediate feedback
            on the environmental implications of their design choices, promoting
            iteration towards sustainable practices.
          </p>
        </div>
        <div className="contact-form">
          <h3>Collaborate!</h3>
          {emailSent ? (
            <p className="centered-message">
              Your email was sent successfully.
            </p>
          ) : loading ? (
            <p className="centered-message">Loading...</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              />
              <button type="submit">Send</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
