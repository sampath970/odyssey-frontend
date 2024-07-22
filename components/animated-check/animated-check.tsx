import React from 'react';
import Check from "../../public/assets/icons/animated-check.svg";
import "./animated-check.scss";

const AnimatedCheck: React.FC = () => {
  return (
    <div className="main-container">
      <div className="check-container">
        <div className="check-background">
          <Check />
        </div>
        <div className="check-shadow"></div>
      </div>
    </div>
  );
}

export default AnimatedCheck;
