import React, { useEffect, useRef, useState } from "react";
import PropertyAdapter from "../../services/adapters/properties-adapter";
import "./tenant-proofs-upload.scss";
import Button from "../button/button";
import Form from "../../public/assets/icons/pdf.svg";

interface TenantProofsUploadProps {
  propertyID?: string;
  rentalID: string;
  tenantID: string;
  flow?:string;
}

const TenantProofsUpload: React.FC<TenantProofsUploadProps> = (props) => {
  const { propertyID, rentalID, tenantID } = props;
  const [specialInfo, setSpecialInfo] = useState<any[]>([]);
  const [completedCount, setCompletedCount] = useState<number>(0);
  const [nonCompletedCount, setNonCompletedCount] = useState<number>(0);
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const fileUploadRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    async function fetchPropertyInfo(propertyID: string) {
      const propertyInfo = await PropertyAdapter.getPropertyByID(propertyID);
      if (propertyInfo) {
        setSpecialInfo(propertyInfo[0]?.special_instructions || []);
      }
    }
    fetchPropertyInfo(propertyID);
  }, [propertyID]);

  useEffect(() => {
    const calculateCounts = () => {
      let completed = 0;
      let nonCompleted = 0;

      specialInfo.forEach((form) => {
        form.form_field_value.forEach((file) => {
          if (file.status === "completed") {
            completed += 1;
          } else {
            nonCompleted += 1;
          }
        });
      });

      setCompletedCount(completed);
      setNonCompletedCount(nonCompleted);
    };

    calculateCounts();
  }, [specialInfo]);

  const onAddFiles = async (event: React.ChangeEvent<HTMLInputElement>, formId: string) => {
    if (tenantID) {
      try {
        // Set loading state to true for the specific form
        setLoadingStates((prevLoadingStates) => ({
          ...prevLoadingStates,
          [formId]: true,
        }));

        const newFile = event?.target?.files?.[0];
        const formData = new FormData();
        formData.append("myFile", newFile as Blob, newFile?.name || "");

        // Simulate the server response
        const data = await PropertyAdapter.addFiles(formData, propertyID, rentalID, tenantID);

        if (data) {
          const updatedSpecialInfo = specialInfo.map((form) => {
            return {
              ...form,
              form_field_value: form.form_field_value.map((file) =>
                file.id === formId ? { ...file, status: "completed" } : file
              ),
            };
          });

          setSpecialInfo(updatedSpecialInfo);
          setCompletedCount((prevCount) => prevCount + 1);
          setNonCompletedCount((prevCount) => prevCount - 1);
        }
      } catch {
        console.log("error");
      } finally {
        // Set loading state to false for the specific form
        setLoadingStates((prevLoadingStates) => ({
          ...prevLoadingStates,
          [formId]: false,
        }));
      }
    }
  };

  return (
    <fieldset className="tenant-proofs-upload__wrapper">
      <legend className="tenant-proofs-upload__header">Upload Documents</legend>
      <div className="tenant-proofs-upload__forms-wrapper">
        {specialInfo.length !== 0 &&
          specialInfo
            .filter((_forms) => _forms.form_field_intent.value === "send_documents")
            .map((_forms) =>
              _forms.form_field_value.map((_form) => (
                <div
                  key={_form.id}
                  onClick={() => {
                    if (_form.status !== "completed" && !loadingStates[_form.id]) {
                      fileUploadRefs.current[_form.id]?.click();
                    }
                  }}
                  className={`tenant-proofs-upload__forms ${
                    _form.status === "completed" ? "completed" : ""
                  }`}
                >
                  <input
                    key={_form.id}
                    onChange={(e) => onAddFiles(e, _form.id)}
                    type="file"
                    ref={(el) => (fileUploadRefs.current[_form.id] = el)}
                    hidden
                  />
                  {loadingStates[_form.id] && "Uploading..."}
                  {_form.status !== "completed" && !loadingStates[_form.id] && `+ ${_form.option}`}
                  {_form.status === "completed" && (
                    <>
                      <Form />
                      {_form.option}
                    </>
                  )}
                </div>
              ))
            )}
      </div>
      <Button
        btnText={"Submit"}
        btnTheme="upload-page"
        buttonStatus={completedCount === 0}
        buttonClick={() => {}}
        additionalStyles={{ padding: 0 }}
      />
    </fieldset>
  );
};

export default TenantProofsUpload;
