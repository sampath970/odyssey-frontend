"use client";
import React, { useState } from "react";
import Select from "react-select";
import Profile from "../../../../public/assets/icons/profile.svg";
import AddUser from "../../../../public/assets/icons/plus.svg";
import Close from "../../../../public/assets/icons/close.svg";
import Edit from "../../../../public/assets/icons/edit.svg";
import "./tenant-info.scss";
import AddTenant from "../../tenant-section/add-tenant/add-tenant";
import { AccessPermission, validate } from "../../../_auth/permissions";
import LoadingBar from 'react-top-loading-bar'
const TenantInfo = (props) => {
  console.log(props)
  const [tenantAddSection, setTenantAddSection] = useState(false);
  const [tenantAssignSection, setTenantAssignSection] = useState(false);
  const {
    tenantInfo,
    selectedIdOption,
    setSelectedIdOption,
    handleAssign,
    handleAddTenant,
    filteredIdOptions,
    updateModalId,
    modalID,
    setActiveTenant,
    activeTenant,
    userInfo,
    progress,
    setProgress,
  } = props;
  console.log(activeTenant)
  console.log(tenantAddSection);
  const customTheme = (theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary: "#2f549b",
    },
  });
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      height: "38px",
      fontSize: "0.9rem",
      fontWeight: "200",
    }),
  };
  return (
    <div className="tenant-info">
      <fieldset className="tenant-info__wrapper">
      <LoadingBar color='#32579e' style={{ height: "6px" }} progress={progress} onLoaderFinished={() => setProgress(0)} />
        <legend className="tenant-info__header">Tenant Details</legend>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {tenantInfo &&
            tenantInfo?.map((_tenants) => (
                  <div className="tenant-info__card">
                <div className="tenant-info__card-info">
                  <label className="tenant-info__card-name">
                    {_tenants?.first_name}
                  </label>
                  <label className="tenant-info__card-relation">
                    {_tenants?.relationship?.value}
                  </label>
                </div>
                {validate([AccessPermission.Write], userInfo ? userInfo.permissions : { permissions: 0 }) == true && ( 
                <div className="tenant-info__card-edit" onClick={
                  ()=>{
                    console.log("About to edit the tenant")
                    setActiveTenant(_tenants)
                    updateModalId("edit_tenant")
                  }
                  }>
                  <Edit />
                </div>
                )}
              </div>
            ))}
        </div>
        {validate([AccessPermission.Write], userInfo ? userInfo.permissions : { permissions: 0 }) == true && ( 
          <>
          
        <div className="tenant-info__add-card">
          <div className="tenant-info__add-card-info">
            <div onClick={handleAddTenant} className="tenant-info__add-tenant">
              Add tenant
            </div>
          </div>
        </div>
        <div className="tenant-info__assign">
          <div className="tenant-info__add-card-info">
            <div
              onClick={() => setTenantAssignSection(true)}
              className="tenant-info__add-tenant"
            >
              Assign tenant
            </div>
            {tenantAssignSection && (
              <div className="property-details__tenant-add-division">
                <Close
                  className="tenant-existing-close"
                  onClick={() => setTenantAssignSection(false)}
                />
                <div className="assign-wrapper">
                  <div className="select-go-wrapper">
                    <div className="select-wrapper">
                      <Select
                        defaultValue={selectedIdOption}
                        onChange={(val) => {
                          let data = val;
                          if (val == null) {
                            data = {
                              value: null,
                              label: "Tenant id",
                            };
                          }
                          setSelectedIdOption(data);
                        }}
                        styles={customStyles}
                        theme={customTheme}
                        options={filteredIdOptions}
                        value={selectedIdOption}
                        isClearable={true}
                      />
                      <div></div>
                    </div>
                    <button
                      className="tenant-assign-button"
                      onClick={handleAssign}
                    >
                      Go
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
          </>
        )}
      </fieldset>
    </div>
  );
};

export default TenantInfo;
