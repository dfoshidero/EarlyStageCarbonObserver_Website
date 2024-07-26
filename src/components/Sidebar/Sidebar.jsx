import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaYoutube,
  FaExternalLinkAlt,
} from "react-icons/fa";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { ReactComponent as GitHubIcon } from "../../assets/images/github.svg";
import "./Sidebar.scss";

const Sidebar = ({ isOpen, toggleSidebar, isOverlay }) => {
  const location = useLocation();
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <div className="sidebar-wrapper">
      <div>
        <button
          className={`open-sidebar-button ${isOpen ? "" : "visible"}`}
          onClick={toggleSidebar}
        >
          <MenuIcon style={{ color: "#000", fontSize: "20px" }} />
        </button>
        <div
          className={`sidebar ${isOpen ? "open" : "closed"} ${
            isOverlay ? "overlay" : ""
          }`}
        >
          <div className="sidebar-header">
            <button className="close-sidebar-button" onClick={toggleSidebar}>
              <CloseIcon style={{ color: "#000", fontSize: "20px" }} />
            </button>
          </div>
          <div className="sidebar-icon">
            <div className="logo-container">
              <img
                src="/assets/images/logo-full-grey-nbg.svg"
                alt="Logo"
                className="logo-image"
              />
            </div>
          </div>
          <div className="sidebar-nav">
            <Link className={`sidebar-link ${isActive("/")}`} to="/">
              ECO
            </Link>
            <Link
              className={`sidebar-link ${isActive("/quickview")}`}
              to="/quickview"
            >
              Insight
            </Link>
            <Link
              className={`sidebar-link ${isActive("/support")}`}
              to="/support"
            >
              More
            </Link>
          </div>

          <div className="sidebar-socials">
            <ul className="social-icons">
              <li className="icon-content">
                <a
                  href="https://linkedin.com/"
                  aria-label="LinkedIn"
                  data-social="linkedin"
                >
                  <FaLinkedin />
                  <div className="tooltip">LinkedIn</div>
                </a>
                <div className="filled"></div>
              </li>
              <li className="icon-content">
                <a
                  href="https://github.com/"
                  aria-label="GitHub"
                  data-social="github"
                >
                  <FaGithub />
                  <div className="tooltip">GitHub</div>
                </a>
                <div className="filled"></div>
              </li>
              <li className="icon-content">
                <a
                  href="https://www.instagram.com/"
                  aria-label="Instagram"
                  data-social="instagram"
                >
                  <FaInstagram />
                  <div className="tooltip">Instagram</div>
                </a>
                <div className="filled"></div>
              </li>
              <li className="icon-content">
                <a
                  href="https://youtube.com/"
                  aria-label="Youtube"
                  data-social="youtube"
                >
                  <FaYoutube />
                  <div className="tooltip">YouTube</div>
                </a>
                <div className="filled"></div>
              </li>
            </ul>
          </div>

          <div className="copyright">
            © 2024 Daniel Favour Oshidero.
            <br />
            <a
              href="https://www.dfvro.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.dfvro.com
            </a>
          </div>

          {windowHeight > 600 && ( // Adjust this threshold as needed
            <div className="sidebar-acknowledgements">
              <div className="acknowledgements-section">
                <h2>Acknowledgements</h2>
                <div className="acknowledgement-single">
                  <h3>Supervisors</h3>
                  <ul>
                    <li>Prof. David Coley</li>
                    <li>Prof. Michael Tipping</li>
                  </ul>
                </div>
                <div className="acknowledgement-single">
                  <h3>Drawings</h3>
                  <ul>
                    <li>Priyesh Pandaravalapil</li>
                    <li>Namida Narathasajan</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div className="sidebar-footer">
            <a
              href="https://github.com/dfoshidero/ECO-Insight"
              target="_blank"
              rel="noopener noreferrer"
              className="github-link"
            >
              <GitHubIcon style={{ marginRight: "8px", marginBottom: "3px" }} />
              <span>
                View Code Repository
                <FaExternalLinkAlt
                  style={{
                    height: "0.9em",
                    marginRight: "8px",
                    marginBottom: "-1.5px",
                  }}
                />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
