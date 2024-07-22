"use client";
import React from "react";
import TenantForm from "../../../../property-forms/[tenant_id]/page";

const PropertyManagerSignForm = (props) => {
  const { params, searchParams } = props;
  let tenantID = params.tenant_id;
  let {
    form_id: formID,
    rental_id: rentalID,
    unit_id: unitID,
    property_id: propertyID,
    flow
  } = searchParams;
  return (
    <div>
      <TenantForm
        rentalId={rentalID}
        tenantId={tenantID}
        formId={formID}
        unitID={unitID}
        property_id={propertyID}
        flow = {flow ? flow: ""}
      />
    </div>
  );
};

export default PropertyManagerSignForm;
