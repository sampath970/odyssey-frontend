"use client";
import React from "react";
import { useAllProperties } from "../../../services/hooks/useAllProperties";
import SignatureInput from "../../../components/signature-input/signature-input";


const UploadSignature = (props) => {
  const { activeRental, activeTenant, activeProperty } = props;
  let propertyID = activeProperty?.map((_property) => _property.property_id);
  let currentProperty = propertyID && propertyID.length > 0 ? propertyID[0] : null;

  return (
    <div className="upload-signature">
      <SignatureInput
        tenantInfo={activeTenant}
        unitInfo={activeRental}
        propertyInfo={currentProperty}
      />
    </div>
  );
};

export default UploadSignature;
