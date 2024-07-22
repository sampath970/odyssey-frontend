import React, { useState } from "react";
import Input from "../../../../components/input/input";
import Button from "../../../../components/button/button";
import "./forms-requested.scss";
import CheckMark from "../../../../public/assets/icons/checkMark.svg";
import Dot from "../../../../public/assets/icons/dot.svg";

const getFileName = (name) =>{
    if(name){
      let formattedName = name.split("/")[1] || name;
      return formattedName;
    }else{
      return name
    }
  }

const FormsRequested = (props) => {
    const { onClose, onFormClose, form } = props;
    const checkedDocuments = form.filter(_forms => _forms.checked)
    return (
        <div className="forms-requested">
            <div className="">
                <div className="">
                    <div className="forms-requested__popup-request-status">
                        <CheckMark className="check-mark" />
                        The request has been sent.
                    </div>
                </div>
            </div>
            <div className="forms-requested__popup-section-three">
                <label className="forms-requested__popup-section-three">
                    Requested Documents:
                </label>
                <div className="forms-requested__popup-form">
                    <ul>
                        {checkedDocuments?.map((document) => (
                            <li key={document.id}>{getFileName(document.qaName)}</li>
                        ))}
                    </ul>
                </div>

                <div className="forms-requested__popup-section">
                    <label className="forms-requested__popup-section">
                        You will be notified once a response is received.
                    </label>
                </div>
                <div className="forms-requested__popup-section_footer">
                    <Button
                        testID="forms-requested-popup-button"
                        buttonClick={onFormClose}
                        btnText="Close"
                        btnTheme="secondary"
                        btnType="rectangle"
                    />
                </div>
            </div>
            {form == true && (
                <div>

                    <Button
                        btnText="Close"
                        btnTheme="primary"
                        btnType="rounded"
                        testID="properties-button"
                        buttonClick={onClose}

                    />
                </div>

            )}

        </div>
    );
};

export default FormsRequested;
