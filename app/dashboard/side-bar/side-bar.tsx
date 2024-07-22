"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./side-bar.scss";
import Briefcase from "../../../public/assets/icons/briefcase.svg";
import Dashboard from "../../../public/assets/icons/grid.svg";
import QuestionsIcon from "../../../public/assets/icons/assign.svg";
import FormMap from "../../../public/assets/icons/form-map.svg";
import MyProperty from "../../../public/assets/icons/house.svg";
import Notification from "../../../public/assets/icons/notification.svg";
import { useNotifications } from "../../../services/hooks/useNotifications";
import SpecialInstructions from "../../../public/assets/icons/instruction-icon.svg";
import Message from "../../../public/assets/icons/messaging.svg";
import Admin from "../../../public/assets/icons/admin.svg";

import Label, {
  LabelType,
  LabelVariant,
} from "../../../components/label/label";
import { useUserInfo } from "../../../services/hooks/useUserInfo";
import { AccessPermission, validate } from "../../_auth/permissions";

interface SideBarProps {
  activeIndex?: any;
}

const SideBar = (props: SideBarProps) => {
  const { activeIndex } = props;
  const { notifications,fetchNewNotifications,setUnreadChatMessageUsers } = useNotifications();
  let unReadNotifications = notifications?.filter(
    (_notification) => _notification.status === "unread" && typeof(_notification.message) === "string"
  );
  let unReadMessages = notifications?.filter(
    (_notification) => _notification.status === "unread" &&  typeof(_notification.message) !== "string"
  ).map(_notification=>({fromId:_notification?.message?.from,notificationId:_notification.id}));
  useEffect(()=>{
    let unReadMessageUsers =Array.isArray(unReadMessages) ? [...unReadMessages] : [];
    setUnreadChatMessageUsers(unReadMessageUsers);
  },[notifications])



  // let unReadMessages = notifications?.filter(
  //   (_notification) => _notification.status === "unread" &&  typeof(_notification.message) !== "string"
  // ).map(_notification=>_notification.message.from);
  // let unReadMessageUsers = Array.from(new Set(unReadMessages));
  // debugger;
  // setUnreadChatMessageUsers(unReadMessageUsers);
  let notificationCss = notifications?.length ? "alert" : "";
  const [activeItem, setActiveItem] = useState(activeIndex);
  const switchActiveItem = (index) => {
    setActiveItem(index === activeItem ? index : index);
  };
  const { push } = useRouter();
  const {userInfo} = useUserInfo();
  // console.log(userInfo)
  const navigateToHome = () => {
    try {
      push("/home");
    } catch (ex) {
      console.error("Error at navigateToHome");
    }
  };
  const navigateToMyProperty = () => {
    try {
      push("/dashboard/my-properties");
      switchActiveItem(0);
    } catch (ex) {
      console.error("Error at navigateToMyProperty");
    }
  };
  const navigateToMyTenants = () => {
    try {
      push("/dashboard/tenant-section");
      switchActiveItem(1);
    } catch (ex) {
      console.error("Error at navigateToMyTenants");
    }
  };
  const navigateToReport = () => {
    switchActiveItem(2);
  };
  const navigateToQuestionsFlow = () => {
    try {
      push("/dashboard/questionnaire/any");
      switchActiveItem(3);
    } catch (ex) {
      console.error("Error at navigateToQuestionsFlow ");
    }
  };
  const navigateToNotifications = () => {
    try {
      push("/dashboard/notifications");
      fetchNewNotifications(true);
      switchActiveItem(4);
    } catch (ex) {
      console.error("Error at navigateToNotifications ");
    }
  };
  const navigateToFormMapping = () => {
    try {
      push("/dashboard/form-mapping");
      switchActiveItem(5);
    } catch (ex) {
      console.error("Error at navigateToFormMapping ");
    }
  };
  const navigateToSpecialInstructions = () => {
    try {
      push("/dashboard/special-instructions");
      switchActiveItem(6);
    } catch (ex) {
      console.error("Error at navigateToSpecialInstructions");
    }
  };
  const navigateToAdmin = () => {
    try {
      push("/dashboard/admin");
      switchActiveItem(7);
    } catch (ex) {
      console.error("Error at navigateToAdmin");
    }
  };
  const navigateToMessaging = () => {
    try {
      push("/dashboard/property-messenger");
      switchActiveItem(8);
    } catch (ex) {
      console.error("Error at navigateToMessaging");
    }
  };
  const sideBarStyles = {
    marginLeft: "8px"
  }
  let writeOnlyPermission = validate([AccessPermission.Write], userInfo ? userInfo.permissions : { permissions: 0 })
  return (
    <>
      <div data-testid="side-bar" className="side-bar">

        <aside className="aside-side-bar">
          <div className="side-bar-logo-wrapper" onClick={navigateToHome}>
            <img
              className="side-bar-logo"
              src="./assets/images/odyssey_logo_large.png"
              alt="loading"
            />
          </div>
          <ul data-testid="side-bar-items" className="side-bar-item-container">
            <li
              data-testid="side-bar-properties"
              className={
                activeItem === 0 ? "side-bar-item-active" : "side-bar-item"
              }
              onClick={navigateToMyProperty}
            >
              <div className="side-bar-item__contents">
                <MyProperty />
                <Label
                  type={LabelType.Header}
                  text={"Properties"}
                  variant={LabelVariant.L2}
                  overrideTextStyles={sideBarStyles}
                />
              </div>
            </li>
            {writeOnlyPermission && <li
              data-testid="side-bar-tenants"
              className={
                activeItem === 1 ? "side-bar-item-active" : "side-bar-item"
              }
              onClick={navigateToMyTenants}
            >
              <div className="side-bar-item__contents">
                <Briefcase />
                <Label
                  type={LabelType.Header}
                  text={"Tenants"}
                  variant={LabelVariant.L2}
                  overrideTextStyles={sideBarStyles}
                />
              </div>
            </li>}
            {/* <li
              className={
                activeItem === 2 ? "side-bar-item-active" : "side-bar-item"
              }
              onClick={navigateToReport}
            >
              <div className="side-bar-item__contents">
                <Dashboard />
                <Label
                  type={LabelType.Header}
                  text={"Report"}
                  variant={LabelVariant.L2}
                  overrideTextStyles={sideBarStyles}
                />
              </div>
            </li> */}
            {writeOnlyPermission && <li
              className={
                activeItem === 3 ? "side-bar-item-active" : "side-bar-item"
              }
              onClick={navigateToQuestionsFlow}
            >
              <div className="side-bar-item__contents">
                <QuestionsIcon />
                <Label
                  type={LabelType.Header}
                  text={"Questions Flow"}
                  variant={LabelVariant.L2}
                  overrideTextStyles={sideBarStyles}
                />
              </div>
            </li>} <li
              className={
                activeItem === 4 ? "side-bar-item-active" : "side-bar-item"
              }
              onClick={navigateToNotifications}
            >
              <div className="side-bar-item__contents">
                <div className="side-bar-item__notification">
                  <Notification className={"side-bar-item__icon"} />
                  {unReadNotifications?.length ? (
                    <div className="button__badge">
                      {unReadNotifications.length}
                    </div>
                  ) : null}
                </div>
                <Label
                  type={LabelType.Header}
                  text={"Notifications"}
                  variant={LabelVariant.L2}
                  overrideTextStyles={sideBarStyles}
                />
              </div>
            </li>
            {writeOnlyPermission && <li
              className={
                activeItem === 5 ? "side-bar-item-active" : "side-bar-item"
              }
              onClick={navigateToFormMapping}
            >
              <div className="side-bar-item__contents">
                <FormMap />
                <Label
                  type={LabelType.Header}
                  text={"Form Mapping"}
                  variant={LabelVariant.L2}
                  overrideTextStyles={sideBarStyles}
                />
              </div>
            </li>}
            {writeOnlyPermission &&  (
            <li
              className={
                activeItem === 6 ? "side-bar-item-active" : "side-bar-item"
              }
              onClick={navigateToSpecialInstructions}
            >
              <div className="side-bar-item__contents">
                <SpecialInstructions />
                <Label
                  type={LabelType.Header}
                  text={"Special Instructions"}
                  variant={LabelVariant.L2}
                  overrideTextStyles={sideBarStyles}
                />
              </div>
            </li>
            )}
            {writeOnlyPermission && ( 
            <li
              className={
                activeItem === 7 ? "side-bar-item-active" : "side-bar-item"
              }
              onClick={navigateToAdmin}
            >
              <div className="side-bar-item__contents">
                <Admin />
                <Label
                  type={LabelType.Header}
                  text={"Admin"}
                  variant={LabelVariant.L2}
                  overrideTextStyles={sideBarStyles}
                />
              </div>
            </li>
            )}
          <li
              className={
                activeItem === 8 ? "side-bar-item-active" : "side-bar-item"
              }
              onClick={navigateToMessaging}
            >
              <div className="side-bar-item__contents">
              <div className="side-bar-item__notification">
                  <Message className={"side-bar-item__icon"} />
                  {unReadMessages?.length ? (
                    <div className="button__badge">
                      {unReadMessages?.length}
                    </div>
                  ) : null}
                </div>
                {/* <Message /> */}
                <Label
                  type={LabelType.Header}
                  text={"Chat"}
                  variant={LabelVariant.L2}
                  overrideTextStyles={sideBarStyles}
                />
              </div>
            </li>
          </ul>
        </aside>
      </div>
    </>
  );
};

export default SideBar;
