"use client";
import React, { useEffect, useState } from "react";
import QuestionnaireAdapter from "../../../services/adapters/questionnaire-adapter";
import FormEditableText from "../../../components/form-editable-text/form-editable-text";
import FormEditor from "../../dashboard/form-mapping/form-editor/form-editor";
import { useUserInfo } from "../../../services/hooks/useUserInfo";
import { useAllProperties } from "../../../services/hooks/useAllProperties";
import PropertyAdapter from "../../../services/adapters/properties-adapter";
import { getFileName } from "../../../utils/string-utils";

interface TenantFormProps {
  tenantId?: string;
  rentalId?: string;
  formId?: string;
}
const TenantForm: React.FC<TenantFormProps> = (props: TenantFormProps) => {
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

  // const { params } = props;
  // const { tenantId, rentalId } = extractTenantAndRentalIds(params.tenant_id);

  const { tenantId, rentalId, formId } = props;

  const [currentFile, setCurrentFile] = useState("");
  const [propertyID, setPropertyID] = useState("");
  const [mappedForm,setMappedForm] = useState("");
  useEffect(() => {
    const fetchRentalInfo = async (id) => {
      if (rentalId !== "") {
        console.log(rentalId);
        const rentalInfo = await PropertyAdapter.getPropertyByRentalID(id);
        console.log(rentalInfo);
        setPropertyID(rentalInfo?.[0].property_id || "");
      }
    };
    fetchRentalInfo(rentalId);
  }, [rentalId]);
  const { activeProperty } = useAllProperties();

  const { userInfo } = useUserInfo();
  const [formData, setAnswers] = useState<any | null>(null);
  useEffect(() => {
    async function fetchAnswers(tenant_id: string, rental_id: string) {
      const data = await QuestionnaireAdapter.getAnswersByTenantID(
        tenant_id,
        rental_id
      );
      console.log(data);
      if (data && data[0]) {
        setAnswers(data[0]);
      }
    }
    fetchAnswers(tenantId, rentalId);
  }, [tenantId]);
  useEffect(() => {
    async function getFormData() {
      if (userInfo && rentalId === "") {
        //TODO : this function is not in use as per the conditions, it would be removed later
        let response = await QuestionnaireAdapter.getFormDataByQaId(
          formId,
          userInfo
        );
        if (response) {
          console.log(response);
          setCurrentFile(response[0].form_id);
        }
      } else {
        if (rentalId && propertyID !== "") {
          console.log(rentalId);
          console.log(formId);
          let mappingResponse =
            await QuestionnaireAdapter.getFormDataByQaIdAndPropertyId(
              formId,
              propertyID
            );
          if (mappingResponse) {
            let _currentForm = `Reviewed_Documents/${propertyID}/${rentalId}/${tenantId}/${getFileName(mappingResponse[0]?.form_id)}`
            setCurrentFile(_currentForm);
            setMappedForm(mappingResponse[0]?.form_id)
          }
        }
      }
    }
    getFormData();
  }, [propertyID]);
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
  return (
    <div>
      {tenantId && propertyID && rentalId && currentFile && mappedForm ? (
          <FormEditor
            propertyID={propertyID}
            rentalID={rentalId}
            tenantID={tenantId}
            currentFile={currentFile}
            mappedForm={mappedForm}
            setCurrentFile={setCurrentFile}
            role="tenant-page"
            answers={formData && formData?.answer} //Answers will be sent through prop from here
          />
      ) : null}
    </div>
  );
};

export default TenantForm;
