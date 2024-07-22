
import React, { useState, useEffect } from "react";
import { AllTenantsContext } from "../contexts/tenants-context";
import { useUserInfo } from "../hooks/useUserInfo";
import TenantAdapter from "../adapters/tenants-adapter"

export function AllTenantsContextProvider({ children }) {
    const [allTenants, setAllTenants] = useState([]);
    const [needSync, setSyncRequired] = useState(false);
    const { userInfo } = useUserInfo();
    useEffect(() => {
        async function fetchAllTenants(userInfo) {
            let data = await TenantAdapter.fetchAllTenants(userInfo);
            setAllTenants(data);
        }
        if (userInfo?.sub) {
            fetchAllTenants(userInfo);
        }
    }, [userInfo?.sub,needSync]);
    return (
        <AllTenantsContext.Provider value={{ allTenants, setAllTenants, setSyncRequired }}>
            {children}
        </AllTenantsContext.Provider>
    );
}