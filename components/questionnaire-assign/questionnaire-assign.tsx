"use client";
import React, { useEffect, useState } from "react";
import Form from "../../public/assets/icons/pdf.svg";
import "./questionnaire-assign.scss";
import Button from "../button/button";
import Checked from "../../public/assets/icons/checked.svg"
import Remove from "../../public/assets/icons/blank-check-box.svg"
import QuestionnaireAdapter from "../../services/adapters/questionnaire-adapter";

const QuestionnaireAssign = (props) => {
  const { userInfo,handleAssignQuestion,currentForm,setCurrentForm } = props;
  const [forms, setForms] = useState([]);
  const AssignButton = {
    paddingTop: "0rem",
    paddingRight: "0rem",
    paddingBottom: "0rem",
    paddingLeft: "0rem",
  };
  useEffect(() => {
    async function fetchForms() {
      let data = await QuestionnaireAdapter.getListingsByPropertyManagerID(
        userInfo
      );
      if (data) {
        console.log(data)
        setForms(data);
      }
    }
    fetchForms();
  }, []);
  const getFileName = (name) =>{
    if(name){
      let formattedName = name.split("/")[1] || name;
      return formattedName;
    }else{
      return name
    }
  }
  const toggleChecked = (id) => {
    const newForms = forms && forms.map((_form) => ({ ..._form }));
    newForms.forEach((_form) => {
      if (_form.id !== id) {
        _form.checked = false;
      } else {
        _form.checked = !_form.checked;
      }
    });
    let selectedForm = newForms.filter(_form=>_form.checked) === undefined ? "" : newForms.filter(_form=>_form.checked);
    setCurrentForm(selectedForm[0]?.id || "")
    setForms(newForms);
  };
  return (
    <fieldset className="questionnaire-assign__wrapper">
      <legend className="questionnaire-assign__header">
        Forms ready to assign
      </legend>
      <div className="questionnaire-assign__form">
        <ul className="questionnaire-assign__form-list">
          {forms &&
            forms.map((_forms,index) => (
              <li key={index} className="questionnaire-assign__form-list-item" onClick={()=>toggleChecked(_forms.id)}>
                <Form className="questionnaire-assign__form-icon" />
                <label className="questionnaire-assign__form-name">{getFileName(_forms.name)}</label>
                {_forms?.checked === true ? (
                        <Checked
                          className="checked-icon"
                          onClick={() => toggleChecked(_forms.id)}
                        />
                      ) : (
                        <Remove
                          className="remove-icon"
                          onClick={() => toggleChecked(_forms.id)}
                        />
                      )}
              </li>
            ))}
        </ul>
        <Button
          btnText={"Assign"}
          buttonClick={handleAssignQuestion}
          btnTheme="primary"
          additionalStyles={AssignButton}
          buttonStatus={currentForm === ""}
        />
      </div>
    </fieldset>
  );
};

export default QuestionnaireAssign;
