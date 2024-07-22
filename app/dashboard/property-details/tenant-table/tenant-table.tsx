"use client";
import React, { useEffect, useState } from "react";
import Pending from "../../../../public/assets/icons/pending.svg";
import Review from "../../../../public/assets/icons/review.svg";
import Signed from "../../../../public/assets/icons/signed.svg";
import Completed from "../../../../public/assets/icons/signed.svg";
import NotStarted from "../../../../public/assets/icons/not-started.svg";
import Rejected from "../../../../public/assets/icons/red-cross.svg";
import Select from "react-select";
import "./tenant-table.scss";
import Button from "../../../../components/button/button";
import TenantAdapter from "../../../../services/adapters/tenants-adapter";
import Modal from "../../../../components/modal/modal";
import AnimatedCheck from "../../../../components/animated-check/animated-check";
import { AccessPermission, validate } from "../../../_auth/permissions";
import FormTable from "../../../../components/form-table/form-table";
import { useRouter } from "next/navigation";
import MappingAdapter from "../../../../services/adapters/mapping-adapter";
import { findQuestionByCode } from "../../../../utils/form-editor-utils";

const TenantTable = (props) => {
  const [activeTenant, setActiveTenant] = useState({
    label: "Select...",
    value: "",
  });
  const [formInfo, setFormInfo] = useState([]);
  const [filteredFormInfo, setFilteredFormInfo] = useState([]);
  const [deleteFormPopup, setDeleteFormPopup] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [createTask, setCreateTask] = useState(false);
  const [needSync,_setSyncRequired] = useState(false);
  const [activeRentalForTenant,setActiveRentalForTenant] = useState(null)
  const [formFilterByStatus, setFormFilterByStatus] = useState({
    label: "All Tasks",
    value: "",
  });
  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      zIndex: 5,
      fontSize: "0.9rem",
      fontWeight: "200",
    }),
  };
  const router = useRouter();
  const {
    tenantInfo,
    unitInfo,
    activeRental,
    setSyncRequired,
    userInfo,
    _activeTenant,
    propertyID,
    unitID = "",
    firstTimeLaunch,
    setFirstTimeLaunch,
    formList,
  } = props;
  let writeOnlyPermission = validate(
    [AccessPermission.Write],
    userInfo ? userInfo.permissions : { permissions: 0 }
  );
  const getFileIconByStatus = (status) => {
    switch (status) {
      case "pending":
        return <Pending style={{ height: "20px" }} />;
      case "review":
        return <Review style={{ height: "20px" }} />;
      case "signed":
        return <Signed style={{ height: "20px" }} />;
      case "submitted":
        return <Completed style={{ height: "20px" }} />;
      case "reject":
        return <Rejected style={{ height: "20px" }} />;
      case "new":
      default:
        return <NotStarted style={{ marginLeft: "4px", height: "20px" }} />;
    }
  };
  async function getQuestionUsingFieldCode(fieldCodeQuestions, field_code) {
    if (1) {
      let getFieldCodesResponse = await MappingAdapter.fetchQuestionCodes(
        userInfo,
        ""
      );
      if (getFieldCodesResponse) {
        console.log("RESPONSEFIELDNAMES", getFieldCodesResponse);
        findCurrentQuestionByCode(getFieldCodesResponse);
        setSyncRequired(false);
      } else {
        console.log("Fetch question code error");
      }
    }
  }
  useEffect(() => {
    getQuestionUsingFieldCode("", "");
  }, []);

  const findCurrentQuestionByCode = (allQuestionCodes) => {
    //standard field with type file
    let currentQuestion = allQuestionCodes.find(
      (question) => question.question_code === "RP_UPLOAD"
    );
    setCurrentQuestion(currentQuestion);
  };
  const getFormsForMapping = (_forms, formList) => {
    let updatedForms = _forms.map((tableFormItem) => {
      const correspondingFormItem = formList.find(
        (formItem) => formItem.qaId === tableFormItem.formID
      );
      if (correspondingFormItem) {
        const hasSigned = correspondingFormItem.hasSigned;
        const qaName = correspondingFormItem?.qaName;
        return { ...tableFormItem, hasSigned, qaName };
      } else {
        const qaName = tableFormItem?.title;
        return { ...tableFormItem, qaName };
      }
    });
    return updatedForms;
  };

  const tenantOptions =
    tenantInfo &&
    tenantInfo.map((_tenant) => ({
      label: `${_tenant.first_name}`,
      value: _tenant.id,
    }));

  async function getFormsByTenantId(tenantId, unitInfo) {
    const tenantRentalResponse = await TenantAdapter.getRentalByTenantId(tenantId);
    if(tenantRentalResponse && unitInfo){
      let currentRentalIdForTenantAsPerUnit = tenantRentalResponse.find(rental=>rental.unit_id === unitInfo?.id);
      let _rentalId = currentRentalIdForTenantAsPerUnit.id;
      setActiveRentalForTenant(_rentalId)
    }
    const matchingQA = unitInfo.requiredQAs?.find(
      (qa) => qa.tenant_id === tenantId
    );
    if (matchingQA && matchingQA !== undefined) {
      let forms = getFormsForMapping(matchingQA?.requiredForms,formList);
      setFormInfo(forms);
      return true;
    } else {
      setFormInfo([]);
      return false;
    }
  }

  useEffect(() => {
    if (unitInfo) {
      if (getFormsByTenantId(activeTenant.value, unitInfo)) {
        console.log("Refetching done to get latest forms");
      } else {
        console.log("Refetching not done to get latest forms");
      }
    }
  }, [unitInfo]);
  const getNameForTenant = (_id, tenantInfo) => {
    let _currentTenant = tenantInfo.find((_tenant) => _tenant.id === _id);
    let _first_name = _currentTenant?.first_name;
    if (
      _first_name !== "" &&
      _first_name !== null &&
      _first_name !== undefined
    ) {
      setFirstTimeLaunch(false);
      return _first_name;
    } else {
      return "";
    }
  };
  const handleTenantChange = (_tenant) => {
    if (_tenant?.value) {
      setActiveTenant(_tenant);
      getFormsByTenantId(_tenant.value, unitInfo);
    } else if (_tenant === null) {
      setActiveTenant({ value: "", label: "Select..." });
      setFormInfo([]);
      console.log("No tenants found");
    } else {
      console.log("Error at handleTenantChange");
    }
  };
  const handleDeleteForm = async (_formId, _tenantId, _rentalId) => {
    const deleteFormResponse = await TenantAdapter.deleteFormByFormId(
      _tenantId,
      _rentalId,
      _formId
    );
    if (deleteFormResponse) {
      setSyncRequired(true);
      setDeleteFormPopup(true);
    } else {
      console.log("Error deleting form");
    }
  };
  useEffect(() => {
    if (
      _activeTenant &&
      Object.keys(_activeTenant).length !== 0 &&
      tenantInfo &&
      firstTimeLaunch
    ) {
      let _tenantName = getNameForTenant(_activeTenant.id, tenantInfo);
      if (
        _tenantName !== "" &&
        _tenantName !== null &&
        _tenantName !== undefined
      ) {
        handleTenantChange({ label: _tenantName, value: _activeTenant.id });
      } else {
        console.log("Tenant name not found yet");
      }
    } else {
      console.log("Do none");
    }
  }, [_activeTenant, tenantInfo, firstTimeLaunch]);

  const navigateToForm = (
    _formId,
    _tenantId,
    _rentalId,
    _propertyId,
    _unitId
  ) => {
    router.push(
      `/dashboard/property-details/review_form/${_tenantId}/?form_id=${_formId}&rental_id=${_rentalId}&property_id=${_propertyId}&unit_id=${_unitId}`
    );
  };
  const navigateToSignedForm = (
    _formId,
    _tenantId,
    _rentalId,
    _propertyId,
    _unitId
  ) => {
    router.push(
      `/dashboard/property-details/property_manager_sign_form/${_tenantId}/?form_id=${_formId}&rental_id=${_rentalId}&property_id=${_propertyId}&unit_id=${_unitId}&flow=table`
    );
  };
  const formFilterOptions = [
    { label: "New", value: "new" },
    { label: "For review", value: "pending" },
    { label: "Approve", value: "review" },
    { label: "Changes Requested", value: "reject" },
    { label: "For sign / view", value: "signed" },
    { label: "Completed", value: "submitted" },
  ];
  const handleFormFilterByState = (_state) => {
    if (_state !== null) {
      setFormFilterByStatus(_state);
      filterFormInfoByStatus(_state.value, formInfo);
    } else {
      setFormFilterByStatus({ label: "All Tasks", value: "" });
      setFilteredFormInfo([]);
    }
  };
  const filterFormInfoByStatus = (status, _formInfo) => {
    let filteredForms = _formInfo.filter((_form) => _form.status === status);
    if (filteredForms && filteredForms.length !== 0) {
      setFilteredFormInfo(filteredForms);
    } else {
      setFilteredFormInfo([]);
    }
  };
  return (
    <div className="tenant-table__wrapper" style={{margin:createTask ? "0px" : "12px"}}>
      <div className="tenant-table__select-header-wrapper">
        {!createTask && (
          <div>
            <div className="tenant-table__select-header-label">
              Selected Tenant :{" "}
            </div>
            <div>
              <Select
                styles={customStyles}
                defaultValue={activeTenant}
                options={tenantOptions}
                value={activeTenant}
                onChange={(category) => handleTenantChange(category)}
                isClearable={true}
                // placeholder={"Select Tenant"}
                // isLoading={tenantOptions?.length === 0}
                loadingMessage={() => "Loading...."}
              />
            </div>
          </div>
        )}
        {!createTask && (
          <div>
            <div className="tenant-table__select-header-label">
              Selected Task :{" "}
            </div>
            <div>
              <Select
                styles={customStyles}
                defaultValue={formFilterByStatus}
                options={formFilterOptions}
                value={formFilterByStatus}
                onChange={(category) => handleFormFilterByState(category)}
                isClearable={true}
                loadingMessage={() => "Loading...."}
              />
            </div>
          </div>
        )}
        {activeTenant?.value && !createTask && (
          <div
            className="tenant-table__create-label-wrapper"
            onClick={() => setCreateTask(!createTask)}
          >
            <label className="tenant-table__create-label">
              {"+ Create Task"}
            </label>
          </div>
        )}
      
      </div>
      <div>
        {!createTask && <div className="tenant-table__header">Tasks</div>}
        {activeTenant?.value !== "" ? (
          <FormTable
            formInfo={
              formFilterByStatus.value !== "" ? filteredFormInfo : formInfo
            }
            currentQuestion={currentQuestion}
            handleDeleteForm={handleDeleteForm}
            getFileIconByStatus={getFileIconByStatus}
            rentalID={activeRentalForTenant}
            propertyID={propertyID}
            flow="property-manager"
            writeOnlyPermission={writeOnlyPermission}
            userInfo={userInfo}
            tenantID={activeTenant.value}
            navigateToForm={navigateToForm}
            unitId={unitID}
            navigateToSignedForm={navigateToSignedForm}
            createTask={createTask}
            setCreateTask={setCreateTask}
            setSyncRequired={setSyncRequired}
          />
        ) : activeTenant.value === "" ? (
          <div className="tenant-table__no-tasks-wrapper">
            Select Tenants to view tasks
          </div>
        ) : (
          <div className="tenant-table__no-tasks-wrapper">
            No tasks available for this tenant
          </div>
        )}
        {formFilterByStatus.value !== "" &&
          activeTenant.value !== "" &&
          formInfo.length !== 0 &&
          filteredFormInfo &&
          filteredFormInfo.length === 0 && (
            <div className="tenant-table__no-tasks-wrapper">
              {` No ${
                formFilterByStatus.value === "reject"
                  ? "requiring changes requested"
                  : formFilterByStatus.value
              } tasks are available for this tenant`}
            </div>
          )}
      </div>
      <Modal
        isOpen={deleteFormPopup}
        setOn={() => setDeleteFormPopup(false)}
        showCloseButton={false}
      >
        <div className="tenant-table__delete-popup">
          <div>Task has been removed successfully</div>
          <AnimatedCheck />
          <Button
            btnText={"Close"}
            btnTheme="primary"
            btnType="rounded"
            buttonClick={() => setDeleteFormPopup(false)}
            additionalStyles={{ padding: 0 }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default TenantTable;
