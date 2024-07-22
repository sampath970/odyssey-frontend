import React from 'react'
import ErrorCross from "../../public/assets/icons/round-error.svg";
import Label, { LabelType, LabelVariant } from '../label/label';
import Button from '../button/button';
import "./unauthorized-popup.scss"
const UnAuthorisedPopup = ({errorHeaderText,handleUnAuthorizedClose}) => {
  return (
    <div className="unauthorized-popup">
            <div className="unauthorized-popup__header">
              <ErrorCross height="50px" width="50px"/>
              <Label
                type={LabelType.Body}
                text={errorHeaderText}
                variant={LabelVariant.L4}
              />
            </div>
            <div className="unauthorized-popup__text">
              <Label
                type={LabelType.Header}
                text={"You are not authorized to perform this action"}
                variant={LabelVariant.L2}
              />
            </div>
            <Button
              btnText="OK"
              btnTheme="primary"
              btnType="rounded"
              testID="tenants-button"
              additionalStyles={{padding:0}}
              buttonClick={handleUnAuthorizedClose}
            />
          </div>
  )
}

export default UnAuthorisedPopup;
