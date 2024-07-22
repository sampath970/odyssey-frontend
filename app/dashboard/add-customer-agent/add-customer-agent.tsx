"use client";
import React, { useState } from "react";
import AddTenant from "../tenant-section/add-tenant/add-tenant";
import "./add-customer-agent.scss";

const AddCustomerAgent = (props) => {
  const [addStatus, setAddStatus] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(false);
  return (
    <div className="add-property-manger-header">
      <AddTenant
        addCustomerAgentFlow={true}
        role="customer_support_agent"
        onClose={()=>props.setShowCustomerAgentAdd(false)}
        addStatus={addStatus}
        setAddStatus={setAddStatus}
        deleteStatus={deleteStatus}
        setDeleteStatus={setDeleteStatus}
      />
    </div>
  );
};

export default AddCustomerAgent;
