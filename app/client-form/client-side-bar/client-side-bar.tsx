"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./client-side-bar.scss";
import Circle from "../../../public/assets/icons/circle.svg";
import { useAllProperties } from "../../../services/hooks/useAllProperties";
const SideBar = () => {
  const [activeItem, setActiveItem] = useState(-1);
  const {activeTenant,activeRental} = useAllProperties();
  const switchActiveItem = (index) => {
    setActiveItem(index === activeItem ? index : index);
  };
  const { push } = useRouter();
  const navigateToHome = () => {
    try {
      push("/home");
      switchActiveItem(0);
    } catch (ex) {
      console.error("Error at navigateToHome");
    }
  };
  const navigateToMyApplication = () => {
    try {
      push(`/rental-form/${activeRental}?q=${activeTenant}`)
      switchActiveItem(0);
    } catch (ex) {
      console.error("Error at navigateToMyProperty");
    }
  };
  
  const navigateToReviewDocuments = () =>{
    try {
      push(`/rental-form/review-documents/${activeRental}?q=${activeTenant}`)
      switchActiveItem(1);
    } catch (ex) {
      console.error("Error at navigateToMyProperty");
    }
  }

  const navigateToDocumentsVerification = () => {
    try {
      push("/rental-form/document-verification");
      switchActiveItem(2);
    } catch (ex) {
      console.error("Error at navigateToMyTenants");
    }
  };
  const navigateToUploadSignature = () => {
    try {
      push("/rental-form/upload-signature");
      switchActiveItem(3);
    } catch (ex) {
      console.error("Error at navigateToQuestionsFlow");
    }
  };

  return (
    <>
      <div data-testid="side-bar" className="side-bar">
        <aside className="aside-side-bar">
          <div className="aside-bar-home" onClick={navigateToHome}>
            <img className="side-bar-logo" alt="loading" />
          </div>
          <ul data-testid="side-bar-items" className="side-bar-item-container">
            <li
              data-testid="side-bar-properties"
              className="side-bar-item"
              onClick={navigateToMyApplication}>
              <div className="side-bar-item__contents">
                <Circle
                  className={
                    activeItem === 0
                      ? "side-bar-item__status-icon side-bar-item__status-icon-active"
                      : "side-bar-item__status-icon side-bar-item__status-icon-to-be-checked"
                  }
                />
                <span className="side-bar-item__text">Application Form</span>
              </div>
            </li>
            <li
              className="side-bar-item"
              onClick={navigateToReviewDocuments}>
              <div className="side-bar-item__contents">
                <Circle
                  className={
                    activeItem === 1
                      ? "side-bar-item__status-icon side-bar-item__status-icon-active"
                      : "side-bar-item__status-icon side-bar-item__status-icon-to-be-checked"
                  }
                />
                <span className="side-bar-item__text">Review documents</span>
              </div>
            </li>
            <li
              data-testid="side-bar-tenants"
              className="side-bar-item"
              onClick={navigateToDocumentsVerification}>
              <div className="side-bar-item__contents">
                <Circle
                  className={
                    activeItem === 2
                      ? "side-bar-item__status-icon side-bar-item__status-icon-active"
                      : "side-bar-item__status-icon side-bar-item__status-icon-to-be-checked"
                  }
                />
                <span className="side-bar-item__text">Upload documents</span>
              </div>
            </li>
            <li className="side-bar-item" onClick={navigateToUploadSignature}>
              <div className="side-bar-item__contents">
                <Circle
                  className={
                    activeItem === 3
                      ? "side-bar-item__status-icon side-bar-item__status-icon-active"
                      : "side-bar-item__status-icon side-bar-item__status-icon-to-be-checked"
                  }
                />
                <span className="side-bar-item__text">Upload signature</span>
              </div>
            </li>
            <li className="side-bar-item" onClick={navigateToUploadSignature}>
              <div className="side-bar-item__contents">
                <Circle className="side-bar-item__status-icon" />
                <span className="side-bar-item__text">Client Information</span>
              </div>
            </li>
            <li className="side-bar-item">
              <div className="side-bar-item__contents">
                <Circle className="side-bar-item__status-icon" />
                <span className="side-bar-item__text">Authority</span>
              </div>
            </li>
          </ul>
        </aside>
      </div>
    </>
  );
};

export default SideBar;
