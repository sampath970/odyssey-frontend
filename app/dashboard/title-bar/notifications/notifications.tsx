import "./notifications.scss";
const Notifications = (props) => {
  return (
    <div className="notification">
      <div className="notification__header">
        <div className="notification__header--one">Notifications</div>
        <div className="notification__header--two">&#x2713; Mark as read</div>
      </div>
      <div className="notification__container">
        <ul className="notification__container__list">
          <li className="notification__container__list-item">
            <div className="notification__container__list-wrapper">
              <div className="notification__container__list-item-point">
                <span>&#x2022;</span>
              </div>
              <div>
                <div>Welcome to Echo for Account Setup</div>
                <div className="notification__container__list-item-status">
                  Nov 23,2022 at 09.15 AM
                </div>
              </div>
            </div>
            <div className="notification__container__list-item-line"></div>
          </li>
          <li className="notification__container__list-item">
            <div className="notification__container__list-wrapper">
              <div className="notification__container__list-item-point">
                <span>&#x2022;</span>
              </div>
              <div>
                <div>Start Echo Remote Certification</div>
                <div className="notification__container__list-item-status">
                  Nov 23,2022 at 09.15 AM
                </div>
              </div>
            </div>
            <div className="notification__container__list-item-line"></div>
          </li>
          <li className="notification__container__list-item">
            <div className="notification__container__list-wrapper">
              <div className="notification__container__list-item-point">
                <span>&#x2022;</span>
              </div>
              <div>
                <div>Module Documents Sent</div>
                <div className="notification__container__list-item-status">
                  Aug 23,2022 at 09:15 AM
                </div>
              </div>
            </div>
            <div className="notification__container__list-item-line"></div>
          </li>
          <li className="notification__container__list-item--end">
            view all notifications
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Notifications;
