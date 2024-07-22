import React, { useEffect, useState } from 'react';
import Document from "../../../../public/assets/icons/blue-folder.svg";
import CompletedForms from "../../../../public/assets/icons/yellow-folder.svg";
import "./head-of-household.scss";

interface TenantInfo {
    relationship: {
        value: string;
    };
    first_name: string;
    last_name: string;
    role: string;
}

interface UnitInfo {
    unit_id?:string;
    //unitInfo properties
}

interface PropertyInfo {
    //propertyInfo properties
}

interface HeadOfHouseholdProps {
    tenantInfo: TenantInfo[];
    unitInfo: UnitInfo;
    propertyInfo: PropertyInfo;
    updateModalId: (modalId: string) => void;
    modalID?:string;
    setActiveHeadOfHouseHold:(fieldObject)=>void;
    currentFlow?:string
}

const HeadOfHouseHold = (props:HeadOfHouseholdProps) => {
    console.log(props);
    const { tenantInfo, unitInfo, propertyInfo, updateModalId,setActiveHeadOfHouseHold,currentFlow } = props;
    const [headOfHouseHolds, setHeadOfHouseHolds] = useState<TenantInfo[]>([]);

    const getHeadOfHouseHold = (_allTenants: TenantInfo[]) => {
        let _headOfHouseHold = _allTenants.filter(_tenant => _tenant.role==="tenant" && _tenant?.relationship?.value === "head_of_household");
        console.log(_headOfHouseHold);
        console.log(_headOfHouseHold)
        setHeadOfHouseHolds(_headOfHouseHold || null);
    };

    if (!unitInfo) return null;

    useEffect(() => {
        if (tenantInfo) getHeadOfHouseHold(tenantInfo);
    }, []);

    return (
        <div className="head-of-household">
            <div className="unit-documents__site-map">
        <span onClick={() => updateModalId("documents")}>{currentFlow==="management" ? "ManagementOnly" : "Tenant Archive"}</span>
        {" > "}
        <span onClick={() => updateModalId("unit_no")}>{unitInfo?.unit_id}</span>
        {" > "}
      </div>
            <div className="head-of-household__documents">
            {headOfHouseHolds.map(_headOfHouseHold=>
                
                <div
                    className="head-of-household__documents-wrapper"
                    onClick={() => {
                        updateModalId("all_tenants_linked_with_head_of_household");
                        setActiveHeadOfHouseHold(_headOfHouseHold)
                    }}>
                    <Document />
                    <label className="head-of-household__form-name">{_headOfHouseHold ? `${_headOfHouseHold.first_name} ${_headOfHouseHold.last_name}` : ""}</label>
                </div>
                )}
                </div>
        </div>
    );
}

export default HeadOfHouseHold;
