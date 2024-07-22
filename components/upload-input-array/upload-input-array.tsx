import React, { useState } from "react";
import "./upload-input-array.scss";
import Button from "../button/button";
import { IoArrowDownCircle, IoArrowUpCircle } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import Edit from "../../public/assets/icons/edit.svg";
import Delete from "../../public/assets/icons/delete.svg";
import Label, { LabelType, LabelVariant } from "../label/label";

interface UploadInputArrayProps {
  iconType: string;
  label: string;
  errorMsg?: string;
  helperText?: string;
  placeHolder: string;
  items: string[];
  inputDataType?: string;
  displayName?: string;
  onSelectInputType?: (label: string, items: string[]) => void;
  setErrorMsgs?: (msgs: string[]) => void;
  inputStyle?: React.CSSProperties;
  extraInputArrayStyles?: React.CSSProperties;
  extraItemStyles?: React.CSSProperties;
  extraItemWrapperStyles?: React.CSSProperties;
  extraItemArrayWrapperStyles?: React.CSSProperties;
  errorMessageStyle?: React.CSSProperties;
  formHelperText?: any;
  onInputFocus?: () => void;
  errorMsgForAttachmentsNotFilled?: string;
  flow?: string;
}

const UploadInputArray: React.FC<UploadInputArrayProps> = (props) => {
  const { inputStyle = {}, extraInputArrayStyles = {} } = props;
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isEditModeIndex, setIsEditModeIndex] = useState<number>(-1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setInputValue(e.target.value);
    props.setErrorMsgs([]);
  };

  const onAddClick = () => {
    const { label, items, onSelectInputType } = props;
    const newInputValue = inputValue.trim();
    if (newInputValue.length === 0) setError(true);
    if (newInputValue.length > 0) {
      if (isEditMode) {
        const cloneObject = [...items];
        cloneObject.splice(isEditModeIndex, 1, newInputValue);
        onSelectInputType(label, cloneObject);
        setIsEditMode(false);
        setIsEditModeIndex(-1);
      } else {
        const newItemArray = items
          ? [...items, newInputValue]
          : [newInputValue];
        onSelectInputType(label, newItemArray);
      }

      setInputValue("");
    }
  };

  const onRemovePlace = (elementIndex: string) => {
    const { label, items, onSelectInputType } = props;

    if (elementIndex) {
      const id = parseInt(elementIndex, 10);

      if (isEditMode) {
        if (id === isEditModeIndex) {
          onAddClick();
        } else {
          if (id < isEditModeIndex) {
            setIsEditModeIndex(isEditModeIndex - 1);
          }
        }
      }

      const cloneObject = [...items];
      cloneObject.splice(id, 1);
      onSelectInputType(label, cloneObject);
    }
  };

  const onEditPlace = (elementIndex: string) => {
    const { label, items } = props;
    setIsEditMode(true);

    if (elementIndex) {
      const index = parseInt(elementIndex, 10);
      setIsEditModeIndex(index);
      const selectedInput = items[index];
      setInputValue(selectedInput);
    }
  };

  const onSortUp = (elementIndex: string) => {
    const { label, items, onSelectInputType } = props;

    if (elementIndex) {
      const index = parseInt(elementIndex, 10);
      const cloneObject = [...items];
      [cloneObject[index - 1], cloneObject[index]] = [
        cloneObject[index],
        cloneObject[index - 1],
      ];
      onSelectInputType(label, cloneObject);
    }
  };

  const onSortDown = (elementIndex: string) => {
    const { label, items, onSelectInputType } = props;

    if (elementIndex) {
      const index = parseInt(elementIndex, 10);
      const cloneObject = [...items];
      [cloneObject[index + 1], cloneObject[index]] = [
        cloneObject[index],
        cloneObject[index + 1],
      ];
      onSelectInputType(label, cloneObject);
    }
  };

  const {
    iconType,
    label,
    errorMsg,
    helperText = "",
    placeHolder,
    items,
    inputDataType,
    displayName,
    formHelperText = "",
    extraItemStyles = {},
    extraItemWrapperStyles = {},
    extraItemArrayWrapperStyles = {},
    errorMessageStyle = {},
    onInputFocus = () => {},
    errorMsgForAttachmentsNotFilled = "",
    flow = "",
  } = props;

  const errorMsgClass = errorMsg ? " cInputError" : "";
  const errorMsgText = errorMsg || "";

  return (
    <div className="upload-input-array">
      <div className="upload-input-array__wrapper">
        <div
          className={"upload-input-array__input-wrapper" + errorMsgClass}
          style={{ ...extraInputArrayStyles }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              margin: "0 0 12px 0",
            }}
          >
            {helperText && (
              <div className="upload-input-array__helper-block">
                <span className="cHelpIcon" />
                <span className="cHelperText">{helperText}</span>
              </div>
            )}
            {formHelperText && (
              <div className="upload-input-array__helper-block">
                <Label
                  type={LabelType.SubHeader}
                  text={formHelperText}
                  variant={LabelVariant.L2}
                />
              </div>
            )}
          </div>

          <input
            id={label}
            className="upload-input-array__input"
            name={label}
            value={inputValue}
            placeholder={placeHolder}
            type="text"
            data-type={inputDataType}
            onChange={handleChange}
            min="1"
            style={{
              ...inputStyle,
              borderBottom: errorMsgForAttachmentsNotFilled
                ? "1px solid red"
                : error ||
                  (errorMsgForAttachmentsNotFilled !== "" &&
                    flow === "form_table")
                ? "1px solid red"
                : "1px solid transparent",
              border:
                flow === "form_table"
                  ? "unset"
                  : error
                  ? "1px solid red"
                  : "1px solid gray",
            }}
            onFocus={() => {
              onInputFocus();
              setError(false);
            }}
          />

          {error && !errorMsgForAttachmentsNotFilled && (
            <div
              className="upload-input-array__error-msg"
              style={{ ...errorMessageStyle }}
            >
              {errorMsgText}
            </div>
          )}
          <div className="upload-input-array__button-wrapper">
            {!isEditMode ? (
              <Button
                btnText={"Add"}
                buttonClick={onAddClick}
                additionalStyles={{ padding: 0 }}
                btnTheme={flow === "form_table" ? "secondary" : "primary"}
              />
            ) : (
              <Button
                btnText={"Save"}
                btnTheme="questionnaire-primary"
                btnType="rounded"
                buttonClick={onAddClick}
                additionalStyles={{ padding: 0 }}
              />
            )}
          </div>
        </div>
      </div>
      <div
        className="upload-input-array__items"
        style={{ ...extraItemArrayWrapperStyles }}
      >
        {items &&
          items.length > 0 &&
          items.map(function (item, index) {
            return (
              <div
                className="upload-input-array__content-wrapper"
                style={{ ...extraItemWrapperStyles }}
                key={index}
              >
                <div className="upload-input-array__content">
                  <div className="upload-input-array__body">
                    {index + 1 + ". " + item}
                  </div>
                  <div
                    className="upload-input-array__buttons-wrapper"
                    style={{
                      margin: "12px 0",
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "20px",
                      ...extraItemStyles,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                      }}
                    >
                      <IoArrowUpCircle
                        className={
                          index === 0
                            ? "upload-input-array__icon upload-input-array__icon--disabled"
                            : "upload-input-array__icon"
                        }
                        onClick={() => onSortUp(index.toString())}
                      />
                      <IoArrowDownCircle
                        className={
                          index === items.length - 1
                            ? "upload-input-array__icon upload-input-array__icon--disabled"
                            : "upload-input-array__icon"
                        }
                        onClick={() => onSortDown(index.toString())}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                      }}
                    >
                      <Edit
                        className="upload-input-array__icon-edit"
                        onClick={() => onEditPlace(index.toString())}
                      />
                      <MdDelete
                        className="upload-input-array__icon-delete"
                        onClick={() => onRemovePlace(index.toString())}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {errorMsgForAttachmentsNotFilled !== "" && (
        <div className="upload-input-array__attachment-error-msg">
          {errorMsgForAttachmentsNotFilled}
        </div>
      )}
    </div>
  );
};

export default UploadInputArray;
