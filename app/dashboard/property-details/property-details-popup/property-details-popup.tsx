import React, { useEffect } from "react";
import { useState } from "react";
import Document from "../../../../public/assets/icons/blue-folder.svg";
import CompletedForms from "../../../../public/assets/icons/yellow-folder.svg";
import Form from "../../../../public/assets/icons/pdf.svg";
import Checked from "../../../../public/assets/icons/checked.svg";
import Check from "../../../../public/assets/icons/check.svg";
import TenantAdapter from "../../../../services/adapters/tenants-adapter";
import Button from "../../../../components/button/button";
import "./property-details-popup.scss";
import Profile from "../../../../public/assets/icons/profile.svg";
import Remove from "../../../../public/assets/icons/blank-check-box.svg";
import { useAllTenants } from "../../../../services/hooks/useAllTenants";
import Tabs from "../../../../components/tabs/tabs";
import Panel from "../../../../components/tabs/panels";
import TenantInfo from "../tenant-info/tenant-info";
import Modal from "../../../../components/modal/modal";
import AddUnits from "../add-units/add-units";
import PropertyAdapter from "../../../../services/adapters/properties-adapter";
import AnimatedCheck from "../../../../components/animated-check/animated-check";
import TenantTable from "../tenant-table/tenant-table";
import { AccessPermission, validate } from "../../../_auth/permissions";

const getFileName = (name) => {
  if (name) {
    let formattedName = name.split("/")[1] || name;
    return formattedName;
  } else {
    return name;
  }
};

