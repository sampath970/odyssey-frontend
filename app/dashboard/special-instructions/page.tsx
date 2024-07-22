"use client";
import { useState } from "react";
import "./special-instructions.scss";
import Button from "../../../components/button/button";
import { useUserInfo } from "../../../services/hooks/useUserInfo";
import NotificationSettingsTab from "../notification-setting/notification-setting";
import Modal from "../../../components/modal/modal";
import ThirdPartyNotifcation from "../third-party-notification/third-party-notifcation";
import { useRouter } from "next/navigation";
import MoveInCertification from "./move-in-certification/page";
import PropertyAdapter from "../../../services/adapters/properties-adapter";
import AnimatedCheck from "../../../components/animated-check/animated-check";
import Label, {
  LabelType,
  LabelVariant,
} from "../../../components/label/label";
const SpecialInstructions = (props) => {
  console.log(props);
  const [showNotificationSettings, setShowNotificationSettings] =
    useState(false);
  const [showThirdPartySettings, setShowhirdPartySettings] = useState(false);
  const [showSpecialInstructions, setShowSpecialInstructions] = useState(true);
  const [showSpecialInstructionPopup, setShowSpecialInstructionPopup] =
    useState(false);
  const handleNotificationSettingsClick = () => {
    setShowNotificationSettings(true);
  };
  const closeNotificationSettingsTab = () => {
    setShowNotificationSettings(false);
  };
  const handleThirdPartyNotification = () => {
    setShowhirdPartySettings(true);
  };
  const closeThirdPartyTab = () => {
    setShowhirdPartySettings(false);
  };
  const { push } = useRouter();
  const navigateToFirstYearCertification = () => {
    try {
      push("/dashboard/first-year-certification");
    } catch (ex) {
      console.error("Error at navigateToFirstYearCertification ");
    }
  };
  const navigateToMoveInCertification = () => {
    try {
      // push("/dashboard/special-instructions/move-in-certification");
      setShowSpecialInstructions(false);
    } catch (ex) {
      console.error("Error at navigateToMoveInCertification ");
    }
  };
  const navigateToAnnualCertification = () => {
    try {
      push("/dashboard/annual-certification");
    } catch (ex) {
      console.error("Error at navigateToAnnualCertification ");
    }
  };
  const navigateToInterimCertification = () => {
    try {
      push("/dashboard/interim-certification");
    } catch (ex) {
      console.error("Error at navigateToInterimCertification ");
    }
  };

  const userButtonStyle = {
    paddingTop: "0rem",
    paddingRight: "0rem",
    paddingBottom: "0rem",
    paddingLeft: "0rem",
  };
  const { userInfo } = useUserInfo();
  console.log(showNotificationSettings);
  async function createSpecialInfo(info) {
    try {
      console.log(info);
      const specialInfoAddResponse =
        await PropertyAdapter.addSpecialIOnstructions(
          props.activePropertyID,
          props.userInfo,
          info
        );
      if (specialInfoAddResponse) {
        setShowSpecialInstructionPopup(true);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const onClose = () => {
    setShowSpecialInstructionPopup(false);
  };
  const SpecialInstructionsStyle = {
    color: "white",
    margin: "0",
  };
  return (
    <>
      {showSpecialInstructions && (
        <div className="special-instruction">
          <div className="special-instruction__section special-instruction__section-one">
            <div className="special-instruction__header">
              <h1 className="special-instruction__header-text">
                <Label
                  type={LabelType.Header}
                  text={`Welcome, ${userInfo?.email}`}
                  variant={LabelVariant.L4}
                  overrideTextStyles={SpecialInstructionsStyle}
                />
              </h1>
              <div className="special-instruction__header-label">
                <Label
                  type={LabelType.Link}
                  text={"Management Special Instructions"}
                  variant={LabelVariant.L1}
                  overrideTextStyles={SpecialInstructionsStyle}
                />
              </div>
            </div>
            <div className="special-instruction__header-image">
              <div className="special-instruction__image-container">
                <div className="special-instruction__image-wrapper">
                  <img
                    src="/assets/icons/instructions.png"
                    className="special-instruction__image"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="special-instruction__section special-instruction__section-two">
            <div className="special-instruction__cards-wrapper">
              <div
                className="special-instruction__cards"
                onClick={navigateToMoveInCertification}
              >
                <div className="special-instruction__cards-icon">
                  <img
                    src="/assets/icons/move-in-certification.png"
                    className="special-instruction__cards-icon-image"
                  />
                </div>
                <div className="special-instruction__cards-details">
                  <label className="special-instruction__cards-contents">
                    <Label
                      type={LabelType.Header}
                      text={"Initial Certification"}
                      variant={LabelVariant.L4}
                    />
                  </label>
                </div>
              </div>
              <div
                className="special-instruction__cards"
                onClick={navigateToFirstYearCertification}
              >
                <div className="special-instruction__cards-icon">
                  <img
                    src="/assets/icons/first-year-certification.png"
                    className="special-instruction__cards-icon-image"
                  />
                </div>
                <div className="special-instruction__cards-details">
                  <label className="special-instruction__cards-contents">
                  <Label
                      type={LabelType.Header}
                      text={"1st Year Certification"}
                      variant={LabelVariant.L4}
                    />
                   </label>
                </div>
              </div>
              <div
                className="special-instruction__cards"
                onClick={navigateToAnnualCertification}
              >
                <div className="special-instruction__cards-icon">
                  <img
                    src="/assets/icons/annual-certification.png"
                    className="special-instruction__cards-icon-image"
                  />
                </div>
                <div className="special-instruction__cards-details">
                  <label className="special-instruction__cards-contents">
                  <Label
                      type={LabelType.Header}
                      text={"Annual Certification"}
                      variant={LabelVariant.L4}
                    />
                   </label>
                </div>
              </div>
            </div>
            <div className="special-instruction__cards-wrapper">
              <div
                className="special-instruction__cards"
                onClick={navigateToInterimCertification}
              >
                <div className="special-instruction__cards-icon">
                  <img
                    src="/assets/icons/interim.png"
                    className="special-instruction__cards-icon-image"
                  />
                </div>
                <div className="special-instruction__cards-details">
                  <label className="special-instruction__cards-contents">
                  <Label
                      type={LabelType.Header}
                      text={"Interim Certification"}
                      variant={LabelVariant.L4}
                    />
                    
                  </label>
                </div>
              </div>
              <div
                className="special-instruction__cards"
                onClick={handleNotificationSettingsClick}
              >
                <div className="special-instruction__cards-icon">
                  <img
                    src="/assets/icons/notification.png"
                    className="special-instruction__cards-icon-image"
                  />
                </div>
                <div className="special-instruction__cards-details">
                  <label className="special-instruction__cards-contents">
                  <Label
                      type={LabelType.Header}
                      text={"Notification Settings"}
                      variant={LabelVariant.L4}
                    />
                  
                  </label>
                </div>
              </div>
              <Modal
                isOpen={showNotificationSettings}
                setOn={closeNotificationSettingsTab}
                showCloseButton={true}
                title="Notification Settings"
              >
                <NotificationSettingsTab
                  onClose={closeNotificationSettingsTab}
                />
              </Modal>
              <div
                className="special-instruction__cards"
                onClick={handleThirdPartyNotification}
              >
                <div className="special-instruction__cards-icon">
                  <img
                    src="/assets/icons/third-party.png"
                    className="special-instruction__cards-icon-image"
                  />
                </div>
                <div className="special-instruction__cards-details">
                  <label className="special-instruction__cards-contents">
                  <Label
                      type={LabelType.Header}
                      text={"3rd Party Notification Timelines"}
                      variant={LabelVariant.L4}
                    />
                    
                  </label>
                </div>
              </div>
            </div>
            <Modal
              isOpen={showThirdPartySettings}
              setOn={closeThirdPartyTab}
              showCloseButton={true}
              title="Third Party Notifications"
            >
              <ThirdPartyNotifcation />
            </Modal>
          </div>
          <div className="special-instruction__section special-instruction__section-three"></div>
        </div>
      )}
      {!showSpecialInstructions && (
        <MoveInCertification
          activeProperty={props.activeProperty}
          setShowSpecialInstructions={setShowSpecialInstructions}
          createSpecialInfo={createSpecialInfo}
        />
      )}
      <Modal isOpen={showSpecialInstructionPopup} title="Success!!">
        <div className="special-instructions__popup">
          Special Info Added Successfully !
        </div>
        <AnimatedCheck />
        <div className="add-property__modal-footer">
          <Button
            btnText="Close"
            btnTheme="primary"
            btnType="rounded"
            testID="properties-close-button"
            buttonClick={onClose}
          />
        </div>
      </Modal>
    </>
  );
};

export default SpecialInstructions;
