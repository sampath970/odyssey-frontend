"use client";
import React, { useEffect } from "react";
import "./layout.scss";
import Header from "./title-bar/title-bar";
import SideBar from "./side-bar/side-bar";
import { useRouter } from 'next/navigation';
import { UserContextProvider } from "../../services/providers/user-provider";
import { AllPropertiesContextProvider } from "../../services/providers/all-properties-provider";
import { QuestionnaireContextProvider } from "../../services/providers/questionnaire-provider";
import { AllTenantsContextProvider } from "../../services/providers/all-tenants-provider";
import { NotificationContextProvider } from "../../services/providers/notifications-provider";
import reportWebVitals from "./form-mapping/reportWebVitals";
import { useUserInfo } from "../../services/hooks/useUserInfo";
reportWebVitals();
const DashboardLayout = (props) => {
  const {userInfo} = useUserInfo();
  const {push} = useRouter()
  // useEffect(()=>{
  //   push("/dashboard/my-properties")
  // },[userInfo])
  return (
    <UserContextProvider>
        <NotificationContextProvider>
        <AllTenantsContextProvider>
          <QuestionnaireContextProvider>
            <AllPropertiesContextProvider>
              <div className="dashboard-grid-container">
                <div className="item1">
                  <Header />
                </div>
                <div className="item2">
                  <SideBar activeIndex={0} />
                </div>
                <div className="item3">{props.children}</div>
              </div>
            </AllPropertiesContextProvider>
          </QuestionnaireContextProvider>
        </AllTenantsContextProvider>

    </NotificationContextProvider>
      </UserContextProvider>
  );
};

export default DashboardLayout;
