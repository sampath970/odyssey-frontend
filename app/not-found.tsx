'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import React from "react";
import "./layout.scss";
import Header from "./dashboard/title-bar/title-bar";
import { UserContextProvider } from "../services/providers/user-provider";
import { AllPropertiesContextProvider } from "../services/providers/all-properties-provider";
import SideBar from "./dashboard/side-bar/side-bar";
import { NotificationContextProvider } from '../services/providers/notifications-provider';
import { AllTenantsContextProvider } from '../services/providers/all-tenants-provider';
import { QuestionnaireContextProvider } from '../services/providers/questionnaire-provider';

// export default function ExampleClientComponent() {
const NotFoundComponent = (props) => {
  const pathname = usePathname()
  console.log('not found url: ', pathname)
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
              <div>
                <p>Current pathname: {pathname}</p>
                <p>Could not find requested resource</p>
                <p>
                  <Link href="/dashboard">Home</Link>
                </p>
              </div>
            </AllPropertiesContextProvider>
          </QuestionnaireContextProvider>
        </AllTenantsContextProvider>
      </NotificationContextProvider>
    </UserContextProvider>
  )
}

export default NotFoundComponent