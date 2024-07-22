import React, {
  FC,
  useEffect,
  useState,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import "./input.scss";
import { formatPhoneNumber } from "../../utils/string-utils";
import Label, {
  LabelType,
  LabelVariant,
} from "../../components/label/label";

interface InputProps {
  type:
    | "text"
    | "number"
    | "email"
    | "password"
    | "file"
    | "tel"
    | "phone"
    | "fax"
    | "ssn_number";
  label?: string;
  value: string | number | any;
  name: string;
  placeholder: string;
  dataTestId?: string;
  pattern?: string;
  errorText?: any;
  errored?: boolean;
  disabled?: boolean;
  inputStyle?: React.CSSProperties;
  wrapperStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  propagateEvent?: boolean;
  onChange?: (value: string | number) => void;
  setPhoneNumber?: (value: string | number) => void;
  phoneNumber?: any;
  setTelNumber?: (value: string | number) => void;
  telNumber?: any;
  setFaxNumber?: (value: string | number) => void;
  faxNumber?: any;
  setSsnNumber?: (value: string | number) => void;
  ssnNumber?: any;
  onBlur?: () => void;
  onFocus?: () => void;
  min?: any;
  onKeyDown?: (e: KeyboardEvent) => void;
  labelType?:any;
}

const Input: FC<InputProps> = ({
  type,
  label,
  value,
  name,
  placeholder,
  errorText,
  disabled,
  errored,
  onChange,
  onBlur,
  onFocus = () => {},
  onKeyDown,
  min,
  inputStyle,
  wrapperStyle,
  labelStyle,
  dataTestId,
  propagateEvent,
  phoneNumber,
  setPhoneNumber,
  telNumber,
  setTelNumber,
  faxNumber,
  setFaxNumber,
  ssnNumber,
  setSsnNumber,
  labelType = LabelType.Header
}) => {
  const [showError, setShowError] = useState(errorText ? true : false);
  const [inputClassName, setInputClassName] = useState("input");

  useEffect(() => {
    if (errored) {
      setInputClassName("input input--errored");
    } else {
      setInputClassName("input");
    }
  }, [errored]);

  useEffect(() => {
    if (errorText) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  }, [value, errorText]);

  const validateText = (_str: string): boolean => {
    try {
      /* Allows only alphabets */
      var textRegex = /^[a-zA-Z 0-9 .]+$/;
      const _testResult = textRegex.test(_str);
      if (_testResult) {
        setShowError(false);
      } else {
        setShowError(true);
      }
      return true;
    } catch (ex) {
      console.error("Error at validateText");
      return false;
    }
  };

  const validateEmail = (_str: string): boolean => {
    try {
      var textRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      const _testResult = textRegex.test(_str);
      if (_testResult) {
        setShowError(false);
      } else {
        setShowError(true);
      }
      return true;
    } catch (ex) {
      console.error("Error at validateEmail");
      return false;
    }
  };

  const validateNumber = (_number: string): boolean => {
    try {
      var textRegex = /^-?\d+$/;
      const _testResult = textRegex.test(_number);
      if (_testResult) {
        setShowError(false);
      } else {
        setShowError(true);
      }
      return true;
    } catch (ex) {
      console.error("Error at validateNumber");
      return false;
    }
  };

  const handlePhoneInput = (phoneNumber: string): void => {
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
    setPhoneNumber(formattedPhoneNumber);
  };

  const handleTelInput = (phoneNumber: string): void => {
    const formattedTelNumber = formatTelNumber(phoneNumber);
    setTelNumber(formattedTelNumber);
  };

  const handleFaxInput = (faxNumber: string): void => {
    const formattedFaxNumber = formatPhoneNumber(faxNumber);
    setFaxNumber(formattedFaxNumber);
  };

  const handleSsnInput = (ssnNumber: string): void => {
    const formattedSsnNumber = formatSsnNumber(ssnNumber);
    setSsnNumber(formattedSsnNumber);
  };

  const formatTelNumber = (value: string): string => {
    if (!value) return value;
    const telNumber = value.replace(/[^\d]/g, "");
    const telNumberLength = telNumber.length;
    if (telNumberLength >= 11 && telNumber.startsWith("+")) {
      return telNumber;
    }
    if (telNumberLength < 10) {
      return telNumber;
    }

    return `+${telNumber.slice(0, 10)}`;
  };

  const formatFaxNumber = (faxNumber: string): string => {
    const numericFaxNumber = faxNumber?.replace(/\D/g, "");
    if (numericFaxNumber.length >= 7) {
      const formattedFaxNumber =
        numericFaxNumber.substring(0, 3) +
        "-" +
        numericFaxNumber.substring(3, 7);
      return formattedFaxNumber;
    } else {
      console.log(faxNumber);
      return faxNumber;
    }
  };

  const formatSsnNumber = (ssnNumber: string): string => {
    const numericSsnNumber = ssnNumber?.replace(/\D/g, "");
    if (numericSsnNumber.length > 9) {
      const formattedSsnNumber =
        numericSsnNumber.substring(0, 3) +
        "-" +
        numericSsnNumber.substring(3, 5) +
        "-" +
        numericSsnNumber.substring(5, 9);
      return formattedSsnNumber;
    } else {
      console.log(ssnNumber);
      return ssnNumber;
    }
  };

  const handleInputChange = (e) => {
    try {
      if (propagateEvent) {
        onChange(e);
      }
      console.log("type", type);
      let _text = e.currentTarget.value;
      if (type == "text" && validateText(_text)) {
        onChange(_text);
      } else if (type == "email" && validateEmail(_text)) {
        onChange(_text);
      } else if (type == "number" && validateNumber(_text)) {
        onChange(_text);
      } else if (type == "file") {
        onChange(e);
      } else if (type == "tel") {
        handleTelInput(_text);
        setTelNumber(_text);
      } else if (type == "phone") {
        handlePhoneInput(_text);
        setPhoneNumber(_text);
      } else if (type == "ssn_number") {
        handleSsnInput(_text);
        setSsnNumber(_text);
      } else if (type == "fax") {
        handleFaxInput(_text);
        setFaxNumber(_text);
      } else {
        onChange(_text);
      }
    } catch (ex) {
      console.error("Error at handleInputChange");
    }
  };

  return (
    <div className="input-wrapper" style={wrapperStyle}>
      <div className="input__label" style={labelStyle}>
        <Label type={labelType} text={label} variant={LabelVariant.L2} />
      </div>
      <input
        className={inputClassName}
        type={type}
        id={label}
        min={min}
        value={
          type === "phone"
            ? formatPhoneNumber(phoneNumber)
            : type === "tel"
            ? formatTelNumber(telNumber)
            : type === "fax"
            ? formatPhoneNumber(faxNumber)
            : type === "ssn_number"
            ? formatSsnNumber(ssnNumber)
            : value
        }
        name={name}
        placeholder={placeholder}
        onChange={handleInputChange}
        disabled={disabled}
        style={inputStyle}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        data-testid={dataTestId}
        autoComplete="off"
      />
      {showError && errorText && <p className="error">{errorText}</p>}
    </div>
  );
};

export default Input;
