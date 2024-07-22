"use client";
import React, { useEffect, useState } from "react";
import CompletedForms from "../../../../public/assets/icons/yellow-folder.svg";
import "./management_only.scss";
import Label, {
  LabelType,
  LabelVariant,
} from "../../../../components/label/label";
import ProofsUploaded from "../proofs-uploaded/proofs-uploaded";
const ManagementOnly = (props) => {
  const {
    displayUnits,
    handleViewClick,
    getAllActiveTenants,
    activeProperty,
    activeUnit,
  } = props;
  useEffect(()=>{
    let _currentTenants = getAllActiveTenants(activeProperty);
    setAllActiveTenants(_currentTenants);
    filterHOHs(_currentTenants)
  },[activeProperty,activeUnit])
  const [allActiveTenants, setAllActiveTenants] = useState([]);
  const [allActiveHOHTenants, setAllActiveHOHTenants] = useState([]);
  const [currentActiveTenant, setCurrentActiveTenant] = useState(null);
  const [currentActiveHOH, setCurrentActiveHOH] = useState(null);
  const [showAllTenants, setShowAllTenants] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const [showUnits, setShowUnits] = useState(true);
  const [showHoh, setShowHoh] = useState(false);
  const [changeUnit,] = useState(false);
  const filterHOHs = (_tenants) => {
    let _hohs = _tenants.filter(
      (_tenant) =>
        _tenant.relationship &&
        _tenant.relationship.value &&
        _tenant.relationship.value === "head_of_household"
    );
    setAllActiveHOHTenants(_hohs);
  };
  const getActiveUnitDetails = (_unit) => {
    let unitInfo = handleViewClick(_unit);
    if (unitInfo) {
      setShowUnits(false);
      setShowHoh(true);
    } else {
      console.log("no unit info found");
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        className="management-only__site-map"
        style={{ paddingTop: "20px", paddingLeft: "20px" }}
      >
        <span style={{textDecoration:"none"}}>/</span>
        {!showUnits && (
          <span className="management-only__site" onClick={() => {
            setShowDocuments(false);
            setShowAllTenants(false);
            setShowHoh(false);
            setShowUnits(true);
          }}>
            {activeUnit.unit_id} {" > "}
          </span>
        )}
        {!showUnits && !showHoh && (
          <span onClick={() => {
            setShowDocuments(false);
            setShowAllTenants(false);
            setShowHoh(true);
          }}>
            {currentActiveHOH?.first_name} {" > "}
          </span>
        )}
        {!showUnits && !showHoh && !showAllTenants && (
          <span onClick={() => {
            setShowDocuments(false);
            setShowAllTenants(true);
          }}>
            {currentActiveTenant?.first_name} {" > "}
          </span>
        )}
      </div>
      <div className="management-only">
        {showUnits &&
          displayUnits.map((_unit) => (
            <div
              className="management-only__card"
              onClick={() => getActiveUnitDetails(_unit)}
            >
              <CompletedForms />
              <Label
                type={LabelType.Header}
                text={_unit.unit_id}
                variant={LabelVariant.L2}
                overrideTextStyles={{ cursor: "pointer"}}
              />
            </div>
          ))}
        {showHoh &&
          allActiveHOHTenants.map((_tenant) => (
            <div
              className="management-only__card"
              onClick={() => {
                setCurrentActiveHOH(_tenant)
                setShowAllTenants(true);
                setShowHoh(false);
              }}
            >
              <CompletedForms />
              <Label
                type={LabelType.Header}
                text={`${_tenant?.first_name} ${_tenant?.last_name}`}
                variant={LabelVariant.L2}
                overrideTextStyles={{ cursor: "pointer" }}
              />
            </div>
          ))}
        {showAllTenants &&
          allActiveTenants.map((_tenant) => (
            <div
              className="management-only__card"
              onClick={() => {
                setShowAllTenants(false);
                setShowHoh(false);
                setShowDocuments(true);
                setCurrentActiveTenant(_tenant);
              }}
            >
              <CompletedForms />
              <Label
                type={LabelType.Header}
                text={`${_tenant?.first_name} ${_tenant?.last_name}`}
                variant={LabelVariant.L2}
                overrideTextStyles={{ cursor: "pointer" }}
              />
            </div>
          ))}
        {showDocuments && (
          <ProofsUploaded
            propertyInfo={activeProperty}
            activeTenant={currentActiveTenant}
            unitInfo={activeUnit}
            tenantInfo={allActiveTenants}
            flow={"property-manager"}
            extraProofStyles={{ maxWidth: "none",minWidth:"100%" }}
          />
        )}
      </div>
    </div>
  );
};

export default ManagementOnly;
