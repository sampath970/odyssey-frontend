"use client";

import React from "react";
import "./title-bar.scss";
import Avatar from "../../../components/avatar/avatar";
import Bell from "../../../public/assets/icons/bell.svg";
import FloatingMenu from "../../../components/floating-menu/floating-menu";
import Notifications from "./notifications/notifications";
import { useRouter } from "next/navigation";
import { useUserInfo } from "../../../services/hooks/useUserInfo";
import AppConfig from "../../../config/application.config";
import Cookies from 'js-cookie';
import { localLogout } from "../../_auth/auth_utils";

export default function TitleBar(props) {
  const {avatarFloatMenuSide = "right"} = props;
  const { push } = useRouter();
  const { userInfo } = useUserInfo();
  const handleLogoutButtonClick = () => {
    try {
      logout();
    } catch (ex) {
      console.error("Error at handleLogoutButtonClick")
    }
  };
  return (
    <div id="title-bar" data-testid="title-bar" className="title-bar">
      <div className="title-bar__menu-container" data-testid="title-bar-login-menu">
        {/* <FloatingMenu
          floatDirection="left"
          marginStyle={{marginTop:"12px"}}
          menuTriggerComponent={
            <Bell className="title-bar__svg-position" />
          }>
          <Notifications />
        </FloatingMenu> */}
        <FloatingMenu
          floatDirection={avatarFloatMenuSide}
          menuTriggerComponent={<Avatar avatar_name={userInfo?.email} />}>
          <div className="title-bar__login-menu">
            <li className="title-bar__login-menu__sub-item">
              <span className="title-bar__login-menu__sub-item__text">
                My Account
              </span>
              <div className="title-bar__login-menu__sub-item__line"></div>
            </li>
            <li
              className="title-bar__login-menu__sub-item"
              onClick={handleLogoutButtonClick}>
              <span className="title-bar__login-menu__sub-item__text">
                Log Out
              </span>
            </li>
          </div>
        </FloatingMenu>
      </div>
    </div>
  );
}

function logout(): void {
  // Remove cookies
  try {
      localLogout();
  
      // This approach works and does sign the user out of Cognito, and redirect us to the logout_path.
      window.location.href = AppConfig.cognito.cognito_host + AppConfig.cognito.urls.cognito_logout_path + encodeURIComponent(AppConfig.cognito.urls.cognito_app_redirect_logout_path);  

  } catch (error) {
      console.log(error);
  }
}