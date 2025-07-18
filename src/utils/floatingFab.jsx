// src/components/FloatingFAB.jsx
import React, { useState } from "react";

const FloatingFAB = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFAB = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="mainopShadow"></div>
      <div className={`fab ${isOpen ? "open" : ""}`}>
        <div className="mainop" onClick={toggleFAB} role="button" tabIndex={0}>
          {/* <i id="addIcon" className="material-icons">
            {isOpen ? "close" : "add"}
          </i> */}
        </div>

        {isOpen && (
          <>
            <div id="forms" className="minifab op5">Forms</div>
            <div id="drawings" className="minifab op4">Drawings</div>
            <div id="slides" className="minifab op3">Slides</div>
            <div id="sheets" className="minifab op2">Sheets</div>
            <div id="docs" className="minifab op1">Docs</div>
          </>
        )}
      </div>
    </>
  );
};

export default FloatingFAB;
