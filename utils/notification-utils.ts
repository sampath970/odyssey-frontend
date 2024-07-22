import NotificationsAdapter from "../services/adapters/notifications-adapter";

const handleClearNotification = async (currentTenant, _unReadChatMessageUsers) => {
    console.log("_unReadChatMessageUsers", _unReadChatMessageUsers);
    console.log("currentTenant", currentTenant);
    let unreadMessageIds = getUnreadMessageIdsForTenant(currentTenant, _unReadChatMessageUsers);
    const notificationClearResponse =
      await NotificationsAdapter.markNotificationsAsRead(unreadMessageIds);
    if (notificationClearResponse) {
      return true
    } else {
      console.log("Notification status not updated yet");
    }
  };
  const getUnreadMessageIdsForTenant = (currentTenant, _unReadChatMessageUsers) => {
    const unreadMessages = _unReadChatMessageUsers.filter(message => message.fromId === currentTenant);
    const notificationIds = unreadMessages.map(message => message.notificationId);
    return notificationIds;
  };
export {handleClearNotification,getUnreadMessageIdsForTenant}