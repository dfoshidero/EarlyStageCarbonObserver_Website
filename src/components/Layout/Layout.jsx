import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Layout.scss";

const Layout = ({ children }) => {
  return (
    <div className="app">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main-content">{children}</div>
    </div>
  );
};

export default Layout;
