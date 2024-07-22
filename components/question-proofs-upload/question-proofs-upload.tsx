import React, { useEffect, useRef, useState } from "react";
import Form from "../../public/assets/icons/pdf.svg";
import "./question-proofs-upload.scss";
import PropertyAdapter from "../../services/adapters/properties-adapter";
const QuestionProofsUpload = (props) => {
  console.log(props);
  const {
    files,
    rentalID,
    tenantID,
    activeProperty,
    code,
    setIsErrored,
    setErrorStatus,
    actualQues,
    answers,
    setAnswer,
  } = props;
  const [allFiles, setAllFiles] = useState([]);
  const [completedCount, setCompletedCount] = useState<number>(0);
  const [nonCompletedCount, setNonCompletedCount] = useState<number>(0);
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );
  console.log(props.answers);
  const fileUploadRefs = useRef({});
  useEffect(() => {
    if (
      answers &&
      Object.keys(answers)?.length !== 0 &&
      answers[code]?.value &&
      answers[code]?.value?.length !== 0
    ) {
      let newFiles = answers[code]?.value?.map((_files, index) => ({
        ..._files,
        id: index + 1,
      }));
      setAllFiles(newFiles);
    } else if (files) {
      let newFiles = files.map((_files, index) => ({
        ..._files,
        id: index + 1,
      }));
      setAllFiles(newFiles);
      setNonCompletedCount(files.length);
    } else {
      console.log("do none");
    }
  }, [files, code]);
  const onAddFiles = async (
    event: React.ChangeEvent<HTMLInputElement>,
    formId: string
  ) => {
    if (tenantID) {
      try {
        setLoadingStates((prevLoadingStates) => ({
          ...prevLoadingStates,
          [formId]: true,
        }));

        const newFile = event?.target?.files?.[0];
        const formData = new FormData();
        formData.append("myFile", newFile as Blob, newFile?.name || "");

        // Simulate the server response
        const data = await PropertyAdapter.addFiles(
          formData,
          activeProperty,
          rentalID,
          tenantID
        );
        console.log(data);
        if (data) {
          const updatedFiles = allFiles.map((file) =>
            file.id === formId ? { ...file, status: "completed" } : file
          );
          setAllFiles(updatedFiles);
          setCompletedCount((prevCount) => prevCount + 1);
          setNonCompletedCount((prevCount) => prevCount - 1);
        }
      } catch {
        console.log("error");
      } finally {
        setLoadingStates((prevLoadingStates) => ({
          ...prevLoadingStates,
          [formId]: false,
        }));
      }
    }
  };
  console.log(completedCount);
  console.log(allFiles);
  const areAllFilesCompleted = (files) => {
    if(files.length === 0){
      return false;
    }
    for (let file of files) {
      if (file.hasOwnProperty("status") && file.status !== "completed") {
        console.log("object has own property status and is not completed")
        return false;
      }
      if (!file.hasOwnProperty('status')) {
        return false;
    }
    }
    console.log("object has own property status and is completed")
    return true;
  };

  useEffect(() => {
    if (allFiles && areAllFilesCompleted(allFiles)) {
      const newAnswers = {
        [code]: {
          value: allFiles.map((file) => ({
            value: file?.value,
            answerType: file?.answerType,
            target: file?.target,
            status: file?.status,
          })),
          data_type: "file",
          qaId: actualQues?.id,
        },
      };
      setAnswer((prevAnswers) => ({
        ...prevAnswers,
        ...newAnswers,
      }));
    } else {
      const newAnswers = {
        [code]: {
          value: [],
          data_type: "file",
          qaId: actualQues?.id,
        },
      };
      setAnswer((prevAnswers) => ({
        ...prevAnswers,
        ...newAnswers,
      }));
    }
  }, [nonCompletedCount, allFiles, setAnswer]);
  console.log(fileUploadRefs);
  return (
    <div className="all-forms-wrapper">
      {allFiles &&
        allFiles.length !== 0 &&
        allFiles.map((_files, index) => (
          <>
            <input
              key={_files.id}
              onChange={(e) => {
                onAddFiles(e, _files.id);
              }}
              type="file"
              ref={(el) => (fileUploadRefs.current[_files.id] = el)}
              hidden
            />
            <div
              key={index}
              onClick={(e) => {
                e.preventDefault();
                setIsErrored(false);
                setErrorStatus("");
                if (
                  _files.status !== "completed" &&
                  !loadingStates[_files.id]
                ) {
                  console.log(_files);
                  fileUploadRefs.current[_files.id]?.click();
                }
              }}
              className={`tenant-proofs-upload__forms ${
                _files.status === "completed" ? "completed" : ""
              }`}
            >
              {loadingStates[_files.id] && "Uploading..."}
              {_files.status !== "completed" &&
                !loadingStates[_files.id] &&
                `+ ${_files.value}`}
              {_files.status === "completed" && (
                <>
                  <Form />
                  {_files.value}
                </>
              )}
            </div>
          </>
        ))}
    </div>
  );
};
export default QuestionProofsUpload;
