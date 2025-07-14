import React, { useState } from "react";

const Button = ({
  type = "button",
  label,
  onClick,
  className = "",     // base styling passed by user
  hoverClass = "",    // hover styling passed by user
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      type={type}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`w-100 py-2 rounded-3
        ${isHovered ? hoverClass : ""} 
        ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
