"use client";
import React, { useState } from "react";
import ReviewDocuments from "../../rental-form/review-documents/[review_id]/page";
import ProofsUploaded from "../../dashboard/property-details/proofs-uploaded/proofs-uploaded";
import { useUserInfo } from "../../../services/hooks/useUserInfo";
import { useAllProperties } from "../../../services/hooks/useAllProperties";
import "./my-documents.scss";
const MyDocuments = () => {
  const { userInfo } = useUserInfo();
  const [activeItem, setActiveItem] = useState(0);
  const { activeRental, activeTenant, activeProperty } = useAllProperties();
  console.log(activeProperty);
  console.log(activeTenant);
  console.log(activeRental);
  if (
    activeRental === null &&
    activeProperty === null &&
    activeProperty === null
  )
    return null;
  let extraProofStyles = {
    maxWidth: "none",
  };
  return (
    <div className="my-documents">
      <ReviewDocuments
        activeRental={activeRental}
        activeTenant={activeTenant}
        activeProperty={activeProperty}
      />
      <div className="my-documents__proofs-upload">
        <ProofsUploaded
          unitInfo={activeRental}
          tenantInfo={activeTenant}
          propertyInfo={
            activeProperty &&
            activeProperty.length > 0 &&
            activeProperty[0]?.property_id
          }
          flow="tenant"
          extraProofStyles={extraProofStyles}
          extraFieldSetStyle={{maxHeight:"none",justifyContent:"center"}}
        />
      </div>
    </div>
  );
};

export default MyDocuments;
