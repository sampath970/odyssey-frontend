import React from "react";
import "./radio.scss";

const Radio = (props) => {
  console.log(props)
  return (
    // {}
      <label htmlFor={props.label} className="radio__label">
        <input
          className="radio__input"
          type="radio"
          id={props.label}
          name={props.name}
          checked={props.value===props.label? props.value: ""}
          onChange={(e) => props.onChange(e)}
        />
        <span className="radio__span">{props.label}</span>
      </label>
  );
};

export default Radio;
