"use client"
import React from 'react'
import Form from '../../../../forms/[tenant_id]/page'

const ReviewForm = (props) => {
    const {params,searchParams} = props; 
    let tenantID = params.tenant_id;
    let { form_id: formID, rental_id: rentalID, unit_id: unitID, property_id: propertyID } = searchParams;
  return (
    <div>
      <Form rentalId={rentalID} tenantId={tenantID} qaID={formID} unitID={unitID} propertyID={propertyID}/>
    </div>
  )
}

export default ReviewForm
