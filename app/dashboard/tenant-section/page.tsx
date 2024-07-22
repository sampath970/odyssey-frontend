"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AppConfig from "../../../config/application.config";
import TableView from "../../../components/table/table";
import Button from "../../../components/button/button";
import "./tenant-section.scss";
import Modal, { ModalTypes } from "../../../components/modal/modal";
import AddTenant from "./add-tenant/add-tenant";
import Input from "../../../components/input/input";
import Close from "../../../public/assets/icons/close.svg";
import { useAllTenants } from "../../../services/hooks/useAllTenants";
import TenantAdapter from "../../../services/adapters/tenants-adapter";
const TenantSection = () => {
  const { allTenants } = useAllTenants();
  const [addStatus, setAddStatus] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(false);
  let allTenantFilter = [];
  if (Array.isArray(allTenants) && allTenants.length !== 0) {
    allTenants.forEach((x) => {
      if (x.role === "tenant") {
        allTenantFilter.push({
          resident_id: x.resident_id,
          unit_no: x.unit_number,
          first_name: x.first_name,
          last_name: x.last_name,
          tel_number: x.tel_number,
          email: x.email,
          id: { id: x.id, type: "private" },
        });
      }
    });
  }

  console.log("allTenants", allTenants);

  const handleAddTenantClose = () => {
    try {
      setShowAddTenant(false);
      setAddStatus(false);
      setDeleteStatus(false);
    } catch (ex) {
      console.error("Error at handleAddTenantClose");
    }
  };

  const handleEditTenantClose = () => {
    try {
      setShowAddTenant(false);
    } catch (ex) {
      console.error("Error at handleEditTenantClose");
    }
  };
  const handleAddTenant = () => {
    try {
      setModalTitle("Add Tenant");
      setShowAddTenant(true);
      setTenantInfo({});
      //setTenantActionText("Add Tenant")
      setIsAddTenantFlow(true);
    } catch (ex) {
      console.error("Error at handleAddTenant");
    }
  };
  const handleAddPropertyManager = () => {
    try {
      setModalTitle("Add Property Manager");
      setShowAddTenant(true);
      setTenantInfo({});
      //setTenantActionText("Add Tenant")
      setIsAddTenantFlow(true);
    } catch (ex) {
      console.error("Error at handleAddPropertyManager");
    }
  };
  // const handleAddTenant = () => {
  //   setShowAddTenant(true);
  // };
  const handleBulkUpload = () => {
    try {
    } catch (ex) {
      console.error("Error at handleBulkUpload");
    }
  };

  const handleEditClick = (data) => {
    setModalTitle("Edit Tenant");
    setShowAddTenant(true);
    let currentTenant = allTenants.find((_tenant) => _tenant.id == data.id.id);
    setTenantInfo(currentTenant);
    setTenentActionText("Edit Tenant");
    setIsAddTenantFlow(false);
    // setIsEditTenantFlow(true);
  };
  const [tenantActionText, setTenentActionText] = useState("Add Tenant");
  const [shouldShowAddTenant, setShowAddTenant] = useState(false);
  const [modalTitle, setModalTitle] = useState("Add Tenant");
  const [tenantInfo, setTenantInfo] = useState(null);
  const [isAddFlow, setIsAddTenantFlow] = useState(true);
  // const [isEditFlow, setIsEditTenantFlow] = useState(true);
  const determineModalSize = () => {
    if (deleteStatus) {
      console.log(deleteStatus);
      return ModalTypes.Medium;
    } else if (addStatus) {
      console.log(addStatus);
      return ModalTypes.Medium;
    } else {
      return ModalTypes.Xlarge;
    }
  };

  console.log(addStatus);
  console.log(deleteStatus);
  return (
    <div data-testid="tenant-section" className="tenant-section">
      <TableView
        showAddNewButton={true}
        showAddBulkUpload={false}
        onViewDetails={handleEditClick}
        showViewDetails={() => true}
        showSerialNumber={false}
        addNew={handleAddTenant}
        secondaryButtonClick={handleBulkUpload}
        tableName="Tenants"
        dataTestId="tenant-table"
        tableHeader={[
          { text: "Resident ID Number", key: "resident_id", type: "string" },
          { text: "Unit Number", key: "unit_no", type: "string" },
          { text: "Resident First Name", key: "first_name", type: "string" },
          //  { text: "Resident Middle Nam", key: "mobile", type: "number" },
          { text: "Resident Last Name", key: "last_name", type: "string" },
          //{ text: "Relationship", key: "relationship", type: "string" },
          // { text: "Race", key: "action", type: "none" },
          // { text: "Ethnicity", key: "profile", type: "image" },
          // { text: "Address", key: "name", type: "string" },
          // { text: "City", key: "email", type: "string" },
          // { text: "State", key: "mobile", type: "number" },
          // { text: "Status", key: "status", type: "string" },
          // { text: "Postal Code", key: "renewal_date", type: "date" },
          // { text: "County", key: "action", type: "none" },
          // { text: "Nation/Country", key: "profile", type: "image" },
          // { text: "Disabled Status", key: "name", type: "string" },
          // { text: "Student Status", key: "email", type: "string" },
          //{ text: "Date of Birth", key: "mobile", type: "number" },
          { text: "Telephone Number", key: "tel_number", type: "tel" },
          { text: "Email Address", key: "email", type: "email" },
          // { text: "Identification Number", key: "action", type: "none" },
          // { text: "Identification State", key: "status", type: "string" },
          // { text: "Social Security Number", key: "status", type: "string" },
          // { text: "Social Security Exception", key: "status", type: "string" },
          // { text: "Household Size", key: "status", type: "string" },
        ]}
        tableData={allTenantFilter}
      />
      <Modal
        dataTestId="tenant-close"
        isOpen={shouldShowAddTenant}
        title={modalTitle}
        showCloseButton={!addStatus}
        setOn={handleAddTenantClose}
        size={determineModalSize()}
      >
        <AddTenant
          size={determineModalSize()}
          addTenantFlow={isAddFlow}
          tenantInfo={tenantInfo}
          onClose={handleAddTenantClose}
          setModalTitle={setModalTitle}
          addStatus={addStatus}
          setAddStatus={setAddStatus}
          role={"tenant"}
          deleteStatus={deleteStatus}
          setDeleteStatus={setDeleteStatus}
          flow={isAddFlow ? "tenant_page_add_flow" : ""}
        />
      </Modal>
    </div>
  );
};
export default TenantSection;
