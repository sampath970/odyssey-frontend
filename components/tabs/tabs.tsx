import React, { useState } from "react";
import "./tabs.scss";

const Tabs = (props) => {
  
  const { selectedIndex=0, handleChange, additionalStyles = {},additionalListStyles={},additionalWrapperStyle={},onClick,additionalTabStyles={} } = props;
  const handleTabClick = (index,tabProps) =>{
    handleChange(index)
    // tabProps?.onClick();
  }
  return (
    <div style={additionalWrapperStyle}>
      <ul className="tabs-list" style={additionalStyles}>
        {props.children.map((elem, index) => {
          return (
            <li
              style={additionalListStyles}
              key={index}
              className = { index===selectedIndex ? "list-item selected-list-item" : "list-item" }
              onClick={()=>handleTabClick(index,elem.props)}
            >
              {elem?.props?.title}
            </li>
          );
        })}
      </ul>
      <div className="tab" style={additionalTabStyles}>{props.children[selectedIndex]}</div>
    </div>
  );
};

export default Tabs;