const PropertyDetailsPopup = ({
  form,
  handleSelect,
  setRequiredQA,
  unitInfo,
  propertyInfo,
  updateModalId,
  handleAddTenant,
  tenantInfo,
  needSync,
  syncProperty,
  userInfo,
  autoAssign,
  selectedPopupIndex,
  setSelectedPopupIndex,
  setUnitDetail,
  modalID,
  setActiveTenant,
  activeTenant,
  unAuthorisedError,
  setUnAuthorisedError,
  currentFlow,
  setCurrentFlow,
  _activeTenant,
  propertyID,
  unitID = "",
  firstTimeLaunch = false,
  setFirstTimeLaunch,
}) => {
  useEffect(() => {
    if (tenantInfo) {
      let activeTenants = tenantInfo;
      setTenants(activeTenants);
    } else {
      console.error("Tenant information is missing or invalid.");
    }
  }, [tenantInfo]);
  const { allTenants } = useAllTenants();
  let activeTenants = tenantInfo;
  activeTenants = activeTenants.map((tenant) => ({
    ...tenant,
    checked: false,
  }));
  const [tenants, setTenants] = useState(activeTenants);
  const [showEditUnit, setShowEditUnit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteUnitStatus, setDeleteUnitStatus] = useState(false);
  const [editUnitStatus, setEditUnitStatus] = useState(false);
  const [selectedIdOption, setSelectedIdOption] = useState({
    value: null,
    label: "Select Tenant to Assign",
  });
  const [progress, setProgress] = useState(0);
  const handleChange = (index) => {
    console.log(index);
    setSelectedPopupIndex(index);
  };
  const handleHideEditUnit = () => {
    try {
      setShowEditUnit(false);
    } catch (ex) {
      console.log("Error at handleHideEditUnit");
    }
  };
  const handleDeleteUnit = () => {
    try {
      setUnitDetail(false);
      // setShowDeleteModal(false);
    } catch (ex) {
      console.log("Error at handleHideEditUnit");
    }
  };
  const OnEditUnit = () => {
    setShowEditUnit(true);
  };
  const onDeleteUnit = () => {
    setShowDeleteModal(true);
  };
  const onConfirmDeleteModal = async () => {
    try {
      console.log(unitInfo);
      console.log(userInfo);
      console.log(propertyInfo);
      let delete_result = await PropertyAdapter.deleteUnit(
        propertyInfo,
        unitInfo,
        userInfo
      );
      console.log(delete_result);
      if (delete_result.id) {
        setShowDeleteModal(false);
        setDeleteUnitStatus(true);
        syncProperty(true);
      }
    } catch (ex) {
      console.error("Error at onConfirmDeleteModal");
    }
  };
  let idOption = [];
  if (Array.isArray(allTenants)) {
    idOption = allTenants.map((_id) => ({
      value: _id.id,
      label: _id.first_name + " " + _id.last_name + " " + `(${_id.email})`,
    }));
  } else {
    console.error("allTenants is not an array");
  }
  const filteredIdOptions = idOption.filter(
    (_tenant) => _tenant.label !== "undefined undefined (undefined)"
  );
  const handleAssign = async () => {
    setProgress(20);
    try {
      // Get move in data from Tenant.
      let tenant_data = allTenants.find(
        (_tenant) => _tenant.id === selectedIdOption.value
      )
      let rental_info = {
        rental_id: unitInfo.rental_id,
        tenant_id: selectedIdOption.value,
        property_id: propertyInfo?.id,
        unit_number: unitInfo?.unit_number ? unitInfo?.unit_number : unitInfo?.unit_id, // old records have unit_number in unit_id.
        unit_id: unitInfo?.id,
        // Add move in data from tenant.
        move_in_date: tenant_data?.move_in_date,
        certification_date: tenant_data?.certification_date,
      };
       setProgress(40)
      // Check if both tenantId and rentalId are valid
      if (rental_info.tenant_id && rental_info.unit_id) {
        const data = await TenantAdapter.assignTenant(rental_info);

        // Check if the assignment was successful
        if (data) {
          syncProperty(!needSync);
          setSelectedIdOption({ value: "", label: "Select Tenant to Assign" });
        } else {
          console.error("Error assigning unit");
        }
      } else {
        console.error("Invalid tenantId or rentalId.");
      }
      setProgress(100)
    } catch (ex) {
      console.error("Error in handleAssign", ex);
    }
  };
  const checkedForm = form.filter((_form: any) => _form.checked == true);
  const documentsLength = checkedForm.length;
  const toggleChecked = (id) => {
    const newTenants = [...tenants];
    const checkedTenants = newTenants.find((_tenant) => _tenant.id === id);
    checkedTenants.checked = !checkedTenants.checked;
    setTenants(newTenants);
  };
  const checkedTenantsLength = tenants.filter(
    (_tenant) => _tenant.checked
  ).length;
  const handleRequestQA = () => {
    const checkedTenants = tenants.filter((_tenant) => _tenant.checked);
    const resultedTenantIds = checkedTenants.map((_tenantIds) => _tenantIds.id);
    console.log(resultedTenantIds);
    console.log(unitInfo);
    try {
      setRequiredQA(unitInfo.rental_id, resultedTenantIds);
    } catch (ex) {
      console.error("Error in handleRequestQA");
    }
  };
  return (
    <>
      <div className="property-details__popup">
        {!deleteUnitStatus && (
          <Tabs
            additionalStyles={{ margin: "14px 14px 0 14px" }}
            selectedIndex={selectedPopupIndex}
            handleChange={handleChange}
          >
            <Panel title="Unit info" onClick={() => { }}>
              <div
                className="property-details__row"
                style={{ marginTop: "12px", padding: "12px" }}
              >
                <div className="property-details__popup-section-two">
                  <div className="property-details__popup-unit-wrapper">
                    <div className="property-details__popup-unit-number">
                      <div className="property-units">Unit Number </div>
                      <div className="statuses">:</div>
                      <div className="property-units-status">
                        {unitInfo?.unit_id}
                      </div>
                    </div>
                    <div className="property-details__popup-unit-type">
                      <div className="property-popups">Unit Type</div>{" "}
                      <div className="popups">:</div>
                      <div className="property-popups-type">
                        {unitInfo?.unit_type}
                      </div>
                    </div>
                    <div className="property-details__popup-address-wrapper">
                      <div className="property-adresses">Address</div>{" "}
                      <div className="adresses">:</div>{" "}
                      <div className="property-adresses-status">
                        {propertyInfo?.address},{propertyInfo?.city},
                        {propertyInfo?.state},{propertyInfo?.postalcode},
                        {propertyInfo?.country?.label}
                      </div>
                    </div>
                    {/* <div className="property-details__popup-certification-status">
                  <div className="property-certification">Certification status</div>{" "}
                  <div className="certifiactions"> : </div>
                  <div className="property-status">
                    {unitInfo?.certification_status}
                  </div>
                </div> */}
                    <div className="property-details__popup-certification-status">
                      <div className="property-certification">
                        Tenants count
                      </div>{" "}
                      <div className="certifiactions"> : </div>
                      <div className="property-status">
                        {tenantInfo?.length}
                      </div>
                    </div>
                    <div className="property-details__popup-certification-status">
                      <div className="property-certification">
                        No of Bedrooms
                      </div>{" "}
                      <div className="certifiactions"> : </div>
                      <div className="property-status">
                        {unitInfo?.bedroom_count}
                      </div>
                    </div>
                    <div className="property-details__popup-certification-status">
                      <div className="property-certification">
                        No of Bathrooms
                      </div>{" "}
                      <div className="certifiactions"> : </div>
                      <div className="property-status">
                        {unitInfo?.no_of_bathroom}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <Button
                  btnText="Edit"
                  btnType="outline"
                  btnTheme="primary"
                  buttonClick={OnEditUnit}
                />
                {validate(
                  [AccessPermission.Write],
                  userInfo ? userInfo.permissions : { permissions: 0 }
                ) == true && (
                    <Button
                      btnText={"Delete"}
                      btnTheme="questionnaire-card"
                      btnType="rounded"
                      buttonClick={onDeleteUnit}
                    />
                  )}
              </div>

              <Modal
                isOpen={showEditUnit}
                title={unAuthorisedError ? "" : "Edit Unit Details"}
                showCloseButton={unAuthorisedError ? false : true}
                setOn={() => handleHideEditUnit()}
              >
                <AddUnits
                  editUnitFlow={true}
                  propertyID={propertyInfo?.id}
                  unitId={unitInfo?.id}
                  refetchProperty={syncProperty}
                  buttonText={"Edit unit"}
                  unitInfo={unitInfo}
                  userInfo={userInfo}
                  buttonClick={OnEditUnit}
                  setShowEditUnit={setShowEditUnit}
                  editUnitStatus={editUnitStatus}
                  addUnitStatus={false}
                  setEditUnitStatus={setEditUnitStatus}
                  unAuthorisedError={unAuthorisedError}
                  setUnAuthorisedError={setUnAuthorisedError}
                />
              </Modal>
              <Modal
                isOpen={showDeleteModal}
                title="Delete Unit !"
                showCloseButton={true}
                setOn={() => handleDeleteUnit()}
              >
                <div className="property-details__confirm-delete-pop-up">
                  Are you sure! You want to delete this unit?
                  <div className="popup_footer">
                    <Button
                      additionalStyles={{ padding: 0 }}
                      buttonClick={onConfirmDeleteModal}
                      btnText="Yes"
                      btnType="rectangle"
                      btnTheme="primary"
                    />
                  </div>
                </div>
              </Modal>
            </Panel>
            <Panel title="Tenants" onClick={() => { }}>
              <TenantInfo
                progress={progress}
                setProgress={setProgress}
                tenantInfo={tenantInfo}
                selectedIdOption={selectedIdOption}
                setSelectedIdOption={setSelectedIdOption}
                handleAssign={handleAssign}
                handleAddTenant={handleAddTenant}
                filteredIdOptions={filteredIdOptions}
                updateModalId={updateModalId}
                modalID={modalID}
                setActiveTenant={setActiveTenant}
                activeTenant={activeTenant}
                userInfo={userInfo}
              />
            </Panel>
            <Panel title="Request documents" onClick={() => { }}>
              <div className="property-details__popup-section-three">
                <div className="property-details__popup-form">
                  {form.map((_form) => (
                    <div
                      key={_form?.id}
                      className={
                        _form?.enabled == false
                          ? "property-details__popup-form-wrapper-disabled"
                          : _form?.checked
                            ? "property-details__popup-form-wrapper-active"
                            : "property-details__popup-form-wrapper"
                      }
                      onClick={() => {
                        handleSelect(_form?.id);
                      }}
                    >
                      <div className="property-details__form-wrapper">
                        <Form height={24} width={24} />
                        <label
                          className={
                            _form.enabled == false
                              ? "property-details__form-name-disabled"
                              : "property-details__form-name"
                          }
                        >
                          {/* {getFileName(_form.name)} */}
                          {_form.qaName}
                        </label>
                      </div>
                      {_form.checked ? (
                        <Check className="property-details__popup-form-checked" />
                      ) : null}
                    </div>
                  ))}
                </div>
                <div className="property-details__popup-section-five">
                  <div className="property-details__popup-section-one">
                    <div className="property-details__tenants-icon-wrapper">
                      {tenants?.map((_tenants, index) => (
                        _tenants.email && <div className="icons-wrapper" key={_tenants?.id}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "12px",
                            }}
                          >
                            <div>
                              {_tenants?.checked === true ? (
                                <Checked
                                  className="checked-icon"
                                  onClick={() => toggleChecked(_tenants?.id)}
                                />
                              ) : (
                                <Remove
                                  className="remove-icon"
                                  onClick={() => toggleChecked(_tenants?.id)}
                                />
                              )}
                            </div>
                            <div
                              className="tenants-profile-wrapper"
                              style={{
                                backgroundColor: "rgb(235,235,235)",
                                width: "50%",
                                padding: "12px",
                                display: "flex",
                                gap: "12px",
                                alignItems: "center",
                              }}
                            >
                              <div>
                                <Profile
                                  className="profile-icon"
                                  onClick={() => {
                                    toggleChecked(_tenants?.id);
                                  }}
                                />
                              </div>
                              <div className="first-name">{`${_tenants?.first_name}`}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button
                    testID="property-details-popup-button"
                    buttonClick={handleRequestQA}
                    btnText={
                      documentsLength === 0
                        ? "Select documents to request"
                        : checkedTenantsLength === 0
                          ? "Select atleast one tenant to request"
                          : `Request ${documentsLength} document(s) from ${checkedTenantsLength} tenant(s)`
                    }
                    btnTheme="secondary"
                    btnType="rectangle"
                    buttonStatus={
                      documentsLength === 0 || checkedTenantsLength === 0
                    }
                  />
                </div>
              </div>
            </Panel>
            <Panel title="Documents" onClick={() => { }}>
              <div className="property-details__popup-section-four">
                <div className="property-details__popup-documents">
                  <div
                    className="property-details__popup-documents-wrapper"
                    onClick={() => {
                      updateModalId("unit_no");
                      setCurrentFlow("tenant-archive");
                    }}
                  >
                    <Document />
                    <label className="property-details__form-name">
                      Tenant Archive
                    </label>
                  </div>
                  {/* <div
                    className="property-details__popup-documents-wrapper"
                    onClick={() => {
                      updateModalId("uploaded");
                    }}
                  >
                    <Document className="completed_forms" />
                    <label className="property-details__form-name">Forms</label>
                  </div> */}
                  {/* <div
                className="property-details__popup-documents-wrapper"
                onClick={() => {
                  updateModalId("reviewed_documents");
                }}>
              <Document />
                <label className="property-details__form-name">
                  Completed Forms
                </label>
              </div> */}
                  <div
                    className="property-details__popup-documents-wrapper"
                    onClick={() => {
                      updateModalId("unit_no");
                      setCurrentFlow("management");
                    }}
                  >
                    <CompletedForms />
                    <label className="property-details__form-name">
                      Management Only
                    </label>
                  </div>
                </div>
              </div>
            </Panel>
            <Panel title="Tasks" onClick={() => { }}>
              <TenantTable
                _activeTenant={_activeTenant}
                activeRental={unitInfo?.rental_id}
                unitInfo={unitInfo}
                formList={form}
                tenantInfo={tenantInfo}
                setSyncRequired={syncProperty}
                userInfo={userInfo}
                propertyID={propertyID}
                unitID={unitID}
                firstTimeLaunch={firstTimeLaunch}
                setFirstTimeLaunch={setFirstTimeLaunch}
              />
            </Panel>
          </Tabs>
        )}
      </div>
      {deleteUnitStatus && (
        <div className="Add-btn">
          <div className="popup-text">Your Unit(s) Deleted Successfully!</div>
          <AnimatedCheck />
          <Button
            btnText="Close"
            btnTheme="primary"
            btnType="rounded"
            testID="tenants-button"
            buttonClick={() => {
              setUnitDetail(false);
              setDeleteUnitStatus(false);
            }}
          />
        </div>
      )}
    </>
  );
};

export default PropertyDetailsPopup;
