import React from "react";
import "./Card.css";

const Card = ({ title, location, description }) => {
  return (
    <div className="rec_card">
      <h5>{title}</h5>
      <p>{description}</p>
      <div className="view_wrapper">
        <div className="location">
          <i className="fas fa-location-arrow"></i>
          {location}
        </div>
        <div className="view">View Application</div>
      </div>
    </div>
  );
};

export default Card;
