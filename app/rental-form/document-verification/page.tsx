"use client";
import React from "react";
import "./document-verification.scss";
import { useAllProperties } from "../../../services/hooks/useAllProperties";
import TenantProofsUpload from "../../../components/tenant-proofs-upload/tenant-proofs-upload";
import ProofsUploaded from "../../dashboard/property-details/proofs-uploaded/proofs-uploaded";

const DocumentVerification: React.FC = () => {
  const { activeRental, activeTenant, activeProperty } = useAllProperties();
  let propertyID = activeProperty?.map((_property) => _property.property_id);
  let currentProperty =
    propertyID && propertyID.length > 0 ? propertyID[0] : null;

  return (
    <>
      <div className="document-verification">
        <ProofsUploaded
          propertyInfo={currentProperty && currentProperty}
          tenantInfo={activeTenant}
          unitInfo={activeRental}
          flow = {"tenant"}
        />
      </div>
    </>
  );
};

export default DocumentVerification;
