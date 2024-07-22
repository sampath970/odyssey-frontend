
import React, { useState, useEffect } from "react";
import { NotificationContext } from "../contexts/notification-context";
import NotificationsAdapter from "../adapters/notifications-adapter";
import { useUserInfo } from "../hooks/useUserInfo";

export function NotificationContextProvider({ children }) {
    const { userInfo } = useUserInfo();
    const [notifications, setNewNotification] = useState([]);
    const [needSyncNotification, fetchNewNotifications] = useState(false);
    const [unReadChatMessageUsers,setUnreadChatMessageUsers] = useState([])
    useEffect(() => {
        async function fetchNotificationsForUser() {
           let data = await NotificationsAdapter.fetchNotificationsForUser(userInfo);
            setNewNotification(data);
            fetchNewNotifications(false)
        }
        if(userInfo?.sub){
            fetchNotificationsForUser();
        }
    }, [userInfo?.sub, needSyncNotification]);


    return (
        <NotificationContext.Provider value={{notifications, setNewNotification,fetchNewNotifications,unReadChatMessageUsers,setUnreadChatMessageUsers}}>
            {children}
        </NotificationContext.Provider>
    );
}