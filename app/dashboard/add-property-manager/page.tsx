"use client";
import React, { useState } from "react";
import AddTenant from "../tenant-section/add-tenant/add-tenant";
import "./add-property-manager.scss";

const AddPropertyManager = (props) => {
  const [addStatus, setAddStatus] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(false);
  return (
    <div className="add-property-manger-header">
      <AddTenant
        addPropertyManagerFlow={true}
        role="property_manager"
        onClose={()=>props.setShowPropertyManagerAdd(false)}
        addStatus={addStatus}
        setAddStatus={setAddStatus}
        deleteStatus={deleteStatus}
        setDeleteStatus={setDeleteStatus}
      />
    </div>
  );
};

export default AddPropertyManager;
