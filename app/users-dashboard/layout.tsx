"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import "./layout.scss";
import SideBar from "../dashboard/side-bar/side-bar";
import Header from "../dashboard/title-bar/title-bar";
import Modal, { ModalTypes } from "../../components/modal/modal";
import Button from "../../components/button/button";
import { useRouter } from "next/navigation";
import { UserContextProvider } from "../../services/providers/user-provider";
import UserDashboardSideBar from "./user-side-bar/user-side-bar";
import { useUserInfo } from "../../services/hooks/useUserInfo";
import { NotificationContextProvider } from "../../services/providers/notifications-provider";
import { AllPropertiesContextProvider } from "../../services/providers/all-properties-provider";

const DashboardLayout = (props) => {
  const { push } = useRouter();
  const {userInfo} = useUserInfo();
  const [activeItem,setActiveItem] = useState(0)
  console.log(userInfo)
  
  // Middleware will check cookies and redirect to login page if not logged in.

  return (
    <>
      <UserContextProvider>
        <AllPropertiesContextProvider>
        <NotificationContextProvider>
        { 
          <div className="dashboard-grid-container">
            <div className="item1">
              <div style={{background:"white",flexDirection:"column"}} className="dashboard__title-bar">
                <Header avatarFloatMenuSide = "left"/>
                <UserDashboardSideBar />
              </div>
              <div className="dashboard__title-info">
                <Header />
              </div>
            </div>
            <div className="item2">
              <UserDashboardSideBar />
            </div>
            <div className="item3" 
            //@ts-ignore
            activeItem={activeItem}>{props.children}</div>
          </div>
         
        }
        </NotificationContextProvider>
        </AllPropertiesContextProvider>
      </UserContextProvider>
    </>
  );
};

export default DashboardLayout;
