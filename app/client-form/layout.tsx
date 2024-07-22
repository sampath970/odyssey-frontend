'use client'
import React from "react";
import "./layout.scss";
import Header from "../dashboard/title-bar/title-bar";
import { UserContextProvider } from "../../services/providers/user-provider";
import { AllPropertiesContextProvider } from "../../services/providers/all-properties-provider";
import SideBar from "./client-side-bar/client-side-bar";
const DashboardLayout = (props) => {
    return (

        <UserContextProvider>
            <AllPropertiesContextProvider>
                <div className="dashboard-grid-container">
                    <div className="item1">
                        <Header />
                    </div>
                    <div className="item2">
                        <SideBar />
                    </div>
                    <div className="item3">
                        {props.children}
                    </div>
                </div>
            </AllPropertiesContextProvider>
        </UserContextProvider>
    );
};

export default DashboardLayout;