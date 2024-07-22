"use client";
import React from "react";
import "./forms-uploaded.scss";
import { useRouter } from "next/navigation";
import TableView from "../../../../components/table/table";
import { useSearchParams } from "next/navigation";
import Form from "../../../../public/assets/icons/pdf.svg";
import ProfileImage from "../../../../components/profile-image/profile-image";
import FloatingMenu from "../../../../components/floating-menu/floating-menu";
import { getFileName } from "../../../../utils/string-utils";
import { useAllProperties } from "../../../../services/hooks/useAllProperties";

const FormsUploaded = (props) => {
  const {activeProperty} = useAllProperties();
  console.log(activeProperty)
  const { formList = [], tenantInfo, unitInfo,rentalId,propertyID } = props;
  const router = useRouter();
  console.log(props)
  console.log(unitInfo)
  console.log(tenantInfo)
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const navigateToForm = (form_id, tenant_id) => {
    router.push(`/dashboard/property-details/review_form/${tenant_id}/?form_id=${form_id}`);
  };
  let available_forms = formList.filter((_form) => _form.available);
  let requiredQAs = unitInfo?.requiredQAs;
  function formatData(inputData) {
    let formattedData = [];
    inputData?.forEach((entry) => {
      entry.requiredForms.forEach((form) => {
        if (!formattedData[form.formID]) {
          formattedData[form.formID] = {
            formID: form.formID,
            title: form.title,
            tenantID: [],
          };
        }
        formattedData[form.formID].tenantID.push({
          tenant_id: entry.tenant_id,
          status: form.status,
        });
      });
    });
    formattedData = Object.values(formattedData);
    return formattedData;
  }
  const formattedData = formatData(requiredQAs);
  console.log(formattedData)
  console.log(available_forms)
  function combineArrays(arr1, arr2) {
    return arr2.map((item2) => {
        const matchingItem1 = arr1.find((item1) => item1.formID === item2.qaId);
        console.log(matchingItem1)
        return {
            formID: item2.formID,
            title: getFileName(item2.name),
            tenantID: matchingItem1 ? matchingItem1.tenantID : [],
            id: item2.id,
            qaId:item2.qaId,
            checked: item2.checked,
            available: item2.available,
            enabled: item2.enabled
        };
    });
}
  const resultArray = combineArrays(formattedData, available_forms);
  console.log(resultArray)
  const getTenantNameFirstLetter = (id) => {
    let tenantsNeeded = [];
    for (let i in tenantInfo) {
      if (tenantInfo[i].id === id) {
        tenantsNeeded.push(tenantInfo[i]);
      }
    }
    let tenantName = tenantsNeeded.map((_tenantName) =>
      _tenantName.first_name.charAt(0)
    );
    return tenantName;
  };
  const getTenantName = (id) => {
    let tenantsNeeded = [];
    for (let i in tenantInfo) {
      if (tenantInfo[i].id === id) {
        tenantsNeeded.push(tenantInfo[i]);
      }
    }
    let tenantFirstLetter = tenantsNeeded.map((_tenantName) =>
      _tenantName.first_name
    );
    return tenantFirstLetter;
  };
  console.log(resultArray)
  const getTenantFormStatusMessage = (status) =>{
    switch (status) {
      case "new":
        return "Form is not submitted yet";
      case  "pending":
        return "Form is ready to approve";
      case "submitted":
        return "Form is ready to download";
      case "review":
        return "Form has been approved successfully"
      case "reject":
          return "Form changes has been requested"
      case "signed":
          return "Form has been signed"
      case "completed":
          return "Form has been completed"
      default :
        return `unknown status`
    }
  }
  return (
    <div className="forms-uploaded">
      {resultArray.map((form, index) => (
        <div key={index} className="forms-uploaded__popup-section-three">
          <div className="available-form">
            <div className="available-form__form">
              <div>
              <Form className="form-icon"/>
              </div>
              {form.title}</div>
            <div style={{ display: "flex", gap: "12px" }}>
              {form.tenantID.map((tenant, tenantIndex) => (
                <div key={tenantIndex}>
                  <div
                    className={
                      tenant.status == "new" ? "tenant" : "tenant-active"
                    }
                    onClick={() => {}}>
                    <FloatingMenu
                      floatDirection="left"
                      marginStyle={{ marginTop: "4px" }}
                      menuTriggerComponent={
                        <ProfileImage
                          status={tenant.status}
                          name={getTenantNameFirstLetter(tenant.tenant_id)}
                          profileClick={() =>
                            navigateToForm(form.qaId, tenant.tenant_id)
                          }
                        />
                      }>
                      <div className="property-details__tenant-name">
                        <div className="tenant-name">{getTenantName(tenant.tenant_id)}</div>
                        <div>{getTenantFormStatusMessage(tenant.status)}</div>
                      </div>
                    </FloatingMenu>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FormsUploaded;
