import React from "react";
import Document from "../../../../public/assets/icons/blue-folder.svg";
import CompletedForms from "../../../../public/assets/icons/yellow-folder.svg";
import "./unit-documents.scss";
const UnitDocuments = (props) => {
  console.log(props);
  const { tenantInfo, unitInfo, propertyInfo, updateModalId,currentFlow } = props;
  if (!unitInfo) return;
  return (
    <div className="unit-documents">
      <div className="unit-documents__site-map">
        <span onClick={() => updateModalId("documents")}>{currentFlow==="management" ? "ManagementOnly" : "Tenant Archive"}</span>
        {" > "}
      </div>
      <div className="unit-documents__documents">
        <div
          className="unit-documents__documents-wrapper"
          onClick={() => {
            updateModalId("head_of_house_hold");
          }}
        >
          <Document />
          <label className="unit-documents__form-name">
            {unitInfo?.unit_id}
          </label>
        </div>
      </div>
    </div>
  );
};

export default UnitDocuments;
