import React from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";

const Card = ({ id, title, description, image, buttonLabel, buttonLink }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(buttonLink);
  };

  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
        <button className="card-button" onClick={handleClick}>
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default Card;
