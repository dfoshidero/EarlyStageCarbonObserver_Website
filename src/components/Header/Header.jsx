import React from "react";
import { useLocation } from "react-router-dom";
import "./Header.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShareIcon from "@mui/icons-material/Share";

const Header = ({ isSidebarOpen, pageTitle, additionalInfo, userName }) => {
  const location = useLocation();

  // Check if the current path is a project page
  const isProjectPage = location.pathname.startsWith("/projects");

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
            <span>Share Project</span>
          </button>
        )}
        <div className="user-profile">
          <button className="user-profile-button">
            <AccountCircleIcon style={{ fontSize: "32px" }} />
          </button>
          <div className="user-menu">
            <a href="/profile">Profile</a>
            <a href="/logout">Logout</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
