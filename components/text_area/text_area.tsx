import React, {
  ChangeEvent,
  KeyboardEvent,
  FocusEvent,
  CSSProperties,
} from "react";
import "./text_area.scss"
import Label, { LabelType, LabelVariant } from "../label/label";
interface TextAreaProps {
  value?: string;
  onChangeText?: (text: string) => void;
  handleKeyPress?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  errored?: boolean;
  errorMessage?: string;
  onFocus?: (event: FocusEvent<HTMLTextAreaElement>) => void;
  extraTextAreaStyles?: CSSProperties;
  labelStyle?: CSSProperties;
  placeholder?:string;
  labelType?:any;
  label?:string;
}

const TextArea = (props: TextAreaProps) => {
  const {
    value = "",
    onChangeText = () => {},
    handleKeyPress = () => {},
    errored = false,
    errorMessage = "",
    onFocus = () => {},
    extraTextAreaStyles = {},
    placeholder = "",
    labelType = LabelType.SubHeader,
    label = "",
    labelStyle={}
  } = props;
  return (
    <div className="textarea__wrapper">
      <div className="textarea__label" style={labelStyle}>
          <Label type={labelType} text={label} variant={LabelVariant.L2} />
        </div>
      <textarea
        value={value}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          onChangeText(e.target.value)
        }
        placeholder={placeholder}
        onKeyDown={handleKeyPress}
        rows={5}
        cols={50}
        style={{ border: errored ? "1px solid red" : "", ...extraTextAreaStyles }}
        className="textarea"
        onFocus={onFocus}
      />
      {errored && errorMessage && <p className="textarea__error">{errorMessage}</p>}
    </div>
  );
};

export default TextArea;
