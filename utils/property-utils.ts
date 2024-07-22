interface Notification {
  title?: string;
  status?: string;
  redirectUrl?: string;
  message?: string;
  time_stamp?: any;
}
const getNotificationsCount = (notifications, propertyID) => {
  let filteredPropertyNotifications =
    notifications &&
    notifications?.filter(
      (_notifications) => _notifications.property_id === propertyID
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
    ) || [];
  let filteredNotifications: Notification[] = [
    ...unReadNotifications,
    ...readNotifications,
  ];
  return unReadNotifications.length || 0;
};
const formatFaxNumber = (_faxNumber) => {
  let faxNumber = _faxNumber;
  let formatFax = faxNumber.replace(/\D/g, "");
  console.log(formatFax);
  return formatFax;
};
export { getNotificationsCount, formatFaxNumber };
