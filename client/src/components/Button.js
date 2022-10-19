import React from "react"
import "../styling/components.css"

const Button = ({ onClick, showClicked, prompt }) => {
  return (
    <button
      id="blue-button"
      onClick={onClick}
    >
      {showClicked ? "Unlike" : prompt}
    </button>
  );
};

export default Button;
