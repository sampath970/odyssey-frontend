"use client"
import React, { useState } from 'react'
import RentalForm from '../../../rental-form/[form_id]/page';
import { useUserInfo } from '../../../../services/hooks/useUserInfo';
import { useAllProperties } from '../../../../services/hooks/useAllProperties';
import TenantTabs from '../../../rental-form/components/tenant-tabs/tenant-tabs';
import TenantProofsUpload from '../../../../components/tenant-proofs-upload/tenant-proofs-upload';
import ProofsUploaded from '../../../dashboard/property-details/proofs-uploaded/proofs-uploaded';
import ReviewDocuments from '../../../rental-form/review-documents/[review_id]/page';
import UploadSignature from '../../../rental-form/upload-signature/page';
import "./certification-module.scss"
const CertificationModule = (props) => {
  console.log(props);
  const {userInfo} = useUserInfo();
  const [activeItem,setActiveItem] = useState(0);
  let activeQuestionnaireId = props?.params?.questionnaire_id || "";
  const {activeRental,activeTenant,activeProperty} = useAllProperties();
  console.log(activeRental)
  if (activeRental===null && activeProperty===null && activeProperty===null && activeQuestionnaireId !=="") return null
  return (
    <div className='certification-module'> 
      <div className="certification-module__title">
        <label>Current Certifications</label>
      </div>
      {/* <TenantTabs activeItem={activeItem} setActiveItem={setActiveItem}/> */}
      <div className='certification-module__section-wrapper'>

      {activeItem === 0 && <RentalForm activeRental={activeRental} activeTenant={activeTenant} activeProperty={activeProperty} activeQuestionnaire={activeQuestionnaireId}/>}
      {/* {activeItem === 1 && <ReviewDocuments activeRental={activeRental} activeTenant={activeTenant} activeProperty={activeProperty}/>}
      {activeItem === 2 && <ProofsUploaded unitInfo={activeRental} tenantInfo={activeTenant} propertyInfo={activeProperty[0]?.property_id} flow="tenant" />} */}
      {/* {activeItem === 3 && <UploadSignature activeRental={activeRental} activeTenant={activeTenant} activeProperty={activeProperty} flow="tenant" />} */}
      </div>

    </div>
  )
}

export default CertificationModule;
