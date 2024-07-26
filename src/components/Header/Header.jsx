import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Header.scss";
import ShareIcon from "@mui/icons-material/Share";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const Header = ({ isSidebarOpen, pageTitle, additionalInfo }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isProjectPage = location.pathname.startsWith("/projects");

  const handleHelpClick = () => {
    navigate("/support");
  };

  return (
    <header className={`header-bar ${isSidebarOpen ? "" : "full-width"}`}>
      <div className="left-section">
        <h1>{pageTitle}</h1>
        <div className="additional-info">{additionalInfo}</div>
      </div>
      <div className="right-section">
        {isProjectPage && (
          <button className="share-project-button">
            <ShareIcon style={{ fontSize: "24px" }} />
          </button>
        )}
        <button className="help-button" onClick={handleHelpClick}>
          <HelpOutlineIcon style={{ fontSize: "24px" }} />
        </button>
      </div>
    </header>
  );
};

export default Header;
