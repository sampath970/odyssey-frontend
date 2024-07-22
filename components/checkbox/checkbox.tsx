import React, { ChangeEvent } from "react";
import "./checkbox.scss";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange, name }) => {
  return (
    <div className="checkboxes__item">
      <label className="checkbox style-c">
        <input
          type="checkbox"
          name={name || ""}
          onChange={onChange}
          checked={checked}
        />
        <div className="checkbox__checkmark"></div>
        <div className="checkbox__body">{label}</div>
      </label>
    </div>
  );
};

export default Checkbox;
