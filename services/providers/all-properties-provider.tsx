
import React, { useState, useEffect } from "react";
import { AllPropertiesContext } from "../contexts/properties-context";
import { useUserInfo } from "../hooks/useUserInfo";
import PropertyAdapter from "../adapters/properties-adapter"

export function AllPropertiesContextProvider({ children }) {
    const [allProperties, setAllProperties] = useState([]);
    const [activeProperty, setActiveProperty] = useState(null);
    const [activeRental, setActiveRental] = useState(null);
    const [activeTenant, setActiveTenant] = useState(null);
    const [refreshProperties, setRefreshProperties] = useState(false);
    const { userInfo } = useUserInfo();
    useEffect(() => {
        async function fetchAllProperties() {
           let data = await PropertyAdapter.fetchAllProperties(userInfo);
            setAllProperties(data);
        }
        if(userInfo?.sub || refreshProperties){
            fetchAllProperties();
           setRefreshProperties(false)
        }
     
    }, [userInfo?.sub, refreshProperties]);
    return (
        <AllPropertiesContext.Provider value={{allProperties, setAllProperties, activeProperty, setActiveProperty,activeRental,setActiveRental,activeTenant,setActiveTenant,setRefreshProperties}}>
            {children}
        </AllPropertiesContext.Provider>
    );
}