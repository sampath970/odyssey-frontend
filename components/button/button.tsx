"use client";
import React from "react";
import classNames from "classnames";
import "./button.scss";

interface ButtonProps {
  btnText: any;
  btnType?: "rounded" | "outline" | "rectangle" | "success" | "upload-page"|"questionnaire"|"questionnaire-card"|"questionnaire-primary" | "task-table-success"| "task-table-primary"| "questionnaire-task-table-primary"| "users-task-table-success";
  btnTheme?:
    | "primary"
    | "secondary"
    | "search"
    | "upload-page"
    | "users-page"
    | "users-page-secondary"
    | "questionnaire"
    | "questionnaire-card"
    | "questionnaire-primary"
    | "task-table-primary"
    | "users-page-primary"
    | "users-page-signed"
    | "task-table-success"
    | "questionnaire-task-table-primary"
    | "users-task-table-success"
  buttonClick: (e) => void;
  testID?: string;
  buttonStatus?: boolean;
  hide?: boolean;
  additionalStyles?: any;
  id?:any
}

const DefaultProps: ButtonProps = {
  btnType: "rectangle",
  btnTheme: "primary",
  btnText: "",
  buttonClick: () => {},
  testID: "",
  
};

const Button: React.FC<ButtonProps> = ({
  btnText,
  btnType = DefaultProps.btnType,
  btnTheme = DefaultProps.btnTheme,
  buttonClick,
  buttonStatus,
  testID,
  hide,
  id,
  additionalStyles,
}) => {
  const btnClass = classNames({
    btn: true,
    success: btnType === "success",
    rounded: btnType === "rounded",
    outline: btnType === "outline",
    rectangle: btnType === "rectangle",
    [`btn-${btnTheme}`]: btnTheme,
    opacity: buttonStatus,
  });

  return (
    <div className="btn" style={{ ...additionalStyles }}>
      <button
      id={id}
        disabled={buttonStatus}
        data-testid={testID}
        className={"buttonEffects "+btnClass}
        onClick={buttonClick}>
        {btnText}
      </button>
    </div>
  );
};

export default Button;
