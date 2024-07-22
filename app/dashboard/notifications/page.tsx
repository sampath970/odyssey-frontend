"use client";
import React, { useEffect, useState } from "react";
import "./notifications.scss";
import Link from "next/link";
import Bell from "../../../public/assets/icons/bell.svg";
import Check from "../../../public/assets/icons/blank-check-box.svg";
import { useNotifications } from "../../../services/hooks/useNotifications";
import Label, {
  LabelType,
  LabelVariant,
} from "../../../components/label/label";
import NotificationsAdapter from "../../../services/adapters/notifications-adapter";

interface Notification {
  title?: string;
  status?: string;
  redirectUrl?: string;
  message?: string;
  time_stamp?: any;
  id?: string;
}
interface NotificationProps {
  role?: string;
  propertyID?: string;
  linkText?:string;
}
let extraLabelCheckStyles = {
  color: "#31559c",
  textDecoration: "underline",
  cursor: "pointer",
  fontSize:"0.8rem",
}
let extraHeaderLabelStyles = {
  color: "#31559c",
  cursor: "pointer",
  fontSize:"0.8rem",
}
const Notifications = (props: NotificationProps) => {
  
  const { role, propertyID,linkText } = props;
  const [allNotifications, setAllNotifications] = useState([]);
  const [unReadNotifications, setUnReadNotifications] = useState([]);
  const [clearText, setClearText] = useState(false);
  let { notifications, fetchNewNotifications } = useNotifications();
  
  useEffect(() => {
    if (role === "property-page" && propertyID) {
      let filteredPropertyNotifications = notifications.filter(
        (_notifications) => (_notifications.property_id === propertyID && typeof(_notifications.message) === "string")
      );
      let unReadNotifications =
        filteredPropertyNotifications
          ?.filter(
            (_notification: Notification) => _notification.status === "unread"
          )
          ?.reverse() || [];
      let readNotifications =
        filteredPropertyNotifications?.filter(
          (_notification: Notification) => _notification.status !== "unread"
        )?.reverse() || [];
      setUnReadNotifications(unReadNotifications);
      setAllNotifications(filteredPropertyNotifications.reverse());
    } else {
      let unReadNotifications =
        notifications
          ?.filter(
            (_notification: Notification) => _notification.status === "unread"
          )
          ?.reverse() || [];
      let readNotifications =
        notifications?.filter(
          (_notification: Notification) => _notification.status !== "unread"
        )?.reverse() || [];
      console.log(notifications)
      let filteredNotifications: Notification[] = notifications.filter(_notification=> typeof(_notification.message) === "string");
      console.log(filteredNotifications)
      setUnReadNotifications(unReadNotifications);
      setAllNotifications(filteredNotifications?.reverse());
    }
  }, [notifications]);

  

  function formatTimeAgo(timestamp: any): string {
    if (!timestamp) {
      return "";
    }
    const currentDate: Date = new Date();
    const inputDate: Date = new Date(timestamp);

    const seconds: number = Math.floor(
      (currentDate.getTime() - inputDate.getTime()) / 1000
    );
    const minutes: number = Math.floor(seconds / 60);
    const hours: number = Math.floor(minutes / 60);
    const days: number = Math.floor(hours / 24);
    const months: number = Math.floor(days / 30);
    const years: number = Math.floor(months / 12);

    if (seconds < 60) {
      return `${seconds} seconds ago`;
    } else if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else if (days < 30) {
      return `${days} days ago`;
    } else if (months < 12) {
      return `${months} months ago`;
    } else {
      return `${years} years ago`;
    }
  }
  const handleNotificationsClearAll = async (_unReadNotifications) => {
    if (unReadNotifications && unReadNotifications.length !== 0) {
      let notificationIds = _unReadNotifications.map(
        (_unReadNotification: any) => _unReadNotification.id
      );
      const notificationClearResponse =
        await NotificationsAdapter.markNotificationsAsRead(notificationIds);
      if (notificationClearResponse) {
        fetchNewNotifications(true);
      } else {
        console.log("Notification status not updated yet");
      }
    } else {
      console.log("unread notification are empty");
    }
  };
  const handleNotificationClear = async (_notificationId) => {
    let notificationId = [_notificationId];
    const notificationClearResponse =
      await NotificationsAdapter.markNotificationsAsRead(notificationId);
    if (notificationClearResponse) {
      fetchNewNotifications(true);
    } else {
      console.log("Notification status not updated yet");
    }
    
  };
  return allNotifications?.length === 0 ? null : (
    <div className="notifications" data-testid="notifications">
      {role !== "property-page" && (
        <div className="notifications__header">
          <div className="notifications__header-title-wrapper">
            <div
              className="notifications__header-title"
              data-testid="notifications-title"
            >
              <Label
                type={LabelType.Body}
                text={"Notifications"}
                variant={LabelVariant.L4}
              />
            </div>
            <div
              className="notifications__header-icon"
              data-testid="notifications-header-icon"
            >
              <Bell width="20px" height="20px" />
            </div>
          </div>
          <div className="notifications__header-mark-as-read">
            <Label
              onLabelClick={() =>
                handleNotificationsClearAll(unReadNotifications)
              }
              type={LabelType.Body}
              text={"Mark all as read"}
              variant={LabelVariant.L4}
              overrideTextStyles={extraHeaderLabelStyles}
            />
          </div>
        </div>
      )}
      {allNotifications?.map((_notification: Notification, index: number) => (
        <div
          key={index}
          className={
            _notification?.status === "unread"
              ? "notifications__card"
              : "notifications__card notifications__card-opacity"
          }
        >
          <div
            className="notifications__card-image"
            data-testid="notifications-card-image"
          ></div>
          <div
            className="notifications__card-text"
            data-testid="notifications-card-text"
          >
            <div
              className="notifications__card-text-title"
              data-testid="notifications-card-title"
            >
              <div
                className="notifications__card-text-title-author"
                data-testid="notifications-card-author"
              >
                <Label
                  type={LabelType.Header}
                  text={`${_notification?.title} `}
                  variant={LabelVariant.L2}
                />
              </div>
              <span
                className="notifications__card-text-title-info"
                data-testid="notifications-card-info"
              >
                {_notification?.redirectUrl ? (
                  <Link target="_blank" href={`${_notification?.redirectUrl}`}>
                    {linkText && linkText !=="" ? linkText : "view"}
                  </Link>
                ) : null}
              </span>
            </div>
            <div
              className="notifications__card-text-message"
              data-testid="notifications-card-message"
            >
              <Label
                type={LabelType.Header}
                text={`${_notification?.message}`}
                variant={LabelVariant.L3}
              />
            </div>
            <div
              className="notifications__card-text-time"
              data-testid="notifications-card-time"
            >
              <Label
                type={LabelType.SubHeader}
                text={`${formatTimeAgo(_notification?.time_stamp)}`}
                variant={LabelVariant.L2}
              />
            </div>
          </div>
          {_notification?.status === "unread" && 
          <div className="notifications__mark-as-read">
          <Label
            onLabelClick={() => handleNotificationClear(_notification.id)}
            type={LabelType.Link}
            text={"Mark as read"}
            variant={LabelVariant.L2}
            overrideTextStyles={extraLabelCheckStyles}
          />
        </div>
          }
          
        </div>
      ))}
    </div>
  );
};

export default Notifications;
