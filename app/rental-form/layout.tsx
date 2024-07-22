'use client'
import React from "react";
import "./layout.scss";
import Header from "../dashboard/title-bar/title-bar";
import { UserContextProvider } from "../../services/providers/user-provider";
import { AllPropertiesContextProvider } from "../../services/providers/all-properties-provider";
import SideBar from "../client-form/client-side-bar/client-side-bar";
import TenantTabs from "./components/tenant-tabs/tenant-tabs";
const DashboardLayout = (props) => {
    return (

        <UserContextProvider>
            <AllPropertiesContextProvider>
                <div className="dashboard-grid-container">
                    <div className="item1">
                        <TenantTabs />
                    </div>
                    <div className="item2">
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