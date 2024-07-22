import React from 'react'
import Document from "../../../../public/assets/icons/blue-folder.svg"
import CompletedForms from "../../../../public/assets/icons/yellow-folder.svg"
import "./all-documents.scss"
const AllDocuments = (props) => {
    console.log(props)
    const {tenantInfo,unitInfo,propertyInfo,updateModalId,activeTenant,currentFlow,activeHeadOfHousehold} = props;
    if (!unitInfo) return;
    console.log(activeTenant)
  return (
    <div className="all-documents">
      <div className="unit-documents__site-map">
        <span onClick={() => updateModalId("documents")}>{currentFlow==="management" ? "ManagementOnly" : "Tenant Archive"}</span>
        {" > "}
        <span onClick={() => updateModalId("unit_no")}>{unitInfo?.unit_id}</span>
        {" > "}
        <span onClick={() => updateModalId("head_of_house_hold")}>{`${activeHeadOfHousehold?.first_name}`}</span> {/*activeHeadOfHousehold?.last_name*/}
        {" > "}
        <span onClick={() => updateModalId("all_tenants_linked_with_head_of_household")}>{`${activeTenant?.first_name}`}</span> 
        {" > "}
      </div>
            <div className="all-documents__documents">
            {currentFlow === "tenant-archive" && <div
                className="all-documents__documents-wrapper"
                onClick={() => {
                  updateModalId("proofs_uploaded");
                }}>
              <CompletedForms />
                <label className="all-documents__form-name">
                  Completed
                </label>
              </div>}
            {/* {currentFlow === "tenant-archive" && <div
                className="all-documents__documents-wrapper"
                onClick={() => {
                  updateModalId("signed_documents");
                }}>
              <CompletedForms />
                <label className="all-documents__form-name">
                  Completed
                </label>
              </div>} */}
            {/* {currentFlow === "tenant-archive" && <div
                className="all-documents__documents-wrapper"
                onClick={() => {
                  updateModalId("reviewed_documents");
                }}>
              <Document />
                <label className="all-documents__form-name">
                  For signing
                </label>
              </div>} */}
            {currentFlow === "management" && <div
                className="all-documents__documents-wrapper"
                onClick={() => {
                  updateModalId("proofs_uploaded");
                }}>
              <Document />
                <label className="all-documents__form-name">
                  Documents
                </label>
              </div>}
            </div>
          </div>
  )
}

export default AllDocuments
