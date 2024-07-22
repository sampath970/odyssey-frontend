import React, { useEffect, useRef, useState, ChangeEvent } from "react";
import "./editable-text.scss";

interface EditableTextProps {
  initialText: string;
  onSave: (text: string) => void;
  setQuestionTitleError?: (error: boolean) => void;
}

const EditableText: React.FC<EditableTextProps> = ({ initialText, onSave, setQuestionTitleError }) => {
  const [text, setText] = useState(initialText);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    try {
      setText(event?.target?.value);
      onSave(event?.target?.value);
      if (setQuestionTitleError) {
        setQuestionTitleError(false);
      }
    } catch (ex) {
      console.error("Error at handleChange", ex);
    }
  };

  return (
    <div className="editable-text">
      <input
        placeholder="Enter title"
        ref={inputRef}
        type="text"
        className="editable-text__input"
        value={text}
        onChange={handleChange}
      />
    </div>
  );
};

export default EditableText;
