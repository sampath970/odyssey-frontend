import { createContext } from "react";

let defaultProps = {
    notifications: [],
    setNewNotification:(notification:any) =>{},
    fetchNewNotifications:(any) =>{},
    setUnreadChatMessageUsers:(any)=>{},
    unReadChatMessageUsers:[]
}
export const NotificationContext = createContext(defaultProps);

