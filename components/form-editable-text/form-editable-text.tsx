import React, { useState, ChangeEvent, MouseEventHandler } from "react";
import { useRef } from "react";
import classNames from "classnames";
import "./form-editable-text.scss";

interface FormEditableTextProps {
  value: string;
  setValue: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    action: "edit" | "save"
  ) => void;
  name: string;
  showHighlighting?: boolean;
  fieldWidth: string;
}

const FormEditableText: React.FC<FormEditableTextProps> = (props) => {
  const { value, setValue, name, showHighlighting = false, fieldWidth } = props;
  const ref = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [initialValue, setInitialValue] = useState(value);

  const spanClass = classNames({
    answered: true,
    highlighted: showHighlighting && !isEditing,
  });

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    // When the input text is changed, propagate the changes to the parent component as edit
    setValue(e, "edit");
  };

  const onKeyDown = (e: any) => {
    if (e.key === "Enter" || e.key === "Escape") {
      e.target.blur();
    }
  };

  const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
    // When the input component is blurred, trigger save to the parent component
    setValue(e, "save");
    setIsEditing(false);
  };

  const handleTextClick: MouseEventHandler<HTMLSpanElement> = (e) => {
    setIsEditing(true);
    setTimeout(function (x) {
      ref?.current?.focus();
    }, 0);
  };

  return (
    <span>
      {isEditing ? (
        <input
          ref={ref}
          className="form-editable__input"
          type="text"
          aria-label="Field name"
          value={value}
          onChange={handleTextChange}
          onBlur={onBlur}
          name={name}
          onKeyDown={onKeyDown}
          style={{ width: fieldWidth }}
        />
      ) : (
        <div className="form-editable__span-wrapper">
          <span
            className={spanClass}
            data-name={name}
            onClick={handleTextClick}
            style={{ width: fieldWidth }}>
            {value}
          </span>
        </div>
      )}
    </span>
  );
};

export default FormEditableText;
