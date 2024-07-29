import React from "react";
import "./Card.scss";

const Card = ({ title, data }) => {
  return (
    <div className="card">
      <div className="title">
        <span>{/* Add your SVG or other content here */}</span>
        <p className="title-text">{title}</p>
      </div>
      <div className="data">
        <p>{data}</p>
      </div>
    </div>
  );
};

export default Card;
