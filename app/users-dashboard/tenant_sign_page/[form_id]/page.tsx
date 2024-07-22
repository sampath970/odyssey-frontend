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
import TenantForm from '../../../tenant-forms/[tenant_id]/page';
const TenantSignPage = (props) => {
  const {userInfo} = useUserInfo();
  let activeQuestionnaireId = props?.params?.form_id || "";
  const {activeRental,activeTenant,activeProperty} = useAllProperties();
  if (activeRental===null && activeProperty===null && activeProperty===null && activeQuestionnaireId !=="") return null
  return (
    <div className='certification-module'> 
      <div className='certification-module__section-wrapper'>
        <TenantForm rentalId={activeRental} tenantId={activeTenant} formId={activeQuestionnaireId}/>
      </div>

    </div>
  )
}

export default TenantSignPage;