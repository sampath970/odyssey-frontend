import React from 'react'
import Document from "../../../../public/assets/icons/blue-folder.svg"
import CompletedForms from "../../../../public/assets/icons/yellow-folder.svg"
import "./household-unity-network.scss"
const UnitDocuments = (props) => {
    console.log(props)
    const {tenantInfo,unitInfo,propertyInfo,updateModalId,setActiveTenant,activeHeadOfHousehold,currentFlow} = props;
    if (!unitInfo && !tenantInfo) return;
  return (
    <div className="household-unity-network">
      <div className="unit-documents__site-map">
        <span onClick={() => updateModalId("documents")}>{currentFlow==="management" ? "ManagementOnly" : "Tenant Archive"}</span>
        {" > "}
        <span onClick={() => updateModalId("unit_no")}>{unitInfo?.unit_id}</span>
        {" > "}
        <span onClick={() => updateModalId("head_of_house_hold")}>{`${activeHeadOfHousehold?.first_name}`}</span> {/*activeHeadOfHousehold?.last_name*/}
        {" > "}
      </div>
            <div className="household-unity-network__documents">
                {tenantInfo.map(_tenant=>
                    
              <div
                className="household-unity-network__documents-wrapper"
                onClick={() => {
                  updateModalId("all_documents");
                  setActiveTenant(_tenant)
                }}>
                <Document />
                <label className="household-unity-network__form-name">{`${_tenant?.first_name ? _tenant?.first_name : ""} ${_tenant?.last_name ? _tenant?.last_name : ""}`}</label>
              </div>
                    )}
            </div>
          </div>
  )
}

export default UnitDocuments
