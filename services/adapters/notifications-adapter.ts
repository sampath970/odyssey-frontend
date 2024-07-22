import axios from "axios";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import AppConfig from "../../config/application.config";
async function fetchNotificationsForUser(userInfo) {
    const getNotificationsByRole = (userInfo) =>{
        if(userInfo){
            switch (userInfo?.role) {
                case "tenant":
                    return userInfo?.id;
                case "property_manager":
                    return userInfo?.sub;
                default:
                    return userInfo?.sub;
            }
        }
    }
    // console.log(userInfo)
    try{
        const { data } = await axios.get(
            AppConfig.svc + `get_notification/`, {
            params:{
                user_id : getNotificationsByRole(userInfo)
            },
    });
        // console.log(data);
        return data;
        // setAllProperties(data);
    } catch (ex) {
        console.error("Error at  fetchAllProperties")
      }
}
async function markNotificationsAsRead(notification_ids){
    try {
        const {data} =await axios.post(
            AppConfig.svc + `update_notification/`, 
            {notification_ids:notification_ids}
        )
        // console.log(data)
        return {data};
    } catch (error) {
        console.log(error)
    }
}
const NotificationsAdapter = {
    fetchNotificationsForUser,
    markNotificationsAsRead
    
}

export default NotificationsAdapter;