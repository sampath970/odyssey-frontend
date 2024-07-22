import React, { useState, ReactNode } from "react";
import "./add-field.scss";
import Modal from "../modal/modal";
import Input from "../input/input";
import Button from "../button/button";

interface AddFieldProps {
  userInfo: UserInfoType;
  title: string;
  setFieldLabel: React.Dispatch<React.SetStateAction<string>>;
  setFieldCode: React.Dispatch<React.SetStateAction<string>>;
  fieldLabel: string;
  fieldCode: string;
  setAddFieldModal: React.Dispatch<React.SetStateAction<boolean>>;
  addFieldModal: boolean;
  addField: () => void;
  fieldCodeError: boolean;
  fieldLabelError: boolean;
  combinationError: boolean;
  flow?:string
}

interface UserInfoType {
 
}

const AddField: React.FC<AddFieldProps> = (props) => {
  const {
    userInfo,
    title,
    setFieldLabel,
    setFieldCode,
    fieldLabel,
    fieldCode,
    setAddFieldModal,
    addFieldModal,
    addField,
    fieldCodeError,
    fieldLabelError,
    combinationError,
  } = props;

  const handleFieldLabel = (text: string): void => {
    try {
      setFieldLabel(text);
    } catch (ex) {
      console.error("Error at handleFieldLabel");
    }
  };

  const handleFieldCode = (text: string): void => {
    try {
      setFieldCode(text);
    } catch (ex) {
      console.error("Error at handleFieldCode");
    }
  };

  const AddFieldButtonStyles: React.CSSProperties = {
    paddingTop: "0rem",
    paddingRight: "0rem",
    paddingBottom: "0rem",
    paddingLeft: "0rem",
  };

  return (
    <>
      <div className="add-field__card" onClick={() => setAddFieldModal(true)}>
        <Button
          btnText={`+ ${title ? title : "Add more"}`}
          buttonClick={() => setAddFieldModal(false)}
          btnTheme="users-page-secondary"
          additionalStyles={AddFieldButtonStyles}
        />
      </div>
      {addFieldModal && (
        <Modal
          title={<h6>Add field</h6>}
          isOpen={addFieldModal}
          showCloseButton={true}
          setOn={() => setAddFieldModal(false)}
        >
          <div className="add-field__modal">
            <Input
              type="text"
              label="Field name"
              value={fieldLabel}
              name="fieldName"
              placeholder="Field Name"
              onChange={handleFieldLabel}
            />
            <Input
              type="text"
              label="Field code"
              value={fieldCode}
              name="fieldCode"
              placeholder="FIELD_CODE"
              onChange={handleFieldCode}
            />
            <div className="add-field__error">
              <span>{fieldLabelError && "Field label cannot be empty"}</span>
              <span>
                {fieldCodeError &&
                  "Field code should contain only uppercase letters and underscores"}
              </span>
              <span>
                {combinationError &&
                  "Code or label already exists, Please use a different code or label"}
              </span>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AddField;
