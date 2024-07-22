"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./user-side-bar.scss";
import Briefcase from "../../../public/assets/icons/briefcase.svg";
import Dashboard from "../../../public/assets/icons/user-dashboard.svg";
import MyDocuments from "../../../public/assets/icons/my-documents.svg";
import MyUnits from "../../../public/assets/icons/my-units.svg";
import Messaging from "../../../public/assets/icons/messaging.svg";
import Meetings from "../../../public/assets/icons/schedule.svg";
import ChatBot from "../../../public/assets/icons/chatbot.svg";
import Notification from "../../../public/assets/icons/notification.svg";
import { useNotifications } from "../../../services/hooks/useNotifications";
import NotificationsAdapter from "../../../services/adapters/notifications-adapter"
import { useUserInfo } from "../../../services/hooks/useUserInfo";


const UserSideBar = (props) => {
  let { fetchNewNotifications, unReadChatMessageUsers, setUnreadChatMessageUsers } = useNotifications();
  const { userInfo } = useUserInfo();
  const [activeItem, setActiveItem] = useState(1);
  const switchActiveItem = (index) => {
    setActiveItem(index === activeItem ? index : index);
  };
  const { push } = useRouter();
  const navigateToHome = () => {
    try {
      push("/home");
    } catch (ex) {
      console.error("Error at navigateToHome");
    }
  };
  const navigateToDashboard = () => {
    try {
      push("/users-dashboard/user-dashboard");
      switchActiveItem(1);
    } catch (ex) {
      console.error("Error at navigateToDashboard");
    }
  };
  const navigateToMessaging = () => {
    try {
      push("/users-dashboard/messaging");
      switchActiveItem(3);
    } catch (ex) {
      console.error("Error at navigateToMyWaitlist");
    }
  };
  const navigateToMyDocuments = () => {
    try {
      push("/users-dashboard/my-documents");
      switchActiveItem(2);
    } catch (ex) {
      console.error("Error at navigateToDashboard");
    }
  };
  const navigateToMeetings = () => {
    try {
      push("/users-dashboard/meetings");
      switchActiveItem(5);
    } catch (ex) {
      console.error("Error at navigateToMeetings");
    }
  };
  const navigateToChatBot = () => {
    try {
      push("/users-dashboard");
      switchActiveItem(6);
    } catch (ex) {
      console.error("Error at navigateToChatBot");
    }
  };
  const navigateToNotifications = () => {
    try {
      push("/users-dashboard/user-notifications");
      switchActiveItem(7);
    } catch (ex) {
      console.error("Error at navigateToChatBot");
    }
  };
  const navigateToQuickGuidedTour = () => {
    try {
      push("/users-dashboard/guided-tour");
      switchActiveItem(8);
    } catch (ex) {
      console.error("Error at navigateToChatBot");
    }
  };
  const getUnreadMessageIdsForTenant = (currentTenant, _unReadChatMessageUsers) => {
    const unreadMessages = _unReadChatMessageUsers?.filter(message => message?.toId === currentTenant);
    const notificationIds = unreadMessages.map(message => message.notificationId);
    return notificationIds;
  };
  const handleClearNotification = async (currentTenant, _unReadChatMessageUsers) => {
    let unreadMessageIds = getUnreadMessageIdsForTenant(currentTenant, _unReadChatMessageUsers);
    const notificationClearResponse =
      await NotificationsAdapter.markNotificationsAsRead(unreadMessageIds);
    if (notificationClearResponse) {
      fetchNewNotifications(true);
    } else {
      console.log("Notification status not updated yet");
    }

  };
  const { notifications } = useNotifications();
  // let unReadNotifications = notifications?.filter(
  //   (_notification) => _notification.status === "unread" && typeof (_notification.message) === "string"
  // );
  let unReadMessages = notifications?.filter(
    (_notification) => _notification.status === "unread" && typeof (_notification.message) !== "string"
  ).map(_notification => ({ toId: _notification?.message?.to, notificationId: _notification.id }));
  useEffect(() => {
    let unReadMessageUsers = [...unReadMessages];
    setUnreadChatMessageUsers(unReadMessageUsers);
  }, [notifications])
  return (
    <>
      <div className="mobile__nav-bar">
        <div className={activeItem === 1 ? "mobile__nav-bar-item mobile__nav-bar-item--active" : "mobile__nav-bar-item"} onClick={navigateToDashboard}>
          <div className="mobile__nav-bar-logo-wrapper">
            <Dashboard />
          </div>
          <div>Home</div>
        </div>
        <div className={activeItem === 2 ? "mobile__nav-bar-item mobile__nav-bar-item--active" : "mobile__nav-bar-item"} onClick={navigateToMyDocuments}>
          <div className="mobile__nav-bar-logo-wrapper">
            <MyDocuments />
          </div>
          <div>My Documents</div>
        </div>
        <div className={activeItem === 3 ? "mobile__nav-bar-item mobile__nav-bar-item--active" : "mobile__nav-bar-item"} onClick={() => { navigateToMessaging(); handleClearNotification(userInfo.id, unReadChatMessageUsers); }}>
          <div className="mobile__nav-bar-logo-wrapper">
            <Messaging />
          </div>
          <div>Messaging</div>
        </div>
        <div className={activeItem === 7 ? "mobile__nav-bar-item mobile__nav-bar-item--active" : "mobile__nav-bar-item"} onClick={navigateToNotifications}>
          <div className="mobile__nav-bar-logo-wrapper">
            <Notification height="20px" />
          </div>
          <div>Notifications</div>
        </div>
      </div>
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
              id="sidebar-home"
              className={
                activeItem === 1 ? "side-bar-item-active" : "side-bar-item"
              }
              onClick={navigateToDashboard}
            >
              <div className="side-bar-item__contents">
                <Dashboard />
                <span className="side-bar-item__text">Home</span>
              </div>
            </li>
            {/* <li id="sidebar-home"
              className={
                activeItem === 2 ? "side-bar-item-active" : "side-bar-item"
              }
              onClick={()=>{}}>
              <div className="side-bar-item__contents">
                <Dashboard />
                <span className="side-bar-item__text">My Documents</span>
              </div>
            </li> */}
            <li
              id="sidebar-home"
              className={
                activeItem === 2 ? "side-bar-item-active" : "side-bar-item"
              }
              onClick={navigateToMyDocuments}
            >
              <div className="side-bar-item__contents">
                <MyDocuments />
                <span className="side-bar-item__text">My Documents</span>
              </div>
            </li>
            <li
              id="sidebar-my-waitlist"
              className={
                activeItem === 3 ? "side-bar-item-active" : "side-bar-item"
              }
              onClick={() => { navigateToMessaging(); handleClearNotification(userInfo.id, unReadChatMessageUsers); }}
            >
              <div className="side-bar-item__contents">
                <div className="side-bar-item__notification">
                  <Messaging className={"side-bar-item__icon"} />
                  {unReadMessages?.length ? (
                    <div className="button__badge">
                      {unReadMessages.length}
                    </div>
                  ) : null}
                </div>
                <span className="side-bar-item__text">Messaging</span>
              </div>
            </li>
            {/* <li id="sidebar-meetings"
              className={
                activeItem === 5 ? "side-bar-item-active" : "side-bar-item"
              }
              onClick={navigateToMeetings}>
              <div className="side-bar-item__contents">
                <Meetings />
                <span className="side-bar-item__text">Meetings</span>
              </div>
            </li> */}
            {/* <li id="sidebar-chatbot"
              className={
                activeItem === 6 ? "side-bar-item-active" : "side-bar-item"
              }
              onClick={navigateToChatBot}>
              <div className="side-bar-item__contents">
                <ChatBot />
                <span className="side-bar-item__text">Chatbot</span>
              </div>
            </li> */}
        {/* <li
              id="sidebar-notifications"
              className={
                activeItem === 7 ? "side-bar-item-active" : "side-bar-item"
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
                <span className="side-bar-item__text">Notifications</span>
              </div>
                  </li> */}
            {/* <li id="sidebar-quick-tour"
              className={
                activeItem === 8 ? "side-bar-item-active" : "side-bar-item"
              }
              onClick={navigateToQuickGuidedTour}>
              <div className="side-bar-item__contents">
                <ChatBot />
                <span className="side-bar-item__text">Quick Guided Tour</span>
              </div>
            </li> */}
          </ul>
        </aside>
      </div>
    </>
  );
};

export default UserSideBar;
