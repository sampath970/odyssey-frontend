"use client";
import React, { useEffect, useState } from "react";
import QuestionnaireAdapter from "../../../services/adapters/questionnaire-adapter";
import FormEditableText from "../../../components/form-editable-text/form-editable-text";
import FormEditor from "../../dashboard/form-mapping/form-editor/form-editor";
import { useUserInfo } from "../../../services/hooks/useUserInfo";

interface FormProps {
  params?: {
    tenant_id: string;
  };
  searchParams?: {
    search: any;
  };
  rentalId?: any;
  tenantId?: any;
  qaID?: any;
  unitID?:any;
  propertyID?:any;
}

const Form: React.FC<FormProps> = (props) => {
  const extractTenantAndRentalIds = (inputString) => {
    const match = inputString.match(/([\w-]+)Rental([\w-]+)/);

    if (match) {
      const tenantId = match[1];
      const rentalId = match[2];
      return { tenantId, rentalId };
    } else {
      return { tenantId: null, rentalId: null };
    }
  };
  console.log(props);
  // const { tenantId, rentalId } = extractTenantAndRentalIds(params.tenant_id);
  const { tenantId, rentalId, qaID,unitID,propertyID } = props;
  console.log(tenantId);
  console.log(rentalId);
  const [currentFile, setCurrentFile] = useState("");
  const { userInfo } = useUserInfo();
  const [formData, setAnswers] = useState<any | null>(null);
  useEffect(() => {
    async function fetchAnswers(tenant_id: string, rental_id: string) {
      console.log(tenant_id);
      console.log(rental_id);
      const data = await QuestionnaireAdapter.getAnswersByTenantID(
        tenant_id,
        rental_id
      );
      console.log(data);
      console.log(data?.[0]);
      if (data && data[0]) {
        setAnswers(data[0]);
      }
    }
    fetchAnswers(tenantId, rentalId);
  }, [currentFile]);
  useEffect(() => {
    console.log(userInfo);
    async function getFormData() {
      if (userInfo) {
        let response = await QuestionnaireAdapter.getFormDataByQaId(
          //searchParams.search is a qaID
          qaID,
          userInfo
        );
        if (response) {
          console.log(response);
          setCurrentFile(response[0]?.form_id);
        }
      }
    }
    getFormData();
  }, [userInfo]);
  console.log(formData);

  console.log(currentFile);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    action: "edit" | "save"
  ) => {
    try {
      const { name, value } = e?.target;
      setAnswers((prev: any) => {
        return { ...prev, answer: { ...prev.answer, [name]: value } };
      });
    } catch (ex) {
      console.error("Error at handleChange");
    }
    console.log("FORM DATA" + JSON.stringify(formData, null, 2));
    console.log("keys" + Object?.keys(formData?.answer));
  };

  const FillFormData = (field_name: string, minWidth: any) => {
    return (
      <FormEditableText
        value={formData?.answer[field_name]}
        setValue={handleChange}
        name={field_name}
        fieldWidth={minWidth}
      />
    );
  };
  console.log(formData);
  //console.log(formData.answer)
  return currentFile !== "" && currentFile !==undefined ? (
    <div>
      <FormEditor
        currentFile={currentFile}
        setCurrentFile={setCurrentFile}
        role="rental-page"
        formID={qaID}
        rentalID={rentalId}
        tenantID={tenantId}
        propertyID={propertyID}
        unitID={unitID}
        answers={formData && formData?.answer}
        mappedForm={currentFile} //Answers will be sent through prop from here
      />
    </div>
  ) : null;
};

export default Form;
