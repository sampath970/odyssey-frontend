"use client";
import React, { useEffect, useState } from "react";
import { getFileName } from "../../../../utils/string-utils";
import Folder from "../../../../public/assets/icons/pdf.svg";
import "./review-documents.scss";
import { useAllProperties } from "../../../../services/hooks/useAllProperties";
import { useRouter } from "next/navigation";


const ReviewDocuments = (props) => {
  const [reviewedForms, setReviewedForms] = useState([]);
  const { activeProperty, activeTenant, activeRental } = props;
  const filterReviewForms = (forms: any[]) => {
    let formsReviewed = forms.filter((_forms) => _forms?.status === "review");
    return formsReviewed;
  };
  const router = useRouter();
    const navigateToForm = (form_id: string, tenant_id: string, rental_id: string) => {
    router.push(`/users-dashboard/tenant_sign_page/${form_id}`)
    // const url = `/tenant-forms/${tenant_id}Rental${rental_id}?search=${form_id}`;
    // window.open(url, "_blank");
  };

  useEffect(() => {
    const getRequiredFormsForTenant = (property: any, tenantId: string) => {
      const tenantProperty = property?.find((prop: any) => prop.tenant_id.includes(tenantId));
      console.log(tenantProperty)
      if (tenantProperty) {
        let requiredFormsForTargetTenant = tenantProperty.requiredQAs.map((qa: any) => qa.requiredForms);
        const flattenedForms = [].concat(...requiredFormsForTargetTenant);
        let reviewedForms = filterReviewForms(flattenedForms);
        setReviewedForms(reviewedForms);
      } else {
        return [];
      }
    };

    getRequiredFormsForTenant(activeProperty, activeTenant);
  }, [activeProperty, activeTenant]);

  return (
    <div className="review-documents">
      <fieldset className="review-documents__wrapper">
        <legend className="review-documents__header">Review documents</legend>
        {reviewedForms &&
          reviewedForms.map((forms: any, index: number) => (
            <div key={index}>
              <div
                className="review-documents__folders-wrapper"
                onClick={() => navigateToForm(forms.formID, activeTenant, activeRental)}
              >
                <div>
                  <Folder />
                </div>
                <div className="review-documents__folders-label">{getFileName(forms.title)}</div>
              </div>
            </div>
          ))}
      </fieldset>
    </div>
  );
};

export default ReviewDocuments;
