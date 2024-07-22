"use client";
import React, { useEffect, useState } from "react";
import QuestionnaireAdapter from "../../../services/adapters/questionnaire-adapter";
import FormEditableText from "../../../components/form-editable-text/form-editable-text";
import FormEditor from "../../dashboard/form-mapping/form-editor/form-editor";
import { useUserInfo } from "../../../services/hooks/useUserInfo";
import { useAllProperties } from "../../../services/hooks/useAllProperties";
import PropertyAdapter from "../../../services/adapters/properties-adapter";
import MappingAdapter from "../../../services/adapters/mapping-adapter";
import { getFileName } from "../../../utils/string-utils";

interface PropertyFormProps {
  // params: {
  //   tenant_id: string;
  // };
  // searchParams: {
  //   search: any;
  // };
  tenantId?:string;
  rentalId?:string;
  formId?:any;
  unitID?:any;
  property_id?:any;
  flow?:any;
}
const TenantForm: React.FC<PropertyFormProps> = (props) => {
  // const extractTenantAndRentalIds = (inputString) => {
  //   const match = inputString.match(/([\w-]+)Rental([\w-]+)/);

  //   if (match) {
  //     const tenantId = match[1];
  //     const rentalId = match[2];
  //     return { tenantId, rentalId };
  //   } else {
  //     return { tenantId: null, rentalId: null };
  //   }
  // };

  const { tenantId,rentalId,formId,unitID="",property_id="",flow="" } = props;
  const parts = props.formId.split('/');
  const secondLast = parts[parts.length - 2];
  const last = parts[parts.length - 1];

  // const { tenantId, rentalId } = extractTenantAndRentalIds(params.tenant_id);
  console.log(props)
  const [currentFile, setCurrentFile] = useState("");
  const [propertyID, setPropertyID] = useState("");
  const [mappedForm,setMappedForm] = useState("")
  useEffect(() => {
    const fetchRentalInfo = async (id) => {
      if (rentalId !== "") {
        const rentalInfo = await PropertyAdapter.getPropertyByRentalID(id);
        setPropertyID(rentalInfo?.[0].property_id || "");
      }
    };
    fetchRentalInfo(rentalId);
  }, [rentalId]);
  console.log(propertyID)
  const { userInfo } = useUserInfo();
  let formTitle = ""
  if (userInfo && flow === "") {
    formTitle = `${userInfo?.id}/${last}`
  }else if(userInfo && flow === "table"){
    console.log("flow is table")
  }else{
    console.log("do none")
  }
  console.log(formTitle)
  console.log("userInfo", userInfo)
  useEffect(() => {
    async function getFormData(rentalId) {
      if (rentalId !== "" && propertyID !== "" && flow ==="") {
        let mappingResponse =
          await MappingAdapter.getMappingByFormId(
            formTitle
          );
        console.log(formTitle)
        if (mappingResponse) {
          console.log("mappingResponse", mappingResponse)
          setCurrentFile(formId);
        }
      } else if(rentalId !== "" && propertyID !== "" && flow === "table") {
        let formIDResponse = await QuestionnaireAdapter.getFormDataByQaId(formId,userInfo);
        if(formIDResponse){
          console.log(formIDResponse);
          let _currentForm = `Uploaded_Documents/${property_id}/${rentalId}/${tenantId}/${getFileName(formIDResponse[0]?.form_id)}`
          setCurrentFile(_currentForm);
          setMappedForm(formIDResponse[0]?.form_id)
        }else{
          console.log("no current file found")
        }
      }
    }
    getFormData(rentalId);
  }, [propertyID,userInfo]);
  console.log(mappedForm)
  return (
    <div>
      {(tenantId && propertyID && rentalId && currentFile !== "" && (flow !== "table" || mappedForm !== "")) ?
        <FormEditor
          propertyManagerID={userInfo?.id}
          propertyID={propertyID}
          rentalID={rentalId}
          tenantID={tenantId}
          unitID={unitID}
          currentFile={currentFile}
          setCurrentFile={setCurrentFile}
          mappedForm={flow === "table" ? mappedForm : formTitle}
          flow = "table_flow"
          role="property-page" //Answers will be sent through prop from here
        />
        : null}
    </div>
  );
};

export default TenantForm;
